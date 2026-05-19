"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const ACCEPTED     = [".stl", ".obj", ".step", ".stp"];
const MAX_SIZE_MB  = 100;
const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://trid-bak.onrender.com/api/v1";
const UPLOAD_URL = `${API}/upload`;
const MAX_RETRIES  = 3;
const RETRY_DELAY  = 2000; // ms

type UploadState = "idle" | "dragging" | "uploading" | "success" | "error";

interface FileUploadProps {
  onUploadComplete?: (file: File) => void;
  className?: string;
}

interface FileInfo {
  name: string;
  size: string;
  ext: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getExt(name: string): string {
  return name.split(".").pop()?.toUpperCase() ?? "";
}

function validate(file: File): string | null {
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ACCEPTED.includes(ext))
    return `Unsupported format. Please upload STL, OBJ, or STEP files.`;
  if (file.size > MAX_SIZE_MB * 1024 * 1024)
    return `File exceeds ${MAX_SIZE_MB}MB limit.`;
  return null;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 52 52" className="w-12 h-12" fill="none">
      <motion.circle cx="26" cy="26" r="24" stroke="#3A86FF" strokeWidth="2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }} />
      <motion.path d="M14 27l8 8 16-16" stroke="#3A86FF" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }} />
    </svg>
  );
}

function ProgressRing({ progress }: { progress: number }) {
  const r    = 24;
  const circ = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 56 56" className="w-14 h-14 -rotate-90">
      <circle cx="28" cy="28" r={r} stroke="rgba(58,134,255,0.15)" strokeWidth="2" fill="none" />
      <motion.circle cx="28" cy="28" r={r} stroke="#3A86FF" strokeWidth="2"
        fill="none" strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ - (progress / 100) * circ}
        transition={{ duration: 0.3 }} />
    </svg>
  );
}

/* ─── Upload with retry ─── */
async function uploadWithRetry(
  file: File,
  onProgress: (pct: number) => void,
  onStatus: (msg: string) => void
): Promise<void> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 1) {
        onStatus(`Retrying... (attempt ${attempt}/${MAX_RETRIES})`);
        onProgress(0);
        await new Promise((r) => setTimeout(r, RETRY_DELAY));
      }

      // Simulate progress while upload is happening
      let prog = 0;
      const progressInterval = setInterval(() => {
        prog = Math.min(prog + Math.random() * 15, 85);
        onProgress(Math.round(prog));
      }, 200);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        body:   formData,
        signal: AbortSignal.timeout(30_000), // 30s timeout per attempt
      });

      clearInterval(progressInterval);

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      onProgress(100);
      return; // success

    } catch (err: any) {
      lastError = err;
      console.warn(`Upload attempt ${attempt} failed:`, err.message);
    }
  }

  throw lastError ?? new Error("Upload failed after retries");
}

