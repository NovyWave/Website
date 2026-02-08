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
| **X** | Unknown/undefined value |
| **Z** | High-impedance (floating) |
| **U** | Uninitialized |

These typically occur at simulation start or with tri-state signals.

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

## Getting Help

If these solutions don't resolve your issue:

1. **Check existing issues:** [GitHub Issues](https://github.com/NovyWave/NovyWave/issues)
2. **Open a new issue** with: NovyWave version, operating system, steps to reproduce, and error messages from terminal
3. **Ask questions:** [GitHub Discussions](https://github.com/NovyWave/NovyWave/discussions)
