import { links } from "@/lib/links";
import LinkCard from "./LinkCard";

export default function LinksGrid() {
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
      {links.map((link, i) => (
        <LinkCard key={link.key} link={link} index={i} />
      ))}
    </div>
  );
}
