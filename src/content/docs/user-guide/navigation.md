---
title: Timeline Navigation
description: Zoom, pan, and inspect waveforms with precision
---

NovyWave provides powerful navigation tools for exploring waveform data across any time scale, from nanoseconds to seconds.

## The Timeline Interface

The waveform timeline consists of:

1. **Signal Rows** — one row per selected variable showing value transitions
2. **Value Blocks** — colored blocks showing signal values over time
3. **Timeline Footer** — time scale with tick marks
4. **Yellow Cursor** — current time position for value inspection
5. **Blue Zoom Center** — reference point for zoom operations

## Zooming

| Key | Action |
|-----|--------|
| `W` | Zoom in |
| `S` | Zoom out |
| `Shift+W` | Zoom in faster (3-5x) |
| `Shift+S` | Zoom out faster (3-5x) |
| `Z` | Reset zoom center to position 0 |
| `R` | Reset to default view (full timeline visible) |

### Zoom Center (Blue Line)

The **blue vertical line** marks the zoom center:

- Zoom operations expand/contract around this point
- Follows your mouse cursor when hovering over the canvas
- Default position is time 0 (left edge)
- Press `Z` to reset zoom center to 0

When analyzing multiple files with different time ranges, zoom center at 0 ensures files align properly during zoom operations.

### Zoom Level Display

The current zoom level is shown in the Name Column footer:

```
15ns/px   — Very zoomed in (high detail)
1.5us/px  — Moderately zoomed
250ms/px  — Zoomed out (overview)
```

## Panning

| Key | Action |
|-----|--------|
| `A` | Pan left (earlier in time) |
| `D` | Pan right (later in time) |
| `Shift+A` | Pan left faster |
| `Shift+D` | Pan right faster |

Panning shifts the visible time window without changing zoom level.

**Panning vs cursor movement:**
- **Panning** (`A`/`D`) moves the viewport; cursor position in time stays the same
- **Cursor movement** (`Q`/`E`) moves the cursor; viewport may follow

## Cursor Controls (Yellow Line)

The **yellow vertical line** is the timeline cursor — your primary tool for inspecting signal values at specific times.

### Moving the Cursor

| Key | Action |
|-----|--------|
| `Q` | Move cursor left continuously |
| `E` | Move cursor right continuously |
| `Shift+Q` | Jump to previous signal transition |
| `Shift+E` | Jump to next signal transition |
| Click | Jump cursor to clicked position |

Hold `Q` or `E` for smooth cursor scanning. Values update in real-time as the cursor moves.

### Transition Jumping

Use `Shift+Q`/`Shift+E` to jump directly to signal transitions — essential for finding specific events without scrolling through constant values.

### Cursor vs Zoom Center

| Line | Color | Purpose |
|------|-------|---------|
| **Cursor** | Yellow | Time position for value inspection |
| **Zoom Center** | Blue | Reference point for zoom operations |

These are independent systems — cursor movement doesn't affect zoom center, and zoom operations don't move the cursor.

## Value Inspection

When the cursor is positioned, the Value column shows each signal's value:

```
clk:     1         [Bin]
data:    0xAB      [Hex]
counter: 42        [UInt]
```

### Special States

| Display | Meaning |
|---------|---------|
| `Z` | High-impedance (floating) |
| `X` | Unknown/undefined |
| `U` | Uninitialized |
| `N/A` | No data at this time |

## Time Scale

NovyWave automatically formats time values based on zoom level:

| Zoom Level | Display Format | Example |
|------------|---------------|---------|
| Wide | Seconds | `125s` |
| Medium | Milliseconds | `125.0ms` |
| Close | Microseconds | `125.0us` |
| Very Close | Nanoseconds | `125ns` |

## Full Reset

Press `R` to reset everything:
- Zoom level returns to showing full timeline
- Zoom center moves to 0
- Cursor moves to center of timeline

## Recommended Workflows

### Inspecting a Specific Event

1. Press `R` to see the full timeline
2. Click near the region of interest
3. Press `W` repeatedly to zoom in
4. Use `Q`/`E` to position cursor precisely
5. Use `Shift+Q`/`Shift+E` to snap to transitions

### Scanning for Patterns

1. Position cursor at start point
2. Hold `E` to scan forward continuously
3. Watch values update in the Value column
4. Release when pattern is found

### Multi-File Navigation

1. Press `R` to see the full combined timeline
2. Zoom center at 0 aligns most files
3. Use cursor to inspect values at specific times across all files
