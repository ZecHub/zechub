//! The Orchard Proof of Balance circuit implementation.

use core::fmt;
use std::slice;

use crate::{
    note::ExtractedNoteCommitment,
    tree::{MerkleHashOrchard, MerklePath as MerklePathOrchard},
    value::ValueSum,
};
use blake2b_simd::Params;
use ff::{FromUniformBytes, PrimeField};
use group::{Curve, GroupEncoding};
use halo2_proofs::{
    circuit::{floor_planner, Layouter, Value},
    plonk::{
        self, Advice, BatchVerifier, Column, Constraints, Instance as InstanceColumn, Selector,
        SingleVerifier,
    },
    poly::Rotation,
    transcript::{Blake2bRead, Blake2bWrite},
};
use memuse::DynamicUsage;
use pasta_curves::{
    arithmetic::CurveAffine,
    pallas::{self, Base as Fp, Scalar as Fq},
    vesta,
};
use rand::{CryptoRng, RngCore};

use super::interval::{IntervalChip, IntervalChipConfig};
use crate::circuit::{
    commit_ivk::{CommitIvkChip, CommitIvkConfig},
    gadget::{
        add_chip::{self, AddChip, AddConfig},
        assign_free_advice,
    },
    note_commit::{NoteCommitChip, NoteCommitConfig},
};
use crate::{
    builder::SpendInfo,
    constants::{
        OrchardCommitDomains, OrchardFixedBases, OrchardFixedBasesFull, OrchardHashDomains,
        MERKLE_DEPTH_ORCHARD,
    },
    keys::{
        CommitIvkRandomness, DiversifiedTransmissionKey, FullViewingKey, NullifierDerivingKey,
        SpendAuthorizingKey, SpendValidatingKey,
    },
    note::{
        commitment::{NoteCommitTrapdoor, NoteCommitment},
        nullifier::Nullifier,
    },
    primitives::redpallas::{SpendAuth, VerificationKey},
    spec::NonIdentityPallasPoint,
    tree::Anchor,
    value::{NoteValue, ValueCommitTrapdoor, ValueCommitment},
    Note,
};
use halo2_gadgets::{
    ecc::{
        chip::{EccChip, EccConfig},
        FixedPoint, NonIdentityPoint, Point, ScalarFixed, ScalarFixedShort, ScalarVar,
    },
    poseidon::{primitives as poseidon, Pow5Chip as PoseidonChip, Pow5Config as PoseidonConfig},
    sinsemilla::{
        chip::{SinsemillaChip, SinsemillaConfig},
        merkle::{
            chip::{MerkleChip, MerkleConfig},
            MerklePath,
        },
    },
    utilities::lookup_range_check::LookupRangeCheckConfig,
};

/// Size of the Orchard circuit.
const K: u32 = 12;

// Absolute offsets for public inputs.
const ANCHOR: usize = 0;
const CV_NET_X: usize = 1;
const CV_NET_Y: usize = 2;
const DOMAIN_NF: usize = 3;
const RK_X: usize = 4;
const RK_Y: usize = 5;
const NF_ANCHOR: usize = 6;
const DOMAIN: usize = 7;

/// Hash the given info byte string to get the election domain
pub fn domain(info: &[u8]) -> Fp {
    let hash = Params::new()
        .hash_length(64)
        .personal(b"Zcash_WCV_domain")
        .to_state()
        .update(info)
        .finalize();
    Fp::from_uniform_bytes(hash.as_bytes().try_into().unwrap())
}

/// Configuration needed to use the Orchard Proof of Balance circuit.
#[derive(Clone, Debug)]
pub struct Config {
    primary: Column<InstanceColumn>,
    q_orchard: Selector,
    advices: [Column<Advice>; 10],
    range_check: LookupRangeCheckConfig<pallas::Base, 10>,
    add_config: AddConfig,
    ecc_config: EccConfig<OrchardFixedBases>,
    poseidon_config: PoseidonConfig<pallas::Base, 3, 2>,
    merkle_config_1: MerkleConfig<OrchardHashDomains, OrchardCommitDomains, OrchardFixedBases>,
    merkle_config_2: MerkleConfig<OrchardHashDomains, OrchardCommitDomains, OrchardFixedBases>,
    sinsemilla_config_1:
        SinsemillaConfig<OrchardHashDomains, OrchardCommitDomains, OrchardFixedBases>,
    sinsemilla_config_2:
        SinsemillaConfig<OrchardHashDomains, OrchardCommitDomains, OrchardFixedBases>,
    commit_ivk_config: CommitIvkConfig,
    old_note_commit_config: NoteCommitConfig,
    nf_interval_config: IntervalChipConfig,
}

/// The Orchard Proof of Balance circuit.
#[derive(Clone, Debug, Default)]
pub struct Circuit {
    pub(crate) path: Value<[MerkleHashOrchard; MERKLE_DEPTH_ORCHARD]>,
    pub(crate) pos: Value<u32>,
    pub(crate) g_d_old: Value<NonIdentityPallasPoint>,
    pub(crate) pk_d_old: Value<DiversifiedTransmissionKey>,
    pub(crate) v_old: Value<NoteValue>,
    pub(crate) rho_old: Value<Nullifier>,
    pub(crate) psi_old: Value<pallas::Base>,
    pub(crate) rcm_old: Value<NoteCommitTrapdoor>,
    pub(crate) cm_old: Value<NoteCommitment>,
    pub(crate) alpha: Value<pallas::Scalar>,
    pub(crate) ak: Value<SpendValidatingKey>,
    pub(crate) nk: Value<NullifierDerivingKey>,
    pub(crate) rivk: Value<CommitIvkRandomness>,
    pub(crate) rcv: Value<ValueCommitTrapdoor>,
    pub(crate) nf_start: Value<Nullifier>,
    pub(crate) nf_path: Value<[MerkleHashOrchard; MERKLE_DEPTH_ORCHARD]>,
    pub(crate) nf_pos: Value<u32>,
}

