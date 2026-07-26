import { links } from "@/lib/links";

export default function StructuredData() {
  const musicGroup = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Lobus",
    alternateName: "LOBUS",
    url: "https://lobus-music.vercel.app",
    genre: ["Electronic", "Hip Hop", "Alternative"],
    sameAs: links.map((l) => l.url),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LOBUS",
    url: "https://lobus-music.vercel.app",
    description:
      "Official site for LOBUS — stream music, watch videos, and follow on social media.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroup) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
