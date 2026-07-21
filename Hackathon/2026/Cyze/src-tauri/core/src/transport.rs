//! frostd HTTP client.
//!
//! This is a thin vendoring of upstream `frost_client::client::Client`
//! (which constructs its own `reqwest::Client` internally) so that we can
//! inject a client with a pinned self-signed certificate. The API surface
//! and wire format are identical; all request/response types come from
//! `frost_client::api`.

use frost_client::api;
use frost_client::cipher::PrivateKey;
use uuid::Uuid;

use crate::error::CoreError;

/// How to trust the server's TLS certificate.
#[derive(Debug, Clone)]
pub enum ServerTrust {
    /// Standard WebPKI roots only (public servers with real certificates).
    SystemRoots,
    /// Additionally trust one specific certificate (PEM) — used for the
    /// embedded sidecar's self-signed cert and TOFU-imported external certs.
    PinnedCertificate(Vec<u8>),
}

/// A frostd client bound to one server URL.
pub struct FrostdClient {
    base_url: String,
    client: reqwest::Client,
    access_token: Option<Uuid>,
}

impl FrostdClient {
    /// `base_url` like `https://host:port` (no trailing slash).
    pub fn new(base_url: String, trust: &ServerTrust) -> Result<Self, CoreError> {
        let mut builder = reqwest::Client::builder();
        if let ServerTrust::PinnedCertificate(pem) = trust {
            let cert = reqwest::Certificate::from_pem(pem)
                .map_err(|e| CoreError::Tls(e.to_string()))?;
            builder = builder.add_root_certificate(cert);
        }
        let client = builder
            .build()
            .map_err(|e| CoreError::Tls(e.to_string()))?;
        Ok(Self {
            base_url: base_url.trim_end_matches('/').to_string(),
            client,
            access_token: None,
        })
    }

    async fn call<A, O>(&self, name: &str, args: &A) -> Result<O, CoreError>
    where
        A: serde::Serialize,
        O: serde::de::DeserializeOwned,
    {
        let req = self.client.post(format!("{}/{}", self.base_url, name)).json(args);
        let req = if let Some(token) = &self.access_token {
            req.bearer_auth(token.to_string())
        } else {
            req
        };
        // `e.to_string()` on a reqwest error yields only "error sending request
        // for url (…)" — the DNS/refused/TLS cause underneath is dropped. Walk the
        // chain and name the fix (a dead quick tunnel, notably, is just a DNS
        // failure and is otherwise indistinguishable from a typo).
        let response = req.send().await.map_err(|e| {
            crate::neterr::connection_error("reaching the signing server", &self.base_url, &e)
        })?;
        if !response.status().is_success() {
            if response.status() == reqwest::StatusCode::INTERNAL_SERVER_ERROR {
                let err = response
                    .json::<api::LowError>()
                    .await
                    .map_err(|e| CoreError::Connection(e.to_string()))?;
                let err: api::Error = err.into();
                Err(CoreError::Server(err.to_string()))
            } else {
                Err(CoreError::Connection(format!(
                    "HTTP {}",
                    response.status()
                )))
            }
        } else {
            let body = response
                .text()
                .await
                .map_err(|e| CoreError::Connection(e.to_string()))?;
            let json_str = if body.is_empty() { "null" } else { &body };
            serde_json::from_str(json_str).map_err(|e| CoreError::Connection(e.to_string()))
        }
    }

    pub async fn challenge(&self) -> Result<api::ChallengeOutput, CoreError> {
        self.call("challenge", &()).await
    }

    /// Challenge–response login: fetch a challenge, sign it with XEdDSA using
    /// the user's communication private key, and store the bearer token.
    pub async fn login(
        &mut self,
        comm_privkey: &PrivateKey,
        comm_pubkey: &api::PublicKey,
    ) -> Result<(), CoreError> {
        let challenge = self.challenge().await?.challenge;
        let signature: [u8; 64] = comm_privkey
            .sign(challenge.as_bytes(), &mut rand::thread_rng())
            .map_err(|e| CoreError::Crypto(e.to_string()))?;
        let output: api::LoginOutput = self
            .call(
                "login",
                &api::LoginArgs {
                    challenge,
                    pubkey: comm_pubkey.clone(),
                    signature: signature.to_vec(),
                },
            )
            .await?;
        self.access_token = Some(output.access_token);
        Ok(())
    }

    pub async fn logout(&mut self) -> Result<(), CoreError> {
        self.call::<(), ()>("logout", &()).await?;
        self.access_token = None;
        Ok(())
    }

    pub async fn create_new_session(
        &self,
        args: &api::CreateNewSessionArgs,
    ) -> Result<api::CreateNewSessionOutput, CoreError> {
        self.call("create_new_session", args).await
    }

    pub async fn list_sessions(&self) -> Result<api::ListSessionsOutput, CoreError> {
        self.call("list_sessions", &()).await
    }

    pub async fn get_session_info(
        &self,
        args: &api::GetSessionInfoArgs,
    ) -> Result<api::GetSessionInfoOutput, CoreError> {
        self.call("get_session_info", args).await
    }

    pub async fn send(&self, args: &api::SendArgs) -> Result<(), CoreError> {
        self.call("send", args).await
    }

    pub async fn receive(&self, args: &api::ReceiveArgs) -> Result<api::ReceiveOutput, CoreError> {
        self.call("receive", args).await
    }

    pub async fn close_session(&self, args: &api::CloseSessionArgs) -> Result<(), CoreError> {
        self.call("close_session", args).await
    }
}
