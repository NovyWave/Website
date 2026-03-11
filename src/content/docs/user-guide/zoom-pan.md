---
title: Zooming and Panning
description: Control timeline scale and viewport position efficiently
slug: user-guide/navigation/zoom-pan
---

Zoom and pan are the fastest way to move between high-level overview and precise event inspection.

## Zooming

### Basic Keys

| Key | Effect |
| --- | --- |
| `W` | zoom in |
| `Shift+W` | zoom in faster |
| `S` | zoom out |
| `Shift+S` | zoom out faster |

## Zoom Center

NovyWave zooms around the **blue line**, not around the center of the screen.

- when the pointer is over the waveform area, the blue line follows it
- when the pointer leaves the waveform area, zooming falls back toward time 0

This makes it easier to lock onto a specific event without losing orientation.

## Zoom Level Display

The footer shows the current time-per-pixel value. Smaller values mean you are zoomed in further.

## Panning

| Key | Effect |
| --- | --- |
| `A` | pan left |
| `Shift+A` | pan left faster |
| `D` | pan right |
| `Shift+D` | pan right faster |

Panning moves the visible window without moving the cursor's absolute time.

## Full Reset

Use `R` when you lose context. It resets the viewport to the full waveform range.

## Recommended Workflow

1. press `R` for a known starting point,
2. hover near the event of interest,
3. zoom with `W`,
4. pan with `A` / `D`,
5. use the cursor for precise value inspection.
