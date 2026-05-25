use crate::message::Message;
use crate::auth::AuthenticationFlow;
use crate::filesystem::FileSystem;
use crate::zingo_wrapper::ZingoClient;
use std::path::PathBuf;
use sha2::{Sha256, Digest};
use std::time::{SystemTime, Duration};
use warp::Filter;
use serde_json::{Value, json};
use std::collections::{HashMap, HashSet}; 

pub struct Coordinator {
    auth_flow: AuthenticationFlow,
    verified_users: HashMap<String, String>,
    pending_challenges: HashMap<String, String>,
    session_mappings: HashMap<String, String>,
    pub filesystem: FileSystem,
    zingo_client: ZingoClient,
    db_path: PathBuf,
    response_cache: HashMap<String, (String, SystemTime)>,
    cache_duration: Duration,
    processed_txids: HashSet<String>,
}

impl Coordinator {
    pub fn new(session_timeout: u64, zingo_data_dir: PathBuf, zingo_server: String) -> Self {
        let db_path = zingo_data_dir.join("filesystem.db");
        
        let filesystem = FileSystem::load_from_db(&db_path, "coordinator".to_string())
            .unwrap_or_else(|e| {
                eprintln!("Warning: Could not load filesystem from database: {}", e);
                FileSystem::new("coordinator".to_string())
            });

        Coordinator {
            auth_flow: AuthenticationFlow::new(session_timeout),
            verified_users: HashMap::new(),
            pending_challenges: HashMap::new(),
            session_mappings: HashMap::new(),
            filesystem,
            zingo_client: ZingoClient::new(zingo_data_dir, zingo_server),
            db_path,
            response_cache: HashMap::new(),
            cache_duration: Duration::from_secs(10),
            processed_txids: HashSet::new(),
        }
    }

    fn get_cached_response(&self, command: &str) -> Option<String> {
        if let Some((response, timestamp)) = self.response_cache.get(command) {
            if timestamp.elapsed().unwrap() < self.cache_duration {
                return Some(response.clone());
            }
        }
        None
    }
    
    fn cache_response(&mut self, command: &str, response: &str) {
        if command.starts_with("ls ") || command.starts_with("cat ") || command.starts_with("history ") {
            self.response_cache.insert(command.to_string(), (response.to_string(), SystemTime::now()));
        }
    }

    fn save_filesystem(&self) -> Result<(), String> {
        self.filesystem.save_to_db(&self.db_path)
    }

    pub fn send_response(&mut self, user_id: &str, response: &str) -> Result<(), String> {
        if let Some(reply_address) = self.get_reply_address(user_id) {
            println!("📤 Sending response to {}: {}", &reply_address[..8], &response[..50]);
            match self.zingo_client.send_memo(&reply_address, 0, response) {
                Ok(result) => {
                    println!("✅ Response sent successfully");
                    Ok(())
                }
                Err(e) => {
                    println!("❌ Send failed: {}", e);
                    Err(format!("Failed to send response: {}", e))
                }
            }
        } else {
            Err("No reply address found for user".to_string())
        }
    }

    pub fn process_and_respond(&mut self, message: &Message) -> Result<(), String> {
        let response = self.process_incoming_message(message)?;
        self.send_response(&message.sender_address, &response)?;
        Ok(())
    }

