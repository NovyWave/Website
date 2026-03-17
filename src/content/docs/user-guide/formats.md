---
title: Supported Formats
description: Compare VCD, FST, and GHW for NovyWave workflows
slug: user-guide/loading-files/formats
---

NovyWave supports the three waveform formats most commonly encountered in open hardware development.

## VCD

**Extension:** `.vcd`

VCD is the most portable option and is supported by most Verilog and SystemVerilog toolchains.

### Strengths

- human-readable text format
- easy to inspect or diff during debugging
- broad simulator compatibility

### Tradeoffs

- large file sizes
- slower parsing than binary formats

### Example Generation

```verilog
initial begin
    $dumpfile("output.vcd");
    $dumpvars(0, top_module);
end
```

## FST

**Extension:** `.fst`

FST is a compact binary format optimized for waveform viewing and random access.

### Strengths

- much smaller than VCD
- faster to load for large simulations
- a good default for Verilator-based flows

### Example Generation

```cpp
Verilated::traceEverOn(true);
VerilatedFstC* tfp = new VerilatedFstC;
top->trace(tfp, 99);
tfp->open("output.fst");
```

## GHW

**Extension:** `.ghw`

GHW is the native output format of the GHDL simulator. It preserves VHDL-specific type information — records, arrays, and enumerations — better than VCD, which flattens everything into bit vectors.

### Strengths

- good fit for GHDL and VHDL projects
- preserves hierarchical and VHDL-oriented data cleanly
- retains VHDL-specific type information (records, arrays, enumerations) that other formats lose
- real-valued signals in GHW files are rendered as analog traces in NovyWave

NovyWave parses GHW files through the [wellen](https://github.com/ekiwi/wellen) library, which handles the binary format and exposes scopes, signals, and type metadata to the viewer.

### Example Generation

```bash
ghdl -r testbench --wave=output.ghw
```

## Comparison

| Format | Best fit | File size | Parse speed |
| --- | --- | --- | --- |
| VCD | universal compatibility | large | slower |
| FST | Verilator and large traces | small | fast |
| GHW | GHDL and VHDL | medium | medium |

## Recommendation

- choose **FST** when your simulator supports it and performance matters
- choose **GHW** for GHDL-centered VHDL work
- choose **VCD** when portability matters more than file size
