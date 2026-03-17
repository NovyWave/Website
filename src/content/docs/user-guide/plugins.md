---
title: Plugins
description: Extend NovyWave with built-in WebAssembly plugins for live-reload and file discovery
---

## What Are Plugins

NovyWave supports WebAssembly plugins that extend its functionality. Plugins run in a sandboxed environment and communicate with NovyWave through a defined interface, so they cannot interfere with the host application or access resources outside their sandbox.

## Built-In Plugins

### hello_world

A minimal example plugin that logs "Hello World!" on startup. The entire source:

```rust
struct HelloWorld;

impl Guest for HelloWorld {
    fn init() {
        host::log_info("Hello World!");
    }

    fn shutdown() {
        host::log_info("hello_world plugin shutting down");
    }
}
```

Each plugin implements the `Guest` trait with `init` and `shutdown` hooks. The `host` module provides functions like `log_info` to communicate back to NovyWave. Plugin log output appears in the terminal where NovyWave was launched (e.g., `🔌 PLUGIN[novywave.hello_world]: Hello World!`).

### reload_watcher

This plugin watches all opened waveform files for changes on disk. When a file changes, it triggers an automatic reload with a 250ms debounce to avoid redundant reloads during rapid writes.

This is especially useful during simulation. You can re-run your testbench and see updated waveforms in NovyWave without manually reloading — the viewer refreshes on its own as soon as the output file settles.

### files_discovery

This plugin discovers new waveform files matching configurable glob patterns and automatically opens them in NovyWave. It supports gitignore-style patterns and filters by file extension.

By default, the plugin filters for `fst` and `vcd` extensions. Add `ghw` if you work with GHDL waveforms.

Configuration options:

- **`patterns`** — glob patterns to match (e.g., `["test_files/**/*.vcd"]`)
- **`allow_extensions`** — file extensions to accept (default: `["fst", "vcd"]`, add `"ghw"` for GHDL output)
- **`debounce_ms`** — debounce interval in milliseconds (default 200ms, minimum 50ms)

Use this plugin when your build system writes simulation output to a known directory and you want NovyWave to pick up new files automatically.

## Plugin Configuration

Plugins are configured in the `.novywave` configuration file under the `[plugins]` section:

```toml
[plugins]
schema_version = 1

[[plugins.entries]]
id = "novywave.reload_watcher"
enabled = true
artifact_path = "plugins/dist/reload_watcher_plugin.wasm"

[plugins.entries.config]

[[plugins.entries]]
id = "novywave.files_discovery"
enabled = true
artifact_path = "plugins/dist/files_discovery_plugin.wasm"

[plugins.entries.config]
debounce_ms = 200
patterns = ["output/**/*.vcd", "sim_results/**/*.fst"]
```

Set `enabled = false` to disable a plugin without removing its configuration. This is handy when you want to temporarily turn off a plugin during a debugging session.

## Plugin Lifecycle

Each plugin goes through a predictable sequence of stages:

1. **init** — called once when the plugin loads. Plugins register watchers, patterns, or other setup logic here.
2. **refresh-opened-files** — called when the file list or configuration changes, giving the plugin a chance to update its state.
3. **event handlers** — receive notifications as things happen: file changes for watcher plugins, new files for discovery plugins.
4. **shutdown** — called before the plugin unloads, allowing cleanup.

## Host Capabilities

Plugins can interact with NovyWave through these host-provided functions:

- **`log-info`**, **`log-error`** — write messages to the NovyWave log.
- **`get-opened-files`** — query the list of currently opened waveform files.
- **`register-watched-files`**, **`clear-watched-files`** — watch specific files for changes and stop watching them.
- **`reload-waveform-files`** — trigger a reload of all currently opened waveform files.
- **`register-watched-directories`**, **`clear-watched-directories`** — watch directories for new or changed files and stop watching them.
- **`open-waveform-files`** — open new waveform files in NovyWave.
- **`get-config-toml`** — read the plugin's own configuration from the `.novywave` file.

## Related Pages

- [Configuration](/user-guide/configuration/) — full `.novywave` file format reference, including plugin configuration
- [Troubleshooting](/user-guide/troubleshooting/) — plugin-specific troubleshooting tips
- [Architecture Overview](/development/architecture/) — plugin architecture and WIT component model details
