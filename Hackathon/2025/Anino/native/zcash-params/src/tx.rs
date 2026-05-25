use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Tx {
    pub height: u32,
    pub t_inputs: Vec<TTxIn>,
    pub inputs: Vec<TxIn>,
    pub outputs: Vec<TxOut>,
    pub change: String,
    pub ovk: String,
}

impl Tx {
    pub fn new(height: u32) -> Self {
        Tx {
            height,
            t_inputs: vec![],
            inputs: vec![],
            outputs: vec![],
            change: "".to_string(),
            ovk: "".to_string(),
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TxIn {
    pub diversifier: String,
    pub fvk: String,
    pub amount: u64,
    pub rseed: String,
    pub witness: String,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct TTxIn {
    pub op: String,
    pub n: u32,
    pub amount: u64,
    pub script: String,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct TxOut {
    pub addr: String,
    pub amount: u64,
    pub ovk: String,
    pub memo: String,
}
