import { company } from "@/content/company";
import { capabilities } from "@/content/services";
import { siteUrl, defaultDescription } from "./config";

/**
 * Structured data (spec §51). Only Organization / WebSite / Service /
 * BreadcrumbList are emitted. No review, rating, award or customer-count schema
 * is added (spec §51 forbids fake credibility markup).
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
    description: defaultDescription,
    // Contact points intentionally omitted until client-confirmed.
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: siteUrl,
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteUrl}${path}`,
    provider: { "@type": "Organization", name: company.name, url: siteUrl },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function allServicesSchema() {
  return capabilities.map((c) => serviceSchema(c.title, c.short, c.href));
}

/** Helper to render a JSON-LD script tag payload. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data) };
}
