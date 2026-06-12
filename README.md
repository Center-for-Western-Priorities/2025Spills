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
- New Mexico: NM OCD (`2025/newmexico/nm_spills.xls`, downloaded from OCD permitting portal)

**Charts included per state:**
- Colorado (15 charts): spills per year (2014–2025), volume per year, monthly seasonality, top operators (donut + bar), county heat map, surface owner, oil/produced water spill size, distance to surface water / water wells / occupied buildings, operator volume year-over-year, biggest increases and decreases
- Wyoming (7 charts): material type count and volume, county heat maps (2024 vs. 2025 side-by-side), operators by count and volume, volume year-over-year, monthly seasonality
- New Mexico (11 charts): trend 2022–2025, liquid/gas material type donuts, causes, spill sources, top operators year-over-year, county heat maps (liquid count, liquid volume, gas releases)

---

### Colorado Historic Spills Report

Analysis of historical spill records (Spill Type = "Historical") filed with COGCC, deduplicated by tracking number.

| File | GitHub Pages |
|---|---|
| `colorado_historic_spills_report.html` | [View](https://center-for-western-priorities.github.io/2025Spills/colorado_historic_spills_report.html) |

**Key findings:** 6,084 unique historical spills on record (2016–2025; excludes pre-2016 records and 2026-dated entries). Weld County accounts for 87% of all records. Noble Energy (2,301), Kerr McGee (1,672), and PDC Energy (665) together account for roughly three-quarters of filings. Spill counts have risen sharply since 2021, reflecting a wave of decommissioning activity across aging DJ Basin wells.

---

## Methodology

Analysis follows the methodology in `CWP Oil and Gas Spills Tracker.ipynb`.

**Colorado:**
- Filter to Spill Type = "Recent"; deduplicate by Tracking #
- Volume: Oil BBLs Spilled + Produced Water BBLs Spilled + Condensate BBLs Spilled, converted to gallons (× 42)
- Distance analysis: Surface Water Near, Water Wells, Occupied Buildings columns; filter ≤ 5,280 ft; bucket into 500 ft ranges

**Wyoming:**
- Unit conversion via `togallons()`: rows with Unit = "Bbls" multiply by 42; "Gal" rows kept as-is
- Operator name cleaning: legal suffixes (LLC, LP, ENERGY, RESOURCES, OPERATING, etc.) stripped iteratively, with manual fixups for CITATION, CONTANGO, PEAK POWDER RIVER, etc.

**New Mexico:**
- Source: NM OCD HTML download (~104 MB), parsed with custom regex
- Incidents classified as gas (natural gas flared/vented) or liquid (produced water, crude oil, condensate, etc.) via `materialtype()`
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
