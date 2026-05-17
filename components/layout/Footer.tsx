"use client";

import Link from "next/link";
import { Container } from "@/components/ui";

const services = [
  { label: "3D Printing", href: "/upload", available: true },
  { label: "CNC Machining", href: "#", available: false },
  { label: "Sheet Metal Fabrication", href: "#", available: false },
  { label: "Injection Molding", href: "#", available: false },
  { label: "Metal Forming & Die Casting", href: "#", available: false },
];

const industries = [
  { label: "Aerospace & Defense", href: "/industries/aerospace" },
  { label: "Automotive", href: "/industries/automotive" },
  { label: "Medical & Dental", href: "/industries/medical" },
  { label: "Electronics & Semiconductors", href: "/industries/electronics" },
  { label: "Jewellery", href: "/industries/jewellery" },
  { label: "Architecture & Construction", href: "/industries/architecture" },
  { label: "Consumer Products", href: "/industries/consumer-products" },
  { label: "Education & Research", href: "/industries/education" },
  { label: "Industrial Equipment", href: "/industries/industrial" },
];

const resources = [
  { label: "Design Guides", href: "/resources" },
  { label: "Help Center", href: "/help" },
  { label: "Blog", href: "/blog" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/press" },
  { label: "Legal", href: "/legal" },
];

const partners = [
  { label: "TRID Partner Network", href: "/partners" },
  { label: "Become a Supplier", href: "/become-supplier" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <Container>
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">TR</span>
              </span>
              <span className="text-text-primary font-bold text-lg">TRID</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed max-w-[220px]">
              Digitizing manufacturing with smarter sourcing, instant quotes, and a supplier network built for innovators.
            </p>
            <div className="mt-5 space-y-2.5">
              
                href="tel:+919062383208"
                className="flex items-center gap-2 text-xs text-text-muted hover:text-accent transition-colors"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 90623 83208
              </a>
              
                href="mailto:hello@trid.com"
                className="flex items-center gap-2 text-xs text-text-muted hover:text-accent transition-colors"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@trid.com
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">Services</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  {s.available ? (
                    <Link href={s.href} className="text-xs text-text-muted hover:text-accent transition-colors">
                      {s.label}
                    </Link>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-text-muted/40 cursor-default">
                      {s.label}
                      <span className="text-[10px] bg-accent/10 text-accent/70 font-medium px-1.5 py-0.5 rounded-full">
                        Soon
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <p className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">Industries</p>
            <ul className="space-y-2.5">
              {industries.map((i) => (
                <li key={i.label}>
                  <Link href={i.href} className="text-xs text-text-muted hover:text-accent transition-colors">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">Resources</p>
            <ul className="space-y-2.5">
              {resources.map((r) => (
                <li key={r.label}>
                  <Link href={r.href} className="text-xs text-text-muted hover:text-accent transition-colors">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4 mt-8">Partners</p>
            <ul className="space-y-2.5">
              {partners.map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className="text-xs text-text-muted hover:text-accent transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">Company</p>
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.label}>
                  <Link href={c.href} className="text-xs text-text-muted hover:text-accent transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <Container>
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-text-muted/40">
              © {new Date().getFullYear()} TRID Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/legal/privacy" className="text-xs text-text-muted/40 hover:text-text-muted transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="text-xs text-text-muted/40 hover:text-text-muted transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
