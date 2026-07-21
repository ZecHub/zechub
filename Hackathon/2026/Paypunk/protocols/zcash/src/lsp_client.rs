use tonic::transport::Channel;
use zcash_client_backend::proto::compact_formats::CompactBlock;
use zcash_client_backend::proto::service::compact_tx_streamer_client::CompactTxStreamerClient;
use zcash_client_backend::proto::service::{
    BlockId, BlockRange, ChainSpec, RawTransaction, TreeState,
};
use zcash_primitives::transaction::Transaction;
use zcash_protocol::consensus::{BlockHeight, BranchId};
use zcash_protocol::local_consensus::LocalNetwork;

/// Lightwalletd gRPC client for Zcash chain interaction.
pub struct LspClient {
    inner: CompactTxStreamerClient<Channel>,
    params: LocalNetwork,
}

impl LspClient {
    /// Connect to a lightwalletd endpoint.
    pub async fn connect(host: &str, params: LocalNetwork) -> Result<Self, String> {
        let inner = CompactTxStreamerClient::connect(host.to_string())
            .await
            .map_err(|e| format!("failed to connect to lightwalletd: {e}"))?;
        Ok(Self { inner, params })
    }

    /// Get the latest block height from lightwalletd.
    pub async fn get_latest_height(&mut self) -> Result<BlockHeight, String> {
        let info = self
            .inner
            .get_latest_block(ChainSpec::default())
            .await
            .map_err(|e| format!("lightwalletd get_latest_block failed: {e}"))?;
        let height = info.get_ref().height as u32;
        Ok(BlockHeight::from_u32(height))
    }

    /// Get the tree state (note commitment tree) at a given height.
    pub async fn get_tree_state(&mut self, height: BlockHeight) -> Result<TreeState, String> {
        let response = self
            .inner
            .get_tree_state(BlockId {
                height: u64::from(height),
                hash: vec![],
            })
            .await
            .map_err(|e| format!("lightwalletd get_tree_state failed: {e}"))?;
        Ok(response.into_inner())
    }

    /// Fetch a range of compact blocks from lightwalletd.
    pub async fn get_block_range(
        &mut self,
        start_height: BlockHeight,
        end_height: BlockHeight,
    ) -> Result<Vec<CompactBlock>, String> {
        let start = u64::from(start_height);
        let end = u64::from(end_height);
        let mut stream = self
            .inner
            .get_block_range(BlockRange {
                start: Some(BlockId {
                    height: start,
                    hash: vec![],
                }),
                end: Some(BlockId {
                    height: end,
                    hash: vec![],
                }),
                pool_types: vec![],
            })
            .await
            .map_err(|e| format!("lightwalletd get_block_range failed: {e}"))?
            .into_inner();

        let mut blocks = Vec::new();
        while let Some(block) = stream
            .message()
            .await
            .map_err(|e| format!("stream error: {e}"))?
        {
            blocks.push(block);
        }
        Ok(blocks)
    }

    /// Broadcast a raw transaction to the network.
    /// Returns the transaction hash (txid) as a hex string.
    pub async fn broadcast_tx(&mut self, tx_bytes: &[u8]) -> Result<String, String> {
        let response = self
            .inner
            .send_transaction(RawTransaction {
                data: tx_bytes.to_vec(),
                height: 0,
            })
            .await
            .map_err(|e| format!("broadcast failed: {e}"))?;
        let result = response.into_inner();
        if result.error_code != 0 {
            return Err(format!(
                "broadcast failed ({}): {}",
                result.error_code, result.error_message
            ));
        }

        let height = self.get_latest_height().await?;
        let branch_id = BranchId::for_height(&self.params, height);
        let tx = Transaction::read(tx_bytes, branch_id)
            .map_err(|e| format!("failed to parse broadcast tx for txid: {e}"))?;
        Ok(hex::encode(tx.txid().as_ref()))
    }
}
