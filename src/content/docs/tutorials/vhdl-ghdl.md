---
title: VHDL with GHDL
description: Generate and view VHDL waveforms using GHDL and NovyWave
---

This tutorial shows how to generate waveforms from VHDL using [GHDL](https://ghdl.github.io/ghdl/) and view them in NovyWave. GHDL is an open-source VHDL simulator that can produce GHW waveform files (its native format) or VCD files.

## Prerequisites

- [GHDL](https://ghdl.github.io/ghdl/) installed
- NovyWave installed ([Installation Guide](/getting-started/installation/))

You can also install all the open-source HDL tools at once with the [OSS CAD Suite](https://github.com/YosysHQ/oss-cad-suite-build), which bundles GHDL, Icarus Verilog, Yosys, and many other tools for Linux, macOS, and Windows.

### Installing GHDL

**Ubuntu/Debian:**
```bash
sudo apt-get install ghdl
```

**macOS:**
```bash
brew install ghdl
```

**Windows:**
Install via [MSYS2](https://www.msys2.org/): `pacman -S mingw-w64-x86_64-ghdl`, or use the OSS CAD Suite.

## Step 1: Create a Simple Design

Create `counter.vhd` — an 8-bit counter with enable and overflow detection:

```vhdl
library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

entity counter is
    port (
        clk      : in  std_logic;
        reset    : in  std_logic;
        enable   : in  std_logic;
        count    : out std_logic_vector(7 downto 0);
        overflow : out std_logic
    );
end entity counter;

architecture rtl of counter is
    signal count_reg : unsigned(7 downto 0) := (others => '0');
begin
    process(clk, reset)
    begin
        if reset = '1' then
            count_reg <= (others => '0');
            overflow <= '0';
        elsif rising_edge(clk) then
            if enable = '1' then
                if count_reg = 255 then
                    count_reg <= (others => '0');
                    overflow <= '1';
                else
                    count_reg <= count_reg + 1;
                    overflow <= '0';
                end if;
            end if;
        end if;
    end process;

    count <= std_logic_vector(count_reg);
end architecture rtl;
```

## Step 2: Create a Testbench

Create `counter_tb.vhd`:

```vhdl
library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

entity counter_tb is
end entity counter_tb;

architecture sim of counter_tb is
    constant CLK_PERIOD : time := 10 ns;

    signal clk      : std_logic := '0';
    signal reset    : std_logic := '0';
    signal enable   : std_logic := '0';
    signal count    : std_logic_vector(7 downto 0);
    signal overflow : std_logic;

    signal sim_done : boolean := false;
begin
    uut: entity work.counter
        port map (
            clk      => clk,
            reset    => reset,
            enable   => enable,
            count    => count,
            overflow => overflow
        );

    -- Clock generation
    clk_process: process
    begin
        while not sim_done loop
            clk <= '0';
            wait for CLK_PERIOD / 2;
            clk <= '1';
            wait for CLK_PERIOD / 2;
        end loop;
        wait;
    end process;

    -- Stimulus
    stimulus: process
    begin
        reset <= '1';
        enable <= '0';
        wait for 50 ns;

        reset <= '0';
        enable <= '1';
        wait for 300 ns;

        -- Disable counting briefly
        enable <= '0';
        wait for 50 ns;

        -- Resume counting
        enable <= '1';
        wait for 200 ns;

        -- Apply reset while counting
        reset <= '1';
        wait for 30 ns;
        reset <= '0';
        wait for 200 ns;

        -- Continue until overflow
        wait for 3000 ns;

        sim_done <= true;
        wait;
    end process;
end architecture sim;
```

## Step 3: Build and Run

```bash
# Analyze VHDL files
ghdl -a counter.vhd
ghdl -a counter_tb.vhd

# Elaborate the testbench
ghdl -e counter_tb

# Run with GHW waveform output
ghdl -r counter_tb --wave=counter.ghw --stop-time=4000ns
```

This creates `counter.ghw` with all signal transitions.

## Step 4: View in NovyWave

1. Open NovyWave
2. Click **Load Files**
3. Select `counter.ghw`
4. Click **Load**

The file appears in Files & Scopes:

```
counter.ghw (0-4us)
  └── counter_tb
      └── uut
```

## Step 5: Explore the Waveform

1. Click the checkbox next to `counter_tb` to select the scope
2. In the Variables panel, click `clk`, `reset`, `enable`, `count`, and `overflow`
3. Press `R` for full view
4. Press `W` to zoom into the reset release at 50ns
5. Use `Shift+E` to jump between counter transitions
6. Watch the counter increment on each clock edge when enabled

## GHDL Waveform Options

### Output Formats

```bash
# GHW format (recommended for NovyWave)
ghdl -r testbench --wave=output.ghw

# VCD format (alternative, larger files)
ghdl -r testbench --vcd=output.vcd
```

### Simulation Time

```bash
# Run for specific time
ghdl -r testbench --wave=output.ghw --stop-time=1ms

# Run until simulation ends naturally
ghdl -r testbench --wave=output.ghw
```

## Next Steps

- Try modifying the counter to count by 2
- Add more signals to observe (internal registers)
- Compare multiple simulation runs using the [multi-file tutorial](/tutorials/multi-file/)
- Explore the complete example project in [examples/vhdl/counter/](https://github.com/NovyWave/NovyWave/tree/main/examples/vhdl/counter)

## Troubleshooting

### "cannot find entity"
Ensure files are analyzed in dependency order — design first, then testbench.

### Empty waveform file
Verify the simulation actually runs (check for assertion errors) and that the testbench has signal transitions.

### Large file sizes
Use GHW instead of VCD, limit simulation time with `--stop-time`, or use GHDL's signal selection options.