impl Circuit {
    /// This constructor is public to enable creation of custom builders.
    /// If you are not creating a custom builder, use [`Builder`] to compose
    /// and authorize a transaction.
    ///
    /// Constructs a `Circuit` from the following components:
    /// - `spend`: [`SpendInfo`] of the note spent in scope of the action
    /// - `output_note`: a note created in scope of the action
    /// - `alpha`: a scalar used for randomization of the action spend validating key
    /// - `rcv`: trapdoor for the action value commitment
    /// - `nf_start`: low range of a excluded nullifier interval
    /// - `nf_path`: merkle path to the root of the excluded nullifier tree
    ///
    /// Returns `None` if the `rho` of the `output_note` is not equal
    /// to the nullifier of the spent note.
    ///
    /// [`SpendInfo`]: crate::builder::SpendInfo
    /// [`Builder`]: crate::builder::Builder
    pub fn from_action_context(
        spend: SpendInfo,
        alpha: pallas::Scalar,
        rcv: ValueCommitTrapdoor,
        nf_start: Nullifier,
        nf_path: MerklePathOrchard,
    ) -> Circuit {
        let sender_address = spend.note.recipient();
        let rho_old = spend.note.rho();
        let psi_old = spend.note.rseed().psi(&rho_old);
        let rcm_old = spend.note.rseed().rcm(&rho_old);

        Circuit {
            path: Value::known(spend.merkle_path.auth_path()),
            pos: Value::known(spend.merkle_path.position()),
            g_d_old: Value::known(sender_address.g_d()),
            pk_d_old: Value::known(*sender_address.pk_d()),
            v_old: Value::known(spend.note.value()),
            rho_old: Value::known(rho_old),
            psi_old: Value::known(psi_old),
            rcm_old: Value::known(rcm_old),
            cm_old: Value::known(spend.note.commitment()),
            alpha: Value::known(alpha),
            ak: Value::known(spend.fvk.clone().into()),
            nk: Value::known(*spend.fvk.nk()),
            rivk: Value::known(spend.fvk.rivk(spend.scope)),
            rcv: Value::known(rcv),
            nf_start: Value::known(nf_start),
            nf_pos: Value::known(nf_path.position()),
            nf_path: Value::known(nf_path.auth_path()),
        }
    }
}

impl plonk::Circuit<pallas::Base> for Circuit {
    type Config = Config;
    type FloorPlanner = floor_planner::V1;

    fn without_witnesses(&self) -> Self {
        Self::default()
    }

    fn configure(meta: &mut plonk::ConstraintSystem<pallas::Base>) -> Self::Config {
        // Advice columns used in the Orchard circuit.
        let advices = [
            meta.advice_column(),
            meta.advice_column(),
            meta.advice_column(),
            meta.advice_column(),
            meta.advice_column(),
            meta.advice_column(),
            meta.advice_column(),
            meta.advice_column(),
            meta.advice_column(),
            meta.advice_column(),
        ];

        // Constrain v_old = magnitude                   (https://p.z.cash/ZKS:action-cv-net-integrity?partial).
        // calculated root = anchor                      (https://p.z.cash/ZKS:action-merkle-path-validity?partial).
        let q_orchard = meta.selector();
        meta.create_gate("Orchard circuit checks", |meta| {
            let q_orchard = meta.query_selector(q_orchard);
            let v_old = meta.query_advice(advices[0], Rotation::cur());
            let magnitude = meta.query_advice(advices[2], Rotation::cur());

            let root = meta.query_advice(advices[4], Rotation::cur());
            let anchor = meta.query_advice(advices[5], Rotation::cur());

            let nf_root = meta.query_advice(advices[6], Rotation::cur());
            let nf_anchor = meta.query_advice(advices[7], Rotation::cur());

            // The constraint "nf_pos is even" checks that nf_start is the beginning
            // of a nf interval (and not the end)
            // However, it is technically not necessary because nf_end is
            // the first item of the Merkle Authorization Path and therefore
            // is the sibling of nf_start
            // If nf_start were the end of the range, nf_end would be the beginning
            // and the range check would fail
            // For clarity, the constraint is still explicitly efforced by the circuit
            let nf_pos = meta.query_advice(advices[8], Rotation::cur());
            let nf_pos_half = meta.query_advice(advices[9], Rotation::cur());

            Constraints::with_selector(
                q_orchard,
                [
                    ("v_old = magnitude", v_old.clone() - magnitude),
                    ("root = anchor", root - anchor),
                    ("nf root = anchor", nf_root - nf_anchor),
                    ("nf_pos is even", nf_pos - nf_pos_half.clone() - nf_pos_half),
                ],
            )
        });

        // Addition of two field elements.
        let add_config = AddChip::configure(meta, advices[7], advices[8], advices[6]);

        // Fixed columns for the Sinsemilla generator lookup table
        let table_idx = meta.lookup_table_column();
        let lookup = (
            table_idx,
            meta.lookup_table_column(),
            meta.lookup_table_column(),
        );

        // Instance column used for public inputs
        let primary = meta.instance_column();
        meta.enable_equality(primary);

        // Permutation over all advice columns.
        for advice in advices.iter() {
            meta.enable_equality(*advice);
        }

        // Poseidon requires four advice columns, while ECC incomplete addition requires
        // six, so we could choose to configure them in parallel. However, we only use a
        // single Poseidon invocation, and we have the rows to accommodate it serially.
        // Instead, we reduce the proof size by sharing fixed columns between the ECC and
        // Poseidon chips.
        let lagrange_coeffs = [
            meta.fixed_column(),
            meta.fixed_column(),
            meta.fixed_column(),
            meta.fixed_column(),
            meta.fixed_column(),
            meta.fixed_column(),
            meta.fixed_column(),
            meta.fixed_column(),
        ];
        let rc_a = lagrange_coeffs[2..5].try_into().unwrap();
        let rc_b = lagrange_coeffs[5..8].try_into().unwrap();

        // Also use the first Lagrange coefficient column for loading global constants.
        // It's free real estate :)
        meta.enable_constant(lagrange_coeffs[0]);
        meta.enable_constant(lagrange_coeffs[1]);

        // We have a lot of free space in the right-most advice columns; use one of them
        // for all of our range checks.
        let range_check = LookupRangeCheckConfig::configure(meta, advices[9], table_idx);

        // Configuration for curve point operations.
        // This uses 10 advice columns and spans the whole circuit.
        let ecc_config =
            EccChip::<OrchardFixedBases>::configure(meta, advices, lagrange_coeffs, range_check);

        // Configuration for the Poseidon hash.
        let poseidon_config = PoseidonChip::configure::<poseidon::P128Pow5T3>(
            meta,
            // We place the state columns after the partial_sbox column so that the
            // pad-and-add region can be laid out more efficiently.
            advices[6..9].try_into().unwrap(),
            advices[5],
            rc_a,
            rc_b,
        );

        // Configuration for a Sinsemilla hash instantiation and a
        // Merkle hash instantiation using this Sinsemilla instance.
        // Since the Sinsemilla config uses only 5 advice columns,
        // we can fit two instances side-by-side.
        let (sinsemilla_config_1, merkle_config_1) = {
            let sinsemilla_config_1 = SinsemillaChip::configure(
                meta,
                advices[..5].try_into().unwrap(),
                advices[6],
                lagrange_coeffs[0],
                lookup,
                range_check,
            );
            let merkle_config_1 = MerkleChip::configure(meta, sinsemilla_config_1.clone());

            (sinsemilla_config_1, merkle_config_1)
        };

        // Configuration for a Sinsemilla hash instantiation and a
        // Merkle hash instantiation using this Sinsemilla instance.
        // Since the Sinsemilla config uses only 5 advice columns,
        // we can fit two instances side-by-side.
        let (sinsemilla_config_2, merkle_config_2) = {
            let sinsemilla_config_2 = SinsemillaChip::configure(
                meta,
                advices[5..].try_into().unwrap(),
                advices[7],
                lagrange_coeffs[1],
                lookup,
                range_check,
            );
            let merkle_config_2 = MerkleChip::configure(meta, sinsemilla_config_2.clone());

            (sinsemilla_config_2, merkle_config_2)
        };

        // Configuration to handle decomposition and canonicity checking
        // for CommitIvk.
        let commit_ivk_config = CommitIvkChip::configure(meta, advices);

        // Configuration to handle decomposition and canonicity checking
        // for NoteCommit_old.
        let old_note_commit_config =
            NoteCommitChip::configure(meta, advices, sinsemilla_config_1.clone());

        let nf_interval_config = IntervalChip::configure(
            meta, advices[0], advices[1], advices[2], lookup.0,
        );

        Config {
            primary,
            q_orchard,
            advices,
            range_check,
            add_config,
            ecc_config,
            poseidon_config,
            merkle_config_1,
            merkle_config_2,
            sinsemilla_config_1,
            sinsemilla_config_2,
            commit_ivk_config,
            old_note_commit_config,
            nf_interval_config,
        }
    }

