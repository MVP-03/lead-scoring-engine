export type FundingStage =
  | 'pre-seed'
  | 'seed'
  | 'series-a'
  | 'series-b'
  | 'series-c+'
  | 'bootstrapped';

export type Vertical =
  | 'saas'
  | 'fintech'
  | 'healthtech'
  | 'edtech'
  | 'marketplace'
  | 'ecommerce'
  | 'other';

export interface Lead {
  id: string;
  companyName: string;
  vertical: Vertical;
  headcount: number;
  annualRevenueUsd: number;
  fundingStage: FundingStage;
  techStackContainsCrm: boolean;
  outboundTeamSize: number;
  hasGtmLead: boolean;
  country: string;
}

export interface ScoredLead extends Lead {
  score: number;          // 0-100
  tier: 1 | 2 | 3 | 4;  // 1 = best
  breakdown: CriterionResult[];
}

export interface CriterionResult {
  criterion: string;
  weight: number;
  rawScore: number;   // 0-1
  weighted: number;   // rawScore * weight
}
