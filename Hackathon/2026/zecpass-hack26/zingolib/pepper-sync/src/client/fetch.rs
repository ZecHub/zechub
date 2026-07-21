//! Queue and prioritise fetch requests to fetch data from the server

use std::{ops::Range, time::Duration};

use tokio::sync::mpsc::UnboundedReceiver;

use tracing::instrument;
use zcash_primitives::transaction::TxId;
use zcash_protocol::consensus::BlockHeight;
use zingo_netutils::{
    Indexer, TransparentIndexer,
    lightwallet_protocol::{
        BlockId, BlockRange, CompactBlock, GetAddressUtxosArg, GetAddressUtxosReply,
        RawTransaction, TransparentAddressBlockFilter, TreeState, TxFilter,
    },
};

use crate::client::FetchRequest;

const UNARY_RPC_TIMEOUT: Duration = Duration::from_secs(10);
const HEAVY_UNARY_TIMEOUT: Duration = Duration::from_secs(20);

#[cfg(not(feature = "darkside_test"))]
use zingo_netutils::lightwallet_protocol::{GetSubtreeRootsArg, SubtreeRoot};

/// Receives [`self::FetchRequest`]'s via an [`tokio::sync::mpsc::UnboundedReceiver`] for queueing,
/// prioritisation and fetching from the server.
/// Returns the data specified in the [`self::FetchRequest`] variant via the provided [`tokio::sync::oneshot::Sender`].
///
/// Allows all requests to the server to be handled from a single task for efficiency and also enables
/// request prioritisation for further performance enhancement
pub(crate) async fn fetch<C>(
    mut fetch_request_receiver: UnboundedReceiver<FetchRequest>,
    mut client: C,
) where
    C: Clone + Indexer + TransparentIndexer + Sync + Send + 'static,
{
    let mut fetch_request_queue: Vec<FetchRequest> = Vec::new();

    loop {
        // `fetcher` returns `Ok` here when all requests have successfully been fetched and the
        // fetch_request channel is closed on sync completion.
        if receive_fetch_requests(&mut fetch_request_receiver, &mut fetch_request_queue).await {
            return;
        }

        let fetch_request = select_fetch_request(&mut fetch_request_queue);

        if let Some(request) = fetch_request {
            fetch_from_server(&mut client, request).await;
        }
    }
}

// receives fetch requests and populates the fetch request queue
//
// returns `true` if the fetch request channel is closed and all fetch requests have been completed,
// signalling sync is complete and no longer needs to fetch data from the server.
async fn receive_fetch_requests(
    receiver: &mut UnboundedReceiver<FetchRequest>,
    fetch_request_queue: &mut Vec<FetchRequest>,
) -> bool {
    // if there are no fetch requests to process, sleep until the next fetch request is received
    // or channel is closed
    if fetch_request_queue.is_empty()
        && let Some(fetch_request) = receiver.recv().await
    {
        fetch_request_queue.push(fetch_request);
    }
    // receive all remaining fetch requests from channel
    // when channel is empty return `false` to continue fetching data from the server
    // when channel is closed and all fetch requests are processed, return `true`
    loop {
        match receiver.try_recv() {
            Ok(fetch_request) => fetch_request_queue.push(fetch_request),
            Err(tokio::sync::mpsc::error::TryRecvError::Empty) => break,
            Err(tokio::sync::mpsc::error::TryRecvError::Disconnected) => {
                if fetch_request_queue.is_empty() {
                    return true;
                }
                break;
            }
        }
    }

    false
}

// TODO: placeholder for algorithm that selects the next fetch request to be processed
// return `None` if a fetch request could not be selected
fn select_fetch_request(fetch_request_queue: &mut Vec<FetchRequest>) -> Option<FetchRequest> {
    // TODO: improve priority logic
    if fetch_request_queue.is_empty() {
        None
    } else {
        Some(fetch_request_queue.remove(0))
    }
}

