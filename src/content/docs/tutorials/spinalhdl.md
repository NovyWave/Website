---
title: SpinalHDL with Verilator
description: Generate a VCD waveform from a SpinalHDL counter and inspect it in NovyWave
---

This tutorial walks you through building an 8-bit counter in [SpinalHDL](https://spinalhdl.github.io/SpinalDoc-RTD/), simulating it with Verilator, and exploring the resulting waveform in NovyWave. SpinalHDL is a hardware description language embedded in Scala that lets you write hardware designs using the full power of a modern programming language -- type safety, generics, and functional abstractions -- while generating clean Verilog or VHDL for synthesis and simulation.

## Prerequisites

- [Java 11+](https://adoptium.net/) (SpinalHDL runs on the JVM)
- [sbt](https://www.scala-sbt.org/) (Scala Build Tool)
- [Verilator](https://www.veripool.org/verilator/) (for simulation)
- NovyWave installed ([Installation Guide](/getting-started/installation/))

### Installing Java

**Ubuntu/Debian:**
```bash
sudo apt install openjdk-11-jdk
```

**macOS:**
```bash
brew install openjdk@11
```

Verify with:
```bash
java -version
```

### Installing sbt

**Ubuntu/Debian:**
```bash
echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | sudo tee /etc/apt/sources.list.d/sbt.list
curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | sudo apt-key add
sudo apt update
sudo apt install sbt
```

**macOS:**
```bash
brew install sbt
```

Verify with:
```bash
sbt --version
```

### Installing Verilator

**Ubuntu/Debian:**
```bash
sudo apt install verilator
```

**macOS:**
```bash
brew install verilator
```

Verify with:
```bash
verilator --version
```

## Step 1: Set Up the Project

Create a project directory with the following structure:

```
counter/
├── build.sbt
├── project/
│   └── build.properties
└── src/main/scala/counter/
    ├── Counter.scala
    └── CounterSim.scala
```

First, create `build.sbt` in the project root. This tells sbt which version of Scala and SpinalHDL to use:

```scala
ThisBuild / version := "1.0.0"
ThisBuild / scalaVersion := "2.12.18"

lazy val root = (project in file("."))
  .settings(
    name := "counter",
    libraryDependencies ++= Seq(
      "com.github.spinalhdl" %% "spinalhdl-core" % "1.10.2a",
      "com.github.spinalhdl" %% "spinalhdl-lib"  % "1.10.2a",
      compilerPlugin("com.github.spinalhdl" %% "spinalhdl-idsl-plugin" % "1.10.2a")
    )
  )

fork := true
```

The `spinalhdl-core` library provides the base HDL types and operators, `spinalhdl-lib` adds higher-level components, and the `spinalhdl-idsl-plugin` is a Scala compiler plugin that enables SpinalHDL's DSL syntax.

Next, create `project/build.properties`:

```
sbt.version=1.9.7
```

## Step 2: Write the Counter Design

Create `src/main/scala/counter/Counter.scala`:

```scala
package counter

import spinal.core._
import spinal.lib._

// 8-bit Counter with enable and overflow detection
case class Counter() extends Component {
  val io = new Bundle {
    val enable   = in  Bool()
    val count    = out UInt(8 bits)
    val overflow = out Bool()
  }

  // Internal counter register
  val counterReg = Reg(UInt(8 bits)) init(0)

  // Counter logic
  when(io.enable) {
    counterReg := counterReg + 1
  }

  // Overflow detection (counter about to wrap)
  val overflowReg = Reg(Bool()) init(False)
  when(io.enable && counterReg === 255) {
    overflowReg := True
  } otherwise {
    overflowReg := False
  }

  // Output assignments
  io.count    := counterReg
  io.overflow := overflowReg
}

// Generate Verilog RTL
object CounterVerilog extends App {
  SpinalConfig(
    targetDirectory = "rtl",
    defaultConfigForClockDomains = ClockDomainConfig(resetKind = SYNC)
  ).generateVerilog(Counter())
}

// Generate VHDL RTL
object CounterVhdl extends App {
  SpinalConfig(
    targetDirectory = "rtl",
    defaultConfigForClockDomains = ClockDomainConfig(resetKind = SYNC)
  ).generateVhdl(Counter())
}
```

Here is what each part does:

- **`case class Counter() extends Component`** -- In SpinalHDL, every hardware module extends `Component`. Using a case class gives you Scala's auto-generated `apply` method, which makes instantiation cleaner.
- **`io` bundle** -- The `Bundle` groups all ports. `in Bool()` and `out UInt(8 bits)` declare direction and type. SpinalHDL catches width mismatches at compile time.
- **`Reg(UInt(8 bits)) init(0)`** -- Declares an 8-bit register initialized to zero on reset. SpinalHDL automatically connects it to the clock domain.
- **`when` / `otherwise`** -- Conditional logic, equivalent to Verilog's `if`/`else` inside an `always` block.
- **`counterReg === 255`** -- The triple-equals `===` is SpinalHDL's hardware comparison operator (Scala's `==` is reserved for software comparison).

The `CounterVerilog` and `CounterVhdl` objects at the bottom are optional entry points that generate synthesizable RTL files, showing off SpinalHDL's ability to target both Verilog and VHDL from the same source.

## Step 3: Write the Simulation Testbench

Create `src/main/scala/counter/CounterSim.scala`:

```scala
package counter

import spinal.core._
import spinal.core.sim._

// Simulation that generates VCD waveform file
object CounterSim extends App {
  // Configure simulation with VCD output
  val simConfig = SimConfig
    .withWave                    // Enable waveform generation
    .withConfig(SpinalConfig(
      defaultConfigForClockDomains = ClockDomainConfig(resetKind = SYNC)
    ))

  simConfig.compile(Counter()).doSim { dut =>
    // Fork a clock generation process
    val clockPeriod = 10 // 10 time units = 100 MHz
    dut.clockDomain.forkStimulus(period = clockPeriod)

    // Initialize
    dut.io.enable #= false

    // Wait for reset
    dut.clockDomain.waitSampling(5)

    // Test 1: Enable counting
    println("Test 1: Enable counting")
    dut.io.enable #= true
    dut.clockDomain.waitSampling(20)

    // Test 2: Disable counting
    println("Test 2: Disable counting")
    dut.io.enable #= false
    dut.clockDomain.waitSampling(5)

    // Test 3: Resume counting
    println("Test 3: Resume counting")
    dut.io.enable #= true
    dut.clockDomain.waitSampling(10)

    // Test 4: Count to overflow (limited cycles for reasonable VCD size)
    println("Test 4: Counting to overflow")
    var cycles = 0
    var sawOverflow = false
    while (!sawOverflow && cycles < 260) {
      dut.clockDomain.waitSampling()
      cycles += 1
      if (dut.io.overflow.toBoolean) {
        sawOverflow = true
        println(s"  Overflow detected at cycle $cycles")
      }
    }

    // Continue a bit after overflow
    dut.clockDomain.waitSampling(5)

    println("Simulation complete!")
  }
}
```

The testbench uses SpinalHDL's simulation API, which runs on top of Verilator:

- **`SimConfig.withWave`** -- Tells the simulator to record all signal changes to a VCD file.
- **`dut.clockDomain.forkStimulus(period = clockPeriod)`** -- Spawns a background thread that toggles the clock. SpinalHDL also handles reset automatically at the start of simulation.
- **`#=`** -- The simulation assignment operator. It drives a value onto a signal (like `force` in Verilog).
- **`dut.clockDomain.waitSampling(n)`** -- Waits for `n` rising clock edges, keeping your test sequences cycle-accurate.
- **`dut.io.overflow.toBoolean`** -- Reads the current value of a signal from the simulation.

The test exercises four scenarios: enabling the counter, pausing it, resuming, and running until the 8-bit value wraps from 255 back to 0.

## Step 4: Build and Run the Simulation

Run the simulation with sbt:

```bash
sbt "runMain counter.CounterSim"
```

The first build takes several minutes because sbt downloads Scala, SpinalHDL, and Verilator dependencies. Subsequent runs are much faster.

When the simulation finishes, the VCD file is generated inside `simWorkspace/Counter/test/`. Copy it and fix the timescale for NovyWave:

```bash
cp simWorkspace/Counter/test/wave.vcd counter.vcd
sed -i 's/$timescale 1s/$timescale 1ns/' counter.vcd
```

You should see console output like this:

```
Test 1: Enable counting
Test 2: Disable counting
Test 3: Resume counting
Test 4: Counting to overflow
  Overflow detected at cycle 226
Simulation complete!
```

If you want to automate these steps, you can use a `Makefile`:

```makefile
.PHONY: all sim clean

all: sim

sim:
	sbt "runMain counter.CounterSim"
	@if [ -f simWorkspace/Counter/test/wave.vcd ]; then \
		cp simWorkspace/Counter/test/wave.vcd counter.vcd; \
		sed -i 's/$$timescale 1s/$$timescale 1ns/' counter.vcd; \
		echo "Copied to: counter.vcd (timescale fixed to 1ns)"; \
	fi

clean:
	rm -rf target project/target simWorkspace rtl
	rm -f counter.vcd
```

Then simply run:

```bash
make
```

## Step 5: Open the Waveform in NovyWave

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
  └── TOP
      └── Counter
```

## Step 6: Explore the Waveform

### Add signals to the viewer

1. Click the checkbox next to **TOP** or **Counter** to select the scope
2. In the Variables panel, you will see the signals available in the design. Click on these signals to add them to the waveform viewer:
   - `clk` -- the clock signal
   - `reset` -- the synchronous reset
   - `io_enable` -- the enable input
   - `io_count[7:0]` -- the 8-bit counter output
   - `io_overflow` -- the overflow flag
   - `counterReg[7:0]` -- the internal counter register
   - `overflowReg` -- the internal overflow register

### Navigate the waveform

1. Press **R** to fit the entire simulation into view
2. Press **W** to zoom in around the beginning of the trace. You should see `reset` held high for the first few clock cycles while SpinalHDL's automatic reset initializes the design
3. After reset deasserts, look for the point where `io_enable` goes high. From that moment, `counterReg` increments by 1 on each rising clock edge
4. Use **Shift+E** to jump between transitions on the selected signal

### Observe the key behaviors

- **Reset phase**: During the first 5 clock cycles, `reset` is high and `counterReg` stays at 0 regardless of `io_enable`
- **Counting**: Once `io_enable` is high and `reset` is low, the counter increments every clock cycle. Change `io_count` format to **UInt** to see decimal values climbing 0, 1, 2, 3, ...
- **Pause and resume**: When `io_enable` drops low, the counter holds its current value. When `io_enable` returns high, counting resumes from where it left off
- **Overflow**: When `counterReg` reaches 255 and `io_enable` is high, `overflowReg` pulses high for one clock cycle as the counter wraps back to 0

### Internal vs. external signals

Because SpinalHDL's Verilator simulation dumps all internal signals, you can compare `counterReg` (the internal register) with `io_count` (the output port). They carry the same value, but seeing both confirms that the output assignment works correctly.

## SpinalHDL Tips

### Generating RTL without simulation

If you just need synthesizable Verilog or VHDL (without running a simulation), use:

```bash
# Generate Verilog
sbt "runMain counter.CounterVerilog"

# Generate VHDL
sbt "runMain counter.CounterVhdl"
```

Generated files appear in the `rtl/` directory.

### Controlling waveform output

SpinalHDL's simulation API gives you several options:

```scala
// VCD output (default with .withWave)
SimConfig.withWave

// FST output (smaller files, also supported by NovyWave)
SimConfig.withFstWave
```

FST files are significantly smaller and faster to load in NovyWave for larger designs.

## Next Steps

- Try modifying the counter to count by 2 (change `counterReg + 1` to `counterReg + 2`)
- Add a configurable width parameter using Scala generics
- Compare multiple simulation runs using the [multi-file tutorial](/tutorials/multi-file/)
- Explore the complete example project in [examples/spinalhdl/counter/](https://github.com/NovyWave/NovyWave/tree/main/examples/spinalhdl/counter)

## Troubleshooting

### `sbt` not found

Install sbt following the instructions above for your platform. Make sure it is on your `PATH`.

### "java.lang.UnsupportedClassVersionError"

You need Java 11 or later. Check with `java -version` and install a newer JDK if needed.

### `verilator` not found

Install Verilator for simulation support. Without it, you can still generate RTL using the `CounterVerilog` or `CounterVhdl` entry points, but you cannot run the simulation.

### First build is slow

That is expected. SpinalHDL and Scala dependencies take time to resolve on the first run. Subsequent builds use cached dependencies and compile only changed files.

### Empty VCD file

Make sure `.withWave` is included in your `SimConfig`. Without it, the simulation runs but does not record signal transitions.

### Large VCD files

For bigger designs, switch to FST format with `.withFstWave` instead of `.withWave`. FST files are 10-100x smaller and load faster in NovyWave.
