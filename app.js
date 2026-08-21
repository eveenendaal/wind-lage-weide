/* ═══════════════════════════════════════════════════════════════════════
   app.js – Windpark Lage Weide effect explorer
   ───────────────────────────────────────────────────────────────────────
   All calculations in this file are simplified indicative estimates
   intended for public orientation. They are NOT a substitute for the
   formal Environmental Impact Assessment (MER / EIA).

   Alle berekeningen in dit bestand zijn vereenvoudigde schattingen
   voor oriëntatie en zijn GEEN vervanging voor het formele MER-onderzoek.
   ═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 1 – INTERNATIONALISATION (i18n)
   ───────────────────────────────────────────────────────────────────────
   All user-visible strings are stored here so the whole interface can be
   rendered in Dutch (nl) or English (en) by swapping `LANG`.
   ═══════════════════════════════════════════════════════════════════════ */

const I18N = {
    nl: {
        title:           '🌬️ Windpark Lage Weide',
        subtitle:        'Klik op de kaart voor effecten op die locatie',
        myLocation:      'Mijn locatie',
        locating:        'Locatie bepalen…',
        locError:        '❌ Locatie niet beschikbaar',
        alternatives:    'Alternatieven',
        reset:           'Reset',
        mapLayers:       'Kaartlagen',
        layerTurbines:   'Windturbines',
        layerNoise:      'Geluidscontouren (47 dB)',
        layerSafety:     'Veiligheidszone (tiphoogte)',
        layerA2:         'A2 snelweg',
        layerContext:    'Referentiehuis & boom (50 m)',
        norms:           'Normen (Lden)',
        norm1:           '< 40 dB – Laag',
        norm2:           '40–45 dB – Matig',
        norm3:           '45–47 dB – Grenswaarde',
        norm4:           '> 47 dB – Overschrijding',
        normNote:        'Norm windturbines: 45 dB Lden (standaard), 47 dB Lden (grens)',
        sourceNote:      'Bron: cNRD Windpark Lage Weide (Haskoning, maart 2026). Berekeningen zijn vereenvoudigde schattingen voor oriëntatie.',
        infoTitle:       '📍 Effecten op locatie',
        clickPrompt:     'Klik op de kaart om te beginnen',
        placeholderMsg:  'Klik ergens op de kaart om de verwachte effecten van het windpark op die locatie te zien — inclusief geluid t.o.v. de A2.',
        placeholderHint: 'Schakel opties in/uit via het linkerpaneel.',
        legendTitle:     'Opties',

        // Info panel sections
        locContext:      '📍 Locatiecontext',
        distToA2:        'Afstand tot A2',
        a2NoiseLabel:    'A2 geluid (Lden, gecorrigeerd)',
        a2Note:          'De A2 is een belangrijke bestaande geluidsbron in het gebied. Deze schatting start bij een referentie van 68 dB Lden op 100 m voor open, ongeschermde snelweg en corrigeert vervolgens voor stiller asfalt (tweelaags ZOAB-fijn) op het traject Oudenrijn-Leidsche Rijntunnel (−4 dB) en een geluidabsorberend scherm langs de A2 in de Lage Weide-corridor (−5 dB, conservatieve schatting).',
        noiseTitle:      '🔊 Geluid – vergelijking (Lden)',
        thOption:        'Optie',
        thWind:          'Wind',
        thA2:            'A2',
        thCumul:         'Cumulatief',
        thDelta:         '+ΔdB',
        thRating:        'Beoordeling',
        noiseNote:       'Norm: 45 dB (standaard) / 47 dB (grenswaarde) Lden.<br>ΔdB = toename boven A2-achtergrond door windturbines.<br>Wind-Lden is vereenvoudigd berekend (puntbronmodel zonder scherm/terreineffecten). Het gehanteerde bronvermogen (105–111 dB(A)) is een indicatieve aanname per turbinegrootte; de cNRD noemt geen bronvermogen per alternatief.',
        noSelect:        'Selecteer een of meer opties om geluidseffecten te zien.',
        shadowTitle:     '☀️ Slagschaduw (schatting)',
        shadowHrYr:      'uur/jaar',
        shadowNote:      'Norm: max 6 uur/jaar en 20 min/dag op woningen, scholen, zorginstellingen.<br>Schatting zonder automatische stilstand-beveiliging. In de praktijk wordt slagschaduw nagenoeg altijd gereduceerd tot ≤ 6 uur/jaar.',
        safetyTitle:     '⚠️ Externe veiligheid',
        safetyFrom:      'm van dichtste turbine',
        safetyNote:      'Tiphoogte = maatstaf voor ijsworpzone en minimale beoordeling plaatsgebonden risico (PR 10⁻⁶/jr). Definitieve veiligheidscontouren volgen uit MER-onderzoek conform Handboek Risicozonering Windturbines (2020).',
        healthTitle:     '🏥 Gezondheid',
        healthP1:        'Wetenschappelijk onderzoek (RIVM 2020) toont <b>geen direct causaal verband</b> tussen windturbinegeluid en hart- en vaatziekten of slaapstoornissen.',
        healthP2:        'Wel kan geluid- en slagschaduwhinder <b>stress en ernstige hinder</b> veroorzaken, met name bij mensen die zich niet betrokken voelen bij besluitvorming.',
        healthDose:      'Dosis-effect (TNO 2008):',
        health40:        '± 5% ernstig gehinderd',
        health45:        '± 10% ernstig gehinderd',
        health47:        '± 15% ernstig gehinderd',
        natureTitle:     '🦅 Natuur',
        natureBirds:     'Vogels (roofvogels, ooievaars)',
        natureBats:      'Vleermuizen',
        natureN2000:     'Natura 2000 (Noorderpark ~8 km)',
        natureNote:      'Mitigatie via vleermuisdetectoren, stilstandprotocollen en ecologisch onderzoek in MER.',
        landscapeTitle:  '🌆 Landschap & zichtbaarheid',
        landscapeNote:   'Schijnbare hoogte is een eenvoudige geometrische schatting op basis van tiphoogte en afstand. Werkelijke zichtbaarheid hangt ook sterk af van bebouwing, bomen, weersomstandigheden en exacte positie. Formeel landschapsonderzoek volgt in MER.',
        apparentHeight:  'schijnbare hoogte',
        energyTitle:     '⚡ Energieopbrengst (per optie)',
        thMWh:           'MWh/jr',
        thHH:            'Huishoudens',
        thCO2:           'CO₂ vermeden',
        energyNote:      'Vollasturen verschillen per alternatief (1.228–2.451 uur/jaar) en zijn afgeleid uit de opbrengstschatting in cNRD Tabel 3.2; hogere masten halen meer vollasturen. Huishoudens op basis van 3.500 kWh/jr. CO₂ op basis van 0,4 kg/kWh.',
        disclaimer:      '⚠️ <b>Let op:</b> Alle berekeningen zijn vereenvoudigde oriënterende schattingen op basis van puntbronmodellen en kengetallen uit de cNRD (Haskoning, maart 2026). Definitieve waarden worden vastgesteld in het MER-onderzoek.',

        // Classification labels
        veryLow:         'Zeer laag',
        low:             'Laag',
        moderate:        'Matig',
        limit:           'Grenswaarde',
        exceeded:        'Overschrijding',
        underNorm:       'Onder norm (< 6 u/jr)',
        aboveNorm:       'Boven norm (> 6 u/jr)',
        highlyElevated:  'Sterk verhoogd (> 16 u/jr)',
        outsideZone:     'Buiten zone',
        assessNeeded:    'Risicobeoordeling nodig',
        insideZone:      'Binnen veiligheidszone',
        risk:            'Risico',
        assessNeededShort: 'Beoordeling nodig',

        // A2 tooltip
        a2Tooltip:       'A2 snelweg (68 dB Lden @100 m ongeschermd; stiller asfalt −4 dB, geluidscherm −5 dB, tunnels uitgesloten)',
        // Turbine tooltip parts
        tipHeight:       'Tiphoogte',
        safetyZone:      'veiligheidszone',
        // km/visibility
        visLabel:        'km | tiphoogte',
        contextHouse:    'Referentiehuis',
        contextTree:     'Referentiepopulier',
        contextRadius:   'Referentieafstand',
        contextTooltip:  'Alleen ter schaalvergelijking: ${label} van ${height} m op ${distance} m van het gekozen punt.',

        // Horizon silhouette
        horizonTitle:    '🔭 Horizonsilhouet',
        horizonNote:     'Schematische weergave van de hoekgroottes op basis van geometrische berekening. Een referentie-rijtjeshuis (7 m) en referentiepopulier (15 m) op 50 m afstand staan net buiten de windmolengroep. Het beeld is gecentreerd op de dichtstbijzijnde windmolen. Schaal is automatisch aangepast aan het hoogste object. Werkelijke zichtbaarheid hangt ook af van weersomstandigheden en exacte positie.',
        horizonRefLabel: 'Ter context buiten de windmolengroep: 🏠 rijtjeshuis 7 m en 🌳 populier 15 m op 50 m afstand',

        // Links
        links:           'Links',
        linkGithub:      'Broncode (GitHub)',
        linkProject:     'Officieel project',
    },

    en: {
        title:           '🌬️ Windpark Lage Weide',
        subtitle:        'Click on the map to see effects at that location',
        myLocation:      'My location',
        locating:        'Locating…',
        locError:        '❌ Location unavailable',
        alternatives:    'Alternatives',
        reset:           'Reset',
        mapLayers:       'Map layers',
        layerTurbines:   'Wind turbines',
        layerNoise:      'Noise contours (47 dB)',
        layerSafety:     'Safety zone (tip height)',
        layerA2:         'A2 motorway',
        layerContext:    'Example house & tree (50 m)',
        norms:           'Standards (Lden)',
        norm1:           '< 40 dB – Low',
        norm2:           '40–45 dB – Moderate',
        norm3:           '45–47 dB – Limit value',
        norm4:           '> 47 dB – Exceedance',
        normNote:        'Wind turbine standard: 45 dB Lden (normal), 47 dB Lden (limit)',
        sourceNote:      'Source: cNRD Windpark Lage Weide (Haskoning, March 2026). Calculations are simplified indicative estimates.',
        infoTitle:       '📍 Effects at location',
        clickPrompt:     'Click the map to begin',
        placeholderMsg:  'Click anywhere on the map to see the expected effects of the wind park at that location — including noise relative to the A2 motorway.',
        placeholderHint: 'Toggle alternatives on/off in the left panel.',
        legendTitle:     'Options',

        locContext:      '📍 Location context',
        distToA2:        'Distance to A2',
        a2NoiseLabel:    'A2 noise (Lden, adjusted)',
        a2Note:          'The A2 motorway is a major existing noise source in the area. This estimate starts from a 68 dB Lden at 100 m reference for open, unshielded motorway traffic and then adjusts for quieter asphalt (double-layer porous asphalt) on the Oudenrijn-Leidsche Rijntunnel section (−4 dB) and a sound-absorbing panel alongside the A2 in the Lage Weide corridor (−5 dB, conservative estimate).',
        noiseTitle:      '🔊 Noise – comparison (Lden)',
        thOption:        'Option',
        thWind:          'Wind',
        thA2:            'A2',
        thCumul:         'Cumulative',
        thDelta:         '+ΔdB',
        thRating:        'Rating',
        noiseNote:       'Standard: 45 dB (normal) / 47 dB (limit) Lden.<br>ΔdB = increase above A2 background due to wind turbines.<br>Wind Lden is a simplified estimate (point-source model, no barriers or terrain effects). The sound power levels used (105–111 dB(A)) are indicative assumptions per turbine size class; the cNRD does not publish a sound power level per alternative.',
        noSelect:        'Select one or more alternatives to see noise effects.',
        shadowTitle:     '☀️ Shadow flicker (estimate)',
        shadowHrYr:      'hrs/yr',
        shadowNote:      'Standard: max 6 hrs/year and 20 min/day at homes, schools and care facilities.<br>Estimate without automatic shutdown. In practice, shadow flicker is almost always reduced to ≤ 6 hrs/year.',
        safetyTitle:     '⚠️ External safety',
        safetyFrom:      'm from nearest turbine',
        safetyNote:      'Tip height is the reference for ice-throw zone and minimum location-based risk assessment (PR 10⁻⁶/yr). Final safety zones will be established in the EIA per the Handboek Risicozonering Windturbines (2020).',
        healthTitle:     '🏥 Health',
        healthP1:        'Scientific research (RIVM 2020) shows <b>no direct causal link</b> between wind turbine noise and cardiovascular disease or sleep disorders.',
        healthP2:        'Noise and shadow flicker can, however, cause <b>stress and serious annoyance</b>, particularly among people who feel excluded from decision-making.',
        healthDose:      'Dose-effect (TNO 2008):',
        health40:        '± 5% seriously annoyed',
        health45:        '± 10% seriously annoyed',
        health47:        '± 15% seriously annoyed',
        natureTitle:     '🦅 Nature',
        natureBirds:     'Birds (raptors, storks)',
        natureBats:      'Bats',
        natureN2000:     'Natura 2000 (Noorderpark ~8 km)',
        natureNote:      'Mitigation via bat detectors, shutdown protocols and ecological research in EIA.',
        landscapeTitle:  '🌆 Landscape & visibility',
        landscapeNote:   'Apparent height is a simple geometric estimate based on tip height and distance. Actual visibility also depends strongly on buildings, trees, weather and the exact viewing position. Formal landscape assessment will follow in the EIA.',
        apparentHeight:  'apparent height',
        energyTitle:     '⚡ Energy output (per alternative)',
        thMWh:           'MWh/yr',
        thHH:            'Households',
        thCO2:           'CO₂ avoided',
        energyNote:      'Full-load hours differ per alternative (1,228–2,451 h/yr) and are derived from the output estimate in cNRD Table 3.2; taller towers reach more full-load hours. Households based on 3,500 kWh/yr. CO₂ based on 0.4 kg/kWh.',
        disclaimer:      '⚠️ <b>Note:</b> All calculations are simplified indicative estimates based on point-source models and figures from the cNRD (Haskoning, March 2026). Definitive values will be established in the formal EIA.',

        veryLow:         'Very low',
        low:             'Low',
        moderate:        'Moderate',
        limit:           'Limit value',
        exceeded:        'Exceedance',
        underNorm:       'Within limit (< 6 h/yr)',
        aboveNorm:       'Above limit (> 6 h/yr)',
        highlyElevated:  'Highly elevated (> 16 h/yr)',
        outsideZone:     'Outside zone',
        assessNeeded:    'Risk assessment needed',
        insideZone:      'Inside safety zone',
        risk:            'Risk',
        assessNeededShort: 'Assessment needed',

        a2Tooltip:       'A2 motorway (68 dB Lden @100 m unshielded; quiet asphalt −4 dB, noise barrier −5 dB, tunnels excluded)',
        tipHeight:       'Tip height',
        safetyZone:      'safety zone',
        visLabel:        'km | tip height',
        contextHouse:    'Reference house',
        contextTree:     'Reference poplar',
        contextRadius:   'Reference distance',
        contextTooltip:  'For scale only: ${label} of ${height} m at ${distance} m from the selected point.',

        // Horizon silhouette
        horizonTitle:    '🔭 Horizon silhouette',
        horizonNote:     'Schematic view of turbine angular sizes based on geometric calculation. A reference Dutch terraced house (7 m) and poplar tree (15 m) at 50 m distance are shown just outside the turbine group. The view is centered on the nearest turbine. Scale is auto-adjusted to the tallest object. Actual visibility also depends on weather conditions and exact position.',
        horizonRefLabel: 'For context outside the turbine group: 🏠 terraced house 7 m and 🌳 poplar 15 m at 50 m distance',

        // Links
        links:           'Links',
        linkGithub:      'Source code (GitHub)',
        linkProject:     'Official project',
    }
};

