# CLAUDE.md

## Version Control

Use `jj` for mutations in this repository.

- Prefer `jj status`, `jj diff`, `jj log`, `jj commit`, `jj describe`, `jj new`, and `jj git push`.
- Avoid using raw `git` commands for commits, rebases, or pushes.
- Read-only inspection with `git status` is acceptable if needed, but `jj` is the source-of-truth workflow.

## Project Overview

NovyWave documentation site built with Astro and Starlight.

- Live URL: `https://novywave.pages.dev`
- Parent project: `https://github.com/NovyWave/NovyWave`
- This repository is the documentation authoring source

## Documentation Ownership

- Author docs in this repository only.
- Treat `~/repos/NovyWave` as reference material, not as a place to edit docs for this site.
- Use `~/repos/NovyWave` to verify features, commands, release artifacts, examples, and API details.
- Do not document planned features from `~/repos/NovyWave/docs/plans/` unless they are already implemented and testable.

## Commands

```bash
npm run dev       # Start local dev server on localhost:4321
npm run check     # Run Astro/Starlight checks
npm run build     # Build production site into dist/
npm run validate  # Run check + build
npm run preview   # Preview the built site
```

## Project Structure

```text
src/
  assets/                    # Site images
  content/
    docs/
      index.mdx              # Landing page
      getting-started/       # Installation + quick start
      user-guide/            # Workflow, navigation, configuration, troubleshooting
      tutorials/             # HDL and usage tutorials
      development/           # Contributor-facing docs
      api/                   # Data model and protocol reference
  styles/
    custom.css               # Site-specific styling
docs/
  documentation-audit-matrix.md
  documentation-verification.md
public/
  favicon.png
astro.config.mjs             # Site config and sidebar
README.md                    # Maintainer workflow
```

## Content Conventions

- Use `.mdx` when a page needs Starlight components.
- Use `.md` for plain Markdown pages.
- Keep internal links absolute, for example `/getting-started/installation/`.
- Update the manual sidebar in `astro.config.mjs` when adding, removing, or reorganizing pages.
- Keep public docs in `src/content/docs/` and internal process docs in `docs/`.

## Verification Expectations

- Run `npm run validate` before finalizing documentation changes.
- Update `docs/documentation-audit-matrix.md` when routes or verification scope change.
- Follow `docs/documentation-verification.md` for automated and manual checks.
- Platform-specific install pages should be checked against actual release artifacts from the NovyWave repo.

## Source Material

When validating content, use these sources in `~/repos/NovyWave`:

- `README.md`
- `docs/src/`
- `examples/`
- `test_files/`
- `.github/workflows/release.yml`
- `Makefile.toml`
- `src-tauri/tauri.conf.json`

## Starlight Components

```mdx
import { Card, CardGrid, LinkCard, Aside } from '@astrojs/starlight/components';

<Aside type="tip">Helpful note</Aside>

<CardGrid>
  <LinkCard title="Guide" href="/getting-started/quick-start/" />
</CardGrid>
```
