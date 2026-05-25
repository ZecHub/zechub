use orchard::{
    vote::{Circuit, Frontier, OrchardHash, ProvingKey, VerifyingKey},
    Address,
};
use pasta_curves::Fp;
use pasta_curves::group::ff::PrimeField as _;
use prost::Message;
use serde::{Deserialize, Serialize};

use crate::{address::VoteAddress, errors::VoteError, pb::{self, Candidate}};

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct CandidateChoice {
    pub address: String,
    pub choice: String,
}

impl CandidateChoice {
    pub fn new(address: Address, choice: &str) -> Self {
        CandidateChoice {
            address: VoteAddress(address).to_string(),
            choice: choice.to_string(),
        }
    }
}

/// Details of an election, including metadata, candidates, and election parameters.
#[derive(Clone, Serialize, Deserialize, Default, Debug)]
pub struct Election {
    pub name: String,
    pub start_height: u32,
    pub end_height: u32,
    pub question: String,
    pub candidates: Vec<CandidateChoice>,
    pub signature_required: bool,
    pub cmx: OrchardHash,
    pub nf: OrchardHash,
    pub cmx_frontier: Option<Frontier>,
}

impl Election {
    pub fn from_json(json: &str) -> Result<Election, VoteError> {
        let election: Election =
            serde_json::from_str(json).map_err(|e| VoteError::InvalidJson(e.to_string()))?;
        Ok(election)
    }

    pub fn id(&self) -> String {
        hex::encode(self.domain().to_repr())
    }

    pub fn domain(&self) -> Fp {
        let election_params = pb::Election {
            name: self.name.clone(),
            start_height: self.start_height,
            end_height: self.end_height,
            question: self.question.clone(),
            candidates: self.candidates.iter().map(|c|
                Candidate {
                    address: c.address.clone(),
                    choice: c.choice.clone(),
                }
            ).collect(),
            signature_required: self.signature_required,
        };
        let election_params = election_params.encode_to_vec();

        orchard::vote::calculate_domain(&election_params)
    }
}

lazy_static::lazy_static! {
    pub static ref BALLOT_PK: ProvingKey<Circuit> = ProvingKey::build();
    pub static ref BALLOT_VK: VerifyingKey<Circuit> = VerifyingKey::build();
}
