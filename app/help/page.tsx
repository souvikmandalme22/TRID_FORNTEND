"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";

const faqs = [
  {
    category: "Getting Started",
    items: [
      {
        q: "How does TRID work?",
        a: "Upload your 3D file (STL, STEP, or OBJ), select your material and use case, and our engine instantly calculates a price based on real geometry analysis. No emails, no waiting — just an instant, transparent quote.",
      },
      {
        q: "What file formats does TRID accept?",
        a: "We currently accept STL, STEP, and OBJ files. STL is recommended for best compatibility. Maximum file size is 50MB.",
      },
      {
        q: "Do I need to create an account to get a quote?",
        a: "No — you can get a quote instantly without signing up. An account is required only when you're ready to place an order.",
      },
      {
        q: "Which cities does TRID deliver to?",
        a: "We deliver across 500+ pin codes in India. During checkout, enter your pin code to confirm delivery availability and estimated timeline.",
      },
    ],
  },
  {
    category: "Pricing & Quotes",
    items: [
      {
        q: "How is the price calculated?",
        a: "Price is calculated based on your file's actual geometry — real volume extracted from your STL file — multiplied by the material rate, adjusted for infill, complexity, and service fees. Everything is shown transparently in your quote breakdown.",
      },
      {
        q: "Why does my quote differ from slicer software?",
        a: "Our pricing engine uses a geometry-based estimation model. Actual material volume may vary slightly from slicer output due to differences in infill pattern, wall count, and support generation. Final volume is calculated at time of slicing by our manufacturing partner.",
      },
      {
        q: "Is GST included in the price?",
        a: "Yes — 18% GST is included in the total price shown. The full breakdown (print cost, service fee, packaging, GST) is visible before you confirm your order.",
      },
      {
        q: "Can I get a bulk discount?",
        a: "Quantity pricing is built into our engine — higher quantities automatically reduce the per-unit cost. For large enterprise orders (100+ units), contact us at hello@trid.com for a custom quote.",
      },
    ],
  },
  {
    category: "Orders & Delivery",
    items: [
      {
        q: "How long does manufacturing take?",
        a: "Standard turnaround is 3–5 business days for FDM prints. SLA resin parts typically take 2–4 days. SLS and metal parts may take 5–7 days. Estimated print time is shown on your quote page.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 2 hours of placement for a full refund. After manufacturing has commenced, cancellations are subject to our refund policy.",
      },
      {
        q: "What happens if my part has a defect?",
        a: "If the defect is due to a manufacturing error on our side, we will reprint or refund at no cost to you. Contact us at hello@trid.com with photos of the issue within 48 hours of delivery.",
      },
      {
        q: "How is my order packaged?",
        a: "All parts are carefully bubble-wrapped and packed in rigid boxes to prevent damage in transit. Fragile resin parts receive additional foam padding.",
      },
    ],
  },
  {
    category: "Files & IP Protection",
    items: [
      {
        q: "Is my design safe with TRID?",
        a: "Absolutely. All uploaded files are encrypted at rest and in transit. We never share, sell, or use your designs for any purpose other than fulfilling your order. Your IP belongs to you.",
      },
      {
        q: "Do you sign NDAs?",
        a: "For enterprise customers and sensitive projects, we are happy to sign an NDA before any files are shared. Contact hello@trid.com to arrange this.",
      },
      {
        q: "How long do you store my files?",
        a: "Files are retained for 12 months to allow easy reordering. You can request deletion of your files at any time by emailing hello@trid.com.",
      },
    ],
  },
  {
    category: "Materials",
    items: [
      {
        q: "Which materials are available?",
        a: "We currently offer PLA, PETG, ABS, TPU, Nylon (PA12), Standard Resin, Tough Resin, Clear Resin, and Castable Wax Resin. More materials are being added regularly.",
      },
      {
        q: "Which material should I choose?",
        a: "It depends on your use case. PLA is great for models and showpieces. PETG for functional parts. TPU for flexible components. Nylon for high-stress applications. Our material selector on the platform guides you through the choice.",
      },
      {
        q: "Can I request a material not listed?",
        a: "Yes — email hello@trid.com with your material requirement. If it's available in our supplier network, we'll add it to your quote.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-4 text-left gap-4"
      >
        <span className="text-sm font-medium text-text-primary">{q}</span>
        <svg
          className={`w-4 h-4 text-text-muted flex-shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <p className="text-sm text-text-muted leading-relaxed pb-5 pr-8">{a}</p>
      )}
    </div>
  );
}

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState("Getting Started");

  const active = faqs.find((f) => f.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-16">
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">
            Help Center
          </p>
          <h1 className="text-5xl font-extrabold text-text-primary leading-tight mb-5">
            How Can We Help?
          </h1>
          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Find answers to common questions about TRID — from uploading your first file to understanding your quote.
          </p>
        </section>

        {/* Contact Cards */}
        <section className="max-w-4xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "📧",
                title: "Email Support",
                value: "hello@trid.com",
                sub: "Response within 24 hours",
                href: "mailto:hello@trid.com",
              },
              {
                icon: "📞",
                title: "Call Us",
                value: "+91 90623 83208",
                sub: "Mon–Sat, 10am–6pm IST",
                href: "tel:+919062383208",
              },
              {
                icon: "💬",
                title: "WhatsApp",
                value: "Chat with us",
                sub: "Quick queries, fast replies",
                href: "https://wa.me/919062383208",
              },
            ].map((item) => (
              
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 bg-surface border border-border rounded-2xl px-5 py-4 hover:border-accent/40 transition-colors"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-text-muted">{item.title}</p>
                  <p className="text-sm font-semibold text-text-primary">{item.value}</p>
                  <p className="text-xs text-text-muted/60">{item.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <h2 className="text-2xl font-bold text-text-primary mb-8">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col md:flex-row gap-6">

            {/* Category tabs */}
            <div className="md:w-52 flex-shrink-0">
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {faqs.map((f) => (
                  <button
                    key={f.category}
                    onClick={() => setActiveCategory(f.category)}
                    className={`flex-shrink-0 text-left text-sm px-4 py-2.5 rounded-xl transition-colors font-medium whitespace-nowrap ${
                      activeCategory === f.category
                        ? "bg-accent text-white"
                        : "bg-surface border border-border text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {f.category}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ items */}
            <div className="flex-1 bg-surface border border-border rounded-2xl px-6 py-2">
              {active?.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Still need help */}
        <section className="max-w-3xl mx-auto px-6">
          <div className="bg-accent/5 border border-accent/20 rounded-3xl px-8 py-14 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-3">
              Still need help?
            </h2>
            <p className="text-text-muted mb-8 max-w-xl mx-auto">
              Our team is happy to assist with any question — no matter how technical.
            </p>
            
              href="mailto:hello@trid.com"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-accent-hover transition-colors"
            >
              Email Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>

      </main>
    </>
  );
}
