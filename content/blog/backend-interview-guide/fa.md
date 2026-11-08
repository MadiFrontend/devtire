---
title: "راهنمای کامل آمادگی مصاحبه بک‌اند: Node.js، API و دیتابیس"
description: "راهنمای کامل آمادگی مصاحبه بک‌اند: event loop در Node.js، طراحی API، دیتابیس SQL و NoSQL، کش با Redis، امنیت، message queue و برنامه ۴ هفته‌ای."
date: "2026-09-28"
categories: ["nodejs", "api-design", "databases", "caching", "auth-security", "message-queues"]
tags: ["مصاحبه بک‌اند", "nodejs", "system design", "آمادگی مصاحبه", "دیتابیس"]
---

در این راهنما می‌بینید مصاحبه‌های بک‌اند دقیقاً چه چیزی را می‌سنجند، انتظارات از سطح Junior تا Senior چطور تغییر می‌کند و در هر حوزه (Node.js، طراحی API، دیتابیس‌های SQL و NoSQL، کش، امنیت، message queue و معماری) کدام مفاهیم بیشتر از همه پرسیده می‌شوند. مثال‌ها با Node.js هستند، اما تقریباً همه‌چیز برای هر استک بک‌اندی کاربرد دارد. در پایان هم یک برنامه مطالعه ۴ هفته‌ای و توصیه‌های عملی برای روز مصاحبه آمده است.

## مراحل مصاحبه بک‌اند

بیشتر شرکت‌ها نسخه‌ای از این فرایند را اجرا می‌کنند. اگر بدانید هر مرحله چه چیزی را می‌سنجد، برای همان آماده می‌شوید.

1. **مصاحبه اولیه با HR یا ریکروتر (۱۵ تا ۳۰ دقیقه).** سوابق، حقوق درخواستی و زمان شروع همکاری. یک خلاصه ۶۰ ثانیه‌ای از تجربه‌تان آماده داشته باشید.
2. **مصاحبه فنی اولیه (۴۵ تا ۶۰ دقیقه).** سوال‌های مفهومی پشت‌سرهم مثل «فرق `process.nextTick` و `setImmediate` چیست؟» یا «چه زمانی index اضافه می‌کنید؟» و گاهی یک تسک کدنویسی کوچک.
3. **مرحله کدنویسی.** یا سوال الگوریتمی، یا (که برای بک‌اند رایج‌تر است) یک کار عملی: نوشتن یک endpoint، رفع باگ یک سرویس یا نوشتن یک کوئری.
4. **System Design (برای Middle و Senior).** طراحی URL shortener، سرویس نوتیفیکیشن یا rate limiter. چیزی که سنجیده می‌شود تحلیل trade-offهاست، نه یک نمودار «درست».
5. **مصاحبه رفتاری.** حادثه‌هایی که مدیریت کرده‌اید، اختلاف‌نظرها و مسئولیت‌پذیری. از فرمت STAR (موقعیت، وظیفه، اقدام، نتیجه) و عدد و رقم واقعی استفاده کنید.
6. **تمرین خانگی (Take-home) در بعضی شرکت‌ها.** ساختار تمیز، تست، README و مدیریت درست خطا مهم‌تر از فیچرهای اضافه است.

## انتظارات از هر سطح

| حوزه | Junior | Middle | Senior |
|---|---|---|---|
| Node.js | async/await، ماژول‌ها، آشنایی با event loop | فازهای event loop، streamها، الگوهای error handling | worker threads، memory leak، profiling و بهینه‌سازی |
| طراحی API | CRUD با REST، status codeهای رایج | pagination، validation، idempotency، versioning | استراتژی تکامل API، مقایسه REST و GraphQL و gRPC |
| دیتابیس | SQL پایه، JOIN، کلید اصلی و خارجی | index، transaction، مشکل N+1، query plan | isolation level، replication، sharding، migration در مقیاس بالا |
| کش | می‌داند کش چیست | cache-aside، TTL، invalidation | جلوگیری از stampede، trade-off سازگاری، کش چندلایه |
| امنیت | هش کردن پسورد، HTTPS | JWT در برابر session، مبانی OWASP | فلوهای OAuth 2.0، threat modeling، مدیریت secretها |
| معماری | ساختار لایه‌ای اپلیکیشن | queue، background job، استراتژی تست | مرزبندی microservice، observability، سناریوهای خرابی |
| مسئولیت | انجام تسک‌های مشخص | مالکیت کامل یک فیچر | تصمیم‌گیری فنی، منتورینگ، مدیریت incident |

