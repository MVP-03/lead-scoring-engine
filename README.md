# lead-scoring-engine

Typed ICP lead scorer written in TypeScript. Pluggable weighted criteria, tier assignment, and pipeline-ready filtering.

## Architecture

```
src/
  types/
    lead.ts         Lead, ScoredLead, CriterionResult interfaces
    criteria.ts     Criterion interface
  criteria/
    index.ts        DEFAULT_CRITERIA — 7 weighted scoring functions
  engine/
    scorer.ts       scoreLead(), scoreAll() — weighted sum → 0-100
    filter.ts       filterLeads() — score / tier / country gates
    reporter.ts     buildReport() — tier summary + top-10
  index.ts          CLI demo — scores sample leads, prints report
tests/
  scorer.test.ts    Jest unit tests
```

## Criteria (default weights)

| Criterion | Weight |
|---|---|
| vertical_fit | 0.20 |
| annual_revenue | 0.20 |
| headcount | 0.15 |
| funding_stage | 0.15 |
| has_crm | 0.10 |
| outbound_team_size | 0.10 |
| has_gtm_lead | 0.10 |

## Tier Thresholds

| Tier | Score |
|---|---|
| 1 | >= 75 |
| 2 | >= 50 |
| 3 | >= 30 |
| 4 | < 30  |

## Quickstart

```bash
npm install
npm run dev      # run demo with sample leads
npm test         # run Jest suite
npm run build    # compile to dist/
```

## Extending

Pass a custom `Criterion[]` array to `scoreAll()` to override scoring logic — no changes to the engine required.

```typescript
import { scoreAll } from './engine/scorer';
import { DEFAULT_CRITERIA } from './criteria';

const myRules = [
  ...DEFAULT_CRITERIA,
  { name: 'enterprise_flag', weight: 0.05, score: (l) => l.headcount >= 1000 ? 1 : 0 },
];

const results = scoreAll(myLeads, myRules);
```
