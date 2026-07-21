//! DKG ceremony engine.
//!
//! Mirrors the flow of upstream `frost_client::dkg::comms::http::HTTPComms`
//! and `frost_client::cli::dkg`, restructured as a cancellable async task
//! that reports progress over an mpsc channel instead of stdin/stdout.

use std::collections::{BTreeMap, HashMap, VecDeque};

use frost_client::api::{self, PublicKey, Uuid};
use frost_client::cipher::{Cipher, PrivateKey};
use frost_client::cli::config::{Group, Participant};
use frost_client::dkg::cli::MaybeIntoEvenY;
use frost_client::session::DKGSessionState;
use frost_core::{self as frost, Ciphersuite, Identifier};
use frost_ed25519::Ed25519Sha512;
use rand::rngs::OsRng;
use reddsa::frost::redpallas::PallasBlake2b512;
use tokio::sync::mpsc;
use tokio_util::sync::CancellationToken;

use crate::ciphersuite::Suite;
use crate::error::CoreError;
use crate::events::DkgEvent;
use crate::transport::{FrostdClient, ServerTrust};

pub struct DkgParams {
    /// `host:port` of the frostd server.
    pub server_url: String,
    pub trust: ServerTrust,
    pub comm_privkey: PrivateKey,
    pub comm_pubkey: PublicKey,
    pub description: String,
    pub min_signers: u16,
    /// All session participants (including self) when initiating;
    /// empty to join an existing session.
    pub participants: Vec<PublicKey>,
    /// Pubkeys we recognize (self + address book). Every session member
    /// must be in this set, otherwise the ceremony is aborted.
    pub known_pubkeys: Vec<PublicKey>,
    /// Specific session to join (participants only). If none, the single
    /// active session on the server is used.
    pub session_id: Option<Uuid>,
}

pub struct DkgOutput {
    /// Hex-encoded group verifying key.
    pub group_id: String,
    /// Config entry ready to be inserted into the keystore.
    pub group: Group,
}

/// Convert frost-client's boxed errors at the call site so the non-Send
/// error type never crosses an await point.
fn cerr(e: Box<dyn std::error::Error>) -> CoreError {
    CoreError::Ceremony(e.to_string())
}

pub async fn run_dkg(
    suite: Suite,
    params: DkgParams,
    events: mpsc::Sender<DkgEvent>,
    cancel: CancellationToken,
) -> Result<DkgOutput, CoreError> {
    match suite {
        Suite::Ed25519 => run_dkg_generic::<Ed25519Sha512>(params, events, cancel).await,
        Suite::RedPallas => run_dkg_generic::<PallasBlake2b512>(params, events, cancel).await,
    }
}

async fn run_dkg_generic<C: Ciphersuite + MaybeIntoEvenY + 'static>(
    params: DkgParams,
    events: mpsc::Sender<DkgEvent>,
    cancel: CancellationToken,
) -> Result<DkgOutput, CoreError> {
    let mut client = FrostdClient::new(format!("https://{}", params.server_url), &params.trust)?;
    let is_initiator = !params.participants.is_empty();

    let _ = events.send(DkgEvent::Connecting).await;
    client.login(&params.comm_privkey, &params.comm_pubkey).await?;
    let _ = events
        .send(DkgEvent::Connected {
            server: params.server_url.clone(),
        })
        .await;

    // Create or join the session.
    let session_id = if is_initiator {
        client
            .create_new_session(&api::CreateNewSessionArgs {
                pubkeys: params.participants.clone(),
                message_count: 1,
            })
            .await?
            .session_id
    } else if let Some(id) = params.session_id {
        id
    } else {
        let sessions = client.list_sessions().await?.session_ids;
        match sessions.len() {
            0 => return Err(CoreError::Ceremony("no active session on this server".into())),
            1 => sessions[0],
            _ => {
                return Err(CoreError::Ceremony(
                    "more than one active session; a session ID must be specified".into(),
                ))
            }
        }
    };

    let result = run_rounds::<C>(&client, session_id, &params, &events, &cancel).await;

    // Cleanup. On success the initiator must NOT close the session right
    // away: other participants may still need to fetch their final round 2
    // packages from the server queue (closing drops it). Defer the close by
    // a grace period covering a few poll intervals.
    match &result {
        Ok(_) if is_initiator => {
            let mut client = client;
            tokio::spawn(async move {
                tokio::time::sleep(std::time::Duration::from_secs(10)).await;
                let _ = client
                    .close_session(&api::CloseSessionArgs { session_id })
                    .await;
                let _ = client.logout().await;
            });
        }
        Ok(_) => {
            let _ = client.logout().await;
        }
        Err(_) => {
            // On failure, tear down immediately so peers fail fast instead
            // of waiting on a dead ceremony.
            if is_initiator {
                let _ = client
                    .close_session(&api::CloseSessionArgs { session_id })
                    .await;
            }
            let _ = client.logout().await;
        }
    }
    result
}

