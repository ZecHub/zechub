use halo2_proofs::plonk::Error as PlonkError;
use http::uri::InvalidUri;
use rusqlite::Error as SqlError;
use thiserror::Error;
use tonic::{transport::Error as TonicTransportError, Status};

#[derive(Error, Debug)]
pub enum VoteError {
    #[error(transparent)]
    InvalidUri(#[from] InvalidUri),
    #[error(transparent)]
    TonicTransportError(#[from] TonicTransportError),
    #[error(transparent)]
    SqlError(#[from] SqlError),
    #[error(transparent)]
    PlonkError(#[from] PlonkError),
    #[error(transparent)]
    TonicError(#[from] Status),
    #[error(transparent)]
    OrchardVoteError(#[from] orchard::vote::VoteError),

    #[error("Note at position {0} is out of range")]
    OutOfRange(usize),
    #[error("Nullifier {0} already used")]
    DoubleNullifier(String),
    #[error("Invalid JSON: {0}")]
    InvalidJson(String),
    #[error("Invalid Ballot: {0}")]
    InvalidBallot(String),

    #[error(transparent)]
    Anyhow(#[from] anyhow::Error),
}
