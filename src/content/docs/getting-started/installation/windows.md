---
title: Windows Installation
description: Install NovyWave on Windows and handle first-run warnings
---

NovyWave releases are built for 64-bit Windows.

## Recommended Installer

Use the NSIS `.exe` installer when it is published:

1. Download `NovyWave_x.x.x_x64-setup.exe`.
2. Run the installer.
3. Follow the wizard.
4. Start NovyWave from the Start menu.

## Alternative MSI

Some releases may also include an `.msi`. Use it when your environment prefers MSI deployment or when it is the artifact your release page exposes.

## SmartScreen Warning

On first launch, Windows may display a SmartScreen warning for unsigned or newly published builds.

1. Click **More info**.
2. Click **Run anyway** if you trust the downloaded release.

## Add NovyWave to `PATH`

```powershell
$env:Path += ";C:\Program Files\NovyWave"
```

Persist the change through the Windows environment variable editor if you want terminal access after a restart.

## File Associations

If the installer does not register file associations automatically:

1. Right-click a waveform file.
2. Choose **Open with** -> **Choose another app**.
3. Browse to `NovyWave.exe`.
4. Enable **Always use this app**.

## WebView2 Runtime

NovyWave depends on Microsoft Edge WebView2. It is normally present on Windows 10 and 11. If the app opens to a blank or incomplete window, install the runtime from Microsoft and try again.

## Troubleshooting

### White Screen on Launch

- confirm WebView2 is installed
- reinstall the published NovyWave build

### Missing DLL or Startup Errors

- re-download the installer from the release page
- prefer the standard installer over ad-hoc file copies
