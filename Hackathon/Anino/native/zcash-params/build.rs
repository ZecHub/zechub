use zcash_primitives::constants::generate_pedersen_hash_exp_table;
use group::GroupEncoding;
use std::io::Write;
use std::fs::File;
use std::fs;
use std::path::Path;

#[allow(dead_code)]
fn write_generators_bin() {
    let hash_exp_table = generate_pedersen_hash_exp_table();

    let mut bb: Vec<u8> = vec![];
    for g in hash_exp_table.iter().take(3) {
        for w in g.iter() {
            for p in w.iter() {
                let h = p.to_bytes();
                bb.write_all(&h).unwrap();
            }
        }
    }
    let src_path = Path::new("src");
    let mut f = File::create(src_path.join("generators.bin")).unwrap();
    f.write_all(&bb).unwrap();
    if !src_path.join("sapling-output.params").exists() {
        let home = std::env::var("HOME").unwrap_or(String::new());
        let zcash_path = Path::new(&home).join(".zcash-params");
        println!("Searching for params in {}", zcash_path.to_string_lossy());
        fs::copy(zcash_path.join("sapling-output.params"), src_path.join("sapling-output.params")).unwrap();
        fs::copy(zcash_path.join("sapling-spend.params"), src_path.join("sapling-spend.params")).unwrap();
    }
}

fn main() {
    write_generators_bin();
}
