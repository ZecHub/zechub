use incrementalmerkletree::{Hashable, Level};
use orchard::keys::{FullViewingKey, Scope, SpendingKey};
use orchard::note::{ExtractedNoteCommitment, RandomSeed, Rho};
use orchard::tree::MerkleHashOrchard;
use orchard::value::NoteValue;
use paypunk_chains_zcash::protocol::ZcashProtocol;
use paypunk_chains_zcash::signer::ZcashSignerProtocol;
use paypunk_chains_zcash::to_local_params;
use paypunk_types::{Protocol, SignerProtocol};
use pczt::roles::{creator::Creator, io_finalizer::IoFinalizer, prover::Prover};
use rand_core::OsRng;
use secp256k1::{Secp256k1, SecretKey};
use zcash_primitives::transaction::builder::{BuildConfig, Builder};
use zcash_primitives::transaction::fees::zip317;
use zcash_primitives::transaction::Transaction;
use zcash_protocol::consensus::BlockHeight;
use zcash_protocol::consensus::BranchId;
use zcash_protocol::local_consensus::LocalNetwork;
use zcash_protocol::memo::MemoBytes;
use zcash_protocol::value::Zatoshis;
use zcash_transparent::address::TransparentAddress;
use zcash_transparent::bundle::{OutPoint, TxOut};
use zcash_transparent::util::hash160;

/// Build a shielded Orchard PCZT and run it through the full pipeline:
/// create → finalize IO → prove → sign → finalize spends → extract.
///
/// NOTE: This test currently builds the PCZT using `zcash_primitives::Builder`
/// directly because `ZcashProtocol::create_transaction` requires a fully synced
/// `WalletDb` with notes. Once `WalletDbActor` is fully implemented with
/// `zcash_client_backend::propose_standard_transfer_to_address` +
/// `create_pczt_from_proposal`, this test will be updated to use
/// `Protocol::create_transaction` through the actor.
///
/// The prove, sign, and finalize steps already use the Protocol traits.
#[test]
fn test_orchard_shielded_pczt_full_pipeline() {
    let params = LocalNetwork {
        overwinter: Some(BlockHeight::from_u32(1)),
        sapling: Some(BlockHeight::from_u32(1)),
        blossom: Some(BlockHeight::from_u32(1)),
        heartwood: Some(BlockHeight::from_u32(1)),
        canopy: Some(BlockHeight::from_u32(1)),
        nu5: Some(BlockHeight::from_u32(1)),
        nu6: Some(BlockHeight::from_u32(1)),
        nu6_1: Some(BlockHeight::from_u32(1)),
        nu6_2: Some(BlockHeight::from_u32(1)),
    };
    let target_height = BlockHeight::from_u32(10);

    // ── 1. Generate keys and create a note ──────────────────────────────
    let seed = [0xab; 64];
    // Use coin_type=1 (regtest) to match LocalNetwork::coin_type(), since
    // LocalNetwork::network_type() always returns NetworkType::Regtest.
    let sk = SpendingKey::from_zip32_seed(&seed, 1, zip32::AccountId::try_from(0).unwrap())
        .expect("SpendingKey from seed");
    let fvk = FullViewingKey::from(&sk);
    let recipient = fvk.address_at(0u32, Scope::External);

    let value = NoteValue::from_raw(60_000);
    let rho = Rho::from_bytes(&[7; 32]).into_option().unwrap();
    let rseed = RandomSeed::from_bytes([8u8; 32], &rho)
        .into_option()
        .unwrap();
    let note = orchard::Note::from_parts(recipient, value, rho, rseed).unwrap();

    // ── 2. Compute merkle path for a single note at position 0 ──────────
    let cmx: ExtractedNoteCommitment = note.commitment().into();
    let auth_path: [MerkleHashOrchard; 32] =
        core::array::from_fn(|i| MerkleHashOrchard::empty_root(Level::from(i as u8)));
    let merkle_path = orchard::tree::MerklePath::from_parts(0, auth_path);
    let anchor = merkle_path.root(cmx);

    // ── 3. Build transaction via zcash_primitives Builder ────────────────
    // TODO: Replace with ZcashProtocol::propose_and_build once WalletDbActor
    // is wired with zcash_client_backend APIs.
    let mut builder = Builder::new(
        &params,
        target_height,
        BuildConfig::Standard {
            sapling_anchor: None,
            orchard_anchor: Some(anchor),
        },
    );

    builder
        .add_orchard_spend::<zip317::FeeError>(fvk.clone(), note, merkle_path)
        .expect("add_orchard_spend");

    let change_addr = fvk.address_at(1u32, Scope::External);
    builder
        .add_orchard_output::<zip317::FeeError>(
            Some(fvk.to_ovk(Scope::Internal)),
            change_addr,
            Zatoshis::from_u64(50_000).unwrap(),
            MemoBytes::empty(),
        )
        .expect("add_orchard_output");

    let pczt_result = builder
        .build_for_pczt(OsRng, &zip317::FeeRule::standard())
        .expect("build_for_pczt");

    let created =
        Creator::build_from_parts(pczt_result.pczt_parts).expect("Creator::build_from_parts");

    let io_finalized = IoFinalizer::new(created)
        .finalize_io()
        .expect("IoFinalizer::finalize_io");

    let pczt_bytes = io_finalized.serialize();

    // ── 4. Prove via pczt::roles::prover directly ─────────────────────────
    // Proving is bundled into create_transaction in production, but since
    // create_transaction is not yet implemented (needs WalletDb), we prove
    // inline here using the pczt crate directly.
    let proven_pczt = Prover::new(pczt::Pczt::parse(&pczt_bytes).expect("Pczt::parse"))
        .create_orchard_proof(&orchard::circuit::ProvingKey::build())
        .expect("create_orchard_proof")
        .finish();
    let proven_bytes = proven_pczt.serialize();

    let signer = ZcashSignerProtocol::new(
        to_local_params(
            zcash_protocol::consensus::Network::TestNetwork,
            zcash_protocol::consensus::NetworkType::Regtest,
        ),
        zcash_protocol::consensus::NetworkType::Regtest,
    );

    // ── 5. Sign via ZcashSignerProtocol (SignerProtocol::sign) ───────────
    let path = "m/44'/133'/0'";
    let signed_bytes = signer.sign(&seed, path, &proven_bytes).expect("sign");

    // ── 6. Finalize via ZcashProtocol (Protocol::finalize) ──────────────
    let wallet_protocol = ZcashProtocol::new(
        to_local_params(
            zcash_protocol::consensus::Network::TestNetwork,
            zcash_protocol::consensus::NetworkType::Regtest,
        ),
        zcash_protocol::consensus::NetworkType::Regtest,
        None,
        None,
        None,
        None,
    );
    let raw_tx = wallet_protocol.finalize(&signed_bytes).expect("finalize");

    // ── 7. Verify ───────────────────────────────────────────────────────
    let tx = Transaction::read(&raw_tx[..], BranchId::Nu6).expect("parse extracted transaction");
    let orchard_bundle = tx.orchard_bundle().expect("orchard bundle");
    assert_eq!(orchard_bundle.actions().len(), 2);
}

