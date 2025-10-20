use crate::message::Message;
use crate::user_session::SessionManager;
use sha2::{Sha256, Digest};

pub struct AuthenticationFlow {
    pub session_manager: SessionManager,
}

impl AuthenticationFlow {
    pub fn new(session_timeout: u64) -> Self {
        AuthenticationFlow {
            session_manager: SessionManager::new(session_timeout),
        }
    }
    
    pub fn initiate_authentication(&mut self, user_id: String, _reply_address: String) -> String {
        let _session = self.session_manager.create_session(user_id.clone(), _reply_address);
        let challenge = self.generate_challenge(&user_id);
        
        format!("AUTH_CHALLENGE:{}", challenge)
    }
    
    pub fn verify_signed_message(&mut self, signed_message: &Message, expected_signature: &str) -> bool {
        if let Some(signature) = &signed_message.signature {
            if signature == expected_signature {
                return self.session_manager.authenticate_session(&signed_message.sender_address);
            }
        }
        false
    }
    
    pub fn create_signed_command(&self, user_id: &str, coordinator_address: &str, command: &str, private_key: &str) -> Result<Message, String> {
        let _reply_address = self.session_manager.get_reply_address(user_id)
            .ok_or("No reply address found for user")?;
            
        let mut message = Message::new(
            _reply_address,
            coordinator_address.to_string(),
            command.to_string()
        );
        
        message.sign(private_key)?;
        Ok(message)
    }
    
    pub fn is_user_authenticated(&self, user_id: &str) -> bool {
        if let Some(session) = self.session_manager.get_session(user_id) {
            session.is_authenticated && !session.is_session_expired(3600)
        } else {
            false
        }
    }
    
    fn generate_challenge(&self, user_id: &str) -> String {
        let timestamp = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
            
        let mut hasher = Sha256::new();
        hasher.update(user_id.as_bytes());
        hasher.update(timestamp.to_string().as_bytes());
        hasher.update(b"zatboard_challenge");
        
        format!("{:x}", hasher.finalize())[..16].to_string()
    }
    
    pub fn cleanup_expired_sessions(&mut self) {
        self.session_manager.cleanup_expired_sessions();
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_authentication_flow() {
        let mut auth = AuthenticationFlow::new(3600);
        
        let challenge = auth.initiate_authentication(
            "zs1user123".to_string(),
            "zs1reply456".to_string()
        );
        
        assert!(challenge.starts_with("AUTH_CHALLENGE:"));
        assert!(!auth.is_user_authenticated("zs1user123"));
    }
    
    #[test]
    fn test_signed_command_creation() {
        let mut auth = AuthenticationFlow::new(3600);
        
        auth.initiate_authentication(
            "zs1user123".to_string(),
            "zs1reply456".to_string()
        );
        
        let signed_msg = auth.create_signed_command(
            "zs1user123",
            "zs1coordinator789",
            "ls /home",
            "test_private_key"
        );
        
        assert!(signed_msg.is_ok());
        let msg = signed_msg.unwrap();
        assert_eq!(msg.memo_text, "ls /home");
        assert!(msg.signature.is_some());
    }
    
    #[test]
    fn test_authentication_state() {
        let mut auth = AuthenticationFlow::new(3600);
        
        auth.initiate_authentication(
            "zs1user123".to_string(),
            "zs1reply456".to_string()
        );
        
        assert!(!auth.is_user_authenticated("zs1user123"));
        
        auth.session_manager.authenticate_session("zs1user123");
        assert!(auth.is_user_authenticated("zs1user123"));
    }
}