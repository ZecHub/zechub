interface Props {
  size?: number;
  color?: string;
  /** Stroke width on the 1024 viewBox grid (the brand mark uses 48 / 62). */
  stroke?: number;
}

/**
 * The ZecAuth shield mark, rendered as a transparent gold stroke (no tile) so it
 * sits cleanly in headers and inside the QR aperture. Geometry matches the brand
 * logo at /zecauth-logo.svg.
 */
export default function Shield({ size = 26, color = "var(--v-accent)", stroke = 56 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="none"
      role="img"
      aria-label="ZecAuth"
      style={{ display: "block" }}
    >
      <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M512 158 L800 254 L800 506 C800 698 670 814 512 872 C354 814 224 698 224 506 L224 254 Z"
          strokeWidth={stroke}
        />
        <path d="M410 398 L614 398 L410 568 L614 568" strokeWidth={stroke * 1.29} />
      </g>
    </svg>
  );
}
