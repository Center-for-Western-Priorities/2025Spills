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

Full analysis code is in `CWP Oil and Gas Spills Tracker.ipynb`.

---

### Colorado 2025 Spills Report

**Data source:** Energy and Carbon Management Commission (ECMC), formerly the Colorado Oil and Gas Conservation Commission (COGCC), renamed in 2023. Source file: `2025/ColoradoSpills.xlsm`, downloaded from the ECMC online spill database.

**Record selection:** Filtered to rows where Spill Type = "Recent" and Date of Discovery falls between January 1 and December 31, 2025. Each unique Tracking # is counted as one spill event; where multiple rows share a Tracking #, the first occurrence is used for categorical fields (operator, county, facility type, surface owner).

**Spill count:** 338 unique spills. Trend chart covers 2016–2025; the 2014 data point (2 spills) was excluded as an isolated outlier predating the continuous reporting series. Total since 2016: 3,890.

**Volume:** ECMC records volume across six liquid columns: Oil BBLs Spilled, Condensate BBLs Spilled, Produced Water BBLs Spilled, Drilling Fluid BBLs Spilled, Flow Back Fluid BBLs Spilled, and Other E&P Waste BBLs Spilled. For each Tracking #, the maximum reported value per column is taken across all associated rows (to avoid double-counting supplemental filings), then all six column maxima are summed and multiplied by 42 to convert barrels to gallons. Volume figures are minimums based on operator self-reporting; a substantial share of spills list unknown volume.

**Distance to sensitive resources:** ECMC records the distance in feet from the spill site to the nearest surface water body, water well, and occupied building. These values are location-level properties and may appear on only one of several rows associated with a Tracking #. For each spill, the minimum reported distance across all rows is used. Only spills reporting a non-zero distance of 5,280 feet (one mile) or less are included. Results are bucketed into six 500-foot ranges.

**Inorganic-only filings:** This analysis includes all Form 19 filings meeting the date and spill-type criteria. It does not filter out filings where detected contamination consists solely of inorganic parameters — such as pH, sodium adsorption ratio (SAR), electrical conductivity, or arsenic — that may reflect naturally occurring soil chemistry rather than a hydrocarbon release. ECMC does not provide a formal flag for these cases; the determination appears, when made, only in free-text supplemental report fields. These filings represent less than 0.5% of the 2025 recent record and have no material effect on any figure in this report.

---

### Wyoming 2025 Spills Report

**Data source:** Wyoming Oil and Gas Conservation Commission (WOGCC). Source files: `2025/WyomingSpills2025.xlsx` (2025 spills) and `2025/WyomingSpills2024.xlsx` (2024 spills, used for year-over-year comparisons).

**Record selection:** All spill records in the source files are included; no spill-type filter is applied (WOGCC data does not use the Recent/Historical distinction used by ECMC). Each row represents one reported spill event.

**Volume:** Volume units vary by row. Rows where Unit = "Bbls" are converted to gallons by multiplying by 42; rows where Unit = "Gal" are used as reported. Other unit values are excluded from volume totals.

**Operator names:** Operator names in the WOGCC source data include legal suffixes and spelling variations. Names are standardized by stripping common suffixes (LLC, LP, INC, ENERGY, RESOURCES, OPERATING, CO, COMPANY, and variants) and applying manual corrections for known cases including CITATION, CONTANGO, and PEAK POWDER RIVER.

**County maps:** 2024 and 2025 county-level spill counts are displayed as side-by-side choropleth maps using a shared color scale, so shading is directly comparable across years. The shared maximum is the highest county count across both years combined.

---

### New Mexico 2025 Spills Report

**Data source:** New Mexico Oil Conservation Division (OCD), downloaded from the OCD permitting and reporting portal as an HTML file (`2025/newmexico/nm_spills.xls`, approximately 104 MB). Records cover 2022–2025.

**Parsing:** The source file is an HTML table export rather than a true spreadsheet. It is parsed using a custom regular expression routine to extract incident records.

**Incident classification:** Each incident is classified as either a liquid release (produced water, crude oil, condensate, drilling fluid, or other liquid oilfield fluids) or a gas release (natural gas, flared gas, or vented gas) using a `materialtype()` function applied to the material description field. Incidents with ambiguous or mixed materials are assigned to the dominant type by volume.

**Deduplication:** Records are deduplicated by Incident Number. Liquid and gas incident sets are deduplicated separately to avoid cross-type collisions.

**Volume conversion:** Liquid volumes reported in barrels are multiplied by 42 to convert to gallons. Gas volumes reported in Mcf (thousand cubic feet) are multiplied by 1,000 to convert to cubic feet.

**Date parsing:** Dates in the source file are formatted as MM/DD/YYYY strings. Year is extracted from the final four characters of the date string.

---

### Colorado Historical Spills Report

**Data source:** ECMC. Source file: `2025/ColoradoSpills.xlsm`, the same file used for the 2025 recent spills report.

**Record selection:** Filtered to rows where Spill Type = "Historical" and Date of Discovery falls between January 1, 2016 and December 31, 2025. Records with a Date of Discovery before 2016 (9 records) or in 2026 (674 records bearing future-dated entries present in the source file) are excluded. Each unique Tracking # is counted as one spill event; where multiple rows share a Tracking #, the first occurrence by row order is used for categorical fields.

**Spill count:** 6,084 unique historical spill records after deduplication and date filtering.

**Volume:** Most historical spill records do not include a reported volume; the release typically occurred years or decades before discovery, making volume estimation impossible. Volume figures are not reported in this analysis.

**Discovery reason classification:** The Root Cause and Spill Description fields were analyzed using keyword text classification to categorize each spill by the activity that led to its discovery. Categories and counts: plugging, abandonment, and cut-and-cap operations (41%); tank battery deconstruction (22%); flowline decommissioning (13%); facility decommissioning (7%); construction and excavation (6%); site reclamation and pit closure (2%); ECMC field inspection (<1%); unknown or not reported (7%). Percentages are of 6,084 unique tracking numbers.

**Inorganic-only filings:** Approximately 28 of the 6,084 records (less than 0.5%) appear to involve inorganic-only soil parameter exceedances — such as elevated pH, SAR, or arsenic — rather than hydrocarbon releases, based on zero reported liquid volume combined with descriptions referencing inorganic constituents or background-level determinations. These records are retained in the dataset because ECMC does not provide a formal mechanism to distinguish them from confirmed hydrocarbon releases. Their inclusion has no material effect on any figure in this report.

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
