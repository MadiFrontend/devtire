import { build } from "../build";

export const cachingJunior = build("caching", [
  {
    id: "cache-j-why-cache",
    level: "junior",
    tags: ["fundamentals"],
    q: [
      "هدف اصلی استفاده از cache در یک سیستم backend چیست؟",
      "What is the main purpose of using a cache in a backend system?",
    ],
    options: [
      [
        "کاهش latency و بار روی منبع اصلی با نگه‌داشتن داده‌های پرتکرار در محل سریع‌تر",
        "Reduce latency and load on the source by keeping frequently used data in faster storage",
      ],
      [
        "تضمین ماندگاری دائمی داده‌ها به‌جای دیتابیس",
        "Guarantee permanent durability of data instead of the database",
      ],
      [
        "افزایش امنیت داده‌ها با رمزنگاری خودکار آن‌ها",
        "Increase data security by encrypting it automatically",
      ],
      [
        "جایگزینی کامل دیتابیس برای همه انواع query",
        "Fully replace the database for every kind of query",
      ],
    ],
    a: [
      "cache یک کپی موقت از داده‌های پرکاربرد را در لایه‌ای سریع‌تر (مثل حافظه) نگه می‌دارد تا پاسخ‌ها سریع‌تر شوند و فشار روی دیتابیس یا سرویس‌های کند کم شود. منبع حقیقت (source of truth) همچنان دیتابیس است.",
      "A cache keeps a temporary copy of hot data in a faster layer (like memory) so responses are quicker and load on slow databases or services drops. The database remains the source of truth.",
    ],
  },
  {
    id: "cache-j-hit-miss",
    level: "junior",
    tags: ["fundamentals"],
    q: ["cache miss به چه معناست؟", "What does a cache miss mean?"],
    options: [
      [
        "داده درخواستی در cache نبود و باید از منبع اصلی خوانده شود",
        "The requested data was not in the cache and must be read from the source",
      ],
      [
        "داده در cache بود و مستقیماً برگردانده شد",
        "The data was in the cache and was returned directly",
      ],
      [
        "cache به‌خاطر پر شدن حافظه از کار افتاد",
        "The cache crashed because memory was full",
      ],
      [
        "داده در cache با مقدار جدید بازنویسی شد",
        "The data in the cache was overwritten with a new value",
      ],
    ],
    a: [
      "در cache miss کلید موردنظر در cache پیدا نمی‌شود و برنامه باید سراغ دیتابیس یا سرویس اصلی برود که کندتر است. در مقابل، cache hit یعنی داده مستقیماً از cache خوانده شده است.",
      "On a cache miss the key isn't found, so the app must go to the slower database or origin service. A cache hit means the data was served straight from the cache.",
    ],
  },
  {
    id: "cache-j-hit-ratio",
    level: "junior",
    tags: ["fundamentals", "metrics"],
    q: [
      "اگر از ۱۰۰۰ درخواست، ۸۰۰ تا از cache پاسخ داده شوند، hit ratio چقدر است؟",
      "If 800 of 1000 requests are served from the cache, what is the hit ratio?",
    ],
    options: [
      ["۸۰٪", "80%"],
      ["۲۰٪", "20%"],
      ["۴۰٪", "40%"],
      ["۱۲۵٪", "125%"],
    ],
    a: [
      "hit ratio برابر است با `hits / (hits + misses)` یعنی `800 / 1000 = 0.8`. hit ratio بالاتر معمولاً یعنی cache مؤثرتر است.",
      "Hit ratio is `hits / (hits + misses)`, i.e. `800 / 1000 = 0.8`. A higher hit ratio usually means a more effective cache.",
    ],
  },
  {
    id: "cache-j-cache-aside-flow",
    level: "junior",
    tags: ["strategies", "cache-aside"],
    q: [
      "در الگوی cache-aside (lazy loading)، هنگام خواندن داده چه اتفاقی می‌افتد؟",
      "In the cache-aside (lazy loading) pattern, what happens on a read?",
    ],
    options: [
      [
        "برنامه اول cache را چک می‌کند؛ در صورت miss از دیتابیس می‌خواند و نتیجه را در cache می‌نویسد",
        "The app checks the cache; on a miss it reads the DB and writes the result to the cache",
      ],
      [
        "cache خودش به‌صورت خودکار از دیتابیس می‌خواند و برنامه فقط با cache صحبت می‌کند",
        "The cache itself loads from the DB and the app only talks to the cache",
      ],
      [
        "همه داده‌ها هنگام شروع برنامه یک‌جا در cache بارگذاری می‌شوند",
        "All data is loaded into the cache at once when the app starts",
      ],
      [
        "برنامه همیشه از دیتابیس می‌خواند و cache فقط برای نوشتن است",
        "The app always reads from the DB and the cache is only for writes",
      ],
    ],
    a: [
      "در cache-aside خود کد برنامه مسئول مدیریت cache است: ابتدا `GET` روی cache، در صورت miss خواندن از دیتابیس و سپس `SET` در cache. فقط داده‌هایی cache می‌شوند که واقعاً درخواست شده‌اند.",
      "In cache-aside the application manages the cache: `GET` from cache, on miss read from the DB, then `SET` into the cache. Only data that is actually requested gets cached.",
    ],
  },
  {
    id: "cache-j-ttl",
    level: "junior",
    tags: ["ttl", "fundamentals"],
    q: ["TTL در cache به چه معناست؟", "What does TTL mean in caching?"],
    options: [
      [
        "مدت زمانی که یک آیتم در cache معتبر می‌ماند و پس از آن منقضی می‌شود",
        "How long an item stays valid in the cache before it expires",
      ],
      [
        "حداکثر تعداد کلیدهایی که cache می‌تواند نگه دارد",
        "The maximum number of keys the cache can hold",
      ],
      [
        "زمان لازم برای اتصال برنامه به سرور cache",
        "The time needed for the app to connect to the cache server",
      ],
      [
        "تعداد دفعاتی که یک کلید می‌تواند خوانده شود",
        "How many times a key can be read",
      ],
    ],
    a: [
      "TTL (Time To Live) تعیین می‌کند یک کلید چند ثانیه در cache بماند. پس از انقضا، درخواست بعدی miss می‌شود و داده تازه از منبع خوانده می‌شود؛ این ساده‌ترین راه برای محدود کردن stale بودن داده است.",
      "TTL (Time To Live) sets how many seconds a key lives in the cache. After expiry the next request misses and fresh data is loaded, which is the simplest way to bound staleness.",
    ],
  },
  {
    id: "cache-j-where-cache",
    level: "junior",
    tags: ["layers"],
    q: [
      "کدام مورد یک لایه رایج cache در مسیر یک درخواست وب نیست؟",
      "Which of these is NOT a common caching layer in a web request path?",
    ],
    options: [
      ["فایل log سرور", "The server's log file"],
      ["cache مرورگر", "The browser cache"],
      ["CDN", "A CDN"],
      ["cache توزیع‌شده مثل Redis", "A distributed cache like Redis"],
    ],
    a: [
      "cache می‌تواند در مرورگر، CDN، reverse proxy، حافظه برنامه، cache توزیع‌شده و حتی buffer pool دیتابیس باشد. فایل log برای ثبت رخدادهاست و نقشی در سرو کردن داده ندارد.",
      "Caches live in the browser, CDN, reverse proxy, app memory, distributed caches and even the DB buffer pool. A log file records events and doesn't serve data.",
    ],
  },
  {
    id: "cache-j-redis-what",
    level: "junior",
    tags: ["redis"],
    q: ["Redis اساساً چه نوع ابزاری است؟", "What kind of tool is Redis fundamentally?"],
    options: [
      [
        "یک key-value store درون‌حافظه‌ای با ساختارهای داده متنوع",
        "An in-memory key-value store with rich data structures",
      ],
      [
        "یک دیتابیس رابطه‌ای مبتنی بر دیسک با پشتیبانی SQL",
        "A disk-based relational database with SQL support",
      ],
      [
        "یک message broker که فقط از صف‌های AMQP پشتیبانی می‌کند",
        "A message broker that only supports AMQP queues",
      ],
      [
        "یک موتور جست‌وجوی full-text مبتنی بر inverted index",
        "A full-text search engine based on inverted indexes",
      ],
    ],
    a: [
      "Redis داده‌ها را در RAM نگه می‌دارد و ساختارهایی مثل string، hash، list، set و sorted set ارائه می‌دهد. به همین دلیل برای cache، session، صف ساده و leaderboard بسیار رایج است.",
      "Redis keeps data in RAM and offers structures like strings, hashes, lists, sets and sorted sets. That's why it's widely used for caching, sessions, simple queues and leaderboards.",
    ],
  },
  {
    id: "cache-j-redis-fast",
    level: "junior",
    tags: ["redis", "performance"],
    q: [
      "مهم‌ترین دلیل سرعت بالای Redis چیست؟",
      "What is the main reason Redis is so fast?",
    ],
    options: [
      [
        "داده‌ها در حافظه (RAM) نگه‌داری و پردازش می‌شوند",
        "Data is stored and processed in memory (RAM)",
      ],
      [
        "برای هر درخواست یک thread جداگانه ایجاد می‌کند",
        "It spawns a separate thread for every request",
      ],
      [
        "همه داده‌ها را به‌صورت فشرده روی SSD ذخیره می‌کند",
        "It stores all data compressed on SSD",
      ],
      [
        "از SQL بهینه‌شده برای اجرای query استفاده می‌کند",
        "It uses optimized SQL to execute queries",
      ],
    ],
    a: [
      "دسترسی به RAM چندین مرتبه سریع‌تر از دیسک است و Redis عملیات را روی ساختارهای داده درون‌حافظه انجام می‌دهد. مدل اجرای تک‌نخی فرمان‌ها هم سربار lock و context switch را حذف می‌کند.",
      "RAM access is orders of magnitude faster than disk, and Redis operates on in-memory data structures. Its single-threaded command execution also avoids locking and context-switch overhead.",
    ],
  },
  {
    id: "cache-j-set-ex",
    level: "junior",
    tags: ["redis", "commands", "ttl"],
    q: [
      "دستور `SET session:42 abc EX 60` در Redis چه کاری انجام می‌دهد؟",
      "What does `SET session:42 abc EX 60` do in Redis?",
    ],
    options: [
      [
        "مقدار `abc` را در کلید ذخیره می‌کند و آن را پس از ۶۰ ثانیه منقضی می‌کند",
        "Stores `abc` under the key and expires it after 60 seconds",
      ],
      [
        "مقدار را فقط اگر کلید وجود داشته باشد ۶۰ بار تکرار می‌کند",
        "Repeats the value 60 times only if the key exists",
      ],
      [
        "مقدار را ذخیره می‌کند و آن را پس از ۶۰ میلی‌ثانیه منقضی می‌کند",
        "Stores the value and expires it after 60 milliseconds",
      ],
      [
        "۶۰ کلید جدید با پیشوند `session:42` می‌سازد",
        "Creates 60 new keys prefixed with `session:42`",
      ],
    ],
    a: [
      "گزینه `EX` زمان انقضا را بر حسب ثانیه و `PX` بر حسب میلی‌ثانیه تعیین می‌کند. این کار مقداردهی و تنظیم TTL را به‌صورت atomic در یک دستور انجام می‌دهد.",
      "The `EX` option sets expiry in seconds and `PX` in milliseconds. This sets the value and TTL atomically in a single command.",
    ],
  },
  {
    id: "cache-j-ttl-cmd",
    level: "junior",
    tags: ["redis", "ttl"],
    q: [
      "خروجی `TTL mykey` برای کلیدی که وجود دارد ولی زمان انقضا ندارد چیست؟",
      "What does `TTL mykey` return for a key that exists but has no expiry?",
    ],
    options: [["`-1`", "`-1`"], ["`-2`", "`-2`"], ["`0`", "`0`"], ["`nil`", "`nil`"]],
    a: [
      "`TTL` برای کلید بدون expire مقدار `-1` و برای کلید ناموجود مقدار `-2` برمی‌گرداند. در غیر این صورت تعداد ثانیه‌های باقی‌مانده را می‌دهد.",
      "`TTL` returns `-1` for a key without an expiry and `-2` for a missing key. Otherwise it returns the remaining seconds.",
    ],
  },
  {
    id: "cache-j-incr",
    level: "junior",
    tags: ["redis", "commands", "atomicity"],
    q: [
      "چرا `INCR` برای شمارنده‌ها (مثل تعداد بازدید) در Redis مناسب است؟",
      "Why is `INCR` well suited for counters (like page views) in Redis?",
    ],
    options: [
      [
        "atomic است و چند کلاینت هم‌زمان بدون race condition مقدار را افزایش می‌دهند",
        "It is atomic, so concurrent clients increment without race conditions",
      ],
      [
        "مقدار را به‌طور خودکار روی دیسک flush می‌کند تا از دست نرود",
        "It automatically flushes the value to disk so it's never lost",
      ],
      [
        "فقط روی کلیدهایی کار می‌کند که TTL دارند",
        "It only works on keys that have a TTL",
      ],
      [
        "مقدار را در همه replicaها قبل از پاسخ دادن به‌روز می‌کند",
        "It updates all replicas before replying",
      ],
    ],
    a: [
      "Redis فرمان‌ها را به‌ترتیب و تک‌نخی اجرا می‌کند، پس `INCR` یک read-modify-write اتمیک است. اگر کلید وجود نداشته باشد از `0` شروع می‌کند.",
      "Redis executes commands sequentially on one thread, so `INCR` is an atomic read-modify-write. If the key doesn't exist it starts from `0`.",
    ],
  },
  {
    id: "cache-j-data-types",
    level: "junior",
    tags: ["redis", "data-types"],
    q: [
      "کدام مورد یکی از نوع‌های داده بومی Redis نیست؟",
      "Which of these is NOT a native Redis data type?",
    ],
    options: [
      ["Table با ستون‌های تایپ‌دار", "Table with typed columns"],
      ["Sorted Set", "Sorted Set"],
      ["Hash", "Hash"],
      ["Stream", "Stream"],
    ],
    a: [
      "Redis نوع‌هایی مثل string، list، set، sorted set، hash، stream، bitmap، HyperLogLog و geo دارد. مفهوم جدول با ستون‌های تایپ‌دار مربوط به دیتابیس‌های رابطه‌ای است.",
      "Redis provides strings, lists, sets, sorted sets, hashes, streams, bitmaps, HyperLogLog and geo. Tables with typed columns belong to relational databases.",
    ],
  },
  {
    id: "cache-j-hash-use",
    level: "junior",
    tags: ["redis", "data-types"],
    q: [
      "برای ذخیره فیلدهای یک کاربر (name، email، age) زیر یک کلید در Redis کدام نوع مناسب‌تر است؟",
      "Which Redis type best fits storing a user's fields (name, email, age) under one key?",
    ],
    options: [
      ["Hash با `HSET`", "Hash with `HSET`"],
      ["List با `LPUSH`", "List with `LPUSH`"],
      ["Set با `SADD`", "Set with `SADD`"],
      ["HyperLogLog با `PFADD`", "HyperLogLog with `PFADD`"],
    ],
    a: [
      "Hash یک نگاشت field به value زیر یک کلید است و اجازه می‌دهد فیلدها جداگانه با `HGET`/`HSET` خوانده و نوشته شوند. برای اشیای کوچک از نظر حافظه هم بهینه است.",
      "A hash maps fields to values under one key, letting you read or write individual fields with `HGET`/`HSET`. It's also memory-efficient for small objects.",
    ],
  },
  {
    id: "cache-j-set-unique",
    level: "junior",
    tags: ["redis", "data-types"],
    q: [
      "برای نگه‌داشتن مجموعه‌ای از tagهای یکتا برای یک پست کدام نوع Redis مناسب است؟",
      "Which Redis type fits storing a collection of unique tags for a post?",
    ],
    options: [
      ["Set", "Set"],
      ["List", "List"],
      ["String", "String"],
      ["Stream", "Stream"],
    ],
    a: [
      "Set مجموعه‌ای بدون ترتیب از اعضای یکتاست؛ `SADD` تکراری‌ها را نادیده می‌گیرد و `SISMEMBER` عضویت را در O(1) بررسی می‌کند.",
      "A set is an unordered collection of unique members; `SADD` ignores duplicates and `SISMEMBER` checks membership in O(1).",
    ],
  },
  {
    id: "cache-j-list-use",
    level: "junior",
    tags: ["redis", "data-types"],
    q: [
      "کدام نوع Redis برای پیاده‌سازی یک صف ساده FIFO با `LPUSH` و `RPOP` استفاده می‌شود؟",
      "Which Redis type is used to build a simple FIFO queue with `LPUSH` and `RPOP`?",
    ],
    options: [
      ["List", "List"],
      ["Sorted Set", "Sorted Set"],
      ["Hash", "Hash"],
      ["Bitmap", "Bitmap"],
    ],
    a: [
      "List در Redis یک linked list مرتب است که درج و حذف از دو سر آن O(1) است. با `LPUSH` از چپ اضافه و با `RPOP` از راست برداشت می‌کنیم که رفتار FIFO می‌دهد.",
      "A Redis list is an ordered linked list with O(1) push/pop at both ends. Pushing with `LPUSH` and popping with `RPOP` gives FIFO behavior.",
    ],
  },
  {
    id: "cache-j-zset-leaderboard",
    level: "junior",
    tags: ["redis", "sorted-set"],
    q: [
      "برای پیاده‌سازی leaderboard بازی بر اساس امتیاز کدام نوع Redis مناسب‌تر است؟",
      "Which Redis type is best for a game leaderboard ranked by score?",
    ],
    options: [
      ["Sorted Set (ZSET)", "Sorted Set (ZSET)"],
      ["List", "List"],
      ["Set", "Set"],
      ["String با JSON", "String holding JSON"],
    ],
    a: [
      "Sorted Set اعضای یکتا را بر اساس score مرتب نگه می‌دارد. با `ZADD` امتیاز ثبت و با `ZREVRANGE` یا `ZRANGE ... REV` نفرات برتر را در O(log N + M) می‌گیریم.",
      "A sorted set keeps unique members ordered by score. `ZADD` records scores and `ZREVRANGE` (or `ZRANGE ... REV`) fetches the top players in O(log N + M).",
    ],
  },
  {
    id: "cache-j-del-vs-expire",
    level: "junior",
    tags: ["redis", "commands"],
    q: [
      "تفاوت `DEL key` و `EXPIRE key 10` چیست؟",
      "What is the difference between `DEL key` and `EXPIRE key 10`?",
    ],
    options: [
      [
        "`DEL` فوراً کلید را حذف می‌کند؛ `EXPIRE` آن را پس از ۱۰ ثانیه حذف می‌کند",
        "`DEL` removes the key now; `EXPIRE` makes it disappear after 10 seconds",
      ],
      [
        "`DEL` فقط مقدار را خالی می‌کند ولی کلید باقی می‌ماند",
        "`DEL` only empties the value but keeps the key",
      ],
      [
        "`EXPIRE` کلید را فوراً حذف و ۱۰ ثانیه بعد بازمی‌گرداند",
        "`EXPIRE` deletes the key now and restores it after 10 seconds",
      ],
      [
        "هر دو یکسان‌اند و فقط نامشان فرق دارد",
        "They are identical, only the names differ",
      ],
    ],
    a: [
      "`DEL` کلید را بلافاصله پاک می‌کند، اما `EXPIRE` یک TTL روی کلید موجود تنظیم می‌کند تا Redis پس از آن زمان حذفش کند. `PERSIST` هم TTL را برمی‌دارد.",
      "`DEL` removes the key immediately, while `EXPIRE` sets a TTL on an existing key so Redis drops it later. `PERSIST` removes a TTL.",
    ],
  },
  {
    id: "cache-j-stale-data",
    level: "junior",
    tags: ["consistency", "fundamentals"],
    q: [
      "مهم‌ترین ریسک اضافه کردن cache جلوی دیتابیس چیست؟",
      "What is the main risk of putting a cache in front of a database?",
    ],
    options: [
      [
        "برگرداندن داده قدیمی (stale) وقتی دیتابیس تغییر کرده ولی cache نه",
        "Serving stale data when the DB changed but the cache didn't",
      ],
      [
        "کند شدن همه خواندن‌ها حتی در cache hit",
        "Every read becomes slower, even on a cache hit",
      ],
      [
        "از دست رفتن داده‌های دیتابیس هنگام restart شدن cache",
        "Losing database data when the cache restarts",
      ],
      [
        "عدم امکان استفاده از index در دیتابیس",
        "The database can no longer use indexes",
      ],
    ],
    a: [
      "cache یک کپی است و ممکن است از منبع اصلی عقب بماند. به همین دلیل باید با TTL، invalidation هنگام نوشتن یا الگوهای دیگر مقدار stale بودن را کنترل کرد.",
      "A cache is a copy and can lag behind the source. Staleness must be bounded with TTLs, invalidation on write or other patterns.",
    ],
  },
  {
    id: "cache-j-what-to-cache",
    level: "junior",
    tags: ["fundamentals"],
    q: [
      "کدام نوع داده بهترین کاندیدا برای cache است؟",
      "Which kind of data is the best candidate for caching?",
    ],
    options: [
      [
        "داده‌ای که زیاد خوانده می‌شود و کم تغییر می‌کند، مثل لیست دسته‌بندی محصولات",
        "Data that's read often and changes rarely, like a product category list",
      ],
      [
        "موجودی لحظه‌ای حساب بانکی که در هر تراکنش تغییر می‌کند",
        "A live bank balance that changes on every transaction",
      ],
      [
        "داده‌ای که فقط یک بار نوشته و هرگز خوانده نمی‌شود",
        "Data that's written once and never read",
      ],
      [
        "توکن یک‌بارمصرف که بلافاصله باطل می‌شود",
        "A one-time token that is invalidated immediately",
      ],
    ],
    a: [
      "cache وقتی بیشترین سود را دارد که نسبت خواندن به نوشتن بالا باشد و کمی stale بودن قابل‌قبول باشد. داده‌ای که مدام تغییر می‌کند یا هرگز تکرار نمی‌شود hit ratio پایینی دارد.",
      "Caching pays off most with a high read-to-write ratio and tolerance for slight staleness. Data that changes constantly or is never re-read yields a poor hit ratio.",
    ],
  },
  {
    id: "cache-j-cc-max-age",
    level: "junior",
    tags: ["http-caching"],
    q: [
      "هدر `Cache-Control: max-age=3600` در پاسخ سرور چه معنایی دارد؟",
      "What does the response header `Cache-Control: max-age=3600` mean?",
    ],
    options: [
      [
        "پاسخ تا ۳۶۰۰ ثانیه تازه (fresh) است و بدون درخواست به سرور قابل استفاده است",
        "The response is fresh for 3600 seconds and can be reused without contacting the server",
      ],
      [
        "سرور باید حداکثر در ۳۶۰۰ میلی‌ثانیه پاسخ دهد",
        "The server must respond within 3600 milliseconds",
      ],
      [
        "پاسخ فقط ۳۶۰۰ بار می‌تواند از cache خوانده شود",
        "The response can be read from cache only 3600 times",
      ],
      [
        "پاسخ هرگز نباید ذخیره شود مگر بعد از ۳۶۰۰ ثانیه",
        "The response must not be stored until 3600 seconds pass",
      ],
    ],
    a: [
      "`max-age` بر حسب ثانیه مشخص می‌کند پاسخ تا چه زمانی fresh است. در این بازه مرورگر یا cacheهای میانی می‌توانند بدون تماس با سرور از نسخه ذخیره‌شده استفاده کنند.",
      "`max-age` sets in seconds how long the response is fresh. During that window browsers and intermediaries may reuse it without contacting the server.",
    ],
  },
  {
    id: "cache-j-no-store",
    level: "junior",
    tags: ["http-caching"],
    q: [
      "برای پاسخی حاوی اطلاعات حساس که نباید در هیچ cacheای ذخیره شود، کدام هدر درست است؟",
      "Which header is correct for a sensitive response that must not be stored in any cache?",
    ],
    options: [
      ["`Cache-Control: no-store`", "`Cache-Control: no-store`"],
      ["`Cache-Control: no-cache`", "`Cache-Control: no-cache`"],
      ["`Cache-Control: max-age=0`", "`Cache-Control: max-age=0`"],
      ["`Cache-Control: public`", "`Cache-Control: public`"],
    ],
    a: [
      "`no-store` یعنی پاسخ اصلاً نباید ذخیره شود. `no-cache` برخلاف اسمش اجازه ذخیره می‌دهد ولی قبل از هر استفاده revalidation با سرور را الزامی می‌کند.",
      "`no-store` means the response must not be stored at all. `no-cache`, despite its name, allows storing but requires revalidation with the server before each use.",
    ],
  },
  {
    id: "cache-j-no-cache-meaning",
    level: "junior",
    tags: ["http-caching"],
    q: [
      "`Cache-Control: no-cache` دقیقاً چه رفتاری را تعیین می‌کند؟",
      "What exactly does `Cache-Control: no-cache` specify?",
    ],
    options: [
      [
        "پاسخ می‌تواند ذخیره شود اما قبل از هر استفاده باید با سرور revalidate شود",
        "The response may be stored but must be revalidated with the server before each use",
      ],
      [
        "پاسخ به هیچ وجه نباید در cache ذخیره شود",
        "The response must never be stored in any cache",
      ],
      [
        "پاسخ فقط در CDN ذخیره شود و نه در مرورگر",
        "The response is stored only in the CDN, not the browser",
      ],
      [
        "پاسخ برای همیشه fresh است و نیازی به بررسی ندارد",
        "The response is fresh forever and never needs checking",
      ],
    ],
    a: [
      "با `no-cache` کلاینت باید با `If-None-Match` یا `If-Modified-Since` از سرور بپرسد؛ اگر تغییری نکرده باشد سرور `304 Not Modified` برمی‌گرداند و body دوباره ارسال نمی‌شود.",
      "With `no-cache` the client must ask the server via `If-None-Match` or `If-Modified-Since`; if unchanged the server returns `304 Not Modified` without resending the body.",
    ],
  },
  {
    id: "cache-j-etag",
    level: "junior",
    tags: ["http-caching", "etag"],
    q: [
      "نقش هدر `ETag` در HTTP caching چیست؟",
      "What is the role of the `ETag` header in HTTP caching?",
    ],
    options: [
      [
        "شناسه نسخه منبع است تا کلاینت با `If-None-Match` بررسی کند تغییر کرده یا نه",
        "It's a version identifier so the client can check for changes via `If-None-Match`",
      ],
      [
        "مدت زمان fresh بودن پاسخ را بر حسب ثانیه مشخص می‌کند",
        "It specifies how many seconds the response stays fresh",
      ],
      [
        "تعیین می‌کند پاسخ در CDN ذخیره شود یا نه",
        "It decides whether the CDN may store the response",
      ],
      [
        "محتوای پاسخ را برای امنیت رمزنگاری می‌کند",
        "It encrypts the response body for security",
      ],
    ],
    a: [
      "سرور یک `ETag` (معمولاً hash یا نسخه محتوا) می‌فرستد. در درخواست بعدی کلاینت `If-None-Match` را می‌فرستد و اگر مقدار برابر باشد سرور با `304` بدون body پاسخ می‌دهد و پهنای باند صرفه‌جویی می‌شود.",
      "The server sends an `ETag` (often a content hash or version). Next time the client sends `If-None-Match`; if it matches, the server replies `304` with no body, saving bandwidth.",
    ],
  },
  {
    id: "cache-j-304",
    level: "junior",
    tags: ["http-caching"],
    q: [
      "کد وضعیت `304 Not Modified` در چه شرایطی برگردانده می‌شود؟",
      "When does a server return `304 Not Modified`?",
    ],
    options: [
      [
        "وقتی درخواست شرطی است و منبع از نسخه‌ای که کلاینت دارد تغییر نکرده",
        "When a conditional request finds the resource unchanged since the client's copy",
      ],
      [
        "وقتی منبع به آدرس دیگری منتقل شده است",
        "When the resource has moved to another URL",
      ],
      [
        "وقتی کلاینت اجازه دسترسی به منبع را ندارد",
        "When the client isn't allowed to access the resource",
      ],
      [
        "وقتی cache سرور پر شده و پاسخ ذخیره نمی‌شود",
        "When the server cache is full and can't store the response",
      ],
    ],
    a: [
      "`304` پاسخ به درخواست‌های شرطی مثل `If-None-Match` یا `If-Modified-Since` است. body ارسال نمی‌شود و کلاینت از نسخه cache‌شده خودش استفاده می‌کند.",
      "`304` answers conditional requests like `If-None-Match` or `If-Modified-Since`. No body is sent and the client reuses its cached copy.",
    ],
  },
  {
    id: "cache-j-private",
    level: "junior",
    tags: ["http-caching", "cdn"],
    q: [
      "`Cache-Control: private` برای چه نوع پاسخی مناسب است؟",
      "What kind of response is `Cache-Control: private` meant for?",
    ],
    options: [
      [
        "پاسخ مخصوص یک کاربر که فقط مرورگر او باید ذخیره کند، نه CDN یا proxy مشترک",
        "User-specific responses that only the user's browser may store, not shared CDNs/proxies",
      ],
      [
        "پاسخی که فقط در CDN ذخیره شود و نه در مرورگر",
        "Responses that should be stored only in the CDN, not the browser",
      ],
      [
        "پاسخی که باید با HTTPS رمزنگاری شود",
        "Responses that must be encrypted with HTTPS",
      ],
      [
        "پاسخی که فقط برای ادمین‌ها قابل مشاهده است",
        "Responses that only admins are allowed to see",
      ],
    ],
    a: [
      "`private` اجازه ذخیره در cache خصوصی (مرورگر) را می‌دهد اما cacheهای مشترک مثل CDN نباید آن را ذخیره کنند. این برای جلوگیری از نمایش داده یک کاربر به کاربر دیگر مهم است.",
      "`private` allows storage in a private cache (the browser) but forbids shared caches like CDNs. This prevents one user's data from being served to another.",
    ],
  },
  {
    id: "cache-j-cdn",
    level: "junior",
    tags: ["cdn", "layers"],
    q: [
      "CDN چگونه سرعت تحویل فایل‌های استاتیک را افزایش می‌دهد؟",
      "How does a CDN speed up delivery of static files?",
    ],
    options: [
      [
        "با cache کردن محتوا در سرورهای edge نزدیک به کاربران",
        "By caching content on edge servers close to users",
      ],
      [
        "با فشرده‌سازی دیتابیس سرور اصلی",
        "By compressing the origin server's database",
      ],
      [
        "با اجرای کد backend داخل مرورگر کاربر",
        "By running backend code inside the user's browser",
      ],
      [
        "با حذف نیاز به DNS برای resolve کردن دامنه",
        "By removing the need for DNS to resolve the domain",
      ],
    ],
    a: [
      "CDN نسخه‌هایی از محتوا را در PoPهای جغرافیایی مختلف نگه می‌دارد، پس فاصله شبکه و latency کم می‌شود و بار از روی origin برداشته می‌شود.",
      "A CDN stores copies of content in geographically distributed PoPs, cutting network distance and latency while offloading the origin.",
    ],
  },
  {
    id: "cache-j-eviction",
    level: "junior",
    tags: ["eviction"],
    q: [
      "eviction در cache به چه معناست؟",
      "What does eviction mean in a cache?",
    ],
    options: [
      [
        "حذف آیتم‌ها برای آزاد کردن فضا وقتی cache به سقف حافظه رسیده",
        "Removing items to free space when the cache hits its memory limit",
      ],
      [
        "انتقال داده‌ها از cache به دیتابیس هنگام نوشتن",
        "Moving data from the cache into the database on write",
      ],
      [
        "رمزنگاری کلیدهای قدیمی برای امنیت بیشتر",
        "Encrypting old keys for extra security",
      ],
      [
        "تکثیر داده‌ها به همه نودهای cluster",
        "Replicating data to every node in the cluster",
      ],
    ],
    a: [
      "حافظه cache محدود است؛ وقتی پر شود باید بر اساس یک سیاست (مثل LRU یا LFU) آیتم‌هایی را حذف کند. این با expiration متفاوت است که بر اساس TTL انجام می‌شود.",
      "Cache memory is limited; when full it must drop items according to a policy (like LRU or LFU). This differs from expiration, which is TTL-driven.",
    ],
  },
  {
    id: "cache-j-lru",
    level: "junior",
    tags: ["eviction", "lru"],
    q: [
      "سیاست LRU کدام آیتم را برای حذف انتخاب می‌کند؟",
      "Which item does the LRU policy choose to evict?",
    ],
    options: [
      [
        "آیتمی که زمان طولانی‌تری از آخرین دسترسی به آن گذشته",
        "The item that hasn't been accessed for the longest time",
      ],
      [
        "آیتمی که کمترین تعداد دفعات دسترسی را داشته",
        "The item accessed the fewest number of times",
      ],
      [
        "آیتمی که زودتر از همه وارد cache شده بدون توجه به دسترسی",
        "The item inserted first, regardless of access",
      ],
      [
        "آیتمی که بزرگ‌ترین حجم را دارد",
        "The item with the largest size",
      ],
    ],
    a: [
      "LRU (Least Recently Used) فرض می‌کند آیتمی که اخیراً استفاده نشده احتمالاً به‌زودی هم استفاده نمی‌شود. حذف بر اساس تعداد دسترسی، LFU و حذف بر اساس ترتیب ورود، FIFO است.",
      "LRU (Least Recently Used) assumes an item not used recently won't be needed soon. Eviction by access count is LFU, and by insertion order is FIFO.",
    ],
  },
  {
    id: "cache-j-lfu-vs-lru",
    level: "junior",
    tags: ["eviction"],
    q: [
      "LFU بر چه اساسی آیتم‌ها را حذف می‌کند؟",
      "On what basis does LFU evict items?",
    ],
    options: [
      [
        "کمترین تعداد (فرکانس) دسترسی",
        "Lowest access frequency",
      ],
      [
        "قدیمی‌ترین زمان آخرین دسترسی",
        "Oldest last-access time",
      ],
      [
        "کمترین TTL باقی‌مانده",
        "Shortest remaining TTL",
      ],
      [
        "انتخاب کاملاً تصادفی",
        "Purely random selection",
      ],
    ],
    a: [
      "LFU (Least Frequently Used) آیتمی را حذف می‌کند که کمتر از همه استفاده شده است. برای داده‌هایی که محبوبیت پایداری دارند معمولاً از LRU بهتر عمل می‌کند.",
      "LFU (Least Frequently Used) evicts the item used least often. It often beats LRU when popularity is stable over time.",
    ],
  },
  {
    id: "cache-j-fifo",
    level: "junior",
    tags: ["eviction"],
    q: [
      "ضعف اصلی سیاست FIFO در eviction چیست؟",
      "What is the main weakness of FIFO eviction?",
    ],
    options: [
      [
        "ممکن است آیتم پرکاربرد را فقط چون زودتر وارد شده حذف کند",
        "It may evict a hot item just because it was inserted early",
      ],
      [
        "نیاز به شمارش دقیق دسترسی‌ها دارد که پرهزینه است",
        "It requires exact access counting, which is expensive",
      ],
      [
        "هرگز هیچ آیتمی را حذف نمی‌کند",
        "It never evicts anything",
      ],
      [
        "فقط روی کلیدهای دارای TTL کار می‌کند",
        "It only works on keys with a TTL",
      ],
    ],
    a: [
      "FIFO فقط به ترتیب ورود نگاه می‌کند و الگوی دسترسی را نادیده می‌گیرد؛ پس یک کلید بسیار پرتکرار ممکن است حذف شود. پیاده‌سازی آن ساده است ولی hit ratio معمولاً پایین‌تری دارد.",
      "FIFO looks only at insertion order and ignores access patterns, so a very hot key may be evicted. It's simple but usually yields a lower hit ratio.",
    ],
  },
  {
    id: "cache-j-in-memory-local",
    level: "junior",
    tags: ["local-cache", "distributed-cache"],
    q: [
      "مشکل اصلی cache درون‌حافظه‌ای محلی (مثلاً یک Map در هر instance) وقتی چند instance از سرویس اجرا می‌شود چیست؟",
      "What is the main problem with a local in-memory cache (e.g. a Map per instance) when running several instances?",
    ],
    options: [
      [
        "هر instance کپی جداگانه دارد و داده‌ها بین آن‌ها ناسازگار می‌شوند",
        "Each instance has its own copy, so data becomes inconsistent across them",
      ],
      [
        "دسترسی به آن از Redis کندتر است",
        "Accessing it is slower than Redis",
      ],
      [
        "امکان تنظیم TTL برای آن وجود ندارد",
        "It's impossible to set TTLs on it",
      ],
      [
        "فقط در زبان‌های کامپایلی قابل پیاده‌سازی است",
        "It can only be implemented in compiled languages",
      ],
    ],
    a: [
      "cache محلی بسیار سریع است چون سفر شبکه ندارد، اما invalidation روی یک instance به بقیه نمی‌رسد و حافظه هم تکراری مصرف می‌شود. cache توزیع‌شده مثل Redis یک نسخه مشترک ارائه می‌دهد.",
      "A local cache is very fast with no network hop, but invalidating on one instance doesn't reach the others and memory is duplicated. A distributed cache like Redis offers one shared copy.",
    ],
  },
  {
    id: "cache-j-redis-volatile",
    level: "junior",
    tags: ["redis", "persistence"],
    q: [
      "اگر Redis بدون هیچ تنظیم persistence ری‌استارت شود، چه اتفاقی برای داده‌ها می‌افتد؟",
      "If Redis restarts with persistence fully disabled, what happens to the data?",
    ],
    options: [
      [
        "همه داده‌ها از بین می‌روند چون فقط در RAM بودند",
        "All data is lost because it lived only in RAM",
      ],
      [
        "داده‌ها به‌طور خودکار از دیتابیس اصلی بازیابی می‌شوند",
        "Data is automatically restored from the primary database",
      ],
      [
        "فقط کلیدهای بدون TTL حفظ می‌شوند",
        "Only keys without a TTL are preserved",
      ],
      [
        "Redis بدون persistence اصلاً اجرا نمی‌شود",
        "Redis refuses to start without persistence",
      ],
    ],
    a: [
      "Redis درون‌حافظه‌ای است و بدون RDB یا AOF چیزی روی دیسک نمی‌ماند. برای cache خالص این معمولاً قابل‌قبول است چون داده از منبع اصلی دوباره ساخته می‌شود.",
      "Redis is in-memory, and without RDB or AOF nothing survives on disk. For a pure cache that's often acceptable since data is rebuilt from the source.",
    ],
  },
  {
    id: "cache-j-key-naming",
    level: "junior",
    tags: ["redis", "best-practices"],
    q: [
      "کدام قرارداد نام‌گذاری کلید در Redis رایج و توصیه‌شده است؟",
      "Which Redis key naming convention is common and recommended?",
    ],
    options: [
      [
        "استفاده از namespace با دونقطه، مثل `user:42:profile`",
        "Colon-separated namespaces, like `user:42:profile`",
      ],
      [
        "استفاده از عدد تصادفی بدون پیشوند برای هر کلید",
        "Random numbers without prefixes for each key",
      ],
      [
        "قرار دادن کل مقدار JSON داخل نام کلید",
        "Putting the whole JSON value inside the key name",
      ],
      [
        "استفاده از نام‌های بسیار طولانی شامل timestamp کامل",
        "Very long names that include a full timestamp",
      ],
    ],
    a: [
      "namespace مثل `object:id:field` کلیدها را خوانا، قابل‌جست‌وجو با `SCAN MATCH` و قابل‌مدیریت می‌کند. کلیدها باید کوتاه ولی گویا باشند تا حافظه هدر نرود.",
      "Namespaces like `object:id:field` make keys readable, scannable with `SCAN MATCH` and manageable. Keep them short but descriptive to save memory.",
    ],
  },
  {
    id: "cache-j-keys-danger",
    level: "junior",
    tags: ["redis", "commands", "production"],
    q: [
      "چرا اجرای `KEYS *` روی Redis production خطرناک است؟",
      "Why is running `KEYS *` on a production Redis dangerous?",
    ],
    options: [
      [
        "همه کلیدها را در یک عملیات O(N) پیمایش می‌کند و سرور تک‌نخی را block می‌کند",
        "It walks every key in one O(N) call and blocks the single-threaded server",
      ],
      [
        "همه کلیدها را بعد از نمایش حذف می‌کند",
        "It deletes all keys after listing them",
      ],
      [
        "TTL همه کلیدها را ریست می‌کند",
        "It resets the TTL of every key",
      ],
      [
        "فقط روی replica کار می‌کند و روی master خطا می‌دهد",
        "It works only on replicas and errors on the master",
      ],
    ],
    a: [
      "با میلیون‌ها کلید، `KEYS` تا پایان پیمایش همه درخواست‌های دیگر را متوقف می‌کند. به‌جای آن از `SCAN` استفاده کنید که به‌صورت تدریجی و با cursor کار می‌کند.",
      "With millions of keys, `KEYS` stalls all other requests until it finishes. Use `SCAN`, which iterates incrementally with a cursor.",
    ],
  },
  {
    id: "cache-j-exists",
    level: "junior",
    tags: ["redis", "commands"],
    q: [
      "دستور `EXISTS user:1` در صورت وجود کلید چه برمی‌گرداند؟",
      "What does `EXISTS user:1` return if the key exists?",
    ],
    options: [["`1`", "`1`"], ["`OK`", "`OK`"], ["مقدار کلید", "The key's value"], ["`true`", "`true`"]],
    a: [
      "`EXISTS` تعداد کلیدهای موجود از میان کلیدهای داده‌شده را برمی‌گرداند؛ برای یک کلید موجود `1` و برای ناموجود `0`.",
      "`EXISTS` returns how many of the given keys exist: `1` for one existing key, `0` if missing.",
    ],
  },
  {
    id: "cache-j-session-store",
    level: "junior",
    tags: ["redis", "sessions"],
    q: [
      "چرا Redis انتخاب رایجی برای ذخیره session کاربران در سرویس‌های چند-instance است؟",
      "Why is Redis a common choice for storing user sessions in multi-instance services?",
    ],
    options: [
      [
        "همه instanceها به یک store مشترک و سریع دسترسی دارند و TTL هم داخلی است",
        "All instances share one fast store, and TTL support is built in",
      ],
      [
        "Redis به‌طور خودکار session را در cookie مرورگر ذخیره می‌کند",
        "Redis automatically stores the session in the browser cookie",
      ],
      [
        "Redis تنها دیتابیسی است که از رمزنگاری پشتیبانی می‌کند",
        "Redis is the only database that supports encryption",
      ],
      [
        "با Redis نیازی به احراز هویت کاربر نیست",
        "With Redis, user authentication isn't needed",
      ],
    ],
    a: [
      "اگر session در حافظه یک instance باشد، load balancer باید sticky باشد. با Redis هر instance می‌تواند session را بخواند و `EXPIRE` انقضای خودکار session را مدیریت می‌کند.",
      "If sessions live in one instance's memory, the load balancer must be sticky. With Redis any instance can read the session, and `EXPIRE` handles automatic timeout.",
    ],
  },
  {
    id: "cache-j-write-through",
    level: "junior",
    tags: ["strategies", "write-through"],
    q: [
      "در الگوی write-through هنگام نوشتن چه اتفاقی می‌افتد؟",
      "In the write-through pattern, what happens on a write?",
    ],
    options: [
      [
        "داده هم‌زمان در cache و دیتابیس نوشته می‌شود و سپس پاسخ برمی‌گردد",
        "Data is written to both the cache and the DB synchronously before acknowledging",
      ],
      [
        "داده فقط در cache نوشته و بعداً به‌صورت async به دیتابیس منتقل می‌شود",
        "Data is written only to the cache and flushed to the DB asynchronously later",
      ],
      [
        "داده فقط در دیتابیس نوشته می‌شود و cache دست نمی‌خورد",
        "Data is written only to the DB and the cache is untouched",
      ],
      [
        "کل cache پس از هر نوشتن پاک می‌شود",
        "The entire cache is flushed after every write",
      ],
    ],
    a: [
      "write-through cache را همیشه با دیتابیس همگام نگه می‌دارد، اما latency نوشتن بیشتر می‌شود. حالت async آن write-behind و نوشتن فقط در دیتابیس write-around نام دارد.",
      "Write-through keeps the cache in sync with the DB at the cost of higher write latency. The async variant is write-behind; writing only to the DB is write-around.",
    ],
  },
  {
    id: "cache-j-invalidate-on-update",
    level: "junior",
    tags: ["invalidation", "cache-aside"],
    q: [
      "در cache-aside، پس از به‌روزرسانی یک رکورد در دیتابیس، رایج‌ترین کار با کلید cache آن چیست؟",
      "In cache-aside, after updating a record in the DB, what's the most common action on its cache key?",
    ],
    options: [
      [
        "حذف (invalidate) کلید تا خواندن بعدی مقدار تازه را بارگذاری کند",
        "Delete (invalidate) the key so the next read loads the fresh value",
      ],
      [
        "تمدید TTL کلید فعلی بدون تغییر مقدار",
        "Extend the current key's TTL without changing its value",
      ],
      [
        "اجرای `FLUSHALL` برای پاک کردن کل cache",
        "Run `FLUSHALL` to wipe the whole cache",
      ],
      [
        "هیچ کاری، چون cache خودش تغییر را تشخیص می‌دهد",
        "Nothing, since the cache detects the change by itself",
      ],
    ],
    a: [
      "حذف کلید ساده و امن‌تر از به‌روزرسانی آن است، چون از نوشتن مقدار اشتباه در شرایط هم‌زمانی جلوگیری می‌کند. خواندن بعدی miss می‌شود و مقدار تازه را cache می‌کند.",
      "Deleting the key is simpler and safer than updating it, avoiding writing wrong values under concurrency. The next read misses and caches the fresh value.",
    ],
  },
  {
    id: "cache-j-cold-cache",
    level: "junior",
    tags: ["fundamentals"],
    q: [
      "cold cache به چه وضعیتی گفته می‌شود؟",
      "What is a cold cache?",
    ],
    options: [
      [
        "cacheای که خالی است (مثلاً پس از restart) و بیشتر درخواست‌ها miss می‌شوند",
        "An empty cache (e.g. after a restart) where most requests miss",
      ],
      [
        "cacheای که روی سرور با دمای پایین اجرا می‌شود",
        "A cache running on a low-temperature server",
      ],
      [
        "cacheای که فقط داده‌های قدیمی را نگه می‌دارد",
        "A cache that stores only archived data",
      ],
      [
        "cacheای که فقط خواندنی است و نوشتن نمی‌پذیرد",
        "A read-only cache that rejects writes",
      ],
    ],
    a: [
      "پس از deploy یا restart، cache خالی است و ناگهان همه بار به دیتابیس می‌رسد. برای همین گاهی cache warming انجام می‌دهند تا کلیدهای پرکاربرد از قبل بارگذاری شوند.",
      "After a deploy or restart the cache is empty and all load hits the DB. Cache warming preloads hot keys to avoid this.",
    ],
  },
  {
    id: "cache-j-serialization",
    level: "junior",
    tags: ["redis", "best-practices"],
    q: [
      "برای ذخیره یک شیء JavaScript در Redis به‌صورت string چه باید کرد؟",
      "How do you store a JavaScript object in Redis as a string?",
    ],
    options: [
      [
        "آن را با `JSON.stringify` سریالایز و هنگام خواندن با `JSON.parse` بازسازی کنید",
        "Serialize with `JSON.stringify` and rebuild with `JSON.parse` on read",
      ],
      [
        "شیء را مستقیماً پاس دهید؛ Redis خودش آن را به JSON تبدیل می‌کند",
        "Pass the object directly; Redis converts it to JSON itself",
      ],
      [
        "از `toString()` استفاده کنید تا همه فیلدها ذخیره شوند",
        "Use `toString()` so all fields are kept",
      ],
      [
        "Redis اجازه ذخیره داده غیرعددی را نمی‌دهد",
        "Redis doesn't allow storing non-numeric data",
      ],
    ],
    a: [
      "مقدار string در Redis یک آرایه بایت است و ساختار شیء را نمی‌فهمد. `toString()` روی شیء معمولاً `[object Object]` می‌دهد؛ پس باید سریالایز صریح (JSON، MessagePack و...) انجام داد.",
      "A Redis string is a byte array and knows nothing about object structure. `toString()` on an object yields `[object Object]`, so serialize explicitly (JSON, MessagePack, etc.).",
    ],
  },
  {
    id: "cache-j-memcached",
    level: "junior",
    tags: ["memcached", "redis"],
    q: [
      "تفاوت اصلی Memcached با Redis چیست؟",
      "What is the main difference between Memcached and Redis?",
    ],
    options: [
      [
        "Memcached فقط key-value ساده string دارد ولی Redis ساختارهای داده و persistence دارد",
        "Memcached offers only plain string key-value; Redis adds data structures and persistence",
      ],
      [
        "Memcached روی دیسک و Redis در حافظه ذخیره می‌کند",
        "Memcached stores on disk while Redis stores in memory",
      ],
      [
        "Memcached از TTL پشتیبانی نمی‌کند",
        "Memcached doesn't support TTLs",
      ],
      [
        "Redis فقط روی Windows اجرا می‌شود",
        "Redis only runs on Windows",
      ],
    ],
    a: [
      "هر دو درون‌حافظه‌ای‌اند و TTL دارند، اما Memcached یک cache ساده و چندنخی برای blobهاست. Redis نوع‌های داده غنی، persistence، replication، pub/sub و Lua را هم ارائه می‌دهد.",
      "Both are in-memory with TTLs, but Memcached is a simple multithreaded blob cache. Redis also provides rich types, persistence, replication, pub/sub and Lua.",
    ],
  },
  {
    id: "cache-j-mget",
    level: "junior",
    tags: ["redis", "performance"],
    q: [
      "چرا خواندن ۱۰۰ کلید با یک `MGET` بهتر از ۱۰۰ بار `GET` جداگانه است؟",
      "Why is reading 100 keys with one `MGET` better than 100 separate `GET`s?",
    ],
    options: [
      [
        "فقط یک round-trip شبکه انجام می‌شود و latency کل کاهش می‌یابد",
        "Only one network round-trip is made, reducing total latency",
      ],
      [
        "`MGET` داده‌ها را فشرده می‌کند و حافظه کمتری می‌گیرد",
        "`MGET` compresses data and uses less memory",
      ],
      [
        "`MGET` از cache مرورگر هم می‌خواند",
        "`MGET` also reads from the browser cache",
      ],
      [
        "`GET` فقط روی replica کار می‌کند",
        "`GET` only works on replicas",
      ],
    ],
    a: [
      "در Redis معمولاً هزینه اصلی round-trip شبکه است نه اجرای دستور. دستورهای چندکلیدی مثل `MGET`/`MSET` یا pipelining این هزینه را تجمیع می‌کنند.",
      "In Redis the dominant cost is usually the network round-trip, not command execution. Multi-key commands like `MGET`/`MSET` or pipelining amortize it.",
    ],
  },
  {
    id: "cache-j-db-buffer-pool",
    level: "junior",
    tags: ["layers", "database"],
    q: [
      "buffer pool در دیتابیس‌هایی مثل PostgreSQL یا MySQL چه نقشی دارد؟",
      "What role does the buffer pool play in databases like PostgreSQL or MySQL?",
    ],
    options: [
      [
        "صفحات داده و index پرکاربرد را در RAM نگه می‌دارد تا خواندن از دیسک کم شود",
        "Keeps hot data and index pages in RAM to reduce disk reads",
      ],
      [
        "نتیجه کامل queryها را برای کلاینت‌ها cache می‌کند",
        "Caches complete query results for clients",
      ],
      [
        "اتصال‌های شبکه کلاینت‌ها را مدیریت می‌کند",
        "Manages client network connections",
      ],
      [
        "backupهای روزانه را در حافظه نگه می‌دارد",
        "Holds daily backups in memory",
      ],
    ],
    a: [
      "دیتابیس‌ها خودشان یک لایه cache داخلی برای pageها دارند (مثل `shared_buffers` یا InnoDB buffer pool). این cache نتیجه query نیست بلکه بلوک‌های داده روی دیسک است.",
      "Databases have their own internal page cache (e.g. `shared_buffers` or the InnoDB buffer pool). It caches on-disk data blocks, not query results.",
    ],
  },
  {
    id: "cache-j-pubsub-basic",
    level: "junior",
    tags: ["redis", "pub-sub"],
    q: [
      "در Redis Pub/Sub اگر هنگام `PUBLISH` هیچ subscriberای وصل نباشد، پیام چه می‌شود؟",
      "In Redis Pub/Sub, what happens to a message if no subscriber is connected at `PUBLISH` time?",
    ],
    options: [
      [
        "پیام از بین می‌رود و ذخیره نمی‌شود",
        "The message is dropped and not stored",
      ],
      [
        "تا اتصال اولین subscriber در صف می‌ماند",
        "It is queued until the first subscriber connects",
      ],
      [
        "در یک Stream به‌طور خودکار ذخیره می‌شود",
        "It is automatically stored in a Stream",
      ],
      [
        "Redis خطا برمی‌گرداند و پیام را رد می‌کند",
        "Redis returns an error and rejects it",
      ],
    ],
    a: [
      "Pub/Sub در Redis مدل fire-and-forget دارد و پیام فقط به subscriberهای متصل فعلی می‌رسد. اگر به ماندگاری و replay نیاز دارید از Redis Streams استفاده کنید.",
      "Redis Pub/Sub is fire-and-forget: messages reach only currently connected subscribers. For durability and replay, use Redis Streams.",
    ],
  },
  {
    id: "cache-j-setnx",
    level: "junior",
    tags: ["redis", "commands"],
    q: [
      "گزینه `NX` در `SET key value NX` چه کاری انجام می‌دهد؟",
      "What does the `NX` option do in `SET key value NX`?",
    ],
    options: [
      [
        "مقدار را فقط اگر کلید وجود نداشته باشد تنظیم می‌کند",
        "Sets the value only if the key does not already exist",
      ],
      [
        "مقدار را فقط اگر کلید از قبل وجود داشته باشد تنظیم می‌کند",
        "Sets the value only if the key already exists",
      ],
      [
        "کلید را بدون TTL و برای همیشه ذخیره می‌کند",
        "Stores the key with no TTL, forever",
      ],
      [
        "مقدار قبلی را برمی‌گرداند و کلید را حذف می‌کند",
        "Returns the old value and deletes the key",
      ],
    ],
    a: [
      "`NX` یعنی Not eXists و `XX` یعنی فقط اگر وجود دارد. `SET key val NX EX 30` پایه پیاده‌سازی lock ساده و جلوگیری از پردازش تکراری است.",
      "`NX` means Not eXists, while `XX` means only if it exists. `SET key val NX EX 30` is the basis of simple locks and deduplication.",
    ],
  },
  {
    id: "cache-j-cache-key-params",
    level: "junior",
    tags: ["best-practices"],
    q: [
      "برای cache کردن نتیجه endpoint `GET /products?page=2&sort=price`، کلید cache چه باید باشد؟",
      "When caching `GET /products?page=2&sort=price`, what should the cache key include?",
    ],
    options: [
      [
        "همه پارامترهای مؤثر در نتیجه، مثل `products:page=2:sort=price`",
        "All parameters that affect the result, e.g. `products:page=2:sort=price`",
      ],
      [
        "فقط `products` چون مسیر یکسان است",
        "Just `products`, since the path is the same",
      ],
      [
        "یک UUID تصادفی برای هر درخواست",
        "A random UUID for each request",
      ],
      [
        "فقط timestamp درخواست",
        "Only the request timestamp",
      ],
    ],
    a: [
      "اگر پارامتری روی پاسخ اثر دارد اما در کلید نباشد، کاربران نتیجه اشتباه می‌بینند. کلید تصادفی هم باعث می‌شود هیچ hitای رخ ندهد؛ بهتر است پارامترها را normalize (مثلاً مرتب) کنید.",
      "If a parameter affects the response but isn't in the key, users get wrong results. A random key means zero hits; normalize (e.g. sort) parameters when building keys.",
    ],
  },
  {
    id: "cache-j-negative-ttl-zero",
    level: "junior",
    tags: ["ttl"],
    q: [
      "انتخاب TTL خیلی طولانی برای داده‌ای که گاهی تغییر می‌کند چه پیامدی دارد؟",
      "What is the consequence of a very long TTL for data that changes occasionally?",
    ],
    options: [
      [
        "hit ratio بالا می‌رود ولی کاربران مدت طولانی‌تری داده stale می‌بینند",
        "Hit ratio rises, but users see stale data for longer",
      ],
      [
        "hit ratio پایین می‌آید و دیتابیس بار بیشتری می‌گیرد",
        "Hit ratio drops and the DB gets more load",
      ],
      [
        "Redis کلید را رد می‌کند چون TTL حداکثر یک ساعت است",
        "Redis rejects the key since the max TTL is one hour",
      ],
      [
        "هیچ اثری ندارد چون TTL فقط برای امنیت است",
        "No effect, as TTL is only for security",
      ],
    ],
    a: [
      "انتخاب TTL یک trade-off بین تازگی داده و hit ratio است. TTL طولانی بار دیتابیس را کم می‌کند ولی بدون invalidation صریح، تغییرات دیرتر دیده می‌شوند.",
      "TTL is a trade-off between freshness and hit ratio. Long TTLs cut DB load, but without explicit invalidation changes show up later.",
    ],
  },
  {
    id: "cache-j-reverse-proxy",
    level: "junior",
    tags: ["layers", "http-caching"],
    q: [
      "کدام ابزار نمونه‌ای از reverse proxy cache جلوی سرور برنامه است؟",
      "Which tool is an example of a reverse proxy cache in front of an app server?",
    ],
    options: [
      ["Varnish یا Nginx با `proxy_cache`", "Varnish or Nginx with `proxy_cache`"],
      ["PostgreSQL", "PostgreSQL"],
      ["Kafka", "Kafka"],
      ["Elasticsearch", "Elasticsearch"],
    ],
    a: [
      "reverse proxyهایی مثل Varnish یا Nginx پاسخ‌های HTTP را بر اساس هدرهای cache ذخیره می‌کنند و بدون رسیدن درخواست به برنامه پاسخ می‌دهند.",
      "Reverse proxies like Varnish or Nginx store HTTP responses based on cache headers and serve them without hitting the application.",
    ],
  },
  {
    id: "cache-j-redis-db-not-primary",
    level: "junior",
    tags: ["redis", "fundamentals"],
    q: [
      "چرا معمولاً نباید Redis تنها محل ذخیره داده‌های حیاتی مثل سفارش‌های مالی باشد؟",
      "Why shouldn't Redis usually be the only store for critical data like financial orders?",
    ],
    options: [
      [
        "چون داده در RAM است و بسته به تنظیمات persistence ممکن است در crash از دست برود",
        "Data lives in RAM and, depending on persistence settings, may be lost on a crash",
      ],
      [
        "چون Redis نمی‌تواند عدد ذخیره کند",
        "Because Redis can't store numbers",
      ],
      [
        "چون Redis فقط ۱۰۰ کلید را پشتیبانی می‌کند",
        "Because Redis supports only 100 keys",
      ],
      [
        "چون خواندن از Redis از دیتابیس رابطه‌ای کندتر است",
        "Because reading Redis is slower than a relational DB",
      ],
    ],
    a: [
      "حتی با AOF و `appendfsync everysec` ممکن است تا حدود یک ثانیه داده از دست برود، و replication هم async است. داده‌های حیاتی باید در یک دیتابیس durable با تراکنش نگه‌داری شوند.",
      "Even with AOF and `appendfsync everysec` up to ~1 second can be lost, and replication is async. Critical data belongs in a durable transactional database.",
    ],
  },
  {
    id: "cache-j-browser-cache-static",
    level: "junior",
    tags: ["http-caching"],
    q: [
      "برای فایل‌های استاتیک با نام hashدار مثل `app.3f9a1c.js` چه هدری مناسب است؟",
      "Which header suits fingerprinted static files like `app.3f9a1c.js`?",
    ],
    options: [
      [
        "`Cache-Control: public, max-age=31536000, immutable`",
        "`Cache-Control: public, max-age=31536000, immutable`",
      ],
      ["`Cache-Control: no-store`", "`Cache-Control: no-store`"],
      ["`Cache-Control: no-cache`", "`Cache-Control: no-cache`"],
      ["`Cache-Control: private, max-age=0`", "`Cache-Control: private, max-age=0`"],
    ],
    a: [
      "چون هر تغییر محتوا نام فایل را عوض می‌کند، می‌توان آن را یک سال cache کرد. `immutable` به مرورگر می‌گوید حتی هنگام reload هم revalidate نکند.",
      "Since any content change produces a new filename, the file can be cached for a year. `immutable` tells browsers not to revalidate even on reload.",
    ],
  },
]);
