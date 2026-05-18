"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";

const solutions = {
  "Additive Manufacturing": [
    { label: "3D Printing Service", href: "/upload", available: true },
    { label: "Fused Deposition Modeling (FDM)", href: "/upload", available: true },
    { label: "Stereolithography (SLA)", href: "/upload", available: true },
    { label: "Selective Laser Sintering (SLS)", href: "#", available: false },
    { label: "Direct Metal Laser Sintering (DMLS)", href: "#", available: false },
  ],
  "CNC Machining": [
    { label: "CNC Machining", href: "#", available: false },
    { label: "CNC Milling", href: "#", available: false },
    { label: "CNC Turning", href: "#", available: false },
  ],
  "Sheet Metal Fabrication": [
    { label: "Sheet Metal Fabrication", href: "#", available: false },
    { label: "Laser Cutting", href: "#", available: false },
    { label: "Waterjet Cutting", href: "#", available: false },
  ],
  "Injection Molding": [
    { label: "Injection Molding", href: "#", available: false },
    { label: "Prototype Molding", href: "#", available: false },
  ],
};

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
  { label: "Design Guides", href: "/resources", icon: "📐" },
  { label: "Help Center", href: "/help", icon: "💬" },
  { label: "Blog", href: "/blog", icon: "📝" },
];

type DropdownKey = "solutions" | "industries" | "resources" | null;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")}
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-xs tracking-wider">TR</span>
            </span>
            <span className="text-text-primary font-bold text-xl tracking-tight">TRID</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">

            {/* Solutions */}
            <button
              onMouseEnter={() => setActiveDropdown("solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
              onClick={() => setActiveDropdown(activeDropdown === "solutions" ? null : "solutions")}
              className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-surface"
            >
              Solutions <ChevronIcon open={activeDropdown === "solutions"} />
            </button>

            {/* Industries */}
            <button
              onMouseEnter={() => setActiveDropdown("industries")}
              onMouseLeave={() => setActiveDropdown(null)}
              onClick={() => setActiveDropdown(activeDropdown === "industries" ? null : "industries")}
              className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-surface"
            >
              Industries <ChevronIcon open={activeDropdown === "industries"} />
            </button>

            {/* Resources */}
            <button
              onMouseEnter={() => setActiveDropdown("resources")}
              onMouseLeave={() => setActiveDropdown(null)}
              onClick={() => setActiveDropdown(activeDropdown === "resources" ? null : "resources")}
              className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-surface"
            >
              Resources <ChevronIcon open={activeDropdown === "resources"} />
            </button>

            <a href="/#how-it-works"
              className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-surface">
              How TRID Works
            </a>

            <Link href="/become-supplier"
              className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-surface">
              Become a Supplier
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push("/checkout")}>Sign In</Button>
            <Button variant="primary" size="sm" onClick={() => router.push("/upload")}>
              Get Instant Quote
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={cn("h-0.5 bg-current transition-all duration-200", mobileOpen && "rotate-45 translate-y-2")} />
              <span className={cn("h-0.5 bg-current transition-all duration-200", mobileOpen && "opacity-0")} />
              <span className={cn("h-0.5 bg-current transition-all duration-200", mobileOpen && "-rotate-45 -translate-y-2")} />
            </div>
          </button>
        </div>
      </div>

      {/* ── Solutions Dropdown ── */}
      <AnimatePresence>
        {activeDropdown === "solutions" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8">
              <div className="grid grid-cols-4 gap-8">
                {Object.entries(solutions).map(([category, items]) => (
                  <div key={category}>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
                      {category}
                    </p>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item.label}>
                          {item.available ? (
                            <Link
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-2"
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <span className="flex items-center gap-2 text-sm text-text-muted/40 cursor-default">
                              {item.label}
                              <span className="text-[10px] bg-accent/10 text-accent/70 font-medium px-1.5 py-0.5 rounded-full">
                                Soon
                              </span>
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Industries Dropdown ── */}
      <AnimatePresence>
        {activeDropdown === "industries" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}
            onMouseEnter={() => setActiveDropdown("industries")}
            onMouseLeave={() => setActiveDropdown(null)}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8">
              <div className="grid grid-cols-3 gap-4">
                {industries.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface border border-transparent hover:border-border transition-colors group"
                  >
                    <svg className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Resources Dropdown ── */}
      <AnimatePresence>
        {activeDropdown === "resources" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}
            onMouseEnter={() => setActiveDropdown("resources")}
            onMouseLeave={() => setActiveDropdown(null)}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8">
              <div className="flex gap-4">
                {resources.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl hover:bg-surface border border-transparent hover:border-border transition-colors group min-w-[180px]"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-2">

              {/* Solutions mobile */}
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "solutions" ? null : "solutions")}
                className="flex items-center justify-between text-text-secondary text-base font-medium py-2"
              >
                Solutions <ChevronIcon open={mobileExpanded === "solutions"} />
              </button>
              {mobileExpanded === "solutions" && (
                <div className="pl-4 pb-2 space-y-2">
                  {Object.entries(solutions).map(([cat, items]) => (
                    <div key={cat} className="mb-3">
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-2">{cat}</p>
                      {items.map((item) => (
                        item.available ? (
                          <Link key={item.label} href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm text-text-secondary hover:text-accent py-1 transition-colors">
                            {item.label}
                          </Link>
                        ) : (
                          <span key={item.label} className="flex items-center gap-2 text-sm text-text-muted/40 py-1">
                            {item.label}
                            <span className="text-[10px] bg-accent/10 text-accent/70 px-1.5 py-0.5 rounded-full">Soon</span>
                          </span>
                        )
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Industries mobile */}
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "industries" ? null : "industries")}
                className="flex items-center justify-between text-text-secondary text-base font-medium py-2"
              >
                Industries <ChevronIcon open={mobileExpanded === "industries"} />
              </button>
              {mobileExpanded === "industries" && (
                <div className="pl-4 pb-2 space-y-1">
                  {industries.map((item) => (
                    <Link key={item.label} href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm text-text-secondary hover:text-accent py-1 transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Resources mobile */}
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "resources" ? null : "resources")}
                className="flex items-center justify-between text-text-secondary text-base font-medium py-2"
              >
                Resources <ChevronIcon open={mobileExpanded === "resources"} />
              </button>
              {mobileExpanded === "resources" && (
                <div className="pl-4 pb-2 space-y-1">
                  {resources.map((item) => (
                    <Link key={item.label} href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm text-text-secondary hover:text-accent py-1 transition-colors">
                      {item.icon} {item.label}
                    </Link>
                  ))}
                </div>
              )}

              <a href="/#how-it-works" onClick={() => setMobileOpen(false)}
                className="text-text-secondary text-base font-medium py-2">
                How TRID Works
              </a>

              <Link href="/become-supplier" onClick={() => setMobileOpen(false)}
                className="text-text-secondary text-base font-medium py-2">
                Become a Supplier
              </Link>

              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <Button variant="primary" size="md" className="w-full"
                  onClick={() => { setMobileOpen(false); router.push("/upload"); }}>
                  Get Instant Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}
