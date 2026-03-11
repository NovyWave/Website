---
title: Timeline Navigation
description: Learn the core timeline concepts before diving into detailed controls
slug: user-guide/navigation
---

NovyWave's waveform viewer revolves around a shared time axis and two guide lines:

- the **blue zoom center**, which controls where zooming happens
- the **yellow cursor**, which controls value inspection

## Related Pages

- [Zooming and Panning](/user-guide/navigation/zoom-pan/)
- [Cursor Controls](/user-guide/navigation/cursor/)
- [Keyboard Shortcuts](/user-guide/keyboard-shortcuts/)

## The Timeline Interface

The waveform timeline consists of:

1. **Signal Rows** showing selected variables
2. **Value Blocks** showing transitions over time
3. **Timeline Footer** showing visible range and scale
4. **Yellow Cursor** for inspection time
5. **Blue Zoom Center** for zoom focus

## Core Workflow

Most timeline work follows this loop:

1. reset or zoom out until the relevant event is visible,
2. position the blue zoom center near the area of interest,
3. zoom and pan toward the event,
4. move the yellow cursor onto the exact transition,
5. read or copy values from the value column.

## Time Scale

NovyWave automatically formats time values based on the visible range:

| Zoom level | Display style | Example |
| --- | --- | --- |
| Wide | seconds | `125s` |
| Medium | milliseconds | `125.0ms` |
| Close | microseconds | `125.0us` |
| Very close | nanoseconds | `125ns` |

## Full Reset

Press `R` to reset the viewport to the full waveform range and regain context quickly.

## Recommended Workflows

### Inspecting a Specific Event

1. Press `R` to see the full timeline.
2. Click near the region of interest.
3. Press `W` repeatedly to zoom in.
4. Use `Q` / `E` to position the cursor precisely.
5. Use `Shift+Q` / `Shift+E` to snap to transitions.

### Scanning for Patterns

1. Zoom out for context.
2. Pan or move the cursor forward continuously.
3. Watch values update in the value column.
4. Zoom in when something interesting appears.

### Multi-File Navigation

1. Press `R` to see the full combined timeline.
2. Keep the zoom center at time 0 when comparing files that start together.
3. Expect `N/A` when one file does not cover the current cursor time.
