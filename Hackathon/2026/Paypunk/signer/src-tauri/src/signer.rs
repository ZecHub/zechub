use blake2::Digest;
use keypunkd::crypto::Keypair;
use keypunkd::keypunk::Keypunk;
use keypunkd::protocol::ProtocolService;
use keypunkd::seed_store::{FilesystemSeedStore, SeedStore};
use paypunk_chains_ethereum::signer::EthereumSignerProtocol;
use paypunk_chains_zcash::signer::ZcashSignerProtocol;
use paypunk_chains_zcash::to_local_params;
use paypunk_types::{
    ArtifactSummary, ChainId, KeypunkdRequest, KeypunkdResponse, ProtocolId,
};
use std::fs;
use std::path::PathBuf;
use zcash_protocol::consensus::{Network, NetworkType};

pub struct SignerState {
    keypunk: Keypunk<FilesystemSeedStore>,
    client_keypair: Keypair,
    session_keypair: Option<Keypair>,
    session_key_path: PathBuf,
    status: SignerStatus,
    data_dir: PathBuf,
}

pub struct HandleResult {
    pub response_bytes: Vec<u8>,
    pub raw_artifact: Option<Vec<u8>>,
    pub preview_signature: Option<Vec<u8>>,
    pub derivation_path: Option<String>,
}

pub struct RegistrationData {
    pub paths: Vec<(ProtocolId, String)>,
    pub challenge: [u8; 32],
    pub paypunkd_public_key: [u8; 32],
}

pub enum SignerStatus {
    Idle,
    Previewing {
        raw_artifact: Vec<u8>,
        summary: ArtifactSummary,
        derivation_path: String,
        protocol: ProtocolId,
        chain_id: ChainId,
        preview_signature: Vec<u8>,
    },
    AwaitingRegistration {
        data: RegistrationData,
    },
    Signing,
    Signed {
        signed_artifact: Vec<u8>,
    },
    Error(String),
}

impl SignerState {
    pub fn create(data_dir: PathBuf) -> Self {
        let server_keypair = Keypair::new();
        let client_keypair = Keypair::new();

        let seed_store = FilesystemSeedStore::new(
            data_dir.join("seed.enc").into_boxed_path(),
        );

        let mut protocols = ProtocolService::new();
        let (params, network_type) = (Network::TestNetwork, NetworkType::Regtest);
        protocols.register(
            ProtocolId::Zcash,
            Box::new(ZcashSignerProtocol::new(
                to_local_params(params, network_type),
                network_type,
            )),
        );
        protocols.register(
            ProtocolId::Ethereum,
            Box::new(EthereumSignerProtocol::new()),
        );

        let keypunk = Keypunk::new(server_keypair, seed_store, protocols);

        let session_key_path = data_dir.join("session_key.enc");
        let session_keypair = load_session_key(&session_key_path);

        Self {
            keypunk,
            client_keypair,
            session_keypair,
            session_key_path,
            status: SignerStatus::Idle,
            data_dir,
        }
    }

    pub fn server_public_key(&self) -> [u8; 32] {
        let response = self.keypunk.handle_request(
            KeypunkdRequest::GetEncryptionKey,
            Some(self.client_keypair.public_key()),
        );
        match response {
            KeypunkdResponse::EncryptionKey { key } => key,
            _ => [0u8; 32],
        }
    }

    pub fn has_seed(&self) -> bool {
        self.keypunk.seed_store().read().ok().flatten().is_some()
    }

    pub fn has_session_key(&self) -> bool {
        self.session_keypair.is_some()
    }

    pub fn generate_seed(
        &mut self,
        encrypted_password: Vec<u8>,
        ephemeral_public_key: [u8; 32],
    ) -> Result<Vec<u8>, String> {
        let request = KeypunkdRequest::GenerateSeed {
            encrypted_password,
            client_public_key: ephemeral_public_key,
        };

        let response = self.keypunk.handle_request(request, Some(ephemeral_public_key));

        match response {
            KeypunkdResponse::SeedGenerated {
                encrypted_mnemonic,
            } => Ok(encrypted_mnemonic),
            KeypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response".to_string()),
        }
    }

    pub fn restore_seed(
        &mut self,
        encrypted_mnemonic: Vec<u8>,
        encrypted_password: Vec<u8>,
        ephemeral_public_key: [u8; 32],
    ) -> Result<(), String> {
        let request = KeypunkdRequest::RestoreSeed {
            encrypted_mnemonic,
            encrypted_password,
            client_public_key: ephemeral_public_key,
        };

        let response = self.keypunk.handle_request(request, Some(ephemeral_public_key));

        match response {
            KeypunkdResponse::SeedRestored => Ok(()),
            KeypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response".to_string()),
        }
    }

