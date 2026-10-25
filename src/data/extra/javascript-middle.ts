import { build } from "../build";

export const javascriptMiddle = build("javascript", [
  {
    id: "js-x-var-loop-timeout",
    level: "middle",
    tags: ["closures", "scope"],
    q: [
      "خروجی `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));` چیست؟",
      "What does `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));` print?",
    ],
    options: [
      ["`3 3 3`", "`3 3 3`"],
      ["`0 1 2`", "`0 1 2`"],
      ["`2 2 2`", "`2 2 2`"],
      ["`undefined` سه بار", "`undefined` three times"],
    ],
    a: [
      "`var` یک binding مشترک برای کل تابع دارد و callbackها بعد از پایان حلقه اجرا می‌شوند که `i` برابر `3` است. با `let` هر تکرار binding جدیدی دارد و `0 1 2` چاپ می‌شود.",
      "`var` creates one shared binding, and callbacks run after the loop when `i` is `3`. With `let`, each iteration gets a fresh binding, printing `0 1 2`.",
    ],
  },
  {
    id: "js-x-await-microtask-order",
    level: "middle",
    tags: ["async", "event-loop"],
    q: [
      "خروجی `async function a() { console.log(1); await null; console.log(2); } a(); console.log(3);` چیست؟",
      "What does `async function a() { console.log(1); await null; console.log(2); } a(); console.log(3);` print?",
    ],
    options: [
      ["`1 3 2`", "`1 3 2`"],
      ["`1 2 3`", "`1 2 3`"],
      ["`3 1 2`", "`3 1 2`"],
      ["`1 3` و `2` هرگز چاپ نمی‌شود", "`1 3`, and `2` never prints"],
    ],
    a: [
      "بدنه تابع async تا اولین `await` به‌صورت همگام اجرا می‌شود. ادامه آن به‌عنوان microtask بعد از اتمام کد همگام فعلی اجرا می‌شود.",
      "An async function runs synchronously until the first `await`. The rest is scheduled as a microtask after the current synchronous code.",
    ],
  },
  {
    id: "js-x-allsettled-shape",
    level: "middle",
    tags: ["promises"],
    q: [
      "`Promise.allSettled([Promise.resolve(1), Promise.reject('e')])` با چه مقداری resolve می‌شود؟",
      "What does `Promise.allSettled([Promise.resolve(1), Promise.reject('e')])` resolve to?",
    ],
    options: [
      [
        "`[{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'e' }]`",
        "`[{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'e' }]`",
      ],
      ["با `'e'` reject می‌شود", "It rejects with `'e'`"],
      ["`[1, 'e']`", "`[1, 'e']`"],
      ["`[1]`", "`[1]`"],
    ],
    a: [
      "`allSettled` هرگز reject نمی‌شود و برای هر Promise یک شیء با `status` و `value` یا `reason` برمی‌گرداند. برای وقتی مناسب است که نتیجه همه درخواست‌ها مهم است.",
      "`allSettled` never rejects; it returns an object per promise with `status` and either `value` or `reason`. Useful when you need every outcome.",
    ],
  },
  {
    id: "js-x-promise-any-vs-race",
    level: "middle",
    tags: ["promises"],
    q: ["تفاوت `Promise.any` و `Promise.race` چیست؟", "How does `Promise.any` differ from `Promise.race`?"],
    options: [
      [
        "`any` اولین موفقیت را می‌گیرد و rejectها را نادیده می‌گیرد؛ `race` با اولین settle شدن (موفق یا ناموفق) تمام می‌شود",
        "`any` takes the first fulfillment ignoring rejections; `race` settles with the first to settle either way",
      ],
      [
        "`race` اولین موفقیت را می‌گیرد و rejectها را نادیده می‌گیرد؛ `any` با اولین settle شدن تمام می‌شود",
        "`race` takes the first fulfillment ignoring rejections; `any` settles with the first to settle",
      ],
      ["هر دو منتظر تمام شدن همه Promiseها می‌مانند", "Both wait for all promises to finish"],
      ["هیچ تفاوتی ندارند و `any` فقط نام جدید `race` است", "No difference; `any` is just a new name for `race`"],
    ],
    a: [
      "`Promise.any` فقط اگر همه reject شوند، با یک `AggregateError` reject می‌شود. `Promise.race` نتیجه اولین Promise تمام‌شده را، چه موفق چه ناموفق، برمی‌گرداند.",
      "`Promise.any` rejects only if all reject, with an `AggregateError`. `Promise.race` mirrors whichever promise settles first, success or failure.",
    ],
  },
  {
    id: "js-x-async-returns-promise",
    level: "middle",
    tags: ["async"],
    q: ["با `async function f() { return 1; }` مقدار `f()` چیست؟", "Given `async function f() { return 1; }`, what is `f()`?"],
    options: [
      ["یک Promise که با `1` resolve می‌شود", "A Promise that resolves to `1`"],
      ["عدد `1`", "The number `1`"],
      ["`undefined`", "`undefined`"],
      ["یک generator object", "A generator object"],
    ],
    a: [
      "تابع async همیشه Promise برمی‌گرداند؛ مقدار `return` در آن wrap می‌شود و خطای پرتاب‌شده به reject تبدیل می‌شود.",
      "An async function always returns a Promise; returned values are wrapped and thrown errors become rejections.",
    ],
  },
  {
    id: "js-x-await-in-foreach",
    level: "middle",
    tags: ["async", "arrays"],
    q: [
      "چرا `ids.forEach(async id => { await save(id); }); console.log('done');` قبل از ذخیره‌سازی‌ها `done` چاپ می‌کند؟",
      "Why does `ids.forEach(async id => { await save(id); }); console.log('done');` log `done` before saves finish?",
    ],
    options: [
      ["`forEach` منتظر Promiseهای برگشتی callback نمی‌ماند", "`forEach` doesn't wait for promises returned by the callback"],
      ["`await` داخل callback کار نمی‌کند و خطا می‌دهد", "`await` doesn't work inside callbacks and throws"],
      ["`forEach` callbackها را در Web Worker اجرا می‌کند", "`forEach` runs callbacks in a Web Worker"],
      ["`console.log` همیشه قبل از همه چیز اجرا می‌شود", "`console.log` always runs before everything"],
    ],
    a: [
      "`forEach` مقدار بازگشتی callback را نادیده می‌گیرد. برای اجرای ترتیبی از `for...of` با `await` و برای اجرای موازی از `await Promise.all(ids.map(save))` استفاده کنید.",
      "`forEach` ignores the callback's return value. Use `for...of` with `await` for sequential, or `await Promise.all(ids.map(save))` for parallel.",
    ],
  },
  {
    id: "js-x-sequential-vs-parallel-await",
    level: "middle",
    tags: ["async", "performance"],
    q: [
      "اگر `getA` و `getB` هر کدام ۱ ثانیه طول بکشند و مستقل باشند، `const a = await getA(); const b = await getB();` حدوداً چقدر طول می‌کشد؟",
      "If independent `getA` and `getB` each take 1s, roughly how long does `const a = await getA(); const b = await getB();` take?",
    ],
    options: [
      ["حدود ۲ ثانیه، چون ترتیبی اجرا می‌شوند", "About 2s, because they run sequentially"],
      ["حدود ۱ ثانیه، چون خودکار موازی می‌شوند", "About 1s, they're parallelized automatically"],
      ["نزدیک صفر، چون `await` مسدودکننده نیست", "Near zero, since `await` is non-blocking"],
      ["حدود ۰٫۵ ثانیه", "About 0.5s"],
    ],
    a: [
      "`getB` تا تمام شدن `getA` شروع نمی‌شود. برای اجرای موازی ابتدا هر دو را شروع کنید: `const [a, b] = await Promise.all([getA(), getB()])`.",
      "`getB` doesn't start until `getA` finishes. Start both first: `const [a, b] = await Promise.all([getA(), getB()])`.",
    ],
  },
  {
    id: "js-x-return-await-try",
    level: "middle",
    tags: ["async", "errors"],
    q: [
      "در `async function f() { try { return fetchData(); } catch (e) { return 'fallback'; } }` اگر `fetchData` reject شود چه اتفاقی می‌افتد؟",
      "In `async function f() { try { return fetchData(); } catch (e) { return 'fallback'; } }`, what happens if `fetchData` rejects?",
    ],
    options: [
      ["`catch` اجرا نمی‌شود و Promise تابع `f` reject می‌شود", "`catch` doesn't run and `f`'s promise rejects"],
      ["`catch` اجرا می‌شود و `'fallback'` برمی‌گردد", "`catch` runs and returns `'fallback'`"],
      ["خطای نحوی رخ می‌دهد", "A syntax error occurs"],
      ["تابع برای همیشه pending می‌ماند", "The function stays pending forever"],
    ],
    a: [
      "بدون `await`، Promise مستقیماً برگردانده می‌شود و rejection بعد از خروج از بلوک `try` رخ می‌دهد. با `return await fetchData()` خطا در همان `catch` گرفته می‌شود.",
      "Without `await`, the promise is returned as-is and rejects after leaving `try`. Use `return await fetchData()` so `catch` handles it.",
    ],
  },
  {
    id: "js-x-tdz-let",
    level: "middle",
    tags: ["scope", "hoisting"],
    q: ["خروجی `console.log(x); let x = 1;` چیست؟", "What happens with `console.log(x); let x = 1;`?"],
    options: [
      ["خطای `ReferenceError`", "A `ReferenceError`"],
      ["`undefined`", "`undefined`"],
      ["`1`", "`1`"],
      ["`null`", "`null`"],
    ],
    a: [
      "`let` و `const` هم hoist می‌شوند اما تا خط تعریف در Temporal Dead Zone هستند و دسترسی به آن‌ها خطا می‌دهد. با `var` نتیجه `undefined` بود.",
      "`let`/`const` are hoisted but stay in the Temporal Dead Zone until declared, so access throws. With `var` it would be `undefined`.",
    ],
  },
  {
    id: "js-x-class-method-extraction",
    level: "middle",
    tags: ["this", "classes"],
    q: [
      "خروجی `class A { n = 'a'; get() { return this.n; } } const g = new A().get; g();` چیست؟",
      "What happens with `class A { n = 'a'; get() { return this.n; } } const g = new A().get; g();`?",
    ],
    options: [
      ["خطای `TypeError` چون `this` برابر `undefined` است", "A `TypeError` because `this` is `undefined`"],
      ["`'a'`", "`'a'`"],
      ["`undefined`", "`undefined`"],
      ["`window.n`", "`window.n`"],
    ],
    a: [
      "بدنه کلاس همیشه در strict mode است و با جدا کردن متد، `this` در فراخوانی ساده `undefined` می‌شود. راه‌حل: `bind` یا تعریف متد به‌صورت arrow function در class field.",
      "Class bodies are always strict, so a detached method called plainly has `this === undefined`. Fix with `bind` or an arrow-function class field.",
    ],
  },
  {
    id: "js-x-capture-phase-order",
    level: "middle",
    tags: ["dom", "events"],
    q: [
      "روی `parent` یک listener با `{ capture: true }` و روی `child` یک listener معمولی است. با کلیک روی `child` کدام اول اجرا می‌شود؟",
      "`parent` has a listener with `{ capture: true }` and `child` a normal one. Clicking `child`, which runs first?",
    ],
    options: [
      ["listener والد", "The parent's listener"],
      ["listener فرزند", "The child's listener"],
      ["فقط listener فرزند اجرا می‌شود", "Only the child's runs"],
      ["ترتیب به مرورگر بستگی دارد", "It depends on the browser"],
    ],
    a: [
      "رویداد ابتدا از `window` به سمت هدف می‌رود (capturing)، سپس در هدف و بعد به بالا bubble می‌شود. listenerهای capture والد در مرحله اول اجرا می‌شوند.",
      "Events travel from `window` down to the target (capture), then bubble up. A parent's capture listener runs during the first phase.",
    ],
  },
  {
    id: "js-x-defineproperty-defaults",
    level: "middle",
    tags: ["objects"],
    q: [
      "بعد از `Object.defineProperty(o, 'x', { value: 1 })` خروجی `Object.keys(o)` شامل `x` است؟",
      "After `Object.defineProperty(o, 'x', { value: 1 })`, does `Object.keys(o)` include `x`?",
    ],
    options: [
      ["خیر؛ پیش‌فرض `enumerable`، `writable` و `configurable` برابر `false` است", "No; `enumerable`, `writable`, `configurable` default to `false`"],
      ["بله؛ همه flagها پیش‌فرض `true` هستند", "Yes; all flags default to `true`"],
      ["بله، ولی فقط‌خواندنی است", "Yes, but it's read-only"],
      ["خطا می‌دهد چون `get` تعریف نشده", "It throws because no `get` was given"],
    ],
    a: [
      "propertyهایی که با `defineProperty` ساخته می‌شوند به‌صورت پیش‌فرض غیرقابل شمارش، غیرقابل نوشتن و غیرقابل پیکربندی‌اند؛ برخلاف انتساب معمولی.",
      "Properties created via `defineProperty` default to non-enumerable, non-writable, non-configurable, unlike normal assignment.",
    ],
  },
  {
    id: "js-x-map-vs-object",
    level: "middle",
    tags: ["collections"],
    q: ["کدام مزیت `Map` نسبت به شیء معمولی است؟", "Which is an advantage of `Map` over a plain object?"],
    options: [
      ["هر نوع مقداری (حتی شیء) می‌تواند کلید باشد و `size` دارد", "Any value (even objects) can be a key, and it has `size`"],
      ["با `JSON.stringify` به‌صورت خودکار سریال می‌شود", "It serializes automatically with `JSON.stringify`"],
      ["کلیدها را به ترتیب الفبایی نگه می‌دارد", "It keeps keys sorted alphabetically"],
      ["حافظه را خودکار آزاد می‌کند مثل `WeakMap`", "It frees memory automatically like `WeakMap`"],
    ],
    a: [
      "`Map` کلیدهای غیررشته‌ای را بدون تبدیل نگه می‌دارد، ترتیب درج را حفظ می‌کند و برای افزودن/حذف مکرر بهینه است. `JSON.stringify(map)` نتیجه `'{}'` می‌دهد.",
      "`Map` keeps non-string keys as-is, preserves insertion order, and is optimized for frequent add/remove. `JSON.stringify(map)` gives `'{}'`.",
    ],
  },
  {
    id: "js-x-set-dedupe",
    level: "middle",
    tags: ["collections"],
    q: ["خروجی `[...new Set([1, '1', 1, NaN, NaN])]` چیست؟", "What does `[...new Set([1, '1', 1, NaN, NaN])]` return?"],
    options: [
      ["`[1, '1', NaN]`", "`[1, '1', NaN]`"],
      ["`[1, NaN]`", "`[1, NaN]`"],
      ["`[1, '1', NaN, NaN]`", "`[1, '1', NaN, NaN]`"],
      ["`[1]`", "`[1]`"],
    ],
    a: [
      "`Set` از SameValueZero استفاده می‌کند: عدد `1` و رشته `'1'` متفاوت‌اند ولی `NaN` با خودش برابر در نظر گرفته می‌شود.",
      "`Set` uses SameValueZero: `1` and `'1'` differ, but `NaN` is considered equal to itself.",
    ],
  },
  {
    id: "js-x-counter-factory",
    level: "middle",
    tags: ["closures"],
    q: [
      "با `const make = () => { let c = 0; return () => ++c; };` خروجی `const a = make(); a(); a(); const b = make(); console.log(b());` چیست؟",
      "With `const make = () => { let c = 0; return () => ++c; };`, what does `const a = make(); a(); a(); const b = make(); console.log(b());` print?",
    ],
    options: [
      ["`1`", "`1`"],
      ["`3`", "`3`"],
      ["`2`", "`2`"],
      ["`0`", "`0`"],
    ],
    a: [
      "هر فراخوانی `make` یک scope جدید با `c` مستقل می‌سازد. closure `b` به `c` خودش دسترسی دارد که از `0` شروع می‌شود.",
      "Each `make` call creates a new scope with its own `c`. The closure `b` sees its own counter starting at `0`.",
    ],
  },
  {
    id: "js-x-constructor-return-object",
    level: "middle",
    tags: ["objects", "constructors"],
    q: [
      "خروجی `function P() { this.a = 1; return { b: 2 }; } console.log(new P().a);` چیست؟",
      "What does `function P() { this.a = 1; return { b: 2 }; } console.log(new P().a);` print?",
    ],
    options: [
      ["`undefined`", "`undefined`"],
      ["`1`", "`1`"],
      ["`2`", "`2`"],
      ["خطای `TypeError`", "A `TypeError`"],
    ],
    a: [
      "اگر constructor یک شیء برگرداند، `new` همان شیء را به جای `this` برمی‌گرداند. بازگرداندن مقدار primitive نادیده گرفته می‌شود.",
      "If a constructor returns an object, `new` yields that object instead of `this`. Returning a primitive is ignored.",
    ],
  },
  {
    id: "js-x-private-fields",
    level: "middle",
    tags: ["classes"],
    q: [
      "در `class C { #secret = 1; }` اجرای `new C().#secret` بیرون از کلاس چه نتیجه‌ای دارد؟",
      "Given `class C { #secret = 1; }`, what happens with `new C().#secret` outside the class?",
    ],
    options: [
      ["خطای `SyntaxError` در زمان parse", "A `SyntaxError` at parse time"],
      ["`undefined` برمی‌گرداند", "Returns `undefined`"],
      ["`1` برمی‌گرداند", "Returns `1`"],
      ["فقط در strict mode خطا می‌دهد", "Throws only in strict mode"],
    ],
    a: [
      "فیلدهای `#` واقعاً خصوصی‌اند و ارجاع به آن‌ها بیرون از بدنه کلاس از نظر نحوی غیرمجاز است. با `Object.keys` یا Proxy هم قابل دسترسی نیستند.",
      "`#` fields are truly private; referencing them outside the class body is a syntax error. They're invisible to `Object.keys` and Proxies too.",
    ],
  },
  {
    id: "js-x-super-before-this",
    level: "middle",
    tags: ["classes", "inheritance"],
    q: [
      "در `class B extends A { constructor() { this.x = 1; super(); } }` با `new B()` چه اتفاقی می‌افتد؟",
      "With `class B extends A { constructor() { this.x = 1; super(); } }`, what happens on `new B()`?",
    ],
    options: [
      ["خطای `ReferenceError` چون `this` قبل از `super()` استفاده شده", "A `ReferenceError` because `this` is used before `super()`"],
      ["بدون مشکل اجرا می‌شود", "It runs fine"],
      ["`x` نادیده گرفته می‌شود", "`x` is silently ignored"],
      ["`super()` به‌صورت خودکار اول اجرا می‌شود", "`super()` is automatically hoisted to run first"],
    ],
    a: [
      "در کلاس مشتق، `this` تا قبل از فراخوانی `super()` مقداردهی نشده است، چون شیء توسط constructor والد ساخته می‌شود.",
      "In a derived class, `this` isn't initialized until `super()` runs, because the parent constructor creates the object.",
    ],
  },
  {
    id: "js-x-instanceof-chain",
    level: "middle",
    tags: ["prototype"],
    q: ["`obj instanceof Foo` دقیقاً چه چیزی را بررسی می‌کند؟", "What exactly does `obj instanceof Foo` check?"],
    options: [
      ["آیا `Foo.prototype` در زنجیره prototype شیء `obj` وجود دارد", "Whether `Foo.prototype` appears in `obj`'s prototype chain"],
      ["آیا `obj.constructor === Foo` است", "Whether `obj.constructor === Foo`"],
      ["آیا `obj` همه propertyهای `Foo` را دارد", "Whether `obj` has all of `Foo`'s properties"],
      ["آیا `typeof obj === 'Foo'` است", "Whether `typeof obj === 'Foo'`"],
    ],
    a: [
      "`instanceof` زنجیره prototype را پیمایش می‌کند، پس با تغییر prototype یا اشیاء از realm دیگر (مثل iframe) ممکن است نتیجه غیرمنتظره بدهد. `Symbol.hasInstance` هم می‌تواند آن را سفارشی کند.",
      "`instanceof` walks the prototype chain, so changed prototypes or cross-realm objects (iframes) can surprise you. `Symbol.hasInstance` can customize it.",
    ],
  },
  {
    id: "js-x-object-create-null",
    level: "middle",
    tags: ["objects", "prototype"],
    q: ["ویژگی شیء ساخته‌شده با `Object.create(null)` چیست؟", "What is special about an object made with `Object.create(null)`?"],
    options: [
      ["prototype ندارد و متدهایی مثل `toString` یا `hasOwnProperty` را به ارث نمی‌برد", "It has no prototype, so no inherited `toString` or `hasOwnProperty`"],
      ["برابر `null` است", "It equals `null`"],
      ["غیرقابل تغییر است", "It's immutable"],
      ["دقیقاً مثل `{}` است", "It's identical to `{}`"],
    ],
    a: [
      "این روش یک dictionary خالص می‌سازد که کلیدهایی مثل `'__proto__'` یا `'constructor'` با propertyهای ارثی تداخل ندارند.",
      "It creates a pure dictionary where keys like `'__proto__'` or `'constructor'` don't clash with inherited properties.",
    ],
  },
  {
    id: "js-x-flat-depth",
    level: "middle",
    tags: ["arrays"],
    q: ["خروجی `[1, [2, [3, [4]]]].flat()` چیست؟", "What does `[1, [2, [3, [4]]]].flat()` return?"],
    options: [
      ["`[1, 2, [3, [4]]]`", "`[1, 2, [3, [4]]]`"],
      ["`[1, 2, 3, 4]`", "`[1, 2, 3, 4]`"],
      ["`[1, [2, [3, [4]]]]`", "`[1, [2, [3, [4]]]]`"],
      ["`[1, 2, 3, [4]]`", "`[1, 2, 3, [4]]`"],
    ],
    a: [
      "عمق پیش‌فرض `flat` برابر `1` است. برای صاف کردن کامل از `flat(Infinity)` استفاده کنید.",
      "`flat` defaults to depth `1`. Use `flat(Infinity)` to flatten completely.",
    ],
  },
  {
    id: "js-x-fetch-404",
    level: "middle",
    tags: ["fetch", "network"],
    q: ["اگر سرور به `fetch(url)` پاسخ `404` بدهد چه اتفاقی می‌افتد؟", "What happens if the server answers `fetch(url)` with `404`?"],
    options: [
      ["Promise با یک `Response` که `ok` آن `false` است resolve می‌شود", "The promise resolves with a `Response` whose `ok` is `false`"],
      ["Promise با `TypeError` reject می‌شود", "The promise rejects with a `TypeError`"],
      ["`fetch` به‌صورت خودکار دوباره تلاش می‌کند", "`fetch` retries automatically"],
      ["Promise برای همیشه pending می‌ماند", "The promise stays pending forever"],
    ],
    a: [
      "`fetch` فقط در خطای شبکه (یا abort) reject می‌شود. کدهای HTTP خطا را باید خودتان با `response.ok` یا `response.status` بررسی کنید.",
      "`fetch` rejects only on network failure (or abort). Check HTTP errors yourself via `response.ok` or `response.status`.",
    ],
  },
  {
    id: "js-x-json-date",
    level: "middle",
    tags: ["json", "dates"],
    q: [
      "نوع `JSON.parse(JSON.stringify({ d: new Date() })).d` چیست؟",
      "What is the type of `JSON.parse(JSON.stringify({ d: new Date() })).d`?",
    ],
    options: [
      ["رشته (ISO string)", "A string (ISO format)"],
      ["شیء `Date`", "A `Date` object"],
      ["عدد timestamp", "A numeric timestamp"],
      ["`null`", "`null`"],
    ],
    a: [
      "`Date` متد `toJSON` دارد و به رشته ISO تبدیل می‌شود، اما `JSON.parse` آن را دوباره به `Date` تبدیل نمی‌کند. می‌توان از پارامتر reviver استفاده کرد.",
      "`Date` has `toJSON`, producing an ISO string, but `JSON.parse` won't revive it. Use a reviver function to convert it back.",
    ],
  },
  {
    id: "js-x-isnan-global",
    level: "middle",
    tags: ["numbers"],
    q: ["خروجی `isNaN('abc')` و `Number.isNaN('abc')` چیست؟", "What are `isNaN('abc')` and `Number.isNaN('abc')`?"],
    options: [
      ["`true` و `false`", "`true` and `false`"],
      ["`true` و `true`", "`true` and `true`"],
      ["`false` و `false`", "`false` and `false`"],
      ["`false` و `true`", "`false` and `true`"],
    ],
    a: [
      "`isNaN` سراسری ابتدا مقدار را به عدد تبدیل می‌کند، پس `'abc'` به `NaN` تبدیل و `true` می‌شود. `Number.isNaN` تبدیل نوع ندارد و فقط برای خود `NaN` درست است.",
      "Global `isNaN` coerces first, so `'abc'` becomes `NaN` → `true`. `Number.isNaN` doesn't coerce and is true only for actual `NaN`.",
    ],
  },
  {
    id: "js-x-tosorted-immutable",
    level: "middle",
    tags: ["arrays", "immutability"],
    q: ["تفاوت `arr.sort()` و `arr.toSorted()` چیست؟", "How does `arr.sort()` differ from `arr.toSorted()`?"],
    options: [
      ["`sort` آرایه اصلی را تغییر می‌دهد؛ `toSorted` آرایه جدید برمی‌گرداند", "`sort` mutates in place; `toSorted` returns a new array"],
      ["`toSorted` آرایه اصلی را تغییر می‌دهد؛ `sort` کپی برمی‌گرداند", "`toSorted` mutates; `sort` returns a copy"],
      ["`toSorted` فقط اعداد را مرتب می‌کند", "`toSorted` only sorts numbers"],
      ["هیچ تفاوتی ندارند", "There is no difference"],
    ],
    a: [
      "`toSorted`، `toReversed` و `toSpliced` (ES2023) نسخه‌های غیرمخرب هستند و برای state تغییرناپذیر در فریم‌ورک‌هایی مثل React مناسب‌اند.",
      "`toSorted`, `toReversed`, and `toSpliced` (ES2023) are non-mutating versions, handy for immutable state in frameworks like React.",
    ],
  },
  {
    id: "js-x-error-cause",
    level: "middle",
    tags: ["errors"],
    q: ["کاربرد گزینه `cause` در `new Error('Save failed', { cause: err })` چیست؟", "What is `cause` for in `new Error('Save failed', { cause: err })`?"],
    options: [
      ["زنجیره کردن خطا با حفظ خطای اصلی برای دیباگ", "Chaining errors while preserving the original for debugging"],
      ["جلوگیری از پرتاب خطا", "Preventing the error from being thrown"],
      ["ارسال خودکار خطا به سرور", "Automatically reporting the error to a server"],
      ["تعیین کد HTTP خطا", "Setting an HTTP status code"],
    ],
    a: [
      "با `cause` می‌توان خطای سطح بالاتر و معنادارتر ساخت و همچنان خطای ریشه‌ای را از طریق `error.cause` در دسترس داشت.",
      "`cause` lets you wrap a lower-level error in a more meaningful one while keeping the root error available via `error.cause`.",
    ],
  },
  {
    id: "js-x-raf-animation",
    level: "middle",
    tags: ["browser", "performance"],
    q: ["چرا برای انیمیشن‌های JavaScript، `requestAnimationFrame` بهتر از `setInterval` است؟", "Why is `requestAnimationFrame` better than `setInterval` for JS animations?"],
    options: [
      ["با چرخه رندر مرورگر هماهنگ است و در تب‌های پنهان متوقف می‌شود", "It syncs with the browser's paint cycle and pauses in hidden tabs"],
      ["همیشه دقیقاً ۱۲۰ بار در ثانیه اجرا می‌شود", "It always runs exactly 120 times per second"],
      ["callback را در Web Worker اجرا می‌کند", "It runs the callback in a Web Worker"],
      ["از GPU برای اجرای JavaScript استفاده می‌کند", "It uses the GPU to execute JavaScript"],
    ],
    a: [
      "callback درست قبل از paint بعدی و با نرخ تازه‌سازی نمایشگر اجرا می‌شود که از فریم‌های اضافه و jank جلوگیری می‌کند و در تب پس‌زمینه باتری مصرف نمی‌کند.",
      "The callback runs right before the next paint at the display's refresh rate, avoiding wasted frames and jank, and pausing in background tabs.",
    ],
  },
  {
    id: "js-x-intersection-observer",
    level: "middle",
    tags: ["browser", "performance"],
    q: ["برای lazy-load تصاویر هنگام ورود به viewport، کدام API مناسب‌تر است؟", "Which API is best for lazy-loading images as they enter the viewport?"],
    options: [
      ["`IntersectionObserver`", "`IntersectionObserver`"],
      ["listener روی `scroll` با `getBoundingClientRect` در هر رویداد", "A `scroll` listener calling `getBoundingClientRect` each event"],
      ["`MutationObserver`", "`MutationObserver`"],
      ["`setInterval` برای بررسی موقعیت", "`setInterval` polling positions"],
    ],
    a: [
      "`IntersectionObserver` به‌صورت async و بهینه تغییر visibility را گزارش می‌دهد و نیازی به محاسبه layout در هر scroll نیست. `MutationObserver` تغییرات DOM را می‌پاید، نه visibility.",
      "`IntersectionObserver` reports visibility changes asynchronously without forcing layout on every scroll. `MutationObserver` watches DOM changes, not visibility.",
    ],
  },
  {
    id: "js-x-passive-listener",
    level: "middle",
    tags: ["events", "performance"],
    q: ["گزینه `{ passive: true }` در `addEventListener('touchstart', fn, { passive: true })` چه فایده‌ای دارد؟", "What does `{ passive: true }` in `addEventListener('touchstart', fn, { passive: true })` do?"],
    options: [
      ["به مرورگر اطمینان می‌دهد `preventDefault` صدا زده نمی‌شود تا scroll بدون انتظار انجام شود", "Promises `preventDefault` won't be called, so scrolling needn't wait"],
      ["listener را فقط یک بار اجرا می‌کند", "Runs the listener only once"],
      ["listener را در مرحله capture اجرا می‌کند", "Runs the listener in the capture phase"],
      ["رویداد را از propagation متوقف می‌کند", "Stops the event from propagating"],
    ],
    a: [
      "مرورگر در حالت عادی باید منتظر اجرای listener بماند تا ببیند scroll لغو می‌شود یا نه. با `passive` scroll فوراً روی thread compositor انجام می‌شود.",
      "Normally the browser must wait for the listener to see if scrolling is cancelled. With `passive`, scrolling proceeds immediately on the compositor.",
    ],
  },
  {
    id: "js-x-custom-event-detail",
    level: "middle",
    tags: ["events", "dom"],
    q: ["چطور با یک رویداد سفارشی داده ارسال می‌کنید؟", "How do you send data with a custom DOM event?"],
    options: [
      ["`el.dispatchEvent(new CustomEvent('saved', { detail: data }))`", "`el.dispatchEvent(new CustomEvent('saved', { detail: data }))`"],
      ["`el.emit('saved', data)`", "`el.emit('saved', data)`"],
      ["`el.trigger('saved', data)`", "`el.trigger('saved', data)`"],
      ["`new Event('saved', data)` و خواندن آن با `e.data`", "`new Event('saved', data)` and read `e.data`"],
    ],
    a: [
      "`CustomEvent` داده را در `event.detail` نگه می‌دارد. برای bubble شدن رویداد باید `bubbles: true` هم تنظیم شود.",
      "`CustomEvent` carries data in `event.detail`. Set `bubbles: true` if it should bubble up.",
    ],
  },
  {
    id: "js-x-array-at",
    level: "middle",
    tags: ["arrays"],
    q: ["خروجی `[10, 20, 30].at(-1)` و `[10, 20, 30][-1]` چیست؟", "What are `[10, 20, 30].at(-1)` and `[10, 20, 30][-1]`?"],
    options: [
      ["`30` و `undefined`", "`30` and `undefined`"],
      ["`30` و `30`", "`30` and `30`"],
      ["`undefined` و `30`", "`undefined` and `30`"],
      ["`10` و `undefined`", "`10` and `undefined`"],
    ],
    a: [
      "`at` اندیس منفی را از انتها حساب می‌کند. اما `arr[-1]` به دنبال property با کلید `'-1'` می‌گردد که وجود ندارد.",
      "`at` counts negative indexes from the end. `arr[-1]` looks up a property named `'-1'`, which doesn't exist.",
    ],
  },
  {
    id: "js-x-object-fromentries",
    level: "middle",
    tags: ["objects"],
    q: [
      "خروجی `Object.fromEntries(Object.entries({ a: 1, b: 2 }).map(([k, v]) => [k, v * 10]))` چیست؟",
      "What does `Object.fromEntries(Object.entries({ a: 1, b: 2 }).map(([k, v]) => [k, v * 10]))` return?",
    ],
    options: [
      ["`{ a: 10, b: 20 }`", "`{ a: 10, b: 20 }`"],
      ["`[['a', 10], ['b', 20]]`", "`[['a', 10], ['b', 20]]`"],
      ["`{ a: 1, b: 2 }`", "`{ a: 1, b: 2 }`"],
      ["`[10, 20]`", "`[10, 20]`"],
    ],
    a: [
      "`Object.entries` شیء را به آرایه جفت‌های `[key, value]` تبدیل می‌کند و `Object.fromEntries` برعکس آن عمل می‌کند؛ الگوی رایج برای map کردن مقادیر یک شیء.",
      "`Object.entries` turns an object into `[key, value]` pairs and `Object.fromEntries` reverses it: a common pattern for mapping object values.",
    ],
  },
  {
    id: "js-x-for-await-of",
    level: "middle",
    tags: ["async", "iterators"],
    q: ["کاربرد `for await (const chunk of stream)` چیست؟", "What is `for await (const chunk of stream)` used for?"],
    options: [
      ["پیمایش async iterableها و انتظار برای هر مقدار به ترتیب", "Iterating async iterables, awaiting each value in order"],
      ["اجرای موازی همه تکرارها", "Running all iterations in parallel"],
      ["تبدیل حلقه به Web Worker", "Moving the loop into a Web Worker"],
      ["فقط برای آرایه‌های معمولی است و روی stream کار نمی‌کند", "Only for plain arrays; it doesn't work on streams"],
    ],
    a: [
      "`for await...of` از `Symbol.asyncIterator` استفاده می‌کند و برای منابعی مثل `ReadableStream` یا async generatorها مناسب است. هر تکرار تا resolve شدن مقدار بعدی صبر می‌کند.",
      "`for await...of` uses `Symbol.asyncIterator`, suiting sources like `ReadableStream` or async generators. Each iteration waits for the next value.",
    ],
  },
  {
    id: "js-x-symbol-for",
    level: "middle",
    tags: ["symbols"],
    q: ["خروجی `Symbol('id') === Symbol('id')` و `Symbol.for('id') === Symbol.for('id')` چیست؟", "What are `Symbol('id') === Symbol('id')` and `Symbol.for('id') === Symbol.for('id')`?"],
    options: [
      ["`false` و `true`", "`false` and `true`"],
      ["`true` و `true`", "`true` and `true`"],
      ["`false` و `false`", "`false` and `false`"],
      ["`true` و `false`", "`true` and `false`"],
    ],
    a: [
      "هر `Symbol()` یکتاست و توضیح آن فقط برای دیباگ است. `Symbol.for` از یک registry سراسری استفاده می‌کند و برای کلید یکسان همان symbol را برمی‌گرداند.",
      "Each `Symbol()` is unique; the description is only for debugging. `Symbol.for` uses a global registry, returning the same symbol per key.",
    ],
  },
  {
    id: "js-x-delete-array-hole",
    level: "middle",
    tags: ["arrays"],
    q: [
      "بعد از `const a = [1, 2, 3]; delete a[1];` مقدار `a.length` و `1 in a` چیست؟",
      "After `const a = [1, 2, 3]; delete a[1];`, what are `a.length` and `1 in a`?",
    ],
    options: [
      ["`3` و `false`", "`3` and `false`"],
      ["`2` و `false`", "`2` and `false`"],
      ["`3` و `true`", "`3` and `true`"],
      ["`2` و `true`", "`2` and `true`"],
    ],
    a: [
      "`delete` فقط property را حذف می‌کند و یک «حفره» (hole) در آرایه باقی می‌گذارد؛ طول تغییر نمی‌کند. برای حذف واقعی از `splice` یا `filter` استفاده کنید.",
      "`delete` removes the property, leaving a hole; `length` stays the same. Use `splice` or `filter` to actually remove elements.",
    ],
  },
  {
    id: "js-x-replace-first-only",
    level: "middle",
    tags: ["strings"],
    q: ["خروجی `'a-b-c'.replace('-', '+')` چیست؟", "What does `'a-b-c'.replace('-', '+')` return?"],
    options: [
      ["`'a+b-c'`", "`'a+b-c'`"],
      ["`'a+b+c'`", "`'a+b+c'`"],
      ["`'a-b+c'`", "`'a-b+c'`"],
      ["`'a-b-c'`", "`'a-b-c'`"],
    ],
    a: [
      "`replace` با الگوی رشته‌ای فقط اولین مورد را جایگزین می‌کند. برای همه موارد از `replaceAll` یا regex با flag `g` استفاده کنید.",
      "`replace` with a string pattern replaces only the first match. Use `replaceAll` or a regex with the `g` flag.",
    ],
  },
  {
    id: "js-x-getter-class",
    level: "middle",
    tags: ["classes", "objects"],
    q: [
      "با `class U { constructor(f, l) { this.f = f; this.l = l; } get full() { return this.f + ' ' + this.l; } }` چطور نام کامل خوانده می‌شود؟",
      "Given `class U { constructor(f, l) { this.f = f; this.l = l; } get full() { return this.f + ' ' + this.l; } }`, how do you read the full name?",
    ],
    options: [
      ["`u.full` (بدون پرانتز)", "`u.full` (no parentheses)"],
      ["`u.full()`", "`u.full()`"],
      ["`u.get('full')`", "`u.get('full')`"],
      ["`U.full(u)`", "`U.full(u)`"],
    ],
    a: [
      "getter مثل یک property خوانده می‌شود و در هر دسترسی محاسبه می‌شود. `u.full()` خطای `TypeError` می‌دهد چون مقدار رشته قابل فراخوانی نیست.",
      "A getter is accessed like a property and computed on each read. `u.full()` throws a `TypeError` since the string isn't callable.",
    ],
  },
  {
    id: "js-x-iife-purpose",
    level: "middle",
    tags: ["functions", "scope"],
    q: ["هدف اصلی الگوی IIFE مثل `(function () { /* ... */ })();` چیست؟", "What is the main purpose of an IIFE like `(function () { /* ... */ })();`?"],
    options: [
      ["ایجاد scope خصوصی و جلوگیری از آلودگی global scope", "Creating a private scope and avoiding global pollution"],
      ["اجرای تابع به‌صورت async", "Running the function asynchronously"],
      ["تعریف تابعی که بعداً چند بار فراخوانی شود", "Defining a function to call many times later"],
      ["افزایش سرعت اجرای کد", "Making code run faster"],
    ],
    a: [
      "IIFE فوراً اجرا می‌شود و متغیرهایش بیرون نشت نمی‌کنند. قبل از ES modules و `let`/`const` روش اصلی ساخت module pattern بود.",
      "An IIFE runs immediately and its variables don't leak. Before ES modules and `let`/`const`, it was the main way to build the module pattern.",
    ],
  },
]);
