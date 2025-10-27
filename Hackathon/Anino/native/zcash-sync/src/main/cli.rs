use clap::{AppSettings, Clap};
use rustyline::error::ReadlineError;
use rustyline::Editor;

#[derive(Clap, Debug)]
#[clap(setting = AppSettings::NoBinaryName)]
struct Commands {
    #[clap(subcommand)]
    cmd: SubCommand,
}

#[derive(Clap, Debug)]
enum SubCommand {
    Sync,
}

fn run_cmd(cmd: &SubCommand) {
    match cmd {
        SubCommand::Sync => {
            println!("SYNC");
        }
    }
}

fn main() {
    let mut rl = Editor::<()>::new();
    loop {
        let readline = rl.readline(">> ");
        match readline {
            Ok(line) => {
                rl.add_history_entry(&line);
                match Commands::try_parse_from(line.split_whitespace()) {
                    Ok(cmd) => {
                        run_cmd(&cmd.cmd);
                    }
                    Err(err) => {
                        eprintln!("{}", err);
                    }
                }
            }
            Err(ReadlineError::Interrupted) | Err(ReadlineError::Eof) => {
                break;
            }
            Err(err) => {
                panic!("{}", err);
            }
        }
    }
}
