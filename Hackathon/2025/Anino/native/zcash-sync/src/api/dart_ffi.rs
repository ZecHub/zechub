use crate::api::sync::SYNC_CANCEL;
use crate::coinconfig::{self, init_coin, CoinConfig, MEMPOOL, MEMPOOL_RUNNER};
use crate::db::data_generated::fb::*;
use crate::db::FullEncryptedBackup;
#[cfg(feature = "ledger2")]
use crate::ledger2;
use crate::note_selection::TransactionReport;
use crate::Connection;
use crate::{ChainError, TransactionPlan, Tx};
use allo_isolate::{ffi, IntoDart};
use android_logger::Config;
use flatbuffers::FlatBufferBuilder;
use lazy_static::lazy_static;
use log::Level;
use std::ffi::{CStr, CString};
use std::os::raw::c_char;
use std::path::Path;
use std::sync::Arc;
use tokio::sync::Semaphore;
use tokio_util::sync::CancellationToken;
use zcash_primitives::transaction::builder::Progress;

static mut POST_COBJ: Option<ffi::DartPostCObjectFnType> = None;

const MAX_COINS: u8 = 2;

fn with_coin<T, F: Fn(&Connection) -> anyhow::Result<T>>(coin: u8, f: F) -> anyhow::Result<T> {
    let c = CoinConfig::get(coin);
    let connection = c.connection();
    f(&connection)
}

#[no_mangle]
pub unsafe extern "C" fn dummy_export() {}

#[no_mangle]
pub unsafe extern "C" fn dart_post_cobject(ptr: ffi::DartPostCObjectFnType) {
    POST_COBJ = Some(ptr);
}

macro_rules! from_c_str {
    ($v: ident) => {
        let $v = CStr::from_ptr($v).to_string_lossy();
    };
}

fn to_c_str(s: String) -> *mut c_char {
    CString::new(s).unwrap().into_raw()
}

fn to_cresult<T>(res: Result<T, anyhow::Error>) -> CResult<T> {
    let res = res.map_err(|e| e.to_string());
    match res {
        Ok(v) => CResult {
            value: v,
            len: 0,
            error: std::ptr::null_mut::<c_char>(),
        },
        Err(e) => {
            log::error!("{}", e);
            CResult {
                value: unsafe { std::mem::zeroed() },
                len: 0,
                error: to_c_str(e),
            }
        }
    }
}

fn to_cresult_str(res: Result<String, anyhow::Error>) -> CResult<*mut c_char> {
    let res = res.map(to_c_str);
    to_cresult(res)
}

macro_rules! fb_to_bytes {
    ($v: ident) => {{
        let mut builder = FlatBufferBuilder::new();
        let backup_bytes = $v.pack(&mut builder);
        builder.finish(backup_bytes, None);
        Ok::<_, anyhow::Error>(builder.finished_data().to_vec())
    }};
}

fn log_error(res: Result<(), anyhow::Error>) {
    if let Err(e) = res {
        log::error!("{}", e.to_string());
    }
}

fn to_cresult_bytes(res: Result<Vec<u8>, anyhow::Error>) -> CResult<*const u8> {
    match res {
        Ok(v) => {
            let ptr = v.as_ptr();
            let len = v.len();
            std::mem::forget(v);
            CResult {
                value: ptr,
                len: len as u32,
                error: std::ptr::null_mut::<c_char>(),
            }
        }
        Err(e) => {
            log::error!("{}", e);
            CResult {
                value: unsafe { std::mem::zeroed() },
                len: 0,
                error: to_c_str(e.to_string()),
            }
        }
    }
}

#[no_mangle]
pub unsafe extern "C" fn deallocate_str(s: *mut c_char) {
    let _ = CString::from_raw(s);
}

#[no_mangle]
pub unsafe extern "C" fn deallocate_bytes(ptr: *mut u8, len: u32) {
    drop(Vec::from_raw_parts(ptr, len as usize, len as usize));
}

fn try_init_logger() {
    android_logger::init_once(
        Config::default()
            // .format(|buf, record| {
            //     writeln!(
            //         buf,
            //         "{:?}-{:?}: {}",
            //         record.file(),
            //         record.line(),
            //         record.args()
            //     )
            // })
            .with_min_level(Level::Info),
    );
    let _ = env_logger::try_init();
}

#[repr(C)]
pub struct CResult<T> {
    value: T,
    error: *mut c_char,
    pub len: u32,
}

#[no_mangle]
pub unsafe extern "C" fn init_prover(
    spend_bytes: *mut u8,
    spend_len: u64,
    output_bytes: *mut u8,
    output_len: u64,
) -> CResult<u8> {
    let spend_bytes: Vec<u8> =
        Vec::from_raw_parts(spend_bytes, spend_len as usize, spend_len as usize);
    let output_bytes: Vec<u8> =
        Vec::from_raw_parts(output_bytes, output_len as usize, output_len as usize);

    let res = || {
        coinconfig::init_prover(&spend_bytes, &output_bytes);
        Ok::<_, anyhow::Error>(0)
    };
    to_cresult(res())
}

#[no_mangle]
pub unsafe extern "C" fn init_wallet(coin: u8, db_path: *mut c_char) -> CResult<u8> {
    try_init_logger();
    from_c_str!(db_path);
    to_cresult(init_coin(coin, &db_path).and_then(|()| Ok(0u8)))
}

#[no_mangle]
pub unsafe extern "C" fn migrate_db(coin: u8, db_path: *mut c_char) -> CResult<u8> {
    try_init_logger();
    from_c_str!(db_path);
    to_cresult(crate::coinconfig::migrate_db(coin, &db_path).and_then(|()| Ok(0u8)))
}

#[no_mangle]
#[tokio::main]
pub async unsafe extern "C" fn migrate_data_db(coin: u8) -> CResult<u8> {
    try_init_logger();
    to_cresult(
        crate::coinconfig::migrate_data(coin)
            .await
            .and_then(|()| Ok(0u8)),
    )
}

