---
title: Spade Counter
description: Build a Spade counter, test with cocotb, and inspect the waveform in NovyWave
---

This tutorial walks you through building an 8-bit counter in [Spade](https://spade-lang.org/) and testing it with [cocotb](https://www.cocotb.org/) via Spade's `swim` build tool. Spade is a hardware description language inspired by Rust that brings strong typing, pattern matching, and functional programming features to digital design.

Spade does not include its own simulator. Instead, the `swim` build tool runs tests using cocotb (Python) or Verilator (C++), which simulate the generated Verilog and produce waveform files you can view in NovyWave.

This tutorial works on Linux and macOS. On Windows, swim does not have native support — use WSL (Windows Subsystem for Linux) instead.

## Prerequisites

- [Rust toolchain](https://rustup.rs/) (to install swim and the Spade compiler)
- [Python 3](https://www.python.org/) (for cocotb tests)
- [Icarus Verilog](https://github.com/steveicarus/iverilog) (cocotb simulator backend)
- NovyWave installed ([Installation Guide](/getting-started/installation/))

You can also get Icarus Verilog through the [OSS CAD Suite](https://github.com/YosysHQ/oss-cad-suite-build).

### Installing swim

swim is Spade's build tool. Install it with Cargo and then let it set up its dependencies:

```bash
cargo install --git https://gitlab.com/spade-lang/swim
swim install-tools
```

### Installing Icarus Verilog

**Ubuntu/Debian:**
```bash
sudo apt install iverilog
```

**macOS:**
```bash
brew install icarus-verilog
```

## Step 1: Create a Swim Project

```bash
swim init counter
cd counter
```

This creates a project with `swim.toml`, a `src/` directory for Spade code, and a `test/` directory for tests.

## Step 2: Write the Counter Design

Replace `src/main.spade` with:

```spade
// 8-bit Counter with enable and overflow detection

entity counter(clk: clock, rst: bool, enable: bool) -> (uint<8>, bool) {
    reg(clk) count: uint<8> reset(rst: 0) = if enable {
        trunc(count + 1)
    } else {
        count
    };

    let overflow = enable && (count == 255);

    (count, overflow)
}
```

Here is what each part does:

- **`entity counter(...) -> (uint<8>, bool)`** — declares a hardware entity with typed inputs and a tuple return (counter value + overflow flag).
- **`reg(clk) count: uint<8> reset(rst: 0)`** — an 8-bit register clocked by `clk`, reset to 0 when `rst` is high. The `= if enable { ... }` defines the next-state logic inline.
- **`trunc(count + 1)`** — Spade requires explicit truncation. Adding 1 to `uint<8>` produces `uint<9>`, and the compiler rejects silent overflow. You must `trunc()` it back to 8 bits.
- **`let overflow = ...`** — combinational logic (a wire, not a register).
- **`(count, overflow)`** — the return value, packed into a single Verilog bus.

## Step 3: Write a Cocotb Test

Create `test/counter_test.py`:

```python
# top = counter

import cocotb
from cocotb.clock import Clock
from cocotb.triggers import FallingEdge

@cocotb.test()
async def test_counter(dut):
    """Test 8-bit counter with enable and overflow detection."""
    clk = dut.clk_i
    await cocotb.start(Clock(clk, period=10, units='ns').start())

    # Reset
    dut.rst_i.value = 1
    dut.enable_i.value = 0
    await FallingEdge(clk)
    await FallingEdge(clk)

    # Release reset, enable counting
    dut.rst_i.value = 0
    await FallingEdge(clk)
    dut.enable_i.value = 1

    # Count for 20 cycles
    for _ in range(20):
        await FallingEdge(clk)

    # Pause counting
    dut.enable_i.value = 0
    for _ in range(5):
        await FallingEdge(clk)

    # Resume counting to overflow
    dut.enable_i.value = 1
    for _ in range(250):
        await FallingEdge(clk)

    for _ in range(5):
        await FallingEdge(clk)
```

Key points about the test:

- **`# top = counter`** — tells swim which Spade entity to simulate.
- **`dut.clk_i`, `dut.rst_i`, `dut.enable_i`** — swim appends `_i` to input port names in the generated Verilog.
- **`await FallingEdge(clk)`** — advances the simulation by one clock cycle.
- **`dut.rst_i.value = 1`** — drives a value onto a signal.

## Step 4: Run the Test

```bash
swim test
```

You should see output like:

```
[INFO] Running test/counter_test.py [test_counter]
[INFO] test/counter_test.py [test_counter]: PASSED

ok   test/counter_test.py 0/1 failed
 🭼 test_counter ok [build/counter_test_test_counter/counter_test.fst]
```

swim automatically generates a waveform file (FST format) at the path shown in the output.

## Step 5: Open the Waveform in NovyWave

```bash
novywave build/counter_test_test_counter/counter_test.fst
```

Or open NovyWave, click **Load Files**, and navigate to the FST file.

## Step 6: Explore the Waveform

1. Expand the scope tree to find the counter signals
2. Add `clk_i`, `rst_i`, `enable_i`, and the output signals to the viewer
3. Press **R** to fit the full simulation into view
4. Press **W** to zoom into the reset phase at the beginning
5. Use **Shift+E** to jump between transitions
6. Change the count format to **UInt** to see decimal values climbing 0, 1, 2, 3, ...

### What to look for

- **Reset**: `rst_i` is high for 2 cycles, holding the counter at 0
- **Counting**: After reset, `enable_i` goes high and the count increments each clock edge
- **Pause**: When `enable_i` drops, the count holds steady
- **Overflow**: When the count reaches 255, the overflow flag pulses high as the counter wraps to 0

## Spade Language Highlights

### Strong typing prevents bugs

Spade enforces bit widths at compile time. If you try to assign a 9-bit value to an 8-bit signal without `trunc()`, the compiler rejects it — catching a whole class of bugs that are silent in Verilog.

### Functional register definitions

Unlike Verilog's procedural `always` blocks, Spade defines register behavior as expressions:

```spade
reg(clk) state: uint<4> reset(rst: 0) = if condition {
    new_value
} else {
    state  // Hold current value
};
```

### Pattern matching

Spade supports pattern matching for state machines:

```spade
reg(clk) state: State reset(rst: State::Idle) = match state {
    State::Idle => if start { State::Running } else { State::Idle },
    State::Running => if done { State::Idle } else { State::Running },
};
```

## Next Steps

- Try adding a second output that counts the number of overflows
- Explore the [Spade documentation](https://docs.spade-lang.org/) for more language features
- Compare multiple simulation runs using the [multi-file tutorial](/tutorials/multi-file/)

## Troubleshooting

### `swim` command not found

Install it with Cargo:

```bash
cargo install --git https://gitlab.com/spade-lang/swim
swim install-tools
```

### cocotb test fails to start

Make sure Python 3 and Icarus Verilog are installed. swim uses cocotb with Icarus as the simulation backend.

### Signal names look mangled

Spade generates Verilog with mangled names by default. The `# top = counter` comment in the test file tells swim which entity to simulate, and cocotb exposes the ports with `_i` / `_o` suffixes.