یک قاعده کاربردی: از Junior می‌پرسند یک مفهوم **چیست**، از Middle می‌پرسند **چطور** درست از آن استفاده کند، و از Senior می‌پرسند **کجا نباید** از آن استفاده کرد و در مقیاس بالا چه چیزی خراب می‌شود.

## Node.js

از مبانی شروع کنید و قبل از رفتن سراغ مباحث سخت‌تر، خودتان را با [سوالات مصاحبه Node.js سطح جونیور](/fa/backend/nodejs/junior) محک بزنید.

### event loop و فازهای آن

Node.js کد جاوااسکریپت شما را روی یک thread اجرا می‌کند. عملیات I/O به سیستم‌عامل یا thread pool کتابخانه **libuv** سپرده می‌شود (که برای file system، DNS lookup، `crypto` و `zlib` استفاده می‌شود) و callbackها در صف event loop قرار می‌گیرند. فازها به ترتیب:

- **timers**: callbackهای `setTimeout` و `setInterval` که زمانشان رسیده
- **pending callbacks**: برخی callbackهای I/O سطح سیستم که به تعویق افتاده‌اند
- **poll**: دریافت رویدادهای I/O جدید و اجرای callbackهایشان؛ loop ممکن است اینجا منتظر بماند
- **check**: callbackهای `setImmediate`
- **close callbacks**: مثل `socket.on('close')`

بین هر callback، Node ابتدا **صف `process.nextTick`** و بعد **صف microtaskهای Promise** را کامل خالی می‌کند. این سوال ترتیب اجرا یکی از کلاسیک‌ترین سوال‌های مصاحبه است:

```js
// ماژول CommonJS (node app.js)
console.log('1: sync');

setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));

console.log('2: sync');

// خروجی:
// 1: sync
// 2: sync
// nextTick
// promise
// timeout / immediate  <- ترتیب این دو اینجا تضمینی نیست
```

جواب قوی به این ظرافت‌ها اشاره می‌کند: در ماژول اصلی، ترتیب `setTimeout(0)` و `setImmediate` به زمان‌بندی پروسس بستگی دارد. اما **داخل یک callback مربوط به I/O**، همیشه `setImmediate` اول اجرا می‌شود، چون فاز check بلافاصله بعد از poll است. همچنین `process.nextTick` بازگشتی می‌تواند event loop را گرسنه نگه دارد (starvation)، چون این صف قبل از ادامه کار کاملاً خالی می‌شود.

### non-blocking I/O

«Non-blocking» یعنی thread اصلی منتظر I/O نمی‌ماند؛ **نه** اینکه کار CPU هزینه‌ای ندارد. یک `JSON.parse` روی payload پنجاه‌مگابایتی، `bcrypt.hashSync` همزمان یا یک regex بد، همه درخواست‌های آن پروسس را متوقف می‌کند. آماده باشید توضیح دهید چطور این مشکل را تشخیص می‌دهید (متریک event loop lag، `--prof`، clinic.js) و چطور رفعش می‌کنید (تکه‌تکه کردن کار، stream، worker threads یا انتقال کار به queue).

### streamها

streamها داده را تکه‌تکه پردازش می‌کنند، به جای اینکه همه را در حافظه بارگذاری کنند. چهار نوع **Readable**، **Writable**، **Duplex** و **Transform** را بشناسید و مفهوم **backpressure** را بلد باشید: وقتی سمت writable عقب می‌ماند، `write()` مقدار `false` برمی‌گرداند و تولیدکننده باید تا رویداد `drain` صبر کند. به جای زنجیره `.pipe()` از `stream.pipeline()` (یا `await pipeline()` از `node:stream/promises`) استفاده کنید، چون خطاها را منتقل می‌کند و همه streamها را درست می‌بندد.

### worker threads، cluster و child process

- **worker_threads**: برای کارهای سنگین CPU داخل همان پروسس؛ امکان اشتراک حافظه با `SharedArrayBuffer` را دارد.
- **cluster** (یا چند container پشت load balancer): برای استفاده از چند هسته CPU در پاسخ به ترافیک HTTP.
- **child_process**: برای اجرای برنامه‌های خارجی یا ایزوله کردن کارهای غیرقابل‌اعتماد.

