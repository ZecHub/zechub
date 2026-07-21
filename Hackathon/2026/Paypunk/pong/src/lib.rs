use paypunk_ipc::messages::{MAC_LEN, MSG_APPLICATION};

pub struct PongHandler;

impl PongHandler {
    pub fn handle(&self, frame: &[u8]) -> Result<Vec<u8>, String> {
        if frame.is_empty() || frame[0] != MSG_APPLICATION {
            return Err("expected MSG_APPLICATION frame".to_string());
        }
        if frame.len() < 1 + MAC_LEN {
            return Err(format!(
                "frame too short: {} bytes, need at least {}",
                frame.len(),
                1 + MAC_LEN
            ));
        }
        let payload = &frame[1..frame.len() - MAC_LEN];
        if payload == b"ping" {
            let mut response = vec![0x00u8];
            response.extend_from_slice(b"pong");
            Ok(response)
        } else {
            Err(format!(
                "expected ping payload, got: {:?}",
                String::from_utf8_lossy(payload)
            ))
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_ping_returns_pong() {
        let handler = PongHandler;
        let mut frame = vec![MSG_APPLICATION];
        frame.extend_from_slice(b"ping");
        frame.extend_from_slice(&[0u8; MAC_LEN]);

        let result = handler.handle(&frame).unwrap();
        assert_eq!(result, vec![0x00, b'p', b'o', b'n', b'g']);
    }

    #[test]
    fn test_invalid_message_type() {
        let handler = PongHandler;
        let frame = vec![0xFF, b'p', b'i', b'n', b'g'];
        assert!(handler.handle(&frame).is_err());
    }

    #[test]
    fn test_frame_too_short() {
        let handler = PongHandler;
        let frame = vec![MSG_APPLICATION];
        assert!(handler.handle(&frame).is_err());
    }

    #[test]
    fn test_wrong_payload() {
        let handler = PongHandler;
        let mut frame = vec![MSG_APPLICATION];
        frame.extend_from_slice(b"notping");
        frame.extend_from_slice(&[0u8; MAC_LEN]);

        let result = handler.handle(&frame);
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("expected ping"));
    }

    #[test]
    fn test_empty_frame() {
        let handler = PongHandler;
        assert!(handler.handle(&[]).is_err());
    }
}
