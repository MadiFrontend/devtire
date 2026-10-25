import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
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
    <div lang={locale} dir={dir} style={fontVars} className="flex min-h-screen flex-col">
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-10">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </NextIntlClientProvider>
    </div>
  );
}
