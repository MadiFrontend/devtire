import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BookOpenCheck,
  CheckCircle2,
  Compass,
  Flame,
  Globe2,
  HelpCircle,
  Languages,
  Lightbulb,
  MessageSquareText,
  Plus,
  Route,
  ShieldCheck,
  SignalHigh,
  Sparkles,
  Zap,
} from "lucide-react";
import { getCategory, getLevelCounts, getTrackStats } from "@/data";
import { Link } from "@/i18n/navigation";
import { TrackCard } from "@/components/home/track-card";
import { CategoryIcon } from "@/components/home/category-icon";
import { SampleQuestion } from "@/components/home/sample-question";
import { Testimonials } from "@/components/home/testimonials";
import { PostCard } from "@/components/blog/post-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getPosts } from "@/lib/blog";
import { formatNumber } from "@/lib/format";
import { absoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const steps = [
  { n: 1, icon: Route, gradient: "from-indigo-500 to-violet-600" },
  { n: 2, icon: SignalHigh, gradient: "from-emerald-500 to-teal-600" },
  { n: 3, icon: Lightbulb, gradient: "from-amber-500 to-orange-600" },
] as const;

const faqs = [1, 2, 3, 4, 5] as const;

const POPULAR_CATEGORY_IDS = [
  "javascript",
  "react",
  "typescript",
  "nextjs",
  "nodejs",
  "databases",
  "scalability",
  "complexity",
] as const;

function SectionHeading({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  sub,
  action,
}: {
  eyebrow?: string;
  eyebrowIcon?: typeof Sparkles;
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {EyebrowIcon && <EyebrowIcon className="size-3.5" />}
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[2rem]">
          {title}
        </h2>
        {sub && (
          <p className="mt-2.5 text-sm leading-7 text-muted-foreground sm:text-base">
            {sub}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tLevels = await getTranslations("levels");
  const stats = getTrackStats();
  const loc = locale as Locale;

  const liveTracks = stats.filter((track) => track.status === "live");
  const soonTracks = stats.filter((track) => track.status === "soon");
  const questionTotal = liveTracks.reduce((sum, track) => sum + track.questionCount, 0);

  const popularTopics = POPULAR_CATEGORY_IDS.map((id) => {
    const category = getCategory(id);
    if (!category) return null;
    const counts = getLevelCounts(id);
    return { category, total: counts.total };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  const posts = getPosts(loc).slice(0, 3);
  const [featuredPost, ...otherPosts] = posts;
  const Arrow = loc === "fa" ? ArrowLeft : ArrowRight;

  const heroStats = [
    {
      value: `${formatNumber(questionTotal, loc)}+`,
      label: t("statQuestions"),
      icon: Sparkles,
      color: "text-indigo-500 bg-indigo-500/10",
    },
    {
      value: formatNumber(liveTracks.length, loc),
      label: t("statTracks"),
      icon: Compass,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      value: formatNumber(3, loc),
      label: t("statLevels"),
      icon: SignalHigh,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      value: formatNumber(2, loc),
      label: t("statLanguages"),
      icon: Globe2,
      color: "text-fuchsia-500 bg-fuchsia-500/10",
    },
  ];

  const features = [
    { icon: Zap, title: t("feature1Title"), text: t("feature1Text"), tint: "text-amber-500 bg-amber-500/10" },
    { icon: BookOpenCheck, title: t("feature2Title"), text: t("feature2Text"), tint: "text-indigo-500 bg-indigo-500/10" },
    { icon: ShieldCheck, title: t("feature3Title"), text: t("feature3Text"), tint: "text-emerald-500 bg-emerald-500/10" },
    { icon: Languages, title: t("feature4Title"), text: t("feature4Text"), tint: "text-fuchsia-500 bg-fuchsia-500/10" },
  ];

  return (
    <div className="space-y-20 sm:space-y-28">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ItemList",
              name: t("tracks"),
              itemListElement: liveTracks.map((track, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: track.name[loc],
                url: absoluteUrl(`/${locale}/${track.id}`),
              })),
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((n) => ({
                "@type": "Question",
                name: t(`faq${n}q`),
                acceptedAnswer: { "@type": "Answer", text: t(`faq${n}a`) },
              })),
            },
          ],
        }}
      />

      {/* HERO SECTION */}
      <section className="bg-hero-mesh relative isolate -mt-2 overflow-hidden rounded-[2rem] border border-border/75 bg-card p-5 shadow-xl shadow-foreground/[0.03] sm:p-10 lg:p-12 dark:border-white/10 dark:shadow-none">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="pointer-events-none absolute -top-44 start-1/4 -z-10 size-[500px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-48 end-0 -z-10 size-[420px] rounded-full bg-fuchsia-500/15 blur-[120px]" />

        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <div className="min-w-0">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent backdrop-blur-sm">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-65" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="truncate">{t("heroBadge")}</span>
            </div>

            <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.22] tracking-tight sm:text-5xl sm:leading-[1.15] lg:text-[3.35rem]">
              {t("heroTitle")}{" "}
              <span className="text-gradient inline-block">{t("heroAccent")}</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
              {t("sub")}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#tracks"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-right hover:shadow-xl hover:shadow-indigo-500/40"
              >
                {t("ctaPractice")}
                <Arrow className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </a>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/80 bg-background/75 px-6 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-background hover:text-accent"
              >
                <BookOpen className="size-4" />
                {t("ctaArticles")}
              </Link>
            </div>

            {/* Quick Track Jump Chips */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                {t("quickJumpLabel")}
              </span>
              {liveTracks.map((track) => (
                <Link
                  key={track.id}
                  href={`/${track.id}` as "/"}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/75 bg-background/70 px-3 py-1 text-xs font-medium text-foreground/90 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: track.color }}
                  />
                  <span>{track.name[loc]}</span>
                  <span className="text-muted-foreground">
                    ({formatNumber(track.questionCount, loc)})
                  </span>
                </Link>
              ))}
            </div>

            {/* Bento Stat Cards */}
            <dl className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:grid-cols-4 sm:gap-3">
              {heroStats.map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border/70 bg-background/65 p-3.5 backdrop-blur-sm transition-colors hover:border-border"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <dd className="font-display text-2xl font-extrabold tracking-tight tabular-nums sm:text-[1.65rem]">
                        {stat.value}
                      </dd>
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-xl",
                          stat.color,
                        )}
                      >
                        <StatIcon className="size-4" />
                      </span>
                    </div>
                    <dt className="mt-1 text-xs font-medium text-muted-foreground">
                      {stat.label}
                    </dt>
                  </div>
                );
              })}
            </dl>
          </div>

          <SampleQuestion locale={loc} />
        </div>
      </section>

      {/* TRACKS SHOWCASE */}
      <section id="tracks" className="scroll-mt-24 space-y-12">
        <div>
          <SectionHeading
            eyebrow={t("tracksEyebrow")}
            eyebrowIcon={Compass}
            title={t("tracks")}
            sub={t("tracksSub")}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {liveTracks.map((track, idx) => (
              <div
                key={track.id}
                className={cn(
                  liveTracks.length === 3 && idx === 2 && "md:col-span-2 lg:col-span-1",
                )}
              >
                <TrackCard
                  track={track}
                  questionCount={track.questionCount}
                  categoryCount={track.categoryCount}
                  levels={track.levels}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Popular Topics Quick Grid */}
        {popularTopics.length > 0 && (
          <div className="rounded-3xl border border-border/70 bg-card/60 p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                  <Flame className="size-3.5" />
                  {t("popularTopicsEyebrow")}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold tracking-tight sm:text-xl">
                  {t("popularTopicsTitle")}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {t("popularTopicsSub")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3">
              {popularTopics.map(({ category, total }) => (
                <Link
                  key={category.id}
                  href={`/${category.track}/${category.id}` as "/"}
                  className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-card hover:shadow-md hover:shadow-accent/5"
                >
                  <CategoryIcon
                    name={category.icon}
                    color={category.color}
                    className="size-10 shrink-0 rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold transition-colors group-hover:text-accent">
                      {category.name[loc]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(total, loc)} {t("questions")}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Roadmap */}
        {soonTracks.length > 0 && (
          <div>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-bold tracking-tight text-foreground/90">
                {t("roadmapTitle")}
              </h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {t("roadmapSub")}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {soonTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  questionCount={track.questionCount}
                  categoryCount={track.categoryCount}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* HOW IT WORKS & WHY DEVTIER */}
      <section className="space-y-6">
        <SectionHeading
          eyebrow={t("howEyebrow")}
          eyebrowIcon={Route}
          title={t("howTitle")}
          sub={t("aboutText", { questions: formatNumber(questionTotal, loc), tracks: formatNumber(liveTracks.length, loc) })}
        />

        <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map(({ n, icon: Icon, gradient }) => (
            <li
              key={n}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/75 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span className="rounded-full border border-border/80 bg-muted/60 px-3 py-1 font-mono text-xs font-bold text-muted-foreground">
                    {`${formatNumber(0, loc)}${formatNumber(n, loc)}`}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold tracking-tight sm:text-xl">
                  {t(`step${n}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {t(`step${n}Text`)}
                </p>
              </div>

              {/* Micro UI Decoration per Step */}
              <div className="mt-6 border-t border-border/60 pt-4">
                {n === 1 && (
                  <div className="flex flex-wrap gap-1.5">
                    {liveTracks.map((tr) => (
                      <span
                        key={tr.id}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-2.5 py-1 text-[11px] font-medium"
                      >
                        <span
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: tr.color }}
                        />
                        {tr.name[loc]}
                      </span>
                    ))}
                  </div>
                )}
                {n === 2 && (
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
                    <span className="rounded-lg bg-emerald-500/12 px-2.5 py-1 text-emerald-700 dark:text-emerald-300">
                      {tLevels("junior")}
                    </span>
                    <Arrow className="size-3 text-muted-foreground" />
                    <span className="rounded-lg bg-sky-500/12 px-2.5 py-1 text-sky-700 dark:text-sky-300">
                      {tLevels("middle")}
                    </span>
                    <Arrow className="size-3 text-muted-foreground" />
                    <span className="rounded-lg bg-amber-500/12 px-2.5 py-1 text-amber-700 dark:text-amber-300">
                      {tLevels("senior")}
                    </span>
                  </div>
                )}
                {n === 3 && (
                  <div className="flex items-center gap-2.5">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-3.5" />
                      {formatNumber(75, loc)}%
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* Feature Highlights Bento Strip */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: FIcon, title, text, tint }) => (
            <div
              key={title}
              className="rounded-2xl border border-border/70 bg-card/75 p-5 transition-colors hover:border-border"
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-xl",
                  tint,
                )}
              >
                <FIcon className="size-5" />
              </span>
              <h3 className="mt-3.5 font-display text-sm font-bold tracking-tight sm:text-base">
                {title}
              </h3>
              <p className="mt-1.5 text-xs leading-6 text-muted-foreground sm:text-[13px]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL BLOG GUIDES */}
      {featuredPost && (
        <section>
          <SectionHeading
            eyebrow={t("blogEyebrow")}
            eyebrowIcon={BookOpen}
            title={t("blogTitle")}
            sub={t("blogSub")}
            action={
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
              >
                {t("blogAll")}
                <Arrow className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>
            }
          />

          <div className="space-y-5">
            <PostCard post={featuredPost} featured />
            {otherPosts.length > 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {otherPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* DEVELOPER TESTIMONIALS */}
      <section>
        <SectionHeading
          eyebrow={t("testimonialsEyebrow")}
          eyebrowIcon={Sparkles}
          title={t("testimonialsTitle")}
          sub={t("testimonialsSub")}
        />
        <Testimonials locale={loc} />
      </section>

      {/* SPLIT FAQ SECTION */}
      <section className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.35fr] lg:gap-12">
        <div className="lg:sticky lg:top-24">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <HelpCircle className="size-3.5" />
            {t("faqEyebrow")}
          </p>
          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t("faqTitle")}
          </h2>
          <p className="mt-2.5 text-sm leading-7 text-muted-foreground sm:text-base">
            {t("faqSub")}
          </p>

          <div className="mt-6 rounded-2xl border border-border/75 bg-card p-5">
            <h3 className="font-display text-sm font-bold sm:text-base">
              {t("faqContactTitle")}
            </h3>
            <p className="mt-1.5 text-xs leading-6 text-muted-foreground sm:text-sm">
              {t("faqContactText")}
            </p>
            <Link
              href="/feedback"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground sm:text-sm"
            >
              <MessageSquareText className="size-4" />
              {t("faqContactCta")}
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((n) => (
            <details
              key={n}
              className="group rounded-2xl border border-border/75 bg-card px-5 transition-all open:border-accent/45 open:bg-accent/[0.03] open:shadow-lg open:shadow-accent/5 sm:px-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold sm:py-5 sm:text-base [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted font-mono text-xs font-bold text-muted-foreground transition-colors group-open:bg-accent/15 group-open:text-accent">
                    {`${formatNumber(0, loc)}${formatNumber(n, loc)}`}
                  </span>
                  <span>{t(`faq${n}q`)}</span>
                </span>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted transition-all duration-200 group-open:rotate-45 group-open:bg-accent group-open:text-accent-foreground">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="pb-5 text-sm leading-7 text-muted-foreground sm:ps-10">
                {t(`faq${n}a`)}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* IMMERSIVE FINAL CTA */}
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 px-6 py-14 text-center text-white shadow-2xl shadow-indigo-950/25 ring-1 ring-white/10 sm:px-12 sm:py-18">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-indigo-500/35 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-32 end-10 -z-10 size-80 rounded-full bg-fuchsia-500/25 blur-[100px]" />

        <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold text-indigo-200 backdrop-blur-sm">
          <Sparkles className="size-3.5" />
          {t("ctaBadge")}
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl font-display text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.6rem]">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-indigo-100/80 sm:text-base">
          {t("ctaText")}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#tracks"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-950 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-indigo-50 sm:w-auto"
          >
            {t("ctaPractice")}
            <Arrow className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </a>
          <Link
            href="/blog"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 sm:w-auto"
          >
            <BookOpen className="size-4" />
            {t("ctaArticles")}
          </Link>
        </div>
      </section>
    </div>
  );
}
