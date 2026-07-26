import { links } from "@/lib/links";
import { discography } from "@/lib/discography";

export default function StructuredData() {
  const releases = discography.filter((r) => !r.presave);

  const musicGroup = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Lobus",
    alternateName: "LOBUS",
    url: "https://lobus-music.vercel.app",
    genre: ["Electronic", "Hip Hop", "Alternative"],
    sameAs: links.map((l) => l.url),
    album: releases.map((r) => ({
      "@type": "MusicAlbum",
      name: r.title,
      datePublished: r.year,
      url: r.url,
    })),
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
