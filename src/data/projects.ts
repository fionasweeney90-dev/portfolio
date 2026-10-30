import { showDrafts } from '../lib/site';

// Selected Work cards on the home page. Each slug matches a case study in src/data/case-studies/.
// Add `image` (a path under public/) when a cover is ready; cards without one show a plain tile.
// `draft: true` keeps a card off the published site (it still shows in `npm run dev`).
export interface ProjectCard {
  tier: 'featured' | 'secondary' | 'support';
  company: string;
  title: string;
  description: string;
  tags: string;
  tagline: string;
  slug: string;
  image?: string;
  draft?: boolean;
}

const allProjects: ProjectCard[] = [
  {
    tier: 'featured',
    company: 'Flutter UK&I',
    title: 'Search Revamp',
    description: 'Leading the redesign of Search across Paddy Power, Betfair and Sky Vegas, balancing brand needs with a more consistent customer experience.',
    tags: 'UX Strategy · Search & Discovery · Cross-brand Design',
    tagline: 'Making discovery simpler across three brands.',
    slug: 'search-revamp',
    image: '/images/home/card-search-revamp.webp',
  },
  {
    tier: 'secondary',
    company: 'PokerStars',
    title: 'Payments Experience',
    description: 'Designing complex payment experiences, from deposits and withdrawals to transaction history and payment-method management.',
    tags: 'Payments · UX Design · Customer Journeys',
    tagline: 'Simplifying complex payment journeys.',
    slug: 'pokerstars-payments',
    image: '/images/home/card-pokerstars-payments.webp',
  },
  {
    tier: 'support',
    company: 'Irish Store',
    title: 'UX Audit & Improvements',
    description: 'A research-led review of the shopping experience that increased conversion by over 15% and cut checkout abandonment by 11.8%.',
    tags: 'E-commerce · UX Audit · Research',
    tagline: 'Finding the friction. Improving the experience.',
    slug: 'irish-store-ux-audit',
    image: '/images/home/card-irish-store-ux-audit.webp',
  },
  {
    tier: 'support',
    company: 'Irish Store',
    title: 'Responsive Email Design',
    description: 'Improving the design and usability of e-commerce email communications, creating clearer and more engaging customer experiences.',
    tags: 'Email UX · E-commerce · Customer Engagement',
    tagline: 'Creating clearer, more engaging email experiences.',
    slug: 'irish-store-email',
    image: '/images/home/card-irish-store-email.webp',
  },
  {
    tier: 'support',
    company: 'Flutter UK&I',
    title: 'Leading Design Through Complexity',
    description: 'Leading UX direction and cross-functional collaboration on a confidential digital experience.',
    tags: 'UX Leadership · Collaboration · Design Direction',
    tagline: 'Bringing people together. Finding a clear direction.',
    slug: 'leading-design',
    draft: true,
  },
  {
    tier: 'support',
    company: 'Flutter UK&I',
    title: 'Gaming Experience Improvements',
    description: 'Refining an established digital gaming experience through considered UX and interaction design.',
    tags: 'UX Design · Interaction Design · Existing Experiences',
    tagline: 'Improving the experience, one interaction at a time.',
    slug: 'gaming-experience',
    draft: true,
  },
];

export const projects = allProjects.filter((p) => showDrafts || !p.draft);
