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
  components/studio/   # Figma-aligned Studio chrome
  components/ErrorCard.tsx
  data/roxyErrors.ts   # Sample validation issues
  lib/humanize.ts      # Technical → human translations
  hooks/useValidationRun.ts
```

## Next phases

| Phase | Focus |
|-------|--------|
| 2 | Error prioritization, filters, blocking vs warning |
| 3 | In-panel “what’s next” + test in Play Mode |
| 4 | Figma component parity + eng handoff spec |
