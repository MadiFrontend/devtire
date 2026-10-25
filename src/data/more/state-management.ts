import { build } from "../build";

export const stateManagementMore = build("state-management", [
  // Junior
  {
    id: "sm-prop-drilling-01",
    level: "junior",
    tags: ["props"],
    q: ["Prop drilling یعنی چه؟", "What is prop drilling?"],
    options: [
      ["عبور props از چند لایه کامپوننت که خودشان به آن نیازی ندارند", "Passing props through layers that don't need them"],
      ["حذف props بلااستفاده", "Removing unused props"],
      ["ارسال props به سرور", "Sending props to the server"],
      ["تغییر مستقیم props در فرزند", "Mutating props in a child"],
    ],
    a: [
      "راه‌حل‌ها: composition (پاس دادن `children`)، Context، یا store. همیشه بد نیست؛ ۲-۳ لایه کاملاً قابل قبول است.",
      "Fixes: composition (passing `children`), Context, or a store. It's not always bad: 2-3 levels is fine.",
    ],
  },
  {
    id: "sm-immutable-01",
    level: "junior",
    tags: ["immutability"],
    q: ["چرا نباید state را مستقیم mutate کرد (`state.items.push(x)`)؟", "Why not mutate state directly (`state.items.push(x)`)?"],
    options: [
      ["reference عوض نمی‌شود و React/selectorها تغییر را تشخیص نمی‌دهند", "The reference doesn't change, so React/selectors miss the update"],
      ["چون `push` در JS وجود ندارد", "Because `push` doesn't exist"],
      ["چون باعث خطای syntax می‌شود", "It causes a syntax error"],
      ["هیچ مشکلی ندارد", "It's fine"],
    ],
    a: [
      "مقایسه با `Object.is` انجام می‌شود. object جدید بسازید: `setItems([...items, x])`.",
      "Comparison uses `Object.is`. Create a new object: `setItems([...items, x])`.",
    ],
  },
  {
    id: "sm-derived-01",
    level: "junior",
    tags: ["derived-state"],
    q: ["اگر `fullName` از `first` و `last` ساخته می‌شود، بهتر است...", "If `fullName` comes from `first` and `last`, it's better to..."],
    options: [
      ["هنگام رندر محاسبه شود نه در state جدا", "Compute it during render, not store it separately"],
      ["در state سوم ذخیره و با effect sync شود", "Store it in a third state and sync via effect"],
      ["در localStorage ذخیره شود", "Store it in localStorage"],
      ["در یک ref نگه داشته شود", "Keep it in a ref"],
    ],
    a: [
      "state تکراری باعث ناهمخوانی و رندر اضافه می‌شود. اگر محاسبه سنگین بود از `useMemo` استفاده کنید.",
      "Duplicate state leads to inconsistency and extra renders. Use `useMemo` if the computation is expensive.",
    ],
  },
  {
    id: "sm-single-source-01",
    level: "junior",
    tags: ["principles"],
    q: ["اصل «Single source of truth» یعنی چه؟", "What does “single source of truth” mean?"],
    options: [
      ["هر داده فقط یک مالک و یک محل نگهداری داشته باشد", "Each piece of data has exactly one owner/location"],
      ["فقط یک کامپوننت در اپ باشد", "Only one component in the app"],
      ["فقط یک فایل در پروژه", "Only one file in the project"],
      ["همه داده در سرور باشد", "All data lives on the server"],
    ],
    a: [
      "کپی کردن داده در چند جا باعث ناهمخوانی می‌شود. بقیه جاها باید از منبع اصلی بخوانند یا از آن مشتق کنند.",
      "Copying data into several places causes drift. Everything else should read or derive from the source.",
    ],
  },
  {
    id: "sm-url-state-01",
    level: "junior",
    tags: ["url"],
    q: ["چرا فیلتر و صفحه‌بندی را در URL (query string) نگه داریم؟", "Why keep filters and pagination in the URL query string?"],
    options: [
      ["قابل اشتراک، bookmark و سازگار با back/forward است", "It's shareable, bookmarkable, and works with back/forward"],
      ["چون امن‌ترین محل برای رمز عبور است", "It's the safest place for passwords"],
      ["چون از state سریع‌تر است", "It's faster than state"],
      ["چون SEO را حذف می‌کند", "It removes SEO"],
    ],
    a: [
      "URL یک state store رایگان است. داده حساس را هرگز در URL نگذارید.",
      "The URL is a free state store. Never put sensitive data in it.",
    ],
  },
  {
    id: "sm-redux-action-01",
    level: "junior",
    tags: ["redux"],
    q: ["یک action در Redux چیست؟", "What is a Redux action?"],
    options: [
      ["یک object ساده با فیلد `type` (و معمولاً `payload`)", "A plain object with a `type` (and usually `payload`)"],
      ["تابعی که مستقیماً state را تغییر می‌دهد", "A function that mutates state directly"],
      ["یک کامپوننت React", "A React component"],
      ["یک درخواست HTTP", "An HTTP request"],
    ],
    a: [
      "Action فقط توصیف می‌کند «چه اتفاقی افتاد»؛ reducer تصمیم می‌گیرد state چطور تغییر کند.",
      "An action only describes what happened; the reducer decides how state changes.",
    ],
  },
  // Middle
  {
    id: "sm-pure-reducer-01",
    level: "middle",
    tags: ["redux"],
    q: ["کدام کار داخل reducer مجاز نیست؟", "Which is NOT allowed inside a reducer?"],
    options: [
      ["فراخوانی API یا `Math.random()`", "Calling an API or `Math.random()`"],
      ["برگرداندن object جدید", "Returning a new object"],
      ["خواندن `action.payload`", "Reading `action.payload`"],
      ["switch روی `action.type`", "Switching on `action.type`"],
    ],
    a: [
      "Reducer باید خالص باشد: ورودی یکسان → خروجی یکسان، بدون side effect. کارهای async را در thunk/saga/listener انجام دهید.",
      "Reducers must be pure: same input → same output, no side effects. Do async work in thunks/sagas/listeners.",
    ],
  },
  {
    id: "sm-middleware-01",
    level: "middle",
    tags: ["redux"],
    q: ["middleware در Redux چه نقشی دارد؟", "What role does Redux middleware play?"],
    options: [
      ["رهگیری actionها بین dispatch و reducer برای async، logging و...", "Intercepts actions between dispatch and reducer for async, logging, etc."],
      ["رندر کامپوننت‌ها", "Rendering components"],
      ["تعریف route", "Defining routes"],
      ["استایل‌دهی", "Styling"],
    ],
    a: [
      "`redux-thunk` (پیش‌فرض RTK) اجازه می‌دهد تابع dispatch کنید. RTK Query و listener middleware هم بر همین پایه‌اند.",
      "`redux-thunk` (default in RTK) lets you dispatch functions. RTK Query and listener middleware build on this.",
    ],
  },
  {
    id: "sm-optimistic-01",
    level: "middle",
    tags: ["ux"],
    q: ["Optimistic update چیست؟", "What is an optimistic update?"],
    options: [
      ["آپدیت UI قبل از تأیید سرور و rollback در صورت خطا", "Update the UI before the server confirms, roll back on error"],
      ["آپدیت فقط بعد از رفرش صفحه", "Update only after page refresh"],
      ["نادیده گرفتن خطاهای سرور", "Ignoring server errors"],
      ["کش کردن دائمی", "Permanent caching"],
    ],
    a: [
      "UI سریع به نظر می‌رسد (مثل لایک). باید snapshot قبلی را نگه دارید تا در خطا برگردید. React 19 هم `useOptimistic` دارد.",
      "The UI feels instant (e.g. likes). Keep the previous snapshot to revert on failure. React 19 has `useOptimistic`.",
    ],
  },
  {
    id: "sm-immer-01",
    level: "middle",
    tags: ["immutability"],
    q: ["Immer چه کاری انجام می‌دهد؟", "What does Immer do?"],
    options: [
      ["کد به سبک mutable می‌نویسید و خروجی immutable می‌گیرید", "You write mutable-style code and get immutable results"],
      ["state را در سرور ذخیره می‌کند", "Stores state on the server"],
      ["React را سریع‌تر compile می‌کند", "Compiles React faster"],
      ["actionها را تایپ می‌کند", "Types actions"],
    ],
    a: [
      "Immer با Proxy تغییرات را روی draft ثبت می‌کند و object جدیدی با structural sharing می‌سازد. `createSlice` در RTK از آن استفاده می‌کند.",
      "Immer records changes on a Proxy draft and produces a new object with structural sharing. RTK's `createSlice` uses it.",
    ],
  },
  {
    id: "sm-atoms-01",
    level: "middle",
    tags: ["jotai"],
    q: ["مدل atom در Jotai/Recoil چه ویژگی‌ای دارد؟", "What characterizes the atom model in Jotai/Recoil?"],
    options: [
      ["واحدهای کوچک state که فقط consumerهای خودشان را re-render می‌کنند", "Small state units that re-render only their own consumers"],
      ["یک store بزرگ واحد اجباری", "A mandatory single big store"],
      ["فقط برای server state", "Only for server state"],
      ["بدون امکان مشتق‌سازی", "No derived values possible"],
    ],
    a: [
      "Atomها bottom-up ترکیب می‌شوند و atomهای مشتق (derived) می‌توانند از atomهای دیگر محاسبه شوند.",
      "Atoms compose bottom-up, and derived atoms compute from other atoms.",
    ],
  },
  {
    id: "sm-swr-01",
    level: "middle",
    tags: ["caching"],
    q: ["استراتژی stale-while-revalidate چیست؟", "What is stale-while-revalidate?"],
    options: [
      ["داده cache را فوراً نشان بده و در پس‌زمینه دوباره fetch کن", "Show cached data immediately and refetch in the background"],
      ["همیشه منتظر داده تازه بمان", "Always wait for fresh data"],
      ["هرگز fetch مجدد نکن", "Never refetch"],
      ["cache را در هر رندر پاک کن", "Clear cache every render"],
    ],
    a: [
      "SWR و React Query بر این ایده ساخته شده‌اند: UI سریع بدون از دست دادن تازگی داده.",
      "SWR and React Query are built on it: fast UI without losing freshness.",
    ],
  },
  // Senior
  {
    id: "sm-state-machine-01",
    level: "senior",
    tags: ["xstate"],
    q: ["مزیت اصلی state machine (مثل XState) چیست؟", "Main benefit of a state machine (e.g. XState)?"],
    options: [
      ["حالت‌ها و transitionها صریح‌اند و حالت‌های غیرممکن حذف می‌شوند", "Explicit states/transitions eliminate impossible states"],
      ["حجم bundle را صفر می‌کند", "Zero bundle size"],
      ["جایگزین TypeScript است", "Replaces TypeScript"],
      ["نیاز به تست را حذف می‌کند", "Removes the need for tests"],
    ],
    a: [
      "به‌جای چند boolean مثل `isLoading` و `isError` که ترکیب‌های نامعتبر دارند، یک state مشخص مثل `\"loading\" | \"error\" | \"success\"` دارید.",
      "Instead of booleans like `isLoading` + `isError` with invalid combos, you have one explicit state like `\"loading\" | \"error\" | \"success\"`.",
    ],
  },
  {
    id: "sm-cross-tab-01",
    level: "senior",
    tags: ["browser"],
    q: ["برای sync کردن state بین چند تب مرورگر از چه استفاده می‌شود؟", "How do you sync state across browser tabs?"],
    options: [
      ["رویداد `storage` یا `BroadcastChannel`", "The `storage` event or `BroadcastChannel`"],
      ["`useState` مشترک", "A shared `useState`"],
      ["`sessionStorage`", "`sessionStorage`"],
      ["متغیر global", "A global variable"],
    ],
    a: [
      "رویداد `storage` در تب‌های دیگر هنگام تغییر localStorage فایر می‌شود. `BroadcastChannel` پیام‌رسانی مستقیم بین تب‌ها را ممکن می‌کند.",
      "The `storage` event fires in other tabs when localStorage changes. `BroadcastChannel` enables direct messaging between tabs.",
    ],
  },
  {
    id: "sm-ssr-hydration-01",
    level: "senior",
    tags: ["ssr"],
    q: ["در SSR، store سمت کلاینت چگونه مقداردهی اولیه می‌شود؟", "In SSR, how is the client store initialized?"],
    options: [
      ["state اولیه روی سرور serialize و در کلاینت با همان مقدار hydrate می‌شود", "Initial state is serialized on the server and hydrated on the client"],
      ["کلاینت همیشه از state خالی شروع می‌کند", "The client always starts empty"],
      ["store بین همه کاربران روی سرور share می‌شود", "One store is shared by all users on the server"],
      ["از cookie کل store خوانده می‌شود", "The whole store is read from a cookie"],
    ],
    a: [
      "روی سرور برای هر request یک store جدید بسازید؛ store سراسری باعث نشت داده بین کاربران می‌شود.",
      "Create a new store per request on the server; a global store leaks data between users.",
    ],
  },
  {
    id: "sm-reselect-01",
    level: "senior",
    tags: ["performance"],
    q: ["چرا selector که `state.items.filter(...)` برمی‌گرداند باید memo شود؟", "Why memoize a selector returning `state.items.filter(...)`?"],
    options: [
      ["هر بار آرایه جدید می‌سازد و باعث re-render بی‌دلیل می‌شود", "It creates a new array each time, causing needless re-renders"],
      ["چون filter در Redux ممنوع است", "Because filter is banned in Redux"],
      ["برای کاهش حجم bundle", "To reduce bundle size"],
      ["نیازی به memo ندارد", "It doesn't need memoizing"],
    ],
    a: [
      "`createSelector` (reselect) خروجی را تا تغییر ورودی‌ها cache می‌کند تا reference پایدار بماند.",
      "`createSelector` (reselect) caches output until inputs change, keeping references stable.",
    ],
  },
  {
    id: "sm-signals-01",
    level: "senior",
    tags: ["signals"],
    q: ["ایده اصلی Signals (Solid، Preact، Angular) چیست؟", "What is the core idea of Signals (Solid, Preact, Angular)?"],
    options: [
      ["واکنش‌گرایی ریزدانه که فقط وابسته‌های مستقیم را آپدیت می‌کند", "Fine-grained reactivity updating only direct dependents"],
      ["re-render کل درخت در هر تغییر", "Re-rendering the whole tree on every change"],
      ["حذف کامل state", "Removing state entirely"],
      ["فقط برای ارتباط با سرور", "Only for server communication"],
    ],
    a: [
      "به‌جای re-render کامپوننت، فقط بخش‌هایی از DOM که آن signal را می‌خوانند آپدیت می‌شوند.",
      "Instead of re-rendering components, only the DOM parts reading that signal update.",
    ],
  },
  {
    id: "sm-colocation-01",
    level: "senior",
    tags: ["architecture"],
    q: ["اصل state colocation چه می‌گوید؟", "What does state colocation say?"],
    options: [
      ["state را تا حد ممکن نزدیک جایی که استفاده می‌شود نگه دار", "Keep state as close as possible to where it's used"],
      ["همه state را در store سراسری بگذار", "Put all state in a global store"],
      ["state را در CSS نگه دار", "Keep state in CSS"],
      ["state را در هر کامپوننت کپی کن", "Copy state into every component"],
    ],
    a: [
      "state محلی باعث رندر کمتر، کد خواناتر و حذف آسان‌تر feature می‌شود. فقط وقتی واقعاً مشترک شد آن را بالا ببرید.",
      "Local state means fewer renders, clearer code, and easier feature removal. Lift only when truly shared.",
    ],
  },
]);
