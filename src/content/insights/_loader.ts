import type { Post } from '@/types/insights';
import { post as entityResolution } from './entity-resolution';
import { post as howAnomalyDetectionActuallyWorks } from './how-anomaly-detection-actually-works';
import { post as howDataGetsIntoYourWarehouse } from './how-data-gets-into-your-warehouse';
import { post as howToDoAiReportingRight } from './how-to-do-ai-reporting-right';
import { post as theDataWarehouseFoundation } from './the-data-warehouse-foundation';
import { post as whatOrchestrationActuallyMeans } from './what-orchestration-actually-means';

export const posts: Post[] = [
  entityResolution,
  howDataGetsIntoYourWarehouse,
  howAnomalyDetectionActuallyWorks,
  howToDoAiReportingRight,
  theDataWarehouseFoundation,
  whatOrchestrationActuallyMeans,
];
