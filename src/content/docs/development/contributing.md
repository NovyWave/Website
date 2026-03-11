---
title: Contributing
description: Prepare a clean local workflow before submitting NovyWave changes
---

Contributions are welcome. A good NovyWave contribution includes tested code, focused scope, and updated documentation when behavior changes.

## Local Setup

1. Clone `https://github.com/NovyWave/NovyWave.git`.
2. Run `makers install`.
3. Start either `makers start` or `makers tauri`.

## Before Opening a PR

- run relevant tests
- verify the affected workflows manually
- keep the change focused on one problem area
- update docs if user-facing or contributor-facing behavior changed

## Useful Commands

```bash
makers start
makers tauri
makers build
makers tauri-build
cargo test --workspace
```

## Change Quality

Aim for:

- explicit error handling,
- coherent architecture changes,
- small, reviewable commits,
- screenshots or reproduction notes for UI changes when helpful.
