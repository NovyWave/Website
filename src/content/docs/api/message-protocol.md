---
title: Message Protocol
description: How NovyWave requests data and reports results between UI and backend layers
---

NovyWave uses a message-oriented protocol between the frontend and the layer that performs file access and waveform queries.

## Direction of Messages

- **Up messages** go from the UI toward the backend or desktop command layer.
- **Down messages** return results, progress, and errors back to the UI.

## Common Up Messages

Frontend requests typically cover:

- loading or saving configuration,
- browsing directories,
- loading waveform files,
- requesting signal values at a given time,
- requesting signal transitions for a visible range.

## Common Down Messages

Responses typically cover:

- configuration loaded or saved,
- file loaded successfully,
- file load failed,
- parsing progress updates,
- directory contents,
- signal values,
- signal transition data.

## Why the Protocol Exists

The protocol keeps the UI focused on presentation while file-system and waveform operations remain isolated behind typed requests and responses.

That matters in both runtime modes:

- browser mode, where the Moon backend handles the work,
- desktop mode, where Tauri-backed commands do the same job.

## Typical File-Load Flow

1. the UI asks for directory contents,
2. the user chooses one or more waveform files,
3. the frontend sends a load request,
4. progress updates arrive while parsing runs,
5. the loaded file metadata returns to the UI,
6. the scope tree becomes available for selection.

## Typical Timeline Flow

1. the user moves the cursor or changes the viewport,
2. the frontend requests values or transitions for the visible range,
3. the backend responds with the relevant waveform data,
4. the UI updates the canvas and value column.
