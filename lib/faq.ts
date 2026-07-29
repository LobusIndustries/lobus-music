import { discography } from "./discography";
import { genreListNatural } from "./artistInfo";
import { links } from "./links";

export interface FaqItem {
  question: string;
  answer: string;
}

const releasedTracks = discography.filter((r) => !r.presave);
const newestRelease = discography[0];
const previousRelease = discography.find((r) => !r.presave);
const earliestYear = releasedTracks.reduce(
  (min, r) => (r.year < min ? r.year : min),
  releasedTracks[0].year
);
const releaseTitles = releasedTracks
  .slice(0, 3)
  .map((r) => `"${r.title}"`)
  .join(", ");

function naturalJoin(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

const streamingPlatforms = naturalJoin(
  links
    .filter((l) => l.key !== "instagram" && l.key !== "tiktok")
    .map((l) => l.label)
);
const socialPlatforms = naturalJoin(
  links
    .filter((l) => l.key === "instagram" || l.key === "tiktok")
    .map((l) => l.label)
);

const newestReleaseAnswer = newestRelease.presave
  ? `"${newestRelease.title}" is Lobus's next release, dropping ${newestRelease.presaveLabel}. Presave it now on Spotify, Apple Music, and every major platform so it's in your library the moment it's out. The most recent released track is "${previousRelease?.title}" (${previousRelease?.year}).`
  : `"${newestRelease.title}" (${newestRelease.year}) is Lobus's latest release, available to stream now on every platform.`;

export const faqItems: FaqItem[] = [
  {
    question: "Who is Lobus?",
    answer: `Lobus is an independent artist making ${genreListNatural} music. Since ${earliestYear}, Lobus has independently released ${releasedTracks.length} songs and EPs, including ${releaseTitles}, with new music on the way. Follow along on ${streamingPlatforms} to catch every release as it drops.`,
  },
  {
    question: "What genre is Lobus?",
    answer: `Lobus's music spans ${genreListNatural}, genres that share roots in guitar-driven, emotionally direct rock. The discography reflects that full range across ${releasedTracks.length} releases since ${earliestYear}.`,
  },
  {
    question: "Where can I stream Lobus?",
    answer: `Lobus is available on ${streamingPlatforms}. For behind-the-scenes updates and news on new music, follow along on ${socialPlatforms}. Every link and the full back catalog are on this page.`,
  },
  {
    question: "What is Lobus's newest song?",
    answer: newestReleaseAnswer,
  },
];
