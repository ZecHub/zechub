package dev.zecauth

/**
 * ZecAuth — Wallet connection protocol for Zcash.
 *
 * This is the Kotlin SDK that wallet developers integrate.
 * It wraps the native Rust library (zecauth-ffi) via JNI.
 *
 * ## Integration example:
 * ```kotlin
 * // 1. Initialize with the wallet's seed
 * val zecAuth = ZecAuth(walletSeed, ZecAuth.Network.MAINNET, accountIndex = 0)
 *
 * // 2. Get the user's ZecAuth identity
 * val pubkey = zecAuth.publicKey()
 *
 * // 3. Handle a zecauth:// deep link
 * fun onZecAuthChallenge(challengeJson: String) {
 *     val response = zecAuth.signChallenge(challengeJson)
 *     // POST response to the dApp's callback URL
 *     httpClient.post(callbackUrl, response)
 * }
 * ```
 */
class ZecAuth(
    private val seedHex: String,
    private val network: Network,
    private val account: Int = 0,
) {
    enum class Network(val value: String) {
        MAINNET("mainnet"),
        TESTNET("testnet"),
    }

    companion object {
        init {
            System.loadLibrary("zecauth_ffi")
        }

        // Native methods via JNI
        @JvmStatic
        private external fun nativeDerivePubkey(
            seedHex: String,
            network: String,
            account: Int,
        ): String?

        @JvmStatic
        private external fun nativeSignChallenge(
            seedHex: String,
            network: String,
            account: Int,
            challengeJson: String,
        ): String?

        @JvmStatic
        private external fun nativeVerifyResponse(
            responseJson: String,
            expectedDomain: String,
            expectedChain: String,
        ): Boolean
    }

    /**
     * Get the user's ZecAuth public key (their protocol identity).
     *
     * This is deterministic — the same seed always produces the same key.
     * The key is isolated from spending keys and reveals nothing about
     * the user's shielded addresses or balances.
     */
    fun publicKey(): String {
        return nativeDerivePubkey(seedHex, network.value, account)
            ?: throw ZecAuthException("Failed to derive public key")
    }

    /**
     * Sign a challenge from a dApp.
     *
     * @param challengeJson The challenge JSON received from the dApp
     *   (via QR code scan, deep link, or HTTP).
     * @return The signed response as a JSON string, ready to POST
     *   to the dApp's callback URL.
     */
    fun signChallenge(challengeJson: String): String {
        return nativeSignChallenge(seedHex, network.value, account, challengeJson)
            ?: throw ZecAuthException("Failed to sign challenge")
    }

    /**
     * Verify a signed response (server-side utility).
     *
     * @param responseJson The signed response JSON.
     * @param expectedDomain The domain the server expects.
     * @param expectedChain The chain the server expects (e.g., "zcash:mainnet").
     * @return true if the response is valid.
     */
    fun verifyResponse(
        responseJson: String,
        expectedDomain: String,
        expectedChain: String = "zcash:${network.value}",
    ): Boolean {
        return nativeVerifyResponse(responseJson, expectedDomain, expectedChain)
    }
}

class ZecAuthException(message: String) : Exception(message)
