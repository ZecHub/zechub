use blake2::Digest;
use paypunk_types::ProtocolId;
use tracing::{info, warn};

use crate::crypto::Keypair;
use crate::key;
use crate::messages::{KeypunkdRequest, KeypunkdResponse};
use crate::protocol::ProtocolService;
use crate::seed_store::SeedStore;
use crate::usecases;

pub trait Storage: SeedStore + Send + Sync + 'static {}
impl<T: SeedStore + Send + Sync + 'static> Storage for T {}

pub struct Keypunk<S: Storage> {
    keystore: Keypair,
    seed_store: S,
    protocols: ProtocolService,
}

impl<S: Storage> Keypunk<S> {
    pub fn new(keystore: Keypair, seed_store: S, protocols: ProtocolService) -> Self {
        Self {
            keystore,
            seed_store,
            protocols,
        }
    }

    pub fn seed_store(&self) -> &S {
        &self.seed_store
    }

    fn respond<T>(
        &self,
        label: &str,
        result: Result<T, String>,
        map_ok: impl FnOnce(T) -> KeypunkdResponse,
    ) -> KeypunkdResponse {
        match result {
            Ok(v) => map_ok(v),
            Err(e) => {
                warn!(error = %e, "{label} failed");
                KeypunkdResponse::Error { message: e }
            }
        }
    }

    fn get_encryption_key(&self) -> KeypunkdResponse {
        info!("handling GetEncryptionKey");
        KeypunkdResponse::EncryptionKey {
            key: self.keystore.public_key(),
        }
    }

    fn generate_seed(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    ) -> KeypunkdResponse {
        info!("handling GenerateSeed");
        self.respond(
            "generate_seed",
            usecases::generate_seed(
                &self.keystore,
                &encrypted_password,
                &client_public_key,
                &self.seed_store,
            )
            .map_err(|e| e.to_string()),
            |encrypted_mnemonic| KeypunkdResponse::SeedGenerated { encrypted_mnemonic },
        )
    }

    fn restore_seed(
        &self,
        encrypted_mnemonic: Vec<u8>,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    ) -> KeypunkdResponse {
        info!("handling RestoreSeed");
        self.respond(
            "restore_seed",
            usecases::restore_seed(
                &self.keystore,
                &encrypted_mnemonic,
                &encrypted_password,
                &client_public_key,
                &self.seed_store,
            )
            .map_err(|e| e.to_string()),
            |()| KeypunkdResponse::SeedRestored,
        )
    }

    fn preview_artifact(
        &self,
        raw_artifact: Vec<u8>,
        protocol: ProtocolId,
        derivation_path: String,
        sender_public_key: Option<[u8; 32]>,
    ) -> KeypunkdResponse {
        info!(?protocol, "handling PreviewArtifact");

        let parsed_summary =
            match usecases::preview_artifact(&self.protocols, protocol, &raw_artifact) {
                Ok(s) => s,
                Err(e) => return KeypunkdResponse::Error { message: e },
            };

        let mut to_sign = Vec::new();
        to_sign.extend_from_slice(&raw_artifact);
        to_sign.extend_from_slice(&parsed_summary);
        to_sign.extend_from_slice(derivation_path.as_bytes());
        let hash = blake2::Blake2b::<blake2::digest::consts::U32>::digest(&to_sign);

        let peer_pk = sender_public_key.unwrap_or([0u8; 32]);
        let signature = self.keystore.encrypt_bytes(&hash, &peer_pk);

        KeypunkdResponse::ArtifactPreview {
            raw_artifact,
            parsed_summary,
            signature,
            keypunkd_public_key: self.keystore.public_key(),
        }
    }

