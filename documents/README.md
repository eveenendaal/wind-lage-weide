# Supporting Documents for Windpark Lage Weide

This folder contains the source documents used to build the Windpark Lage Weide effect explorer.

## Files

### Concept Notitie Reikwijdte & Detailniveau (cNRD) en Criteria voor omgevingsrapport Windpark Lage Weide.pdf

**Title**: Concept Scope Note & Detail Level and Criteria for Environmental Report – Windpark Lage Weide

**Purpose**: This is the formal scope and detail specification for the Environmental Impact Assessment (MER/EIA) of the Windpark Lage Weide project.

**Content**:
- Scope definition for the environmental assessment
- Technical detail level for calculations
- Evaluation criteria for effects (noise, shadow flicker, safety, health, nature, landscape)
- Reference turbine specifications (capacity, tip height, rotor diameter)
- Key parameters used in this web calculator (e.g., sound power level, safety zones)

**Relevance to Calculator**: This document provides the authoritative technical basis for all calculations in the effect explorer. All noise models, safety distances, shadow flicker estimates, and other impact assessments are derived from or aligned with this cNRD.

---

### Terugkoppeling flitspeiling Wind op Lage Weide - januari 2026.pdf

**Title**: Public Opinion Survey Results – Wind at Lage Weide, January 2026

**Purpose**: Results of a citizen survey (flitspeiling) conducted by the Municipality of Utrecht to gauge public perception and concerns about the proposed wind turbines.

**Content**:
- Survey methodology and respondent demographics
- Public concerns (noise, visual impact, safety)
- Support/opposition distribution
- Frequently cited local issues

**Relevance to Calculator**: While this document does not directly inform the technical calculations, it reflects the public priorities and concerns that motivated the creation of this open, interactive tool. The focus on noise, shadow flicker, and safety zones in the calculator reflects the survey results.

---

### Wind at Lage Weide.kml

**Format**: Keyhole Markup Language (KML) – a geospatial data format

**Purpose**: Defines the geographic coordinates of the proposed wind turbines and other key locations (e.g., A2 motorway section, reference house and tree positions).

**Content**:
- Turbine locations (latitude, longitude) for alternatives A–D
- Point coordinates for the reference house and tree (used for scale in the landscape visualization)
- The A2 motorway corridor line geometry (used for noise calculations and distance estimates)

**Note on GPS Coordinates**: The turbine coordinates in this KML file were **estimated by visual analysis** of the maps and diagrams in the cNRD and the public survey document. They are **not the exact official coordinates** from the municipality or the engineering consultants. For precise turbine placement, refer to the official environmental assessment documents or contact the project team.

**How to Use**: The coordinates are automatically loaded by `app.js` and used to calculate distances, bearings, and impact estimates for any user-selected point on the map.

---

## How to Access

All three documents are referenced in the project repository:

- **Repository**: [github.com/eveenendaal/wind-lage-weide](https://github.com/eveenendaal/wind-lage-weide)
- **Official project**: [denkmee.utrecht.nl/nl-NL/projects/windoplageweide](https://denkmee.utrecht.nl/nl-NL/projects/windoplageweide)

## Legal Note

The PDFs are the intellectual property of their respective authors (Haskoning Nederland B.V. and Gemeente Utrecht). They are provided here for reference and transparency, to support public understanding of the Windpark Lage Weide project.

**About this tool**: This calculator was created by an independent resident of Maarssen with no official affiliation to the municipality, project team, or any planning authority. It is an educational tool for public orientation only and is not part of the formal Environmental Impact Assessment process.
