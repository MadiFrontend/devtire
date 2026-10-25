import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// "system-design" is also a track id, so only its level pages are redirected.
const legacyFrontendCategories =
  "html-css|javascript|typescript|react|state-management|nextjs|design-patterns";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: `/:locale(en|fa)/:category(${legacyFrontendCategories})/:rest*`,
        destination: "/:locale/frontend/:category/:rest*",
        permanent: true,
      },
      {
        source: "/:locale(en|fa)/system-design/:level(junior|middle|senior)",
        destination: "/:locale/frontend/system-design/:level",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
