import { chains } from "../constants/colors";

export default function Badge({ chain }) {
  const c = chains[chain] || chains.BSC;
  return (
    <span style={{
      background: c.color + "22",
      color: c.color,
      border: `1px solid ${c.color}44`,
      borderRadius: 4,
      padding: "1px 6px",
      fontSize: 10,
      fontFamily: "monospace",
      fontWeight: 700,
      letterSpacing: 1,
    }}>
      {c.label}
    </span>
  );
}