    #[allow(non_snake_case)]
    fn synthesize(
        &self,
        config: Self::Config,
        mut layouter: impl Layouter<pallas::Base>,
    ) -> Result<(), plonk::Error> {
        // Load the Sinsemilla generator lookup table used by the whole circuit.
        SinsemillaChip::load(config.sinsemilla_config_1.clone(), &mut layouter)?;

        // Construct the ECC chip.
        let ecc_chip = config.ecc_chip();
        let nf_interval = IntervalChip::construct(config.nf_interval_config.clone());

        // Witness private inputs that are used across multiple checks.
        let (domain, psi_old, rho_old, cm_old, g_d_old, ak_P, nk, v_old, nf_pos, nf_start, nf_end) = {
            let domain = layouter.assign_region(
                || "copy domain",
                |mut region| {
                    region.assign_advice_from_instance(
                        || "instance domain",
                        config.primary,
                        DOMAIN,
                        config.advices[0],
                        0,
                    )
                },
            )?;

            // Witness psi_old
            let psi_old = assign_free_advice(
                layouter.namespace(|| "witness psi_old"),
                config.advices[0],
                self.psi_old,
            )?;

            // Witness rho_old
            let rho_old = assign_free_advice(
                layouter.namespace(|| "witness rho_old"),
                config.advices[0],
                self.rho_old.map(|rho| rho.0),
            )?;

            // Witness cm_old
            let cm_old = Point::new(
                ecc_chip.clone(),
                layouter.namespace(|| "cm_old"),
                self.cm_old.as_ref().map(|cm| cm.inner().to_affine()),
            )?;

            // Witness g_d_old
            let g_d_old = NonIdentityPoint::new(
                ecc_chip.clone(),
                layouter.namespace(|| "gd_old"),
                self.g_d_old.as_ref().map(|gd| gd.to_affine()),
            )?;

            // Witness ak_P.
            let ak_P: Value<pallas::Point> = self.ak.as_ref().map(|ak| ak.into());
            let ak_P = NonIdentityPoint::new(
                ecc_chip.clone(),
                layouter.namespace(|| "witness ak_P"),
                ak_P.map(|ak_P| ak_P.to_affine()),
            )?;

            // Witness nk.
            let nk = assign_free_advice(
                layouter.namespace(|| "witness nk"),
                config.advices[0],
                self.nk.map(|nk| nk.inner()),
            )?;

            // Witness v_old.
            let v_old = assign_free_advice(
                layouter.namespace(|| "witness v_old"),
                config.advices[0],
                self.v_old,
            )?;

            // Witness nf_pos.
            let nf_pos = assign_free_advice(
                layouter.namespace(|| "witness nf_pos"),
                config.advices[0],
                self.nf_pos.map(|n| Fp::from(n as u64)),
            )?;

            // Witness nf_start.
            let nf_start = assign_free_advice(
                layouter.namespace(|| "witness nf_start"),
                config.advices[0],
                self.nf_start.map(|nf| nf.0),
            )?;

            // Witness nf_end as the first level of the Merkle path
            // By construction of the exclusion nullifier MT,
            // Leaves of the tree are pairs of nf_start, nf_end,
            // therefore nf_start is always the left node and
            // nf_end the sibling
            let nf_end = assign_free_advice(
                layouter.namespace(|| "witness nf_end"),
                config.advices[0],
                self.nf_path.map(|p| p[0].0),
            )?;

            (
                domain, psi_old, rho_old, cm_old, g_d_old, ak_P, nk, v_old, nf_pos, nf_start, nf_end,
            )
        };

        // Merkle path validity check (https://p.z.cash/ZKS:action-merkle-path-validity?partial).
        let root = {
            let path = self
                .path
                .map(|typed_path| typed_path.map(|node| node.inner()));
            let merkle_inputs = MerklePath::construct(
                [config.merkle_chip_1(), config.merkle_chip_2()],
                OrchardHashDomains::MerkleCrh,
                self.pos,
                path,
            );
            let leaf = cm_old.extract_p().inner().clone();
            merkle_inputs.calculate_root(layouter.namespace(|| "Merkle path"), leaf)?
        };

        // Nullifier root
        let nf_root = {
            let path = self
                .nf_path
                .map(|typed_path| typed_path.map(|node| node.inner()));
            let merkle_inputs = MerklePath::construct(
                [config.merkle_chip_1(), config.merkle_chip_2()],
                OrchardHashDomains::MerkleCrh,
                self.nf_pos,
                path,
            );
            merkle_inputs.calculate_root(layouter.namespace(|| "Merkle path"), nf_start.clone())?
        };

        // Value commitment integrity (https://p.z.cash/ZKS:action-cv-net-integrity?partial).
        let v_net_magnitude_sign = {
            // Witness the magnitude and sign of v_net = v_old - v_new
            let v_net_magnitude_sign = {
                // sign is always = 1 because v_new = 0
                let v_net = self.v_old - Value::known(NoteValue::zero());
                let magnitude = v_net.map(|v_net| {
                    let (magnitude, _) = v_net.magnitude_sign();
                    pallas::Base::from(magnitude)
                });

                let magnitude = assign_free_advice(
                    layouter.namespace(|| "v_net magnitude"),
                    config.advices[9],
                    magnitude,
                )?;
                let sign = assign_free_advice(
                    layouter.namespace(|| "v_net sign"),
                    config.advices[9],
                    Value::known(pallas::Base::one()),
                )?;
                (magnitude, sign)
            };

            let v_net = ScalarFixedShort::new(
                ecc_chip.clone(),
                layouter.namespace(|| "v_net"),
                v_net_magnitude_sign.clone(),
            )?;
            let rcv = ScalarFixed::new(
                ecc_chip.clone(),
                layouter.namespace(|| "rcv"),
                self.rcv.as_ref().map(|rcv| rcv.inner()),
            )?;

            let cv_net = crate::circuit::gadget::value_commit_orchard(
                layouter.namespace(|| "cv_net = ValueCommit^Orchard_rcv(v_net)"),
                ecc_chip.clone(),
                v_net,
                rcv,
            )?;

            // Constrain cv_net to equal public input
            layouter.constrain_instance(cv_net.inner().x().cell(), config.primary, CV_NET_X)?;
            layouter.constrain_instance(cv_net.inner().y().cell(), config.primary, CV_NET_Y)?;

            // Return the magnitude and sign so we can use them in the Orchard gate.
            v_net_magnitude_sign
        };

        // Nullifier integrity (https://p.z.cash/ZKS:action-nullifier-integrity).
        let nf_old = crate::circuit::gadget::derive_nullifier(
            layouter.namespace(|| "nf_old = DeriveNullifier_nk(rho_old, psi_old, cm_old)"),
            config.poseidon_chip(),
            config.add_chip(),
            ecc_chip.clone(),
            rho_old.clone(),
            &psi_old,
            &cm_old,
            nk.clone(),
        )?;

        // Domain Nullifier integrity (https://p.z.cash/ZKS:action-nullifier-integrity).
        {
            let domain_nf = crate::circuit::gadget::derive_domain_nullifier(
                layouter.namespace(|| "domain_nf = DeriveNullifier_domain_nk(rho_old, psi_old, cm_old)"),
                config.poseidon_chip(),
                config.poseidon_chip(),
                config.add_chip(),
                ecc_chip.clone(),
                domain.clone(),
                rho_old.clone(),
                &psi_old,
                &cm_old,
                nk.clone(),
            )?;

            // Constrain nf_old to equal public input
            layouter.constrain_instance(domain_nf.inner().cell(), config.primary, DOMAIN_NF)?;
        };

        // Spend authority (https://p.z.cash/ZKS:action-spend-authority)
        {
            let alpha =
                ScalarFixed::new(ecc_chip.clone(), layouter.namespace(|| "alpha"), self.alpha)?;

            // alpha_commitment = [alpha] SpendAuthG
            let (alpha_commitment, _) = {
                let spend_auth_g = OrchardFixedBasesFull::SpendAuthG;
                let spend_auth_g = FixedPoint::from_inner(ecc_chip.clone(), spend_auth_g);
                spend_auth_g.mul(layouter.namespace(|| "[alpha] SpendAuthG"), alpha)?
            };

            // [alpha] SpendAuthG + ak_P
            let rk = alpha_commitment.add(layouter.namespace(|| "rk"), &ak_P)?;

            // Constrain rk to equal public input
            layouter.constrain_instance(rk.inner().x().cell(), config.primary, RK_X)?;
            layouter.constrain_instance(rk.inner().y().cell(), config.primary, RK_Y)?;
        }

        // Diversified address integrity (https://p.z.cash/ZKS:action-addr-integrity?partial).
        let pk_d_old = {
            let ivk = {
                let ak = ak_P.extract_p().inner().clone();
                let rivk = ScalarFixed::new(
                    ecc_chip.clone(),
                    layouter.namespace(|| "rivk"),
                    self.rivk.map(|rivk| rivk.inner()),
                )?;

                crate::circuit::gadget::commit_ivk(
                    config.sinsemilla_chip_1(),
                    ecc_chip.clone(),
                    config.commit_ivk_chip(),
                    layouter.namespace(|| "CommitIvk"),
                    ak,
                    nk,
                    rivk,
                )?
            };
            let ivk =
                ScalarVar::from_base(ecc_chip.clone(), layouter.namespace(|| "ivk"), ivk.inner())?;

            // [ivk] g_d_old
            // The scalar value is passed through and discarded.
            let (derived_pk_d_old, _ivk) =
                g_d_old.mul(layouter.namespace(|| "[ivk] g_d_old"), ivk)?;

            // Constrain derived pk_d_old to equal witnessed pk_d_old
            //
            // This equality constraint is technically superfluous, because the assigned
            // value of `derived_pk_d_old` is an equivalent witness. But it's nice to see
            // an explicit connection between circuit-synthesized values, and explicit
            // prover witnesses. We could get the best of both worlds with a write-on-copy
            // abstraction (https://github.com/zcash/halo2/issues/334).
            let pk_d_old = NonIdentityPoint::new(
                ecc_chip.clone(),
                layouter.namespace(|| "witness pk_d_old"),
                self.pk_d_old.map(|pk_d_old| pk_d_old.inner().to_affine()),
            )?;
            derived_pk_d_old
                .constrain_equal(layouter.namespace(|| "pk_d_old equality"), &pk_d_old)?;

            pk_d_old
        };

        // Old note commitment integrity (https://p.z.cash/ZKS:action-cm-old-integrity?partial).
        {
            let rcm_old = ScalarFixed::new(
                ecc_chip.clone(),
                layouter.namespace(|| "rcm_old"),
                self.rcm_old.as_ref().map(|rcm_old| rcm_old.inner()),
            )?;

            // g★_d || pk★_d || i2lebsp_{64}(v) || i2lebsp_{255}(rho) || i2lebsp_{255}(psi)
            let derived_cm_old = crate::circuit::gadget::note_commit(
                layouter.namespace(|| {
                    "g★_d || pk★_d || i2lebsp_{64}(v) || i2lebsp_{255}(rho) || i2lebsp_{255}(psi)"
                }),
                config.sinsemilla_chip_1(),
                config.ecc_chip(),
                config.note_commit_chip_old(),
                g_d_old.inner(),
                pk_d_old.inner(),
                v_old.clone(),
                rho_old,
                psi_old,
                rcm_old,
            )?;

            // Constrain derived cm_old to equal witnessed cm_old
            derived_cm_old.constrain_equal(layouter.namespace(|| "cm_old equality"), &cm_old)?;
        }

        // Range constraint on nf_old
        nf_interval.check_in_interval(layouter.namespace(|| "nf in [nf_start, nf_end]"),
            nf_old.inner().clone(), nf_start, nf_end)?;

        // Constrain the remaining Orchard circuit checks.
        layouter.assign_region(
            || "Orchard circuit checks",
            |mut region| {
                v_old.copy_advice(|| "v_old", &mut region, config.advices[0], 0)?;
                v_net_magnitude_sign.0.copy_advice(
                    || "v_net magnitude",
                    &mut region,
                    config.advices[2],
                    0,
                )?;
                v_net_magnitude_sign.1.copy_advice(
                    || "v_net sign",
                    &mut region,
                    config.advices[3],
                    0,
                )?;
                nf_pos.copy_advice(
                    || "nf_pos",
                    &mut region,
                    config.advices[8],
                    0,
                )?;
                let nf_pos_half = self.nf_pos.map(|v| Fp::from((v / 2) as u64));
                region.assign_advice(|| "half nf_pos", config.advices[9], 0,
                    || nf_pos_half)?;

                root.copy_advice(|| "calculated root", &mut region, config.advices[4], 0)?;
                region.assign_advice_from_instance(
                    || "pub input anchor",
                    config.primary,
                    ANCHOR,
                    config.advices[5],
                    0,
                )?;

                nf_root.copy_advice(|| "calculated nf_root", &mut region, config.advices[6], 0)?;
                region.assign_advice_from_instance(
                    || "pub input nf anchor",
                    config.primary,
                    NF_ANCHOR,
                    config.advices[7],
                    0,
                )?;

                config.q_orchard.enable(&mut region, 0)
            },
        )?;

        Ok(())
    }
}

