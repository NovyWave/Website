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
- a unique identifier that keeps multi-file sessions unambiguous.

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

## Special Values

Special logic states appear explicitly in the model and UI:

| State | Meaning |
| --- | --- |
| `X` | unknown |
| `Z` | high-impedance |
| `U` | uninitialized |
| `N/A` | no value for the current time |
