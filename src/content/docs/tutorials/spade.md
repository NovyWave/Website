---
title: Spade Counter
description: Compile a Spade example, simulate it, and inspect the generated waveform
---

This tutorial uses the Spade counter example from the NovyWave repository.

## Prerequisites

- Rust toolchain
- `spade-lang`
- Icarus Verilog
- a local checkout of `~/repos/NovyWave/examples/spade/counter`

## Step 1: Enter the Example

```bash
cd ~/repos/NovyWave/examples/spade/counter
```

## Step 2: Build and Simulate

```bash
make
```

The example compiles the design, runs the simulation, and produces `counter.vcd`.

## Step 3: Open the Waveform

```bash
novywave counter.vcd
```

## Step 4: Inspect the Results

Check:

- the counter output progression,
- the effect of reset,
- expected state transitions over time.

## Troubleshooting

### `spade` Command Missing

Install it with:

```bash
cargo install spade-lang
```

### `iverilog` Missing

Install Icarus Verilog and rerun the example.
