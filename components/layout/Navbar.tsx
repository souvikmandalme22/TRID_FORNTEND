"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Materials", href: "#materials" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <span className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-xs tracking-wider">TR</span>
            </span>
            <span className="text-text-primary font-bold text-xl tracking-tight">
              TRID
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="primary" size="sm">Get Started</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={cn("h-0.5 bg-current transition-all duration-200", open && "rotate-45 translate-y-2")} />
              <span className={cn("h-0.5 bg-current transition-all duration-200", open && "opacity-0")} />
              <span className={cn("h-0.5 bg-current transition-all duration-200", open && "-rotate-45 -translate-y-2")} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-text-secondary hover:text-text-primary text-base font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <Button variant="secondary" size="md" className="w-full">Sign In</Button>
                <Button variant="primary" size="md" className="w-full">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
