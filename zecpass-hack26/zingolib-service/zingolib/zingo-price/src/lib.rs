#![warn(missing_docs)]

//! Crate for fetching ZEC prices.
//!
//! Currently only supports USD.

use std::{
    collections::HashSet,
    io::{Read, Write},
    time::SystemTime,
};

use byteorder::{LittleEndian, ReadBytesExt, WriteBytesExt};

use serde::Deserialize;
use zcash_client_backend::tor::{self, http::cryptex::Exchanges};
use zcash_encoding::{Optional, Vector};

/// Errors with price requests and parsing.
// TODO: remove unused when historical data is implemented
#[derive(Debug, thiserror::Error)]
pub enum PriceError {
    /// Request failed.
    #[error("request failed. {0}")]
    RequestFailed(#[from] reqwest::Error),
    /// Deserialization failed.
    #[error("deserialization failed. {0}")]
    DeserializationFailed(#[from] serde_json::Error),
    /// Parse error.
    #[error("parse error. {0}")]
    ParseError(#[from] std::num::ParseFloatError),
    /// Price list start time not set. Call `PriceList::set_start_time`.
    #[error("price list start time has not been set.")]
    PriceListNotInitialized,
    /// Tor price fetch error.
    #[error("tor price fetch error. {0}")]
    TorError(#[from] tor::Error),
    /// Decimal conversion error.
    #[error("decimal conversion error. {0}")]
    DecimalError(#[from] rust_decimal::Error),
    /// Invalid price.
    #[error("invalid price.")]
    InvalidPrice,
}

#[derive(Debug, Deserialize)]
struct CurrentPriceResponse {
    price: String,
    timestamp: u32,
}

/// Price of ZEC in USD at a given point in time.
#[derive(Debug, Clone, Copy)]
pub struct Price {
    /// Time in seconds.
    pub time: u32,
    /// ZEC price in USD.
    pub price_usd: f32,
}

/// Price list for wallets to maintain an updated list of daily ZEC prices.
#[derive(Debug)]
pub struct PriceList {
    /// Current price.
    current_price: Option<Price>,
    /// Historical price data by day.
    // TODO: currently unused
    daily_prices: Vec<Price>,
    /// Time of last historical price update in seconds.
    // TODO: currently unused
    time_historical_prices_last_updated: Option<u32>,
}

impl Default for PriceList {
    fn default() -> Self {
        Self::new()
    }
}

impl PriceList {
    /// Constructs a new price list from the time of wallet creation.
    #[must_use]
    pub fn new() -> Self {
        PriceList {
            current_price: None,
            daily_prices: Vec::new(),
            time_historical_prices_last_updated: None,
        }
    }

    /// Returns current price.
    #[must_use]
    pub fn current_price(&self) -> Option<Price> {
        self.current_price
    }

    /// Returns historical price data by day.
    #[must_use]
    pub fn daily_prices(&self) -> &[Price] {
        &self.daily_prices
    }

    /// Returns time historical prices were last updated.
    #[must_use]
    pub fn time_historical_prices_last_updated(&self) -> Option<u32> {
        self.time_historical_prices_last_updated
    }

    /// Price list requires a start time before it can be updated.
    ///
    /// Recommended start time is the time the wallet's birthday block height was mined.
    pub fn set_start_time(&mut self, time_of_birthday: u32) {
        self.time_historical_prices_last_updated = Some(time_of_birthday);
    }

    /// Update and return current price of ZEC.
    ///
    /// Will fetch via tor if a `tor_client` is provided.
    /// Currently only USD is supported.
    pub async fn update_current_price(
        &mut self,
        tor_client: Option<&tor::Client>,
    ) -> Result<Price, PriceError> {
        let current_price = if let Some(client) = tor_client {
            get_current_price_tor(client).await?
        } else {
            get_current_price().await?
        };
        self.current_price = Some(current_price);

        Ok(current_price)
    }

    /// Prunes historical price list to only retain prices for the days containing `transaction_times`.
    ///
    /// Will not remove prices above or equal to the `prune_below` threshold.
    // TODO: under development
    pub fn prune(&mut self, transaction_times: Vec<u32>, prune_below: u32) {
        let mut relevant_days = HashSet::new();

        for transaction_time in transaction_times {
            for daily_price in self.daily_prices() {
                if daily_price.time > transaction_time {
                    assert!(daily_price.time - transaction_time < 60 * 60 * 24);
                    relevant_days.insert(daily_price.time);
                    break;
                }
            }
        }

        self.daily_prices
            .retain(|price| relevant_days.contains(&price.time) || price.time >= prune_below);
    }

    fn serialized_version() -> u8 {
        0
    }

    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let _version = reader.read_u8()?;

        let time_last_updated = Optional::read(
            &mut reader,
            byteorder::ReadBytesExt::read_u32::<LittleEndian>,
        )?;
        let current_price = Optional::read(&mut reader, |r| {
            Ok(Price {
                time: r.read_u32::<LittleEndian>()?,
                price_usd: r.read_f32::<LittleEndian>()?,
            })
        })?;
        let daily_prices = Vector::read(&mut reader, |r| {
            Ok(Price {
                time: r.read_u32::<LittleEndian>()?,
                price_usd: r.read_f32::<LittleEndian>()?,
            })
        })?;

        Ok(Self {
            current_price,
            daily_prices,
            time_historical_prices_last_updated: time_last_updated,
        })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&self, mut writer: W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;

        Optional::write(
            &mut writer,
            self.time_historical_prices_last_updated(),
            byteorder::WriteBytesExt::write_u32::<LittleEndian>,
        )?;
        Optional::write(&mut writer, self.current_price(), |w, price| {
            w.write_u32::<LittleEndian>(price.time)?;
            w.write_f32::<LittleEndian>(price.price_usd)
        })?;
        Vector::write(&mut writer, self.daily_prices(), |w, price| {
            w.write_u32::<LittleEndian>(price.time)?;
            w.write_f32::<LittleEndian>(price.price_usd)
        })
    }
}

/// Get current price of ZEC in USD
async fn get_current_price() -> Result<Price, PriceError> {
    let httpget = reqwest::get("https://api.gemini.com/v1/trades/zecusd?limit_trades=11").await?;
    let mut trades = httpget
        .json::<Vec<CurrentPriceResponse>>()
        .await?
        .iter()
        .map(|response| {
            let price_usd: f32 = response.price.parse()?;
            if !price_usd.is_finite() {
                return Err(PriceError::InvalidPrice);
            }

            Ok(Price {
                price_usd,
                time: response.timestamp,
            })
        })
        .collect::<Result<Vec<Price>, PriceError>>()?;

    trades.sort_by(|a, b| {
        a.price_usd
            .partial_cmp(&b.price_usd)
            .expect("trades are checked to be finite and comparable")
    });

    Ok(trades[5])
}

/// Get current price of ZEC in USD over tor.
async fn get_current_price_tor(tor_client: &tor::Client) -> Result<Price, PriceError> {
    let exchanges = Exchanges::unauthenticated_known_with_gemini_trusted();
    let current_price = tor_client.get_latest_zec_to_usd_rate(&exchanges).await?;
    let current_time = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .expect("should never fail when comparing with an instant so far in the past")
        .as_secs() as u32;

    Ok(Price {
        time: current_time,
        price_usd: current_price.try_into()?,
    })
}
