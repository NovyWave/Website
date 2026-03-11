---
title: Multi-File Workflows
description: Compare multiple waveform files on one shared timeline
slug: user-guide/loading-files/multi-file
---

NovyWave can display signals from multiple files together, which is useful for regressions, partitioned designs, and mixed-language debugging.

## Common Use Cases

### Regression Comparison

Load a known-good waveform and a new waveform together to compare clocks, resets, and outputs.

### Design Partitioning

Keep CPU, memory, or I/O subsystem traces in separate files and inspect them on one timeline.

### Mixed Language

Load VCD and GHW traces together when your simulation flow spans Verilog and VHDL.

## Ways to Load Multiple Files

- select several files in the file dialog
- reopen the file dialog and add files incrementally
- drag several files into the window at once

## Time Alignment

Most traces start at time 0, so they align naturally. When files cover different durations:

- the combined view expands to the longest trace,
- shorter traces show `N/A` outside their valid range.

## Selecting Signals Across Files

1. Select a scope from the first file and add signals.
2. Select a scope from the second file and add more signals.
3. Compare all selected signals in the same timeline.

NovyWave keeps full file and scope context in the variable identifier, which helps avoid ambiguity when names repeat.

## Practical Tips

- press `Z` to recenter the blue zoom line around time 0
- press `R` to fit the whole combined range
- compare related signals in the same format to reduce visual noise

## Persistence

NovyWave remembers loaded files, selected variables, and many expansion states, which makes repeated multi-file analysis much faster.
