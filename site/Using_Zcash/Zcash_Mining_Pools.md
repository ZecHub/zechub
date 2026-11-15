<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Mining_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Mining Pools

## TL;DR

* A mining pool combines the hashrate of many miners and splits each block reward it finds based on each miner's contribution.
* Pool members get small, regular payouts. A solo miner with home hardware may wait years for a block of their own.
* Pools differ by payout method, fee, and payout privacy. Each entry below lists all three.
* Private Payouts shows whether a pool can pay to a shielded address.
* Check a pool's status and current fee on its own site before you point hardware at it.

## Core Explanation

### What is a Zcash Mining Pool?

Zcash mining pools are services that allow individual miners to combine their computing power (hashrate). By pooling resources, participants increase their odds of solving network blocks and earn consistent, smaller payouts rather than relying on solo mining's unpredictable lottery system.

### How Payouts Work

Each miner sends the pool small pieces of finished work called shares. The pool counts the shares and pays out by its payout method. The entries below use three methods:

- **Pay Per Share (PPS):** the pool pays a fixed amount for every valid share, whether or not it finds a block. The pool carries the luck risk, so PPS fees tend to be higher.
- **Pay Per Last N Shares (PPLNS):** the pool pays out from the blocks it actually finds, split across the most recent N shares. Payouts rise and fall with the pool's luck, and fees tend to be lower.
- **Pay Per Share Plus (PPS+):** the block reward is paid the PPS way, and transaction fees are shared the PPLNS way.

---

### List of Zcash Mining Pools

---

#### [Luxor](https://luxor.tech/)

<a href="https://luxor.tech/">
    <img src="/content-images/Luxor-20Pool-3aa38cd52b.webp" alt="Luxor Logo" width="200" height="100"/>
</a>

