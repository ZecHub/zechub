//! The relay seam. **(P3/P4)**
//!
//! [`Transport`] abstracts the message relay so the real `frostd` + Noise client
//! can drop in later without touching the ceremony logic. It is modelled directly
//! on `frostd`'s shape (`docs/PROTOCOL.md` §2/§4):
//!
//! - a **session** has a coordinator + participants addressed by an id
//!   ([`ParticipantId`] — in `frostd` a hex comm pubkey; in-process any unique
//!   string);
//! - messages are **opaque bytes** routed by `(session, recipient)`;
//! - `frostd`'s `recipients: []` (empty) means "the coordinator", captured here by
//!   [`Recipient::Coordinator`]; the coordinator issues **one `send` per recipient**.
//!
//! ### Why identity is bound to the endpoint, not passed per call
//! `frostd` authenticates every `/send` and `/receive` with a Bearer token, so the
//! *sender/receiver identity is fixed by the connection*, not carried in each
//! request body. We mirror that: a [`Transport`] endpoint is constructed **as** a
//! [`Role`] (coordinator or a specific participant) and speaks only as that
//! identity. The real `frostd` impl is therefore a struct holding
//! `{ base_url, access_token, my_pubkey }` — `send`/`recv` slot straight in.
//!
//! [`recv`](Transport::recv) is a **non-blocking poll** (drains whatever is queued),
//! exactly like `frostd`'s `/receive` FIFO — callers loop with their own timeout.
//!
//! [`InProcessRelay`] is the in-memory implementation used to drive a full
//! coordinator + N guardians in one `cargo test`.

use std::collections::{HashMap, VecDeque};
use std::sync::{Arc, Mutex};

use serde::{Deserialize, Serialize};

use crate::error::Result;

/// A relay session identifier. In `frostd` this is the session UUID string.
#[derive(Debug, Clone, PartialEq, Eq, Hash, PartialOrd, Ord, Serialize, Deserialize)]
pub struct SessionId(pub String);

impl SessionId {
    /// Wrap a session id string.
    pub fn new(id: impl Into<String>) -> Self {
        Self(id.into())
    }
}

/// A participant address. In `frostd` this is the hex-encoded comm public key; in
/// the in-process relay it is any unique synthetic string (e.g. `"guardian-1"`).
#[derive(Debug, Clone, PartialEq, Eq, Hash, PartialOrd, Ord, Serialize, Deserialize)]
pub struct ParticipantId(pub String);

impl ParticipantId {
    /// Wrap a participant id string.
    pub fn new(id: impl Into<String>) -> Self {
        Self(id.into())
    }

    /// The reserved sender id stamped on messages the coordinator emits. Guardians
    /// do not act on it (they trust the payload), but it keeps the returned
    /// `(sender, payload)` shape uniform with `frostd`'s `/receive`.
    pub fn coordinator() -> Self {
        Self("__coordinator__".to_string())
    }
}

/// The identity an endpoint speaks as (fixed at construction, mirroring the
/// `frostd` Bearer token).
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Role {
    /// The session coordinator.
    Coordinator,
    /// A named participant (guardian).
    Participant(ParticipantId),
}

/// The destination of a message. Mirrors `frostd`'s `recipients` field, where an
/// empty recipient list routes to the coordinator.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Recipient {
    /// Route to the session coordinator (`frostd`: empty `recipients`).
    Coordinator,
    /// Route to a specific participant.
    Participant(ParticipantId),
}

/// Transport-agnostic relay. The `frostd` + Noise client will implement this same
/// trait; the ceremony/guardian code depends only on it.
pub trait Transport {
    /// Route an opaque `msg` to `to` within `session`. The sender is the
    /// endpoint's own bound [`Role`]. Following `frostd`, the coordinator issues
    /// one `send` per recipient.
    fn send(&self, session: &SessionId, to: Recipient, msg: Vec<u8>) -> Result<()>;

    /// Drain every message currently queued for this endpoint's identity within
    /// `session`, returning `(sender, payload)` pairs. **Non-blocking** — this
    /// mirrors `frostd`'s `/receive` poll, so callers loop with their own timeout.
    fn recv(&self, session: &SessionId) -> Result<Vec<(ParticipantId, Vec<u8>)>>;
}

/// Internal mailbox address: the coordinator, or a specific participant.
#[derive(Clone, PartialEq, Eq, Hash)]
enum Addr {
    Coordinator,
    Participant(String),
}

impl Addr {
    fn of_recipient(r: &Recipient) -> Addr {
        match r {
            Recipient::Coordinator => Addr::Coordinator,
            Recipient::Participant(p) => Addr::Participant(p.0.clone()),
        }
    }

    fn of_role(r: &Role) -> Addr {
        match r {
            Role::Coordinator => Addr::Coordinator,
            Role::Participant(p) => Addr::Participant(p.0.clone()),
        }
    }
}

type Mailbox = VecDeque<(ParticipantId, Vec<u8>)>;

/// An in-memory [`Transport`] hub. Hand each actor an [`Endpoint`] via
/// [`endpoint`](InProcessRelay::endpoint); they route through the shared,
/// thread-safe mailbox map, so a coordinator + N guardians can run concurrently
/// (scoped threads) in a single test. Cloning shares the same underlying relay.
#[derive(Clone, Default)]
pub struct InProcessRelay {
    // (session, recipient-address) -> queued (sender, payload) in FIFO order.
    boxes: Arc<Mutex<HashMap<(String, Addr), Mailbox>>>,
}

impl InProcessRelay {
    /// Create an empty relay.
    pub fn new() -> Self {
        Self::default()
    }

    /// Mint an [`Endpoint`] that speaks as `me`.
    pub fn endpoint(&self, me: Role) -> Endpoint {
        Endpoint {
            me,
            relay: self.clone(),
        }
    }

    fn sender_id(role: &Role) -> ParticipantId {
        match role {
            Role::Coordinator => ParticipantId::coordinator(),
            Role::Participant(p) => p.clone(),
        }
    }
}

/// An identity-bound handle onto an [`InProcessRelay`]. Implements [`Transport`].
pub struct Endpoint {
    me: Role,
    relay: InProcessRelay,
}

impl Transport for Endpoint {
    fn send(&self, session: &SessionId, to: Recipient, msg: Vec<u8>) -> Result<()> {
        let sender = InProcessRelay::sender_id(&self.me);
        let key = (session.0.clone(), Addr::of_recipient(&to));
        let mut boxes = self
            .relay
            .boxes
            .lock()
            .map_err(|_| crate::error::CoordinatorError::Transport("relay mutex poisoned".into()))?;
        boxes.entry(key).or_default().push_back((sender, msg));
        Ok(())
    }

    fn recv(&self, session: &SessionId) -> Result<Vec<(ParticipantId, Vec<u8>)>> {
        let key = (session.0.clone(), Addr::of_role(&self.me));
        let mut boxes = self
            .relay
            .boxes
            .lock()
            .map_err(|_| crate::error::CoordinatorError::Transport("relay mutex poisoned".into()))?;
        let drained = boxes.entry(key).or_default().drain(..).collect();
        Ok(drained)
    }
}
