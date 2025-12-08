import { scoreLead, scoreAll } from '../src/engine/scorer';
import { DEFAULT_CRITERIA } from '../src/criteria';
import { Lead } from '../src/types/lead';

const strongLead: Lead = {
  id: 'test-001',
  companyName: 'TestCo',
  vertical: 'saas',
  headcount: 300,
  annualRevenueUsd: 15_000_000,
  fundingStage: 'series-b',
  techStackContainsCrm: true,
  outboundTeamSize: 15,
  hasGtmLead: true,
  country: 'US',
};

const weakLead: Lead = {
  id: 'test-002',
  companyName: 'Tiny LLC',
  vertical: 'other',
  headcount: 5,
  annualRevenueUsd: 50_000,
  fundingStage: 'pre-seed',
  techStackContainsCrm: false,
  outboundTeamSize: 0,
  hasGtmLead: false,
  country: 'IN',
};

describe('scoreLead', () => {
  it('gives a strong lead a tier-1 score', () => {
    const result = scoreLead(strongLead, DEFAULT_CRITERIA);
    expect(result.score).toBeGreaterThanOrEqual(75);
    expect(result.tier).toBe(1);
  });

  it('gives a weak lead a tier-3 or tier-4 score', () => {
    const result = scoreLead(weakLead, DEFAULT_CRITERIA);
    expect(result.score).toBeLessThan(50);
    expect(result.tier).toBeGreaterThanOrEqual(3);
  });

  it('includes a breakdown entry for every criterion', () => {
    const result = scoreLead(strongLead, DEFAULT_CRITERIA);
    expect(result.breakdown).toHaveLength(DEFAULT_CRITERIA.length);
  });

  it('breakdown weighted values sum to score / 100 approx', () => {
    const result = scoreLead(strongLead, DEFAULT_CRITERIA);
    const weightedSum = result.breakdown.reduce((s, b) => s + b.weighted, 0);
    expect(weightedSum).toBeCloseTo(result.score / 100, 1);
  });
});

describe('scoreAll', () => {
  it('returns leads sorted by descending score', () => {
    const results = scoreAll([weakLead, strongLead], DEFAULT_CRITERIA);
    expect(results[0].score).toBeGreaterThanOrEqual(results[1].score);
  });
});
