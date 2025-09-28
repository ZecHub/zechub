//! encode and decode Payment URI

use crate::coinconfig::CoinConfig;
use crate::key2::decode_address;
use serde::{Deserialize, Serialize};
use std::convert::TryFrom;
use std::str::FromStr;
use zcash_client_backend::zip321::{Payment, TransactionRequest};
use zcash_primitives::memo::Memo;
use zcash_primitives::transaction::components::Amount;

/// Build a payment URI
/// # Arguments
/// * `address`: recipient address
/// * `amount`: amount in zats
/// * `memo`: memo text
pub fn make_payment_uri(
    coin: u8,
    address: &str,
    amount: u64,
    memo: &str,
) -> anyhow::Result<String> {
    let c = CoinConfig::get(coin);
    let addr = decode_address(coin, address).ok_or_else(|| anyhow::anyhow!("Invalid address"))?;
    let payment = Payment {
        recipient_address: addr,
        amount: Amount::from_u64(amount).map_err(|_| anyhow::anyhow!("Invalid amount"))?,
        memo: Some(Memo::from_str(memo)?.into()),
        label: None,
        message: None,
        other_params: vec![],
    };
    let treq = TransactionRequest {
        payments: vec![payment],
    };
    let uri = treq
        .to_uri(c.chain.network())
        .ok_or_else(|| anyhow::anyhow!("Cannot build Payment URI"))?;
    let uri = format!("{}{}", c.chain.ticker(), &uri[5..]); // hack to replace the URI scheme
    Ok(uri)
}

/// Decode a payment uri
/// # Arguments
/// * `uri`: payment uri
pub fn parse_payment_uri(coin: u8, uri: &str) -> anyhow::Result<PaymentURI> {
    let c = CoinConfig::get(coin);
    let scheme = c.chain.ticker();
    let scheme_len = scheme.len().min(uri.len());
    if uri[..scheme_len].ne(scheme) {
        anyhow::bail!("Invalid Payment URI: Invalid scheme");
    }
    let uri = format!("zcash{}", &uri[scheme_len..]); // hack to replace the URI scheme
    let treq = TransactionRequest::from_uri(c.chain.network(), &uri)
        .map_err(|e| anyhow::anyhow!("Invalid Payment URI: {:?}", e))?;
    if treq.payments.len() != 1 {
        anyhow::bail!("Invalid Payment URI: Exactly one payee expected")
    }
    let payment = &treq.payments[0];
    let memo = match payment.memo {
        Some(ref memo) => {
            let memo = Memo::try_from(memo.clone())?;
            match memo {
                Memo::Text(text) => Ok(text.to_string()),
                Memo::Empty => Ok(String::new()),
                _ => Err(anyhow::anyhow!("Invalid Memo")),
            }
        }
        None => Ok(String::new()),
    }?;
    let payment = PaymentURI {
        address: payment.recipient_address.encode(c.chain.network()),
        amount: u64::from(payment.amount),
        memo,
    };

    // let payment_json = serde_json::to_string(&payment)?;
    //
    Ok(payment)
}

#[derive(Serialize, Deserialize)]
pub struct PaymentURI {
    pub address: String,
    pub amount: u64,
    pub memo: String,
}
