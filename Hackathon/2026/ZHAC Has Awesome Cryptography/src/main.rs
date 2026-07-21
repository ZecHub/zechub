//! ZHAC CLI.
//!
//!
//! zhac gen-key        -o <priv> -p <pub> [-s <seed>] [-w <passphrase>]
//! zhac encrypt        -k <recipient> [-k <recipient2> ...] -i <input> -o <output>
//! zhac decrypt        -k <priv> -i <input> -o <output>
//! zhac sign           -k <priv> -i <input> -o <signature>
//! zhac verify         -k <pub>  -i <input> -s <signature>
//! zhac key-info       -k <pub>
//! zhac fingerprint    -k <pub>
//! zhac whoami         -k <pub>   (or -k <priv>)
//! zhac auth-challenge -k <priv> -p <pub> -o <token.json>
//! zhac auth-verify    -t <token.json>
//! zhac auth-server    [--port 3598]
//! zhac threshold-sign <subcommand>
//!

use std::fs;
use std::io::{self, Read, Write};
use std::path::PathBuf;

use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "zhac", about = "ZHAC - ZCash Has Awesome Cryptography", version, long_about = None)]
struct Cli {
    #[arg(short, long, global = true)]
    quiet: bool,

    #[arg(short, long, global = true)]
    verbose: bool,

    #[command(subcommand)]
    command: Command,
}

#[derive(Subcommand)]
enum Command {
    /// Generate a new ZHAC key-pair
    GenKey {
        #[arg(short = 'o', long)]
        private_key: PathBuf,
        #[arg(short = 'p', long)]
        public_key: PathBuf,
        #[arg(short = 's', long)]
        seed_file: Option<PathBuf>,
        #[arg(short = 'w', long)]
        passphrase: Option<String>,
        #[arg(long)]
        passphrase_stdin: bool,
    },
    /// Encrypt a file for one or more recipients
    Encrypt {
        #[arg(short = 'k', long, num_args = 1.., required = true)]
        recipient_keys: Vec<String>,
        #[arg(short = 'i', long)]
        input: String,
        #[arg(short = 'o', long)]
        output: String,
    },
    /// Decrypt a file with your private key
    Decrypt {
        #[arg(short = 'k', long)]
        private_key: String,
        #[arg(short = 'i', long)]
        input: String,
        #[arg(short = 'o', long)]
        output: String,
    },
    /// Sign a file with your private key
    Sign {
        #[arg(short = 'k', long)]
        private_key: String,
        #[arg(short = 'i', long)]
        input: String,
        #[arg(short = 'o', long)]
        signature: PathBuf,
    },
    /// Verify a detached signature
    Verify {
        #[arg(short = 'k', long)]
        public_key: String,
        #[arg(short = 'i', long)]
        input: String,
        #[arg(short = 's', long)]
        signature: PathBuf,
    },
    /// Display key metadata including fingerprint
    KeyInfo {
        #[arg(short = 'k', long)]
        key: String,
    },
    /// Import a 32-byte hex seed (compatible with Ywallet/zcashd seed exports)
    ImportSeed {
        #[arg(short = 's', long)]
        seed: String,
        #[arg(short = 'o', long)]
        private_key: PathBuf,
        #[arg(short = 'p', long)]
        public_key: PathBuf,
        #[arg(short = 'w', long)]
        passphrase: Option<String>,
        #[arg(long)]
        passphrase_stdin: bool,
    },
    /// Export the raw 32-byte seed from a private key (hex, importable into Ywallet)
    ExportSeed {
        #[arg(short = 'k', long)]
        private_key: String,
    },
    /// Show the key fingerprint and short key ID
    Fingerprint {
        #[arg(short = 'k', long)]
        key: String,
    },
    /// Show your Zcash identity (address, fingerprint, key ID)
    Whoami {
        #[arg(short = 'k', long)]
        key: String,
    },
    /// Query the Zcash mainnet via LightwalletD for blockchain info
    MainnetInfo,
    /// Create a Zcash Login auth challenge bound to mainnet chain state
    AuthChallenge {
        #[arg(short = 'k', long)]
        private_key: String,
        #[arg(short = 'p', long)]
        public_key: String,
        #[arg(short = 'o', long)]
        output: PathBuf,
        #[arg(short = 'm', long)]
        mock: bool,
    },
    /// Verify a Zcash Login auth token against mainnet chain state
    AuthVerify {
        #[arg(short = 't', long)]
        token: PathBuf,
        #[arg(short = 's', long)]
        signature_only: bool,
    },
    /// Start the Zcash Login demo server (accepts auth tokens via browser)
    AuthServer {
        #[arg(short = 'p', long)]
        port: Option<u16>,
    },
    /// Select a public Zcash LightwalletD endpoint
    NodeSelect,
    /// Show the currently selected endpoint and test connectivity
    NodeStatus,
    /// FROST threshold signing (t-of-n)
    ThresholdSign {
        #[command(subcommand)]
        action: ThresholdAction,
    },
}

