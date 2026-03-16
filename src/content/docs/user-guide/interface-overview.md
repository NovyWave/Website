---
title: Interface Overview
description: Understand the NovyWave layout — panels, signal groups, markers, analog traces, and tooltips
---

NovyWave's interface is built around a three-panel workflow that mirrors how you naturally work with waveforms: find the right files, pick the signals that matter, then explore them on a shared timeline.

![NovyWave interface showing three panels with loaded waveform files and signal traces](/assets/screenshots/interface-panels.png)

## Main Panels

### Files and Scopes

Use this panel to:

- open waveform files,
- expand scope hierarchies,
- switch the active scope,
- remove files from the current workspace.

### Variables

This panel lists signals from the currently selected scope.

- search filters the list in real time,
- each row shows the variable name and type,
- clicking a variable adds it to the waveform view.

### Selected Variables

This panel combines the value list and the waveform timeline.

- the left side shows selected signals and per-signal format controls,
- the timeline shows transitions over time,
- the footer exposes time range and zoom information.

## Two Important Guide Lines

### Blue Line: Zoom Center

The blue line controls where zooming happens. When the mouse is over the waveform area, zoom operations happen around that position.

### Yellow Line: Cursor

The yellow line controls value inspection. The value column updates for the current cursor time.

### Marker Lines

Named markers appear as additional vertical lines on the timeline. Each marker has a label and a fixed time position. Use them to bookmark events or transitions you want to revisit.

## Typical Workflow

1. Load one or more waveform files.
2. Expand the scope tree and choose a scope.
3. Add interesting signals from the Variables panel.
4. Use `W`, `S`, `A`, `D`, `Q`, and `E` to navigate.
5. Change individual value formats or copy a formatted value when needed.

## Dock Modes and Theme

Global controls let you:

- switch between dark and light themes,
- move the selected-variable area between bottom and right dock modes,
- preserve those choices between sessions.

## Signal Groups

You can organize selected signals into named groups. Groups appear as collapsible sections in the Selected Variables panel, making it easier to manage large sets of signals. Each group has a name and can be expanded or collapsed independently.

## Named Markers

Markers are labeled bookmarks on the timeline. Press **M** to create a marker at the current cursor position — NovyWave will prompt you for a name. Press **1** through **9** to jump directly to a marker. Markers are saved in the configuration file and persist across sessions.

## Per-Signal Row Height

Each signal row in the timeline can have its own height. Drag the divider between rows to resize. The default height is 30 pixels for digital signals. Analog signals use taller rows to show waveform detail.

## Analog Signals

Real-valued signals (such as voltages or currents from analog simulations) render as continuous waveform traces instead of digital blocks. NovyWave auto-scales the vertical range to fit the visible data, or you can set manual min/max limits.

## Waveform Tooltips

Hover over the timeline area to see signal values at the mouse position. Press **T** to toggle tooltip visibility.

## Workspace Picker

NovyWave remembers your recent workspaces. The workspace picker lets you switch between project directories, and each workspace maintains its own configuration file.
