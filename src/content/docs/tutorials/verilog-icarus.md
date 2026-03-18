---
title: Verilog with Icarus
description: Generate and view Verilog waveforms using Icarus Verilog and NovyWave
---

This tutorial shows how to generate waveforms from Verilog using [Icarus Verilog](https://github.com/steveicarus/iverilog) and view them in NovyWave. Icarus Verilog is an open-source Verilog simulator — it compiles your design into an intermediate form, then interprets it to produce simulation output including VCD waveform files.

## Prerequisites

- [Icarus Verilog](https://github.com/steveicarus/iverilog) installed
- NovyWave installed ([Installation Guide](/getting-started/installation/))

You can also install all the open-source HDL tools at once with the [OSS CAD Suite](https://github.com/YosysHQ/oss-cad-suite-build), which bundles Icarus Verilog, GHDL, Yosys, and many other tools for Linux, macOS, and Windows.

### Installing Icarus Verilog

**Ubuntu/Debian:**
```bash
sudo apt-get install iverilog
```

**macOS:**
```bash
brew install icarus-verilog
```

**Windows:**
Download a prebuilt installer from the [Icarus Verilog releases](https://github.com/steveicarus/iverilog/releases).

## Step 1: Create a Simple Design

Create `counter.v` — an 8-bit counter with enable and overflow detection:

```verilog
module counter (
    input  wire       clk,
    input  wire       reset,
    input  wire       enable,
    output reg  [7:0] count,
    output reg        overflow
);

    always @(posedge clk or posedge reset) begin
        if (reset) begin
            count <= 8'b0;
            overflow <= 1'b0;
        end else if (enable) begin
            if (count == 8'hFF) begin
                count <= 8'b0;
                overflow <= 1'b1;
            end else begin
                count <= count + 1'b1;
                overflow <= 1'b0;
            end
        end
    end

endmodule
```

## Step 2: Create a Testbench

Create `counter_tb.v`:

```verilog
`timescale 1ns/1ps

module counter_tb;
    parameter CLK_PERIOD = 10;

    reg        clk;
    reg        reset;
    reg        enable;
    wire [7:0] count;
    wire       overflow;

    counter uut (
        .clk(clk),
        .reset(reset),
        .enable(enable),
        .count(count),
        .overflow(overflow)
    );

    // Clock generation
    initial begin
        clk = 0;
        forever #(CLK_PERIOD/2) clk = ~clk;
    end

    // VCD dump for waveform viewing
    initial begin
        $dumpfile("counter.vcd");
        $dumpvars(0, counter_tb);
    end

    // Stimulus
    initial begin
        // Initial reset
        reset = 1;
        enable = 0;
        #50;

        // Release reset, enable counting
        reset = 0;
        enable = 1;
        #300;

        // Disable counting briefly
        enable = 0;
        #50;

        // Resume counting
        enable = 1;
        #200;

        // Apply reset while counting
        reset = 1;
        #30;
        reset = 0;
        #200;

        // Continue until overflow
        #3000;

        $finish;
    end

endmodule
```

## Step 3: Compile and Run

```bash
# Compile the design
iverilog -o counter_sim counter.v counter_tb.v

# Run simulation
vvp counter_sim
```

This creates `counter.vcd` with all signal transitions.

## Step 4: View in NovyWave

1. Open NovyWave
2. Click **Load Files**
3. Select `counter.vcd`
4. Click **Load**

The file appears in Files & Scopes:

```
counter.vcd (0-3830ns)
  └── counter_tb
      └── uut
```

## Step 5: Explore the Waveform

1. Click the checkbox next to `counter_tb`
2. In the Variables panel, click `clk`, `reset`, `enable`, `count`, and `overflow`
3. Press `R` for full view
4. Zoom in with `W` to see the reset release at 50ns
5. Use `Shift+E` to jump between counter transitions
6. Change `count` format to **UInt** to see decimal values

## Verilog Waveform Commands

### Basic Dump

```verilog
initial begin
    $dumpfile("output.vcd");
    $dumpvars(0, testbench_name);  // Dump all signals
end
```

### Selective Dump

```verilog
initial begin
    $dumpfile("output.vcd");
    $dumpvars(1, testbench_name);        // Only top level
    $dumpvars(0, testbench_name.dut);    // All signals in dut
end
```

### Dump Control

```verilog
initial begin
    $dumpfile("output.vcd");
    $dumpvars(0, testbench_name);

    #1000;
    $dumpoff;   // Stop dumping
    #500;
    $dumpon;    // Resume dumping
end
```

## Using FST Format (Verilator)

[Verilator](https://www.veripool.org/verilator/) is a different kind of simulator — it compiles your Verilog design into optimized C++ code, making it much faster than Icarus for large designs. It outputs FST files, which are 10-100x smaller and faster to load than VCD.

Verilator is available via `apt`, `brew`, or [OSS CAD Suite](https://github.com/YosysHQ/oss-cad-suite-build). On Windows, Verilator requires MSYS2 with a full MinGW build environment, which makes setup more involved — consider using WSL instead.

Example FST output setup:

```cpp
#include "verilated_fst_c.h"

int main() {
    Verilated::traceEverOn(true);

    VerilatedFstC* tfp = new VerilatedFstC;
    top->trace(tfp, 99);
    tfp->open("output.fst");

    // ... simulation loop ...

    tfp->close();
}
```

FST files are 10-100x smaller and faster to load in NovyWave.

## Next Steps

- Add assertions to your testbench
- Create parameterized tests
- Compare multiple test runs with the [multi-file tutorial](/tutorials/multi-file/)
- Explore the complete example project in [examples/verilog/counter/](https://github.com/NovyWave/NovyWave/tree/main/examples/verilog/counter)

## Troubleshooting

### No VCD file created
Ensure `$dumpfile` and `$dumpvars` are called before signals change. Check that the simulation runs to completion (look for `$finish`).

### Missing signals
Verify the module hierarchy in the `$dumpvars` call. Use depth 0 to dump all signals: `$dumpvars(0, top_module)`.

### Large VCD files
Use selective dumping with `$dumpvars(0, specific_module)`, use `$dumpoff/$dumpon` to skip uninteresting periods, or consider FST format with Verilator.
