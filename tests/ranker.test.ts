import { rankLeads, topN, abovePercentile, tierDistribution } from '../src/engine/ranker';
import { ScoredLead } from '../src/types/lead';

const LEADS: ScoredLead[] = [
  { id: 'l1', company: 'Alpha',   score: 90, tier: 1, breakdown: [] },
  { id: 'l2', company: 'Beta',    score: 60, tier: 2, breakdown: [] },
  { id: 'l3', company: 'Gamma',   score: 40, tier: 3, breakdown: [] },
  { id: 'l4', company: 'Delta',   score: 20, tier: 4, breakdown: [] },
] as unknown as ScoredLead[];

describe('rankLeads', () => {
  const ranked = rankLeads(LEADS);

  it('assigns rank 1 to highest scorer', () => {
    expect(ranked[0].rank).toBe(1);
    expect(ranked[0].company).toBe('Alpha');
  });

  it('assigns 100th percentile to rank 1', () => {
    expect(ranked[0].percentile).toBe(100);
  });

  it('assigns 0th percentile to last rank', () => {
    expect(ranked[ranked.length - 1].percentile).toBe(0);
  });
});

describe('topN', () => {
  it('returns correct count', () => {
    expect(topN(rankLeads(LEADS), 2)).toHaveLength(2);
  });
});

describe('tierDistribution', () => {
  it('counts all tiers', () => {
    const dist = tierDistribution(rankLeads(LEADS));
    expect(dist[1]).toBe(1);
    expect(dist[4]).toBe(1);
  });
});