/// Subcommands for threshold signing.
#[derive(Subcommand)]
enum ThresholdAction {
    TrustedDealer {
        #[arg(short = 't', long)]
        threshold: u16,
        #[arg(short = 'n', long)]
        total: u16,
        #[arg(short = 'o', long)]
        output_dir: PathBuf,
    },
    Round1 {
        #[arg(short = 'k', long)]
        key_package: PathBuf,
        #[arg(short = 'o', long)]
        output_dir: PathBuf,
    },
    Round2 {
        #[arg(short = 'k', long)]
        key_package: PathBuf,
        #[arg(short = 'n', long)]
        nonces: PathBuf,
        #[arg(short = 'p', long)]
        signing_package: PathBuf,
        #[arg(short = 'o', long)]
        output: PathBuf,
    },
    BuildPackage {
        #[arg(short = 'm', long)]
        message: String,
        #[arg(short = 'c', long)]
        commitments_dir: PathBuf,
        #[arg(short = 'o', long)]
        output_dir: PathBuf,
    },
    Aggregate {
        #[arg(short = 'b', long)]
        build_dir: PathBuf,
        #[arg(short = 's', long)]
        shares_dir: PathBuf,
        #[arg(short = 'k', long)]
        public_key_package: PathBuf,
        #[arg(short = 'o', long)]
        output: PathBuf,
    },
    ThresholdVerify {
        #[arg(short = 's', long)]
        signature: PathBuf,
        #[arg(short = 'm', long)]
        message: String,
        #[arg(short = 'k', long)]
        public_key_package: PathBuf,
    },
}

fn main() {
    let cli = Cli::parse();
    if let Err(e) = run(cli) {
        eprintln!("Error: {e}");
        std::process::exit(1);
    }
}

fn run(cli: Cli) -> zhac::Result<()> {
    let quiet = cli.quiet;
    let verbose = cli.verbose;
    let log = |msg: &str| { if !quiet { eprintln!("{msg}"); } };
    let logv = |msg: &str| { if verbose && !quiet { eprintln!("{msg}"); } };

    match cli.command {
        Command::GenKey { private_key, public_key, seed_file, passphrase, passphrase_stdin } =>
            cmd_gen_key(private_key, public_key, seed_file, passphrase, passphrase_stdin, &log),
        Command::Encrypt { recipient_keys, input, output } =>
            cmd_encrypt(recipient_keys, input, output, &log, &logv),
        Command::Decrypt { private_key, input, output } =>
            cmd_decrypt(private_key, input, output, &log, &logv),
        Command::Sign { private_key, input, signature } =>
            cmd_sign(private_key, input, signature, &log),
        Command::Verify { public_key, input, signature } =>
            cmd_verify(public_key, input, signature, &log),
        Command::KeyInfo { key } => cmd_key_info(key),
        Command::ImportSeed { seed, private_key, public_key, passphrase, passphrase_stdin } =>
            cmd_import_seed(seed, private_key, public_key, passphrase, passphrase_stdin, &log),
        Command::ExportSeed { private_key } => cmd_export_seed(private_key),
        Command::Fingerprint { key } => cmd_fingerprint(key),
        Command::Whoami { key } => cmd_whoami(key),
        Command::MainnetInfo => cmd_mainnet_info(&log),
        Command::AuthChallenge { private_key, public_key, output, mock } =>
            cmd_auth_challenge(private_key, public_key, output, mock, &log),
        Command::AuthVerify { token, signature_only } =>
            cmd_auth_verify(token, signature_only, &log),
        Command::AuthServer { port } => zhac::auth_server::run(port),
        Command::NodeSelect => cmd_node_select(&log),
        Command::NodeStatus => cmd_node_status(&log),
        Command::ThresholdSign { action } => cmd_threshold_sign(action, &log),
    }
}

