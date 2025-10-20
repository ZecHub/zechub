use std::collections::HashMap;
use std::collections::VecDeque;
use std::fmt::Debug;
use std::io::Cursor;
use std::sync::Arc;

use anyhow::{Context, Result};
use gtn_common::{AudioSetupCommand, PaymentDHTMessage};

use orchard::primitives::redpallas::{Signature, SpendAuth};
use tokio::sync::mpsc::{UnboundedReceiver, UnboundedSender};
use tonic::transport::Channel;

use gtn_common::PaymentPackage;

pub mod walletrpc {
    tonic::include_proto!("cash.z.wallet.sdk.rpc");
}

use walletrpc::{
    compact_tx_streamer_client::CompactTxStreamerClient, BlockId, BlockRange, ChainSpec,
    CompactBlock, CompactTx,
};

use tracing::{info, instrument};

use orchard::{note::Note, note_encryption::OrchardDomain, Address};
use zcash_note_encryption::try_note_decryption;
use zcash_primitives::consensus::BranchId;
use zcash_primitives::transaction::{Transaction, TxId};

use reqwest::Client as HttpClient;

use std::collections::HashSet;

use crate::{client::walletrpc::TxFilter, memo::GtnMemo, Wallet};

struct PendingRenewal {
    pub stream_id: String,
    pub broadcaster_pk_: String,
    pub notifier: tokio::sync::oneshot::Sender<AudioSetupCommand>,
}

impl std::fmt::Display for PendingRenewal {
    fn fmt(&self, _f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        Ok(())
    }
}

impl Debug for PendingRenewal {
    fn fmt(&self, _f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        Ok(())
    }
}

/// Represents a parsed transaction after the recipient and memo have been
/// obtained by the decrypted transaction note.
#[derive(Debug)]
pub struct ParsedTransaction {
    pub txid: TxId,
    pub block_height: u64,
    pub note: Note,
    pub recipient: Address,
    pub memo: Option<String>,
}

#[derive(Clone, Debug)]
pub struct Config {
    pub wallet_mnemonic: Option<String>,
    pub zebra_rpc_url: String,
    pub lightwalletd_rpc_url: String,
}

/// Handles all communication with the lightwalletd and zebrad nodes through HTTP and GRPC.
#[derive(Debug)]
pub struct ZcashService {
    config: Config,
    http_client: HttpClient,
    wallet: Wallet,
    client: CompactTxStreamerClient<Channel>,
}

/// The BlockMonitor handles block parsing and tracking blocks as the chain produces new
/// blocks
#[derive(Debug)]
pub struct BlockMonitor {
    service: Arc<tokio::sync::Mutex<ZcashService>>,
    client: CompactTxStreamerClient<Channel>,
    last_seen_block: Option<BlockId>,
    block_queue: VecDeque<CompactBlock>,
    // Channel for sending parsed transaction to the payment client
    transaction_tx: UnboundedSender<Vec<ParsedTransaction>>,
}

/// The PaymentMonitor handles tracking of pending reservation and renewal payments for streams
/// as well as parsing payments from the block monitor through the transaction channel.
#[derive(Debug)]
pub struct PaymentMonitor {
    service: Arc<tokio::sync::Mutex<ZcashService>>,
    dht_rx: UnboundedReceiver<PaymentDHTMessage>,
    dht_tx: UnboundedSender<PaymentDHTMessage>,
    from_audio_service_channel: UnboundedReceiver<AudioSetupCommand>,
    pending_reservation_payments: HashSet<String>,
    // Map of stream id -> pending renewal
    pending_renewal_payments: HashMap<String, PendingRenewal>,
    // Receive txs from BlockMonitor
    transaction_rx: UnboundedReceiver<Vec<ParsedTransaction>>,
    // Channel for receiving parsed transactions from the payment client
    payment_package: PaymentPackage,
}

impl ZcashService {
    pub async fn new(config: Config) -> Result<Self> {
        let channel = Channel::from_shared(config.lightwalletd_rpc_url.clone())?
            .connect()
            .await
            .context("Failed to connect to lightwalletd - is the server running?")?;

        let client = CompactTxStreamerClient::new(channel);

        let http_client = HttpClient::new();

        let wallet = if let Some(mnemonic) = config.wallet_mnemonic.clone() {
            Wallet::from_mnemonic(mnemonic)
        } else {
            Wallet::new()
        };

        Ok(Self {
            config,
            http_client,
            wallet,
            client,
        })
    }

    pub fn payment_address(&self) -> String {
        self.wallet.z_addr_orchard().clone()
    }

    #[instrument(skip(self, cmpct_txs))]
    pub async fn parse_transactions(
        &mut self,
        cmpct_txs: Vec<CompactTx>,
        block_height: u64,
    ) -> Result<Vec<ParsedTransaction>> {
        let mut parsed_transactions = Vec::new();

        for tx in cmpct_txs {
            let txid = TxId::from_bytes(tx.hash.try_into().unwrap());
            tracing::info!("Parsing tx with id {:?}", txid);
            let orchard_outputs = self.parse_orchard_actions(txid, block_height).await?;
            parsed_transactions.extend(orchard_outputs);
        }

        tracing::trace!("Total transaction parsed: ({})", parsed_transactions.len());
        Ok(parsed_transactions)
    }

