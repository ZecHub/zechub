use crate::CoinConfig;
use anyhow::anyhow;
use chrono::NaiveDateTime;

const DAY_SEC: i64 = 24 * 3600;

#[derive(Debug)]
pub struct Quote {
    pub timestamp: i64,
    pub price: f64,
}

pub async fn fetch_historical_prices(
    coin: u8,
    now: i64,
    days: u32,
    currency: &str,
) -> anyhow::Result<Vec<Quote>> {
    let c = CoinConfig::get(coin);
    let chain = c.chain;
    let json_error = || anyhow::anyhow!("Invalid JSON");
    let today = now / DAY_SEC;
    let from_day = today - days as i64;
    let latest_quote = {
        let db = c.db()?;
        db.get_latest_quote(currency)?
    };
    let latest_day = if let Some(latest_quote) = latest_quote {
        latest_quote.timestamp / DAY_SEC
    } else {
        0
    };
    let latest_day = latest_day.max(from_day);

    let mut quotes: Vec<Quote> = vec![];
    let from = (latest_day + 1) * DAY_SEC;
    let to = today * DAY_SEC;
    if from != to {
        let client = reqwest::Client::new();
        let url = format!(
            "https://api.coingecko.com/api/v3/coins/{}/market_chart/range",
            chain.ticker()
        );
        let params = [
            ("from", from.to_string()),
            ("to", to.to_string()),
            ("vs_currency", currency.to_string()),
        ];
        let req = client.get(url).query(&params);
        let res = req.send().await?;
        let t = res.text().await?;
        let r: serde_json::Value = serde_json::from_str(&t)?;
        let status = &r["status"]["error_code"];
        if status.is_null() {
            let prices = r["prices"].as_array().ok_or_else(json_error)?;
            let mut prev_timestamp = 0i64;
            for p in prices.iter() {
                let p = p.as_array().ok_or_else(json_error)?;
                let ts = p[0].as_i64().ok_or_else(json_error)? / 1000;
                let price = p[1].as_f64().ok_or_else(json_error)?;
                // rounded to daily
                let date = NaiveDateTime::from_timestamp_opt(ts, 0)
                    .ok_or(anyhow!("Invalid Date"))?
                    .date()
                    .and_hms_opt(0, 0, 0)
                    .ok_or(anyhow!("Invalid Date"))?;
                let timestamp = date.timestamp();
                if timestamp != prev_timestamp {
                    let quote = Quote { timestamp, price };
                    quotes.push(quote);
                }
                prev_timestamp = timestamp;
            }
        }
    }

    Ok(quotes)
}
