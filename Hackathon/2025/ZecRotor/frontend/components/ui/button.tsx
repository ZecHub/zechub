/**
 * Themed button wrapper for shadcn Button
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-[#F4B728] focus:ring-offset-2 focus:ring-offset-[#0B0B0F] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-zcash-gold)] text-[var(--color-near-ink)] hover:bg-[#E5A820] shadow-sm",
        outline:
          "border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
        ghost: "hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
        destructive: "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] hover:bg-[#DC2626]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
