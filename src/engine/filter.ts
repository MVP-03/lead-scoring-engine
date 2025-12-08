import { ScoredLead } from '../types/lead';

export interface FilterOptions {
  minScore?: number;
  maxTier?: 1 | 2 | 3 | 4;
  countries?: string[];
}

export function filterLeads(leads: ScoredLead[], opts: FilterOptions): ScoredLead[] {
  return leads.filter((l) => {
    if (opts.minScore !== undefined && l.score < opts.minScore) return false;
    if (opts.maxTier  !== undefined && l.tier  > opts.maxTier)  return false;
    if (opts.countries && opts.countries.length > 0) {
      if (!opts.countries.includes(l.country)) return false;
    }
    return true;
  });
}
