const sections = [
  { id: "01", label: "Overview" },
  { id: "02", label: "Blueprints" },
  { id: "03", label: "Field Data" },
  { id: "04", label: "Specifications" },
  { id: "05", label: "Acquire" },
];

const Sidebar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="hidden lg:flex flex-col justify-between border-r border-border p-6 h-screen sticky top-0 w-full">
      <div>
        <div className="mb-10">
          <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase">Dossier</p>
          <h2 className="font-heading text-lg font-bold text-foreground mt-1 leading-tight">
            The $1K First<br />Month Blueprint
          </h2>
          <p className="font-mono text-[10px] text-muted-foreground mt-1">Series // Rev. 2026</p>
        </div>

        <nav className="space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="block w-full text-left font-mono text-xs text-muted-foreground hover:text-primary transition-colors py-1.5 tracking-wider uppercase"
            >
              <span className="text-foreground/40 mr-2">{s.id}</span>
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="border border-border p-4">
        <p className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">Status</p>
        <p className="font-heading text-sm text-foreground mt-1">Declassified</p>
        <p className="font-mono text-[10px] text-muted-foreground mt-0.5">Available for acquisition</p>
      </div>
    </aside>
  );
};

export default Sidebar;
