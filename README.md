# wind-lage-weide

GitHub Pages site with an interactive map and effect calculations for the proposed wind turbines at Lage Weide, Utrecht.

## Live site

[https://eveenendaal.github.io/wind-lage-weide/](https://eveenendaal.github.io/wind-lage-weide/)

## Features

- **Interactive map** centred on Lage Weide with OpenStreetMap as base layer
- **4 wind-turbine alternatives** (A–D) from the cNRD report, each toggleable
- **Click anywhere on the map** to see estimated effects at that location:
  - 🔊 **Noise (Lden)** – per alternative, compared with A2 highway background noise and combined cumulative level
  - ☀️ **Shadow flicker** – estimated annual hours without automatic shutdown
  - ⚠️ **External safety** – distance to nearest turbine vs. tip-height safety zone
  - 🏥 **Health** – TNO dose-effect relationship (% seriously annoyed)
  - 🦅 **Nature** – birds, bats, Natura 2000 proximity
  - 🌆 **Landscape** – distance and tip height per alternative
  - ⚡ **Energy output** – MWh/year, households powered, CO₂ avoided
- **Noise contour circles** (47 dB Lden) around individual turbines
- **A2 motorway** drawn on map with noise model reference

## Data sources

- Turbine locations: `Wind at Lage Weide.kml`
- Effects methodology: *Concept NRD Windpark Lage Weide* (Haskoning Nederland B.V., March 2026)
- Public opinion: *Terugkoppeling flitspeiling Wind op Lage Weide* (Gemeente Utrecht, January 2026)

## Calculation notes

All calculations are **simplified indicative estimates** for orientation purposes, using:
- Point-source noise model: `Lden = LwA − 20·log₁₀(d) − 8` (per turbine, summed)
- A2 line-source model: `Lden ≈ 68 − 10·log₁₀(d/100)` dB at distance d metres
- Shadow flicker approximation: `h ≈ 400 × (D/d)²` annual hours
- Turbine specs (LwA, hub height, rotor diameter) are representative estimates; final values depend on the chosen turbine model

Definitive values will be established in the full MER (Environmental Impact Assessment).

## GitHub Pages setup

Enable GitHub Pages in the repository settings, set the source to the main/relevant branch, root directory.
