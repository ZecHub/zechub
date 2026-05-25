//! Mark messages read

use crate::coinconfig::CoinConfig;

/// Mark a given message as read or unread
/// # Arguments
/// * `message`: message id
/// * `read`: read or unread
pub fn mark_message_read(coin: u8, message: u32, read: bool) -> anyhow::Result<()> {
    let c = CoinConfig::get(coin);
    c.db()?.mark_message_read(message, read)?;
    Ok(())
}

/// Mark all messages as read or unread
/// # Arguments
/// * `read`: read or unread
pub fn mark_all_messages_read(coin: u8, account: u32, read: bool) -> anyhow::Result<()> {
    let c = CoinConfig::get(coin);
    c.db()?.mark_all_messages_read(account, read)?;
    Ok(())
}