### error handling

مصاحبه‌گر می‌خواهد ببیند شما بین **خطاهای عملیاتی** (timeout دیتابیس، ورودی نامعتبر) و **خطاهای برنامه‌نویسی** (undefined is not a function) فرق می‌گذارید. نکات کلیدی: rejectionها را در route handlerهای async حتماً مدیریت کنید (Express 5 این کار را خودکار انجام می‌دهد، Express 4 به wrapper نیاز دارد)، یک error middleware مرکزی داشته باشید و `uncaughtException` را مرگبار در نظر بگیرید: لاگ کنید، پروسس را ببندید و بگذارید process manager دوباره اجرایش کند. ادامه دادن بعد از آن، پروسس را در وضعیت نامعلومی رها می‌کند.

وقتی با این مباحث راحت شدید، سراغ [سوالات مصاحبه Node.js سطح میدل](/fa/backend/nodejs/middle) بروید.

## طراحی API

### معنای متدهای REST و status codeها

متدها و ویژگی‌هایشان را بشناسید:

| متد | Safe | Idempotent | کاربرد رایج |
|---|---|---|---|
| GET | بله | بله | خواندن منبع |
| PUT | خیر | بله | جایگزینی کامل منبع |
| PATCH | خیر | تضمینی نیست | به‌روزرسانی جزئی |
| DELETE | خیر | بله | حذف منبع |
| POST | خیر | خیر | ساخت منبع یا اجرای یک عملیات |

status codeهایی که باید کاملاً مسلط باشید: **200**، **201** (همراه هدر `Location`)، **204**، **400** (درخواست بدفرم)، **401** (احراز هویت نشده)، **403** (احراز هویت شده ولی دسترسی ندارد)، **404**، **409** (تعارض، مثلاً رکورد تکراری)، **422** (خطای validation)، **429** (rate limit)، **500** و **502/503/504**.

### idempotency

شبکه قطع می‌شود و کلاینت دوباره تلاش می‌کند. اگر کلاینت بعد از timeout درخواست `POST /payments` را تکرار کند، نباید دو بار پول کم شود. راه‌حل استاندارد، هدر **Idempotency-Key** است: سرور نتیجه اولین درخواست را با آن کلید ذخیره می‌کند و برای تلاش‌های بعدی همان نتیجه را برمی‌گرداند.

```js
// Express + Redis (node-redis v4)
app.post('/payments', async (req, res) => {
  const key = req.get('Idempotency-Key');
  if (!key) return res.status(400).json({ error: 'Idempotency-Key required' });

  const cacheKey = `idem:${req.user.id}:${key}`;
  // گرفتن اتمیک کلید؛ NX یعنی فقط اگر وجود ندارد ست کن
  const claimed = await redis.set(cacheKey, 'processing', { NX: true, EX: 86400 });

  if (!claimed) {
    const stored = await redis.get(cacheKey);
    if (stored === 'processing') return res.status(409).json({ error: 'Request in progress' });
    const { status, body } = JSON.parse(stored);
    return res.status(status).json(body);
  }

  try {
    const payment = await createPayment(req.user.id, req.body);
    await redis.set(cacheKey, JSON.stringify({ status: 201, body: payment }), { EX: 86400 });
    res.status(201).json(payment);
  } catch (err) {
    await redis.del(cacheKey); // اجازه تلاش مجدد بعد از خطا
    throw err;
  }
});
```

یک نکته تکمیلی خوب: کلیدها را به ازای هر کاربر جدا کنید و در محیط production هش بدنه درخواست را هم مقایسه کنید تا اگر همان کلید با payload متفاوت آمد، رد شود.

### pagination

- **Offset pagination** (`?limit=20&offset=40`): ساده است و پرش به صفحه N را ممکن می‌کند، اما با offset بزرگ کند می‌شود (دیتابیس همچنان ردیف‌های ردشده را اسکن می‌کند) و با درج ردیف جدید، نتایج جابه‌جا می‌شوند.
- **Cursor (keyset) pagination** (`?limit=20&after=<id>`): از `WHERE id > :cursor ORDER BY id LIMIT 20` استفاده می‌کند، با index سریع می‌ماند و در برابر درج پایدار است. برای فید و جدول‌های بزرگ، جواب درست همین است.

### versioning

