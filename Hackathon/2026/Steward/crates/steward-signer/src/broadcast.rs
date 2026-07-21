//! Step 6 — **Broadcast** the raw transaction to Zaino / lightwalletd over gRPC.
//!
//! Uses `zcash_client_backend 0.21`'s generated `CompactTxStreamerClient` (tonic 0.14) so we
//! never hand-roll the proto. We provide the raw tx bytes from [`crate::finalize_extract`].
//!
//! ## API (verified against `zcash_client_backend-0.21.0/src/proto/{service,..}.rs`)
//! ```ignore
//! RawTransaction { data: Vec<u8>, height: u64, .. }
//! CompactTxStreamerClient::new(channel) -> Client<Channel>
//! Client::send_transaction(impl IntoRequest<RawTransaction>) -> Result<Response<SendResponse>, Status>
//! SendResponse { error_code: i32, error_message: String }
//! ```
//! zcb's own `CompactTxStreamerClient::connect` helper is gated behind its
//! `lightwalletd-tonic-transport` feature (which we don't enable — it pulls extra transport
//! surface), so we build the `tonic::transport::Channel` ourselves and use `::new`.
//!
//! ## ⚠️ Runtime caveats (compiles; not yet run)
//! * `Endpoint::connect()` performs no explicit TLS config here. Our `tonic` features enable
//!   `tls-webpki-roots` + `tls-ring`, but a `https://` Zaino endpoint may still need an
//!   explicit `ClientTlsConfig`. If a TLS handshake fails at integration time, replace the
//!   endpoint build with `Endpoint::from_shared(url)?.tls_config(ClientTlsConfig::new()
//!   .with_webpki_roots())?`.
//! * `height: 0` is the conventional sentinel for an unmined tx being submitted.

use zcash_client_backend::proto::service::RawTransaction;

/// Broadcast raw transaction bytes to a Zaino / lightwalletd gRPC endpoint.
///
/// * `endpoint` — e.g. `"https://zaino.testnet.unsafe.zec.rocks:443"` or `"http://127.0.0.1:9067"`.
/// * returns the server's `error_message` on success (often empty), errors on rejection.
///
/// TLS (for `https://`) is configured by [`crate::grpc::connect`] via the `tls-webpki-roots` feature.
pub async fn broadcast(endpoint: String, raw_tx: Vec<u8>) -> anyhow::Result<String> {
    let mut client = crate::grpc::connect(&endpoint).await?;

    let request = RawTransaction {
        data: raw_tx,
        height: 0,
        ..Default::default()
    };

    let response = client
        .send_transaction(request)
        .await
        .map_err(|e| anyhow::anyhow!("SendTransaction RPC failed: {e}"))?
        .into_inner();

    if response.error_code != 0 {
        anyhow::bail!(
            "lightwalletd rejected the transaction: code={} message={:?}",
            response.error_code,
            response.error_message
        );
    }

    Ok(response.error_message)
}
