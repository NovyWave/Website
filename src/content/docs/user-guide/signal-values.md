---
title: Signal Values and Formats
description: Understand value formatting, special states, and copying behavior
---

NovyWave lets you choose how each selected signal is displayed at the current cursor time.

## Available Formats

Depending on signal width and meaning, the value dropdown can display:

- ASCII
- Binary
- Binary with grouped digits
- Hexadecimal
- Octal
- Signed decimal
- Unsigned decimal

## When to Use Each Format

- **Binary** is best for bit-level debugging.
- **Grouped binary** helps with wide buses.
- **Hexadecimal** is a compact default for many digital designs.
- **Signed** and **unsigned** decimal views help when a bus represents a numeric quantity.
- **ASCII** is useful when bytes represent text-like data.

## Special States

NovyWave preserves digital special states rather than hiding them:

| State | Meaning | Typical display |
| --- | --- | --- |
| `X` | unknown | `X` or placeholder |
| `Z` | high-impedance | `Z` or placeholder |
| `U` | uninitialized | `U` or placeholder |

For text-oriented or decimal-oriented views, special states may render as placeholders instead of literal characters because they are not valid numeric or text values.

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

NovyWave automatically scales the vertical axis to fit the visible data range. If you need a fixed scale, you can set manual minimum and maximum limits in the configuration file under each variable's `analog_limits` section:

```toml
[[workspace.selected_variables]]
unique_id = "design.vcd|top|voltage"
signal_type = "Real"
row_height = 55

[workspace.selected_variables.analog_limits]
auto = false
min = -1.8
max = 3.3
```

The cursor value column shows the precise analog value at the current time position.

## Related Pages

- [Cursor Controls](/user-guide/navigation/cursor/) — move the cursor to inspect values at different times
- [Configuration](/user-guide/configuration/) — customize formatters, analog limits, and row heights
- [Interface Overview](/user-guide/interface-overview/) — understand where signal values appear in the UI
