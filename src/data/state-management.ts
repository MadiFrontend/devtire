import type { Question } from "./types";

export const stateManagementQuestions: Question[] = [
  {
    id: "sm-local-01",
    category: "state-management",
    level: "junior",
    tags: ["basics"],
    question: {
      fa: "چه زمانی state محلی کافی است؟",
      en: "When is local state enough?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "وقتی فقط یک کامپوننت/شاخه نزدیک به آن نیاز دارد",
          en: "When only one component / nearby branch needs it",
        },
      },
      {
        id: "b",
        text: {
          fa: "همیشه باید global باشد",
          en: "It must always be global",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط برای theme",
          en: "Only for theme",
        },
      },
      {
        id: "d",
        text: {
          fa: "هرگز نباید local باشد",
          en: "It should never be local",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `UI یک کامپوننت (مودال، input) محلی بماند؛ داده مشترک دور در درخت → global.`,
      en: `Keep one-component UI local (modal, input); shared distant data → global.`,
    },
  },
  {
    id: "sm-context-01",
    category: "state-management",
    level: "junior",
    tags: ["context"],
    question: {
      fa: "Context برای چه مناسب‌تر است؟",
      en: "What is Context a better fit for?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "داده نسبتاً پایدار مثل theme/locale/auth",
          en: "Fairly stable data like theme/locale/auth",
        },
      },
      {
        id: "b",
        text: {
          fa: "هر keystroke در یک input سنگین با صدها consumer",
          en: "Every keystroke in a heavy input with hundreds of consumers",
        },
      },
      {
        id: "c",
        text: {
          fa: "جایگزین کامل شبکه",
          en: "Fully replacing the network",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط برای CSS",
          en: "CSS only",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `برای state پرتغییر با consumer زیاد، store مبتنی بر selector (Zustand/Redux) بهتر است.`,
      en: `For high-churn state with many consumers, a selector-based store (Zustand/Redux) is better.`,
    },
  },
  {
    id: "sm-flux-01",
    category: "state-management",
    level: "junior",
    tags: ["redux"],
    question: {
      fa: "جریان داده در Flux/Redux چگونه است؟",
      en: "How does data flow in Flux/Redux?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "یک‌طرفه: View → Action → Store → View",
          en: "Unidirectional: View → Action → Store → View",
        },
      },
      {
        id: "b",
        text: {
          fa: "دوطرفه آزاد بین همه لایه‌ها",
          en: "Free bidirectional between all layers",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط از Store به DOM بدون action",
          en: "Only Store to DOM with no actions",
        },
      },
      {
        id: "d",
        text: {
          fa: "تصادفی",
          en: "Random",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `State متمرکز با reducer خالص → پیش‌بینی‌پذیری و دیباگ بهتر.`,
      en: `Central state with pure reducers → predictability and easier debugging.`,
    },
  },
  {
    id: "sm-zustand-01",
    category: "state-management",
    level: "middle",
    tags: ["zustand"],
    question: {
      fa: "چرا Zustand محبوب شد؟",
      en: "Why did Zustand become popular?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "API مینیمال، selector، کم‌boilerplate",
          en: "Minimal API, selectors, little boilerplate",
        },
      },
      {
        id: "b",
        text: {
          fa: "اجباری بودن Provider پیچیده",
          en: "Requiring a complex Provider",
        },
      },
      {
        id: "c",
        text: {
          fa: "حذف کامل React",
          en: "Removing React entirely",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط برای Vue",
          en: "Vue only",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `جایگزین سبک Redux برای بسیاری از اپ‌های متوسط.`,
      en: `A lightweight Redux alternative for many mid-size apps.`,
    },
  },
  {
    id: "sm-redux-toolkit-01",
    category: "state-management",
    level: "middle",
    tags: ["redux"],
    question: {
      fa: "Redux Toolkit چه چیزی را ساده کرد؟",
      en: "What did Redux Toolkit simplify?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "ساخت slice/store و async با boilerplate کمتر",
          en: "Building slices/stores and async with less boilerplate",
        },
      },
      {
        id: "b",
        text: {
          fa: "حذف کامل state",
          en: "Removing state entirely",
        },
      },
      {
        id: "c",
        text: {
          fa: "اجباری کردن class component",
          en: "Mandating class components",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط استایل‌دهی",
          en: "Styling only",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `\`createSlice\`، \`configureStore\`، \`createAsyncThunk\` و RTK Query برای data fetching.`,
      en: `\`createSlice\`, \`configureStore\`, \`createAsyncThunk\`, and RTK Query for data fetching.`,
    },
  },
  {
    id: "sm-server-state-01",
    category: "state-management",
    level: "middle",
    tags: ["react-query"],
    question: {
      fa: "server state معمولاً کجا بهتر مدیریت می‌شود؟",
      en: "Where is server state usually better managed?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "کتابخانه‌هایی مثل React Query / SWR / RTK Query",
          en: "Libraries like React Query / SWR / RTK Query",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط در یک \`useState\` بدون cache",
          en: "Only in one \`useState\` with no cache",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط CSS variables",
          en: "Only CSS variables",
        },
      },
      {
        id: "d",
        text: {
          fa: "هیچ‌وقت نباید cache شود",
          en: "It should never be cached",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `Server state ممکن است stale شود و به revalidate نیاز دارد؛ client state مال UI است.`,
      en: `Server state can go stale and needs revalidation; client state belongs to the UI.`,
    },
  },
  {
    id: "sm-normalize-01",
    category: "state-management",
    level: "senior",
    tags: ["architecture"],
    question: {
      fa: "normalize کردن state چه کمکی می‌کند؟",
      en: "How does normalizing state help?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "کاهش duplication و آپدیت ساده‌تر entity با id",
          en: "Less duplication and simpler updates by entity id",
        },
      },
      {
        id: "b",
        text: {
          fa: "افزایش عمدی duplication",
          en: "Intentionally increasing duplication",
        },
      },
      {
        id: "c",
        text: {
          fa: "حذف همه idها",
          en: "Removing all ids",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط برای تصاویر",
          en: "Images only",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `الگو: \`{ byId, allIds }\` شبیه دیتابیس رابطه‌ای.`,
      en: `Pattern: \`{ byId, allIds }\` like a relational DB.`,
    },
  },
  {
    id: "sm-select-01",
    category: "state-management",
    level: "senior",
    tags: ["performance"],
    question: {
      fa: "selector چگونه re-render را کم می‌کند؟",
      en: "How do selectors reduce re-renders?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "کامپوننت فقط به slice لازم subscribe می‌شود",
          en: "The component subscribes only to the needed slice",
        },
      },
      {
        id: "b",
        text: {
          fa: "همه store را هر بار force می‌کند",
          en: "It force-updates the whole store every time",
        },
      },
      {
        id: "c",
        text: {
          fa: "React را خاموش می‌کند",
          en: "It turns React off",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط برای CSS",
          en: "CSS only",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `با equality check فقط وقتی خروجی عوض شود رندر می‌شود (\`useSelector\` / selector Zustand).`,
      en: `With equality checks it re-renders only when the output changes (\`useSelector\` / Zustand selector).`,
    },
  },
  {
    id: "sm-event-sourcing-01",
    category: "state-management",
    level: "senior",
    tags: ["advanced"],
    question: {
      fa: "برای Undo/Redo معمولاً چه نگه می‌داریم؟",
      en: "For undo/redo we typically keep what?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "پشته past / present / future از snapshot یا command",
          en: "past / present / future stacks of snapshots or commands",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط یک boolean",
          en: "Only a boolean",
        },
      },
      {
        id: "c",
        text: {
          fa: "هیچ تاریخی",
          en: "No history",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط نام فایل",
          en: "Only file names",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `برای state بزرگ بهتر است patch/diff یا command pattern به‌جای کل snapshot.`,
      en: `For large state prefer patches/diffs or the command pattern over full snapshots.`,
    },
  },
];
