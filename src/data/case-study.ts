// Case study content lives in src/data/case-studies/<slug>.json; layout lives in components/case-study/.
// Sections with no blocks are skipped. Text in [square brackets] is a placeholder still to be written.

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
}

const files = import.meta.glob<CaseStudy>('./case-studies/*.json', { eager: true, import: 'default' });

export const caseStudies = Object.entries(files).map(([path, data]) => ({
  slug: path.replace(/^.*\/(.*)\.json$/, '$1'),
  data,
}));

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

// Number non-plain sections 01, 02… and drop empty ones.
export function numberedSections(sections: Section[]) {
  let n = 0;
  return sections
    .filter((s) => s.blocks && s.blocks.length)
    .map((s) => ({ ...s, number: s.plain ? ((n = 0), '') : String(++n).padStart(2, '0') }));
}