    fn authorize_artifact(
        &self,
        encrypted_payload: Vec<u8>,
        ephemeral_public_key: [u8; 32],
        derivation_path: String,
        sender_public_key: Option<[u8; 32]>,
    ) -> KeypunkdResponse {
        info!("handling AuthorizeArtifact");

        let plaintext = match self
            .keystore
            .decrypt_bytes(&encrypted_payload, &ephemeral_public_key)
        {
            Ok(p) => p,
            Err(e) => {
                return KeypunkdResponse::Error {
                    message: format!("decryption failed: {e}"),
                }
            }
        };

        if plaintext.len() < 8 {
            return KeypunkdResponse::Error {
                message: "invalid encrypted payload".to_string(),
            };
        }

        let raw_len = u32::from_le_bytes(plaintext[0..4].try_into().unwrap()) as usize;
        if plaintext.len() < 4 + raw_len + 4 {
            return KeypunkdResponse::Error {
                message: "invalid encrypted payload: truncated".to_string(),
            };
        }
        let raw_end = 4 + raw_len;
        let raw_artifact = &plaintext[4..raw_end];

        let sig_len =
            u32::from_le_bytes(plaintext[raw_end..raw_end + 4].try_into().unwrap()) as usize;
        let sig_start = raw_end + 4;
        let sig_end = sig_start + sig_len;
        if plaintext.len() < sig_end {
            return KeypunkdResponse::Error {
                message: "invalid encrypted payload: truncated sig".to_string(),
            };
        }
        let sig = &plaintext[sig_start..sig_end];
        let password_bytes = &plaintext[sig_end..];

        let parsed_summary = self.try_parse_artifact(raw_artifact);

        if let Ok(ref summary) = parsed_summary {
            let mut to_verify = Vec::new();
            to_verify.extend_from_slice(raw_artifact);
            to_verify.extend_from_slice(summary);
            to_verify.extend_from_slice(derivation_path.as_bytes());
            let hash = blake2::Blake2b::<blake2::digest::consts::U32>::digest(&to_verify);

            let peer_pk = sender_public_key.unwrap_or([0u8; 32]);
            let decrypted_sig = match self.keystore.decrypt_bytes(sig, &peer_pk) {
                Ok(d) => d,
                Err(_) => {
                    return KeypunkdResponse::Error {
                        message: "signature verification failed: cannot decrypt".to_string(),
                    }
                }
            };

            if decrypted_sig.as_slice() != hash.as_slice() {
                return KeypunkdResponse::Error {
                    message: "artifact verification failed: summary mismatch".to_string(),
                };
            }
        }

        let password_str = match String::from_utf8(password_bytes.to_vec()) {
            Ok(s) => s,
            Err(_) => {
                return KeypunkdResponse::Error {
                    message: "invalid password encoding".to_string(),
                }
            }
        };

        let encrypted_store = match self.seed_store.read() {
            Ok(Some(e)) => e,
            Ok(None) => {
                return KeypunkdResponse::Error {
                    message: "no seed found".to_string(),
                }
            }
            Err(e) => {
                return KeypunkdResponse::Error {
                    message: format!("read seed failed: {e}"),
                }
            }
        };

        let seed = match key::decrypt_seed(&encrypted_store, &password_str) {
            Ok(s) => s,
            Err(e) => {
                return KeypunkdResponse::Error {
                    message: format!("seed decryption failed: {e}"),
                }
            }
        };

        let signed_artifact =
            match usecases::sign_artifact(&seed, &self.protocols, &derivation_path, raw_artifact) {
                Ok(s) => s,
                Err(e) => return KeypunkdResponse::Error { message: e },
            };

        KeypunkdResponse::ArtifactAuthorized { signed_artifact }
    }

    fn try_parse_artifact(&self, raw_artifact: &[u8]) -> Result<Vec<u8>, String> {
        for id in [ProtocolId::Zcash, ProtocolId::Ethereum] {
            if let Some(protocol) = self.protocols.get(id) {
                if let Ok(summary) = protocol.parse_artifact(raw_artifact) {
                    return Ok(summary);
                }
            }
        }
        Err("no protocol could parse the artifact".to_string())
    }

    fn export_viewing_key(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
        protocol: ProtocolId,
        derivation_path: String,
    ) -> KeypunkdResponse {
        info!(?protocol, path = %derivation_path, "handling ExportViewingKey");

        let seed = match usecases::decrypt_seed(
            &encrypted_password,
            &client_public_key,
            &self.keystore,
            &self.seed_store,
        ) {
            Ok(s) => s,
            Err(e) => return KeypunkdResponse::Error { message: e },
        };

        self.respond(
            "export_viewing_key",
            usecases::export_viewing_key(&seed, &self.protocols, protocol, &derivation_path),
            |key| KeypunkdResponse::ViewingKey { key },
        )
    }