    fn handle_authenticated_command(&mut self, message: &Message) -> Result<String, String> {
        if let Some(cached) = self.get_cached_response(&message.memo_text) {
            return Ok(cached);
        }

        let user_id = &message.sender_address;

        let result = if message.memo_text.starts_with("chmod ") {
            let parts: Vec<&str> = message.memo_text.splitn(3, ' ').collect();
            if parts.len() >= 3 {
                let permissions = parts[1];
                let path = parts[2];
                self.handle_chmod_command(user_id, path, permissions)
            } else {
                Err("Invalid chmod format. Use: chmod <permissions> <path>".to_string())
            }
        } else if message.memo_text.starts_with("chown ") {
            let parts: Vec<&str> = message.memo_text.splitn(3, ' ').collect();
            if parts.len() >= 3 {
                let new_owner = parts[1];
                let path = parts[2];
                self.handle_chown_command(user_id, path, new_owner)
            } else {
                Err("Invalid chown format. Use: chown <user> <path>".to_string())
            }
        } else if message.memo_text.starts_with("grant ") {
            let parts: Vec<&str> = message.memo_text.splitn(4, ' ').collect();
            if parts.len() >= 4 {
                let permission_type = parts[1];
                let target_user = parts[2];
                let path = parts[3];
                self.handle_grant_command(user_id, path, target_user, permission_type)
            } else {
                Err("Invalid grant format. Use: grant <read|write> <user> <path>".to_string())
            }
        } else if message.memo_text.starts_with("ls ") {
            let path = message.memo_text.strip_prefix("ls ").unwrap_or("/");
            self.handle_ls_command(user_id, path)
        } else if message.memo_text.starts_with("cat ") {
            let path = message.memo_text.strip_prefix("cat ").unwrap();
            self.handle_cat_command(user_id, path)
        } else if message.memo_text.starts_with("mkdir ") {
            let path = message.memo_text.strip_prefix("mkdir ").unwrap();
            self.handle_mkdir_command(user_id, path)
        } else if message.memo_text.starts_with("rm ") {
            let path = message.memo_text.strip_prefix("rm ").unwrap();
            self.handle_rm_command(user_id, path)
        } else if message.memo_text.contains(" > ") {
            self.handle_echo_command(user_id, &message.memo_text)
        } else if message.memo_text.starts_with("touch ") {
            let parts: Vec<&str> = message.memo_text.splitn(3, ' ').collect();
            if parts.len() >= 2 {
                let path = parts[1];
                let content = if parts.len() == 3 { parts[2] } else { "" };
                self.handle_touch_command(user_id, path, content)
            } else {
                Err("Invalid touch command".to_string())
            }
        } else if message.memo_text.starts_with("permissions ") {
            let path = message.memo_text.strip_prefix("permissions ").unwrap();
            self.handle_permissions_command(user_id, path)
        } else if message.memo_text.starts_with("chat ") {
            let parts: Vec<&str> = message.memo_text.splitn(3, ' ').collect();
            if parts.len() >= 3 {
                let folder = parts[1];
                let chat_message = parts[2].trim_matches('"');
                self.handle_chat_command(user_id, folder, chat_message)
            } else {
                Err("Invalid chat format. Use: chat <folder> \"message\"".to_string())
            }
        } else if message.memo_text.starts_with("history ") {
            let folder = message.memo_text.strip_prefix("history ").unwrap();
            self.handle_history_command(user_id, folder)
        } else {
            Err("Unknown command. Try: ls, cat, mkdir, rm, echo, touch, chmod, chown, grant, chat, history".to_string())
        };

        if let Ok(ref response) = result {
            self.cache_response(&message.memo_text, response);
        }
        
        result
        
    }

    fn handle_permissions_command(&self, user_id: &str, path: &str) -> Result<String, String> {
        let node = self.filesystem.resolve_path(path)
            .ok_or_else(|| format!("Path not found: {}", path))?;
            
        if !node.permissions.can_read(user_id) {
            return Err("Permission denied: cannot view permissions".to_string());
        }
        
        let mut result = format!("Permissions for {}:\n", path);
        result.push_str(&format!("Owner: {}\n", node.permissions.owner));
        result.push_str(&format!("Public read: {}\n", node.permissions.public_read));
        result.push_str(&format!("Public write: {}\n", node.permissions.public_write));
        result.push_str(&format!("Read users: {:?}\n", node.permissions.read_users));
        result.push_str(&format!("Write users: {:?}", node.permissions.write_users));
        
        Ok(result)
    }

    fn handle_chmod_command(&mut self, user_id: &str, path: &str, permissions: &str) -> Result<String, String> {
        let node = self.filesystem.resolve_path_mut(path)
            .ok_or_else(|| format!("Path not found: {}", path))?;
            
        if node.permissions.owner != user_id {
            return Err("Permission denied: only owner can change permissions".to_string());
        }
        
        match permissions {
            "public" => {
                node.permissions.public_read = true;
                node.permissions.public_write = false;
            }
            "private" => {
                node.permissions.public_read = false;
                node.permissions.public_write = false;
            }
            "open" => {
                node.permissions.public_read = true;
                node.permissions.public_write = true;
            }
            _ => return Err("Invalid permissions. Use: public, private, or open".to_string()),
        }

        self.save_filesystem()?;
        Ok(format!("Permissions updated for {}", path))
    }

