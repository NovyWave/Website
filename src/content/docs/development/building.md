---
title: Building from Source
description: Set up a local NovyWave development environment
---

NovyWave has a browser-oriented development mode and a desktop Tauri mode. Both rely on the same Rust-based frontend.

## Prerequisites

- Rust stable
- `cargo-make`
- the `wasm32-unknown-unknown` Rust target

Install the common prerequisites with:

```bash
rustup target add wasm32-unknown-unknown
cargo install cargo-make
```

## Clone the Source Repository

```bash
git clone https://github.com/NovyWave/NovyWave.git
cd NovyWave
```

## Install Project Dependencies

```bash
makers install
```

## Browser Development Mode

```bash
makers start
```

This starts the MoonZoon development server and serves the app locally.

## Desktop Development Mode

```bash
makers tauri
```

This launches the desktop shell around the same frontend.

## Production Builds

```bash
makers build
makers tauri-build
```

Use the first command for the web build and the second for packaged desktop artifacts.

## Important Note

Prefer `makers` tasks over direct `cargo build` or `cargo check` when following NovyWave's documented workflows, because the project wires browser, Tauri, and WASM steps together through those tasks.
