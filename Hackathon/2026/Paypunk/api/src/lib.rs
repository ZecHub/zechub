pub mod client;
pub mod functions;

pub use client::Client;
pub use functions::{
    add_address_book_entry, approve_signature, broadcast_transaction, check_wallet_exists,
    create_account, derivation_path, derive_address, generate_mnemonic, generate_seed, get_account,
    get_address_book, get_balance, get_history, get_settings, list_accounts, restore_seed,
    save_settings, submit_intent, unlock, verify_password,
};
