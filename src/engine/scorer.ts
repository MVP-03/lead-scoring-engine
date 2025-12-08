import { Criterion } from '../types/criteria';
import { Lead, ScoredLead, CriterionResult } from '../types/lead';

function assignTier(score: number): 1 | 2 | 3 | 4 {
  if (score >= 75) return 1;
  if (score >= 50) return 2;
  if (score >= 30) return 3;
  return 4;
}

export function scoreLead(lead: Lead, criteria: Criterion[]): ScoredLead {
  const breakdown: CriterionResult[] = criteria.map((c) => {
    const rawScore = c.score(lead);
    return {
      criterion: c.name,
      weight:    c.weight,
      rawScore,
      weighted:  rawScore * c.weight,
    };
  });

  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
  const weightedSum = breakdown.reduce((sum, b) => sum + b.weighted, 0);
  const score       = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) : 0;

  return { ...lead, score, tier: assignTier(score), breakdown };
}

export function scoreAll(leads: Lead[], criteria: Criterion[]): ScoredLead[] {
  return leads
    .map((l) => scoreLead(l, criteria))
    .sort((a, b) => b.score - a.score);
}
