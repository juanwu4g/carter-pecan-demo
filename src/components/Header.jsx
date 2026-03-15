export default function Header({ t, lang, setLang }) {
  return (
    <header className="bg-green-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            🥜 {t.title}
          </h1>
          <p className="text-sm text-green-100 opacity-80 mt-0.5">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-1 bg-green-dark rounded-lg p-1">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              lang === "en"
                ? "bg-gold text-green-dark"
                : "text-white hover:bg-green-light"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("es")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              lang === "es"
                ? "bg-gold text-green-dark"
                : "text-white hover:bg-green-light"
            }`}
          >
            ES
          </button>
        </div>
      </div>
    </header>
  );
}
