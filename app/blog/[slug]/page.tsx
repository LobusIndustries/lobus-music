import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/lib/blog";
import { getReleaseBySlug } from "@/lib/discography";
import Reveal from "@/app/components/Reveal";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://lobusmusic.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} · LOBUS`,
      description: post.excerpt,
      type: "article",
      url: `https://lobusmusic.com/blog/${post.slug}`,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} · LOBUS`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const release = post.songSlug ? getReleaseBySlug(post.songSlug) : undefined;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    url: `https://lobusmusic.com/blog/${post.slug}`,
    author: {
      "@type": "MusicGroup",
      name: "Lobus",
      url: "https://lobusmusic.com",
    },
    ...(release?.coverArt
      ? { image: `https://lobusmusic.com${release.coverArt}` }
      : {}),
    ...(release
      ? {
          mentions: {
            "@type": "MusicRecording",
            name: release.title,
            url: `https://lobusmusic.com/songs/${release.slug}`,
          },
        }
      : {}),
  };

  return (
    <main className="relative z-10 flex flex-1 flex-col items-center px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />

      <div className="w-full max-w-2xl">
        <Reveal>
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            &larr; Notes
          </Link>
        </Reveal>

        {release?.coverArt && (
          <Reveal delay={40}>
            <Image
              src={release.coverArt}
              alt={`${release.title} cover art`}
              width={300}
              height={300}
              className="mb-8 aspect-square w-full max-w-[280px] rounded-2xl object-cover shadow-2xl shadow-black/60"
            />
          </Reveal>
        )}

        <Reveal delay={80}>
          <h1 className="text-[clamp(2rem,7vw,3.5rem)] font-black uppercase leading-[1] tracking-tight text-white mix-blend-difference">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-4 text-sm text-white/50">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </p>
        </Reveal>

        <Reveal delay={220} className="mt-10">
          <div className="space-y-6 text-lg leading-relaxed text-white/80">
            {post.body.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {release && (
          <Reveal delay={300} className="mt-16">
            <Link
              href={`/songs/${release.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
            >
              Listen to &ldquo;{release.title}&rdquo;
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
        )}
      </div>
    </main>
  );
}
