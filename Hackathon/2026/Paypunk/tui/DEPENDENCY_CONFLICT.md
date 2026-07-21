# TUI Dependency Conflict: time-core (RESOLVED)

## Problem

`paypunk-tui` (ratatui 0.30) and `paypunk-chains-zcash` (via `zcash_client_backend`) cannot coexist in the same Cargo workspace because of a transitive dependency conflict over `time-core`:

```
ratatui 0.30
  → ratatui-widgets 0.3.1 (default features → calendar)
    → time ^0.3.47         (resolves to time ≥0.3.47)
      → time-core =0.1.8   (exact pin)

zcash_client_backend 0.22.x
  → time ^0.3.22
    → time-core =0.1.2     (exact pin — also a direct dep!)
```

`ratatui-widgets` 0.3.1 pins `time-core` to `=0.1.8` (via `time ^0.3.47`), while `zcash_client_backend` pins it directly to `=0.1.2`. Cargo's resolver cannot select both.

## Solution: Vendor ratatui-widgets with relaxed time dependency

`ratatui-widgets` 0.3.1 has `time` as an **optional** dependency (gated behind the `calendar` feature). The `calendar` feature is enabled via `ratatui`'s `widget-calendar` feature (part of `default`). `ratatui-cheese` enables ratatui's default features, pulling in the chain.

The vendored copy at `vendor/ratatui-widgets` changes the `time` requirement from `0.3.47` to `0.3`, allowing the resolver to select `time 0.3.37` (the latest version compatible with `time-core =0.1.2`).

```toml
# workspace Cargo.toml
[patch.crates-io]
ratatui-widgets = { path = "vendor/ratatui-widgets" }
```

## Why this works

| Crate | time requirement | time-core resolved |
|---|---|---|
| ratatui-widgets (vendored) | `^0.3` (optional, calendar) | 0.1.2 (via time 0.3.37) |
| zcash_client_backend | `^0.3.22` + `time-core =0.1.2` | 0.1.2 |
| **Resolution** | compatible | **0.1.2** ✓ |

## Regenerating the vendor

If the vendored copy needs to be refreshed (e.g., for a new `ratatui-widgets` version):

```bash
# Download the crate
curl -L "https://static.crates.io/crates/ratatui-widgets/ratatui-widgets-<VERSION>.crate" \
  -o /tmp/ratatui-widgets.crate
mkdir -p vendor/ratatui-widgets
tar -xzf /tmp/ratatui-widgets.crate -C vendor/ --strip-components=1

# Edit the time dependency
# In vendor/ratatui-widgets/Cargo.toml, change:
#   [dependencies.time]
#   version = "0.3.47"  →  version = "0.3"
```