versioning در URL (`/v1/orders`) رایج‌ترین روش است و کش و دیباگش ساده‌تر است؛ versioning با هدر URLها را تمیز نگه می‌دارد. مهم‌تر از روش: فیلد جدید اضافه کنید بدون اینکه کلاینت‌ها بشکنند، هرگز معنای یک فیلد موجود را عوض نکنید و deprecation را با زمان‌بندی مشخص اعلام کنید.

### REST در برابر GraphQL و gRPC

- **REST**: ساده، کش HTTP بدون زحمت کار می‌کند؛ بهترین گزینه برای API عمومی.
- **GraphQL**: کلاینت دقیقاً فیلدهای لازم را درخواست می‌کند؛ عالی برای چند فرانت‌اند با نیازهای متفاوت. هزینه‌ها: کش HTTP سخت‌تر می‌شود، مشکل N+1 در resolverها (با DataLoader حل کنید) و نیاز به محدودیت پیچیدگی کوئری.
- **gRPC**: Protobuf باینری روی HTTP/2، قرارداد سخت‌گیرانه و streaming؛ ایده‌آل برای ارتباط داخلی بین سرویس‌ها، اما استفاده مستقیم از مرورگر دردسر دارد.

این trade-offها را با [آزمون‌های طراحی API](/fa/backend/api-design) تمرین کنید.

## دیتابیس‌های SQL

### index

index (معمولاً از نوع **B-tree**) به دیتابیس اجازه می‌دهد بدون full table scan ردیف‌ها را پیدا کند، به قیمت کندتر شدن نوشتن و فضای اضافه. ترتیب ستون‌ها در **composite index** را بلد باشید: index روی `(user_id, created_at)` به کوئری `WHERE user_id = ?` و `WHERE user_id = ? ORDER BY created_at` کمک می‌کند، اما به `WHERE created_at > ?` به‌تنهایی نه (قاعده leftmost prefix).

```sql
-- کوئری: آخرین سفارش‌های یک کاربر
SELECT id, total, created_at
FROM orders
WHERE user_id = 42
ORDER BY created_at DESC
LIMIT 20;

-- هم فیلتر و هم مرتب‌سازی را پوشش می‌دهد، بدون مرحله sort جداگانه
CREATE INDEX idx_orders_user_created ON orders (user_id, created_at DESC);

-- بررسی query plan (PostgreSQL)
EXPLAIN ANALYZE SELECT ...;
```

همیشه به `EXPLAIN` و `EXPLAIN ANALYZE` اشاره کنید. جمله «اول query plan را بررسی می‌کنم» سیگنال قوی‌ای به مصاحبه‌گر می‌دهد.

### transaction و isolation level

**ACID** حداقل انتظار است. سوال عمیق‌تر درباره isolation است. از ضعیف به قوی:

- **Read Uncommitted**: dirty read ممکن است (PostgreSQL آن را مثل Read Committed اجرا می‌کند).
- **Read Committed**: dirty read ندارد، اما non-repeatable read دارد. پیش‌فرض PostgreSQL.
- **Repeatable Read**: خواندن دوباره یک ردیف همان مقدار را می‌دهد. پیش‌فرض MySQL InnoDB.
- **Serializable**: طوری رفتار می‌کند که انگار transactionها یکی‌یکی اجرا شده‌اند؛ باید خطاهای serialization را retry کنید.

سناریوی کلاسیک: دو درخواست همزمان موجودی انبار را کم می‌کنند. راه‌حل‌ها: آپدیت اتمیک (`UPDATE products SET stock = stock - 1 WHERE id = ? AND stock > 0`)، `SELECT ... FOR UPDATE` یا optimistic locking با ستون `version`.

### مشکل N+1

اگر ۵۰ پست را بگیرید و برای نویسنده هر پست یک کوئری جدا بزنید، ۵۱ کوئری اجرا کرده‌اید. راه‌حل: JOIN، یک کوئری `WHERE id IN (...)` یا eager loading در ORM (مثل `include` در Prisma و Sequelize). در GraphQL از DataLoader برای batch کردن استفاده کنید.

### normalization

برای جلوگیری از ناهماهنگی در به‌روزرسانی و داده تکراری، تا حدود 3NF نرمال‌سازی کنید. برای مسیرهای پرخواندن، آگاهانه denormalize کنید (مثلاً ذخیره `comments_count` روی پست) و توضیح دهید چطور آن را سازگار نگه می‌دارید.

