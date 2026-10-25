import type { Question } from "./types";

export const javascriptQuestions: Question[] = [
  {
    id: "js-var-let-const-01",
    category: "javascript",
    level: "junior",
    tags: ["scope", "hoisting"],
    question: {
      fa: "تفاوت اصلی `let`/`const` با `var` چیست؟",
      en: "What is the main difference between `let`/`const` and `var`?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "`let`/`const` محدود به block هستند؛ `var` محدود به function",
          en: "`let`/`const` are block-scoped; `var` is function-scoped",
        },
      },
      {
        id: "b",
        text: {
          fa: "`var` فقط در strict mode کار می‌کند",
          en: "`var` only works in strict mode",
        },
      },
      {
        id: "c",
        text: {
          fa: "`const` همیشه immutable است حتی برای objectها",
          en: "`const` makes objects deeply immutable",
        },
      },
      {
        id: "d",
        text: {
          fa: "هیچ تفاوتی در scope ندارند",
          en: "They have no scoping difference",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `**var** محدود به function است، hoist می‌شود و می‌توان دوباره اعلانش کرد.
**let** و **const** محدود به block هستند و Temporal Dead Zone دارند.
**const** قابل تخصیص مجدد نیست (محتوای object/array قابل تغییر است).

\`\`\`js
if (true) {
  var a = 1;
  let b = 2;
}
console.log(a); // 1
console.log(b); // ReferenceError
\`\`\``,
      en: `**var** is function-scoped, hoisted, and can be re-declared.
**let** and **const** are block-scoped and have a Temporal Dead Zone.
**const** cannot be reassigned (object/array contents can still mutate).

\`\`\`js
if (true) {
  var a = 1;
  let b = 2;
}
console.log(a); // 1
console.log(b); // ReferenceError
\`\`\``,
    },
  },
  {
    id: "js-types-01",
    category: "javascript",
    level: "junior",
    tags: ["types"],
    question: {
      fa: "کدام‌یک از موارد زیر primitive نیست؟",
      en: "Which of the following is NOT a primitive?",
    },
    options: [
      { id: "a", text: { fa: "`string`", en: "`string`" } },
      { id: "b", text: { fa: "`symbol`", en: "`symbol`" } },
      { id: "c", text: { fa: "`array`", en: "`array`" } },
      { id: "d", text: { fa: "`bigint`", en: "`bigint`" } },
    ],
    correctOptionId: "c",
    answer: {
      fa: `هفت primitive: \`string\`, \`number\`, \`bigint\`, \`boolean\`, \`undefined\`, \`symbol\`, \`null\`.
آرایه object است. \`typeof null\` برابر \`"object"\` است: quirk تاریخی.`,
      en: `Seven primitives: \`string\`, \`number\`, \`bigint\`, \`boolean\`, \`undefined\`, \`symbol\`, \`null\`.
Arrays are objects. \`typeof null\` is \`"object"\`: a historical quirk.`,
    },
  },
  {
    id: "js-equality-01",
    category: "javascript",
    level: "junior",
    tags: ["equality", "coercion"],
    question: {
      fa: "نتیجه‌ی `0 == false` و `0 === false` چیست؟",
      en: "What are the results of `0 == false` and `0 === false`?",
    },
    options: [
      { id: "a", text: { fa: "`true` و `true`", en: "`true` and `true`" } },
      { id: "b", text: { fa: "`true` و `false`", en: "`true` and `false`" } },
      { id: "c", text: { fa: "`false` و `true`", en: "`false` and `true`" } },
      { id: "d", text: { fa: "`false` و `false`", en: "`false` and `false`" } },
    ],
    correctOptionId: "b",
    answer: {
      fa: `\`==\` قبل از مقایسه type coercion انجام می‌دهد؛ \`===\` بدون coercion است.
\`0 == false\` → true و \`0 === false\` → false.
در کد مدرن تقریباً همیشه از \`===\` استفاده کنید.`,
      en: `\`==\` coerces types; \`===\` does not.
\`0 == false\` → true and \`0 === false\` → false.
Prefer \`===\` in modern code.`,
    },
  },
  {
    id: "js-array-methods-01",
    category: "javascript",
    level: "junior",
    tags: ["arrays"],
    question: {
      fa: "کدام متد آرایهٔ جدید برمی‌گرداند و عناصر را تبدیل می‌کند؟",
      en: "Which method returns a new array by transforming each item?",
    },
    options: [
      { id: "a", text: { fa: "`forEach`", en: "`forEach`" } },
      { id: "b", text: { fa: "`map`", en: "`map`" } },
      { id: "c", text: { fa: "`reduceRight` همیشه", en: "`reduceRight` always" } },
      { id: "d", text: { fa: "`push`", en: "`push`" } },
    ],
    correctOptionId: "b",
    answer: {
      fa: `- **map**: آرایه جدید با تبدیل
- **filter**: آرایه جدید با شرط
- **forEach**: فقط پیمایش؛ معمولاً \`undefined\`

\`\`\`js
[1,2,3].map(n => n * 2) // [2,4,6]
\`\`\``,
      en: `- **map**: new array via transform
- **filter**: new array via predicate
- **forEach**: side effects; returns \`undefined\`

\`\`\`js
[1,2,3].map(n => n * 2) // [2,4,6]
\`\`\``,
    },
  },
  {
    id: "js-template-01",
    category: "javascript",
    level: "junior",
    tags: ["strings"],
    question: {
      fa: "Template literal با چه کاراکتری نوشته می‌شود؟",
      en: "Which character delimits a template literal?",
    },
    options: [
      { id: "a", text: { fa: "تک‌کوتیشن `'`", en: "Single quote `'`" } },
      { id: "b", text: { fa: "دبل‌کوتیشن `\"`", en: "Double quote `\"`" } },
      { id: "c", text: { fa: "بک‌تیک `` ` ``", en: "Backtick `` ` ``" } },
      { id: "d", text: { fa: "اسلش `/`", en: "Slash `/`" } },
    ],
    correctOptionId: "c",
    answer: {
      fa: `Template literal با backtick نوشته می‌شود و از interpolation و چندخطی پشتیبانی می‌کند.

\`\`\`js
const name = "Ali";
const msg = \`Hello, \${name}!\`;
\`\`\``,
      en: `Template literals use backticks and support interpolation and multiline text.

\`\`\`js
const name = "Ali";
const msg = \`Hello, \${name}!\`;
\`\`\``,
    },
  },
  {
    id: "js-truthy-01",
    category: "javascript",
    level: "junior",
    tags: ["coercion"],
    question: {
      fa: "کدام مقدار در شرط truthy است؟",
      en: "Which value is truthy in a condition?",
    },
    options: [
      { id: "a", text: { fa: "`[]`", en: "`[]`" } },
      { id: "b", text: { fa: "`0`", en: "`0`" } },
      { id: "c", text: { fa: "`\"\"`", en: "`\"\"`" } },
      { id: "d", text: { fa: "`null`", en: "`null`" } },
    ],
    correctOptionId: "a",
    answer: {
      fa: `Falsyها: \`false\`, \`0\`, \`-0\`, \`0n\`, \`\"\"\`, \`null\`, \`undefined\`, \`NaN\`.
\`[]\` و \`{}\` هر دو truthy هستند.`,
      en: `Falsy values: \`false\`, \`0\`, \`-0\`, \`0n\`, \`\"\"\`, \`null\`, \`undefined\`, \`NaN\`.
Both \`[]\` and \`{}\` are truthy.`,
    },
  },
  {
    id: "js-closures-01",
    category: "javascript",
    level: "middle",
    tags: ["closures"],
    question: {
      fa: "Closure یعنی چه؟",
      en: "What is a closure?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "تابعی که به متغیرهای scope بیرونی حتی بعد از اتمام آن دسترسی دارد",
          en: "A function that retains access to outer-scope variables after that scope finishes",
        },
      },
      {
        id: "b",
        text: {
          fa: "روشی برای بستن تب مرورگر",
          en: "A way to close a browser tab",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط مترادف برای arrow function",
          en: "Just another name for arrow functions",
        },
      },
      {
        id: "d",
        text: {
          fa: "الگوی طراحی مخصوص class",
          en: "A class-only design pattern",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `\`\`\`js
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const c = makeCounter();
c(); // 1
\`\`\`
کاربرد: encapsulation، factory، memoization.`,
      en: `\`\`\`js
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const c = makeCounter();
c(); // 1
\`\`\`
Uses: encapsulation, factories, memoization.`,
    },
  },
  {
    id: "js-event-loop-01",
    category: "javascript",
    level: "middle",
    tags: ["event-loop", "async"],
    question: {
      fa: "خروجی این کد چیست؟ `console.log(1); setTimeout(()=>console.log(2),0); Promise.resolve().then(()=>console.log(3)); console.log(4);`",
      en: "What does this print? `console.log(1); setTimeout(()=>console.log(2),0); Promise.resolve().then(()=>console.log(3)); console.log(4);`",
    },
    options: [
      { id: "a", text: { fa: "`1 2 3 4`", en: "`1 2 3 4`" } },
      { id: "b", text: { fa: "`1 4 3 2`", en: "`1 4 3 2`" } },
      { id: "c", text: { fa: "`1 4 2 3`", en: "`1 4 2 3`" } },
      { id: "d", text: { fa: "`1 3 4 2`", en: "`1 3 4 2`" } },
    ],
    correctOptionId: "b",
    answer: {
      fa: `همگام‌ها اول: 1 سپس 4.
Microtask (\`Promise.then\`) قبل از macrotask (\`setTimeout\`): پس 3 بعد 2.
ترتیب: **1, 4, 3, 2**.`,
      en: `Sync first: 1 then 4.
Microtasks (\`Promise.then\`) run before macrotasks (\`setTimeout\`): 3 then 2.
Order: **1, 4, 3, 2**.`,
    },
  },
  {
    id: "js-this-01",
    category: "javascript",
    level: "middle",
    tags: ["this"],
    question: {
      fa: "`this` در arrow function چگونه تعیین می‌شود؟",
      en: "How is `this` determined in an arrow function?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "همیشه به global/window اشاره می‌کند",
          en: "It always points to global/window",
        },
      },
      {
        id: "b",
        text: {
          fa: "از scope بیرونی به‌صورت واژگانی (lexical) گرفته می‌شود",
          en: "It is taken lexically from the outer scope",
        },
      },
      {
        id: "c",
        text: {
          fa: "با `call` همیشه عوض می‌شود",
          en: "It always changes with `call`",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط در class تعریف می‌شود",
          en: "It only exists inside classes",
        },
      },
    ],
    correctOptionId: "b",
    answer: {
      fa: `Arrow function \`this\` خودش را bind نمی‌کند؛ از scope بیرونی می‌گیرد.
\`call/apply/bind\` روی آن \`this\` را عوض نمی‌کند.`,
      en: `Arrow functions do not bind their own \`this\`; they inherit it lexically.
\`call/apply/bind\` cannot rebind that \`this\`.`,
    },
  },
  {
    id: "js-promises-01",
    category: "javascript",
    level: "middle",
    tags: ["promises", "async"],
    question: {
      fa: "حالت‌های یک Promise کدام‌اند؟",
      en: "What are the states of a Promise?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "pending / fulfilled / rejected",
          en: "pending / fulfilled / rejected",
        },
      },
      {
        id: "b",
        text: {
          fa: "open / closed / aborted",
          en: "open / closed / aborted",
        },
      },
      {
        id: "c",
        text: {
          fa: "start / middle / end",
          en: "start / middle / end",
        },
      },
      {
        id: "d",
        text: {
          fa: "loading / success فقط",
          en: "loading / success only",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `سه حالت: **pending**، **fulfilled**، **rejected**.
بعد از settle شدن تغییر نمی‌کند. \`async/await\` روی Promiseهاست.`,
      en: `Three states: **pending**, **fulfilled**, **rejected**.
Once settled it never changes. \`async/await\` is sugar over Promises.`,
    },
  },
  {
    id: "js-destructuring-01",
    category: "javascript",
    level: "middle",
    tags: ["syntax"],
    question: {
      fa: "در `const { a, ...rest } = obj` عملگر `...rest` چه می‌کند؟",
      en: "In `const { a, ...rest } = obj`, what does `...rest` do?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "باقی propertyها را در یک object جمع می‌کند",
          en: "Collects remaining properties into an object",
        },
      },
      {
        id: "b",
        text: {
          fa: "آرایه را معکوس می‌کند",
          en: "Reverses an array",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط برای class استفاده می‌شود",
          en: "Only works with classes",
        },
      },
      {
        id: "d",
        text: {
          fa: "کل object را پاک می‌کند",
          en: "Deletes the whole object",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `Rest در destructuring باقی‌مانده را جمع می‌کند؛ spread برای پخش در object/array جدید است.

\`\`\`js
const { name, ...rest } = user;
const copy = { ...obj, name: "New" };
\`\`\``,
      en: `Rest gathers remaining properties; spread expands into a new object/array.

\`\`\`js
const { name, ...rest } = user;
const copy = { ...obj, name: "New" };
\`\`\``,
    },
  },
  {
    id: "js-prototype-01",
    category: "javascript",
    level: "middle",
    tags: ["prototype"],
    question: {
      fa: "وقتی property روی object پیدا نشود چه می‌شود؟",
      en: "What happens when a property is missing on an object?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "موتور روی prototype chain بالا می‌رود تا `null`",
          en: "The engine walks the prototype chain until `null`",
        },
      },
      {
        id: "b",
        text: {
          fa: "همیشه TypeError پرتاب می‌شود",
          en: "A TypeError is always thrown",
        },
      },
      {
        id: "c",
        text: {
          fa: "فوراً `undefined` بدون جستجو",
          en: "Immediately `undefined` with no lookup",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط در ESM اتفاق می‌افتد",
          en: "It only happens in ESM",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `هر object لینک \`[[Prototype]]\` دارد. جستجو روی زنجیره تا \`null\` ادامه می‌یابد.
\`class\` سینتکس روی همین مدل است.`,
      en: `Every object has a \`[[Prototype]]\` link. Lookup walks the chain until \`null\`.
\`class\` is sugar over this model.`,
    },
  },
  {
    id: "js-memory-01",
    category: "javascript",
    level: "senior",
    tags: ["memory", "closures"],
    question: {
      fa: "کدام مورد می‌تواند باعث memory leak در فرانت شود؟",
      en: "Which can cause a frontend memory leak?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "listener روی window بدون remove",
          en: "A window listener never removed",
        },
      },
      {
        id: "b",
        text: {
          fa: "استفاده از `const` به‌جای `let`",
          en: "Using `const` instead of `let`",
        },
      },
      {
        id: "c",
        text: {
          fa: "نوشتن کد با TypeScript",
          en: "Writing TypeScript",
        },
      },
      {
        id: "d",
        text: {
          fa: "استفاده از template literal",
          en: "Using template literals",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `نشتی‌های رایج: listener/timer پاک‌نشده، closure با reference بزرگ، detached DOM، cache بدون حد.
ابزار: Heap Snapshot در DevTools.`,
      en: `Common leaks: uncleared listeners/timers, closures retaining large refs, detached DOM, unbounded caches.
Tooling: DevTools Heap Snapshot.`,
    },
  },
  {
    id: "js-debounce-throttle-01",
    category: "javascript",
    level: "senior",
    tags: ["performance"],
    question: {
      fa: "برای محدود کردن اجرای تابع هنگام تایپ در سرچ، کدام مناسب‌تر است؟",
      en: "For limiting function runs while typing in a search box, which fits better?",
    },
    options: [
      { id: "a", text: { fa: "Throttle", en: "Throttle" } },
      { id: "b", text: { fa: "Debounce", en: "Debounce" } },
      { id: "c", text: { fa: "فقط `setInterval`", en: "Only `setInterval`" } },
      { id: "d", text: { fa: "`Object.freeze`", en: "`Object.freeze`" } },
    ],
    correctOptionId: "b",
    answer: {
      fa: `**Debounce** تا آرام شدن رویداد صبر می‌کند (جستجو).
**Throttle** حداکثر یک‌بار در هر بازه اجرا می‌کند (scroll).`,
      en: `**Debounce** waits until events settle (search).
**Throttle** runs at most once per interval (scroll).`,
    },
  },
  {
    id: "js-generators-01",
    category: "javascript",
    level: "senior",
    tags: ["generators", "iterators"],
    question: {
      fa: "`function*` چه چیزی برمی‌گرداند؟",
      en: "What does a `function*` return?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "یک Generator/Iterator قابل pause با `yield`",
          en: "A Generator/Iterator that can pause via `yield`",
        },
      },
      {
        id: "b",
        text: {
          fa: "همیشه یک Promise",
          en: "Always a Promise",
        },
      },
      {
        id: "c",
        text: {
          fa: "یک Proxy",
          en: "A Proxy",
        },
      },
      {
        id: "d",
        text: {
          fa: "چیزی برنمی‌گرداند",
          en: "Nothing",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `Generator یک Iterator می‌سازد و با \`yield\` pause/resume می‌شود.
کاربرد: lazy sequence، pagination، کنترل جریان.`,
      en: `A generator creates an Iterator and pauses/resumes with \`yield\`.
Uses: lazy sequences, pagination, custom control flow.`,
    },
  },
  {
    id: "js-weakmap-01",
    category: "javascript",
    level: "senior",
    tags: ["memory", "collections"],
    question: {
      fa: "کلید WeakMap چه محدودیتی دارد؟",
      en: "What restriction do WeakMap keys have?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "فقط object می‌تواند کلید باشد",
          en: "Keys must be objects",
        },
      },
      {
        id: "b",
        text: {
          fa: "فقط string",
          en: "Only strings",
        },
      },
      {
        id: "c",
        text: {
          fa: "فقط number",
          en: "Only numbers",
        },
      },
      {
        id: "d",
        text: {
          fa: "محدودیتی ندارد مثل Map",
          en: "No restriction, same as Map",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `WeakMap/WeakSet فقط object به‌عنوان کلید/مقدار می‌گیرند، شمارش‌پذیر نیستند و reference ضعیف دارند تا GC ممکن باشد.
عالی برای metadata روی DOM بدون جلوگیری از GC.`,
      en: `WeakMap/WeakSet only accept objects, are not enumerable, and hold weak refs so GC can collect.
Great for DOM metadata without blocking GC.`,
    },
  },
  {
    id: "js-module-01",
    category: "javascript",
    level: "senior",
    tags: ["modules"],
    question: {
      fa: "کدام ویژگی بیشتر به ESM مربوط است تا CommonJS؟",
      en: "Which trait is more characteristic of ESM than CommonJS?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "استاتیک و tree-shakeable بودن `import`/`export`",
          en: "Static, tree-shakeable `import`/`export`",
        },
      },
      {
        id: "b",
        text: {
          fa: "استفاده اجباری از `require`",
          en: "Mandatory use of `require`",
        },
      },
      {
        id: "c",
        text: {
          fa: "همگام بودن مطلق لود ماژول در مرورگر",
          en: "Always fully synchronous loading in browsers",
        },
      },
      {
        id: "d",
        text: {
          fa: "نداشتن پشتیبانی در مرورگرهای مدرن",
          en: "No support in modern browsers",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `ESM استاتیک و قابل تحلیل است → tree-shaking.
CommonJS با \`require\` دینامیک و همگام (کلاسیک Node) است.`,
      en: `ESM is static and analyzable → tree-shaking.
CommonJS uses dynamic sync \`require\` (classic Node).`,
    },
  },
  {
    id: "js-proxy-01",
    category: "javascript",
    level: "senior",
    tags: ["proxy", "metaprogramming"],
    question: {
      fa: "Proxy عمدتاً برای چه استفاده می‌شود؟",
      en: "What is Proxy mainly used for?",
    },
    options: [
      {
        id: "a",
        text: {
          fa: "رهگیری عملیات پایه object مثل get/set",
          en: "Intercepting fundamental object ops like get/set",
        },
      },
      {
        id: "b",
        text: {
          fa: "فشرده‌سازی تصویر",
          en: "Image compression",
        },
      },
      {
        id: "c",
        text: {
          fa: "جایگزین کامل HTTP",
          en: "A full HTTP replacement",
        },
      },
      {
        id: "d",
        text: {
          fa: "فقط برای تست واحد",
          en: "Only for unit tests",
        },
      },
    ],
    correctOptionId: "a",
    answer: {
      fa: `\`Proxy\` عملیات object را رهگیری می‌کند؛ \`Reflect\` همان عملیات را به‌صورت تابعی فراهم می‌کند.
کاربرد: reactivity (مثل Vue 3)، validation، logging.`,
      en: `\`Proxy\` intercepts object operations; \`Reflect\` exposes them as functions.
Uses: reactivity (e.g. Vue 3), validation, logging.`,
    },
  },
];
