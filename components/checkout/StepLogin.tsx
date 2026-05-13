"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Field, PrimaryCTA } from "./shared";

interface Props { onNext: () => void; }

export function StepLogin({ onNext }: Props) {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const sendOtp = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setOtpSent(true); }, 1000);
  };

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 3) {
      (document.getElementById(`otp-${i + 1}`) as HTMLInputElement)?.focus();
    }
  };

  const otpComplete = otp.every((d) => d !== "");

  return (
    <div className="space-y-5">
      <Field
        id="phone" label="Mobile Number" type="tel"
        placeholder="+91 98765 43210" value={phone}
        onChange={setPhone} autoFocus maxLength={13}
      />

      <AnimatePresence>
        {!otpSent ? (
          <PrimaryCTA
            label={loading ? "" : "Send OTP"}
            onClick={sendOtp}
            disabled={phone.length < 10}
            loading={loading}
          />
        ) : (
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            <p className="text-sm text-text-secondary">
              OTP sent to <span className="text-text-primary font-medium">{phone}</span>.{" "}
              <button className="text-accent underline underline-offset-2 text-xs" onClick={() => setOtpSent(false)}>
                Change
              </button>
            </p>

            {/* OTP boxes */}
            <div className="flex gap-3 justify-between">
              {otp.map((d, i) => (
                <input
                  key={i} id={`otp-${i}`} type="text" inputMode="numeric"
                  maxLength={1} value={d}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="w-full aspect-square text-center text-2xl font-bold bg-surface border border-border focus:border-accent rounded-xl outline-none text-text-primary transition-colors"
                />
              ))}
            </div>

            <PrimaryCTA label="Verify & Continue" onClick={onNext} disabled={!otpComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-text-muted pt-2">
        By continuing, you agree to TRID's Terms of Service.
      </p>
    </div>
  );
}
