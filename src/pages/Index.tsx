import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import SectionBox from "@/components/SectionBox";
import EbookCard from "@/components/EbookCard";
import DataPoint from "@/components/DataPoint";

// ── Update this to your R2 public bucket URL ──────────────────────
const MANIFEST_URL = "https://pub-YOUR_R2_PUBLIC_ID.r2.dev/manifest.json";

const dataPoints = [
  { subject: "SUBJECT 012", implementation: "3 DAYS", firstRevenue: "DAY 8",  roi: "380%" },
  { subject: "SUBJECT 027", implementation: "5 DAYS", firstRevenue: "DAY 14", roi: "410%" },
  { subject: "SUBJECT 042", implementation: "4 DAYS", firstRevenue: "DAY 12", roi: "520%" },
  { subject: "SUBJECT 058", implementation: "2 DAYS", firstRevenue: "DAY 6",  roi: "290%" },
];

type Book = {
  id: string; slug: string; title: string; subtitle: string;
  niche: string; price: number; pages: number;
  chapters: string[]; pdfKey: string; publishedAt: string;
};
type Bundle = { id: string; niche: string; price: number; books: Book[]; bundledAt: string; };
type Manifest = { allBooks: Book[]; currentBundle: Book[]; bundleArchive: Bundle[]; };
type Tab = "current" | "all" | "archive";

const TABS: { id: Tab; label: string }[] = [
  { id: "current", label: "CURRENT BUNDLE" },
  { id: "all",     label: "ALL BLUEPRINTS" },
  { id: "archive", label: "BUNDLE ARCHIVE" },
];

function groupByNiche(books: Book[]): Record<string, Book[]> {
  return books.reduce((acc, book) => {
    const key = book.niche || "Other";
    acc[key] = acc[key] || [];
    acc[key].push(book);
    return acc;
  }, {} as Record<string, Book[]>);
}

