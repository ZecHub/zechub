//! The `uniffi-bindgen` CLI, pinned to this crate's exact `uniffi` version.
//!
//! Run it in *library mode* against the built cdylib to emit the Kotlin / Swift
//! bindings (no UDL file — the surface is introspected from the compiled
//! scaffolding the `#[uniffi::export]` proc-macros embed):
//!
//! ```sh
//! cargo build -p steward-ffi
//! cargo run -p steward-ffi --bin uniffi-bindgen -- generate \
//!     --library ../../target/debug/libsteward_ffi.dylib \
//!     --language kotlin --out-dir bindings/kotlin
//! cargo run -p steward-ffi --bin uniffi-bindgen -- generate \
//!     --library ../../target/debug/libsteward_ffi.dylib \
//!     --language swift --out-dir bindings/swift
//! ```
fn main() {
    uniffi::uniffi_bindgen_main()
}
