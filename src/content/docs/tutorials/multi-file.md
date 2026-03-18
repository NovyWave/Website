---
title: Multi-File Comparison
description: Load and compare signals from multiple waveform files
---

This tutorial shows how to load and compare signals from multiple waveform files in NovyWave. We'll use test files from the [NovyWave repository](https://github.com/NovyWave/NovyWave), but you can follow along with any waveform files.

## Step 1: Load Multiple Files

1. Click **Load Files**
2. Navigate to the `test_files/` directory
3. Check the boxes next to `simple.vcd` and `simple_reload_test.vcd`
4. Click **Load**

Both files now appear in the Files & Scopes panel.

You can also load files one at a time — click **Load Files**, select a file, load it, then repeat for the next file.

## Step 2: Understand File Disambiguation

If files have the same name from different directories, NovyWave adds path prefixes:

```
tests/pass/design.vcd  →  pass/design.vcd
tests/fail/design.vcd  →  fail/design.vcd
```

Hover over a signal name in the Selected Variables panel to see its full path, scope, and signal type.

## Step 3: Select Signals from Multiple Files

### From the First File

1. Expand `simple.vcd` > `simple_tb` > `s`
2. Click the checkbox next to `s`
3. In the Variables panel, click `A` and `B`

### From the Second File

1. Expand `simple_reload_test.vcd` > `simple_tb` > `s`
2. Click the checkbox next to `s`
3. In the Variables panel, click `A` and `B`

## Step 4: View Combined Signals

The Selected Variables panel shows signals from both files together on the same timeline.

## Step 5: Time Alignment

Both files start at time 0, so they align automatically.

Press `R` to see the full combined timeline. The view extends to cover the longest file.

If your files have different durations, signals from the shorter file show `N/A` outside their time range.

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

- Press `Z` to recenter the green zoom line around time 0
- Press `R` to fit the whole combined range
- Compare related signals in the same format to reduce visual noise
- Add clock signals from both files to verify time alignment
- Compare output signals first — trace backward from differences to find the root cause

## Common Use Cases

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

- Click **X** on individual files in the Files & Scopes panel
- Or click **Remove All** to clear everything

## Persistence

NovyWave automatically saves your multi-file setup — loaded files, selected signals, and view settings persist across sessions.