    fn verify_password(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    ) -> KeypunkdResponse {
        info!("handling VerifyPassword");
        match usecases::decrypt_seed(
            &encrypted_password,
            &client_public_key,
            &self.keystore,
            &self.seed_store,
        ) {
            Ok(_) => KeypunkdResponse::PasswordVerified,
            Err(e) => KeypunkdResponse::Error { message: e },
        }
    }

    /// Export viewing keys directly from a decrypted seed (no password encryption).
    /// Used by the signer app during registration where the user enters password on-device.
    pub fn export_viewing_keys_direct(
        &self,
        seed: &[u8; 64],
        paths: &[(ProtocolId, String)],
    ) -> Result<Vec<(ProtocolId, String, Vec<u8>)>, String> {
        usecases::bulk_export_viewing_keys(seed, &self.protocols, paths)
    }

    fn bulk_export_viewing_keys(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
        paths: Vec<(ProtocolId, String)>,
    ) -> KeypunkdResponse {
        info!(path_count = paths.len(), "handling BulkExportViewingKeys");

        let seed = match usecases::decrypt_seed(
            &encrypted_password,
            &client_public_key,
            &self.keystore,
            &self.seed_store,
        ) {
            Ok(s) => s,
            Err(e) => return KeypunkdResponse::Error { message: e },
        };

        self.respond(
            "bulk_export_viewing_keys",
            usecases::bulk_export_viewing_keys(&seed, &self.protocols, &paths),
            |keys| KeypunkdResponse::ViewingKeys { keys },
        )
    }

    fn export_mnemonic(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    ) -> KeypunkdResponse {
        info!("handling ExportMnemonic");
        self.respond(
            "export_mnemonic",
            usecases::export_mnemonic(
                &encrypted_password,
                &client_public_key,
                &self.keystore,
                &self.seed_store,
            ),
            |encrypted_mnemonic| KeypunkdResponse::MnemonicExported { encrypted_mnemonic },
        )
    }

    pub fn handle_request(
        &self,
        request: KeypunkdRequest,
        sender_public_key: Option<[u8; 32]>,
    ) -> KeypunkdResponse {
        match request {
            KeypunkdRequest::GetEncryptionKey => self.get_encryption_key(),
            KeypunkdRequest::GenerateSeed {
                encrypted_password,
                client_public_key,
            } => self.generate_seed(encrypted_password, client_public_key),
            KeypunkdRequest::RestoreSeed {
                encrypted_mnemonic,
                encrypted_password,
                client_public_key,
            } => self.restore_seed(encrypted_mnemonic, encrypted_password, client_public_key),
            KeypunkdRequest::PreviewArtifact {
                raw_artifact,
                protocol,
                chain_id: _,
                derivation_path,
            } => self.preview_artifact(raw_artifact, protocol, derivation_path, sender_public_key),
            KeypunkdRequest::AuthorizeArtifact {
                encrypted_payload,
                ephemeral_public_key,
                derivation_path,
            } => self.authorize_artifact(
                encrypted_payload,
                ephemeral_public_key,
                derivation_path,
                sender_public_key,
            ),
            KeypunkdRequest::ExportViewingKey {
                encrypted_password,
                client_public_key,
                protocol,
                derivation_path,
            } => self.export_viewing_key(
                encrypted_password,
                client_public_key,
                protocol,
                derivation_path,
            ),
            KeypunkdRequest::VerifyPassword {
                encrypted_password,
                client_public_key,
            } => self.verify_password(encrypted_password, client_public_key),
            KeypunkdRequest::BulkExportViewingKeys {
                encrypted_password,
                client_public_key,
                paths,
            } => self.bulk_export_viewing_keys(encrypted_password, client_public_key, paths),
            KeypunkdRequest::ExportMnemonic {
                encrypted_password,
                client_public_key,
            } => self.export_mnemonic(encrypted_password, client_public_key),
            // These are handled by the signer app, not keypunkd
            KeypunkdRequest::RegisterViewingKeys { .. }
            | KeypunkdRequest::VerifySignerSession { .. } => KeypunkdResponse::Error {
                message: "not supported in keypunkd mode".to_string(),
            },
        }
    }
}
