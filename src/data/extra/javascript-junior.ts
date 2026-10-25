import { build } from "../build";

export const javascriptJunior = build("javascript", [
  {
    id: "js-x-typeof-null",
    level: "junior",
    tags: ["types"],
    q: ["خروجی `typeof null` چیست؟", "What does `typeof null` return?"],
    options: [
      ["`'object'`", "`'object'`"],
      ["`'null'`", "`'null'`"],
      ["`'undefined'`", "`'undefined'`"],
      ["`'number'`", "`'number'`"],
    ],
    a: [
      "این یک باگ تاریخی در JavaScript است که برای حفظ سازگاری هرگز اصلاح نشد. برای تشخیص `null` از `x === null` استفاده کنید.",
      "This is a historical bug in JavaScript kept for backward compatibility. Use `x === null` to check for `null`.",
    ],
  },
  {
    id: "js-x-float-precision",
    level: "junior",
    tags: ["numbers"],
    q: ["حاصل `0.1 + 0.2 === 0.3` چیست؟", "What is the result of `0.1 + 0.2 === 0.3`?"],
    options: [
      ["`false`", "`false`"],
      ["`true`", "`true`"],
      ["`NaN`", "`NaN`"],
      ["خطای `TypeError`", "A `TypeError`"],
    ],
    a: [
      "اعداد در JavaScript به‌صورت ممیز شناور IEEE 754 ذخیره می‌شوند و `0.1 + 0.2` برابر `0.30000000000000004` می‌شود. برای مقایسه از اختلاف کمتر از `Number.EPSILON` استفاده کنید.",
      "Numbers are IEEE 754 floating point, so `0.1 + 0.2` is `0.30000000000000004`. Compare using a tolerance such as `Number.EPSILON`.",
    ],
  },
  {
    id: "js-x-string-minus",
    level: "junior",
    tags: ["types", "coercion"],
    q: ["خروجی `'5' - 2` چیست؟", "What is the result of `'5' - 2`?"],
    options: [
      ["`3`", "`3`"],
      ["`'52'`", "`'52'`"],
      ["`'3'`", "`'3'`"],
      ["`NaN`", "`NaN`"],
    ],
    a: [
      "عملگر `-` فقط برای اعداد تعریف شده، پس رشته `'5'` به عدد تبدیل می‌شود. برخلاف `+` که با وجود رشته، الحاق انجام می‌دهد.",
      "The `-` operator only works on numbers, so `'5'` is converted to a number. Unlike `+`, it never concatenates.",
    ],
  },
  {
    id: "js-x-foreach-return",
    level: "junior",
    tags: ["arrays"],
    q: ["مقدار بازگشتی `[1, 2, 3].forEach(x => x * 2)` چیست؟", "What does `[1, 2, 3].forEach(x => x * 2)` return?"],
    options: [
      ["`undefined`", "`undefined`"],
      ["`[2, 4, 6]`", "`[2, 4, 6]`"],
      ["`[1, 2, 3]`", "`[1, 2, 3]`"],
      ["`6`", "`6`"],
    ],
    a: [
      "`forEach` همیشه `undefined` برمی‌گرداند و فقط برای اثرات جانبی است. برای ساخت آرایه جدید از `map` استفاده کنید.",
      "`forEach` always returns `undefined`; it's meant for side effects. Use `map` to build a new array.",
    ],
  },
  {
    id: "js-x-parseint-partial",
    level: "junior",
    tags: ["numbers"],
    q: ["خروجی `parseInt('42px')` چیست؟", "What does `parseInt('42px')` return?"],
    options: [
      ["`42`", "`42`"],
      ["`NaN`", "`NaN`"],
      ["`'42'`", "`'42'`"],
      ["`0`", "`0`"],
    ],
    a: [
      "`parseInt` از ابتدای رشته تا جایی که رقم معتبر ببیند می‌خواند و بقیه را نادیده می‌گیرد. در مقابل `Number('42px')` برابر `NaN` است.",
      "`parseInt` reads digits from the start and stops at the first invalid character. By contrast, `Number('42px')` is `NaN`.",
    ],
  },
  {
    id: "js-x-const-mutation",
    level: "junior",
    tags: ["variables"],
    q: [
      "بعد از اجرای `const user = { name: 'Ali' }; user.name = 'Sara';` چه اتفاقی می‌افتد؟",
      "What happens after `const user = { name: 'Ali' }; user.name = 'Sara';`?",
    ],
    options: [
      ["`user.name` برابر `'Sara'` می‌شود", "`user.name` becomes `'Sara'`"],
      ["خطای `TypeError` رخ می‌دهد", "A `TypeError` is thrown"],
      ["تغییر بی‌صدا نادیده گرفته می‌شود", "The change is silently ignored"],
      ["یک شیء جدید ساخته می‌شود", "A new object is created"],
    ],
    a: [
      "`const` فقط جلوی انتساب مجدد متغیر را می‌گیرد، نه تغییر محتوای شیء. برای جلوگیری از تغییر باید از `Object.freeze` استفاده کرد.",
      "`const` only prevents reassigning the binding, not mutating the object. Use `Object.freeze` to prevent mutation.",
    ],
  },
  {
    id: "js-x-nan-equality",
    level: "junior",
    tags: ["numbers", "equality"],
    q: ["حاصل `NaN === NaN` چیست؟", "What is the result of `NaN === NaN`?"],
    options: [
      ["`false`", "`false`"],
      ["`true`", "`true`"],
      ["`NaN`", "`NaN`"],
      ["`undefined`", "`undefined`"],
    ],
    a: [
      "`NaN` تنها مقداری است که با خودش برابر نیست. برای بررسی آن از `Number.isNaN` یا `Object.is(x, NaN)` استفاده کنید.",
      "`NaN` is the only value not equal to itself. Use `Number.isNaN` or `Object.is(x, NaN)` instead.",
    ],
  },
  {
    id: "js-x-array-length-truncate",
    level: "junior",
    tags: ["arrays"],
    q: [
      "بعد از `const arr = [1, 2, 3, 4]; arr.length = 2;` مقدار `arr` چیست؟",
      "After `const arr = [1, 2, 3, 4]; arr.length = 2;`, what is `arr`?",
    ],
    options: [
      ["`[1, 2]`", "`[1, 2]`"],
      ["`[1, 2, 3, 4]`", "`[1, 2, 3, 4]`"],
      ["`[3, 4]`", "`[3, 4]`"],
      ["خطای `TypeError`", "A `TypeError`"],
    ],
    a: [
      "مقداردهی کمتر به `length` آرایه را کوتاه می‌کند و عناصر اضافه حذف می‌شوند. `arr.length = 0` هم روشی رایج برای خالی کردن آرایه است.",
      "Setting a smaller `length` truncates the array. `arr.length = 0` is a common way to empty an array.",
    ],
  },
  {
    id: "js-x-slice-vs-splice",
    level: "junior",
    tags: ["arrays"],
    q: ["کدام گزینه درباره `slice` و `splice` درست است؟", "Which is true about `slice` and `splice`?"],
    options: [
      ["`slice` آرایه اصلی را تغییر نمی‌دهد ولی `splice` تغییر می‌دهد", "`slice` doesn't mutate the array, `splice` does"],
      ["هر دو آرایه اصلی را تغییر می‌دهند", "Both mutate the original array"],
      ["`splice` آرایه اصلی را تغییر نمی‌دهد ولی `slice` تغییر می‌دهد", "`splice` doesn't mutate, `slice` does"],
      ["فقط روی رشته‌ها کار می‌کنند", "They only work on strings"],
    ],
    a: [
      "`slice(start, end)` یک کپی از بخشی از آرایه برمی‌گرداند. `splice` عناصر را حذف یا اضافه می‌کند و آرایه اصلی را تغییر می‌دهد.",
      "`slice(start, end)` returns a copy of a portion. `splice` removes/inserts elements in place, mutating the array.",
    ],
  },
  {
    id: "js-x-typeof-function",
    level: "junior",
    tags: ["types", "functions"],
    q: ["خروجی `typeof function () {}` چیست؟", "What does `typeof function () {}` return?"],
    options: [
      ["`'function'`", "`'function'`"],
      ["`'object'`", "`'object'`"],
      ["`'undefined'`", "`'undefined'`"],
      ["`'callable'`", "`'callable'`"],
    ],
    a: [
      "توابع در واقع شیء هستند ولی `typeof` برای آن‌ها مقدار ویژه `'function'` را برمی‌گرداند. کلاس‌ها هم `'function'` هستند.",
      "Functions are objects, but `typeof` returns the special value `'function'` for them. Classes also report `'function'`.",
    ],
  },
  {
    id: "js-x-string-immutable",
    level: "junior",
    tags: ["strings"],
    q: [
      "بعد از `let s = 'cat'; s[0] = 'b';` مقدار `s` چیست؟",
      "After `let s = 'cat'; s[0] = 'b';`, what is `s`?",
    ],
    options: [
      ["`'cat'`", "`'cat'`"],
      ["`'bat'`", "`'bat'`"],
      ["`'b'`", "`'b'`"],
      ["`undefined`", "`undefined`"],
    ],
    a: [
      "رشته‌ها در JavaScript تغییرناپذیر (immutable) هستند و این انتساب در حالت عادی بی‌اثر است (در strict mode خطا می‌دهد). باید رشته جدید بسازید.",
      "Strings are immutable; the assignment is ignored (and throws in strict mode). You must create a new string.",
    ],
  },
  {
    id: "js-x-default-param-null",
    level: "junior",
    tags: ["functions"],
    q: [
      "با `function f(x = 10) { return x; }` خروجی `f(undefined)` و `f(null)` چیست؟",
      "Given `function f(x = 10) { return x; }`, what are `f(undefined)` and `f(null)`?",
    ],
    options: [
      ["`10` و `null`", "`10` and `null`"],
      ["`10` و `10`", "`10` and `10`"],
      ["`undefined` و `null`", "`undefined` and `null`"],
      ["`undefined` و `10`", "`undefined` and `10`"],
    ],
    a: [
      "مقدار پیش‌فرض فقط وقتی اعمال می‌شود که آرگومان `undefined` باشد یا ارسال نشود. `null` یک مقدار واقعی محسوب می‌شود.",
      "Defaults apply only when the argument is `undefined` or missing. `null` counts as an actual value.",
    ],
  },
  {
    id: "js-x-array-reference",
    level: "junior",
    tags: ["references"],
    q: [
      "خروجی `const a = [1]; const b = a; b.push(2); console.log(a.length);` چیست؟",
      "What does `const a = [1]; const b = a; b.push(2); console.log(a.length);` print?",
    ],
    options: [
      ["`2`", "`2`"],
      ["`1`", "`1`"],
      ["`0`", "`0`"],
      ["خطا می‌دهد", "It throws an error"],
    ],
    a: [
      "آرایه‌ها و اشیاء با reference نگه‌داری می‌شوند؛ `a` و `b` به یک آرایه اشاره می‌کنند. برای کپی از `[...a]` استفاده کنید.",
      "Arrays and objects are held by reference; `a` and `b` point to the same array. Use `[...a]` to copy.",
    ],
  },
  {
    id: "js-x-array-from-length",
    level: "junior",
    tags: ["arrays"],
    q: ["خروجی `Array.from({ length: 3 }, (_, i) => i * 2)` چیست؟", "What does `Array.from({ length: 3 }, (_, i) => i * 2)` return?"],
    options: [
      ["`[0, 2, 4]`", "`[0, 2, 4]`"],
      ["`[2, 4, 6]`", "`[2, 4, 6]`"],
      ["`[undefined, undefined, undefined]`", "`[undefined, undefined, undefined]`"],
      ["`[3]`", "`[3]`"],
    ],
    a: [
      "`Array.from` هر شیء array-like را به آرایه تبدیل می‌کند و تابع دوم روی هر عنصر با اندیس آن اجرا می‌شود. اندیس‌ها از `0` شروع می‌شوند.",
      "`Array.from` converts any array-like object, and the map function receives each element and its index starting at `0`.",
    ],
  },
  {
    id: "js-x-includes-nan",
    level: "junior",
    tags: ["arrays"],
    q: ["خروجی `[NaN].includes(NaN)` و `[NaN].indexOf(NaN)` چیست؟", "What are `[NaN].includes(NaN)` and `[NaN].indexOf(NaN)`?"],
    options: [
      ["`true` و `-1`", "`true` and `-1`"],
      ["`true` و `0`", "`true` and `0`"],
      ["`false` و `-1`", "`false` and `-1`"],
      ["`false` و `0`", "`false` and `0`"],
    ],
    a: [
      "`indexOf` از مقایسه `===` استفاده می‌کند که `NaN` را پیدا نمی‌کند. `includes` از الگوریتم SameValueZero استفاده می‌کند که `NaN` را برابر خودش می‌داند.",
      "`indexOf` uses `===`, which never matches `NaN`. `includes` uses SameValueZero, which treats `NaN` as equal to itself.",
    ],
  },
  {
    id: "js-x-json-undefined",
    level: "junior",
    tags: ["json"],
    q: ["خروجی `JSON.stringify({ a: undefined, b: 1 })` چیست؟", "What does `JSON.stringify({ a: undefined, b: 1 })` return?"],
    options: [
      ["`'{\"b\":1}'`", "`'{\"b\":1}'`"],
      ["`'{\"a\":undefined,\"b\":1}'`", "`'{\"a\":undefined,\"b\":1}'`"],
      ["`'{\"a\":null,\"b\":1}'`", "`'{\"a\":null,\"b\":1}'`"],
      ["خطای `TypeError`", "A `TypeError`"],
    ],
    a: [
      "در JSON مقدار `undefined` وجود ندارد، پس propertyهایی با مقدار `undefined` (و توابع) حذف می‌شوند. داخل آرایه‌ها به `null` تبدیل می‌شوند.",
      "JSON has no `undefined`, so properties with `undefined` (or function) values are omitted. Inside arrays they become `null`.",
    ],
  },
  {
    id: "js-x-settimeout-zero",
    level: "junior",
    tags: ["async"],
    q: [
      "خروجی `setTimeout(() => console.log('A'), 0); console.log('B');` چیست؟",
      "What does `setTimeout(() => console.log('A'), 0); console.log('B');` print?",
    ],
    options: [
      ["`B` سپس `A`", "`B` then `A`"],
      ["`A` سپس `B`", "`A` then `B`"],
      ["فقط `B`", "Only `B`"],
      ["ترتیب تصادفی است", "The order is random"],
    ],
    a: [
      "حتی با تأخیر `0`، callback در صف task قرار می‌گیرد و فقط بعد از اتمام کد همگام فعلی اجرا می‌شود.",
      "Even with a `0` delay, the callback is queued as a task and runs only after the current synchronous code finishes.",
    ],
  },
  {
    id: "js-x-queryselector-null",
    level: "junior",
    tags: ["dom"],
    q: ["اگر هیچ عنصری با selector مطابقت نداشته باشد، `document.querySelector` چه برمی‌گرداند؟", "What does `document.querySelector` return if nothing matches?"],
    options: [
      ["`null`", "`null`"],
      ["یک `NodeList` خالی", "An empty `NodeList`"],
      ["`undefined`", "`undefined`"],
      ["خطا پرتاب می‌کند", "It throws an error"],
    ],
    a: [
      "`querySelector` اولین عنصر مطابق یا `null` را برمی‌گرداند. `querySelectorAll` در این حالت یک `NodeList` خالی برمی‌گرداند.",
      "`querySelector` returns the first match or `null`. `querySelectorAll` returns an empty `NodeList` instead.",
    ],
  },
  {
    id: "js-x-addeventlistener-vs-onclick",
    level: "junior",
    tags: ["dom", "events"],
    q: ["مزیت اصلی `addEventListener` نسبت به `element.onclick = fn` چیست؟", "What is the main advantage of `addEventListener` over `element.onclick = fn`?"],
    options: [
      ["می‌توان چند handler برای یک رویداد ثبت کرد", "You can register multiple handlers for the same event"],
      ["سریع‌تر اجرا می‌شود", "It runs faster"],
      ["فقط با آن می‌توان رویداد click را گرفت", "It's the only way to catch click events"],
      ["handler را خودکار بعد از اجرا حذف می‌کند", "It removes the handler automatically after running"],
    ],
    a: [
      "انتساب به `onclick` handler قبلی را بازنویسی می‌کند، اما `addEventListener` چند handler را کنار هم نگه می‌دارد و گزینه‌هایی مثل `once` و `capture` هم دارد.",
      "Assigning `onclick` overwrites the previous handler, while `addEventListener` stacks handlers and supports options like `once` and `capture`.",
    ],
  },
  {
    id: "js-x-preventdefault-vs-stoppropagation",
    level: "junior",
    tags: ["dom", "events"],
    q: ["تفاوت `preventDefault` و `stopPropagation` چیست؟", "What is the difference between `preventDefault` and `stopPropagation`?"],
    options: [
      ["اولی رفتار پیش‌فرض مرورگر را لغو می‌کند، دومی انتشار رویداد را متوقف می‌کند", "The first cancels the browser's default action, the second stops event propagation"],
      ["هر دو دقیقاً یک کار را انجام می‌دهند", "They do exactly the same thing"],
      ["اولی انتشار را متوقف می‌کند، دومی رفتار پیش‌فرض را لغو می‌کند", "The first stops propagation, the second cancels the default action"],
      ["هر دو handler را از عنصر حذف می‌کنند", "Both remove the handler from the element"],
    ],
    a: [
      "`preventDefault` مثلاً جلوی ارسال فرم یا رفتن به لینک را می‌گیرد. `stopPropagation` جلوی رسیدن رویداد به والدها (bubbling) را می‌گیرد.",
      "`preventDefault` stops things like form submission or link navigation. `stopPropagation` prevents the event from bubbling to ancestors.",
    ],
  },
  {
    id: "js-x-localstorage-strings",
    level: "junior",
    tags: ["storage", "browser"],
    q: [
      "بعد از `localStorage.setItem('n', 5)` مقدار `typeof localStorage.getItem('n')` چیست؟",
      "After `localStorage.setItem('n', 5)`, what is `typeof localStorage.getItem('n')`?",
    ],
    options: [
      ["`'string'`", "`'string'`"],
      ["`'number'`", "`'number'`"],
      ["`'object'`", "`'object'`"],
      ["`'undefined'`", "`'undefined'`"],
    ],
    a: [
      "`localStorage` فقط رشته ذخیره می‌کند و مقادیر دیگر را به رشته تبدیل می‌کند. برای اشیاء از `JSON.stringify` و `JSON.parse` استفاده کنید.",
      "`localStorage` stores only strings and coerces other values. Use `JSON.stringify`/`JSON.parse` for objects.",
    ],
  },
  {
    id: "js-x-reduce-empty",
    level: "junior",
    tags: ["arrays"],
    q: ["اجرای `[].reduce((a, b) => a + b)` چه نتیجه‌ای دارد؟", "What happens when running `[].reduce((a, b) => a + b)`?"],
    options: [
      ["خطای `TypeError` پرتاب می‌شود", "It throws a `TypeError`"],
      ["`0` برمی‌گرداند", "It returns `0`"],
      ["`undefined` برمی‌گرداند", "It returns `undefined`"],
      ["`NaN` برمی‌گرداند", "It returns `NaN`"],
    ],
    a: [
      "`reduce` روی آرایه خالی بدون مقدار اولیه خطا می‌دهد. همیشه مقدار اولیه بدهید، مثل `[].reduce((a, b) => a + b, 0)`.",
      "`reduce` on an empty array with no initial value throws. Always pass one, e.g. `[].reduce((a, b) => a + b, 0)`.",
    ],
  },
  {
    id: "js-x-number-empty-string",
    level: "junior",
    tags: ["types", "coercion"],
    q: ["خروجی `Number('')` چیست؟", "What does `Number('')` return?"],
    options: [
      ["`0`", "`0`"],
      ["`NaN`", "`NaN`"],
      ["`undefined`", "`undefined`"],
      ["`''`", "`''`"],
    ],
    a: [
      "رشته خالی (یا فقط فاصله) هنگام تبدیل به عدد `0` می‌شود. این رفتار در اعتبارسنجی ورودی فرم‌ها می‌تواند باگ ایجاد کند.",
      "An empty (or whitespace-only) string converts to `0`, which can cause bugs in form input validation.",
    ],
  },
  {
    id: "js-x-math-max-empty",
    level: "junior",
    tags: ["numbers"],
    q: ["خروجی `Math.max()` بدون آرگومان چیست؟", "What does `Math.max()` return with no arguments?"],
    options: [
      ["`-Infinity`", "`-Infinity`"],
      ["`0`", "`0`"],
      ["`Infinity`", "`Infinity`"],
      ["`undefined`", "`undefined`"],
    ],
    a: [
      "`Math.max` از `-Infinity` شروع می‌کند تا هر عددی از آن بزرگ‌تر باشد. به همین دلیل `Math.min()` برابر `Infinity` است.",
      "`Math.max` starts from `-Infinity` so any number beats it. Likewise, `Math.min()` returns `Infinity`.",
    ],
  },
  {
    id: "js-x-rest-params",
    level: "junior",
    tags: ["functions"],
    q: ["در `function f(...args) {}` نوع `args` چیست؟", "In `function f(...args) {}`, what is `args`?"],
    options: [
      ["یک آرایه واقعی (`Array`)", "A real `Array`"],
      ["یک شیء array-like مثل `arguments`", "An array-like object like `arguments`"],
      ["یک `Set`", "A `Set`"],
      ["فقط اولین آرگومان", "Only the first argument"],
    ],
    a: [
      "rest parameter همه آرگومان‌های باقی‌مانده را در یک آرایه واقعی جمع می‌کند، پس `map` و `filter` مستقیم روی آن کار می‌کنند؛ برخلاف `arguments`.",
      "Rest parameters collect remaining arguments into a real array, so `map`/`filter` work directly, unlike `arguments`.",
    ],
  },
  {
    id: "js-x-for-in-vs-of",
    level: "junior",
    tags: ["loops"],
    q: [
      "خروجی `for (const x of ['a', 'b']) console.log(x)` در مقایسه با `for...in` چیست؟",
      "What does `for (const x of ['a', 'b']) console.log(x)` print, compared to `for...in`?",
    ],
    options: [
      ["`for...of` مقدارها (`a`, `b`) و `for...in` کلیدها (`0`, `1`) را می‌دهد", "`for...of` gives values (`a`, `b`); `for...in` gives keys (`0`, `1`)"],
      ["هر دو مقدارها را می‌دهند", "Both give values"],
      ["`for...of` کلیدها و `for...in` مقدارها را می‌دهد", "`for...of` gives keys; `for...in` gives values"],
      ["`for...of` روی آرایه کار نمی‌کند", "`for...of` doesn't work on arrays"],
    ],
    a: [
      "`for...of` روی iterableها مقدارها را پیمایش می‌کند. `for...in` کلیدهای enumerable (به‌صورت رشته) را می‌دهد و برای آرایه‌ها توصیه نمی‌شود.",
      "`for...of` iterates values of iterables. `for...in` yields enumerable keys as strings and isn't recommended for arrays.",
    ],
  },
  {
    id: "js-x-switch-strict",
    level: "junior",
    tags: ["control-flow"],
    q: [
      "خروجی `switch (1) { case '1': console.log('A'); break; default: console.log('B'); }` چیست؟",
      "What does `switch (1) { case '1': console.log('A'); break; default: console.log('B'); }` print?",
    ],
    options: [
      ["`B`", "`B`"],
      ["`A`", "`A`"],
      ["`A` و `B`", "`A` and `B`"],
      ["چیزی چاپ نمی‌شود", "Nothing"],
    ],
    a: [
      "`switch` برای مقایسه caseها از `===` استفاده می‌کند، پس عدد `1` با رشته `'1'` برابر نیست و `default` اجرا می‌شود.",
      "`switch` compares cases with `===`, so the number `1` doesn't match the string `'1'` and `default` runs.",
    ],
  },
  {
    id: "js-x-object-keys-strings",
    level: "junior",
    tags: ["objects"],
    q: [
      "خروجی `const o = {}; o[1] = 'a'; console.log(o['1']);` چیست؟",
      "What does `const o = {}; o[1] = 'a'; console.log(o['1']);` print?",
    ],
    options: [
      ["`'a'`", "`'a'`"],
      ["`undefined`", "`undefined`"],
      ["`null`", "`null`"],
      ["خطا می‌دهد", "It throws an error"],
    ],
    a: [
      "کلیدهای شیء معمولی (به جز Symbol) همیشه به رشته تبدیل می‌شوند، پس `o[1]` و `o['1']` یک property هستند. برای کلیدهای غیررشته‌ای از `Map` استفاده کنید.",
      "Plain object keys (except Symbols) are converted to strings, so `o[1]` and `o['1']` are the same. Use `Map` for non-string keys.",
    ],
  },
  {
    id: "js-x-default-sort",
    level: "junior",
    tags: ["arrays"],
    q: ["خروجی `[10, 1, 2].sort()` چیست؟", "What does `[10, 1, 2].sort()` return?"],
    options: [
      ["`[1, 10, 2]`", "`[1, 10, 2]`"],
      ["`[1, 2, 10]`", "`[1, 2, 10]`"],
      ["`[10, 2, 1]`", "`[10, 2, 1]`"],
      ["`[2, 1, 10]`", "`[2, 1, 10]`"],
    ],
    a: [
      "`sort` بدون تابع مقایسه، عناصر را به رشته تبدیل و به ترتیب الفبایی مرتب می‌کند. برای اعداد از `sort((a, b) => a - b)` استفاده کنید.",
      "Without a comparator, `sort` converts elements to strings and sorts lexicographically. Use `sort((a, b) => a - b)` for numbers.",
    ],
  },
  {
    id: "js-x-typeof-undeclared",
    level: "junior",
    tags: ["types"],
    q: ["اگر `foo` هرگز تعریف نشده باشد، `typeof foo` چه نتیجه‌ای دارد؟", "If `foo` was never declared, what does `typeof foo` do?"],
    options: [
      ["`'undefined'` برمی‌گرداند", "Returns `'undefined'`"],
      ["خطای `ReferenceError` می‌دهد", "Throws a `ReferenceError`"],
      ["`'null'` برمی‌گرداند", "Returns `'null'`"],
      ["`'object'` برمی‌گرداند", "Returns `'object'`"],
    ],
    a: [
      "`typeof` تنها عملگری است که روی متغیر تعریف‌نشده خطا نمی‌دهد. اما دسترسی مستقیم مثل `console.log(foo)` خطای `ReferenceError` می‌دهد.",
      "`typeof` is safe on undeclared identifiers, but reading `foo` directly (e.g. `console.log(foo)`) throws a `ReferenceError`.",
    ],
  },
  {
    id: "js-x-domcontentloaded-vs-load",
    level: "junior",
    tags: ["dom", "browser"],
    q: ["تفاوت رویداد `DOMContentLoaded` و `load` چیست؟", "What is the difference between `DOMContentLoaded` and `load`?"],
    options: [
      ["`DOMContentLoaded` بعد از parse شدن HTML و `load` بعد از بارگذاری همه منابع مثل تصاویر رخ می‌دهد", "`DOMContentLoaded` fires after HTML is parsed; `load` after all resources like images load"],
      ["هر دو دقیقاً هم‌زمان رخ می‌دهند", "They always fire at the same time"],
      ["`load` همیشه قبل از `DOMContentLoaded` رخ می‌دهد", "`load` always fires before `DOMContentLoaded`"],
      ["`DOMContentLoaded` فقط برای تصاویر است", "`DOMContentLoaded` is only for images"],
    ],
    a: [
      "`DOMContentLoaded` منتظر stylesheetها و تصاویر نمی‌ماند و برای کار با DOM کافی است. `load` روی `window` بعد از دریافت همه منابع صفحه رخ می‌دهد.",
      "`DOMContentLoaded` doesn't wait for images or stylesheets and is enough for DOM work. `window`'s `load` waits for all resources.",
    ],
  },
  {
    id: "js-x-script-defer",
    level: "junior",
    tags: ["browser", "performance"],
    q: ["ویژگی `defer` روی تگ `<script>` چه کاری انجام می‌دهد؟", "What does the `defer` attribute on `<script>` do?"],
    options: [
      ["اسکریپت موازی دانلود و بعد از parse کامل HTML به ترتیب اجرا می‌شود", "Downloads in parallel and runs in order after HTML parsing finishes"],
      ["اسکریپت فوراً اجرا و parse متوقف می‌شود", "Runs immediately and blocks parsing"],
      ["اسکریپت هرگز اجرا نمی‌شود مگر دستی صدا زده شود", "Never runs unless called manually"],
      ["اسکریپت بعد از رویداد `load` و با ترتیب تصادفی اجرا می‌شود", "Runs after `load` in random order"],
    ],
    a: [
      "اسکریپت‌های `defer` جلوی parse را نمی‌گیرند و به ترتیب قرارگیری، قبل از `DOMContentLoaded` اجرا می‌شوند. `async` به‌محض دانلود و بدون تضمین ترتیب اجرا می‌شود.",
      "`defer` scripts don't block parsing and run in document order before `DOMContentLoaded`. `async` runs as soon as downloaded, without order guarantees.",
    ],
  },
  {
    id: "js-x-textcontent-vs-innerhtml",
    level: "junior",
    tags: ["dom", "security"],
    q: ["برای نمایش متن ورودی کاربر در صفحه، چرا `textContent` بهتر از `innerHTML` است؟", "Why is `textContent` better than `innerHTML` for displaying user input?"],
    options: [
      ["متن را به‌صورت HTML تفسیر نمی‌کند و جلوی XSS را می‌گیرد", "It doesn't parse HTML, preventing XSS"],
      ["متن را خودکار ترجمه می‌کند", "It translates the text automatically"],
      ["از `innerHTML` کندتر ولی زیباتر است", "It's slower but prettier"],
      ["فقط در مرورگرهای قدیمی کار می‌کند", "It only works in old browsers"],
    ],
    a: [
      "`innerHTML` رشته را به‌عنوان HTML parse می‌کند و ورودی مخرب می‌تواند اسکریپت اجرا کند. `textContent` آن را دقیقاً به‌صورت متن ساده قرار می‌دهد.",
      "`innerHTML` parses the string as HTML, so malicious input can run scripts. `textContent` inserts it as plain text.",
    ],
  },
  {
    id: "js-x-finally-always",
    level: "junior",
    tags: ["errors"],
    q: [
      "خروجی `function f() { try { return 1; } finally { console.log('F'); } } f();` چیست؟",
      "What happens with `function f() { try { return 1; } finally { console.log('F'); } } f();`?",
    ],
    options: [
      ["`F` چاپ می‌شود و تابع `1` برمی‌گرداند", "`F` is logged and the function returns `1`"],
      ["چیزی چاپ نمی‌شود چون `return` قبل از `finally` است", "Nothing is logged because `return` comes first"],
      ["خطای نحوی رخ می‌دهد", "A syntax error occurs"],
      ["`F` چاپ می‌شود و تابع `undefined` برمی‌گرداند", "`F` is logged and it returns `undefined`"],
    ],
    a: [
      "بلوک `finally` حتی وقتی در `try` دستور `return` باشد، قبل از خروج از تابع اجرا می‌شود. برای پاک‌سازی منابع مناسب است.",
      "`finally` runs before the function exits, even when `try` returns. It's ideal for cleanup.",
    ],
  },
  {
    id: "js-x-and-short-circuit",
    level: "junior",
    tags: ["operators"],
    q: ["خروجی `0 && 'hello'` چیست؟", "What does `0 && 'hello'` evaluate to?"],
    options: [
      ["`0`", "`0`"],
      ["`'hello'`", "`'hello'`"],
      ["`false`", "`false`"],
      ["`true`", "`true`"],
    ],
    a: [
      "`&&` اولین مقدار falsy را برمی‌گرداند (یا آخرین مقدار اگر همه truthy باشند)، نه لزوماً boolean. چون `0` falsy است، همان برمی‌گردد.",
      "`&&` returns the first falsy operand (or the last one if all are truthy), not necessarily a boolean. `0` is falsy, so it's returned.",
    ],
  },
  {
    id: "js-x-object-equality-ref",
    level: "junior",
    tags: ["equality", "objects"],
    q: ["خروجی `{ a: 1 } === { a: 1 }` چیست؟", "What is `{ a: 1 } === { a: 1 }`?"],
    options: [
      ["`false`", "`false`"],
      ["`true`", "`true`"],
      ["خطای نحوی", "A syntax error"],
      ["`undefined`", "`undefined`"],
    ],
    a: [
      "اشیاء با reference مقایسه می‌شوند، نه محتوا. دو literal جداگانه دو شیء متفاوت در حافظه هستند، حتی اگر محتوایشان یکی باشد.",
      "Objects are compared by reference, not content. Two separate literals are distinct objects even with identical contents.",
    ],
  },
  {
    id: "js-x-string-methods-trim",
    level: "junior",
    tags: ["strings"],
    q: ["خروجی `'  hi  '.trim().length` چیست؟", "What is `'  hi  '.trim().length`?"],
    options: [
      ["`2`", "`2`"],
      ["`6`", "`6`"],
      ["`4`", "`4`"],
      ["`0`", "`0`"],
    ],
    a: [
      "`trim` فاصله‌های ابتدا و انتهای رشته را حذف می‌کند و رشته جدید `'hi'` با طول `2` برمی‌گرداند. رشته اصلی تغییر نمی‌کند.",
      "`trim` removes leading and trailing whitespace, returning the new string `'hi'` of length `2`. The original is unchanged.",
    ],
  },
  {
    id: "js-x-arrow-object-return",
    level: "junior",
    tags: ["functions"],
    q: ["خروجی `const f = () => { a: 1 }; f();` چیست؟", "What does `const f = () => { a: 1 }; f();` return?"],
    options: [
      ["`undefined`", "`undefined`"],
      ["`{ a: 1 }`", "`{ a: 1 }`"],
      ["`1`", "`1`"],
      ["خطای نحوی", "A syntax error"],
    ],
    a: [
      "آکولاد بعد از `=>` بدنه تابع تفسیر می‌شود و `a:` یک label است، پس چیزی برنمی‌گردد. برای بازگرداندن شیء آن را در پرانتز بگذارید: `() => ({ a: 1 })`.",
      "Braces after `=>` are parsed as a function body and `a:` as a label, so nothing is returned. Wrap it in parentheses: `() => ({ a: 1 })`.",
    ],
  },
]);
