import { useState } from "react";
import {
  ComposableMap, Geographies, Geography, Marker, Line,
} from "react-simple-maps";
import { mapSources, mapProcessing, mapDestinations, shipments } from "../data/data";
import InsightBox from "./InsightBox";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const processingCenter = [-84.5, 31.5];

// Major destinations that get text labels (skip smaller ones to avoid clutter)
const labeledDestinations = new Set(["China", "UAE", "Japan", "Netherlands"]);

function MapTooltip({ content, position }) {
  if (!content) return null;
  return (
    <div
      className="absolute bg-gray-800 text-white text-xs rounded-lg px-3 py-2 pointer-events-none z-30 max-w-[220px] shadow-lg whitespace-pre-line"
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

      {/* Map */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-green-primary mb-3">{t.mapTitle}</h3>
        <div className="relative map-container overflow-x-auto">
          <div className="min-w-[600px]">
            <ComposableMap
              projection="geoNaturalEarth1"
              projectionConfig={{ center: [20, 10], scale: 140 }}
              width={800}
              height={420}
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

              {/* Source markers (green) — larger with labels */}
              {mapSources.map((src) => (
                <Marker
                  key={`src-${src.name}`}
                  coordinates={[src.lon, src.lat]}
                  onMouseMove={(e) =>
                    handleMouseMove(e, `${src.name} · ${src.season}\n${src.volume}\n${src.varieties}`)
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
                    🌿 {src.name.split("(")[0].trim().split(" ").pop()}
                  </text>
                </Marker>
              ))}

              {/* Processing markers (gold) — larger with labels */}
              {mapProcessing.map((proc) => (
                <Marker
                  key={`proc-${proc.name}`}
                  coordinates={[proc.lon, proc.lat]}
                  onMouseMove={(e) =>
                    handleMouseMove(e, `🏭 ${proc.name}\n${proc.capabilities}`)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <circle r={8} fill="#C4943B" stroke="#fff" strokeWidth={2} className="cursor-pointer" />
                  <text
                    textAnchor="middle"
                    y={18}
                    style={{ fontFamily: "Inter, sans-serif", fill: "#C4943B", fontSize: "7px", fontWeight: 600 }}
                  >
                    🏭 {proc.name.includes("HQ") ? "Brundidge" : "Camilla"}
                  </text>
                </Marker>
              ))}

              {/* Destination markers (blue) — larger with selective labels */}
              {mapDestinations.map((dest) => {
                const shortName = dest.name.replace(" (dest)", "");
                return (
                  <Marker
                    key={`dest-${dest.name}`}
                    coordinates={[dest.lon, dest.lat]}
                    onMouseMove={(e) =>
                      handleMouseMove(e, `${shortName}\n${dest.revenue} · ${dest.volume}\n${dest.product}`)
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
                        📦 {shortName}
                      </text>
                    )}
                  </Marker>
                );
              })}
            </ComposableMap>
          </div>
          <MapTooltip content={tooltip.content} position={tooltip.position} />
        </div>

        {/* Legend */}
        <div className="mt-4 bg-gray-50 rounded-lg p-3 text-xs text-gray-600 space-y-1.5">
          <div className="flex flex-wrap gap-x-6 gap-y-1.5">
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-green-primary inline-block" /> 🌿 {t.legendSource} (4)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-gold inline-block" /> 🏭 {t.legendProcessing} (2)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-blue-500 inline-block" /> 📦 {t.legendDestination} (12)
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-gray-400">
            <span>── Green lines: Source → Processing</span>
            <span>--- Blue lines: Processing → Export</span>
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
