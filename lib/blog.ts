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

I put it into a song because that was the only way I knew how to get it out. If you're hearing this and it sounds like your own life, I want you to know you're not alone in it, and that things can get better even when it feels impossible.`,
  },
  {
    slug: "the-story-behind-nevermore",
    title: `The Story Behind "Nevermore"`,
    date: "2026-07-30",
    excerpt:
      "On being scared to let someone in, and choosing to try anyway.",
    songSlug: "nevermore",
    body: `"Nevermore" is about trying to find my way through a really dark stretch of my life while also wanting something good in it. I had my eye on a girl I really wanted to be with, but I was scared to actually get with her because of how suicidal I was. I didn't want to bring her into that and then have something happen to me.

A lot of the song is about that fight, the fear of losing control, the drug use, feeling like I was on the floor and not coming back from it, and needing my family and God to pull me through. It's heavy because that's genuinely where my head was.

I did end up getting with her anyway, and I'm still with her now. Writing this song was part of figuring out how to let someone in instead of pushing them away to protect them from me.`,
  },
  {
    slug: "the-story-behind-fly-away",
    title: `The Story Behind "Fly Away"`,
    date: "2026-07-30",
    excerpt: "On not wanting to be here anymore.",
    songSlug: "fly-away",
    body: `"Fly Away" is about not wanting to be here anymore. It's the most direct song I've written about wanting to end it all, not feeling accepted, not feeling heard, not feeling loved, and just wanting the pain to stop.

"Bring me a bottle hand me a gun" and "I wanna die today" aren't exaggerations, that's exactly where my head was when I wrote this. The rain and the gray in it are how everything looked from the inside of that.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostBySongSlug(songSlug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.songSlug === songSlug);
}