/// Simplest possible PCZT construction test:
/// build a transparent-input-only transaction through the full PCZT pipeline
/// and verify round-trip serialization.
#[test]
fn test_construct_raw_pczt_inline() {
    let params = LocalNetwork {
        overwinter: Some(BlockHeight::from_u32(1)),
        sapling: Some(BlockHeight::from_u32(1)),
        blossom: Some(BlockHeight::from_u32(1)),
        heartwood: Some(BlockHeight::from_u32(1)),
        canopy: Some(BlockHeight::from_u32(1)),
        nu5: Some(BlockHeight::from_u32(1)),
        nu6: Some(BlockHeight::from_u32(1)),
        nu6_1: Some(BlockHeight::from_u32(1)),
        nu6_2: Some(BlockHeight::from_u32(1)),
    };
    let target_height = BlockHeight::from_u32(10);

    let mut builder = Builder::new(
        &params,
        target_height,
        BuildConfig::Standard {
            sapling_anchor: None,
            orchard_anchor: None,
        },
    );

    let secp = Secp256k1::new();
    let sk = SecretKey::from_slice(&[1u8; 32]).unwrap();
    let pk = secp256k1::PublicKey::from_secret_key(&secp, &sk);
    let hash = hash160::hash(&pk.serialize());
    let addr = TransparentAddress::PublicKeyHash(hash);
    let coin = TxOut::new(Zatoshis::from_u64(100_000).unwrap(), addr.script().into());
    let outpoint = OutPoint::new([0u8; 32], 0);

    builder
        .add_transparent_p2pkh_input(pk, outpoint, coin)
        .expect("add_transparent_p2pkh_input");

    let to = TransparentAddress::PublicKeyHash([0u8; 20]);
    builder
        .add_transparent_output(&to, Zatoshis::from_u64(50_000).unwrap())
        .expect("add_transparent_output");

    let change_addr = TransparentAddress::PublicKeyHash([1u8; 20]);
    builder
        .add_transparent_output(&change_addr, Zatoshis::from_u64(40_000).unwrap())
        .expect("add_change_output");

    let pczt_result = builder
        .build_for_pczt(OsRng, &zip317::FeeRule::standard())
        .expect("build_for_pczt");

    let created =
        Creator::build_from_parts(pczt_result.pczt_parts).expect("Creator::build_from_parts");

    let io_finalized = IoFinalizer::new(created)
        .finalize_io()
        .expect("IoFinalizer::finalize_io");

    let bytes = io_finalized.serialize();
    let parsed = pczt::Pczt::parse(&bytes).expect("Pczt::parse");
    assert_eq!(parsed.transparent().inputs().len(), 1);
    assert_eq!(parsed.transparent().outputs().len(), 2);

    assert_eq!(*parsed.global().tx_version(), 5);
    assert!(parsed.sapling().spends().is_empty());
    assert!(parsed.orchard().actions().is_empty());
}
