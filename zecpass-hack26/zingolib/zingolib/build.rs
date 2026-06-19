use std::io::Write;
use std::{env, fs::File, path::Path, process::Command};

fn git_description() {
    let _fetch = Command::new("git")
        .args(["fetch", "--tags", "https://github.com/zingolabs/zingolib"])
        .output()
        .expect("Failed to execute git command");
    let output = Command::new("git")
        .args(["describe", "--dirty", "--always", "--long"])
        .output()
        .expect("Failed to execute git command");

    eprintln!("Git command output: {output:?}");
    println!("Git command output: {output:?}");

    let git_description = String::from_utf8(output.stdout)
        .unwrap()
        .trim_end()
        .to_string();

    // Write the git description to a file which will be included in the crate
    let out_dir = env::var("OUT_DIR").unwrap();
    let dest_path = Path::new(&out_dir).join("git_description.rs");
    let mut f = File::create(dest_path).unwrap();
    writeln!(
        f,
        "/// The result of running 'git describe' at compile time:\n\
        /// The most recent tag name, the number\n\
        /// of commits above it, and the hash of\n\
        /// the most recent commit\n\
        pub fn git_description() -> &'static str {{\"{git_description}\"}}"
    )
    .unwrap();
}

/// Checks if zcash params are available and downloads them if not.
/// Also copies them to an internal location for use by mobile platforms.
fn get_zcash_params() {
    println!("Checking if params are available...");

    let params_path = match zcash_proofs::download_sapling_parameters(Some(400)) {
        Ok(p) => {
            println!("Params downloaded!");
            println!("Spend path: {}", p.spend.to_str().unwrap());
            println!("Output path: {}", p.output.to_str().unwrap());
            p
        }
        Err(e) => {
            println!("Error downloading params: {e}");
            panic!();
        }
    };

    // Copy the params to the internal location.
    let internal_params_path = Path::new("zcash-params");
    std::fs::create_dir_all(internal_params_path).unwrap();
    std::fs::copy(
        params_path.spend,
        internal_params_path.join("sapling-spend.params"),
    )
    .unwrap();

    std::fs::copy(
        params_path.output,
        internal_params_path.join("sapling-output.params"),
    )
    .unwrap();
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    get_zcash_params();
    git_description();
    Ok(())
}
