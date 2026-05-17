import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">
            Careers at TRID
          </p>
          <h1 className="text-5xl font-extrabold text-text-primary leading-tight mb-5">
            Build the Future of<br />Indian Manufacturing.
          </h1>
          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            We're a small team solving a massive problem. If you're passionate about manufacturing, technology, and building things that matter — you'll fit right in.
          </p>
        </section>

        {/* Why TRID */}
        <section className="bg-surface border-y border-border py-20 mb-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
              Why Work at TRID?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🚀",
                  title: "Early Stage, High Impact",
                  description: "Every person on the team shapes the product, the culture, and the direction. Your work will be seen and felt immediately.",
                },
                {
                  icon: "🧠",
                  title: "Hard Problems",
                  description: "Geometry engines, pricing algorithms, supply chain matching, real-time manufacturing logistics — we work on genuinely hard things.",
                },
                {
                  icon: "🇮🇳",
                  title: "Built for Bharat",
                  description: "We're not copying Silicon Valley. We're building infrastructure for one of the world's oldest and most complex manufacturing ecosystems.",
                },
                {
                  icon: "💸",
                  title: "Competitive Pay",
                  description: "We pay fairly and transparently. Equity is part of every early-team offer. You build it, you own a piece of it.",
                },
                {
                  icon: "🏠",
                  title: "Remote Friendly",
                  description: "Work from anywhere in India. We care about output, not office hours. Results over rituals.",
                },
                {
                  icon: "📈",
                  title: "Grow Fast",
                  description: "We're moving quickly. The person who joins as a developer today could be leading a team in 12 months. Growth is real here.",
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

        {/* Open Roles */}
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-10 text-center">
            Open Positions
          </h2>
          <div className="space-y-4">
            {[
              {
                role: "Full Stack Engineer",
                team: "Engineering",
                type: "Full-time · Remote",
                description: "Build and scale TRID's core platform — from the pricing engine to the vendor dashboard. Strong Next.js and Python experience preferred.",
              },
              {
                role: "Manufacturing Partnerships Manager",
                team: "Operations",
                type: "Full-time · Pan India",
                description: "Identify, onboard, and manage relationships with 3D printing studios and CNC shops across India. Deep manufacturing network preferred.",
              },
              {
                role: "Product Designer (UI/UX)",
                team: "Design",
                type: "Full-time · Remote",
                description: "Design intuitive flows for complex manufacturing workflows. You should be able to make geometry analysis feel simple to a first-time user.",
              },
              {
                role: "Growth & Marketing Lead",
                team: "Growth",
                type: "Full-time · Remote",
                description: "Own TRID's acquisition, content, and community strategy. Manufacturing + tech marketing experience is a big plus.",
              },
              {
                role: "3D Printing Process Engineer",
                team: "Technical",
                type: "Full-time · Hybrid",
                description: "Bring deep knowledge of FDM, SLA, SLS, and DMLS processes to improve our pricing accuracy, material recommendations, and quality standards.",
              },
            ].map((job) => (
              <div
                key={job.role}
                className="bg-surface border border-border rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-accent/30 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-text-primary">{job.role}</h3>
                    <span className="text-[10px] bg-accent/10 text-accent font-medium px-2 py-0.5 rounded-full">
                      {job.team}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mb-2">{job.type}</p>
                  <p className="text-sm text-text-muted leading-relaxed max-w-xl">{job.description}</p>
                </div>
                
                  href={`mailto:hello@trid.com?subject=Application: ${job.role}`}
                  className="flex-shrink-0 inline-f
