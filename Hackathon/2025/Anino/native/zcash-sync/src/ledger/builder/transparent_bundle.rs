use blake2b_simd::State;
use byteorder::WriteBytesExt;
use byteorder::LE;

use hex_literal::hex;

use crate::ledger::transport::*;
use crate::taddr::derive_from_pubkey;

use anyhow::Result;

use zcash_client_backend::encoding::decode_transparent_address;
use zcash_primitives::consensus::Network;
use zcash_primitives::consensus::Parameters;
use zcash_primitives::legacy::{Script, TransparentAddress};
use zcash_primitives::transaction::components::{transparent, Amount, OutPoint, TxIn, TxOut};

use super::create_hasher;

pub struct TransparentInputUnAuthorized {
    utxo: OutPoint,
    coin: TxOut,
}

pub struct TransparentBuilder {
    pub taddr: String,
    pubkey: Vec<u8>,
    pkh: [u8; 20],
    tin_pubscript: Script,
    prevouts_hasher: State,
    trscripts_hasher: State,
    sequences_hasher: State,
    vin: Vec<TransparentInputUnAuthorized>,
    vins: Vec<TxIn<transparent::Authorized>>,
    vout: Vec<TxOut>,
}

impl TransparentBuilder {
    pub fn new(network: &Network, pubkey: &[u8]) -> Self {
        let taddr_str = derive_from_pubkey(network, &pubkey).unwrap();
        let taddr = decode_transparent_address(
            &network.b58_pubkey_address_prefix(),
            &network.b58_script_address_prefix(),
            &taddr_str,
        )
        .unwrap()
        .unwrap();
        let pkh = match taddr {
            TransparentAddress::PublicKey(pkh) => pkh,
            _ => unreachable!(),
        };
        let tin_pubscript = taddr.script();
        TransparentBuilder {
            taddr: taddr_str,
            pubkey: pubkey.to_vec(),
            pkh: pkh.clone(),
            tin_pubscript,
            prevouts_hasher: create_hasher(b"ZTxIdPrevoutHash"),
            trscripts_hasher: create_hasher(b"ZTxTrScriptsHash"),
            sequences_hasher: create_hasher(b"ZTxIdSequencHash"),
            vin: vec![],
            vins: vec![],
            vout: vec![],
        }
    }

    pub fn add_input(&mut self, txid: [u8; 32], index: u32, amount: u64) -> Result<()> {
        self.prevouts_hasher.update(&txid);
        self.prevouts_hasher.write_u32::<LE>(index)?;
        self.trscripts_hasher.update(&hex!("1976a914"));
        self.trscripts_hasher.update(&self.pkh);
        self.trscripts_hasher.update(&hex!("88ac"));
        self.sequences_hasher.update(&hex!("FFFFFFFF"));

        self.vin.push(TransparentInputUnAuthorized {
            utxo: OutPoint::new(txid, index),
            coin: TxOut {
                value: Amount::from_u64(amount).unwrap(),
                script_pubkey: self.tin_pubscript.clone(), // will always use the h/w address
            },
        });

        ledger_add_t_input(amount)?;
        Ok(())
    }

    pub fn add_output(&mut self, raw_address: [u8; 21], amount: u64) -> Result<()> {
        if raw_address[0] != 0 {
            anyhow::bail!("Only t1 addresses are supported");
        }
        ledger_add_t_output(amount, &raw_address)?;
        let ta = TransparentAddress::PublicKey(raw_address[1..21].try_into().unwrap());
        self.vout.push(TxOut {
            value: Amount::from_u64(amount).unwrap(),
            script_pubkey: ta.script(),
        });
        Ok(())
    }

    pub fn set_merkle_proof(&self) -> Result<()> {
        let prevouts_digest = self.prevouts_hasher.finalize();
        log::info!("PREVOUTS {}", hex::encode(prevouts_digest));
        let pubscripts_digest = self.trscripts_hasher.finalize();
        log::info!("PUBSCRIPTS {}", hex::encode(pubscripts_digest));
        let sequences_digest = self.sequences_hasher.finalize();
        log::info!("SEQUENCES {}", hex::encode(sequences_digest));

        ledger_set_transparent_merkle_proof(
            prevouts_digest.as_bytes(),
            pubscripts_digest.as_bytes(),
            sequences_digest.as_bytes(),
        )?;
        Ok(())
    }

    pub fn sign(&mut self) -> Result<()> {
        let _vins: Vec<TxIn<transparent::Authorized>> = vec![];
        for tin in self.vin.iter() {
            let mut txin_hasher = create_hasher(b"Zcash___TxInHash");

            txin_hasher.update(tin.utxo.hash());
            txin_hasher.update(&tin.utxo.n().to_le_bytes());
            txin_hasher.update(&tin.coin.value.to_i64_le_bytes());
            txin_hasher.update(&[0x19]); // add the script length
            txin_hasher.update(&tin.coin.script_pubkey.0);
            txin_hasher.update(&0xFFFFFFFFu32.to_le_bytes());
            let txin_hash = txin_hasher.finalize();
            log::info!("TXIN {}", hex::encode(txin_hash));

            let signature = ledger_sign_transparent(txin_hash.as_bytes())?;
            let signature = secp256k1::ecdsa::Signature::from_compact(&signature)?;
            let mut signature = signature.serialize_der().to_vec();
            signature.extend(&[0x01]); // add SIG_HASH_ALL

            // witness is PUSH(signature) PUSH(pk)
            let script_sig = Script::default() << &*signature << &*self.pubkey;

            let txin = TxIn::<transparent::Authorized> {
                prevout: tin.utxo.clone(),
                script_sig,
                sequence: 0xFFFFFFFFu32,
            };
            self.vins.push(txin);
        }

        Ok(())
    }

    pub fn build(self) -> Option<transparent::Bundle<transparent::Authorized>> {
        if !self.vin.is_empty() || !self.vout.is_empty() {
            let transparent_bundle = transparent::Bundle::<transparent::Authorized> {
                vin: self.vins,
                vout: self.vout,
                authorization: transparent::Authorized,
            };
            Some(transparent_bundle)
        } else {
            None
        }
    }
}