/// The verifying key for the Orchard Proof of Balance circuit.
#[derive(Debug)]
pub struct VerifyingKey {
    pub(crate) params: halo2_proofs::poly::commitment::Params<vesta::Affine>,
    pub(crate) vk: plonk::VerifyingKey<vesta::Affine>,
}

impl VerifyingKey {
    /// Builds the verifying key.
    pub fn build() -> Self {
        let params = halo2_proofs::poly::commitment::Params::new(K);
        let circuit: Circuit = Default::default();

        let vk = plonk::keygen_vk(&params, &circuit).unwrap();

        VerifyingKey { params, vk }
    }
}

/// The proving key for the Orchard Proof of Balance circuit.
#[derive(Debug)]
pub struct ProvingKey {
    params: halo2_proofs::poly::commitment::Params<vesta::Affine>,
    pk: plonk::ProvingKey<vesta::Affine>,
}

impl ProvingKey {
    /// Builds the proving key.
    pub fn build() -> Self {
        let params = halo2_proofs::poly::commitment::Params::new(K);
        let circuit: Circuit = Default::default();

        let vk = plonk::keygen_vk(&params, &circuit).unwrap();
        let pk = plonk::keygen_pk(&params, vk, &circuit).unwrap();

        ProvingKey { params, pk }
    }
}

