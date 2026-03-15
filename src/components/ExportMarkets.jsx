import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { exportMarkets } from "../data/data";
import InsightBox from "./InsightBox";

const fmt = (v) => `$${(v / 1000000).toFixed(1)}M`;

const regionColors = {
  Asia: "#2D5016",
  "Middle East": "#C4943B",
  Europe: "#3D6B1E",
  "North America": "#D4A94E",
};

export default function ExportMarkets({ t }) {
  const regionData = Object.entries(
    exportMarkets.reduce((acc, m) => {
      acc[m.region] = (acc[m.region] || 0) + m.revenue;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-green-primary">{t.exportsTitle}</h2>

      <div className="bg-white rounded-xl shadow-sm border border-cream-dark overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-primary text-white">
              <th className="text-left px-4 py-3 font-medium">{t.country}</th>
              <th className="text-left px-4 py-3 font-medium">{t.region}</th>
              <th className="text-right px-4 py-3 font-medium">{t.revenue}</th>
              <th className="text-right px-4 py-3 font-medium">{t.volume}</th>
              <th className="text-right px-4 py-3 font-medium">{t.orders}</th>
              <th className="text-left px-4 py-3 font-medium">{t.primaryProduct}</th>
            </tr>
          </thead>
          <tbody>
            {exportMarkets.map((row, i) => (
              <tr key={row.country} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
                <td className="px-4 py-3 font-medium">{row.country}</td>
                <td className="px-4 py-3">{row.region}</td>
                <td className="px-4 py-3 text-right">${row.revenue.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">{row.volume.toLocaleString()} lbs</td>
                <td className="px-4 py-3 text-right">{row.orders}</td>
                <td className="px-4 py-3 text-gray-600">{row.product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
          <h3 className="text-lg font-semibold text-green-primary mb-4">{t.revenueByCountry}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={exportMarkets} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis type="number" tickFormatter={fmt} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="country" width={100} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#2D5016" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
          <h3 className="text-lg font-semibold text-green-primary mb-4">{t.revenueByRegion}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={regionData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: "#999" }}
              >
                {regionData.map((entry) => (
                  <Cell key={entry.name} fill={regionColors[entry.name] || "#999"} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <InsightBox text={t.exportsInsight} />
    </div>
  );
}