- Website: [Luxor](https://luxor.tech/)
- Private Payouts: YES
- Pool Type: Pay Per Share
- Pool fee: 3%

---

#### [2Miners](https://zec.2miners.com/)

<a href="https://zec.2miners.com/">
    <img src="/content-images/2Miners-3c99609047.webp" alt="2Miners Logo" width="200" height="100"/>
</a>

- Website: [2Miners](https://zec.2miners.com/)
- Private Payouts: No
- Pool Type: Pay Per Last N 
- Pool fee: 1%

---

#### [Nanopool](https://zec.nanopool.org/)

<a href="https://zec.nanopool.org/">
    <img src="/content-images/Nanopool-e484b00998.webp" alt="Nanopool Logo" width="200" height="100"/>
</a>

- Website: [Nanopool](https://zec.nanopool.org/)
- Private Payouts: No
- Pool Type: Pay Per Last N 
- Pool fee: 1%

---

#### [Poolin](https://www.poolin.com/)

<a href="https://www.poolin.com/">
    <img src="/content-images/Poolin-6fd4b44ba3.webp" alt="Poolin Logo" width="200" height="100"/>
</a>

- Website: [Poolin](https://www.poolin.com/)
- Status: Poolin Technology PTE. LTD. has been in Chapter 11 bankruptcy since 22 July 2026 (Case No. 26-18325, U.S. Bankruptcy Court, District of New Jersey; [case information](https://veritaglobal.net/Poolin)). Confirm the pool still mines and pays out ZEC before pointing hashrate at it (checked 13 November 2026).
- Private Payouts: No
- Pool Type: Pay Per Share
- Pool fee: 3%

---

#### [Antpool](https://v3.antpool.com/home)

<a href="https://v3.antpool.com/home">
    <img src="/content-images/Antpool-9c5dac3b65.webp" alt="Antpool Logo" width="200" height="100"/>
</a>

- Website: [Antpool](https://v3.antpool.com/home)
- Private Payouts: No
- Pool Type: Pay Per Share
- Pool fee: 3%

---

#### [ViaBTC](https://www.viabtc.com/en/)

<a href="https://www.viabtc.com/en/">
    <img src="/content-images/ViaBTC-8fa5be7bd7.webp" alt="ViaBTC Logo" width="200" height="100"/>
</a>

- Website: [ViaBTC](https://www.viabtc.com/en/)
- Private Payouts: No
- Pool Type: Pay Per Share+
- Pool fee: 4%

---

#### [Foundry Zcash Mining Pool](https://foundrydigital.com/foundry-zcash-pool/)

<a href="https://foundrydigital.com/foundry-zcash-pool/">
    <img src="/content-images/Foundry-3f33346374.webp" alt="Foundry Zcash Mining Pool Logo" width="200" height="100"/>
</a>

- Website: [Foundry Zcash Mining Pool](https://foundrydigital.com/foundry-zcash-pool/)
- Private Payouts: No
- Pool Type: Pay Per Last N Shares
- Pool fee: Not publicly

---

#### [suprnova](https://zec.suprnova.cc/)

<a href="https://zec.suprnova.cc/">
    <img src="/content-images/suprnova-logo-1-small-e95de6cdb3.webp" alt="suprnova Logo" width="200" height="100"/>
</a>

- Website: [suprnova](https://zec.suprnova.cc/)
- Private Payouts: No
- Pool Type: Pay Per Last N Shares
- Pool fee: 0,5% - 1%

---

#### [NiceHash](https://www.nicehash.com/blog/post/how-to-start-mining-zec-equihash-on-nicehash)

<a href="https://www.nicehash.com/blog/post/how-to-start-mining-zec-equihash-on-nicehash">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAYFBMVEX7wkH////8yF3+7Mz7vSX/+O37wT37wDj7vzP7viz//fn//vz7xlH+89/94av+5bb8zWr81IL+7tP7xUr8y2T96sL814v7uhP7yFf++Of95r38z3T93Z/92pX80G/80ntd2P20AAAGDklEQVR4nO2c6ZaqOhCFw5AJGQREpQF9/7c8gLaNQkJVDHDXuuzfdPojqcSkagfifIpGP83tmhMSntLEo4fRAwpRlxFb+mg6ak5ECNa3z7hk19TbGCoorhfx3jTjvojphlDRnfGJJ5g4FVtBBY2cQuqx/CraBIqeheYpfs02gKKhjqkbw5/VoehRz9RSsZlpaB1qrp96KqEPd9tQgTaeXlR5uSZUA2Fqo/2oW7AsQ5US+KyIV4MK7qr1aSSu6Sq7UAW8MXFeC8oFd1Qr9cpuFSq6IJ4WzTpQwKn3EMuV+yubUPSEaksqfwNtQmW4x6VyVbAJ9YMZvXZRuKvGzyYUKqTaoHJVS5VNqBu2KdWiYBPqimxKqCLdJlSOfN5XbatsQmH1/4UKkc8rV0+bUEdkU2wNqBSzR2iZQtWe2CZUAt12PqFuwQpQHq4p9d7F6i4B15ZUnrNsQh1QQcW48phldZNX+IinRapisrxH54jGhPrsbhcqhm9eeKWae7ahEBtiqUlyWD4hg6NKE1H2cwkVbAKyUJfPsw0VwXZ66jVqCSgnE4AGRa1jWiCT98NmW5SNPs+/QM7Tm+srzYF9MSinyHXRzmQ9Vw9ZJI9eHtWdJcL59P4yFQcai+m1ncv7fG5/sdpM2RA5alnwG6hmtFwVK6pzKf9mIhOS3T317906UI4TZPXdJcL3fcnCqvFAFaweKvdtaQTV6kCjzPO8LCphffT7Np4tTUFtrh0Kqh0Kqh0Kqh0Kqh0Kqh0Kqh0Kqh0Kqh0Kqh0Kqh0KKkKxwpwFewXof0FcpPJZx+Cnshz7PwhDSlkZVarwsf8DXdiWCRYKWbzrau3Ycu1smnEkkOFvIBYSnP+GEH7DQh1xtVfCXLSDg+XI6Rfk2NeusDXkdvwAqcahIuToEZ6SGvs3arPStNBxLmpsYbsdP015bUJBhc06yoQU2OFTW3AmlWFfmvCCZOj0qbbANlKKDQ/CMlKGaCqOCHV0mHd2DKxRsIdKwVdEAvTkJuxEicGfETlnmH+pQEdU+8oBcdBrQtfDwOw6xcdGV1YkJi+jrboPB6/Cv3BXfyUOxdh0f6VzNv8J+1Pc60K77TCkVDumAmwWkG7Nh5jo9+j4laSnOs+MIOyOwrjdtIdK8NOv/+tKG+3UJJ5a8aSHigymSE8V/ig761CEZq/aex+66wRAr8S4AZkq1vYoHRczYerndXfuiw0WhWcT4pyNeivIUm74ms+NUQdltCg8JWSVRINfnSCKK0UpGqRL+YRyviq0Miny4zkpPM9LzrdcGK0wr8auzi8UwkE13RQXsiuzSoExiE3pcTPnYcAxnH/29fAd9VA4s+CCem6KHlkXD2MWXFD+Y6f9gDr8N8aPhc4AyvSnxrJ48gZVYm8VLKF2I/wG9cWqbk+vY+4vVDBvNVtajAQfUE68eVTxV+br7x4y/qhlV6+IGmaHUcbmBTTIW/5BHW6bDuAwGTfIoyPvr9lWNgnl1BsuC3LobB1CBdutoO9n7rcySEa2onq/OP9em2k2GkD/3Zb8DhVsMwP5MdBAORE2v2xDLP84qX2W1kxyMN9q5HMf1fsM0lVfauxzHxch05X7So7zumMoiq2lfKepjzBMlGvpdUUqfp3I3UzVkDPDjIkJUzhVKZgsbJdaF79Vpsn7ZtPVdm8dKq4oSCssAOUaI6joJ7UvIVs+2tWf+lGaJehx4fVKqj/IonZwULOsMVQiVedxdbaS2jRxOS8mdXeotF4X/QWfL8Rz7T0cvQEnOi5x7mLypq8YzriCgtr+cZ6RZqZYMWtV8kLLs1DOf/Rr3j9Fa2Ixsjip56tyEFNXdvMtjSHzK0ipHuY0K9xvc9E9Ej8VoOoz0P5Gk4mrY0gkyWBfAUR48oL49E1vMX6Nwc4PhFGQJrlvWC/jfphoP4hmDNUqS0N86YWJMPXATgY8lHOIYvci4ePIuLy4cYRCMvJ5lnEVckiHMcHDChrcX0J1Rb0klRdNzYp1da2LSJMI7Qo1hupFizo9hUy0bH9wjLc0vPtoal0YdNHXUE7ndS2zImnSmxv2zsw8dG9pnRRZiffNDvUP4sxWisnyFFkAAAAASUVORK5CYII=" alt="NiceHash Logo" width="200" height="100"/>
</a>

- Website: [NiceHash](https://www.nicehash.com/blog/post/how-to-start-mining-zec-equihash-on-nicehash)
- Private Payouts: get paid in Bitcoin (BTC)
- Pool Type: Hashrate Marketplace / Proxy Pool
- Pool fee: 0,5% - 1%

---

#### [Sovright Mining Pool](https://mining.sovright.com/)

<a href="https://mining.sovright.com/">
    <img src="/content-images/-qOtwa1p_400x400-fce1523375.webp" alt="Sovright Logo" width="200" height="100"/>
</a>

- Website: [Sovright Mining Pool](https://mining.sovright.com/)
- Private Payouts: YES
- Pool Type: Pay Per Last N Shares (PPLNS)
- Pool Fee: 1%


---

### Former Zcash pools

#### Slush Pool (Braiins Pool)

Braiins Pool is not a current Zcash mining option. Its [official pool FAQ](https://academy.braiins.com/braiins-pool/faqs/pool) lists Bitcoin as the supported coin and says it has no plans to support altcoins (checked 12 November 2026).

## Visual / Analogy

A mining pool works like a fishing crew. One boat with one net catches a big fish once in many years. A crew of boats spreads nets across the whole bay, brings in fish every day, and splits the catch by how much net each boat put in the water.

Your hashrate is the net. The block reward is the catch.

## Common Mistakes

- **Mixing up mining pools and shielded pools.** A mining pool is a service for miners. A [shielded pool](/using-zcash/shielded-pools) is a part of the Zcash protocol that holds private funds.
- **Choosing a pool by fee alone.** The payout method changes how steady your income is. A low-fee PPLNS pool pays less in unlucky weeks.
- **Skipping the status notes.** Poolin carries a bankruptcy note, and Former Zcash pools lists pools that no longer mine ZEC.
- **Using a transparent payout address.** Where Private Payouts says YES, give the pool a shielded address.
- **Expecting ZEC from NiceHash.** NiceHash pays miners in Bitcoin (BTC).

## Related Pages

- [Zcash Mining Guide](/using-zcash/zcash-mining-guide): set up hardware and software and join a pool.
- [Zcash Monetary Policy](/start-here/zcash-monetary-policy): the block reward that pools share.
- [Shielded Pools](/using-zcash/shielded-pools): where private payouts land.
- [Wallets](/using-zcash/wallets): wallets that give you a shielded address for payouts.
