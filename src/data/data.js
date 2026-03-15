export const revenueData = [
  { month: "Mar", revenue: 980000 },
  { month: "Apr", revenue: 1050000 },
  { month: "May", revenue: 1200000 },
  { month: "Jun", revenue: 890000 },
  { month: "Jul", revenue: 760000 },
  { month: "Aug", revenue: 680000 },
  { month: "Sep", revenue: 920000 },
  { month: "Oct", revenue: 1450000 },
  { month: "Nov", revenue: 1820000 },
  { month: "Dec", revenue: 2100000 },
  { month: "Jan", revenue: 1650000 },
  { month: "Feb", revenue: 1380000 },
];

export const productMix = [
  { name: "Halves", value: 35, color: "#2D5016" },
  { name: "Pieces", value: 25, color: "#3D6B1E" },
  { name: "In-Shell", value: 20, color: "#C4943B" },
  { name: "Granules", value: 10, color: "#D4A94E" },
  { name: "Pecan Oil", value: 5, color: "#8B6914" },
  { name: "Roasted Snacks", value: 5, color: "#5A7D2B" },
];

export const supplyOrigins = [
  { origin: "USA - Georgia", season: "Oct-Dec", volume: 3200000, varieties: "Desirables, Pawnee, Stuart" },
  { origin: "Mexico (Chihuahua)", season: "Oct-Dec", volume: 2100000, varieties: "Western, Wichita" },
  { origin: "USA - Other (AL, TX, NM)", season: "Oct-Dec", volume: 1800000, varieties: "Western Schley, Wichita" },
  { origin: "Argentina (Catamarca)", season: "Mar-May", volume: 1200000, varieties: "Various improved" },
  { origin: "South Africa", season: "Mar-May", volume: 1100000, varieties: "Wichita, Navaho" },
];

export const exportMarkets = [
  { country: "China", region: "Asia", revenue: 3800000, volume: 2500000, orders: 42, product: "In-Shell" },
  { country: "Vietnam", region: "Asia", revenue: 1900000, volume: 1300000, orders: 30, product: "In-Shell" },
  { country: "South Korea", region: "Asia", revenue: 1500000, volume: 900000, orders: 24, product: "Halves" },
  { country: "UAE", region: "Middle East", revenue: 1200000, volume: 750000, orders: 20, product: "Halves, Pieces" },
  { country: "India", region: "Asia", revenue: 1100000, volume: 800000, orders: 18, product: "In-Shell" },
  { country: "Japan", region: "Asia", revenue: 950000, volume: 550000, orders: 14, product: "Halves" },
  { country: "Netherlands", region: "Europe", revenue: 880000, volume: 500000, orders: 12, product: "Shelled" },
  { country: "Germany", region: "Europe", revenue: 780000, volume: 440000, orders: 11, product: "Shelled" },
  { country: "Canada", region: "North America", revenue: 720000, volume: 420000, orders: 15, product: "Halves, Pieces" },
  { country: "UK", region: "Europe", revenue: 650000, volume: 370000, orders: 10, product: "Shelled" },
  { country: "Mexico", region: "North America", revenue: 580000, volume: 380000, orders: 9, product: "In-Shell (re-shelling)" },
  { country: "Turkey", region: "Middle East", revenue: 480000, volume: 320000, orders: 8, product: "In-Shell" },
];

export const customers = [
  { name: "Shanghai Golden Nut Trading Co.", country: "China", revenue: 1650000, orders: 16, lastOrder: "Feb 2026", status: "active" },
  { name: "Guangzhou Premium Foods Ltd.", country: "China", revenue: 1200000, orders: 12, lastOrder: "Jan 2026", status: "active" },
  { name: "Hanoi Agri Import Co.", country: "Vietnam", revenue: 980000, orders: 11, lastOrder: "Feb 2026", status: "active" },
  { name: "Seoul Nut House Co., Ltd.", country: "South Korea", revenue: 820000, orders: 9, lastOrder: "Jan 2026", status: "active" },
  { name: "Dubai Gourmet Trading LLC", country: "UAE", revenue: 760000, orders: 8, lastOrder: "Dec 2025", status: "active" },
  { name: "Mumbai Dry Fruits International", country: "India", revenue: 680000, orders: 7, lastOrder: "Jan 2026", status: "active" },
  { name: "Tokyo Premium Nuts K.K.", country: "Japan", revenue: 620000, orders: 6, lastOrder: "Nov 2025", status: "active" },
  { name: "Amsterdam Nut Traders B.V.", country: "Netherlands", revenue: 580000, orders: 7, lastOrder: "Jan 2026", status: "active" },
  { name: "Vancouver Pecan Imports Inc.", country: "Canada", revenue: 520000, orders: 10, lastOrder: "Feb 2026", status: "active" },
  { name: "Hamburg Food Trading GmbH", country: "Germany", revenue: 480000, orders: 6, lastOrder: "Dec 2025", status: "active" },
  { name: "Istanbul Kuruyemis A.S.", country: "Turkey", revenue: 380000, orders: 5, lastOrder: "Oct 2025", status: "inactive", inactiveDays: "90d" },
  { name: "London Nut Company Ltd.", country: "UK", revenue: 340000, orders: 5, lastOrder: "Sep 2025", status: "inactive", inactiveDays: "120d" },
];

