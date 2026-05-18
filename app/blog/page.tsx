import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";

const posts = [
  {
    slug: "why-india-needs-manufacturing-as-a-service",
    category: "Industry",
    title: "Why India Needs Manufacturing-as-a-Service",
    excerpt:
      "India has 63 million MSMEs in manufacturing. Most of them are invisible to buyers. Here's why that's a ₹10 lakh crore problem — and how TRID is solving it.",
    date: "May 2025",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "fdm-vs-sla-which-process-for-your-part",
    category: "3D Printing",
    title: "FDM vs SLA — Which Process is Right for Your Part?",
    excerpt:
      "Two of the most common 3D printing processes, completely different outputs. Here's a practical breakdown of when to use FDM and when SLA is the right call.",
    date: "Apr 2025",
    readTime: "7 min read",
    featured: true,
  },
  {
    slug: "how-trid-calculates-your-quote",
    category: "Platform",
    title: "How TRID Calculates Your Instant Quote",
    excerpt:
      "No black boxes. Here's exactly how our pricing engine works — from STL geometry parsing to material rates to the final rupee figure on your screen.",
    date: "Apr 2025",
    readTime: "5 min read",
    featured: true,
  },
  {
    slug: "designing-for-3d-printing-5-rules",
    category: "Design Guide",
    title: "5 Design Rules That Will Save Your 3D Print",
    excerpt:
      "Wall thickness, overhang angles, hole tolerances — the five most common design mistakes that cause print failures, and exactly how to avoid them.",
    date: "Mar 2025",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "jewellery-3d-printing-india",
    category: "Jewellery",
    title: "How Indian Jewellers Are Using 3D Printing to Scale",
    excerpt:
      "Castable wax resin is transforming the jewellery industry — from hand-carved prototypes to digital-first design pipelines. Here's what's happening in India.",
    date: "Mar 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "material-guide-pla-petg-abs",
    category: "Materials",
    title: "PLA vs PETG vs ABS — The Definitive Guide for 2025",
    excerpt:
      "Three materials, three very different use cases. We break down strength, flexibility, temperature resistance, and cost so you can choose without guessing.",
    date: "Feb 2025",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "startup-hardware-prototyping-india",
    category: "Startups",
    title: "Hardware Startups: How to Prototype Faster in India",
    excerpt:
      "Getting your first 100 prototypes made in India used to mean months of supplier hunting. Here's the new playbook for hardware founders in 2025.",
    date: "Feb 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "sls-nylon-functional-parts",
    category: "3D Printing",
    title: "Why SLS Nylon is the Best-Kept Secret in Functional Prototyping",
    excerpt:
      "No supports. Complex geometries. Parts that actually work. SLS nylon is underused by most designers — here's why you should consider it for your next project.",
    date: "Jan 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "trid-supplier-network-launch",
    category: "Company",
    title: "Introducing the TRID Supplier Network",
    excerpt:
      "Today we're opening applications for manufacturing partners across India. Here's what the TRID Supplier Network is, how it works, and why we built it.",
    date: "Jan 2025",
    readTime: "4 min read",
    featured: false,
  },
];

const categories = ["All", "3D Printing", "Materials", "Design Guide", "Industry", "Platform", "Jewellery", "Startups", "Company"];

export default function BlogPage() {
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-16">
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">
            TRID Blog
          </p>
          <h1 className="text-5xl font-extrabold text-text-primary leading-tight mb-5">
            Manufacturing Intelligence
          </h1>
          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Guides, insights, and stories from the world of digital manufacturing — written for designers, engineers, and founders building in India.
          </p>
        </section>

        {/* Featured Posts */}
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <h2 className="text-xl font-bold text-text-primary mb-6">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-surface border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors group flex flex-col"
              >
                <span className="text-[10px] bg-accent/10 text-accent font-semibold px-2.5 py-1 rounded-full w-fit mb-4">
                  {post.category}
                </span>
                <h3 className="font-bold text-text-primary group-hover:text-accent transition-colors mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed flex-1 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-text-muted/60">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section className="bg-surface border-y border-border py-20 mb-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-xl font-bold text-text-primary mb-8">All Posts</h2>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap mb-8">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                    cat === "All"
                      ? "bg-accent text-white"
                      : "bg-background border border-border text-text-muted hover:border-accent/40"
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-background border border-border rounded-xl px-5 py-4 hover:border-accent/30 transition-colors group"
                >
                  <div className="flex items-start md:items-center gap-4">
                    <span className="text-[10px] bg-accent/10 text-accent font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                      {post.category}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
                    <span className="text-xs text-text-muted/60">{post.date}</span>
                    <span className="text-xs text-text-muted/60">{post.readTime}</span>
                    <svg className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="max-w-3xl mx-auto px-6">
          <div className="bg-accent/5 border border-accent/20 rounded-3xl px-8 py-14 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-3">
              Stay in the Loop
            </h2>
            <p className="text-text-muted mb-8 max-w-xl mx-auto">
              Get the latest manufacturing guides, platform updates, and industry insights — straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-accent transition-colors placeholder:text-text-muted/40"
              />
              <button className="bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap text-sm">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-text-muted/40 mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </section>

      </main>
    </>
  );
}