خودتان را با [سوالات دیتابیس سطح میدل](/fa/backend/databases/middle) بسنجید.

## NoSQL

### مدل‌سازی document

در MongoDB و دیتابیس‌های مشابه، **بر اساس الگوی دسترسی مدل کنید**، نه بر اساس موجودیت‌ها. داده‌ای که با هم خوانده می‌شود و اندازه محدودی دارد را embed کنید (آیتم‌های سفارش داخل خود سفارش). داده‌ای که بی‌حد رشد می‌کند یا مشترک است را reference کنید (میلیون‌ها رویداد یک کاربر). محدودیت ۱۶ مگابایتی document و آرایه‌های بی‌انتها از سوال‌های تکمیلی رایج هستند.

### چه زمانی NoSQL انتخاب کنیم

برای schema انعطاف‌پذیر یا در حال تغییر، throughput نوشتن بسیار بالا، دسترسی ساده مبتنی بر کلید در مقیاس عظیم (DynamoDB، Cassandra) یا شکل‌های خاص داده (time series، graph). وقتی به کوئری‌های پیچیده بین موجودیت‌ها، transaction چندردیفی قوی یا گزارش‌گیری نیاز دارید، در دیتابیس رابطه‌ای بمانید. جمله «MongoDB را انتخاب می‌کنیم چون سریع‌تر است» بدون دلیل، برای مصاحبه‌گر زنگ خطر است. [آزمون‌های NoSQL](/fa/backend/nosql) را ببینید.

## کش و Redis

### cache-aside

رایج‌ترین الگو: از کش بخوانید؛ اگر نبود (miss)، از دیتابیس بخوانید، با TTL در کش بنویسید و برگردانید. هنگام نوشتن، دیتابیس را آپدیت کنید و بعد کلید کش را **حذف** کنید (حذف امن‌تر از آپدیت است، چون از race بین نویسنده‌ها و باقی ماندن مقدار کهنه جلوگیری می‌کند).

### invalidation و TTL

invalidation کش به‌خاطر سختی‌اش معروف است. invalidation صریح هنگام نوشتن را با **TTL** به‌عنوان تور ایمنی ترکیب کنید تا اگر invalidation جا افتاد، داده کهنه بالاخره منقضی شود. به TTLها مقدار تصادفی (jitter) اضافه کنید تا کلیدهای زیادی همزمان منقضی نشوند.

### cache stampede

وقتی یک کلید پرترافیک منقضی می‌شود، صدها درخواست همزمان miss می‌خورند و همه به دیتابیس می‌روند. راه‌های مقابله:

- **lock** (با `SET key NX EX` در Redis) تا فقط یک درخواست مقدار را بازسازی کند و بقیه منتظر بمانند یا داده کهنه بگیرند
- **request coalescing** داخل پروسس (یک promise در حال اجرا به ازای هر کلید)
- **refresh زودهنگام یا احتمالاتی** قبل از انقضای TTL

کاربردهای Redis فراتر از کش را هم بشناسید: rate limiting با `INCR` و `EXPIRE`، نگهداری session، leaderboard با sorted set، distributed lock و pub/sub. با [سوالات کش سطح سینیور](/fa/backend/caching/senior) تمرین کنید.

## احراز هویت و امنیت

### session در برابر JWT

- **Session**: وضعیت روی سرور نگه داشته می‌شود و کلاینت یک کوکی بی‌معنا دارد. ابطال آن ساده است، اما در مقیاس افقی به یک store مشترک (Redis) نیاز دارد.
- **JWT**: توکن امضاشده و خودکفا که بدون مراجعه به دیتابیس verify می‌شود. ابطالش قبل از انقضا سخت است، پس از access token کوتاه‌عمر (۵ تا ۱۵ دقیقه) همراه با refresh token و rotation استفاده کنید.

JWT **امضا شده است، نه رمزنگاری**؛ هیچ‌وقت اطلاعات محرمانه در payload نگذارید. در مرورگر، کوکی با `HttpOnly`، `Secure` و `SameSite` امن‌تر از `localStorage` است که هر payload مربوط به XSS می‌تواند آن را بخواند.

### OAuth 2.0

نقش‌ها (resource owner، client، authorization server، resource server) و فلوهای پیشنهادی را بشناسید: **Authorization Code با PKCE** برای اپ‌های وب و موبایل و **Client Credentials** برای ارتباط سرویس به سرویس. فلوی Implicit منسوخ شده است. یادتان باشد OAuth برای authorization است و **OpenID Connect** لایه authentication (ID token) را اضافه می‌کند.

