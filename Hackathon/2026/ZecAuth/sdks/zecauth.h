/**
 * ZecAuth C FFI — wallet connection protocol for Zcash.
 *
 * This header defines the C interface to the ZecAuth Rust library.
 * Use this from Kotlin (JNI), Swift (direct FFI), or any C-compatible language.
 *
 * All returned strings must be freed with zecauth_free_string().
 */

#ifndef ZECAUTH_H
#define ZECAUTH_H

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

/**
 * Derive the ZecAuth public key from a wallet seed.
 *
 * @param seed_hex    Hex-encoded wallet seed (64+ hex chars = 32+ bytes)
 * @param network     "mainnet" or "testnet"
 * @param account     Account index (0 for default)
 * @return            Hex-encoded public key string, or NULL on error.
 *                    Caller must free with zecauth_free_string().
 */
char* zecauth_derive_pubkey(
    const char* seed_hex,
    const char* network,
    uint32_t account
);

/**
 * Sign a challenge from a dApp.
 *
 * @param seed_hex       Hex-encoded wallet seed
 * @param network        "mainnet" or "testnet"
 * @param account        Account index
 * @param challenge_json Challenge JSON string from the dApp
 * @return               Signed response as JSON string, or NULL on error.
 *                       Caller must free with zecauth_free_string().
 */
char* zecauth_sign_challenge(
    const char* seed_hex,
    const char* network,
    uint32_t account,
    const char* challenge_json
);

/**
 * Verify a signed authentication response.
 *
 * @param response_json   Signed response JSON string
 * @param expected_domain Expected domain (e.g., "myapp.com")
 * @param expected_chain  Expected chain (e.g., "zcash:mainnet")
 * @return                1 if valid, 0 if invalid
 */
int32_t zecauth_verify_response(
    const char* response_json,
    const char* expected_domain,
    const char* expected_chain
);

/**
 * Free a string returned by ZecAuth FFI functions.
 *
 * @param s String to free (may be NULL, which is a no-op)
 */
void zecauth_free_string(char* s);

#ifdef __cplusplus
}
#endif

#endif /* ZECAUTH_H */
