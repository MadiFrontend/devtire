import { build } from "../build";

export const nodejsJunior = build("nodejs", [
  {
    id: "node-j-what-is-node",
    level: "junior",
    tags: ["basics"],
    q: ["Node.js دقیقاً چیست؟", "What exactly is Node.js?"],
    options: [
      [
        "یک runtime برای اجرای JavaScript خارج از مرورگر، مبتنی بر V8 و libuv",
        "A runtime for running JavaScript outside the browser, built on V8 and libuv",
      ],
      [
        "یک framework وب برای JavaScript مثل Express یا Django",
        "A JavaScript web framework similar to Express or Django",
      ],
      [
        "یک زبان برنامه‌نویسی جدید که از JavaScript الهام گرفته است",
        "A new programming language inspired by JavaScript",
      ],
      [
        "یک compiler که JavaScript را به کد ماشین مستقل تبدیل می‌کند",
        "A compiler that turns JavaScript into a standalone native binary",
      ],
    ],
    a: [
      "Node.js یک runtime است: موتور V8 کد JavaScript را اجرا می‌کند و libuv امکانات I/O غیرهمگام، event loop و thread pool را فراهم می‌کند. Express و امثال آن روی Node ساخته می‌شوند.",
      "Node.js is a runtime: V8 executes JavaScript and libuv provides async I/O, the event loop and a thread pool. Frameworks like Express are built on top of it.",
    ],
  },
  {
    id: "node-j-v8-role",
    level: "junior",
    tags: ["v8", "internals"],
    q: ["نقش V8 در Node.js چیست؟", "What is V8's role in Node.js?"],
    options: [
      [
        "parse، کامپایل JIT و اجرای کد JavaScript و مدیریت heap و GC",
        "Parsing, JIT-compiling and executing JavaScript, plus heap and GC management",
      ],
      [
        "مدیریت event loop و عملیات غیرهمگام فایل و شبکه",
        "Managing the event loop and asynchronous file and network operations",
      ],
      [
        "نصب و resolve کردن packageها از رجیستری npm",
        "Installing and resolving packages from the npm registry",
      ],
      [
        "فراهم کردن ماژول‌های `fs`، `http` و `path` به‌صورت native",
        "Providing the `fs`, `http` and `path` modules natively",
      ],
    ],
    a: [
      "V8 موتور JavaScript گوگل است که کد را اجرا و حافظه را مدیریت می‌کند. event loop و I/O غیرهمگام کار libuv است و ماژول‌های core را خود Node فراهم می‌کند.",
      "V8 is Google's JavaScript engine that executes code and manages memory. The event loop and async I/O come from libuv, and core modules are provided by Node itself.",
    ],
  },
  {
    id: "node-j-libuv-role",
    level: "junior",
    tags: ["libuv", "internals"],
    q: ["libuv در Node.js چه کاری انجام می‌دهد؟", "What does libuv do in Node.js?"],
    options: [
      [
        "event loop، I/O غیرهمگام چندسکویی و thread pool را پیاده‌سازی می‌کند",
        "Implements the event loop, cross-platform async I/O and the thread pool",
      ],
      [
        "کد JavaScript را به bytecode تبدیل و بهینه‌سازی می‌کند",
        "Compiles JavaScript into bytecode and optimizes it",
      ],
      [
        "TypeScript را پیش از اجرا به JavaScript تبدیل می‌کند",
        "Transpiles TypeScript into JavaScript before execution",
      ],
      [
        "وابستگی‌های پروژه را در `node_modules` مدیریت می‌کند",
        "Manages the project's dependencies inside `node_modules`",
      ],
    ],
    a: [
      "libuv یک کتابخانه C است که event loop و abstraction روی epoll/kqueue/IOCP را فراهم می‌کند و برای کارهایی مثل `fs` و `crypto` از thread pool استفاده می‌کند.",
      "libuv is a C library that provides the event loop and an abstraction over epoll/kqueue/IOCP, and uses a thread pool for work like `fs` and `crypto`.",
    ],
  },
  {
    id: "node-j-single-thread",
    level: "junior",
    tags: ["event-loop", "basics"],
    q: [
      "منظور از «Node.js تک‌نخی است» چیست؟",
      "What does 'Node.js is single-threaded' actually mean?",
    ],
    options: [
      [
        "کد JavaScript روی یک thread اجرا می‌شود، اما libuv برای برخی I/Oها threadهای دیگری دارد",
        "Your JavaScript runs on one thread, but libuv uses extra threads for some I/O",
      ],
      [
        "کل process، از جمله I/O و GC، فقط و فقط یک thread سیستم‌عامل دارد",
        "The whole process, including I/O and GC, uses exactly one OS thread",
      ],
      [
        "Node فقط می‌تواند در هر لحظه به یک درخواست HTTP پاسخ دهد",
        "Node can only serve one HTTP request at any given moment",
      ],
      [
        "Node روی CPUهای چندهسته‌ای اجرا نمی‌شود و فقط یک هسته را می‌شناسد",
        "Node cannot run on multi-core CPUs and only detects one core",
      ],
    ],
    a: [
      "کد کاربر روی main thread و event loop اجرا می‌شود، ولی libuv یک thread pool دارد و V8 هم threadهای کمکی برای GC و کامپایل دارد. به همین دلیل Node هم‌زمان هزاران اتصال را مدیریت می‌کند.",
      "User code runs on the main thread via the event loop, but libuv has a thread pool and V8 has helper threads for GC and compilation. That is why Node can handle thousands of concurrent connections.",
    ],
  },
  {
    id: "node-j-event-loop-phases",
    level: "junior",
    tags: ["event-loop"],
    q: [
      "ترتیب درست فازهای اصلی event loop در Node کدام است؟",
      "What is the correct order of the main Node event loop phases?",
    ],
    options: [
      [
        "timers → pending callbacks → poll → check → close callbacks",
        "timers → pending callbacks → poll → check → close callbacks",
      ],
      [
        "poll → timers → check → close callbacks → pending callbacks",
        "poll → timers → check → close callbacks → pending callbacks",
      ],
      [
        "check → timers → poll → pending callbacks → close callbacks",
        "check → timers → poll → pending callbacks → close callbacks",
      ],
      [
        "timers → check → poll → close callbacks → pending callbacks",
        "timers → check → poll → close callbacks → pending callbacks",
      ],
    ],
    a: [
      "هر دور event loop با timers (`setTimeout`/`setInterval`) شروع می‌شود، سپس pending callbacks، بعد poll برای I/O، سپس check برای `setImmediate` و در نهایت close callbacks مثل `socket.on('close')`.",
      "Each loop iteration starts with timers (`setTimeout`/`setInterval`), then pending callbacks, then poll for I/O, then check for `setImmediate`, and finally close callbacks like `socket.on('close')`.",
    ],
  },
  {
    id: "node-j-tick-promise-timeout-order",
    level: "junior",
    tags: ["event-loop", "microtasks"],
    q: [
      "در یک فایل CommonJS، خروجی `setTimeout(() => console.log('t')); Promise.resolve().then(() => console.log('p')); process.nextTick(() => console.log('n')); console.log('s');` چیست؟",
      "In a CommonJS file, what does `setTimeout(() => console.log('t')); Promise.resolve().then(() => console.log('p')); process.nextTick(() => console.log('n')); console.log('s');` print?",
    ],
    options: [
      ["`s n p t`", "`s n p t`"],
      ["`s p n t`", "`s p n t`"],
      ["`n s p t`", "`n s p t`"],
      ["`s t n p`", "`s t n p`"],
    ],
    a: [
      "ابتدا کد همگام اجرا می‌شود (`s`)، سپس صف `process.nextTick`، بعد microtaskهای Promise و در نهایت timer در فاز timers.",
      "Synchronous code runs first (`s`), then the `process.nextTick` queue, then Promise microtasks, and finally the timer in the timers phase.",
    ],
  },
  {
    id: "node-j-timeout-vs-immediate-main",
    level: "junior",
    tags: ["event-loop", "timers"],
    q: [
      "اگر در main module بنویسیم `setTimeout(a, 0); setImmediate(b);` ترتیب اجرای `a` و `b` چیست؟",
      "If the main module runs `setTimeout(a, 0); setImmediate(b);`, in what order do `a` and `b` run?",
    ],
    options: [
      [
        "قطعی نیست؛ به سرعت ورود به event loop و دقت timer بستگی دارد",
        "Not deterministic; it depends on loop startup timing and timer precision",
      ],
      [
        "همیشه اول `a` اجرا می‌شود چون فاز timers قبل از check است",
        "Always `a` first, because the timers phase comes before check",
      ],
      [
        "همیشه اول `b` اجرا می‌شود چون `setImmediate` فوری است",
        "Always `b` first, because `setImmediate` is immediate",
      ],
      [
        "هر دو هم‌زمان روی threadهای جداگانه اجرا می‌شوند",
        "Both run simultaneously on separate threads",
      ],
    ],
    a: [
      "خارج از یک I/O callback، اگر تا ورود به فاز timers یک میلی‌ثانیه نگذشته باشد timer هنوز آماده نیست و `setImmediate` زودتر اجرا می‌شود؛ پس ترتیب تضمین‌شده نیست.",
      "Outside an I/O callback, if less than 1ms has passed when the loop reaches the timers phase, the timer isn't ready yet and `setImmediate` runs first, so the order isn't guaranteed.",
    ],
  },
  {
    id: "node-j-immediate-in-io",
    level: "junior",
    tags: ["event-loop", "timers"],
    q: [
      "داخل callback مربوط به `fs.readFile`، اگر `setTimeout(a, 0)` و `setImmediate(b)` را صدا بزنیم، کدام اول اجرا می‌شود؟",
      "Inside an `fs.readFile` callback, if we call `setTimeout(a, 0)` and `setImmediate(b)`, which runs first?",
    ],
    options: [
      [
        "همیشه `b`، چون بعد از poll فاز check می‌آید",
        "Always `b`, because the check phase follows poll",
      ],
      [
        "همیشه `a`، چون تأخیر صفر یعنی اجرای فوری",
        "Always `a`, because a zero delay means immediate",
      ],
      [
        "ترتیب تصادفی است و قابل پیش‌بینی نیست",
        "The order is random and unpredictable",
      ],
      [
        "`b` تا دور بعدی loop و بعد از `a` به تعویق می‌افتد",
        "`b` is deferred to the next loop iteration, after `a`",
      ],
    ],
    a: [
      "I/O callbackها در فاز poll اجرا می‌شوند و فاز بعدی check است، پس `setImmediate` قبل از timer دور بعد اجرا می‌شود.",
      "I/O callbacks run in the poll phase and the next phase is check, so `setImmediate` always fires before the timer in the next iteration.",
    ],
  },
  {
    id: "node-j-cjs-vs-esm-syntax",
    level: "junior",
    tags: ["modules", "esm"],
    q: [
      "تفاوت اصلی سینتکسی CommonJS و ES Modules در Node چیست؟",
      "What is the main syntax difference between CommonJS and ES Modules in Node?",
    ],
    options: [
      [
        "CommonJS از `require`/`module.exports` و ESM از `import`/`export` استفاده می‌کند",
        "CommonJS uses `require`/`module.exports`; ESM uses `import`/`export`",
      ],
      [
        "CommonJS از `import`/`export` و ESM از `require`/`exports` استفاده می‌کند",
        "CommonJS uses `import`/`export`; ESM uses `require`/`exports`",
      ],
      [
        "هر دو دقیقاً یکسان‌اند و فقط پسوند فایل فرق دارد",
        "They are identical and only the file extension differs",
      ],
      [
        "ESM فقط در مرورگر کار می‌کند و Node فقط CommonJS دارد",
        "ESM only works in browsers; Node supports only CommonJS",
      ],
    ],
    a: [
      "CommonJS سیستم ماژول تاریخی Node با `require()` همگام است؛ ESM استاندارد زبان با `import`/`export` است که Node آن را کامل پشتیبانی می‌کند.",
      "CommonJS is Node's historical module system with synchronous `require()`; ESM is the language standard with `import`/`export`, fully supported in Node.",
    ],
  },
  {
    id: "node-j-type-module",
    level: "junior",
    tags: ["package-json", "esm"],
    q: [
      "فیلد `\"type\": \"module\"` در `package.json` چه اثری دارد؟",
      "What does `\"type\": \"module\"` in `package.json` do?",
    ],
    options: [
      [
        "فایل‌های `.js` آن پکیج را به‌عنوان ES Module تفسیر می‌کند",
        "Makes `.js` files in that package be treated as ES Modules",
      ],
      [
        "پکیج را فقط برای استفاده در مرورگر علامت‌گذاری می‌کند",
        "Marks the package as usable only in browsers",
      ],
      [
        "باعث می‌شود npm پکیج را به‌صورت ماژول native کامپایل کند",
        "Makes npm compile the package as a native addon",
      ],
      [
        "فایل‌های `.mjs` را به CommonJS تبدیل می‌کند",
        "Converts `.mjs` files to CommonJS",
      ],
    ],
    a: [
      "با `\"type\": \"module\"` فایل‌های `.js` به‌صورت ESM بارگذاری می‌شوند؛ بدون آن (یا با `\"commonjs\"`) CommonJS هستند. پسوندهای `.mjs` و `.cjs` همیشه این تنظیم را override می‌کنند.",
      "With `\"type\": \"module\"`, `.js` files load as ESM; without it (or with `\"commonjs\"`) they are CommonJS. The `.mjs` and `.cjs` extensions always override this.",
    ],
  },
  {
    id: "node-j-mjs-cjs-ext",
    level: "junior",
    tags: ["modules"],
    q: [
      "در پکیجی با `\"type\": \"module\"`، چطور یک فایل را CommonJS نگه داریم؟",
      "In a package with `\"type\": \"module\"`, how do you keep one file as CommonJS?",
    ],
    options: [
      [
        "پسوند آن را `.cjs` بگذاریم",
        "Give it the `.cjs` extension",
      ],
      [
        "بالای فایل `'use commonjs'` بنویسیم",
        "Add `'use commonjs'` at the top of the file",
      ],
      [
        "پسوند آن را `.mjs` بگذاریم",
        "Give it the `.mjs` extension",
      ],
      [
        "امکان‌پذیر نیست؛ همه فایل‌ها باید ESM باشند",
        "It's impossible; every file must be ESM",
      ],
    ],
    a: [
      "Node فایل‌های `.cjs` را همیشه CommonJS و `.mjs` را همیشه ESM در نظر می‌گیرد، صرف‌نظر از فیلد `type`.",
      "Node always treats `.cjs` as CommonJS and `.mjs` as ESM, regardless of the `type` field.",
    ],
  },
  {
    id: "node-j-main-field",
    level: "junior",
    tags: ["package-json", "modules"],
    q: [
      "فیلد `main` در `package.json` برای چیست؟",
      "What is the `main` field in `package.json` for?",
    ],
    options: [
      [
        "نقطه ورود پکیج هنگام `require('pkg')` را مشخص می‌کند",
        "It sets the package entry point used by `require('pkg')`",
      ],
      [
        "اسکریپتی که با `npm start` اجرا می‌شود را تعیین می‌کند",
        "It defines the script run by `npm start`",
      ],
      [
        "شاخه اصلی git پروژه را مشخص می‌کند",
        "It specifies the project's main git branch",
      ],
      [
        "حداقل نسخه Node مورد نیاز را تعیین می‌کند",
        "It sets the minimum required Node version",
      ],
    ],
    a: [
      "`main` فایل ورودی پکیج است. اگر فیلد `exports` وجود داشته باشد، Node آن را بر `main` ترجیح می‌دهد. نسخه Node با `engines` و اسکریپت‌ها با `scripts` تعریف می‌شوند.",
      "`main` is the package entry file. If an `exports` field exists, Node prefers it over `main`. The Node version goes in `engines` and commands in `scripts`.",
    ],
  },
  {
    id: "node-j-require-cache",
    level: "junior",
    tags: ["modules", "require"],
    q: [
      "اگر یک ماژول CommonJS سه بار در فایل‌های مختلف `require` شود، کد آن چند بار اجرا می‌شود؟",
      "If a CommonJS module is `require`d three times from different files, how many times does its code run?",
    ],
    options: [
      [
        "یک بار؛ نتیجه در `require.cache` ذخیره و دوباره استفاده می‌شود",
        "Once; the result is cached in `require.cache` and reused",
      ],
      [
        "سه بار؛ هر `require` یک نمونه جدید می‌سازد",
        "Three times; each `require` creates a fresh instance",
      ],
      [
        "دو بار؛ بار اول برای parse و بار دوم برای اجرا",
        "Twice; once for parsing and once for execution",
      ],
      [
        "بستگی دارد که از `const` یا `let` برای نگهداری آن استفاده شود",
        "It depends on whether you store it in `const` or `let`",
      ],
    ],
    a: [
      "Node ماژول را بر اساس مسیر resolve‌شده cache می‌کند، پس `require`های بعدی همان شیء `module.exports` را برمی‌گردانند. به همین دلیل ماژول‌ها عملاً singleton هستند.",
      "Node caches modules by their resolved path, so later `require` calls return the same `module.exports` object. That's why modules effectively behave as singletons.",
    ],
  },
  {
    id: "node-j-dirname-esm",
    level: "junior",
    tags: ["esm", "modules"],
    q: [
      "در یک ES Module، `__dirname` چه وضعیتی دارد؟",
      "What happens with `__dirname` inside an ES Module?",
    ],
    options: [
      [
        "تعریف نشده است؛ باید از `import.meta.dirname` یا `import.meta.url` استفاده کرد",
        "It isn't defined; use `import.meta.dirname` or `import.meta.url` instead",
      ],
      [
        "مثل CommonJS به مسیر پوشه فایل فعلی اشاره می‌کند",
        "It points to the current file's folder, just like CommonJS",
      ],
      [
        "به مسیر پوشه‌ای که `node` از آن اجرا شده اشاره می‌کند",
        "It points to the directory from which `node` was launched",
      ],
      [
        "به ریشه پروژه یعنی محل `package.json` اشاره می‌کند",
        "It points to the project root where `package.json` lives",
      ],
    ],
    a: [
      "`__dirname`، `__filename` و `require` متغیرهای wrapper ماژول CommonJS هستند و در ESM وجود ندارند. نسخه‌های جدید Node `import.meta.dirname` و `import.meta.filename` را فراهم می‌کنند.",
      "`__dirname`, `__filename` and `require` come from the CommonJS module wrapper and don't exist in ESM. Recent Node versions provide `import.meta.dirname` and `import.meta.filename`.",
    ],
  },
  {
    id: "node-j-module-exports-vs-exports",
    level: "junior",
    tags: ["modules", "commonjs"],
    q: [
      "چرا `exports = { a: 1 }` در CommonJS چیزی export نمی‌کند؟",
      "Why does `exports = { a: 1 }` export nothing in CommonJS?",
    ],
    options: [
      [
        "چون فقط متغیر محلی `exports` را عوض می‌کند و `module.exports` دست‌نخورده می‌ماند",
        "It only reassigns the local `exports` variable; `module.exports` stays unchanged",
      ],
      [
        "چون `exports` فقط خواندنی است و خطای TypeError می‌دهد",
        "Because `exports` is read-only and throws a TypeError",
      ],
      [
        "چون در CommonJS فقط می‌توان تابع export کرد نه شیء",
        "Because CommonJS can only export functions, not objects",
      ],
      [
        "چون باید از `export default` استفاده کرد",
        "Because you must use `export default` instead",
      ],
    ],
    a: [
      "`exports` در ابتدا فقط یک ارجاع به `module.exports` است. اضافه کردن property مثل `exports.a = 1` کار می‌کند، اما reassign کردن آن ارتباط را قطع می‌کند؛ `require` همیشه `module.exports` را برمی‌گرداند.",
      "`exports` starts as a reference to `module.exports`. Adding properties like `exports.a = 1` works, but reassigning it breaks the link; `require` always returns `module.exports`.",
    ],
  },
  {
    id: "node-j-node-prefix",
    level: "junior",
    tags: ["modules"],
    q: [
      "مزیت نوشتن `import fs from 'node:fs'` به‌جای `'fs'` چیست؟",
      "What's the benefit of `import fs from 'node:fs'` over `'fs'`?",
    ],
    options: [
      [
        "صراحتاً ماژول core را بارگذاری می‌کند و با پکیجی هم‌نام در npm اشتباه نمی‌شود",
        "It explicitly loads the core module and can't be confused with an npm package",
      ],
      [
        "نسخه سریع‌تر و چندنخی `fs` را بارگذاری می‌کند",
        "It loads a faster, multi-threaded version of `fs`",
      ],
      [
        "ماژول را از رجیستری npm دانلود می‌کند",
        "It downloads the module from the npm registry",
      ],
      [
        "فقط در TypeScript معتبر است و در Node خطا می‌دهد",
        "It's only valid in TypeScript and errors in Node",
      ],
    ],
    a: [
      "پیشوند `node:` نشان می‌دهد ماژول built-in است و از جستجو در `node_modules` جلوگیری می‌کند. برخی ماژول‌های جدید مثل `node:test` فقط با این پیشوند در دسترس‌اند.",
      "The `node:` prefix marks the module as built-in and skips `node_modules` lookup. Some newer modules like `node:test` are only available with the prefix.",
    ],
  },
  {
    id: "node-j-npm-ci-vs-install",
    level: "junior",
    tags: ["npm", "lockfile"],
    q: [
      "تفاوت `npm ci` با `npm install` چیست؟",
      "How does `npm ci` differ from `npm install`?",
    ],
    options: [
      [
        "`npm ci` دقیقاً از lockfile نصب می‌کند، `node_modules` را پاک می‌کند و lockfile را تغییر نمی‌دهد",
        "`npm ci` installs exactly from the lockfile, wipes `node_modules`, and never edits the lockfile",
      ],
      [
        "`npm ci` جدیدترین نسخه‌ها را نصب و lockfile را به‌روزرسانی می‌کند",
        "`npm ci` installs the newest versions and updates the lockfile",
      ],
      [
        "`npm ci` فقط devDependencies را نصب می‌کند",
        "`npm ci` installs only devDependencies",
      ],
      [
        "`npm ci` نام قدیمی `npm install` است و رفتار یکسانی دارد",
        "`npm ci` is just an old alias of `npm install`",
      ],
    ],
    a: [
      "`npm ci` برای CI و buildهای تکرارپذیر است: اگر `package.json` و lockfile ناهماهنگ باشند خطا می‌دهد و همیشه نصب تمیز انجام می‌دهد.",
      "`npm ci` is for CI and reproducible builds: it fails if `package.json` and the lockfile disagree, and always performs a clean install.",
    ],
  },
  {
    id: "node-j-semver-caret",
    level: "junior",
    tags: ["npm", "semver"],
    q: [
      "محدوده `^1.4.2` در `package.json` کدام نسخه‌ها را می‌پذیرد؟",
      "Which versions does the range `^1.4.2` accept in `package.json`?",
    ],
    options: [
      [
        "`>=1.4.2` و `<2.0.0`",
        "`>=1.4.2` and `<2.0.0`",
      ],
      [
        "`>=1.4.2` و `<1.5.0`",
        "`>=1.4.2` and `<1.5.0`",
      ],
      [
        "فقط دقیقاً `1.4.2`",
        "Only exactly `1.4.2`",
      ],
      [
        "هر نسخه‌ای بزرگ‌تر یا مساوی `1.4.2`",
        "Any version greater than or equal to `1.4.2`",
      ],
    ],
    a: [
      "`^` تغییرات minor و patch را مجاز می‌داند ولی major را نه، چون طبق semver تغییر major یعنی breaking change. (برای نسخه‌های `0.x` رفتار محدودتر است.)",
      "`^` allows minor and patch updates but not major, since a major bump signals breaking changes under semver. (It's stricter for `0.x` versions.)",
    ],
  },
  {
    id: "node-j-semver-tilde",
    level: "junior",
    tags: ["npm", "semver"],
    q: [
      "محدوده `~1.4.2` کدام نسخه‌ها را می‌پذیرد؟",
      "Which versions does the range `~1.4.2` accept?",
    ],
    options: [
      [
        "`>=1.4.2` و `<1.5.0`",
        "`>=1.4.2` and `<1.5.0`",
      ],
      [
        "`>=1.4.2` و `<2.0.0`",
        "`>=1.4.2` and `<2.0.0`",
      ],
      [
        "`>=1.0.0` و `<2.0.0`",
        "`>=1.0.0` and `<2.0.0`",
      ],
      [
        "فقط `1.4.x` کوچک‌تر از `1.4.2`",
        "Only `1.4.x` versions below `1.4.2`",
      ],
    ],
    a: [
      "`~` فقط به‌روزرسانی patch را مجاز می‌کند. در semver عدد اول major، دوم minor و سوم patch است.",
      "`~` allows only patch updates. In semver the numbers are major.minor.patch.",
    ],
  },
  {
    id: "node-j-lockfile-purpose",
    level: "junior",
    tags: ["npm", "lockfile"],
    q: [
      "چرا باید `package-lock.json` را commit کنیم؟",
      "Why should `package-lock.json` be committed?",
    ],
    options: [
      [
        "تا نسخه دقیق کل درخت وابستگی‌ها برای همه محیط‌ها یکسان باشد",
        "So the exact versions of the whole dependency tree match in every environment",
      ],
      [
        "تا npm بتواند پکیج‌ها را بدون اینترنت دانلود کند",
        "So npm can download packages without an internet connection",
      ],
      [
        "چون بدون آن `npm start` اجرا نمی‌شود",
        "Because `npm start` won't run without it",
      ],
      [
        "تا اسکریپت‌های `package.json` در آن کپی شوند",
        "So the `package.json` scripts are duplicated there",
      ],
    ],
    a: [
      "lockfile نسخه دقیق، آدرس و hash یکپارچگی همه وابستگی‌ها (حتی وابستگی‌های غیرمستقیم) را ثبت می‌کند تا نصب‌ها تکرارپذیر و امن‌تر باشند.",
      "The lockfile records the exact version, source and integrity hash of every dependency, including transitive ones, making installs reproducible and safer.",
    ],
  },
  {
    id: "node-j-dev-dependencies",
    level: "junior",
    tags: ["npm", "package-json"],
    q: [
      "کدام پکیج معمولاً باید در `devDependencies` قرار بگیرد؟",
      "Which package typically belongs in `devDependencies`?",
    ],
    options: [
      [
        "ابزار تست مثل `jest` یا linter مثل `eslint`",
        "A test tool like `jest` or a linter like `eslint`",
      ],
      [
        "framework وب مثل `express` که سرور با آن اجرا می‌شود",
        "A web framework like `express` that the server runs on",
      ],
      [
        "درایور دیتابیس مثل `pg` که در production لازم است",
        "A database driver like `pg` needed in production",
      ],
      [
        "کتابخانه logging مثل `pino` که در runtime استفاده می‌شود",
        "A logging library like `pino` used at runtime",
      ],
    ],
    a: [
      "`devDependencies` فقط برای توسعه، تست و build لازم‌اند و با `npm install --omit=dev` در production نصب نمی‌شوند. هر چیزی که کد در runtime نیاز دارد باید در `dependencies` باشد.",
      "`devDependencies` are needed only for development, testing and builds, and are skipped with `npm install --omit=dev`. Anything required at runtime belongs in `dependencies`.",
    ],
  },
  {
    id: "node-j-error-first-callback",
    level: "junior",
    tags: ["callbacks", "errors"],
    q: [
      "الگوی error-first callback در Node چیست؟",
      "What is the error-first callback pattern in Node?",
    ],
    options: [
      [
        "اولین آرگومان callback خطا (یا `null`) و آرگومان‌های بعدی نتیجه‌اند",
        "The callback's first argument is an error (or `null`), followed by results",
      ],
      [
        "اول callback خطا و سپس جداگانه callback موفقیت پاس داده می‌شود",
        "You pass an error callback first, then a separate success callback",
      ],
      [
        "تابع ابتدا خطا throw می‌کند و سپس callback را صدا می‌زند",
        "The function throws first, then calls the callback",
      ],
      [
        "callback فقط در صورت خطا صدا زده می‌شود",
        "The callback is invoked only when an error occurs",
      ],
    ],
    a: [
      "در APIهای callback‌محور Node امضای `(err, result) => {}` استاندارد است؛ باید ابتدا `err` را بررسی کرد. خطاهای غیرهمگام را نمی‌توان با `try/catch` بیرونی گرفت.",
      "Node's callback APIs use the `(err, result) => {}` signature; always check `err` first. Async errors can't be caught by an outer `try/catch`.",
    ],
  },
  {
    id: "node-j-promisify",
    level: "junior",
    tags: ["promises", "callbacks"],
    q: [
      "`util.promisify` چه کاری انجام می‌دهد؟",
      "What does `util.promisify` do?",
    ],
    options: [
      [
        "تابعی با error-first callback را به تابعی تبدیل می‌کند که Promise برمی‌گرداند",
        "Turns an error-first callback function into one that returns a Promise",
      ],
      [
        "یک Promise را به تابع callback‌محور تبدیل می‌کند",
        "Converts a Promise into a callback-based function",
      ],
      [
        "تابع همگام را روی یک worker thread اجرا می‌کند",
        "Runs a synchronous function on a worker thread",
      ],
      [
        "همه Promiseهای در حال اجرا را لغو می‌کند",
        "Cancels all pending Promises",
      ],
    ],
    a: [
      "`promisify(fn)` یک wrapper می‌سازد که در صورت `err` reject و در غیر این صورت با نتیجه resolve می‌شود. عکس آن `util.callbackify` است.",
      "`promisify(fn)` creates a wrapper that rejects on `err` and resolves with the result otherwise. The reverse is `util.callbackify`.",
    ],
  },
  {
    id: "node-j-async-returns-promise",
    level: "junior",
    tags: ["async-await", "promises"],
    q: [
      "`async function f() { return 5; }` با صدا زدن `f()` چه چیزی برمی‌گرداند؟",
      "What does calling `f()` return for `async function f() { return 5; }`?",
    ],
    options: [
      [
        "یک Promise که با `5` resolve می‌شود",
        "A Promise that resolves to `5`",
      ],
      [
        "عدد `5` به‌صورت مستقیم",
        "The number `5` directly",
      ],
      [
        "`undefined` چون `await` ندارد",
        "`undefined`, since there's no `await`",
      ],
      [
        "یک generator که مقدار `5` را yield می‌کند",
        "A generator that yields `5`",
      ],
    ],
    a: [
      "تابع async همیشه Promise برمی‌گرداند؛ مقدار return به resolve و خطای throw‌شده به reject تبدیل می‌شود.",
      "An async function always returns a Promise; a returned value resolves it and a thrown error rejects it.",
    ],
  },
  {
    id: "node-j-await-try-catch",
    level: "junior",
    tags: ["async-await", "errors"],
    q: [
      "چطور خطای یک Promise را داخل تابع async مدیریت کنیم؟",
      "How do you handle a Promise rejection inside an async function?",
    ],
    options: [
      [
        "`await` را داخل `try/catch` قرار دهیم",
        "Wrap the `await` in a `try/catch`",
      ],
      [
        "Promise را بدون `await` داخل `try/catch` صدا بزنیم",
        "Call the Promise inside `try/catch` without `await`",
      ],
      [
        "از `process.on('error')` استفاده کنیم",
        "Use `process.on('error')`",
      ],
      [
        "خطاهای async به‌طور خودکار نادیده گرفته می‌شوند",
        "Async errors are ignored automatically",
      ],
    ],
    a: [
      "`await` در صورت reject شدن Promise خطا را throw می‌کند و `catch` آن را می‌گیرد. بدون `await`، تابع زودتر از reject شدن از `try` خارج می‌شود و خطا گرفته نمی‌شود.",
      "`await` throws when the Promise rejects, so `catch` handles it. Without `await`, execution leaves the `try` before the rejection happens and it isn't caught.",
    ],
  },
  {
    id: "node-j-promise-all-fail-fast",
    level: "junior",
    tags: ["promises"],
    q: [
      "اگر یکی از Promiseهای داخل `Promise.all` reject شود چه اتفاقی می‌افتد؟",
      "What happens if one Promise inside `Promise.all` rejects?",
    ],
    options: [
      [
        "`Promise.all` بلافاصله با همان خطا reject می‌شود، ولی بقیه کارها لغو نمی‌شوند",
        "`Promise.all` rejects right away with that error, but the others aren't cancelled",
      ],
      [
        "منتظر همه می‌ماند و آرایه‌ای از نتایج و خطاها برمی‌گرداند",
        "It waits for all and returns an array of results and errors",
      ],
      [
        "Promise ردشده نادیده گرفته می‌شود و بقیه نتایج برمی‌گردند",
        "The rejected one is skipped and the remaining results are returned",
      ],
      [
        "بقیه Promiseها خودکار لغو و منابع آن‌ها آزاد می‌شوند",
        "The other Promises are automatically cancelled and freed",
      ],
    ],
    a: [
      "`Promise.all` حالت fail-fast دارد. Promiseها قابل لغو نیستند، پس عملیات‌های دیگر ادامه پیدا می‌کنند؛ برای گرفتن همه نتایج از `Promise.allSettled` استفاده کنید.",
      "`Promise.all` is fail-fast. Promises aren't cancellable, so other operations keep running; use `Promise.allSettled` to collect every outcome.",
    ],
  },
  {
    id: "node-j-event-emitter-basic",
    level: "junior",
    tags: ["events"],
    q: [
      "خروجی `const e = new EventEmitter(); e.emit('x'); e.on('x', () => console.log('hi'));` چیست؟",
      "What does `const e = new EventEmitter(); e.emit('x'); e.on('x', () => console.log('hi'));` print?",
    ],
    options: [
      [
        "هیچ چیز؛ listener بعد از emit ثبت شده است",
        "Nothing; the listener was registered after the emit",
      ],
      [
        "`hi`، چون رویدادها تا ثبت listener بافر می‌شوند",
        "`hi`, because events are buffered until a listener exists",
      ],
      [
        "خطا، چون رویداد بدون listener emit شده است",
        "An error, because the event was emitted with no listener",
      ],
      [
        "`hi` در tick بعدی event loop",
        "`hi` on the next event loop tick",
      ],
    ],
    a: [
      "`emit` همگام است و فقط listenerهای ثبت‌شده در همان لحظه را صدا می‌زند؛ رویدادها بافر نمی‌شوند. تنها رویداد `'error'` بدون listener باعث throw می‌شود.",
      "`emit` is synchronous and only calls listeners registered at that moment; events aren't buffered. Only an `'error'` event with no listener throws.",
    ],
  },
  {
    id: "node-j-emitter-sync",
    level: "junior",
    tags: ["events"],
    q: [
      "listenerهای EventEmitter هنگام `emit` چگونه اجرا می‌شوند؟",
      "How are EventEmitter listeners run when you call `emit`?",
    ],
    options: [
      [
        "همگام و به ترتیب ثبت شدن",
        "Synchronously, in the order they were registered",
      ],
      [
        "غیرهمگام در فاز check event loop",
        "Asynchronously, in the event loop's check phase",
      ],
      [
        "به‌صورت موازی روی thread pool",
        "In parallel on the thread pool",
      ],
      [
        "به ترتیب معکوس ثبت شدن، به‌صورت microtask",
        "In reverse registration order, as microtasks",
      ],
    ],
    a: [
      "`emit` تمام listenerها را یکی‌یکی و همگام صدا می‌زند و سپس `true` یا `false` برمی‌گرداند. برای غیرهمگام کردن باید خودتان از `setImmediate` یا `queueMicrotask` استفاده کنید.",
      "`emit` calls every listener one by one synchronously, then returns `true` or `false`. To defer work you must use `setImmediate` or `queueMicrotask` yourself.",
    ],
  },
  {
    id: "node-j-emitter-error-event",
    level: "junior",
    tags: ["events", "errors"],
    q: [
      "اگر روی یک EventEmitter رویداد `'error'` emit شود و listenerی برای آن نباشد چه می‌شود؟",
      "What happens if an EventEmitter emits `'error'` with no `'error'` listener?",
    ],
    options: [
      [
        "خطا throw می‌شود و در صورت گرفته نشدن process کرش می‌کند",
        "The error is thrown and, if uncaught, crashes the process",
      ],
      [
        "خطا بی‌صدا نادیده گرفته می‌شود",
        "The error is silently ignored",
      ],
      [
        "فقط یک warning در console چاپ می‌شود",
        "Only a warning is printed to the console",
      ],
      [
        "رویداد تا ثبت listener در صف می‌ماند",
        "The event is queued until a listener is added",
      ],
    ],
    a: [
      "`'error'` رفتار ویژه دارد: بدون listener، Node آن را throw می‌کند. به همین دلیل روی streamها، socketها و سرورها همیشه باید handler برای `'error'` گذاشت.",
      "`'error'` is special: with no listener Node throws it. That's why streams, sockets and servers should always have an `'error'` handler.",
    ],
  },
  {
    id: "node-j-buffer-what",
    level: "junior",
    tags: ["buffer"],
    q: ["`Buffer` در Node برای چیست؟", "What is `Buffer` used for in Node?"],
    options: [
      [
        "نگهداری و پردازش داده باینری خام با اندازه ثابت",
        "Holding and manipulating fixed-size raw binary data",
      ],
      [
        "صف کردن درخواست‌های HTTP تا آزاد شدن سرور",
        "Queueing HTTP requests until the server is free",
      ],
      [
        "cache کردن خروجی `console.log` برای سرعت بیشتر",
        "Caching `console.log` output for speed",
      ],
      [
        "ذخیره رشته‌های JavaScript با encoding UTF-16",
        "Storing JavaScript strings in UTF-16 encoding",
      ],
    ],
    a: [
      "`Buffer` زیرکلاسی از `Uint8Array` است و برای بایت‌های خام مثل محتوای فایل، داده شبکه یا خروجی crypto استفاده می‌شود. اندازه آن پس از ساخت قابل تغییر نیست.",
      "`Buffer` is a `Uint8Array` subclass for raw bytes like file contents, network data or crypto output. Its size is fixed once created.",
    ],
  },
  {
    id: "node-j-buffer-length-utf8",
    level: "junior",
    tags: ["buffer", "encoding"],
    q: [
      "مقدار `Buffer.from('é').length` چند است؟",
      "What is `Buffer.from('é').length`?",
    ],
    options: [
      ["`2`", "`2`"],
      ["`1`", "`1`"],
      ["`4`", "`4`"],
      ["`undefined`", "`undefined`"],
    ],
    a: [
      "encoding پیش‌فرض UTF-8 است و `é` در UTF-8 دو بایت می‌گیرد. `length` در Buffer تعداد بایت است، نه تعداد کاراکتر.",
      "The default encoding is UTF-8, where `é` takes two bytes. A Buffer's `length` counts bytes, not characters.",
    ],
  },
  {
    id: "node-j-stream-types",
    level: "junior",
    tags: ["streams"],
    q: [
      "چهار نوع اصلی stream در Node کدام‌اند؟",
      "What are the four fundamental stream types in Node?",
    ],
    options: [
      [
        "Readable، Writable، Duplex و Transform",
        "Readable, Writable, Duplex and Transform",
      ],
      [
        "Input، Output، Buffer و Pipe",
        "Input, Output, Buffer and Pipe",
      ],
      [
        "File، Network، Memory و Process",
        "File, Network, Memory and Process",
      ],
      [
        "Sync، Async، Parallel و Serial",
        "Sync, Async, Parallel and Serial",
      ],
    ],
    a: [
      "Readable منبع داده است، Writable مقصد، Duplex هر دو را مستقل دارد (مثل socket) و Transform یک Duplex است که خروجی آن از ورودی محاسبه می‌شود (مثل gzip).",
      "Readable is a source, Writable a sink, Duplex is both independently (like a socket), and Transform is a Duplex whose output is computed from its input (like gzip).",
    ],
  },
  {
    id: "node-j-why-streams",
    level: "junior",
    tags: ["streams", "fs"],
    q: [
      "برای ارسال یک فایل ۴ گیگابایتی به کلاینت، چرا `fs.createReadStream` بهتر از `fs.readFile` است؟",
      "When sending a 4 GB file to a client, why is `fs.createReadStream` better than `fs.readFile`?",
    ],
    options: [
      [
        "داده را تکه‌تکه می‌خواند و کل فایل را در حافظه بار نمی‌کند",
        "It reads data in chunks instead of loading the whole file into memory",
      ],
      [
        "فایل را قبل از ارسال به‌طور خودکار فشرده می‌کند",
        "It automatically compresses the file before sending",
      ],
      [
        "از چند هسته CPU برای خواندن موازی استفاده می‌کند",
        "It uses multiple CPU cores to read in parallel",
      ],
      [
        "فایل را از cache سیستم‌عامل می‌خواند و دیسک را دور می‌زند",
        "It always bypasses the disk by using the OS cache",
      ],
    ],
    a: [
      "`readFile` کل فایل را در یک Buffer بار می‌کند که حافظه زیادی مصرف می‌کند (و از حد مجاز Buffer هم فراتر می‌رود). stream با chunkهای کوچک و backpressure، حافظه را ثابت نگه می‌دارد.",
      "`readFile` loads the whole file into one Buffer, using huge memory (and may exceed Buffer limits). A stream uses small chunks with backpressure, keeping memory flat.",
    ],
  },
  {
    id: "node-j-readfilesync-blocks",
    level: "junior",
    tags: ["fs", "event-loop"],
    q: [
      "استفاده از `fs.readFileSync` داخل handler یک درخواست HTTP چه مشکلی دارد؟",
      "What's wrong with calling `fs.readFileSync` inside an HTTP request handler?",
    ],
    options: [
      [
        "event loop را تا پایان خواندن مسدود می‌کند و همه درخواست‌های دیگر منتظر می‌مانند",
        "It blocks the event loop until done, so every other request waits",
      ],
      [
        "در handlerهای HTTP مجاز نیست و خطا می‌دهد",
        "It isn't allowed in HTTP handlers and throws",
      ],
      [
        "فایل را به‌جای UTF-8 همیشه به‌صورت base64 برمی‌گرداند",
        "It always returns base64 instead of UTF-8",
      ],
      [
        "فقط یک درخواست را کند می‌کند و روی بقیه اثری ندارد",
        "It slows only that request and doesn't affect others",
      ],
    ],
    a: [
      "متدهای `Sync` روی main thread اجرا می‌شوند و تا پایانشان هیچ callback دیگری اجرا نمی‌شود. برای startup قابل قبول‌اند، ولی در مسیر درخواست باید از `fs/promises` استفاده کرد.",
      "`Sync` methods run on the main thread, and no other callback runs until they finish. They're fine at startup, but request paths should use `fs/promises`.",
    ],
  },
  {
    id: "node-j-fs-promises",
    level: "junior",
    tags: ["fs", "async-await"],
    q: [
      "روش مدرن خواندن فایل به‌صورت غیرهمگام با `async/await` کدام است؟",
      "What's the modern way to read a file asynchronously with `async/await`?",
    ],
    options: [
      [
        "`const data = await readFile(p, 'utf8')` با import از `node:fs/promises`",
        "`const data = await readFile(p, 'utf8')` imported from `node:fs/promises`",
      ],
      [
        "`const data = await fs.readFileSync(p, 'utf8')`",
        "`const data = await fs.readFileSync(p, 'utf8')`",
      ],
      [
        "`const data = fs.readFile(p, 'utf8')` بدون callback",
        "`const data = fs.readFile(p, 'utf8')` with no callback",
      ],
      [
        "`const data = await require(p)`",
        "`const data = await require(p)`",
      ],
    ],
    a: [
      "`node:fs/promises` نسخه Promise‌محور APIهای `fs` است. `await` روی متد Sync آن را غیرهمگام نمی‌کند و `fs.readFile` بدون callback چیزی برنمی‌گرداند.",
      "`node:fs/promises` is the Promise-based `fs` API. Awaiting a Sync method doesn't make it async, and `fs.readFile` without a callback returns nothing useful.",
    ],
  },
  {
    id: "node-j-path-join-resolve",
    level: "junior",
    tags: ["path"],
    q: [
      "تفاوت `path.join` و `path.resolve` چیست؟",
      "What's the difference between `path.join` and `path.resolve`?",
    ],
    options: [
      [
        "`resolve` همیشه مسیر مطلق می‌سازد؛ `join` فقط بخش‌ها را به هم وصل و normalize می‌کند",
        "`resolve` always yields an absolute path; `join` just concatenates and normalizes",
      ],
      [
        "`join` همیشه مسیر مطلق می‌سازد؛ `resolve` فقط بخش‌ها را به هم وصل می‌کند",
        "`join` always yields an absolute path; `resolve` just concatenates segments",
      ],
      [
        "`resolve` وجود فایل را روی دیسک بررسی می‌کند ولی `join` نه",
        "`resolve` checks the file exists on disk, while `join` doesn't",
      ],
      [
        "هیچ تفاوتی ندارند و نام مستعار یکدیگرند",
        "There's no difference; they're aliases",
      ],
    ],
    a: [
      "`path.resolve` از راست به چپ پردازش می‌کند تا به مسیر مطلق برسد و در صورت نیاز `process.cwd()` را اضافه می‌کند. هیچ‌کدام فایل‌سیستم را بررسی نمی‌کنند.",
      "`path.resolve` processes right-to-left until it builds an absolute path, prepending `process.cwd()` if needed. Neither touches the filesystem.",
    ],
  },
  {
    id: "node-j-path-extname",
    level: "junior",
    tags: ["path"],
    q: [
      "خروجی `path.extname('archive.tar.gz')` چیست؟",
      "What does `path.extname('archive.tar.gz')` return?",
    ],
    options: [
      ["`'.gz'`", "`'.gz'`"],
      ["`'.tar.gz'`", "`'.tar.gz'`"],
      ["`'gz'`", "`'gz'`"],
      ["`'tar.gz'`", "`'tar.gz'`"],
    ],
    a: [
      "`extname` از آخرین نقطه تا انتهای نام فایل را همراه با خود نقطه برمی‌گرداند.",
      "`extname` returns everything from the last dot to the end of the filename, including the dot.",
    ],
  },
  {
    id: "node-j-http-create-server",
    level: "junior",
    tags: ["http"],
    q: [
      "در `http.createServer((req, res) => { res.write('hi'); })` چرا کلاینت منتظر می‌ماند؟",
      "In `http.createServer((req, res) => { res.write('hi'); })`, why does the client keep waiting?",
    ],
    options: [
      [
        "چون `res.end()` صدا زده نشده و پاسخ هیچ‌وقت تمام نمی‌شود",
        "Because `res.end()` is never called, so the response never finishes",
      ],
      [
        "چون باید قبل از `write` حتماً status code را با `res.status` تنظیم کرد",
        "Because you must set a status with `res.status` before `write`",
      ],
      [
        "چون `res.write` فقط داده باینری می‌پذیرد",
        "Because `res.write` only accepts binary data",
      ],
      [
        "چون سرور تا وقتی `listen` صدا زده نشود درخواست نمی‌پذیرد",
        "Because the server ignores requests until `listen` is called again",
      ],
    ],
    a: [
      "`res` یک Writable stream است؛ `write` داده می‌فرستد ولی پاسخ تنها با `res.end()` بسته می‌شود. `res.status` متد Express است نه ماژول `http`.",
      "`res` is a Writable stream; `write` sends data but only `res.end()` completes the response. `res.status` is an Express method, not part of `http`.",
    ],
  },
  {
    id: "node-j-process-env",
    level: "junior",
    tags: ["config", "env"],
    q: [
      "نوع مقدار `process.env.PORT` وقتی با `PORT=3000 node app.js` اجرا کنیم چیست؟",
      "What is the type of `process.env.PORT` when running `PORT=3000 node app.js`?",
    ],
    options: [
      [
        "رشته `'3000'`",
        "The string `'3000'`",
      ],
      [
        "عدد `3000`",
        "The number `3000`",
      ],
      [
        "Buffer حاوی بایت‌های `3000`",
        "A Buffer containing `3000`",
      ],
      [
        "`undefined` چون env فقط از فایل `.env` خوانده می‌شود",
        "`undefined`, since env is only read from `.env`",
      ],
    ],
    a: [
      "همه مقادیر `process.env` رشته‌اند (یا `undefined`)، پس باید آن‌ها را صریحاً تبدیل کرد، مثل `Number(process.env.PORT)`. فایل `.env` نیاز به `dotenv` یا `--env-file` دارد.",
      "All `process.env` values are strings (or `undefined`), so convert explicitly, e.g. `Number(process.env.PORT)`. A `.env` file needs `dotenv` or `--env-file`.",
    ],
  },
  {
    id: "node-j-process-argv",
    level: "junior",
    tags: ["process", "cli"],
    q: [
      "با اجرای `node app.js --verbose`، مقدار `process.argv[2]` چیست؟",
      "Running `node app.js --verbose`, what is `process.argv[2]`?",
    ],
    options: [
      ["`'--verbose'`", "`'--verbose'`"],
      ["مسیر کامل `app.js`", "The full path to `app.js`"],
      ["مسیر فایل اجرایی `node`", "The path to the `node` executable"],
      ["`true`", "`true`"],
    ],
    a: [
      "`argv[0]` مسیر node، `argv[1]` مسیر اسکریپت و از `argv[2]` به بعد آرگومان‌های کاربرند. برای parse کردن می‌توان از `util.parseArgs` استفاده کرد.",
      "`argv[0]` is the node path, `argv[1]` the script path, and user arguments start at `argv[2]`. `util.parseArgs` can parse them.",
    ],
  },
  {
    id: "node-j-exit-code",
    level: "junior",
    tags: ["process"],
    q: [
      "exit code غیرصفر در یک process Node به چه معناست؟",
      "What does a non-zero exit code from a Node process mean?",
    ],
    options: [
      [
        "process با خطا یا شکست به پایان رسیده است",
        "The process ended with an error or failure",
      ],
      [
        "process موفق بوده و خروجی تولید کرده است",
        "The process succeeded and produced output",
      ],
      [
        "process هنوز در پس‌زمینه در حال اجراست",
        "The process is still running in the background",
      ],
      [
        "تعداد خطوطی که در stdout نوشته شده است",
        "The number of lines written to stdout",
      ],
    ],
    a: [
      "طبق قرارداد، `0` یعنی موفقیت و هر عدد دیگر یعنی شکست؛ CI و ابزارهای shell به آن تکیه می‌کنند. بهتر است `process.exitCode = 1` را تنظیم کنید تا process به‌طور طبیعی خارج شود.",
      "By convention `0` means success and anything else means failure; CI and shells rely on it. Prefer setting `process.exitCode = 1` so the process exits naturally.",
    ],
  },
  {
    id: "node-j-globalthis",
    level: "junior",
    tags: ["basics"],
    q: [
      "معادل شیء `window` مرورگر در Node کدام است؟",
      "What is Node's equivalent of the browser's `window` object?",
    ],
    options: [
      [
        "`global` (و به‌صورت استاندارد `globalThis`)",
        "`global` (and the standard `globalThis`)",
      ],
      [
        "`process`",
        "`process`",
      ],
      [
        "`module`",
        "`module`",
      ],
      [
        "`document`",
        "`document`",
      ],
    ],
    a: [
      "در Node شیء سراسری `global` است و `globalThis` در هر محیطی به آن اشاره می‌کند. `process` اطلاعات process فعلی را دارد و `document` اصلاً وجود ندارد.",
      "In Node the global object is `global`, and `globalThis` refers to it in any environment. `process` describes the current process, and `document` doesn't exist.",
    ],
  },
  {
    id: "node-j-watch-mode",
    level: "junior",
    tags: ["tooling"],
    q: [
      "کدام گزینه بدون نصب پکیج اضافه، با تغییر فایل‌ها برنامه را دوباره اجرا می‌کند؟",
      "Which option restarts your app on file changes without installing anything extra?",
    ],
    options: [
      [
        "`node --watch app.js`",
        "`node --watch app.js`",
      ],
      [
        "`node --reload app.js`",
        "`node --reload app.js`",
      ],
      [
        "`npm watch app.js`",
        "`npm watch app.js`",
      ],
      [
        "`node --hot app.js`",
        "`node --hot app.js`",
      ],
    ],
    a: [
      "Node از نسخه 18.11 فلگ `--watch` را دارد که کار ابزارهایی مثل `nodemon` را برای اغلب پروژه‌ها انجام می‌دهد. بقیه گزینه‌ها فلگ معتبر Node نیستند.",
      "Since 18.11 Node has a `--watch` flag that covers what `nodemon` does for most projects. The other options aren't real Node flags.",
    ],
  },
  {
    id: "node-j-npx",
    level: "junior",
    tags: ["npm", "tooling"],
    q: ["`npx` چه کاری انجام می‌دهد؟", "What does `npx` do?"],
    options: [
      [
        "باینری یک پکیج را اجرا می‌کند و در صورت نبود، آن را موقتاً دانلود می‌کند",
        "Runs a package's binary, temporarily downloading it if missing",
      ],
      [
        "پکیج را به‌صورت global نصب و به PATH اضافه می‌کند",
        "Installs a package globally and adds it to PATH",
      ],
      [
        "پکیج را در رجیستری npm منتشر می‌کند",
        "Publishes a package to the npm registry",
      ],
      [
        "وابستگی‌های قدیمی را به آخرین نسخه ارتقا می‌دهد",
        "Upgrades outdated dependencies to their latest versions",
      ],
    ],
    a: [
      "`npx` ابتدا در `node_modules/.bin` محلی دنبال دستور می‌گردد و اگر نبود آن را در cache دانلود و اجرا می‌کند، بدون نصب global.",
      "`npx` first looks in the local `node_modules/.bin` and otherwise downloads the package to a cache and runs it, without a global install.",
    ],
  },
  {
    id: "node-j-npm-scripts",
    level: "junior",
    tags: ["npm", "package-json"],
    q: [
      "چرا در اسکریپت‌های `package.json` می‌توان `eslint .` نوشت بدون اینکه eslint global نصب باشد؟",
      "Why can a `package.json` script call `eslint .` without eslint installed globally?",
    ],
    options: [
      [
        "npm هنگام اجرای اسکریپت `node_modules/.bin` را به PATH اضافه می‌کند",
        "npm adds `node_modules/.bin` to PATH while running scripts",
      ],
      [
        "npm همه پکیج‌ها را هنگام نصب به‌صورت global هم نصب می‌کند",
        "npm also installs every package globally during install",
      ],
      [
        "Node دستورهای ناشناخته را خودکار از npm دانلود می‌کند",
        "Node auto-downloads unknown commands from npm",
      ],
      [
        "اسکریپت‌ها داخل V8 اجرا می‌شوند نه در shell",
        "Scripts run inside V8 rather than a shell",
      ],
    ],
    a: [
      "`npm run` محیطی می‌سازد که در آن `node_modules/.bin` در PATH است، پس باینری‌های وابستگی‌های محلی مستقیماً در دسترس‌اند.",
      "`npm run` creates an environment where `node_modules/.bin` is on PATH, so local dependency binaries are directly available.",
    ],
  },
  {
    id: "node-j-express-next",
    level: "junior",
    tags: ["express", "middleware"],
    q: [
      "در middleware اکسپرس، اگر نه `next()` صدا زده شود و نه پاسخی ارسال شود چه می‌شود؟",
      "In Express middleware, what happens if you neither call `next()` nor send a response?",
    ],
    options: [
      [
        "درخواست معلق می‌ماند تا کلاینت timeout شود",
        "The request hangs until the client times out",
      ],
      [
        "Express خودکار به middleware بعدی می‌رود",
        "Express automatically moves to the next middleware",
      ],
      [
        "Express خودکار پاسخ `404` می‌فرستد",
        "Express automatically sends a `404`",
      ],
      [
        "Express خودکار پاسخ `500` می‌فرستد",
        "Express automatically sends a `500`",
      ],
    ],
    a: [
      "هر middleware باید یا چرخه را با `res.send`/`res.end` تمام کند یا با `next()` کنترل را به بعدی بدهد؛ در غیر این صورت درخواست بی‌پاسخ می‌ماند.",
      "Each middleware must either end the cycle with `res.send`/`res.end` or pass control with `next()`; otherwise the request is left hanging.",
    ],
  },
  {
    id: "node-j-express-json",
    level: "junior",
    tags: ["express", "middleware"],
    q: [
      "چرا در یک route از نوع POST در Express مقدار `req.body` برابر `undefined` است؟",
      "Why is `req.body` `undefined` in an Express POST route?",
    ],
    options: [
      [
        "چون middleware بدنه مثل `app.use(express.json())` ثبت نشده است",
        "Because no body-parsing middleware like `app.use(express.json())` is registered",
      ],
      [
        "چون Express فقط درخواست‌های GET را پشتیبانی می‌کند",
        "Because Express only supports GET requests",
      ],
      [
        "چون بدنه را باید از `req.params` خواند",
        "Because the body must be read from `req.params`",
      ],
      [
        "چون `req.body` فقط در Express 5 وجود دارد",
        "Because `req.body` exists only in Express 5",
      ],
    ],
    a: [
      "Express به‌طور پیش‌فرض بدنه درخواست را parse نمی‌کند. `express.json()` بدنه JSON را و `express.urlencoded()` داده فرم را در `req.body` قرار می‌دهد.",
      "Express doesn't parse request bodies by default. `express.json()` parses JSON and `express.urlencoded()` parses form data into `req.body`.",
    ],
  },
  {
    id: "node-j-express-params-query",
    level: "junior",
    tags: ["express", "routing"],
    q: [
      "برای route `/users/:id` و درخواست `/users/7?sort=asc`، مقدار `7` و `asc` کجا هستند؟",
      "For route `/users/:id` and request `/users/7?sort=asc`, where are `7` and `asc`?",
    ],
    options: [
      [
        "`req.params.id` و `req.query.sort`",
        "`req.params.id` and `req.query.sort`",
      ],
      [
        "`req.query.id` و `req.params.sort`",
        "`req.query.id` and `req.params.sort`",
      ],
      [
        "`req.body.id` و `req.body.sort`",
        "`req.body.id` and `req.body.sort`",
      ],
      [
        "`req.headers.id` و `req.headers.sort`",
        "`req.headers.id` and `req.headers.sort`",
      ],
    ],
    a: [
      "بخش‌های پویای مسیر در `req.params` و query string در `req.query` قرار می‌گیرند. هر دو رشته‌اند و باید اعتبارسنجی و تبدیل شوند.",
      "Dynamic path segments go to `req.params` and the query string to `req.query`. Both are strings and should be validated and converted.",
    ],
  },
  {
    id: "node-j-clear-interval",
    level: "junior",
    tags: ["timers"],
    q: [
      "چرا یک اسکریپت Node که `setInterval` دارد هیچ‌وقت خودش خارج نمی‌شود؟",
      "Why does a Node script with a `setInterval` never exit on its own?",
    ],
    options: [
      [
        "چون interval فعال event loop را زنده نگه می‌دارد تا `clearInterval` یا `unref` شود",
        "An active interval keeps the event loop alive until `clearInterval` or `unref`",
      ],
      [
        "چون `setInterval` یک thread جدید سیستم‌عامل می‌سازد",
        "Because `setInterval` spawns a new OS thread",
      ],
      [
        "چون Node اسکریپت‌ها را همیشه به‌صورت daemon اجرا می‌کند",
        "Because Node always runs scripts as daemons",
      ],
      [
        "چون intervalها تا وقتی حافظه پر نشود ادامه می‌دهند و سپس متوقف می‌شوند",
        "Because intervals run until memory fills, then stop",
      ],
    ],
    a: [
      "Node تا زمانی که handle یا request فعالی (timer، socket، server) وجود داشته باشد خارج نمی‌شود. `timer.unref()` اجازه می‌دهد process بدون انتظار برای آن timer خارج شود.",
      "Node stays alive while any active handle or request (timer, socket, server) exists. `timer.unref()` lets the process exit without waiting for that timer.",
    ],
  },
  {
    id: "node-j-require-json",
    level: "junior",
    tags: ["modules", "require"],
    q: [
      "`const cfg = require('./config.json')` در CommonJS چه می‌کند؟",
      "What does `const cfg = require('./config.json')` do in CommonJS?",
    ],
    options: [
      [
        "فایل را یک بار parse و شیء حاصل را cache می‌کند",
        "Parses the file once and caches the resulting object",
      ],
      [
        "خطا می‌دهد چون `require` فقط فایل `.js` را می‌پذیرد",
        "Throws, because `require` only accepts `.js` files",
      ],
      [
        "محتوای خام فایل را به‌صورت رشته برمی‌گرداند",
        "Returns the raw file contents as a string",
      ],
      [
        "هر بار فایل را دوباره از دیسک می‌خواند تا تغییرات دیده شوند",
        "Re-reads the file from disk on every call to pick up changes",
      ],
    ],
    a: [
      "CommonJS فایل‌های `.json` را با `JSON.parse` بار و مثل هر ماژولی cache می‌کند، پس تغییرات بعدی فایل دیده نمی‌شوند. در ESM باید از `import cfg from './config.json' with { type: 'json' }` استفاده کرد.",
      "CommonJS loads `.json` with `JSON.parse` and caches it like any module, so later file edits aren't seen. In ESM use `import cfg from './config.json' with { type: 'json' }`.",
    ],
  },
]);
