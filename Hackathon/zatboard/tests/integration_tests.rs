use zatboard::zingo_wrapper::ZingoClient;
use zatboard::message::Message;
use std::path::PathBuf;

#[test]
fn test_full_memo_workflow() {
    let _client = ZingoClient::new(
        PathBuf::from("/tmp/test-integration"),
        "https://example.com:9067".to_string()
    );
    
    let test_message = Message::new(
        "zs1sender123".to_string(),
        "zs1recipient456".to_string(),
        "ls /home".to_string()
    );
    
    assert_eq!(test_message.memo_text, "ls /home");
    assert_eq!(test_message.sender_address, "zs1sender123");
    assert_eq!(test_message.recipient_address, "zs1recipient456");
    
    let mut signed_message = test_message.clone();
    signed_message.sign("test_key").unwrap();
    assert!(signed_message.signature.is_some());
    assert!(signed_message.verify_signature("test_key"));
}

#[test]
fn test_zatoshi_amounts() {
    let _client = ZingoClient::new(
        PathBuf::from("/tmp/test"),
        "https://example.com:9067".to_string()
    );
    
    let zec_001 = 100_000;
    let zec_1 = 100_000_000;
    
    assert_eq!(zec_001, 100_000);
    assert_eq!(zec_1, 100_000_000);
}

#[test] 
fn test_memo_command_formats() {
    let zatboard_commands = vec![
        "ls /home",
        "cat /readme.txt",
        "mkdir /new-folder", 
        "chat general Hello everyone!",
    ];
    
    for cmd in zatboard_commands {
        let message = Message::new(
            "zs1test".to_string(),
            "zs1coordinator".to_string(),
            cmd.to_string()
        );
        
        assert!(!message.memo_text.is_empty());
        assert!(message.memo_text.len() <= 512);
    }
}