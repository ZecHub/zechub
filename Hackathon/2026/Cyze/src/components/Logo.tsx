/** Cyze "Crystal" mark — a six-arm FROST lattice, per the brand exploration.
 *  The arms radiate at 60° intervals; the gold center is the coordinated key. */
export function CrystalMark({
  size = 24,
  glow = false,
}: {
  size?: number;
  glow?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={glow ? "glow" : undefined}
      aria-hidden="true"
    >
      <g transform="translate(50,50)" stroke="#f4b728" strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <line x1="0" y1="0" x2="38" y2="0" strokeWidth="2.4" />
            <line x1="20" y1="0" x2="26" y2="-9.5" strokeWidth="1.5" />
            <line x1="20" y1="0" x2="26" y2="9.5" strokeWidth="1.5" />
            <circle cx="38" cy="0" r="3" fill="#f4b728" stroke="none" />
          </g>
        ))}
        <circle cx="0" cy="0" r="6" fill="#f4b728" stroke="none" />
      </g>
    </svg>
  );
}

/** Full lockup: crystal mark + CYZE wordmark, optional tagline. */
export function Logo({
  markSize = 26,
  showTagline = false,
}: {
  markSize?: number;
  showTagline?: boolean;
}) {
  return (
    <div className="brand-lockup">
      <CrystalMark size={markSize} glow />
      <div>
        <div className="brand-wordmark">CYZE</div>
        {showTagline && (
          <div className="brand-tagline">// coordinate your size in cyze</div>
        )}
      </div>
    </div>
  );
}
