import { build } from "../build";

export const nodejsMiddle = build("nodejs", [
  {
    id: "node-m-nested-tick-promise",
    level: "middle",
    tags: ["event-loop", "microtasks"],
    q: [
      "در CommonJS خروجی `Promise.resolve().then(() => { process.nextTick(() => console.log('tick')); Promise.resolve().then(() => console.log('p2')); console.log('p1'); });` چیست؟",
      "In CommonJS, what does `Promise.resolve().then(() => { process.nextTick(() => console.log('tick')); Promise.resolve().then(() => console.log('p2')); console.log('p1'); });` print?",
    ],
    options: [
      ["`p1 p2 tick`", "`p1 p2 tick`"],
      ["`p1 tick p2`", "`p1 tick p2`"],
      ["`tick p1 p2`", "`tick p1 p2`"],
      ["`p2 p1 tick`", "`p2 p1 tick`"],
    ],
    a: [
      "وقتی Node در حال خالی کردن صف microtask است، V8 تا خالی شدن کامل آن ادامه می‌دهد؛ پس `p2` قبل از اینکه Node دوباره به صف `nextTick` برگردد اجرا می‌شود.",
      "Once V8 is draining the microtask queue it runs it to completion, so `p2` runs before Node gets back to the `nextTick` queue.",
    ],
  },
  {
    id: "node-m-nexttick-starvation",
    level: "middle",
    tags: ["event-loop", "performance"],
    q: [
      "تابعی که به‌صورت بازگشتی خودش را با `process.nextTick` زمان‌بندی می‌کند چه مشکلی ایجاد می‌کند؟",
      "What problem does a function that recursively reschedules itself with `process.nextTick` cause?",
    ],
    options: [
      [
        "I/O و timerها گرسنه می‌مانند چون صف nextTick هیچ‌وقت خالی نمی‌شود",
        "I/O and timers starve, because the nextTick queue never empties",
      ],
      [
        "stack overflow فوری رخ می‌دهد چون nextTick همگام است",
        "An immediate stack overflow, since nextTick is synchronous",
      ],
      [
        "مشکلی ندارد چون nextTick بعد از هر فاز به I/O فرصت می‌دهد",
        "None; nextTick yields to I/O after every phase",
      ],
      [
        "Node خودکار بعد از ۱۰۰۰ تکرار آن را به setImmediate تبدیل می‌کند",
        "Node auto-converts it to setImmediate after 1000 iterations",
      ],
    ],
    a: [
      "صف nextTick قبل از ادامه event loop کاملاً خالی می‌شود، پس زمان‌بندی بازگشتی باعث می‌شود loop هرگز جلو نرود. برای کارهای تکراری از `setImmediate` استفاده کنید که در هر دور به I/O فرصت می‌دهد.",
      "The nextTick queue is fully drained before the loop continues, so recursive scheduling stops the loop from progressing. Use `setImmediate` for repeated work so I/O gets a turn each iteration.",
    ],
  },
  {
    id: "node-m-poll-phase",
    level: "middle",
    tags: ["event-loop", "libuv"],
    q: [
      "event loop در فاز poll وقتی صف خالی است چه می‌کند؟",
      "What does the event loop do in the poll phase when its queue is empty?",
    ],
    options: [
      [
        "اگر setImmediate منتظر باشد به check می‌رود، وگرنه تا نزدیک‌ترین timer منتظر I/O می‌ماند",
        "Moves to check if setImmediate is pending; otherwise waits for I/O up to the next timer",
      ],
      [
        "همیشه بلافاصله به فاز timers برمی‌گردد و busy-wait می‌کند",
        "Always jumps straight back to timers and busy-waits",
      ],
      [
        "process را خاتمه می‌دهد چون کاری باقی نمانده است",
        "Exits the process, since nothing is left to do",
      ],
      [
        "callbackهای close را اجرا و سپس برای همیشه متوقف می‌شود",
        "Runs close callbacks and then halts permanently",
      ],
    ],
    a: [
      "poll جایی است که Node برای رویدادهای I/O block می‌شود. مدت انتظار بر اساس نزدیک‌ترین timer و وجود `setImmediate` محاسبه می‌شود تا CPU هدر نرود.",
      "Poll is where Node blocks waiting for I/O events. The wait time is computed from the nearest timer and pending `setImmediate` calls, so no CPU is wasted.",
    ],
  },
  {
    id: "node-m-microtasks-between-timers",
    level: "middle",
    tags: ["event-loop", "microtasks"],
    q: [
      "در Node نسخه 11 به بعد، خروجی `setTimeout(() => { console.log('t1'); Promise.resolve().then(() => console.log('p')); }); setTimeout(() => console.log('t2'));` چیست؟",
      "In Node 11+, what does `setTimeout(() => { console.log('t1'); Promise.resolve().then(() => console.log('p')); }); setTimeout(() => console.log('t2'));` print?",
    ],
    options: [
      ["`t1 p t2`", "`t1 p t2`"],
      ["`t1 t2 p`", "`t1 t2 p`"],
      ["`p t1 t2`", "`p t1 t2`"],
      ["`t2 t1 p`", "`t2 t1 p`"],
    ],
    a: [
      "از Node 11، microtaskها بعد از هر callback مربوط به timer یا immediate خالی می‌شوند (مثل مرورگر). در نسخه‌های قدیمی‌تر خروجی `t1 t2 p` بود.",
      "Since Node 11, microtasks are drained after each individual timer or immediate callback, matching browsers. Older versions printed `t1 t2 p`.",
    ],
  },
  {
    id: "node-m-unhandled-rejection-default",
    level: "middle",
    tags: ["errors", "promises"],
    q: [
      "در Node 15 به بعد، یک Promise rejection بدون handler به‌طور پیش‌فرض چه می‌کند؟",
      "In Node 15+, what does an unhandled Promise rejection do by default?",
    ],
    options: [
      [
        "به‌صورت uncaught exception رفتار می‌کند و process با کد غیرصفر خارج می‌شود",
        "It's raised as an uncaught exception and the process exits non-zero",
      ],
      [
        "فقط یک warning چاپ می‌شود و process ادامه می‌دهد",
        "Only a warning is printed and the process continues",
      ],
      [
        "بی‌صدا نادیده گرفته می‌شود",
        "It's silently ignored",
      ],
      [
        "Promise به‌طور خودکار دوباره تلاش می‌شود",
        "The Promise is automatically retried",
      ],
    ],
    a: [
      "حالت پیش‌فرض `--unhandled-rejections=throw` است. قبل از Node 15 فقط warning چاپ می‌شد؛ حالا هر Promise باید `catch` یا `await` داخل `try` داشته باشد.",
      "The default mode is `--unhandled-rejections=throw`. Before Node 15 it only warned; now every Promise needs a `catch` or an awaited `try`.",
    ],
  },
  {
    id: "node-m-uncaught-exception-practice",
    level: "middle",
    tags: ["errors", "process"],
    q: [
      "رویکرد درست در handler `process.on('uncaughtException')` چیست؟",
      "What's the right approach inside a `process.on('uncaughtException')` handler?",
    ],
    options: [
      [
        "خطا را log کنید، منابع را در صورت امکان ببندید و process را خاتمه دهید",
        "Log the error, clean up if possible, then exit the process",
      ],
      [
        "خطا را log کنید و اجازه دهید سرور طبق معمول ادامه دهد",
        "Log the error and let the server keep running normally",
      ],
      [
        "درخواست‌هایی که خطا داده‌اند را خودکار دوباره اجرا کنید",
        "Automatically retry the requests that failed",
      ],
      [
        "خطا را نادیده بگیرید چون Node خودش state را بازیابی می‌کند",
        "Ignore it, since Node restores state on its own",
      ],
    ],
    a: [
      "بعد از uncaught exception، state برنامه نامعلوم است (ممکن است اتصال‌ها یا lockها نیمه‌کاره بمانند). باید process خارج شود و process manager مثل systemd یا Kubernetes آن را restart کند.",
      "After an uncaught exception the app state is unknown (connections or locks may be half-done). Exit and let a process manager like systemd or Kubernetes restart it.",
    ],
  },
  {
    id: "node-m-exports-field",
    level: "middle",
    tags: ["package-json", "modules"],
    q: [
      "وقتی پکیجی فیلد `exports` تعریف کند، `require('pkg/lib/internal.js')` چه می‌شود اگر در `exports` نباشد؟",
      "When a package defines `exports`, what happens to `require('pkg/lib/internal.js')` if that path isn't listed?",
    ],
    options: [
      [
        "خطای `ERR_PACKAGE_PATH_NOT_EXPORTED` می‌دهد",
        "It throws `ERR_PACKAGE_PATH_NOT_EXPORTED`",
      ],
      [
        "طبق معمول فایل را بارگذاری می‌کند چون فایل وجود دارد",
        "It loads the file normally, since it exists",
      ],
      [
        "به‌جای آن فایل `main` را برمی‌گرداند",
        "It returns the `main` file instead",
      ],
      [
        "فقط یک deprecation warning چاپ و فایل را بار می‌کند",
        "It prints a deprecation warning and loads it",
      ],
    ],
    a: [
      "`exports` API عمومی پکیج را محصور می‌کند و فقط مسیرهای فهرست‌شده قابل import هستند. این کار اجازه می‌دهد نویسنده پکیج ساختار داخلی را بدون breaking change تغییر دهد.",
      "`exports` encapsulates a package's public API; only listed subpaths can be imported. This lets authors change internals without breaking consumers.",
    ],
  },
  {
    id: "node-m-conditional-exports",
    level: "middle",
    tags: ["package-json", "esm"],
    q: [
      "شرط‌های `import` و `require` در فیلد `exports` برای چیست؟",
      "What are the `import` and `require` conditions in `exports` for?",
    ],
    options: [
      [
        "ارائه entry متفاوت برای مصرف‌کنندگان ESM و CommonJS",
        "Serving different entry points to ESM and CommonJS consumers",
      ],
      [
        "تعیین اینکه کدام وابستگی‌ها هنگام نصب دانلود شوند",
        "Choosing which dependencies get downloaded at install time",
      ],
      [
        "محدود کردن پکیج به نسخه‌های خاصی از Node",
        "Restricting the package to specific Node versions",
      ],
      [
        "مشخص کردن فایل‌های TypeScript برای type checking",
        "Pointing to TypeScript files for type checking",
      ],
    ],
    a: [
      "مثلاً `{\"import\": \"./index.mjs\", \"require\": \"./index.cjs\"}` باعث می‌شود Node بسته به نوع بارگذاری، فایل مناسب را resolve کند. شرط‌های دیگری مثل `node`، `default` و `types` هم وجود دارد.",
      "For example `{\"import\": \"./index.mjs\", \"require\": \"./index.cjs\"}` lets Node resolve the right file depending on how it's loaded. Other conditions include `node`, `default` and `types`.",
    ],
  },
  {
    id: "node-m-top-level-await",
    level: "middle",
    tags: ["esm", "async-await"],
    q: [
      "کدام قابلیت در ES Modules در دسترس است ولی در CommonJS نیست؟",
      "Which feature is available in ES Modules but not in CommonJS?",
    ],
    options: [
      [
        "`await` در سطح بالای ماژول (top-level await)",
        "Top-level `await` at module scope",
      ],
      [
        "استفاده از `async function`",
        "Using `async function`",
      ],
      [
        "import پویا با `import()`",
        "Dynamic import via `import()`",
      ],
      [
        "خواندن متغیرهای `process.env`",
        "Reading `process.env` variables",
      ],
    ],
    a: [
      "ESM می‌تواند در سطح ماژول `await` کند چون بارگذاری آن غیرهمگام است. `import()` پویا در CommonJS هم کار می‌کند و راه بارگذاری ماژول‌های ESM-only از CJS است.",
      "ESM can `await` at module scope because its loading is asynchronous. Dynamic `import()` also works in CommonJS and is a way to load ESM-only packages from CJS.",
    ],
  },
  {
    id: "node-m-circular-cjs",
    level: "middle",
    tags: ["modules", "commonjs"],
    q: [
      "اگر `a.js` ماژول `b.js` را `require` کند و `b.js` هم `a.js` را، `b.js` چه چیزی از `a` دریافت می‌کند؟",
      "If `a.js` requires `b.js` and `b.js` requires `a.js`, what does `b.js` receive from `a`?",
    ],
    options: [
      [
        "`module.exports` ناقص `a` تا همان لحظه",
        "A partially populated `module.exports` of `a`",
      ],
      [
        "خطای circular dependency و توقف process",
        "A circular dependency error that stops the process",
      ],
      [
        "یک نمونه کاملاً جدید از `a` که از اول اجرا می‌شود",
        "A brand-new instance of `a` executed from scratch",
      ],
      [
        "نسخه کامل `a`، چون Node ترتیب را خودکار مرتب می‌کند",
        "The complete `a`, because Node reorders loading automatically",
      ],
    ],
    a: [
      "Node یک ماژول را قبل از اجرای کامل در cache می‌گذارد، پس در وابستگی چرخه‌ای، ماژول دوم exportsهای نیمه‌کاره ماژول اول را می‌بیند و ممکن است `undefined` بگیرد.",
      "Node caches a module before it finishes executing, so in a cycle the second module sees the first one's incomplete exports and may get `undefined`.",
    ],
  },
  {
    id: "node-m-module-resolution",
    level: "middle",
    tags: ["modules", "resolution"],
    q: [
      "Node برای `require('lodash')` از فایل `/app/src/utils/x.js` کجا را جستجو می‌کند؟",
      "Where does Node look for `require('lodash')` from `/app/src/utils/x.js`?",
    ],
    options: [
      [
        "`node_modules` در پوشه فعلی و سپس هر پوشه والد تا ریشه",
        "`node_modules` in the current folder, then each parent up to the root",
      ],
      [
        "فقط `/app/node_modules` چون آنجا `package.json` است",
        "Only `/app/node_modules`, where `package.json` lives",
      ],
      [
        "فقط پوشه global npm",
        "Only the global npm folder",
      ],
      [
        "مستقیماً از رجیستری npm در زمان اجرا",
        "Directly from the npm registry at runtime",
      ],
    ],
    a: [
      "الگوریتم resolution به ترتیب `/app/src/utils/node_modules`، `/app/src/node_modules`، `/app/node_modules` و `/node_modules` را بررسی می‌کند. ماژول‌های core قبل از همه اولویت دارند.",
      "Resolution checks `/app/src/utils/node_modules`, `/app/src/node_modules`, `/app/node_modules` and `/node_modules` in order. Core modules take priority over all of them.",
    ],
  },
  {
    id: "node-m-delete-require-cache",
    level: "middle",
    tags: ["modules", "require"],
    q: [
      "`delete require.cache[require.resolve('./cfg')]` چه اثری دارد؟",
      "What does `delete require.cache[require.resolve('./cfg')]` do?",
    ],
    options: [
      [
        "`require` بعدی ماژول را دوباره از دیسک بار و اجرا می‌کند",
        "The next `require` reloads and re-executes the module from disk",
      ],
      [
        "ماژول را از حافظه و از همه ارجاع‌های موجود پاک می‌کند",
        "It removes the module from memory and from all existing references",
      ],
      [
        "فایل `cfg.js` را از دیسک حذف می‌کند",
        "It deletes `cfg.js` from disk",
      ],
      [
        "روی ESM هم دقیقاً همین اثر را دارد",
        "It has exactly the same effect on ESM imports",
      ],
    ],
    a: [
      "فقط ورودی cache حذف می‌شود؛ کدهایی که قبلاً ارجاع به exports قدیمی دارند همان را نگه می‌دارند. ESM cache جداگانه‌ای دارد که از این طریق قابل پاک کردن نیست.",
      "Only the cache entry is removed; code already holding the old exports keeps them. ESM has a separate cache that can't be cleared this way.",
    ],
  },
  {
    id: "node-m-peer-dependencies",
    level: "middle",
    tags: ["npm", "package-json"],
    q: [
      "یک پلاگین React چرا `react` را در `peerDependencies` قرار می‌دهد؟",
      "Why would a React plugin list `react` in `peerDependencies`?",
    ],
    options: [
      [
        "تا از همان نسخه React پروژه میزبان استفاده کند و نسخه تکراری نصب نشود",
        "So it uses the host project's React instead of installing a duplicate",
      ],
      [
        "تا React فقط در محیط توسعه نصب شود",
        "So React is only installed in development",
      ],
      [
        "تا React همیشه به آخرین نسخه به‌روزرسانی شود",
        "So React always upgrades to the latest version",
      ],
      [
        "چون `dependencies` اجازه پکیج‌های بزرگ را نمی‌دهد",
        "Because `dependencies` can't hold large packages",
      ],
    ],
    a: [
      "peer dependency یعنی «میزبان باید این را فراهم کند». دو نسخه از کتابخانه‌هایی مثل React باعث باگ‌های جدی می‌شود. npm 7 به بعد peerها را خودکار نصب و تعارض‌ها را گزارش می‌کند.",
      "A peer dependency means 'the host must provide this'. Two copies of libraries like React cause serious bugs. npm 7+ installs peers automatically and reports conflicts.",
    ],
  },
  {
    id: "node-m-backpressure-drain",
    level: "middle",
    tags: ["streams", "backpressure"],
    q: [
      "وقتی `writable.write(chunk)` مقدار `false` برمی‌گرداند، تولیدکننده چه باید بکند؟",
      "When `writable.write(chunk)` returns `false`, what should the producer do?",
    ],
    options: [
      [
        "نوشتن را متوقف کند و منتظر رویداد `'drain'` بماند",
        "Stop writing and wait for the `'drain'` event",
      ],
      [
        "همان chunk را فوراً دوباره بنویسد چون نوشته نشده است",
        "Rewrite the same chunk immediately, since it was dropped",
      ],
      [
        "stream را ببندد چون خطایی رخ داده است",
        "Close the stream, because an error occurred",
      ],
      [
        "به نوشتن ادامه دهد؛ مقدار برگشتی فقط اطلاعاتی است",
        "Keep writing; the return value is informational only",
      ],
    ],
    a: [
      "`false` یعنی بافر داخلی از `highWaterMark` گذشته است؛ chunk پذیرفته شده ولی ادامه نوشتن حافظه را پر می‌کند. این همان backpressure است و `pipe`/`pipeline` آن را خودکار مدیریت می‌کنند.",
      "`false` means the internal buffer exceeded `highWaterMark`; the chunk was accepted, but writing more just grows memory. That's backpressure, and `pipe`/`pipeline` handle it automatically.",
    ],
  },
  {
    id: "node-m-pipeline-vs-pipe",
    level: "middle",
    tags: ["streams", "errors"],
    q: [
      "چرا `stream.pipeline` بر `a.pipe(b).pipe(c)` ترجیح دارد؟",
      "Why is `stream.pipeline` preferred over `a.pipe(b).pipe(c)`?",
    ],
    options: [
      [
        "خطای هر مرحله را منتقل و همه streamها را در صورت خطا destroy می‌کند",
        "It forwards errors from any stage and destroys all streams on failure",
      ],
      [
        "داده را به‌صورت موازی روی چند هسته پردازش می‌کند",
        "It processes data in parallel across multiple cores",
      ],
      [
        "backpressure را غیرفعال می‌کند تا سرعت بیشتر شود",
        "It disables backpressure for better throughput",
      ],
      [
        "فقط سینتکس کوتاه‌تری است و رفتار یکسانی دارد",
        "It's just shorter syntax with identical behavior",
      ],
    ],
    a: [
      "`pipe` خطاها را منتقل نمی‌کند و در صورت خطا streamهای دیگر باز می‌مانند و نشت منبع رخ می‌دهد. `pipeline` (یا نسخه `stream/promises`) cleanup و گزارش خطا را یکجا انجام می‌دهد.",
      "`pipe` doesn't forward errors, so on failure other streams stay open and leak. `pipeline` (or its `stream/promises` version) handles cleanup and error reporting in one place.",
    ],
  },
  {
    id: "node-m-transform-stream",
    level: "middle",
    tags: ["streams"],
    q: [
      "برای تبدیل خط‌به‌خط یک فایل CSV به JSON در حین stream، کدام نوع stream مناسب است؟",
      "To convert a CSV file to JSON line by line while streaming, which stream type fits?",
    ],
    options: [
      [
        "Transform",
        "Transform",
      ],
      [
        "Readable",
        "Readable",
      ],
      [
        "Writable",
        "Writable",
      ],
      [
        "PassThrough",
        "PassThrough",
      ],
    ],
    a: [
      "Transform ورودی را دریافت و خروجی تغییریافته تولید می‌کند و متد `transform(chunk, enc, cb)` را پیاده‌سازی می‌کند. PassThrough نوعی Transform است که داده را بدون تغییر عبور می‌دهد.",
      "A Transform consumes input and produces modified output by implementing `transform(chunk, enc, cb)`. PassThrough is a Transform that forwards data unchanged.",
    ],
  },
  {
    id: "node-m-duplex-socket",
    level: "middle",
    tags: ["streams", "net"],
    q: [
      "چرا `net.Socket` یک Duplex است و نه Transform؟",
      "Why is `net.Socket` a Duplex rather than a Transform?",
    ],
    options: [
      [
        "چون داده خوانده‌شده و نوشته‌شده مستقل‌اند و یکی از دیگری محاسبه نمی‌شود",
        "Its read and write sides are independent; output isn't derived from input",
      ],
      [
        "چون socket فقط قابل خواندن است",
        "Because a socket is read-only",
      ],
      [
        "چون Transform نمی‌تواند داده باینری را پردازش کند",
        "Because Transform can't handle binary data",
      ],
      [
        "چون Duplex سریع‌تر است و Node همیشه آن را ترجیح می‌دهد",
        "Because Duplex is faster and Node always prefers it",
      ],
    ],
    a: [
      "در socket، آنچه می‌خوانید از طرف مقابل می‌آید و ربطی به آنچه می‌نویسید ندارد. در Transform خروجی تابعی از ورودی است، مثل `zlib.createGzip()`.",
      "With a socket, what you read comes from the peer and is unrelated to what you write. In a Transform, output is a function of input, like `zlib.createGzip()`.",
    ],
  },
  {
    id: "node-m-object-mode",
    level: "middle",
    tags: ["streams"],
    q: [
      "`objectMode: true` در یک stream چه چیزی را تغییر می‌دهد؟",
      "What does `objectMode: true` change on a stream?",
    ],
    options: [
      [
        "stream می‌تواند هر مقدار JS را منتقل کند و `highWaterMark` بر حسب تعداد شیء است",
        "It can carry any JS value and `highWaterMark` counts objects",
      ],
      [
        "داده‌ها خودکار با `JSON.stringify` سریال می‌شوند",
        "Data is automatically serialized with `JSON.stringify`",
      ],
      [
        "stream فقط اشیای `Buffer` را می‌پذیرد",
        "The stream only accepts `Buffer` objects",
      ],
      [
        "backpressure برای آن stream غیرفعال می‌شود",
        "Backpressure is disabled for that stream",
      ],
    ],
    a: [
      "در حالت عادی streamها فقط Buffer یا رشته منتقل می‌کنند و `highWaterMark` بر حسب بایت است (پیش‌فرض ۱۶ کیلوبایت). در objectMode پیش‌فرض ۱۶ شیء است.",
      "Normally streams carry Buffers or strings and `highWaterMark` is in bytes (16 KB default). In objectMode the default is 16 objects.",
    ],
  },
  {
    id: "node-m-for-await-readable",
    level: "middle",
    tags: ["streams", "async-await"],
    q: [
      "مزیت `for await (const chunk of readable)` برای مصرف یک Readable چیست؟",
      "What's the benefit of `for await (const chunk of readable)` for consuming a Readable?",
    ],
    options: [
      [
        "backpressure را رعایت می‌کند و خطاهای stream را به‌صورت throw در `try/catch` می‌دهد",
        "It respects backpressure and surfaces stream errors as throws in `try/catch`",
      ],
      [
        "همه chunkها را از قبل در حافظه بار می‌کند تا سریع‌تر شود",
        "It preloads every chunk into memory for speed",
      ],
      [
        "chunkها را به‌صورت موازی پردازش می‌کند",
        "It processes chunks in parallel",
      ],
      [
        "فقط روی streamهای objectMode کار می‌کند",
        "It only works on objectMode streams",
      ],
    ],
    a: [
      "Readableها async iterable هستند؛ تا وقتی بدنه حلقه تمام نشود chunk بعدی خوانده نمی‌شود. `break` زودهنگام هم stream را destroy می‌کند.",
      "Readables are async iterables; the next chunk isn't read until the loop body finishes. Breaking early also destroys the stream.",
    ],
  },
  {
    id: "node-m-high-water-mark",
    level: "middle",
    tags: ["streams", "backpressure"],
    q: [
      "`highWaterMark` در streamها دقیقاً چیست؟",
      "What exactly is `highWaterMark` on a stream?",
    ],
    options: [
      [
        "آستانه بافر داخلی که پس از آن backpressure اعمال می‌شود",
        "The internal buffer threshold at which backpressure kicks in",
      ],
      [
        "حداکثر مطلق داده‌ای که stream می‌تواند منتقل کند",
        "The absolute maximum data the stream can ever transfer",
      ],
      [
        "اندازه هر chunk که دقیقاً باید رعایت شود",
        "The exact size every chunk must have",
      ],
      [
        "حداکثر زمان انتظار برای رسیدن داده بر حسب میلی‌ثانیه",
        "The maximum wait for data in milliseconds",
      ],
    ],
    a: [
      "`highWaterMark` یک آستانه توصیه‌ای است نه سقف سخت؛ وقتی بافر از آن بگذرد `write` مقدار `false` برمی‌گرداند و Readable خواندن از منبع را متوقف می‌کند.",
      "`highWaterMark` is an advisory threshold, not a hard cap; past it `write` returns `false` and a Readable stops pulling from its source.",
    ],
  },
  {
    id: "node-m-express-error-middleware",
    level: "middle",
    tags: ["express", "errors", "middleware"],
    q: [
      "Express چگونه یک middleware را error handler تشخیص می‌دهد؟",
      "How does Express recognize a middleware as an error handler?",
    ],
    options: [
      [
        "تابع دقیقاً چهار پارامتر دارد: `(err, req, res, next)`",
        "The function declares exactly four parameters: `(err, req, res, next)`",
      ],
      [
        "با `app.error()` به‌جای `app.use()` ثبت می‌شود",
        "It's registered with `app.error()` instead of `app.use()`",
      ],
      [
        "نام تابع باید `errorHandler` باشد",
        "The function must be named `errorHandler`",
      ],
      [
        "باید قبل از همه routeها ثبت شود",
        "It must be registered before all routes",
      ],
    ],
    a: [
      "Express از `fn.length` استفاده می‌کند، پس حتی اگر `next` استفاده نشود باید در امضا باشد. error handler باید بعد از routeها ثبت شود و با `next(err)` فعال می‌شود.",
      "Express checks `fn.length`, so `next` must be declared even if unused. Error handlers go after routes and are triggered by `next(err)`.",
    ],
  },
  {
    id: "node-m-express4-async-errors",
    level: "middle",
    tags: ["express", "async-await", "errors"],
    q: [
      "در Express 4، اگر یک handler از نوع `async` خطا throw کند چه می‌شود؟",
      "In Express 4, what happens when an `async` route handler throws?",
    ],
    options: [
      [
        "Promise رد می‌شود و Express آن را نمی‌گیرد؛ باید `next(err)` را دستی صدا زد",
        "The Promise rejects unhandled; you must call `next(err)` yourself",
      ],
      [
        "Express خطا را خودکار به error middleware می‌فرستد",
        "Express automatically forwards it to the error middleware",
      ],
      [
        "Express پاسخ `500` می‌دهد و خطا را log می‌کند",
        "Express replies `500` and logs the error",
      ],
      [
        "درخواست با پاسخ خالی `200` تمام می‌شود",
        "The request ends with an empty `200` response",
      ],
    ],
    a: [
      "Express 4 مقدار برگشتی handler را نادیده می‌گیرد، پس rejection unhandled می‌شود و درخواست معلق می‌ماند. Express 5 Promiseهای رد‌شده را خودکار به `next(err)` می‌دهد.",
      "Express 4 ignores the handler's return value, so the rejection goes unhandled and the request hangs. Express 5 forwards rejected Promises to `next(err)` automatically.",
    ],
  },
  {
    id: "node-m-middleware-order",
    level: "middle",
    tags: ["express", "middleware"],
    q: [
      "اگر `app.use(authMiddleware)` بعد از تعریف `app.get('/admin', ...)` نوشته شود چه می‌شود؟",
      "What happens if `app.use(authMiddleware)` is placed after `app.get('/admin', ...)`?",
    ],
    options: [
      [
        "route `/admin` بدون احراز هویت پاسخ می‌دهد چون middleware بعد از آن اجرا می‌شود",
        "`/admin` responds without auth, because the middleware runs after it",
      ],
      [
        "Express خودکار middlewareها را قبل از routeها مرتب می‌کند",
        "Express automatically reorders middleware before routes",
      ],
      [
        "Express هنگام راه‌اندازی خطا می‌دهد",
        "Express throws at startup",
      ],
      [
        "middleware فقط برای درخواست‌های POST اجرا می‌شود",
        "The middleware only runs for POST requests",
      ],
    ],
    a: [
      "Express middlewareها و routeها را دقیقاً به ترتیب ثبت اجرا می‌کند. اگر route پاسخ دهد و `next()` را صدا نزند، middlewareهای بعدی هرگز اجرا نمی‌شوند.",
      "Express runs middleware and routes in exact registration order. If a route responds without calling `next()`, later middleware never runs.",
    ],
  },
  {
    id: "node-m-fastify-schema",
    level: "middle",
    tags: ["fastify", "performance"],
    q: [
      "تعریف JSON Schema برای پاسخ در Fastify چه مزیتی دارد؟",
      "What's the benefit of defining a response JSON Schema in Fastify?",
    ],
    options: [
      [
        "serialization سریع‌تر و جلوگیری از نشت فیلدهای ناخواسته",
        "Faster serialization and no leaking of unlisted fields",
      ],
      [
        "Fastify بدون آن اصلاً پاسخ JSON نمی‌فرستد",
        "Fastify can't send JSON without it",
      ],
      [
        "پاسخ را خودکار در Redis cache می‌کند",
        "It caches responses in Redis automatically",
      ],
      [
        "TypeScript را در زمان اجرا فعال می‌کند",
        "It enables TypeScript at runtime",
      ],
    ],
    a: [
      "Fastify از روی schema یک serializer اختصاصی (`fast-json-stringify`) می‌سازد که از `JSON.stringify` سریع‌تر است و فقط فیلدهای تعریف‌شده را خروجی می‌دهد، مثلاً `passwordHash` نشت نمی‌کند.",
      "Fastify compiles a dedicated serializer (`fast-json-stringify`) from the schema, which beats `JSON.stringify` and outputs only declared fields, so something like `passwordHash` won't leak.",
    ],
  },
  {
    id: "node-m-env-file",
    level: "middle",
    tags: ["config", "env"],
    q: [
      "در Node 20.6 به بعد، چطور بدون پکیج `dotenv` فایل `.env` را بار کنیم؟",
      "In Node 20.6+, how do you load a `.env` file without the `dotenv` package?",
    ],
    options: [
      [
        "`node --env-file=.env app.js`",
        "`node --env-file=.env app.js`",
      ],
      [
        "Node همیشه `.env` را خودکار از ریشه پروژه بار می‌کند",
        "Node always loads `.env` from the project root automatically",
      ],
      [
        "`node --config=.env app.js`",
        "`node --config=.env app.js`",
      ],
      [
        "`import '.env'` در ابتدای فایل",
        "`import '.env'` at the top of the file",
      ],
    ],
    a: [
      "فلگ `--env-file` متغیرها را قبل از اجرای کد در `process.env` قرار می‌دهد. Node هیچ فایل `.env` را خودکار بار نمی‌کند و secretهای production بهتر است از محیط یا secret manager بیایند.",
      "The `--env-file` flag populates `process.env` before your code runs. Node never loads `.env` automatically, and production secrets should come from the environment or a secret manager.",
    ],
  },
  {
    id: "node-m-config-validation",
    level: "middle",
    tags: ["config", "env"],
    q: [
      "بهترین زمان برای اعتبارسنجی متغیرهای محیطی مورد نیاز کی است؟",
      "When is the best time to validate required environment variables?",
    ],
    options: [
      [
        "هنگام startup، و توقف فوری process اگر چیزی نامعتبر باشد",
        "At startup, failing fast if anything is missing or invalid",
      ],
      [
        "اولین باری که هر متغیر در یک درخواست استفاده می‌شود",
        "The first time each variable is used inside a request",
      ],
      [
        "هرگز؛ مقدار پیش‌فرض خالی کافی است",
        "Never; falling back to empty strings is enough",
      ],
      [
        "در یک cron job شبانه که config را بررسی می‌کند",
        "In a nightly cron job that checks the config",
      ],
    ],
    a: [
      "fail-fast در startup (مثلاً با zod یا envalid) باعث می‌شود deployment خراب همان ابتدا شکست بخورد، نه ساعت‌ها بعد وسط یک درخواست کاربر.",
      "Failing fast at startup (e.g. with zod or envalid) makes a bad deployment fail immediately, not hours later in the middle of a user request.",
    ],
  },
  {
    id: "node-m-worker-threads-use",
    level: "middle",
    tags: ["worker-threads", "performance"],
    q: [
      "برای resize کردن تصاویر با یک کتابخانه JavaScript خالص در API، کدام راه‌حل مناسب‌تر است؟",
      "To resize images with a pure-JavaScript library inside an API, which approach fits best?",
    ],
    options: [
      [
        "اجرای کار روی `worker_threads` تا main thread آزاد بماند",
        "Run the work on `worker_threads` so the main thread stays free",
      ],
      [
        "پیچیدن کد در `async function` تا غیرهمگام شود",
        "Wrap the code in an `async function` to make it non-blocking",
      ],
      [
        "اجرای کار داخل `setImmediate`",
        "Run the work inside `setImmediate`",
      ],
      [
        "افزایش `UV_THREADPOOL_SIZE`",
        "Increase `UV_THREADPOOL_SIZE`",
      ],
    ],
    a: [
      "کار CPU‌محور JS در هر حال روی thread فعلی اجرا می‌شود؛ `async` یا `setImmediate` فقط زمان آن را جابه‌جا می‌کنند. thread pool در libuv فقط برای عملیات native است و کد JS را اجرا نمی‌کند.",
      "CPU-bound JS runs on whatever thread executes it; `async` or `setImmediate` only shift when it runs. The libuv thread pool serves native operations and never runs your JS.",
    ],
  },
  {
    id: "node-m-spawn-vs-exec",
    level: "middle",
    tags: ["child-process"],
    q: [
      "برای اجرای دستوری که چند گیگابایت خروجی تولید می‌کند، چرا `spawn` بهتر از `exec` است؟",
      "For a command producing gigabytes of output, why is `spawn` better than `exec`?",
    ],
    options: [
      [
        "`spawn` خروجی را stream می‌کند ولی `exec` آن را با سقف `maxBuffer` در حافظه جمع می‌کند",
        "`spawn` streams output, while `exec` buffers it in memory up to `maxBuffer`",
      ],
      [
        "`spawn` دستور را روی یک worker thread اجرا می‌کند",
        "`spawn` runs the command on a worker thread",
      ],
      [
        "`exec` فقط روی ویندوز کار می‌کند",
        "`exec` only works on Windows",
      ],
      [
        "`spawn` خروجی را خودکار فشرده می‌کند",
        "`spawn` compresses the output automatically",
      ],
    ],
    a: [
      "`exec` کل stdout را بافر و در callback برمی‌گرداند و اگر از `maxBuffer` بگذرد process فرزند kill می‌شود. `exec` همچنین از shell استفاده می‌کند و با ورودی کاربر در معرض command injection است.",
      "`exec` buffers all stdout and hands it to a callback, killing the child if it exceeds `maxBuffer`. It also runs through a shell, risking command injection with user input.",
    ],
  },
  {
    id: "node-m-cluster",
    level: "middle",
    tags: ["cluster", "scaling"],
    q: [
      "ماژول `cluster` چه مشکلی را حل می‌کند؟",
      "What problem does the `cluster` module solve?",
    ],
    options: [
      [
        "اجرای چند process هم‌پورت تا از همه هسته‌های CPU استفاده شود",
        "Running several processes on one port to use all CPU cores",
      ],
      [
        "اشتراک‌گذاری حافظه بین threadها با SharedArrayBuffer",
        "Sharing memory between threads with SharedArrayBuffer",
      ],
      [
        "اتصال چند سرور Node به یک دیتابیس مشترک",
        "Connecting multiple Node servers to one shared database",
      ],
      [
        "اجرای چند event loop داخل یک process واحد",
        "Running several event loops inside a single process",
      ],
    ],
    a: [
      "process اصلی چند worker با `fork` می‌سازد و اتصال‌ها را بین آن‌ها پخش می‌کند. هر worker حافظه جداگانه دارد، پس state مشترک باید در Redis یا دیتابیس باشد.",
      "The primary forks workers and distributes connections among them. Each worker has separate memory, so shared state must live in Redis or a database.",
    ],
  },
  {
    id: "node-m-threadpool-size",
    level: "middle",
    tags: ["libuv", "thread-pool"],
    q: [
      "اندازه پیش‌فرض thread pool در libuv (`UV_THREADPOOL_SIZE`) چند است؟",
      "What is the default size of libuv's thread pool (`UV_THREADPOOL_SIZE`)?",
    ],
    options: [
      ["`4`", "`4`"],
      ["برابر تعداد هسته‌های CPU", "Equal to the number of CPU cores"],
      ["`1`", "`1`"],
      ["`128`", "`128`"],
    ],
    a: [
      "به‌طور پیش‌فرض ۴ thread وجود دارد و با متغیر محیطی `UV_THREADPOOL_SIZE` (حداکثر ۱۰۲۴) قابل تغییر است. اگر ۵ عملیات سنگین `crypto.pbkdf2` هم‌زمان اجرا شود، پنجمی منتظر می‌ماند.",
      "There are 4 threads by default, adjustable via `UV_THREADPOOL_SIZE` (max 1024). Running 5 heavy `crypto.pbkdf2` calls at once means the fifth waits.",
    ],
  },
  {
    id: "node-m-threadpool-ops",
    level: "middle",
    tags: ["libuv", "thread-pool"],
    q: [
      "کدام عملیات از thread pool در libuv استفاده نمی‌کند؟",
      "Which operation does NOT use the libuv thread pool?",
    ],
    options: [
      [
        "خواندن و نوشتن روی socket شبکه TCP",
        "Reading and writing a TCP network socket",
      ],
      [
        "`fs.readFile`",
        "`fs.readFile`",
      ],
      [
        "`crypto.pbkdf2`",
        "`crypto.pbkdf2`",
      ],
      [
        "`zlib.gzip`",
        "`zlib.gzip`",
      ],
    ],
    a: [
      "I/O شبکه از مکانیزم‌های غیرهمگام سیستم‌عامل (epoll، kqueue، IOCP) استفاده می‌کند. فایل‌سیستم، `dns.lookup`، crypto و zlib روی thread pool اجرا می‌شوند.",
      "Network I/O uses the OS's async mechanisms (epoll, kqueue, IOCP). Filesystem ops, `dns.lookup`, crypto and zlib run on the thread pool.",
    ],
  },
  {
    id: "node-m-json-parse-block",
    level: "middle",
    tags: ["performance", "event-loop"],
    q: [
      "یک endpoint که `JSON.parse` را روی یک payload صد مگابایتی اجرا می‌کند چه اثری روی سرور دارد؟",
      "What does an endpoint running `JSON.parse` on a 100 MB payload do to the server?",
    ],
    options: [
      [
        "event loop را مسدود می‌کند و تأخیر همه درخواست‌ها بالا می‌رود",
        "It blocks the event loop and raises latency for every request",
      ],
      [
        "فقط همان درخواست کند می‌شود چون parse غیرهمگام است",
        "Only that request slows, since parsing is asynchronous",
      ],
      [
        "V8 خودکار parse را به thread pool منتقل می‌کند",
        "V8 automatically offloads parsing to the thread pool",
      ],
      [
        "اثری ندارد چون V8 کد JSON را JIT می‌کند",
        "No effect, because V8 JIT-compiles JSON",
      ],
    ],
    a: [
      "`JSON.parse` و `JSON.stringify` همگام‌اند. برای payloadهای بزرگ باید سقف اندازه بدنه گذاشت، از streaming parser استفاده کرد یا کار را به worker سپرد.",
      "`JSON.parse` and `JSON.stringify` are synchronous. For big payloads, cap the body size, use a streaming parser, or move work to a worker.",
    ],
  },
  {
    id: "node-m-graceful-shutdown",
    level: "middle",
    tags: ["shutdown", "signals"],
    q: [
      "در graceful shutdown پس از دریافت `SIGTERM`، اولین قدم معمول چیست؟",
      "In a graceful shutdown after `SIGTERM`, what's the usual first step?",
    ],
    options: [
      [
        "`server.close()` برای توقف پذیرش اتصال جدید و تمام کردن درخواست‌های جاری",
        "`server.close()` to stop new connections while in-flight requests finish",
      ],
      [
        "`process.exit(0)` فوری تا سریع‌تر خاتمه یابد",
        "An immediate `process.exit(0)` to stop quickly",
      ],
      [
        "بستن فوری اتصال دیتابیس قبل از هر کاری",
        "Closing the database connection before anything else",
      ],
      [
        "نادیده گرفتن سیگنال تا orchestrator دوباره تلاش کند",
        "Ignoring the signal so the orchestrator retries",
      ],
    ],
    a: [
      "ترتیب معمول: توقف پذیرش درخواست جدید، صبر برای تمام شدن درخواست‌های جاری (با timeout)، بستن دیتابیس و صف‌ها و سپس خروج. بستن زودهنگام دیتابیس درخواست‌های جاری را خراب می‌کند.",
      "Typical order: stop accepting new requests, wait for in-flight ones (with a timeout), close DB and queue connections, then exit. Closing the DB first breaks in-flight requests.",
    ],
  },
  {
    id: "node-m-sigkill",
    level: "middle",
    tags: ["signals", "process"],
    q: [
      "کدام سیگنال را نمی‌توان با `process.on(...)` گرفت؟",
      "Which signal cannot be caught with `process.on(...)`?",
    ],
    options: [
      ["`SIGKILL`", "`SIGKILL`"],
      ["`SIGTERM`", "`SIGTERM`"],
      ["`SIGINT`", "`SIGINT`"],
      ["`SIGHUP`", "`SIGHUP`"],
    ],
    a: [
      "`SIGKILL` (و `SIGSTOP`) توسط kernel اعمال می‌شوند و برنامه فرصت cleanup ندارد. Kubernetes پس از `terminationGracePeriodSeconds` همین سیگنال را می‌فرستد.",
      "`SIGKILL` (and `SIGSTOP`) are enforced by the kernel, giving no chance to clean up. Kubernetes sends it after `terminationGracePeriodSeconds`.",
    ],
  },
  {
    id: "node-m-abort-controller-fetch",
    level: "middle",
    tags: ["abort-controller", "async"],
    q: [
      "ساده‌ترین روش تعیین timeout پنج‌ثانیه‌ای برای `fetch` در Node چیست؟",
      "What's the simplest way to give `fetch` a 5-second timeout in Node?",
    ],
    options: [
      [
        "`fetch(url, { signal: AbortSignal.timeout(5000) })`",
        "`fetch(url, { signal: AbortSignal.timeout(5000) })`",
      ],
      [
        "`fetch(url, { timeout: 5000 })`",
        "`fetch(url, { timeout: 5000 })`",
      ],
      [
        "`setTimeout(() => fetch.cancel(), 5000)`",
        "`setTimeout(() => fetch.cancel(), 5000)`",
      ],
      [
        "`Promise.race` با یک timer، که درخواست را هم لغو می‌کند",
        "`Promise.race` with a timer, which also cancels the request",
      ],
    ],
    a: [
      "`AbortSignal.timeout` یک signal می‌سازد که پس از زمان مشخص abort می‌شود و fetch با `TimeoutError` رد می‌شود. `Promise.race` فقط انتظار را تمام می‌کند و درخواست زیرین را لغو نمی‌کند.",
      "`AbortSignal.timeout` creates a signal that aborts after the delay, rejecting fetch with a `TimeoutError`. `Promise.race` only stops waiting; it doesn't cancel the underlying request.",
    ],
  },
  {
    id: "node-m-abort-custom-api",
    level: "middle",
    tags: ["abort-controller"],
    q: [
      "برای قابل لغو کردن یک تابع async سفارشی، روش استاندارد چیست؟",
      "What's the standard way to make a custom async function cancellable?",
    ],
    options: [
      [
        "پذیرفتن `signal` و بررسی `signal.aborted` یا گوش دادن به رویداد `'abort'`",
        "Accept a `signal` and check `signal.aborted` or listen for `'abort'`",
      ],
      [
        "برگرداندن Promise و فراخوانی `promise.cancel()`",
        "Return a Promise and call `promise.cancel()`",
      ],
      [
        "throw کردن خطا از بیرون داخل تابع با `process.kill`",
        "Throw into the function from outside using `process.kill`",
      ],
      [
        "تنظیم یک متغیر global به نام `cancelled`",
        "Set a global variable named `cancelled`",
      ],
    ],
    a: [
      "`AbortSignal` قرارداد مشترک لغو در Node و وب است و APIهایی مثل `fs`، `fetch`، `setTimeout` در `timers/promises` و `events.once` آن را می‌پذیرند. Promiseها متد `cancel` ندارند.",
      "`AbortSignal` is the shared cancellation contract across Node and the web; `fs`, `fetch`, `timers/promises` and `events.once` all accept it. Promises have no `cancel` method.",
    ],
  },
  {
    id: "node-m-structured-logging",
    level: "middle",
    tags: ["logging", "production"],
    q: [
      "چرا در production از logger ساختاریافته مثل pino به‌جای `console.log` استفاده می‌شود؟",
      "Why use a structured logger like pino instead of `console.log` in production?",
    ],
    options: [
      [
        "خروجی JSON با سطح و context که قابل جستجو و کم‌هزینه است",
        "Leveled JSON output with context that's searchable and cheap",
      ],
      [
        "چون `console.log` در production غیرفعال است",
        "Because `console.log` is disabled in production",
      ],
      [
        "چون pino لاگ‌ها را خودکار رمزنگاری می‌کند",
        "Because pino encrypts logs automatically",
      ],
      [
        "چون `console.log` فقط رشته می‌پذیرد",
        "Because `console.log` only accepts strings",
      ],
    ],
    a: [
      "لاگ JSON با فیلدهایی مثل `level`، `reqId` و `msg` به‌راحتی در ELK یا Loki فیلتر می‌شود. pino سربار کمی دارد و سطوح لاگ را می‌توان بدون تغییر کد کنترل کرد.",
      "JSON logs with fields like `level`, `reqId` and `msg` are easy to filter in ELK or Loki. pino has low overhead and levels can be tuned without code changes.",
    ],
  },
  {
    id: "node-m-node-test",
    level: "middle",
    tags: ["testing"],
    q: [
      "کدام گزینه درباره test runner داخلی `node:test` درست است؟",
      "Which statement about the built-in `node:test` runner is true?",
    ],
    options: [
      [
        "با `node --test` اجرا می‌شود و mock، subtest و coverage را بدون وابستگی دارد",
        "It runs via `node --test` and offers mocks, subtests and coverage with no deps",
      ],
      [
        "فقط روی فایل‌های TypeScript کار می‌کند",
        "It only works on TypeScript files",
      ],
      [
        "باید با `npm install node-test` نصب شود",
        "It must be installed with `npm install node-test`",
      ],
      [
        "فقط assertion دارد و نمی‌تواند تست‌ها را اجرا کند",
        "It only provides assertions and can't run tests",
      ],
    ],
    a: [
      "`node:test` همراه با `node:assert` یک runner کامل و پایدار است: `describe`/`it`، `mock.fn`، `mock.timers` و گزارش coverage با `--experimental-test-coverage`.",
      "`node:test` with `node:assert` is a full, stable runner: `describe`/`it`, `mock.fn`, `mock.timers`, and coverage via `--experimental-test-coverage`.",
    ],
  },
  {
    id: "node-m-jest-mock",
    level: "middle",
    tags: ["testing", "jest"],
    q: [
      "برای تست یک سرویس بدون فراخوانی واقعی ماژول `./db` در Jest چه می‌کنیم؟",
      "In Jest, how do you test a service without really calling the `./db` module?",
    ],
    options: [
      [
        "`jest.mock('./db')` و تعریف مقدار برگشتی با `mockResolvedValue`",
        "`jest.mock('./db')` and set return values with `mockResolvedValue`",
      ],
      [
        "حذف موقت فایل `db.js` هنگام اجرای تست",
        "Temporarily delete `db.js` while tests run",
      ],
      [
        "تنظیم `NODE_ENV=test` که Jest با آن دیتابیس را خاموش می‌کند",
        "Set `NODE_ENV=test`, which makes Jest disable the database",
      ],
      [
        "پیچیدن فراخوانی‌ها در `try/catch` تا خطای اتصال نادیده گرفته شود",
        "Wrap calls in `try/catch` so connection errors are ignored",
      ],
    ],
    a: [
      "`jest.mock` ماژول را در registry ماژول‌ها با نسخه mock جایگزین می‌کند تا هر import آن نسخه جعلی را بگیرد و بتوان فراخوانی‌ها را با `toHaveBeenCalledWith` بررسی کرد.",
      "`jest.mock` swaps the module in the module registry so every import gets the fake, and calls can be verified with `toHaveBeenCalledWith`.",
    ],
  },
  {
    id: "node-m-concurrency-limit",
    level: "middle",
    tags: ["promises", "performance"],
    q: [
      "برای دانلود ۱۰ هزار URL، چرا `Promise.all(urls.map(fetch))` ایده خوبی نیست؟",
      "For downloading 10,000 URLs, why is `Promise.all(urls.map(fetch))` a bad idea?",
    ],
    options: [
      [
        "همه درخواست‌ها هم‌زمان شروع می‌شوند و socket، حافظه یا rate limit سرور تمام می‌شود",
        "All requests start at once, exhausting sockets, memory or the server's rate limit",
      ],
      [
        "`Promise.all` حداکثر ۱۰۰ Promise می‌پذیرد",
        "`Promise.all` accepts at most 100 Promises",
      ],
      [
        "درخواست‌ها پشت سر هم اجرا می‌شوند و خیلی کند است",
        "The requests run one after another, which is very slow",
      ],
      [
        "`fetch` داخل `map` همیشه همگام اجرا می‌شود",
        "`fetch` inside `map` always runs synchronously",
      ],
    ],
    a: [
      "`map` همه درخواست‌ها را بلافاصله شروع می‌کند. بهتر است هم‌زمانی را با ابزاری مثل `p-limit` یا پردازش دسته‌ای محدود کرد.",
      "`map` kicks off every request immediately. Limit concurrency with something like `p-limit` or batch processing instead.",
    ],
  },
  {
    id: "node-m-events-once",
    level: "middle",
    tags: ["events", "promises"],
    q: [
      "`await once(server, 'listening')` از ماژول `node:events` چه می‌کند؟",
      "What does `await once(server, 'listening')` from `node:events` do?",
    ],
    options: [
      [
        "منتظر اولین رویداد `'listening'` می‌ماند و اگر `'error'` زودتر بیاید reject می‌شود",
        "Waits for the first `'listening'` event, rejecting if `'error'` fires first",
      ],
      [
        "listener را برای همیشه ثبت و Promise را با هر رویداد resolve می‌کند",
        "Registers a permanent listener resolving on every event",
      ],
      [
        "رویداد `'listening'` را یک بار emit می‌کند",
        "Emits the `'listening'` event once",
      ],
      [
        "سرور را فقط برای یک اتصال باز می‌کند",
        "Opens the server for a single connection only",
      ],
    ],
    a: [
      "`events.once` رویداد را به Promise تبدیل می‌کند و رفتار ویژه‌ای برای `'error'` دارد. نتیجه آرایه‌ای از آرگومان‌های رویداد است.",
      "`events.once` turns an event into a Promise and treats `'error'` specially. It resolves to an array of the event's arguments.",
    ],
  },
  {
    id: "node-m-max-listeners-warning",
    level: "middle",
    tags: ["events", "memory-leak"],
    q: [
      "هشدار `MaxListenersExceededWarning` معمولاً نشانه چیست؟",
      "What does a `MaxListenersExceededWarning` usually indicate?",
    ],
    options: [
      [
        "احتمال memory leak؛ معمولاً listener در هر درخواست اضافه و هرگز حذف نمی‌شود",
        "A likely leak; often a listener added per request and never removed",
      ],
      [
        "تعداد اتصال‌های هم‌زمان سرور از حد مجاز گذشته است",
        "The server exceeded its concurrent connection limit",
      ],
      [
        "EventEmitter از رویدادهای غیرهمگام پشتیبانی نمی‌کند",
        "EventEmitter doesn't support async events",
      ],
      [
        "listenerها بیش از حد کند اجرا می‌شوند",
        "Listeners are executing too slowly",
      ],
    ],
    a: [
      "Node وقتی بیش از ۱۰ listener برای یک رویداد ثبت شود هشدار می‌دهد. راه درست حذف listener با `off` است؛ بالا بردن `setMaxListeners` فقط وقتی تعداد زیاد عمدی است.",
      "Node warns when more than 10 listeners are registered for one event. The real fix is removing listeners with `off`; raising `setMaxListeners` is only for intentional cases.",
    ],
  },
  {
    id: "node-m-buffer-alloc-unsafe",
    level: "middle",
    tags: ["buffer", "security"],
    q: [
      "تفاوت `Buffer.alloc(n)` و `Buffer.allocUnsafe(n)` چیست؟",
      "What's the difference between `Buffer.alloc(n)` and `Buffer.allocUnsafe(n)`?",
    ],
    options: [
      [
        "`allocUnsafe` حافظه را صفر نمی‌کند و ممکن است داده قدیمی حساس داشته باشد",
        "`allocUnsafe` skips zero-filling and may contain old, sensitive data",
      ],
      [
        "`allocUnsafe` حافظه را خارج از process و روی دیسک می‌سازد",
        "`allocUnsafe` allocates outside the process, on disk",
      ],
      [
        "`alloc` فقط برای رشته‌ها و `allocUnsafe` برای داده باینری است",
        "`alloc` is for strings and `allocUnsafe` for binary data",
      ],
      [
        "`allocUnsafe` در Node حذف شده و خطا می‌دهد",
        "`allocUnsafe` was removed from Node and throws",
      ],
    ],
    a: [
      "`allocUnsafe` سریع‌تر است چون مقداردهی اولیه ندارد؛ فقط وقتی امن است که بلافاصله کل Buffer را بازنویسی کنید. ارسال آن بدون پر کردن، داده‌های قبلی حافظه را نشت می‌دهد.",
      "`allocUnsafe` is faster because it skips initialization; it's only safe if you immediately overwrite the whole Buffer. Sending it unfilled leaks prior memory contents.",
    ],
  },
  {
    id: "node-m-keep-alive-agent",
    level: "middle",
    tags: ["http", "performance"],
    q: [
      "در سرویسی که مدام به یک API دیگر درخواست HTTP می‌زند، keep-alive چه مزیتی دارد؟",
      "For a service constantly calling another HTTP API, what does keep-alive give you?",
    ],
    options: [
      [
        "استفاده مجدد از اتصال‌های TCP/TLS و حذف هزینه handshake در هر درخواست",
        "Reusing TCP/TLS connections, avoiding a handshake per request",
      ],
      [
        "ارسال موازی همه درخواست‌ها روی یک پیام واحد",
        "Sending every request together in a single message",
      ],
      [
        "cache خودکار پاسخ‌ها در حافظه",
        "Automatic in-memory caching of responses",
      ],
      [
        "تضمین اینکه سرور مقصد هرگز timeout ندهد",
        "Guaranteeing the remote server never times out",
      ],
    ],
    a: [
      "بدون keep-alive هر درخواست اتصال و handshake جدید TLS می‌خواهد که تأخیر و مصرف پورت‌های موقت را بالا می‌برد. Node 19 به بعد و `fetch` (undici) به‌طور پیش‌فرض keep-alive دارند.",
      "Without keep-alive each request needs a new connection and TLS handshake, adding latency and burning ephemeral ports. Node 19+ agents and `fetch` (undici) keep alive by default.",
    ],
  },
  {
    id: "node-m-npm-audit",
    level: "middle",
    tags: ["security", "npm"],
    q: [
      "`npm audit` چه کاری انجام می‌دهد؟",
      "What does `npm audit` do?",
    ],
    options: [
      [
        "درخت وابستگی‌ها را با پایگاه آسیب‌پذیری‌های شناخته‌شده مقایسه می‌کند",
        "Checks the dependency tree against a database of known vulnerabilities",
      ],
      [
        "کد پروژه شما را برای باگ‌های امنیتی تحلیل ایستا می‌کند",
        "Statically analyzes your own code for security bugs",
      ],
      [
        "همه پکیج‌ها را به آخرین نسخه major ارتقا می‌دهد",
        "Upgrades every package to its latest major version",
      ],
      [
        "پکیج‌های استفاده‌نشده را از `package.json` حذف می‌کند",
        "Removes unused packages from `package.json`",
      ],
    ],
    a: [
      "`npm audit` فقط آسیب‌پذیری‌های گزارش‌شده (advisory) در وابستگی‌ها را پیدا می‌کند و `npm audit fix` نسخه‌های سازگار امن را نصب می‌کند. کد خودتان را بررسی نمی‌کند و پکیج مخرب جدید را هم لزوماً تشخیص نمی‌دهد.",
      "`npm audit` finds reported advisories in dependencies, and `npm audit fix` installs compatible patched versions. It doesn't review your code and won't necessarily catch brand-new malicious packages.",
    ],
  },
  {
    id: "node-m-exit-event-sync",
    level: "middle",
    tags: ["process", "shutdown"],
    q: [
      "چرا `process.on('exit', async () => { await db.close(); })` درست کار نمی‌کند؟",
      "Why doesn't `process.on('exit', async () => { await db.close(); })` work?",
    ],
    options: [
      [
        "در رویداد `'exit'` فقط کد همگام اجرا می‌شود و event loop دیگر کاری را اجرا نمی‌کند",
        "Only synchronous code runs in `'exit'`; the event loop won't run anything after",
      ],
      [
        "چون `'exit'` فقط روی ویندوز emit می‌شود",
        "Because `'exit'` is only emitted on Windows",
      ],
      [
        "چون handler رویداد `'exit'` نمی‌تواند تابع arrow باشد",
        "Because an `'exit'` handler can't be an arrow function",
      ],
      [
        "چون `'exit'` قبل از شروع برنامه emit می‌شود",
        "Because `'exit'` fires before the program starts",
      ],
    ],
    a: [
      "در زمان `'exit'` خروج قطعی است و کار غیرهمگام هرگز تمام نمی‌شود. cleanup غیرهمگام باید در handler سیگنال‌ها مثل `SIGTERM` یا در `'beforeExit'` انجام شود.",
      "By `'exit'`, exiting is certain and async work never completes. Do async cleanup in signal handlers like `SIGTERM` or in `'beforeExit'`.",
    ],
  },
  {
    id: "node-m-stream-finished",
    level: "middle",
    tags: ["streams", "errors"],
    q: [
      "`stream.finished(s, cb)` برای چیست؟",
      "What is `stream.finished(s, cb)` for?",
    ],
    options: [
      [
        "اطلاع از پایان، خطا یا بسته شدن زودهنگام یک stream با یک callback واحد",
        "Getting one callback when a stream ends, errors or closes prematurely",
      ],
      [
        "اجبار stream به اتمام فوری و دور ریختن بافر",
        "Forcing a stream to end immediately and discarding its buffer",
      ],
      [
        "بررسی همگام اینکه stream تمام شده است یا نه",
        "Synchronously checking whether a stream has finished",
      ],
      [
        "تبدیل Readable به Writable پس از اتمام خواندن",
        "Turning a Readable into a Writable after reading ends",
      ],
    ],
    a: [
      "گوش دادن جداگانه به `'end'`، `'finish'`، `'error'` و `'close'` مستعد خطاست. `finished` همه این حالت‌ها را پوشش می‌دهد و نسخه Promise آن در `stream/promises` موجود است.",
      "Listening to `'end'`, `'finish'`, `'error'` and `'close'` separately is error-prone. `finished` covers all of them, and a Promise version lives in `stream/promises`.",
    ],
  },
  {
    id: "node-m-close-callbacks-phase",
    level: "middle",
    tags: ["event-loop"],
    q: [
      "callback رویداد `socket.on('close', ...)` پس از `socket.destroy()` در کدام فاز event loop اجرا می‌شود؟",
      "In which event loop phase does a `socket.on('close', ...)` callback run after `socket.destroy()`?",
    ],
    options: [
      [
        "close callbacks",
        "close callbacks",
      ],
      [
        "timers",
        "timers",
      ],
      [
        "check",
        "check",
      ],
      [
        "pending callbacks",
        "pending callbacks",
      ],
    ],
    a: [
      "وقتی یک handle ناگهانی بسته شود، رویداد `'close'` آن در آخرین فاز هر دور یعنی close callbacks emit می‌شود. بسته شدن‌های عادی ممکن است از طریق `process.nextTick` گزارش شوند.",
      "When a handle is closed abruptly, its `'close'` event is emitted in the last phase of the iteration, close callbacks. Graceful closes may be reported via `process.nextTick` instead.",
    ],
  },
  {
    id: "node-m-als-request-id",
    level: "middle",
    tags: ["async-local-storage", "logging"],
    q: [
      "برای اینکه همه لاگ‌های یک درخواست بدون پاس دادن دستی، `requestId` داشته باشند از چه چیزی استفاده می‌کنیم؟",
      "To give every log line of a request its `requestId` without passing it manually, what do you use?",
    ],
    options: [
      [
        "`AsyncLocalStorage` که context را در طول زنجیره async حفظ می‌کند",
        "`AsyncLocalStorage`, which carries context across the async chain",
      ],
      [
        "یک متغیر global که در ابتدای هر درخواست مقداردهی می‌شود",
        "A global variable set at the start of every request",
      ],
      [
        "ذخیره `requestId` در `process.env` برای هر درخواست",
        "Storing `requestId` in `process.env` per request",
      ],
      [
        "یک `WeakMap` با کلید `Promise` فعلی",
        "A `WeakMap` keyed by the current `Promise`",
      ],
    ],
    a: [
      "`als.run(store, fn)` یک context می‌سازد که در همه callbackها و Promiseهای ایجادشده داخل `fn` با `als.getStore()` در دسترس است. متغیر global بین درخواست‌های هم‌زمان قاطی می‌شود.",
      "`als.run(store, fn)` creates a context available via `als.getStore()` in every callback and Promise spawned inside `fn`. A global variable gets mixed up between concurrent requests.",
    ],
  },
  {
    id: "node-m-npm-overrides",
    level: "middle",
    tags: ["npm", "security"],
    q: [
      "یک وابستگی غیرمستقیم آسیب‌پذیر است و پکیج والد هنوز آن را به‌روز نکرده؛ در npm چطور نسخه آن را اجبار کنیم؟",
      "A transitive dependency is vulnerable and its parent hasn't updated it; how do you force its version in npm?",
    ],
    options: [
      [
        "با فیلد `overrides` در `package.json`",
        "With the `overrides` field in `package.json`",
      ],
      [
        "با ویرایش دستی فایل‌های داخل `node_modules`",
        "By manually editing files inside `node_modules`",
      ],
      [
        "با افزودن آن به `peerDependencies`",
        "By adding it to `peerDependencies`",
      ],
      [
        "با فیلد `engines` در `package.json`",
        "With the `engines` field in `package.json`",
      ],
    ],
    a: [
      "`overrides` (npm 8.3 به بعد) نسخه یک پکیج را در کل درخت وابستگی جایگزین می‌کند؛ معادل آن در Yarn و pnpm فیلد `resolutions` است. تغییر دستی `node_modules` با نصب بعدی از بین می‌رود.",
      "`overrides` (npm 8.3+) replaces a package's version across the whole tree; Yarn and pnpm use `resolutions`. Manual `node_modules` edits vanish on the next install.",
    ],
  },
]);
