import { useState } from "react";

interface EbookCardProps {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  pages: number;
  chapters: string[];
}

const EbookCard = ({ id, title, subtitle, price, pages, chapters }: EbookCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="border border-border relative cursor-crosshair"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="section-label absolute top-3 left-4 z-10">
        {id}
      </span>

      {/* Default state: solid orange block */}
      <div
        className={`transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"} absolute inset-0 bg-primary flex flex-col justify-end p-6`}
      >
        <h3 className="font-heading text-xl font-bold text-primary-foreground leading-tight">
          {title}
        </h3>
        <p className="font-mono text-xs text-primary-foreground/70 mt-1">{subtitle}</p>
      </div>

      {/* Hover state: x-ray wireframe */}
      <div
        className={`transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"} p-6 pt-10 min-h-[280px]`}
      >
        <div className="border border-border p-3 mb-3">
          <p className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">Schematic</p>
          <h4 className="font-heading text-sm font-semibold text-foreground mt-1">{title}</h4>
          <p className="font-mono text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>

        <div className="flex gap-4 mb-3 font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
          <span>{pages} pages</span>
          <span>{chapters.length} chapters</span>
          <span className="text-primary font-bold">{price}</span>
        </div>

        <div className="border-t border-border pt-2">
          <p className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase mb-2">Table of Contents</p>
          {chapters.map((ch, i) => (
            <div key={i} className="flex items-baseline gap-2 py-0.5">
              <span className="font-mono text-[10px] text-muted-foreground w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs text-foreground/80">{ch}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ensure min height */}
      <div className="min-h-[280px]" aria-hidden />
    </div>
  );
};

export default EbookCard;
