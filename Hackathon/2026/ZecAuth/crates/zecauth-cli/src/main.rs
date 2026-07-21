use clap::{Parser, Subcommand};
use std::fs;
use std::path::PathBuf;
use zecauth_core::{AuthKeyPair, AuthResponse, ChallengeMessage, Network, TransactionRequest, TransactionApproval};

/// ZecAuth CLI — demo wallet for the ZecAuth protocol
#[derive(Parser)]
#[command(name = "zecauth", version, about)]
struct Cli {
    /// Path to the wallet seed file (default: ~/.zecauth/seed.hex)
    #[arg(long, global = true)]
    seed_file: Option<PathBuf>,

    /// Network (mainnet or testnet)
    #[arg(long, global = true, default_value = "mainnet")]
    network: String,

    /// Account index
    #[arg(long, global = true, default_value = "0")]
    account: u32,

    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Initialize a new wallet (generate a random seed)
    Init,

    /// Show the wallet's ZecAuth public key (identity)
    Pubkey,

    /// Sign a challenge from a dApp
    Sign {
        /// Challenge JSON (from the dApp's /auth/challenge endpoint)
        #[arg(long)]
        challenge: Option<String>,

        /// URL to fetch the challenge from
        #[arg(long)]
        url: Option<String>,
    },

    /// Approve or deny a transaction request from a dApp
    ApproveTx {
        /// Transaction request JSON
        #[arg(long)]
        request: Option<String>,

        /// URL to fetch the transaction request from
        #[arg(long)]
        url: Option<String>,
    },

    /// Full demo: generate a challenge, sign it, verify it (self-test)
    Demo {
        /// Domain to use in the demo challenge
        #[arg(long, default_value = "demo.zecauth.dev")]
        domain: String,
    },
}

fn default_seed_path() -> PathBuf {
    dirs::home_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join(".zecauth")
        .join("seed.hex")
}

fn load_seed(path: &PathBuf) -> Result<Vec<u8>, String> {
    let hex_str = fs::read_to_string(path)
        .map_err(|e| format!("cannot read seed file {}: {e}", path.display()))?;
    hex::decode(hex_str.trim())
        .map_err(|e| format!("invalid hex in seed file: {e}"))
}

fn save_seed(path: &PathBuf, seed: &[u8]) -> Result<(), String> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)
            .map_err(|e| format!("cannot create directory {}: {e}", parent.display()))?;
    }
    fs::write(path, hex::encode(seed))
        .map_err(|e| format!("cannot write seed file: {e}"))
}

fn parse_network(s: &str) -> Result<Network, String> {
    s.parse::<Network>()
        .map_err(|e| format!("{e}"))
}

fn load_keypair(cli: &Cli) -> Result<AuthKeyPair, String> {
    let seed_path = cli.seed_file.clone().unwrap_or_else(default_seed_path);
    let seed = load_seed(&seed_path)?;
    let network = parse_network(&cli.network)?;
    AuthKeyPair::from_seed(&seed, network, cli.account)
        .map_err(|e| format!("key derivation failed: {e}"))
}

fn main() {
    let cli = Cli::parse();

    let result = match &cli.command {
        Commands::Init => cmd_init(&cli),
        Commands::Pubkey => cmd_pubkey(&cli),
        Commands::Sign { challenge, url } => cmd_sign(&cli, challenge.as_deref(), url.as_deref()),
        Commands::ApproveTx { request, url } => cmd_approve_tx(&cli, request.as_deref(), url.as_deref()),
        Commands::Demo { domain } => cmd_demo(&cli, domain),
    };

    if let Err(e) = result {
        eprintln!("error: {e}");
        std::process::exit(1);
    }
}

fn cmd_init(cli: &Cli) -> Result<(), String> {
    let seed_path = cli.seed_file.clone().unwrap_or_else(default_seed_path);

    if seed_path.exists() {
        return Err(format!(
            "seed file already exists at {}. Delete it first to reinitialize.",
            seed_path.display()
        ));
    }

    let mut seed = [0u8; 32];
    rand::RngCore::fill_bytes(&mut rand::rngs::OsRng, &mut seed);

    save_seed(&seed_path, &seed)?;

    let network = parse_network(&cli.network)?;
    let kp = AuthKeyPair::from_seed(&seed, network, cli.account)
        .map_err(|e| format!("key derivation failed: {e}"))?;

    println!("Wallet initialized.");
    println!("  Seed file:  {}", seed_path.display());
    println!("  Network:    {}", cli.network);
    println!("  Account:    {}", cli.account);
    println!("  Public key: {}", kp.public_key().to_hex());
    println!();
    println!("IMPORTANT: Keep your seed file safe. It is the root of your ZecAuth identity.");

    Ok(())
}

fn cmd_pubkey(cli: &Cli) -> Result<(), String> {
    let kp = load_keypair(cli)?;
    println!("{}", kp.public_key().to_hex());
    Ok(())
}

