//! Signing ceremony engine (coordinator and participant roles).
//!
//! Mirrors upstream `frost_client::coordinator::comms::http` and
//! `frost_client::participant::comms::http`, restructured as cancellable
//! async tasks with progress events. The participant flow pauses at an
//! approval gate after the message is known but before the round-2
//! signature share is produced (round-1 commitments are message-independent,
//! so nothing secret is committed before approval).

use std::collections::HashMap;

use frost_client::api::{self, PublicKey, SendSigningPackageArgs, Uuid};
use frost_client::cipher::{Cipher, PrivateKey};
use frost_client::session::CoordinatorSessionState;
use frost_core::keys::{KeyPackage, PublicKeyPackage};
use frost_core::{self as frost, Ciphersuite, Identifier, SigningPackage};
use frost_ed25519::Ed25519Sha512;
use frost_rerandomized::{RandomizedCiphersuite, Randomizer};
use rand::rngs::OsRng;
use reddsa::frost::redpallas::PallasBlake2b512;
use tokio::sync::{mpsc, oneshot};
use tokio_util::sync::CancellationToken;

use crate::ciphersuite::Suite;
use crate::error::CoreError;
use crate::events::{CoordinatorEvent, ParticipantEvent};
use crate::transport::{FrostdClient, ServerTrust};

fn cerr(e: Box<dyn std::error::Error>) -> CoreError {
    CoreError::Ceremony(e.to_string())
}

// ---------------------------------------------------------------------------
// Coordinator
// ---------------------------------------------------------------------------

pub struct CoordinatorParams {
    pub server_url: String,
    pub trust: ServerTrust,
    pub comm_privkey: PrivateKey,
    pub comm_pubkey: PublicKey,
    /// Postcard-encoded `PublicKeyPackage` from the group config.
    pub public_key_package: Vec<u8>,
    /// The raw message to sign (for Zcash, a future tx builder supplies the
    /// sighash here).
    pub message: Vec<u8>,
    /// Selected signers: comm pubkey -> serialized FROST identifier, both
    /// taken from the group config. May include the coordinator itself.
    pub signers: Vec<(PublicKey, Vec<u8>)>,
    /// Postcard-encoded `KeyPackage` for the coordinator's own share. Used
    /// only when the coordinator is itself one of the selected signers, so it
    /// can contribute its commitment and signature share locally instead of
    /// waiting for them over the network (which would never arrive).
    pub self_key_package: Vec<u8>,
    /// Externally-supplied re-randomization value (α), serialized. For a real
    /// Zcash Orchard spend the randomizer is dictated by the transaction (so
    /// the signature verifies against the on-chain `rk = ak + [α]·G`); supply
    /// it here. When `None`, a fresh random α is generated for RedPallas (the
    /// default for standalone signing).
    pub randomizer: Option<Vec<u8>>,
    /// Optional JSON-encoded [`crate::events::SigningContext`] describing the
    /// transaction, forwarded to participants over the signing package's
    /// `aux_msg` side channel so they can review it at the approval gate.
    /// Empty for standalone (non-wallet) signing.
    pub send_context: Vec<u8>,
}

pub struct SigningOutput {
    /// Serialized group signature.
    pub signature: Vec<u8>,
}

pub async fn run_coordinator(
    suite: Suite,
    params: CoordinatorParams,
    events: mpsc::Sender<CoordinatorEvent>,
    cancel: CancellationToken,
) -> Result<SigningOutput, CoreError> {
    match suite {
        Suite::Ed25519 => run_coordinator_generic::<Ed25519Sha512>(params, events, cancel).await,
        Suite::RedPallas => {
            run_coordinator_generic::<PallasBlake2b512>(params, events, cancel).await
        }
    }
}