/** Currently active language – 'nl' or 'en'. */
let LANG = 'nl';

/** Convenience accessor: returns the translated string for key `k`. */
function t(k) { return I18N[LANG][k]; }

/** Like `t()`, but substitutes ${name} placeholders from `vars`. */
function tf(k, vars) {
    return t(k).replace(/\$\{(\w+)\}/g, (_, name) => String(vars[name] ?? ''));
}

/**
 * Turbine alternatives carry their own two translations rather than i18n keys,
 * because the set of alternatives is data, not interface text.
 */
function optionName(opt) { return LANG === 'nl' ? opt.nameNl : opt.nameEn; }
function optionDesc(opt) { return LANG === 'nl' ? opt.descNl : opt.descEn; }

/** True when both arrays hold the same keys, ignoring order. */
function sameKeys(a, b) {
    return a.length === b.length && a.every(key => b.includes(key));
}

/** The checkbox element controlling map layer `key`. */
function layerToggle(key) {
    return document.getElementById(`toggle-${key}`);
}

function parseCsvParam(value, validKeys) {
    if (value === null) return null;
    if (value.trim() === '') return [];
    return value
        .split(',')
        .map(item => item.trim())
        .filter(item => validKeys.includes(item));
}

function parseLatLonParam(value) {
    if (!value) return null;
    const [latRaw, lonRaw] = value.split(',');
    const lat = Number(latRaw);
    const lon = Number(lonRaw);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
    return { lat, lon };
}

function parseUrlState() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') === 'en' ? 'en' : 'nl';
    const options = parseCsvParam(params.get('opts'), OPTION_KEYS);
    const layers = parseCsvParam(params.get('layers'), LAYER_KEYS);
    return {
        lang,
        options,
        layers,
        point: parseLatLonParam(params.get('point'))
    };
}

function updateUrlState() {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', LANG);

    const activeOptionKeys = OPTION_KEYS.filter(key => activeOptions[key]);
    if (activeOptionKeys.length === OPTION_KEYS.length) url.searchParams.delete('opts');
    else url.searchParams.set('opts', activeOptionKeys.join(','));

    const activeLayerKeys = LAYER_KEYS.filter(key => layerToggle(key).checked);
    if (sameKeys(activeLayerKeys, DEFAULT_LAYER_KEYS)) url.searchParams.delete('layers');
    else url.searchParams.set('layers', activeLayerKeys.join(','));

    if (lastClickedLatLon) {
        url.searchParams.set('point', `${lastClickedLatLon.lat.toFixed(5)},${lastClickedLatLon.lon.toFixed(5)}`);
    } else {
        url.searchParams.delete('point');
    }

    window.history.replaceState({}, '', url);
}

function clearUrlState() {
    window.history.replaceState({}, '', window.location.pathname);
}


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 2 – TURBINE DATA
   ───────────────────────────────────────────────────────────────────────
   Four alternatives (A–D) from the concept Notitie Reikwijdte en
   Detailniveau (cNRD) Windpark Lage Weide, Haskoning Nederland B.V.,
   March 2026.

   Dimensions, capacity and turbine counts are taken verbatim from
   cNRD Table 3.2 ("Bandbreedte windturbines Windpark Lage Weide"):

     Alternative                  A       B       C       D
     Capacity per turbine [MW]   2.3     3.8     4.5     7.2
     Number of turbines            8       4       4       2
     Max tip height [m]           90     150     210     252
     Max rotor diameter [m]       71     117     150     172
     Max hub height [m]           54    91.5     135     166
     Estimated output [GWh/yr]  22.6    28.0    40.0    35.3

   Note that hub_height + rotor_diam / 2 = tip_height for every row.

   `flh` (full-load hours) is derived from that same table, so that
   N × capacity_mw × flh reproduces the cNRD output figure. It is NOT a
   single generic value: yield rises with hub height, which is why the
   short turbines of alternative A reach far fewer full-load hours than
   the tall turbines of alternative D.

   Key acoustic parameter:
     LwA – A-weighted sound power level [dB(A)]
           This is the total acoustic energy emitted by one turbine.
           Higher LwA → louder turbine.
           The cNRD does not publish a sound power level per alternative,
           so these are indicative values for the corresponding turbine
           size class (roughly 105–111 dB(A) for 2–7 MW machines) and are
           an assumption of this tool, not a figure from the cNRD.
   ═══════════════════════════════════════════════════════════════════════ */

