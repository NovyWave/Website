---
title: Loading Waveform Files
description: Load and manage waveform files in NovyWave
---

NovyWave supports loading multiple waveform files simultaneously, making it easy to correlate signals from different simulations or design partitions.

## Supported Formats

| Format | Extension | Description | File Size | Parse Speed |
|--------|-----------|-------------|-----------|-------------|
| **VCD** | `.vcd` | Value Change Dump — IEEE standard, ASCII, human-readable | Large | Slow |
| **FST** | `.fst` | Fast Signal Trace — binary, compressed, random access | Small (10-100x less than VCD) | Fast |
| **GHW** | `.ghw` | GHDL Waveform — binary, full VHDL type support | Medium | Medium |

**Recommendations:**
- Use **FST** for Verilator projects (best performance)
- Use **GHW** for GHDL/VHDL projects
- Use **VCD** for maximum compatibility or debugging

## Loading Files

### Using the File Dialog

1. Click **Load Files** in the Files & Scopes panel header
2. Navigate to your waveform files
3. Select one or more files (use Ctrl/Cmd+click for multiple selection)
4. Click **Load** or press Enter

### Drag and Drop

Drag waveform files from your file manager directly onto the NovyWave window.

## Working with Loaded Files

### File Tree Structure

Loaded files appear in the Files & Scopes panel as a tree:

```
design.vcd (0-100ns)
  └── TOP
      ├── cpu
      │   └── alu
      └── memory
```

Each file shows:
- **File name** (with disambiguation path if needed)
- **Time span** (e.g., 0-100ns)
- **Expandable hierarchy** of modules/scopes

### Selecting Scopes

Click the **checkbox** next to a scope to select it. The Variables panel shows signals from the selected scope.

### Expanding/Collapsing

- Click the **chevron** to expand or collapse a scope
- Expansion state is preserved between sessions

### Removing Files

- Click the **X** button on a file row to remove it
- Use **Remove All** in the header to clear all files

## File Disambiguation

When loading files with the same name from different directories, NovyWave adds path prefixes:

```
project/module_a/test.vcd  →  module_a/test.vcd
project/module_b/test.vcd  →  module_b/test.vcd
```

## Creating Waveform Files

### VCD from Verilog (Icarus Verilog)

```verilog
initial begin
    $dumpfile("output.vcd");
    $dumpvars(0, top_module);
end
```

### FST from Verilator

```cpp
Verilated::traceEverOn(true);
VerilatedFstC* tfp = new VerilatedFstC;
top->trace(tfp, 99);
tfp->open("output.fst");
```

### GHW from GHDL

```bash
ghdl -r testbench --wave=output.ghw
```

### Converting VCD to FST

```bash
vcd2fst input.vcd output.fst
```

## Multi-File Workflows

NovyWave excels at working with multiple waveform files simultaneously.

### Loading Multiple Files

- **Multi-select** in the file dialog (Ctrl/Cmd+click)
- **Sequential loading** — click Load Files again to add more files
- **Drag and drop** multiple files at once

### Time Alignment

Most simulations start at time 0, so multiple files naturally align. When files have different durations, the timeline extends to cover the longest file. Signals show "N/A" outside their file's time range.

### Selecting Variables Across Files

Variables from different files appear together in the waveform view:

1. Select scope from File A, add signals
2. Select scope from File B, add signals
3. All signals display on the same timeline

Each variable shows its full path for identification:
```
design.vcd|TOP|cpu|clk
memory.vcd|TOP|mem|clk
```

NovyWave remembers your multi-file setup — loaded files, selected scopes, selected variables, and expansion states are all persisted.

## Troubleshooting

### File Won't Load
- Check the file format is supported (VCD, FST, GHW)
- Ensure the file isn't corrupted or truncated
- Check file permissions

### Slow Loading
Large files (>100MB) may take a few seconds to parse. Consider using FST format instead of VCD for 10-100x smaller files and faster loading.

### Missing Signals
- Expand the file tree to find scopes
- Use the search box in Variables panel to filter
- Check that the correct scope is selected
