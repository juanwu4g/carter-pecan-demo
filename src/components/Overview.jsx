import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { revenueData, productMix } from "../data/data";

const fmt = (v) => `$${(v / 1000000).toFixed(2)}M`;
const fmtK = (v) => `$${(v / 1000).toFixed(0)}K`;

const summaryCards = (t) => [
  { label: t.totalRevenue, value: "$15.8M" },
  { label: t.totalVolume, value: "9.4M lbs" },
  { label: t.exportMarkets, value: `32 ${t.countries}` },
  { label: t.activeBuyers, value: "213" },
];

export default function Overview({ t, lang }) {
  const months = t.months;
  const chartData = revenueData.map((d, i) => ({ ...d, month: months[i] }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards(t).map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold text-green-primary mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
          <h3 className="text-lg font-semibold text-green-primary mb-4">{t.monthlyRevenue}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={fmtK} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [fmt(v), t.revenue || "Revenue"]} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2D5016"
                strokeWidth={2.5}
                dot={{ fill: "#2D5016", r: 4 }}
                activeDot={{ r: 6, fill: "#C4943B" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
          <h3 className="text-lg font-semibold text-green-primary mb-4">{t.salesByProduct}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productMix}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => `${name} ${value}%`}
                labelLine={{ stroke: "#999" }}
              >
                {productMix.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
