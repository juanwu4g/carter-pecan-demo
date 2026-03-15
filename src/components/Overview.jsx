import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar,
} from "recharts";
import {
  ComposableMap, Geographies, Geography, Marker,
} from "react-simple-maps";
import { revenueData, productMix, exportMarkets, mapSources, mapProcessing } from "../data/data";
import InsightBox from "./InsightBox";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const fmt = (v) => `$${(v / 1000000).toFixed(2)}M`;
const fmtK = (v) => `$${(v / 1000).toFixed(0)}K`;

const summaryCards = (t) => [
  { label: t.totalRevenue, value: "$15.8M", trend: "↑12%", trendColor: "text-green-600" },
  { label: t.totalVolume, value: "9.4M lbs", trend: "↑8%", trendColor: "text-green-600" },
  { label: t.exportMarkets, value: `32 ${t.countries}`, trend: "↑4", trendColor: "text-green-600" },
  { label: t.activeBuyers, value: "213", trend: "↑18", trendColor: "text-green-600" },
];

const top3Markets = [
  { country: "China", label: "🇨🇳 China", revenue: 3800000 },
  { country: "Saudi Arabia", label: "🇸🇦 Saudi Arabia", revenue: 1400000 },
  { country: "Taiwan", label: "🇹🇼 Taiwan", revenue: 1100000 },
];

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

const renderBarLabel = (props) => {
  const { x, y, width, value } = props;
  return (
    <text x={x + width + 4} y={y + 10} fill="#2D5016" fontSize={10} fontWeight={600}>
      ${(value / 1000000).toFixed(1)}M
    </text>
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
        {/* Card 1: Mini World Map → Supply Chain */}
        <div
          onClick={() => setActiveTab("supplychain")}
          className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <h4 className="font-semibold text-green-primary mb-0.5">{t.supplyChainTitle}</h4>
          <p className="text-xs text-gray-500 mb-2">4 source regions · 2 facilities · 30+ markets</p>
          <div className="bg-white rounded overflow-hidden" style={{ height: 120 }}>
            <ComposableMap
              projection="geoNaturalEarth1"
              projectionConfig={{ center: [20, 10], scale: 100 }}
              width={400}
              height={200}
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#E8E8E8"
                      stroke="#D6D6D6"
                      strokeWidth={0.3}
                      style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                    />
                  ))
                }
              </Geographies>
              {mapSources.map((src) => (
                <Marker key={`ms-${src.name}`} coordinates={[src.lon, src.lat]}>
                  <circle r={4} fill="#2D5016" stroke="#fff" strokeWidth={1} />
                </Marker>
              ))}
              {mapProcessing.map((proc) => (
                <Marker key={`mp-${proc.name}`} coordinates={[proc.lon, proc.lat]}>
                  <circle r={4} fill="#C4943B" stroke="#fff" strokeWidth={1} />
                </Marker>
              ))}
            </ComposableMap>
          </div>
        </div>

        {/* Card 2: Top Markets → Markets & Customers */}
        <div
          onClick={() => setActiveTab("markets")}
          className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <h4 className="font-semibold text-green-primary mb-0.5">{t.marketsTitle}</h4>
          <p className="text-xs text-gray-500 mb-2">Asia accounts for 62% of revenue</p>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={top3Markets} layout="vertical" margin={{ left: 5, right: 50 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="label" width={85} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Bar dataKey="revenue" fill="#2D5016" radius={[0, 4, 4, 0]} barSize={18} label={renderBarLabel} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Card 3: Seasonal Calendar → Supply & Seasons */}
        <div
          onClick={() => setActiveTab("supply")}
          className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <h4 className="font-semibold text-green-primary mb-0.5">{t.seasonalTitle}</h4>
          <p className="text-xs text-gray-500 mb-3">Dual-hemisphere · Oct-Dec & Mar-May harvests</p>
          <div className="space-y-3 py-2">
            {/* Northern Harvest bar */}
            <div>
              <div className="text-[10px] font-medium text-gray-600 mb-1">Northern Harvest</div>
              <div className="flex h-5 rounded bg-gray-100 overflow-hidden">
                <div style={{ width: "75%" }} />
                <div style={{ width: "25%" }} className="bg-green-primary rounded-r" />
              </div>
            </div>
            {/* Southern Harvest bar */}
            <div>
              <div className="text-[10px] font-medium text-gray-600 mb-1">Southern Harvest</div>
              <div className="flex h-5 rounded bg-gray-100 overflow-hidden">
                <div style={{ width: "16.6%" }} />
                <div className="rounded" style={{ width: "25%", backgroundColor: "#5A7D2B" }} />
                <div style={{ width: "58.4%" }} />
              </div>
            </div>
            {/* Month axis */}
            <div className="flex justify-between text-[9px] text-gray-400">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
          </div>
        </div>
      </div>

      <InsightBox text={t.overviewInsight} />
    </div>
  );
}
