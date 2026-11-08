import { build } from "../build";

export const authSecuritySenior = build("auth-security", [
  {
    id: "sec-s-jwt-alg-confusion",
    level: "senior",
    tags: ["jwt", "crypto-basics"],
    q: [
      "در حمله algorithm confusion روی JWT، مهاجم token را با `HS256` امضا می‌کند در حالی که سرور انتظار `RS256` دارد. چرا ممکن است موفق شود؟",
      "In a JWT algorithm confusion attack, the attacker signs with `HS256` while the server expects `RS256`. Why might it succeed?",
    ],
    options: [
      ["کتابخانه از public key (که عمومی است) به‌عنوان HMAC secret استفاده می‌کند", "The library uses the (public) RSA public key as the HMAC secret"],
      ["چون HS256 و RS256 خروجی یکسانی دارند", "Because HS256 and RS256 produce identical output"],
      ["چون مهاجم private key را از JWKS دانلود می‌کند", "Because the attacker downloads the private key from JWKS"],
      ["چون RS256 امضا را بررسی نمی‌کند", "Because RS256 doesn't check signatures"],
    ],
    a: [
      "اگر verify با یک کلید و الگوریتم برگرفته از header انجام شود، public key به‌عنوان کلید متقارن به کار می‌رود و مهاجم که آن را دارد می‌تواند امضای معتبر بسازد. الگوریتم را به کلید گره بزنید و صریحاً pin کنید.",
      "If verification uses the header's algorithm with one key, the public key is treated as a symmetric secret, and the attacker who has it can forge signatures. Bind the algorithm to the key and pin it explicitly.",
    ],
  },
  {
    id: "sec-s-jwt-kid-injection",
    level: "senior",
    tags: ["jwt"],
    q: [
      "کدام خطر مربوط به header `kid` یا `jku` در JWT است؟",
      "Which risk is associated with the `kid` or `jku` JWT header?",
    ],
    options: [
      ["اگر سرور بدون allowlist کلید را از مسیر یا URL مشخص‌شده بارگذاری کند، مهاجم کلید خودش را تحمیل می‌کند", "If the server loads keys from the given path or URL without an allowlist, the attacker can supply their own key"],
      ["`kid` باعث می‌شود payload رمزنگاری نشود", "`kid` prevents the payload from being encrypted"],
      ["`jku` زمان انقضا را غیرفعال می‌کند", "`jku` disables expiration"],
      ["`kid` فقط در HS256 مجاز است", "`kid` is only allowed with HS256"],
    ],
    a: [
      "`jku` می‌تواند به JWKS تحت کنترل مهاجم اشاره کند و `kid` در صورت استفاده در query یا مسیر فایل به SQL injection یا path traversal منجر شود. کلیدها باید فقط از issuer مورد اعتماد و از پیش پیکربندی‌شده بارگذاری شوند.",
      "`jku` can point to an attacker-controlled JWKS, and `kid` used in queries or file paths can enable SQL injection or path traversal. Only load keys from a preconfigured trusted issuer.",
    ],
  },
  {
    id: "sec-s-jwt-vs-session-tradeoff",
    level: "senior",
    tags: ["jwt", "sessions", "architecture"],
    q: [
      "برای یک وب‌اپ monolith با یک دامنه که نیاز به logout فوری و تغییر سریع مجوزها دارد، کدام انتخاب معقول‌تر است؟",
      "For a single-domain monolith web app needing instant logout and quick permission changes, which choice is more sensible?",
    ],
    options: [
      ["session سمت سرور با cookie `HttpOnly`؛ revoke فوری و state متمرکز", "Server-side sessions with an `HttpOnly` cookie; instant revocation and centralized state"],
      ["JWT با عمر ۳۰ روز در localStorage", "A 30-day JWT in localStorage"],
      ["JWT بدون `exp` برای سادگی", "A JWT without `exp` for simplicity"],
      ["Basic Auth در هر request", "Basic Auth on every request"],
    ],
    a: [
      "مزیت stateless بودن JWT در سیستم‌های توزیع‌شده و چنددامنه‌ای است، ولی revoke و به‌روزرسانی مجوز را سخت می‌کند. در monolith یک lookup در Redis هزینه ناچیزی دارد و کنترل کامل می‌دهد.",
      "JWT statelessness shines in distributed, multi-domain systems but makes revocation and permission updates hard. In a monolith, a Redis lookup is cheap and gives full control.",
    ],
  },
  {
    id: "sec-s-bff-pattern",
    level: "senior",
    tags: ["oauth", "architecture"],
    q: [
      "الگوی Backend-for-Frontend (BFF) برای SPAها در OAuth چه مزیت امنیتی دارد؟",
      "What security benefit does the Backend-for-Frontend (BFF) pattern give SPAs using OAuth?",
    ],
    options: [
      ["tokenها فقط روی سرور BFF می‌مانند و مرورگر فقط cookie `HttpOnly` دارد", "Tokens stay on the BFF server and the browser only holds an `HttpOnly` cookie"],
      ["نیاز به HTTPS را از بین می‌برد", "It removes the need for HTTPS"],
      ["CSRF را به‌طور کامل غیرممکن می‌کند بدون هیچ اقدام دیگری", "It makes CSRF impossible without any other measures"],
      ["access token را در URL قرار می‌دهد تا cache شود", "It puts the access token in the URL for caching"],
    ],
    a: [
      "BFF یک confidential client است که flow OAuth را انجام می‌دهد و tokenها را از دسترس JavaScript خارج می‌کند، پس XSS نمی‌تواند آن‌ها را exfiltrate کند. همچنان باید CSRF را با SameSite و token کنترل کرد.",
      "The BFF is a confidential client that runs the OAuth flow and keeps tokens away from JavaScript, so XSS can't exfiltrate them. CSRF must still be handled with SameSite and tokens.",
    ],
  },
  {
    id: "sec-s-xss-with-httponly",
    level: "senior",
    tags: ["xss", "cookies", "threat-modeling"],
    q: [
      "اگر session cookie `HttpOnly` باشد، یک XSS موفق همچنان چه کاری می‌تواند انجام دهد؟",
      "If the session cookie is `HttpOnly`, what can a successful XSS still do?",
    ],
    options: [
      ["از طرف کاربر و با session او requestهای دلخواه به API بزند و داده‌ها را بخواند", "Make arbitrary authenticated API requests as the user and read the data"],
      ["هیچ کاری؛ `HttpOnly` همه اثرات XSS را خنثی می‌کند", "Nothing; `HttpOnly` neutralizes all XSS impact"],
      ["فقط ظاهر صفحه را تغییر دهد", "Only change the page's appearance"],
      ["فقط cookieهای سایت‌های دیگر را بخواند", "Only read other sites' cookies"],
    ],
    a: [
      "`HttpOnly` فقط سرقت cookie را مانع می‌شود؛ اسکریپت در همان origin اجرا می‌شود و `fetch` با credentials می‌فرستد، حتی CSRF token را از DOM می‌خواند. پیشگیری از خود XSS (encoding، CSP، Trusted Types) ضروری است.",
      "`HttpOnly` only prevents cookie theft; the script runs in the same origin, sends credentialed `fetch` calls, and can even read CSRF tokens from the DOM. Preventing XSS itself (encoding, CSP, Trusted Types) is essential.",
    ],
  },
  {
    id: "sec-s-refresh-token-public-client",
    level: "senior",
    tags: ["refresh-token", "oauth"],
    q: [
      "طبق OAuth Security BCP، refresh tokenهای صادرشده برای public clientها (مثل SPA) باید چه ویژگی داشته باشند؟",
      "Per the OAuth Security BCP, what must refresh tokens issued to public clients (like SPAs) have?",
    ],
    options: [
      ["یا sender-constrained باشند (DPoP/mTLS) یا با rotation یک‌بارمصرف شوند", "Be either sender-constrained (DPoP/mTLS) or rotated as single-use"],
      ["عمر نامحدود داشته باشند تا UX بهتر شود", "Have unlimited lifetime for better UX"],
      ["در query string ارسال شوند", "Be sent in the query string"],
      ["با client secret داخل bundle JavaScript امضا شوند", "Be signed with a client secret embedded in the JS bundle"],
    ],
    a: [
      "public client نمی‌تواند secret نگه دارد، پس refresh token دزدیده‌شده باید یا بدون کلید دستگاه بی‌فایده باشد یا با reuse detection کشف شود. محدودیت عمر مطلق و idle timeout هم توصیه می‌شود.",
      "Public clients can't keep secrets, so a stolen refresh token must either be useless without the device key or be detected via reuse detection. Absolute and idle lifetimes are also recommended.",
    ],
  },
  {
    id: "sec-s-dpop",
    level: "senior",
    tags: ["oauth", "dpop"],
    q: [
      "DPoP (Demonstrating Proof-of-Possession) چه مشکلی از bearer tokenها را حل می‌کند؟",
      "What problem with bearer tokens does DPoP (Demonstrating Proof-of-Possession) solve?",
    ],
    options: [
      ["token دزدیده‌شده بدون کلید خصوصی client قابل استفاده نیست", "A stolen token is unusable without the client's private key"],
      ["نیاز به authorization server را حذف می‌کند", "It removes the need for an authorization server"],
      ["token را کوتاه‌تر و سبک‌تر می‌کند", "It makes tokens shorter and lighter"],
      ["امکان ارسال token روی HTTP ساده را می‌دهد", "It allows sending tokens over plain HTTP"],
    ],
    a: [
      "در DPoP access token به hash یک public key (`cnf.jkt`) گره می‌خورد و client برای هر request یک proof JWT با متد، URL و nonce امضا می‌کند. bearer token برعکس توسط هر دارنده‌ای قابل استفاده است.",
      "With DPoP the access token is bound to a public key thumbprint (`cnf.jkt`), and the client signs a proof JWT per request covering method, URL, and nonce. Bearer tokens, by contrast, work for anyone holding them.",
    ],
  },
  {
    id: "sec-s-token-exchange-microservices",
    level: "senior",
    tags: ["oauth", "microservices"],
    q: [
      "در زنجیره microservice، چرا forward کردن همان access token کاربر به همه سرویس‌های downstream ریسک دارد؟",
      "In a microservice chain, why is forwarding the user's same access token to all downstream services risky?",
    ],
    options: [
      ["هر سرویس نفوذشده می‌تواند با token پرقدرت به همه سرویس‌های دیگر دسترسی پیدا کند؛ token exchange با audience محدود بهتر است", "Any compromised service can replay the powerful token everywhere; token exchange with narrowed audience is better"],
      ["چون JWT بعد از یک hop منقضی می‌شود", "Because JWTs expire after one hop"],
      ["چون سرویس‌های downstream نمی‌توانند header را بخوانند", "Because downstream services can't read headers"],
      ["هیچ ریسکی ندارد و best practice است", "No risk; it's best practice"],
    ],
    a: [
      "token با `aud` گسترده عملاً یک کلید همه‌کاره است. با OAuth Token Exchange (RFC 8693) هر hop یک token با audience و scope محدود برای سرویس بعدی می‌گیرد و هویت کاربر حفظ می‌شود.",
      "A broad-`aud` token is effectively a master key. With OAuth Token Exchange (RFC 8693), each hop obtains a token narrowed in audience and scope for the next service while preserving user identity.",
    ],
  },
  {
    id: "sec-s-bola-architecture",
    level: "senior",
    tags: ["idor", "authorization", "architecture"],
    q: [
      "کدام راهبرد معماری BOLA/IDOR را در یک API بزرگ به‌صورت سیستماتیک کاهش می‌دهد؟",
      "Which architectural strategy systematically reduces BOLA/IDOR in a large API?",
    ],
    options: [
      ["متمرکز کردن authorization در یک لایه policy و scope کردن queryها به tenant/مالک به‌صورت پیش‌فرض", "Centralizing authorization in a policy layer and scoping queries to tenant/owner by default"],
      ["تبدیل همه IDهای عددی به UUID", "Switching all numeric IDs to UUIDs"],
      ["مخفی کردن مستندات API", "Hiding the API documentation"],
      ["افزودن CAPTCHA به همه endpointها", "Adding CAPTCHA to every endpoint"],
    ],
    a: [
      "UUID فقط حدس زدن را سخت‌تر می‌کند و IDها اغلب از جاهای دیگر نشت می‌کنند. بررسی مجوز در هر endpoint به‌صورت دستی فراموش می‌شود؛ policy engine (مثل OPA یا Cedar) و repositoryهای tenant-scoped یا Row-Level Security آن را پیش‌فرض می‌کنند.",
      "UUIDs only make guessing harder, and IDs often leak elsewhere. Per-endpoint manual checks get forgotten; a policy engine (like OPA or Cedar) and tenant-scoped repositories or Row-Level Security make it the default.",
    ],
  },
  {
    id: "sec-s-multitenant-rls",
    level: "senior",
    tags: ["multi-tenancy", "authorization"],
    q: [
      "مزیت PostgreSQL Row-Level Security در یک SaaS چندمستأجره چیست؟",
      "What's the benefit of PostgreSQL Row-Level Security in a multi-tenant SaaS?",
    ],
    options: [
      ["حتی اگر کد اپ شرط `tenant_id` را فراموش کند، دیتابیس ردیف‌های tenant دیگر را برنمی‌گرداند", "Even if app code forgets the `tenant_id` filter, the DB won't return other tenants' rows"],
      ["داده‌های هر tenant را خودکار رمزنگاری می‌کند", "It automatically encrypts each tenant's data"],
      ["سرعت query را چند برابر می‌کند", "It multiplies query speed"],
      ["نیاز به authentication را حذف می‌کند", "It removes the need for authentication"],
    ],
    a: [
      "RLS یک لایه defense in depth است که policy مثل `tenant_id = current_setting('app.tenant_id')` را روی هر query اعمال می‌کند. باید مطمئن شد اپ با role دارای `BYPASSRLS` یا owner جدول وصل نمی‌شود.",
      "RLS is a defense-in-depth layer applying a policy like `tenant_id = current_setting('app.tenant_id')` to every query. Ensure the app doesn't connect as a role with `BYPASSRLS` or as the table owner.",
    ],
  },
  {
    id: "sec-s-ssrf-dns-rebinding",
    level: "senior",
    tags: ["ssrf"],
    q: [
      "سرور hostname را resolve می‌کند، بررسی می‌کند IP عمومی باشد و سپس با همان hostname درخواست می‌زند. این دفاع SSRF چه ضعفی دارد؟",
      "A server resolves the hostname, checks the IP is public, then requests by hostname. What's the weakness of this SSRF defense?",
    ],
    options: [
      ["DNS rebinding (TOCTOU)؛ resolve دوم می‌تواند IP داخلی برگرداند", "DNS rebinding (TOCTOU); the second resolution can return an internal IP"],
      ["هیچ ضعفی ندارد و کامل است", "None; it's complete"],
      ["فقط روی IPv6 کار نمی‌کند", "It just doesn't work on IPv6"],
      ["باعث XSS می‌شود", "It causes XSS"],
    ],
    a: [
      "مهاجم DNS با TTL صفر برمی‌گرداند تا بار اول IP عمومی و بار دوم `127.0.0.1` یا `169.254.169.254` بدهد. باید به همان IP بررسی‌شده وصل شد، redirectها را دوباره بررسی کرد و ترجیحاً از egress proxy با allowlist استفاده کرد.",
      "The attacker serves zero-TTL DNS returning a public IP first and `127.0.0.1` or `169.254.169.254` next. Connect to the validated IP, re-check redirects, and ideally route through an allowlisting egress proxy.",
    ],
  },
  {
    id: "sec-s-imdsv2",
    level: "senior",
    tags: ["ssrf", "cloud"],
    q: [
      "AWS IMDSv2 چگونه اثر SSRF روی metadata endpoint را کاهش می‌دهد؟",
      "How does AWS IMDSv2 mitigate SSRF against the metadata endpoint?",
    ],
    options: [
      ["نیاز به یک session token از درخواست `PUT` با header خاص دارد که SSRFهای ساده GET نمی‌توانند بسازند", "It requires a session token from a `PUT` with a special header, which simple GET-based SSRF can't produce"],
      ["metadata endpoint را کاملاً حذف می‌کند", "It removes the metadata endpoint entirely"],
      ["credentialها را با Base64 مخفی می‌کند", "It hides credentials with Base64"],
      ["فقط از IPv6 قابل دسترسی است", "It's reachable only over IPv6"],
    ],
    a: [
      "IMDSv2 ابتدا یک `PUT` با header `X-aws-ec2-metadata-token-ttl-seconds` می‌خواهد و token را با hop limit پیش‌فرض ۱ برمی‌گرداند. بیشتر SSRFها فقط GET با header ثابت می‌سازند، پس دسترسی دشوار می‌شود.",
      "IMDSv2 requires a `PUT` with the `X-aws-ec2-metadata-token-ttl-seconds` header and returns a token with a default hop limit of 1. Most SSRFs can only issue plain GETs, so access becomes hard.",
    ],
  },
  {
    id: "sec-s-password-hash-dos",
    level: "senior",
    tags: ["password-hashing", "dos"],
    q: [
      "استفاده از Argon2id با پارامترهای حافظه بالا در endpoint لاگین چه ریسک عملیاتی ایجاد می‌کند و راه کنترل آن چیست؟",
      "What operational risk does Argon2id with high memory parameters create on a login endpoint, and how is it controlled?",
    ],
    options: [
      ["DoS با ارسال انبوه درخواست لاگین؛ با rate limit قبل از hash و محدود کردن هم‌زمانی کنترل می‌شود", "DoS via floods of login requests; control with rate limiting before hashing and bounded concurrency"],
      ["نشت پسورد در حافظه؛ با غیرفعال کردن salt رفع می‌شود", "Password leakage in memory; fix by disabling salt"],
      ["hashها قابل برگشت می‌شوند؛ با Base64 رفع می‌شود", "Hashes become reversible; fix with Base64"],
      ["هیچ ریسکی ندارد چون Argon2 سبک است", "None, since Argon2 is lightweight"],
    ],
    a: [
      "هر hash مثلاً ۶۴MB حافظه و صدها میلی‌ثانیه CPU مصرف می‌کند، پس چند صد request هم‌زمان سرور را از کار می‌اندازد. پارامترها باید با ظرفیت سنجیده شوند و hashing در worker pool محدود انجام شود.",
      "Each hash may use e.g. 64MB and hundreds of milliseconds of CPU, so a few hundred concurrent requests can take the server down. Tune parameters to capacity and run hashing in a bounded worker pool.",
    ],
  },
  {
    id: "sec-s-enumeration-timing",
    level: "senior",
    tags: ["account-enumeration", "timing-attack"],
    q: [
      "پیام خطای لاگین یکسان است ولی برای ایمیل‌های ناموجود پاسخ ۵ms و برای موجود ۳۰۰ms طول می‌کشد. مشکل و راه‌حل چیست؟",
      "Login errors are identical, but nonexistent emails respond in 5ms and existing ones in 300ms. What's the issue and fix?",
    ],
    options: [
      ["timing-based enumeration؛ برای کاربر ناموجود هم یک hash ساختگی verify شود", "Timing-based enumeration; verify against a dummy hash for nonexistent users too"],
      ["مشکلی نیست چون پیام‌ها یکسان‌اند", "No issue since messages are identical"],
      ["باید cost bcrypt را صفر کرد", "Set bcrypt cost to zero"],
      ["باید پاسخ کاربران موجود را cache کرد", "Cache responses for existing users"],
    ],
    a: [
      "تفاوت زمان پاسخ نشان می‌دهد hash پسورد محاسبه شده یا نه. محاسبه hash روی یک مقدار ساختگی با همان پارامترها زمان را یکسان می‌کند؛ همین موضوع برای reset password و signup هم صدق می‌کند.",
      "The timing gap reveals whether a password hash was computed. Verifying against a dummy hash with the same parameters equalizes timing; the same applies to password reset and signup.",
    ],
  },
  {
    id: "sec-s-credential-stuffing-defense",
    level: "senior",
    tags: ["credential-stuffing", "threat-modeling"],
    q: [
      "حمله credential stuffing از هزاران IP residential توزیع‌شده انجام می‌شود و rate limit بر اساس IP بی‌اثر است. مؤثرترین ترکیب دفاعی کدام است؟",
      "A credential stuffing attack comes from thousands of distributed residential IPs, defeating per-IP rate limits. Which defense combination is most effective?",
    ],
    options: [
      ["بررسی پسوردهای نشت‌شده (مثل HIBP k-anonymity)، MFA/passkey، device fingerprinting و risk-based challenge", "Breached-password checks (e.g. HIBP k-anonymity), MFA/passkeys, device fingerprinting, and risk-based challenges"],
      ["افزایش طول حداقل پسورد به ۸ کاراکتر", "Raising minimum password length to 8"],
      ["مسدود کردن همه IPهای خارجی", "Blocking all foreign IPs"],
      ["تغییر URL صفحه لاگین هر ماه", "Changing the login URL monthly"],
    ],
    a: [
      "در stuffing پسوردها معتبرند، پس قوانین پیچیدگی کمکی نمی‌کند. MFA و passkey ارزش پسورد دزدیده‌شده را از بین می‌برند و سیگنال‌های ریسک (دستگاه جدید، نرخ خطای سراسری) challenge هدفمند را فعال می‌کنند.",
      "In stuffing the passwords are valid, so complexity rules don't help. MFA and passkeys neutralize stolen passwords, and risk signals (new device, global failure rate) trigger targeted challenges.",
    ],
  },
  {
    id: "sec-s-mfa-fatigue",
    level: "senior",
    tags: ["mfa", "threat-modeling"],
    q: [
      "در حمله MFA fatigue (push bombing)، کدام اقدام بیشترین اثر را دارد؟",
      "Against MFA fatigue (push bombing) attacks, which measure is most effective?",
    ],
    options: [
      ["number matching در push و محدود کردن تعداد push، یا مهاجرت به FIDO2", "Number matching in push prompts and limiting push count, or moving to FIDO2"],
      ["ارسال push بیشتر تا کاربر عادت کند", "Sending more pushes so users get used to them"],
      ["حذف کامل MFA", "Removing MFA entirely"],
      ["جایگزینی push با سوال امنیتی", "Replacing push with a security question"],
    ],
    a: [
      "مهاجم با پسورد درست پشت سر هم push می‌فرستد تا کاربر خسته شود و تأیید کند. number matching کاربر را مجبور می‌کند عدد نمایش‌داده‌شده روی صفحه لاگین را وارد کند که مهاجم کنترل آن را دارد ولی کاربر نمی‌بیند.",
      "With a valid password the attacker spams pushes until the user approves. Number matching requires entering the number shown on the login screen, which the user can't see when they didn't initiate it.",
    ],
  },
  {
    id: "sec-s-aitm-phishing",
    level: "senior",
    tags: ["mfa", "webauthn", "threat-modeling"],
    q: [
      "در phishing از نوع adversary-in-the-middle (مثل Evilginx)، کدام روش MFA همچنان امن می‌ماند؟",
      "In adversary-in-the-middle phishing (e.g. Evilginx), which MFA method stays secure?",
    ],
    options: [
      ["WebAuthn/FIDO2 چون امضا به origin واقعی گره خورده است", "WebAuthn/FIDO2, because the signature is bound to the real origin"],
      ["TOTP چون هر ۳۰ ثانیه تغییر می‌کند", "TOTP, because it changes every 30 seconds"],
      ["SMS OTP چون از کانال جداگانه می‌آید", "SMS OTP, because it uses a separate channel"],
      ["push notification بدون number matching", "Push notifications without number matching"],
    ],
    a: [
      "پروکسی AitM کد TOTP یا SMS را در لحظه relay و session cookie را می‌دزدد. در WebAuthn مرورگر origin پروکسی را در clientData قرار می‌دهد و امضا برای سایت اصلی نامعتبر است.",
      "An AitM proxy relays TOTP or SMS codes in real time and steals the session cookie. In WebAuthn the browser embeds the proxy's origin in clientData, so the assertion is invalid for the real site.",
    ],
  },
  {
    id: "sec-s-session-hijack-binding",
    level: "senior",
    tags: ["sessions", "threat-modeling"],
    q: [
      "بعد از سرقت session cookie توسط infostealer malware، کدام مکانیزم آسیب را محدود می‌کند؟",
      "After a session cookie is stolen by infostealer malware, which mechanism limits the damage?",
    ],
    options: [
      ["re-authentication برای عملیات حساس، عمر محدود session و binding به دستگاه (مثل DBSC)", "Re-authentication for sensitive actions, bounded session lifetime, and device binding (e.g. DBSC)"],
      ["flag `HttpOnly` روی cookie", "The `HttpOnly` flag on the cookie"],
      ["`SameSite=Strict`", "`SameSite=Strict`"],
      ["افزایش طول session ID", "Longer session IDs"],
    ],
    a: [
      "malware cookie را مستقیماً از دیسک می‌خواند، پس `HttpOnly` و `SameSite` کمکی نمی‌کنند. step-up auth، تشخیص ناهنجاری و Device Bound Session Credentials که session را به کلید سخت‌افزاری گره می‌زند استفاده از cookie دزدیده‌شده را سخت می‌کنند.",
      "Malware reads cookies straight from disk, so `HttpOnly` and `SameSite` don't help. Step-up auth, anomaly detection, and Device Bound Session Credentials tying the session to a hardware key make stolen cookies hard to use.",
    ],
  },
  {
    id: "sec-s-saml-xsw",
    level: "senior",
    tags: ["saml", "sso"],
    q: [
      "حمله XML Signature Wrapping (XSW) روی SAML از چه ضعفی سوءاستفاده می‌کند؟",
      "What weakness does XML Signature Wrapping (XSW) against SAML exploit?",
    ],
    options: [
      ["SP امضای یک element را verify می‌کند ولی داده هویتی را از element دیگر (تزریق‌شده) می‌خواند", "The SP verifies the signature on one element but reads identity from another injected element"],
      ["XML نمی‌تواند امضای دیجیتال داشته باشد", "XML can't carry digital signatures"],
      ["SAML از HTTPS استفاده نمی‌کند", "SAML doesn't use HTTPS"],
      ["IdP پسورد را در assertion قرار می‌دهد", "The IdP puts the password in the assertion"],
    ],
    a: [
      "مهاجم assertion امضاشده اصلی را جابه‌جا و یک assertion جعلی اضافه می‌کند؛ اگر منطق verify و منطق استخراج داده به element یکسان اشاره نکنند، جعل پذیرفته می‌شود. از کتابخانه‌های بالغ استفاده و فقط element امضاشده را مصرف کنید.",
      "The attacker relocates the signed assertion and adds a forged one; if verification and extraction don't reference the same element, the forgery is accepted. Use mature libraries and consume only the signed element.",
    ],
  },
  {
    id: "sec-s-oidc-mixup",
    level: "senior",
    tags: ["oauth", "oidc"],
    q: [
      "در clientی که با چند authorization server کار می‌کند، چه چیزی جلوی mix-up attack را می‌گیرد؟",
      "In a client that works with multiple authorization servers, what prevents the mix-up attack?",
    ],
    options: [
      ["بررسی پارامتر `iss` در پاسخ authorization و تطبیق آن با AS مورد انتظار", "Checking the `iss` parameter in the authorization response against the expected AS"],
      ["استفاده از یک client_secret مشترک برای همه AS ها", "Using one shared client_secret for all ASes"],
      ["غیرفعال کردن PKCE", "Disabling PKCE"],
      ["استفاده از Implicit flow", "Using the Implicit flow"],
    ],
    a: [
      "در mix-up مهاجم client را فریب می‌دهد code صادرشده توسط AS درست را به AS مخرب بفرستد. RFC 9207 پارامتر `iss` را به پاسخ authorization اضافه می‌کند تا client بداند پاسخ از کدام issuer آمده است.",
      "In mix-up the attacker tricks the client into sending a code from the honest AS to the malicious AS. RFC 9207 adds `iss` to the authorization response so the client knows which issuer replied.",
    ],
  },
  {
    id: "sec-s-key-rotation-jwks",
    level: "senior",
    tags: ["jwt", "key-rotation"],
    q: [
      "روش صحیح rotate کردن کلید امضای JWT بدون باطل شدن ناگهانی tokenهای فعال چیست؟",
      "What's the correct way to rotate a JWT signing key without abruptly invalidating active tokens?",
    ],
    options: [
      ["کلید جدید را با `kid` جدید در JWKS منتشر، امضا را به آن منتقل و کلید قدیم را تا انقضای tokenها نگه داشت", "Publish the new key with a new `kid` in JWKS, switch signing to it, keep the old key until tokens expire"],
      ["کلید را جایگزین و همه کاربران را logout کرد", "Replace the key and log everyone out"],
      ["`exp` همه tokenها را دستی تغییر داد", "Manually edit `exp` in all tokens"],
      ["کلید جدید را فقط در کد کلاینت قرار داد", "Put the new key only in client code"],
    ],
    a: [
      "verifierها کلیدها را بر اساس `kid` از JWKS (با cache) انتخاب می‌کنند. انتشار زودتر کلید جدید (pre-publish) و نگه داشتن کلید قدیم به مدت حداکثر عمر token، rotation بدون downtime را ممکن می‌کند؛ در صورت نشت کلید باید فوراً حذف شود.",
      "Verifiers select keys by `kid` from a cached JWKS. Pre-publishing the new key and retaining the old one for the max token lifetime gives zero-downtime rotation; on compromise, remove the old key immediately.",
    ],
  },
  {
    id: "sec-s-envelope-encryption",
    level: "senior",
    tags: ["encryption", "kms"],
    q: [
      "envelope encryption با KMS چگونه کار می‌کند و چه مزیتی دارد؟",
      "How does envelope encryption with a KMS work and what's its benefit?",
    ],
    options: [
      ["داده با یک data key محلی رمز می‌شود و data key با master key در KMS رمز می‌شود؛ rotation و کنترل دسترسی ساده‌تر است", "Data is encrypted with a local data key, which is encrypted by a KMS master key; easier rotation and access control"],
      ["داده دو بار با یک کلید یکسان رمز می‌شود تا امن‌تر شود", "Data is encrypted twice with the same key for extra security"],
      ["کل داده برای رمزنگاری به KMS ارسال می‌شود", "All data is sent to the KMS for encryption"],
      ["master key در کنار داده در دیتابیس ذخیره می‌شود", "The master key is stored next to the data in the DB"],
    ],
    a: [
      "master key هرگز از KMS/HSM خارج نمی‌شود و فقط data keyهای کوچک را wrap می‌کند، پس داده‌های حجیم محلی و سریع رمز می‌شوند. rotate کردن master key فقط نیاز به re-wrap کردن data keyها دارد و هر unwrap در audit log ثبت می‌شود.",
      "The master key never leaves the KMS/HSM and only wraps small data keys, so bulk data is encrypted locally and fast. Rotating the master key only requires re-wrapping data keys, and every unwrap is audit-logged.",
    ],
  },
  {
    id: "sec-s-aead-nonce-reuse",
    level: "senior",
    tags: ["encryption", "crypto-basics"],
    q: [
      "در AES-GCM، استفاده مجدد از یک nonce با همان کلید چه پیامدی دارد؟",
      "In AES-GCM, what happens if a nonce is reused with the same key?",
    ],
    options: [
      ["XOR متن‌های اصلی نشت می‌کند و مهاجم می‌تواند authentication tag جعل کند", "The XOR of plaintexts leaks and the attacker can forge authentication tags"],
      ["فقط کارایی کمی کاهش می‌یابد", "Only performance drops slightly"],
      ["رمزگشایی غیرممکن می‌شود ولی امنیت حفظ می‌شود", "Decryption becomes impossible but security holds"],
      ["هیچ اثری ندارد چون GCM خودش nonce تولید می‌کند", "No effect, since GCM generates its own nonce"],
    ],
    a: [
      "GCM یک stream cipher (CTR) است و nonce تکراری keystream تکراری می‌دهد؛ همچنین کلید GHASH قابل بازیابی می‌شود. از nonce تصادفی ۹۶ بیتی با محدودیت تعداد پیام یا AES-GCM-SIV/XChaCha20-Poly1305 استفاده کنید.",
      "GCM is CTR-based, so a repeated nonce repeats the keystream; the GHASH key can also be recovered, enabling forgeries. Use random 96-bit nonces with message limits, or AES-GCM-SIV/XChaCha20-Poly1305.",
    ],
  },
  {
    id: "sec-s-field-level-encryption",
    level: "senior",
    tags: ["encryption", "sensitive-data"],
    q: [
      "رمزنگاری دیسک دیتابیس (TDE) فعال است. چرا ممکن است برای شماره ملی کاربران همچنان application-level encryption لازم باشد؟",
      "Database disk encryption (TDE) is on. Why might national ID numbers still need application-level encryption?",
    ],
    options: [
      ["TDE در برابر SQL injection یا DBA و backupهای منطقی محافظت نمی‌کند چون داده برای هر query معتبر رمزگشایی می‌شود", "TDE doesn't protect against SQL injection, DBAs, or logical backups because data is decrypted for any valid query"],
      ["چون TDE داده را با Base64 ذخیره می‌کند", "Because TDE stores data as Base64"],
      ["چون TDE فقط روی ستون‌های عددی کار می‌کند", "Because TDE only works on numeric columns"],
      ["لازم نیست؛ TDE همه تهدیدها را پوشش می‌دهد", "It's not needed; TDE covers every threat"],
    ],
    a: [
      "TDE فقط از سرقت دیسک یا فایل محافظت می‌کند. رمزنگاری سطح فیلد با کلید خارج از دیتابیس باعث می‌شود dump یا دسترسی مستقیم به DB داده را آشکار نکند؛ برای جستجو می‌توان از blind index (HMAC) استفاده کرد.",
      "TDE only protects against stolen disks or files. Field-level encryption with keys outside the DB keeps dumps and direct DB access from revealing data; a blind index (HMAC) can support lookups.",
    ],
  },
  {
    id: "sec-s-forward-secrecy",
    level: "senior",
    tags: ["tls", "crypto-basics"],
    q: [
      "forward secrecy در TLS چه تضمینی می‌دهد؟",
      "What does forward secrecy in TLS guarantee?",
    ],
    options: [
      ["لو رفتن بعدی private key سرور، ترافیک ضبط‌شده قبلی را قابل رمزگشایی نمی‌کند", "Later compromise of the server's private key doesn't decrypt previously recorded traffic"],
      ["certificate سرور هرگز منقضی نمی‌شود", "The server certificate never expires"],
      ["پیام‌ها در آینده قابل رمزگشایی توسط سرور نیستند", "Messages can't be decrypted by the server in the future"],
      ["کلاینت نیازی به بررسی certificate ندارد", "The client doesn't need to verify the certificate"],
    ],
    a: [
      "با key exchange موقت (ECDHE)، کلید هر session مستقل است و private key فقط برای امضا استفاده می‌شود. TLS 1.3 فقط cipher suiteهای دارای forward secrecy را پشتیبانی می‌کند و RSA key exchange را حذف کرده است.",
      "With ephemeral key exchange (ECDHE), each session key is independent and the private key only signs. TLS 1.3 supports only forward-secret suites and removed RSA key exchange.",
    ],
  },
  {
    id: "sec-s-hsts-preload-risk",
    level: "senior",
    tags: ["hsts", "tls"],
    q: [
      "قبل از ثبت دامنه در HSTS preload list با `includeSubDomains` چه ریسکی را باید سنجید؟",
      "Before submitting a domain to the HSTS preload list with `includeSubDomains`, what risk must be assessed?",
    ],
    options: [
      ["همه subdomainها (حتی داخلی و legacy) باید HTTPS داشته باشند و خروج از لیست ماه‌ها طول می‌کشد", "Every subdomain (even internal and legacy) must support HTTPS, and removal takes months"],
      ["preload باعث غیرفعال شدن cookieها می‌شود", "Preloading disables cookies"],
      ["preload سرعت سایت را نصف می‌کند", "Preloading halves site speed"],
      ["preload فقط روی Firefox اثر دارد", "Preloading only affects Firefox"],
    ],
    a: [
      "preload در خود مرورگرها hardcode می‌شود و هر subdomain بدون HTTPS غیرقابل دسترس می‌شود. حذف از لیست به چرخه انتشار مرورگرها وابسته است، پس باید ابتدا با `max-age` کوتاه تست کرد.",
      "Preload is hardcoded into browsers, so any subdomain without HTTPS becomes unreachable. Removal depends on browser release cycles, so roll out with a short `max-age` first.",
    ],
  },
  {
    id: "sec-s-supply-chain-attack",
    level: "senior",
    tags: ["supply-chain"],
    q: [
      "کدام اقدام در برابر حمله dependency confusion مؤثر است؟",
      "Which measure is effective against dependency confusion attacks?",
    ],
    options: [
      ["استفاده از scope سازمانی (مثل `@acme/`) و پیکربندی registry برای آن scope", "Using an organization scope (like `@acme/`) and pinning the registry for that scope"],
      ["حذف فایل lockfile از repo", "Removing the lockfile from the repo"],
      ["نصب همه پکیج‌ها با `--force`", "Installing all packages with `--force`"],
      ["استفاده از `latest` برای همه نسخه‌ها", "Using `latest` for all versions"],
    ],
    a: [
      "مهاجم پکیجی با نام پکیج داخلی شما و نسخه بالاتر در registry عمومی منتشر می‌کند و package manager آن را برمی‌دارد. scope ثبت‌شده و نگاشت صریح registry در `.npmrc` این ابهام را حذف می‌کند.",
      "The attacker publishes a public package with your internal package's name and a higher version, and the package manager picks it. A registered scope with an explicit registry mapping in `.npmrc` removes the ambiguity.",
    ],
  },
  {
    id: "sec-s-sbom-provenance",
    level: "senior",
    tags: ["supply-chain"],
    q: [
      "SBOM و build provenance (مثل SLSA یا `npm publish --provenance`) چه ارزشی دارند؟",
      "What value do SBOMs and build provenance (like SLSA or `npm publish --provenance`) provide?",
    ],
    options: [
      ["فهرست دقیق اجزای نرم‌افزار و اثبات قابل verify اینکه artifact از کدام سورس و pipeline ساخته شده", "An exact component inventory and verifiable proof of which source and pipeline built an artifact"],
      ["رمزنگاری خودکار سورس کد", "Automatic source code encryption"],
      ["حذف نیاز به code review", "Removing the need for code review"],
      ["افزایش سرعت build", "Faster builds"],
    ],
    a: [
      "SBOM هنگام انتشار CVE جدید سریعاً نشان می‌دهد کدام سرویس‌ها آسیب‌پذیرند. provenance امضاشده جلوی جایگزینی artifact در مسیر انتشار یا build روی ماشین نفوذشده را تشخیص‌پذیر می‌کند.",
      "An SBOM quickly shows which services are affected when a new CVE drops. Signed provenance makes artifact substitution or builds on compromised machines detectable.",
    ],
  },
  {
    id: "sec-s-stride",
    level: "senior",
    tags: ["threat-modeling"],
    q: [
      "در مدل STRIDE، تهدید «Repudiation» با کدام کنترل مقابله می‌شود؟",
      "In the STRIDE model, which control addresses the 'Repudiation' threat?",
    ],
    options: [
      ["audit log مقاوم در برابر دستکاری و امضای دیجیتال عملیات", "Tamper-evident audit logs and digital signatures on actions"],
      ["rate limiting", "Rate limiting"],
      ["رمزنگاری در مسیر با TLS", "Encryption in transit with TLS"],
      ["CSP", "CSP"],
    ],
    a: [
      "STRIDE شامل Spoofing، Tampering، Repudiation، Information disclosure، Denial of service و Elevation of privilege است. Repudiation یعنی کاربر انجام کاری را انکار کند و با logهای قابل اعتماد و non-repudiation پاسخ داده می‌شود.",
      "STRIDE covers Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, and Elevation of privilege. Repudiation means denying an action, countered by trustworthy logs and non-repudiation.",
    ],
  },
  {
    id: "sec-s-defense-in-depth-zero-trust",
    level: "senior",
    tags: ["zero-trust", "architecture"],
    q: [
      "در معماری zero trust، چرا سرویس‌های داخلی نباید صرفاً به دلیل قرار داشتن در VPC به یکدیگر اعتماد کنند؟",
      "In a zero trust architecture, why shouldn't internal services trust each other merely for being in the same VPC?",
    ],
    options: [
      ["نفوذ به یک سرویس (مثلاً از طریق SSRF یا RCE) حرکت جانبی آزاد به کل شبکه می‌دهد", "Compromising one service (e.g. via SSRF or RCE) grants free lateral movement across the network"],
      ["چون VPC ترافیک را رمزنگاری نمی‌کند و این همیشه غیرقانونی است", "Because VPCs don't encrypt traffic, which is always illegal"],
      ["چون سرویس‌های داخلی نمی‌توانند DNS داشته باشند", "Because internal services can't use DNS"],
      ["اعتماد به شبکه داخلی کاملاً امن است", "Trusting the internal network is fully safe"],
    ],
    a: [
      "zero trust هر request را بر اساس هویت (مثلاً mTLS با SPIFFE یا token سرویس) و policy بررسی می‌کند نه موقعیت شبکه. این کار blast radius یک نفوذ را محدود می‌کند.",
      "Zero trust authorizes every request by identity (e.g. mTLS with SPIFFE or service tokens) and policy, not network location. This limits the blast radius of a breach.",
    ],
  },
  {
    id: "sec-s-secret-leak-response",
    level: "senior",
    tags: ["secrets", "incident-response"],
    q: [
      "یک AWS access key به‌طور تصادفی در repo عمومی GitHub push شده است. اولین اقدام صحیح چیست؟",
      "An AWS access key was accidentally pushed to a public GitHub repo. What's the correct first action?",
    ],
    options: [
      ["فوراً کلید را revoke/rotate و سپس CloudTrail را برای استفاده غیرمجاز بررسی کرد", "Immediately revoke/rotate the key, then review CloudTrail for unauthorized use"],
      ["commit را با `git push --force` پاک کرد و کار تمام است", "Delete the commit with `git push --force` and you're done"],
      ["repo را private کرد", "Make the repo private"],
      ["منتظر ماند تا ببیند سوءاستفاده‌ای می‌شود یا نه", "Wait to see whether it gets abused"],
    ],
    a: [
      "باتها repoهای عمومی را در عرض چند ثانیه برای کلید scan می‌کنند، پس پاک کردن تاریخچه کافی نیست چون forkها و cacheها باقی می‌مانند. rotate، بررسی logها و سپس پاک‌سازی تاریخچه ترتیب درست است.",
      "Bots scan public repos for keys within seconds, and history rewrites don't remove forks or caches. Rotate, investigate logs, then clean history, in that order.",
    ],
  },
  {
    id: "sec-s-short-lived-credentials",
    level: "senior",
    tags: ["secrets", "cloud"],
    q: [
      "برای deploy از GitHub Actions به AWS، کدام روش امن‌تر از ذخیره access key دائمی در secrets است؟",
      "For deploying from GitHub Actions to AWS, what's safer than storing a long-lived access key in secrets?",
    ],
    options: [
      ["OIDC federation که برای هر job یک credential کوتاه‌عمر با role محدود صادر می‌کند", "OIDC federation that issues short-lived credentials with a scoped role per job"],
      ["ذخیره کلید در یک فایل رمزنگاری‌شده داخل repo", "Storing the key in an encrypted file in the repo"],
      ["استفاده از کلید root حساب", "Using the account root key"],
      ["قرار دادن کلید در متغیر عمومی workflow", "Putting the key in a public workflow variable"],
    ],
    a: [
      "GitHub یک OIDC token با claimهایی مثل repo و branch صادر می‌کند و AWS آن را با `AssumeRoleWithWebIdentity` به credential موقت تبدیل می‌کند. هیچ secret دائمی برای نشت وجود ندارد و trust policy می‌تواند به branch خاص محدود شود.",
      "GitHub issues an OIDC token with claims like repo and branch, which AWS exchanges via `AssumeRoleWithWebIdentity` for temporary credentials. No long-lived secret exists to leak, and the trust policy can be scoped to a branch.",
    ],
  },
  {
    id: "sec-s-prototype-pollution",
    level: "senior",
    tags: ["prototype-pollution", "nodejs"],
    q: [
      "یک تابع deep merge بازگشتی روی JSON ورودی کاربر اجرا می‌شود. payload `{\"__proto__\":{\"isAdmin\":true}}` چه اثری دارد؟",
      "A recursive deep merge runs on user JSON. What does the payload `{\"__proto__\":{\"isAdmin\":true}}` do?",
    ],
    options: [
      ["prototype pollution؛ `isAdmin` روی `Object.prototype` قرار می‌گیرد و همه اشیا آن را به ارث می‌برند", "Prototype pollution; `isAdmin` lands on `Object.prototype` and all objects inherit it"],
      ["فقط یک کلید با نام `__proto__` به شیء اضافه می‌شود", "It just adds a key named `__proto__` to the object"],
      ["`JSON.parse` خطا می‌دهد", "`JSON.parse` throws an error"],
      ["هیچ اثری ندارد چون JSON prototype ندارد", "No effect, since JSON has no prototype"],
    ],
    a: [
      "`JSON.parse` کلید `__proto__` را به‌عنوان property خودی می‌سازد ولی merge بازگشتی با `target[key]` به prototype واقعی می‌رسد. بررسی‌هایی مثل `if (user.isAdmin)` دور زده می‌شوند و حتی RCE ممکن است؛ کلیدهای `__proto__`، `constructor` و `prototype` را رد کنید یا از `Object.create(null)` و `Map` استفاده کنید.",
      "`JSON.parse` creates `__proto__` as an own property, but a recursive merge using `target[key]` reaches the real prototype. Checks like `if (user.isAdmin)` get bypassed and even RCE is possible; reject `__proto__`, `constructor`, and `prototype` keys or use `Object.create(null)` and `Map`.",
    ],
  },
  {
    id: "sec-s-second-order-sqli",
    level: "senior",
    tags: ["sql-injection"],
    q: [
      "second-order SQL injection چیست؟",
      "What is second-order SQL injection?",
    ],
    options: [
      ["payload ابتدا امن ذخیره می‌شود ولی بعداً در query دیگری بدون پارامتر استفاده و اجرا می‌شود", "The payload is stored safely first, then later used unparameterized in another query and executed"],
      ["تزریق SQL که فقط در دیتابیس‌های replica اجرا می‌شود", "Injection that only runs on replica databases"],
      ["تزریقی که نیاز به دو درخواست هم‌زمان دارد", "Injection requiring two simultaneous requests"],
      ["تزریق در ستون دوم جدول", "Injection into a table's second column"],
    ],
    a: [
      "توسعه‌دهندگان گاهی داده خوانده‌شده از دیتابیس را «قابل اعتماد» فرض می‌کنند، مثلاً username در یک job گزارش‌گیری. هر داده‌ای که منشأ آن کاربر است باید در همه queryها پارامتری شود.",
      "Developers sometimes treat data read back from the DB as trusted, e.g. a username used in a reporting job. Any user-originated data must be parameterized in every query.",
    ],
  },
  {
    id: "sec-s-orm-raw-injection",
    level: "senior",
    tags: ["sql-injection", "orm"],
    q: [
      "استفاده از ORM چه زمانی همچنان در برابر SQL injection آسیب‌پذیر است؟",
      "When is using an ORM still vulnerable to SQL injection?",
    ],
    options: [
      ["هنگام استفاده از raw query با الحاق رشته یا پاس دادن نام ستون/ترتیب sort از ورودی کاربر", "When using raw queries with string concatenation or passing column/sort names from user input"],
      ["هرگز؛ ORM همه حالت‌ها را پوشش می‌دهد", "Never; ORMs cover every case"],
      ["فقط زمانی که دیتابیس MySQL باشد", "Only when the database is MySQL"],
      ["فقط هنگام استفاده از transaction", "Only when using transactions"],
    ],
    a: [
      "identifierهایی مثل نام ستون در `ORDER BY` با placeholder قابل پارامتری کردن نیستند و باید با allowlist بررسی شوند. متدهایی مثل `$queryRawUnsafe` یا `sequelize.literal` با ورودی کاربر خطرناک‌اند.",
      "Identifiers like column names in `ORDER BY` can't be bound as parameters and must be allowlisted. Methods like `$queryRawUnsafe` or `sequelize.literal` are dangerous with user input.",
    ],
  },
  {
    id: "sec-s-zip-slip",
    level: "senior",
    tags: ["path-traversal"],
    q: [
      "آسیب‌پذیری Zip Slip هنگام extract کردن آرشیو آپلودشده چگونه رخ می‌دهد؟",
      "How does the Zip Slip vulnerability occur when extracting an uploaded archive?",
    ],
    options: [
      ["entry با نام `../../app/config.js` خارج از پوشه مقصد نوشته می‌شود", "An entry named `../../app/config.js` gets written outside the target directory"],
      ["فایل zip بیش از حد بزرگ است و حافظه پر می‌شود", "The zip is too large and fills memory"],
      ["فایل zip رمزنگاری شده و قابل خواندن نیست", "The zip is encrypted and unreadable"],
      ["نام فایل‌ها یونیکد دارند", "File names contain Unicode"],
    ],
    a: [
      "مسیر هر entry را باید resolve کرد و بررسی کرد با مسیر پوشه مقصد شروع شود؛ symlinkها هم باید رد شوند. zip bomb تهدید جداگانه‌ای است که با محدودیت حجم و نسبت فشرده‌سازی کنترل می‌شود.",
      "Resolve each entry's path and verify it starts with the target directory; reject symlinks too. Zip bombs are a separate threat controlled by size and compression-ratio limits.",
    ],
  },
  {
    id: "sec-s-file-upload",
    level: "senior",
    tags: ["file-upload", "xss"],
    q: [
      "کدام ترکیب برای ذخیره و سرو کردن فایل‌های آپلودی کاربران امن‌تر است؟",
      "Which combination is safest for storing and serving user-uploaded files?",
    ],
    options: [
      ["ذخیره در object storage با نام تصادفی و سرو از دامنه جداگانه با `Content-Disposition: attachment` و `nosniff`", "Store in object storage with random names, serve from a separate domain with `Content-Disposition: attachment` and `nosniff`"],
      ["ذخیره در پوشه public وب‌سرور با نام اصلی فایل", "Store in the web server's public folder under the original filename"],
      ["فقط بررسی پسوند `.jpg` در نام فایل", "Only check the `.jpg` extension in the filename"],
      ["اعتماد به header `Content-Type` ارسالی کلاینت", "Trust the client-sent `Content-Type` header"],
    ],
    a: [
      "فایل HTML یا SVG آپلودی روی دامنه اصلی می‌تواند stored XSS ایجاد کند و فایل اجرایی در پوشه وب ممکن است اجرا شود. دامنه sandbox جداگانه (مثل `usercontent.example.net`) origin اصلی را ایزوله می‌کند و نوع فایل باید با magic bytes بررسی شود.",
      "Uploaded HTML or SVG on the main domain can cause stored XSS, and executables in web folders may run. A separate sandbox domain (like `usercontent.example.net`) isolates the main origin, and file types should be checked via magic bytes.",
    ],
  },
  {
    id: "sec-s-redos",
    level: "senior",
    tags: ["dos", "validation"],
    q: [
      "regex `^(a+)+$` روی ورودی `'aaaaaaaaaaaaaaaaaaaaaaaa!'` در Node.js چه مشکلی ایجاد می‌کند؟",
      "What problem does the regex `^(a+)+$` cause on input `'aaaaaaaaaaaaaaaaaaaaaaaa!'` in Node.js?",
    ],
    options: [
      ["ReDoS؛ backtracking نمایی event loop را برای مدت طولانی مسدود می‌کند", "ReDoS; exponential backtracking blocks the event loop for a long time"],
      ["regex خطای syntax می‌دهد", "The regex throws a syntax error"],
      ["فوراً true برمی‌گرداند", "It immediately returns true"],
      ["فقط حافظه کمی مصرف می‌کند و مشکلی نیست", "It uses little memory and is fine"],
    ],
    a: [
      "quantifierهای تودرتو باعث می‌شوند موتور backtracking تعداد نمایی مسیر را امتحان کند و چون Node تک‌نخی است کل سرور قفل می‌شود. از regexهای ساده، محدودیت طول ورودی یا موتورهای خطی مثل RE2 استفاده کنید.",
      "Nested quantifiers make the backtracking engine try exponentially many paths, and since Node is single-threaded the whole server stalls. Use simpler patterns, input length limits, or linear engines like RE2.",
    ],
  },
  {
    id: "sec-s-xxe",
    level: "senior",
    tags: ["xxe", "owasp"],
    q: [
      "حمله XXE در پردازش XML ورودی چگونه کار می‌کند و دفاع اصلی چیست؟",
      "How does an XXE attack on XML input work and what's the main defense?",
    ],
    options: [
      ["external entity تعریف‌شده در DOCTYPE فایل محلی یا URL داخلی را می‌خواند؛ DTD و external entityها را در parser غیرفعال کنید", "An external entity in the DOCTYPE reads local files or internal URLs; disable DTDs and external entities in the parser"],
      ["XML باعث اجرای JavaScript در مرورگر می‌شود؛ CSP اضافه کنید", "XML runs JavaScript in the browser; add CSP"],
      ["XML حجم زیادی دارد؛ gzip را فعال کنید", "XML is large; enable gzip"],
      ["XML بدون امضا است؛ از JWT استفاده کنید", "XML is unsigned; use JWT instead"],
    ],
    a: [
      "payloadی مثل `<!ENTITY x SYSTEM 'file:///etc/passwd'>` محتوای فایل را در پاسخ قرار می‌دهد و می‌تواند به SSRF هم منجر شود. parserهای امروزی معمولاً امن‌ترند ولی باید تنظیمات را صریحاً سخت کرد؛ SAML و فایل‌های DOCX/SVG هم XML هستند.",
      "A payload like `<!ENTITY x SYSTEM 'file:///etc/passwd'>` embeds file contents in the response and can also enable SSRF. Modern parsers are safer by default, but harden settings explicitly; SAML and DOCX/SVG files are XML too.",
    ],
  },
  {
    id: "sec-s-race-condition-auth",
    level: "senior",
    tags: ["race-condition", "business-logic"],
    q: [
      "یک کد تخفیف یک‌بارمصرف با ارسال ۲۰ درخواست هم‌زمان چند بار اعمال می‌شود. ریشه مشکل و راه‌حل چیست؟",
      "A single-use coupon gets applied multiple times via 20 concurrent requests. What's the root cause and fix?",
    ],
    options: [
      ["race condition از نوع check-then-act؛ استفاده از عملیات اتمیک مثل `UPDATE ... WHERE used = false` یا unique constraint", "A check-then-act race; use atomic operations like `UPDATE ... WHERE used = false` or a unique constraint"],
      ["XSS در فرم کد تخفیف؛ با escape رفع می‌شود", "XSS in the coupon form; fix with escaping"],
      ["CSRF؛ با SameSite رفع می‌شود", "CSRF; fix with SameSite"],
      ["کش مرورگر؛ با `Cache-Control` رفع می‌شود", "Browser caching; fix with `Cache-Control`"],
    ],
    a: [
      "وقتی بررسی و به‌روزرسانی جدا انجام شوند، چند request هم‌زمان قبل از ثبت استفاده از بررسی عبور می‌کنند. عملیات اتمیک دیتابیس، row lock (`SELECT ... FOR UPDATE`) یا idempotency key این پنجره را می‌بندند؛ همین الگو برای reset token و MFA code هم صدق می‌کند.",
      "When check and update are separate, concurrent requests pass the check before the use is recorded. Atomic DB operations, row locks (`SELECT ... FOR UPDATE`), or idempotency keys close the window; the same applies to reset tokens and MFA codes.",
    ],
  },
  {
    id: "sec-s-jwt-claims-authz",
    level: "senior",
    tags: ["jwt", "authorization"],
    q: [
      "قرار دادن همه permissionهای ریز کاربر داخل JWT چه trade-off ای دارد؟",
      "What's the trade-off of embedding all of a user's fine-grained permissions in a JWT?",
    ],
    options: [
      ["تا انقضای token تغییر مجوزها اعمال نمی‌شود و token بزرگ می‌شود؛ بهتر است claimهای درشت و بررسی ریز در سرویس باشد", "Permission changes don't apply until expiry and tokens bloat; prefer coarse claims with fine-grained checks in the service"],
      ["هیچ trade-off ای ندارد و بهترین روش است", "No trade-off; it's the best approach"],
      ["permissionها در JWT رمزنگاری می‌شوند و API نمی‌تواند آن‌ها را بخواند", "Permissions in a JWT are encrypted and unreadable by APIs"],
      ["JWT فقط یک claim را پشتیبانی می‌کند", "JWTs support only one claim"],
    ],
    a: [
      "JWT یک snapshot از زمان صدور است و revoke شدن نقش تا انقضا دیده نمی‌شود؛ همچنین header بزرگ ممکن است از محدودیت سرورها یا cookieها بگذرد. مجوزهای object-level باید در زمان request از منبع حقیقت (policy engine) بررسی شوند.",
      "A JWT is a snapshot at issue time, so revoked roles go unnoticed until expiry; large headers may also exceed server or cookie limits. Object-level permissions should be checked at request time against the source of truth (a policy engine).",
    ],
  },
  {
    id: "sec-s-confused-deputy",
    level: "senior",
    tags: ["authorization", "threat-modeling"],
    q: [
      "مشکل confused deputy در یک سرویس پردازش فایل که با role IAM خودش از S3 فایل می‌خواند چیست؟",
      "What's the confused deputy problem in a file-processing service that reads from S3 with its own IAM role?",
    ],
    options: [
      ["کاربر می‌تواند مسیر bucket دیگری را بدهد و سرویس با دسترسی گسترده خودش آن را بخواند", "A user can supply another bucket path and the service reads it with its own broad privileges"],
      ["سرویس نمی‌تواند هیچ فایلی بخواند", "The service can't read any files"],
      ["S3 فایل‌ها را رمزگشایی نمی‌کند", "S3 doesn't decrypt files"],
      ["سرویس IAM role را فراموش می‌کند", "The service forgets its IAM role"],
    ],
    a: [
      "یک سرویس دارای مجوز بالا فریب می‌خورد تا به نیابت از کاربر کم‌مجوز عملیاتی انجام دهد. باید مجوز را بر اساس هویت کاربر بررسی کرد، مسیرها را محدود کرد یا با `ExternalId`/session policy دسترسی را scope کرد.",
      "A highly privileged service is tricked into acting on behalf of a less privileged user. Authorize based on the caller's identity, constrain paths, or scope access with `ExternalId`/session policies.",
    ],
  },
  {
    id: "sec-s-csp-strict-dynamic",
    level: "senior",
    tags: ["csp", "xss"],
    q: [
      "چرا CSP مبتنی بر allowlist دامنه (مثل `script-src https://cdn.example.com https://www.google.com`) اغلب قابل دور زدن است؟",
      "Why is a domain-allowlist CSP (like `script-src https://cdn.example.com https://www.google.com`) often bypassable?",
    ],
    options: [
      ["دامنه‌های مجاز اغلب JSONP endpoint یا کتابخانه‌هایی مثل AngularJS قدیمی دارند که اجرای کد دلخواه را ممکن می‌کنند", "Allowed domains often host JSONP endpoints or libraries like old AngularJS enabling arbitrary code execution"],
      ["چون مرورگرها allowlist را نادیده می‌گیرند", "Because browsers ignore allowlists"],
      ["چون CSP فقط روی تصاویر اعمال می‌شود", "Because CSP only applies to images"],
      ["چون allowlist نیاز به HTTPS ندارد", "Because allowlists don't require HTTPS"],
    ],
    a: [
      "تحقیقات Google نشان داد اکثر CSPهای allowlist قابل دور زدن‌اند. CSP مبتنی بر nonce یا hash همراه `'strict-dynamic'` به اسکریپت‌های مورد اعتماد اجازه بارگذاری وابستگی‌ها را می‌دهد بدون اینکه کل دامنه‌ها مجاز شوند.",
      "Google research found most allowlist CSPs are bypassable. Nonce- or hash-based CSP with `'strict-dynamic'` lets trusted scripts load their dependencies without allowlisting entire domains.",
    ],
  },
  {
    id: "sec-s-trusted-types",
    level: "senior",
    tags: ["xss", "csp"],
    q: [
      "Trusted Types چگونه به حذف DOM-based XSS در یک کدبیس بزرگ کمک می‌کند؟",
      "How do Trusted Types help eliminate DOM-based XSS in a large codebase?",
    ],
    options: [
      ["sinkهای خطرناک مثل `innerHTML` فقط objectهای ساخته‌شده توسط policy بررسی‌شده را می‌پذیرند، نه رشته خام", "Dangerous sinks like `innerHTML` accept only objects created by vetted policies, not raw strings"],
      ["همه رشته‌ها را خودکار Base64 می‌کند", "It Base64-encodes all strings automatically"],
      ["JavaScript را در مرورگر غیرفعال می‌کند", "It disables JavaScript in the browser"],
      ["فقط روی سرور اجرا می‌شود", "It only runs on the server"],
    ],
    a: [
      "با `require-trusted-types-for 'script'` در CSP، انتساب رشته به sinkها خطا می‌دهد و همه مسیرهای خطرناک به چند policy قابل review محدود می‌شوند. این سطح حمله را از هزاران خط به چند نقطه کاهش می‌دهد.",
      "With `require-trusted-types-for 'script'` in CSP, assigning strings to sinks throws, funneling all risky paths through a few reviewable policies. This shrinks the attack surface from thousands of lines to a few points.",
    ],
  },
  {
    id: "sec-s-cors-null-origin",
    level: "senior",
    tags: ["cors"],
    q: [
      "چرا قرار دادن `null` در allowlist CORS (`Access-Control-Allow-Origin: null`) خطرناک است؟",
      "Why is allowlisting the `null` origin in CORS (`Access-Control-Allow-Origin: null`) dangerous?",
    ],
    options: [
      ["مهاجم می‌تواند از iframe با `sandbox` یا صفحات `data:` درخواستی با origin برابر `null` بفرستد", "An attacker can send requests with origin `null` from sandboxed iframes or `data:` pages"],
      ["چون `null` فقط برای localhost است", "Because `null` is only for localhost"],
      ["چون مرورگرها `null` را به `*` تبدیل می‌کنند", "Because browsers convert `null` to `*`"],
      ["هیچ خطری ندارد چون هیچ سایتی origin برابر null ندارد", "No danger, since no site has a null origin"],
    ],
    a: [
      "origin `null` برای sandboxed iframe، redirectهای خاص و فایل‌های محلی ارسال می‌شود و مهاجم به‌راحتی آن را تولید می‌کند. هرگز `null` را مجاز نکنید و از تطبیق regex ناقص (مثل `endsWith('example.com')`) هم پرهیز کنید.",
      "The `null` origin is sent by sandboxed iframes, certain redirects, and local files, so attackers can produce it easily. Never allow `null`, and avoid sloppy regex matching like `endsWith('example.com')`.",
    ],
  },
  {
    id: "sec-s-webhook-replay-ssrf",
    level: "senior",
    tags: ["webhooks", "ssrf"],
    q: [
      "اپ شما به مشتریان اجازه می‌دهد URL webhook دلخواه ثبت کنند. کدام ریسک‌ها باید مدیریت شوند؟",
      "Your app lets customers register arbitrary webhook URLs. Which risks must be managed?",
    ],
    options: [
      ["SSRF به شبکه داخلی و تعیین امضای HMAC با timestamp تا گیرنده بتواند اصالت و replay را بررسی کند", "SSRF into the internal network, and HMAC signatures with timestamps so receivers can verify authenticity and replay"],
      ["فقط XSS در داشبورد مشتری", "Only XSS in the customer dashboard"],
      ["فقط مصرف پهنای باند", "Only bandwidth consumption"],
      ["هیچ ریسکی چون درخواست از سمت سرور شماست", "No risk, since requests come from your server"],
    ],
    a: [
      "ارسال webhook همان SSRF کنترل‌شده توسط کاربر است؛ باید از egress proxy ایزوله، مسدودسازی IP خصوصی و عدم دنبال کردن redirect استفاده کرد. امضای HMAC روی `timestamp.body` با secret مخصوص هر مشتری اصالت را تضمین می‌کند.",
      "Webhook delivery is user-controlled SSRF; use an isolated egress proxy, block private IPs, and don't follow redirects. An HMAC over `timestamp.body` with a per-customer secret proves authenticity.",
    ],
  },
  {
    id: "sec-s-account-recovery-weakest-link",
    level: "senior",
    tags: ["mfa", "threat-modeling"],
    q: [
      "سازمانی passkey را برای لاگین اجباری کرده ولی بازیابی حساب با یک لینک ایمیلی بدون شرط انجام می‌شود. ارزیابی امنیتی درست چیست؟",
      "An org mandates passkeys for login, but account recovery works via an unconditional email link. What's the right security assessment?",
    ],
    options: [
      ["امنیت واقعی برابر ضعیف‌ترین مسیر یعنی ایمیل است؛ بازیابی باید هم‌سطح لاگین سخت‌گیرانه باشد", "Real security equals the weakest path, email; recovery must be as strict as login"],
      ["passkey همه چیز را امن می‌کند و مسیر بازیابی اهمیتی ندارد", "Passkeys secure everything and recovery doesn't matter"],
      ["ایمیل امن‌تر از passkey است", "Email is more secure than passkeys"],
      ["بازیابی حساب باید کاملاً حذف شود", "Account recovery should be removed entirely"],
    ],
    a: [
      "مهاجم مسیر لاگین قوی را دور می‌زند و از بازیابی ضعیف حساب را تصاحب می‌کند. چند passkey ثبت‌شده، recovery codeهای یک‌بارمصرف، تأخیر زمانی با اطلاع‌رسانی و تأیید هویت دستی گزینه‌های بهترند.",
      "Attackers skip the strong login path and take over via weak recovery. Multiple registered passkeys, single-use recovery codes, time delays with notifications, and manual identity verification are better options.",
    ],
  },
  {
    id: "sec-s-graphql-batching-bruteforce",
    level: "senior",
    tags: ["graphql", "rate-limiting"],
    q: [
      "چرا rate limit بر اساس تعداد HTTP request برای یک GraphQL API ممکن است ناکافی باشد؟",
      "Why might rate limiting by HTTP request count be insufficient for a GraphQL API?",
    ],
    options: [
      ["با alias یا batching صدها mutation (مثلاً تلاش لاگین یا OTP) در یک request قابل ارسال است", "Aliases or batching can pack hundreds of mutations (e.g. login or OTP attempts) into one request"],
      ["چون GraphQL از HTTPS پشتیبانی نمی‌کند", "Because GraphQL doesn't support HTTPS"],
      ["چون GraphQL همه requestها را cache می‌کند", "Because GraphQL caches every request"],
      ["چون GraphQL فقط متد GET دارد", "Because GraphQL only uses GET"],
    ],
    a: [
      "مهاجم با `a1: login(...) a2: login(...)` در یک request هزاران حدس می‌زند. باید محدودیت را در سطح operation و resolver اعمال کرد، query complexity/depth را محدود کرد و introspection را در production بست.",
      "With `a1: login(...) a2: login(...)` an attacker makes thousands of guesses in one request. Enforce limits per operation and resolver, cap query complexity/depth, and disable introspection in production.",
    ],
  },
  {
    id: "sec-s-cdn-cache-auth",
    level: "senior",
    tags: ["caching", "sensitive-data"],
    q: [
      "بعد از فعال کردن CDN، کاربران گاهی داشبورد حساب کاربر دیگری را می‌بینند. محتمل‌ترین علت چیست؟",
      "After enabling a CDN, users sometimes see another user's account dashboard. What's the most likely cause?",
    ],
    options: [
      ["پاسخ‌های شخصی‌سازی‌شده بدون `Cache-Control: private` یا `no-store` در cache مشترک ذخیره شده‌اند", "Personalized responses lacking `Cache-Control: private` or `no-store` were stored in the shared cache"],
      ["CDN پسوردها را رمزگشایی کرده است", "The CDN decrypted passwords"],
      ["JWT کاربران با هم برخورد (collision) کرده است", "Users' JWTs collided"],
      ["HSTS باعث جابه‌جایی sessionها شده است", "HSTS swapped sessions"],
    ],
    a: [
      "cache مشترک اگر کلید cache شامل cookie یا header `Authorization` نباشد، پاسخ کاربر اول را به بقیه می‌دهد. web cache deception هم با مسیرهایی مثل `/account/x.css` همین را سوءاستفاده می‌کند؛ پاسخ‌های authenticated را صریحاً `private, no-store` کنید.",
      "A shared cache whose key excludes cookies or `Authorization` serves the first user's response to others. Web cache deception abuses this with paths like `/account/x.css`; mark authenticated responses `private, no-store` explicitly.",
    ],
  },
  {
    id: "sec-s-audit-log-integrity",
    level: "senior",
    tags: ["audit-logging"],
    q: [
      "چگونه می‌توان audit log را در برابر دستکاری توسط مهاجمی که به سرور اپ دسترسی پیدا کرده مقاوم کرد؟",
      "How can audit logs be made resistant to tampering by an attacker who compromised the app server?",
    ],
    options: [
      ["ارسال فوری به storage جداگانه write-once (مثل S3 Object Lock) و زنجیره hash بین رکوردها", "Ship immediately to separate write-once storage (e.g. S3 Object Lock) and hash-chain the records"],
      ["ذخیره log در فایل محلی با دسترسی `777`", "Store logs in a local file with `777` permissions"],
      ["ذخیره log در همان دیتابیس اپ", "Store logs in the app's own database"],
      ["فشرده‌سازی log با gzip", "Compress logs with gzip"],
    ],
    a: [
      "مهاجمی که سرور را گرفته اولین کارش پاک کردن ردپاست. storage با WORM و دسترسی فقط-append از حساب جداگانه، همراه hash زنجیره‌ای (هر رکورد شامل hash قبلی) هر حذف یا تغییری را آشکار می‌کند.",
      "An attacker who owns the server will first erase their tracks. WORM storage with append-only access from a separate account, plus hash chaining (each record includes the previous hash), makes any deletion or edit evident.",
    ],
  },
]);
