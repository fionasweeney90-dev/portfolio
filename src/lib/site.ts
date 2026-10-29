// Prefix a root-relative path with the configured base, so links and images work on GitHub Pages.
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
}

// Drafting aids ([Add …] placeholders, draft projects) show in `npm run dev` only, never on the published site.
export const showDrafts = import.meta.env.DEV;

// A drafting placeholder is text wholly wrapped in square brackets, e.g. "[Add cover image]".
export function isPlaceholder(text: string | undefined): boolean {
  return !!text && /^\s*\[[^\]]*\]\s*$/.test(text);
}

// One accent per company: Flutter UK&I pink, PokerStars blue, Irish Store green.
const accents: Record<string, Accent> = {
  'Flutter UK&I': 'pink',
  PokerStars: 'blue',
  'Irish Store': 'green',
};

export type Accent = 'pink' | 'blue' | 'green';

export function accentFor(company: string): Accent {
  return accents[company] ?? 'green';
}

export const contact = {
  email: 'fionasweeney90@gmail.com',
  linkedin: 'https://www.linkedin.com/in/fiona-sweeney-a709b45b/',
  strava: 'https://www.strava.com/athletes/33728143',
  // Path to the CV under public/, e.g. '/fiona-sweeney-cv.pdf'. The "View CV" link is hidden until this is set.
  cv: undefined as string | undefined,
};