export function FileUpload({ onUploadComplete, className }: FileUploadProps) {
  const [state, setState]       = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [error, setError]       = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState("");
  const inputRef                = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    setError(null);
    setStatusMsg("");

    const err = validate(file);
    if (err) { setError(err); setState("error"); return; }

    setFileInfo({ name: file.name, size: formatSize(file.size), ext: getExt(file.name) });
    setState("uploading");
    setProgress(0);

    try {
      await uploadWithRetry(
        file,
        (pct) => setProgress(pct),
        (msg) => setStatusMsg(msg)
      );

      setTimeout(() => {
        setState("success");
        onUploadComplete?.(file);
      }, 300);

    } catch {
      setError("Upload failed after 3 attempts. Check your connection and try again.");
      setState("error");
    }
  }, [onUploadComplete]);

  const onDragOver  = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (state === "idle" || state === "error") setState("dragging");
  }, [state]);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setState("idle");
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setState("idle");
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const reset = useCallback(() => {
    setState("idle");
    setProgress(0);
    setFileInfo(null);
    setError(null);
    setStatusMsg("");
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const isDragging  = state === "dragging";
  const isUploading = state === "uploading";
  const isSuccess   = state === "success";
  const isError     = state === "error";

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <motion.div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => (state === "idle" || state === "error") && inputRef.current?.click()}
        animate={{
          borderColor: isDragging ? "#3A86FF"
            : isSuccess  ? "#3A86FF"
            : isError    ? "rgba(239,68,68,0.5)"
            : "rgba(255,255,255,0.08)",
          backgroundColor: isDragging ? "rgba(58,134,255,0.06)" : "rgba(36,36,36,0.6)",
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative border-2 border-dashed rounded-3xl",
          "flex flex-col items-center justify-center",
          "min-h-[320px] md:min-h-[380px] p-10",
          "select-none overflow-hidden transition-all duration-200",
          (isUploading || isSuccess) ? "cursor-default pointer-events-none" : "cursor-pointer"
        )}
      >
        <AnimatePresence>
          {isDragging && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(58,134,255,0.12) 0%, transparent 70%)" }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* Idle / Error */}
          {(state === "idle" || state === "error") && (
            <motion.div key="idle"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center gap-5"
            >
              <motion.div
                animate={isDragging ? { scale: 1.12, y: -4 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-2xl bg-surface-2 border border-border flex items-center justify-center text-accent"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </motion.div>

              <div>
                <p className="text-text-primary text-lg font-semibold mb-1">
                  {isDragging ? "Release to upload" : "Drop your 3D model here"}
                </p>
                <p className="text-text-secondary text-sm">
                  or <span className="text-accent underline underline-offset-2">browse files</span>
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-center">
                {["STL", "OBJ", "STEP"].map((fmt) => (
                  <span key={fmt}
                    className="text-xs font-mono font-semibold text-text-muted bg-surface-2 border border-border px-2.5 py-1 rounded-lg">
                    .{fmt}
                  </span>
                ))}
                <span className="text-xs text-text-muted">· Max {MAX_SIZE_MB}MB</span>
              </div>

              {isError && error && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-2.5 rounded-xl max-w-xs">
                  {error}
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Uploading */}
          {isUploading && (
            <motion.div key="uploading"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <ProgressRing progress={progress} />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-text-primary">
                  {progress}%
                </span>
              </div>

              <div className="text-center">
                <p className="text-text-primary font-semibold mb-1">
                  {statusMsg || "Uploading…"}
                </p>
                {fileInfo && (
                  <p className="text-text-muted text-sm font-mono truncate max-w-[280px]">
                    {fileInfo.name}
                  </p>
                )}
                {statusMsg && (
                  <p className="text-accent text-xs mt-1 animate-pulse">
                    Server is warming up, please wait...
                  </p>
                )}
              </div>

              <div className="w-64 h-1 bg-surface-2 rounded-full overflow-hidden">
                <motion.div className="h-full bg-accent rounded-full"
                  style={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
              </div>
            </motion.div>
          )}

          {/* Success */}
          {isSuccess && fileInfo && (
            <motion.div key="success"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <CheckIcon />
              <div>
                <p className="text-text-primary text-lg font-semibold mb-1">Model uploaded!</p>
                <p className="text-text-muted text-sm">Ready for instant pricing</p>
              </div>
              <div className="flex items-center gap-4 bg-surface-2 border border-border rounded-2xl px-6 py-4">
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center">
                  <span className="text-accent text-xs font-bold font-mono">{fileInfo.ext}</span>
                </div>
                <div className="text-left">
                  <p className="text-text-primary text-sm font-medium truncate max-w-[200px]">
                    {fileInfo.name}
                  </p>
                  <p className="text-text-muted text-xs mt-0.5">{fileInfo.size}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input ref={inputRef} type="file" accept={ACCEPTED.join(",")}
          onChange={onFileChange} className="hidden" />
      </motion.div>

      {/* Bottom actions */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ delay: 0.2 }}
            className="flex items-center justify-between mt-5 gap-4"
          >
            <button onClick={reset}
              className="text-sm text-text-muted hover:text-text-secondary transition-colors underline underline-offset-2">
              Upload different file
            </button>
            <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-accent-glow transition-all duration-200"
            >
              Get Instant Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