### هش کردن پسورد

هرگز از MD5 یا SHA-256 به‌تنهایی برای پسورد استفاده نکنید. از الگوریتم کند و salt‌دار استفاده کنید: **Argon2id**، **bcrypt** یا **scrypt**. در Node.js نسخه async را به کار ببرید تا هش کردن event loop را block نکند.

### مبانی OWASP

- **SQL injection**: از کوئری پارامتری (`WHERE id = $1`) استفاده کنید، هرگز از چسباندن رشته.
- **XSS**: خروجی را escape کنید، Content Security Policy بگذارید و توکن‌ها را در جایی که جاوااسکریپت می‌تواند بخواند نگه ندارید.
- **CSRF**: در احراز هویت مبتنی بر کوکی مهم است. از کوکی `SameSite` و CSRF token برای درخواست‌هایی که وضعیت را تغییر می‌دهند استفاده کنید.
- **Broken access control**: بررسی کنید کاربر مالک منبع است (`/orders/123`)، نه فقط اینکه لاگین کرده. این مورد رتبه اول OWASP Top 10 است.

دانسته‌هایتان را با [آزمون‌های امنیت و احراز هویت سطح میدل](/fa/backend/auth-security/middle) بسنجید.

## message queue

### تضمین تحویل پیام

- **At-most-once**: ممکن است پیام گم شود، اما تکراری نمی‌شود.
- **At-least-once**: پیام گم نمی‌شود، اما ممکن است تکراری برسد. پیش‌فرض بیشتر سیستم‌های واقعی.
- **Exactly-once**: فقط در محدوده‌های مشخص قابل‌دستیابی است (مثل transactionهای Kafka)؛ در عمل از ترکیب at-least-once با پردازش idempotent به آن می‌رسید.

### consumer idempotent

چون پیام ممکن است دو بار برسد، consumer باید تکرار را مدیریت کند. شناسه پیام‌های پردازش‌شده را ذخیره کنید (unique constraint روی جدول `processed_messages`، در همان transaction که اثر جانبی اعمال می‌شود)، یا عملیات را ذاتاً idempotent طراحی کنید (`SET status = 'paid'` به جای `balance = balance + 10`). به **dead-letter queue** برای پیام‌هایی که مدام شکست می‌خورند و **outbox pattern** برای انتشار مطمئن رویداد بعد از نوشتن در دیتابیس هم اشاره کنید.

### Kafka در برابر RabbitMQ

| | Kafka | RabbitMQ |
|---|---|---|
| مدل | log توزیع‌شده و append-only | message broker با queue و exchange |
| نگهداری پیام | تا مدت مشخص نگه داشته می‌شود؛ consumer می‌تواند replay کند | بعد از acknowledge حذف می‌شود |
| ترتیب | داخل هر partition تضمین می‌شود | در هر queue، با چند consumer ضعیف می‌شود |
| مناسب برای | event streaming، throughput بالا، event sourcing | task queue، routing پیچیده، ack به ازای هر پیام |

با [سوالات message queue](/fa/backend/message-queues) تمرین کنید.

## معماری بک‌اند

### monolith در برابر microservices

microservices امکان deploy و scale مستقل می‌دهد، به قیمت خطاهای شبکه، transactionهای توزیع‌شده و سربار عملیاتی. **modular monolith** اغلب نقطه شروع درستی است. از Senior انتظار می‌رود بگوید *چه زمانی* باید جدا کرد (مرز تیم‌ها، نیاز مقیاس‌پذیری بسیار متفاوت) و سازگاری بین سرویس‌ها را چطور مدیریت کند (saga، outbox)، نه اینکه فقط مزایا را بشمارد.

### observability

سه ستون اصلی: **لاگ** (JSON ساختاریافته با request ID یا correlation ID)، **متریک** (صدک‌های latency مثل p95 و p99، نرخ خطا، throughput) و **trace** (با OpenTelemetry بین سرویس‌ها). آماده باشید توضیح دهید سناریوی «API از دیروز کند شده» را چطور دیباگ می‌کنید.

### تست

unit test برای منطق بیزینسی، integration test با دیتابیس واقعی (Testcontainers جواب خوبی است)، contract test بین سرویس‌ها و تعداد کمی تست end-to-end. سرویس‌های خارجی را mock کنید، نه دیتابیس خودتان را.

