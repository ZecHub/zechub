use tokio::{sync::oneshot::Sender, time::Instant};

/// Commands related to stream setup and teardown.
#[derive(Debug)]
pub enum AudioSetupCommand {
    NewStreamSetup { id: String, session_pk: String },
    AbortStream { id: String },
    ExpectedRenewal { id: String, session_pk: String, sender: Sender<AudioSetupCommand> },
    ContinueStream { id: String }
}

#[derive(Clone, Debug)]
pub struct ExpiryState {
    stream_id: String,
    broadcaster_pk: String,
    expires_at: Instant
}

impl ExpiryState {
    pub fn new(stream_id: String, broadcaster_pk: String, expires_at: Instant) -> Self {
        Self {
            stream_id,
            broadcaster_pk,
            expires_at
        }
    }

    pub fn expires_at(&self) -> Instant {
        self.expires_at
    }

    pub fn stream_id(&self) -> &String {
        &self.stream_id
    }

    pub fn broadcaster_pk(&self) -> &String {
        &self.broadcaster_pk
    }
}
