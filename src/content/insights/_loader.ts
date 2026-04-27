import type { Post } from '@/types/insights';
import { post as agentWritesQcVerifies } from './agent-writes-qc-verifies';
import { post as entityResolution } from './entity-resolution';
import { post as howAnomalyDetectionActuallyWorks } from './how-anomaly-detection-actually-works';
import { post as howDataGetsIntoYourWarehouse } from './how-data-gets-into-your-warehouse';
import { post as howToDoAiReportingRight } from './how-to-do-ai-reporting-right';
import { post as theDataWarehouseFoundation } from './the-data-warehouse-foundation';
import { post as theSemanticLayer } from './the-semantic-layer';
import { post as whatOrchestrationActuallyMeans } from './what-orchestration-actually-means';

export const posts: Post[] = [
  theSemanticLayer,
  agentWritesQcVerifies,
  entityResolution,
  howDataGetsIntoYourWarehouse,
  howAnomalyDetectionActuallyWorks,
  howToDoAiReportingRight,
  theDataWarehouseFoundation,
  whatOrchestrationActuallyMeans,
];
