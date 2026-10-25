import { build } from "../build";

export const javascriptMore = build("javascript", [
  // Junior
  {
    id: "js-typeof-nan-01",
    level: "junior",
    tags: ["types"],
    q: ["خروجی `typeof NaN` چیست؟", "What does `typeof NaN` return?"],
    options: [
      ['"number"', '"number"'],
      ['"NaN"', '"NaN"'],
      ['"undefined"', '"undefined"'],
      ['"object"', '"object"'],
    ],
    a: [
      "`NaN` یعنی «Not a Number» ولی از نوع `number` است. برای بررسی از `Number.isNaN(x)` استفاده کنید.",
      "`NaN` means “Not a Number” but its type is `number`. Check it with `Number.isNaN(x)`.",
    ],
  },
  {
    id: "js-isarray-01",
    level: "junior",
    tags: ["arrays", "types"],
    q: ["مطمئن‌ترین راه تشخیص آرایه کدام است؟", "What is the most reliable way to detect an array?"],
    options: [
      ["`Array.isArray(x)`", "`Array.isArray(x)`"],
      ['`typeof x === "array"`', '`typeof x === "array"`'],
      ["`x.length > 0`", "`x.length > 0`"],
      ['`typeof x === "object"`', '`typeof x === "object"`'],
    ],
    a: [
      "`typeof []` برابر `\"object\"` است، پس `typeof` کمکی نمی‌کند. `Array.isArray` حتی برای آرایه‌های iframe دیگر هم درست کار می‌کند.",
      "`typeof []` is `\"object\"`, so `typeof` can't tell. `Array.isArray` works even across iframes.",
    ],
  },
  {
    id: "js-null-undefined-01",
    level: "junior",
    tags: ["types"],
    q: ["تفاوت `null` و `undefined` چیست؟", "What is the difference between `null` and `undefined`?"],
    options: [
      [
        "`undefined` یعنی مقداری تخصیص نیافته؛ `null` یعنی «خالی» به‌صورت عمدی",
        "`undefined` means not assigned; `null` is an intentional empty value",
      ],
      ["هر دو دقیقاً یکی‌اند و `===` آن‌ها برابر است", "They are identical and `===` equal"],
      ["`null` فقط در TypeScript وجود دارد", "`null` only exists in TypeScript"],
      ["`undefined` یک object است", "`undefined` is an object"],
    ],
    a: [
      "متغیر اعلان‌شده بدون مقدار `undefined` است. `null` را برنامه‌نویس عمداً می‌گذارد. `null == undefined` درست است ولی `null === undefined` نادرست.",
      "A declared variable without a value is `undefined`. `null` is set deliberately. `null == undefined` is true but `null === undefined` is false.",
    ],
  },
  {
    id: "js-string-plus-01",
    level: "junior",
    tags: ["coercion"],
    q: ['خروجی `"5" + 3` چیست؟', 'What is `"5" + 3`?'],
    options: [
      ['`"53"`', '`"53"`'],
      ["`8`", "`8`"],
      ["`NaN`", "`NaN`"],
      ["TypeError", "TypeError"],
    ],
    a: [
      'اگر یکی از عملوندهای `+` رشته باشد، الحاق رشته انجام می‌شود. اما `"5" - 3` برابر `2` است چون `-` فقط عددی است.',
      'If either `+` operand is a string, it concatenates. But `"5" - 3` is `2` because `-` is numeric only.',
    ],
  },
  {
    id: "js-push-concat-01",
    level: "junior",
    tags: ["arrays", "immutability"],
    q: ["تفاوت `push` و `concat` چیست؟", "What is the difference between `push` and `concat`?"],
    options: [
      [
        "`push` آرایه اصلی را تغییر می‌دهد؛ `concat` آرایه جدید برمی‌گرداند",
        "`push` mutates the array; `concat` returns a new array",
      ],
      ["هر دو آرایه اصلی را تغییر می‌دهند", "Both mutate the original array"],
      ["`concat` فقط رشته‌ها را می‌پذیرد", "`concat` only accepts strings"],
      ["`push` آرایه جدید برمی‌گرداند", "`push` returns a new array"],
    ],
    a: [
      "`push` طول جدید را برمی‌گرداند و آرایه را mutate می‌کند. در React برای state از `concat` یا spread (`[...arr, x]`) استفاده کنید.",
      "`push` returns the new length and mutates. For React state use `concat` or spread (`[...arr, x]`).",
    ],
  },
  {
    id: "js-optional-chaining-01",
    level: "junior",
    tags: ["syntax"],
    q: ["اگر `user` برابر `null` باشد، `user?.name` چه برمی‌گرداند؟", "If `user` is `null`, what does `user?.name` return?"],
    options: [
      ["`undefined`", "`undefined`"],
      ["TypeError", "TypeError"],
      ["`null`", "`null`"],
      ['`""`', '`""`'],
    ],
    a: [
      "Optional chaining اگر سمت چپ `null` یا `undefined` باشد، به‌جای خطا `undefined` برمی‌گرداند.",
      "Optional chaining returns `undefined` instead of throwing when the left side is `null` or `undefined`.",
    ],
  },
  // Middle
  {
    id: "js-nullish-01",
    level: "middle",
    tags: ["operators"],
    q: ["خروجی `0 ?? 5` و `0 || 5` چیست؟", "What are `0 ?? 5` and `0 || 5`?"],
    options: [
      ["`0` و `5`", "`0` and `5`"],
      ["`5` و `5`", "`5` and `5`"],
      ["`0` و `0`", "`0` and `0`"],
      ["`5` و `0`", "`5` and `0`"],
    ],
    a: [
      "`??` فقط برای `null`/`undefined` مقدار پیش‌فرض می‌دهد؛ `||` برای هر مقدار falsy (مثل `0` و `\"\"`).",
      "`??` falls back only on `null`/`undefined`; `||` falls back on any falsy value (like `0` and `\"\"`).",
    ],
  },
  {
    id: "js-bind-01",
    level: "middle",
    tags: ["this", "functions"],
    q: ["تفاوت `bind` با `call`/`apply` چیست؟", "How does `bind` differ from `call`/`apply`?"],
    options: [
      [
        "`bind` تابع جدیدی با `this` ثابت برمی‌گرداند و اجرا نمی‌کند",
        "`bind` returns a new function with fixed `this` without calling it",
      ],
      ["`bind` تابع را فوراً اجرا می‌کند", "`bind` calls the function immediately"],
      ["`bind` فقط برای arrow function کار می‌کند", "`bind` only works on arrow functions"],
      ["هیچ تفاوتی ندارند", "There is no difference"],
    ],
    a: [
      "`call(this, a, b)` و `apply(this, [a, b])` فوراً اجرا می‌کنند. `bind` یک تابع جدید می‌سازد که بعداً صدا زده می‌شود.",
      "`call(this, a, b)` and `apply(this, [a, b])` invoke immediately. `bind` creates a new function to call later.",
    ],
  },
  {
    id: "js-hoisting-01",
    level: "middle",
    tags: ["hoisting"],
    q: ["کدام قبل از تعریفش قابل فراخوانی است؟", "Which can be called before its definition?"],
    options: [
      ["`function foo() {}` (function declaration)", "`function foo() {}` (function declaration)"],
      ["`const foo = () => {}`", "`const foo = () => {}`"],
      ["`let foo = function () {}`", "`let foo = function () {}`"],
      ["`class Foo {}`", "`class Foo {}`"],
    ],
    a: [
      "Function declaration کامل hoist می‌شود. `const`/`let`/`class` در TDZ هستند و استفاده قبل از تعریف ReferenceError می‌دهد.",
      "Function declarations are fully hoisted. `const`/`let`/`class` are in the TDZ and throw a ReferenceError before definition.",
    ],
  },
  {
    id: "js-promise-all-01",
    level: "middle",
    tags: ["promises", "async"],
    q: ["اگر یکی از promiseها reject شود، `Promise.all` چه می‌کند؟", "If one promise rejects, what does `Promise.all` do?"],
    options: [
      ["فوراً با همان خطا reject می‌شود", "Rejects immediately with that error"],
      ["منتظر همه می‌ماند و نتایج موفق را برمی‌گرداند", "Waits for all and returns the successful ones"],
      ["خطا را نادیده می‌گیرد", "Ignores the error"],
      ["promise را دوباره امتحان می‌کند", "Retries the promise"],
    ],
    a: [
      "اگر نتیجه همه را می‌خواهید (موفق و ناموفق) از `Promise.allSettled` استفاده کنید. `Promise.any` اولین موفق را برمی‌گرداند.",
      "Use `Promise.allSettled` to get every outcome. `Promise.any` resolves with the first success.",
    ],
  },
  {
    id: "js-shallow-copy-01",
    level: "middle",
    tags: ["objects", "immutability"],
    q: ["`const b = { ...a }` چه نوع کپی‌ای است؟", "What kind of copy is `const b = { ...a }`?"],
    options: [
      ["Shallow: objectهای تودرتو مشترک می‌مانند", "Shallow: nested objects stay shared"],
      ["Deep: همه سطوح کپی می‌شوند", "Deep: every level is copied"],
      ["فقط reference همان object", "Just the same reference"],
      ["فقط propertyهای متد", "Only method properties"],
    ],
    a: [
      "Spread و `Object.assign` فقط سطح اول را کپی می‌کنند. تغییر `b.nested.x` روی `a` هم اثر دارد. برای کپی عمیق `structuredClone` مناسب است.",
      "Spread and `Object.assign` copy only the top level. Changing `b.nested.x` also affects `a`. Use `structuredClone` for deep copies.",
    ],
  },
  {
    id: "js-event-delegation-01",
    level: "middle",
    tags: ["dom", "events"],
    q: ["Event delegation چیست؟", "What is event delegation?"],
    options: [
      [
        "یک listener روی والد و تشخیص هدف با `event.target`",
        "One listener on a parent, detecting the target via `event.target`",
      ],
      ["گذاشتن listener جدا روی هر فرزند", "Attaching a listener to every child"],
      ["جلوگیری از همه رویدادها", "Blocking all events"],
      ["اجرای رویداد در Web Worker", "Running events in a Web Worker"],
    ],
    a: [
      "به لطف bubbling، یک listener روی والد کافی است. حافظه کمتری مصرف می‌کند و برای عناصری که بعداً اضافه می‌شوند هم کار می‌کند.",
      "Thanks to bubbling, one parent listener is enough. It uses less memory and works for elements added later.",
    ],
  },
  // Senior
  {
    id: "js-structured-clone-01",
    level: "senior",
    tags: ["objects"],
    q: ["مزیت `structuredClone` بر `JSON.parse(JSON.stringify(x))`؟", "Advantage of `structuredClone` over `JSON.parse(JSON.stringify(x))`?"],
    options: [
      [
        "از `Date`، `Map`، `Set` و ارجاع حلقوی پشتیبانی می‌کند",
        "Supports `Date`, `Map`, `Set`, and circular references",
      ],
      ["تابع‌ها را هم کپی می‌کند", "It also copies functions"],
      ["فقط shallow copy می‌کند", "It only makes shallow copies"],
      ["فقط در Node کار می‌کند", "It only works in Node"],
    ],
    a: [
      "روش JSON تاریخ را به رشته تبدیل می‌کند، `undefined` و `Map` را از دست می‌دهد و با ارجاع حلقوی خطا می‌دهد. `structuredClone` هم تابع و DOM node را کپی نمی‌کند.",
      "The JSON trick turns dates into strings, drops `undefined` and `Map`, and throws on cycles. `structuredClone` still can't clone functions or DOM nodes.",
    ],
  },
  {
    id: "js-microtask-starvation-01",
    level: "senior",
    tags: ["event-loop"],
    q: ["اگر microtaskها پشت سر هم microtask جدید بسازند چه می‌شود؟", "What happens if microtasks keep scheduling new microtasks?"],
    options: [
      ["رندر و macrotaskها مسدود می‌شوند (starvation)", "Rendering and macrotasks are starved"],
      ["مرورگر خودش آن‌ها را به setTimeout منتقل می‌کند", "The browser moves them to setTimeout"],
      ["فقط اولی اجرا می‌شود", "Only the first one runs"],
      ["اثری ندارد", "Nothing happens"],
    ],
    a: [
      "صف microtask باید قبل از رندر بعدی کاملاً خالی شود. اگر هیچ‌وقت خالی نشود صفحه یخ می‌زند. کار طولانی را با `setTimeout` یا `scheduler.yield` تکه‌تکه کنید.",
      "The microtask queue must drain before the next render. If it never empties, the page freezes. Chunk long work with `setTimeout` or `scheduler.yield`.",
    ],
  },
  {
    id: "js-abort-controller-01",
    level: "senior",
    tags: ["async", "fetch"],
    q: ["برای لغو یک `fetch` در حال اجرا از چه استفاده می‌شود؟", "What is used to cancel an in-flight `fetch`?"],
    options: [
      ["`AbortController` و `signal`", "`AbortController` and its `signal`"],
      ["`clearTimeout`", "`clearTimeout`"],
      ["`Promise.cancel()`", "`Promise.cancel()`"],
      ["`fetch.stop()`", "`fetch.stop()`"],
    ],
    a: [
      "`signal` را به `fetch` بدهید و `controller.abort()` را صدا بزنید؛ promise با `AbortError` reject می‌شود. برای جستجوی زنده و cleanup در effect بسیار کاربردی است.",
      "Pass `signal` to `fetch` and call `controller.abort()`; the promise rejects with `AbortError`. Great for live search and effect cleanup.",
    ],
  },
  {
    id: "js-web-workers-01",
    level: "senior",
    tags: ["performance", "workers"],
    q: ["کدام درباره Web Worker درست است؟", "Which is true about Web Workers?"],
    options: [
      [
        "کار سنگین را خارج از main thread اجرا می‌کند ولی به DOM دسترسی ندارد",
        "Runs heavy work off the main thread but has no DOM access",
      ],
      ["مستقیماً DOM را تغییر می‌دهد", "Directly manipulates the DOM"],
      ["state را با main thread به‌صورت مشترک و همگام دارد", "Shares synchronous state with the main thread"],
      ["فقط برای انیمیشن CSS است", "Only for CSS animations"],
    ],
    a: [
      "ارتباط با `postMessage` انجام می‌شود و داده کپی (یا transfer) می‌شود. برای پردازش تصویر، parse داده‌های بزرگ و محاسبات سنگین مناسب است.",
      "Communication happens via `postMessage` with copied (or transferred) data. Good for image processing, large parsing, heavy computation.",
    ],
  },
  {
    id: "js-object-freeze-01",
    level: "senior",
    tags: ["objects", "immutability"],
    q: ["`Object.freeze` روی object تودرتو چه اثری دارد؟", "What does `Object.freeze` do to nested objects?"],
    options: [
      ["فقط سطح اول freeze می‌شود (shallow)", "Only the top level is frozen (shallow)"],
      ["همه سطوح عمیقاً freeze می‌شوند", "Every level is deeply frozen"],
      ["object را حذف می‌کند", "It deletes the object"],
      ["فقط متدها را freeze می‌کند", "It only freezes methods"],
    ],
    a: [
      "Freeze سطحی است؛ objectهای داخلی هنوز قابل تغییرند. برای deep freeze باید بازگشتی روی propertyها اعمال کنید.",
      "Freeze is shallow; inner objects remain mutable. Deep freeze requires recursing over properties.",
    ],
  },
  {
    id: "js-symbol-iterator-01",
    level: "senior",
    tags: ["iterators"],
    q: ["چطور یک object سفارشی را با `for...of` قابل پیمایش کنیم؟", "How do you make a custom object work with `for...of`?"],
    options: [
      ["پیاده‌سازی `[Symbol.iterator]()`", "Implement `[Symbol.iterator]()`"],
      ["اضافه کردن property به نام `length`", "Add a `length` property"],
      ["ارث‌بری از `Array`", "Inherit from `Array` only"],
      ["تعریف متد `forEach`", "Define a `forEach` method"],
    ],
    a: [
      "متد `[Symbol.iterator]` باید iteratorی با `next()` برگرداند (یا generator باشد). بعد `for...of` و spread روی آن کار می‌کنند.",
      "`[Symbol.iterator]` must return an iterator with `next()` (or be a generator). Then `for...of` and spread work.",
    ],
  },
]);
