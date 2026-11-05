import { build } from "../build";

export const nodejsSenior = build("nodejs", [
  {
    id: "node-s-network-vs-threadpool",
    level: "senior",
    tags: ["libuv", "internals"],
    q: [
      "چرا یک سرور Node می‌تواند ۱۰ هزار اتصال TCP هم‌زمان را با thread pool چهارتایی مدیریت کند؟",
      "Why can a Node server handle 10,000 concurrent TCP connections with a 4-thread pool?",
    ],
    options: [
      [
        "socketها با epoll/kqueue/IOCP روی همان event loop مالتی‌پلکس می‌شوند و thread pool را اشغال نمی‌کنند",
        "Sockets are multiplexed via epoll/kqueue/IOCP on the loop and never occupy the pool",
      ],
      [
        "هر thread در pool به‌طور هم‌زمان ۲۵۰۰ socket را با time-slicing مدیریت می‌کند",
        "Each pool thread time-slices 2,500 sockets at once",
      ],
      [
        "Node برای هر اتصال جدید به‌طور خودکار یک thread سیستم‌عامل جدید می‌سازد",
        "Node silently spawns a new OS thread for every connection",
      ],
      [
        "V8 اتصال‌ها را روی threadهای GC خود اجرا می‌کند",
        "V8 runs connections on its GC helper threads",
      ],
    ],
    a: [
      "I/O شبکه با مکانیزم‌های readiness/completion سیستم‌عامل غیرهمگام است و libuv فقط در فاز poll رویدادها را دریافت می‌کند. thread pool برای کارهایی است که API غیرهمگام سیستم‌عامل ندارند، مثل فایل‌سیستم و `dns.lookup`.",
      "Network I/O is async via OS readiness/completion mechanisms, and libuv just collects events in the poll phase. The pool exists for work lacking async OS APIs, like filesystem calls and `dns.lookup`.",
    ],
  },
  {
    id: "node-s-dns-lookup-starvation",
    level: "senior",
    tags: ["thread-pool", "debugging"],
    q: [
      "سرویسی بعد از افزایش درخواست‌های خروجی به hostهای مختلف، تأخیر عجیبی در `fs.readFile` دارد. محتمل‌ترین علت چیست؟",
      "After a spike in outbound requests to many hosts, a service sees odd latency in `fs.readFile`. What's the likely cause?",
    ],
    options: [
      [
        "فراخوانی‌های کند `dns.lookup` همه threadهای pool را اشغال کرده‌اند",
        "Slow `dns.lookup` calls are hogging every thread in the pool",
      ],
      [
        "socketهای TCP خروجی، thread pool را پر کرده‌اند",
        "Outbound TCP sockets have filled up the thread pool",
      ],
      [
        "GC در حال compact کردن فایل‌های باز روی دیسک است",
        "The GC is compacting open files on disk",
      ],
      [
        "event loop برای هر host یک فاز poll جداگانه ساخته است",
        "The event loop created a separate poll phase per host",
      ],
    ],
    a: [
      "`dns.lookup` (که `http` به‌طور پیش‌فرض استفاده می‌کند) از `getaddrinfo` روی thread pool استفاده می‌کند و DNS کند همه ۴ thread را مسدود می‌کند. راه‌حل: cache کردن DNS، `dns.resolve` یا افزایش `UV_THREADPOOL_SIZE`.",
      "`dns.lookup` (used by `http` by default) calls `getaddrinfo` on the pool, so slow DNS blocks all 4 threads. Fixes: cache DNS, use `dns.resolve`, or raise `UV_THREADPOOL_SIZE`.",
    ],
  },
  {
    id: "node-s-threadpool-size-timing",
    level: "senior",
    tags: ["thread-pool", "libuv"],
    q: [
      "چرا تنظیم `process.env.UV_THREADPOOL_SIZE = 16` در وسط کد برنامه ممکن است هیچ اثری نداشته باشد؟",
      "Why might setting `process.env.UV_THREADPOOL_SIZE = 16` mid-application have no effect?",
    ],
    options: [
      [
        "pool در اولین استفاده یک بار ساخته می‌شود و پس از آن اندازه‌اش ثابت است",
        "The pool is created once on first use, and its size is fixed afterwards",
      ],
      [
        "این متغیر فقط روی ویندوز خوانده می‌شود",
        "That variable is only read on Windows",
      ],
      [
        "مقدار باید حتماً توانی از ۲ کوچک‌تر از ۸ باشد",
        "The value must be a power of two below 8",
      ],
      [
        "Node این متغیر را فقط از `package.json` می‌خواند",
        "Node only reads it from `package.json`",
      ],
    ],
    a: [
      "libuv هنگام اولین درخواست به pool، مقدار env را می‌خواند و threadها را می‌سازد. مطمئن‌ترین راه، تنظیم آن در محیط پیش از اجرای `node` است.",
      "libuv reads the env value and spawns threads on the first pool request. The safest approach is setting it in the environment before launching `node`.",
    ],
  },
  {
    id: "node-s-event-loop-delay",
    level: "senior",
    tags: ["performance", "monitoring"],
    q: [
      "بهترین معیار برای تشخیص مسدود شدن event loop در production چیست؟",
      "What's the best metric for detecting event loop blocking in production?",
    ],
    options: [
      [
        "event loop delay با `perf_hooks.monitorEventLoopDelay` (مثلاً p99)",
        "Event loop delay via `perf_hooks.monitorEventLoopDelay` (e.g. p99)",
      ],
      [
        "درصد مصرف CPU کل سیستم",
        "Overall system CPU usage percentage",
      ],
      [
        "تعداد فایل‌های باز process",
        "The process's open file count",
      ],
      [
        "مقدار `process.memoryUsage().rss`",
        "The value of `process.memoryUsage().rss`",
      ],
    ],
    a: [
      "این histogram فاصله بین زمان مورد انتظار و واقعی اجرای timerها را اندازه می‌گیرد؛ p99 بالا یعنی کد همگام طولانی. CPU بالا می‌تواند ناشی از ترافیک زیاد سالم هم باشد. `performance.eventLoopUtilization()` معیار مکمل خوبی است.",
      "The histogram measures how late timers fire versus schedule; a high p99 means long synchronous work. High CPU can just mean healthy load. `performance.eventLoopUtilization()` is a good complement.",
    ],
  },
  {
    id: "node-s-heap-snapshot-diff",
    level: "senior",
    tags: ["memory-leak", "debugging"],
    q: [
      "روش استاندارد پیدا کردن منبع یک memory leak با heap snapshot چیست؟",
      "What's the standard technique for finding a memory leak with heap snapshots?",
    ],
    options: [
      [
        "گرفتن چند snapshot در طول بار، مقایسه آن‌ها و بررسی retainer path اشیای رو به رشد",
        "Take several snapshots under load, diff them, and inspect retainers of growing objects",
      ],
      [
        "گرفتن یک snapshot پس از restart و بررسی بزرگ‌ترین شیء",
        "Take one snapshot after restart and look at the largest object",
      ],
      [
        "اجرای `global.gc()` در هر درخواست تا leak پاک شود",
        "Call `global.gc()` on each request to clear the leak",
      ],
      [
        "مقایسه CPU profile قبل و بعد از deploy",
        "Compare CPU profiles from before and after the deploy",
      ],
    ],
    a: [
      "در Chrome DevTools (با `--inspect` یا `v8.writeHeapSnapshot()`) نمای Comparison اشیایی را نشان می‌دهد که بین snapshotها انباشته شده‌اند، و retainer path نشان می‌دهد چه چیزی آن‌ها را زنده نگه داشته است.",
      "In Chrome DevTools (via `--inspect` or `v8.writeHeapSnapshot()`) the Comparison view shows objects accumulating between snapshots, and the retainer path shows what keeps them alive.",
    ],
  },
  {
    id: "node-s-leak-sources",
    level: "senior",
    tags: ["memory-leak"],
    q: [
      "کدام الگو به احتمال زیاد باعث memory leak در یک سرور Node طولانی‌مدت می‌شود؟",
      "Which pattern most likely causes a memory leak in a long-running Node server?",
    ],
    options: [
      [
        "یک `Map` سطح ماژول به‌عنوان cache بدون سقف اندازه یا TTL",
        "A module-level `Map` used as a cache with no size limit or TTL",
      ],
      [
        "استفاده از `const` به‌جای `let` در handlerها",
        "Using `const` instead of `let` in handlers",
      ],
      [
        "تعریف تابع‌های arrow داخل handler هر درخواست",
        "Defining arrow functions inside each request handler",
      ],
      [
        "برگرداندن Promise از middlewareها",
        "Returning Promises from middleware",
      ],
    ],
    a: [
      "اشیای قابل دسترسی از root (ماژول‌ها، global، listenerهای ثبت‌شده، timerهای فعال) هرگز جمع‌آوری نمی‌شوند. cacheها باید سیاست eviction مثل LRU داشته باشند؛ closureهای کوتاه‌عمر مشکلی ایجاد نمی‌کنند.",
      "Anything reachable from a root (modules, globals, registered listeners, active timers) is never collected. Caches need eviction like LRU; short-lived closures are fine.",
    ],
  },
  {
    id: "node-s-v8-generational-gc",
    level: "senior",
    tags: ["gc", "v8"],
    q: [
      "GC نسلی V8 چگونه کار می‌کند؟",
      "How does V8's generational GC work?",
    ],
    options: [
      [
        "young generation با Scavenge سریع و old generation با Mark-Sweep-Compact جمع‌آوری می‌شود",
        "Young gen uses fast Scavenges; old gen uses Mark-Sweep-Compact",
      ],
      [
        "reference counting با شمارنده برای هر شیء، بدون مکث",
        "Per-object reference counting with no pauses",
      ],
      [
        "همه heap در هر بار GC یک‌جا و فقط با Mark-Sweep پاک می‌شود",
        "The whole heap is cleaned with a single Mark-Sweep every time",
      ],
      [
        "اشیا فقط وقتی process خارج می‌شود آزاد می‌شوند",
        "Objects are freed only when the process exits",
      ],
    ],
    a: [
      "بر اساس فرضیه نسلی، بیشتر اشیا زود می‌میرند؛ Scavenge اشیای زنده young را کپی و پس از دو بار زنده ماندن به old ارتقا می‌دهد. old gen با marking افزایشی و هم‌زمان کار می‌کند تا مکث‌ها کوتاه شوند.",
      "Per the generational hypothesis most objects die young; Scavenge copies survivors and promotes them to old space after surviving twice. Old gen uses incremental, concurrent marking to keep pauses short.",
    ],
  },
  {
    id: "node-s-max-old-space",
    level: "senior",
    tags: ["memory", "gc", "containers"],
    q: [
      "process Node در یک container با محدودیت ۲ گیگابایت حافظه با OOMKilled از بین می‌رود، ولی خطای heap out of memory نمی‌دهد. چه چیزی را بررسی می‌کنید؟",
      "A Node process in a 2 GB container gets OOMKilled without a 'heap out of memory' error. What do you check?",
    ],
    options: [
      [
        "حافظه خارج از heap (Bufferها، native) و تنظیم `--max-old-space-size` کمتر از سقف container",
        "Off-heap memory (Buffers, native) and setting `--max-old-space-size` below the limit",
      ],
      [
        "افزایش `UV_THREADPOOL_SIZE` برای آزادسازی سریع‌تر حافظه",
        "Raising `UV_THREADPOOL_SIZE` to free memory faster",
      ],
      [
        "تغییر همه `let`ها به `const` برای کاهش مصرف heap",
        "Changing every `let` to `const` to shrink the heap",
      ],
      [
        "غیرفعال کردن GC با `--no-gc` برای جلوگیری از مکث",
        "Disabling the GC with `--no-gc` to avoid pauses",
      ],
    ],
    a: [
      "kernel بر اساس RSS کل process kill می‌کند که شامل heap، Bufferها، stackها و حافظه native است. اگر سقف heap بیشتر از حافظه container باشد یا مصرف خارج از heap زیاد باشد، V8 پیش از kill فرصت GC تهاجمی پیدا نمی‌کند.",
      "The kernel kills based on total RSS, which includes heap, Buffers, stacks and native memory. If the heap limit exceeds the container or off-heap use is large, V8 never gets to GC aggressively before the kill.",
    ],
  },
  {
    id: "node-s-rss-vs-heap",
    level: "senior",
    tags: ["memory", "debugging"],
    q: [
      "در `process.memoryUsage()`، `heapUsed` ثابت است ولی `rss` مدام بالا می‌رود. محتمل‌ترین فرضیه چیست؟",
      "In `process.memoryUsage()`, `heapUsed` is flat but `rss` keeps climbing. What's the most likely hypothesis?",
    ],
    options: [
      [
        "نشت در حافظه خارج از JS heap، مثل Bufferها یا یک native addon",
        "A leak outside the JS heap, such as Buffers or a native addon",
      ],
      [
        "نشت در closureهای JavaScript که در heap ذخیره می‌شوند",
        "A leak in JavaScript closures stored on the heap",
      ],
      [
        "تعداد زیاد رشته‌های کوچک در old generation",
        "Too many small strings in the old generation",
      ],
      [
        "هیچ مشکلی نیست؛ `rss` همیشه برابر `heapUsed` است",
        "Nothing; `rss` always equals `heapUsed`",
      ],
    ],
    a: [
      "داده Buffer و ArrayBuffer خارج از V8 heap است و در `external` و `arrayBuffers` دیده می‌شود. heap snapshot چنین نشتی را خوب نشان نمی‌دهد و باید سراغ ابزارهای native یا بررسی Bufferها رفت. fragmentation در allocator هم می‌تواند RSS را بالا نگه دارد.",
      "Buffer and ArrayBuffer data lives outside the V8 heap and shows up in `external` and `arrayBuffers`. Heap snapshots reveal such leaks poorly, so look at native tooling or Buffer usage. Allocator fragmentation can also keep RSS high.",
    ],
  },
  {
    id: "node-s-buffer-slice-retention",
    level: "senior",
    tags: ["buffer", "memory-leak"],
    q: [
      "چرا نگه داشتن `big.subarray(0, 16)` از یک Buffer ده مگابایتی در یک cache می‌تواند نشت حافظه ایجاد کند؟",
      "Why can caching `big.subarray(0, 16)` of a 10 MB Buffer cause a memory leak?",
    ],
    options: [
      [
        "subarray یک view روی همان حافظه است و کل ۱۰ مگابایت را زنده نگه می‌دارد",
        "The subarray is a view onto the same memory, keeping all 10 MB alive",
      ],
      [
        "subarray یک کپی ۱۰ مگابایتی جدید می‌سازد",
        "The subarray makes a new 10 MB copy",
      ],
      [
        "Bufferهای کوچک هرگز توسط GC جمع‌آوری نمی‌شوند",
        "Small Buffers are never garbage collected",
      ],
      [
        "subarray حافظه را روی thread pool قفل می‌کند",
        "The subarray locks memory on the thread pool",
      ],
    ],
    a: [
      "`subarray` (و `slice` قدیمی Buffer) کپی نمی‌سازد، پس ArrayBuffer زیرین تا وقتی view زنده است آزاد نمی‌شود. برای نگهداری طولانی‌مدت از `Buffer.from(view)` برای کپی کردن استفاده کنید.",
      "`subarray` (and Buffer's legacy `slice`) doesn't copy, so the backing ArrayBuffer can't be freed while the view lives. For long-term storage copy it with `Buffer.from(view)`.",
    ],
  },
  {
    id: "node-s-weakref-nondeterministic",
    level: "senior",
    tags: ["gc", "memory"],
    q: [
      "چرا نباید منطق حیاتی مثل بستن اتصال دیتابیس را به `FinalizationRegistry` سپرد؟",
      "Why shouldn't critical logic like closing DB connections rely on `FinalizationRegistry`?",
    ],
    options: [
      [
        "زمان اجرای callback نامعین است و حتی ممکن است هرگز اجرا نشود",
        "Callback timing is non-deterministic and it may never run at all",
      ],
      [
        "`FinalizationRegistry` فقط در مرورگر وجود دارد",
        "`FinalizationRegistry` only exists in browsers",
      ],
      [
        "callback آن همگام و بلافاصله پس از خروج شیء از scope اجرا می‌شود",
        "Its callback runs synchronously as soon as the object leaves scope",
      ],
      [
        "استفاده از آن GC را کاملاً غیرفعال می‌کند",
        "Using it disables the GC entirely",
      ],
    ],
    a: [
      "GC هیچ تضمینی درباره زمان جمع‌آوری نمی‌دهد و ممکن است process پیش از آن خارج شود. برای مدیریت منابع از cleanup صریح یا `using` با `Symbol.dispose`/`Symbol.asyncDispose` استفاده کنید.",
      "The GC makes no timing guarantees and the process may exit first. For resource management use explicit cleanup or `using` with `Symbol.dispose`/`Symbol.asyncDispose`.",
    ],
  },
  {
    id: "node-s-als-context-loss",
    level: "senior",
    tags: ["async-local-storage", "debugging"],
    q: [
      "`als.getStore()` در callback یک کتابخانه قدیمی connection pool مقدار `undefined` برمی‌گرداند. علت محتمل چیست؟",
      "`als.getStore()` returns `undefined` inside an old connection-pool library's callback. Likely cause?",
    ],
    options: [
      [
        "کتابخانه callbackها را در صف داخلی خود نگه می‌دارد و از context دیگری صدا می‌زند",
        "The library queues callbacks internally and invokes them from another context",
      ],
      [
        "`AsyncLocalStorage` فقط با CommonJS کار می‌کند",
        "`AsyncLocalStorage` only works with CommonJS",
      ],
      [
        "store بعد از ۱۰۰ میلی‌ثانیه خودکار منقضی می‌شود",
        "The store automatically expires after 100ms",
      ],
      [
        "`getStore` فقط داخل microtaskها کار می‌کند",
        "`getStore` only works inside microtasks",
      ],
    ],
    a: [
      "context از طریق async resourceها منتقل می‌شود؛ pool که callback را ذخیره و بعداً از درخواست دیگری صدا می‌زند، context همان درخواست دیگر را منتقل می‌کند. راه‌حل: `AsyncResource.bind(cb)` یا `AsyncLocalStorage.bind`.",
      "Context flows through async resources; a pool that stores a callback and fires it later from another request's flow carries that other context. Fix with `AsyncResource.bind(cb)` or `AsyncLocalStorage.bind`.",
    ],
  },
  {
    id: "node-s-als-vs-async-hooks",
    level: "senior",
    tags: ["async-local-storage", "performance"],
    q: [
      "چرا برای propagation context به‌جای `async_hooks.createHook` مستقیم، `AsyncLocalStorage` توصیه می‌شود؟",
      "Why is `AsyncLocalStorage` recommended over raw `async_hooks.createHook` for context propagation?",
    ],
    options: [
      [
        "API پایدار و بهینه‌شده است، در حالی که `createHook` سربار بالا دارد و توصیه نمی‌شود",
        "It's a stable, optimized API, while `createHook` is costly and discouraged",
      ],
      [
        "`createHook` فقط در worker threadها کار می‌کند",
        "`createHook` only works in worker threads",
      ],
      [
        "`AsyncLocalStorage` داده را در دیسک persist می‌کند",
        "`AsyncLocalStorage` persists data to disk",
      ],
      [
        "`createHook` نمی‌تواند Promiseها را ردیابی کند",
        "`createHook` can't track Promises at all",
      ],
    ],
    a: [
      "hookهای `init`/`before`/`after` برای هر async resource صدا زده می‌شوند و روی Promiseها هزینه قابل توجهی دارند. مستندات Node استفاده از `AsyncLocalStorage` را توصیه می‌کند که در نسخه‌های جدید پیاده‌سازی بهینه‌تری دارد.",
      "The `init`/`before`/`after` hooks fire for every async resource and are expensive with Promises. Node's docs steer users to `AsyncLocalStorage`, which newer versions implement more efficiently.",
    ],
  },
  {
    id: "node-s-cpu-profile",
    level: "senior",
    tags: ["profiling", "performance"],
    q: [
      "p99 تأخیر یک API بالا رفته و event loop delay هم زیاد است. قدم بعدی منطقی چیست؟",
      "An API's p99 latency rose and event loop delay is high. What's the logical next step?",
    ],
    options: [
      [
        "گرفتن CPU profile (`--cpu-prof` یا `--inspect`) و بررسی flame graph برای توابع همگام داغ",
        "Capture a CPU profile (`--cpu-prof` or `--inspect`) and look for hot sync frames",
      ],
      [
        "گرفتن heap snapshot چون تأخیر همیشه ناشی از memory leak است",
        "Take a heap snapshot, since latency is always a memory leak",
      ],
      [
        "افزایش `UV_THREADPOOL_SIZE` تا کد JS موازی اجرا شود",
        "Raise `UV_THREADPOOL_SIZE` so JS runs in parallel",
      ],
      [
        "افزودن `await` به همه توابع همگام",
        "Add `await` in front of every synchronous function",
      ],
    ],
    a: [
      "event loop delay بالا یعنی کد همگام طولانی روی main thread؛ CPU profile دقیقاً نشان می‌دهد زمان کجا صرف می‌شود (مثلاً regex، JSON یا crypto همگام). اگر GC در profile غالب بود، آن‌وقت سراغ حافظه بروید.",
      "High loop delay means long synchronous work on the main thread; a CPU profile pinpoints where (e.g. regex, JSON or sync crypto). If GC dominates the profile, then investigate memory.",
    ],
  },
  {
    id: "node-s-clinic",
    level: "senior",
    tags: ["profiling", "tooling"],
    q: [
      "ابزار `clinic doctor` در مجموعه Clinic.js چه کاری انجام می‌دهد؟",
      "What does `clinic doctor` from Clinic.js do?",
    ],
    options: [
      [
        "معیارهای CPU، حافظه و event loop delay را زیر بار جمع می‌کند و نوع مشکل را تشخیص می‌دهد",
        "Collects CPU, memory and loop delay under load and suggests the problem class",
      ],
      [
        "آسیب‌پذیری‌های امنیتی وابستگی‌ها را اسکن می‌کند",
        "Scans dependencies for security vulnerabilities",
      ],
      [
        "کد را خودکار بازنویسی و بهینه می‌کند",
        "Automatically rewrites and optimizes your code",
      ],
      [
        "تست‌های واحد را به‌صورت موازی اجرا می‌کند",
        "Runs unit tests in parallel",
      ],
    ],
    a: [
      "`doctor` تشخیص می‌دهد مشکل از I/O، event loop مسدود یا GC است و ابزار بعدی را پیشنهاد می‌کند: `clinic flame` برای CPU، `bubbleprof` برای تأخیرهای async و `heapprofiler` برای حافظه.",
      "`doctor` classifies whether the issue is I/O, a blocked loop or GC, and points you to the next tool: `clinic flame` for CPU, `bubbleprof` for async delays, `heapprofiler` for memory.",
    ],
  },
  {
    id: "node-s-trace-sync-io",
    level: "senior",
    tags: ["debugging", "event-loop"],
    q: [
      "کدام فلگ Node هر بار که پس از اولین tick یک I/O همگام (مثل `readFileSync`) اجرا شود هشدار می‌دهد؟",
      "Which Node flag warns whenever synchronous I/O (like `readFileSync`) runs after the first tick?",
    ],
    options: [
      [
        "`--trace-sync-io`",
        "`--trace-sync-io`",
      ],
      [
        "`--no-sync`",
        "`--no-sync`",
      ],
      [
        "`--trace-gc`",
        "`--trace-gc`",
      ],
      [
        "`--strict-async`",
        "`--strict-async`",
      ],
    ],
    a: [
      "`--trace-sync-io` با stack trace نشان می‌دهد کجا I/O همگام در زمان اجرا (نه startup) استفاده شده است؛ ابزار خوبی برای پیدا کردن blockingهای پنهان در وابستگی‌هاست.",
      "`--trace-sync-io` prints a stack trace wherever sync I/O happens at runtime (not startup), which is great for finding hidden blocking in dependencies.",
    ],
  },
  {
    id: "node-s-prototype-pollution",
    level: "senior",
    tags: ["security", "prototype-pollution"],
    q: [
      "یک تابع deep-merge بازگشتی، بدنه JSON کاربر را در یک شیء config ادغام می‌کند. payload `{\"__proto__\": {\"isAdmin\": true}}` چه اثری دارد؟",
      "A recursive deep-merge merges user JSON into a config object. What does `{\"__proto__\": {\"isAdmin\": true}}` do?",
    ],
    options: [
      [
        "`isAdmin` روی `Object.prototype` قرار می‌گیرد و همه اشیای برنامه آن را به ارث می‌برند",
        "`isAdmin` lands on `Object.prototype`, so every object inherits it",
      ],
      [
        "فقط یک کلید با نام `__proto__` به شیء config اضافه می‌شود",
        "It just adds a key named `__proto__` to the config",
      ],
      [
        "`JSON.parse` چنین payloadی را همیشه رد می‌کند",
        "`JSON.parse` always rejects such a payload",
      ],
      [
        "تنها روی همان درخواست اثر دارد و با پایان آن پاک می‌شود",
        "It affects only that request and is gone afterwards",
      ],
    ],
    a: [
      "`JSON.parse` کلید `__proto__` را به‌عنوان property معمولی می‌سازد، اما merge با `target[key]` به prototype واقعی می‌رسد و آن را برای کل process آلوده می‌کند؛ بررسی‌هایی مثل `if (user.isAdmin)` دور زده می‌شوند.",
      "`JSON.parse` creates `__proto__` as an own property, but merging via `target[key]` reaches the real prototype and pollutes it process-wide, bypassing checks like `if (user.isAdmin)`.",
    ],
  },
  {
    id: "node-s-prototype-pollution-mitigation",
    level: "senior",
    tags: ["security", "prototype-pollution"],
    q: [
      "کدام مورد دفاع مؤثری در برابر prototype pollution نیست؟",
      "Which of these is NOT an effective defense against prototype pollution?",
    ],
    options: [
      [
        "استفاده از `Object.freeze` روی شیء config نهایی پس از merge",
        "Calling `Object.freeze` on the final config object after merging",
      ],
      [
        "رد کردن کلیدهای `__proto__`، `constructor` و `prototype` در merge",
        "Rejecting `__proto__`, `constructor` and `prototype` keys during merge",
      ],
      [
        "استفاده از `Map` یا `Object.create(null)` برای داده کلید-مقدار کاربر",
        "Using `Map` or `Object.create(null)` for user key-value data",
      ],
      [
        "اجرای Node با `--disable-proto=delete` و اعتبارسنجی schema ورودی",
        "Running Node with `--disable-proto=delete` and schema-validating input",
      ],
    ],
    a: [
      "فریز کردن شیء config جلوی تغییر `Object.prototype` را نمی‌گیرد، چون آلودگی در خود merge و روی prototype مشترک اتفاق می‌افتد. بقیه گزینه‌ها مسیر رسیدن به prototype را می‌بندند.",
      "Freezing the config doesn't stop `Object.prototype` from being modified, since pollution happens during the merge on the shared prototype. The other options cut off the path to the prototype.",
    ],
  },
  {
    id: "node-s-redos",
    level: "senior",
    tags: ["security", "redos"],
    q: [
      "چرا regex `^(a+)+$` روی ورودی کاربر در Node خطرناک است؟",
      "Why is the regex `^(a+)+$` dangerous on user input in Node?",
    ],
    options: [
      [
        "backtracking نمایی روی ورودی‌ای مثل `'aaaa…a!'` event loop را برای مدت طولانی مسدود می‌کند",
        "Exponential backtracking on input like `'aaaa…a!'` blocks the event loop for ages",
      ],
      [
        "regex در Node روی thread pool اجرا و آن را پر می‌کند",
        "Node runs regexes on the thread pool and exhausts it",
      ],
      [
        "این regex تزریق SQL را امکان‌پذیر می‌کند",
        "This regex enables SQL injection",
      ],
      [
        "خطرناک نیست چون V8 regexها را همیشه خطی اجرا می‌کند",
        "It's harmless, because V8 always runs regexes in linear time",
      ],
    ],
    a: [
      "quantifierهای تودرتو تعداد مسیرهای تطبیق را نمایی می‌کنند و چون regex همگام روی main thread اجرا می‌شود، یک درخواست کل سرور را از کار می‌اندازد (ReDoS). راه‌حل: بازنویسی الگو، محدود کردن طول ورودی یا موتورهای خطی مثل RE2.",
      "Nested quantifiers explode the number of match paths, and since regexes run synchronously on the main thread one request can freeze the server (ReDoS). Fix by rewriting the pattern, capping input length, or using linear engines like RE2.",
    ],
  },
  {
    id: "node-s-supply-chain",
    level: "senior",
    tags: ["security", "npm"],
    q: [
      "کدام اقدام بیشترین کاهش ریسک را در برابر پکیج‌های مخرب با اسکریپت `postinstall` در CI دارد؟",
      "Which step most reduces risk from malicious packages with `postinstall` scripts in CI?",
    ],
    options: [
      [
        "`npm ci --ignore-scripts` با lockfile commit‌شده و اجازه صریح فقط برای پکیج‌های لازم",
        "`npm ci --ignore-scripts` with a committed lockfile, allow-listing only needed scripts",
      ],
      [
        "اجرای `npm install` با آخرین نسخه‌ها در هر build",
        "Running `npm install` with latest versions on every build",
      ],
      [
        "اجرای `npm audit` پس از deploy",
        "Running `npm audit` after deploying",
      ],
      [
        "استفاده از `^` برای همه وابستگی‌ها تا patchهای امنیتی سریع برسند",
        "Using `^` everywhere so security patches arrive quickly",
      ],
    ],
    a: [
      "اسکریپت‌های lifecycle هنگام نصب با دسترسی کامل به secretهای CI اجرا می‌شوند. lockfile نسخه و hash را pin می‌کند و `--ignore-scripts` مسیر اجرای خودکار کد را می‌بندد. `npm audit` فقط advisoryهای شناخته‌شده را می‌بیند.",
      "Lifecycle scripts run at install time with full access to CI secrets. A lockfile pins versions and hashes, and `--ignore-scripts` closes the auto-execution path. `npm audit` only sees known advisories.",
    ],
  },
  {
    id: "node-s-timing-safe-equal",
    level: "senior",
    tags: ["security", "crypto"],
    q: [
      "چرا برای مقایسه امضای webhook از `crypto.timingSafeEqual` به‌جای `===` استفاده می‌شود؟",
      "Why compare webhook signatures with `crypto.timingSafeEqual` instead of `===`?",
    ],
    options: [
      [
        "`===` در اولین بایت متفاوت متوقف می‌شود و زمان پاسخ، اطلاعات امضا را نشت می‌دهد",
        "`===` exits at the first mismatch, so response timing leaks signature info",
      ],
      [
        "`===` نمی‌تواند رشته‌های hex را مقایسه کند",
        "`===` can't compare hex strings",
      ],
      [
        "`timingSafeEqual` سریع‌تر است چون روی thread pool اجرا می‌شود",
        "`timingSafeEqual` is faster because it runs on the thread pool",
      ],
      [
        "`timingSafeEqual` امضا را خودکار از هدر درخواست می‌خواند",
        "`timingSafeEqual` reads the signature from the request header",
      ],
    ],
    a: [
      "مقایسه با زمان ثابت مانع timing attack می‌شود. توجه کنید `timingSafeEqual` روی Bufferهای هم‌طول کار می‌کند و برای طول متفاوت throw می‌کند، پس ابتدا طول را بررسی کنید.",
      "Constant-time comparison prevents timing attacks. Note `timingSafeEqual` needs equal-length Buffers and throws otherwise, so check lengths first.",
    ],
  },
  {
    id: "node-s-shared-array-buffer",
    level: "senior",
    tags: ["worker-threads", "concurrency"],
    q: [
      "دو worker thread روی یک `SharedArrayBuffer` شمارنده را افزایش می‌دهند. چرا `view[0]++` نتیجه نادرست می‌دهد؟",
      "Two worker threads increment a counter in a `SharedArrayBuffer`. Why does `view[0]++` give wrong totals?",
    ],
    options: [
      [
        "`++` یک read-modify-write غیراتمی است؛ باید از `Atomics.add` استفاده کرد",
        "`++` is a non-atomic read-modify-write; use `Atomics.add` instead",
      ],
      [
        "هر worker یک کپی جداگانه از SharedArrayBuffer دارد",
        "Each worker gets its own copy of the SharedArrayBuffer",
      ],
      [
        "SharedArrayBuffer فقط خواندنی است",
        "SharedArrayBuffer is read-only",
      ],
      [
        "event loop هر worker مقادیر را با تأخیر sync می‌کند",
        "Each worker's event loop syncs values lazily",
      ],
    ],
    a: [
      "SharedArrayBuffer حافظه واقعاً مشترک است و race condition کلاسیک رخ می‌دهد. `Atomics` عملیات اتمی و `Atomics.wait`/`notify` برای هماهنگی فراهم می‌کند.",
      "SharedArrayBuffer is truly shared memory, so classic race conditions occur. `Atomics` provides atomic ops plus `Atomics.wait`/`notify` for coordination.",
    ],
  },
  {
    id: "node-s-transfer-list",
    level: "senior",
    tags: ["worker-threads", "performance"],
    q: [
      "ارسال یک ArrayBuffer دویست مگابایتی به worker با `postMessage(buf, [buf])` چه تفاوتی با `postMessage(buf)` دارد؟",
      "How does `postMessage(buf, [buf])` for a 200 MB ArrayBuffer differ from `postMessage(buf)`?",
    ],
    options: [
      [
        "مالکیت بدون کپی منتقل می‌شود و `buf` در فرستنده detach و غیرقابل استفاده می‌شود",
        "Ownership moves without copying, and `buf` becomes detached in the sender",
      ],
      [
        "داده دو بار کپی می‌شود تا هر دو طرف نسخه داشته باشند",
        "The data is copied twice so both sides keep a version",
      ],
      [
        "buf به SharedArrayBuffer تبدیل و بین دو thread مشترک می‌شود",
        "buf turns into a SharedArrayBuffer shared by both threads",
      ],
      [
        "تفاوتی ندارد؛ پارامتر دوم فقط برای debug است",
        "No difference; the second argument is just for debugging",
      ],
    ],
    a: [
      "بدون transferList، داده با structured clone کپی می‌شود که برای داده‌های بزرگ کند است. با transfer، حافظه منتقل و `byteLength` در فرستنده صفر می‌شود.",
      "Without a transfer list the data is structured-cloned, which is slow for large payloads. With transfer the memory moves and the sender's `byteLength` becomes 0.",
    ],
  },
  {
    id: "node-s-worker-vs-child-process",
    level: "senior",
    tags: ["worker-threads", "child-process"],
    q: [
      "در چه شرایطی `child_process` بر `worker_threads` ترجیح دارد؟",
      "When is `child_process` preferable to `worker_threads`?",
    ],
    options: [
      [
        "وقتی ایزوله‌سازی کامل لازم است، مثلاً اجرای کد نامطمئن یا native addonی که ممکن است crash کند",
        "When you need full isolation, e.g. untrusted code or a crash-prone native addon",
      ],
      [
        "وقتی باید داده زیادی را با کمترین سربار بین دو طرف به اشتراک گذاشت",
        "When you must share large data between both sides with minimal overhead",
      ],
      [
        "وقتی startup سریع و مصرف حافظه کم مهم‌ترین اولویت است",
        "When fast startup and low memory are the top priorities",
      ],
      [
        "وقتی نیاز به `Atomics` و حافظه مشترک دارید",
        "When you need `Atomics` and shared memory",
      ],
    ],
    a: [
      "workerها در همان process با isolate جداگانه اجرا می‌شوند: سبک‌تر و با امکان حافظه مشترک، اما segfault در یک native addon کل process را از بین می‌برد. process فرزند فضای حافظه و محدودیت‌های سیستم‌عامل جداگانه دارد.",
      "Workers run in the same process with separate isolates: lighter and able to share memory, but a native segfault kills everything. A child process has its own address space and OS-level limits.",
    ],
  },
  {
    id: "node-s-cluster-vs-orchestrator",
    level: "senior",
    tags: ["cluster", "scaling", "containers"],
    q: [
      "در Kubernetes، چرا اغلب به‌جای `cluster` داخل یک pod، چند pod تک‌process اجرا می‌شود؟",
      "In Kubernetes, why do teams often run several single-process pods instead of `cluster` inside one pod?",
    ],
    options: [
      [
        "orchestrator مقیاس‌دهی، health check و restart را در سطح process دقیق‌تر و ساده‌تر انجام می‌دهد",
        "The orchestrator handles scaling, health checks and restarts per process more simply",
      ],
      [
        "ماژول `cluster` در containerها کار نمی‌کند",
        "The `cluster` module doesn't work inside containers",
      ],
      [
        "Kubernetes اجازه بیش از یک thread در هر pod را نمی‌دهد",
        "Kubernetes allows only one thread per pod",
      ],
      [
        "`cluster` حافظه را بین workerها به اشتراک می‌گذارد و ناامن است",
        "`cluster` shares memory between workers, which is unsafe",
      ],
    ],
    a: [
      "با یک process در هر pod، محدودیت CPU/حافظه، معیارها، readiness و autoscaling ساده و قابل پیش‌بینی می‌شوند و دو لایه load balancing و supervision تکراری نمی‌شود. `cluster` هنوز روی VM یا bare metal مفید است.",
      "One process per pod makes CPU/memory limits, metrics, readiness and autoscaling simple and predictable, avoiding duplicate load-balancing and supervision layers. `cluster` still helps on VMs or bare metal.",
    ],
  },
  {
    id: "node-s-ignored-backpressure",
    level: "senior",
    tags: ["streams", "backpressure", "memory"],
    q: [
      "کدی داده را از یک Readable سریع با `readable.on('data', c => slowWritable.write(c))` منتقل می‌کند. زیر بار چه اتفاقی می‌افتد؟",
      "Code moves data with `readable.on('data', c => slowWritable.write(c))` from a fast source. What happens under load?",
    ],
    options: [
      [
        "مقدار برگشتی `write` نادیده گرفته می‌شود و بافر Writable بی‌حد رشد می‌کند تا حافظه تمام شود",
        "`write`'s return is ignored, so the Writable's buffer grows until memory runs out",
      ],
      [
        "Readable به‌طور خودکار pause می‌شود چون `'data'` backpressure دارد",
        "The Readable auto-pauses because `'data'` handles backpressure",
      ],
      [
        "chunkهای اضافی بی‌صدا دور ریخته می‌شوند",
        "Excess chunks are silently dropped",
      ],
      [
        "Node خطای `ERR_STREAM_BACKPRESSURE` می‌دهد",
        "Node throws `ERR_STREAM_BACKPRESSURE`",
      ],
    ],
    a: [
      "Writable هیچ داده‌ای را دور نمی‌ریزد و همه را بافر می‌کند. باید با `false` شدن `write`، `readable.pause()` و با `'drain'`، `resume()` را صدا زد، یا ساده‌تر از `pipeline` استفاده کرد.",
      "A Writable never drops data; it buffers everything. You must `readable.pause()` when `write` returns `false` and `resume()` on `'drain'`, or simply use `pipeline`.",
    ],
  },
  {
    id: "node-s-pipeline-async-generator",
    level: "senior",
    tags: ["streams", "async-await"],
    q: [
      "در `await pipeline(src, async function* (source) { for await (const c of source) yield transform(c); }, dest)` نقش generator چیست؟",
      "In `await pipeline(src, async function* (source) { for await (const c of source) yield transform(c); }, dest)`, what is the generator's role?",
    ],
    options: [
      [
        "یک مرحله Transform با رعایت backpressure بدون نوشتن کلاس Transform",
        "A backpressure-aware transform stage without writing a Transform class",
      ],
      [
        "تمام داده را ابتدا جمع و سپس یک‌جا به `dest` می‌فرستد",
        "It collects all data first, then sends it to `dest` at once",
      ],
      [
        "chunkها را روی worker thread جداگانه پردازش می‌کند",
        "It processes chunks on a separate worker thread",
      ],
      [
        "فقط برای logging است و داده را تغییر نمی‌دهد",
        "It's only for logging and can't change data",
      ],
    ],
    a: [
      "`pipeline` توابع async generator را به‌عنوان مرحله میانی می‌پذیرد؛ `yield` تا وقتی مصرف‌کننده آماده نباشد معلق می‌ماند، پس backpressure و انتشار خطا رعایت می‌شود.",
      "`pipeline` accepts async generator functions as intermediate stages; `yield` suspends until the consumer is ready, preserving backpressure and error propagation.",
    ],
  },
  {
    id: "node-s-keepalive-shutdown",
    level: "senior",
    tags: ["shutdown", "http"],
    q: [
      "بعد از `server.close()` در SIGTERM، process هنوز تا چند ثانیه خارج نمی‌شود. محتمل‌ترین علت چیست؟",
      "After `server.close()` on SIGTERM, the process still won't exit for seconds. Most likely cause?",
    ],
    options: [
      [
        "اتصال‌های keep-alive بیکار باز مانده‌اند؛ باید `closeIdleConnections` یا timeout اعمال کرد",
        "Idle keep-alive connections remain open; use `closeIdleConnections` or a timeout",
      ],
      [
        "`server.close()` فقط روی HTTPS کار می‌کند",
        "`server.close()` only works on HTTPS",
      ],
      [
        "Node همیشه ۳۰ ثانیه پیش از خروج صبر می‌کند",
        "Node always waits 30 seconds before exiting",
      ],
      [
        "GC باید پیش از خروج کل heap را compact کند",
        "The GC must compact the heap before exiting",
      ],
    ],
    a: [
      "`close` فقط پذیرش اتصال جدید را متوقف و منتظر بسته شدن اتصال‌های موجود می‌ماند. `server.closeIdleConnections()` و `closeAllConnections()` (Node 18.2+) به همراه یک timeout سخت این مشکل را حل می‌کنند.",
      "`close` only stops new connections and waits for existing ones to end. `server.closeIdleConnections()` and `closeAllConnections()` (Node 18.2+), plus a hard timeout, solve it.",
    ],
  },
  {
    id: "node-s-k8s-shutdown-readiness",
    level: "senior",
    tags: ["shutdown", "containers"],
    q: [
      "در Kubernetes، چرا برخی از درخواست‌ها حتی با graceful shutdown در حین rolling deploy خطای 502 می‌گیرند؟",
      "In Kubernetes, why do some requests get 502s during rolling deploys even with graceful shutdown?",
    ],
    options: [
      [
        "حذف pod از endpointها با SIGTERM هم‌زمان است و ترافیک ممکن است تا چند لحظه بعد هم برسد",
        "Endpoint removal races with SIGTERM, so traffic may still arrive briefly after",
      ],
      [
        "Kubernetes قبل از SIGTERM همیشه SIGKILL می‌فرستد",
        "Kubernetes always sends SIGKILL before SIGTERM",
      ],
      [
        "Node نمی‌تواند SIGTERM را در container دریافت کند",
        "Node can never receive SIGTERM inside a container",
      ],
      [
        "load balancer فقط به pod جدید متصل می‌شود اگر heap خالی باشد",
        "The load balancer only routes to pods with an empty heap",
      ],
    ],
    a: [
      "به‌روزرسانی endpointها و kube-proxy به‌صورت غیرهمگام انجام می‌شود. معمولاً با `preStop` sleep کوتاه یا fail کردن readiness و ادامه سرویس‌دهی برای چند ثانیه پیش از `server.close()` این مشکل حل می‌شود. همچنین node باید PID 1 نباشد یا سیگنال‌ها را درست handle کند.",
      "Endpoint and kube-proxy updates propagate asynchronously. A short `preStop` sleep, or failing readiness while still serving for a few seconds before `server.close()`, fixes it. Also ensure node isn't PID 1 or handles signals properly.",
    ],
  },
  {
    id: "node-s-late-rejection-handling",
    level: "senior",
    tags: ["promises", "errors"],
    q: [
      "کد `const p = fetchUser(); await sleep(1000); try { await p; } catch {}` در Node 15+ اگر `fetchUser` سریعاً reject شود چه می‌کند؟",
      "In Node 15+, what does `const p = fetchUser(); await sleep(1000); try { await p; } catch {}` do if `fetchUser` rejects quickly?",
    ],
    options: [
      [
        "process احتمالاً کرش می‌کند چون rejection پیش از اتصال handler بدون handler تشخیص داده می‌شود",
        "It likely crashes, since the rejection is flagged unhandled before a handler attaches",
      ],
      [
        "خطا با `catch` گرفته می‌شود و مشکلی پیش نمی‌آید",
        "The `catch` handles it and nothing goes wrong",
      ],
      [
        "`p` تا اولین `await` در حالت pending باقی می‌ماند",
        "`p` stays pending until it's first awaited",
      ],
      [
        "Node rejection را یک ثانیه بافر می‌کند و سپس به `catch` می‌دهد",
        "Node buffers the rejection for one second, then passes it to `catch`",
      ],
    ],
    a: [
      "Node پس از خالی شدن صف microtask بررسی می‌کند Promise ردشده handler دارد یا نه؛ اینجا handler یک ثانیه بعد اضافه می‌شود. باید handler را بلافاصله اضافه کرد، مثلاً با `Promise.all` یا `p.catch` زودهنگام.",
      "Node checks for handlers after the microtask queue drains; here the handler is attached a second later. Attach handlers immediately, e.g. via `Promise.all` or an early `p.catch`.",
    ],
  },
  {
    id: "node-s-dual-package-hazard",
    level: "senior",
    tags: ["esm", "modules", "package-json"],
    q: [
      "dual package hazard در پکیجی که هم نسخه CJS و هم ESM ارائه می‌دهد چیست؟",
      "What is the dual package hazard in a package shipping both CJS and ESM builds?",
    ],
    options: [
      [
        "هر دو نسخه ممکن است هم‌زمان بار شوند و دو نمونه مستقل با state و کلاس‌های جدا بسازند",
        "Both builds may load at once, creating two instances with separate state and classes",
      ],
      [
        "Node در صورت وجود دو نسخه، پکیج را اصلاً بار نمی‌کند",
        "Node refuses to load a package that ships two builds",
      ],
      [
        "نسخه ESM همیشه نسخه CJS را overwrite می‌کند",
        "The ESM build always overwrites the CJS build",
      ],
      [
        "حجم `node_modules` دو برابر و نصب کندتر می‌شود",
        "`node_modules` doubles in size and installs slower",
      ],
    ],
    a: [
      "اگر بخشی از برنامه `import` و بخش دیگر `require` کند، دو نسخه مستقل اجرا می‌شوند؛ `instanceof` شکست می‌خورد و singletonها دوتایی می‌شوند. راه‌حل: wrapper ESM نازک روی نسخه CJS یا انتشار فقط یک فرمت.",
      "If part of the app uses `import` and another `require`, two independent copies run; `instanceof` breaks and singletons double. Fix with a thin ESM wrapper around the CJS build, or ship one format.",
    ],
  },
  {
    id: "node-s-require-esm",
    level: "senior",
    tags: ["esm", "commonjs"],
    q: [
      "در نسخه‌های جدید Node (22.12+) که `require(esm)` پشتیبانی می‌شود، چه زمانی `require` یک ES Module شکست می‌خورد؟",
      "In recent Node (22.12+) where `require(esm)` is supported, when does requiring an ES Module still fail?",
    ],
    options: [
      [
        "وقتی گراف ماژول شامل top-level await باشد (`ERR_REQUIRE_ASYNC_MODULE`)",
        "When the module graph contains top-level await (`ERR_REQUIRE_ASYNC_MODULE`)",
      ],
      [
        "همیشه؛ CommonJS هرگز نمی‌تواند ESM را بار کند",
        "Always; CommonJS can never load ESM",
      ],
      [
        "وقتی ماژول ESM export پیش‌فرض داشته باشد",
        "Whenever the ESM module has a default export",
      ],
      [
        "وقتی پسوند فایل `.mjs` باشد",
        "Whenever the file extension is `.mjs`",
      ],
    ],
    a: [
      "`require` همگام است، پس فقط گراف‌های ESM همگام را می‌تواند بار کند و namespace object را برمی‌گرداند. برای ماژول‌های دارای top-level await باید از `import()` پویا استفاده کرد.",
      "`require` is synchronous, so it can only load synchronous ESM graphs, returning the namespace object. Modules with top-level await need dynamic `import()`.",
    ],
  },
  {
    id: "node-s-esm-live-bindings",
    level: "senior",
    tags: ["esm", "commonjs"],
    q: [
      "ماژول `counter` یک `let count = 0` و تابع `inc()` را export می‌کند. پس از `inc()`، مقدار `count` import‌شده در ESM و مقدار destructure‌شده در CJS چیست؟",
      "Module `counter` exports `let count = 0` and `inc()`. After `inc()`, what is the imported `count` in ESM versus a destructured `count` in CJS?",
    ],
    options: [
      [
        "ESM: `1` (live binding)؛ CJS: `0` (کپی مقدار در زمان require)",
        "ESM: `1` (live binding); CJS: `0` (value copied at require time)",
      ],
      [
        "هر دو `1`",
        "Both `1`",
      ],
      [
        "هر دو `0`",
        "Both `0`",
      ],
      [
        "ESM: `0`؛ CJS: `1`",
        "ESM: `0`; CJS: `1`",
      ],
    ],
    a: [
      "importهای ESM ارجاع زنده به binding ماژول مبدأ هستند. در CJS، `const { count } = require(...)` مقدار primitive را در آن لحظه کپی می‌کند.",
      "ESM imports are live references to the exporting module's binding. In CJS, `const { count } = require(...)` copies the primitive value at that moment.",
    ],
  },
  {
    id: "node-s-module-register-hooks",
    level: "senior",
    tags: ["esm", "modules"],
    q: [
      "API `module.register()` در Node برای چیست؟",
      "What is Node's `module.register()` API for?",
    ],
    options: [
      [
        "ثبت hookهای `resolve` و `load` برای سفارشی‌سازی resolution و بارگذاری ESM",
        "Registering `resolve` and `load` hooks to customize ESM resolution and loading",
      ],
      [
        "ثبت یک پکیج در رجیستری npm",
        "Registering a package in the npm registry",
      ],
      [
        "افزودن یک ماژول به `require.cache` به‌صورت دستی",
        "Manually inserting a module into `require.cache`",
      ],
      [
        "تعریف alias برای ماژول‌های core",
        "Defining aliases for core modules",
      ],
    ],
    a: [
      "loader hookها اجازه می‌دهند مثلاً TypeScript را on-the-fly تبدیل یا specifierها را بازنویسی کنید؛ ابزارهایی مثل `tsx` از همین مکانیزم استفاده می‌کنند. hookها روی یک thread جداگانه اجرا می‌شوند.",
      "Loader hooks let you transpile TypeScript on the fly or rewrite specifiers; tools like `tsx` use this mechanism. The hooks run on a separate thread.",
    ],
  },
  {
    id: "node-s-http-timeouts",
    level: "senior",
    tags: ["http", "security"],
    q: [
      "کدام تنظیمات سرور HTTP در Node برای مقابله با حملات Slowloris (ارسال بسیار آهسته هدرها) مرتبط‌اند؟",
      "Which Node HTTP server settings mitigate Slowloris attacks (very slow header sending)?",
    ],
    options: [
      [
        "`server.headersTimeout` و `server.requestTimeout`",
        "`server.headersTimeout` and `server.requestTimeout`",
      ],
      [
        "`UV_THREADPOOL_SIZE` و `--max-old-space-size`",
        "`UV_THREADPOOL_SIZE` and `--max-old-space-size`",
      ],
      [
        "`server.maxListeners` و `server.highWaterMark`",
        "`server.maxListeners` and `server.highWaterMark`",
      ],
      [
        "`process.setMaxListeners` و `server.unref()`",
        "`process.setMaxListeners` and `server.unref()`",
      ],
    ],
    a: [
      "`headersTimeout` زمان مجاز برای دریافت کامل هدرها و `requestTimeout` زمان کل دریافت درخواست را محدود می‌کند تا اتصال‌های کند منابع را اشغال نکنند. در production معمولاً reverse proxy هم این محدودیت‌ها را دارد.",
      "`headersTimeout` caps the time to receive headers and `requestTimeout` caps receiving the whole request, so slow connections can't hog resources. In production a reverse proxy usually enforces these too.",
    ],
  },
  {
    id: "node-s-operational-vs-programmer",
    level: "senior",
    tags: ["errors", "architecture"],
    q: [
      "تفاوت مدیریت خطای operational و programmer error در Node چیست؟",
      "How should operational errors and programmer errors be handled differently in Node?",
    ],
    options: [
      [
        "خطای operational (مثل timeout شبکه) را مدیریت و ادامه دهید؛ باگ برنامه را log و process را restart کنید",
        "Handle operational errors (e.g. network timeouts) and continue; log bugs and restart",
      ],
      [
        "هر دو را با `try/catch` بگیرید و همیشه ادامه دهید",
        "Catch both with `try/catch` and always continue",
      ],
      [
        "برای هر دو بلافاصله process را kill کنید",
        "Kill the process immediately for both",
      ],
      [
        "خطاهای operational را نادیده بگیرید و فقط باگ‌ها را log کنید",
        "Ignore operational errors and log only bugs",
      ],
    ],
    a: [
      "خطاهای operational قابل پیش‌بینی‌اند (retry، پاسخ 503 و...). باگ‌هایی مثل `undefined is not a function` state را نامعتبر می‌کنند و بازیابی امن نیست؛ fail-fast و restart توسط supervisor بهتر است.",
      "Operational errors are expected (retry, return 503, etc.). Bugs like `undefined is not a function` leave state invalid and can't be safely recovered; fail fast and let a supervisor restart.",
    ],
  },
  {
    id: "node-s-domain-deprecated",
    level: "senior",
    tags: ["errors", "legacy"],
    q: [
      "چرا ماژول `domain` برای گرفتن خطاهای async در کد جدید توصیه نمی‌شود؟",
      "Why is the `domain` module not recommended for catching async errors in new code?",
    ],
    options: [
      [
        "deprecated است و مشکلات طراحی دارد؛ جایگزین‌ها Promise، `AsyncLocalStorage` و مدیریت خطای صریح‌اند",
        "It's deprecated with design flaws; use Promises, `AsyncLocalStorage` and explicit handling",
      ],
      [
        "فقط روی سیستم‌عامل‌های Unix کار می‌کند",
        "It only works on Unix systems",
      ],
      [
        "در Node 12 کاملاً حذف شده و import آن خطا می‌دهد",
        "It was fully removed in Node 12 and importing it throws",
      ],
      [
        "فقط خطاهای همگام را می‌گیرد",
        "It only catches synchronous errors",
      ],
    ],
    a: [
      "`domain` سال‌هاست deprecated است: خطاها را به‌صورت ضمنی می‌بلعد و ادامه کار پس از خطای ناشناخته state را ناسازگار می‌کند. هنوز وجود دارد ولی نباید در کد جدید استفاده شود.",
      "`domain` has been deprecated for years: it swallows errors implicitly, and continuing after unknown failures leaves inconsistent state. It still exists but shouldn't be used in new code.",
    ],
  },
  {
    id: "node-s-timer-unref",
    level: "senior",
    tags: ["timers", "process"],
    q: [
      "یک کتابخانه metrics هر ۱۰ ثانیه با `setInterval` داده ارسال می‌کند و باعث می‌شود اسکریپت‌های CLI هرگز خارج نشوند. راه‌حل درست در خود کتابخانه چیست؟",
      "A metrics library flushes every 10s with `setInterval`, preventing CLI scripts from exiting. What's the proper fix inside the library?",
    ],
    options: [
      [
        "صدا زدن `.unref()` روی interval تا process را زنده نگه ندارد",
        "Call `.unref()` on the interval so it doesn't keep the process alive",
      ],
      [
        "تبدیل `setInterval` به `setImmediate` بازگشتی",
        "Replace `setInterval` with a recursive `setImmediate`",
      ],
      [
        "فراخوانی `process.exit()` بعد از هر ارسال metrics",
        "Call `process.exit()` after each metrics flush",
      ],
      [
        "افزایش فاصله interval به ۱ ساعت",
        "Increase the interval to one hour",
      ],
    ],
    a: [
      "timerهای unref‌شده تا وقتی کار دیگری هست اجرا می‌شوند ولی به‌تنهایی مانع خروج نمی‌شوند. معمولاً همراه با یک flush نهایی در `beforeExit` استفاده می‌شود.",
      "Unref'd timers still fire while other work exists but won't keep the process alive alone. Typically paired with a final flush on `beforeExit`.",
    ],
  },
  {
    id: "node-s-abort-signal-any",
    level: "senior",
    tags: ["abort-controller", "async"],
    q: [
      "یک query باید هم با قطع اتصال کلاینت و هم با timeout ده‌ثانیه‌ای لغو شود. تمیزترین روش چیست؟",
      "A query must cancel on either client disconnect or a 10s timeout. What's the cleanest approach?",
    ],
    options: [
      [
        "`AbortSignal.any([reqSignal, AbortSignal.timeout(10000)])`",
        "`AbortSignal.any([reqSignal, AbortSignal.timeout(10000)])`",
      ],
      [
        "ارسال دو signal جداگانه در دو پارامتر `signal`",
        "Passing two separate signals as two `signal` options",
      ],
      [
        "`Promise.race` بین query و timer بدون signal",
        "`Promise.race` between the query and a timer, no signal",
      ],
      [
        "`new AbortController({ timeout: 10000 })`",
        "`new AbortController({ timeout: 10000 })`",
      ],
    ],
    a: [
      "`AbortSignal.any` یک signal ترکیبی می‌سازد که با abort شدن هر یک از ورودی‌ها abort می‌شود و `reason` همان signal را دارد. `AbortController` گزینه timeout ندارد و `Promise.race` کار زیرین را لغو نمی‌کند.",
      "`AbortSignal.any` builds a combined signal that aborts when any input does, carrying that input's `reason`. `AbortController` has no timeout option and `Promise.race` doesn't cancel the underlying work.",
    ],
  },
  {
    id: "node-s-mock-timers",
    level: "senior",
    tags: ["testing", "timers"],
    q: [
      "برای تست منطق retry با backoff سی‌ثانیه‌ای در `node:test` بدون انتظار واقعی چه می‌کنید؟",
      "In `node:test`, how do you test retry logic with a 30s backoff without real waiting?",
    ],
    options: [
      [
        "`mock.timers.enable()` و جلو بردن زمان با `mock.timers.tick(30000)`",
        "`mock.timers.enable()` and advance time with `mock.timers.tick(30000)`",
      ],
      [
        "تنظیم `--test-timeout=0` تا تست سریع‌تر اجرا شود",
        "Set `--test-timeout=0` so the test runs faster",
      ],
      [
        "override کردن `Date.now` به‌تنهایی که `setTimeout` را هم سریع می‌کند",
        "Override `Date.now` alone, which also speeds up `setTimeout`",
      ],
      [
        "اجرای تست روی worker thread که timerها را نادیده می‌گیرد",
        "Run the test on a worker thread that skips timers",
      ],
    ],
    a: [
      "fake timerها `setTimeout`/`setInterval` (و در صورت فعال‌سازی `Date`) را جایگزین می‌کنند تا زمان به‌صورت قطعی جلو برود. تغییر `Date.now` روی زمان‌بندی timerهای واقعی اثری ندارد. معادل آن در Jest، `jest.useFakeTimers()` است.",
      "Fake timers replace `setTimeout`/`setInterval` (and `Date` if enabled) so time advances deterministically. Changing `Date.now` doesn't affect real timer scheduling. Jest's equivalent is `jest.useFakeTimers()`.",
    ],
  },
  {
    id: "node-s-test-isolation",
    level: "senior",
    tags: ["testing", "modules"],
    q: [
      "تست‌ها به‌تنهایی پاس می‌شوند ولی وقتی با هم در یک process اجرا شوند شکست می‌خورند. محتمل‌ترین علت چیست؟",
      "Tests pass individually but fail when run together in one process. What's the most likely cause?",
    ],
    options: [
      [
        "state مشترک در ماژول‌های cache‌شده (singletonها، mockهای پاک‌نشده) بین تست‌ها نشت می‌کند",
        "Shared state in cached modules (singletons, un-restored mocks) leaks between tests",
      ],
      [
        "Node در هر process فقط می‌تواند یک فایل تست اجرا کند",
        "Node can only run one test file per process",
      ],
      [
        "V8 تست‌های پشت سر هم را JIT نمی‌کند",
        "V8 refuses to JIT consecutive tests",
      ],
      [
        "thread pool بین تست‌ها reset نمی‌شود و فایل‌ها قفل می‌مانند",
        "The thread pool doesn't reset, so files stay locked",
      ],
    ],
    a: [
      "چون ماژول‌ها cache می‌شوند، تغییر state در یک تست به تست بعدی منتقل می‌شود. راه‌حل: reset در `beforeEach`/`afterEach`، `mock.restoreAll()` یا اجرای فایل‌ها در processهای جدا (پیش‌فرض `node --test`).",
      "Because modules are cached, state mutated by one test carries into the next. Fix with resets in `beforeEach`/`afterEach`, `mock.restoreAll()`, or per-file process isolation (the `node --test` default).",
    ],
  },
  {
    id: "node-s-fastify-encapsulation",
    level: "senior",
    tags: ["fastify", "architecture"],
    q: [
      "در Fastify، چرا decorator ثبت‌شده داخل یک plugin در plugin هم‌سطح دیگر دیده نمی‌شود؟",
      "In Fastify, why isn't a decorator registered inside one plugin visible in a sibling plugin?",
    ],
    options: [
      [
        "هر plugin یک context کپسوله دارد؛ برای اشتراک باید از `fastify-plugin` استفاده کرد",
        "Each plugin gets an encapsulated context; use `fastify-plugin` to share it",
      ],
      [
        "decoratorها فقط پس از `listen` فعال می‌شوند",
        "Decorators activate only after `listen`",
      ],
      [
        "Fastify فقط یک decorator در کل برنامه مجاز می‌داند",
        "Fastify allows only one decorator per application",
      ],
      [
        "pluginها روی worker threadهای جداگانه اجرا می‌شوند",
        "Plugins run on separate worker threads",
      ],
    ],
    a: [
      "encapsulation در Fastify اجازه می‌دهد hookها، decoratorها و تنظیمات هر بخش ایزوله باشند. `fastify-plugin` این مرز را برمی‌دارد تا چیزهایی مثل اتصال دیتابیس به context والد اضافه شوند.",
      "Fastify's encapsulation keeps each subtree's hooks, decorators and settings isolated. `fastify-plugin` removes that boundary so things like a DB connection attach to the parent context.",
    ],
  },
  {
    id: "node-s-async-stack-traces",
    level: "senior",
    tags: ["debugging", "async-await"],
    q: [
      "چرا stack trace خطا در زنجیره `async/await` معمولاً توابع فراخوان را نشان می‌دهد، ولی در زنجیره callback یا `.then` دستی اغلب نه؟",
      "Why do error stack traces through `async/await` usually show callers, while manual callback or `.then` chains often don't?",
    ],
    options: [
      [
        "V8 «zero-cost async stack traces» را فقط برای frameهای `await` بازسازی می‌کند",
        "V8 reconstructs 'zero-cost async stack traces' only across `await` frames",
      ],
      [
        "callbackها روی thread جداگانه اجرا می‌شوند و stack ندارند",
        "Callbacks run on another thread and have no stack",
      ],
      [
        "Node stack trace را برای callbackها به‌منظور امنیت حذف می‌کند",
        "Node strips callback stacks for security",
      ],
      [
        "`.then` همیشه همگام اجرا می‌شود و stack را overwrite می‌کند",
        "`.then` always runs synchronously and overwrites the stack",
      ],
    ],
    a: [
      "در `await`، V8 می‌تواند از روی Promise در حال انتظار، تابع async فراخوان را پیدا کند و frameهای `at async ...` را اضافه کند. در callbackها اطلاعات فراخوان پس از خالی شدن stack از دست رفته است؛ یکی از دلایل ترجیح `async/await`.",
      "With `await`, V8 can walk from the awaited Promise to the suspended async caller and add `at async ...` frames. For callbacks the caller's info is gone once the stack unwinds, one more reason to prefer `async/await`.",
    ],
  },
  {
    id: "node-s-crypto-sync-block",
    level: "senior",
    tags: ["performance", "crypto"],
    q: [
      "endpoint لاگین از `crypto.pbkdf2Sync` با ۶۰۰ هزار iteration استفاده می‌کند و throughput کل سرور سقوط کرده است. بهترین اصلاح چیست؟",
      "A login endpoint uses `crypto.pbkdf2Sync` with 600k iterations and overall throughput collapsed. Best fix?",
    ],
    options: [
      [
        "استفاده از `crypto.pbkdf2` غیرهمگام (thread pool) و تنظیم اندازه pool و rate limit",
        "Use async `crypto.pbkdf2` (thread pool), tune pool size and add rate limiting",
      ],
      [
        "کاهش iteration به ۱۰۰ تا سریع‌تر شود",
        "Drop iterations to 100 to make it faster",
      ],
      [
        "پیچیدن `pbkdf2Sync` داخل `Promise.resolve().then`",
        "Wrap `pbkdf2Sync` inside `Promise.resolve().then`",
      ],
      [
        "cache کردن hash بر اساس رمز عبور متن ساده در حافظه",
        "Cache hashes in memory keyed by plaintext password",
      ],
    ],
    a: [
      "نسخه Sync کل main thread را مسدود می‌کند؛ نسخه async روی libuv thread pool اجرا می‌شود. کاهش iteration امنیت را از بین می‌برد و microtask کار را همچنان روی main thread اجرا می‌کند. rate limit جلوی DoS از طریق endpoint پرهزینه را می‌گیرد.",
      "The Sync version blocks the main thread; the async one runs on the libuv pool. Fewer iterations kills security, and a microtask still runs on the main thread. Rate limiting prevents DoS through the expensive endpoint.",
    ],
  },
  {
    id: "node-s-pid1-signals",
    level: "senior",
    tags: ["containers", "signals"],
    q: [
      "در Docker، چرا `CMD npm start` ممکن است باعث شود handler مربوط به `SIGTERM` در برنامه Node هرگز اجرا نشود؟",
      "In Docker, why might `CMD npm start` cause a Node app's `SIGTERM` handler to never run?",
    ],
    options: [
      [
        "npm یا shell به‌عنوان PID 1 سیگنال را به‌درستی به process فرزند Node منتقل نمی‌کند",
        "npm or a shell as PID 1 may not forward the signal to the child Node process",
      ],
      [
        "Docker سیگنال‌ها را فقط به processهای Python ارسال می‌کند",
        "Docker only sends signals to Python processes",
      ],
      [
        "`npm start` سیگنال‌ها را به `SIGKILL` تبدیل می‌کند",
        "`npm start` converts every signal into `SIGKILL`",
      ],
      [
        "Node داخل container از سیگنال‌ها پشتیبانی نمی‌کند",
        "Node doesn't support signals inside containers",
      ],
    ],
    a: [
      "PID 1 رفتار ویژه‌ای در kernel دارد و wrapperهایی مثل npm یا `sh -c` سیگنال را همیشه forward نمی‌کنند؛ پس از grace period، container با SIGKILL بسته می‌شود. راه‌حل: `CMD [\"node\", \"server.js\"]` یا init سبک مثل `tini` (`--init`).",
      "PID 1 is special to the kernel, and wrappers like npm or `sh -c` don't always forward signals, so after the grace period the container is SIGKILLed. Fix with `CMD [\"node\", \"server.js\"]` or a tiny init like `tini` (`--init`).",
    ],
  },
  {
    id: "node-s-large-json-response",
    level: "senior",
    tags: ["performance", "streams"],
    q: [
      "یک endpoint گزارش، ۵۰۰ هزار ردیف را از دیتابیس می‌خواند و با `res.json(rows)` می‌فرستد. حافظه و تأخیر بالاست. بهترین بازطراحی چیست؟",
      "A report endpoint loads 500k DB rows and sends them with `res.json(rows)`. Memory and latency spike. Best redesign?",
    ],
    options: [
      [
        "خواندن با cursor و stream کردن خروجی (مثلاً NDJSON) با `pipeline` و backpressure",
        "Read via a cursor and stream output (e.g. NDJSON) through `pipeline` with backpressure",
      ],
      [
        "افزایش `--max-old-space-size` تا داده جا شود",
        "Raise `--max-old-space-size` until the data fits",
      ],
      [
        "اجرای `JSON.stringify` داخل `setImmediate`",
        "Run `JSON.stringify` inside `setImmediate`",
      ],
      [
        "فشرده‌سازی پاسخ با gzip همگام پیش از ارسال",
        "Synchronously gzip the response before sending",
      ],
    ],
    a: [
      "بار کردن همه ردیف‌ها و stringify یک‌جا هم حافظه را منفجر می‌کند و هم event loop را مسدود. stream کردن، حافظه را ثابت نگه می‌دارد و اولین بایت زودتر به کلاینت می‌رسد. pagination هم جایگزین خوبی است.",
      "Loading every row and stringifying at once both blows up memory and blocks the loop. Streaming keeps memory flat and gets the first byte out sooner. Pagination is also a good alternative.",
    ],
  },
  {
    id: "node-s-esm-tick-order",
    level: "senior",
    tags: ["event-loop", "esm", "microtasks"],
    q: [
      "در یک فایل ESM (`.mjs`)، خروجی `process.nextTick(() => console.log('n')); Promise.resolve().then(() => console.log('p')); console.log('s');` چیست؟",
      "In an ESM file (`.mjs`), what does `process.nextTick(() => console.log('n')); Promise.resolve().then(() => console.log('p')); console.log('s');` print?",
    ],
    options: [
      ["`s p n`", "`s p n`"],
      ["`s n p`", "`s n p`"],
      ["`n p s`", "`n p s`"],
      ["`p s n`", "`p s n`"],
    ],
    a: [
      "ارزیابی ماژول ESM خودش بخشی از یک کار غیرهمگام (microtask) است، پس پس از کد همگام، V8 ابتدا صف microtask را خالی می‌کند و صف `nextTick` بعد از آن پردازش می‌شود. در CommonJS خروجی `s n p` است.",
      "ESM module evaluation itself runs as part of async (microtask) work, so after the sync code V8 drains the microtask queue first and the `nextTick` queue comes after. In CommonJS the output is `s n p`.",
    ],
  },
  {
    id: "node-s-hidden-classes-delete",
    level: "senior",
    tags: ["v8", "performance"],
    q: [
      "چرا `delete obj.prop` در یک مسیر داغ (hot path) ممکن است کد را به‌طور محسوسی کند کند؟",
      "Why can `delete obj.prop` in a hot path noticeably slow code down?",
    ],
    options: [
      [
        "شیء را از hidden class سریع به حالت dictionary می‌برد و inline cacheها را بی‌اثر می‌کند",
        "It moves the object from a fast hidden class to dictionary mode, defeating inline caches",
      ],
      [
        "`delete` بلافاصله یک full GC همگام را اجرا می‌کند",
        "`delete` triggers an immediate synchronous full GC",
      ],
      [
        "`delete` property را روی همه نمونه‌های آن کلاس پاک می‌کند",
        "`delete` removes the property from every instance of the class",
      ],
      [
        "`delete` روی thread pool اجرا می‌شود و منتظر صف می‌ماند",
        "`delete` runs on the thread pool and waits in its queue",
      ],
    ],
    a: [
      "V8 اشیای هم‌شکل را با hidden class (shape) مشترک بهینه می‌کند. حذف property معمولاً شیء را به dictionary mode می‌برد؛ بهتر است مقدار را `undefined` کنید یا شکل شیء را ثابت نگه دارید.",
      "V8 optimizes same-shaped objects via shared hidden classes (shapes). Deleting a property usually drops the object into dictionary mode; prefer setting it to `undefined` or keeping shapes stable.",
    ],
  },
  {
    id: "node-s-inspect-exposure",
    level: "senior",
    tags: ["security", "debugging"],
    q: [
      "چرا اجرای `node --inspect=0.0.0.0:9229` روی سرور production خطرناک است؟",
      "Why is running `node --inspect=0.0.0.0:9229` on a production server dangerous?",
    ],
    options: [
      [
        "هر کسی که به پورت دسترسی داشته باشد می‌تواند کد دلخواه را داخل process اجرا کند",
        "Anyone who can reach the port can execute arbitrary code inside the process",
      ],
      [
        "inspector فقط خواندنی است ولی کمی CPU مصرف می‌کند",
        "The inspector is read-only and only costs a little CPU",
      ],
      [
        "inspector باعث می‌شود همه لاگ‌ها به stdout نوشته نشوند",
        "The inspector stops all logs from reaching stdout",
      ],
      [
        "process را مجبور می‌کند تا اتصال debugger منتظر بماند و شروع نشود",
        "It forces the process to wait for a debugger before starting",
      ],
    ],
    a: [
      "پروتکل inspector احراز هویت ندارد و امکان `Runtime.evaluate` می‌دهد، یعنی RCE کامل. باید روی `127.0.0.1` (پیش‌فرض) bind شود و از طریق SSH tunnel دسترسی گرفت. منتظر ماندن برای debugger رفتار `--inspect-brk` است.",
      "The inspector protocol has no auth and allows `Runtime.evaluate`, which is full RCE. Keep it bound to `127.0.0.1` (the default) and reach it via an SSH tunnel. Waiting for a debugger is `--inspect-brk` behavior.",
    ],
  },
  {
    id: "node-s-worker-pool-reuse",
    level: "senior",
    tags: ["worker-threads", "performance"],
    q: [
      "سرویسی برای هر درخواست یک `new Worker(...)` جدید می‌سازد و تأخیر و مصرف حافظه بالاست. بهترین اصلاح چیست؟",
      "A service creates a `new Worker(...)` per request and sees high latency and memory. Best fix?",
    ],
    options: [
      [
        "استفاده از یک worker pool با اندازه ثابت (مثلاً piscina) و ارسال taskها به آن",
        "Use a fixed-size worker pool (e.g. piscina) and dispatch tasks to it",
      ],
      [
        "ساخت worker با `eval: true` تا سریع‌تر بار شود",
        "Create workers with `eval: true` so they load faster",
      ],
      [
        "افزایش `UV_THREADPOOL_SIZE` تا workerها در آن اجرا شوند",
        "Raise `UV_THREADPOOL_SIZE` so workers run inside it",
      ],
      [
        "تبدیل workerها به `setImmediate` روی main thread",
        "Replace workers with `setImmediate` on the main thread",
      ],
    ],
    a: [
      "هر worker یک V8 isolate و event loop کامل با چند ده میلی‌ثانیه زمان startup و چند مگابایت حافظه دارد. pool این هزینه را یک بار می‌پردازد و هم‌زمانی را به تعداد هسته‌ها محدود می‌کند. workerها ربطی به thread pool در libuv ندارند.",
      "Each worker is a full V8 isolate and event loop costing tens of ms to start and several MB of memory. A pool pays that once and caps concurrency near the core count. Workers are unrelated to the libuv thread pool.",
    ],
  },
]);
