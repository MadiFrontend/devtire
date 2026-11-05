import { build } from "../build";

export const messageQueuesMiddle = build("message-queues", [
  {
    id: "mq-m-topic-exchange-wildcards",
    level: "middle",
    tags: ["rabbitmq", "exchanges"],
    q: [
      "در topic exchange در RabbitMQ، binding key `order.*.created` با کدام routing key مطابقت دارد؟",
      "In a RabbitMQ topic exchange, which routing key matches the binding key `order.*.created`?",
    ],
    options: [
      ["`order.eu.created`", "`order.eu.created`"],
      ["`order.created`", "`order.created`"],
      ["`order.eu.de.created`", "`order.eu.de.created`"],
      ["`order.eu.updated`", "`order.eu.updated`"],
    ],
    a: [
      "در topic exchange، `*` دقیقاً با یک کلمه و `#` با صفر یا چند کلمه (جداشده با نقطه) مطابقت دارد. برای پوشش `order.eu.de.created` باید از `order.#.created` استفاده کرد.",
      "In a topic exchange, `*` matches exactly one dot-separated word and `#` matches zero or more. To match `order.eu.de.created` you'd need `order.#.created`.",
    ],
  },
  {
    id: "mq-m-headers-exchange",
    level: "middle",
    tags: ["rabbitmq", "exchanges"],
    q: [
      "Headers exchange در RabbitMQ بر چه اساسی پیام را route می‌کند؟",
      "How does a RabbitMQ headers exchange route messages?",
    ],
    options: [
      ["بر اساس مقادیر header پیام و آرگومان `x-match` با مقدار `all` یا `any`", "By matching message header values, with `x-match` set to `all` or `any`"],
      ["بر اساس الگوی wildcard روی routing key", "By wildcard patterns on the routing key"],
      ["بر اساس اندازه body پیام", "By the size of the message body"],
      ["بر اساس IP producer", "By the producer's IP address"],
    ],
    a: [
      "Headers exchange routing key را نادیده می‌گیرد و headerهای پیام را با آرگومان‌های binding مقایسه می‌کند. `x-match: all` یعنی همه باید برابر باشند و `any` یعنی یکی کافی است.",
      "A headers exchange ignores the routing key and compares message headers with binding arguments. `x-match: all` requires every pair to match; `any` needs just one.",
    ],
  },
  {
    id: "mq-m-persistent-messages",
    level: "middle",
    tags: ["rabbitmq", "durability"],
    q: [
      "برای اینکه پیام‌های RabbitMQ بعد از restart شدن broker از بین نروند، چه چیزی لازم است؟",
      "What's needed so RabbitMQ messages survive a broker restart?",
    ],
    options: [
      ["صف durable و پیام با `persistent: true` (delivery mode 2)", "A durable queue and messages published with `persistent: true` (delivery mode 2)"],
      ["فقط صف durable کافی است", "A durable queue alone is enough"],
      ["فقط `persistent: true` روی پیام کافی است", "Only `persistent: true` on the message is enough"],
      ["تنظیم `prefetch(0)` روی consumer", "Setting `prefetch(0)` on the consumer"],
    ],
    a: [
      "پیام persistent در صف non-durable همراه با صف از بین می‌رود و صف durable پیام‌های transient را نگه نمی‌دارد. هر دو لازم‌اند و برای اطمینان از رسیدن به broker، publisher confirms هم توصیه می‌شود.",
      "A persistent message in a non-durable queue dies with the queue, and a durable queue drops transient messages. You need both, plus publisher confirms to know the broker got it.",
    ],
  },
  {
    id: "mq-m-publisher-confirms",
    level: "middle",
    tags: ["rabbitmq", "reliability"],
    q: [
      "Publisher confirms در RabbitMQ چه مشکلی را حل می‌کند؟",
      "What problem do publisher confirms solve in RabbitMQ?",
    ],
    options: [
      ["Producer مطمئن می‌شود broker پیام را دریافت و (در صورت persistent) ذخیره کرده است", "The producer learns the broker received and (if persistent) stored the message"],
      ["Consumer مطمئن می‌شود producer هنوز آنلاین است", "The consumer learns the producer is still online"],
      ["پیام‌ها فقط یک بار به consumer تحویل داده می‌شوند", "Messages are delivered to consumers exactly once"],
      ["ترتیب پیام‌ها بین چند صف حفظ می‌شود", "Order is preserved across multiple queues"],
    ],
    a: [
      "بدون confirms، `publish` فقط بافر محلی را پر می‌کند و اگر connection قطع شود پیام بی‌صدا گم می‌شود. با `confirmSelect` broker برای هر پیام `ack` یا `nack` برمی‌گرداند و producer می‌تواند دوباره بفرستد.",
      "Without confirms, `publish` just writes to a local buffer and a dropped connection silently loses messages. With confirm mode, the broker returns `ack` or `nack` per message so the producer can resend.",
    ],
  },
  {
    id: "mq-m-mandatory-flag",
    level: "middle",
    tags: ["rabbitmq", "routing"],
    q: [
      "در RabbitMQ اگر پیامی به exchange منتشر شود ولی با هیچ صفی مطابقت نداشته باشد، به‌طور پیش‌فرض چه می‌شود؟",
      "In RabbitMQ, if a published message matches no queue, what happens by default?",
    ],
    options: [
      ["پیام بی‌صدا دور ریخته می‌شود، مگر اینکه `mandatory` یا alternate exchange تنظیم شده باشد", "It's silently dropped unless `mandatory` or an alternate exchange is set"],
      ["پیام در exchange نگه داشته می‌شود تا صفی ساخته شود", "It's held in the exchange until a matching queue appears"],
      ["پیام به همه صف‌ها فرستاده می‌شود", "It's sent to every queue"],
      ["Broker خطا می‌دهد و connection را می‌بندد", "The broker errors and closes the connection"],
    ],
    a: [
      "Exchangeها پیام ذخیره نمی‌کنند. با flag `mandatory` پیام routeنشده با `basic.return` به producer برمی‌گردد، یا می‌توان یک alternate exchange برای جمع کردن آن‌ها تعریف کرد.",
      "Exchanges don't store messages. With the `mandatory` flag, unroutable messages come back via `basic.return`, or you can configure an alternate exchange to catch them.",
    ],
  },
  {
    id: "mq-m-dlx-config",
    level: "middle",
    tags: ["rabbitmq", "dlq"],
    q: [
      "در RabbitMQ چه رویدادهایی باعث می‌شوند پیام به dead-letter exchange (DLX) فرستاده شود؟",
      "In RabbitMQ, which events send a message to the dead-letter exchange (DLX)?",
    ],
    options: [
      ["Reject یا nack با `requeue: false`، انقضای TTL، یا پر شدن طول صف", "Reject/nack with `requeue: false`, TTL expiry, or exceeding queue length"],
      ["فقط وقتی consumer قطع می‌شود", "Only when a consumer disconnects"],
      ["هر بار که پیام ack می‌شود", "Every time a message is acked"],
      ["وقتی پیام بیش از یک بار تحویل شود", "Whenever a message is delivered more than once"],
    ],
    a: [
      "صف با آرگومان `x-dead-letter-exchange` پیکربندی می‌شود. پیام dead-letter‌شده header `x-death` می‌گیرد که شامل دلیل و تعداد دفعات است.",
      "The queue is configured with `x-dead-letter-exchange`. Dead-lettered messages get an `x-death` header recording the reason and count.",
    ],
  },
  {
    id: "mq-m-delayed-retry-rabbit",
    level: "middle",
    tags: ["rabbitmq", "retry"],
    q: [
      "یک روش رایج برای retry با تأخیر در RabbitMQ (بدون plugin) چیست؟",
      "What's a common way to do delayed retries in RabbitMQ without plugins?",
    ],
    options: [
      ["فرستادن پیام شکست‌خورده به یک صف retry با TTL که DLX آن به صف اصلی برمی‌گردد", "Send failures to a retry queue with a TTL whose DLX routes back to the main queue"],
      ["`nack` با `requeue: true` که خودش تأخیر نمایی دارد", "`nack` with `requeue: true`, which has built-in exponential delay"],
      ["`sleep` در consumer قبل از ack کردن", "Calling `sleep` in the consumer before acking"],
      ["افزایش prefetch تا پیام دیرتر بیاید", "Raising prefetch so the message comes later"],
    ],
    a: [
      "صف retry consumer ندارد؛ پیام بعد از TTL منقضی و از طریق DLX به صف اصلی برمی‌گردد. برای چند سطح backoff از چند صف با TTL متفاوت یا plugin `delayed-message-exchange` استفاده می‌شود.",
      "The retry queue has no consumers; after the TTL the message expires and the DLX routes it back. For multiple backoff tiers, use several queues with different TTLs or the `delayed-message-exchange` plugin.",
    ],
  },
  {
    id: "mq-m-requeue-loop",
    level: "middle",
    tags: ["rabbitmq", "poison-message"],
    q: [
      "مشکل `nack(msg, false, true)` برای هر خطا در consumer چیست؟",
      "What's wrong with calling `nack(msg, false, true)` on every consumer error?",
    ],
    options: [
      ["Poison message بلافاصله و بی‌نهایت دوباره تحویل می‌شود و CPU را مصرف می‌کند", "A poison message is redelivered immediately and endlessly, burning CPU"],
      ["پیام برای همیشه حذف می‌شود", "The message is deleted forever"],
      ["پیام به DLQ می‌رود و هرگز retry نمی‌شود", "The message goes to the DLQ and is never retried"],
      ["Consumer دیگر هیچ پیامی دریافت نمی‌کند", "The consumer stops receiving any messages"],
    ],
    a: [
      "Requeue بدون تأخیر و بدون شمارش تلاش یک حلقه داغ ایجاد می‌کند. باید تعداد تلاش را (مثلاً از `x-death` یا header سفارشی) بررسی کرد و بعد از حد مجاز به DLQ فرستاد.",
      "Requeueing with no delay or attempt count creates a hot loop. Track attempts (e.g. via `x-death` or a custom header) and dead-letter after a limit.",
    ],
  },
  {
    id: "mq-m-quorum-queues",
    level: "middle",
    tags: ["rabbitmq", "replication"],
    q: [
      "Quorum queue در RabbitMQ چه مزیتی نسبت به classic queue دارد؟",
      "What advantage does a RabbitMQ quorum queue have over a classic queue?",
    ],
    options: [
      ["داده با الگوریتم Raft روی چند node replicate می‌شود و با خرابی یک node از دست نمی‌رود", "Data is replicated across nodes via Raft and survives a node failure"],
      ["پیام‌ها را فقط در حافظه نگه می‌دارد و سریع‌تر است", "It keeps messages only in memory, so it's faster"],
      ["از ترتیب سراسری بین همه صف‌ها پشتیبانی می‌کند", "It provides global ordering across all queues"],
      ["نیاز به ack را حذف می‌کند", "It removes the need for acks"],
    ],
    a: [
      "Quorum queueها جایگزین مدرن mirrored classic queueها هستند و برای داده‌های حیاتی توصیه می‌شوند. همچنین از `x-delivery-limit` برای محدود کردن redelivery پشتیبانی می‌کنند.",
      "Quorum queues are the modern replacement for mirrored classic queues and are recommended for critical data. They also support `x-delivery-limit` to cap redeliveries.",
    ],
  },
  {
    id: "mq-m-prefetch-tuning",
    level: "middle",
    tags: ["rabbitmq", "prefetch"],
    q: [
      "اگر prefetch خیلی بزرگ (مثلاً ۱۰۰۰) و پردازش هر پیام کند باشد، چه مشکلی پیش می‌آید؟",
      "If prefetch is very large (e.g. 1000) and processing is slow, what goes wrong?",
    ],
    options: [
      ["یک consumer پیام‌های زیادی را احتکار می‌کند و consumerهای جدید بیکار می‌مانند", "One consumer hoards many messages while newly added consumers sit idle"],
      ["پیام‌ها خودکار ack می‌شوند", "Messages get auto-acked"],
      ["Broker پیام‌ها را به ترتیب معکوس می‌فرستد", "The broker sends messages in reverse order"],
      ["صف به‌طور خودکار حذف می‌شود", "The queue gets automatically deleted"],
    ],
    a: [
      "Prefetch بالا برای پیام‌های سریع throughput را بالا می‌برد، ولی برای کارهای کند توزیع بار را خراب می‌کند و در صورت crash پیام‌های زیادی redeliver می‌شوند. مقدار را بر اساس زمان پردازش تنظیم کنید.",
      "High prefetch boosts throughput for fast messages, but for slow work it unbalances load and causes mass redelivery on crash. Tune it to processing time.",
    ],
  },
  {
    id: "mq-m-bullmq-concurrency",
    level: "middle",
    tags: ["bullmq", "nodejs"],
    q: [
      "در BullMQ، گزینه `concurrency: 5` در `Worker` به چه معناست؟",
      "In BullMQ, what does `concurrency: 5` on a `Worker` mean?",
    ],
    options: [
      ["آن worker حداکثر ۵ job را هم‌زمان در همان پروسس پردازش می‌کند", "That worker processes up to 5 jobs at once in the same process"],
      ["۵ پروسس Node جدید ساخته می‌شود", "It spawns 5 new Node processes"],
      ["هر job حداکثر ۵ بار retry می‌شود", "Each job is retried up to 5 times"],
      ["فقط ۵ job در صف نگه داشته می‌شود", "Only 5 jobs are kept in the queue"],
    ],
    a: [
      "Concurrency در یک پروسس با event loop کار می‌کند و برای jobهای I/O-bound مناسب است. برای کارهای CPU-bound باید چند پروسس worker یا sandboxed processor اجرا کرد.",
      "Concurrency runs within one process on the event loop and suits I/O-bound jobs. For CPU-bound work, run multiple worker processes or sandboxed processors.",
    ],
  },
  {
    id: "mq-m-bullmq-stalled",
    level: "middle",
    tags: ["bullmq", "reliability"],
    q: [
      "در BullMQ، «stalled job» چیست؟",
      "In BullMQ, what is a 'stalled job'?",
    ],
    options: [
      ["Jobی که worker آن lock را تمدید نکرده (مثلاً crash یا event loop مسدود) و دوباره به صف برمی‌گردد", "A job whose worker stopped renewing its lock (crash or blocked event loop) and gets moved back"],
      ["Jobی که در حالت delayed منتظر زمانش است", "A job waiting in the delayed state"],
      ["Jobی که با موفقیت تمام شده ولی حذف نشده", "A job that completed but wasn't removed"],
      ["Jobی که اولویت پایین دارد", "A job with low priority"],
    ],
    a: [
      "Worker به‌طور دوره‌ای lock job را تمدید می‌کند. اگر کد CPU-bound event loop را block کند، lock منقضی و job stalled می‌شود و ممکن است دو بار اجرا شود؛ `maxStalledCount` تعداد دفعات مجاز را تعیین می‌کند.",
      "Workers periodically renew a job's lock. CPU-bound code that blocks the event loop lets the lock expire, so the job stalls and may run twice; `maxStalledCount` bounds this.",
    ],
  },
  {
    id: "mq-m-bullmq-attempts",
    level: "middle",
    tags: ["bullmq", "retry"],
    q: [
      "کدام تنظیم BullMQ یک job را تا ۵ بار با backoff نمایی از ۲ ثانیه retry می‌کند؟",
      "Which BullMQ option retries a job up to 5 times with exponential backoff starting at 2 seconds?",
    ],
    options: [
      ["`{ attempts: 5, backoff: { type: 'exponential', delay: 2000 } }`", "`{ attempts: 5, backoff: { type: 'exponential', delay: 2000 } }`"],
      ["`{ retries: 5, delay: 2000 }`", "`{ retries: 5, delay: 2000 }`"],
      ["`{ attempts: 5, repeat: { every: 2000 } }`", "`{ attempts: 5, repeat: { every: 2000 } }`"],
      ["`{ maxRetries: 5, backoff: 'exp:2s' }`", "`{ maxRetries: 5, backoff: 'exp:2s' }`"],
    ],
    a: [
      "`attempts` تعداد کل تلاش‌ها و `backoff` استراتژی تأخیر است. بعد از آخرین شکست، job در وضعیت failed می‌ماند و می‌توان آن را بررسی یا دستی retry کرد.",
      "`attempts` is the total number of tries and `backoff` sets the delay strategy. After the final failure the job stays in the failed set for inspection or manual retry.",
    ],
  },
  {
    id: "mq-m-bullmq-repeatable",
    level: "middle",
    tags: ["bullmq", "scheduling"],
    q: [
      "مزیت repeatable job در BullMQ نسبت به `node-cron` داخل هر instance چیست؟",
      "What's the advantage of BullMQ repeatable jobs over `node-cron` in each instance?",
    ],
    options: [
      ["زمان‌بندی در Redis نگه داشته می‌شود و هر اجرا فقط یک بار توسط یک worker انجام می‌شود", "The schedule lives in Redis and each run is executed once by one worker"],
      ["Repeatable jobها بدون Redis کار می‌کنند", "Repeatable jobs work without Redis"],
      ["Repeatable jobها هرگز شکست نمی‌خورند", "Repeatable jobs never fail"],
      ["Repeatable jobها روی همه instanceها هم‌زمان اجرا می‌شوند", "Repeatable jobs run simultaneously on all instances"],
    ],
    a: [
      "BullMQ برای هر بازه یک job delayed با id مشخص می‌سازد، پس چند instance باعث اجرای تکراری نمی‌شوند. همچنین retry و مانیتورینگ مثل بقیه jobها را دارند.",
      "BullMQ creates one delayed job per interval with a deterministic id, so multiple instances don't cause duplicate runs. They also get retries and monitoring like other jobs.",
    ],
  },
  {
    id: "mq-m-bullmq-remove-on-complete",
    level: "middle",
    tags: ["bullmq", "operations"],
    q: [
      "چرا در production معمولاً `removeOnComplete` و `removeOnFail` را در BullMQ تنظیم می‌کنند؟",
      "Why do production BullMQ setups usually configure `removeOnComplete` and `removeOnFail`?",
    ],
    options: [
      ["تا jobهای تمام‌شده بی‌نهایت در Redis جمع نشوند و حافظه پر نشود", "So finished jobs don't pile up in Redis forever and exhaust memory"],
      ["تا jobهای شکست‌خورده خودکار retry شوند", "So failed jobs are automatically retried"],
      ["تا jobها سریع‌تر اجرا شوند", "So jobs execute faster"],
      ["تا از اجرای تکراری job جلوگیری شود", "To prevent duplicate job execution"],
    ],
    a: [
      "به‌طور پیش‌فرض BullMQ jobهای completed و failed را نگه می‌دارد و Redis که in-memory است رشد می‌کند. معمولاً تعداد یا سن مشخصی نگه داشته می‌شود، مثل `{ count: 1000 }` یا `{ age: 86400 }`.",
      "By default BullMQ keeps completed and failed jobs, and in-memory Redis keeps growing. Typically you keep a bounded count or age, like `{ count: 1000 }` or `{ age: 86400 }`.",
    ],
  },
  {
    id: "mq-m-bullmq-rate-limit",
    level: "middle",
    tags: ["bullmq", "rate-limiting"],
    q: [
      "API ایمیل شما حداکثر ۱۰ درخواست در ثانیه می‌پذیرد. در BullMQ چگونه این را رعایت می‌کنید؟",
      "Your email API allows at most 10 requests per second. How do you respect that in BullMQ?",
    ],
    options: [
      ["با `limiter: { max: 10, duration: 1000 }` روی Worker", "Set `limiter: { max: 10, duration: 1000 }` on the Worker"],
      ["با `concurrency: 10` که خودش نرخ را محدود می‌کند", "Use `concurrency: 10`, which limits the rate by itself"],
      ["با `attempts: 10` روی هر job", "Use `attempts: 10` on each job"],
      ["با `delay: 100` روی همه jobها هنگام اضافه کردن", "Add every job with `delay: 100`"],
    ],
    a: [
      "Concurrency تعداد کارهای هم‌زمان را محدود می‌کند نه نرخ در ثانیه. Rate limiter در BullMQ به‌صورت سراسری روی صف در Redis اعمال می‌شود، حتی با چند worker.",
      "Concurrency limits simultaneous jobs, not rate per second. BullMQ's limiter is enforced globally per queue in Redis, even across multiple workers.",
    ],
  },
  {
    id: "mq-m-graceful-shutdown",
    level: "middle",
    tags: ["operations", "reliability"],
    q: [
      "هنگام deploy، worker باید با سیگنال `SIGTERM` چه کاری انجام دهد؟",
      "During a deploy, what should a worker do on `SIGTERM`?",
    ],
    options: [
      ["دریافت پیام جدید را متوقف کند، کارهای در حال اجرا را تمام کند و سپس خارج شود", "Stop taking new messages, finish in-flight work, then exit"],
      ["فوراً با `process.exit(0)` خارج شود", "Exit immediately with `process.exit(0)`"],
      ["همه پیام‌های صف را ack کند و خارج شود", "Ack every message in the queue and exit"],
      ["سیگنال را نادیده بگیرد تا Kubernetes آن را kill کند", "Ignore the signal until Kubernetes kills it"],
    ],
    a: [
      "Graceful shutdown از redelivery غیرضروری و کارهای نیمه‌کاره جلوگیری می‌کند. در BullMQ با `await worker.close()` و در Kafka با بستن consumer و commit نهایی offset انجام می‌شود.",
      "Graceful shutdown avoids needless redelivery and half-done work. In BullMQ call `await worker.close()`; in Kafka close the consumer and commit final offsets.",
    ],
  },
  {
    id: "mq-m-sqs-redrive",
    level: "middle",
    tags: ["sqs", "dlq"],
    q: [
      "در SQS، `maxReceiveCount` در redrive policy چه کاری انجام می‌دهد؟",
      "In SQS, what does `maxReceiveCount` in a redrive policy do?",
    ],
    options: [
      ["بعد از اینکه پیام این تعداد بار دریافت ولی حذف نشد، به DLQ منتقل می‌شود", "After a message is received that many times without deletion, it moves to the DLQ"],
      ["حداکثر تعداد consumerهای هم‌زمان را تعیین می‌کند", "Sets the max number of concurrent consumers"],
      ["تعداد پیام‌های هر `ReceiveMessage` را تعیین می‌کند", "Sets how many messages each `ReceiveMessage` returns"],
      ["تعداد دفعاتی که producer ارسال را تکرار می‌کند", "How many times the producer retries sending"],
    ],
    a: [
      "هر بار که visibility timeout بدون `DeleteMessage` تمام شود، receive count افزایش می‌یابد. با رسیدن به `maxReceiveCount`، SQS پیام را به DLQ تعیین‌شده می‌فرستد.",
      "Each time the visibility timeout lapses without `DeleteMessage`, the receive count increments. At `maxReceiveCount`, SQS moves the message to the configured DLQ.",
    ],
  },
  {
    id: "mq-m-visibility-too-short",
    level: "middle",
    tags: ["sqs", "visibility-timeout"],
    q: [
      "پردازش هر پیام حدود ۲ دقیقه طول می‌کشد ولی visibility timeout صف ۳۰ ثانیه است. چه اتفاقی می‌افتد؟",
      "Processing takes about 2 minutes but the queue's visibility timeout is 30 seconds. What happens?",
    ],
    options: [
      ["پیام قبل از اتمام دوباره visible می‌شود و consumer دیگری هم آن را پردازش می‌کند", "The message reappears before completion and another consumer processes it too"],
      ["SQS صبر می‌کند تا پردازش تمام شود", "SQS waits until processing finishes"],
      ["پیام بلافاصله به DLQ می‌رود", "The message immediately goes to the DLQ"],
      ["Consumer خطای timeout می‌گیرد و پیام حذف می‌شود", "The consumer gets a timeout error and the message is deleted"],
    ],
    a: [
      "Visibility timeout باید بیشتر از حداکثر زمان پردازش باشد. برای کارهای طولانی می‌توان با `ChangeMessageVisibility` به‌صورت heartbeat آن را تمدید کرد.",
      "The visibility timeout must exceed the worst-case processing time. For long jobs, extend it as a heartbeat with `ChangeMessageVisibility`.",
    ],
  },
  {
    id: "mq-m-sqs-long-polling",
    level: "middle",
    tags: ["sqs", "aws"],
    q: [
      "فعال کردن long polling در SQS (`WaitTimeSeconds: 20`) چه فایده‌ای دارد؟",
      "What's the benefit of enabling SQS long polling (`WaitTimeSeconds: 20`)?",
    ],
    options: [
      ["کاهش پاسخ‌های خالی و هزینه درخواست‌ها، چون تا رسیدن پیام منتظر می‌ماند", "Fewer empty responses and lower request cost, since it waits for messages to arrive"],
      ["پیام‌ها ۲۰ ثانیه از دید بقیه پنهان می‌شوند", "Messages are hidden from others for 20 seconds"],
      ["پیام‌ها ۲۰ روز نگه داشته می‌شوند", "Messages are retained for 20 days"],
      ["ترتیب پیام‌ها تضمین می‌شود", "Message order becomes guaranteed"],
    ],
    a: [
      "Short polling بلافاصله برمی‌گردد، حتی اگر خالی باشد، و درخواست‌های بی‌فایده زیادی ایجاد می‌کند. Long polling تا ۲۰ ثانیه منتظر پیام می‌ماند و تأخیر و هزینه را کم می‌کند.",
      "Short polling returns immediately even when empty, generating many wasted requests. Long polling waits up to 20 seconds for a message, cutting cost and empty receives.",
    ],
  },
  {
    id: "mq-m-sqs-fifo-group",
    level: "middle",
    tags: ["sqs", "ordering"],
    q: [
      "در صف FIFO در SQS، `MessageGroupId` چه نقشی دارد؟",
      "In an SQS FIFO queue, what's the role of `MessageGroupId`?",
    ],
    options: [
      ["ترتیب فقط درون هر group تضمین می‌شود و groupهای مختلف موازی پردازش می‌شوند", "Order is guaranteed within each group, and different groups process in parallel"],
      ["پیام‌های تکراری را بر اساس آن حذف می‌کند", "It's used to drop duplicate messages"],
      ["تعیین می‌کند پیام به کدام DLQ برود", "It decides which DLQ the message goes to"],
      ["اولویت پیام را مشخص می‌کند", "It sets the message priority"],
    ],
    a: [
      "استفاده از یک group ثابت برای همه پیام‌ها کل صف را سریالی می‌کند. معمولاً شناسه موجودیت (مثل `userId`) را group قرار می‌دهند تا هم ترتیب و هم موازی‌سازی داشته باشیم.",
      "Using one constant group serializes the whole queue. Typically the entity ID (like `userId`) is the group, giving both per-entity order and parallelism.",
    ],
  },
  {
    id: "mq-m-sqs-dedup-id",
    level: "middle",
    tags: ["sqs", "dedup"],
    q: [
      "`MessageDeduplicationId` در SQS FIFO چه تضمینی می‌دهد؟",
      "What does `MessageDeduplicationId` guarantee in SQS FIFO?",
    ],
    options: [
      ["پیام‌هایی با همان ID در یک بازه ۵ دقیقه‌ای فقط یک بار پذیرفته می‌شوند", "Messages with the same ID within a 5-minute window are accepted only once"],
      ["پیام هرگز حتی بعد از یک ماه دوباره پذیرفته نمی‌شود", "The message is never accepted again, even a month later"],
      ["Consumer هر پیام را دقیقاً یک بار پردازش می‌کند، حتی با crash", "Consumers process each message exactly once even across crashes"],
      ["پیام‌ها بر اساس آن مرتب می‌شوند", "Messages are sorted by it"],
    ],
    a: [
      "Dedup فقط در سمت ارسال و فقط در پنجره ۵ دقیقه‌ای است. اگر consumer بعد از پردازش و قبل از delete از کار بیفتد، همچنان پردازش تکراری ممکن است، پس idempotency لازم است.",
      "Dedup is send-side only, within a 5-minute window. If a consumer crashes after processing but before delete, duplicates are still possible, so idempotency is still needed.",
    ],
  },
  {
    id: "mq-m-sns-filter-policy",
    level: "middle",
    tags: ["sns", "aws"],
    q: [
      "SNS subscription filter policy چه کاربردی دارد؟",
      "What is an SNS subscription filter policy for?",
    ],
    options: [
      ["هر subscriber فقط پیام‌هایی را دریافت کند که attributeهای آن‌ها با فیلترش مطابقت دارد", "Each subscriber receives only messages whose attributes match its filter"],
      ["پیام‌های بزرگ‌تر از یک اندازه را رد کند", "Reject messages larger than a set size"],
      ["پیام‌ها را قبل از ارسال رمزنگاری کند", "Encrypt messages before delivery"],
      ["ترتیب پیام‌ها را بین subscriberها حفظ کند", "Preserve order across subscribers"],
    ],
    a: [
      "بدون فیلتر، هر صف همه پیام‌ها را می‌گیرد و باید خودش دور بریزد. Filter policy روی message attributes (یا body) کار می‌کند و هزینه و کار consumer را کم می‌کند.",
      "Without filters, every queue gets everything and must discard what it doesn't need. Filter policies match message attributes (or body), cutting cost and consumer work.",
    ],
  },
  {
    id: "mq-m-kafka-auto-commit-risk",
    level: "middle",
    tags: ["kafka", "offsets"],
    q: [
      "ریسک `enable.auto.commit=true` در consumer کافکا چیست؟",
      "What's the risk of `enable.auto.commit=true` in a Kafka consumer?",
    ],
    options: [
      ["Offset ممکن است قبل از اتمام پردازش commit شود و با crash پیام از دست برود", "Offsets may be committed before processing finishes, losing messages on crash"],
      ["Offset هرگز commit نمی‌شود", "Offsets are never committed"],
      ["هر پیام دقیقاً یک بار پردازش می‌شود", "Each message is processed exactly once"],
      ["Consumer در هر poll از اول topic می‌خواند", "The consumer re-reads from the start on every poll"],
    ],
    a: [
      "Auto-commit به‌صورت دوره‌ای (`auto.commit.interval.ms`) offsetهای poll‌شده را commit می‌کند، صرف‌نظر از نتیجه پردازش. برای at-least-once، auto-commit را خاموش و بعد از پردازش دستی commit کنید.",
      "Auto-commit periodically (`auto.commit.interval.ms`) commits polled offsets regardless of processing outcome. For at-least-once, disable it and commit manually after processing.",
    ],
  },
  {
    id: "mq-m-kafka-commit-after",
    level: "middle",
    tags: ["kafka", "delivery-semantics"],
    q: [
      "اگر consumer کافکا ابتدا پیام را پردازش و سپس offset را commit کند، چه semantics به دست می‌آید؟",
      "If a Kafka consumer processes first and commits the offset afterward, what semantics do you get?",
    ],
    options: [
      ["At-least-once", "At-least-once"],
      ["At-most-once", "At-most-once"],
      ["Exactly-once", "Exactly-once"],
      ["Best-effort بدون هیچ تضمینی", "Best-effort with no guarantee"],
    ],
    a: [
      "اگر بین پردازش و commit crash رخ دهد، پیام دوباره خوانده می‌شود، پس تکرار ممکن است ولی گم شدن نه. Commit قبل از پردازش برعکس at-most-once می‌دهد.",
      "A crash between processing and commit means the message is re-read, so duplicates are possible but not loss. Committing before processing gives at-most-once.",
    ],
  },
  {
    id: "mq-m-kafka-rebalance",
    level: "middle",
    tags: ["kafka", "consumer-groups"],
    q: [
      "Rebalance در consumer group کافکا چه زمانی رخ می‌دهد؟",
      "When does a Kafka consumer group rebalance happen?",
    ],
    options: [
      ["وقتی consumerی اضافه یا خارج شود، heartbeat قطع شود یا partitionها تغییر کنند", "When a consumer joins or leaves, misses heartbeats, or partitions change"],
      ["هر بار که producer پیامی می‌فرستد", "Every time a producer sends a message"],
      ["فقط وقتی broker restart می‌شود", "Only when a broker restarts"],
      ["هر ۲۴ ساعت به‌صورت زمان‌بندی‌شده", "Every 24 hours on a schedule"],
    ],
    a: [
      "در rebalance، partitionها بین اعضا دوباره تقسیم می‌شوند و در پروتکل eager مصرف موقتاً متوقف می‌شود. Cooperative sticky assignor و static membership این توقف را کاهش می‌دهند.",
      "During a rebalance, partitions are reassigned among members, and with the eager protocol consumption pauses. The cooperative sticky assignor and static membership reduce this disruption.",
    ],
  },
  {
    id: "mq-m-max-poll-interval",
    level: "middle",
    tags: ["kafka", "consumer-groups"],
    q: [
      "اگر پردازش یک batch بیشتر از `max.poll.interval.ms` طول بکشد، چه می‌شود؟",
      "What happens if processing a batch takes longer than `max.poll.interval.ms`?",
    ],
    options: [
      ["Consumer از گروه خارج‌شده تلقی می‌شود، rebalance رخ می‌دهد و commit بعدی شکست می‌خورد", "The consumer is considered dead, a rebalance occurs, and its next commit fails"],
      ["Kafka صبر می‌کند تا پردازش تمام شود", "Kafka waits for processing to finish"],
      ["پیام‌های batch حذف می‌شوند", "The batch's messages are deleted"],
      ["Consumer خودکار batch کوچک‌تری دریافت می‌کند", "The consumer automatically receives a smaller batch"],
    ],
    a: [
      "Kafka انتظار دارد `poll()` در این بازه دوباره صدا زده شود. راه‌حل کاهش `max.poll.records`، سریع‌تر کردن پردازش یا افزایش این مقدار است؛ وگرنه پیام‌ها دوباره پردازش می‌شوند.",
      "Kafka expects `poll()` to be called again within this interval. Lower `max.poll.records`, speed up processing, or raise the limit; otherwise messages get reprocessed.",
    ],
  },
  {
    id: "mq-m-consumer-lag",
    level: "middle",
    tags: ["kafka", "monitoring"],
    q: [
      "Consumer lag در Kafka چگونه محاسبه می‌شود؟",
      "How is consumer lag computed in Kafka?",
    ],
    options: [
      ["تفاوت آخرین offset partition (log end offset) با offset commit‌شده گروه", "The difference between the partition's log end offset and the group's committed offset"],
      ["زمان بین ارسال پیام توسط producer و ack broker", "Time between producer send and broker ack"],
      ["تعداد consumerهای بیکار در گروه", "The number of idle consumers in the group"],
      ["تعداد پیام‌های حذف‌شده به‌خاطر retention", "The number of messages deleted by retention"],
    ],
    a: [
      "Lag نشان می‌دهد گروه چند پیام عقب است. رشد مداوم lag یعنی consumerها نمی‌رسند؛ ابزارهایی مثل Burrow یا `kafka-consumer-groups --describe` آن را نشان می‌دهند.",
      "Lag shows how many messages the group is behind. Steadily rising lag means consumers can't keep up; tools like Burrow or `kafka-consumer-groups --describe` expose it.",
    ],
  },
  {
    id: "mq-m-scale-partitions",
    level: "middle",
    tags: ["kafka", "scaling"],
    q: [
      "Lag یک topic با ۴ partition زیاد است و ۴ consumer دارید. اضافه کردن consumer پنجم چه اثری دارد؟",
      "A 4-partition topic has high lag with 4 consumers. What does adding a 5th consumer do?",
    ],
    options: [
      ["هیچ؛ باید تعداد partitionها افزایش یابد یا پردازش هر consumer سریع‌تر شود", "Nothing; you need more partitions or faster per-consumer processing"],
      ["Throughput حدود ۲۵ درصد بیشتر می‌شود", "Throughput rises about 25%"],
      ["Kafka خودکار یک partition جدید می‌سازد", "Kafka automatically creates a new partition"],
      ["Lag فوراً صفر می‌شود", "Lag drops to zero immediately"],
    ],
    a: [
      "هر partition فقط به یک consumer در گروه اختصاص دارد، پس consumer پنجم بیکار می‌ماند. افزایش partition ممکن است، ولی نگاشت key به partition را برای پیام‌های جدید تغییر می‌دهد.",
      "Each partition goes to only one consumer in the group, so the 5th sits idle. You can add partitions, but that changes the key-to-partition mapping for new messages.",
    ],
  },
  {
    id: "mq-m-add-partitions-ordering",
    level: "middle",
    tags: ["kafka", "ordering"],
    q: [
      "افزایش تعداد partitionهای یک topic موجود چه ریسکی برای ترتیب دارد؟",
      "What ordering risk comes with increasing partitions on an existing topic?",
    ],
    options: [
      ["پیام‌های جدید یک key ممکن است به partition دیگری بروند و ترتیب نسبت به پیام‌های قبلی به هم بخورد", "New messages for a key may land in a different partition, breaking order relative to older ones"],
      ["همه پیام‌های قبلی حذف می‌شوند", "All existing messages are deleted"],
      ["Kafka اجازه افزایش partition نمی‌دهد", "Kafka doesn't allow adding partitions"],
      ["پیام‌های قدیمی خودکار بین partitionهای جدید توزیع می‌شوند", "Old messages are automatically redistributed"],
    ],
    a: [
      "Partitioner پیش‌فرض از `hash(key) % numPartitions` استفاده می‌کند و با تغییر تعداد، نگاشت عوض می‌شود. داده قدیمی جابه‌جا نمی‌شود؛ بهتر است از ابتدا تعداد partition مناسب انتخاب شود.",
      "The default partitioner uses `hash(key) % numPartitions`, so changing the count changes the mapping. Existing data isn't moved, so pick a suitable partition count upfront.",
    ],
  },
  {
    id: "mq-m-replication-factor",
    level: "middle",
    tags: ["kafka", "replication"],
    q: [
      "Replication factor برابر ۳ برای یک topic در Kafka یعنی چه؟",
      "What does a replication factor of 3 mean for a Kafka topic?",
    ],
    options: [
      ["هر partition یک leader و دو follower روی brokerهای مختلف دارد", "Each partition has one leader and two followers on different brokers"],
      ["هر پیام سه بار به consumer تحویل می‌شود", "Each message is delivered to consumers three times"],
      ["Topic سه partition دارد", "The topic has three partitions"],
      ["سه consumer group می‌توانند topic را بخوانند", "Three consumer groups can read the topic"],
    ],
    a: [
      "Producerها و consumerها با leader کار می‌کنند و followerها داده را replicate می‌کنند. با RF=3 می‌توان خرابی دو broker را بدون از دست دادن داده commit‌شده تحمل کرد.",
      "Producers and consumers talk to the leader while followers replicate. With RF=3, the cluster can lose up to two brokers without losing committed data.",
    ],
  },
  {
    id: "mq-m-producer-acks",
    level: "middle",
    tags: ["kafka", "durability"],
    q: [
      "تنظیم `acks=1` در producer کافکا چه ریسکی دارد؟",
      "What's the risk of `acks=1` on a Kafka producer?",
    ],
    options: [
      ["اگر leader قبل از replicate شدن پیام از کار بیفتد، پیام ack‌شده از دست می‌رود", "If the leader dies before replication, an acknowledged message is lost"],
      ["Producer هرگز ack دریافت نمی‌کند", "The producer never receives an ack"],
      ["پیام‌ها همیشه تکراری می‌شوند", "Messages are always duplicated"],
      ["Throughput به‌شدت کاهش می‌یابد چون منتظر همه replicaهاست", "Throughput drops sharply because it waits for all replicas"],
    ],
    a: [
      "با `acks=1` فقط leader نوشتن را تأیید می‌کند. `acks=0` هیچ تأییدی نمی‌خواهد و `acks=all` منتظر همه replicaهای in-sync می‌ماند که امن‌ترین است.",
      "With `acks=1` only the leader confirms the write. `acks=0` waits for nothing, and `acks=all` waits for all in-sync replicas, which is the safest.",
    ],
  },
  {
    id: "mq-m-log-compaction-basic",
    level: "middle",
    tags: ["kafka", "compaction"],
    q: [
      "Log compaction در Kafka (`cleanup.policy=compact`) چه چیزی را نگه می‌دارد؟",
      "What does Kafka log compaction (`cleanup.policy=compact`) retain?",
    ],
    options: [
      ["حداقل آخرین مقدار برای هر key", "At least the latest value for each key"],
      ["فقط پیام‌های ۷ روز اخیر", "Only messages from the last 7 days"],
      ["پیام‌ها را فشرده (gzip) می‌کند و همه را نگه می‌دارد", "It gzips messages and keeps all of them"],
      ["فقط اولین پیام هر key", "Only the first message for each key"],
    ],
    a: [
      "Compaction رکوردهای قدیمی‌تر با همان key را حذف می‌کند و آخرین وضعیت را نگه می‌دارد. پیام با value برابر `null` (tombstone) باعث حذف نهایی key می‌شود؛ مناسب برای changelog و جداول state.",
      "Compaction removes older records with the same key, keeping the latest state. A `null` value (tombstone) eventually deletes the key; ideal for changelogs and state tables.",
    ],
  },
  {
    id: "mq-m-kafka-retry-topics",
    level: "middle",
    tags: ["kafka", "retry", "dlq"],
    q: [
      "چرا در Kafka برای retry معمولاً از retry topic و DLT استفاده می‌کنند به‌جای retry درجا؟",
      "Why do Kafka setups use retry topics and a DLT instead of retrying in place?",
    ],
    options: [
      ["چون retry درجا partition را block می‌کند و پیام‌های بعدی منتظر می‌مانند", "Because in-place retries block the partition and stall all following messages"],
      ["چون Kafka از ack پشتیبانی نمی‌کند", "Because Kafka doesn't support acks"],
      ["چون Kafka پیام‌ها را بعد از خواندن حذف می‌کند", "Because Kafka deletes messages after reading"],
      ["چون retry topicها ترتیب را تضمین می‌کنند", "Because retry topics guarantee ordering"],
    ],
    a: [
      "Kafka ack تکی ندارد و consumer نمی‌تواند از یک پیام رد شود و offset را جلو ببرد بدون اینکه آن را کنار بگذارد. انتقال پیام به `orders.retry` یا `orders.dlt` partition را آزاد می‌کند، ولی ترتیب آن key را می‌شکند.",
      "Kafka has no per-message ack, so a consumer can't move past a failing message without parking it somewhere. Moving it to `orders.retry` or `orders.dlt` unblocks the partition, at the cost of that key's ordering.",
    ],
  },
  {
    id: "mq-m-backpressure",
    level: "middle",
    tags: ["backpressure"],
    q: [
      "Backpressure در سیستم پیام‌رسان یعنی چه؟",
      "What does backpressure mean in a messaging system?",
    ],
    options: [
      ["مکانیزمی که وقتی مصرف‌کننده عقب است، نرخ دریافت یا تولید را کند می‌کند", "A mechanism that slows intake or production when the consumer falls behind"],
      ["فشرده‌سازی پیام‌ها برای کاهش حجم شبکه", "Compressing messages to reduce network traffic"],
      ["برگرداندن پیام‌ها به producer بعد از پردازش", "Returning messages to the producer after processing"],
      ["افزایش اولویت پیام‌های قدیمی", "Raising the priority of older messages"],
    ],
    a: [
      "بدون backpressure، consumer کند با بافرهای نامحدود حافظه‌اش پر می‌شود. Prefetch، `pause()`/`resume()` در Kafka، flow control در RabbitMQ و پاسخ `429` نمونه‌هایی از آن هستند.",
      "Without backpressure, a slow consumer fills memory with unbounded buffers. Prefetch, Kafka `pause()`/`resume()`, RabbitMQ flow control and HTTP `429` are all examples.",
    ],
  },
  {
    id: "mq-m-idempotent-upsert",
    level: "middle",
    tags: ["idempotency"],
    q: [
      "کدام پیاده‌سازی consumer برای رویداد `PaymentReceived` با تحویل at-least-once امن است؟",
      "Which consumer implementation is safe for a `PaymentReceived` event under at-least-once delivery?",
    ],
    options: [
      ["در یک تراکنش: درج `paymentId` در جدول processed با unique constraint و سپس به‌روزرسانی موجودی", "In one transaction: insert `paymentId` into a processed table with a unique constraint, then update the balance"],
      ["فقط اجرای `UPDATE accounts SET balance = balance + amount`", "Just run `UPDATE accounts SET balance = balance + amount`"],
      ["بررسی وجود `paymentId` در کش و سپس به‌روزرسانی، بدون تراکنش", "Check a cache for `paymentId` and then update, without a transaction"],
      ["استفاده از auto-ack تا پیام فقط یک بار بیاید", "Use auto-ack so the message only arrives once"],
    ],
    a: [
      "ثبت شناسه و اثر تجاری باید اتمیک باشند؛ وگرنه crash بین دو مرحله باعث تکرار یا گم شدن می‌شود. Check-then-act بدون تراکنش هم race condition دارد.",
      "Recording the ID and applying the effect must be atomic, otherwise a crash between them causes duplication or loss. Check-then-act without a transaction also races.",
    ],
  },
  {
    id: "mq-m-idempotency-key-source",
    level: "middle",
    tags: ["idempotency", "dedup"],
    q: [
      "بهترین منبع برای dedup key یک پیام چیست؟",
      "What's the best source for a message's dedup key?",
    ],
    options: [
      ["یک شناسه پایدار که producer هنگام ایجاد رویداد می‌سازد، مثل `eventId`", "A stable ID generated by the producer when the event is created, like `eventId`"],
      ["Timestamp زمان دریافت در consumer", "The consumer's receive timestamp"],
      ["Delivery tag که broker برای هر تحویل می‌دهد", "The broker's per-delivery delivery tag"],
      ["یک UUID که consumer برای هر پیام می‌سازد", "A UUID the consumer generates per message"],
    ],
    a: [
      "Dedup key باید در همه تحویل‌های همان پیام یکسان باشد. Delivery tag یا UUID ساخته‌شده در consumer در هر redelivery عوض می‌شوند و تکرار را تشخیص نمی‌دهند.",
      "A dedup key must be identical across every delivery of the same message. Delivery tags or consumer-generated UUIDs change on redelivery and can't detect duplicates.",
    ],
  },
  {
    id: "mq-m-dual-write",
    level: "middle",
    tags: ["outbox", "consistency"],
    q: [
      "مشکل dual-write در کد زیر چیست: `await db.save(order); await kafka.send('OrderCreated');`؟",
      "What's the dual-write problem in: `await db.save(order); await kafka.send('OrderCreated');`?",
    ],
    options: [
      ["اگر بین دو عملیات crash رخ دهد، سفارش ذخیره شده ولی رویداد هرگز منتشر نمی‌شود", "If it crashes between the two, the order is saved but the event is never published"],
      ["Kafka اجازه ارسال از داخل async function نمی‌دهد", "Kafka doesn't allow sending from an async function"],
      ["رویداد همیشه دو بار منتشر می‌شود", "The event is always published twice"],
      ["دیتابیس و Kafka قفل مشترک می‌گیرند و deadlock می‌شود", "The DB and Kafka share a lock and deadlock"],
    ],
    a: [
      "دیتابیس و broker تراکنش مشترک ندارند، پس نوشتن در هر دو اتمیک نیست. جابه‌جا کردن ترتیب هم مشکل را برعکس می‌کند؛ راه‌حل رایج الگوی transactional outbox یا CDC است.",
      "The database and broker share no transaction, so writing both isn't atomic. Swapping the order just flips the failure; the usual fix is the transactional outbox or CDC.",
    ],
  },
  {
    id: "mq-m-outbox-basic",
    level: "middle",
    tags: ["outbox"],
    q: [
      "الگوی transactional outbox چگونه کار می‌کند؟",
      "How does the transactional outbox pattern work?",
    ],
    options: [
      ["رویداد در همان تراکنش داده تجاری در جدول outbox نوشته و سپس یک relay آن را به broker منتشر می‌کند", "The event is written to an outbox table in the same transaction as the business data, then a relay publishes it"],
      ["رویداد ابتدا به broker و بعد به دیتابیس نوشته می‌شود", "The event is sent to the broker first, then to the database"],
      ["Consumer مستقیماً از جدول‌های سرویس دیگر می‌خواند", "Consumers read directly from the other service's tables"],
      ["Broker و دیتابیس با two-phase commit هماهنگ می‌شوند", "The broker and DB coordinate with two-phase commit"],
    ],
    a: [
      "چون هر دو در یک تراکنش محلی‌اند، یا هر دو ثبت می‌شوند یا هیچ‌کدام. Relay (polling یا CDC) ممکن است رویدادی را دو بار منتشر کند، پس consumerها باید idempotent باشند.",
      "Both writes share one local transaction, so they commit together or not at all. The relay (polling or CDC) may publish twice, so consumers must still be idempotent.",
    ],
  },
  {
    id: "mq-m-event-notification-vs-ecst",
    level: "middle",
    tags: ["event-driven"],
    q: [
      "تفاوت event notification و event-carried state transfer چیست؟",
      "What's the difference between event notification and event-carried state transfer?",
    ],
    options: [
      ["Notification فقط شناسه و نوع رخداد را دارد؛ state transfer داده کامل لازم را در خود رویداد می‌فرستد", "Notification carries just the ID and type; state transfer carries the full data consumers need"],
      ["Notification همیشه sync و state transfer همیشه async است", "Notification is always sync and state transfer always async"],
      ["State transfer فقط برای ارسال فایل استفاده می‌شود", "State transfer is only for sending files"],
      ["Notification در Kafka و state transfer در RabbitMQ پیاده می‌شود", "Notification is Kafka-only and state transfer RabbitMQ-only"],
    ],
    a: [
      "در notification، consumer برای جزئیات باید سرویس مبدأ را صدا بزند که coupling و بار ایجاد می‌کند. در state transfer، consumer کپی محلی داده را نگه می‌دارد، به قیمت پیام‌های بزرگ‌تر و eventual consistency.",
      "With notification, consumers call back the source for details, adding coupling and load. With state transfer, consumers keep a local copy, at the cost of bigger messages and eventual consistency.",
    ],
  },
  {
    id: "mq-m-cqrs-basic",
    level: "middle",
    tags: ["cqrs", "architecture"],
    q: [
      "CQRS به چه معناست؟",
      "What does CQRS mean?",
    ],
    options: [
      ["جداسازی مدل نوشتن (command) از مدل خواندن (query)، اغلب با read model جداگانه", "Separating the write (command) model from the read (query) model, often with separate read stores"],
      ["استفاده از یک صف برای هر query", "Using one queue per query"],
      ["کش کردن همه کوئری‌ها در Redis", "Caching every query in Redis"],
      ["اجرای همه commandها به‌صورت همگام", "Running all commands synchronously"],
    ],
    a: [
      "در CQRS نوشتن روی مدل نرمال‌شده و خواندن از projectionهای بهینه برای نمایش انجام می‌شود. Read model معمولاً از طریق رویدادها به‌روز می‌شود و eventual consistent است.",
      "CQRS writes to a normalized model and reads from projections optimized for display. The read model is usually updated via events and is eventually consistent.",
    ],
  },
  {
    id: "mq-m-schema-evolution",
    level: "middle",
    tags: ["schema", "kafka"],
    q: [
      "در تکامل schema پیام‌ها، کدام تغییر backward compatible است؟",
      "In message schema evolution, which change is backward compatible?",
    ],
    options: [
      ["اضافه کردن یک فیلد اختیاری با مقدار پیش‌فرض", "Adding an optional field with a default value"],
      ["تغییر نوع فیلد `amount` از عدد به رشته", "Changing `amount` from number to string"],
      ["تغییر نام یک فیلد اجباری", "Renaming a required field"],
      ["حذف یک فیلد اجباری بدون پیش‌فرض", "Removing a required field with no default"],
    ],
    a: [
      "Backward compatible یعنی consumer با schema جدید بتواند داده نوشته‌شده با schema قدیمی را بخواند؛ فیلد جدید با default این را ممکن می‌کند. Schema Registry با Avro یا Protobuf این قواعد را enforce می‌کند.",
      "Backward compatible means consumers on the new schema can read data written with the old one; a new field with a default allows that. A Schema Registry with Avro or Protobuf enforces these rules.",
    ],
  },
  {
    id: "mq-m-schema-registry",
    level: "middle",
    tags: ["schema", "kafka"],
    q: [
      "Schema Registry در کنار Kafka چه نقشی دارد؟",
      "What role does a Schema Registry play alongside Kafka?",
    ],
    options: [
      ["نگهداری نسخه‌های schema و بررسی سازگاری قبل از ثبت schema جدید", "Storing schema versions and checking compatibility before registering new ones"],
      ["ذخیره پیام‌ها به‌جای brokerها", "Storing messages instead of brokers"],
      ["مدیریت offsetهای consumer groupها", "Managing consumer group offsets"],
      ["تقسیم partitionها بین consumerها", "Assigning partitions to consumers"],
    ],
    a: [
      "Producer فقط شناسه schema را همراه پیام می‌فرستد و consumer schema را از registry می‌گیرد. اگر تغییر جدید با قوانین سازگاری (مثلاً BACKWARD) مغایر باشد، ثبت رد می‌شود.",
      "Producers embed just a schema ID and consumers fetch the schema from the registry. If a new version violates the compatibility mode (e.g. BACKWARD), registration is rejected.",
    ],
  },
  {
    id: "mq-m-redis-streams-pel",
    level: "middle",
    tags: ["redis", "streams"],
    q: [
      "در Redis Streams، اگر consumer پیامی را با `XREADGROUP` بخواند و قبل از `XACK` از کار بیفتد، چه می‌شود؟",
      "In Redis Streams, if a consumer reads with `XREADGROUP` and dies before `XACK`, what happens?",
    ],
    options: [
      ["پیام در Pending Entries List می‌ماند و consumer دیگری می‌تواند با `XCLAIM` یا `XAUTOCLAIM` آن را بگیرد", "It stays in the Pending Entries List and another consumer can take it with `XCLAIM` or `XAUTOCLAIM`"],
      ["پیام خودکار پس از ۳۰ ثانیه به consumer دیگری تحویل می‌شود", "It's automatically redelivered to another consumer after 30 seconds"],
      ["پیام برای همیشه از stream حذف می‌شود", "It's permanently removed from the stream"],
      ["کل consumer group متوقف می‌شود", "The whole consumer group stops"],
    ],
    a: [
      "Redis خودکار redelivery انجام نمی‌دهد؛ باید با `XPENDING` پیام‌های معلق قدیمی را پیدا و claim کرد. شمارنده delivery هم برای تشخیص poison message مفید است.",
      "Redis doesn't redeliver automatically; you find stale entries with `XPENDING` and claim them. The delivery counter also helps detect poison messages.",
    ],
  },
  {
    id: "mq-m-redis-pubsub-vs-streams",
    level: "middle",
    tags: ["redis"],
    q: [
      "چرا Redis Pub/Sub برای job queue قابل اعتماد مناسب نیست؟",
      "Why is Redis Pub/Sub unsuitable for a reliable job queue?",
    ],
    options: [
      ["پیام‌ها ذخیره نمی‌شوند؛ اگر subscriber آن لحظه وصل نباشد پیام از دست می‌رود", "Messages aren't stored; if no subscriber is connected at that moment, they're lost"],
      ["Redis Pub/Sub فقط یک subscriber را پشتیبانی می‌کند", "Redis Pub/Sub supports only one subscriber"],
      ["Redis Pub/Sub خیلی کند است", "Redis Pub/Sub is very slow"],
      ["پیام‌ها همیشه تکراری تحویل می‌شوند", "Messages are always delivered twice"],
    ],
    a: [
      "Pub/Sub در Redis fire-and-forget است و ack، persistence یا replay ندارد. برای jobها از Streams یا کتابخانه‌هایی مثل BullMQ استفاده کنید.",
      "Redis Pub/Sub is fire-and-forget with no acks, persistence or replay. Use Streams or a library like BullMQ for jobs.",
    ],
  },
  {
    id: "mq-m-monitoring-metrics",
    level: "middle",
    tags: ["monitoring"],
    q: [
      "کدام مجموعه متریک برای مانیتورینگ سلامت یک صف مهم‌تر است؟",
      "Which set of metrics matters most for monitoring a queue's health?",
    ],
    options: [
      ["عمق صف، سن قدیمی‌ترین پیام، نرخ خطا و تعداد پیام‌های DLQ", "Queue depth, age of oldest message, error rate and DLQ count"],
      ["فقط مصرف CPU سرور broker", "Only the broker's CPU usage"],
      ["فقط تعداد producerها", "Only the number of producers"],
      ["اندازه کد consumer و تعداد dependencyها", "Consumer code size and dependency count"],
    ],
    a: [
      "سن قدیمی‌ترین پیام (مثل `ApproximateAgeOfOldestMessage` در SQS) مستقیماً تأخیر کاربر را نشان می‌دهد. هر پیام جدید در DLQ هم باید alert ایجاد کند.",
      "Age of the oldest message (like SQS `ApproximateAgeOfOldestMessage`) directly reflects user-facing delay. Any new message in a DLQ should also trigger an alert.",
    ],
  },
  {
    id: "mq-m-autoscale-workers",
    level: "middle",
    tags: ["scaling", "monitoring"],
    q: [
      "برای autoscale کردن workerهای یک صف، کدام سیگنال مناسب‌تر است؟",
      "Which signal is best for autoscaling queue workers?",
    ],
    options: [
      ["Backlog یا lag صف (مثلاً با KEDA)", "Queue backlog or lag (e.g. using KEDA)"],
      ["فقط CPU پادهای worker", "Only the worker pods' CPU"],
      ["تعداد درخواست‌های HTTP به API", "The number of HTTP requests to the API"],
      ["ساعت روز", "Time of day"],
    ],
    a: [
      "Workerهای I/O-bound ممکن است با CPU کم هم عقب بمانند. Scale بر اساس backlog مستقیماً با کار انجام‌نشده مرتبط است؛ KEDA برای SQS، Kafka، RabbitMQ و Redis scaler دارد.",
      "I/O-bound workers can fall behind at low CPU. Scaling on backlog ties directly to pending work; KEDA has scalers for SQS, Kafka, RabbitMQ and Redis.",
    ],
  },
  {
    id: "mq-m-dlq-redrive-process",
    level: "middle",
    tags: ["dlq", "operations"],
    q: [
      "بعد از رفع باگی که باعث رفتن هزاران پیام به DLQ شده، رویکرد درست چیست؟",
      "After fixing a bug that sent thousands of messages to the DLQ, what's the right approach?",
    ],
    options: [
      ["Redrive کنترل‌شده پیام‌ها به صف اصلی با consumerهای idempotent و نظارت بر خطا", "Redrive them to the main queue in a controlled way with idempotent consumers and error monitoring"],
      ["پاک کردن DLQ چون پیام‌ها قدیمی شده‌اند", "Purge the DLQ since the messages are stale"],
      ["پردازش دستی تک‌تک پیام‌ها در دیتابیس", "Manually apply each message in the database"],
      ["حذف DLQ تا دوباره این اتفاق نیفتد", "Delete the DLQ so it doesn't happen again"],
    ],
    a: [
      "DLQ برای همین بازیابی طراحی شده است؛ SQS قابلیت `StartMessageMoveTask` دارد. Redrive را با نرخ محدود انجام دهید تا سرویس‌های پایین‌دستی overload نشوند.",
      "That recovery is exactly what DLQs are for; SQS offers `StartMessageMoveTask`. Redrive at a limited rate so downstream services aren't overwhelmed.",
    ],
  },
  {
    id: "mq-m-transient-vs-permanent",
    level: "middle",
    tags: ["retry", "error-handling"],
    q: [
      "Consumer هنگام دریافت خطای اعتبارسنجی (مثلاً JSON نامعتبر) چه باید بکند؟",
      "What should a consumer do on a validation error (e.g. invalid JSON)?",
    ],
    options: [
      ["بدون retry مستقیماً پیام را به DLQ بفرستد چون خطا دائمی است", "Send it straight to the DLQ without retrying, since the error is permanent"],
      ["با backoff نمایی ۱۰ بار retry کند", "Retry 10 times with exponential backoff"],
      ["پیام را ack کند و بدون لاگ دور بریزد", "Ack and discard it with no logging"],
      ["Consumer را restart کند", "Restart the consumer"],
    ],
    a: [
      "Retry فقط برای خطاهای گذرا مثل timeout یا `503` مفید است. خطاهای دائمی با تکرار درست نمی‌شوند و فقط منابع مصرف می‌کنند، پس باید سریع dead-letter شوند.",
      "Retries only help transient errors like timeouts or `503`. Permanent errors never succeed on retry and just waste resources, so dead-letter them immediately.",
    ],
  },
  {
    id: "mq-m-delayed-messages-sqs",
    level: "middle",
    tags: ["sqs", "delayed-messages"],
    q: [
      "در SQS حداکثر تأخیر قابل تنظیم برای یک پیام با `DelaySeconds` چقدر است؟",
      "In SQS, what's the maximum per-message delay with `DelaySeconds`?",
    ],
    options: [
      ["۱۵ دقیقه", "15 minutes"],
      ["۱۲ ساعت", "12 hours"],
      ["۷ روز", "7 days"],
      ["۶۰ ثانیه", "60 seconds"],
    ],
    a: [
      "SQS حداکثر ۹۰۰ ثانیه تأخیر را پشتیبانی می‌کند. برای زمان‌بندی‌های طولانی‌تر از EventBridge Scheduler، Step Functions یا جدول زمان‌بندی در دیتابیس استفاده کنید.",
      "SQS supports up to 900 seconds of delay. For longer schedules use EventBridge Scheduler, Step Functions, or a schedule table in your database.",
    ],
  },
]);
