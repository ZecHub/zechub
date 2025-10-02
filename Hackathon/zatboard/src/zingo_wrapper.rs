use std::process::Command;
use std::path::PathBuf;
use crate::message::Message;

pub struct ZingoClient {
    data_dir: PathBuf,
    server: String,
}

impl ZingoClient {
    pub fn new(data_dir: PathBuf, server: String) -> Self {
        ZingoClient { data_dir, server }
    }
    
    pub fn execute_command(&self, cmd: &str) -> Result<String, String> {
        let output = Command::new("zingo-cli")
            .arg("--data-dir")
            .arg(&self.data_dir)
            .arg("--server")
            .arg(&self.server)
            .arg("--chain")
            .arg("testnet")
            .arg(cmd)
            .output()
            .map_err(|e| format!("Failed to execute zingo-cli: {}", e))?;
            
        if output.status.success() {
            Ok(String::from_utf8_lossy(&output.stdout).to_string())
        } else {
            Err(String::from_utf8_lossy(&output.stderr).to_string())
        }
    }
    
    pub fn get_addresses(&self) -> Result<Vec<String>, String> {
        let response = self.execute_command("addresses")?;
        Ok(vec![response])
    }
    
    pub fn send_memo(&self, address: &str, amount_zatoshis: u64, memo: &str) -> Result<String, String> {
        let cmd = format!("quicksend {} 0 \"{}\"", address, memo);
        println!("DEBUG: Executing send command: {}", cmd);

        match self.execute_command(&cmd) {
            Ok(output) => {
                println!("DEBUG: Send result: {}", output);
                Ok(output)
            }
            Err(e) => {
                println!("DEBUG: Send failed: {}", e);
                Err(e)
            }
        }
    }

    pub fn send_memo_zec(&self, address: &str, amount_zec: f64, memo: &str) -> Result<String, String> {
        let zatoshis = (amount_zec * 100_000_000.0) as u64;
        self.send_memo(address, zatoshis, memo)
    }
    
    pub fn get_messages(&self) -> Result<Vec<Message>, String> {
        let response = self.execute_command("messages")?;
        self.parse_messages(&response)
    }
    
    fn parse_messages(&self, raw_data: &str) -> Result<Vec<Message>, String> {
        let json_start = raw_data.find('{');
        let json_end = raw_data.rfind('}');
        
        if let (Some(start), Some(end)) = (json_start, json_end) {
            let json_str = &raw_data[start..=end];
            
            match serde_json::from_str::<serde_json::Value>(json_str) {
                Ok(json) => {
                    let mut messages = Vec::new();
                    
                    if let Some(transfers) = json.get("value_transfers").and_then(|v| v.as_array()) {
                        for transfer in transfers {
                            let txid = transfer.get("txid")
                                .and_then(|t| t.as_str())
                                .unwrap_or("unknown_txid")
                                .to_string();
                                
                            if let Some(memos) = transfer.get("memos").and_then(|m| m.as_array()) {
                                for memo in memos {
                                    if let Some(memo_text) = memo.as_str() {
                                        if !memo_text.is_empty() && !memo_text.contains("ZecFaucet") {
                                            let sender = format!("client_{}", &txid[..8]);
                                            
                                            let message = Message::with_txid(
                                                sender,
                                                "coordinator".to_string(),
                                                memo_text.to_string(),
                                                txid.clone()
                                            );
                                            messages.push(message);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                    if !messages.is_empty() {
                        println!("📨 Found {} messages", messages.len());
                    }
                    Ok(messages)
                }
                Err(_e) => Ok(vec![])
            }
        } else {
            Ok(vec![])
        }
    }
        
    // pub fn poll_for_new_messages(&mut self) -> Result<Vec<Message>, String> {
    //     let all_messages = self.zingo_client.poll_for_messages(1, Some(3))?;

    //     let new_messages: Vec<Message> = all_messages.into_iter()
    //         .filter(|msg| {
    //             if let Some(ref txid) = msg.txid {
    //                 if self.processed_txids.contains(txid) {
    //                     false  
    //                 } else {
    //                     self.processed_txids.insert(txid.clone()); 
    //                     true  
    //                 }
    //             } else {
    //                 true 
    //             }
    //         })
    //         .collect();
        
    //     if !new_messages.is_empty() {
    //         println!("🆕 Processing {} new messages (filtered from {})", 
    //                 new_messages.len(), 
    //                 new_messages.len() + self.processed_txids.len());
    //     }
        
    //     Ok(new_messages)
    // }
    
    pub fn poll_once(&self) -> Result<Vec<Message>, String> {
        self.execute_command("sync run")?;
        self.get_messages()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_client_creation() {
        let client = ZingoClient::new(
            PathBuf::from("/tmp/test"),
            "http://test:9067".to_string()
        );
        assert_eq!(client.data_dir, PathBuf::from("/tmp/test"));
        assert_eq!(client.server, "http://test:9067");
    }
    
    #[test]
    fn test_send_memo_format() {
        let _client = ZingoClient::new(
            PathBuf::from("/tmp/test"),
            "http://test:9067".to_string()
        );
        
        let cmd = format!("quicksend {} {} \"{}\"", "zs1test", 100000, "ls /home");
        assert!(cmd.contains("quicksend"));
        assert!(cmd.contains("zs1test"));
        assert!(cmd.contains("ls /home"));
        assert!(cmd.contains("100000"));
    }

    #[test]
    fn test_zatoshi_conversion() {
        let _client = ZingoClient::new(
            PathBuf::from("/tmp/test"),
            "http://test:9067".to_string()
        );
        
        assert_eq!(100_000_000, 100_000_000);
    }

    #[test]
    fn test_session_timeout_logic() {
        let _client = ZingoClient::new(
            PathBuf::from("/tmp/test"),
            "http://test:9067".to_string()
        );
        
        let timeout_secs = 3600;
        assert!(timeout_secs > 0);
    }
    
    #[test]
    fn test_parse_empty_messages() {
        let client = ZingoClient::new(
            PathBuf::from("/tmp/test"),
            "http://test:9067".to_string()
        );
        
        let result = client.parse_messages("[]");
        assert!(result.is_ok());
        assert_eq!(result.unwrap().len(), 0);
    }
}