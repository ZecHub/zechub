pub const DEFAULT_INDEXERS: &[&str] = &[
    "https://zec.rocks:443",
    "https://mainnet.lightwalletd.com:9067",
    "https://zcash.mysideoftheweb.com:9067",
];

pub fn from_env() -> Vec<String> {
    let configured = std::env::var("LIGHTWALLETD_URL").ok();

    let mut endpoints: Vec<String> = configured
        .as_deref()
        .map(|list| {
            list.split(',')
                .map(str::trim)
                .filter(|uri| !uri.is_empty())
                .map(str::to_string)
                .collect()
        })
        .unwrap_or_default();

    for fallback in DEFAULT_INDEXERS {
        if !endpoints.iter().any(|uri| uri == fallback) {
            endpoints.push((*fallback).to_string());
        }
    }

    endpoints
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn the_defaults_are_always_available_as_fallbacks() {
        let endpoints = from_env();
        assert!(endpoints.len() >= DEFAULT_INDEXERS.len());
        assert!(endpoints.contains(&DEFAULT_INDEXERS[0].to_string()));
    }

    #[test]
    fn a_configured_endpoint_is_never_duplicated_by_a_fallback() {
        let endpoints = from_env();
        let mut seen = endpoints.clone();
        seen.sort();
        seen.dedup();
        assert_eq!(seen.len(), endpoints.len());
    }
}
