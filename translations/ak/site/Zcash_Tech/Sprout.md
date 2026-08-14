<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ffifi

> Zcash fii ase wɔ October 28, 2016, a Sprout shielded pool no ka ho.

Nea wobɛfa akɔ: Sprout ne baabi a Zcash fii ase, bere a edi kan a kokoam, sika a wotumi di ho adanse tuu mmirika wɔ live blockchain so.

Sprout yɛ Zcash network no mfitiaseɛ a wɔde sii hɔ, ɛnyɛ akyiri yi [network upgrade a wɔde yɛ adwuma](../start-here/network-upgrades). Ɛkɔɔ so traa ase wɔ genesis block no mu wɔ Ɔkɔtɔberɛ 28, 2016. ZIP biara nni hɔ a wɔde nɔma ahyɛ mu a ɛkyerɛkyerɛ Sprout mu: ZIP dwumadie no hyɛɛ aseɛ akyiri yi wɔ Overwinter, enti wɔde mfitiaseɛ Zcash Protocol Specification ne Zerocash adansiɛ a wɔsii wɔ so na ɛkyerɛkyerɛ Sprout mu. No [Electric Coin Company](../zcash-organizations/electric-coin-company) (saa bere no na Zerocoin Electric Coin Company), a Zooko Wilcox di wɔn anim no na ɛyɛɛ na wɔde menae. Sprout de zk-SNARK shielded transactions a edi kan a mfaso wɔ so ne mfitiase shielded pool no bae, sɛnea ɛbɛyɛ a nkurɔfo betumi de ZEC a nea ɔde kɔmaa, nea ogye, ne sika dodow a wɔde asie bere a netɛw no da so ara hwɛ sɛ sika a aka no aka ho no bae. Edin no kyerɛɛ nkɔnsɔnkɔnsɔn a ɛyɛ mmerante ne mmabaa a ɛrefifi a na kuw no hwɛ kwan sɛ ebenyin.

Nea enti a eyi ho hia. Ɔmanfoɔ blockchain biara a ɛwɔ hɔ ansa na Sprout reba no de wo sikatua reto gua: obiara bɛtumi ahunu deɛ ɔtuaa hena ne dodoɔ. Sprout ne network a edi kan a ɛte ase, a enni kwan a ɛde saa nsɛm no siee na ɛda so ara kyerɛe sɛ obiara nsisi. Ɛno ho hia ma sikasɛm mu kokoamsɛm a ɛyɛ mpapahwekwa, nea wohwɛ kwan fi sika anaa sikakorabea krataa a obiara ntumi nkenkan mu. Ɛsan nso daa no adi sɛ kokoamsɛm a emu yɛ den a ɛwɔ nkɔnsɔnkɔnsɔn mu betumi ayɛ adwuma wɔ nneyɛe mu, asen krataa so nhyehyɛe. Afahyɛ a wɔde wɔn ho to so a wɔde sii hɔ a ɛmaa ɛyɛɛ yiye no bɛyɛɛ ade a wɔde gyina so maa akyiri yi cryptography adwuma, na nhyehyɛe a ɛyɛ brɛoo, a ɛyɛ den sɛ wɔbɛkae adanse a Sprout de kɔmaa no no ne nea ɛhyɛɛ kuw no ma wɔkyekyee Sapling mfe abien akyi no pɛpɛɛpɛ.

## Ɔtare a edi kan a wɔabɔ ho ban

Sprout yɛɛ address ahorow abien. Address a ɛda adi pefee (t-addresses) yɛ adwuma te sɛ Bitcoin, a nsɛm no da adi wɔ ɔmanfo ledger no so. Address a wɔabɔ ho ban (z-addresses) de sika kɔ Sprout no mu [ɔtare a wɔabɔ ho ban](../using-zcash/shielded-pools), baabi a nea ɔde kɔmae, nea ogye, ne sika dodow no tra hɔ ahintaw. Afiri no ne sɛ [zk-SNARKs a wɔde wɔn ho hyɛ mu](../zcash-tech/zk-snarks), adanse a nimdeɛ biara nni mu a ɛma asɛm bi kyerɛ sɛ ɛyɛ nokware, a sika a wɔsɛe no mmɔho abien ne sika a aka a ɛka bom, a ɛnda nsɛm no mu biara adi. Sprout ne bere a edi kan a eyi tuu mmirika wɔ adwumayɛ mu wɔ cryptocurrency a ɛte ase so.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## Afahyɛ no

