import type { Question } from "./types";

export const designPatternsQuestions: Question[] = [
  {
    id: "dp-composition-01",
    category: "design-patterns",
    level: "junior",
    tags: ["composition"],
    question: {
      fa: "در React معمولاً چه چیزی بر inheritance ترجیح داده می‌شود؟",
      en: "In React, what is usually preferred over inheritance?",
    },
    options: [
      { id: "a", text: { fa: "Composition", en: "Composition" } },
      { id: "b", text: { fa: "Deep class hierarchies", en: "Deep class hierarchies" } },
      { id: "c", text: { fa: "Global mutable singletons فقط", en: "Only global mutable singletons" } },
      { id: "d", text: { fa: "حذف props", en: "Removing props" } },
    ],
    correctOptionId: "a",
    answer: {
      fa: `با \`children\` و ترکیب کامپوننت‌ها انعطاف و تست‌پذیری بیشتر می‌شود.`,
      en: `\`children\` and composing components give more flexibility and testability.`,
    },
  },
  {
    id: "dp-hoc-01",
    category: "design-patterns",
    level: "junior",
    tags: ["hoc"],
    question: {
      fa: "HOC چیست؟",
      en: "What is an HOC?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "تابعی که کامپوننت می‌گیرد و نسخه تقویت‌شده برمی‌گرداند",
          en: "A function that takes a component and returns an enhanced one",
        },
      },
      {
        id: "b",
        text: {
          fa: "یک hook داخلی مرورگر",
          en: "A built-in browser hook",
        },
      },
      {
        id: "c",
        text: {
          fa: "فایل CSS",
          en: "A CSS file",
        },
      },
      {
        id: "d",
        text: {
          fa: "دیتابیس",
          en: "A database",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `امروز اغلب منطق مشابه با hooks حل می‌شود؛ HOC هنوز در کدبیس‌های قدیمی دیده می‌شود.`,
      en: `Today similar logic is often done with hooks; HOCs still appear in older codebases.`,
    },
  },
  {
    id: "dp-render-props-01",
    category: "design-patterns",
    level: "junior",
    tags: ["render-props"],
    question: {
      fa: "Render Props یعنی چه؟",
      en: "What are Render Props?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "کامپوننت یک تابع prop می‌گیرد تا UI را به مصرف‌کننده بسپارد",
          en: "A component takes a function prop to let the consumer render UI",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط استایل inline",
          en: "Inline styles only",
        },
      },
      {
        id: "c",
        text: {
          fa: "حذف کامل JSX",
          en: "Removing JSX entirely",
        },
      },
      {
        id: "d",
        text: {
          fa: "الگوی مخصوص Vue",
          en: "A Vue-only pattern",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `منطق share می‌شود و رندر به بیرون واگذار می‌گردد — شبیه \`children\` به‌صورت تابع.`,
      en: `Logic is shared while rendering is delegated — often as a function \`children\`.`,
    },
  },
  {
    id: "dp-compound-01",
    category: "design-patterns",
    level: "middle",
    tags: ["compound"],
    question: {
      fa: "Compound Components چه ویژگی‌ای دارند؟",
      en: "What characterizes Compound Components?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "کامپوننت‌های مرتبط که state را ضمنی share می‌کنند",
          en: "Related components that implicitly share state",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط یک فایل CSS مشترک",
          en: "Only one shared CSS file",
        },
      },
      {
        id: "c",
        text: {
          fa: "عدم امکان nesting",
          en: "No nesting allowed",
        },
      },
      {
        id: "d",
        text: {
          fa: "اجباری بودن Redux",
          en: "Requiring Redux",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `مثل \`Select\` + \`Select.Option\` — API شبیه HTML بومی و کنترل layout در دست مصرف‌کننده.`,
      en: `Like \`Select\` + \`Select.Option\` — HTML-like API with layout control for the consumer.`,
    },
  },
  {
    id: "dp-controlled-01",
    category: "design-patterns",
    level: "middle",
    tags: ["controlled"],
    question: {
      fa: "در Controlled component منبع حقیقت کجاست؟",
      en: "In a Controlled component, where is the source of truth?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "React state (`value` + `onChange`)",
          en: "React state (`value` + `onChange`)",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط DOM بدون React",
          en: "Only the DOM without React",
        },
      },
      {
        id: "c",
        text: {
          fa: "فایل `.env`",
          en: "The `.env` file",
        },
      },
      {
        id: "d",
        text: {
          fa: "CDN",
          en: "The CDN",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `Uncontrolled با \`ref\`/defaultValue در DOM است — برای فرم ساده/عملکرد.`,
      en: `Uncontrolled uses \`ref\`/defaultValue in the DOM — good for simple/perf forms.`,
    },
  },
  {
    id: "dp-observer-01",
    category: "design-patterns",
    level: "middle",
    tags: ["observer"],
    question: {
      fa: "کدام نمونهٔ Observer در فرانت است؟",
      en: "Which is an Observer example on the frontend?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "DOM events / store subscriptions / IntersectionObserver",
          en: "DOM events / store subscriptions / IntersectionObserver",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط `border-radius`",
          en: "Only `border-radius`",
        },
      },
      {
        id: "c",
        text: {
          fa: "فشرده‌سازی تصویر JPEG",
          en: "JPEG compression",
        },
      },
      {
        id: "d",
        text: {
          fa: "DNS lookup",
          en: "DNS lookup",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `Subject تغییر را به subscribers اعلام می‌کند و coupling را کم می‌کند.`,
      en: `A subject notifies subscribers of changes and reduces coupling.`,
    },
  },
  {
    id: "dp-di-01",
    category: "design-patterns",
    level: "senior",
    tags: ["architecture"],
    question: {
      fa: "Dependency Injection در فرانت عمدتاً چه می‌دهد؟",
      en: "What does Dependency Injection mainly give the frontend?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "تست‌پذیری و تعویض پیاده‌سازی (mock/real)",
          en: "Testability and swappable implementations (mock/real)",
        },
      },
      {
        id: "b",
        text: {
          fa: "حذف کامل TypeScript",
          en: "Removing TypeScript entirely",
        },
      },
      {
        id: "c",
        text: {
          fa: "افزایش اجباری coupling",
          en: "Forced higher coupling",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط انیمیشن",
          en: "Animation only",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `وابستگی از بیرون تزریق می‌شود: props، Context، یا container.`,
      en: `Dependencies are provided from outside: props, Context, or a container.`,
    },
  },
  {
    id: "dp-module-01",
    category: "design-patterns",
    level: "senior",
    tags: ["architecture"],
    question: {
      fa: "Feature-Sliced Design روی چه تمرکز دارد؟",
      en: "What does Feature-Sliced Design focus on?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "سازمان‌دهی حول featureها و لایه‌ها با قانون وابستگی",
          en: "Organizing around features and layers with a dependency rule",
        },
      },
      {
        id: "b",
        text: {
          fa: "یک پوشهٔ تخت برای همه چیز",
          en: "One flat folder for everything",
        },
      },
      {
        id: "c",
        text: {
          fa: "حذف کامپوننت‌ها",
          en: "Removing components",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط بک‌اند",
          en: "Backend only",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `لایه‌های بالاتر به پایین‌تر وابسته‌اند نه برعکس — coupling کمتر، ownership واضح‌تر.`,
      en: `Higher layers depend on lower ones, not vice versa — less coupling, clearer ownership.`,
    },
  },
  {
    id: "dp-cqrs-ui-01",
    category: "design-patterns",
    level: "senior",
    tags: ["advanced"],
    question: {
      fa: "جدا کردن read/write model در UI یعنی چه؟",
      en: "Separating read/write models in the UI means what?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "فرم ویرایش و نمایش لیست می‌توانند shape/cache جدا داشته باشند",
          en: "Edit forms and list views can use different shapes/caches",
        },
      },
      {
        id: "b",
        text: {
          fa: "یک مدل اجباری برای همه کارها",
          en: "One mandatory model for everything",
        },
      },
      {
        id: "c",
        text: {
          fa: "حذف فرم‌ها",
          en: "Removing forms",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط مربوط به رنگ تم است",
          en: "It only concerns theme colors",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `ایدهٔ CQRS در مقیاس کوچک UI — از مدل همه‌کارهٔ شکننده اجتناب می‌کند.`,
      en: `CQRS ideas at a small UI scale — avoids a brittle do-everything model.`,
    },
  },
];
