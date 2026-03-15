import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { marketPrices } from "../data/data";
import InsightBox from "./InsightBox";

const avg = marketPrices.reduce((s, p) => s + p.price, 0) / marketPrices.length;

const enriched = marketPrices.map((p) => ({
  ...p,
  pricePerLb: (p.price / 50).toFixed(2),
  vsAvg: (((p.price - avg) / avg) * 100).toFixed(0),
}));

export default function MarketPrices({ t }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-green-primary">{t.pricesTitle}</h2>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-green-primary mb-4">{t.priceComparison}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={marketPrices} margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis dataKey="city" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `$${v.toFixed(2)}`} />
            <Bar dataKey="price" radius={[4, 4, 0, 0]}>
              {marketPrices.map((entry, i) => (
                <Cell key={entry.city} fill={i === 0 ? "#C4943B" : "#2D5016"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-cream-dark overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-primary text-white">
              <th className="text-left px-4 py-3 font-medium">{t.city}</th>
              <th className="text-right px-4 py-3 font-medium">{t.price50lb}</th>
              <th className="text-right px-4 py-3 font-medium">{t.pricePerLb}</th>
              <th className="text-right px-4 py-3 font-medium">{t.vsAverage}</th>
              <th className="text-left px-4 py-3 font-medium">{t.source}</th>
            </tr>
          </thead>
          <tbody>
            {enriched.map((row, i) => (
              <tr key={row.city} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
                <td className="px-4 py-3 font-medium">{row.city}</td>
                <td className="px-4 py-3 text-right">${row.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-right">${row.pricePerLb}</td>
                <td className="px-4 py-3 text-right">
                  <span className={Number(row.vsAvg) >= 0 ? "text-green-700" : "text-red-600"}>
                    {Number(row.vsAvg) >= 0 ? "+" : ""}{row.vsAvg}%
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">USDA AMS</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InsightBox text={t.pricesInsight} />

      <div className="text-sm text-gray-500 italic px-1">
        {t.pricesNote}
      </div>
    </div>
  );
}