    #[instrument(skip(self))]
    async fn parse_orchard_actions(
        &mut self,
        txid: TxId,
        block_height: u64,
    ) -> Result<Vec<ParsedTransaction>> {
        let mut parsed = Vec::new();

        let tx_id_hash = *txid.as_ref();

        let tx = self
            .client
            .get_transaction(TxFilter {
                block: None,
                index: 0,
                hash: tx_id_hash.to_vec(),
            })
            .await
            .unwrap()
            .into_inner();

        let data = tx.data;
        let cursor = Cursor::new(data);

        if let Ok(tx) = Transaction::read(cursor, BranchId::Nu6_1) {
            if let Some(bundle) = tx.orchard_bundle() {
                let actions = bundle.actions();
                for action in actions {
                    let domain = OrchardDomain::for_action(action);
                    let orchard_ivk = self.wallet.orchard_ivk();

                    if let Some((note, recipient, memo)) = try_note_decryption::<
                        OrchardDomain,
                        orchard::Action<Signature<SpendAuth>>,
                    >(
                        &domain, &orchard_ivk.prepare(), action
                    ) {
                        tracing::debug!(
                            "Successfully decrypted orchard note for tx {:?}",
                            tx.txid()
                        );

                        let memo_str = memo
                            .iter()
                            .take_while(|&&b| b != 0)
                            .cloned()
                            .collect::<Vec<u8>>();

                        let memo_string = String::from_utf8_lossy(&memo_str).to_string();
                        match GtnMemo::from_str(&memo_string) {
                            Ok(GtnMemo::Renew { .. }) | Ok(GtnMemo::Reserve { .. }) => {
                                parsed.push(ParsedTransaction {
                                    txid,
                                    block_height,
                                    note,
                                    recipient,
                                    memo: Some(memo_string),
                                });
                            }
                            _ => {
                                tracing::debug!("Attempted to construct gtn memo from memo string for memoo {:?}", memo_str);
                            }
                        }
                    }
                }
            }
        }
        Ok(parsed)
    }
}

impl BlockMonitor {
    pub async fn new(
        service: Arc<tokio::sync::Mutex<ZcashService>>,
        config: &Config,
        transaction_tx: UnboundedSender<Vec<ParsedTransaction>>,
    ) -> Result<Self> {
        tracing::debug!(
            "Connecting to grpc server on endpoint: {}",
            config.lightwalletd_rpc_url.clone()
        );

        let channel = Channel::from_shared(config.lightwalletd_rpc_url.clone())?
            .connect()
            .await
            .context("Failed to connect to lightwalletd - is the server running?")?;

        let client = CompactTxStreamerClient::new(channel);

        Ok(Self {
            service,
            client,
            last_seen_block: None,
            block_queue: VecDeque::new(),
            transaction_tx,
        })
    }

    #[instrument(skip(self))]
    pub async fn monitor_blocks(&mut self) -> Result<()> {
        loop {
            let res_last_block = self
                .client
                .get_latest_block(ChainSpec {})
                .await
                .context("Failed to connect to lightwalletd - is the server running?")?
                .into_inner();

            let start_height = self
                .last_seen_block
                .clone()
                .map(|b| b.height + 1)
                .unwrap_or(res_last_block.height);

            if start_height <= res_last_block.height {
                let mut req_block_range = self
                    .client
                    .get_block_range(BlockRange {
                        start: Some(BlockId {
                            height: start_height,
                            hash: vec![],
                        }),
                        end: Some(res_last_block.clone()),
                    })
                    .await?
                    .into_inner();

                // Track heights already added to avoid duplicates
                let mut queued_heights = HashSet::new();

                while let Some(rng) = req_block_range.message().await? {
                    if queued_heights.insert(rng.height) {
                        tracing::info!("Adding block {:?} to block queue", rng.height);
                        self.block_queue.push_back(rng);
                    }
                }
            }

            self.monitor_addresses().await?;

            if let Some(last_block) = self.block_queue.back() {
                self.last_seen_block = Some(BlockId {
                    height: last_block.height,
                    hash: last_block.hash.clone(),
                });
            } else {
                self.last_seen_block = Some(res_last_block);
            }

            // Zebra processes blocks every 75 seconds so we check half that
            // time incase we just missed a block
            tokio::time::sleep(tokio::time::Duration::from_secs(35)).await;
        }
    }

    #[instrument(skip(self))]
    async fn monitor_addresses(&mut self) -> Result<()> {
        let mut all_parsed = Vec::new();

        while let Some(cmpct_block) = self.block_queue.pop_front() {
            let block_height = cmpct_block.height;
            tracing::trace!("Processing block {}", block_height);

            let parsed = self
                .service
                .lock()
                .await
                .parse_transactions(cmpct_block.vtx, block_height)
                .await?;

            all_parsed.extend(parsed);
        }

        if !all_parsed.is_empty() {
            self.transaction_tx.send(all_parsed)?;
        }

        Ok(())
    }
}

