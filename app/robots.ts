import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "Bytespider",
          "CCBot",
          "cohere-ai",
          "Meta-ExternalAgent",
          "FacebookBot",
          "DuckAssistBot",
          "YouBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://lobusmusic.com/sitemap.xml",
  };
}
