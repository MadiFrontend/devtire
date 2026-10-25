import { build } from "../build";

export const systemDesignMore = build("system-design", [
  // Junior
  {
    id: "sd-cache-control-01",
    level: "junior",
    tags: ["caching", "http"],
    q: ["هدر `Cache-Control: max-age=31536000, immutable` برای چه فایل‌هایی مناسب است؟", "Which files suit `Cache-Control: max-age=31536000, immutable`?"],
    options: [
      ["assetهای hash‌دار مثل `app.3f9a.js`", "Hashed assets like `app.3f9a.js`"],
      ["فایل HTML اصلی", "The main HTML file"],
      ["پاسخ API کاربر", "User API responses"],
      ["صفحه لاگین", "The login page"],
    ],
    a: [
      "چون نام فایل با تغییر محتوا عوض می‌شود، می‌توان آن را برای همیشه cache کرد. HTML باید کوتاه‌مدت یا `no-cache` باشد تا assetهای جدید را ارجاع دهد.",
      "Since the filename changes with content, it can be cached forever. HTML should be short-lived or `no-cache` to reference new assets.",
    ],
  },
  {
    id: "sd-lazy-images-01",
    level: "junior",
    tags: ["performance", "images"],
    q: ["`loading=\"lazy\"` روی `<img>` چه می‌کند؟", "What does `loading=\"lazy\"` on `<img>` do?"],
    options: [
      ["دانلود تصویر را تا نزدیک شدن به viewport به تعویق می‌اندازد", "Defers download until the image nears the viewport"],
      ["کیفیت تصویر را کم می‌کند", "Lowers image quality"],
      ["تصویر را دیرتر روی سرور می‌سازد", "Generates the image later on the server"],
      ["تصویر را cache نمی‌کند", "Disables caching"],
    ],
    a: [
      "روی تصویر LCP (بالای صفحه) lazy نگذارید چون LCP را بدتر می‌کند؛ برای آن `fetchpriority=\"high\"` مناسب است.",
      "Don't lazy-load the LCP (above-the-fold) image: it hurts LCP. Use `fetchpriority=\"high\"` there.",
    ],
  },
  {
    id: "sd-minify-01",
    level: "junior",
    tags: ["performance", "build"],
    q: ["Minification چه کاری انجام می‌دهد؟", "What does minification do?"],
    options: [
      ["حذف فاصله، کامنت و کوتاه کردن نام‌ها برای کاهش حجم", "Removes whitespace/comments and shortens names to cut size"],
      ["رمزنگاری کد برای امنیت", "Encrypts code for security"],
      ["تبدیل JS به WebAssembly", "Converts JS to WebAssembly"],
      ["حذف کدهای استفاده‌شده", "Removes used code"],
    ],
    a: [
      "Minify با فشرده‌سازی gzip/brotli روی سرور تکمیل می‌شود. minify امنیتی ایجاد نمی‌کند؛ کد کلاینت همیشه قابل خواندن است.",
      "It complements server gzip/brotli. Minification is not security: client code is always readable.",
    ],
  },
  {
    id: "sd-https-01",
    level: "junior",
    tags: ["security"],
    q: ["HTTPS در برابر چه چیزی محافظت می‌کند؟", "What does HTTPS protect against?"],
    options: [
      ["شنود و دستکاری داده در مسیر (man-in-the-middle)", "Eavesdropping and tampering in transit (man-in-the-middle)"],
      ["همه حملات XSS", "All XSS attacks"],
      ["باگ‌های منطق سرور", "Server logic bugs"],
      ["حملات DDoS", "DDoS attacks"],
    ],
    a: [
      "HTTPS لازمه HTTP/2، Service Worker و بسیاری از APIهای مدرن است. XSS را باید جداگانه با escape و CSP مهار کرد.",
      "HTTPS is required for HTTP/2, Service Workers, and many modern APIs. XSS needs separate defenses (escaping, CSP).",
    ],
  },
  {
    id: "sd-rest-graphql-01",
    level: "junior",
    tags: ["api"],
    q: ["مزیت اصلی GraphQL نسبت به REST از دید کلاینت؟", "Main client-side advantage of GraphQL over REST?"],
    options: [
      ["کلاینت دقیقاً فیلدهای لازم را در یک درخواست مشخص می‌کند", "The client requests exactly the needed fields in one request"],
      ["همیشه سریع‌تر از REST است", "Always faster than REST"],
      ["نیازی به سرور ندارد", "No server needed"],
      ["cache کردن HTTP ساده‌تر است", "Simpler HTTP caching"],
    ],
    a: [
      "over-fetching و under-fetching کمتر می‌شود. در عوض، cache کردن HTTP و کنترل هزینه queryها پیچیده‌تر است.",
      "Less over/under-fetching. In exchange, HTTP caching and query-cost control get harder.",
    ],
  },
  {
    id: "sd-debounce-search-01",
    level: "junior",
    tags: ["performance"],
    q: ["چرا ورودی جستجوی زنده را debounce می‌کنیم؟", "Why debounce a live search input?"],
    options: [
      ["برای کاهش تعداد درخواست به سرور هنگام تایپ", "To cut server requests while typing"],
      ["برای امن‌تر شدن جستجو", "To make search more secure"],
      ["برای ذخیره در localStorage", "To save into localStorage"],
      ["چون مرورگر الزام می‌کند", "Because browsers require it"],
    ],
    a: [
      "معمولاً ۲۰۰ تا ۳۰۰ میلی‌ثانیه کافی است. درخواست‌های قبلی را هم با `AbortController` لغو کنید تا پاسخ قدیمی جای جدید را نگیرد.",
      "200-300ms is typical. Also abort earlier requests with `AbortController` so stale responses don't win.",
    ],
  },
  // Middle
  {
    id: "sd-realtime-01",
    level: "middle",
    tags: ["realtime"],
    q: ["برای چت دوطرفه بلادرنگ کدام مناسب‌تر است؟", "Which fits real-time two-way chat best?"],
    options: [
      ["WebSocket", "WebSocket"],
      ["Polling هر ۱۰ ثانیه", "Polling every 10s"],
      ["Server-Sent Events", "Server-Sent Events"],
      ["ایمیل", "Email"],
    ],
    a: [
      "SSE فقط سرور → کلاینت است (برای نوتیفیکیشن و feed مناسب است). Polling ساده است ولی latency و بار بیشتری دارد.",
      "SSE is server → client only (good for notifications, feeds). Polling is simple but adds latency and load.",
    ],
  },
  {
    id: "sd-backoff-01",
    level: "middle",
    tags: ["resilience"],
    q: ["برای retry درخواست‌های ناموفق، کدام بهتر است؟", "Best approach for retrying failed requests?"],
    options: [
      ["Exponential backoff با jitter و سقف تعداد تلاش", "Exponential backoff with jitter and a retry cap"],
      ["تلاش بی‌وقفه و فوری", "Immediate, endless retries"],
      ["هرگز retry نکن", "Never retry"],
      ["رفرش کامل صفحه", "Full page reload"],
    ],
    a: [
      "jitter جلوی هجوم هم‌زمان کلاینت‌ها (thundering herd) را می‌گیرد. خطاهای 4xx مثل 400 و 401 معمولاً نباید retry شوند.",
      "Jitter prevents thundering herds. 4xx errors like 400/401 usually shouldn't be retried.",
    ],
  },
  {
    id: "sd-pagination-01",
    level: "middle",
    tags: ["api"],
    q: ["چرا cursor pagination برای feed بهتر از offset است؟", "Why is cursor pagination better than offset for feeds?"],
    options: [
      ["با درج آیتم جدید، آیتم تکراری یا جاافتاده ایجاد نمی‌شود", "No duplicates or skips when new items are inserted"],
      ["پیاده‌سازی آن همیشه ساده‌تر است", "It's always simpler to implement"],
      ["پرش مستقیم به صفحه ۵۰ را ممکن می‌کند", "It enables jumping straight to page 50"],
      ["نیازی به index دیتابیس ندارد", "Needs no DB index"],
    ],
    a: [
      "Offset برای جدول‌های ادمین با شماره صفحه مناسب است. cursor برای infinite scroll و داده‌های پرتغییر بهتر است.",
      "Offset suits numbered admin tables. Cursor suits infinite scroll and fast-changing data.",
    ],
  },
  {
    id: "sd-monitoring-01",
    level: "middle",
    tags: ["observability"],
    q: ["ابزارهایی مثل Sentry در فرانت چه کاری انجام می‌دهند؟", "What do tools like Sentry do on the frontend?"],
    options: [
      ["ثبت خطاهای واقعی کاربران با stack trace (از طریق source map) و context", "Capture real-user errors with stack traces (via source maps) and context"],
      ["تست واحد خودکار", "Automated unit testing"],
      ["فشرده‌سازی تصاویر", "Image compression"],
      ["مدیریت state", "State management"],
    ],
    a: [
      "Source mapها را آپلود کنید ولی آن‌ها را عمومی سرو نکنید. RUM (Real User Monitoring) هم Web Vitals واقعی کاربران را جمع می‌کند.",
      "Upload source maps but don't serve them publicly. RUM also collects real-user Web Vitals.",
    ],
  },
  {
    id: "sd-feature-flags-01",
    level: "middle",
    tags: ["release"],
    q: ["Feature flag چه کمکی می‌کند؟", "How do feature flags help?"],
    options: [
      ["جدا کردن deploy از release، rollout تدریجی و خاموش کردن سریع", "Decoupling deploy from release, gradual rollout, and quick kill switches"],
      ["حذف نیاز به تست", "Removing the need for tests"],
      ["کاهش خودکار bundle", "Automatically shrinking the bundle"],
      ["رمزنگاری کد", "Encrypting code"],
    ],
    a: [
      "flagهای قدیمی بدهی فنی هستند و باید پاک شوند. flag سمت کلاینت امنیتی ایجاد نمی‌کند؛ کنترل دسترسی باید روی سرور باشد.",
      "Stale flags are tech debt and must be cleaned up. Client-side flags aren't security: enforce access on the server.",
    ],
  },
  {
    id: "sd-cache-busting-01",
    level: "middle",
    tags: ["caching", "build"],
    q: ["چطور مطمئن شویم کاربران بعد از deploy نسخه جدید JS را می‌گیرند؟", "How do you ensure users get new JS after a deploy?"],
    options: [
      ["نام فایل با hash محتوا (content hashing)", "Content-hashed filenames"],
      ["از کاربر بخواهیم cache را پاک کند", "Ask users to clear cache"],
      ["غیرفعال کردن کامل cache", "Disable caching entirely"],
      ["تغییر دامنه در هر deploy", "Change domain every deploy"],
    ],
    a: [
      "باندلرها خودکار `main.[hash].js` می‌سازند. HTML که به آن‌ها ارجاع می‌دهد باید revalidate شود.",
      "Bundlers emit `main.[hash].js` automatically. The HTML referencing them must be revalidated.",
    ],
  },
  // Senior
  {
    id: "sd-autocomplete-01",
    level: "senior",
    tags: ["design"],
    q: ["در طراحی autocomplete، کدام مجموعه مهم‌تر است؟", "Designing autocomplete, which set matters most?"],
    options: [
      ["debounce، cache نتایج، لغو درخواست قدیمی و a11y کیبورد (combobox)", "Debounce, result cache, cancel stale requests, keyboard a11y (combobox)"],
      ["fetch در هر keystroke بدون cache", "Fetch on every keystroke without cache"],
      ["لود همه داده‌ها در شروع اپ", "Load all data at startup"],
      ["فقط استایل dropdown", "Only dropdown styling"],
    ],
    a: [
      "به race condition توجه کنید (پاسخ قدیمی دیرتر برسد). الگوی ARIA combobox و هایلایت بخش match شده UX را کامل می‌کند.",
      "Watch for race conditions (old responses arriving late). The ARIA combobox pattern and match highlighting complete the UX.",
    ],
  },
  {
    id: "sd-design-system-01",
    level: "senior",
    tags: ["design-system"],
    q: ["پایه یک design system مقیاس‌پذیر بین چند تیم چیست؟", "What underpins a design system scaling across teams?"],
    options: [
      ["design tokens، نسخه‌بندی semver و مستندات/Storybook", "Design tokens, semver versioning, and docs/Storybook"],
      ["کپی کامپوننت‌ها در هر پروژه", "Copying components into every project"],
      ["یک فایل CSS بزرگ بدون نسخه", "One big unversioned CSS file"],
      ["استایل inline در همه جا", "Inline styles everywhere"],
    ],
    a: [
      "Tokenها (رنگ، فاصله، تایپوگرافی) منبع حقیقت بین طراحی و کد هستند. breaking changeها با codemod و changelog مدیریت می‌شوند.",
      "Tokens (color, spacing, type) are the design↔code source of truth. Breaking changes ship with codemods and changelogs.",
    ],
  },
  {
    id: "sd-image-cdn-01",
    level: "senior",
    tags: ["performance", "images"],
    q: ["مزیت Image CDN (مثل Cloudinary یا imgix) چیست؟", "What does an image CDN (like Cloudinary or imgix) offer?"],
    options: [
      ["ریسایز و تبدیل فرمت (AVIF/WebP) روی edge بر اساس دستگاه", "On-the-fly resize and format conversion (AVIF/WebP) at the edge per device"],
      ["ذخیره دائمی در localStorage", "Permanent localStorage storage"],
      ["حذف نیاز به `alt`", "Removing the need for `alt`"],
      ["اجرای JS روی تصویر", "Running JS on images"],
    ],
    a: [
      "به‌جای ساخت دستی چند اندازه، URL پارامتر می‌گیرد و نتیجه cache می‌شود. `next/image` هم همین ایده را پیاده می‌کند.",
      "Instead of pre-generating sizes, URL params drive transforms and results are cached. `next/image` follows the same idea.",
    ],
  },
  {
    id: "sd-collab-01",
    level: "senior",
    tags: ["realtime"],
    q: ["برای ویرایش هم‌زمان مثل Google Docs معمولاً از چه استفاده می‌شود؟", "What is typically used for concurrent editing like Google Docs?"],
    options: [
      ["CRDT یا Operational Transformation", "CRDTs or Operational Transformation"],
      ["Last-write-wins روی کل سند", "Last-write-wins on the whole document"],
      ["قفل کردن سند برای یک کاربر", "Locking the doc for one user"],
      ["polling هر یک دقیقه", "Polling every minute"],
    ],
    a: [
      "این روش‌ها ویرایش‌های هم‌زمان را بدون از دست رفتن داده ادغام می‌کنند. کتابخانه‌هایی مثل Yjs و Automerge پیاده‌سازی CRDT هستند.",
      "They merge concurrent edits without losing data. Libraries like Yjs and Automerge implement CRDTs.",
    ],
  },
  {
    id: "sd-rum-01",
    level: "senior",
    tags: ["observability", "performance"],
    q: ["چرا داده RUM از Lighthouse آزمایشگاهی مهم‌تر است؟", "Why does RUM data matter more than lab Lighthouse?"],
    options: [
      ["تجربه واقعی کاربران روی دستگاه و شبکه واقعی را نشان می‌دهد", "It reflects real users on real devices and networks"],
      ["همیشه امتیاز بالاتری می‌دهد", "It always scores higher"],
      ["نیازی به JS ندارد", "It needs no JS"],
      ["فقط روی دسکتاپ اندازه می‌گیرد", "It only measures desktop"],
    ],
    a: [
      "گوگل برای رتبه‌بندی از داده میدانی (CrUX) استفاده می‌کند. صدک ۷۵ (p75) را دنبال کنید و بر اساس صفحه و دستگاه تفکیک کنید.",
      "Google ranks on field data (CrUX). Track p75 and segment by page and device.",
    ],
  },
  {
    id: "sd-csp-01",
    level: "senior",
    tags: ["security"],
    q: ["Content Security Policy (CSP) عمدتاً چه خطری را کاهش می‌دهد؟", "What risk does Content Security Policy (CSP) mainly reduce?"],
    options: [
      ["XSS با محدود کردن منابع مجاز اسکریپت و غیره", "XSS by restricting allowed script and other sources"],
      ["CSRF به‌طور کامل", "CSRF entirely"],
      ["SQL injection", "SQL injection"],
      ["DDoS", "DDoS"],
    ],
    a: [
      "با nonce یا hash فقط اسکریپت‌های مجاز اجرا می‌شوند و `unsafe-inline` حذف می‌شود. ابتدا با `Content-Security-Policy-Report-Only` تست کنید.",
      "Nonces/hashes allow only approved scripts and drop `unsafe-inline`. Start with `Content-Security-Policy-Report-Only`.",
    ],
  },
]);
