use lazy_static::lazy_static;
use lazycell::AtomicLazyCell;
use orchard::circuit::ProvingKey;

lazy_static! {
    pub static ref PROVING_KEY: AtomicLazyCell<ProvingKey> = AtomicLazyCell::new();
}

mod hash;
mod key;
mod note;

pub use hash::{OrchardHasher, ORCHARD_ROOTS};
pub use key::{derive_orchard_keys, OrchardKeyBytes};
pub use note::{decode_merkle_path, DecryptedOrchardNote, OrchardDecrypter, OrchardViewKey};

pub fn get_proving_key() -> &'static ProvingKey {
    if !PROVING_KEY.filled() {
        log::info!("Building Orchard proving key");
        let _ = PROVING_KEY.fill(ProvingKey::build());
    }
    PROVING_KEY.borrow().unwrap()
}
