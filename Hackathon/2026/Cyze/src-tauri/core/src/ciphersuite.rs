//! Ciphersuite selection. Ceremony code is generic over
//! `frost_core::Ciphersuite`; this enum is the dispatch point.

use frost_core::Ciphersuite;
use frost_ed25519::Ed25519Sha512;
use reddsa::frost::redpallas::PallasBlake2b512;
use serde::{Deserialize, Serialize};

use crate::error::CoreError;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Suite {
    Ed25519,
    RedPallas,
}

impl Suite {
    /// The upstream ciphersuite ID string stored in group configs.
    pub fn id(&self) -> &'static str {
        match self {
            Suite::Ed25519 => Ed25519Sha512::ID,
            Suite::RedPallas => PallasBlake2b512::ID,
        }
    }

    pub fn from_id(id: &str) -> Result<Self, CoreError> {
        if id == Ed25519Sha512::ID {
            Ok(Suite::Ed25519)
        } else if id == PallasBlake2b512::ID {
            Ok(Suite::RedPallas)
        } else {
            Err(CoreError::Config(format!("unsupported ciphersuite: {id}")))
        }
    }
}
