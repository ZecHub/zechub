use std::str;

const MAX_MEMO_SIZE: usize = 512;

#[derive(Debug, Clone)]
pub struct ZcashMemo {
    pub raw_bytes: Vec<u8>,
    pub text: Option<String>,
}

impl ZcashMemo {
    pub fn new(data: &[u8]) -> Self {
        let raw_bytes = data.to_vec();
        let text = Self::decode_text(&raw_bytes);
        
        ZcashMemo { raw_bytes, text }
    }
    
    pub fn from_string(message: &str) -> Result<Self, String> {
        let bytes = message.as_bytes();
        if bytes.len() > MAX_MEMO_SIZE {
            return Err(format!("Memo too long: {} bytes (max {})", bytes.len(), MAX_MEMO_SIZE));
        }
        
        Ok(ZcashMemo {
            raw_bytes: bytes.to_vec(),
            text: Some(message.to_string()),
        })
    }
    
    fn decode_text(bytes: &[u8]) -> Option<String> {
        let trimmed = bytes.iter()
            .rposition(|&b| b != 0)
            .map(|pos| &bytes[..=pos])
            .unwrap_or(&[]);
            
        str::from_utf8(trimmed).ok().map(|s| s.to_string())
    }
    
    pub fn encode_for_transmission(&self) -> Vec<u8> {
        let mut padded = self.raw_bytes.clone();
        padded.resize(MAX_MEMO_SIZE, 0);
        padded
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_memo_encoding() {
        let message = "ls /home";
        let memo = ZcashMemo::from_string(message).unwrap();
        
        assert_eq!(memo.text, Some(message.to_string()));
        assert_eq!(memo.raw_bytes, message.as_bytes());
    }
    
    #[test]
    fn test_memo_decoding() {
        let raw_data = b"cat /readme.txt\0\0\0\0";
        let memo = ZcashMemo::new(raw_data);
        
        assert_eq!(memo.text, Some("cat /readme.txt".to_string()));
    }
    
    #[test]
    fn test_memo_size_limit() {
        let long_message = "a".repeat(600);
        let result = ZcashMemo::from_string(&long_message);
        
        assert!(result.is_err());
    }
}
