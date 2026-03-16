# Documentation Audit Matrix

This matrix tracks what the website publishes, where the information comes from in `~/repos/NovyWave`, and how the page must be verified.

| Route | Primary source material | Verification type | Status |
| --- | --- | --- | --- |
| `/` | `README.md`, existing website splash copy | Build + visual review | Planned |
| `/getting-started/installation/` | `README.md`, `docs/src/user-guide/installation.md`, `release.yml` | Build + source review | Planned |
| `/getting-started/installation/linux/` | `docs/src/user-guide/installation/linux.md`, `release.yml` | Manual Linux | Planned |
| `/getting-started/installation/macos/` | `docs/src/user-guide/installation/macos.md`, `release.yml` | Manual macOS + source review | Planned |
| `/getting-started/installation/windows/` | `docs/src/user-guide/installation/windows.md`, `release.yml`, `tauri.conf.json` | Manual Windows + source review | Planned |
| `/getting-started/quick-start/` | `docs/src/user-guide/quick-start.md` | Manual primary platform | Planned |
| `/user-guide/interface-overview/` | `README.md`, current app behavior, user-guide pages | Manual primary platform | Planned |
| `/user-guide/loading-files/` | `docs/src/user-guide/loading-files.md` | Manual primary platform | Planned |
| `/user-guide/loading-files/formats/` | `docs/src/user-guide/loading-files/formats.md`, `README.md` | Source review + spot check | Planned |
| `/user-guide/loading-files/multi-file/` | `docs/src/user-guide/loading-files/multi-file.md` | Manual primary platform | Planned |
| `/user-guide/navigation/` | `docs/src/user-guide/navigation.md` | Manual primary platform | Planned |
| `/user-guide/navigation/zoom-pan/` | `docs/src/user-guide/navigation/zoom-pan.md` | Manual primary platform | Planned |
| `/user-guide/navigation/cursor/` | `docs/src/user-guide/navigation/cursor.md` | Manual primary platform | Planned |
| `/user-guide/signal-values/` | `README.md`, `shared/src/lib.rs`, `docs/src/user-guide/navigation/cursor.md` | Source review + app spot check | Planned |
| `/user-guide/keyboard-shortcuts/` | `docs/src/user-guide/keyboard-shortcuts.md`, live app shortcuts | Manual primary platform | Planned |
| `/user-guide/plugins/` | `plugins/`, `shared/src/lib.rs`, WIT definitions | Source review + manual primary platform | Planned |
| `/user-guide/configuration/` | `.novywave`, `shared/src/lib.rs`, `src-tauri/tauri.conf.json` | Manual primary platform + source review | Planned |
| `/user-guide/troubleshooting/` | `docs/src/user-guide/troubleshooting.md`, `src-chrome/src/main.rs` | Scenario review + manual repro where safe | Planned |
| `/tutorials/first-waveform/` | `docs/src/tutorials/first-waveform.md`, `test_files/` | Manual primary platform | Planned |
| `/tutorials/multi-file/` | `docs/src/tutorials/multi-file.md`, `test_files/` | Manual primary platform | Planned |
| `/tutorials/vhdl-ghdl/` | `docs/src/tutorials/vhdl-ghdl.md`, `examples/vhdl/counter/README.md` | Manual Linux + source review | Planned |
| `/tutorials/verilog-icarus/` | `docs/src/tutorials/verilog-icarus.md`, `examples/verilog/counter/README.md` | Manual Linux + source review | Planned |
| `/tutorials/spinalhdl/` | `examples/spinalhdl/counter/README.md`, `examples/README.md` | Manual Linux + source review | Planned |
| `/tutorials/amaranth/` | `examples/amaranth/counter/README.md`, `examples/README.md` | Manual Linux + source review | Planned |
| `/tutorials/spade/` | `examples/spade/counter/README.md`, `examples/README.md` | Manual Linux + source review | Planned |
| `/development/building/` | `docs/src/development/building.md`, `Makefile.toml` | Source review + local command spot check | Planned |
| `/development/architecture/` | `docs/src/development/architecture.md`, repo structure | Source review | Planned |
| `/development/actor-relay/` | `docs/src/development/actor-relay.md`, `frontend/src/dataflow/` | Source review | Planned |
| `/development/testing/` | `docs/src/development/testing.md`, `Makefile.toml` | Source review + local command spot check | Planned |
| `/development/contributing/` | `docs/src/development/contributing.md`, `CONTRIBUTING.md` | Source review | Planned |
| `/api/data-types/` | `docs/src/api/data-types.md`, `shared/src/lib.rs` | Source review | Planned |
| `/api/message-protocol/` | `docs/src/api/message-protocol.md`, backend/frontend message definitions | Source review | Planned |
| `/changelog/` | `docs/src/changelog.md`, `CHANGELOG.md` | Source review | Planned |

## Notes

- Legacy `~/repos/NovyWave/docs/book/src/` pages are not authoritative. Use them only as hints for missing topics.
- `~/repos/NovyWave/docs/plans/` is excluded from docs authorship unless a feature is implemented and testable.
- Update this matrix whenever a route is added, removed, or changes verification scope.
