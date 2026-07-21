use serde::{Deserialize, Serialize};

/// A parsed CAIP-2 Blockchain ID (`namespace:reference`).
///
/// Examples: `eip155:1`, `zcash:mainnet`, `bip122:000000000019d6689c085ae165831e93`
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct ChainId {
    pub namespace: String,
    pub reference: String,
}

impl ChainId {
    /// Parse a CAIP-2 string.
    pub fn parse(input: &str) -> Result<Self, String> {
        let mut parts = input.splitn(2, ':');
        let namespace = parts
            .next()
            .ok_or_else(|| "missing namespace".to_string())?
            .to_string();
        let reference = parts
            .next()
            .ok_or_else(|| "missing reference".to_string())?
            .to_string();
        if namespace.is_empty() {
            return Err("empty namespace".to_string());
        }
        if reference.is_empty() {
            return Err("empty reference".to_string());
        }
        Ok(Self {
            namespace,
            reference,
        })
    }

    pub fn to_caip_string(&self) -> String {
        format!("{}:{}", self.namespace, self.reference)
    }
}

/// A parsed CAIP-10 Account ID (`chain_id:account_address`).
///
/// Example: `eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb`
///
/// For account-based BIP44 wallets, the `account_address` part can be a
/// numeric string representing the account index (e.g. `"0"`, `"1"`).
/// Use [`AccountId::account_number`] to extract it.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct AccountId {
    pub chain_id: ChainId,
    pub account_address: String,
}

impl AccountId {
    pub fn parse(input: &str) -> Result<Self, String> {
        let parts: Vec<&str> = input
            .rsplitn(2, ':')
            .collect::<Vec<_>>()
            .into_iter()
            .rev()
            .collect();

        if parts.len() != 2 {
            return Err("invalid CAIP-10 format".to_string());
        }

        // parts[0] is the chain part (namespace:reference)
        // parts[1] is the account address
        let chain_id = ChainId::parse(parts[0])?;
        let account_address = parts[1].to_string();

        if account_address.is_empty() {
            return Err("empty account address".to_string());
        }

        Ok(Self {
            chain_id,
            account_address,
        })
    }

    pub fn to_caip_string(&self) -> String {
        format!(
            "{}:{}",
            self.chain_id.to_caip_string(),
            self.account_address
        )
    }

    /// Parse the `account_address` portion as a BIP44 account number (`u32`).
    ///
    /// This is used when the CAIP-10 address identifies a wallet account by
    /// its numeric index (e.g. `"eip155:1:0"` → account `0`).
    pub fn account_number(&self) -> Result<u32, String> {
        self.account_address
            .parse::<u32>()
            .map_err(|e| format!("account_address is not a valid u32: {e}"))
    }

    /// Construct an `AccountId` from a chain and a numeric BIP44 account number.
    ///
    /// This produces strings like `"eip155:1:0"` or `"zcash:mainnet:1"`.
    pub fn from_account(chain_id: ChainId, account: u32) -> Self {
        Self {
            chain_id,
            account_address: account.to_string(),
        }
    }
}

/// A parsed CAIP-19 Asset ID (`chain_id/asset_namespace:asset_reference`).
///
/// Example: `eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct AssetId {
    pub chain_id: ChainId,
    pub asset_namespace: String,
    pub asset_reference: String,
}

impl AssetId {
    pub fn parse(input: &str) -> Result<Self, String> {
        let (chain_part, asset_part) = input
            .split_once('/')
            .ok_or_else(|| "missing '/' separator".to_string())?;

        let chain_id = ChainId::parse(chain_part)?;

        let mut asset_parts = asset_part.splitn(2, ':');
        let asset_namespace = asset_parts
            .next()
            .ok_or_else(|| "missing asset namespace".to_string())?
            .to_string();
        let asset_reference = asset_parts
            .next()
            .ok_or_else(|| "missing asset reference".to_string())?
            .to_string();

        if asset_namespace.is_empty() {
            return Err("empty asset namespace".to_string());
        }
        if asset_reference.is_empty() {
            return Err("empty asset reference".to_string());
        }

        Ok(Self {
            chain_id,
            asset_namespace,
            asset_reference,
        })
    }

    pub fn to_caip_string(&self) -> String {
        format!(
            "{}/{}:{}",
            self.chain_id.to_caip_string(),
            self.asset_namespace,
            self.asset_reference
        )
    }

    /// Convert this CAIP-19 asset to the domain-level [`AssetId`](crate::AssetId) enum.
    ///
    /// A native asset is identified by `slip44:<coin_type>`. All other
    /// asset namespaces (e.g. `erc20`) map to `AssetId::Token`.
    pub fn to_asset_enum(&self, native_coin_type: &str) -> crate::AssetId {
        if self.asset_namespace == "slip44" && self.asset_reference == native_coin_type {
            crate::AssetId::Native
        } else {
            crate::AssetId::Token(self.to_caip_string())
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_caip2_ethereum_mainnet() {
        let id = ChainId::parse("eip155:1").unwrap();
        assert_eq!(id.namespace, "eip155");
        assert_eq!(id.reference, "1");
    }

    #[test]
    fn test_caip2_zcash_mainnet() {
        let id = ChainId::parse("zcash:mainnet").unwrap();
        assert_eq!(id.namespace, "zcash");
        assert_eq!(id.reference, "mainnet");
    }

    #[test]
    fn test_caip2_invalid_empty() {
        assert!(ChainId::parse(":").is_err());
        assert!(ChainId::parse("eip155:").is_err());
        assert!(ChainId::parse(":1").is_err());
    }

    #[test]
    fn test_caip10_ethereum() {
        let id = AccountId::parse("eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb").unwrap();
        assert_eq!(id.chain_id.namespace, "eip155");
        assert_eq!(id.chain_id.reference, "1");
        assert_eq!(
            id.account_address,
            "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
        );
    }

    #[test]
    fn test_caip19_erc20() {
        let id =
            AssetId::parse("eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48").unwrap();
        assert_eq!(id.chain_id.namespace, "eip155");
        assert_eq!(id.chain_id.reference, "1");
        assert_eq!(id.asset_namespace, "erc20");
        assert_eq!(
            id.asset_reference,
            "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
        );
    }

    #[test]
    fn test_caip_roundtrip() {
        let input = "eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
        let parsed = AssetId::parse(input).unwrap();
        assert_eq!(parsed.to_caip_string(), input);
    }

    #[test]
    fn test_account_number() {
        let id = AccountId::parse("eip155:1:0").unwrap();
        assert_eq!(id.account_number().unwrap(), 0);

        let id = AccountId::parse("zcash:mainnet:42").unwrap();
        assert_eq!(id.account_number().unwrap(), 42);
    }

    #[test]
    fn test_account_number_invalid() {
        let id = AccountId::parse("eip155:1:0xabc").unwrap();
        assert!(id.account_number().is_err());
    }

    #[test]
    fn test_from_account() {
        let chain = ChainId {
            namespace: "eip155".into(),
            reference: "1".into(),
        };
        let id = AccountId::from_account(chain, 5);
        assert_eq!(id.to_caip_string(), "eip155:1:5");
    }

    #[test]
    fn test_to_asset_enum_native() {
        let asset = AssetId::parse("eip155:1/slip44:60").unwrap();
        let result = asset.to_asset_enum("60");
        assert_eq!(result, crate::AssetId::Native);
    }

    #[test]
    fn test_to_asset_enum_token() {
        let asset =
            AssetId::parse("eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48").unwrap();
        let result = asset.to_asset_enum("60");
        assert_eq!(
            result,
            crate::AssetId::Token(
                "eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48".into()
            )
        );
    }
}
