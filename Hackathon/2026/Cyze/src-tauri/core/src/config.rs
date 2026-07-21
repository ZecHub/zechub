//! Wrapper around the upstream frost-client config, parsed from / serialized
//! to the same TOML schema as `~/.config/frost/credentials.toml`. The
//! keystore stores this TOML as its encrypted plaintext, so the app stays
//! byte-compatible with the upstream CLI.

use std::collections::BTreeMap;

use frost_client::cli::config::{Config, Group};
use frost_client::cli::contact::Contact;
use frost_core::{keys::KeyPackage, keys::PublicKeyPackage, Ciphersuite};
use frost_ed25519::Ed25519Sha512;
use reddsa::frost::redpallas::PallasBlake2b512;
use serde::Serialize;
use zeroize::Zeroizing;

use crate::error::CoreError;

/// Parse an upstream-format credentials TOML string.
pub fn parse_config(toml_str: &str) -> Result<Config, CoreError> {
    Ok(toml::from_str(toml_str)?)
}

/// Serialize a config back to the upstream TOML format.
pub fn serialize_config(config: &Config) -> Result<Zeroizing<String>, CoreError> {
    Ok(Zeroizing::new(toml::to_string_pretty(config)?))
}

/// Ciphersuite-independent summary of a group, for display.
#[derive(Debug, Clone, Serialize)]
pub struct GroupSummary {
    /// Hex-encoded group verifying key (also the key in the config's group map).
    pub id: String,
    pub description: String,
    pub ciphersuite: String,
    pub threshold: u16,
    pub num_participants: u16,
    pub server_url: Option<String>,
    /// Participants: hex identifier -> hex comm pubkey.
    pub participants: BTreeMap<String, String>,
}

fn group_info<C: Ciphersuite>(group: &Group) -> Result<(u16, u16), CoreError> {
    let key_package: KeyPackage<C> = postcard::from_bytes(&group.key_package)
        .map_err(|e| CoreError::Config(format!("bad key package: {e}")))?;
    let public_key_package: PublicKeyPackage<C> = postcard::from_bytes(&group.public_key_package)
        .map_err(|e| CoreError::Config(format!("bad public key package: {e}")))?;
    Ok((
        *key_package.min_signers(),
        public_key_package.verifying_shares().len() as u16,
    ))
}

/// Build a display summary for a group stored in the config.
pub fn summarize_group(id: &str, group: &Group) -> Result<GroupSummary, CoreError> {
    let (threshold, num_participants) = if group.ciphersuite == Ed25519Sha512::ID {
        group_info::<Ed25519Sha512>(group)?
    } else if group.ciphersuite == PallasBlake2b512::ID {
        group_info::<PallasBlake2b512>(group)?
    } else {
        return Err(CoreError::Config(format!(
            "unsupported ciphersuite: {}",
            group.ciphersuite
        )));
    };
    Ok(GroupSummary {
        id: id.to_string(),
        description: group.description.clone(),
        ciphersuite: group.ciphersuite.clone(),
        threshold,
        num_participants,
        server_url: group.server_url.clone(),
        participants: group
            .participant
            .iter()
            .map(|(id, p)| (id.clone(), hex::encode(&p.pubkey.0)))
            .collect(),
    })
}

/// Encode a contact as the upstream `zffrost...` bech32m string.
pub fn contact_to_text(name: &str, pubkey: &frost_client::api::PublicKey) -> Result<String, CoreError> {
    let contact = Contact {
        version: Some(0),
        name: name.to_string(),
        pubkey: pubkey.clone(),
    };
    contact
        .as_text()
        .map_err(|e| CoreError::Config(e.to_string()))
}

/// Decode an upstream `zffrost...` bech32m contact string.
pub fn contact_from_text(s: &str) -> Result<Contact, CoreError> {
    Contact::from_text(s.trim()).map_err(|e| CoreError::Config(e.to_string()))
}