    fn handle_chown_command(&mut self, user_id: &str, path: &str, new_owner: &str) -> Result<String, String> {
        let node = self.filesystem.resolve_path_mut(path)
            .ok_or_else(|| format!("Path not found: {}", path))?;
            
        if node.permissions.owner != user_id {
            return Err("Permission denied: only owner can change ownership".to_string());
        }
        
        node.permissions.owner = new_owner.to_string();
        node.permissions.read_users.clear();
        node.permissions.write_users.clear();
        node.permissions.read_users.push(new_owner.to_string());
        node.permissions.write_users.push(new_owner.to_string());

        self.save_filesystem()?;
        Ok(format!("Ownership of {} transferred to {}", path, new_owner))
    }

    fn handle_grant_command(&mut self, user_id: &str, path: &str, target_user: &str, permission_type: &str) -> Result<String, String> {
        let node = self.filesystem.resolve_path_mut(path)
            .ok_or_else(|| format!("Path not found: {}", path))?;
            
        if node.permissions.owner != user_id {
            return Err("Permission denied: only owner can grant permissions".to_string());
        }
        
        match permission_type {
            "read" => {
                node.permissions.add_read_permission(target_user.to_string());
                self.save_filesystem()?; 
                Ok(format!("Read permission granted to {} for {}", target_user, path))
            }
            "write" => {
                node.permissions.add_write_permission(target_user.to_string());
                self.save_filesystem()?;
                Ok(format!("Write permission granted to {} for {}", target_user, path))
            }
            _ => Err("Invalid permission type. Use: read or write".to_string()),
        }
    }

    fn handle_ls_command(&self, user_id: &str, path: &str) -> Result<String, String> {
        let node = self.filesystem.resolve_path(path)
            .ok_or_else(|| format!("Path not found: {}", path))?;
            
        if !node.permissions.can_read(user_id) {
            return Err("Permission denied: cannot read directory".to_string());
        }
        
        if node.file_type != crate::filesystem::FileType::Directory {
            return Err("Not a directory".to_string());
        }
        
        let listing = node.list_children();
        if listing.is_empty() {
            Ok("(empty directory)".to_string())
        } else {
            Ok(listing.join("  "))
        }
    }
    
    fn handle_cat_command(&self, user_id: &str, path: &str) -> Result<String, String> {
        let node = self.filesystem.resolve_path(path)
            .ok_or_else(|| format!("File not found: {}", path))?;
            
        if !node.permissions.can_read(user_id) {
            return Err("Permission denied: cannot read file".to_string());
        }
        
        if node.file_type != crate::filesystem::FileType::File {
            return Err("Not a file".to_string());
        }
        
        Ok(node.content.clone().unwrap_or_else(|| "(empty file)".to_string()))
    }
    
    fn handle_mkdir_command(&mut self, user_id: &str, path: &str) -> Result<String, String> {
        match self.filesystem.create_directory(path, user_id.to_string()) {
            Ok(()) => {
                let response = format!("Directory created: {}", path);
                
                if let Err(e) = self.save_filesystem() {
                    eprintln!("Warning: Failed to persist filesystem: {}", e);
                }
                
                Ok(response)
            }
            Err(e) => Err(e),
        }
    }
    
    fn handle_touch_command(&mut self, user_id: &str, path: &str, content: &str) -> Result<String, String> {
        match self.filesystem.create_file(path, content.to_string(), user_id.to_string()) {
            Ok(()) => {
                self.save_filesystem()?;
                Ok(format!("File created: {}", path))
            }
            Err(e) => Err(e),
        }
    }

    fn handle_rm_command(&mut self, user_id: &str, path: &str) -> Result<String, String> {
        match self.filesystem.remove(path, user_id) {
            Ok(()) => {
                self.save_filesystem()?;
                Ok(format!("Directory removed: {}", path))
            }
            Err(e) => Err(e),
        }
    }

