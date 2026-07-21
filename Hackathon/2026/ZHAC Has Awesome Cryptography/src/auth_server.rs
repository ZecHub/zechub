//! Zcash Login demo server — a minimal HTTP server that accepts Zcash Login tokens.
//!
//! Run with `zhac auth-server` (default port 3598). Opens a browser-like
//! terminal UI where users paste an auth token created by `zhac auth-challenge`.
//! The server verifies the token against the live Zcash mainnet via
//! LightwalletD and shows the result.

use std::io::{Read, Write};
use std::net::TcpListener;

use crate::auth::{AuthToken, NonceCache};
use crate::lightwalletd::LightwalletdClient;
use crate::{Result, ZhacError};

const DEFAULT_PORT: u16 = 3598;

/// Start the auth server.
pub fn run(port: Option<u16>) -> Result<()> {
    let port = port.unwrap_or(DEFAULT_PORT);
    let endpoint = crate::chain::require_node()?;

    eprintln!("╔══════════════════════════════════════════════════════════════╗");
    eprintln!("║          ZHAC Auth Server — Zcash Login Demo                  ║");
    eprintln!("╚══════════════════════════════════════════════════════════════╝");
    eprintln!();
    eprintln!("  Endpoint:  {endpoint}");
    eprintln!("  Port:      {port}");
    eprintln!();

    // Test connection
    eprint!("Connecting to LightwalletD... ");
    let client = LightwalletdClient::new(&endpoint)?;
    let info = client.get_chain_info()?;
    eprintln!("OK ({} at block {})", info.chain, info.blocks);
    eprintln!();
    eprintln!("  Open http://127.0.0.1:{port} in your browser");
    eprintln!();
    eprintln!("  How to log in:");
    eprintln!("    1. Generate keys:  zhac gen-key -o priv.txt -p pub.txt");
    eprintln!("    2. Create token:   zhac auth-challenge -k priv.txt -p pub.txt -o token.json");
    eprintln!("    3. Paste token.json contents into the browser");
    eprintln!();
    eprintln!("  Press Ctrl+C to stop.");
    eprintln!();

    let listener = TcpListener::bind(format!("127.0.0.1:{port}"))
        .map_err(|e| ZhacError::Crypto(format!("bind 127.0.0.1:{port}: {e}")))?;

    let client = std::sync::Arc::new(client);
    let nonce_cache_path = crate::chain::config_dir()?.join("nonces.json");

    for stream in listener.incoming() {
        let stream = match stream {
            Ok(s) => s,
            Err(e) => {
                eprintln!("Connection error: {e}");
                continue;
            }
        };
        let client = client.clone();
        let nc_path = nonce_cache_path.clone();
        std::thread::spawn(move || {
            if let Err(e) = handle_request(stream, &client, &nc_path) {
                eprintln!("Request error: {e}");
            }
        });
    }
    Ok(())
}

fn handle_request(
    mut stream: std::net::TcpStream,
    client: &std::sync::Arc<LightwalletdClient>,
    _nonce_cache_path: &std::path::Path,
) -> Result<()> {
    let mut buf = [0u8; 65536];
    let n = stream.read(&mut buf)
        .map_err(|e| ZhacError::Crypto(format!("read request: {e}")))?;
    if n == 0 {
        return Ok(());
    }
    let request = String::from_utf8_lossy(&buf[..n]);
    let (method, path, body) = parse_http(&request);

    let response = match (method.as_str(), path.as_str()) {
        ("GET", "/") | ("GET", "/index.html") => {
            html_response(FRONTEND_HTML)
        }
        ("GET", "/api/chain-info") => {
            match client.get_chain_info() {
                Ok(info) => json_response(serde_json::json!({
                    "chain": info.chain,
                    "blocks": info.blocks,
                    "best_block_hash": info.best_block_hash,
                    "server_version": info.server_version,
                    "subversion": info.subversion,
                })),
                Err(e) => json_error(503, &format!("{e}")),
            }
        }
        ("POST", "/api/verify") => {
            if body.is_empty() {
                json_error(400, "empty body")
            } else {
                match AuthToken::from_json(&body) {
                    Ok(token) => {
                        let mut nonce_cache = NonceCache::open()?;
                        match token.verify(client, &mut nonce_cache) {
                            Ok(result) => json_response(serde_json::json!({
                                "authenticated": result.valid,
                                "key_id": result.key_id,
                                "chain": result.chain,
                                "node_height": result.node_height,
                                "reason": result.reason,
                            })),
                            Err(e) => json_error(500, &format!("verification error: {e}")),
                        }
                    }
                    Err(e) => json_error(400, &format!("invalid token: {e}")),
                }
            }
        }
        _ => {
            html_response(format!("404 — Not Found\n\n{method} {path}"))
        }
    };

    stream.write_all(response.as_bytes())
        .map_err(|e| ZhacError::Crypto(format!("write response: {e}")))?;
    Ok(())
}

