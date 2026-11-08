import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DevTier: Software Engineering Interview Questions",
    short_name: siteConfig.name,
    description:
      "Practice multiple-choice frontend, backend and system design interview questions from Junior to Senior.",
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: siteConfig.themeColor.dark,
    theme_color: siteConfig.themeColor.dark,
    categories: ["education", "developer"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
