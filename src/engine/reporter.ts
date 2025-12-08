import { ScoredLead } from '../types/lead';

export interface TierSummary {
  tier: number;
  count: number;
  avgScore: number;
}

export function buildReport(leads: ScoredLead[]): {
  total: number;
  avgScore: number;
  tierSummary: TierSummary[];
  top10: ScoredLead[];
} {
  const tierMap = new Map<number, number[]>();

  for (const l of leads) {
    const bucket = tierMap.get(l.tier) ?? [];
    bucket.push(l.score);
    tierMap.set(l.tier, bucket);
  }

  const tierSummary: TierSummary[] = [1, 2, 3, 4].map((tier) => {
    const scores = tierMap.get(tier) ?? [];
    const avg    = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    return { tier, count: scores.length, avgScore: Math.round(avg) };
  });

  const avgScore = leads.length
    ? Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length)
    : 0;

  return {
    total: leads.length,
    avgScore,
    tierSummary,
    top10: leads.slice(0, 10),
  };
}
