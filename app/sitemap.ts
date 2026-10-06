import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/config";

/** XML sitemap (spec §72 SEO checklist). */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/team",
    "/services",
    "/services/aircraft-acquisition-sales",
    "/services/aircraft-leasing",
    "/services/engines-parts",
    "/services/aviation-consultancy",
    "/aog-support",
    "/request-rfq",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const now = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
