"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlyDatum {
  month: string;
  inflow: number;
  outflow: number;
  net: number;
}

interface CategoryDatum {
  category: string;
  value: number;
}

// Warm-neutral palette tuned to dodge recharts' default rainbow.
const CAT_COLORS = [
  "#f4b728", // zcash yellow
  "#7a9b76", // sage
  "#c47b5a", // terracotta
  "#5f7a93", // dusty blue
  "#a98ec5", // muted lavender
  "#d4a574", // tan
  "#8d6e63", // soft brown
  "#9c9a91", // warm grey
];

export function MonthlyPLChart({ data }: { data: MonthlyDatum[] }) {
  // Chronological for the chart even though the table is reverse-sorted.
  const ordered = [...data].sort((a, b) => a.month.localeCompare(b.month));
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="h-72 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={ordered} margin={{ top: 12, right: 12, bottom: 0, left: -8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 4" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tick={{ fill: "currentColor" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tick={{ fill: "currentColor" }}
            tickFormatter={(v) => Math.abs(v as number).toLocaleString()}
          />
          <Tooltip
            cursor={{ fill: "rgba(127,127,127,0.06)" }}
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(v: number) => `${v.toLocaleString()} ZEC`}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} iconType="circle" />
          <Bar dataKey="inflow" name="Inflow" fill="#7a9b76" radius={[4, 4, 0, 0]} />
          <Bar dataKey="outflow" name="Outflow" fill="#c47b5a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// Per-contractor monthly-spend sparkline.
export function ContractorSparkline({ values }: { values: number[] }) {
  if (!values.length || values.every((v) => v === 0)) return null;
  const data = values.map((v, i) => ({ i, v }));
  return (
    <div className="h-7 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 2, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="cp-spark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c47b5a" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#c47b5a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke="#c47b5a"
            strokeWidth={1.5}
            fill="url(#cp-spark)"
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategorySplitChart({ data }: { data: CategoryDatum[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) {
    return (
      <div className="h-72 grid place-items-center text-sm text-neutral-500">
        No categorised transactions yet.
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 }}
      className="h-72 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            innerRadius={55}
            outerRadius={95}
            paddingAngle={2}
            stroke="var(--surface)"
            strokeWidth={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={CAT_COLORS[i % CAT_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(v: number, name) => [`${v.toLocaleString()} ZEC`, name]}
          />
          <Legend
            wrapperStyle={{ fontSize: 11 }}
            iconType="circle"
            verticalAlign="middle"
            align="right"
            layout="vertical"
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