    fn handle_echo_command(&mut self, user_id: &str, command: &str) -> Result<String, String> {
        let parts: Vec<&str> = command.splitn(2, " > ").collect();
        if parts.len() != 2 {
            return Err("Invalid echo format. Use: echo \"content\" > <file>".to_string());
        }
        
        let echo_part = parts[0].trim();
        let file_path = parts[1].trim();
        
        if !echo_part.starts_with("echo ") {
            return Err("Command must start with 'echo'".to_string());
        }
        
        let content_part = echo_part.strip_prefix("echo ").unwrap().trim();
        let content = if content_part.starts_with('"') && content_part.ends_with('"') {
            content_part[1..content_part.len()-1].to_string()
        } else {
            content_part.to_string()
        };
        
        if let Some(file_node) = self.filesystem.resolve_path_mut(file_path) {
            if file_node.file_type == crate::filesystem::FileType::File {
                if file_node.permissions.can_write(user_id) {
                    file_node.update_content(content)?;
                    self.save_filesystem()?; 
                    return Ok(format!("File updated: {}", file_path));
                } else {
                    return Err("Permission denied: cannot write to file".to_string());
                }
            } else {
                return Err("Cannot write to directory".to_string());
            }
        } else {
            match self.filesystem.create_file(file_path, content, user_id.to_string()) {
                Ok(()) => {
                    self.save_filesystem()?;
                    Ok(format!("File created: {}", file_path))
                }
                Err(e) => Err(e),
            }
        }
    }

    fn handle_chat_command(&mut self, user_id: &str, folder_path: &str, message: &str) -> Result<String, String> {
        let folder_node = self.filesystem.resolve_path(folder_path)
            .ok_or_else(|| format!("Folder not found: {}", folder_path))?;
            
        if folder_node.file_type != crate::filesystem::FileType::Directory {
            return Err("Can only chat in directories".to_string());
        }
        
        if !folder_node.permissions.can_read(user_id) {
            return Err("Permission denied: cannot access chatroom".to_string());
        }
        
        let timestamp = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
            
        let chat_entry = format!("[{}] {}: {}", timestamp, self.get_user_display_name(user_id), message);
        
        let chat_log_path = format!("{}/.chat_log", folder_path.trim_end_matches('/'));
        
        if let Some(chat_file) = self.filesystem.resolve_path_mut(&chat_log_path) {
            let current_content = chat_file.content.clone().unwrap_or_default();
            let new_content = if current_content.is_empty() {
                chat_entry
            } else {
                format!("{}\n{}", current_content, chat_entry)
            };
            chat_file.update_content(new_content)?;
        } else {
            self.filesystem.create_file(&chat_log_path, chat_entry, "coordinator".to_string())?;
        }
        
        self.save_filesystem()?;
        
        Ok(format!("Message sent to chatroom: {}", folder_path))
    }

    fn handle_history_command(&self, user_id: &str, folder_path: &str) -> Result<String, String> {
        let folder_node = self.filesystem.resolve_path(folder_path)
            .ok_or_else(|| format!("Folder not found: {}", folder_path))?;
            
        if !folder_node.permissions.can_read(user_id) {
            return Err("Permission denied: cannot access chatroom".to_string());
        }

        let chat_log_path = format!("{}/.chat_log", folder_path.trim_end_matches('/'));
        
        if let Some(chat_file) = self.filesystem.resolve_path(&chat_log_path) {
            Ok(chat_file.content.clone().unwrap_or_else(|| "No chat history".to_string()))
        } else {
            Ok("No chat history in this folder yet. Start chatting!".to_string())
        }
    }

    fn get_user_display_name(&self, user_id: &str) -> String {
        if user_id.len() > 8 {
            user_id[user_id.len()-8..].to_string()
        } else {
            user_id.to_string()
        }
    }

    fn generate_session_id(&self, user_address: &str) -> String {
        let timestamp = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();

        let mut hasher = Sha256::new();
        hasher.update(user_address.as_bytes());
        hasher.update(timestamp.to_string().as_bytes());
        hasher.update(b"zatboard_session");

        format!("{:x}", hasher.finalize())[..16].to_string()
    }

