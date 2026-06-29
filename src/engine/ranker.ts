import { ScoredLead } from '../types/lead';

export interface RankedLead extends ScoredLead {
  rank:       number;
  percentile: number;
}

export function rankLeads(leads: ScoredLead[]): RankedLead[] {
  const sorted = [...leads].sort((a, b) => b.score - a.score);
  const n = sorted.length;
  return sorted.map((lead, i) => ({
    ...lead,
    rank:       i + 1,
    percentile: n > 1 ? Math.round(((n - 1 - i) / (n - 1)) * 100) : 100,
  }));
}

export function topN(ranked: RankedLead[], count: number): RankedLead[] {
  return ranked.slice(0, Math.max(0, count));
}

export function abovePercentile(ranked: RankedLead[], threshold: number): RankedLead[] {
  return ranked.filter((l) => l.percentile >= threshold);
}

export function tierDistribution(ranked: RankedLead[]): Record<number, number> {
  const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const lead of ranked) {
    dist[lead.tier] = (dist[lead.tier] ?? 0) + 1;
  }
  return dist;
}