/// Public inputs to the Orchard Proof of Balance circuit.
#[derive(Clone, Debug)]
pub struct Instance {
    pub(crate) domain: pallas::Base,
    pub(crate) anchor: Anchor,
    pub(crate) cv_net: ValueCommitment,
    pub(crate) domain_nf: Nullifier,
    pub(crate) rk: VerificationKey<SpendAuth>,
    pub(crate) nf_anchor: Anchor,
}

impl Instance {
    /// Constructs an [`Instance`] from its constituent parts.
    ///
    /// This API can be used in combination with [`Proof::verify`] to build verification
    /// pipelines for many proofs, where you don't want to pass around the full bundle.
    /// Use [`Bundle::verify_proof`] instead if you have the full bundle.
    ///
    /// [`Bundle::verify_proof`]: crate::Bundle::verify_proof
    pub fn from_parts(
        domain: pallas::Base,
        anchor: Anchor,
        cv_net: ValueCommitment,
        domain_nf: Nullifier,
        rk: VerificationKey<SpendAuth>,
        nf_anchor: Anchor,
    ) -> Self {
        Instance {
            domain,
            anchor,
            cv_net,
            domain_nf,
            rk,
            nf_anchor,
        }
    }

    fn to_halo2_instance(&self) -> [[vesta::Scalar; 8]; 1] {
        let mut instance = [vesta::Scalar::zero(); 8];

        instance[DOMAIN] = self.domain;
        instance[ANCHOR] = self.anchor.inner();
        instance[CV_NET_X] = self.cv_net.x();
        instance[CV_NET_Y] = self.cv_net.y();
        instance[DOMAIN_NF] = self.domain_nf.0;

        let rk = pallas::Point::from_bytes(&self.rk.clone().into())
            .unwrap()
            .to_affine()
            .coordinates()
            .unwrap();

        instance[RK_X] = *rk.x();
        instance[RK_Y] = *rk.y();
        instance[NF_ANCHOR] = self.nf_anchor.inner();

        [instance]
    }
}

