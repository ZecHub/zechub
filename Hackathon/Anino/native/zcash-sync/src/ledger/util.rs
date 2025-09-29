use anyhow::{anyhow, Result};
use ledger_apdu::{APDUCommand, APDUErrorCode};
use ledger_transport_hid::{TransportNativeHID, hidapi::HidApi};
use zcash_client_backend::encoding::encode_extended_full_viewing_key;
use zcash_primitives::{zip32::{DiversifiableFullViewingKey, ExtendedFullViewingKey}, consensus::{Parameters, Network}};
use std::ops::Deref;

pub fn build_keys(client: &LedgerClient) -> Result<()> {
    let command = APDUCommand::<Vec<u8>> {
        cla: 0xE0,
        ins: 0x05,
        p1: 0,
        p2: 0,
        data: vec![],
    };
    client.exchange(&command)?;
    
    Ok(())
}

pub fn get_address(client: &LedgerClient) -> Result<String> {
    let command = APDUCommand::<Vec<u8>> {
        cla: 0xE0,
        ins: 0x07,
        p1: 0,
        p2: 0,
        data: vec![],
    };
    let response = client.exchange(&command)?;
    let address = String::from_utf8_lossy(&response);
    println!("{}", address);
    
    Ok(address.to_string())
}

pub fn get_fvk(network: &Network, client: &LedgerClient) -> Result<String> {
    let command = APDUCommand::<Vec<u8>> {
        cla: 0xE0,
        ins: 0x06,
        p1: 0,
        p2: 0,
        data: vec![],
    };
    let response = client.exchange(&command)?;
    let mut dfvk = [0u8; 128];
    dfvk.copy_from_slice(&response);

    let dfvk = DiversifiableFullViewingKey::from_bytes(&dfvk).ok_or(anyhow!("Invalid diversifiable fvk"))?;
    let fvk = ExtendedFullViewingKey::from_diversifiable_full_viewing_key(&dfvk);
    let fvk = encode_extended_full_viewing_key(network.hrp_sapling_extended_full_viewing_key(), &fvk);
    
    Ok(fvk)
}

pub struct LedgerClient {
    transport: TransportNativeHID,
}

impl LedgerClient {
    pub fn new() -> Result<Self> {
        let api = HidApi::new()?;
        for d in api.device_list() {
            println!("{:?} {} {} {}", d, d.path().to_string_lossy(), d.manufacturer_string().unwrap(), d.usage_page());
        }
        let transport = TransportNativeHID::new(&api)?;
        Ok(LedgerClient {
            transport,
        })
    }

    pub fn exchange<B>(&self, command: &APDUCommand<B>) -> Result<Vec<u8>> where B: Deref<Target = [u8]> {
        let answer = self.transport.exchange(command)?;
        let code = answer.error_code().map_err(|e| anyhow!("APDU Error {}", e))?;
        if code != APDUErrorCode::NoError {
            anyhow::bail!(code);
        }
        Ok(answer.data().to_vec())
    }
}
