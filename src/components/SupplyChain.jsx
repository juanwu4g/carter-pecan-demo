import { useState } from "react";
import {
  ComposableMap, Geographies, Geography, Marker, Line,
} from "react-simple-maps";
import { mapSources, mapProcessing, mapDestinations, shipments } from "../data/data";
import InsightBox from "./InsightBox";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const US_GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Combined processing center for world map (single dot)
const processingCenter = [-85.0, 31.5];

const labeledDestinations = new Set(["China", "UAE", "Japan", "Netherlands"]);

function MapTooltip({ content, position }) {
  if (!content) return null;
  return (
    <div
      className="absolute bg-gray-800 text-white text-xs rounded-lg px-3 py-2 pointer-events-none z-30 max-w-[240px] shadow-lg whitespace-pre-line"
      style={{ left: position.x + 10, top: position.y - 10 }}
    >
      {content}
    </div>
  );
}

const statusConfig = {
  shipped: { label: "shipped", color: "bg-green-100 text-green-800", dot: "🟢" },
  transit: { label: "inTransit", color: "bg-blue-100 text-blue-800", dot: "🔵" },
  processing: { label: "processingStatus", color: "bg-yellow-100 text-yellow-800", dot: "🟡" },
};

export default function SupplyChain({ t }) {
  const [tooltip, setTooltip] = useState({ content: null, position: { x: 0, y: 0 } });

  const handleMouseMove = (e, content) => {
    const rect = e.currentTarget.closest(".map-container")?.getBoundingClientRect();
    if (rect) {
      setTooltip({
        content,
        position: { x: e.clientX - rect.left, y: e.clientY - rect.top },
      });
    }
  };

  const handleMouseLeave = () => setTooltip({ content: null, position: { x: 0, y: 0 } });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-green-primary">{t.supplyChainTitle}</h2>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-green-primary mb-3">{t.mapTitle}</h3>

        {/* World Map (top) */}
        <div className="relative map-container overflow-x-auto">
          <div className="min-w-[600px]">
            <ComposableMap
              projection="geoNaturalEarth1"
              projectionConfig={{ center: [20, 10], scale: 140 }}
              width={800}
              height={400}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#E8E8E8"
                      stroke="#D0D0D0"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#D5D5D5", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Source → Processing arcs (green) */}
              {mapSources.map((src) => (
                <Line
                  key={`arc-src-${src.name}`}
                  from={[src.lon, src.lat]}
                  to={processingCenter}
                  stroke="#2D5016"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeDasharray="4 2"
                  style={{ opacity: 0.5 }}
                />
              ))}

              {/* Processing → Destination arcs (blue) */}
              {mapDestinations.map((dest) => (
                <Line
                  key={`arc-dest-${dest.name}`}
                  from={processingCenter}
                  to={[dest.lon, dest.lat]}
                  stroke="#3B82F6"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeDasharray="4 2"
                  style={{ opacity: 0.4 }}
                />
              ))}

              {/* Source markers (green) */}
              {mapSources.map((src) => {
                const shortName = src.name === "USA (GA, AL, TX, NM)" ? "USA" : src.name;
                return (
                  <Marker
                    key={`src-${src.name}`}
                    coordinates={[src.lon, src.lat]}
                    onMouseMove={(e) =>
                      handleMouseMove(e, `🌿 ${src.name}\n${src.season} · ${src.volume}\n${src.varieties}`)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    <circle r={8} fill="#2D5016" stroke="#fff" strokeWidth={2} className="cursor-pointer" />
                    <circle r={8} fill="#2D5016" opacity={0.3}>
                      <animate attributeName="r" from="8" to="18" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text
                      textAnchor="middle"
                      y={-14}
                      style={{ fontFamily: "Inter, sans-serif", fill: "#2D5016", fontSize: "8px", fontWeight: 600 }}
                    >
                      🌿 {shortName}
                    </text>
                  </Marker>
                );
              })}

              {/* Combined processing marker (gold — single dot on world map) */}
              <Marker
                coordinates={processingCenter}
                onMouseMove={(e) =>
                  handleMouseMove(e, "🏭 Processing (GA & AL)\nCamilla, GA · Brundidge, AL\nShelling, Roasting, Sorting, Export")
                }
                onMouseLeave={handleMouseLeave}
              >
                <circle r={8} fill="#C4943B" stroke="#fff" strokeWidth={2} className="cursor-pointer" />
                <text
                  textAnchor="middle"
                  y={18}
                  style={{ fontFamily: "Inter, sans-serif", fill: "#C4943B", fontSize: "8px", fontWeight: 600 }}
                >
                  🏭 Processing (GA & AL)
                </text>
              </Marker>

              {/* Destination markers (blue) */}
              {mapDestinations.map((dest) => {
                const shortName = dest.name.replace(" (dest)", "");
                return (
                  <Marker
                    key={`dest-${dest.name}`}
                    coordinates={[dest.lon, dest.lat]}
                    onMouseMove={(e) =>
                      handleMouseMove(e, `📦 ${shortName}\n${dest.revenue} · ${dest.volume}\n${dest.product}`)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    <circle r={6} fill="#3B82F6" stroke="#fff" strokeWidth={1.5} className="cursor-pointer" />
                    {labeledDestinations.has(shortName) && (
                      <text
                        textAnchor="middle"
                        y={-10}
                        style={{ fontFamily: "Inter, sans-serif", fill: "#3B82F6", fontSize: "7px", fontWeight: 600 }}
                      >
                        {shortName}
                      </text>
                    )}
                  </Marker>
                );
              })}
            </ComposableMap>
          </div>
          <MapTooltip content={tooltip.content} position={tooltip.position} />
        </div>

        {/* Bottom section: US Inset + Flow Description */}
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          {/* US Southeast Inset Map */}
          <div className="border border-cream-dark rounded-lg p-3">
            <h4 className="text-sm font-semibold text-green-primary mb-2">US Processing Facilities (Detail View)</h4>
            <div className="relative map-container">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [-84, 31.8], scale: 4000 }}
                width={400}
                height={250}
                style={{ width: "100%", height: "auto" }}
              >
                <Geographies geography={US_GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#EFEFEF"
                        stroke="#CCC"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#E0E0E0", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Line between facilities */}
                <Line
                  from={[-84.21, 31.23]}
                  to={[-85.82, 31.72]}
                  stroke="#C4943B"
                  strokeWidth={2}
                  strokeDasharray="4 2"
                  style={{ opacity: 0.6 }}
                />

                {/* Georgia Orchards (green) */}
                <Marker
                  coordinates={[-83.5, 31.5]}
                  onMouseMove={(e) => handleMouseMove(e, "🌿 Georgia Pecan Orchards\nPrimary US growing region\n3,200,000 lbs annually")}
                  onMouseLeave={handleMouseLeave}
                >
                  <circle r={7} fill="#2D5016" stroke="#fff" strokeWidth={2} className="cursor-pointer" />
                  <text
                    textAnchor="start"
                    x={12}
                    y={4}
                    style={{ fontFamily: "Inter, sans-serif", fill: "#2D5016", fontSize: "9px", fontWeight: 600 }}
                  >
                    🌿 Georgia Orchards
                  </text>
                </Marker>

                {/* Carter Nut Co. — Camilla, GA (gold) */}
                <Marker
                  coordinates={[-84.21, 31.23]}
                  onMouseMove={(e) => handleMouseMove(e, "🏭 Carter Nut Co. — Camilla, GA\nShelling · Roasting · Cold Storage\n137,000 sq ft")}
                  onMouseLeave={handleMouseLeave}
                >
                  <circle r={7} fill="#C4943B" stroke="#fff" strokeWidth={2} className="cursor-pointer" />
                  <text
                    textAnchor="end"
                    x={-12}
                    y={-8}
                    style={{ fontFamily: "Inter, sans-serif", fill: "#C4943B", fontSize: "8px", fontWeight: 600 }}
                  >
                    🏭 Carter Nut Co.
                  </text>
                  <text
                    textAnchor="end"
                    x={-12}
                    y={2}
                    style={{ fontFamily: "Inter, sans-serif", fill: "#999", fontSize: "7px" }}
                  >
                    Camilla, GA
                  </text>
                </Marker>

                {/* Carter Pecan HQ — Brundidge, AL (gold) */}
                <Marker
                  coordinates={[-85.82, 31.72]}
                  onMouseMove={(e) => handleMouseMove(e, "🏭 Carter Pecan HQ — Brundidge, AL\nSorting · Grading · Export Packaging")}
                  onMouseLeave={handleMouseLeave}
                >
                  <circle r={7} fill="#C4943B" stroke="#fff" strokeWidth={2} className="cursor-pointer" />
                  <text
                    textAnchor="end"
                    x={-12}
                    y={-8}
                    style={{ fontFamily: "Inter, sans-serif", fill: "#C4943B", fontSize: "8px", fontWeight: 600 }}
                  >
                    🏭 Carter Pecan HQ
                  </text>
                  <text
                    textAnchor="end"
                    x={-12}
                    y={2}
                    style={{ fontFamily: "Inter, sans-serif", fill: "#999", fontSize: "7px" }}
                  >
                    Brundidge, AL
                  </text>
                </Marker>
              </ComposableMap>
              <MapTooltip content={tooltip.content} position={tooltip.position} />
            </div>
          </div>

          {/* Supply Chain Flow Description */}
          <div className="border border-cream-dark rounded-lg p-4 text-sm">
            <h4 className="font-semibold text-gray-800 tracking-wide text-xs uppercase mb-4">Supply Chain Flow</h4>

            {/* Source Regions */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-green-primary inline-block flex-shrink-0" />
                <span className="font-semibold text-green-primary text-xs">Source Regions (4)</span>
              </div>
              <div className="ml-5 space-y-0.5 text-xs text-gray-600">
                <p>🌿 USA (Georgia, Alabama, Texas, New Mexico) — Oct-Dec</p>
                <p>🌿 Mexico (Chihuahua) — Oct-Dec</p>
                <p>🌿 Argentina (Catamarca) — Mar-May</p>
                <p>🌿 South Africa — Mar-May</p>
              </div>
            </div>

            <div className="ml-5 text-gray-300 text-lg leading-none mb-2">↓</div>

            {/* Processing */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-gold inline-block flex-shrink-0" />
                <span className="font-semibold text-amber-700 text-xs">Processing Facilities (2)</span>
              </div>
              <div className="ml-5 space-y-1 text-xs text-gray-600">
                <div>
                  <p className="font-medium">🏭 Carter Nut Company — Camilla, GA</p>
                  <p className="text-gray-400 ml-5">Shelling, Roasting, Cold Storage, Retail Packaging</p>
                </div>
                <div>
                  <p className="font-medium">🏭 Carter Pecan HQ — Brundidge, AL</p>
                  <p className="text-gray-400 ml-5">Sorting, Grading, Export Packaging</p>
                </div>
              </div>
            </div>

            <div className="ml-5 text-gray-300 text-lg leading-none mb-2">↓</div>

            {/* Destinations */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block flex-shrink-0" />
                <span className="font-semibold text-blue-600 text-xs">Export Destinations (30+ countries)</span>
              </div>
              <div className="ml-5 space-y-0.5 text-xs text-gray-600">
                <p>📦 Asia: China, Vietnam, South Korea, Japan, India</p>
                <p>📦 Middle East: UAE, Turkey</p>
                <p>📦 Europe: Netherlands, Germany, UK</p>
                <p>📦 North America: Canada, Mexico</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipment Tracker */}
      <h3 className="text-lg font-semibold text-green-primary">{t.shipmentTitle}</h3>
      <div className="bg-white rounded-xl shadow-sm border border-cream-dark overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-primary text-white">
              <th className="text-left px-4 py-3 font-medium">{t.shipmentId}</th>
              <th className="text-left px-4 py-3 font-medium">{t.origin}</th>
              <th className="text-left px-4 py-3 font-medium">{t.product}</th>
              <th className="text-right px-4 py-3 font-medium">{t.volume}</th>
              <th className="text-left px-4 py-3 font-medium">{t.processing}</th>
              <th className="text-left px-4 py-3 font-medium">{t.destination}</th>
              <th className="text-left px-4 py-3 font-medium">{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((row, i) => {
              const sc = statusConfig[row.status];
              return (
                <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
                  <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
                  <td className="px-4 py-3">{row.origin}</td>
                  <td className="px-4 py-3">{row.product}</td>
                  <td className="px-4 py-3 text-right">{row.volume}</td>
                  <td className="px-4 py-3 text-gray-600">{row.processing}</td>
                  <td className="px-4 py-3">{row.destination}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sc.color}`}>
                      {sc.dot} {t[sc.label]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <InsightBox text={t.supplyChainInsight} />
    </div>
  );
}
