import type { Question } from "../types";
import { htmlCssJunior } from "./html-css-junior";
import { htmlCssMiddle } from "./html-css-middle";
import { htmlCssSenior } from "./html-css-senior";
import { javascriptJunior } from "./javascript-junior";
import { javascriptMiddle } from "./javascript-middle";
import { javascriptSenior } from "./javascript-senior";
import { typescriptJunior } from "./typescript-junior";
import { typescriptMiddle } from "./typescript-middle";
import { typescriptSenior } from "./typescript-senior";
import { reactJunior } from "./react-junior";
import { reactMiddle } from "./react-middle";
import { reactSenior } from "./react-senior";
import { stateManagementJunior } from "./state-management-junior";
import { stateManagementMiddle } from "./state-management-middle";
import { stateManagementSenior } from "./state-management-senior";
import { nextjsJunior } from "./nextjs-junior";
import { nextjsMiddle } from "./nextjs-middle";
import { nextjsSenior } from "./nextjs-senior";
import { designPatternsJunior } from "./design-patterns-junior";
import { designPatternsMiddle } from "./design-patterns-middle";
import { designPatternsSenior } from "./design-patterns-senior";
import { systemDesignJunior } from "./system-design-junior";
import { systemDesignMiddle } from "./system-design-middle";
import { systemDesignSenior } from "./system-design-senior";

export const extraQuestions: Question[] = [
  ...htmlCssJunior,
  ...htmlCssMiddle,
  ...htmlCssSenior,
  ...javascriptJunior,
  ...javascriptMiddle,
  ...javascriptSenior,
  ...typescriptJunior,
  ...typescriptMiddle,
  ...typescriptSenior,
  ...reactJunior,
  ...reactMiddle,
  ...reactSenior,
  ...stateManagementJunior,
  ...stateManagementMiddle,
  ...stateManagementSenior,
  ...nextjsJunior,
  ...nextjsMiddle,
  ...nextjsSenior,
  ...designPatternsJunior,
  ...designPatternsMiddle,
  ...designPatternsSenior,
  ...systemDesignJunior,
  ...systemDesignMiddle,
  ...systemDesignSenior,
];
