"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";

export default function BecomeSupplierPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.companyName || !form.address) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 text-center mb-14">
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">
            Partner with TRID
          </p>
          <h1 className="text-5xl font-extrabold text-text-primary leading-tight mb-4">
            Become a Supplier
          </h1>
          <p className="text-text-muted text-lg leading-relaxed">
            Join India's fastest-growing manufacturing network. Get access to verified orders, instant job sheets, and a platform built to grow your shop floor revenue.
          </p>
        </section>

        {/* Stats */}
        <section className="max-w-4xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "500+", label: "Orders Monthly" },
              { value: "48hr", label: "Avg. Job Turnaround" },
              { value: "₹0", label: "Platform Fee to Join" },
              { value: "100%", label: "Payment Guaranteed" },
            ].map((s) => (
              <div key={s.label} className="bg-surface border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl font-extrabold text-accent">{s.value}</div>
                <div className="text-xs text-text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="max-w-2xl mx-auto px-6">
          {!submitted ? (
            <div className="bg-surface border border-border rounded-3xl px-8 py-10">
              <h2 className="text-xl font-bold text-text-primary mb-8">Supplier Application</h2>

              <div className="space-y-5">

                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-text-muted font-medium mb-1.5 block">First Name *</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Rahul"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-accent transition-colors placeholder:text-text-muted/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted font-medium mb-1.5 block">Last Name *</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Sharma"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-accent transition-colors placeholder:text-text-muted/40"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="text-xs text-text-muted font-medium mb-1.5 block">Company Name *</label>
                  <input
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Sharma Precision Parts Pvt. Ltd."
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-accent transition-colors placeholder:text-text-muted/40"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="text-xs text-text-muted font-medium mb-1.5 block">Company Website <span className="text-text-muted/40">(optional)</span></label>
                  <input
                    name="companyWebsite"
                    value={form.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://yourcompany.com"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-accent transition-colors placeholder:text-text-muted/40"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-text-muted font-medium mb-1.5 block">Email ID *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="rahul@company.com"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-accent transition-colors placeholder:text-text-muted/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted font-medium mb-1.5 block">Phone Number *</label>
                    <div className="flex">
                      <span className="flex items-center px-3 bg-background border border-r-0 border-border rounded-l-xl text-xs text-text-muted">
                        🇮🇳 +91
                      </span>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="98765 43210"
                        className="flex-1 bg-background border border-border rounded-r-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-accent transition-colors placeholder:text-text-muted/40"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="text-xs text-text-muted font-medium mb-1.5 block">Company Address *</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Plot No. 12, Industrial Area, Pune, Maharashtra - 411001"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-accent transition-colors placeholder:text-text-muted/40 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>

                <p className="text-xs text-text-muted/50 text-center">
                  By submitting, you agree to our{" "}
                  <a href="/legal" className="underline hover:text-text-muted transition-colors">Terms of Service</a>{" "}
                  and{" "}
                  <a href="/legal/privacy" className="underline hover:text-text-muted transition-colors">Privacy Policy</a>.
                </p>
              </div>
            </div>
          ) : (
            /* Success */
            <div className="bg-surface border border-emerald-500/30 rounded-3xl px-8 py-16 text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3">Application Received!</h2>
              <p className="text-text-muted max-w-sm mx-auto">
                Our executive will contact you shortly. We typically reach out within <span className="text-text-primary font-semibold">24–48 business hours</span>.
              </p>
            </div>
          )}
        </section>

      </main>
    </>
  );
}
