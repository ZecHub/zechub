<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Mining_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Mining Pools

Mining pools let Zcash miners combine hashpower and receive smaller, more regular payouts instead of waiting to find a full block alone. Zcash uses the Equihash proof-of-work algorithm, and most current ZEC mining is done with Equihash ASIC hardware rather than consumer GPUs.

This page lists active Zcash mining pools and the practical details to compare before pointing hardware at a pool. Pool fees, payout thresholds, regions, and reward methods can change, so always confirm the current settings on the pool's own website before mining.

## What to Compare

- **Reward method:** PPS and PPS+ usually provide steadier payouts, while PPLNS can vary more with pool luck.
- **Pool fee:** A lower fee helps, but uptime, stale share rate, and payout reliability matter too.
- **Minimum payout:** Smaller miners may prefer lower payout thresholds.
- **Server location:** Use a nearby stratum server to reduce latency and stale shares.
- **Account model:** Some pools support anonymous wallet mining; others require an account.
- **Payout address support:** Check whether the pool supports the address type you plan to use.

## Pool List

| Pool | Website | Reward method | Fee / payout notes | Notes |
| --- | --- | --- | --- | --- |
| 2Miners | [zec.2miners.com](https://2miners.com/zec-mining-pool) | PPLNS and SOLO | 1% PPLNS fee; Minerstat lists 0.01 ZEC payout for 2Miners | Anonymous mining by wallet address; global servers and frequent automatic payouts. |
| F2Pool | [f2pool.com](https://www.f2pool.com/coin/zcash) | PPS+ | F2Pool help lists 3% fee and 0.1 ZEC payout threshold | Large multi-coin pool with account dashboard and mobile app support. |
| Kryptex Pool | [pool.kryptex.com/zec](https://pool.kryptex.com/zec) | PPS+ | Pool page supports direct ZEC mining and configurable payout threshold | Offers pool mining directly to a wallet or Kryptex account-based payout options. |
| Luxor | [luxor.tech](https://luxor.tech/) | PPS | Minerstat lists custom payout and 3% fee for ZEC | Institutional mining pool with account-based management tools. |
| Mining Pool Hub | [miningpoolhub.com](https://miningpoolhub.com/) | Varies by setup | Check account dashboard for current ZEC fee and auto-exchange settings | Multi-coin pool with account registration and optional auto-exchange workflows. |
| AntPool | [antpool.com](https://www.antpool.com/) | Varies by account settings | Check AntPool's ZEC page for current fee and payout rules | Bitmain-operated pool; commonly used by ASIC miners. |
| ViaBTC | [viabtc.com](https://www.viabtc.com/) | PPS+ / PPLNS options may vary | Check ViaBTC's ZEC page for current fee and payout threshold | Multi-coin pool with global servers and account dashboard. |

## Example Stratum Configuration

Most ASIC dashboards and mining software ask for the same three fields:

```text
Pool URL:  stratum+tcp://POOL_HOST:PORT
Worker:    YOUR_ZEC_ADDRESS.WORKER_NAME
Password:  x
```

For example, a 2Miners worker may look like:

```text
Pool URL:  stratum+tcp://zec.2miners.com:1010
Worker:    t1YourTransparentZcashAddress.Rig1
Password:  x
```

Use the exact host and port from your chosen pool's setup page. Some pools require an account username instead of a wallet address.

## Before You Start Mining

- Create and back up a Zcash wallet before configuring payouts.
- Run a profitability estimate with your hashrate, power draw, electricity rate, and the current ZEC price.
- Test the miner for accepted shares, rejected shares, temperature, and power stability before leaving it unattended.
- Avoid mining directly to an exchange unless the pool and exchange both explicitly support that payout flow.
- Re-check pool status pages periodically; hashrate distribution and payout rules change over time.

## References

- [MiningPoolStats Zcash pool list](https://miningpoolstats.stream/zcash)
- [Minerstat Zcash mining pools](https://minerstat.com/coin/zec/pools)
- [2Miners Zcash pool](https://2miners.com/zec-mining-pool)
- [F2Pool ZEC mining guide](https://f2pool.zendesk.com/hc/en-us/articles/4405453805837-ZEC-mining-guide)
- [Kryptex Zcash pool](https://pool.kryptex.com/zec)

_Last reviewed: June 2026._
