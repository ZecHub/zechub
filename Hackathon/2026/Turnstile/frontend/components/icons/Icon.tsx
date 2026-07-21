import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

import { cn } from "@/lib/cn";

export {
  Alert02Icon,
  ArrowRight02Icon,
  ArrowUpRight01Icon,
  Book02Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Copy01Icon,
  Github01Icon,
  Key01Icon,
  Layers01Icon,
  Menu01Icon,
  Notification01Icon,
  Search01Icon,
  SecurityCheckIcon,
  Shield01Icon,
  ViewIcon,
  ViewOffIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";

interface IconProps {
  icon: IconSvgElement;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function Icon({ icon, size = 20, strokeWidth = 1.5, className }: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
    />
  );
}
