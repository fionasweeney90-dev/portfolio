// Case study content lives in src/data/case-studies/<slug>.json; layout lives in components/case-study/.
// Sections with no blocks are skipped. Text in [square brackets] is a placeholder still to be written:
// it shows in `npm run dev` and is left out of the published site, as are images without a `src`.
import { isPlaceholder, showDrafts } from '../lib/site';

export interface Shot {
  src?: string;
  alt?: string;
  label?: string;
  w?: number;
  h?: number;
  ratio?: string;
  maxw?: string;
  zoom?: boolean;
  tag?: string;
  cap?: string;
}

export type Block =
  | { type: 'text'; heading?: string; paragraphs: string[]; lead?: boolean }
  | { type: 'list'; heading?: string; items: string[] }
  | { type: 'cards'; heading?: string; items: { title: string; text: string }[] }
  | { type: 'callout'; text: string; note?: string }
  | { type: 'facts'; items: { value: string; label: string; hl?: boolean }[]; highlight?: boolean; cols?: number }
  | { type: 'team'; groups: { title: string; people: string[] }[] }
  | { type: 'findings'; items: { title: string; why: string; points: string[] }[] }
  | { type: 'code'; heading?: string; code: string }
  | {
      type: 'timeline';
      phases: {
        kicker: string;
        title: string;
        status?: 'done' | 'active' | 'planned' | 'tbd';
        statusLabel?: string;
        summary: string;
        image?: Shot | false;
        details?: { k: string; v: string }[];
      }[];
    }
  | {
      type: 'gallery';
      layout: 'full' | 'two' | 'split' | 'devices' | 'ba' | 'three' | 'offset';
      heading?: string;
      text?: string;
      images: Shot[];
      caption?: string;
      cols?: number;
    };

export interface Section {
  id: string;
  title: string;
  // Plain sections are unnumbered and restart the numbering after them.
  plain?: boolean;
  blocks: Block[];
}

export interface CaseStudy {
  company: string;
  title: string;
  subtitle: string;
  backLabel?: string;
  cover?: Shot;
  noCover?: boolean;
  info: { label: string; value: string }[];
  sections: Section[];
  next: { href: string; title: string } | null;
  // Unfinished: not published (still built in dev).
  draft?: boolean;
}

const files = import.meta.glob<CaseStudy>('./case-studies/*.json', { eager: true, import: 'default' });

export const caseStudies = Object.entries(files)
  .map(([path, data]) => ({ slug: path.replace(/^.*\/(.*)\.json$/, '$1'), data }))
  .filter(({ data }) => showDrafts || !data.draft);

const layoutRatios: Record<string, string> = {
  full: '16 / 9',
  two: '4 / 3',
  split: '4 / 3',
  devices: '9 / 19',
  ba: '4 / 3',
  three: '4 / 5',
  offset: '4 / 3',
};

export function shotRatio(shot: Shot, fallback: string): string {
  return shot.w && shot.h ? `${shot.w} / ${shot.h}` : shot.ratio || fallback;
}

export function galleryRatio(layout: string): string {
  return layoutRatios[layout] ?? '4 / 3';
}

const real = (t?: string) => !isPlaceholder(t);
const hasImage = (shot?: Shot | false) => !!shot && !!shot.src;

// Strip drafting placeholders from a block for the published site; null when nothing real is left.
function publicBlock(b: Block): Block | null {
  switch (b.type) {
    case 'text': {
      const paragraphs = b.paragraphs.filter(real);
      return paragraphs.length ? { ...b, paragraphs } : null;
    }
    case 'list': {
      const items = b.items.filter(real);
      return items.length ? { ...b, items } : null;
    }
    case 'cards': {
      const items = b.items.filter((c) => real(c.title) && real(c.text));
      return items.length ? { ...b, items } : null;
    }
    case 'callout':
      return real(b.text) ? { ...b, note: real(b.note) ? b.note : undefined } : null;
    case 'facts': {
      const items = b.items.filter((f) => real(f.value) && real(f.label));
      return items.length ? { ...b, items } : null;
    }
    case 'team': {
      const groups = b.groups.map((g) => ({ ...g, people: g.people.filter(real) })).filter((g) => g.people.length);
      return groups.length ? { ...b, groups } : null;
    }
    case 'findings': {
      const items = b.items
        .filter((f) => real(f.title))
        .map((f) => ({ ...f, why: real(f.why) ? f.why : '', points: f.points.filter(real) }));
      return items.length ? { ...b, items } : null;
    }
    case 'timeline': {
      const phases = b.phases.map((ph) => ({
        ...ph,
        image: hasImage(ph.image) ? ph.image : (false as const),
        details: ph.details?.filter((d) => real(d.v)),
      }));
      return { ...b, phases };
    }
    case 'gallery': {
      const images = b.images.filter(hasImage).map((im) => ({ ...im, cap: real(im.cap) ? im.cap : undefined }));
      // No real images left: keep any written intro as plain text.
      if (!images.length) return b.text && real(b.text) ? { type: 'text', heading: b.heading, paragraphs: [b.text] } : null;
      return { ...b, images, caption: real(b.caption) ? b.caption : undefined, text: real(b.text) ? b.text : undefined };
    }
    default:
      return b;
  }
}

// What the published page shows: placeholders removed in production builds, kept in dev.
export function publicCaseStudy(p: CaseStudy): CaseStudy {
  if (showDrafts) return p;
  return {
    ...p,
    cover: hasImage(p.cover) ? p.cover : undefined,
    noCover: p.noCover || !hasImage(p.cover),
    info: p.info.filter((i) => real(i.value)),
    sections: p.sections.map((s) => ({
      ...s,
      blocks: s.blocks.map(publicBlock).filter((b): b is Block => b !== null),
    })),
  };
}

// Number non-plain sections 01, 02… and drop empty ones.
export function numberedSections(sections: Section[]) {
  let n = 0;
  return sections
    .filter((s) => s.blocks && s.blocks.length)
    .map((s) => ({ ...s, number: s.plain ? ((n = 0), '') : String(++n).padStart(2, '0') }));
}
