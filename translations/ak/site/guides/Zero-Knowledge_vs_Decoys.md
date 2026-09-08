<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zero Nimdeɛ vs Decoy a egyina Systems so

"Cryptocurrency da wo sikasɛm dwumadi nyinaa adi kyerɛ ɔmanfo efisɛ ɛte sɛ Twitter a ɛkɔ wo Sikakorabea akontaabu so ara pɛ na eyi yɛ asɛm kɛse a ɛsɛ sɛ wodi ho dwuma denam nkɔnsɔnkɔnsɔn kokoamsɛm a wogye tom so." - Ian Miers wɔ [Devcon4. Ɔde ne nsa kyerɛɛ ne so](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Crypto nnwuma bi anya agyede wɔ wɔn akwan a ɛfa kokoam nsɛm ho no ho. Zcash agye din sɛ wɔde Zero Knowledge Proofs (ZK) di dwuma de bɔ nnwuma sika ne address ho ban. Monero da nsow wɔ Decoy-based sender obfuscation a ɔde di dwuma de ka encryption nhyehyɛe afoforo ho de nya ɔdefo kokoamsɛm wɔ blockchain no so.


<a href="">
    <img src="/content-images/257773807-af8ae27d-0805-4a60-a5ba-749e2f-cafd67320f.webp" alt="" width="400" height="300"/>
</a>


## ZK Adanse ne Decoy Based Systems ntease

Zero Knowledge Proofs yɛ cryptographic nhyehyɛe a ɛma ɔfã biako (ɔyɛ ɔsɔfo) kyerɛ ɔfã foforo (ɔhwɛfo) sɛ asɛm bi yɛ nokware a ɔnna *nsɛm biara a ɛhyɛ ase a ɛfa asɛm no ankasa ho* adi. Wɔ Zcash nsɛm mu no, wɔde ZK adanseɛ di dwuma de hwɛ sɛ asɛm bi yɛ nokware a wɔmfa asɛm no ho nsɛm te sɛ SENDER, RECEIVER anaa asɛm no HO AKATUO adi. 

**Eyi hwɛ hu sɛ wɔbɛkora nea ɔde di dwuma no kokoamsɛm so efisɛ asɛm no kɔ so yɛ kokoamsɛm bere a wɔda so ara di ho adanse no. Wɔayɛ saa mfiridwuma yi sɛnea ɛbɛyɛ a sikasɛm mu nkitahodi a ɛwɔ Zcash ntam no yɛ kokoamsɛm.**

Wɔ Decoy-gyina nhyehyɛe ahorow te sɛ [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), wɔka nnwuma pii bom ma ɛyɛ den anaasɛ ɛyɛ den sɛ wobehu baabi a sika no fi ne baabi ankasa. Algorithm no de decoy inputs ne outputs ba wɔ transactions nso de encryption di dwuma wɔ addresses a wɔde di dwuma sɛ inputs & de Range adanse di dwuma de kyerɛ sɛ sika dodow a wɔde kɔ baabi foforo no yɛ spendable. 

Saa kwan yi ma nkitahodi kwan no yɛ basaa. Decoy inputs a wɔde di dwuma no ma ɛyɛ den ma obiara a ɔreyɛ blockchain no mu nhwehwɛmu sɛ obehu nea ɔde kɔmaa, nea ogye, anaa sika a wɔde di gua ankasa. 

**Hyɛ no nsow a ɛho hia**: Saa kwan yi a wɔfa so kora nkitahodi so wɔ nkɔnsɔnkɔnsɔn so no da so ara da nsɛm a wɔde hyɛ mu (encrypted) adi pefee wɔ ɔdefo no nkitahodi nyinaa mu. Metadata te sɛ *FLOW OF TRANSACTIONS* a ɛda nnipa ahodoɔ a wɔde di dwuma wɔ ntwamutam no so ntam no, wɔda so ara tumi boaboa ano. Sɛ ɔtamfo bi de ne ho hyɛ nkitahodi ahorow a wɔyɛ wɔ ntam no mu denneennen a, ɛma afoforo a wɔde di dwuma no decoy inputs no yɛ deanonymise wɔ ɔkwan a etu mpɔn so. 


## Mfaso a ɛwɔ ZK so sen Decoy Based Systems

Zcash ne Monero nyinaa yɛ cryptocurrencies a wɔde wɔn adwene si kokoamsɛm so, nanso wonya kokoamsɛm wɔ akwan horow so. 

Mfaso bi a ɛwɔ Zcash zero-knowledge proofs (ZK) so sen Monero decoy nhyehyɛe no ni:

1) **Selective Disclosure**: Sɛ wɔde Zcash ZK feature set a, wɔn a wɔde di dwuma no wɔ hokwan sɛ wɔbɛda asɛm no ho nsɛm adi akyerɛ nnipa pɔtee bi [Kenkan ECC Blog wɔ Selective Disclosure so](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). Wɔ Zcash mu no, shielded transactions’ encrypted contents ma ankorankoro tumi paw da data a efi transfer pɔtee bi mu adi. Bio nso, wobetumi de safe a wɔde hwɛ nneɛma ama de ada nnwuma a ɛfa address pɔtee bi a wɔabɔ ho ban ho nyinaa adi. Saa adeɛ yi ma kwan ma wɔdi mmara so na wɔtumi yɛ akontabuo a ɛnsɛe ntwamutam no kokoamsɛm nyinaa. 

