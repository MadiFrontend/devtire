import { build } from "../build";

export const javascriptSenior = build("javascript", [
  {
    id: "js-x-hidden-class-order",
    level: "senior",
    tags: ["v8", "performance"],
    q: [
      "چرا ساختن اشیاء با `{ x, y }` در یک جا و `{ y, x }` در جای دیگر و ارسال هر دو به یک تابع داغ (hot) می‌تواند کند باشد؟",
      "Why can creating objects as `{ x, y }` in one place and `{ y, x }` elsewhere, then passing both to a hot function, be slow?",
    ],
    options: [
      ["ترتیب متفاوت propertyها hidden class (shape) متفاوت می‌سازد و inline cache را polymorphic می‌کند", "Different property order yields different hidden classes, making inline caches polymorphic"],
      ["موتور برای هر شیء یک thread جدا می‌سازد", "The engine spawns a thread per object"],
      ["اشیاء با ترتیب متفاوت همیشه در dictionary mode ذخیره می‌شوند", "Objects with different orders are always stored in dictionary mode"],
      ["ترتیب property هیچ اثری ندارد؛ فقط تعداد آن‌ها مهم است", "Order has no effect; only the property count matters"],
    ],
    a: [
      "V8 برای هر ترتیب افزودن property یک shape جدا می‌سازد. اگر یک call site چند shape ببیند، inline cache از monomorphic به polymorphic یا megamorphic می‌رود و دسترسی‌ها کندتر می‌شوند.",
      "V8 creates a separate shape per property-insertion order. A call site seeing several shapes degrades from monomorphic to polymorphic or megamorphic inline caches.",
    ],
  },
  {
    id: "js-x-holey-arrays",
    level: "senior",
    tags: ["v8", "performance", "arrays"],
    q: ["از نظر عملکرد در V8، مشکل `const a = new Array(1000)` و پر کردن تدریجی آن چیست؟", "Performance-wise in V8, what's the issue with `const a = new Array(1000)` then filling it gradually?"],
    options: [
      ["آرایه با elements kind از نوع HOLEY ساخته می‌شود و هرگز به PACKED برنمی‌گردد", "It starts with a HOLEY elements kind and never transitions back to PACKED"],
      ["آرایه تا پر شدن کامل روی دیسک ذخیره می‌شود", "The array is stored on disk until full"],
      ["هر بار مقداردهی کل آرایه کپی می‌شود", "Every assignment copies the entire array"],
      ["مشکلی ندارد و همیشه سریع‌ترین روش است", "No issue; it's always the fastest approach"],
    ],
    a: [
      "در آرایه‌های holey، موتور برای هر دسترسی باید احتمال حفره و جستجو در prototype chain را بررسی کند. ساختن آرایه با `push` یا literal آن را PACKED نگه می‌دارد.",
      "For holey arrays, the engine must guard against holes and prototype-chain lookups on access. Building with `push` or a literal keeps it PACKED.",
    ],
  },
  {
    id: "js-x-shared-closure-context-leak",
    level: "senior",
    tags: ["closures", "memory"],
    q: [
      "در `function f() { const big = new Array(1e6).fill(0); const unused = () => big.length; return () => 1; }` آیا تابع برگشتی `big` را در حافظه نگه می‌دارد؟",
      "In `function f() { const big = new Array(1e6).fill(0); const unused = () => big.length; return () => 1; }`, does the returned function keep `big` alive?",
    ],
    options: [
      ["بله؛ closureهای یک scope یک context مشترک دارند که شامل `big` است", "Yes; closures in one scope share a context that includes `big`"],
      ["خیر؛ چون تابع برگشتی از `big` استفاده نمی‌کند", "No; the returned function doesn't use `big`"],
      ["خیر؛ `const` همیشه بعد از return آزاد می‌شود", "No; `const` is always freed after return"],
      ["فقط در strict mode نگه داشته می‌شود", "Only in strict mode"],
    ],
    a: [
      "در V8 متغیرهایی که توسط هر closure در یک scope capture شوند در یک context object مشترک قرار می‌گیرند. تا وقتی هر closure زنده است، کل context و `big` زنده می‌مانند.",
      "In V8, variables captured by any closure in a scope live in one shared context object. As long as any closure survives, the whole context, including `big`, does too.",
    ],
  },
  {
    id: "js-x-mixed-queue-order",
    level: "senior",
    tags: ["event-loop"],
    q: [
      "خروجی `setTimeout(() => log(1)); Promise.resolve().then(() => { log(2); setTimeout(() => log(3)); }); queueMicrotask(() => log(4)); log(5);` چیست؟",
      "What does `setTimeout(() => log(1)); Promise.resolve().then(() => { log(2); setTimeout(() => log(3)); }); queueMicrotask(() => log(4)); log(5);` print?",
    ],
    options: [
      ["`5 2 4 1 3`", "`5 2 4 1 3`"],
      ["`5 4 2 1 3`", "`5 4 2 1 3`"],
      ["`5 2 4 3 1`", "`5 2 4 3 1`"],
      ["`5 1 2 4 3`", "`5 1 2 4 3`"],
    ],
    a: [
      "ابتدا کد همگام (`5`)، سپس microtaskها به ترتیب صف (`2` و `4`) اجرا می‌شوند. timer اول قبل از timer دوم ثبت شده، پس `1` و بعد `3`.",
      "Sync code first (`5`), then microtasks in queue order (`2`, `4`). The first timer was registered before the second, so `1` then `3`.",
    ],
  },
  {
    id: "js-x-promise-resolve-identity",
    level: "senior",
    tags: ["promises"],
    q: [
      "با `const p = Promise.resolve(1);` خروجی `Promise.resolve(p) === p` و `new Promise(r => r(p)) === p` چیست؟",
      "With `const p = Promise.resolve(1);`, what are `Promise.resolve(p) === p` and `new Promise(r => r(p)) === p`?",
    ],
    options: [
      ["`true` و `false`", "`true` and `false`"],
      ["`false` و `false`", "`false` and `false`"],
      ["`true` و `true`", "`true` and `true`"],
      ["`false` و `true`", "`false` and `true`"],
    ],
    a: [
      "`Promise.resolve` اگر Promise بومی با همان constructor بگیرد، همان را برمی‌گرداند. `new Promise` همیشه شیء جدیدی می‌سازد که وضعیت `p` را (با چند tick اضافه) دنبال می‌کند.",
      "`Promise.resolve` returns a native promise of the same constructor as-is. `new Promise` always creates a new object that adopts `p`'s state (taking extra ticks).",
    ],
  },
  {
    id: "js-x-rejection-handled-late",
    level: "senior",
    tags: ["promises", "errors"],
    q: [
      "اگر یک Promise reject شود و handler آن بعداً (مثلاً در `setTimeout`) اضافه شود، در مرورگر چه اتفاقی می‌افتد؟",
      "If a promise rejects and its handler is attached later (e.g. in a `setTimeout`), what happens in the browser?",
    ],
    options: [
      ["ابتدا `unhandledrejection` و بعد از افزودن handler رویداد `rejectionhandled` رخ می‌دهد", "`unhandledrejection` fires first, then `rejectionhandled` once a handler is attached"],
      ["handler دیرهنگام هرگز اجرا نمی‌شود", "The late handler never runs"],
      ["مرورگر صفحه را reload می‌کند", "The browser reloads the page"],
      ["هیچ رویدادی رخ نمی‌دهد چون در نهایت handle شده", "No event fires because it was eventually handled"],
    ],
    a: [
      "مرورگر بعد از checkpoint microtaskها Promiseهای rejectشده بدون handler را گزارش می‌دهد. handler دیرهنگام همچنان اجرا می‌شود و `rejectionhandled` برای اصلاح گزارش ارسال می‌شود.",
      "After a microtask checkpoint, the browser reports rejected promises lacking handlers. A late handler still runs, and `rejectionhandled` fires to retract the report.",
    ],
  },
  {
    id: "js-x-weakref-finalization",
    level: "senior",
    tags: ["memory", "gc"],
    q: ["کدام گزینه درباره `WeakRef` و `FinalizationRegistry` درست است؟", "Which is true about `WeakRef` and `FinalizationRegistry`?"],
    options: [
      ["اجرای callback پاک‌سازی تضمین‌شده نیست و نباید منطق حیاتی به آن وابسته باشد", "Cleanup callbacks aren't guaranteed to run; critical logic mustn't depend on them"],
      ["callback دقیقاً بلافاصله بعد از آخرین reference اجرا می‌شود", "The callback runs immediately after the last reference is dropped"],
      ["`deref()` همیشه شیء را برمی‌گرداند", "`deref()` always returns the object"],
      ["`WeakRef` شیء را برای همیشه از GC محافظت می‌کند", "`WeakRef` protects the object from GC forever"],
    ],
    a: [
      "زمان GC غیرقطعی است؛ `deref()` ممکن است `undefined` بدهد و callbackهای finalization ممکن است دیر یا هرگز اجرا نشوند. فقط برای بهینه‌سازی‌هایی مثل cache مناسب‌اند.",
      "GC timing is non-deterministic; `deref()` may return `undefined` and finalizers may run late or never. Use them only for optimizations like caches.",
    ],
  },
  {
    id: "js-x-layout-thrashing",
    level: "senior",
    tags: ["dom", "performance"],
    q: [
      "چرا حلقه `for (const el of items) { el.style.width = box.offsetWidth + 'px'; }` کند است؟",
      "Why is `for (const el of items) { el.style.width = box.offsetWidth + 'px'; }` slow?",
    ],
    options: [
      ["خواندن `offsetWidth` بعد از هر نوشتن، reflow همگام (forced layout) ایجاد می‌کند", "Reading `offsetWidth` after each write forces a synchronous reflow"],
      ["`style.width` فقط در `requestIdleCallback` کار می‌کند", "`style.width` only works inside `requestIdleCallback`"],
      ["`for...of` روی NodeList همیشه کند است", "`for...of` over a NodeList is always slow"],
      ["الحاق رشته با `'px'` حافظه زیادی مصرف می‌کند", "Concatenating `'px'` uses a lot of memory"],
    ],
    a: [
      "این الگو layout thrashing نام دارد. ابتدا همه مقادیر را بخوانید (یک بار `offsetWidth`) و سپس همه نوشتن‌ها را انجام دهید تا مرورگر layout را فقط یک بار محاسبه کند.",
      "This is layout thrashing. Batch reads first (read `offsetWidth` once), then do all writes, so the browser computes layout only once.",
    ],
  },
  {
    id: "js-x-transferable-detached",
    level: "senior",
    tags: ["workers", "performance"],
    q: [
      "بعد از `worker.postMessage(buf, [buf])` که `buf` یک `ArrayBuffer` است، مقدار `buf.byteLength` در thread اصلی چیست؟",
      "After `worker.postMessage(buf, [buf])` where `buf` is an `ArrayBuffer`, what is `buf.byteLength` on the main thread?",
    ],
    options: [
      ["`0`، چون مالکیت منتقل و buffer جدا (detached) شده", "`0`, because ownership was transferred and the buffer is detached"],
      ["همان اندازه قبلی، چون کپی شده", "The original size, since it was copied"],
      ["`undefined`", "`undefined`"],
      ["خطای `DataCloneError`", "A `DataCloneError`"],
    ],
    a: [
      "transfer به جای کپی ساختاریافته، مالکیت حافظه را بدون هزینه کپی منتقل می‌کند و buffer مبدأ غیرقابل استفاده می‌شود. برای داده‌های بزرگ بسیار سریع‌تر است.",
      "Transferring moves memory ownership with zero copying instead of structured cloning, leaving the source buffer unusable. It's much faster for large data.",
    ],
  },
  {
    id: "js-x-sharedarraybuffer-coi",
    level: "senior",
    tags: ["security", "workers"],
    q: ["برای استفاده از `SharedArrayBuffer` در مرورگرهای مدرن چه شرطی لازم است؟", "What is required to use `SharedArrayBuffer` in modern browsers?"],
    options: [
      ["cross-origin isolation با هدرهای `COOP: same-origin` و `COEP: require-corp`", "Cross-origin isolation via `COOP: same-origin` and `COEP: require-corp` headers"],
      ["فقط اجرای صفحه روی `localhost`", "Only running on `localhost`"],
      ["فعال کردن strict mode در همه اسکریپت‌ها", "Enabling strict mode in all scripts"],
      ["ثبت یک Service Worker", "Registering a Service Worker"],
    ],
    a: [
      "به‌خاطر حملات Spectre، حافظه مشترک و تایمرهای دقیق فقط وقتی `crossOriginIsolated` برابر `true` باشد در دسترس‌اند.",
      "Due to Spectre-class attacks, shared memory and high-precision timers are only available when `crossOriginIsolated` is `true`.",
    ],
  },
  {
    id: "js-x-proxy-invariants",
    level: "senior",
    tags: ["proxy", "metaprogramming"],
    q: [
      "با `const t = Object.freeze({ a: 1 }); const p = new Proxy(t, { get: () => 2 });` خواندن `p.a` چه نتیجه‌ای دارد؟",
      "With `const t = Object.freeze({ a: 1 }); const p = new Proxy(t, { get: () => 2 });`, what does reading `p.a` do?",
    ],
    options: [
      ["خطای `TypeError` به‌خاطر نقض invariant پروکسی", "Throws a `TypeError` for violating a proxy invariant"],
      ["`2` برمی‌گرداند", "Returns `2`"],
      ["`1` برمی‌گرداند و trap نادیده گرفته می‌شود", "Returns `1`, ignoring the trap"],
      ["`undefined` برمی‌گرداند", "Returns `undefined`"],
    ],
    a: [
      "برای property غیرقابل نوشتن و غیرقابل پیکربندی target، trap `get` باید دقیقاً همان مقدار را برگرداند. موتور این invariantها را بعد از هر trap بررسی می‌کند.",
      "For a non-writable, non-configurable target property, the `get` trap must report the same value. The engine checks such invariants after each trap.",
    ],
  },
  {
    id: "js-x-reflect-receiver",
    level: "senior",
    tags: ["proxy", "metaprogramming"],
    q: [
      "چرا در trap `get(target, key, receiver)` بهتر است `Reflect.get(target, key, receiver)` برگردانده شود نه `target[key]`؟",
      "Why return `Reflect.get(target, key, receiver)` rather than `target[key]` in a `get(target, key, receiver)` trap?",
    ],
    options: [
      ["تا getterها با `this` برابر proxy اجرا شوند و دسترسی‌های داخلی هم از trap عبور کنند", "So getters run with `this` as the proxy, routing inner accesses through the trap"],
      ["چون `target[key]` در Proxy خطای نحوی است", "Because `target[key]` is a syntax error in a Proxy"],
      ["`Reflect.get` نتیجه را cache می‌کند", "`Reflect.get` caches results"],
      ["`Reflect.get` propertyهای private را هم برمی‌گرداند", "`Reflect.get` also returns private fields"],
    ],
    a: [
      "با `target[key]` یک getter با `this === target` اجرا می‌شود و propertyهایی که داخل getter خوانده می‌شوند از proxy عبور نمی‌کنند؛ این برای سیستم‌های reactive و ارث‌بری مشکل‌ساز است.",
      "With `target[key]`, getters run with `this === target`, so properties read inside them bypass the proxy: breaking reactivity systems and inheritance.",
    ],
  },
  {
    id: "js-x-negative-zero",
    level: "senior",
    tags: ["numbers", "equality"],
    q: ["خروجی `0 === -0`، `Object.is(0, -0)` و `1 / -0` چیست؟", "What are `0 === -0`, `Object.is(0, -0)`, and `1 / -0`?"],
    options: [
      ["`true`، `false`، `-Infinity`", "`true`, `false`, `-Infinity`"],
      ["`true`، `true`، `Infinity`", "`true`, `true`, `Infinity`"],
      ["`false`، `false`، `-Infinity`", "`false`, `false`, `-Infinity`"],
      ["`true`، `false`، `NaN`", "`true`, `false`, `NaN`"],
    ],
    a: [
      "IEEE 754 صفر مثبت و منفی دارد؛ `===` آن‌ها را برابر می‌داند ولی `Object.is` (SameValue) تفاوت را تشخیص می‌دهد. علامت صفر در تقسیم اثر دارد.",
      "IEEE 754 has signed zeros; `===` treats them as equal while `Object.is` (SameValue) distinguishes them. The sign matters in division.",
    ],
  },
  {
    id: "js-x-max-safe-integer",
    level: "senior",
    tags: ["numbers", "bigint"],
    q: ["خروجی `2 ** 53 === 2 ** 53 + 1` چیست؟", "What is `2 ** 53 === 2 ** 53 + 1`?"],
    options: [
      ["`true`", "`true`"],
      ["`false`", "`false`"],
      ["`NaN`", "`NaN`"],
      ["خطای `RangeError`", "A `RangeError`"],
    ],
    a: [
      "بعد از `Number.MAX_SAFE_INTEGER` (یعنی `2 ** 53 - 1`) دقت double برای همه اعداد صحیح کافی نیست. برای IDهای بزرگ (مثلاً از API) از `BigInt` یا رشته استفاده کنید.",
      "Beyond `Number.MAX_SAFE_INTEGER` (`2 ** 53 - 1`), doubles can't represent every integer. Use `BigInt` or strings for large IDs (e.g. from APIs).",
    ],
  },
  {
    id: "js-x-bigint-mixing",
    level: "senior",
    tags: ["bigint", "types"],
    q: ["نتیجه `1n + 1` و `JSON.stringify({ id: 1n })` چیست؟", "What do `1n + 1` and `JSON.stringify({ id: 1n })` do?"],
    options: [
      ["هر دو `TypeError` می‌دهند", "Both throw a `TypeError`"],
      ["`2n` و `'{\"id\":1}'`", "`2n` and `'{\"id\":1}'`"],
      ["`2` و `'{\"id\":\"1n\"}'`", "`2` and `'{\"id\":\"1n\"}'`"],
      ["`2n` و `'{}'`", "`2n` and `'{}'`"],
    ],
    a: [
      "JavaScript اجازه ترکیب ضمنی `BigInt` و `Number` را نمی‌دهد تا دقت از دست نرود. `JSON.stringify` هم BigInt را پشتیبانی نمی‌کند مگر `toJSON` تعریف شود یا از replacer استفاده کنید.",
      "Implicitly mixing `BigInt` and `Number` is disallowed to avoid precision loss. `JSON.stringify` also rejects BigInt unless you define `toJSON` or use a replacer.",
    ],
  },
  {
    id: "js-x-prototype-pollution",
    level: "senior",
    tags: ["security", "objects"],
    q: [
      "یک تابع deep merge ساده، `JSON.parse('{\"__proto__\": {\"isAdmin\": true}}')` را در `{}` merge می‌کند. سپس `({}).isAdmin` چیست؟",
      "A naive deep merge merges `JSON.parse('{\"__proto__\": {\"isAdmin\": true}}')` into `{}`. What is `({}).isAdmin` afterwards?",
    ],
    options: [
      ["`true`، چون `Object.prototype` آلوده شده است", "`true`, because `Object.prototype` got polluted"],
      ["`undefined`، چون `JSON.parse` کلید `__proto__` را حذف می‌کند", "`undefined`, because `JSON.parse` drops `__proto__`"],
      ["`false`", "`false`"],
      ["merge خطای `TypeError` می‌دهد", "The merge throws a `TypeError`"],
    ],
    a: [
      "`JSON.parse` کلید `__proto__` را به‌صورت own property می‌سازد، اما merge با `target['__proto__']` به `Object.prototype` می‌رسد و آن را تغییر می‌دهد. کلیدهای `__proto__`، `constructor` و `prototype` را فیلتر کنید یا از `Object.create(null)` و `Map` استفاده کنید.",
      "`JSON.parse` creates `__proto__` as an own key, but `target['__proto__']` in the merge reaches `Object.prototype` and mutates it. Filter `__proto__`/`constructor`/`prototype` keys or use `Object.create(null)`/`Map`.",
    ],
  },
  {
    id: "js-x-esm-live-bindings",
    level: "senior",
    tags: ["modules"],
    q: [
      "در `counter.js`: `export let count = 0; export const inc = () => count++;` و در `main.js`: `import { count, inc } from './counter.js'; inc(); console.log(count);` چه چاپ می‌شود؟",
      "In `counter.js`: `export let count = 0; export const inc = () => count++;` and in `main.js`: `import { count, inc } from './counter.js'; inc(); console.log(count);`: what's printed?",
    ],
    options: [
      ["`1`، چون importها در ESM binding زنده هستند", "`1`, because ESM imports are live bindings"],
      ["`0`، چون مقدار هنگام import کپی شده", "`0`, because the value was copied at import time"],
      ["خطای `TypeError` چون import فقط‌خواندنی است", "A `TypeError` because imports are read-only"],
      ["`undefined`", "`undefined`"],
    ],
    a: [
      "در ESM، import یک نمای زنده به متغیر export‌شده است و تغییرات ماژول مبدأ دیده می‌شود (هرچند importer نمی‌تواند آن را مستقیم تغییر دهد). در CommonJS مقدار primitive کپی می‌شد.",
      "ESM imports are live views of the exported binding, so changes in the source module are visible (though importers can't reassign them). CommonJS copies primitive values.",
    ],
  },
  {
    id: "js-x-esm-circular-tdz",
    level: "senior",
    tags: ["modules"],
    q: [
      "`a.js` ماژول `b.js` را import می‌کند و `b.js` در سطح بالا از `export const x` در `a.js` استفاده می‌کند. اگر ورودی `a.js` باشد چه می‌شود؟",
      "`a.js` imports `b.js`, and `b.js` uses `a.js`'s `export const x` at top level. If `a.js` is the entry, what happens?",
    ],
    options: [
      ["خطای `ReferenceError` چون `x` هنوز در TDZ است", "A `ReferenceError` because `x` is still in the TDZ"],
      ["`b.js` مقدار `undefined` می‌بیند", "`b.js` sees `undefined`"],
      ["موتور ترتیب اجرا را خودکار اصلاح می‌کند", "The engine reorders evaluation automatically"],
      ["بارگذاری ماژول‌ها در حلقه بی‌نهایت می‌افتد", "Module loading loops forever"],
    ],
    a: [
      "در وابستگی چرخه‌ای، `b.js` قبل از ادامه اجرای `a.js` ارزیابی می‌شود و binding `x` هنوز مقداردهی نشده است. استفاده داخل توابعی که بعداً صدا زده می‌شوند مشکلی ندارد.",
      "In a cycle, `b.js` evaluates before `a.js` finishes, so `x` is uninitialized. Accessing it inside functions called later is fine.",
    ],
  },
  {
    id: "js-x-top-level-await",
    level: "senior",
    tags: ["modules", "async"],
    q: ["اثر `await` در سطح بالای یک ES module روی ماژول‌هایی که آن را import می‌کنند چیست؟", "What effect does top-level `await` in an ES module have on modules importing it?"],
    options: [
      ["اجرای ماژول‌های وابسته تا resolve شدن آن به تعویق می‌افتد", "Dependent modules' evaluation is delayed until it resolves"],
      ["کل thread اصلی مرورگر مسدود می‌شود", "The browser's main thread is fully blocked"],
      ["importerها مقدار `undefined` می‌گیرند و ادامه می‌دهند", "Importers get `undefined` and continue"],
      ["فقط در CommonJS مجاز است", "It's only allowed in CommonJS"],
    ],
    a: [
      "ماژول با top-level await مثل یک async function رفتار می‌کند و والدهایش تا اتمام آن ارزیابی نمی‌شوند؛ ماژول‌های هم‌سطح غیروابسته می‌توانند ادامه دهند. استفاده زیاد می‌تواند زمان راه‌اندازی را کند کند.",
      "A module with top-level await acts like an async function; its parents wait, while unrelated siblings proceed. Overuse can slow startup.",
    ],
  },
  {
    id: "js-x-timer-clamping",
    level: "senior",
    tags: ["event-loop", "scheduling"],
    q: [
      "چرا schedulerهایی مثل React به جای `setTimeout(fn, 0)` تکراری از `MessageChannel` استفاده می‌کنند؟",
      "Why do schedulers like React's use `MessageChannel` instead of repeated `setTimeout(fn, 0)`?",
    ],
    options: [
      ["`setTimeout`های تودرتو بعد از چند سطح حداقل ۴ms تأخیر می‌گیرند", "Nested `setTimeout`s get clamped to at least 4ms after a few levels"],
      ["`MessageChannel` callback را به‌صورت microtask اجرا می‌کند", "`MessageChannel` runs callbacks as microtasks"],
      ["`setTimeout` در React غیرفعال است", "`setTimeout` is disabled inside React"],
      ["`MessageChannel` کد را روی thread جداگانه اجرا می‌کند", "`MessageChannel` runs code on a separate thread"],
    ],
    a: [
      "طبق استاندارد HTML، بعد از ۵ سطح تودرتو تأخیر timer حداقل ۴ms می‌شود. پیام‌های `MessageChannel` به‌صورت task بدون این محدودیت اجرا می‌شوند و اجازه رندر بین آن‌ها را می‌دهند.",
      "Per the HTML spec, timers nested beyond 5 levels are clamped to ≥4ms. `MessageChannel` messages are tasks without that clamp, still letting the browser render between them.",
    ],
  },
  {
    id: "js-x-timeout-overflow",
    level: "senior",
    tags: ["timers", "edge-cases"],
    q: ["`setTimeout(fn, 2 ** 31)` (حدود ۲۵ روز) چه زمانی اجرا می‌شود؟", "When does `setTimeout(fn, 2 ** 31)` (about 25 days) fire?"],
    options: [
      ["تقریباً فوراً، چون تأخیر از int32 علامت‌دار سرریز می‌کند", "Almost immediately, since the delay overflows a signed 32-bit int"],
      ["دقیقاً بعد از ۲۵ روز", "Exactly after 25 days"],
      ["هرگز اجرا نمی‌شود", "It never fires"],
      ["خطای `RangeError` می‌دهد", "It throws a `RangeError`"],
    ],
    a: [
      "مرورگرها تأخیر را به‌صورت int32 ذخیره می‌کنند و مقادیر بیشتر از `2147483647` عملاً به حداقل تأخیر تبدیل می‌شوند. برای زمان‌های طولانی باید تأخیر را تکه‌تکه زمان‌بندی کرد.",
      "Browsers store delays as int32, so values above `2147483647` effectively become the minimum delay. Chain shorter timeouts for long durations.",
    ],
  },
  {
    id: "js-x-generator-return-finally",
    level: "senior",
    tags: ["generators", "iterators"],
    q: [
      "با `function* g() { try { yield 1; yield 2; } finally { console.log('cleanup'); } }` اگر داخل `for (const x of g()) { break; }` حلقه زودتر تمام شود چه می‌شود؟",
      "With `function* g() { try { yield 1; yield 2; } finally { console.log('cleanup'); } }`, what happens if `for (const x of g()) { break; }` exits early?",
    ],
    options: [
      ["`for...of` متد `return()` را صدا می‌زند و `cleanup` چاپ می‌شود", "`for...of` calls `return()`, so `cleanup` is logged"],
      ["generator معلق می‌ماند و `finally` هرگز اجرا نمی‌شود", "The generator stays suspended and `finally` never runs"],
      ["`break` داخل حلقه روی generator خطا می‌دهد", "`break` throws on a generator loop"],
      ["`yield 2` اجرا می‌شود و بعد `cleanup`", "`yield 2` runs, then `cleanup`"],
    ],
    a: [
      "خروج زودهنگام از `for...of` (با `break`، `return` یا throw) متد `iterator.return()` را صدا می‌زند که generator را در محل `yield` خاتمه می‌دهد و بلوک‌های `finally` اجرا می‌شوند.",
      "Exiting `for...of` early (break, return, or throw) calls `iterator.return()`, which completes the generator at its `yield` and runs `finally` blocks.",
    ],
  },
  {
    id: "js-x-sort-stability",
    level: "senior",
    tags: ["arrays", "spec"],
    q: ["از ES2019 کدام تضمین برای `Array.prototype.sort` اضافه شد؟", "Which guarantee was added to `Array.prototype.sort` in ES2019?"],
    options: [
      ["مرتب‌سازی پایدار (stable) است و ترتیب نسبی عناصر برابر حفظ می‌شود", "It is stable; equal elements keep their relative order"],
      ["پیچیدگی آن همیشه O(n) است", "It always runs in O(n)"],
      ["آرایه اصلی را تغییر نمی‌دهد", "It no longer mutates the array"],
      ["به‌طور پیش‌فرض اعداد را عددی مرتب می‌کند", "It sorts numbers numerically by default"],
    ],
    a: [
      "پیش از آن برخی موتورها (مثلاً V8 برای آرایه‌های بیش از ۱۰ عنصر) از QuickSort ناپایدار استفاده می‌کردند. اکنون V8 از TimSort استفاده می‌کند و مرتب‌سازی چندمرحله‌ای قابل اتکاست.",
      "Previously some engines (e.g. V8 for arrays over 10 items) used unstable QuickSort. V8 now uses TimSort, making multi-pass sorting reliable.",
    ],
  },
  {
    id: "js-x-utf16-length",
    level: "senior",
    tags: ["strings", "unicode"],
    q: ["خروجی `'😀'.length` و `[...'😀'].length` چیست؟", "What are `'😀'.length` and `[...'😀'].length`?"],
    options: [
      ["`2` و `1`", "`2` and `1`"],
      ["`1` و `1`", "`1` and `1`"],
      ["`2` و `2`", "`2` and `2`"],
      ["`4` و `1`", "`4` and `1`"],
    ],
    a: [
      "`length` تعداد واحدهای UTF-16 را می‌شمارد و این emoji یک surrogate pair است. spread بر اساس code point پیمایش می‌کند؛ برای grapheme‌های ترکیبی (مثل emoji خانواده) باید از `Intl.Segmenter` استفاده کرد.",
      "`length` counts UTF-16 code units, and this emoji is a surrogate pair. Spreading iterates code points; for combined graphemes (e.g. family emoji) use `Intl.Segmenter`.",
    ],
  },
  {
    id: "js-x-function-length-defaults",
    level: "senior",
    tags: ["functions", "edge-cases"],
    q: ["خروجی `((a, b = 1, c) => {}).length` چیست؟", "What is `((a, b = 1, c) => {}).length`?"],
    options: [
      ["`1`", "`1`"],
      ["`3`", "`3`"],
      ["`2`", "`2`"],
      ["`0`", "`0`"],
    ],
    a: [
      "`length` فقط پارامترهای قبل از اولین پارامتر دارای مقدار پیش‌فرض (یا rest) را می‌شمارد. کتابخانه‌هایی که بر اساس `fn.length` رفتار می‌کنند (مثل curry) با این موضوع دچار مشکل می‌شوند.",
      "`length` counts only parameters before the first default (or rest) parameter. Libraries relying on `fn.length` (e.g. curry helpers) can break because of this.",
    ],
  },
  {
    id: "js-x-new-target",
    level: "senior",
    tags: ["functions", "classes"],
    q: ["`new.target` داخل یک تابع چه چیزی را نشان می‌دهد؟", "What does `new.target` indicate inside a function?"],
    options: [
      ["constructorی که با `new` صدا زده شده، یا `undefined` اگر بدون `new` فراخوانی شده باشد", "The constructor invoked with `new`, or `undefined` if called without `new`"],
      ["شیء `this` جدید", "The newly created `this` object"],
      ["prototype والد", "The parent prototype"],
      ["آخرین شیئی که با `new` ساخته شده", "The last object created with `new`"],
    ],
    a: [
      "با `new.target` می‌توان فراخوانی بدون `new` را تشخیص داد یا کلاس abstract ساخت (`if (new.target === Base) throw ...`). در کلاس مشتق، برابر کلاس فرزند است.",
      "`new.target` detects calls without `new` or enforces abstract classes (`if (new.target === Base) throw ...`). In derived classes it's the subclass.",
    ],
  },
  {
    id: "js-x-property-order",
    level: "senior",
    tags: ["objects", "spec"],
    q: ["خروجی `Object.keys({ b: 1, 2: 1, a: 1, 1: 1 })` چیست؟", "What does `Object.keys({ b: 1, 2: 1, a: 1, 1: 1 })` return?"],
    options: [
      ["`['1', '2', 'b', 'a']`", "`['1', '2', 'b', 'a']`"],
      ["`['b', '2', 'a', '1']`", "`['b', '2', 'a', '1']`"],
      ["`['a', 'b', '1', '2']`", "`['a', 'b', '1', '2']`"],
      ["ترتیب تضمین‌شده نیست", "The order isn't guaranteed"],
    ],
    a: [
      "طبق spec، کلیدهای شبیه اندیس آرایه (integer-like) ابتدا به ترتیب صعودی و سپس کلیدهای رشته‌ای به ترتیب درج می‌آیند. برای حفظ ترتیب دلخواه کلیدهای عددی از `Map` استفاده کنید.",
      "Per spec, integer-like keys come first in ascending order, then string keys in insertion order. Use `Map` to preserve arbitrary ordering of numeric keys.",
    ],
  },
  {
    id: "js-x-array-equals-not-array",
    level: "senior",
    tags: ["coercion", "equality"],
    q: ["خروجی `[] == ![]` چیست؟", "What is `[] == ![]`?"],
    options: [
      ["`true`", "`true`"],
      ["`false`", "`false`"],
      ["خطای `TypeError`", "A `TypeError`"],
      ["`undefined`", "`undefined`"],
    ],
    a: [
      "`![]` برابر `false` است (آرایه truthy است). سپس `[] == false`: boolean به `0` و آرایه به `''` و سپس `0` تبدیل می‌شود، پس `0 == 0` درست است.",
      "`![]` is `false` (arrays are truthy). Then `[] == false`: the boolean becomes `0`, the array becomes `''` then `0`, so `0 == 0` is true.",
    ],
  },
  {
    id: "js-x-map-skips-holes",
    level: "senior",
    tags: ["arrays", "edge-cases"],
    q: ["خروجی `Array(3).map((_, i) => i)` چیست؟", "What does `Array(3).map((_, i) => i)` return?"],
    options: [
      ["آرایه‌ای با ۳ حفره (`[ <3 empty items> ]`)", "An array with 3 holes (`[ <3 empty items> ]`)"],
      ["`[0, 1, 2]`", "`[0, 1, 2]`"],
      ["`[undefined, undefined, undefined]`", "`[undefined, undefined, undefined]`"],
      ["`[]`", "`[]`"],
    ],
    a: [
      "`Array(3)` فقط `length` را تنظیم می‌کند و عنصری ندارد؛ `map` و `forEach` از حفره‌ها رد می‌شوند. از `Array.from({ length: 3 }, (_, i) => i)` یا `[...Array(3).keys()]` استفاده کنید.",
      "`Array(3)` only sets `length` with no elements; `map`/`forEach` skip holes. Use `Array.from({ length: 3 }, (_, i) => i)` or `[...Array(3).keys()]`.",
    ],
  },
  {
    id: "js-x-generational-gc",
    level: "senior",
    tags: ["gc", "v8", "memory"],
    q: ["garbage collector در V8 چگونه بیشتر اشیاء کوتاه‌عمر را به‌صرفه پاک می‌کند؟", "How does V8's garbage collector cheaply reclaim most short-lived objects?"],
    options: [
      ["با GC نسلی: young generation با scavenger کپی‌کننده و old generation با mark-sweep-compact", "Generational GC: a copying scavenger for the young generation, mark-sweep-compact for old"],
      ["با reference counting خالص که حلقه‌ها را هم پاک می‌کند", "Pure reference counting that also collects cycles"],
      ["فقط هنگام بستن تب حافظه را آزاد می‌کند", "It only frees memory when the tab closes"],
      ["هر شیء را بلافاصله بعد از خروج از scope آزاد می‌کند", "It frees each object right after it leaves scope"],
    ],
    a: [
      "طبق فرضیه نسلی، بیشتر اشیاء جوان می‌میرند؛ scavenger فقط اشیاء زنده را کپی می‌کند که سریع است. اشیاء بازمانده به old space منتقل و با mark-compact افزایشی و همزمان پاک می‌شوند.",
      "Per the generational hypothesis most objects die young; the scavenger only copies live ones, which is fast. Survivors are promoted to old space, collected by incremental/concurrent mark-compact.",
    ],
  },
  {
    id: "js-x-jit-deopt",
    level: "senior",
    tags: ["v8", "performance"],
    q: [
      "تابع `add(a, b)` هزاران بار با اعداد صدا زده شده و TurboFan آن را بهینه کرده است. اگر ناگهان با رشته صدا زده شود چه می‌شود؟",
      "`add(a, b)` was called thousands of times with numbers and optimized by TurboFan. What happens when it's suddenly called with strings?",
    ],
    options: [
      ["deoptimization رخ می‌دهد و اجرا به bytecode مفسر برمی‌گردد", "It deoptimizes and falls back to interpreter bytecode"],
      ["خطای `TypeError` می‌دهد چون کد برای اعداد کامپایل شده", "It throws a `TypeError` because it was compiled for numbers"],
      ["رشته‌ها خودکار به عدد تبدیل می‌شوند", "Strings are coerced to numbers automatically"],
      ["هیچ اثری ندارد؛ کد بهینه همه نوع‌ها را پوشش می‌دهد", "Nothing; optimized code handles all types equally"],
    ],
    a: [
      "کد بهینه بر اساس فرضیات نوعی (type feedback) ساخته می‌شود و guardها نقض فرض را تشخیص می‌دهند. deopt مکرر هزینه دارد، پس توابع داغ را از نظر نوع ورودی یکنواخت نگه دارید.",
      "Optimized code relies on type feedback, and guards detect violated assumptions. Repeated deopts are costly, so keep hot functions type-stable.",
    ],
  },
  {
    id: "js-x-freeze-private-fields",
    level: "senior",
    tags: ["classes", "immutability"],
    q: [
      "با `class C { #n = 0; inc() { this.#n++; return this.#n; } } const c = Object.freeze(new C());` خروجی `c.inc()` چیست؟",
      "Given `class C { #n = 0; inc() { this.#n++; return this.#n; } } const c = Object.freeze(new C());`, what does `c.inc()` return?",
    ],
    options: [
      ["`1`، چون `Object.freeze` روی فیلدهای private اثری ندارد", "`1`, because `Object.freeze` doesn't affect private fields"],
      ["خطای `TypeError` چون شیء freeze شده", "A `TypeError` because the object is frozen"],
      ["`0`، چون تغییر بی‌صدا نادیده گرفته می‌شود", "`0`, since the change is silently ignored"],
      ["`NaN`", "`NaN`"],
    ],
    a: [
      "فیلدهای private property معمولی نیستند و در internal slotهای شیء نگه‌داری می‌شوند، پس `freeze` و `seal` آن‌ها را قفل نمی‌کنند.",
      "Private fields aren't ordinary properties; they live in internal slots, so `freeze` and `seal` don't lock them.",
    ],
  },
  {
    id: "js-x-long-tasks-yield",
    level: "senior",
    tags: ["performance", "scheduling"],
    q: ["برای بهبود INP در پردازش یک آرایه بزرگ روی thread اصلی، بهترین رویکرد چیست؟", "To improve INP while processing a huge array on the main thread, what's the best approach?"],
    options: [
      ["کار را تکه‌تکه کنید و بین تکه‌ها با `scheduler.yield()` یا `setTimeout` به مرورگر فرصت دهید", "Chunk the work and yield between chunks with `scheduler.yield()` or `setTimeout`"],
      ["کل کار را در یک `Promise.then` بگذارید تا async شود", "Wrap everything in one `Promise.then` to make it async"],
      ["کار را در `queueMicrotask` تقسیم کنید", "Split the work across `queueMicrotask` calls"],
      ["از `for` به جای `forEach` استفاده کنید", "Use `for` instead of `forEach`"],
    ],
    a: [
      "microtaskها قبل از رندر و پردازش ورودی کامل اجرا می‌شوند و thread را آزاد نمی‌کنند. yield کردن به task queue اجازه می‌دهد مرورگر بین تکه‌ها به ورودی کاربر پاسخ دهد و long task ایجاد نشود.",
      "Microtasks all run before rendering and input handling, so they don't free the thread. Yielding to the task queue lets the browser respond to input between chunks, avoiding long tasks.",
    ],
  },
  {
    id: "js-x-request-idle-callback",
    level: "senior",
    tags: ["scheduling", "performance"],
    q: ["کدام گزینه درباره `requestIdleCallback` درست است؟", "Which is true about `requestIdleCallback`?"],
    options: [
      ["در دوره‌های بیکاری اجرا می‌شود و با `deadline.timeRemaining()` باید کار را محدود کرد", "It runs in idle periods; limit work using `deadline.timeRemaining()`"],
      ["تضمین می‌کند callback در فریم بعدی اجرا شود", "It guarantees the callback runs next frame"],
      ["برای تغییرات DOM و انیمیشن بهترین گزینه است", "It's the best choice for DOM changes and animations"],
      ["callback را با بالاترین اولویت اجرا می‌کند", "It runs the callback at the highest priority"],
    ],
    a: [
      "برای کارهای کم‌اولویت مثل ارسال analytics مناسب است و ممکن است مدت زیادی اجرا نشود؛ گزینه `timeout` حداکثر تأخیر را تعیین می‌کند. تغییر DOM در آن توصیه نمی‌شود چون ممکن است از بودجه فریم بگذرد.",
      "Good for low-priority work like analytics; it may be delayed indefinitely unless you pass `timeout`. Avoid DOM mutations there, as they may overrun the frame budget.",
    ],
  },
  {
    id: "js-x-direct-eval-deopt",
    level: "senior",
    tags: ["performance", "scope"],
    q: ["چرا وجود `eval(code)` مستقیم داخل یک تابع بهینه‌سازی موتور را مختل می‌کند؟", "Why does a direct `eval(code)` inside a function hinder engine optimizations?"],
    options: [
      ["کد می‌تواند به هر متغیر محلی دسترسی داشته باشد، پس موتور باید کل scope را زنده و دست‌نخورده نگه دارد", "The code may access any local, so the engine must keep the entire scope alive and unoptimized"],
      ["`eval` همیشه در Web Worker اجرا می‌شود", "`eval` always runs in a Web Worker"],
      ["`eval` فقط در strict mode کند است", "`eval` is only slow in strict mode"],
      ["`eval` کد را دو بار دانلود می‌کند", "`eval` downloads code twice"],
    ],
    a: [
      "موتور نمی‌تواند از قبل بداند `eval` به کدام متغیرها ارجاع می‌دهد، پس نمی‌تواند متغیرها را حذف یا در register نگه دارد. `eval` غیرمستقیم (`(0, eval)(code)`) در global scope اجرا می‌شود و این مشکل را ندارد.",
      "The engine can't know which variables `eval` references, so it can't eliminate or register-allocate them. Indirect eval (`(0, eval)(code)`) runs in global scope and avoids this.",
    ],
  },
  {
    id: "js-x-executor-throw-after-resolve",
    level: "senior",
    tags: ["promises", "errors"],
    q: [
      "وضعیت نهایی `new Promise((res) => { res(1); throw new Error('x'); })` چیست؟",
      "What is the final state of `new Promise((res) => { res(1); throw new Error('x'); })`?",
    ],
    options: [
      ["fulfilled با `1` و خطا بی‌صدا نادیده گرفته می‌شود", "Fulfilled with `1`; the error is silently ignored"],
      ["rejected با `Error('x')`", "Rejected with `Error('x')`"],
      ["خطای uncaught در کنسول و Promise در حالت pending", "Uncaught error logged; promise stays pending"],
      ["ابتدا fulfilled و سپس به rejected تغییر می‌کند", "Fulfilled first, then switches to rejected"],
    ],
    a: [
      "Promise فقط یک بار settle می‌شود. throw در executor به `reject` تبدیل می‌شود، اما چون قبلاً resolve شده بی‌اثر است و حتی گزارشی هم نمی‌شود؛ این می‌تواند باگ‌ها را پنهان کند.",
      "A promise settles only once. A throw in the executor becomes `reject`, but since it's already resolved, it's ignored without any report: which can hide bugs.",
    ],
  },
  {
    id: "js-x-await-thenable",
    level: "senior",
    tags: ["async", "promises"],
    q: ["خروجی `console.log(await { then(r) { r(42); } })` در یک ES module چیست؟", "What does `console.log(await { then(r) { r(42); } })` print in an ES module?"],
    options: [
      ["`42`", "`42`"],
      ["همان شیء `{ then }`", "The `{ then }` object itself"],
      ["`undefined`", "`undefined`"],
      ["خطای `TypeError` چون شیء Promise نیست", "A `TypeError` because it isn't a Promise"],
    ],
    a: [
      "`await` و resolve کردن Promise هر شیئی با متد `then` (thenable) را مثل Promise دنبال می‌کنند. به همین دلیل اشیائی که به‌طور تصادفی `then` دارند می‌توانند رفتار عجیبی ایجاد کنند.",
      "`await` and promise resolution adopt any object with a `then` method (a thenable). That's why objects accidentally having `then` can behave strangely.",
    ],
  },
  {
    id: "js-x-module-singleton-eval",
    level: "senior",
    tags: ["modules"],
    q: [
      "اگر یک ES module در چند جای برنامه (static و با `import()` dynamic) با همان URL import شود، کد سطح بالای آن چند بار اجرا می‌شود؟",
      "If an ES module is imported from several places (static and dynamic `import()`) with the same URL, how many times does its top-level code run?",
    ],
    options: [
      ["فقط یک بار؛ نمونه ماژول در module map کش می‌شود", "Once; the module instance is cached in the module map"],
      ["به تعداد importها", "Once per import"],
      ["یک بار برای static و یک بار برای هر `import()`", "Once for static and once per `import()`"],
      ["هر بار که export آن خوانده شود", "Every time an export is read"],
    ],
    a: [
      "ماژول‌ها بر اساس URL نهایی resolve‌شده کش می‌شوند، پس state سطح بالا عملاً singleton است. اما URL متفاوت (مثلاً با query string) نمونه جدیدی می‌سازد.",
      "Modules are cached by resolved URL, so top-level state is effectively a singleton. A different URL (e.g. with a query string) creates a new instance.",
    ],
  },
]);
