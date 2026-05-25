use super::optimize::{allocate_funds, fill, group_orders};
use super::types::*;
use super::TransactionBuilderError::NotEnoughFunds;
use crate::note_selection::build_tx_plan;
use crate::note_selection::fee::{FeeCalculator, FeeZIP327};
use crate::note_selection::optimize::select_inputs;
use assert_matches::assert_matches;
use serde::Serialize;
use serde_json::Value;
use zcash_primitives::consensus::Network;
use zcash_primitives::memo::MemoBytes;

macro_rules! utxo {
    ($id:expr, $q:expr) => {
        UTXO {
            id: $id,
            amount: $q * 1000,
            source: Source::Transparent {
                txid: [0u8; 32],
                index: $id,
            },
            key: None,
        }
    };
}

macro_rules! sapling {
    ($id:expr, $q:expr) => {
        UTXO {
            id: $id,
            amount: $q * 1000,
            source: Source::Sapling {
                id_note: $id,
                diversifier: [0u8; 11],
                rseed: [0u8; 32],
                witness: vec![],
            },
            key: None,
        }
    };
}

macro_rules! orchard {
    ($id:expr, $q:expr) => {
        UTXO {
            id: $id,
            amount: $q * 1000,
            source: Source::Orchard {
                id_note: $id,
                diversifier: [0u8; 11],
                rseed: [0u8; 32],
                rho: [0u8; 32],
                witness: vec![],
            },
            key: None,
        }
    };
}

macro_rules! order {
    ($id:expr, $q:expr, $destinations:expr) => {
        Order {
            id: $id,
            address: String::new(),
            raw_amount: $q * 1000,
            destinations: $destinations,
            memo: MemoBytes::empty(),
            take_fee: false,
        }
    };
}

macro_rules! t {
    ($id: expr, $q:expr) => {
        order!(
            $id,
            $q,
            [Some(Destination::Transparent([0u8; 21])), None, None]
        )
    };
}

macro_rules! s {
    ($id: expr, $q:expr) => {
        order!($id, $q, [None, Some(Destination::Sapling([0u8; 43])), None])
    };
}

macro_rules! o {
    ($id: expr, $q:expr) => {
        order!($id, $q, [None, None, Some(Destination::Orchard([0u8; 43]))])
    };
}

macro_rules! ts {
    ($id: expr, $q:expr) => {
        order!(
            $id,
            $q,
            [
                Some(Destination::Transparent([0u8; 21])),
                Some(Destination::Sapling([0u8; 43])),
                None
            ]
        )
    };
}

macro_rules! to {
    ($id: expr, $q:expr) => {
        order!(
            $id,
            $q,
            [
                Some(Destination::Transparent([0u8; 21])),
                None,
                Some(Destination::Orchard([0u8; 43]))
            ]
        )
    };
}

macro_rules! so {
    ($id: expr, $q:expr) => {
        order!(
            $id,
            $q,
            [
                None,
                Some(Destination::Sapling([0u8; 43])),
                Some(Destination::Orchard([0u8; 43]))
            ]
        )
    };
}

macro_rules! tso {
    ($id: expr, $q:expr) => {
        order!(
            $id,
            $q,
            [
                Some(Destination::Transparent([0u8; 21])),
                Some(Destination::Sapling([0u8; 43])),
                Some(Destination::Orchard([0u8; 43]))
            ]
        )
    };
}

#[test]
#[ignore]
fn test_select() {
    env_logger::init();

    // Exhaustive test of every combination of T/S/O/S+O recipients
    // with every combination of assets in sender's account
    let mut c = 0usize;
    for t in 0..=10 {
        for s in 0..=10 {
            for o in 0..=10 {
                for so in 0..=10 {
                    for fee in 0..=10 {
                        let amounts = OrderGroupAmounts {
                            t0: t * 10_000,
                            s0: s * 10_000,
                            o0: o * 10_000,
                            x: so * 10_000,
                            fee: fee * 1000,
                        };
                        for t in 0..=10 {
                            for s in 0..=10 {
                                for o in 0..=10 {
                                    let _ = allocate_funds(
                                        &amounts,
                                        &&PoolAllocation([t * 20_000, s * 20_000, o * 20_000]),
                                    );
                                    c += 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    println!("{} tests", c);
}

#[test]
fn test_t2t() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 100,
            s0: 0,
            o0: 0,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([150, 0, 0]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 110,
            s2: 0,
            o2: 0
        }
    )
}

#[test]
fn test_t2zs() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 100,
            o0: 0,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([150, 0, 0]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 110,
            s2: 0,
            o2: 0
        }
    )
}

#[test]
fn test_t2zo() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 0,
            o0: 100,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([150, 0, 0]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 110,
            s2: 0,
            o2: 0
        }
    )
}

#[test]
fn test_t2ua() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 0,
            o0: 0,
            x: 100,
            fee: 10,
        },
        &PoolAllocation([150, 0, 0]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 50,
            o1: 50,
            t2: 110,
            s2: 0,
            o2: 0
        }
    )
}

#[test]
fn test_zs2zs() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 100,
            o0: 0,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([0, 150, 0]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 0,
            s2: 110,
            o2: 0
        }
    )
}

