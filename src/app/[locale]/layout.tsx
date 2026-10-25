import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono, Vazirmatn } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.themeColor.dark },
  ],
  colorScheme: "light dark",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    ...pageMetadata({ locale, path: "", description: t("description") }),
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s | ${siteConfig.name}`,
    },
    applicationName: siteConfig.name,
    keywords: t("keywords").split(",").map((k) => k.trim()),
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    category: "education",
    formatDetection: { email: false, address: false, telephone: false },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("meta");
  const dir = locale === "fa" ? "rtl" : "ltr";
  const fontVars =
    locale === "fa"
      ? {
          ["--font-body" as string]: "var(--font-vazirmatn)",
          ["--font-display" as string]: "var(--font-vazirmatn)",
        }
      : {
          ["--font-body" as string]: "var(--font-inter)",
          ["--font-display" as string]: "var(--font-inter)",
        };

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      style={fontVars}
      className={`${inter.variable} ${vazirmatn.variable} ${jetbrains.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${absoluteUrl()}/#website`,
                name: siteConfig.name,
                url: absoluteUrl(`/${locale}`),
                description: t("description"),
                inLanguage: locale as Locale,
                publisher: { "@id": `${absoluteUrl()}/#author` },
              },
              {
                "@type": "Person",
                "@id": `${absoluteUrl()}/#author`,
                name: siteConfig.author.name,
                url: siteConfig.author.url,
                sameAs: [siteConfig.author.url, siteConfig.author.github],
              },
            ],
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-10">
              {children}
            </main>
            <SiteFooter />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
