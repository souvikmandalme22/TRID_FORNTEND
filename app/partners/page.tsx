import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">
            TRID Partner Network
          </p>
          <h1 className="text-5xl font-extrabold text-text-primary leading-tight mb-5">
            Built on Trust.<br />Powered by India.
          </h1>
          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            The TRID Partner Network is India's most connected manufacturing ecosystem — linking verified suppliers, designers, and enterprise buyers on a single intelligent platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/become-supplier"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-accent-hover transition-colors"
            >
              Become a Supplier
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/upload"
              className="inline-flex items-center justify-center gap-2 border border-border text-text-primary font-semibold px-8 py-3.5 rounded-xl hover:border-accent transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "200+", label: "Verified Suppliers" },
              { value: "15+", label: "Cities Covered" },
              { value: "10K+", label: "Parts Delivered" },
              { value: "98%", label: "On-Time Delivery" },
            ].map((s) => (
              <div key={s.label} className="bg-surface border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl font-extrabold text-accent">{s.value}</div>
                <div className="text-xs text-text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Partner */}
        <section className="bg-surface border-y border-border py-20 mb-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
              Why Partner with TRID?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "📦",
                  title: "Steady Order Flow",
                  description: "Get a consistent pipeline of verified manufacturing orders — no cold calling, no chasing clients. TRID brings work to your shop floor.",
                },
                {
                  icon: "💸",
                  title: "Guaranteed Payments",
                  description: "Every order on TRID is pre-verified and payment-secured. You manufacture, we handle collections. Zero payment risk.",
                },
                {
                  icon: "📊",
                  title: "Smart Job Sheets",
                  description: "Receive auto-generated job sheets with geometry data, material specs, and print settings — no back-and-forth with customers.",
                },
                {
                  icon: "🚀",
                  title: "Grow Your Capacity",
                  description: "Scale your revenue without scaling your sales team. TRID's platform matches you with orders that fit your exact capabilities.",
                },
                {
                  icon: "🔒",
                  title: "IP Protected",
                  description: "All customer designs are NDA-protected. Your clients' intellectual property is safe — and so is yours.",
                },
                {
                  icon: "🌐",
                  title: "Pan-India Reach",
                  description: "Manufacture locally, deliver nationally. TRID's logistics network covers 500+ pin codes across India.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-background border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            How the Network Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Apply", description: "Fill out the supplier application. Our team reviews your capabilities within 48 hours." },
              { step: "02", title: "Get Verified", description: "We verify your equipment, capacity, and quality standards before onboarding." },
              { step: "03", title: "Receive Orders", description: "Matched orders appear in your dashboard with full job sheets and timelines." },
              { step: "04", title: "Manufacture & Earn", description: "Complete the job, ship to the customer, and get paid — directly to your account." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-5xl font-extrabold text-accent/10 mb-3">{item.step}</div>
                <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who Can Join */}
        <section className="bg-surface border-y border-border py-20 mb-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-text-primary mb-10 text-center">
              Who Can Join?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: "🖨️", label: "3D Printing Studios" },
                { icon: "⚙️", label: "CNC Machine Shops" },
                { icon: "🔩", label: "Sheet Metal Fabricators" },
                { icon: "💎", label: "Jewellery Manufacturers" },
                { icon: "🏭", label: "Injection Moulders" },
                { icon: "🔬", label: "Precision Engineering Firms" },
              ].map((item) => (
                <div key={item.label} className="bg-background border border-border rounded-2xl p-5 flex items-center gap-4 hover:border-accent/30 transition-colors">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium text-text-primary">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6">
          <div className="bg-accent/5 border border-accent/20 rounded-3xl px-8 py-14 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-3">
              Ready to join the network?
            </h2>
            <p className="text-text-muted mb-8 max-w-xl mx-auto">
              Hundreds of manufacturers across India are already growing with TRID. Your shop floor is next.
            </p>
            <Link
              href="/become-supplier"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-accent-hover transition-colors"
            >
              Apply Now — It's Free
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