#[no_mangle]
pub unsafe extern "C" fn set_coin_lwd_url(coin: u8, lwd_url: *mut c_char) {
    from_c_str!(lwd_url);
    crate::coinconfig::set_coin_lwd_url(coin, &lwd_url);
}

#[no_mangle]
pub unsafe extern "C" fn get_lwd_url(coin: u8) -> *mut c_char {
    let server = crate::coinconfig::get_coin_lwd_url(coin);
    to_c_str(server)
}

#[no_mangle]
pub unsafe extern "C" fn set_coin_passwd(coin: u8, passwd: *mut c_char) {
    from_c_str!(passwd);
    crate::coinconfig::set_coin_passwd(coin, &passwd);
}

#[no_mangle]
#[tokio::main]
pub async unsafe extern "C" fn mempool_run(port: i64) {
    try_init_logger();
    let mut mempool_runner = MEMPOOL_RUNNER.lock();
    let mempool = mempool_runner
        .run(move |balance: i64| {
            let mut balance = balance.into_dart();
            if port != 0 {
                if let Some(p) = POST_COBJ {
                    p(port, &mut balance);
                }
            }
        })
        .await;
    let _ = MEMPOOL.fill(mempool);
    log::info!("end mempool_start");
}

#[no_mangle]
pub unsafe extern "C" fn mempool_set_active(coin: u8, id_account: u32) {
    let mempool = MEMPOOL.borrow().unwrap();
    mempool.set_active(coin, id_account);
}

#[no_mangle]
pub unsafe extern "C" fn new_account(
    coin: u8,
    name: *mut c_char,
    data: *mut c_char,
    index: i32,
) -> CResult<u32> {
    from_c_str!(name);
    from_c_str!(data);
    let data = if !data.is_empty() {
        Some(data.to_string())
    } else {
        None
    };
    let index = if index >= 0 { Some(index as u32) } else { None };
    let res = crate::api::account::new_account(coin, &name, data, index);
    to_cresult(res)
}

// #[no_mangle]
// pub unsafe extern "C" fn new_sub_account(name: *mut c_char, index: i32, count: u32) {
//     from_c_str!(name);
//     let index = if index >= 0 { Some(index as u32) } else { None };
//     let res = crate::api::account::new_sub_account(&name, index, count);
//     log_error(res)
// }

#[no_mangle]
pub unsafe extern "C" fn convert_to_watchonly(coin: u8, id_account: u32) -> CResult<u8> {
    let res = crate::api::account::convert_to_watchonly(coin, id_account);
    to_cresult(res.and_then(|()| Ok(0u8)))
}

#[no_mangle]
pub unsafe extern "C" fn get_backup(coin: u8, id_account: u32) -> CResult<*const u8> {
    let res = || {
        let backup = crate::api::account::get_backup_package(coin, id_account)?;
        let r = fb_to_bytes!(backup);
        r
    };

    to_cresult_bytes(res())
}

#[no_mangle]
pub unsafe extern "C" fn set_backup_reminder(coin: u8, id_account: u32, v: bool) -> CResult<u8> {
    let res = || {
        crate::api::account::set_backup_reminder(coin, id_account, v)?;
        Ok(0)
    };

    to_cresult(res())
}