    fn handle_authentication(&mut self, message: &Message) -> Result<String, String> {
        let parts: Vec<&str> = message.memo_text.splitn(2, ':').collect();
        if parts.len() != 2 {
            return Err("Invalid auth format. Use AUTH:<signed_challenge>".to_string());
        }
        
        if let Some(_expected_challenge) = self.pending_challenges.get(&message.sender_address) {
            if message.signature.is_some() {
                let session_id = self.generate_session_id(&message.sender_address);
                
                let reply_address = self.auth_flow.session_manager
                    .get_reply_address(&message.sender_address)
                    .unwrap_or_else(|| message.sender_address.clone());
                
                self.verified_users.insert(message.sender_address.clone(), reply_address.clone());
                self.session_mappings.insert(session_id.clone(), reply_address);
                self.pending_challenges.remove(&message.sender_address);
                
                return Ok(format!("Authentication successful. Session ID: {}", session_id));
            }
        }
        
        Err("Authentication failed. Invalid signature or challenge.".to_string())
    }
    
    pub fn get_reply_address_by_session(&self, session_id: &str) -> Option<String> {
        self.session_mappings.get(session_id).cloned()
    }
    
    pub fn get_all_sessions(&self) -> &HashMap<String, String> {
        &self.session_mappings
    }
    
    pub fn cleanup_expired_sessions(&mut self) {
        self.auth_flow.cleanup_expired_sessions();
        // TODO: Also cleanup session_mappings based on expiry
    }
    
    pub fn process_incoming_message(&mut self, message: &Message) -> Result<String, String> {
        if message.memo_text.starts_with("REGISTER:") {
            return self.handle_registration(message);
        }
        
        if message.memo_text.starts_with("AUTH:") {
            return self.handle_authentication(message);
        }
        
        if self.verify_sender_identity(message) {
            self.handle_authenticated_command(message)
        } else {
            Err("Authentication required. Send REGISTER:<reply_address> first.".to_string())
        }
    }
    
    fn handle_registration(&mut self, message: &Message) -> Result<String, String> {
        let parts: Vec<&str> = message.memo_text.splitn(2, ':').collect();
        if parts.len() != 2 {
            return Err("Invalid registration format. Use REGISTER:<reply_address>".to_string());
        }
        
        let reply_address = parts[1].to_string();

        if self.verified_users.contains_key(&message.sender_address) {
            return Ok("Already registered!".to_string());
        }

        self.verified_users.insert(message.sender_address.clone(), reply_address.clone());
        println!("✅ New user registered: {} -> {}", 
                &message.sender_address[..12], 
                &reply_address[..12]);
        
        Ok("Registration successful! You can now use filesystem commands.".to_string())
    }
    
    fn verify_sender_identity(&self, message: &Message) -> bool {
        self.verified_users.contains_key(&message.sender_address) && message.signature.is_some()
    }
    
    pub fn get_reply_address(&self, user_id: &str) -> Option<String> {
        self.verified_users.get(user_id).cloned()
    }
    
    pub fn is_user_verified(&self, user_id: &str) -> bool {
        self.verified_users.contains_key(user_id)
    }

    pub fn poll_for_new_messages(&mut self) -> Result<Vec<Message>, String> {
        let all_messages = self.zingo_client.poll_once()?;
        
        let mut new_messages = Vec::new();
        let mut processed_count = 0;
        
        for msg in all_messages {
            if let Some(ref txid) = msg.txid {
                if self.processed_txids.contains(txid) {
                    processed_count += 1;
                    continue;
                } else {
                    self.processed_txids.insert(txid.clone());
                    new_messages.push(msg);
                }
            } else {
                new_messages.push(msg);
            }
        }
        
        if processed_count > 0 {
            println!("⏭️  Skipped {} already processed messages", processed_count);
        }
        
        if !new_messages.is_empty() {
            println!("🆕 Processing {} new messages", new_messages.len());
        }
        
        Ok(new_messages)
    }

