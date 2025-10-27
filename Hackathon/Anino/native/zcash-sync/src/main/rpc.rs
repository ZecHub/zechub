#[macro_use]
extern crate rocket;

use anyhow::anyhow;
use lazy_static::lazy_static;
use rand::rngs::OsRng;
use rocket::fairing::AdHoc;
use rocket::http::Status;
use rocket::response::Responder;
use rocket::serde::{json::Json, Deserialize, Serialize};
use rocket::{response, Request, Response, State};
use std::collections::HashMap;
use std::sync::Mutex;
use thiserror::Error;
use warp_api_ffi::api::payment_uri::PaymentURI;
use warp_api_ffi::api::recipient::{Recipient, RecipientMemo, RecipientShort};
use warp_api_ffi::{
    build_tx, get_secret_keys, AccountData, AccountRec, CoinConfig, KeyPack, RaptorQDrops,
    TransactionPlan, TxRec,
};

lazy_static! {
    static ref SYNC_CANCELED: Mutex<bool> = Mutex::new(false);
}

#[derive(Error, Debug)]
pub enum Error {
    #[error(transparent)]
    Hex(#[from] hex::FromHexError),
    #[error(transparent)]
    Reqwest(#[from] reqwest::Error),
    #[error(transparent)]
    TxBuilder(#[from] warp_api_ffi::TransactionBuilderError),
    #[error(transparent)]
    Other(#[from] anyhow::Error),
}

impl<'r> Responder<'r, 'static> for Error {
    fn respond_to(self, req: &'r Request<'_>) -> response::Result<'static> {
        let error = self.to_string();
        Response::build_from(error.respond_to(req)?)
            .status(Status::InternalServerError)
            .ok()
    }
}

fn init(coin: u8, config: HashMap<String, String>) -> anyhow::Result<()> {
    warp_api_ffi::init_coin(
        coin,
        config
            .get("db_path")
            .ok_or(anyhow!("Missing configuration value"))?,
    )?;
    warp_api_ffi::set_coin_lwd_url(
        coin,
        config
            .get("lwd_url")
            .ok_or(anyhow!("Missing configuration value"))?,
    );
    Ok(())
}

#[rocket::main]
async fn main() -> anyhow::Result<()> {
    env_logger::init();
    let _ = dotenv::dotenv();

    let rocket = rocket::build();
    let figment = rocket.figment();
    let zec: HashMap<String, String> = figment.extract_inner("zec")?;
    init(0, zec)?;
    let yec: HashMap<String, String> = figment.extract_inner("yec")?;
    init(1, yec)?;
    let arrr: HashMap<String, String> = figment.extract_inner("arrr")?;
    init(2, arrr)?;

    warp_api_ffi::set_active_account(0, 1);
    warp_api_ffi::set_active(0);

    let _ = rocket
        .mount(
            "/",
            routes![
                set_active,
                new_account,
                list_accounts,
                sync,
                rewind,
                get_latest_height,
                get_backup,
                get_balance,
                get_address,
                get_unified_address,
                decode_unified_address,
                get_tx_history,
                pay,
                mark_synced,
                create_offline_tx,
                sign_offline_tx,
                broadcast_tx,
                new_diversified_address,
                make_payment_uri,
                parse_payment_uri,
                split_data,
                merge_data,
                derive_keys,
                get_tx_plan,
                build_from_plan,
            ],
        )
        .attach(AdHoc::config::<Config>())
        .launch()
        .await?;

    Ok(())
}

#[post("/set_active?<coin>&<id_account>")]
pub fn set_active(coin: u8, id_account: u32) {
    warp_api_ffi::set_active_account(coin, id_account);
    warp_api_ffi::set_active(coin);
}

#[post("/new_account", format = "application/json", data = "<seed>")]
pub fn new_account(seed: Json<AccountSeed>) -> Result<String, Error> {
    let id_account = warp_api_ffi::api::account::new_account(
        seed.coin,
        &seed.name,
        seed.key.clone(),
        seed.index,
    )?;
    warp_api_ffi::set_active_account(seed.coin, id_account);
    Ok(id_account.to_string())
}

#[get("/accounts")]
pub fn list_accounts() -> Result<Json<Vec<AccountRec>>, Error> {
    let c = CoinConfig::get_active();
    let db = c.db()?;
    let accounts = db.get_accounts()?;
    Ok(Json(accounts))
}

#[post("/sync?<offset>")]
pub async fn sync(offset: Option<u32>) -> Result<(), Error> {
    let c = CoinConfig::get_active();
    warp_api_ffi::api::sync::coin_sync(
        c.coin,
        true,
        offset.unwrap_or(0),
        50,
        |_| {},
        &SYNC_CANCELED,
    )
    .await?;
    Ok(())
}

#[post("/rewind?<height>")]
pub async fn rewind(height: u32) -> Result<(), Error> {
    warp_api_ffi::api::sync::rewind_to(height).await?;
    Ok(())
}

#[post("/mark_synced")]
pub async fn mark_synced() -> Result<(), Error> {
    let c = CoinConfig::get_active();
    warp_api_ffi::api::sync::skip_to_last_height(c.coin).await?;
    Ok(())
}

#[get("/latest_height")]
pub async fn get_latest_height() -> Result<Json<Heights>, Error> {
    let latest = warp_api_ffi::api::sync::get_latest_height().await?;
    let synced = warp_api_ffi::api::sync::get_synced_height()?;
    Ok(Json(Heights { latest, synced }))
}

#[get("/address")]
pub fn get_address() -> Result<String, Error> {
    let c = CoinConfig::get_active();
    let db = c.db()?;
    let AccountData { address, .. } = db.get_account_info(c.id_account)?;
    Ok(address)
}

#[get("/unified_address?<t>&<s>&<o>")]
pub fn get_unified_address(t: u8, s: u8, o: u8) -> Result<String, Error> {
    let c = CoinConfig::get_active();
    let address =
        warp_api_ffi::api::account::get_unified_address(c.coin, c.id_account, t & s << 1 & o << 2)?;
    Ok(address)
}

#[post("/decode_unified_address?<address>")]
pub fn decode_unified_address(address: String) -> Result<String, Error> {
    let c = CoinConfig::get_active();
    let result = warp_api_ffi::api::account::decode_unified_address(c.coin, &address)?;
    Ok(result)
}

#[get("/backup")]
pub fn get_backup(config: &State<Config>) -> Result<Json<Backup>, Error> {
    if !config.allow_backup {
        Err(anyhow!("Backup API not enabled").into())
    } else {
        let c = CoinConfig::get_active();
        let db = c.db()?;
        let AccountData { seed, sk, fvk, .. } = db.get_account_info(c.id_account)?;
        Ok(Json(Backup { seed, sk, fvk }))
    }
}

#[get("/tx_history")]
pub fn get_tx_history() -> Result<Json<Vec<TxRec>>, Error> {
    let c = CoinConfig::get_active();
    let db = c.db()?;
    let txs = db.get_txs(c.id_account)?;
    Ok(Json(txs))
}

#[get("/balance")]
pub fn get_balance() -> Result<String, Error> {
    let c = CoinConfig::get_active();
    let db = c.db()?;
    let balance = db.get_balance(c.id_account)?;
    Ok(balance.to_string())
}

#[post("/create_offline_tx", data = "<payment>")]
pub async fn create_offline_tx(payment: Json<Payment>) -> Result<Json<TransactionPlan>, Error> {
    let c = CoinConfig::get_active();
    let latest = warp_api_ffi::api::sync::get_latest_height().await?;
    let from = {
        let db = c.db()?;
        let AccountData { address, .. } = db.get_account_info(c.id_account)?;
        address
    };
    let recipients: anyhow::Result<Vec<_>> = payment
        .recipients
        .iter()
        .map(|p| RecipientMemo::from_recipient(&from, p))
        .collect();
    let tx = warp_api_ffi::api::payment_v2::build_tx_plan(
        c.coin,
        c.id_account,
        latest,
        &recipients?,
        0,
        payment.confirmations,
    )
    .await?;
    Ok(Json(tx))
}

#[post("/sign_offline_tx", data = "<tx>")]
pub async fn sign_offline_tx(
    tx: Json<TransactionPlan>,
    config: &State<Config>,
) -> Result<String, Error> {
    let c = CoinConfig::get_active();
    if !config.allow_send {
        Err(anyhow!("Payment API not enabled").into())
    } else {
        let tx_hex = warp_api_ffi::api::payment_v2::sign_plan(c.coin, c.id_account, &tx)?;
        Ok(hex::encode(tx_hex))
    }
}

#[post("/pay", data = "<payment>")]
pub async fn pay(payment: Json<Payment>, config: &State<Config>) -> Result<String, Error> {
    if !config.allow_send {
        Err(anyhow!("Payment API not enabled").into())
    } else {
        let c = CoinConfig::get_active();
        let latest = warp_api_ffi::api::sync::get_latest_height().await?;
        let from = {
            let db = c.db()?;
            let AccountData { address, .. } = db.get_account_info(c.id_account)?;
            address
        };
        let recipients: anyhow::Result<Vec<_>> = payment
            .recipients
            .iter()
            .map(|p| RecipientMemo::from_recipient(&from, p))
            .collect();
        let tx_plan = warp_api_ffi::api::payment_v2::build_tx_plan(
            c.coin,
            c.id_account,
            latest,
            &recipients?,
            0,
            payment.confirmations,
        )
        .await?;
        let txid =
            warp_api_ffi::api::payment_v2::sign_and_broadcast(c.coin, c.id_account, &tx_plan)
                .await?;
        Ok(txid)
    }
}

#[post("/broadcast_tx?<tx_hex>")]
pub async fn broadcast_tx(tx_hex: String) -> Result<String, Error> {
    let tx = hex::decode(tx_hex.trim_end()).map_err(|e| anyhow!(e.to_string()))?;
    let tx_id = warp_api_ffi::api::payment_v2::broadcast_tx(&tx).await?;
    Ok(tx_id)
}

#[post("/get_tx_plan?<confirmations>", data = "<recipients>")]
pub async fn get_tx_plan(
    confirmations: u32,
    recipients: Json<Vec<RecipientShort>>,
) -> Result<Json<TransactionPlan>, Error> {
    let c = CoinConfig::get_active();
    let coin = c.coin;
    let account = c.id_account;
    let last_height = warp_api_ffi::api::sync::get_latest_height().await?;
    let recipients: Vec<_> = recipients
        .iter()
        .map(|r| RecipientMemo::from(r.clone()))
        .collect();

    let plan = warp_api_ffi::api::payment_v2::build_tx_plan(
        coin,
        account,
        last_height,
        &recipients,
        0,
        confirmations,
    )
    .await?;
    Ok(Json(plan))
}

#[post("/build_from_plan", data = "<tx_plan>")]
pub async fn build_from_plan(tx_plan: Json<TransactionPlan>) -> Result<String, Error> {
    let c = CoinConfig::get_active();
    let fvk = {
        let db = c.db()?;
        let AccountData { fvk, .. } = db.get_account_info(c.id_account)?;
        fvk
    };

    if fvk != tx_plan.fvk {
        return Err(Error::Other(anyhow::anyhow!(
            "Account does not match transaction"
        )));
    }

    let keys = get_secret_keys(c.coin, c.id_account)?;
    let tx = build_tx(c.chain.network(), &keys, &tx_plan, OsRng).unwrap();
    let tx = hex::encode(&tx);
    Ok(tx)
}

#[get("/new_diversified_address?<ua_type>&<time>")]
pub fn new_diversified_address(ua_type: u8, time: u32) -> Result<String, Error> {
    let address = warp_api_ffi::api::account::get_diversified_address(ua_type, time)?;
    Ok(address)
}

#[post("/make_payment_uri", data = "<payment>")]
pub fn make_payment_uri(payment: Json<PaymentURI>) -> Result<String, Error> {
    let c = CoinConfig::get_active();
    let uri = warp_api_ffi::api::payment_uri::make_payment_uri(
        c.coin,
        &payment.address,
        payment.amount,
        &payment.memo,
    )?;
    Ok(uri)
}

#[get("/parse_payment_uri?<uri>")]
pub fn parse_payment_uri(uri: String) -> Result<Json<PaymentURI>, Error> {
    let payment = warp_api_ffi::api::payment_uri::parse_payment_uri(&uri)?;
    Ok(Json(payment))
}

#[get("/split?<id>&<data>")]
pub fn split_data(id: u32, data: String) -> Result<Json<RaptorQDrops>, Error> {
    let result = warp_api_ffi::FountainCodes::encode_into_drops(id, &hex::decode(data).unwrap())?;
    Ok(Json(result))
}

#[post("/merge?<data>")]
pub fn merge_data(data: String) -> Result<String, Error> {
    let result = warp_api_ffi::RaptorQDrops::put_drop(&data)?
        .map(|data| hex::encode(&data))
        .unwrap_or(String::new());
    Ok(result)
}

#[post("/zip32?<account>&<external>&<address>")]
pub fn derive_keys(
    account: u32,
    external: u32,
    address: Option<u32>,
) -> Result<Json<KeyPack>, Error> {
    let active = CoinConfig::get_active();
    let result = warp_api_ffi::api::account::derive_keys(
        active.coin,
        active.id_account,
        account,
        external,
        address,
    )?;
    Ok(Json(result))
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Config {
    allow_backup: bool,
    allow_send: bool,
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct AccountSeed {
    coin: u8,
    name: String,
    key: Option<String>,
    index: Option<u32>,
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Heights {
    latest: u32,
    synced: u32,
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Backup {
    seed: Option<String>,
    sk: Option<String>,
    fvk: String,
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Payment {
    recipients: Vec<Recipient>,
    confirmations: u32,
}