Na zk-SNARKs a ɛwɔ Sprout no hia ɔmanfoɔ parameters ahodoɔ bi, na sɛ wɔbɛhyehyɛ no dwoodwoo a, na ɛhia sɛ wɔyɛ nhyehyɛeɛ pɛnkoro a wɔfrɛ no Ceremony. Nnipa baanum a wɔde wɔn ho hyɛɛ mu wɔ mmeae ahorow a ɛsono emu biara a ɛwɔ akyirikyiri no mu biara yɛɛ kokoam ade bi, a wɔfrɛ no nwura a awuduru wom. Sɛ obi san boaboa asinasin no nyinaa ano da bi a, obetumi ayɛ ZEC afi hwee mu. Nsusuwii no danee saa asiane no yɛɛ no ​​mmara tiawa: bere tenten a anyɛ yiye koraa no, obiako a ɔde ne ho hyɛɛ mu sɛee wɔn afã no, na wontumi nsan nsi ahintasɛm mũ no nyinaa da, enti atoro a wɔbɛyɛ no kɔɔ so yɛɛ nea entumi nyɛ yiye. Wɔn a wɔde wɔn ho hyɛɛ mu a wɔabobɔ wɔn din wɔ baguam no bi ne Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, ne Derek Hinch a wɔwɔ NCC Kuw no mu. Obi a ɔde ne ho hyɛɛ mu no paw sɛ ɔremmɔ ne din.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## Mfiase no

Sprout ne nnyinaso a nsakrae biara a ɛbɛba akyiri yi de si so. Bere a network-upgrade nhyehyɛe no bae ne Overwinter no, ɛde mfitiase mmara no din too so sɛ consensus branch id 0, a ɛkyerɛ ara ne sɛ wɔmfaa upgrade biara nni dwuma de besi nnɛ. Biribiara fi saa bere no (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, ne nea ɛkɔ so) te nkɔnsɔnkɔnsɔn a Sprout fii ase no so. Wɔde too gua wɔ August 2016 mu maa October 28 genesis, Adeyɛ no tuu mmirika wɔ adapɛn a edii ɛno anim no mu, na genesis block no hardcoded timestamp no kenkan October 28, 2016, wɔ 07:56 UTC.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| zk-SNARK-AKWANKYERƐ | Adanse a nimdeɛ nnim a ɛkyerɛ sɛ asɛm bi ayɛ no yɛ nokware a ɛnkyerɛ nea ɔde kɔmaa, nea ogyee, anaa sika dodow |
| Ɔtare a wɔabɔ ho ban | Zcash kokoam fã a wɔde sika ne apontow ahorow asie. Sprout pool no ne nea edi kan |
| z-address ne t-address | Wɔabɔ z-address ho ban na ɛma nsɛm no yɛ kokoam. T-address bi yɛ nea ɛda adi pefee na ɛkyerɛ nsɛm a ɛkɔ akyiri wɔ ɔmanfo ledger |
| Afahyɛ no | 2016 multi-party setup a ɛmaa Sprout ɔmanfoɔ parameters na afei wɔtow awuduru nwura |
| Nwura a awuduru wom | Kokoam key pieces a efi Ceremony no mu a na ɛsɛ sɛ wɔsɛe no sɛnea ɛbɛyɛ a wɔrentumi nyɛ ZEC |
| Nhyiamu baa dwumadibea id 0 | Sprout mmara no label, a ɛkyerɛ sɛ mfitiaseɛ ansa na network upgrade biara |

## FAQ

So Sprout sesa me ZEC anaa me kokoam nsɛm nnɛ? Dabi Sprout yɛ abakɔsɛm, launch a efii nkɔnsɔnkɔnsɔn a wo ZEC te ase no ase. Wo sika ne wo kokoamsɛm nnɛ gyina sika kotoku ne shielded pool a wode di dwuma mprempren no so, ɛnyɛ biribiara a ɛsɛ sɛ woyɛ wɔ Sprout ho.