async fn run_coordinator_generic<C: RandomizedCiphersuite + 'static>(
    params: CoordinatorParams,
    events: mpsc::Sender<CoordinatorEvent>,
    cancel: CancellationToken,
) -> Result<SigningOutput, CoreError> {
    let public_key_package: PublicKeyPackage<C> = postcard::from_bytes(&params.public_key_package)
        .map_err(|e| CoreError::Config(format!("bad public key package: {e}")))?;

    let signers: HashMap<PublicKey, Identifier<C>> = params
        .signers
        .iter()
        .map(|(pubkey, id_bytes)| {
            Ok((
                pubkey.clone(),
                Identifier::<C>::deserialize(id_bytes)
                    .map_err(|e| CoreError::Ceremony(e.to_string()))?,
            ))
        })
        .collect::<Result<_, CoreError>>()?;
    if signers.is_empty() {
        return Err(CoreError::Ceremony("no signers selected".into()));
    }

    // Split the selected signers into the coordinator itself (if chosen) and
    // the external signers who participate over the network. The coordinator
    // contributes its own commitment/share locally, so it is excluded from the
    // session's participant set and the network rounds.
    let self_signer: Option<(Identifier<C>, KeyPackage<C>)> =
        match signers.get(&params.comm_pubkey).copied() {
            Some(id) => {
                let kp: KeyPackage<C> = postcard::from_bytes(&params.self_key_package)
                    .map_err(|e| CoreError::Config(format!("bad self key package: {e}")))?;
                Some((id, kp))
            }
            None => None,
        };
    let external: HashMap<PublicKey, Identifier<C>> = signers
        .iter()
        .filter(|(pubkey, _)| **pubkey != params.comm_pubkey)
        .map(|(pubkey, id)| (pubkey.clone(), *id))
        .collect();

    let mut client = FrostdClient::new(format!("https://{}", params.server_url), &params.trust)?;
    let _ = events.send(CoordinatorEvent::Connecting).await;
    client.login(&params.comm_privkey, &params.comm_pubkey).await?;
    let _ = events
        .send(CoordinatorEvent::Connected {
            server: params.server_url.clone(),
        })
        .await;

    let session_id = client
        .create_new_session(&api::CreateNewSessionArgs {
            pubkeys: external.keys().cloned().collect(),
            message_count: 1,
        })
        .await?
        .session_id;
    let _ = events
        .send(CoordinatorEvent::SessionCreated { session_id })
        .await;

    let result = coordinator_rounds(
        &client,
        session_id,
        &params,
        &public_key_package,
        external,
        self_signer,
        &events,
        &cancel,
    )
    .await;

    // Always try to close the session; the server also expires it after 24h.
    let _ = client
        .close_session(&api::CloseSessionArgs { session_id })
        .await;
    let _ = client.logout().await;
    result
}

