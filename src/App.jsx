import { useState } from "react";
import translations from "./data/translations";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import Footer from "./components/Footer";
import Overview from "./components/Overview";
import SupplyOrigins from "./components/SupplyOrigins";
import ExportMarkets from "./components/ExportMarkets";
import Customers from "./components/Customers";
import Products from "./components/Products";
import MarketPrices from "./components/MarketPrices";

function App() {
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("overview");
  const t = translations[lang];

  const renderTab = () => {
    switch (activeTab) {
      case "overview": return <Overview t={t} lang={lang} />;
      case "supply": return <SupplyOrigins t={t} />;
      case "exports": return <ExportMarkets t={t} />;
      case "customers": return <Customers t={t} />;
      case "products": return <Products t={t} />;
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