    pub fn handle_request(&mut self, request_bytes: &[u8]) -> HandleResult {
        let request: KeypunkdRequest = match postcard::from_bytes(request_bytes) {
            Ok(r) => r,
            Err(e) => {
                let resp = KeypunkdResponse::Error {
                    message: format!("deserialize failed: {e}"),
                };
                return HandleResult {
                    response_bytes: postcard::to_allocvec(&resp).unwrap_or_default(),
                    raw_artifact: None,
                    preview_signature: None,
                    derivation_path: None,
                };
            }
        };

        match &request {
            KeypunkdRequest::RegisterViewingKeys {
                paths,
                challenge,
                paypunkd_public_key,
            } => {
                self.status = SignerStatus::AwaitingRegistration {
                    data: RegistrationData {
                        paths: paths.clone(),
                        challenge: *challenge,
                        paypunkd_public_key: *paypunkd_public_key,
                    },
                };
                let resp = KeypunkdResponse::Error {
                    message: "awaiting password on signer".to_string(),
                };
                return HandleResult {
                    response_bytes: postcard::to_allocvec(&resp).unwrap_or_default(),
                    raw_artifact: None,
                    preview_signature: None,
                    derivation_path: None,
                };
            }

            KeypunkdRequest::VerifySignerSession { challenge } => {
                let session = self.session_keypair.as_ref().ok_or_else(|| {
                    let resp = KeypunkdResponse::Error {
                        message: "no session key — register first".to_string(),
                    };
                    HandleResult {
                        response_bytes: postcard::to_allocvec(&resp).unwrap_or_default(),
                        raw_artifact: None,
                        preview_signature: None,
                        derivation_path: None,
                    }
                });
                match session {
                    Ok(session) => {
                        let hash = blake2::Blake2b::<blake2::digest::consts::U32>::digest(challenge);
                        let signed = session.encrypt_bytes(&hash, &session.public_key());
                        let resp = KeypunkdResponse::SessionVerified {
                            signed_challenge: signed,
                        };
                        return HandleResult {
                            response_bytes: postcard::to_allocvec(&resp).unwrap_or_default(),
                            raw_artifact: None,
                            preview_signature: None,
                            derivation_path: None,
                        };
                    }
                    Err(hr) => return hr,
                }
            }

            _ => {}
        }

        let client_pk = self.client_keypair.public_key();

        let (derivation_path_opt, protocol, chain_id) = match &request {
            KeypunkdRequest::PreviewArtifact {
                derivation_path,
                protocol,
                chain_id,
                ..
            } => (Some(derivation_path.clone()), Some(*protocol), Some(chain_id.clone())),
            _ => (None, None, None),
        };

        let response = self.keypunk.handle_request(request, Some(client_pk));

        if let KeypunkdResponse::ArtifactPreview {
            ref raw_artifact,
            ref parsed_summary,
            ref signature,
            ..
        } = response
        {
            let summary: ArtifactSummary = match postcard::from_bytes(parsed_summary) {
                Ok(s) => s,
                Err(_) => {
                    let resp = KeypunkdResponse::Error {
                        message: "summary deserialize failed".to_string(),
                    };
                    return HandleResult {
                        response_bytes: postcard::to_allocvec(&resp).unwrap_or_default(),
                        raw_artifact: None,
                        preview_signature: None,
                        derivation_path: None,
                    };
                }
            };

            self.status = SignerStatus::Previewing {
                raw_artifact: raw_artifact.clone(),
                summary,
                derivation_path: derivation_path_opt.clone().unwrap_or_default(),
                protocol: protocol.unwrap_or(ProtocolId::Zcash),
                chain_id: chain_id.unwrap_or_else(|| ChainId::parse("zcash:regtest").unwrap()),
                preview_signature: signature.clone(),
            };
        }

        HandleResult {
            response_bytes: postcard::to_allocvec(&response).unwrap_or_default(),
            raw_artifact: match &response {
                KeypunkdResponse::ArtifactPreview { raw_artifact, .. } => Some(raw_artifact.clone()),
                _ => None,
            },
            preview_signature: match &response {
                KeypunkdResponse::ArtifactPreview { signature, .. } => Some(signature.clone()),
                _ => None,
            },
            derivation_path: derivation_path_opt,
        }
    }