// ── gen-key ────────────────────────────────────────────────────────────────

fn cmd_gen_key(
    private_key_path: PathBuf, public_key_path: PathBuf, seed_file: Option<PathBuf>,
    passphrase: Option<String>, passphrase_stdin: bool, log: &impl Fn(&str),
) -> zhac::Result<()> {
    use zhac::keys::ZhacKeyPair;
    let (keypair, seed) = ZhacKeyPair::generate()?;
    let pub_str = keypair.public_key.to_zhac_address();
    let fp = keypair.public_key.fingerprint_hex();
    let key_id = keypair.public_key.key_id();

    let pw = if passphrase_stdin {
        let mut input = String::new();
        io::stdin().read_line(&mut input)?;
        Some(input.trim().to_string())
    } else { passphrase };

    if let Some(pw) = pw {
        let priv_str = keypair.private_key.to_zhac_secret();
        let encrypted = zhac::keys::encrypt_private_key(&priv_str, &pw)?;
        zhac::keys::write_file_secure(&private_key_path,
            format!("# ZHAC encrypted private key\n# created: ZHAC\n{encrypted}\n").as_bytes())?;
        log(&format!("Key-pair generated (passphrase-protected with Argon2id).\n  Private -> {}\n  Public  -> {}",
            private_key_path.display(), public_key_path.display()));
    } else {
        let priv_str = keypair.private_key.to_zhac_secret();
        zhac::keys::write_file_secure(&private_key_path,
            format!("# ZHAC private key\n# created: ZHAC\n{priv_str}\n").as_bytes())?;
        log(&format!("Key-pair generated.\n  Private -> {}\n  Public  -> {}",
            private_key_path.display(), public_key_path.display()));
    }
    fs::write(&public_key_path, format!("# ZHAC public key\n{pub_str}\n"))?;
    log(&format!("  Fingerprint: {fp}"));
    log(&format!("  Key ID:      {key_id}"));
    if let Some(sf) = seed_file {
        zhac::keys::write_file_secure(&sf, seed.to_hex().as_bytes())?;
        log(&format!("  Seed    -> {} (keep this safe — it recovers your key)", sf.display()));
    }
    Ok(())
}

// ── encrypt / decrypt / sign / verify ──────────────────────────────────────

fn cmd_encrypt(
    recipient_keys: Vec<String>, input: String, output: String,
    log: &impl Fn(&str), logv: &impl Fn(&str),
) -> zhac::Result<()> {
    let plaintext = read_input(&input)?;
    if recipient_keys.len() == 1 {
        let pk = load_public_key(&recipient_keys[0])?;
        let ct = zhac::encrypt::encrypt(&plaintext, &pk)?;
        write_output(&output, &ct.to_bytes())?;
        log(&format!("Encrypted {} bytes for {} ({}).", plaintext.len(), recipient_keys[0], pk.key_id()));
    } else {
        let mut pks = Vec::with_capacity(recipient_keys.len());
        for rk in &recipient_keys {
            let pk = load_public_key(rk)?;
            logv(&format!("  Recipient: {} ({})", rk, pk.key_id()));
            pks.push(pk);
        }
        let ct = zhac::encrypt::encrypt_multi(&plaintext, &pks)?;
        write_output(&output, &ct.to_bytes())?;
        log(&format!("Encrypted {} bytes for {} recipients.", plaintext.len(), pks.len()));
    }
    Ok(())
}

