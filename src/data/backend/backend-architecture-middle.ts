import { build } from "../build";

export const backendArchitectureMiddle = build("backend-architecture", [
  {
    id: "arch-m-circuit-breaker-states",
    level: "middle",
    tags: ["resilience", "circuit-breaker"],
    q: [
      "سه حالت یک circuit breaker کدام‌اند؟",
      "What are the three states of a circuit breaker?",
    ],
    options: [
      ["Closed، Open و Half-Open", "Closed, Open, and Half-Open"],
      ["Active، Passive و Standby", "Active, Passive, and Standby"],
      ["Pending، Running و Done", "Pending, Running, and Done"],
      ["Healthy، Degraded و Dead", "Healthy, Degraded, and Dead"],
    ],
    a: [
      "در Closed درخواست‌ها عبور می‌کنند و خطاها شمرده می‌شوند؛ با عبور از آستانه به Open می‌رود و سریع fail می‌کند؛ بعد از مدتی Half-Open چند درخواست آزمایشی را عبور می‌دهد.",
      "In Closed, calls pass and failures are counted; past a threshold it goes Open and fails fast; after a cooldown, Half-Open lets a few trial calls through.",
    ],
  },
  {
    id: "arch-m-half-open",
    level: "middle",
    tags: ["resilience", "circuit-breaker"],
    q: [
      "در حالت Half-Open اگر درخواست آزمایشی fail شود چه می‌شود؟",
      "In the Half-Open state, what happens if a trial request fails?",
    ],
    options: [
      ["breaker دوباره به Open برمی‌گردد و تایمر cooldown از نو شروع می‌شود", "The breaker returns to Open and the cooldown timer restarts"],
      ["breaker به Closed می‌رود و همه ترافیک عبور می‌کند", "The breaker goes Closed and all traffic flows"],
      ["سرویس فراخواننده restart می‌شود", "The calling service is restarted"],
      ["breaker برای همیشه Open می‌ماند تا مداخله دستی", "The breaker stays Open forever until manual intervention"],
    ],
    a: [
      "Half-Open یک probe کنترل‌شده است: موفقیت‌ها breaker را Closed می‌کنند و شکست آن را دوباره Open می‌کند. این کار از هجوم ناگهانی ترافیک به سرویسی که هنوز بهبود نیافته جلوگیری می‌کند.",
      "Half-Open is a controlled probe: successes close the breaker and a failure reopens it. This prevents a sudden flood of traffic onto a service that hasn't recovered.",
    ],
  },
  {
    id: "arch-m-bulkhead",
    level: "middle",
    tags: ["resilience", "bulkhead"],
    q: [
      "الگوی Bulkhead چه کاری انجام می‌دهد؟",
      "What does the Bulkhead pattern do?",
    ],
    options: [
      ["منابع (مثل thread pool یا connection pool) را برای هر وابستگی جدا می‌کند تا خرابی یکی همه را از کار نیندازد", "Partitions resources (thread or connection pools) per dependency so one failure can't exhaust all"],
      ["همه درخواست‌ها را از یک pool مشترک سرویس می‌دهد تا بهره‌وری بالا برود", "Serves all requests from one shared pool to maximize utilization"],
      ["درخواست‌های ناموفق را به‌صورت خودکار retry می‌کند", "Automatically retries failed requests"],
      ["ترافیک را بین چند region توزیع می‌کند", "Distributes traffic across regions"],
    ],
    a: [
      "نام آن از دیواره‌های جداکننده کشتی آمده است. اگر سرویس پرداخت کند شود، فقط pool مخصوص آن پر می‌شود و درخواست‌های مربوط به سایر وابستگی‌ها همچنان پاسخ می‌گیرند.",
      "The name comes from a ship's watertight compartments. If the payment service slows down, only its dedicated pool fills up, and calls to other dependencies keep working.",
    ],
  },
  {
    id: "arch-m-retry-jitter",
    level: "middle",
    tags: ["resilience", "retries"],
    q: [
      "چرا به exponential backoff معمولاً jitter (تصادفی‌سازی) اضافه می‌کنند؟",
      "Why is jitter (randomization) usually added to exponential backoff?",
    ],
    options: [
      ["تا کلاینت‌ها هم‌زمان retry نکنند و موج‌های همزمان (thundering herd) ایجاد نشود", "So clients don't retry in lockstep and create synchronized waves (thundering herd)"],
      ["تا تعداد کل retryها بی‌نهایت شود", "So the total number of retries becomes unlimited"],
      ["تا timeout هر درخواست کوتاه‌تر شود", "So each request's timeout gets shorter"],
      ["تا ترتیب پردازش درخواست‌ها حفظ شود", "So request processing order is preserved"],
    ],
    a: [
      "اگر هزاران کلاینت هم‌زمان fail شوند و با فاصله‌های یکسان retry کنند، همه با هم برمی‌گردند. jitter این retryها را در زمان پخش می‌کند و بار را صاف‌تر می‌کند.",
      "If thousands of clients fail together and retry on identical schedules, they all return at once. Jitter spreads retries over time and smooths the load.",
    ],
  },
  {
    id: "arch-m-idempotency-key",
    level: "middle",
    tags: ["idempotency", "retries"],
    q: [
      "برای retry امن یک endpoint `POST /payments` چه راهکاری مناسب است؟",
      "What is a good way to make retrying `POST /payments` safe?",
    ],
    options: [
      ["کلاینت یک `Idempotency-Key` می‌فرستد و سرور نتیجه را برای همان کلید ذخیره و تکرار می‌کند", "The client sends an `Idempotency-Key` and the server stores and replays the result for that key"],
      ["سرور هر درخواست تکراری را با خطای 500 رد کند", "The server rejects every duplicate with a 500 error"],
      ["متد را به `GET` تغییر دهیم چون GET همیشه امن است", "Change the method to `GET` because GET is always safe"],
      ["timeout کلاینت را بی‌نهایت کنیم تا retry لازم نشود", "Make the client timeout infinite so retries are never needed"],
    ],
    a: [
      "وقتی timeout رخ می‌دهد کلاینت نمی‌داند پرداخت انجام شده یا نه. با idempotency key، سرور درخواست تکراری را تشخیص می‌دهد و همان پاسخ قبلی را بدون شارژ مجدد برمی‌گرداند.",
      "After a timeout the client can't tell whether the payment happened. With an idempotency key, the server detects the duplicate and returns the original response without charging again.",
    ],
  },
  {
    id: "arch-m-cascading-failure",
    level: "middle",
    tags: ["resilience"],
    q: [
      "کدام مورد یک علت رایج cascading failure است؟",
      "Which is a common cause of cascading failure?",
    ],
    options: [
      ["کندی یک سرویس پایین‌دستی که threadهای فراخوانندگان بدون timeout را پر می‌کند", "A slow downstream service filling up callers' threads that have no timeouts"],
      ["استفاده از structured logging در همه سرویس‌ها", "Using structured logging in every service"],
      ["داشتن readiness probe برای هر pod", "Having a readiness probe on every pod"],
      ["deploy سرویس‌ها با rolling update", "Deploying services with rolling updates"],
    ],
    a: [
      "خرابی یا کندی یک سرویس به فراخوانندگانش منتقل می‌شود و آن‌ها هم از کار می‌افتند و این زنجیره ادامه پیدا می‌کند. timeout، circuit breaker، bulkhead و load shedding این زنجیره را قطع می‌کنند.",
      "A failing or slow service propagates to its callers, which then fail too, and the chain continues. Timeouts, circuit breakers, bulkheads, and load shedding break the chain.",
    ],
  },
  {
    id: "arch-m-fallback",
    level: "middle",
    tags: ["resilience"],
    q: [
      "کدام یک مثال مناسبی از الگوی fallback است؟",
      "Which is a good example of the fallback pattern?",
    ],
    options: [
      ["برگرداندن قیمت کش‌شده قبلی وقتی سرویس قیمت‌گذاری در دسترس نیست", "Returning the last cached price when the pricing service is unavailable"],
      ["retry بی‌نهایت تا وقتی سرویس جواب بدهد", "Retrying forever until the service responds"],
      ["برگرداندن خطای 500 به کاربر بدون توضیح", "Returning a bare 500 error to the user"],
      ["افزایش timeout به چند دقیقه", "Raising the timeout to several minutes"],
    ],
    a: [
      "fallback یک پاسخ جایگزین معقول ارائه می‌دهد: داده کش‌شده، مقدار پیش‌فرض یا قابلیت محدودتر. باید بررسی شود که پاسخ قدیمی برای آن مورد کسب‌وکاری قابل قبول است.",
      "A fallback provides a reasonable substitute: cached data, a default value, or reduced functionality. You must confirm stale data is acceptable for that business case.",
    ],
  },
  {
    id: "arch-m-l4-vs-l7",
    level: "middle",
    tags: ["load-balancing"],
    q: [
      "تفاوت load balancer لایه ۴ و لایه ۷ چیست؟",
      "What is the difference between a Layer 4 and a Layer 7 load balancer?",
    ],
    options: [
      ["L4 بر اساس IP/پورت TCP/UDP تصمیم می‌گیرد؛ L7 محتوای HTTP مثل path و header را می‌بیند", "L4 routes on IP/port at TCP/UDP level; L7 inspects HTTP content like path and headers"],
      ["L4 محتوای HTTP را می‌خواند؛ L7 فقط IP را می‌بیند", "L4 reads HTTP content; L7 only sees IPs"],
      ["L7 همیشه سریع‌تر از L4 است چون اطلاعات بیشتری دارد", "L7 is always faster than L4 because it has more information"],
      ["L4 فقط برای دیتابیس و L7 فقط برای cache است", "L4 is only for databases and L7 only for caches"],
    ],
    a: [
      "L4 سریع و ساده است ولی نمی‌تواند بر اساس URL route کند. L7 (مثل Nginx یا ALB) امکان path-based routing، TLS termination و header manipulation را دارد ولی سربار بیشتری دارد.",
      "L4 is fast and simple but can't route by URL. L7 (like Nginx or an ALB) supports path-based routing, TLS termination, and header manipulation at higher overhead.",
    ],
  },
  {
    id: "arch-m-least-connections",
    level: "middle",
    tags: ["load-balancing"],
    q: [
      "در چه شرایطی least connections از round robin بهتر عمل می‌کند؟",
      "When does least connections outperform round robin?",
    ],
    options: [
      ["وقتی مدت پردازش درخواست‌ها بسیار متفاوت است یا اتصال‌ها طولانی‌اند", "When request durations vary widely or connections are long-lived"],
      ["وقتی همه درخواست‌ها دقیقاً هزینه یکسانی دارند", "When all requests have exactly the same cost"],
      ["وقتی فقط یک سرور پشت load balancer وجود دارد", "When there is only one server behind the balancer"],
      ["وقتی سرورها stateful نیستند", "When servers are not stateful"],
    ],
    a: [
      "round robin ممکن است درخواست‌های سنگین را به سروری بدهد که هنوز درگیر کارهای قبلی است. least connections بار واقعی فعلی را در نظر می‌گیرد، مثلاً برای WebSocket یا درخواست‌های طولانی.",
      "Round robin may send heavy requests to a server still busy with earlier ones. Least connections considers current load, which helps with WebSockets or long requests.",
    ],
  },
  {
    id: "arch-m-liveness-deps",
    level: "middle",
    tags: ["health-checks", "kubernetes"],
    q: [
      "چرا liveness probe معمولاً نباید سلامت دیتابیس یا سرویس‌های پایین‌دستی را چک کند؟",
      "Why should a liveness probe usually not check the database or downstream services?",
    ],
    options: [
      ["چون قطعی دیتابیس باعث restart بی‌فایده همه podها می‌شود و مشکل را بدتر می‌کند", "Because a DB outage would restart every pod uselessly and worsen the incident"],
      ["چون Kubernetes اجازه اتصال به دیتابیس از probe را نمی‌دهد", "Because Kubernetes forbids database connections from probes"],
      ["چون liveness فقط یک بار هنگام startup اجرا می‌شود", "Because liveness runs only once at startup"],
      ["چون چک کردن دیتابیس همیشه بیش از ۱۰ ثانیه طول می‌کشد", "Because checking the database always takes over 10 seconds"],
    ],
    a: [
      "restart کردن pod مشکل دیتابیس را حل نمی‌کند و فقط بار startup اضافه و crash loop ایجاد می‌کند. liveness فقط باید سلامت خود process را بسنجد؛ وابستگی‌ها در صورت نیاز در readiness بررسی شوند.",
      "Restarting pods won't fix the database; it only adds startup load and crash loops. Liveness should check only the process itself; dependencies, if at all, belong in readiness.",
    ],
  },
  {
    id: "arch-m-graceful-shutdown",
    level: "middle",
    tags: ["deployment", "kubernetes"],
    q: [
      "یک سرویس هنگام دریافت `SIGTERM` در Kubernetes بهتر است چه کند؟",
      "What should a service do when it receives `SIGTERM` in Kubernetes?",
    ],
    options: [
      ["پذیرش درخواست جدید را متوقف کند، درخواست‌های در حال اجرا را تمام کند و سپس خارج شود", "Stop accepting new requests, finish in-flight ones, then exit"],
      ["فوراً با `process.exit(0)` خارج شود", "Exit immediately with `process.exit(0)`"],
      ["سیگنال را نادیده بگیرد تا Kubernetes منصرف شود", "Ignore the signal so Kubernetes gives up"],
      ["همه درخواست‌های در حال اجرا را با خطای 500 پاسخ دهد", "Fail all in-flight requests with a 500"],
    ],
    a: [
      "graceful shutdown از قطع شدن درخواست‌ها هنگام deploy جلوگیری می‌کند. باید قبل از پایان `terminationGracePeriodSeconds` تمام شود، وگرنه `SIGKILL` ارسال می‌شود.",
      "Graceful shutdown prevents dropped requests during deploys. It must complete before `terminationGracePeriodSeconds` elapses, or a `SIGKILL` follows.",
    ],
  },
  {
    id: "arch-m-distributed-monolith",
    level: "middle",
    tags: ["microservices", "anti-patterns"],
    q: [
      "کدام نشانه بیانگر anti-pattern «distributed monolith» است؟",
      "Which symptom indicates the 'distributed monolith' anti-pattern?",
    ],
    options: [
      ["سرویس‌ها باید با هم و هماهنگ deploy شوند و تغییر یکی دیگران را می‌شکند", "Services must be deployed together in lockstep and changing one breaks others"],
      ["هر سرویس دیتابیس و pipeline مستقل خودش را دارد", "Each service has its own database and independent pipeline"],
      ["سرویس‌ها از طریق eventها ارتباط ناهمگام دارند", "Services communicate asynchronously through events"],
      ["هر تیم مالکیت کامل یک سرویس را دارد", "Each team fully owns one service"],
    ],
    a: [
      "distributed monolith هزینه‌های شبکه و عملیات microservices را دارد ولی مزیت استقلال را ندارد. معمولاً ناشی از مرزبندی اشتباه، دیتابیس مشترک یا زنجیره‌های طولانی فراخوانی همگام است.",
      "A distributed monolith pays the network and ops costs of microservices without the independence. It usually stems from wrong boundaries, a shared database, or long synchronous call chains.",
    ],
  },
  {
    id: "arch-m-db-per-service",
    level: "middle",
    tags: ["microservices", "data-ownership"],
    q: [
      "چرا الگوی database-per-service توصیه می‌شود؟",
      "Why is the database-per-service pattern recommended?",
    ],
    options: [
      ["تا هر سرویس مالک داده‌اش باشد و بتواند schema را مستقل تغییر دهد", "So each service owns its data and can evolve its schema independently"],
      ["چون دیتابیس‌های کوچک‌تر همیشه ارزان‌ترند", "Because smaller databases are always cheaper"],
      ["تا JOIN بین داده سرویس‌های مختلف ساده‌تر شود", "To make JOINs across services' data easier"],
      ["چون تراکنش‌های ACID بین سرویس‌ها خودکار می‌شوند", "Because ACID transactions across services become automatic"],
    ],
    a: [
      "دیتابیس مشترک یک coupling پنهان است: تغییر یک ستون می‌تواند سرویس دیگری را بشکند. هزینه آن این است که JOIN و تراکنش بین سرویس‌ها سخت می‌شود و به API یا event نیاز دارد.",
      "A shared database is hidden coupling: changing a column can break another service. The cost is that cross-service joins and transactions become hard and need APIs or events.",
    ],
  },
  {
    id: "arch-m-when-split",
    level: "middle",
    tags: ["microservices", "monolith"],
    q: [
      "کدام دلیل برای جدا کردن یک ماژول از monolith به یک سرویس مستقل منطقی‌تر است؟",
      "Which is the most sensible reason to extract a module from a monolith into its own service?",
    ],
    options: [
      ["نیاز متفاوت به scale یا چرخه deploy مستقل توسط تیمی جدا", "It has distinct scaling needs or an independent deploy cadence owned by a separate team"],
      ["چون microservices مد روز است", "Because microservices are trendy"],
      ["چون کد ماژول بیش از ۱۰۰۰ خط است", "Because the module has more than 1000 lines"],
      ["برای اینکه بتوان از یک فریم‌ورک جدید استفاده کرد", "So a new framework can be tried"],
    ],
    a: [
      "جداسازی باید مسئله واقعی را حل کند: bottleneck در scale، تداخل تیم‌ها در deploy یا نیاز ایزولاسیون خرابی. مرز سرویس بهتر است با bounded context هم‌راستا باشد.",
      "Splitting should solve a real problem: a scaling bottleneck, teams blocking each other's deploys, or fault isolation. The service boundary should align with a bounded context.",
    ],
  },
  {
    id: "arch-m-strangler-fig",
    level: "middle",
    tags: ["migration", "strangler-fig"],
    q: [
      "الگوی Strangler Fig برای مهاجرت از سیستم legacy چگونه کار می‌کند؟",
      "How does the Strangler Fig pattern work for migrating off a legacy system?",
    ],
    options: [
      ["یک لایه routing جلوی legacy قرار می‌گیرد و قابلیت‌ها تدریجی به سیستم جدید منتقل می‌شوند", "A routing layer fronts the legacy system and features are moved to the new system incrementally"],
      ["سیستم legacy یک‌باره خاموش و سیستم جدید در یک شب جایگزین می‌شود", "The legacy system is switched off and replaced overnight"],
      ["کد legacy خط‌به‌خط به زبان جدید ترجمه می‌شود", "Legacy code is translated line by line into a new language"],
      ["دو سیستم برای همیشه موازی اجرا می‌شوند بدون انتقال", "Both systems run in parallel forever with no migration"],
    ],
    a: [
      "به‌جای بازنویسی big-bang پرریسک، هر بار یک endpoint یا قابلیت به سیستم جدید route می‌شود تا legacy کم‌کم «خفه» شود و حذف گردد. rollback هم برای هر قدم ساده است.",
      "Instead of a risky big-bang rewrite, one endpoint or feature at a time is routed to the new system until the legacy is 'strangled' and removed. Each step is easy to roll back.",
    ],
  },
  {
    id: "arch-m-anti-corruption-layer",
    level: "middle",
    tags: ["ddd", "migration"],
    q: [
      "Anti-Corruption Layer (ACL) چه هدفی دارد؟",
      "What is the purpose of an Anti-Corruption Layer (ACL)?",
    ],
    options: [
      ["ترجمه بین مدل یک سیستم خارجی/legacy و مدل دامنه ما تا مدل ما آلوده نشود", "Translating between an external/legacy model and our domain model so ours stays clean"],
      ["جلوگیری از SQL injection در ورودی‌ها", "Preventing SQL injection in inputs"],
      ["رمزنگاری داده‌ها بین سرویس‌ها", "Encrypting data between services"],
      ["حذف خودکار داده‌های خراب از دیتابیس", "Automatically deleting corrupted data from the database"],
    ],
    a: [
      "ACL یک adapter/translator است که مفاهیم و ساختارهای نامناسب سیستم دیگر را به زبان bounded context ما تبدیل می‌کند. در مهاجرت با strangler fig بسیار کاربرد دارد.",
      "An ACL is an adapter/translator that converts another system's awkward concepts and structures into our bounded context's language. It's very useful during strangler-fig migrations.",
    ],
  },
  {
    id: "arch-m-clean-dependency-rule",
    level: "middle",
    tags: ["clean-architecture"],
    q: [
      "قانون وابستگی (Dependency Rule) در Clean Architecture چیست؟",
      "What is the Dependency Rule in Clean Architecture?",
    ],
    options: [
      ["وابستگی‌های سورس کد فقط باید به سمت داخل (به سمت دامنه) اشاره کنند", "Source code dependencies must point only inward, toward the domain"],
      ["لایه دامنه باید به فریم‌ورک و ORM وابسته باشد", "The domain layer should depend on the framework and ORM"],
      ["هر لایه می‌تواند به هر لایه دیگر وابسته باشد", "Any layer may depend on any other layer"],
      ["وابستگی‌ها فقط باید به سمت بیرون (به سمت UI) باشند", "Dependencies must point only outward, toward the UI"],
    ],
    a: [
      "entities و use caseها در مرکز هستند و هیچ چیزی از دیتابیس، وب یا فریم‌ورک نمی‌دانند. لایه‌های بیرونی با پیاده‌سازی interfaceهای تعریف‌شده در داخل، به آن‌ها وابسته می‌شوند.",
      "Entities and use cases sit at the center and know nothing about the database, web, or framework. Outer layers depend inward by implementing interfaces defined inside.",
    ],
  },
  {
    id: "arch-m-driving-driven-ports",
    level: "middle",
    tags: ["hexagonal"],
    q: [
      "در معماری hexagonal، کدام یک driven (secondary) adapter است؟",
      "In hexagonal architecture, which is a driven (secondary) adapter?",
    ],
    options: [
      ["پیاده‌سازی `OrderRepository` با PostgreSQL", "A PostgreSQL implementation of `OrderRepository`"],
      ["یک REST controller که use case را صدا می‌زند", "A REST controller that invokes a use case"],
      ["یک CLI command که سفارش ثبت می‌کند", "A CLI command that places an order"],
      ["یک consumer پیام که use case را trigger می‌کند", "A message consumer that triggers a use case"],
    ],
    a: [
      "driving adapterها (controller، CLI، consumer) اپلیکیشن را صدا می‌زنند. driven adapterها توسط اپلیکیشن صدا زده می‌شوند و portهای خروجی مثل repository، ارسال ایمیل یا payment gateway را پیاده می‌کنند.",
      "Driving adapters (controllers, CLIs, consumers) call into the application. Driven adapters are called by it, implementing outbound ports like repositories, email senders, or payment gateways.",
    ],
  },
  {
    id: "arch-m-aggregate-root",
    level: "middle",
    tags: ["ddd"],
    q: [
      "در DDD نقش Aggregate Root چیست؟",
      "In DDD, what is the role of an Aggregate Root?",
    ],
    options: [
      ["تنها نقطه ورود به aggregate که invariantهای آن را تضمین می‌کند", "The single entry point to an aggregate that enforces its invariants"],
      ["جدول اصلی دیتابیس که همه جداول به آن foreign key دارند", "The main database table every other table references"],
      ["سرویسی که همه aggregateهای سیستم را مدیریت می‌کند", "A service that manages every aggregate in the system"],
      ["کلاس پایه‌ای که همه entityها از آن ارث می‌برند", "A base class all entities inherit from"],
    ],
    a: [
      "مثلاً `Order` ریشه است و `OrderLine`ها فقط از طریق متدهای `Order` تغییر می‌کنند تا قوانینی مثل «جمع کل منفی نشود» همیشه برقرار باشد. ارجاع از بیرون فقط به ریشه با ID مجاز است.",
      "For example, `Order` is the root and `OrderLine`s change only via `Order` methods so rules like 'total can't be negative' always hold. Outside references point only to the root, by ID.",
    ],
  },
  {
    id: "arch-m-aggregate-transaction",
    level: "middle",
    tags: ["ddd", "transactions"],
    q: [
      "طبق قاعده رایج DDD، یک تراکنش باید چند aggregate را تغییر دهد؟",
      "Per common DDD guidance, how many aggregates should one transaction modify?",
    ],
    options: [
      ["یک aggregate؛ هماهنگی بین aggregateها با domain event و eventual consistency", "One aggregate; coordinate across aggregates via domain events and eventual consistency"],
      ["همه aggregateهای مرتبط در یک تراکنش بزرگ", "All related aggregates in one large transaction"],
      ["حداقل دو aggregate برای حفظ consistency", "At least two aggregates to preserve consistency"],
      ["هیچ؛ aggregateها هرگز ذخیره نمی‌شوند", "None; aggregates are never persisted"],
    ],
    a: [
      "aggregate مرز consistency تراکنشی است. تغییر چند aggregate در یک تراکنش باعث lock contention و coupling می‌شود؛ بهتر است aggregate دوم با واکنش به event به‌روز شود.",
      "An aggregate is the transactional consistency boundary. Modifying several in one transaction causes lock contention and coupling; prefer updating the second via a domain event.",
    ],
  },
  {
    id: "arch-m-domain-events",
    level: "middle",
    tags: ["ddd", "events"],
    q: [
      "Domain Event چیست؟",
      "What is a Domain Event?",
    ],
    options: [
      ["رکوردی از اتفاقی معنادار در دامنه که در گذشته رخ داده، مثل `OrderPlaced`", "A record of something meaningful that happened in the domain, like `OrderPlaced`"],
      ["یک دستور برای انجام کاری در آینده، مثل `PlaceOrder`", "A command to do something in the future, like `PlaceOrder`"],
      ["رویداد کلیک کاربر در مرورگر", "A user's click event in the browser"],
      ["خطای ثبت‌شده در لاگ سیستم", "An error recorded in the system log"],
    ],
    a: [
      "domain eventها با فعل گذشته نام‌گذاری می‌شوند و تغییرناپذیرند. بخش‌های دیگر سیستم بدون coupling مستقیم به آن واکنش نشان می‌دهند. command برعکس، درخواستی است که ممکن است رد شود.",
      "Domain events are named in the past tense and are immutable. Other parts of the system react to them without direct coupling. A command, in contrast, is a request that may be rejected.",
    ],
  },
  {
    id: "arch-m-bff",
    level: "middle",
    tags: ["api-gateway", "bff"],
    q: [
      "الگوی Backend for Frontend (BFF) چه تفاوتی با یک API Gateway عمومی دارد؟",
      "How does the Backend for Frontend (BFF) pattern differ from a general API Gateway?",
    ],
    options: [
      ["برای هر نوع کلاینت (وب، موبایل) یک backend اختصاصی که داده را مطابق نیاز آن شکل می‌دهد", "A dedicated backend per client type (web, mobile) shaping data for its needs"],
      ["BFF فقط فایل‌های static فرانت‌اند را سرو می‌کند", "A BFF only serves static frontend files"],
      ["BFF جایگزین دیتابیس برای فرانت‌اند است", "A BFF replaces the database for the frontend"],
      ["BFF همان load balancer لایه ۴ است", "A BFF is the same as an L4 load balancer"],
    ],
    a: [
      "موبایل ممکن است payload کوچک‌تر و تجمیع متفاوتی نسبت به وب بخواهد. BFF که معمولاً مالکش تیم فرانت‌اند است این تجمیع را انجام می‌دهد و از یک gateway پیچیده و همه‌منظوره جلوگیری می‌کند.",
      "Mobile may need smaller payloads and different aggregation than web. A BFF, usually owned by the frontend team, does that aggregation and avoids one bloated general-purpose gateway.",
    ],
  },
  {
    id: "arch-m-client-vs-server-discovery",
    level: "middle",
    tags: ["service-discovery"],
    q: [
      "تفاوت client-side و server-side service discovery چیست؟",
      "What is the difference between client-side and server-side service discovery?",
    ],
    options: [
      ["در client-side کلاینت registry را می‌پرسد و خودش instance را انتخاب می‌کند؛ در server-side یک router/LB این کار را می‌کند", "Client-side: the client queries the registry and picks an instance; server-side: a router/LB does it"],
      ["client-side فقط در مرورگر و server-side فقط در backend کاربرد دارد", "Client-side is only for browsers and server-side only for backends"],
      ["در server-side هر سرویس آدرس‌ها را hard-code می‌کند", "In server-side, each service hard-codes addresses"],
      ["هیچ تفاوتی ندارند", "There is no difference"],
    ],
    a: [
      "client-side (مثل Netflix Eureka + Ribbon) یک hop کمتر دارد ولی منطق را در هر کلاینت تکرار می‌کند. server-side (مثل Kubernetes Service یا AWS ALB) کلاینت را ساده نگه می‌دارد.",
      "Client-side (like Netflix Eureka + Ribbon) saves a hop but duplicates logic in every client. Server-side (like a Kubernetes Service or AWS ALB) keeps clients simple.",
    ],
  },
  {
    id: "arch-m-service-mesh",
    level: "middle",
    tags: ["service-mesh", "microservices"],
    q: [
      "service mesh (مثل Istio یا Linkerd) معمولاً از چه مکانیزمی استفاده می‌کند؟",
      "What mechanism does a service mesh (like Istio or Linkerd) typically use?",
    ],
    options: [
      ["یک sidecar proxy کنار هر سرویس که mTLS، retry و telemetry را مدیریت می‌کند", "A sidecar proxy next to each service handling mTLS, retries, and telemetry"],
      ["یک کتابخانه که باید در کد هر سرویس import شود", "A library that must be imported into each service's code"],
      ["یک دیتابیس مرکزی برای ذخیره همه درخواست‌ها", "A central database storing every request"],
      ["جایگزینی HTTP با پروتکل اختصاصی", "Replacing HTTP with a proprietary protocol"],
    ],
    a: [
      "service mesh دغدغه‌های شبکه را از کد اپلیکیشن به لایه زیرساخت (مثلاً Envoy sidecar) منتقل می‌کند. در عوض latency و پیچیدگی عملیاتی اضافه می‌شود.",
      "A service mesh moves networking concerns out of application code into infrastructure (e.g., an Envoy sidecar). In exchange it adds latency and operational complexity.",
    ],
  },
  {
    id: "arch-m-opentelemetry",
    level: "middle",
    tags: ["observability", "opentelemetry"],
    q: [
      "OpenTelemetry چیست؟",
      "What is OpenTelemetry?",
    ],
    options: [
      ["استاندارد و SDK بی‌طرف از vendor برای تولید و ارسال traces، metrics و logs", "A vendor-neutral standard and SDKs for producing and exporting traces, metrics, and logs"],
      ["یک دیتابیس time-series برای ذخیره metrics", "A time-series database for storing metrics"],
      ["داشبورد گرافیکی برای نمایش لاگ‌ها", "A graphical dashboard for viewing logs"],
      ["یک پروتکل برای تماس‌های تلفنی سرویس‌ها", "A protocol for service telephony"],
    ],
    a: [
      "OpenTelemetry فقط instrumentation و انتقال داده (OTLP) را استاندارد می‌کند؛ ذخیره و نمایش با backendهایی مثل Jaeger، Prometheus یا Datadog است. این کار وابستگی به یک vendor را حذف می‌کند.",
      "OpenTelemetry standardizes instrumentation and transport (OTLP) only; storage and visualization are done by backends like Jaeger, Prometheus, or Datadog. This avoids vendor lock-in.",
    ],
  },
  {
    id: "arch-m-trace-span",
    level: "middle",
    tags: ["observability", "tracing"],
    q: [
      "در distributed tracing، رابطه trace و span چیست؟",
      "In distributed tracing, how do traces and spans relate?",
    ],
    options: [
      ["trace کل مسیر یک درخواست است و از spanهای تودرتو (هر عملیات) تشکیل می‌شود", "A trace is a request's full journey, composed of nested spans for each operation"],
      ["span کل مسیر درخواست است و trace یک عملیات منفرد", "A span is the full journey and a trace is one operation"],
      ["trace فقط برای خطاها و span فقط برای درخواست‌های موفق است", "Traces are for errors and spans for successful requests"],
      ["هر دو مترادف هستند", "They are synonyms"],
    ],
    a: [
      "هر span زمان شروع/پایان، attributeها و `parent span id` دارد. context (مثلاً header `traceparent` در W3C) بین سرویس‌ها منتقل می‌شود تا spanها در یک trace به هم وصل شوند.",
      "Each span has start/end times, attributes, and a `parent span id`. Context (e.g., the W3C `traceparent` header) is propagated between services so spans link into one trace.",
    ],
  },
  {
    id: "arch-m-red-method",
    level: "middle",
    tags: ["observability", "metrics"],
    q: [
      "روش RED برای مانیتورینگ سرویس‌ها کدام metrics را پیشنهاد می‌کند؟",
      "Which metrics does the RED method recommend for monitoring services?",
    ],
    options: [
      ["Rate، Errors و Duration درخواست‌ها", "Request Rate, Errors, and Duration"],
      ["RAM، Ethernet و Disk", "RAM, Ethernet, and Disk"],
      ["Retries، Events و Deployments", "Retries, Events, and Deployments"],
      ["Readiness، Exceptions و Deadlocks", "Readiness, Exceptions, and Deadlocks"],
    ],
    a: [
      "RED دید کاربرمحور از سرویس می‌دهد: چند درخواست در ثانیه، چند درصد خطا، و توزیع latency (مثلاً p99). برای سرویس‌های request-driven مثل API بسیار مناسب است.",
      "RED gives a user-centric view of a service: requests per second, error percentage, and latency distribution (e.g., p99). It suits request-driven services like APIs.",
    ],
  },
  {
    id: "arch-m-use-method",
    level: "middle",
    tags: ["observability", "metrics"],
    q: [
      "روش USE برای تحلیل کدام موضوع طراحی شده است؟",
      "What is the USE method designed to analyze?",
    ],
    options: [
      ["منابع (CPU، حافظه، دیسک) از نظر Utilization، Saturation و Errors", "Resources (CPU, memory, disk) by Utilization, Saturation, and Errors"],
      ["تجربه کاربر در فرانت‌اند", "Frontend user experience"],
      ["کیفیت کد از نظر Unit tests، Style و Errors", "Code quality via Unit tests, Style, and Errors"],
      ["هزینه ماهانه زیرساخت ابری", "Monthly cloud infrastructure cost"],
    ],
    a: [
      "USE (از Brendan Gregg) برای هر منبع می‌پرسد چقدر مشغول است، چقدر کار در صف انتظار دارد و چه خطاهایی دارد. RED برای سرویس‌ها و USE برای منابع زیرساخت مکمل هم هستند.",
      "USE (by Brendan Gregg) asks, per resource, how busy it is, how much work is queued, and what errors occur. RED for services and USE for infrastructure resources complement each other.",
    ],
  },
  {
    id: "arch-m-error-budget",
    level: "middle",
    tags: ["sre", "slo"],
    q: [
      "با SLO برابر 99.9% availability در ۳۰ روز، error budget تقریباً چقدر است؟",
      "With a 99.9% availability SLO over 30 days, roughly how big is the error budget?",
    ],
    options: [
      ["حدود ۴۳ دقیقه", "About 43 minutes"],
      ["حدود ۴.۳ دقیقه", "About 4.3 minutes"],
      ["حدود ۷.۲ ساعت", "About 7.2 hours"],
      ["حدود ۱ روز", "About 1 day"],
    ],
    a: [
      "۰.۱٪ از ۳۰ روز (۴۳۲۰۰ دقیقه) حدود ۴۳.۲ دقیقه است. اگر budget مصرف شد، تیم معمولاً سرعت release را کم و روی پایداری تمرکز می‌کند.",
      "0.1% of 30 days (43,200 minutes) is about 43.2 minutes. When the budget is spent, teams typically slow releases and focus on reliability.",
    ],
  },
  {
    id: "arch-m-metric-cardinality",
    level: "middle",
    tags: ["observability", "metrics"],
    q: [
      "چرا قرار دادن `userId` به‌عنوان label در metrics پرومتئوس ایده بدی است؟",
      "Why is putting `userId` as a label on Prometheus metrics a bad idea?",
    ],
    options: [
      ["cardinality بالا باعث انفجار تعداد time seriesها و مصرف شدید حافظه می‌شود", "High cardinality explodes the number of time series and memory usage"],
      ["Prometheus فقط labelهای عددی را قبول می‌کند", "Prometheus accepts only numeric labels"],
      ["labelها در Prometheus بعد از یک ساعت حذف می‌شوند", "Prometheus deletes labels after an hour"],
      ["label گذاشتن باعث می‌شود metrics رمزنگاری شوند", "Labels cause metrics to be encrypted"],
    ],
    a: [
      "هر ترکیب یکتای labelها یک time series جدا می‌سازد؛ میلیون‌ها کاربر یعنی میلیون‌ها series. داده با cardinality بالا مثل userId برای logs و traces مناسب است نه metrics.",
      "Each unique label combination creates a separate time series; millions of users means millions of series. High-cardinality data like userId belongs in logs and traces, not metrics.",
    ],
  },
  {
    id: "arch-m-contract-testing",
    level: "middle",
    tags: ["testing", "contract-tests"],
    q: [
      "consumer-driven contract testing (مثلاً با Pact) چه مشکلی را حل می‌کند؟",
      "What problem does consumer-driven contract testing (e.g., with Pact) solve?",
    ],
    options: [
      ["تشخیص تغییرات شکننده API بین سرویس‌ها بدون اجرای e2e کامل", "Catching breaking API changes between services without full e2e runs"],
      ["تست کارایی سرویس زیر بار بالا", "Load-testing a service under high traffic"],
      ["بررسی قراردادهای حقوقی با مشتری", "Checking legal contracts with customers"],
      ["تولید خودکار داده تست در دیتابیس", "Generating test data in the database"],
    ],
    a: [
      "consumer انتظاراتش از API را به‌صورت قرارداد ثبت می‌کند و provider در CI خودش آن را verify می‌کند. این کار سریع‌تر و پایدارتر از محیط e2e مشترک است.",
      "The consumer records its expectations of the API as a contract, and the provider verifies it in its own CI. This is faster and more reliable than a shared e2e environment.",
    ],
  },
  {
    id: "arch-m-fake",
    level: "middle",
    tags: ["testing", "test-doubles"],
    q: [
      "کدام یک مثالی از fake (در دسته test doubleها) است؟",
      "Which is an example of a fake (as a test double)?",
    ],
    options: [
      ["یک `InMemoryUserRepository` که واقعاً داده را در یک Map ذخیره و بازیابی می‌کند", "An `InMemoryUserRepository` that really stores and retrieves data in a Map"],
      ["تابعی که همیشه `null` برمی‌گرداند و هیچ منطقی ندارد", "A function that always returns `null` with no logic"],
      ["شیئی که فقط بررسی می‌کند `save` دو بار صدا زده شده", "An object that only verifies `save` was called twice"],
      ["پارامتری که پاس داده می‌شود ولی هرگز استفاده نمی‌شود", "A parameter passed in but never used"],
    ],
    a: [
      "fake پیاده‌سازی کاری ولی ساده‌شده است که برای production مناسب نیست. گزینه‌های دیگر به‌ترتیب stub، mock و dummy را توصیف می‌کنند.",
      "A fake is a working but simplified implementation unsuitable for production. The other options describe a stub, a mock, and a dummy respectively.",
    ],
  },
  {
    id: "arch-m-spy",
    level: "middle",
    tags: ["testing", "test-doubles"],
    q: [
      "spy در تست چیست؟",
      "What is a spy in testing?",
    ],
    options: [
      ["test doubleی که فراخوانی‌ها را ثبت می‌کند تا بعداً روی آن‌ها assert شود", "A test double that records calls so you can assert on them afterwards"],
      ["ابزاری برای بررسی امنیت کد", "A tool for checking code security"],
      ["پیاده‌سازی in-memory یک دیتابیس", "An in-memory database implementation"],
      ["تستی که در production اجرا می‌شود", "A test that runs in production"],
    ],
    a: [
      "spy معمولاً رفتار واقعی را حفظ یا stub می‌کند و آرگومان‌ها و تعداد فراخوانی را ثبت می‌کند، مثل `jest.spyOn`. تفاوت با mock این است که انتظارات بعد از اجرا بررسی می‌شوند نه از قبل.",
      "A spy typically keeps or stubs the real behavior while recording arguments and call counts, like `jest.spyOn`. Unlike a classic mock, expectations are checked after execution rather than set up front.",
    ],
  },
  {
    id: "arch-m-feature-flag-debt",
    level: "middle",
    tags: ["feature-flags"],
    q: [
      "مهم‌ترین ریسک بلندمدت feature flagها چیست؟",
      "What is the main long-term risk of feature flags?",
    ],
    options: [
      ["انباشت flagهای قدیمی که شاخه‌های کد و ترکیب‌های تست را زیاد می‌کنند", "Accumulating stale flags that multiply code paths and test combinations"],
      ["افزایش اندازه دیتابیس به چند ترابایت", "Growing the database to terabytes"],
      ["عدم امکان rollback در صورت باگ", "Making rollbacks impossible"],
      ["کاهش امنیت TLS", "Weakening TLS security"],
    ],
    a: [
      "release flagها باید عمر کوتاه داشته باشند و بعد از rollout کامل حذف شوند. داشتن owner و تاریخ انقضا برای هر flag و حذف دوره‌ای آن‌ها رایج است.",
      "Release flags should be short-lived and removed after full rollout. Giving each flag an owner and an expiry date and pruning them regularly is common practice.",
    ],
  },
  {
    id: "arch-m-expand-contract",
    level: "middle",
    tags: ["deployment", "migrations"],
    q: [
      "برای rename کردن یک ستون بدون downtime در rolling deployment چه رویکردی مناسب است؟",
      "Which approach renames a column without downtime during rolling deployments?",
    ],
    options: [
      ["expand/contract: افزودن ستون جدید، نوشتن در هر دو، migrate، سپس حذف ستون قدیم در release بعدی", "Expand/contract: add the new column, dual-write, migrate, then drop the old one in a later release"],
      ["rename مستقیم ستون همزمان با deploy کد جدید", "Rename the column directly at the same time as deploying new code"],
      ["توقف همه instanceها، rename و سپس راه‌اندازی مجدد", "Stop all instances, rename, then restart"],
      ["حذف ستون قدیمی قبل از deploy کد جدید", "Drop the old column before deploying the new code"],
    ],
    a: [
      "در rolling deploy نسخه قدیم و جدید همزمان اجرا می‌شوند، پس schema باید با هر دو سازگار باشد. تغییرات شکننده به چند مرحله backward-compatible شکسته می‌شوند.",
      "During a rolling deploy old and new versions run together, so the schema must work with both. Breaking changes are split into several backward-compatible steps.",
    ],
  },
  {
    id: "arch-m-secrets-management",
    level: "middle",
    tags: ["configuration", "security"],
    q: [
      "بهترین روش مدیریت secretها (مثل API key) در production کدام است؟",
      "What is the best way to manage secrets (like API keys) in production?",
    ],
    options: [
      ["استفاده از secret manager (مثل Vault یا AWS Secrets Manager) با دسترسی محدود و rotation", "Using a secret manager (like Vault or AWS Secrets Manager) with scoped access and rotation"],
      ["commit کردن فایل `.env` در repository خصوصی", "Committing the `.env` file to a private repository"],
      ["قرار دادن secretها در image داکر", "Baking secrets into the Docker image"],
      ["ارسال secretها در Slack تیم برای دسترسی سریع", "Sharing secrets in the team Slack for quick access"],
    ],
    a: [
      "secret manager رمزنگاری، کنترل دسترسی، audit log و rotation خودکار را فراهم می‌کند. secret در runtime به‌صورت env var یا فایل mount‌شده به اپلیکیشن داده می‌شود.",
      "A secret manager provides encryption, access control, audit logs, and automatic rotation. Secrets are injected at runtime as env vars or mounted files.",
    ],
  },
  {
    id: "arch-m-multi-tenancy-models",
    level: "middle",
    tags: ["multi-tenancy"],
    q: [
      "در multi-tenancy، کدام مدل بیشترین ایزولاسیون و بیشترین هزینه عملیاتی را دارد؟",
      "In multi-tenancy, which model offers the most isolation and the highest operational cost?",
    ],
    options: [
      ["database-per-tenant", "Database-per-tenant"],
      ["shared schema با ستون `tenant_id`", "Shared schema with a `tenant_id` column"],
      ["schema-per-tenant در یک دیتابیس مشترک", "Schema-per-tenant in a shared database"],
      ["ذخیره tenant در cookie کاربر", "Storing the tenant in the user's cookie"],
    ],
    a: [
      "shared schema ارزان‌ترین است ولی هر کوئری باید `tenant_id` را فیلتر کند (یا از Row-Level Security استفاده کند). database-per-tenant ایزولاسیون و امکان backup جدا دارد اما migration و مانیتورینگ را سخت‌تر می‌کند.",
      "Shared schema is cheapest but every query must filter by `tenant_id` (or use Row-Level Security). Database-per-tenant gives isolation and per-tenant backups but makes migrations and monitoring harder.",
    ],
  },
  {
    id: "arch-m-noisy-neighbor",
    level: "middle",
    tags: ["multi-tenancy", "rate-limiting"],
    q: [
      "مشکل noisy neighbor در یک سیستم multi-tenant چیست و چگونه کاهش می‌یابد؟",
      "What is the noisy neighbor problem in a multi-tenant system and how is it mitigated?",
    ],
    options: [
      ["یک tenant پرمصرف منابع مشترک را اشغال می‌کند؛ با quota و rate limit per-tenant کنترل می‌شود", "One heavy tenant hogs shared resources; mitigated with per-tenant quotas and rate limits"],
      ["لاگ‌های یک tenant در لاگ tenant دیگر دیده می‌شود؛ با حذف لاگ حل می‌شود", "One tenant's logs appear in another's; fixed by deleting logs"],
      ["سرورها صدای فن زیادی دارند؛ با خنک‌سازی بهتر حل می‌شود", "Servers have noisy fans; fixed with better cooling"],
      ["tenantها نمی‌توانند به هم پیام بدهند؛ با message queue حل می‌شود", "Tenants can't message each other; fixed with a message queue"],
    ],
    a: [
      "در زیرساخت مشترک، یک tenant با بار سنگین می‌تواند latency بقیه را بالا ببرد. quota، rate limit و صف‌های جدا برای هر tenant یا انتقال tenantهای بزرگ به منابع اختصاصی راه‌حل‌های رایج هستند.",
      "On shared infrastructure, one heavy tenant can raise latency for everyone. Per-tenant quotas, rate limits, separate queues, or moving large tenants to dedicated resources are common fixes.",
    ],
  },
  {
    id: "arch-m-serverless-fit",
    level: "middle",
    tags: ["serverless", "trade-offs"],
    q: [
      "کدام workload برای serverless (مثل AWS Lambda) کمتر مناسب است؟",
      "Which workload is the poorest fit for serverless (like AWS Lambda)?",
    ],
    options: [
      ["پردازش طولانی‌مدت با بار بالای ثابت و نیاز به latency پایین و پایدار", "Long-running processing with steady high load and strict, consistent low latency"],
      ["پردازش تصویر پس از آپلود فایل", "Processing an image after a file upload"],
      ["webhookهایی با ترافیک نامنظم و کم", "Webhooks with sporadic, low traffic"],
      ["cron jobهای سبک روزانه", "Lightweight daily cron jobs"],
    ],
    a: [
      "serverless برای بار bursty و رویدادمحور عالی است، اما محدودیت زمان اجرا، cold start و هزینه بالاتر در بار ثابت دارد. برای بار سنگین دائمی، کانتینر یا VM معمولاً ارزان‌تر و قابل پیش‌بینی‌تر است.",
      "Serverless excels at bursty, event-driven work, but has execution time limits, cold starts, and higher cost under steady load. For constant heavy load, containers or VMs are usually cheaper and more predictable.",
    ],
  },
  {
    id: "arch-m-serverless-db-connections",
    level: "middle",
    tags: ["serverless", "databases"],
    q: [
      "مشکل رایج اتصال توابع serverless به دیتابیس رابطه‌ای چیست؟",
      "What is a common problem when serverless functions connect to a relational database?",
    ],
    options: [
      ["هزاران instance همزمان می‌توانند تعداد connectionهای دیتابیس را تمام کنند", "Thousands of concurrent instances can exhaust the database's connection limit"],
      ["توابع serverless نمی‌توانند از TCP استفاده کنند", "Serverless functions can't use TCP"],
      ["دیتابیس رابطه‌ای با serverless فقط read-only است", "Relational databases are read-only from serverless"],
      ["کوئری‌ها در serverless همیشه دو بار اجرا می‌شوند", "Queries always run twice in serverless"],
    ],
    a: [
      "هر instance اتصال خودش را باز می‌کند و با scale ناگهانی، `max_connections` دیتابیس پر می‌شود. راه‌حل‌ها: connection pooler مثل RDS Proxy یا PgBouncer، یا دیتابیس‌های HTTP-based.",
      "Each instance opens its own connection, and a sudden scale-out fills the database's `max_connections`. Fixes include a pooler like RDS Proxy or PgBouncer, or HTTP-based databases.",
    ],
  },
  {
    id: "arch-m-worker-idempotent-jobs",
    level: "middle",
    tags: ["background-jobs", "idempotency"],
    q: [
      "چرا jobهای background worker باید idempotent طراحی شوند؟",
      "Why should background worker jobs be designed to be idempotent?",
    ],
    options: [
      ["چون اکثر صف‌ها at-least-once هستند و یک job ممکن است بیش از یک بار اجرا شود", "Because most queues are at-least-once and a job may run more than once"],
      ["چون workerها هرگز خطا نمی‌دهند", "Because workers never fail"],
      ["چون jobهای idempotent همیشه سریع‌ترند", "Because idempotent jobs are always faster"],
      ["چون صف‌ها پیام‌ها را به‌ترتیب تحویل نمی‌دهند", "Because queues never deliver messages in order"],
    ],
    a: [
      "اگر worker بعد از انجام کار ولی قبل از ack کردن crash کند، پیام دوباره تحویل داده می‌شود. با بررسی وضعیت یا ثبت ID پردازش‌شده، اجرای تکراری اثر جانبی دوباره ایجاد نمی‌کند.",
      "If a worker crashes after doing the work but before acking, the message is redelivered. Checking state or recording processed IDs ensures a repeat run has no duplicate side effects.",
    ],
  },
  {
    id: "arch-m-dual-write-outbox",
    level: "middle",
    tags: ["consistency", "outbox"],
    q: [
      "الگوی Transactional Outbox کدام مشکل را حل می‌کند؟",
      "Which problem does the Transactional Outbox pattern solve?",
    ],
    options: [
      ["dual write: ذخیره در دیتابیس و انتشار event به‌صورت اتمیک انجام نمی‌شود", "Dual write: saving to the DB and publishing an event aren't atomic"],
      ["کند بودن کوئری‌های SELECT", "Slow SELECT queries"],
      ["ارسال ایمیل به صندوق Outbox کاربر", "Sending email to the user's Outbox folder"],
      ["محدودیت اندازه پیام در صف", "Message size limits in queues"],
    ],
    a: [
      "event در همان تراکنش تغییر داده در جدول `outbox` ذخیره می‌شود و یک process جدا آن را به broker منتشر می‌کند. این کار از حالتی که داده ذخیره شده ولی event گم شده جلوگیری می‌کند.",
      "The event is written to an `outbox` table in the same transaction as the data change, and a separate process publishes it to the broker. This prevents saving data while losing the event.",
    ],
  },
  {
    id: "arch-m-littles-law",
    level: "middle",
    tags: ["performance", "capacity"],
    q: [
      "سرویسی ۲۰۰ درخواست در ثانیه دریافت می‌کند و میانگین latency آن 50ms است. طبق Little's law به‌طور متوسط چند درخواست همزمان در سیستم است؟",
      "A service receives 200 requests/second with 50ms average latency. By Little's law, how many requests are in flight on average?",
    ],
    options: [
      ["۱۰", "10"],
      ["۴", "4"],
      ["۲۵۰", "250"],
      ["۴۰۰۰", "4000"],
    ],
    a: [
      "Little's law می‌گوید `L = λ × W`، یعنی 200 × 0.05 = 10. این فرمول برای اندازه‌گیری thread pool یا connection pool مورد نیاز بسیار کاربردی است.",
      "Little's law states `L = λ × W`, so 200 × 0.05 = 10. It's very handy for sizing thread pools or connection pools.",
    ],
  },
  {
    id: "arch-m-capacity-qps",
    level: "middle",
    tags: ["capacity"],
    q: [
      "اپلیکیشنی ۱ میلیون کاربر فعال روزانه دارد و هر کاربر روزانه ۱۰ درخواست می‌زند. میانگین QPS تقریباً چقدر است؟",
      "An app has 1 million daily active users, each making 10 requests per day. Roughly what is the average QPS?",
    ],
    options: [
      ["حدود ۱۲۰", "About 120"],
      ["حدود ۱۲", "About 12"],
      ["حدود ۱۲۰۰", "About 1,200"],
      ["حدود ۱۰,۰۰۰", "About 10,000"],
    ],
    a: [
      "۱۰ میلیون درخواست تقسیم بر ۸۶۴۰۰ ثانیه حدود ۱۱۶ QPS است. برای طراحی ظرفیت، peak را معمولاً ۲ تا ۱۰ برابر میانگین در نظر می‌گیرند.",
      "10 million requests divided by 86,400 seconds is about 116 QPS. For capacity planning, peak is usually assumed to be 2-10x the average.",
    ],
  },
  {
    id: "arch-m-fanout-tail",
    level: "middle",
    tags: ["performance", "latency"],
    q: [
      "درخواستی به ۱۰۰ سرویس به‌صورت موازی fan-out می‌شود و هر سرویس ۱٪ احتمال پاسخ کند (بالای p99) دارد. احتمال کند بودن کل درخواست تقریباً چقدر است؟",
      "A request fans out in parallel to 100 services, each with a 1% chance of a slow (above p99) response. Roughly how likely is the overall request to be slow?",
    ],
    options: [
      ["حدود ۶۳٪", "About 63%"],
      ["حدود ۱٪", "About 1%"],
      ["حدود ۱۰٪", "About 10%"],
      ["حدود ۱۰۰٪ دقیقاً", "Exactly 100%"],
    ],
    a: [
      "احتمال اینکه همه سریع باشند `0.99^100 ≈ 0.37` است، پس حدود ۶۳٪ درخواست‌ها حداقل یک پاسخ کند دارند. به همین دلیل tail latency در سیستم‌های fan-out اهمیت زیادی دارد.",
      "The chance all are fast is `0.99^100 ≈ 0.37`, so about 63% of requests hit at least one slow response. That's why tail latency matters so much in fan-out systems.",
    ],
  },
  {
    id: "arch-m-token-bucket",
    level: "middle",
    tags: ["rate-limiting"],
    q: [
      "ویژگی بارز الگوریتم token bucket در rate limiting چیست؟",
      "What is the distinctive property of the token bucket rate-limiting algorithm?",
    ],
    options: [
      ["اجازه burst تا ظرفیت bucket را می‌دهد در حالی که نرخ میانگین را محدود می‌کند", "It allows bursts up to bucket capacity while capping the average rate"],
      ["خروجی را کاملاً یکنواخت می‌کند و هیچ burstی را نمی‌پذیرد", "It makes output perfectly smooth and accepts no bursts"],
      ["فقط تعداد درخواست‌ها را در پنجره‌های ثابت تقویمی می‌شمارد", "It only counts requests in fixed calendar windows"],
      ["هر درخواست را به‌صورت تصادفی رد یا قبول می‌کند", "It randomly accepts or rejects each request"],
    ],
    a: [
      "tokenها با نرخ ثابت اضافه می‌شوند و هر درخواست یک token مصرف می‌کند؛ bucket پر امکان burst کوتاه را می‌دهد. leaky bucket برعکس خروجی را یکنواخت می‌کند.",
      "Tokens refill at a fixed rate and each request consumes one; a full bucket permits a short burst. Leaky bucket, by contrast, smooths the output rate.",
    ],
  },
  {
    id: "arch-m-distributed-rate-limit",
    level: "middle",
    tags: ["rate-limiting", "scaling"],
    q: [
      "سرویسی با ۵ instance هر کدام rate limit درون‌حافظه‌ای ۱۰۰ درخواست/دقیقه per-user دارد. مشکل چیست؟",
      "A service has 5 instances, each with an in-memory per-user limit of 100 req/min. What is the problem?",
    ],
    options: [
      ["کاربر عملاً تا ۵۰۰ درخواست/دقیقه می‌تواند بفرستد؛ شمارنده باید در store مشترک مثل Redis باشد", "A user can effectively send up to 500 req/min; the counter should live in a shared store like Redis"],
      ["هیچ مشکلی ندارد، limit دقیقاً ۱۰۰ اعمال می‌شود", "No problem; the limit is enforced at exactly 100"],
      ["limit به ۲۰ درخواست/دقیقه کاهش می‌یابد", "The limit drops to 20 req/min"],
      ["load balancer همه درخواست‌ها را رد می‌کند", "The load balancer rejects all requests"],
    ],
    a: [
      "هر instance فقط درخواست‌هایی را که خودش دیده می‌شمارد. شمارنده مشترک (مثلاً Redis با `INCR` و TTL) یا اعمال limit در gateway مرکزی، محدودیت سراسری درست را تضمین می‌کند.",
      "Each instance counts only the requests it sees. A shared counter (e.g., Redis `INCR` with a TTL) or enforcing the limit in a central gateway guarantees a correct global limit.",
    ],
  },
  {
    id: "arch-m-twelve-factor-logs",
    level: "middle",
    tags: ["12-factor", "logging"],
    q: [
      "طبق 12-Factor، اپلیکیشن چگونه باید لاگ تولید کند؟",
      "Per 12-Factor, how should an app emit logs?",
    ],
    options: [
      ["به‌صورت stream رویداد روی `stdout`؛ جمع‌آوری و مسیریابی بر عهده محیط اجراست", "As an event stream to `stdout`; collection and routing are the environment's job"],
      ["در فایل‌های چرخشی روی دیسک محلی که اپلیکیشن مدیریت می‌کند", "Into rotating files on local disk managed by the app"],
      ["مستقیماً در دیتابیس اصلی اپلیکیشن", "Directly into the app's main database"],
      ["فقط در زمان خطا با ارسال ایمیل", "Only on errors, by sending emails"],
    ],
    a: [
      "اپلیکیشن نباید درگیر فایل لاگ و rotation باشد. agentهایی مثل Fluent Bit یا driver لاگ کانتینر، stdout را جمع‌آوری و به سیستم متمرکز می‌فرستند.",
      "The app shouldn't manage log files or rotation. Agents like Fluent Bit or the container log driver collect stdout and ship it to a central system.",
    ],
  },
  {
    id: "arch-m-twelve-factor-disposability",
    level: "middle",
    tags: ["12-factor"],
    q: [
      "اصل Disposability در 12-Factor چه چیزی را می‌طلبد؟",
      "What does the Disposability factor in 12-Factor require?",
    ],
    options: [
      ["startup سریع و shutdown مطمئن تا processها بتوانند هر لحظه ساخته یا حذف شوند", "Fast startup and graceful shutdown so processes can be created or killed at any moment"],
      ["حذف خودکار داده‌های کاربران پس از ۳۰ روز", "Automatically deleting user data after 30 days"],
      ["استفاده از سرورهای یک‌بار مصرف ارزان", "Using cheap disposable servers"],
      ["پاک کردن لاگ‌ها پس از هر deploy", "Clearing logs after each deploy"],
    ],
    a: [
      "processهای disposable امکان autoscaling سریع، deploy سریع و تحمل crash را می‌دهند. jobها هم باید طوری طراحی شوند که در صورت قطع شدن، با بازگشت به صف دوباره قابل اجرا باشند.",
      "Disposable processes enable fast autoscaling, quick deploys, and crash tolerance. Jobs should also be designed to be re-runnable by returning to the queue if interrupted.",
    ],
  },
  {
    id: "arch-m-sync-chain-availability",
    level: "middle",
    tags: ["availability", "microservices"],
    q: [
      "یک درخواست به‌صورت همگام از ۳ سرویس عبور می‌کند که هر کدام 99.9% availability دارند. availability کل تقریباً چقدر است؟",
      "A request synchronously passes through 3 services, each with 99.9% availability. What's the approximate overall availability?",
    ],
    options: [
      ["حدود 99.7%", "About 99.7%"],
      ["دقیقاً 99.9%", "Exactly 99.9%"],
      ["حدود 99.99%", "About 99.99%"],
      ["حدود 97%", "About 97%"],
    ],
    a: [
      "availability وابستگی‌های سری در هم ضرب می‌شود: `0.999^3 ≈ 0.997`. هر فراخوانی همگام اضافه availability را کم می‌کند؛ ارتباط ناهمگام یا fallback این وابستگی را کاهش می‌دهد.",
      "Availabilities of serial dependencies multiply: `0.999^3 ≈ 0.997`. Each extra synchronous hop lowers availability; async communication or fallbacks reduce that dependency.",
    ],
  },
]);
