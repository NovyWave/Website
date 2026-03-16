---
title: Changelog
description: All notable changes to NovyWave
---

All notable changes to NovyWave are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.2.0] - 2026-03-16

### Added
- Chrome Desktop Launcher (`novywave-chrome`) — a lightweight alternative that uses Chrome or Chromium in `--app` mode, available for Linux, macOS, and Windows
- Built-in WebAssembly plugin system with three bundled plugins: `hello_world`, `reload_watcher` (live-reload on file changes), and `files_discovery` (auto-discover waveform files via glob patterns)
- Analog signal rendering — real-valued signals display as continuous waveform traces with auto-scaling limits
- Per-signal row height resizing via draggable dividers between signal rows
- Signal grouping — organize selected signals into named, collapsible groups
- Named timeline markers — add labeled bookmarks at specific time positions, persisted across sessions
- Workspace picker — choose and switch between workspace directories with history
- Platform-aware file picker roots — smart starting directories based on the operating system
- Waveform value tooltip — hover over the timeline to see signal values
- Cross-platform release CI/CD pipeline via GitHub Actions
- Auto-update system with binary signing

### Changed
- WebKitGTK hardware acceleration enabled by default on Linux (Tauri desktop)
- Configuration file format expanded with new sections for markers, plugins, workspace history, and analog limits
- Timeline units changed from nanoseconds to picoseconds for higher precision
- Dynamic embedded backend ports in Tauri packaging
- Updater gated by installer channel

### Fixed
- Firefox divider dragging
- Zoom-out signal refresh and marker centering
- Timeline value correctness during resize
- Analog value display and tooltip formatting
- Canvas rebinding during window resize
- Scrollbar style compatibility with Linux WebView
- Workspace loading race condition
- MultiSelect behavior in Load Files dialog
- Infinite EventSource recursion

## [0.1.0] - 2025-01-15

### Added

#### Core Features
- VCD and FST waveform file support
- Hierarchical scope browsing
- Signal selection and visualization
- Timeline navigation with zoom and pan
- Keyboard-driven workflow (WASDQE + shortcuts)
- Timeline cursor with value inspection
- Signal value formatting (Hex, Binary, Decimal, etc.)

#### User Interface
- Three-panel layout (Files & Scopes, Variables, Selected Variables)
- Dark and light themes
- Right and Bottom dock modes
- Panel resizing with drag handles
- Persistent configuration

#### Platform Support
- Browser deployment (WebAssembly)
- Desktop application (Tauri)
- Linux, macOS, and Windows support

#### Navigation
- Smooth zoom centered on zoom point
- Panning with keyboard controls
- Cursor movement with transition jumping
- Full reset capability

### Technical Details
- Built with Rust and WebAssembly
- MoonZoon framework for web UI
- Tauri v2 for desktop wrapper
- Actor+Relay state management
- Fast2D canvas rendering
- Wellen library for waveform parsing

[0.2.0]: https://github.com/NovyWave/NovyWave/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/NovyWave/NovyWave/releases/tag/v0.1.0
