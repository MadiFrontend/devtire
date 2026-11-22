import type { Question } from "../types";
import { complexityJunior } from "./complexity-junior";
import { complexityMiddle } from "./complexity-middle";
import { complexitySenior } from "./complexity-senior";
import { arraysStringsJunior } from "./arrays-strings-junior";
import { arraysStringsMiddle } from "./arrays-strings-middle";
import { arraysStringsSenior } from "./arrays-strings-senior";
import { hashingJunior } from "./hashing-junior";
import { hashingMiddle } from "./hashing-middle";
import { hashingSenior } from "./hashing-senior";
import { linkedListsJunior } from "./linked-lists-junior";
import { linkedListsMiddle } from "./linked-lists-middle";
import { linkedListsSenior } from "./linked-lists-senior";
import { treesJunior } from "./trees-junior";
import { treesMiddle } from "./trees-middle";
import { treesSenior } from "./trees-senior";
import { graphsJunior } from "./graphs-junior";
import { graphsMiddle } from "./graphs-middle";
import { graphsSenior } from "./graphs-senior";
import { sortingSearchingJunior } from "./sorting-searching-junior";
import { sortingSearchingMiddle } from "./sorting-searching-middle";
import { sortingSearchingSenior } from "./sorting-searching-senior";
import { dynamicProgrammingJunior } from "./dynamic-programming-junior";
import { dynamicProgrammingMiddle } from "./dynamic-programming-middle";
import { dynamicProgrammingSenior } from "./dynamic-programming-senior";

export const algorithmsQuestions: Question[] = [
  ...complexityJunior,
  ...complexityMiddle,
  ...complexitySenior,
  ...arraysStringsJunior,
  ...arraysStringsMiddle,
  ...arraysStringsSenior,
  ...hashingJunior,
  ...hashingMiddle,
  ...hashingSenior,
  ...linkedListsJunior,
  ...linkedListsMiddle,
  ...linkedListsSenior,
  ...treesJunior,
  ...treesMiddle,
  ...treesSenior,
  ...graphsJunior,
  ...graphsMiddle,
  ...graphsSenior,
  ...sortingSearchingJunior,
  ...sortingSearchingMiddle,
  ...sortingSearchingSenior,
  ...dynamicProgrammingJunior,
  ...dynamicProgrammingMiddle,
  ...dynamicProgrammingSenior,
];