/// A proof of the validity of an Orchard [`Bundle`].
///
/// [`Bundle`]: crate::bundle::Bundle
#[derive(Clone)]
pub struct Proof(Vec<u8>);

impl fmt::Debug for Proof {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            f.debug_tuple("Proof").field(&self.0).finish()
        } else {
            // By default, only show the proof length, not its contents.
            f.debug_tuple("Proof")
                .field(&format_args!("{} bytes", self.0.len()))
                .finish()
        }
    }
}

impl AsRef<[u8]> for Proof {
    fn as_ref(&self) -> &[u8] {
        &self.0
    }
}

impl DynamicUsage for Proof {
    fn dynamic_usage(&self) -> usize {
        self.0.dynamic_usage()
    }

    fn dynamic_usage_bounds(&self) -> (usize, Option<usize>) {
        self.0.dynamic_usage_bounds()
    }
}

impl Proof {
    /// Creates a proof for the given circuits and instances.
    pub fn create(
        pk: &ProvingKey,
        circuits: &[Circuit],
        instances: &[Instance],
        mut rng: impl RngCore,
    ) -> Result<Self, plonk::Error> {
        let instances: Vec<_> = instances.iter().map(|i| i.to_halo2_instance()).collect();
        let instances: Vec<Vec<_>> = instances
            .iter()
            .map(|i| i.iter().map(|c| &c[..]).collect())
            .collect();
        let instances: Vec<_> = instances.iter().map(|i| &i[..]).collect();

        let mut transcript = Blake2bWrite::<_, vesta::Affine, _>::init(vec![]);
        plonk::create_proof(
            &pk.params,
            &pk.pk,
            circuits,
            &instances,
            &mut rng,
            &mut transcript,
        )?;
        Ok(Proof(transcript.finalize()))
    }

    /// Verifies this proof with the given instances.
    pub fn verify(&self, vk: &VerifyingKey, instances: &[Instance]) -> Result<(), plonk::Error> {
        let instances: Vec<_> = instances.iter().map(|i| i.to_halo2_instance()).collect();
        let instances: Vec<Vec<_>> = instances
            .iter()
            .map(|i| i.iter().map(|c| &c[..]).collect())
            .collect();
        let instances: Vec<_> = instances.iter().map(|i| &i[..]).collect();

        let strategy = SingleVerifier::new(&vk.params);
        let mut transcript = Blake2bRead::init(&self.0[..]);
        plonk::verify_proof(&vk.params, &vk.vk, strategy, &instances, &mut transcript)
    }

    /// Adds this proof to the given batch for verification with the given instances.
    ///
    /// Use this API if you want more control over how proof batches are processed. If you
    /// just want to batch-validate Orchard bundles, use [`bundle::BatchValidator`].
    ///
    /// [`bundle::BatchValidator`]: crate::bundle::BatchValidator
    pub fn add_to_batch(&self, batch: &mut BatchVerifier<vesta::Affine>, instances: Vec<Instance>) {
        let instances = instances
            .iter()
            .map(|i| {
                i.to_halo2_instance()
                    .into_iter()
                    .map(|c| c.into_iter().collect())
                    .collect()
            })
            .collect();

        batch.add_proof(instances, self.0.clone());
    }

    /// Constructs a new Proof value.
    pub fn new(bytes: Vec<u8>) -> Self {
        Proof(bytes)
    }
}

impl Config {
    fn add_chip(&self) -> add_chip::AddChip {
        add_chip::AddChip::construct(self.add_config.clone())
    }

    fn commit_ivk_chip(&self) -> CommitIvkChip {
        CommitIvkChip::construct(self.commit_ivk_config.clone())
    }

    fn ecc_chip(&self) -> EccChip<OrchardFixedBases> {
        EccChip::construct(self.ecc_config.clone())
    }

    fn sinsemilla_chip_1(
        &self,
    ) -> SinsemillaChip<OrchardHashDomains, OrchardCommitDomains, OrchardFixedBases> {
        SinsemillaChip::construct(self.sinsemilla_config_1.clone())
    }

    fn sinsemilla_chip_2(
        &self,
    ) -> SinsemillaChip<OrchardHashDomains, OrchardCommitDomains, OrchardFixedBases> {
        SinsemillaChip::construct(self.sinsemilla_config_2.clone())
    }

    fn merkle_chip_1(
        &self,
    ) -> MerkleChip<OrchardHashDomains, OrchardCommitDomains, OrchardFixedBases> {
        MerkleChip::construct(self.merkle_config_1.clone())
    }

