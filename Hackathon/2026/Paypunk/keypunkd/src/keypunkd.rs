use crate::keypunk::Keypunk;
use crate::keypunk::Storage;
use crate::messages::KeypunkdRequest;
use paypunk_ipc::IpcMessage;
use tactix::{Actor, Ctx, Handler};
use tracing::debug;

pub struct Keypunkd<S: Storage> {
    lib: Keypunk<S>,
}

impl<S: Storage> Keypunkd<S> {
    pub fn new(lib: Keypunk<S>) -> Self {
        Self { lib }
    }
}

impl<S: Storage> Actor for Keypunkd<S> {}

impl<S: Storage> Handler<IpcMessage> for Keypunkd<S> {
    async fn handle(&mut self, msg: IpcMessage, _ctx: &Ctx<Self>) -> Result<Vec<u8>, String> {
        let request: KeypunkdRequest =
            postcard::from_bytes(&msg.payload).map_err(|e| format!("deserialize error: {e}"))?;
        debug!(?request, "dispatching request");
        let response = self.lib.handle_request(request, msg.sender_public_key);
        let encoded =
            postcard::to_allocvec(&response).map_err(|e| format!("serialize error: {e}"))?;
        debug!(response_len = encoded.len(), "sending response");
        Ok(encoded)
    }
}
