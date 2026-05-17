import { notFound } from "next/navigation";
import Link from "next/link";
import { industryData } from "@/lib/industries";
import { Navbar } from "@/components/layout/Navbar";

export function generateStaticParams() {
  return Object.keys(industryData).map((slug) => ({ slug }));
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const data = industryData[params.slug];
  if (!data) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* ── Hero ── */}
        <section className="relative h-[65vh] min-h-[420px] flex items-end">
          <img
            src={data.heroImage}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
            <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">
              {data.category}
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              {data.title}
            </h1>
            <p className="text-lg text-white/65 mt-3 max-w-2xl">{data.subtitle}</p>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-5">Overview</h2>
              <p className="text-text-muted leading-relaxed text-base">{data.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.stats.map((stat) => (
                <div key={stat.label} className="bg-surface border border-border rounded-2xl p-6">
                  <div className="text-3xl font-extrabold text-accent">{stat.value}</div>
                  <div className="text-sm text-text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="bg-surface border-y border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-text-primary mb-14 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {data.howItWorks.map((step, i) => (
                <div key={step.title}>
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-bold mb-5 text-sm">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Materials ── */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-text-primary mb-10">Materials Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.materials.map((mat) => (
              <div key={mat.name} className="bg-surface border border-border rounded-2xl p-6 hover:border-accent/40 transition-colors">
                <div className="text-3xl mb-3">{mat.icon}</div>
                <div className="font-semibold text-text-primary text-sm">{mat.name}</div>
                <div className="text-xs text-text-muted mt-1">{mat.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-surface border-y border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-text-primary mb-10">Common Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.useCases.map((uc) => (
                <div
                  key={uc.title}
                  className="bg-background border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors"
                >
                  <div className="text-3xl mb-3">{uc.icon}</div>
                  <h3 className="font-semibold text-text-primary mb-2">{uc.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{uc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-text-primary mb-10">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.gallery.map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="bg-accent/5 border border-accent/20 rounded-3xl px-8 py-14 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-3">
              Ready to build?
            </h2>
            <p className="text-text-muted mb-8 max-w-xl mx-auto">
              Get an instant automated quote for your {data.title.toLowerCase()} parts — no emails, no waiting.
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
