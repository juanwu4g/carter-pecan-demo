import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar,
} from "recharts";
import { revenueData, productMix, exportMarkets } from "../data/data";
import InsightBox from "./InsightBox";

const fmt = (v) => `$${(v / 1000000).toFixed(2)}M`;
const fmtK = (v) => `$${(v / 1000).toFixed(0)}K`;

const summaryCards = (t) => [
  { label: t.totalRevenue, value: "$15.8M", trend: "↑12%", trendColor: "text-green-600" },
  { label: t.totalVolume, value: "9.4M lbs", trend: "↑8%", trendColor: "text-green-600" },
  { label: t.exportMarkets, value: `32 ${t.countries}`, trend: "↑4", trendColor: "text-green-600" },
  { label: t.activeBuyers, value: "213", trend: "↑18", trendColor: "text-green-600" },
];

const top3Markets = exportMarkets.slice(0, 3);

const calendarMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const harvestN = [10, 11, 12];
const harvestS = [3, 4, 5];

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex flex-col gap-1.5 text-xs ml-2">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm inline-block flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-700">{entry.value} {productMix.find(p => p.name === entry.value)?.value}%</span>
        </div>
      ))}
    </div>
  );
};

export default function Overview({ t, lang, setActiveTab }) {
  const months = t.months;
  const chartData = revenueData.map((d, i) => ({ ...d, month: months[i] }));

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards(t).map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-3xl font-bold text-green-primary mt-1">{card.value}</p>
            <p className={`text-sm font-medium mt-1 ${card.trendColor}`}>{card.trend} vs last year</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
          <h3 className="text-lg font-semibold text-green-primary mb-4">{t.monthlyRevenue}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={fmtK} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [fmt(v), t.revenue]} />
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
                cx="40%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                nameKey="name"
              >
                {productMix.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                content={renderLegend}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Navigation Preview Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Card 1: Supply Chain */}
        <div
          onClick={() => setActiveTab("supplychain")}
          className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <h4 className="font-semibold text-green-primary mb-1">{t.supplyChainTitle || "Global Supply Chain"}</h4>
          <p className="text-xs text-gray-500 mb-3">4 source regions · 2 processing facilities · 30+ export markets</p>
          <div className="flex items-center justify-center gap-3 text-2xl py-2">
            <span>🌿</span>
            <span className="text-gray-300">→</span>
            <span>🏭</span>
            <span className="text-gray-300">→</span>
            <span>📦</span>
          </div>
        </div>

        {/* Card 2: Top Markets */}
        <div
          onClick={() => setActiveTab("markets")}
          className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <h4 className="font-semibold text-green-primary mb-1">{t.marketsTitle || "Top Export Markets"}</h4>
          <p className="text-xs text-gray-500 mb-3">Asia accounts for 62% of revenue</p>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={top3Markets} layout="vertical" margin={{ left: 0, right: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="country" width={80} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Bar dataKey="revenue" fill="#2D5016" radius={[0, 4, 4, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Card 3: Year-Round Supply */}
        <div
          onClick={() => setActiveTab("supply")}
          className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <h4 className="font-semibold text-green-primary mb-1">{t.seasonalTitle || "Year-Round Supply"}</h4>
          <p className="text-xs text-gray-500 mb-3">Dual-hemisphere sourcing · Oct-Dec & Mar-May harvests</p>
          <div className="space-y-1.5 py-2">
            <div className="flex gap-0.5">
              {calendarMonths.map((m) => (
                <div
                  key={`n-${m}`}
                  className="flex-1 h-4 rounded-sm"
                  style={{ backgroundColor: harvestN.includes(m) ? "#2D5016" : "#e5e5e5" }}
                />
              ))}
            </div>
            <div className="flex gap-0.5">
              {calendarMonths.map((m) => (
                <div
                  key={`s-${m}`}
                  className="flex-1 h-4 rounded-sm"
                  style={{ backgroundColor: harvestS.includes(m) ? "#5A7D2B" : "#e5e5e5" }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-gray-400 mt-1">
              <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
            </div>
          </div>
        </div>
      </div>

      <InsightBox text={t.overviewInsight} />
    </div>
  );
}
