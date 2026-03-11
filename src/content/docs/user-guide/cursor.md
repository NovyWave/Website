---
title: Cursor Controls
description: Move the cursor, inspect values, and jump between transitions
slug: user-guide/navigation/cursor
---

The yellow cursor line marks the exact time currently being inspected.

## Moving the Cursor

### Mouse

Click anywhere on the waveform area to place the cursor.

### Keyboard

| Key | Effect |
| --- | --- |
| `Q` | move cursor left continuously |
| `E` | move cursor right continuously |
| `Shift+Q` | jump to previous transition |
| `Shift+E` | jump to next transition |

## Why Transition Jumps Matter

Transition jumps are useful when you want to:

- find the next clock edge,
- jump between state changes,
- locate glitches or brief spikes quickly.

## Reading Values

At the cursor time, the value column shows the current value of each selected signal. Each row also exposes a format selector so you can switch between binary, hex, decimal, and other representations without changing the underlying data.

Use the copy control next to a value when you need to paste the currently formatted representation elsewhere.

## Special States

You may see these logic states while inspecting waveforms:

| Value | Meaning |
| --- | --- |
| `X` | unknown or undefined |
| `Z` | high-impedance |
| `U` | uninitialized, often from VHDL flows |

## Cursor vs Zoom Center

The cursor and the zoom center are intentionally separate:

- the **yellow line** chooses what time you are inspecting,
- the **blue line** chooses what point zooming pivots around.

Keeping them separate lets you inspect one event while still zooming around another reference point.