Bere a Monero decoy algorithm (ring signature) boa wɔ kokoamsɛm a wɔde ma mu no, ɛmma *selective* disclosure wɔ ɔkwan koro no ara so.


<a href="">
    <img src="/content-images/257793324-2dcc6047-300e-4fa7-a28d-2e6cbb-7242c98ea4.webp" alt="" width="400" height="80"/>
</a>


2) **Optional Visibility**: Zcash ma wɔn a wɔde di dwuma no kwan ma wɔpaw nkitahodi a ɛda adi pefee (ɛnyɛ kokoam de) ne nea wɔabɔ ho ban (kokoam de) ntam. Eyi kyerɛ sɛ Zcash ma wɔn a wɔde di dwuma no kwan ma wɔde wɔn sikasɛm ho nsɛm sie kokoam (wɔabɔ ho ban) anaasɛ wɔbɛma ayɛ nea ɛda adi pefee na wɔada no adi wɔ baguam te sɛ blockchain afoforo dodow no ara sɛnea wɔakyerɛkyerɛ mu wɔ [Zcash official website](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Saa kokoamsɛm a wɔpaw yi ma kwan ma wɔyɛ nsakrae kɛse ne nsɛm a ɛfa adwumayɛ/ahyehyɛde ho a wɔde di dwuma, efisɛ ebia nnwuma bi bɛhwehwɛ kokoamsɛm kakraa bi na ɔmanfo ahwɛ mu, bere a afoforo nso nya mfaso fi kokoamsɛm a wɔama anya nkɔso mu.


3) **Anonymity Set**: [Anonymity nhyehyɛe no](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-is-the-difference-between-anonymity-set-and-anonymity-score) of zero knowledge shielded pools no yɛ nnwuma a *asisi pɛn* nyinaa. Eyi yɛ kɛse kɛse sen on-chain akwan afoforo dodow no ara a wɔfa so nya nkitahodi a enni nkitahodi. Hyɛ no nsow: eyi fa nnwuma a ɛwɔ shielded pool koro no ara mu nkutoo ho.

Decoys a wɔde di dwuma no ma anonymity set no yɛ kɛse ampa. Nanso saa kwan yi gyina *ankasa* dwumadiefoɔ dodoɔ a wɔwɔ ntwamutam no so koraa. 

4) **No Trusted Setup**: Zcash Sprout & Sapling nhyehyɛe no de akontaabu a ɛfa nnipa pii ho a wɔfrɛ no "trusted setup ceremony" dii dwuma. Nnansa yi NU5 nkɔsoɔ no anhia Ahotosoɔ biara wɔ zero nimdeɛ amansin no nhyehyɛeɛ no mudi mu kura mu. [Kenkan ECC Blog wɔ NU5 so](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Data Privacy**: [zk-SNARK mfiridwuma no](https://zechub.wiki/zcash-technology) wɔde di dwuma wɔ Zcash shielded pools mu no ma kwan ma ahobammɔ kɔ soro kɛse ma wɔn a wɔde di dwuma no. Metadata leakage on-chain a wɔatew so no kyerɛ sɛ wɔn a wɔde di dwuma no wɔ ahobammɔ fi atamfo te sɛ hackerfo a wobetumi ayɛ hackers anaa ɔman ahyehyɛde ahorow a wɔhyɛ nkurɔfo so no ho. 

Nsɛm bi wɔ hɔ a wɔahu mfomsoɔ wɔ Monero decoy selection algorithm no mu. Na saa mfomso ahorow yi wɔ tumi a ɛbɛma wɔada sika a wɔde di dwuma no adi sɛnea amanneɛbɔ bi a efi [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero). 


Sɛ yɛbɛbɔ no mua a deɛ ɛho hia paa ankasa ne sɛ yɛbɛtew anaasɛ yɛbɛyi afiri a wɔde di dwuma no ho nsɛm ne data a ɛretu no afiri hɔ sɛdeɛ Zooko kyerɛkyerɛɛ mu wɔ [Orchid (priv8) AMA live session no mu no](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="/content-images/257788813-509f1139-7daa-4f95-bbb4-c53564-f815d11477.webp" alt="" width="400" height="200"/>
</a>


____

***Nkyerɛkyerɛmu Nkitahodi***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/



