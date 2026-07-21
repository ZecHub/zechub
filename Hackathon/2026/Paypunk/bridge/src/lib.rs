use std::sync::Arc;
use tokio::sync::{oneshot, Mutex};

use blake2::digest::consts::U32;
use blake2::Digest;
use paypunk_ipc::messages::{
    MAC_LEN, MSG_APPLICATION, MSG_GET_PUBLIC_KEY, MSG_PUBLIC_KEY, MSG_REGISTER_CLIENT,
    MSG_REGISTER_CLIENT_ACK,
};
use paypunk_ipc::transport::UnixSocketTransport;
use rand::RngCore;

pub struct BridgeConfig {
    pub port: u16,
    pub socket_path: String,
}

struct BridgeState {
    browser: Option<actix_ws::Session>,
    response_tx: Option<oneshot::Sender<Vec<u8>>>,
}

type SharedState = Arc<Mutex<BridgeState>>;

fn generate_keypair() -> ([u8; 32], [u8; 32]) {
    let mut secret = [0u8; 32];
    rand::thread_rng().fill_bytes(&mut secret);
    secret[0] &= 248;
    secret[31] &= 127;
    secret[31] |= 64;
    let public = x25519_dalek::x25519(secret, x25519_dalek::X25519_BASEPOINT_BYTES);
    (secret, public)
}

fn compute_mac(key: &[u8; 32], message: &[u8]) -> [u8; 32] {
    let mut hasher = blake2::Blake2b::<U32>::new();
    hasher.update(key);
    hasher.update(message);
    let mut mac = [0u8; 32];
    mac.copy_from_slice(&hasher.finalize());
    mac
}

use actix_web::{get, web, HttpRequest, HttpResponse};
use futures_util::StreamExt;

#[get("/")]
async fn index() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html")
        .body(include_str!("../index.html"))
}

async fn ws(
    req: HttpRequest,
    body: web::Payload,
    state: web::Data<SharedState>,
) -> Result<HttpResponse, actix_web::Error> {
    let (res, session, mut stream) = actix_ws::handle(&req, body)?;
    eprintln!("[bridge] WS connected");
    state.lock().await.browser = Some(session);

    let st = state.clone();
    actix_web::rt::spawn(async move {
        while let Some(Ok(msg)) = stream.next().await {
            match msg {
                actix_ws::Message::Binary(bytes) => {
                    eprintln!(
                        "[bridge] WS binary message received: {} bytes, first 32 hex: {}",
                        bytes.len(),
                        bytes
                            .iter()
                            .take(32)
                            .map(|b| format!("{:02x}", b))
                            .collect::<Vec<_>>()
                            .join(" ")
                    );
                    if let Some(tx) = st.lock().await.response_tx.take() {
                        eprintln!("[bridge] WS binary: sending to oneshot channel");
                        let _ = tx.send(bytes.to_vec());
                    } else {
                        eprintln!("[bridge] WS binary: no response_tx available (already taken or not set)");
                    }
                }
                actix_ws::Message::Ping(_) | actix_ws::Message::Pong(_) => {}
                actix_ws::Message::Close(_) => {
                    eprintln!("[bridge] WS closed");
                    break;
                }
                _ => {
                    eprintln!("[bridge] WS other message type");
                }
            }
        }
        eprintln!("[bridge] WS stream ended, clearing browser");
        st.lock().await.browser = None;
    });

    Ok(res)
}

pub async fn run(config: BridgeConfig) -> Result<(), Box<dyn std::error::Error>> {
    let _ = std::fs::remove_file(&config.socket_path);

    let state: SharedState = Arc::new(Mutex::new(BridgeState {
        browser: None,
        response_tx: None,
    }));

    let listener = tokio::net::UnixListener::bind(&config.socket_path)?;

    let http_state = state.clone();
    let server = actix_web::HttpServer::new(move || {
        actix_web::App::new()
            .app_data(web::Data::new(http_state.clone()))
            .service(index)
            .route("/ws", web::get().to(ws))
    })
    .bind(format!("0.0.0.0:{}", config.port))?
    .run();
    println!(
        "\nBridge Server available at:\n\nhttp://127.0.0.1:{}\n\n",
        config.port
    );
    let server_handle = server.handle();
    let http_handle = tokio::spawn(server);

    let (secret, public) = generate_keypair();

    let accept_loop = async {
        loop {
            match listener.accept().await {
                Ok((stream, _addr)) => {
                    eprintln!("[bridge] IPC connection accepted");
                    let state = state.clone();
                    tokio::spawn(async move {
                        if let Err(e) = handle_ipc_connection(stream, state, secret, public).await {
                            eprintln!("[bridge] IPC connection error: {e}");
                        }
                        eprintln!("[bridge] IPC connection finished");
                    });
                }
                Err(e) => {
                    eprintln!("[bridge] accept error: {}", e);
                }
            }
        }
    };

    tokio::select! {
        _ = accept_loop => {},
        _ = tokio::signal::ctrl_c() => {
            println!("\nshutting down...");
        }
    }

    server_handle.stop(true).await;
    let _ = http_handle.await;
    let _ = std::fs::remove_file(&config.socket_path);

    Ok(())
}

