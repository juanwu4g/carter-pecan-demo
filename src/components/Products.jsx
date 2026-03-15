import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { products } from "../data/data";
import InsightBox from "./InsightBox";

const fmt = (v) => `$${(v / 1000000).toFixed(1)}M`;

export default function Products({ t }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-green-primary">{t.productsTitle}</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
          <h3 className="text-lg font-semibold text-green-primary mb-4">{t.volumeDistribution}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={products}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="volumePct"
                nameKey="name"
                label={({ name, volumePct }) => `${name} ${volumePct}%`}
                labelLine={{ stroke: "#999" }}
              >
                {products.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
          <h3 className="text-lg font-semibold text-green-primary mb-4">{t.revenueByProduct}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={products} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis type="number" tickFormatter={fmt} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
              <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                {products.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <InsightBox text={t.productsInsight} />
    </div>
  );
}