#[allow(clippy::too_many_arguments)]
async fn coordinator_rounds<C: RandomizedCiphersuite + 'static>(
    client: &FrostdClient,
    session_id: Uuid,
    params: &CoordinatorParams,
    public_key_package: &PublicKeyPackage<C>,
    external: HashMap<PublicKey, Identifier<C>>,
    self_signer: Option<(Identifier<C>, KeyPackage<C>)>,
    events: &mpsc::Sender<CoordinatorEvent>,
    cancel: &CancellationToken,
) -> Result<SigningOutput, CoreError> {
    let num_external = external.len();
    let mut cipher = Cipher::new(params.comm_privkey.clone(), external.keys().cloned().collect())
        .map_err(|e| CoreError::Crypto(e.to_string()))?;

    let mut state = CoordinatorSessionState::<C>::new(1, num_external, external);

    // The coordinator's own round-1 commitment, held locally (never sent over
    // the wire — it is folded directly into the signing package).
    let self_round1 = self_signer
        .as_ref()
        .map(|(_, kp)| frost::round1::commit(kp.signing_share(), &mut OsRng));

    // Round 1: collect commitments from the external signers.
    let _ = events.send(CoordinatorEvent::WaitingForCommitments).await;
    while num_external > 0 && !state.has_commitments() {
        let r = client
            .receive(&api::ReceiveArgs {
                session_id,
                as_coordinator: true,
            })
            .await?;
        for msg in r.msgs {
            let msg = cipher
                .decrypt(msg)
                .map_err(|e| CoreError::Crypto(e.to_string()))?;
            // Attribute the round-1 commitment to its sender so the session-
            // visibility UI can mark that participant as joined (#4).
            let sender_hex = hex::encode(&msg.sender.0);
            state.recv(msg).map_err(cerr)?;
            let _ = events
                .send(CoordinatorEvent::ParticipantJoined { pubkey: sender_hex })
                .await;
        }
        if state.has_commitments() {
            break;
        }
        tokio::select! {
            _ = cancel.cancelled() => return Err(CoreError::Cancelled),
            _ = tokio::time::sleep(std::time::Duration::from_secs(2)) => {}
        }
    }

    // Merge external commitments with the coordinator's own.
    let (mut commitments_map, recipients) = if num_external > 0 {
        let (commitments, pubkeys) = state.commitments().map_err(cerr)?;
        (commitments[0].clone(), pubkeys.keys().cloned().collect::<Vec<_>>())
    } else {
        (std::collections::BTreeMap::new(), Vec::new())
    };
    if let (Some((id, _)), Some((_, commitment))) = (&self_signer, &self_round1) {
        commitments_map.insert(*id, *commitment);
    }

    // Build the signing package; RedPallas additionally needs a randomizer
    // (re-randomized FROST). Use the externally-supplied α when present (e.g.
    // the randomizer of the Orchard spend being signed); otherwise generate a
    // fresh one for RedPallas, and none for plain ciphersuites.
    let signing_package = SigningPackage::<C>::new(commitments_map, &params.message);
    let randomizer = match &params.randomizer {
        Some(bytes) => Some(
            Randomizer::<C>::deserialize(bytes)
                .map_err(|e| CoreError::Ceremony(format!("invalid randomizer: {e}")))?,
        ),
        None if C::ID == PallasBlake2b512::ID => Some(
            Randomizer::<C>::new(OsRng, &signing_package)
                .map_err(|e| CoreError::Ceremony(e.to_string()))?,
        ),
        None => None,
    };

    let send_args = SendSigningPackageArgs::<C> {
        signing_package: vec![signing_package.clone()],
        // Carry the human-readable transaction context to participants so their
        // approval gate can show what the sighash represents (C-1: no blind
        // signing). Empty for standalone signing.
        aux_msg: params.send_context.clone(),
        randomizer: randomizer.map(|r| vec![r]).unwrap_or_default(),
    };
    // Encrypted separately per recipient (the Noise sessions are pairwise).
    for recipient in recipients {
        let msg = cipher
            .encrypt(
                Some(&recipient),
                serde_json::to_vec(&send_args).map_err(|e| CoreError::Ceremony(e.to_string()))?,
            )
            .map_err(|e| CoreError::Crypto(e.to_string()))?;
        client
            .send(&api::SendArgs {
                session_id,
                recipients: vec![recipient.clone()],
                msg,
            })
            .await?;
    }
    let _ = events.send(CoordinatorEvent::SigningPackageSent).await;

    // The coordinator's own round-2 signature share, produced locally.
    let self_share = match (&self_signer, &self_round1) {
        (Some((_, kp)), Some((nonces, _))) => Some(if !send_args.randomizer.is_empty() {
            frost_rerandomized::sign::<C>(&signing_package, nonces, kp, send_args.randomizer[0])
                .map_err(|e| CoreError::Ceremony(e.to_string()))?
        } else {
            frost::round2::sign(&signing_package, nonces, kp)
                .map_err(|e| CoreError::Ceremony(e.to_string()))?
        }),
        _ => None,
    };

    // Round 2: collect signature shares from external signers.
    let _ = events.send(CoordinatorEvent::WaitingForShares).await;
    while num_external > 0 && !state.has_signature_shares() {
        let r = client
            .receive(&api::ReceiveArgs {
                session_id,
                as_coordinator: true,
            })
            .await?;
        for msg in r.msgs {
            let msg = cipher
                .decrypt(msg)
                .map_err(|e| CoreError::Crypto(e.to_string()))?;
            // Attribute the round-2 share to its sender: they have approved and
            // signed the pending transaction plan (#4).
            let sender_hex = hex::encode(&msg.sender.0);
            state.recv(msg).map_err(cerr)?;
            let _ = events
                .send(CoordinatorEvent::ParticipantApproved { pubkey: sender_hex })
                .await;
        }
        if state.has_signature_shares() {
            break;
        }
        tokio::select! {
            _ = cancel.cancelled() => return Err(CoreError::Cancelled),
            _ = tokio::time::sleep(std::time::Duration::from_secs(2)) => {}
        }
    }
    let _ = events.send(CoordinatorEvent::Aggregating).await;

    // Merge external shares with the coordinator's own.
    let mut shares_map = if num_external > 0 {
        state.signature_shares().map_err(cerr)?[0].clone()
    } else {
        std::collections::BTreeMap::new()
    };
    if let (Some((id, _)), Some(share)) = (&self_signer, self_share) {
        shares_map.insert(*id, share);
    }

    // Aggregate (rerandomized for RedPallas); aggregation verifies the
    // result against the (randomized) group verifying key internally.
    let signature = if !send_args.randomizer.is_empty() {
        let randomizer_params = frost_rerandomized::RandomizedParams::<C>::from_randomizer(
            public_key_package.verifying_key(),
            send_args.randomizer[0],
        );
        frost_rerandomized::aggregate(
            &signing_package,
            &shares_map,
            public_key_package,
            &randomizer_params,
        )
        .map_err(|e| CoreError::Ceremony(e.to_string()))?
    } else {
        frost::aggregate::<C>(&signing_package, &shares_map, public_key_package)
            .map_err(|e| CoreError::Ceremony(e.to_string()))?
    };

    Ok(SigningOutput {
        signature: signature
            .serialize()
            .map_err(|e| CoreError::Ceremony(e.to_string()))?,
    })
}

