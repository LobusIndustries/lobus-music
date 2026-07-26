import type { PlatformKey } from "@/lib/links";

const paths: Record<PlatformKey, React.ReactNode> = {
  spotify: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M7 10.2c3-1 7-.6 9.4.9M7.3 13c2.4-.7 5.6-.5 7.7.7M7.6 15.6c2-.5 4.4-.4 6.1.6" strokeLinecap="round" />
    </>
  ),
  soundcloud: (
    <path d="M3 15.5h1v-3h-1v3Zm2.2 0h1v-5h-1v5Zm2.2 0h1v-6.4h-1v6.4Zm2.2 0h1V7.6h-1v7.9Zm2.3 0h1V9h-1v6.5ZM14.5 15.5V6.8c2.6-.6 5 1.4 5 4.1 0 0 .8-.2 1.6-.2 1.7 0 3 1.3 3 2.9s-1.3 2.9-3 2.9H14.5Z" />
  ),
  appleMusic: (
    <>
      <circle cx="9" cy="17" r="2.4" />
      <circle cx="17.5" cy="15.3" r="2.4" />
      <path d="M11.4 17V6.8L19.9 5v10.3" strokeLinecap="round" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6.5" width="18" height="11" rx="3.5" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: (
    <path d="M14 4v9.2a2.9 2.9 0 1 1-2.4-2.86M14 4c.4 2.2 2 3.7 4.2 3.9V10c-1.6 0-3-.5-4.2-1.3" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

export default function PlatformIcon({ platform }: { platform: PlatformKey }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      {paths[platform]}
    </svg>
  );
}
