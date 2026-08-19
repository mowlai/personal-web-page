/**
 * Single source of truth for identity, nav, and outbound links.
 * Edit here — every page reads from this file.
 */
export const site = {
  name: 'Ryan Mowlai',
  title: 'Ryan Mowlai',
  role: 'Machine Learning Research Scientist',
  affiliation: 'Ph.D. Candidate, Systems & Industrial Engineering (minor in Computer Science), University of Arizona',
  url: 'https://rmowlai.com',
  description:
    'Ryan Mowlai — machine learning research scientist working on reinforcement learning, agentic AI, and foundation models for autonomous water treatment systems.',
  keywords: [
    'Ryan Mowlai', 'machine learning', 'reinforcement learning', 'agentic AI',
    'foundation models', 'water treatment', 'time series', 'University of Arizona',
  ],
} as const;

export const nav = [
  { href: '/',             label: 'Home' },
  { href: '/publications', label: 'Publications' },
  { href: '/projects',     label: 'Projects' },
  { href: '/blog',         label: 'Blog' },
  { href: '/news',         label: 'News' },
] as const;

/** Outbound profiles. `icon` maps to a key in components/Icon.astro. */
export const profiles = [
  { label: 'GitHub',         href: 'https://github.com/mowlai',                icon: 'github'  },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=', icon: 'scholar' },
  { label: 'LinkedIn',       href: 'https://linkedin.com/in/ryanmrm',          icon: 'linkedin' },
] as const;