//
async fn fetch_from_server<C>(client: &mut C, fetch_request: FetchRequest)
where
    C: Clone + Indexer + TransparentIndexer + Sync + Send + 'static,
{
    match fetch_request {
        FetchRequest::ChainTip(sender) => {
            tracing::debug!("Fetching chain tip.");
            let block_id = get_latest_block(client).await;
            let _ignore_error = sender.send(block_id);
        }
        FetchRequest::CompactBlock(sender, block_height) => {
            tracing::debug!("Fetching compact block. {:?}", &block_height);
            let block = get_block(client, block_height).await;
            let _ignore_error = sender.send(block);
        }
        FetchRequest::CompactBlockRange(sender, block_range) => {
            tracing::debug!("Fetching compact blocks. {:?}", &block_range);
            let block_stream = get_block_range(client, block_range).await;
            let _ignore_error = sender.send(block_stream);
        }
        FetchRequest::NullifierRange(sender, block_range) => {
            tracing::debug!("Fetching nullifiers. {:?}", &block_range);
            let block_stream = get_block_range_nullifiers(client, block_range).await;
            let _ignore_error = sender.send(block_stream);
        }
        #[cfg(not(feature = "darkside_test"))]
        FetchRequest::SubtreeRoots(sender, start_index, shielded_protocol, max_entries) => {
            tracing::debug!(
                "Fetching subtree roots. start index: {}. shielded protocol: {}",
                start_index,
                shielded_protocol
            );
            let subtree_roots =
                get_subtree_roots(client, start_index, shielded_protocol, max_entries).await;
            let _ignore_error = sender.send(subtree_roots);
        }
        FetchRequest::TreeState(sender, block_height) => {
            tracing::debug!("Fetching tree state. {:?}", &block_height);
            let tree_state = get_tree_state(client, block_height).await;
            let _ignore_error = sender.send(tree_state);
        }
        FetchRequest::Transaction(sender, txid) => {
            tracing::debug!("Fetching transaction. {:?}", txid);
            let transaction = get_transaction(client, txid).await;
            let _ignore_error = sender.send(transaction);
        }
        FetchRequest::UtxoMetadata(sender, (addresses, start_height)) => {
            tracing::debug!(
                "Fetching unspent transparent output metadata from {:?} for addresses:\n{:?}",
                &start_height,
                &addresses
            );
            let utxo_metadata = get_address_utxos(client, addresses, start_height, 0).await;
            let _ignore_error = sender.send(utxo_metadata);
        }
        FetchRequest::TransparentAddressTxs(sender, (address, block_range)) => {
            tracing::debug!(
                "Fetching raw transactions in block range {:?} for address {:?}",
                &block_range,
                &address
            );
            let raw_transaction_stream = get_taddress_txs(client, address, block_range).await;
            let _ignore_error = sender.send(raw_transaction_stream);
        }
    }
}

#[instrument(skip(client), name = "fetch::get_latest_block", err, level = "info")]
async fn get_latest_block<C>(client: &mut C) -> Result<BlockId, tonic::Status>
where
    C: Clone + Indexer + TransparentIndexer + Sync + Send + 'static,
{
    client.get_latest_block(UNARY_RPC_TIMEOUT).await
}

async fn get_block<C>(
    client: &mut C,
    block_height: BlockHeight,
) -> Result<CompactBlock, tonic::Status>
where
    C: Clone + Indexer + TransparentIndexer + Sync + Send + 'static,
{
    client
        .get_block(
            BlockId {
                height: u64::from(block_height),
                hash: vec![],
            },
            UNARY_RPC_TIMEOUT,
        )
        .await
}

async fn get_block_range<C>(
    client: &mut C,
    block_range: Range<BlockHeight>,
) -> Result<tonic::Streaming<CompactBlock>, tonic::Status>
where
    C: Clone + Indexer + TransparentIndexer + Sync + Send + 'static,
{
    client
        .get_block_range(
            BlockRange {
                start: Some(BlockId {
                    height: u64::from(block_range.start),
                    hash: vec![],
                }),
                end: Some(BlockId {
                    height: u64::from(block_range.end) - 1,
                    hash: vec![],
                }),
                pool_types: vec![],
            },
            HEAVY_UNARY_TIMEOUT,
        )
        .await
}

