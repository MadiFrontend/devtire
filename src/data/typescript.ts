import type { Question } from "./types";

export const typescriptQuestions: Question[] = [
  {
    id: "ts-vs-js-01",
    category: "typescript",
    level: "junior",
    tags: ["basics"],
    question: {
      fa: "ارزش اصلی TypeScript نسبت به JS چیست؟",
      en: "What is TypeScript's main value over JS?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "تایپ استاتیک و گرفتن خطا قبل از runtime",
          en: "Static types catching errors before runtime",
        },
      },
      {
        id: "b",
        text: {
          fa: "اجرای سریع‌تر در همه مرورگرها بدون compile",
          en: "Faster execution in every browser with no compile step",
        },
      },
      {
        id: "c",
        text: {
          fa: "جایگزین HTML",
          en: "Replacing HTML",
        },
      },
      {
        id: "d",
        text: {
          fa: "حذف کامل نیاز به تست",
          en: "Removing the need for tests entirely",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `TS به JS کامپایل می‌شود و تایپ‌ها در runtime پاک می‌شوند (مگر با lib جدا).`,
      en: `TS compiles to JS and types are erased at runtime (unless you add runtime libs).`,
    },
  },
  {
    id: "ts-interface-type-01",
    category: "typescript",
    level: "junior",
    tags: ["types"],
    question: {
      fa: "کدام قابلیت بیشتر مخصوص `interface` است؟",
      en: "Which capability is more specific to `interface`?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "declaration merging",
          en: "Declaration merging",
        },
      },
      {
        id: "b",
        text: {
          fa: "ساخت union پیچیده",
          en: "Complex unions",
        },
      },
      {
        id: "c",
        text: {
          fa: "mapped types پیشرفته",
          en: "Advanced mapped types",
        },
      },
      {
        id: "d",
        text: {
          fa: "tuple types",
          en: "Tuple types",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `\`interface\` merge/extend می‌شود؛ \`type\` برای union/tuple/conditional قوی‌تر است.`,
      en: `\`interface\` can merge/extend; \`type\` is stronger for unions/tuples/conditionals.`,
    },
  },
  {
    id: "ts-unknown-01",
    category: "typescript",
    level: "junior",
    tags: ["narrowing"],
    question: {
      fa: "تفاوت `any` و `unknown`؟",
      en: "Difference between `any` and `unknown`?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "`unknown` امن‌تر است و قبل از استفاده باید narrow شود",
          en: "`unknown` is safer and must be narrowed before use",
        },
      },
      {
        id: "b",
        text: {
          fa: "`any` همیشه بهتر است",
          en: "`any` is always better",
        },
      },
      {
        id: "c",
        text: {
          fa: "هیچ تفاوتی نیست",
          en: "There is no difference",
        },
      },
      {
        id: "d",
        text: {
          fa: "`unknown` فقط در runtime چک می‌شود",
          en: "`unknown` is only checked at runtime",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `\`any\` سیستم تایپ را خاموش می‌کند؛ \`unknown\` مجبور به narrowing می‌کند.`,
      en: `\`any\` turns the type system off; \`unknown\` forces narrowing.`,
    },
  },
  {
    id: "ts-generics-01",
    category: "typescript",
    level: "middle",
    tags: ["generics"],
    question: {
      fa: "Generics چه کمکی می‌کنند؟",
      en: "What do generics help with?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "انتزاع روی تایپ بدون از دست دادن اطلاعات نوع",
          en: "Abstracting over types without losing type info",
        },
      },
      {
        id: "b",
        text: {
          fa: "حذف کامل نیاز به تایپ",
          en: "Removing types entirely",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط برای CSS-in-JS",
          en: "Only for CSS-in-JS",
        },
      },
      {
        id: "d",
        text: {
          fa: "افزایش سرعت runtime",
          en: "Speeding up runtime",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `مثال: \`function identity<T>(v: T): T\`: ورودی و خروجی هم‌نوع می‌مانند.`,
      en: `Example: \`function identity<T>(v: T): T\`: input/output stay typed together.`,
    },
  },
  {
    id: "ts-utility-01",
    category: "typescript",
    level: "middle",
    tags: ["utility-types"],
    question: {
      fa: "`Partial<T>` چه می‌کند؟",
      en: "What does `Partial<T>` do?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "همه propertyها را اختیاری می‌کند",
          en: "Makes all properties optional",
        },
      },
      {
        id: "b",
        text: {
          fa: "همه را required می‌کند",
          en: "Makes all required",
        },
      },
      {
        id: "c",
        text: {
          fa: "تایپ را به string تبدیل می‌کند",
          en: "Converts the type to string",
        },
      },
      {
        id: "d",
        text: {
          fa: "آرایه می‌سازد",
          en: "Creates an array",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `دیگر utilityها: \`Pick\`, \`Omit\`, \`Record\`, \`Readonly\`, \`ReturnType\`, ...`,
      en: `Other utilities: \`Pick\`, \`Omit\`, \`Record\`, \`Readonly\`, \`ReturnType\`, ...`,
    },
  },
  {
    id: "ts-narrow-01",
    category: "typescript",
    level: "middle",
    tags: ["narrowing"],
    question: {
      fa: "در discriminated union، معمولاً با چه چیزی narrow می‌کنیم؟",
      en: "In a discriminated union, what do we usually narrow on?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "یک فیلد مشترک مثل `kind`",
          en: "A shared field like `kind`",
        },
      },
      {
        id: "b",
        text: {
          fa: "نام فایل",
          en: "The file name",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط `any`",
          en: "Only `any`",
        },
      },
      {
        id: "d",
        text: {
          fa: "شماره خط",
          en: "Line numbers",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `با \`typeof\`, \`in\`, \`instanceof\` و equality روی discriminant، union محدود می‌شود.`,
      en: `\`typeof\`, \`in\`, \`instanceof\`, and equality on a discriminant shrink the union.`,
    },
  },
  {
    id: "ts-conditional-01",
    category: "typescript",
    level: "senior",
    tags: ["advanced"],
    question: {
      fa: "شکل کلی conditional type کدام است؟",
      en: "What is the general shape of a conditional type?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "`T extends U ? X : Y`",
          en: "`T extends U ? X : Y`",
        },
      },
      {
        id: "b",
        text: {
          fa: "`T && U || Y`",
          en: "`T && U || Y`",
        },
      },
      {
        id: "c",
        text: {
          fa: "`if T then U`",
          en: "`if T then U`",
        },
      },
      {
        id: "d",
        text: {
          fa: "`T ?? U`",
          en: "`T ?? U`",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `با \`infer\` می‌توان تایپ داخلی را استخراج کرد؛ پایه بسیاری از utilityهای پیشرفته.`,
      en: `\`infer\` extracts inner types; foundation of many advanced utilities.`,
    },
  },
  {
    id: "ts-satisfies-01",
    category: "typescript",
    level: "senior",
    tags: ["advanced"],
    question: {
      fa: "`satisfies` چه کمکی می‌کند؟",
      en: "What does `satisfies` help with?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "اعتبارسنجی سازگاری بدون widen کردن literalها",
          en: "Validate compatibility without widening literals",
        },
      },
      {
        id: "b",
        text: {
          fa: "اجرای کد در runtime",
          en: "Executing code at runtime",
        },
      },
      {
        id: "c",
        text: {
          fa: "حذف کامل type check",
          en: "Turning off type checking",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط برای enum",
          en: "Enums only",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `مقدار چک می‌شود که با تایپ سازگار باشد، اما نوع استنباط‌شدهٔ دقیق (literal) حفظ می‌ماند.`,
      en: `The value is checked against a type while keeping precise inferred literals.`,
    },
  },
  {
    id: "ts-declare-01",
    category: "typescript",
    level: "senior",
    tags: ["declaration"],
    question: {
      fa: "فایل `.d.ts` برای چیست؟",
      en: "What are `.d.ts` files for?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "اعلام تایپ برای JS/API بدون پیاده‌سازی",
          en: "Declaring types for JS/APIs without implementation",
        },
      },
      {
        id: "b",
        text: {
          fa: "استایل CSS",
          en: "CSS styles",
        },
      },
      {
        id: "c",
        text: {
          fa: "تست e2e",
          en: "E2E tests",
        },
      },
      {
        id: "d",
        text: {
          fa: "bundle نهایی مرورگر",
          en: "The final browser bundle",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `مثل \`@types/*\` یا \`declare module\` برای پکیج‌های بدون تایپ.`,
      en: `Like \`@types/*\` or \`declare module\` for untyped packages.`,
    },
  },
];
