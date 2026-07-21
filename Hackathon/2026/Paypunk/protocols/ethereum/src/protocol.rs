use alloy_consensus::{SignableTransaction, TxEip1559};
use alloy_primitives::{Address, Signature, TxKind, U256};
use async_trait::async_trait;
use hex;
use k256::ecdsa::signature::hazmat::PrehashSigner;
use k256::ecdsa::{RecoveryId, SigningKey, VerifyingKey};
use paypunk_types::{
    caip, ArtifactSummary, ChainId, EthereumArtifactSummary, EthereumIntent, Intent, Protocol,
    ProtocolId, SignerProtocol,
};
use std::str::FromStr;

use crate::address;
use crate::rpc::EthRpcClient;

pub struct EthereumProtocol<T: EthRpcClient> {
    pub client: T,
}

impl<T: EthRpcClient> EthereumProtocol<T> {
    pub const COIN_TYPE: u32 = 60;

    pub fn new(client: T) -> Self {
        Self { client }
    }
}

#[async_trait]
impl<T: EthRpcClient> Protocol for EthereumProtocol<T> {
    fn protocol_id(&self) -> ProtocolId {
        ProtocolId::Ethereum
    }

    async fn build(&self, intent: &Intent) -> Result<Vec<u8>, String> {
        let (to, amount, data, from) = match intent {
            Intent::Ethereum(EthereumIntent::Transfer {
                to,
                amount,
                from,
                asset: _,
                data,
            }) => (to.as_str(), amount.as_str(), data.as_deref(), from.as_str()),
            Intent::Ethereum(EthereumIntent::ContractCall {
                to,
                amount,
                from,
                asset: _,
                data,
            }) => (
                to.as_str(),
                amount.as_str(),
                Some(data.as_str()),
                from.as_str(),
            ),
            _ => return Err("unexpected intent variant for Ethereum protocol".to_string()),
        };

        // Validate the from address
        if !address::validate_address(from) {
            return Err(format!("invalid from address: {from}"));
        }

        let to_addr: Address = to.parse().map_err(|e| format!("invalid address: {e}"))?;

        let amount_wei = parse_amount(amount)?;
        let chain_id = self.client.get_chain_id().await?;
        let nonce = self.client.get_transaction_count(from).await?;
        let gas_limit = 21_000u64;
        let gas_price = self.client.get_gas_price().await?;
        let priority_fee = 1_000_000_000;

        let input = data
            .map(|d| {
                let hex_str = d.strip_prefix("0x").unwrap_or(d);
                alloy_primitives::Bytes::from(hex::decode(hex_str).unwrap_or_default())
            })
            .unwrap_or_default();

        let tx = TxEip1559 {
            chain_id,
            nonce,
            gas_limit,
            max_fee_per_gas: gas_price,
            max_priority_fee_per_gas: priority_fee,
            to: TxKind::Call(to_addr),
            value: amount_wei,
            input,
            access_list: Default::default(),
        };

        Ok(alloy_rlp::encode(&tx))
    }

    fn validate_address(&self, address: &str) -> bool {
        address::validate_address(address)
    }

    fn finalize(&self, signed: &[u8]) -> Result<Vec<u8>, String> {
        let mut buf = signed;
        let signed_tx = alloy_consensus::Signed::<TxEip1559>::eip2718_decode(&mut buf)
            .map_err(|e| format!("invalid tx: {e}"))?;
        let mut out = Vec::new();
        signed_tx.eip2718_encode(&mut out);
        Ok(out)
    }

    async fn store_and_finalize(
        &self,
        signed_pczt: &[u8],
    ) -> Result<(Vec<u8>, Option<String>), String> {
        let finalized = self.finalize(signed_pczt)?;
        Ok((finalized, None))
    }

    async fn get_balance(
        &self,
        address: &str,
        asset: &str,
    ) -> Result<paypunk_types::Balance, String> {
        // Parse CAIP-10 address to get the raw address
        let account =
            caip::AccountId::parse(address).map_err(|e| format!("invalid CAIP-10 address: {e}"))?;

        // Parse CAIP-19 asset to determine native vs token
        let parsed =
            caip::AssetId::parse(asset).map_err(|e| format!("invalid CAIP-19 asset: {e}"))?;
        let asset_id = parsed.to_asset_enum("60");

        let balance: u128 = self
            .client
            .get_balance(&account.account_address, &asset_id)
            .await?;
        Ok(paypunk_types::Balance {
            spendable: paypunk_types::Amount(balance),
            pending: paypunk_types::Amount(0),
            total: paypunk_types::Amount(balance),
        })
    }

    async fn broadcast(&self, finalized_tx: &[u8]) -> Result<String, String> {
        self.client.send_raw_transaction(finalized_tx).await
    }

    // ── Protocol metadata ───────────────────────────────────────────────────

    fn chain_id(&self) -> ChainId {
        ChainId {
            namespace: "eip155".to_string(),
            reference: "1".to_string(),
        }
    }

    fn native_asset(&self) -> String {
        "eip155:1/slip44:60".to_string()
    }

