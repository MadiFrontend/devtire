import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Plus, Route, SignalHigh } from "lucide-react";
import { getTrackStats } from "@/data";
import { Link } from "@/i18n/navigation";
import { TrackCard } from "@/components/home/track-card";
import { SampleQuestion } from "@/components/home/sample-question";
import { Testimonials } from "@/components/home/testimonials";
import { PostCard } from "@/components/blog/post-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getPosts } from "@/lib/blog";
import { formatNumber } from "@/lib/format";
import { absoluteUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const steps = [
  { n: 1, icon: Route, gradient: "from-indigo-500 to-violet-500" },
  { n: 2, icon: SignalHigh, gradient: "from-emerald-500 to-teal-500" },
  { n: 3, icon: Lightbulb, gradient: "from-amber-500 to-orange-500" },
] as const;
const faqs = [1, 2, 3, 4, 5] as const;

function SectionHeading({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
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
  const questionTotal = liveTracks.reduce((sum, track) => sum + track.questionCount, 0);
  const posts = getPosts(loc).slice(0, 3);
  const Arrow = loc === "fa" ? ArrowLeft : ArrowRight;

  const heroStats = [
    { value: `${formatNumber(questionTotal, loc)}+`, label: t("statQuestions") },
    { value: formatNumber(liveTracks.length, loc), label: t("statTracks") },
    { value: formatNumber(3, loc), label: t("statLevels") },
    { value: formatNumber(2, loc), label: t("statLanguages") },
  ];

  return (
    <div className="space-y-24 sm:space-y-28">
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

      <section className="relative isolate -mt-2 overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-12 sm:px-12 sm:py-16 lg:py-20">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="pointer-events-none absolute -top-40 start-1/4 -z-10 size-[520px] rounded-full bg-accent/25 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-48 end-0 -z-10 size-[420px] rounded-full bg-fuchsia-500/15 blur-[120px]" />

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {t("heroBadge")}
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              {t("heroTitle")} <span className="text-gradient">{t("heroAccent")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              {t("sub")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#tracks"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40"
              >
                {t("ctaPractice")}
                <Arrow className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </a>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-5 py-3 text-sm font-semibold backdrop-blur transition-colors hover:border-accent/50 hover:text-accent"
              >
                <BookOpen className="size-4" />
                {t("ctaArticles")}
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border/60 pt-8 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl font-bold tracking-tight">{stat.value}</dd>
                  <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <SampleQuestion
            locale={loc}
            label={t("sampleLabel")}
            correctLabel={t("sampleCorrect")}
            levelLabel={tLevels("junior")}
          />
        </div>
      </section>

      <section id="tracks" className="scroll-mt-24">
        <SectionHeading title={t("tracks")} sub={t("tracksSub")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              questionCount={track.questionCount}
              categoryCount={track.categoryCount}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          title={t("howTitle")}
          sub={t("aboutText", { questions: questionTotal, tracks: liveTracks.length })}
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map(({ n, icon: Icon, gradient }) => (
            <li
              key={n}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
            >
              <span className="pointer-events-none absolute -top-6 end-2 font-display text-[7rem] font-black leading-none text-foreground/[0.04]">
                {formatNumber(n, loc)}
              </span>
              <span
                className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
              >
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{t(`step${n}Title`)}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{t(`step${n}Text`)}</p>
            </li>
          ))}
        </ol>
      </section>

      {posts.length > 0 && (
        <section>
          <SectionHeading
            title={t("blogTitle")}
            sub={t("blogSub")}
            action={
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                {t("blogAll")}
                <Arrow className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>
            }
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeading title={t("testimonialsTitle")} sub={t("testimonialsSub")} />
        <Testimonials locale={loc} />
      </section>

      <section className="mx-auto max-w-3xl">
        <SectionHeading title={t("faqTitle")} />
        <div className="space-y-3">
          {faqs.map((n) => (
            <details
              key={n}
              className="group rounded-2xl border border-border/70 bg-card px-5 transition-colors open:border-accent/40 open:bg-accent/[0.03]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
                {t(`faq${n}q`)}
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted transition-all group-open:rotate-45 group-open:bg-accent group-open:text-accent-foreground">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="pb-5 text-sm leading-7 text-muted-foreground">{t(`faq${n}a`)}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-14 text-center text-white sm:px-12">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{t("ctaTitle")}</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">{t("ctaText")}</p>
        <a
          href="#tracks"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-xl transition-transform hover:-translate-y-0.5"
        >
          {t("ctaPractice")}
          <Arrow className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </a>
      </section>
    </div>
  );
}
