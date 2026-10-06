import type { Metadata } from "next";
import { company } from "@/content/company";

/** Base site URL — override via NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";

/** Homepage title/description (spec §50). */
export const defaultTitle = `${company.name} | Aircraft Parts, Global Sourcing & Procurement`;
export const defaultDescription =
  "Northbridge Global Resources provides aviation parts sourcing, procurement, and supply-chain solutions to customers across global markets.";

/** Build page metadata with sensible OG/Twitter defaults (spec §50, §72). */
export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: company.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
