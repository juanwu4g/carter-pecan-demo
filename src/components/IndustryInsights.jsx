import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { tariffData, competitors, starRatings } from "../data/data";
import InsightBox from "./InsightBox";

const stars = (filled, total = 5) =>
  "★".repeat(filled) + "☆".repeat(total - filled);

export default function IndustryInsights({ t }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-green-primary">{t.insightsTitle}</h2>

      {/* Section A: China Tariff Impact */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-green-primary mb-4">{t.tariffTitle}</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={tariffData} margin={{ top: 20, right: 30, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis
              tickFormatter={(v) => `$${v}M`}
              tick={{ fontSize: 12 }}
              domain={[0, 150]}
            />
            <Tooltip formatter={(v) => `$${v}M`} labelFormatter={(l) => `Year: ${l}`} />
            <ReferenceLine
              x={2018}
              stroke="#DC2626"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{
                value: t.tariffAnnotation2018,
                position: "top",
                fill: "#DC2626",
                fontSize: 10,
                fontWeight: 600,
              }}
            />
            <ReferenceLine
              x={2020}
              stroke="#2D5016"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{
                value: t.tariffAnnotation2020,
                position: "top",
                fill: "#2D5016",
                fontSize: 10,
                fontWeight: 600,
              }}
            />
            <ReferenceLine
              x={2024}
              stroke="#EA580C"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{
                value: t.tariffAnnotation2024,
                position: "top",
                fill: "#EA580C",
                fontSize: 10,
                fontWeight: 600,
              }}
            />
            <Line
              type="monotone"
              dataKey="exports"
              stroke="#2D5016"
              strokeWidth={2.5}
              dot={{ fill: "#2D5016", r: 4 }}
              activeDot={{ r: 6, fill: "#C4943B" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <InsightBox text={t.tariffSummary} />

      {/* Section B: Competitor Landscape */}
      <h2 className="text-xl font-bold text-green-primary mt-8">{t.competitorTitle}</h2>

      <div className="bg-white rounded-xl shadow-sm border border-cream-dark overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-primary text-white">
              <th className="text-left px-4 py-3 font-medium">{t.company}</th>
              <th className="text-left px-4 py-3 font-medium">{t.founded}</th>
              <th className="text-left px-4 py-3 font-medium">{t.location}</th>
              <th className="text-left px-4 py-3 font-medium">{t.sourceRegions}</th>
              <th className="text-left px-4 py-3 font-medium">{t.exportReach}</th>
              <th className="text-left px-4 py-3 font-medium">{t.keyStrength}</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((row, i) => (
              <tr
                key={row.name}
                className={
                  row.highlight
                    ? "bg-green-50 font-semibold"
                    : i % 2 === 0
                    ? "bg-white"
                    : "bg-cream"
                }
              >
                <td className="px-4 py-3">{row.highlight ? `★ ${row.name}` : row.name}</td>
                <td className="px-4 py-3">{row.founded}</td>
                <td className="px-4 py-3">{row.location}</td>
                <td className="px-4 py-3">{row.sourceRegions}</td>
                <td className="px-4 py-3">{row.exportReach}</td>
                <td className="px-4 py-3 text-gray-600 max-w-[250px]">{row.keyStrength}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Star Ratings */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-green-primary mb-4">{t.ratingsTitle}</h3>
        <div className="space-y-3">
          {starRatings.map((r) => (
            <div key={r.category} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center text-sm">
              <span className="font-medium text-gray-700">{r.category}</span>
              <span className="text-amber-500 tracking-wider font-mono" title={`${t.carterPecan}: ${r.carter}/5`}>
                {stars(r.carter)}
              </span>
              <span className="text-gray-400 tracking-wider font-mono" title={`${t.industryAvg}: ${r.avg}/5`}>
                {stars(r.avg)}
              </span>
            </div>
          ))}
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 text-xs text-gray-500 mt-2 border-t pt-2">
            <span></span>
            <span className="text-center">{t.carterPecan}</span>
            <span className="text-center">{t.industryAvg}</span>
          </div>
        </div>
      </div>

      <InsightBox text={t.competitorInsight} />
    </div>
  );
}
