---
title: Loading Waveform Files
description: Understand the file picker, scope tree, and waveform loading workflow
slug: user-guide/loading-files
---

NovyWave supports loading multiple waveform files simultaneously, making it easy to correlate signals from different simulations or design partitions.

## Related Pages

- [Supported Formats](/user-guide/loading-files/formats/) for format tradeoffs and generation commands
- [Multi-File Workflows](/user-guide/loading-files/multi-file/) for time alignment and comparison strategies

## Loading Files

### Using the File Dialog

1. Click **Load Files** in the Files & Scopes panel header
2. Navigate to your waveform files
3. Select one or more files
4. Click **Load** or press Enter

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

- **File name** with disambiguation path if needed
- **Time span** such as `0-100ns`
- **Expandable hierarchy** of scopes and modules

### Selecting Scopes

Click the **checkbox** next to a scope to select it. The Variables panel then shows signals from the currently selected scope.

### Expanding and Collapsing

- click the **chevron** to expand or collapse a scope
- expansion state is preserved between sessions

### Removing Files

- click the **X** button on a file row to remove it
- use **Remove All** in the header to clear all files

## File Disambiguation

When two files share the same name, NovyWave adds path prefixes so the tree and selected-variable list remain readable:

```
project/module_a/test.vcd  →  module_a/test.vcd
project/module_b/test.vcd  →  module_b/test.vcd
```

## Troubleshooting

### File Won't Load

- check the file format is supported
- ensure the file is not corrupted or truncated
- confirm the file permissions allow access

### Slow Loading

Large files may take a few seconds to parse. Consider using FST format instead of VCD for smaller files and faster loading.

### Missing Signals

- expand the file tree to find scopes
- use the Variables search box to filter
- confirm the correct scope is selected
