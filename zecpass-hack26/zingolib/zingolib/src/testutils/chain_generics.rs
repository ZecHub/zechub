//! tests that can be run either as lib-to-node or darkside.

//! this mod tests fair weather behavior i.e. the `LightClient` is connected to a server that provides expected responses about the state of the blockchain.
//! there are many ways to mock the chain. for simplicity, and in order to be usable in multiple contexts, the test fixtures in this mod delegate setup and server management to a `ChainConductor` (anything that implements `ConductChain`)

//! darkside known issues:
//!   - transparent
//!   - txids
//!
//! libtonode known issues:
//!   - mempool

pub mod conduct_chain;
pub mod networked;

pub mod fixtures;
pub mod with_assertions;
