import ShaderBackground from "./components/ShaderBackground";
import CursorTrail from "./components/CursorTrail";
import Noise from "./components/Noise";
import GlitchTitle from "./components/GlitchTitle";
import Marquee from "./components/Marquee";
import Waveform from "./components/Waveform";
import LinksGrid from "./components/LinksGrid";
import Reveal from "./components/Reveal";
import StructuredData from "./components/StructuredData";
import SoundToggle from "./components/SoundToggle";

const TICKER_WORDS = ["LOBUS", "NEW MUSIC OUT NOW", "STREAM EVERYWHERE", "LOBUS"];

export default function Home() {
  return (
    <>
      <StructuredData />
      <ShaderBackground />
      <CursorTrail />
      <Noise />
      <SoundToggle />

      <main className="relative z-10 flex flex-1 flex-col items-center">
        <section className="flex min-h-screen w-full flex-col items-center justify-center gap-10 px-6 text-center">
          <GlitchTitle />
          <Reveal delay={200}>
            <p className="max-w-xl text-balance text-lg text-white/70 sm:text-xl">
              new sounds, out now &mdash; stream everywhere.
            </p>
          </Reveal>
          <Reveal delay={350}>
            <Waveform />
          </Reveal>
          <Reveal delay={450} className="animate-bounce text-white/40">
            <span className="text-sm uppercase tracking-[0.4em]">scroll</span>
          </Reveal>
        </section>

        <Marquee items={TICKER_WORDS} />

        <section
          id="links"
          className="flex w-full flex-col items-center gap-12 px-6 py-32"
        >
          <Reveal>
            <h2 className="text-center text-[clamp(2rem,6vw,4rem)] font-black uppercase tracking-tight mix-blend-difference text-white">
              Listen &amp; Follow
            </h2>
          </Reveal>
          <Reveal delay={150} className="w-full flex justify-center">
            <LinksGrid />
          </Reveal>
        </section>

        <Marquee items={TICKER_WORDS} reverse speed={22} />

        <footer className="flex w-full flex-col items-center gap-2 px-6 py-16 text-center text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} LOBUS. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