fn cmd_sign(cli: &Cli, challenge_json: Option<&str>, url: Option<&str>) -> Result<(), String> {
    let challenge_str = match (challenge_json, url) {
        (Some(json), _) => json.to_string(),
        (_, Some(fetch_url)) => {
            eprintln!("Fetching challenge from {fetch_url}...");
            reqwest::blocking::get(fetch_url)
                .map_err(|e| format!("HTTP request failed: {e}"))?
                .text()
                .map_err(|e| format!("failed to read response body: {e}"))?
        }
        (None, None) => {
            return Err("provide either --challenge (JSON string) or --url (fetch URL)".into());
        }
    };

    let challenge = ChallengeMessage::from_json(&challenge_str)
        .map_err(|e| format!("invalid challenge: {e}"))?;

    // Derive a domain-scoped key — different pubkey per dApp, no cross-dApp correlation.
    let seed_path = cli.seed_file.clone().unwrap_or_else(default_seed_path);
    let seed = load_seed(&seed_path)?;
    let network = parse_network(&cli.network)?;
    let kp = AuthKeyPair::from_seed_for_domain(&seed, network, cli.account, &challenge.domain)
        .map_err(|e| format!("key derivation failed: {e}"))?;
    eprintln!("(using domain-scoped identity for {})", challenge.domain);

    // Display challenge to user for approval
    println!("=== ZecAuth Challenge ===");
    println!();
    println!("{challenge}");
    println!();
    println!("Sign this challenge? [Y/n] ");

    let mut input = String::new();
    std::io::stdin()
        .read_line(&mut input)
        .map_err(|e| format!("failed to read input: {e}"))?;

    let input = input.trim().to_lowercase();
    if !input.is_empty() && input != "y" && input != "yes" {
        return Err("challenge rejected by user".into());
    }

    let response = AuthResponse::sign(&kp, &challenge);
    let json = response.to_json().map_err(|e| format!("{e}"))?;

    println!();
    println!("=== Signed Response ===");
    println!("{json}");

    // Check if challenge JSON contains a callback_url
    let callback_url: Option<String> = serde_json::from_str::<serde_json::Value>(&challenge_str)
        .ok()
        .and_then(|v| v.get("callback_url").and_then(|u| u.as_str().map(String::from)));

    if let Some(url) = callback_url {
        println!();
        println!("Callback URL detected: {url}");
        println!("Submit response automatically? [Y/n] ");

        let mut cb_input = String::new();
        std::io::stdin()
            .read_line(&mut cb_input)
            .map_err(|e| format!("failed to read input: {e}"))?;
        let cb_input = cb_input.trim().to_lowercase();

        if cb_input.is_empty() || cb_input == "y" || cb_input == "yes" {
            let client = reqwest::blocking::Client::new();
            let res = client.post(&url)
                .header("Content-Type", "application/json")
                .body(json.clone())
                .send()
                .map_err(|e| format!("callback POST failed: {e}"))?;

            if res.status().is_success() {
                println!("Response submitted to dApp successfully!");
                println!("The browser should update automatically.");
            } else {
                let body = res.text().unwrap_or_default();
                eprintln!("Callback failed ({}): {body}", body);
                println!("You can still copy the response JSON above and paste it manually.");
            }
        }
    } else {
        println!();
        println!("Response ready. Copy the JSON above and send it to the dApp's /auth/verify endpoint.");
    }

    Ok(())
}

