---
title: Amaranth Counter
description: Generate a VCD waveform from an Amaranth design and view it in NovyWave
---

This tutorial walks you through building an 8-bit counter in [Amaranth HDL](https://amaranth-lang.org/), simulating it with Amaranth's built-in simulator, and exploring the resulting waveform in NovyWave. Amaranth is a hardware description language embedded in Python. You write your hardware designs as regular Python classes, and Amaranth compiles them to Verilog for synthesis or simulates them directly — no external simulator needed.

This tutorial works on Linux, macOS, and Windows — Amaranth is pure Python with no platform-specific dependencies.

## Prerequisites

- [Python 3.8+](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/) (Python package manager)
- NovyWave installed ([Installation Guide](/getting-started/installation/))

### Installing Python

**Ubuntu/Debian (usually pre-installed):**
```bash
sudo apt install python3 python3-pip python3-venv
```

**macOS:**
```bash
brew install python3
```

Verify with:
```bash
python3 --version
```

### Installing Amaranth

The recommended approach is to use a virtual environment, which keeps Amaranth and its dependencies isolated from the rest of your system:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install amaranth
```

Alternatively, install system-wide:
```bash
pip3 install amaranth
```

## Step 1: Create the Counter Design

Create a file called `counter.py`. The entire design, testbench, and simulation runner live in this single file -- one of Amaranth's strengths is that no separate build system or simulator is required.

```python
#!/usr/bin/env python3
"""
Amaranth HDL Counter Example

An 8-bit counter with enable and overflow detection,
demonstrating waveform generation for NovyWave.
"""

from amaranth import *
from amaranth.sim import Simulator, Tick


class Counter(Elaboratable):
    """8-bit counter with enable and overflow detection."""

    def __init__(self):
        # Ports
        self.enable = Signal(name="enable")
        self.count = Signal(8, name="count")
        self.overflow = Signal(name="overflow")

    def elaborate(self, platform):
        m = Module()

        # Counter logic
        with m.If(self.enable):
            m.d.sync += self.count.eq(self.count + 1)

        # Overflow detection (count about to wrap from 255 to 0)
        with m.If(self.enable & (self.count == 255)):
            m.d.sync += self.overflow.eq(1)
        with m.Else():
            m.d.sync += self.overflow.eq(0)

        return m
```

Here is what each part does:

- **`class Counter(Elaboratable)`** -- Every Amaranth hardware module implements `Elaboratable`. This is the base class that tells Amaranth your class can be converted into hardware.
- **`Signal(8, name="count")`** -- Declares an 8-bit hardware signal. The `name` parameter sets the signal name in the generated VCD file, making waveform inspection easier.
- **`m.d.sync +=`** -- Assigns to the synchronous (clocked) domain. This means the assignment takes effect on the next rising clock edge, just like a `<=` assignment inside `always @(posedge clk)` in Verilog.
- **`with m.If(...)`** -- Conditional hardware logic. Unlike a Python `if` statement (which runs at elaboration time), `m.If` creates a multiplexer in the generated hardware.
- **`self.count.eq(self.count + 1)`** -- The `.eq()` method creates a hardware assignment expression. Amaranth overloads `+` for hardware addition, but uses `.eq()` instead of `=` because Python's assignment operator cannot be overloaded.

## Step 2: Write the Testbench

Add the simulation function to the same `counter.py` file, after the `Counter` class:

```python
def simulate():
    """Run simulation and generate VCD waveform file."""
    dut = Counter()

    def testbench():
        # Initialize
        yield dut.enable.eq(0)
        for _ in range(5):
            yield Tick()

        # Test 1: Enable counting
        print("Test 1: Enable counting")
        yield dut.enable.eq(1)
        for _ in range(20):
            yield Tick()

        # Test 2: Disable counting
        print("Test 2: Disable counting")
        yield dut.enable.eq(0)
        for _ in range(5):
            yield Tick()

        # Test 3: Resume counting
        print("Test 3: Resume counting")
        yield dut.enable.eq(1)
        for _ in range(10):
            yield Tick()

        # Test 4: Count to overflow
        print("Test 4: Counting to overflow")
        cycles = 0
        while cycles < 300:
            yield Tick()
            cycles += 1
            overflow = yield dut.overflow
            if overflow:
                print(f"  Overflow detected at cycle {cycles}")
                break

        # Continue a bit after overflow
        for _ in range(10):
            yield Tick()

        print("Simulation complete!")

    # Create simulator
    sim = Simulator(dut)
    sim.add_clock(1e-8)  # 100 MHz clock (10ns period)
    sim.add_testbench(testbench)

    # Run simulation with VCD output
    with sim.write_vcd("counter.vcd", gtkw_file="counter.gtkw"):
        sim.run()

    print(f"\nVCD file generated: counter.vcd")
    print("Open in NovyWave: novywave counter.vcd")


if __name__ == "__main__":
    simulate()
```

The testbench uses Amaranth's generator-based simulation API:

- **`yield dut.enable.eq(1)`** -- Drives a value onto a signal. The `yield` keyword pauses the testbench until the simulator processes the assignment.
- **`yield Tick()`** -- Advances the simulation by one clock cycle.
- **`overflow = yield dut.overflow`** -- Reads the current value of a signal from the simulation.
- **`sim.add_clock(1e-8)`** -- Creates a 100 MHz clock (10ns period). Amaranth specifies clock periods in seconds.
- **`sim.add_testbench(testbench)`** -- Registers the generator function as the test stimulus.
- **`sim.write_vcd("counter.vcd")`** -- Wraps the simulation run in a context manager that writes all signal transitions to a VCD file. The optional `gtkw_file` argument also saves a GTKWave configuration file, but NovyWave reads the VCD directly.

The test exercises four scenarios: enabling the counter from zero, pausing it, resuming from the paused value, and running until the 8-bit value overflows from 255 back to 0.

## Step 3: Run the Simulation

```bash
python3 counter.py
```

You should see output like this:

```
Test 1: Enable counting
Test 2: Disable counting
Test 3: Resume counting
Test 4: Counting to overflow
  Overflow detected at cycle 226
Simulation complete!

VCD file generated: counter.vcd
Open in NovyWave: novywave counter.vcd
```

The simulation runs entirely in Python -- no external tools like Verilator or Icarus Verilog are needed.

If you are using a virtual environment and want to automate the process, you can create a `Makefile`:

```makefile
PYTHON := python3

.PHONY: all sim setup clean

all: sim

sim:
	$(PYTHON) counter.py

setup:
	python3 -m venv .venv
	.venv/bin/pip install amaranth

clean:
	rm -f counter.vcd counter.gtkw
```

Then run:

```bash
make setup   # First time only
make         # Generate waveform
```

## Step 4: Open the Waveform in NovyWave

Launch NovyWave with the generated VCD file:

```bash
novywave counter.vcd
```

Or open NovyWave and load the file through the UI:

1. Open NovyWave
2. Click **Load Files**
3. Select `counter.vcd`
4. Click **Load**

The file appears in Files & Scopes with this hierarchy:

```
counter.vcd
  └── bench
      └── top
```

Amaranth wraps your design in a `bench` (benchmark) scope with a `top` module inside it.

## Step 5: Explore the Waveform

### Add signals to the viewer

1. Click the checkbox next to **top** to select the scope
2. In the Variables panel, click on these signals to add them to the waveform viewer:
   - `clk` -- the 100 MHz clock
   - `rst` -- the synchronous reset (Amaranth generates this automatically)
   - `enable` -- the enable input
   - `count` -- the 8-bit counter output
   - `overflow` -- the overflow flag

### Navigate the waveform

1. Press **R** to fit the entire simulation into view
2. Press **W** to zoom in around the beginning of the trace. You will see `rst` asserted for the first clock cycle -- Amaranth's simulator automatically applies a one-cycle reset at the start
3. Look for the point where `enable` goes high. From that moment, `count` increments by 1 on each rising clock edge
4. Use **Shift+E** to jump forward between transitions on the selected signal

### Observe the key behaviors

- **Reset phase**: Amaranth holds `rst` high for the first clock cycle to initialize all synchronous signals. After `rst` deasserts, the design begins normal operation
- **Counting**: Once `enable` goes high, the `count` signal increments on every rising clock edge. Change the `count` format to **UInt** to see decimal values climbing 0, 1, 2, 3, ...
- **Pause and resume**: When `enable` drops low, `count` holds its current value. Notice that the signal stays perfectly flat during the 5 paused clock cycles. When `enable` returns high, counting resumes from the paused value
- **Overflow**: When `count` reaches 255 and `enable` is still high, `overflow` pulses high for one clock cycle as the counter wraps back to 0. After the wrap, `overflow` returns low

### Compare with Verilog

Amaranth's signal naming is clean and direct -- the VCD file uses the `name` parameters you provided in the `Signal()` constructors. This is different from some other HDLs where signal names can be mangled in the output.

## Amaranth Tips

### Generating Verilog RTL

You can generate synthesizable Verilog from the same Amaranth design:

```python
from amaranth.back import verilog

dut = Counter()
output = verilog.convert(dut, ports=[dut.enable, dut.count, dut.overflow])

with open("counter.v", "w") as f:
    f.write(output)
```

This creates a `counter.v` file you can feed to any Verilog synthesis tool.

### Using combinational logic

In this example, all assignments use `m.d.sync` (synchronous / clocked). Amaranth also supports combinational logic:

```python
# Combinational assignment (no clock delay)
m.d.comb += self.some_output.eq(self.some_input & self.another_input)
```

Use `m.d.comb` for logic that should update immediately when inputs change, without waiting for a clock edge.

## Next Steps

- Try modifying the counter width by changing `Signal(8)` to `Signal(16)` for a 16-bit counter
- Add a direction output that toggles each time the counter overflows
- Compare multiple simulation runs using the [multi-file tutorial](/tutorials/multi-file/)
- Explore the complete example project in [examples/amaranth/counter/](https://github.com/NovyWave/NovyWave/tree/main/examples/amaranth/counter)

## Troubleshooting

### `ModuleNotFoundError: No module named 'amaranth'`

Install Amaranth into the Python interpreter that runs the script:

```bash
pip3 install amaranth
```

If you are using a virtual environment, make sure it is activated:

```bash
source .venv/bin/activate
pip install amaranth
```

### Unsupported Python version

Amaranth requires Python 3.8 or later. Check your version:

```bash
python3 --version
```

If your system Python is too old, consider using [pyenv](https://github.com/pyenv/pyenv) to install a newer version.

### Empty or missing VCD file

Make sure you are running the simulation inside the `sim.write_vcd()` context manager. If the `with` block is missing or the simulation exits early due to an exception, the VCD file may be empty or not created at all.

### Large VCD files

For bigger designs with many signals, VCD files can grow quickly. Consider limiting the simulation duration or reducing the number of clock cycles in your testbench. Amaranth does not currently support FST output directly, but you can convert VCD to FST using external tools if needed.
