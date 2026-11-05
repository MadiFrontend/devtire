import { build } from "../build";

export const authSecurityMiddle = build("auth-security", [
  {
    id: "sec-m-session-fixation",
    level: "middle",
    tags: ["sessions", "session-fixation"],
    q: [
      "مهم‌ترین اقدام برای جلوگیری از session fixation چیست؟",
      "What is the key measure to prevent session fixation?",
    ],
    options: [
      ["صدور session ID جدید بلافاصله بعد از لاگین موفق", "Issuing a new session ID immediately after successful login"],
      ["افزایش طول session ID به ۲۵۶ بیت", "Increasing session ID length to 256 bits"],
      ["ذخیره session در localStorage به جای cookie", "Storing the session in localStorage instead of a cookie"],
      ["رمزنگاری session ID با AES", "Encrypting the session ID with AES"],
    ],
    a: [
      "در session fixation مهاجم یک session ID شناخته‌شده را به قربانی تحمیل می‌کند و بعد از لاگین قربانی از همان استفاده می‌کند. rotate کردن ID هنگام تغییر سطح دسترسی (مثلاً `req.session.regenerate()`) این حمله را خنثی می‌کند.",
      "In session fixation the attacker plants a known session ID on the victim and reuses it after the victim logs in. Rotating the ID on privilege change (e.g. `req.session.regenerate()`) defeats it.",
    ],
  },
  {
    id: "sec-m-samesite-lax-default",
    level: "middle",
    tags: ["cookies", "csrf"],
    q: [
      "با `SameSite=Lax`، کدام request cross-site همچنان cookie را ارسال می‌کند؟",
      "With `SameSite=Lax`, which cross-site request still sends the cookie?",
    ],
    options: [
      ["navigation سطح بالا با GET، مثل کلیک روی لینک", "A top-level GET navigation, like clicking a link"],
      ["ارسال فرم با POST از سایت دیگر", "A POST form submission from another site"],
      ["درخواست `fetch` از سایت دیگر", "A `fetch` request from another site"],
      ["بارگذاری تصویر از سایت دیگر با `<img>`", "Loading an image from another site via `<img>`"],
    ],
    a: [
      "`Lax` (پیش‌فرض Chrome برای cookie بدون SameSite) فقط در navigationهای top-level با متد امن cookie می‌فرستد. برای همین endpointهای تغییردهنده state نباید با GET قابل اجرا باشند.",
      "`Lax` (Chrome's default for cookies without SameSite) sends cookies only on top-level navigations with safe methods. That's why state-changing endpoints must not accept GET.",
    ],
  },
  {
    id: "sec-m-samesite-not-full-csrf",
    level: "middle",
    tags: ["csrf", "cookies"],
    q: [
      "چرا `SameSite` به‌تنهایی همیشه دفاع کامل در برابر CSRF نیست؟",
      "Why isn't `SameSite` alone always a complete CSRF defense?",
    ],
    options: [
      ["subdomainهای همان site (مثل یک subdomain آسیب‌پذیر) same-site محسوب می‌شوند", "Subdomains of the same site (e.g. a vulnerable one) count as same-site"],
      ["`SameSite` فقط روی HTTP کار می‌کند نه HTTPS", "`SameSite` only works over HTTP, not HTTPS"],
      ["`SameSite` جلوی همه requestهای GET را می‌گیرد", "`SameSite` blocks all GET requests"],
      ["`SameSite` باعث غیرفعال شدن `HttpOnly` می‌شود", "`SameSite` disables `HttpOnly`"],
    ],
    a: [
      "site بر اساس eTLD+1 تعریف می‌شود، پس `evil.example.com` با `app.example.com` same-site است. همچنین GETهای تغییردهنده state با Lax آسیب‌پذیرند؛ ترکیب با CSRF token امن‌تر است.",
      "Site is defined by eTLD+1, so `evil.example.com` is same-site with `app.example.com`. State-changing GETs are also exposed under Lax; combining with CSRF tokens is safer.",
    ],
  },
  {
    id: "sec-m-double-submit-cookie",
    level: "middle",
    tags: ["csrf"],
    q: [
      "الگوی double-submit cookie برای CSRF چگونه کار می‌کند؟",
      "How does the double-submit cookie pattern for CSRF work?",
    ],
    options: [
      ["یک مقدار تصادفی هم در cookie و هم در header/فرم ارسال و سرور برابری آن‌ها را چک می‌کند", "A random value is sent in both a cookie and a header/form field, and the server checks they match"],
      ["cookie دو بار در هر request ارسال می‌شود تا سرور مطمئن شود", "The cookie is sent twice per request for confirmation"],
      ["کاربر باید فرم را دو بار submit کند", "The user must submit the form twice"],
      ["دو cookie با `SameSite` متفاوت تنظیم می‌شود", "Two cookies with different `SameSite` values are set"],
    ],
    a: [
      "سایت مهاجم نمی‌تواند cookie را بخواند تا در header بگذارد. نسخه امن‌تر آن token را با HMAC به session گره می‌زند (signed double-submit) تا cookie injection از subdomain بی‌اثر شود.",
      "An attacker's site can't read the cookie to copy it into a header. The safer variant binds the token to the session with an HMAC (signed double-submit) so subdomain cookie injection fails.",
    ],
  },
  {
    id: "sec-m-jwt-hs256-vs-rs256",
    level: "middle",
    tags: ["jwt", "crypto-basics"],
    q: [
      "مزیت اصلی RS256 نسبت به HS256 در معماری microservice چیست؟",
      "What is the main advantage of RS256 over HS256 in a microservice architecture?",
    ],
    options: [
      ["سرویس‌ها فقط با public key token را verify می‌کنند و نمی‌توانند token جعل کنند", "Services verify with the public key only and cannot forge tokens"],
      ["RS256 payload را رمزنگاری می‌کند ولی HS256 نه", "RS256 encrypts the payload while HS256 does not"],
      ["RS256 سریع‌تر از HS256 است", "RS256 is faster than HS256"],
      ["RS256 نیازی به claim `exp` ندارد", "RS256 doesn't need an `exp` claim"],
    ],
    a: [
      "HS256 کلید متقارن دارد و هر سرویسی که می‌تواند verify کند می‌تواند token هم بسازد. با RS256 یا ES256 فقط auth server کلید خصوصی دارد و بقیه public key را از JWKS می‌گیرند.",
      "HS256 uses a symmetric key, so any service that can verify can also mint tokens. With RS256 or ES256 only the auth server holds the private key; others fetch the public key from JWKS.",
    ],
  },
  {
    id: "sec-m-jwt-alg-none",
    level: "middle",
    tags: ["jwt"],
    q: [
      "حمله `alg: none` در JWT چگونه کار می‌کند و راه جلوگیری چیست؟",
      "How does the JWT `alg: none` attack work and how is it prevented?",
    ],
    options: [
      ["مهاجم امضا را حذف و `alg` را `none` می‌کند؛ باید الگوریتم مجاز را در verify صریحاً مشخص کرد", "Attacker strips the signature and sets `alg` to `none`; pin allowed algorithms in verify"],
      ["مهاجم `exp` را حذف می‌کند؛ باید token را رمزنگاری کرد", "Attacker removes `exp`; encrypt the token to prevent it"],
      ["مهاجم header را حذف می‌کند؛ باید از cookie استفاده کرد", "Attacker deletes the header; use cookies instead"],
      ["مهاجم کلید عمومی را عوض می‌کند؛ باید از HS256 استفاده کرد", "Attacker swaps the public key; switch to HS256"],
    ],
    a: [
      "کتابخانه‌های قدیمی به `alg` داخل header اعتماد می‌کردند و token بدون امضا را می‌پذیرفتند. همیشه `algorithms: ['RS256']` را در verify تعیین کنید و هرگز از header تبعیت نکنید.",
      "Older libraries trusted the header's `alg` and accepted unsigned tokens. Always pass `algorithms: ['RS256']` to verify and never let the header decide.",
    ],
  },
  {
    id: "sec-m-jwt-aud-iss",
    level: "middle",
    tags: ["jwt"],
    q: [
      "چرا API باید claimهای `aud` و `iss` را در JWT بررسی کند؟",
      "Why should an API validate the `aud` and `iss` claims of a JWT?",
    ],
    options: [
      ["تا tokenی که برای سرویس دیگر یا از صادرکننده دیگر صادر شده پذیرفته نشود", "So tokens issued for another service or by another issuer are rejected"],
      ["تا زمان انقضای token محاسبه شود", "To compute the token's expiration time"],
      ["تا payload رمزگشایی شود", "To decrypt the payload"],
      ["تا اندازه token کاهش یابد", "To reduce token size"],
    ],
    a: [
      "بدون بررسی `aud`، tokenی که یک IdP مشترک برای اپ A صادر کرده در API B هم پذیرفته می‌شود (token substitution). `iss` تضمین می‌کند token از issuer مورد انتظار آمده است.",
      "Without checking `aud`, a token a shared IdP issued for app A would be accepted by API B (token substitution). `iss` ensures it came from the expected issuer.",
    ],
  },
  {
    id: "sec-m-jwt-revocation",
    level: "middle",
    tags: ["jwt", "revocation"],
    q: [
      "مشکل اصلی JWTهای stateless با عمر طولانی چیست؟",
      "What's the main problem with long-lived stateless JWTs?",
    ],
    options: [
      ["قبل از انقضا به‌سادگی قابل باطل کردن (revoke) نیستند", "They can't easily be revoked before they expire"],
      ["حجمشان بیشتر از session ID نیست", "They are no larger than a session ID"],
      ["فقط در مرورگر Chrome کار می‌کنند", "They only work in Chrome"],
      ["نمی‌توان در آن‌ها claim سفارشی گذاشت", "They can't contain custom claims"],
    ],
    a: [
      "سرور فقط امضا و `exp` را چک می‌کند، پس token دزدیده‌شده یا کاربر logout‌شده تا انقضا معتبر می‌ماند. راه‌حل رایج access token کوتاه‌عمر (مثلاً ۵-۱۵ دقیقه) همراه refresh token قابل باطل کردن یا denylist بر اساس `jti` است.",
      "The server only checks the signature and `exp`, so a stolen token or logged-out user stays valid until expiry. The usual fix is short-lived access tokens (e.g. 5-15 minutes) plus revocable refresh tokens or a `jti` denylist.",
    ],
  },
  {
    id: "sec-m-refresh-token-purpose",
    level: "middle",
    tags: ["jwt", "refresh-token"],
    q: [
      "دلیل استفاده هم‌زمان از access token کوتاه‌عمر و refresh token چیست؟",
      "Why use a short-lived access token together with a refresh token?",
    ],
    options: [
      ["کاهش پنجره سوءاستفاده از access token دزدیده‌شده بدون لاگین مکرر کاربر", "Limit the abuse window of a stolen access token without forcing frequent logins"],
      ["refresh token جایگزین پسورد کاربر در دیتابیس می‌شود", "The refresh token replaces the user's password in the DB"],
      ["access token فقط برای GET و refresh token برای POST است", "Access token is for GET, refresh token for POST"],
      ["برای اینکه نیازی به HTTPS نباشد", "So that HTTPS isn't needed"],
    ],
    a: [
      "access token به هر API فرستاده می‌شود و در معرض نشت بیشتری است، پس عمرش کوتاه است. refresh token فقط به auth server فرستاده می‌شود و سرور می‌تواند آن را revoke کند.",
      "The access token is sent to every API and is more exposed, so it's short-lived. The refresh token goes only to the auth server, which can revoke it.",
    ],
  },
  {
    id: "sec-m-refresh-rotation",
    level: "middle",
    tags: ["refresh-token"],
    q: [
      "refresh token rotation با reuse detection چگونه از سرقت token محافظت می‌کند؟",
      "How does refresh token rotation with reuse detection protect against token theft?",
    ],
    options: [
      ["هر refresh یک token جدید می‌دهد؛ اگر token قدیمی دوباره استفاده شود کل خانواده token باطل می‌شود", "Each refresh issues a new token; if an old one is reused the whole token family is revoked"],
      ["refresh token هر ساعت خودکار در مرورگر رمزنگاری مجدد می‌شود", "The refresh token is re-encrypted in the browser every hour"],
      ["refresh token با آدرس IP کاربر جایگزین می‌شود", "The refresh token is replaced by the user's IP"],
      ["refresh token فقط یک بار در روز قابل استفاده است", "The refresh token can only be used once per day"],
    ],
    a: [
      "چون هر refresh token یک‌بارمصرف است، استفاده مجدد نشانه این است که مهاجم و کاربر هر دو نسخه‌ای دارند. سرور کل زنجیره را revoke می‌کند و کاربر باید دوباره لاگین کند.",
      "Since each refresh token is single-use, a reuse signals that both attacker and user hold a copy. The server revokes the whole chain and forces re-login.",
    ],
  },
  {
    id: "sec-m-token-storage-browser",
    level: "middle",
    tags: ["jwt", "xss", "cookies"],
    q: [
      "برای یک SPA، کدام روش ذخیره refresh token در برابر XSS مقاوم‌تر است؟",
      "For an SPA, which refresh token storage is more resistant to XSS?",
    ],
    options: [
      ["cookie با `HttpOnly`، `Secure` و `SameSite` مناسب", "A cookie with `HttpOnly`, `Secure`, and an appropriate `SameSite`"],
      ["`localStorage` چون بین تب‌ها مشترک است", "`localStorage`, since it's shared across tabs"],
      ["`sessionStorage` چون بعد از بستن تب پاک می‌شود", "`sessionStorage`, since it clears when the tab closes"],
      ["یک متغیر global در `window`", "A global variable on `window`"],
    ],
    a: [
      "هر چیزی در `localStorage` یا `sessionStorage` با یک XSS قابل خواندن است، اما cookie `HttpOnly` قابل خواندن نیست. در عوض باید CSRF را با `SameSite` و token مدیریت کرد؛ access token را می‌توان در حافظه نگه داشت.",
      "Anything in `localStorage` or `sessionStorage` is readable by XSS, while an `HttpOnly` cookie isn't. You then handle CSRF via `SameSite` and tokens; the access token can live in memory.",
    ],
  },
  {
    id: "sec-m-auth-code-flow",
    level: "middle",
    tags: ["oauth"],
    q: [
      "در Authorization Code flow، چرا به جای token مستقیماً یک code به redirect URI برگردانده می‌شود؟",
      "In the Authorization Code flow, why is a code returned to the redirect URI instead of a token?",
    ],
    options: [
      ["تا token از طریق کانال back-channel امن مبادله شود و در URL و history مرورگر نشت نکند", "So the token is exchanged over a secure back channel and doesn't leak via URL or browser history"],
      ["چون token برای قرار گرفتن در URL خیلی طولانی است", "Because tokens are too long to fit in a URL"],
      ["چون code همان refresh token است", "Because the code is the refresh token"],
      ["تا نیاز به HTTPS برطرف شود", "To remove the need for HTTPS"],
    ],
    a: [
      "code کوتاه‌عمر و یک‌بارمصرف است و client آن را در یک request سرور به سرور (همراه client secret یا PKCE verifier) با token عوض می‌کند. این‌طور token از front-channel عبور نمی‌کند.",
      "The code is short-lived and single-use; the client exchanges it in a server-to-server request (with a client secret or PKCE verifier) for tokens, keeping them off the front channel.",
    ],
  },
  {
    id: "sec-m-pkce",
    level: "middle",
    tags: ["oauth", "pkce"],
    q: [
      "PKCE در OAuth 2.0 از چه حمله‌ای جلوگیری می‌کند؟",
      "Which attack does PKCE prevent in OAuth 2.0?",
    ],
    options: [
      ["رهگیری authorization code و مبادله آن توسط مهاجم", "Interception of the authorization code and its exchange by an attacker"],
      ["XSS در صفحه consent", "XSS on the consent page"],
      ["SQL injection در authorization server", "SQL injection in the authorization server"],
      ["brute-force پسورد کاربر", "Brute-forcing the user's password"],
    ],
    a: [
      "client یک `code_verifier` تصادفی می‌سازد و hash آن (`code_challenge`) را در ابتدا می‌فرستد؛ هنگام مبادله code باید verifier اصلی را ارائه دهد. مهاجمی که فقط code را دزدیده نمی‌تواند آن را مبادله کند.",
      "The client creates a random `code_verifier` and sends its hash (`code_challenge`) up front; it must present the original verifier when exchanging the code. An attacker with only the code can't redeem it.",
    ],
  },
  {
    id: "sec-m-implicit-deprecated",
    level: "middle",
    tags: ["oauth"],
    q: [
      "چرا Implicit flow در OAuth 2.0 Security BCP منسوخ شده است؟",
      "Why is the Implicit flow deprecated in the OAuth 2.0 Security BCP?",
    ],
    options: [
      ["access token در URL fragment برگردانده می‌شود و در معرض نشت و injection است", "The access token is returned in the URL fragment, exposing it to leakage and injection"],
      ["چون از HTTPS پشتیبانی نمی‌کند", "Because it doesn't support HTTPS"],
      ["چون نیاز به client secret دارد که SPAها ندارند", "Because it requires a client secret SPAs don't have"],
      ["چون فقط برای اپ‌های موبایل طراحی شده بود", "Because it was designed only for mobile apps"],
    ],
    a: [
      "در Implicit token مستقیماً در fragment می‌آید و از طریق history، Referer یا اسکریپت‌ها قابل نشت است و sender-constraint ندارد. توصیه فعلی Authorization Code + PKCE حتی برای SPAهاست.",
      "In Implicit the token arrives in the fragment, can leak via history, Referer, or scripts, and isn't sender-constrained. The current recommendation is Authorization Code + PKCE, even for SPAs.",
    ],
  },
  {
    id: "sec-m-client-credentials",
    level: "middle",
    tags: ["oauth"],
    q: [
      "کدام OAuth grant برای ارتباط سرویس به سرویس بدون کاربر مناسب است؟",
      "Which OAuth grant suits service-to-service communication with no user involved?",
    ],
    options: [
      ["Client Credentials", "Client Credentials"],
      ["Authorization Code + PKCE", "Authorization Code + PKCE"],
      ["Resource Owner Password Credentials", "Resource Owner Password Credentials"],
      ["Implicit", "Implicit"],
    ],
    a: [
      "در Client Credentials سرویس با `client_id` و `client_secret` (یا private key JWT/mTLS) مستقیماً token می‌گیرد. هیچ کاربری در کار نیست، پس token نماینده خود سرویس است.",
      "With Client Credentials the service authenticates with its `client_id` and `client_secret` (or private key JWT/mTLS) to get a token directly. No user is involved; the token represents the service.",
    ],
  },
  {
    id: "sec-m-oauth-state",
    level: "middle",
    tags: ["oauth", "csrf"],
    q: [
      "پارامتر `state` در درخواست authorization در OAuth چه کاربردی دارد؟",
      "What is the `state` parameter in an OAuth authorization request for?",
    ],
    options: [
      ["جلوگیری از CSRF در callback با گره زدن پاسخ به session کاربر", "Preventing CSRF on the callback by binding the response to the user's session"],
      ["تعیین scopeهای درخواستی", "Specifying requested scopes"],
      ["نگه داشتن access token بین requestها", "Holding the access token between requests"],
      ["مشخص کردن زبان صفحه لاگین", "Setting the login page language"],
    ],
    a: [
      "client یک مقدار تصادفی در `state` می‌فرستد و در callback بررسی می‌کند همان باشد. بدون آن مهاجم می‌تواند code خودش را به حساب قربانی تزریق کند (login CSRF).",
      "The client sends a random `state` and verifies it on the callback. Without it, an attacker can inject their own code into the victim's session (login CSRF).",
    ],
  },
  {
    id: "sec-m-redirect-uri-exact",
    level: "middle",
    tags: ["oauth", "open-redirect"],
    q: [
      "authorization server چگونه باید `redirect_uri` را اعتبارسنجی کند؟",
      "How should an authorization server validate `redirect_uri`?",
    ],
    options: [
      ["مقایسه دقیق رشته‌ای با URIهای از پیش ثبت‌شده", "Exact string match against pre-registered URIs"],
      ["فقط بررسی اینکه با `https://` شروع شود", "Only check that it starts with `https://`"],
      ["بررسی prefix دامنه با wildcard", "Prefix matching the domain with wildcards"],
      ["پذیرش هر URI که client در request بفرستد", "Accept any URI the client sends"],
    ],
    a: [
      "تطبیق ناقص یا wildcard به مهاجم اجازه می‌دهد code یا token را به دامنه یا مسیر تحت کنترل خود (یا یک open redirect) هدایت کند. OAuth Security BCP تطبیق دقیق را الزامی می‌داند.",
      "Loose or wildcard matching lets attackers redirect codes or tokens to a domain or path they control (or an open redirect). The OAuth Security BCP requires exact matching.",
    ],
  },
  {
    id: "sec-m-id-vs-access-token",
    level: "middle",
    tags: ["oidc", "oauth"],
    q: [
      "چرا نباید ID token را به‌عنوان access token به API فرستاد؟",
      "Why shouldn't an ID token be sent to an API as an access token?",
    ],
    options: [
      ["ID token برای client (با `aud` برابر client_id) است و برای مجوز دسترسی به API طراحی نشده", "The ID token is meant for the client (with `aud` = client_id), not for authorizing API access"],
      ["ID token همیشه رمزنگاری شده و API نمی‌تواند آن را بخواند", "ID tokens are always encrypted and APIs can't read them"],
      ["ID token فرمت JWT ندارد", "ID tokens aren't JWTs"],
      ["ID token فقط ۱ ثانیه اعتبار دارد", "ID tokens are valid for only 1 second"],
    ],
    a: [
      "ID token اثبات authentication برای client است و scope یا audience مربوط به API ندارد. API باید access tokenی بپذیرد که `aud` آن خود API باشد.",
      "The ID token proves authentication to the client and carries no API scopes or audience. APIs should accept access tokens whose `aud` is the API itself.",
    ],
  },
  {
    id: "sec-m-oidc-nonce",
    level: "middle",
    tags: ["oidc"],
    q: [
      "پارامتر `nonce` در OpenID Connect از چه چیزی محافظت می‌کند؟",
      "What does the `nonce` parameter in OpenID Connect protect against?",
    ],
    options: [
      ["replay کردن یک ID token قدیمی یا تزریق‌شده", "Replay of an old or injected ID token"],
      ["brute-force کردن client secret", "Brute-forcing the client secret"],
      ["XSS در redirect URI", "XSS in the redirect URI"],
      ["منقضی شدن refresh token", "Refresh token expiry"],
    ],
    a: [
      "client یک مقدار تصادفی در request می‌فرستد و IdP آن را داخل ID token قرار می‌دهد. client بررسی می‌کند `nonce` در token با مقدار ذخیره‌شده در session برابر باشد.",
      "The client sends a random value that the IdP embeds in the ID token. The client checks the token's `nonce` matches the value stored in its session.",
    ],
  },
  {
    id: "sec-m-saml-basics",
    level: "middle",
    tags: ["sso", "saml"],
    q: [
      "در SAML SSO، IdP هویت کاربر را با چه چیزی به Service Provider اعلام می‌کند؟",
      "In SAML SSO, how does the IdP convey the user's identity to the Service Provider?",
    ],
    options: [
      ["یک SAML Assertion امضاشده به فرمت XML", "A signed XML SAML Assertion"],
      ["یک JWT امضاشده با HS256", "An HS256-signed JWT"],
      ["یک cookie مشترک بین دو دامنه", "A cookie shared across both domains"],
      ["ارسال پسورد کاربر به SP", "Forwarding the user's password to the SP"],
    ],
    a: [
      "SAML از assertionهای XML امضاشده استفاده می‌کند که معمولاً از طریق POST مرورگر به SP می‌رسند. SP باید امضا، `Audience`، زمان اعتبار و `InResponseTo` را با دقت بررسی کند.",
      "SAML uses signed XML assertions, typically delivered to the SP via a browser POST. The SP must carefully verify the signature, `Audience`, validity window, and `InResponseTo`.",
    ],
  },
  {
    id: "sec-m-webauthn-phishing",
    level: "middle",
    tags: ["webauthn", "passkeys", "mfa"],
    q: [
      "چرا passkeyها (WebAuthn) در برابر phishing مقاوم‌اند؟",
      "Why are passkeys (WebAuthn) phishing-resistant?",
    ],
    options: [
      ["credential به origin سایت گره خورده و مرورگر آن را روی دامنه جعلی ارائه نمی‌کند", "The credential is bound to the site's origin and the browser won't use it on a fake domain"],
      ["چون passkey یک پسورد بسیار طولانی است", "Because a passkey is just a very long password"],
      ["چون passkey با SMS ارسال می‌شود", "Because the passkey is sent via SMS"],
      ["چون سرور کلید خصوصی کاربر را نگه می‌دارد", "Because the server stores the user's private key"],
    ],
    a: [
      "در WebAuthn کلید خصوصی روی دستگاه می‌ماند و امضای challenge شامل origin است. سایت phishing با دامنه دیگر نمی‌تواند امضای معتبر برای سایت اصلی بگیرد، برخلاف TOTP که قابل relay است.",
      "In WebAuthn the private key stays on the device and the signed challenge includes the origin. A phishing site on another domain can't obtain a valid assertion, unlike TOTP codes which can be relayed.",
    ],
  },
  {
    id: "sec-m-sms-otp-weakness",
    level: "middle",
    tags: ["mfa"],
    q: [
      "ضعف اصلی SMS به‌عنوان عامل دوم چیست؟",
      "What is the main weakness of SMS as a second factor?",
    ],
    options: [
      ["آسیب‌پذیری در برابر SIM swapping، رهگیری و phishing", "Vulnerability to SIM swapping, interception, and phishing"],
      ["کدهای SMS همیشه قابل حدس‌اند", "SMS codes are always guessable"],
      ["SMS نیاز به اتصال اینترنت دارد", "SMS requires an internet connection"],
      ["SMS با HTTPS سازگار نیست", "SMS is incompatible with HTTPS"],
    ],
    a: [
      "مهاجم با فریب اپراتور شماره قربانی را به SIM خود منتقل می‌کند یا کد را از طریق ضعف‌های شبکه SS7 رهگیری می‌کند. SMS بهتر از هیچ است ولی TOTP و WebAuthn امن‌ترند.",
      "Attackers can trick carriers into porting the number to their SIM or intercept codes via SS7 weaknesses. SMS beats nothing, but TOTP and WebAuthn are stronger.",
    ],
  },
  {
    id: "sec-m-mtls",
    level: "middle",
    tags: ["mtls", "tls"],
    q: [
      "mTLS چه چیزی را نسبت به TLS معمولی اضافه می‌کند؟",
      "What does mTLS add compared to regular TLS?",
    ],
    options: [
      ["client هم با certificate خودش به سرور احراز هویت می‌شود", "The client also authenticates to the server with its own certificate"],
      ["رمزنگاری دو لایه داده با دو کلید AES", "Double encryption with two AES keys"],
      ["حذف نیاز به certificate سمت سرور", "Removing the need for a server certificate"],
      ["پشتیبانی از HTTP/1.0", "Support for HTTP/1.0"],
    ],
    a: [
      "در mTLS هر دو طرف certificate ارائه و تأیید می‌کنند. این روش در ارتباط سرویس‌ها (مثلاً با service mesh) و برای sender-constrained token در OAuth رایج است.",
      "In mTLS both sides present and verify certificates. It's common for service-to-service traffic (e.g. via a service mesh) and for sender-constrained OAuth tokens.",
    ],
  },
  {
    id: "sec-m-abac",
    level: "middle",
    tags: ["abac", "authorization"],
    q: [
      "قانون «پزشک فقط در ساعات کاری و فقط به پرونده بیماران بخش خودش دسترسی دارد» با کدام مدل بهتر پیاده می‌شود؟",
      "'A doctor may access only their department's patient records, only during working hours' is best modeled with which approach?",
    ],
    options: [
      ["ABAC (بر اساس ویژگی‌های کاربر، منبع و محیط)", "ABAC (based on user, resource, and environment attributes)"],
      ["RBAC ساده با یک نقش `doctor`", "Plain RBAC with a single `doctor` role"],
      ["ACL ثابت روی هر فایل", "A static ACL on each file"],
      ["API key جداگانه برای هر بخش", "A separate API key per department"],
    ],
    a: [
      "ABAC سیاست‌ها را روی ویژگی‌هایی مثل `user.department`، `resource.department` و زمان فعلی ارزیابی می‌کند. RBAC خالص برای چنین قوانین پویا به انفجار تعداد نقش‌ها منجر می‌شود.",
      "ABAC evaluates policies over attributes like `user.department`, `resource.department`, and current time. Pure RBAC would need an explosion of roles for such dynamic rules.",
    ],
  },
  {
    id: "sec-m-rebac",
    level: "middle",
    tags: ["rebac", "authorization"],
    q: [
      "ReBAC (مثل Google Zanzibar) برای چه نوع قوانینی مناسب است؟",
      "What kind of rules is ReBAC (like Google Zanzibar) suited for?",
    ],
    options: [
      ["قوانین مبتنی بر رابطه، مثل «اعضای تیمی که مالک پوشه است می‌توانند سند را ویرایش کنند»", "Relationship-based rules, like 'members of the team owning the folder can edit the doc'"],
      ["محدود کردن دسترسی بر اساس IP", "Restricting access by IP address"],
      ["rate limiting بر اساس کاربر", "Per-user rate limiting"],
      ["رمزنگاری داده‌ها بر اساس نقش", "Encrypting data by role"],
    ],
    a: [
      "ReBAC مجوز را از گراف روابط بین موجودیت‌ها (مالک، عضو، والد) استنتاج می‌کند. برای اشتراک‌گذاری سلسله‌مراتبی مثل Google Drive بسیار طبیعی‌تر از RBAC است.",
      "ReBAC derives permissions from a graph of relationships (owner, member, parent). It fits hierarchical sharing like Google Drive far better than RBAC.",
    ],
  },
  {
    id: "sec-m-mass-assignment",
    level: "middle",
    tags: ["mass-assignment", "owasp"],
    q: [
      "کد `User.update(req.params.id, req.body)` در endpoint ویرایش پروفایل چه خطری دارد؟",
      "What's the risk of `User.update(req.params.id, req.body)` in a profile update endpoint?",
    ],
    options: [
      ["mass assignment؛ کاربر می‌تواند فیلدهایی مثل `isAdmin` یا `role` را تغییر دهد", "Mass assignment; the user can set fields like `isAdmin` or `role`"],
      ["SQL injection حتمی در همه ORMها", "Guaranteed SQL injection in every ORM"],
      ["XSS چون body به‌صورت JSON است", "XSS because the body is JSON"],
      ["CSRF چون از `req.params` استفاده شده", "CSRF because `req.params` is used"],
    ],
    a: [
      "ارسال مستقیم body به مدل اجازه می‌دهد کاربر هر فیلدی را بنویسد. باید با allowlist (مثلاً schema با Zod یا DTO) فقط فیلدهای مجاز را برداشت؛ ضمناً اینجا IDOR هم ممکن است.",
      "Passing the body straight to the model lets users write any field. Pick only allowed fields with an allowlist (e.g. a Zod schema or DTO); this code may also have an IDOR.",
    ],
  },
  {
    id: "sec-m-nosql-injection",
    level: "middle",
    tags: ["nosql-injection", "owasp"],
    q: [
      "در MongoDB، کد `users.findOne({ email: req.body.email, password: req.body.password })` با body `{\"email\":\"a@b.c\",\"password\":{\"$ne\":null}}` چه می‌شود؟",
      "In MongoDB, what happens with `users.findOne({ email: req.body.email, password: req.body.password })` given the body `{\"email\":\"a@b.c\",\"password\":{\"$ne\":null}}`?",
    ],
    options: [
      ["operator `$ne` شرط پسورد را دور می‌زند و لاگین بدون پسورد ممکن می‌شود", "The `$ne` operator bypasses the password check, allowing login without it"],
      ["MongoDB خطا می‌دهد چون پسورد رشته نیست", "MongoDB errors out because the password isn't a string"],
      ["فقط کاربری با پسورد `null` پیدا می‌شود", "It only matches a user whose password is `null`"],
      ["هیچ اثری ندارد چون MongoDB SQL ندارد", "No effect, since MongoDB has no SQL"],
    ],
    a: [
      "اگر ورودی به‌عنوان object پذیرفته شود، operatorهای Mongo مثل `$ne` یا `$gt` تزریق می‌شوند. باید نوع ورودی را validate کرد (مثلاً اطمینان از string بودن) یا از sanitize کردن کلیدهای `$` استفاده کرد؛ ضمناً پسورد هرگز نباید مستقیم مقایسه شود.",
      "If input is accepted as an object, Mongo operators like `$ne` or `$gt` get injected. Validate types (ensure strings) or strip `$` keys; and passwords should never be compared directly anyway.",
    ],
  },
  {
    id: "sec-m-ssrf",
    level: "middle",
    tags: ["ssrf", "owasp"],
    q: [
      "قابلیت «دریافت تصویر از URL» به `http://169.254.169.254/latest/meta-data/` درخواست می‌زند. این چه حمله‌ای است و چرا خطرناک است؟",
      "An 'import image from URL' feature fetches `http://169.254.169.254/latest/meta-data/`. What attack is this and why is it dangerous?",
    ],
    options: [
      ["SSRF؛ ممکن است credentialهای IAM ابری از metadata endpoint نشت کند", "SSRF; cloud IAM credentials may leak from the metadata endpoint"],
      ["XSS؛ تصویر می‌تواند اسکریپت اجرا کند", "XSS; the image can run scripts"],
      ["CSRF؛ درخواست با cookie کاربر ارسال می‌شود", "CSRF; the request carries the user's cookie"],
      ["Open redirect؛ کاربر به سایت دیگر هدایت می‌شود", "Open redirect; the user is sent to another site"],
    ],
    a: [
      "در SSRF سرور به آدرس دلخواه مهاجم، از جمله شبکه داخلی، درخواست می‌زند. دفاع: allowlist مقصد، مسدود کردن IPهای private/link-local بعد از DNS resolve، و استفاده از IMDSv2 در AWS.",
      "In SSRF the server requests attacker-chosen URLs, including internal networks. Defenses: destination allowlists, blocking private/link-local IPs after DNS resolution, and IMDSv2 on AWS.",
    ],
  },
  {
    id: "sec-m-csp",
    level: "middle",
    tags: ["xss", "csp"],
    q: [
      "کدام Content-Security-Policy بیشترین محافظت را در برابر XSS ایجاد می‌کند؟",
      "Which Content-Security-Policy provides the strongest XSS protection?",
    ],
    options: [
      ["`script-src 'nonce-r4nd0m' 'strict-dynamic'; object-src 'none'; base-uri 'none'`", "`script-src 'nonce-r4nd0m' 'strict-dynamic'; object-src 'none'; base-uri 'none'`"],
      ["`script-src 'self' 'unsafe-inline' 'unsafe-eval'`", "`script-src 'self' 'unsafe-inline' 'unsafe-eval'`"],
      ["`script-src *`", "`script-src *`"],
      ["`default-src 'self' https:`", "`default-src 'self' https:`"],
    ],
    a: [
      "CSP مبتنی بر nonce فقط اسکریپت‌هایی را اجرا می‌کند که nonce تصادفی هر response را دارند. `'unsafe-inline'` عملاً XSS inline را مجاز می‌کند و allowlist دامنه‌ها اغلب قابل دور زدن است.",
      "A nonce-based CSP only runs scripts carrying the per-response random nonce. `'unsafe-inline'` effectively permits inline XSS, and domain allowlists are often bypassable.",
    ],
  },
  {
    id: "sec-m-xss-context",
    level: "middle",
    tags: ["xss"],
    q: [
      "چرا HTML-escape کردن برای قرار دادن ورودی در `<a href=\"...\">` کافی نیست؟",
      "Why isn't HTML-escaping enough when placing input into `<a href=\"...\">`?",
    ],
    options: [
      ["URL مثل `javascript:alert(1)` کاراکتر خاص HTML ندارد ولی اجرا می‌شود؛ باید scheme را validate کرد", "A URL like `javascript:alert(1)` has no HTML special chars yet executes; validate the scheme"],
      ["چون مرورگرها escape را داخل attribute نادیده می‌گیرند", "Because browsers ignore escaping inside attributes"],
      ["چون `href` فقط Base64 می‌پذیرد", "Because `href` only accepts Base64"],
      ["چون escape کردن لینک را از کار می‌اندازد", "Because escaping breaks the link"],
    ],
    a: [
      "encoding باید متناسب با context باشد: HTML body، attribute، URL، JavaScript و CSS هر کدام قواعد خود را دارند. برای URL باید فقط `http:` و `https:` را مجاز کرد.",
      "Encoding must be context-specific: HTML body, attributes, URLs, JavaScript, and CSS each have their own rules. For URLs, allow only `http:` and `https:` schemes.",
    ],
  },
  {
    id: "sec-m-cors-wildcard-credentials",
    level: "middle",
    tags: ["cors"],
    q: [
      "سرور origin درخواست را بدون بررسی در `Access-Control-Allow-Origin` بازتاب می‌دهد و `Access-Control-Allow-Credentials: true` هم دارد. نتیجه چیست؟",
      "A server reflects the request's Origin into `Access-Control-Allow-Origin` unchecked and also sends `Access-Control-Allow-Credentials: true`. What's the result?",
    ],
    options: [
      ["هر سایتی می‌تواند با cookie کاربر درخواست بزند و پاسخ را بخواند", "Any site can make credentialed requests and read the responses"],
      ["مرورگر همه درخواست‌ها را مسدود می‌کند", "The browser blocks all requests"],
      ["فقط درخواست‌های same-origin مجاز می‌شوند", "Only same-origin requests are allowed"],
      ["تأثیری ندارد چون CORS فقط روی GET اعمال می‌شود", "No effect, since CORS applies only to GET"],
    ],
    a: [
      "مرورگر `*` را همراه credentials نمی‌پذیرد، اما بازتاب origin همین محدودیت را دور می‌زند و داده‌های کاربر را به هر سایتی نشت می‌دهد. origin باید با allowlist دقیق بررسی شود.",
      "Browsers reject `*` with credentials, but reflecting the Origin sidesteps that and leaks user data to any site. Check origins against an exact allowlist.",
    ],
  },
  {
    id: "sec-m-cors-not-auth",
    level: "middle",
    tags: ["cors"],
    q: [
      "کدام جمله درباره CORS درست است؟",
      "Which statement about CORS is correct?",
    ],
    options: [
      ["CORS سیاست مرورگر برای خواندن پاسخ است و جایگزین authentication سمت سرور نیست", "CORS is a browser policy for reading responses and doesn't replace server-side authentication"],
      ["CORS جلوی درخواست‌های curl به API را می‌گیرد", "CORS blocks curl requests to the API"],
      ["CORS داده‌ها را در مسیر رمزنگاری می‌کند", "CORS encrypts data in transit"],
      ["CORS جلوی همه حملات CSRF را می‌گیرد", "CORS prevents all CSRF attacks"],
    ],
    a: [
      "CORS فقط کنترل می‌کند JavaScript یک origin دیگر بتواند پاسخ را بخواند. کلاینت‌های غیرمرورگری آن را نادیده می‌گیرند و requestهای ساده (simple) حتی بدون preflight به سرور می‌رسند.",
      "CORS only controls whether JavaScript from another origin can read the response. Non-browser clients ignore it, and simple requests still reach the server without a preflight.",
    ],
  },
  {
    id: "sec-m-timing-attack",
    level: "middle",
    tags: ["timing-attack", "crypto-basics"],
    q: [
      "چرا مقایسه یک API token یا HMAC با `===` می‌تواند ناامن باشد؟",
      "Why can comparing an API token or HMAC with `===` be insecure?",
    ],
    options: [
      ["مقایسه در اولین کاراکتر متفاوت متوقف می‌شود و زمان پاسخ اطلاعات نشت می‌دهد", "It stops at the first differing character, so response time leaks information"],
      ["`===` در JavaScript برای رشته‌های بلند خطا می‌دهد", "`===` throws on long strings in JavaScript"],
      ["`===` حروف بزرگ و کوچک را یکسان در نظر می‌گیرد", "`===` is case-insensitive"],
      ["`===` رشته را در log ثبت می‌کند", "`===` writes the string to logs"],
    ],
    a: [
      "مهاجم با اندازه‌گیری زمان می‌تواند بایت به بایت مقدار صحیح را حدس بزند. از مقایسه constant-time مثل `crypto.timingSafeEqual` در Node.js استفاده کنید.",
      "By measuring timing, an attacker can guess the correct value byte by byte. Use constant-time comparison such as `crypto.timingSafeEqual` in Node.js.",
    ],
  },
  {
    id: "sec-m-hmac-webhook",
    level: "middle",
    tags: ["hmac", "webhooks"],
    q: [
      "روش صحیح verify کردن webhook امضاشده با HMAC (مثل Stripe یا GitHub) چیست؟",
      "What's the correct way to verify an HMAC-signed webhook (like Stripe or GitHub)?",
    ],
    options: [
      ["محاسبه HMAC روی raw body با secret مشترک و مقایسه constant-time، همراه بررسی timestamp", "Compute the HMAC over the raw body with the shared secret, compare in constant time, and check the timestamp"],
      ["parse کردن JSON و محاسبه HMAC روی `JSON.stringify` آن", "Parse the JSON and compute the HMAC over its `JSON.stringify`"],
      ["فقط بررسی IP فرستنده", "Only check the sender's IP"],
      ["decode کردن امضا با Base64 و مقایسه با secret", "Base64-decode the signature and compare it to the secret"],
    ],
    a: [
      "re-serialize کردن JSON ممکن است بایت‌ها را تغییر دهد و امضا نامعتبر شود، پس باید raw body استفاده شود. timestamp در امضا جلوی replay حملات را می‌گیرد.",
      "Re-serializing JSON can change the bytes and break the signature, so use the raw body. A timestamp in the signed payload prevents replay attacks.",
    ],
  },
  {
    id: "sec-m-hmac-vs-hash",
    level: "middle",
    tags: ["hmac", "crypto-basics"],
    q: [
      "چرا برای امضای پیام از `HMAC-SHA256(key, msg)` به جای `SHA256(key + msg)` استفاده می‌شود؟",
      "Why use `HMAC-SHA256(key, msg)` instead of `SHA256(key + msg)` to sign messages?",
    ],
    options: [
      ["`SHA256(key + msg)` در برابر length extension attack آسیب‌پذیر است", "`SHA256(key + msg)` is vulnerable to length extension attacks"],
      ["HMAC خروجی کوتاه‌تری دارد", "HMAC produces shorter output"],
      ["HMAC برگشت‌پذیر است و می‌توان پیام را بازیابی کرد", "HMAC is reversible, so the message can be recovered"],
      ["SHA256 فقط برای فایل کار می‌کند", "SHA256 only works on files"],
    ],
    a: [
      "در hashهای Merkle–Damgård مثل SHA-256، مهاجم می‌تواند بدون دانستن key داده به پیام اضافه کند و hash معتبر بسازد. ساختار دو لایه HMAC این حمله را خنثی می‌کند.",
      "With Merkle–Damgård hashes like SHA-256, an attacker can append data and compute a valid hash without the key. HMAC's nested construction prevents this.",
    ],
  },
  {
    id: "sec-m-pepper",
    level: "middle",
    tags: ["password-hashing", "pepper"],
    q: [
      "pepper در hash کردن پسورد چیست و کجا نگه داشته می‌شود؟",
      "What is a pepper in password hashing and where is it kept?",
    ],
    options: [
      ["یک secret سراسری که خارج از دیتابیس (مثلاً در HSM یا secrets manager) نگه داشته می‌شود", "A global secret stored outside the database (e.g. in an HSM or secrets manager)"],
      ["یک salt تصادفی برای هر کاربر که کنار hash ذخیره می‌شود", "A per-user random salt stored next to the hash"],
      ["تعداد دورهای bcrypt", "The number of bcrypt rounds"],
      ["یک hash دوم از ایمیل کاربر", "A second hash of the user's email"],
    ],
    a: [
      "pepper معمولاً به‌صورت HMAC روی پسورد قبل از hash یا رمزنگاری hash خروجی اعمال می‌شود. اگر فقط دیتابیس نشت کند، بدون pepper شکستن hashها ممکن نیست؛ اما rotate کردن آن چالش‌برانگیز است.",
      "A pepper is typically applied as an HMAC over the password before hashing, or by encrypting the hash. If only the DB leaks, hashes can't be cracked without it; rotating it is tricky though.",
    ],
  },
  {
    id: "sec-m-bcrypt-72-bytes",
    level: "middle",
    tags: ["bcrypt"],
    q: [
      "کدام محدودیت bcrypt هنگام استفاده باید در نظر گرفته شود؟",
      "Which bcrypt limitation must be considered when using it?",
    ],
    options: [
      ["فقط ۷۲ بایت اول پسورد را در نظر می‌گیرد", "It only uses the first 72 bytes of the password"],
      ["نمی‌تواند پسوردهای کوتاه‌تر از ۱۶ کاراکتر را hash کند", "It can't hash passwords shorter than 16 characters"],
      ["خروجی آن برای هر بار اجرا یکسان است", "Its output is identical on every run"],
      ["نیاز به GPU برای اجرا دارد", "It requires a GPU to run"],
    ],
    a: [
      "بایت‌های بعد از ۷۲ نادیده گرفته می‌شوند (و کاراکترهای چندبایتی UTF-8 سریع‌تر به این حد می‌رسند). در صورت نیاز می‌توان از Argon2id استفاده کرد یا با احتیاط پیش‌hash کرد.",
      "Bytes beyond 72 are ignored (and multi-byte UTF-8 characters hit the limit sooner). Use Argon2id if needed, or pre-hash carefully.",
    ],
  },
  {
    id: "sec-m-password-rehash",
    level: "middle",
    tags: ["password-hashing"],
    q: [
      "چگونه می‌توان cost bcrypt یا الگوریتم hash را بدون reset پسورد کاربران ارتقا داد؟",
      "How can you upgrade bcrypt cost or the hash algorithm without resetting user passwords?",
    ],
    options: [
      ["هنگام لاگین موفق، پسورد plaintext را با پارامترهای جدید دوباره hash و ذخیره کرد", "On successful login, rehash the plaintext password with the new parameters and store it"],
      ["hashهای قدیمی را decrypt و با الگوریتم جدید hash کرد", "Decrypt old hashes and rehash them with the new algorithm"],
      ["همه hashها را با یک اسکریپت شبانه brute-force کرد", "Brute-force all hashes in a nightly script"],
      ["این کار ممکن نیست و همه باید پسورد را عوض کنند", "It's impossible; everyone must change their password"],
    ],
    a: [
      "فرمت‌های hash مثل `$2b$12$...` پارامترها را در خود دارند، پس می‌توان بعد از verify تشخیص داد نیاز به rehash هست یا نه. برای حساب‌های غیرفعال می‌توان hash قدیمی را داخل الگوریتم جدید wrap کرد.",
      "Hash formats like `$2b$12$...` embed their parameters, so after verifying you can detect if a rehash is needed. For inactive accounts, wrap the old hash inside the new algorithm.",
    ],
  },
  {
    id: "sec-m-account-lockout-dos",
    level: "middle",
    tags: ["brute-force", "rate-limiting"],
    q: [
      "مشکل قفل کردن کامل حساب بعد از ۵ تلاش ناموفق چیست؟",
      "What's the problem with hard-locking an account after 5 failed attempts?",
    ],
    options: [
      ["مهاجم می‌تواند عمداً حساب‌های دیگران را قفل کند (DoS)", "Attackers can deliberately lock out other users (DoS)"],
      ["قفل کردن حساب باعث نشت hash پسورد می‌شود", "Locking leaks the password hash"],
      ["قفل کردن جلوی credential stuffing را بهتر می‌گیرد", "Locking stops credential stuffing even better"],
      ["هیچ مشکلی ندارد و بهترین روش است", "No problem; it's the best practice"],
    ],
    a: [
      "قفل سخت راهی برای DoS هدفمند ایجاد می‌کند. بهتر است از تأخیر تدریجی (exponential backoff)، CAPTCHA و rate limit ترکیبی بر اساس IP و حساب استفاده شود.",
      "Hard lockouts enable targeted DoS. Prefer progressive delays (exponential backoff), CAPTCHA, and combined rate limits per IP and per account.",
    ],
  },
  {
    id: "sec-m-reset-token",
    level: "middle",
    tags: ["password-reset"],
    q: [
      "token لینک بازیابی رمز عبور چه ویژگی‌هایی باید داشته باشد؟",
      "What properties should a password reset link token have?",
    ],
    options: [
      ["تصادفی با entropy بالا، یک‌بارمصرف، کوتاه‌عمر و به‌صورت hash‌شده در دیتابیس", "High-entropy random, single-use, short-lived, and stored hashed in the DB"],
      ["برابر با Base64 ایمیل کاربر تا قابل بررسی باشد", "The Base64 of the user's email for easy verification"],
      ["یک عدد ترتیبی افزایشی برای هر درخواست", "A sequential incrementing number per request"],
      ["دائمی تا کاربر هر وقت خواست استفاده کند", "Permanent so the user can use it anytime"],
    ],
    a: [
      "token قابل حدس یا با عمر طولانی امکان takeover حساب را فراهم می‌کند. ذخیره hash آن باعث می‌شود نشت دیتابیس به token فعال منجر نشود و بعد از reset باید sessionهای قبلی باطل شوند.",
      "Guessable or long-lived tokens enable account takeover. Storing only its hash means a DB leak doesn't expose live tokens, and existing sessions should be revoked after reset.",
    ],
  },
  {
    id: "sec-m-secrets-manager",
    level: "middle",
    tags: ["secrets"],
    q: [
      "مزیت اصلی استفاده از secrets manager (مثل HashiCorp Vault یا AWS Secrets Manager) نسبت به env var ثابت چیست؟",
      "What's the main advantage of a secrets manager (e.g. HashiCorp Vault or AWS Secrets Manager) over static env vars?",
    ],
    options: [
      ["کنترل دسترسی، audit log، rotation خودکار و حتی secretهای پویا و کوتاه‌عمر", "Access control, audit logs, automatic rotation, and even dynamic short-lived secrets"],
      ["سریع‌تر شدن اجرای برنامه", "Faster application runtime"],
      ["حذف نیاز به TLS", "Removing the need for TLS"],
      ["امکان commit کردن secretها در Git", "Allowing secrets to be committed to Git"],
    ],
    a: [
      "secrets manager مشخص می‌کند چه کسی و چه زمانی به secret دسترسی داشته و rotation را بدون deploy مجدد ممکن می‌کند. Vault می‌تواند credential دیتابیس موقت برای هر سرویس بسازد.",
      "A secrets manager records who accessed what and when, and enables rotation without redeploys. Vault can even mint temporary database credentials per service.",
    ],
  },
  {
    id: "sec-m-security-misconfig",
    level: "middle",
    tags: ["misconfiguration", "owasp"],
    q: [
      "کدام مورد نمونه security misconfiguration است؟",
      "Which is an example of security misconfiguration?",
    ],
    options: [
      ["نمایش stack trace کامل و نسخه فریم‌ورک در پاسخ‌های خطای production", "Showing full stack traces and framework versions in production error responses"],
      ["استفاده از Argon2id برای پسوردها", "Using Argon2id for passwords"],
      ["فعال بودن HSTS", "Having HSTS enabled"],
      ["استفاده از parameterized query", "Using parameterized queries"],
    ],
    a: [
      "حالت debug، پسوردهای پیش‌فرض، bucketهای S3 عمومی و headerهای افشاگر مثل `X-Powered-By` همه misconfiguration هستند. در production باید پیام خطای عمومی برگرداند و جزئیات را فقط log کرد.",
      "Debug mode, default passwords, public S3 buckets, and revealing headers like `X-Powered-By` are all misconfigurations. In production return generic errors and log the details only.",
    ],
  },
  {
    id: "sec-m-log-sensitive-data",
    level: "middle",
    tags: ["logging", "sensitive-data"],
    q: [
      "در logهای اپلیکیشن کدام مورد نباید ثبت شود؟",
      "Which should NOT be written to application logs?",
    ],
    options: [
      ["پسورد، access token و header `Authorization` کامل", "Passwords, access tokens, and the full `Authorization` header"],
      ["شناسه کاربر و زمان لاگین", "User ID and login time"],
      ["status code پاسخ", "Response status code"],
      ["request ID برای ردیابی", "A request ID for tracing"],
    ],
    a: [
      "logها معمولاً دسترسی گسترده‌تر و نگهداری طولانی‌تری دارند و نشت آن‌ها رایج است. داده حساس باید redact یا mask شود؛ مثلاً در pino از گزینه `redact` استفاده کنید.",
      "Logs usually have broader access and longer retention, and leaks are common. Redact or mask sensitive data, e.g. with pino's `redact` option.",
    ],
  },
  {
    id: "sec-m-audit-logging",
    level: "middle",
    tags: ["audit-logging"],
    q: [
      "یک audit log امنیتی خوب چه ویژگی‌هایی دارد؟",
      "What characterizes a good security audit log?",
    ],
    options: [
      ["ثبت چه کسی، چه کاری، روی چه منبعی، چه زمانی و از کجا؛ به‌صورت append-only و جدا از اپ", "Records who did what to which resource, when, and from where; append-only and separate from the app"],
      ["فقط ثبت خطاهای 500 سرور", "Logs only server 500 errors"],
      ["ذخیره در همان جدولی که اپ می‌تواند ویرایش کند", "Stored in a table the app can freely edit"],
      ["ثبت کامل body همه requestها شامل پسوردها", "Logs full request bodies including passwords"],
    ],
    a: [
      "audit log برای تحقیق رخداد و compliance است و باید در برابر دستکاری مقاوم باشد. رویدادهایی مثل لاگین، تغییر مجوز و دسترسی به داده حساس باید ثبت شوند.",
      "Audit logs support incident investigation and compliance and must be tamper-resistant. Log events like logins, permission changes, and sensitive data access.",
    ],
  },
  {
    id: "sec-m-insecure-deserialization",
    level: "middle",
    tags: ["deserialization", "owasp"],
    q: [
      "چرا deserialize کردن داده ورودی کاربر با `pickle.loads` در Python یا `ObjectInputStream` در Java خطرناک است؟",
      "Why is deserializing user input with Python's `pickle.loads` or Java's `ObjectInputStream` dangerous?",
    ],
    options: [
      ["ممکن است منجر به اجرای کد دلخواه (RCE) از طریق gadget chainها شود", "It can lead to remote code execution (RCE) via gadget chains"],
      ["فقط باعث کندی پردازش می‌شود", "It only slows down processing"],
      ["فقط حروف یونیکد را خراب می‌کند", "It only corrupts Unicode characters"],
      ["باعث نشت cookie در مرورگر می‌شود", "It leaks cookies in the browser"],
    ],
    a: [
      "این فرمت‌ها هنگام بازسازی شیء می‌توانند متدهای دلخواه را فراخوانی کنند. برای داده نامطمئن از فرمت‌های داده‌محور مثل JSON با schema validation استفاده کنید.",
      "These formats can invoke arbitrary methods while reconstructing objects. Use data-only formats like JSON with schema validation for untrusted input.",
    ],
  },
  {
    id: "sec-m-api-key-storage",
    level: "middle",
    tags: ["api-keys"],
    q: [
      "API keyهای صادرشده برای مشتریان چگونه باید در دیتابیس ذخیره شوند؟",
      "How should API keys issued to customers be stored in the database?",
    ],
    options: [
      ["فقط hash آن‌ها (مثلاً SHA-256) همراه یک prefix قابل نمایش برای شناسایی", "Only their hash (e.g. SHA-256) plus a displayable prefix for identification"],
      ["به‌صورت plaintext تا بتوان دوباره به کاربر نشان داد", "In plaintext so they can be shown to the user again"],
      ["با Base64 برای امنیت بیشتر", "Base64-encoded for extra security"],
      ["با bcrypt با cost 20", "With bcrypt at cost 20"],
    ],
    a: [
      "API key تصادفی با entropy بالا نیازی به hash کند ندارد، پس SHA-256 کافی و سریع است. کلید فقط یک بار هنگام ساخت نمایش داده می‌شود و prefix (مثل `sk_live_ab12`) برای شناسایی در UI و scan نشت به کار می‌رود.",
      "High-entropy random keys don't need slow hashing, so SHA-256 is sufficient and fast. Show the key once at creation; a prefix (like `sk_live_ab12`) helps identify it in UIs and leak scanners.",
    ],
  },
  {
    id: "sec-m-logout-jwt",
    level: "middle",
    tags: ["jwt", "sessions"],
    q: [
      "در سیستم مبتنی بر JWT، logout واقعی سمت سرور چگونه انجام می‌شود؟",
      "In a JWT-based system, how is a real server-side logout achieved?",
    ],
    options: [
      ["revoke کردن refresh token و در صورت نیاز denylist کردن `jti` access token تا زمان انقضا", "Revoke the refresh token and, if needed, denylist the access token's `jti` until expiry"],
      ["فقط حذف token از localStorage کلاینت", "Just delete the token from client localStorage"],
      ["تغییر claim `exp` داخل token", "Modify the token's `exp` claim"],
      ["ارسال دوباره همان token به endpoint logout", "Resend the same token to a logout endpoint"],
    ],
    a: [
      "حذف سمت کلاینت token را باطل نمی‌کند و نسخه کپی‌شده همچنان معتبر است. سرور باید refresh token را باطل کند و برای access token کوتاه‌عمر یا انقضا را بپذیرد یا از denylist استفاده کند.",
      "Client-side deletion doesn't invalidate the token; copies remain valid. The server must revoke the refresh token and either accept the short access-token expiry or use a denylist.",
    ],
  },
  {
    id: "sec-m-lockfile-integrity",
    level: "middle",
    tags: ["supply-chain", "dependencies"],
    q: [
      "چرا در CI باید از `npm ci` به جای `npm install` استفاده کرد؟",
      "Why use `npm ci` instead of `npm install` in CI?",
    ],
    options: [
      ["دقیقاً نسخه‌ها و integrity hashهای lockfile را نصب می‌کند و در صورت ناهماهنگی fail می‌شود", "It installs exactly the lockfile's versions and integrity hashes, failing on mismatch"],
      ["همیشه آخرین نسخه پکیج‌ها را نصب می‌کند", "It always installs the latest package versions"],
      ["اسکریپت‌های `postinstall` را رمزنگاری می‌کند", "It encrypts `postinstall` scripts"],
      ["آسیب‌پذیری‌ها را خودکار patch می‌کند", "It patches vulnerabilities automatically"],
    ],
    a: [
      "`npm ci` بیلدها را قابل تکرار می‌کند و جلوی ورود ناخواسته نسخه جدید (احتمالاً مخرب) را می‌گیرد. غیرفعال کردن install scriptها با `--ignore-scripts` هم سطح حمله را کم می‌کند.",
      "`npm ci` makes builds reproducible and prevents silently pulling a new (possibly malicious) version. Disabling install scripts with `--ignore-scripts` further reduces attack surface.",
    ],
  },
  {
    id: "sec-m-rate-limit-token-bucket",
    level: "middle",
    tags: ["rate-limiting"],
    q: [
      "در الگوریتم token bucket برای rate limiting، چه چیزی اجازه burst کوتاه را می‌دهد؟",
      "In the token bucket rate-limiting algorithm, what allows short bursts?",
    ],
    options: [
      ["ظرفیت سطل؛ tokenهای انباشته‌شده تا سقف ظرفیت یک‌جا قابل مصرف‌اند", "The bucket capacity; tokens accumulated up to the cap can be spent at once"],
      ["نرخ پر شدن سطل که در زمان burst بیشتر می‌شود", "The refill rate, which increases during bursts"],
      ["پاک شدن سطل در ابتدای هر دقیقه", "Clearing the bucket at the start of each minute"],
      ["صف کردن همه requestها تا خالی شدن سطل", "Queueing all requests until the bucket empties"],
    ],
    a: [
      "سطل با نرخ ثابت پر می‌شود و هر request یک token مصرف می‌کند؛ اگر token نباشد پاسخ `429 Too Many Requests` با header `Retry-After` برمی‌گردد. در سیستم توزیع‌شده state معمولاً در Redis نگه داشته می‌شود.",
      "The bucket refills at a fixed rate and each request spends a token; when empty, respond `429 Too Many Requests` with `Retry-After`. In distributed systems the state usually lives in Redis.",
    ],
  },
  {
    id: "sec-m-security-headers",
    level: "middle",
    tags: ["headers", "clickjacking"],
    q: [
      "کدام header از clickjacking جلوگیری می‌کند؟",
      "Which header prevents clickjacking?",
    ],
    options: [
      ["`Content-Security-Policy: frame-ancestors 'none'` (یا `X-Frame-Options: DENY`)", "`Content-Security-Policy: frame-ancestors 'none'` (or `X-Frame-Options: DENY`)"],
      ["`X-Content-Type-Options: nosniff`", "`X-Content-Type-Options: nosniff`"],
      ["`Referrer-Policy: no-referrer`", "`Referrer-Policy: no-referrer`"],
      ["`Cache-Control: no-store`", "`Cache-Control: no-store`"],
    ],
    a: [
      "clickjacking سایت شما را در iframe نامرئی قرار می‌دهد تا کاربر ناخواسته کلیک کند. `frame-ancestors` جایگزین مدرن `X-Frame-Options` است و تعیین می‌کند چه کسی می‌تواند صفحه را frame کند.",
      "Clickjacking embeds your site in an invisible iframe to trick clicks. `frame-ancestors` is the modern replacement for `X-Frame-Options`, controlling who may frame the page.",
    ],
  },
]);
