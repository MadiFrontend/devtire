import { build } from "../build";

export const authSecurityJunior = build("auth-security", [
  {
    id: "sec-j-authn-vs-authz",
    level: "junior",
    tags: ["authentication", "authorization"],
    q: [
      "تفاوت authentication و authorization چیست؟",
      "What is the difference between authentication and authorization?",
    ],
    options: [
      ["authentication هویت کاربر را تأیید می‌کند و authorization تعیین می‌کند به چه چیزی دسترسی دارد", "Authentication verifies who the user is; authorization decides what they may access"],
      ["authentication دسترسی‌ها را تعیین می‌کند و authorization هویت را تأیید می‌کند", "Authentication decides access rights; authorization verifies identity"],
      ["هر دو یک مفهوم‌اند و فقط نامشان در فریم‌ورک‌ها فرق دارد", "They are the same concept with different names across frameworks"],
      ["authentication فقط سمت کلاینت و authorization فقط سمت سرور انجام می‌شود", "Authentication happens only on the client and authorization only on the server"],
    ],
    a: [
      "authentication (AuthN) به سوال «تو کی هستی؟» پاسخ می‌دهد و authorization (AuthZ) به سوال «اجازه انجام این کار را داری؟». معمولاً اول AuthN و سپس AuthZ انجام می‌شود.",
      "Authentication (AuthN) answers 'who are you?' and authorization (AuthZ) answers 'are you allowed to do this?'. AuthN normally happens first, then AuthZ.",
    ],
  },
  {
    id: "sec-j-401-vs-403",
    level: "junior",
    tags: ["http", "authorization"],
    q: [
      "کاربری لاگین کرده ولی می‌خواهد به منبعی دسترسی پیدا کند که مجوزش را ندارد. سرور چه status code ای باید برگرداند؟",
      "A logged-in user requests a resource they lack permission for. Which status code should the server return?",
    ],
    options: [
      ["`403 Forbidden`", "`403 Forbidden`"],
      ["`401 Unauthorized`", "`401 Unauthorized`"],
      ["`400 Bad Request`", "`400 Bad Request`"],
      ["`407 Proxy Authentication Required`", "`407 Proxy Authentication Required`"],
    ],
    a: [
      "`401` یعنی کاربر احراز هویت نشده یا credential نامعتبر است، اما `403` یعنی هویت مشخص است ولی اجازه دسترسی ندارد. گاهی برای پنهان کردن وجود منبع از `404` هم استفاده می‌شود.",
      "`401` means the request is unauthenticated or credentials are invalid, while `403` means the identity is known but lacks permission. Some APIs return `404` to hide the resource's existence.",
    ],
  },
  {
    id: "sec-j-401-www-authenticate",
    level: "junior",
    tags: ["http", "authentication"],
    q: [
      "پاسخ `401 Unauthorized` طبق استاندارد HTTP باید کدام header را داشته باشد؟",
      "Per the HTTP spec, which header should a `401 Unauthorized` response include?",
    ],
    options: [
      ["`WWW-Authenticate`", "`WWW-Authenticate`"],
      ["`Authorization`", "`Authorization`"],
      ["`Set-Cookie`", "`Set-Cookie`"],
      ["`Access-Control-Allow-Credentials`", "`Access-Control-Allow-Credentials`"],
    ],
    a: [
      "header `WWW-Authenticate` به کلاینت می‌گوید با چه scheme ای (مثلاً `Bearer` یا `Basic`) احراز هویت کند. header `Authorization` را کلاینت در request می‌فرستد.",
      "The `WWW-Authenticate` header tells the client which scheme (e.g. `Bearer` or `Basic`) to authenticate with. The `Authorization` header is sent by the client in requests.",
    ],
  },
  {
    id: "sec-j-why-not-sha256-passwords",
    level: "junior",
    tags: ["password-hashing"],
    q: [
      "چرا ذخیره پسورد با `SHA-256` (حتی با salt) توصیه نمی‌شود؟",
      "Why is storing passwords with `SHA-256` (even salted) not recommended?",
    ],
    options: [
      ["چون خیلی سریع است و حمله brute-force با GPU را ارزان می‌کند", "It is very fast, making GPU brute-force attacks cheap"],
      ["چون SHA-256 برگشت‌پذیر است و می‌توان پسورد را decrypt کرد", "SHA-256 is reversible, so passwords can be decrypted"],
      ["چون خروجی SHA-256 برای ذخیره در دیتابیس خیلی طولانی است", "Its output is too long to store in a database"],
      ["چون SHA-256 برای هر ورودی خروجی تصادفی متفاوتی می‌دهد", "SHA-256 gives a different random output for the same input"],
    ],
    a: [
      "توابع hash عمومی برای سرعت طراحی شده‌اند و میلیاردها hash در ثانیه روی GPU قابل محاسبه‌اند. برای پسورد باید از توابع کند و قابل تنظیم مثل `Argon2id`، `bcrypt` یا `scrypt` استفاده کرد.",
      "General-purpose hashes are designed for speed, allowing billions of guesses per second on GPUs. Passwords need slow, tunable functions like `Argon2id`, `bcrypt`, or `scrypt`.",
    ],
  },
  {
    id: "sec-j-salt-purpose",
    level: "junior",
    tags: ["password-hashing", "salt"],
    q: [
      "هدف اصلی salt در hash کردن پسورد چیست؟",
      "What is the main purpose of a salt in password hashing?",
    ],
    options: [
      ["یکتا کردن hash هر کاربر تا rainbow table و حمله هم‌زمان به چند hash بی‌اثر شود", "Make each hash unique so rainbow tables and cracking many hashes at once fail"],
      ["رمزنگاری hash تا بدون کلید قابل خواندن نباشد", "Encrypt the hash so it can't be read without a key"],
      ["کوتاه‌تر کردن hash برای ذخیره‌سازی بهینه", "Shorten the hash for efficient storage"],
      ["مخفی نگه داشتن الگوریتم hash از مهاجم", "Hide the hashing algorithm from attackers"],
    ],
    a: [
      "salt یک مقدار تصادفی یکتا برای هر پسورد است که کنار hash ذخیره می‌شود. با آن دو کاربر با پسورد یکسان hash متفاوتی دارند و جدول‌های از پیش محاسبه‌شده بی‌فایده می‌شوند.",
      "A salt is a unique random value per password, stored alongside the hash. Identical passwords then produce different hashes and precomputed tables become useless.",
    ],
  },
  {
    id: "sec-j-salt-secret",
    level: "junior",
    tags: ["salt", "password-hashing"],
    q: [
      "آیا salt باید محرمانه نگه داشته شود؟",
      "Does a salt need to be kept secret?",
    ],
    options: [
      ["خیر، معمولاً کنار hash ذخیره می‌شود؛ فقط باید تصادفی و یکتا باشد", "No, it is usually stored with the hash; it only needs to be random and unique"],
      ["بله، اگر salt لو برود همه پسوردها فوراً قابل خواندن‌اند", "Yes, if the salt leaks all passwords become instantly readable"],
      ["بله، salt باید در یک سرور جداگانه نگه داشته شود", "Yes, it must be kept on a separate server"],
      ["خیر، چون salt برای همه کاربران یکسان است", "No, because the salt is the same for all users"],
    ],
    a: [
      "salt محرمانه نیست و مثلاً bcrypt آن را داخل رشته hash خروجی ذخیره می‌کند. مقدار محرمانه‌ای که جدا از دیتابیس نگه داشته می‌شود pepper نام دارد.",
      "Salts are not secret; bcrypt, for example, embeds the salt in its output string. A secret value kept outside the database is called a pepper.",
    ],
  },
  {
    id: "sec-j-hash-vs-encrypt-encode",
    level: "junior",
    tags: ["crypto-basics"],
    q: [
      "کدام گزینه تفاوت hashing، encryption و encoding را درست بیان می‌کند؟",
      "Which statement correctly distinguishes hashing, encryption, and encoding?",
    ],
    options: [
      ["hash یک‌طرفه است، encryption با کلید برگشت‌پذیر است و encoding بدون کلید برگشت‌پذیر است", "Hashing is one-way, encryption is reversible with a key, encoding is reversible without a key"],
      ["هر سه یک‌طرفه‌اند و فقط سرعتشان متفاوت است", "All three are one-way and differ only in speed"],
      ["encoding امن‌ترین روش برای محافظت از داده است", "Encoding is the most secure way to protect data"],
      ["hash با کلید خصوصی برگشت‌پذیر است و encryption نه", "Hashing is reversible with a private key while encryption is not"],
    ],
    a: [
      "encoding مثل Base64 فقط تغییر فرمت است و امنیتی ندارد. encryption محرمانگی را با کلید فراهم می‌کند و hash برای بررسی یکپارچگی یا ذخیره پسورد به کار می‌رود.",
      "Encoding like Base64 is just a format change with no security. Encryption provides confidentiality with a key, and hashing is used for integrity checks or password storage.",
    ],
  },
  {
    id: "sec-j-base64-not-encryption",
    level: "junior",
    tags: ["crypto-basics", "encoding"],
    q: [
      "یک توسعه‌دهنده پسورد را با Base64 ذخیره کرده و می‌گوید «رمزنگاری شده». مشکل چیست؟",
      "A developer stores passwords as Base64 and calls them 'encrypted'. What's wrong?",
    ],
    options: [
      ["Base64 فقط encoding است و هر کسی بدون کلید آن را decode می‌کند", "Base64 is just encoding; anyone can decode it without a key"],
      ["Base64 امن است ولی خروجی‌اش برای دیتابیس خیلی بزرگ است", "Base64 is secure but its output is too large for databases"],
      ["Base64 فقط برای فایل‌های باینری کار می‌کند نه متن", "Base64 only works on binary files, not text"],
      ["مشکلی نیست اگر از Base64url استفاده شود", "Nothing is wrong if Base64url is used instead"],
    ],
    a: [
      "Base64 هیچ کلیدی ندارد و کاملاً برگشت‌پذیر است، پس عملاً پسورد به‌صورت plaintext ذخیره شده. پسوردها باید با Argon2id یا bcrypt hash شوند.",
      "Base64 has no key and is fully reversible, so the passwords are effectively plaintext. Passwords must be hashed with Argon2id or bcrypt.",
    ],
  },
  {
    id: "sec-j-bcrypt-cost",
    level: "junior",
    tags: ["bcrypt", "password-hashing"],
    q: [
      "پارامتر cost (work factor) در bcrypt چه کاری انجام می‌دهد؟",
      "What does the cost (work factor) parameter in bcrypt do?",
    ],
    options: [
      ["تعداد دورهای محاسبه را به‌صورت نمایی افزایش می‌دهد تا hash کندتر شود", "Exponentially increases the number of rounds to make hashing slower"],
      ["طول خروجی hash را تعیین می‌کند", "Sets the length of the hash output"],
      ["تعداد کاراکترهای salt را مشخص می‌کند", "Sets the number of characters in the salt"],
      ["تعداد دفعات مجاز تلاش ناموفق لاگین را تعیین می‌کند", "Sets the number of allowed failed login attempts"],
    ],
    a: [
      "در bcrypt تعداد دورها برابر `2^cost` است، پس افزایش یک واحد cost زمان را دو برابر می‌کند. با قوی‌تر شدن سخت‌افزار می‌توان cost را بالا برد.",
      "bcrypt performs `2^cost` iterations, so each +1 doubles the work. The cost can be raised over time as hardware gets faster.",
    ],
  },
  {
    id: "sec-j-argon2-recommended",
    level: "junior",
    tags: ["argon2", "password-hashing"],
    q: [
      "طبق توصیه OWASP، الگوریتم پیش‌فرض ترجیحی برای hash پسورد در پروژه جدید کدام است؟",
      "Per OWASP guidance, which is the preferred default algorithm for password hashing in a new project?",
    ],
    options: [
      ["`Argon2id`", "`Argon2id`"],
      ["`MD5` با salt", "Salted `MD5`"],
      ["`SHA-512` با یک بار تکرار", "Single-iteration `SHA-512`"],
      ["`AES-256` با کلید ثابت", "`AES-256` with a fixed key"],
    ],
    a: [
      "Argon2id برنده Password Hashing Competition است و memory-hard است، یعنی حمله با GPU/ASIC را گران می‌کند. bcrypt و scrypt گزینه‌های قابل قبول بعدی‌اند.",
      "Argon2id won the Password Hashing Competition and is memory-hard, making GPU/ASIC attacks expensive. bcrypt and scrypt are acceptable alternatives.",
    ],
  },
  {
    id: "sec-j-session-cookie-flow",
    level: "junior",
    tags: ["sessions", "cookies"],
    q: [
      "در احراز هویت مبتنی بر session، معمولاً چه چیزی در cookie مرورگر ذخیره می‌شود؟",
      "In session-based authentication, what is typically stored in the browser cookie?",
    ],
    options: [
      ["یک session ID تصادفی که سرور داده‌های session را با آن پیدا می‌کند", "A random session ID the server uses to look up session data"],
      ["نام کاربری و پسورد کاربر به‌صورت encode شده", "The user's username and password, encoded"],
      ["کل اطلاعات پروفایل و نقش‌های کاربر به‌صورت plaintext", "The full user profile and roles in plaintext"],
      ["hash پسورد کاربر برای مقایسه در هر request", "The user's password hash for comparison on each request"],
    ],
    a: [
      "سرور داده session را در حافظه، Redis یا دیتابیس نگه می‌دارد و فقط یک شناسه تصادفی و غیرقابل حدس به کلاینت می‌دهد. مرورگر این cookie را خودکار با هر request می‌فرستد.",
      "The server keeps session data in memory, Redis, or a database and gives the client only an unguessable random ID. The browser sends that cookie automatically with each request.",
    ],
  },
  {
    id: "sec-j-httponly",
    level: "junior",
    tags: ["cookies", "xss"],
    q: [
      "flag `HttpOnly` روی cookie چه کاری انجام می‌دهد؟",
      "What does the `HttpOnly` cookie flag do?",
    ],
    options: [
      ["مانع دسترسی JavaScript به cookie از طریق `document.cookie` می‌شود", "Prevents JavaScript from reading the cookie via `document.cookie`"],
      ["cookie را فقط روی اتصال HTTP (نه HTTPS) ارسال می‌کند", "Sends the cookie only over HTTP, not HTTPS"],
      ["cookie را رمزنگاری می‌کند تا سرور هم نتواند آن را بخواند", "Encrypts the cookie so even the server can't read it"],
      ["ارسال cookie در requestهای cross-site را مسدود می‌کند", "Blocks the cookie on cross-site requests"],
    ],
    a: [
      "`HttpOnly` اثر XSS را کاهش می‌دهد چون اسکریپت مخرب نمی‌تواند session cookie را بدزدد. البته جلوی ارسال request از طرف کاربر توسط اسکریپت را نمی‌گیرد.",
      "`HttpOnly` limits XSS impact because malicious scripts can't steal the session cookie. It doesn't stop the script from making requests on the user's behalf, though.",
    ],
  },
  {
    id: "sec-j-secure-flag",
    level: "junior",
    tags: ["cookies", "tls"],
    q: [
      "flag `Secure` روی cookie چه تضمینی می‌دهد؟",
      "What does the `Secure` cookie flag guarantee?",
    ],
    options: [
      ["cookie فقط روی اتصال HTTPS ارسال می‌شود", "The cookie is only sent over HTTPS connections"],
      ["cookie به‌صورت رمزنگاری‌شده روی دیسک ذخیره می‌شود", "The cookie is stored encrypted on disk"],
      ["محتوای cookie قابل دستکاری توسط کاربر نیست", "The cookie's contents can't be tampered with by the user"],
      ["cookie فقط برای همان path ارسال می‌شود", "The cookie is only sent for the same path"],
    ],
    a: [
      "با `Secure` مرورگر cookie را روی HTTP ساده نمی‌فرستد تا در شبکه شنود نشود. این flag یکپارچگی یا محرمانگی محتوای cookie را روی دستگاه کاربر تضمین نمی‌کند.",
      "With `Secure`, the browser won't send the cookie over plain HTTP, preventing network sniffing. It does not protect the cookie's integrity or confidentiality on the user's device.",
    ],
  },
  {
    id: "sec-j-samesite-strict",
    level: "junior",
    tags: ["cookies", "csrf"],
    q: [
      "با `SameSite=Strict`، اگر کاربر از سایت دیگری روی لینک سایت شما کلیک کند چه اتفاقی برای cookie می‌افتد؟",
      "With `SameSite=Strict`, what happens to the cookie when a user clicks a link to your site from another site?",
    ],
    options: [
      ["cookie در آن navigation اولیه ارسال نمی‌شود", "The cookie is not sent on that initial navigation"],
      ["cookie ارسال می‌شود چون navigation از نوع GET است", "The cookie is sent because it's a GET navigation"],
      ["cookie برای همیشه از مرورگر حذف می‌شود", "The cookie is permanently deleted from the browser"],
      ["cookie فقط در صورت وجود `Secure` ارسال می‌شود", "The cookie is sent only if `Secure` is also set"],
    ],
    a: [
      "`Strict` در هیچ request cross-site حتی navigation سطح بالا cookie نمی‌فرستد، پس کاربر ممکن است لاگین‌نشده به نظر برسد. `Lax` در navigationهای GET سطح بالا cookie را می‌فرستد.",
      "`Strict` withholds the cookie on all cross-site requests, even top-level navigations, so the user may appear logged out. `Lax` does send it on top-level GET navigations.",
    ],
  },
  {
    id: "sec-j-samesite-none-requires-secure",
    level: "junior",
    tags: ["cookies"],
    q: [
      "برای تنظیم `SameSite=None` در مرورگرهای مدرن چه شرطی لازم است؟",
      "What is required to set `SameSite=None` in modern browsers?",
    ],
    options: [
      ["cookie باید flag `Secure` هم داشته باشد", "The cookie must also have the `Secure` flag"],
      ["cookie باید `HttpOnly` باشد", "The cookie must be `HttpOnly`"],
      ["cookie باید `Domain` صریح داشته باشد", "The cookie must have an explicit `Domain`"],
      ["cookie باید کمتر از ۱ ساعت اعتبار داشته باشد", "The cookie must expire within 1 hour"],
    ],
    a: [
      "مرورگرها cookie با `SameSite=None` بدون `Secure` را رد می‌کنند. این ترکیب برای سناریوهای cross-site مثل iframe یا embed لازم است.",
      "Browsers reject `SameSite=None` cookies that lack `Secure`. This combination is needed for cross-site scenarios like iframes or embeds.",
    ],
  },
  {
    id: "sec-j-jwt-parts",
    level: "junior",
    tags: ["jwt"],
    q: [
      "یک JWT از چه بخش‌هایی تشکیل شده است؟",
      "What parts make up a JWT?",
    ],
    options: [
      ["header، payload و signature که با نقطه جدا شده‌اند", "Header, payload, and signature separated by dots"],
      ["username، password و expiry که با کاما جدا شده‌اند", "Username, password, and expiry separated by commas"],
      ["public key، private key و payload", "Public key, private key, and payload"],
      ["فقط یک payload رمزنگاری‌شده با AES", "Only an AES-encrypted payload"],
    ],
    a: [
      "فرمت JWS به شکل `header.payload.signature` است که هر بخش base64url شده. header الگوریتم را مشخص می‌کند، payload شامل claimها و signature یکپارچگی را تضمین می‌کند.",
      "A JWS is `header.payload.signature`, each part base64url-encoded. The header names the algorithm, the payload holds claims, and the signature ensures integrity.",
    ],
  },
  {
    id: "sec-j-jwt-payload-readable",
    level: "junior",
    tags: ["jwt", "encoding"],
    q: [
      "آیا قرار دادن اطلاعات حساس مثل شماره کارت در payload یک JWT امضاشده امن است؟",
      "Is it safe to put sensitive data like a card number in the payload of a signed JWT?",
    ],
    options: [
      ["خیر، payload فقط base64url شده و هر کسی می‌تواند آن را بخواند", "No, the payload is only base64url-encoded and readable by anyone"],
      ["بله، امضا باعث می‌شود payload رمزنگاری شود", "Yes, the signature encrypts the payload"],
      ["بله، اگر از RS256 به جای HS256 استفاده شود", "Yes, if RS256 is used instead of HS256"],
      ["بله، چون فقط سرور می‌تواند JWT را decode کند", "Yes, because only the server can decode a JWT"],
    ],
    a: [
      "امضا فقط جلوی دستکاری را می‌گیرد، نه خواندن. اگر محرمانگی لازم است باید از JWE استفاده کرد یا اصلاً داده حساس را در token نگذاشت.",
      "A signature prevents tampering, not reading. If confidentiality is needed, use JWE or simply keep sensitive data out of the token.",
    ],
  },
  {
    id: "sec-j-jwt-exp-claim",
    level: "junior",
    tags: ["jwt"],
    q: [
      "claim `exp` در JWT چه چیزی را نشان می‌دهد؟",
      "What does the `exp` claim in a JWT represent?",
    ],
    options: [
      ["زمان انقضای token به‌صورت Unix timestamp", "The token's expiration time as a Unix timestamp"],
      ["زمان صدور token", "The time the token was issued"],
      ["سرویس صادرکننده token", "The service that issued the token"],
      ["مدت زمان باقی‌مانده به ثانیه", "The remaining lifetime in seconds"],
    ],
    a: [
      "`exp` یک NumericDate (ثانیه از epoch) است و سرور باید tokenهای منقضی را رد کند. `iat` زمان صدور و `iss` صادرکننده را نشان می‌دهد.",
      "`exp` is a NumericDate (seconds since epoch), and servers must reject expired tokens. `iat` is the issue time and `iss` is the issuer.",
    ],
  },
  {
    id: "sec-j-jwt-verify-vs-decode",
    level: "junior",
    tags: ["jwt"],
    q: [
      "سرور فقط JWT را با `jwt.decode()` می‌خواند و از `userId` آن استفاده می‌کند. مشکل چیست؟",
      "A server reads the JWT with `jwt.decode()` only and trusts its `userId`. What's the problem?",
    ],
    options: [
      ["امضا بررسی نمی‌شود، پس هر کسی می‌تواند token جعلی بسازد", "The signature isn't verified, so anyone can forge a token"],
      ["`decode` کندتر از `verify` است", "`decode` is slower than `verify`"],
      ["`decode` فقط در مرورگر کار می‌کند", "`decode` only works in the browser"],
      ["مشکلی نیست چون JWT همیشه رمزنگاری شده است", "Nothing, JWTs are always encrypted"],
    ],
    a: [
      "`decode` فقط base64url را باز می‌کند و امضا را چک نمی‌کند. همیشه باید با `jwt.verify()` و کلید و الگوریتم مشخص token را اعتبارسنجی کرد.",
      "`decode` only parses the base64url parts without checking the signature. Always validate with `jwt.verify()` using a fixed key and algorithm.",
    ],
  },
  {
    id: "sec-j-bearer-header",
    level: "junior",
    tags: ["jwt", "http"],
    q: [
      "روش رایج ارسال access token در یک REST API چیست؟",
      "What is the common way to send an access token to a REST API?",
    ],
    options: [
      ["header `Authorization: Bearer <token>`", "The header `Authorization: Bearer <token>`"],
      ["query string مثل `?token=<token>` در همه requestها", "A query string like `?token=<token>` on every request"],
      ["در body همه requestها حتی GET", "In the body of every request, even GET"],
      ["header `X-Password: <token>`", "The header `X-Password: <token>`"],
    ],
    a: [
      "scheme `Bearer` در RFC 6750 تعریف شده است. قرار دادن token در URL توصیه نمی‌شود چون در logها، history و header `Referer` نشت می‌کند.",
      "The `Bearer` scheme is defined in RFC 6750. Tokens in URLs are discouraged because they leak via logs, history, and the `Referer` header.",
    ],
  },
  {
    id: "sec-j-oauth-purpose",
    level: "junior",
    tags: ["oauth"],
    q: [
      "OAuth 2.0 در اصل برای چه هدفی طراحی شده است؟",
      "What was OAuth 2.0 primarily designed for?",
    ],
    options: [
      ["واگذاری دسترسی محدود (delegated authorization) به یک اپ بدون دادن پسورد", "Delegated authorization: granting an app limited access without sharing the password"],
      ["رمزنگاری ارتباط بین مرورگر و سرور", "Encrypting traffic between browser and server"],
      ["hash کردن امن پسورد کاربران", "Securely hashing user passwords"],
      ["جایگزینی کامل HTTPS", "Fully replacing HTTPS"],
    ],
    a: [
      "OAuth 2.0 یک پروتکل authorization است که به client اجازه می‌دهد با access token به منابع کاربر دسترسی داشته باشد. برای authentication روی آن از OpenID Connect استفاده می‌شود.",
      "OAuth 2.0 is an authorization protocol letting a client access user resources via an access token. OpenID Connect is layered on top for authentication.",
    ],
  },
  {
    id: "sec-j-oauth-roles",
    level: "junior",
    tags: ["oauth"],
    q: [
      "در OAuth 2.0، کدام نقش access token صادر می‌کند؟",
      "In OAuth 2.0, which role issues access tokens?",
    ],
    options: [
      ["Authorization Server", "Authorization Server"],
      ["Resource Server", "Resource Server"],
      ["Client", "Client"],
      ["Resource Owner", "Resource Owner"],
    ],
    a: [
      "چهار نقش وجود دارد: Resource Owner (کاربر)، Client (اپ)، Authorization Server (صادرکننده token) و Resource Server (API که token را می‌پذیرد).",
      "There are four roles: Resource Owner (user), Client (app), Authorization Server (issues tokens), and Resource Server (the API accepting tokens).",
    ],
  },
  {
    id: "sec-j-oidc-id-token",
    level: "junior",
    tags: ["oidc"],
    q: [
      "OpenID Connect چه چیزی به OAuth 2.0 اضافه می‌کند؟",
      "What does OpenID Connect add on top of OAuth 2.0?",
    ],
    options: [
      ["لایه authentication با ID token که هویت کاربر را مشخص می‌کند", "An authentication layer with an ID token describing the user's identity"],
      ["رمزنگاری end-to-end برای همه APIها", "End-to-end encryption for all APIs"],
      ["جایگزینی access token با session cookie", "Replacing access tokens with session cookies"],
      ["پشتیبانی از hash پسورد با Argon2", "Argon2 password hashing support"],
    ],
    a: [
      "OIDC یک ID token (همیشه JWT) با claimهایی مثل `sub`، `iss` و `aud` صادر می‌کند تا client بداند چه کسی لاگین کرده. scope `openid` این جریان را فعال می‌کند.",
      "OIDC issues an ID token (always a JWT) with claims like `sub`, `iss`, and `aud` so the client knows who logged in. The `openid` scope triggers it.",
    ],
  },
  {
    id: "sec-j-oauth-scopes",
    level: "junior",
    tags: ["oauth", "scopes"],
    q: [
      "scope در OAuth 2.0 چه چیزی را مشخص می‌کند؟",
      "What does a scope define in OAuth 2.0?",
    ],
    options: [
      ["محدوده دسترسی که client درخواست می‌کند، مثلاً `read:email`", "The extent of access the client requests, e.g. `read:email`"],
      ["مدت اعتبار access token", "The access token's lifetime"],
      ["الگوریتم امضای token", "The token's signing algorithm"],
      ["آدرس redirect بعد از لاگین", "The redirect URL after login"],
    ],
    a: [
      "scopeها دسترسی token را محدود می‌کنند و کاربر در صفحه consent آن‌ها را تأیید می‌کند. client باید حداقل scope لازم را درخواست کند.",
      "Scopes limit what a token can do, and the user approves them on the consent screen. Clients should request the minimum scopes needed.",
    ],
  },
  {
    id: "sec-j-mfa-factors",
    level: "junior",
    tags: ["mfa"],
    q: [
      "کدام ترکیب واقعاً احراز هویت چندعاملی (MFA) محسوب می‌شود؟",
      "Which combination truly counts as multi-factor authentication (MFA)?",
    ],
    options: [
      ["پسورد + کد TOTP از اپ authenticator روی گوشی", "Password + a TOTP code from an authenticator app on the phone"],
      ["پسورد + پاسخ سوال امنیتی", "Password + a security question answer"],
      ["دو پسورد متفاوت", "Two different passwords"],
      ["پسورد + PIN", "Password + PIN"],
    ],
    a: [
      "MFA یعنی ترکیب عوامل از دسته‌های مختلف: چیزی که می‌دانی، چیزی که داری و چیزی که هستی. پسورد، PIN و سوال امنیتی همه از دسته «دانستن»اند.",
      "MFA combines factors from different categories: something you know, have, or are. Passwords, PINs, and security questions are all 'know' factors.",
    ],
  },
  {
    id: "sec-j-totp",
    level: "junior",
    tags: ["mfa", "totp"],
    q: [
      "کد TOTP در اپ‌هایی مثل Google Authenticator چگونه تولید می‌شود؟",
      "How is a TOTP code in apps like Google Authenticator generated?",
    ],
    options: [
      ["از HMAC یک secret مشترک و زمان فعلی (معمولاً بازه‌های ۳۰ ثانیه‌ای)", "From an HMAC of a shared secret and the current time (usually 30-second steps)"],
      ["سرور هر ۳۰ ثانیه کد را با SMS به اپ می‌فرستد", "The server pushes the code to the app via SMS every 30 seconds"],
      ["به‌صورت کاملاً تصادفی و بدون ارتباط با سرور", "Purely at random with no relation to the server"],
      ["از hash پسورد کاربر و شماره تلفن", "From the user's password hash and phone number"],
    ],
    a: [
      "TOTP (RFC 6238) یک secret مشترک هنگام اسکن QR بین سرور و اپ رد و بدل می‌کند و هر دو طرف با زمان فعلی همان کد را محاسبه می‌کنند. نیاز به اتصال اینترنت ندارد.",
      "TOTP (RFC 6238) shares a secret between server and app when the QR code is scanned, and both compute the same code from the current time. No network connection is needed.",
    ],
  },
  {
    id: "sec-j-api-key",
    level: "junior",
    tags: ["api-keys"],
    q: [
      "API key معمولاً چه چیزی را شناسایی می‌کند؟",
      "What does an API key typically identify?",
    ],
    options: [
      ["اپلیکیشن یا پروژه فراخواننده، نه لزوماً کاربر نهایی", "The calling application or project, not necessarily an end user"],
      ["کاربر نهایی با همه نقش‌ها و مجوزهایش", "The end user with all their roles and permissions"],
      ["مرورگر کاربر", "The user's browser"],
      ["آدرس IP سرور مقصد", "The destination server's IP address"],
    ],
    a: [
      "API key یک secret ثابت برای شناسایی client و اعمال quota است. نباید در کد frontend قرار گیرد و بهتر است در سرور به‌صورت hash شده ذخیره شود.",
      "An API key is a static secret identifying a client and enforcing quotas. It shouldn't be shipped in frontend code and is best stored hashed on the server.",
    ],
  },
  {
    id: "sec-j-least-privilege",
    level: "junior",
    tags: ["least-privilege"],
    q: [
      "اصل least privilege یعنی چه؟",
      "What does the principle of least privilege mean?",
    ],
    options: [
      ["هر کاربر یا سرویس فقط حداقل دسترسی لازم برای کارش را داشته باشد", "Each user or service gets only the minimum access needed for its job"],
      ["کمترین تعداد کاربر به سیستم دسترسی داشته باشند", "As few users as possible should access the system"],
      ["admin همه دسترسی‌ها را داشته باشد تا خطا کمتر شود", "Admins get all permissions to reduce errors"],
      ["دسترسی‌ها فقط در محیط production محدود شوند", "Permissions are restricted only in production"],
    ],
    a: [
      "با least privilege اگر یک حساب یا سرویس نفوذ شود، آسیب محدود می‌ماند. مثلاً کاربر دیتابیس اپ نباید مجوز `DROP TABLE` داشته باشد.",
      "With least privilege, a compromised account or service causes limited damage. For example, the app's database user shouldn't have `DROP TABLE` rights.",
    ],
  },
  {
    id: "sec-j-rbac",
    level: "junior",
    tags: ["rbac", "authorization"],
    q: [
      "در RBAC مجوزها به چه چیزی اختصاص داده می‌شوند؟",
      "In RBAC, what are permissions assigned to?",
    ],
    options: [
      ["به نقش‌ها (roles) و کاربران به نقش‌ها اختصاص می‌یابند", "To roles, and users are assigned to roles"],
      ["مستقیماً به آدرس IP کاربران", "Directly to user IP addresses"],
      ["به هر ردیف دیتابیس به‌صورت جداگانه", "To each database row individually"],
      ["به session ID کاربر", "To the user's session ID"],
    ],
    a: [
      "Role-Based Access Control مجوزها را به نقش‌هایی مثل `admin` یا `editor` می‌دهد. ساده و رایج است ولی برای قوانین وابسته به ویژگی‌ها یا مالکیت، ABAC یا ReBAC انعطاف بیشتری دارند.",
      "Role-Based Access Control grants permissions to roles like `admin` or `editor`. It's simple and common, but ABAC or ReBAC are more flexible for attribute- or ownership-based rules.",
    ],
  },
  {
    id: "sec-j-sqli-basic",
    level: "junior",
    tags: ["sql-injection", "owasp"],
    q: [
      "بهترین راه جلوگیری از SQL injection چیست؟",
      "What is the best way to prevent SQL injection?",
    ],
    options: [
      ["استفاده از parameterized query یا prepared statement", "Using parameterized queries or prepared statements"],
      ["حذف کاراکتر `'` از ورودی کاربر", "Stripping the `'` character from user input"],
      ["محدود کردن طول ورودی به ۲۰ کاراکتر", "Limiting input length to 20 characters"],
      ["Base64 کردن ورودی قبل از قرار دادن در query", "Base64-encoding input before putting it in the query"],
    ],
    a: [
      "در query پارامتری، دیتابیس داده را جدا از کد SQL دریافت می‌کند و ورودی هرگز به‌عنوان SQL اجرا نمی‌شود، مثلاً `db.query('SELECT * FROM users WHERE id = $1', [id])`. فیلتر کاراکترها قابل دور زدن است.",
      "With parameterized queries the database receives data separately from SQL code, so input is never executed, e.g. `db.query('SELECT * FROM users WHERE id = $1', [id])`. Character filtering can be bypassed.",
    ],
  },
  {
    id: "sec-j-sqli-example",
    level: "junior",
    tags: ["sql-injection"],
    q: [
      "در کد `\"SELECT * FROM users WHERE name = '\" + name + \"'\"`، ورودی `' OR '1'='1` چه نتیجه‌ای دارد؟",
      "In `\"SELECT * FROM users WHERE name = '\" + name + \"'\"`, what does the input `' OR '1'='1` do?",
    ],
    options: [
      ["شرط همیشه true می‌شود و همه کاربران برگردانده می‌شوند", "The condition becomes always true and all users are returned"],
      ["خطای syntax می‌دهد و هیچ اثری ندارد", "It causes a syntax error with no effect"],
      ["فقط کاربری با نام `OR` پیدا می‌شود", "It finds only a user named `OR`"],
      ["جدول users حذف می‌شود", "It drops the users table"],
    ],
    a: [
      "query نهایی `WHERE name = '' OR '1'='1'` می‌شود که برای همه ردیف‌ها true است. این نمونه کلاسیک SQL injection به دلیل الحاق رشته است.",
      "The final query becomes `WHERE name = '' OR '1'='1'`, which is true for every row. This is the classic SQL injection caused by string concatenation.",
    ],
  },
  {
    id: "sec-j-xss-definition",
    level: "junior",
    tags: ["xss", "owasp"],
    q: [
      "حمله XSS (Cross-Site Scripting) چیست؟",
      "What is an XSS (Cross-Site Scripting) attack?",
    ],
    options: [
      ["تزریق اسکریپت مخرب که در مرورگر کاربران دیگر در context سایت اجرا می‌شود", "Injecting malicious script that runs in other users' browsers in the site's context"],
      ["ارسال request جعلی از سایت دیگر با cookie کاربر", "Sending forged requests from another site with the user's cookie"],
      ["تزریق کد SQL در فرم‌های ورودی", "Injecting SQL into form inputs"],
      ["وادار کردن سرور به درخواست به آدرس‌های داخلی", "Forcing the server to request internal addresses"],
    ],
    a: [
      "در XSS مهاجم HTML/JS را به صفحه تزریق می‌کند و این کد با دسترسی‌های origin سایت اجرا می‌شود. راه اصلی جلوگیری output encoding متناسب با context و CSP است.",
      "In XSS an attacker injects HTML/JS into a page that runs with the site's origin privileges. The main defenses are context-aware output encoding and CSP.",
    ],
  },
  {
    id: "sec-j-stored-vs-reflected-xss",
    level: "junior",
    tags: ["xss"],
    q: [
      "تفاوت stored XSS و reflected XSS چیست؟",
      "What's the difference between stored and reflected XSS?",
    ],
    options: [
      ["stored در دیتابیس ذخیره و به همه نمایش داده می‌شود؛ reflected از request فعلی (مثل URL) بازتاب می‌شود", "Stored is saved in the DB and shown to everyone; reflected echoes from the current request (e.g. URL)"],
      ["stored فقط در cookie و reflected فقط در localStorage است", "Stored lives only in cookies, reflected only in localStorage"],
      ["reflected خطرناک‌تر است چون نیاز به کلیک ندارد", "Reflected is more dangerous because no click is needed"],
      ["stored فقط سمت سرور و reflected فقط سمت کلاینت اجرا می‌شود", "Stored runs only on the server, reflected only on the client"],
    ],
    a: [
      "stored XSS مثلاً در یک کامنت ذخیره می‌شود و هر بازدیدکننده را آلوده می‌کند. reflected XSS معمولاً نیاز دارد قربانی روی لینک دستکاری‌شده کلیک کند.",
      "Stored XSS is persisted, e.g. in a comment, and hits every visitor. Reflected XSS usually requires the victim to click a crafted link.",
    ],
  },
  {
    id: "sec-j-output-encoding",
    level: "junior",
    tags: ["xss"],
    q: [
      "برای نمایش امن نام کاربر داخل HTML، چه باید کرد؟",
      "To safely display a user's name inside HTML, what should you do?",
    ],
    options: [
      ["HTML-escape کردن کاراکترهایی مثل `<`، `>`، `&` و `\"` هنگام خروجی", "HTML-escape characters like `<`, `>`, `&`, and `\"` on output"],
      ["قرار دادن مستقیم با `innerHTML`", "Insert it directly with `innerHTML`"],
      ["Base64 کردن نام قبل از ذخیره", "Base64-encode the name before storing it"],
      ["فقط بررسی طول نام در frontend", "Only validate the name's length in the frontend"],
    ],
    a: [
      "encode کردن خروجی باعث می‌شود مرورگر ورودی را به‌عنوان متن نمایش دهد نه markup. فریم‌ورک‌هایی مثل React به‌صورت پیش‌فرض این کار را انجام می‌دهند، مگر با `dangerouslySetInnerHTML`.",
      "Output encoding makes the browser render input as text, not markup. Frameworks like React do this by default unless you use `dangerouslySetInnerHTML`.",
    ],
  },
  {
    id: "sec-j-csrf-definition",
    level: "junior",
    tags: ["csrf", "owasp"],
    q: [
      "حمله CSRF از چه رفتاری در مرورگر سوءاستفاده می‌کند؟",
      "What browser behavior does a CSRF attack exploit?",
    ],
    options: [
      ["ارسال خودکار cookieها همراه requestهای cross-site به سایت هدف", "Automatically attaching cookies to cross-site requests to the target site"],
      ["اجرای اسکریپت‌های تزریق‌شده در صفحه", "Executing injected scripts in the page"],
      ["ذخیره پسورد در autofill مرورگر", "Saving passwords in browser autofill"],
      ["cache شدن پاسخ‌های HTTP", "Caching of HTTP responses"],
    ],
    a: [
      "در CSRF سایت مخرب کاربر را وادار می‌کند requestی به سایت شما بفرستد و مرورگر cookie session را خودکار ضمیمه می‌کند. CSRF token و `SameSite` cookie دفاع‌های اصلی‌اند.",
      "In CSRF a malicious site makes the user's browser send a request to your site, and the browser attaches the session cookie automatically. CSRF tokens and `SameSite` cookies are the main defenses.",
    ],
  },
  {
    id: "sec-j-csrf-token",
    level: "junior",
    tags: ["csrf"],
    q: [
      "چرا CSRF token جلوی حمله CSRF را می‌گیرد؟",
      "Why does a CSRF token prevent CSRF attacks?",
    ],
    options: [
      ["سایت مهاجم نمی‌تواند مقدار تصادفی token را بخواند و در request قرار دهد", "The attacker's site can't read the random token value to include it in the request"],
      ["token جلوی ارسال cookie را می‌گیرد", "The token stops the cookie from being sent"],
      ["token پسورد کاربر را رمزنگاری می‌کند", "The token encrypts the user's password"],
      ["token فقط requestهای GET را مسدود می‌کند", "The token blocks GET requests only"],
    ],
    a: [
      "سرور یک مقدار غیرقابل حدس در فرم یا header انتظار دارد. به دلیل Same-Origin Policy سایت دیگر نمی‌تواند آن را بخواند، پس request جعلی رد می‌شود.",
      "The server expects an unguessable value in a form field or header. Due to the Same-Origin Policy, another site can't read it, so forged requests are rejected.",
    ],
  },
  {
    id: "sec-j-idor",
    level: "junior",
    tags: ["idor", "authorization"],
    q: [
      "کاربر با تغییر `/api/orders/1001` به `/api/orders/1002` سفارش شخص دیگری را می‌بیند. این چه آسیب‌پذیری است؟",
      "A user changes `/api/orders/1001` to `/api/orders/1002` and sees someone else's order. What vulnerability is this?",
    ],
    options: [
      ["IDOR / Broken Object Level Authorization", "IDOR / Broken Object Level Authorization"],
      ["SQL injection", "SQL injection"],
      ["Cross-Site Request Forgery", "Cross-Site Request Forgery"],
      ["Open redirect", "Open redirect"],
    ],
    a: [
      "سرور فقط بررسی کرده کاربر لاگین است، نه اینکه مالک آن شیء باشد. باید در هر request مالکیت یا مجوز روی همان رکورد بررسی شود؛ استفاده از UUID به‌تنهایی کافی نیست.",
      "The server checked that the user is logged in, not that they own the object. Ownership or permission must be checked per record on every request; UUIDs alone aren't enough.",
    ],
  },
  {
    id: "sec-j-https-purpose",
    level: "junior",
    tags: ["tls", "https"],
    q: [
      "HTTPS (TLS) چه چیزی را فراهم می‌کند؟",
      "What does HTTPS (TLS) provide?",
    ],
    options: [
      ["محرمانگی، یکپارچگی داده در مسیر و احراز هویت سرور", "Confidentiality, integrity in transit, and server authentication"],
      ["محافظت در برابر XSS و SQL injection", "Protection against XSS and SQL injection"],
      ["رمزنگاری داده‌ها در دیتابیس سرور", "Encryption of data in the server's database"],
      ["تضمین اینکه سرور هیچ باگ امنیتی ندارد", "A guarantee that the server has no security bugs"],
    ],
    a: [
      "TLS داده را در مسیر شبکه رمزنگاری می‌کند و با certificate هویت سرور را تأیید می‌کند. این encryption in transit است و از داده ذخیره‌شده (at rest) یا باگ‌های اپ محافظت نمی‌کند.",
      "TLS encrypts data on the wire and verifies the server via its certificate. This is encryption in transit and doesn't protect stored data or fix app bugs.",
    ],
  },
  {
    id: "sec-j-hsts",
    level: "junior",
    tags: ["hsts", "tls"],
    q: [
      "header `Strict-Transport-Security` چه کاری انجام می‌دهد؟",
      "What does the `Strict-Transport-Security` header do?",
    ],
    options: [
      ["به مرورگر می‌گوید برای مدت مشخص فقط با HTTPS به سایت وصل شود", "Tells the browser to use only HTTPS for the site for a set period"],
      ["همه cookieها را `HttpOnly` می‌کند", "Makes all cookies `HttpOnly`"],
      ["از بارگذاری سایت در iframe جلوگیری می‌کند", "Prevents the site from loading in an iframe"],
      ["اسکریپت‌های inline را مسدود می‌کند", "Blocks inline scripts"],
    ],
    a: [
      "HSTS با `max-age` باعث می‌شود مرورگر هر تلاش HTTP را خودکار به HTTPS تبدیل کند و جلوی حمله SSL stripping را بگیرد. با `preload` حتی اولین بازدید هم محافظت می‌شود.",
      "HSTS with `max-age` makes the browser upgrade every HTTP attempt to HTTPS, preventing SSL stripping. With `preload`, even the first visit is protected.",
    ],
  },
  {
    id: "sec-j-rate-limit-login",
    level: "junior",
    tags: ["rate-limiting", "brute-force"],
    q: [
      "چرا endpoint لاگین باید rate limit داشته باشد؟",
      "Why should a login endpoint be rate limited?",
    ],
    options: [
      ["برای کند کردن حملات brute-force و credential stuffing", "To slow down brute-force and credential stuffing attacks"],
      ["برای کاهش حجم دیتابیس", "To reduce database size"],
      ["برای جلوگیری از XSS در فرم لاگین", "To prevent XSS in the login form"],
      ["چون HTTPS بدون rate limit کار نمی‌کند", "Because HTTPS doesn't work without rate limits"],
    ],
    a: [
      "بدون محدودیت، مهاجم می‌تواند هزاران پسورد در دقیقه امتحان کند. rate limit بر اساس IP و حساب، همراه با CAPTCHA یا تأخیر تدریجی، این حملات را غیرعملی می‌کند.",
      "Without limits, attackers can try thousands of passwords per minute. Rate limiting per IP and per account, plus CAPTCHA or progressive delays, makes these attacks impractical.",
    ],
  },
  {
    id: "sec-j-credential-stuffing",
    level: "junior",
    tags: ["credential-stuffing"],
    q: [
      "credential stuffing چیست؟",
      "What is credential stuffing?",
    ],
    options: [
      ["امتحان کردن جفت‌های username/password نشت‌شده از سایت‌های دیگر", "Trying username/password pairs leaked from other sites"],
      ["حدس زدن همه ترکیب‌های ممکن پسورد برای یک کاربر", "Guessing every possible password combination for one user"],
      ["تزریق credential در query دیتابیس", "Injecting credentials into a database query"],
      ["ذخیره پسوردها در cookie", "Storing passwords in cookies"],
    ],
    a: [
      "چون کاربران پسورد را بین سایت‌ها تکرار می‌کنند، لیست‌های نشت‌شده روی سایت‌های دیگر هم کار می‌کنند. MFA، بررسی پسوردهای لو رفته و rate limiting دفاع‌های مؤثرند.",
      "Because users reuse passwords, leaked lists work on other sites too. MFA, breached-password checks, and rate limiting are effective defenses.",
    ],
  },
  {
    id: "sec-j-account-enumeration",
    level: "junior",
    tags: ["account-enumeration"],
    q: [
      "کدام پیام خطای لاگین از account enumeration جلوگیری می‌کند؟",
      "Which login error message prevents account enumeration?",
    ],
    options: [
      ["«نام کاربری یا رمز عبور نادرست است»", "'Invalid username or password'"],
      ["«کاربری با این ایمیل وجود ندارد»", "'No user exists with this email'"],
      ["«رمز عبور برای این کاربر اشتباه است»", "'Wrong password for this user'"],
      ["«این حساب قفل شده است»", "'This account is locked'"],
    ],
    a: [
      "پیام‌های متفاوت به مهاجم می‌گویند کدام ایمیل‌ها ثبت شده‌اند. پیام یکسان (و زمان پاسخ مشابه) در لاگین، ثبت‌نام و فراموشی رمز این نشت را می‌بندد.",
      "Distinct messages reveal which emails are registered. A uniform message (and similar response time) on login, signup, and password reset closes this leak.",
    ],
  },
  {
    id: "sec-j-secrets-in-git",
    level: "junior",
    tags: ["secrets"],
    q: [
      "کجا نباید API key و پسورد دیتابیس را نگه داشت؟",
      "Where should you NOT keep API keys and database passwords?",
    ],
    options: [
      ["در سورس کد commit شده در Git", "In source code committed to Git"],
      ["در environment variables سرور", "In server environment variables"],
      ["در یک secrets manager مثل Vault", "In a secrets manager like Vault"],
      ["در secret store سرویس CI/CD", "In the CI/CD service's secret store"],
    ],
    a: [
      "secretهای commit‌شده در تاریخچه Git باقی می‌مانند حتی اگر بعداً حذف شوند. اگر secret لو رفت باید فوراً rotate شود، نه فقط از repo پاک شود.",
      "Secrets committed to Git persist in history even after deletion. A leaked secret must be rotated immediately, not just removed from the repo.",
    ],
  },
  {
    id: "sec-j-symmetric-vs-asymmetric",
    level: "junior",
    tags: ["crypto-basics"],
    q: [
      "تفاوت رمزنگاری متقارن و نامتقارن چیست؟",
      "What's the difference between symmetric and asymmetric encryption?",
    ],
    options: [
      ["متقارن یک کلید مشترک دارد؛ نامتقارن یک جفت کلید عمومی و خصوصی", "Symmetric uses one shared key; asymmetric uses a public/private key pair"],
      ["متقارن فقط برای hash و نامتقارن برای encoding است", "Symmetric is only for hashing, asymmetric for encoding"],
      ["نامتقارن همیشه سریع‌تر از متقارن است", "Asymmetric is always faster than symmetric"],
      ["متقارن برگشت‌ناپذیر و نامتقارن برگشت‌پذیر است", "Symmetric is irreversible, asymmetric is reversible"],
    ],
    a: [
      "AES نمونه متقارن و سریع است؛ RSA و ECC نامتقارن و کندترند. در TLS از نامتقارن برای توافق کلید و از متقارن برای رمزنگاری داده استفاده می‌شود.",
      "AES is symmetric and fast; RSA and ECC are asymmetric and slower. TLS uses asymmetric crypto for key agreement and symmetric crypto for the data.",
    ],
  },
  {
    id: "sec-j-at-rest-vs-transit",
    level: "junior",
    tags: ["encryption"],
    q: [
      "encryption at rest در مقابل encryption in transit از چه چیزی محافظت می‌کند؟",
      "What does encryption at rest protect against, compared to encryption in transit?",
    ],
    options: [
      ["از داده ذخیره‌شده روی دیسک یا backup در صورت سرقت رسانه", "Stored data on disks or backups if the media is stolen"],
      ["از شنود ترافیک بین کلاینت و سرور", "Eavesdropping on client-server traffic"],
      ["از حملات XSS در مرورگر", "XSS attacks in the browser"],
      ["از SQL injection در query ها", "SQL injection in queries"],
    ],
    a: [
      "at rest یعنی رمزنگاری داده ذخیره‌شده (دیسک، دیتابیس، backup) و in transit یعنی رمزنگاری در شبکه با TLS. هیچ‌کدام جلوی دسترسی از طریق خود اپ آسیب‌پذیر را نمی‌گیرند.",
      "At rest means encrypting stored data (disks, DBs, backups); in transit means encrypting on the network with TLS. Neither stops access through a vulnerable app itself.",
    ],
  },
  {
    id: "sec-j-command-injection",
    level: "junior",
    tags: ["command-injection", "owasp"],
    q: [
      "کد `exec('ping ' + req.query.host)` در Node.js چه آسیب‌پذیری دارد؟",
      "What vulnerability does `exec('ping ' + req.query.host)` in Node.js have?",
    ],
    options: [
      ["command injection؛ ورودی مثل `8.8.8.8; rm -rf /` دستور اضافه اجرا می‌کند", "Command injection; input like `8.8.8.8; rm -rf /` runs extra commands"],
      ["XSS چون خروجی ping در صفحه نمایش داده می‌شود", "XSS because ping output is shown on the page"],
      ["CSRF چون از query string استفاده شده", "CSRF because it uses a query string"],
      ["مشکلی ندارد چون ping دستور بی‌خطری است", "None, since ping is a harmless command"],
    ],
    a: [
      "`exec` رشته را به shell می‌دهد و کاراکترهایی مثل `;`، `&&` و `|` دستور جدید می‌سازند. باید از `execFile`/`spawn` با آرایه آرگومان‌ها و validation ورودی استفاده کرد.",
      "`exec` passes the string to a shell where `;`, `&&`, and `|` start new commands. Use `execFile`/`spawn` with an argument array plus input validation.",
    ],
  },
  {
    id: "sec-j-path-traversal",
    level: "junior",
    tags: ["path-traversal", "owasp"],
    q: [
      "درخواست `/download?file=../../etc/passwd` نمونه کدام حمله است؟",
      "The request `/download?file=../../etc/passwd` is an example of which attack?",
    ],
    options: [
      ["Path traversal", "Path traversal"],
      ["SSRF", "SSRF"],
      ["Open redirect", "Open redirect"],
      ["Clickjacking", "Clickjacking"],
    ],
    a: [
      "با `../` مهاجم از پوشه مجاز خارج می‌شود. باید مسیر را normalize کرد (مثلاً `path.resolve`) و بررسی کرد هنوز داخل پوشه پایه است، یا از شناسه به جای نام فایل استفاده کرد.",
      "Using `../` the attacker escapes the allowed directory. Normalize the path (e.g. `path.resolve`) and verify it stays inside the base folder, or use IDs instead of filenames.",
    ],
  },
  {
    id: "sec-j-open-redirect",
    level: "junior",
    tags: ["open-redirect"],
    q: [
      "endpoint `/login?next=https://evil.com` کاربر را بعد از لاگین به هر آدرسی redirect می‌کند. خطر اصلی چیست؟",
      "`/login?next=https://evil.com` redirects users anywhere after login. What's the main risk?",
    ],
    options: [
      ["phishing با استفاده از اعتبار دامنه شما و نشت token در flowهای OAuth", "Phishing that abuses your domain's trust, and token leakage in OAuth flows"],
      ["SQL injection در پارامتر `next`", "SQL injection via the `next` parameter"],
      ["افزایش مصرف CPU سرور", "Increased server CPU usage"],
      ["از کار افتادن cookieهای `HttpOnly`", "Breaking `HttpOnly` cookies"],
    ],
    a: [
      "open redirect لینک‌های phishing را معتبر جلوه می‌دهد و در OAuth می‌تواند code یا token را به مهاجم برساند. فقط مسیرهای نسبی یا allowlist دامنه‌ها را بپذیرید.",
      "Open redirects make phishing links look legitimate and can leak codes or tokens to attackers in OAuth. Accept only relative paths or an allowlist of domains.",
    ],
  },
  {
    id: "sec-j-validate-server-side",
    level: "junior",
    tags: ["validation"],
    q: [
      "چرا validation فقط در frontend کافی نیست؟",
      "Why isn't frontend-only validation enough?",
    ],
    options: [
      ["مهاجم می‌تواند مستقیماً با curl یا Postman به API درخواست بفرستد", "Attackers can call the API directly with curl or Postman"],
      ["مرورگرها validation را به‌صورت تصادفی نادیده می‌گیرند", "Browsers randomly ignore validation"],
      ["validation در frontend باعث XSS می‌شود", "Frontend validation causes XSS"],
      ["چون HTTPS داده‌های فرم را تغییر می‌دهد", "Because HTTPS modifies form data"],
    ],
    a: [
      "validation در frontend فقط برای تجربه کاربری است و به‌راحتی دور زده می‌شود. سرور باید همه ورودی‌ها را دوباره validate و authorize کند.",
      "Frontend validation is only for UX and is trivially bypassed. The server must re-validate and authorize every input.",
    ],
  },
  {
    id: "sec-j-dependency-audit",
    level: "junior",
    tags: ["supply-chain", "dependencies"],
    q: [
      "دستور `npm audit` چه کاری انجام می‌دهد؟",
      "What does `npm audit` do?",
    ],
    options: [
      ["وابستگی‌ها را با پایگاه داده آسیب‌پذیری‌های شناخته‌شده مقایسه می‌کند", "Checks dependencies against a database of known vulnerabilities"],
      ["کد پروژه را برای باگ‌های منطقی بررسی می‌کند", "Scans your code for logic bugs"],
      ["همه پکیج‌ها را به آخرین نسخه major ارتقا می‌دهد", "Upgrades all packages to the latest major version"],
      ["سرعت نصب پکیج‌ها را بهینه می‌کند", "Optimizes package install speed"],
    ],
    a: [
      "`npm audit` آسیب‌پذیری‌های شناخته‌شده (CVE) در درخت وابستگی‌ها را گزارش می‌دهد. ابزارهایی مثل Dependabot یا Snyk این کار را در CI خودکار می‌کنند.",
      "`npm audit` reports known vulnerabilities (CVEs) in the dependency tree. Tools like Dependabot or Snyk automate this in CI.",
    ],
  },
]);
