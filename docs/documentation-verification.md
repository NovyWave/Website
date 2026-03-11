# Documentation Verification

This repository validates documentation in two layers: automated site checks and manual workflow checks.

## Automated Checks

Run these on every docs update:

```bash
npm install
npm run check
npm run build
```

Use `npm run validate` as the standard pre-merge command.

Automated checks are expected to catch:

- invalid Starlight routes or sidebar entries
- broken internal links
- missing referenced assets
- markdown/frontmatter issues that fail Astro parsing

## Manual Verification Principles

- Follow the published website instructions exactly.
- Do not rely on repo familiarity while verifying.
- Record platform, NovyWave version or commit, date, and pass/fail result.
- If a platform or architecture is not available, mark the page as source-reviewed rather than verified.

## Platform Matrix

### Linux

Primary deep-validation platform.

Run:

- install flow from the Linux page using at least one actual packaged build path
- quick start
- loading files and multi-file workflows
- keyboard navigation and cursor behavior
- configuration persistence and reset
- tutorials that depend on GHDL, Icarus Verilog, SpinalHDL, Amaranth, and Spade when tools are available

### macOS

Smoke-test the macOS install page and first-run flow.

Run:

- DMG installation
- Gatekeeper workaround path if needed
- launch and open a waveform
- basic navigation and persistence
- file association guidance spot check

Apple Silicon is the primary target. Intel-specific instructions remain source-reviewed unless an Intel Mac is available.

### Windows

Smoke-test the Windows install page and first-run flow.

Run:

- NSIS installer, or MSI if that is the published artifact being documented
- SmartScreen flow
- launch and open a waveform
- basic navigation and persistence
- PATH, file association, and WebView2 guidance spot check

## Procedural Page Checklist

For every executable page:

1. Start from the page itself, not from memory.
2. Execute each command and UI step in order.
3. Confirm the expected result shown on the page.
4. Note any missing prerequisite, stale screenshot, or ambiguous wording.
5. Update the page before marking it verified.

## Reference Page Checklist

For pages that are mostly descriptive:

1. Verify each factual claim against `~/repos/NovyWave`.
2. Spot-check at least one live example when the claim is UI-visible.
3. Remove any claim that depends on planned or unverified behavior.

## Acceptance Criteria

Documentation changes are ready when:

- `npm run validate` passes
- every new route is present in the audit matrix
- every procedural page has an assigned verification method
- platform-specific installation pages have been checked against actual release artifacts
- no unresolved contradiction remains between this site and the verified NovyWave source material
