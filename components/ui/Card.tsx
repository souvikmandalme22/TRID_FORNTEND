"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.005 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClick}
      className={cn(
        "bg-surface border border-border rounded-2xl",
        "shadow-card",
        hover && "hover:shadow-card-hover hover:border-border-strong cursor-pointer",
        "transition-shadow duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
