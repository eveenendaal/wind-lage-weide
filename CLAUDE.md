# Claude Instructions for `wind-lage-weide`

## Build, test, and lint

This repository is a **plain static site**. There is currently:

- **No package manager config** (`package.json` is absent)
- **No automated test suite**
- **No linter configuration**
- **No build step**

Useful local preview command:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/index.html`.

Deployment is handled by **GitHub Pages** via `.github/workflows/deploy.yml`, which uploads the repository root as the Pages artifact on pushes to `master`.

## High-level architecture

- `index.html` is a minimal shell: it defines the map container, left control panel, right report panel, and loads Leaflet plus `app.js`.
- `style.css` owns all layout and responsive behavior. The mobile experience is not a separate implementation; it is driven entirely by media queries in the same stylesheet.
- `app.js` is the application core and is intentionally organized into numbered sections:
  - i18n string tables
  - turbine and A2 geometry data
  - geometry helpers
  - calculation helpers for noise, shadow flicker, safety, and energy
  - Leaflet map/layer setup
  - control-panel rebuilding and event wiring
  - selected-point handling
  - info-panel rendering

The app is stateful but client-only. The key runtime state is shared across the map and report:

- `LANG` controls all UI text through the `I18N` tables and `t()`
- `activeOptions` controls which turbine alternatives are active
- layer checkbox state controls which Leaflet layer groups are visible
- `lastClickedLatLon` is the current selected point used by:
  - the blue marker
  - connector lines
  - the right-hand report
  - URL persistence

The URL is part of the app state. `parseUrlState()`, `updateUrlState()`, `applyInitialUrlState()`, and `resetAppState()` keep language, filters, layers, and selected point shareable and refresh-safe.

There are two A2 geometries with different purposes:

- `A2_PATH`: full displayed motorway path used for the visible overlay and nearest-point connector
- `A2_NOISE_PATH`: the open-air subset used for the motorway noise model, excluding the covered Leidsche Rijntunnel section

## Key conventions

- **Keep all user-facing text in `I18N`**. Do not hardcode UI labels, notes, or button text directly in rendering logic.
- **Rebuild controls through `buildControls()`**. The alternative buttons are dynamic and are regenerated from state; update that function instead of editing the DOM ad hoc.
- **Refresh the report through shared state**, not by duplicating calculations in event handlers. Use `refreshCurrentReport()` when toggles or language changes should update the selected-point report.
- **Preserve the URL-state model** when adding filters or new persistent UI controls. New persistent state should be parsed on load, applied in `applyInitialUrlState()`, and written back in `updateUrlState()`.
- **Treat `A2_PATH` and `A2_NOISE_PATH` differently**. Map display changes and sound-model changes are not always the same edit.
- **Follow the existing "single-file app with sectioned JS" style**. `app.js` is intentionally monolithic but heavily structured; extend the relevant section instead of creating scattered helpers without context.
- **Keep mobile behavior in `style.css` media queries**. Do not create separate mobile markup unless the existing responsive approach truly cannot support the change.
- **Use the source documents in `documents/` as the factual basis** for turbine locations and planning context when adjusting domain content.