    pub async fn start_json_rpc_server(&self, bind_address: String, port: u16) -> Result<(), String> {
        let coordinator_data = self.get_coordinator_status();
        
        let status_route = warp::path("status")
            .and(warp::get())
            .map(move || {
                warp::reply::json(&coordinator_data)
            });
            
        let filesystem_route = warp::path("filesystem")
            .and(warp::path::param::<String>())
            .and(warp::get())
            .map(move |path: String| {
                let response = json!({
                    "path": path,
                    "type": "directory",
                    "children": ["file1.txt", "folder1/"],
                    "message": "JSON-RPC filesystem query"
                });
                warp::reply::json(&response)
            });
            
        let chat_route = warp::path("chat")
            .and(warp::path::param::<String>())
            .and(warp::get())
            .map(move |folder: String| {
                let response = json!({
                    "folder": folder,
                    "history": [
                        {"timestamp": 1640995200, "user": "user123", "message": "Hello!"},
                        {"timestamp": 1640995260, "user": "user456", "message": "Hi there!"}
                    ],
                    "message": "JSON-RPC chat history"
                });
                warp::reply::json(&response)
            });
            
        let routes = status_route
            .or(filesystem_route)
            .or(chat_route)
            .with(warp::cors().allow_any_origin());
            
        println!("JSON-RPC server starting on {}:{}", bind_address, port);
        
        warp::serve(routes)
            .run(([127, 0, 0, 1], port))
            .await;
            
        Ok(())
    }
    
    fn get_coordinator_status(&self) -> Value {
        json!({
            "status": "running",
            "verified_users": self.verified_users.len(),
            "pending_challenges": self.pending_challenges.len(),
            "filesystem_nodes": self.count_filesystem_nodes(),
            "uptime": "unknown",
            "version": "0.1.0"
        })
    }
    