    fn merkle_chip_2(
        &self,
    ) -> MerkleChip<OrchardHashDomains, OrchardCommitDomains, OrchardFixedBases> {
        MerkleChip::construct(self.merkle_config_2.clone())
    }

    fn poseidon_chip(&self) -> PoseidonChip<pallas::Base, 3, 2> {
        PoseidonChip::construct(self.poseidon_config.clone())
    }

    fn note_commit_chip_old(&self) -> NoteCommitChip {
        NoteCommitChip::construct(self.old_note_commit_config.clone())
    }
}

///
/// Create a Proof of Balance
pub fn create_proof<R: RngCore + CryptoRng>(
    domain: Fp,
    spauth: SpendAuthorizingKey,
    fvk: &FullViewingKey,
    note: &Note,
    cmx_path: MerklePathOrchard,
    nf_path: MerklePathOrchard,
    nf_start: Fp,
    alpha: Fq,
    cmx_root: Option<Anchor>,
    nf_root: Option<Anchor>,
    mut rng: R,
) -> Result<ProofBalance, plonk::Error> {
    // Prepare the advices for the circuit
    // They are the same as the Orchard circuit
    // + nullifier exclusion path
    let cmx = note.commitment();
    let cmx = ExtractedNoteCommitment::from(cmx);
    let anchor = cmx_path.root(cmx);
    if let Some(expected_cmx_root) = cmx_root {
        if anchor != expected_cmx_root {
            return Err(plonk::Error::InvalidInstances);
        }
    }
    println!("cmx {:?}", anchor);

    let spend = SpendInfo::new(fvk.clone(), note.clone(), cmx_path).unwrap();
    let rsk = spauth.randomize(&alpha);
    let rk = VerificationKey::from(&rsk);

    // regular nullifier
    let _nf = note.nullifier(&fvk);
    // proof of balance nullifier
    let domain_nf = note.nullifier_domain(&fvk, domain);
    let nf_anchor = nf_path.root(ExtractedNoteCommitment::from_bytes(&nf_start.to_repr()).unwrap());
    println!("nf {:?}", nf_anchor);
    if let Some(expected_nf_root) = nf_root {
        if nf_anchor != expected_nf_root {
            return Err(plonk::Error::InvalidInstances);
        }
    }

    let rcv = ValueCommitTrapdoor::random(&mut rng);
    let nf_circuit =
        Circuit::from_action_context(spend, alpha, rcv.clone(), Nullifier(nf_start), nf_path);
    let nv = note.value().inner();
    let cv = ValueCommitment::derive(ValueSum::from_raw(nv as i64), rcv.clone());

    // Prepare the instance data
    // Same as Orchard
    // - old nullifer
    // + domain
    // + root of nullifier exclusion tree
    // + domain nullifier

    let instance = Instance::from_parts(
        domain,
        Anchor::from(anchor),
        cv.clone(),
        domain_nf,
        rk.clone(),
        nf_anchor,
    );

    let instances = instance.to_halo2_instance();
    let fp_instance = instances[0].to_vec();

    // Check the circuit with the mock prover
    let prover = halo2_proofs::dev::MockProver::run(12, &nf_circuit, vec![fp_instance])?;
    prover.verify().unwrap();

    // Create the proof
    let pk = ProvingKey::build();
    let proof = Proof::create(&pk, &[nf_circuit], slice::from_ref(&instance), &mut rng)?;

    let vk = VerifyingKey::build();
    proof.verify(&vk, &[instance])?;

    let pb = ProofBalance {
        private: ProofBalancePrivate {
            value: nv,
            alpha,
            rcv,
        },
        public: ProofBalancePublic {
            cv,
            domain_nf,
            rk,
            proof,
            cmx_root: anchor,
            nf_root: nf_anchor,
        },
    };
    Ok(pb)
}

///
pub fn verify_proof(
    domain: Fp,
    proof: &ProofBalancePublic,
) -> Result<(), plonk::Error> {
    let vk = VerifyingKey::build();
    let instance = Instance::from_parts(
        domain,
        proof.cmx_root,
        proof.cv.clone(),
        proof.domain_nf,
        proof.rk.clone(),
        proof.nf_root,
    );
    proof.proof.verify(&vk, &[instance])?;
    Ok(())
}

#[derive(Clone, Debug)]
pub struct ProofBalancePrivate {
    /// Value in zats
    pub value: u64,
    /// randomization factor
    pub alpha: Fq,
    /// value commitment trapdor
    pub rcv: ValueCommitTrapdoor,
}

/// Public part
#[derive(Clone, Debug)]
pub struct ProofBalancePublic {
    /// Value commitment
    pub cv: ValueCommitment,
    /// Domain Nullifier
    pub domain_nf: Nullifier,
    /// Randomized Public Key
    pub rk: VerificationKey<SpendAuth>,
    /// ZKP
    pub proof: Proof,
    /// Root of Nullifier Tree
    pub cmx_root: Anchor,
    /// Root of Note Commitment Tree
    pub nf_root: Anchor,
}

/// Proof of Balance Package
#[derive(Clone, Debug)]
pub struct ProofBalance {
    /// Private/Secret part. It should leave the prover
    pub private: ProofBalancePrivate,
    /// Public part. Can be distributed
    pub public: ProofBalancePublic,
}

#[cfg(test)]
pub mod tests {
    use std::slice;

    use bridgetree::BridgeTree;
    use ff::Field;
    use halo2_proofs::dev::MockProver;
    use pallas::{Base as Fp, Scalar as Fq};
    use rand::rngs::OsRng;
    use tracing::{event, span, Level};
    use zip32::Scope;

    use crate::{
        keys::SpendAuthorizingKey,
        note::{ExtractedNoteCommitment, RandomSeed},
        tree::{MerkleHashOrchard, MerklePath as MP},
        value::ValueSum,
        Note,
    };

    use super::*;

