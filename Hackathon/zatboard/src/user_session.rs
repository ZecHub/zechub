use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserSession {
    pub user_id: String,
    pub reply_address: String,
    pub session_start: u64,
    pub last_activity: u64,
    pub is_authenticated: bool,
}

impl UserSession {
    pub fn new(user_id: String, reply_address: String) -> Self {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
            
        UserSession {
            user_id,
            reply_address,
            session_start: now,
            last_activity: now,
            is_authenticated: false,
        }
    }
    
    pub fn update_activity(&mut self) {
        self.last_activity = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
    }
    
    pub fn authenticate(&mut self) {
        self.is_authenticated = true;
        self.update_activity();
    }
    
    pub fn is_session_expired(&self, timeout_secs: u64) -> bool {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        now - self.last_activity > timeout_secs
    }
}

#[derive(Debug)]
pub struct SessionManager {
    sessions: HashMap<String, UserSession>,
    session_timeout: u64,
}

impl SessionManager {
    pub fn new(session_timeout: u64) -> Self {
        SessionManager {
            sessions: HashMap::new(),
            session_timeout,
        }
    }
    
    pub fn create_session(&mut self, user_id: String, reply_address: String) -> &UserSession {
        let session = UserSession::new(user_id.clone(), reply_address);
        self.sessions.insert(user_id.clone(), session);
        self.sessions.get(&user_id).unwrap()
    }
    
    pub fn get_session(&self, user_id: &str) -> Option<&UserSession> {
        self.sessions.get(user_id)
    }
    
    pub fn get_session_mut(&mut self, user_id: &str) -> Option<&mut UserSession> {
        self.sessions.get_mut(user_id)
    }
    
    pub fn authenticate_session(&mut self, user_id: &str) -> bool {
        let timeout = self.session_timeout;
        if let Some(session) = self.get_session_mut(user_id) {
            if !session.is_session_expired(timeout) {
                session.authenticate();
                return true;
            }
        }
        false
    }
    
    pub fn cleanup_expired_sessions(&mut self) {
        self.sessions.retain(|_, session| {
            !session.is_session_expired(self.session_timeout)
        });
    }
    
    pub fn get_reply_address(&self, user_id: &str) -> Option<String> {
        self.get_session(user_id).map(|s| s.reply_address.clone())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_session_creation() {
        let mut manager = SessionManager::new(3600);
        let session = manager.create_session(
            "zs1user123".to_string(),
            "zs1reply456".to_string()
        );
        
        assert_eq!(session.user_id, "zs1user123");
        assert_eq!(session.reply_address, "zs1reply456");
        assert!(!session.is_authenticated);
    }
    
    #[test]
    fn test_session_authentication() {
        let mut manager = SessionManager::new(3600);
        manager.create_session(
            "zs1user123".to_string(),
            "zs1reply456".to_string()
        );
        
        let success = manager.authenticate_session("zs1user123");
        assert!(success);
        
        let session = manager.get_session("zs1user123").unwrap();
        assert!(session.is_authenticated);
    }
    
    #[test]
    fn test_reply_address_lookup() {
        let mut manager = SessionManager::new(3600);
        manager.create_session(
            "zs1user123".to_string(),
            "zs1reply456".to_string()
        );
        
        let reply_addr = manager.get_reply_address("zs1user123");
        assert_eq!(reply_addr, Some("zs1reply456".to_string()));
    }
}