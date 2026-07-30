import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import Reveal from "@/app/components/Reveal";

export const metadata: Metadata = {
  title: "Notes",
  description: "Stories behind the songs, from Lobus.",
  alternates: {
    canonical: "https://lobusmusic.com/blog",
  },
  openGraph: {
    title: "Notes · LOBUS",
    description: "Stories behind the songs, from Lobus.",
    type: "website",
    url: "https://lobusmusic.com/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <main className="relative z-10 flex flex-1 flex-col items-center px-6 py-24">
      <div className="w-full max-w-2xl">
        <Reveal>
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            &larr; LOBUS
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="text-[clamp(2.5rem,9vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-white mix-blend-difference">
            Notes
          </h1>
        </Reveal>

        <Reveal delay={150} className="mt-12">
          {blogPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border-b border-white/10 py-6 first:border-t"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </p>
              <h2 className="mt-2 text-xl font-bold text-white transition-transform duration-200 group-hover:-translate-x-[2px] sm:text-2xl">
                {post.title}
              </h2>
              <p className="mt-2 text-white/60">{post.excerpt}</p>
            </Link>
          ))}
        </Reveal>
      </div>
    </main>
  );
}
