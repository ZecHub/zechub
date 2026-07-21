run these SEPERATELY to avoid {possible?} collisions

// Passes after 271 seconds on my laptop (on NU6.1 upgraded zl)
cargo nextest run --run-ignored=all orchard_glory_goddess
// Fails complaining about missing sapling in UAs
cargo nextest run --run-ignored=all sapling_glory_goddess
// Fails after > 20 minutes
cargo nextest run --run-ignored=all shield_glory_goddess

to update the testnet wallet run
cargo run -- -c=testnet --server="https://testnet.zec.rocks:9067" --data-dir=zingolib/src/wallet/disk/testing/examples/testnet/glory_goddess/latest
