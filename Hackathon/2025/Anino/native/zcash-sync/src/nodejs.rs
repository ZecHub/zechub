#![allow(non_snake_case)]
use lazy_static::lazy_static;
use node_bindgen::derive::node_bindgen;
use std::sync::atomic::AtomicBool;

#[node_bindgen]
fn initCoin(coin: u32, db_path: String, lwd_url: String) {
    let coin = coin as u8;
    log::info!("Init coin");
    crate::init_coin(coin, &db_path).unwrap();
    crate::set_coin_lwd_url(coin, &lwd_url);
}

#[node_bindgen]
fn newAccount(coin: u32, name: String) {
    crate::api::account::new_account(coin as u8, &name, None, None).unwrap();
}

lazy_static! {
    static ref SYNC_CANCELED: AtomicBool = AtomicBool::new(false);
}

// Does not support tokio async executor atm
#[tokio::main]
#[node_bindgen]
async fn warp(coin: u32) {
    crate::api::sync::coin_sync(coin as u8, true, 0, move |height| {}, &SYNC_CANCELED)
        .await
        .unwrap();
}
