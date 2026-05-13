"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary: [
    "bg-accent text-white font-semibold",
    "hover:bg-accent-hover hover:shadow-accent-glow",
    "active:scale-[0.98]",
    "transition-all duration-200",
  ].join(" "),
  secondary: [
    "border border-accent text-accent font-semibold bg-transparent",
    "hover:bg-accent/10",
    "active:scale-[0.98]",
    "transition-all duration-200",
  ].join(" "),
  ghost: [
    "text-text-secondary font-medium bg-transparent",
    "hover:text-text-primary hover:bg-white/5",
    "transition-all duration-200",
  ].join(" "),
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 cursor-pointer select-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...(props as any)}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
