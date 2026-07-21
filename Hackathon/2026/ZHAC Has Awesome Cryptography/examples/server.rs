//! ZHAC challenge-response auth server.
//!
//! POST a JSON auth token to `/verify`. Checks signature, timestamp
//! freshness, and nonce replay. No chain-state check (lightweight).
//!
//! Run: cargo run --example challenge_server
//!
//! Test:
//!   zhac auth-challenge -k priv.txt -p pub.txt -o token.json --mock
//!   curl -d @token.json http://127.0.0.1:7878/verify

use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::sync::{Arc, Mutex};
use std::time::{SystemTime, UNIX_EPOCH};

const TOLERANCE: u64 = 300; // 5 minutes

fn handle(mut s: TcpStream, cache: &Mutex<zhac::auth::NonceCache>) {
    let mut b = [0u8; 8192];
    let n = s.read(&mut b).unwrap_or(0);
    let body = String::from_utf8_lossy(&b[..n])
        .split("\r\n\r\n").nth(1).unwrap_or("{}").to_string();

    let (ok, msg) = match zhac::auth::AuthToken::from_json(&body) {
        Ok(t) => {
            let now = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs();
            if t.challenge.timestamp.abs_diff(now) > TOLERANCE {
                (false, "stale challenge")
            } else if !t.verify_signature_only().unwrap_or(false) {
                (false, "bad signature")
            } else if !cache.lock().unwrap().check_and_insert(&t.challenge.nonce) {
                (false, "replay detected")
            } else {
                (true, "authenticated")
            }
        }
        Err(_) => (false, "bad json"),
    };

    let j = format!(r#"{{"ok":{},"msg":"{}"}}"#, ok, msg);
    let h = format!("HTTP/1.1 200 OK\r\nContent-Length: {}\r\n\r\n{}", j.len(), j);
    let _ = s.write_all(h.as_bytes());
}

fn main() {
    let l = TcpListener::bind("127.0.0.1:7878").unwrap();
    let c = Arc::new(Mutex::new(zhac::auth::NonceCache::new()));
    println!("Challenge server on http://127.0.0.1:7878");
    for s in l.incoming().flatten() {
        let c2 = c.clone();
        std::thread::spawn(move || handle(s, &c2));
    }
}
