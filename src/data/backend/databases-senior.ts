import { build } from "../build";

export const databasesSenior = build("databases", [
  {
    id: "db-s-mvcc-how",
    level: "senior",
    tags: ["mvcc", "postgres"],
    q: [
      "PostgreSQL چگونه MVCC را پیاده‌سازی می‌کند؟",
      "How does PostgreSQL implement MVCC?",
    ],
    options: [
      ["هر نسخه سطر `xmin`/`xmax` دارد و visibility بر اساس snapshot از transaction IDها تعیین می‌شود", "Each row version carries `xmin`/`xmax`, and visibility is decided against a snapshot of transaction IDs"],
      ["نسخه‌های قدیمی را در یک undo log جداگانه نگه می‌دارد و سطر را درجا بازنویسی می‌کند", "It keeps old versions in a separate undo log and overwrites rows in place"],
      ["خواندن‌ها همیشه قفل shared روی سطرها می‌گیرند", "Reads always take shared locks on rows"],
      ["هر transaction یک کپی کامل از جدول می‌گیرد", "Each transaction gets a full copy of the table"],
    ],
    a: [
      "`UPDATE` یک tuple جدید در heap می‌نویسد و `xmax` نسخه قدیمی را تنظیم می‌کند؛ هر snapshot بر اساس وضعیت commit این IDها تصمیم می‌گیرد کدام نسخه را ببیند. در مقابل، InnoDB و Oracle درجا بازنویسی می‌کنند و نسخه قدیمی را از undo log بازسازی می‌کنند.",
      "`UPDATE` writes a new heap tuple and sets the old one's `xmax`; each snapshot decides which version is visible from the commit status of those IDs. InnoDB and Oracle instead update in place and rebuild old versions from an undo log.",
    ],
  },
  {
    id: "db-s-readers-writers",
    level: "senior",
    tags: ["mvcc", "locking"],
    q: [
      "مهم‌ترین مزیت عملیاتی MVCC در مقایسه با قفل‌گذاری خواندن/نوشتن کلاسیک (2PL) چیست؟",
      "What's the key operational benefit of MVCC compared to classic read/write locking (2PL)?",
    ],
    options: [
      ["خواننده‌ها نویسنده‌ها را block نمی‌کنند و نویسنده‌ها خواننده‌ها را", "Readers don't block writers and writers don't block readers"],
      ["نوشتن‌های هم‌زمان روی یک سطر هرگز منتظر نمی‌مانند", "Concurrent writes to the same row never wait"],
      ["هیچ‌گاه فضای اضافی مصرف نمی‌کند", "It never uses extra storage"],
      ["همه anomalyها را در هر isolation level حذف می‌کند", "It eliminates all anomalies at every isolation level"],
    ],
    a: [
      "هر خواننده از snapshot خودش نسخه مناسب را می‌خواند، پس نیازی به قفل shared ندارد. نویسنده‌های یک سطر همچنان با row lock همدیگر را block می‌کنند و هزینه MVCC نسخه‌های مرده و نیاز به vacuum است.",
      "Each reader reads the appropriate version from its snapshot, so no shared locks are needed. Writers to the same row still block each other via row locks, and MVCC's cost is dead versions needing vacuum.",
    ],
  },
  {
    id: "db-s-write-skew",
    level: "senior",
    tags: ["isolation", "anomalies"],
    q: [
      "قانون: حداقل یک پزشک باید on-call باشد. دو پزشک هم‌زمان در Repeatable Read (snapshot isolation) بررسی می‌کنند که دیگری on-call است و هر کدام خود را خارج می‌کنند. چه می‌شود؟",
      "Rule: at least one doctor must be on call. Two doctors concurrently, under Repeatable Read (snapshot isolation), check the other is on call and each removes themselves. What happens?",
    ],
    options: [
      ["هر دو commit می‌شوند و هیچ پزشکی on-call نمی‌ماند (write skew)", "Both commit and no doctor remains on call (write skew)"],
      ["دومی به‌خاطر conflict نوشتن روی یک سطر abort می‌شود", "The second aborts due to a write conflict on the same row"],
      ["deadlock رخ می‌دهد", "A deadlock occurs"],
      ["snapshot isolation تضمین می‌کند قانون حفظ شود", "Snapshot isolation guarantees the rule holds"],
    ],
    a: [
      "هر transaction سطر متفاوتی را update می‌کند، پس conflict نوشتنی وجود ندارد ولی هر دو بر اساس snapshot قدیمی تصمیم گرفته‌اند. Serializable (SSI در PostgreSQL) یا `SELECT ... FOR UPDATE` روی سطرهای خوانده‌شده از آن جلوگیری می‌کند.",
      "Each transaction updates a different row, so there's no write conflict, yet both decided from a stale snapshot. Serializable (SSI in PostgreSQL) or `SELECT ... FOR UPDATE` on the rows read prevents it.",
    ],
  },
  {
    id: "db-s-ssi",
    level: "senior",
    tags: ["isolation", "serializable"],
    q: [
      "Serializable در PostgreSQL (SSI) چگونه کار می‌کند و اپلیکیشن باید چه کند؟",
      "How does PostgreSQL's Serializable (SSI) work, and what must the application do?",
    ],
    options: [
      ["وابستگی‌های read/write خطرناک را ردیابی و یکی را با `40001` abort می‌کند؛ اپلیکیشن باید transaction را retry کند", "Tracks dangerous read/write dependencies and aborts one with `40001`; the app must retry the transaction"],
      ["همه transactionها را واقعاً پشت سر هم روی یک thread اجرا می‌کند", "Actually runs all transactions one at a time on a single thread"],
      ["روی هر سطر خوانده‌شده قفل exclusive می‌گیرد", "Takes exclusive locks on every row read"],
      ["فقط هشدار می‌دهد و هرگز transactionی را abort نمی‌کند", "Only warns and never aborts transactions"],
    ],
    a: [
      "SSI روی snapshot isolation با predicate lockهای غیر blocking (SIRead) ساخته شده و الگوی rw-conflict خطرناک را تشخیص می‌دهد. خطای `serialization_failure` (`40001`) طبیعی است و باید کل transaction دوباره اجرا شود.",
      "SSI builds on snapshot isolation with non-blocking predicate (SIRead) locks and detects dangerous rw-conflict patterns. A `serialization_failure` (`40001`) is expected and the whole transaction must be retried.",
    ],
  },
  {
    id: "db-s-repeatable-read-update-conflict",
    level: "senior",
    tags: ["isolation", "concurrency"],
    q: [
      "در Repeatable Read در PostgreSQL، اگر transaction سطری را update کند که transaction دیگری پس از شروع snapshot آن را update و commit کرده، چه می‌شود؟",
      "Under PostgreSQL Repeatable Read, what happens if a transaction updates a row that another transaction updated and committed after the snapshot began?",
    ],
    options: [
      ["خطای `could not serialize access due to concurrent update` و نیاز به retry", "An error `could not serialize access due to concurrent update`, requiring a retry"],
      ["update روی نسخه جدید اعمال می‌شود، مثل Read Committed", "The update applies to the new version, like Read Committed"],
      ["update دیگری بی‌صدا بازنویسی می‌شود (lost update)", "The other update is silently overwritten (lost update)"],
      ["transaction تا ابد منتظر می‌ماند", "The transaction waits forever"],
    ],
    a: [
      "در Read Committed، PostgreSQL سطر را دوباره ارزیابی و update را روی نسخه جدید اعمال می‌کند، ولی در Repeatable Read این کار snapshot را نقض می‌کند و transaction abort می‌شود. پس Repeatable Read در PostgreSQL از lost update جلوگیری می‌کند.",
      "Under Read Committed, PostgreSQL re-evaluates the row and applies the update to the new version, but under Repeatable Read that would break the snapshot, so it aborts. Thus PostgreSQL's Repeatable Read prevents lost updates.",
    ],
  },
  {
    id: "db-s-read-committed-recheck",
    level: "senior",
    tags: ["isolation", "concurrency"],
    q: [
      "در Read Committed، `UPDATE t SET n = n + 1 WHERE n = 5` منتظر یک transaction هم‌زمان است که `n` آن سطر را به `6` تغییر داده و commit می‌کند. چه اتفاقی می‌افتد؟",
      "Under Read Committed, `UPDATE t SET n = n + 1 WHERE n = 5` waits on a concurrent transaction that changes that row's `n` to `6` and commits. What happens?",
    ],
    options: [
      ["شرط `WHERE` روی نسخه جدید دوباره ارزیابی می‌شود و چون دیگر `5` نیست، سطر update نمی‌شود", "The `WHERE` is re-evaluated on the new version, and since it's no longer `5`, the row isn't updated"],
      ["سطر بر اساس snapshot اولیه به `6` تغییر می‌کند", "The row is set to `6` based on the original snapshot"],
      ["سطر به `7` تغییر می‌کند بدون بررسی دوباره شرط", "The row becomes `7` without rechecking the condition"],
      ["خطای serialization رخ می‌دهد", "A serialization error occurs"],
    ],
    a: [
      "این مکانیزم EvalPlanQual است: پس از آزاد شدن قفل، PostgreSQL آخرین نسخه commit‌شده را می‌گیرد و شرط را دوباره بررسی می‌کند. این از lost update در updateهای اتمیک جلوگیری می‌کند، ولی ممکن است سطرهای جدیدی که حالا منطبق‌اند را نبیند.",
      "This is EvalPlanQual: after the lock is released, PostgreSQL fetches the latest committed version and rechecks the condition. It prevents lost updates for atomic updates but may miss rows that newly match.",
    ],
  },
  {
    id: "db-s-wal",
    level: "senior",
    tags: ["wal", "durability"],
    q: [
      "اصل اصلی Write-Ahead Logging (WAL) چیست؟",
      "What is the core principle of Write-Ahead Logging (WAL)?",
    ],
    options: [
      ["تغییرات قبل از نوشته شدن صفحات داده باید در log روی دیسک پایدار شوند", "Changes must be durably logged before the data pages are written"],
      ["صفحات داده قبل از log نوشته می‌شوند", "Data pages are written before the log"],
      ["log فقط برای replication است و ربطی به durability ندارد", "The log is only for replication, unrelated to durability"],
      ["هر commit همه صفحات تغییرکرده را فوراً روی دیسک می‌نویسد", "Each commit immediately flushes all modified data pages"],
    ],
    a: [
      "با WAL، commit فقط نیاز به fsync ترتیبی log دارد و صفحات داده بعداً با checkpoint نوشته می‌شوند. پس از crash، دیتابیس WAL را از آخرین checkpoint replay می‌کند. همین WAL پایه streaming replication و PITR است.",
      "With WAL, a commit only needs a sequential fsync of the log; data pages are written later at checkpoints. After a crash, the database replays WAL from the last checkpoint. The same WAL underpins streaming replication and PITR.",
    ],
  },
  {
    id: "db-s-synchronous-commit-off",
    level: "senior",
    tags: ["wal", "durability"],
    q: [
      "`synchronous_commit = off` در PostgreSQL چه trade-offی دارد؟",
      "What trade-off does `synchronous_commit = off` make in PostgreSQL?",
    ],
    options: [
      ["commit سریع‌تر، با خطر از دست رفتن چند transaction اخیر در crash ولی بدون خرابی داده", "Faster commits, risking loss of the last few transactions on crash but no corruption"],
      ["خطر خرابی کامل دیتابیس در crash", "Risk of full database corruption on crash"],
      ["غیرفعال شدن کامل WAL", "Completely disabling WAL"],
      ["عدم امکان rollback", "Inability to roll back"],
    ],
    a: [
      "commit قبل از flush شدن WAL تأیید می‌شود، پس در crash ممکن است چند صد میلی‌ثانیه آخر از دست برود ولی سازگاری حفظ می‌شود. برخلاف `fsync = off` که می‌تواند دیتابیس را خراب کند، و می‌توان آن را فقط برای transactionهای کم‌اهمیت تنظیم کرد.",
      "Commit is acknowledged before WAL is flushed, so a crash may lose the last few hundred milliseconds while staying consistent. Unlike `fsync = off`, which can corrupt the database, and it can be set per transaction for low-value writes.",
    ],
  },
  {
    id: "db-s-checkpoint",
    level: "senior",
    tags: ["wal", "postgres"],
    q: [
      "checkpointهای بسیار پرتکرار در PostgreSQL چه اثر منفی دارند؟",
      "What negative effect do very frequent checkpoints have in PostgreSQL?",
    ],
    options: [
      ["I/O زیاد و افزایش حجم WAL به‌خاطر full-page writeها بعد از هر checkpoint", "Heavy I/O and more WAL volume due to full-page writes after each checkpoint"],
      ["زمان recovery پس از crash طولانی‌تر می‌شود", "Crash recovery time becomes longer"],
      ["transactionها durability خود را از دست می‌دهند", "Transactions lose durability"],
      ["autovacuum غیرفعال می‌شود", "Autovacuum is disabled"],
    ],
    a: [
      "اولین تغییر هر صفحه پس از checkpoint کل صفحه را در WAL می‌نویسد. checkpoint نادرتر (با `max_wal_size` بزرگ‌تر) I/O را کم می‌کند ولی recovery را طولانی‌تر می‌کند؛ این یک trade-off است.",
      "The first change to each page after a checkpoint writes the full page into WAL. Rarer checkpoints (larger `max_wal_size`) reduce I/O but lengthen recovery; it's a trade-off.",
    ],
  },
  {
    id: "db-s-vacuum-vs-full",
    level: "senior",
    tags: ["vacuum", "postgres"],
    q: [
      "تفاوت `VACUUM` با `VACUUM FULL` چیست؟",
      "What's the difference between `VACUUM` and `VACUUM FULL`?",
    ],
    options: [
      ["`VACUUM` فضا را برای استفاده مجدد آزاد می‌کند بدون قفل سنگین؛ `VACUUM FULL` جدول را بازنویسی و فضا را به OS برمی‌گرداند ولی `ACCESS EXCLUSIVE` می‌گیرد", "`VACUUM` frees space for reuse without heavy locks; `VACUUM FULL` rewrites the table, returning space to the OS but taking `ACCESS EXCLUSIVE`"],
      ["`VACUUM FULL` فقط indexها را vacuum می‌کند", "`VACUUM FULL` only vacuums indexes"],
      ["`VACUUM` جدول را قفل می‌کند و `VACUUM FULL` نه", "`VACUUM` locks the table and `VACUUM FULL` doesn't"],
      ["تفاوتی ندارند؛ `FULL` فقط verbose است", "No difference; `FULL` is just verbose"],
    ],
    a: [
      "`VACUUM` معمولی هم‌زمان با خواندن و نوشتن اجرا می‌شود ولی اندازه فایل را معمولاً کم نمی‌کند. برای کاهش bloat بدون downtime ابزارهایی مثل `pg_repack` جایگزین `VACUUM FULL` هستند.",
      "Plain `VACUUM` runs alongside reads and writes but usually doesn't shrink the file. To remove bloat without downtime, tools like `pg_repack` replace `VACUUM FULL`.",
    ],
  },
  {
    id: "db-s-long-transaction-bloat",
    level: "senior",
    tags: ["vacuum", "mvcc"],
    q: [
      "یک transaction که ساعت‌ها باز مانده (`idle in transaction`) چه اثری روی دیتابیس پرنوشتن دارد؟",
      "What effect does a transaction left open for hours (`idle in transaction`) have on a write-heavy database?",
    ],
    options: [
      ["مانع حذف dead tupleها توسط vacuum می‌شود و باعث bloat می‌شود", "It prevents vacuum from removing dead tuples, causing bloat"],
      ["هیچ اثری ندارد چون کاری انجام نمی‌دهد", "No effect since it's not doing anything"],
      ["همه نوشتن‌ها را block می‌کند", "It blocks all writes"],
      ["WAL را غیرفعال می‌کند", "It disables WAL"],
    ],
    a: [
      "vacuum فقط نسخه‌هایی را حذف می‌کند که از قدیمی‌ترین snapshot فعال هم قدیمی‌ترند؛ یک transaction کهنه این مرز (xmin horizon) را نگه می‌دارد. `idle_in_transaction_session_timeout` و مانیتور `pg_stat_activity` کمک می‌کنند. replication slotهای رهاشده هم اثر مشابهی دارند.",
      "Vacuum only removes versions older than the oldest active snapshot; a stale transaction pins this xmin horizon. `idle_in_transaction_session_timeout` and monitoring `pg_stat_activity` help. Abandoned replication slots have a similar effect.",
    ],
  },
  {
    id: "db-s-xid-wraparound",
    level: "senior",
    tags: ["vacuum", "postgres"],
    q: [
      "transaction ID wraparound در PostgreSQL چیست و چرا خطرناک است؟",
      "What is transaction ID wraparound in PostgreSQL and why is it dangerous?",
    ],
    options: [
      ["XIDها ۳۲ بیتی هستند؛ بدون freeze شدن سطرها توسط vacuum، دیتابیس برای جلوگیری از گم شدن داده نوشتن را متوقف می‌کند", "XIDs are 32-bit; without vacuum freezing rows, the database stops accepting writes to avoid data loss"],
      ["وقتی تعداد connectionها از `max_connections` بیشتر شود", "When connections exceed `max_connections`"],
      ["وقتی sequence یک ستون `serial` سرریز می‌شود", "When a `serial` column's sequence overflows"],
      ["وقتی WAL از دیسک بزرگ‌تر شود", "When WAL grows larger than the disk"],
    ],
    a: [
      "مقایسه XIDها حلقوی است؛ اگر سطرهای قدیمی freeze نشوند، پس از حدود ۲ میلیارد transaction به‌اشتباه «آینده» دیده می‌شوند. autovacuum با `autovacuum_freeze_max_age` جلوی آن را می‌گیرد، مگر اینکه با transaction طولانی یا تنظیم بد مسدود شود.",
      "XID comparison is circular; if old rows aren't frozen, after about 2 billion transactions they'd appear to be in the 'future'. Autovacuum prevents this via `autovacuum_freeze_max_age` unless blocked by long transactions or poor tuning.",
    ],
  },
  {
    id: "db-s-hot-updates",
    level: "senior",
    tags: ["postgres", "indexes", "mvcc"],
    q: [
      "HOT update (Heap-Only Tuple) در PostgreSQL چه زمانی ممکن است؟",
      "When is a HOT (Heap-Only Tuple) update possible in PostgreSQL?",
    ],
    options: [
      ["وقتی هیچ ستون index‌شده‌ای تغییر نکند و صفحه فضای خالی برای نسخه جدید داشته باشد", "When no indexed column changes and the page has free space for the new version"],
      ["فقط برای جدول‌هایی بدون primary key", "Only for tables without a primary key"],
      ["وقتی update داخل transaction صریح باشد", "When the update is inside an explicit transaction"],
      ["همیشه، برای هر update", "Always, for every update"],
    ],
    a: [
      "در HOT نسخه جدید در همان صفحه نوشته می‌شود و indexها به‌روز نمی‌شوند، که write amplification را بسیار کم می‌کند. index کردن ستون‌های پرتغییر و `fillfactor` کامل HOT را از بین می‌برد.",
      "With HOT, the new version goes on the same page and no index entries are updated, greatly reducing write amplification. Indexing frequently-updated columns or a full `fillfactor` defeats HOT.",
    ],
  },
  {
    id: "db-s-too-many-indexes",
    level: "senior",
    tags: ["indexes", "performance"],
    q: [
      "جدولی با نرخ نوشتن بالا ۱۵ index دارد. محتمل‌ترین اثر چیست؟",
      "A high-write table has 15 indexes. What's the most likely effect?",
    ],
    options: [
      ["write amplification شدید، WAL بیشتر، فشار روی cache و حذف HOT update", "Severe write amplification, more WAL, cache pressure, and loss of HOT updates"],
      ["خواندن‌ها کندتر می‌شوند چون planner گیج می‌شود", "Reads slow down because the planner gets confused"],
      ["هیچ اثر منفی جز فضای دیسک ندارد", "No downside other than disk space"],
      ["دیتابیس به‌طور خودکار indexهای اضافی را حذف می‌کند", "The database automatically drops extra indexes"],
    ],
    a: [
      "هر `INSERT` باید در همه ۱۵ index نوشته شود. با `pg_stat_user_indexes` (`idx_scan = 0`) indexهای بی‌استفاده را پیدا کنید و indexهای redundant (پیشوند یک index ترکیبی دیگر) را حذف کنید.",
      "Every `INSERT` must write into all 15 indexes. Find unused ones via `pg_stat_user_indexes` (`idx_scan = 0`) and drop redundant ones (prefixes of another composite index).",
    ],
  },
  {
    id: "db-s-hash-index",
    level: "senior",
    tags: ["indexes"],
    q: [
      "Hash index در PostgreSQL چه محدودیتی نسبت به B-tree دارد؟",
      "What limitation does a PostgreSQL hash index have compared to B-tree?",
    ],
    options: [
      ["فقط برابری (`=`) را پشتیبانی می‌کند؛ نه بازه، نه `ORDER BY`، نه unique", "Supports only equality (`=`); no ranges, no `ORDER BY`, no uniqueness"],
      ["در PostgreSQL مدرن crash-safe نیست", "It isn't crash-safe in modern PostgreSQL"],
      ["فقط روی ستون‌های عددی کار می‌کند", "It only works on numeric columns"],
      ["همیشه بزرگ‌تر از B-tree است", "It's always larger than a B-tree"],
    ],
    a: [
      "از PostgreSQL 10، hash index در WAL ثبت می‌شود و crash-safe است. برای مقادیر بزرگ با lookup برابری ممکن است کوچک‌تر باشد، ولی B-tree در اغلب موارد انتخاب امن‌تری است.",
      "Since PostgreSQL 10, hash indexes are WAL-logged and crash-safe. They can be smaller for large values with equality lookups, but B-tree is the safer choice in most cases.",
    ],
  },
  {
    id: "db-s-gin-index",
    level: "senior",
    tags: ["indexes", "gin"],
    q: [
      "GIN index برای کدام نوع کوئری مناسب است؟",
      "Which kind of query is a GIN index suited for?",
    ],
    options: [
      ["containment روی `jsonb`، آرایه‌ها و full-text search (مثل `@>` و `@@`)", "Containment on `jsonb`, arrays, and full-text search (e.g. `@>` and `@@`)"],
      ["کوئری‌های بازه روی timestamp", "Range queries on timestamps"],
      ["`ORDER BY` روی ستون عددی", "`ORDER BY` on a numeric column"],
      ["primary key جدول", "A table's primary key"],
    ],
    a: [
      "GIN یک inverted index است که هر عنصر (کلید JSON، عضو آرایه، lexeme) را به سطرهای حاوی آن نگاشت می‌کند. خواندن سریع است ولی نوشتن گران‌تر است؛ `fastupdate` با pending list بخشی از این هزینه را به تعویق می‌اندازد.",
      "GIN is an inverted index mapping each element (JSON key, array member, lexeme) to the rows containing it. Reads are fast but writes are costlier; `fastupdate` defers part of that via a pending list.",
    ],
  },
  {
    id: "db-s-brin-index",
    level: "senior",
    tags: ["indexes"],
    q: [
      "BRIN index برای چه داده‌ای ایده‌آل است؟",
      "What data is a BRIN index ideal for?",
    ],
    options: [
      ["جدول‌های بسیار بزرگ append-only که ستون با ترتیب فیزیکی همبستگی دارد، مثل `created_at` در log", "Very large append-only tables where the column correlates with physical order, like `created_at` in logs"],
      ["ستون‌هایی با مقادیر کاملاً تصادفی مثل UUID v4", "Columns with fully random values like UUID v4"],
      ["جستجوی متن کامل", "Full-text search"],
      ["lookupهای یکتای primary key", "Unique primary key lookups"],
    ],
    a: [
      "BRIN فقط min/max هر بازه از صفحات را ذخیره می‌کند، پس بسیار کوچک است (کیلوبایت در برابر گیگابایت). اگر داده با ترتیب فیزیکی همبستگی نداشته باشد، تقریباً هیچ بازه‌ای حذف نمی‌شود و بی‌فایده است.",
      "BRIN stores only min/max per block range, so it's tiny (kilobytes vs gigabytes). If values don't correlate with physical order, almost no ranges get excluded and it's useless.",
    ],
  },
  {
    id: "db-s-index-only-visibility",
    level: "senior",
    tags: ["indexes", "vacuum"],
    q: [
      "plan یک Index Only Scan نشان می‌دهد ولی `Heap Fetches` بسیار بالاست. علت چیست؟",
      "A plan shows an Index Only Scan but very high `Heap Fetches`. Why?",
    ],
    options: [
      ["visibility map به‌روز نیست و باید برای بررسی visibility به heap مراجعه شود؛ vacuum لازم است", "The visibility map is stale, so the heap must be checked for visibility; vacuum is needed"],
      ["index خراب است و باید حذف شود", "The index is corrupted and must be dropped"],
      ["covering index همیشه heap را می‌خواند", "Covering indexes always read the heap"],
      ["`work_mem` خیلی کم است", "`work_mem` is too low"],
    ],
    a: [
      "index اطلاعات visibility MVCC را ندارد؛ فقط وقتی صفحه در visibility map «all-visible» علامت خورده باشد می‌توان از heap صرف‌نظر کرد. vacuum این علامت‌ها را تنظیم می‌کند، پس جدول‌های پرنوشتن از index-only scan سود کمتری می‌برند.",
      "Indexes lack MVCC visibility info; the heap can be skipped only for pages marked all-visible in the visibility map. Vacuum sets those bits, so write-heavy tables benefit less from index-only scans.",
    ],
  },
  {
    id: "db-s-join-algorithms",
    level: "senior",
    tags: ["explain", "joins"],
    q: [
      "planner چه زمانی معمولاً Nested Loop را بر Hash Join ترجیح می‌دهد؟",
      "When does the planner usually prefer a Nested Loop over a Hash Join?",
    ],
    options: [
      ["وقتی سمت بیرونی سطرهای کمی دارد و سمت درونی index مناسب روی کلید join دارد", "When the outer side has few rows and the inner side has a suitable index on the join key"],
      ["وقتی هر دو جدول میلیون‌ها سطر دارند و index ندارند", "When both tables have millions of rows and no indexes"],
      ["فقط برای `CROSS JOIN`", "Only for `CROSS JOIN`"],
      ["وقتی شرط join نابرابری نیست", "When the join condition isn't an inequality"],
    ],
    a: [
      "Nested Loop با index برای تعداد کم سطر بیرونی بسیار سریع است ولی با تخمین غلط (هزاران سطر به‌جای چند سطر) فاجعه می‌شود. Hash Join برای مجموعه‌های بزرگ بدون ترتیب و Merge Join برای ورودی‌های مرتب مناسب‌اند.",
      "An indexed Nested Loop is very fast for few outer rows but disastrous with bad estimates (thousands instead of a few). Hash Join suits large unordered sets; Merge Join suits sorted inputs.",
    ],
  },
  {
    id: "db-s-work-mem-spill",
    level: "senior",
    tags: ["explain", "performance"],
    q: [
      "در `EXPLAIN ANALYZE` عبارت `Sort Method: external merge Disk: 512MB` دیده می‌شود. معنی آن چیست؟",
      "`EXPLAIN ANALYZE` shows `Sort Method: external merge Disk: 512MB`. What does it mean?",
    ],
    options: [
      ["sort در `work_mem` جا نشده و به دیسک spill کرده است", "The sort didn't fit in `work_mem` and spilled to disk"],
      ["جدول ۵۱۲ مگابایت bloat دارد", "The table has 512MB of bloat"],
      ["index با حجم ۵۱۲ مگابایت استفاده شده است", "A 512MB index was used"],
      ["نتیجه کوئری روی دیسک کش شده است", "The query result was cached to disk"],
    ],
    a: [
      "افزایش `work_mem` برای آن session یا کوئری، یا یک index که ترتیب لازم را فراهم کند، sort را حذف یا در حافظه انجام می‌دهد. `work_mem` به ازای هر عملیات sort/hash اعمال می‌شود، پس افزایش سراسری‌اش با connectionهای زیاد خطرناک است.",
      "Raising `work_mem` for that session or query, or an index providing the needed order, eliminates the sort or keeps it in memory. `work_mem` applies per sort/hash operation, so raising it globally is risky with many connections.",
    ],
  },
  {
    id: "db-s-generic-plan",
    level: "senior",
    tags: ["performance", "prepared-statements"],
    q: [
      "یک prepared statement بعد از چند اجرا ناگهان برای برخی پارامترها بسیار کند می‌شود. علت محتمل در PostgreSQL چیست؟",
      "A prepared statement suddenly becomes very slow for some parameters after a few executions. What's the likely cause in PostgreSQL?",
    ],
    options: [
      ["پس از ۵ اجرا ممکن است generic plan انتخاب شود که برای مقادیر با توزیع نامتوازن بد است", "After 5 executions a generic plan may be chosen, which is bad for skewed values"],
      ["prepared statementها پس از ۵ اجرا cache خود را پاک می‌کنند", "Prepared statements clear their cache after 5 executions"],
      ["پارامترها پس از چند بار به رشته تبدیل می‌شوند", "Parameters get converted to strings after a few runs"],
      ["connection pool کوئری را دوباره parse می‌کند", "The connection pool re-parses the query"],
    ],
    a: [
      "PostgreSQL ابتدا custom plan برای هر مقدار می‌سازد و اگر generic plan ارزان‌تر به نظر برسد به آن سوئیچ می‌کند. برای ستون‌های skewed، `plan_cache_mode = force_custom_plan` می‌تواند کمک کند.",
      "PostgreSQL first builds custom plans per value, then switches to a generic plan if it looks no more expensive. For skewed columns, `plan_cache_mode = force_custom_plan` can help.",
    ],
  },
  {
    id: "db-s-expand-contract",
    level: "senior",
    tags: ["migrations", "zero-downtime"],
    q: [
      "برای تغییر نام ستون `name` به `full_name` بدون downtime در سیستمی با deploy تدریجی، روش درست کدام است؟",
      "To rename column `name` to `full_name` with zero downtime in a system with rolling deploys, what's the right approach?",
    ],
    options: [
      ["expand/contract: افزودن ستون جدید، نوشتن در هر دو، backfill، سوئیچ خواندن، سپس حذف ستون قدیمی", "Expand/contract: add the new column, dual-write, backfill, switch reads, then drop the old one"],
      ["یک `ALTER TABLE ... RENAME COLUMN` و deploy هم‌زمان کد", "One `ALTER TABLE ... RENAME COLUMN` deployed together with the code"],
      ["توقف همه سرویس‌ها و اجرای migration", "Stop all services and run the migration"],
      ["ساخت view با نام جدید و حذف جدول اصلی", "Create a view with the new name and drop the base table"],
    ],
    a: [
      "در deploy تدریجی، نسخه قدیم و جدید کد هم‌زمان اجرا می‌شوند؛ rename مستقیم یکی از آن‌ها را می‌شکند. expand/contract هر مرحله را با هر دو نسخه سازگار نگه می‌دارد و rollback را ممکن می‌کند.",
      "During rolling deploys, old and new code run simultaneously; a direct rename breaks one of them. Expand/contract keeps each step compatible with both versions and makes rollback possible.",
    ],
  },
  {
    id: "db-s-lock-queue",
    level: "senior",
    tags: ["migrations", "locking"],
    q: [
      "یک `ALTER TABLE` ساده و سریع روی جدول پرترافیک باعث قطعی کامل شد. محتمل‌ترین علت چیست؟",
      "A simple, fast `ALTER TABLE` on a busy table caused a full outage. What's the most likely cause?",
    ],
    options: [
      ["منتظر `ACCESS EXCLUSIVE` پشت یک کوئری طولانی ماند و همه کوئری‌های بعدی پشت آن در صف قفل گیر کردند", "It waited for `ACCESS EXCLUSIVE` behind a long query, and all later queries queued behind it"],
      ["`ALTER TABLE` همه connectionها را قطع می‌کند", "`ALTER TABLE` kills all connections"],
      ["WAL پر شد", "The WAL filled up"],
      ["`ALTER TABLE` همیشه کل جدول را بازنویسی می‌کند", "`ALTER TABLE` always rewrites the whole table"],
    ],
    a: [
      "درخواست قفل منتظر، درخواست‌های ناسازگار بعدی (حتی `SELECT` ساده) را هم پشت خودش نگه می‌دارد. همیشه `SET lock_timeout = '2s'` بگذارید و migration را با retry اجرا کنید.",
      "A waiting lock request blocks subsequent conflicting requests (even plain `SELECT`s) behind it. Always set `lock_timeout = '2s'` and run migrations with retries.",
    ],
  },
  {
    id: "db-s-backfill-batches",
    level: "senior",
    tags: ["migrations", "performance"],
    q: [
      "برای backfill ستون جدید در جدولی با ۵۰۰ میلیون سطر، چرا یک `UPDATE` واحد ایده بدی است؟",
      "Why is a single `UPDATE` a bad idea for backfilling a new column on a 500-million-row table?",
    ],
    options: [
      ["transaction طولانی، قفل سطرها، انفجار WAL و replication lag، و bloat به‌خاطر نسخه‌های جدید همه سطرها", "A long transaction, row locks, WAL explosion and replication lag, and bloat from new versions of every row"],
      ["`UPDATE` بیش از یک میلیون سطر پشتیبانی نمی‌شود", "`UPDATE` doesn't support more than a million rows"],
      ["ستون جدید index نمی‌شود", "The new column won't be indexed"],
      ["فقط کمی کندتر است و مشکلی ندارد", "It's just a bit slower, nothing more"],
    ],
    a: [
      "backfill را در batchهای کوچک (مثلاً ۱۰ هزار سطر بر اساس بازه id) با commit جدا و فاصله زمانی انجام دهید تا vacuum و replicaها عقب نمانند و در صورت خطا قابل ادامه باشد.",
      "Backfill in small batches (e.g. 10k rows by id range) with separate commits and pauses so vacuum and replicas keep up, and so it can resume after failure.",
    ],
  },
  {
    id: "db-s-not-null-migration",
    level: "senior",
    tags: ["migrations", "constraints"],
    q: [
      "برای افزودن `NOT NULL` به ستون موجود در جدول بزرگ در PostgreSQL 12+ بدون اسکن طولانی زیر قفل، روش رایج چیست؟",
      "To add `NOT NULL` to an existing column on a large table in PostgreSQL 12+ without a long scan under lock, what's the common approach?",
    ],
    options: [
      ["افزودن `CHECK (col IS NOT NULL) NOT VALID`، سپس `VALIDATE`، سپس `SET NOT NULL` که از constraint معتبر استفاده می‌کند", "Add `CHECK (col IS NOT NULL) NOT VALID`, then `VALIDATE`, then `SET NOT NULL`, which uses the valid constraint"],
      ["`ALTER COLUMN ... SET NOT NULL` مستقیم همیشه بدون اسکن است", "A direct `ALTER COLUMN ... SET NOT NULL` never scans"],
      ["ساخت unique index روی ستون", "Create a unique index on the column"],
      ["تغییر نوع ستون به `text`", "Change the column type to `text`"],
    ],
    a: [
      "`SET NOT NULL` مستقیم کل جدول را زیر `ACCESS EXCLUSIVE` اسکن می‌کند. از PostgreSQL 12 اگر یک `CHECK` معتبر معادل وجود داشته باشد، اسکن حذف می‌شود و سپس می‌توان `CHECK` را حذف کرد.",
      "A direct `SET NOT NULL` scans the whole table under `ACCESS EXCLUSIVE`. Since PostgreSQL 12, an equivalent validated `CHECK` lets it skip the scan, after which the `CHECK` can be dropped.",
    ],
  },
  {
    id: "db-s-sync-vs-async-replication",
    level: "senior",
    tags: ["replication"],
    q: [
      "trade-off اصلی replication همگام (synchronous) در برابر غیرهمگام چیست؟",
      "What's the core trade-off of synchronous versus asynchronous replication?",
    ],
    options: [
      ["همگام: بدون از دست رفتن داده در failover ولی latency بیشتر و وابستگی در دسترس بودن به replica", "Sync: no data loss on failover but higher latency and availability tied to the replica"],
      ["همگام: سریع‌تر ولی با خطر از دست رفتن داده", "Sync: faster but risks data loss"],
      ["غیرهمگام: replica هرگز عقب نمی‌ماند", "Async: replicas never fall behind"],
      ["تفاوتی در durability ندارند", "They don't differ in durability"],
    ],
    a: [
      "در همگام، commit تا تأیید replica منتظر می‌ماند؛ اگر replica از دسترس خارج شود، نوشتن‌ها متوقف می‌شوند مگر چند standby تعریف شود (مثلاً `ANY 1 (a, b)`). در غیرهمگام، failover ممکن است transactionهای اخیر را از دست بدهد.",
      "With sync, commit waits for replica acknowledgment; if the replica goes down, writes stall unless multiple standbys are configured (e.g. `ANY 1 (a, b)`). With async, failover may lose recent transactions.",
    ],
  },
  {
    id: "db-s-read-your-writes-lsn",
    level: "senior",
    tags: ["replication", "consistency"],
    q: [
      "یک روش دقیق برای تضمین read-your-writes هنگام خواندن از replica چیست؟",
      "What's a precise technique to guarantee read-your-writes when reading from replicas?",
    ],
    options: [
      ["ذخیره LSN پس از نوشتن و خواندن از replica فقط اگر `pg_last_wal_replay_lsn()` آن به آن LSN رسیده باشد", "Store the LSN after writing and read from a replica only if its `pg_last_wal_replay_lsn()` has reached it"],
      ["خواندن همیشه از تصادفی‌ترین replica", "Always read from a random replica"],
      ["افزایش تعداد replicaها", "Add more replicas"],
      ["استفاده از `SELECT ... FOR UPDATE` روی replica", "Use `SELECT ... FOR UPDATE` on the replica"],
    ],
    a: [
      "پس از نوشتن، `pg_current_wal_lsn()` را در session کاربر نگه دارید؛ در خواندن بعدی replicaای انتخاب شود که replay را تا آن LSN انجام داده، وگرنه به primary بروید. این از قانون ساده «X ثانیه از primary بخوان» دقیق‌تر است.",
      "After writing, keep `pg_current_wal_lsn()` in the user's session; on the next read, pick a replica that has replayed up to that LSN, else fall back to the primary. This is more precise than a 'read primary for X seconds' rule.",
    ],
  },
  {
    id: "db-s-logical-vs-physical",
    level: "senior",
    tags: ["replication"],
    q: [
      "logical replication در PostgreSQL چه کاری را ممکن می‌کند که physical (streaming) replication نمی‌کند؟",
      "What does PostgreSQL logical replication enable that physical (streaming) replication doesn't?",
    ],
    options: [
      ["replication انتخابی جدول‌ها و بین نسخه‌های major متفاوت (مثلاً برای upgrade کم‌downtime)", "Selective table replication and across different major versions (e.g. for low-downtime upgrades)"],
      ["کپی بایت به بایت کل cluster شامل indexها", "Byte-for-byte copy of the whole cluster including indexes"],
      ["replication خودکار DDL", "Automatic DDL replication"],
      ["replication همگام بدون هیچ overhead", "Synchronous replication with zero overhead"],
    ],
    a: [
      "logical replication تغییرات را در سطح سطر (publication/subscription) منتقل می‌کند، پس می‌توان زیرمجموعه جدول‌ها را بین نسخه‌های مختلف replicate کرد. DDL و sequenceها به‌طور پیش‌فرض replicate نمی‌شوند.",
      "Logical replication ships row-level changes (publication/subscription), so you can replicate a subset of tables across versions. DDL and sequences are not replicated by default.",
    ],
  },
  {
    id: "db-s-failover-split-brain",
    level: "senior",
    tags: ["replication", "high-availability"],
    q: [
      "split-brain در failover دیتابیس چیست و چگونه از آن جلوگیری می‌شود؟",
      "What is split-brain in database failover and how is it prevented?",
    ],
    options: [
      ["دو node هم‌زمان خود را primary می‌دانند و نوشتن می‌پذیرند؛ با consensus/quorum و fencing جلوگیری می‌شود", "Two nodes both believe they're primary and accept writes; prevented with consensus/quorum and fencing"],
      ["replica داده را دو نسخه ذخیره می‌کند؛ با vacuum حل می‌شود", "A replica stores data twice; fixed by vacuum"],
      ["جدول به دو partition تقسیم می‌شود؛ با `DETACH` حل می‌شود", "A table splits into two partitions; fixed with `DETACH`"],
      ["connection pool دو بار وصل می‌شود؛ با PgBouncer حل می‌شود", "The pool connects twice; fixed with PgBouncer"],
    ],
    a: [
      "اگر primary قدیمی فقط از شبکه جدا شده باشد و همچنان نوشتن بپذیرد، داده‌ها واگرا می‌شوند. ابزارهایی مثل Patroni با DCS (etcd/Consul) leader lock و fencing (مثلاً STONITH یا خاموش کردن primary قدیمی) اعمال می‌کنند.",
      "If the old primary is merely partitioned and still accepts writes, data diverges. Tools like Patroni use a DCS (etcd/Consul) leader lock plus fencing (e.g. STONITH or demoting the old primary).",
    ],
  },
  {
    id: "db-s-partitioning-vs-sharding",
    level: "senior",
    tags: ["partitioning", "sharding"],
    q: [
      "تفاوت اصلی partitioning و sharding چیست؟",
      "What's the core difference between partitioning and sharding?",
    ],
    options: [
      ["partitioning داده را روی یک node تقسیم می‌کند؛ sharding آن را روی چند node مستقل توزیع می‌کند", "Partitioning splits data within one node; sharding distributes it across multiple independent nodes"],
      ["sharding فقط برای indexهاست", "Sharding is only for indexes"],
      ["partitioning همیشه به چند سرور نیاز دارد", "Partitioning always needs multiple servers"],
      ["هیچ تفاوتی ندارند", "There is no difference"],
    ],
    a: [
      "sharding ظرفیت نوشتن و ذخیره را افقی افزایش می‌دهد ولی joinها، transactionها و unique constraintهای بین shardی، rebalancing و عملیات را بسیار پیچیده‌تر می‌کند. معمولاً آخرین گزینه پس از vertical scaling، replica و partitioning است.",
      "Sharding scales writes and storage horizontally but makes cross-shard joins, transactions, unique constraints, rebalancing, and operations much harder. It's usually the last resort after vertical scaling, replicas, and partitioning.",
    ],
  },
  {
    id: "db-s-shard-key",
    level: "senior",
    tags: ["sharding"],
    q: [
      "برای یک SaaS چند-مستأجری (multi-tenant)، کدام shard key معمولاً بهترین است؟",
      "For a multi-tenant SaaS, which shard key is usually best?",
    ],
    options: [
      ["`tenant_id`، تا کوئری‌ها و transactionهای هر مستأجر روی یک shard بمانند", "`tenant_id`, so each tenant's queries and transactions stay on one shard"],
      ["`created_at`، تا داده جدید روی shard جدید برود", "`created_at`, so new data lands on a new shard"],
      ["یک عدد تصادفی برای هر سطر", "A random number per row"],
      ["`country`، چون تعداد مقادیر کم است", "`country`, since it has few values"],
    ],
    a: [
      "shard key باید با الگوی دسترسی هم‌راستا باشد تا کوئری‌ها single-shard باشند. `created_at` همه نوشتن‌ها را به یک shard داغ (hotspot) می‌فرستد و key کم‌تنوع توزیع نامتوازن ایجاد می‌کند. مستأجران خیلی بزرگ ممکن است shard اختصاصی بخواهند.",
      "The shard key should align with access patterns so queries stay single-shard. `created_at` sends all writes to one hot shard, and a low-cardinality key distributes unevenly. Very large tenants may need dedicated shards.",
    ],
  },
  {
    id: "db-s-partition-pruning-fail",
    level: "senior",
    tags: ["partitioning", "performance"],
    q: [
      "جدولی بر اساس `created_at` partition شده ولی کوئری `WHERE user_id = 42` کند است و همه partitionها را اسکن می‌کند. چرا؟",
      "A table is partitioned by `created_at`, but `WHERE user_id = 42` is slow and scans every partition. Why?",
    ],
    options: [
      ["شرط شامل partition key نیست، پس pruning ممکن نیست و باید index هر partition جداگانه بررسی شود", "The filter doesn't include the partition key, so no pruning is possible and every partition's index is probed"],
      ["partitioning همیشه کوئری‌ها را کندتر می‌کند", "Partitioning always makes queries slower"],
      ["`user_id` در جدول partition‌شده قابل index نیست", "`user_id` can't be indexed on a partitioned table"],
      ["باید `VACUUM FULL` اجرا شود", "`VACUUM FULL` must be run"],
    ],
    a: [
      "partitioning فقط به کوئری‌هایی کمک می‌کند که partition key را فیلتر کنند؛ بقیه کوئری‌ها هزینه اضافی چندین index کوچک را می‌پردازند. انتخاب partition key باید بر اساس الگوی کوئری غالب و چرخه نگهداری داده باشد.",
      "Partitioning helps only queries that filter on the partition key; others pay the overhead of probing many small indexes. Choose the partition key based on the dominant query pattern and data retention lifecycle.",
    ],
  },
  {
    id: "db-s-many-connections",
    level: "senior",
    tags: ["connection-pooling", "pgbouncer"],
    q: [
      "چرا PostgreSQL با هزاران connection مستقیم کند می‌شود حتی اگر بیشترشان بیکار باشند؟",
      "Why does PostgreSQL degrade with thousands of direct connections even if most are idle?",
    ],
    options: [
      ["مدل process-per-connection، حافظه هر backend و هزینه محاسبه snapshot با تعداد backendها رشد می‌کند", "Process-per-connection model; per-backend memory and snapshot computation cost grow with backend count"],
      ["connectionهای بیکار قفل جدول نگه می‌دارند", "Idle connections hold table locks"],
      ["هر connection یک کپی از کل shared buffers دارد", "Each connection has a copy of all shared buffers"],
      ["هیچ هزینه‌ای ندارد؛ فقط connectionهای فعال مهم‌اند", "No cost at all; only active connections matter"],
    ],
    a: [
      "هر backend حافظه خصوصی (catalog cache و غیره) دارد و context switching و ساخت snapshot با تعداد زیاد backendها گران‌تر می‌شود (نسخه 14 بخشی از آن را بهبود داد). PgBouncer در transaction mode هزاران client را روی ده‌ها connection واقعی multiplex می‌کند.",
      "Each backend has private memory (catalog caches etc.), and context switching and snapshot building get costlier with many backends (v14 improved part of this). PgBouncer in transaction mode multiplexes thousands of clients onto tens of real connections.",
    ],
  },
  {
    id: "db-s-advisory-locks",
    level: "senior",
    tags: ["locking"],
    q: [
      "advisory lock در PostgreSQL (مثلاً `pg_advisory_xact_lock(42)`) برای چه کاربردی مناسب است؟",
      "What is a PostgreSQL advisory lock (e.g. `pg_advisory_xact_lock(42)`) suited for?",
    ],
    options: [
      ["هماهنگی سطح اپلیکیشن، مثل تضمین اجرای تنها یک instance از یک cron job", "Application-level coordination, like ensuring only one instance of a cron job runs"],
      ["قفل خودکار همه سطرهای یک جدول", "Automatically locking all rows of a table"],
      ["جلوگیری از SQL injection", "Preventing SQL injection"],
      ["سریع‌تر کردن کوئری‌های خواندن", "Speeding up read queries"],
    ],
    a: [
      "advisory lock به هیچ سطر یا جدولی وابسته نیست و معنایش را اپلیکیشن تعیین می‌کند. نسخه `xact` در پایان transaction آزاد می‌شود؛ نسخه session-level با PgBouncer transaction mode سازگار نیست.",
      "Advisory locks aren't tied to any row or table; the application defines their meaning. The `xact` variant releases at transaction end; session-level ones don't mix with PgBouncer transaction mode.",
    ],
  },
  {
    id: "db-s-lock-escalation-fk",
    level: "senior",
    tags: ["locking", "indexes"],
    q: [
      "حذف یک سطر از `users` بسیار کند است و جدول `orders` (با foreign key به `users`) را قفل می‌کند. علت محتمل چیست؟",
      "Deleting a row from `users` is very slow and contends with `orders` (which has a foreign key to `users`). Likely cause?",
    ],
    options: [
      ["ستون `orders.user_id` index ندارد و بررسی FK به ازای هر حذف یک seq scan روی `orders` انجام می‌دهد", "`orders.user_id` has no index, so each delete's FK check does a seq scan of `orders`"],
      ["primary key `users` خراب است", "The `users` primary key is corrupted"],
      ["foreign keyها همیشه کل جدول فرزند را قفل exclusive می‌کنند", "Foreign keys always exclusively lock the whole child table"],
      ["`DELETE` در PostgreSQL پشتیبانی از FK ندارد", "`DELETE` in PostgreSQL doesn't support FKs"],
    ],
    a: [
      "هنگام حذف یا تغییر key والد، دیتابیس باید سطرهای فرزند ارجاع‌دهنده را پیدا کند؛ بدون index روی ستون FK این یک اسکن کامل است. PostgreSQL برخلاف MySQL InnoDB برای ستون FK خودکار index نمی‌سازد.",
      "On deleting or changing a parent key, the database must find referencing child rows; without an index on the FK column that's a full scan. Unlike MySQL InnoDB, PostgreSQL doesn't auto-index FK columns.",
    ],
  },
  {
    id: "db-s-pessimistic-vs-optimistic",
    level: "senior",
    tags: ["locking", "concurrency"],
    q: [
      "در سیستم رزرو بلیت با تقاضای بسیار بالا برای چند صندلی محدود، optimistic locking چه مشکلی دارد؟",
      "In a ticketing system with very high demand for a few seats, what's the problem with optimistic locking?",
    ],
    options: [
      ["نرخ conflict بالا باعث retryهای زیاد، کار هدررفته و بار اضافی می‌شود", "High conflict rate causes many retries, wasted work, and extra load"],
      ["optimistic locking داده را خراب می‌کند", "Optimistic locking corrupts data"],
      ["optimistic locking با transaction سازگار نیست", "Optimistic locking isn't compatible with transactions"],
      ["هیچ مشکلی ندارد و همیشه بهترین گزینه است", "No problem; it's always the best choice"],
    ],
    a: [
      "optimistic locking برای contention کم عالی است، ولی در contention بالا بیشتر تلاش‌ها شکست می‌خورند. قفل pessimistic کوتاه، update اتمیک شرطی (`UPDATE ... WHERE remaining > 0`) یا صف کردن درخواست‌ها بهترند.",
      "Optimistic locking shines under low contention, but under high contention most attempts fail. Short pessimistic locks, a conditional atomic update (`UPDATE ... WHERE remaining > 0`), or queueing requests work better.",
    ],
  },
  {
    id: "db-s-idempotency-key",
    level: "senior",
    tags: ["constraints", "concurrency"],
    q: [
      "client پس از timeout درخواست پرداخت را retry می‌کند. چگونه در سطح دیتابیس از پرداخت دوباره جلوگیری می‌شود؟",
      "A client retries a payment request after a timeout. How do you prevent double charging at the database level?",
    ],
    options: [
      ["ذخیره idempotency key با unique constraint در همان transaction پرداخت", "Store an idempotency key with a unique constraint in the same transaction as the payment"],
      ["چک کردن وجود پرداخت با `SELECT` و سپس `INSERT` در Read Committed", "Check for the payment with `SELECT`, then `INSERT`, under Read Committed"],
      ["افزایش timeout client", "Increase the client timeout"],
      ["حذف retry در client", "Remove client retries"],
    ],
    a: [
      "الگوی check-then-insert در هم‌زمانی race دارد. unique constraint تضمین اتمیک می‌دهد: درخواست تکراری با `ON CONFLICT` یا خطای unique شناسایی و پاسخ قبلی برگردانده می‌شود.",
      "Check-then-insert races under concurrency. A unique constraint gives an atomic guarantee: the duplicate request is detected via `ON CONFLICT` or a unique error and the original response is returned.",
    ],
  },
  {
    id: "db-s-outbox",
    level: "senior",
    tags: ["transactions", "distributed"],
    q: [
      "سرویسی باید یک سفارش را در دیتابیس ذخیره و یک event به Kafka بفرستد. چرا transactional outbox pattern پیشنهاد می‌شود؟",
      "A service must save an order in the database and publish an event to Kafka. Why is the transactional outbox pattern recommended?",
    ],
    options: [
      ["event در همان transaction در جدول outbox نوشته و سپس جداگانه منتشر می‌شود، پس dual-write ناسازگار رخ نمی‌دهد", "The event is written to an outbox table in the same transaction and published separately, avoiding inconsistent dual writes"],
      ["Kafka از transaction دیتابیس پشتیبانی مستقیم دارد", "Kafka natively participates in database transactions"],
      ["سریع‌ترین راه انتشار event است", "It's the fastest way to publish events"],
      ["نیاز به هر نوع retry را حذف می‌کند", "It eliminates the need for any retries"],
    ],
    a: [
      "نوشتن در دیتابیس و Kafka به‌صورت جدا ممکن است نیمه‌کاره بماند (یکی موفق، دیگری ناموفق). با outbox، یک relay (یا CDC مثل Debezium از WAL) eventها را حداقل یک بار منتشر می‌کند، پس مصرف‌کننده باید idempotent باشد.",
      "Writing to the database and Kafka separately can half-fail (one succeeds, the other doesn't). With an outbox, a relay (or CDC like Debezium reading WAL) publishes events at-least-once, so consumers must be idempotent.",
    ],
  },
  {
    id: "db-s-bcnf",
    level: "senior",
    tags: ["normalization"],
    q: [
      "تفاوت BCNF با 3NF چیست؟",
      "How does BCNF differ from 3NF?",
    ],
    options: [
      ["در BCNF سمت چپ هر وابستگی تابعی غیربدیهی باید superkey باشد، حتی اگر سمت راست بخشی از یک candidate key باشد", "In BCNF every non-trivial FD's left side must be a superkey, even if the right side is part of a candidate key"],
      ["BCNF اجازه وابستگی transitive را می‌دهد", "BCNF allows transitive dependencies"],
      ["BCNF فقط برای جدول‌های بدون primary key است", "BCNF only applies to tables without a primary key"],
      ["BCNF همان 2NF با نام دیگر است", "BCNF is just 2NF under another name"],
    ],
    a: [
      "3NF استثنایی دارد: اگر صفت وابسته جزئی از یک candidate key باشد مجاز است. BCNF این استثنا را حذف می‌کند؛ تجزیه به BCNF گاهی حفظ همه وابستگی‌ها (dependency preservation) را ناممکن می‌کند.",
      "3NF has an exception: a dependency is allowed if the dependent attribute is part of a candidate key. BCNF removes it; decomposing to BCNF can sometimes make preserving all dependencies impossible.",
    ],
  },
  {
    id: "db-s-eav-vs-jsonb",
    level: "senior",
    tags: ["schema-design", "jsonb"],
    q: [
      "برای محصولات با ویژگی‌های متغیر زیاد، چرا `jsonb` با GIN معمولاً بر مدل EAV (Entity-Attribute-Value) ترجیح دارد؟",
      "For products with many variable attributes, why is `jsonb` with GIN usually preferred over an EAV (Entity-Attribute-Value) model?",
    ],
    options: [
      ["EAV به joinهای زیاد، نبود type safety و کوئری‌های پیچیده منجر می‌شود؛ `jsonb` داده را کنار سطر نگه می‌دارد و قابل index است", "EAV needs many joins, lacks type safety, and complicates queries; `jsonb` keeps data with the row and is indexable"],
      ["`jsonb` همه constraintهای relational را خودکار اعمال می‌کند", "`jsonb` automatically enforces all relational constraints"],
      ["EAV در PostgreSQL پشتیبانی نمی‌شود", "EAV isn't supported in PostgreSQL"],
      ["`jsonb` همیشه فضای کمتری از ستون‌های عادی می‌گیرد", "`jsonb` always uses less space than regular columns"],
    ],
    a: [
      "در EAV بازسازی یک محصول با ۲۰ ویژگی نیازمند pivot یا ۲۰ join است. `jsonb` انعطاف دارد ولی آمار planner ضعیف‌تری دارد و validation دشوارتر است؛ فیلدهای پرکاربرد و ثابت بهتر است ستون عادی باشند.",
      "In EAV, reconstructing a product with 20 attributes needs a pivot or 20 joins. `jsonb` is flexible but has weaker planner statistics and harder validation; frequently-used stable fields are better as regular columns.",
    ],
  },
  {
    id: "db-s-uuid-v7",
    level: "senior",
    tags: ["keys", "uuid", "indexes"],
    q: [
      "چرا UUID v7 برای primary key در جدول‌های پرنوشتن بهتر از UUID v4 است؟",
      "Why is UUID v7 better than UUID v4 as a primary key on write-heavy tables?",
    ],
    options: [
      ["پیشوند timestamp باعث درج تقریباً ترتیبی در B-tree، page split کمتر و locality بهتر می‌شود", "Its timestamp prefix makes B-tree inserts nearly sequential, with fewer page splits and better locality"],
      ["UUID v7 فقط ۸ بایت است", "UUID v7 is only 8 bytes"],
      ["UUID v7 کاملاً غیرقابل پیش‌بینی‌تر از v4 است", "UUID v7 is more unpredictable than v4"],
      ["UUID v7 نیاز به index را حذف می‌کند", "UUID v7 removes the need for an index"],
    ],
    a: [
      "درج‌های تصادفی v4 در سراسر index پخش می‌شوند و working set بزرگ، page split و WAL بیشتر (full-page write) ایجاد می‌کنند. v7 همچنان ۱۶ بایت است و زمان ایجاد را افشا می‌کند که در برخی موارد ملاحظه امنیتی است.",
      "Random v4 inserts scatter across the index, causing a large working set, page splits, and more WAL (full-page writes). v7 is still 16 bytes and leaks creation time, which may be a privacy consideration.",
    ],
  },
  {
    id: "db-s-sequence-gaps",
    level: "senior",
    tags: ["keys", "transactions"],
    q: [
      "چرا ستون `serial`/`identity` در PostgreSQL ممکن است شکاف (gap) داشته باشد؟",
      "Why can a `serial`/`identity` column in PostgreSQL have gaps?",
    ],
    options: [
      ["`nextval` تراکنشی نیست؛ مقادیر گرفته‌شده در transactionهای rollback‌شده یا insertهای ناموفق برنمی‌گردند", "`nextval` isn't transactional; values taken by rolled-back transactions or failed inserts aren't returned"],
      ["به‌خاطر باگ در PostgreSQL", "Because of a PostgreSQL bug"],
      ["چون vacuum شماره‌ها را دوباره تخصیص می‌دهد", "Because vacuum reassigns numbers"],
      ["فقط وقتی سطرها حذف شوند", "Only when rows are deleted"],
    ],
    a: [
      "sequenceها برای هم‌زمانی بالا عمداً non-transactional هستند. پس هرگز روی پیوستگی id برای مثلاً شماره فاکتور حساب نکنید؛ برای شماره‌گذاری بدون شکاف باید یک شمارنده قفل‌شده با هزینه هم‌زمانی استفاده کرد.",
      "Sequences are intentionally non-transactional for high concurrency. Never rely on contiguous ids for e.g. invoice numbers; gapless numbering requires a locked counter row at a concurrency cost.",
    ],
  },
  {
    id: "db-s-dynamic-sql-injection",
    level: "senior",
    tags: ["security", "sql-injection"],
    q: [
      "یک stored procedure از `EXECUTE 'SELECT * FROM t WHERE name = ''' || p_name || ''''` استفاده می‌کند. آیا parameterized بودن فراخوانی از اپلیکیشن کافی است؟",
      "A stored procedure uses `EXECUTE 'SELECT * FROM t WHERE name = ''' || p_name || ''''`. Is calling it with parameters from the app enough?",
    ],
    options: [
      ["خیر؛ الحاق رشته داخل dynamic SQL همچنان injection ایجاد می‌کند و باید از `EXECUTE ... USING` یا `format('%L')` استفاده شود", "No; string concatenation inside dynamic SQL still allows injection; use `EXECUTE ... USING` or `format('%L')`"],
      ["بله؛ پارامترهای اپلیکیشن همه جا امن می‌مانند", "Yes; app-side parameters stay safe everywhere"],
      ["بله؛ stored procedureها ذاتاً در برابر injection مصون‌اند", "Yes; stored procedures are inherently immune to injection"],
      ["خیر؛ ولی فقط اگر دیتابیس MySQL باشد", "No, but only if the database is MySQL"],
    ],
    a: [
      "parameterization فقط مرز اپلیکیشن-دیتابیس را امن می‌کند؛ وقتی مقدار داخل procedure دوباره به رشته SQL چسبانده شود، injection مرتبه دوم رخ می‌دهد. `EXECUTE '... WHERE name = $1' USING p_name` امن است.",
      "Parameterization only secures the app-database boundary; once the value is concatenated back into SQL inside the procedure, second-order injection occurs. `EXECUTE '... WHERE name = $1' USING p_name` is safe.",
    ],
  },
  {
    id: "db-s-row-level-security",
    level: "senior",
    tags: ["security", "multi-tenant"],
    q: [
      "Row-Level Security (RLS) در PostgreSQL برای یک اپلیکیشن multi-tenant چه مزیتی دارد؟",
      "What benefit does PostgreSQL Row-Level Security (RLS) give a multi-tenant app?",
    ],
    options: [
      ["دیتابیس خودش فیلتر tenant را روی هر کوئری اعمال می‌کند، پس یک `WHERE` فراموش‌شده داده را نشت نمی‌دهد", "The database enforces the tenant filter on every query, so a forgotten `WHERE` doesn't leak data"],
      ["کوئری‌ها را همیشه سریع‌تر می‌کند", "It always makes queries faster"],
      ["نیاز به authentication را حذف می‌کند", "It removes the need for authentication"],
      ["داده‌های هر tenant را رمزنگاری می‌کند", "It encrypts each tenant's data"],
    ],
    a: [
      "policyهایی مثل `USING (tenant_id = current_setting('app.tenant_id')::int)` به هر کوئری اضافه می‌شوند. owner جدول و superuser به‌طور پیش‌فرض RLS را دور می‌زنند و با connection pooling باید setting را با `SET LOCAL` در هر transaction تنظیم کرد.",
      "Policies like `USING (tenant_id = current_setting('app.tenant_id')::int)` are applied to every query. Table owners and superusers bypass RLS by default, and with pooling the setting must be set per transaction via `SET LOCAL`.",
    ],
  },
  {
    id: "db-s-pitr-backup",
    level: "senior",
    tags: ["backup", "wal"],
    q: [
      "چرا replica جایگزین backup نیست و Point-In-Time Recovery (PITR) چه چیزی اضافه می‌کند؟",
      "Why isn't a replica a substitute for backups, and what does Point-In-Time Recovery (PITR) add?",
    ],
    options: [
      ["`DROP TABLE` اشتباهی فوراً روی replica هم اعمال می‌شود؛ PITR با base backup و آرشیو WAL امکان بازگشت به لحظه قبل از خطا را می‌دهد", "An accidental `DROP TABLE` replicates instantly; PITR with a base backup plus archived WAL restores to just before the mistake"],
      ["replica داده را فشرده نمی‌کند", "Replicas don't compress data"],
      ["replica فقط داده خواندنی دارد و قابل بازیابی نیست", "Replicas only hold read-only data that can't be restored"],
      ["PITR فقط برای MySQL وجود دارد", "PITR only exists for MySQL"],
    ],
    a: [
      "replication در برابر خرابی سخت‌افزار محافظت می‌کند، نه خطای انسانی یا باگ اپلیکیشن. با `pg_basebackup` یا ابزارهایی مثل pgBackRest و آرشیو پیوسته WAL می‌توان تا یک timestamp یا LSN مشخص بازیابی کرد؛ restore باید مرتب تست شود.",
      "Replication protects against hardware failure, not human error or app bugs. With `pg_basebackup` or tools like pgBackRest plus continuous WAL archiving you can restore to a specific timestamp or LSN; restores must be tested regularly.",
    ],
  },
  {
    id: "db-s-cap-pacelc",
    level: "senior",
    tags: ["distributed", "replication"],
    q: [
      "طبق PACELC، یک cluster PostgreSQL با replication همگام در حالت عادی (بدون partition) چه انتخابی می‌کند؟",
      "Per PACELC, what does a PostgreSQL cluster with synchronous replication choose in normal operation (no partition)?",
    ],
    options: [
      ["consistency را به قیمت latency بیشتر انتخاب می‌کند (EC)", "Consistency at the cost of higher latency (EC)"],
      ["latency کم را به قیمت consistency انتخاب می‌کند (EL)", "Low latency at the cost of consistency (EL)"],
      ["هم latency صفر و هم consistency کامل", "Both zero latency and full consistency"],
      ["PACELC فقط برای دیتابیس‌های NoSQL معنا دارد", "PACELC only applies to NoSQL databases"],
    ],
    a: [
      "PACELC می‌گوید حتی بدون partition بین latency و consistency trade-off وجود دارد. replication همگام برای هر commit منتظر replica می‌ماند (EC)، در حالی که async با latency کمتر ولی خطر از دست دادن داده و خواندن کهنه همراه است (EL).",
      "PACELC says even without partitions there's a latency vs consistency trade-off. Sync replication waits for the replica on each commit (EC), while async offers lower latency at the risk of data loss and stale reads (EL).",
    ],
  },
  {
    id: "db-s-lateral-top-n",
    level: "senior",
    tags: ["joins", "performance"],
    q: [
      "برای گرفتن ۳ سفارش آخر هر user وقتی index روی `orders(user_id, created_at DESC)` وجود دارد، کدام روش معمولاً کاراتر است؟",
      "To get each user's 3 latest orders with an index on `orders(user_id, created_at DESC)`, which approach is usually most efficient?",
    ],
    options: [
      ["`users u CROSS JOIN LATERAL (SELECT ... WHERE o.user_id = u.id ORDER BY created_at DESC LIMIT 3)`", "`users u CROSS JOIN LATERAL (SELECT ... WHERE o.user_id = u.id ORDER BY created_at DESC LIMIT 3)`"],
      ["`ROW_NUMBER()` روی کل جدول `orders` و فیلتر `rn <= 3` همیشه سریع‌تر است", "`ROW_NUMBER()` over all of `orders` and filtering `rn <= 3` is always faster"],
      ["`GROUP BY user_id` با `LIMIT 3`", "`GROUP BY user_id` with `LIMIT 3`"],
      ["`SELECT DISTINCT` روی `user_id`", "`SELECT DISTINCT` on `user_id`"],
    ],
    a: [
      "`LATERAL` برای هر user یک index scan کوتاه انجام می‌دهد که پس از ۳ سطر متوقف می‌شود. `ROW_NUMBER` باید همه سفارش‌ها را بخواند و شماره‌گذاری کند، که وقتی هر user سفارش‌های زیادی دارد پرهزینه است.",
      "`LATERAL` runs a short index scan per user that stops after 3 rows. `ROW_NUMBER` must read and number every order, which is costly when users have many orders.",
    ],
  },
  {
    id: "db-s-cte-materialized-fence",
    level: "senior",
    tags: ["cte", "performance"],
    q: [
      "در PostgreSQL 12+، `WITH x AS MATERIALIZED (SELECT * FROM big) SELECT * FROM x WHERE id = 5` چه اثری دارد؟",
      "In PostgreSQL 12+, what effect does `WITH x AS MATERIALIZED (SELECT * FROM big) SELECT * FROM x WHERE id = 5` have?",
    ],
    options: [
      ["CTE به‌عنوان optimization fence عمل می‌کند و شرط `id = 5` به داخل آن push down نمی‌شود", "The CTE acts as an optimization fence and `id = 5` isn't pushed down into it"],
      ["نتیجه CTE به‌صورت دائمی در دیسک ذخیره می‌شود", "The CTE result is permanently stored on disk"],
      ["planner شرط را push down می‌کند و از index استفاده می‌کند", "The planner pushes the condition down and uses the index"],
      ["خطای syntax؛ `MATERIALIZED` فقط برای view است", "Syntax error; `MATERIALIZED` is only for views"],
    ],
    a: [
      "`MATERIALIZED` CTE را یک بار کامل اجرا و نتیجه را موقتاً نگه می‌دارد، پس کل `big` خوانده می‌شود. این برای جلوگیری از محاسبه چندباره یا کنترل plan مفید است ولی اینجا index را بی‌اثر می‌کند؛ `NOT MATERIALIZED` inline شدن را اجبار می‌کند.",
      "`MATERIALIZED` evaluates the CTE once in full and holds the result temporarily, so all of `big` is read. Useful to avoid repeated evaluation or steer the plan, but here it defeats the index; `NOT MATERIALIZED` forces inlining.",
    ],
  },
  {
    id: "db-s-innodb-gap-locks",
    level: "senior",
    tags: ["locking", "mysql", "isolation"],
    q: [
      "MySQL InnoDB در Repeatable Read چگونه از phantom در `SELECT ... FOR UPDATE` با شرط بازه جلوگیری می‌کند؟",
      "How does MySQL InnoDB under Repeatable Read prevent phantoms for a range `SELECT ... FOR UPDATE`?",
    ],
    options: [
      ["با next-key lock (قفل رکورد به‌علاوه gap) روی بازه index اسکن‌شده", "With next-key locks (record plus gap locks) on the scanned index range"],
      ["با قفل کردن کل جدول", "By locking the entire table"],
      ["با abort کردن خودکار transactionهای دیگر پس از commit", "By automatically aborting other transactions after commit"],
      ["از phantom جلوگیری نمی‌کند", "It doesn't prevent phantoms"],
    ],
    a: [
      "gap lock درج سطر جدید در فاصله بین رکوردهای index را block می‌کند. بدون index مناسب، InnoDB ممکن است بازه بسیار بزرگی (عملاً کل جدول) را قفل کند که منبع رایج deadlock و contention است.",
      "Gap locks block inserts into the gaps between index records. Without a suitable index, InnoDB may lock a huge range (effectively the whole table), a common source of deadlocks and contention.",
    ],
  },
  {
    id: "db-s-replication-slot-disk",
    level: "senior",
    tags: ["replication", "wal"],
    q: [
      "دیسک primary به‌تدریج با فایل‌های WAL پر می‌شود در حالی که checkpointها عادی‌اند. محتمل‌ترین علت چیست؟",
      "The primary's disk slowly fills with WAL files while checkpoints look normal. What's the most likely cause?",
    ],
    options: [
      ["یک replication slot غیرفعال که مصرف‌کننده‌اش قطع شده و WAL را نگه می‌دارد", "An inactive replication slot whose consumer is gone, retaining WAL"],
      ["autovacuum بیش از حد فعال است", "Autovacuum is too aggressive"],
      ["تعداد indexها زیاد است", "There are too many indexes"],
      ["`work_mem` خیلی بزرگ است", "`work_mem` is too large"],
    ],
    a: [
      "replication slot تضمین می‌کند WAL تا مصرف شدن توسط subscriber/replica حذف نشود؛ اگر مصرف‌کننده برنگردد WAL بی‌نهایت جمع می‌شود. `pg_replication_slots` را مانیتور و از `max_slot_wal_keep_size` به‌عنوان سقف استفاده کنید.",
      "A replication slot guarantees WAL is kept until its subscriber/replica consumes it; if the consumer never returns, WAL piles up indefinitely. Monitor `pg_replication_slots` and cap it with `max_slot_wal_keep_size`.",
    ],
  },
]);
