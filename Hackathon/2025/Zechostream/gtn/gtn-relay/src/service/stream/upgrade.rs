use axum::extract::ws::{Message, WebSocket};

use futures_util::{sink::SinkExt, stream::StreamExt};
use tokio::sync::mpsc;

use uuid::Uuid;

use crate::service::{audio::APIState, stream::handler::Connection};

pub(crate) async fn handle_socket(
    socket: WebSocket,
    stream_id: String,
    is_broadcaster: bool,
    state: APIState,
) {
    let (mut sender_ws, mut receiver_ws) = socket.split();
    let (tx, mut rx) = mpsc::unbounded_channel();
    let connection_id = Uuid::new_v4();

    let conn = Connection {
        sender: tx.clone(),
        is_broadcaster,
        stream_id: stream_id.clone(),
    };

    {
        state
        .handler
        .write()
        .await
        .connections
        .insert(connection_id, conn);

        state
        .handler
        .write()
        .await
        .broadcast_channels
        .insert(stream_id.clone(), tx.clone());
    }

    // Outgoing task
    let outgoing_state = state.clone();
    tokio::spawn(async move {
        while let Some(msg) = rx.recv().await {
            if let Err(e) = sender_ws.send(msg).await {
                tracing::error!("Failed to send message: {}", e);
                break;
            }
        }
        outgoing_state
            .handler
            .write()
            .await
            .connections
            .remove(&connection_id);
        tracing::info!("Connection {} closed", connection_id);
    });

    // Incoming task
    let incoming_state = state.clone();
    while let Some(Ok(msg)) = receiver_ws.next().await {
        match msg {
            Message::Binary(data) => {
                if is_broadcaster {
                    // Forward all audio chunked data to listener connections for this stream
                    let conns = incoming_state.handler.read().await.connections.clone();

                    for (_, c) in conns.iter() {
                        if !c.is_broadcaster && c.stream_id == stream_id {
                            let _ = c.sender.send(Message::Binary(data.clone()));
                        }
                    }
                }
            }
            Message::Text(text) => {
                if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&text) {
                    if parsed["type"] == "BroadcasterAnnounce" {
                        tracing::info!("Broadcaster announced for stream {}", stream_id);
                    }
                }
            }
            Message::Close(_) => break,
            _ => {}
        }
    }
}