    #[test]
    pub fn test_domain_nf() -> std::result::Result<(), Box<dyn std::error::Error>> {
        let span = span!(Level::TRACE, "test_domain_nf");
        let _enter = span.enter();
        event!(Level::INFO, "Pick random nullifier domain");
        let domain = Fp::random(OsRng);

        event!(Level::INFO, "Create dummy note to spend");
        let (sk, fvk, n) = Note::dummy(&mut OsRng, None);
        let spauth = SpendAuthorizingKey::from(&sk);

        // The dummy note has value == 0, therefore we need to create a real one
        let address = fvk.address_at(0u64, Scope::External);
        let nv = NoteValue::from_raw(1_000_000);
        let rseed = RandomSeed::random(&mut OsRng, &n.rho());
        let note = Note::from_parts(address, nv, n.rho(), rseed).unwrap();

        event!(Level::INFO, "Calculating cmx");
        let cm = note.commitment();
        let cmx = ExtractedNoteCommitment::from(cm.clone());

        event!(Level::INFO, "Calculating nullifiers");
        // regular nullifier
        let nf_old = note.nullifier(&fvk);
        // proof of balance nullifier
        let domain_nf = note.nullifier_domain(&fvk, domain);

        event!(Level::INFO, "Building test cmx tree");
        // Create a test note commitment tree
        let mut cm_tree = BridgeTree::<MerkleHashOrchard, u32, 32>::new(4);

        // Insert some random notes, ...
        for _ in 0..60 {
            let cm = Fp::random(OsRng);
            cm_tree.append(MerkleHashOrchard(cm));
        }
        // ... then our note,
        cm_tree.append(MerkleHashOrchard::from_cmx(&cmx));
        let pos = cm_tree.mark().unwrap();

        // ... some more random notes
        for _ in 0..60 {
            let cm = Fp::random(OsRng);
            cm_tree.append(MerkleHashOrchard(cm));
        }

        event!(Level::INFO, "Calculating root of cmx tree");
        // Get the anchor & merkle path of the note commitment tree
        let auth_path: [_; 32] = cm_tree.witness(pos, 0).unwrap().try_into().unwrap();
        let merkle_path = MP::from_parts(u64::from(pos) as u32, auth_path);
        let anchor = cm_tree.root(0).unwrap().inner();

        event!(Level::INFO, "Building test nullifier exclusion tree");
        // Generate some random nullifiers
        let mut nullifiers: Vec<Fp> = vec![];
        const N: usize = 100;
        for _ in 0..N {
            nullifiers.push(Fp::random(OsRng));
        }
        nullifiers.sort();

        // Create the nullifier exclusion tree
        let mut nf_tree = BridgeTree::<MerkleHashOrchard, u32, 32>::new(4);
        let mut nf_pos = None;
        let mut nf_start_end = None;

        for i in 0..=N {
            // Determine the (start, end) of the exclusion ranges
            // (0, nf_0 - 1), (nf_0 + 1, nf_1 - 1), ... , (nf_{N-1} + 1, Fp::MAX)
            let start = if i == 0 {
                Fp::zero()
            } else {
                nullifiers[i - 1] + Fp::one()
            };
            let end = if i == N {
                Fp::one().neg()
            } else {
                nullifiers[i] - Fp::one()
            };

            // Only add the intervals that are not empty
            if start <= end {
                nf_tree.append(MerkleHashOrchard(start));
                if nf_old.0 > start && nf_old.0 < end {
                    // Mark our nullifier if it is in the current range
                    nf_pos = nf_tree.mark();
                    nf_start_end = Some((start, end));
                }
                nf_tree.append(MerkleHashOrchard(end));
            }
        }

        let nf_pos = nf_pos.expect("NF hit one of the spent notes by luck");
        let nf_path = nf_tree.witness(nf_pos, 0).unwrap();

        // Leaves were inserted in pairs (start, end)
        // and we marked the start. Therefore the first sibling must be end
        let (nf_start, nf_end) = nf_start_end.unwrap();
        let nf_start = Nullifier(nf_start);
        let nf_end = Nullifier(nf_end);
        assert_eq!(nf_path[0].0, nf_end.0);

        event!(Level::INFO, "Calculating root of nullifier exclusion tree");
        // Compute the anchor and merkle path of the nullifier exclusion tree
        let nf_path: [MerkleHashOrchard; 32] = nf_path.try_into().unwrap();
        let nf_anchor = Anchor::from(nf_tree.root(0).unwrap());

        // Prepare the advices for the circuit
        // They are the same as the Orchard circuit
        // + nullifier exclusion path
        event!(Level::INFO, "Preparing advice data");
        let spend = SpendInfo::new(fvk, note, merkle_path).unwrap();
        let alpha = Fq::random(OsRng);
        let rsk = spauth.randomize(&alpha);
        let rk = VerificationKey::from(&rsk);

        let rcv = ValueCommitTrapdoor::random(OsRng);
        let nf_path = MerklePathOrchard::from_parts(u64::from(nf_pos) as u32, nf_path);
        let nf_circuit = Circuit::from_action_context(spend, alpha, rcv.clone(), nf_start, nf_path);
        let cv = ValueCommitment::derive(ValueSum::from_raw(nv.inner() as i64), rcv);

        // Prepare the instance data
        // Same as Orchard
        // - old nullifer
        // + domain
        // + root of nullifier exclusion tree
        // + domain nullifier
        //
        event!(Level::INFO, "Preparing instance data");
        let instance =
            Instance::from_parts(domain, Anchor::from(anchor), cv, domain_nf, rk, nf_anchor);
        let instances = instance.to_halo2_instance();
        let fp_instance = instances[0].to_vec();

        // Check the circuit with the mock prover
        event!(Level::INFO, "Running mock prover");
        let prover = MockProver::run(12, &nf_circuit, vec![fp_instance])?;
        prover.verify().unwrap();

        // Create the proof
        event!(Level::INFO, "Creating zk proof");
        let pk = ProvingKey::build();
        let proof = Proof::create(&pk, &[nf_circuit], slice::from_ref(&instance), OsRng)?;

        // Verify it
        event!(Level::INFO, "Verifying zk proof");
        let vk = VerifyingKey::build();
        proof.verify(&vk, &[instance])?;

        event!(Level::INFO, "All done");
        Ok(())
    }
}
