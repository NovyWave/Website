---
title: Multi-File Comparison
description: Load and compare signals from multiple waveform files
---

This tutorial shows how to load and compare signals from multiple waveform files in NovyWave.

## Scenario

You have two simulation results to compare:
- `baseline.vcd` — known-good reference simulation
- `current.vcd` — current design under test

## Step 1: Load Multiple Files

### Method A: Multi-Select

1. Click **Load Files**
2. Navigate to your files directory
3. Hold `Ctrl` (or `Cmd` on macOS)
4. Click both `baseline.vcd` and `current.vcd`
5. Click **Load**

### Method B: Sequential Loading

1. Click **Load Files** > Select `baseline.vcd` > Click **Load**
2. Click **Load Files** > Select `current.vcd` > Click **Load**

Both files now appear in the Files & Scopes panel.

## Step 2: Understand File Disambiguation

If files have the same name from different directories, NovyWave adds path prefixes:

```
tests/pass/design.vcd  →  pass/design.vcd
tests/fail/design.vcd  →  fail/design.vcd
```

## Step 3: Select Signals from Multiple Files

### From the First File

1. Expand `baseline.vcd`
2. Click the checkbox for the scope you want (e.g., `TOP > dut`)
3. In the Variables panel, click `clk` and `data_out`

### From the Second File

1. Expand `current.vcd`
2. Click the checkbox for the same scope (`TOP > dut`)
3. In the Variables panel, click `data_out`

## Step 4: View Combined Signals

The Selected Variables panel shows signals from both files together:

```
baseline.vcd|TOP|dut|clk       [1]    [Bin]
baseline.vcd|TOP|dut|data_out  [0x42] [Hex]
current.vcd|TOP|dut|data_out   [0x42] [Hex]
```

## Step 5: Time Alignment

Both files typically start at time 0, so they align automatically.

Press `R` to see the full combined timeline. The view extends to cover the longest file.

If your files have different durations (e.g., 100ns vs 150ns), signals from the shorter file show `N/A` outside their time range.

## Step 6: Compare Signals

### Visual Comparison

Look for differences in waveform patterns. Mismatches stand out when signals are adjacent.

### Cursor-Based Comparison

1. Press `R` to see the full timeline
2. Click on an area that looks different
3. Use `Q`/`E` to fine-tune cursor position
4. Compare values in the Value column

### Jump to Differences

Use `Shift+Q` and `Shift+E` to jump between transitions. If the files differ, one signal will transition while the other doesn't.

## Practical Tips

### Compare Clock Signals

Add clock signals from both files to verify time alignment. If clocks don't match, there may be time scale differences.

### Focus on Outputs

When debugging, compare output signals first — outputs show the final result of internal differences. Trace backward from output differences to find the root cause.

### Use Consistent Formatting

Set the same format (Hex, Bin, etc.) for signals you're comparing to make differences easier to spot.

### Use Common Scope Level

Select scopes at the same hierarchy level in both files for meaningful comparison.

## Common Use Cases

### Design Partitioning

Compare signals from separately simulated subsystems:
```
cpu_simulation.vcd
memory_simulation.vcd
io_simulation.vcd
```

### Regression Testing

Compare known-good waveforms against current results:
```
test_pass.fst      # Reference
test_current.fst   # Under test
```

### Mixed Language

Combine Verilog and VHDL simulation outputs:
```
verilog_top.vcd    # Verilog wrapper
vhdl_core.ghw      # VHDL implementation
```

## Removing Files

- Click **X** on individual files in Files & Scopes panel
- Or click **Remove All** to clear everything

## Persistence

NovyWave automatically saves your multi-file setup — both loaded files, all selected signals, and your view settings. Reopen NovyWave later to continue your analysis.
