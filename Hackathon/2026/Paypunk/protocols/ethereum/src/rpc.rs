use async_trait::async_trait;
use paypunk_types::AssetId;

/// Trait abstracting an Ethereum JSON-RPC client.
///
/// Implementations can use any transport (HTTP, IPC, WebSocket) and
/// any RPC library (reqwest, alloy-provider, ethers-rs, etc.).
#[async_trait]
pub trait EthRpcClient: Send + Sync {
    /// Query the balance for the given address and asset.
    ///
    /// - `AssetId::Native` → ETH balance (wei)
    /// - `AssetId::Token(contract)` → ERC-20 token balance (smallest unit)
    async fn get_balance(&self, address: &str, asset: &AssetId) -> Result<u128, String>;

    /// Return the current nonce (transaction count) for the given address.
    async fn get_transaction_count(&self, address: &str) -> Result<u64, String>;

    /// Return the chain ID of the connected network.
    async fn get_chain_id(&self) -> Result<u64, String>;

    /// Broadcast a signed raw transaction and return the tx hash.
    async fn send_raw_transaction(&self, raw_tx: &[u8]) -> Result<String, String>;

    /// Return the current suggested gas price (wei).
    async fn get_gas_price(&self) -> Result<u128, String>;

    /// Estimate the gas needed for a transaction.
    async fn estimate_gas(
        &self,
        from: &str,
        to: &str,
        value: &str,
        data: &str,
    ) -> Result<u64, String>;

    /// Return the current block number.
    async fn get_block_number(&self) -> Result<u64, String>;

    /// Return the transaction receipt for a given tx hash, if confirmed.
    async fn get_transaction_receipt(&self, tx_hash: &str) -> Result<Option<TxReceipt>, String>;
}

/// Minimal representation of an Ethereum transaction receipt.
#[derive(Debug, Clone)]
pub struct TxReceipt {
    pub status: bool,
    pub block_number: u64,
    pub gas_used: u64,
    pub effective_gas_price: u128,
}

/// No-op implementation for contexts that only need signing
/// (e.g. keypunkd where balance queries are never called).
#[async_trait]
impl EthRpcClient for () {
    async fn get_balance(&self, _address: &str, _asset: &AssetId) -> Result<u128, String> {
        Err("no RPC client configured".to_string())
    }
    async fn get_transaction_count(&self, _address: &str) -> Result<u64, String> {
        Err("no RPC client configured".to_string())
    }
    async fn get_chain_id(&self) -> Result<u64, String> {
        Err("no RPC client configured".to_string())
    }
    async fn send_raw_transaction(&self, _raw_tx: &[u8]) -> Result<String, String> {
        Err("no RPC client configured".to_string())
    }
    async fn get_gas_price(&self) -> Result<u128, String> {
        Err("no RPC client configured".to_string())
    }
    async fn estimate_gas(
        &self,
        _from: &str,
        _to: &str,
        _value: &str,
        _data: &str,
    ) -> Result<u64, String> {
        Err("no RPC client configured".to_string())
    }
    async fn get_block_number(&self) -> Result<u64, String> {
        Err("no RPC client configured".to_string())
    }
    async fn get_transaction_receipt(&self, _tx_hash: &str) -> Result<Option<TxReceipt>, String> {
        Err("no RPC client configured".to_string())
    }
}

/// A real Ethereum JSON-RPC client over HTTP.
///
/// Uses `reqwest` (async) to send JSON-RPC 2.0 requests to the configured endpoint.
/// Sync trait methods bridge via `tokio::runtime::Handle::current().block_on()`.
pub struct HttpRpcClient {
    client: reqwest::Client,
    url: String,
}

impl HttpRpcClient {
    pub fn new(url: String) -> Self {
        Self {
            client: reqwest::Client::new(),
            url,
        }
    }

    async fn call(
        &self,
        method: &str,
        params: serde_json::Value,
    ) -> Result<serde_json::Value, String> {
        let body = serde_json::json!({
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params,
        });

        let resp = self
            .client
            .post(&self.url)
            .json(&body)
            .send()
            .await
            .map_err(|e| format!("RPC request failed: {e}"))?;

        let json: serde_json::Value = resp
            .json()
            .await
            .map_err(|e| format!("RPC response parse failed: {e}"))?;

        if let Some(err) = json.get("error") {
            return Err(format!("RPC error ({}): {}", err["code"], err["message"]));
        }

        json.get("result")
            .cloned()
            .ok_or_else(|| "RPC response missing result".to_string())
    }

