import { build } from "../build";

export const cachingMiddle = build("caching", [
  {
    id: "cache-m-read-through",
    level: "middle",
    tags: ["strategies", "read-through"],
    q: [
      "تفاوت اصلی read-through با cache-aside چیست؟",
      "What is the main difference between read-through and cache-aside?",
    ],
    options: [
      [
        "در read-through خود لایه cache در صورت miss داده را از منبع بارگذاری می‌کند، نه کد برنامه",
        "In read-through the cache layer itself loads from the source on a miss, not the app code",
      ],
      [
        "در read-through داده هم‌زمان در cache و دیتابیس نوشته می‌شود",
        "In read-through data is written to both cache and DB at once",
      ],
      [
        "read-through هیچ‌وقت TTL ندارد ولی cache-aside دارد",
        "Read-through never has TTLs while cache-aside does",
      ],
      [
        "read-through فقط برای cache مرورگر استفاده می‌شود",
        "Read-through is only used for browser caches",
      ],
    ],
    a: [
      "در read-through برنامه فقط با cache صحبت می‌کند و cache با یک loader (مثلاً در Caffeine یا یک کتابخانه) miss را پر می‌کند. در cache-aside منطق بارگذاری در کد برنامه است.",
      "With read-through the app only talks to the cache, which fills misses via a loader (e.g. Caffeine or a library). In cache-aside the loading logic lives in application code.",
    ],
  },
  {
    id: "cache-m-write-behind",
    level: "middle",
    tags: ["strategies", "write-behind"],
    q: [
      "ریسک اصلی الگوی write-behind (write-back) چیست؟",
      "What is the main risk of the write-behind (write-back) pattern?",
    ],
    options: [
      [
        "اگر cache قبل از flush به دیتابیس از کار بیفتد، نوشتن‌ها از دست می‌روند",
        "If the cache fails before flushing to the DB, writes are lost",
      ],
      [
        "latency نوشتن بسیار بالا می‌رود چون منتظر دیتابیس می‌ماند",
        "Write latency becomes very high since it waits on the DB",
      ],
      [
        "خواندن‌ها همیشه miss می‌شوند",
        "Reads always miss",
      ],
      [
        "امکان batch کردن نوشتن‌ها وجود ندارد",
        "Writes can't be batched",
      ],
    ],
    a: [
      "write-behind نوشتن را فوراً در cache تأیید و بعداً به‌صورت async (و اغلب batch) به دیتابیس منتقل می‌کند. throughput نوشتن بالاست ولی durability و consistency ضعیف‌تر می‌شود.",
      "Write-behind acknowledges writes in the cache and flushes them to the DB asynchronously (often batched). Write throughput is high but durability and consistency weaken.",
    ],
  },
  {
    id: "cache-m-write-around",
    level: "middle",
    tags: ["strategies", "write-around"],
    q: [
      "write-around برای چه سناریویی مناسب است؟",
      "Which scenario is write-around suited for?",
    ],
    options: [
      [
        "داده‌ای که نوشته می‌شود ولی احتمالاً به‌زودی خوانده نمی‌شود، مثل logها",
        "Data that's written but unlikely to be read soon, like logs",
      ],
      [
        "داده‌ای که بلافاصله پس از نوشتن بارها خوانده می‌شود",
        "Data read many times right after being written",
      ],
      [
        "وقتی نیاز است cache و دیتابیس همیشه هم‌زمان باشند",
        "When the cache and DB must always be in sync",
      ],
      [
        "وقتی دیتابیس در دسترس نیست",
        "When the database is unavailable",
      ],
    ],
    a: [
      "در write-around نوشتن مستقیماً به دیتابیس می‌رود و cache را دور می‌زند تا cache با داده‌های کم‌استفاده آلوده نشود. اولین خواندن بعد از نوشتن miss خواهد بود.",
      "Write-around sends writes straight to the DB, bypassing the cache so it isn't polluted with rarely read data. The first read after a write will miss.",
    ],
  },
  {
    id: "cache-m-refresh-ahead",
    level: "middle",
    tags: ["strategies", "refresh-ahead"],
    q: [
      "الگوی refresh-ahead چه مشکلی را کاهش می‌دهد؟",
      "What problem does refresh-ahead mitigate?",
    ],
    options: [
      [
        "latency ناشی از miss هنگام انقضای کلیدهای پرکاربرد، با تازه‌سازی قبل از انقضا",
        "Miss latency when hot keys expire, by refreshing them before expiry",
      ],
      [
        "از دست رفتن نوشتن‌ها هنگام crash شدن cache",
        "Lost writes when the cache crashes",
      ],
      [
        "مصرف بیش از حد حافظه توسط big keyها",
        "Excessive memory usage by big keys",
      ],
      [
        "ناسازگاری بین replicaهای Redis",
        "Inconsistency between Redis replicas",
      ],
    ],
    a: [
      "در refresh-ahead وقتی کلیدی نزدیک انقضاست و دسترسی دارد، در پس‌زمینه دوباره بارگذاری می‌شود تا کاربر هرگز miss را تجربه نکند. اگر پیش‌بینی اشتباه باشد منابع هدر می‌رود.",
      "Refresh-ahead reloads a key in the background when it's accessed near expiry, so users don't hit a miss. Wrong predictions waste resources.",
    ],
  },
  {
    id: "cache-m-delete-vs-update",
    level: "middle",
    tags: ["invalidation", "consistency"],
    q: [
      "چرا هنگام نوشتن، حذف کلید cache معمولاً از به‌روزرسانی (SET) آن امن‌تر است؟",
      "Why is deleting the cache key on write usually safer than updating (SET) it?",
    ],
    options: [
      [
        "با نوشتن‌های هم‌زمان، SETها ممکن است با ترتیب اشتباه برسند و مقدار قدیمی در cache بماند",
        "With concurrent writers, SETs can land out of order and leave an old value cached",
      ],
      [
        "چون `DEL` در Redis سریع‌تر از `SET` اجرا می‌شود",
        "Because `DEL` runs faster than `SET` in Redis",
      ],
      [
        "چون SET باعث پاک شدن TTL همه کلیدها می‌شود",
        "Because SET clears the TTL of every key",
      ],
      [
        "چون حذف کلید replication را غیرفعال می‌کند",
        "Because deleting disables replication",
      ],
    ],
    a: [
      "اگر دو درخواست A و B به‌ترتیب در دیتابیس بنویسند ولی SET مربوط به B زودتر از A به cache برسد، cache مقدار A را نگه می‌دارد که با دیتابیس فرق دارد. حذف idempotent است و خواندن بعدی مقدار درست را می‌آورد.",
      "If writers A then B update the DB but B's SET reaches the cache before A's, the cache ends up with A's stale value. Deleting is idempotent and the next read loads the correct value.",
    ],
  },
  {
    id: "cache-m-order-db-then-delete",
    level: "middle",
    tags: ["invalidation", "consistency"],
    q: [
      "در cache-aside کدام ترتیب هنگام نوشتن رایج‌تر و کم‌خطرتر است؟",
      "In cache-aside, which write order is more common and less risky?",
    ],
    options: [
      [
        "ابتدا دیتابیس را به‌روز کن، سپس کلید cache را حذف کن",
        "Update the DB first, then delete the cache key",
      ],
      [
        "ابتدا کلید cache را حذف کن، سپس دیتابیس را به‌روز کن",
        "Delete the cache key first, then update the DB",
      ],
      [
        "ابتدا cache را به‌روز کن، سپس دیتابیس را",
        "Update the cache first, then the DB",
      ],
      [
        "فقط cache را به‌روز کن و دیتابیس را شبانه همگام کن",
        "Only update the cache and sync the DB nightly",
      ],
    ],
    a: [
      "اگر اول cache حذف شود، یک خواننده هم‌زمان ممکن است قبل از commit مقدار قدیمی را از دیتابیس بخواند و دوباره cache کند. ترتیب «DB سپس delete» این پنجره را بسیار کوچک‌تر می‌کند، هرچند صفر نمی‌کند.",
      "If you delete first, a concurrent reader may load the old DB value before commit and re-cache it. 'DB then delete' shrinks that window greatly, though not to zero.",
    ],
  },
  {
    id: "cache-m-double-delete",
    level: "middle",
    tags: ["invalidation", "consistency"],
    q: [
      "هدف از تکنیک delayed double-delete چیست؟",
      "What is the purpose of the delayed double-delete technique?",
    ],
    options: [
      [
        "حذف دوباره کلید پس از تأخیری کوتاه تا مقدار stale که خواننده هم‌زمان cache کرده پاک شود",
        "Deleting the key again after a short delay to purge a stale value re-cached by a concurrent reader",
      ],
      [
        "حذف کلید از دو cluster مختلف به‌طور هم‌زمان",
        "Deleting the key from two different clusters simultaneously",
      ],
      [
        "دو بار نوشتن داده در دیتابیس برای اطمینان از durability",
        "Writing data to the DB twice for durability",
      ],
      [
        "حذف کلید و replica آن با یک دستور",
        "Deleting a key and its replica with one command",
      ],
    ],
    a: [
      "روند: حذف cache، به‌روزرسانی DB، سپس پس از چند صد میلی‌ثانیه (بیشتر از زمان یک read+set معمولی) حذف دوباره. این race بین خواننده و نویسنده را تا حد زیادی پوشش می‌دهد.",
      "Flow: delete cache, update DB, then after a few hundred ms (longer than a typical read+set) delete again. This covers most reader/writer races.",
    ],
  },
  {
    id: "cache-m-stampede",
    level: "middle",
    tags: ["stampede"],
    q: [
      "cache stampede (thundering herd) چیست؟",
      "What is a cache stampede (thundering herd)?",
    ],
    options: [
      [
        "انقضای یک کلید پرکاربرد باعث می‌شود تعداد زیادی درخواست هم‌زمان miss شوند و همه به دیتابیس بروند",
        "A hot key expires and many concurrent requests miss and all hit the database",
      ],
      [
        "درخواست‌ها برای کلیدهایی که هرگز وجود ندارند به دیتابیس می‌رسند",
        "Requests for keys that never exist keep hitting the DB",
      ],
      [
        "Redis به‌خاطر پر شدن حافظه همه کلیدها را حذف می‌کند",
        "Redis evicts all keys because memory is full",
      ],
      [
        "replicaها از master عقب می‌مانند",
        "Replicas fall behind the master",
      ],
    ],
    a: [
      "وقتی کلید داغ منقضی می‌شود، صدها درخواست هم‌زمان همان query سنگین را اجرا می‌کنند و ممکن است دیتابیس از پا بیفتد. lock، request coalescing و probabilistic early expiration راه‌حل‌های رایج‌اند.",
      "When a hot key expires, hundreds of concurrent requests run the same heavy query and can overwhelm the DB. Locks, request coalescing and probabilistic early expiration are common fixes.",
    ],
  },
  {
    id: "cache-m-stampede-lock",
    level: "middle",
    tags: ["stampede", "locks"],
    q: [
      "چگونه می‌توان با Redis از stampede روی یک کلید جلوگیری کرد؟",
      "How can Redis be used to prevent a stampede on one key?",
    ],
    options: [
      [
        "فقط درخواستی که `SET lock:key 1 NX PX 5000` را برد مقدار را بازسازی کند و بقیه کمی صبر یا stale برگردانند",
        "Only the request that wins `SET lock:key 1 NX PX 5000` rebuilds; others wait briefly or serve stale",
      ],
      [
        "TTL کلید را صفر کنید تا هرگز منقضی نشود",
        "Set the key's TTL to zero so it never expires",
      ],
      [
        "با `KEYS *` همه کلیدهای منقضی را پیدا کنید",
        "Find all expired keys with `KEYS *`",
      ],
      [
        "برای هر درخواست یک اتصال جدید Redis باز کنید",
        "Open a new Redis connection per request",
      ],
    ],
    a: [
      "یک mutex کوتاه‌مدت با `NX` و TTL تضمین می‌کند فقط یک worker query سنگین را اجرا کند. TTL روی lock مانع deadlock در صورت crash شدن worker می‌شود.",
      "A short-lived mutex via `NX` with a TTL ensures only one worker runs the heavy query. The lock TTL prevents deadlock if the worker crashes.",
    ],
  },
  {
    id: "cache-m-jitter",
    level: "middle",
    tags: ["ttl", "avalanche"],
    q: [
      "چرا به TTL کلیدها مقدار تصادفی کوچکی (jitter) اضافه می‌کنند؟",
      "Why add a small random jitter to key TTLs?",
    ],
    options: [
      [
        "تا کلیدهایی که هم‌زمان ساخته شده‌اند هم‌زمان منقضی نشوند و بار ناگهانی به DB نرسد",
        "So keys created together don't expire together and spike DB load",
      ],
      [
        "تا امنیت کلیدها در برابر حدس زدن بیشتر شود",
        "To make keys harder to guess",
      ],
      [
        "تا Redis حافظه کمتری مصرف کند",
        "So Redis uses less memory",
      ],
      [
        "تا replication سریع‌تر انجام شود",
        "To speed up replication",
      ],
    ],
    a: [
      "اگر هزاران کلید با TTL یکسان (مثلاً هنگام warm-up) ساخته شوند، همه با هم منقضی می‌شوند و cache avalanche رخ می‌دهد. مثلاً `ttl = 3600 + random(0, 300)` انقضاها را پخش می‌کند.",
      "If thousands of keys get the same TTL (e.g. during warm-up) they expire together, causing a cache avalanche. E.g. `ttl = 3600 + random(0, 300)` spreads expirations.",
    ],
  },
  {
    id: "cache-m-penetration",
    level: "middle",
    tags: ["penetration"],
    q: [
      "cache penetration به چه مشکلی گفته می‌شود؟",
      "What problem is called cache penetration?",
    ],
    options: [
      [
        "درخواست‌های مکرر برای کلیدهایی که در DB هم وجود ندارند، پس همیشه miss شده و به DB می‌رسند",
        "Repeated requests for keys that don't exist in the DB either, so they always miss and hit the DB",
      ],
      [
        "نفوذ مهاجم به سرور Redis بدون رمز عبور",
        "An attacker breaking into a password-less Redis",
      ],
      [
        "انقضای هم‌زمان تعداد زیادی کلید",
        "Many keys expiring at the same time",
      ],
      [
        "یک کلید بسیار بزرگ که شبکه را پر می‌کند",
        "One huge key saturating the network",
      ],
    ],
    a: [
      "چون نتیجه‌ای برای cache کردن وجود ندارد، هر درخواست (مثلاً با id جعلی) مستقیم به DB می‌رسد. راه‌حل‌ها: cache کردن نتیجه خالی با TTL کوتاه، Bloom filter و اعتبارسنجی ورودی.",
      "Since there's nothing to cache, every request (e.g. with fake ids) goes straight to the DB. Fixes: cache null results with a short TTL, use a Bloom filter and validate input.",
    ],
  },
  {
    id: "cache-m-cache-null",
    level: "middle",
    tags: ["penetration"],
    q: [
      "هنگام cache کردن نتیجه «پیدا نشد» برای جلوگیری از penetration، چه نکته‌ای مهم است؟",
      "When caching 'not found' results to stop penetration, what matters most?",
    ],
    options: [
      [
        "TTL کوتاه بدهید تا اگر رکورد بعداً ساخته شد، مدت زیادی پنهان نماند",
        "Use a short TTL so a later-created record isn't hidden for long",
      ],
      [
        "TTL بی‌نهایت بدهید تا هرگز دوباره query نشود",
        "Use an infinite TTL so it's never queried again",
      ],
      [
        "مقدار null را در دیتابیس هم ذخیره کنید",
        "Also store the null value in the database",
      ],
      [
        "به‌جای null کل جدول را cache کنید",
        "Cache the entire table instead of null",
      ],
    ],
    a: [
      "یک sentinel مثل `__NULL__` با TTL مثلاً ۶۰ ثانیه ذخیره می‌شود. اگر رکورد ساخته شود باید کلید invalidate شود یا TTL کوتاه آن را پاک کند؛ در غیر این صورت کاربر رکورد جدید را نمی‌بیند.",
      "Store a sentinel like `__NULL__` with, say, a 60s TTL. When the record is created, invalidate the key or let the short TTL clear it; otherwise users won't see the new record.",
    ],
  },
  {
    id: "cache-m-bloom",
    level: "middle",
    tags: ["penetration", "bloom-filter"],
    q: [
      "ویژگی Bloom filter که آن را برای جلوگیری از cache penetration مناسب می‌کند چیست؟",
      "Which Bloom filter property makes it suitable against cache penetration?",
    ],
    options: [
      [
        "false negative ندارد: اگر بگوید «وجود ندارد»، قطعاً وجود ندارد",
        "No false negatives: if it says 'absent', the item is definitely absent",
      ],
      [
        "false positive ندارد: اگر بگوید «وجود دارد»، قطعاً وجود دارد",
        "No false positives: if it says 'present', it definitely is",
      ],
      [
        "امکان حذف عناصر را بدون هزینه فراهم می‌کند",
        "It allows deleting elements at no cost",
      ],
      [
        "مقدار کامل رکوردها را با حافظه کم نگه می‌دارد",
        "It stores full records in little memory",
      ],
    ],
    a: [
      "Bloom filter با حافظه کم عضویت را تقریبی بررسی می‌کند؛ ممکن است false positive بدهد ولی false negative ندارد. پس idهای قطعاً ناموجود قبل از رسیدن به cache و DB رد می‌شوند.",
      "A Bloom filter checks membership approximately with little memory; it can give false positives but never false negatives. So definitely-missing ids are rejected before reaching cache or DB.",
    ],
  },
  {
    id: "cache-m-avalanche",
    level: "middle",
    tags: ["avalanche"],
    q: [
      "cache avalanche با cache stampede چه تفاوتی دارد؟",
      "How does a cache avalanche differ from a cache stampede?",
    ],
    options: [
      [
        "avalanche یعنی تعداد زیادی کلید یا کل cache هم‌زمان از دست برود؛ stampede معمولاً روی یک کلید داغ است",
        "An avalanche is many keys or the whole cache lost at once; a stampede is usually one hot key",
      ],
      [
        "avalanche فقط در Memcached رخ می‌دهد",
        "An avalanche only happens in Memcached",
      ],
      [
        "avalanche یعنی درخواست برای کلیدهای ناموجود",
        "An avalanche is requests for nonexistent keys",
      ],
      [
        "هیچ تفاوتی ندارند و دو نام یک مشکل‌اند",
        "No difference; they're two names for one problem",
      ],
    ],
    a: [
      "avalanche می‌تواند ناشی از انقضای هم‌زمان کلیدها یا down شدن کل cache باشد. jitter در TTL، HA (replica/Sentinel)، cache چندسطحی و rate limiting/circuit breaker جلوی DB راه‌حل‌ها هستند.",
      "An avalanche can come from mass expiry or the whole cache going down. TTL jitter, HA (replicas/Sentinel), multi-level caching and rate limiting/circuit breakers in front of the DB help.",
    ],
  },
  {
    id: "cache-m-maxmemory-policy",
    level: "middle",
    tags: ["redis", "eviction"],
    q: [
      "سیاست `allkeys-lru` در Redis چه کاری انجام می‌دهد؟",
      "What does Redis's `allkeys-lru` policy do?",
    ],
    options: [
      [
        "هنگام رسیدن به `maxmemory` از میان همه کلیدها، کلیدهای کم‌استفاده اخیر را حذف می‌کند",
        "On reaching `maxmemory`, evicts least recently used keys among all keys",
      ],
      [
        "فقط کلیدهای دارای TTL را با LRU حذف می‌کند",
        "Evicts only keys with a TTL using LRU",
      ],
      [
        "هیچ کلیدی را حذف نمی‌کند و برای نوشتن خطا می‌دهد",
        "Evicts nothing and returns errors on writes",
      ],
      [
        "کلیدهایی با کمترین TTL باقی‌مانده را حذف می‌کند",
        "Evicts keys with the shortest remaining TTL",
      ],
    ],
    a: [
      "`allkeys-lru` برای استفاده خالص به‌عنوان cache مناسب است. `volatile-lru` فقط کلیدهای دارای expire را در نظر می‌گیرد و `volatile-ttl` کلیدهای نزدیک به انقضا را حذف می‌کند.",
      "`allkeys-lru` fits pure cache usage. `volatile-lru` considers only keys with an expiry, and `volatile-ttl` evicts keys closest to expiring.",
    ],
  },
  {
    id: "cache-m-noeviction",
    level: "middle",
    tags: ["redis", "eviction"],
    q: [
      "با `maxmemory-policy noeviction`، وقتی حافظه پر شود چه اتفاقی می‌افتد؟",
      "With `maxmemory-policy noeviction`, what happens when memory is full?",
    ],
    options: [
      [
        "دستورهای نوشتنی که حافظه اضافه می‌گیرند خطای OOM برمی‌گردانند ولی خواندن کار می‌کند",
        "Write commands that need memory return an OOM error, but reads still work",
      ],
      [
        "Redis به‌طور تصادفی کلیدها را حذف می‌کند",
        "Redis deletes random keys",
      ],
      [
        "Redis داده‌ها را روی دیسک swap می‌کند و ادامه می‌دهد",
        "Redis swaps data to disk and continues",
      ],
      [
        "Redis فوراً crash می‌کند و restart می‌شود",
        "Redis crashes immediately and restarts",
      ],
    ],
    a: [
      "`noeviction` (پیش‌فرض) هیچ داده‌ای را حذف نمی‌کند و نوشتن‌ها با `OOM command not allowed` رد می‌شوند. این برای وقتی مناسب است که Redis داده‌ای نگه می‌دارد که نباید بی‌صدا از دست برود، مثل صف.",
      "`noeviction` (the default) never drops data; writes fail with `OOM command not allowed`. It suits Redis holding data that must not vanish silently, like queues.",
    ],
  },
  {
    id: "cache-m-approx-lru",
    level: "middle",
    tags: ["redis", "eviction"],
    q: [
      "پیاده‌سازی LRU در Redis چگونه است؟",
      "How is LRU implemented in Redis?",
    ],
    options: [
      [
        "تقریبی است: چند کلید نمونه‌برداری و قدیمی‌ترین بین آن‌ها حذف می‌شود (`maxmemory-samples`)",
        "Approximated: it samples a few keys and evicts the oldest among them (`maxmemory-samples`)",
      ],
      [
        "یک linked list دقیق از همه کلیدها به ترتیب دسترسی نگه می‌دارد",
        "It keeps an exact linked list of all keys by access order",
      ],
      [
        "کلیدها را بر اساس حروف الفبا حذف می‌کند",
        "It evicts keys alphabetically",
      ],
      [
        "کلیدها را به‌ترتیب زمان ایجاد حذف می‌کند",
        "It evicts keys in creation order",
      ],
    ],
    a: [
      "برای صرفه‌جویی در حافظه، Redis یک LRU دقیق نگه نمی‌دارد و از نمونه‌گیری استفاده می‌کند. افزایش `maxmemory-samples` دقت را بالا و CPU را کمی بیشتر مصرف می‌کند.",
      "To save memory, Redis doesn't keep an exact LRU and uses sampling instead. Raising `maxmemory-samples` improves accuracy at slight CPU cost.",
    ],
  },
  {
    id: "cache-m-expire-mechanism",
    level: "middle",
    tags: ["redis", "ttl"],
    q: [
      "Redis کلیدهای منقضی‌شده را چگونه حذف می‌کند؟",
      "How does Redis remove expired keys?",
    ],
    options: [
      [
        "ترکیب lazy (هنگام دسترسی) و active (نمونه‌برداری دوره‌ای از کلیدهای دارای TTL)",
        "A mix of lazy (on access) and active (periodic sampling of keys with TTL) expiration",
      ],
      [
        "فقط وقتی حافظه پر شود",
        "Only when memory is full",
      ],
      [
        "با یک timer دقیق برای هر کلید در لحظه انقضا",
        "With a precise timer per key at the exact moment",
      ],
      [
        "فقط هنگام restart سرور",
        "Only on server restart",
      ],
    ],
    a: [
      "در دسترسی به کلید منقضی، Redis آن را حذف و nil برمی‌گرداند (lazy). یک چرخه پس‌زمینه هم به‌صورت دوره‌ای نمونه‌ای از کلیدهای دارای TTL را بررسی و منقضی‌ها را پاک می‌کند (active).",
      "Accessing an expired key deletes it and returns nil (lazy). A background cycle also periodically samples keys with TTLs and removes expired ones (active).",
    ],
  },
  {
    id: "cache-m-multi-exec",
    level: "middle",
    tags: ["redis", "transactions"],
    q: [
      "`MULTI`/`EXEC` در Redis چه تضمینی می‌دهد؟",
      "What does `MULTI`/`EXEC` guarantee in Redis?",
    ],
    options: [
      [
        "دستورهای صف‌شده به‌ترتیب و بدون درآمیختگی با دستورهای کلاینت‌های دیگر اجرا می‌شوند",
        "Queued commands run in order without interleaving with other clients' commands",
      ],
      [
        "اگر یک دستور در زمان اجرا خطا دهد، همه دستورهای قبلی rollback می‌شوند",
        "If one command fails at runtime, all previous ones are rolled back",
      ],
      [
        "داده‌ها قبل از پاسخ روی دیسک fsync می‌شوند",
        "Data is fsynced to disk before replying",
      ],
      [
        "دستورها روی همه نودهای cluster به‌صورت atomic اجرا می‌شوند",
        "Commands run atomically across all cluster nodes",
      ],
    ],
    a: [
      "تراکنش Redis ایزوله است ولی rollback ندارد؛ اگر یک دستور در `EXEC` خطای runtime بدهد (مثلاً نوع اشتباه)، بقیه همچنان اجرا می‌شوند. برای منطق شرطی از `WATCH` یا Lua استفاده کنید.",
      "Redis transactions are isolated but have no rollback; if a command fails at runtime in `EXEC` (e.g. wrong type), the others still run. Use `WATCH` or Lua for conditional logic.",
    ],
  },
  {
    id: "cache-m-watch",
    level: "middle",
    tags: ["redis", "transactions"],
    q: [
      "`WATCH` در Redis چه نقشی دارد؟",
      "What role does `WATCH` play in Redis?",
    ],
    options: [
      [
        "قفل خوش‌بینانه: اگر کلید watch‌شده قبل از `EXEC` تغییر کند، تراکنش اجرا نمی‌شود",
        "Optimistic locking: if a watched key changes before `EXEC`, the transaction aborts",
      ],
      [
        "کلید را قفل می‌کند تا هیچ کلاینت دیگری نتواند آن را بخواند",
        "Locks the key so no other client can read it",
      ],
      [
        "تغییرات کلید را به subscriberها اطلاع می‌دهد",
        "Notifies subscribers of key changes",
      ],
      [
        "TTL کلید را تا پایان تراکنش متوقف می‌کند",
        "Pauses the key's TTL until the transaction ends",
      ],
    ],
    a: [
      "الگو: `WATCH balance`، خواندن مقدار، `MULTI`، نوشتن، `EXEC`. اگر کلاینت دیگری در این فاصله `balance` را تغییر دهد، `EXEC` مقدار nil برمی‌گرداند و باید دوباره تلاش کرد (CAS).",
      "Pattern: `WATCH balance`, read, `MULTI`, write, `EXEC`. If another client changed `balance` meanwhile, `EXEC` returns nil and you retry (CAS).",
    ],
  },
  {
    id: "cache-m-lua",
    level: "middle",
    tags: ["redis", "lua", "atomicity"],
    q: [
      "مزیت اصلی اجرای اسکریپت Lua با `EVAL` در Redis چیست؟",
      "What is the main benefit of running a Lua script with `EVAL` in Redis?",
    ],
    options: [
      [
        "کل اسکریپت به‌صورت atomic روی سرور اجرا می‌شود و منطق شرطی read-modify-write ممکن است",
        "The whole script runs atomically on the server, enabling conditional read-modify-write",
      ],
      [
        "اسکریپت روی چند thread به‌طور موازی اجرا می‌شود",
        "The script runs in parallel across several threads",
      ],
      [
        "Lua به Redis اجازه می‌دهد query SQL اجرا کند",
        "Lua lets Redis execute SQL queries",
      ],
      [
        "اسکریپت‌های طولانی هیچ تأثیری روی بقیه کلاینت‌ها ندارند",
        "Long scripts have no effect on other clients",
      ],
    ],
    a: [
      "در حین اجرای اسکریپت هیچ دستور دیگری اجرا نمی‌شود، پس منطق مثل «اگر مقدار برابر X بود حذف کن» atomic می‌شود. به همین دلیل اسکریپت‌ها باید کوتاه باشند وگرنه سرور را block می‌کنند.",
      "No other command runs while a script executes, so logic like 'delete if value equals X' becomes atomic. Scripts must stay short or they block the server.",
    ],
  },
  {
    id: "cache-m-pipelining",
    level: "middle",
    tags: ["redis", "performance"],
    q: [
      "pipelining در Redis چه کاری انجام می‌دهد؟",
      "What does pipelining do in Redis?",
    ],
    options: [
      [
        "چند دستور را بدون انتظار برای پاسخ هر کدام ارسال می‌کند تا round-tripها کم شوند",
        "Sends several commands without waiting for each reply, reducing round-trips",
      ],
      [
        "دستورها را به‌صورت atomic مثل تراکنش اجرا می‌کند",
        "Runs the commands atomically like a transaction",
      ],
      [
        "دستورها را بین چند سرور Redis تقسیم می‌کند",
        "Splits commands across several Redis servers",
      ],
      [
        "خروجی دستورها را روی دیسک ذخیره می‌کند",
        "Stores command output on disk",
      ],
    ],
    a: [
      "pipelining یک بهینه‌سازی شبکه است و atomicity نمی‌دهد؛ دستورهای کلاینت‌های دیگر ممکن است بین آن‌ها اجرا شوند. برای atomicity باید `MULTI`/`EXEC` یا Lua استفاده کرد.",
      "Pipelining is a network optimization without atomicity; other clients' commands may interleave. For atomicity use `MULTI`/`EXEC` or Lua.",
    ],
  },
  {
    id: "cache-m-scan",
    level: "middle",
    tags: ["redis", "commands"],
    q: [
      "کدام ویژگی `SCAN` درست است؟",
      "Which statement about `SCAN` is correct?",
    ],
    options: [
      [
        "تدریجی با cursor است و ممکن است یک کلید را بیش از یک بار برگرداند",
        "It's incremental with a cursor and may return a key more than once",
      ],
      [
        "دقیقاً تعداد `COUNT` کلید در هر فراخوانی برمی‌گرداند",
        "It returns exactly `COUNT` keys per call",
      ],
      [
        "در طول پیمایش یک snapshot ثابت از کلیدها می‌گیرد",
        "It takes a frozen snapshot of keys during iteration",
      ],
      [
        "مانند `KEYS` کل سرور را تا پایان block می‌کند",
        "Like `KEYS`, it blocks the whole server until done",
      ],
    ],
    a: [
      "`SCAN` تا cursor برابر `0` برگردد ادامه می‌دهد. `COUNT` فقط یک راهنمای تقریبی است و تکرار کلید ممکن است، پس کد باید idempotent باشد یا تکراری‌ها را حذف کند.",
      "`SCAN` continues until the cursor returns `0`. `COUNT` is only a hint and duplicates are possible, so client code should be idempotent or dedupe.",
    ],
  },
  {
    id: "cache-m-rdb-vs-aof",
    level: "middle",
    tags: ["redis", "persistence"],
    q: [
      "تفاوت اصلی RDB و AOF در persistence ردیس چیست؟",
      "What is the main difference between RDB and AOF persistence in Redis?",
    ],
    options: [
      [
        "RDB snapshot دوره‌ای کل داده است؛ AOF هر دستور نوشتنی را به یک log اضافه می‌کند",
        "RDB is a periodic point-in-time snapshot; AOF appends every write command to a log",
      ],
      [
        "RDB هر دستور را log می‌کند؛ AOF snapshot دوره‌ای می‌گیرد",
        "RDB logs every command; AOF takes periodic snapshots",
      ],
      [
        "RDB فقط برای replicaها و AOF فقط برای master است",
        "RDB is for replicas only and AOF for the master only",
      ],
      [
        "هر دو داده را فقط در RAM نگه می‌دارند",
        "Both keep data only in RAM",
      ],
    ],
    a: [
      "RDB فایل فشرده و restart سریع دارد ولی بین snapshotها داده از دست می‌رود. AOF durability بهتری دارد اما فایل بزرگ‌تر است و نیاز به rewrite دارد؛ ترکیب هر دو رایج است.",
      "RDB is compact with fast restarts but loses data between snapshots. AOF is more durable but larger and needs rewriting; combining both is common.",
    ],
  },
  {
    id: "cache-m-appendfsync",
    level: "middle",
    tags: ["redis", "persistence"],
    q: [
      "با `appendfsync everysec` در حالت AOF، در بدترین حالت چقدر داده ممکن است از دست برود؟",
      "With AOF and `appendfsync everysec`, how much data can be lost in the worst case?",
    ],
    options: [
      ["حدود یک ثانیه نوشتن‌ها", "About one second of writes"],
      ["هیچ داده‌ای از دست نمی‌رود", "No data at all"],
      ["همه داده‌ها از آخرین RDB snapshot", "Everything since the last RDB snapshot"],
      ["همه داده‌ها چون AOF فقط در RAM است", "Everything, since AOF lives in RAM"],
    ],
    a: [
      "`everysec` هر ثانیه fsync می‌کند و تعادل خوبی بین کارایی و durability است. `always` امن‌تر ولی کندتر و `no` زمان flush را به سیستم‌عامل می‌سپارد.",
      "`everysec` fsyncs once per second, a good balance of speed and durability. `always` is safest but slow, and `no` leaves flushing to the OS.",
    ],
  },
  {
    id: "cache-m-replication-async",
    level: "middle",
    tags: ["redis", "replication"],
    q: [
      "replication در Redis به‌طور پیش‌فرض چگونه است؟",
      "How does Redis replication work by default?",
    ],
    options: [
      [
        "async است؛ master پیش از تأیید replicaها به کلاینت پاسخ می‌دهد",
        "Asynchronous; the master replies before replicas acknowledge",
      ],
      [
        "کاملاً synchronous است و هر نوشتن تا تأیید همه replicaها منتظر می‌ماند",
        "Fully synchronous; each write waits for all replicas",
      ],
      [
        "replicaها هم نوشتن می‌پذیرند و با master merge می‌شوند",
        "Replicas also accept writes and merge with the master",
      ],
      [
        "replication فقط از طریق کپی دستی فایل RDB انجام می‌شود",
        "Replication only happens by manually copying RDB files",
      ],
    ],
    a: [
      "چون replication async است، اگر master قبل از ارسال نوشتن به replica از کار بیفتد و failover رخ دهد، آن نوشتن از دست می‌رود. دستور `WAIT` می‌تواند منتظر تعداد مشخصی ack بماند ولی strong consistency نمی‌دهد.",
      "Since replication is async, a write can be lost if the master dies before shipping it and failover occurs. `WAIT` can block for N acks but still doesn't give strong consistency.",
    ],
  },
  {
    id: "cache-m-sentinel",
    level: "middle",
    tags: ["redis", "high-availability"],
    q: [
      "Redis Sentinel چه کاری انجام می‌دهد؟",
      "What does Redis Sentinel do?",
    ],
    options: [
      [
        "پایش master/replicaها، failover خودکار و معرفی master جدید به کلاینت‌ها",
        "Monitors master/replicas, performs automatic failover and tells clients the new master",
      ],
      [
        "داده‌ها را بین چند master با hash slot تقسیم می‌کند",
        "Shards data across multiple masters via hash slots",
      ],
      [
        "دستورهای کند را بهینه‌سازی و بازنویسی می‌کند",
        "Optimizes and rewrites slow commands",
      ],
      [
        "backup روزانه را روی S3 آپلود می‌کند",
        "Uploads daily backups to S3",
      ],
    ],
    a: [
      "Sentinel برای high availability یک master با چند replica است و sharding انجام نمی‌دهد. برای تقسیم داده بین چند نود باید از Redis Cluster استفاده کرد.",
      "Sentinel provides HA for a single master with replicas and does no sharding. To partition data across nodes, use Redis Cluster.",
    ],
  },
  {
    id: "cache-m-hash-slots",
    level: "middle",
    tags: ["redis", "cluster"],
    q: [
      "Redis Cluster کلیدها را چگونه بین نودها توزیع می‌کند؟",
      "How does Redis Cluster distribute keys across nodes?",
    ],
    options: [
      [
        "با `CRC16(key) mod 16384` هر کلید به یکی از ۱۶۳۸۴ hash slot نگاشت می‌شود",
        "Each key maps to one of 16384 hash slots via `CRC16(key) mod 16384`",
      ],
      [
        "با consistent hashing روی یک حلقه ۲^۳۲ تایی",
        "With consistent hashing on a 2^32 ring",
      ],
      [
        "به‌صورت round-robin بر اساس ترتیب نوشتن",
        "Round-robin by write order",
      ],
      [
        "بر اساس حرف اول نام کلید",
        "By the first letter of the key",
      ],
    ],
    a: [
      "هر master مسئول بازه‌ای از slotهاست و با اضافه شدن نود، slotها جابه‌جا می‌شوند. کلاینت در صورت ارسال به نود اشتباه پاسخ `MOVED` یا `ASK` می‌گیرد.",
      "Each master owns a range of slots, and slots migrate when nodes are added. A client hitting the wrong node gets a `MOVED` or `ASK` redirect.",
    ],
  },
  {
    id: "cache-m-hash-tags",
    level: "middle",
    tags: ["redis", "cluster"],
    q: [
      "چرا در Redis Cluster از hash tag مثل `{user:42}:cart` و `{user:42}:profile` استفاده می‌کنند؟",
      "Why use hash tags like `{user:42}:cart` and `{user:42}:profile` in Redis Cluster?",
    ],
    options: [
      [
        "تا هر دو کلید در یک slot قرار گیرند و دستورهای چندکلیدی و Lua روی آن‌ها کار کند",
        "To place both keys in the same slot so multi-key commands and Lua work on them",
      ],
      [
        "تا کلیدها رمزنگاری شوند",
        "To encrypt the keys",
      ],
      [
        "تا کلیدها در همه نودها replicate شوند",
        "To replicate the keys to every node",
      ],
      [
        "تا TTL کلیدها با هم همگام شود",
        "To sync the keys' TTLs",
      ],
    ],
    a: [
      "فقط بخش داخل `{}` برای محاسبه slot استفاده می‌شود. دستورهایی مثل `MGET` یا تراکنش‌ها در Cluster فقط روی کلیدهای یک slot مجازند، وگرنه خطای `CROSSSLOT` می‌گیرید.",
      "Only the part inside `{}` is hashed for the slot. Commands like `MGET` or transactions in Cluster require keys in the same slot, otherwise you get `CROSSSLOT`.",
    ],
  },
  {
    id: "cache-m-fixed-window",
    level: "middle",
    tags: ["redis", "rate-limiting"],
    q: [
      "ضعف rate limiter با پنجره ثابت (`INCR` + `EXPIRE` روی کلید `rl:user:minute`) چیست؟",
      "What is the weakness of a fixed-window limiter (`INCR` + `EXPIRE` on `rl:user:minute`)?",
    ],
    options: [
      [
        "در مرز دو پنجره کاربر می‌تواند تا دو برابر حد مجاز در زمان کوتاه درخواست بفرستد",
        "At a window boundary a user can burst up to twice the limit in a short time",
      ],
      [
        "Redis نمی‌تواند شمارنده‌ها را atomic افزایش دهد",
        "Redis can't increment counters atomically",
      ],
      [
        "برای هر درخواست یک کلید جدید ساخته می‌شود",
        "A new key is created for every request",
      ],
      [
        "به هیچ وجه با چند instance برنامه کار نمی‌کند",
        "It can't work with multiple app instances at all",
      ],
    ],
    a: [
      "مثلاً با حد ۱۰۰ در دقیقه، ۱۰۰ درخواست در ثانیه ۵۹ و ۱۰۰ در ثانیه ۶۱ هر دو مجازند. sliding window یا token bucket این burst را صاف‌تر کنترل می‌کنند.",
      "With a 100/min limit, 100 requests at second 59 and 100 at second 61 are both allowed. Sliding window or token bucket smooth out such bursts.",
    ],
  },
  {
    id: "cache-m-sliding-window-zset",
    level: "middle",
    tags: ["redis", "rate-limiting", "sorted-set"],
    q: [
      "در rate limiter پنجره لغزان با sorted set، هر درخواست چگونه ثبت و شمرده می‌شود؟",
      "In a sliding-window limiter using a sorted set, how is each request recorded and counted?",
    ],
    options: [
      [
        "`ZADD` با timestamp به‌عنوان score، `ZREMRANGEBYSCORE` برای حذف قدیمی‌ها و `ZCARD` برای شمارش",
        "`ZADD` with timestamp as score, `ZREMRANGEBYSCORE` to drop old ones, `ZCARD` to count",
      ],
      [
        "`LPUSH` timestamp و `LLEN` بدون حذف عناصر قدیمی",
        "`LPUSH` the timestamp and `LLEN` without trimming",
      ],
      [
        "`SADD` شناسه کاربر و `SCARD` برای شمارش",
        "`SADD` the user id and `SCARD` to count",
      ],
      [
        "`PFADD` و `PFCOUNT` برای شمارش دقیق",
        "`PFADD` and `PFCOUNT` for exact counting",
      ],
    ],
    a: [
      "درخواست‌های خارج از پنجره (score کمتر از `now - window`) حذف و بقیه شمرده می‌شوند؛ این مراحل باید در `MULTI` یا Lua باشند. دقیق است ولی به ازای هر درخواست یک عضو حافظه مصرف می‌کند.",
      "Entries older than `now - window` are removed and the rest counted; wrap the steps in `MULTI` or Lua. It's precise but costs one member of memory per request.",
    ],
  },
  {
    id: "cache-m-token-bucket",
    level: "middle",
    tags: ["rate-limiting"],
    q: [
      "ویژگی اصلی الگوریتم token bucket در rate limiting چیست؟",
      "What is the key property of the token bucket rate-limiting algorithm?",
    ],
    options: [
      [
        "توکن‌ها با نرخ ثابت پر می‌شوند و burst تا ظرفیت سطل مجاز است",
        "Tokens refill at a steady rate and bursts up to bucket capacity are allowed",
      ],
      [
        "درخواست‌ها با نرخ کاملاً ثابت خارج می‌شوند و هیچ burstی مجاز نیست",
        "Requests leave at a perfectly constant rate with no bursts",
      ],
      [
        "شمارنده در ابتدای هر دقیقه صفر می‌شود",
        "A counter resets at the start of each minute",
      ],
      [
        "هر کاربر فقط یک درخواست در کل عمرش می‌تواند بفرستد",
        "Each user can send only one request ever",
      ],
    ],
    a: [
      "در Redis معمولاً با یک hash شامل `tokens` و `last_refill` و یک اسکریپت Lua پیاده می‌شود تا محاسبه refill و برداشت توکن atomic باشد. leaky bucket برعکس خروجی را با نرخ ثابت صاف می‌کند.",
      "In Redis it's usually a hash with `tokens` and `last_refill` plus a Lua script so refill and consume are atomic. Leaky bucket, by contrast, smooths output to a constant rate.",
    ],
  },
  {
    id: "cache-m-leaderboard-rank",
    level: "middle",
    tags: ["redis", "sorted-set"],
    q: [
      "برای گرفتن رتبه یک کاربر در leaderboard (بیشترین امتیاز = رتبه اول) کدام دستور مناسب است؟",
      "Which command gets a user's rank in a leaderboard where highest score is rank 1?",
    ],
    options: [
      ["`ZREVRANK board user`", "`ZREVRANK board user`"],
      ["`ZRANK board user`", "`ZRANK board user`"],
      ["`ZSCORE board user`", "`ZSCORE board user`"],
      ["`ZCARD board`", "`ZCARD board`"],
    ],
    a: [
      "`ZRANK` رتبه را به‌ترتیب صعودی score می‌دهد و `ZREVRANK` به‌ترتیب نزولی (صفرمبنا). `ZSCORE` امتیاز را برمی‌گرداند و `ZINCRBY` امتیاز را atomic افزایش می‌دهد.",
      "`ZRANK` ranks by ascending score and `ZREVRANK` by descending (zero-based). `ZSCORE` returns the score and `ZINCRBY` increments it atomically.",
    ],
  },
  {
    id: "cache-m-hyperloglog",
    level: "middle",
    tags: ["redis", "data-types"],
    q: [
      "HyperLogLog در Redis برای چه کاری مناسب است؟",
      "What is HyperLogLog in Redis good for?",
    ],
    options: [
      [
        "شمارش تقریبی تعداد عناصر یکتا (مثل بازدیدکنندگان یکتا) با حافظه ثابت حدود ۱۲KB",
        "Approximate unique counts (like unique visitors) in ~12KB of fixed memory",
      ],
      [
        "نگه‌داشتن لیست کامل بازدیدکنندگان به ترتیب ورود",
        "Storing the full ordered list of visitors",
      ],
      [
        "شمارش دقیق بدون هیچ خطایی برای میلیاردها عنصر",
        "Exact counts with zero error for billions of items",
      ],
      [
        "ذخیره مختصات جغرافیایی",
        "Storing geographic coordinates",
      ],
    ],
    a: [
      "`PFADD` عناصر را اضافه و `PFCOUNT` cardinality تقریبی با خطای استاندارد حدود ۰.۸۱٪ را برمی‌گرداند. خود عناصر قابل بازیابی نیستند.",
      "`PFADD` adds items and `PFCOUNT` returns an approximate cardinality with ~0.81% standard error. The items themselves can't be retrieved.",
    ],
  },
  {
    id: "cache-m-bitmap",
    level: "middle",
    tags: ["redis", "data-types"],
    q: [
      "برای ثبت اینکه کدام کاربران (با id عددی) امروز login کرده‌اند، با کمترین حافظه، کدام ساختار مناسب است؟",
      "Which structure tracks which users (numeric ids) logged in today with minimal memory?",
    ],
    options: [
      [
        "Bitmap با `SETBIT daily:2026-11-04 userId 1` و `BITCOUNT`",
        "A bitmap with `SETBIT daily:2026-11-04 userId 1` and `BITCOUNT`",
      ],
      [
        "یک List از idهای کاربران",
        "A list of user ids",
      ],
      [
        "یک Hash با کلید جداگانه برای هر روز و هر کاربر",
        "A hash with a separate key per day and user",
      ],
      [
        "Stream با یک entry برای هر login",
        "A stream with one entry per login",
      ],
    ],
    a: [
      "bitmap برای هر کاربر فقط یک بیت مصرف می‌کند؛ ۱۰ میلیون کاربر حدود ۱.۲MB. با `BITOP AND/OR` می‌توان کاربران فعال چند روز را ترکیب کرد.",
      "A bitmap uses one bit per user; 10 million users take about 1.2MB. `BITOP AND/OR` combines active users across days.",
    ],
  },
  {
    id: "cache-m-geo",
    level: "middle",
    tags: ["redis", "data-types"],
    q: [
      "قابلیت Geo در Redis (مثل `GEOADD` و `GEOSEARCH`) روی چه ساختاری پیاده شده است؟",
      "What structure underlies Redis Geo commands like `GEOADD` and `GEOSEARCH`?",
    ],
    options: [
      [
        "Sorted Set که score آن geohash مختصات است",
        "A sorted set whose score is a geohash of the coordinates",
      ],
      [
        "یک R-tree جداگانه روی دیسک",
        "A separate on-disk R-tree",
      ],
      [
        "یک Hash با فیلدهای lat و lng",
        "A hash with lat and lng fields",
      ],
      [
        "یک List مرتب‌شده بر اساس فاصله",
        "A list sorted by distance",
      ],
    ],
    a: [
      "Redis مختصات را به یک geohash ۵۲ بیتی تبدیل و به‌عنوان score در sorted set ذخیره می‌کند. به همین دلیل می‌توان روی کلید geo از دستورهای `Z*` مثل `ZREM` هم استفاده کرد.",
      "Redis encodes coordinates as a 52-bit geohash stored as the sorted-set score. That's why `Z*` commands like `ZREM` also work on geo keys.",
    ],
  },
  {
    id: "cache-m-streams-vs-pubsub",
    level: "middle",
    tags: ["redis", "streams", "pub-sub"],
    q: [
      "مزیت Redis Streams نسبت به Pub/Sub چیست؟",
      "What advantage do Redis Streams have over Pub/Sub?",
    ],
    options: [
      [
        "پیام‌ها ماندگارند، consumer group و ack دارند و می‌توان از offset قبلی دوباره خواند",
        "Messages persist, with consumer groups, acks and replay from an earlier ID",
      ],
      [
        "Streams پیام را فقط به subscriberهای متصل فعلی می‌رساند",
        "Streams deliver only to currently connected subscribers",
      ],
      [
        "Streams هیچ حافظه‌ای مصرف نمی‌کند",
        "Streams use no memory at all",
      ],
      [
        "Streams جایگزین کامل Kafka با تضمین exactly-once است",
        "Streams fully replace Kafka with exactly-once guarantees",
      ],
    ],
    a: [
      "Streams یک log append-only است: `XADD` برای نوشتن، `XREADGROUP` برای مصرف گروهی و `XACK` برای تأیید. پیام‌های ack نشده در PEL می‌مانند و با `XCLAIM` قابل بازپس‌گیری‌اند.",
      "A stream is an append-only log: `XADD` writes, `XREADGROUP` consumes in groups and `XACK` acknowledges. Unacked messages stay in the PEL and can be reclaimed with `XCLAIM`.",
    ],
  },
  {
    id: "cache-m-hot-key",
    level: "middle",
    tags: ["hot-keys", "redis"],
    q: [
      "hot key در Redis چه مشکلی ایجاد می‌کند و یک راه‌حل رایج چیست؟",
      "What problem does a hot key cause in Redis, and what's a common fix?",
    ],
    options: [
      [
        "همه بار به یک نود/shard می‌رسد؛ با cache محلی کوتاه‌مدت یا replicate کردن کلید با پسوند تصادفی پخشش می‌کنند",
        "All load lands on one node/shard; spread it with a short local cache or replicated key copies with random suffixes",
      ],
      [
        "کلید زود منقضی می‌شود؛ باید TTL را حذف کرد",
        "The key expires too early; remove its TTL",
      ],
      [
        "حافظه کل cluster پر می‌شود؛ باید `FLUSHALL` زد",
        "The whole cluster's memory fills; run `FLUSHALL`",
      ],
      [
        "replication متوقف می‌شود؛ باید replica را حذف کرد",
        "Replication stops; remove the replica",
      ],
    ],
    a: [
      "در Cluster هر کلید فقط در یک slot است، پس افزودن نود به hot key کمکی نمی‌کند. cache درون‌پردازه‌ای با TTL چندثانیه‌ای یا کپی‌هایی مثل `hot:item:{n}` بار را تقسیم می‌کند.",
      "In Cluster each key lives in one slot, so adding nodes doesn't help a hot key. An in-process cache with a few seconds TTL or copies like `hot:item:{n}` spread the load.",
    ],
  },
  {
    id: "cache-m-big-key",
    level: "middle",
    tags: ["big-keys", "redis"],
    q: [
      "چرا big key (مثلاً hash با چند میلیون فیلد) در Redis مشکل‌ساز است؟",
      "Why is a big key (e.g. a hash with millions of fields) problematic in Redis?",
    ],
    options: [
      [
        "عملیات روی آن (مثل `DEL` یا `HGETALL`) طولانی است و thread اصلی را block می‌کند",
        "Operations on it (like `DEL` or `HGETALL`) are slow and block the main thread",
      ],
      [
        "Redis اجازه ساخت hash با بیش از ۱۰۰ فیلد را نمی‌دهد",
        "Redis forbids hashes with more than 100 fields",
      ],
      [
        "big keyها هرگز replicate نمی‌شوند",
        "Big keys are never replicated",
      ],
      [
        "big keyها همیشه به‌طور خودکار فشرده می‌شوند و مشکلی ندارند",
        "Big keys are always auto-compressed and harmless",
      ],
    ],
    a: [
      "big key باعث latency spike، توزیع نامتوازن حافظه در Cluster و کندی migration می‌شود. باید داده را shard کرد، از `UNLINK` برای حذف async و از `HSCAN` به‌جای `HGETALL` استفاده کرد.",
      "Big keys cause latency spikes, uneven memory in Cluster and slow migrations. Split the data, use `UNLINK` for async deletion and `HSCAN` instead of `HGETALL`.",
    ],
  },
  {
    id: "cache-m-unlink",
    level: "middle",
    tags: ["redis", "commands"],
    q: [
      "تفاوت `UNLINK` با `DEL` چیست؟",
      "How does `UNLINK` differ from `DEL`?",
    ],
    options: [
      [
        "`UNLINK` کلید را فوراً از keyspace برمی‌دارد ولی آزادسازی حافظه را در thread پس‌زمینه انجام می‌دهد",
        "`UNLINK` removes the key from the keyspace immediately but frees memory in a background thread",
      ],
      [
        "`UNLINK` فقط لینک‌های symbolic بین کلیدها را حذف می‌کند",
        "`UNLINK` only removes symbolic links between keys",
      ],
      [
        "`UNLINK` کلید را پس از انقضای TTL حذف می‌کند",
        "`UNLINK` deletes the key when its TTL expires",
      ],
      [
        "`UNLINK` کلید را فقط از replicaها حذف می‌کند",
        "`UNLINK` removes the key only from replicas",
      ],
    ],
    a: [
      "`DEL` روی یک کلید بزرگ می‌تواند ثانیه‌ها thread اصلی را مشغول کند. `UNLINK` (و `lazyfree-*` در تنظیمات) آزادسازی را به background thread منتقل می‌کند.",
      "`DEL` on a huge key can occupy the main thread for seconds. `UNLINK` (and the `lazyfree-*` settings) moves reclamation to a background thread.",
    ],
  },
  {
    id: "cache-m-memory-hash-encoding",
    level: "middle",
    tags: ["redis", "memory"],
    q: [
      "چرا گروه‌بندی کلیدهای کوچک در hashهای کوچک می‌تواند حافظه Redis را کم کند؟",
      "Why can grouping small values into small hashes reduce Redis memory usage?",
    ],
    options: [
      [
        "hashهای کوچک با encoding فشرده (listpack) ذخیره می‌شوند و سربار هر کلید سطح‌بالا حذف می‌شود",
        "Small hashes use a compact encoding (listpack), avoiding per-top-level-key overhead",
      ],
      [
        "Redis محتوای hashها را با gzip فشرده می‌کند",
        "Redis gzips hash contents",
      ],
      [
        "hashها روی دیسک ذخیره می‌شوند نه RAM",
        "Hashes are stored on disk, not in RAM",
      ],
      [
        "فیلدهای hash هیچ حافظه‌ای مصرف نمی‌کنند",
        "Hash fields consume no memory",
      ],
    ],
    a: [
      "هر کلید سطح‌بالا سربار dictEntry و redisObject دارد. تا وقتی hash زیر آستانه‌های `hash-max-listpack-entries` و `hash-max-listpack-value` باشد به‌صورت فشرده ذخیره می‌شود.",
      "Every top-level key carries dictEntry and redisObject overhead. A hash below `hash-max-listpack-entries` and `hash-max-listpack-value` is stored in a compact encoding.",
    ],
  },
  {
    id: "cache-m-s-maxage",
    level: "middle",
    tags: ["http-caching", "cdn"],
    q: [
      "`Cache-Control: max-age=60, s-maxage=600` چه رفتاری ایجاد می‌کند؟",
      "What does `Cache-Control: max-age=60, s-maxage=600` cause?",
    ],
    options: [
      [
        "مرورگر ۶۰ ثانیه و cacheهای مشترک مثل CDN ۶۰۰ ثانیه پاسخ را fresh می‌دانند",
        "Browsers treat it fresh for 60s and shared caches like CDNs for 600s",
      ],
      [
        "مرورگر ۶۰۰ ثانیه و CDN ۶۰ ثانیه cache می‌کند",
        "Browsers cache for 600s and the CDN for 60s",
      ],
      [
        "پاسخ پس از ۶۰ ثانیه از همه cacheها حذف می‌شود",
        "The response is purged everywhere after 60s",
      ],
      [
        "`s-maxage` فقط برای پاسخ‌های HTTPS معتبر است",
        "`s-maxage` is valid only for HTTPS responses",
      ],
    ],
    a: [
      "`s-maxage` فقط برای shared cacheها اعمال می‌شود و بر `max-age` آن‌ها اولویت دارد. این اجازه می‌دهد CDN مدت بیشتری cache کند و در صورت تغییر با purge آن را invalidate کنید.",
      "`s-maxage` applies only to shared caches and overrides `max-age` for them. This lets the CDN cache longer, with purges for invalidation on change.",
    ],
  },
  {
    id: "cache-m-swr",
    level: "middle",
    tags: ["http-caching"],
    q: [
      "دستور `stale-while-revalidate=30` در `Cache-Control` چه کاری انجام می‌دهد؟",
      "What does `stale-while-revalidate=30` in `Cache-Control` do?",
    ],
    options: [
      [
        "تا ۳۰ ثانیه پس از انقضا، پاسخ stale فوراً سرو و هم‌زمان در پس‌زمینه revalidate می‌شود",
        "For 30s after expiry, the stale response is served immediately while revalidating in the background",
      ],
      [
        "cache را مجبور می‌کند هر ۳۰ ثانیه یک بار پاسخ را حذف کند",
        "Forces the cache to purge the response every 30s",
      ],
      [
        "در صورت خطای سرور، پاسخ stale را تا ۳۰ روز سرو می‌کند",
        "On server errors, serves stale for 30 days",
      ],
      [
        "revalidation را تا ۳۰ درخواست به تأخیر می‌اندازد",
        "Delays revalidation for 30 requests",
      ],
    ],
    a: [
      "این دستور latency را برای کاربر حذف می‌کند چون منتظر origin نمی‌ماند. دستور مشابه `stale-if-error` اجازه سرو نسخه stale را هنگام خطای origin می‌دهد.",
      "It removes origin latency from the user path since no one waits for revalidation. The related `stale-if-error` allows serving stale content when the origin errors.",
    ],
  },
  {
    id: "cache-m-vary",
    level: "middle",
    tags: ["http-caching", "cdn"],
    q: [
      "هدر `Vary: Accept-Encoding` چه تأثیری روی cacheها دارد؟",
      "What effect does `Vary: Accept-Encoding` have on caches?",
    ],
    options: [
      [
        "cache نسخه‌های جداگانه بر اساس مقدار `Accept-Encoding` درخواست (مثلاً gzip یا br) نگه می‌دارد",
        "Caches keep separate variants keyed by the request's `Accept-Encoding` (e.g. gzip or br)",
      ],
      [
        "cache را برای همه درخواست‌ها غیرفعال می‌کند",
        "Disables caching for all requests",
      ],
      [
        "سرور را مجبور می‌کند پاسخ را فشرده نکند",
        "Forces the server not to compress",
      ],
      [
        "TTL را بر اساس نوع encoding تغییر می‌دهد",
        "Changes the TTL based on encoding",
      ],
    ],
    a: [
      "`Vary` مشخص می‌کند کدام هدرهای درخواست بخشی از cache key هستند. `Vary` روی هدرهای پرتنوع مثل `User-Agent` یا `Cookie` hit ratio را در CDN به‌شدت کاهش می‌دهد.",
      "`Vary` lists request headers that become part of the cache key. Varying on high-cardinality headers like `User-Agent` or `Cookie` crushes CDN hit ratio.",
    ],
  },
  {
    id: "cache-m-cdn-purge",
    level: "middle",
    tags: ["cdn", "invalidation"],
    q: [
      "برای به‌روزرسانی فوری محتوای cache‌شده در CDN پس از deploy، کدام روش بهتر است؟",
      "Which approach best updates CDN-cached content immediately after a deploy?",
    ],
    options: [
      [
        "نسخه‌گذاری URL (fingerprint) برای assetها و purge (یا surrogate key) برای صفحات",
        "Versioned URLs (fingerprints) for assets and purges (or surrogate keys) for pages",
      ],
      [
        "صبر کردن تا انقضای TTL یک‌ساله",
        "Waiting for the one-year TTL to expire",
      ],
      [
        "تغییر IP سرور origin",
        "Changing the origin server's IP",
      ],
      [
        "اضافه کردن `no-store` به همه پاسخ‌ها برای همیشه",
        "Adding `no-store` to every response forever",
      ],
    ],
    a: [
      "fingerprint در نام فایل باعث می‌شود URL جدید خودبه‌خود miss شود. برای HTML و API، purge با URL یا tag (surrogate key) امکان invalidation هدفمند بدون غیرفعال کردن cache را می‌دهد.",
      "Fingerprinted filenames make new URLs miss naturally. For HTML and APIs, purging by URL or tag (surrogate key) gives targeted invalidation without disabling caching.",
    ],
  },
  {
    id: "cache-m-local-plus-redis",
    level: "middle",
    tags: ["multi-level", "local-cache"],
    q: [
      "در cache دوسطحی (L1 درون‌پردازه + L2 Redis)، چالش اصلی چیست؟",
      "In a two-level cache (L1 in-process + L2 Redis), what is the main challenge?",
    ],
    options: [
      [
        "invalidate کردن L1 در همه instanceها هنگام تغییر داده، مثلاً با پیام Pub/Sub",
        "Invalidating L1 across all instances on change, e.g. via a Pub/Sub message",
      ],
      [
        "L1 همیشه کندتر از L2 است",
        "L1 is always slower than L2",
      ],
      [
        "Redis اجازه استفاده هم‌زمان با cache محلی را نمی‌دهد",
        "Redis forbids coexisting with a local cache",
      ],
      [
        "L2 باید همیشه کوچک‌تر از L1 باشد",
        "L2 must always be smaller than L1",
      ],
    ],
    a: [
      "L1 latency را به نانوثانیه می‌رساند و بار Redis را کم می‌کند، اما هر instance کپی خودش را دارد. معمولاً L1 با TTL کوتاه همراه با broadcast invalidation یا client-side caching ردیس (`CLIENT TRACKING`) استفاده می‌شود.",
      "L1 brings nanosecond latency and offloads Redis, but each instance holds its own copy. It's typically paired with short TTLs plus broadcast invalidation or Redis client-side caching (`CLIENT TRACKING`).",
    ],
  },
  {
    id: "cache-m-request-coalescing",
    level: "middle",
    tags: ["stampede", "performance"],
    q: [
      "request coalescing (singleflight) در یک سرویس چه کاری انجام می‌دهد؟",
      "What does request coalescing (singleflight) do in a service?",
    ],
    options: [
      [
        "درخواست‌های هم‌زمان برای یک کلید را ادغام می‌کند تا فقط یک بارگذاری انجام شود و همه نتیجه را بگیرند",
        "Merges concurrent requests for the same key so one load runs and all share its result",
      ],
      [
        "درخواست‌ها را بین چند سرور Redis پخش می‌کند",
        "Spreads requests across several Redis servers",
      ],
      [
        "پاسخ‌ها را برای کاهش حجم فشرده می‌کند",
        "Compresses responses to reduce size",
      ],
      [
        "درخواست‌های تکراری را با خطای 429 رد می‌کند",
        "Rejects duplicate requests with 429",
      ],
    ],
    a: [
      "در Node.js می‌توان Promise در حال اجرا را در یک Map نگه داشت و درخواست‌های بعدی همان Promise را await کنند. این stampede را در سطح هر instance حذف می‌کند ولی بین instanceها نه.",
      "In Node.js you can store the in-flight Promise in a Map so later callers await it. This removes stampedes per instance but not across instances.",
    ],
  },
  {
    id: "cache-m-incr-expire-race",
    level: "middle",
    tags: ["redis", "atomicity", "rate-limiting"],
    q: [
      "مشکل اجرای `INCR key` و سپس جداگانه `EXPIRE key 60` در rate limiter چیست؟",
      "What is wrong with running `INCR key` then a separate `EXPIRE key 60` in a rate limiter?",
    ],
    options: [
      [
        "اگر process بین دو دستور crash کند، کلید بدون TTL می‌ماند و کاربر برای همیشه محدود می‌شود",
        "If the process crashes between them, the key has no TTL and the user stays limited forever",
      ],
      [
        "`EXPIRE` مقدار شمارنده را صفر می‌کند",
        "`EXPIRE` resets the counter to zero",
      ],
      [
        "`INCR` روی کلید ناموجود خطا می‌دهد",
        "`INCR` errors on a missing key",
      ],
      [
        "دو دستور هرگز نمی‌توانند در یک ثانیه اجرا شوند",
        "Two commands can never run within one second",
      ],
    ],
    a: [
      "این دو دستور با هم atomic نیستند. با `MULTI`/`EXEC`، اسکریپت Lua یا `EXPIRE key 60 NX` (Redis 7) می‌توان تضمین کرد کلید همیشه TTL داشته باشد.",
      "The two commands aren't atomic together. Use `MULTI`/`EXEC`, a Lua script or `EXPIRE key 60 NX` (Redis 7) to guarantee the key always gets a TTL.",
    ],
  },
  {
    id: "cache-m-keyspace-notifications",
    level: "middle",
    tags: ["redis", "pub-sub"],
    q: [
      "چرا نباید برای منطق حیاتی (مثل لغو سفارش) به keyspace notification رویداد `expired` تکیه کرد؟",
      "Why shouldn't critical logic (like cancelling orders) rely on `expired` keyspace notifications?",
    ],
    options: [
      [
        "از طریق Pub/Sub ارسال می‌شود (بدون ماندگاری) و ممکن است با تأخیر نسبت به TTL واقعی fire شود",
        "They're sent via Pub/Sub (not durable) and may fire later than the actual TTL",
      ],
      [
        "Redis اصلاً رویداد expired تولید نمی‌کند",
        "Redis never emits expired events",
      ],
      [
        "رویداد expired قبل از انقضای کلید ارسال می‌شود",
        "The expired event fires before the key expires",
      ],
      [
        "فقط در Redis Cluster کار می‌کند",
        "It only works in Redis Cluster",
      ],
    ],
    a: [
      "اگر subscriber قطع باشد رویداد از دست می‌رود، و رویداد فقط وقتی تولید می‌شود که Redis واقعاً کلید را (lazy یا active) حذف کند. برای job زمان‌بندی‌شده از sorted set با timestamp یا یک صف مطمئن استفاده کنید.",
      "If the subscriber is disconnected the event is lost, and it only fires when Redis actually removes the key (lazily or actively). For scheduled jobs use a timestamp-scored sorted set or a reliable queue.",
    ],
  },
  {
    id: "cache-m-ttl-choice",
    level: "middle",
    tags: ["ttl", "best-practices"],
    q: [
      "کدام رویکرد برای انتخاب TTL منطقی‌تر است؟",
      "Which approach to choosing TTLs is most sensible?",
    ],
    options: [
      [
        "TTL هر نوع داده را بر اساس نرخ تغییر و میزان تحمل stale بودن تعیین کنید و آن را با invalidation صریح ترکیب کنید",
        "Set each data type's TTL from its change rate and staleness tolerance, combined with explicit invalidation",
      ],
      [
        "یک TTL ثابت ۲۴ ساعته برای همه کلیدهای سیستم",
        "One fixed 24-hour TTL for every key in the system",
      ],
      [
        "بدون TTL و تکیه کامل بر eviction",
        "No TTLs, relying entirely on eviction",
      ],
      [
        "TTL بسیار کوتاه (۱ ثانیه) برای همه داده‌ها تا هرگز stale نشوند",
        "A tiny 1-second TTL for all data so it's never stale",
      ],
    ],
    a: [
      "مثلاً تنظیمات سراسری ساعت‌ها، پروفایل کاربر چند دقیقه و قیمت لحظه‌ای چند ثانیه. TTL حتی با invalidation صریح هم به‌عنوان تور ایمنی در برابر invalidationهای از دست رفته لازم است.",
      "For example, global config for hours, user profiles for minutes and live prices for seconds. Even with explicit invalidation, a TTL is a safety net against missed invalidations.",
    ],
  },
]);
