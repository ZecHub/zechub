/**
 * QR code component using qrcode library
 */

"use client"

import * as React from "react"
import QRCodeLib from "qrcode"
import { cn } from "@/lib/utils"

interface QRCodeProps {
  value: string
  size?: number
  className?: string
}

export function QRCode({ value, size = 200, className }: QRCodeProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (canvasRef.current && value) {
      QRCodeLib.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 2,
          color: {
            dark: "#0B0B0F",
            light: "#F7F8FA",
          },
        },
        (error) => {
          if (error) console.error("QR Code generation error:", error)
        },
      )
    }
  }, [value, size])

  return <canvas ref={canvasRef} className={cn("rounded-md", className)} />
}
