<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling kɔɔ so traa ase wɔ Zcash mainnet so wɔ block 419,200 (October 29, 2018, 02:15 UTC).

Nea wobɛfa: Sapling yɛɛ kokoam Zcash sikatua ntɛmntɛm na emu yɛ hare a ɛbɛtumi ayɛ adwuma wɔ fon anaa hardware sika kotoku so.

Sapling yɛ Zcash network upgrade kɛseɛ a ɛtɔ so mmienu, a ɛyɛɛ adwuma wɔ Zcash afe a ɛtɔ so mmienu. Na ɛyɛ consensus hard fork a ɛsan kyekyee sɛnea wɔde shielded (private) transactions bom. Wɔde ZIP 205 na ɛkyerɛkyerɛ dwumadie no mu, atɔfoɔ nsaano nkyerɛwee mmara foforɔ no denam ZIP 243 so, na wɔn mmienu nyinaa si ZIP 200, ntwamutam nkɔsoɔ kwan no so. Nsɛm no nyinaa te ase wɔ Zcash Protocol Specification no mu. Electric Coin Company sii upgrade no na ɛde version a ɛdi kan a ɛboaa no, zcashd 2.0.0, wɔ August 2018. Wɔ nkɔnsɔnkɔnsɔn so no, network no kyerɛ Sapling mmara no denam ne consensus branch id so.

Nea enti a eyi ho hia. Ansa na Sapling reba no, na kokoam sika a wotua ankasa no kyerɛ sɛ wobɛtwɛn simma kakraa bi bere a wo kɔmputa no rewene memory gigabytes mu de ayɛ adanse no. Ɛno yɛɛ brɛoo dodo na na emu yɛ duru dodo ma nnipa dodow no ara, enti wɔn a wɔde di dwuma, wɔn a wɔsesa nneɛma, ne sotɔɔ ahorow pii huruwa nnwuma a wɔabɔ ho ban na wɔde ZEC kɔmaa baguam mmom. Sapling twaa adwuma no so kɔɔ sikani kakraa bi ne bɛyɛ megabyte 40 memory. Saa nsakrae biako pɛ no ne nea ɛmaa ZEC a wɔabɔ ho ban no yɛɛ nea mfaso wɔ so sɛ wɔde bedi dwuma wɔ da biara da asetra mu, wɔ telefon a ɛnyɛ den so ne hardware sika kotoku so.

## Nea ɛsakrae

Sapling koma yɛ ɔkwan a ɛyɛ ntɛm a wɔfa so kyekye adanse a nimdeɛ nnim a ɛma asɛm a wɔabɔ ho ban no yɛ kokoam. Mfitiase Sprout nhyehyɛe no de proving circuit biako (JoinSplit circuit) a ɛyɛ brɛoo na ɛkɔm de nkae dii dwuma. Sapling de amansin abien a wɔde atirimpɔw ayɛ, Spend amansin ne Output amansin, a wɔaka ho asɛm wɔ Zcash Protocol Specification mu no sii ananmu. Nea afi mu aba ne ɛka a wɔbɔ no so tew kɛse. Sɛnea Electric Coin Company kyerɛ no, wobetumi ayɛ asɛm a wɔabɔ ho ban wɔ sikani kakraa bi mu denam bɛyɛ megabytes 40 memory so. Na mfitiaseɛ a ɛwɔ hɔ ansa na Sapling Sprout reba no mu yɛ duru koraa, ɛyɛ simma ne gigabyte pii a wɔde kae (saa Sprout afã akontabuo yi ne mfitiaseɛ bɛyɛ a wɔatwe adwene asi so kɛseɛ).

