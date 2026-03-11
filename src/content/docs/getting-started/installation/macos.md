---
title: macOS Installation
description: Install NovyWave on Apple Silicon or Intel Macs
---

NovyWave publishes separate DMGs for Apple Silicon and Intel Macs.

## Apple Silicon

1. Download the `aarch64.dmg` release artifact.
2. Open the DMG.
3. Drag NovyWave into your `Applications` folder.

## Intel Macs

1. Download the `x64.dmg` release artifact.
2. Open the DMG.
3. Drag NovyWave into your `Applications` folder.

## Gatekeeper Warning

If macOS warns that NovyWave is from an unidentified developer:

1. In `Applications`, right-click `NovyWave.app`.
2. Choose **Open**.
3. Confirm **Open** in the dialog.

If needed, use `System Settings` -> `Privacy & Security` and allow the blocked app to open.

## Launching from the Terminal

```bash
export PATH="/Applications/NovyWave.app/Contents/MacOS:$PATH"
```

Or set an alias:

```bash
alias novywave="/Applications/NovyWave.app/Contents/MacOS/NovyWave"
```

## File Associations

1. Right-click a `.vcd`, `.fst`, or `.ghw` file in Finder.
2. Choose **Get Info**.
3. Set **Open with** to NovyWave.
4. Apply the change to all files of that type if desired.

## Troubleshooting

### App Won't Launch

- retry the Gatekeeper steps above
- re-download the DMG if the app bundle looks incomplete

### Performance Feels Wrong

- confirm you installed the build that matches your CPU architecture
- test with a smaller waveform to separate install problems from file-size problems
