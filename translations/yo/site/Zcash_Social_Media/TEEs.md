# Imọ-ara-ara si-ara: Awọn agbegbe Iṣẹ Igbẹkẹle (TEEs)

**Series:** Ìmọ̀ Láti Nítòkè-títí-Nítòkò

Ìmọ̀ Láti Nítòsí Nítòkè ti padà wá pẹ̀lú àkòrí tuntun! 
Ni ọsẹ yii a ṣawari ** Awọn agbegbe Iṣẹ Igbẹkẹle (TEEs) ** - bi wọn ṣe lo ninu awọn owó aṣiri ati awọn ohun elo blockchain miiran.

[Ìdánilẹ́kọ̀ọ́ Àwọn Àyíká Ìmúṣẹ Ìgbẹ́kẹ̀lé]](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## Awọn TEE ati Awọn Blockchains: Awọn ohun-ini ti o ṣe afikun

Awọn blockchains ati TEEs ni awọn agbara ti o ṣe afikun pupọ:

- **Blockchains** ṣe ìdánilójú wíwà lárọ̀ọ́wọ́tó, ìdúróṣinṣin ìpínlẹ̀, ó sì fàyè gba ìwádìí fún gbogbo ènìyàn lórí gbogbo ìpínlẹ́ - ṣùgbọ́n wọn ní agbára ìṣirò tí ó kúrú. 
- **TEE** le ṣe awọn iṣẹ iṣiro ti o pọju ni ikọkọ - ṣugbọn ko ni iduroṣinṣin ipinle abinibi.

Wọ́n lè jọ ṣe àwọn ètò tó lágbára láti dáàbò bo àṣírí.

---

## Àkọsílẹ̀ Ìpamọ́: Ìdáàbòbò Àṣírí-TEE

**Secret Network** n lo imọ-ẹrọ TEE (ni pato Intel SGX) lati ṣe iṣiro lori awọn titẹsi ti a fi pamọ, awọn abajade, ati ipo.

Kọọkan validator node nṣiṣẹ Intel SGX awọn eerun. Awọn ifọkanbalẹ ati awọn ipele iṣiro ti wa ni idapo:

- Àwọn ìnáwó náà ni wọ́n máa ń ṣe nínú àwọn àgbègbè tí kò léwu. 
- Àkọsílẹ̀ nìkan ni a máa ń tú nínú TEE.

This is different from Zcash, which uses **zero-knowledge proofs** for privacy. In Zcash, shielded transactions are broadcast and validated publicly with no additional data revealed to the network. Zcash Shielded Assets follow the same principle.

[Àdàkọ Àkọsílẹ̀ TEE Ìkànnì Àṣírí]](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

Fún àlàyé tó kún rẹ́rẹ́ nípa bí àwọn TEE ṣe ń ṣiṣẹ́ lórí Secret Network, ka àpilẹ̀kọ dáradára yìí látọ̀dọ̀ @l_woetzel: 
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Bí Àwùjọ Ìpamọ́ Ṣe Ń Dáàbò Bo Àwọn Kọ́kọ́rọ́ àti Àkọsílẹ̀

- Àkójọ ìsọfúnni tí a fi ń ṣe àdàkọ ìsọ̀rọ̀-ìpamọ́ tí ó wà ní ìbámu pẹ̀lú èrò-ọkàn ti nẹtiwọọki náà ni a fi pamọ́ sínú TEE ti olùṣe ìdánilójú kọ̀ọ̀kan. 
- Àwọn àdéhùn máa ń lo àwọn kọ́kọ́rọ́ tí kò ṣeé díbọ́n. 
- Àwọn àdéhùn ìkọ̀kọ̀ máa ń ṣiṣẹ́ lórí ẹ̀rọ-ìṣirò Cosmos SDK ṣùgbọ́n ó ń ṣe àtìlẹ́yìn fún àwọn ìléwọ̀n/ìléjáde tí a fi kọ̀ǹpútà sí àti ipò.

---

## Ìjẹ́rìí Àtìpó

**Ijẹrisi latọna jijin** jẹ ilana ti fifihan pe enclave n ṣiṣẹ ni agbegbe ohun elo to ni aabo gidi.

O gba ẹgbẹ latọna jijin laaye lati ṣayẹwo:
- Ohun elo ti o tọ n ṣiṣẹ 
- A kò ṣe àdàkàdekè sí ohun èlò náà 
- O n ṣiṣẹ ni aabo inu agbegbe Intel SGX kan

![Ìsọfúnni nípa Àdánilójú Àrékọjá](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

Awọn enclaves tun ni ibuwọlu ikọkọ ati awọn bọtini ijẹrisi ti ko le wọle lati ita.

[Ìdáàbòbò kókó Enclave](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## Ṣíṣàmúlò Àkọsílẹ̀

Níwọ̀n bí àwọn àgbègbè tí kò ní ìpínlẹ̀, àwọn ìgbà míì ni wọ́n máa ń fi ìsọfúnni pamọ́ ní ìta nínú ìrántí tí wọn kò fọkàn tán. 

** Data Sealing** n ṣe àdàkọ ìsọfúnni inú ààlà náà nípa lílo kókó tí a mú jáde láti inú CPU. Àpáàdì tí a fi àdàkàdekè ṣe yìí nìkan ni a lè tú ní orí ètò kan náà.

[Àkọsílẹ̀ Ìdìmọ̀ Àlàyé]](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Àjọ Oasis

**Oasis Network** tun lo awọn TEE nipasẹ ParaTime ìpamọ rẹ (fun apẹẹrẹ Sapphire ati Cipher).

Awọn data ti a fi pamọ wọle si TEE pẹlu adehun ọlọgbọn. O ti ṣatunṣe, ṣe ilana, ati tun ṣe aṣiri ṣaaju ki o to fi agbegbe naa silẹ.

![Oasis Network TEE ìtòsí](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## Awọn TEE ninu Awọn nẹtiwọọki Ẹri-Ipa

Ọpọ Proof-of-Stake blockchains (pẹlu Secret ati Oasis) lo **Tendermint** gẹgẹbi ilana idajọ wọn.

Fun awọn validators PoS:
- A gbọdọ ṣakoso awọn bọtini ni aabo ati pe a ko le fi han ni ọrọ ti o mọ. 
- Àwọn olùṣe ìdánilójú gbọdọ̀ wà lórí ẹ̀rọ (àwọn ìjìyà ìgbà tí kò bá ṣiṣẹ́ ni wọ́n ń lò). 
- Fífi ọ̀rọ̀ tó yàtọ̀ síra sọ́wọ́ lè mú kí wọ́n fi ọ̀pá gégùn-ún.

**TEEs** jẹ apẹrẹ fun iṣelọpọ ati lilo awọn bọtini olutọtọ ni aabo.

[Tendermint & Ààbò PoS]](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash àti Ìwádìí Ẹ̀rí-Ìpín

Zcash n ṣe iwadii lọwọlọwọ fun gbigbe lọ si Ẹri-ti-Ipa.

- Ka ìwádìí náà: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Wo abala yii lati Ile-iṣẹ Zcash Foundation Community Call ti o ṣalaye awọn apẹrẹ PoS oriṣiriṣi ati awọn ipa aṣiri wọn:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    jẹ́ kíFullScreen
    loading="lazy"
  />
</div>

---

** Oríṣun àwòrán, ZecHub (@ZecHub) ** 
https://x.com/ZecHub/status/1633579659282587651

---

*Ojúewé yìí ni a kó jọ láti inú àkọsílẹ̀ Zero to Zero Knowledge fún wiki ZecHub.*
