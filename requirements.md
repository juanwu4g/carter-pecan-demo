# Carter Pecan Wholesale Analytics Dashboard — Requirements Document

## Purpose
Build a demo wholesale analytics dashboard for Carter Pecan to demonstrate what an internal data platform could look like. This will be sent to Sally Arn (company owner) via a GitHub Pages link to showcase technical skills and understanding of the business.

## Tech Stack
- **Framework:** Vite + React
- **Charting:** Recharts
- **Styling:** Tailwind CSS
- **Deployment:** GitHub Pages (via `gh-pages` branch)
- **No backend needed** — all data is hardcoded (this is a demo)

## Design Direction
- **Color palette:** Dark green (#2D5016) as primary, gold/amber (#C4943B) as accent, cream/off-white (#FAF8F3) as background
- **Tone:** Professional, clean, minimal — NOT flashy startup aesthetic. Think agricultural/commodity trading platform
- **Font:** Use a serif font for headings (Georgia or similar), sans-serif for body text
- **Logo area:** Display "🥜 Carter Pecan — Wholesale Analytics" in the header
- **Subtitle in header:** "Demo Dashboard · Sample Data · Built by Juan Wu"

## Core Feature: Bilingual (English / Spanish)
- Add a language toggle button (EN | ES) in the top-right corner of the header
- ALL text in the dashboard must switch between English and Spanish
- Store translations in a simple JSON object, not a library like i18next
- Default language: English

## Pages / Tabs

### Tab 1: Overview
Summary cards at top:
- Total Revenue: $15.8M (sample)
- Total Volume: 9.4M lbs
- Export Markets: 32 countries
- Active Buyers: 213

Charts:
- **Monthly revenue trend** (line chart, 12 months: Mar-Feb)
- **Sales by product type** (pie chart)

Revenue data (use realistic seasonal pattern — pecan harvest is Oct-Dec so Q4 should be highest):
```
Mar: $980K, Apr: $1.05M, May: $1.2M, Jun: $890K, Jul: $760K, Aug: $680K,
Sep: $920K, Oct: $1.45M, Nov: $1.82M, Dec: $2.1M, Jan: $1.65M, Feb: $1.38M
```

Product mix:
```
Halves: 35%, Pieces: 25%, In-Shell: 20%, Granules: 10%, Pecan Oil: 5%, Roasted Snacks: 5%
```

### Tab 2: Supply Origins (采购来源)
Show where Carter Pecan sources pecans from. This is critical — Carter Pecan is unique because they source from ALL major pecan-growing regions.

**Table and bar chart showing:**

| Origin | Season | Volume (sample) | Key Varieties |
|--------|--------|-----------------|---------------|
| USA - Georgia | Oct-Dec | 3,200,000 lbs | Desirables, Pawnee, Stuart |
| USA - Other (AL, TX, NM) | Oct-Dec | 1,800,000 lbs | Western Schley, Wichita |
| Mexico (Chihuahua) | Oct-Dec | 2,100,000 lbs | Western, Wichita |
| Argentina (Catamarca) | Mar-May | 1,200,000 lbs | Various improved |
| South Africa | Mar-May | 1,100,000 lbs | Wichita, Navaho |

Include a visual insight box:
- EN: "💡 Carter Pecan sources from both hemispheres, enabling year-round supply. Northern Hemisphere (USA, Mexico) harvests Oct-Dec. Southern Hemisphere (Argentina, South Africa) harvests Mar-May."
- ES: "💡 Carter Pecan obtiene de ambos hemisferios, permitiendo suministro durante todo el año. Hemisferio Norte (EE.UU., México) cosecha Oct-Dic. Hemisferio Sur (Argentina, Sudáfrica) cosecha Mar-May."

### Tab 3: Export Markets (出口市场)
Show where Carter Pecan sells to. Based on real trade show participation and industry data.

**Table with columns:** Country, Region, Revenue (sample), Volume, Orders, Primary Product

Data (sample but realistic):
```
China         | Asia         | $3,800,000 | 2,500,000 lbs | 42 | In-Shell
Vietnam       | Asia         | $1,900,000 | 1,300,000 lbs | 30 | In-Shell
South Korea   | Asia         | $1,500,000 | 900,000 lbs   | 24 | Halves
UAE           | Middle East  | $1,200,000 | 750,000 lbs   | 20 | Halves, Pieces
India         | Asia         | $1,100,000 | 800,000 lbs   | 18 | In-Shell
Japan         | Asia         | $950,000   | 550,000 lbs   | 14 | Halves
Netherlands   | Europe       | $880,000   | 500,000 lbs   | 12 | Shelled (Halves, Pieces)
Germany       | Europe       | $780,000   | 440,000 lbs   | 11 | Shelled
Canada        | North America| $720,000   | 420,000 lbs   | 15 | Halves, Pieces
UK            | Europe       | $650,000   | 370,000 lbs   | 10 | Shelled
Mexico        | North America| $580,000   | 380,000 lbs   | 9  | In-Shell (for re-shelling)
Turkey        | Middle East  | $480,000   | 320,000 lbs   | 8  | In-Shell
```

**Bar chart:** Revenue by country (horizontal bars)
**Pie chart:** Revenue by region (Asia, Middle East, Europe, North America)

Insight box:
- EN: "💡 Asia accounts for 62% of export revenue, led by China. Middle East (UAE, Turkey) represents a growing market through consistent Gulfood participation since 2018."
- ES: "💡 Asia representa el 62% de los ingresos por exportación, liderado por China. Medio Oriente (EAU, Turquía) representa un mercado en crecimiento con participación consistente en Gulfood desde 2018."

### Tab 4: Customers (客户)
Top customers table. Use fictional but realistic company names.

| Customer | Country | Revenue | Orders | Last Order | Status |
|----------|---------|---------|--------|------------|--------|
| Shanghai Golden Nut Trading Co. | China | $1,650,000 | 16 | Feb 2026 | Active |
| Guangzhou Premium Foods Ltd. | China | $1,200,000 | 12 | Jan 2026 | Active |
| Hanoi Agri Import Co. | Vietnam | $980,000 | 11 | Feb 2026 | Active |
| Seoul Nut House Co., Ltd. | South Korea | $820,000 | 9 | Jan 2026 | Active |
| Dubai Gourmet Trading LLC | UAE | $760,000 | 8 | Dec 2025 | Active |
| Mumbai Dry Fruits International | India | $680,000 | 7 | Jan 2026 | Active |
| Tokyo Premium Nuts K.K. | Japan | $620,000 | 6 | Nov 2025 | Active |
| Amsterdam Nut Traders B.V. | Netherlands | $580,000 | 7 | Jan 2026 | Active |
| Vancouver Pecan Imports Inc. | Canada | $520,000 | 10 | Feb 2026 | Active |
| Hamburg Food Trading GmbH | Germany | $480,000 | 6 | Dec 2025 | Active |
| Istanbul Kuruyemis A.S. | Turkey | $380,000 | 5 | Oct 2025 | Inactive 90d |
| London Nut Company Ltd. | UK | $340,000 | 5 | Sep 2025 | Inactive 120d |

For inactive customers, show a yellow warning badge.

Alert box:
- EN: "⚠️ 2 customers inactive for 90+ days: Istanbul Kuruyemis A.S. (last order Oct 2025) and London Nut Company Ltd. (last order Sep 2025). Consider re-engagement outreach."
- ES: "⚠️ 2 clientes inactivos por más de 90 días: Istanbul Kuruyemis A.S. (último pedido Oct 2025) y London Nut Company Ltd. (último pedido Sep 2025). Considerar contacto de reactivación."

### Tab 5: Products (产品分析)
Product mix analysis.

**Pie chart:** Volume distribution by product type
**Horizontal bar chart:** Revenue by product type

Data:
```
Halves:          35% volume, $5,500,000 revenue
Pieces:          25% volume, $3,900,000 revenue
In-Shell:        20% volume, $3,100,000 revenue
Granules:        10% volume, $1,600,000 revenue
Pecan Oil:        5% volume, $780,000 revenue
Roasted Snacks:   5% volume, $920,000 revenue
```

Insight box:
- EN: "💡 Halves represent 35% of volume and command the highest margins. Roasted Snacks and Pecan Oil (10% combined) are the fastest-growing segments — key products for the upcoming DTC retail launch."
- ES: "💡 Las mitades representan el 35% del volumen con los márgenes más altos. Snacks Tostados y Aceite de Pecán (10% combinados) son los segmentos de mayor crecimiento — productos clave para el próximo lanzamiento DTC."

### Tab 6: Market Prices (市场价格)
**Based on real USDA data from January 2025 report.**

**Bar chart:** Price comparison across US wholesale markets

Data (real USDA data — Georgia pecans, 50 lb sacks):
```
San Francisco: $260.00
Los Angeles:   $190.00
Columbia, SC:  $175.00
Atlanta:       $160.00
New York:      $150.00
Chicago:       $125.00
```

**Table with columns:** City, Price (50lb sack), Price per lb, vs. Average, Source

Insight box:
- EN: "💡 San Francisco prices are 108% above Chicago for identical Georgia pecans. West Coast distribution could significantly improve margins. Data source: USDA AMS Specialty Crops Market News, January 2025."
- ES: "💡 Los precios en San Francisco son 108% superiores a Chicago para pecanes idénticos de Georgia. La distribución en la Costa Oeste podría mejorar significativamente los márgenes. Fuente: USDA AMS Specialty Crops Market News, Enero 2025."

Add a note at the bottom:
- EN: "This dashboard can be connected to USDA's free public API (MyMarketNews) for automatic price updates."
- ES: "Este panel puede conectarse a la API pública gratuita del USDA (MyMarketNews) para actualizaciones automáticas de precios."

## Footer
Show on all pages:
- EN: "Demo built by Juan Wu · Data is illustrative · Actual dashboard would use Carter Pecan's real trading data"
- ES: "Demo construido por Juan Wu · Los datos son ilustrativos · El panel real usaría datos reales de Carter Pecan"

## Responsive Design
- Must look good on desktop AND mobile (Sally will likely open it on her phone from WhatsApp)
- On mobile: tabs should become a scrollable horizontal strip
- Tables should be horizontally scrollable on small screens
- Charts should resize properly

## Deployment Instructions
After building:
1. `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. The URL should be something like: `juanwu4g.github.io/carter-pecan-demo`

## What NOT to include
- No login/auth (it's a demo)
- No backend/API calls (all data hardcoded)
- No localStorage
- No complex state management (useState is fine)
- No AI features yet (that's phase 2)
