import type { Question } from "./types";

export const htmlCssQuestions: Question[] = [
  {
    id: "html-semantic-01",
    category: "html-css",
    level: "junior",
    tags: ["semantic", "a11y"],
    question: {
      fa: "مزیت اصلی تگ‌های semantic مثل `<nav>` و `<main>` چیست؟",
      en: "What is the main benefit of semantic tags like `<nav>` and `<main>`?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "معنا برای a11y و SEO + خوانایی کد",
          en: "Meaning for a11y & SEO + clearer code",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط سرعت رندر را بالا می‌برند",
          en: "They only make rendering faster",
        },
      },
      {
        id: "c",
        text: {
          fa: "جایگزین کامل CSS هستند",
          en: "They fully replace CSS",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط در XHTML کار می‌کنند",
          en: "They only work in XHTML",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `تگ‌های semantic معنای محتوا را منتقل می‌کنند → screen reader بهتر، SEO قوی‌تر، کد خواناتر.`,
      en: `Semantic tags convey meaning → better screen readers, stronger SEO, clearer code.`,
    },
  },
  {
    id: "html-box-model-01",
    category: "html-css",
    level: "junior",
    tags: ["box-model"],
    question: {
      fa: "با `box-sizing: border-box` عرض شامل چیست؟",
      en: "With `box-sizing: border-box`, width includes what?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "فقط content",
          en: "Content only",
        },
      },
      {
        id: "b",
        text: {
          fa: "content + padding + border",
          en: "content + padding + border",
        },
      },
      {
        id: "c",
        text: {
          fa: "content + margin",
          en: "content + margin",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط border",
          en: "Border only",
        },
      },
    ],
    correctOptionId: "b",
    answer: {
      fa: `Box model: content → padding → border → margin.
\`border-box\` عرض/ارتفاع را شامل padding و border می‌کند (نه margin).`,
      en: `Box model: content → padding → border → margin.
\`border-box\` includes padding and border in width/height (not margin).`,
    },
  },
  {
    id: "html-flex-01",
    category: "html-css",
    level: "junior",
    tags: ["flexbox"],
    question: {
      fa: "تفاوت اصلی Flexbox و Grid؟",
      en: "Main difference between Flexbox and Grid?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "Flex یک‌بعدی؛ Grid دوبعدی",
          en: "Flex is 1D; Grid is 2D",
        },
      },
      {
        id: "b",
        text: {
          fa: "Grid فقط برای موبایل است",
          en: "Grid is mobile-only",
        },
      },
      {
        id: "c",
        text: {
          fa: "Flex نمی‌تواند تراز کند",
          en: "Flex cannot align items",
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
      fa: `Flexbox برای ردیف یا ستون؛ Grid برای ردیف+ستون همزمان. اغلب با هم استفاده می‌شوند.`,
      en: `Flexbox for a row or column; Grid for rows+columns together. Often combined.`,
    },
  },
  {
    id: "html-specificity-01",
    category: "html-css",
    level: "middle",
    tags: ["specificity"],
    question: {
      fa: "کدام selector معمولاً specificity بالاتری دارد؟",
      en: "Which selector usually has higher specificity?",
    },
    options: [
      { id: "a", text: { fa: "`div`", en: "`div`" } },
      { id: "b", text: { fa: "`.card`", en: "`.card`" } },
      { id: "c", text: { fa: "`#header`", en: "`#header`" } },
      { id: "d", text: { fa: "`*`", en: "`*`" } },
    ],
    correctOptionId: "c",
    answer: {
      fa: `ترتیب تقریبی: id > class/attr/pseudo-class > element.
\`!important\` و inline جداگانه cascade را دور می‌زنند.`,
      en: `Rough order: id > class/attr/pseudo-class > element.
\`!important\` and inline styles bypass the normal cascade.`,
    },
  },
  {
    id: "html-reflow-01",
    category: "html-css",
    level: "middle",
    tags: ["performance"],
    question: {
      fa: "کدام عملیات معمولاً گران‌تر است؟",
      en: "Which operation is usually more expensive?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "تغییر `color` (repaint)",
          en: "Changing `color` (repaint)",
        },
      },
      {
        id: "b",
        text: {
          fa: "تغییر `width` که باعث reflow/layout شود",
          en: "Changing `width` that triggers reflow/layout",
        },
      },
      {
        id: "c",
        text: {
          fa: "تغییر فقط `opacity` با GPU",
          en: "Changing only GPU `opacity`",
        },
      },
      {
        id: "d",
        text: {
          fa: "خواندن یک متغیر JS",
          en: "Reading a JS variable",
        },
      },
    ],
    correctOptionId: "b",
    answer: {
      fa: `Reflow هندسه را دوباره حساب می‌کند و گران‌تر از repaint است.
برای انیمیشن ترجیحاً \`transform\`/\`opacity\`.`,
      en: `Reflow recalculates geometry and is costlier than paint.
Prefer \`transform\`/\`opacity\` for animation.`,
    },
  },
  {
    id: "html-bfc-01",
    category: "html-css",
    level: "middle",
    tags: ["layout"],
    question: {
      fa: "BFC چه کمکی می‌کند؟",
      en: "What does a BFC help with?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "شامل کردن float و جلوگیری از margin collapse با بیرون",
          en: "Containing floats and preventing outer margin collapse",
        },
      },
      {
        id: "b",
        text: {
          fa: "اجرای JavaScript سریع‌تر",
          en: "Making JavaScript faster",
        },
      },
      {
        id: "c",
        text: {
          fa: "فعال‌سازی Service Worker",
          en: "Enabling Service Workers",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط برای SVG",
          en: "SVG only",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `BFC یک محدوده layout مستقل است. با \`overflow\`, \`flow-root\`, flex/grid و... ساخته می‌شود.`,
      en: `A BFC is an independent layout region. Created via \`overflow\`, \`flow-root\`, flex/grid, etc.`,
    },
  },
  {
    id: "html-critical-css-01",
    category: "html-css",
    level: "senior",
    tags: ["performance", "css"],
    question: {
      fa: "Critical CSS به چه معناست؟",
      en: "What does Critical CSS mean?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "استایل above-the-fold برای First Paint سریع‌تر",
          en: "Above-the-fold styles for faster First Paint",
        },
      },
      {
        id: "b",
        text: {
          fa: "حذف کامل همه CSS",
          en: "Removing all CSS entirely",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط dark mode",
          en: "Dark mode only",
        },
      },
      {
        id: "d",
        text: {
          fa: "CSS نوشته‌شده با TypeScript",
          en: "CSS written in TypeScript",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `استایل ضروری above-the-fold اغلب inline می‌شود چون CSS خارجی render-blocking است.`,
      en: `Needed above-the-fold CSS is often inlined because external CSS is render-blocking.`,
    },
  },
  {
    id: "html-container-01",
    category: "html-css",
    level: "senior",
    tags: ["responsive"],
    question: {
      fa: "Container Queries بر اساس چه چیزی واکنش نشان می‌دهند؟",
      en: "What do Container Queries respond to?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "فقط عرض کل viewport",
          en: "Only the full viewport width",
        },
      },
      {
        id: "b",
        text: {
          fa: "اندازهٔ والد/کانتینر کامپوننت",
          en: "The component's parent/container size",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط ارتفاع صفحه",
          en: "Only page height",
        },
      },
      {
        id: "d",
        text: {
          fa: "سرعت اینترنت کاربر",
          en: "The user's network speed",
        },
      },
    ],
    correctOptionId: "b",
    answer: {
      fa: `برخلاف media query مبتنی بر viewport، container query به عرض والد واکنش می‌دهد: طراحی کامپوننت‌محور.`,
      en: `Unlike viewport media queries, container queries react to parent width: component-driven design.`,
    },
  },
  {
    id: "html-a11y-01",
    category: "html-css",
    level: "senior",
    tags: ["a11y"],
    question: {
      fa: "برای مودال accessible کدام ضروری است؟",
      en: "Which is essential for an accessible modal?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "focus trap + بستن با Escape + بازگردانی فوکوس",
          en: "Focus trap + Escape to close + restore focus",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط رنگ قرمز برای دکمه بستن",
          en: "Only a red close button",
        },
      },
      {
        id: "c",
        text: {
          fa: "غیرفعال کردن کامل کیبورد",
          en: "Disabling the keyboard entirely",
        },
      },
      {
        id: "d",
        text: {
          fa: "استفاده از `alert()` مرورگر",
          en: "Using the browser `alert()`",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `نقش dialog، aria-modal، focus trap، Escape، بازگردانی فوکوس، و ترجیحاً \`<dialog>.showModal()\`.`,
      en: `Dialog role, aria-modal, focus trap, Escape, focus restore, preferably \`<dialog>.showModal()\`.`,
    },
  },
];
