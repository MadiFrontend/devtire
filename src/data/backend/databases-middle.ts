import { build } from "../build";

export const databasesMiddle = build("databases", [
  {
    id: "db-m-left-join-where-filter",
    level: "middle",
    tags: ["joins", "null"],
    q: [
      "چرا `users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.status = 'paid'` userهای بدون سفارش را برنمی‌گرداند؟",
      "Why does `users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.status = 'paid'` drop users with no orders?",
    ],
    options: [
      ["شرط `WHERE` روی `NULL`ها `TRUE` نمی‌شود و عملاً join را به `INNER` تبدیل می‌کند", "The `WHERE` condition isn't `TRUE` for `NULL`s, effectively turning it into an `INNER` join"],
      ["`LEFT JOIN` با `WHERE` پشتیبانی نمی‌شود", "`LEFT JOIN` isn't supported together with `WHERE`"],
      ["planner همیشه `LEFT JOIN` را به `RIGHT JOIN` تبدیل می‌کند", "The planner always rewrites `LEFT JOIN` as `RIGHT JOIN`"],
      ["چون `status` index ندارد", "Because `status` has no index"],
    ],
    a: [
      "برای userهای بدون سفارش `o.status` برابر `NULL` است و `NULL = 'paid'` آن‌ها را حذف می‌کند. برای حفظشان شرط را به `ON` منتقل کنید: `ON o.user_id = u.id AND o.status = 'paid'`.",
      "For users with no orders `o.status` is `NULL`, and `NULL = 'paid'` filters them out. To keep them, move the condition into `ON`: `ON o.user_id = u.id AND o.status = 'paid'`.",
    ],
  },
  {
    id: "db-m-join-fanout-sum",
    level: "middle",
    tags: ["joins", "aggregates"],
    q: [
      "کوئری `SELECT u.id, SUM(o.total), COUNT(p.id) FROM users u JOIN orders o ON ... JOIN payments p ON p.user_id = u.id GROUP BY u.id` مجموع سفارش‌ها را بیش از حد نشان می‌دهد. علت چیست؟",
      "`SELECT u.id, SUM(o.total), COUNT(p.id) FROM users u JOIN orders o ON ... JOIN payments p ON p.user_id = u.id GROUP BY u.id` overstates order totals. Why?",
    ],
    options: [
      ["join دو رابطه one-to-many مستقل باعث ضرب سطرها (fan-out) می‌شود", "Joining two independent one-to-many relations multiplies rows (fan-out)"],
      ["`SUM` مقادیر `NULL` را دو بار می‌شمارد", "`SUM` counts `NULL` values twice"],
      ["`GROUP BY` باید روی `o.id` باشد", "`GROUP BY` must be on `o.id`"],
      ["`COUNT` و `SUM` نمی‌توانند در یک کوئری باشند", "`COUNT` and `SUM` can't be in the same query"],
    ],
    a: [
      "هر سفارش به ازای هر پرداخت user تکرار می‌شود، پس `SUM(o.total)` در تعداد پرداخت‌ها ضرب می‌شود. راه حل aggregate کردن هر جدول در زیرکوئری یا CTE جداگانه و سپس join است.",
      "Each order is repeated once per payment, so `SUM(o.total)` is multiplied by the payment count. Aggregate each table separately in a subquery or CTE, then join.",
    ],
  },
  {
    id: "db-m-correlated-subquery",
    level: "middle",
    tags: ["subqueries"],
    q: [
      "correlated subquery چیست؟",
      "What is a correlated subquery?",
    ],
    options: [
      ["زیرکوئری‌ای که به ستون‌های کوئری بیرونی ارجاع می‌دهد و منطقاً برای هر سطر ارزیابی می‌شود", "A subquery that references outer query columns and is logically evaluated per row"],
      ["زیرکوئری‌ای که فقط یک بار اجرا می‌شود", "A subquery that runs exactly once"],
      ["زیرکوئری‌ای که داخل `FROM` قرار دارد", "A subquery placed inside `FROM`"],
      ["زیرکوئری‌ای که از `UNION` استفاده می‌کند", "A subquery that uses `UNION`"],
    ],
    a: [
      "مثلاً `WHERE salary > (SELECT AVG(salary) FROM emp e2 WHERE e2.dept = e1.dept)` به `e1` وابسته است. planner گاهی آن را به join تبدیل می‌کند، ولی در غیر این صورت روی جدول‌های بزرگ کند است.",
      "E.g. `WHERE salary > (SELECT AVG(salary) FROM emp e2 WHERE e2.dept = e1.dept)` depends on `e1`. The planner can sometimes decorrelate it into a join; otherwise it's slow on large tables.",
    ],
  },
  {
    id: "db-m-exists-vs-in",
    level: "middle",
    tags: ["subqueries", "performance"],
    q: [
      "در PostgreSQL مدرن، `WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)` در مقایسه با `WHERE u.id IN (SELECT user_id FROM orders)` چگونه است؟",
      "In modern PostgreSQL, how does `WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)` compare to `WHERE u.id IN (SELECT user_id FROM orders)`?",
    ],
    options: [
      ["معمولاً هر دو به semi-join تبدیل می‌شوند و عملکرد مشابه دارند", "Both are usually planned as a semi-join with similar performance"],
      ["`IN` همیشه کل زیرکوئری را برای هر سطر دوباره اجرا می‌کند", "`IN` always re-executes the whole subquery for every row"],
      ["`EXISTS` همیشه سطرهای تکراری برمی‌گرداند", "`EXISTS` always returns duplicate rows"],
      ["`EXISTS` نمی‌تواند از index استفاده کند", "`EXISTS` can't use an index"],
    ],
    a: [
      "optimizer هر دو را به semi-join (hash یا nested loop) تبدیل می‌کند. تفاوت مهم در نسخه منفی است: `NOT IN` با `NULL` رفتار غیرمنتظره دارد ولی `NOT EXISTS` به anti-join امن تبدیل می‌شود.",
      "The optimizer turns both into a semi-join (hash or nested loop). The important difference is the negated form: `NOT IN` misbehaves with `NULL`, while `NOT EXISTS` becomes a safe anti-join.",
    ],
  },
  {
    id: "db-m-row-number",
    level: "middle",
    tags: ["window-functions"],
    q: [
      "برای گرفتن جدیدترین سفارش هر user کدام روش درست است؟",
      "Which approach correctly gets each user's latest order?",
    ],
    options: [
      ["`ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC)` و فیلتر `rn = 1`", "`ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC)` and filter `rn = 1`"],
      ["`SELECT * FROM orders GROUP BY user_id`", "`SELECT * FROM orders GROUP BY user_id`"],
      ["`SELECT * FROM orders ORDER BY created_at DESC LIMIT 1`", "`SELECT * FROM orders ORDER BY created_at DESC LIMIT 1`"],
      ["`SELECT user_id, MAX(created_at), total FROM orders GROUP BY user_id`", "`SELECT user_id, MAX(created_at), total FROM orders GROUP BY user_id`"],
    ],
    a: [
      "window function برای هر گروه شماره‌گذاری جداگانه انجام می‌دهد و سطرها را حذف نمی‌کند؛ سپس در کوئری بیرونی `rn = 1` فیلتر می‌شود. در PostgreSQL `DISTINCT ON (user_id)` هم گزینه رایجی است.",
      "The window function numbers rows within each partition without collapsing them; the outer query then filters `rn = 1`. In PostgreSQL, `DISTINCT ON (user_id)` is also common.",
    ],
  },
  {
    id: "db-m-rank-vs-dense-rank",
    level: "middle",
    tags: ["window-functions"],
    q: [
      "برای امتیازهای `100, 90, 90, 80`، خروجی `RANK()` و `DENSE_RANK()` (به ترتیب نزولی) چیست؟",
      "For scores `100, 90, 90, 80`, what do `RANK()` and `DENSE_RANK()` (descending) return?",
    ],
    options: [
      ["`RANK`: `1,2,2,4` و `DENSE_RANK`: `1,2,2,3`", "`RANK`: `1,2,2,4` and `DENSE_RANK`: `1,2,2,3`"],
      ["`RANK`: `1,2,2,3` و `DENSE_RANK`: `1,2,2,4`", "`RANK`: `1,2,2,3` and `DENSE_RANK`: `1,2,2,4`"],
      ["هر دو `1,2,3,4`", "Both `1,2,3,4`"],
      ["هر دو `1,2,2,3`", "Both `1,2,2,3`"],
    ],
    a: [
      "`RANK` برای مقادیر مساوی رتبه یکسان می‌دهد و بعد از آن شکاف می‌گذارد؛ `DENSE_RANK` شکاف ندارد. `ROW_NUMBER` همیشه شماره یکتا `1,2,3,4` می‌دهد.",
      "`RANK` gives ties the same rank and leaves a gap after them; `DENSE_RANK` has no gaps. `ROW_NUMBER` always gives unique numbers `1,2,3,4`.",
    ],
  },
  {
    id: "db-m-lag",
    level: "middle",
    tags: ["window-functions"],
    q: [
      "`revenue - LAG(revenue) OVER (ORDER BY month)` چه چیزی محاسبه می‌کند؟",
      "What does `revenue - LAG(revenue) OVER (ORDER BY month)` compute?",
    ],
    options: [
      ["تغییر درآمد نسبت به ماه قبل (برای ماه اول `NULL`)", "Change in revenue versus the previous month (`NULL` for the first month)"],
      ["تغییر درآمد نسبت به ماه بعد", "Change in revenue versus the next month"],
      ["مجموع تجمعی درآمد", "Cumulative revenue total"],
      ["اختلاف درآمد با میانگین کل", "Difference from overall average revenue"],
    ],
    a: [
      "`LAG` مقدار سطر قبلی در ترتیب پنجره را برمی‌گرداند و `LEAD` سطر بعدی را. برای اولین سطر مقدار قبلی وجود ندارد و نتیجه `NULL` است مگر اینکه default بدهید: `LAG(revenue, 1, 0)`.",
      "`LAG` returns the previous row's value in window order and `LEAD` the next. The first row has no previous value, so the result is `NULL` unless you pass a default: `LAG(revenue, 1, 0)`.",
    ],
  },
  {
    id: "db-m-running-total",
    level: "middle",
    tags: ["window-functions"],
    q: [
      "کدام عبارت یک running total از `amount` به ترتیب `id` می‌سازد؟",
      "Which expression produces a running total of `amount` ordered by `id`?",
    ],
    options: [
      ["`SUM(amount) OVER (ORDER BY id)`", "`SUM(amount) OVER (ORDER BY id)`"],
      ["`SUM(amount) OVER ()`", "`SUM(amount) OVER ()`"],
      ["`SUM(amount) GROUP BY id`", "`SUM(amount) GROUP BY id`"],
      ["`SUM(amount) OVER (PARTITION BY id)`", "`SUM(amount) OVER (PARTITION BY id)`"],
    ],
    a: [
      "با `ORDER BY` در پنجره، frame پیش‌فرض از ابتدا تا سطر جاری است، پس جمع تجمعی می‌دهد. `OVER ()` جمع کل را در هر سطر تکرار می‌کند و `PARTITION BY id` هر سطر را جدا جمع می‌زند.",
      "With `ORDER BY` in the window, the default frame runs from the start to the current row, giving a cumulative sum. `OVER ()` repeats the grand total on every row; `PARTITION BY id` sums each row alone.",
    ],
  },
  {
    id: "db-m-window-range-vs-rows",
    level: "middle",
    tags: ["window-functions"],
    q: [
      "چرا `SUM(amount) OVER (ORDER BY day)` برای روزهای تکراری running total یکسانی نشان می‌دهد؟",
      "Why does `SUM(amount) OVER (ORDER BY day)` show the same running total for rows with duplicate days?",
    ],
    options: [
      ["frame پیش‌فرض `RANGE` است و همه peerهای هم‌مقدار را شامل می‌شود", "The default frame is `RANGE`, which includes all peer rows with equal values"],
      ["`SUM` با تاریخ‌ها درست کار نمی‌کند", "`SUM` doesn't work correctly with dates"],
      ["window functionها مقادیر تکراری را حذف می‌کنند", "Window functions remove duplicate values"],
      ["باید `GROUP BY day` اضافه شود", "A `GROUP BY day` must be added"],
    ],
    a: [
      "frame پیش‌فرض `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` است که سطرهای با مقدار مرتب‌سازی برابر را با هم حساب می‌کند. برای جمع سطر به سطر از `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` استفاده کنید.",
      "The default frame is `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, which treats rows with equal sort keys together. For strictly row-by-row sums use `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.",
    ],
  },
  {
    id: "db-m-cte",
    level: "middle",
    tags: ["cte"],
    q: [
      "مزیت اصلی CTE (`WITH ... AS (...)`) چیست؟",
      "What is the main benefit of a CTE (`WITH ... AS (...)`)?",
    ],
    options: [
      ["خوانایی بیشتر با نام‌گذاری مراحل میانی کوئری", "Better readability by naming intermediate query steps"],
      ["همیشه سریع‌تر از زیرکوئری است", "It is always faster than a subquery"],
      ["نتیجه را به‌صورت دائمی ذخیره می‌کند", "It stores the result permanently"],
      ["نیاز به index را حذف می‌کند", "It removes the need for indexes"],
    ],
    a: [
      "CTE کوئری‌های پیچیده را به مراحل نام‌دار تقسیم می‌کند. از PostgreSQL 12، CTEهای غیر recursive که یک بار ارجاع شوند inline می‌شوند و مثل زیرکوئری optimize می‌شوند؛ با `MATERIALIZED` می‌توان رفتار قدیمی را اجبار کرد.",
      "A CTE splits complex queries into named steps. Since PostgreSQL 12, non-recursive CTEs referenced once are inlined and optimized like subqueries; `MATERIALIZED` forces the old behavior.",
    ],
  },
  {
    id: "db-m-recursive-cte",
    level: "middle",
    tags: ["cte", "hierarchies"],
    q: [
      "برای گرفتن همه زیرمجموعه‌های یک category در درختی با ستون `parent_id`، از چه استفاده می‌کنید؟",
      "To fetch all descendants of a category in a tree with a `parent_id` column, what do you use?",
    ],
    options: [
      ["`WITH RECURSIVE` با بخش anchor و بخش recursive که با `UNION ALL` ترکیب می‌شوند", "`WITH RECURSIVE` with an anchor part and a recursive part combined by `UNION ALL`"],
      ["یک self join ساده", "A single self join"],
      ["`GROUP BY parent_id`", "`GROUP BY parent_id`"],
      ["window function `LAG`", "The `LAG` window function"],
    ],
    a: [
      "بخش anchor ریشه را انتخاب می‌کند و بخش recursive فرزندان سطرهای مرحله قبل را join می‌کند تا سطر جدیدی تولید نشود. self join ساده فقط یک سطح را پوشش می‌دهد.",
      "The anchor selects the root, and the recursive part joins children of the previous step's rows until no new rows appear. A single self join only covers one level.",
    ],
  },
  {
    id: "db-m-recursive-cte-cycle",
    level: "middle",
    tags: ["cte", "hierarchies"],
    q: [
      "اگر داده سلسله‌مراتبی دور (cycle) داشته باشد، یک recursive CTE با `UNION ALL` چه می‌کند؟",
      "If hierarchical data contains a cycle, what does a recursive CTE with `UNION ALL` do?",
    ],
    options: [
      ["بی‌نهایت ادامه می‌دهد مگر اینکه cycle را تشخیص دهید یا عمق را محدود کنید", "It loops forever unless you detect cycles or limit depth"],
      ["خودکار cycle را تشخیص داده و متوقف می‌شود", "It automatically detects the cycle and stops"],
      ["بلافاصله خطای syntax می‌دهد", "It fails immediately with a syntax error"],
      ["فقط سطح اول را برمی‌گرداند", "It returns only the first level"],
    ],
    a: [
      "با نگه‌داشتن مسیر در یک آرایه و شرط `NOT id = ANY(path)`، یا ستون عمق با حد مشخص، یا بند `CYCLE` در PostgreSQL 14+ می‌توان جلوی حلقه بی‌پایان را گرفت. `UNION` (بدون ALL) هم سطرهای کاملاً تکراری را حذف می‌کند.",
      "Track the path in an array with `NOT id = ANY(path)`, add a depth column with a limit, or use the `CYCLE` clause in PostgreSQL 14+. `UNION` (without ALL) also discards fully duplicate rows.",
    ],
  },
  {
    id: "db-m-materialized-view",
    level: "middle",
    tags: ["views"],
    q: [
      "تفاوت اصلی materialized view با view معمولی چیست؟",
      "What is the main difference between a materialized view and a regular view?",
    ],
    options: [
      ["نتیجه را فیزیکی ذخیره می‌کند و باید با `REFRESH` به‌روز شود", "It physically stores the result and must be updated with `REFRESH`"],
      ["همیشه با جدول پایه هم‌زمان است", "It is always in sync with the base tables"],
      ["قابل index گذاری نیست", "It can't be indexed"],
      ["فقط در حافظه نگه داشته می‌شود", "It is kept only in memory"],
    ],
    a: [
      "materialized view برای گزارش‌های سنگین مناسب است چون خواندنش سریع است، اما داده‌اش تا `REFRESH MATERIALIZED VIEW` کهنه می‌ماند. با `CONCURRENTLY` (نیازمند unique index) refresh بدون قفل کردن خواننده‌ها انجام می‌شود.",
      "Materialized views suit heavy reports since reads are fast, but data stays stale until `REFRESH MATERIALIZED VIEW`. `CONCURRENTLY` (requires a unique index) refreshes without blocking readers.",
    ],
  },
  {
    id: "db-m-2nf",
    level: "middle",
    tags: ["normalization"],
    q: [
      "جدول `order_items(order_id, product_id, quantity, product_name)` با primary key `(order_id, product_id)` کدام فرم نرمال را نقض می‌کند؟",
      "Table `order_items(order_id, product_id, quantity, product_name)` with primary key `(order_id, product_id)` violates which normal form?",
    ],
    options: [
      ["2NF، چون `product_name` فقط به بخشی از key وابسته است", "2NF, because `product_name` depends on only part of the key"],
      ["1NF، چون key ترکیبی است", "1NF, because the key is composite"],
      ["3NF، چون `quantity` عدد است", "3NF, because `quantity` is numeric"],
      ["هیچ‌کدام؛ جدول کاملاً نرمال است", "None; the table is fully normalized"],
    ],
    a: [
      "2NF می‌گوید هیچ ستون غیرکلیدی نباید به بخشی از composite key وابسته باشد (partial dependency). `product_name` فقط به `product_id` بستگی دارد و باید در جدول `products` باشد.",
      "2NF forbids non-key columns depending on only part of a composite key (partial dependency). `product_name` depends only on `product_id` and belongs in `products`.",
    ],
  },
  {
    id: "db-m-3nf",
    level: "middle",
    tags: ["normalization"],
    q: [
      "جدول `employees(id, dept_id, dept_name)` با key برابر `id` کدام فرم نرمال را نقض می‌کند؟",
      "Table `employees(id, dept_id, dept_name)` keyed by `id` violates which normal form?",
    ],
    options: [
      ["3NF، به دلیل وابستگی transitive `id → dept_id → dept_name`", "3NF, due to the transitive dependency `id → dept_id → dept_name`"],
      ["1NF", "1NF"],
      ["2NF", "2NF"],
      ["هیچ‌کدام", "None"],
    ],
    a: [
      "در 3NF ستون غیرکلیدی نباید به ستون غیرکلیدی دیگری وابسته باشد. `dept_name` از طریق `dept_id` تعیین می‌شود؛ با تغییر نام دپارتمان باید سطرهای زیادی را update کرد. 2NF نقض نمی‌شود چون key تک‌ستونی است.",
      "In 3NF, a non-key column must not depend on another non-key column. `dept_name` is determined via `dept_id`, so renaming a department means updating many rows. 2NF holds since the key is single-column.",
    ],
  },
  {
    id: "db-m-denormalization",
    level: "middle",
    tags: ["normalization", "performance"],
    q: [
      "چه زمانی denormalization (مثلاً ذخیره `comments_count` در جدول `posts`) منطقی است؟",
      "When does denormalization (e.g. storing `comments_count` on `posts`) make sense?",
    ],
    options: [
      ["وقتی خواندن بسیار پرتکرار و محاسبه گران است و می‌توان هم‌زمانی را مدیریت کرد", "When reads are very frequent, computing is expensive, and you can manage keeping it in sync"],
      ["همیشه، چون join همیشه کند است", "Always, because joins are always slow"],
      ["وقتی داده زیاد تغییر می‌کند و consistency حیاتی است", "When data changes a lot and consistency is critical"],
      ["فقط وقتی دیتابیس foreign key ندارد", "Only when the database has no foreign keys"],
    ],
    a: [
      "denormalization خواندن را سریع می‌کند ولی بار نوشتن و خطر ناسازگاری را بالا می‌برد. باید با transaction، trigger یا job دوره‌ای همگام نگه داشته شود.",
      "Denormalization speeds reads but increases write cost and inconsistency risk. It must be kept in sync via transactions, triggers, or periodic jobs.",
    ],
  },
  {
    id: "db-m-isolation-default-pg",
    level: "middle",
    tags: ["isolation", "transactions"],
    q: [
      "isolation level پیش‌فرض PostgreSQL کدام است؟",
      "What is PostgreSQL's default isolation level?",
    ],
    options: [
      ["Read Committed", "Read Committed"],
      ["Repeatable Read", "Repeatable Read"],
      ["Serializable", "Serializable"],
      ["Read Uncommitted", "Read Uncommitted"],
    ],
    a: [
      "PostgreSQL به‌طور پیش‌فرض Read Committed است؛ هر statement یک snapshot تازه می‌بیند. MySQL InnoDB به‌طور پیش‌فرض Repeatable Read است.",
      "PostgreSQL defaults to Read Committed, where each statement sees a fresh snapshot. MySQL InnoDB defaults to Repeatable Read.",
    ],
  },
  {
    id: "db-m-dirty-read",
    level: "middle",
    tags: ["isolation", "anomalies"],
    q: [
      "dirty read چیست؟",
      "What is a dirty read?",
    ],
    options: [
      ["خواندن تغییرات commit‌نشده transaction دیگر", "Reading another transaction's uncommitted changes"],
      ["خواندن دو مقدار متفاوت از یک سطر در یک transaction", "Reading two different values of a row within one transaction"],
      ["ظاهر شدن سطرهای جدید در اجرای دوم یک کوئری", "New rows appearing on a re-run of a query"],
      ["خواندن داده از یک index خراب", "Reading data from a corrupted index"],
    ],
    a: [
      "اگر transaction دیگر rollback کند، داده‌ای خوانده‌اید که هرگز وجود نداشته است. فقط Read Uncommitted آن را مجاز می‌داند و PostgreSQL حتی در آن سطح هم dirty read ندارد.",
      "If the other transaction rolls back, you've read data that never existed. Only Read Uncommitted allows it, and PostgreSQL doesn't permit dirty reads even at that level.",
    ],
  },
  {
    id: "db-m-non-repeatable-read",
    level: "middle",
    tags: ["isolation", "anomalies"],
    q: [
      "در Read Committed، transaction ابتدا `SELECT balance FROM accounts WHERE id = 1` را می‌خواند و `100` می‌گیرد؛ transaction دیگر آن را به `50` تغییر و commit می‌کند. اجرای دوباره همان SELECT چه می‌دهد؟",
      "Under Read Committed, a transaction reads `SELECT balance FROM accounts WHERE id = 1` and gets `100`; another transaction changes it to `50` and commits. What does re-running the SELECT return?",
    ],
    options: [
      ["`50` (non-repeatable read)", "`50` (a non-repeatable read)"],
      ["`100`، چون snapshot ثابت است", "`100`, because the snapshot is fixed"],
      ["خطای serialization", "A serialization error"],
      ["SELECT تا پایان transaction دیگر block می‌شود", "The SELECT blocks until the other transaction ends"],
    ],
    a: [
      "در Read Committed هر statement snapshot جدیدی می‌گیرد و تغییرات commit‌شده را می‌بیند. در Repeatable Read کل transaction یک snapshot دارد و همچنان `100` دیده می‌شود.",
      "Under Read Committed each statement takes a new snapshot and sees committed changes. Under Repeatable Read the whole transaction uses one snapshot and still sees `100`.",
    ],
  },
  {
    id: "db-m-phantom-read",
    level: "middle",
    tags: ["isolation", "anomalies"],
    q: [
      "phantom read چیست؟",
      "What is a phantom read?",
    ],
    options: [
      ["اجرای دوباره یک کوئری با شرط، سطرهای جدید یا حذف‌شده را نشان دهد", "Re-running a query with a condition shows rows that were inserted or deleted"],
      ["خواندن داده‌ای که rollback شده است", "Reading data that was rolled back"],
      ["از دست رفتن یک update به‌خاطر update هم‌زمان", "Losing an update due to a concurrent update"],
      ["خواندن سطری که هنوز در WAL است", "Reading a row that is still in the WAL"],
    ],
    a: [
      "در phantom مقدار سطرهای موجود تغییر نمی‌کند بلکه مجموعه سطرهای منطبق با شرط عوض می‌شود. استاندارد آن را در Repeatable Read مجاز می‌داند، ولی Repeatable Read در PostgreSQL به لطف snapshot از آن جلوگیری می‌کند.",
      "In a phantom, existing rows don't change; the set of rows matching the condition does. The standard allows it at Repeatable Read, but PostgreSQL's snapshot-based Repeatable Read prevents it.",
    ],
  },
  {
    id: "db-m-lost-update",
    level: "middle",
    tags: ["concurrency", "anomalies"],
    q: [
      "دو درخواست هم‌زمان هر کدام `stock` را می‌خوانند (`10`)، در اپلیکیشن یکی کم می‌کنند و `UPDATE products SET stock = 9` می‌نویسند. نتیجه چیست؟",
      "Two concurrent requests each read `stock` (`10`), subtract one in the app, and write `UPDATE products SET stock = 9`. What's the result?",
    ],
    options: [
      ["`9` به‌جای `8` (lost update)", "`9` instead of `8` (a lost update)"],
      ["`8`، چون دیتابیس خودکار ادغام می‌کند", "`8`, because the database merges them automatically"],
      ["deadlock و rollback یکی از آن‌ها", "A deadlock rolling one of them back"],
      ["خطای unique constraint", "A unique constraint error"],
    ],
    a: [
      "الگوی read-modify-write در اپلیکیشن در Read Committed باعث lost update می‌شود. راه حل update اتمیک `SET stock = stock - 1`، یا `SELECT ... FOR UPDATE`، یا optimistic locking با ستون version است.",
      "An app-side read-modify-write under Read Committed causes a lost update. Fix with an atomic `SET stock = stock - 1`, `SELECT ... FOR UPDATE`, or optimistic locking with a version column.",
    ],
  },
  {
    id: "db-m-select-for-update",
    level: "middle",
    tags: ["locking", "concurrency"],
    q: [
      "`SELECT * FROM accounts WHERE id = 1 FOR UPDATE` داخل یک transaction چه می‌کند؟",
      "What does `SELECT * FROM accounts WHERE id = 1 FOR UPDATE` do inside a transaction?",
    ],
    options: [
      ["روی سطر قفل ردیفی می‌گذارد تا transactionهای دیگر نتوانند آن را تا پایان transaction تغییر دهند یا قفل کنند", "Row-locks it so other transactions can't modify or lock it until this transaction ends"],
      ["کل جدول را برای خواندن و نوشتن قفل می‌کند", "Locks the whole table for reads and writes"],
      ["جلوی SELECTهای معمولی دیگران را هم می‌گیرد", "Also blocks other sessions' plain SELECTs"],
      ["سطر را بلافاصله update می‌کند", "Updates the row immediately"],
    ],
    a: [
      "این یک pessimistic lock است: `UPDATE`/`DELETE` یا `FOR UPDATE` دیگران روی آن سطر منتظر می‌مانند. به لطف MVCC، `SELECT`های ساده block نمی‌شوند.",
      "It's a pessimistic lock: others' `UPDATE`/`DELETE` or `FOR UPDATE` on that row wait. Thanks to MVCC, plain `SELECT`s are not blocked.",
    ],
  },
  {
    id: "db-m-skip-locked",
    level: "middle",
    tags: ["locking", "queues"],
    q: [
      "برای ساخت یک job queue روی PostgreSQL که چند worker هم‌زمان jobهای متفاوت بردارند، کدام مناسب است؟",
      "To build a PostgreSQL job queue where multiple workers grab different jobs concurrently, what fits best?",
    ],
    options: [
      ["`SELECT ... FOR UPDATE SKIP LOCKED LIMIT 1`", "`SELECT ... FOR UPDATE SKIP LOCKED LIMIT 1`"],
      ["`SELECT ... FOR UPDATE NOWAIT` بدون retry", "`SELECT ... FOR UPDATE NOWAIT` with no retry"],
      ["`LOCK TABLE jobs` در هر worker", "`LOCK TABLE jobs` in each worker"],
      ["`SELECT ... LIMIT 1` بدون قفل", "`SELECT ... LIMIT 1` with no locking"],
    ],
    a: [
      "`SKIP LOCKED` سطرهای قفل‌شده را رد می‌کند، پس هر worker بدون انتظار job آزاد بعدی را برمی‌دارد. بدون قفل چند worker یک job را برمی‌دارند و قفل جدول موازی‌سازی را از بین می‌برد.",
      "`SKIP LOCKED` skips locked rows so each worker grabs the next free job without waiting. Without locking, workers pick the same job; a table lock kills parallelism.",
    ],
  },
  {
    id: "db-m-deadlock",
    level: "middle",
    tags: ["locking", "deadlocks"],
    q: [
      "transaction A سطر 1 و سپس سطر 2 را update می‌کند و transaction B هم‌زمان سطر 2 و سپس سطر 1 را. PostgreSQL چه می‌کند؟",
      "Transaction A updates row 1 then row 2, while B concurrently updates row 2 then row 1. What does PostgreSQL do?",
    ],
    options: [
      ["deadlock را تشخیص می‌دهد و یکی از transactionها را با خطا abort می‌کند", "Detects the deadlock and aborts one transaction with an error"],
      ["هر دو برای همیشه منتظر می‌مانند", "Both wait forever"],
      ["هر دو را خودکار پشت سر هم اجرا می‌کند", "Automatically runs both one after the other"],
      ["update دوم هر دو را بی‌صدا نادیده می‌گیرد", "Silently ignores the second update in both"],
    ],
    a: [
      "PostgreSQL پس از `deadlock_timeout` گراف انتظار را بررسی و یک قربانی را abort می‌کند؛ اپلیکیشن باید retry کند. پیشگیری: قفل گرفتن روی سطرها همیشه با ترتیب ثابت (مثلاً بر اساس id).",
      "After `deadlock_timeout`, PostgreSQL checks the wait graph and aborts a victim; the app should retry. Prevent it by always locking rows in a consistent order (e.g. by id).",
    ],
  },
  {
    id: "db-m-optimistic-locking",
    level: "middle",
    tags: ["locking", "concurrency"],
    q: [
      "optimistic locking با ستون `version` معمولاً چطور پیاده‌سازی می‌شود؟",
      "How is optimistic locking with a `version` column typically implemented?",
    ],
    options: [
      ["`UPDATE ... SET version = version + 1 WHERE id = ? AND version = ?` و بررسی تعداد سطرهای تحت تأثیر", "`UPDATE ... SET version = version + 1 WHERE id = ? AND version = ?` and check the affected row count"],
      ["`SELECT ... FOR UPDATE` قبل از هر خواندن", "`SELECT ... FOR UPDATE` before every read"],
      ["قفل جدول در ابتدای هر request", "Locking the table at the start of every request"],
      ["استفاده از isolation level Read Uncommitted", "Using the Read Uncommitted isolation level"],
    ],
    a: [
      "اگر کسی دیگر در این فاصله version را عوض کرده باشد، update صفر سطر تغییر می‌دهد و اپلیکیشن conflict را گزارش یا retry می‌کند. برای سناریوهای کم‌تداخل و فرم‌های طولانی بهتر از قفل pessimistic است.",
      "If someone else changed the version meanwhile, the update affects zero rows and the app reports a conflict or retries. It beats pessimistic locks for low-contention cases and long-lived forms.",
    ],
  },
  {
    id: "db-m-composite-index-leftmost",
    level: "middle",
    tags: ["indexes"],
    q: [
      "با B-tree index روی `(last_name, first_name)`، کدام کوئری نمی‌تواند به‌طور مؤثر از آن استفاده کند؟",
      "With a B-tree index on `(last_name, first_name)`, which query can't use it efficiently?",
    ],
    options: [
      ["`WHERE first_name = 'Sara'`", "`WHERE first_name = 'Sara'`"],
      ["`WHERE last_name = 'Ahmadi'`", "`WHERE last_name = 'Ahmadi'`"],
      ["`WHERE last_name = 'Ahmadi' AND first_name = 'Sara'`", "`WHERE last_name = 'Ahmadi' AND first_name = 'Sara'`"],
      ["`WHERE last_name = 'Ahmadi' ORDER BY first_name`", "`WHERE last_name = 'Ahmadi' ORDER BY first_name`"],
    ],
    a: [
      "index ترکیبی ابتدا بر اساس ستون اول مرتب است (قاعده leftmost prefix)، پس فیلتر فقط روی ستون دوم نقطه شروعی ندارد. حداکثر یک full index scan انجام می‌شود که معمولاً ارزشی ندارد.",
      "A composite index is sorted by its first column first (the leftmost prefix rule), so filtering only on the second column has no entry point. At best a full index scan happens, rarely worthwhile.",
    ],
  },
  {
    id: "db-m-composite-index-order",
    level: "middle",
    tags: ["indexes"],
    q: [
      "برای کوئری `WHERE status = 'active' AND created_at > now() - interval '7 days'`، کدام index ترکیبی بهتر است؟",
      "For `WHERE status = 'active' AND created_at > now() - interval '7 days'`, which composite index is better?",
    ],
    options: [
      ["`(status, created_at)`: ستون برابری اول، ستون بازه دوم", "`(status, created_at)`: equality column first, range column second"],
      ["`(created_at, status)`: ستون بازه اول", "`(created_at, status)`: range column first"],
      ["دو index جدا همیشه بهتر از index ترکیبی است", "Two separate indexes are always better than a composite one"],
      ["ترتیب ستون‌ها در index ترکیبی اهمیتی ندارد", "Column order in a composite index doesn't matter"],
    ],
    a: [
      "با `(status, created_at)` دیتابیس مستقیم به بخش `active` می‌رود و یک بازه پیوسته از تاریخ‌ها را می‌خواند. اگر بازه اول باشد، ستون دوم فقط می‌تواند به‌عنوان فیلتر داخل اسکن بازه استفاده شود.",
      "With `(status, created_at)`, the database jumps to the `active` section and reads one contiguous date range. If the range column is first, the second column can only filter within the range scan.",
    ],
  },
  {
    id: "db-m-covering-index",
    level: "middle",
    tags: ["indexes", "performance"],
    q: [
      "covering index (مثلاً `CREATE INDEX ON orders(user_id) INCLUDE (total)`) چه مزیتی دارد؟",
      "What does a covering index (e.g. `CREATE INDEX ON orders(user_id) INCLUDE (total)`) provide?",
    ],
    options: [
      ["امکان index-only scan بدون مراجعه به جدول اصلی برای ستون‌های لازم", "Enables an index-only scan without visiting the table for needed columns"],
      ["تضمین یکتایی `total`", "Guarantees `total` is unique"],
      ["امکان جستجو با `WHERE total > 100` با همان کارایی ستون کلیدی", "Lets `WHERE total > 100` search as efficiently as a key column"],
      ["کاهش هزینه نوشتن در جدول", "Reduces write cost on the table"],
    ],
    a: [
      "وقتی همه ستون‌های لازم در index باشند، PostgreSQL می‌تواند index-only scan انجام دهد (به شرط به‌روز بودن visibility map). ستون‌های `INCLUDE` در ساختار جستجوی B-tree نیستند و فقط payload هستند.",
      "When all needed columns are in the index, PostgreSQL can do an index-only scan (if the visibility map is up to date). `INCLUDE` columns aren't part of the B-tree search key; they're just payload.",
    ],
  },
  {
    id: "db-m-partial-index",
    level: "middle",
    tags: ["indexes"],
    q: [
      "partial index مثل `CREATE INDEX ON orders(created_at) WHERE status = 'pending'` چه زمانی مفید است؟",
      "When is a partial index like `CREATE INDEX ON orders(created_at) WHERE status = 'pending'` useful?",
    ],
    options: [
      ["وقتی کوئری‌ها اغلب فقط زیرمجموعه کوچکی از سطرها (مثلاً pending) را هدف می‌گیرند", "When queries usually target a small subset of rows (e.g. pending ones)"],
      ["وقتی بخواهید index فقط بخشی از ستون‌ها را پوشش دهد", "When you want the index to cover only some columns"],
      ["برای همه کوئری‌های روی `orders` بدون توجه به شرط", "For all queries on `orders` regardless of condition"],
      ["فقط برای جدول‌های partitioned", "Only for partitioned tables"],
    ],
    a: [
      "partial index فقط سطرهای منطبق با شرط را نگه می‌دارد، پس کوچک‌تر و سریع‌تر است و نوشتن کمتری دارد. planner فقط وقتی از آن استفاده می‌کند که `WHERE` کوئری شرط index را نتیجه دهد.",
      "A partial index only stores rows matching its predicate, so it's smaller, faster, and cheaper to maintain. The planner uses it only when the query's `WHERE` implies the index predicate.",
    ],
  },
  {
    id: "db-m-function-on-column",
    level: "middle",
    tags: ["indexes", "performance"],
    q: [
      "با index روی `email`، چرا `WHERE LOWER(email) = 'a@b.com'` از index استفاده نمی‌کند؟",
      "With an index on `email`, why doesn't `WHERE LOWER(email) = 'a@b.com'` use it?",
    ],
    options: [
      ["index روی مقدار خام ساخته شده؛ برای این کوئری expression index روی `LOWER(email)` لازم است", "The index stores raw values; this query needs an expression index on `LOWER(email)`"],
      ["`LOWER` در `WHERE` مجاز نیست", "`LOWER` isn't allowed in `WHERE`"],
      ["B-tree با رشته کار نمی‌کند", "B-tree doesn't work with strings"],
      ["باید به‌جای آن `LIKE` نوشت", "You must use `LIKE` instead"],
    ],
    a: [
      "اعمال تابع روی ستون باعث می‌شود index ساده قابل استفاده نباشد. `CREATE INDEX ON users (LOWER(email))` یا نوع `citext` این مشکل را حل می‌کند.",
      "Wrapping the column in a function makes a plain index unusable. `CREATE INDEX ON users (LOWER(email))` or the `citext` type solves it.",
    ],
  },
  {
    id: "db-m-low-selectivity",
    level: "middle",
    tags: ["indexes", "selectivity"],
    q: [
      "چرا planner ممکن است index روی ستون `is_active` را نادیده بگیرد وقتی ۹۵٪ سطرها `true` هستند؟",
      "Why might the planner ignore an index on `is_active` when 95% of rows are `true`?",
    ],
    options: [
      ["selectivity پایین است و seq scan برای خواندن بیشتر جدول ارزان‌تر است", "Selectivity is low, and a seq scan is cheaper when reading most of the table"],
      ["index روی boolean پشتیبانی نمی‌شود", "Indexes on booleans aren't supported"],
      ["index خراب شده و باید `REINDEX` شود", "The index is corrupted and needs `REINDEX`"],
      ["planner هرگز برای `WHERE` از index استفاده نمی‌کند", "The planner never uses indexes for `WHERE`"],
    ],
    a: [
      "دسترسی تصادفی index به ازای هر سطر گران است؛ وقتی بخش بزرگی از جدول برگردانده می‌شود، خواندن ترتیبی سریع‌تر است. برای سطرهای نادر (`false`) یک partial index بهتر است.",
      "Random index access per row is expensive; when returning a large share of the table, sequential reads win. For the rare `false` rows, a partial index works better.",
    ],
  },
  {
    id: "db-m-explain-vs-analyze",
    level: "middle",
    tags: ["explain", "performance"],
    q: [
      "تفاوت `EXPLAIN` و `EXPLAIN ANALYZE` چیست؟",
      "What is the difference between `EXPLAIN` and `EXPLAIN ANALYZE`?",
    ],
    options: [
      ["`EXPLAIN` فقط plan تخمینی را نشان می‌دهد؛ `EXPLAIN ANALYZE` کوئری را واقعاً اجرا و زمان و تعداد سطر واقعی را گزارش می‌کند", "`EXPLAIN` shows the estimated plan; `EXPLAIN ANALYZE` actually runs the query and reports real timings and row counts"],
      ["`EXPLAIN ANALYZE` فقط آمار جدول را به‌روز می‌کند", "`EXPLAIN ANALYZE` only refreshes table statistics"],
      ["`EXPLAIN` کوئری را اجرا می‌کند ولی نتیجه را نشان نمی‌دهد", "`EXPLAIN` runs the query but hides the result"],
      ["تفاوتی ندارند؛ فقط فرمت خروجی متفاوت است", "No difference; only the output format differs"],
    ],
    a: [
      "چون `EXPLAIN ANALYZE` کوئری را اجرا می‌کند، برای `UPDATE`/`DELETE` آن را داخل `BEGIN ... ROLLBACK` بزنید. مقایسه rows تخمینی با واقعی، آمار کهنه را آشکار می‌کند.",
      "Since `EXPLAIN ANALYZE` executes the query, wrap `UPDATE`/`DELETE` in `BEGIN ... ROLLBACK`. Comparing estimated vs actual rows reveals stale statistics.",
    ],
  },
  {
    id: "db-m-bad-estimates",
    level: "middle",
    tags: ["explain", "statistics"],
    q: [
      "در `EXPLAIN ANALYZE` یک گره `rows=10` تخمینی ولی `rows=500000` واقعی دارد. محتمل‌ترین اقدام اول چیست؟",
      "In `EXPLAIN ANALYZE`, a node estimates `rows=10` but actually returns `rows=500000`. What's the most likely first step?",
    ],
    options: [
      ["اجرای `ANALYZE` روی جدول برای به‌روز کردن آمار", "Run `ANALYZE` on the table to refresh statistics"],
      ["حذف همه indexها", "Drop all indexes"],
      ["افزایش `max_connections`", "Increase `max_connections`"],
      ["تبدیل جدول به unlogged", "Convert the table to unlogged"],
    ],
    a: [
      "تخمین غلط planner را به انتخاب‌های بد مثل nested loop روی میلیون‌ها سطر می‌کشاند. `ANALYZE` آمار را تازه می‌کند؛ برای ستون‌های همبسته `CREATE STATISTICS` و برای توزیع نامتوازن افزایش `statistics target` هم کمک می‌کند.",
      "Bad estimates lead the planner to poor choices like nested loops over millions of rows. `ANALYZE` refreshes stats; `CREATE STATISTICS` helps correlated columns, and a higher statistics target helps skewed data.",
    ],
  },
  {
    id: "db-m-seq-vs-index-scan",
    level: "middle",
    tags: ["explain", "indexes"],
    q: [
      "Bitmap Heap Scan در plan PostgreSQL چه زمانی معمولاً انتخاب می‌شود؟",
      "When does PostgreSQL usually choose a Bitmap Heap Scan?",
    ],
    options: [
      ["وقتی تعداد سطرها برای index scan زیاد ولی برای seq scan کم است، یا چند index با هم ترکیب می‌شوند", "When too many rows for an index scan but too few for a seq scan, or when combining several indexes"],
      ["فقط برای جدول‌هایی با کمتر از ۱۰۰ سطر", "Only for tables with fewer than 100 rows"],
      ["وقتی هیچ indexی وجود ندارد", "When no index exists"],
      ["فقط برای ستون‌های boolean", "Only for boolean columns"],
    ],
    a: [
      "Bitmap scan ابتدا موقعیت سطرها را از index در یک bitmap جمع می‌کند و سپس صفحات را به ترتیب فیزیکی می‌خواند، که دسترسی تصادفی را کم می‌کند. با `BitmapAnd`/`BitmapOr` چند index ترکیب می‌شوند.",
      "A bitmap scan first collects row locations from the index into a bitmap, then reads pages in physical order, reducing random I/O. `BitmapAnd`/`BitmapOr` combine multiple indexes.",
    ],
  },
  {
    id: "db-m-orm-eager-loading",
    level: "middle",
    tags: ["orm", "performance"],
    q: [
      "در یک ORM، حلقه روی ۵۰ پست و دسترسی به `post.author` در هر تکرار ۵۱ کوئری تولید می‌کند. راه حل استاندارد چیست؟",
      "In an ORM, looping over 50 posts and accessing `post.author` each iteration generates 51 queries. What's the standard fix?",
    ],
    options: [
      ["eager loading (مثل `include`/`joinedload`/`with`) برای بارگذاری نویسنده‌ها در یک یا دو کوئری", "Eager loading (e.g. `include`/`joinedload`/`with`) to load authors in one or two queries"],
      ["افزایش اندازه connection pool", "Increase the connection pool size"],
      ["کش کردن هر پست جداگانه در Redis", "Cache each post separately in Redis"],
      ["اضافه کردن index روی `posts.title`", "Add an index on `posts.title`"],
    ],
    a: [
      "lazy loading به ازای هر دسترسی یک کوئری می‌زند. eager loading با join یا `WHERE id IN (...)` همه را یکجا می‌آورد. ابزارهایی مثل logging کوئری یا DataLoader برای تشخیص و batching مفیدند.",
      "Lazy loading fires a query per access. Eager loading fetches everything at once via a join or `WHERE id IN (...)`. Query logging or DataLoader help detect and batch these.",
    ],
  },
  {
    id: "db-m-orm-select-star",
    level: "middle",
    tags: ["orm", "performance"],
    q: [
      "کدام یک از مشکلات رایج ORMها در عملکرد است؟",
      "Which is a common ORM performance pitfall?",
    ],
    options: [
      ["بارگذاری همه ستون‌ها و سطرها در حافظه وقتی فقط یک شمارش یا چند فیلد لازم است", "Loading all columns and rows into memory when only a count or a few fields are needed"],
      ["استفاده خودکار از parameterized query", "Automatic use of parameterized queries"],
      ["پشتیبانی از transaction", "Supporting transactions"],
      ["تولید migration از روی مدل‌ها", "Generating migrations from models"],
    ],
    a: [
      "مثلاً `len(User.objects.all())` همه سطرها را می‌آورد در حالی که `COUNT(*)` در دیتابیس کافی است. انتخاب فقط ستون‌های لازم و انجام aggregate در SQL، حافظه و ترافیک شبکه را کم می‌کند.",
      "E.g. `len(User.objects.all())` fetches every row when a database `COUNT(*)` would do. Selecting only needed columns and aggregating in SQL cuts memory and network traffic.",
    ],
  },
  {
    id: "db-m-connection-pooling",
    level: "middle",
    tags: ["connection-pooling"],
    q: [
      "چرا باز کردن یک connection جدید PostgreSQL برای هر request HTTP ایده بدی است؟",
      "Why is opening a new PostgreSQL connection per HTTP request a bad idea?",
    ],
    options: [
      ["هر connection یک process جدا با هزینه راه‌اندازی و حافظه است و تعدادشان محدود است", "Each connection is a separate process with setup and memory cost, and their count is limited"],
      ["PostgreSQL فقط یک connection هم‌زمان را می‌پذیرد", "PostgreSQL accepts only one concurrent connection"],
      ["connectionهای جدید داده‌های commit‌نشده را می‌بینند", "New connections see uncommitted data"],
      ["این کار باعث SQL injection می‌شود", "It causes SQL injection"],
    ],
    a: [
      "PostgreSQL برای هر connection یک backend process می‌سازد (handshake، TLS، auth، چند MB حافظه). connection pool اتصالات را بازاستفاده می‌کند و تعداد کل را زیر `max_connections` نگه می‌دارد.",
      "PostgreSQL forks a backend process per connection (handshake, TLS, auth, several MB of memory). A pool reuses connections and keeps the total under `max_connections`.",
    ],
  },
  {
    id: "db-m-pgbouncer-transaction-mode",
    level: "middle",
    tags: ["connection-pooling", "pgbouncer"],
    q: [
      "در PgBouncer با `pool_mode = transaction`، کدام قابلیت session-level به‌طور سنتی مشکل‌ساز است؟",
      "In PgBouncer with `pool_mode = transaction`, which session-level feature is traditionally problematic?",
    ],
    options: [
      ["`SET` در سطح session، advisory lockهای session و `LISTEN`", "Session-level `SET`, session advisory locks, and `LISTEN`"],
      ["transactionهای چند statement با `BEGIN`/`COMMIT`", "Multi-statement transactions with `BEGIN`/`COMMIT`"],
      ["کوئری‌های `SELECT` ساده", "Plain `SELECT` queries"],
      ["foreign key constraintها", "Foreign key constraints"],
    ],
    a: [
      "در transaction mode هر transaction ممکن است روی connection سرور متفاوتی اجرا شود، پس state باقی‌مانده در session به client دیگری نشت می‌کند یا گم می‌شود. prepared statementها هم تا PgBouncer 1.21 پشتیبانی نمی‌شدند.",
      "In transaction mode each transaction may run on a different server connection, so session state leaks to other clients or gets lost. Prepared statements also weren't supported until PgBouncer 1.21.",
    ],
  },
  {
    id: "db-m-pool-size",
    level: "middle",
    tags: ["connection-pooling", "performance"],
    q: [
      "سرویسی ۲۰ instance دارد و هر کدام pool با اندازه ۵۰. دیتابیس `max_connections = 200` دارد. مشکل چیست؟",
      "A service has 20 instances, each with a pool of 50. The database has `max_connections = 200`. What's the problem?",
    ],
    options: [
      ["تا ۱۰۰۰ connection درخواست می‌شود و از سقف دیتابیس عبور می‌کند", "Up to 1000 connections are requested, exceeding the database limit"],
      ["هیچ مشکلی ندارد چون poolها خودکار هماهنگ می‌شوند", "No problem; pools coordinate automatically"],
      ["poolهای کوچک‌تر همیشه کندترند", "Smaller pools are always slower"],
      ["`max_connections` فقط روی replicaها اعمال می‌شود", "`max_connections` only applies to replicas"],
    ],
    a: [
      "اندازه کل pool برابر تعداد instance ضرب در اندازه هر pool است. poolهای کوچک‌تر یا یک pooler مرکزی مثل PgBouncer لازم است؛ تعداد connection فعال بهینه معمولاً نزدیک به چند برابر هسته‌های CPU است.",
      "Total pool size is instances times pool size. Use smaller pools or a central pooler like PgBouncer; the optimal number of active connections is usually a small multiple of CPU cores.",
    ],
  },
  {
    id: "db-m-offset-pagination",
    level: "middle",
    tags: ["pagination", "performance"],
    q: [
      "چرا `ORDER BY id LIMIT 20 OFFSET 1000000` کند است؟",
      "Why is `ORDER BY id LIMIT 20 OFFSET 1000000` slow?",
    ],
    options: [
      ["دیتابیس باید یک میلیون سطر را بخواند و دور بریزد تا به ۲۰ سطر برسد", "The database must read and discard a million rows to reach the 20"],
      ["`OFFSET` index را غیرفعال می‌کند و کل جدول sort می‌شود", "`OFFSET` disables indexes and sorts the entire table"],
      ["`LIMIT` بیش از ۱۰ پشتیبانی نمی‌شود", "`LIMIT` over 10 isn't supported"],
      ["عدد بزرگ OFFSET باعث overflow می‌شود", "A large OFFSET causes an overflow"],
    ],
    a: [
      "هزینه `OFFSET` با عمق صفحه خطی رشد می‌کند. keyset pagination مثل `WHERE id > :last_id ORDER BY id LIMIT 20` مستقیماً از index به نقطه درست می‌رود و درج هم‌زمان باعث تکرار یا جاافتادن سطر نمی‌شود.",
      "`OFFSET` cost grows linearly with page depth. Keyset pagination like `WHERE id > :last_id ORDER BY id LIMIT 20` seeks directly via the index and isn't disrupted by concurrent inserts.",
    ],
  },
  {
    id: "db-m-keyset-tiebreaker",
    level: "middle",
    tags: ["pagination"],
    q: [
      "در keyset pagination بر اساس `created_at`، چرا باید `id` را هم به‌عنوان tiebreaker اضافه کرد؟",
      "In keyset pagination by `created_at`, why add `id` as a tiebreaker?",
    ],
    options: [
      ["چون چند سطر می‌توانند `created_at` یکسان داشته باشند و بدون آن سطرها تکرار یا جا می‌افتند", "Several rows can share a `created_at`, and without it rows get duplicated or skipped"],
      ["چون `created_at` قابل index نیست", "Because `created_at` can't be indexed"],
      ["برای اینکه `LIMIT` کار کند", "So that `LIMIT` works"],
      ["چون مقایسه timestampها در SQL مجاز نیست", "Because comparing timestamps isn't allowed in SQL"],
    ],
    a: [
      "cursor باید یکتا باشد: `WHERE (created_at, id) < (:ts, :id) ORDER BY created_at DESC, id DESC`. مقایسه row value در PostgreSQL می‌تواند از index روی `(created_at, id)` استفاده کند.",
      "The cursor must be unique: `WHERE (created_at, id) < (:ts, :id) ORDER BY created_at DESC, id DESC`. PostgreSQL row-value comparison can use an index on `(created_at, id)`.",
    ],
  },
  {
    id: "db-m-soft-delete",
    level: "middle",
    tags: ["schema-design", "soft-delete"],
    q: [
      "با soft delete (ستون `deleted_at`)، کدام مشکل رایج پیش می‌آید؟",
      "With soft delete (a `deleted_at` column), which common problem arises?",
    ],
    options: [
      ["unique constraint روی `email` مانع ثبت‌نام دوباره با ایمیل یک کاربر حذف‌شده می‌شود", "A unique constraint on `email` blocks re-registering with a deleted user's email"],
      ["سطرها واقعاً از دیسک حذف می‌شوند", "Rows are physically removed from disk"],
      ["foreign keyها خودکار غیرفعال می‌شوند", "Foreign keys are automatically disabled"],
      ["کوئری‌ها دیگر نیاز به `WHERE` ندارند", "Queries no longer need `WHERE`"],
    ],
    a: [
      "راه حل partial unique index است: `CREATE UNIQUE INDEX ON users(email) WHERE deleted_at IS NULL`. همچنین باید همه کوئری‌ها فیلتر `deleted_at IS NULL` داشته باشند و جدول با داده مرده بزرگ می‌شود.",
      "Use a partial unique index: `CREATE UNIQUE INDEX ON users(email) WHERE deleted_at IS NULL`. Also every query needs `deleted_at IS NULL`, and the table grows with dead data.",
    ],
  },
  {
    id: "db-m-uuid-vs-serial",
    level: "middle",
    tags: ["keys", "uuid"],
    q: [
      "یک مزیت و یک عیب UUID v4 به‌عنوان primary key در مقایسه با auto-increment چیست؟",
      "What's one advantage and one drawback of UUID v4 primary keys versus auto-increment?",
    ],
    options: [
      ["قابل تولید در client و غیرقابل حدس است، ولی تصادفی بودنش باعث درج پراکنده در B-tree و index بزرگ‌تر می‌شود", "Generated client-side and unguessable, but randomness causes scattered B-tree inserts and larger indexes"],
      ["کوچک‌تر از `bigint` است، ولی قابل index نیست", "Smaller than `bigint`, but can't be indexed"],
      ["ترتیب زمانی دارد، ولی ممکن است تکراری شود", "Time-ordered, but may collide"],
      ["سریع‌تر درج می‌شود، ولی در توزیع‌شده کار نمی‌کند", "Faster to insert, but doesn't work in distributed systems"],
    ],
    a: [
      "UUID شانزده بایت است (در برابر ۸ بایت `bigint`) و v4 کاملاً تصادفی است، پس صفحات index پراکنده نوشته می‌شوند و cache locality بد است. UUID v7 که ترتیب زمانی دارد این مشکل را تا حد زیادی حل می‌کند.",
      "A UUID is 16 bytes (vs 8 for `bigint`) and v4 is fully random, so index pages are written scattershot with poor cache locality. Time-ordered UUID v7 largely fixes this.",
    ],
  },
  {
    id: "db-m-add-column-default",
    level: "middle",
    tags: ["migrations"],
    q: [
      "در PostgreSQL 11 به بعد، `ALTER TABLE big ADD COLUMN flag boolean NOT NULL DEFAULT false` روی جدول بزرگ چگونه است؟",
      "In PostgreSQL 11+, how does `ALTER TABLE big ADD COLUMN flag boolean NOT NULL DEFAULT false` behave on a large table?",
    ],
    options: [
      ["سریع است چون default ثابت در metadata ذخیره می‌شود و جدول بازنویسی نمی‌شود", "Fast, since the constant default is stored in metadata without rewriting the table"],
      ["کل جدول را بازنویسی می‌کند و ساعت‌ها قفل نگه می‌دارد", "Rewrites the whole table, holding a lock for hours"],
      ["همیشه خطا می‌دهد چون `NOT NULL` با `DEFAULT` ناسازگار است", "Always fails because `NOT NULL` conflicts with `DEFAULT`"],
      ["سطرهای موجود `NULL` می‌گیرند", "Existing rows get `NULL`"],
    ],
    a: [
      "از نسخه 11، default غیر volatile بدون rewrite اضافه می‌شود. ولی default volatile مثل `random()` یا `clock_timestamp()` هنوز rewrite می‌کند، و `ACCESS EXCLUSIVE` کوتاه همچنان لازم است.",
      "Since version 11, a non-volatile default is added without a rewrite. A volatile default like `random()` or `clock_timestamp()` still rewrites, and a brief `ACCESS EXCLUSIVE` lock is still needed.",
    ],
  },
  {
    id: "db-m-create-index-concurrently",
    level: "middle",
    tags: ["migrations", "indexes"],
    q: [
      "چرا در production از `CREATE INDEX CONCURRENTLY` استفاده می‌شود؟",
      "Why use `CREATE INDEX CONCURRENTLY` in production?",
    ],
    options: [
      ["تا index بدون block کردن نوشتن‌ها روی جدول ساخته شود", "To build the index without blocking writes on the table"],
      ["چون سریع‌تر از `CREATE INDEX` معمولی است", "Because it's faster than a normal `CREATE INDEX`"],
      ["تا index روی همه replicaها هم‌زمان ساخته شود", "To build the index on all replicas simultaneously"],
      ["چون داخل transaction اجرا می‌شود و قابل rollback است", "Because it runs inside a transaction and can be rolled back"],
    ],
    a: [
      "`CREATE INDEX` معمولی قفل `SHARE` می‌گیرد و `INSERT`/`UPDATE`/`DELETE` را block می‌کند. نسخه `CONCURRENTLY` کندتر است، داخل transaction اجرا نمی‌شود و در صورت شکست index نامعتبر باقی می‌گذارد که باید حذف شود.",
      "A normal `CREATE INDEX` takes a `SHARE` lock that blocks `INSERT`/`UPDATE`/`DELETE`. `CONCURRENTLY` is slower, can't run in a transaction, and leaves an invalid index on failure that must be dropped.",
    ],
  },
  {
    id: "db-m-read-replica-lag",
    level: "middle",
    tags: ["replication"],
    q: [
      "کاربر پروفایلش را update می‌کند و بلافاصله صفحه از read replica خوانده می‌شود و مقدار قدیمی نمایش داده می‌شود. علت چیست؟",
      "A user updates their profile, the page immediately reads from a read replica, and shows the old value. Why?",
    ],
    options: [
      ["replication lag در replication غیرهمگام", "Replication lag with asynchronous replication"],
      ["transaction روی primary rollback شده است", "The transaction was rolled back on the primary"],
      ["replica فقط داده‌های قدیمی‌تر از یک روز را دارد", "Replicas only hold data older than one day"],
      ["کش مرورگر کاربر", "The user's browser cache"],
    ],
    a: [
      "در replication غیرهمگام replica با کمی تأخیر به primary می‌رسد. برای read-your-writes، خواندن‌های بلافاصله بعد از نوشتن را (مثلاً برای چند ثانیه یا تا رسیدن LSN) به primary بفرستید.",
      "With async replication, replicas trail the primary slightly. For read-your-writes, route reads right after a write to the primary (e.g. for a few seconds or until the replica reaches the LSN).",
    ],
  },
  {
    id: "db-m-partitioning",
    level: "middle",
    tags: ["partitioning"],
    q: [
      "table partitioning بر اساس تاریخ (مثلاً یک partition در ماه) برای جدول `events` چه مزیتی دارد؟",
      "What does partitioning an `events` table by date (e.g. one partition per month) provide?",
    ],
    options: [
      ["partition pruning در کوئری‌های بازه زمانی و حذف سریع داده قدیمی با `DROP`/`DETACH`", "Partition pruning for time-range queries and fast removal of old data via `DROP`/`DETACH`"],
      ["توزیع خودکار داده روی چند سرور", "Automatic distribution of data across multiple servers"],
      ["حذف نیاز به index", "Eliminates the need for indexes"],
      ["تضمین یکتایی سراسری روی هر ستونی", "Guarantees global uniqueness on any column"],
    ],
    a: [
      "partitioning داده را روی یک سرور به چند جدول فیزیکی تقسیم می‌کند؛ با partition pruning فقط partitionهای مرتبط اسکن می‌شوند. unique constraint باید شامل partition key باشد.",
      "Partitioning splits data into several physical tables on one server; pruning scans only relevant partitions. Unique constraints must include the partition key.",
    ],
  },
  {
    id: "db-m-vacuum-basics",
    level: "middle",
    tags: ["postgres", "vacuum"],
    q: [
      "چرا PostgreSQL به `VACUUM` نیاز دارد؟",
      "Why does PostgreSQL need `VACUUM`?",
    ],
    options: [
      ["چون `UPDATE` و `DELETE` نسخه‌های قدیمی سطر (dead tuple) باقی می‌گذارند که باید بازیافت شوند", "Because `UPDATE` and `DELETE` leave old row versions (dead tuples) that must be reclaimed"],
      ["برای فشرده‌سازی فایل WAL", "To compress the WAL file"],
      ["برای ساخت دوباره همه indexها", "To rebuild all indexes"],
      ["برای پاک کردن connectionهای بیکار", "To close idle connections"],
    ],
    a: [
      "در MVCC، `UPDATE` نسخه جدیدی از سطر می‌نویسد و نسخه قدیمی تا وقتی هیچ transactionی به آن نیاز ندارد می‌ماند. `VACUUM` این فضا را قابل استفاده مجدد می‌کند؛ autovacuum این کار را خودکار انجام می‌دهد.",
      "Under MVCC, `UPDATE` writes a new row version and the old one stays until no transaction needs it. `VACUUM` makes that space reusable; autovacuum does this automatically.",
    ],
  },
  {
    id: "db-m-count-performance",
    level: "middle",
    tags: ["performance", "postgres"],
    q: [
      "چرا `SELECT COUNT(*) FROM big_table` در PostgreSQL روی جدول خیلی بزرگ کند است؟",
      "Why is `SELECT COUNT(*) FROM big_table` slow on a very large PostgreSQL table?",
    ],
    options: [
      ["به‌خاطر MVCC تعداد دقیق برای هر snapshot متفاوت است و باید سطرها (یا index) اسکن شوند", "Under MVCC the exact count differs per snapshot, so rows (or an index) must be scanned"],
      ["چون `COUNT(*)` همه ستون‌ها را از دیسک می‌خواند و decode می‌کند", "Because `COUNT(*)` reads and decodes every column from disk"],
      ["چون PostgreSQL تعداد سطرها را هرگز تخمین نمی‌زند", "Because PostgreSQL never estimates row counts"],
      ["چون `COUNT(*)` جدول را قفل می‌کند", "Because `COUNT(*)` locks the table"],
    ],
    a: [
      "هیچ شمارنده سراسری وجود ندارد چون transactionهای مختلف سطرهای متفاوتی می‌بینند. اگر تقریب کافی است `reltuples` از `pg_class` یا یک جدول شمارنده جداگانه گزینه‌های رایج هستند.",
      "There's no global counter because different transactions see different rows. If an approximation suffices, `reltuples` from `pg_class` or a separate counter table are common options.",
    ],
  },
  {
    id: "db-m-check-constraint-not-valid",
    level: "middle",
    tags: ["migrations", "constraints"],
    q: [
      "برای اضافه کردن foreign key به جدول بزرگ در production بدون قفل طولانی، روش رایج چیست؟",
      "What's the common way to add a foreign key to a large production table without a long lock?",
    ],
    options: [
      ["ابتدا با `NOT VALID` اضافه و سپس جداگانه `VALIDATE CONSTRAINT` اجرا شود", "Add it with `NOT VALID`, then run `VALIDATE CONSTRAINT` separately"],
      ["جدول را کپی، constraint را اضافه و سپس جایگزین کنید", "Copy the table, add the constraint, then swap"],
      ["constraint را فقط در کد اپلیکیشن چک کنید", "Only check the constraint in application code"],
      ["`LOCK TABLE` و اضافه کردن مستقیم constraint در ساعت کم‌ترافیک", "`LOCK TABLE` and add the constraint directly in off-peak hours"],
    ],
    a: [
      "`NOT VALID` constraint را فقط برای سطرهای جدید اعمال می‌کند و نیازی به اسکن کل جدول با قفل سنگین ندارد. `VALIDATE CONSTRAINT` سپس داده موجود را با قفل سبک‌تری که نوشتن را block نمی‌کند بررسی می‌کند.",
      "`NOT VALID` enforces the constraint for new rows only, skipping a full scan under a heavy lock. `VALIDATE CONSTRAINT` then checks existing data under a lighter lock that doesn't block writes.",
    ],
  },
]);
