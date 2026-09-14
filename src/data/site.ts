/**
 * Single source of truth for identity, nav, and outbound links.
 * Edit here — every page reads from this file.
 */
export const site = {
  name: 'Ryan Mowlai',
  title: 'Ryan Mowlai',
  role: 'Machine Learning Researcher',
  url: 'https://rmowlai.com',
  description:
    'Ryan Mowlai — machine learning researcher working across statistical learning, reinforcement learning, optimization, deep learning, and agentic AI.',
  keywords: [
    'Ryan Mowlai', 'machine learning', 'reinforcement learning', 'agentic AI',
    'foundation models', 'water treatment', 'time series', 'University of Arizona',
  ],
} as const;

export const nav = [
  { href: '/',             label: 'Home' },
  { href: '/publications', label: 'Publications' },
  { href: '/projects',     label: 'Projects Lab' },
  { href: '/blog',         label: 'Blog' },
  { href: '/news',         label: 'News' },
] as const;

/** Outbound profiles. `icon` maps to a key in components/Icon.astro. */
export const profiles = [
  { label: 'GitHub',         href: 'https://github.com/mowlai',                icon: 'github'  },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?hl=en&user=saiuHmoAAAAJ', icon: 'scholar' },
  { label: 'LinkedIn',       href: 'https://linkedin.com/in/ryanmrm',          icon: 'linkedin' },
] as const;
