export const siteConfig = {
  name: "DevTier",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://devtire.vercel.app").replace(/\/$/, ""),
  author: {
    name: "Mahdi Hosseini",
    role: "Software Engineer",
    url: "https://mahdihosseini.site",
    github: "https://github.com/MadiFrontend",
    image: "/authors/mahdi-hosseini.webp",
  },
  themeColor: {
    light: "#f4f6fb",
    dark: "#0b0f19",
  },
  accent: "#4f46e5",
} as const;

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path}`;
}
