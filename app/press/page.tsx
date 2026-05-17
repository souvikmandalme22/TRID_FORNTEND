import { Navbar } from "@/components/layout/Navbar";

export default function PressPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">
            Press & Media
          </p>
          <h1 className="text-5xl font-extrabold text-text-primary leading-tight mb-5">
            TRID in the News
          </h1>
          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            For press enquiries, media kits, or interview requests — reach out to us directly. We're always happy to talk about the future of Indian manufacturing.
          </p>
          
            href="mailto:hello@trid.com?subject=Press Enquiry"
            className="inline-flex items-center gap-2 mt-8 bg-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-accent-hover transition-colors"
          >
            Contact Press Team
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </section>

        {/* Key Facts */}
        <section className="bg-surface border-y border-border py-20 mb-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
              TRID at a Glance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "2024", label: "Founded" },
                { value: "India", label: "Headquartered" },
                { value: "9+", label: "Industries" },
                { value: "200+", label: "Supplier Partners" },
              ].map((s) => (
                <div key={s.label} className="bg-background border border-border rounded-2xl p-6 text-center">
                  <div className="text-3xl font-extrabold text-accent">{s.value}</div>
                  <div className="text-xs text-text-muted mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-background border border-border rounded-2xl px-8 py-6 space-y-4">
              {[
                { label: "Full Name", value: "TRID Technologies Pvt. Ltd." },
                { label: "Founded", value: "2024, India" },
                { label: "Category", value: "Manufacturing-as-a-Service (MaaS)" },
                { label: "Services", value: "3D Printing, CNC Machining, Sheet Metal Fabrication, Injection Molding" },
                { label: "Platform", value: "AI-powered instant quotation & supplier matching" },
                { label: "Press Contact", value: "hello@trid.com" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 border-b border-border pb-4 last:border-0 last:pb-0">
                  <span className="text-xs text-text-muted font-semibold uppercase tracking-wider w-40 flex-shrink-0">
                    {item.label}
                  </span>
                  <span className="text-sm text-text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Assets */}
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-10 text-center">
            Brand Assets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Logo (Dark)",
                description: "For use on light backgrounds",
                preview: "bg-white",
                textColor: "text-gray-900",
              },
              {
                title: "Logo (Light)",
                description: "For use on dark backgrounds",
                preview: "bg-gray-900",
                textColor: "text-white",
              },
              {
                title: "Logo (Accent)",
                description: "For use on brand color backgrounds",
                preview: "bg-accent",
                textColor: "text-white",
              },
            ].map((asset) => (
              <div key={asset.title} className="bg-surface border border-border rounded-2xl overflow-hidden">
                <div className={`${asset.preview} h-32 flex items-center justify-center`}>
                  <div className={`flex items-center gap-2 ${asset.textColor}`}>
                    <span className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
                      <span className="text-white font-bold text-xs">TR</span>
                    </span>
                    <span className="font-bold text-2xl">TRID</span>
                  </div>
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{asset.title}</p>
                    <p className="text-xs text-text-muted">{asset.description}</p>
                  </div>
                  
                    href="mailto:hello@trid.com?subject=Brand Asset Request"
                    className="text-xs text-accent hover:underline font-medium"
                  >
                    Request
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-muted/60 text-center mt-6">
            For full brand guidelines and high-resolution assets, email{" "}
            <a href="mailto:hello@trid.com" className="text-accent hover:underline">hello@trid.com</a>
          </p>
        </section>

        {/* Press Coverage placeholder */}
        <section className="bg-surface border-y border-border py-20 mb-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-5">
              Coverage Coming Soon
            </h2>
            <p className="text-text-muted max-w-xl mx-auto mb-8">
              We're just getting started. Press coverage and media features will appear here as TRID grows. Want to be the first to cover India's manufacturing revolution?
            </p>
            
              href="mailto:hello@trid.com?subject=Press Coverage — TRID"
              className="inline-flex items-center gap-2 border border-border hover:border-accent text-text-primary hover:text-accent font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Pitch a Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>

        {/* Contact */}
        <section className="max-w-3xl mx-auto px-6">
          <div className="bg-accent/5 border border-accent/20 rounded-3xl px-8 py-14 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-3">
              Get in Touch
            </h2>
            <p className="text-text-muted mb-2">
              For all press and media enquiries:
            </p>
            
              href="mailto:hello@trid.com"
              className="text-accent text-lg font-semibold hover:underline"
            >
              hello@trid.com
            </a>
            <p className="text-text-muted/60 text-xs mt-2">
              We typically respond within 24 hours.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
