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
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-2.5 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" aria-label="DevTier home" className="transition-opacity hover:opacity-90">
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
                "inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground",
                pathname.startsWith(href) && "bg-accent/10 text-accent hover:bg-accent/15 hover:text-accent",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
          <div className="ms-1 flex items-center gap-0.5 border-s border-border/60 ps-2">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </nav>

        <nav className="grid grid-cols-3 gap-1.5 sm:hidden">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-card/60 px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname.startsWith(href) && "border-accent/40 bg-accent/10 text-accent",
              )}
            >
              <Icon className="size-3.5 shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
