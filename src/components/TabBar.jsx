const tabs = [
  { key: "overview", labelKey: "tabOverview" },
  { key: "supply", labelKey: "tabSupply" },
  { key: "markets", labelKey: "tabMarkets" },
  { key: "products", labelKey: "tabProducts" },
  { key: "supplychain", labelKey: "tabSupplyChain" },
  { key: "insights", labelKey: "tabInsights" },
  { key: "prices", labelKey: "tabPrices" },
];

export default function TabBar({ t, activeTab, setActiveTab }) {
  return (
    <nav className="bg-white border-b border-cream-dark sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-1 py-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-lg transition-colors ${
                activeTab === tab.key
                  ? "bg-green-primary text-white"
                  : "text-gray-600 hover:bg-cream-dark hover:text-green-primary"
              }`}
            >
              {t[tab.labelKey]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
