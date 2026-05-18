import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";

const blogContent: Record<string, {
  category: string;
  title: string;
  date: string;
  readTime: string;
  heroImage: string;
  content: { type: "p" | "h2" | "h3" | "ul"; text?: string; items?: string[] }[];
}> = {
  "why-india-needs-manufacturing-as-a-service": {
    category: "Industry",
    title: "Why India Needs Manufacturing-as-a-Service",
    date: "May 2025",
    readTime: "6 min read",
    heroImage: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1400&q=80",
    content: [
      { type: "p", text: "India has 63 million MSMEs in manufacturing. Most of them are invisible to buyers. A startup in Bengaluru trying to get 50 CNC parts made has no reliable way to find a verified shop, get a transparent quote, or track their order — without making dozens of phone calls." },
      { type: "h2", text: "The Problem Is Massive" },
      { type: "p", text: "India is the world's fifth-largest economy, with manufacturing contributing nearly 17% of GDP. Yet the experience of sourcing a manufactured part hasn't meaningfully changed in 30 years. Quotes come via WhatsApp. Pricing is opaque. Quality is inconsistent. Lead times are a guess." },
      { type: "p", text: "This isn't a supply problem. India has extraordinary manufacturing talent and capacity. It's an infrastructure problem — there is no reliable layer connecting buyers to suppliers." },
      { type: "h2", text: "What Manufacturing-as-a-Service Means" },
      { type: "p", text: "MaaS is the idea that manufacturing capacity should be as accessible as cloud computing. You shouldn't need relationships, references, or weeks of back-and-forth to get a part made. You should be able to upload a file, get a price, and place an order — just like buying anything else online." },
      { type: "ul", items: [
        "Instant, geometry-based pricing — no human in the loop for standard parts",
        "Verified supplier network with quality guarantees",
        "End-to-end order tracking from job sheet to delivery",
        "Transparent cost breakdown — no hidden fees",
      ]},
      { type: "h2", text: "Why India Is Ready" },
      { type: "p", text: "India's manufacturing ecosystem is maturing rapidly. 3D printing studios, CNC shops, and precision fabrication units are proliferating in every tier-1 and tier-2 city. Digital payments are ubiquitous. Logistics networks can reach 500+ pin codes within 48 hours. The infrastructure for MaaS exists — it just hasn't been connected." },
      { type: "h2", text: "What TRID Is Building" },
      { type: "p", text: "TRID is India's first automated manufacturing quotation platform. Upload a file, get a real price in seconds — calculated from actual geometry, not guesswork. Choose your material, confirm your order, and track it to your door. No calls. No emails. No waiting." },
      { type: "p", text: "We're starting with 3D printing and expanding to CNC, sheet metal, and injection molding. The goal is a single platform where any Indian buyer — from a student with a design to an enterprise with 10,000 units to produce — can access world-class manufacturing capacity, instantly." },
    ],
  },

  "fdm-vs-sla-which-process-for-your-part": {
    category: "3D Printing",
    title: "FDM vs SLA — Which Process is Right for Your Part?",
    date: "Apr 2025",
    readTime: "7 min read",
    heroImage: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1400&q=80",
    content: [
      { type: "p", text: "FDM and SLA are the two most common 3D printing processes — and they produce completely different results. Choosing the wrong one wastes money and time. Here's a practical guide to picking the right process for your part." },
      { type: "h2", text: "FDM — Fused Deposition Modelling" },
      { type: "p", text: "FDM works by melting a plastic filament and depositing it layer by layer. It's the most widely available and affordable process, and it's excellent for large parts, functional prototypes, and anything where surface finish isn't critical." },
      { type: "ul", items: [
        "Best for: Large parts, structural components, rapid prototypes",
        "Materials: PLA, PETG, ABS, TPU, Nylon",
        "Surface finish: Visible layer lines (0.2mm typical)",
        "Tolerance: ±0.3mm typical",
        "Cost: Lowest of all 3D printing processes",
      ]},
      { type: "h2", text: "SLA — Stereolithography" },
      { type: "p", text: "SLA uses a UV laser to cure liquid resin layer by layer. The result is an extremely smooth surface finish and very high detail resolution. It's ideal for display models, jewellery patterns, dental models, and any part where visual quality or fine features matter." },
      { type: "ul", items: [
        "Best for: High-detail models, jewellery patterns, dental, display parts",
        "Materials: Standard resin, tough resin, clear resin, castable wax",
        "Surface finish: Very smooth, near-injection-moulded quality",
        "Tolerance: ±0.1mm typical",
        "Cost: Higher than FDM, lower than SLS",
      ]},
      { type: "h2", text: "When to Use Which" },
      { type: "p", text: "Use FDM when your part is large, functional, and surface finish is secondary. Use SLA when your part is small, detailed, or will be directly seen by a customer or client. If you need flexible parts, FDM with TPU is usually the answer. If you need castable patterns for jewellery or dental, SLA castable wax resin is the only option." },
      { type: "h2", text: "The Quick Decision Guide" },
      { type: "ul", items: [
        "Structural prototype, doesn't need to look perfect → FDM",
        "Client presentation model, needs to impress → SLA",
        "Flexible component (seal, grip, gasket) → FDM + TPU",
        "Jewellery casting pattern → SLA Castable Wax",
        "Large enclosure or housing → FDM",
        "Small, highly detailed mechanical part → SLA",
      ]},
    ],
  },

  "how-trid-calculates-your-quote": {
    category: "Platform",
    title: "How TRID Calculates Your Instant Quote",
    date: "Apr 2025",
    readTime: "5 min read",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
    content: [
      { type: "p", text: "Most manufacturing platforms give you a quote after a human reviews your file. At TRID, your quote is calculated in seconds — automatically, transparently, and based on the actual geometry of your part. Here's exactly how it works." },
      { type: "h2", text: "Step 1: Geometry Extraction" },
      { type: "p", text: "When you upload an STL file, our geometry engine parses the mesh and calculates the solid volume of your model in cubic centimetres (cc). This is the real volume of your part — not a bounding box approximation, but the actual signed volume calculated from every triangle in your mesh." },
      { type: "h2", text: "Step 2: Effective Material Calculation" },
      { type: "p", text: "We don't print parts solid. Like any slicer, we apply an infill percentage. At 20% infill (our standard), the effective material volume is approximately 42% of the solid volume — accounting for the shell walls and the sparse infill interior. Support material is estimated based on your use case and material." },
      { type: "h2", text: "Step 3: Material Rate" },
      { type: "p", text: "Each material has a rate per cc — reflecting the actual cost of the filament or resin, plus the machine time required to deposit it. PLA is the most affordable. Castable wax resin and engineering-grade materials are significantly higher." },
      { type: "h2", text: "Step 4: Fees & Taxes" },
      { type: "ul", items: [
        "Print Cost: effective_volume × material_rate",
        "Service Fee: tiered platform fee based on print cost (₹15 to ₹500)",
        "Packaging: ₹5–25 depending on part size and material",
        "GST: 18% on the subtotal",
        "Delivery: added at checkout based on your location",
      ]},
      { type: "h2", text: "Everything Is Shown" },
      { type: "p", text: "Every line item in your quote is visible before you confirm an order. There are no hidden charges, no surprise fees, and no 'call us for pricing.' What you see is what you pay." },
    ],
  },

  "designing-for-3d-printing-5-rules": {
    category: "Design Guide",
    title: "5 Design Rules That Will Save Your 3D Print",
    date: "Mar 2025",
    readTime: "8 min read",
    heroImage: "https://images.unsplash.com/photo-1607988795691-3d0147b43231?w=1400&q=80",
    content: [
      { type: "p", text: "Most 3D print failures aren't printing problems — they're design problems. Here are five rules that will dramatically improve your success rate and reduce your cost." },
      { type: "h2", text: "Rule 1: Minimum Wall Thickness" },
      { type: "p", text: "For FDM, walls should be a minimum of 1.2mm (3 perimeters at 0.4mm nozzle). Thinner walls are fragile and may not print reliably. For SLA resin, 1.0mm is the minimum for structural walls. Going thinner risks warping or breakage during post-processing." },
      { type: "h2", text: "Rule 2: Keep Overhangs Under 45°" },
      { type: "p", text: "FDM printers struggle with overhangs beyond 45° from vertical. Beyond this angle, you'll need supports — which add cost, time, and surface quality issues where they contact your part. Design parts so features angle at 45° or less wherever possible." },
      { type: "h2", text: "Rule 3: Add Tolerance to Mating Parts" },
      { type: "p", text: "If you're designing two parts that fit together, add 0.2–0.4mm of clearance between them. FDM parts are slightly oversized due to material expansion. A hole designed at exactly 10mm will print at approximately 9.8mm. Design the hole at 10.2–10.4mm for a good fit." },
      { type: "h2", text: "Rule 4: Orient for Strength" },
      { type: "p", text: "FDM parts are weakest between layers (Z-axis). If your part will experience bending or tension, orient the print so the load direction is along the XY plane, not between layers. Consider this when designing parts that will be stressed in use." },
      { type: "h2", text: "Rule 5: Hollow Large Parts" },
      { type: "p", text: "Large solid parts are expensive and often unnecessary. If your part is primarily structural or cosmetic, consider hollowing it out in your CAD tool and adding a drain hole for SLA resin. A 3mm wall thickness is sufficient for most display and low-stress applications. This can reduce cost by 40–60%." },
    ],
  },

  "jewellery-3d-printing-india": {
    category: "Jewellery",
    title: "How Indian Jewellers Are Using 3D Printing to Scale",
    date: "Mar 2025",
    readTime: "6 min read",
    heroImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=80",
    content: [
      { type: "p", text: "India is the world's second-largest jewellery market, with a manufacturing base that spans from large hallmarking centres in Mumbai and Surat to thousands of small workshops in Kolkata, Jaipur, and Chennai. And it's being quietly transformed by 3D printing." },
      { type: "h2", text: "The Old Way" },
      { type: "p", text: "Traditional jewellery prototyping meant a skilled kaarigar (craftsman) carving a wax model by hand — a process that could take days for complex designs and was impossible to replicate exactly. Every piece had subtle variations. Custom orders were expensive and slow." },
      { type: "h2", text: "The New Way" },
      { type: "p", text: "Today, a jewellery designer with access to Rhino or Matrix can model a ring in hours, export an STL, and have a printed castable wax pattern ready for investment casting the next day. The pattern is geometrically perfect, fully reproducible, and can incorporate details that no hand-carver could achieve." },
      { type: "ul", items: [
        "Micro-pavé settings with sub-millimetre prong geometry",
        "Organic flowing forms that are impossible to hand-carve",
        "Exact reproductions for batch production",
        "Rapid iteration — change a ring size or stone setting and reprint overnight",
      ]},
      { type: "h2", text: "Castable Wax Resin" },
      { type: "p", text: "The key material is castable wax resin — a photopolymer that burns out completely during investment casting with zero ash residue. This means it can be used directly in the lost-wax casting process without any modification to the existing casting workflow." },
      { type: "h2", text: "The Economics" },
      { type: "p", text: "A hand-carved wax prototype for a complex piece might cost ₹2,000–5,000 and take 2–3 days. A 3D printed equivalent costs ₹300–800 and is ready overnight. For a jewellery business producing 50 custom designs per month, this is a transformative cost and time saving." },
    ],
  },

  "material-guide-pla-petg-abs": {
    category: "Materials",
    title: "PLA vs PETG vs ABS — The Definitive Guide for 2025",
    date: "Feb 2025",
    readTime: "7 min read",
    heroImage: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1400&q=80",
    content: [
      { type: "p", text: "Three materials dominate FDM 3D printing. All three look similar on the spool, but they behave very differently. Here's everything you need to know to choose correctly." },
      { type: "h2", text: "PLA — The Default Choice" },
      { type: "p", text: "PLA (Polylactic Acid) is the most widely used FDM material for good reason. It's easy to print, dimensionally accurate, available in hundreds of colours, and inexpensive. It's derived from cornstarch and is technically biodegradable under industrial conditions." },
      { type: "ul", items: [
        "Strength: Good for rigid, low-stress applications",
        "Temperature: Softens at ~60°C — not suitable for hot environments",
        "Flexibility: Rigid and slightly brittle",
        "Best for: Models, display parts, prototypes, low-stress structural parts",
        "Avoid for: Car interiors, outdoor use in Indian summer, high-load applications",
      ]},
      { type: "h2", text: "PETG — The All-Rounder" },
      { type: "p", text: "PETG (Polyethylene Terephthalate Glycol) is the material PLA wishes it could be. It has better impact resistance, better temperature performance, and a slight flexibility that makes it much less brittle. It's also food-safe when printed correctly." },
      { type: "ul", items: [
        "Strength: Better than PLA, good impact resistance",
        "Temperature: Softens at ~80°C — suitable for most indoor applications",
        "Flexibility: Slightly flexible, much less brittle than PLA",
        "Best for: Functional parts, housings, containers, outdoor use",
        "Avoid for: Ultra-fine detail (stringier than PLA), load-bearing structural parts",
      ]},
      { type: "h2", text: "ABS — The Engineering Choice" },
      { type: "p", text: "ABS (Acrylonitrile Butadiene Styrene) is the classic engineering plastic — the same material as LEGO bricks. It has excellent temperature resistance and machinability, but it's harder to print (warps without an enclosure) and emits fumes during printing." },
      { type: "ul", items: [
        "Strength: Excellent, good for impact and fatigue",
        "Temperature: Softens at ~100°C — suitable for automotive and industrial use",
        "Flexibility: More flexible than PLA, tougher overall",
        "Best for: Automotive parts, enclosures, functional engineering components",
        "Avoid for: Printing without enclosure, aesthetic models (harder to finish)",
      ]},
      { type: "h2", text: "The Quick Decision" },
      { type: "p", text: "Default to PLA for anything that doesn't need to survive heat or stress. Use PETG when you need toughness, slight flexibility, or food safety. Choose ABS when the part will experience high temperatures, repeated stress, or needs to be post-processed (sanded, painted, machined)." },
    ],
  },

  "startup-hardware-prototyping-india": {
    category: "Startups",
    title: "Hardware Startups: How to Prototype Faster in India",
    date: "Feb 2025",
    readTime: "5 min read",
    heroImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1400&q=80",
    content: [
      { type: "p", text: "India's hardware startup ecosystem is growing — but most founders still waste months on the prototyping phase. Here's a faster playbook." },
      { type: "h2", text: "The Old Playbook (And Why It's Slow)" },
      { type: "p", text: "Ask a manufacturer for a quote → wait 3 days → get a number with no breakdown → negotiate → wait for tooling → receive parts → find they don't fit → repeat. This cycle can take 3–6 months for a first prototype. It doesn't have to." },
      { type: "h2", text: "Phase 1: Concept Validation (Week 1–2)" },
      { type: "p", text: "Use FDM printing for your first physical prototypes. Don't optimize for material or finish — optimize for speed. Print at 0.3mm layer height, 15% infill, no supports where possible. You want to hold something in your hand and test the form, not the function." },
      { type: "h2", text: "Phase 2: Functional Testing (Week 3–6)" },
      { type: "p", text: "Now optimize for material. Switch to PETG or Nylon for functional parts that will be assembled and tested. This is where you validate fit, mechanism, and basic structural integrity. Expect 3–5 iterations." },
      { type: "h2", text: "Phase 3: Pre-Production Prototype (Week 6–10)" },
      { type: "p", text: "Use SLS Nylon or metal printing (if required) for your pre-production prototype. This should be functionally and aesthetically close to your final product. At this stage, share with investors, get user feedback, and finalize your design before committing to tooling." },
      { type: "ul", items: [
        "Use TRID for instant quotes at every stage — no waiting for suppliers",
        "Order multiple material variants in parallel to compare",
        "Keep a version-controlled CAD library — you will iterate",
        "Don't commit to injection moulding tooling until Phase 3 is validated",
      ]},
    ],
  },

  "sls-nylon-functional-parts": {
    category: "3D Printing",
    title: "Why SLS Nylon is the Best-Kept Secret in Functional Prototyping",
    date: "Jan 2025",
    readTime: "6 min read",
    heroImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80",
    content: [
      { type: "p", text: "Most designers default to FDM for functional prototypes. But for parts that actually need to work — snap fits, living hinges, complex assemblies — SLS Nylon is almost always the better choice. Here's why it's underused and why you should consider it." },
      { type: "h2", text: "What Makes SLS Different" },
      { type: "p", text: "SLS (Selective Laser Sintering) uses a laser to fuse nylon powder layer by layer. Because the unfused powder supports the part during printing, there are no support structures — ever. This means you can print geometries that are completely impossible with FDM or SLA." },
      { type: "h2", text: "The Advantages" },
      { type: "ul", items: [
        "No support structures — design without constraints",
        "Isotropic strength — equal strength in all directions",
        "Excellent snap fit and living hinge performance",
        "Can print interlocked assemblies in one print",
        "Chemical resistance and temperature performance",
        "Matte, slightly textured finish that looks professional",
      ]},
      { type: "h2", text: "When to Use SLS" },
      { type: "p", text: "Use SLS when your part has complex internal geometry, needs to flex and snap, or will be assembled with other components. It's ideal for consumer product housings, medical device enclosures, automotive clips, and any part where FDM's layer-line weakness would be a problem." },
      { type: "h2", text: "The Cost Reality" },
      { type: "p", text: "SLS is more expensive than FDM — typically 3–5x the per-cc cost. But when you factor in the elimination of support removal, post-processing, and the reduced iteration count from parts that actually work first time, the total project cost is often lower. One good SLS prototype beats three failed FDM attempts." },
    ],
  },

  "trid-supplier-network-launch": {
    category: "Company",
    title: "Introducing the TRID Supplier Network",
    date: "Jan 2025",
    readTime: "4 min read",
    heroImage: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1400&q=80",
    content: [
      { type: "p", text: "Today, we're opening applications for manufacturing partners to join the TRID Supplier Network. This is a significant milestone for us — and we want to explain what we're building and why." },
      { type: "h2", text: "What Is the TRID Supplier Network?" },
      { type: "p", text: "The Supplier Network is the manufacturing backbone of TRID. It's a curated group of verified 3D printing studios, CNC shops, and fabrication units across India that fulfill orders placed on our platform. Every supplier is vetted for equipment, capacity, and quality before onboarding." },
      { type: "h2", text: "Why We're Building This" },
      { type: "p", text: "The best technology platform in the world is useless without great manufacturing behind it. We've spent months talking to shop owners, understanding their challenges, and designing a system that works for them — not just for buyers. Suppliers deserve tools that make their work easier, payments that arrive reliably, and a platform that sends them qualified, matched orders." },
      { type: "h2", text: "What Suppliers Get" },
      { type: "ul", items: [
        "Qualified order flow — matched to your exact equipment and capabilities",
        "Auto-generated job sheets with geometry data and print settings",
        "Guaranteed payment — every order is pre-verified before it reaches you",
        "Zero platform fee to join — we earn when you earn",
        "Pan-India logistics handled by TRID",
      ]},
      { type: "h2", text: "Who Should Apply" },
      { type: "p", text: "We're looking for 3D printing studios, CNC machine shops, sheet metal fabricators, and jewellery manufacturers across India. If you have the equipment, the capacity, and the commitment to quality — we want to hear from you." },
      { type: "p", text: "Apply at trid.com/become-supplier. Our team will review your application and reach out within 48 hours." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogContent[params.slug];
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">

        {/* Hero */}
        <section className="relative h-[50vh] min-h-[340px] flex items-end mb-16">
          <img
            src={post.heroImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 pb-12 w-full">
            <span className="text-[10px] bg-accent/20 text-accent font-semibold px-2.5 py-1 rounded-full mb-3 inline-block">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 mt-3 text-white/50 text-xs">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-6">
          <div className="prose prose-invert max-w-none">
            {post.content.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="text-2xl font-bold text-text-primary mt-10 mb-4">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3 key={i} className="text-xl font-semibold text-text-primary mt-8 mb-3">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "p") {
                return (
                  <p key={i} className="text-text-muted leading-relaxed mb-5">
                    {block.text}
                  </p>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="space-y-2 mb-5 ml-4">
                    {block.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-text-muted text-sm">
                        <span className="text-accent mt-1 flex-shrink-0">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>

          {/* Back to blog */}
          <div className="mt-16 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* CTA */}
          <div className="mt-10 bg-accent/5 border border-accent/20 rounded-3xl px-8 py-12 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-3">
              Ready to manufacture?
            </h2>
            <p className="text-text-muted mb-6">
              Upload your file and get an instant quote — no calls, no emails.
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-accent-hover transition-colors"
            >
              Get Instant Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </article>

      </main>
    </>
  );
}