برای تمرین بیشتر، [آزمون‌های معماری بک‌اند](/fa/backend/backend-architecture) را ببینید.

## اشتباهات رایج

- **حفظ کردن تعریف‌ها بدون trade-off.** «Redis یک دیتابیس in-memory است» جواب نیست؛ «این را با TTL پنج‌دقیقه‌ای کش می‌کنم چون قیمت کهنه تا این حد قابل‌قبول است» جواب است.
- **نادیده گرفتن سناریوهای خرابی.** اگر دیتابیس از دسترس خارج شود، queue پیام را دوباره بفرستد یا API شخص ثالث timeout بدهد چه می‌شود؟
- **شروع System Design بدون شفاف کردن نیازمندی‌ها.** اول درباره مقیاس، نسبت خواندن به نوشتن و نیاز به سازگاری بپرسید.
- **over-engineering.** پیشنهاد Kafka و ده microservice برای اپی با هزار کاربر.
- **بلند فکر نکردن.** سکوت هنگام کدنویسی، استدلال شما را پنهان می‌کند.
- **جواب‌های رفتاری مبهم.** «پرفورمنس را بهتر کردیم» ضعیف است؛ «بعد از اضافه کردن یک composite index، مقدار p95 از ۸۰۰ به ۱۲۰ میلی‌ثانیه رسید» قوی است.

## برنامه آمادگی ۴ هفته‌ای

**هفته اول: Node.js و مبانی جاوااسکریپت.** فازهای event loop، Promiseها، streamها و error handling. اسکریپت‌های کوچک بنویسید تا ترتیب اجرا را خودتان ببینید. هر روز یک آزمون بدهید.

**هفته دوم: API و دیتابیس.** یک REST API کوچک با pagination، validation و status codeهای درست بسازید. SQL تمرین کنید: JOIN، index، `EXPLAIN` و transaction. یک مشکل N+1 را بازتولید و رفع کنید.

**هفته سوم: کش، امنیت و queue.** cache-aside و rate limiting با Redis را به API خود اضافه کنید. احراز هویت JWT با refresh token پیاده کنید. یک background job با queue اضافه کنید و consumer را idempotent کنید.

**هفته چهارم: System Design و مصاحبه آزمایشی.** سه چهار طراحی کلاسیک (URL shortener، rate limiter، سیستم نوتیفیکیشن، چت) را تمرین کنید. پنج داستان STAR آماده کنید. حداقل دو mock interview انجام دهید و نقاط ضعف را با آزمون‌ها مرور کنید.

## توصیه‌های روز مصاحبه

- **قبل از جواب دادن، سوال را شفاف کنید.** مسئله را با زبان خودتان تکرار کنید و فرض‌ها را تأیید بگیرید.
- **ساده شروع کنید، بعد بهتر کنید.** یک راه‌حل ساده که کار می‌کند به‌همراه مسیر روشن برای بهینه‌سازی، از راه‌حل بی‌نقص ناتمام بهتر است.
- **trade-off را صریح بگویید.** «این یک وابستگی به Redis اضافه می‌کند، اما بار خواندن دیتابیس را حدود ۸۰ درصد کم می‌کند.»
- **بگویید «نمی‌دانم، اما این‌طور پیدایش می‌کنم».** خیلی بهتر از حدس زدن و بلوف است.
- **برای آن‌ها هم سوال آماده کنید:** فرایند on-call، تعداد deploy، نحوه بررسی incidentها و فرهنگ تست.
- **برای مصاحبه آنلاین تجهیزات را چک کنید:** اینترنت پایدار، میکروفون سالم و ادیتور آماده برای share.

## جمع‌بندی

مصاحبه بک‌اند به فهم عمیق امتیاز می‌دهد، نه حفظ کردن: اینکه event loop چرا این‌طور رفتار می‌کند، index کجا کمک می‌کند و کجا ضرر می‌زند، چطور retry را امن کنیم و در مقیاس بالا چه چیزی خراب می‌شود. مفاهیم را یاد بگیرید، یک پروژه کوچک با آن‌ها بسازید و مرتب خودتان را محک بزنید. همه این موضوعات را می‌توانید با آزمون‌های چندگزینه‌ای رایگان و سطح‌بندی‌شده در [بخش بک‌اند DevTier](/fa/backend) تمرین کنید.
