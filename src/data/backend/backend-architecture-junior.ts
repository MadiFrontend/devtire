import { build } from "../build";

export const backendArchitectureJunior = build("backend-architecture", [
  {
    id: "arch-j-layered-controller-role",
    level: "junior",
    tags: ["layered-architecture"],
    q: [
      "در معماری لایه‌ای (controller/service/repository)، مسئولیت اصلی controller چیست؟",
      "In a layered architecture (controller/service/repository), what is the main responsibility of the controller?",
    ],
    options: [
      ["دریافت درخواست HTTP، اعتبارسنجی ورودی و فراخوانی service", "Receiving the HTTP request, validating input, and calling the service"],
      ["اجرای مستقیم کوئری‌های SQL روی دیتابیس", "Running SQL queries directly against the database"],
      ["نگهداری تمام business rules و محاسبات دامنه", "Holding all business rules and domain calculations"],
      ["مدیریت connection pool و تراکنش‌های دیتابیس", "Managing the connection pool and database transactions"],
    ],
    a: [
      "controller لایه ورودی است: درخواست را parse و validate می‌کند، service را صدا می‌زند و پاسخ را برمی‌گرداند. منطق کسب‌وکار باید در service بماند.",
      "The controller is the entry layer: it parses and validates the request, calls the service, and shapes the response. Business logic belongs in the service layer.",
    ],
  },
  {
    id: "arch-j-repository-purpose",
    level: "junior",
    tags: ["layered-architecture", "repository"],
    q: [
      "هدف الگوی Repository چیست؟",
      "What is the purpose of the Repository pattern?",
    ],
    options: [
      ["پنهان کردن جزئیات دسترسی به داده پشت یک interface شبیه collection", "Hiding data-access details behind a collection-like interface"],
      ["کش کردن پاسخ‌های HTTP برای کاهش بار سرور", "Caching HTTP responses to reduce server load"],
      ["مدیریت نسخه‌های مختلف API برای کلاینت‌ها", "Managing different API versions for clients"],
      ["توزیع درخواست‌ها بین چند instance از سرویس", "Distributing requests across multiple service instances"],
    ],
    a: [
      "Repository یک abstraction روی منبع داده است تا service بدون دانستن SQL یا ORM با موجودیت‌ها کار کند. این کار تست و تعویض لایه داده را ساده‌تر می‌کند.",
      "A repository abstracts the data source so services work with entities without knowing about SQL or the ORM. This makes testing and swapping the data layer easier.",
    ],
  },
  {
    id: "arch-j-separation-of-concerns",
    level: "junior",
    tags: ["design-principles"],
    q: [
      "اصل Separation of Concerns یعنی چه؟",
      "What does the Separation of Concerns principle mean?",
    ],
    options: [
      ["هر بخش از سیستم فقط یک دغدغه مشخص را مدیریت کند", "Each part of the system handles one distinct concern"],
      ["هر سرویس باید روی سرور فیزیکی جداگانه اجرا شود", "Every service must run on a separate physical server"],
      ["کد frontend و backend باید به زبان‌های متفاوت نوشته شوند", "Frontend and backend code must be written in different languages"],
      ["هر تیم باید دیتابیس اختصاصی خودش را داشته باشد", "Every team must own its own dedicated database"],
    ],
    a: [
      "SoC یعنی جدا کردن دغدغه‌هایی مثل HTTP، منطق کسب‌وکار و persistence در ماژول‌های جدا. نتیجه کدی خواناتر، قابل تست‌تر و با coupling کمتر است.",
      "SoC means separating concerns like HTTP handling, business logic, and persistence into distinct modules. The result is more readable, testable, and loosely coupled code.",
    ],
  },
  {
    id: "arch-j-dependency-injection",
    level: "junior",
    tags: ["dependency-injection"],
    q: [
      "Dependency Injection چیست؟",
      "What is Dependency Injection?",
    ],
    options: [
      ["وابستگی‌ها از بیرون به یک کلاس داده می‌شوند به‌جای اینکه خودش آن‌ها را بسازد", "Dependencies are supplied to a class from outside instead of it creating them itself"],
      ["کلاس‌ها وابستگی‌هایشان را با `new` در constructor خودشان می‌سازند", "Classes build their dependencies with `new` inside their own constructor"],
      ["تزریق کد به runtime برای patch کردن باگ‌ها بدون deploy", "Injecting code at runtime to patch bugs without deploying"],
      ["نصب خودکار پکیج‌های npm در زمان build", "Automatically installing npm packages at build time"],
    ],
    a: [
      "در DI یک کلاس وابستگی‌هایش را از طریق constructor یا parameter دریافت می‌کند. این کار coupling را کم می‌کند و جایگزینی آن‌ها با mock در تست را ساده می‌کند.",
      "With DI a class receives its dependencies via constructor or parameters. This reduces coupling and makes it easy to replace them with test doubles.",
    ],
  },
  {
    id: "arch-j-dip",
    level: "junior",
    tags: ["design-principles", "solid"],
    q: [
      "اصل Dependency Inversion (حرف D در SOLID) چه می‌گوید؟",
      "What does the Dependency Inversion Principle (the D in SOLID) state?",
    ],
    options: [
      ["ماژول‌های سطح بالا و پایین هر دو باید به abstractionها وابسته باشند", "High- and low-level modules should both depend on abstractions"],
      ["ماژول‌های سطح بالا باید مستقیماً به پیاده‌سازی‌های concrete وابسته باشند", "High-level modules should depend directly on concrete implementations"],
      ["هر کلاس فقط باید یک دلیل برای تغییر داشته باشد", "Each class should have only one reason to change"],
      ["subclassها باید قابل جایگزینی با کلاس پایه باشند", "Subclasses must be substitutable for their base class"],
    ],
    a: [
      "DIP می‌گوید منطق سطح بالا نباید به جزئیاتی مثل دیتابیس خاص وابسته باشد؛ هر دو به یک interface وابسته‌اند. گزینه‌های دیگر SRP و LSP را توصیف می‌کنند.",
      "DIP says high-level policy shouldn't depend on details like a specific database; both depend on an interface. The other options describe SRP and LSP.",
    ],
  },
  {
    id: "arch-j-monolith-def",
    level: "junior",
    tags: ["monolith"],
    q: [
      "یک monolith در معماری backend چیست؟",
      "What is a monolith in backend architecture?",
    ],
    options: [
      ["برنامه‌ای که به‌صورت یک واحد deploy می‌شود و همه قابلیت‌ها را در یک process دارد", "An application deployed as a single unit with all features in one process"],
      ["مجموعه‌ای از سرویس‌های کوچک که با پیام با هم ارتباط دارند", "A set of small services communicating through messages"],
      ["برنامه‌ای که فقط از توابع serverless تشکیل شده است", "An application made only of serverless functions"],
      ["سیستمی که برای هر کاربر یک دیتابیس جدا دارد", "A system with a separate database for each user"],
    ],
    a: [
      "monolith یک codebase و artifact واحد است که با هم build و deploy می‌شود. برای تیم‌های کوچک و شروع پروژه معمولاً ساده‌ترین و مناسب‌ترین گزینه است.",
      "A monolith is a single codebase and artifact built and deployed together. It's usually the simplest and most appropriate choice for small teams and new projects.",
    ],
  },
  {
    id: "arch-j-microservices-benefit",
    level: "junior",
    tags: ["microservices"],
    q: [
      "مزیت اصلی microservices نسبت به monolith کدام است؟",
      "What is a key benefit of microservices compared to a monolith?",
    ],
    options: [
      ["deploy و scale مستقل هر سرویس توسط تیم‌های جداگانه", "Independent deployment and scaling of each service by separate teams"],
      ["کاهش خودکار latency چون همه فراخوانی‌ها شبکه‌ای هستند", "Automatically lower latency because all calls go over the network"],
      ["ساده‌تر شدن debugging و مانیتورینگ کل سیستم", "Simpler debugging and monitoring of the whole system"],
      ["حذف کامل نیاز به تراکنش و مدیریت consistency", "Completely removing the need for transactions and consistency handling"],
    ],
    a: [
      "microservices اجازه می‌دهد هر سرویس مستقل deploy و scale شود و تیم‌ها خودمختار باشند. در عوض پیچیدگی شبکه، observability و consistency بیشتر می‌شود.",
      "Microservices let each service be deployed and scaled independently with autonomous teams. In exchange, network, observability, and consistency complexity increases.",
    ],
  },
  {
    id: "arch-j-microservices-cost",
    level: "junior",
    tags: ["microservices", "trade-offs"],
    q: [
      "کدام مورد یک هزینه رایج مهاجرت به microservices است؟",
      "Which is a common cost of moving to microservices?",
    ],
    options: [
      ["پیچیدگی عملیاتی بیشتر: شبکه، مانیتورینگ و داده توزیع‌شده", "More operational complexity: networking, monitoring, and distributed data"],
      ["عدم امکان استفاده از بیش از یک زبان برنامه‌نویسی", "Being unable to use more than one programming language"],
      ["ناتوانی در scale افقی سرویس‌ها", "Inability to scale services horizontally"],
      ["نیاز به deploy همزمان همه سرویس‌ها در هر تغییر", "Having to deploy all services together on every change"],
    ],
    a: [
      "فراخوانی‌های شبکه‌ای می‌توانند fail شوند، داده بین سرویس‌ها پخش است و ردیابی درخواست‌ها سخت‌تر می‌شود. به همین دلیل microservices نیاز به بلوغ DevOps دارد.",
      "Network calls can fail, data is spread across services, and tracing requests gets harder. That's why microservices require DevOps maturity.",
    ],
  },
  {
    id: "arch-j-horizontal-vs-vertical",
    level: "junior",
    tags: ["scaling"],
    q: [
      "تفاوت scale افقی (horizontal) و عمودی (vertical) چیست؟",
      "What is the difference between horizontal and vertical scaling?",
    ],
    options: [
      ["افقی یعنی افزودن ماشین‌های بیشتر؛ عمودی یعنی قوی‌تر کردن یک ماشین", "Horizontal adds more machines; vertical makes one machine more powerful"],
      ["افقی یعنی افزودن CPU و RAM؛ عمودی یعنی افزودن سرور", "Horizontal adds CPU and RAM; vertical adds servers"],
      ["افقی فقط برای دیتابیس است و عمودی فقط برای سرور اپلیکیشن", "Horizontal is only for databases and vertical only for app servers"],
      ["هر دو یکی هستند و فقط در cloud نامشان فرق دارد", "They are the same and only named differently in the cloud"],
    ],
    a: [
      "scale عمودی سقف سخت‌افزاری دارد و یک نقطه شکست باقی می‌ماند. scale افقی تقریباً نامحدود است اما نیاز دارد سرویس stateless باشد و load balancer داشته باشیم.",
      "Vertical scaling hits a hardware ceiling and keeps a single point of failure. Horizontal scaling is nearly unbounded but requires stateless services and a load balancer.",
    ],
  },
  {
    id: "arch-j-stateless-service",
    level: "junior",
    tags: ["scaling", "stateless"],
    q: [
      "چرا stateless بودن سرویس‌ها برای scale افقی مهم است؟",
      "Why does being stateless matter for horizontal scaling?",
    ],
    options: [
      ["هر instance می‌تواند هر درخواستی را پاسخ دهد چون state در حافظه محلی نیست", "Any instance can serve any request because no state lives in local memory"],
      ["چون سرویس‌های stateless نیازی به دیتابیس ندارند", "Because stateless services don't need a database"],
      ["چون سرویس‌های stateless همیشه سریع‌تر از stateful هستند", "Because stateless services are always faster than stateful ones"],
      ["چون stateless بودن نیاز به load balancer را حذف می‌کند", "Because being stateless removes the need for a load balancer"],
    ],
    a: [
      "اگر session یا state در حافظه یک instance باشد، درخواست بعدی باید به همان instance برود. با نگهداری state در منبع مشترکی مثل Redis یا دیتابیس، instanceها قابل جایگزینی می‌شوند.",
      "If session state lives in one instance's memory, follow-up requests must hit that instance. Storing state in a shared store like Redis or a database makes instances interchangeable.",
    ],
  },
  {
    id: "arch-j-load-balancer-role",
    level: "junior",
    tags: ["load-balancing"],
    q: [
      "وظیفه اصلی load balancer چیست؟",
      "What is the main job of a load balancer?",
    ],
    options: [
      ["توزیع ترافیک ورودی بین چند instance سالم", "Distributing incoming traffic across multiple healthy instances"],
      ["ذخیره‌سازی دائمی داده‌های کاربران", "Permanently storing user data"],
      ["کامپایل کد و ساخت image کانتینر", "Compiling code and building container images"],
      ["رمزنگاری داده‌ها در دیتابیس", "Encrypting data at rest in the database"],
    ],
    a: [
      "load balancer درخواست‌ها را بین سرورها پخش می‌کند و با health check، instanceهای خراب را کنار می‌گذارد. این کار هم ظرفیت و هم availability را بالا می‌برد.",
      "A load balancer spreads requests across servers and uses health checks to remove unhealthy instances. This increases both capacity and availability.",
    ],
  },
  {
    id: "arch-j-round-robin",
    level: "junior",
    tags: ["load-balancing"],
    q: [
      "الگوریتم Round Robin در load balancing چگونه کار می‌کند؟",
      "How does the Round Robin load-balancing algorithm work?",
    ],
    options: [
      ["درخواست‌ها به‌ترتیب و چرخشی به سرورها داده می‌شوند", "Requests are handed to servers in turn, cycling through the list"],
      ["هر درخواست به سروری با کمترین اتصال فعال می‌رود", "Each request goes to the server with the fewest active connections"],
      ["درخواست‌ها بر اساس hash آدرس IP کلاینت توزیع می‌شوند", "Requests are distributed by hashing the client IP address"],
      ["همه درخواست‌ها به سریع‌ترین سرور فرستاده می‌شوند", "All requests are sent to the fastest server"],
    ],
    a: [
      "Round Robin ساده‌ترین الگوریتم است و به نوبت سرور بعدی را انتخاب می‌کند. وقتی درخواست‌ها هزینه متفاوتی دارند، الگوریتم‌هایی مثل least connections بهتر عمل می‌کنند.",
      "Round Robin is the simplest algorithm, picking the next server in turn. When requests vary in cost, algorithms like least connections often perform better.",
    ],
  },
  {
    id: "arch-j-reverse-proxy",
    level: "junior",
    tags: ["reverse-proxy", "nginx"],
    q: [
      "reverse proxy مثل Nginx معمولاً چه کاری انجام می‌دهد؟",
      "What does a reverse proxy like Nginx typically do?",
    ],
    options: [
      ["جلوی سرورهای backend می‌نشیند و درخواست‌ها را به آن‌ها forward می‌کند", "Sits in front of backend servers and forwards requests to them"],
      ["از طرف کلاینت‌ها به اینترنت درخواست می‌فرستد تا IP آن‌ها پنهان شود", "Sends requests to the internet on behalf of clients to hide their IP"],
      ["کوئری‌های دیتابیس را بهینه و rewrite می‌کند", "Optimizes and rewrites database queries"],
      ["کد backend را به فایل‌های static تبدیل می‌کند", "Converts backend code into static files"],
    ],
    a: [
      "reverse proxy نماینده سرورهاست: TLS termination، load balancing، compression و سرو فایل‌های static را انجام می‌دهد. forward proxy برعکس، نماینده کلاینت است.",
      "A reverse proxy represents the servers: it handles TLS termination, load balancing, compression, and static files. A forward proxy, in contrast, represents the client.",
    ],
  },
  {
    id: "arch-j-api-gateway",
    level: "junior",
    tags: ["api-gateway", "microservices"],
    q: [
      "API Gateway در معماری microservices چه نقشی دارد؟",
      "What role does an API Gateway play in a microservices architecture?",
    ],
    options: [
      ["نقطه ورود واحد برای کلاینت‌ها با routing، auth و rate limiting", "A single entry point for clients handling routing, auth, and rate limiting"],
      ["دیتابیس مشترک بین همه سرویس‌ها", "A shared database used by all services"],
      ["ابزاری برای اجرای unit testها در CI", "A tool for running unit tests in CI"],
      ["صفی برای ذخیره پیام‌ها بین سرویس‌ها", "A queue that stores messages between services"],
    ],
    a: [
      "API Gateway درخواست‌های کلاینت را به سرویس مناسب route می‌کند و دغدغه‌های مشترک مثل احراز هویت، rate limiting و logging را متمرکز می‌کند.",
      "An API Gateway routes client requests to the right service and centralizes cross-cutting concerns like authentication, rate limiting, and logging.",
    ],
  },
  {
    id: "arch-j-health-check",
    level: "junior",
    tags: ["health-checks"],
    q: [
      "یک endpoint مثل `/health` معمولاً برای چه استفاده می‌شود؟",
      "What is an endpoint like `/health` typically used for?",
    ],
    options: [
      ["تا load balancer یا orchestrator بفهمد instance سالم است", "So a load balancer or orchestrator can tell if an instance is healthy"],
      ["برای برگرداندن لیست همه کاربران سیستم", "To return a list of all users in the system"],
      ["برای اجرای migrationهای دیتابیس هنگام startup", "To run database migrations at startup"],
      ["برای نمایش مستندات Swagger", "To display Swagger documentation"],
    ],
    a: [
      "health check به زیرساخت اجازه می‌دهد instanceهای خراب را از ترافیک خارج یا restart کند. باید سبک و سریع باشد تا خودش بار اضافه ایجاد نکند.",
      "Health checks let infrastructure remove broken instances from traffic or restart them. They should be lightweight and fast so they don't add load themselves.",
    ],
  },
  {
    id: "arch-j-liveness-vs-readiness",
    level: "junior",
    tags: ["health-checks", "kubernetes"],
    q: [
      "در Kubernetes تفاوت liveness probe و readiness probe چیست؟",
      "In Kubernetes, what is the difference between a liveness and a readiness probe?",
    ],
    options: [
      ["liveness شکست = restart کانتینر؛ readiness شکست = حذف از ترافیک", "Failed liveness restarts the container; failed readiness removes it from traffic"],
      ["liveness شکست = حذف از ترافیک؛ readiness شکست = restart کانتینر", "Failed liveness removes it from traffic; failed readiness restarts the container"],
      ["هر دو دقیقاً یک کار می‌کنند و فقط نامشان متفاوت است", "Both do exactly the same thing with different names"],
      ["liveness فقط هنگام build و readiness فقط هنگام deploy اجرا می‌شود", "Liveness runs only at build and readiness only at deploy"],
    ],
    a: [
      "liveness می‌پرسد آیا process گیر کرده و باید restart شود. readiness می‌پرسد آیا الان آماده پذیرش ترافیک است (مثلاً هنوز warm-up نشده یا وابستگی در دسترس نیست).",
      "Liveness asks whether the process is stuck and needs a restart. Readiness asks whether it can accept traffic right now (e.g., still warming up or a dependency is unavailable).",
    ],
  },
  {
    id: "arch-j-twelve-factor-config",
    level: "junior",
    tags: ["12-factor", "configuration"],
    q: [
      "طبق 12-Factor App، تنظیمات (config) مثل connection string کجا باید نگهداری شوند؟",
      "According to the 12-Factor App, where should config like connection strings be stored?",
    ],
    options: [
      ["در environment variables، جدا از کد", "In environment variables, separate from code"],
      ["به‌صورت hard-coded در سورس کد", "Hard-coded in the source code"],
      ["در فایل config داخل repository برای هر محیط", "In per-environment config files committed to the repository"],
      ["داخل image کانتینر در زمان build", "Baked into the container image at build time"],
    ],
    a: [
      "12-Factor می‌گوید config بین deployها تغییر می‌کند ولی کد نه، پس config باید در env vars باشد. این کار اجازه می‌دهد یک artifact در همه محیط‌ها deploy شود و secretها commit نشوند.",
      "12-Factor says config varies between deploys while code doesn't, so config belongs in env vars. This lets one artifact deploy everywhere and keeps secrets out of the repo.",
    ],
  },
  {
    id: "arch-j-twelve-factor-processes",
    level: "junior",
    tags: ["12-factor", "stateless"],
    q: [
      "اصل Processes در 12-Factor App چه می‌گوید؟",
      "What does the Processes factor of the 12-Factor App say?",
    ],
    options: [
      ["processها باید stateless و share-nothing باشند", "Processes should be stateless and share-nothing"],
      ["هر اپلیکیشن فقط باید یک process داشته باشد", "Each app must run as exactly one process"],
      ["processها باید session کاربر را در حافظه نگه دارند", "Processes should keep user sessions in memory"],
      ["processها باید روی دیسک محلی داده دائمی بنویسند", "Processes should write persistent data to local disk"],
    ],
    a: [
      "هر داده‌ای که باید باقی بماند باید در یک backing service مثل دیتابیس ذخیره شود. حافظه و دیسک محلی فقط cache موقت هستند چون process ممکن است هر لحظه از بین برود.",
      "Any data that must persist belongs in a backing service like a database. Local memory and disk are only a transient cache since a process may disappear at any time.",
    ],
  },
  {
    id: "arch-j-sync-vs-async",
    level: "junior",
    tags: ["service-communication"],
    q: [
      "تفاوت اصلی ارتباط همگام (REST/gRPC) و ناهمگام (events) بین سرویس‌ها چیست؟",
      "What is the main difference between synchronous (REST/gRPC) and asynchronous (events) service communication?",
    ],
    options: [
      ["در همگام فراخواننده منتظر پاسخ می‌ماند؛ در ناهمگام پیام منتشر می‌شود و منتظر نمی‌ماند", "In sync the caller waits for a reply; in async it publishes a message and moves on"],
      ["همگام فقط از UDP و ناهمگام فقط از TCP استفاده می‌کند", "Sync only uses UDP and async only uses TCP"],
      ["ارتباط ناهمگام همیشه سریع‌تر و بدون خطاست", "Async communication is always faster and error-free"],
      ["همگام نیازی به شبکه ندارد چون در یک process است", "Sync needs no network because it's in one process"],
    ],
    a: [
      "در ارتباط همگام، در دسترس نبودن سرویس مقصد مستقیماً روی فراخواننده اثر می‌گذارد. ارتباط ناهمگام coupling زمانی را کم می‌کند ولی eventual consistency و پیچیدگی ردیابی می‌آورد.",
      "With sync calls, an unavailable target directly affects the caller. Async messaging reduces temporal coupling but introduces eventual consistency and tracing complexity.",
    ],
  },
  {
    id: "arch-j-grpc",
    level: "junior",
    tags: ["service-communication", "grpc"],
    q: [
      "gRPC به‌طور پیش‌فرض از چه پروتکل و فرمت سریال‌سازی استفاده می‌کند؟",
      "What transport and serialization format does gRPC use by default?",
    ],
    options: [
      ["HTTP/2 و Protocol Buffers", "HTTP/2 and Protocol Buffers"],
      ["HTTP/1.1 و JSON", "HTTP/1.1 and JSON"],
      ["WebSocket و XML", "WebSocket and XML"],
      ["UDP و MessagePack", "UDP and MessagePack"],
    ],
    a: [
      "gRPC روی HTTP/2 با Protobuf باینری کار می‌کند که payload کوچک‌تر، streaming و قرارداد strongly-typed می‌دهد. برای ارتباط داخلی سرویس‌ها بسیار رایج است.",
      "gRPC runs over HTTP/2 with binary Protobuf, giving smaller payloads, streaming, and strongly typed contracts. It's very common for internal service-to-service calls.",
    ],
  },
  {
    id: "arch-j-timeout",
    level: "junior",
    tags: ["resilience"],
    q: [
      "چرا هر فراخوانی شبکه‌ای به سرویس دیگر باید timeout داشته باشد؟",
      "Why should every network call to another service have a timeout?",
    ],
    options: [
      ["تا یک وابستگی کند باعث گیر کردن نامحدود threadها و منابع نشود", "So a slow dependency can't tie up threads and resources indefinitely"],
      ["تا درخواست‌ها رمزنگاری شوند", "So requests get encrypted"],
      ["چون بدون timeout پاسخ‌ها cache نمی‌شوند", "Because responses can't be cached without a timeout"],
      ["تا سرویس مقصد سریع‌تر پردازش کند", "So the target service processes faster"],
    ],
    a: [
      "بدون timeout، درخواست‌ها به یک سرویس کند جمع می‌شوند و connection و حافظه را مصرف می‌کنند تا کل سرویس از کار بیفتد. timeout پایه سایر الگوهای resilience است.",
      "Without timeouts, requests pile up on a slow service, exhausting connections and memory until the caller fails too. Timeouts are the foundation of other resilience patterns.",
    ],
  },
  {
    id: "arch-j-retry-backoff",
    level: "junior",
    tags: ["resilience", "retries"],
    q: [
      "چرا retry باید با exponential backoff انجام شود؟",
      "Why should retries use exponential backoff?",
    ],
    options: [
      ["تا به سرویس در حال مشکل فرصت بازیابی بدهد و بار را تشدید نکند", "To give a struggling service time to recover instead of piling on load"],
      ["تا درخواست‌ها سریع‌تر از قبل ارسال شوند", "So requests are sent faster than before"],
      ["چون بدون backoff، retry غیرممکن است", "Because retries are impossible without backoff"],
      ["تا نیاز به timeout از بین برود", "To eliminate the need for timeouts"],
    ],
    a: [
      "retry فوری و مکرر می‌تواند سرویسی را که زیر فشار است کاملاً از پا درآورد. فاصله‌های افزایشی (مثلاً 100ms، 200ms، 400ms) همراه با jitter این خطر را کم می‌کند.",
      "Immediate repeated retries can overwhelm an already overloaded service. Increasing delays (e.g., 100ms, 200ms, 400ms) with jitter reduce that risk.",
    ],
  },
  {
    id: "arch-j-circuit-breaker-idea",
    level: "junior",
    tags: ["resilience", "circuit-breaker"],
    q: [
      "ایده اصلی الگوی Circuit Breaker چیست؟",
      "What is the core idea of the Circuit Breaker pattern?",
    ],
    options: [
      ["بعد از خطاهای مکرر، فراخوانی‌ها به سرویس خراب را موقتاً سریع fail کند", "After repeated failures, fail calls to the broken service fast for a while"],
      ["قطع برق سرور در صورت افزایش دما", "Cutting power to a server when it overheats"],
      ["تقسیم ترافیک بین دو نسخه از سرویس", "Splitting traffic between two versions of a service"],
      ["محدود کردن تعداد درخواست هر کاربر در دقیقه", "Limiting each user's requests per minute"],
    ],
    a: [
      "circuit breaker مثل فیوز برق عمل می‌کند: وقتی نرخ خطا بالا رفت باز می‌شود و درخواست‌ها بدون تماس با سرویس خراب fail می‌شوند. این کار از cascading failure جلوگیری می‌کند.",
      "A circuit breaker works like an electrical fuse: when the error rate rises it opens, and calls fail without hitting the broken service. This prevents cascading failures.",
    ],
  },
  {
    id: "arch-j-idempotency-basic",
    level: "junior",
    tags: ["idempotency"],
    q: [
      "یک عملیات idempotent چیست؟",
      "What is an idempotent operation?",
    ],
    options: [
      ["عملیاتی که اجرای چندباره آن همان نتیجه اجرای یک‌باره را دارد", "One where executing it multiple times has the same effect as once"],
      ["عملیاتی که هیچ‌وقت خطا نمی‌دهد", "One that never returns an error"],
      ["عملیاتی که فقط داده را می‌خواند", "One that only reads data"],
      ["عملیاتی که در کمتر از یک میلی‌ثانیه اجرا می‌شود", "One that runs in under one millisecond"],
    ],
    a: [
      "idempotency برای retry امن حیاتی است؛ مثلاً `PUT` و `DELETE` در HTTP باید idempotent باشند. عملیات غیرـidempotent مثل پرداخت را می‌توان با idempotency key امن کرد.",
      "Idempotency is essential for safe retries; e.g., HTTP `PUT` and `DELETE` should be idempotent. Non-idempotent operations like payments can be made safe with an idempotency key.",
    ],
  },
  {
    id: "arch-j-structured-logging",
    level: "junior",
    tags: ["observability", "logging"],
    q: [
      "structured logging چیست؟",
      "What is structured logging?",
    ],
    options: [
      ["نوشتن لاگ به فرمت قابل parse مثل JSON با فیلدهای مشخص", "Writing logs in a parseable format like JSON with named fields"],
      ["نوشتن لاگ‌ها فقط با حروف بزرگ برای خوانایی", "Writing logs in uppercase for readability"],
      ["ذخیره لاگ‌ها در جدول‌های جداگانه برای هر روز", "Storing logs in a separate table per day"],
      ["حذف همه لاگ‌ها در محیط production", "Removing all logs in production"],
    ],
    a: [
      "به‌جای متن آزاد، لاگ‌ها key/value دارند مثل `{\"level\":\"error\",\"userId\":42}`. این کار جستجو، فیلتر و aggregation در ابزارهایی مثل ELK یا Loki را بسیار ساده می‌کند.",
      "Instead of free text, logs carry key/value fields like `{\"level\":\"error\",\"userId\":42}`. This makes searching, filtering, and aggregating in tools like ELK or Loki much easier.",
    ],
  },
  {
    id: "arch-j-three-pillars",
    level: "junior",
    tags: ["observability"],
    q: [
      "سه ستون اصلی observability کدام‌اند؟",
      "What are the three pillars of observability?",
    ],
    options: [
      ["logs، metrics و traces", "Logs, metrics, and traces"],
      ["CPU، RAM و دیسک", "CPU, RAM, and disk"],
      ["unit، integration و e2e", "Unit, integration, and e2e"],
      ["dev، staging و production", "Dev, staging, and production"],
    ],
    a: [
      "logs رویدادهای جزئی را ثبت می‌کنند، metrics اعداد تجمیعی در طول زمان هستند و traces مسیر یک درخواست را بین سرویس‌ها نشان می‌دهند. ترکیب آن‌ها برای عیب‌یابی سیستم توزیع‌شده لازم است.",
      "Logs record discrete events, metrics are aggregated numbers over time, and traces show a request's path across services. Together they are needed to debug distributed systems.",
    ],
  },
  {
    id: "arch-j-correlation-id",
    level: "junior",
    tags: ["observability", "logging"],
    q: [
      "correlation ID (یا request ID) برای چه استفاده می‌شود؟",
      "What is a correlation ID (or request ID) used for?",
    ],
    options: [
      ["مرتبط کردن همه لاگ‌های یک درخواست در سرویس‌های مختلف", "Linking all logs of a single request across different services"],
      ["شناسایی یکتای هر کاربر در دیتابیس", "Uniquely identifying each user in the database"],
      ["رمزنگاری بدنه درخواست", "Encrypting the request body"],
      ["تعیین اولویت درخواست در صف", "Setting a request's priority in a queue"],
    ],
    a: [
      "یک ID در لبه سیستم ساخته و در headerها (مثلاً `X-Request-ID`) به سرویس‌های بعدی پاس داده می‌شود. با جستجوی آن می‌توان مسیر کامل یک درخواست را در لاگ‌ها دید.",
      "An ID is created at the edge and propagated in headers (e.g., `X-Request-ID`) to downstream services. Searching for it reveals a request's full path through the logs.",
    ],
  },
  {
    id: "arch-j-sla-slo-sli",
    level: "junior",
    tags: ["sre", "slo"],
    q: [
      "تفاوت SLI، SLO و SLA چیست؟",
      "What is the difference between SLI, SLO, and SLA?",
    ],
    options: [
      ["SLI معیار اندازه‌گیری، SLO هدف داخلی و SLA تعهد قراردادی با مشتری است", "SLI is the measurement, SLO the internal target, SLA the contractual promise to customers"],
      ["SLA معیار اندازه‌گیری، SLI هدف داخلی و SLO قرارداد است", "SLA is the measurement, SLI the internal target, SLO the contract"],
      ["هر سه مترادف و قابل جایگزینی هستند", "All three are synonyms and interchangeable"],
      ["SLI برای امنیت، SLO برای کارایی و SLA برای هزینه است", "SLI is for security, SLO for performance, SLA for cost"],
    ],
    a: [
      "مثلاً SLI درصد درخواست‌های موفق است، SLO می‌گوید این عدد باید 99.9% باشد و SLA جریمه نقض آن را در قرارداد تعیین می‌کند. SLO معمولاً سخت‌گیرانه‌تر از SLA است.",
      "For example, the SLI is the percentage of successful requests, the SLO says it should be 99.9%, and the SLA sets contractual penalties for breaching it. SLOs are usually stricter than SLAs.",
    ],
  },
  {
    id: "arch-j-test-pyramid",
    level: "junior",
    tags: ["testing"],
    q: [
      "طبق test pyramid، کدام نوع تست باید بیشترین تعداد را داشته باشد؟",
      "According to the test pyramid, which type of test should be most numerous?",
    ],
    options: [
      ["unit testها", "Unit tests"],
      ["end-to-end testها", "End-to-end tests"],
      ["تست‌های دستی", "Manual tests"],
      ["load testها", "Load tests"],
    ],
    a: [
      "unit testها سریع، ارزان و پایدارند پس پایه هرم هستند. integration testها کمتر و e2e testها که کند و شکننده‌اند در رأس هرم با تعداد کم قرار می‌گیرند.",
      "Unit tests are fast, cheap, and stable, so they form the base. Fewer integration tests sit in the middle, and a small number of slow, brittle e2e tests sit at the top.",
    ],
  },
  {
    id: "arch-j-unit-vs-integration",
    level: "junior",
    tags: ["testing"],
    q: [
      "تفاوت unit test و integration test چیست؟",
      "What is the difference between a unit test and an integration test?",
    ],
    options: [
      ["unit یک واحد را ایزوله تست می‌کند؛ integration تعامل چند جزء واقعی را", "Unit tests one piece in isolation; integration tests real components working together"],
      ["unit فقط در production و integration فقط در CI اجرا می‌شود", "Unit runs only in production and integration only in CI"],
      ["unit با UI و integration بدون UI است", "Unit uses the UI and integration doesn't"],
      ["تفاوتی ندارند، فقط ابزار تست متفاوت است", "No difference; only the test tool differs"],
    ],
    a: [
      "unit test معمولاً وابستگی‌ها را با test double جایگزین می‌کند. integration test مثلاً repository را با یک دیتابیس واقعی (مثلاً در Testcontainers) تست می‌کند.",
      "Unit tests usually replace dependencies with test doubles. An integration test might exercise a repository against a real database (e.g., via Testcontainers).",
    ],
  },
  {
    id: "arch-j-mock-vs-stub",
    level: "junior",
    tags: ["testing", "test-doubles"],
    q: [
      "تفاوت mock و stub در تست چیست؟",
      "What is the difference between a mock and a stub in testing?",
    ],
    options: [
      ["stub پاسخ از پیش تعیین‌شده برمی‌گرداند؛ mock تعاملات (فراخوانی‌ها) را verify می‌کند", "A stub returns canned answers; a mock verifies interactions (calls made)"],
      ["mock پاسخ ثابت برمی‌گرداند؛ stub فراخوانی‌ها را verify می‌کند", "A mock returns canned answers; a stub verifies calls"],
      ["stub یک پیاده‌سازی کامل و واقعی سبک است", "A stub is a full, lightweight working implementation"],
      ["هیچ تفاوتی ندارند", "There is no difference"],
    ],
    a: [
      "stub برای فراهم کردن ورودی به کد تحت تست است (state verification). mock انتظاراتی مثل «`send` یک بار با این آرگومان صدا زده شود» را بررسی می‌کند (behavior verification).",
      "A stub feeds inputs to the code under test (state verification). A mock checks expectations like 'send was called once with this argument' (behavior verification).",
    ],
  },
  {
    id: "arch-j-feature-flag",
    level: "junior",
    tags: ["feature-flags", "deployment"],
    q: [
      "feature flag چه کاربردی دارد؟",
      "What is a feature flag used for?",
    ],
    options: [
      ["فعال/غیرفعال کردن یک قابلیت در runtime بدون deploy جدید", "Turning a feature on/off at runtime without a new deploy"],
      ["علامت‌گذاری باگ‌ها در issue tracker", "Marking bugs in the issue tracker"],
      ["تعیین زبان برنامه‌نویسی هر سرویس", "Choosing each service's programming language"],
      ["رمزنگاری ویژگی‌های حساس کاربر", "Encrypting sensitive user attributes"],
    ],
    a: [
      "feature flag جدا کردن deploy از release را ممکن می‌کند: کد merge و deploy می‌شود ولی برای کاربران خاموش است. این امکان rollout تدریجی و kill switch سریع را می‌دهد.",
      "Feature flags decouple deploy from release: code is merged and deployed but kept off for users. They enable gradual rollouts and fast kill switches.",
    ],
  },
  {
    id: "arch-j-blue-green",
    level: "junior",
    tags: ["deployment"],
    q: [
      "در blue-green deployment چه اتفاقی می‌افتد؟",
      "What happens in a blue-green deployment?",
    ],
    options: [
      ["دو محیط کامل داریم و ترافیک یک‌باره از نسخه قدیم به جدید سوییچ می‌شود", "Two full environments exist and traffic switches from old to new at once"],
      ["instanceها یکی‌یکی با نسخه جدید جایگزین می‌شوند", "Instances are replaced one by one with the new version"],
      ["نسخه جدید فقط به ۱٪ کاربران داده می‌شود", "The new version is given to only 1% of users"],
      ["کد مستقیماً روی سرور production ویرایش می‌شود", "Code is edited directly on the production server"],
    ],
    a: [
      "نسخه جدید در محیط green کامل بالا می‌آید و تست می‌شود، سپس router ترافیک را سوییچ می‌کند. rollback فقط برگرداندن سوییچ به blue است، اما ظرفیت دوبرابر لازم است.",
      "The new version comes up fully in green and is tested, then the router flips traffic. Rollback is just flipping back to blue, but it needs double capacity.",
    ],
  },
  {
    id: "arch-j-canary",
    level: "junior",
    tags: ["deployment"],
    q: [
      "canary release چیست؟",
      "What is a canary release?",
    ],
    options: [
      ["عرضه نسخه جدید به درصد کمی از ترافیک و افزایش تدریجی در صورت سلامت", "Releasing to a small percentage of traffic and ramping up if healthy"],
      ["deploy همزمان نسخه جدید روی همه سرورها", "Deploying the new version to all servers at once"],
      ["اجرای تست‌ها فقط روی محیط staging", "Running tests only in staging"],
      ["نگهداری دو محیط کامل و سوییچ یک‌باره", "Keeping two full environments and switching at once"],
    ],
    a: [
      "در canary، نسخه جدید مثلاً ۵٪ ترافیک را می‌گیرد و metrics آن با نسخه فعلی مقایسه می‌شود. اگر خطا بالا رفت فقط بخش کوچکی از کاربران آسیب دیده‌اند.",
      "In a canary, the new version receives e.g. 5% of traffic and its metrics are compared to the current version. If errors rise, only a small slice of users is affected.",
    ],
  },
  {
    id: "arch-j-rolling",
    level: "junior",
    tags: ["deployment"],
    q: [
      "در rolling deployment چه اتفاقی می‌افتد؟",
      "What happens in a rolling deployment?",
    ],
    options: [
      ["instanceها به‌تدریج و دسته‌دسته با نسخه جدید جایگزین می‌شوند", "Instances are gradually replaced with the new version in batches"],
      ["کل سیستم خاموش و سپس با نسخه جدید روشن می‌شود", "The whole system is shut down then started with the new version"],
      ["دو محیط کامل موازی نگهداری می‌شود", "Two complete parallel environments are maintained"],
      ["نسخه جدید فقط برای کارمندان داخلی فعال است", "The new version is enabled only for internal staff"],
    ],
    a: [
      "rolling update پیش‌فرض Kubernetes است و نیاز به ظرفیت اضافه زیادی ندارد. در طول rollout دو نسخه همزمان اجرا می‌شوند پس API و schema باید سازگار با عقب باشند.",
      "Rolling update is Kubernetes' default and needs little extra capacity. During rollout both versions run simultaneously, so APIs and schemas must be backward compatible.",
    ],
  },
  {
    id: "arch-j-ddd-entity-vs-vo",
    level: "junior",
    tags: ["ddd"],
    q: [
      "در DDD تفاوت Entity و Value Object چیست؟",
      "In DDD, what is the difference between an Entity and a Value Object?",
    ],
    options: [
      ["Entity هویت پایدار دارد؛ Value Object با مقدارش تعریف می‌شود و immutable است", "An Entity has a stable identity; a Value Object is defined by its values and is immutable"],
      ["Entity همیشه immutable است و Value Object قابل تغییر", "An Entity is always immutable and a Value Object is mutable"],
      ["Value Object حتماً جدول جداگانه در دیتابیس دارد", "A Value Object must have its own database table"],
      ["Entity فقط در لایه controller استفاده می‌شود", "Entities are only used in the controller layer"],
    ],
    a: [
      "یک `User` با ID شناخته می‌شود حتی اگر نامش عوض شود (Entity). یک `Money(10, 'USD')` با مقدارش برابر است و دو نمونه با مقدار یکسان معادل‌اند (Value Object).",
      "A `User` is identified by its ID even if its name changes (Entity). A `Money(10, 'USD')` is equal by value, and two instances with the same values are interchangeable (Value Object).",
    ],
  },
  {
    id: "arch-j-ubiquitous-language",
    level: "junior",
    tags: ["ddd"],
    q: [
      "Ubiquitous Language در DDD به چه معناست؟",
      "What does Ubiquitous Language mean in DDD?",
    ],
    options: [
      ["واژگان مشترک بین توسعه‌دهندگان و متخصصان دامنه که در کد هم استفاده می‌شود", "A shared vocabulary between developers and domain experts, also used in code"],
      ["یک زبان برنامه‌نویسی واحد برای همه سرویس‌ها", "A single programming language for all services"],
      ["ترجمه رابط کاربری به همه زبان‌ها", "Translating the UI into all languages"],
      ["فرمت استاندارد JSON برای همه APIها", "A standard JSON format for all APIs"],
    ],
    a: [
      "اگر کسب‌وکار می‌گوید «سفارش ثبت نهایی شد»، کد هم باید `order.place()` داشته باشد نه `updateStatus(3)`. این کار سوءتفاهم بین تیم فنی و کسب‌وکار را کاهش می‌دهد.",
      "If the business says 'the order was placed', the code should have `order.place()` rather than `updateStatus(3)`. This reduces misunderstandings between engineers and the business.",
    ],
  },
  {
    id: "arch-j-bounded-context",
    level: "junior",
    tags: ["ddd"],
    q: [
      "Bounded Context در DDD چیست؟",
      "What is a Bounded Context in DDD?",
    ],
    options: [
      ["مرزی که در آن یک مدل و واژگان دامنه معنای سازگار و مشخص دارند", "A boundary within which a domain model and its terms have one consistent meaning"],
      ["محدودیت حافظه یک کانتینر", "A container's memory limit"],
      ["حداکثر تعداد درخواست مجاز برای هر کاربر", "The maximum number of requests per user"],
      ["محدوده متغیرها در یک تابع", "The scope of variables in a function"],
    ],
    a: [
      "مثلاً «Customer» در context فروش و در context پشتیبانی مدل‌های متفاوتی دارد. bounded contextها مرزهای طبیعی برای ماژول‌ها یا microserviceها هستند.",
      "For example, 'Customer' means different things in the Sales and Support contexts. Bounded contexts are natural boundaries for modules or microservices.",
    ],
  },
  {
    id: "arch-j-hexagonal-basic",
    level: "junior",
    tags: ["hexagonal", "clean-architecture"],
    q: [
      "هدف اصلی معماری Hexagonal (Ports & Adapters) چیست؟",
      "What is the main goal of Hexagonal Architecture (Ports & Adapters)?",
    ],
    options: [
      ["ایزوله کردن منطق دامنه از جزئیات بیرونی مثل دیتابیس و HTTP", "Isolating domain logic from external details like databases and HTTP"],
      ["تقسیم سیستم به دقیقاً شش سرویس", "Splitting the system into exactly six services"],
      ["قرار دادن همه کد در یک فایل برای سادگی", "Putting all code in one file for simplicity"],
      ["جایگزینی دیتابیس رابطه‌ای با NoSQL", "Replacing relational databases with NoSQL"],
    ],
    a: [
      "هسته اپلیکیشن فقط portها (interface) را تعریف می‌کند و adapterها (مثل Postgres یا REST controller) آن‌ها را پیاده می‌کنند. می‌توان هسته را بدون زیرساخت واقعی تست کرد.",
      "The application core defines only ports (interfaces), and adapters (like a Postgres repo or REST controller) implement them. The core can be tested without real infrastructure.",
    ],
  },
  {
    id: "arch-j-service-discovery",
    level: "junior",
    tags: ["service-discovery", "microservices"],
    q: [
      "service discovery چه مشکلی را حل می‌کند؟",
      "What problem does service discovery solve?",
    ],
    options: [
      ["یافتن آدرس فعلی instanceهای یک سرویس که مدام تغییر می‌کنند", "Finding the current addresses of service instances that keep changing"],
      ["پیدا کردن باگ‌ها در کد سرویس‌ها", "Finding bugs in service code"],
      ["کشف سرویس‌های جدید در marketplace ابری", "Discovering new services in a cloud marketplace"],
      ["تولید خودکار مستندات API", "Automatically generating API documentation"],
    ],
    a: [
      "در محیط‌های پویا instanceها با autoscaling و restart آدرس IP جدید می‌گیرند. registryهایی مثل Consul یا DNS داخلی Kubernetes آدرس‌های سالم را در اختیار کلاینت‌ها می‌گذارند.",
      "In dynamic environments, instances get new IPs through autoscaling and restarts. Registries like Consul or Kubernetes' internal DNS give clients the current healthy addresses.",
    ],
  },
  {
    id: "arch-j-background-worker",
    level: "junior",
    tags: ["background-jobs"],
    q: [
      "چه زمانی بهتر است کاری مثل ارسال ایمیل را به background worker بسپاریم؟",
      "When is it better to hand off work like sending email to a background worker?",
    ],
    options: [
      ["وقتی کار کند است و کاربر نیازی به نتیجه فوری آن در پاسخ ندارد", "When the work is slow and the user doesn't need its result in the response"],
      ["وقتی کار باید داخل همان تراکنش دیتابیس اتمیک باشد", "When the work must be atomic within the same database transaction"],
      ["وقتی پاسخ API بدون آن نتیجه بی‌معناست", "When the API response is meaningless without its result"],
      ["فقط وقتی سرور CPU آزاد ندارد", "Only when the server has no free CPU"],
    ],
    a: [
      "کارهای کند مثل ایمیل، پردازش تصویر یا گزارش‌گیری را می‌توان در صف گذاشت تا worker انجام دهد. این کار latency درخواست را کم و retry را ممکن می‌کند.",
      "Slow tasks like email, image processing, or reports can be queued for a worker. This lowers request latency and makes retries possible.",
    ],
  },
  {
    id: "arch-j-serverless-cold-start",
    level: "junior",
    tags: ["serverless"],
    q: [
      "cold start در serverless به چه معناست؟",
      "What does cold start mean in serverless?",
    ],
    options: [
      ["تأخیر اضافه وقتی محیط اجرای جدیدی برای تابع ساخته و مقداردهی می‌شود", "Extra latency when a new execution environment is created and initialized"],
      ["خطای تابع وقتی دمای data center پایین است", "A function error when the data center is cold"],
      ["اولین deploy یک تابع در یک region جدید", "The first deployment of a function in a new region"],
      ["خاموش شدن تابع پس از هر درخواست", "The function shutting down after every request"],
    ],
    a: [
      "اگر instance گرمی موجود نباشد، پلتفرم باید runtime و کد را بارگذاری کند که ده‌ها میلی‌ثانیه تا چند ثانیه طول می‌کشد. bundle کوچک‌تر و provisioned concurrency آن را کاهش می‌دهد.",
      "If no warm instance exists, the platform must load the runtime and code, taking tens of milliseconds to seconds. Smaller bundles and provisioned concurrency reduce it.",
    ],
  },
  {
    id: "arch-j-rate-limit-edge",
    level: "junior",
    tags: ["rate-limiting"],
    q: [
      "چرا rate limiting را معمولاً در لبه سیستم (gateway یا reverse proxy) انجام می‌دهند؟",
      "Why is rate limiting often done at the edge (gateway or reverse proxy)?",
    ],
    options: [
      ["تا ترافیک بیش از حد قبل از رسیدن به سرویس‌های داخلی رد شود", "So excess traffic is rejected before it reaches internal services"],
      ["چون سرویس‌های داخلی نمی‌توانند HTTP status برگردانند", "Because internal services can't return HTTP statuses"],
      ["چون rate limiting فقط با Nginx ممکن است", "Because rate limiting is only possible with Nginx"],
      ["تا درخواست‌ها رمزنگاری شوند", "So requests get encrypted"],
    ],
    a: [
      "رد کردن زودهنگام درخواست‌ها با `429 Too Many Requests` در لبه، منابع سرویس‌های پشتی را حفظ می‌کند و سیاست واحدی برای همه سرویس‌ها اعمال می‌کند.",
      "Rejecting early at the edge with `429 Too Many Requests` protects backend resources and applies one consistent policy across services.",
    ],
  },
  {
    id: "arch-j-sticky-sessions",
    level: "junior",
    tags: ["load-balancing", "sessions"],
    q: [
      "sticky session در load balancer یعنی چه؟",
      "What are sticky sessions on a load balancer?",
    ],
    options: [
      ["درخواست‌های یک کاربر همیشه به همان instance فرستاده می‌شوند", "A user's requests are always routed to the same instance"],
      ["session کاربران هیچ‌وقت منقضی نمی‌شود", "User sessions never expire"],
      ["session در دیتابیس مشترک ذخیره می‌شود", "Sessions are stored in a shared database"],
      ["هر درخواست به instance تصادفی می‌رود", "Each request goes to a random instance"],
    ],
    a: [
      "sticky session (مثلاً با cookie) برای سرویس‌هایی که state را در حافظه نگه می‌دارند کار می‌کند ولی توزیع بار را نامتوازن می‌کند و با خرابی instance، session از بین می‌رود.",
      "Sticky sessions (e.g., via a cookie) work for services keeping state in memory, but they unbalance load and lose sessions when an instance dies.",
    ],
  },
  {
    id: "arch-j-graceful-degradation",
    level: "junior",
    tags: ["resilience"],
    q: [
      "graceful degradation در یک سیستم backend به چه معناست؟",
      "What does graceful degradation mean in a backend system?",
    ],
    options: [
      ["در صورت خرابی یک بخش، سیستم با قابلیت محدودتر به کار ادامه دهد", "When one part fails, the system keeps working with reduced functionality"],
      ["کاهش تدریجی نسخه نرم‌افزار به نسخه قدیمی", "Gradually downgrading software to an older version"],
      ["خاموش شدن کامل سیستم برای جلوگیری از خطای بیشتر", "Shutting down entirely to prevent further errors"],
      ["کاهش کیفیت کد برای افزایش سرعت توسعه", "Lowering code quality to ship faster"],
    ],
    a: [
      "مثلاً اگر سرویس recommendation از دسترس خارج شد، صفحه محصول بدون پیشنهادها یا با لیست پیش‌فرض نمایش داده شود. قابلیت اصلی (خرید) نباید به قابلیت جانبی وابسته باشد.",
      "For example, if the recommendation service is down, the product page shows without recommendations or with a default list. Core features (checkout) shouldn't depend on optional ones.",
    ],
  },
  {
    id: "arch-j-latency-numbers",
    level: "junior",
    tags: ["performance", "latency"],
    q: [
      "کدام عملیات معمولاً کندترین است؟",
      "Which operation is typically the slowest?",
    ],
    options: [
      ["یک round trip شبکه بین دو قاره", "A network round trip between continents"],
      ["خواندن از RAM", "Reading from RAM"],
      ["دسترسی به L1 cache پردازنده", "Accessing the CPU's L1 cache"],
      ["یک round trip شبکه داخل همان data center", "A network round trip within the same data center"],
    ],
    a: [
      "L1 حدود نانوثانیه، RAM حدود ۱۰۰ نانوثانیه، round trip داخل data center حدود ۰.۵ میلی‌ثانیه و بین قاره‌ها حدود ۱۰۰ تا ۱۵۰ میلی‌ثانیه است. فاصله فیزیکی محدودیت سرعت نور دارد.",
      "L1 is about a nanosecond, RAM ~100ns, an intra-datacenter round trip ~0.5ms, and cross-continent ~100-150ms. Physical distance is bounded by the speed of light.",
    ],
  },
  {
    id: "arch-j-p99",
    level: "junior",
    tags: ["performance", "latency"],
    q: [
      "p99 latency برابر 800ms یعنی چه؟",
      "What does a p99 latency of 800ms mean?",
    ],
    options: [
      ["۹۹٪ درخواست‌ها در 800ms یا کمتر پاسخ گرفته‌اند", "99% of requests completed in 800ms or less"],
      ["میانگین زمان پاسخ 800ms است", "The average response time is 800ms"],
      ["۹۹ درخواست در هر 800ms پردازش می‌شود", "99 requests are processed every 800ms"],
      ["۱٪ درخواست‌ها در 800ms یا کمتر پاسخ گرفته‌اند", "1% of requests completed in 800ms or less"],
    ],
    a: [
      "percentileها توزیع latency را بهتر از میانگین نشان می‌دهند، چون میانگین درخواست‌های کند (tail) را پنهان می‌کند. p99 یعنی ۱٪ کندترین درخواست‌ها بیش از 800ms طول کشیده‌اند.",
      "Percentiles show the latency distribution better than the mean, which hides slow tail requests. p99 means the slowest 1% took longer than 800ms.",
    ],
  },
  {
    id: "arch-j-modular-monolith",
    level: "junior",
    tags: ["monolith", "modular-monolith"],
    q: [
      "modular monolith چیست؟",
      "What is a modular monolith?",
    ],
    options: [
      ["یک واحد deploy با ماژول‌های داخلی که مرزها و interfaceهای واضح دارند", "A single deployable with internal modules that have clear boundaries and interfaces"],
      ["مجموعه‌ای از microserviceها با یک دیتابیس مشترک", "A set of microservices sharing one database"],
      ["monolithی که هر ماژولش جداگانه deploy می‌شود", "A monolith where each module deploys separately"],
      ["monolithی که فقط روی یک سرور فیزیکی اجرا می‌شود", "A monolith that runs only on one physical server"],
    ],
    a: [
      "modular monolith سادگی عملیاتی monolith را با مرزبندی خوب ماژول‌ها ترکیب می‌کند. اگر بعداً نیاز شد، ماژول‌ها راحت‌تر به سرویس جدا تبدیل می‌شوند.",
      "A modular monolith combines the operational simplicity of a monolith with well-defined module boundaries. If needed later, modules are easier to extract into services.",
    ],
  },
  {
    id: "arch-j-cap-basic",
    level: "junior",
    tags: ["distributed-systems", "cap"],
    q: [
      "قضیه CAP در زمان partition شبکه چه انتخابی را به ما تحمیل می‌کند؟",
      "During a network partition, what choice does the CAP theorem force?",
    ],
    options: [
      ["بین Consistency و Availability", "Between Consistency and Availability"],
      ["بین Cost و Performance", "Between Cost and Performance"],
      ["بین Caching و Persistence", "Between Caching and Persistence"],
      ["بین Concurrency و Atomicity", "Between Concurrency and Atomicity"],
    ],
    a: [
      "در سیستم توزیع‌شده partition اجتناب‌ناپذیر است، پس هنگام وقوع آن یا باید درخواست‌ها را رد کنیم تا داده ناسازگار برنگردد (CP) یا پاسخ احتمالاً قدیمی بدهیم (AP).",
      "Partitions are unavoidable in distributed systems, so during one you either reject requests to avoid inconsistent data (CP) or serve possibly stale data (AP).",
    ],
  },
  {
    id: "arch-j-eventual-consistency",
    level: "junior",
    tags: ["consistency"],
    q: [
      "eventual consistency به چه معناست؟",
      "What does eventual consistency mean?",
    ],
    options: [
      ["اگر نوشتن جدیدی رخ ندهد، همه replicaها در نهایت به یک مقدار می‌رسند", "If no new writes occur, all replicas eventually converge to the same value"],
      ["داده هرگز بین replicaها همگام نمی‌شود", "Data is never synchronized between replicas"],
      ["هر خواندن همیشه آخرین نوشتن را برمی‌گرداند", "Every read always returns the latest write"],
      ["داده فقط یک بار در روز همگام‌سازی می‌شود", "Data is synchronized only once a day"],
    ],
    a: [
      "در eventual consistency ممکن است برای مدت کوتاهی خواندن، داده قدیمی برگرداند. این مدل availability و latency بهتری می‌دهد و در بسیاری از سیستم‌های توزیع‌شده رایج است.",
      "With eventual consistency, reads may briefly return stale data. The model offers better availability and latency and is common in distributed systems.",
    ],
  },
]);
