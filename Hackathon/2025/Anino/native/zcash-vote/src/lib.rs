use errors::VoteError;
use orchard::{note::Nullifier, tree::MerklePath, Note};
use r2d2::PooledConnection;
use r2d2_sqlite::SqliteConnectionManager;

pub type Hash = [u8; 32];
pub const DEPTH: usize = 32;

#[path = "./cash.z.wallet.sdk.rpc.rs"]
pub mod rpc;

pub mod errors;

pub type Result<T> = std::result::Result<T, VoteError>;
pub type PoolConnection = PooledConnection<SqliteConnectionManager>;

pub mod pb;
pub mod address;
pub mod db;
pub mod decrypt;
pub mod download;
pub mod election;
pub mod trees;
pub mod validate;

#[derive(Clone, Debug)]
pub struct VoteNote {
    pub note: Note,
    pub idx: usize,
    pub nf: Nullifier,
    pub nf_start: Nullifier,
    pub nf_path: MerklePath,
    pub cmx_path: MerklePath,
}

pub fn as_byte256(h: &[u8]) -> [u8; 32] {
    let mut hh = [0u8; 32];
    hh.copy_from_slice(h);
    hh
}
