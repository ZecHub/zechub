use alloy_consensus::{SignableTransaction, TxEip1559};
use alloy_primitives::{Signature, TxKind, U256};
use async_trait::async_trait;
use k256::ecdsa::signature::hazmat::PrehashSigner;
use k256::ecdsa::{RecoveryId, SigningKey, VerifyingKey};
use paypunk_types::{ArtifactSummary, EthereumArtifactSummary, SignerProtocol};
use std::str::FromStr;

pub struct EthereumSignerProtocol;

impl EthereumSignerProtocol {
    pub fn new() -> Self {
        Self
    }
}

#[async_trait]
impl SignerProtocol for EthereumSignerProtocol {
    fn export_viewing(&self, seed: &[u8; 64], path: &str) -> Result<Vec<u8>, String> {
        let child_key = derive_secp256k1_child(seed, path)?;
        let signing_key =
            SigningKey::from_slice(&child_key).map_err(|e| format!("invalid key: {e}"))?;
        Ok(signing_key
            .verifying_key()
            .to_encoded_point(false)
            .as_bytes()
            .to_vec())
    }

    fn parse_artifact(&self, artifact: &[u8]) -> Result<Vec<u8>, String> {
        let tx: TxEip1559 =
            alloy_rlp::decode_exact(artifact).map_err(|e| format!("RLP decode failed: {e}"))?;

        let to = match tx.to {
            TxKind::Call(addr) => addr.to_string(),
            TxKind::Create => "contract_creation".to_string(),
        };

        let amount = format!("{}", tx.value);
        let fee = format!("{}", tx.max_fee_per_gas * tx.gas_limit as u128);

        let summary = ArtifactSummary::Ethereum(EthereumArtifactSummary {
            to,
            amount,
            fee,
            nonce: tx.nonce,
        });

        postcard::to_allocvec(&summary).map_err(|e| format!("serialize summary failed: {e}"))
    }

    fn sign(&self, seed: &[u8; 64], path: &str, artifact: &[u8]) -> Result<Vec<u8>, String> {
        sign_transaction_inner(seed, path, artifact)
    }
}

fn derive_secp256k1_child(seed: &[u8; 64], path: &str) -> Result<[u8; 32], String> {
    let parsed = bip32::DerivationPath::from_str(path)
        .map_err(|e| format!("invalid derivation path: {e}"))?;
    let key = bip32::ExtendedPrivateKey::<SigningKey>::derive_from_path(*seed, &parsed)
        .map_err(|e| format!("BIP32 derivation failed: {e}"))?;
    let mut child = [0u8; 32];
    child.copy_from_slice(&key.private_key().to_bytes());
    Ok(child)
}

fn sign_transaction_inner(
    seed: &[u8; 64],
    path: &str,
    transaction: &[u8],
) -> Result<Vec<u8>, String> {
    let child_key = derive_secp256k1_child(seed, path)?;
    let signing_key =
        SigningKey::from_slice(&child_key).map_err(|e| format!("invalid key: {e}"))?;

    let tx: TxEip1559 =
        alloy_rlp::decode_exact(transaction).map_err(|e| format!("RLP decode failed: {e}"))?;

    let sighash = tx.signature_hash();

    let sig = signing_key
        .sign_prehash(sighash.as_ref())
        .map_err(|e| format!("signing failed: {e}"))?;

    let rec_id = [0u8, 1]
        .into_iter()
        .find_map(|id| {
            let rid = RecoveryId::from_byte(id)?;
            VerifyingKey::recover_from_prehash(sighash.as_ref(), &sig, rid)
                .ok()
                .filter(|recovered| recovered == signing_key.verifying_key())
                .map(|_| rid)
        })
        .ok_or_else(|| "could not determine recovery ID".to_string())?;

    let alloy_sig = Signature::new(
        U256::from_be_slice(&sig.r().to_bytes()),
        U256::from_be_slice(&sig.s().to_bytes()),
        rec_id.is_y_odd(),
    );

    let signed = tx.into_signed(alloy_sig);
    let mut out = Vec::new();
    signed.eip2718_encode(&mut out);
    Ok(out)
}