Dɛn nti na ZIP nɔma biara nni hɔ ma Sprout? ZIP nhyehyɛe no fii ase akyiri yi, denam Overwinter upgrade no so. Sprout yɛ mfitiaseɛ a wɔde sii hɔ, a Zcash Protocol Specification ne Zerocash adansiɛ a egyina so kyerɛkyerɛɛ mu. ZIP 200 ka Sprout ho asɛm wɔ akyi hwɛ mu nko ara, sɛ consensus branch id 0, mfitiaseɛ ansa na wɔayɛ nkɔsoɔ biara.

So na ɛsɛ sɛ mede me ho to nnipa baanum a wɔwɔ Afahyɛ no mu no so? Wɔkyekyeree nhyehyɛe no enti na wuhia wɔn mu biako pɛ sɛ wobɛka nokware. Ná wɔn mu biara kura kokoam asɛm bi, na bere tenten a obiako a ɔde ne ho hyɛɛ mu no sɛee wɔn de no, na wontumi nsan nkyekye ahintasɛm mũ no nyinaa da na obiara ntumi nnyɛ ZEC. Wɔabobɔ wɔn a wɔde wɔn ho hyɛɛ mu no mu baanum din wɔ baguam na obiako ammɔ ne din.

So Sprout pool no ne nea me sika kotoku de di dwuma mprempren? Ebia ɛnte saa. Sprout ne ɔtare a edi kan a wɔabɔ ho ban, nanso akyiri yi nneɛma a wɔyɛɛ no ​​foforo te sɛ Sapling de nhyehyɛe a wɔde abɔ ho ban ntɛmntɛm bae, na sika kotoku dodow no ara de atare foforo di dwuma nnɛ. Sprout da so ara ho hia efisɛ adwuma a ɛdaa adi sɛ kokoam, nkitahodi a wotumi di ho adanse no betumi akɔ so wɔ live network so.

Dɛn na ɛmaa Sprout yɛɛ soronko wɔ Bitcoin ho? Bitcoin de sika biara a wotua no to ɔmanfo nhomakorabea a wotumi hu sika dodow ne address ahorow so. Sprout de shielded transactions a ɛde nea ɔde kɔmaa, nea ogye, ne sika dodow sie kaa ho bere a ɛda so ara ma network no si so dua sɛ asɛm no yɛ nokware. Ɛmaa address ahorow a ɛda adi pefee nso, enti akwan abien no nyinaa tra nkɔnsɔnkɔnsɔn koro so.

## Sɔ wo ntease hwɛ

Wɔtaa frɛ Sprout sɛ network upgrade a ɛwɔ activation height. Dɛn nti na ɛno nteɛ koraa?

<details>
<summary>Answer</summary>

Sprout yɛ Zcash mfitiaseɛ a wɔde sii hɔ, ɛnyɛ akyiri yi upgrade. Ɛyɛ adwuma firi genesis block (block 0) wɔ October 28, 2016, enti activation height biara nni hɔ a yɛbɛtwe adwene asi so. Network-upgrade mechanism no bae akyiri yi na ɛde Sprout mmara no too so sɛ consensus branch id 0, mfitiaseɛ ansa na upgrade biara aba.
</details>

### Akadeɛ

[ZIP 200: Ntrɛwmu a Wɔde Yɛ Ntrɛwmu](https://zips.z.cash/zip-0200)

[Zcash ntwamutam a wɔayɛ no foforo](https://z.cash/upgrade/)

[Electric Coin Company: Zcash Sprout a wɔde sii hɔ](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Nhyiam no ho nhyehyɛe](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Hwɛ nso

[Atare a Wɔabɔ ho Ban](../using-zcash/shielded-pools)

[zk-SNARKS NKYERƐKYERƐMU](../zcash-tech/zk-snarks)

[Zcash Network Nkɔsoɔ a Wɔayɛ](../start-here/network-upgrades)

[Dɛn ne ZEC ne Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Ntoatoasoɔ: [Network Upgrades ho nkyerɛkyerɛmu](../start-here/network-upgrades) · Deɛ ɛdi hɔ: [Awɔw bere mu](../zcash-tech/overwinter)