fn cmd_decrypt(
    private_key: String, input: String, output: String,
    log: &impl Fn(&str), _logv: &impl Fn(&str),
) -> zhac::Result<()> {
    let sk = load_private_key(&private_key)?;
    let raw = read_input(&input)?;
    if raw.first() == Some(&1) {
        let ct = zhac::keys::ZhacCiphertext::from_bytes(&raw)?;
        let plaintext = zhac::encrypt::decrypt(&ct, &sk)?;
        write_output(&output, &plaintext)?;
        log(&format!("Decrypted {} bytes.", plaintext.len()));
    } else if raw.first() == Some(&2) {
        let ct = zhac::keys::ZhacMultiCiphertext::from_bytes(&raw)?;
        let plaintext = zhac::encrypt::decrypt_multi(&ct, &sk)?;
        write_output(&output, &plaintext)?;
        log(&format!("Decrypted {} bytes (multi-recipient).", plaintext.len()));
    } else {
        return Err(zhac::ZhacError::Format("unknown ciphertext format".into()));
    }
    Ok(())
}

fn cmd_sign(
    private_key: String, input: String, signature_path: PathBuf, log: &impl Fn(&str),
) -> zhac::Result<()> {
    let sk = load_private_key(&private_key)?;
    let msg = read_input(&input)?;
    let sig = zhac::sign::sign(&msg, &sk)?;
    fs::write(&signature_path, sig.to_bytes())?;
    log(&format!("Signed {} bytes. Signature -> {}", msg.len(), signature_path.display()));
    Ok(())
}

fn cmd_verify(
    public_key: String, input: String, signature_path: PathBuf, log: &impl Fn(&str),
) -> zhac::Result<()> {
    let pk = load_public_key(&public_key)?;
    let msg = read_input(&input)?;
    let raw = fs::read(&signature_path)?;
    let sig = zhac::keys::ZhacSignature::from_bytes(&raw)?;
    zhac::sign::verify(&msg, &sig, &pk)?;
    log("Signature verified — OK.");
    Ok(())
}

// ── key-info / fingerprint / whoami ────────────────────────────────────────

fn cmd_key_info(key: String) -> zhac::Result<()> {
    let pk = load_public_key(&key)?;
    println!("Diversifier:    {}", hex::encode(pk.d));
    println!("Fingerprint:    {}", pk.fingerprint_hex());
    println!("Key ID:         {}", pk.key_id());
    fn point_coords(pt: &jubjub::SubgroupPoint) -> (String, String) {
        let ext: jubjub::ExtendedPoint = (*pt).into();
        let aff: jubjub::AffinePoint = ext.into();
        let x = format!("{:?}", aff.get_u());
        let y = format!("{:?}", aff.get_v());
        (x, y)
    }
    let (tx, ty) = point_coords(&pk.pk_d);
    let (vx, vy) = point_coords(&pk.sig_vk);
    println!("Transmission key (encryption):");
    println!("  x = {tx}");
    println!("  y = {ty}");
    println!("Verification key (signing):");
    println!("  x = {vx}");
    println!("  y = {vy}");
    Ok(())
}

fn cmd_fingerprint(key: String) -> zhac::Result<()> {
    let pk = load_public_key(&key)?;
    println!("pub   {}", pk.key_id());
    println!("      {}", pk.fingerprint_hex());
    Ok(())
}

