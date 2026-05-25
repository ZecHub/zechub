use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CoordinatorConfig {
    pub network: NetworkConfig,
    pub storage: StorageConfig,
    pub fees: FeeConfig,
    pub api: ApiConfig,
    pub logging: LoggingConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NetworkConfig {
    pub zingo_server: String,
    pub coordinator_address: Option<String>,
    pub polling_interval_secs: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StorageConfig {
    pub data_dir: PathBuf,
    pub database_file: String,
    pub cache_ttl_secs: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FeeConfig {
    pub enabled: bool,
    pub per_command_zatoshi: u64,
    pub chat_message_zatoshi: u64,
    pub file_upload_zatoshi: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ApiConfig {
    pub enable_json_rpc: bool,
    pub bind_address: String,
    pub bind_port: u16,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LoggingConfig {
    pub level: String,
    pub log_file: Option<PathBuf>,
    pub enable_console: bool,
}

impl Default for CoordinatorConfig {
    fn default() -> Self {
        CoordinatorConfig {
            network: NetworkConfig {
                zingo_server: "http://localhost:9067".to_string(),
                coordinator_address: None,
                polling_interval_secs: 1,
            },
            storage: StorageConfig {
                data_dir: PathBuf::from("./coordinator_data"),
                database_file: "filesystem.db".to_string(),
                cache_ttl_secs: 10,
            },
            fees: FeeConfig {
                enabled: false,
                per_command_zatoshi: 1000,
                chat_message_zatoshi: 500,
                file_upload_zatoshi: 5000,
            },
            api: ApiConfig {
                enable_json_rpc: true,
                bind_address: "127.0.0.1".to_string(),
                bind_port: 8080,
            },
            logging: LoggingConfig {
                level: "info".to_string(),
                log_file: Some(PathBuf::from("coordinator.log")),
                enable_console: true,
            },
        }
    }
}

impl CoordinatorConfig {
    pub fn load_from_file(path: &PathBuf) -> Result<Self, String> {
        if !path.exists() {
            let default_config = CoordinatorConfig::default();
            default_config.save_to_file(path)?;
            println!("Created default config file: {}", path.display());
            return Ok(default_config);
        }

        let content = std::fs::read_to_string(path)
            .map_err(|e| format!("Failed to read config file: {}", e))?;
            
        toml::from_str(&content)
            .map_err(|e| format!("Failed to parse config file: {}", e))
    }
    
    pub fn save_to_file(&self, path: &PathBuf) -> Result<(), String> {
        let content = toml::to_string_pretty(self)
            .map_err(|e| format!("Failed to serialize config: {}", e))?;
            
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent)
                .map_err(|e| format!("Failed to create config directory: {}", e))?;
        }
        
        std::fs::write(path, content)
            .map_err(|e| format!("Failed to write config file: {}", e))
    }
}