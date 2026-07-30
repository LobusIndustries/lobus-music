import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  discography,
  getReleaseBySlug,
  getSpotifyAlbumId,
} from "@/lib/discography";
import Reveal from "@/app/components/Reveal";
import LinksGrid from "@/app/components/LinksGrid";

export function generateStaticParams() {
  return discography.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) return {};

  const description = release.presave
    ? `"${release.title}" by LOBUS. Releasing ${release.presaveLabel}. Presave now.`
    : release.lyrics
      ? `${release.title} by LOBUS. Lyrics, and where to stream (${release.type}, ${release.year}).`
      : `${release.title} by LOBUS. ${release.type}, ${release.year}. Stream now.`;

  return {
    title: release.title,
    description,
    alternates: {
      canonical: `https://lobusmusic.com/songs/${release.slug}`,
    },
    openGraph: {
      title: `${release.title} · LOBUS`,
      description,
      type: "music.song",
      url: `https://lobusmusic.com/songs/${release.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${release.title} · LOBUS`,
      description,
    },
  };
}

export default async function SongPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) notFound();

  const spotifyId = getSpotifyAlbumId(release.url);

  const musicRecording = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: release.title,
    byArtist: {
      "@type": "MusicGroup",
      name: "Lobus",
      url: "https://lobusmusic.com",
    },
    datePublished: release.year,
    url: `https://lobusmusic.com/songs/${release.slug}`,
    ...(release.coverArt
      ? { image: `https://lobusmusic.com${release.coverArt}` }
      : {}),
    ...(release.lyrics
      ? {
          recordingOf: {
            "@type": "MusicComposition",
            name: release.title,
            lyrics: {
              "@type": "CreativeWork",
              text: release.lyrics,
            },
          },
        }
      : {}),
  };

  return (
    <main className="relative z-10 flex flex-1 flex-col items-center px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicRecording) }}
      />

      <div className="w-full max-w-2xl">
        <Reveal>
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            &larr; LOBUS
          </Link>
        </Reveal>

        {release.coverArt && (
          <Reveal delay={40}>
            <Image
              src={release.coverArt}
              alt={`${release.title} cover art`}
              width={300}
              height={300}
              priority
              className="mb-8 aspect-square w-full max-w-[280px] rounded-2xl object-cover shadow-2xl shadow-black/60"
            />
          </Reveal>
        )}

        <Reveal delay={80}>
          <h1 className="text-[clamp(2.5rem,9vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-white mix-blend-difference">
            {release.title}
          </h1>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-4 flex items-center gap-3">
            {release.presave ? (
              <span className="flex items-center gap-2 rounded-full border border-[#ff2e63]/50 bg-[#ff2e63]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#ff2e63]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff2e63]" />
                Presave &middot; {release.presaveLabel}
              </span>
            ) : (
              <span className="text-sm text-white/50">
                {release.type} &middot; {release.year}
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={220} className="mt-10">
          <a
            href={release.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
          >
            {release.presave ? "Presave Now" : "Listen Now"}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </Reveal>

        {spotifyId && !release.presave && (
          <Reveal delay={280} className="mt-8 overflow-hidden rounded-2xl">
            <iframe
              title={`${release.title} on Spotify`}
              src={`https://open.spotify.com/embed/album/${spotifyId}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              style={{ border: 0 }}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </Reveal>
        )}

        {release.lyrics && (
          <Reveal delay={320} className="mt-16">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/40">
              Lyrics
            </h2>
            <p className="whitespace-pre-line text-lg leading-relaxed text-white/80">
              {release.lyrics}
            </p>
          </Reveal>
        )}

        <Reveal delay={380} className="mt-20">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/40">
            Follow LOBUS
          </h2>
          <LinksGrid />
        </Reveal>
      </div>
    </main>
  );
}