    /// Parse a hex quantity (0x-prefixed) to u64.
    fn hex_u64(val: &serde_json::Value) -> Result<u64, String> {
        let s = val
            .as_str()
            .ok_or_else(|| "expected hex string".to_string())?;
        let s = s.strip_prefix("0x").unwrap_or(s);
        u64::from_str_radix(s, 16).map_err(|e| format!("invalid hex: {e}"))
    }

    /// Parse a hex quantity to u128.
    fn hex_u128(val: &serde_json::Value) -> Result<u128, String> {
        let s = val
            .as_str()
            .ok_or_else(|| "expected hex string".to_string())?;
        let s = s.strip_prefix("0x").unwrap_or(s);
        u128::from_str_radix(s, 16).map_err(|e| format!("invalid hex: {e}"))
    }
}

#[async_trait]
impl EthRpcClient for HttpRpcClient {
    async fn get_balance(&self, address: &str, asset: &AssetId) -> Result<u128, String> {
        match asset {
            AssetId::Native => {
                let result = self
                    .call("eth_getBalance", serde_json::json!([address, "latest"]))
                    .await?;
                Self::hex_u128(&result)
            }
            AssetId::Token(contract) => {
                // ERC-20 balanceOf(address) selector: 0x70a08231
                let addr = address.strip_prefix("0x").unwrap_or(address);
                let data = format!("0x70a08231{:0>64}", addr);
                let result = self
                    .call(
                        "eth_call",
                        serde_json::json!([{
                    "to": contract,
                    "data": data,
                }, "latest"]),
                    )
                    .await?;
                Self::hex_u128(&result)
            }
        }
    }

    async fn get_transaction_count(&self, address: &str) -> Result<u64, String> {
        let result = self
            .call(
                "eth_getTransactionCount",
                serde_json::json!([address, "pending"]),
            )
            .await?;
        Self::hex_u64(&result)
    }

    async fn get_chain_id(&self) -> Result<u64, String> {
        let result = self.call("eth_chainId", serde_json::json!([])).await?;
        Self::hex_u64(&result)
    }

    async fn send_raw_transaction(&self, raw_tx: &[u8]) -> Result<String, String> {
        let hex = format!("0x{}", hex::encode(raw_tx));
        let result = self
            .call("eth_sendRawTransaction", serde_json::json!([hex]))
            .await?;
        result
            .as_str()
            .map(String::from)
            .ok_or_else(|| "expected hex tx hash".to_string())
    }

    async fn get_gas_price(&self) -> Result<u128, String> {
        let result = self.call("eth_gasPrice", serde_json::json!([])).await?;
        Self::hex_u128(&result)
    }

    async fn estimate_gas(
        &self,
        from: &str,
        to: &str,
        value: &str,
        data: &str,
    ) -> Result<u64, String> {
        let mut tx = serde_json::json!({
            "to": to,
        });
        let map = tx.as_object_mut().unwrap();
        if !from.is_empty() {
            map.insert("from".into(), serde_json::json!(from));
        }
        if !value.is_empty() && value != "0x0" {
            map.insert("value".into(), serde_json::json!(value));
        }
        if !data.is_empty() {
            map.insert("data".into(), serde_json::json!(data));
        }
        let result = self
            .call("eth_estimateGas", serde_json::json!([tx, "latest"]))
            .await?;
        Self::hex_u64(&result)
    }

    async fn get_block_number(&self) -> Result<u64, String> {
        let result = self.call("eth_blockNumber", serde_json::json!([])).await?;
        Self::hex_u64(&result)
    }

    async fn get_transaction_receipt(&self, tx_hash: &str) -> Result<Option<TxReceipt>, String> {
        let result = self
            .call("eth_getTransactionReceipt", serde_json::json!([tx_hash]))
            .await?;
        if result.is_null() {
            return Ok(None);
        }
        let status_hex = result["status"].as_str().unwrap_or("0x0");
        let status = status_hex == "0x1" || status_hex == "1";
        Ok(Some(TxReceipt {
            status,
            block_number: Self::hex_u64(&result["blockNumber"])?,
            gas_used: Self::hex_u64(&result["gasUsed"])?,
            effective_gas_price: result["effectiveGasPrice"]
                .as_str()
                .map(|s| {
                    let s = s.strip_prefix("0x").unwrap_or(s);
                    u128::from_str_radix(s, 16).unwrap_or(0)
                })
                .unwrap_or(0),
        }))
    }
}