fn cmd_whoami(key: String) -> zhac::Result<()> {
    let pk = load_public_key(&key)?;
    let key_id = pk.key_id();
    let fp = pk.fingerprint_hex();
    let addr = pk.to_zhac_address();

    println!("╔═══════════════════════════════════════════════════════════╗");
    println!("║  Your Zcash Identity                                       ║");
    println!("╚═══════════════════════════════════════════════════════════╝");
    println!();
    println!("  ZHAC Address:   {addr}");
    println!("  Key ID:         {key_id}");
    println!("  Fingerprint:   {fp}");
    println!();
    println!("  This identity is derived from your Zcash Sapling key.");
    println!("  Use it with: zhac auth-challenge -k <priv> -p <pub> -o token.json");
    println!();
    Ok(())
}

// ── import-seed / export-seed ────────────────────────────────────────────────

fn cmd_import_seed(
    seed_source: String, private_key_path: PathBuf, public_key_path: PathBuf,
    passphrase: Option<String>, passphrase_stdin: bool, log: &impl Fn(&str),
) -> zhac::Result<()> {
    use zhac::keys::{ZhacKeyPair, ZhacKeySeed};
    let hex_str = if seed_source.trim().len() == 64 && seed_source.trim().chars().all(|c| c.is_ascii_hexdigit()) {
        seed_source.trim().to_string()
    } else {
        fs::read_to_string(&seed_source)?.trim().to_string()
    };
    let seed = ZhacKeySeed::from_hex(&hex_str)?;
    let (keypair, _) = ZhacKeyPair::generate_from_seed(&seed)?;
    let pub_str = keypair.public_key.to_zhac_address();
    let fp = keypair.public_key.fingerprint_hex();
    let key_id = keypair.public_key.key_id();

    let pw = if passphrase_stdin {
        let mut input = String::new();
        io::stdin().read_line(&mut input)?;
        Some(input.trim().to_string())
    } else { passphrase };

    if let Some(pw) = pw {
        let priv_str = keypair.private_key.to_zhac_secret();
        let encrypted = zhac::keys::encrypt_private_key(&priv_str, &pw)?;
        zhac::keys::write_file_secure(&private_key_path,
            format!("# ZHAC encrypted private key\n# created: ZHAC\n{encrypted}\n").as_bytes())?;
        log(&format!("Key imported from seed (passphrase-protected).\n  Private -> {}\n  Public  -> {}",
            private_key_path.display(), public_key_path.display()));
    } else {
        let priv_str = keypair.private_key.to_zhac_secret();
        zhac::keys::write_file_secure(&private_key_path,
            format!("# ZHAC private key\n# created: ZHAC\n{priv_str}\n").as_bytes())?;
        log(&format!("Key imported from seed.\n  Private -> {}\n  Public  -> {}",
            private_key_path.display(), public_key_path.display()));
    }
    fs::write(&public_key_path, format!("# ZHAC public key\n{pub_str}\n"))?;
    log(&format!("  Fingerprint: {fp}"));
    log(&format!("  Key ID:      {key_id}"));
    Ok(())
}

fn cmd_export_seed(private_key: String) -> zhac::Result<()> {
    let sk = load_private_key(&private_key)?;
    let seed = zhac::keys::ZhacKeySeed::from_bytes(*sk.spending_key_bytes());
    println!("{}", seed.to_hex());
    eprintln!("Seed exported. Import into Ywallet or other Zcash wallets that accept 32-byte hex seeds.");
    Ok(())
}

// ── mainnet / auth commands ─────────────────────────────────────────────────

fn cmd_mainnet_info(log: &impl Fn(&str)) -> zhac::Result<()> {
    let endpoint = zhac::chain::require_node()?;
    log(&format!("Connecting to {endpoint}..."));
    let client = zhac::lightwalletd::LightwalletdClient::new(&endpoint)?;
    let info = client.get_chain_info()?;
    println!("Chain:            {}", info.chain);
    println!("Blocks:           {}", info.blocks);
    println!("Estimated blocks: {}", info.estimated_height);
    println!("Best block hash:  {}", info.best_block_hash);
    println!("Sapling activation: {}", info.sapling_activation_height);
    println!("Consensus branch: {}", info.consensus_branch_id);
    println!("Server version:   {}", info.server_version);
    println!("Node subversion:  {}", info.subversion);
    println!();
    println!("Wallet balance:   use `zhac balance -k <ivk-hex>`");
    println!("Transaction fees: standard Zcash fee (0.0001 ZEC)");
    log(&format!("Connected to {} mainnet at block {}.", info.chain, info.blocks));
    Ok(())
}

