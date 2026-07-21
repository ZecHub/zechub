use async_trait::async_trait;
use keypunkd::crypto::Keypair;
use keypunkd::protocol::ProtocolService as KeypunkdProtocolService;
use keypunkd::seed_store::InMemorySeedStore;
use keypunkd::{Keypunk, Keypunkd};
use paypunk_api::Client;
use paypunk_chains_ethereum::protocol::EthereumProtocol;
use paypunk_chains_ethereum::rpc::EthRpcClient;
use paypunk_chains_ethereum::signer::EthereumSignerProtocol;
use paypunk_chains_zcash::protocol::ZcashProtocol;
use paypunk_chains_zcash::signer::ZcashSignerProtocol;
use paypunk_chains_zcash::to_local_params;
use paypunk_ipc::IpcMessage;
use paypunk_types::{ArtifactSummary, EthereumIntent, Intent, ProtocolId, SubmitIntentResult};
use paypunkd::database::Database;
use paypunkd::protocol_service::ProtocolService;
use paypunkd::{Paypunk, Paypunkd};
use tactix::{Actor, Recipient, Sender};
use zeroize::Zeroizing;

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
    ) -> Result<Option<paypunk_chains_ethereum::rpc::TxReceipt>, String> {
        Ok(None)
    }
}

/// Builder for wiring up the full actor chain in tests.
struct TestBuilder {
    eth_mock: MockRpcClient,
}

impl TestBuilder {
    fn new() -> Self {
        Self {
            eth_mock: MockRpcClient::new(0, 0),
        }
    }

    fn with_eth_balance(mut self, wei: u128) -> Self {
        self.eth_mock = MockRpcClient::new(wei, 0);
        self
    }

    fn with_erc20_balance(mut self, amount: u128) -> Self {
        self.eth_mock = MockRpcClient::new(0, amount);
        self
    }

    fn build(self) -> Recipient<IpcMessage> {
        let keystore = Keypair::new();
        let store = InMemorySeedStore::new();

        let mut keypunkd_protocols = KeypunkdProtocolService::new();
        keypunkd_protocols.register(
            ProtocolId::Zcash,
            Box::new(ZcashSignerProtocol::new(
                to_local_params(
                    zcash_protocol::consensus::Network::MainNetwork,
                    zcash_protocol::consensus::NetworkType::Main,
                ),
                zcash_protocol::consensus::NetworkType::Main,
            )),
        );
        keypunkd_protocols.register(
            ProtocolId::Ethereum,
            Box::new(EthereumSignerProtocol::new()),
        );

        let keypunkd_addr =
            Keypunkd::new(Keypunk::new(keystore, store, keypunkd_protocols)).start();
        let keypunkd_recipient = keypunkd_addr.recipient();

        let paypunkd_zcash = ZcashProtocol::new(
            to_local_params(
                zcash_protocol::consensus::Network::MainNetwork,
                zcash_protocol::consensus::NetworkType::Main,
            ),
            zcash_protocol::consensus::NetworkType::Main,
            None,
            None,
            None,
            None,
        );
        let paypunkd_ethereum = EthereumProtocol::new(self.eth_mock);
        let mut paypunkd_protocols = ProtocolService::new();
        paypunkd_protocols.register(Box::new(paypunkd_zcash));
        paypunkd_protocols.register(Box::new(paypunkd_ethereum));

        // Keep the temp dir alive for the lifetime of the actor (leak it).
        let db_dir = Box::leak(Box::new(tempfile::TempDir::new().unwrap()));
        let db = Database::open(db_dir.path()).unwrap();
        let paypunkd_keystore = Keypair::new();

        let paypunk = Paypunk::new(
            keypunkd_recipient,
            paypunkd_protocols,
            db,
            paypunkd_keystore,
        );
        let paypunkd_addr = Paypunkd::new(paypunk).start();
        paypunkd_addr.recipient()
    }
}

#[tokio::test]
async fn test_generate_seed_via_api() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let mnemonic = client
        .generate_seed(Zeroizing::new("hunter2".to_string()))
        .await
        .unwrap();

    assert_eq!(mnemonic.split_whitespace().count(), 12);
}

#[tokio::test]
async fn test_generate_seed_empty_password_via_api() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let mnemonic = client
        .generate_seed(Zeroizing::new("".to_string()))
        .await
        .unwrap();

    assert_eq!(mnemonic.split_whitespace().count(), 12);
}

#[tokio::test]
async fn test_generate_seed_different_passwords_produce_different_seeds() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let mnemonic_1 = client
        .generate_seed(Zeroizing::new("password1".to_string()))
        .await
        .unwrap();

    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let mnemonic_2 = client
        .generate_seed(Zeroizing::new("password2".to_string()))
        .await
        .unwrap();

    assert_ne!(mnemonic_1, mnemonic_2);
    assert_eq!(mnemonic_1.split_whitespace().count(), 12);
    assert_eq!(mnemonic_2.split_whitespace().count(), 12);
}

