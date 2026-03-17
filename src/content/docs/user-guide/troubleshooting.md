---
title: Troubleshooting
description: Solutions for common NovyWave issues
---

Solutions for common issues when using NovyWave.

## Application Won't Start

### White Screen on Launch

**Symptoms:** Application window opens but shows only white/blank content.

**Solutions:**
1. **Windows:** Ensure [WebView2 runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) is installed
2. **Linux:** Install WebKit dependencies:
   ```bash
   sudo apt-get install libwebkit2gtk-4.1-0
   ```
3. Check that antivirus isn't blocking the application
4. As an alternative, try the Chrome Desktop Launcher (`novywave-chrome`), which uses Chrome's rendering engine instead of WebKitGTK

### Crash on Startup

**Possible causes:** Corrupted configuration file or missing system libraries.

**Solutions:**
1. Delete the configuration file and restart:
   ```bash
   rm ~/.config/novywave/.novywave  # Linux
   ```
2. Run from terminal to see error messages:
   ```bash
   novywave
   ```

## File Loading Issues

### Unsupported File Format

Ensure the file has a correct extension (`.vcd`, `.fst`, `.ghw`) and isn't truncated or corrupted. Try opening in another viewer to verify file integrity.

### File Loads but Shows No Signals

1. Expand the file tree in Files & Scopes panel
2. Click the checkbox next to a scope that contains signals
3. Use the search in Variables panel to find specific signals

### Loading Never Completes

1. Check terminal for error messages
2. Try a smaller file to verify NovyWave works
3. Convert VCD to FST for faster loading:
   ```bash
   vcd2fst input.vcd output.fst
   ```

## Display Issues

### Signals Show "N/A"

The cursor is outside the file's time range. Press `R` to reset the view to the full timeline, or move the cursor within the file's time span.

### Values Show "X", "Z", or "U"

These are valid signal states, not errors:

| Display | Meaning |
|---------|---------|
| **X** | The simulator cannot determine if the signal is 0 or 1 (e.g., conflicting drivers) |
| **Z** | The signal is not being driven by anything, as if the wire is disconnected |
| **U** | No value assigned yet (common at the start of VHDL simulations) |

These commonly appear at simulation start, on tri-state buses, or when modules are not yet active.

### Waveform Display is Blank

1. Check that variables are selected (clicked in Variables panel)
2. Press `R` to reset zoom to full timeline
3. Check cursor position is within file's time range

## Performance Issues

### Slow Loading

For large files, consider using FST format instead of VCD. FST files are 10-100x smaller and faster to load.

### Sluggish Navigation

1. Reduce the number of selected variables
2. Close unused waveform files
3. Check system resource usage

## Configuration Problems

### Settings Not Saving

Check that the config directory exists and is writable, verify disk space, and look for error messages in the terminal.

### Wrong Settings Restored

Check for a `.novywave` file in the current directory — project-local config takes priority over global settings. Remove it to use global settings:

```bash
rm .novywave  # In project directory
```

## Keyboard Shortcuts Not Working

### No Response to Keys

1. Click on the waveform area to defocus any input fields
2. Close any open dialogs
3. Ensure the NovyWave window has focus

### Wrong Key Behavior

Check for conflicting system keyboard shortcuts or try with a different keyboard layout.

## Chrome Launcher Issues

### Chrome Launcher Does Not Start

If `novywave-chrome` reports that no browser was found:

- Verify Chrome, Chromium, or Edge is installed
- On Linux, check that the binary is in your PATH or in a standard location (`/usr/bin/chromium`, `/usr/bin/google-chrome-stable`)
- On macOS, check `/Applications/` for Chrome, Chromium, or Edge
- On Windows, check Program Files directories

If the launcher starts but shows a blank page, the backend may not be ready. The launcher waits up to 10 seconds for the backend. Check for port conflicts on your system.

## Plugin Issues

**reload_watcher does not trigger reload:**
- Verify the plugin is enabled in your `.novywave` config (`enabled = true`)
- Check file permissions — the watcher needs read access to the waveform files
- Some network file systems may not propagate file change events

**files_discovery does not find files:**
- Check your `patterns` configuration in the plugin config section
- Patterns use gitignore-style glob syntax (e.g., `"output/**/*.vcd"`)
- Verify the files have supported extensions (default: `vcd`, `fst`)
- Check the `debounce_ms` setting — minimum is 50ms

## Getting Help

If these solutions don't resolve your issue:

1. **Check existing issues:** [GitHub Issues](https://github.com/NovyWave/NovyWave/issues)
2. **Open a new issue** with: NovyWave version, operating system, steps to reproduce, and error messages from terminal