fn parse_http(request: &str) -> (String, String, String) {
    let mut lines = request.lines();
    let request_line = lines.next().unwrap_or("");
    let parts: Vec<&str> = request_line.split_whitespace().collect();
    let method = parts.first().unwrap_or(&"").to_string();
    let path = parts.get(1).unwrap_or(&"").to_string();

    // Find body (after \r\n\r\n)
    let body = if let Some(idx) = request.find("\r\n\r\n") {
        request[idx + 4..].to_string()
    } else {
        String::new()
    };

    (method, path, body)
}

fn html_response(body: impl AsRef<str>) -> String {
    let body = body.as_ref();
    format!(
        "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{}",
        body.len(), body
    )
}

fn json_response(json: serde_json::Value) -> String {
    let body = serde_json::to_string(&json).unwrap_or_else(|_| "{}".into());
    format!(
        "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{}",
        body.len(), body
    )
}

fn json_error(code: u16, msg: &str) -> String {
    let body = serde_json::json!({ "error": msg }).to_string();
    format!(
        "HTTP/1.1 {} Error\r\nContent-Type: application/json\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{}",
        code, body.len(), body
    )
}

// ── Embedded frontend ──────────────────────────────────────────────────────

const FRONTEND_HTML: &str = r#"<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ZHAC — Zcash Login</title>
<style>
  :root {
    --bg: #0a0e1a;
    --bg2: #111726;
    --border: #1f2b45;
    --text: #d4d9e8;
    --purple: #CFB2FF;
    --gold: #F7B500;
    --green: #00ff88;
    --red: #ff4466;
    --dim: #667;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'SF Mono', 'Cascadia Code', 'Fira Code', monospace;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .container {
    max-width: 680px;
    width: 100%;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 36px;
    box-shadow: 0 0 80px rgba(207,178,255,0.06);
  }
  header { text-align: center; margin-bottom: 28px; }
  .logo {
    font-size: 42px;
    font-weight: bold;
    letter-spacing: 6px;
    color: var(--purple);
    text-shadow: 0 0 30px rgba(207,178,255,0.3);
  }
  .tagline {
    color: var(--dim);
    font-size: 13px;
    margin-top: 8px;
    letter-spacing: 1px;
  }
  .chain-bar {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 18px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
  }
  .chain-bar .label { color: var(--dim); }
  .chain-bar .value { color: var(--gold); font-weight: bold; }
  .pulse {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: var(--green);
    border-radius: 50%;
    margin-right: 8px;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  .steps {
    background: var(--bg);
    border-radius: 8px;
    padding: 16px 20px;
    margin-bottom: 20px;
    font-size: 12px;
    line-height: 1.8;
    color: var(--dim);
  }
  .steps code {
    color: var(--gold);
    background: rgba(247,181,0,0.08);
    padding: 1px 6px;
    border-radius: 3px;
    font-size: 11px;
  }
  .steps .step-num { color: var(--purple); font-weight: bold; }
  textarea {
    width: 100%;
    height: 140px;
    background: var(--bg);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px;
    font-family: inherit;
    font-size: 12px;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s;
  }
  textarea:focus { border-color: var(--purple); }
  textarea::placeholder { color: #445; }
  .btn-row { display: flex; gap: 10px; margin-top: 14px; }
  button {
    flex: 1;
    background: var(--purple);
    color: var(--bg);
    border: none;
    padding: 13px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 1px;
    transition: all 0.2s;
  }
  button:hover { background: var(--gold); transform: translateY(-1px); }
  button:active { transform: translateY(0); }
  button.secondary {
    background: transparent;
    color: var(--dim);
    border: 1px solid var(--border);
    flex: 0 0 auto;
    padding: 13px 18px;
  }
  button.secondary:hover { border-color: var(--purple); color: var(--purple); }
  .result {
    margin-top: 20px;
    border-radius: 8px;
    padding: 18px;
    font-size: 13px;
    line-height: 1.6;
    display: none;
  }
  .result.show { display: block; }
  .result.success {
    background: rgba(0,255,136,0.08);
    border: 1px solid rgba(0,255,136,0.3);
  }
  .result.fail {
    background: rgba(255,68,102,0.08);
    border: 1px solid rgba(255,68,102,0.3);
  }
  .result .status { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
  .result.success .status { color: var(--green); }
  .result.fail .status { color: var(--red); }
  .result .detail { color: var(--dim); font-size: 12px; }
  .result .detail span { color: var(--text); }
  footer { text-align: center; margin-top: 24px; font-size: 11px; color: #334; }
  footer a { color: var(--dim); text-decoration: none; }
</style>
</head>
<body>
<div class="container">
  <header>
    <div class="logo">ZHAC</div>
    <div class="tagline">Zcash Login — Your shielded address is your identity</div>
  </header>

  <div class="chain-bar" id="chain-bar">
    <span><span class="pulse"></span><span class="label">Chain</span> <span class="value" id="chain-name">connecting...</span></span>
    <span><span class="label">Block</span> <span class="value" id="chain-block">...</span></span>
    <span><span class="label">Server</span> <span class="value" id="chain-server">...</span></span>
  </div>

  <div class="steps">
    <span class="step-num">1.</span> Generate keys: <code>zhac gen-key -o priv.txt -p pub.txt</code><br>
    <span class="step-num">2.</span> Create token: <code>zhac auth-challenge -k priv.txt -p pub.txt -o token.json</code><br>
    <span class="step-num">3.</span> Paste <code>token.json</code> contents below and click Login
  </div>

  <textarea id="token" placeholder='Paste your auth token JSON here...'></textarea>
  <div class="btn-row">
    <button onclick="login()">Login with Zcash</button>
    <button class="secondary" onclick="clearAll()">Clear</button>
  </div>

  <div class="result" id="result"></div>

  <footer>
    <a href="https://zechub.wiki/hackathon" target="_blank">ZecHub Hackathon 3.0</a>
    &nbsp;|&nbsp; Built on Sapling primitives — Jubjub / RedJubjub / ChaCha20Poly1305
  </footer>
</div>

<script>
async function loadChainInfo() {
  try {
    const r = await fetch('/api/chain-info');
    const d = await r.json();
    document.getElementById('chain-name').textContent = d.chain;
    document.getElementById('chain-block').textContent = d.blocks.toLocaleString();
    document.getElementById('chain-server').textContent = d.server_version;
  } catch(e) {
    document.getElementById('chain-name').textContent = 'offline';
  }
}

async function login() {
  const token = document.getElementById('token').value.trim();
  const el = document.getElementById('result');
  if (!token) { showResult(false, 'No token provided', 'Paste your token.json contents first.'); return; }

  el.className = 'result';
  el.innerHTML = '<span class="status" style="color:var(--gold)">Verifying...</span>';
  el.classList.add('show');

  try {
    const r = await fetch('/api/verify', { method: 'POST', body: token });
    const d = await r.json();
    if (d.authenticated) {
      showResult(true, 'AUTHENTICATED', `
        Key ID: <span>${d.key_id}</span><br>
        Chain: <span>${d.chain}</span><br>
        Block: <span>${d.node_height.toLocaleString()}</span><br>
        Reason: <span>${d.reason}</span>
      `);
    } else {
      showResult(false, 'AUTHENTICATION FAILED', `Reason: <span>${d.reason || d.error || 'unknown'}</span>`);
    }
  } catch(e) {
    showResult(false, 'ERROR', e.message);
  }
}

function showResult(ok, status, detail) {
  const el = document.getElementById('result');
  el.className = 'result show ' + (ok ? 'success' : 'fail');
  el.innerHTML = `<div class="status">${status}</div><div class="detail">${detail}</div>`;
}

function clearAll() {
  document.getElementById('token').value = '';
  document.getElementById('result').className = 'result';
  document.getElementById('result').innerHTML = '';
}

loadChainInfo();
setInterval(loadChainInfo, 30000);
</script>
</body>
</html>"#;
