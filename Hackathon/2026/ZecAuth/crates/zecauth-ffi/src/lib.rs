//! C FFI bindings for ZecAuth.
//!
//! This crate exposes the ZecAuth core functionality via a C ABI
//! that can be called from Kotlin (via JNI) and Swift (via direct FFI).
//!
//! All string parameters and return values are null-terminated C strings.
//! The caller is responsible for freeing returned strings via `zecauth_free_string`.

use std::ffi::{CStr, CString};
use std::os::raw::c_char;
use std::ptr;

use zecauth_core::{AuthKeyPair, AuthResponse, ChallengeMessage, Network};

/// Derive an auth keypair from a hex-encoded seed.
///
/// Returns the hex-encoded public key, or null on error.
/// The caller must free the returned string with `zecauth_free_string`.
#[no_mangle]
pub extern "C" fn zecauth_derive_pubkey(
    seed_hex: *const c_char,
    network: *const c_char,
    account: u32,
) -> *mut c_char {
    let result = (|| -> Result<String, String> {
        let seed_hex = unsafe { CStr::from_ptr(seed_hex) }
            .to_str()
            .map_err(|e| format!("invalid seed_hex UTF-8: {e}"))?;
        let network_str = unsafe { CStr::from_ptr(network) }
            .to_str()
            .map_err(|e| format!("invalid network UTF-8: {e}"))?;

        let seed = hex::decode(seed_hex).map_err(|e| format!("invalid hex: {e}"))?;
        let network: Network = network_str.parse().map_err(|e| format!("{e}"))?;

        let kp = AuthKeyPair::from_seed(&seed, network, account)
            .map_err(|e| format!("{e}"))?;

        Ok(kp.public_key().to_hex())
    })();

    match result {
        Ok(pubkey) => CString::new(pubkey).unwrap().into_raw(),
        Err(_) => ptr::null_mut(),
    }
}

/// Sign a challenge JSON string with the wallet's auth key.
///
/// Returns the signed response as a JSON string, or null on error.
/// The caller must free the returned string with `zecauth_free_string`.
#[no_mangle]
pub extern "C" fn zecauth_sign_challenge(
    seed_hex: *const c_char,
    network: *const c_char,
    account: u32,
    challenge_json: *const c_char,
) -> *mut c_char {
    let result = (|| -> Result<String, String> {
        let seed_hex = unsafe { CStr::from_ptr(seed_hex) }
            .to_str()
            .map_err(|e| format!("invalid seed_hex UTF-8: {e}"))?;
        let network_str = unsafe { CStr::from_ptr(network) }
            .to_str()
            .map_err(|e| format!("invalid network UTF-8: {e}"))?;
        let challenge_str = unsafe { CStr::from_ptr(challenge_json) }
            .to_str()
            .map_err(|e| format!("invalid challenge UTF-8: {e}"))?;

        let seed = hex::decode(seed_hex).map_err(|e| format!("invalid hex: {e}"))?;
        let network: Network = network_str.parse().map_err(|e| format!("{e}"))?;

        let kp = AuthKeyPair::from_seed(&seed, network, account)
            .map_err(|e| format!("{e}"))?;
        let challenge = ChallengeMessage::from_json(challenge_str)
            .map_err(|e| format!("{e}"))?;

        let response = AuthResponse::sign(&kp, &challenge);
        response.to_json().map_err(|e| format!("{e}"))
    })();

    match result {
        Ok(json) => CString::new(json).unwrap().into_raw(),
        Err(_) => ptr::null_mut(),
    }
}

/// Verify a signed response JSON string.
///
/// Returns 1 if valid, 0 if invalid.
#[no_mangle]
pub extern "C" fn zecauth_verify_response(
    response_json: *const c_char,
    expected_domain: *const c_char,
    expected_chain: *const c_char,
) -> i32 {
    let result = (|| -> Result<(), String> {
        let response_str = unsafe { CStr::from_ptr(response_json) }
            .to_str()
            .map_err(|e| format!("invalid response UTF-8: {e}"))?;
        let domain = unsafe { CStr::from_ptr(expected_domain) }
            .to_str()
            .map_err(|e| format!("invalid domain UTF-8: {e}"))?;
        let chain = unsafe { CStr::from_ptr(expected_chain) }
            .to_str()
            .map_err(|e| format!("invalid chain UTF-8: {e}"))?;

        let response = AuthResponse::from_json(response_str)
            .map_err(|e| format!("{e}"))?;

        zecauth_core::verify_response(&response, domain, chain)
            .map_err(|e| format!("{e}"))?;

        Ok(())
    })();

    if result.is_ok() { 1 } else { 0 }
}

/// Free a string returned by ZecAuth FFI functions.
#[no_mangle]
pub extern "C" fn zecauth_free_string(s: *mut c_char) {
    if !s.is_null() {
        unsafe { drop(CString::from_raw(s)); }
    }
}
