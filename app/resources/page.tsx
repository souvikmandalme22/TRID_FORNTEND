import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">
            Design Guides
          </p>
          <h1 className="text-5xl font-extrabold text-text-primary leading-tight mb-5">
            Design Better.<br />Manufacture Smarter.
          </h1>
          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Everything you need to know to design parts that print perfectly, fit precisely, and cost less — written by engineers, for engineers.
          </p>
        </section>

        {/* Featured Guides */}
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🖨️",
                category: "3D Printing",
                title: "FDM Design Guidelines",
                description: "Wall thickness, overhangs, bridges, and tolerances — everything you need to design parts that print first time, every time.",
                readTime: "8 min read",
                color: "bg-blue-500/10 border-blue-500/20",
                tagColor: "text-blue-400",
              },
              {
                icon: "💎",
                category: "3D Printing",
                title: "SLA Resin Best Practices",
                description: "How to orient parts, add supports, and design for the ultra-high resolution of SLA printing — including hollow structures.",
                readTime: "6 min read",
                color: "bg-purple-500/10 border-purple-500/20",
                tagColor: "text-purple-400",
              },
              {
                icon: "⚙️",
                category: "3D Printing",
                title: "SLS Nylon Design Guide",
                description: "Leverage the freedom of SLS — no supports, complex geometries, functional assemblies. Learn what's possible and what to avoid.",
                readTime: "7 min read",
                color: "bg-emerald-500/10 border-emerald-500/20",
                tagColor: "text-emerald-400",
              },
            ].map((guide) => (
              <div key={guide.title} className={`border rounded-2xl p-6 ${guide.color} hover:scale-[1.01] transition-transform cursor-pointer`}>
                <div className="text-3xl mb-3">{guide.icon}</div>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${guide.tagColor}`}>
                  {guide.category}
                </p>
                <h3 className="font-bold text-text-primary mb-3">{guide.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4">{guide.description}</p>
                <span className="text-xs text-text-muted/60">{guide.readTime}</span>
              </div>
            ))}
          </div>
        </section>

        {/* All Guides */}
        <section className="bg-surface border-y border-border py-20 mb-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-text-primary mb-10">All Design Guides</h2>
            <div className="space-y-3">
              {[
                { category: "3D Printing", title: "Minimum Wall Thickness by Process", readTime: "4 min" },
                { category: "3D Printing", title: "Infill Patterns Explained — When to Use What", readTime: "5 min" },
                { category: "3D Printing", title: "Designing Snap Fits for FDM Parts", readTime: "6 min" },
                { category: "3D Printing", title: "Support Structures — How to Minimize Them", readTime: "5 min" },
                { category: "3D Printing", title: "Tolerances and Fit: Clearance, Interference & Running Fit", readTime: "7 min" },
                { category: "3D Printing", title: "Embedding Nuts and Inserts in Printed Parts", readTime: "4 min" },
                { category: "Materials", title: "PLA vs PETG vs ABS — Which Should You Use?", readTime: "6 min" },
                { category: "Materials", title: "TPU and Flexible Materials Design Guide", readTime: "5 min" },
                { category: "Materials", title: "Resin Types Compared — Standard, Tough, Castable", readTime: "5 min" },
                { category: "File Prep", title: "How to Export a Print-Ready STL from Fusion 360", readTime: "3 min" },
                { category: "File Prep", title: "Fixing Common STL Errors Before Upload", readTime: "4 min" },
                { category: "File Prep", title: "Optimal Triangle Count for STL Files", readTime: "3 min" },
                { category: "Jewellery", title: "Designing for Castable Wax Resin — Ring Sizing & Wall Thickness", readTime: "6 min" },
                { category: "Jewellery", title: "Investment Casting Workflow for 3D Printed Patterns", readTime: "7 min" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between bg-background border border-border rounded-xl px-5 py-4 hover:border-accent/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] bg-accent/10 text-accent font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                      {item.category}
                    </span>
                    <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-xs text-text-muted/60 flex-shrink-0 ml-4">{item.readTime}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Useful Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🧮",
                title: "Instant Price Calculator",
                description: "Upload your STL and get a real price in seconds — no emails, no waiting.",
                href: "/upload",
                cta: "Calculate Now",
              },
              {
                icon: "📐",
                title: "Wall Thickness Checker",
                description: "Coming soon — upload your file and get instant feedback on printability issues.",
                href: "#",
                cta: "Coming Soon",
                disabled: true,
              },
              {
                icon: "🎨",
                title: "Material Selector",
                description: "Not sure which material to use? Answer a few questions and we'll recommend the best option.",
                href: "/material",
                cta: "Select Material",
              },
            ].map((tool) => (
              <div key={tool.title} className="bg-surface border border-border rounded-2xl p-6">
                <div className="text-3xl mb-4">{tool.icon}</div>
                <h3 className="font-semibold text-text-primary mb-2">{tool.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-5">{tool.description}</p>
                <Link
                  href={tool.href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-colors ${
                    tool.disabled
                      ? "bg-surface-2 text-text-muted/40 cursor-not-allowed"
                      : "bg-accent text-white hover:bg-accent-hover"
                  }`}
                >
                  {tool.cta}
                  {!tool.disabled && (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6">
          <div className="bg-accent/5 border border-accent/20 rounded-3xl px-8 py-14 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-3">
              Ready to manufacture?
            </h2>
            <p className="text-text-muted mb-8 max-w-xl mx-auto">
              Apply what you've learned — upload your file and get an instant quote.
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-accent-hover transition-colors"
            >
              Get Instant Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
