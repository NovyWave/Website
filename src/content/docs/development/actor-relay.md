---
title: Actor+Relay Pattern
description: Learn the state-management model used throughout the NovyWave frontend
---

NovyWave uses an Actor+Relay architecture for reactive state management in the frontend.

## Actors

Actors own state and update it sequentially in response to events.

That gives NovyWave:

- clearer event flow,
- fewer accidental cross-updates,
- more explicit domain boundaries.

## Relays

Relays are typed event channels. Their names should describe **what happened**, not what another component should do.

Good examples:

- `file_loaded`
- `button_clicked`
- `input_changed`

Bad examples:

- `set_theme`
- `add_file`
- `run_update`

## Signals and UI Binding

Actors expose state through signals so the UI can react without mutating domain state directly.

## Atoms

Use atoms only for lightweight local UI state such as hover, focus, or transient control state.

## Design Rules

- avoid raw global mutables
- keep caching inside actor loops, not UI components
- name domains after what they are, not as generic managers or services
- model file, variable, and timeline concerns as separate domains
