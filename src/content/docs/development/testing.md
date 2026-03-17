---
title: Testing NovyWave
description: Automated checks, E2E tests, and manual verification workflows
---

NovyWave uses Rust unit tests, Playwright E2E tests, app verification tooling, and manual UI testing.

## Rust Tests

Run workspace tests with:

```bash
cargo test --workspace
```

## Development Smoke Tests

For day-to-day work, launch both modes and verify your change visually:

```bash
makers start   # Browser mode on localhost:8082
makers tauri    # Desktop mode
```

## Playwright E2E Tests

End-to-end browser tests live in `examples/e2e-tests/`. They test file loading, signal selection, keyboard navigation, theme toggling, and canvas rendering.

```bash
cd examples/e2e-tests
npm install
npm run install-browsers   # First time only
npm test                   # Headless
npm run test:headed        # Show browser window
```

Requires the dev server running (`makers start`).

## App Verification

The `novywave-mcp` tool can verify that a workspace restores correctly — loaded files, selected variables, and no stuck loading states:

```bash
makers start              # Start dev server + WS server
makers verify-app         # Run verification against tests/workspace_restore
```

This connects to the WebSocket server on port 9225 and checks workspace state programmatically.

## Updater Verification

Test the auto-update system end-to-end with a mock update server:

```bash
makers verify-updater
```

This starts a local mock server, builds the Tauri app in test mode, and verifies the update flow.

## Manual Testing Areas

When verifying a change, check at least the domains it touches:

- file loading and format support (VCD, FST, GHW)
- navigation, cursor movement, and markers
- signal values, analog rendering, and row resizing
- signal groups and workspace picker
- plugin behavior (reload_watcher, files_discovery)
- configuration persistence across restart
- desktop-specific startup or updater behavior

## Test Inputs

Use waveform files from `test_files/` and `examples/` for stable, reproducible traces.
