/**
 * The publication ledger. Reverse-chronological; `year` drives grouping and
 * `status` drives the badge. Add new entries at the top.
 *
 * Set `links` for PDF / arXiv / code. `bibtex` powers the copy-citation button.
 * Mark your own name exactly as it appears in `SELF` to get it bolded.
 */
export const SELF = 'M. Mowlai';

export type PubStatus = 'published' | 'accepted' | 'in-preparation' | 'under-review';

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  /** Short venue label used in the left rail. */
  venueShort?: string;
  year: number | string;
  status: PubStatus;
  type: 'journal' | 'conference' | 'preprint' | 'thesis';
  abstract?: string;
  links?: { label: string; href: string; icon: 'pdf' | 'arxiv' | 'code' | 'link' }[];
  bibtex?: string;
}

export const publications: Publication[] = [
  {
    id: 'rl-ultrafiltration',
    title:
      'Reinforcement Learning for Autonomous Control of Ultrafiltration Water Treatment Systems',
    authors: [SELF, 'et al.'],
    venue: 'Manuscript in preparation',
    venueShort: 'In prep.',
    year: 2026,
    status: 'in-preparation',
    type: 'journal',
    abstract:
      'Deep reinforcement learning policies for autonomous ultrafiltration control that maximize net water production under operating and safety constraints, evaluated against conventional rule-based backwash scheduling.',
    links: [],
    bibtex: `@unpublished{mowlai2026rlultrafiltration,
  author = {Mowlai, M. and others},
  title  = {Reinforcement Learning for Autonomous Control of Ultrafiltration Water Treatment Systems},
  note   = {Manuscript in preparation},
  year   = {2026}
}`,
  },
  {
    id: 'autonomous-water-systems',
    title:
      'Towards Autonomous Water Systems: Data-driven Monitoring and Prediction of Net Water Production',
    authors: [SELF, 'et al.'],
    venue: '2026',
    venueShort: '2026',
    year: 2026,
    status: 'accepted',
    type: 'conference',
    abstract:
      'An end-to-end machine learning pipeline for ultrafiltration plants: late-fusion forecasters for net water production, model benchmarking across horizons, and anomaly monitoring over operational KPIs.',
    links: [],
    bibtex: `@inproceedings{mowlai2026autonomouswater,
  author    = {Mowlai, M. and others},
  title     = {Towards Autonomous Water Systems: Data-driven Monitoring and Prediction of Net Water Production},
  year      = {2026}
}`,
  },
  {
    id: 'transformer-pose',
    title: 'Adapting Transformer-Based Multi-Style Networks for Human Pose Prediction',
    authors: [SELF, 'et al.'],
    venue: 'IEEE Systems and Information Engineering Design Symposium (SIEDS)',
    venueShort: 'IEEE SIEDS',
    year: 2024,
    status: 'published',
    type: 'conference',
    abstract:
      'Transformer-based multi-style networks for predicting human motion in industrial human–robot collaboration, adapting style-conditioned architectures to short-horizon pose forecasting.',
    links: [],
    bibtex: `@inproceedings{mowlai2024pose,
  author    = {Mowlai, M. and others},
  title     = {Adapting Transformer-Based Multi-Style Networks for Human Pose Prediction},
  booktitle = {IEEE Systems and Information Engineering Design Symposium (SIEDS)},
  year      = {2024}
}`,
  },
  {
    id: 'pharma-supply-chain',
    title: 'Multistage Stochastic Optimization Model for Resilient Pharmaceutical Supply Chains',
    authors: ['M. M.', SELF, 'et al.'],
    venue: 'IEEE Systems and Information Engineering Design Symposium (SIEDS)',
    venueShort: 'IEEE SIEDS',
    year: 2024,
    status: 'published',
    type: 'conference',
    abstract:
      'A multistage stochastic programming formulation for pharmaceutical supply chains under disruption, balancing inventory cost against service level across demand and capacity scenarios.',
    links: [],
    bibtex: `@inproceedings{mowlai2024pharma,
  author    = {M., M. and Mowlai, M. and others},
  title     = {Multistage Stochastic Optimization Model for Resilient Pharmaceutical Supply Chains},
  booktitle = {IEEE Systems and Information Engineering Design Symposium (SIEDS)},
  year      = {2024}
}`,
  },
];

export const statusLabel: Record<PubStatus, string> = {
  published: 'Published',
  accepted: 'Accepted',
  'in-preparation': 'In preparation',
  'under-review': 'Under review',
};
