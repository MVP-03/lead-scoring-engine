import { Criterion } from '../types/criteria';
import { FundingStage, Vertical } from '../types/lead';

const IDEAL_VERTICALS: Vertical[] = ['saas', 'fintech', 'marketplace'];

const FUNDING_SCORE: Record<FundingStage, number> = {
  'series-b':     1.0,
  'series-a':     0.8,
  'series-c+':    0.7,
  'seed':         0.5,
  'pre-seed':     0.2,
  'bootstrapped': 0.3,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function linearScale(value: number, low: number, high: number): number {
  if (high <= low) return 0;
  return clamp((value - low) / (high - low), 0, 1);
}

export const DEFAULT_CRITERIA: Criterion[] = [
  {
    name: 'vertical_fit',
    weight: 0.20,
    score: (l) => (IDEAL_VERTICALS.includes(l.vertical) ? 1 : 0.3),
  },
  {
    name: 'headcount',
    weight: 0.15,
    score: (l) => linearScale(l.headcount, 50, 500),
  },
  {
    name: 'annual_revenue',
    weight: 0.20,
    score: (l) => linearScale(l.annualRevenueUsd, 500_000, 20_000_000),
  },
  {
    name: 'funding_stage',
    weight: 0.15,
    score: (l) => FUNDING_SCORE[l.fundingStage] ?? 0,
  },
  {
    name: 'has_crm',
    weight: 0.10,
    score: (l) => (l.techStackContainsCrm ? 1 : 0),
  },
  {
    name: 'outbound_team_size',
    weight: 0.10,
    score: (l) => linearScale(l.outboundTeamSize, 1, 20),
  },
  {
    name: 'has_gtm_lead',
    weight: 0.10,
    score: (l) => (l.hasGtmLead ? 1 : 0),
  },
];
