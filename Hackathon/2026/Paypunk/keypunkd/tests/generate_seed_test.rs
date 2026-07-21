use keypunkd::crypto::Keypair;
use keypunkd::messages::{KeypunkdRequest, KeypunkdResponse};
use keypunkd::protocol::ProtocolService;
use keypunkd::seed_store::InMemorySeedStore;
use keypunkd::{Keypunk, Keypunkd};
use paypunk_ipc::IpcMessage;
use tactix::{Actor, Sender};

fn msg_with_sender(payload: Vec<u8>, sender: [u8; 32]) -> IpcMessage {
    IpcMessage {
        payload,
        sender_public_key: Some(sender),
    }
}

#[tokio::test]
async fn test_get_public_key() {
    let keystore = Keypair::new();
    let store = InMemorySeedStore::new();
    let protocols = ProtocolService::new();
    let addr = Keypunkd::new(Keypunk::new(keystore, store, protocols)).start();

    let sender = Keypair::new().public_key();
    let bytes = postcard::to_allocvec(&KeypunkdRequest::GetEncryptionKey).unwrap();
    let response_bytes = addr.ask(msg_with_sender(bytes, sender)).await.unwrap();
    let response: KeypunkdResponse = postcard::from_bytes(&response_bytes).unwrap();

    match response {
        KeypunkdResponse::EncryptionKey { key } => {
            assert_eq!(key.len(), 32);
        }
        other => panic!("expected PublicKey, got {other:?}"),
    }
}

#[tokio::test]
async fn test_generate_seed_no_filesystem() {
    let keystore = Keypair::new();
    let store = InMemorySeedStore::new();
    let protocols = ProtocolService::new();
    let addr = Keypunkd::new(Keypunk::new(keystore, store, protocols)).start();

    // Client side
    let client = Keypair::new();
    let sender = client.public_key();

    let server_pk = {
        let bytes = postcard::to_allocvec(&KeypunkdRequest::GetEncryptionKey).unwrap();
        let response_bytes = addr.ask(msg_with_sender(bytes, sender)).await.unwrap();
        let response: KeypunkdResponse = postcard::from_bytes(&response_bytes).unwrap();
        match response {
            KeypunkdResponse::EncryptionKey { key } => key,
            _ => panic!("expected PublicKey"),
        }
    };

    let encrypted_password =
        client.encrypt(zeroize::Zeroizing::new("hunter2".to_string()), &server_pk);
    let client_pk = client.public_key();

    let request = KeypunkdRequest::GenerateSeed {
        encrypted_password,
        client_public_key: client_pk,
    };
    let bytes = postcard::to_allocvec(&request).unwrap();
    let response_bytes = addr.ask(msg_with_sender(bytes, sender)).await.unwrap();
    let response: KeypunkdResponse = postcard::from_bytes(&response_bytes).unwrap();

    match response {
        KeypunkdResponse::SeedGenerated { encrypted_mnemonic } => {
            let mnemonic = client.decrypt(&encrypted_mnemonic, &server_pk).unwrap();
            assert_eq!(mnemonic.split_whitespace().count(), 12);
        }
        other => panic!("expected SeedGenerated, got {other:?}"),
    }
}

#[tokio::test]
async fn test_generate_seed_empty_password() {
    let keystore = Keypair::new();
    let store = InMemorySeedStore::new();
    let protocols = ProtocolService::new();
    let addr = Keypunkd::new(Keypunk::new(keystore, store, protocols)).start();

    let client = Keypair::new();
    let sender = client.public_key();

    let server_pk = {
        let bytes = postcard::to_allocvec(&KeypunkdRequest::GetEncryptionKey).unwrap();
        let response_bytes = addr.ask(msg_with_sender(bytes, sender)).await.unwrap();
        let response: KeypunkdResponse = postcard::from_bytes(&response_bytes).unwrap();
        match response {
            KeypunkdResponse::EncryptionKey { key } => key,
            _ => panic!("expected PublicKey"),
        }
    };

    let encrypted_password = client.encrypt(zeroize::Zeroizing::new("".to_string()), &server_pk);

    let request = KeypunkdRequest::GenerateSeed {
        encrypted_password,
        client_public_key: client.public_key(),
    };
    let bytes = postcard::to_allocvec(&request).unwrap();
    let response_bytes = addr.ask(msg_with_sender(bytes, sender)).await.unwrap();
    let response: KeypunkdResponse = postcard::from_bytes(&response_bytes).unwrap();

    match response {
        KeypunkdResponse::SeedGenerated { encrypted_mnemonic } => {
            let mnemonic = client.decrypt(&encrypted_mnemonic, &server_pk).unwrap();
            assert_eq!(mnemonic.split_whitespace().count(), 12);
        }
        other => panic!("expected SeedGenerated, got {other:?}"),
    }
}
