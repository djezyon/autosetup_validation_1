# autosetup_validation_1

Phase 1 interactive prototype for **Avatar Auto-Setup validation UX**, aligned with:

- **Figma:** [Auto-Setup Improvement](https://www.figma.com/design/JQt5FIH5RzdM48ZlJZz0Cf/Auto-Setup-Improvement?node-id=40000063-56345) (node `40000063:56345`)
- **Repo:** [djezyon/autosetup_validation_1](https://github.com/djezyon/autosetup_validation_1)

## Phase 1 deliverables

- Studio shell layout (500px Setup · flexible Viewport · 330px Panels)
- Avatar Setup panel with Body / Head navigation and preview tray
- Explorer tree (`Stargirl_V2` hierarchy from Figma)
- **Validation Errors** bar with alert styling and `N found` badge (matches Figma)
- Expandable human-readable error list (what / why / how to fix)
- Re-run validation with diff feedback (demo)
- Copy-all in plain language
- Sample Roxy/R15 issues with translation layer

## Run locally

```bash
npm install
npm run dev
```

## Push to GitHub

```bash
git init
git remote add origin https://github.com/djezyon/autosetup_validation_1.git
git add .
git commit -m "Phase 1: Studio shell and human-readable validation panel"
git push -u origin main
```

## Project structure

```
src/
  components/studio/          # Figma-aligned Studio chrome
  components/validation/      # Body Errors modal + size comparison
  components/ErrorCard.tsx
  data/roxyErrors.ts          # Phase 1 Roxy sample issues
  data/validation.mock.json   # Phase 2 body errors + hotspots
  hooks/useValidationRun.ts
  hooks/useValidationFlow.ts
```

## Phase 2 — Body Errors modal flow

Three modal states (same dialog), driven by `useValidationFlow` and Figma nodes:

| State | Figma node | Trigger |
|-------|------------|---------|
| Errors + suggestions | `40000072:2798` | Open modal from validation warning card |
| Accept one | `40000072:3228` | Tap a hotspot on Suggested Fix (e.g. **1 Head**) |
| Accept all | `40000072:4090` | **Accept All Fixes** (returns to main-setup) |

**Navigation**

- **main-setup → modal:** tap the red validation warning card in the right panel
- **modal → accept-one:** tap an individual fix hotspot on the Suggested Fix preview
- **modal → main (applied):** **Accept All Fixes**
- **modal → main (no apply):** **Edit Manually**, close (×), or backdrop
- Returning to main-setup preserves explorer selection, setup tabs, and properties target via `StudioSnapshot`

**Data:** `src/data/validation.mock.json` (4 accordion errors; only **Size: Too big** has full comparison UI). Preview placeholders: `public/assets/validation/`.

```bash
npm run dev
```

## Next phases

| Phase | Focus |
|-------|--------|
| 3 | In-panel “what’s next” + test in Play Mode |
| 4 | Figma component parity + eng handoff spec |