#[tokio::test]
async fn test_restore_seed_via_api() {
    let password = Zeroizing::new("hunter2".to_string());
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let mnemonic = client.generate_seed(password.clone()).await.unwrap();
    assert_eq!(mnemonic.split_whitespace().count(), 12);

    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let result = client
        .restore_seed(mnemonic.clone(), password.clone(), None)
        .await;

    assert!(result.is_ok());
}

#[tokio::test]
async fn test_restore_seed_invalid_mnemonic_fails() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let result = client
        .restore_seed(
            Zeroizing::new("not a valid bip39 mnemonic phrase".to_string()),
            Zeroizing::new("password".to_string()),
            None,
        )
        .await;

    assert!(result.is_err());
    assert!(result.unwrap_err().contains("invalid mnemonic"));
}

#[tokio::test]
async fn test_derive_address() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let password = Zeroizing::new("hunter2".to_string());
    client.generate_seed(password.clone()).await.unwrap();

    let address = client
        .derive_address(password.clone(), ProtocolId::Zcash, 0, 0)
        .await
        .unwrap();
    assert!(address.starts_with("u1"), "got: {address}");
    assert!(address.len() > 50, "got: {address}");
}

#[tokio::test]
async fn test_derive_different_indexes() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let password = Zeroizing::new("password".to_string());
    client.generate_seed(password.clone()).await.unwrap();

    let addr0 = client
        .derive_address(password.clone(), ProtocolId::Zcash, 0, 0)
        .await
        .unwrap();
    let addr1 = client
        .derive_address(password.clone(), ProtocolId::Zcash, 0, 1)
        .await
        .unwrap();
    let addr2 = client
        .derive_address(password.clone(), ProtocolId::Zcash, 0, 2)
        .await
        .unwrap();

    assert_ne!(addr0, addr1);
    assert_ne!(addr1, addr2);
    assert_ne!(addr0, addr2);
}

#[tokio::test]
async fn test_derive_address_is_deterministic() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let password = Zeroizing::new("password".to_string());
    client.generate_seed(password.clone()).await.unwrap();

    let addr_a = client
        .derive_address(password.clone(), ProtocolId::Zcash, 0, 0)
        .await
        .unwrap();

    // Second call with same seed + index should produce same address
    let addr_b = client
        .derive_address(password.clone(), ProtocolId::Zcash, 0, 0)
        .await
        .unwrap();

    assert_eq!(
        addr_a, addr_b,
        "same seed + index must produce same address"
    );
}

#[tokio::test]
async fn test_eth_balance_via_mock_rpc() {
    let recipient = TestBuilder::new()
        .with_eth_balance(10_000_000_000_000_000_000)
        .build();
    let client = Client::with_recipient(recipient);

    let password = Zeroizing::new("hunter2".to_string());
    client.generate_seed(password.clone()).await.unwrap();

    // Derive the address first
    let addr = client
        .derive_address(password.clone(), ProtocolId::Ethereum, 0, 0)
        .await
        .unwrap();

    let balance = client
        .get_balance(format!("eip155:1:{addr}"), "eip155:1/slip44:60".to_string())
        .await
        .unwrap();

    assert_eq!(balance.spendable.0, 10_000_000_000_000_000_000);
    assert_eq!(balance.total.0, 10_000_000_000_000_000_000);
    assert_eq!(balance.pending.0, 0);
}

#[tokio::test]
async fn test_eth_balance_zero() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let password = Zeroizing::new("hunter2".to_string());
    client.generate_seed(password.clone()).await.unwrap();

    let addr = client
        .derive_address(password.clone(), ProtocolId::Ethereum, 0, 0)
        .await
        .unwrap();

    let balance = client
        .get_balance(format!("eip155:1:{addr}"), "eip155:1/slip44:60".to_string())
        .await
        .unwrap();

    assert_eq!(balance.spendable.0, 0);
    assert_eq!(balance.total.0, 0);
    assert_eq!(balance.pending.0, 0);
}

