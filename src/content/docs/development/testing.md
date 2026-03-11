---
title: Testing NovyWave
description: Combine automated checks with manual waveform workflows
---

NovyWave uses a mix of Rust tests, build verification, and manual UI testing.

## Automated Checks

Run workspace tests with:

```bash
cargo test --workspace
```

## Development Smoke Tests

For day-to-day work, the minimum useful checks are:

```bash
makers start
makers tauri
```

Use browser mode to verify quick frontend changes and Tauri mode for desktop-specific behavior.

## Manual Testing Areas

When verifying a change, check at least the domains it touches:

- file loading and format support
- navigation and cursor movement
- selected-variable formatting
- configuration persistence
- desktop-specific startup or updater behavior

## Test Inputs

Use real waveform data from:

- `test_files/`
- `examples/`

Those give you stable traces for regression checks and tutorial validation.

## Desktop Test Bridge

The source repository also exposes a local desktop test bridge for deeper validation of the running Tauri app. Use it when you need to inspect state without relying only on visual checks.