#[test]
fn test_zo2zo() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 0,
            o0: 100,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([0, 0, 150]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 0,
            s2: 0,
            o2: 110
        }
    )
}

#[test]
fn test_ua2zs() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 100,
            o0: 0,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([0, 150, 150]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 0,
            s2: 105,
            o2: 5,
        }
    ) // net change is (-5, -5) which is better than (-10, 0)
}

#[test]
fn test_ua2zo() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 0,
            o0: 100,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([0, 150, 150]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 0,
            s2: 5,
            o2: 105,
        }
    ) // net change is (-5, -5) which is better than (-10, 0)
}

#[test]
fn test_ua2t() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 100,
            s0: 0,
            o0: 0,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([0, 150, 150]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 0,
            s2: 55,
            o2: 55,
        }
    ) // split equally between sapling & orchard
}

#[test]
fn test_zs2t() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 100,
            s0: 0,
            o0: 0,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([0, 150, 0]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 0,
            s2: 110,
            o2: 0,
        }
    )
}

#[test]
fn test_zo2t() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 100,
            s0: 0,
            o0: 0,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([0, 0, 150]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 0,
            s2: 0,
            o2: 110,
        }
    )
}

#[test]
fn test_zo2zs() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 100,
            o0: 0,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([0, 0, 150]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 0,
            s2: 0,
            o2: 110,
        }
    )
}

#[test]
fn test_zs2zo() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 0,
            o0: 100,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([0, 150, 0]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 0,
            s2: 110,
            o2: 0,
        }
    )
}

#[test]
fn test_ua2ua() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 0,
            o0: 0,
            x: 100,
            fee: 10,
        },
        &PoolAllocation([0, 150, 150]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 50,
            o1: 50,
            t2: 0,
            s2: 55,
            o2: 55,
        }
    )
}

#[test]
fn test_tzs2zs() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 100,
            o0: 0,
            x: 0,
            fee: 10,
        },
        &PoolAllocation([150, 10, 10]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 0,
            t2: 90, // must use t because not enough zs & zo
            s2: 10,
            o2: 10,
        }
    )
}

#[test]
fn test_tzs2ua() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 0,
            o0: 0,
            x: 100,
            fee: 10,
        },
        &PoolAllocation([150, 10, 10]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 50,
            o1: 50, // split equally to minimize net change
            t2: 90, // must use t because not enough zs & zo
            s2: 10,
            o2: 10,
        }
    )
}

#[test]
fn test_neg_ua2ua() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 0,
            s0: 0,
            o0: 0,
            x: 100,
            fee: 10,
        },
        &PoolAllocation([10, 10, 10]),
    );
    assert_matches!(r, Err(NotEnoughFunds(_)))
}

#[test]
fn test_odd_ua2ua() {
    let r = allocate_funds(
        &OrderGroupAmounts {
            t0: 1,
            s0: 1,
            o0: 1,
            x: 1,
            fee: 1,
        },
        &PoolAllocation([10, 10, 10]),
    )
    .unwrap();
    assert_eq!(
        r,
        FundAllocation {
            s1: 0,
            o1: 1,
            t2: 0,
            s2: 2,
            o2: 3,
        }
    )
}

#[test]
fn test_fill() {
    let _ = env_logger::try_init();
    let orders = vec![
        t!(1, 10),
        s!(2, 20),
        o!(3, 30),
        ts!(4, 40),
        to!(5, 50),
        so!(6, 60),
        tso!(7, 70),
    ];
    let (groups, amounts) = group_orders(&orders, 0).unwrap();
    assert_eq!(
        amounts,
        OrderGroupAmounts {
            t0: 10_000,
            s0: 60_000,
            o0: 80_000,
            x: 130_000,
            fee: 0
        }
    );
    let allocation =
        allocate_funds(&amounts, &PoolAllocation([200_000, 200_000, 200_000])).unwrap();

    let fills = fill(&orders, &groups, &amounts, &allocation, 0).unwrap();
    log::info!("{:?}", allocation);
    log::info!("{:?}", fills);

    assert_eq!(fills[5].amount + fills[6].amount, 60_000);
    assert_eq!(fills[7].amount + fills[8].amount, 70_000);
    assert_eq!(
        fills[1].amount + fills[3].amount + fills[5].amount + fills[7].amount,
        fills[2].amount + fills[4].amount + fills[6].amount + fills[8].amount
    );
}

#[test]
fn test_select_utxo() {
    let _ = env_logger::try_init();
    let allocation = FundAllocation {
        s1: 75000,
        o1: 55000,
        t2: 0,
        s2: 140000,
        o2: 140000,
    };
    let mut utxos = vec![];
    for i in 0..30 {
        if i < 10 {
            utxos.push(utxo!(i, 25));
        } else if i < 20 {
            utxos.push(sapling!(i, 25));
        } else {
            utxos.push(orchard!(i, 25));
        }
    }
    let (_inputs, change) = select_inputs(&utxos, &allocation).unwrap();

    assert_eq!(change.0, [0, 10000, 10000]);
}

