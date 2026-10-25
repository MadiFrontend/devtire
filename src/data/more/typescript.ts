import { build } from "../build";

export const typescriptMore = build("typescript", [
  // Junior
  {
    id: "ts-readonly-01",
    level: "junior",
    tags: ["modifiers"],
    q: ["`readonly` روی یک property چه می‌کند؟", "What does `readonly` on a property do?"],
    options: [
      ["بعد از مقداردهی اولیه، تخصیص مجدد را در compile ممنوع می‌کند", "Forbids reassignment after initialization at compile time"],
      ["object را در runtime freeze می‌کند", "Freezes the object at runtime"],
      ["property را private می‌کند", "Makes the property private"],
      ["property را اختیاری می‌کند", "Makes the property optional"],
    ],
    a: [
      "`readonly` فقط چک compile-time است و کد JS خروجی را تغییر نمی‌دهد. برای آرایه‌ها `ReadonlyArray<T>` یا `readonly T[]` هست.",
      "`readonly` is compile-time only; emitted JS is unchanged. Arrays have `ReadonlyArray<T>` / `readonly T[]`.",
    ],
  },
  {
    id: "ts-optional-01",
    level: "junior",
    tags: ["types"],
    q: ["در `{ name?: string }` تایپ `name` چیست؟", "In `{ name?: string }`, what is the type of `name`?"],
    options: [
      ["`string | undefined`", "`string | undefined`"],
      ["`string | null`", "`string | null`"],
      ["`string`", "`string`"],
      ["`any`", "`any`"],
    ],
    a: [
      "Property اختیاری ممکن است اصلاً وجود نداشته باشد، پس قبل از استفاده باید بررسی شود (مثلاً `name?.length`).",
      "An optional property may be absent, so check before use (e.g. `name?.length`).",
    ],
  },
  {
    id: "ts-union-01",
    level: "junior",
    tags: ["unions"],
    q: ["تایپ `string | number` یعنی چه؟", "What does `string | number` mean?"],
    options: [
      ["مقدار می‌تواند string یا number باشد", "The value can be a string or a number"],
      ["مقدار باید هم‌زمان string و number باشد", "The value must be both at once"],
      ["فقط number قابل قبول است", "Only numbers are allowed"],
      ["تایپ نامعتبر است", "It's an invalid type"],
    ],
    a: [
      "روی union فقط عملیات مشترک مجاز است. برای استفاده خاص باید با `typeof` آن را narrow کنید.",
      "Only shared operations are allowed on a union. Narrow with `typeof` for specific use.",
    ],
  },
  {
    id: "ts-enum-union-01",
    level: "junior",
    tags: ["enums"],
    q: ["کدام هیچ کد JS در خروجی تولید نمی‌کند؟", "Which emits no JavaScript at runtime?"],
    options: [
      ["`type Dir = \"up\" | \"down\"`", "`type Dir = \"up\" | \"down\"`"],
      ["`enum Dir { Up, Down }`", "`enum Dir { Up, Down }`"],
      ["`class Dir {}`", "`class Dir {}`"],
      ["`const Dir = { Up: 0 }`", "`const Dir = { Up: 0 }`"],
    ],
    a: [
      "Union رشته‌ای کاملاً در compile پاک می‌شود. `enum` معمولی یک object در runtime می‌سازد. به همین دلیل خیلی از تیم‌ها union را ترجیح می‌دهند.",
      "A string-literal union is fully erased. A regular `enum` emits a runtime object, which is why many teams prefer unions.",
    ],
  },
  {
    id: "ts-never-01",
    level: "junior",
    tags: ["types"],
    q: ["تایپ `never` نشان‌دهنده چیست؟", "What does the `never` type represent?"],
    options: [
      ["مقداری که هرگز رخ نمی‌دهد، مثل تابعی که همیشه throw می‌کند", "A value that never occurs, like a function that always throws"],
      ["همان `undefined`", "Same as `undefined`"],
      ["همان `void`", "Same as `void`"],
      ["هر مقداری", "Any value"],
    ],
    a: [
      "`void` یعنی چیزی برنمی‌گرداند؛ `never` یعنی اصلاً به پایان نمی‌رسد. همچنین در exhaustiveness check کاربرد دارد.",
      "`void` means returns nothing; `never` means it never completes. Also used in exhaustiveness checks.",
    ],
  },
  {
    id: "ts-inference-01",
    level: "junior",
    tags: ["inference"],
    q: ["در `let x = 5` تایپ `x` چیست؟", "In `let x = 5`, what is the type of `x`?"],
    options: [
      ["`number`", "`number`"],
      ["`5`", "`5`"],
      ["`any`", "`any`"],
      ["`unknown`", "`unknown`"],
    ],
    a: [
      "با `let` تایپ به `number` widen می‌شود. با `const x = 5` تایپ literal یعنی `5` است.",
      "With `let` it widens to `number`. With `const x = 5` it's the literal type `5`.",
    ],
  },
  // Middle
  {
    id: "ts-keyof-01",
    level: "middle",
    tags: ["operators"],
    q: ["`keyof { a: 1; b: 2 }` چه تایپی است؟", "What type is `keyof { a: 1; b: 2 }`?"],
    options: [
      ["`\"a\" | \"b\"`", "`\"a\" | \"b\"`"],
      ["`1 | 2`", "`1 | 2`"],
      ["`string`", "`string`"],
      ["`object`", "`object`"],
    ],
    a: [
      "`keyof` union کلیدها را می‌دهد. با generics ترکیب می‌شود: `function get<T, K extends keyof T>(o: T, k: K): T[K]`.",
      "`keyof` yields a union of keys. Combine with generics: `function get<T, K extends keyof T>(o: T, k: K): T[K]`.",
    ],
  },
  {
    id: "ts-typeof-type-01",
    level: "middle",
    tags: ["operators"],
    q: ["`type Cfg = typeof config` چه می‌کند؟", "What does `type Cfg = typeof config` do?"],
    options: [
      ["تایپ را از یک مقدار موجود استخراج می‌کند", "Derives a type from an existing value"],
      ["رشته \"object\" برمی‌گرداند", "Returns the string \"object\""],
      ["config را کپی می‌کند", "Copies config"],
      ["در TS معتبر نیست", "It's invalid in TS"],
    ],
    a: [
      "در جایگاه تایپ، `typeof` تایپ static مقدار را می‌دهد. با `as const` و `keyof` بسیار قدرتمند می‌شود.",
      "In type position, `typeof` gives the value's static type. Very powerful with `as const` and `keyof`.",
    ],
  },
  {
    id: "ts-type-guard-01",
    level: "middle",
    tags: ["narrowing"],
    q: ["امضای `function isFish(p): p is Fish` چه می‌کند؟", "What does `function isFish(p): p is Fish` do?"],
    options: [
      ["یک type guard سفارشی که در if تایپ را narrow می‌کند", "A custom type guard that narrows inside if"],
      ["p را به Fish تبدیل می‌کند", "Converts p into Fish"],
      ["خطای runtime پرتاب می‌کند", "Throws at runtime"],
      ["فقط مستندات است", "It's documentation only"],
    ],
    a: [
      "TS به درستی منطق داخل تابع اعتماد می‌کند، پس پیاده‌سازی باید واقعاً درست باشد.",
      "TS trusts the function body, so the implementation must actually be correct.",
    ],
  },
  {
    id: "ts-index-signature-01",
    level: "middle",
    tags: ["objects"],
    q: ["`{ [key: string]: number }` چه چیزی را توصیف می‌کند؟", "What does `{ [key: string]: number }` describe?"],
    options: [
      ["objectی با کلیدهای string دلخواه و مقادیر number", "An object with arbitrary string keys and number values"],
      ["آرایه‌ای از string", "An array of strings"],
      ["دقیقاً یک کلید به نام key", "Exactly one key named key"],
      ["یک tuple", "A tuple"],
    ],
    a: [
      "معادل `Record<string, number>` است. با `noUncheckedIndexedAccess` دسترسی به آن `number | undefined` می‌شود که امن‌تر است.",
      "Equivalent to `Record<string, number>`. With `noUncheckedIndexedAccess`, reads become `number | undefined`: safer.",
    ],
  },
  {
    id: "ts-as-const-01",
    level: "middle",
    tags: ["literals"],
    q: ["`[\"a\", \"b\"] as const` چه تایپی دارد؟", "What type does `[\"a\", \"b\"] as const` have?"],
    options: [
      ["`readonly [\"a\", \"b\"]`", "`readonly [\"a\", \"b\"]`"],
      ["`string[]`", "`string[]`"],
      ["`any[]`", "`any[]`"],
      ["`[string, string]`", "`[string, string]`"],
    ],
    a: [
      "`as const` همه چیز را readonly و literal می‌کند. الگوی رایج: `type Item = (typeof arr)[number]` برای ساخت union.",
      "`as const` makes everything readonly and literal. Common pattern: `type Item = (typeof arr)[number]` for a union.",
    ],
  },
  {
    id: "ts-overloads-01",
    level: "middle",
    tags: ["functions"],
    q: ["function overload در TS چیست؟", "What are function overloads in TS?"],
    options: [
      ["چند امضای تایپ با یک پیاده‌سازی واحد", "Several type signatures with one implementation"],
      ["چند پیاده‌سازی جدا در runtime", "Multiple runtime implementations"],
      ["ارث‌بری کلاس", "Class inheritance"],
      ["همان generics", "The same as generics"],
    ],
    a: [
      "امضای پیاده‌سازی از بیرون دیده نمی‌شود. اغلب union یا generic جایگزین ساده‌تری برای overload است.",
      "The implementation signature isn't visible externally. Unions or generics are often simpler alternatives.",
    ],
  },
  // Senior
  {
    id: "ts-mapped-01",
    level: "senior",
    tags: ["mapped-types"],
    q: ["`{ [K in keyof T]?: T[K] }` معادل کدام utility است؟", "`{ [K in keyof T]?: T[K] }` is equivalent to which utility?"],
    options: [
      ["`Partial<T>`", "`Partial<T>`"],
      ["`Required<T>`", "`Required<T>`"],
      ["`Readonly<T>`", "`Readonly<T>`"],
      ["`Pick<T, K>`", "`Pick<T, K>`"],
    ],
    a: [
      "Mapped type روی کلیدها پیمایش می‌کند. با `-?` و `-readonly` می‌توان modifierها را حذف کرد و با `as` کلیدها را بازنام‌گذاری کرد.",
      "Mapped types iterate keys. `-?` / `-readonly` remove modifiers, and `as` can remap keys.",
    ],
  },
  {
    id: "ts-template-literal-01",
    level: "senior",
    tags: ["template-literal-types"],
    q: ["``type E = `on${Capitalize<\"click\">}` `` چیست؟", "What is ``type E = `on${Capitalize<\"click\">}` ``?"],
    options: [
      ["`\"onClick\"`", "`\"onClick\"`"],
      ["`\"onclick\"`", "`\"onclick\"`"],
      ["`string`", "`string`"],
      ["خطای compile", "A compile error"],
    ],
    a: [
      "Template literal types رشته‌ها را در سطح تایپ می‌سازند؛ برای نام event، کلیدهای CSS و مسیرهای API کاربرد دارند.",
      "Template literal types build strings at the type level: useful for event names, CSS keys, and API paths.",
    ],
  },
  {
    id: "ts-branded-01",
    level: "senior",
    tags: ["patterns"],
    q: ["Branded type مثل `string & { __brand: \"UserId\" }` چه فایده‌ای دارد؟", "What is a branded type like `string & { __brand: \"UserId\" }` for?"],
    options: [
      ["جلوگیری از جابه‌جا شدن idهای هم‌شکل مثل UserId و OrderId", "Preventing mix-ups between same-shaped ids like UserId and OrderId"],
      ["رمزنگاری رشته", "Encrypting the string"],
      ["اعتبارسنجی runtime خودکار", "Automatic runtime validation"],
      ["کاهش حجم bundle", "Reducing bundle size"],
    ],
    a: [
      "TS ساختاری (structural) است، پس دو `string` همیشه قابل جابه‌جایی‌اند. brand یک تمایز nominal مصنوعی می‌سازد.",
      "TS is structural, so any two `string`s are interchangeable. A brand adds artificial nominal distinction.",
    ],
  },
  {
    id: "ts-exhaustive-01",
    level: "senior",
    tags: ["narrowing"],
    q: ["در `default` یک switch روی union، `const x: never = value` چه کاری می‌کند؟", "In a union switch's `default`, what does `const x: never = value` do?"],
    options: [
      ["اگر حالتی پوشش داده نشده باشد خطای compile می‌دهد", "Causes a compile error if a case is unhandled"],
      ["در runtime خطا می‌دهد", "Throws at runtime only"],
      ["switch را سریع‌تر می‌کند", "Makes the switch faster"],
      ["هیچ اثری ندارد", "Has no effect"],
    ],
    a: [
      "اگر عضو جدیدی به union اضافه شود و case آن نوشته نشود، `value` دیگر `never` نیست و TS خطا می‌دهد.",
      "If a new union member is added without a case, `value` is no longer `never` and TS errors.",
    ],
  },
  {
    id: "ts-infer-01",
    level: "senior",
    tags: ["conditional-types"],
    q: ["`T extends (...a: any[]) => infer R ? R : never` چه چیزی را استخراج می‌کند؟", "What does `T extends (...a: any[]) => infer R ? R : never` extract?"],
    options: [
      ["تایپ خروجی تابع (مثل `ReturnType`)", "The function's return type (like `ReturnType`)"],
      ["تایپ پارامترها", "The parameter types"],
      ["نام تابع", "The function name"],
      ["تعداد آرگومان‌ها", "The argument count"],
    ],
    a: [
      "`infer` یک متغیر تایپ را داخل الگو تعریف می‌کند. `Parameters`، `Awaited` و `ReturnType` همین‌طور ساخته شده‌اند.",
      "`infer` declares a type variable inside the pattern. `Parameters`, `Awaited`, and `ReturnType` are built this way.",
    ],
  },
  {
    id: "ts-constraint-01",
    level: "senior",
    tags: ["generics"],
    q: ["`function f<T extends { id: string }>(x: T)` چه تضمینی می‌دهد؟", "What does `function f<T extends { id: string }>(x: T)` guarantee?"],
    options: [
      ["هر T باید حداقل property `id: string` داشته باشد و بقیه تایپ حفظ می‌شود", "Any T must have `id: string`, and the rest of its type is preserved"],
      ["T فقط می‌تواند دقیقاً `{ id: string }` باشد", "T can only be exactly `{ id: string }`"],
      ["T حتماً یک class است", "T must be a class"],
      ["هیچ محدودیتی ندارد", "No constraint at all"],
    ],
    a: [
      "Constraint اجازه دسترسی به `x.id` را می‌دهد و برخلاف تایپ ثابت، اطلاعات کامل T را برای خروجی نگه می‌دارد.",
      "The constraint allows `x.id` while, unlike a fixed type, keeping T's full info for the return type.",
    ],
  },
]);
