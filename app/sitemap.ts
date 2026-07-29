import type { MetadataRoute } from "next";
import { discography } from "@/lib/discography";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://lobusmusic.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://lobusmusic.com/#links",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...discography.map((release) => ({
      url: `https://lobusmusic.com/songs/${release.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