const CHANGE_ADDRESS: &str = "u1pncsxa8jt7aq37r8uvhjrgt7sv8a665hdw44rqa28cd9t6qqmktzwktw772nlle6skkkxwmtzxaan3slntqev03g70tzpky3c58hfgvfjkcky255cwqgfuzdjcktfl7pjalt5sl33se75pmga09etn9dplr98eq2g8cgmvgvx6jx2a2xhy39x96c6rumvlyt35whml87r064qdzw30e";

#[test]
fn test_fees() {
    let _ = env_logger::try_init();
    let utxos = utxos();
    let orders = vec![
        t!(1, 10),
        s!(2, 20),
        o!(3, 30),
        ts!(4, 40),
        to!(5, 50),
        so!(6, 60),
        tso!(7, 70),
    ];
    let (groups, amounts) = group_orders(&orders, 0).unwrap();
    let allocation =
        allocate_funds(&amounts, &PoolAllocation([200_000, 200_000, 200_000])).unwrap();
    let fills = fill(&orders, &groups, &amounts, &allocation, 0).unwrap();

    let f = FeeZIP327 {};
    let fees = f.calculate_fee(&utxos, &fills);
    assert_eq!(fees, 150_000);
}

#[test]
fn test_tx_plan() {
    let _ = env_logger::try_init();
    let utxos = utxos();
    let orders = vec![
        t!(1, 10),
        s!(2, 20),
        o!(3, 30),
        ts!(4, 40),
        to!(5, 50),
        so!(6, 60),
        tso!(7, 70),
    ];
    let tx_plan = build_tx_plan::<FeeZIP327>(
        &Network::MainNetwork,
        "",
        "",
        "",
        0,
        0,
        &None,
        &utxos,
        &orders,
        &TransactionBuilderConfig {
            change_address: CHANGE_ADDRESS.to_string(),
        },
        &FeeZIP327 {},
    )
    .unwrap();
    let simple_plan: SimpleTxPlan = tx_plan.into();
    let plan = serde_json::to_string(&simple_plan).unwrap();
    log::info!("{}", plan);

    let tx_plan_json = serde_json::to_value(&simple_plan).unwrap();
    let expected: Value = serde_json::from_str(
        r#"{
        "inputs": [{
            "pool": 1,
            "amount": 25000
        }, {
            "pool": 1,
            "amount": 25000
        }, {
            "pool": 1,
            "amount": 25000
        }, {
            "pool": 1,
            "amount": 25000
        }, {
            "pool": 1,
            "amount": 25000
        }, {
            "pool": 1,
            "amount": 25000
        }, {
            "pool": 1,
            "amount": 25000
        }, {
            "pool": 1,
            "amount": 25000
        }, {
            "pool": 2,
            "amount": 25000
        }, {
            "pool": 2,
            "amount": 25000
        }, {
            "pool": 2,
            "amount": 25000
        }, {
            "pool": 2,
            "amount": 25000
        }, {
            "pool": 2,
            "amount": 25000
        }, {
            "pool": 2,
            "amount": 25000
        }, {
            "pool": 2,
            "amount": 25000
        }, {
            "pool": 2,
            "amount": 25000
        }],
        "outputs": [{
            "pool": 0,
            "amount": 10000
        }, {
            "pool": 1,
            "amount": 20000
        }, {
            "pool": 2,
            "amount": 30000
        }, {
            "pool": 1,
            "amount": 40000
        }, {
            "pool": 2,
            "amount": 50000
        }, {
            "pool": 1,
            "amount": 34615
        }, {
            "pool": 2,
            "amount": 25385
        }, {
            "pool": 1,
            "amount": 40385
        }, {
            "pool": 2,
            "amount": 29615
        }, {
            "pool": 1,
            "amount": 17500
        }, {
            "pool": 2,
            "amount": 17500
        }],
        "fee": 85000
    }"#,
    )
    .unwrap();
    assert_eq!(tx_plan_json, expected);
}

#[derive(Serialize)]
struct SimpleTxPlan {
    inputs: Vec<SimpleTxIO>,
    outputs: Vec<SimpleTxIO>,
    fee: u64,
}

#[derive(Serialize)]
struct SimpleTxIO {
    pool: u8,
    amount: u64,
}

impl From<TransactionPlan> for SimpleTxPlan {
    fn from(p: TransactionPlan) -> Self {
        SimpleTxPlan {
            inputs: p
                .spends
                .iter()
                .map(|utxo| SimpleTxIO {
                    pool: utxo.source.pool() as u8,
                    amount: utxo.amount,
                })
                .collect(),
            outputs: p
                .outputs
                .iter()
                .map(|utxo| SimpleTxIO {
                    pool: utxo.destination.pool() as u8,
                    amount: utxo.amount,
                })
                .collect(),
            fee: p.fee,
        }
    }
}

fn utxos() -> Vec<UTXO> {
    let mut utxos = vec![];
    for i in 0..30 {
        if i < 10 {
            utxos.push(utxo!(i, 25));
        } else if i < 20 {
            utxos.push(sapling!(i, 25));
        } else {
            utxos.push(orchard!(i, 25));
        }
    }
    utxos
}