// ---------------------------------------------------------------------------
// Participant
// ---------------------------------------------------------------------------

pub struct ParticipantParams {
    pub server_url: String,
    pub trust: ServerTrust,
    pub comm_privkey: PrivateKey,
    pub comm_pubkey: PublicKey,
    /// Postcard-encoded `KeyPackage` from the group config.
    pub key_package: Vec<u8>,
    /// The session to join.
    pub session_id: Uuid,
    /// Comm pubkeys of the group members; the session coordinator must be
    /// one of them.
    pub group_pubkeys: Vec<PublicKey>,
}

pub async fn run_participant(
    suite: Suite,
    params: ParticipantParams,
    approval: oneshot::Receiver<bool>,
    events: mpsc::Sender<ParticipantEvent>,
    cancel: CancellationToken,
) -> Result<(), CoreError> {
    match suite {
        Suite::Ed25519 => {
            run_participant_generic::<Ed25519Sha512>(params, approval, events, cancel).await
        }
        Suite::RedPallas => {
            run_participant_generic::<PallasBlake2b512>(params, approval, events, cancel).await
        }
    }
}

async fn run_participant_generic<C: RandomizedCiphersuite + 'static>(
    params: ParticipantParams,
    approval: oneshot::Receiver<bool>,
    events: mpsc::Sender<ParticipantEvent>,
    cancel: CancellationToken,
) -> Result<(), CoreError> {
    let key_package: KeyPackage<C> = postcard::from_bytes(&params.key_package)
        .map_err(|e| CoreError::Config(format!("bad key package: {e}")))?;

    let mut client = FrostdClient::new(format!("https://{}", params.server_url), &params.trust)?;
    let _ = events.send(ParticipantEvent::Connecting).await;
    client.login(&params.comm_privkey, &params.comm_pubkey).await?;
    let _ = events
        .send(ParticipantEvent::Connected {
            server: params.server_url.clone(),
        })
        .await;

    let session_id = params.session_id;

    // The coordinator must be a member of the group we're signing for;
    // otherwise someone unknown is asking us to sign.
    let session_info = client
        .get_session_info(&api::GetSessionInfoArgs { session_id })
        .await?;
    if !params.group_pubkeys.contains(&session_info.coordinator_pubkey) {
        return Err(CoreError::Ceremony(
            "session coordinator is not a member of this group".into(),
        ));
    }

    let mut cipher = Cipher::new(
        params.comm_privkey.clone(),
        vec![session_info.coordinator_pubkey.clone()],
    )
    .map_err(|e| CoreError::Crypto(e.to_string()))?;

    // Round 1 (message-independent): commit and send.
    let (nonces, commitments) = frost::round1::commit(key_package.signing_share(), &mut OsRng);
    let msg = cipher
        .encrypt(
            None,
            serde_json::to_vec(&vec![commitments])
                .map_err(|e| CoreError::Ceremony(e.to_string()))?,
        )
        .map_err(|e| CoreError::Crypto(e.to_string()))?;
    client
        .send(&api::SendArgs {
            session_id,
            recipients: vec![], // empty = the coordinator
            msg,
        })
        .await?;
    let _ = events.send(ParticipantEvent::CommitmentsSent).await;

    // Wait for the signing package.
    let send_args: SendSigningPackageArgs<C> = loop {
        let r = client
            .receive(&api::ReceiveArgs {
                session_id,
                as_coordinator: false,
            })
            .await?;
        if let Some(msg) = r.msgs.into_iter().next() {
            let msg = cipher
                .decrypt(msg)
                .map_err(|e| CoreError::Crypto(e.to_string()))?;
            break serde_json::from_slice(&msg.msg)
                .map_err(|e| CoreError::Ceremony(e.to_string()))?;
        }
        tokio::select! {
            _ = cancel.cancelled() => return Err(CoreError::Cancelled),
            _ = tokio::time::sleep(std::time::Duration::from_secs(2)) => {}
        }
    };

    let signing_package = send_args
        .signing_package
        .first()
        .ok_or_else(|| CoreError::Ceremony("empty signing package".into()))?;

    // Decode the coordinator-supplied transaction context, if any, so the
    // approval gate can show what the sighash represents rather than raw hex.
    // Advisory only: malformed context is ignored (falls back to hex display).
    let context = if send_args.aux_msg.is_empty() {
        None
    } else {
        serde_json::from_slice::<crate::events::SigningContext>(&send_args.aux_msg).ok()
    };

    // Approval gate: surface the message and wait for the user. No secret
    // material has been revealed yet — only nonce commitments.
    let _ = events
        .send(ParticipantEvent::AwaitingApproval {
            message_hex: hex::encode(signing_package.message()),
            context,
        })
        .await;
    let approved = tokio::select! {
        _ = cancel.cancelled() => return Err(CoreError::Cancelled),
        r = approval => r.unwrap_or(false),
    };
    if !approved {
        let _ = client.logout().await;
        return Err(CoreError::Ceremony("signing rejected by user".into()));
    }

    // Round 2: produce and send the signature share.
    let share = if !send_args.randomizer.is_empty() {
        frost_rerandomized::sign::<C>(
            signing_package,
            &nonces,
            &key_package,
            send_args.randomizer[0],
        )
        .map_err(|e| CoreError::Ceremony(e.to_string()))?
    } else {
        frost::round2::sign(signing_package, &nonces, &key_package)
            .map_err(|e| CoreError::Ceremony(e.to_string()))?
    };

    let msg = cipher
        .encrypt(
            None,
            serde_json::to_vec(&vec![share]).map_err(|e| CoreError::Ceremony(e.to_string()))?,
        )
        .map_err(|e| CoreError::Crypto(e.to_string()))?;
    client
        .send(&api::SendArgs {
            session_id,
            recipients: vec![],
            msg,
        })
        .await?;
    let _ = events.send(ParticipantEvent::ShareSent).await;
    let _ = client.logout().await;
    Ok(())
}

