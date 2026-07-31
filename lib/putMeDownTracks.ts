export interface EpTrack {
  title: string;
  slug: string;
  spotifyTrackId: string;
  feature?: string;
  youtubeId?: string;
  /** Full lyrics, plain text with line breaks. Added per-track as available. */
  lyrics?: string;
}

// Sourced from the "Put Me Down" EP on Spotify (open.spotify.com/album/0NNm0YbMaktmb4C0zvdhKy).
export const putMeDownTracks: EpTrack[] = [
  {
    title: "Goth Princess",
    slug: "goth-princess",
    spotifyTrackId: "66jf05RchpRyn7qXVi0H9V",
    feature: "Lil Rav",
  },
  {
    title: "Long Hair Black Lungs",
    slug: "long-hair-black-lungs",
    spotifyTrackId: "5jr3EP8f9EJ8tK5BOhkoWE",
    feature: "Lil Rav",
  },
  {
    title: "Die Slowly",
    slug: "die-slowly",
    spotifyTrackId: "10HFdPFNccOJfNEHy9WBYU",
    feature: "Lil Rav",
  },
  {
    title: "Life Is Short",
    slug: "life-is-short",
    spotifyTrackId: "4s0CAS9KYO9rFo1OFdFjpn",
    feature: "Lil Rav",
  },
];

export function getTrackBySlug(slug: string): EpTrack | undefined {
  return putMeDownTracks.find((t) => t.slug === slug);
}
