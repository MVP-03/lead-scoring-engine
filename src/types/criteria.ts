import { Lead } from './lead';

export interface Criterion {
  name: string;
  weight: number;        // contribution weight, all weights must sum to 1
  score: (lead: Lead) => number;  // returns 0-1
}