export const products = [
  { name: "Halves", volumePct: 35, revenue: 5500000, color: "#2D5016" },
  { name: "Pieces", volumePct: 25, revenue: 3900000, color: "#3D6B1E" },
  { name: "In-Shell", volumePct: 20, revenue: 3100000, color: "#C4943B" },
  { name: "Granules", volumePct: 10, revenue: 1600000, color: "#D4A94E" },
  { name: "Pecan Oil", volumePct: 5, revenue: 780000, color: "#8B6914" },
  { name: "Roasted Snacks", volumePct: 5, revenue: 920000, color: "#5A7D2B" },
];

export const marketPrices = [
  { city: "San Francisco", price: 260.00 },
  { city: "Los Angeles", price: 190.00 },
  { city: "Columbia, SC", price: 175.00 },
  { city: "Atlanta", price: 160.00 },
  { city: "New York", price: 150.00 },
  { city: "Chicago", price: 125.00 },
];

export const tariffData = [
  { year: 2015, exports: 135 },
  { year: 2016, exports: 120 },
  { year: 2017, exports: 110 },
  { year: 2018, exports: 45 },
  { year: 2019, exports: 38 },
  { year: 2020, exports: 55 },
  { year: 2021, exports: 65 },
  { year: 2022, exports: 50 },
  { year: 2023, exports: 60 },
  { year: 2024, exports: 55 },
  { year: 2025, exports: 58 },
];

export const competitors = [
  { name: "Carter Pecan", founded: "2012", location: "AL & GA", sourceRegions: "USA, Mexico, Argentina, South Africa (4)", exportReach: "30+ countries, 5 offices", keyStrength: "Only company sourcing from ALL 4 major regions; dual-hemisphere", highlight: true },
  { name: "South Georgia Pecan Co.", founded: "1913", location: "GA & TX", sourceRegions: "USA (GA, TX)", exportReach: "Domestic + Intl", keyStrength: "Century of experience; large processing; multi-nut" },
  { name: "Stahmanns Pecans", founded: "1932", location: "NM", sourceRegions: "USA (NM only, estate-grown)", exportReach: "Wholesale Intl", keyStrength: "Largest single farm (3,200 acres, 8-9M lbs/yr)" },
  { name: "National Pecan Co.", founded: "—", location: "CA (Diamond Foods)", sourceRegions: "USA (multiple states)", exportReach: "Domestic + Intl", keyStrength: "Largest shelling capacity; value-added ingredients" },
  { name: "Hudson Pecan Co.", founded: "—", location: "GA", sourceRegions: "USA (GA)", exportReach: "USA + Intl", keyStrength: "2,200+ acres; strong GA in-shell exports" },
  { name: "Navarro Pecan Co.", founded: "—", location: "TX", sourceRegions: "USA (TX)", exportReach: "Domestic + Intl", keyStrength: "Texas-focused; strong domestic retail" },
];

export const starRatings = [
  { category: "Source Diversity", carter: 5, avg: 2 },
  { category: "Global Reach", carter: 5, avg: 3 },
  { category: "Processing Capacity", carter: 3, avg: 4 },
  { category: "Vertical Integration", carter: 4, avg: 3 },
  { category: "Multilingual Team", carter: 5, avg: 1 },
];

