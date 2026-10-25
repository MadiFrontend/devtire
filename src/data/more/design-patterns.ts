import { build } from "../build";

export const designPatternsMore = build("design-patterns", [
  // Junior
  {
    id: "dp-dry-01",
    level: "junior",
    tags: ["principles"],
    q: ["اصل DRY یعنی چه؟", "What does DRY mean?"],
    options: [
      ["Don't Repeat Yourself: هر دانش یک نمایش واحد داشته باشد", "Don't Repeat Yourself: each piece of knowledge has one representation"],
      ["Do Repeat Yourself", "Do Repeat Yourself"],
      ["کد را هرگز تست نکن", "Never test code"],
      ["همه چیز را در یک فایل بنویس", "Write everything in one file"],
    ],
    a: [
      "اما abstraction زودهنگام هم بد است؛ قاعده رایج این است که بعد از سومین تکرار abstraction بسازید (rule of three).",
      "Premature abstraction is also bad; a common heuristic is to abstract on the third repetition (rule of three).",
    ],
  },
  {
    id: "dp-srp-01",
    level: "junior",
    tags: ["solid"],
    q: ["Single Responsibility Principle در کامپوننت‌ها یعنی چه؟", "What does the Single Responsibility Principle mean for components?"],
    options: [
      ["هر کامپوننت/ماژول یک دلیل برای تغییر داشته باشد", "Each component/module has one reason to change"],
      ["هر کامپوننت فقط یک خط کد داشته باشد", "Each component has one line of code"],
      ["فقط یک کامپوننت در اپ", "Only one component in the app"],
      ["هر کامپوننت فقط یک prop بگیرد", "Each component takes one prop"],
    ],
    a: [
      "مثلاً fetch داده، منطق فرم و نمایش را از هم جدا کنید (custom hook + کامپوننت نمایشی).",
      "E.g. separate data fetching, form logic, and display (custom hook + presentational component).",
    ],
  },
  {
    id: "dp-container-presentational-01",
    level: "junior",
    tags: ["components"],
    q: ["الگوی Container/Presentational چیست؟", "What is the Container/Presentational pattern?"],
    options: [
      ["Container داده و منطق را مدیریت می‌کند؛ Presentational فقط UI را از props رندر می‌کند", "Containers handle data/logic; presentational components render UI from props"],
      ["همه کامپوننت‌ها داده را خودشان fetch می‌کنند", "Every component fetches its own data"],
      ["فقط برای class component", "Class components only"],
      ["الگوی مخصوص CSS", "A CSS-only pattern"],
    ],
    a: [
      "امروز custom hookها اغلب نقش container را دارند. کامپوننت‌های نمایشی راحت‌تر تست می‌شوند و در Storybook استفاده می‌شوند.",
      "Today custom hooks often play the container role. Presentational components are easier to test and use in Storybook.",
    ],
  },
  {
    id: "dp-singleton-01",
    level: "junior",
    tags: ["creational"],
    q: ["الگوی Singleton چیست؟", "What is the Singleton pattern?"],
    options: [
      ["تضمین اینکه از یک کلاس/ماژول فقط یک نمونه وجود دارد", "Ensuring only one instance of a class/module exists"],
      ["یک کامپوننت که فقط یک بار رندر می‌شود", "A component that renders once"],
      ["آرایه‌ای با یک عضو", "An array with one item"],
      ["تابعی بدون پارامتر", "A function with no parameters"],
    ],
    a: [
      "ماژول‌های ES به‌طور طبیعی singleton هستند (مثلاً یک API client مشترک). در SSR مراقب باشید که state بین requestها share نشود.",
      "ES modules are naturally singletons (e.g. a shared API client). In SSR, beware of state shared between requests.",
    ],
  },
  {
    id: "dp-factory-01",
    level: "junior",
    tags: ["creational"],
    q: ["Factory function چه کاری انجام می‌دهد؟", "What does a factory function do?"],
    options: [
      ["object می‌سازد و جزئیات ساخت را پنهان می‌کند", "Creates objects and hides construction details"],
      ["object را حذف می‌کند", "Deletes objects"],
      ["فقط کلاس‌ها را کپی می‌کند", "Only copies classes"],
      ["CSS تولید می‌کند", "Generates CSS"],
    ],
    a: [
      "مثال: `createLogger({ level })`. بدون `new` کار می‌کند و با closure می‌تواند state خصوصی داشته باشد.",
      "Example: `createLogger({ level })`. No `new` needed, and closures can hold private state.",
    ],
  },
  {
    id: "dp-module-pattern-01",
    level: "junior",
    tags: ["encapsulation"],
    q: ["مزیت Module pattern چیست؟", "What does the Module pattern offer?"],
    options: [
      ["کپسوله‌سازی: فقط API عمومی export می‌شود و بقیه خصوصی می‌ماند", "Encapsulation: only a public API is exported, the rest stays private"],
      ["همه متغیرها global می‌شوند", "All variables become global"],
      ["سرعت شبکه بالاتر", "Faster network"],
      ["حذف نیاز به import", "No need for imports"],
    ],
    a: [
      "قبلاً با IIFE و closure پیاده می‌شد؛ امروز ES modules همین کار را به‌صورت بومی انجام می‌دهند.",
      "It used to be done with IIFEs and closures; ES modules now do it natively.",
    ],
  },
  // Middle
  {
    id: "dp-hooks-vs-hoc-01",
    level: "middle",
    tags: ["hooks"],
    q: ["چرا custom hook در اغلب موارد جایگزین HOC شده است؟", "Why have custom hooks mostly replaced HOCs?"],
    options: [
      ["wrapper hell و تداخل نام props را ندارد و ترکیب ساده‌تر است", "No wrapper hell or prop-name collisions, and simpler composition"],
      ["HOC در React 19 حذف شده است", "HOCs were removed in React 19"],
      ["hookها روی سرور اجرا نمی‌شوند", "Hooks don't run on the server"],
      ["HOC باعث خطای TypeScript می‌شود", "HOCs always cause TS errors"],
    ],
    a: [
      "HOCها هنوز کار می‌کنند و برای مواردی مثل wrap کردن کامپوننت‌های third-party مفیدند، ولی hookها شفاف‌ترند.",
      "HOCs still work and help when wrapping third-party components, but hooks are more transparent.",
    ],
  },
  {
    id: "dp-strategy-01",
    level: "middle",
    tags: ["behavioral"],
    q: ["الگوی Strategy چیست؟", "What is the Strategy pattern?"],
    options: [
      ["الگوریتم‌های قابل تعویض پشت یک interface مشترک (مثل validatorها)", "Interchangeable algorithms behind a common interface (e.g. validators)"],
      ["یک if/else بزرگ برای همه حالت‌ها", "One big if/else for every case"],
      ["الگوی ساخت object", "An object-creation pattern"],
      ["الگوی مسیریابی", "A routing pattern"],
    ],
    a: [
      "مثال: `const sorters = { price: byPrice, name: byName }` و انتخاب بر اساس کلید. افزودن حالت جدید نیازی به تغییر کد موجود ندارد.",
      "Example: `const sorters = { price: byPrice, name: byName }` and pick by key. Adding a case doesn't touch existing code.",
    ],
  },
  {
    id: "dp-adapter-01",
    level: "middle",
    tags: ["structural"],
    q: ["کاربرد Adapter در فرانت چیست؟", "What is the Adapter pattern used for on the frontend?"],
    options: [
      ["تبدیل shape پاسخ API به مدل مورد نیاز اپ", "Converting API response shapes into the app's model"],
      ["اتصال شارژر به لپ‌تاپ", "Plugging in a laptop charger"],
      ["رندر سریع‌تر لیست", "Faster list rendering"],
      ["ساخت انیمیشن", "Building animations"],
    ],
    a: [
      "اگر API عوض شود فقط adapter تغییر می‌کند نه همه کامپوننت‌ها. مثلاً تبدیل `snake_case` به `camelCase` و تاریخ رشته‌ای به `Date`.",
      "If the API changes, only the adapter changes: not every component. E.g. `snake_case` → `camelCase`, string dates → `Date`.",
    ],
  },
  {
    id: "dp-facade-01",
    level: "middle",
    tags: ["structural"],
    q: ["الگوی Facade چیست؟", "What is the Facade pattern?"],
    options: [
      ["interface ساده روی یک زیرسیستم پیچیده", "A simple interface over a complex subsystem"],
      ["کپی کامل یک کلاس", "A full class copy"],
      ["الگوی تست", "A testing pattern"],
      ["یک نوع کش", "A type of cache"],
    ],
    a: [
      "مثال: ماژول `analytics.track(event)` که جزئیات چند ابزار tracking را پنهان می‌کند.",
      "Example: an `analytics.track(event)` module hiding several tracking tools.",
    ],
  },
  {
    id: "dp-provider-01",
    level: "middle",
    tags: ["context"],
    q: ["الگوی Provider در React چیست؟", "What is the Provider pattern in React?"],
    options: [
      ["یک کامپوننت بالادستی مقدار را از طریق Context به همه زیردرخت می‌دهد", "An upstream component supplies values to its subtree via Context"],
      ["هر کامپوننت داده را از سرور می‌گیرد", "Each component fetches from the server"],
      ["الگوی ساخت route", "A routing pattern"],
      ["یک نوع HOC اجباری", "A mandatory HOC type"],
    ],
    a: [
      "Theme، auth، i18n و QueryClient نمونه‌های رایج هستند. یک hook مثل `useTheme()` دسترسی را تمیزتر می‌کند.",
      "Theme, auth, i18n, and QueryClient are common examples. A hook like `useTheme()` makes access cleaner.",
    ],
  },
  {
    id: "dp-pubsub-01",
    level: "middle",
    tags: ["behavioral"],
    q: ["تفاوت Pub/Sub با Observer کلاسیک؟", "How does Pub/Sub differ from classic Observer?"],
    options: [
      ["در Pub/Sub یک broker/channel واسط است و ناشر و مشترک همدیگر را نمی‌شناسند", "Pub/Sub uses a broker/channel so publishers and subscribers don't know each other"],
      ["هیچ تفاوتی ندارند", "No difference"],
      ["Observer فقط در سرور است", "Observer is server-only"],
      ["Pub/Sub همگام اجباری است", "Pub/Sub must be synchronous"],
    ],
    a: [
      "در Observer، subject مستقیماً لیست observerها را نگه می‌دارد. Pub/Sub decoupling بیشتری دارد ولی دنبال کردن جریان را سخت‌تر می‌کند.",
      "In Observer, the subject holds observers directly. Pub/Sub decouples more but makes flow harder to trace.",
    ],
  },
  // Senior
  {
    id: "dp-headless-01",
    level: "senior",
    tags: ["components"],
    q: ["کامپوننت headless (مثل Radix یا TanStack Table) چیست؟", "What is a headless component (like Radix or TanStack Table)?"],
    options: [
      ["منطق، state و a11y را بدون استایل یا markup ثابت فراهم می‌کند", "Provides logic, state, and a11y without fixed styles or markup"],
      ["کامپوننتی که فقط روی سرور رندر می‌شود", "A server-only component"],
      ["کامپوننت بدون props", "A component with no props"],
      ["کامپوننتی که فقط `<head>` را تغییر می‌دهد", "A component that only edits `<head>`"],
    ],
    a: [
      "کنترل کامل ظاهر در دست شماست و رفتار پیچیده (کیبورد، فوکوس، ARIA) از قبل حل شده است. shadcn/ui روی Radix ساخته شده.",
      "You fully own the look while complex behavior (keyboard, focus, ARIA) is solved. shadcn/ui builds on Radix.",
    ],
  },
  {
    id: "dp-command-01",
    level: "senior",
    tags: ["behavioral"],
    q: ["الگوی Command برای پیاده‌سازی چه قابلیتی عالی است؟", "The Command pattern is great for implementing what?"],
    options: [
      ["Undo/Redo و صف عملیات", "Undo/redo and operation queues"],
      ["استایل‌دهی responsive", "Responsive styling"],
      ["مسیریابی", "Routing"],
      ["فشرده‌سازی تصویر", "Image compression"],
    ],
    a: [
      "هر عملیات یک object با `execute` و `undo` است. می‌توان آن‌ها را ذخیره، تکرار یا لاگ کرد (مثل ادیتورها و command palette).",
      "Each operation is an object with `execute` and `undo`, so it can be stored, replayed, or logged (editors, command palettes).",
    ],
  },
  {
    id: "dp-open-closed-01",
    level: "senior",
    tags: ["solid"],
    q: ["Open/Closed Principle چه می‌گوید؟", "What does the Open/Closed Principle say?"],
    options: [
      ["برای توسعه باز و برای تغییر بسته: رفتار جدید بدون تغییر کد موجود", "Open for extension, closed for modification: add behavior without editing existing code"],
      ["کد باید open-source باشد", "Code must be open source"],
      ["فایل‌ها نباید بسته شوند", "Files must never be closed"],
      ["هیچ کلاسی نباید ارث‌بری کند", "No class may be inherited"],
    ],
    a: [
      "در React: به‌جای اضافه کردن prop بولی برای هر حالت جدید، از `children`، slot یا render prop استفاده کنید.",
      "In React: instead of a boolean prop per variant, use `children`, slots, or render props.",
    ],
  },
  {
    id: "dp-ioc-01",
    level: "senior",
    tags: ["components"],
    q: ["Inversion of Control در طراحی کامپوننت یعنی چه؟", "What does Inversion of Control mean in component design?"],
    options: [
      ["کنترل رندر یا رفتار به مصرف‌کننده داده می‌شود (slots، render props، state reducer)", "Rendering/behavior control is handed to the consumer (slots, render props, state reducer)"],
      ["کامپوننت همه تصمیم‌ها را داخلی می‌گیرد", "The component decides everything internally"],
      ["معکوس کردن ترتیب رندر", "Reversing render order"],
      ["حذف props", "Removing props"],
    ],
    a: [
      "به‌جای ده‌ها prop پیکربندی، مصرف‌کننده بخش‌ها را خودش تأمین می‌کند. این کار از «prop explosion» جلوگیری می‌کند.",
      "Instead of dozens of config props, consumers provide the pieces. This prevents prop explosion.",
    ],
  },
  {
    id: "dp-acl-01",
    level: "senior",
    tags: ["architecture"],
    q: ["Anti-Corruption Layer در فرانت چه نقشی دارد؟", "What role does an Anti-Corruption Layer play on the frontend?"],
    options: [
      ["جدا کردن مدل داخلی اپ از مدل‌ها و ناهماهنگی‌های API خارجی", "Isolating the app's model from external API models and quirks"],
      ["آنتی‌ویروس مرورگر", "A browser antivirus"],
      ["فشرده‌سازی bundle", "Bundle compression"],
      ["لایه CSS reset", "A CSS reset layer"],
    ],
    a: [
      "یک لایه service/adapter بین API و UI قرار می‌گیرد تا تغییرات یا طراحی ضعیف API به کل کدبیس نشت نکند.",
      "A service/adapter layer sits between API and UI so API changes or poor design don't leak through the codebase.",
    ],
  },
  {
    id: "dp-plugin-01",
    level: "senior",
    tags: ["architecture"],
    q: ["مزیت معماری plugin (مثل Vite یا ESLint) چیست؟", "What is the benefit of a plugin architecture (like Vite or ESLint)?"],
    options: [
      ["هسته کوچک می‌ماند و قابلیت‌ها از طریق hookهای مشخص اضافه می‌شوند", "A small core with features added through defined hooks"],
      ["همه قابلیت‌ها در هسته hard-code می‌شوند", "Every feature is hard-coded in the core"],
      ["نیازی به API ندارد", "No API needed"],
      ["فقط برای بک‌اند است", "Backend only"],
    ],
    a: [
      "یک قرارداد پایدار (lifecycle hooks) تعریف می‌شود و بقیه مستقل توسعه می‌دهند. ریسک: نسخه‌بندی و سازگاری pluginها.",
      "A stable contract (lifecycle hooks) lets others extend independently. Risk: plugin versioning and compatibility.",
    ],
  },
]);
