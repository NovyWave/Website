---
title: Data Types
description: Core types used to represent files, scopes, signals, and configuration
---

This page summarizes the data model that shows up repeatedly in NovyWave's shared code.

## Waveform Files

### Tracked File

A tracked file represents one loaded waveform input and its current loading state.

Typical fields include:

- stable identifier
- absolute path
- display filename
- loading or error state

### File Format

NovyWave supports:

- VCD
- FST
- GHW

## Scopes and Signals

### Scope Data

A scope represents one node in the design hierarchy. It contains:

- a name,
- a fully qualified path,
- child scopes,
- signals visible in that scope.

### Signal Metadata

Signals carry at least:

- variable name,
- signal type,
- bit width.

## Selected Variables

Once a signal is added to the waveform view, NovyWave tracks:

- the source file,
- the scope path,
- the variable name,
- the chosen display format,
- a unique identifier that keeps multi-file sessions unambiguous,
- the signal type (e.g., bit, vector, real),
- the row height in the waveform view,
- analog display limits (see AnalogLimits).

## Time

NovyWave uses a single internal time representation for navigation and rendering and formats time units for display based on magnitude.

## Configuration

Configuration captures persistent UI state such as:

- loaded files,
- selected variables,
- panel layout,
- theme,
- dock mode,
- timeline state.

### AnalogLimits

Controls the vertical scaling for analog (real-valued) signal display.

| Field | Type | Description |
|-------|------|-------------|
| `auto` | boolean | When true, NovyWave auto-scales to fit visible data |
| `min` | float | Manual minimum value (used when `auto` is false) |
| `max` | float | Manual maximum value (used when `auto` is false) |

### SignalGroupConfig

Defines a named group of signals in the Selected Variables panel.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name for the group |
| `member_ids` | list of strings | Signal `unique_id` values belonging to this group |
| `collapsed` | boolean | Whether the group is collapsed in the UI |

### MarkerConfig

A named bookmark on the timeline.

| Field | Type | Description |
|-------|------|-------------|
| `time_ps` | unsigned 64-bit integer | Marker position in picoseconds |
| `name` | string | Display label for the marker |

### PlatformRoot

An entry point in the file picker for the current operating system.

| Field | Type | Description |
|-------|------|-------------|
| `path` | string | Absolute path to the root directory |
| `label` | string | Display name (e.g., "Home", "Desktop") |

## Special Values

Special logic states appear explicitly in the model and UI:

| State | Meaning |
| --- | --- |
| `X` | unknown |
| `Z` | high-impedance |
| `U` | uninitialized |
| `N/A` | no value for the current time |
