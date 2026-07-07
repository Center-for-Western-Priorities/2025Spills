# CWP Oil and Gas Spills Tracker — 2025

Analysis and reporting on oil and gas spill incidents in Colorado, Wyoming, and New Mexico for the Center for Western Priorities.

---

## Reports

### 2025 Recent Spills — State Reports

Interactive HTML reports covering spills reported January 1 – December 31, 2025. Each includes CWP-branded charts and county-level choropleth heat maps.

| State | File | GitHub Pages |
|---|---|---|
| Colorado | `2025/colorado/colorado_spills_report_2025.html` | [View](https://center-for-western-priorities.github.io/2025Spills/2025/colorado/colorado_spills_report_2025.html) |
| Wyoming | `2025/wyoming/wyoming_spills_report_2025.html` | [View](https://center-for-western-priorities.github.io/2025Spills/2025/wyoming/wyoming_spills_report_2025.html) |
| New Mexico | `2025/newmexico/newmexico_spills_report_2025.html` | [View](https://center-for-western-priorities.github.io/2025Spills/2025/newmexico/newmexico_spills_report_2025.html) |

**Data sources:**
- Colorado: COGCC / ECMC (`2025/ColoradoSpills.xlsm`) — filtered to Spill Type = "Recent"
- Wyoming: WOGCC (`2025/WyomingSpills2025.xlsx`, `2025/WyomingSpills2024.xlsx`)
- New Mexico: NM OCD (`2025/newmexico/NM-spills-7-7-26.xls`, downloaded from OCD permitting portal July 7, 2026)

**Charts included per state:**
- Colorado (13 charts): spills per year (2016–2025), volume per year, top operators (donut + bar), county heat map, surface owner, volume by fluid type, distance to surface water / water wells / occupied buildings, operator volume year-over-year, biggest increases and decreases
- Wyoming (7 charts): material type count and volume, county heat maps (2024 vs. 2025 side-by-side), operators by count and volume, volume year-over-year, monthly seasonality
- New Mexico (11 charts): trend 2022–2025, liquid/gas material type donuts, causes, spill sources, top operators year-over-year, county heat maps (liquid count, liquid volume, gas releases)

---

### Colorado Historic Spills Report

Analysis of historical spill records (Spill Type = "Historical") filed with COGCC, deduplicated by tracking number.

| File | GitHub Pages |
|---|---|
| `colorado_historic_spills_report.html` | [View](https://center-for-western-priorities.github.io/2025Spills/colorado_historic_spills_report.html) |

**Key findings:** 6,084 unique historical spills on record (2016–2025; excludes pre-2016 records and 2026-dated entries). Weld County accounts for 87% of all records. Noble Energy (2,301), Kerr McGee (1,672), and PDC Energy (665) together account for roughly three-quarters of filings. Spill counts have risen sharply since 2021, reflecting a wave of decommissioning activity across aging DJ Basin wells. Discovery reason breakdown (from root cause / description fields): plugging, abandonment, and cut-and-cap (41%); tank battery deconstruction (22%); flowline decommissioning (13%); facility decommissioning (7%); construction/excavation (6%); reclamation/pit closure (2%); ECMC field inspection (<1%).

**Charts:** spills per year (2016–2025 bar chart), county choropleth heat map, top operators bar, facility type donut, surface owner donut, discovery reason breakdown (narrative with data-verified percentages).

---

## Methodology

Analysis follows the methodology in `CWP Oil and Gas Spills Tracker.ipynb`.

**Colorado 2025:**
- Filter to Spill Type = "Recent", Date of Discovery 2016–2025; deduplicate by Tracking #
- Volume: for each Tracking #, take MAX value per liquid column across all rows; sum all six columns; multiply by 42. Fluid types: oil, condensate, produced water, drilling fluid, flowback fluid, other E&P waste
- Distance analysis: Surface Water Near, Water Wells, Occupied Buildings columns; for each Tracking #, use the minimum reported distance across all rows; filter ≤ 5,280 ft; bucket into 500 ft ranges
- Data source: ECMC (formerly COGCC)

**Wyoming:**
- Unit conversion via `togallons()`: rows with Unit = "Bbls" multiply by 42; "Gal" rows kept as-is
- Operator name cleaning: legal suffixes (LLC, LP, ENERGY, RESOURCES, OPERATING, etc.) stripped iteratively, with manual fixups for CITATION, CONTANGO, PEAK POWDER RIVER, etc.

**New Mexico:**
- Source: NM OCD HTML download (~104 MB), parsed with custom regex
- Incidents classified as gas or liquid via `materialtype()`. Gas materials: Natural Gas Flared, Natural Gas Vented, [OBSOLETE] Natural Gas (Methane), and Carbon Dioxide. Carbon Dioxide is treated as a gas release, not a liquid spill. "Other (Specify)" rows are classified as gas if Incident Type is Flare, Vent with Flaring, Natural Gas Release, or Vent; otherwise liquid.
- Deduplicated by Incident Number; volume converted via `togallons()` (BBL × 42) and `to_cf()` (Mcf × 1,000)

---

## Project Structure

```
2025Spills/
├── README.md
├── CWP Oil and Gas Spills Tracker.ipynb   # analysis notebook
├── colorado_historic_spills_report.html   # historic CO spills report
├── 2025/
│   ├── ColoradoSpills.xlsm                # CO source data
│   ├── WyomingSpills2025.xlsx             # WY 2025 source data
│   ├── WyomingSpills2024.xlsx             # WY 2024 source data
│   ├── colorado/
│   │   ├── colorado_spills_report_2025.html
│   │   └── co allcounties 2025.csv        # county lat/lon coordinates
│   ├── wyoming/
│   │   └── wyoming_spills_report_2025.html
│   └── newmexico/
│       ├── newmexico_spills_report_2025.html
│       └── nm_spills.xls                  # NM OCD HTML download
```

---

## Requirements

- Python 3.9+
- `openpyxl` — reading .xlsm / .xlsx Excel files
- `pandas` — data processing and pivot tables

Reports are standalone HTML files — no build step required. Charts use Chart.js 4.4.1 and D3.js 7 (CDN). County heat maps use the US Atlas TopoJSON (CDN). Google Fonts are loaded from CDN. An internet connection is required to render fonts, charts, and maps.

---

## Data source note

Colorado data is sourced from ECMC (Energy and Carbon Management Commission), the agency formerly known as COGCC (Colorado Oil and Gas Conservation Commission). The agency was renamed in 2023. All chart attributions use "ECMC."
