export type PlatformKey =
  | "spotify"
  | "soundcloud"
  | "appleMusic"
  | "youtube"
  | "instagram"
  | "tiktok";

export interface PlatformLink {
  key: PlatformKey;
  label: string;
  handle: string;
  url: string;
  color: string;
}

export const links: PlatformLink[] = [
  {
    key: "spotify",
    label: "Spotify",
    handle: "Lobus",
    url: "https://open.spotify.com/artist/1ac1KQ6uUiOnXTau8cfJeb?si=0Hy3ldmjT96lsFRW-ZfJQg",
    color: "#1DB954",
  },
  {
    key: "soundcloud",
    label: "SoundCloud",
    handle: "lobusmusic",
    url: "https://soundcloud.com/lobusmusic",
    color: "#FF5500",
  },
  {
    key: "appleMusic",
    label: "Apple Music",
    handle: "Lobus",
    url: "https://music.apple.com/us/artist/lobus/1701338823",
    color: "#FA57C1",
  },
  {
    key: "youtube",
    label: "YouTube",
    handle: "@Lobus",
    url: "https://www.youtube.com/@Lobus",
    color: "#FF0000",
  },
  {
    key: "instagram",
    label: "Instagram",
    handle: "@lobus.lobus.lobus.lobus",
    url: "https://www.instagram.com/lobus.lobus.lobus.lobus/",
    color: "#E1306C",
  },
  {
    key: "tiktok",
    label: "TikTok",
    handle: "@lobus.lobus.lobus.lobus",
    url: "https://www.tiktok.com/@lobus.lobus.lobus.lobus",
    color: "#00F2EA",
  },
];
