import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/config";

/** robots.txt (spec §72 SEO checklist). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
