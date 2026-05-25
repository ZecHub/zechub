use anyhow::{anyhow, Result};
use byteorder::WriteBytesExt;
use byteorder::LE;
use group::GroupEncoding;
use hex_literal::hex;
use jubjub::Fr;
use jubjub::SubgroupPoint;
use ledger_apdu::APDUCommand;
use ledger_transport_hid::{hidapi::HidApi, TransportNativeHID};
use serde_json::Value;
use std::io::Write;
use zcash_primitives::sapling::ProofGenerationKey;
use zcash_primitives::zip32::DiversifiableFullViewingKey;

fn handle_error_code(code: u16) -> Result<()> {
    match code {
        0x9000 => Ok(()),
        0x6D02 => Err(anyhow!("Zcash Application NOT OPEN")),
        0x6985 => Err(anyhow!("Tx REJECTED by User")),
        0x5515 => Err(anyhow!("Ledger is LOCKED")),
        _ => Err(anyhow!("Ledger device returned error code {:#06x}", code)),
    }
}

fn apdu(data: &[u8]) -> Result<Vec<u8>> {
    let api = HidApi::new()?;
    let transport = TransportNativeHID::new(&api)?;
    let command = APDUCommand {
        cla: data[0],
        ins: data[1],
        p1: data[2],
        p2: data[3],
        data: &data[5..],
    };
    println!("ins {} {}", data[1], hex::encode(data));
    let response = transport.exchange(&command)?;
    let error_code = response.retcode();
    log::info!("error_code {}", error_code);
    handle_error_code(error_code)?;
    let rep = response.data().to_vec();
    println!("rep {}", hex::encode(&rep));
    Ok(rep)
}

const TEST_SERVER_IP: Option<&'static str> = option_env!("LEDGER_IP");

#[allow(dead_code)]
fn apdu2(data: &[u8]) -> Result<Vec<u8>> {
    let response = ureq::post(&format!("http://{}:5000/apdu", TEST_SERVER_IP.unwrap()))
        .send_string(&format!("{{\"data\": \"{}\"}}", hex::encode(data)))?
        .into_string()?;
    println!("ins {} {}", data[1], hex::encode(data));
    let response_body: Value = serde_json::from_str(&response)?;
    let data = response_body["data"]
        .as_str()
        .ok_or(anyhow!("No data field"))?;
    let data = hex::decode(data)?;
    println!("rep {}", hex::encode(&data));
    let error_code = u16::from_be_bytes(data[data.len() - 2..].try_into().unwrap());
    handle_error_code(error_code)?;
    Ok(data[..data.len() - 2].to_vec())
}

pub fn ledger_has_orchard() -> Result<bool> {
    let mut bb: Vec<u8> = vec![];
    bb.clear();
    bb.write_all(&hex!("E00A000000"))?;
    let res = apdu(&bb)?;

    Ok(res[0] == 1)
}

pub fn ledger_init() -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.clear();
    bb.write_all(&hex!("E005000000"))?;
    apdu(&bb)?;

    Ok(())
}

pub fn ledger_get_pubkey() -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E006000000"))?;
    let pk = apdu(&bb)?;
    Ok(pk)
}

pub fn ledger_get_dfvk() -> Result<DiversifiableFullViewingKey> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E007000000"))?;
    let dfvk_vec = apdu(&bb)?;
    let mut dfvk = [0; 128];
    dfvk.copy_from_slice(&dfvk_vec);

    let dfvk = DiversifiableFullViewingKey::from_bytes(&dfvk)
        .ok_or(anyhow!("Invalid diversifiable fvk"))?;
    Ok(dfvk)
}

pub fn ledger_get_o_fvk() -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E008000000"))?;
    let pk = apdu(&bb)?;
    Ok(pk)
}

pub fn ledger_get_proofgen_key() -> Result<ProofGenerationKey> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E009000000"))?;
    let proofgen_key = apdu(&bb)?;
    let proofgen_key = ProofGenerationKey {
        ak: SubgroupPoint::from_bytes(proofgen_key[0..32].try_into().unwrap()).unwrap(),
        nsk: Fr::from_bytes(proofgen_key[32..64].try_into().unwrap()).unwrap(),
    };
    Ok(proofgen_key)
}

pub fn ledger_init_tx() -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E010000000"))?;
    let main_seed = apdu(&bb)?;
    Ok(main_seed)
}

pub fn ledger_set_stage(stage: u8) -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E011"))?;
    bb.write_u8(stage)?;
    bb.write_all(&hex!("0000"))?;
    apdu(&bb)?;
    Ok(())
}

pub fn ledger_add_t_input(amount: u64) -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E012000008"))?;
    bb.write_u64::<LE>(amount)?;
    apdu(&bb)?;
    Ok(())
}