const TURBINE_OPTIONS = {
    A: {
        nameNl: 'Optie A', nameEn: 'Option A',
        descNl: '8 turbines · 90 m tip · 2,3 MW', descEn: '8 turbines · 90 m tip · 2.3 MW',
        LwA: 105,           // A-weighted sound power level [dB(A)] – indicative
        capacity_mw: 2.3,   // Electrical capacity per turbine [MW]
        hub_height: 54,     // Hub height above ground [m]
        rotor_diam: 71,     // Rotor diameter [m]
        tip_height: 90,     // Maximum tip height = hub_height + rotor_diam/2 [m]
        flh: 1228,          // Full-load hours/yr – derived from cNRD Table 3.2 (22.6 GWh/yr)
        color: '#e74c3c',
        turbines: [
            { id: 'A-1', lat: 52.113352, lon: 5.054729 },
            { id: 'A-2', lat: 52.118340, lon: 5.060361 },
            { id: 'A-3', lat: 52.115997, lon: 5.062644 },
            { id: 'A-4', lat: 52.113771, lon: 5.067392 },
            { id: 'A-5', lat: 52.111787, lon: 5.071481 },
            { id: 'A-6', lat: 52.110256, lon: 5.072524 },
            { id: 'A-7', lat: 52.102285, lon: 5.073085 },
            { id: 'A-8', lat: 52.114602, lon: 5.055460 }
        ]
    },
    B: {
        nameNl: 'Optie B', nameEn: 'Option B',
        descNl: '4 turbines · 150 m tip · 3,8 MW', descEn: '4 turbines · 150 m tip · 3.8 MW',
        LwA: 107,
        capacity_mw: 3.8,
        hub_height: 91.5,
        rotor_diam: 117,
        tip_height: 150,
        flh: 1842,          // Full-load hours/yr – derived from cNRD Table 3.2 (28.0 GWh/yr)
        color: '#27ae60',
        turbines: [
            { id: 'B-1', lat: 52.113444, lon: 5.054716 },
            { id: 'B-2', lat: 52.115154, lon: 5.064054 },
            { id: 'B-3', lat: 52.114012, lon: 5.066722 },
            { id: 'B-4', lat: 52.110746, lon: 5.072561 }
        ]
    },
    C: {
        nameNl: 'Optie C', nameEn: 'Option C',
        descNl: '4 turbines · 210 m tip · 4,5 MW', descEn: '4 turbines · 210 m tip · 4.5 MW',
        LwA: 109,
        capacity_mw: 4.5,
        hub_height: 135,
        rotor_diam: 150,
        tip_height: 210,
        flh: 2222,          // Full-load hours/yr – derived from cNRD Table 3.2 (40.0 GWh/yr)
        color: '#f39c12',
        turbines: [
            { id: 'C-1', lat: 52.113708, lon: 5.054795 },
            { id: 'C-2', lat: 52.118677, lon: 5.059780 },
            { id: 'C-3', lat: 52.113994, lon: 5.067481 },
            { id: 'C-4', lat: 52.111085, lon: 5.073054 }
        ]
    },
    D: {
        nameNl: 'Optie D', nameEn: 'Option D',
        descNl: '2 turbines · 252 m tip · 7,2 MW', descEn: '2 turbines · 252 m tip · 7.2 MW',
        LwA: 111,
        capacity_mw: 7.2,
        hub_height: 166,
        rotor_diam: 172,
        tip_height: 252,
        flh: 2451,          // Full-load hours/yr – derived from cNRD Table 3.2 (35.3 GWh/yr)
        color: '#8e44ad',
        turbines: [
            { id: 'D-1', lat: 52.115436, lon: 5.064827 },
            { id: 'D-2', lat: 52.111985, lon: 5.071231 }
        ]
    }
};

/**
 * Approximate centreline of the A2 motorway near Lage Weide.
 * Used for the line-source noise model and the map polyline.
 * Coordinates are [latitude, longitude].
 */
const A2_PATH = [
    [52.1267745, 5.0178842],
    [52.1261695, 5.0189484],
    [52.1257022, 5.0197593],
    [52.1249890, 5.0209714],
    [52.1242059, 5.0222918],
    [52.1237171, 5.0230966],
    [52.1232842, 5.0238101],
    [52.1231312, 5.0227356],
    [52.1227629, 5.0232778],
    [52.1224657, 5.0237443],
    [52.1223120, 5.0239849],
    [52.1219798, 5.0248984],
    [52.1215893, 5.0255503],
    [52.1208121, 5.0268422],
    [52.1202118, 5.0279014],
    [52.1197617, 5.0287428],
    [52.1193192, 5.0296269],
    [52.1188364, 5.0306862],
    [52.1184917, 5.0315104],
    [52.1177451, 5.0361941],
    [52.1174029, 5.0366889],
    [52.1171414, 5.0369848],
    [52.1168013, 5.0374008],
    [52.1164920, 5.0379047],
    [52.1162872, 5.0383256],
    [52.1158834, 5.0390547],
    [52.1141200, 5.0434360],
    [52.1127986, 5.0467157],
    [52.1118000, 5.0494000],
    [52.1108000, 5.0518000],
    [52.1092000, 5.0551000],
    [52.1062177, 5.0588452],
    [52.1053215, 5.0601373],
    [52.1044702, 5.0612792],
    [52.1032854, 5.0627603],
    [52.1020403, 5.0641423],
    [52.1005322, 5.0656710],
    [52.0990365, 5.0670418],
    [52.0976367, 5.0678670]
];

// The first vertices of A2_PATH cover the Leidsche Rijntunnel. That section is
// drawn on the map (it is still the motorway) but is excluded from the open-air
// line-source noise model, because a covered road radiates no traffic noise to
// the surface. The southern end of A2_PATH was already trimmed to the last
// open-air point, so no vertices need dropping there.
const A2_TUNNEL_VERTEX_COUNT = 7;
const A2_NOISE_PATH = A2_PATH.slice(A2_TUNNEL_VERTEX_COUNT);

const A2_UNSHIELDED_REF_LDEN = 68;       // Lden at 100 m, open unshielded motorway [dB]
const A2_QUIET_ASPHALT_REDUCTION_DB = 4; // Double-layer porous asphalt (tweelaags ZOAB-fijn)
// Sound-absorbing panel alongside the A2 in the Lage Weide corridor.
// A conservative flat insertion-loss estimate of 5 dB is applied to all
// receivers; the actual benefit depends on panel height and geometry.
const A2_BARRIER_REDUCTION_DB = 5;

const HORIZON_REF_DIST = 50;
const HORIZON_HOUSE_H = 7;
const HORIZON_HOUSE_WALL_H = 5;
const HORIZON_TREE_H = 15;
const HORIZON_TREE_TRUNK_H = 3;

const LAYER_KEYS = ['turbines', 'noise', 'safety', 'a2', 'context'];
/** Layers shown on a fresh load; also the "no ?layers= needed" URL default. */
const DEFAULT_LAYER_KEYS = ['turbines', 'noise'];
const OPTION_KEYS = Object.keys(TURBINE_OPTIONS);
const URL_STATE = parseUrlState();
setDocumentLang(URL_STATE.lang);


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 3 – GEOMETRY HELPERS
   ═══════════════════════════════════════════════════════════════════════ */

const EARTH_RADIUS_M = 6371000;   // Mean Earth radius [m]
const DEG = Math.PI / 180;        // Radians per degree

/**
 * Haversine formula – great-circle distance between two points on Earth.
 *
 * Formula:
 *   a = sin²(Δlat/2) + cos(lat1) · cos(lat2) · sin²(Δlon/2)
 *   d = 2R · atan2(√a, √(1−a))
 *
 * where R = 6,371,000 m (mean Earth radius).
 *
 * Accuracy: <0.5 % for distances up to ~50 km, which is more than
 * sufficient for this application.
 *
 * @param {number} lat1 – latitude of point 1 [degrees]
 * @param {number} lon1 – longitude of point 1 [degrees]
 * @param {number} lat2 – latitude of point 2 [degrees]
 * @param {number} lon2 – longitude of point 2 [degrees]
 * @returns {number} distance [metres]
 */
function haversine(lat1, lon1, lat2, lon2) {
    const phi1 = lat1 * DEG;
    const phi2 = lat2 * DEG;
    const dphi = (lat2 - lat1) * DEG;
    const dlam = (lon2 - lon1) * DEG;
    const a    = Math.sin(dphi / 2) ** 2
               + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dlam / 2) ** 2;
    return EARTH_RADIUS_M * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Scale factors of a local equirectangular projection centred on `latRef`:
 * how many metres one degree of longitude and of latitude span there.
 *
 * Callers should centre the projection on the point they measure *from*, so
 * that its origin is exact and the longitude scale is taken at its latitude.
 *
 * @param {number} latRef – latitude the projection is centred on [degrees]
 * @returns {{ xScale: number, yScale: number }} metres per degree (east, north)
 */
function latLonScales(latRef) {
    const yScale = EARTH_RADIUS_M * DEG;
    return { xScale: Math.cos(latRef * DEG) * yScale, yScale };
}

/**
 * Move a lat/lon by a local east/north displacement in metres.
 *
 * @param {number} lat          – origin latitude [degrees]
 * @param {number} lon          – origin longitude [degrees]
 * @param {number} eastMetres   – displacement towards east [m]
 * @param {number} northMetres  – displacement towards north [m]
 * @returns {{ lat: number, lon: number }}
 */
function offsetLatLonMetres(lat, lon, eastMetres, northMetres) {
    const { xScale, yScale } = latLonScales(lat);
    return { lat: lat + northMetres / yScale, lon: lon + eastMetres / xScale };
}

/**
 * Point on segment A=(ax,ay)–B=(bx,by) closest to P=(px,py), all in the same
 * 2-D coordinate system (here: local metres).
 *
 * Uses clamped projection: t = clamp(AP·AB / |AB|², 0, 1).
 * The nearest point on AB is then A + t·AB; clamping t to [0, 1] keeps it
 * inside the segment rather than on the infinite line through A and B.
 *
 * @returns {{ x: number, y: number, dist: number }} nearest point and its distance
 */
function closestPointOnSegment(px, py, ax, ay, bx, by) {
    const dx = bx - ax;
    const dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    // Degenerate (zero-length) segment: A is the only candidate point.
    if (lenSq === 0) return { x: ax, y: ay, dist: Math.hypot(px - ax, py - ay) };
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
    const x = ax + t * dx;
    const y = ay + t * dy;
    return { x, y, dist: Math.hypot(px - x, py - y) };
}

/**
 * Shortest distance from a lat/lon point to a polyline (array of [lat, lon]).
 *
 * Projects all coordinates into a local flat (equirectangular) plane centred on
 * the observer. Measured against the great-circle distance this stays within
 * about 0.7 m over the full A2 path (≈0.02 % at 4 km), far below the metre
 * rounding the report displays.
 *
 * @param {number}   lat      – observer latitude [degrees]
 * @param {number}   lon      – observer longitude [degrees]
 * @param {number[][]} polyline – [[lat, lon], …]
 * @returns {number} distance [metres]
 */
function distToPolyline(lat, lon, polyline) {
    return nearestPointOnPolyline(lat, lon, polyline).dist;
}

/**
 * Point on `polyline` closest to (lat, lon), plus its distance.
 *
 * All vertices are projected once into the same local flat plane so that the
 * segment maths below is plain 2-D geometry in metres.
 *
 * @param {number}     lat      – observer latitude [degrees]
 * @param {number}     lon      – observer longitude [degrees]
 * @param {number[][]} polyline – [[lat, lon], …], at least two vertices
 * @returns {{ lat: number, lon: number, dist: number }}
 */
