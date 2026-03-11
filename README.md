# NovyWave Website

This repository contains the NovyWave documentation website built with Astro and Starlight.

## Documentation Ownership

All authored documentation lives in this repository.

- Treat `~/repos/NovyWave` as source material only.
- Do not edit `~/repos/NovyWave` while updating docs here.
- Use `~/repos/NovyWave` to verify behavior, commands, release assets, examples, and API details.
- Ignore legacy website content in `~/repos/NovyWave` unless it helps identify missing topics.

## Content Sources

When updating docs, verify claims against these sources in `~/repos/NovyWave`:

- `README.md` for product positioning and supported features
- `docs/src/` for user, development, and API reference material
- `examples/` and `test_files/` for reproducible tutorials
- `.github/workflows/release.yml` for published installer artifacts
- `Makefile.toml` for supported local development commands
- `src-tauri/tauri.conf.json` for desktop packaging and updater behavior

Do not document planned features from `docs/plans/` unless they are already implemented and testable.

## Website Structure

Public docs are authored under `src/content/docs/`:

- `getting-started/` for installation and first-run flows
- `user-guide/` for interface, navigation, configuration, and troubleshooting
- `tutorials/` for step-by-step HDL and workflow guides
- `development/` for contributor-facing build and architecture docs
- `api/` for shared types and message flow references

Internal maintenance docs live under `docs/`:

- `docs/documentation-audit-matrix.md`
- `docs/documentation-verification.md`

## Commands

Run all commands from the repo root:

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local docs site |
| `npm run check` | Run Astro/Starlight validation |
| `npm run build` | Build the production site |
| `npm run validate` | Run validation and a full production build |
| `npm run preview` | Preview the built site |

## Documentation Workflow

1. Gather facts from `~/repos/NovyWave`.
2. Update the relevant pages in `src/content/docs/`.
3. Update the audit matrix if pages, sources, or verification status changed.
4. Follow `docs/documentation-verification.md` for automated and manual checks.
5. Run `npm run validate` before finalizing changes.

## Testing Expectations

- Every route must build cleanly.
- Procedural pages must be executable from the published instructions.
- Platform-specific install pages must be checked against the actual release outputs.
- Tutorials should use real files and commands from `~/repos/NovyWave/examples` whenever possible.
