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
              <span className="text-t
