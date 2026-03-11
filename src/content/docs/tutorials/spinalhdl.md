---
title: SpinalHDL with Verilator
description: Generate a VCD waveform from a SpinalHDL counter and inspect it in NovyWave
---

This tutorial uses the SpinalHDL counter example from the NovyWave source repository.

## Prerequisites

- Java 11 or newer
- `sbt`
- Verilator
- a local checkout of `~/repos/NovyWave/examples/spinalhdl/counter`

## Step 1: Enter the Example

```bash
cd ~/repos/NovyWave/examples/spinalhdl/counter
```

## Step 2: Generate the Waveform

```bash
make
```

This runs the example simulation and produces `counter.vcd`.

## Step 3: Open the Waveform

```bash
novywave counter.vcd
```

## Step 4: Inspect the Design

Focus on:

- the counter output bus,
- reset behavior at startup,
- overflow or wraparound behavior,
- clock transitions and enable interactions.

## Troubleshooting

### `sbt` Not Found

Install `sbt` and confirm it is on your `PATH`.

### `verilator` Not Found

Install Verilator and rerun `make`.

### First Build Is Slow

That is expected. SpinalHDL and Scala dependencies take time to resolve on the first run.
