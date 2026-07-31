export interface EpTrack {
  title: string;
  slug: string;
  spotifyTrackId: string;
  feature?: string;
  youtubeId?: string;
  /** Full lyrics, plain text with line breaks. Added per-track as available. */
  lyrics?: string;
}

// Sourced from the "Shitty Summer" EP on Spotify (open.spotify.com/album/4uykhlJd6KFds8lPDc5Fn9).
export const shittySummerTracks: EpTrack[] = [
  {
    title: "Overthinking",
    slug: "overthinking",
    spotifyTrackId: "4XgBi7xQJ0WlR5JTtle5E2",
    feature: "Lil Rav",
  },
  {
    title: "House In The Woods",
    slug: "house-in-the-woods",
    spotifyTrackId: "4Y254OrDpAQdmqAGPHivm6",
    feature: "Lil Rav",
    youtubeId: "HETd3-Fmm_w",
  },
  {
    title: "Lost Souls",
    slug: "lost-souls",
    spotifyTrackId: "1mOQpITHpPPFKVvGKTNggv",
    feature: "Lil Rav",
  },
  {
    title: "Mirror",
    slug: "mirror",
    spotifyTrackId: "6ppPMQ9JppH21OoMPDxQGW",
    feature: "Lil Rav",
  },
  {
    title: "Just For Once",
    slug: "just-for-once",
    spotifyTrackId: "5UUvwl4fK6C1evk2405ynE",
    feature: "Lil Rav",
    youtubeId: "USUE_2hjae4",
  },
];

export function getTrackBySlug(slug: string): EpTrack | undefined {
  return shittySummerTracks.find((t) => t.slug === slug);
}