#[cfg(test)]
mod tests {
    //! Crypto-level test of the re-randomization (α) injection that Phase 4
    //! adds: a coordinator-chosen randomizer round-trips through
    //! serialize/deserialize and produces a group signature valid under the
    //! randomized key `rk = ak + [α]·G` — exactly what an Orchard spend needs —
    //! and a signature is bound to its specific α. No frostd server required.

    use std::collections::BTreeMap;

    use frost_core::keys::{generate_with_dealer, IdentifierList, KeyPackage, PublicKeyPackage};
    use frost_core::round2::SignatureShare;
    use frost_core::{Identifier, SigningPackage};
    use frost_rerandomized::{Randomizer, RandomizedParams};
    use rand::rngs::OsRng;
    use reddsa::frost::redpallas::PallasBlake2b512 as C;

    const MSG: &[u8] = b"orchard sighash";

    /// A fresh 2-of-3 RedPallas group plus the two signers' round-1 state.
    fn setup() -> (
        PublicKeyPackage<C>,
        BTreeMap<Identifier<C>, KeyPackage<C>>,
        Vec<Identifier<C>>,
        BTreeMap<Identifier<C>, frost_core::round1::SigningNonces<C>>,
        SigningPackage<C>,
    ) {
        let (shares, pubkeys) =
            generate_with_dealer::<C, _>(3, 2, IdentifierList::Default, &mut OsRng).unwrap();
        let key_packages: BTreeMap<_, _> = shares
            .into_iter()
            .map(|(id, s)| (id, KeyPackage::try_from(s).unwrap()))
            .collect();
        let signers: Vec<_> = key_packages.keys().take(2).cloned().collect();

        let mut nonces = BTreeMap::new();
        let mut commitments = BTreeMap::new();
        for id in &signers {
            let (n, c) = frost_core::round1::commit(key_packages[id].signing_share(), &mut OsRng);
            nonces.insert(*id, n);
            commitments.insert(*id, c);
        }
        let signing_package = SigningPackage::new(commitments, MSG);
        (pubkeys, key_packages, signers, nonces, signing_package)
    }

