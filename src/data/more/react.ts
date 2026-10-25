import { build } from "../build";

export const reactMore = build("react", [
  // Junior
  {
    id: "react-fragment-01",
    level: "junior",
    tags: ["jsx"],
    q: ["`<>...</>` (Fragment) چه کاری انجام می‌دهد؟", "What does `<>...</>` (Fragment) do?"],
    options: [
      ["چند فرزند را بدون ساخت عنصر DOM اضافه گروه می‌کند", "Groups children without adding a DOM element"],
      ["یک `div` خالی می‌سازد", "Creates an empty `div`"],
      ["کامپوننت را memo می‌کند", "Memoizes the component"],
      ["state محلی می‌سازد", "Creates local state"],
    ],
    a: [
      "اگر روی Fragment در لیست به `key` نیاز دارید، از `<Fragment key={id}>` استفاده کنید.",
      "If a Fragment in a list needs a `key`, use `<Fragment key={id}>`.",
    ],
  },
  {
    id: "react-and-zero-01",
    level: "junior",
    tags: ["rendering"],
    q: ["اگر `items.length` برابر `0` باشد، `{items.length && <List />}` چه رندر می‌کند؟", "If `items.length` is `0`, what does `{items.length && <List />}` render?"],
    options: [
      ["عدد `0`", "The number `0`"],
      ["هیچ چیز", "Nothing"],
      ["`<List />`", "`<List />`"],
      ["خطا", "An error"],
    ],
    a: [
      "`&&` مقدار falsy سمت چپ را برمی‌گرداند و React عدد `0` را رندر می‌کند. از `items.length > 0 && ...` یا ternary استفاده کنید.",
      "`&&` returns the falsy left value and React renders `0`. Use `items.length > 0 && ...` or a ternary.",
    ],
  },
  {
    id: "react-onclick-01",
    level: "junior",
    tags: ["events"],
    q: ["مشکل `onClick={handleClick()}` چیست؟", "What is wrong with `onClick={handleClick()}`?"],
    options: [
      ["تابع هنگام رندر اجرا می‌شود نه هنگام کلیک", "The function runs during render, not on click"],
      ["هیچ مشکلی ندارد", "Nothing is wrong"],
      ["فقط در class کار می‌کند", "It only works in classes"],
      ["رویداد را دو بار اجرا می‌کند", "It fires the event twice"],
    ],
    a: [
      "باید خود تابع را پاس دهید: `onClick={handleClick}` یا برای آرگومان `onClick={() => handleClick(id)}`.",
      "Pass the function itself: `onClick={handleClick}`, or `onClick={() => handleClick(id)}` for arguments.",
    ],
  },
  {
    id: "react-lift-state-01",
    level: "junior",
    tags: ["state"],
    q: ["دو کامپوننت هم‌سطح باید یک داده را share کنند. راه‌حل ساده؟", "Two sibling components must share data. Simplest fix?"],
    options: [
      ["state را به نزدیک‌ترین والد مشترک ببرید (lift state up)", "Lift state up to the closest common parent"],
      ["state را در هر دو کپی کنید و sync کنید", "Duplicate state in both and sync them"],
      ["از متغیر global استفاده کنید", "Use a global variable"],
      ["از `useRef` در هر کدام استفاده کنید", "Use `useRef` in each"],
    ],
    a: [
      "والد state را نگه می‌دارد و از طریق props مقدار و setter را پاس می‌دهد. فقط وقتی drilling زیاد شد سراغ Context یا store بروید.",
      "The parent owns state and passes value and setter via props. Reach for Context/stores only when drilling gets heavy.",
    ],
  },
  {
    id: "react-controlled-input-01",
    level: "junior",
    tags: ["forms"],
    q: ["یک input کنترل‌شده به چه چیزهایی نیاز دارد؟", "What does a controlled input need?"],
    options: [
      ["`value` و `onChange`", "`value` and `onChange`"],
      ["فقط `defaultValue`", "Only `defaultValue`"],
      ["فقط `ref`", "Only a `ref`"],
      ["`id` و `name`", "`id` and `name`"],
    ],
    a: [
      "اگر `value` بدون `onChange` بدهید، input فقط‌خواندنی می‌شود و React هشدار می‌دهد.",
      "Passing `value` without `onChange` makes the input read-only and React warns.",
    ],
  },
  {
    id: "react-useref-01",
    level: "junior",
    tags: ["hooks"],
    q: ["تغییر `ref.current` در `useRef` چه اثری دارد؟", "What happens when you change `ref.current` from `useRef`?"],
    options: [
      ["مقدار حفظ می‌شود ولی re-render نمی‌دهد", "The value persists but causes no re-render"],
      ["کامپوننت re-render می‌شود", "The component re-renders"],
      ["کامپوننت unmount می‌شود", "The component unmounts"],
      ["خطا می‌دهد", "It throws"],
    ],
    a: [
      "`useRef` برای دسترسی به DOM و نگه‌داشتن مقادیری مثل timer id که نباید رندر بدهند مناسب است. در حین رندر آن را نخوانید/ننویسید.",
      "`useRef` is for DOM access and values like timer ids that shouldn't trigger renders. Don't read/write it during render.",
    ],
  },
  // Middle
  {
    id: "react-usereducer-01",
    level: "middle",
    tags: ["hooks", "state"],
    q: ["چه زمانی `useReducer` بهتر از `useState` است؟", "When is `useReducer` better than `useState`?"],
    options: [
      ["وقتی state پیچیده است و چند نوع transition مرتبط دارد", "When state is complex with several related transitions"],
      ["برای هر boolean ساده", "For every simple boolean"],
      ["فقط در class component", "Only in class components"],
      ["وقتی state نداریم", "When there is no state"],
    ],
    a: [
      "منطق به reducer خالص منتقل می‌شود که تست آن آسان است و `dispatch` همیشه پایدار است.",
      "Logic moves to a pure, testable reducer and `dispatch` is always stable.",
    ],
  },
  {
    id: "react-context-rerender-01",
    level: "middle",
    tags: ["context", "performance"],
    q: ["وقتی `value` یک Context Provider عوض شود چه می‌شود؟", "What happens when a Context Provider's `value` changes?"],
    options: [
      ["همه consumerهای آن Context re-render می‌شوند", "Every consumer of that context re-renders"],
      ["فقط consumerی که فیلد تغییرکرده را می‌خواند", "Only consumers reading the changed field"],
      ["هیچ کامپوننتی re-render نمی‌شود", "Nothing re-renders"],
      ["کل اپ remount می‌شود", "The whole app remounts"],
    ],
    a: [
      "Context selector داخلی ندارد. value را با `useMemo` پایدار کنید، Contextها را تقسیم کنید یا برای state پرتغییر از store استفاده کنید.",
      "Context has no built-in selectors. Memoize the value, split contexts, or use a store for high-churn state.",
    ],
  },
  {
    id: "react-custom-hooks-01",
    level: "middle",
    tags: ["hooks"],
    q: ["custom hook چیست؟", "What is a custom hook?"],
    options: [
      ["تابعی با پیشوند `use` که منطق stateful را بین کامپوننت‌ها reuse می‌کند", "A `use`-prefixed function that reuses stateful logic"],
      ["کامپوننتی که JSX برمی‌گرداند", "A component that returns JSX"],
      ["state مشترک بین همه نمونه‌ها", "Shared state across all instances"],
      ["API داخلی مرورگر", "A built-in browser API"],
    ],
    a: [
      "هر کامپوننتی که hook را صدا بزند state مستقل خودش را دارد؛ منطق share می‌شود نه داده.",
      "Each component calling the hook gets independent state: logic is shared, not data.",
    ],
  },
  {
    id: "react-rules-hooks-01",
    level: "middle",
    tags: ["hooks"],
    q: ["کدام نقض Rules of Hooks است؟", "Which violates the Rules of Hooks?"],
    options: [
      ["صدا زدن `useState` داخل یک `if`", "Calling `useState` inside an `if`"],
      ["صدا زدن hook در بالای کامپوننت", "Calling a hook at the top of a component"],
      ["صدا زدن hook داخل custom hook", "Calling a hook inside a custom hook"],
      ["چند `useEffect` در یک کامپوننت", "Several `useEffect`s in one component"],
    ],
    a: [
      "React hookها را بر اساس ترتیب فراخوانی شناسایی می‌کند؛ ترتیب باید در هر رندر یکسان باشد. پس hook نباید در شرط، حلقه یا بعد از return زودهنگام باشد.",
      "React identifies hooks by call order, which must match every render: no hooks in conditions, loops, or after early returns.",
    ],
  },
  {
    id: "react-stale-closure-01",
    level: "middle",
    tags: ["effects", "closures"],
    q: ["`setInterval(() => setCount(count + 1), 1000)` در effect با deps خالی چه مشکلی دارد؟", "What's wrong with `setInterval(() => setCount(count + 1), 1000)` in an effect with empty deps?"],
    options: [
      ["stale closure: `count` همیشه مقدار اولیه است و از ۱ بالاتر نمی‌رود", "Stale closure: `count` stays initial, so it never passes 1"],
      ["هیچ مشکلی ندارد", "Nothing is wrong"],
      ["بی‌نهایت re-render می‌دهد", "It re-renders infinitely"],
      ["interval اصلاً اجرا نمی‌شود", "The interval never runs"],
    ],
    a: [
      "از functional update استفاده کنید: `setCount(c => c + 1)`. یادتان نرود در cleanup `clearInterval` کنید.",
      "Use a functional update: `setCount(c => c + 1)`. And `clearInterval` in cleanup.",
    ],
  },
  {
    id: "react-error-boundary-01",
    level: "middle",
    tags: ["errors"],
    q: ["Error Boundary کدام خطا را نمی‌گیرد؟", "Which error does an Error Boundary NOT catch?"],
    options: [
      ["خطا داخل event handler", "Errors inside event handlers"],
      ["خطای رندر در فرزندان", "Render errors in children"],
      ["خطا در lifecycle فرزندان", "Errors in child lifecycles"],
      ["خطا در constructor فرزند", "Errors in a child constructor"],
    ],
    a: [
      "خطاهای event handler و کد async را با try/catch مدیریت کنید. Error Boundary فقط خطاهای رندر را می‌گیرد و UI جایگزین نشان می‌دهد.",
      "Handle event-handler and async errors with try/catch. Boundaries only catch render-phase errors and show a fallback.",
    ],
  },
  // Senior
  {
    id: "react-layout-effect-01",
    level: "senior",
    tags: ["effects"],
    q: ["تفاوت `useLayoutEffect` با `useEffect`؟", "How does `useLayoutEffect` differ from `useEffect`?"],
    options: [
      ["همگام بعد از تغییر DOM و قبل از paint اجرا می‌شود", "Runs synchronously after DOM mutation, before paint"],
      ["روی سرور اجرا می‌شود", "Runs on the server"],
      ["قبل از رندر اجرا می‌شود", "Runs before render"],
      ["فقط یک بار در کل اپ اجرا می‌شود", "Runs once per app"],
    ],
    a: [
      "برای اندازه‌گیری layout و جلوگیری از flicker مفید است ولی paint را مسدود می‌کند؛ پیش‌فرض باید `useEffect` باشد.",
      "Useful for measuring layout and avoiding flicker, but it blocks paint: default to `useEffect`.",
    ],
  },
  {
    id: "react-hydration-01",
    level: "senior",
    tags: ["ssr"],
    q: ["کدام معمولاً باعث hydration mismatch می‌شود؟", "Which commonly causes a hydration mismatch?"],
    options: [
      ["رندر `Date.now()` یا `Math.random()` در حین رندر", "Rendering `Date.now()` or `Math.random()` during render"],
      ["استفاده از `useState` با مقدار ثابت", "Using `useState` with a constant"],
      ["استفاده از props", "Using props"],
      ["استفاده از Fragment", "Using Fragments"],
    ],
    a: [
      "HTML سرور باید با اولین رندر کلاینت یکی باشد. مقادیر وابسته به مرورگر (مثل `window` و `localStorage`) را بعد از mount در effect بخوانید.",
      "Server HTML must match the first client render. Read browser-only values (`window`, `localStorage`) after mount in an effect.",
    ],
  },
  {
    id: "react-suspense-01",
    level: "senior",
    tags: ["suspense"],
    q: ["`<Suspense fallback={...}>` چه کاری انجام می‌دهد؟", "What does `<Suspense fallback={...}>` do?"],
    options: [
      ["تا آماده شدن فرزندانِ suspend‌شده fallback نشان می‌دهد", "Shows a fallback while suspended children load"],
      ["خطاها را می‌گیرد", "Catches errors"],
      ["کامپوننت را memo می‌کند", "Memoizes components"],
      ["state global می‌سازد", "Creates global state"],
    ],
    a: [
      "با `React.lazy`، data fetching سازگار و streaming SSR کار می‌کند. برای خطا در کنارش Error Boundary لازم است.",
      "Works with `React.lazy`, compatible data fetching, and streaming SSR. Pair with an Error Boundary for failures.",
    ],
  },
  {
    id: "react-lazy-01",
    level: "senior",
    tags: ["performance", "code-splitting"],
    q: ["`React.lazy(() => import(\"./Chart\"))` چه فایده‌ای دارد؟", "What does `React.lazy(() => import(\"./Chart\"))` give you?"],
    options: [
      ["code splitting: کد کامپوننت فقط هنگام نیاز دانلود می‌شود", "Code splitting: the component's code loads only when needed"],
      ["کامپوننت را روی سرور cache می‌کند", "Caches the component on the server"],
      ["رندر را همگام می‌کند", "Makes rendering synchronous"],
      ["props را lazy می‌کند", "Makes props lazy"],
    ],
    a: [
      "باید داخل `Suspense` باشد. برای کامپوننت‌های سنگین مثل چارت، ادیتور یا مودال‌های کم‌استفاده bundle اولیه را کوچک می‌کند.",
      "Must sit inside `Suspense`. Shrinks the initial bundle for heavy parts like charts, editors, rarely used modals.",
    ],
  },
  {
    id: "react-portal-01",
    level: "senior",
    tags: ["dom"],
    q: ["`createPortal` برای چه استفاده می‌شود؟", "What is `createPortal` used for?"],
    options: [
      ["رندر فرزند در DOM node دیگری (مثل مودال در body)", "Rendering children into another DOM node (e.g. a modal in body)"],
      ["ارتباط با سرور", "Talking to the server"],
      ["ساخت route جدید", "Creating routes"],
      ["اجرای کد در Worker", "Running code in a Worker"],
    ],
    a: [
      "از مشکلات `overflow: hidden` و z-index فرار می‌کند. eventها هنوز در درخت React (نه DOM) bubble می‌شوند و Context هم کار می‌کند.",
      "Escapes `overflow: hidden` and z-index issues. Events still bubble through the React tree (not DOM), and Context works.",
    ],
  },
  {
    id: "react-use-sync-external-store-01",
    level: "senior",
    tags: ["hooks", "concurrent"],
    q: ["`useSyncExternalStore` برای چیست؟", "What is `useSyncExternalStore` for?"],
    options: [
      ["subscribe امن به store بیرونی بدون tearing در concurrent rendering", "Safely subscribing to external stores without tearing in concurrent rendering"],
      ["همگام‌سازی state با سرور", "Syncing state with the server"],
      ["جایگزین `useState` برای همه موارد", "Replacing `useState` everywhere"],
      ["ذخیره در localStorage", "Saving to localStorage"],
    ],
    a: [
      "کتابخانه‌هایی مثل Redux و Zustand از آن استفاده می‌کنند. برای API مرورگر مثل `matchMedia` یا `navigator.onLine` هم مناسب است.",
      "Libraries like Redux and Zustand use it. Also good for browser APIs like `matchMedia` or `navigator.onLine`.",
    ],
  },
]);
