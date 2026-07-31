"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { discography } from "@/lib/discography";

const VISIBLE_COUNT = 10;

export default function Discography() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? discography : discography.slice(0, VISIBLE_COUNT);
  const hiddenCount = discography.length - VISIBLE_COUNT;

  return (
    <div className="w-full max-w-3xl">
      {visible.map((release, i) => (
        <Link
          key={release.slug}
          href={`/songs/${release.slug}`}
          className="group relative flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/10 py-5 first:border-t"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 -translate-x-full bg-gradient-to-r from-[#ff2e63]/25 via-[#00f2ea]/15 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-0"
            aria-hidden="true"
          />

          <div className="flex min-w-0 flex-1 items-center gap-4">
            <span className="w-8 shrink-0 font-mono text-sm text-white/30 mix-blend-difference">
              {String(i + 1).padStart(2, "0")}
            </span>

            {release.coverArt ? (
              <Image
                src={release.coverArt}
                alt={`${release.title} cover art`}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-md object-cover shadow-lg shadow-black/40"
              />
            ) : (
              <div className="h-12 w-12 shrink-0 rounded-md bg-white/5" />
            )}

            <span className="relative min-w-0 flex-1">
              <span className="line-clamp-2 text-xl font-bold tracking-tight text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.8)] transition-transform duration-200 group-hover:-translate-x-[2px] sm:truncate sm:text-2xl">
                {release.title}
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 line-clamp-2 text-xl font-bold tracking-tight text-[#ff2e63] opacity-0 mix-blend-screen transition-opacity duration-200 translate-x-[3px] group-hover:opacity-70 sm:truncate sm:text-2xl"
              >
                {release.title}
              </span>
            </span>
          </div>

          <div className="flex w-full shrink-0 items-center justify-between gap-4 pl-28 sm:w-auto sm:justify-end sm:pl-0">
            {release.presave ? (
              <span className="flex shrink-0 items-center gap-2 rounded-full border border-[#ff2e63]/50 bg-[#ff2e63]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#ff2e63]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff2e63]" />
                Presave &middot; {release.presaveLabel}
              </span>
            ) : (
              <span className="shrink-0 text-sm text-white/50 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
                {release.type} &middot; {release.year}
              </span>
            )}

            <span className="shrink-0 text-white/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white">
              &#8594;
            </span>
          </div>
        </Link>
      ))}

      {!expanded && hiddenCount > 0 && (
        <div className="flex justify-center pt-6">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm transition-colors hover:border-[#ff2e63]/50 hover:text-white"
          >
            See More
            <span className="transition-transform duration-200 group-hover:translate-y-0.5">
              &#8595;
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
