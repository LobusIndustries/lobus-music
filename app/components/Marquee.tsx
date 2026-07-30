interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  speed?: number;
  /** Negative seconds to start the loop already in progress, so it never looks like it "just began." */
  delay?: number;
}

export default function Marquee({
  items,
  reverse,
  speed = 28,
  delay = 0,
}: MarqueeProps) {
  const content = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden py-4 mix-blend-difference">
      <div
        className="flex w-max shrink-0 gap-8 whitespace-nowrap"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        {content.map((item, i) => (
          <span
            key={i}
            className="text-sm sm:text-base font-semibold uppercase tracking-[0.35em] text-white"
          >
            {item} <span className="opacity-40">&#9679;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