    pub fn complete_registration(&mut self, password: &str) -> Result<KeypunkdResponse, String> {
        let reg_data = match &self.status {
            SignerStatus::AwaitingRegistration { data } => data,
            _ => return Err("no pending registration".to_string()),
        };

        let reg_data = RegistrationData {
            paths: reg_data.paths.clone(),
            challenge: reg_data.challenge,
            paypunkd_public_key: reg_data.paypunkd_public_key,
        };

        let seed = self.decrypt_seed(password)?;

        let mut keys = Vec::new();
        for (protocol, path) in &reg_data.paths {
            let vk = self.keypunk.export_viewing_keys_direct(&seed, &[(*protocol, path.clone())])?;
            if let Some((_, _, vk)) = vk.into_iter().next() {
                keys.push((*protocol, path.clone(), vk));
            }
        }

        let session = self.session_keypair.get_or_insert_with(Keypair::new);
        save_session_key(&self.session_key_path, session)?;

        let hash = blake2::Blake2b::<blake2::digest::consts::U32>::digest(&reg_data.challenge);
        let signed_challenge = session.encrypt_bytes(&hash, &reg_data.paypunkd_public_key);

        self.status = SignerStatus::Idle;

        Ok(KeypunkdResponse::ViewingKeysRegistered {
            keys,
            session_public_key: session.public_key(),
            signed_challenge,
        })
    }

    fn decrypt_seed(&self, password: &str) -> Result<[u8; 64], String> {
        let encrypted = self
            .keypunk
            .seed_store()
            .read()
            .map_err(|e| format!("read seed failed: {e}"))?
            .ok_or_else(|| "no seed found".to_string())?;
        keypunkd::key::decrypt_seed(&encrypted, password)
            .map_err(|e| format!("seed decryption failed: {e}"))
    }

    pub fn export_viewing_keys_direct(&self, seed: &[u8; 64], paths: &[(ProtocolId, String)]) -> Result<Vec<(ProtocolId, String, Vec<u8>)>, String> {
        self.keypunk.export_viewing_keys_direct(seed, paths)
    }

    pub fn approve_and_sign(
        &mut self,
        encrypted_payload: Vec<u8>,
        ephemeral_public_key: [u8; 32],
        derivation_path: String,
    ) -> Result<Vec<u8>, String> {
        match &self.status {
            SignerStatus::Previewing { .. } => {}
            _ => return Err("no preview to sign".to_string()),
        };

        self.status = SignerStatus::Signing;

        let request = KeypunkdRequest::AuthorizeArtifact {
            encrypted_payload,
            ephemeral_public_key,
            derivation_path,
        };

        let client_pk = self.client_keypair.public_key();
        let response = self.keypunk.handle_request(request, Some(client_pk));

        match response {
            KeypunkdResponse::ArtifactAuthorized { signed_artifact } => {
                self.status = SignerStatus::Signed {
                    signed_artifact: signed_artifact.clone(),
                };
                Ok(signed_artifact)
            }
            KeypunkdResponse::Error { message } => {
                self.status = SignerStatus::Error(message.clone());
                Err(message)
            }
            _ => {
                let msg = "unexpected response".to_string();
                self.status = SignerStatus::Error(msg.clone());
                Err(msg)
            }
        }
    }

    pub fn status(&self) -> &SignerStatus {
        &self.status
    }

    pub fn delete_seed(&mut self) -> Result<(), String> {
        let seed_path = self.data_dir.join("seed.enc");
        let mnemonic_path = self.data_dir.join("seed.mnemonic.enc");

        let mut deleted_any = false;
        if seed_path.exists() {
            fs::remove_file(&seed_path).map_err(|e| format!("failed to delete seed: {e}"))?;
            deleted_any = true;
        }
        if mnemonic_path.exists() {
            fs::remove_file(&mnemonic_path).map_err(|e| format!("failed to delete mnemonic: {e}"))?;
            deleted_any = true;
        }

        if !deleted_any {
            return Err("no seed found to delete".to_string());
        }

        // Also clear session key
        self.session_keypair = None;
        let _ = fs::remove_file(&self.session_key_path);

        self.status = SignerStatus::Idle;
        Ok(())
    }

    pub fn status_mut(&mut self) -> &mut SignerStatus {
        &mut self.status
    }
}

fn load_session_key(_path: &PathBuf) -> Option<Keypair> {
    // Session key is not stored — we generate a fresh one each registration.
    // The keypair is held in memory for the lifetime of the app.
    // On restart, the user re-registers (quick VerifySignerSession flow).
    None
}

fn save_session_key(path: &PathBuf, keypair: &Keypair) -> Result<(), String> {
    // Persist the session keypair so it survives app restarts.
    let (_secret, public) = keypair.keypair();
    fs::write(path, &public).map_err(|e| format!("failed to save session key: {e}"))
}
