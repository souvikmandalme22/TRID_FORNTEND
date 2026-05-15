"use client";
import { useState } from "react";
import { CheckoutShell } from "@/components/checkout/CheckoutShell";
import { StepLogin }     from "@/components/checkout/StepLogin";
import { StepAddress }   from "@/components/checkout/StepAddress";
import { StepDelivery }  from "@/components/checkout/StepDelivery";
import { StepReview }    from "@/components/checkout/StepReview";
import { StepPayment }   from "@/components/checkout/StepPayment";
import { StepConfirmed } from "@/components/checkout/StepConfirmed";
import { StepTracking }  from "@/components/checkout/StepTracking";

const META = [
  { title: "Sign In",          subtitle: "Enter your mobile number to continue." },
  { title: "Delivery Address", subtitle: "Where should we send your parts?" },
  { title: "Delivery Speed",   subtitle: "Choose how fast you need it." },
  { title: "Review Order",     subtitle: "Confirm everything before paying." },
  { title: "Payment",          subtitle: "Secure, instant payment." },
  { title: "Order Confirmed",  subtitle: undefined },
  { title: "Track Order",      subtitle: "Real-time updates on your print." },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => Math.min(s + 1, META.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const { title, subtitle } = META[step];

  return (
    <CheckoutShell step={step} title={title} subtitle={subtitle} onBack={back}>
      {step === 0 && <StepLogin     onNext={next} />}
      {step === 1 && <StepAddress   onNext={next} />}
      {step === 2 && <StepDelivery  onNext={next} />}
      {step === 3 && <StepReview    onNext={next} />}
      {step === 4 && <StepPayment   onNext={next} />}
      {step === 5 && <StepConfirmed onTrack={next} />}
      {step === 6 && <StepTracking />}
    </CheckoutShell>
  );
}
