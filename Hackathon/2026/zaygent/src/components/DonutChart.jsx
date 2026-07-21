import { COLORS } from "../constants/colors";

export default function DonutChart({ data, size: sizeProp, label, sublabel }) {
  const size   = sizeProp || 120;
  const cx     = size / 2;
  const cy     = size / 2;
  const r      = size * 0.367;
  const stroke = size * 0.117;
  const total  = data.reduce((s, d) => s + d.value, 0);

  let offset = 0;
  const slices = data.map((d) => {
    const len  = (d.value / total) * (2 * Math.PI * r);
    const gap  = 3;
    const slice = {
      ...d,
      dashArray:  `${len - gap} ${2 * Math.PI * r - len + gap}`,
      dashOffset: -offset,
    };
    offset += len;
    return slice;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={COLORS.border} strokeWidth={stroke} />
      {slices.map((s, i) => (
        <circle
          key={i} cx={cx} cy={cy} r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={stroke}
          strokeDasharray={s.dashArray}
          strokeDashoffset={s.dashOffset}
          strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
      ))}
      {label && (
        <text x={cx} y={cy - 4} textAnchor="middle" fill={COLORS.teal}
          fontSize={size * 0.108} fontWeight="600" fontFamily="monospace">
          {label}
        </text>
      )}
      {sublabel && (
        <text x={cx} y={cy + size * 0.1} textAnchor="middle" fill={COLORS.textSecondary}
          fontSize={size * 0.075} fontFamily="monospace">
          {sublabel}
        </text>
      )}
    </svg>
  );
}
