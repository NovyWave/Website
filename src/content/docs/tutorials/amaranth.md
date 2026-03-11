---
title: Amaranth Counter
description: Generate a VCD waveform from an Amaranth design and view it in NovyWave
---

This tutorial uses the Amaranth counter example from the NovyWave repository.

## Prerequisites

- Python 3.8 or newer
- `amaranth` installed in your current Python environment
- a local checkout of `~/repos/NovyWave/examples/amaranth/counter`

## Step 1: Enter the Example

```bash
cd ~/repos/NovyWave/examples/amaranth/counter
```

## Step 2: Install the Python Dependency

```bash
pip install amaranth
```

If you prefer isolation, create and activate a virtual environment first.

## Step 3: Generate the Waveform

```bash
make
```

The example produces `counter.vcd`.

## Step 4: Open It in NovyWave

```bash
novywave counter.vcd
```

## What to Inspect

- the clock and reset relationship,
- the counter increment behavior,
- the enable gating behavior,
- any expected wraparound event.

## Troubleshooting

### `ModuleNotFoundError: No module named 'amaranth'`

Install the package into the interpreter that runs the example.

### Unsupported Python Version

Use a Python version supported by the example and reinstall dependencies in that environment.
