import { build } from "../build";

export const databasesJunior = build("databases", [
  {
    id: "db-j-primary-key",
    level: "junior",
    tags: ["keys", "constraints"],
    q: [
      "کدام ویژگی‌ها برای یک primary key همیشه برقرار است؟",
      "Which properties always hold for a primary key?",
    ],
    options: [
      ["یکتا است و نمی‌تواند `NULL` باشد", "It is unique and cannot be `NULL`"],
      ["یکتا است ولی می‌تواند `NULL` باشد", "It is unique but may be `NULL`"],
      ["حتماً باید یک عدد auto-increment باشد", "It must always be an auto-increment number"],
      ["هر جدول می‌تواند چند primary key مستقل داشته باشد", "A table may have several independent primary keys"],
    ],
    a: [
      "primary key هر سطر را به‌طور یکتا شناسایی می‌کند و ترکیب `UNIQUE` و `NOT NULL` است. هر جدول فقط یک primary key دارد، هرچند می‌تواند composite (چندستونی) باشد.",
      "A primary key uniquely identifies each row and combines `UNIQUE` and `NOT NULL`. A table has only one primary key, though it may be composite (multi-column).",
    ],
  },
  {
    id: "db-j-foreign-key",
    level: "junior",
    tags: ["keys", "constraints"],
    q: [
      "وظیفه اصلی یک foreign key چیست؟",
      "What is the main job of a foreign key?",
    ],
    options: [
      ["حفظ referential integrity با ارجاع به key جدول دیگر", "Enforce referential integrity by referencing another table's key"],
      ["سریع‌تر کردن خودکار همه کوئری‌ها", "Automatically speed up every query"],
      ["تضمین یکتا بودن مقدار ستون", "Guarantee the column value is unique"],
      ["رمزنگاری ستون‌های حساس", "Encrypt sensitive columns"],
    ],
    a: [
      "foreign key تضمین می‌کند مقدار ستون یا `NULL` است یا در key جدول مرجع وجود دارد. بنابراین نمی‌توان سفارشی با `user_id` ناموجود ثبت کرد.",
      "A foreign key ensures the column value is either `NULL` or exists in the referenced table's key. So you can't insert an order with a non-existent `user_id`.",
    ],
  },
  {
    id: "db-j-on-delete-cascade",
    level: "junior",
    tags: ["keys", "constraints"],
    q: [
      "اگر `orders.user_id` با `ON DELETE CASCADE` به `users.id` ارجاع دهد و یک user حذف شود، چه اتفاقی می‌افتد؟",
      "If `orders.user_id` references `users.id` with `ON DELETE CASCADE` and a user is deleted, what happens?",
    ],
    options: [
      ["سفارش‌های آن user هم خودکار حذف می‌شوند", "That user's orders are deleted automatically"],
      ["حذف user با خطا رد می‌شود", "Deleting the user fails with an error"],
      ["`user_id` سفارش‌ها `NULL` می‌شود", "The orders' `user_id` is set to `NULL`"],
      ["سفارش‌ها بدون تغییر و یتیم باقی می‌مانند", "The orders stay unchanged as orphans"],
    ],
    a: [
      "`CASCADE` حذف را به سطرهای فرزند منتقل می‌کند. رفتار `NULL` کردن مربوط به `ON DELETE SET NULL` و رد کردن حذف رفتار پیش‌فرض (`NO ACTION`/`RESTRICT`) است.",
      "`CASCADE` propagates the delete to child rows. Setting to `NULL` is `ON DELETE SET NULL`, and rejecting the delete is the default (`NO ACTION`/`RESTRICT`).",
    ],
  },
  {
    id: "db-j-unique-null",
    level: "junior",
    tags: ["constraints", "null"],
    q: [
      "در PostgreSQL، آیا یک ستون `UNIQUE` می‌تواند چند سطر با مقدار `NULL` داشته باشد؟",
      "In PostgreSQL, can a `UNIQUE` column contain multiple rows with `NULL`?",
    ],
    options: [
      ["بله، چون `NULL`ها با هم برابر حساب نمی‌شوند", "Yes, because `NULL`s are not considered equal to each other"],
      ["خیر، فقط یک `NULL` مجاز است", "No, only one `NULL` is allowed"],
      ["خیر، `UNIQUE` خودش `NOT NULL` را هم اعمال می‌کند", "No, `UNIQUE` implies `NOT NULL` as well"],
      ["فقط اگر ستون از نوع متنی باشد", "Only if the column is a text type"],
    ],
    a: [
      "در استاندارد SQL، `NULL` با `NULL` برابر نیست، پس چند `NULL` تکراری حساب نمی‌شوند. از PostgreSQL 15 می‌توان با `UNIQUE NULLS NOT DISTINCT` این رفتار را تغییر داد.",
      "In standard SQL, `NULL` isn't equal to `NULL`, so multiple `NULL`s aren't duplicates. Since PostgreSQL 15 you can change this with `UNIQUE NULLS NOT DISTINCT`.",
    ],
  },
  {
    id: "db-j-check-constraint",
    level: "junior",
    tags: ["constraints"],
    q: [
      "`CHECK (price >= 0)` روی یک جدول چه کاری انجام می‌دهد؟",
      "What does `CHECK (price >= 0)` on a table do?",
    ],
    options: [
      ["insert یا update با قیمت منفی را رد می‌کند", "Rejects inserts or updates with a negative price"],
      ["قیمت‌های منفی را خودکار صفر می‌کند", "Automatically converts negative prices to zero"],
      ["فقط هشدار می‌دهد ولی داده را ذخیره می‌کند", "Only warns but still stores the data"],
      ["کوئری‌های `WHERE price < 0` را سریع‌تر می‌کند", "Makes `WHERE price < 0` queries faster"],
    ],
    a: [
      "constraint از نوع `CHECK` شرطی است که هر سطر باید رعایت کند؛ اگر شرط `false` شود عملیات با خطا رد می‌شود. توجه: اگر نتیجه `NULL` باشد، شرط نقض‌شده حساب نمی‌شود.",
      "A `CHECK` constraint is a condition every row must satisfy; if it evaluates to `false` the statement fails. Note: if it evaluates to `NULL`, it is not considered violated.",
    ],
  },
  {
    id: "db-j-inner-join",
    level: "junior",
    tags: ["joins"],
    q: [
      "`INNER JOIN` بین `users` و `orders` روی `users.id = orders.user_id` چه سطرهایی برمی‌گرداند؟",
      "What rows does an `INNER JOIN` between `users` and `orders` on `users.id = orders.user_id` return?",
    ],
    options: [
      ["فقط userهایی که حداقل یک سفارش منطبق دارند", "Only users that have at least one matching order"],
      ["همه userها، حتی بدون سفارش", "All users, even those without orders"],
      ["همه سفارش‌ها و همه userها", "All orders and all users"],
      ["هر ترکیب ممکن از user و سفارش", "Every possible combination of user and order"],
    ],
    a: [
      "`INNER JOIN` فقط جفت‌سطرهایی را برمی‌گرداند که شرط join برایشان برقرار است. userهای بدون سفارش حذف می‌شوند و userی با چند سفارش چند بار تکرار می‌شود.",
      "`INNER JOIN` returns only row pairs that satisfy the join condition. Users without orders are dropped, and a user with several orders appears several times.",
    ],
  },
  {
    id: "db-j-left-join",
    level: "junior",
    tags: ["joins", "null"],
    q: [
      "در `users LEFT JOIN orders`، برای userی که هیچ سفارشی ندارد چه برگردانده می‌شود؟",
      "In `users LEFT JOIN orders`, what is returned for a user with no orders?",
    ],
    options: [
      ["یک سطر با ستون‌های `orders` برابر `NULL`", "One row with the `orders` columns set to `NULL`"],
      ["هیچ سطری برای آن user", "No row for that user"],
      ["یک سطر با ستون‌های `orders` برابر صفر یا رشته خالی", "One row with `orders` columns as zero or empty string"],
      ["خطای اجرای کوئری", "A query execution error"],
    ],
    a: [
      "`LEFT JOIN` همه سطرهای جدول چپ را نگه می‌دارد و اگر تطابقی در جدول راست نباشد ستون‌های آن را `NULL` می‌کند.",
      "`LEFT JOIN` keeps every row from the left table and fills the right table's columns with `NULL` when there is no match.",
    ],
  },
  {
    id: "db-j-anti-join",
    level: "junior",
    tags: ["joins", "null"],
    q: [
      "کدام کوئری userهایی را پیدا می‌کند که هیچ سفارشی ندارند؟",
      "Which query finds users that have no orders?",
    ],
    options: [
      ["`SELECT u.* FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.id IS NULL`", "`SELECT u.* FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.id IS NULL`"],
      ["`SELECT u.* FROM users u INNER JOIN orders o ON o.user_id = u.id WHERE o.id IS NULL`", "`SELECT u.* FROM users u INNER JOIN orders o ON o.user_id = u.id WHERE o.id IS NULL`"],
      ["`SELECT u.* FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.id = NULL`", "`SELECT u.* FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.id = NULL`"],
      ["`SELECT u.* FROM users u CROSS JOIN orders o WHERE o.user_id <> u.id`", "`SELECT u.* FROM users u CROSS JOIN orders o WHERE o.user_id <> u.id`"],
    ],
    a: [
      "الگوی anti-join با `LEFT JOIN` و `IS NULL` روی ستونی از جدول راست، سطرهای بدون تطابق را پیدا می‌کند. `= NULL` همیشه `NULL` (نه true) می‌دهد و `INNER JOIN` اصلاً سطر بدون تطابق ندارد.",
      "The anti-join pattern `LEFT JOIN` + `IS NULL` on a right-table column finds unmatched rows. `= NULL` always yields `NULL` (not true), and `INNER JOIN` never has unmatched rows.",
    ],
  },
  {
    id: "db-j-right-join",
    level: "junior",
    tags: ["joins"],
    q: [
      "`A RIGHT JOIN B` معادل کدام است؟",
      "`A RIGHT JOIN B` is equivalent to which?",
    ],
    options: [
      ["`B LEFT JOIN A`", "`B LEFT JOIN A`"],
      ["`A LEFT JOIN B`", "`A LEFT JOIN B`"],
      ["`A INNER JOIN B`", "`A INNER JOIN B`"],
      ["`A FULL JOIN B`", "`A FULL JOIN B`"],
    ],
    a: [
      "`RIGHT JOIN` همه سطرهای جدول راست را نگه می‌دارد، پس با جابه‌جا کردن جدول‌ها همان `LEFT JOIN` است. به همین دلیل بیشتر تیم‌ها فقط از `LEFT JOIN` استفاده می‌کنند.",
      "`RIGHT JOIN` keeps all rows of the right table, so swapping the tables gives a `LEFT JOIN`. That's why most teams just use `LEFT JOIN`.",
    ],
  },
  {
    id: "db-j-full-join",
    level: "junior",
    tags: ["joins"],
    q: [
      "`FULL OUTER JOIN` چه چیزی برمی‌گرداند؟",
      "What does a `FULL OUTER JOIN` return?",
    ],
    options: [
      ["سطرهای منطبق به‌علاوه سطرهای بدون تطابق هر دو طرف با `NULL`", "Matched rows plus unmatched rows from both sides padded with `NULL`"],
      ["فقط سطرهایی که در هر دو جدول تطابق دارند", "Only rows that match in both tables"],
      ["حاصل‌ضرب دکارتی دو جدول", "The Cartesian product of both tables"],
      ["فقط سطرهای بدون تطابق دو طرف", "Only the unmatched rows from both sides"],
    ],
    a: [
      "`FULL OUTER JOIN` ترکیب `LEFT` و `RIGHT` است: هیچ سطری از هیچ طرف حذف نمی‌شود و جای خالی با `NULL` پر می‌شود. MySQL آن را مستقیم پشتیبانی نمی‌کند و معمولاً با `UNION` شبیه‌سازی می‌شود.",
      "`FULL OUTER JOIN` combines `LEFT` and `RIGHT`: no row from either side is lost and gaps are filled with `NULL`. MySQL doesn't support it directly; it's usually emulated with `UNION`.",
    ],
  },
  {
    id: "db-j-cross-join",
    level: "junior",
    tags: ["joins"],
    q: [
      "اگر جدول `sizes` سه سطر و `colors` چهار سطر داشته باشد، `SELECT * FROM sizes CROSS JOIN colors` چند سطر برمی‌گرداند؟",
      "If `sizes` has 3 rows and `colors` has 4, how many rows does `SELECT * FROM sizes CROSS JOIN colors` return?",
    ],
    options: [
      ["12", "12"],
      ["7", "7"],
      ["4", "4"],
      ["3", "3"],
    ],
    a: [
      "`CROSS JOIN` حاصل‌ضرب دکارتی است و هر سطر یک جدول را با همه سطرهای جدول دیگر جفت می‌کند: `3 × 4 = 12`.",
      "`CROSS JOIN` is a Cartesian product, pairing each row of one table with every row of the other: `3 × 4 = 12`.",
    ],
  },
  {
    id: "db-j-self-join",
    level: "junior",
    tags: ["joins"],
    q: [
      "جدول `employees` ستون `manager_id` دارد که به `id` همان جدول اشاره می‌کند. برای نمایش نام هر کارمند کنار نام مدیرش چه نیاز است؟",
      "`employees` has `manager_id` pointing to `id` in the same table. What do you need to show each employee's name next to their manager's name?",
    ],
    options: [
      ["self join جدول با خودش با دو alias متفاوت", "A self join of the table with itself using two aliases"],
      ["یک `CROSS JOIN` با جدول دیگری", "A `CROSS JOIN` with another table"],
      ["فقط `GROUP BY manager_id`", "Just `GROUP BY manager_id`"],
      ["ساخت یک جدول جداگانه `managers` الزامی است", "Creating a separate `managers` table is mandatory"],
    ],
    a: [
      "در self join جدول با دو alias مثل `e` و `m` با خودش join می‌شود: `employees e LEFT JOIN employees m ON e.manager_id = m.id`. `LEFT` باعث می‌شود کارمندان بدون مدیر هم حذف نشوند.",
      "A self join joins the table to itself with two aliases like `e` and `m`: `employees e LEFT JOIN employees m ON e.manager_id = m.id`. `LEFT` keeps employees without a manager.",
    ],
  },
  {
    id: "db-j-where-vs-having",
    level: "junior",
    tags: ["aggregates", "group-by"],
    q: [
      "تفاوت اصلی `WHERE` و `HAVING` چیست؟",
      "What is the main difference between `WHERE` and `HAVING`?",
    ],
    options: [
      ["`WHERE` سطرها را قبل از گروه‌بندی و `HAVING` گروه‌ها را بعد از آن فیلتر می‌کند", "`WHERE` filters rows before grouping; `HAVING` filters groups after it"],
      ["`HAVING` همیشه سریع‌تر از `WHERE` است", "`HAVING` is always faster than `WHERE`"],
      ["`WHERE` فقط با aggregateها کار می‌کند", "`WHERE` only works with aggregates"],
      ["هیچ تفاوتی ندارند و قابل جایگزینی‌اند", "They are identical and interchangeable"],
    ],
    a: [
      "`WHERE` روی سطرهای منفرد قبل از `GROUP BY` اعمال می‌شود و نمی‌تواند از aggregateها استفاده کند. `HAVING` بعد از گروه‌بندی اجرا می‌شود و شرطی مثل `COUNT(*) > 5` را می‌پذیرد.",
      "`WHERE` applies to individual rows before `GROUP BY` and can't use aggregates. `HAVING` runs after grouping and accepts conditions like `COUNT(*) > 5`.",
    ],
  },
  {
    id: "db-j-where-aggregate-error",
    level: "junior",
    tags: ["aggregates"],
    q: [
      "چرا `SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept` خطا می‌دهد؟",
      "Why does `SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept` fail?",
    ],
    options: [
      ["aggregateها در `WHERE` مجاز نیستند؛ باید از `HAVING` استفاده کرد", "Aggregates aren't allowed in `WHERE`; `HAVING` must be used"],
      ["`COUNT(*)` باید `COUNT(dept)` باشد", "`COUNT(*)` must be `COUNT(dept)`"],
      ["`GROUP BY` باید قبل از `FROM` بیاید", "`GROUP BY` must come before `FROM`"],
      ["نمی‌توان `COUNT` را در `SELECT` آورد", "`COUNT` can't appear in `SELECT`"],
    ],
    a: [
      "`WHERE` قبل از تشکیل گروه‌ها ارزیابی می‌شود، پس هنوز مقداری برای `COUNT(*)` وجود ندارد. فرم درست: `... GROUP BY dept HAVING COUNT(*) > 5`.",
      "`WHERE` is evaluated before groups exist, so there's no `COUNT(*)` value yet. Correct form: `... GROUP BY dept HAVING COUNT(*) > 5`.",
    ],
  },
  {
    id: "db-j-group-by-nonaggregated",
    level: "junior",
    tags: ["group-by", "aggregates"],
    q: [
      "در PostgreSQL، `SELECT dept, name, COUNT(*) FROM emp GROUP BY dept` (وقتی `dept` کلید نیست) چه نتیجه‌ای دارد؟",
      "In PostgreSQL, what happens with `SELECT dept, name, COUNT(*) FROM emp GROUP BY dept` (when `dept` is not a key)?",
    ],
    options: [
      ["خطا: `name` باید در `GROUP BY` یا داخل aggregate باشد", "Error: `name` must appear in `GROUP BY` or inside an aggregate"],
      ["برای هر dept یک `name` تصادفی برمی‌گرداند", "Returns a random `name` for each dept"],
      ["برای هر dept اولین `name` الفبایی را برمی‌گرداند", "Returns the alphabetically first `name` for each dept"],
      ["همه nameها را با کاما ترکیب می‌کند", "Concatenates all names with commas"],
    ],
    a: [
      "هر ستون غیر aggregate در `SELECT` باید در `GROUP BY` باشد (یا وابسته تابعی به primary key گروه‌شده). MySQL قدیمی بدون `ONLY_FULL_GROUP_BY` مقدار نامعینی برمی‌گرداند که منبع باگ است.",
      "Every non-aggregated column in `SELECT` must be in `GROUP BY` (or functionally dependent on a grouped primary key). Old MySQL without `ONLY_FULL_GROUP_BY` returns an indeterminate value, a common bug source.",
    ],
  },
  {
    id: "db-j-null-equals-null",
    level: "junior",
    tags: ["null"],
    q: [
      "نتیجه عبارت `NULL = NULL` در SQL چیست؟",
      "What is the result of `NULL = NULL` in SQL?",
    ],
    options: [
      ["`NULL` (نامعلوم)", "`NULL` (unknown)"],
      ["`TRUE`", "`TRUE`"],
      ["`FALSE`", "`FALSE`"],
      ["خطای نوع داده", "A type error"],
    ],
    a: [
      "SQL از منطق سه‌مقداری استفاده می‌کند و هر مقایسه با `NULL` نتیجه `NULL` (unknown) دارد. برای بررسی باید از `IS NULL` یا `IS NOT DISTINCT FROM` استفاده کرد.",
      "SQL uses three-valued logic, and any comparison with `NULL` yields `NULL` (unknown). Use `IS NULL` or `IS NOT DISTINCT FROM` instead.",
    ],
  },
  {
    id: "db-j-count-star-vs-col",
    level: "junior",
    tags: ["null", "aggregates"],
    q: [
      "جدولی ۱۰ سطر دارد و ستون `email` در ۳ سطر `NULL` است. `SELECT COUNT(*), COUNT(email)` چه برمی‌گرداند؟",
      "A table has 10 rows and `email` is `NULL` in 3 of them. What does `SELECT COUNT(*), COUNT(email)` return?",
    ],
    options: [
      ["`10, 7`", "`10, 7`"],
      ["`10, 10`", "`10, 10`"],
      ["`7, 7`", "`7, 7`"],
      ["`7, 10`", "`7, 10`"],
    ],
    a: [
      "`COUNT(*)` همه سطرها را می‌شمارد ولی `COUNT(col)` فقط مقادیر غیر `NULL` را. بیشتر aggregateها مثل `SUM` و `AVG` هم `NULL`ها را نادیده می‌گیرند.",
      "`COUNT(*)` counts all rows while `COUNT(col)` counts only non-`NULL` values. Most aggregates like `SUM` and `AVG` also ignore `NULL`s.",
    ],
  },
  {
    id: "db-j-avg-null",
    level: "junior",
    tags: ["null", "aggregates"],
    q: [
      "ستون `score` مقادیر `10`، `20` و `NULL` دارد. `AVG(score)` چیست؟",
      "Column `score` has values `10`, `20`, and `NULL`. What is `AVG(score)`?",
    ],
    options: [
      ["`15`", "`15`"],
      ["`10`", "`10`"],
      ["`NULL`", "`NULL`"],
      ["`30`", "`30`"],
    ],
    a: [
      "`AVG` مقادیر `NULL` را نادیده می‌گیرد و میانگین `(10 + 20) / 2 = 15` است. اگر بخواهید `NULL` صفر حساب شود باید `AVG(COALESCE(score, 0))` بنویسید که `10` می‌دهد.",
      "`AVG` ignores `NULL`s, so it's `(10 + 20) / 2 = 15`. To treat `NULL` as zero, use `AVG(COALESCE(score, 0))`, which gives `10`.",
    ],
  },
  {
    id: "db-j-not-in-null",
    level: "junior",
    tags: ["null", "subqueries"],
    q: [
      "اگر زیرکوئری حداقل یک `NULL` برگرداند، `WHERE id NOT IN (SELECT user_id FROM orders)` چه می‌کند؟",
      "If the subquery returns at least one `NULL`, what does `WHERE id NOT IN (SELECT user_id FROM orders)` do?",
    ],
    options: [
      ["هیچ سطری برنمی‌گرداند", "Returns no rows"],
      ["`NULL` را نادیده می‌گیرد و درست کار می‌کند", "Ignores the `NULL` and works correctly"],
      ["همه سطرها را برمی‌گرداند", "Returns all rows"],
      ["خطای اجرا می‌دهد", "Raises a runtime error"],
    ],
    a: [
      "`x NOT IN (a, NULL)` یعنی `x <> a AND x <> NULL` و بخش دوم همیشه `NULL` است، پس شرط هرگز `TRUE` نمی‌شود. به همین دلیل `NOT EXISTS` امن‌تر است.",
      "`x NOT IN (a, NULL)` means `x <> a AND x <> NULL`, and the second part is always `NULL`, so the condition is never `TRUE`. That's why `NOT EXISTS` is safer.",
    ],
  },
  {
    id: "db-j-coalesce",
    level: "junior",
    tags: ["null", "functions"],
    q: [
      "`COALESCE(nickname, first_name, 'Guest')` چه چیزی برمی‌گرداند؟",
      "What does `COALESCE(nickname, first_name, 'Guest')` return?",
    ],
    options: [
      ["اولین آرگومان غیر `NULL` از چپ", "The first non-`NULL` argument from the left"],
      ["آخرین آرگومان غیر `NULL`", "The last non-`NULL` argument"],
      ["همه آرگومان‌ها را به هم می‌چسباند", "Concatenates all arguments"],
      ["همیشه `'Guest'` را برمی‌گرداند", "Always returns `'Guest'`"],
    ],
    a: [
      "`COALESCE` آرگومان‌ها را به ترتیب بررسی می‌کند و اولین مقدار غیر `NULL` را برمی‌گرداند؛ اگر همه `NULL` باشند نتیجه `NULL` است.",
      "`COALESCE` checks arguments in order and returns the first non-`NULL` one; if all are `NULL`, the result is `NULL`.",
    ],
  },
  {
    id: "db-j-distinct",
    level: "junior",
    tags: ["distinct"],
    q: [
      "`SELECT DISTINCT city, country FROM users` چه چیزی برمی‌گرداند؟",
      "What does `SELECT DISTINCT city, country FROM users` return?",
    ],
    options: [
      ["ترکیب‌های یکتای `(city, country)`", "Unique `(city, country)` combinations"],
      ["شهرهای یکتا، و کشور اولین سطر هر شهر", "Unique cities, with the country of each city's first row"],
      ["فقط کشورهای یکتا", "Only unique countries"],
      ["خطا، چون `DISTINCT` فقط روی یک ستون کار می‌کند", "An error, because `DISTINCT` only works on one column"],
    ],
    a: [
      "`DISTINCT` روی کل سطر خروجی اعمال می‌شود، نه فقط ستون اول. پس `('Paris', 'FR')` و `('Paris', 'US')` دو سطر جدا هستند.",
      "`DISTINCT` applies to the whole output row, not just the first column. So `('Paris', 'FR')` and `('Paris', 'US')` are separate rows.",
    ],
  },
  {
    id: "db-j-count-distinct",
    level: "junior",
    tags: ["distinct", "aggregates"],
    q: [
      "برای شمارش تعداد مشتریان متمایزی که سفارش داده‌اند، کدام درست است؟",
      "To count the number of distinct customers who placed orders, which is correct?",
    ],
    options: [
      ["`SELECT COUNT(DISTINCT customer_id) FROM orders`", "`SELECT COUNT(DISTINCT customer_id) FROM orders`"],
      ["`SELECT DISTINCT COUNT(customer_id) FROM orders`", "`SELECT DISTINCT COUNT(customer_id) FROM orders`"],
      ["`SELECT COUNT(*) FROM orders GROUP BY customer_id`", "`SELECT COUNT(*) FROM orders GROUP BY customer_id`"],
      ["`SELECT COUNT(customer_id) FROM orders`", "`SELECT COUNT(customer_id) FROM orders`"],
    ],
    a: [
      "`COUNT(DISTINCT col)` مقادیر تکراری را قبل از شمارش حذف می‌کند. `DISTINCT COUNT(...)` فقط روی تک سطر نتیجه اعمال می‌شود و `GROUP BY` به ازای هر مشتری یک عدد جدا برمی‌گرداند.",
      "`COUNT(DISTINCT col)` removes duplicates before counting. `DISTINCT COUNT(...)` applies to the single result row, and `GROUP BY` returns one count per customer.",
    ],
  },
  {
    id: "db-j-order-by-default",
    level: "junior",
    tags: ["ordering"],
    q: [
      "بدون `ORDER BY`، ترتیب سطرهای نتیجه `SELECT * FROM users` چگونه است؟",
      "Without `ORDER BY`, what is the order of rows from `SELECT * FROM users`?",
    ],
    options: [
      ["تضمین‌نشده است و ممکن است بین اجراها تغییر کند", "Not guaranteed and may change between runs"],
      ["همیشه بر اساس primary key صعودی", "Always ascending by primary key"],
      ["همیشه به ترتیب درج سطرها", "Always in insertion order"],
      ["همیشه الفبایی بر اساس ستون اول", "Always alphabetical by the first column"],
    ],
    a: [
      "جدول در SQL یک مجموعه بدون ترتیب است و تنها راه تضمین ترتیب `ORDER BY` است. ترتیب مشاهده‌شده به plan، vacuum، موازی‌سازی و update سطرها بستگی دارد.",
      "A SQL table is an unordered set, and `ORDER BY` is the only way to guarantee order. The observed order depends on the plan, vacuum, parallelism, and row updates.",
    ],
  },
  {
    id: "db-j-limit-offset",
    level: "junior",
    tags: ["ordering", "pagination"],
    q: [
      "`SELECT * FROM posts ORDER BY created_at DESC LIMIT 10 OFFSET 20` چه سطرهایی برمی‌گرداند؟",
      "Which rows does `SELECT * FROM posts ORDER BY created_at DESC LIMIT 10 OFFSET 20` return?",
    ],
    options: [
      ["سطرهای ۲۱ تا ۳۰ از جدیدترین‌ها", "Rows 21 to 30 of the newest posts"],
      ["سطرهای ۲۰ تا ۳۰ از جدیدترین‌ها", "Rows 20 to 30 of the newest posts"],
      ["سطرهای ۱۱ تا ۲۰ از جدیدترین‌ها", "Rows 11 to 20 of the newest posts"],
      ["۲۰ سطر اول به‌جز ۱۰ تای اول", "The first 20 rows except the first 10"],
    ],
    a: [
      "`OFFSET 20` بیست سطر اول را رد می‌کند و `LIMIT 10` ده سطر بعدی را برمی‌گرداند، یعنی صفحه سوم با اندازه ۱۰.",
      "`OFFSET 20` skips the first 20 rows and `LIMIT 10` returns the next 10, i.e. page three with page size 10.",
    ],
  },
  {
    id: "db-j-order-by-nulls",
    level: "junior",
    tags: ["ordering", "null"],
    q: [
      "در PostgreSQL، با `ORDER BY last_login DESC` سطرهای دارای `last_login` برابر `NULL` کجا قرار می‌گیرند؟",
      "In PostgreSQL, with `ORDER BY last_login DESC`, where do rows with `NULL` `last_login` appear?",
    ],
    options: [
      ["ابتدای نتیجه، مگر اینکه `NULLS LAST` بنویسید", "At the start, unless you write `NULLS LAST`"],
      ["انتهای نتیجه، همیشه", "At the end, always"],
      ["از نتیجه حذف می‌شوند", "They are excluded from the result"],
      ["به‌صورت تصادفی بین بقیه", "Randomly among the other rows"],
    ],
    a: [
      "PostgreSQL با `NULL` مثل بزرگ‌ترین مقدار رفتار می‌کند: در `ASC` آخر و در `DESC` اول می‌آید. با `NULLS FIRST`/`NULLS LAST` می‌توان صریحاً کنترل کرد.",
      "PostgreSQL treats `NULL` as larger than any value: last in `ASC`, first in `DESC`. Use `NULLS FIRST`/`NULLS LAST` to control it explicitly.",
    ],
  },
  {
    id: "db-j-union-vs-union-all",
    level: "junior",
    tags: ["set-operations"],
    q: [
      "تفاوت `UNION` و `UNION ALL` چیست؟",
      "What is the difference between `UNION` and `UNION ALL`?",
    ],
    options: [
      ["`UNION` تکراری‌ها را حذف می‌کند و `UNION ALL` همه سطرها را نگه می‌دارد", "`UNION` removes duplicates; `UNION ALL` keeps all rows"],
      ["`UNION ALL` تکراری‌ها را حذف می‌کند و `UNION` نه", "`UNION ALL` removes duplicates; `UNION` doesn't"],
      ["`UNION` ستون‌ها را کنار هم و `UNION ALL` سطرها را زیر هم می‌چیند", "`UNION` puts columns side by side; `UNION ALL` stacks rows"],
      ["`UNION ALL` نتیجه را مرتب می‌کند", "`UNION ALL` sorts the result"],
    ],
    a: [
      "`UNION` برای حذف تکراری‌ها نیاز به sort یا hash دارد و کندتر است. اگر می‌دانید تکراری وجود ندارد یا مهم نیست، `UNION ALL` سریع‌تر است.",
      "`UNION` needs a sort or hash to remove duplicates, so it's slower. If duplicates are impossible or acceptable, `UNION ALL` is faster.",
    ],
  },
  {
    id: "db-j-union-requirements",
    level: "junior",
    tags: ["set-operations"],
    q: [
      "برای ترکیب دو کوئری با `UNION` چه شرطی لازم است؟",
      "What is required to combine two queries with `UNION`?",
    ],
    options: [
      ["تعداد ستون‌ها برابر و نوع داده‌ها سازگار باشند", "Same number of columns with compatible data types"],
      ["نام ستون‌ها دقیقاً یکسان باشند", "Column names must be exactly identical"],
      ["هر دو کوئری از یک جدول باشند", "Both queries must read from the same table"],
      ["هر دو کوئری `ORDER BY` داشته باشند", "Both queries must have `ORDER BY`"],
    ],
    a: [
      "ستون‌ها بر اساس موقعیت ترکیب می‌شوند، نه نام؛ نام ستون‌های نتیجه از کوئری اول گرفته می‌شود. `ORDER BY` فقط یک بار در انتهای کل `UNION` معنا دارد.",
      "Columns are matched by position, not name; result column names come from the first query. `ORDER BY` applies once at the end of the whole `UNION`.",
    ],
  },
  {
    id: "db-j-subquery-scalar",
    level: "junior",
    tags: ["subqueries"],
    q: [
      "`SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products)` چه چیزی برمی‌گرداند؟",
      "What does `SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products)` return?",
    ],
    options: [
      ["محصولاتی که قیمتشان از میانگین کل بیشتر است", "Products priced above the overall average"],
      ["گران‌ترین محصول", "The most expensive product"],
      ["میانگین قیمت هر محصول", "The average price of each product"],
      ["خطا، چون نمی‌توان از aggregate در زیرکوئری استفاده کرد", "An error, aggregates can't be used in subqueries"],
    ],
    a: [
      "زیرکوئری scalar یک مقدار واحد (میانگین) برمی‌گرداند که یک بار محاسبه و با هر سطر مقایسه می‌شود.",
      "The scalar subquery returns a single value (the average), computed once and compared against each row.",
    ],
  },
  {
    id: "db-j-in-vs-exists",
    level: "junior",
    tags: ["subqueries"],
    q: [
      "`EXISTS (subquery)` چه زمانی `TRUE` است؟",
      "When is `EXISTS (subquery)` `TRUE`?",
    ],
    options: [
      ["وقتی زیرکوئری حداقل یک سطر برگرداند", "When the subquery returns at least one row"],
      ["وقتی زیرکوئری دقیقاً یک سطر برگرداند", "When the subquery returns exactly one row"],
      ["وقتی مقدار برگشتی زیرکوئری `TRUE` باشد", "When the subquery's returned value is `TRUE`"],
      ["وقتی زیرکوئری هیچ `NULL`ی نداشته باشد", "When the subquery contains no `NULL`s"],
    ],
    a: [
      "`EXISTS` فقط وجود سطر را بررسی می‌کند و به محتوای ستون‌ها اهمیتی نمی‌دهد؛ برای همین `SELECT 1` رایج است. حتی سطری با مقدار `NULL` هم `EXISTS` را `TRUE` می‌کند.",
      "`EXISTS` only checks whether any row exists and ignores column values, which is why `SELECT 1` is common. Even a row containing `NULL` makes `EXISTS` `TRUE`.",
    ],
  },
  {
    id: "db-j-normalization-purpose",
    level: "junior",
    tags: ["normalization"],
    q: [
      "هدف اصلی normalization چیست؟",
      "What is the main goal of normalization?",
    ],
    options: [
      ["کاهش افزونگی و جلوگیری از update anomalyها", "Reduce redundancy and prevent update anomalies"],
      ["افزایش سرعت همه کوئری‌های خواندن", "Speed up every read query"],
      ["کاهش تعداد جدول‌ها", "Reduce the number of tables"],
      ["حذف نیاز به index", "Remove the need for indexes"],
    ],
    a: [
      "normalization داده را طوری تقسیم می‌کند که هر واقعیت فقط یک جا ذخیره شود؛ این از ناسازگاری هنگام update/insert/delete جلوگیری می‌کند. هزینه‌اش معمولاً join بیشتر است.",
      "Normalization splits data so each fact is stored in one place, preventing inconsistencies on update/insert/delete. The cost is usually more joins.",
    ],
  },
  {
    id: "db-j-1nf",
    level: "junior",
    tags: ["normalization"],
    q: [
      "ذخیره `'red,green,blue'` در یک ستون `colors` کدام فرم نرمال را نقض می‌کند؟",
      "Storing `'red,green,blue'` in a single `colors` column violates which normal form?",
    ],
    options: [
      ["1NF (مقادیر اتمیک)", "1NF (atomic values)"],
      ["2NF", "2NF"],
      ["3NF", "3NF"],
      ["BCNF", "BCNF"],
    ],
    a: [
      "1NF می‌گوید هر خانه باید یک مقدار اتمیک داشته باشد و گروه‌های تکراری نباشند. راه درست یک جدول جدا مثل `product_colors` با یک سطر برای هر رنگ است.",
      "1NF requires each cell to hold one atomic value with no repeating groups. The fix is a separate table like `product_colors` with one row per color.",
    ],
  },
  {
    id: "db-j-many-to-many",
    level: "junior",
    tags: ["schema-design", "keys"],
    q: [
      "رابطه many-to-many بین `students` و `courses` معمولاً چطور مدل می‌شود؟",
      "How is a many-to-many relationship between `students` and `courses` usually modeled?",
    ],
    options: [
      ["با جدول واسط (junction) مثل `enrollments` با دو foreign key", "With a junction table like `enrollments` holding two foreign keys"],
      ["با یک foreign key در جدول `students`", "With one foreign key in `students`"],
      ["با ستون آرایه‌ای در هر دو جدول", "With an array column in both tables"],
      ["با ادغام هر دو جدول در یک جدول", "By merging both tables into one"],
    ],
    a: [
      "جدول واسط برای هر جفت `(student_id, course_id)` یک سطر دارد و معمولاً همین دو ستون primary key ترکیبی آن هستند. اطلاعات رابطه مثل نمره هم در همین جدول قرار می‌گیرد.",
      "The junction table has one row per `(student_id, course_id)` pair, usually with those two columns as a composite primary key. Relationship data like a grade lives there too.",
    ],
  },
  {
    id: "db-j-acid",
    level: "junior",
    tags: ["acid", "transactions"],
    q: [
      "حروف ACID مخفف چیست؟",
      "What does ACID stand for?",
    ],
    options: [
      ["Atomicity, Consistency, Isolation, Durability", "Atomicity, Consistency, Isolation, Durability"],
      ["Availability, Consistency, Isolation, Distribution", "Availability, Consistency, Isolation, Distribution"],
      ["Atomicity, Concurrency, Integrity, Durability", "Atomicity, Concurrency, Integrity, Durability"],
      ["Accuracy, Consistency, Indexing, Durability", "Accuracy, Consistency, Indexing, Durability"],
    ],
    a: [
      "این چهار ویژگی تضمین می‌کنند transactionها همه‌یا‌هیچ هستند، constraintها را حفظ می‌کنند، از هم جدا به نظر می‌رسند و پس از commit ماندگارند.",
      "These four properties guarantee transactions are all-or-nothing, preserve constraints, appear isolated from each other, and persist after commit.",
    ],
  },
  {
    id: "db-j-atomicity",
    level: "junior",
    tags: ["acid", "transactions"],
    q: [
      "در انتقال پول، اگر بعد از کم کردن از حساب A و قبل از افزودن به حساب B سرور crash کند، کدام ویژگی ACID از ناسازگاری جلوگیری می‌کند؟",
      "In a money transfer, if the server crashes after debiting account A but before crediting B, which ACID property prevents inconsistency?",
    ],
    options: [
      ["Atomicity", "Atomicity"],
      ["Isolation", "Isolation"],
      ["Durability", "Durability"],
      ["Consistency به‌تنهایی", "Consistency alone"],
    ],
    a: [
      "Atomicity یعنی transaction یا کامل اعمال می‌شود یا اصلاً اعمال نمی‌شود. چون commit انجام نشده بود، پس از recovery کم شدن از A هم rollback می‌شود.",
      "Atomicity means a transaction applies fully or not at all. Since it never committed, the debit from A is rolled back on recovery.",
    ],
  },
  {
    id: "db-j-durability",
    level: "junior",
    tags: ["acid"],
    q: [
      "Durability در ACID چه تضمینی می‌دهد؟",
      "What does Durability in ACID guarantee?",
    ],
    options: [
      ["داده commit‌شده حتی پس از crash یا قطع برق باقی می‌ماند", "Committed data survives crashes or power loss"],
      ["داده هرگز قابل حذف نیست", "Data can never be deleted"],
      ["transactionها هرگز با هم تداخل ندارند", "Transactions never interfere with each other"],
      ["همه replicaها فوراً به‌روز می‌شوند", "All replicas are updated instantly"],
    ],
    a: [
      "پس از اینکه دیتابیس `COMMIT` را تأیید کرد، تغییرات (معمولاً از طریق WAL روی دیسک) ماندگار هستند و crash آن‌ها را از بین نمی‌برد.",
      "Once the database acknowledges `COMMIT`, changes are persistent (typically via a WAL flushed to disk) and a crash won't lose them.",
    ],
  },
  {
    id: "db-j-rollback",
    level: "junior",
    tags: ["transactions"],
    q: [
      "بعد از `BEGIN; UPDATE accounts SET balance = 0; ROLLBACK;` مقدار `balance` چیست؟",
      "After `BEGIN; UPDATE accounts SET balance = 0; ROLLBACK;`, what is `balance`?",
    ],
    options: [
      ["همان مقدار قبل از `BEGIN`", "The same value as before `BEGIN`"],
      ["`0` برای همه حساب‌ها", "`0` for all accounts"],
      ["`NULL`", "`NULL`"],
      ["فقط برای اولین سطر `0`", "`0` only for the first row"],
    ],
    a: [
      "`ROLLBACK` همه تغییرات انجام‌شده در transaction جاری را لغو می‌کند، پس داده به وضعیت قبل از `BEGIN` برمی‌گردد.",
      "`ROLLBACK` discards all changes made in the current transaction, restoring the data to its state before `BEGIN`.",
    ],
  },
  {
    id: "db-j-autocommit",
    level: "junior",
    tags: ["transactions"],
    q: [
      "در PostgreSQL اگر بدون `BEGIN` یک `UPDATE` اجرا کنید چه می‌شود؟",
      "In PostgreSQL, what happens if you run an `UPDATE` without `BEGIN`?",
    ],
    options: [
      ["در transaction ضمنی خودش اجرا و خودکار commit می‌شود", "It runs in its own implicit transaction and auto-commits"],
      ["تا زمان اجرای `COMMIT` صریح معلق می‌ماند", "It stays pending until an explicit `COMMIT`"],
      ["بدون هیچ تضمین atomicity اجرا می‌شود", "It runs with no atomicity guarantee at all"],
      ["خطا می‌دهد چون transaction لازم است", "It errors because a transaction is required"],
    ],
    a: [
      "در حالت autocommit هر statement به‌تنهایی یک transaction است و حتی یک `UPDATE` روی هزار سطر هم atomic است. برای گروه‌بندی چند statement باید `BEGIN`/`COMMIT` استفاده کرد.",
      "In autocommit mode each statement is its own transaction, so even an `UPDATE` touching a thousand rows is atomic. Use `BEGIN`/`COMMIT` to group several statements.",
    ],
  },
  {
    id: "db-j-index-purpose",
    level: "junior",
    tags: ["indexes"],
    q: [
      "مهم‌ترین هزینه اضافه کردن index به یک جدول چیست؟",
      "What is the main cost of adding an index to a table?",
    ],
    options: [
      ["فضای بیشتر و کندتر شدن `INSERT`/`UPDATE`/`DELETE`", "More storage and slower `INSERT`/`UPDATE`/`DELETE`"],
      ["کندتر شدن همه `SELECT`ها", "All `SELECT`s become slower"],
      ["از دست رفتن constraintهای جدول", "Losing the table's constraints"],
      ["عدم امکان استفاده از `ORDER BY`", "No longer being able to use `ORDER BY`"],
    ],
    a: [
      "index یک ساختار داده جداست که با هر تغییر در جدول باید به‌روز شود. پس خواندن را سریع‌تر ولی نوشتن را کندتر می‌کند و فضای دیسک و حافظه مصرف می‌کند.",
      "An index is a separate data structure that must be updated on every table change. It speeds up reads but slows writes and consumes disk and memory.",
    ],
  },
  {
    id: "db-j-index-default-btree",
    level: "junior",
    tags: ["indexes"],
    q: [
      "`CREATE INDEX idx ON users(email)` در PostgreSQL به‌طور پیش‌فرض چه نوع indexی می‌سازد؟",
      "What index type does `CREATE INDEX idx ON users(email)` create by default in PostgreSQL?",
    ],
    options: [
      ["B-tree", "B-tree"],
      ["Hash", "Hash"],
      ["GIN", "GIN"],
      ["Bitmap", "Bitmap"],
    ],
    a: [
      "B-tree نوع پیش‌فرض است و از مقایسه برابری، بازه (`<`, `>`, `BETWEEN`)، `ORDER BY` و prefix match مثل `LIKE 'abc%'` (با collation مناسب) پشتیبانی می‌کند.",
      "B-tree is the default and supports equality, ranges (`<`, `>`, `BETWEEN`), `ORDER BY`, and prefix matches like `LIKE 'abc%'` (with a suitable collation).",
    ],
  },
  {
    id: "db-j-pk-auto-index",
    level: "junior",
    tags: ["indexes", "keys"],
    q: [
      "در PostgreSQL کدام constraintها به‌صورت خودکار index می‌سازند؟",
      "In PostgreSQL, which constraints automatically create an index?",
    ],
    options: [
      ["`PRIMARY KEY` و `UNIQUE`", "`PRIMARY KEY` and `UNIQUE`"],
      ["`PRIMARY KEY` و `FOREIGN KEY`", "`PRIMARY KEY` and `FOREIGN KEY`"],
      ["همه constraintها از جمله `CHECK`", "All constraints including `CHECK`"],
      ["فقط `FOREIGN KEY`", "Only `FOREIGN KEY`"],
    ],
    a: [
      "PostgreSQL برای اعمال یکتایی روی `PRIMARY KEY` و `UNIQUE` یک unique index می‌سازد، اما برای ستون foreign key خودکار index نمی‌سازد و معمولاً باید دستی اضافه شود.",
      "PostgreSQL creates a unique index to enforce `PRIMARY KEY` and `UNIQUE`, but does not auto-index foreign key columns; you usually add those manually.",
    ],
  },
  {
    id: "db-j-like-leading-wildcard",
    level: "junior",
    tags: ["indexes", "performance"],
    q: [
      "با یک B-tree index روی `name`، کدام شرط معمولاً نمی‌تواند از index استفاده کند؟",
      "With a B-tree index on `name`, which condition usually cannot use the index?",
    ],
    options: [
      ["`WHERE name LIKE '%son'`", "`WHERE name LIKE '%son'`"],
      ["`WHERE name = 'Ali'`", "`WHERE name = 'Ali'`"],
      ["`WHERE name > 'M'`", "`WHERE name > 'M'`"],
      ["`WHERE name BETWEEN 'A' AND 'C'`", "`WHERE name BETWEEN 'A' AND 'C'`"],
    ],
    a: [
      "B-tree بر اساس ابتدای مقدار مرتب شده، پس wildcard ابتدایی مثل `'%son'` نقطه شروعی برای جستجو ندارد. برای این مورد trigram index (`pg_trgm` با GIN) مناسب است.",
      "A B-tree is ordered by the value's prefix, so a leading wildcard like `'%son'` has no starting point. A trigram index (`pg_trgm` with GIN) fits this case.",
    ],
  },
  {
    id: "db-j-sql-injection",
    level: "junior",
    tags: ["security", "sql-injection"],
    q: [
      "کد `db.query(\"SELECT * FROM users WHERE name = '\" + input + \"'\")` چه مشکلی دارد؟",
      "What's wrong with `db.query(\"SELECT * FROM users WHERE name = '\" + input + \"'\")`?",
    ],
    options: [
      ["در برابر SQL injection آسیب‌پذیر است", "It is vulnerable to SQL injection"],
      ["فقط کمی کندتر از حالت عادی است", "It is just slightly slower than normal"],
      ["با نام‌های فارسی کار نمی‌کند", "It doesn't work with non-English names"],
      ["هیچ مشکلی ندارد اگر از HTTPS استفاده شود", "Nothing, as long as HTTPS is used"],
    ],
    a: [
      "ورودی مثل `' OR '1'='1` ساختار کوئری را تغییر می‌دهد. راه حل parameterized query مثل `db.query('... WHERE name = $1', [input])` است که داده را جدا از کد SQL ارسال می‌کند.",
      "Input like `' OR '1'='1` changes the query's structure. The fix is a parameterized query like `db.query('... WHERE name = $1', [input])`, sending data separately from SQL code.",
    ],
  },
  {
    id: "db-j-parameterized-identifiers",
    level: "junior",
    tags: ["security", "sql-injection"],
    q: [
      "کدام بخش کوئری را نمی‌توان با placeholder مثل `$1` پارامتری کرد؟",
      "Which part of a query cannot be parameterized with a placeholder like `$1`?",
    ],
    options: [
      ["نام جدول یا ستون (identifier)", "Table or column names (identifiers)"],
      ["مقدار در `WHERE`", "A value in `WHERE`"],
      ["مقدار در `INSERT ... VALUES`", "A value in `INSERT ... VALUES`"],
      ["مقدار `LIMIT`", "The `LIMIT` value"],
    ],
    a: [
      "placeholderها فقط برای مقادیر هستند. برای identifierهای پویا (مثلاً ستون sort) باید از allowlist یا تابع escape مخصوص identifier مثل `format('%I', ...)` استفاده کرد.",
      "Placeholders are for values only. For dynamic identifiers (e.g. a sort column) use an allowlist or an identifier-escaping function like `format('%I', ...)`.",
    ],
  },
  {
    id: "db-j-n-plus-one",
    level: "junior",
    tags: ["performance", "orm"],
    q: [
      "مشکل N+1 query چیست؟",
      "What is the N+1 query problem?",
    ],
    options: [
      ["یک کوئری برای لیست و سپس یک کوئری جدا برای هر آیتم", "One query for a list, then a separate query per item"],
      ["کوئری‌ای که N+1 سطر به‌جای N برمی‌گرداند", "A query returning N+1 rows instead of N"],
      ["join کردن N+1 جدول در یک کوئری", "Joining N+1 tables in one query"],
      ["خطای off-by-one در `LIMIT`", "An off-by-one error in `LIMIT`"],
    ],
    a: [
      "مثلاً گرفتن ۱۰۰ پست و سپس یک کوئری برای نویسنده هر پست، ۱۰۱ رفت‌وبرگشت به دیتابیس است. راه حل join، `WHERE id IN (...)` یا eager loading در ORM است.",
      "E.g. fetching 100 posts and then one query per post for its author is 101 database round trips. Fix it with a join, `WHERE id IN (...)`, or ORM eager loading.",
    ],
  },
  {
    id: "db-j-view",
    level: "junior",
    tags: ["views"],
    q: [
      "یک view معمولی (غیر materialized) در SQL چیست؟",
      "What is a regular (non-materialized) view in SQL?",
    ],
    options: [
      ["یک کوئری ذخیره‌شده که هر بار هنگام استفاده اجرا می‌شود", "A stored query that runs each time it's used"],
      ["یک کپی فیزیکی از داده که دوره‌ای به‌روز می‌شود", "A physical copy of data refreshed periodically"],
      ["یک index روی چند جدول", "An index across several tables"],
      ["یک جدول موقت که پس از session حذف می‌شود", "A temp table dropped after the session"],
    ],
    a: [
      "view داده‌ای ذخیره نمی‌کند؛ فقط تعریف کوئری است و دیتابیس آن را در کوئری شما inline می‌کند. برای ساده‌سازی کوئری‌ها و محدود کردن دسترسی به ستون‌ها مفید است.",
      "A view stores no data; it's just a query definition that the database inlines into your query. It's useful for simplifying queries and restricting column access.",
    ],
  },
  {
    id: "db-j-truncate-vs-delete",
    level: "junior",
    tags: ["dml"],
    q: [
      "تفاوت مهم `TRUNCATE users` با `DELETE FROM users` چیست؟",
      "What is a key difference between `TRUNCATE users` and `DELETE FROM users`?",
    ],
    options: [
      ["`TRUNCATE` بدون اسکن سطر به سطر همه را سریع حذف می‌کند و triggerهای سطری را اجرا نمی‌کند", "`TRUNCATE` removes all rows quickly without row-by-row scanning and skips row triggers"],
      ["`DELETE` ساختار جدول را هم حذف می‌کند", "`DELETE` also drops the table structure"],
      ["`TRUNCATE` می‌تواند `WHERE` داشته باشد", "`TRUNCATE` can take a `WHERE` clause"],
      ["`DELETE` قابل rollback نیست", "`DELETE` cannot be rolled back"],
    ],
    a: [
      "`TRUNCATE` فایل‌های داده را دور می‌اندازد و برای جدول‌های بزرگ بسیار سریع‌تر است، ولی `WHERE` نمی‌پذیرد و قفل سنگین‌تری می‌گیرد. در PostgreSQL هر دو داخل transaction قابل rollback هستند.",
      "`TRUNCATE` discards data files and is much faster for big tables, but takes no `WHERE` and a heavier lock. In PostgreSQL both can be rolled back inside a transaction.",
    ],
  },
  {
    id: "db-j-update-without-where",
    level: "junior",
    tags: ["dml"],
    q: [
      "`UPDATE users SET active = false;` بدون `WHERE` چه می‌کند؟",
      "What does `UPDATE users SET active = false;` without `WHERE` do?",
    ],
    options: [
      ["همه سطرهای جدول را به‌روز می‌کند", "Updates every row in the table"],
      ["فقط سطر اول را به‌روز می‌کند", "Updates only the first row"],
      ["خطا می‌دهد چون `WHERE` الزامی است", "Fails because `WHERE` is required"],
      ["هیچ سطری را تغییر نمی‌دهد", "Changes no rows"],
    ],
    a: [
      "بدون `WHERE`، `UPDATE` و `DELETE` روی کل جدول اعمال می‌شوند. برای همین در کارهای دستی بهتر است ابتدا `BEGIN` بزنید و تعداد سطرهای تحت تأثیر را قبل از `COMMIT` بررسی کنید.",
      "Without `WHERE`, `UPDATE` and `DELETE` affect the whole table. For manual work, start with `BEGIN` and check the affected row count before `COMMIT`.",
    ],
  },
  {
    id: "db-j-upsert",
    level: "junior",
    tags: ["dml", "constraints"],
    q: [
      "`INSERT ... ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name` در PostgreSQL چه می‌کند؟",
      "What does `INSERT ... ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name` do in PostgreSQL?",
    ],
    options: [
      ["اگر email تکراری باشد سطر موجود را با مقدار جدید به‌روز می‌کند (upsert)", "If the email already exists, updates the existing row with the new value (upsert)"],
      ["سطر تکراری را حذف و سطر جدید را درج می‌کند", "Deletes the duplicate and inserts the new row"],
      ["همیشه یک سطر جدید درج می‌کند", "Always inserts a new row"],
      ["تکراری را بی‌صدا نادیده می‌گیرد", "Silently ignores the duplicate"],
    ],
    a: [
      "`ON CONFLICT` نیاز به unique index یا constraint روی ستون هدف دارد. `EXCLUDED` به سطری اشاره می‌کند که قصد درجش را داشتید؛ برای نادیده گرفتن از `DO NOTHING` استفاده می‌شود.",
      "`ON CONFLICT` requires a unique index or constraint on the target column. `EXCLUDED` refers to the row you tried to insert; `DO NOTHING` would ignore it instead.",
    ],
  },
  {
    id: "db-j-varchar-vs-text",
    level: "junior",
    tags: ["data-types"],
    q: [
      "برای ذخیره مبالغ پولی در SQL کدام نوع داده مناسب‌تر است؟",
      "Which data type is most appropriate for storing money amounts in SQL?",
    ],
    options: [
      ["`NUMERIC(12, 2)` یا عدد صحیح به واحد کوچک (مثلاً سنت)", "`NUMERIC(12, 2)` or an integer in minor units (e.g. cents)"],
      ["`FLOAT`", "`FLOAT`"],
      ["`REAL`", "`REAL`"],
      ["`VARCHAR`", "`VARCHAR`"],
    ],
    a: [
      "نوع‌های floating-point مثل `FLOAT` اعشار را دقیق نشان نمی‌دهند (`0.1 + 0.2` دقیقاً `0.3` نیست) و برای پول خطای گرد کردن ایجاد می‌کنند. `NUMERIC` دقیق است.",
      "Floating-point types like `FLOAT` can't represent decimals exactly (`0.1 + 0.2` isn't exactly `0.3`), causing rounding errors for money. `NUMERIC` is exact.",
    ],
  },
  {
    id: "db-j-query-order-execution",
    level: "junior",
    tags: ["sql-basics"],
    q: [
      "ترتیب منطقی ارزیابی بندهای یک کوئری SQL کدام است؟",
      "What is the logical evaluation order of SQL query clauses?",
    ],
    options: [
      ["`FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`", "`FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`"],
      ["`SELECT` → `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `ORDER BY` → `LIMIT`", "`SELECT` → `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `ORDER BY` → `LIMIT`"],
      ["`FROM` → `GROUP BY` → `WHERE` → `SELECT` → `HAVING` → `ORDER BY` → `LIMIT`", "`FROM` → `GROUP BY` → `WHERE` → `SELECT` → `HAVING` → `ORDER BY` → `LIMIT`"],
      ["`FROM` → `WHERE` → `SELECT` → `GROUP BY` → `HAVING` → `LIMIT` → `ORDER BY`", "`FROM` → `WHERE` → `SELECT` → `GROUP BY` → `HAVING` → `LIMIT` → `ORDER BY`"],
    ],
    a: [
      "به همین دلیل alias تعریف‌شده در `SELECT` در `WHERE` قابل استفاده نیست ولی در `ORDER BY` هست. این ترتیب منطقی است و planner می‌تواند اجرای فیزیکی را تغییر دهد.",
      "That's why a `SELECT` alias can't be used in `WHERE` but can in `ORDER BY`. This is the logical order; the planner may execute it physically differently.",
    ],
  },
]);
