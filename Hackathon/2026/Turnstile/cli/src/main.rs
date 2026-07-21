use anyhow::Result;
use clap::Parser;
use turnstile_core::pools::format_pool;
use turnstile_core::{IRONWOOD_ACTIVATION_HEIGHT, ScanBackend, ScanRequest, ScanResult, Verdict};

#[derive(Parser)]
#[command(
    name = "turnstile-check",
    about = "Check whether your ZEC is exposed to the Ironwood Orchard pool closure",
    long_about = "Scans a Zcash wallet from a unified full viewing key and reports the balance \
                  in each pool. Runs entirely on your machine. Never accepts a spending key."
)]
struct Args {
    #[arg(
        long,
        value_name = "UFVK",
        help = "Unified full viewing key (uview1...)"
    )]
    ufvk: String,

    #[arg(long, value_name = "HEIGHT", help = "Wallet birthday block height")]
    birthday: u64,

    #[arg(
        long,
        value_name = "URL",
        help = "lightwalletd endpoint",
        default_value = "https://zec.rocks:443"
    )]
    server: String,

    #[arg(long, help = "Print the result as JSON")]
    json: bool,
}

#[tokio::main]
async fn main() -> Result<()> {
    let args = Args::parse();

    let request = ScanRequest {
        ufvk: args.ufvk,
        birthday: args.birthday,
    };

    if !args.json {
        eprintln!("Scanning from block {}…", args.birthday);
    }

    let result = ScanBackend::new(args.server).scan(&request).await?;

    if args.json {
        println!("{}", serde_json::to_string_pretty(&result)?);
    } else {
        print_verdict(&result);
    }

    Ok(())
}

fn print_verdict(result: &ScanResult) {
    let balances = result.balances;

    println!();
    println!("  TRANSPARENT   {}", format_pool(balances.transparent));
    println!("  SAPLING       {}", format_pool(balances.sapling));
    println!("  ORCHARD       {}", format_pool(balances.orchard));
    println!();
    println!("  {}", result.verdict.headline());
    println!("  {}", result.verdict.detail());

    if result.verdict == Verdict::Exposed {
        println!("  Activation is at block {IRONWOOD_ACTIVATION_HEIGHT}.");
    }

    println!(
        "  Scanned blocks {} to {}.",
        result.scanned_from_height, result.scanned_to_height
    );

    if result.verdict != Verdict::Exposed
        && result.scanned_from_height > turnstile_core::chain::ORCHARD_ACTIVATION_HEIGHT
    {
        println!(
            "  Note: Orchard funds received before block {} were not counted. Re-run with an \
             earlier --birthday, or omit it, to be certain.",
            result.scanned_from_height
        );
    }
    println!();
}
