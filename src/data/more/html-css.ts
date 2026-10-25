import { build } from "../build";

export const htmlCssMore = build("html-css", [
  // Junior
  {
    id: "html-alt-01",
    level: "junior",
    tags: ["a11y", "images"],
    q: ["هدف اصلی attribute `alt` روی `<img>` چیست؟", "What is the main purpose of `alt` on `<img>`?"],
    options: [
      ["متن جایگزین برای screen reader و وقتی تصویر لود نشود", "Text alternative for screen readers and failed loads"],
      ["tooltip هنگام hover", "A hover tooltip"],
      ["فشرده‌سازی تصویر", "Image compression"],
      ["تعیین اندازه تصویر", "Setting image size"],
    ],
    a: [
      "`alt` محتوای تصویر را توصیف می‌کند. برای تصاویر تزئینی `alt=\"\"` بگذارید تا screen reader از آن رد شود.",
      "`alt` describes the image. Use `alt=\"\"` for decorative images so screen readers skip them.",
    ],
  },
  {
    id: "css-display-visibility-01",
    level: "junior",
    tags: ["layout"],
    q: ["تفاوت `display: none` و `visibility: hidden`؟", "Difference between `display: none` and `visibility: hidden`?"],
    options: [
      ["`none` از layout حذف می‌کند؛ `hidden` جایش را نگه می‌دارد", "`none` removes it from layout; `hidden` keeps its space"],
      ["هر دو جای عنصر را نگه می‌دارند", "Both keep the element's space"],
      ["`hidden` عنصر را از DOM حذف می‌کند", "`hidden` removes it from the DOM"],
      ["هیچ تفاوتی ندارند", "No difference"],
    ],
    a: [
      "هیچ‌کدام عنصر را از DOM حذف نمی‌کنند. `opacity: 0` هم جا را نگه می‌دارد و عنصر هنوز قابل کلیک است.",
      "Neither removes the element from the DOM. `opacity: 0` also keeps space and stays clickable.",
    ],
  },
  {
    id: "css-rem-em-01",
    level: "junior",
    tags: ["units"],
    q: ["واحد `rem` نسبت به چه چیزی محاسبه می‌شود؟", "What is `rem` relative to?"],
    options: [
      ["font-size عنصر ریشه (`html`)", "The root (`html`) font-size"],
      ["font-size والد", "The parent's font-size"],
      ["عرض viewport", "The viewport width"],
      ["عرض والد", "The parent's width"],
    ],
    a: [
      "`rem` نسبت به root است و قابل پیش‌بینی‌تر است. `em` نسبت به font-size خود عنصر/والد است و در تودرتوها ضرب می‌شود.",
      "`rem` is root-relative and predictable. `em` is relative to the element/parent font-size and compounds when nested.",
    ],
  },
  {
    id: "css-position-absolute-01",
    level: "junior",
    tags: ["positioning"],
    q: ["عنصر `position: absolute` نسبت به چه چیزی قرار می‌گیرد؟", "An `position: absolute` element is positioned relative to what?"],
    options: [
      ["نزدیک‌ترین والدی که position غیر از static دارد", "The nearest ancestor with non-static position"],
      ["همیشه viewport", "Always the viewport"],
      ["همیشه والد مستقیم", "Always the direct parent"],
      ["عنصر قبلی هم‌سطح", "The previous sibling"],
    ],
    a: [
      "اگر چنین والدی نباشد، نسبت به initial containing block قرار می‌گیرد. به همین دلیل معمولاً به والد `position: relative` می‌دهیم.",
      "If none exists, it uses the initial containing block. That's why the parent usually gets `position: relative`.",
    ],
  },
  {
    id: "html-label-01",
    level: "junior",
    tags: ["forms", "a11y"],
    q: ["اتصال `<label for=\"email\">` به input چه فایده‌ای دارد؟", "What does linking `<label for=\"email\">` to an input give?"],
    options: [
      ["کلیک روی label فوکوس می‌دهد و screen reader نام فیلد را می‌خواند", "Clicking focuses the input and screen readers announce its name"],
      ["فقط استایل متن را تغییر می‌دهد", "It only changes text styling"],
      ["اعتبارسنجی ایمیل را فعال می‌کند", "It enables email validation"],
      ["فرم را خودکار ارسال می‌کند", "It submits the form automatically"],
    ],
    a: [
      "`for` باید با `id` input یکی باشد، یا input را داخل label بگذارید. placeholder جایگزین label نیست.",
      "`for` must match the input `id`, or wrap the input inside the label. A placeholder is not a label substitute.",
    ],
  },
  {
    id: "html-viewport-01",
    level: "junior",
    tags: ["responsive"],
    q: ["`<meta name=\"viewport\" content=\"width=device-width\">` چرا لازم است؟", "Why is `<meta name=\"viewport\" content=\"width=device-width\">` needed?"],
    options: [
      ["تا موبایل صفحه را با عرض واقعی دستگاه رندر کند نه عرض دسکتاپ", "So mobile renders at device width, not a desktop width"],
      ["برای SEO در گوگل الزامی است و کار دیگری نمی‌کند", "It's only a Google SEO requirement"],
      ["سرعت شبکه را بالا می‌برد", "It speeds up the network"],
      ["dark mode را فعال می‌کند", "It enables dark mode"],
    ],
    a: [
      "بدون آن، موبایل صفحه را با عرض حدود ۹۸۰px رندر و کوچک می‌کند و media queryها درست کار نمی‌کنند.",
      "Without it, mobile renders at ~980px and zooms out, so media queries misbehave.",
    ],
  },
  // Middle
  {
    id: "css-stacking-context-01",
    level: "middle",
    tags: ["z-index"],
    q: ["کدام ویژگی stacking context جدید می‌سازد؟", "Which property creates a new stacking context?"],
    options: [
      ["`transform` با مقدار غیر از none", "`transform` other than none"],
      ["`color`", "`color`"],
      ["`margin`", "`margin`"],
      ["`font-size`", "`font-size`"],
    ],
    a: [
      "`opacity < 1`، `transform`، `filter`، `isolation: isolate` و position با z-index همگی stacking context می‌سازند. z-index فرزند نمی‌تواند از context والدش بیرون بزند.",
      "`opacity < 1`, `transform`, `filter`, `isolation: isolate`, and positioned z-index all create one. A child's z-index can't escape its parent's context.",
    ],
  },
  {
    id: "css-sticky-01",
    level: "middle",
    tags: ["positioning"],
    q: ["`position: sticky` چگونه رفتار می‌کند؟", "How does `position: sticky` behave?"],
    options: [
      ["تا رسیدن به آستانه relative است و بعد داخل والدش fixed می‌شود", "Relative until a threshold, then fixed within its container"],
      ["همیشه نسبت به viewport fixed است", "Always fixed to the viewport"],
      ["مثل absolute از جریان خارج می‌شود", "Leaves flow like absolute"],
      ["فقط در جدول کار می‌کند", "Only works in tables"],
    ],
    a: [
      "به `top` (یا مشابه) نیاز دارد. اگر یکی از والدها `overflow: hidden` داشته باشد، sticky معمولاً کار نمی‌کند.",
      "It needs `top` (or similar). An ancestor with `overflow: hidden` usually breaks it.",
    ],
  },
  {
    id: "css-pseudo-01",
    level: "middle",
    tags: ["selectors"],
    q: ["تفاوت `:hover` و `::before`؟", "Difference between `:hover` and `::before`?"],
    options: [
      ["`:hover` یک pseudo-class (حالت) است؛ `::before` یک pseudo-element (عنصر مجازی)", "`:hover` is a pseudo-class (state); `::before` is a pseudo-element"],
      ["هر دو pseudo-element هستند", "Both are pseudo-elements"],
      ["`::before` فقط با JavaScript کار می‌کند", "`::before` only works with JavaScript"],
      ["`:hover` محتوا اضافه می‌کند", "`:hover` inserts content"],
    ],
    a: [
      "Pseudo-elementها مثل `::before`/`::after` برای نمایش به `content` نیاز دارند و بخشی از DOM واقعی نیستند.",
      "Pseudo-elements like `::before`/`::after` need `content` to render and aren't part of the real DOM.",
    ],
  },
  {
    id: "html-defer-async-01",
    level: "middle",
    tags: ["performance", "scripts"],
    q: ["تفاوت `defer` و `async` روی `<script>`؟", "Difference between `defer` and `async` on `<script>`?"],
    options: [
      ["`defer` بعد از parse و به ترتیب اجرا می‌شود؛ `async` به محض دانلود و بی‌ترتیب", "`defer` runs in order after parsing; `async` runs on download, unordered"],
      ["هر دو parse HTML را مسدود می‌کنند", "Both block HTML parsing"],
      ["`async` همیشه بعد از `DOMContentLoaded` اجرا می‌شود", "`async` always runs after `DOMContentLoaded`"],
      ["هیچ تفاوتی ندارند", "No difference"],
    ],
    a: [
      "اسکریپت‌های وابسته به DOM یا وابسته به هم → `defer`. اسکریپت‌های مستقل مثل analytics → `async`. ماژول‌ها به‌صورت پیش‌فرض defer هستند.",
      "DOM-dependent or interdependent scripts → `defer`. Independent ones like analytics → `async`. Modules defer by default.",
    ],
  },
  {
    id: "html-srcset-01",
    level: "middle",
    tags: ["images", "responsive"],
    q: ["`srcset` و `sizes` روی `<img>` چه کاری انجام می‌دهند؟", "What do `srcset` and `sizes` on `<img>` do?"],
    options: [
      ["مرورگر تصویر مناسب را بر اساس اندازه نمایش و تراکم پیکسل انتخاب می‌کند", "Let the browser pick the best image for display size and pixel density"],
      ["همه تصاویر را با هم دانلود می‌کنند", "Download all images at once"],
      ["تصویر را lazy-load می‌کنند", "Lazy-load the image"],
      ["فرمت تصویر را تبدیل می‌کنند", "Convert the image format"],
    ],
    a: [
      "این کار حجم دانلود موبایل را کم می‌کند. برای تغییر کراپ یا فرمت در اندازه‌های مختلف از `<picture>` استفاده کنید.",
      "This cuts mobile download size. Use `<picture>` for art direction or format switching.",
    ],
  },
  {
    id: "css-custom-properties-01",
    level: "middle",
    tags: ["variables"],
    q: ["مزیت CSS custom properties (`--x`) نسبت به متغیرهای Sass؟", "Advantage of CSS custom properties (`--x`) over Sass variables?"],
    options: [
      ["در runtime زنده‌اند، cascade می‌شوند و با JS قابل تغییرند", "Live at runtime, cascade, and can change via JS"],
      ["در زمان build حذف می‌شوند", "They are removed at build time"],
      ["فقط در IE کار می‌کنند", "They only work in IE"],
      ["از specificity پیروی نمی‌کنند", "They ignore specificity"],
    ],
    a: [
      "متغیرهای Sass در compile جایگزین می‌شوند و بعد وجود ندارند. custom properties برای theme (مثل dark mode) ایده‌آل هستند.",
      "Sass variables are replaced at compile time and vanish. Custom properties are ideal for theming like dark mode.",
    ],
  },
  // Senior
  {
    id: "css-content-visibility-01",
    level: "senior",
    tags: ["performance"],
    q: ["`content-visibility: auto` چه کمکی می‌کند؟", "How does `content-visibility: auto` help?"],
    options: [
      ["رندر محتوای خارج از صفحه را تا نزدیک شدن به viewport به تعویق می‌اندازد", "Skips rendering off-screen content until it nears the viewport"],
      ["محتوا را از DOM حذف می‌کند", "Removes content from the DOM"],
      ["تصاویر را فشرده می‌کند", "Compresses images"],
      ["JavaScript را غیرفعال می‌کند", "Disables JavaScript"],
    ],
    a: [
      "برای صفحات طولانی هزینه layout و paint را کم می‌کند. با `contain-intrinsic-size` جای تقریبی را نگه دارید تا اسکرول نپرد.",
      "Cuts layout/paint cost on long pages. Pair with `contain-intrinsic-size` to reserve space and avoid scroll jumps.",
    ],
  },
  {
    id: "css-will-change-01",
    level: "senior",
    tags: ["performance"],
    q: ["خطر استفاده زیاد از `will-change` چیست؟", "What is the risk of overusing `will-change`?"],
    options: [
      ["لایه‌های اضافه و مصرف زیاد حافظه GPU", "Extra layers and high GPU memory use"],
      ["حذف استایل‌ها", "Styles get removed"],
      ["خطای syntax در مرورگر", "Browser syntax errors"],
      ["هیچ خطری ندارد", "No risk at all"],
    ],
    a: [
      "`will-change` یک hint است. فقط روی عنصری که واقعاً به‌زودی انیمیت می‌شود و موقت بگذارید، نه روی همه عناصر.",
      "`will-change` is a hint. Apply it only to elements about to animate, ideally temporarily: not everywhere.",
    ],
  },
  {
    id: "css-has-01",
    level: "senior",
    tags: ["selectors"],
    q: ["selector `:has()` چه امکانی می‌دهد؟", "What does the `:has()` selector enable?"],
    options: [
      ["انتخاب والد بر اساس فرزندان یا عناصر بعدی", "Selecting a parent based on its children or following elements"],
      ["فقط انتخاب فرزند اول", "Selecting only the first child"],
      ["اجرای JavaScript داخل CSS", "Running JavaScript inside CSS"],
      ["import فایل CSS دیگر", "Importing another CSS file"],
    ],
    a: [
      "مثال: `.card:has(img)` یا `form:has(:invalid)`. خیلی از کارهایی که قبلاً JS لازم داشت را با CSS ممکن می‌کند.",
      "Example: `.card:has(img)` or `form:has(:invalid)`. It replaces many JS-only styling tricks.",
    ],
  },
  {
    id: "css-layers-01",
    level: "senior",
    tags: ["cascade"],
    q: ["`@layer` در CSS چه مشکلی را حل می‌کند؟", "What problem does `@layer` solve?"],
    options: [
      ["کنترل ترتیب cascade مستقل از specificity", "Controls cascade order independent of specificity"],
      ["بارگذاری تنبل فایل CSS", "Lazy-loads CSS files"],
      ["ساخت stacking context", "Creates stacking contexts"],
      ["تعریف انیمیشن", "Defines animations"],
    ],
    a: [
      "استایل‌های لایه بعدی برنده‌اند حتی با specificity کمتر. برای جدا کردن reset، کتابخانه‌ها و استایل اپ بسیار مفید است (Tailwind v4 از آن استفاده می‌کند).",
      "Later layers win even with lower specificity. Great for separating resets, libraries, and app styles (Tailwind v4 uses it).",
    ],
  },
  {
    id: "html-preload-01",
    level: "senior",
    tags: ["performance"],
    q: ["`<link rel=\"preload\">` برای چیست؟", "What is `<link rel=\"preload\">` for?"],
    options: [
      ["دانلود زودهنگام و با اولویت بالای منبع حیاتی صفحه فعلی", "Early, high-priority fetch of a critical resource for this page"],
      ["دانلود صفحه بعدی در پس‌زمینه", "Fetching the next page in the background"],
      ["کش کردن دائمی فایل", "Permanently caching a file"],
      ["اجرای فوری اسکریپت", "Executing a script immediately"],
    ],
    a: [
      "برای فونت، تصویر LCP یا CSS حیاتی مناسب است. `prefetch` برای ناوبری‌های آینده با اولویت پایین است. preload استفاده‌نشده پهنای باند هدر می‌دهد.",
      "Good for fonts, the LCP image, or critical CSS. `prefetch` is low-priority for future navigations. Unused preloads waste bandwidth.",
    ],
  },
  {
    id: "css-cls-01",
    level: "senior",
    tags: ["performance", "web-vitals"],
    q: ["بهترین راه جلوگیری از CLS برای تصاویر؟", "Best way to prevent CLS from images?"],
    options: [
      ["تعیین `width`/`height` یا `aspect-ratio` برای رزرو فضا", "Set `width`/`height` or `aspect-ratio` to reserve space"],
      ["لود تصاویر بعد از ۵ ثانیه", "Load images after 5 seconds"],
      ["استفاده از `display: none`", "Use `display: none`"],
      ["حذف همه تصاویر", "Remove all images"],
    ],
    a: [
      "مرورگر قبل از دانلود تصویر فضای آن را رزرو می‌کند. همین اصل برای تبلیغات، embedها و فونت‌ها (`font-display` و fallback مشابه) صدق می‌کند.",
      "The browser reserves space before the image arrives. Same idea for ads, embeds, and fonts (`font-display` and matched fallbacks).",
    ],
  },
]);
