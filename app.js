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
        noiseNote:       'Norm: 45 dB (standaard) / 47 dB (grenswaarde) Lden.<br>ΔdB = toename boven A2-achtergrond door windturbines.<br>Wind-Lden is vereenvoudigd berekend (puntbronmodel zonder scherm/terreineffecten).',
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
        moonCompare:     'x volle maan',
        energyTitle:     '⚡ Energieopbrengst (per optie)',
        thMWh:           'MWh/jr',
        thHH:            'Huishoudens',
        thCO2:           'CO₂ vermeden',
        energyNote:      'Aanname: 2.200 vollasturen/jaar (typisch binnenland NL). Huishoudens op basis van 3.500 kWh/jr. CO₂ op basis van 0,4 kg/kWh.',
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
        noiseNote:       'Standard: 45 dB (normal) / 47 dB (limit) Lden.<br>ΔdB = increase above A2 background due to wind turbines.<br>Wind Lden is a simplified estimate (point-source model, no barriers or terrain effects).',
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
        moonCompare:     'x full moon',
        energyTitle:     '⚡ Energy output (per alternative)',
        thMWh:           'MWh/yr',
        thHH:            'Households',
        thCO2:           'CO₂ avoided',
        energyNote:      'Assumption: 2,200 full-load hours/year (typical Netherlands inland). Households based on 3,500 kWh/yr. CO₂ based on 0.4 kg/kWh.',
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
    }
};

/** Currently active language – 'nl' or 'en'. */
let LANG = 'nl';

/** Convenience accessor: returns the translated string for key `k`. */
function t(k) { return I18N[LANG][k]; }

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

    const activeLayerKeys = LAYER_KEYS.filter(key => document.getElementById(`toggle-${key}`).checked);
    if (activeLayerKeys.length === 2 && activeLayerKeys.includes('turbines') && activeLayerKeys.includes('noise')) {
        url.searchParams.delete('layers');
    }
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

   Key acoustic parameter:
     LwA – A-weighted sound power level [dB(A)]
           This is the total acoustic energy emitted by one turbine.
           Higher LwA → louder turbine.
   ═══════════════════════════════════════════════════════════════════════ */

