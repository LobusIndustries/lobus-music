import { discography } from "@/lib/discography";

export default function Discography() {
  return (
    <div className="w-full max-w-3xl">
      {discography.map((release, i) => (
        <a
          key={release.title + release.year}
          href={release.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-4 border-b border-white/10 py-5 first:border-t"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 -translate-x-full bg-gradient-to-r from-[#ff2e63]/25 via-[#00f2ea]/15 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-0"
            aria-hidden="true"
          />

          <span className="w-8 shrink-0 font-mono text-sm text-white/30 mix-blend-difference">
            {String(i + 1).padStart(2, "0")}
          </span>

          <span className="relative flex-1 truncate">
            <span className="text-xl font-bold tracking-tight text-white transition-transform duration-200 group-hover:-translate-x-[2px] sm:text-2xl">
              {release.title}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 truncate text-xl font-bold tracking-tight text-[#ff2e63] opacity-0 mix-blend-screen transition-opacity duration-200 translate-x-[3px] group-hover:opacity-70 sm:text-2xl"
            >
              {release.title}
            </span>
          </span>

          {release.presave ? (
            <span className="flex shrink-0 items-center gap-2 rounded-full border border-[#ff2e63]/50 bg-[#ff2e63]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#ff2e63]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff2e63]" />
              Presave &middot; {release.presaveLabel}
            </span>
          ) : (
            <span className="shrink-0 text-sm text-white/50">
              {release.type} &middot; {release.year}
            </span>
          )}

          <span className="shrink-0 text-white/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white">
            &#8594;
          </span>
        </a>
      ))}
    </div>
  );
}