function nearestPointOnPolyline(lat, lon, polyline) {
    // Centre the projection on the observer: they sit exactly at the origin and
    // the longitude scale is correct at their latitude, so the error in the
    // reported distance grows only with that distance. Centring on an arbitrary
    // polyline vertex instead would spread the projection error of the whole
    // line (several km of the A2) into every result.
    const { xScale, yScale } = latLonScales(lat);
    const points = polyline.map(([vLat, vLon]) => ({
        x: (vLon - lon) * xScale,
        y: (vLat - lat) * yScale
    }));

    let best = { x: points[0].x, y: points[0].y, dist: Math.hypot(points[0].x, points[0].y) };
    for (let i = 0; i < points.length - 1; i++) {
        const candidate = closestPointOnSegment(0, 0, points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        if (candidate.dist < best.dist) best = candidate;
    }
    return { ...offsetLatLonMetres(lat, lon, best.x, best.y), dist: best.dist };
}

/**
 * Elevation angle from the observer's eye level (ground) to the top of an
 * object of given height at a given horizontal distance.
 *
 *   θ = atan(H / d)
 *
 * Because both the observer and the base of the object stand on the ground,
 * this angle is simultaneously the object's *apparent height*: the angle its
 * silhouette spans from base to tip. (The textbook angular-diameter formula
 * 2·atan(H / 2d) applies to an object centred on the line of sight, e.g. the
 * moon — not to a tower rising from the observer's own ground plane.)
 *
 * @param {number} heightMetres   – object height [m]
 * @param {number} distanceMetres – horizontal distance [m]
 * @returns {number} elevation angle [degrees]
 */
function elevationDegrees(heightMetres, distanceMetres) {
    const d = Math.max(distanceMetres, 1);
    return Math.atan(heightMetres / d) * 180 / Math.PI;
}

/**
 * True north bearing from point 1 to point 2, returned as [0, 360).
 *
 * @param {number} lat1 – observer latitude [degrees]
 * @param {number} lon1 – observer longitude [degrees]
 * @param {number} lat2 – target latitude [degrees]
 * @param {number} lon2 – target longitude [degrees]
 * @returns {number} bearing [degrees, 0 = N, 90 = E, 180 = S, 270 = W]
 */
function bearingDegrees(lat1, lon1, lat2, lon2) {
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const y    = Math.sin(dLon) * Math.cos(phi2);
    const x    = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLon);
    return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
}

/**
 * The turbine of one alternative closest to (lat, lon).
 *
 * Every alternative has at least one turbine, so this always returns a result.
 * The nearest turbine is the worst case for shadow flicker, external safety and
 * apparent size alike, so all three sections share this single lookup.
 *
 * @param {number} lat – observer latitude [degrees]
 * @param {number} lon – observer longitude [degrees]
 * @param {object} opt – one entry of TURBINE_OPTIONS
 * @returns {{ turbine: object, dist: number }} nearest turbine and its distance [m]
 */
function nearestTurbine(lat, lon, opt) {
    let best = null;
    for (const turbine of opt.turbines) {
        const dist = haversine(lat, lon, turbine.lat, turbine.lon);
        if (!best || dist < best.dist) best = { turbine, dist };
    }
    return best;
}

/**
 * Build an SVG showing the angular silhouette of all active wind turbines as
 * seen from the observer at (lat, lon), centred on the nearest turbine.
 *
 * Each turbine is drawn as a colour-coded tower line topped by a rotor disc
 * at its geometrically correct bearing and elevation angles. The vertical
 * scale is auto-fitted to the tallest visible turbine.
 *
 * @param {number} lat – observer latitude [degrees]
 * @param {number} lon – observer longitude [degrees]
 * @returns {string|null} SVG markup string, or null when no turbine alternatives are active.
 */
function renderHorizonSVG(lat, lon) {
    // Collect silhouette data for every turbine in every active alternative.
    const items       = [];
    let maxTipElev    = 0;

    for (const [key, opt] of Object.entries(TURBINE_OPTIONS)) {
        if (!activeOptions[key]) continue;
        for (const turbine of opt.turbines) {
            const dist        = haversine(lat, lon, turbine.lat, turbine.lon);
            const bearing     = bearingDegrees(lat, lon, turbine.lat, turbine.lon);
            const tipElev      = elevationDegrees(opt.tip_height, dist);
            const hubElev      = elevationDegrees(opt.hub_height, dist);
            const rotorTopElev = elevationDegrees(opt.hub_height + opt.rotor_diam / 2, dist);
            const rotorBotElev = Math.max(0, elevationDegrees(opt.hub_height - opt.rotor_diam / 2, dist));
            // Half the rotor's vertical angular extent → the disc radius to draw.
            const rotorRadAng  = (rotorTopElev - rotorBotElev) / 2;
            items.push({ opt, dist, bearing, hubElev, rotorRadAng });
            if (tipElev > maxTipElev) maxTipElev = tipElev;
        }
    }

    if (items.length === 0) return null;

    const nearestItem = items.reduce((a, b) => a.dist < b.dist ? a : b);
    const centerBearing = nearestItem.bearing;
    const relativeBearing = bearing => ((bearing - centerBearing + 540) % 360) - 180;
    for (const item of items) {
        item.relBearing = relativeBearing(item.bearing);
    }

    // Reference objects drawn at fixed distance for visual comparison.
    const houseTopElev  = elevationDegrees(HORIZON_HOUSE_H, HORIZON_REF_DIST);
    const houseWallElev = elevationDegrees(HORIZON_HOUSE_WALL_H, HORIZON_REF_DIST);
    const treeTopElev   = elevationDegrees(HORIZON_TREE_H, HORIZON_REF_DIST);
    const treeTrunkElev = elevationDegrees(HORIZON_TREE_TRUNK_H, HORIZON_REF_DIST);

    // SVG layout constants.
    const svgW              = 360;
    const groundY           = 58;   // y-coordinate of the ground line
    const svgH              = 68;   // total SVG height (sky + ground strip)
    const skyPadding        = 4;    // vertical gap above the tallest turbine [px]
    const scaleMargFactor   = 1.15; // tallest object fills 1/1.15 ≈ 87 % of usable height
    const minRotorRadiusPx  = 0.8;  // minimum rotor radius in SVG units for legibility
    const refLane           = 30;   // reserved margin on both sides for reference objects
    const minHalfSpanDeg    = 4;    // minimum half-width in angular degrees around the centre turbine
    const usableH = groundY - skyPadding;   // px available for turbine drawings
    // Auto-scale to the tallest object. The reference tree is included so that it
    // never overflows the SVG, and it also guarantees a non-zero angular scale
    // (15 m at 50 m ≈ 16.7°) however far away the turbines are.
    const maxElev = Math.max(maxTipElev, treeTopElev);
    const scale   = usableH / (maxElev * scaleMargFactor);
    const maxRotorRadius = Math.max(...items.map(item => Math.max(item.rotorRadAng * scale, minRotorRadiusPx)));
    const maxAbsRelBearing = Math.max(...items.map(item => Math.abs(item.relBearing)));
    const halfDrawableW = Math.max(1, svgW / 2 - refLane - maxRotorRadius - 2);
    const xScale = halfDrawableW / Math.max(maxAbsRelBearing, minHalfSpanDeg);
    const centerX = svgW / 2;
    const toX = relBearing => centerX + relBearing * xScale;

    let svg = `<svg viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg"` +
              ` style="width:100%;height:auto;display:block;border-radius:6px;overflow:hidden;">`;

    // Sky gradient background.
    svg += `<defs><linearGradient id="hzSky" x1="0" y1="0" x2="0" y2="1">` +
           `<stop offset="0%" stop-color="#b8d9ed"/>` +
           `<stop offset="100%" stop-color="#ddf0fb"/>` +
           `</linearGradient></defs>`;
    svg += `<rect x="0" y="0" width="${svgW}" height="${groundY}" fill="url(#hzSky)"/>`;
    // Ground strip.
    svg += `<rect x="0" y="${groundY}" width="${svgW}" height="${svgH - groundY}" fill="#8cb87c"/>`;
    svg += `<line x1="0" y1="${groundY}" x2="${svgW}" y2="${groundY}" stroke="#5a8a4a" stroke-width="0.8"/>`;
    svg += `<line x1="${centerX}" y1="3" x2="${centerX}" y2="${groundY}" stroke="#ffffff" stroke-width="0.8" opacity="0.35" stroke-dasharray="2 2"/>`;

    // Draw turbines back-to-front so nearer turbines render on top.
    const sorted = items.slice().sort((a, b) => b.dist - a.dist);
    const renderedItems = sorted.map(item => ({
        ...item,
        x: toX(item.relBearing),
        rotorR: Math.max(item.rotorRadAng * scale, minRotorRadiusPx)
    }));
    const minTurbineLeft = Math.min(...renderedItems.map(item => item.x - item.rotorR));
    const maxTurbineRight = Math.max(...renderedItems.map(item => item.x + item.rotorR));

    // Reference silhouettes: Dutch-style house (7 m) and poplar tree (15 m) at REF_DIST = 50 m.
    // Keep them just outside the full turbine group so they compare against the whole silhouette.
    {
        const refGap = 6;
        const hw = 8;
        const trunkW = 1.2;
        const crownRx = 2.5;
        const houseHalfW = hw / 2 + 1;
        const treeHalfW = Math.max(trunkW / 2, crownRx);
        const hx = Math.max(houseHalfW + 2, minTurbineLeft - refGap - houseHalfW);
        const tx = Math.min(svgW - treeHalfW - 2, maxTurbineRight + refGap + treeHalfW);
        const houseWallY = groundY - houseWallElev * scale;
        const houseRoofY = groundY - houseTopElev  * scale;

        // Dutch brick house: warm brick-red walls, steep dark clay-tile roof, chimney.
        svg += `<rect x="${(hx - hw / 2).toFixed(2)}" y="${houseWallY.toFixed(2)}"` +
               ` width="${hw}" height="${(groundY - houseWallY).toFixed(2)}"` +
               ` fill="#b84c26" stroke="#7a2f10" stroke-width="0.3" opacity="0.9"/>`;
        svg += `<polygon points="${(hx - hw / 2 - 1).toFixed(2)},${houseWallY.toFixed(2)}` +
               ` ${(hx + hw / 2 + 1).toFixed(2)},${houseWallY.toFixed(2)}` +
               ` ${hx},${houseRoofY.toFixed(2)}"` +
               ` fill="#2e1508" stroke="#1a0c04" stroke-width="0.3" opacity="0.9"/>`;
        const chimneyX    = hx + 2;
        const chimneyTopY = houseRoofY + (houseWallY - houseRoofY) * 0.45;
        svg += `<rect x="${(chimneyX - 0.7).toFixed(2)}" y="${chimneyTopY.toFixed(2)}"` +
               ` width="1.4" height="${(houseWallY - chimneyTopY).toFixed(2)}"` +
               ` fill="#8c3b1e" stroke="#5a2010" stroke-width="0.2" opacity="0.9"/>`;

        // Dutch poplar tree: slender trunk, tall narrow elliptical crown typical of Dutch polders.
        const treeTrunkY = groundY - treeTrunkElev * scale;
        const treeCrownY = groundY - treeTopElev   * scale;
        const crownCy    = (treeTrunkY + treeCrownY) / 2;
        const crownRy    = (treeTrunkY - treeCrownY) / 2;

        svg += `<rect x="${(tx - trunkW / 2).toFixed(2)}" y="${treeTrunkY.toFixed(2)}"` +
               ` width="${trunkW}" height="${(groundY - treeTrunkY).toFixed(2)}"` +
               ` fill="#4a2e0e" stroke="none" opacity="0.9"/>`;
        svg += `<ellipse cx="${tx.toFixed(2)}" cy="${crownCy.toFixed(2)}"` +
               ` rx="${crownRx}" ry="${crownRy.toFixed(2)}"` +
               ` fill="#376b2a" stroke="#1e4a15" stroke-width="0.4" opacity="0.9"/>`;
    }

    for (const { opt, x, hubElev, rotorR } of renderedItems) {
        const bx     = x.toFixed(1);
        const hubY   = (groundY - hubElev * scale).toFixed(1);
        const rotorRpx = rotorR.toFixed(1);
        // Tower: ground → hub centre.
        svg += `<line x1="${bx}" y1="${groundY}" x2="${bx}" y2="${hubY}"` +
               ` stroke="${opt.color}" stroke-width="1.5" opacity="0.9"/>`;
        // Rotor disc: circle at hub height.
        svg += `<circle cx="${bx}" cy="${hubY}" r="${rotorRpx}"` +
               ` fill="${opt.color}" fill-opacity="0.3" stroke="${opt.color}" stroke-width="0.8" opacity="0.9"/>`;
    }

    svg += '</svg>';
    return svg;
}


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 4 – NOISE CALCULATIONS
   ───────────────────────────────────────────────────────────────────────
   Reference: Dutch wind turbine assessment method (Reken- en Meetvoorschrift
   Windturbines, RMW 2011) and ISO 9613-2.

   POINT-SOURCE MODEL (single turbine):
     Lp = LwA − 20·log₁₀(d) − 8   [dB Lden]

   Derivation:
     • LwA = sound power level of the source [dB(A)]
     • 20·log₁₀(d) = spherical spreading loss (6 dB per doubling of distance)
     • −8 dB = geometric spreading constant + ground reflection:
         – −10·log₁₀(4π) ≈ −11 dB: converts sound power to sound pressure
           for a point source radiating into a full sphere
         – +3 dB: ground reflection (hemispherical radiation above a flat
           reflective surface)
         → −11 + 3 = −8 dB
       Meteorological corrections and Lden day/evening/night weighting are
       implicit in the LwA value and the Lden metric itself, not in this
       constant. The −8 value is the standard used in Dutch practice for
       the Lden assessment of wind turbines (Lden = annual average).

   SIMPLIFICATIONS / LIMITATIONS:
     • No terrain or screening effects (embankments, buildings)
     • No atmospheric refraction or absorption
     • Minimum distance capped at 50 m (near-field not valid for this formula)
     • All turbines in an option treated as identical sources

   LINE-SOURCE MODEL (A2 motorway, mitigation-adjusted):
     Lden ≈ 68 − 4 − 5 − 10·log₁₀(d/100)

   Derivation:
     • 68 dB at 100 m is the reference level for the A2 near Utrecht
       in open, unshielded conditions.
     • −4 dB corrects the open-road reference for quieter asphalt
       (tweelaags ZOAB-fijn / double-layer porous asphalt) used on the
       Oudenrijn–Leidsche Rijntunnel corridor.
     • −5 dB accounts for the sound-absorbing panel alongside the A2
       in the Lage Weide corridor (conservative insertion-loss estimate).
     • The covered Leidsche Rijntunnel section and the southern
       underground section are excluded from the open-air line-source
       calculation.
     • 10·log₁₀(d/100) = cylindrical spreading loss
       (3 dB per doubling of distance for an infinite line source).

   ENERGY SUMMATION (combining multiple sources):
     Combined Lden = 10·log₁₀( Σ 10^(Lᵢ/10) )

   This is the physically correct way to add sound levels from independent
   sources. Simply adding dB values would be wrong.
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * Sound pressure level at distance d from a single turbine.
 *
 * Lp = LwA − 20·log₁₀(d) − 8
 *
 * @param {number} LwA        – A-weighted sound power level of turbine [dB(A)]
 * @param {number} distMetres – distance from turbine to receiver [m]
 * @returns {number} Lden at the receiver [dB]
 */