![Sprout versus Sapling shielded transaction cost](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## Safe foforo

Sapling nso de address ne nsafe foforo a wɔabɔ ho ban bae. Safoa biako betumi anya address ahorow pii a ɛsono emu biara, a ɛyɛ address ahorow a wɔde tua ka a ɛsono emu biara a obi a ɔhwɛ abɔnten so ntumi nsan nkɔfa ne ho. Sapling de viewing keys nso kaa ho: viewing key a ɛyɛ ma anaa ɛba no ma wotumi kyɛ tumi a wode bɛhunu wallet bi ayɔnkofa ho nsɛm a womfa tumi a wode bedi dwuma ne sika no mma. Ɛno ho wɔ mfaso ma akontaabu, akontaabu, anaasɛ ɛkyerɛ sɛ wɔatua sika bi kɛkɛ.

Nsakrae a ɛfa ho ne sɛ Sapling tetew adwuma a ɛne sɛ wɔbɛkyekye adanse no ne adwuma a ɛne sɛ wɔde wɔn nsa bɛhyɛ asɛm no ase no mu. Ɛnsɛ sɛ mfiri a ɛyɛ zero-nimdeɛ adanse no yɛ mfiri a ɛkura tumi a wɔde di dwuma no bio. Saa decoupling yi ne nea ɛma hardware wallet ma wo spending key no tew ne ho bere a device a ɛyɛ soronko yɛ proving adwuma a emu yɛ duru no.

![Proving device hands the proof to a separate signing device](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## Nhyehyɛe a wotumi de ho to so no

Sapling amansin ahorow no de ne ho to ɔmanfo nsusuwii ahorow bi a na ɛsɛ sɛ wɔyɛ no yiye so. Sɛ anka ɔfã biako nkutoo na wɔyɛɛ wɔn na wɔde kokoam nsɛm a aka ("awuduru nwura") no sie a, anka saa kuw no betumi ayɛ adanse ahorow a ɛnyɛ nokware. Nea ɛbɛyɛ na wɔakwati eyi no, na parameters no fi guasodeyɛ a ɛwɔ afã abien, a apontow ahorow pii wom mu. Ná Ɔfã 1 a wɔfrɛ no Powers of Tau no yɛ ɔmansin-agnostic, a ɛkyerɛ sɛ na ɛnkyekyere Sapling amansin pɔtee no. Ná Ɔfã 2, Sapling MPC, yɛ ɔmansin pɔtee bi. Ɔfã biara kɔ so yɛ nea ahobammɔ wom bere tenten a anyɛ yiye koraa no, obiako a ɔde ne ho hyɛɛ mu no dii nokware na ɔsɛee wɔn nwura a awuduru wom no, enti sɛ obiara a ɔde ne ho hyɛɛ mu no yɛ biako nkutoo a, guasodeyɛ no di nkogu.

## Sɛnea ɛyɛɛ adwuma

Sapling dii Overwinter akyi, June 2018 nkɔsoɔ a ɛsiesiee ntwamutam no nkɔsoɔ kwan no. Electric Coin Company de mainnet activation height sii hɔ wɔ zcashd 2.0.0 mu, a wɔyii no adi wɔ August 2018 mu, na network no dan kɔɔ Sapling mmara so berɛ a wɔtu block 419,200. Wɔ nkɔnsɔnkɔnsɔn so no, wɔde Sapling consensus branch id na ɛhyɛ saa bere no agyirae.

![Timeline from Zcash launch to Sapling activation](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| Adwuma a wɔabɔ ho ban | Zcash kokoam asɛm a ɛde nea ɔde kɔmaa, nea ogye, ne sika dodow no sie. |
| Sprout | Mfitiaseɛ shielded protocol Zcash de sii hɔ, brɛoo na emu yɛ duru sene Sapling. |
| Spend ne Output amansin | Sapling proving circuits foforo abien a esii Sprout JoinSplit circuit biako no ananmu. |
| Address a ɛwɔ ahorow ahorow | Address pii a entumi nkɔ so tua ka a wubetumi anya afi safe biako mu no mu biako. |
| Hwɛ safoa | Safoa a ɛma obi hu sika kotoku mu nnwuma a ontumi nsɛe sika mfi mu. |
| Nhyiamu baa dwumadibea id | Code tiawa a ɛkyerɛ network no upgrade mmara a asɛm bi di akyi. |

## FAQ

So Sapling sesaa ZEC dodow a mewɔ? Dabi Sapling sesaa sɛnea wɔkyekye nnwuma a wɔabɔ ho ban, ɛnyɛ ZEC dodow a obiara kura anaasɛ nea wɔde ma nyinaa. Wo kari pɛ no annya nkɛntɛnso biara.

So me ZEC da so ara yɛ kokoam wɔ Sapling akyi? Yiw, na wotumi de di dwuma kɛse. Sapling maa kokoamsɛm a emu yɛ den a ɛwɔ nnwuma a wɔabɔ ho ban mu no siei na ɛmaa ɛyɛɛ ntɛmntɛm na ne bo nyɛ den sɛnea ɛbɛyɛ a wobetumi de adi dwuma ankasa. Sika a wɔabɔ ho ban no kɔ so sie saa ara.

So ɛsɛ sɛ meyɛ biribi? Wɔnhwehwɛ adeyɛ biara mfi wo hɔ sɛ obi a okura. Na Sapling yɛ network upgrade a wallet ne node software gyee toom. Nnɛyi sika kotoku boa Sapling address ahorow dedaw.

Nsonsonoe bɛn na ɛda Sprout ne Sapling ntam? Sprout ne protocol a edi kan a wɔabɔ ho ban na ɛde ɔmansin biako a ɛyɛ brɛoo, a ɛyɛ den sɛ ɛbɛkae a ɛkyerɛ sɛ ɛyɛ nokware dii dwuma. Sapling de Spend ne Output circuits a ɛyɛ ntɛm sii ananmu, de viewing keys ne address ahorow a ɛsono emu biara kaa ho, na ɛmaa shielded transactions yɛɛ hare a ɛfata ma fon ne hardware wallet.

Dɛn nti na nsɛm bi ka sɛ October 28 na afoforo ka sɛ October 29? Wɔdii kan de activation height no sii hɔ sɛ wɔde bɛto October 28, 2018. Wɔtu block a ɛkanyan nsakraeɛ no ankasa, block 419,200, wɔ October 29 UTC anɔpatutuutu. Wɔ mpɔtam hɔ bere nhyehyɛe pii mu a na ɛda so ara yɛ October 28. Ɛyɛ block koro no ara ne bere koro no ara ɔkwan biara so.

Dɛn ne safe a wɔde hwɛ nneɛma? Viewing key ma wo kyɛ akenkan kwan kɔ sika kotoku a wɔabɔ ho ban so. Obi a ɔwɔ safe a ɛhwɛ ade a ɛyɛ ma anaasɛ ɛreba no betumi ahu sika kotoku no mu aguadi ho nsɛm nanso ontumi mfa ne sika nni dwuma. Hwɛ [Nneɛma a Wɔde Hwɛ](../zcash-tech/viewing-keys) sɛ wopɛ pii a.

## Sɔ wo ntease hwɛ

Wɔ Sprout ase no, dɛn nti na nnipa pii kwatii aguadi a wɔabɔ ho ban, na ɔkwan bɛn so na Sapling siesiee?

<details>
<summary>Answer</summary>
Wɔ Sprout ase no, na sɛ wɔbɛkyekyere asɛm a wɔabɔ ho ban no gye simma kakraa bi na wɔde gigabytes memory dii dwuma, enti na ɛyɛ brɛoo dodo na emu yɛ duru ma wɔn a wɔde di dwuma, wɔn a wɔsesa, ne sotɔɔ dodow no ara. Sapling de Spend ne Output circuits a ɛyɛ ntɛm a ɛtew adwuma no so kɔɔ sikɔne kakraa bi ne bɛyɛ megabytes 40 bae, na ɛmaa nnwuma a wɔabɔ ho ban no yɛɛ nea mfaso wɔ so wɔ da biara da fon ne hardware sika kotoku so.
</details>

### Akadeɛ

- [ZIP 205: Sapling Network Upgrade no a wɔde bedi dwuma](https://zips.z.cash/zip-0205)
- [ZIP 243: Transaction Signature Validation for Sapling](https://zips.z.cash/zip-0243)
- [Zcash Sapling upgrade krataafa](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling announcement](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Wɔde Sapling MPC no reto gua](https://electriccoin.co/blog/sapling-mpc/)

### Hwɛ nso

- [Atare a Wɔabɔ ho Ban](../using-zcash/shielded-pools)
- [Nneɛma a Wɔde Hwɛ](../zcash-tech/viewing-keys)
- [zk-SNARKS NKYERƐKYERƐMU](../zcash-tech/zk-snarks)
- [Zcash Network Nkɔsoɔ a Wɔayɛ](../start-here/network-upgrades)
- [Sika kotoku](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Ntoatoasoɔ: [Network Upgrades ho nkyerɛkyerɛmu](../start-here/network-upgrades) · Dada: [Awɔw bere mu](../zcash-tech/overwinter) · Deɛ ɛdi hɔ: [Nhwiren a ɛyɛ fɛ](../zcash-tech/blossom)
