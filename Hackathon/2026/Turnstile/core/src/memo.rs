pub const SUBSCRIPTION_PREFIX: &str = "TURNSTILE:SUB:";
pub const MAX_TOPIC_LENGTH: usize = 64;

pub fn parse_subscription_memo(memo: &str) -> Option<String> {
    let topic = memo.trim().strip_prefix(SUBSCRIPTION_PREFIX)?.trim();

    if topic.is_empty() || topic.len() > MAX_TOPIC_LENGTH {
        return None;
    }

    if !topic
        .chars()
        .all(|c| c.is_ascii_alphanumeric() || c == '-' || c == '_')
    {
        return None;
    }

    Some(topic.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_a_subscription_topic() {
        assert_eq!(
            parse_subscription_memo("TURNSTILE:SUB:ama-zec-alerts"),
            Some("ama-zec-alerts".to_string())
        );
    }

    #[test]
    fn tolerates_surrounding_whitespace_from_wallet_padding() {
        assert_eq!(
            parse_subscription_memo("  TURNSTILE:SUB:topic_1  "),
            Some("topic_1".to_string())
        );
    }

    #[test]
    fn ignores_memos_without_the_prefix() {
        assert_eq!(parse_subscription_memo("hello there"), None);
        assert_eq!(parse_subscription_memo("TURNSTILE:ama"), None);
    }

    #[test]
    fn rejects_an_empty_topic() {
        assert_eq!(parse_subscription_memo("TURNSTILE:SUB:"), None);
    }

    #[test]
    fn rejects_a_topic_that_would_not_be_a_valid_ntfy_channel() {
        assert_eq!(parse_subscription_memo("TURNSTILE:SUB:bad topic"), None);
        assert_eq!(parse_subscription_memo("TURNSTILE:SUB:../etc/passwd"), None);
    }

    #[test]
    fn rejects_an_overlong_topic() {
        let memo = format!("{SUBSCRIPTION_PREFIX}{}", "a".repeat(MAX_TOPIC_LENGTH + 1));
        assert_eq!(parse_subscription_memo(&memo), None);
    }
}
