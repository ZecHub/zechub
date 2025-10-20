use serde::{Deserialize, Serialize};
use sha2::{Sha256, Digest};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Message {
    pub sender_address: String,
    pub recipient_address: String,
    pub memo_text: String,
    pub txid: Option<String>,
    pub signature: Option<String>,
    pub timestamp: Option<u64>,
}

impl Message {
     pub fn new(sender: String, recipient: String, memo: String) -> Self {
        Message {
            sender_address: sender,
            recipient_address: recipient,
            memo_text: memo,
            txid: None,
            signature: None,     
            timestamp: None,      
        }
    }
    
    pub fn with_txid(sender: String, recipient: String, memo: String, txid: String) -> Self {
        Message {
            sender_address: sender,
            recipient_address: recipient,
            memo_text: memo,
            txid: Some(txid),
            signature: None,    
            timestamp: None,      
        }
    }
    
    fn create_signature_payload(&self) -> String {
        let timestamp_str = self.timestamp
            .map(|t| t.to_string())
            .unwrap_or_else(|| "0".to_string());
            
        format!("{}:{}:{}:{}", 
            self.sender_address,
            self.recipient_address, 
            self.memo_text,
            timestamp_str
        )
    }
    
    pub fn sign(&mut self, private_key: &str) -> Result<(), String> {
        let payload = self.create_signature_payload();
        let signature = self.create_simple_signature(&payload, private_key);
        self.signature = Some(signature);
        Ok(())
    }
    
    pub fn verify_signature(&self, private_key: &str) -> bool {
        if let Some(ref sig) = self.signature {
            let payload = self.create_signature_payload();
            let expected = self.create_simple_signature(&payload, private_key);
            sig == &expected
        } else {
            false
        }
    }
    
    fn create_simple_signature(&self, message: &str, key: &str) -> String {
        let mut hasher = Sha256::new();
        hasher.update(message.as_bytes());
        hasher.update(key.as_bytes());
        format!("{:x}", hasher.finalize())
    }
    
    pub fn from_zingo_transaction(
        _transaction_data: &str
    ) -> Result<Self, String> {
        todo!("Parse from zingo-cli transaction output")
    }
}

impl std::fmt::Display for Message {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Message from {} to {}: {}", 
               self.sender_address, 
               self.recipient_address, 
               self.memo_text)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_message_creation() {
        let msg = Message::new(
            "zs1sender123".to_string(),
            "zs1recipient456".to_string(),
            "ls /home".to_string()
        );
        
        assert_eq!(msg.memo_text, "ls /home");
        assert_eq!(msg.sender_address, "zs1sender123");
        assert_eq!(msg.recipient_address, "zs1recipient456");
        assert!(msg.timestamp.is_none());  
        assert!(msg.signature.is_none());
    }
    
    #[test]
    fn test_message_signing() {
        let mut msg = Message::new(
            "zs1sender123".to_string(),
            "zs1recipient456".to_string(),
            "ls /home".to_string()
        );
        
        let private_key = "test_private_key";
        msg.sign(private_key).unwrap();
        assert!(msg.signature.is_some());
        assert!(msg.verify_signature(private_key));
        
        assert!(!msg.verify_signature("wrong_key"));
    }
}