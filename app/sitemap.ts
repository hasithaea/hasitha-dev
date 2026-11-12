import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getTagPageSlugs } from "@/lib/skills";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projects
    .filter((p) => p.detail)
    .map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const skillPages = getTagPageSlugs().map((tag) => ({
    url: `${SITE_URL}/skills/${tag}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...projectPages,
    {
      url: `${SITE_URL}/certifications`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...skillPages,
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}