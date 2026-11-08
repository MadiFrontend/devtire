import { getCategoryStats, getTrackStats } from "@/data";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { getPosts } from "@/lib/blog";

export const dynamic = "force-static";

export function GET() {
  const liveTracks = getTrackStats().filter((track) => track.status === "live");
  const upcoming = getTrackStats().filter((track) => track.status === "soon");
  const total = liveTracks.reduce((sum, track) => sum + track.questionCount, 0);

  const sections = liveTracks.map((track) => {
    const topics = getCategoryStats(track.id)
      .map(
        (c) =>
          `- [${c.name.en}](${absoluteUrl(`/en/${track.id}/${c.id}`)}): ${c.description.en} (${c.counts.total} questions)`,
      )
      .join("\n");
    return `## ${track.name.en}\n\n${track.description.en}\n\n${topics}`;
  });

  const body = `# ${siteConfig.name}

> Free, bilingual (English and Persian) software engineering interview practice. ${total} multiple-choice questions across frontend, backend and system design, each at Junior, Middle and Senior level, with instant feedback and a full explanation for every answer. No account needed.

- English: ${absoluteUrl("/en")}
- Persian: ${absoluteUrl("/fa")}
- Practice URLs follow the pattern /{locale}/{track}/{topic}/{level}, e.g. ${absoluteUrl("/en/frontend/react/senior")}

${sections.join("\n\n")}

## Articles

${getPosts("en")
  .map((post) => `- [${post.title}](${absoluteUrl(`/en/blog/${post.slug}`)}): ${post.description}`)
  .join("\n")}

## Coming soon

${upcoming.map((track) => `- ${track.name.en}: ${track.description.en}`).join("\n")}

## Author

- [${siteConfig.author.name}](${siteConfig.author.url})
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