#[tokio::test]
async fn test_eth_send_full_flow() {
    let recipient = TestBuilder::new()
        .with_eth_balance(10_000_000_000_000_000_000) // 10 ETH
        .build();
    let client = Client::with_recipient(recipient);

    let password = Zeroizing::new("hunter2".to_string());
    client.generate_seed(password.clone()).await.unwrap();

    let addr = client
        .derive_address(password.clone(), ProtocolId::Ethereum, 0, 0)
        .await
        .unwrap();

    let intent = Intent::Ethereum(EthereumIntent::Transfer {
        to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045".to_string(),
        amount: "0.0001".to_string(),
        from: addr.clone(),
        asset: "eip155:1/slip44:60".to_string(),
        data: None,
    });
    let path = "m/44'/60'/0'/0/0";

    let result = client
        .submit_intent(intent, path)
        .await
        .expect("submit_intent should succeed");

    match result {
        SubmitIntentResult::SignablePreview {
            raw_artifact,
            parsed_summary,
            keypunkd_signature,
            keypunkd_public_key: _,
        } => {
            assert!(!raw_artifact.is_empty(), "raw_artifact should not be empty");
            assert!(
                !parsed_summary.is_empty(),
                "parsed_summary should not be empty"
            );
            assert!(
                !keypunkd_signature.is_empty(),
                "signature should not be empty"
            );

            let summary: ArtifactSummary =
                postcard::from_bytes(&parsed_summary).expect("should deserialize ArtifactSummary");
            match &summary {
                ArtifactSummary::Ethereum(eth) => {
                    assert_eq!(eth.to, "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
                }
                _ => panic!("expected Ethereum summary"),
            }

            let signed_artifact = client
                .approve_signature(&raw_artifact, &keypunkd_signature, password.clone(), path)
                .await
                .expect("approve_signature should succeed");

            assert!(
                !signed_artifact.is_empty(),
                "signed_artifact should not be empty"
            );

            let tx_hash = client
                .broadcast_transaction(ProtocolId::Ethereum, signed_artifact)
                .await
                .expect("broadcast should succeed");

            assert!(!tx_hash.is_empty(), "tx_hash should not be empty");
            assert_eq!(tx_hash, "0xdeadbeef", "should match mock RPC response");
        }
        _ => panic!("expected SignablePreview"),
    }
}

#[tokio::test]
async fn test_create_account() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let password = Zeroizing::new("hunter2".to_string());
    client.generate_seed(password.clone()).await.unwrap();
    client.unlock(password).await.unwrap();

    // Account 0 is auto-created on unlock; create account 1
    let account = client
        .create_account(
            ProtocolId::Zcash,
            "m/44'/133'/1'".to_string(),
            1,
            "My Zcash Wallet".to_string(),
            None,
        )
        .await
        .unwrap();

    assert_eq!(account.protocol, ProtocolId::Zcash);
    assert_eq!(account.name, "My Zcash Wallet");
    assert!(!account.viewing_key.is_empty());
    assert!(!account.id.is_empty());
}

#[tokio::test]
async fn test_list_accounts() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let password = Zeroizing::new("hunter2".to_string());
    client.generate_seed(password.clone()).await.unwrap();
    client.unlock(password).await.unwrap();

    // Account 0 for both protocols are auto-created on unlock;
    // create account 1 for Ethereum
    let acct1 = client
        .create_account(
            ProtocolId::Zcash,
            "m/44'/133'/1'".into(),
            1,
            "Zcash 1".into(),
            None,
        )
        .await
        .unwrap();
    let acct2 = client
        .create_account(
            ProtocolId::Ethereum,
            "m/44'/60'/1'/0/0".into(),
            1,
            "Ethereum 1".into(),
            None,
        )
        .await
        .unwrap();

    let accounts = client.list_accounts().await.unwrap();
    // 2 auto-created (Zcash 0 + Ethereum 0) + 2 manually created = 4
    assert_eq!(accounts.len(), 4);
    assert!(accounts.iter().any(|a| a.id == acct1.id));
    assert!(accounts.iter().any(|a| a.id == acct2.id));
}

#[tokio::test]
async fn test_get_account_by_id() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let password = Zeroizing::new("hunter2".to_string());
    client.generate_seed(password.clone()).await.unwrap();
    client.unlock(password).await.unwrap();

    // Account 0 for Zcash is auto-created on unlock
    let accounts = client.list_accounts().await.unwrap();
    let zcash_acct = accounts
        .iter()
        .find(|a| a.protocol == ProtocolId::Zcash)
        .cloned()
        .unwrap();

    let found = client.get_account(zcash_acct.id.clone()).await.unwrap();
    assert!(found.is_some());
    assert_eq!(found.unwrap().id, zcash_acct.id);
}

#[tokio::test]
async fn test_create_account_beyond_range_fails() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let password = Zeroizing::new("hunter2".to_string());
    client.generate_seed(password.clone()).await.unwrap();
    client.unlock(password).await.unwrap();

    let result = client
        .create_account(
            ProtocolId::Zcash,
            "m/44'/133'/30'".into(),
            30,
            "Too Far".into(),
            None,
        )
        .await;

    assert!(result.is_err());
    assert!(result.unwrap_err().contains("beyond pre-derived range"));
}

#[tokio::test]
async fn test_create_account_duplicate_fails() {
    let recipient = TestBuilder::new().build();
    let client = Client::with_recipient(recipient);

    let password = Zeroizing::new("hunter2".to_string());
    client.generate_seed(password.clone()).await.unwrap();
    client.unlock(password).await.unwrap();

    // Account 0 for Zcash is auto-created on unlock; trying to create it again should fail
    let result = client
        .create_account(
            ProtocolId::Zcash,
            "m/44'/133'/0'".into(),
            0,
            "Duplicate".into(),
            None,
        )
        .await;

    assert!(result.is_err());
    assert!(result.unwrap_err().contains("account already exists"));
}
