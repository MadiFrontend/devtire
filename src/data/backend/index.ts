import type { Question } from "../types";
import { nodejsJunior } from "./nodejs-junior";
import { nodejsMiddle } from "./nodejs-middle";
import { nodejsSenior } from "./nodejs-senior";
import { apiDesignJunior } from "./api-design-junior";
import { apiDesignMiddle } from "./api-design-middle";
import { apiDesignSenior } from "./api-design-senior";
import { databasesJunior } from "./databases-junior";
import { databasesMiddle } from "./databases-middle";
import { databasesSenior } from "./databases-senior";
import { nosqlJunior } from "./nosql-junior";
import { nosqlMiddle } from "./nosql-middle";
import { nosqlSenior } from "./nosql-senior";
import { cachingJunior } from "./caching-junior";
import { cachingMiddle } from "./caching-middle";
import { cachingSenior } from "./caching-senior";
import { authSecurityJunior } from "./auth-security-junior";
import { authSecurityMiddle } from "./auth-security-middle";
import { authSecuritySenior } from "./auth-security-senior";
import { messageQueuesJunior } from "./message-queues-junior";
import { messageQueuesMiddle } from "./message-queues-middle";
import { messageQueuesSenior } from "./message-queues-senior";
import { backendArchitectureJunior } from "./backend-architecture-junior";
import { backendArchitectureMiddle } from "./backend-architecture-middle";
import { backendArchitectureSenior } from "./backend-architecture-senior";

export const backendQuestions: Question[] = [
  ...nodejsJunior,
  ...nodejsMiddle,
  ...nodejsSenior,
  ...apiDesignJunior,
  ...apiDesignMiddle,
  ...apiDesignSenior,
  ...databasesJunior,
  ...databasesMiddle,
  ...databasesSenior,
  ...nosqlJunior,
  ...nosqlMiddle,
  ...nosqlSenior,
  ...cachingJunior,
  ...cachingMiddle,
  ...cachingSenior,
  ...authSecurityJunior,
  ...authSecurityMiddle,
  ...authSecuritySenior,
  ...messageQueuesJunior,
  ...messageQueuesMiddle,
  ...messageQueuesSenior,
  ...backendArchitectureJunior,
  ...backendArchitectureMiddle,
  ...backendArchitectureSenior,
];
