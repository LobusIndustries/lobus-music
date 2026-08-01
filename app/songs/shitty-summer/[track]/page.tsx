import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReleaseBySlug } from "@/lib/discography";
import { shittySummerTracks, getTrackBySlug } from "@/lib/shittySummerTracks";
import Reveal from "@/app/components/Reveal";
import LinksGrid from "@/app/components/LinksGrid";

const EP_SLUG = "shitty-summer";

export function generateStaticParams() {
  return shittySummerTracks.map((track) => ({ track: track.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const { track: trackSlug } = await params;
  const track = getTrackBySlug(trackSlug);
  if (!track) return {};

  const description = `"${track.title}"${
    track.feature ? ` (feat. ${track.feature})` : ""
  } by LOBUS, from the "Shitty Summer" EP (2023). Stream now.`;

  return {
    title: track.title,
    description,
    alternates: {
      canonical: `https://lobusmusic.com/songs/${EP_SLUG}/${track.slug}`,
    },
    openGraph: {
      title: `${track.title} · LOBUS`,
      description,
      type: "music.song",
      url: `https://lobusmusic.com/songs/${EP_SLUG}/${track.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${track.title} · LOBUS`,
      description,
    },
  };
}

export default async function EpTrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track: trackSlug } = await params;
  const track = getTrackBySlug(trackSlug);
  if (!track) notFound();

  const ep = getReleaseBySlug(EP_SLUG);

  const musicRecording = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: track.title,
    byArtist: {
      "@type": "MusicGroup",
      name: "Lobus",
      url: "https://lobusmusic.com",
    },
    inAlbum: {
      "@type": "MusicAlbum",
      name: "Shitty Summer",
      url: `https://lobusmusic.com/songs/${EP_SLUG}`,
    },
    datePublished: ep?.year,
    url: `https://lobusmusic.com/songs/${EP_SLUG}/${track.slug}`,
    ...(ep?.coverArt
      ? { image: `https://lobusmusic.com${ep.coverArt}` }
      : {}),
    ...(track.lyrics
      ? {
          recordingOf: {
            "@type": "MusicComposition",
            name: track.title,
            lyrics: {
              "@type": "CreativeWork",
              text: track.lyrics,
            },
          },
        }
      : {}),
  };

  const videoObject = track.youtubeId
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: `${track.title} (Official Music Video)`,
        description: `Official music video for "${track.title}" by LOBUS.`,
        thumbnailUrl: `https://i.ytimg.com/vi/${track.youtubeId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${track.youtubeId}`,
        uploadDate: track.videoUploadDate,
      }
    : null;

  return (
    <main className="relative z-10 flex flex-1 flex-col items-center px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicRecording) }}
      />
      {videoObject && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObject) }}
        />
      )}

      <div className="w-full max-w-2xl">
        <Reveal>
          <Link
            href={`/songs/${EP_SLUG}`}
            className="mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]"
          >
            &larr; Shitty Summer
          </Link>
        </Reveal>

        {ep?.coverArt && (
          <Reveal delay={40}>
            <Image
              src={ep.coverArt}
              alt={`${track.title} cover art`}
              width={300}
              height={300}
              priority
              className="mb-8 aspect-square w-full max-w-[280px] rounded-2xl object-cover shadow-2xl shadow-black/60"
            />
          </Reveal>
        )}

        <Reveal delay={80}>
          <h1 className="text-[clamp(2.5rem,9vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-white mix-blend-difference">
            {track.title}
          </h1>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-white/50 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
              From Shitty Summer &middot; {ep?.year}
              {track.feature ? ` · feat. ${track.feature}` : ""}
            </span>
          </div>
        </Reveal>

        <Reveal delay={220} className="mt-10">
          <a
            href={`https://open.spotify.com/track/${track.spotifyTrackId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
          >
            Listen Now
            <span aria-hidden="true">&rarr;</span>
          </a>
        </Reveal>

        <Reveal delay={280} className="mt-8 overflow-hidden rounded-2xl">
          <iframe
            title={`${track.title} on Spotify`}
            src={`https://open.spotify.com/embed/track/${track.spotifyTrackId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            style={{ border: 0 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </Reveal>

        {track.youtubeId && (
          <Reveal delay={290} className="mt-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/40 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
              Music Video
            </h2>
            <div className="aspect-video overflow-hidden rounded-2xl">
              <iframe
                title={`${track.title} (Official Music Video)`}
                src={`https://www.youtube.com/embed/${track.youtubeId}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </Reveal>
        )}

        {track.lyrics && (
          <Reveal delay={320} className="mt-16">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/40 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
              Lyrics
            </h2>
            <p className="whitespace-pre-line text-lg leading-relaxed text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
              {track.lyrics}
            </p>
          </Reveal>
        )}

        <Reveal delay={380} className="mt-20">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/40 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
            Follow LOBUS
          </h2>
          <LinksGrid />
        </Reveal>
      </div>
    </main>
  );
}