export const seasonalCalendar = [
  {
    label: "northHarvest",
    color: "#2D5016",
    months: [10, 11, 12],
  },
  {
    label: "southHarvest",
    color: "#5A7D2B",
    months: [3, 4, 5],
  },
  {
    label: "peakExport",
    color: "#C4943B",
    months: [10, 11, 12, 1, 2],
  },
  {
    label: "cnyDemand",
    color: "#DC2626",
    months: [1, 2],
  },
  {
    label: "processing",
    color: "#9CA3AF",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
];

export const tradeShows = [
  { month: 2, name: "Gulfood", city: "Dubai" },
  { month: 3, name: "FOODEX", city: "Tokyo" },
  { month: 5, name: "SIAL China", city: "Shanghai" },
  { month: 10, name: "SIAL Paris / Anuga", city: "" },
];

export const shipments = [
  { id: "CP-2026-0312", origin: "Georgia, USA", product: "Desirables Halves", volume: "40,000 lbs", processing: "Camilla, GA (Shelled)", destination: "Shanghai, China", status: "shipped" },
  { id: "CP-2026-0298", origin: "Chihuahua, MX", product: "Western In-Shell", volume: "60,000 lbs", processing: "Brundidge, AL (Graded)", destination: "Dubai, UAE", status: "processing" },
  { id: "CP-2026-0285", origin: "Catamarca, AR", product: "Mixed Halves", volume: "25,000 lbs", processing: "Camilla, GA (Shelled)", destination: "Seoul, South Korea", status: "shipped" },
  { id: "CP-2026-0271", origin: "South Africa", product: "Wichita In-Shell", volume: "45,000 lbs", processing: "Brundidge, AL (Sorted)", destination: "Ho Chi Minh, Vietnam", status: "transit" },
  { id: "CP-2026-0263", origin: "Georgia, USA", product: "Pecan Oil", volume: "5,000 lbs", processing: "Camilla, GA (Pressed)", destination: "Tokyo, Japan", status: "processing" },
  { id: "CP-2026-0251", origin: "Texas, USA", product: "Stuart Pieces", volume: "30,000 lbs", processing: "Camilla, GA (Shelled)", destination: "Amsterdam, Netherlands", status: "shipped" },
];

export const mapSources = [
  { name: "USA (GA, AL, TX, NM)", lat: 32.0, lon: -83.5, season: "Oct-Dec", volume: "5,000,000 lbs", varieties: "Desirables, Pawnee, Stuart, Western Schley" },
  { name: "Mexico", lat: 28.6, lon: -106.0, season: "Oct-Dec", volume: "2,100,000 lbs", varieties: "Western, Wichita" },
  { name: "Argentina", lat: -28.5, lon: -65.8, season: "Mar-May", volume: "1,200,000 lbs", varieties: "Various improved" },
  { name: "South Africa", lat: -25.7, lon: 28.2, season: "Mar-May", volume: "1,100,000 lbs", varieties: "Wichita, Navaho" },
];

export const mapProcessing = [
  { name: "Carter Nut Co.", lat: 31.23, lon: -84.21, capabilities: "Shelling, Roasting, Packaging" },
  { name: "Carter Pecan HQ", lat: 31.72, lon: -85.82, capabilities: "Sorting, Grading, Export" },
];

export const mapDestinations = [
  { name: "China", lat: 31.2, lon: 121.5, revenue: "$3,800,000", volume: "2,500,000 lbs", product: "In-Shell" },
  { name: "Vietnam", lat: 10.8, lon: 106.6, revenue: "$1,900,000", volume: "1,300,000 lbs", product: "In-Shell" },
  { name: "South Korea", lat: 37.6, lon: 127.0, revenue: "$1,500,000", volume: "900,000 lbs", product: "Halves" },
  { name: "Japan", lat: 35.7, lon: 139.7, revenue: "$950,000", volume: "550,000 lbs", product: "Halves" },
  { name: "India", lat: 19.1, lon: 72.9, revenue: "$1,100,000", volume: "800,000 lbs", product: "In-Shell" },
  { name: "UAE", lat: 25.2, lon: 55.3, revenue: "$1,200,000", volume: "750,000 lbs", product: "Halves, Pieces" },
  { name: "Turkey", lat: 41.0, lon: 29.0, revenue: "$480,000", volume: "320,000 lbs", product: "In-Shell" },
  { name: "Netherlands", lat: 52.4, lon: 4.9, revenue: "$880,000", volume: "500,000 lbs", product: "Shelled" },
  { name: "Germany", lat: 53.5, lon: 10.0, revenue: "$780,000", volume: "440,000 lbs", product: "Shelled" },
  { name: "UK", lat: 51.5, lon: -0.1, revenue: "$650,000", volume: "370,000 lbs", product: "Shelled" },
  { name: "Canada", lat: 49.3, lon: -123.1, revenue: "$720,000", volume: "420,000 lbs", product: "Halves, Pieces" },
  { name: "Mexico (dest)", lat: 19.4, lon: -99.1, revenue: "$580,000", volume: "380,000 lbs", product: "In-Shell (re-shelling)" },
];
