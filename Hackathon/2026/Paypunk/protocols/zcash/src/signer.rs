use std::collections::BTreeMap;

use async_trait::async_trait;
use orchard::circuit::ProvingKey;
use orchard::keys::{FullViewingKey, SpendAuthorizingKey, SpendingKey};
use paypunk_types::{ArtifactSummary, OutputEntry, SignerProtocol, ZcashArtifactSummary};
use pczt::roles::prover::Prover;
use pczt::roles::signer::Signer;
use pczt::roles::verifier::Verifier;
use pczt::Pczt;
use zcash_protocol::consensus::{NetworkConstants, NetworkType};
use zcash_protocol::local_consensus::LocalNetwork;
use zip32::fingerprint::SeedFingerprint;
use zip32::ChildIndex;

use crate::common::{account_from_path, decode_orchard_recipient};

pub struct ZcashSignerProtocol {
    pub params: LocalNetwork,
    network_type: NetworkType,
}

impl ZcashSignerProtocol {
    pub fn new(params: LocalNetwork, network_type: NetworkType) -> Self {
        Self {
            params,
            network_type,
        }
    }
}

#[async_trait]
impl SignerProtocol for ZcashSignerProtocol {
    fn export_viewing(&self, seed: &[u8; 64], path: &str) -> Result<Vec<u8>, String> {
        let account = account_from_path(path)?;
        let account_id = zip32::AccountId::try_from(account)
            .map_err(|_| format!("invalid account: {account}"))?;
        let sk = SpendingKey::from_zip32_seed(seed, self.network_type.coin_type(), account_id)
            .map_err(|e| format!("USK derivation failed: {e}"))?;
        let fvk = FullViewingKey::from(&sk);
        Ok(fvk.to_bytes().to_vec())
    }

    fn parse_artifact(&self, artifact: &[u8]) -> Result<Vec<u8>, String> {
        let pczt = Pczt::parse(artifact).map_err(|e| format!("PCZT parse failed: {e:?}"))?;

        let (value_sum, negative) = pczt.orchard().value_sum();
        let fee = if *negative { 0u64 } else { *value_sum };

        let mut outputs = Vec::new();
        for action in pczt.orchard().actions() {
            if let (Some(recipient_raw), Some(value)) =
                (action.output().recipient(), action.output().value())
            {
                if let Some(addr) = decode_orchard_recipient(recipient_raw, self.network_type) {
                    outputs.push(OutputEntry {
                        address: addr,
                        amount: value.to_string(),
                    });
                }
            }
        }

        let summary = ArtifactSummary::Zcash(ZcashArtifactSummary {
            outputs,
            fee: fee.to_string(),
        });

        postcard::to_allocvec(&summary).map_err(|e| format!("serialize summary failed: {e}"))
    }

    fn sign(&self, seed: &[u8; 64], path: &str, artifact: &[u8]) -> Result<Vec<u8>, String> {
        let account = account_from_path(path)?;
        self.sign_transaction_inner(seed, account, artifact)
    }
}

impl ZcashSignerProtocol {
    fn sign_transaction_inner(
        &self,
        seed: &[u8; 64],
        account: u32,
        transaction: &[u8],
    ) -> Result<Vec<u8>, String> {
        let pczt = Pczt::parse(transaction).map_err(|e| format!("PCZT parse failed: {e:?}"))?;

        let account_id = zip32::AccountId::try_from(account)
            .map_err(|_| format!("invalid account: {account}"))?;
        let sk = SpendingKey::from_zip32_seed(seed, self.network_type.coin_type(), account_id)
            .map_err(|e| format!("USK derivation failed: {e}"))?;

        let seed_fp = SeedFingerprint::from_seed(seed)
            .ok_or_else(|| "seed too short for fingerprint".to_string())?;
        let coin_type = ChildIndex::hardened(self.network_type.coin_type());
        let mut keys: BTreeMap<zip32::AccountId, Vec<KeyRef>> = BTreeMap::new();

        let pczt = Verifier::new(pczt)
            .with_orchard::<std::convert::Infallible, _>(|bundle| {
                for (index, action) in bundle.actions().iter().enumerate() {
                    if let Some(account_idx) = action
                        .spend()
                        .zip32_derivation()
                        .as_ref()
                        .and_then(|d| d.extract_account_index(&seed_fp, coin_type))
                    {
                        keys.entry(account_idx)
                            .or_default()
                            .push(KeyRef::Orchard { index });
                    }
                }
                Ok(())
            })
            .map_err(|e| format!("Verifier::with_orchard failed: {e:?}"))?
            .finish();

        // Generate Orchard proof before signing
        let orchard_pk = ProvingKey::build();
        let pczt = Prover::new(pczt)
            .create_orchard_proof(&orchard_pk)
            .map_err(|e| format!("Prover::create_orchard_proof failed: {e:?}"))?
            .finish();

        let ask = SpendAuthorizingKey::from(&sk);

        if keys.is_empty() {
            let num_actions = pczt.orchard().actions().len();
            let mut signer = Signer::new(pczt).map_err(|e| format!("Signer::new failed: {e:?}"))?;
            for i in 0..num_actions {
                match signer.sign_orchard(i, &ask) {
                    Ok(_) => {}
                    Err(e) => {
                        tracing::debug!(action = i, error = ?e, "sign_orchard failed for action (may be dummy spend)");
                    }
                }
            }
            let pczt = signer.finish();
            return Ok(pczt.serialize());
        }

        let mut signer = Signer::new(pczt).map_err(|e| format!("Signer::new failed: {e:?}"))?;
        for (_account_index, spends) in &keys {
            for keyref in spends {
                match keyref {
                    KeyRef::Orchard { index } => {
                        signer
                            .sign_orchard(*index, &ask)
                            .map_err(|e| format!("sign_orchard failed: {e:?}"))?;
                    }
                }
            }
        }

        let pczt = signer.finish();
        Ok(pczt.serialize())
    }
}

enum KeyRef {
    Orchard { index: usize },
}
