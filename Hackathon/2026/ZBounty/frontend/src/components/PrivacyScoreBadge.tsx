"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, ShieldCheck, ShieldHalf } from "lucide-react";

interface PrivacyScoreBadgeProps {
  score: number;
  className?: string;
  showText?: boolean;
}

export const getBadgeConfig = (score: number) => {
  if (score >= 0 && score <= 25) {
    return {
      text: "Public Transaction",
      color: "text-muted-foreground",
      bg: "bg-secondary",
      border: "border-border",
      Icon: ShieldAlert,
    };
  }
  if (score >= 26 && score <= 50) {
    return {
      text: "Privacy Aware",
      color: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
      Icon: ShieldHalf,
    };
  }
  if (score >= 51 && score <= 75) {
    return {
      text: "Shielded Contributor",
      color: "text-purple-700",
      bg: "bg-purple-50",
      border: "border-purple-200",
      Icon: Shield,
    };
  }
  return {
    text: "Privacy Champion",
    color: "text-primary-foreground", // Dark text on yellow
    bg: "bg-primary",
    border: "border-primary",
    Icon: ShieldCheck,
    isTopTier: true,
  };
};

export function PrivacyScoreBadge({ score, className, showText = true }: PrivacyScoreBadgeProps) {
  const config = getBadgeConfig(score);
  const { Icon } = config;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs whitespace-nowrap transition-all font-medium",
        config.bg,
        config.border,
        config.color,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {showText && <span>{config.text}</span>}
      <span className="opacity-80 ml-1 font-mono">{score}</span>
    </motion.div>
  );
}
