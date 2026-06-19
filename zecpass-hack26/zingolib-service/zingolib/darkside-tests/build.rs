fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_prost_build::configure()
        .build_server(true)
        .compile_protos(
            &[
                "../zingo-testutils/proto/compact_formats.proto",
                "proto/darkside.proto",
                "../zingo-testutils/proto/service.proto",
            ],
            &["proto", "../zingo-testutils/proto"],
        )?;
    println!("cargo:rerun-if-changed=proto/darkside.proto");
    Ok(())
}
