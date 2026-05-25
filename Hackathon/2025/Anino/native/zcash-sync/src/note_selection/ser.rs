use crate::db::data_generated::fb::{TxOutputT, TxReportT};
use crate::note_selection::types::TransactionReport;
use crate::TransactionPlan;
use serde::{Deserialize, Serialize};
use zcash_primitives::consensus::Network;
use zcash_primitives::memo::MemoBytes;

#[derive(Serialize, Deserialize)]
#[serde(remote = "MemoBytes")]
pub struct MemoBytesProxy(#[serde(getter = "get_memo_bytes")] pub String);

fn get_memo_bytes(memo: &MemoBytes) -> String {
    hex::encode(memo.as_slice())
}

impl From<MemoBytesProxy> for MemoBytes {
    fn from(p: MemoBytesProxy) -> MemoBytes {
        MemoBytes::from_bytes(&hex::decode(&p.0).unwrap()).unwrap()
    }
}

impl TransactionReport {
    #[allow(dead_code)]
    pub fn from_plan(network: &Network, p: TransactionPlan) -> TxReportT {
        let mut spends = [0; 3];
        let mut outs = [0; 3];
        let mut changes = [0; 3];

        for input in p.spends.iter() {
            spends[input.source.pool()] += input.amount;
        }
        for output in p.outputs.iter() {
            outs[output.destination.pool()] += output.amount;
            if output.id_order.is_none() {
                changes[output.destination.pool()] += output.amount;
            }
        }

        let outputs: Vec<_> = p
            .outputs
            .iter()
            .filter_map(|o| {
                o.id_order.map(|id| TxOutputT {
                    id,
                    address: Some(o.address.clone()),
                    amount: o.amount,
                    pool: o.destination.pool() as u8,
                })
            })
            .collect();

        let net_sapling = outs[1] as i64 - spends[1] as i64;
        let net_orchard = outs[2] as i64 - spends[2] as i64;

        let privacy_level = if outs[0] - changes[0] != 0 && spends[0] != 0 {
            0 // very low privacy: t2t
        } else if outs[0] != 0 || spends[0] != 0 {
            1 // low privacy: t2z or z2t
        } else if net_sapling.abs() as u64 > p.fee || net_orchard.abs() as u64 > p.fee {
            2 // medium: z2z but with revealed amounts
        } else {
            3
        };

        let report = TxReportT {
            outputs: Some(outputs),
            transparent: spends[0] - changes[0],
            sapling: spends[1] - changes[1],
            orchard: spends[2] - changes[2],
            net_sapling,
            net_orchard,
            fee: p.fee,
            privacy_level,
        };

        report
    }
}