    fn sign_shares(
        pkg: &SigningPackage<C>,
        kps: &BTreeMap<Identifier<C>, KeyPackage<C>>,
        signers: &[Identifier<C>],
        nonces: &BTreeMap<Identifier<C>, frost_core::round1::SigningNonces<C>>,
        randomizer: Randomizer<C>,
    ) -> BTreeMap<Identifier<C>, SignatureShare<C>> {
        signers
            .iter()
            .map(|id| {
                let share =
                    frost_rerandomized::sign(pkg, &nonces[id], &kps[id], randomizer).unwrap();
                (*id, share)
            })
            .collect()
    }

    #[test]
    fn injected_randomizer_roundtrips_and_signs() {
        let (pubkeys, kps, signers, nonces, pkg) = setup();

        // Coordinator chooses α, serializes it (as it would travel via
        // CoordinatorParams.randomizer / SendSigningPackageArgs), then it is
        // recovered by deserialize before use.
        let chosen = Randomizer::<C>::new(OsRng, &pkg).unwrap();
        let alpha = Randomizer::<C>::deserialize(&chosen.serialize()).expect("round-trip α");

        let params = RandomizedParams::from_randomizer(pubkeys.verifying_key(), alpha);
        let shares = sign_shares(&pkg, &kps, &signers, &nonces, alpha);

        // aggregate() verifies the final signature against rk internally.
        let sig = frost_rerandomized::aggregate(&pkg, &shares, &pubkeys, &params);
        assert!(sig.is_ok(), "must verify under the randomized key rk = ak + [α]·G");
    }

    #[test]
    fn signature_is_bound_to_its_randomizer() {
        let (pubkeys, kps, signers, nonces, pkg) = setup();

        let alpha1 = Randomizer::<C>::new(OsRng, &pkg).unwrap();
        let alpha2 = Randomizer::<C>::new(OsRng, &pkg).unwrap();

        // Shares produced under α1, but aggregated under α2 → must fail.
        let shares = sign_shares(&pkg, &kps, &signers, &nonces, alpha1);
        let params2 = RandomizedParams::from_randomizer(pubkeys.verifying_key(), alpha2);
        let bad = frost_rerandomized::aggregate(&pkg, &shares, &pubkeys, &params2);
        assert!(bad.is_err(), "a signature must not verify under a different α");
    }

    #[test]
    fn deserialize_rejects_malformed_randomizer() {
        assert!(Randomizer::<C>::deserialize(&[0u8; 8]).is_err());
    }
}
