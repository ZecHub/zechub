//! Steward CLI — the dev/demo driver.
//!
//! Most lifecycle subcommands (`vault create`, `guardian add`, `spend`, `recover`,
//! `inherit`) still land across later phases. What ships now is the **heartbeat signing
//! helper** the demo script and the cross-implementation proof rely on: it lets a shell
//! script produce a *real* Ed25519 proof-of-life over the canonical message, so the
//! coordinator's signed-heartbeat verification can be exercised end-to-end without a
//! browser. It links only `steward-core` (no isolated signer stack).
//!
//! ```text
//! steward heartbeat-sign   --sk <hex32> --vault <id> --time <unix>   # -> sig hex (64 bytes)
//! steward heartbeat-pubkey --sk <hex32>                              # -> pubkey hex (32 bytes)
//! steward heartbeat-verify --pk <hex32> --vault <id> --time <unix> --sig <hex64>  # -> ok / bad (exit 0/1)
//! ```

use std::process::ExitCode;

use steward_core::heartbeat;

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
    let cmd = args.first().map(String::as_str);
    let rest = &args[args.len().min(1)..];

    match cmd {
        Some("heartbeat-sign") => run(rest, heartbeat_sign),
        Some("heartbeat-pubkey") => run(rest, heartbeat_pubkey),
        Some("heartbeat-verify") => run(rest, heartbeat_verify),
        Some("-h") | Some("--help") | Some("help") | None => {
            eprint!("{USAGE}");
            ExitCode::SUCCESS
        }
        Some(other) => {
            eprintln!("steward: unknown subcommand `{other}`\n\n{USAGE}");
            ExitCode::FAILURE
        }
    }
}

const USAGE: &str = "\
steward — Steward dev/demo driver

USAGE:
  steward heartbeat-sign   --sk <hex32> --vault <id> --time <unix>
      Sign a proof-of-life over `steward-heartbeat-v1 || vault_id || time(be u64)`.
      Prints the 64-byte Ed25519 signature as hex.

  steward heartbeat-pubkey --sk <hex32>
      Derive the 32-byte Ed25519 heartbeat public key from a secret seed. Prints hex.

  steward heartbeat-verify --pk <hex32> --vault <id> --time <unix> --sig <hex64>
      Verify a heartbeat signature. Prints `ok`/`bad`; exits 0 on valid, 1 on invalid.
";

/// Run a subcommand, mapping an `Err(message)` to a clean stderr line + failure exit.
fn run(args: &[String], f: impl Fn(&[String]) -> Result<String, String>) -> ExitCode {
    match f(args) {
        Ok(out) => {
            println!("{out}");
            ExitCode::SUCCESS
        }
        Err(e) => {
            eprintln!("steward: {e}");
            ExitCode::FAILURE
        }
    }
}

fn heartbeat_sign(args: &[String]) -> Result<String, String> {
    let sk = flag(args, "--sk")?;
    let vault = flag(args, "--vault")?;
    let time = parse_time(&flag(args, "--time")?)?;
    heartbeat::sign_heartbeat_hex(&sk, &vault, time).map_err(|e| e.to_string())
}

fn heartbeat_pubkey(args: &[String]) -> Result<String, String> {
    let sk = flag(args, "--sk")?;
    heartbeat::public_key_hex(&sk).map_err(|e| e.to_string())
}

fn heartbeat_verify(args: &[String]) -> Result<String, String> {
    let pk = flag(args, "--pk")?;
    let vault = flag(args, "--vault")?;
    let time = parse_time(&flag(args, "--time")?)?;
    let sig = flag(args, "--sig")?;
    if heartbeat::verify_heartbeat_hex(&pk, &vault, time, &sig) {
        Ok("ok".to_string())
    } else {
        Err("bad — signature does not verify against the given pubkey/vault/time".to_string())
    }
}

/// Extract `--name <value>` from a flat arg list (order-independent).
fn flag(args: &[String], name: &str) -> Result<String, String> {
    args.iter()
        .position(|a| a == name)
        .and_then(|i| args.get(i + 1))
        .cloned()
        .ok_or_else(|| format!("missing required flag `{name} <value>`"))
}

fn parse_time(s: &str) -> Result<u64, String> {
    s.parse::<u64>()
        .map_err(|_| format!("`--time` must be a unix-seconds integer, got `{s}`"))
}
