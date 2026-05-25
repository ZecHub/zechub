Step: Remove unsafe unwraps in Rust tx builder

Goal:
- Replace panic-prone unwraps in `native/zcash-sync/src/note_selection/builder.rs` with checks and error returns so failures surface to UI.

What I tried:
- First pass replaced CtOption unwraps with `.into_option()` / `.ok_or(...)`, but crate exposes `subtle::CtOption` that lacks those helpers.

Next attempt:
- Use `bool::from(ct.is_some())` guards before `unwrap()` (safe due to guard).
- For collections (auth path), map to `Result` and early-return on invalid nodes.

