import { build } from "../build";

export const messageQueuesJunior = build("message-queues", [
  {
    id: "mq-j-why-async",
    level: "junior",
    tags: ["async", "fundamentals"],
    q: [
      "مهم‌ترین دلیل استفاده از message queue بین دو سرویس چیست؟",
      "What is the main reason to put a message queue between two services?",
    ],
    options: [
      ["جدا کردن (decoupling) تولیدکننده و مصرف‌کننده تا مستقل از هم کار کنند", "Decoupling producer and consumer so they can work independently"],
      ["افزایش سرعت هر درخواست HTTP به‌صورت همگام", "Making each synchronous HTTP request faster"],
      ["حذف کامل نیاز به دیتابیس در سیستم", "Removing the need for a database entirely"],
      ["تضمین اینکه پیام‌ها هرگز تکراری نمی‌شوند", "Guaranteeing that messages are never duplicated"],
    ],
    a: [
      "Queue باعث می‌شود producer لازم نباشد منتظر consumer بماند یا حتی بداند consumer در دسترس است یا نه. این decoupling در زمان و مکان، سیستم را مقاوم‌تر و مقیاس‌پذیرتر می‌کند.",
      "A queue means the producer doesn't wait for the consumer or even need it to be online. This decoupling in time and location makes the system more resilient and scalable.",
    ],
  },
  {
    id: "mq-j-load-leveling",
    level: "junior",
    tags: ["async", "load-leveling"],
    q: [
      "منظور از load leveling در message queue چیست؟",
      "What does load leveling mean in the context of message queues?",
    ],
    options: [
      ["Queue جهش‌های ناگهانی ترافیک را جذب می‌کند و consumerها با نرخ ثابت پردازش می‌کنند", "The queue absorbs traffic spikes so consumers process at a steady rate"],
      ["Queue پیام‌ها را بین چند دیتابیس به‌طور مساوی پخش می‌کند", "The queue spreads messages evenly across several databases"],
      ["Queue پیام‌های بزرگ را به قطعه‌های هم‌اندازه تقسیم می‌کند", "The queue splits large messages into equal-sized chunks"],
      ["Queue اولویت همه پیام‌ها را برابر می‌کند", "The queue makes every message the same priority"],
    ],
    a: [
      "در زمان پیک، پیام‌ها در queue جمع می‌شوند و consumerها با ظرفیت خودشان آن‌ها را برمی‌دارند. این کار از overload شدن سرویس پایین‌دستی جلوگیری می‌کند.",
      "During peaks, messages pile up in the queue and consumers drain them at their own capacity. This prevents the downstream service from being overloaded.",
    ],
  },
  {
    id: "mq-j-sync-vs-async",
    level: "junior",
    tags: ["async", "fundamentals"],
    q: [
      "تفاوت اصلی ارتباط synchronous و asynchronous بین سرویس‌ها چیست؟",
      "What is the key difference between synchronous and asynchronous service communication?",
    ],
    options: [
      ["در sync فرستنده منتظر پاسخ می‌ماند؛ در async پیام را می‌فرستد و ادامه می‌دهد", "In sync the caller waits for a reply; in async it sends a message and moves on"],
      ["Sync فقط روی HTTP کار می‌کند و async فقط روی TCP", "Sync works only over HTTP and async only over TCP"],
      ["Async همیشه سریع‌تر از sync پاسخ نهایی را برمی‌گرداند", "Async always returns the final result faster than sync"],
      ["در sync پیام‌ها ذخیره می‌شوند ولی در async نه", "In sync messages are persisted but in async they are not"],
    ],
    a: [
      "در ارتباط همگام مثل REST، caller تا رسیدن پاسخ block می‌شود و به در دسترس بودن سرویس مقصد وابسته است. در ارتباط ناهمگام پیام از طریق broker ارسال می‌شود و پردازش بعداً انجام می‌شود.",
      "In synchronous calls like REST, the caller blocks until a reply and depends on the callee being up. In asynchronous messaging, the message goes through a broker and is processed later.",
    ],
  },
  {
    id: "mq-j-producer-consumer-broker",
    level: "junior",
    tags: ["fundamentals"],
    q: [
      "در یک سیستم پیام‌رسان، نقش broker چیست؟",
      "In a messaging system, what is the role of the broker?",
    ],
    options: [
      ["دریافت، نگهداری و تحویل پیام‌ها از producer به consumer", "Receiving, storing and delivering messages from producers to consumers"],
      ["تولید پیام‌ها بر اساس رویدادهای دیتابیس", "Generating messages based on database events"],
      ["اجرای منطق تجاری روی هر پیام", "Running business logic on each message"],
      ["رندر کردن نتیجه پردازش برای کاربر نهایی", "Rendering processing results for the end user"],
    ],
    a: [
      "Producer پیام را می‌فرستد، broker (مثل RabbitMQ یا Kafka) آن را نگه می‌دارد و به consumer تحویل می‌دهد. منطق تجاری معمولاً در consumer است نه broker.",
      "The producer sends, the broker (e.g. RabbitMQ or Kafka) stores and delivers, and the consumer processes. Business logic normally lives in the consumer, not the broker.",
    ],
  },
  {
    id: "mq-j-queue-vs-topic",
    level: "junior",
    tags: ["queue", "pub-sub"],
    q: [
      "تفاوت queue و topic در پیام‌رسانی کلاسیک چیست؟",
      "What is the difference between a queue and a topic in classic messaging?",
    ],
    options: [
      ["هر پیام queue به یک consumer می‌رسد؛ پیام topic به همه subscriberها می‌رسد", "A queue message goes to one consumer; a topic message goes to all subscribers"],
      ["Queue فقط پیام متنی می‌پذیرد و topic فقط JSON", "A queue accepts only text and a topic only JSON"],
      ["Topic پیام‌ها را دائمی نگه می‌دارد ولی queue هرگز", "A topic stores messages forever while a queue never stores them"],
      ["Queue برای ارتباط داخلی و topic فقط برای ارتباط با کلاینت است", "Queues are for internal use, topics only for client communication"],
    ],
    a: [
      "Queue مدل point-to-point است و هر پیام فقط توسط یک consumer پردازش می‌شود. Topic مدل publish/subscribe است و یک کپی از پیام به هر subscriber می‌رسد.",
      "A queue is point-to-point: each message is processed by exactly one consumer. A topic is publish/subscribe: every subscriber receives its own copy.",
    ],
  },
  {
    id: "mq-j-pubsub-use",
    level: "junior",
    tags: ["pub-sub"],
    q: [
      "کدام سناریو برای مدل pub/sub مناسب‌تر است؟",
      "Which scenario is the best fit for the pub/sub model?",
    ],
    options: [
      ["رویداد «سفارش ثبت شد» باید به سرویس ایمیل، انبار و آنالیتیکس برسد", "An 'order placed' event must reach email, inventory and analytics services"],
      ["یک کار resize تصویر باید فقط یک بار توسط یک worker انجام شود", "An image resize job must be done exactly once by a single worker"],
      ["یک درخواست login باید فوراً پاسخ بگیرد", "A login request needs an immediate response"],
      ["خواندن یک رکورد از دیتابیس با کلید اصلی", "Reading a single record from the database by primary key"],
    ],
    a: [
      "در pub/sub چند سرویس مستقل به یک رویداد علاقه دارند و هر کدام نسخه خود را دریافت می‌کند. برای کاری که فقط یک worker باید انجامش دهد، queue مناسب‌تر است.",
      "In pub/sub, multiple independent services care about one event and each gets its own copy. For work that one worker should do, a queue is a better fit.",
    ],
  },
  {
    id: "mq-j-background-jobs",
    level: "junior",
    tags: ["background-jobs"],
    q: [
      "چرا ارسال ایمیل خوش‌آمدگویی را معمولاً به یک background job منتقل می‌کنند؟",
      "Why is sending a welcome email usually moved to a background job?",
    ],
    options: [
      ["تا پاسخ ثبت‌نام سریع برگردد و کندی یا خطای SMTP کاربر را معطل نکند", "So signup responds fast and SMTP slowness or failures don't block the user"],
      ["چون ایمیل‌ها در background رمزنگاری قوی‌تری دارند", "Because emails sent in the background get stronger encryption"],
      ["چون Node.js نمی‌تواند در request handler ایمیل بفرستد", "Because Node.js cannot send email inside a request handler"],
      ["تا ایمیل‌ها هرگز به پوشه spam نروند", "So that emails never end up in the spam folder"],
    ],
    a: [
      "کارهای کند یا وابسته به سرویس خارجی نباید در مسیر درخواست کاربر باشند. با قرار دادن job در queue، پاسخ فوری برمی‌گردد و در صورت خطا job قابل retry است.",
      "Slow work or calls to external providers shouldn't sit on the user's request path. Queueing the job returns a fast response and lets the job be retried on failure.",
    ],
  },
  {
    id: "mq-j-image-processing",
    level: "junior",
    tags: ["background-jobs"],
    q: [
      "کاربر عکسی آپلود می‌کند که باید به چند سایز thumbnail تبدیل شود. بهترین رویکرد چیست؟",
      "A user uploads a photo that must be resized into several thumbnails. What's the best approach?",
    ],
    options: [
      ["ذخیره فایل، قرار دادن یک job در queue و پردازش توسط worker", "Store the file, enqueue a job, and let a worker process it"],
      ["Resize همه سایزها در همان request قبل از پاسخ دادن", "Resize every size inside the same request before responding"],
      ["ارسال عکس خام به مرورگر و resize در سمت کلاینت برای همه", "Send the raw image to every browser and resize client-side"],
      ["نگه داشتن connection تا وقتی CPU آزاد شود", "Hold the connection open until the CPU becomes free"],
    ],
    a: [
      "پردازش تصویر CPU-bound و کند است و نباید request را block کند. Worker جداگانه می‌تواند مستقل scale شود و در صورت خطا job را دوباره اجرا کند.",
      "Image processing is CPU-heavy and slow, so it shouldn't block the request. A separate worker can scale independently and retry the job if it fails.",
    ],
  },
  {
    id: "mq-j-bullmq-what",
    level: "junior",
    tags: ["bullmq", "nodejs"],
    q: [
      "BullMQ در اکوسیستم Node.js چیست و به چه چیزی وابسته است؟",
      "What is BullMQ in the Node.js ecosystem and what does it rely on?",
    ],
    options: [
      ["یک کتابخانه job queue که روی Redis ساخته شده است", "A job queue library built on top of Redis"],
      ["یک broker مستقل که جایگزین Kafka می‌شود", "A standalone broker that replaces Kafka"],
      ["یک ORM برای ذخیره jobها در PostgreSQL", "An ORM for storing jobs in PostgreSQL"],
      ["ماژول داخلی Node برای اجرای threadها", "A built-in Node module for running threads"],
    ],
    a: [
      "BullMQ از Redis برای نگهداری jobها و وضعیت‌شان استفاده می‌کند و قابلیت‌هایی مثل retry، delay، priority و repeatable jobs دارد. با کلاس‌های `Queue` و `Worker` کار می‌کند.",
      "BullMQ uses Redis to store jobs and their state, and supports retries, delays, priorities and repeatable jobs. You work with its `Queue` and `Worker` classes.",
    ],
  },
  {
    id: "mq-j-bullmq-add",
    level: "junior",
    tags: ["bullmq", "nodejs"],
    q: [
      "در BullMQ کدام فراخوانی یک job جدید به صف اضافه می‌کند؟",
      "In BullMQ, which call adds a new job to a queue?",
    ],
    options: [
      ["`await queue.add('send-email', { to })`", "`await queue.add('send-email', { to })`"],
      ["`await worker.push('send-email', { to })`", "`await worker.push('send-email', { to })`"],
      ["`queue.emit('send-email', { to })`", "`queue.emit('send-email', { to })`"],
      ["`await redis.enqueue('send-email', { to })`", "`await redis.enqueue('send-email', { to })`"],
    ],
    a: [
      "متد `queue.add(name, data, opts)` یک job به صف اضافه می‌کند. یک `Worker` با همان نام صف jobها را برمی‌دارد و processor را اجرا می‌کند.",
      "`queue.add(name, data, opts)` enqueues a job. A `Worker` bound to the same queue name picks jobs up and runs the processor.",
    ],
  },
  {
    id: "mq-j-cron",
    level: "junior",
    tags: ["scheduling", "cron"],
    q: [
      "عبارت cron `0 2 * * *` چه زمانی اجرا می‌شود؟",
      "When does the cron expression `0 2 * * *` run?",
    ],
    options: [
      ["هر روز ساعت ۲:۰۰ بامداد", "Every day at 2:00 AM"],
      ["هر ۲ دقیقه یک بار", "Every 2 minutes"],
      ["هر ۲ ساعت یک بار", "Every 2 hours"],
      ["روز دوم هر ماه نیمه‌شب", "At midnight on the 2nd of every month"],
    ],
    a: [
      "فیلدهای cron به ترتیب دقیقه، ساعت، روز ماه، ماه و روز هفته هستند. `0 2 * * *` یعنی دقیقه ۰ ساعت ۲ هر روز.",
      "Cron fields are minute, hour, day of month, month and day of week. `0 2 * * *` means minute 0 of hour 2, every day.",
    ],
  },
  {
    id: "mq-j-cron-multi-instance",
    level: "junior",
    tags: ["scheduling", "cron"],
    q: [
      "اگر یک cron job داخل اپ Node تعریف شود و اپ روی ۴ instance اجرا شود، چه اتفاقی می‌افتد؟",
      "If a cron job is defined inside a Node app running on 4 instances, what happens?",
    ],
    options: [
      ["Job چهار بار اجرا می‌شود، مگر اینکه از lock یا scheduler مرکزی استفاده شود", "The job runs 4 times unless you use a lock or a central scheduler"],
      ["Node به‌طور خودکار فقط روی یک instance اجرا می‌کند", "Node automatically runs it on only one instance"],
      ["Job اصلاً اجرا نمی‌شود چون تداخل دارد", "The job never runs because of the conflict"],
      ["Job بین ۴ instance تقسیم می‌شود و هر کدام یک‌چهارم را انجام می‌دهد", "The work is split so each instance does a quarter"],
    ],
    a: [
      "هر instance scheduler خودش را دارد و job را اجرا می‌کند. برای جلوگیری از اجرای تکراری از distributed lock، repeatable job در BullMQ یا یک scheduler مرکزی استفاده کنید.",
      "Each instance has its own scheduler and fires the job. Use a distributed lock, BullMQ repeatable jobs, or a central scheduler to avoid duplicate runs.",
    ],
  },
  {
    id: "mq-j-ack",
    level: "junior",
    tags: ["ack", "reliability"],
    q: [
      "Acknowledgement (ack) در message queue چه کاری انجام می‌دهد؟",
      "What does an acknowledgement (ack) do in a message queue?",
    ],
    options: [
      ["به broker می‌گوید پیام با موفقیت پردازش شده و می‌تواند حذفش کند", "Tells the broker the message was processed and can be removed"],
      ["به producer اطلاع می‌دهد که consumer آنلاین است", "Tells the producer that a consumer is online"],
      ["پیام را رمزنگاری می‌کند تا فقط consumer بخواند", "Encrypts the message so only the consumer can read it"],
      ["اولویت پیام را در صف بالا می‌برد", "Raises the message's priority in the queue"],
    ],
    a: [
      "تا وقتی consumer پیام را ack نکند، broker آن را unacked نگه می‌دارد. اگر consumer قبل از ack از کار بیفتد، پیام دوباره تحویل داده می‌شود.",
      "Until the consumer acks, the broker keeps the message as unacknowledged. If the consumer dies before acking, the message is redelivered.",
    ],
  },
  {
    id: "mq-j-auto-ack-risk",
    level: "junior",
    tags: ["ack", "reliability"],
    q: [
      "ریسک اصلی auto-ack (ack خودکار هنگام تحویل) چیست؟",
      "What is the main risk of auto-ack (acknowledging on delivery)?",
    ],
    options: [
      ["اگر consumer وسط پردازش crash کند، پیام از دست می‌رود", "If the consumer crashes mid-processing, the message is lost"],
      ["پیام‌ها همیشه دو بار پردازش می‌شوند", "Messages are always processed twice"],
      ["Broker دیگر پیام جدیدی نمی‌فرستد", "The broker stops sending new messages"],
      ["پیام‌ها به ترتیب معکوس تحویل داده می‌شوند", "Messages are delivered in reverse order"],
    ],
    a: [
      "با auto-ack، broker پیام را بلافاصله پس از ارسال حذف‌شده تلقی می‌کند. اگر پردازش شکست بخورد، راهی برای تحویل مجدد نیست؛ برای کارهای مهم از manual ack بعد از پردازش استفاده کنید.",
      "With auto-ack, the broker considers the message done as soon as it's sent. If processing fails there's no redelivery, so use manual ack after processing for important work.",
    ],
  },
  {
    id: "mq-j-nack",
    level: "junior",
    tags: ["ack", "rabbitmq"],
    q: [
      "در RabbitMQ، `nack` با `requeue: true` چه کاری انجام می‌دهد؟",
      "In RabbitMQ, what does `nack` with `requeue: true` do?",
    ],
    options: [
      ["پیام را به صف برمی‌گرداند تا دوباره تحویل داده شود", "Puts the message back in the queue for redelivery"],
      ["پیام را برای همیشه حذف می‌کند", "Deletes the message permanently"],
      ["پیام را به producer برمی‌گرداند", "Sends the message back to the producer"],
      ["Consumer را از صف جدا می‌کند", "Disconnects the consumer from the queue"],
    ],
    a: [
      "`nack` یعنی پردازش ناموفق بود. با `requeue: true` پیام دوباره در صف قرار می‌گیرد؛ با `requeue: false` حذف یا در صورت تنظیم به dead-letter exchange فرستاده می‌شود.",
      "`nack` signals failed processing. With `requeue: true` the message goes back to the queue; with `requeue: false` it's dropped or dead-lettered if a DLX is configured.",
    ],
  },
  {
    id: "mq-j-retry-why",
    level: "junior",
    tags: ["retry", "reliability"],
    q: [
      "چرا retry برای jobهای پس‌زمینه مهم است؟",
      "Why are retries important for background jobs?",
    ],
    options: [
      ["چون بسیاری از خطاها موقتی‌اند، مثل timeout شبکه یا قطعی کوتاه سرویس", "Because many failures are transient, like network timeouts or brief outages"],
      ["چون هر job حتماً بار اول شکست می‌خورد", "Because every job always fails on the first attempt"],
      ["چون retry باعث می‌شود job سریع‌تر اجرا شود", "Because retrying makes a job run faster"],
      ["چون بدون retry پیام از queue پاک نمی‌شود", "Because without retries a message is never removed from the queue"],
    ],
    a: [
      "خطاهای گذرا با تلاش مجدد اغلب برطرف می‌شوند. ولی retry باید محدود باشد و بعد از چند بار شکست، پیام به DLQ منتقل شود.",
      "Transient errors usually succeed on a later attempt. Retries should be bounded, and after repeated failure the message should go to a DLQ.",
    ],
  },
  {
    id: "mq-j-exp-backoff",
    level: "junior",
    tags: ["retry", "backoff"],
    q: [
      "Exponential backoff در retry یعنی چه؟",
      "What does exponential backoff mean for retries?",
    ],
    options: [
      ["فاصله بین تلاش‌ها هر بار چند برابر می‌شود، مثلاً ۱، ۲، ۴، ۸ ثانیه", "The delay between attempts multiplies each time, e.g. 1, 2, 4, 8 seconds"],
      ["تعداد consumerها با هر شکست دو برابر می‌شود", "The number of consumers doubles after each failure"],
      ["همه تلاش‌ها با فاصله ثابت ۱ ثانیه انجام می‌شوند", "All attempts happen at a fixed 1-second interval"],
      ["پیام بعد از هر شکست به اول صف منتقل می‌شود", "The message moves to the front of the queue after each failure"],
    ],
    a: [
      "افزایش نمایی تأخیر به سرویس خراب فرصت بازیابی می‌دهد و از بمباران آن جلوگیری می‌کند. در BullMQ با `backoff: { type: 'exponential', delay: 1000 }` تنظیم می‌شود.",
      "Growing the delay exponentially gives a failing service time to recover instead of hammering it. In BullMQ it's `backoff: { type: 'exponential', delay: 1000 }`.",
    ],
  },
  {
    id: "mq-j-jitter",
    level: "junior",
    tags: ["retry", "backoff"],
    q: [
      "چرا به exponential backoff مقداری jitter (تصادفی) اضافه می‌کنند؟",
      "Why add jitter (randomness) to exponential backoff?",
    ],
    options: [
      ["تا retryهای همزمان کلاینت‌ها پخش شوند و موج هم‌زمان (thundering herd) ایجاد نشود", "To spread out clients' retries and avoid a synchronized thundering herd"],
      ["تا ترتیب پیام‌ها تصادفی شود و امنیت بیشتر شود", "To randomize message order for better security"],
      ["تا تعداد کل retryها کاهش یابد", "To reduce the total number of retries"],
      ["تا پیام‌ها سریع‌تر به DLQ برسند", "To get messages to the DLQ faster"],
    ],
    a: [
      "اگر هزاران job هم‌زمان شکست بخورند و با همان فاصله retry کنند، دوباره هم‌زمان به سرویس فشار می‌آورند. Jitter زمان‌ها را پخش می‌کند.",
      "If thousands of jobs fail together and retry on the same schedule, they hit the service in sync again. Jitter spreads the retry times out.",
    ],
  },
  {
    id: "mq-j-dlq",
    level: "junior",
    tags: ["dlq", "reliability"],
    q: [
      "Dead-letter queue (DLQ) چیست؟",
      "What is a dead-letter queue (DLQ)?",
    ],
    options: [
      ["صفی برای پیام‌هایی که بعد از چند تلاش پردازش نشدند یا رد شدند", "A queue for messages that failed processing after retries or were rejected"],
      ["صفی برای پیام‌هایی که هنوز producer آن‌ها را نفرستاده", "A queue for messages the producer hasn't sent yet"],
      ["صفی که پیام‌هایش بلافاصله حذف می‌شوند", "A queue whose messages are deleted immediately"],
      ["صف اصلی با بالاترین اولویت", "The main queue with the highest priority"],
    ],
    a: [
      "DLQ پیام‌های مشکل‌دار را از صف اصلی جدا می‌کند تا جلوی پردازش بقیه را نگیرند. بعداً می‌توان آن‌ها را بررسی، اصلاح و دوباره پردازش (redrive) کرد.",
      "A DLQ isolates problem messages so they don't block the main queue. They can later be inspected, fixed and redriven.",
    ],
  },
  {
    id: "mq-j-poison-message",
    level: "junior",
    tags: ["dlq", "poison-message"],
    q: [
      "Poison message چیست؟",
      "What is a poison message?",
    ],
    options: [
      ["پیامی که هر بار پردازشش شکست می‌خورد، مثلاً به‌خاطر داده نامعتبر", "A message that fails every time it's processed, e.g. due to invalid data"],
      ["پیامی که حاوی کد مخرب برای هک broker است", "A message containing malware that hacks the broker"],
      ["پیامی که TTL آن تمام شده است", "A message whose TTL has expired"],
      ["پیامی که هیچ consumerی برایش وجود ندارد", "A message that has no consumers"],
    ],
    a: [
      "Poison message با retry درست نمی‌شود و اگر بی‌نهایت requeue شود، consumer را در حلقه نگه می‌دارد. راه‌حل محدود کردن تعداد تلاش و انتقال به DLQ است.",
      "A poison message never succeeds on retry, and infinite requeueing traps consumers in a loop. The fix is a max-attempts limit followed by moving it to a DLQ.",
    ],
  },
  {
    id: "mq-j-competing-consumers",
    level: "junior",
    tags: ["scaling", "consumers"],
    q: [
      "الگوی competing consumers چیست؟",
      "What is the competing consumers pattern?",
    ],
    options: [
      ["چند consumer از یک صف می‌خوانند و هر پیام فقط به یکی از آن‌ها می‌رسد", "Several consumers read one queue and each message goes to only one of them"],
      ["هر consumer یک کپی از همه پیام‌ها دریافت می‌کند", "Every consumer receives a copy of every message"],
      ["Consumerها برای گرفتن lock دیتابیس رقابت می‌کنند", "Consumers compete for a database lock"],
      ["فقط سریع‌ترین consumer پیام را می‌گیرد و بقیه خاموش می‌شوند", "Only the fastest consumer gets messages and the rest shut down"],
    ],
    a: [
      "با اضافه کردن consumer به یک صف، توان پردازش به‌صورت افقی بالا می‌رود. Broker پیام‌ها را بین آن‌ها پخش می‌کند، ولی ترتیب پردازش دیگر تضمین‌شده نیست.",
      "Adding consumers to one queue scales throughput horizontally. The broker distributes messages among them, though processing order is no longer guaranteed.",
    ],
  },
  {
    id: "mq-j-rabbitmq-exchange",
    level: "junior",
    tags: ["rabbitmq"],
    q: [
      "در RabbitMQ، producer پیام را مستقیماً به کجا می‌فرستد؟",
      "In RabbitMQ, where does a producer actually publish messages?",
    ],
    options: [
      ["به یک exchange که بر اساس binding پیام را به صف‌ها route می‌کند", "To an exchange, which routes messages to queues via bindings"],
      ["مستقیماً به consumer", "Directly to the consumer"],
      ["به یک partition مثل Kafka", "To a partition, like Kafka"],
      ["به فایل log روی دیسک consumer", "To a log file on the consumer's disk"],
    ],
    a: [
      "در مدل AMQP، producer به exchange منتشر می‌کند و exchange با توجه به نوع خود و bindingها پیام را به صف‌ها می‌فرستد. حتی ارسال «مستقیم به صف» از default exchange عبور می‌کند.",
      "In AMQP, producers publish to an exchange, which routes to queues based on its type and bindings. Even 'publishing to a queue' actually goes through the default exchange.",
    ],
  },
  {
    id: "mq-j-fanout",
    level: "junior",
    tags: ["rabbitmq", "exchanges"],
    q: [
      "Exchange از نوع `fanout` در RabbitMQ چگونه رفتار می‌کند؟",
      "How does a `fanout` exchange behave in RabbitMQ?",
    ],
    options: [
      ["پیام را به همه صف‌های bind‌شده می‌فرستد و routing key را نادیده می‌گیرد", "Sends the message to all bound queues, ignoring the routing key"],
      ["پیام را فقط به صفی با routing key دقیقاً برابر می‌فرستد", "Sends only to the queue whose routing key matches exactly"],
      ["پیام را بر اساس header‌ها route می‌کند", "Routes messages based on headers"],
      ["پیام را به‌صورت round-robin فقط به یک صف می‌فرستد", "Sends each message round-robin to just one queue"],
    ],
    a: [
      "Fanout یک broadcast ساده است: هر صفی که به آن bind شده باشد، کپی پیام را می‌گیرد. برای پیاده‌سازی pub/sub مناسب است.",
      "Fanout is a plain broadcast: every bound queue gets a copy. It's the natural way to implement pub/sub.",
    ],
  },
  {
    id: "mq-j-direct-exchange",
    level: "junior",
    tags: ["rabbitmq", "exchanges"],
    q: [
      "Exchange از نوع `direct` پیام را به کدام صف‌ها می‌فرستد؟",
      "Which queues does a `direct` exchange route a message to?",
    ],
    options: [
      ["صف‌هایی که binding key آن‌ها دقیقاً برابر routing key پیام است", "Queues whose binding key exactly equals the message's routing key"],
      ["همه صف‌های bind‌شده بدون توجه به key", "All bound queues regardless of key"],
      ["صف‌هایی که binding آن‌ها با الگوی wildcard مطابقت دارد", "Queues whose binding matches a wildcard pattern"],
      ["فقط صفی که کمترین پیام را دارد", "Only the queue with the fewest messages"],
    ],
    a: [
      "Direct exchange مقایسه دقیق رشته‌ای بین routing key و binding key انجام می‌دهد. مثلاً پیام با key `error` فقط به صف‌هایی می‌رود که با `error` bind شده‌اند.",
      "A direct exchange does an exact string match between routing key and binding key. A message with key `error` only reaches queues bound with `error`.",
    ],
  },
  {
    id: "mq-j-durable-queue",
    level: "junior",
    tags: ["rabbitmq", "durability"],
    q: [
      "در RabbitMQ، `durable: true` برای یک صف چه تضمینی می‌دهد؟",
      "In RabbitMQ, what does `durable: true` on a queue guarantee?",
    ],
    options: [
      ["تعریف صف بعد از restart شدن broker باقی می‌ماند", "The queue definition survives a broker restart"],
      ["همه پیام‌ها به‌طور خودکار روی دیسک ذخیره می‌شوند", "All messages are automatically stored on disk"],
      ["پیام‌ها هرگز منقضی نمی‌شوند", "Messages never expire"],
      ["صف روی چند node کپی می‌شود", "The queue is replicated across nodes"],
    ],
    a: [
      "Durable فقط خود صف را حفظ می‌کند. برای اینکه پیام‌ها هم بعد از restart بمانند، باید با `persistent: true` (delivery mode 2) منتشر شوند.",
      "Durable only preserves the queue itself. For messages to survive a restart too, they must be published as `persistent: true` (delivery mode 2).",
    ],
  },
  {
    id: "mq-j-kafka-topic-partition",
    level: "junior",
    tags: ["kafka"],
    q: [
      "در Kafka، partition چیست؟",
      "In Kafka, what is a partition?",
    ],
    options: [
      ["یک log مرتب و فقط‌افزودنی که بخشی از پیام‌های یک topic را نگه می‌دارد", "An ordered, append-only log holding part of a topic's messages"],
      ["یک نسخه پشتیبان از کل cluster", "A backup copy of the whole cluster"],
      ["یک گروه از consumerها با نام مشترک", "A group of consumers sharing a name"],
      ["یک صف موقت که پس از خواندن خالی می‌شود", "A temporary queue that empties once read"],
    ],
    a: [
      "هر topic به یک یا چند partition تقسیم می‌شود و هر partition یک log مرتب است. Partitionها واحد موازی‌سازی و توزیع داده بین brokerها هستند.",
      "Each topic is split into one or more partitions, each an ordered log. Partitions are the unit of parallelism and of data distribution across brokers.",
    ],
  },
  {
    id: "mq-j-kafka-offset",
    level: "junior",
    tags: ["kafka"],
    q: [
      "Offset در Kafka چیست؟",
      "What is an offset in Kafka?",
    ],
    options: [
      ["شماره ترتیبی هر پیام درون یک partition", "The sequential position of a message within a partition"],
      ["فاصله زمانی بین تولید و مصرف پیام", "The time between producing and consuming a message"],
      ["شناسه یکتای سراسری هر پیام در کل cluster", "A globally unique ID for a message across the cluster"],
      ["اندازه پیام به بایت", "The size of the message in bytes"],
    ],
    a: [
      "هر پیام در یک partition یک offset افزایشی دارد. Consumer با commit کردن offset مشخص می‌کند تا کجا خوانده است؛ offset فقط درون همان partition یکتاست.",
      "Each message in a partition gets an increasing offset. Consumers commit offsets to record progress; an offset is only unique within its partition.",
    ],
  },
  {
    id: "mq-j-kafka-consumer-group",
    level: "junior",
    tags: ["kafka", "consumer-groups"],
    q: [
      "در Kafka، consumerهایی که در یک consumer group هستند چگونه پیام‌ها را تقسیم می‌کنند؟",
      "In Kafka, how do consumers in the same consumer group share messages?",
    ],
    options: [
      ["هر partition در هر لحظه فقط به یک consumer از گروه اختصاص دارد", "Each partition is assigned to only one consumer in the group at a time"],
      ["همه consumerهای گروه همه پیام‌ها را دریافت می‌کنند", "Every consumer in the group receives every message"],
      ["پیام‌ها به‌صورت تصادفی بین consumerها پخش می‌شوند", "Messages are spread randomly across consumers"],
      ["فقط consumer اول گروه پیام می‌گیرد", "Only the first consumer in the group gets messages"],
    ],
    a: [
      "Kafka partitionها را بین اعضای گروه تقسیم می‌کند، پس گروه مثل یک queue رفتار می‌کند. گروه‌های مختلف هر کدام همه پیام‌ها را مستقل می‌خوانند (pub/sub).",
      "Kafka splits partitions among group members, so a group acts like a queue. Different groups each read all messages independently, which gives pub/sub.",
    ],
  },
  {
    id: "mq-j-kafka-more-consumers",
    level: "junior",
    tags: ["kafka", "consumer-groups"],
    q: [
      "Topic دارای ۳ partition است و ۵ consumer در یک گروه دارید. چه اتفاقی می‌افتد؟",
      "A topic has 3 partitions and your group has 5 consumers. What happens?",
    ],
    options: [
      ["۳ consumer فعال‌اند و ۲ تا بیکار می‌مانند", "3 consumers are active and 2 sit idle"],
      ["هر ۵ consumer پیام دریافت می‌کنند", "All 5 consumers receive messages"],
      ["Kafka خودکار ۲ partition جدید می‌سازد", "Kafka automatically creates 2 more partitions"],
      ["گروه خطا می‌دهد و هیچ پیامی مصرف نمی‌شود", "The group errors and nothing is consumed"],
    ],
    a: [
      "حداکثر موازی‌سازی یک گروه برابر تعداد partitionهاست. Consumerهای اضافه بیکار می‌مانند ولی اگر یکی از فعال‌ها از کار بیفتد جایش را می‌گیرند.",
      "A group's max parallelism equals the partition count. Extra consumers sit idle but can take over if an active one fails.",
    ],
  },
  {
    id: "mq-j-kafka-retention",
    level: "junior",
    tags: ["kafka", "retention"],
    q: [
      "تفاوت مهم Kafka با یک queue سنتی مثل RabbitMQ در مورد پیام‌های مصرف‌شده چیست؟",
      "What's a key difference between Kafka and a traditional queue like RabbitMQ regarding consumed messages?",
    ],
    options: [
      ["Kafka پیام‌ها را تا پایان retention نگه می‌دارد، حتی بعد از مصرف", "Kafka keeps messages until retention expires, even after consumption"],
      ["Kafka پیام را بلافاصله پس از اولین خواندن حذف می‌کند", "Kafka deletes a message right after the first read"],
      ["Kafka اصلاً پیام‌ها را روی دیسک ذخیره نمی‌کند", "Kafka doesn't store messages on disk at all"],
      ["Kafka فقط آخرین پیام هر topic را نگه می‌دارد", "Kafka keeps only the latest message per topic"],
    ],
    a: [
      "در RabbitMQ پیام بعد از ack حذف می‌شود، اما Kafka یک log ماندگار است و پیام‌ها بر اساس زمان یا حجم (`retention.ms`) نگه داشته می‌شوند. این امکان replay را فراهم می‌کند.",
      "RabbitMQ deletes a message after ack, but Kafka is a durable log that retains messages by time or size (`retention.ms`). That makes replay possible.",
    ],
  },
  {
    id: "mq-j-kafka-replay",
    level: "junior",
    tags: ["kafka", "offsets"],
    q: [
      "چگونه می‌توان در Kafka پیام‌های قدیمی را دوباره پردازش کرد؟",
      "How can you reprocess old messages in Kafka?",
    ],
    options: [
      ["با reset کردن offset گروه consumer به یک نقطه قبلی", "By resetting the consumer group's offset to an earlier point"],
      ["با ارسال دوباره پیام‌ها از سمت producer؛ راه دیگری نیست", "By having the producer resend them; there's no other way"],
      ["با restart کردن broker", "By restarting the broker"],
      ["Kafka اجازه پردازش مجدد نمی‌دهد", "Kafka doesn't allow reprocessing"],
    ],
    a: [
      "چون پیام‌ها تا retention باقی می‌مانند، می‌توان offset را با `kafka-consumer-groups --reset-offsets` یا `seek()` عقب برد. این برای رفع باگ یا ساخت projection جدید مفید است.",
      "Since messages remain until retention, you can move the offset back with `kafka-consumer-groups --reset-offsets` or `seek()`. Useful for bug fixes or building new projections.",
    ],
  },
  {
    id: "mq-j-auto-offset-reset",
    level: "junior",
    tags: ["kafka", "offsets"],
    q: [
      "تنظیم `auto.offset.reset=earliest` در consumer جدید Kafka چه اثری دارد؟",
      "What does `auto.offset.reset=earliest` do for a new Kafka consumer group?",
    ],
    options: [
      ["وقتی offset commit‌شده‌ای نیست، از قدیمی‌ترین پیام موجود شروع می‌کند", "With no committed offset, it starts from the oldest available message"],
      ["همیشه هر بار از اول topic شروع می‌کند، حتی با offset commit‌شده", "It always restarts from the beginning, even with committed offsets"],
      ["فقط پیام‌های جدید بعد از اتصال را می‌خواند", "It reads only messages produced after it connects"],
      ["Offset را هر ثانیه خودکار commit می‌کند", "It auto-commits offsets every second"],
    ],
    a: [
      "این تنظیم فقط وقتی اعمال می‌شود که گروه offset معتبری ندارد. مقدار `latest` (پیش‌فرض) از انتهای log شروع می‌کند و پیام‌های قبلی را نمی‌خواند.",
      "It only applies when the group has no valid committed offset. The default `latest` starts at the end of the log and skips existing messages.",
    ],
  },
  {
    id: "mq-j-partition-key",
    level: "junior",
    tags: ["kafka", "ordering"],
    q: [
      "در Kafka، اگر همه پیام‌های یک سفارش با key یکسان (`orderId`) ارسال شوند، چه فایده‌ای دارد؟",
      "In Kafka, what's the benefit of sending all messages for an order with the same key (`orderId`)?",
    ],
    options: [
      ["همه به یک partition می‌روند و ترتیب‌شان برای آن سفارش حفظ می‌شود", "They land in the same partition, preserving their order for that order"],
      ["پیام‌ها فشرده‌تر ذخیره می‌شوند", "The messages are stored more compactly"],
      ["پیام‌ها بین همه partitionها پخش می‌شوند تا سریع‌تر باشند", "They're spread across all partitions for speed"],
      ["Kafka پیام‌های تکراری با key یکسان را رد می‌کند", "Kafka rejects duplicate messages with the same key"],
    ],
    a: [
      "Partitioner پیش‌فرض با hash کردن key، partition را تعیین می‌کند. Kafka فقط ترتیب درون یک partition را تضمین می‌کند، پس key یکسان یعنی ترتیب حفظ‌شده برای آن موجودیت.",
      "The default partitioner hashes the key to choose a partition. Kafka only guarantees order within a partition, so the same key means preserved order for that entity.",
    ],
  },
  {
    id: "mq-j-sqs-what",
    level: "junior",
    tags: ["sqs", "aws"],
    q: [
      "Amazon SQS چیست؟",
      "What is Amazon SQS?",
    ],
    options: [
      ["سرویس صف پیام کاملاً مدیریت‌شده AWS", "AWS's fully managed message queue service"],
      ["دیتابیس رابطه‌ای مدیریت‌شده AWS", "AWS's managed relational database"],
      ["سرویس ارسال push notification موبایل", "A mobile push notification service"],
      ["نسخه مدیریت‌شده Kafka در AWS", "AWS's managed Kafka offering"],
    ],
    a: [
      "SQS یک صف point-to-point مدیریت‌شده است که نیازی به نگهداری سرور ندارد. دو نوع Standard و FIFO دارد؛ نسخه مدیریت‌شده Kafka در AWS، سرویس MSK است.",
      "SQS is a managed point-to-point queue with no servers to run. It comes in Standard and FIFO types; AWS's managed Kafka is MSK.",
    ],
  },
  {
    id: "mq-j-visibility-timeout",
    level: "junior",
    tags: ["sqs", "aws"],
    q: [
      "Visibility timeout در SQS چیست؟",
      "What is the visibility timeout in SQS?",
    ],
    options: [
      ["مدتی که پیام دریافت‌شده از دید بقیه consumerها پنهان می‌ماند تا پردازش و حذف شود", "How long a received message stays hidden from other consumers while it's processed"],
      ["حداکثر مدتی که پیام در صف نگه داشته می‌شود", "The maximum time a message is retained in the queue"],
      ["زمانی که producer منتظر تأیید ارسال می‌ماند", "How long the producer waits for a send confirmation"],
      ["تأخیر قبل از اینکه پیام جدید قابل مشاهده شود", "The delay before a newly sent message becomes visible"],
    ],
    a: [
      "بعد از `ReceiveMessage`، پیام برای مدت visibility timeout مخفی می‌شود. اگر consumer آن را با `DeleteMessage` حذف نکند، پیام دوباره قابل مشاهده و تحویل می‌شود.",
      "After `ReceiveMessage`, the message is hidden for the visibility timeout. If the consumer doesn't call `DeleteMessage` in time, it becomes visible and is delivered again.",
    ],
  },
  {
    id: "mq-j-sqs-standard-vs-fifo",
    level: "junior",
    tags: ["sqs", "aws", "ordering"],
    q: [
      "تفاوت اصلی صف Standard و FIFO در SQS چیست؟",
      "What's the main difference between SQS Standard and FIFO queues?",
    ],
    options: [
      ["FIFO ترتیب و پردازش بدون تکرار را تضمین می‌کند؛ Standard ممکن است تکراری یا نامرتب باشد", "FIFO guarantees order and no duplicates; Standard may duplicate or reorder"],
      ["Standard ترتیب را تضمین می‌کند ولی FIFO نه", "Standard guarantees order but FIFO doesn't"],
      ["FIFO پیام‌ها را رایگان نگه می‌دارد", "FIFO stores messages for free"],
      ["Standard فقط در یک region و FIFO در همه regionها کار می‌کند", "Standard works in one region and FIFO globally"],
    ],
    a: [
      "Standard توان عملیاتی تقریباً نامحدود با تحویل at-least-once و ترتیب best-effort دارد. FIFO ترتیب درون message group و dedup را ارائه می‌دهد ولی throughput محدودتری دارد.",
      "Standard offers near-unlimited throughput with at-least-once delivery and best-effort ordering. FIFO provides per-message-group ordering and dedup, with lower throughput.",
    ],
  },
  {
    id: "mq-j-sns-fanout",
    level: "junior",
    tags: ["sns", "aws", "pub-sub"],
    q: [
      "الگوی SNS + SQS fan-out چگونه کار می‌کند؟",
      "How does the SNS + SQS fan-out pattern work?",
    ],
    options: [
      ["پیام به یک topic در SNS منتشر می‌شود و هر صف SQS مشترک یک کپی دریافت می‌کند", "A message is published to an SNS topic and each subscribed SQS queue gets a copy"],
      ["SQS پیام‌ها را بین چند topic در SNS تقسیم می‌کند", "SQS splits messages across several SNS topics"],
      ["SNS پیام‌ها را از چند صف SQS جمع می‌کند و یکی می‌کند", "SNS merges messages from several SQS queues into one"],
      ["SNS فقط پیام‌ها را رمزنگاری می‌کند و SQS ارسال می‌کند", "SNS only encrypts messages and SQS delivers them"],
    ],
    a: [
      "SNS یک سرویس pub/sub است و SQS یک صف بادوام. ترکیبشان باعث می‌شود هر سرویس صف مستقل خودش را داشته باشد و با سرعت خودش پیام‌ها را مصرف کند.",
      "SNS is pub/sub and SQS is a durable queue. Combining them gives each service its own independent queue that it can drain at its own pace.",
    ],
  },
  {
    id: "mq-j-at-most-once",
    level: "junior",
    tags: ["delivery-semantics"],
    q: [
      "Delivery semantics از نوع at-most-once یعنی چه؟",
      "What does at-most-once delivery mean?",
    ],
    options: [
      ["هر پیام صفر یا یک بار تحویل می‌شود؛ ممکن است گم شود ولی تکرار نمی‌شود", "Each message is delivered zero or one time; it may be lost but never duplicated"],
      ["هر پیام حداقل یک بار تحویل می‌شود و ممکن است تکرار شود", "Each message is delivered at least once and may be duplicated"],
      ["هر پیام دقیقاً یک بار تحویل و پردازش می‌شود", "Each message is delivered and processed exactly once"],
      ["هر پیام حداکثر به یک consumer group می‌رسد", "Each message reaches at most one consumer group"],
    ],
    a: [
      "در at-most-once، پیام قبل از پردازش ack یا commit می‌شود، پس اگر پردازش شکست بخورد پیام از دست می‌رود. برای داده‌هایی مثل متریک‌های کم‌اهمیت قابل قبول است.",
      "With at-most-once, the message is acked or committed before processing, so a failure loses it. Acceptable for things like low-value metrics.",
    ],
  },
  {
    id: "mq-j-at-least-once",
    level: "junior",
    tags: ["delivery-semantics"],
    q: [
      "در تحویل at-least-once، consumer باید برای چه چیزی آماده باشد؟",
      "With at-least-once delivery, what must the consumer be prepared for?",
    ],
    options: [
      ["دریافت پیام تکراری", "Receiving duplicate messages"],
      ["از دست رفتن پیام‌ها", "Losing messages"],
      ["دریافت پیام‌های ناقص و بریده", "Receiving truncated messages"],
      ["اینکه broker هرگز پیام را دوباره نفرستد", "The broker never redelivering anything"],
    ],
    a: [
      "در at-least-once پیام فقط بعد از پردازش ack می‌شود؛ اگر consumer بعد از پردازش و قبل از ack از کار بیفتد، پیام دوباره می‌آید. پس consumer باید idempotent باشد.",
      "At-least-once acks only after processing; if the consumer dies between processing and ack, the message comes again. So the consumer must be idempotent.",
    ],
  },
  {
    id: "mq-j-idempotent-meaning",
    level: "junior",
    tags: ["idempotency"],
    q: [
      "یک consumer «idempotent» یعنی چه؟",
      "What does it mean for a consumer to be idempotent?",
    ],
    options: [
      ["پردازش چندباره یک پیام همان نتیجه پردازش یک‌باره را دارد", "Processing the same message multiple times has the same effect as once"],
      ["Consumer هر پیام را فقط یک بار از broker دریافت می‌کند", "The consumer only ever receives each message once"],
      ["Consumer هیچ state یا دیتابیسی ندارد", "The consumer has no state or database"],
      ["Consumer پیام‌ها را به ترتیب دقیق پردازش می‌کند", "The consumer processes messages in exact order"],
    ],
    a: [
      "Idempotency یعنی تکرار عملیات اثر اضافه ندارد؛ مثلاً `SET status='paid'` idempotent است ولی `balance = balance + 10` نیست. این ویژگی پایه امن بودن at-least-once است.",
      "Idempotency means repeating the operation has no extra effect: `SET status='paid'` is idempotent, `balance = balance + 10` is not. It's what makes at-least-once safe.",
    ],
  },
  {
    id: "mq-j-dedup-key",
    level: "junior",
    tags: ["idempotency", "dedup"],
    q: [
      "ساده‌ترین روش برای جلوگیری از پردازش تکراری یک پیام پرداخت چیست؟",
      "What's the simplest way to avoid processing a payment message twice?",
    ],
    options: [
      ["ذخیره شناسه یکتای پیام (dedup key) و رد کردن پیام‌هایی که قبلاً دیده شده‌اند", "Store a unique message ID (dedup key) and skip ones already seen"],
      ["استفاده از auto-ack تا پیام دوباره نیاید", "Use auto-ack so the message never comes back"],
      ["افزایش تعداد consumerها", "Increase the number of consumers"],
      ["کاهش visibility timeout به صفر", "Set the visibility timeout to zero"],
    ],
    a: [
      "Consumer قبل از اثرگذاری، شناسه پیام را در جدولی با unique constraint ثبت می‌کند. اگر درج به‌خاطر تکراری بودن شکست خورد، پیام قبلاً پردازش شده و فقط ack می‌شود.",
      "Before applying side effects, the consumer records the message ID in a table with a unique constraint. If the insert fails as a duplicate, it was already processed, so just ack it.",
    ],
  },
  {
    id: "mq-j-ordering-basic",
    level: "junior",
    tags: ["ordering"],
    q: [
      "چرا با چند consumer روی یک صف، ترتیب پردازش پیام‌ها تضمین نمی‌شود؟",
      "Why isn't processing order guaranteed with multiple consumers on one queue?",
    ],
    options: [
      ["چون consumerها موازی کار می‌کنند و ممکن است پیام بعدی زودتر تمام شود", "Because consumers run in parallel and a later message may finish first"],
      ["چون broker پیام‌ها را عمداً به‌هم می‌ریزد", "Because the broker deliberately shuffles messages"],
      ["چون صف‌ها فقط LIFO هستند", "Because queues are always LIFO"],
      ["چون هر consumer پیام‌ها را از آخر صف می‌خواند", "Because each consumer reads from the end of the queue"],
    ],
    a: [
      "حتی اگر broker به ترتیب تحویل دهد، پردازش موازی و retry باعث می‌شود پایان کارها نامرتب باشد. برای ترتیب، پیام‌های مرتبط باید به یک consumer یا partition برسند.",
      "Even if the broker delivers in order, parallel processing and retries make completion order vary. For ordering, related messages must go to one consumer or partition.",
    ],
  },
  {
    id: "mq-j-prefetch",
    level: "junior",
    tags: ["rabbitmq", "prefetch"],
    q: [
      "در RabbitMQ، `channel.prefetch(1)` چه اثری دارد؟",
      "In RabbitMQ, what does `channel.prefetch(1)` do?",
    ],
    options: [
      ["Consumer در هر لحظه حداکثر یک پیام unacked دریافت می‌کند", "The consumer gets at most one unacknowledged message at a time"],
      ["صف فقط یک پیام را در خود نگه می‌دارد", "The queue holds only one message"],
      ["Consumer هر ثانیه یک پیام می‌خواند", "The consumer reads one message per second"],
      ["فقط یک consumer می‌تواند به صف وصل شود", "Only one consumer can connect to the queue"],
    ],
    a: [
      "Prefetch (QoS) تعداد پیام‌های تحویل‌داده‌شده ولی ack‌نشده را محدود می‌کند. بدون آن RabbitMQ ممکن است پیام‌های زیادی را به یک consumer کند بدهد و توزیع کار نامتعادل شود.",
      "Prefetch (QoS) caps how many delivered-but-unacked messages a consumer holds. Without it RabbitMQ may push many messages to a slow consumer and unbalance the work.",
    ],
  },
  {
    id: "mq-j-event-driven",
    level: "junior",
    tags: ["event-driven"],
    q: [
      "در معماری event-driven، یک «event» معمولاً چه چیزی را بیان می‌کند؟",
      "In event-driven architecture, what does an 'event' usually represent?",
    ],
    options: [
      ["واقعیتی که در گذشته رخ داده، مثل `OrderPlaced`", "A fact that already happened, like `OrderPlaced`"],
      ["دستوری برای انجام کار، مثل `SendEmailNow`", "An instruction to do something, like `SendEmailNow`"],
      ["یک درخواست همگام که منتظر پاسخ است", "A synchronous request awaiting a response"],
      ["یک خطای سیستمی که باید لاگ شود", "A system error that must be logged"],
    ],
    a: [
      "Event با فعل گذشته نام‌گذاری می‌شود و صادرکننده نمی‌داند چه کسی به آن واکنش نشان می‌دهد. Command برعکس یک دستور خطاب به گیرنده مشخص است.",
      "Events are named in past tense and the publisher doesn't know who reacts. A command, by contrast, is an instruction addressed to a specific receiver.",
    ],
  },
  {
    id: "mq-j-queue-depth",
    level: "junior",
    tags: ["monitoring"],
    q: [
      "اگر تعداد پیام‌های داخل صف (queue depth) مدام در حال افزایش باشد، معمولاً نشانه چیست؟",
      "If queue depth keeps growing steadily, what does it usually indicate?",
    ],
    options: [
      ["Consumerها کندتر از نرخ تولید پیام هستند یا از کار افتاده‌اند", "Consumers are slower than the produce rate or have stopped"],
      ["Producer پیام‌ها را خیلی کند می‌فرستد", "The producer is sending messages too slowly"],
      ["سیستم در حالت ایده‌آل کار می‌کند", "The system is working ideally"],
      ["Broker پیام‌ها را فشرده می‌کند", "The broker is compressing messages"],
    ],
    a: [
      "رشد مداوم backlog یعنی ظرفیت مصرف کمتر از تولید است. باید علت را بررسی کرد (خطا، کندی وابستگی‌ها) و در صورت نیاز consumer اضافه کرد؛ روی این متریک alert بگذارید.",
      "A steadily growing backlog means consumption capacity is below production. Investigate errors or slow dependencies, scale consumers if needed, and alert on this metric.",
    ],
  },
  {
    id: "mq-j-delayed-job",
    level: "junior",
    tags: ["bullmq", "scheduling"],
    q: [
      "در BullMQ چگونه یک job را طوری اضافه می‌کنید که ۱۰ دقیقه بعد اجرا شود؟",
      "In BullMQ, how do you add a job that should run 10 minutes later?",
    ],
    options: [
      ["`queue.add('remind', data, { delay: 10 * 60 * 1000 })`", "`queue.add('remind', data, { delay: 10 * 60 * 1000 })`"],
      ["`queue.add('remind', data, { timeout: 600 })`", "`queue.add('remind', data, { timeout: 600 })`"],
      ["`setTimeout(() => queue.add('remind', data), 600)`", "`setTimeout(() => queue.add('remind', data), 600)`"],
      ["`queue.add('remind', data, { priority: 10 })`", "`queue.add('remind', data, { priority: 10 })`"],
    ],
    a: [
      "گزینه `delay` بر حسب میلی‌ثانیه است و job تا آن زمان در حالت delayed در Redis می‌ماند. استفاده از `setTimeout` درون پروسس با restart شدن از بین می‌رود.",
      "The `delay` option is in milliseconds and the job waits in Redis in the delayed state. An in-process `setTimeout` is lost if the process restarts.",
    ],
  },
  {
    id: "mq-j-priority-queue",
    level: "junior",
    tags: ["priority"],
    q: [
      "Priority queue در سیستم job چه کاربردی دارد؟",
      "What is a priority queue used for in a job system?",
    ],
    options: [
      ["Jobهای مهم‌تر (مثل ایمیل reset رمز) زودتر از jobهای کم‌اهمیت پردازش شوند", "Important jobs (like password reset emails) get processed before low-priority ones"],
      ["Jobها بر اساس اندازه‌شان مرتب شوند", "Jobs are sorted by their size"],
      ["هر job فقط یک بار اجرا شود", "Each job runs exactly once"],
      ["Jobهای قدیمی‌تر حذف شوند", "Older jobs are deleted"],
    ],
    a: [
      "با priority، پیام‌های فوری پشت انبوه کارهای کم‌اهمیت مثل newsletter گیر نمی‌کنند. گزینه دیگر استفاده از صف‌های جداگانه با worker اختصاصی است.",
      "Priorities keep urgent messages from waiting behind bulk low-value work like newsletters. An alternative is separate queues with dedicated workers.",
    ],
  },
  {
    id: "mq-j-redis-streams",
    level: "junior",
    tags: ["redis", "streams"],
    q: [
      "Redis Streams از چه مدلی برای پیام‌رسانی استفاده می‌کند؟",
      "What messaging model does Redis Streams use?",
    ],
    options: [
      ["یک log فقط‌افزودنی با consumer group، شبیه Kafka", "An append-only log with consumer groups, similar to Kafka"],
      ["Pub/sub بدون ذخیره‌سازی که پیام‌ها را فوراً از دست می‌دهد", "Fire-and-forget pub/sub with no storage"],
      ["یک صف ساده که فقط با `LPUSH` و `RPOP` کار می‌کند", "A plain list queue using only `LPUSH` and `RPOP`"],
      ["یک exchange شبیه RabbitMQ با binding", "An exchange with bindings like RabbitMQ"],
    ],
    a: [
      "Streams با `XADD` پیام را با ID افزایشی اضافه می‌کند و با `XREADGROUP` و `XACK` از consumer group و ack پشتیبانی می‌کند. برخلاف Redis Pub/Sub، پیام‌ها ذخیره می‌شوند.",
      "Streams append entries with increasing IDs via `XADD` and support consumer groups and acks via `XREADGROUP` and `XACK`. Unlike Redis Pub/Sub, entries are persisted.",
    ],
  },
  {
    id: "mq-j-message-ttl",
    level: "junior",
    tags: ["ttl", "rabbitmq"],
    q: [
      "TTL (time-to-live) روی یک پیام در صف چه کاری انجام می‌دهد؟",
      "What does a TTL (time-to-live) on a queued message do?",
    ],
    options: [
      ["اگر پیام تا آن مدت مصرف نشود، منقضی و حذف (یا dead-letter) می‌شود", "If not consumed within that time, the message expires and is dropped or dead-lettered"],
      ["پیام را تا آن مدت از دید consumer مخفی می‌کند", "Hides the message from consumers for that duration"],
      ["حداکثر زمان پردازش consumer را تعیین می‌کند", "Sets the maximum processing time for the consumer"],
      ["تعداد دفعات retry را مشخص می‌کند", "Defines the number of retries"],
    ],
    a: [
      "TTL برای پیام‌هایی مفید است که بعد از مدتی بی‌ارزش می‌شوند، مثل کد OTP. در RabbitMQ با `x-message-ttl` یا `expiration` تنظیم می‌شود و می‌تواند به DLX برود.",
      "TTL suits messages that become worthless after a while, like OTP codes. In RabbitMQ it's set via `x-message-ttl` or `expiration`, and expired messages can go to a DLX.",
    ],
  },
  {
    id: "mq-j-message-size",
    level: "junior",
    tags: ["best-practices"],
    q: [
      "برای پردازش یک فایل ویدئوی ۵۰۰ مگابایتی از طریق صف، بهترین روش کدام است؟",
      "To process a 500 MB video through a queue, what's the best approach?",
    ],
    options: [
      ["فایل را در object storage ذخیره و فقط آدرس یا شناسه آن را در پیام بفرستید", "Store the file in object storage and send only its URL or ID in the message"],
      ["کل فایل را به‌صورت base64 در body پیام قرار دهید", "Put the whole file as base64 in the message body"],
      ["فایل را به هزاران پیام کوچک تقسیم کنید", "Split the file into thousands of tiny messages"],
      ["حداکثر اندازه پیام broker را به ۱ گیگابایت افزایش دهید", "Raise the broker's max message size to 1 GB"],
    ],
    a: [
      "Brokerها برای پیام‌های کوچک بهینه‌اند (مثلاً سقف SQS حدود ۲۵۶KB است). الگوی claim-check یعنی داده بزرگ در S3 و فقط ارجاع آن در پیام.",
      "Brokers are optimized for small messages (SQS caps at about 256 KB). The claim-check pattern stores the payload in S3 and sends only a reference.",
    ],
  },
]);