    fn ticker(&self) -> &str {
        "ETH"
    }

    fn decimals(&self) -> u8 {
        18
    }

    fn block_explorer_url(&self, tx_hash: &str) -> String {
        format!("https://etherscan.io/tx/{}", tx_hash)
    }

    fn default_derivation_path(&self, account: u32) -> String {
        crate::derivation_path(account)
    }

    fn default_account_name(&self, account_index: u32) -> String {
        format!("Ethereum Account {account_index}")
    }

    // ── Key operations ──────────────────────────────────────────────────────

    fn derive_address_from_viewing_key(&self, vk: &[u8], _index: u32) -> Result<String, String> {
        let addr = address::derive_from_pubkey(vk).map_err(|e| e.to_string())?;
        Ok(addr.to_string())
    }
}

/// Encode an ERC-20 `transfer(address,uint256)` call.
#[allow(dead_code)]
fn encode_erc20_transfer(recipient: &Address, amount: u64) -> alloy_primitives::Bytes {
    let mut data = Vec::with_capacity(68);
    // transfer(address,uint256) selector: 0xa9059cbb
    data.extend_from_slice(&[0xa9, 0x05, 0x9c, 0xbb]);
    // recipient (32 bytes, left-padded)
    let mut recipient_bytes = [0u8; 32];
    recipient_bytes[12..].copy_from_slice(recipient.as_ref());
    data.extend_from_slice(&recipient_bytes);
    // amount (32 bytes, left-padded)
    let amount_bytes = U256::from(amount).to_be_bytes::<32>();
    data.extend_from_slice(&amount_bytes);
    alloy_primitives::Bytes::from(data)
}

fn parse_amount(amount: &str) -> Result<U256, String> {
    // Parse human-readable amount string (e.g. "1.5", "0.05")
    let wei_factor = U256::from(1_000_000_000_000_000_000u128);
    let parts: Vec<&str> = amount.split('.').collect();
    match parts.len() {
        1 => {
            let v: u64 = parts[0]
                .parse()
                .map_err(|e| format!("invalid amount: {e}"))?;
            Ok(wei_factor * U256::from(v))
        }
        2 => {
            let whole: u64 = parts[0]
                .parse()
                .map_err(|e| format!("invalid amount: {e}"))?;
            let fraction_str = format!("{:0<18}", parts[1]);
            let fraction: u64 = fraction_str[..18]
                .parse()
                .map_err(|e| format!("invalid amount: {e}"))?;
            Ok(wei_factor * U256::from(whole) + U256::from(fraction))
        }
        _ => Err("invalid amount format".to_string()),
    }
}

