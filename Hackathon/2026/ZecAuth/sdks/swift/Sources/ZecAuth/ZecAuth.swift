import Foundation

/// ZecAuth — Wallet connection protocol for Zcash.
///
/// This is the Swift SDK that iOS wallet developers integrate.
/// It wraps the native Rust library (zecauth-ffi) via C FFI.
///
/// ## Integration example:
/// ```swift
/// // 1. Initialize with the wallet's seed
/// let zecAuth = try ZecAuth(seedHex: walletSeedHex, network: .mainnet, account: 0)
///
/// // 2. Get the user's ZecAuth identity
/// let pubkey = try zecAuth.publicKey()
///
/// // 3. Handle a zecauth:// deep link
/// func handleZecAuthChallenge(_ challengeJSON: String) throws {
///     let response = try zecAuth.signChallenge(challengeJSON)
///     // POST response to the dApp's callback URL
///     URLSession.shared.post(callbackURL, body: response)
/// }
/// ```
public final class ZecAuth {
    public enum Network: String {
        case mainnet
        case testnet
    }

    public enum ZecAuthError: Error, LocalizedError {
        case keyDerivationFailed
        case signingFailed
        case verificationFailed
        case invalidSeed

        public var errorDescription: String? {
            switch self {
            case .keyDerivationFailed: return "Failed to derive authentication key"
            case .signingFailed: return "Failed to sign challenge"
            case .verificationFailed: return "Signature verification failed"
            case .invalidSeed: return "Invalid seed hex string"
            }
        }
    }

    private let seedHex: String
    private let network: Network
    private let account: UInt32

    /// Initialize ZecAuth with a wallet seed.
    ///
    /// - Parameters:
    ///   - seedHex: The wallet seed as a hex-encoded string (64 hex chars = 32 bytes).
    ///   - network: Mainnet or testnet.
    ///   - account: Account index (default 0).
    public init(seedHex: String, network: Network, account: UInt32 = 0) throws {
        guard seedHex.count >= 64 else {
            throw ZecAuthError.invalidSeed
        }
        self.seedHex = seedHex
        self.network = network
        self.account = account
    }

    /// Get the user's ZecAuth public key (their protocol identity).
    public func publicKey() throws -> String {
        let result = seedHex.withCString { seedPtr in
            network.rawValue.withCString { networkPtr in
                zecauth_derive_pubkey(seedPtr, networkPtr, account)
            }
        }

        guard let ptr = result else {
            throw ZecAuthError.keyDerivationFailed
        }

        let pubkey = String(cString: ptr)
        zecauth_free_string(ptr)
        return pubkey
    }

    /// Sign a challenge from a dApp.
    ///
    /// - Parameter challengeJSON: The challenge JSON from the dApp.
    /// - Returns: The signed response as a JSON string.
    public func signChallenge(_ challengeJSON: String) throws -> String {
        let result = seedHex.withCString { seedPtr in
            network.rawValue.withCString { networkPtr in
                challengeJSON.withCString { challengePtr in
                    zecauth_sign_challenge(seedPtr, networkPtr, account, challengePtr)
                }
            }
        }

        guard let ptr = result else {
            throw ZecAuthError.signingFailed
        }

        let response = String(cString: ptr)
        zecauth_free_string(ptr)
        return response
    }

    /// Verify a signed response (server-side utility).
    public static func verifyResponse(
        _ responseJSON: String,
        expectedDomain: String,
        expectedChain: String
    ) -> Bool {
        return responseJSON.withCString { responsePtr in
            expectedDomain.withCString { domainPtr in
                expectedChain.withCString { chainPtr in
                    zecauth_verify_response(responsePtr, domainPtr, chainPtr) == 1
                }
            }
        }
    }
}
