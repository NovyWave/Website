---
title: Linux Installation
description: Install NovyWave on Linux using a package or AppImage
---

NovyWave is distributed for Linux as packaged bundles and an AppImage.

## Debian and Ubuntu

Download the `.deb` release artifact and install it with:

```bash
sudo dpkg -i novywave_x.x.x_amd64.deb
```

If package dependencies are missing, repair them with:

```bash
sudo apt-get install -f
```

## AppImage

The AppImage works on most modern Linux distributions:

```bash
chmod +x NovyWave_x.x.x_amd64.AppImage
./NovyWave_x.x.x_amd64.AppImage
```

To keep it on your `PATH`, move it somewhere stable:

```bash
sudo mv NovyWave_x.x.x_amd64.AppImage /usr/local/bin/novywave
```

## RPM-Based Systems

Releases also include an RPM bundle. Use your distribution's standard package tooling to install it, then launch NovyWave from the application menu or terminal.

## Runtime Dependencies

On Debian-family systems, these packages are commonly required:

```bash
sudo apt-get install libwebkit2gtk-4.1-0 libgtk-3-0 libssl3
```

As of v0.2.0, WebKitGTK hardware acceleration is enabled by default, which improves rendering performance for the standard desktop app. If you still experience rendering issues, consider using the Chrome Desktop Launcher described below.

## Chrome Desktop Launcher

If the standard desktop app has rendering issues with WebKitGTK, you can use the Chrome Desktop Launcher instead. It requires Chrome or Chromium installed on your system.

**Install Chrome or Chromium:**

```bash
# Debian/Ubuntu
sudo apt install chromium-browser

# Fedora
sudo dnf install chromium

# Arch
sudo pacman -S chromium
```

**Run the launcher:**

```bash
chmod +x novywave-chrome
./novywave-chrome
```

The launcher searches for Chrome or Chromium in standard locations: `/usr/bin/chromium-browser`, `/usr/bin/chromium`, `/usr/bin/google-chrome-stable`, `/usr/bin/google-chrome`, and `/snap/bin/chromium`.

## Wayland and X11

If you see rendering or input issues under Wayland, force X11 for a test run:

```bash
GDK_BACKEND=x11 novywave
```

## File Associations

To associate `.vcd`, `.fst`, and `.ghw` files with NovyWave, update your MIME configuration and set NovyWave as the preferred handler in your desktop environment.

## Verify the Install

A successful first-run check is:

1. the main window opens,
2. the **Load Files** button responds,
3. at least one waveform file loads and shows scopes.
