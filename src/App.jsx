import { useState } from "react";
import translations from "./data/translations";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import Footer from "./components/Footer";
import Overview from "./components/Overview";
import SupplySeasons from "./components/SupplySeasons";
import MarketsCustomers from "./components/MarketsCustomers";
import Products from "./components/Products";
import SupplyChain from "./components/SupplyChain";
import IndustryInsights from "./components/IndustryInsights";
import MarketPrices from "./components/MarketPrices";

function App() {
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("overview");
  const t = translations[lang];

  const renderTab = () => {
    switch (activeTab) {
      case "overview": return <Overview t={t} lang={lang} setActiveTab={setActiveTab} />;
      case "supply": return <SupplySeasons t={t} />;
      case "markets": return <MarketsCustomers t={t} />;
      case "products": return <Products t={t} />;
      case "supplychain": return <SupplyChain t={t} />;
      case "insights": return <IndustryInsights t={t} />;
      case "prices": return <MarketPrices t={t} />;
      default: return <Overview t={t} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header t={t} lang={lang} setLang={setLang} />
      <TabBar t={t} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {renderTab()}
      </main>
      <Footer t={t} />
    </div>
  );
}

export default App;
