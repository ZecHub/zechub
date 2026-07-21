use crate::messages::PaypunkdRequest;
use crate::paypunk::Paypunk;
use paypunk_ipc::IpcMessage;
use tactix::{Actor, Ctx, Handler};
use tracing::debug;

pub struct Paypunkd {
    lib: Paypunk,
}

impl Paypunkd {
    pub fn new(lib: Paypunk) -> Self {
        Self { lib }
    }
}

impl Actor for Paypunkd {}

impl Handler<IpcMessage> for Paypunkd {
    async fn handle(&mut self, msg: IpcMessage, _ctx: &Ctx<Self>) -> Result<Vec<u8>, String> {
        let request: PaypunkdRequest =
            postcard::from_bytes(&msg.payload).map_err(|e| format!("deserialize error: {e}"))?;
        debug!(?request, "dispatching request");
        let response = self
            .lib
            .handle_request(request, msg.sender_public_key)
            .await;
        let encoded =
            postcard::to_allocvec(&response).map_err(|e| format!("serialize error: {e}"))?;
        debug!(response_len = encoded.len(), "sending response");
        Ok(encoded)
    }
}
