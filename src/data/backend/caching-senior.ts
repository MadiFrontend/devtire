import { build } from "../build";

export const cachingSenior = build("caching", [
  {
    id: "cache-s-cache-aside-race",
    level: "senior",
    tags: ["consistency", "invalidation"],
    q: [
      "در cache-aside با ترتیب «update DB سپس delete cache»، کدام سناریو هنوز می‌تواند مقدار stale را برای مدت طولانی در cache بگذارد؟",
      "In cache-aside with 'update DB then delete cache', which scenario can still leave a stale value cached for a long time?",
    ],
    options: [
      [
        "خواننده‌ای که روی miss مقدار قدیمی را خوانده، SET خود را بعد از delete نویسنده انجام دهد",
        "A reader that loaded the old value on a miss performs its SET after the writer's delete",
      ],
      [
        "دو خواننده هم‌زمان مقدار جدید را cache کنند",
        "Two readers concurrently cache the new value",
      ],
      [
        "نویسنده دو بار پشت سر هم delete کند",
        "The writer deletes twice in a row",
      ],
      [
        "TTL کلید کوتاه‌تر از زمان تراکنش باشد",
        "The key's TTL is shorter than the transaction",
      ],
    ],
    a: [
      "خواننده: miss، خواندن v1 از DB؛ نویسنده: نوشتن v2 و delete؛ خواننده: `SET v1`. حالا v1 تا پایان TTL می‌ماند. این پنجره کوچک است ولی واقعی؛ TTL، delayed double-delete، versioning یا invalidation مبتنی بر CDC آن را محدود می‌کنند.",
      "Reader: miss, reads v1; writer: writes v2 and deletes; reader: `SET v1`. Now v1 lives until TTL. The window is small but real; TTLs, delayed double-delete, versioning or CDC-based invalidation bound it.",
    ],
  },
  {
    id: "cache-s-versioned-set",
    level: "senior",
    tags: ["consistency", "lua"],
    q: [
      "چگونه می‌توان مطمئن شد یک خواننده کند مقدار قدیمی‌تر را روی مقدار جدیدتر در cache ننویسد؟",
      "How can you ensure a slow reader never overwrites a newer cached value with an older one?",
    ],
    options: [
      [
        "ذخیره version (مثلاً `updated_at` یا شماره نسخه ردیف) و یک اسکریپت Lua که فقط در صورت بزرگ‌تر بودن نسخه بنویسد",
        "Store a version (e.g. row version or `updated_at`) and use a Lua script that writes only if the version is newer",
      ],
      [
        "استفاده از `SET` با `XX` تا فقط کلیدهای موجود بازنویسی شوند",
        "Use `SET ... XX` so only existing keys are overwritten",
      ],
      [
        "pipelining همه SETها",
        "Pipeline every SET",
      ],
      [
        "افزایش `maxmemory-samples`",
        "Increase `maxmemory-samples`",
      ],
    ],
    a: [
      "مقایسه نسخه و نوشتن باید atomic باشد، پس Lua یا `WATCH`/`MULTI` لازم است. این عملاً یک compare-and-set مونوتونیک است و ترتیب نامرتب SETها را بی‌اثر می‌کند.",
      "The version compare and write must be atomic, so Lua or `WATCH`/`MULTI` is needed. It's effectively a monotonic compare-and-set that neutralizes out-of-order SETs.",
    ],
  },
  {
    id: "cache-s-cdc-invalidation",
    level: "senior",
    tags: ["invalidation", "consistency"],
    q: [
      "مزیت invalidation مبتنی بر CDC (مثلاً Debezium روی binlog/WAL) نسبت به delete در کد برنامه چیست؟",
      "What is the advantage of CDC-based invalidation (e.g. Debezium on binlog/WAL) over deleting in app code?",
    ],
    options: [
      [
        "فقط تغییرات commitشده را می‌بیند، از هر مسیر نوشتن (حتی اسکریپت دستی) پوشش می‌دهد و قابل retry است",
        "It sees only committed changes, covers every write path (even manual scripts) and is retryable",
      ],
      [
        "invalidation را کاملاً synchronous و بدون هیچ تأخیری انجام می‌دهد",
        "It invalidates fully synchronously with zero lag",
      ],
      [
        "نیاز به TTL را برای همیشه حذف می‌کند",
        "It removes the need for TTLs forever",
      ],
      [
        "بار خواندن دیتابیس را صفر می‌کند",
        "It reduces DB read load to zero",
      ],
    ],
    a: [
      "delete در کد ممکن است به‌خاطر crash بین commit و delete یا مسیرهای نوشتن فراموش‌شده انجام نشود. CDC این را reliable می‌کند ولی lag دارد، پس consistency همچنان eventual است.",
      "App-side deletes can be skipped due to a crash between commit and delete or forgotten write paths. CDC makes it reliable but adds lag, so consistency remains eventual.",
    ],
  },
  {
    id: "cache-s-xfetch",
    level: "senior",
    tags: ["stampede", "ttl"],
    q: [
      "probabilistic early expiration (الگوریتم XFetch) چگونه از stampede جلوگیری می‌کند؟",
      "How does probabilistic early expiration (XFetch) prevent stampedes?",
    ],
    options: [
      [
        "هر خواننده با احتمالی که با نزدیک شدن به انقضا (و هزینه recompute) افزایش می‌یابد، زودتر بازسازی را شروع می‌کند",
        "Each reader may recompute early with a probability that grows near expiry (scaled by recompute cost)",
      ],
      [
        "همه خواننده‌ها دقیقاً در لحظه انقضا هم‌زمان بازسازی می‌کنند",
        "All readers recompute together exactly at expiry",
      ],
      [
        "کلیدها را هرگز منقضی نمی‌کند و فقط با eviction حذف می‌شوند",
        "Keys never expire and only leave via eviction",
      ],
      [
        "یک lock سراسری روی کل cache می‌گیرد",
        "It takes a global lock on the entire cache",
      ],
    ],
    a: [
      "شرط رایج: `now - delta * beta * ln(rand()) >= expiry` که `delta` زمان محاسبه است. معمولاً فقط یک یا چند درخواست کمی قبل از انقضا recompute می‌کنند، بدون نیاز به lock هماهنگ.",
      "The usual condition is `now - delta * beta * ln(rand()) >= expiry`, where `delta` is compute time. Typically one or a few requests refresh slightly before expiry, with no coordinating lock.",
    ],
  },
  {
    id: "cache-s-soft-hard-ttl",
    level: "senior",
    tags: ["stampede", "availability"],
    q: [
      "الگوی soft TTL + hard TTL چه مزیتی دارد؟",
      "What does the soft TTL + hard TTL pattern provide?",
    ],
    options: [
      [
        "پس از soft TTL مقدار stale سرو و در پس‌زمینه تازه می‌شود؛ hard TTL سقف stale بودن و سرو در هنگام خرابی منبع را تعیین می‌کند",
        "After the soft TTL stale data is served while refreshing in the background; the hard TTL caps staleness and enables serving during origin outages",
      ],
      [
        "دو کپی از هر کلید در دو cluster جدا نگه می‌دارد",
        "It keeps two copies of each key in separate clusters",
      ],
      [
        "TTL را بر اساس اندازه مقدار تنظیم می‌کند",
        "It sets TTL based on value size",
      ],
      [
        "کلیدها را فقط با eviction حذف می‌کند",
        "It removes keys only through eviction",
      ],
    ],
    a: [
      "زمان soft در خود مقدار ذخیره می‌شود و TTL واقعی Redis برابر hard است. این همان ایده `stale-while-revalidate` و `stale-if-error` در سطح application است و latency و availability را بهبود می‌دهد.",
      "The soft deadline is stored in the value while the Redis TTL is the hard one. It's `stale-while-revalidate` and `stale-if-error` at the application level, improving latency and availability.",
    ],
  },
  {
    id: "cache-s-single-thread-impl",
    level: "senior",
    tags: ["redis", "internals"],
    q: [
      "کدام جمله درباره مدل threading در Redis 6+ دقیق است؟",
      "Which statement about Redis 6+ threading is accurate?",
    ],
    options: [
      [
        "اجرای دستورها روی یک thread است، اما I/O شبکه و آزادسازی lazy می‌تواند روی threadهای کمکی باشد",
        "Commands execute on one thread, but network I/O and lazy freeing can use helper threads",
      ],
      [
        "هر دستور روی یک thread جداگانه و موازی اجرا می‌شود",
        "Each command runs on its own parallel thread",
      ],
      [
        "Redis 6 کاملاً multi-threaded شد و atomicity دستورها حذف شد",
        "Redis 6 became fully multi-threaded and dropped command atomicity",
      ],
      [
        "Redis برای هر کلاینت یک process جدا fork می‌کند",
        "Redis forks a process per client",
      ],
    ],
    a: [
      "با `io-threads` خواندن/نوشتن socket و parse موازی می‌شود ولی اجرای دستورها همچنان سریالی است، پس atomicity حفظ می‌شود. fork فقط برای RDB/AOF rewrite استفاده می‌شود.",
      "With `io-threads`, socket reads/writes and parsing are parallelized, but command execution stays serial, preserving atomicity. Fork is only used for RDB/AOF rewrite.",
    ],
  },
  {
    id: "cache-s-fork-cow",
    level: "senior",
    tags: ["redis", "persistence", "memory"],
    q: [
      "چرا هنگام `BGSAVE` روی یک Redis پرنوشتن ممکن است مصرف حافظه تا نزدیک دو برابر برسد؟",
      "Why can memory nearly double during `BGSAVE` on a write-heavy Redis?",
    ],
    options: [
      [
        "fork از copy-on-write استفاده می‌کند و هر page تغییریافته در parent کپی می‌شود",
        "Fork uses copy-on-write, so every page modified in the parent gets copied",
      ],
      [
        "Redis قبل از ذخیره کل داده را در یک buffer جدید serialize می‌کند",
        "Redis serializes all data into a new buffer before saving",
      ],
      [
        "replicaها هم‌زمان داده را در حافظه master کپی می‌کنند",
        "Replicas copy data into the master's memory",
      ],
      [
        "AOF کل داده را دو بار در RAM نگه می‌دارد",
        "AOF keeps all data twice in RAM",
      ],
    ],
    a: [
      "child process یک snapshot با pageهای مشترک می‌بیند؛ هر نوشتن در parent آن page را کپی می‌کند. باید حافظه آزاد کافی (و غیرفعال کردن Transparent Huge Pages) را برای fork در نظر گرفت.",
      "The child sees a snapshot sharing pages; each parent write copies that page. Plan headroom for fork and disable Transparent Huge Pages, which amplify the copying.",
    ],
  },
  {
    id: "cache-s-redlock-caveat",
    level: "senior",
    tags: ["redis", "distributed-locks"],
    q: [
      "انتقاد اصلی (مثلاً از Martin Kleppmann) به Redlock برای lockهای حساس به correctness چیست؟",
      "What is the main criticism (e.g. by Martin Kleppmann) of Redlock for correctness-critical locks?",
    ],
    options: [
      [
        "به زمان‌بندی و ساعت‌ها وابسته است؛ با GC pause یا clock jump دو client ممکن است هم‌زمان فکر کنند lock دارند",
        "It relies on timing and clocks; GC pauses or clock jumps can let two clients believe they hold the lock",
      ],
      [
        "Redlock به بیش از ۱۰۰ نود Redis نیاز دارد",
        "Redlock requires over 100 Redis nodes",
      ],
      [
        "Redlock هرگز lock را آزاد نمی‌کند",
        "Redlock never releases locks",
      ],
      [
        "Redlock فقط روی Memcached کار می‌کند",
        "Redlock only works on Memcached",
      ],
    ],
    a: [
      "اگر client پس از گرفتن lock برای مدتی بیشتر از TTL متوقف شود، lock منقضی و به دیگری داده می‌شود و هر دو می‌نویسند. برای correctness باید fencing token داشت و storage آن را بررسی کند؛ Redlock برای efficiency قابل‌قبول است.",
      "If a client pauses longer than the TTL after acquiring, the lock expires and is granted to another, and both write. For correctness you need fencing tokens checked by storage; Redlock is fine for efficiency locks.",
    ],
  },
  {
    id: "cache-s-fencing-token",
    level: "senior",
    tags: ["distributed-locks"],
    q: [
      "fencing token در lock توزیع‌شده چگونه کار می‌کند؟",
      "How does a fencing token work with a distributed lock?",
    ],
    options: [
      [
        "هر بار گرفتن lock یک عدد افزایشی می‌دهد و منبع مقصد نوشتن با token کوچک‌تر از آخرین دیده‌شده را رد می‌کند",
        "Each acquisition returns an increasing number, and the target resource rejects writes with a token lower than the last seen",
      ],
      [
        "token یک رمز تصادفی است که lock را رمزنگاری می‌کند",
        "The token is a random secret that encrypts the lock",
      ],
      [
        "token تعداد retryهای مجاز client را مشخص می‌کند",
        "The token sets how many retries a client gets",
      ],
      [
        "token فقط برای log کردن استفاده می‌شود و اثری ندارد",
        "The token is only for logging and has no effect",
      ],
    ],
    a: [
      "حتی اگر client قدیمی بعد از pause بیدار شود و بنویسد، storage با دیدن token کهنه درخواستش را رد می‌کند. این نیازمند پشتیبانی منبع مقصد (مثل شرط `WHERE token < ?`) است.",
      "Even if a stale client wakes after a pause and writes, storage rejects its outdated token. This requires the target resource to check it (e.g. a conditional `WHERE token < ?`).",
    ],
  },
  {
    id: "cache-s-lock-release",
    level: "senior",
    tags: ["redis", "distributed-locks", "lua"],
    q: [
      "روش درست آزاد کردن lock گرفته‌شده با `SET lock val NX PX 30000` چیست؟",
      "What is the correct way to release a lock taken with `SET lock val NX PX 30000`?",
    ],
    options: [
      [
        "اسکریپت Lua که فقط اگر `GET lock` برابر مقدار یکتای همین client بود `DEL` کند",
        "A Lua script that `DEL`s only if `GET lock` equals this client's unique value",
      ],
      [
        "اجرای مستقیم `DEL lock`",
        "Just run `DEL lock`",
      ],
      [
        "`GET lock` و سپس در صورت تطابق یک `DEL` جداگانه",
        "`GET lock`, then a separate `DEL` if it matches",
      ],
      [
        "`EXPIRE lock 0` از هر client",
        "`EXPIRE lock 0` from any client",
      ],
    ],
    a: [
      "اگر lock منقضی و توسط client دیگری گرفته شده باشد، `DEL` ساده lock او را پاک می‌کند. GET و DEL جدا هم race دارند؛ پس check-and-delete باید در Lua اتمیک باشد.",
      "If the lock expired and another client took it, a plain `DEL` deletes their lock. Separate GET and DEL race too, so check-and-delete must be atomic in Lua.",
    ],
  },
  {
    id: "cache-s-failover-lock-loss",
    level: "senior",
    tags: ["redis", "distributed-locks", "replication"],
    q: [
      "چرا lock مبتنی بر یک master Redis با replica و Sentinel می‌تواند ایمنی را نقض کند؟",
      "Why can a lock on a single Redis master with a replica and Sentinel violate safety?",
    ],
    options: [
      [
        "replication async است؛ master ممکن است قبل از ارسال کلید lock از کار بیفتد و replica ارتقایافته lock را نداشته باشد",
        "Replication is async; the master may die before shipping the lock key, so the promoted replica lacks it",
      ],
      [
        "Sentinel همه lockها را هنگام failover عمداً حذف می‌کند",
        "Sentinel deliberately deletes all locks on failover",
      ],
      [
        "replicaها `NX` را پشتیبانی نمی‌کنند",
        "Replicas don't support `NX`",
      ],
      [
        "Sentinel ساعت سیستم همه نودها را reset می‌کند",
        "Sentinel resets all nodes' clocks",
      ],
    ],
    a: [
      "پس از failover، client دوم می‌تواند همان lock را روی master جدید بگیرد در حالی که client اول هنوز فکر می‌کند lock دارد. Redlock برای همین از چند master مستقل استفاده می‌کند، هرچند آن هم محدودیت‌های زمانی دارد.",
      "After failover a second client can acquire the same lock on the new master while the first still thinks it holds it. Redlock uses independent masters for this reason, though it has timing caveats too.",
    ],
  },
  {
    id: "cache-s-cluster-multikey",
    level: "senior",
    tags: ["redis", "cluster"],
    q: [
      "در Redis Cluster کدام محدودیت برای تراکنش‌ها و اسکریپت‌های Lua وجود دارد؟",
      "What restriction does Redis Cluster impose on transactions and Lua scripts?",
    ],
    options: [
      [
        "همه کلیدهای درگیر باید در یک hash slot باشند و باید صراحتاً به‌عنوان KEYS پاس داده شوند",
        "All involved keys must be in one hash slot and be passed explicitly as KEYS",
      ],
      [
        "تراکنش‌ها در Cluster کاملاً ممنوع‌اند",
        "Transactions are entirely forbidden in Cluster",
      ],
      [
        "اسکریپت‌ها روی همه masterها به‌صورت atomic اجرا می‌شوند",
        "Scripts run atomically across all masters",
      ],
      [
        "فقط ۱۰ کلید در هر اسکریپت مجاز است",
        "Only 10 keys are allowed per script",
      ],
    ],
    a: [
      "Cluster هیچ تراکنش توزیع‌شده‌ای بین slotها ندارد. با hash tag مثل `{order:9}` کلیدهای مرتبط را در یک slot قرار دهید و نام کلیدها را داخل اسکریپت hardcode نکنید.",
      "Cluster has no cross-slot distributed transactions. Co-locate related keys with hash tags like `{order:9}` and never hardcode key names inside scripts.",
    ],
  },
  {
    id: "cache-s-why-16384",
    level: "senior",
    tags: ["redis", "cluster"],
    q: [
      "دلیل انتخاب ۱۶۳۸۴ slot در Redis Cluster چیست؟",
      "Why does Redis Cluster use 16384 slots?",
    ],
    options: [
      [
        "bitmap اسلات‌ها در پیام‌های heartbeat گاسیپ کوچک (۲KB) می‌ماند و برای حداکثر حدود ۱۰۰۰ master کافی است",
        "The slot bitmap in gossip heartbeats stays small (2KB) and suffices for up to ~1000 masters",
      ],
      [
        "چون CRC16 فقط می‌تواند عددی تا ۱۶۳۸۴ تولید کند",
        "Because CRC16 can only output values up to 16384",
      ],
      [
        "چون هر نود حداکثر ۱۶۳۸۴ کلید نگه می‌دارد",
        "Because each node can hold at most 16384 keys",
      ],
      [
        "چون ۱۶۳۸۴ برابر تعداد پورت‌های آزاد سیستم‌عامل است",
        "Because 16384 equals the OS's free port count",
      ],
    ],
    a: [
      "CRC16 خروجی ۱۶ بیتی (۶۵۵۳۶) دارد ولی Redis از `mod 16384` استفاده می‌کند. با ۶۵۵۳۶ slot، bitmap در هر heartbeat ۸KB می‌شد که سربار شبکه را بالا می‌برد.",
      "CRC16 yields 16 bits (65536), but Redis uses `mod 16384`. With 65536 slots each heartbeat bitmap would be 8KB, inflating network overhead.",
    ],
  },
  {
    id: "cache-s-moved-ask",
    level: "senior",
    tags: ["redis", "cluster"],
    q: [
      "تفاوت redirectهای `MOVED` و `ASK` در Redis Cluster چیست؟",
      "What is the difference between `MOVED` and `ASK` redirects in Redis Cluster?",
    ],
    options: [
      [
        "`MOVED` یعنی slot به‌طور دائم منتقل شده و client باید نقشه را به‌روز کند؛ `ASK` موقت و فقط برای همان درخواست در حین migration است",
        "`MOVED` means the slot moved permanently and the client should update its map; `ASK` is temporary, for that request during migration",
      ],
      [
        "`ASK` دائمی و `MOVED` موقت است",
        "`ASK` is permanent and `MOVED` temporary",
      ],
      [
        "هر دو یعنی نود down است",
        "Both mean the node is down",
      ],
      [
        "`MOVED` فقط برای replicaها ارسال می‌شود",
        "`MOVED` is only sent for replicas",
      ],
    ],
    a: [
      "در حین resharding، کلیدهای منتقل‌شده روی نود مقصدند؛ client باید `ASKING` بفرستد و سپس دستور را تکرار کند، بدون تغییر slot map. پس از اتمام migration نود قدیمی `MOVED` برمی‌گرداند.",
      "During resharding, migrated keys live on the target; the client sends `ASKING` then retries without updating its slot map. After migration completes, the old node returns `MOVED`.",
    ],
  },
  {
    id: "cache-s-sentinel-vs-cluster",
    level: "senior",
    tags: ["redis", "high-availability", "cluster"],
    q: [
      "چه زمانی Sentinel نسبت به Cluster انتخاب بهتری است؟",
      "When is Sentinel a better choice than Cluster?",
    ],
    options: [
      [
        "وقتی داده و throughput در یک نود جا می‌شود و دستورهای چندکلیدی، Lua آزاد و چند database لازم است",
        "When data and throughput fit one node and you need free multi-key ops, unrestricted Lua and multiple databases",
      ],
      [
        "وقتی داده از RAM یک ماشین بزرگ‌تر است",
        "When data exceeds a single machine's RAM",
      ],
      [
        "وقتی نیاز به scale خطی نوشتن روی چند master است",
        "When you need linear write scaling across masters",
      ],
      [
        "وقتی هیچ نیازی به failover خودکار نیست",
        "When automatic failover isn't needed",
      ],
    ],
    a: [
      "Sentinel سادگی یک master را با HA حفظ می‌کند؛ Cluster sharding می‌دهد اما محدودیت cross-slot، فقط database `0` و clientهای cluster-aware دارد.",
      "Sentinel keeps single-master simplicity with HA; Cluster adds sharding at the cost of cross-slot limits, only database `0` and cluster-aware clients.",
    ],
  },
  {
    id: "cache-s-split-brain",
    level: "senior",
    tags: ["redis", "replication", "high-availability"],
    q: [
      "تنظیمات `min-replicas-to-write` و `min-replicas-max-lag` چه ریسکی را کاهش می‌دهند؟",
      "What risk do `min-replicas-to-write` and `min-replicas-max-lag` reduce?",
    ],
    options: [
      [
        "پذیرش نوشتن توسط master ایزوله‌شده در partition که پس از failover از دست می‌رود",
        "An isolated master in a partition accepting writes that are lost after failover",
      ],
      [
        "پر شدن حافظه به‌خاطر big keyها",
        "Memory filling up due to big keys",
      ],
      [
        "stampede روی کلیدهای پرکاربرد",
        "Stampedes on hot keys",
      ],
      [
        "کندی دستور `KEYS`",
        "Slowness of the `KEYS` command",
      ],
    ],
    a: [
      "اگر master تعداد کافی replica با lag کم نبیند، نوشتن را رد می‌کند. این پنجره از دست رفتن داده در split-brain را محدود می‌کند ولی آن را صفر نمی‌کند، چون replication همچنان async است.",
      "If the master doesn't see enough low-lag replicas, it rejects writes. This bounds data loss in split-brain but doesn't eliminate it, since replication stays async.",
    ],
  },
  {
    id: "cache-s-psync",
    level: "senior",
    tags: ["redis", "replication"],
    q: [
      "پس از قطعی کوتاه شبکه، چه چیزی تعیین می‌کند replica بتواند partial resync انجام دهد و full sync لازم نباشد؟",
      "After a brief network blip, what determines whether a replica can partial-resync instead of doing a full sync?",
    ],
    options: [
      [
        "اینکه offset گم‌شده هنوز در replication backlog (`repl-backlog-size`) master باشد",
        "Whether the missed offset is still in the master's replication backlog (`repl-backlog-size`)",
      ],
      [
        "اینکه replica از AOF استفاده کند",
        "Whether the replica uses AOF",
      ],
      [
        "تعداد کلیدهای دارای TTL",
        "The number of keys with TTLs",
      ],
      [
        "مقدار `maxmemory-policy` روی replica",
        "The replica's `maxmemory-policy`",
      ],
    ],
    a: [
      "master یک buffer حلقوی از جریان replication نگه می‌دارد. اگر backlog کوچک باشد و قطعی طول بکشد، full sync با RDB لازم می‌شود که هزینه fork و شبکه بالایی دارد؛ backlog را بر اساس نرخ نوشتن تنظیم کنید.",
      "The master keeps a circular buffer of the replication stream. If it's too small for the outage, a full RDB sync is needed, costly in fork and bandwidth; size the backlog by write rate.",
    ],
  },
  {
    id: "cache-s-aof-rewrite",
    level: "senior",
    tags: ["redis", "persistence"],
    q: [
      "AOF rewrite (`BGREWRITEAOF`) چه مشکلی را حل می‌کند؟",
      "What problem does AOF rewrite (`BGREWRITEAOF`) solve?",
    ],
    options: [
      [
        "رشد بی‌پایان فایل AOF، با ساختن حداقل دستورها برای بازسازی وضعیت فعلی",
        "Unbounded AOF growth, by producing the minimal commands to rebuild current state",
      ],
      [
        "خطاهای checksum در فایل RDB",
        "Checksum errors in the RDB file",
      ],
      [
        "lag بین master و replica",
        "Lag between master and replica",
      ],
      [
        "رمزنگاری نشدن داده‌ها روی دیسک",
        "Unencrypted data on disk",
      ],
    ],
    a: [
      "مثلاً ۱۰۰۰ بار `INCR` به یک `SET` تبدیل می‌شود. از Redis 7، AOF چندبخشی است (base RDB + incremental) که rewrite را ساده‌تر و امن‌تر می‌کند.",
      "For example, 1000 `INCR`s collapse into one `SET`. Since Redis 7, AOF is multi-part (an RDB base plus incremental files), making rewrites simpler and safer.",
    ],
  },
  {
    id: "cache-s-cache-durable-choice",
    level: "senior",
    tags: ["redis", "persistence", "trade-offs"],
    q: [
      "برای Redisی که فقط cache خالص است (منبع حقیقت در DB)، کدام پیکربندی معمولاً منطقی‌تر است؟",
      "For a Redis used purely as a cache (truth lives in the DB), which configuration is usually most sensible?",
    ],
    options: [
      [
        "persistence خاموش یا فقط RDB گاه‌به‌گاه، `allkeys-lru`/`allkeys-lfu` و برنامه‌ریزی برای cold start",
        "Persistence off or occasional RDB, `allkeys-lru`/`allkeys-lfu`, and a plan for cold starts",
      ],
      [
        "AOF با `appendfsync always` و `noeviction`",
        "AOF with `appendfsync always` and `noeviction`",
      ],
      [
        "`volatile-ttl` بدون هیچ TTLای روی کلیدها",
        "`volatile-ttl` with no TTLs on any keys",
      ],
      [
        "غیرفعال کردن `maxmemory` تا سیستم‌عامل swap کند",
        "Disable `maxmemory` and let the OS swap",
      ],
    ],
    a: [
      "fsync همیشگی برای cache هزینه بی‌دلیل است و `noeviction` باعث خطای نوشتن می‌شود. `volatile-*` بدون TTL مثل `noeviction` رفتار می‌کند و swap شدن Redis latency را نابود می‌کند.",
      "Always-fsync is wasted cost for a cache and `noeviction` causes write errors. `volatile-*` without TTLs behaves like `noeviction`, and swapping destroys Redis latency.",
    ],
  },
  {
    id: "cache-s-lfu-redis",
    level: "senior",
    tags: ["redis", "eviction"],
    q: [
      "LFU در Redis (`allkeys-lfu`) چگونه فرکانس دسترسی را نگه می‌دارد؟",
      "How does Redis LFU (`allkeys-lfu`) track access frequency?",
    ],
    options: [
      [
        "با یک شمارنده لگاریتمی ۸ بیتی که احتمالاتی افزایش و با گذر زمان decay می‌شود",
        "With an 8-bit logarithmic counter that increments probabilistically and decays over time",
      ],
      [
        "با شمارنده دقیق ۶۴ بیتی برای هر کلید بدون decay",
        "With an exact 64-bit counter per key and no decay",
      ],
      [
        "با ثبت timestamp هر دسترسی در یک list",
        "By logging every access timestamp in a list",
      ],
      [
        "با شمارش تعداد بایت‌های خوانده‌شده",
        "By counting bytes read",
      ],
    ],
    a: [
      "Morris counter در ۸ بیت میلیون‌ها دسترسی را تقریب می‌زند و `lfu-decay-time` باعث می‌شود کلیدهایی که قبلاً داغ بودند به‌تدریج سرد شوند. `lfu-log-factor` حساسیت را تنظیم می‌کند.",
      "A Morris-style counter approximates millions of hits in 8 bits, and `lfu-decay-time` lets formerly hot keys cool down. `lfu-log-factor` tunes sensitivity.",
    ],
  },
  {
    id: "cache-s-scan-resize",
    level: "senior",
    tags: ["redis", "internals"],
    q: [
      "چرا `SCAN` با وجود rehash شدن dict هیچ کلیدی را که در کل پیمایش حضور داشته از دست نمی‌دهد؟",
      "Why does `SCAN` never miss a key present for the whole iteration, even as the dict rehashes?",
    ],
    options: [
      [
        "cursor با reverse binary iteration روی بیت‌های بالای bucket جلو می‌رود که با بزرگ/کوچک شدن جدول سازگار است",
        "The cursor advances by reverse-binary iteration over high bits, which stays valid across table resizes",
      ],
      [
        "Redis در طول SCAN مانع rehash می‌شود",
        "Redis blocks rehashing during SCAN",
      ],
      [
        "SCAN یک کپی کامل از keyspace می‌گیرد",
        "SCAN takes a full keyspace copy",
      ],
      [
        "SCAN کلیدها را به‌ترتیب الفبا برمی‌گرداند",
        "SCAN returns keys alphabetically",
      ],
    ],
    a: [
      "افزایش cursor از بیت‌های پرارزش، bucketهای منشعب‌شده از یک bucket قدیمی را کنار هم نگه می‌دارد. بهای این تضمین امکان تکرار کلید هنگام کوچک شدن جدول است.",
      "Incrementing from the high bits keeps buckets split from the same old bucket adjacent. The price of this guarantee is possible duplicates when the table shrinks.",
    ],
  },
  {
    id: "cache-s-zset-internals",
    level: "senior",
    tags: ["redis", "sorted-set", "internals"],
    q: [
      "sorted set بزرگ در Redis با چه ساختاری پیاده‌سازی می‌شود که هم `ZSCORE` در O(1) و هم range در O(log N) ممکن شود؟",
      "What structure backs large Redis sorted sets, giving O(1) `ZSCORE` and O(log N) range queries?",
    ],
    options: [
      [
        "ترکیب skip list (برای ترتیب و rank) و hash table (برای member به score)",
        "A skip list (for order and rank) combined with a hash table (member to score)",
      ],
      [
        "یک B-tree روی دیسک",
        "An on-disk B-tree",
      ],
      [
        "یک آرایه مرتب که در هر درج کامل sort می‌شود",
        "A sorted array fully re-sorted on every insert",
      ],
      [
        "یک heap دودویی",
        "A binary heap",
      ],
    ],
    a: [
      "skip list درج و range را در O(log N) و rank را با span ممکن می‌کند، و dict جست‌وجوی score را O(1) می‌کند. sorted setهای کوچک با listpack فشرده ذخیره می‌شوند.",
      "The skip list gives O(log N) inserts and ranges plus rank via spans, while the dict gives O(1) score lookup. Small sorted sets use compact listpack encoding.",
    ],
  },
  {
    id: "cache-s-leaderboard-ties",
    level: "senior",
    tags: ["redis", "sorted-set", "leaderboard"],
    q: [
      "در leaderboard با sorted set، چگونه بازیکنی که زودتر به یک امتیاز رسیده را در تساوی بالاتر قرار دهیم؟",
      "In a sorted-set leaderboard, how do you rank the player who reached a score first higher on ties?",
    ],
    options: [
      [
        "score ترکیبی مثل `points * 1e10 + (MAX_TS - timestamp)` در محدوده دقت double",
        "A composite score like `points * 1e10 + (MAX_TS - timestamp)` within double precision",
      ],
      [
        "Redis تساوی‌ها را خودکار بر اساس زمان درج مرتب می‌کند",
        "Redis orders ties by insertion time automatically",
      ],
      [
        "استفاده از `ZADD ... GT` برای همه بازیکنان",
        "Use `ZADD ... GT` for all players",
      ],
      [
        "ذخیره بازیکنان در List به‌جای sorted set",
        "Store players in a list instead",
      ],
    ],
    a: [
      "در تساوی score، Redis اعضا را به‌صورت lexicographic مرتب می‌کند نه زمانی. score یک double با ۵۳ بیت دقت صحیح است، پس باید بودجه بیت‌ها را برای امتیاز و زمان حساب کرد.",
      "On equal scores Redis orders members lexicographically, not by time. Scores are doubles with 53 bits of integer precision, so budget bits for points and time.",
    ],
  },
  {
    id: "cache-s-sliding-log-vs-counter",
    level: "senior",
    tags: ["rate-limiting", "trade-offs"],
    q: [
      "برای rate limit یک API با میلیون‌ها کاربر و حد ۱۰۰۰۰ درخواست در ساعت، چرا sliding window counter معمولاً بر sliding log (sorted set) ترجیح دارد؟",
      "For an API with millions of users and a 10,000/hour limit, why is a sliding window counter usually preferred over a sliding log (sorted set)?",
    ],
    options: [
      [
        "sliding log برای هر درخواست یک عضو نگه می‌دارد و حافظه را منفجر می‌کند؛ counter با وزن‌دهی دو پنجره حافظه O(1) دارد",
        "A sliding log stores one member per request and blows up memory; a weighted two-window counter is O(1) memory",
      ],
      [
        "sliding log اصلاً دقیق نیست",
        "A sliding log is not accurate at all",
      ],
      [
        "sorted set در Cluster پشتیبانی نمی‌شود",
        "Sorted sets aren't supported in Cluster",
      ],
      [
        "counter هیچ خطای تقریبی ندارد",
        "The counter has zero approximation error",
      ],
    ],
    a: [
      "sliding window counter تخمین می‌زند: `prev * (1 - elapsed/window) + curr`. کمی تقریبی است ولی برای اکثر کاربردها کافی و بسیار ارزان‌تر است.",
      "The sliding window counter estimates `prev * (1 - elapsed/window) + curr`. It's slightly approximate but good enough for most uses and far cheaper.",
    ],
  },
  {
    id: "cache-s-global-rate-limit",
    level: "senior",
    tags: ["rate-limiting", "distributed"],
    q: [
      "برای rate limiting سراسری در چند region با latency بالا بین regionها، کدام رویکرد عملی‌تر است؟",
      "For global rate limiting across regions with high inter-region latency, which approach is more practical?",
    ],
    options: [
      [
        "سهمیه محلی در هر region با همگام‌سازی async و پذیرش کمی overshoot",
        "Per-region local quotas with async synchronization, accepting slight overshoot",
      ],
      [
        "یک Redis مرکزی که همه regionها برای هر درخواست synchronous به آن بروند",
        "One central Redis that every region hits synchronously per request",
      ],
      [
        "Redlock روی همه regionها برای هر درخواست",
        "Redlock across all regions on every request",
      ],
      [
        "غیرفعال کردن rate limiting برای regionهای دور",
        "Disable rate limiting for distant regions",
      ],
    ],
    a: [
      "رفت‌وبرگشت بین قاره‌ای به هر درخواست ده‌ها تا صدها میلی‌ثانیه اضافه می‌کند و نقطه خرابی واحد می‌سازد. در عمل دقت مطلق را با latency و availability مبادله می‌کنند.",
      "A cross-continent round-trip adds tens to hundreds of ms per request and creates a single point of failure. In practice you trade exactness for latency and availability.",
    ],
  },
  {
    id: "cache-s-hot-key-detect",
    level: "senior",
    tags: ["hot-keys", "redis", "observability"],
    q: [
      "برای شناسایی hot keyها در Redis production کدام روش کم‌خطرتر است؟",
      "Which method is least risky for detecting hot keys in production Redis?",
    ],
    options: [
      [
        "`redis-cli --hotkeys` با سیاست LFU یا نمونه‌برداری سمت client/proxy",
        "`redis-cli --hotkeys` under an LFU policy, or client/proxy-side sampling",
      ],
      [
        "اجرای طولانی‌مدت `MONITOR` روی master پرترافیک",
        "Running `MONITOR` for a long time on a busy master",
      ],
      [
        "اجرای `KEYS *` و شمارش دستی",
        "Running `KEYS *` and counting manually",
      ],
      [
        "`DEBUG SLEEP` برای کند کردن ترافیک و مشاهده",
        "`DEBUG SLEEP` to slow traffic and observe",
      ],
    ],
    a: [
      "`--hotkeys` از `OBJECT FREQ` (نیازمند policy از نوع LFU) و `SCAN` استفاده می‌کند. `MONITOR` می‌تواند throughput را به‌شدت کاهش دهد و `KEYS` سرور را block می‌کند.",
      "`--hotkeys` relies on `OBJECT FREQ` (requires an LFU policy) and `SCAN`. `MONITOR` can sharply cut throughput and `KEYS` blocks the server.",
    ],
  },
  {
    id: "cache-s-big-key-split",
    level: "senior",
    tags: ["big-keys", "redis", "cluster"],
    q: [
      "یک hash با ۵۰ میلیون فیلد (`user:settings`) در Cluster باعث عدم توازن حافظه شده است. راه‌حل مناسب چیست؟",
      "A 50M-field hash (`user:settings`) causes memory imbalance in Cluster. What's an appropriate fix?",
    ],
    options: [
      [
        "bucket کردن به چندین hash مثل `user:settings:{id % 1024}` تا در slotهای مختلف پخش شوند",
        "Bucket into many hashes like `user:settings:{id % 1024}` so they spread across slots",
      ],
      [
        "افزودن replica بیشتر به همان shard",
        "Add more replicas to the same shard",
      ],
      [
        "تغییر `maxmemory-policy` به `noeviction`",
        "Switch `maxmemory-policy` to `noeviction`",
      ],
      [
        "خواندن آن با `HGETALL` در هر درخواست",
        "Read it with `HGETALL` on every request",
      ],
    ],
    a: [
      "یک کلید تنها در یک slot و یک shard است؛ replica حافظه master را کم نمی‌کند. bucket کردن هم توزیع را متوازن و هم hashهای کوچک‌تر را مشمول encoding فشرده می‌کند.",
      "A single key lives in one slot on one shard; replicas don't reduce master memory. Bucketing balances distribution and keeps smaller hashes in the compact encoding.",
    ],
  },
  {
    id: "cache-s-client-side-tracking",
    level: "senior",
    tags: ["redis", "multi-level", "invalidation"],
    q: [
      "قابلیت client-side caching در Redis 6 (`CLIENT TRACKING`) چه کاری انجام می‌دهد؟",
      "What does Redis 6 client-side caching (`CLIENT TRACKING`) do?",
    ],
    options: [
      [
        "سرور کلیدهای خوانده‌شده توسط client را ردیابی و هنگام تغییر، پیام invalidation به آن client می‌فرستد",
        "The server tracks keys a client read and pushes invalidation messages to it when they change",
      ],
      [
        "Redis داده‌ها را مستقیماً در حافظه client کپی و همگام نگه می‌دارد",
        "Redis copies and syncs data directly into client memory",
      ],
      [
        "cache مرورگر را از طریق هدر HTTP کنترل می‌کند",
        "It controls browser caching via HTTP headers",
      ],
      [
        "دستورهای خواندنی را روی replicaها cache می‌کند",
        "It caches read commands on replicas",
      ],
    ],
    a: [
      "این مکانیزم L1 درون‌پردازه را بدون TTL کوتاه دقیق‌تر نگه می‌دارد. حالت پیش‌فرض برای هر client جدول کلیدها نگه می‌دارد و حالت `BCAST` بر اساس prefix کار می‌کند تا حافظه سرور کمتر مصرف شود.",
      "It keeps an in-process L1 accurate without relying on short TTLs. Default mode tracks keys per client in a server table, while `BCAST` mode works by prefix to save server memory.",
    ],
  },
  {
    id: "cache-s-multi-level-consistency",
    level: "senior",
    tags: ["multi-level", "consistency"],
    q: [
      "در cache چندسطحی (L1 محلی، L2 Redis، DB)، ترتیب صحیح invalidation پس از نوشتن چیست؟",
      "In a multi-level cache (local L1, Redis L2, DB), what is the correct invalidation order after a write?",
    ],
    options: [
      [
        "commit در DB، سپس invalidate کردن L2، سپس broadcast برای invalidate کردن L1 همه instanceها",
        "Commit to DB, then invalidate L2, then broadcast to invalidate L1 on all instances",
      ],
      [
        "invalidate کردن L1، سپس DB، سپس L2 فقط روی همان instance",
        "Invalidate L1, then DB, then L2 only on that instance",
      ],
      [
        "فقط L1 را invalidate کنید؛ L2 خودش همگام می‌شود",
        "Invalidate only L1; L2 syncs itself",
      ],
      [
        "ترتیب اهمیتی ندارد چون همه synchronous هستند",
        "Order doesn't matter since everything is synchronous",
      ],
    ],
    a: [
      "اگر L1 قبل از L2 پاک شود، یک instance ممکن است مقدار قدیمی را دوباره از L2 بخواند و در L1 بگذارد. پاک کردن از پایین به بالا (نزدیک به منبع اول) این مشکل را کم می‌کند؛ TTL کوتاه L1 هم یک تور ایمنی است.",
      "If L1 is cleared before L2, an instance can refill L1 with the old L2 value. Invalidate from the source outward, and keep L1's short TTL as a safety net.",
    ],
  },
  {
    id: "cache-s-cache-warming-deploy",
    level: "senior",
    tags: ["avalanche", "operations"],
    q: [
      "پس از flush ناخواسته کل cluster ردیس در ساعت اوج، اولین اقدام برای محافظت از دیتابیس چیست؟",
      "After an accidental full Redis flush at peak hours, what's the first step to protect the database?",
    ],
    options: [
      [
        "فعال‌سازی load shedding/rate limiting و request coalescing و warm کردن تدریجی کلیدهای داغ",
        "Enable load shedding/rate limiting and request coalescing, and gradually warm hot keys",
      ],
      [
        "افزایش فوری TTL همه کلیدها به یک هفته",
        "Immediately raise every TTL to a week",
      ],
      [
        "restart همه سرورهای برنامه",
        "Restart all application servers",
      ],
      [
        "غیرفعال کردن کامل cache تا شب",
        "Disable caching entirely until night",
      ],
    ],
    a: [
      "cache خالی یعنی تمام ترافیک به DB می‌رسد (avalanche). محدودسازی هم‌زمانی بازسازی، circuit breaker، سرو کردن پاسخ degraded و پیش‌گرم کردن کلیدهای پرتکرار از DB را از سقوط نجات می‌دهد.",
      "An empty cache sends all traffic to the DB (avalanche). Bounding rebuild concurrency, circuit breakers, degraded responses and pre-warming top keys keep the DB alive.",
    ],
  },
  {
    id: "cache-s-negative-cache-bloom-update",
    level: "senior",
    tags: ["penetration", "bloom-filter"],
    q: [
      "محدودیت اصلی Bloom filter استاندارد برای جلوگیری از penetration در سیستمی که رکوردها حذف می‌شوند چیست؟",
      "What is the key limitation of a standard Bloom filter against penetration when records get deleted?",
    ],
    options: [
      [
        "امکان حذف عنصر ندارد؛ به counting/cuckoo filter یا بازسازی دوره‌ای نیاز است",
        "It can't remove elements; you need a counting/cuckoo filter or periodic rebuilds",
      ],
      [
        "false negative تولید می‌کند و رکوردهای موجود را رد می‌کند",
        "It produces false negatives and rejects existing records",
      ],
      [
        "حافظه آن با تعداد درخواست‌ها رشد می‌کند",
        "Its memory grows with request count",
      ],
      [
        "فقط با کلیدهای عددی کار می‌کند",
        "It only works with numeric keys",
      ],
    ],
    a: [
      "پاک کردن بیت‌ها ممکن است عناصر دیگر را هم پاک کند. رکوردهای حذف‌شده فقط false positive بیشتری ایجاد می‌کنند (به cache/DB می‌رسند)، پس filter باید دوره‌ای بازسازی شود؛ RedisBloom هم Cuckoo filter با حذف دارد.",
      "Clearing bits could remove other elements. Deleted records just raise false positives (they reach cache/DB), so rebuild the filter periodically; RedisBloom also offers deletable Cuckoo filters.",
    ],
  },
  {
    id: "cache-s-transactional-outbox-cache",
    level: "senior",
    tags: ["invalidation", "consistency"],
    q: [
      "چرا حذف کلید cache داخل تراکنش دیتابیس (قبل از commit) ایده بدی است؟",
      "Why is deleting the cache key inside the DB transaction (before commit) a bad idea?",
    ],
    options: [
      [
        "خواننده هم‌زمان ممکن است قبل از commit مقدار قدیمی را بخواند و cache کند؛ و rollback هم invalidation بی‌مورد ایجاد می‌کند",
        "A concurrent reader may re-cache the old value before commit, and a rollback causes needless invalidation",
      ],
      [
        "Redis داخل تراکنش SQL دستور نمی‌پذیرد",
        "Redis rejects commands inside SQL transactions",
      ],
      [
        "تراکنش دیتابیس را به‌طور خودکار rollback می‌کند",
        "It automatically rolls back the DB transaction",
      ],
      [
        "باعث deadlock در Redis می‌شود",
        "It causes deadlocks in Redis",
      ],
    ],
    a: [
      "تا commit، بقیه هنوز مقدار قدیمی را در DB می‌بینند و می‌توانند آن را دوباره cache کنند. invalidation باید پس از commit (مثلاً با after-commit hook یا outbox/CDC) انجام شود.",
      "Until commit, others still see the old DB value and may re-cache it. Invalidate after commit (via an after-commit hook or outbox/CDC).",
    ],
  },
  {
    id: "cache-s-write-behind-ordering",
    level: "senior",
    tags: ["write-behind", "consistency"],
    q: [
      "در write-behind با چند worker که صف نوشتن را flush می‌کنند، چه چیزی برای درستی داده حیاتی است؟",
      "In write-behind with multiple workers flushing the write queue, what is critical for correctness?",
    ],
    options: [
      [
        "حفظ ترتیب نوشتن‌ها برای هر کلید (مثلاً partition بر اساس کلید) و idempotent بودن flush",
        "Preserving per-key write order (e.g. partition by key) and idempotent flushes",
      ],
      [
        "flush کردن به ترتیب تصادفی برای توزیع بار",
        "Flushing in random order to spread load",
      ],
      [
        "حذف همه TTLها",
        "Removing all TTLs",
      ],
      [
        "استفاده از `KEYS` برای پیدا کردن کلیدهای dirty",
        "Using `KEYS` to find dirty keys",
      ],
    ],
    a: [
      "اگر دو نوشتن یک کلید توسط workerهای مختلف به ترتیب معکوس اعمال شوند، DB مقدار قدیمی را نگه می‌دارد. coalescing نوشتن‌های پیاپی یک کلید هم بار DB را کاهش می‌دهد.",
      "If two writes to one key are applied out of order by different workers, the DB keeps the old value. Coalescing successive writes per key also reduces DB load.",
    ],
  },
  {
    id: "cache-s-consistent-hashing",
    level: "senior",
    tags: ["distributed-cache", "sharding"],
    q: [
      "چرا sharding کلاینت‌محور Memcached با `hash(key) % N` هنگام افزودن یک نود مشکل‌ساز است و چه جایگزینی دارد؟",
      "Why is client-side Memcached sharding with `hash(key) % N` problematic when adding a node, and what's the alternative?",
    ],
    options: [
      [
        "تقریباً همه کلیدها نگاشت جدید می‌گیرند و miss انبوه رخ می‌دهد؛ consistent hashing فقط حدود 1/N کلیدها را جابه‌جا می‌کند",
        "Almost all keys remap causing mass misses; consistent hashing moves only about 1/N of keys",
      ],
      [
        "Memcached افزودن نود را پشتیبانی نمی‌کند",
        "Memcached doesn't support adding nodes",
      ],
      [
        "فقط کلیدهای نود جدید از دست می‌روند",
        "Only keys on the new node are lost",
      ],
      [
        "mod N توزیع نامتوازن می‌دهد ولی جابه‌جایی ندارد",
        "mod N is unbalanced but causes no remapping",
      ],
    ],
    a: [
      "با تغییر N تقریباً هر `hash % N` عوض می‌شود و cache عملاً خالی می‌شود. consistent hashing (مثل ketama) با virtual node هم جابه‌جایی را کم و هم توزیع را متوازن می‌کند.",
      "Changing N alters nearly every `hash % N`, effectively emptying the cache. Consistent hashing (e.g. ketama) with virtual nodes minimizes movement and balances load.",
    ],
  },
  {
    id: "cache-s-memcached-vs-redis-tradeoff",
    level: "senior",
    tags: ["memcached", "redis", "trade-offs"],
    q: [
      "در چه شرایطی Memcached می‌تواند انتخاب بهتری از Redis باشد؟",
      "When can Memcached be a better choice than Redis?",
    ],
    options: [
      [
        "cache ساده blob با حجم بالا که از چندنخی بودن روی یک ماشین پرهسته و slab allocator پیش‌بینی‌پذیر سود می‌برد",
        "A simple high-volume blob cache benefiting from multithreading on many-core boxes and a predictable slab allocator",
      ],
      [
        "وقتی به sorted set برای leaderboard نیاز است",
        "When sorted sets for leaderboards are needed",
      ],
      [
        "وقتی persistence و replication داخلی لازم است",
        "When built-in persistence and replication are required",
      ],
      [
        "وقتی Pub/Sub و Streams لازم است",
        "When Pub/Sub and Streams are needed",
      ],
    ],
    a: [
      "Memcached چندنخی است و روی یک نود بزرگ از چند هسته استفاده می‌کند، اما فقط string، بدون persistence و بدون replication داخلی دارد. Redis انعطاف بیشتری دارد ولی برای scale CPU معمولاً به چند instance یا Cluster نیاز است.",
      "Memcached is multithreaded and uses many cores on one node, but offers only strings with no persistence or built-in replication. Redis is more flexible but usually needs multiple instances or Cluster to scale CPU.",
    ],
  },
  {
    id: "cache-s-latency-spikes",
    level: "senior",
    tags: ["redis", "observability", "performance"],
    q: [
      "Redis به‌طور دوره‌ای latency spike چندصد میلی‌ثانیه‌ای دارد. کدام علت محتمل‌تر است؟",
      "Redis shows periodic latency spikes of hundreds of ms. Which cause is most likely?",
    ],
    options: [
      [
        "fork برای RDB/AOF rewrite روی dataset بزرگ، یا حذف هم‌زمان تعداد زیادی کلید منقضی/big key",
        "Fork for RDB/AOF rewrite on a large dataset, or mass expiry/deletion of big keys",
      ],
      [
        "استفاده از `GET` به‌جای `MGET`",
        "Using `GET` instead of `MGET`",
      ],
      [
        "کوتاه بودن نام کلیدها",
        "Keys having short names",
      ],
      [
        "فعال بودن `maxmemory-policy allkeys-lru`",
        "Having `maxmemory-policy allkeys-lru` enabled",
      ],
    ],
    a: [
      "fork در datasetهای چند ده گیگابایتی به‌خاطر کپی page table می‌تواند ده‌ها تا صدها میلی‌ثانیه طول بکشد (`latest_fork_usec` در `INFO`). `SLOWLOG`، `LATENCY DOCTOR` و فعال کردن lazyfree در عیب‌یابی کمک می‌کنند.",
      "Forking a multi-GB dataset can take tens to hundreds of ms copying page tables (`latest_fork_usec` in `INFO`). `SLOWLOG`, `LATENCY DOCTOR` and lazyfree settings help diagnose and mitigate.",
    ],
  },
  {
    id: "cache-s-lua-long-script",
    level: "senior",
    tags: ["redis", "lua"],
    q: [
      "یک اسکریپت Lua به‌خاطر loop روی یک مجموعه بزرگ ۵ ثانیه اجرا می‌شود. پیامد آن چیست؟",
      "A Lua script loops over a big collection and runs for 5 seconds. What's the consequence?",
    ],
    options: [
      [
        "سرور در تمام این مدت به دستورهای دیگر پاسخ نمی‌دهد و پس از `busy-reply-threshold` فقط پاسخ `BUSY` می‌دهد",
        "The server serves no other commands meanwhile and after `busy-reply-threshold` replies only `BUSY`",
      ],
      [
        "Redis اسکریپت را در پس‌زمینه اجرا و بقیه دستورها را موازی پاسخ می‌دهد",
        "Redis runs it in the background and serves others in parallel",
      ],
      [
        "اسکریپت پس از ۱ ثانیه به‌طور خودکار rollback می‌شود",
        "The script auto-rolls back after 1 second",
      ],
      [
        "اسکریپت به چند بخش تقسیم و بین replicaها پخش می‌شود",
        "The script is split and spread across replicas",
      ],
    ],
    a: [
      "اسکریپت atomic است و thread اصلی را اشغال می‌کند. اگر نوشتنی انجام نداده باشد با `SCRIPT KILL` متوقف می‌شود، وگرنه فقط `SHUTDOWN NOSAVE` می‌ماند؛ Sentinel هم ممکن است failover کند.",
      "Scripts are atomic and occupy the main thread. If it hasn't written, `SCRIPT KILL` stops it; otherwise only `SHUTDOWN NOSAVE` remains, and Sentinel may trigger a failover.",
    ],
  },
  {
    id: "cache-s-evalsha-functions",
    level: "senior",
    tags: ["redis", "lua"],
    q: [
      "مزیت Redis Functions (`FUNCTION LOAD`/`FCALL` در Redis 7) نسبت به `EVALSHA` چیست؟",
      "What advantage do Redis Functions (`FUNCTION LOAD`/`FCALL` in Redis 7) have over `EVALSHA`?",
    ],
    options: [
      [
        "توابع بخشی از داده‌اند؛ persist و replicate می‌شوند و پس از restart یا failover نیاز به بارگذاری دوباره ندارند",
        "Functions are part of the dataset; they persist and replicate, surviving restarts and failovers without reloading",
      ],
      [
        "Functions به‌صورت multi-threaded اجرا می‌شوند",
        "Functions run multi-threaded",
      ],
      [
        "Functions محدودیت cross-slot را در Cluster حذف می‌کنند",
        "Functions lift Cluster's cross-slot limits",
      ],
      [
        "Functions غیر atomic هستند و سریع‌ترند",
        "Functions are non-atomic and therefore faster",
      ],
    ],
    a: [
      "script cache مربوط به `EVALSHA` پس از restart یا روی replica ارتقایافته خالی است و client باید `NOSCRIPT` را مدیریت کند. Functions با نام و library مدیریت می‌شوند ولی همان قواعد atomicity و slot را دارند.",
      "The `EVALSHA` script cache is empty after a restart or on a promoted replica, so clients must handle `NOSCRIPT`. Functions are named libraries but keep the same atomicity and slot rules.",
    ],
  },
  {
    id: "cache-s-streams-consumer-failure",
    level: "senior",
    tags: ["redis", "streams"],
    q: [
      "در Redis Streams با consumer group، اگر یک consumer پیامی را بخواند و قبل از `XACK` crash کند چه می‌شود؟",
      "In Redis Streams with consumer groups, what happens if a consumer reads a message and crashes before `XACK`?",
    ],
    options: [
      [
        "پیام در Pending Entries List می‌ماند و consumer دیگر می‌تواند با `XAUTOCLAIM`/`XCLAIM` پس از idle time آن را بگیرد",
        "It stays in the Pending Entries List and another consumer can take it via `XAUTOCLAIM`/`XCLAIM` after idle time",
      ],
      [
        "پیام برای همیشه از stream حذف می‌شود",
        "The message is permanently removed from the stream",
      ],
      [
        "Redis خودکار بلافاصله آن را به consumer دیگر می‌دهد",
        "Redis immediately auto-redelivers it to another consumer",
      ],
      [
        "کل consumer group حذف می‌شود",
        "The entire consumer group is deleted",
      ],
    ],
    a: [
      "تحویل at-least-once است، پس پردازش باید idempotent باشد. شمارنده تحویل در PEL کمک می‌کند پیام‌های poison را پس از چند تلاش به dead-letter منتقل کنید.",
      "Delivery is at-least-once, so processing must be idempotent. The PEL delivery counter helps move poison messages to a dead-letter stream after several attempts.",
    ],
  },
  {
    id: "cache-s-stream-trim",
    level: "senior",
    tags: ["redis", "streams", "memory"],
    q: [
      "برای جلوگیری از رشد بی‌پایان حافظه یک stream پرترافیک، کدام روش کارآمدتر است؟",
      "Which is the most efficient way to keep a high-traffic stream's memory bounded?",
    ],
    options: [
      [
        "`XADD stream MAXLEN ~ 1000000 * ...` با trim تقریبی",
        "`XADD stream MAXLEN ~ 1000000 * ...` with approximate trimming",
      ],
      [
        "`MAXLEN = 1000000` دقیق روی هر `XADD`",
        "Exact `MAXLEN = 1000000` on every `XADD`",
      ],
      [
        "حذف دستی پیام‌ها با `XDEL` در یک cron هر یک دقیقه",
        "Deleting messages manually with `XDEL` in a per-minute cron",
      ],
      [
        "تنظیم TTL روی هر entry در stream",
        "Setting a TTL on each stream entry",
      ],
    ],
    a: [
      "`~` اجازه می‌دهد Redis فقط نودهای کامل radix tree را حذف کند که بسیار ارزان‌تر از trim دقیق است. entryهای stream TTL جداگانه ندارند؛ `MINID` هم برای trim بر اساس زمان وجود دارد.",
      "`~` lets Redis drop only whole radix-tree nodes, far cheaper than exact trimming. Stream entries have no per-entry TTL; `MINID` allows time-based trimming.",
    ],
  },
  {
    id: "cache-s-session-tradeoff",
    level: "senior",
    tags: ["sessions", "trade-offs"],
    q: [
      "trade-off اصلی بین session ذخیره‌شده در Redis و JWT بی‌حالت چیست؟",
      "What is the main trade-off between Redis-stored sessions and stateless JWTs?",
    ],
    options: [
      [
        "Redis ابطال فوری session را ممکن می‌کند ولی در هر درخواست یک lookup و یک وابستگی زیرساختی دارد",
        "Redis enables instant revocation but adds a lookup per request and an infrastructure dependency",
      ],
      [
        "JWT ابطال فوری را ساده‌تر از Redis می‌کند",
        "JWTs make instant revocation easier than Redis",
      ],
      [
        "session در Redis نمی‌تواند منقضی شود",
        "Redis sessions can't expire",
      ],
      [
        "JWT همیشه کوچک‌تر از session id است",
        "A JWT is always smaller than a session id",
      ],
    ],
    a: [
      "JWT تا پایان `exp` معتبر است مگر یک denylist (که خودش اغلب در Redis است) نگه دارید. session در Redis با `DEL` فوراً باطل می‌شود ولی availability آن Redis بخشی از مسیر احراز هویت می‌شود.",
      "A JWT stays valid until `exp` unless you keep a denylist (often in Redis itself). A Redis session is revoked instantly with `DEL`, but Redis availability joins the auth path.",
    ],
  },
  {
    id: "cache-s-cache-key-explosion",
    level: "senior",
    tags: ["http-caching", "cdn", "security"],
    q: [
      "مهاجم با query stringهای تصادفی (`?x=123`) روی صفحات cache‌شده در CDN ترافیک می‌فرستد. چه اتفاقی می‌افتد و راه مقابله چیست؟",
      "An attacker hits CDN-cached pages with random query strings (`?x=123`). What happens and how do you mitigate it?",
    ],
    options: [
      [
        "هر درخواست cache miss و به origin می‌رسد؛ normalize کردن cache key (whitelist پارامترها) و WAF/rate limit",
        "Every request misses and reaches origin; normalize the cache key (whitelist params) plus WAF/rate limiting",
      ],
      [
        "CDN همه را با یک پاسخ cache‌شده سرو می‌کند و مشکلی نیست",
        "The CDN serves them all from one cached response, no issue",
      ],
      [
        "CDN خودکار آدرس IP مهاجم را بلاک می‌کند",
        "The CDN automatically blocks the attacker's IP",
      ],
      [
        "origin پاسخ‌ها را فقط از حافظه برمی‌گرداند پس اثری ندارد",
        "The origin serves from memory so there's no effect",
      ],
    ],
    a: [
      "این حمله cache-busting است و CDN را دور می‌زند. نادیده گرفتن پارامترهای ناشناخته در cache key یا مرتب‌سازی آن‌ها، و محدودسازی نرخ به origin از آن جلوگیری می‌کند.",
      "This cache-busting attack bypasses the CDN. Ignoring unknown parameters in the cache key or sorting them, and rate limiting origin traffic, prevent it.",
    ],
  },
  {
    id: "cache-s-cache-poisoning",
    level: "senior",
    tags: ["http-caching", "security"],
    q: [
      "web cache poisoning از طریق یک هدر unkeyed (مثلاً `X-Forwarded-Host`) چگونه رخ می‌دهد؟",
      "How does web cache poisoning via an unkeyed header (e.g. `X-Forwarded-Host`) happen?",
    ],
    options: [
      [
        "برنامه از هدر در پاسخ استفاده می‌کند ولی آن هدر در cache key نیست، پس پاسخ مسموم برای همه کاربران cache می‌شود",
        "The app reflects the header in the response but it's not in the cache key, so a poisoned response is cached for everyone",
      ],
      [
        "مهاجم مستقیماً به Redis دسترسی پیدا می‌کند",
        "The attacker gains direct access to Redis",
      ],
      [
        "TTL پاسخ را به صفر می‌رساند",
        "It sets the response TTL to zero",
      ],
      [
        "مرورگر کاربر cache را رمزگشایی می‌کند",
        "The user's browser decrypts the cache",
      ],
    ],
    a: [
      "هر ورودی که روی پاسخ اثر دارد باید یا در cache key (یا `Vary`) باشد یا توسط برنامه نادیده گرفته شود. حذف هدرهای نامعتبر در لبه و عدم reflect کردن آن‌ها راه‌حل اصلی است.",
      "Any input that affects the response must be in the cache key (or `Vary`) or ignored by the app. Stripping untrusted headers at the edge and not reflecting them is the main fix.",
    ],
  },
  {
    id: "cache-s-personalized-cdn",
    level: "senior",
    tags: ["cdn", "http-caching", "architecture"],
    q: [
      "برای صفحه‌ای که ۹۵٪ آن عمومی و ۵٪ آن شخصی (نام کاربر، سبد خرید) است، کدام رویکرد بیشترین hit ratio در CDN را می‌دهد؟",
      "For a page that is 95% public and 5% personalized (username, cart), which approach maximizes CDN hit ratio?",
    ],
    options: [
      [
        "cache کردن پوسته عمومی در CDN و بارگذاری بخش شخصی جداگانه (fetch سمت client یا ESI/edge compute)",
        "Cache the public shell at the CDN and load the personal part separately (client fetch or ESI/edge compute)",
      ],
      [
        "`Vary: Cookie` روی کل صفحه",
        "`Vary: Cookie` on the whole page",
      ],
      [
        "`Cache-Control: private` برای کل صفحه",
        "`Cache-Control: private` on the whole page",
      ],
      [
        "cache کردن نسخه جداگانه برای هر کاربر در CDN",
        "Caching a separate copy per user at the CDN",
      ],
    ],
    a: [
      "`Vary: Cookie` عملاً یک نسخه به ازای هر کاربر می‌سازد و hit ratio را از بین می‌برد. جدا کردن بخش‌های پویا اجازه می‌دهد پوسته با TTL طولانی برای همه مشترک باشد.",
      "`Vary: Cookie` effectively creates one copy per user and kills hit ratio. Splitting out dynamic fragments lets the shell be shared by everyone with a long TTL.",
    ],
  },
  {
    id: "cache-s-cache-tag-invalidation",
    level: "senior",
    tags: ["invalidation", "redis"],
    q: [
      "وقتی تغییر یک محصول باید ده‌ها کلید cache (صفحه محصول، لیست دسته، نتایج جست‌وجو) را invalidate کند، کدام الگو مقیاس‌پذیرتر است؟",
      "When a product change must invalidate dozens of cache keys (product page, category lists, search results), which pattern scales better?",
    ],
    options: [
      [
        "نسخه‌گذاری namespace: کلیدها شامل `ver` جاری مثل `cat:5:v{n}:page:1` و invalidation با `INCR` نسخه",
        "Namespace versioning: keys embed the current version like `cat:5:v{n}:page:1`, invalidated by `INCR`-ing it",
      ],
      [
        "اجرای `KEYS cat:5:*` و حذف نتایج",
        "Run `KEYS cat:5:*` and delete the results",
      ],
      [
        "`FLUSHDB` پس از هر تغییر محصول",
        "`FLUSHDB` after every product change",
      ],
      [
        "TTL یک ساله و انتظار برای انقضا",
        "A one-year TTL and waiting for expiry",
      ],
    ],
    a: [
      "با افزایش نسخه، همه کلیدهای قبلی بلافاصله غیرقابل‌دسترسی می‌شوند و با TTL یا eviction پاک می‌شوند. بها: یک lookup اضافی برای نسخه؛ جایگزین آن نگه‌داشتن set کلیدها برای هر tag است.",
      "Bumping the version makes all old keys unreachable at once, and TTL or eviction cleans them up. The cost is an extra version lookup; the alternative is a per-tag set of keys.",
    ],
  },
  {
    id: "cache-s-hit-ratio-misleading",
    level: "senior",
    tags: ["metrics", "observability"],
    q: [
      "چرا hit ratio کلی ۹۹٪ ممکن است گمراه‌کننده باشد؟",
      "Why can an overall 99% hit ratio be misleading?",
    ],
    options: [
      [
        "۱٪ missها ممکن است گران‌ترین queryها باشند و بیشتر بار DB و tail latency را بسازند",
        "The 1% misses may be the most expensive queries, driving most DB load and tail latency",
      ],
      [
        "hit ratio بالای ۹۵٪ همیشه نشانه خرابی cache است",
        "Any hit ratio above 95% always signals a broken cache",
      ],
      [
        "Redis hit ratio را همیشه دو برابر گزارش می‌کند",
        "Redis always reports double the hit ratio",
      ],
      [
        "hit ratio هیچ ارتباطی با کارایی ندارد",
        "Hit ratio has no relation to performance",
      ],
    ],
    a: [
      "باید hit ratio را به تفکیک نوع کلید/endpoint و همراه با هزینه miss (زمان و بار DB) دید. معیار بهتر صرفه‌جویی در زمان یا بار backend و latency صدک‌های بالا (p99) است.",
      "Break hit ratio down per key type/endpoint and weigh it by miss cost (time and DB load). Better metrics are backend work saved and high-percentile (p99) latency.",
    ],
  },
  {
    id: "cache-s-cache-sizing",
    level: "senior",
    tags: ["eviction", "capacity"],
    q: [
      "افزایش اندازه cache از ۱۰GB به ۲۰GB hit ratio را فقط از ۹۰٪ به ۹۱٪ رساند. این چه چیزی را نشان می‌دهد؟",
      "Doubling cache size from 10GB to 20GB moved hit ratio only from 90% to 91%. What does that indicate?",
    ],
    options: [
      [
        "working set داغ قبلاً جا شده بود و بیشتر missها compulsory یا ناشی از invalidation/TTL هستند، نه ظرفیت",
        "The hot working set already fit; most misses are compulsory or invalidation/TTL-driven, not capacity",
      ],
      [
        "Redis فقط ۱۰GB اول را استفاده می‌کند",
        "Redis only uses the first 10GB",
      ],
      [
        "سیاست eviction باید `noeviction` شود",
        "The eviction policy should be `noeviction`",
      ],
      [
        "hit ratio با اندازه cache رابطه خطی دارد پس اندازه‌گیری اشتباه است",
        "Hit ratio is linear in size, so the measurement is wrong",
      ],
    ],
    a: [
      "منحنی hit ratio بر اساس اندازه معمولاً به‌خاطر توزیع Zipf اشباع می‌شود. در این حالت بهتر است TTL، استراتژی invalidation، کلیدسازی یا prefetch را بررسی کنید نه حافظه بیشتر.",
      "Hit ratio vs size curves usually saturate due to Zipf-like popularity. At that point, look at TTLs, invalidation strategy, key design or prefetching rather than more memory.",
    ],
  },
  {
    id: "cache-s-read-replica-cache",
    level: "senior",
    tags: ["consistency", "replication"],
    q: [
      "سرویس پس از نوشتن در DB primary، کلید cache را حذف می‌کند و خواندن بعدی از DB replica پر می‌شود. چه مشکلی پیش می‌آید؟",
      "A service deletes the cache key after writing to the primary DB, and the next read refills from a DB replica. What goes wrong?",
    ],
    options: [
      [
        "اگر replica lag داشته باشد، مقدار قدیمی دوباره در cache قرار می‌گیرد و تا پایان TTL باقی می‌ماند",
        "If the replica lags, the old value gets re-cached and persists until TTL",
      ],
      [
        "replica اجازه خواندن نمی‌دهد",
        "Replicas don't allow reads",
      ],
      [
        "cache به‌طور خودکار از primary می‌خواند",
        "The cache automatically reads from the primary",
      ],
      [
        "هیچ مشکلی نیست چون replication همیشه synchronous است",
        "No problem, replication is always synchronous",
      ],
    ],
    a: [
      "replication lag باعث می‌شود invalidation بی‌اثر شود. راه‌حل: پر کردن cache پس از miss از primary برای کلیدهای اخیراً نوشته‌شده، delayed double-delete یا invalidation از روی CDC replica.",
      "Replication lag makes the invalidation ineffective. Fixes: refill from the primary for recently written keys, delayed double-delete, or invalidation driven by the replica's change stream.",
    ],
  },
  {
    id: "cache-s-redis-acl-security",
    level: "senior",
    tags: ["redis", "security"],
    q: [
      "کدام اقدام برای امن‌سازی Redis در production مهم‌تر است؟",
      "Which measure matters most when securing Redis in production?",
    ],
    options: [
      [
        "عدم expose کردن به اینترنت، فعال کردن ACL/رمز و TLS، و محدود کردن دستورهای خطرناک مثل `FLUSHALL` و `CONFIG`",
        "Never expose it publicly, enable ACLs/auth and TLS, and restrict dangerous commands like `FLUSHALL` and `CONFIG`",
      ],
      [
        "تغییر پورت به ۶۳۸۰ کافی است",
        "Changing the port to 6380 is enough",
      ],
      [
        "غیرفعال کردن persistence",
        "Disabling persistence",
      ],
      [
        "افزایش `maxmemory`",
        "Increasing `maxmemory`",
      ],
    ],
    a: [
      "Redisهای بدون رمز روی اینترنت بارها با `CONFIG SET dir` و نوشتن فایل (مثلاً SSH key) به اجرای کد منجر شده‌اند. `protected-mode`، ACL با کمترین دسترسی و شبکه خصوصی ضروری‌اند.",
      "Password-less Internet-facing Redis has repeatedly led to code execution via `CONFIG SET dir` and file writes (e.g. SSH keys). `protected-mode`, least-privilege ACLs and private networking are essential.",
    ],
  },
  {
    id: "cache-s-cluster-pipeline",
    level: "senior",
    tags: ["redis", "cluster", "performance"],
    q: [
      "چرا pipelining یا `MGET` روی ۱۰۰۰ کلید تصادفی در Redis Cluster کارایی کمتری از یک نود تنها دارد؟",
      "Why does pipelining or `MGET` over 1000 random keys perform worse in Redis Cluster than on a single node?",
    ],
    options: [
      [
        "کلیدها در slotها و نودهای مختلف‌اند؛ client باید درخواست را بر اساس نود تقسیم و چند round-trip موازی انجام دهد",
        "Keys span slots and nodes; the client must split by node and make several parallel round-trips",
      ],
      [
        "Cluster pipelining را کاملاً غیرفعال می‌کند",
        "Cluster disables pipelining entirely",
      ],
      [
        "هر کلید در Cluster روی همه نودها کپی می‌شود",
        "Every key is copied to all nodes in Cluster",
      ],
      [
        "`MGET` در Cluster فقط اولین کلید را برمی‌گرداند",
        "`MGET` in Cluster returns only the first key",
      ],
    ],
    a: [
      "`MGET` با کلیدهای چند slot خطای `CROSSSLOT` می‌دهد، پس clientها آن را به batchهای هر نود می‌شکنند. هرچه نودها بیشتر، fan-out و tail latency بیشتر؛ hash tag برای کلیدهایی که با هم خوانده می‌شوند کمک می‌کند.",
      "A multi-slot `MGET` fails with `CROSSSLOT`, so clients break it into per-node batches. More nodes means more fan-out and tail latency; hash tags help for keys read together.",
    ],
  },
]);
