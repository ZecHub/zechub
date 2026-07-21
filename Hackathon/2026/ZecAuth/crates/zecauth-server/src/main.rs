use axum::{
    Json, Router,
    extract::{State, Path, Query, ws::{WebSocket, WebSocketUpgrade, Message}},
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post},
};
use chrono::Utc;
use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};
use serde::{Serialize, Deserialize};
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use tokio::sync::broadcast;
use tower_http::cors::CorsLayer;
use tower_http::services::ServeDir;
use futures_util::SinkExt;
use zecauth_core::{ChallengeMessage, AuthResponse, Network, TransactionRequest, TransactionApproval, Scope, RequestedScopes};

const JWT_SECRET: &str = "zecauth-demo-secret-change-in-production";
const CHALLENGE_TTL_SECONDS: i64 = 300;

/// The host the dApp advertises in challenges and in the callback / WebSocket URLs.
///
/// Defaults to `localhost:3000` (fine for the iOS Simulator and a local browser).
/// For a **physical device**, set `ZECAUTH_HOST` to your Mac's LAN address, e.g.
/// `ZECAUTH_HOST=192.168.1.50:3000`, so the phone (and the browser) can reach the
/// callback and WebSocket. The server always binds `0.0.0.0`, so it's reachable either way.
fn host() -> &'static str {
    use std::sync::OnceLock;
    static HOST: OnceLock<String> = OnceLock::new();
    HOST.get_or_init(|| std::env::var("ZECAUTH_HOST").unwrap_or_else(|_| "localhost:3000".to_string()))
}

/// Network the demo operates on. Set `ZECAUTH_NETWORK=testnet` to issue **testnet**
/// challenges + transaction requests (and verify signatures against `zcash:testnet`).
/// Defaults to mainnet. The wallet must be on the same network (Settings → Network).
fn network() -> Network {
    use std::sync::OnceLock;
    static N: OnceLock<Network> = OnceLock::new();
    *N.get_or_init(|| match std::env::var("ZECAUTH_NETWORK").as_deref() {
        Ok("testnet") | Ok("zcash:testnet") => Network::Testnet,
        _ => Network::Mainnet,
    })
}

/// CAIP-2 chain id for the configured network ("zcash:mainnet" | "zcash:testnet").
fn chain_id() -> &'static str {
    network().chain_id()
}

// ─── Capabilities (server-authoritative) ───
//
// The server — not the dApp — decides which capabilities this deployment may request. A dApp
// declares the capabilities it wants when it asks for a challenge; the server validates them
// against this allow-list, embeds the approved set into the challenge (so the wallet shows
// them), and binds them into the session JWT. Privileged endpoints (e.g. `/tx/request`) then
// enforce that the session actually holds the required capability.

/// The capabilities this dApp deployment is permitted to request. Configurable via
/// `ZECAUTH_CAPABILITIES` (comma-separated). Defaults to `signin,sign-transaction`.
/// `signin` is always allowed (every connection authenticates).
fn allowed_capabilities() -> &'static Vec<String> {
    use std::sync::OnceLock;
    static C: OnceLock<Vec<String>> = OnceLock::new();
    C.get_or_init(|| {
        let mut caps: Vec<String> = std::env::var("ZECAUTH_CAPABILITIES")
            .unwrap_or_else(|_| "signin,sign-transaction,view-address,view-balance,view-history,view-incoming,view-full".to_string())
            .split(',')
            .map(|s| s.trim().to_string())
            .filter(|s| !s.is_empty())
            .collect();
        if !caps.iter().any(|c| c == "signin") {
            caps.insert(0, "signin".to_string());
        }
        caps
    })
}

/// Map a developer-facing capability id to its protocol scope.
fn capability_to_scope(cap: &str, max_amount: Option<&str>) -> Option<Scope> {
    match cap {
        "signin" => Some(Scope::Auth),
        "sign-transaction" => Some(Scope::request_payment(max_amount)),
        "view-balance" => Some(Scope::ViewBalance),
        "view-history" => Some(Scope::ViewHistory),
        "view-incoming" => Some(Scope::ViewIncoming),
        "view-full" => Some(Scope::ViewFull),
        "view-address" => Some(Scope::ViewAddress),
        _ => None,
    }
}

/// Map a protocol scope back to its capability id (inverse of `capability_to_scope`).
fn scope_to_capability(scope: &Scope) -> Option<&'static str> {
    match scope {
        Scope::Auth => Some("signin"),
        Scope::RequestPayment { .. } => Some("sign-transaction"),
        Scope::ViewBalance => Some("view-balance"),
        Scope::ViewHistory => Some("view-history"),
        Scope::ViewIncoming => Some("view-incoming"),
        Scope::ViewFull => Some("view-full"),
        Scope::ViewAddress => Some("view-address"),
        Scope::Custom { .. } => None,
    }
}

/// The capability ids granted by a challenge's scopes. `signin` is always implied.
fn capabilities_from_scopes(scopes: &RequestedScopes) -> Vec<String> {
    let mut caps = vec!["signin".to_string()];
    for scope in scopes.required.iter().chain(scopes.optional.iter()) {
        if let Some(cap) = scope_to_capability(scope) {
            if !caps.iter().any(|c| c == cap) {
                caps.push(cap.to_string());
            }
        }
    }
    caps
}