function turbineNoise(LwA, distMetres) {
    // Clamp distance to ≥ 50 m; the point-source formula is not valid closer
    const d = Math.max(distMetres, 50);
    return LwA - 20 * Math.log10(d) - 8;
}

/**
 * Combined Lden from ALL turbines in one alternative at a given point.
 *
 * Steps:
 *   1. For each turbine, compute Lp = LwA − 20·log₁₀(d) − 8
 *   2. Convert each Lp to a linear power: p = 10^(Lp/10)
 *   3. Sum all linear powers: Σp
 *   4. Convert back to dB: Lden = 10·log₁₀(Σp)
 *
 * @param {number} lat    – observer latitude [degrees]
 * @param {number} lon    – observer longitude [degrees]
 * @param {string} optKey – alternative key ('A'|'B'|'C'|'D')
 * @returns {number} combined Lden [dB]
 */
function calcOptionNoise(lat, lon, optKey) {
    const opt = TURBINE_OPTIONS[optKey];
    return sumLden(...opt.turbines.map(turbine =>
        turbineNoise(opt.LwA, haversine(lat, lon, turbine.lat, turbine.lon))
    ));
}

/**
 * Lden from the A2 motorway at a given point.
 *
 * Lden ≈ 68 − 4 − 5 − 10·log₁₀(d/100)
 *
 * Minimum distance capped at 25 m (observer cannot be on the road).
 *
 * @param {number} lat – observer latitude [degrees]
 * @param {number} lon – observer longitude [degrees]
 * @returns {number} A2 Lden [dB]
 */
function calcA2Noise(lat, lon) {
    const d = Math.max(distToPolyline(lat, lon, A2_NOISE_PATH), 25);
    return A2_UNSHIELDED_REF_LDEN - A2_QUIET_ASPHALT_REDUCTION_DB - A2_BARRIER_REDUCTION_DB - 10 * Math.log10(d / 100);
}

/**
 * Physically correct addition of two or more Lden levels.
 *
 * Ltotal = 10·log₁₀( Σ 10^(Lᵢ/10) )
 *
 * Non-finite (e.g. -Infinity) values are ignored.
 *
 * @param {...number} levels – Lden values [dB]
 * @returns {number} combined Lden [dB]
 */
function sumLden(...levels) {
    const pow = levels
        .filter(Number.isFinite)
        .reduce((sum, level) => sum + Math.pow(10, level / 10), 0);
    return pow > 0 ? 10 * Math.log10(pow) : -Infinity;
}

/**
 * Increase in overall noise level caused by adding wind turbines to
 * the existing A2 background.
 *
 * ΔdB = Lcombined − Lbackground
 *
 * Human perception: a 3 dB increase is barely perceptible; 10 dB sounds
 * roughly twice as loud. Values ≥ 3 dB indicate a meaningful contribution.
 *
 * @param {number} background – existing Lden (A2) [dB]
 * @param {number} combined   – Lden after adding wind turbines [dB]
 * @returns {number} ΔdB
 */
function dBAdded(background, combined) {
    return combined - background;
}


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 5 – SHADOW FLICKER ESTIMATE
   ───────────────────────────────────────────────────────────────────────
   Shadow flicker occurs when a rotating wind turbine blade periodically
   casts a moving shadow on a receptor (window, outdoor area).

   EMPIRICAL FORMULA:
     h ≈ 400 × (D/d)²

   where:
     D = rotor diameter [m]
     d = horizontal distance from turbine to receptor [m]
     h = estimated annual shadow hours WITHOUT automatic shutdown

   Derivation / background:
     • The formula is an empirical approximation used in Dutch pre-screening
       (cf. Informatieblad Slagschaduw, RVO 2022).
     • The (D/d)² factor reflects that the angular size of the rotor (and
       thus the frequency of shadow passage) decreases with distance.
     • The coefficient 400 encodes a statistical average over sun position,
       cloud cover and wind direction for the Netherlands.
     • It gives the WORST CASE turbine in the alternative (nearest turbine).
     • Result is capped at 2,000 h/yr to avoid unrealistic values very
       close to the turbine.

   Dutch norm: maximum 6 h/yr and 20 min/day on sensitive receptors
   (homes, schools, care facilities).
   Modern turbines use automatic shadow management to comply in practice.
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * Estimated annual shadow-flicker hours for the worst-case (nearest) turbine
 * in the chosen alternative.
 *
 * @param {number} lat    – observer latitude [degrees]
 * @param {number} lon    – observer longitude [degrees]
 * @param {string} optKey – alternative key ('A'|'B'|'C'|'D')
 * @returns {number} estimated shadow hours per year
 */
