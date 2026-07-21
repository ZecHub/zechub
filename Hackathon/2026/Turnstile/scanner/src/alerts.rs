use std::time::Duration;

use turnstile_core::{MemoWatcher, notify};

const POLL_INTERVAL: Duration = Duration::from_secs(120);

pub fn spawn(indexer_uri: String, ntfy_base: String) {
    let Some(mut watcher) = MemoWatcher::from_env(indexer_uri) else {
        tracing::warn!(
            "TURNSTILE_UFVK not set — the memo watcher is disabled and no alerts will be sent"
        );
        return;
    };

    tokio::spawn(async move {
        tracing::info!("memo watcher started");

        loop {
            match watcher.poll().await {
                Ok(subscriptions) => {
                    for subscription in subscriptions {
                        tracing::info!(
                            topic = %subscription.topic,
                            height = subscription.height,
                            "new subscription"
                        );

                        let confirmation = notify(
                            &ntfy_base,
                            &subscription.topic,
                            "Turnstile — you are subscribed",
                            "You will be alerted 48 hours before, 1 hour before, and at the \
                             Ironwood activation. No email, no account, no way to identify you.",
                        )
                        .await;

                        if let Err(error) = confirmation {
                            tracing::warn!(%error, "could not send the confirmation push");
                        }
                    }
                }
                Err(error) => tracing::warn!(%error, "memo poll failed"),
            }

            tokio::time::sleep(POLL_INTERVAL).await;
        }
    });
}
