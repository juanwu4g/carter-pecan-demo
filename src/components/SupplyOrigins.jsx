import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { supplyOrigins } from "../data/data";
import InsightBox from "./InsightBox";

const fmtVol = (v) => `${(v / 1000000).toFixed(1)}M`;

export default function SupplyOrigins({ t }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-green-primary">{t.supplyTitle}</h2>

      <div className="bg-white rounded-xl shadow-sm border border-cream-dark overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-primary text-white">
              <th className="text-left px-4 py-3 font-medium">{t.origin}</th>
              <th className="text-left px-4 py-3 font-medium">{t.season}</th>
              <th className="text-right px-4 py-3 font-medium">{t.volume}</th>
              <th className="text-left px-4 py-3 font-medium">{t.keyVarieties}</th>
            </tr>
          </thead>
          <tbody>
            {supplyOrigins.map((row, i) => (
              <tr key={row.origin} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
                <td className="px-4 py-3 font-medium">{row.origin}</td>
                <td className="px-4 py-3">{row.season}</td>
                <td className="px-4 py-3 text-right">{row.volume.toLocaleString()} lbs</td>
                <td className="px-4 py-3 text-gray-600">{row.varieties}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-green-primary mb-4">{t.volumeByOrigin}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={supplyOrigins} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis type="number" tickFormatter={fmtVol} tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="origin" width={160} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => `${v.toLocaleString()} lbs`} />
            <Bar dataKey="volume" fill="#2D5016" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightBox text={t.supplyInsight} />
    </div>
  );
}