async fn handle_ipc_connection(
    stream: tokio::net::UnixStream,
    state: SharedState,
    secret: [u8; 32],
    public: [u8; 32],
) -> Result<(), Box<dyn std::error::Error>> {
    let mut transport = UnixSocketTransport::from_stream(stream);
    let mut hmac_key: Option<[u8; 32]> = None;
    let mut registered = false;

    loop {
        let frame = transport.read_frame().await?;
        if frame.is_empty() {
            eprintln!("[bridge] IPC empty frame, closing");
            return Ok(());
        }

        let msg_type = frame[0];
        let payload = &frame[1..];
        eprintln!(
            "[bridge] IPC msg_type=0x{:02x} payload_len={}",
            msg_type,
            payload.len()
        );

        match msg_type {
            MSG_GET_PUBLIC_KEY => {
                eprintln!("[bridge] IPC MSG_GET_PUBLIC_KEY");
                let mut resp = vec![MSG_PUBLIC_KEY];
                resp.extend_from_slice(&public);
                transport.write_frame(&resp).await?;
                eprintln!("[bridge] IPC replied with MSG_PUBLIC_KEY");
            }

            MSG_REGISTER_CLIENT => {
                eprintln!("[bridge] IPC MSG_REGISTER_CLIENT");
                if payload.len() != 32 {
                    return Err("invalid client public key length".into());
                }
                let mut client_pk = [0u8; 32];
                client_pk.copy_from_slice(payload);
                let shared = x25519_dalek::x25519(secret, client_pk);
                hmac_key = Some(compute_mac(&shared, b"paypunk-ipc-hmac"));
                registered = true;
                transport.write_frame(&[MSG_REGISTER_CLIENT_ACK]).await?;
                eprintln!("[bridge] IPC registration complete");
            }

            MSG_APPLICATION => {
                if !registered {
                    return Err("application message before registration".into());
                }
                if payload.len() < MAC_LEN {
                    return Err("malformed application message".into());
                }
                let (msg_payload, msg_mac) = payload.split_at(payload.len() - MAC_LEN);
                eprintln!(
                    "[bridge] IPC MSG_APPLICATION: payload {} bytes, MAC {} bytes",
                    msg_payload.len(),
                    msg_mac.len()
                );
                eprintln!(
                    "[bridge] IPC msg_payload first 32 hex: {}",
                    msg_payload
                        .iter()
                        .take(32)
                        .map(|b| format!("{:02x}", b))
                        .collect::<Vec<_>>()
                        .join(" ")
                );
                if let Ok(text) = std::str::from_utf8(msg_payload.get(..64).unwrap_or(msg_payload))
                {
                    eprintln!("[bridge] IPC msg_payload as text: {}", text);
                }
                let expected_mac = compute_mac(hmac_key.as_ref().unwrap(), msg_payload);
                if msg_mac != expected_mac {
                    eprintln!("[bridge] IPC MAC mismatch");
                    return Err("MAC mismatch".into());
                }
                eprintln!("[bridge] IPC MAC verified OK");

                let (tx, rx) = oneshot::channel();
                {
                    let mut g = state.lock().await;
                    g.response_tx = Some(tx);
                    match g.browser.as_mut() {
                        Some(sess) => {
                            eprintln!(
                                "[bridge] IPC forwarding {} bytes to browser WS",
                                msg_payload.len()
                            );
                            let _ = sess.binary(msg_payload.to_vec()).await;
                            eprintln!("[bridge] IPC forwarded to browser OK");
                        }
                        None => {
                            eprintln!("[bridge] IPC ERROR: no browser connected");
                            return Err("no browser connected".into());
                        }
                    }
                }

                eprintln!("[bridge] IPC waiting for response from browser...");
                let resp = rx.await.unwrap_or_else(|_| {
                    eprintln!("[bridge] IPC oneshot cancelled");
                    b"request cancelled".to_vec()
                });
                eprintln!(
                    "[bridge] IPC got response from browser: {} bytes, first 32 hex: {}",
                    resp.len(),
                    resp.iter()
                        .take(32)
                        .map(|b| format!("{:02x}", b))
                        .collect::<Vec<_>>()
                        .join(" ")
                );
                transport.write_frame(&resp).await?;
                eprintln!("[bridge] IPC response written to socket");
            }

            _ => {
                eprintln!("[bridge] IPC unknown message type: {msg_type}");
                return Ok(());
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use paypunk_ipc::messages::MSG_APPLICATION;
    use paypunk_ipc::transport::UnixSocketTransport;
    use tokio::net::UnixStream;

    async fn ipc_handshake(transport: &mut UnixSocketTransport) -> ([u8; 32], [u8; 32]) {
        transport.write_frame(&[MSG_GET_PUBLIC_KEY]).await.unwrap();

        let frame = transport.read_frame().await.unwrap();
        assert_eq!(frame.len(), 33);
        assert_eq!(frame[0], MSG_PUBLIC_KEY);
        let mut server_public = [0u8; 32];
        server_public.copy_from_slice(&frame[1..33]);

        let (client_secret, client_public) = generate_keypair();

        let mut reg = vec![MSG_REGISTER_CLIENT];
        reg.extend_from_slice(&client_public);
        transport.write_frame(&reg).await.unwrap();

        let ack = transport.read_frame().await.unwrap();
        assert_eq!(ack, vec![MSG_REGISTER_CLIENT_ACK]);

        let shared = x25519_dalek::x25519(client_secret, server_public);
        let hmac_key = compute_mac(&shared, b"paypunk-ipc-hmac");

        (server_public, hmac_key)
    }

    async fn send_application_msg(
        transport: &mut UnixSocketTransport,
        hmac_key: &[u8; 32],
        payload: &[u8],
    ) {
        let mac = compute_mac(hmac_key, payload);
        let mut frame = Vec::with_capacity(1 + payload.len() + MAC_LEN);
        frame.push(MSG_APPLICATION);
        frame.extend_from_slice(payload);
        frame.extend_from_slice(&mac);
        transport.write_frame(&frame).await.unwrap();
    }

    async fn read_application_response(
        transport: &mut UnixSocketTransport,
    ) -> Result<Vec<u8>, String> {
        let raw = transport.read_frame().await.map_err(|e| format!("{e}"))?;
        Ok(raw)
    }

    #[tokio::test]
    async fn test_bridge_roundtrip() {
        let dir = tempfile::tempdir().unwrap();
        let socket_path = dir.path().join("test.sock").to_string_lossy().to_string();
        let port = 18444u16;

        let config = BridgeConfig {
            port,
            socket_path: socket_path.clone(),
        };

        let handle = tokio::spawn(async move {
            run(config).await.unwrap();
        });

        tokio::time::sleep(std::time::Duration::from_millis(500)).await;

        let stream = UnixStream::connect(&socket_path).await.unwrap();
        let mut transport = UnixSocketTransport::from_stream(stream);

        let (_server_public, hmac_key) = ipc_handshake(&mut transport).await;

        // Connect a WebSocket client to simulate the browser
        let ws_url = format!("ws://127.0.0.1:{}/ws", port);
        let (ws_stream, _) = tokio_tungstenite::connect_async(&ws_url).await.unwrap();
        let (mut ws_write, mut ws_read) = ws_stream.split();

        // Send application message
        send_application_msg(&mut transport, &hmac_key, b"hello bridge").await;

        // Read the forwarded message from the WebSocket
        use futures_util::StreamExt;
        let ws_msg = ws_read.next().await.unwrap().unwrap();
        let forwarded = match ws_msg {
            tokio_tungstenite::tungstenite::Message::Binary(data) => data,
            _ => panic!("expected binary ws message"),
        };
        assert_eq!(forwarded, b"hello bridge");

        // Send response back through WebSocket
        use futures_util::SinkExt;
        ws_write
            .send(tokio_tungstenite::tungstenite::Message::Binary(
                b"response bytes".to_vec(),
            ))
            .await
            .unwrap();

        // Read the response on the IPC side
        let resp_bytes = read_application_response(&mut transport).await.unwrap();
        assert_eq!(resp_bytes, b"response bytes");

        handle.abort();
    }

    #[tokio::test]
    async fn test_no_browser_returns_error() {
        let dir = tempfile::tempdir().unwrap();
        let socket_path = dir.path().join("test2.sock").to_string_lossy().to_string();
        let port = 18445u16;

        let config = BridgeConfig {
            port,
            socket_path: socket_path.clone(),
        };

        let handle = tokio::spawn(async move {
            run(config).await.unwrap();
        });

        tokio::time::sleep(std::time::Duration::from_millis(500)).await;

        let stream = UnixStream::connect(&socket_path).await.unwrap();
        let mut transport = UnixSocketTransport::from_stream(stream);

        let (_server_public, hmac_key) = ipc_handshake(&mut transport).await;

        // No browser connected — sending an application message should fail
        send_application_msg(&mut transport, &hmac_key, b"hello").await;

        let err = read_application_response(&mut transport).await;
        assert!(err.is_err(), "expected error when no browser connected");

        handle.abort();
    }

    #[tokio::test]
    async fn test_index_returns_html() {
        let dir = tempfile::tempdir().unwrap();
        let socket_path = dir.path().join("test3.sock").to_string_lossy().to_string();
        let port = 18446u16;

        let config = BridgeConfig {
            port,
            socket_path: socket_path.clone(),
        };

        let handle = tokio::spawn(async move {
            run(config).await.unwrap();
        });

        tokio::time::sleep(std::time::Duration::from_millis(500)).await;

        let resp = reqwest::get(&format!("http://127.0.0.1:{}/", port))
            .await
            .unwrap();
        assert_eq!(resp.status(), 200);
        let body = resp.text().await.unwrap();
        assert!(body.contains("Paypunk Bridge"));

        handle.abort();
    }
}
