import type { Question } from "./types";

export const reactQuestions: Question[] = [
  {
    id: "react-jsx-01",
    category: "react",
    level: "junior",
    tags: ["jsx"],
    question: {
      fa: "JSX در نهایت به چه چیزی تبدیل می‌شود؟",
      en: "What does JSX ultimately compile to?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "فراخوانی‌های `jsx` / `React.createElement`",
          en: "Calls to `jsx` / `React.createElement`",
        },
      },
      {
        id: "b",
        text: {
          fa: "فایل HTML خام روی دیسک",
          en: "A raw HTML file on disk",
        },
      },
      {
        id: "c",
        text: {
          fa: "CSS Modules",
          en: "CSS Modules",
        },
      },
      {
        id: "d",
        text: {
          fa: "WebAssembly",
          en: "WebAssembly",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `Babel/کامپایلر JSX را به \`jsx(...)\` یا \`React.createElement\` تبدیل می‌کند.`,
      en: `Babel/the compiler turns JSX into \`jsx(...)\` or \`React.createElement\`.`,
    },
  },
  {
    id: "react-state-01",
    category: "react",
    level: "junior",
    tags: ["hooks", "state"],
    question: {
      fa: "فراخوانی `setState` معمولاً چه می‌کند؟",
      en: "Calling `setState` usually does what?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "باعث زمان‌بندی re-render می‌شود",
          en: "Schedules a re-render",
        },
      },
      {
        id: "b",
        text: {
          fa: "صفحه را full reload می‌کند",
          en: "Fully reloads the page",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط localStorage را عوض می‌کند",
          en: "Only updates localStorage",
        },
      },
      {
        id: "d",
        text: {
          fa: "کامپوننت را unmount می‌کند",
          en: "Unmounts the component",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `\`useState\` state محلی می‌دهد؛ setter باعث re-render می‌شود. برای آپدیت وابسته از functional update استفاده کنید.`,
      en: `\`useState\` holds local state; the setter schedules a re-render. Use functional updates when based on previous state.`,
    },
  },
  {
    id: "react-props-01",
    category: "react",
    level: "junior",
    tags: ["props"],
    question: {
      fa: "تفاوت props و state؟",
      en: "Difference between props and state?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "props از والد می‌آید (خواندنی)؛ state داخلی و قابل تغییر است",
          en: "props come from parent (read-only); state is internal and mutable",
        },
      },
      {
        id: "b",
        text: {
          fa: "هر دو همیشه global هستند",
          en: "Both are always global",
        },
      },
      {
        id: "c",
        text: {
          fa: "state فقط در class و props فقط در function",
          en: "state only in classes, props only in functions",
        },
      },
      {
        id: "d",
        text: {
          fa: "هیچ تفاوتی نیست",
          en: "There is no difference",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `وقتی چند فرزند به یک منبع نیاز دارند، state را lift کنید.`,
      en: `When siblings need one source of truth, lift state up.`,
    },
  },
  {
    id: "react-effect-01",
    category: "react",
    level: "middle",
    tags: ["hooks", "effects"],
    question: {
      fa: "`useEffect` بیشتر برای چیست؟",
      en: "What is `useEffect` mainly for?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "همگام‌سازی با سیستم بیرونی (شبکه، DOM، subscription)",
          en: "Syncing with external systems (network, DOM, subscriptions)",
        },
      },
      {
        id: "b",
        text: {
          fa: "جایگزین کامل `useState`",
          en: "A full replacement for `useState`",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط برای CSS",
          en: "CSS only",
        },
      },
      {
        id: "d",
        text: {
          fa: "اجباری در هر کامپوننت",
          en: "Required in every component",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `برای side effect بیرونی؛ نه مشتق کردن state از state. dependency array و cleanup مهم‌اند.`,
      en: `For external side effects — not deriving state from state. Dependencies and cleanup matter.`,
    },
  },
  {
    id: "react-keys-01",
    category: "react",
    level: "middle",
    tags: ["reconciliation"],
    question: {
      fa: "چرا `key={index}` در لیست‌های قابل تغییر خطرناک است؟",
      en: "Why is `key={index}` risky in mutable lists?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "ممکن است هویت آیتم اشتباه شود و state/UI باگ بخورد",
          en: "Item identity can mismatch and break state/UI",
        },
      },
      {
        id: "b",
        text: {
          fa: "React اصلاً key نمی‌پذیرد",
          en: "React does not accept keys",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط روی موبایل مشکل دارد",
          en: "It only fails on mobile",
        },
      },
      {
        id: "d",
        text: {
          fa: "باعث خطای TypeScript می‌شود",
          en: "It always causes a TypeScript error",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `Key باید پایدار و یکتا بین siblings باشد تا reconciliation درست کار کند.`,
      en: `Keys must be stable and unique among siblings for correct reconciliation.`,
    },
  },
  {
    id: "react-memo-01",
    category: "react",
    level: "middle",
    tags: ["performance"],
    question: {
      fa: "`React.memo` چه زمانی re-render را رد می‌کند؟",
      en: "When does `React.memo` skip a re-render?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "وقتی props با مقایسهٔ سطحی برابر باشند",
          en: "When props are shallow-equal",
        },
      },
      {
        id: "b",
        text: {
          fa: "همیشه، حتی اگر props عوض شود",
          en: "Always, even if props change",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط در Server Components",
          en: "Only in Server Components",
        },
      },
      {
        id: "d",
        text: {
          fa: "هرگز",
          en: "Never",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `\`memo\` / \`useMemo\` / \`useCallback\` برای بهینه‌سازی هدفمنداند — بدون اندازه‌گیری premature هستند.`,
      en: `\`memo\` / \`useMemo\` / \`useCallback\` are targeted optimizations — premature without measurement.`,
    },
  },
  {
    id: "react-concurrent-01",
    category: "react",
    level: "senior",
    tags: ["concurrent"],
    question: {
      fa: "ایدهٔ Concurrent Rendering چیست؟",
      en: "What is the idea behind Concurrent Rendering?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "رندر وقفه‌پذیر و اولویت‌بندی آپدیت‌ها برای UI پاسخ‌گو",
          en: "Interruptible rendering and prioritized updates for a responsive UI",
        },
      },
      {
        id: "b",
        text: {
          fa: "اجرای موازی واقعی روی چند thread اصلی DOM",
          en: "True parallel DOM work on many main threads",
        },
      },
      {
        id: "c",
        text: {
          fa: "حذف کامل JavaScript",
          en: "Removing JavaScript entirely",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط مربوط به Redux است",
          en: "It only relates to Redux",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `APIهایی مثل \`useTransition\` و \`useDeferredValue\` به اولویت‌بندی کمک می‌کنند.`,
      en: `APIs like \`useTransition\` and \`useDeferredValue\` help with prioritization.`,
    },
  },
  {
    id: "react-server-01",
    category: "react",
    level: "senior",
    tags: ["rsc"],
    question: {
      fa: "کدام ویژگی مخصوص Client Component است؟",
      en: "Which belongs to Client Components?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "hooks مثل `useState` و event handler",
          en: "Hooks like `useState` and event handlers",
        },
      },
      {
        id: "b",
        text: {
          fa: "دسترسی مستقیم به DB بدون شبکه",
          en: "Direct DB access with no network",
        },
      },
      {
        id: "c",
        text: {
          fa: "عدم ارسال JS به کلاینت",
          en: "Never shipping JS to the client",
        },
      },
      {
        id: "d",
        text: {
          fa: "اجباری بودن دستور use server",
          en: "Requiring the use server directive",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `Server Components به کلاینت bundle نمی‌شوند و state/effect ندارند؛ Client با \`"use client"\` تعاملی است.`,
      en: `Server Components aren't shipped as client bundles and lack state/effects; Client ones use \`"use client"\` for interactivity.`,
    },
  },
  {
    id: "react-fiber-01",
    category: "react",
    level: "senior",
    tags: ["internals"],
    question: {
      fa: "React Fiber چیست؟",
      en: "What is React Fiber?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "معماری reconciliation قابل وقفه از React 16",
          en: "The interruptible reconciliation architecture since React 16",
        },
      },
      {
        id: "b",
        text: {
          fa: "یک CDN برای React",
          en: "A CDN for React",
        },
      },
      {
        id: "c",
        text: {
          fa: "جایگزین JSX",
          en: "A JSX replacement",
        },
      },
      {
        id: "d",
        text: {
          fa: "نام قدیمی create-react-app",
          en: "The old name of create-react-app",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `Fiber درخت را به واحد کار می‌شکند تا رندر اولویت‌بندی و وقفه‌پذیر شود — پایه concurrent و Suspense.`,
      en: `Fiber splits the tree into units of work so rendering can be prioritized and interrupted — foundation of concurrent features and Suspense.`,
    },
  },
];
