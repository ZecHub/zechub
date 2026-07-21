#![forbid(unsafe_code)]

use std::sync::Mutex;
use tracing_subscriber::EnvFilter;

/// Parses CLI arguments and handles the help short-circuit.
///
/// The help check is tightly coupled with argument parsing so that the
/// two cannot be accidentally reordered in `main`.
fn parse_args_or_exit_for_help() -> clap::ArgMatches {
    let matches = zingo_cli::build_clap_app().get_matches();
    if let Some(help_text) = zingo_cli::help_output(&matches) {
        for line in help_text.lines() {
            println!("{line}");
        }
        std::process::exit(0x0100);
    }
    matches
}

/// Initializes tracing based on the mode of operation.
///
/// In interactive mode, logs are written to a file so error-level tracing
/// output does not pollute the terminal. In command mode, logs go to stderr.
fn init_tracing(matches: &clap::ArgMatches) {
    let env_filter = EnvFilter::from_default_env();

    if zingo_cli::is_interactive(matches) {
        let log_path = zingo_cli::log_file_path(matches);
        if let Some(parent) = log_path.parent() {
            std::fs::create_dir_all(parent).ok();
        }
        match std::fs::OpenOptions::new()
            .create(true)
            .append(true)
            .open(&log_path)
        {
            Ok(file) => {
                tracing_subscriber::fmt()
                    .with_env_filter(env_filter)
                    .with_writer(Mutex::new(file))
                    .with_ansi(false)
                    .init();
                return;
            }
            Err(e) => {
                eprintln!(
                    "Warning: could not open log file {}: {e}. Logging to stderr.",
                    log_path.display()
                );
            }
        }
    }

    // Command mode or file-creation fallback: log to stderr
    tracing_subscriber::fmt().with_env_filter(env_filter).init();
}

#[cfg(target_os = "linux")]
/// Reports permission diagnostics to stderr. Only tested against Linux.
fn report_permission_error() {
    let user = std::env::var("USER").expect("Unexpected error reading value of $USER!");
    let home = std::env::var("HOME").expect("Unexpected error reading value of $HOME!");
    let current_executable =
        std::env::current_exe().expect("Unexpected error reporting executable path!");
    eprintln!("USER: {user}");
    eprintln!("HOME: {home}");
    eprintln!("Executable: {}", current_executable.display());
    if home == "/" {
        eprintln!("User {user} must have permission to write to '{home}.zcash/' .");
    } else {
        eprintln!("User {user} must have permission to write to '{home}/.zcash/' .");
    }
}

fn handle_error(e: std::io::Error) {
    eprintln!("Error: {e}");
    #[cfg(target_os = "linux")]
    if let Some(13) = e.raw_os_error() {
        report_permission_error();
    }
}

pub fn main() {
    // install default crypto provider (ring)
    if let Err(e) = rustls::crypto::ring::default_provider().install_default() {
        eprintln!("Error installing crypto provider: {e:?}");
    }
    let matches = parse_args_or_exit_for_help();
    init_tracing(&matches);
    if let Err(e) = zingo_cli::run_cli(matches) {
        handle_error(e);
    }
}
