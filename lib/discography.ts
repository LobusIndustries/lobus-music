export interface Release {
  title: string;
  slug: string;
  type: "Album" | "EP" | "Single";
  year: string;
  url: string;
  presave?: boolean;
  presaveLabel?: string;
  /** Full lyrics, plain text with line breaks. Added per-song as available. */
  lyrics?: string;
}

// Sourced from https://open.spotify.com/artist/1ac1KQ6uUiOnXTau8cfJeb, keep in
// sync with the artist page if new releases drop.
export const discography: Release[] = [
  {
    title: "Fucked Up With The Flu",
    slug: "fucked-up-with-the-flu",
    type: "Single",
    year: "2026",
    url: "https://distrokid.com/hyperfollow/lobus1/fucked-up-with-the-flu",
    presave: true,
    presaveLabel: "Aug 31",
  },
  {
    title: "Nevermore",
    slug: "nevermore",
    type: "Single",
    year: "2026",
    url: "https://open.spotify.com/album/0YSYezpAEF9lwNbjX9clHv",
  },
  {
    title: "Fly Away",
    slug: "fly-away",
    type: "Single",
    year: "2025",
    url: "https://open.spotify.com/album/6oePThndVbG1jXPe76srqJ",
  },
  {
    title: "I Don't Wanna Go",
    slug: "i-dont-wanna-go",
    type: "Single",
    year: "2024",
    url: "https://open.spotify.com/album/4nVRjVragKa5d71JPzYkgT",
  },
  {
    title: "Heartbeat",
    slug: "heartbeat",
    type: "Single",
    year: "2023",
    url: "https://open.spotify.com/album/2aACz6FZHcZbFbE4LBV8c4",
  },
  {
    title: "Shitty Summer",
    slug: "shitty-summer",
    type: "EP",
    year: "2023",
    url: "https://open.spotify.com/album/4uykhlJd6KFds8lPDc5Fn9",
  },
  {
    title: "Last Night",
    slug: "last-night",
    type: "Single",
    year: "2023",
    url: "https://open.spotify.com/album/0uaTveG96x8EJXttdwTsN7",
  },
  {
    title: "I Hate",
    slug: "i-hate",
    type: "Single",
    year: "2023",
    url: "https://open.spotify.com/album/69FPResKs4jb9D0i6J7zUA",
  },
  {
    title: "Love My Pain",
    slug: "love-my-pain",
    type: "Single",
    year: "2023",
    url: "https://open.spotify.com/album/4WG0cQ2dv5pOnlo0Tw8kvx",
  },
  {
    title: "Stranger",
    slug: "stranger",
    type: "Single",
    year: "2023",
    url: "https://open.spotify.com/album/0xdz0OqHxPqGqxlPTneuMD",
  },
];

export function getReleaseBySlug(slug: string): Release | undefined {
  return discography.find((r) => r.slug === slug);
}

export function getSpotifyAlbumId(url: string): string | null {
  const match = url.match(/open\.spotify\.com\/album\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}
