export type Industry = {
  title: string;
  category: string;
  subtitle: string;
  heroImage: string;
  description: string;
  stats: { value: string; label: string }[];
  howItWorks: { title: string; description: string }[];
  materials: { name: string; icon: string; note: string }[];
  useCases: { title: string; icon: string; description: string }[];
  gallery: string[];
};

export const industryData: Record<string, Industry> = {
  aerospace: {
    title: "Aerospace & Defense",
    category: "Industry",
    subtitle: "Flight-ready parts with zero compromise on precision.",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80",
    description:
      "Aerospace and defense manufacturing demands the highest levels of precision, material performance, and repeatability. TRID's platform connects you to certified manufacturing partners capable of producing complex geometries in titanium, Inconel, PEEK, and more — all with the traceability and tolerances the industry demands.",
    stats: [
      { value: "±0.05mm", label: "Tolerance Achievable" },
      { value: "50+", label: "Materials Available" },
      { value: "24hr", label: "Fastest Turnaround" },
      { value: "100%", label: "Quality Inspected" },
    ],
    howItWorks: [
      {
        title: "Upload Your CAD File",
        description: "Upload STL or STEP files. Our geometry engine instantly analyzes wall thickness, overhangs, and print orientation for manufacturability.",
      },
      {
        title: "Select Material & Process",
        description: "Choose from DMLS titanium, SLS nylon, or high-temp resins based on load bearing and thermal environment requirements.",
      },
      {
        title: "Receive Certified Parts",
        description: "Parts are manufactured, inspected, and shipped with full quality documentation and dimensional reports.",
      },
    ],
    materials: [
      { name: "Titanium (DMLS)", icon: "⚙️", note: "High strength-to-weight ratio" },
      { name: "Inconel 718", icon: "🔥", note: "Extreme heat resistance" },
      { name: "PEEK", icon: "🧪", note: "Chemical & temperature resistant" },
      { name: "Aluminum 6061", icon: "✈️", note: "Lightweight structural parts" },
    ],
    useCases: [
      { title: "Structural Brackets", icon: "🏗️", description: "Lightweight load-bearing brackets for airframes and fuselage assemblies." },
      { title: "Engine Components", icon: "🔧", description: "Heat-resistant turbine housings and combustion chamber components." },
      { title: "UAV Frames", icon: "🚁", description: "Custom drone frames optimized for weight and aerodynamics." },
      { title: "Satellite Parts", icon: "🛰️", description: "Space-grade components for CubeSats and communication satellites." },
      { title: "Avionics Enclosures", icon: "📡", description: "EMI-shielded enclosures for sensitive onboard electronics." },
      { title: "Ground Support Tooling", icon: "🛠️", description: "Custom jigs and fixtures for aircraft maintenance operations." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&q=80",
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80",
    ],
  },

  automotive: {
    title: "Automotive",
    category: "Industry",
    subtitle: "From prototype to production — precision parts at every stage.",
    heroImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80",
    description:
      "The automotive industry demands rapid iteration, tight tolerances, and materials that survive real-world stress. TRID accelerates your product cycle — from first-article prototypes to low-volume production runs — with instant quotes and verified manufacturing partners.",
    stats: [
      { value: "48hr", label: "Prototype Turnaround" },
      { value: "±0.1mm", label: "Precision Tolerance" },
      { value: "30+", label: "Auto-grade Materials" },
      { value: "1–10K", label: "Production Volume" },
    ],
    howItWorks: [
      {
        title: "Upload Your Design",
        description: "Submit STL or STEP files. Our engine checks printability, flags thin walls, and recommends optimal build orientation.",
      },
      {
        title: "Choose Process",
        description: "FDM for rapid prototypes, SLS for functional parts, DMLS for metal powertrain components.",
      },
      {
        title: "Parts to Your Bay",
        description: "Receive precision parts ready for fitment testing or direct production assembly.",
      },
    ],
    materials: [
      { name: "ABS", icon: "🚗", note: "Impact resistant, ideal for housings" },
      { name: "Nylon PA12", icon: "⚙️", note: "Flexible, durable, chemical resistant" },
      { name: "Aluminum", icon: "🔩", note: "Lightweight structural parts" },
      { name: "TPU", icon: "🛞", note: "Flexible gaskets and seals" },
    ],
    useCases: [
      { title: "Prototype Dashboards", icon: "🎛️", description: "Full-scale interior prototypes for ergonomic and aesthetic validation." },
      { title: "Intake Manifolds", icon: "💨", description: "Complex internal geometry manifolds for airflow optimization." },
      { title: "Brackets & Mounts", icon: "🔧", description: "Custom mounting solutions for sensors, cameras, and ECUs." },
      { title: "Exterior Trim", icon: "🚘", description: "Aerodynamic spoilers, diffusers, and custom body panels." },
      { title: "Assembly Fixtures", icon: "🏭", description: "Production line tooling for consistent fitment and quality control." },
      { title: "EV Battery Housings", icon: "⚡", description: "Lightweight structural enclosures for battery packs and modules." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    ],
  },

  medical: {
    title: "Medical & Dental",
    category: "Industry",
    subtitle: "Biocompatible, sterilizable, and built to save lives.",
    heroImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&q=80",
    description:
      "Medical and dental applications require biocompatible materials, sterilizable surfaces, and dimensional accuracy measured in microns. TRID connects medtech innovators with manufacturers experienced in FDA-compliant workflows, from surgical guides to implant prototypes.",
    stats: [
      { value: "±0.02mm", label: "Dental Precision" },
      { value: "ISO 13485", label: "Quality Standard" },
      { value: "Biocompatible", label: "Material Grade" },
      { value: "Sterilizable", label: "All Surfaces" },
    ],
    howItWorks: [
      {
        title: "Submit Patient Data or CAD",
        description: "Upload STL files derived from CBCT scans, MRI data, or standard CAD — our platform handles both.",
      },
      {
        title: "Select Biocompatible Material",
        description: "Choose from medical-grade resins, PEEK, or titanium depending on the implant or device requirement.",
      },
      {
        title: "Receive Certified Parts",
        description: "Every part ships with material certificates, dimensional reports, and sterilization compatibility notes.",
      },
    ],
    materials: [
      { name: "Medical Resin", icon: "🧬", note: "Biocompatible, Class IIa" },
      { name: "PEEK", icon: "🦴", note: "Bone-like stiffness, MRI safe" },
      { name: "Titanium Grade 5", icon: "⚕️", note: "Osseointegration compatible" },
      { name: "Dental Zirconia", icon: "🦷", note: "Crown and bridge applications" },
    ],
    useCases: [
      { title: "Surgical Guides", icon: "🔬", description: "Patient-specific guides for orthopedic and dental surgical procedures." },
      { title: "Prosthetic Sockets", icon: "🦾", description: "Custom-fit prosthetic interfaces from patient scan data." },
      { title: "Dental Models", icon: "🦷", description: "Accurate dental study models for orthodontic planning and aligner fabrication." },
      { title: "Implant Prototypes", icon: "🧬", description: "Rapid iteration on implant geometry before clinical trials." },
      { title: "Medical Device Housings", icon: "💊", description: "Sterilizable enclosures for diagnostic and therapeutic devices." },
      { title: "Anatomical Models", icon: "🫀", description: "Patient-specific organ models for surgical planning and medical education." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80",
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80",
    ],
  },

  electronics: {
    title: "Electronics & Semiconductors",
    category: "Industry",
    subtitle: "Precision enclosures and prototypes for the digital world.",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
    description:
      "Electronics manufacturers need fast-turn enclosures, heat sinks, and structural components that meet EMI shielding requirements and thermal management standards. TRID delivers precision parts in ESD-safe, thermally conductive, and RF-transparent materials.",
    stats: [
      { value: "24hr", label: "Enclosure Turnaround" },
      { value: "ESD-Safe", label: "Material Options" },
      { value: "±0.1mm", label: "Tolerance" },
      { value: "IP67", label: "Sealing Achievable" },
    ],
    howItWorks: [
      {
        title: "Upload Enclosure Design",
        description: "Submit your housing CAD with connector cutouts, PCB standoffs, and mounting features — we manufacture it all.",
      },
      {
        title: "Select Shielding Material",
        description: "Choose from ESD-safe filaments, conductive composites, or aluminum for RF shielding applications.",
      },
      {
        title: "Rapid Delivery",
        description: "Receive functional enclosures ready for PCB fitment, EMC testing, or end-customer deployment.",
      },
    ],
    materials: [
      { name: "ESD-Safe PLA", icon: "⚡", note: "Static dissipative, PCB-safe" },
      { name: "Conductive Nylon", icon: "🔌", note: "EMI shielding applications" },
      { name: "Aluminum (CNC)", icon: "📱", note: "Premium enclosures, heat sinks" },
      { name: "Clear Resin", icon: "🔦", note: "Optical components, light guides" },
    ],
    useCases: [
      { title: "PCB Enclosures", icon: "📦", description: "Custom-fit housings for embedded systems, IoT devices, and control boards." },
      { title: "Heat Sinks", icon: "🌡️", description: "Complex fin geometry for passive and active thermal management." },
      { title: "Antenna Mounts", icon: "📡", description: "RF-transparent brackets and housings for communication hardware." },
      { title: "Cable Management", icon: "🔗", description: "Custom clips, conduits, and strain reliefs for clean cable routing." },
      { title: "Test Fixtures", icon: "🔧", description: "Functional test jigs for PCB validation and production testing." },
      { title: "Prototype Housings", icon: "💡", description: "First-article enclosures for industrial design and user testing." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80",
      "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=800&q=80",
    ],
  },

  jewellery: {
    title: "Jewellery",
    category: "Industry",
    subtitle: "From wax to gold — precision casting patterns at scale.",
    heroImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=80",
    description:
      "The jewellery industry is being transformed by additive manufacturing. TRID enables designers to go from concept to castable wax pattern in hours — unlocking intricate filigree, organic forms, and custom pieces that were impossible with traditional hand-carving.",
    stats: [
      { value: "25μm", label: "Layer Resolution" },
      { value: "0% Ash", label: "Castable Wax Resin" },
      { value: "48hr", label: "Pattern Turnaround" },
      { value: "Unlimited", label: "Design Complexity" },
    ],
    howItWorks: [
      {
        title: "Submit Your 3D Design",
        description: "Upload your jewellery CAD from Rhino, Matrix, or JewelCAD. Our platform checks wall thickness and casting gate positions.",
      },
      {
        title: "Print in Castable Wax",
        description: "Parts are printed in 0% ash castable wax resin at 25μm resolution — ready for direct investment casting.",
      },
      {
        title: "Cast & Finish",
        description: "Send patterns to your casting house or use our partner network. Receive finished metal pieces ready for stone-setting.",
      },
    ],
    materials: [
      { name: "Castable Wax Resin", icon: "💍", note: "0% ash, direct investment casting" },
      { name: "High-Detail Resin", icon: "✨", note: "Display models and prototypes" },
      { name: "Flexible Resin", icon: "📿", note: "Mold masters and rubber molds" },
      { name: "Grey Resin", icon: "🪙", note: "Client approval models" },
    ],
    useCases: [
      { title: "Engagement Rings", icon: "💍", description: "Intricate solitaire and halo settings with micro-pavé details impossible to hand-carve." },
      { title: "Pendant Designs", icon: "✨", description: "Organic and geometric pendants with internal voids and lattice structures." },
      { title: "Bangles & Bracelets", icon: "📿", description: "Complex linking mechanisms and textured surfaces at consistent scale." },
      { title: "Custom Signet Rings", icon: "🏅", description: "Personalized heraldic and monogram signet rings from customer artwork." },
      { title: "Prototype Samples", icon: "🎨", description: "Client approval models in resin before committing to metal casting." },
      { title: "Mold Masters", icon: "🪙", description: "Rubber mold masters for high-volume production of identical pieces." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80",
    ],
  },

  architecture: {
    title: "Architecture & Construction",
    category: "Industry",
    subtitle: "Scale models and structural components for the built world.",
    heroImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=80",
    description:
      "Architecture firms and construction companies use TRID to produce highly detailed scale models, structural prototype components, and bespoke facade elements. Our platform delivers fast-turn models that communicate design intent with unmatched precision.",
    stats: [
      { value: "1:50", label: "Scale Accuracy" },
      { value: "600mm", label: "Max Build Volume" },
      { value: "48hr", label: "Model Turnaround" },
      { value: "Full Color", label: "Option Available" },
    ],
    howItWorks: [
      {
        title: "Submit Architectural CAD",
        description: "Upload from Revit, SketchUp, Rhino, or ArchiCAD. Our team optimizes the file for print at your required scale.",
      },
      {
        title: "Choose Detail Level",
        description: "From massing models to fully detailed facade models — select the resolution and finish that matches your presentation.",
      },
      {
        title: "Deliver to Studio",
        description: "Models are carefully packed and delivered to your studio, ready for client presentations or planning submissions.",
      },
    ],
    materials: [
      { name: "White PLA", icon: "🏛️", note: "Clean massing models" },
      { name: "Resin (SLA)", icon: "🔍", note: "High-detail facade elements" },
      { name: "Transparent Resin", icon: "🪟", note: "Glazing and atrium features" },
      { name: "Concrete-look", icon: "🏗️", note: "Structural element mockups" },
    ],
    useCases: [
      { title: "Competition Models", icon: "🏆", description: "Detailed architectural models for design competitions and RFP submissions." },
      { title: "Client Presentation Models", icon: "🏛️", description: "High-impact physical models that communicate spatial design to non-technical clients." },
      { title: "Facade Prototypes", icon: "🪟", description: "1:1 scale facade panel prototypes for material and joint detail validation." },
      { title: "Interior Mock-ups", icon: "🛋️", description: "Spatial models for interior layout planning and furniture arrangement." },
      { title: "Urban Planning Models", icon: "🌆", description: "Large-scale city block models for urban design and planning authority submissions." },
      { title: "Structural Node Prototypes", icon: "🔩", description: "Complex joinery and structural node prototypes for engineering validation." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    ],
  },

  "consumer-products": {
    title: "Consumer Products",
    category: "Industry",
    subtitle: "Prototype faster. Launch smarter. Manufacture at scale.",
    heroImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1400&q=80",
    description:
      "Consumer product companies use TRID to compress development timelines — from sketch to functional prototype in days. Whether you're launching a new gadget, appliance, or lifestyle product, our platform connects you with the right process and material for every stage.",
    stats: [
      { value: "3 Days", label: "First Prototype" },
      { value: "500+", label: "Materials & Finishes" },
      { value: "1–5000", label: "Production Range" },
      { value: "NDA", label: "IP Protected" },
    ],
    howItWorks: [
      {
        title: "Upload Product CAD",
        description: "Submit your design in STL or STEP. Our engine checks for thin walls, undercuts, and manufacturability issues instantly.",
      },
      {
        title: "Iterate Rapidly",
        description: "Get multiple material samples in parallel — compare finishes, flexibilities, and surface qualities before committing.",
      },
      {
        title: "Bridge to Production",
        description: "Move seamlessly from prototype to low-volume production using the same platform and quality standards.",
      },
    ],
    materials: [
      { name: "PLA+", icon: "🎨", note: "Colorful, rigid, good surface finish" },
      { name: "PETG", icon: "🧴", note: "Food-safe option, clear & durable" },
      { name: "TPU", icon: "🤸", note: "Flexible grips, protective cases" },
      { name: "SLS Nylon", icon: "📦", note: "Functional, snap-fit assemblies" },
    ],
    useCases: [
      { title: "Product Housings", icon: "📱", description: "Consumer electronics and appliance enclosures for industrial design validation." },
      { title: "Packaging Prototypes", icon: "📦", description: "Physical packaging mock-ups for retail shelf testing and photography." },
      { title: "Ergonomic Handles", icon: "✋", description: "Human-factors testing of grip geometry and button placement." },
      { title: "Toy Prototypes", icon: "🧸", description: "Functional toy prototypes for safety testing and play pattern research." },
      { title: "Wearable Devices", icon: "⌚", description: "Custom-fit bands, frames, and housings for wearable technology." },
      { title: "Display Stands", icon: "🏪", description: "Retail display fixtures and product stands for trade shows and launches." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
      "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    ],
  },

  education: {
    title: "Education & Research",
    category: "Industry",
    subtitle: "Making complex ideas tangible — for labs, classrooms, and breakthroughs.",
    heroImage: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=1400&q=80",
    description:
      "Universities, research institutions, and schools use TRID to rapidly produce lab equipment, scientific models, and custom research apparatus. Our platform democratizes access to advanced manufacturing — no minimum order, no long lead times.",
    stats: [
      { value: "No MOQ", label: "Minimum Order" },
      { value: "24hr", label: "Lab Part Turnaround" },
      { value: "Academic", label: "Pricing Available" },
      { value: "50+", label: "Institutions Served" },
    ],
    howItWorks: [
      {
        title: "Design or Download",
        description: "Upload your own CAD or use designs from open-source repositories. Our platform accepts all standard formats.",
      },
      {
        title: "Order Any Quantity",
        description: "Order 1 part or 100 — no minimums. Perfect for lab experiments, classroom demos, and one-off research tools.",
      },
      {
        title: "Receive and Experiment",
        description: "Fast delivery means your research timeline stays on track. Iterate and reorder in days, not weeks.",
      },
    ],
    materials: [
      { name: "PLA", icon: "🌱", note: "Biodegradable, safe for classrooms" },
      { name: "PETG", icon: "🧪", note: "Chemical resistant, lab-safe" },
      { name: "Flexible Resin", icon: "🔬", note: "Microfluidic channels and molds" },
      { name: "Nylon SLS", icon: "⚗️", note: "Functional research apparatus" },
    ],
    useCases: [
      { title: "Scientific Models", icon: "🧬", description: "DNA, molecular, and anatomical models for classroom teaching and museum display." },
      { title: "Lab Equipment", icon: "⚗️", description: "Custom holders, clamps, funnels, and lab-specific apparatus." },
      { title: "Microfluidic Devices", icon: "💧", description: "Complex channel geometries for fluid dynamics and biological research." },
      { title: "Robotics Components", icon: "🤖", description: "Custom frames, brackets, and actuator mounts for robotics projects." },
      { title: "Architectural Study Models", icon: "🏫", description: "Scale models for design school projects and faculty research." },
      { title: "Sensor Housings", icon: "📡", description: "Custom enclosures for environmental monitoring and research sensors." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80",
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
      "https://images.unsplash.com/photo-1607988795691-3d0147b43231?w=800&q=80",
    ],
  },

  industrial: {
    title: "Industrial Equipment",
    category: "Industry",
    subtitle: "Downtime is expensive. We keep your line moving.",
    heroImage: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1400&q=80",
    description:
      "Industrial manufacturers depend on TRID for on-demand spare parts, custom tooling, and production fixtures that keep lines running. Our platform eliminates long lead times for legacy components — order any quantity, any time, and have it at your facility within days.",
    stats: [
      { value: "72hr", label: "Spare Part Delivery" },
      { value: "No MOQ", label: "Order Flexibility" },
      { value: "Industrial", label: "Grade Materials" },
      { value: "24/7", label: "Platform Access" },
    ],
    howItWorks: [
      {
        title: "Upload or Reverse Engineer",
        description: "Upload existing CAD or send us a broken part — our team can reverse engineer and produce a replacement.",
      },
      {
        title: "Select Industrial Material",
        description: "Choose from high-temp nylons, glass-filled composites, or metal printing for load-bearing industrial applications.",
      },
      {
        title: "On-Site Delivery",
        description: "Parts are manufactured and delivered to your facility, ready for installation without modification.",
      },
    ],
    materials: [
      { name: "Glass-filled Nylon", icon: "🏭", note: "High stiffness, heat resistant" },
      { name: "PETG", icon: "⚙️", note: "Chemical resistant, durable" },
      { name: "Tool Steel (DMLS)", icon: "🔩", note: "Hardened tooling applications" },
      { name: "Carbon Fiber PLA", icon: "💪", note: "Lightweight high-strength parts" },
    ],
    useCases: [
      { title: "Spare Parts On-Demand", icon: "🔧", description: "Replace broken or obsolete components without waiting for OEM lead times." },
      { title: "Custom Jigs & Fixtures", icon: "🏭", description: "Production line fixtures designed for your exact process requirements." },
      { title: "Conveyor Components", icon: "📦", description: "Custom guides, brackets, and wear parts for material handling systems." },
      { title: "Pneumatic Fittings", icon: "💨", description: "Custom manifolds and fittings for pneumatic and hydraulic systems." },
      { title: "Protective Guards", icon: "🛡️", description: "Machine guards and safety covers manufactured to exact dimensions." },
      { title: "End-of-Arm Tooling", icon: "🤖", description: "Lightweight custom grippers and end-effectors for robotic arms." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80",
    ],
  },
};
