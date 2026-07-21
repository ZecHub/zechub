use paypunk_ipc::{IpcMessage, IpcReceiver, IpcSender};
use tactix::{Actor, Addr, Ctx, Handler, Sender};
use tempfile::TempDir;

// ---------------------------------------------------------------------------
// Echo handler — returns the exact bytes it receives
// ---------------------------------------------------------------------------

struct EchoHandler;

impl Actor for EchoHandler {}

impl Handler<IpcMessage> for EchoHandler {
    async fn handle(&mut self, msg: IpcMessage, _: &Ctx<Self>) -> Result<Vec<u8>, String> {
        Ok(msg.payload)
    }
}

// ---------------------------------------------------------------------------
// Error handler — always returns an error
// ---------------------------------------------------------------------------

struct ErrorHandler;

impl Actor for ErrorHandler {}

impl Handler<IpcMessage> for ErrorHandler {
    async fn handle(&mut self, _: IpcMessage, _: &Ctx<Self>) -> Result<Vec<u8>, String> {
        Err("something went wrong".into())
    }
}

// ---------------------------------------------------------------------------
// Direct in-process tests — no IPC, no sockets
// ---------------------------------------------------------------------------

#[tokio::test]
async fn test_echo_direct() {
    let handler: Addr<EchoHandler> = EchoHandler.start();
    let input = b"hello world".to_vec();
    let result = handler.ask(IpcMessage::new(input.clone())).await;
    assert_eq!(result, Ok(input));
}

#[tokio::test]
async fn test_empty_message_direct() {
    let handler = EchoHandler.start();
    let result = handler.ask(IpcMessage::new(vec![])).await;
    assert_eq!(result, Ok(vec![]));
}

#[tokio::test]
async fn test_binary_data_direct() {
    let handler = EchoHandler.start();
    let input = vec![0u8, 1, 2, 255, 128, 64];
    let result = handler.ask(IpcMessage::new(input.clone())).await;
    assert_eq!(result, Ok(input));
}

#[tokio::test]
async fn test_error_direct() {
    let handler: Addr<ErrorHandler> = ErrorHandler.start();
    let result = handler.ask(IpcMessage::new(vec![1, 2, 3])).await;
    assert_eq!(result, Err("something went wrong".into()));
}

// ---------------------------------------------------------------------------
// IPC roundtrip tests — over a real Unix socket
// ---------------------------------------------------------------------------

async fn serve_handler<H>(handler: Addr<H>) -> (TempDir, String)
where
    H: Actor + Handler<IpcMessage>,
{
    let dir = TempDir::new().unwrap();
    let path = dir.path().join("test.sock");
    let path_str = path.to_str().unwrap().to_owned();
    let server = IpcReceiver::bind(&path).await.unwrap();
    tokio::spawn(async move {
        server.serve(handler).await.unwrap();
    });
    tokio::time::sleep(std::time::Duration::from_millis(100)).await;
    (dir, path_str)
}

#[tokio::test]
async fn test_echo_over_ipc() {
    let (_dir, path) = serve_handler(EchoHandler.start()).await;
    let ipc = IpcSender::connect(&path).await.unwrap();
    let input = b"hello over ipc".to_vec();
    let result = ipc.ask(IpcMessage::new(input.clone())).await;
    assert_eq!(result, Ok(input));
}

#[tokio::test]
async fn test_binary_over_ipc() {
    let (_dir, path) = serve_handler(EchoHandler.start()).await;
    let ipc = IpcSender::connect(&path).await.unwrap();
    let input = vec![0u8, 255, 128, 64, 32];
    let result = ipc.ask(IpcMessage::new(input.clone())).await;
    assert_eq!(result, Ok(input));
}

#[tokio::test]
async fn test_large_message_over_ipc() {
    let (_dir, path) = serve_handler(EchoHandler.start()).await;
    let ipc = IpcSender::connect(&path).await.unwrap();
    let input = vec![42u8; 100_000];
    let result = ipc.ask(IpcMessage::new(input.clone())).await;
    assert_eq!(result, Ok(input));
}

#[tokio::test]
async fn test_error_over_ipc() {
    let (_dir, path) = serve_handler(ErrorHandler.start()).await;
    let ipc = IpcSender::connect(&path).await.unwrap();
    let result = ipc.ask(IpcMessage::new(vec![1, 2, 3])).await;
    assert_eq!(result, Err("something went wrong".into()));
}

// ---------------------------------------------------------------------------
// Referential transparency demo — same Recipient<IpcMessage> for both paths
// ---------------------------------------------------------------------------

#[tokio::test]
async fn test_referential_transparency() {
    // Direct path — no socket
    let direct: Addr<EchoHandler> = EchoHandler.start();
    let direct_recipient = direct.recipient();

    // IPC path — over socket
    let (_dir, path) = serve_handler(EchoHandler.start()).await;
    let ipc = IpcSender::connect(&path).await.unwrap();
    let ipc_recipient = ipc.recipient();

    // Both recipients have the same type: Recipient<IpcMessage>
    let input = b"same type".to_vec();

    let direct_result = direct_recipient.ask(IpcMessage::new(input.clone())).await;
    let ipc_result = ipc_recipient.ask(IpcMessage::new(input.clone())).await;

    assert_eq!(direct_result, Ok(input.clone()));
    assert_eq!(ipc_result, Ok(input));
}