    fn count_filesystem_nodes(&self) -> usize {
        1
    }

}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::PathBuf;
    
    #[test]
    fn test_coordinator_registration() {
        let temp_dir = tempfile::tempdir().unwrap();

        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        
        let register_msg = Message::new(
            "zs1user123".to_string(),
            "zs1coordinator456".to_string(),
            "REGISTER:zs1reply789".to_string()
        );
        
        let result = coordinator.process_incoming_message(&register_msg);
        assert!(result.is_ok());
        assert!(result.unwrap().contains("AUTH:"));
    }

    #[test]
    fn test_ls_command() {
        let temp_dir = tempfile::tempdir().unwrap();
        
        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        
        coordinator.filesystem.create_directory("/home", "coordinator".to_string()).unwrap();
        coordinator.filesystem.create_file("/home/readme.txt", "Hello!".to_string(), "coordinator".to_string()).unwrap();
        
        coordinator.verified_users.insert("zs1user123".to_string(), "zs1reply456".to_string());
        
        let ls_msg = Message::new(
            "zs1user123".to_string(),
            "zs1coordinator".to_string(),
            "ls /home".to_string()
        );
        
        let result = coordinator.handle_authenticated_command(&ls_msg);
        assert!(result.is_ok());
        assert!(result.unwrap().contains("readme.txt"));
    }
    
    #[test]
    fn test_mkdir_command() {
        let temp_dir = tempfile::tempdir().unwrap();

        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        coordinator.verified_users.insert("zs1user123".to_string(), "zs1reply456".to_string());
        coordinator.filesystem.root.permissions.add_write_permission("zs1user123".to_string());
    
        let mkdir_msg = Message::new(
            "zs1user123".to_string(),
            "zs1coordinator".to_string(),
            "mkdir /test_dir".to_string()
        );
        
        let result = coordinator.handle_authenticated_command(&mkdir_msg);

        if let Err(e) = &result {
            eprintln!("mkdir command failed with error: {}", e);
        }

        assert!(result.is_ok());
        assert!(result.unwrap().contains("Directory created"));

        let dir = coordinator.filesystem.resolve_path("/test_dir").unwrap();
        assert_eq!(dir.file_type, crate::filesystem::FileType::Directory);
    }

    #[test]
    fn test_rm_command() {
        let temp_dir = tempfile::tempdir().unwrap();
        
        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        coordinator.verified_users.insert("zs1user123".to_string(), "zs1reply456".to_string()); 
        coordinator.filesystem.root.permissions.add_write_permission("zs1user123".to_string());
        coordinator.filesystem.create_file("/test.txt", "content".to_string(), "zs1user123".to_string()).unwrap();
        
        let rm_msg = Message::new(
            "zs1user123".to_string(),
            "zs1coordinator".to_string(),
            "rm /test.txt".to_string()
        );
        
        let result = coordinator.handle_authenticated_command(&rm_msg);
        assert!(result.is_ok());
        assert!(coordinator.filesystem.resolve_path("/test.txt").is_none());
    }
    
    #[test]
    fn test_touch_command() {
        let temp_dir = tempfile::tempdir().unwrap();
        
        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        coordinator.verified_users.insert("zs1user123".to_string(), "zs1reply456".to_string());
        coordinator.filesystem.root.permissions.add_write_permission("zs1user123".to_string());
        
        let touch_msg = Message::new(
            "zs1user123".to_string(),
            "zs1coordinator".to_string(),
            "touch /newfile.txt Hello World!".to_string()
        );
        
        let result = coordinator.handle_authenticated_command(&touch_msg);
        assert!(result.is_ok());
        assert!(result.unwrap().contains("File created"));
        
        let file = coordinator.filesystem.resolve_path("/newfile.txt").unwrap();
        assert_eq!(file.content, Some("Hello World!".to_string()));
    }
    
    #[test]
    fn test_cat_command() {
        let temp_dir = tempfile::tempdir().unwrap();
        
        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        coordinator.verified_users.insert("zs1user123".to_string(), "zs1reply456".to_string());
        
        coordinator.filesystem.create_file("/readme.txt", "Hello from ZatBoard!".to_string(), "coordinator".to_string()).unwrap();
        
        let cat_msg = Message::new(
            "zs1user123".to_string(),
            "zs1coordinator".to_string(),
            "cat /readme.txt".to_string()
        );
        
        let result = coordinator.handle_authenticated_command(&cat_msg);
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), "Hello from ZatBoard!");
    }

    #[test]
    fn test_echo_command() {
        let temp_dir = tempfile::tempdir().unwrap();
        
        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        coordinator.verified_users.insert("zs1user123".to_string(), "zs1reply456".to_string());
        coordinator.filesystem.root.permissions.add_write_permission("zs1user123".to_string());
        
        let echo_msg = Message::new(
            "zs1user123".to_string(),
            "zs1coordinator".to_string(),
            "echo \"Hello ZatBoard!\" > /greeting.txt".to_string()
        );
        
        let result = coordinator.handle_authenticated_command(&echo_msg);
        assert!(result.is_ok());
        assert!(result.unwrap().contains("File created"));
        
        let file = coordinator.filesystem.resolve_path("/greeting.txt").unwrap();
        assert_eq!(file.content, Some("Hello ZatBoard!".to_string()));
    }

    #[test]
    fn test_echo_update_existing_file() {
        let temp_dir = tempfile::tempdir().unwrap();
        
        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        coordinator.verified_users.insert("zs1user123".to_string(), "zs1reply456".to_string());
        coordinator.filesystem.root.permissions.add_write_permission("zs1user123".to_string());
        
        coordinator.filesystem.create_file("/update.txt", "old content".to_string(), "zs1user123".to_string()).unwrap();
        
        let echo_msg = Message::new(
            "zs1user123".to_string(),
            "zs1coordinator".to_string(),
            "echo \"new content\" > /update.txt".to_string()
        );
        
        let result = coordinator.handle_authenticated_command(&echo_msg);
        assert!(result.is_ok());
        assert!(result.unwrap().contains("File updated"));
        
        let file = coordinator.filesystem.resolve_path("/update.txt").unwrap();
        assert_eq!(file.content, Some("new content".to_string()));
    }

    #[test]
    fn test_chmod_command() {
        let temp_dir = tempfile::tempdir().unwrap();
        
        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        coordinator.verified_users.insert("zs1user123".to_string(), "zs1reply456".to_string());
        coordinator.filesystem.root.permissions.add_write_permission("zs1user123".to_string());
        coordinator.filesystem.create_file("/test.txt", "content".to_string(), "zs1user123".to_string()).unwrap();
        
        let chmod_msg = Message::new(
            "zs1user123".to_string(),
            "zs1coordinator".to_string(),
            "chmod private /test.txt".to_string()
        );
        
        let result = coordinator.handle_authenticated_command(&chmod_msg);
        assert!(result.is_ok());
        assert!(result.unwrap().contains("Permissions updated"));
        
        let file = coordinator.filesystem.resolve_path("/test.txt").unwrap();
        assert!(!file.permissions.public_read);
    }

    #[test]
    fn test_grant_command() {
        let temp_dir = tempfile::tempdir().unwrap();
        
        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        coordinator.verified_users.insert("zs1user123".to_string(), "zs1reply456".to_string());
        coordinator.filesystem.root.permissions.add_write_permission("zs1user123".to_string());
        coordinator.filesystem.create_file("/shared.txt", "content".to_string(), "zs1user123".to_string()).unwrap();
        
        let grant_msg = Message::new(
            "zs1user123".to_string(),
            "zs1coordinator".to_string(),
            "grant read zs1other456 /shared.txt".to_string()
        );
        
        let result = coordinator.handle_authenticated_command(&grant_msg);
        assert!(result.is_ok());
        assert!(result.unwrap().contains("Read permission granted"));
        
        let file = coordinator.filesystem.resolve_path("/shared.txt").unwrap();
        assert!(file.permissions.can_read("zs1other456"));
    }

    #[test]
    fn test_chat_command() {
        let temp_dir = tempfile::tempdir().unwrap();
        
        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        coordinator.verified_users.insert("zs1user123".to_string(), "zs1reply456".to_string());
        
        coordinator.filesystem.create_directory("/lobby", "coordinator".to_string()).unwrap();
        
        let chat_msg = Message::new(
            "zs1user123".to_string(),
            "zs1coordinator".to_string(),
            "chat /lobby \"Hello everyone in the lobby!\"".to_string()
        );
        
        let result = coordinator.handle_authenticated_command(&chat_msg);
        assert!(result.is_ok());
        assert!(result.unwrap().contains("Message sent to chatroom"));
        
        let chat_log = coordinator.filesystem.resolve_path("/lobby/.chat_log").unwrap();
        assert!(chat_log.content.as_ref().unwrap().contains("Hello everyone in the lobby!"));
    }

    #[test]
    fn test_chat_history_command() {
        let temp_dir = tempfile::tempdir().unwrap();
        
        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        coordinator.verified_users.insert("zs1user123".to_string(), "zs1reply456".to_string());
        coordinator.verified_users.insert("zs1user789".to_string(), "zs1reply000".to_string());
        
        coordinator.filesystem.create_directory("/general", "coordinator".to_string()).unwrap();
        
        let chat1 = Message::new("zs1user123".to_string(), "zs1coordinator".to_string(), "chat /general \"First message\"".to_string());
        let chat2 = Message::new("zs1user789".to_string(), "zs1coordinator".to_string(), "chat /general \"Second message\"".to_string());
        
        coordinator.handle_authenticated_command(&chat1).unwrap();
        coordinator.handle_authenticated_command(&chat2).unwrap();
        
        let history_msg = Message::new("zs1user123".to_string(), "zs1coordinator".to_string(), "history /general".to_string());
        let result = coordinator.handle_authenticated_command(&history_msg);
        
        assert!(result.is_ok());
        let history = result.unwrap();
        assert!(history.contains("First message"));
        assert!(history.contains("Second message"));
        assert!(history.contains("ser123"));
        assert!(history.contains("ser789"));
    }

    #[test]
    fn test_chat_permissions() {
        let temp_dir = tempfile::tempdir().unwrap();
        
        let mut coordinator = Coordinator::new(
            3600, 
            temp_dir.path().to_path_buf(), 
            "http://test:9067".to_string()
        );
        coordinator.verified_users.insert("zs1user123".to_string(), "zs1reply456".to_string());
        
        coordinator.filesystem.create_directory("/private", "coordinator".to_string()).unwrap();
        let private_dir = coordinator.filesystem.resolve_path_mut("/private").unwrap();
        private_dir.permissions.public_read = false;
        
        let chat_msg = Message::new(
            "zs1user123".to_string(),
            "zs1coordinator".to_string(),
            "chat /private \"Secret message\"".to_string()
        );
        
        let result = coordinator.handle_authenticated_command(&chat_msg);
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("Permission denied"));
    }

}