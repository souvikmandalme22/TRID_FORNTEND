"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileUpload, Container } from "@/components/ui";
import { ModelViewer } from "@/components/viewer";
import { Navbar } from "@/components/layout/Navbar";
import { useOrderStore } from "@/store";

export default function UploadPage() {
  const router = useRouter();
  const [step, setStep] = useState<"upload" | "preview">("upload");
  const setFile = useOrderStore((s) => s.setFile);
  const clearFile = useOrderStore((s) => s.clearFile);
  const file = useOrderStore((s) => s.file);

  const handleUpload = (f: File) => { setFile(f); setStep("preview"); };
  const handleConfirm = (_f: File) => router.push("/category");
  const handleReupload = () => { clearFile(); setStep("upload"); };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
        <Container className={step === "preview" ? "max-w-5xl" : ""}>
          <AnimatePresence mode="wait">
            {step === "upload" && (
              <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">Upload Your Model</h1>
                  <p className="text-text-secondary text-lg">Get an instant quote in seconds.</p>
                </div>
                <FileUpload onUploadComplete={handleUpload} />
              </motion.div>
            )}
            {step === "preview" && file && (
              <motion.div key="preview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-text-primary tracking-tight mb-3">Review Your Model</h1>
                  <p className="text-text-secondary">Rotate and confirm before we quote.</p>
                </div>
                <ModelViewer file={file} onConfirm={handleConfirm} onReupload={handleReupload} />
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </main>
    </>
  );
}
