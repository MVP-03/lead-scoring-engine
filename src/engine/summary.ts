import { ScoredLead } from '../types/lead';

export interface ScoreSummary {
  total:   number;
  average: number;
  median:  number;
  min:     number;
  max:     number;
}

export function scoreSummary(leads: ScoredLead[]): ScoreSummary {
  if (!leads.length) return { total: 0, average: 0, median: 0, min: 0, max: 0 };

  const scores = leads.map((l) => l.score).sort((a, b) => a - b);
  const total   = scores.length;
  const average = Math.round(scores.reduce((s, v) => s + v, 0) / total);
  const mid     = Math.floor(total / 2);
  const median  = total % 2 === 0 ? Math.round((scores[mid - 1] + scores[mid]) / 2) : scores[mid];

  return { total, average, median, min: scores[0], max: scores[total - 1] };
}

export function aboveMeanLeads(leads: ScoredLead[]): ScoredLead[] {
  const { average } = scoreSummary(leads);
  return leads.filter((l) => l.score >= average);
}
