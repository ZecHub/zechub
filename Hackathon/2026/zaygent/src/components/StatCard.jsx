import { COLORS } from "../constants/colors";

export default function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: COLORS.bgCard,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: "12px 14px",
    }}>
      <div style={{ fontSize: 9, color: COLORS.textSecondary, letterSpacing: 1, marginBottom: 4 }}>
        {label.toUpperCase()}
      </div>
      <div style={{ fontSize: 18, fontWeight: 600, color: color || COLORS.textPrimary }}>
        {value}
      </div>
    </div>
  );
}
