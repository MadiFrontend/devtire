import { build } from "../build";

export const backendArchitectureSenior = build("backend-architecture", [
  {
    id: "arch-s-2pc-drawback",
    level: "senior",
    tags: ["distributed-transactions", "2pc"],
    q: [
      "مشکل اصلی Two-Phase Commit (2PC) در معماری microservices چیست؟",
      "What is the main problem with Two-Phase Commit (2PC) in a microservices architecture?",
    ],
    options: [
      ["blocking است: اگر coordinator بعد از prepare از کار بیفتد، participantها lockها را نگه می‌دارند", "It's blocking: if the coordinator fails after prepare, participants hold their locks"],
      ["consistency را تضمین نمی‌کند و همیشه داده ناسازگار می‌سازد", "It provides no consistency and always yields inconsistent data"],
      ["فقط روی دیتابیس‌های NoSQL کار می‌کند", "It only works on NoSQL databases"],
      ["نیاز به هیچ هماهنگی بین سرویس‌ها ندارد", "It requires no coordination between services"],
    ],
    a: [
      "2PC اتمیک بودن را تضمین می‌کند ولی availability را به coordinator و همه participantها گره می‌زند و latency و lock contention را بالا می‌برد. بسیاری از brokerها و APIهای HTTP هم از XA پشتیبانی نمی‌کنند؛ برای همین saga رایج‌تر است.",
      "2PC guarantees atomicity but couples availability to the coordinator and every participant, increasing latency and lock contention. Many brokers and HTTP APIs don't support XA either, which is why sagas are more common.",
    ],
  },
  {
    id: "arch-s-saga-choreo-vs-orch",
    level: "senior",
    tags: ["saga", "distributed-transactions"],
    q: [
      "تفاوت saga به روش choreography و orchestration چیست؟",
      "What is the difference between choreography and orchestration sagas?",
    ],
    options: [
      ["choreography: سرویس‌ها به eventهای هم واکنش می‌دهند؛ orchestration: یک orchestrator مرکزی مراحل را فرمان می‌دهد", "Choreography: services react to each other's events; orchestration: a central orchestrator commands each step"],
      ["choreography از 2PC و orchestration از lock توزیع‌شده استفاده می‌کند", "Choreography uses 2PC and orchestration uses distributed locks"],
      ["orchestration نیاز به compensating transaction ندارد", "Orchestration doesn't need compensating transactions"],
      ["choreography فقط برای سرویس‌های همگام قابل استفاده است", "Choreography only works with synchronous services"],
    ],
    a: [
      "choreography coupling کمتری دارد ولی با رشد مراحل، فهم و دیباگ جریان سخت می‌شود. orchestration (مثلاً با Temporal) جریان را صریح و قابل مشاهده می‌کند ولی orchestrator باید با دقت طراحی شود تا god service نشود.",
      "Choreography is loosely coupled but becomes hard to follow and debug as steps grow. Orchestration (e.g., with Temporal) makes the flow explicit and observable, but the orchestrator must be designed carefully to avoid a god service.",
    ],
  },
  {
    id: "arch-s-saga-compensation",
    level: "senior",
    tags: ["saga"],
    q: [
      "در یک saga، compensating transaction چیست؟",
      "In a saga, what is a compensating transaction?",
    ],
    options: [
      ["عملیاتی معنایی که اثر یک مرحله commit‌شده را خنثی می‌کند، مثل refund برای charge", "A semantic action that undoes a committed step's effect, like a refund for a charge"],
      ["rollback دیتابیس که همه مراحل قبلی را به‌صورت فیزیکی برمی‌گرداند", "A database rollback that physically reverts all previous steps"],
      ["تراکنشی که هزینه زیرساخت را جبران می‌کند", "A transaction that offsets infrastructure costs"],
      ["retry خودکار مرحله شکست‌خورده", "An automatic retry of the failed step"],
    ],
    a: [
      "هر مرحله saga تراکنش محلی مستقل است و commit شده، پس rollback فیزیکی ممکن نیست. compensation باید idempotent باشد و ممکن است اثرات قابل مشاهده (مثل ایمیل ارسال‌شده) را کاملاً پاک نکند.",
      "Each saga step is an independent local transaction that already committed, so physical rollback is impossible. Compensations must be idempotent and may not fully erase visible effects (like a sent email).",
    ],
  },
  {
    id: "arch-s-saga-isolation",
    level: "senior",
    tags: ["saga", "consistency"],
    q: [
      "کدام ویژگی ACID در saga به‌طور ذاتی وجود ندارد و باید با countermeasureها جبران شود؟",
      "Which ACID property do sagas inherently lack, requiring countermeasures?",
    ],
    options: [
      ["Isolation", "Isolation"],
      ["Durability", "Durability"],
      ["Atomicity در هر تراکنش محلی", "Atomicity of each local transaction"],
      ["هیچ کدام؛ saga کاملاً ACID است", "None; sagas are fully ACID"],
    ],
    a: [
      "سایر تراکنش‌ها می‌توانند حالت‌های میانی saga را ببینند (dirty read، lost update). countermeasureهایی مثل semantic lock (وضعیت `PENDING`)، commutative updates و reread value این مشکل را کاهش می‌دهند.",
      "Other transactions can observe a saga's intermediate states (dirty reads, lost updates). Countermeasures like semantic locks (a `PENDING` status), commutative updates, and reread-value mitigate this.",
    ],
  },
  {
    id: "arch-s-cap-ca-myth",
    level: "senior",
    tags: ["cap", "distributed-systems"],
    q: [
      "چرا ادعای «سیستم توزیع‌شده ما CA است» معمولاً گمراه‌کننده است؟",
      "Why is claiming 'our distributed system is CA' usually misleading?",
    ],
    options: [
      ["چون partition شبکه اجتناب‌ناپذیر است و هنگام وقوع باید بین C و A انتخاب کرد", "Because network partitions are unavoidable, and when one occurs you must choose C or A"],
      ["چون CA فقط برای دیتابیس‌های NoSQL معنا دارد", "Because CA only applies to NoSQL databases"],
      ["چون CAP فقط به سیستم‌های تک‌نود مربوط است", "Because CAP only concerns single-node systems"],
      ["چون Availability در CAP به معنی uptime ماهانه است", "Because Availability in CAP means monthly uptime"],
    ],
    a: [
      "P یک انتخاب نیست بلکه واقعیت شبکه است. سیستمی که «CA» نامیده می‌شود در عمل هنگام partition یا در دسترس نیست یا consistency را از دست می‌دهد؛ CAP فقط رفتار در زمان partition را توصیف می‌کند.",
      "P isn't a choice but a fact of networks. A so-called 'CA' system either becomes unavailable or loses consistency during a partition; CAP only describes behavior during a partition.",
    ],
  },
  {
    id: "arch-s-pacelc",
    level: "senior",
    tags: ["cap", "consistency"],
    q: [
      "PACELC چه چیزی به CAP اضافه می‌کند؟",
      "What does PACELC add to CAP?",
    ],
    options: [
      ["در نبود partition (Else) هم باید بین Latency و Consistency انتخاب کرد", "Even without a partition (Else), you trade off Latency versus Consistency"],
      ["Partition را به‌عنوان ویژگی اختیاری حذف می‌کند", "It removes Partition as an optional property"],
      ["Performance و Cost را به‌عنوان محور سوم اضافه می‌کند", "It adds Performance and Cost as a third axis"],
      ["ثابت می‌کند هر سه ویژگی CAP همزمان قابل دستیابی است", "It proves all three CAP properties are achievable together"],
    ],
    a: [
      "در حالت عادی هم replication همگام برای consistency قوی latency را بالا می‌برد. مثلاً DynamoDB به‌صورت پیش‌فرض PA/EL است و Spanner به‌صورت PC/EC.",
      "Even in normal operation, synchronous replication for strong consistency adds latency. For example, DynamoDB defaults to PA/EL while Spanner is PC/EC.",
    ],
  },
  {
    id: "arch-s-linearizability",
    level: "senior",
    tags: ["consistency"],
    q: [
      "linearizability (قوی‌ترین شکل strong consistency) چه تضمینی می‌دهد؟",
      "What does linearizability (the strongest form of strong consistency) guarantee?",
    ],
    options: [
      ["هر عملیات به‌صورت اتمیک در لحظه‌ای بین شروع و پایانش اثر می‌کند و همه خواندن‌های بعدی آن را می‌بینند", "Each operation appears to take effect atomically at a point between its start and end, and all later reads see it"],
      ["همه replicaها در نهایت همگرا می‌شوند", "All replicas eventually converge"],
      ["هر کلاینت نوشته‌های خودش را می‌بیند ولی نه دیگران را", "Each client sees its own writes but not others'"],
      ["عملیات‌های یک کلاینت به‌ترتیب اعمال می‌شوند ولی ترتیب سراسری ندارند", "One client's operations apply in order but there's no global order"],
    ],
    a: [
      "linearizability سیستم را مثل یک کپی واحد با زمان واقعی رفتار می‌دهد. هزینه آن هماهنگی (consensus یا quorum) و latency بیشتر است. گزینه‌های دیگر eventual، read-your-writes و FIFO consistency هستند.",
      "Linearizability makes the system behave like a single copy respecting real time. Its cost is coordination (consensus or quorums) and higher latency. The other options describe eventual, read-your-writes, and FIFO consistency.",
    ],
  },
  {
    id: "arch-s-read-your-writes",
    level: "senior",
    tags: ["consistency", "replication"],
    q: [
      "کاربر پروفایلش را ویرایش می‌کند ولی پس از refresh مقدار قدیمی را می‌بیند چون خواندن از replica انجام شده. کدام تضمین نقض شده است؟",
      "A user edits their profile but sees the old value after refresh because the read hit a replica. Which guarantee is violated?",
    ],
    options: [
      ["read-your-writes", "Read-your-writes"],
      ["linearizability سراسری برای همه کاربران", "Global linearizability for all users"],
      ["durability", "Durability"],
      ["partition tolerance", "Partition tolerance"],
    ],
    a: [
      "read-your-writes یک session guarantee است و بدون consistency قوی سراسری قابل پیاده‌سازی است: مثلاً خواندن از primary برای مدتی پس از نوشتن، یا ارسال LSN/version نوشتن و صبر replica تا رسیدن به آن.",
      "Read-your-writes is a session guarantee achievable without global strong consistency: e.g., read from the primary for a short time after writing, or pass the write's LSN/version and wait for the replica to catch up.",
    ],
  },
  {
    id: "arch-s-exactly-once",
    level: "senior",
    tags: ["idempotency", "messaging"],
    q: [
      "رویکرد عملی برای رسیدن به اثر «exactly-once» در پردازش پیام‌ها چیست؟",
      "What is the practical approach to achieving 'exactly-once' effects in message processing?",
    ],
    options: [
      ["تحویل at-least-once همراه با پردازش idempotent یا deduplication", "At-least-once delivery combined with idempotent processing or deduplication"],
      ["تحویل at-most-once و امید به عدم خطای شبکه", "At-most-once delivery and hoping the network doesn't fail"],
      ["استفاده از TCP چون تحویل exactly-once را تضمین می‌کند", "Using TCP because it guarantees exactly-once delivery"],
      ["افزایش timeout تا retry هرگز لازم نشود", "Raising timeouts so retries are never needed"],
    ],
    a: [
      "تحویل exactly-once واقعی روی شبکه غیرقابل اعتماد در حالت کلی ممکن نیست. آنچه ممکن است «اثر» exactly-once است: پیام ممکن است تکرار شود ولی با کلید idempotency یا جدول پیام‌های پردازش‌شده فقط یک بار اثر می‌گذارد.",
      "True exactly-once delivery over an unreliable network isn't generally possible. What's achievable is exactly-once effect: messages may repeat, but an idempotency key or processed-messages table ensures a single effect.",
    ],
  },
  {
    id: "arch-s-retry-amplification",
    level: "senior",
    tags: ["resilience", "retries"],
    q: [
      "در یک call chain با ۴ لایه که هر لایه تا ۳ بار تلاش می‌کند، در بدترین حالت پایین‌ترین سرویس چند درخواست دریافت می‌کند و راه‌حل چیست؟",
      "In a 4-layer call chain where each layer makes up to 3 attempts, how many requests can the bottom service receive in the worst case, and what's the fix?",
    ],
    options: [
      ["۸۱ درخواست؛ retry فقط در یک لایه و استفاده از retry budget", "81 requests; retry at only one layer and use a retry budget"],
      ["۱۲ درخواست؛ افزایش تعداد retry در هر لایه", "12 requests; increase retries per layer"],
      ["۳ درخواست؛ نیازی به تغییر نیست", "3 requests; no change needed"],
      ["۴ درخواست؛ حذف timeoutها", "4 requests; remove timeouts"],
    ],
    a: [
      "retryها در لایه‌ها ضرب می‌شوند: `3^4 = 81`. این retry storm سرویسی را که در حال بهبود است دوباره از پا درمی‌آورد. retry budget (مثلاً حداکثر ۱۰٪ درخواست‌ها) و retry فقط در لایه نزدیک به خطا این مشکل را کنترل می‌کند.",
      "Retries multiply across layers: `3^4 = 81`. This retry storm knocks down a recovering service again. A retry budget (e.g., at most 10% extra requests) and retrying only at the layer nearest the failure keep it in check.",
    ],
  },
  {
    id: "arch-s-load-shedding",
    level: "senior",
    tags: ["resilience", "load-shedding"],
    q: [
      "چرا یک سرویس تحت overload بهتر است بخشی از درخواست‌ها را زود رد کند (load shedding)؟",
      "Why should an overloaded service reject some requests early (load shedding)?",
    ],
    options: [
      ["تا درخواست‌های پذیرفته‌شده در زمان معقول پاسخ بگیرند به‌جای اینکه همه timeout شوند", "So accepted requests finish in reasonable time instead of all of them timing out"],
      ["چون رد کردن درخواست باعث افزایش خودکار ظرفیت می‌شود", "Because rejecting requests automatically adds capacity"],
      ["تا کلاینت‌ها برای همیشه از سرویس استفاده نکنند", "So clients stop using the service forever"],
      ["چون load balancer بدون آن کار نمی‌کند", "Because the load balancer doesn't work without it"],
    ],
    a: [
      "بدون shedding صف‌ها رشد می‌کنند و latency همه درخواست‌ها از timeout کلاینت می‌گذرد، پس throughput مفید به صفر می‌رسد. رد سریع با `503` (ترجیحاً بر اساس اولویت) goodput را حفظ می‌کند.",
      "Without shedding, queues grow until every request exceeds the client timeout, driving useful throughput to zero. Fast rejection with `503` (ideally priority-aware) preserves goodput.",
    ],
  },
  {
    id: "arch-s-deadline-propagation",
    level: "senior",
    tags: ["resilience", "timeouts"],
    q: [
      "deadline propagation (مثل کاری که gRPC انجام می‌دهد) چه مزیتی دارد؟",
      "What is the benefit of deadline propagation (as gRPC does)?",
    ],
    options: [
      ["سرویس‌های پایین‌دستی می‌دانند چقدر زمان باقی مانده و کار بی‌فایده بعد از انقضای deadline را متوقف می‌کنند", "Downstream services know the remaining time and stop useless work once the deadline passes"],
      ["هر سرویس timeout مستقل و ثابت خودش را بدون توجه به فراخواننده دارد", "Each service keeps its own fixed timeout regardless of the caller"],
      ["deadline باعث می‌شود درخواست‌ها هرگز timeout نشوند", "Deadlines make requests never time out"],
      ["فقط برای لاگ کردن زمان درخواست استفاده می‌شود", "It's only used to log request time"],
    ],
    a: [
      "اگر کلاینت با timeout یک ثانیه منصرف شده، ادامه کار در سرویس‌های عمیق‌تر فقط منابع هدر می‌دهد. انتقال deadline مطلق در طول زنجیره، کل زمان را در یک budget نگه می‌دارد.",
      "If the client gave up after one second, deeper services continuing to work only waste resources. Propagating an absolute deadline down the chain keeps the whole call within one budget.",
    ],
  },
  {
    id: "arch-s-hedged-requests",
    level: "senior",
    tags: ["latency", "tail-latency"],
    q: [
      "hedged request چیست و چه هزینه‌ای دارد؟",
      "What is a hedged request and what does it cost?",
    ],
    options: [
      ["اگر پاسخ از حدود p95 دیرتر شد، درخواست دوم به replica دیگر فرستاده و اولین پاسخ استفاده می‌شود؛ بار کمی اضافه می‌کند", "If no reply by about p95, send a second request to another replica and use the first reply; adds a little load"],
      ["هر درخواست همیشه به همه replicaها فرستاده می‌شود؛ هزینه‌ای ندارد", "Every request always goes to all replicas; it's free"],
      ["درخواست تا پاسخ موفق بی‌نهایت retry می‌شود؛ latency را بالا می‌برد", "Requests retry forever until success; it increases latency"],
      ["درخواست‌ها در batch جمع و یک‌جا ارسال می‌شوند؛ throughput را کم می‌کند", "Requests are batched and sent together; it lowers throughput"],
    ],
    a: [
      "این تکنیک (از مقاله The Tail at Scale گوگل) tail latency را با حدود چند درصد بار اضافه به‌شدت کاهش می‌دهد. فقط برای عملیات idempotent مانند خواندن مناسب است.",
      "This technique (from Google's The Tail at Scale) sharply reduces tail latency for only a few percent extra load. It's only suitable for idempotent operations such as reads.",
    ],
  },
  {
    id: "arch-s-queue-load-leveling",
    level: "senior",
    tags: ["scaling", "async"],
    q: [
      "الگوی Queue-Based Load Leveling چه مزیتی دارد و چه چیزی را فدا می‌کند؟",
      "What does Queue-Based Load Leveling gain, and what does it sacrifice?",
    ],
    options: [
      ["spikeها را با صف جذب و consumer را با نرخ ثابت تغذیه می‌کند؛ در عوض latency پردازش بالاتر و پاسخ ناهمگام است", "Absorbs spikes in a queue and feeds consumers at a steady rate; costs higher processing latency and async responses"],
      ["latency را به صفر می‌رساند ولی throughput را کم می‌کند", "Reduces latency to zero but lowers throughput"],
      ["نیاز به هر نوع ذخیره‌سازی را حذف می‌کند", "Eliminates the need for any storage"],
      ["consistency قوی را تضمین می‌کند ولی availability را حذف می‌کند", "Guarantees strong consistency but removes availability"],
    ],
    a: [
      "سرویس پشتی می‌تواند برای بار میانگین provision شود نه peak. اما کاربر نتیجه را فوراً نمی‌گیرد و باید عمق صف (queue lag) مانیتور شود تا backlog کنترل‌نشده ایجاد نشود.",
      "The backend can be provisioned for average rather than peak load. But users don't get results immediately, and queue depth/lag must be monitored to avoid an unbounded backlog.",
    ],
  },
  {
    id: "arch-s-consistent-hashing-lb",
    level: "senior",
    tags: ["load-balancing", "consistent-hashing"],
    q: [
      "چرا برای routing به instanceهای stateful (مثل cache محلی) از consistent hashing به‌جای `hash(key) % N` استفاده می‌شود؟",
      "Why use consistent hashing instead of `hash(key) % N` for routing to stateful instances (like local caches)?",
    ],
    options: [
      ["با تغییر N فقط حدود `1/N` کلیدها جابه‌جا می‌شوند نه تقریباً همه", "Changing N remaps only about `1/N` of keys rather than nearly all"],
      ["چون consistent hashing امنیت رمزنگاری بیشتری دارد", "Because consistent hashing is cryptographically stronger"],
      ["چون `%` در زبان‌های برنامه‌نویسی کند است", "Because `%` is slow in programming languages"],
      ["چون consistent hashing توزیع بار را همیشه کاملاً یکنواخت می‌کند بدون virtual node", "Because it always perfectly balances load without virtual nodes"],
    ],
    a: [
      "با modulo، افزودن یک instance تقریباً همه کلیدها را جابه‌جا و cacheها را سرد می‌کند. consistent hashing (با virtual nodeها برای توزیع یکنواخت‌تر) این جابه‌جایی را حداقل می‌کند.",
      "With modulo, adding one instance remaps nearly every key and cold-starts all caches. Consistent hashing (with virtual nodes for smoother distribution) minimizes that movement.",
    ],
  },
  {
    id: "arch-s-conways-law",
    level: "senior",
    tags: ["organization", "microservices"],
    q: [
      "Inverse Conway Maneuver چیست؟",
      "What is the Inverse Conway Maneuver?",
    ],
    options: [
      ["ساختار تیم‌ها را عمداً مطابق معماری مطلوب طراحی کنیم چون سیستم ساختار ارتباطی سازمان را بازتاب می‌دهد", "Deliberately shaping teams to match the desired architecture, since systems mirror org communication"],
      ["معماری را دقیقاً برعکس ساختار سازمان طراحی کنیم", "Designing the architecture as the exact opposite of the org structure"],
      ["حذف همه تیم‌ها و ایجاد یک تیم واحد", "Removing all teams to form a single team"],
      ["تبدیل microservices به monolith", "Converting microservices into a monolith"],
    ],
    a: [
      "قانون Conway می‌گوید سیستم‌ها ساختار ارتباطی سازمان را کپی می‌کنند. اگر مرزهای سرویس با مرزهای تیم هم‌راستا نباشند، هماهنگی بین تیمی و coupling افزایش می‌یابد.",
      "Conway's law says systems copy the organization's communication structure. If service boundaries don't align with team boundaries, cross-team coordination and coupling increase.",
    ],
  },
  {
    id: "arch-s-nanoservices",
    level: "senior",
    tags: ["microservices", "anti-patterns"],
    q: [
      "کدام نشانه بیانگر سرویس‌های بیش از حد ریز (nanoservices) است؟",
      "Which symptom indicates overly fine-grained services (nanoservices)?",
    ],
    options: [
      ["یک use case ساده نیاز به ده‌ها فراخوانی شبکه‌ای chatty بین سرویس‌ها دارد", "A simple use case needs dozens of chatty network calls between services"],
      ["هر سرویس مالک یک bounded context کامل است", "Each service owns a whole bounded context"],
      ["سرویس‌ها می‌توانند مستقل deploy شوند", "Services can be deployed independently"],
      ["سرویس‌ها کمتر از ۱۰ درصد CPU مصرف می‌کنند", "Services use under 10% CPU"],
    ],
    a: [
      "وقتی مرزها خیلی ریز باشند، هزینه شبکه، serialization، استقرار و هماهنگی از ارزش استقلال بیشتر می‌شود. سرویس‌ها باید حول قابلیت‌های کسب‌وکار با cohesion بالا شکل بگیرند.",
      "When boundaries are too fine, the cost of networking, serialization, deployment, and coordination outweighs the value of independence. Services should form around cohesive business capabilities.",
    ],
  },
  {
    id: "arch-s-shared-library-coupling",
    level: "senior",
    tags: ["microservices", "coupling"],
    q: [
      "چرا اشتراک‌گذاری یک کتابخانه domain model مشترک بین چند microservice خطرناک است؟",
      "Why is sharing a common domain-model library across many microservices risky?",
    ],
    options: [
      ["coupling پنهان ایجاد می‌کند؛ تغییر مدل مشترک deploy هماهنگ همه سرویس‌ها را لازم می‌کند", "It creates hidden coupling; changing the shared model forces coordinated deploys of all services"],
      ["چون کتابخانه‌ها در microservices قابل استفاده نیستند", "Because libraries can't be used in microservices"],
      ["چون حجم image کانتینر را دو برابر می‌کند", "Because it doubles container image size"],
      ["چون باعث می‌شود سرویس‌ها کندتر کامپایل شوند", "Because it makes services compile slower"],
    ],
    a: [
      "کتابخانه‌های زیرساختی (logging، tracing) مشکلی ندارند، اما مدل دامنه مشترک bounded contextها را به هم می‌چسباند و به distributed monolith می‌انجامد. بهتر است هر سرویس قرارداد API یا event را خودش مدل کند.",
      "Infrastructure libraries (logging, tracing) are fine, but a shared domain model glues bounded contexts together and leads to a distributed monolith. Each service should model the API or event contract itself.",
    ],
  },
  {
    id: "arch-s-event-carried-state",
    level: "senior",
    tags: ["events", "microservices"],
    q: [
      "سرویس Order برای هر درخواست به‌صورت همگام اطلاعات Customer را می‌گیرد و قطعی Customer باعث قطعی Order می‌شود. کدام الگو این وابستگی زمانی را کم می‌کند؟",
      "The Order service synchronously fetches Customer data per request, so Customer outages take Order down. Which pattern reduces this temporal coupling?",
    ],
    options: [
      ["Event-Carried State Transfer: نگهداری کپی محلی داده‌های لازم Customer از طریق eventها", "Event-Carried State Transfer: keeping a local copy of needed Customer data via events"],
      ["افزایش timeout فراخوانی Customer به ۶۰ ثانیه", "Raising the Customer call timeout to 60 seconds"],
      ["ادغام دیتابیس Order و Customer در یک دیتابیس مشترک", "Merging the Order and Customer databases into one"],
      ["فراخوانی Customer دو بار برای اطمینان", "Calling Customer twice to be sure"],
    ],
    a: [
      "Customer تغییراتش را با eventهای حاوی داده منتشر می‌کند و Order یک read model محلی نگه می‌دارد. availability بهتر می‌شود ولی داده eventually consistent است و duplication باید آگاهانه پذیرفته شود.",
      "Customer publishes changes as data-bearing events and Order keeps a local read model. Availability improves, but data becomes eventually consistent and duplication must be accepted deliberately.",
    ],
  },
  {
    id: "arch-s-cqrs",
    level: "senior",
    tags: ["cqrs"],
    q: [
      "CQRS در چه شرایطی ارزش پیچیدگی‌اش را دارد؟",
      "When is CQRS worth its complexity?",
    ],
    options: [
      ["وقتی الگوهای خواندن و نوشتن بسیار متفاوت‌اند و نیاز به مدل یا scale جدا دارند", "When read and write patterns differ greatly and need separate models or scaling"],
      ["برای هر اپلیکیشن CRUD ساده از روز اول", "For every simple CRUD app from day one"],
      ["فقط وقتی تیم کمتر از سه نفر است", "Only when the team has fewer than three people"],
      ["وقتی consistency قوی بین خواندن و نوشتن الزامی است", "When strong read-after-write consistency is mandatory"],
    ],
    a: [
      "CQRS مدل نوشتن (با invariantها) را از مدل‌های خواندن denormalized جدا می‌کند. وقتی read modelها async به‌روز شوند، eventual consistency و زیرساخت بیشتری به سیستم اضافه می‌شود؛ برای CRUD ساده overkill است.",
      "CQRS separates the write model (with invariants) from denormalized read models. When read models update asynchronously it adds eventual consistency and infrastructure; it's overkill for simple CRUD.",
    ],
  },
  {
    id: "arch-s-event-sourcing",
    level: "senior",
    tags: ["event-sourcing"],
    q: [
      "کدام یک چالش واقعی event sourcing است؟",
      "Which is a real challenge of event sourcing?",
    ],
    options: [
      ["تکامل schema eventهای قدیمی (versioning/upcasting) و نیاز به snapshot برای streamهای بلند", "Evolving old event schemas (versioning/upcasting) and needing snapshots for long streams"],
      ["از دست رفتن تاریخچه تغییرات", "Losing the history of changes"],
      ["عدم امکان بازسازی state از روی eventها", "Being unable to rebuild state from events"],
      ["عدم امکان audit کردن تغییرات", "Being unable to audit changes"],
    ],
    a: [
      "در event sourcing، eventها منبع حقیقت و تغییرناپذیرند؛ پس تغییر ساختار آن‌ها نیاز به versioning دارد و حذف داده (مثل GDPR) با تکنیک‌هایی مثل crypto-shredding انجام می‌شود. audit و replay از مزایای آن است نه چالش.",
      "In event sourcing, events are the immutable source of truth, so changing their shape requires versioning, and data deletion (e.g., GDPR) needs techniques like crypto-shredding. Audit and replay are benefits, not challenges.",
    ],
  },
  {
    id: "arch-s-active-active",
    level: "senior",
    tags: ["multi-region", "consistency"],
    q: [
      "بزرگ‌ترین چالش معماری active-active چند region با نوشتن در هر دو region چیست؟",
      "What's the biggest challenge of an active-active multi-region architecture accepting writes in both regions?",
    ],
    options: [
      ["حل conflict نوشتن‌های همزمان روی یک داده (مثلاً LWW، CRDT یا home region per key)", "Resolving conflicting concurrent writes to the same data (e.g., LWW, CRDTs, or a home region per key)"],
      ["عدم امکان استفاده از DNS", "Being unable to use DNS"],
      ["اینکه فقط یک region می‌تواند ترافیک بخواند", "Only one region can serve reads"],
      ["نیاز به یک دیتابیس واحد بدون replication", "Needing a single database with no replication"],
    ],
    a: [
      "replication بین regionها با latency صدها میلی‌ثانیه معمولاً async است، پس دو نوشتن همزمان می‌توانند conflict ایجاد کنند. last-write-wins ساده است ولی داده گم می‌کند؛ CRDT یا مالکیت هر key توسط یک region جایگزین‌های ایمن‌ترند.",
      "Cross-region replication with ~100ms latency is usually async, so concurrent writes can conflict. Last-write-wins is simple but loses data; CRDTs or per-key home regions are safer alternatives.",
    ],
  },
  {
    id: "arch-s-split-brain-quorum",
    level: "senior",
    tags: ["distributed-systems", "consensus"],
    q: [
      "چرا کلاسترهای مبتنی بر consensus (مثل etcd) معمولاً تعداد نود فرد (۳ یا ۵) دارند؟",
      "Why do consensus-based clusters (like etcd) usually have an odd number of nodes (3 or 5)?",
    ],
    options: [
      ["برای majority quorum؛ نود زوج اضافه تحمل خطا را افزایش نمی‌دهد و split-brain را مهار می‌کند", "For majority quorums; an extra even node adds no fault tolerance, and quorums prevent split-brain"],
      ["چون الگوریتم Raft با عدد زوج کامپایل نمی‌شود", "Because Raft won't compile with an even count"],
      ["چون عدد فرد هزینه سخت‌افزار را کاهش می‌دهد", "Because odd counts reduce hardware cost"],
      ["چون یک نود همیشه باید خاموش بماند", "Because one node must always stay off"],
    ],
    a: [
      "با ۳ نود quorum برابر ۲ است و یک خرابی تحمل می‌شود؛ با ۴ نود quorum برابر ۳ است و باز هم فقط یک خرابی تحمل می‌شود. majority تضمین می‌کند دو بخش جداشده نتوانند همزمان leader انتخاب کنند.",
      "With 3 nodes the quorum is 2 and one failure is tolerated; with 4 the quorum is 3 and still only one failure is tolerated. A majority guarantees two partitioned halves can't both elect a leader.",
    ],
  },
  {
    id: "arch-s-fencing-token",
    level: "senior",
    tags: ["distributed-systems", "locking"],
    q: [
      "یک worker قفل توزیع‌شده می‌گیرد، دچار GC pause طولانی می‌شود، قفلش منقضی شده و worker دیگری قفل را می‌گیرد. چه مکانیزمی از نوشتن نادرست worker اول جلوگیری می‌کند؟",
      "A worker takes a distributed lock, hits a long GC pause, its lease expires, and another worker takes the lock. What prevents the first worker's stale write?",
    ],
    options: [
      ["fencing token: شماره افزایشی قفل که storage نوشتن با token قدیمی‌تر را رد می‌کند", "A fencing token: a monotonically increasing lock number; storage rejects writes with an older token"],
      ["افزایش TTL قفل به چند ساعت", "Raising the lock TTL to several hours"],
      ["چک کردن ساعت سیستم قبل از نوشتن", "Checking the system clock before writing"],
      ["گرفتن دو قفل به‌جای یکی", "Acquiring two locks instead of one"],
    ],
    a: [
      "lease به‌تنهایی کافی نیست چون process نمی‌داند pause شده است. با fencing token، منبع مقصد آخرین token دیده‌شده را نگه می‌دارد و نوشتن با token کوچک‌تر را رد می‌کند.",
      "A lease alone isn't enough because the process doesn't know it was paused. With fencing tokens, the target resource remembers the highest token seen and rejects writes carrying a lower one.",
    ],
  },
  {
    id: "arch-s-clock-skew",
    level: "senior",
    tags: ["distributed-systems", "time"],
    q: [
      "چرا مرتب کردن eventهای سرویس‌های مختلف بر اساس timestamp ساعت سیستم (wall clock) خطرناک است؟",
      "Why is ordering events from different services by wall-clock timestamps dangerous?",
    ],
    options: [
      ["clock skew و تنظیمات NTP باعث می‌شود ترتیب زمانی واقعی و علیت قابل اعتماد نباشد", "Clock skew and NTP adjustments make real-time order and causality unreliable"],
      ["چون timestampها همیشه در UTC ذخیره نمی‌شوند", "Because timestamps aren't always stored in UTC"],
      ["چون timestamp حجم پیام را زیاد می‌کند", "Because timestamps increase message size"],
      ["چون سرورها ساعت ندارند", "Because servers don't have clocks"],
    ],
    a: [
      "ساعت ماشین‌ها چند میلی‌ثانیه تا ثانیه اختلاف دارند و حتی می‌توانند به عقب برگردند. برای ترتیب علّی از Lamport/vector clock، hybrid logical clock یا شماره ترتیب از یک منبع واحد استفاده می‌شود.",
      "Machine clocks drift by milliseconds to seconds and can even jump backward. Causal ordering uses Lamport/vector clocks, hybrid logical clocks, or sequence numbers from a single source.",
    ],
  },
  {
    id: "arch-s-tail-sampling",
    level: "senior",
    tags: ["observability", "tracing"],
    q: [
      "مزیت tail-based sampling نسبت به head-based sampling در tracing چیست؟",
      "What is the advantage of tail-based over head-based sampling in tracing?",
    ],
    options: [
      ["تصمیم پس از کامل شدن trace گرفته می‌شود، پس می‌توان همه traceهای خطادار یا کند را نگه داشت", "The decision is made after the trace completes, so all erroneous or slow traces can be kept"],
      ["هیچ هزینه بافر یا حافظه‌ای ندارد", "It has no buffering or memory cost"],
      ["تصمیم در ابتدای درخواست گرفته می‌شود و ساده‌تر است", "The decision is made at the start of the request and is simpler"],
      ["همه traceها را بدون استثنا ذخیره می‌کند", "It stores every trace without exception"],
    ],
    a: [
      "head-based (مثلاً ۱٪ تصادفی) ارزان است ولی ممکن است trace خطای نادر را دور بریزد. tail-based در collector تمام spanها را بافر می‌کند و سپس تصمیم می‌گیرد، که حافظه و پیچیدگی بیشتری دارد.",
      "Head-based (e.g., random 1%) is cheap but may drop rare error traces. Tail-based buffers all spans in a collector and then decides, which costs more memory and complexity.",
    ],
  },
  {
    id: "arch-s-burn-rate-alerts",
    level: "senior",
    tags: ["sre", "slo", "alerting"],
    q: [
      "چرا alerting مبتنی بر burn rate (مصرف error budget) از alert روی آستانه ثابت نرخ خطا بهتر است؟",
      "Why is burn-rate (error-budget consumption) alerting better than a fixed error-rate threshold alert?",
    ],
    options: [
      ["هم مشکلات شدید را سریع و هم نشت‌های آهسته را تشخیص می‌دهد و alertهای بی‌اهمیت را کم می‌کند", "It catches severe incidents fast and slow leaks too, while reducing noisy alerts"],
      ["چون هیچ‌وقت false positive ندارد", "Because it never produces false positives"],
      ["چون نیازی به تعریف SLO ندارد", "Because it requires no SLO"],
      ["چون فقط روی CPU کار می‌کند", "Because it only works on CPU"],
    ],
    a: [
      "burn rate می‌گوید budget با چه سرعتی مصرف می‌شود؛ مثلاً burn rate برابر 14.4 در یک ساعت یعنی ۲٪ budget ماهانه رفته است. ترکیب پنجره‌های کوتاه و بلند (multi-window) دقت و سرعت را متعادل می‌کند.",
      "Burn rate shows how fast the budget is being consumed; e.g., a 14.4x burn over one hour means 2% of the monthly budget is gone. Combining short and long windows (multi-window) balances precision and speed.",
    ],
  },
  {
    id: "arch-s-symptom-alerting",
    level: "senior",
    tags: ["sre", "alerting"],
    q: [
      "طبق رویکرد SRE، page کردن on-call باید بیشتر بر اساس چه چیزی باشد؟",
      "Per SRE practice, what should paging the on-call primarily be based on?",
    ],
    options: [
      ["علائم قابل مشاهده برای کاربر مثل نرخ خطا یا latency در برابر SLO", "User-visible symptoms like error rate or latency against the SLO"],
      ["هر بار که CPU یک سرور از ۷۰٪ بالاتر رود", "Any time a server's CPU exceeds 70%"],
      ["هر exception ثبت‌شده در لاگ", "Every exception logged"],
      ["هر restart یک pod", "Every pod restart"],
    ],
    a: [
      "علت‌ها (CPU بالا، restart pod) همیشه روی کاربر اثر ندارند و باعث alert fatigue می‌شوند. alert روی علائم کاربرمحور page می‌کند و metricهای علت در داشبورد برای عیب‌یابی استفاده می‌شوند.",
      "Causes (high CPU, pod restarts) don't always affect users and cause alert fatigue. Page on user-facing symptoms and use cause metrics in dashboards for diagnosis.",
    ],
  },
  {
    id: "arch-s-coordinated-omission",
    level: "senior",
    tags: ["performance", "load-testing"],
    q: [
      "coordinated omission در load testing چیست؟",
      "What is coordinated omission in load testing?",
    ],
    options: [
      ["ابزار تست وقتی سرور کند است ارسال درخواست را عقب می‌اندازد و tail latency واقعی را کمتر از واقع نشان می‌دهد", "The load tool delays sending while the server is slow, under-reporting true tail latency"],
      ["حذف عمدی تست‌های ناموفق از گزارش توسط تیم", "The team deliberately dropping failed tests from reports"],
      ["هماهنگی چند ابزار load test برای ارسال همزمان", "Coordinating multiple load tools to send simultaneously"],
      ["نادیده گرفتن درخواست‌های static در تست", "Ignoring static asset requests in tests"],
    ],
    a: [
      "ابزارهای closed-loop منتظر پاسخ قبلی می‌مانند، پس در زمان کندی درخواست‌های کمتری می‌فرستند و آن تأخیرها هرگز ثبت نمی‌شوند. ابزارهای open-loop با نرخ ثابت (مثل wrk2 یا k6 با arrival rate) این مشکل را ندارند.",
      "Closed-loop tools wait for the previous response, so during stalls they send fewer requests and those delays never get recorded. Open-loop, constant-rate tools (like wrk2 or k6 arrival-rate) avoid this.",
    ],
  },
  {
    id: "arch-s-averaging-percentiles",
    level: "senior",
    tags: ["observability", "latency"],
    q: [
      "۱۰ instance هر کدام p99 خود را گزارش می‌کنند. آیا میانگین این ۱۰ عدد، p99 کل سرویس است؟",
      "Ten instances each report their own p99. Is the average of those ten numbers the service-wide p99?",
    ],
    options: [
      ["خیر؛ percentileها قابل میانگین‌گیری نیستند و باید از histogram تجمیع‌شده محاسبه شوند", "No; percentiles can't be averaged and must be computed from aggregated histograms"],
      ["بله؛ میانگین p99ها دقیقاً p99 کل است", "Yes; the mean of p99s is exactly the overall p99"],
      ["بله، به شرط اینکه instanceها هم‌اندازه باشند", "Yes, as long as instances are equally sized"],
      ["خیر؛ باید بیشترین مقدار را به‌عنوان p99 کل گزارش کرد", "No; you should report the maximum as the overall p99"],
    ],
    a: [
      "percentile به توزیع کامل وابسته است و میانگین آن معنای آماری ندارد. با histogram (مثل bucketهای Prometheus و `histogram_quantile`) یا sketchهایی مثل HDR/DDSketch می‌توان percentile سراسری را تقریب زد.",
      "A percentile depends on the full distribution and averaging percentiles is statistically meaningless. Histograms (like Prometheus buckets with `histogram_quantile`) or sketches like HDR/DDSketch approximate a global percentile.",
    ],
  },
  {
    id: "arch-s-utilization-latency",
    level: "senior",
    tags: ["performance", "queueing"],
    q: [
      "با نزدیک شدن utilization یک سرویس به ۱۰۰٪، latency چه رفتاری دارد؟",
      "As a service's utilization approaches 100%, how does latency behave?",
    ],
    options: [
      ["غیرخطی و به‌شدت افزایش می‌یابد چون زمان انتظار در صف منفجر می‌شود", "It rises sharply and non-linearly as queueing delay explodes"],
      ["به‌صورت خطی و ملایم افزایش می‌یابد", "It rises linearly and gently"],
      ["ثابت می‌ماند تا دقیقاً ۱۰۰٪", "It stays flat until exactly 100%"],
      ["کاهش می‌یابد چون cacheها گرم‌ترند", "It drops because caches are warmer"],
    ],
    a: [
      "طبق نظریه صف (مثلاً M/M/1)، زمان پاسخ متناسب با `1/(1-ρ)` است؛ در ۹۰٪ حدود ۱۰ برابر و در ۹۹٪ حدود ۱۰۰ برابر زمان سرویس. برای همین ظرفیت را با headroom (مثلاً ۶۰-۷۰٪) طراحی می‌کنند.",
      "Per queueing theory (e.g., M/M/1), response time scales with `1/(1-ρ)`: about 10x service time at 90% and 100x at 99%. That's why capacity is planned with headroom (e.g., 60-70%).",
    ],
  },
  {
    id: "arch-s-autoscaling-signal",
    level: "senior",
    tags: ["scaling", "autoscaling"],
    q: [
      "برای سرویسی I/O-bound که بیشتر منتظر سرویس‌های دیگر است، autoscaling بر اساس CPU چه مشکلی دارد؟",
      "For an I/O-bound service that mostly waits on other services, what's wrong with autoscaling on CPU?",
    ],
    options: [
      ["CPU پایین می‌ماند در حالی که concurrency و latency بالا رفته؛ بهتر است بر اساس in-flight requests یا queue depth scale شود", "CPU stays low while concurrency and latency soar; scale on in-flight requests or queue depth instead"],
      ["CPU همیشه ۱۰۰٪ است پس سرویس بی‌نهایت scale می‌شود", "CPU is always 100% so it scales infinitely"],
      ["Kubernetes برای سرویس‌های I/O-bound از autoscaling پشتیبانی نمی‌کند", "Kubernetes doesn't support autoscaling I/O-bound services"],
      ["هیچ مشکلی ندارد؛ CPU بهترین سیگنال برای همه سرویس‌هاست", "No problem; CPU is the best signal for every service"],
    ],
    a: [
      "سیگنال autoscaling باید نشان‌دهنده گلوگاه واقعی باشد. برای سرویس‌های I/O-bound یا consumerهای صف، metricهایی مثل concurrency، RPS per pod یا lag صف (مثلاً با KEDA) دقیق‌ترند.",
      "The autoscaling signal must reflect the real bottleneck. For I/O-bound services or queue consumers, metrics like concurrency, RPS per pod, or queue lag (e.g., via KEDA) are more accurate.",
    ],
  },
  {
    id: "arch-s-roll-forward",
    level: "senior",
    tags: ["deployment", "migrations"],
    q: [
      "release جدید شامل یک migration مخرب (حذف ستون) بوده و باگ دارد. چرا rollback ساده کد کافی نیست؟",
      "A new release included a destructive migration (dropping a column) and has a bug. Why isn't a simple code rollback enough?",
    ],
    options: [
      ["کد قدیمی به ستونی که حذف شده نیاز دارد؛ تغییرات مخرب schema باید جدا و بعد از پایداری انجام شوند", "The old code needs the dropped column; destructive schema changes must be decoupled and done after stabilization"],
      ["چون rollback در Kubernetes پشتیبانی نمی‌شود", "Because Kubernetes doesn't support rollbacks"],
      ["چون rollback همیشه داده‌ها را به‌طور خودکار بازیابی می‌کند", "Because rollbacks always restore data automatically"],
      ["چون کد قدیمی سریع‌تر از کد جدید است", "Because old code is faster than new code"],
    ],
    a: [
      "اگر schema با نسخه قبلی سازگار نباشد، rollback ممکن نیست و تنها راه roll forward با fix است. به همین دلیل migrationها با expand/contract و جدا از deploy کد طراحی می‌شوند تا همیشه یک نسخه قبل قابل بازگشت باشد.",
      "If the schema isn't compatible with the previous version, rollback is impossible and you can only roll forward with a fix. That's why migrations use expand/contract, decoupled from code deploys, keeping the previous version always restorable.",
    ],
  },
  {
    id: "arch-s-shadow-traffic",
    level: "senior",
    tags: ["deployment", "testing"],
    q: [
      "shadow traffic (traffic mirroring) هنگام بازنویسی یک سرویس چه کاربردی دارد و چه احتیاطی لازم است؟",
      "What is shadow traffic (traffic mirroring) useful for when rewriting a service, and what precaution is needed?",
    ],
    options: [
      ["کپی ترافیک واقعی به نسخه جدید و مقایسه پاسخ‌ها؛ باید اثرات جانبی مثل پرداخت یا ایمیل غیرفعال شوند", "Copying real traffic to the new version and comparing responses; side effects like payments or emails must be disabled"],
      ["انتقال کامل کاربران به نسخه جدید بدون بازگشت", "Moving all users to the new version with no way back"],
      ["پنهان کردن ترافیک از سیستم مانیتورینگ", "Hiding traffic from the monitoring system"],
      ["ارسال ترافیک فقط در ساعات شب", "Sending traffic only at night"],
    ],
    a: [
      "پاسخ‌های نسخه shadow به کاربر برنمی‌گردد و فقط برای مقایسه و تست بار واقعی استفاده می‌شود. اگر سرویس جدید write یا فراخوانی خارجی انجام دهد، باید به sandbox هدایت شود وگرنه اثرات دوبل ایجاد می‌شود.",
      "Shadow responses never reach users; they're only compared and used to test real load. If the new service writes or calls external systems, those must go to a sandbox or you'll create duplicate effects.",
    ],
  },
  {
    id: "arch-s-chaos-engineering",
    level: "senior",
    tags: ["resilience", "chaos-engineering"],
    q: [
      "رویکرد صحیح chaos engineering کدام است؟",
      "Which describes the correct approach to chaos engineering?",
    ],
    options: [
      ["فرضیه درباره steady state، تزریق خطای کنترل‌شده با blast radius کوچک و مقایسه با گروه کنترل", "Hypothesize steady state, inject controlled faults with a small blast radius, compare against a control"],
      ["خاموش کردن تصادفی سرورهای production بدون اطلاع و بدون مانیتورینگ", "Randomly killing production servers without notice or monitoring"],
      ["اجرای فقط unit testها با داده تصادفی", "Running only unit tests with random data"],
      ["حذف همه الگوهای resilience برای دیدن نتیجه", "Removing all resilience patterns to see what happens"],
    ],
    a: [
      "chaos engineering یک آزمایش علمی است: ابتدا معیار steady state (مثلاً نرخ سفارش موفق) تعریف و سپس خطا (latency، کشتن instance) تزریق می‌شود. شروع از staging یا درصد کمی از production با abort خودکار رایج است.",
      "Chaos engineering is a scientific experiment: define a steady-state metric (e.g., successful order rate), then inject faults (latency, killing instances). Starting in staging or a small slice of production with automatic abort is common.",
    ],
  },
  {
    id: "arch-s-cell-architecture",
    level: "senior",
    tags: ["multi-tenancy", "resilience"],
    q: [
      "cell-based architecture چه مزیتی برای یک SaaS بزرگ multi-tenant دارد؟",
      "What benefit does cell-based architecture offer a large multi-tenant SaaS?",
    ],
    options: [
      ["هر cell یک کپی مستقل کامل از stack است که زیرمجموعه‌ای از tenantها را سرویس می‌دهد و blast radius را محدود می‌کند", "Each cell is an independent full copy of the stack serving a subset of tenants, limiting blast radius"],
      ["همه tenantها در یک دیتابیس واحد قرار می‌گیرند تا مدیریت ساده شود", "All tenants share one database to simplify management"],
      ["نیاز به routing را کاملاً حذف می‌کند", "It completely removes the need for routing"],
      ["هر درخواست به همه cellها فرستاده می‌شود", "Each request is sent to every cell"],
    ],
    a: [
      "خرابی، deploy بد یا noisy neighbor فقط tenantهای همان cell را تحت تأثیر قرار می‌دهد. یک لایه routing نازک tenant را به cell خودش می‌فرستد و scale با افزودن cell جدید انجام می‌شود.",
      "A failure, bad deploy, or noisy neighbor only affects tenants in that cell. A thin routing layer sends each tenant to its cell, and scaling is done by adding cells.",
    ],
  },
  {
    id: "arch-s-serverless-concurrency",
    level: "senior",
    tags: ["serverless", "resilience"],
    q: [
      "یک Lambda به‌دلیل spike ترافیک تا هزار instance scale می‌شود و یک API قدیمی پایین‌دستی را از کار می‌اندازد. راه‌حل معماری مناسب چیست؟",
      "A Lambda scales to a thousand instances during a spike and overwhelms a legacy downstream API. What's an appropriate architectural fix?",
    ],
    options: [
      ["محدود کردن concurrency تابع (reserved concurrency) و قرار دادن صف بین تابع و API", "Cap the function's concurrency (reserved concurrency) and put a queue between it and the API"],
      ["افزایش حافظه تابع برای سریع‌تر شدن", "Increase function memory to make it faster"],
      ["حذف timeout تابع", "Remove the function timeout"],
      ["تبدیل همه فراخوانی‌ها به retry فوری", "Turn all calls into immediate retries"],
    ],
    a: [
      "elastic بودن serverless می‌تواند وابستگی‌هایی را که scale نمی‌شوند غرق کند. محدود کردن concurrency و صف (load leveling) نرخ فراخوانی را با ظرفیت سیستم پایین‌دستی هماهنگ می‌کند.",
      "Serverless elasticity can flood dependencies that don't scale. Capping concurrency and adding a queue (load leveling) match the call rate to the downstream system's capacity.",
    ],
  },
  {
    id: "arch-s-strangler-data-sync",
    level: "senior",
    tags: ["migration", "strangler-fig"],
    q: [
      "در مهاجرت strangler fig، سیستم legacy و سرویس جدید هر دو به داده مشتری نیاز دارند. کدام روش برای همگام نگه داشتن داده در دوره گذار رایج است؟",
      "During a strangler-fig migration, both the legacy system and the new service need customer data. Which approach is common to keep data in sync during the transition?",
    ],
    options: [
      ["Change Data Capture (مثلاً Debezium) از دیتابیس منبع و اعمال تغییرات در دیگری", "Change Data Capture (e.g., Debezium) from the source DB, applying changes to the other"],
      ["کپی دستی داده‌ها با اسکریپت هر ماه یک بار", "Manually copying data with a monthly script"],
      ["اتصال مستقیم سرویس جدید به جداول داخلی legacy برای همیشه", "Having the new service query legacy internal tables forever"],
      ["نوشتن همزمان در دو دیتابیس از کد بدون هیچ تضمینی", "Writing to both databases from code with no guarantees"],
    ],
    a: [
      "CDC تغییرات را از transaction log می‌خواند و بدون تغییر کد legacy منتشر می‌کند. با تعیین مالک واحد برای هر داده در هر مرحله، از dual write و conflict جلوگیری می‌شود.",
      "CDC reads changes from the transaction log and publishes them without modifying legacy code. Assigning a single owner for each piece of data at each stage avoids dual writes and conflicts.",
    ],
  },
  {
    id: "arch-s-context-mapping",
    level: "senior",
    tags: ["ddd", "context-mapping"],
    q: [
      "در context mapping، تفاوت رابطه Conformist و Anti-Corruption Layer چیست؟",
      "In context mapping, what's the difference between a Conformist relationship and an Anti-Corruption Layer?",
    ],
    options: [
      ["Conformist مدل upstream را مستقیم می‌پذیرد؛ ACL آن را به مدل خودمان ترجمه می‌کند", "Conformist adopts the upstream model as-is; an ACL translates it into our own model"],
      ["Conformist ترجمه می‌کند و ACL مدل را مستقیم می‌پذیرد", "Conformist translates and ACL adopts the model as-is"],
      ["هر دو یعنی دو تیم یک مدل مشترک دارند", "Both mean two teams share one model"],
      ["Conformist فقط برای eventها و ACL فقط برای REST است", "Conformist is only for events and ACL only for REST"],
    ],
    a: [
      "Conformist ارزان است وقتی مدل upstream مناسب است و قدرت تأثیرگذاری روی آن نداریم. وقتی مدل upstream ناسازگار یا legacy است، ACL هزینه ترجمه را می‌پردازد تا مدل دامنه ما سالم بماند.",
      "Conformist is cheap when the upstream model is good enough and we can't influence it. When the upstream model is poor or legacy, an ACL pays the translation cost to keep our domain model clean.",
    ],
  },
  {
    id: "arch-s-hexagonal-transactions",
    level: "senior",
    tags: ["hexagonal", "clean-architecture", "transactions"],
    q: [
      "در معماری hexagonal/clean، مرز تراکنش معمولاً کجا تعریف می‌شود؟",
      "In hexagonal/clean architecture, where is the transaction boundary typically defined?",
    ],
    options: [
      ["در application service (use case)، با یک port مثل Unit of Work بدون وابستگی به ORM", "In the application service (use case), via a port like Unit of Work without ORM coupling"],
      ["داخل entityهای دامنه با فراخوانی مستقیم `BEGIN`", "Inside domain entities by calling `BEGIN` directly"],
      ["در controller HTTP", "In the HTTP controller"],
      ["در هر متد repository به‌صورت جداگانه", "Separately in every repository method"],
    ],
    a: [
      "هر use case یک واحد کاری کسب‌وکاری است، پس باید به‌صورت اتمیک commit شود. دامنه نباید درباره دیتابیس چیزی بداند و تراکنش per-repository-method اتمیک بودن چند عملیات را از بین می‌برد.",
      "Each use case is one business unit of work and should commit atomically. The domain shouldn't know about the database, and per-repository-method transactions break atomicity across operations.",
    ],
  },
  {
    id: "arch-s-large-aggregate",
    level: "senior",
    tags: ["ddd", "concurrency"],
    q: [
      "مدل `Product` به‌عنوان یک aggregate شامل همه `Review`ها طراحی شده و با optimistic locking ذخیره می‌شود. در ترافیک بالا چه مشکلی رخ می‌دهد؟",
      "`Product` is modeled as one aggregate containing all its `Review`s and saved with optimistic locking. What goes wrong under high traffic?",
    ],
    options: [
      ["conflictهای مکرر نسخه چون هر review جدید کل aggregate را تغییر می‌دهد؛ Review باید aggregate جدا باشد", "Frequent version conflicts since every new review modifies the whole aggregate; Review should be its own aggregate"],
      ["هیچ مشکلی ندارد چون optimistic locking همیشه موفق است", "No problem because optimistic locking always succeeds"],
      ["دیتابیس به‌طور خودکار review‌ها را حذف می‌کند", "The database automatically deletes reviews"],
      ["aggregate بزرگ‌تر همیشه سریع‌تر است چون JOIN کمتری دارد", "A larger aggregate is always faster due to fewer joins"],
    ],
    a: [
      "aggregate بزرگ باعث contention، بارگذاری داده زیاد و conflict می‌شود. قاعده Vaughn Vernon: aggregateها را کوچک طراحی کنید و با ID به هم ارجاع دهید، فقط invariantهای واقعی را داخل یک aggregate نگه دارید.",
      "Large aggregates cause contention, heavy loading, and conflicts. Vaughn Vernon's rule: design small aggregates, reference others by ID, and keep only true invariants inside one aggregate.",
    ],
  },
  {
    id: "arch-s-dns-caching",
    level: "senior",
    tags: ["service-discovery", "dns"],
    q: [
      "سرویسی از DNS برای discovery استفاده می‌کند ولی پس از جایگزینی instanceها همچنان به IPهای قدیمی وصل می‌شود. محتمل‌ترین علت چیست؟",
      "A service uses DNS for discovery but keeps connecting to old IPs after instances are replaced. What's the most likely cause?",
    ],
    options: [
      ["cache شدن DNS در runtime/کلاینت فراتر از TTL یا connectionهای طولانی‌مدتی که دوباره resolve نمی‌شوند", "DNS cached in the runtime/client beyond TTL, or long-lived connections that never re-resolve"],
      ["DNS ذاتاً از IPv4 پشتیبانی نمی‌کند", "DNS inherently doesn't support IPv4"],
      ["load balancer لایه ۷ DNS را غیرفعال می‌کند", "L7 load balancers disable DNS"],
      ["instanceهای جدید همیشه همان IP قبلی را می‌گیرند", "New instances always get the same IP as before"],
    ],
    a: [
      "برخی runtimeها (مثلاً JVM با تنظیمات پیش‌فرض قدیمی) یا connection poolها DNS را طولانی cache می‌کنند. تنظیم TTL، محدود کردن عمر connectionها و refresh دوره‌ای pool این مشکل را رفع می‌کند.",
      "Some runtimes (e.g., the JVM with older defaults) or connection pools cache DNS for a long time. Respecting TTLs, capping connection lifetime, and periodically refreshing pools fix this.",
    ],
  },
  {
    id: "arch-s-grpc-l4-imbalance",
    level: "senior",
    tags: ["load-balancing", "grpc"],
    q: [
      "چرا ترافیک gRPC پشت یک load balancer لایه ۴ اغلب نامتوازن توزیع می‌شود؟",
      "Why is gRPC traffic behind an L4 load balancer often unevenly distributed?",
    ],
    options: [
      ["gRPC از اتصال‌های HTTP/2 طولانی‌مدت multiplexed استفاده می‌کند و L4 فقط اتصال را balance می‌کند نه درخواست را", "gRPC uses long-lived multiplexed HTTP/2 connections, and L4 balances connections, not requests"],
      ["gRPC فقط روی UDP کار می‌کند", "gRPC only runs over UDP"],
      ["L4 load balancer نمی‌تواند به پورت‌های بالای 1024 وصل شود", "L4 balancers can't connect to ports above 1024"],
      ["Protobuf برای load balancer قابل خواندن نیست و درخواست‌ها رد می‌شوند", "Protobuf is unreadable by the balancer so requests are rejected"],
    ],
    a: [
      "همه درخواست‌های یک کلاینت روی یک اتصال به یک backend می‌روند. راه‌حل: L7 balancing آگاه از HTTP/2 (مثل Envoy)، client-side load balancing یا محدود کردن عمر اتصال (`MaxConnectionAge`).",
      "All of a client's requests travel over one connection to one backend. Fixes: HTTP/2-aware L7 balancing (like Envoy), client-side load balancing, or capping connection age (`MaxConnectionAge`).",
    ],
  },
  {
    id: "arch-s-gateway-anti-pattern",
    level: "senior",
    tags: ["api-gateway", "anti-patterns"],
    q: [
      "کدام مورد یک anti-pattern رایج در استفاده از API Gateway است؟",
      "Which is a common anti-pattern in API Gateway usage?",
    ],
    options: [
      ["قرار دادن منطق کسب‌وکار و orchestration دامنه در gateway که آن را به bottleneck مشترک تیم‌ها تبدیل می‌کند", "Putting business logic and domain orchestration in the gateway, making it a shared bottleneck for teams"],
      ["اعمال rate limiting در gateway", "Applying rate limiting in the gateway"],
      ["TLS termination در gateway", "Terminating TLS in the gateway"],
      ["اعتبارسنجی token در gateway", "Validating tokens in the gateway"],
    ],
    a: [
      "gateway باید دغدغه‌های عمومی (auth، routing، rate limit) را مدیریت کند. منطق دامنه در gateway یک «ESB جدید» می‌سازد که هر تغییری نیازمند تیم gateway است؛ همچنین gateway باید چند instanceی باشد تا SPOF نشود.",
      "The gateway should handle cross-cutting concerns (auth, routing, rate limiting). Domain logic in it creates a 'new ESB' where every change needs the gateway team; it should also be redundant to avoid becoming a SPOF.",
    ],
  },
  {
    id: "arch-s-idempotency-race",
    level: "senior",
    tags: ["idempotency", "concurrency"],
    q: [
      "دو درخواست با یک `Idempotency-Key` همزمان می‌رسند و هر دو «کلید وجود ندارد» را می‌بینند. چگونه از اجرای دوبار جلوگیری می‌شود؟",
      "Two requests with the same `Idempotency-Key` arrive concurrently and both see 'key not found'. How do you prevent double execution?",
    ],
    options: [
      ["ثبت اتمیک کلید با وضعیت `in-progress` با unique constraint یا `SET NX` قبل از اجرا", "Atomically insert the key as `in-progress` via a unique constraint or `SET NX` before executing"],
      ["بررسی کلید دو بار پشت سر هم", "Checking the key twice in a row"],
      ["ذخیره کلید پس از اتمام عملیات", "Storing the key after the operation completes"],
      ["افزودن تأخیر تصادفی قبل از بررسی کلید", "Adding a random delay before checking the key"],
    ],
    a: [
      "الگوی check-then-act یک race condition دارد. claim اتمیک کلید تضمین می‌کند فقط یک درخواست برنده شود؛ درخواست دوم یا منتظر نتیجه می‌ماند یا `409 Conflict` می‌گیرد.",
      "Check-then-act has a race condition. Atomically claiming the key ensures only one request wins; the second either waits for the result or gets `409 Conflict`.",
    ],
  },
  {
    id: "arch-s-pool-sizing",
    level: "senior",
    tags: ["capacity", "performance"],
    q: [
      "سرویسی در peak ۱۰۰۰ درخواست/ثانیه دارد و هر درخواست یک کوئری 20ms اجرا می‌کند. connection pool دیتابیس در کل instanceها تقریباً چقدر باید باشد و چرا pool خیلی بزرگ بد است؟",
      "A service peaks at 1000 req/s, each running one 20ms query. Roughly how large should the DB connection pool be across all instances, and why is a huge pool bad?",
    ],
    options: [
      ["حدود ۲۰ به‌علاوه headroom؛ pool خیلی بزرگ باعث contention و context switching در دیتابیس می‌شود", "About 20 plus headroom; an oversized pool causes contention and context switching in the database"],
      ["حدود ۲۰۰۰۰؛ هر چه pool بزرگ‌تر باشد throughput بیشتر است", "About 20,000; bigger pools always yield more throughput"],
      ["دقیقاً ۱؛ دیتابیس فقط یک اتصال را پشتیبانی می‌کند", "Exactly 1; databases support only one connection"],
      ["حدود ۱۰۰۰؛ یک اتصال برای هر درخواست در ثانیه", "About 1000; one connection per request per second"],
    ],
    a: [
      "طبق Little's law `1000 × 0.02 = 20` اتصال همزمان. دیتابیس تعداد محدودی core و دیسک دارد و اتصال‌های بیش از حد فقط صف را داخل دیتابیس منتقل و latency را بدتر می‌کنند.",
      "By Little's law, `1000 × 0.02 = 20` concurrent connections. The database has limited cores and disks; excess connections just move the queue into the database and worsen latency.",
    ],
  },
  {
    id: "arch-s-storage-estimation",
    level: "senior",
    tags: ["capacity"],
    q: [
      "روزانه ۱۰ میلیون فایل با میانگین 1MB آپلود می‌شود و با replication factor برابر ۳ ذخیره می‌شود. فضای خام لازم در یک سال تقریباً چقدر است؟",
      "10 million files averaging 1MB are uploaded daily and stored with a replication factor of 3. Roughly how much raw storage is needed per year?",
    ],
    options: [
      ["حدود ۱۱ پتابایت", "About 11 PB"],
      ["حدود ۳.۶ ترابایت", "About 3.6 TB"],
      ["حدود ۳۰ ترابایت", "About 30 TB"],
      ["حدود ۱۱۰ پتابایت", "About 110 PB"],
    ],
    a: [
      "10M × 1MB = 10TB در روز، ضرب در ۳۶۵ حدود 3.65PB در سال و با replication سه‌گانه حدود 11PB. تخمین‌های back-of-the-envelope نشان می‌دهند به object storage، tiering یا erasure coding نیاز است.",
      "10M × 1MB = 10TB/day, times 365 ≈ 3.65PB/year, and with 3x replication ≈ 11PB. Back-of-the-envelope estimates like this reveal the need for object storage, tiering, or erasure coding.",
    ],
  },
  {
    id: "arch-s-config-rollout",
    level: "senior",
    tags: ["configuration", "deployment"],
    q: [
      "چرا تغییرات dynamic config (مثلاً از طریق config service) باید مانند کد به‌صورت تدریجی rollout شوند؟",
      "Why should dynamic config changes (e.g., via a config service) be rolled out gradually like code?",
    ],
    options: [
      ["چون یک config اشتباه می‌تواند همزمان کل fleet را از کار بیندازد؛ بخش بزرگی از outageها ناشی از config است", "Because one bad config can take down the whole fleet at once; many outages stem from config changes"],
      ["چون config هرگز روی رفتار سیستم اثر ندارد", "Because config never affects system behavior"],
      ["چون config فقط هنگام restart خوانده می‌شود", "Because config is only read at restart"],
      ["چون rollout تدریجی config را رمزنگاری می‌کند", "Because gradual rollout encrypts the config"],
    ],
    a: [
      "config پویا بدون deploy به همه instanceها می‌رسد و بنابراین blast radius بزرگی دارد. validation، نسخه‌بندی، canary و rollback سریع برای config هم ضروری است.",
      "Dynamic config reaches every instance without a deploy, so its blast radius is huge. Validation, versioning, canarying, and fast rollback are just as essential for config.",
    ],
  },
  {
    id: "arch-s-modular-monolith-boundaries",
    level: "senior",
    tags: ["modular-monolith", "architecture-tests"],
    q: [
      "در یک modular monolith چگونه می‌توان از فرسایش مرز ماژول‌ها در طول زمان جلوگیری کرد؟",
      "In a modular monolith, how do you prevent module boundaries from eroding over time?",
    ],
    options: [
      ["فقط API عمومی هر ماژول export شود و قواعد وابستگی با architecture testها یا lint در CI enforce شود", "Export only each module's public API and enforce dependency rules with architecture tests or lint in CI"],
      ["همه ماژول‌ها اجازه دسترسی مستقیم به جداول هم را داشته باشند", "Let all modules access each other's tables directly"],
      ["مستندسازی مرزها در wiki و اعتماد به code review", "Document boundaries in a wiki and rely on code review"],
      ["قرار دادن همه کد در یک پوشه برای سادگی", "Put all code in a single folder for simplicity"],
    ],
    a: [
      "بدون enforcement خودکار، میان‌برها جمع می‌شوند و monolith به big ball of mud تبدیل می‌شود. ابزارهایی مثل ArchUnit، dependency-cruiser یا قوانین ESLint و داشتن schema جدا برای هر ماژول مرزها را حفظ می‌کنند.",
      "Without automated enforcement, shortcuts accumulate and the monolith becomes a big ball of mud. Tools like ArchUnit, dependency-cruiser, or ESLint rules plus a separate schema per module preserve boundaries.",
    ],
  },
  {
    id: "arch-s-saga-vs-2pc-choice",
    level: "senior",
    tags: ["distributed-transactions", "trade-offs"],
    q: [
      "در کدام سناریو تلاش برای جلوگیری از تراکنش توزیع‌شده با بازطراحی مرز سرویس‌ها بهترین گزینه است؟",
      "In which scenario is redrawing service boundaries to avoid a distributed transaction the best option?",
    ],
    options: [
      ["وقتی دو سرویس دائماً باید یک invariant مشترک را به‌صورت اتمیک و فوری حفظ کنند", "When two services constantly must uphold a shared invariant atomically and immediately"],
      ["وقتی سرویس‌ها تیم‌ها و دامنه‌های کاملاً جدا دارند و eventual consistency قابل قبول است", "When services have fully separate teams and domains and eventual consistency is acceptable"],
      ["وقتی فقط یک سرویس در عملیات دخیل است", "When only one service is involved in the operation"],
      ["وقتی عملیات فقط خواندنی است", "When the operation is read-only"],
    ],
    a: [
      "نیاز مداوم به consistency اتمیک بین دو سرویس نشانه این است که آن‌ها در واقع یک bounded context یا aggregate هستند. ادغام آن‌ها از پیچیدگی saga یا 2PC ارزان‌تر و درست‌تر است.",
      "A constant need for atomic consistency across two services signals they're really one bounded context or aggregate. Merging them is cheaper and more correct than a saga or 2PC.",
    ],
  },
]);