async fn run_rounds<C: Ciphersuite + MaybeIntoEvenY + 'static>(
    client: &FrostdClient,
    session_id: Uuid,
    params: &DkgParams,
    events: &mpsc::Sender<DkgEvent>,
    cancel: &CancellationToken,
) -> Result<DkgOutput, CoreError> {
    // Derive identifiers for all session members from session_id || pubkey,
    // exactly like upstream, so all participants agree on identifiers.
    let session_info = client
        .get_session_info(&api::GetSessionInfoArgs { session_id })
        .await?;

    if session_info.pubkeys.len() < 2 {
        return Err(CoreError::Ceremony(
            "DKG session must have at least 2 participants".into(),
        ));
    }
    for pubkey in &session_info.pubkeys {
        if !params.known_pubkeys.contains(pubkey) {
            return Err(CoreError::Ceremony(format!(
                "session participant {} is not in your address book",
                hex::encode(&pubkey.0)
            )));
        }
    }

    let pubkeys: HashMap<PublicKey, Identifier<C>> = session_info
        .pubkeys
        .iter()
        .map(|p| {
            Ok((
                p.clone(),
                Identifier::<C>::derive(&[session_id.as_bytes(), &p.0[..]].concat())
                    .map_err(|e| CoreError::Ceremony(e.to_string()))?,
            ))
        })
        .collect::<Result<_, CoreError>>()?;

    let max_signers = pubkeys.len() as u16;
    if params.min_signers < 2 || params.min_signers > max_signers {
        return Err(CoreError::Ceremony(format!(
            "invalid threshold {} for {} participants",
            params.min_signers, max_signers
        )));
    }

    let identifier =
        Identifier::<C>::derive(&[session_id.as_bytes(), &params.comm_pubkey.0[..]].concat())
            .map_err(|e| CoreError::Ceremony(e.to_string()))?;

    let _ = events
        .send(DkgEvent::SessionReady {
            session_id,
            num_participants: max_signers,
        })
        .await;

    let mut state = DKGSessionState::<C>::WaitingForRound1Packages {
        pubkeys: pubkeys.clone(),
        round1_packages: BTreeMap::new(),
    };

    // FROST DKG part 1.
    let (round1_secret, round1_package) =
        frost::keys::dkg::part1(identifier, max_signers, params.min_signers, OsRng)
            .map_err(|e| CoreError::Ceremony(e.to_string()))?;

    // One Noise session per peer for the whole ceremony (the cipher is
    // stateful; it must live as long as the session).
    let mut cipher = Cipher::new(
        params.comm_privkey.clone(),
        pubkeys.keys().cloned().collect(),
    )
    .map_err(|e| CoreError::Crypto(e.to_string()))?;

    // Send our round 1 package to every other participant.
    for pubkey in pubkeys.keys() {
        if *pubkey == params.comm_pubkey {
            continue;
        }
        let msg = cipher
            .encrypt(
                Some(pubkey),
                serde_json::to_vec(&round1_package)
                    .map_err(|e| CoreError::Ceremony(e.to_string()))?,
            )
            .map_err(|e| CoreError::Crypto(e.to_string()))?;
        client
            .send(&api::SendArgs {
                session_id,
                recipients: vec![pubkey.clone()],
                msg,
            })
            .await?;
    }
    let _ = events.send(DkgEvent::Round1).await;

    // Decrypted messages that arrived ahead of the phase that consumes them.
    let mut pending = VecDeque::new();

    poll_until(
        client, session_id, &mut cipher, &mut state, identifier, cancel, &mut pending,
        |s| s.has_round1_packages(),
    )
    .await?;

    // Echo-broadcast round (only needed for 3+ participants).
    if !state.has_round1_broadcast_packages() {
        let _ = events.send(DkgEvent::Round1Broadcast).await;
        let round1_packages = state.round1_packages().map_err(cerr)?;
        for (recipient_pubkey, recipient_identifier) in pubkeys.iter() {
            if *recipient_pubkey == params.comm_pubkey {
                continue;
            }
            for (sender_identifier, package) in round1_packages.iter() {
                if *sender_identifier == *recipient_identifier {
                    continue;
                }
                let msg = cipher
                    .encrypt(
                        Some(recipient_pubkey),
                        serde_json::to_vec(&(*sender_identifier, package))
                            .map_err(|e| CoreError::Ceremony(e.to_string()))?,
                    )
                    .map_err(|e| CoreError::Crypto(e.to_string()))?;
                client
                    .send(&api::SendArgs {
                        session_id,
                        recipients: vec![recipient_pubkey.clone()],
                        msg,
                    })
                    .await?;
            }
        }
        poll_until(
            client, session_id, &mut cipher, &mut state, identifier, cancel, &mut pending,
            |s| s.has_round1_broadcast_packages(),
        )
        .await?;
    }

    // FROST DKG part 2.
    let received_round1 = state.round1_packages().map_err(cerr)?;
    let (round2_secret, round2_packages) =
        frost::keys::dkg::part2(round1_secret, &received_round1)
            .map_err(|e| CoreError::Ceremony(e.to_string()))?;

    // Send each participant their round 2 package.
    for (pubkey, identifier) in pubkeys.iter() {
        if *pubkey == params.comm_pubkey {
            continue;
        }
        let package = round2_packages
            .get(identifier)
            .ok_or_else(|| CoreError::Ceremony("missing round 2 package".into()))?;
        let msg = cipher
            .encrypt(
                Some(pubkey),
                serde_json::to_vec(package).map_err(|e| CoreError::Ceremony(e.to_string()))?,
            )
            .map_err(|e| CoreError::Crypto(e.to_string()))?;
        client
            .send(&api::SendArgs {
                session_id,
                recipients: vec![pubkey.clone()],
                msg,
            })
            .await?;
    }
    let _ = events.send(DkgEvent::Round2).await;

    poll_until(
        client, session_id, &mut cipher, &mut state, identifier, cancel, &mut pending,
        |s| s.has_round2_packages(),
    )
    .await?;

    let _ = events.send(DkgEvent::Finalizing).await;

    // FROST DKG part 3, plus the even-Y normalization RedPallas needs for
    // Orchard spend authorization keys.
    let received_round2 = state.round2_packages().map_err(cerr)?;
    let (key_package, public_key_package) = MaybeIntoEvenY::into_even_y(
        frost::keys::dkg::part3(&round2_secret, &received_round1, &received_round2)
            .map_err(|e| CoreError::Ceremony(e.to_string()))?,
    );

    // Build the config Group entry like upstream cli::dkg does.
    let identifier_to_pubkey: HashMap<Identifier<C>, PublicKey> =
        pubkeys.into_iter().map(|(k, v)| (v, k)).collect();
    let mut participant_map = BTreeMap::new();
    for identifier in public_key_package.verifying_shares().keys() {
        let pubkey = identifier_to_pubkey
            .get(identifier)
            .ok_or_else(|| CoreError::Ceremony("missing pubkey for identifier".into()))?;
        participant_map.insert(
            hex::encode(identifier.serialize()),
            Participant {
                identifier: identifier.serialize(),
                pubkey: pubkey.clone(),
            },
        );
    }

    let group_id = hex::encode(
        public_key_package
            .verifying_key()
            .serialize()
            .map_err(|e| CoreError::Ceremony(e.to_string()))?,
    );
    let group = Group {
        ciphersuite: C::ID.to_string(),
        description: params.description.clone(),
        key_package: postcard::to_allocvec(&key_package)
            .map_err(|e| CoreError::Ceremony(e.to_string()))?,
        public_key_package: postcard::to_allocvec(&public_key_package)
            .map_err(|e| CoreError::Ceremony(e.to_string()))?,
        participant: participant_map,
        server_url: Some(params.server_url.clone()),
    };

    Ok(DkgOutput { group_id, group })
}

