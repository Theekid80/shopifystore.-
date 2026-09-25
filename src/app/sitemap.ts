import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { pages } from "@/config/policies";
import { productHref, products } from "@/config/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/shop"), changeFrequency: "weekly", priority: 0.8 },
    ...products.map((p) => ({
      url: url(productHref(p)),
      changeFrequency: "weekly" as const,
      priority: p.kind === "system" ? 0.9 : 0.6,
    })),
    ...Object.keys(pages)
      .filter((slug) => slug !== "account")
      .map((slug) => ({ url: url(`/pages/${slug}`), changeFrequency: "monthly" as const, priority: 0.3 })),
  ];
}