async fn get_block_range_nullifiers<C>(
    client: &mut C,
    block_range: Range<BlockHeight>,
) -> Result<tonic::Streaming<CompactBlock>, tonic::Status>
where
    C: Clone + Indexer + TransparentIndexer + Sync + Send + 'static,
{
    #[allow(deprecated)]
    client
        .get_block_range_nullifiers(
            BlockRange {
                start: Some(BlockId {
                    height: u64::from(block_range.start),
                    hash: vec![],
                }),
                end: Some(BlockId {
                    height: u64::from(block_range.end) - 1,
                    hash: vec![],
                }),
                pool_types: vec![],
            },
            HEAVY_UNARY_TIMEOUT,
        )
        .await
}

#[cfg(not(feature = "darkside_test"))]
async fn get_subtree_roots<C>(
    client: &mut C,
    start_index: u32,
    shielded_protocol: i32,
    max_entries: u32,
) -> Result<tonic::Streaming<SubtreeRoot>, tonic::Status>
where
    C: Clone + Indexer + TransparentIndexer + Sync + Send + 'static,
{
    client
        .get_subtree_roots(
            GetSubtreeRootsArg {
                start_index,
                shielded_protocol,
                max_entries,
            },
            HEAVY_UNARY_TIMEOUT,
        )
        .await
}

#[instrument(skip(client), name = "fetch::get_tree_state", err, level = "info")]
async fn get_tree_state<C>(
    client: &mut C,
    block_height: BlockHeight,
) -> Result<TreeState, tonic::Status>
where
    C: Clone + Indexer + TransparentIndexer + Sync + Send + 'static,
{
    client
        .get_tree_state(
            BlockId {
                height: block_height.into(),
                hash: vec![],
            },
            UNARY_RPC_TIMEOUT,
        )
        .await
}

async fn get_transaction<C>(client: &mut C, txid: TxId) -> Result<RawTransaction, tonic::Status>
where
    C: Clone + Indexer + TransparentIndexer + Sync + Send + 'static,
{
    client
        .get_transaction(
            TxFilter {
                block: None,
                index: 0,
                hash: txid.as_ref().to_vec(),
            },
            UNARY_RPC_TIMEOUT,
        )
        .await
}

async fn get_address_utxos<C>(
    client: &mut C,
    addresses: Vec<String>,
    start_height: BlockHeight,
    max_entries: u32,
) -> Result<Vec<GetAddressUtxosReply>, tonic::Status>
where
    C: Clone + Indexer + TransparentIndexer + Sync + Send + 'static,
{
    let start_height: u64 = start_height.into();
    Ok(client
        .get_address_utxos(
            GetAddressUtxosArg {
                addresses,
                start_height,
                max_entries,
            },
            UNARY_RPC_TIMEOUT,
        )
        .await?
        .address_utxos)
}

#[allow(deprecated)]
async fn get_taddress_txs<C>(
    client: &mut C,
    address: String,
    block_range: Range<BlockHeight>,
) -> Result<tonic::Streaming<RawTransaction>, tonic::Status>
where
    C: Clone + Indexer + TransparentIndexer + Sync + Send + 'static,
{
    let range = Some(BlockRange {
        start: Some(BlockId {
            height: block_range.start.into(),
            hash: vec![],
        }),
        end: Some(BlockId {
            height: u64::from(block_range.end) - 1,
            hash: vec![],
        }),
        pool_types: vec![],
    });

    client
        .get_taddress_txids(
            TransparentAddressBlockFilter { address, range },
            HEAVY_UNARY_TIMEOUT,
        )
        .await
}

/// Call `GetMempoolStream` client gPRC.
///
/// This is not called from the fetch request framework and is intended to be called independently.
pub(crate) async fn get_mempool_stream<C>(
    client: &mut C,
) -> Result<tonic::Streaming<RawTransaction>, tonic::Status>
where
    C: Clone + Indexer + TransparentIndexer + Sync + Send + 'static,
{
    client.get_mempool_stream(HEAVY_UNARY_TIMEOUT).await
}
