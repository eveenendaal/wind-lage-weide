# wind-lage-weide

GitHub Pages site with an interactive map and effect calculations for the proposed wind turbines at Lage Weide, Utrecht.

---

> **Dutch / Nederlands** → see section below for Dutch version.

---

## Live site

[https://eveenendaal.github.io/wind-lage-weide/](https://eveenendaal.github.io/wind-lage-weide/)

## License

[MIT](LICENSE)

---

## English

### Features

- **Interactive map** centred on Lage Weide with OpenStreetMap as base layer
- **4 wind-turbine alternatives** (A–D) from the cNRD report, each toggleable
- **"My location" button** – show effects at your own position (uses browser geolocation)
- **Click anywhere on the map** to see estimated effects at that location:
  - 🔊 **Noise (Lden)** – per alternative, compared with A2 motorway background and combined cumulative level
  - ☀️ **Shadow flicker** – estimated annual hours without automatic shutdown
  - ⚠️ **External safety** – distance to nearest turbine vs. tip-height safety zone
  - 🏥 **Health** – TNO dose-effect relationship (% seriously annoyed)
  - 🦅 **Nature** – birds, bats, Natura 2000 proximity
  - 🌆 **Landscape** – distance and tip height per alternative
  - ⚡ **Energy output** – MWh/year, households powered, CO₂ avoided
- **Noise contour circles** (47 dB Lden) around individual turbines
- **A2 motorway** drawn on map with noise model reference
- **Dutch / English language toggle** in the control panel

### File structure

```
index.html   – page structure (HTML only, no inline CSS or JS)
style.css    – all styling
app.js       – all logic and calculations (extensively commented)
documents/   – source PDF reports and KML file
```

### Calculation notes

All calculations are **simplified indicative estimates** for public orientation.
They are **not** a substitute for the formal Environmental Impact Assessment (MER/EIA).

#### 1. Wind turbine noise – point-source model

```
Lp = LwA − 20·log₁₀(d) − 8    [dB Lden]
```

| Symbol        | Meaning                                                                                                                         |
|---------------|---------------------------------------------------------------------------------------------------------------------------------|
| `LwA`         | A-weighted sound power level of one turbine [dB(A)]                                                                             |
| `d`           | Distance from turbine to receiver [m] (clamped to ≥ 50 m)                                                                       |
| `20·log₁₀(d)` | Spherical (geometric) spreading loss: 6 dB per distance doubling                                                                |
| `−8`          | Combined correction for directivity, ground reflection and long-term meteorological average (standard value per Dutch RMW 2011) |

When multiple turbines are active, their contributions are summed using **energy addition**:
```
Ltotal = 10·log₁₀( Σ 10^(Lᵢ/10) )
```
Simply adding dB values is incorrect – this formula is physically correct.

#### 2. A2 motorway noise – line-source model

```
Lden ≈ 68 − 10·log₁₀(d / 100)    [dB]
```

- Reference level: 68 dB at 100 m (RIVM/RWS monitoring data, unshielded)
- Line-source spreading: 3 dB per distance doubling (vs. 6 dB for point sources)

#### 3. Shadow flicker estimate

```
h ≈ 400 × (D / d)²    [hours/year]
```

| Symbol | Meaning                                                                               |
|--------|---------------------------------------------------------------------------------------|
| `D`    | Rotor diameter [m]                                                                    |
| `d`    | Horizontal distance from turbine to receiver [m]                                      |
| `400`  | Empirical coefficient for the Netherlands (sun angle statistics, average cloud cover) |

- Result is the **worst-case turbine** (nearest) in the alternative
- **Dutch norm**: ≤ 6 h/yr and ≤ 20 min/day at homes, schools and care facilities
- In practice, automatic shutdown systems reduce shadow to the norm

#### 4. External safety thresholds

| Distance vs. tip height | Status                                          |
|-------------------------|-------------------------------------------------|
| > 2× tip height         | Outside primary zone                            |
| 1–2× tip height         | Risk assessment recommended                     |
| < 1× tip height         | Inside safety zone – formal assessment required |

Reference: *Handboek Risicozonering Windturbines* (2020).

#### 5. Energy output

```
E    = N × P × FLH          [MWh/year]
HH   = E × 1,000 / 3,500    [households]
CO₂  = E × 0.4              [tonnes CO₂/year]
```

| Parameter            | Value          | Source                                    |
|----------------------|----------------|-------------------------------------------|
| FLH                  | 2,200 h/yr     | Typical inland Netherlands (Windstats NL) |
| Household use        | 3,500 kWh/yr   | CBS 2023                                  |
| Grid emission factor | 0.4 kg CO₂/kWh | IEA 2023                                  |

### Data sources

- Turbine locations: `Wind at Lage Weide.kml`
- Effects methodology: *Concept NRD Windpark Lage Weide* (Haskoning Nederland B.V., March 2026)
- Public opinion: *Terugkoppeling flitspeiling Wind op Lage Weide* (Gemeente Utrecht, January 2026)

---

## Nederlands

### Functies

- **Interactieve kaart** gecentreerd op Lage Weide met OpenStreetMap als basislaag
- **4 windturbine-alternatieven** (A–D) uit de cNRD, elk aan/uit te zetten
- **'Mijn locatie'-knop** – toont effecten op jouw eigen positie (via browserlocatie)
- **Klik op de kaart** voor effecten op die locatie:
  - 🔊 **Geluid (Lden)** – per alternatief, vergeleken met A2-achtergrond en cumulatief
  - ☀️ **Slagschaduw** – geschatte jaarlijkse uren zonder automatische stilstand
  - ⚠️ **Externe veiligheid** – afstand tot dichtste turbine vs. tiphoogtezone
  - 🏥 **Gezondheid** – TNO dosis-effectrelatie (% ernstig gehinderd)
  - 🦅 **Natuur** – vogels, vleermuizen, Natura 2000-nabijheid
  - 🌆 **Landschap** – afstand en tiphoogte per alternatief
  - ⚡ **Energieopbrengst** – MWh/jaar, huishoudens, CO₂ vermeden
- **Geluidscontouren** (47 dB Lden) rondom individuele turbines
- **A2 snelweg** op de kaart met geluidsniveaureferentie
- **Nederlandse / Engelse taalwissel** in het linkerpaneel

### Bestandsstructuur

```
index.html   – paginastructuur (alleen HTML, geen inline CSS of JS)
style.css    – alle stijlen
app.js       – alle logica en berekeningen (uitvoerig van commentaar voorzien)
documents/   – bron-PDF's en KML-bestand
```

### Berekeningsnotities

Alle berekeningen zijn **vereenvoudigde oriënterende schattingen** voor het publiek.
Ze zijn **geen** vervanging voor het formele MER-onderzoek.

#### 1. Windturbinegeluid – puntbronmodel

```
Lp = LwA − 20·log₁₀(d) − 8    [dB Lden]
```

| Symbool       | Betekenis                                                                                                                            |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------|
| `LwA`         | A-gewogen geluidsvermogensniveau van één turbine [dB(A)]                                                                             |
| `d`           | Afstand van turbine tot ontvanger [m] (minimaal 50 m)                                                                                |
| `20·log₁₀(d)` | Bolvormige spreidingsverzwakking: 6 dB per afstandsverdubbeling                                                                      |
| `−8`          | Gecombineerde correctie voor directiviteit, bodemreflectie en langjarig meteorologisch gemiddelde (standaardwaarde conform RMW 2011) |

Bij meerdere turbines wordt de bijdrage opgeteld via **energieverdubbeling**:
```
Ltotaal = 10·log₁₀( Σ 10^(Lᵢ/10) )
```
dB-waarden optellen is fysisch onjuist; bovenstaande formule is correct.

#### 2. A2-snelweggeluid – lijnbronmodel

```
Lden ≈ 68 − 10·log₁₀(d / 100)    [dB]
```

- Referentieniveau: 68 dB op 100 m (RIVM/RWS monitoringdata, ongeschermd)
- Lijnbronverzwakking: 3 dB per afstandsverdubbeling (vs. 6 dB voor puntbronnen)

#### 3. Slagschaduwschatting

```
h ≈ 400 × (D / d)²    [uur/jaar]
```

| Symbool | Betekenis                                                                       |
|---------|---------------------------------------------------------------------------------|
| `D`     | Rotordiameter [m]                                                               |
| `d`     | Horizontale afstand van turbine tot ontvanger [m]                               |
| `400`   | Empirische coëfficiënt voor Nederland (zonhoekstatistiek, gemiddelde bewolking) |

- Resultaat geldt voor de **worst-case turbine** (dichtste) in het alternatief
- **Nederlandse norm**: ≤ 6 uur/jaar en ≤ 20 min/dag bij woningen, scholen en zorginstellingen
- Automatische stilstandsystemen reduceren slagschaduw in de praktijk tot de norm

#### 4. Veiligheidszone (extern risico)

| Afstand t.o.v. tiphoogte | Status                                               |
|--------------------------|------------------------------------------------------|
| > 2× tiphoogte           | Buiten primaire zone                                 |
| 1–2× tiphoogte           | Risicobeoordeling aanbevolen                         |
| < 1× tiphoogte           | Binnen veiligheidszone – formele beoordeling vereist |

Referentie: *Handboek Risicozonering Windturbines* (2020).

#### 5. Energieopbrengst

```
E    = N × P × VLU          [MWh/jaar]
HH   = E × 1.000 / 3.500    [huishoudens]
CO₂  = E × 0,4              [ton CO₂/jaar]
```

| Parameter                           | Waarde         | Bron                                 |
|-------------------------------------|----------------|--------------------------------------|
| VLU (vollasturen)                   | 2.200 uur/jaar | Typisch binnenland NL (Windstats NL) |
| Huishoudverbruik                    | 3.500 kWh/jaar | CBS 2023                             |
| CO₂-emissiefactor elektriciteitsnet | 0,4 kg CO₂/kWh | IEA 2023                             |

### Gegevensbronnen

- Turbinelocaties: `Wind at Lage Weide.kml`
- Effectenmethodiek: *Concept NRD Windpark Lage Weide* (Haskoning Nederland B.V., maart 2026)
- Publieke opinie: *Terugkoppeling flitspeiling Wind op Lage Weide* (Gemeente Utrecht, januari 2026)

---

## GitHub Pages setup

Enable GitHub Pages in the repository settings, set the source to the main branch, root directory.
