import { scoreAll } from './engine/scorer';
import { filterLeads } from './engine/filter';
import { buildReport } from './engine/reporter';
import { DEFAULT_CRITERIA } from './criteria';
import { Lead } from './types/lead';

const sampleLeads: Lead[] = [
  {
    id: 'l-001',
    companyName: 'Helix Analytics',
    vertical: 'saas',
    headcount: 220,
    annualRevenueUsd: 8_000_000,
    fundingStage: 'series-b',
    techStackContainsCrm: true,
    outboundTeamSize: 12,
    hasGtmLead: true,
    country: 'US',
  },
  {
    id: 'l-002',
    companyName: 'ClearPay',
    vertical: 'fintech',
    headcount: 85,
    annualRevenueUsd: 2_500_000,
    fundingStage: 'series-a',
    techStackContainsCrm: true,
    outboundTeamSize: 4,
    hasGtmLead: true,
    country: 'US',
  },
  {
    id: 'l-003',
    companyName: 'Farmbase',
    vertical: 'other',
    headcount: 30,
    annualRevenueUsd: 400_000,
    fundingStage: 'seed',
    techStackContainsCrm: false,
    outboundTeamSize: 1,
    hasGtmLead: false,
    country: 'IN',
  },
  {
    id: 'l-004',
    companyName: 'ShopGrid',
    vertical: 'marketplace',
    headcount: 310,
    annualRevenueUsd: 12_000_000,
    fundingStage: 'series-b',
    techStackContainsCrm: true,
    outboundTeamSize: 18,
    hasGtmLead: true,
    country: 'UK',
  },
];

const scored   = scoreAll(sampleLeads, DEFAULT_CRITERIA);
const filtered = filterLeads(scored, { maxTier: 2 });
const report   = buildReport(scored);

console.log('=== Lead Scoring Report ===\n');
console.log(`Total leads scored : ${report.total}`);
console.log(`Average score      : ${report.avgScore}`);
console.log('');
console.log('Tier distribution:');
report.tierSummary.forEach(t => {
  console.log(`  Tier ${t.tier}: ${t.count} leads  (avg ${t.avgScore})`);
});
console.log('');
console.log(`Tier 1+2 (pipeline-ready): ${filtered.length} leads`);
filtered.forEach(l => {
  console.log(`  ${l.companyName.padEnd(20)} score=${l.score}  tier=${l.tier}`);
});
