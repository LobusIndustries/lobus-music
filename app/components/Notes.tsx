import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export default function Notes() {
  return (
    <div className="w-full max-w-2xl">
      {blogPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group relative flex flex-col gap-1 border-b border-white/10 py-6 first:border-t"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/40">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </span>
          <span className="text-xl font-bold tracking-tight text-white transition-transform duration-200 group-hover:-translate-x-[2px] sm:text-2xl">
            {post.title}
          </span>
          <span className="text-white/60">{post.excerpt}</span>
        </Link>
      ))}

      <Link
        href="/blog"
        className="mt-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
      >
        View all notes
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}
