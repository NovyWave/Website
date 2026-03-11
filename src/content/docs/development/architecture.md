---
title: Architecture Overview
description: Understand how NovyWave is split across frontend, backend, and desktop layers
---

NovyWave is a Rust-first application that targets both browser and desktop environments.

## Major Components

| Component | Purpose |
| --- | --- |
| `frontend/` | Rust and WASM UI, waveform rendering, interaction logic |
| `backend/` | MoonZoon backend used for browser mode |
| `shared/` | shared data types and protocol definitions |
| `src-tauri/` | desktop wrapper and packaging |
| `novyui/` | reusable UI building blocks |

## Runtime Modes

### Browser Mode

The WASM frontend talks to the Moon backend for file access and waveform operations.

### Desktop Mode

The same frontend runs inside Tauri, where desktop commands handle local file operations and packaging concerns.

## Key Domains

Three domains show up repeatedly in the codebase and documentation:

- **Tracked files** for loaded waveform inputs and parsing state
- **Selected variables** for signal selection and display format
- **Waveform timeline** for zoom, pan, cursor, and rendering state

## Rendering Pipeline

At a high level:

1. parse waveform data,
2. request only the relevant signal range,
3. process visible transitions,
4. render the visible region into the timeline canvas.

The project is designed to keep navigation responsive even when waveforms are large.
