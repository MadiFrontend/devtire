import { build } from "../build";

export const nextjsMore = build("nextjs", [
  // Junior
  {
    id: "next-dynamic-route-01",
    level: "junior",
    tags: ["routing"],
    q: ["برای مسیر `/blog/my-post` در App Router کدام ساختار درست است؟", "Which structure serves `/blog/my-post` in the App Router?"],
    options: [
      ["`app/blog/[slug]/page.tsx`", "`app/blog/[slug]/page.tsx`"],
      ["`app/blog/slug.tsx`", "`app/blog/slug.tsx`"],
      ["`pages/blog/:slug.tsx`", "`pages/blog/:slug.tsx`"],
      ["`app/blog/{slug}/index.tsx`", "`app/blog/{slug}/index.tsx`"],
    ],
    a: [
      "پوشه با براکت segment پویا است و مقدار آن در `params.slug` می‌آید. `[...slug]` همه segmentهای بعدی را می‌گیرد.",
      "A bracketed folder is a dynamic segment; its value is `params.slug`. `[...slug]` catches all remaining segments.",
    ],
  },
  {
    id: "next-layout-01",
    level: "junior",
    tags: ["layouts"],
    q: ["ویژگی `layout.tsx` چیست؟", "What is special about `layout.tsx`?"],
    options: [
      ["UI مشترک که هنگام ناوبری بین صفحات فرزند حفظ می‌شود و دوباره رندر نمی‌شود", "Shared UI preserved across child navigations without re-rendering"],
      ["در هر ناوبری کاملاً remount می‌شود", "Fully remounts on every navigation"],
      ["فقط برای صفحه 404 است", "Only for the 404 page"],
      ["جایگزین `page.tsx` است", "Replaces `page.tsx`"],
    ],
    a: [
      "Layout state خود را حفظ می‌کند. اگر remount در هر ناوبری لازم است از `template.tsx` استفاده کنید.",
      "Layouts keep their state. Use `template.tsx` if you need a remount per navigation.",
    ],
  },
  {
    id: "next-public-01",
    level: "junior",
    tags: ["assets"],
    q: ["فایل `public/logo.png` با چه آدرسی در دسترس است؟", "At what URL is `public/logo.png` served?"],
    options: [
      ["`/logo.png`", "`/logo.png`"],
      ["`/public/logo.png`", "`/public/logo.png`"],
      ["`/static/logo.png`", "`/static/logo.png`"],
      ["`/assets/logo.png`", "`/assets/logo.png`"],
    ],
    a: [
      "محتوای `public` از ریشه سایت سرو می‌شود. برای تصاویر داخل کامپوننت‌ها `next/image` بهینه‌سازی بیشتری می‌دهد.",
      "`public` contents are served from the site root. Use `next/image` for optimized component images.",
    ],
  },
  {
    id: "next-metadata-01",
    level: "junior",
    tags: ["seo"],
    q: ["در App Router عنوان و توضیحات صفحه چگونه تنظیم می‌شود؟", "How do you set the page title/description in the App Router?"],
    options: [
      ["با export کردن `metadata` یا `generateMetadata` از page/layout", "Export `metadata` or `generateMetadata` from a page/layout"],
      ["فقط با `next/head`", "Only with `next/head`"],
      ["با `document.title` در useEffect", "With `document.title` in useEffect"],
      ["در `next.config.ts`", "In `next.config.ts`"],
    ],
    a: [
      "Metadata روی سرور تولید می‌شود و در HTML اولیه قرار می‌گیرد که برای SEO مهم است. `next/head` مخصوص Pages Router است.",
      "Metadata is generated on the server into the initial HTML: key for SEO. `next/head` is for the Pages Router.",
    ],
  },
  {
    id: "next-use-client-01",
    level: "junior",
    tags: ["rsc"],
    q: ["دستور `\"use client\"` چه کاری انجام می‌دهد؟", "What does the `\"use client\"` directive do?"],
    options: [
      ["مرز Client Component را مشخص می‌کند تا hooks و event کار کنند", "Marks a Client Component boundary so hooks/events work"],
      ["کامپوننت را فقط در مرورگر و بدون SSR اجرا می‌کند", "Runs the component only in the browser, never SSR"],
      ["کامپوننت را private می‌کند", "Makes the component private"],
      ["API route می‌سازد", "Creates an API route"],
    ],
    a: [
      "Client Componentها هم روی سرور pre-render می‌شوند و سپس hydrate می‌شوند. هر چیزی که این فایل import کند هم بخشی از bundle کلاینت می‌شود.",
      "Client Components are still pre-rendered on the server, then hydrated. Everything the file imports joins the client bundle.",
    ],
  },
  {
    id: "next-loading-01",
    level: "junior",
    tags: ["suspense"],
    q: ["فایل `loading.tsx` چه کاری انجام می‌دهد؟", "What does `loading.tsx` do?"],
    options: [
      ["UI لودینگ فوری هنگام آماده شدن segment (با Suspense)", "Instant loading UI while the segment loads (via Suspense)"],
      ["فایل‌ها را preload می‌کند", "Preloads files"],
      ["خطاها را مدیریت می‌کند", "Handles errors"],
      ["سرعت build را بالا می‌برد", "Speeds up builds"],
    ],
    a: [
      "Next محتوای page را خودکار داخل `<Suspense fallback={<Loading />}>` می‌گذارد. Layout در این حالت تعاملی باقی می‌ماند.",
      "Next wraps the page in `<Suspense fallback={<Loading />}>`. The layout stays interactive meanwhile.",
    ],
  },
  // Middle
  {
    id: "next-generate-static-params-01",
    level: "middle",
    tags: ["ssg"],
    q: ["`generateStaticParams` چه کاری انجام می‌دهد؟", "What does `generateStaticParams` do?"],
    options: [
      ["مسیرهای پویا را در زمان build از پیش رندر می‌کند", "Pre-renders dynamic routes at build time"],
      ["query string را parse می‌کند", "Parses query strings"],
      ["متغیرهای محیطی تولید می‌کند", "Generates env variables"],
      ["مسیرها را در runtime حذف می‌کند", "Removes routes at runtime"],
    ],
    a: [
      "لیست paramها را برمی‌گرداند (مثلاً همه slugها). مسیرهای خارج از لیست بسته به `dynamicParams` در زمان request رندر می‌شوند یا 404 می‌دهند.",
      "Returns a param list (e.g. all slugs). Others render on demand or 404 depending on `dynamicParams`.",
    ],
  },
  {
    id: "next-server-actions-01",
    level: "middle",
    tags: ["server-actions"],
    q: ["Server Action چیست؟", "What is a Server Action?"],
    options: [
      ["تابع async با `\"use server\"` که روی سرور اجرا و از فرم/کلاینت صدا زده می‌شود", "An async `\"use server\"` function run on the server, callable from forms/clients"],
      ["یک کامپوننت سرور", "A Server Component"],
      ["middleware جدید", "A new middleware"],
      ["تابعی که فقط در build اجرا می‌شود", "A build-time-only function"],
    ],
    a: [
      "Server Actionها endpoint عمومی هستند؛ همیشه ورودی را validate و auth را بررسی کنید. با `revalidatePath` داده را تازه کنید.",
      "Server Actions are public endpoints: always validate input and check auth. Refresh data with `revalidatePath`.",
    ],
  },
  {
    id: "next-error-file-01",
    level: "middle",
    tags: ["errors"],
    q: ["کدام درباره `error.tsx` درست است؟", "Which is true about `error.tsx`?"],
    options: [
      ["باید Client Component باشد و برای segment خود error boundary است", "Must be a Client Component and acts as the segment's error boundary"],
      ["باید Server Component باشد", "Must be a Server Component"],
      ["خطاهای layout همان segment را هم می‌گیرد", "Catches errors in the same segment's layout"],
      ["فقط برای 404 است", "Only for 404s"],
    ],
    a: [
      "`error.tsx` تابع `reset` دریافت می‌کند. برای خطای layout ریشه از `global-error.tsx` استفاده کنید.",
      "`error.tsx` receives a `reset` function. Use `global-error.tsx` for root layout errors.",
    ],
  },
  {
    id: "next-route-groups-01",
    level: "middle",
    tags: ["routing"],
    q: ["پوشه `(marketing)` در App Router چه اثری دارد؟", "What does a `(marketing)` folder do in the App Router?"],
    options: [
      ["route group است: سازمان‌دهی و layout جدا بدون تأثیر روی URL", "A route group: organizes and allows separate layouts without affecting the URL"],
      ["segment `/marketing` به URL اضافه می‌کند", "Adds `/marketing` to the URL"],
      ["مسیر را private می‌کند", "Makes the route private"],
      ["مسیر را حذف می‌کند", "Removes the route"],
    ],
    a: [
      "مثلاً `(shop)` و `(auth)` می‌توانند layoutهای کاملاً متفاوت داشته باشند. پوشه‌های با پیشوند `_` هم private هستند و route نمی‌سازند.",
      "E.g. `(shop)` and `(auth)` can have different layouts. Folders prefixed with `_` are private and don't create routes.",
    ],
  },
  {
    id: "next-not-found-01",
    level: "middle",
    tags: ["errors"],
    q: ["وقتی محصولی در دیتابیس پیدا نشد، روش درست در Server Component چیست؟", "When a product isn't found, what's the right move in a Server Component?"],
    options: [
      ["صدا زدن `notFound()` از `next/navigation`", "Call `notFound()` from `next/navigation`"],
      ["برگرداندن `null`", "Return `null`"],
      ["`throw new Error(\"404\")`", "`throw new Error(\"404\")`"],
      ["`window.location = \"/404\"`", "`window.location = \"/404\"`"],
    ],
    a: [
      "`notFound()` نزدیک‌ترین `not-found.tsx` را رندر می‌کند و status 404 برمی‌گرداند که برای SEO درست است.",
      "`notFound()` renders the nearest `not-found.tsx` with a 404 status: correct for SEO.",
    ],
  },
  {
    id: "next-env-01",
    level: "middle",
    tags: ["config"],
    q: ["کدام متغیر محیطی در مرورگر در دسترس است؟", "Which env variable is available in the browser?"],
    options: [
      ["`NEXT_PUBLIC_API_URL`", "`NEXT_PUBLIC_API_URL`"],
      ["`API_SECRET`", "`API_SECRET`"],
      ["`DATABASE_URL`", "`DATABASE_URL`"],
      ["همه متغیرهای `.env`", "Every `.env` variable"],
    ],
    a: [
      "فقط متغیرهای با پیشوند `NEXT_PUBLIC_` در زمان build داخل bundle کلاینت جایگذاری می‌شوند. secretها را هرگز با این پیشوند نگذارید.",
      "Only `NEXT_PUBLIC_` variables are inlined into the client bundle at build. Never prefix secrets with it.",
    ],
  },
  // Senior
  {
    id: "next-parallel-routes-01",
    level: "senior",
    tags: ["routing"],
    q: ["Parallel routes (`@slot`) چه امکانی می‌دهند؟", "What do parallel routes (`@slot`) enable?"],
    options: [
      ["رندر هم‌زمان چند صفحه مستقل در یک layout (مثل داشبورد)", "Rendering multiple independent pages in one layout (e.g. dashboards)"],
      ["اجرای موازی build", "Parallel builds"],
      ["چند دامنه برای یک اپ", "Multiple domains per app"],
      ["رندر در Web Worker", "Rendering in a Web Worker"],
    ],
    a: [
      "هر slot به‌صورت prop به layout می‌رسد و loading/error مستقل دارد. `default.tsx` برای slotهای بدون match لازم است.",
      "Each slot arrives as a layout prop with its own loading/error. `default.tsx` handles unmatched slots.",
    ],
  },
  {
    id: "next-intercepting-01",
    level: "senior",
    tags: ["routing"],
    q: ["Intercepting routes (مثل `(.)photo`) معمولاً برای چه استفاده می‌شوند؟", "What are intercepting routes (like `(.)photo`) usually for?"],
    options: [
      ["نمایش مسیر به‌صورت مودال در ناوبری داخلی و صفحه کامل در رفرش", "Showing a route as a modal on soft nav and full page on refresh"],
      ["مسدود کردن درخواست‌های مخرب", "Blocking malicious requests"],
      ["redirect دائمی", "Permanent redirects"],
      ["ردیابی analytics", "Analytics tracking"],
    ],
    a: [
      "معمولاً با parallel routes ترکیب می‌شود (الگوی گالری عکس اینستاگرام). URL قابل اشتراک می‌ماند.",
      "Typically combined with parallel routes (the Instagram photo pattern). The URL stays shareable.",
    ],
  },
  {
    id: "next-edge-runtime-01",
    level: "senior",
    tags: ["runtime"],
    q: ["trade-off اصلی Edge runtime نسبت به Node runtime؟", "Main trade-off of Edge runtime vs Node runtime?"],
    options: [
      ["latency کمتر و cold start سریع، ولی API محدود (بدون بخشی از Node APIs)", "Lower latency and fast cold starts, but limited APIs (no full Node)"],
      ["دسترسی کامل به فایل‌سیستم", "Full filesystem access"],
      ["همیشه کندتر از Node", "Always slower than Node"],
      ["فقط برای فایل استاتیک", "Only for static files"],
    ],
    a: [
      "بسیاری از درایورهای دیتابیس و پکیج‌های native روی Edge کار نمی‌کنند. Node runtime برای منطق سنگین سرور مناسب‌تر است.",
      "Many DB drivers and native packages don't run on Edge. Node runtime suits heavy server logic.",
    ],
  },
  {
    id: "next-isr-01",
    level: "senior",
    tags: ["caching"],
    q: ["`export const revalidate = 60` روی یک صفحه چه اثری دارد؟", "What does `export const revalidate = 60` on a page do?"],
    options: [
      ["صفحه static است و حداکثر هر ۶۰ ثانیه در پس‌زمینه بازسازی می‌شود (ISR)", "The page is static and regenerates in the background at most every 60s (ISR)"],
      ["صفحه هر ۶۰ ثانیه برای کاربر رفرش می‌شود", "The page reloads for the user every 60s"],
      ["کش را ۶۰ روز نگه می‌دارد", "Caches for 60 days"],
      ["build را ۶۰ ثانیه به تأخیر می‌اندازد", "Delays the build by 60s"],
    ],
    a: [
      "اولین درخواست بعد از ۶۰ ثانیه هنوز نسخه قدیمی را می‌گیرد و بازسازی را شروع می‌کند (stale-while-revalidate). برای تازه‌سازی فوری از `revalidateTag` استفاده کنید.",
      "The first request after 60s still gets the old version and triggers regeneration (stale-while-revalidate). Use `revalidateTag` for on-demand refresh.",
    ],
  },
  {
    id: "next-waterfall-01",
    level: "senior",
    tags: ["performance", "data-fetching"],
    q: ["دو fetch مستقل در یک Server Component داریم. بهترین روش؟", "Two independent fetches in a Server Component: best approach?"],
    options: [
      ["هم‌زمان با `Promise.all` شروع شوند", "Start them together with `Promise.all`"],
      ["پشت سر هم با دو `await`", "Sequentially with two `await`s"],
      ["یکی را به کلاینت منتقل کنیم", "Move one to the client"],
      ["هر دو را در useEffect", "Both in useEffect"],
    ],
    a: [
      "دو `await` پشت سر هم waterfall می‌سازد و زمان‌ها جمع می‌شوند. اگر بخشی کند است، آن را در `Suspense` جدا کنید تا stream شود.",
      "Sequential `await`s create a waterfall that adds up. If one part is slow, isolate it in `Suspense` to stream.",
    ],
  },
  {
    id: "next-server-only-01",
    level: "senior",
    tags: ["security"],
    q: ["`import \"server-only\"` چه فایده‌ای دارد؟", "What does `import \"server-only\"` give you?"],
    options: [
      ["اگر ماژول در Client Component import شود، build خطا می‌دهد", "Build fails if the module is imported into a Client Component"],
      ["ماژول را سریع‌تر می‌کند", "Makes the module faster"],
      ["کد را رمزنگاری می‌کند", "Encrypts the code"],
      ["ماژول را فقط در Edge اجرا می‌کند", "Runs the module only on Edge"],
    ],
    a: [
      "از نشت تصادفی کلید API یا منطق دیتابیس به bundle کلاینت جلوگیری می‌کند. همتای آن `client-only` است.",
      "Prevents accidentally leaking API keys or DB logic into the client bundle. Its counterpart is `client-only`.",
    ],
  },
]);
