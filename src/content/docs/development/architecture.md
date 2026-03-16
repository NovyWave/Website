---
title: Architecture Overview
description: Understand how NovyWave is split across frontend, backend, and desktop layers
---

Every line of NovyWave's application logic is written in Rust — compiled to WebAssembly for the browser and native code for the desktop. This means the same codebase powers both environments with identical behavior.

![NovyWave architecture diagram showing frontend, backend, plugins, and desktop wrappers](/assets/diagrams/architecture-overview.svg)

## Major Components

| Component | Purpose |
| --- | --- |
| `frontend/` | Rust and WASM UI, waveform rendering, interaction logic |
| `backend/` | MoonZoon backend used for browser mode |
| `shared/` | shared data types and protocol definitions |
| `src-tauri/` | desktop wrapper and packaging |
| `novyui/` | reusable UI building blocks |
| `src-chrome/` | Chrome Desktop Launcher — opens the UI in Chrome/Chromium `--app` mode |
| `plugins/` | Built-in WebAssembly plugins (`hello_world`, `reload_watcher`, `files_discovery`) |
| `novywave-mcp/` | Model Context Protocol integration |

## Runtime Modes

![Three runtime modes: Browser, Tauri Desktop, and Chrome Desktop](/assets/diagrams/runtime-modes.svg)

### Browser Mode

The WASM frontend talks to the Moon backend for file access and waveform operations.

### Desktop Mode

The same frontend runs inside Tauri, where desktop commands handle local file operations and packaging concerns.

### Chrome Desktop Mode

The Chrome Desktop Launcher (`novywave-chrome`) starts the same MoonZoon backend and opens Chrome, Chromium, or Microsoft Edge in `--app` mode. This provides an alternative rendering path without WebKitGTK on Linux.

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

## Plugin Architecture

NovyWave supports WebAssembly plugins through a WIT (WebAssembly Interface Type) component model. Three plugin worlds are available:

- **basic** — logging only, with init and shutdown lifecycle hooks
- **watcher** — file monitoring with change notifications
- **files-discovery** — directory watching with glob pattern matching

Plugins communicate with the host through defined capabilities: logging, file queries, watcher registration, and waveform reload triggers.