// ─── Types ───

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    domain: String,
    chain: String,
    iat: i64,
    exp: i64,
    /// The capabilities this session was granted (server-authoritative). Enforced on
    /// privileged endpoints. Defaults to empty for tokens issued before capabilities existed.
    #[serde(default)]
    capabilities: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct AuthCallbackData {
    pubkey: String,
    signature: String,
    message: String,
    /// Optional capability disclosures the wallet attached (e.g. a shared receiving address).
    /// Relayed verbatim to the dApp; not part of the signed message.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    disclosures: Option<serde_json::Value>,
    /// Capability ids the user approved in the wallet. Relayed to the dApp so it can decide
    /// whether to proceed, and sent to `/auth/verify` to bind only the granted set.
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    granted: Vec<String>,
    /// Capability ids the user rejected in the wallet.
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    denied: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct TxCallbackData {
    pubkey: String,
    status: String,
    signature: String,
    message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    txid: Option<String>,
}

type ChallengeStore = Arc<Mutex<HashMap<String, ChallengeMessage>>>;
type TxRequestStore = Arc<Mutex<HashMap<String, TransactionRequest>>>;
type ResponseStore = Arc<Mutex<HashMap<String, AuthCallbackData>>>;
type TxResponseStore = Arc<Mutex<HashMap<String, TxCallbackData>>>;
type WsChannels = Arc<Mutex<HashMap<String, broadcast::Sender<AuthCallbackData>>>>;
type TxWsChannels = Arc<Mutex<HashMap<String, broadcast::Sender<TxCallbackData>>>>;
/// dApp → wallet push channels, keyed by the wallet's domain-scoped pubkey. Carries the
/// transaction-request JSON the wallet should review.
type WalletWsChannels = Arc<Mutex<HashMap<String, broadcast::Sender<String>>>>;
/// Requests created while a wallet's relay socket wasn't connected, keyed by pubkey.
/// Each entry is `(request_id, request_json)` so it can be pruned once consumed/expired.
type PendingRequests = Arc<Mutex<HashMap<String, Vec<(String, String)>>>>;
/// wallet → dApp session-status push channels, keyed by session pubkey. Carries events like
/// `{"type":"disconnected"}` so a dApp learns when the wallet ends the session.
type SessionWsChannels = Arc<Mutex<HashMap<String, broadcast::Sender<String>>>>;
/// Pubkeys whose sessions the wallet has disconnected. `check_session` rejects these, and
/// they're cleared when the same identity re-authenticates.
type RevokedSessions = Arc<Mutex<std::collections::HashSet<String>>>;

#[derive(Clone)]
struct AppState {
    challenges: ChallengeStore,
    tx_requests: TxRequestStore,
    completed_responses: ResponseStore,
    tx_completed_responses: TxResponseStore,
    ws_channels: WsChannels,
    tx_ws_channels: TxWsChannels,
    wallet_channels: WalletWsChannels,
    pending_requests: PendingRequests,
    session_channels: SessionWsChannels,
    revoked: RevokedSessions,
    jwt_encoding_key: EncodingKey,
    jwt_decoding_key: DecodingKey,
}

// ─── Auth response types ───

#[derive(Serialize)]
struct ChallengeResponse {
    challenge: ChallengeMessage,
    challenge_json: String,
    callback_url: String,
    ws_url: String,
    /// Short-link fetch URL: encode `zecauth://<host>?req=<this url>` in the QR instead of
    /// the full challenge JSON — the wallet GETs it to retrieve the payload. Keeps QR codes
    /// small (low version) and reliably scannable.
    request_url: String,
}

/// Query params on `GET /auth/challenge` — the dApp declares the capabilities it wants.
#[derive(Deserialize)]
struct ChallengeQuery {
    /// Comma-separated capability ids, e.g. `signin,sign-transaction`. Default `signin`.
    #[serde(default)]
    capabilities: Option<String>,
    /// Optional per-payment cap (ZEC) for the `sign-transaction` capability.
    #[serde(default)]
    max_amount: Option<String>,
}

#[derive(Deserialize)]
struct VerifyRequest {
    pubkey: String,
    signature: String,
    message: String,
    /// Capability ids the user approved in the wallet. The server binds the intersection of
    /// (requested ∩ granted) into the session, so a rejected capability is never enforced or
    /// usable. If omitted, all requested capabilities are treated as granted (back-compat).
    #[serde(default)]
    granted: Option<Vec<String>>,
}

#[derive(Serialize)]
struct VerifyResponse {
    authenticated: bool,
    token: String,
    pubkey: String,
    domain: String,
    chain: String,
    /// The capabilities the server granted this session.
    capabilities: Vec<String>,
}

#[derive(Serialize)]
struct SessionResponse {
    valid: bool,
    pubkey: String,
    domain: String,
    chain: String,
    /// The capabilities this session holds (server-authoritative).
    capabilities: Vec<String>,
}

// ─── Transaction types ───

#[derive(Deserialize)]
struct CreateTxRequest {
    recipient: String,
    amount: String,
    #[serde(default)]
    memo: Option<String>,
    #[serde(default)]
    description: Option<String>,
    /// The dApp's session JWT. Required: the server decodes it to enforce the
    /// `sign-transaction` capability and to learn which connected wallet (domain-scoped
    /// pubkey) to push this request to over its relay socket.
    #[serde(default)]
    token: Option<String>,
}

#[derive(Serialize)]
struct TxRequestResponse {
    request: TransactionRequest,
    request_json: String,
    callback_url: String,
    ws_url: String,
}

#[derive(Deserialize)]
struct TxApprovalRequest {
    pubkey: String,
    status: String,
    signature: String,
    message: String,
    #[serde(default)]
    txid: Option<String>,
}

#[derive(Serialize)]
struct TxApprovalResponse {
    verified: bool,
    status: String,
    request_id: String,
    recipient: String,
    amount: String,
    txid: Option<String>,
    pubkey: String,
}

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

fn error_response(status: StatusCode, msg: &str) -> (StatusCode, Json<ErrorResponse>) {
    (status, Json(ErrorResponse { error: msg.to_string() }))
}

// ─── Auth handlers ───

async fn create_challenge(
    State(state): State<AppState>,
    Query(query): Query<ChallengeQuery>,
) -> Result<Json<ChallengeResponse>, (StatusCode, Json<ErrorResponse>)> {
    let domain = host();

    // The dApp declares the capabilities it wants (comma-separated). The server is the
    // authority: every requested capability MUST be in the deployment's allow-list, else we
    // refuse to mint a challenge for it.
    let requested: Vec<String> = query
        .capabilities
        .as_deref()
        .unwrap_or("signin")
        .split(',')
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .collect();

    let allowed = allowed_capabilities();
    let mut scopes = RequestedScopes::new();
    let mut seen: Vec<String> = Vec::new();
    // `signin` is implicit in every connection.
    scopes = scopes.require(Scope::Auth);
    seen.push("signin".to_string());

    for cap in &requested {
        if cap == "signin" {
            continue;
        }
        if !allowed.iter().any(|a| a == cap) {
            return Err(error_response(
                StatusCode::FORBIDDEN,
                &format!("capability_not_allowed: this app may not request \"{cap}\""),
            ));
        }
        match capability_to_scope(cap, query.max_amount.as_deref()) {
            Some(scope) if !seen.iter().any(|c| c == cap) => {
                scopes = scopes.require(scope);
                seen.push(cap.clone());
            }
            Some(_) => {} // duplicate — ignore
            None => {
                return Err(error_response(
                    StatusCode::BAD_REQUEST,
                    &format!("unknown_capability: \"{cap}\""),
                ));
            }
        }
    }

    let challenge = ChallengeMessage::with_ttl(
        domain,
        &format!("https://{domain}/dashboard"),
        network(),
        CHALLENGE_TTL_SECONDS,
    )
    .with_statement("Sign in to access the ZecAuth demo dashboard")
    .with_scopes(scopes.clone());

    let nonce = challenge.nonce.clone();
    let callback_url = format!("http://{domain}/auth/callback/{nonce}");
    let ws_url = format!("ws://{domain}/auth/ws/{nonce}");
    let request_url = format!("http://{domain}/auth/request/{nonce}");

    let challenge_json = challenge_json_for(&challenge, &callback_url);

    state.challenges.lock().unwrap().insert(nonce.clone(), challenge.clone());

    Ok(Json(ChallengeResponse {
        challenge,
        challenge_json,
        callback_url,
        ws_url,
        request_url,
    }))
}

/// Build the challenge JSON WITH callback_url + the authoritative scopes (so the wallet shows
/// the user exactly the capabilities the server approved).
fn challenge_json_for(challenge: &ChallengeMessage, callback_url: &str) -> String {
    serde_json::json!({
        "domain": challenge.domain,
        "uri": challenge.uri,
        "version": challenge.version,
        "chain": challenge.chain,
        "nonce": challenge.nonce,
        "issued_at": challenge.issued_at,
        "expiration_time": challenge.expiration_time,
        "statement": challenge.statement,
        "scopes": challenge.scopes,
        "callback_url": callback_url,
    })
    .to_string()
}

/// GET /auth/request/{nonce} — short-link resolution: the QR encodes only this URL; the
/// wallet fetches it to get the full challenge payload. Single-use nonces stay single-use:
/// the challenge is only readable while pending and unexpired.
async fn get_auth_request(
    State(state): State<AppState>,
    Path(nonce): Path<String>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<ErrorResponse>)> {
    let domain = host();
    let challenges = state.challenges.lock().unwrap();
    match challenges.get(&nonce) {
        Some(c) if c.is_expired() => Err(error_response(StatusCode::GONE, "challenge expired")),
        Some(c) => {
            let callback_url = format!("http://{domain}/auth/callback/{nonce}");
            Ok(Json(serde_json::json!({
                "kind": "auth",
                "payload": challenge_json_for(c, &callback_url),
                "callback_url": callback_url,
            })))
        }
        None => Err(error_response(StatusCode::NOT_FOUND, "nonce not found")),
    }
}

async fn verify_auth(
    State(state): State<AppState>,
    Json(req): Json<VerifyRequest>,
) -> Result<Json<VerifyResponse>, (StatusCode, Json<ErrorResponse>)> {
    let pubkey = zecauth_core::AuthPublicKey::from_hex(&req.pubkey)
        .map_err(|e| error_response(StatusCode::BAD_REQUEST, &format!("invalid pubkey: {e}")))?;

    let response = AuthResponse::from_json(&serde_json::json!({
        "pubkey": req.pubkey,
        "signature": req.signature,
        "message": req.message,
    }).to_string())
    .map_err(|e| error_response(StatusCode::BAD_REQUEST, &format!("invalid response: {e}")))?;

    let verified = zecauth_core::verify_response(&response, host(), chain_id())
        .map_err(|e| error_response(StatusCode::UNAUTHORIZED, &format!("verification failed: {e}")))?;

    // Consume the challenge and read back the capabilities it requested (authoritative — the
    // server set these). Then keep only the ones the user actually granted in the wallet, so a
    // rejected capability is never bound into the session. `signin` is always granted.
    let requested_capabilities = {
        let mut challenges = state.challenges.lock().unwrap();
        match challenges.remove(&verified.nonce) {
            Some(c) => capabilities_from_scopes(&c.scopes),
            None => {
                return Err(error_response(StatusCode::UNAUTHORIZED, "nonce not found or already consumed"));
            }
        }
    };
    let granted_capabilities: Vec<String> = match &req.granted {
        Some(granted) => requested_capabilities
            .into_iter()
            .filter(|c| c == "signin" || granted.iter().any(|g| g == c))
            .collect(),
        None => requested_capabilities, // back-compat: no grant info → all requested granted
    };

    // Also clean up relay state for this nonce
    state.completed_responses.lock().unwrap().remove(&verified.nonce);
    state.ws_channels.lock().unwrap().remove(&verified.nonce);

    // A fresh sign-in for this identity clears any earlier wallet-initiated disconnect.
    state.revoked.lock().unwrap().remove(&pubkey.to_hex());

    let now = Utc::now();
    let claims = Claims {
        sub: pubkey.to_hex(),
        domain: verified.domain.clone(),
        chain: verified.chain.clone(),
        iat: now.timestamp(),
        exp: (now + chrono::Duration::hours(24)).timestamp(),
        capabilities: granted_capabilities.clone(),
    };

    let token = encode(&Header::default(), &claims, &state.jwt_encoding_key)
        .map_err(|e| error_response(StatusCode::INTERNAL_SERVER_ERROR, &format!("JWT error: {e}")))?;

    Ok(Json(VerifyResponse {
        authenticated: true,
        token,
        pubkey: pubkey.to_hex(),
        domain: verified.domain,
        chain: verified.chain,
        capabilities: granted_capabilities,
    }))
}

async fn check_session(
    State(state): State<AppState>,
    Query(params): Query<HashMap<String, String>>,
) -> Result<Json<SessionResponse>, (StatusCode, Json<ErrorResponse>)> {
    let token = params.get("token")
        .ok_or_else(|| error_response(StatusCode::BAD_REQUEST, "missing token parameter"))?;

    let token_data = decode::<Claims>(token, &state.jwt_decoding_key, &Validation::default())
        .map_err(|e| error_response(StatusCode::UNAUTHORIZED, &format!("invalid token: {e}")))?;

    // Reject sessions the wallet has disconnected.
    if state.revoked.lock().unwrap().contains(&token_data.claims.sub) {
        return Err(error_response(StatusCode::UNAUTHORIZED, "session disconnected by wallet"));
    }

    Ok(Json(SessionResponse {
        valid: true,
        pubkey: token_data.claims.sub,
        domain: token_data.claims.domain,
        chain: token_data.claims.chain,
        capabilities: token_data.claims.capabilities,
    }))
}

// ─── WebSocket relay handlers ───

/// POST /auth/callback/{nonce} — wallet POSTs signed response here
async fn auth_callback(
    State(state): State<AppState>,
    Path(nonce): Path<String>,
    Json(payload): Json<AuthCallbackData>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<ErrorResponse>)> {
    // Verify nonce exists and isn't expired
    {
        let challenges = state.challenges.lock().unwrap();
        match challenges.get(&nonce) {
            Some(c) if c.is_expired() => {
                return Err(error_response(StatusCode::GONE, "challenge expired"));
            }
            None => {
                return Err(error_response(StatusCode::NOT_FOUND, "nonce not found"));
            }
            _ => {}
        }
    }

    if payload.pubkey.is_empty() || payload.signature.is_empty() || payload.message.is_empty() {
        return Err(error_response(StatusCode::BAD_REQUEST, "missing required fields"));
    }

    // Store for polling fallback
    state.completed_responses.lock().unwrap().insert(nonce.clone(), payload.clone());

    // Broadcast to WebSocket listeners
    if let Some(tx) = state.ws_channels.lock().unwrap().get(&nonce) {
        let _ = tx.send(payload);
    }

    Ok(Json(serde_json::json!({ "status": "received", "nonce": nonce })))
}

/// GET /auth/callback/{nonce} — polling fallback
async fn poll_auth_response(
    State(state): State<AppState>,
    Path(nonce): Path<String>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<ErrorResponse>)> {
    if let Some(data) = state.completed_responses.lock().unwrap().get(&nonce) {
        return Ok(Json(serde_json::json!({
            "status": "completed",
            "response": data,
        })));
    }

    let challenges = state.challenges.lock().unwrap();
    match challenges.get(&nonce) {
        Some(c) if c.is_expired() => Err(error_response(StatusCode::GONE, "challenge expired")),
        Some(_) => Ok(Json(serde_json::json!({ "status": "pending" }))),
        None => Err(error_response(StatusCode::NOT_FOUND, "nonce not found")),
    }
}

/// GET /auth/ws/{nonce} — WebSocket for real-time relay
async fn auth_ws(
    State(state): State<AppState>,
    Path(nonce): Path<String>,
    ws: WebSocketUpgrade,
) -> Result<impl IntoResponse, (StatusCode, Json<ErrorResponse>)> {
    // Verify nonce exists
    {
        let challenges = state.challenges.lock().unwrap();
        if !challenges.contains_key(&nonce) {
            return Err(error_response(StatusCode::NOT_FOUND, "nonce not found"));
        }
    }

    // Get or create broadcast channel
    let rx = {
        let mut channels = state.ws_channels.lock().unwrap();
        let tx = channels.entry(nonce.clone()).or_insert_with(|| broadcast::channel(4).0);
        tx.subscribe()
    };

    // Check if response already arrived (race condition)
    let existing = state.completed_responses.lock().unwrap().get(&nonce).cloned();

    Ok(ws.on_upgrade(move |socket| handle_auth_ws(socket, rx, existing)))
}

async fn handle_auth_ws(
    mut socket: WebSocket,
    mut rx: broadcast::Receiver<AuthCallbackData>,
    existing: Option<AuthCallbackData>,
) {
    // If response was already submitted before WebSocket connected, send immediately
    if let Some(data) = existing {
        if let Ok(json) = serde_json::to_string(&data) {
            let _ = socket.send(Message::Text(json.into())).await;
        }
        let _ = socket.close().await;
        return;
    }

    // Wait for the broadcast or timeout
    let timeout = tokio::time::Duration::from_secs(310); // slightly longer than challenge TTL
    tokio::select! {
        result = rx.recv() => {
            match result {
                Ok(data) => {
                    if let Ok(json) = serde_json::to_string(&data) {
                        let _ = socket.send(Message::Text(json.into())).await;
                    }
                }
                Err(_) => {
                    let _ = socket.send(Message::Text(r#"{"error":"channel closed"}"#.into())).await;
                }
            }
        }
        _ = tokio::time::sleep(timeout) => {
            let _ = socket.send(Message::Text(r#"{"error":"timeout"}"#.into())).await;
        }
        _ = async {
            // Watch for client disconnect
            while socket.recv().await.is_some() {}
        } => {
            return;
        }
    }
    let _ = socket.close().await;
}

// ─── Transaction handlers ───

async fn create_tx_request(
    State(state): State<AppState>,
    Json(req): Json<CreateTxRequest>,
) -> Result<Json<TxRequestResponse>, (StatusCode, Json<ErrorResponse>)> {
    let domain = host();

    // Authoritative capability check: requesting a transaction requires an authenticated
    // session that was granted the `sign-transaction` capability. The grant lives in the
    // server-signed JWT — a dApp cannot request payments unless its session actually holds
    // the capability, no matter what it claims client-side.
    let claims = req.token.as_ref()
        .ok_or_else(|| error_response(
            StatusCode::UNAUTHORIZED,
            "authentication_required: connect (sign in) before requesting a transaction",
        ))
        .and_then(|t| decode::<Claims>(t, &state.jwt_decoding_key, &Validation::default())
            .map(|d| d.claims)
            .map_err(|e| error_response(StatusCode::UNAUTHORIZED, &format!("invalid token: {e}"))))?;

    if state.revoked.lock().unwrap().contains(&claims.sub) {
        return Err(error_response(StatusCode::UNAUTHORIZED, "session disconnected by wallet"));
    }

    if !claims.capabilities.iter().any(|c| c == "sign-transaction") {
        return Err(error_response(
            StatusCode::FORBIDDEN,
            "capability_not_granted: this session did not request the \"sign-transaction\" capability",
        ));
    }

    let mut tx_request = TransactionRequest::new(domain, &req.recipient, &req.amount, network());
    if let Some(ref memo) = req.memo { tx_request = tx_request.with_memo(memo); }
    if let Some(ref desc) = req.description { tx_request = tx_request.with_description(desc); }

    tx_request.validate()
        .map_err(|e| error_response(StatusCode::BAD_REQUEST, &format!("invalid request: {e}")))?;

    let request_id = &tx_request.request_id;
    let callback_url = format!("http://{domain}/tx/callback/{request_id}");
    let ws_url = format!("ws://{domain}/tx/ws/{request_id}");

    // Build JSON with callback_url included (for the wallet)
    let request_json = serde_json::json!({
        "domain": tx_request.domain,
        "request_id": tx_request.request_id,
        "recipient": tx_request.recipient,
        "amount": tx_request.amount,
        "memo": tx_request.memo,
        "description": tx_request.description,
        "chain": tx_request.chain,
        "issued_at": tx_request.issued_at,
        "expiration_time": tx_request.expiration_time,
        "callback_url": callback_url,
    }).to_string();

    state.tx_requests.lock().unwrap().insert(tx_request.request_id.clone(), tx_request.clone());

    // Route the request to the connected wallet over its relay socket. The target wallet is
    // the domain-scoped pubkey from the (already-validated) session token — authoritative.
    // If the wallet isn't connected right now, queue it so it's delivered on reconnect.
    let target_pubkey = Some(claims.sub.clone());

    if let Some(pk) = target_pubkey {
        let delivered = state.wallet_channels.lock().unwrap()
            .get(&pk)
            .map(|tx| tx.send(request_json.clone()).map(|n| n > 0).unwrap_or(false))
            .unwrap_or(false);
        if !delivered {
            state.pending_requests.lock().unwrap()
                .entry(pk)
                .or_default()
                .push((tx_request.request_id.clone(), request_json.clone()));
        }
    }

    Ok(Json(TxRequestResponse { request: tx_request, request_json, callback_url, ws_url }))
}

async fn approve_tx(
    State(state): State<AppState>,
    Json(req): Json<TxApprovalRequest>,
) -> Result<Json<TxApprovalResponse>, (StatusCode, Json<ErrorResponse>)> {
    let pubkey = zecauth_core::AuthPublicKey::from_hex(&req.pubkey)
        .map_err(|e| error_response(StatusCode::BAD_REQUEST, &format!("invalid pubkey: {e}")))?;

    let approval = TransactionApproval::from_json(&serde_json::json!({
        "pubkey": req.pubkey,
        "status": req.status,
        "signature": req.signature,
        "message": req.message,
        "txid": req.txid,
    }).to_string())
    .map_err(|e| error_response(StatusCode::BAD_REQUEST, &format!("invalid approval: {e}")))?;

    let verified = approval.verify(host(), chain_id())
        .map_err(|e| error_response(StatusCode::UNAUTHORIZED, &format!("verification failed: {e}")))?;

    {
        let mut requests = state.tx_requests.lock().unwrap();
        if requests.remove(&verified.request_id).is_none() {
            return Err(error_response(StatusCode::UNAUTHORIZED, "request_id not found or already consumed"));
        }
    }

    // Drop the request from this wallet's pending queue so it isn't re-pushed on reconnect.
    if let Some(queue) = state.pending_requests.lock().unwrap().get_mut(&req.pubkey) {
        queue.retain(|(rid, _)| rid != &verified.request_id);
    }

    Ok(Json(TxApprovalResponse {
        verified: true,
        status: req.status,
        request_id: verified.request_id,
        recipient: verified.recipient,
        amount: verified.amount,
        txid: verified.txid,
        pubkey: pubkey.to_hex(),
    }))
}

async fn tx_status(
    State(state): State<AppState>,
    Path(request_id): Path<String>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<ErrorResponse>)> {
    let requests = state.tx_requests.lock().unwrap();
    match requests.get(&request_id) {
        Some(req) if req.is_expired() => Err(error_response(StatusCode::GONE, "request expired")),
        Some(req) => Ok(Json(serde_json::json!({
            "status": "pending",
            "request_id": request_id,
            "recipient": req.recipient,
            "amount": req.amount,
        }))),
        None => Err(error_response(StatusCode::NOT_FOUND, "request not found")),
    }
}

// ─── Transaction relay handlers ───

/// POST /tx/callback/{request_id} — wallet POSTs signed approval/denial here
async fn tx_callback(
    State(state): State<AppState>,
    Path(request_id): Path<String>,
    Json(payload): Json<TxCallbackData>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<ErrorResponse>)> {
    // Verify request exists and isn't expired
    {
        let requests = state.tx_requests.lock().unwrap();
        match requests.get(&request_id) {
            Some(r) if r.is_expired() => return Err(error_response(StatusCode::GONE, "request expired")),
            None => return Err(error_response(StatusCode::NOT_FOUND, "request_id not found")),
            _ => {}
        }
    }

    if payload.pubkey.is_empty() || payload.signature.is_empty() || payload.message.is_empty() {
        return Err(error_response(StatusCode::BAD_REQUEST, "missing required fields"));
    }

    // Store for polling
    state.tx_completed_responses.lock().unwrap().insert(request_id.clone(), payload.clone());

    // Broadcast to WebSocket listeners
    if let Some(tx) = state.tx_ws_channels.lock().unwrap().get(&request_id) {
        let _ = tx.send(payload);
    }

    Ok(Json(serde_json::json!({ "status": "received", "request_id": request_id })))
}

/// GET /tx/callback/{request_id} — polling fallback for tx approvals
async fn poll_tx_response(
    State(state): State<AppState>,
    Path(request_id): Path<String>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<ErrorResponse>)> {
    if let Some(data) = state.tx_completed_responses.lock().unwrap().get(&request_id) {
        return Ok(Json(serde_json::json!({
            "status": "completed",
            "response": data,
        })));
    }

    let requests = state.tx_requests.lock().unwrap();
    match requests.get(&request_id) {
        Some(r) if r.is_expired() => Err(error_response(StatusCode::GONE, "request expired")),
        Some(_) => Ok(Json(serde_json::json!({ "status": "pending" }))),
        None => Err(error_response(StatusCode::NOT_FOUND, "request not found")),
    }
}

/// WS /tx/ws/{request_id} — real-time relay for tx approvals
async fn tx_ws(
    State(state): State<AppState>,
    Path(request_id): Path<String>,
    ws: WebSocketUpgrade,
) -> Result<impl IntoResponse, (StatusCode, Json<ErrorResponse>)> {
    {
        let requests = state.tx_requests.lock().unwrap();
        if !requests.contains_key(&request_id) {
            return Err(error_response(StatusCode::NOT_FOUND, "request_id not found"));
        }
    }

    let rx = {
        let mut channels = state.tx_ws_channels.lock().unwrap();
        let tx = channels.entry(request_id.clone()).or_insert_with(|| broadcast::channel(4).0);
        tx.subscribe()
    };

    let existing = state.tx_completed_responses.lock().unwrap().get(&request_id).cloned();

    Ok(ws.on_upgrade(move |socket| handle_tx_ws(socket, rx, existing)))
}

async fn handle_tx_ws(
    mut socket: WebSocket,
    mut rx: broadcast::Receiver<TxCallbackData>,
    existing: Option<TxCallbackData>,
) {
    if let Some(data) = existing {
        if let Ok(json) = serde_json::to_string(&data) {
            let _ = socket.send(Message::Text(json.into())).await;
        }
        let _ = socket.close().await;
        return;
    }

    let timeout = tokio::time::Duration::from_secs(310);
    tokio::select! {
        result = rx.recv() => {
            match result {
                Ok(data) => {
                    if let Ok(json) = serde_json::to_string(&data) {
                        let _ = socket.send(Message::Text(json.into())).await;
                    }
                }
                Err(_) => {
                    let _ = socket.send(Message::Text(r#"{"error":"channel closed"}"#.into())).await;
                }
            }
        }
        _ = tokio::time::sleep(timeout) => {
            let _ = socket.send(Message::Text(r#"{"error":"timeout"}"#.into())).await;
        }
        _ = async { while socket.recv().await.is_some() {} } => {
            return;
        }
    }
    let _ = socket.close().await;
}

// ─── Wallet relay (dApp → wallet push) ───

/// WS /wallet/ws/{pubkey} — the wallet keeps this open per connected session. The server
/// pushes transaction-request JSON here so the wallet can review it without scanning a QR.
async fn wallet_ws(
    State(state): State<AppState>,
    Path(pubkey): Path<String>,
    ws: WebSocketUpgrade,
) -> impl IntoResponse {
    // Subscribe (creating the channel on first connect for this pubkey).
    let rx = {
        let mut channels = state.wallet_channels.lock().unwrap();
        channels.entry(pubkey.clone()).or_insert_with(|| broadcast::channel(16).0).subscribe()
    };

    // Flush any requests that arrived while the wallet was offline.
    let pending: Vec<String> = state.pending_requests.lock().unwrap()
        .remove(&pubkey)
        .map(|v| v.into_iter().map(|(_, json)| json).collect())
        .unwrap_or_default();

    ws.on_upgrade(move |socket| handle_wallet_ws(socket, rx, pending))
}

async fn handle_wallet_ws(
    mut socket: WebSocket,
    mut rx: broadcast::Receiver<String>,
    pending: Vec<String>,
) {
    // Deliver queued requests first.
    for json in pending {
        if socket.send(Message::Text(json.into())).await.is_err() {
            return;
        }
    }

    // Then stay open, forwarding every pushed request until the wallet disconnects.
    loop {
        tokio::select! {
            result = rx.recv() => {
                match result {
                    Ok(json) => {
                        if socket.send(Message::Text(json.into())).await.is_err() { break; }
                    }
                    Err(broadcast::error::RecvError::Lagged(_)) => continue,
                    Err(broadcast::error::RecvError::Closed) => break,
                }
            }
            incoming = socket.recv() => {
                match incoming {
                    Some(Ok(Message::Close(_))) | None => break,
                    Some(Ok(_)) => continue, // ignore pings / client chatter
                    Some(Err(_)) => break,
                }
            }
        }
    }
    let _ = socket.close().await;
}

// ─── Session lifecycle (wallet-initiated disconnect → dApp) ───

#[derive(Deserialize)]
struct DisconnectRequest {
    /// The domain-scoped session pubkey the wallet is disconnecting.
    pubkey: String,
    #[serde(default)]
    domain: Option<String>,
}

/// POST /wallet/disconnect — the wallet ends a session. Marks it revoked, stops pushing
/// requests to it, and notifies any dApp watching over its session-status socket.
async fn wallet_disconnect(
    State(state): State<AppState>,
    Json(req): Json<DisconnectRequest>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<ErrorResponse>)> {
    if req.pubkey.is_empty() {
        return Err(error_response(StatusCode::BAD_REQUEST, "missing pubkey"));
    }

    state.revoked.lock().unwrap().insert(req.pubkey.clone());
    // Stop routing future requests to this wallet identity.
    state.wallet_channels.lock().unwrap().remove(&req.pubkey);
    state.pending_requests.lock().unwrap().remove(&req.pubkey);

    // Push the disconnect to any dApp listening for this session.
    let event = serde_json::json!({
        "type": "disconnected",
        "pubkey": req.pubkey,
        "domain": req.domain,
    }).to_string();
    if let Some(tx) = state.session_channels.lock().unwrap().get(&req.pubkey) {
        let _ = tx.send(event);
    }

    Ok(Json(serde_json::json!({ "status": "disconnected", "pubkey": req.pubkey })))
}

/// WS /session/ws/{pubkey} — the dApp keeps this open to learn when the wallet disconnects.
async fn session_ws(
    State(state): State<AppState>,
    Path(pubkey): Path<String>,
    ws: WebSocketUpgrade,
) -> impl IntoResponse {
    let already_revoked = state.revoked.lock().unwrap().contains(&pubkey);
    let rx = {
        let mut channels = state.session_channels.lock().unwrap();
        channels.entry(pubkey.clone()).or_insert_with(|| broadcast::channel(8).0).subscribe()
    };
    ws.on_upgrade(move |socket| handle_session_ws(socket, rx, already_revoked, pubkey))
}

async fn handle_session_ws(
    mut socket: WebSocket,
    mut rx: broadcast::Receiver<String>,
    already_revoked: bool,
    pubkey: String,
) {
    // If the session was already disconnected before the dApp connected, say so immediately.
    if already_revoked {
        let event = serde_json::json!({ "type": "disconnected", "pubkey": pubkey }).to_string();
        let _ = socket.send(Message::Text(event.into())).await;
        let _ = socket.close().await;
        return;
    }

    loop {
        tokio::select! {
            result = rx.recv() => {
                match result {
                    Ok(json) => {
                        let _ = socket.send(Message::Text(json.into())).await;
                        break; // a disconnect event is terminal
                    }
                    Err(broadcast::error::RecvError::Lagged(_)) => continue,
                    Err(broadcast::error::RecvError::Closed) => break,
                }
            }
            incoming = socket.recv() => {
                match incoming {
                    Some(Ok(Message::Close(_))) | None => break,
                    Some(Ok(_)) => continue,
                    Some(Err(_)) => break,
                }
            }
        }
    }
    let _ = socket.close().await;
}

// ─── Utils ───

async fn health() -> &'static str { "ok" }

// ─── Main ───

#[tokio::main]
async fn main() {
    let state = AppState {
        challenges: Arc::new(Mutex::new(HashMap::new())),
        tx_requests: Arc::new(Mutex::new(HashMap::new())),
        completed_responses: Arc::new(Mutex::new(HashMap::new())),
        tx_completed_responses: Arc::new(Mutex::new(HashMap::new())),
        ws_channels: Arc::new(Mutex::new(HashMap::new())),
        tx_ws_channels: Arc::new(Mutex::new(HashMap::new())),
        wallet_channels: Arc::new(Mutex::new(HashMap::new())),
        pending_requests: Arc::new(Mutex::new(HashMap::new())),
        session_channels: Arc::new(Mutex::new(HashMap::new())),
        revoked: Arc::new(Mutex::new(std::collections::HashSet::new())),
        jwt_encoding_key: EncodingKey::from_secret(JWT_SECRET.as_bytes()),
        jwt_decoding_key: DecodingKey::from_secret(JWT_SECRET.as_bytes()),
    };

    // Cleanup task
    let challenges_clone = state.challenges.clone();
    let tx_clone = state.tx_requests.clone();
    let responses_clone = state.completed_responses.clone();
    let channels_clone = state.ws_channels.clone();
    let tx_responses_clone = state.tx_completed_responses.clone();
    let tx_channels_clone = state.tx_ws_channels.clone();
    let wallet_channels_clone = state.wallet_channels.clone();
    let pending_clone = state.pending_requests.clone();
    let session_channels_clone = state.session_channels.clone();
    tokio::spawn(async move {
        loop {
            tokio::time::sleep(std::time::Duration::from_secs(30)).await;
            challenges_clone.lock().unwrap().retain(|_, c| !c.is_expired());
            tx_clone.lock().unwrap().retain(|_, r| !r.is_expired());
            let active_auth: std::collections::HashSet<String> =
                challenges_clone.lock().unwrap().keys().cloned().collect();
            responses_clone.lock().unwrap().retain(|k, _| active_auth.contains(k));
            channels_clone.lock().unwrap().retain(|k, _| active_auth.contains(k));
            let active_tx: std::collections::HashSet<String> =
                tx_clone.lock().unwrap().keys().cloned().collect();
            tx_responses_clone.lock().unwrap().retain(|k, _| active_tx.contains(k));
            tx_channels_clone.lock().unwrap().retain(|k, _| active_tx.contains(k));
            // Drop queued requests whose tx expired, and idle wallet channels (no listeners).
            pending_clone.lock().unwrap().retain(|_, q| {
                q.retain(|(rid, _)| active_tx.contains(rid));
                !q.is_empty()
            });
            wallet_channels_clone.lock().unwrap().retain(|_, tx| tx.receiver_count() > 0);
            session_channels_clone.lock().unwrap().retain(|_, tx| tx.receiver_count() > 0);
        }
    });

    let app = Router::new()
        // Auth
        .route("/auth/challenge", get(create_challenge))
        .route("/auth/request/{nonce}", get(get_auth_request))
        .route("/auth/verify", post(verify_auth))
        .route("/auth/session", get(check_session))
        // Relay
        .route("/auth/callback/{nonce}", get(poll_auth_response).post(auth_callback))
        .route("/auth/ws/{nonce}", get(auth_ws))
        // Transactions
        .route("/tx/request", post(create_tx_request))
        .route("/tx/approve", post(approve_tx))
        .route("/tx/status/{request_id}", get(tx_status))
        // Transaction relay
        .route("/tx/callback/{request_id}", get(poll_tx_response).post(tx_callback))
        .route("/tx/ws/{request_id}", get(tx_ws))
        // Wallet relay (server → connected wallet push)
        .route("/wallet/ws/{pubkey}", get(wallet_ws))
        // Session lifecycle (wallet → dApp disconnect)
        .route("/wallet/disconnect", post(wallet_disconnect))
        .route("/session/ws/{pubkey}", get(session_ws))
        // Misc
        .route("/health", get(health))
        .fallback_service(ServeDir::new("demo-dapp/dist").fallback(tower_http::services::ServeFile::new("demo-dapp/dist/index.html")))
        .layer(CorsLayer::permissive())
        .with_state(state);

    let addr = "0.0.0.0:3000";
    println!("ZecAuth demo server listening on {addr} (all interfaces)");
    println!("Advertised host: {} — set ZECAUTH_HOST to your LAN IP for physical devices", host());
    println!("Network: {} — set ZECAUTH_NETWORK=testnet to run the demo on testnet", network());
    println!();
    println!("Endpoints:");
    println!("  Auth:");
    println!("    GET  /auth/challenge            — generate challenge");
    println!("    POST /auth/verify               — verify signed response");
    println!("    GET  /auth/session?token=       — validate JWT");
    println!("  Relay:");
    println!("    POST /auth/callback/{{nonce}}     — wallet submits response");
    println!("    GET  /auth/callback/{{nonce}}     — poll for response");
    println!("    WS   /auth/ws/{{nonce}}           — real-time relay");
    println!("  Transactions:");
    println!("    POST /tx/request                — create tx request (pushes to wallet)");
    println!("    POST /tx/approve                — submit approval");
    println!("    GET  /tx/status/{{request_id}}    — check status");
    println!("  Wallet relay:");
    println!("    WS   /wallet/ws/{{pubkey}}        — wallet receives pushed requests");
    println!("    POST /wallet/disconnect         — wallet ends a session");
    println!("    WS   /session/ws/{{pubkey}}       — dApp learns of disconnect");
    println!();
    println!("Open http://{} in your browser for the demo.", host());

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
