---
title: Your First Waveform
description: Step-by-step guide to viewing a waveform in NovyWave
---

This tutorial walks you through loading and exploring a waveform file in NovyWave. By the end, you will have navigated a timeline, inspected signal values, and changed display formats — the core skills for everyday waveform work.

## Prerequisites

- NovyWave installed ([Installation Guide](/getting-started/installation/))
- A waveform file (`.vcd`, `.fst`, or `.ghw`)

If you don't have a waveform file, create one with these tutorials:
- [VHDL with GHDL](/tutorials/vhdl-ghdl/)
- [Verilog with Icarus](/tutorials/verilog-icarus/)

## Step 1: Launch NovyWave

Open NovyWave from your applications menu or terminal:

```bash
novywave
```

You'll see three main panels:
- **Files & Scopes** (top-left)
- **Variables** (top-right)
- **Selected Variables** (bottom)

## Step 2: Load Your Waveform

Click **Load Files** in the Files & Scopes panel header.

Navigate to your waveform file and select it. Click **Load**.

Your file appears in the Files & Scopes tree with its time span:

```
design.vcd (0-100ns)
```

## Step 3: Explore the Hierarchy

Click the **chevron** (>) next to your file to expand it.

You'll see the module hierarchy from your design:

```
design.vcd (0-100ns)
  └── TOP
      ├── clock_gen
      └── dut
          └── internal
```

## Step 4: Select a Scope

Click the **checkbox** next to a scope (e.g., `dut`).

The Variables panel now shows all signals in that scope:

```
clk         Wire 1-bit
reset       Wire 1-bit
data_in     Wire 8-bit
data_out    Wire 8-bit
```

## Step 5: Add Signals to View

Click on signals in the Variables panel to add them to the waveform view:

1. Click `clk` — it appears in Selected Variables
2. Click `data_in` — added below clk
3. Click `data_out` — added below data_in

## Step 6: View the Waveforms

The Selected Variables panel now shows your signals:

- **Name Column**: Signal names with remove buttons
- **Value Column**: Current value at cursor position
- **Wave Column**: Visual waveform timeline

## Step 7: Navigate the Timeline

### See the Full Picture
Press `R` to reset and see the entire simulation time.

### Zoom In
Press `W` repeatedly to zoom into an area of interest.

### Move the Cursor
Click on the waveform to position the blue cursor line. Watch the values update in the Value column.

### Scan Through Time
Hold `E` to move the cursor forward through time. Hold `Q` to move backward.

## Step 8: Find Signal Changes

Press `Shift+E` to jump to the next signal transition.

This is useful for finding specific events without scrolling through constant values.

## Step 9: Change Value Format

Click the dropdown in the Value column (showing `Hex`, `Bin`, etc.) and select a different format:

- **Bin** — Binary (e.g., `10110100`)
- **Hex** — Hexadecimal (e.g., `0xB4`)
- **UInt** — Unsigned integer (e.g., `180`)
- **Int** — Signed integer

## Step 10: Save Your Workspace

NovyWave automatically saves:
- Which files you loaded
- Which signals you selected
- Your cursor position
- Panel sizes

Close and reopen NovyWave — your workspace is restored automatically.

## What's Next?

- [Working with Multiple Files](/tutorials/multi-file/) — Compare waveforms
- [Keyboard Shortcuts](/user-guide/keyboard-shortcuts/) — Navigate efficiently
- [Timeline Navigation](/user-guide/navigation/) — Master zoom and pan

## Troubleshooting

**File tree is empty after loading?**
Check that the file loaded successfully and expand the file tree by clicking the chevron.

**Variables panel shows "Select scope..."?**
Click the checkbox next to a scope in the file tree.

**Waveform shows all "N/A"?**
Press `R` to reset the timeline view — the cursor may be outside the file's time range.