#[async_trait]
impl<T: EthRpcClient> SignerProtocol for EthereumProtocol<T> {
    fn export_viewing(&self, seed: &[u8; 64], path: &str) -> Result<Vec<u8>, String> {
        let parsed = bip32::DerivationPath::from_str(path)
            .map_err(|e| format!("invalid derivation path: {e}"))?;
        let key = bip32::ExtendedPrivateKey::<SigningKey>::derive_from_path(*seed, &parsed)
            .map_err(|e| format!("BIP32 derivation failed: {e}"))?;
        Ok(key
            .private_key()
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
        self.sign_transaction_inner(seed, path, artifact)
    }
}

impl<T: EthRpcClient> EthereumProtocol<T> {
    fn sign_transaction_inner(
        &self,
        seed: &[u8; 64],
        path: &str,
        transaction: &[u8],
    ) -> Result<Vec<u8>, String> {
        let parsed =
            bip32::DerivationPath::from_str(path).map_err(|e| format!("invalid path: {e}"))?;
        let key = bip32::ExtendedPrivateKey::<SigningKey>::derive_from_path(*seed, &parsed)
            .map_err(|e| format!("BIP32 derivation failed: {e}"))?;
        let sk = key.private_key();

        let tx: TxEip1559 =
            alloy_rlp::decode_exact(transaction).map_err(|e| format!("RLP decode failed: {e}"))?;

        let sighash = tx.signature_hash();

        let sig = sk
            .sign_prehash(sighash.as_ref())
            .map_err(|e| format!("signing failed: {e}"))?;

        let rec_id = [0u8, 1]
            .into_iter()
            .find_map(|id| {
                let rid = RecoveryId::from_byte(id)?;
                VerifyingKey::recover_from_prehash(sighash.as_ref(), &sig, rid)
                    .ok()
                    .filter(|recovered| recovered == sk.verifying_key())
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
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::rpc::EthRpcClient;
    use bip39::Mnemonic;

    const MNEMONIC: &str =
        "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

    /// A mock RPC client that returns fixed balances for testing.
    struct MockRpcClient {
        eth_balance: u128,
        erc20_balance: u128,
    }

    impl MockRpcClient {
        fn new(eth_balance: u128, erc20_balance: u128) -> Self {
            Self {
                eth_balance,
                erc20_balance,
            }
        }
    }

    #[async_trait]
    impl EthRpcClient for MockRpcClient {
        async fn get_balance(
            &self,
            _address: &str,
            asset: &paypunk_types::AssetId,
        ) -> Result<u128, String> {
            match asset {
                paypunk_types::AssetId::Native => Ok(self.eth_balance),
                paypunk_types::AssetId::Token(_) => Ok(self.erc20_balance),
            }
        }
        async fn get_transaction_count(&self, _address: &str) -> Result<u64, String> {
            Ok(0)
        }
        async fn get_chain_id(&self) -> Result<u64, String> {
            Ok(1)
        }
        async fn send_raw_transaction(&self, _raw_tx: &[u8]) -> Result<String, String> {
            Ok("0xdeadbeef".to_string())
        }
        async fn get_gas_price(&self) -> Result<u128, String> {
            Ok(20_000_000_000)
        }
        async fn estimate_gas(
            &self,
            _from: &str,
            _to: &str,
            _value: &str,
            _data: &str,
        ) -> Result<u64, String> {
            Ok(21_000)
        }
        async fn get_block_number(&self) -> Result<u64, String> {
            Ok(19_000_000)
        }
        async fn get_transaction_receipt(
            &self,
            _tx_hash: &str,
        ) -> Result<Option<crate::rpc::TxReceipt>, String> {
            Ok(None)
        }
    }

    fn seed_from_mnemonic() -> [u8; 64] {
        let mnemonic: Mnemonic = MNEMONIC.parse().unwrap();
        mnemonic.to_seed("")
    }

    #[test]
    fn test_chain_id() {
        let protocol = EthereumProtocol::new(MockRpcClient::new(0, 0));
        let chain = protocol.chain_id();
        assert_eq!(chain.namespace, "eip155");
        assert_eq!(chain.reference, "1");
    }

    #[tokio::test]
    async fn test_parse_artifact() {
        let protocol = EthereumProtocol::new(MockRpcClient::new(0, 0));
        let _seed = seed_from_mnemonic();

        // Build an unsigned transaction
        let intent = Intent::Ethereum(EthereumIntent::Transfer {
            to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045".to_string(),
            amount: "0.0001".to_string(),
            from: "0x9858effd232b4033e47d90003d41ec34ecaeda94".to_string(),
            asset: "eip155:1/slip44:60".to_string(),
            data: None,
        });

        let unsigned = protocol.build(&intent).await.unwrap();
        let parsed = protocol.parse_artifact(&unsigned).unwrap();
        let summary: ArtifactSummary = postcard::from_bytes(&parsed).unwrap();
        match &summary {
            ArtifactSummary::Ethereum(eth) => {
                assert_eq!(eth.to, "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
                assert_eq!(eth.amount, "100000000000000");
            }
            _ => panic!("expected Ethereum summary"),
        }
    }

    #[tokio::test]
    async fn test_create_and_sign_transaction() {
        let protocol = EthereumProtocol::new(MockRpcClient::new(0, 0));
        let seed = seed_from_mnemonic();

        let intent = Intent::Ethereum(EthereumIntent::Transfer {
            to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045".to_string(),
            amount: "0.0001".to_string(),
            from: "0x9858effd232b4033e47d90003d41ec34ecaeda94".to_string(),
            asset: "eip155:1/slip44:60".to_string(),
            data: None,
        });

        let unsigned = protocol.build(&intent).await.unwrap();
        assert!(!unsigned.is_empty());

        let path = "m/44'/60'/0'/0/0";
        let signed = protocol.sign(&seed, path, &unsigned).unwrap();
        assert!(!signed.is_empty());

        let finalized = protocol.finalize(&signed).unwrap();
        assert_eq!(signed, finalized);
    }

    #[test]
    fn test_validate_address() {
        let protocol = EthereumProtocol::new(MockRpcClient::new(0, 0));
        assert!(protocol.validate_address("0x9858effd232b4033e47d90003d41ec34ecaeda94"));
        assert!(!protocol.validate_address("invalid"));
    }

    #[tokio::test]
    async fn test_get_native_balance() {
        let protocol = EthereumProtocol::new(MockRpcClient::new(10_000_000_000_000_000_000, 0));
        let address = "eip155:1:0x9858effd232b4033e47d90003d41ec34ecaeda94";
        let asset = "eip155:1/slip44:60";
        let balance = protocol.get_balance(address, asset).await.unwrap();
        assert_eq!(balance.spendable.0, 10_000_000_000_000_000_000);
        assert_eq!(balance.total.0, 10_000_000_000_000_000_000);
        assert_eq!(balance.pending.0, 0);
    }

    #[tokio::test]
    async fn test_get_erc20_balance() {
        let protocol = EthereumProtocol::new(MockRpcClient::new(0, 5_000_000_000_000_000_000));
        let address = "eip155:1:0x9858effd232b4033e47d90003d41ec34ecaeda94";
        let asset = "eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
        let balance = protocol.get_balance(address, asset).await.unwrap();
        assert_eq!(balance.spendable.0, 5_000_000_000_000_000_000);
        assert_eq!(balance.total.0, 5_000_000_000_000_000_000);
        assert_eq!(balance.pending.0, 0);
    }
}
