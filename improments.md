# Dashboard Improvements — Round 3 (Overview Cards + Map Fix)

Apply these changes to the existing codebase.

---

## 1. Overview — Redesign the 3 Navigation Cards

The current 3 cards at the bottom of Overview need visual improvement.

### Card 1: Global Supply Chain → links to Supply Chain tab
**Remove** the current emoji icon flow (🌿→🏭→📦). It's too abstract.

**Replace with:** A static mini world map image. This can be a simplified SVG or a very small instance of the react-simple-maps ComposableMap with:
- Only the 4 source dots (green) and 2 processing dots (gold)
- No labels, no arc lines, no destinations — keep it minimal
- Gray land, white background
- Height: ~120px, just enough to see the continental shapes and dots

If rendering a second map instance causes performance issues, use a simple SVG world outline with 6 colored dots positioned approximately.

**Text:**
- Title: "Global Supply Chain"
- Subtitle: "4 source regions · 2 facilities · 30+ markets"
- Hover effect: slight shadow lift, cursor pointer

### Card 2: Export Markets → links to Markets & Customers tab
**Keep** the top 3 countries bar chart but improve it:
- Add country flag emojis before each name: "🇨🇳 China", "🇻🇳 Vietnam", "🇰🇷 South Korea"
- Make the bars slightly thicker
- Add revenue labels at the end of each bar: "$3.8M", "$1.9M", "$1.5M"

**Text:**
- Title: "Export Markets"  
- Subtitle: "Asia accounts for 62% of revenue"

### Card 3: Seasonal Calendar → links to Supply & Seasons tab
**Replace** the current tiny month grid (too small to read).

**Replace with:** Just 2 simple horizontal bars stacked:
- Bar 1 (dark green): labeled "Northern Harvest" spanning roughly the Oct-Dec position
- Bar 2 (light green): labeled "Southern Harvest" spanning roughly the Mar-May position
- A simple Jan-Dec axis below

This should be very simple — just colored divs with labels. No recharts needed.

**Text:**
- Title: "Year-Round Supply"
- Subtitle: "Dual-hemisphere · Oct-Dec & Mar-May harvests"

### All 3 cards:
- Same height, equal width in a 3-column grid
- `cursor: pointer` on hover
- Subtle box shadow on hover (transform: translateY(-2px))
- On click: call `setActiveTab("Supply Chain")` / `setActiveTab("Markets & Customers")` / `setActiveTab("Supply & Seasons")`

---

## 2. Supply Chain Map — Dual Map Layout

The current world map has a critical problem: the 2 US processing facilities (Camilla, GA and Brundidge, AL) overlap because they're too close together at the world scale.

### Solution: Split into 2 maps (World Map + US Southeast Inset)

**Layout:** 
```
┌─────────────────────────────────────────────────┐
│                                                 │
│              WORLD MAP (top)                    │
│    Shows global supply chain overview           │
│    Source → Processing (as one US dot) → Export  │
│                                                 │
├────────────────────┬────────────────────────────┤
│                    │                            │
│  US SOUTHEAST      │   LEGEND + FLOW            │
│  INSET MAP         │   DESCRIPTION              │
│  (bottom left)     │   (bottom right)           │
│                    │                            │
└────────────────────┴────────────────────────────┘
```

### World Map (top section):
- Keep the current world map but make these changes:
- **Combine the 2 US processing facilities into 1 gold dot** labeled "Processing (GA & AL)" — at world scale they're effectively the same location
- Keep all 4 source green dots (USA, Mexico, Argentina, South Africa)
- Keep all blue destination dots
- Keep arc lines
- Remove the overlapping labels for Camilla/Brundidge — just show "USA" for the combined source+processing area
- Height: ~400px

### US Southeast Inset Map (bottom left):
- Create a second, zoomed-in ComposableMap showing only the US Southeast
- **Projection center:** approximately lat: 32.0, lon: -84.5
- **Zoom/scale:** high enough to clearly show Georgia and Alabama as separate states
- Show these markers clearly separated:
  - 🌿 Green dot: Georgia pecan orchards (lat: 31.5, lon: -83.5) — label: "Georgia Orchards"
  - 🏭 Gold dot #1: Carter Nut Company, Camilla, GA (lat: 31.23, lon: -84.21) — label: "Carter Nut Co. — Camilla, GA\nShelling · Roasting · Cold Storage\n137,000 sq ft"
  - 🏭 Gold dot #2: Carter Pecan HQ, Brundidge, AL (lat: 31.72, lon: -85.82) — label: "Carter Pecan HQ — Brundidge, AL\nSorting · Grading · Export Packaging"
- Draw a short arrow/line between the two facilities
- Background: show state boundaries for GA, AL, FL for context
- Height: ~250px
- Border: subtle border around the inset to visually separate it from the world map
- Title above inset: "US Processing Facilities (Detail View)"

### Legend + Flow Description (bottom right, next to inset):
Display a clean text-based flow description:

```
SUPPLY CHAIN FLOW

Source Regions (4)
🌿 USA (Georgia, Alabama, Texas, New Mexico) — Oct-Dec
🌿 Mexico (Chihuahua) — Oct-Dec  
🌿 Argentina (Catamarca) — Mar-May
🌿 South Africa — Mar-May
        ↓
Processing Facilities (2)
🏭 Carter Nut Company — Camilla, GA
   Shelling, Roasting, Cold Storage, Retail Packaging
🏭 Carter Pecan HQ — Brundidge, AL
   Sorting, Grading, Export Packaging
        ↓
Export Destinations (30+ countries)
📦 Asia: China, Vietnam, South Korea, Japan, India
📦 Middle East: UAE, Turkey
📦 Europe: Netherlands, Germany, UK  
📦 North America: Canada, Mexico
```

Style this as a clean vertical flow with subtle connecting lines or arrows between sections. Use the icon emojis and the green/gold/blue color coding.

### Implementation notes:
- For the US Southeast inset, create a second `<ComposableMap>` with different projection settings
- Use `geoAlbersUsa` or manually set projection center and scale to zoom into the southeast
- If geoAlbersUsa doesn't work well for this, use `geoMercator` with center=[-84, 32] and a high zoom
- The inset map needs its own TopoJSON — you can use the same world-atlas but just zoom in, or use a US-specific TopoJSON (https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json) for better state boundary detail
- Both maps should be inside the same card/container with a clean layout