import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";

export default function LegalPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-24 pb-20">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-16">
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">
            Legal
          </p>

          <h1 className="text-5xl font-extrabold text-text-primary leading-tight mb-5">
            Legal & Compliance
          </h1>

          <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            We believe in transparency — not just in pricing, but in how
            we operate. Here's everything you need to know about your
            rights, our policies, and how TRID works.
          </p>
        </section>

        {/* Legal Documents */}
        <section className="max-w-3xl mx-auto px-6 mb-20">
          <div className="space-y-4">
            {[
              {
                title: "Terms of Service",
                description:
                  "The rules that govern your use of the TRID platform — including orders, payments, and user responsibilities.",
                href: "/legal/terms",
                icon: "📄",
              },
              {
                title: "Privacy Policy",
                description:
                  "How we collect, use, store, and protect your personal data and uploaded design files.",
                href: "/legal/privacy",
                icon: "🔒",
              },
              {
                title: "Supplier Agreement",
                description:
                  "The terms governing TRID's relationship with manufacturing partners in our supplier network.",
                href: "/legal/supplier-agreement",
                icon: "🤝",
              },
              {
                title: "IP & Design Protection Policy",
                description:
                  "How TRID protects the intellectual property of customers and suppliers on our platform.",
                href: "/legal/ip-policy",
                icon: "🛡️",
              },
              {
                title: "Refund & Cancellation Policy",
                description:
                  "Our policy on order cancellations, refunds, and dispute resolution for manufacturing orders.",
                href: "/legal/refund-policy",
                icon: "↩️",
              },
              {
                title: "Cookie Policy",
                description:
                  "What cookies we use, why we use them, and how you can manage your preferences.",
                href: "/legal/cookies",
                icon: "🍪",
              },
            ].map((doc) => (
              <Link
                key={doc.title}
                href={doc.href}
                className="flex items-start gap-5 bg-surface border border-border rounded-2xl px-6 py-5 hover:border-accent/30 transition-colors group"
              >
                <span className="text-2xl mt-0.5">
                  {doc.icon}
                </span>

                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors mb-1">
                    {doc.title}
                  </h3>

                  <p className="text-sm text-text-muted leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <svg
                  className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* Key Points */}
        <section className="bg-surface border-y border-border py-20 mb-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
              The Short Version
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🔒",
                  title: "Your Designs Are Safe",
                  description:
                    "Every file you upload is encrypted and protected. We never share, sell, or use your designs for any purpose other than fulfilling your order.",
                },
                {
                  icon: "💸",
                  title: "No Hidden Charges",
                  description:
                    "The price you see is the price you pay. All taxes, fees, and charges are shown upfront before you confirm any order.",
                },
                {
                  icon: "↩️",
                  title: "Fair Refund Policy",
                  description:
                    "If your order has an issue due to our error or our supplier's error, we make it right — with a reprint or a full refund.",
                },
                {
                  icon: "📦",
                  title: "Order Protection",
                  description:
                    "Every order is tracked from manufacture to delivery. If something goes wrong in transit, we take responsibility.",
                },
                {
                  icon: "🗑️",
                  title: "Right to Delete",
                  description:
                    "You can request deletion of your account and all associated data at any time by contacting us at hello@trid.com.",
                },
                {
                  icon: "⚖️",
                  title: "Indian Jurisdiction",
                  description:
                    "All disputes are governed by Indian law and subject to the jurisdiction of courts in West Bengal, India.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-background border border-border rounded-2xl p-6"
                >
                  <div className="text-3xl mb-4">
                    {item.icon}
                  </div>

                  <h3 className="font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Terms Summary */}
        <section className="max-w-3xl mx-auto px-6 mb-20">
          <div className="bg-surface border border-border rounded-3xl px-8 py-10">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Terms of Service — Summary
            </h2>

            <div className="space-y-5 text-sm text-text-muted leading-relaxed">
              <p>
                <span className="text-text-primary font-semibold">
                  1. Platform Use.
                </span>{" "}
                TRID provides an online platform for obtaining
                manufacturing quotes and placing orders with verified
                suppliers. By using the platform, you agree to these
                terms.
              </p>

              <p>
                <span className="text-text-primary font-semibold">
                  2. Orders & Payments.
                </span>{" "}
                All orders are confirmed only upon successful payment.
                Prices shown include all applicable fees and GST.
                Payment is processed securely via Razorpay.
              </p>

              <p>
                <span className="text-text-primary font-semibold">
                  3. Intellectual Property.
                </span>{" "}
                You retain full ownership of all designs you upload.
                TRID uses your files solely to generate quotes and
                fulfill orders. We do not claim any rights over your
                designs.
              </p>

              <p>
                <span className="text-text-primary font-semibold">
                  4. Quality & Liability.
                </span>{" "}
                TRID works with verified suppliers to maintain quality
                standards. In the event of a manufacturing defect
                attributable to our supplier, TRID will arrange a
                reprint or refund at no additional cost.
              </p>

              <p>
                <span className="text-text-primary font-semibold">
                  5. Cancellations.
                </span>{" "}
                Orders may be cancelled within 2 hours of placement for
                a full refund. After manufacturing has commenced,
                cancellations are subject to our refund policy.
              </p>

              <p>
                <span className="text-text-primary font-semibold">
                  6. Governing Law.
                </span>{" "}
                These terms are governed by the laws of India. Disputes
                shall be subject to the exclusive jurisdiction of courts
                in Kolkata, West Bengal.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Summary */}
        <section className="max-w-3xl mx-auto px-6 mb-20">
          <div className="bg-surface border border-border rounded-3xl px-8 py-10">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Privacy Policy — Summary
            </h2>

            <div className="space-y-5 text-sm text-text-muted leading-relaxed">
              <p>
                <span className="text-text-primary font-semibold">
                  1. Data We Collect.
                </span>{" "}
                We collect information you provide (name, email, phone,
                company), files you upload (STL, STEP, OBJ), and usage
                data (pages visited, actions taken).
              </p>

              <p>
                <span className="text-text-primary font-semibold">
                  2. How We Use It.
                </span>{" "}
                Your data is used to provide our services, process
                orders, improve our platform, and communicate with you.
                We do not sell your data to third parties.
              </p>

              <p>
                <span className="text-text-primary font-semibold">
                  3. Data Storage.
                </span>{" "}
                All data is stored on secure servers. Design files are
                encrypted at rest and in transit. We retain order data
                for 3 years for compliance purposes.
              </p>

              <p>
                <span className="text-text-primary font-semibold">
                  4. Your Rights.
                </span>{" "}
                You have the right to access, correct, or delete your
                personal data at any time. Email hello@trid.com to
                exercise these rights.
              </p>

              <p>
                <span className="text-text-primary font-semibold">
                  5. Cookies.
                </span>{" "}
                We use essential cookies for platform functionality and
                analytics cookies to improve our service. You can manage
                cookie preferences in your browser settings.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="max-w-3xl mx-auto px-6">
          <div className="bg-accent/5 border border-accent/20 rounded-3xl px-8 py-14 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-3">
              Legal Questions?
            </h2>

            <p className="text-text-muted mb-2">
              For any legal or compliance enquiries:
            </p>

            <a
              href="mailto:hello@trid.com?subject=Legal Enquiry"
              className="text-accent text-lg font-semibold hover:underline"
            >
              hello@trid.com
            </a>

            <p className="text-text-muted/60 text-xs mt-2">
              TRID Technologies Pvt. Ltd., Kolkata, West Bengal, India.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
