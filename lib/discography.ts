export interface Release {
  title: string;
  slug: string;
  type: "Album" | "EP" | "Single";
  year: string;
  url: string;
  presave?: boolean;
  presaveLabel?: string;
  /** Full lyrics, plain text with line breaks. Added per-song as available. */
  lyrics?: string;
  /** Cover art, /covers/{slug}.jpg. Sourced from Spotify's oEmbed thumbnail. */
  coverArt?: string;
  /** YouTube video ID for the official music video, from youtube.com/@lobus. */
  youtubeId?: string;
}

// Sourced from https://open.spotify.com/artist/1ac1KQ6uUiOnXTau8cfJeb, keep in
// sync with the artist page if new releases drop.
export const discography: Release[] = [
  {
    title: "Fucked Up With The Flu",
    slug: "fucked-up-with-the-flu",
    type: "Single",
    year: "2026",
    url: "https://distrokid.com/hyperfollow/lobus1/fucked-up-with-the-flu",
    coverArt: "/covers/fucked-up-with-the-flu.png",
    presave: true,
    presaveLabel: "Aug 31",
  },
  {
    title: "Nevermore",
    slug: "nevermore",
    type: "Single",
    year: "2026",
    url: "https://open.spotify.com/album/0YSYezpAEF9lwNbjX9clHv",
    coverArt: "/covers/nevermore.jpg",
    youtubeId: "SQb3wfBGLjs",
    lyrics: `Nevermore that you want to go
Fall apart at the front door
Legs collapse you don't want it though
Lights go dim I'm on the fucking floor

I smoke that loud I loose all control
My mind go south but I just found my soul
I'm coming down but you don't got to know
All about me now cause Im just on a roll I lost control

My baby left me with a burnt picture
And now I miss her my skin all blistered
Nevermore that you want from me here's the thing
I don't care about my life just my friends that I'm leaving

I wrote all my notes but there's one thing I'm leaving
The love of my life all alone it's the heathen
Just follow me to death by next season
I don't know what went wrong I'm off the deep end

I'm off the deep end yeah I'm tweaking
I get that drug talk every weekend
God saved my life and he would do it again
Mom and dad please forgive me for what I did

I'm alone yeah I feel dead in the core
You call my phone but I'm not here anymore
God sent me home when I was dead on the floor
I'm all alone and I'm not breathing no more

Nevermore that you want to go
Fall apart at the front door
Legs collapse you don't want it though
Lights go dim I'm on the fucking floor

I'm on a roll
I lost control
I gotta go and find my soul
I'm on a roll
I lost control
I gotta go
I gotta go`,
  },
  {
    title: "Fly Away",
    slug: "fly-away",
    type: "Single",
    year: "2025",
    url: "https://open.spotify.com/album/6oePThndVbG1jXPe76srqJ",
    coverArt: "/covers/fly-away.jpg",
    youtubeId: "zb4GCPsgegk",
    lyrics: `Fly away from everybody everybody has to die anyway
I am broken I have chosen to lie in my grave

Bring me a bottle hand me a gun
I'm sick of living this life's not fun
Scared to keep trying cause thats all that I've done
And the silence it kills me so I always run

I wanna fly away I wanna leave this place I wanna die today
Always covered in rain and my vision is gray I can't fucking stay

So let me
Fly away from everybody everybody has to die anyway
I am broken I have chosen to lie in my grave`,
  },
  {
    title: "I Don't Wanna Go",
    slug: "i-dont-wanna-go",
    type: "Single",
    year: "2024",
    url: "https://open.spotify.com/album/4nVRjVragKa5d71JPzYkgT",
    coverArt: "/covers/i-dont-wanna-go.jpg",
    lyrics: `I don't wanna go with you tonight
I just wanna stay in my room and get high
Fucking with my mind while I drive tonight
Speeding down the road with the flashing

Fucked up right now I drank a bottle
I don't really wanna think about tomorrow
Look me in my eyes you'll feel my sorrow
I don't wanna talk I'll talk to myself

I don't really wanna run away forever
Fucked up everyday to feel better
Feeling cold everyday in the summer
My depression never getting better

I don't wanna go with you tonight
I just wanna stay in my room and get high
Fucking with my mind while I drive tonight
Speeding down the road with the flashing

Fucked up right now I drank a bottle
I don't really wanna think about tomorrow
Look me in my eyes you'll feel my sorrow
I don't wanna talk I'll talk to myself

I don't really wanna run away forever
Fucked up everyday to feel better
Feeling cold everyday in the summer
My depression never getting better`,
  },
  {
    title: "Heartbeat",
    slug: "heartbeat",
    type: "Single",
    year: "2023",
    url: "https://open.spotify.com/album/2aACz6FZHcZbFbE4LBV8c4",
    coverArt: "/covers/heartbeat.jpg",
    youtubeId: "OV5YeXt2uDg",
  },
  {
    title: "Shitty Summer",
    slug: "shitty-summer",
    type: "EP",
    year: "2023",
    url: "https://open.spotify.com/album/4uykhlJd6KFds8lPDc5Fn9",
    coverArt: "/covers/shitty-summer.jpg",
  },
  {
    title: "Last Night",
    slug: "last-night",
    type: "Single",
    year: "2023",
    url: "https://open.spotify.com/album/0uaTveG96x8EJXttdwTsN7",
    coverArt: "/covers/last-night.jpg",
    youtubeId: "T1KmBkyF54o",
  },
  {
    title: "I Hate",
    slug: "i-hate",
    type: "Single",
    year: "2023",
    url: "https://open.spotify.com/album/69FPResKs4jb9D0i6J7zUA",
    coverArt: "/covers/i-hate.jpg",
    youtubeId: "N6GE7AUDdQM",
  },
  {
    title: "Love My Pain",
    slug: "love-my-pain",
    type: "Single",
    year: "2023",
    url: "https://open.spotify.com/album/4WG0cQ2dv5pOnlo0Tw8kvx",
    coverArt: "/covers/love-my-pain.jpg",
    youtubeId: "yQdV0rTyTpk",
  },
  {
    title: "Stranger",
    slug: "stranger",
    type: "Single",
    year: "2023",
    url: "https://open.spotify.com/album/0xdz0OqHxPqGqxlPTneuMD",
    coverArt: "/covers/stranger.jpg",
  },
];

export function getReleaseBySlug(slug: string): Release | undefined {
  return discography.find((r) => r.slug === slug);
}

export function getSpotifyAlbumId(url: string): string | null {
  const match = url.match(/open\.spotify\.com\/album\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}
