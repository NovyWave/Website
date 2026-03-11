---
title: Interface Overview
description: Understand the NovyWave layout before diving into workflows
---

NovyWave is organized around a three-panel workflow:

1. load waveform files,
2. choose signals,
3. inspect them on a shared timeline.

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
