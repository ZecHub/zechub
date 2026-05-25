use super::transport::*;
use anyhow::Result;

#[allow(dead_code)]
pub fn unit_tests() -> Result<()> {
    let hash = ledger_pedersen_hash(
        &hex::decode("B315693B486D4D3CD8E4256E8C37CA4E8EC367E4D95D5C314625DC7B44B57EA2CA18FDCFF5871906F4238FB315693B486D4D3CD8E4256E8C37CA4E8EC367E4D95D5C314625DC7B44B57EA2")?
    )?;
    assert_eq!(
        hex::encode(hash),
        "155966835f64664e38335990c7ffbf37038375fa6b77e9315f40c136011a5a58"
    );

    let hash = ledger_jubjub_hash(&hex::decode(
        "B315693B486D4D3CD8E4256E8C37CA4E8EC367E4D95D5C314625DC7B44B57EA2CA18FDCFF5871906F4238F",
    )?)?;
    assert_eq!(
        hex::encode(hash),
        "0ce188d187e6e5bd7b4b966bdb0b0cc7737138be5adb60491e51e146a96944da"
    );

    let cmu = ledger_test_cmu(
        &hex::decode("20A1070000000000B315693B486D4D3CD8E4256E8C37CA4E8EC367E4D95D5C314625DC7B44B57EA2CA18FDCFF5871906F4238F196D4C779C9A84ECFA9248146DE1C089316947A991AECCB1522DD2A3855B96E8")?
    )?;
    assert_eq!(
        hex::encode(cmu),
        "d4a5fe02f8ad9056c4191f1a1c9a026641b617eaa0aed0d3b3be5228a998d069"
    );
    Ok(())
}
