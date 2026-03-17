---
title: Workspace & Configuration
description: Understand workspaces, per-workspace state, and global settings in NovyWave
---

NovyWave automatically saves and restores your entire workspace state. Close NovyWave, come back later, and everything is exactly where you left it.

## What is a Workspace?

A workspace is simply a directory on your system. When you open a workspace, NovyWave creates a `.novywave` file in that directory to store the workspace state — loaded files, selected signals, timeline position, panel layout, and plugin configuration.

When NovyWave starts, it opens a Default workspace based on the application's working directory. You can switch workspaces at any time via the **Open Workspace...** button in the header bar. NovyWave remembers your 3 most recent workspaces so you can switch between projects quickly.

Each workspace is independent — opening a different workspace loads its own set of files, signals, and layout.

## Configuration Files

NovyWave uses two configuration files:

### Workspace configuration (`.novywave`)

Stored in the workspace root directory (e.g., `~/repos/my-project/.novywave`). Contains all workspace-specific state. Created automatically when you first open a directory as a workspace.

### Global configuration (`.novywave_global`)

Stores workspace history only — which workspace was last open and your recent workspaces list.

| Platform | Path |
|----------|------|
| Linux | `~/.config/novywave/.novywave_global` |
| macOS | `~/Library/Application Support/novywave/.novywave_global` |
| Windows | `%APPDATA%\novywave\.novywave_global` |

## What Gets Saved

### In `.novywave` (per workspace)

- **App version** — version that last wrote the config
- **Theme** — Dark or Light
- **Toast dismiss duration** — how long notifications stay visible
- **Opened files** — paths to loaded waveform files
- **Dock mode** — Bottom or Right panel layout
- **Expanded scopes** — which tree nodes are open in the scope browser
- **Load Files dialog state** — expanded directories and scroll position
- **Signal groups** — named, collapsible groups of selected signals
- **Selected variables** — which signals are displayed, with signal type, row height, and analog limits
- **Panel dimensions** — width and height of each panel, saved separately for Bottom and Right dock modes
- **Timeline state** — cursor position, visible range, zoom center, tooltip enabled, named markers (all in picoseconds)
- **Plugin configuration** — enabled plugins with their settings

### In `.novywave_global`

- **Last selected workspace** — restored on next launch
- **Recent workspaces** — up to 3 most recently used directories
- **Picker tree state** — scroll position and expanded paths in the workspace picker dialog

## Workspace Configuration Format

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

[plugins]
schema_version = 1

[[plugins.entries]]
id = "novywave.reload_watcher"
enabled = true
artifact_path = "plugins/dist/reload_watcher_plugin.wasm"

[plugins.entries.config]
```

## Global Configuration Format

The `.novywave_global` file stores only workspace history:

```toml
[workspace_history]
last_selected = "/home/user/repos/NovyWave"
recent_paths = [
    "/home/user/repos/NovyWave",
]

[workspace_history.picker_tree_state]
scroll_top = 0.0
expanded_paths = [
    "/home/user/repos",
]
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

### Reset a workspace

Delete the `.novywave` file in the workspace directory. NovyWave will create a fresh one on next launch:

```bash
rm .novywave
```

### Reset global settings

Delete the global config file to clear workspace history:

```bash
# Linux
rm ~/.config/novywave/.novywave_global

# macOS
rm ~/Library/Application\ Support/novywave/.novywave_global
```

```powershell
# Windows
Remove-Item $env:APPDATA\novywave\.novywave_global
```

### Corrupted Configuration

If NovyWave fails to start due to corrupted config, it will show an error message with the file path. Either fix the TOML syntax or delete the file to reset.

## Related Pages

- [Plugins](/user-guide/plugins/) — plugin configuration details and built-in plugins
- [Troubleshooting](/user-guide/troubleshooting/) — configuration-related troubleshooting
- [Interface Overview](/user-guide/interface-overview/) — understand the panels and workspace layout that configuration saves
