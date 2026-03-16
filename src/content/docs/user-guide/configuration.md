---
title: Configuration
description: Workspace persistence and configuration in NovyWave
---

NovyWave automatically saves and restores your entire workspace state. Close NovyWave, come back later, and everything is exactly where you left it.

## Configuration File Location

**Desktop application:**

| Platform | Path |
|----------|------|
| Linux | `~/.config/novywave/.novywave` |
| macOS | `~/Library/Application Support/com.novywave/.novywave` |
| Windows | `%APPDATA%/com.novywave/.novywave` |

### Per-Project Configuration

If a `.novywave` file exists in the current working directory, NovyWave uses it instead of the global config. This allows project-specific waveform setups, similar to how `Cargo.toml` configures Rust projects.

## What Gets Saved

### Application Settings
- **Version** — Application version that last wrote the config

### UI Preferences
- **Theme** — Dark or Light
- **Toast dismiss duration** — How long notifications stay visible

### Workspace State
- **Opened files** — Paths to loaded waveform files
- **Dock mode** — Bottom or Right panel layout
- **Expanded scopes** — Which tree nodes are open in the scope browser
- **Load Files dialog state** — Expanded directories and scroll position
- **Signal groups** — Named, collapsible groups of selected signals

### Variable Selection
- **Selected variables** — Which signals are displayed, identified by unique ID
- **Signal type** — Wire, Real, or other signal types
- **Row height** — Per-signal display height
- **Analog limits** — Auto-scaling or manual min/max for real-valued signals

### Panel Dimensions
- **Panel sizes** — Width and height of each panel
- **Column widths** — Variable name and value column sizes
- Saved separately for Bottom and Right dock modes

### Timeline State
- **Cursor position** — Current time position in picoseconds
- **Visible range** — Displayed time window (start and end in picoseconds)
- **Zoom center** — Zoom reference point in picoseconds
- **Tooltip** — Whether the value tooltip is enabled
- **Markers** — Named bookmarks at specific time positions

### Workspace History
- **Last selected workspace** — Most recently used workspace directory
- **Recent paths** — List of recently opened workspace directories
- **Picker tree state** — Scroll position and expanded paths in the workspace picker

### Plugin Configuration
- **Schema version** — Plugin configuration format version
- **Plugin entries** — Installed plugins with ID, enabled state, artifact path, and per-plugin config

## Configuration Format

The `.novywave` file uses TOML format:

```toml
[app]
version = "1.0.0"

[ui]
theme = "dark"
toast_dismiss_ms = 10000

[workspace]
opened_files = [
    "test_files/simple.vcd",
    "test_files/analog.vcd",
]
dock_mode = "bottom"
expanded_scopes = [
    "scope_test_files/simple.vcd|simple_tb",
]
load_files_expanded_directories = [
    "/home/user/repos",
    "test_files",
]
load_files_scroll_position = 507
signal_groups = []

[workspace.docked_bottom_dimensions]
files_and_scopes_panel_width = 431.0
files_and_scopes_panel_height = 527.0
selected_variables_panel_name_column_width = 237.0
selected_variables_panel_value_column_width = 272.0

[workspace.docked_right_dimensions]
files_and_scopes_panel_width = 400.0
files_and_scopes_panel_height = 300.0
selected_variables_panel_name_column_width = 193.0
selected_variables_panel_value_column_width = 264.0

# Wire signal — fixed row height
[[workspace.selected_variables]]
unique_id = "test_files/simple.vcd|simple_tb.s|A"
signal_type = "Wire"
row_height = 30

# Real (analog) signal — taller row with auto-scaling limits
[[workspace.selected_variables]]
unique_id = "test_files/analog.vcd|top|analog"
signal_type = "Real"
row_height = 55

[workspace.selected_variables.analog_limits]
auto = true
min = 0.0
max = 0.0

[workspace.timeline]
cursor_position_ps = 15682
visible_range_start_ps = 0
visible_range_end_ps = 43561
zoom_center_ps = 19658
tooltip_enabled = true

[[workspace.timeline.markers]]
time_ps = 22118
name = "Marker 1"

[global.workspace_history]
last_selected = "/home/user/repos/NovyWave"
recent_paths = [
    "/home/user/repos/NovyWave",
]

[global.workspace_history.picker_tree_state]
scroll_top = 0.0
expanded_paths = [
    "/home/user/repos",
]

[plugins]
schema_version = 1

[[plugins.entries]]
id = "novywave.hello_world"
enabled = true
artifact_path = "plugins/dist/hello_world_plugin.wasm"

[plugins.entries.config]

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
patterns = ["test_files/to_discover/**/*.*"]
```

## Auto-Save Behavior

Configuration saves automatically with debouncing:

| Action | Delay |
|--------|-------|
| Panel resize | 500ms after drag ends |
| Variable selection | Immediate |
| Timeline navigation | 1000ms debounce |
| Theme/dock toggle | Immediate |

## Resetting Configuration

### Full Reset

Delete the configuration file:

```bash
# Linux
rm ~/.config/novywave/.novywave

# macOS
rm ~/Library/Application\ Support/com.novywave/.novywave
```

```powershell
# Windows
Remove-Item $env:APPDATA\com.novywave\.novywave
```

### Corrupted Configuration

If NovyWave fails to start due to corrupted config, it will show an error message with the file path. Either fix the TOML syntax or delete the file to reset.

## Related Pages

- [Plugins](/user-guide/plugins/) — plugin configuration details and built-in plugins
- [Troubleshooting](/user-guide/troubleshooting/) — configuration-related troubleshooting
- [Interface Overview](/user-guide/interface-overview/) — understand the panels and workspace layout that configuration saves