function calcShadowHours(lat, lon, optKey) {
    const opt = TURBINE_OPTIONS[optKey];
    // Every turbine in an alternative shares the same rotor diameter, so h depends
    // on distance alone: the nearest turbine is always the worst case.
    // Clamp distance to ≥ 20 m to avoid division-by-zero near the turbine base.
    const d = Math.max(nearestTurbine(lat, lon, opt).dist, 20);
    return Math.min(400 * Math.pow(opt.rotor_diam / d, 2), 2000); // cap at 2,000 h/yr
}


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 6 – ENERGY OUTPUT & CO₂
   ───────────────────────────────────────────────────────────────────────
   Annual energy output per alternative:

     E = N × P × FLH   [MWh/year]

   where:
     N   = number of turbines in the alternative
     P   = rated capacity per turbine [MW]
     FLH = full-load hours per year [h], PER ALTERNATIVE (opt.flh)

   FLH is not a single generic figure. Each alternative's value is derived
   from the output estimate in cNRD Table 3.2, which already accounts for
   the wind speed at that alternative's hub height:

     A  8 × 2.3 MW × 1,228 h = 22,595 MWh ≈ 22.6 GWh/yr
     B  4 × 3.8 MW × 1,842 h = 27,998 MWh ≈ 28.0 GWh/yr
     C  4 × 4.5 MW × 2,222 h = 39,996 MWh ≈ 40.0 GWh/yr
     D  2 × 7.2 MW × 2,451 h = 35,294 MWh ≈ 35.3 GWh/yr

   Households powered:
     HH = E × 1,000 / 3,500
     (Dutch average household electricity use ≈ 3,500 kWh/yr, CBS 2023)

   CO₂ avoided:
     CO₂ = E × 0.4   [tonnes CO₂/yr]
     E [MWh] × 1,000 kWh/MWh × 0.4 kg/kWh ÷ 1,000 kg/tonne = 0.4 × E tonnes
     (Dutch grid emission factor ≈ 0.4 kg CO₂/kWh, IEA 2023)
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * Annual energy production and derived benefits for one alternative.
 *
 * @param {string} optKey – alternative key ('A'|'B'|'C'|'D')
 * @returns {{ mwh: number, households: number, co2: number }}
 */
function calcEnergy(optKey) {
    const opt = TURBINE_OPTIONS[optKey];
    const mwh = opt.turbines.length * opt.capacity_mw * opt.flh;
    return {
        mwh:        Math.round(mwh),
        households: Math.round(mwh * 1000 / 3500), // 3,500 kWh/yr per household
        co2:        Math.round(mwh * 0.4)          // 0.4 kg CO₂/kWh → tonnes/yr
    };
}


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 7 – CLASSIFICATION HELPERS
   ───────────────────────────────────────────────────────────────────────
   Translate numeric results into colour-coded labels for the UI.
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * Classify a wind-turbine Lden value against Dutch standards.
 *
 * Dutch standards (Activiteitenbesluit / Besluit activiteiten leefomgeving):
 *   ≤ 45 dB Lden – normal limit
 *   ≤ 47 dB Lden – maximum limit (only under strict conditions)
 *   > 47 dB Lden – exceedance; permit normally not granted
 *
 * @param {number} lden – Lden value [dB]
 * @returns {{ cls: string, desc: string }}
 */
function noiseClass(lden) {
    if (lden < 35) return { cls: 'badge-green',  desc: t('veryLow') };
    if (lden < 40) return { cls: 'badge-green',  desc: t('low') };
    if (lden < 45) return { cls: 'badge-yellow', desc: t('moderate') };
    if (lden < 47) return { cls: 'badge-orange', desc: t('limit') };
    return             { cls: 'badge-red',    desc: t('exceeded') };
}

/**
 * Text colour matching each badge class, for numbers shown next to a badge.
 * Yellow is darkened from the legend swatch (#f1c40f) so that it stays legible
 * as text on the white report background.
 */
const BADGE_TEXT_COLOR = {
    'badge-green':  '#27ae60',
    'badge-yellow': '#b7950b',
    'badge-orange': '#e67e22',
    'badge-red':    '#e74c3c'
};

/**
 * Classify estimated shadow-flicker hours against the Dutch 6 h/yr norm.
 *
 * @param {number} hours – annual shadow hours (without automatic shutdown)
 * @returns {{ cls: string, label: string }}
 */
function shadowClass(hours) {
    if (hours < 6)  return { cls: 'badge-green',  label: t('underNorm') };
    if (hours < 16) return { cls: 'badge-orange', label: t('aboveNorm') };
    return              { cls: 'badge-red',    label: t('highlyElevated') };
}

/**
 * Classify external safety based on distance vs. tip-height safety zone.
 *
 * Dutch risk regulation (Handboek Risicozonering Windturbines, 2020):
 *   • Within 1× tip height: location-based risk (PR 10⁻⁶/yr) is likely
 *     exceeded for permanent human presence – assessment required.
 *   • Within 2× tip height: risk assessment recommended.
 *   • Beyond 2× tip height: outside the primary concern zone.
 *
 * Note: these are simplified thresholds for orientation. The formal
 * assessment uses quantitative risk models.
 *
 * @param {number} dist      – distance to nearest turbine [m]
 * @param {number} tipHeight – turbine tip height [m]
 * @returns {{ cls: string, label: string }}
 */
function safetyClass(dist, tipHeight) {
    if (dist > tipHeight * 2) return { cls: 'badge-green',  label: t('outsideZone') };
    if (dist > tipHeight)     return { cls: 'badge-yellow', label: t('assessNeeded') };
    return                        { cls: 'badge-red',    label: t('insideZone') };
}


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 8 – MAP INITIALISATION
   ═══════════════════════════════════════════════════════════════════════ */

const DEFAULT_MAP_CENTER = [52.1125, 5.0645];
const DEFAULT_MAP_ZOOM = 13;