fn cmd_auth_challenge(
    private_key: String, public_key: String, output: PathBuf, mock: bool, log: &impl Fn(&str),
) -> zhac::Result<()> {
    let sk = load_private_key(&private_key)?;
    let pk = load_public_key(&public_key)?;

    let challenge = if mock {
        log("Creating mock auth challenge (no node required)...");
        zhac::auth::AuthChallenge::create_mock(2_000_000, &"00".repeat(32))
    } else {
        let endpoint = zhac::chain::require_node()?;
        log(&format!("Connecting to {endpoint}..."));
        let client = zhac::lightwalletd::LightwalletdClient::new(&endpoint)?;
        let info = client.get_chain_info()?;
        log(&format!("Mainnet: {} at block {}", info.chain, info.blocks));
        zhac::auth::AuthChallenge::create(&client)?
    };

    log(&format!("Challenge created (block {}, nonce {})",
        challenge.block_height, hex::encode(&challenge.nonce[..8])));

    let token = zhac::auth::AuthToken::create_with_pubkey(challenge, &sk, &pk)?;
    let json = token.to_json()?;
    
    if let Some(parent) = output.parent() {
        fs::create_dir_all(parent)?;
    }
    
    fs::write(&output, &json)?;
    log(&format!("Auth token written -> {} (key ID: {})", output.display(), pk.key_id()));
    Ok(())
}

fn cmd_auth_verify(
    token_path: PathBuf, signature_only: bool, log: &impl Fn(&str),
) -> zhac::Result<()> {
    let json = fs::read_to_string(&token_path)?;
    let token = zhac::auth::AuthToken::from_json(&json)?;

    if signature_only {
        eprintln!("WARNING: Signature-only mode does NOT verify chain state, freshness,");
        eprintln!("         or replay protection. Not secure for production auth.");
        eprintln!();
        log("Verifying signature (offline, no mainnet check)...");
        if token.verify_signature_only()? {
            let pk = zhac::keys::ZhacPublicKey::from_zhac_address(&token.public_key)?;
            println!("VALID — signature verified");
            println!("  Key ID:    {}", pk.key_id());
            println!("  Block:     {} (not verified against mainnet)", token.challenge.block_height);
            println!("  Timestamp: {}", token.challenge.timestamp);
        } else {
            println!("INVALID — signature verification failed");
            std::process::exit(1);
        }
        return Ok(());
    }

    let endpoint = zhac::chain::require_node()?;
    log(&format!("Connecting to {endpoint}..."));
    let client = zhac::lightwalletd::LightwalletdClient::new(&endpoint)?;
    let mut nonce_cache = zhac::auth::NonceCache::open()?;
    let result = token.verify(&client, &mut nonce_cache)?;

    if result.valid {
        println!("AUTHENTICATED");
        println!("  Key ID:    {}", result.key_id);
        println!("  Chain:     {}", result.chain);
        println!("  Block:     {}", result.node_height);
        println!("  Reason:    {}", result.reason);
    } else {
        println!("AUTHENTICATION FAILED");
        println!("  Reason: {}", result.reason);
        std::process::exit(1);
    }
    Ok(())
}

// ── node-select / node-status ────────────────────────────────────────────────

fn cmd_node_select(_log: &impl Fn(&str)) -> zhac::Result<()> {
    zhac::chain::interactive_select()?;
    Ok(())
}

