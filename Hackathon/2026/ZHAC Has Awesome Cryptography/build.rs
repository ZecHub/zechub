// Build script: compile the vendored LightwalletD .proto files into Rust
// via tonic-build (gRPC client + prost message types).
//
// Uses the bundled `protoc` from `protoc-bin-vendored` so that building zhac
// does NOT require protoc to be installed on the host system.

use std::path::PathBuf;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Point prost-build / tonic-build at the vendored protoc binary.
    if let Ok(bin_path) = protoc_bin_vendored::protoc_bin_path() {
        if let Some(parent) = bin_path.parent() {
            std::env::set_var(
                "PROTOC",
                parent.join("protoc").with_extension(
                    if cfg!(windows) { "exe" } else { "" },
                ),
            );
        }
    }

    let proto_dir: PathBuf = ["protos"].iter().collect();
    let proto_files = [
        proto_dir.join("compact_formats.proto"),
        proto_dir.join("service.proto"),
    ];

    // Ask Cargo to re-run us if the protos change.
    for f in &proto_files {
        println!("cargo:rerun-if-changed={}", f.display());
    }
    println!("cargo:rerun-if-changed=build.rs");

    tonic_build::configure()
        .build_server(false)
        .build_client(true)
        .out_dir(std::env::var("OUT_DIR").map(PathBuf::from).unwrap_or_else(|_| {
            // Fallback so `cargo check` without a package context still works.
            PathBuf::from("target/debug/build/zhac-proto")
        }))
        .compile_protos(
            &proto_files.iter().map(|p| p.as_path()).collect::<Vec<_>>(),
            &[proto_dir.as_path()],
        )?;

    Ok(())
}
