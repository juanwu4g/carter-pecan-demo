import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { supplyOrigins, seasonalCalendar, tradeShows } from "../data/data";
import InsightBox from "./InsightBox";

const fmtVol = (v) => `${(v / 1000000).toFixed(1)}M`;

const allMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const calendarRows = [
  { key: "northHarvest", color: "#2D5016", emoji: "🌿", months: [10, 11, 12] },
  { key: "southHarvest", color: "#5A7D2B", emoji: "🌿", months: [3, 4, 5] },
  { key: "peakExport", color: "#C4943B", emoji: "📦", months: [10, 11, 12, 1, 2] },
  { key: "cnyDemand", color: "#DC2626", emoji: "🎆", months: [1, 2] },
  { key: "processingLabel", color: "#9CA3AF", emoji: "🏭", months: allMonths },
];

export default function SupplySeasons({ t }) {
  const monthLabels = t.monthsFull;

  return (
    <div className="space-y-6">
      {/* Section A: Supply Origins */}
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

      {/* Section B: Seasonal Calendar */}
      <h2 className="text-xl font-bold text-green-primary mt-8">{t.seasonalTitle}</h2>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Month headers */}
          <div className="grid grid-cols-[200px_repeat(12,1fr)] gap-0 mb-2">
            <div></div>
            {allMonths.map((m) => (
              <div key={m} className="text-center text-xs font-medium text-gray-500 py-1">
                {monthLabels[m - 1]}
              </div>
            ))}
          </div>

          {/* Calendar rows */}
          {calendarRows.map((row) => (
            <div key={row.key} className="grid grid-cols-[200px_repeat(12,1fr)] gap-0 mb-1.5">
              <div className="text-xs font-medium text-gray-700 flex items-center pr-2 leading-tight">
                <span className="mr-1">{row.emoji}</span>
                <span className="truncate">{t[row.key]}</span>
              </div>
              {allMonths.map((m) => (
                <div key={m} className="px-0.5">
                  {row.months.includes(m) ? (
                    <div
                      className="h-7 rounded-sm"
                      style={{ backgroundColor: row.color, opacity: 0.85 }}
                    />
                  ) : (
                    <div className="h-7" />
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Trade Shows row */}
          <div className="grid grid-cols-[200px_repeat(12,1fr)] gap-0 mb-1.5">
            <div className="text-xs font-medium text-gray-700 flex items-center pr-2">
              <span className="mr-1">🌍</span>
              <span>{t.tradeShowsLabel}</span>
            </div>
            {allMonths.map((m) => {
              const show = tradeShows.find((s) => s.month === m);
              return (
                <div key={m} className="px-0.5 flex items-center justify-center">
                  {show ? (
                    <div className="relative group">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">
                        <span className="text-white text-[9px] font-bold">TS</span>
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        {show.name}{show.city ? ` (${show.city})` : ""}
                      </div>
                    </div>
                  ) : (
                    <div className="h-7" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <InsightBox text={t.supplyInsight} />
    </div>
  );
}