impl PaymentMonitor {
    pub async fn new(
        service: Arc<tokio::sync::Mutex<ZcashService>>,
        dht_rx: UnboundedReceiver<PaymentDHTMessage>,
        dht_tx: UnboundedSender<PaymentDHTMessage>,
        from_audio_service_channel: UnboundedReceiver<AudioSetupCommand>,
        transaction_rx: UnboundedReceiver<Vec<ParsedTransaction>>,
        payment_package: PaymentPackage,
    ) -> Result<Self> {
        Ok(Self {
            service,
            dht_rx,
            dht_tx,
            pending_reservation_payments: HashSet::new(),
            pending_renewal_payments: HashMap::new(),
            from_audio_service_channel,
            transaction_rx,
            payment_package,
        })
    }

    pub async fn payment_address(&self) -> String {
        self.service.lock().await.payment_address()
    }

    #[instrument(skip(self))]
    pub async fn monitor_payments(&mut self) -> Result<()> {
        loop {
            tokio::select! {
                // Handle DHT events
                Some(ev) = self.dht_rx.recv() => {
                    if let PaymentDHTMessage::NewReservation { reservation } = ev {
                        tracing::info!("Updated pending reservation set with new reservation {:?}", reservation);
                        self.pending_reservation_payments.insert(reservation.session_pk);
                    }
                }

                // Handle new transactions from BlockMonitor
                Some(transactions) = self.transaction_rx.recv() => {
                    self.process_transactions(transactions).await?;
                }

                // Handle broadcasting service events
                Some(stream_notification) = self.from_audio_service_channel.recv() => {
                    if let  AudioSetupCommand::ExpectedRenewal { id, session_pk, sender } = stream_notification {
                                                tracing::info!("Updating pending renewal map for stream {} and session_pk {}", id, session_pk);
                        self.pending_renewal_payments.insert(id.clone(), PendingRenewal { stream_id: id, broadcaster_pk_: session_pk, notifier: sender });
                    }
                }

                _ = tokio::time::sleep(tokio::time::Duration::from_secs(30)) => {
                    // todo: periodic cleanup or other tasks
                }
            }
        }
    }

    #[instrument(skip(self, transactions))]
    async fn process_transactions(&mut self, transactions: Vec<ParsedTransaction>) -> Result<()> {

        for tx in transactions {
            // Check if this transaction is a payment for any pending reservations
            if let Some(memo) = &tx.memo {
                match GtnMemo::from_str(memo) {
                    Ok(GtnMemo::Reserve { session_pk }) => {
                        // Remove the reservation payment from the HashSet and notify the DHT the payment was
                        // confirmed
                        // todo: Notify the streaming service directly of the payment confirmation.
                        if let Some(_) = self.pending_reservation_payments.take(&session_pk) {
                            info!(
                                "Matched pending reservation for session_pk {}, notifying DHT",
                                session_pk
                            );

                            if let Err(e) = self.dht_tx.send(PaymentDHTMessage::PaymentConfirmed {
                                session_pk: session_pk.clone(),
                                setup_details_tx_id: tx.txid.to_string(),
                            }) {
                                tracing::error!("Failed to send payment confirmation to DHT");
                            }
                        }
                    }
                    Ok(GtnMemo::Renew {
                        session_pk,
                        stream_id,
                    }) => {
                        // Remove the pending renewal from the HashMap and notify the streaming service
                        // to continue the stream
                        if let Some(PendingRenewal {
                            stream_id,
                            broadcaster_pk_: _,
                            notifier,
                        }) = self.pending_renewal_payments.remove(&stream_id)
                        {
                            tracing::info!(
                                "Matched pending renewal for stream id {} and broadcaster pk {}",
                                stream_id,
                                session_pk
                            );

                            if let Err(_) = notifier.send(AudioSetupCommand::ContinueStream {
                                id: stream_id.clone(),
                            }) {
                                tracing::error!("Failed to send ContinueStream notification to broadcast service");
                            }
                        }
                    }
                    _ => {}
                }
            }
        }
        Ok(())
    }
}

// Factory function to create the complete system [block monitor, payment monitor, service and the communication channels]
pub async fn create_zcash_system(
    config: Config,
    dht_rx: UnboundedReceiver<PaymentDHTMessage>,
    dht_tx: UnboundedSender<PaymentDHTMessage>,
    from_audio_service_channel: UnboundedReceiver<AudioSetupCommand>,
    payment_package: PaymentPackage,
) -> Result<(BlockMonitor, PaymentMonitor)> {
    let service = Arc::new(tokio::sync::Mutex::new(
        ZcashService::new(config.clone()).await?,
    ));

    let (transaction_tx, transaction_rx) = tokio::sync::mpsc::unbounded_channel();

    let block_monitor = BlockMonitor::new(Arc::clone(&service), &config, transaction_tx).await?;

    let payment_monitor = PaymentMonitor::new(
        service,
        dht_rx,
        dht_tx,
        from_audio_service_channel,
        transaction_rx,
        payment_package,
    )
    .await?;

    Ok((block_monitor, payment_monitor))
}