const map = L.map('map', {
    center: DEFAULT_MAP_CENTER,
    zoom: DEFAULT_MAP_ZOOM,
    zoomControl: true
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map);

// Track which alternatives are currently shown
const activeOptions = { A: true, B: true, C: true, D: true };
if (URL_STATE.options !== null) {
    for (const key of OPTION_KEYS) activeOptions[key] = URL_STATE.options.includes(key);
}

// Map layer-group references, keyed by LAYER_KEYS so that checkbox `toggle-<key>`
// drives layer group LAYER_GROUPS[key]. Initial visibility comes from
// DEFAULT_LAYER_KEYS via syncLayerVisibility(), so no group is added here.
const turbineGroup = L.layerGroup();
const noiseGroup   = L.layerGroup();
const safetyGroup  = L.layerGroup();
const a2Group      = L.layerGroup();
const contextGroup = L.layerGroup();
const LAYER_GROUPS = {
    turbines: turbineGroup,
    noise:    noiseGroup,
    safety:   safetyGroup,
    a2:       a2Group,
    context:  contextGroup
};

// Always visible: connector lines from the selected point.
const selectionGroup = L.layerGroup().addTo(map);
let clickMarker = null;
let lastClickedLatLon = null;

function syncLayerVisibility() {
    for (const key of LAYER_KEYS) {
        const group = LAYER_GROUPS[key];
        if (layerToggle(key).checked) group.addTo(map);
        else map.removeLayer(group);
    }
}

function applyInitialUrlState() {
    if (URL_STATE.layers !== null) {
        for (const key of LAYER_KEYS) {
            layerToggle(key).checked = URL_STATE.layers.includes(key);
        }
    }
    syncLayerVisibility();

    if (URL_STATE.point) {
        map.setView([URL_STATE.point.lat, URL_STATE.point.lon], Math.max(map.getZoom(), 14));
        placeClickMarker(URL_STATE.point.lat, URL_STATE.point.lon);
        updateInfoPanel(URL_STATE.point.lat, URL_STATE.point.lon);
    } else {
        updateUrlState();
    }
}

function resetAppState() {
    setDocumentLang('nl');

    for (const key of OPTION_KEYS) activeOptions[key] = true;
    for (const key of LAYER_KEYS) layerToggle(key).checked = DEFAULT_LAYER_KEYS.includes(key);

    if (clickMarker) {
        map.removeLayer(clickMarker);
        clickMarker = null;
    }

    // Clearing the selection makes redrawAll() empty the selection and context
    // groups, so no explicit clearLayers() is needed here.
    lastClickedLatLon = null;
    syncLayerVisibility();
    buildControls();
    redrawAll();
    showPlaceholder();
    map.setView(DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM);
    clearUrlState();
}


/* ── Draw A2 motorway polyline ── */
function drawA2() {
    a2Group.clearLayers();
    L.polyline(A2_PATH, {
        color: '#e74c3c', weight: 5, opacity: 0.8,
        dashArray: '8 4'
    }).addTo(a2Group)
      .bindTooltip(t('a2Tooltip'), { sticky: true });
}
drawA2();


/* ── Turbine marker (coloured circle with option letter) ── */
function makeTurbineIcon(color, letter) {
    return L.divIcon({
        className: '',
        html: `<div style="
            width:28px;height:28px;border-radius:50%;
            background:${color};color:white;
            display:flex;align-items:center;justify-content:center;
            font-weight:900;font-size:13px;
            border:2px solid white;
            box-shadow:0 2px 6px rgba(0,0,0,0.5);">${letter}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
    });
}

/* ── Draw turbine markers ── */
function drawTurbines() {
    turbineGroup.clearLayers();
    for (const [key, opt] of Object.entries(TURBINE_OPTIONS)) {
        if (!activeOptions[key]) continue;
        const name = optionName(opt);
        const desc = optionDesc(opt);
        for (const turbine of opt.turbines) {
            const marker = L.marker([turbine.lat, turbine.lon], {
                icon: makeTurbineIcon(opt.color, key),
                zIndexOffset: 100
            });
            marker.bindTooltip(
                `<b>${turbine.id}</b><br>${name}: ${desc}<br>` +
                `${t('tipHeight')}: ${opt.tip_height} m | LwA: ${opt.LwA} dB(A)`,
                { direction: 'top', offset: [0, -14] }
            );
            turbineGroup.addLayer(marker);
        }
    }
}

/**
 * Draw 47 dB Lden noise-contour circle around each individual turbine.
 *
 * The contour radius d₄₇ is the distance at which one turbine alone
 * produces exactly 47 dB Lden. Derived from the point-source formula:
 *
 *   47 = LwA − 20·log₁₀(d₄₇) − 8
 *   20·log₁₀(d₄₇) = LwA − 55
 *   d₄₇ = 10^((LwA − 55) / 20)
 */
function drawNoiseContours() {
    noiseGroup.clearLayers();
    for (const [key, opt] of Object.entries(TURBINE_OPTIONS)) {
        if (!activeOptions[key]) continue;
        // Distance [m] at which a single turbine causes 47 dB Lden
        const d47  = Math.pow(10, (opt.LwA - 8 - 47) / 20);
        const name = optionName(opt);
        for (const turbine of opt.turbines) {
            L.circle([turbine.lat, turbine.lon], {
                radius: d47, color: opt.color, weight: 1.5,
                fillColor: opt.color, fillOpacity: 0.06, dashArray: '4 3'
            }).addTo(noiseGroup)
              .bindTooltip(
                `${name}: 47 dB Lden contour (~${Math.round(d47)} m)`,
                { sticky: true }
              );
        }
    }
}

/* ── Draw tip-height safety-zone circles ── */
function drawSafetyZones() {
    safetyGroup.clearLayers();
    for (const [key, opt] of Object.entries(TURBINE_OPTIONS)) {
        if (!activeOptions[key]) continue;
        for (const turbine of opt.turbines) {
            L.circle([turbine.lat, turbine.lon], {
                radius: opt.tip_height, color: '#e74c3c', weight: 2,
                fillColor: '#e74c3c', fillOpacity: 0.12, dashArray: '6 3'
            }).addTo(safetyGroup)
              .bindTooltip(
                `${turbine.id} ${t('safetyZone')}: ${opt.tip_height} m (${t('tipHeight').toLowerCase()})`,
                { sticky: true }
              );
        }
    }
}

function drawSelectionLines() {
    selectionGroup.clearLayers();
    if (!lastClickedLatLon) return;

    const selected = [lastClickedLatLon.lat, lastClickedLatLon.lon];

    for (const [key, opt] of Object.entries(TURBINE_OPTIONS)) {
        if (!activeOptions[key]) continue;

        const { turbine, dist } = nearestTurbine(lastClickedLatLon.lat, lastClickedLatLon.lon, opt);
        L.polyline([selected, [turbine.lat, turbine.lon]], {
            color: opt.color,
            weight: 2.5,
            opacity: 0.85,
            dashArray: '6 6'
        }).addTo(selectionGroup)
          .bindTooltip(`${optionName(opt)}: ${Math.round(dist)} m`, { sticky: true });
    }

    const nearestA2 = nearestPointOnPolyline(lastClickedLatLon.lat, lastClickedLatLon.lon, A2_PATH);
    L.polyline([selected, [nearestA2.lat, nearestA2.lon]], {
        color: '#e74c3c',
        weight: 3,
        opacity: 0.85,
        dashArray: '4 6'
    }).addTo(selectionGroup)
      .bindTooltip(`${t('distToA2')}: ${Math.round(nearestA2.dist)} m`, { sticky: true });
}

function makeContextIcon(emoji) {
    return L.divIcon({
        className: '',
        html: `<div style="
            font-size:20px;
            line-height:20px;
            text-shadow:0 1px 4px rgba(255,255,255,0.95), 0 1px 6px rgba(0,0,0,0.45);
        ">${emoji}</div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
}

function drawContextReferences() {
    contextGroup.clearLayers();
    if (!lastClickedLatLon) return;

    const { lat, lon } = lastClickedLatLon;
    const housePoint = offsetLatLonMetres(lat, lon, -HORIZON_REF_DIST, 0);
    const treePoint = offsetLatLonMetres(lat, lon, HORIZON_REF_DIST, 0);

    L.circle([lat, lon], {
        radius: HORIZON_REF_DIST,
        color: '#5d6d7e',
        weight: 1.5,
        opacity: 0.8,
        dashArray: '4 5',
        fillOpacity: 0
    }).addTo(contextGroup)
      .bindTooltip(`${t('contextRadius')}: ${HORIZON_REF_DIST} m`, { sticky: true });

    L.marker([housePoint.lat, housePoint.lon], {
        icon: makeContextIcon('🏠'),
        zIndexOffset: 250
    }).addTo(contextGroup)
      .bindTooltip(
        tf('contextTooltip', {
            label: t('contextHouse'),
            height: HORIZON_HOUSE_H,
            distance: HORIZON_REF_DIST
        }),
        { direction: 'top', offset: [0, -8] }
      );

    L.marker([treePoint.lat, treePoint.lon], {
        icon: makeContextIcon('🌳'),
        zIndexOffset: 250
    }).addTo(contextGroup)
      .bindTooltip(
        tf('contextTooltip', {
            label: t('contextTree'),
            height: HORIZON_TREE_H,
            distance: HORIZON_REF_DIST
        }),
        { direction: 'top', offset: [0, -8] }
      );
}

function redrawAll() {
    drawTurbines();
    drawNoiseContours();
    drawSafetyZones();
    drawA2(); // re-draw to pick up translated tooltip
    drawSelectionLines();
    drawContextReferences();
}
redrawAll();

function refreshCurrentReport() {
    if (lastClickedLatLon) updateInfoPanel(lastClickedLatLon.lat, lastClickedLatLon.lon);
    else showPlaceholder();
}


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 9 – CONTROL PANEL
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * (Re-)build the alternative toggle buttons and bottom legend.
 * Called on first load and whenever the language changes.
 */
function buildControls() {
    // Update static text in the left panel
    document.getElementById('btn-nl').classList.toggle('active', LANG === 'nl');
    document.getElementById('btn-en').classList.toggle('active', LANG === 'en');
    document.getElementById('btn-reset').textContent = t('reset');
    document.getElementById('ctrl-title').textContent    = t('title');
    document.getElementById('ctrl-subtitle').textContent = t('subtitle');
    document.getElementById('ctrl-alts-h3').textContent  = t('alternatives');
    document.getElementById('ctrl-layers-h3').textContent= t('mapLayers');
    document.getElementById('ctrl-norms-h3').textContent = t('norms');

    document.getElementById('lbl-turbines').querySelector('span').textContent = t('layerTurbines');
    document.getElementById('lbl-noise').querySelector('span').textContent    = t('layerNoise');
    document.getElementById('lbl-safety').querySelector('span').textContent   = t('layerSafety');
    document.getElementById('lbl-a2').querySelector('span').textContent       = t('layerA2');
    document.getElementById('lbl-context').querySelector('span').textContent  = t('layerContext');

    document.getElementById('norm-1').textContent = t('norm1');
    document.getElementById('norm-2').textContent = t('norm2');
    document.getElementById('norm-3').textContent = t('norm3');
    document.getElementById('norm-4').textContent = t('norm4');
    document.getElementById('norm-note').textContent = t('normNote');
    document.getElementById('source-note').textContent = t('sourceNote');
    document.getElementById('ctrl-links-h3').textContent = t('links');
    document.getElementById('btn-my-location').innerHTML =
        `<span class="loc-icon">📍</span> ${t('myLocation')}`;

    // Populate links
    const linksContainer = document.getElementById('links-container');
    linksContainer.innerHTML = `
        <div style="font-size:11px;line-height:1.6;">
            <a href="https://github.com/eveenendaal/wind-lage-weide" target="_blank" style="color:#0366d6;text-decoration:none;display:block;margin-bottom:4px;">
                📜 ${t('linkGithub')}
            </a>
            <a href="https://denkmee.utrecht.nl/nl-NL/projects/windoplageweide" target="_blank" style="color:#0366d6;text-decoration:none;display:block;">
                🔗 ${t('linkProject')}
            </a>
        </div>
    `;

    // Rebuild dynamic alternative buttons
    const container = document.getElementById('option-btns');
    container.innerHTML = '';

    for (const [key, opt] of Object.entries(TURBINE_OPTIONS)) {
        const name = optionName(opt);
        const desc = optionDesc(opt);

        const btn = document.createElement('div');
        btn.className = 'option-btn' + (activeOptions[key] ? ' active' : '');
        btn.style.color = opt.color;
        btn.innerHTML = `
            <div class="option-dot" style="background:${opt.color}"></div>
            <div style="flex:1">
                <div class="option-label" style="color:${opt.color}">${name}</div>
                <div class="option-sub">${desc}</div>
            </div>
            <span class="option-check">${activeOptions[key] ? '✓' : ''}</span>`;
        btn.addEventListener('click', () => {
            activeOptions[key] = !activeOptions[key];
            buildControls();
            redrawAll();
            refreshCurrentReport();
            updateUrlState();
        });
        container.appendChild(btn);
    }
}
buildControls();
document.getElementById('btn-reset').addEventListener('click', resetAppState);


/* ── Fullscreen toggle button (mobile only) ── */
document.getElementById('btn-fullscreen').addEventListener('click', () => {
    document.body.classList.toggle('info-fullscreen');
});


/* ── Layer checkbox listeners ── */
for (const key of LAYER_KEYS) {
    layerToggle(key).addEventListener('change', () => {
        syncLayerVisibility();
        refreshCurrentReport();
        updateUrlState();
    });
}


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 10 – LANGUAGE TOGGLE
   ═══════════════════════════════════════════════════════════════════════ */

document.getElementById('btn-nl').addEventListener('click', () => setLang('nl'));
document.getElementById('btn-en').addEventListener('click', () => setLang('en'));

/**
 * Set the active language and keep <html lang> in step, so that screen readers
 * and translation tools announce the page in the language actually rendered.
 * Does not re-render: callers decide what needs refreshing.
 */
function setDocumentLang(lang) {
    LANG = lang;
    document.documentElement.lang = lang;
}

function setLang(lang) {
    setDocumentLang(lang);
    // buildControls() syncs the NL/EN button states along with the rest of the panel.
    buildControls();
    redrawAll();
    refreshCurrentReport();
    updateUrlState();
}


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 11 – MY LOCATION
   ═══════════════════════════════════════════════════════════════════════ */

document.getElementById('btn-my-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert(t('locError'));
        return;
    }
    const btn = document.getElementById('btn-my-location');
    btn.innerHTML = `<span class="loc-icon">⏳</span> ${t('locating')}`;
    btn.disabled = true;

    navigator.geolocation.getCurrentPosition(
        pos => {
            btn.disabled = false;
            btn.innerHTML = `<span class="loc-icon">📍</span> ${t('myLocation')}`;
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            // Pan and zoom to the user's position
            map.setView([lat, lon], 14);
            placeClickMarker(lat, lon);
            updateInfoPanel(lat, lon);
        },
        _err => {
            btn.disabled = false;
            btn.innerHTML = `<span class="loc-icon">📍</span> ${t('myLocation')}`;
            alert(t('locError'));
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
});


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 12 – MAP CLICK HANDLER
   ═══════════════════════════════════════════════════════════════════════ */

map.on('click', e => {
    const { lat, lng } = e.latlng;
    placeClickMarker(lat, lng);
    updateInfoPanel(lat, lng);
});

/** Place (or move) the blue dot marker at lat/lon. */
function placeClickMarker(lat, lon) {
    if (clickMarker) map.removeLayer(clickMarker);
    clickMarker = L.marker([lat, lon], {
        icon: L.divIcon({
            className: '',
            html: '<div style="width:16px;height:16px;background:#1a5276;border-radius:50%;border:3px solid white;box-shadow:0 1px 5px rgba(0,0,0,0.5)"></div>',
            iconSize: [16, 16], iconAnchor: [8, 8]
        })
    }).addTo(map);
    lastClickedLatLon = { lat, lon };
    drawSelectionLines();
    drawContextReferences();
    updateUrlState();
}


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 13 – INFO PANEL RENDERING
   ═══════════════════════════════════════════════════════════════════════ */

function showPlaceholder() {
    document.body.classList.remove('has-selection');
    document.getElementById('info-header-title').textContent = t('infoTitle');
    document.getElementById('info-coords').textContent       = t('clickPrompt');
    document.getElementById('info-body').innerHTML = `
        <div id="info-placeholder">
            <div class="icon">👆</div>
            <p>${t('placeholderMsg')}</p>
            <p style="margin-top:10px;font-size:11px;">${t('placeholderHint')}</p>
        </div>`;
}
showPlaceholder();

/**
 * (Re-)render the right-hand info panel for a given lat/lon.
 *
 * @param {number} lat – observer latitude [degrees]
 * @param {number} lon – observer longitude [degrees]
 */
function updateInfoPanel(lat, lon) {
    document.body.classList.add('has-selection');
    document.getElementById('info-header-title').textContent = t('infoTitle');
    document.getElementById('info-coords').textContent =
        `${lat.toFixed(5)}°N, ${lon.toFixed(5)}°${LANG === 'nl' ? 'O' : 'E'}`;

    // ── Pre-compute all values ──
    const a2Noise = calcA2Noise(lat, lon);
    const a2Dist  = Math.round(distToPolyline(lat, lon, A2_PATH));

    // One row per active alternative, carrying every value the sections below
    // need. Noise, shadow flicker, safety and apparent size all key off the
    // nearest turbine, so its distance is resolved once here.
    const rows = OPTION_KEYS.filter(key => activeOptions[key]).map(key => {
        const opt       = TURBINE_OPTIONS[key];
        const windNoise = calcOptionNoise(lat, lon, key);
        const combined  = sumLden(a2Noise, windNoise);
        return {
            key,
            opt,
            windNoise,
            combined,
            added:       dBAdded(a2Noise, combined),
            rating:      noiseClass(windNoise),
            shadowHours: calcShadowHours(lat, lon, key),
            nearestDist: nearestTurbine(lat, lon, opt).dist
        };
    });

    // ── Build HTML ──
    let html = '';

    /* ── Location context ── */
    html += `<div class="info-section">
        <h4>${t('locContext')}</h4>
        <div class="effect-row">
            <span class="effect-label">${t('distToA2')}</span>
            <span class="effect-value">${a2Dist} m</span>
        </div>
        <div class="effect-row">
            <span class="effect-label">${t('a2NoiseLabel')}</span>
            <span class="effect-value ${a2Noise > 55 ? 'val-red' : a2Noise > 50 ? 'val-orange' : 'val-green'}">${a2Noise.toFixed(1)} dB</span>
        </div>
        <div style="font-size:10px;color:#95a5a6;margin-top:4px;">${t('a2Note')}</div>
    </div>`;

    /* ── Noise comparison table ── */
    if (rows.length > 0) {
        html += `<div class="info-section">
            <h4>${t('noiseTitle')}</h4>
            <table class="noise-table">
                <thead>
                    <tr>
                        <th>${t('thOption')}</th>
                        <th>${t('thWind')}</th>
                        <th>${t('thA2')}</th>
                        <th>${t('thCumul')}</th>
                        <th>${t('thDelta')}</th>
                        <th>${t('thRating')}</th>
                    </tr>
                </thead>
                <tbody>`;
        for (const r of rows) {
            // Colour the Lden figure to match the badge beside it, so the number
            // and the rating can never disagree.
            const noiseColor = BADGE_TEXT_COLOR[r.rating.cls];
            // ΔdB: ≥ 3 dB is a clearly audible increase, ≥ 1 dB a marginal one.
            const deltaColor = r.added > 3 ? '#e74c3c'
                             : r.added > 1 ? '#e67e22'
                             : '#27ae60';
            html += `<tr>
                <td><span style="color:${r.opt.color};font-weight:700">${r.key}</span></td>
                <td style="font-weight:700;color:${noiseColor}">${r.windNoise.toFixed(1)}</td>
                <td>${a2Noise.toFixed(1)}</td>
                <td>${r.combined.toFixed(1)}</td>
                <td style="color:${deltaColor}">+${r.added.toFixed(1)}</td>
                <td><span class="badge ${r.rating.cls}">${r.rating.desc}</span></td>
            </tr>`;
        }
        html += `</tbody></table>
            <div style="font-size:10px;color:#95a5a6;margin-top:5px;">${t('noiseNote')}</div>
        </div>`;
    } else {
        html += `<div class="info-section"><div style="font-size:12px;color:#7f8c8d;">${t('noSelect')}</div></div>`;
    }

    /* ── Shadow flicker ── */
    if (rows.length > 0) {
        html += `<div class="info-section"><h4>${t('shadowTitle')}</h4>`;
        for (const r of rows) {
            const sc       = shadowClass(r.shadowHours);
            // Bar is full at 16 h/yr, the top of the "above limit" band.
            const barW     = Math.min(100, (r.shadowHours / 16) * 100);
            const barColor = BADGE_TEXT_COLOR[sc.cls];
            const hLabel   = r.shadowHours >= 1 ? r.shadowHours.toFixed(1) : '<1';
            html += `<div class="shadow-row">
                <div class="shadow-opt">
                    <span style="color:${r.opt.color};font-weight:700">${r.key}</span>
                    <span>${hLabel} ${t('shadowHrYr')}</span>
                    <span class="badge ${sc.cls}">${sc.label}</span>
                </div>
                <div class="shadow-bar" style="width:${barW}%;background:${barColor}"></div>
            </div>`;
        }
        html += `<div style="font-size:10px;color:#95a5a6;margin-top:5px;">${t('shadowNote')}</div>
        </div>`;
    }

    /* ── External safety ── */
    if (rows.length > 0) {
        html += `<div class="info-section"><h4>${t('safetyTitle')}</h4>`;
        for (const r of rows) {
            const sc = safetyClass(r.nearestDist, r.opt.tip_height);
            html += `<div class="effect-row">
                <span class="effect-label" style="color:${r.opt.color};font-weight:700">${r.key}</span>
                <span>${Math.round(r.nearestDist)} m ${t('safetyFrom')}</span>
                <span class="badge ${sc.cls}">${sc.label}</span>
            </div>`;
        }
        html += `<div style="font-size:10px;color:#95a5a6;margin-top:5px;">${t('safetyNote')}</div>
        </div>`;
    }

    /* ── Health ── */
    html += `<div class="info-section">
        <h4>${t('healthTitle')}</h4>
        <div style="font-size:11px;line-height:1.6;color:#444;">
            <p>${t('healthP1')}</p>
            <p style="margin-top:4px;">${t('healthP2')}</p>
            <div class="info-divider"></div>
            <b>${t('healthDose')}</b>
            <div class="effect-row" style="margin-top:4px;"><span class="effect-label">~40 dB Lden</span><span class="effect-value">${t('health40')}</span></div>
            <div class="effect-row"><span class="effect-label">~45 dB Lden</span><span class="effect-value">${t('health45')}</span></div>
            <div class="effect-row"><span class="effect-label">~47 dB Lden</span><span class="effect-value">${t('health47')}</span></div>
        </div>
    </div>`;

    /* ── Nature ── */
    html += `<div class="info-section">
        <h4>${t('natureTitle')}</h4>
        <div style="font-size:11px;line-height:1.6;color:#444;">
            <div class="effect-row"><span class="effect-label">${t('natureBirds')}</span><span class="effect-value"><span class="badge badge-orange">${t('risk')}</span></span></div>
            <div class="effect-row"><span class="effect-label">${t('natureBats')}</span><span class="effect-value"><span class="badge badge-orange">${t('risk')}</span></span></div>
            <div class="effect-row"><span class="effect-label">${t('natureN2000')}</span><span class="effect-value"><span class="badge badge-yellow">${t('assessNeededShort')}</span></span></div>
            <div style="font-size:10px;color:#95a5a6;margin-top:3px;">${t('natureNote')}</div>
        </div>
    </div>`;

    /* ── Landscape & visibility ── */
    html += `<div class="info-section">
        <h4>${t('landscapeTitle')}</h4>
        <div style="font-size:11px;line-height:1.6;color:#444;">`;
    for (const r of rows) {
        const apparentDeg = elevationDegrees(r.opt.tip_height, r.nearestDist);
        html += `<div class="effect-row">
            <span class="effect-label" style="color:${r.opt.color};font-weight:700">${r.key}</span>
            <span class="effect-value">${(r.nearestDist / 1000).toFixed(1)} km | ${r.opt.tip_height} m ${t('tipHeight').toLowerCase()} | ~${apparentDeg.toFixed(1)}° ${t('apparentHeight')}</span>
        </div>`;
    }
    html += `<div style="font-size:10px;color:#95a5a6;margin-top:3px;">${t('landscapeNote')}</div>
        </div>
    </div>`;

    /* ── Horizon silhouette ── */
    const horizonSVG = renderHorizonSVG(lat, lon);
    if (horizonSVG) {
        html += `<div class="info-section">
        <h4>${t('horizonTitle')}</h4>
        ${horizonSVG}
        <div style="font-size:10px;color:#95a5a6;margin-top:3px;">${t('horizonRefLabel')}<br>${t('horizonNote')}</div>
    </div>`;
    }

    /* ── Energy output ── */
    html += `<div class="info-section">
        <h4>${t('energyTitle')}</h4>
        <table class="noise-table">
            <thead><tr>
                <th>${t('thOption')}</th>
                <th>${t('thMWh')}</th>
                <th>${t('thHH')}</th>
                <th>${t('thCO2')}</th>
            </tr></thead>
            <tbody>`;
    for (const [key, opt] of Object.entries(TURBINE_OPTIONS)) {
        const { mwh, households, co2 } = calcEnergy(key);
        const active = activeOptions[key];
        const locale = LANG === 'nl' ? 'nl-NL' : 'en-GB';
        html += `<tr class="${active ? '' : 'inactive'}">
            <td><span style="color:${opt.color};font-weight:700">${key}</span></td>
            <td>${mwh.toLocaleString(locale)}</td>
            <td>~${households.toLocaleString(locale)}</td>
            <td>${co2.toLocaleString(locale)} t</td>
        </tr>`;
    }
    html += `</tbody></table>
        <div style="font-size:10px;color:#95a5a6;margin-top:5px;">${t('energyNote')}</div>
    </div>`;

    /* ── Disclaimer ── */
    html += `<div class="info-section" style="background:#fafafa;">
        <div style="font-size:10px;color:#95a5a6;line-height:1.5;">${t('disclaimer')}</div>
    </div>`;

    document.getElementById('info-body').innerHTML = html;
}

applyInitialUrlState();
