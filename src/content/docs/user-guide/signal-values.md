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
