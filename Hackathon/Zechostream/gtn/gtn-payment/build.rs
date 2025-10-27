fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_prost_build::configure()
        .build_server(false)
        .compile_protos(&["src/proto/service.proto", "src/proto/compact_formats.proto"], &["src/proto/"])?;

    Ok(())
}