#[no_mangle]
pub unsafe extern "C" fn get_available_addrs(coin: u8, account: u32) -> CResult<u8> {
    let res = |connection: &Connection| {
        let res = crate::db::read::get_available_addrs(connection, account)?;
        Ok(res)
    };
    to_cresult(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_address(
    coin: u8,
    id_account: u32,
    ua_type: u8,
) -> CResult<*mut c_char> {
    let address = crate::api::account::get_address(coin, id_account, ua_type);
    to_cresult_str(address)
}

#[no_mangle]
pub unsafe extern "C" fn import_transparent_key(coin: u8, id_account: u32, path: *mut c_char) {
    from_c_str!(path);
    let res = crate::api::account::import_transparent_key(coin, id_account, &path);
    log_error(res)
}

#[no_mangle]
pub unsafe extern "C" fn import_transparent_secret_key(
    coin: u8,
    id_account: u32,
    secret_key: *mut c_char,
) {
    from_c_str!(secret_key);
    let res = crate::api::account::import_transparent_secret_key(coin, id_account, &secret_key);
    log_error(res)
}

lazy_static! {
    static ref SYNC_LOCK: Arc<Semaphore> = Arc::new(Semaphore::new(1));
}

#[no_mangle]
pub unsafe extern "C" fn cancel_warp() {
    if let Some(token) = SYNC_CANCEL.lock().as_ref() {
        log::info!("Sync cancelling");
        token.cancel();
    }
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn warp(
    coin: u8,
    account: u32,
    get_tx: bool,
    anchor_offset: u32,
    max_cost: u32,
    port: i64,
) -> CResult<u8> {
    let res = async {
        let permit = SYNC_LOCK.acquire().await;
        if !permit.is_ok() {
            return Ok(2);
        }
        *SYNC_CANCEL.lock() = Some(CancellationToken::new());
        log::info!("Sync started");
        let result = crate::api::sync::coin_sync(
            coin,
            account,
            get_tx,
            anchor_offset,
            max_cost,
            move |progress| {
                let progress = ProgressT {
                    height: progress.height,
                    timestamp: progress.timestamp,
                    trial_decryptions: progress.trial_decryptions,
                    downloaded: progress.downloaded as u64,
                    balances: Some(Box::new(progress.balances)),
                };
                let v = fb_to_bytes!(progress);
                let mut progress = v.into_dart();
                if port != 0 {
                    if let Some(p) = POST_COBJ {
                        p(port, &mut progress);
                    }
                }
            },
        )
        .await;
        log::info!("Sync finished");
        drop(permit);

        match result {
            Ok(_) => Ok(0),
            Err(err) => {
                if let Some(e) = err.downcast_ref::<ChainError>() {
                    match e {
                        ChainError::Reorg => Ok(1),
                        ChainError::Busy => Ok(2),
                    }
                } else {
                    log::error!("{}", err);
                    Err(err)
                }
            }
        }
    };
    let r = res.await;
    *SYNC_CANCEL.lock() = None;
    to_cresult(r)
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn transparent_sync(
    coin: u8,
    account: u32,
    height: u32,
) -> CResult<bool> {
    let res = async {
        let c = CoinConfig::get(coin);
        let connection = c.connection();
        let mut client = c.connect_lwd().await?;
        let is_updated = crate::taddr::transparent_sync(
            c.chain.network(),
            connection,
            &mut client,
            account,
            height,
        )
        .await?;
        Ok::<_, anyhow::Error>(is_updated)
    };
    to_cresult(res.await)
}

#[no_mangle]
pub unsafe extern "C" fn is_valid_seed(coin: u8, seed: *mut c_char) -> bool {
    from_c_str!(seed);
    crate::key2::is_valid_seed(coin, &seed)
}

#[no_mangle]
pub unsafe extern "C" fn is_valid_key(coin: u8, key: *mut c_char) -> i8 {
    from_c_str!(key);
    crate::key2::is_valid_key(coin, &key)
}

#[no_mangle]
pub unsafe extern "C" fn valid_address(coin: u8, address: *mut c_char) -> bool {
    from_c_str!(address);
    crate::key2::decode_address(coin, &address).is_some()
}

#[no_mangle]
pub unsafe extern "C" fn receivers_of_address(coin: u8, address: *mut c_char) -> u8 {
    use zcash_client_backend::address::RecipientAddress;
    from_c_str!(address);
    match crate::key2::decode_address(coin, &address) {
        None => 0,
        Some(RecipientAddress::Transparent(_)) => 1,
        Some(RecipientAddress::Shielded(_)) => 2,
        Some(RecipientAddress::Unified(ua)) => {
            let t = if ua.transparent().is_some() { 1 } else { 0 };
            let s = if ua.sapling().is_some() { 2 } else { 0 };
            let o = if ua.orchard().is_some() { 4 } else { 0 };
            t + s + o
        }
    }
}

#[no_mangle]
pub unsafe extern "C" fn get_diversified_address(
    coin: u8,
    account: u32,
    ua_type: u8,
    time: u32,
) -> CResult<*mut c_char> {
    let res = || crate::api::account::get_diversified_address(coin, account, ua_type, time);
    to_cresult_str(res())
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn get_latest_height(coin: u8) -> CResult<u32> {
    let height = crate::api::sync::get_latest_height(coin).await;
    to_cresult(height)
}

#[cfg(feature = "ledger2")]
#[no_mangle]
pub unsafe extern "C" fn ledger_build_keys() -> CResult<u8> {
    use crate::ledger2::{build_keys, LedgerClient};

    let res = || {
        let client = ledger2::LedgerClient::new()?;
        ledger2::build_keys(&client)?;
        Ok(0u8)
    };
    to_cresult(res())
}

#[cfg(feature = "ledger2")]
#[no_mangle]
pub unsafe extern "C" fn ledger_get_fvk(coin: u8) -> CResult<*mut c_char> {
    let res = || {
        let c = CoinConfig::get(coin);
        let client = ledger2::LedgerClient::new()?;
        let fvk = ledger2::get_fvk(c.chain.network(), &client)?;
        Ok(fvk)
    };
    to_cresult_str(res())
}

#[cfg(feature = "ledger2")]
#[no_mangle]
pub unsafe extern "C" fn ledger_get_address() -> CResult<*mut c_char> {
    let res = || {
        let client = ledger2::LedgerClient::new()?;
        let address = ledger2::get_address(&client)?;
        Ok(address)
    };
    to_cresult_str(res())
}

#[no_mangle]
pub unsafe extern "C" fn convert_t2_address(
    coin: u8,
    address: *mut c_char,
    prefix: *mut c_char,
    from: bool,
) -> CResult<*mut c_char> {
    from_c_str!(address);
    from_c_str!(prefix);
    let res = move || {
        let c = CoinConfig::get(coin);
        let network = c.chain.network();
        let result = crate::key2::convert_t2_address(&network, &address, &prefix, from)?;
        Ok(result)
    };
    to_cresult_str(res())
}

#[allow(dead_code)]
fn report_progress(progress: Progress, port: i64) {
    if port != 0 {
        let progress = match progress.end() {
            Some(end) => (progress.cur() * 100 / end) as i32,
            None => -(progress.cur() as i32),
        };
        let mut progress = progress.into_dart();
        unsafe {
            if let Some(p) = POST_COBJ {
                p(port, &mut progress);
            }
        }
    }
}

// #[tokio::main]
// #[no_mangle]
// pub async unsafe extern "C" fn send_multi_payment(
//     coin: u8,
//     account: u32,
//     recipients_json: *mut c_char,
//     anchor_offset: u32,
//     port: i64,
// ) -> CResult<*mut c_char> {
//     from_c_str!(recipients_json);
//     let res = async move {
//         let height = crate::api::sync::get_latest_height().await?;
//         let recipients = crate::api::recipient::parse_recipients(&recipients_json)?;
//         let res = crate::api::payment_v2::build_sign_send_multi_payment(
//             coin,
//             account,
//             height,
//             &recipients,
//             anchor_offset,
//             Box::new(move |progress| {
//                 report_progress(progress, port);
//             }),
//         )
//         .await?;
//         Ok(res)
//     };
//     to_cresult_str(res.await)
// }

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn skip_to_last_height(coin: u8) {
    let res = crate::api::sync::skip_to_last_height(coin).await;
    log_error(res)
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn rewind_to(coin: u8, height: u32) -> CResult<u32> {
    let res = crate::api::sync::rewind_to(coin, height).await;
    to_cresult(res)
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn rescan_from(coin: u8, height: u32) -> CResult<u32> {
    let res = crate::api::sync::rescan_from(coin, height).await;
    to_cresult(res)
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn get_taddr_balance(coin: u8, id_account: u32) -> CResult<u64> {
    to_cresult(crate::api::account::get_taddr_balance(coin, id_account).await)
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn transfer_pools(
    coin: u8,
    account: u32,
    from_pool: u8,
    to_pool: u8,
    amount: u64,
    fee_included: bool,
    memo: *mut c_char,
    split_amount: u64,
    confirmations: u32,
    fee_bytes: *mut u8,
    fee_len: u64,
) -> CResult<*mut c_char> {
    from_c_str!(memo);
    let res = async move {
        let tx_plan = crate::api::payment_v2::transfer_pools(
            coin,
            account,
            from_pool,
            to_pool,
            amount,
            fee_included,
            &memo,
            split_amount,
            confirmations,
            &unpack_fee(fee_bytes, fee_len),
        )
        .await?;
        let tx_plan = serde_json::to_string(&tx_plan)?;
        Ok::<_, anyhow::Error>(tx_plan)
    };
    to_cresult_str(res.await)
}

// #[tokio::main]
// #[no_mangle]
// pub async unsafe extern "C" fn shield_taddr(
//     coin: u8,
//     account: u32,
//     amount: u64,
//     confirmations: u32,
//     fee_bytes: *mut u8,
//     fee_len: u64,
// ) -> CResult<*mut c_char> {
//     let res = async move {
//         let fee = unpack_fee(fee_bytes, fee_len);
//         let tx_plan =
//             crate::api::payment_v2::shield_taddr(coin, account, amount, confirmations, &fee)
//                 .await?;
//         let tx_plan_json = serde_json::to_string(&tx_plan)?;
//         Ok(tx_plan_json)
//     };
//     to_cresult_str(res.await)
// }

// #[tokio::main]
// #[no_mangle]
// pub async unsafe extern "C" fn scan_transparent_accounts(
//     coin: u8,
//     account: u32,
//     gap_limit: u32,
// ) -> CResult<*const u8> {
//     let res = async {
//         let addresses =
//             crate::api::account::scan_transparent_accounts(coin, account, gap_limit as usize)
//                 .await?;
//         let mut builder = FlatBufferBuilder::new();
//         let root = addresses.pack(&mut builder);
//         builder.finish(root, None);
//         Ok(builder.finished_data().to_vec())
//     };
//     to_cresult_bytes(res.await)
// }

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn prepare_multi_payment(
    coin: u8,
    account: u32,
    recipients_bytes: *mut u8,
    recipients_len: u64,
    pools: u8,
    sender_ua: u8,
    anchor_offset: u32,
    fee_bytes: *mut u8,
    fee_len: u64,
) -> CResult<*mut c_char> {
    let res = async {
        let c = CoinConfig::get(coin);
        let network = c.chain.network();
        let last_height = crate::api::sync::get_latest_height(coin).await?;
        let recipients_bytes: Vec<u8> = Vec::from_raw_parts(
            recipients_bytes,
            recipients_len as usize,
            recipients_len as usize,
        );
        let recipients = flatbuffers::root::<Recipients>(&recipients_bytes)?;

        let sender_address = {
            let c = CoinConfig::get(coin);
            let connection = c.connection();
            crate::get_ua_of(&c.chain.network(), &connection, account, sender_ua)?
        };
        let recipients =
            crate::api::recipient::parse_recipients(&network, &sender_address, &recipients)?;

        let tx = crate::api::payment_v2::build_tx_plan(
            coin,
            account,
            last_height,
            &recipients,
            !pools & 0x07,
            anchor_offset,
            &unpack_fee(fee_bytes, fee_len),
        )
        .await?;
        let tx_str = serde_json::to_string(&tx)?;
        Ok(tx_str)
    };
    to_cresult_str(res.await)
}

#[no_mangle]
pub unsafe extern "C" fn transaction_report(coin: u8, plan: *mut c_char) -> CResult<*const u8> {
    from_c_str!(plan);
    let c = CoinConfig::get(coin);
    let res = || {
        let plan: TransactionPlan = serde_json::from_str(&plan)?;
        let report = TransactionReport::from_plan(c.chain.network(), plan);
        fb_to_bytes!(report)
    };
    to_cresult_bytes(res())
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn sign(
    coin: u8,
    account: u32,
    tx_plan: *mut c_char,
    _port: i64,
) -> CResult<*mut c_char> {
    from_c_str!(tx_plan);
    let res = async {
        let tx_plan: TransactionPlan = serde_json::from_str(&tx_plan)?;
        let raw_tx = crate::api::payment_v2::sign_plan(coin, account, &tx_plan)?;
        let tx_str = base64::encode(&raw_tx);
        Ok::<_, anyhow::Error>(tx_str)
    };
    let res = res.await;
    to_cresult_str(res)
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn sign_and_broadcast(
    coin: u8,
    account: u32,
    tx_plan: *mut c_char,
) -> CResult<*mut c_char> {
    from_c_str!(tx_plan);
    let res = async {
        let tx_plan: TransactionPlan = serde_json::from_str(&tx_plan)?;
        let txid = crate::api::payment_v2::sign_and_broadcast(coin, account, &tx_plan).await?;
        Ok::<_, anyhow::Error>(txid)
    };
    let res = res.await;
    to_cresult_str(res)
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn broadcast_tx(coin: u8, tx_str: *mut c_char) -> CResult<*mut c_char> {
    from_c_str!(tx_str);
    let res = async {
        let tx = base64::decode(&*tx_str)?;
        crate::broadcast_tx(coin, &tx).await
    };
    to_cresult_str(res.await)
}

#[no_mangle]
pub unsafe extern "C" fn is_valid_tkey(sk: *mut c_char) -> bool {
    from_c_str!(sk);
    crate::taddr::parse_seckey(&sk).is_ok()
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn sweep_tkey(
    coin: u8,
    account: u32,
    last_height: u32,
    sk: *mut c_char,
    pool: u8,
    address: *mut c_char,
    fee_bytes: *mut u8,
    fee_len: u64,
) -> CResult<*mut c_char> {
    let res = async {
        from_c_str!(sk);
        from_c_str!(address);
        let fee = unpack_fee(fee_bytes, fee_len);
        let tx_plan =
            crate::taddr::sweep_tkey(coin, account, last_height, &sk, pool, &address, &fee).await?;
        let res = serde_json::to_string(&tx_plan)?;
        Ok::<_, anyhow::Error>(res)
    };
    to_cresult_str(res.await)
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn sweep_tseed(
    coin: u8,
    account: u32,
    last_height: u32,
    seed: *mut c_char,
    pool: u8,
    address: *mut c_char,
    index: u32,
    limit: u32,
    fee_bytes: *mut u8,
    fee_len: u64,
) -> CResult<*mut c_char> {
    let res = async {
        from_c_str!(seed);
        from_c_str!(address);
        let fee = unpack_fee(fee_bytes, fee_len);
        let tx_plan = crate::taddr::sweep_tseed(
            coin,
            account,
            last_height,
            &seed,
            pool,
            &address,
            index,
            limit,
            &fee,
        )
        .await?;
        let res = serde_json::to_string(&tx_plan)?;
        Ok::<_, anyhow::Error>(res)
    };
    to_cresult_str(res.await)
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn get_activation_date() -> CResult<u32> {
    let res = crate::api::sync::get_activation_date().await;
    to_cresult(res)
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn get_block_by_time(coin: u8, time: u32) -> CResult<u32> {
    let res = crate::api::sync::get_block_by_time(coin, time).await;
    to_cresult(res)
}

#[no_mangle]
pub unsafe extern "C" fn store_contact(
    coin: u8,
    id: u32,
    name: *mut c_char,
    address: *mut c_char,
    dirty: bool,
) {
    from_c_str!(name);
    from_c_str!(address);
    let res = crate::api::contact::store_contact(coin, id, &name, &address, dirty);
    log_error(res)
}

#[tokio::main]
#[no_mangle]
pub async unsafe extern "C" fn commit_unsaved_contacts(
    coin: u8,
    account: u32,
    pools: u8,
    anchor_offset: u32,
    fee_bytes: *mut u8,
    fee_len: u64,
) -> CResult<*mut c_char> {
    let res = async move {
        let fee = unpack_fee(fee_bytes, fee_len);
        let tx_plan =
            crate::api::contact::commit_unsaved_contacts(coin, account, pools, anchor_offset, &fee)
                .await?;
        let tx_plan_json = serde_json::to_string(&tx_plan)?;
        Ok(tx_plan_json)
    };
    to_cresult_str(res.await)
}

#[no_mangle]
pub unsafe extern "C" fn mark_message_read(coin: u8, message: u32, read: bool) {
    let res = crate::api::message::mark_message_read(coin, message, read);
    log_error(res)
}

#[no_mangle]
pub unsafe extern "C" fn mark_all_messages_read(coin: u8, account: u32, read: bool) {
    let res = crate::api::message::mark_all_messages_read(coin, account, read);
    log_error(res)
}

#[no_mangle]
pub unsafe extern "C" fn truncate_data() {
    let res = crate::api::account::truncate_data();
    log_error(res)
}

#[no_mangle]
pub unsafe extern "C" fn truncate_sync_data() {
    let res = crate::api::account::truncate_sync_data();
    log_error(res)
}

#[no_mangle]
pub unsafe extern "C" fn check_account(coin: u8, account: u32) -> bool {
    crate::api::account::check_account(coin, account)
}

#[no_mangle]
pub unsafe extern "C" fn delete_account(coin: u8, account: u32) {
    let res = crate::api::account::delete_account(coin, account);
    log_error(res)
}

#[no_mangle]
pub unsafe extern "C" fn make_payment_uri(
    coin: u8,
    address: *mut c_char,
    amount: u64,
    memo: *mut c_char,
) -> CResult<*mut c_char> {
    from_c_str!(memo);
    from_c_str!(address);
    let res = crate::api::payment_uri::make_payment_uri(coin, &address, amount, &memo);
    to_cresult_str(res)
}

#[no_mangle]
pub unsafe extern "C" fn decode_payment_uri(coin: u8, uri: *mut c_char) -> CResult<*const u8> {
    from_c_str!(uri);
    let payment_bytes = || {
        let payment = crate::api::payment_uri::parse_payment_uri(coin, &uri)?;
        let payment = PaymentURIT {
            address: Some(payment.address),
            amount: payment.amount,
            memo: Some(payment.memo),
        };
        fb_to_bytes!(payment)
    };
    to_cresult_bytes(payment_bytes())
}

#[no_mangle]
pub unsafe extern "C" fn generate_key() -> CResult<*const u8> {
    let res = || {
        let secret_key = FullEncryptedBackup::generate_key()?;
        fb_to_bytes!(secret_key)
    };
    to_cresult_bytes(res())
}

#[no_mangle]
pub unsafe extern "C" fn zip_backup(
    key: *mut c_char,
    path: *mut c_char,
    temp_dir: *mut c_char,
) -> CResult<u8> {
    from_c_str!(key);
    from_c_str!(path);
    from_c_str!(temp_dir);
    let res = || {
        let mut backup = FullEncryptedBackup::new(&path, &temp_dir);
        for coin in 0..MAX_COINS {
            let c = CoinConfig::get(coin);
            let connection = c.connection();
            let db_path = Path::new(c.db_path.as_ref().unwrap());
            let db_name = db_path.file_name().unwrap().to_string_lossy();
            backup.add(&connection, &db_name)?;
        }
        backup.close(&key)?;
        Ok(0)
    };
    to_cresult(res())
}

#[no_mangle]
pub unsafe extern "C" fn decrypt_backup(
    key: *mut c_char,
    path: *mut c_char,
    temp_dir: *mut c_char,
) -> CResult<*mut c_char> {
    from_c_str!(key);
    from_c_str!(path);
    from_c_str!(temp_dir);
    let res = || {
        let zip_file = FullEncryptedBackup::decrypt(&key, &path, &temp_dir)?;
        Ok(zip_file)
    };
    to_cresult_str(res())
}

#[no_mangle]
pub unsafe extern "C" fn unzip_backup(path: *mut c_char, db_dir: *mut c_char) -> CResult<u8> {
    from_c_str!(path);
    from_c_str!(db_dir);
    let res = || {
        FullEncryptedBackup::unzip(&path, &db_dir)?;
        Ok(0)
    };
    to_cresult(res())
}

#[no_mangle]
pub unsafe extern "C" fn zip_dbs(
    passwd: *mut c_char,
    temp_dir: *mut c_char,
) -> CResult<*mut c_char> {
    from_c_str!(passwd);
    from_c_str!(temp_dir);
    let res = || crate::zip_dbs(&passwd, &temp_dir);
    to_cresult_str(res())
}

#[no_mangle]
pub unsafe extern "C" fn split_data(id: u32, data: *mut c_char) -> CResult<*const u8> {
    from_c_str!(data);
    let res = || {
        let res = crate::fountain::FountainCodes::encode_into_drops(id, &base64::decode(&*data)?)?;
        fb_to_bytes!(res)
    };
    to_cresult_bytes(res())
}

#[no_mangle]
pub unsafe extern "C" fn merge_data(drop: *mut c_char) -> CResult<*const u8> {
    from_c_str!(drop);
    let res = || {
        let res = crate::fountain::RaptorQDrops::put_drop(&*drop)?;
        log::info!("> {} {}", res.progress, res.total);
        fb_to_bytes!(res)
    };
    to_cresult_bytes(res())
}

#[no_mangle]
pub unsafe extern "C" fn get_tx_summary(tx: *mut c_char) -> CResult<*mut c_char> {
    from_c_str!(tx);
    let res = || {
        let tx: Tx = serde_json::from_str(&tx)?;
        let summary = crate::pay::get_tx_summary(&tx)?;
        let summary = serde_json::to_string(&summary)?;
        Ok::<_, anyhow::Error>(summary)
    };
    to_cresult_str(res())
}

// #[tokio::main]
// #[no_mangle]
// pub async unsafe extern "C" fn get_best_server(servers: *mut u8, len: u64) -> CResult<*mut c_char> {
//     let servers: Vec<u8> = Vec::from_raw_parts(servers, len as usize, len as usize);
//     let res = async {
//         let servers = flatbuffers::root::<Servers>(&servers)?;
//         let best_server = crate::get_best_server(servers).await?;
//         Ok(best_server)
//     };
//     to_cresult_str(res.await)
// }

#[no_mangle]
pub unsafe extern "C" fn import_from_zwl(coin: u8, name: *mut c_char, data: *mut c_char) {
    from_c_str!(name);
    from_c_str!(data);
    let res = crate::api::account::import_from_zwl(coin, &name, &data);
    log_error(res)
}

#[no_mangle]
pub unsafe extern "C" fn derive_zip32(
    coin: u8,
    id_account: u32,
    account: u32,
    external: u32,
    has_address: bool,
    address: u32,
) -> CResult<*const u8> {
    let res = || {
        let address = if has_address { Some(address) } else { None };
        let kp = crate::api::account::derive_keys(coin, id_account, account, external, address)?;
        fb_to_bytes!(kp)
    };
    to_cresult_bytes(res())
}

#[no_mangle]
pub unsafe extern "C" fn clear_tx_details(coin: u8, account: u32) -> CResult<u8> {
    let res = |connection: &Connection| {
        crate::DbAdapter::clear_tx_details(connection, account)?;
        Ok(0)
    };
    to_cresult(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_account_list(coin: u8) -> CResult<*const u8> {
    let res = |connection: &Connection| {
        let accounts = crate::db::read::get_account_list(coin, connection)?;
        fb_to_bytes!(accounts)
    };
    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn count_accounts(coin: u8) -> CResult<u32> {
    let res = |connection: &Connection| {
        let c = crate::db::read::count_accounts(connection)?;
        Ok(c)
    };
    to_cresult(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_first_account(coin: u8) -> CResult<u32> {
    let res = |connection: &Connection| {
        let id = crate::db::read::get_first_account(connection)?;
        Ok(id)
    };
    to_cresult(with_coin(coin, res))
}

// #[no_mangle]
// pub unsafe extern "C" fn get_active_account(coin: u8) -> CResult<u32> {
//     let res = |connection: &Connection| {
//         let new_id = crate::db::read::get_active_account(connection)?;
//         Ok(new_id)
//     };
//     to_cresult(with_coin(coin, res))
// }

// #[no_mangle]
// pub unsafe extern "C" fn set_active_account(coin: u8, id: u32) -> CResult<u8> {
//     let res = |connection: &Connection| {
//         crate::coinconfig::set_active_account(coin, id);
//         crate::db::read::set_active_account(connection, id)?;
//         Ok(0)
//     };
//     to_cresult(with_coin(coin, res))
// }

#[no_mangle]
pub unsafe extern "C" fn get_t_addr(coin: u8, id: u32) -> CResult<*mut c_char> {
    let res = |connection: &Connection| {
        let address = crate::db::read::get_t_addr(connection, id)?;
        Ok(address)
    };
    to_cresult_str(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_sk(coin: u8, id: u32) -> CResult<*mut c_char> {
    let res = |connection: &Connection| {
        let sk = crate::db::read::get_sk(connection, id)?;
        Ok(sk)
    };
    to_cresult_str(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn update_account_name(coin: u8, id: u32, name: *mut c_char) -> CResult<u8> {
    from_c_str!(name);
    let res = |connection: &Connection| {
        crate::db::read::update_account_name(connection, id, &name)?;
        Ok(0)
    };
    to_cresult(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_balances(
    coin: u8,
    id: u32,
    confirmed_height: u32,
) -> CResult<*const u8> {
    let res = |connection: &Connection| {
        let data = crate::db::read::get_balances(connection, id, confirmed_height)?;
        Ok(data)
    };
    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_pool_balances(
    coin: u8,
    id: u32,
    confirmations: u32,
    include_spent: bool,
) -> CResult<*const u8> {
    let res = || {
        let balances = crate::scan::get_pool_balances(coin, id, confirmations, include_spent)?;
        fb_to_bytes!(balances)
    };
    to_cresult_bytes(res())
}

#[no_mangle]
pub unsafe extern "C" fn get_db_height(coin: u8) -> CResult<*const u8> {
    let c = CoinConfig::get(coin);
    let res = |connection: &Connection| {
        let height = crate::db::read::get_db_height(&c.chain.network(), connection)?;
        fb_to_bytes!(height)
    };
    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_notes(coin: u8, id: u32) -> CResult<*const u8> {
    let res = |connection: &Connection| {
        let data = crate::db::read::get_notes(connection, id)?;
        Ok(data)
    };
    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_txs(coin: u8, id: u32) -> CResult<*const u8> {
    let res = |connection: &Connection| {
        let c = CoinConfig::get(coin);
        let shielded_txs = crate::db::read::get_txs(c.chain.network(), connection, id)?;
        fb_to_bytes!(shielded_txs)
    };
    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_messages(coin: u8, id: u32) -> CResult<*const u8> {
    let res = |connection: &Connection| {
        let c = CoinConfig::get(coin);
        let messages = crate::db::read::get_messages(c.chain.network(), connection, id)?;
        fb_to_bytes!(messages)
    };
    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_prev_next_message(
    coin: u8,
    id: u32,
    subject: *mut c_char,
    height: u32,
) -> CResult<*const u8> {
    from_c_str!(subject);
    let res = |connection: &Connection| {
        let data = crate::db::read::get_prev_next_message(connection, &subject, height, id)?;
        Ok(data)
    };
    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_templates(coin: u8) -> CResult<*const u8> {
    let res = |connection: &Connection| {
        let data = crate::db::read::get_templates(connection)?;
        Ok(data)
    };
    to_cresult_bytes(with_coin(coin, res))
}

// #[no_mangle]
// pub unsafe extern "C" fn save_send_template(coin: u8, template: *mut u8, len: u64) -> CResult<u32> {
//     let template: Vec<u8> = Vec::from_raw_parts(template, len as usize, len as usize);
//     let res = || {
//         let c = CoinConfig::get(coin);
//         let db = c.db()?;
//         let template = flatbuffers::root::<SendTemplate>(&template)?;
//         let id = db.store_template(&template)?;
//         Ok(id)
//     };
//     to_cresult(res())
// }

#[no_mangle]
pub unsafe extern "C" fn delete_send_template(coin: u8, id: u32) -> CResult<u8> {
    let res = || {
        let c = CoinConfig::get(coin);
        let db = c.db()?;
        db.delete_template(id)?;
        Ok(0)
    };
    to_cresult(res())
}

#[no_mangle]
pub unsafe extern "C" fn get_contacts(coin: u8) -> CResult<*const u8> {
    let res = |connection: &Connection| {
        let data = crate::db::read::get_contacts(connection)?;
        Ok(data)
    };
    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_contact(coin: u8, id: u32) -> CResult<*const u8> {
    let res = |connection: &Connection| {
        let contact = crate::db::read::get_contact(connection, id)?;
        fb_to_bytes!(contact)
    };
    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_pnl_txs(coin: u8, id: u32, timestamp: u32) -> CResult<*const u8> {
    let res = |connection: &Connection| {
        let txs = crate::db::read::get_pnl_txs(connection, id, timestamp)?;
        let data = TxTimeValueVecT { values: Some(txs) };
        fb_to_bytes!(data)
    };
    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_spendings(coin: u8, id: u32, timestamp: u32) -> CResult<*const u8> {
    let res = |connection: &Connection| {
        let data = crate::db::read::get_spendings(connection, id, timestamp)?;
        let data = SpendingVecT { values: Some(data) };
        fb_to_bytes!(data)
    };
    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn update_excluded(coin: u8, id: u32, excluded: bool) -> CResult<u8> {
    let res = |connection: &Connection| {
        crate::db::read::update_excluded(connection, id, excluded)?;
        Ok(0)
    };
    to_cresult(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn invert_excluded(coin: u8, id: u32) -> CResult<u8> {
    let res = |connection: &Connection| {
        crate::db::read::invert_excluded(connection, id)?;
        Ok(0)
    };
    to_cresult(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_checkpoints(coin: u8) -> CResult<*const u8> {
    let res = |connection: &Connection| {
        let data = crate::db::read::get_checkpoints(connection)?;
        Ok(data)
    };
    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn decrypt_db(db_path: *mut c_char, passwd: *mut c_char) -> CResult<bool> {
    from_c_str!(passwd);
    from_c_str!(db_path);
    let res = || {
        let connection = rusqlite::Connection::open(&*db_path)?;
        let valid = crate::db::cipher::check_passwd(&connection, &passwd)?;
        Ok(valid)
    };
    to_cresult(res())
}

#[no_mangle]
pub unsafe extern "C" fn clone_db_with_passwd(
    coin: u8,
    temp_path: *mut c_char,
    passwd: *mut c_char,
) -> CResult<u8> {
    from_c_str!(passwd);
    from_c_str!(temp_path);
    let res = |connection: &Connection| {
        crate::db::cipher::clone_db_with_passwd(connection, &temp_path, &passwd)?;
        Ok(0)
    };
    to_cresult(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_property(coin: u8, name: *mut c_char) -> CResult<*mut c_char> {
    from_c_str!(name);
    let res = |connection: &Connection| {
        let value = crate::db::read::get_property(connection, &name)?;
        Ok(value)
    };
    to_cresult_str(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn set_property(
    coin: u8,
    name: *mut c_char,
    value: *mut c_char,
) -> CResult<u8> {
    from_c_str!(name);
    from_c_str!(value);
    let res = |connection: &Connection| {
        crate::db::read::set_property(connection, &name, &value)?;
        Ok(0)
    };
    to_cresult(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn get_account_property(
    coin: u8,
    account: u32,
    name: *mut c_char,
) -> CResult<*mut c_char> {
    from_c_str!(name);
    let res = |connection: &Connection| {
        let value = crate::db::read::get_account_property(connection, account, &name)?;
        Ok(value)
    };
    to_cresult_str(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn set_account_property(
    coin: u8,
    account: u32,
    name: *mut c_char,
    value: *mut c_char,
) -> CResult<u8> {
    from_c_str!(name);
    from_c_str!(value);
    let res = |connection: &Connection| {
        crate::db::read::set_account_property(connection, account, &name, &value)?;
        Ok(0)
    };
    to_cresult(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn parse_tex(coin: u8, address: *mut c_char) -> CResult<*mut c_char> {
    from_c_str!(address);
    let c = CoinConfig::get(coin);
    let network = c.chain.network();
    to_cresult_str(crate::taddr::parse_tex(network, &address))
}

#[no_mangle]
#[tokio::main]
pub async unsafe extern "C" fn ping(lwd_url: *mut c_char) -> CResult<u32> {
    from_c_str!(lwd_url);
    let res = crate::api::sync::ping(&lwd_url);
    to_cresult(res.await)
}

#[no_mangle]
pub unsafe extern "C" fn store_swap(
    coin: u8,
    account: u32,
    swap_bytes: *mut u8,
    swap_len: u64,
) -> CResult<u8> {
    let res = |connection: &Connection| {
        let swap_bytes: Vec<u8> =
            unsafe { Vec::from_raw_parts(swap_bytes, swap_len as usize, swap_len as usize) };
        let swap = flatbuffers::root::<Swap>(&swap_bytes).unwrap().unpack();
        crate::db::read::store_swap(connection, account, swap)?;
        Ok(0)
    };

    to_cresult(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn list_swaps(coin: u8) -> CResult<*const u8> {
    let res = |connection: &Connection| {
        let swaps = crate::db::read::list_swaps(connection)?;
        let swaps = SwapVecT {
            values: Some(swaps),
        };
        fb_to_bytes!(swaps)
    };

    to_cresult_bytes(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn clear_swap_history(coin: u8) -> CResult<u8> {
    let res = |connection: &Connection| {
        crate::db::read::clear_swap_history(connection)?;
        Ok(0)
    };

    to_cresult(with_coin(coin, res))
}

#[cfg(feature = "ledger")]
#[no_mangle]
#[tokio::main]
pub async unsafe extern "C" fn ledger_send(coin: u8, tx_plan: *mut c_char) -> CResult<*mut c_char> {
    from_c_str!(tx_plan);
    let res = async {
        let tx_plan: TransactionPlan = serde_json::from_str(&tx_plan)?;
        let c = CoinConfig::get(coin);
        let pk = crate::orchard::get_proving_key();
        let raw_tx = tokio::task::spawn_blocking(move || {
            let prover = crate::PROVER.lock();
            let prover = prover.as_ref().unwrap();
            let raw_tx = crate::ledger::build_ledger_tx(c.chain.network(), &tx_plan, prover, &pk)?;
            Ok::<_, anyhow::Error>(raw_tx)
        })
        .await??;
        let response = crate::broadcast_tx(coin, &raw_tx).await?;
        Ok::<_, anyhow::Error>(response)
    };
    to_cresult_str(res.await)
}

#[cfg(feature = "ledger")]
#[no_mangle]
pub unsafe extern "C" fn ledger_import_account(coin: u8, name: *mut c_char) -> CResult<u32> {
    from_c_str!(name);
    let account = crate::ledger::import_account(coin, &name);
    to_cresult(account)
}

#[cfg(feature = "ledger")]
#[no_mangle]
pub unsafe extern "C" fn ledger_has_account(coin: u8, account: u32) -> CResult<bool> {
    let res = |connection: &Connection| crate::ledger::is_external(connection, account);
    to_cresult(with_coin(coin, res))
}

#[no_mangle]
pub unsafe extern "C" fn has_cuda() -> bool {
    crate::gpu::has_cuda()
}

#[no_mangle]
pub unsafe extern "C" fn has_metal() -> bool {
    crate::gpu::has_metal()
}

#[no_mangle]
pub unsafe extern "C" fn has_gpu() -> bool {
    crate::gpu::has_gpu()
}

#[no_mangle]
pub unsafe extern "C" fn use_gpu(v: bool) {
    crate::gpu::use_gpu(v)
}

fn unpack_fee(fee_bytes: *mut u8, fee_len: u64) -> FeeT {
    let fee_bytes: Vec<u8> =
        unsafe { Vec::from_raw_parts(fee_bytes, fee_len as usize, fee_len as usize) };
    let fee_rule = flatbuffers::root::<Fee>(&fee_bytes).unwrap();
    fee_rule.unpack()
}
