import { ScoredLead } from './lead';

export interface RankedLead extends ScoredLead {
  rank:       number;
  percentile: number;
}

export interface TierDistribution {
  tier1: number;
  tier2: number;
  tier3: number;
  tier4: number;
}

export const TIER_LABELS: Record<number, string> = {
  1: 'Hot',
  2: 'Warm',
  3: 'Cool',
  4: 'Cold',
};