fn cmd_approve_tx(cli: &Cli, request_json: Option<&str>, url: Option<&str>) -> Result<(), String> {
    let request_str = match (request_json, url) {
        (Some(json), _) => json.to_string(),
        (_, Some(fetch_url)) => {
            eprintln!("Fetching transaction request from {fetch_url}...");
            reqwest::blocking::get(fetch_url)
                .map_err(|e| format!("HTTP request failed: {e}"))?
                .text()
                .map_err(|e| format!("failed to read response body: {e}"))?
        }
        (None, None) => {
            return Err("provide either --request (JSON string) or --url (fetch URL)".into());
        }
    };

    let request = TransactionRequest::from_json(&request_str)
        .map_err(|e| format!("invalid transaction request: {e}"))?;

    // Derive a domain-scoped key — different pubkey per dApp, no cross-dApp correlation.
    let seed_path = cli.seed_file.clone().unwrap_or_else(default_seed_path);
    let seed = load_seed(&seed_path)?;
    let network = parse_network(&cli.network)?;
    let kp = AuthKeyPair::from_seed_for_domain(&seed, network, cli.account, &request.domain)
        .map_err(|e| format!("key derivation failed: {e}"))?;
    eprintln!("(using domain-scoped identity for {})", request.domain);

    // Display the transaction request
    println!("=== Transaction Request ===");
    println!();
    println!("  Domain:      {}", request.domain);
    println!("  Recipient:   {}", request.recipient);
    println!("  Amount:      {} ZEC", request.amount);
    println!("  Chain:       {}", request.chain);
    if let Some(ref memo) = request.memo {
        println!("  Memo:        {memo}");
    }
    if let Some(ref desc) = request.description {
        println!("  Description: {desc}");
    }
    println!("  Request ID:  {}", request.request_id);
    println!("  Expires:     {}", request.expiration_time.to_rfc3339());
    println!();
    println!("Approve this transaction? [Y/n/d(eny)] ");

    let mut input = String::new();
    std::io::stdin()
        .read_line(&mut input)
        .map_err(|e| format!("failed to read input: {e}"))?;

    let input = input.trim().to_lowercase();
    let approval = if input == "d" || input == "deny" {
        println!();
        println!("Transaction DENIED.");
        TransactionApproval::deny(&kp, &request)
    } else if input.is_empty() || input == "y" || input == "yes" {
        println!();
        println!("Transaction APPROVED.");
        TransactionApproval::approve(&kp, &request)
    } else {
        return Err("invalid input — enter Y to approve or D to deny".into());
    };

    let json = approval.to_json().map_err(|e| format!("{e}"))?;

    println!();
    println!("=== Signed Response ===");
    println!("{json}");

    // Check for callback_url in the request JSON
    let callback_url: Option<String> = serde_json::from_str::<serde_json::Value>(&request_str)
        .ok()
        .and_then(|v| v.get("callback_url").and_then(|u| u.as_str().map(String::from)));

    if let Some(url) = callback_url {
        println!();
        println!("Callback URL detected: {url}");
        println!("Submit response automatically? [Y/n] ");

        let mut cb_input = String::new();
        std::io::stdin()
            .read_line(&mut cb_input)
            .map_err(|e| format!("failed to read input: {e}"))?;
        let cb_input = cb_input.trim().to_lowercase();

        if cb_input.is_empty() || cb_input == "y" || cb_input == "yes" {
            let client = reqwest::blocking::Client::new();
            let res = client.post(&url)
                .header("Content-Type", "application/json")
                .body(json.clone())
                .send()
                .map_err(|e| format!("callback POST failed: {e}"))?;

            if res.status().is_success() {
                println!("Response submitted to dApp successfully!");
                println!("The browser should update automatically.");
            } else {
                let body = res.text().unwrap_or_default();
                eprintln!("Callback failed: {body}");
                println!("You can still copy the response JSON above and paste it manually.");
            }
        }
    } else {
        println!();
        println!("Response ready. Copy the JSON above and send it to the dApp's /tx/approve endpoint.");
    }

    Ok(())
}

fn cmd_demo(_cli: &Cli, domain: &str) -> Result<(), String> {
    println!("=== ZecAuth Protocol Demo ===");
    println!();

    // Step 1: Create a test seed and derive keys
    let seed: [u8; 32] = [
        0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
        0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
        0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
        0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
    ];

    let kp = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0)
        .map_err(|e| format!("key derivation failed: {e}"))?;

    println!("[1/5] Wallet initialized");
    println!("      Public key: {}", kp.public_key().to_hex());
    println!();

    // Step 2: dApp generates a challenge
    let challenge = ChallengeMessage::new(
        domain,
        &format!("https://{domain}/dashboard"),
        Network::Mainnet,
    )
    .with_statement("Access your dashboard");

    println!("[2/5] dApp generated challenge");
    println!("      Domain: {}", challenge.domain);
    println!("      Nonce:  {}", challenge.nonce);
    println!("      Expires: {}", challenge.expiration_time.to_rfc3339());
    println!();

    // Step 3: Wallet displays and signs the challenge
    println!("[3/5] Wallet displays challenge to user:");
    println!("      ┌────────────────────────────────────────┐");
    println!("      │ {} wants you to sign in  │", domain);
    println!("      │ with your Zcash wallet.                │");
    println!("      │                                        │");
    println!("      │ Statement: Access your dashboard       │");
    println!("      │                                        │");
    println!("      │          [Approve]  [Deny]             │");
    println!("      └────────────────────────────────────────┘");
    println!();

    let response = AuthResponse::sign(&kp, &challenge);
    println!("[4/5] Wallet signed the challenge");
    println!("      Signature: {}...", &response.signature[..32]);
    println!();

    // Step 4: dApp verifies the response
    let verified = zecauth_core::verify_response(&response, domain, "zcash:mainnet")
        .map_err(|e| format!("verification failed: {e}"))?;

    println!("[5/5] dApp verified the response");
    println!("      Authenticated pubkey: {}", verified.pubkey.to_hex());
    println!("      Domain: {}", verified.domain);
    println!("      Chain:  {}", verified.chain);
    println!("      Nonce consumed: {}", verified.nonce);
    println!();
    println!("=== Authentication successful! ===");
    println!();
    println!("The full flow completed:");
    println!("  - Key derivation (ZIP-32 purpose 616')");
    println!("  - Challenge generation (SIWE-inspired format)");
    println!("  - RedPallas signing (Pallas curve)");
    println!("  - Cryptographic verification");
    println!("  - Domain + chain binding checks");
    println!();
    println!("Cost: FREE. No transaction, no fee, no chain interaction.");

    Ok(())
}
