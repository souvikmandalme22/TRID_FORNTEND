import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">
            Our Story
          </p>
          <h1 className="text-5xl font-extrabold text-text-primary leading-tight mb-5">
            Manufacturing,<br />Reimagined for India.
          </h1>
          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            TRID was born from a simple frustration — getting a part manufactured in India took too long, cost too much, and required too many phone calls. We built the platform we wished existed.
          </p>
        </section>

        {/* Mission */}
        <section className="bg-surface border-y border-border py-20 mb-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-5">Our Mission</h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  India has one of the world's largest manufacturing bases — thousands of precision shops, 3D printing studios, and fabrication units operating across every city. But accessing them is broken. Quotes take days. Quality is unpredictable. Supply chains are opaque.
                </p>
                <p className="text-text-muted leading-relaxed mb-4">
                  TRID is building the infrastructure layer that connects buyers and manufacturers instantly — with automated quoting, real geometry analysis, and a verified supplier network that spans the country.
                </p>
                <p className="text-text-muted leading-relaxed">
                  Our mission is to make precision manufacturing as accessible as ordering online — for startups, enterprises, researchers, and creators across India and beyond.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "2024", label: "Founded" },
                  { value: "India", label: "Headquartered" },
                  { value: "9+", label: "Industries Served" },
                  { value: "∞", label: "Parts Possible" },
                ].map((s) => (
                  <div key={s.label} className="bg-background border border-border rounded-2xl p-6 text-center">
                    <div className="text-3xl font-extrabold text-accent">{s.value}</div>
                    <div className="text-xs text-text-muted mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Speed Without Compromise",
                description: "Instant quotes. Real geometry analysis. No waiting for a salesperson to call you back. Speed is not a feature — it's the foundation.",
              },
              {
                icon: "🔍",
                title: "Radical Transparency",
                description: "Every rupee in your quote is explained. Material cost, service fee, GST — nothing hidden, nothing vague. You know exactly what you're paying for.",
              },
              {
                icon: "🇮🇳",
                title: "Made for India",
                description: "Built for Indian dimensions, Indian materials, Indian supply chains, and Indian pricing. Not a foreign platform adapted — a platform designed from the ground up.",
              },
              {
                icon: "🤝",
                title: "Supplier First",
                description: "Our network partners are not vendors — they are the backbone of TRID. We invest in their growth, protect their payments, and build tools that make their work easier.",
              },
              {
                icon: "🔒",
                title: "IP Protection",
                description: "Every design uploaded to TRID is protected. We never share, sell, or expose customer IP. Your ideas are yours.",
              },
              {
                icon: "🌱",
                title: "Long-term Thinking",
                description: "We're not optimizing for today's order volume. We're building infrastructure that India's manufacturing ecosystem will run on for decades.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-surface border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story Timeline */}
        <section className="bg-surface border-y border-border py-20 mb-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
              The TRID Journey
            </h2>
            <div className="space-y-10">
              {[
                {
                  year: "2024",
                  title: "The Idea",
                  description: "Frustrated by weeks-long quoting cycles and opaque pricing, our founder started building a better way to source manufactured parts in India.",
                },
                {
                  year: "2024",
                  title: "First Engine Built",
                  description: "The core pricing engine goes live — real STL geometry parsing, material-based cost calculation, and instant automated quotes.",
                },
                {
                  year: "2025",
                  title: "Supplier Network Launch",
                  description: "TRID onboards its first verified manufacturing partners across 3D printing, CNC machining, and sheet metal fabrication.",
                },
                {
                  year: "2025",
                  title: "Platform Goes Live",
                  description: "TRID launches publicly — India's first fully automated manufacturing quotation platform. Customers get quotes in seconds, not days.",
                },
                {
                  year: "2026",
                  title: "Scaling India",
                  description: "Expanding across industries, cities, and capabilities — building the manufacturing infrastructure India deserves.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-bold text-xs flex-shrink-0">
                      {item.year.slice(2)}
                    </div>
                    {i < 4 && <div className="w-px flex-1 bg-border mt-2" />}
                  </div>
                  <div className="pb-10">
                    <p className="text-xs text-accent font-semibold mb-1">{item.year}</p>
                    <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section cl
