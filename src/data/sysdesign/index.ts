import type { Question } from "../types";
import { scalabilityJunior } from "./scalability-junior";
import { scalabilityMiddle } from "./scalability-middle";
import { scalabilitySenior } from "./scalability-senior";
import { loadBalancingJunior } from "./load-balancing-junior";
import { loadBalancingMiddle } from "./load-balancing-middle";
import { loadBalancingSenior } from "./load-balancing-senior";
import { cachingCdnJunior } from "./caching-cdn-junior";
import { cachingCdnMiddle } from "./caching-cdn-middle";
import { cachingCdnSenior } from "./caching-cdn-senior";
import { replicationShardingJunior } from "./replication-sharding-junior";
import { replicationShardingMiddle } from "./replication-sharding-middle";
import { replicationShardingSenior } from "./replication-sharding-senior";
import { consistencyJunior } from "./consistency-junior";
import { consistencyMiddle } from "./consistency-middle";
import { consistencySenior } from "./consistency-senior";
import { reliabilityJunior } from "./reliability-junior";
import { reliabilityMiddle } from "./reliability-middle";
import { reliabilitySenior } from "./reliability-senior";
import { eventDrivenJunior } from "./event-driven-junior";
import { eventDrivenMiddle } from "./event-driven-middle";
import { eventDrivenSenior } from "./event-driven-senior";
import { caseStudiesJunior } from "./case-studies-junior";
import { caseStudiesMiddle } from "./case-studies-middle";
import { caseStudiesSenior } from "./case-studies-senior";

export const systemDesignTrackQuestions: Question[] = [
  ...scalabilityJunior,
  ...scalabilityMiddle,
  ...scalabilitySenior,
  ...loadBalancingJunior,
  ...loadBalancingMiddle,
  ...loadBalancingSenior,
  ...cachingCdnJunior,
  ...cachingCdnMiddle,
  ...cachingCdnSenior,
  ...replicationShardingJunior,
  ...replicationShardingMiddle,
  ...replicationShardingSenior,
  ...consistencyJunior,
  ...consistencyMiddle,
  ...consistencySenior,
  ...reliabilityJunior,
  ...reliabilityMiddle,
  ...reliabilitySenior,
  ...eventDrivenJunior,
  ...eventDrivenMiddle,
  ...eventDrivenSenior,
  ...caseStudiesJunior,
  ...caseStudiesMiddle,
  ...caseStudiesSenior,
];