const Index = () => {
  const [manifest, setManifest] = useState<Manifest>({ allBooks: [], currentBundle: [], bundleArchive: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("current");

  useEffect(() => {
    fetch(MANIFEST_URL)
      .then((r) => r.json())
      .then((data: Manifest) => { setManifest(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const { allBooks, currentBundle, bundleArchive } = manifest;
  const totalPages = allBooks.reduce((s, b) => s + (b.pages || 0), 0);
  const nicheGroups = groupByNiche(allBooks);
  const currentBundleTotal = currentBundle.reduce((s, b) => s + (b.price || 0), 0);

  return (
    <div className="min-h-screen bg-background blueprint-grid">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">
        <Sidebar />
        <main className="min-h-screen">

          {/* SEC 01 */}
          <section id="sec-01" className="border-b border-border">
            <SectionBox label="SEC. 01 // OVERVIEW" className="border-0 min-h-[60vh] flex flex-col justify-center">
              <div className="max-w-2xl mt-8">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                  The <span className="text-primary">$1K</span> First<br />Month Blueprint
                </h1>
                <p className="font-mono text-sm text-muted-foreground mt-6 leading-relaxed max-w-lg">
                  A series of tactical operating manuals engineered to generate your first $1,000 in revenue. No theory. No motivation. Just executable systems with documented results.
                </p>
                <div className="flex gap-4 mt-8">
                  <a href="#sec-02" className="border border-primary bg-primary text-primary-foreground font-mono text-xs tracking-wider uppercase px-6 py-3 hover:bg-transparent hover:text-primary transition-colors">Review Blueprints</a>
                  <a href="#sec-05" className="border border-border text-foreground font-mono text-xs tracking-wider uppercase px-6 py-3 hover:border-primary hover:text-primary transition-colors">Acquire Now</a>
                </div>
              </div>
            </SectionBox>
          </section>

          {/* SEC 02 - Blueprints with tabs */}
          <section id="sec-02" className="border-b border-border">
            <SectionBox label="SEC. 02 // BLUEPRINTS" className="border-0">

              {/* Tab bar */}
              <div className="flex gap-0 border border-border mt-2 mb-6 w-fit">
                {TABS.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`font-mono text-[10px] tracking-wider uppercase px-5 py-3 border-r border-border last:border-r-0 transition-colors ${
                      activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {loading ? <p className="font-mono text-xs text-muted-foreground">Loading blueprints...</p> : (
                <>
                  {/* CURRENT BUNDLE */}
                  {activeTab === "current" && (
                    <>
                      <p className="font-mono text-xs text-muted-foreground mb-6">
                        {currentBundle.length > 0 ? "Hover to x-ray contents. Each unit is a standalone operating system." : "Next bundle is being assembled. Check back soon."}
                      </p>
                      {currentBundle.length > 0 && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border border-border">
                            {currentBundle.map((book) => <EbookCard key={book.id} {...book} price={"$" + book.price} />)}
                          </div>
                          <div className="mt-6 border border-border p-5 flex items-center justify-between">
                            <div>
                              <p className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">Bundle Price</p>
                              <div className="flex items-baseline gap-3 mt-1">
                                <span className="font-heading text-3xl font-bold text-primary">$49</span>
                                <span className="font-mono text-xs text-muted-foreground line-through">${currentBundleTotal.toFixed(0)}</span>
                                <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">// All {currentBundle.length} blueprints</span>
                              </div>
                            </div>
                            <a href="#sec-05" className="border border-primary bg-primary text-primary-foreground font-mono text-xs tracking-wider uppercase px-6 py-3 hover:bg-transparent hover:text-primary transition-colors">
                              Acquire Bundle →
                            </a>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* ALL BLUEPRINTS */}
                  {activeTab === "all" && (
                    <>
                      <p className="font-mono text-xs text-muted-foreground mb-6">
                        {allBooks.length} blueprints published across {Object.keys(nicheGroups).length} categories.
                      </p>
                      {allBooks.length === 0 ? <p className="font-mono text-xs text-muted-foreground">No blueprints published yet.</p> : (
                        Object.entries(nicheGroups).map(([niche, books]) => (
                          <div key={niche} className="mb-8">
                            <div className="flex items-center gap-4 mb-3">
                              <p className="font-mono text-[10px] text-primary tracking-wider uppercase">[ {niche} ]</p>
                              <div className="flex-1 border-t border-border" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border border-border">
                              {books.map((book) => <EbookCard key={book.id} {...book} price={"$" + book.price} />)}
                            </div>
                          </div>
                        ))
                      )}
                    </>
                  )}

                  {/* BUNDLE ARCHIVE */}
                  {activeTab === "archive" && (
                    <>
                      <p className="font-mono text-xs text-muted-foreground mb-6">
                        {bundleArchive.length} completed bundle{bundleArchive.length !== 1 ? "s" : ""} available.
                      </p>
                      {bundleArchive.length === 0 ? (
                        <p className="font-mono text-xs text-muted-foreground">No archived bundles yet. Complete a 3-book build to create one.</p>
                      ) : (
                        [...bundleArchive].reverse().map((bundle) => (
                          <div key={bundle.id} className="mb-8 border border-border">
                            <div className="flex items-center justify-between border-b border-border px-5 py-3">
                              <div>
                                <p className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">{bundle.id} // {bundle.niche}</p>
                                <p className="font-heading text-lg font-bold text-foreground mt-1">
                                  {bundle.books.map(b => b.title.replace('The $1K First Month Blueprint: ', '')).join(' + ')}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="font-heading text-2xl font-bold text-primary">${bundle.price}</span>
                                <p className="font-mono text-[10px] text-muted-foreground mt-1 tracking-wider">
                                  {new Date(bundle.bundledAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0">
                              {bundle.books.map((book) => <EbookCard key={book.id} {...book} price={"$" + book.price} />)}
                            </div>
                            <div className="border-t border-border px-5 py-3 flex justify-end">
                              <button className="border border-primary text-primary font-mono text-xs tracking-wider uppercase px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                                Acquire Bundle — ${bundle.price} →
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </>
                  )}
                </>
              )}
            </SectionBox>
          </section>

          {/* SEC 03 - Field Data */}
          <section id="sec-03" className="border-b border-border">
            <SectionBox label="SEC. 03 // FIELD DATA" className="border-0">
              <p className="font-mono text-xs text-muted-foreground mb-6 mt-2">Raw implementation data. No narratives. No embellishment.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {dataPoints.map((dp, i) => <DataPoint key={i} {...dp} />)}
              </div>
            </SectionBox>
          </section>

          {/* SEC 04 - Specifications */}
          <section id="sec-04" className="border-b border-border">
            <SectionBox label="SEC. 04 // SPECIFICATIONS" className="border-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
                {[
                  { label: "Format",        value: "PDF" },
                  { label: "Total Pages",   value: totalPages > 0 ? String(totalPages) : "—" },
                  { label: "Blueprints",    value: allBooks.length > 0 ? String(allBooks.length) : "—" },
                  { label: "Total Chapters",value: String(allBooks.reduce((s, b) => s + (b.chapters?.length || 0), 0) || "—") },
                  { label: "Bundles",       value: String(bundleArchive.length + (currentBundle.length > 0 ? 1 : 0) || "—") },
                  { label: "Updates",       value: "Lifetime" },
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
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Full Series Bundle</h2>
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-heading text-5xl font-bold text-primary">$49</span>
                  {currentBundleTotal > 0 && <span className="font-mono text-xs text-muted-foreground line-through">${currentBundleTotal.toFixed(0)}</span>}
                  <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">// All {currentBundle.length || 3} blueprints</span>
                </div>
                <p className="font-mono text-xs text-muted-foreground mt-4 leading-relaxed">
                  Immediate access. No subscriptions. No upsells. Download the operating manuals and execute.
                </p>
                <button className="mt-8 w-full border-2 border-primary bg-primary text-primary-foreground font-mono text-sm tracking-[0.15em] uppercase py-4 hover:bg-transparent hover:text-primary transition-colors">
                  Acquire Blueprint Series →
                </button>
                <p className="font-mono text-[10px] text-muted-foreground mt-3 text-center">Secure checkout // Instant delivery // PDF</p>
              </div>
            </SectionBox>
          </section>

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