pub fn ledger_add_t_output(amount: u64, address: &[u8]) -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E01301001D"))?;
    bb.write_u64::<LE>(amount)?;
    bb.write_all(address)?;
    apdu(&bb)?;
    Ok(())
}

pub fn ledger_add_s_output(
    amount: u64,
    epk: &[u8],
    address: &[u8],
    enc_compact: &[u8],
) -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E014010087"))?;
    bb.write_all(address)?;
    bb.write_u64::<LE>(amount)?;
    bb.write_all(epk)?;
    bb.write_all(enc_compact)?;
    apdu(&bb)?;
    Ok(())
}

pub fn ledger_add_o_action(
    nf: &[u8],
    amount: u64,
    epk: &[u8],
    address: &[u8],
    enc_compact: &[u8],
) -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E0150100A7"))?;
    bb.write_all(nf)?;
    bb.write_all(address)?;
    bb.write_u64::<LE>(amount)?;
    bb.write_all(epk)?;
    bb.write_all(enc_compact)?;
    apdu(&bb)?;
    Ok(())
}

pub fn ledger_set_net_sapling(net: i64) -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E016000008"))?;
    bb.write_i64::<LE>(net)?;
    apdu(&bb)?;
    Ok(())
}

pub fn ledger_set_net_orchard(net: i64) -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E017000008"))?;
    bb.write_i64::<LE>(net)?;
    apdu(&bb)?;
    Ok(())
}

pub fn ledger_set_header_digest(header_digest: &[u8]) -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E018000020"))?;
    bb.write_all(header_digest)?;
    apdu(&bb)?;
    Ok(())
}

pub fn ledger_set_transparent_merkle_proof(
    prevouts_digest: &[u8],
    pubscripts_digest: &[u8],
    sequences_digest: &[u8],
) -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E019000060"))?;
    bb.write_all(prevouts_digest)?;
    bb.write_all(pubscripts_digest)?;
    bb.write_all(sequences_digest)?;
    apdu(&bb)?;
    Ok(())
}

pub fn ledger_set_sapling_merkle_proof(
    spends_digest: &[u8],
    memos_digest: &[u8],
    outputs_nc_digest: &[u8],
) -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E01A000060"))?;
    bb.write_all(spends_digest)?;
    bb.write_all(memos_digest)?;
    bb.write_all(outputs_nc_digest)?;
    apdu(&bb)?;
    Ok(())
}

pub fn ledger_set_orchard_merkle_proof(
    anchor: &[u8],
    memos_digest: &[u8],
    outputs_nc_digest: &[u8],
) -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E01B000060"))?;
    bb.write_all(anchor)?;
    bb.write_all(memos_digest)?;
    bb.write_all(outputs_nc_digest)?;
    apdu(&bb)?;
    Ok(())
}

pub fn ledger_confirm_fee() -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E01C010100"))?;
    let hashes = apdu(&bb)?;
    Ok(hashes)
}

pub fn ledger_sign_transparent(txin_digest: &[u8]) -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E021000020"))?;
    bb.write_all(txin_digest)?;
    let signature = apdu(&bb)?;
    Ok(signature)
}

pub fn ledger_sign_sapling() -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E022000000"))?;
    let signature = apdu(&bb)?;
    Ok(signature)
}

pub fn ledger_sign_orchard() -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E023000000"))?;
    let signature = apdu(&bb)?;
    Ok(signature)
}

pub fn ledger_get_shielded_sighash() -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E024000000"))?;
    let signature = apdu(&bb)?;
    Ok(signature)
}

pub fn ledger_end_tx() -> Result<()> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E030000000"))?;
    apdu(&bb)?;
    Ok(())
}

pub fn ledger_test_cmu(data: &[u8]) -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E0F00000"))?;
    bb.write_u8(data.len() as u8)?;
    bb.write_all(data)?;
    let cmu = apdu(&bb)?;
    Ok(cmu)
}

pub fn ledger_jubjub_hash(data: &[u8]) -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E0810000"))?;
    bb.write_u8(data.len() as u8)?;
    bb.write_all(data)?;
    let cmu = apdu(&bb)?;
    Ok(cmu)
}

pub fn ledger_pedersen_hash(data: &[u8]) -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E0820000"))?;
    bb.write_u8(data.len() as u8)?;
    bb.write_all(data)?;
    let cmu = apdu(&bb)?;
    Ok(cmu)
}

pub fn ledger_get_debug(i: u8) -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E0FE"))?;
    bb.write_u8(i)?;
    bb.write_all(&hex!("0000"))?;
    let res = apdu(&bb)?;
    Ok(res)
}

pub fn ledger_test_math(i: u8) -> Result<Vec<u8>> {
    let mut bb: Vec<u8> = vec![];
    bb.write_all(&hex!("E0FF"))?;
    bb.write_u8(i)?;
    bb.write_all(&hex!("0000"))?;
    let res = apdu(&bb)?;
    Ok(res)
}
