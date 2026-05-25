use serde::Deserialize;

#[derive(Deserialize)]
struct ZWLKey {
    private_key: String,
}

pub fn read_zwl(data: &str) -> anyhow::Result<Vec<String>> {
    let keys: Vec<ZWLKey> = serde_json::from_str(data)?;
    let mut secret_keys = vec![];
    for k in keys.iter() {
        if k.private_key.starts_with("secret-") {
            secret_keys.push(k.private_key.clone());
        }
    }
    Ok(secret_keys)
}
