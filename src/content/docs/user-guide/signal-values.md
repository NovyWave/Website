---
title: Signal Values and Formats
description: Understand value formatting, special states, and copying behavior
---

NovyWave lets you choose how each selected signal is displayed at the current cursor time.

## Available Formats

Depending on signal width and meaning, the value dropdown can display:

| Format | Example (for value 200) |
|--------|------------------------|
| Binary | `11001000` |
| Binary (grouped) | `1100 1000` |
| Hexadecimal | `C8` |
| Octal | `310` |
| Unsigned decimal | `200` |
| Signed decimal | `-56` (for an 8-bit signal) |
| ASCII | `OK` (multi-byte bus) or `A` (single byte) |

## When to Use Each Format

- **Binary** is best for bit-level debugging.
- **Grouped binary** helps with wide buses.
- **Hexadecimal** is a compact default for many digital designs.
- **Signed** and **unsigned** decimal views help when a bus represents a numeric quantity.
- **ASCII** is useful when bytes represent text-like data.

## Special States

NovyWave preserves digital special states rather than hiding them:

| State | Meaning |
| --- | --- |
| `X` | **Unknown** — the simulator cannot determine if the signal is 0 or 1 (e.g., conflicting drivers or unresolved logic) |
| `Z` | **High-impedance** — the signal is not being driven by anything, as if the wire is disconnected |
| `U` | **Uninitialized** — the signal has not been assigned a value yet (common at the start of VHDL simulations) |

These are not errors — they are valid signal states that simulators produce. They commonly appear at simulation start, on tri-state buses, or when modules are not yet active.

## `N/A` Values

`N/A` means the cursor is outside the valid time range for that file or signal segment.

This commonly appears in multi-file sessions when one trace ends earlier than another.

## Copying Values

The copy action copies the currently formatted value, not the raw internal representation. This is useful when you want to paste:

- a hex bus value into notes,
- a decimal counter value into a bug report,
- a grouped binary value into a review or discussion.

## Analog Signals

Real-valued signals — common in mixed-signal or analog simulation output — display as continuous waveform traces rather than digital transition blocks.

NovyWave automatically scales the vertical axis to fit the visible data range (**Auto** mode). You can switch to manual scaling by clicking the **Auto** button next to the analog signal in the Selected Variables panel, then setting your own min and max values. The cursor value column shows the precise analog value at the current time position.

## Related Pages

- [Cursor Controls](/user-guide/navigation/cursor/) — move the cursor to inspect values at different times
- [Configuration](/user-guide/configuration/) — customize formatters, analog limits, and row heights
- [Interface Overview](/user-guide/interface-overview/) — understand where signal values appear in the UI