/// A stub client that always returns "not implemented".
/// Use this as a placeholder until a real RPC client is wired.
/// A stub client that always returns "not implemented".
/// Use this as a placeholder until a real RPC client is wired.
pub struct UnimplementedRpcClient;

#[async_trait]
impl EthRpcClient for UnimplementedRpcClient {
    async fn get_balance(&self, _address: &str, _asset: &AssetId) -> Result<u128, String> {
        Err("balance query not yet implemented — needs RPC endpoint".to_string())
    }
    async fn get_transaction_count(&self, _address: &str) -> Result<u64, String> {
        Err("not implemented".to_string())
    }
    async fn get_chain_id(&self) -> Result<u64, String> {
        Err("not implemented".to_string())
    }
    async fn send_raw_transaction(&self, _raw_tx: &[u8]) -> Result<String, String> {
        Err("not implemented".to_string())
    }
    async fn get_gas_price(&self) -> Result<u128, String> {
        Err("not implemented".to_string())
    }
    async fn estimate_gas(
        &self,
        _from: &str,
        _to: &str,
        _value: &str,
        _data: &str,
    ) -> Result<u64, String> {
        Err("not implemented".to_string())
    }
    async fn get_block_number(&self) -> Result<u64, String> {
        Err("not implemented".to_string())
    }
    async fn get_transaction_receipt(&self, _tx_hash: &str) -> Result<Option<TxReceipt>, String> {
        Err("not implemented".to_string())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    struct MockRpcClient;

    #[async_trait]
    impl EthRpcClient for MockRpcClient {
        async fn get_balance(&self, _address: &str, _asset: &AssetId) -> Result<u128, String> {
            Ok(10_000_000_000_000_000_000)
        }
        async fn get_transaction_count(&self, _address: &str) -> Result<u64, String> {
            Ok(5)
        }
        async fn get_chain_id(&self) -> Result<u64, String> {
            Ok(1)
        }
        async fn send_raw_transaction(&self, _raw_tx: &[u8]) -> Result<String, String> {
            Ok("0xabc".to_string())
        }
        async fn get_gas_price(&self) -> Result<u128, String> {
            Ok(20_000_000_000)
        }
        async fn estimate_gas(
            &self,
            _from: &str,
            _to: &str,
            _value: &str,
            _data: &str,
        ) -> Result<u64, String> {
            Ok(21_000)
        }
        async fn get_block_number(&self) -> Result<u64, String> {
            Ok(19_000_000)
        }
        async fn get_transaction_receipt(
            &self,
            _tx_hash: &str,
        ) -> Result<Option<TxReceipt>, String> {
            Ok(Some(TxReceipt {
                status: true,
                block_number: 19_000_001,
                gas_used: 21_000,
                effective_gas_price: 20_000_000_000,
            }))
        }
    }

    #[tokio::test]
    async fn test_mock_all_methods() {
        let c = MockRpcClient;
        assert_eq!(
            c.get_balance("0xabc", &AssetId::Native).await.unwrap(),
            10_000_000_000_000_000_000
        );
        assert_eq!(c.get_transaction_count("0xabc").await.unwrap(), 5);
        assert_eq!(c.get_chain_id().await.unwrap(), 1);
        assert_eq!(
            c.send_raw_transaction(&[0x02, 0x00]).await.unwrap(),
            "0xabc"
        );
        assert_eq!(c.get_gas_price().await.unwrap(), 20_000_000_000);
        assert_eq!(
            c.estimate_gas("0xabc", "0xdef", "0x0", "").await.unwrap(),
            21_000
        );
        assert_eq!(c.get_block_number().await.unwrap(), 19_000_000);
        let receipt = c.get_transaction_receipt("0xabc").await.unwrap().unwrap();
        assert!(receipt.status);
        assert_eq!(receipt.block_number, 19_000_001);
    }
}
