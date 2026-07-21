use clap::Parser;
use paypunk_config::ConfigLoader;

#[derive(Parser)]
#[command(name = "paypunk-tui", about = "Paypunk Terminal UI")]
struct Args {
    #[arg(short, long)]
    socket_path: Option<String>,
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let args = Args::parse();
    let config = ConfigLoader::load_or_default();
    let socket_path = args.socket_path.unwrap_or(config.paypunkd_socket_path);
    paypunk_tui::run_tui(&socket_path, None, false).await
}
