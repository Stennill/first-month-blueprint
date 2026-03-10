import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import SectionBox from "@/components/SectionBox";
import EbookCard from "@/components/EbookCard";
import DataPoint from "@/components/DataPoint";

// R2 public manifest URL -- update R2_PUBLIC_URL to your bucket's public domain
const MANIFEST_URL = "hhttps://pub-d9c8315d945c4153b2ee060dc744aec7.r2.dev";

const fallbackEbooks = [
  {
    id: "BP-001",
    title: "Loading...",
    subtitle: "Fetching latest blueprints",
    price: "$14.99",
    pages: 0,
    chapters: [],
  },
];

const dataPoints = [
  { subject: "SUBJECT 012", implementation: "3 DAYS", firstRevenue: "DAY 8", roi: "380%" },
  { subject: "SUBJECT 027", implementation: "5 DAYS", firstRevenue: "DAY 14", roi: "410%" },
  { subject: "SUBJECT 042", implementation: "4 DAYS", firstRevenue: "DAY 12", roi: "520%" },
  { subject: "SUBJECT 058", implementation: "2 DAYS", firstRevenue: "DAY 6", roi: "290%" },
];

const Index = () => {
  const [ebooks, setEbooks] = useState(fallbackEbooks);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(MANIFEST_URL)
      .then((r) => r.json())
      .then((books) => {
        if (books && books.length > 0) {
          setEbooks(books);
          setTotalPages(books.reduce((sum: number, b: any) => sum + (b.pages || 0), 0));
        }
        setLoading(false);
      })
      .catch(() => {
        // Manifest not available yet -- keep fallback
        setLoading(false);
      });
  }, []);

  const bundlePrice = 49;
  const individualTotal = ebooks.reduce((sum, b) => {
    const p = parseFloat(String(b.price).replace("$", "")) || 0;
    return sum + p;
  }, 0);

  return (
    <div className="min-h-screen bg-background blueprint-grid">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="min-h-screen">
          {/* SEC 01 - Overview */}
          <section id="sec-01" className="border-b border-border">
            <SectionBox label="SEC. 01 // OVERVIEW" className="border-0 min-h-[60vh] flex flex-col justify-center">
              <div className="max-w-2xl mt-8">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                  The <span className="text-primary">$1K</span> First<br />
                  Month Blueprint
                </h1>
                <p className="font-mono text-sm text-muted-foreground mt-6 leading-relaxed max-w-lg">
                  A series of tactical operating manuals engineered to generate your first $1,000 in revenue. No theory. No motivation. Just executable systems with documented results.
                </p>
                <div className="flex gap-4 mt-8">
                  <a
                    href="#sec-02"
                    className="border border-primary bg-primary text-primary-foreground font-mono text-xs tracking-wider uppercase px-6 py-3 hover:bg-transparent hover:text-primary transition-colors"
                  >
                    Review Blueprints
                  </a>
                  <a
                    href="#sec-05"
                    className="border border-border text-foreground font-mono text-xs tracking-wider uppercase px-6 py-3 hover:border-primary hover:text-primary transition-colors"
                  >
                    Acquire Now
                  </a>
                </div>
              </div>
            </SectionBox>
          </section>

          {/* SEC 02 - Blueprints */}
          <section id="sec-02" className="border-b border-border">
            <SectionBox label="SEC. 02 // BLUEPRINTS" className="border-0">
              <p className="font-mono text-xs text-muted-foreground mb-6 mt-2">
                Hover to x-ray contents. Each unit is a standalone operating system.
              </p>
              {loading ? (
                <p className="font-mono text-xs text-muted-foreground">Loading blueprints...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border border-border">
                  {ebooks.map((book) => (
                    <EbookCard key={book.id} {...book} />
                  ))}
                </div>
              )}
            </SectionBox>
          </section>

          {/* SEC 03 - Field Data */}
          <section id="sec-03" className="border-b border-border">
            <SectionBox label="SEC. 03 // FIELD DATA" className="border-0">
              <p className="font-mono text-xs text-muted-foreground mb-6 mt-2">
                Raw implementation data. No narratives. No embellishment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {dataPoints.map((dp, i) => (
                  <DataPoint key={i} {...dp} />
                ))}
              </div>
            </SectionBox>
          </section>

          {/* SEC 04 - Specifications */}
          <section id="sec-04" className="border-b border-border">
            <SectionBox label="SEC. 04 // SPECIFICATIONS" className="border-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
                {[
                  { label: "Format", value: "PDF" },
                  { label: "Total Pages", value: totalPages > 0 ? String(totalPages) : "—" },
                  { label: "Blueprints", value: String(ebooks.length) },
                  { label: "Chapters", value: String(ebooks.reduce((s, b) => s + (b.chapters?.length || 0), 0)) },
                  { label: "Niches", value: String(new Set(ebooks.map((b: any) => b.niche)).size || ebooks.length) },
                  { label: "Updates", value: "Lifetime" },
                ].map((spec, i) => (
                  <div key={i} className="border border-border p-5">
                    <p className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">{spec.label}</p>
                    <p className="font-heading text-xl font-bold text-foreground mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>
            </SectionBox>
          </section>

          {/* SEC 05 - Acquire */}
          <section id="sec-05">
            <SectionBox label="SEC. 05 // ACQUIRE" className="border-0 min-h-[50vh] flex flex-col justify-center">
              <div className="max-w-lg mt-4">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  Full Series Bundle
                </h2>
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-heading text-5xl font-bold text-primary">${bundlePrice}</span>
                  {individualTotal > 0 && (
                    <span className="font-mono text-xs text-muted-foreground line-through">${individualTotal.toFixed(0)}</span>
                  )}
                  <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">// All {ebooks.length} blueprints</span>
                </div>
                <p className="font-mono text-xs text-muted-foreground mt-4 leading-relaxed">
                  Immediate access. No subscriptions. No upsells. Download the operating manuals and execute.
                </p>
                <button className="mt-8 w-full border-2 border-primary bg-primary text-primary-foreground font-mono text-sm tracking-[0.15em] uppercase py-4 hover:bg-transparent hover:text-primary transition-colors">
                  Acquire Blueprint Series →
                </button>
                <p className="font-mono text-[10px] text-muted-foreground mt-3 text-center">
                  Secure checkout // Instant delivery // PDF
                </p>
              </div>
            </SectionBox>
          </section>

          {/* Footer */}
          <footer className="border-t border-border p-6">
            <p className="font-mono text-[10px] text-muted-foreground tracking-wider">
              © 2026 // THE $1K FIRST MONTH BLUEPRINT // ALL RIGHTS RESERVED // DOCUMENT CLASSIFICATION: PUBLIC
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