/// Poll `/receive`, decrypt and feed messages to the session state one at a
/// time, until `done` returns true. Stops at the phase boundary: messages
/// beyond the current phase stay in `pending` for the next phase's poll.
///
/// This matters because peers that are ahead of us can deliver packages for
/// two phases in a single `/receive` batch (common on fast networks).
/// Feeding them all into the state machine at once would advance it past
/// the state the caller needs to read intermediate results from (e.g. the
/// round 1 packages required by `dkg::part2`).
async fn poll_until<C: Ciphersuite>(
    client: &FrostdClient,
    session_id: Uuid,
    cipher: &mut Cipher,
    state: &mut DKGSessionState<C>,
    identifier: Identifier<C>,
    cancel: &CancellationToken,
    pending: &mut VecDeque<api::Msg>,
    done: impl Fn(&DKGSessionState<C>) -> bool,
) -> Result<(), CoreError> {
    loop {
        // Feed buffered messages. A message that doesn't fit the current
        // phase (a peer ahead of us, interleaved in the server's FIFO) is
        // requeued for a later phase rather than failing the ceremony.
        let mut requeued = VecDeque::new();
        while let Some(msg) = pending.pop_front() {
            match state.recv(msg.clone(), identifier) {
                Ok(()) => {
                    if done(state) {
                        requeued.append(pending);
                        *pending = requeued;
                        return Ok(());
                    }
                }
                Err(_) => requeued.push_back(msg),
            }
        }
        *pending = requeued;
        if done(state) {
            return Ok(());
        }
        let r = client
            .receive(&api::ReceiveArgs {
                session_id,
                as_coordinator: false,
            })
            .await?;
        let got_new = !r.msgs.is_empty();
        for msg in r.msgs {
            // Decrypt immediately (the Noise session is ordered) but defer
            // state processing to the loop above.
            let msg = cipher
                .decrypt(msg)
                .map_err(|e| CoreError::Crypto(e.to_string()))?;
            pending.push_back(msg);
        }
        if !got_new {
            tokio::select! {
                _ = cancel.cancelled() => return Err(CoreError::Cancelled),
                _ = tokio::time::sleep(std::time::Duration::from_secs(2)) => {}
            }
        }
    }
}
