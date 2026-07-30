export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  /** Related release slug, from lib/discography.ts, if this post is about a specific song. */
  songSlug?: string;
  body: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "the-story-behind-i-dont-wanna-go",
    title: `The Story Behind "I Don't Wanna Go"`,
    date: "2026-07-30",
    excerpt:
      "On depression, substance use, and writing the most honest song I've made.",
    songSlug: "i-dont-wanna-go",
    body: `"I Don't Wanna Go" is the most honest song I've written. I wrote it during a period where I was dealing with suicidal thoughts and using substances to numb my depression, just trying to make it through one day at a time.

The song isn't a metaphor. "I just wanna stay in my room and get high" and "fucked up everyday to feel better" are literally how those days felt, isolating myself and using whatever I could to not feel anything. "I don't wanna talk I'll talk to myself" is about how closed off I got, even to people trying to reach me.

I put it into a song because that was the only way I knew how to get it out. If you're hearing this and it sounds like your own life, I want you to know you're not alone in it, and that things can get better even when it feels impossible.

If you're struggling, the 988 Suicide & Crisis Lifeline is available 24/7 by call or text in the US, and free, confidential support is available wherever you are.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostBySongSlug(songSlug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.songSlug === songSlug);
}