const TURBINE_OPTIONS = {
    A: {
        nameNl: 'Optie A', nameEn: 'Option A',
        descNl: '7 kleine turbines (~2.5 MW)', descEn: '7 small turbines (~2.5 MW)',
        LwA: 105,           // A-weighted sound power level [dB(A)]
        capacity_mw: 2.5,   // Electrical capacity per turbine [MW]
        hub_height: 100,    // Hub height above ground [m]
        rotor_diam: 90,     // Rotor diameter [m]
        tip_height: 145,    // Maximum tip height = hub_height + rotor_diam/2 [m]
        color: '#e74c3c',
        turbines: [
            { id: 'A-1', lat: 52.113352, lon: 5.054729 },
            { id: 'A-2', lat: 52.118340, lon: 5.060361 },
            { id: 'A-3', lat: 52.115997, lon: 5.062644 },
            { id: 'A-4', lat: 52.113771, lon: 5.067392 },
            { id: 'A-5', lat: 52.111787, lon: 5.071481 },
            { id: 'A-6', lat: 52.110256, lon: 5.072524 },
            { id: 'A-7', lat: 52.102285, lon: 5.073085 }
        ]
    },
    B: {
        nameNl: 'Optie B', nameEn: 'Option B',
        descNl: '4 middelgrote turbines (~4.5 MW)', descEn: '4 medium turbines (~4.5 MW)',
        LwA: 107,
        capacity_mw: 4.5,
        hub_height: 120,
        rotor_diam: 130,
        tip_height: 185,
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
        descNl: '4 grote turbines (~6 MW)', descEn: '4 large turbines (~6 MW)',
        LwA: 109,
        capacity_mw: 6.0,
        hub_height: 140,
        rotor_diam: 162,
        tip_height: 221,
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
        descNl: '2 zeer grote turbines (~9 MW)', descEn: '2 very large turbines (~9 MW)',
        LwA: 111,
        capacity_mw: 9.0,
        hub_height: 160,
        rotor_diam: 200,
        tip_height: 260,
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

// Northern covered section (Leidsche Rijntunnel) is drawn on the map but excluded
// from the open-air line-source noise model.  The southern section was trimmed to
// the last open-air point; points beyond that represent an underground section and
// are not included in A2_PATH at all.
const A2_NOISE_PATH = A2_PATH.slice(7);
const A2_UNSHIELDED_REF_LDEN = 68;
const A2_QUIET_ASPHALT_REDUCTION_DB = 4;
// Sound-absorbing panel alongside the A2 in the Lage Weide corridor.
// A conservative flat insertion-loss estimate of 5 dB is applied to all
// receivers; the actual benefit depends on panel height and geometry.
const A2_BARRIER_REDUCTION_DB = 5;

const LAYER_KEYS = ['turbines', 'noise', 'safety', 'a2'];
const OPTION_KEYS = Object.keys(TURBINE_OPTIONS);
const URL_STATE = parseUrlState();
LANG = URL_STATE.lang;


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 3 – GEOMETRY HELPERS
   ═══════════════════════════════════════════════════════════════════════ */

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
    const R    = 6371000;
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const dphi = (lat2 - lat1) * Math.PI / 180;
    const dlam = (lon2 - lon1) * Math.PI / 180;
    const a    = Math.sin(dphi / 2) ** 2
               + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dlam / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function projectLatLon(lat, lon, latRef, lonRef) {
    const xScale = Math.cos(latRef * Math.PI / 180) * 6371000 * Math.PI / 180;
    const yScale = 6371000 * Math.PI / 180;
    return {
        x: (lon - lonRef) * xScale,
        y: (lat - latRef) * yScale,
        xScale,
        yScale
    };
}

function unprojectPoint(x, y, latRef, lonRef, xScale, yScale) {
    return {
        lat: latRef + y / yScale,
        lon: lonRef + x / xScale
    };
}

/**
 * Shortest distance from point P=(px,py) to segment A=(ax,ay)–B=(bx,by),
 * all in the same 2-D coordinate system (e.g. local metres).
 *
 * Uses clamped projection: t = clamp(AP·AB / |AB|², 0, 1).
 * The nearest point on AB is then A + t·AB.
 *
 * @returns {number} distance [same unit as input]
 */
function distToSegment(px, py, ax, ay, bx, by) {
    const dx    = bx - ax, dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.hypot(px - ax, py - ay); // degenerate segment
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function closestPointOnSegment(px, py, ax, ay, bx, by) {
    const dx = bx - ax;
    const dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) {
        return { x: ax, y: ay, dist: Math.hypot(px - ax, py - ay) };
    }
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
    const x = ax + t * dx;
    const y = ay + t * dy;
    return { x, y, dist: Math.hypot(px - x, py - y) };
}

/**
 * Shortest distance from a lat/lon point to a polyline (array of [lat, lon]).
 *
 * Projects all coordinates into a local flat (equirectangular) plane
 * centred on the first polyline vertex. This introduces <0.1 % error
 * for the distances involved here (~1–10 km).
 *
 * @param {number}   lat      – observer latitude [degrees]
 * @param {number}   lon      – observer longitude [degrees]
 * @param {number[][]} polyline – [[lat, lon], …]
 * @returns {number} distance [metres]
 */
function distToPolyline(lat, lon, polyline) {
    return nearestPointOnPolyline(lat, lon, polyline).dist;
}

function nearestPointOnPolyline(lat, lon, polyline) {
    const latRef = polyline[0][0], lonRef = polyline[0][1];
    const { x: px, y: py, xScale, yScale } = projectLatLon(lat, lon, latRef, lonRef);
    let bestPoint = null;
    for (let i = 0; i < polyline.length - 1; i++) {
        const { x: ax, y: ay } = projectLatLon(polyline[i][0], polyline[i][1], latRef, lonRef);
        const { x: bx, y: by } = projectLatLon(polyline[i + 1][0], polyline[i + 1][1], latRef, lonRef);
        const candidate = closestPointOnSegment(px, py, ax, ay, bx, by);
        if (!bestPoint || candidate.dist < bestPoint.dist) bestPoint = candidate;
    }
    const nearest = unprojectPoint(bestPoint.x, bestPoint.y, latRef, lonRef, xScale, yScale);
    return { ...nearest, dist: bestPoint.dist };
}

function apparentHeightDegrees(heightMetres, distanceMetres) {
    const d = Math.max(distanceMetres, 1);
    return 2 * Math.atan(heightMetres / (2 * d)) * 180 / Math.PI;
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
     • −8 dB = combined correction for:
         – directivity (omnidirectional source, Dω = 0 dB)
         – ground effect (flat terrain, typical +3 dB at receiver)
         – long-term average meteorological correction (−6 dB; Lden includes
           day/evening/night weighting and assumes wind speeds of 7–10 m/s)
       The −8 constant is the standard value used in Dutch practice for
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
    let sumPow = 0;
    for (const turbine of opt.turbines) {
        const d = haversine(lat, lon, turbine.lat, turbine.lon);
        sumPow += Math.pow(10, turbineNoise(opt.LwA, d) / 10);
    }
    return sumPow > 0 ? 10 * Math.log10(sumPow) : -Infinity;
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
        .filter(l => isFinite(l))
        .reduce((s, l) => s + Math.pow(10, l / 10), 0);
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
 * @returns {{ hours: number, turbine: string|null }}
 */
function calcShadowHours(lat, lon, optKey) {
    const opt = TURBINE_OPTIONS[optKey];
    const D   = opt.rotor_diam;
    let worstHours   = 0;
    let worstTurbine = null;
    for (const turbine of opt.turbines) {
        // Clamp distance to ≥ 20 m to avoid division-by-zero near the turbine base
        const d = Math.max(haversine(lat, lon, turbine.lat, turbine.lon), 20);
        const h = 400 * Math.pow(D / d, 2);
        if (h > worstHours) { worstHours = h; worstTurbine = turbine.id; }
    }
    return {
        hours:   Math.min(worstHours, 2000), // cap at 2,000 h/yr
        turbine: worstTurbine
    };
}


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 6 – ENERGY OUTPUT & CO₂
   ───────────────────────────────────────────────────────────────────────
   Annual energy output per alternative:

     E = N × P × FLH   [MWh/year]

   where:
     N   = number of turbines in the alternative
     P   = rated capacity per turbine [MW]
     FLH = full-load hours per year [h]
         = 2,200 h/yr (typical for inland Netherlands;
           offshore sites achieve 3,500–4,000 h/yr)

   Households powered:
     HH = E × 1,000 / 3,500
     (Dutch average household electricity use ≈ 3,500 kWh/yr, CBS 2023)

   CO₂ avoided:
     CO₂ = E × 0.4   [tonnes CO₂/yr]
     (Dutch grid emission factor ≈ 0.4 kg CO₂/kWh, SEAI/IEA 2023)
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * Annual energy production and derived benefits for one alternative.
 *
 * @param {string} optKey – alternative key ('A'|'B'|'C'|'D')
 * @returns {{ mwh: number, households: number, co2: number }}
 */
function calcEnergy(optKey) {
    const opt = TURBINE_OPTIONS[optKey];
    const FLH = 2200; // full-load hours per year [h/yr]
    const mwh = opt.turbines.length * opt.capacity_mw * FLH;
    const households = Math.round(mwh * 1000 / 3500);  // 3,500 kWh/yr per household
    const co2 = Math.round(mwh * 0.4);                 // 0.4 kg CO₂/kWh → tonnes
    return { mwh: Math.round(mwh), households, co2 };
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
 * @returns {{ cls: string, label: string, desc: string }}
 */
function noiseClass(lden) {
    if (lden < 35) return { cls: 'badge-green',  label: '< 35 dB', desc: t('veryLow') };
    if (lden < 40) return { cls: 'badge-green',  label: '< 40 dB', desc: t('low') };
    if (lden < 45) return { cls: 'badge-yellow', label: '40–45 dB', desc: t('moderate') };
    if (lden < 47) return { cls: 'badge-orange', label: '45–47 dB', desc: t('limit') };
    return             { cls: 'badge-red',    label: '> 47 dB', desc: t('exceeded') };
}

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

// Map layer-group references
const turbineGroup = L.layerGroup().addTo(map);
const noiseGroup   = L.layerGroup().addTo(map);
const safetyGroup  = L.layerGroup();            // off by default
const a2Group      = L.layerGroup();            // off by default
const selectionGroup = L.layerGroup().addTo(map);
let clickMarker = null;
let lastClickedLatLon = null;

function syncLayerVisibility() {
    document.getElementById('toggle-turbines').checked ? turbineGroup.addTo(map) : map.removeLayer(turbineGroup);
    document.getElementById('toggle-noise').checked ? noiseGroup.addTo(map) : map.removeLayer(noiseGroup);
    document.getElementById('toggle-safety').checked ? safetyGroup.addTo(map) : map.removeLayer(safetyGroup);
    document.getElementById('toggle-a2').checked ? a2Group.addTo(map) : map.removeLayer(a2Group);
}

function applyInitialUrlState() {
    if (URL_STATE.layers !== null) {
        for (const key of LAYER_KEYS) {
            document.getElementById(`toggle-${key}`).checked = URL_STATE.layers.includes(key);
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
    LANG = 'nl';

    for (const key of OPTION_KEYS) activeOptions[key] = true;

    document.getElementById('toggle-turbines').checked = true;
    document.getElementById('toggle-noise').checked = true;
    document.getElementById('toggle-safety').checked = false;
    document.getElementById('toggle-a2').checked = false;

    if (clickMarker) {
        map.removeLayer(clickMarker);
        clickMarker = null;
    }

    lastClickedLatLon = null;
    selectionGroup.clearLayers();
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
        const name = LANG === 'nl' ? opt.nameNl : opt.nameEn;
        const desc = LANG === 'nl' ? opt.descNl : opt.descEn;
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
        const name = LANG === 'nl' ? opt.nameNl : opt.nameEn;
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

        let nearestTurbine = null;
        let nearestDist = Infinity;
        for (const turbine of opt.turbines) {
            const dist = haversine(lastClickedLatLon.lat, lastClickedLatLon.lon, turbine.lat, turbine.lon);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearestTurbine = turbine;
            }
        }

        if (!nearestTurbine) continue;

        const name = LANG === 'nl' ? opt.nameNl : opt.nameEn;
        L.polyline([selected, [nearestTurbine.lat, nearestTurbine.lon]], {
            color: opt.color,
            weight: 2.5,
            opacity: 0.85,
            dashArray: '6 6'
        }).addTo(selectionGroup)
          .bindTooltip(`${name}: ${Math.round(nearestDist)} m`, { sticky: true });
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

function redrawAll() {
    drawTurbines();
    drawNoiseContours();
    drawSafetyZones();
    drawA2(); // re-draw to pick up translated tooltip
    drawSelectionLines();
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

    document.getElementById('norm-1').textContent = t('norm1');
    document.getElementById('norm-2').textContent = t('norm2');
    document.getElementById('norm-3').textContent = t('norm3');
    document.getElementById('norm-4').textContent = t('norm4');
    document.getElementById('norm-note').textContent = t('normNote');
    document.getElementById('source-note').textContent = t('sourceNote');
    document.getElementById('btn-my-location').innerHTML =
        `<span class="loc-icon">📍</span> ${t('myLocation')}`;
    document.getElementById('legend-title').textContent = t('legendTitle');

    // Rebuild dynamic alternative buttons
    const container = document.getElementById('option-btns');
    container.innerHTML = '';
    const legendEl = document.getElementById('legend-opts');
    legendEl.innerHTML = '';

    for (const [key, opt] of Object.entries(TURBINE_OPTIONS)) {
        const name = LANG === 'nl' ? opt.nameNl : opt.nameEn;
        const desc = LANG === 'nl' ? opt.descNl : opt.descEn;

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

        // Bottom legend entry
        const le = document.createElement('div');
        le.className = 'legend-row';
        le.innerHTML = `<div class="legend-swatch" style="background:${opt.color}"></div>${name}: ${desc}`;
        legendEl.appendChild(le);
    }
}
buildControls();
document.getElementById('btn-reset').addEventListener('click', resetAppState);


/* ── Layer checkbox listeners ── */
document.getElementById('toggle-turbines').addEventListener('change', e => {
    syncLayerVisibility();
    refreshCurrentReport();
    updateUrlState();
});
document.getElementById('toggle-noise').addEventListener('change', e => {
    syncLayerVisibility();
    refreshCurrentReport();
    updateUrlState();
});
document.getElementById('toggle-safety').addEventListener('change', e => {
    syncLayerVisibility();
    refreshCurrentReport();
    updateUrlState();
});
document.getElementById('toggle-a2').addEventListener('change', e => {
    syncLayerVisibility();
    refreshCurrentReport();
    updateUrlState();
});


/* ═══════════════════════════════════════════════════════════════════════
   SECTION 10 – LANGUAGE TOGGLE
   ═══════════════════════════════════════════════════════════════════════ */

document.getElementById('btn-nl').addEventListener('click', () => setLang('nl'));
document.getElementById('btn-en').addEventListener('click', () => setLang('en'));

function setLang(lang) {
    LANG = lang;
    document.getElementById('btn-nl').classList.toggle('active', lang === 'nl');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
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

    const noiseRows  = [];
    const shadowRows = [];
    const safetyRows = [];

    for (const [key, opt] of Object.entries(TURBINE_OPTIONS)) {
        if (!activeOptions[key]) continue;
        const name = LANG === 'nl' ? opt.nameNl : opt.nameEn;

        // Noise
        const windNoise = calcOptionNoise(lat, lon, key);
        const combined  = sumLden(a2Noise, windNoise);
        const added     = dBAdded(a2Noise, combined);
        const nc        = noiseClass(windNoise);
        noiseRows.push({ key, opt, name, windNoise, combined, added, nc });

        // Shadow
        const sh = calcShadowHours(lat, lon, key);
        shadowRows.push({ key, opt, name, ...sh });

        // Safety (closest turbine distance)
        let minDist = Infinity;
        for (const turbine of opt.turbines) {
            minDist = Math.min(minDist, haversine(lat, lon, turbine.lat, turbine.lon));
        }
        safetyRows.push({ key, opt, name, minDist: Math.round(minDist) });
    }

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
    if (noiseRows.length > 0) {
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
        for (const r of noiseRows) {
            const noiseColor = r.windNoise > 47 ? '#e74c3c'
                             : r.windNoise > 45 ? '#e67e22'
                             : r.windNoise > 40 ? '#e67e22'
                             : '#27ae60';
            const deltaColor = r.added > 3 ? '#e74c3c'
                             : r.added > 1 ? '#e67e22'
                             : '#27ae60';
            html += `<tr>
                <td><span style="color:${r.opt.color};font-weight:700">${r.key}</span></td>
                <td style="font-weight:700;color:${noiseColor}">${r.windNoise.toFixed(1)}</td>
                <td>${a2Noise.toFixed(1)}</td>
                <td>${r.combined.toFixed(1)}</td>
                <td style="color:${deltaColor}">+${r.added.toFixed(1)}</td>
                <td><span class="badge ${r.nc.cls}">${r.nc.desc}</span></td>
            </tr>`;
        }
        html += `</tbody></table>
            <div style="font-size:10px;color:#95a5a6;margin-top:5px;">${t('noiseNote')}</div>
        </div>`;
    } else {
        html += `<div class="info-section"><div style="font-size:12px;color:#7f8c8d;">${t('noSelect')}</div></div>`;
    }

    /* ── Shadow flicker ── */
    if (shadowRows.length > 0) {
        html += `<div class="info-section"><h4>${t('shadowTitle')}</h4>`;
        for (const r of shadowRows) {
            const sc      = shadowClass(r.hours);
            const barW    = Math.min(100, (r.hours / 16) * 100);
            const barColor = r.hours < 6 ? '#27ae60' : r.hours < 16 ? '#e67e22' : '#e74c3c';
            const hLabel   = r.hours > 1 ? r.hours.toFixed(1) : '<1';
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
    if (safetyRows.length > 0) {
        html += `<div class="info-section"><h4>${t('safetyTitle')}</h4>`;
        for (const r of safetyRows) {
            const sc = safetyClass(r.minDist, r.opt.tip_height);
            html += `<div class="effect-row">
                <span class="effect-label" style="color:${r.opt.color};font-weight:700">${r.key}</span>
                <span>${r.minDist} m ${t('safetyFrom')}</span>
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
    for (const [key, opt] of Object.entries(TURBINE_OPTIONS)) {
        if (!activeOptions[key]) continue;
        const nearestDist = Math.min(...opt.turbines.map(turbine => haversine(lat, lon, turbine.lat, turbine.lon)));
        const apparentDeg = apparentHeightDegrees(opt.tip_height, nearestDist);
        const moonMultiple = apparentDeg / 0.5;
        html += `<div class="effect-row">
            <span class="effect-label" style="color:${opt.color};font-weight:700">${key}</span>
            <span class="effect-value">${Math.round(nearestDist / 100) / 10} km | ${opt.tip_height} m ${t('tipHeight').toLowerCase()} | ~${apparentDeg.toFixed(1)}° ${t('apparentHeight')} (${moonMultiple.toFixed(1)} ${t('moonCompare')})</span>
        </div>`;
    }
    html += `<div style="font-size:10px;color:#95a5a6;margin-top:3px;">${t('landscapeNote')}</div>
        </div>
    </div>`;

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
