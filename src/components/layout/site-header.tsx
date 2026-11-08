"use client";

import { useTranslations } from "next-intl";
import { Bookmark, MessageSquareText, Newspaper } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { SearchBar } from "@/components/search/search-bar";
import { Logo } from "@/components/brand/logo";

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const links = [
    { href: "/blog" as const, label: t("blog"), icon: Newspaper },
    { href: "/bookmarks" as const, label: t("bookmarks"), icon: Bookmark },
    { href: "/feedback" as const, label: t("feedback"), icon: MessageSquareText },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" aria-label="DevTier home">
            <Logo />
          </Link>
          <div className="flex items-center gap-1 sm:hidden">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <SearchBar />
        </div>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                pathname.startsWith(href) && "bg-muted text-foreground",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
          <LocaleSwitcher />
          <ThemeToggle />
        </nav>

        <nav className="flex gap-2 sm:hidden">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm",
                pathname.startsWith(href) && "bg-muted",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