fn cmd_node_status(log: &impl Fn(&str)) -> zhac::Result<()> {
    if !zhac::chain::has_node() {
        eprintln!("No endpoint selected. Run `zhac node-select` to pick one.");
        return Err(zhac::ZhacError::Crypto("no endpoint selected — run `zhac node-select`".into()));
    }
    let config = zhac::chain::load_node_config()?;
    println!("Selected endpoint:");
    println!("  Endpoint:  {}", config.endpoint);
    println!("  Label:     {}", config.label);
    println!("  Version:   {}", if config.version.is_empty() { "?" } else { &config.version });
    println!("  Chain:     {}", config.chain.as_deref().unwrap_or("?"));
    println!("  Saved at:  {}", config.selected_at);
    println!();

    log("Testing connectivity...");
    match zhac::lightwalletd::LightwalletdClient::new(&config.endpoint) {
        Ok(client) => match client.get_chain_info() {
            Ok(info) => {
                println!("Connection: OK");
                println!("  Chain:     {}", info.chain);
                println!("  Blocks:    {}", info.blocks);
                println!("  Hash:      {}", info.best_block_hash);
                println!("  Server:    {}", info.server_version);
            }
            Err(e) => {
                println!("Connection: FAILED");
                println!("  Error: {e}");
            }
        },
        Err(e) => {
            println!("Connection: FAILED (could not connect)");
            println!("  Error: {e}");
        }
    }
    Ok(())
}

// ── threshold-sign ─────────────────────────────────────────────────────────

fn cmd_threshold_sign(action: ThresholdAction, log: &impl Fn(&str)) -> zhac::Result<()> {
    use zhac::threshold as frost;
    match action {
        ThresholdAction::TrustedDealer { threshold, total, output_dir } => {
            fs::create_dir_all(&output_dir)?;
            let out = frost::trusted_dealer_keygen(total, threshold)?;
            let pkp_path = output_dir.join("public_key_package.bin");
            frost::save_pubkey_pkg(&out.public_key_package, &pkp_path)?;
            for (idx, (_id, share)) in (1u16..).zip(&out.secret_shares) {
                let sp = output_dir.join(format!("secret_share_{idx}.bin"));
                let kp = output_dir.join(format!("key_package_{idx}.bin"));
                let sp_bytes = bincode::serialize(share)
                    .map_err(|e| zhac::ZhacError::Crypto(format!("serialize: {e}")))?;
                zhac::keys::write_file_secure(&sp, &sp_bytes)?;
                frost::save_key_package(&out.key_packages[_id], &kp)?;
            }
            log(&format!("Trusted-dealer keygen complete: {}/{} threshold, {} shares in {}",
                threshold, total, total, output_dir.display()));
        }
        ThresholdAction::Round1 { key_package, output_dir } => {
            fs::create_dir_all(&output_dir)?;
            let kp = frost::load_key_package(&key_package)?;
            let out = frost::round1_commit(&kp)?;
            let nonce_bytes = bincode::serialize(&out.nonces)
                .map_err(|e| zhac::ZhacError::Crypto(format!("serialize: {e}")))?;
            zhac::keys::write_file_secure(&output_dir.join("nonces.bin"), &nonce_bytes)?;
            frost::save_commitments(&out.commitments, &output_dir.join("commitments.bin"))?;
            log("Round 1 complete. Nonces saved (0600), commitments ready to send.");
            eprintln!();
            eprintln!("Note: Rename commitments.bin to <participant_id>.bin when collecting");
            eprintln!("      (e.g. 1.bin, 2.bin) so build-package can identify participants.");
        }
        ThresholdAction::BuildPackage { message, commitments_dir, output_dir } => {
            fs::create_dir_all(&output_dir)?;
            let commitments = frost::load_commitments_dir(&commitments_dir)?;
            let sp = frost::build_signing_package(message.as_bytes(), &commitments);
            frost::save_signing_package(&sp, &output_dir.join("signing_package.bin"))?;
            log("Signing package built. Distribute to participants.");
        }
        ThresholdAction::Round2 { key_package, nonces, signing_package, output } => {
            let kp = frost::load_key_package(&key_package)?;
            let nonces = frost::load_nonces(&nonces)?;
            let sp = frost::load_signing_package(&signing_package)?;
            let share = frost::round2_sign(&sp, &nonces, &kp)?;
            frost::save_share(&share, &output)?;
            log("Round 2 complete. Signature share saved.");
        }
        ThresholdAction::Aggregate { build_dir, shares_dir, public_key_package, output } => {
            let sp = frost::load_signing_package(&build_dir.join("signing_package.bin"))?;
            let pkp = frost::load_pubkey_pkg(&public_key_package)?;
            let shares = frost::load_shares_dir(&shares_dir)?;
            let sig = frost::aggregate(&sp, &shares, &pkp)?;
            frost::save_threshold_sig(&sig, &output)?;
            log(&format!("Threshold signature aggregated ({} shares).", shares.len()));
        }
        ThresholdAction::ThresholdVerify { signature, message, public_key_package } => {
            let sig = frost::load_threshold_sig(&signature)?;
            let pkp = frost::load_pubkey_pkg(&public_key_package)?;
            frost::verify_threshold_signature(&sig, message.as_bytes(), pkp.verifying_key())?;
            log("Threshold signature verified — OK.");
        }
    }
    Ok(())
}

