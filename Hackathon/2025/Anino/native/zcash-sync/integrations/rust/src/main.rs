use warp_api_ffi::api::account::{get_backup, new_account};
use warp_api_ffi::api::sync::coin_sync;
use warp_api_ffi::{CoinConfig, init_coin, set_coin_lwd_url};
use lazy_static::lazy_static;
use std::sync::Mutex;

lazy_static! {
    static ref CANCEL: Mutex<bool> = Mutex::new(false);
}

const FVK: &str = "zxviews1q0duytgcqqqqpqre26wkl45gvwwwd706xw608hucmvfalr759ejwf7qshjf5r9aa7323zulvz6plhttp5mltqcgs9t039cx2d09mgq05ts63n8u35hyv6h9nc9ctqqtue2u7cer2mqegunuulq2luhq3ywjcz35yyljewa4mgkgjzyfwh6fr6jd0dzd44ghk0nxdv2hnv4j5nxfwv24rwdmgllhe0p8568sgqt9ckt02v2kxf5ahtql6s0ltjpkckw8gtymxtxuu9gcr0swvz";

#[tokio::main]
async fn main() {
    env_logger::init();

    // Initialize the library for Zcash (coin = 0)
    init_coin(0, "./zec.db").unwrap();
    set_coin_lwd_url(0, "https://mainnet.lightwalletd.com:9067");

    // Create a new account with the ZEC pages viewing key
    let id_account = new_account(0, "test_account", Some(FVK.to_string()),
                                 None).unwrap();

    // Synchronize
    coin_sync(0 /* zcash */,
              true /* retrieve tx details */,
              0 /* sync to tip */,
              100 /* spam filter threshold */, |p| {
            log::info!("Progress: {}", p.height);
        }, &CANCEL).await.unwrap();

    // Grab the database accessor
    let cc = &CoinConfig::get(0 /* zcash */);
    let db = cc.db.as_ref().unwrap().clone();
    let db = db.lock().unwrap();

    // Query the account balance
    let balance = db.get_balance(id_account).unwrap();

    println!("Balance = {}", balance)
}