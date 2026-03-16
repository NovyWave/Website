---
title: Spade Counter
description: Compile a Spade example, simulate it, and inspect the generated waveform
---

This tutorial walks you through building an 8-bit counter in [Spade](https://spade-lang.org/), simulating it with Icarus Verilog, and exploring the resulting waveform in NovyWave. Spade is a hardware description language inspired by Rust that brings strong typing, pattern matching, and functional programming features to digital design. It compiles to Verilog, so you can use any Verilog-compatible simulator and synthesis tool with your Spade designs.

## Prerequisites

- [Rust toolchain](https://rustup.rs/) (to install the Spade compiler)
- [Spade compiler](https://spade-lang.org/)
- [Icarus Verilog](http://iverilog.icarus.com/) (for simulation)
- NovyWave installed ([Installation Guide](/getting-started/installation/))

### Installing the Rust Toolchain

If you do not already have Rust installed:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

### Installing Spade

Spade is distributed through Cargo, Rust's package manager:

```bash
cargo install spade-lang
```

Verify with:
```bash
spade --version
```

### Installing Icarus Verilog

**Ubuntu/Debian:**
```bash
sudo apt install iverilog
```

**Fedora:**
```bash
sudo dnf install iverilog
```

**macOS:**
```bash
brew install icarus-verilog
```

Verify with:
```bash
iverilog -V
```

## Step 1: Write the Counter Design

Create a file called `counter.spade`:

```spade
// 8-bit Counter in Spade HDL
// Demonstrates waveform generation for NovyWave

// Counter entity with enable control and overflow detection
entity counter(clk: clock, rst: bool, enable: bool) -> (uint<8>, bool) {
    // 8-bit counter register with synchronous reset
    reg(clk) count: uint<8> reset(rst: 0) = if enable {
        trunc(count + 1)
    } else {
        count
    };

    // Overflow detection (true when count is about to wrap from 255 to 0)
    let overflow = enable && (count == 255);

    (count, overflow)
}

// Top-level module with explicit output ports for testbench
#[no_mangle]
entity top(
    #[no_mangle] clk: clock,
    #[no_mangle] rst: bool,
    #[no_mangle] enable: bool
) -> (uint<8>, bool) {
    inst counter(clk, rst, enable)
}
```

Spade's syntax is compact but expressive. Here is what each part does:

- **`entity counter(...) -> (uint<8>, bool)`** -- Declares a hardware entity (module) with its inputs and return type. Unlike Verilog or VHDL, Spade entities return their outputs as a tuple rather than declaring separate output ports.
- **`reg(clk) count: uint<8> reset(rst: 0)`** -- Declares an 8-bit register clocked by `clk` with a synchronous reset that sets the value to 0 when `rst` is high. The `= if enable { ... } else { ... }` part defines the register's next-state logic inline.
- **`trunc(count + 1)`** -- Spade does not allow implicit truncation. When you add 1 to a `uint<8>`, the result is `uint<9>` (to avoid silent overflow). You must explicitly `trunc()` it back to 8 bits. This catches a whole class of bugs that are easy to miss in Verilog.
- **`let overflow = enable && (count == 255)`** -- Combinational logic. The `let` binding creates a wire, not a register. This signal is high for exactly one clock cycle when the counter is about to wrap.
- **`(count, overflow)`** -- The return value of the entity. Spade packs tuple outputs into a single Verilog bus.
- **`#[no_mangle]`** -- By default, Spade mangles signal names in the generated Verilog. The `#[no_mangle]` attribute preserves the original names, which makes the waveform easier to read in NovyWave.
- **`inst counter(clk, rst, enable)`** -- Instantiates the `counter` entity inside `top`. The `inst` keyword is Spade's equivalent of Verilog module instantiation.

The `top` entity wraps `counter` with `#[no_mangle]` annotations so that the Verilog testbench can connect to ports with predictable names.

## Step 2: Write the Verilog Testbench

Because Spade compiles to Verilog, you write the testbench in Verilog to drive the simulation and generate the VCD file. Create `counter_tb.v`:

```verilog
// Testbench for Spade-generated counter
// Uses Icarus Verilog for simulation and VCD generation

`timescale 1ns/1ps

module counter_tb;
    // Signals
    reg clk;
    reg rst;
    reg enable;
    wire [8:0] output_packed;

    // Extract count and overflow from packed output
    // Spade packs (uint<8>, bool) as {overflow[8], count[7:0]}
    wire [7:0] count;
    wire overflow;
    assign count = output_packed[7:0];
    assign overflow = output_packed[8];

    // Instantiate Spade-generated counter
    top dut (
        .clk(clk),
        .rst(rst),
        .enable(enable),
        .output__(output_packed)
    );

    // Clock generation: 100 MHz (10ns period)
    initial begin
        clk = 0;
        forever #5 clk = ~clk;
    end

    // VCD dump for NovyWave
    initial begin
        $dumpfile("counter.vcd");
        $dumpvars(0, counter_tb);
    end

    // Test sequence
    initial begin
        // Initialize
        rst = 1;
        enable = 0;
        #100;  // Wait 100ns

        // Release reset
        rst = 0;
        #50;

        // Test 1: Enable counting
        $display("Test 1: Enable counting");
        enable = 1;
        #200;

        // Test 2: Disable counting
        $display("Test 2: Disable counting");
        enable = 0;
        #50;

        // Test 3: Resume counting
        $display("Test 3: Resume counting");
        enable = 1;
        #100;

        // Test 4: Count to overflow
        $display("Test 4: Counting to overflow");
        // Continue until overflow
        wait(overflow);
        $display("  Overflow detected!");
        #100;

        // Test 5: Reset during operation
        $display("Test 5: Reset during operation");
        rst = 1;
        #30;
        rst = 0;
        #100;

        $display("Simulation complete!");
        $finish;
    end

    // Timeout watchdog
    initial begin
        #50000;
        $display("Timeout reached");
        $finish;
    end
endmodule
```

A few things to notice about interfacing with Spade-generated Verilog:

- **`wire [8:0] output_packed`** -- Spade packs the return tuple `(uint<8>, bool)` into a single 9-bit bus. The count occupies bits `[7:0]` and the overflow flag sits at bit `[8]`. The testbench unpacks these into separate `count` and `overflow` wires for readability.
- **`.output__(output_packed)`** -- Spade names the output port `output__` (with double underscore) in the generated Verilog. This is a Spade convention.
- **`$dumpvars(0, counter_tb)`** -- Dumps all signals in the testbench and all instantiated modules, including the Spade-generated internals.
- **`wait(overflow)`** -- Blocks the test until the overflow signal goes high, letting the simulation run exactly as long as needed to see the counter wrap.
- **Timeout watchdog** -- A separate `initial` block terminates the simulation after 50,000ns to prevent runaway tests.

## Step 3: Compile and Run the Simulation

The build process has three stages: compile Spade to Verilog, compile the Verilog with Icarus, and run the simulation.

### Compile Spade to Verilog

```bash
spade counter.spade -o counter_gen.v
```

This produces `counter_gen.v`, which contains the synthesizable Verilog generated from your Spade design. You can open this file to see how Spade's constructs map to Verilog.

### Compile with Icarus Verilog

```bash
iverilog -g2012 -o counter_sim counter_gen.v counter_tb.v
```

The `-g2012` flag enables SystemVerilog features that the Spade-generated code may use.

### Run the simulation

```bash
vvp counter_sim
```

You should see output like this:

```
Test 1: Enable counting
Test 2: Disable counting
Test 3: Resume counting
Test 4: Counting to overflow
  Overflow detected!
Test 5: Reset during operation
Simulation complete!
```

The simulation creates `counter.vcd` in the current directory.

### Using a Makefile

To automate all three steps, create a `Makefile`:

```makefile
SPADE = spade
IVERILOG = iverilog
VVP = vvp

.PHONY: all sim clean

all: sim

counter_gen.v: counter.spade
	$(SPADE) counter.spade -o counter_gen.v

sim: counter_gen.v counter_tb.v
	$(IVERILOG) -g2012 -o counter_sim counter_gen.v counter_tb.v
	$(VVP) counter_sim

clean:
	rm -f counter_gen.v counter_sim counter.vcd
```

Then simply run:

```bash
make
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
  └── counter_tb
      └── dut
          └── counter_0
```

The `dut` scope corresponds to the `top` entity and `counter_0` is the instantiated `counter` entity inside it.

## Step 5: Explore the Waveform

### Add signals to the viewer

1. Click the checkbox next to **counter_tb** to select the top-level scope
2. In the Variables panel, click on these signals to add them to the waveform viewer:
   - `clk` -- the 100 MHz clock
   - `rst` -- the synchronous reset
   - `enable` -- the enable input
   - `count[7:0]` -- the unpacked 8-bit counter value
   - `overflow` -- the unpacked overflow flag

You can also expand the **dut** and **counter_0** scopes to see the internal signals from the Spade-generated Verilog, including the packed `output__` bus.

### Navigate the waveform

1. Press **R** to fit the entire simulation into view. You will see the full timeline from the initial reset through all five test phases
2. Press **W** to zoom in around 100ns where `rst` deasserts
3. Scroll or pan right to watch `count` begin incrementing at 150ns when `enable` goes high
4. Use **Shift+E** to jump between transitions on the selected signal

### Observe the key behaviors

- **Reset phase (0-100ns)**: `rst` is held high for 100ns. During this time, the counter register stays at 0 regardless of the `enable` signal
- **Enable counting (150-350ns)**: After `rst` deasserts at 100ns and `enable` goes high at 150ns, the counter begins incrementing on each rising clock edge. Change `count` format to **UInt** to see decimal values: 0, 1, 2, 3, ...
- **Pause (350-400ns)**: When `enable` drops low, `count` freezes at its current value. The signal stays flat for 5 clock cycles
- **Resume (400-500ns)**: Counting resumes from the paused value when `enable` returns high
- **Overflow**: The counter runs until `count` reaches 255, at which point `overflow` pulses high. On the next clock edge, `count` wraps back to 0 and `overflow` returns low
- **Reset during operation**: Near the end of the trace, `rst` goes high again while the counter is running, immediately resetting `count` to 0

### Understanding the packed output

Expand the **dut** scope and add `output__[8:0]` to the viewer. This is the raw packed output from the Spade module. Bit 8 is the overflow flag and bits 7 through 0 are the count value. Comparing `output__` with the unpacked `count` and `overflow` signals helps you understand how Spade's tuple packing works at the Verilog level.

## Spade Language Highlights

### Strong typing prevents bugs

Spade enforces bit widths at compile time. If you try to assign a 9-bit value to an 8-bit signal without `trunc()`, the compiler rejects it:

```spade
// This would fail to compile:
// reg(clk) count: uint<8> = count + 1;
//                                    ^ uint<9> cannot be assigned to uint<8>

// You must explicitly truncate:
reg(clk) count: uint<8> = trunc(count + 1);
```

### Functional register definitions

Unlike Verilog's procedural `always` blocks, Spade defines register behavior as expressions:

```spade
reg(clk) state: uint<4> reset(rst: 0) = if condition {
    new_value
} else {
    state  // Hold current value
};
```

The right-hand side is the next-state logic. The register updates to this value on each clock edge.

### Pattern matching

While not used in this counter example, Spade supports pattern matching for state machines:

```spade
reg(clk) state: State reset(rst: State::Idle) = match state {
    State::Idle => if start { State::Running } else { State::Idle },
    State::Running => if done { State::Idle } else { State::Running },
};
```

## Next Steps

- Try adding a second output that counts the number of overflows
- Experiment with pattern matching by turning the counter into a simple state machine
- Compare multiple simulation runs using the [multi-file tutorial](/tutorials/multi-file/)
- Explore the complete example project in [examples/spade/counter/](https://github.com/NovyWave/NovyWave/tree/main/examples/spade/counter)

## Troubleshooting

### `spade` command not found

Install it with Cargo:

```bash
cargo install spade-lang
```

Make sure `~/.cargo/bin` is on your `PATH`:

```bash
export PATH="$HOME/.cargo/bin:$PATH"
```

### `iverilog` not found

Install Icarus Verilog for your platform following the instructions above.

### Compilation errors with `-g2012`

The Spade-generated Verilog may use SystemVerilog features. If your version of Icarus Verilog does not support `-g2012`, try updating to a newer version.

### Signal names are mangled

If you see cryptic signal names in the VCD file, make sure your top-level entity and its ports use the `#[no_mangle]` attribute:

```spade
#[no_mangle]
entity top(
    #[no_mangle] clk: clock,
    #[no_mangle] rst: bool,
    #[no_mangle] enable: bool
) -> (uint<8>, bool) { ... }
```

Without `#[no_mangle]`, Spade applies name mangling to avoid collisions, which makes the VCD harder to read.

### Understanding the packed output bus

Spade represents tuple return types as a single packed bus in the generated Verilog. The testbench extracts individual fields:

```verilog
wire [7:0] count;
wire overflow;
assign count = output_packed[7:0];
assign overflow = output_packed[8];
```

If your design returns a more complex tuple, you will need to calculate the bit positions based on the type widths.