// ── I/O helpers ────────────────────────────────────────────────────────────

fn read_input(path: &str) -> zhac::Result<Vec<u8>> {
    if path == "-" {
        let mut buf = Vec::new();
        io::stdin().read_to_end(&mut buf)?;
        Ok(buf)
    } else {
        Ok(fs::read(path)?)
    }
}

fn write_output(path: &str, data: &[u8]) -> zhac::Result<()> {
    if path == "-" {
        io::stdout().write_all(data)?;
        Ok(())
    } else {
        Ok(fs::write(path, data)?)
    }
}

fn load_public_key(source: &str) -> zhac::Result<zhac::keys::ZhacPublicKey> {
    use zhac::keys::ZhacPublicKey;
    let trimmed = source.trim();
    if trimmed.starts_with("zhac1") {
        return ZhacPublicKey::from_zhac_address(trimmed);
    }
    let content = fs::read_to_string(source)?;
    let line = content.lines().map(str::trim)
        .find(|l| l.starts_with("zhac1"))
        .ok_or_else(|| zhac::ZhacError::InvalidKey("no zhac1... key found in file".into()))?;
    ZhacPublicKey::from_zhac_address(line)
}

fn load_private_key(source: &str) -> zhac::Result<zhac::keys::ZhacPrivateKey> {
    use zhac::keys::ZhacPrivateKey;
    let trimmed = source.trim();
    if trimmed.starts_with("zhacsecret1") {
        return ZhacPrivateKey::from_zhac_secret(trimmed);
    }
    let content = fs::read_to_string(source)?;
    if content.contains("ENCRYPTED") || content.lines().any(|l| l.trim().starts_with("v2:")) {
        let blob = content.lines().map(str::trim)
            .find(|l| !l.starts_with('#') && !l.is_empty() && !l.starts_with("-----"))
            .ok_or_else(|| zhac::ZhacError::InvalidKey("no encrypted key data found".into()))?;
        let passphrase = std::env::var("ZHAC_PASSPHRASE").map_err(|_|
            zhac::ZhacError::InvalidKey("encrypted key requires ZHAC_PASSPHRASE environment variable".into()))?;
        let decrypted = zhac::keys::decrypt_private_key(blob, &passphrase)?;
        return ZhacPrivateKey::from_zhac_secret(&decrypted);
    }
    let line = content.lines().map(str::trim)
        .find(|l| l.starts_with("zhacsecret1"))
        .ok_or_else(|| zhac::ZhacError::InvalidKey("no zhacsecret1... key found in file".into()))?;
    ZhacPrivateKey::from_zhac_secret(line)
}
