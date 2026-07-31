import type { MetadataRoute } from "next";
import { discography } from "@/lib/discography";
import { blogPosts } from "@/lib/blog";
import { shittySummerTracks } from "@/lib/shittySummerTracks";
import { putMeDownTracks } from "@/lib/putMeDownTracks";

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
    ...shittySummerTracks.map((track) => ({
      url: `https://lobusmusic.com/songs/shitty-summer/${track.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...putMeDownTracks.map((track) => ({
      url: `https://lobusmusic.com/songs/put-me-down/${track.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    {
      url: "https://lobusmusic.com/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...blogPosts.map((post) => ({
      url: `https://lobusmusic.com/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
