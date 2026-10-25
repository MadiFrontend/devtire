"use client";

import { useTranslations } from "next-intl";
import { Bookmark, MessageSquareText } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { SearchBar } from "@/components/search/search-bar";

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const links = [
    { href: "/bookmarks" as const, label: t("bookmarks"), icon: Bookmark },
    { href: "/feedback" as const, label: t("feedback"), icon: MessageSquareText },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-accent-foreground shadow-sm transition group-hover:scale-105">
              FE
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Interview
            </span>
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
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
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
