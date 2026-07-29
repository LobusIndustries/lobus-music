import { discography } from "./discography";
import { genres, comparableArtists, soundDescription } from "./artistInfo";
import { links } from "./links";

export interface FaqItem {
  question: string;
  answer: string;
}

const newestRelease = discography[0];
const streamingPlatforms = links
  .filter((l) => l.key !== "instagram" && l.key !== "tiktok")
  .map((l) => l.label)
  .join(", ");

const newestReleaseAnswer = newestRelease.presave
  ? `"${newestRelease.title}" is Lobus's next release, out ${newestRelease.presaveLabel}. Presave it now on all platforms.`
  : `"${newestRelease.title}" (${newestRelease.year}) is Lobus's latest release, available to stream now.`;

export const faqItems: FaqItem[] = [
  {
    question: "Who is Lobus?",
    answer: `Lobus is a music artist making ${soundDescription}`,
  },
  {
    question: "What genre is Lobus?",
    answer: `${genres.join(", ")} — for fans of ${comparableArtists.join(" and ")}.`,
  },
  {
    question: "Where can I stream Lobus?",
    answer: `Lobus is available on ${streamingPlatforms}, with full discography and links at lobusmusic.com.`,
  },
  {
    question: "What is Lobus's newest song?",
    answer: newestReleaseAnswer,
  },
];
