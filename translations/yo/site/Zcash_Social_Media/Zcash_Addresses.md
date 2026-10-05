# Ìmọ̀ nípa Òdo sí Òdo: Àwọn Ìṣòwò Tí Ó Farahàn sí Ààbò àti Àwọn Àdírẹ́sì Ìṣọ̀kan

**Ẹ̀ka:** Ìmọ̀ òdo sí òdo

Tí o bá ń kọ́ nípa Zcash fún ìgbà àkọ́kọ́, o máa rí i pé oríṣi ìṣòwò méjì ló wà: **Àfihàn** àti **Abò**. 

Lónìí a máa kọ́ nípa wọn, a sì máa ń sọ̀rọ̀ nípa ọ̀kan lára àwọn ohun tuntun tó wà nínú ètò #Zcash, **Àdírẹ́sì Ìṣọ̀kan**.

---

## Àwọn Ìṣòwò Tí Ó Farahàn àti Tí A Dáàbòbò

- **Àwọn Ìṣòwò tí ó hàn gbangba** lo **àdírẹ́sì-t** (tí a fi àmì-ìdámọ̀ Base58 sí). Ohun gbogbo hàn gbangba - gẹ́gẹ́ bí Bitcoin. 
- **Àwọn Ìṣòwò tí a dáàbò bo** lo àwọn àdírẹ́sì tí a fi àmì sí fún àwọn adágún **Sapling** tàbí **Orchard**. Àwọn wọ̀nyí ń fi àmì ìdánimọ̀ òfo pamọ́ olùránṣẹ́, olùgbà, àti iye owó náà.

**Iṣowo Idaabobo** tọka si eyikeyi iṣowo pẹlu awọn adirẹsi ti a fi koodu fun awọn adagun Sapling/Orchard.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**A ṣe àgbékalẹ̀ àwọn àdírẹ́sì ìṣọ̀kan (UAs)** láti **sopọ̀** àwọn ìṣòwò tí a dáàbò bò tàbí tí ó ṣe kedere sí àdírẹ́sì kan ṣoṣo.

---

## Àwọn Irú Àdírẹ́sì ní Zcash

Awọn oriṣi adirẹsi mẹta lo wa ti a nlo:

1. **(T) Àṣírí** – Ìpìlẹ̀58 
2. **(Z) Sapling** – Bech32 
3. **(UA) Unified Address** – Bech32m 

Iye awọn ohun kikọ (ati nitorinaa iwọn koodu QR) n pọ si pẹlu iru kọọkan.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Bí Àdírẹ́sì Ìṣọ̀kan Ṣe Ń Ṣiṣẹ́

A fi àwọn àdírẹ́sì àti kọ́kọ́rọ́ sí ìtẹ̀léra byte (**Raw Encoding**). 
Àkójọpọ̀ **Ìfipamọ́ Olùgbà** ní gbogbo ìwífún tó yẹ láti fi gbé dúkìá kan nípa lílo ìlànà pàtó kan.

Àkójọpọ̀ Unified Address ìyípadà (typecode, length, adr) ti àwọn olùgbà:

- UA: `0x03`  
- Sapling: `0x02`  
- Ṣíṣe kedere: `0x01`  

**Pàtàkì**: Ó gbọ́dọ̀ wà **ó kéré tán àdírẹ́sì ìsanwó kan tí a dáàbò bò** ní gbogbo UA. (Sprout mọ́ lẹ́yìn ìgbéga Canopy.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Àlàyé kíkún: **[ZIP-316: Àwọn Àdírẹ́sì Ìṣọ̀kan](https://zips.z.cash/zip-0316)**

---

## Àwọn Àǹfààní Àwọn Àdírẹ́sì Ìṣọ̀kan

- **Ó rọrùn fún pàṣípààrọ̀** - Wọ́n lè ṣe ìrànlọ́wọ́ fún àwọn ìdókòwò/yíyọ owó tí a dáàbò bò ní ààbò. 
- **Ailera ojo iwaju** - A le fi awọn adagun-odo tuntun ti a daabobo kun laisi fifọ awọn apamọwọ. 
- **Ààbò-nípa-Àìdámọ̀** - Gbogbo UA ní ó kéré tán àdírẹ́sì ààbò kan, nítorí náà ìpamọ́ wà nígbà gbogbo.

Èyí jẹ́ ìyípadà pàtàkì kan tí ó ti ń ran ọ̀pọ̀ ZEC lọ́wọ́ láti wọ inú adágún ààbò náà.

---

## Awọn Iṣowo ati Awọn Iṣe Orchard

Orchard ṣe àgbékalẹ̀ èrò tuntun kan tí a pè ní **Ìgbésẹ̀**:

- Wọ́n dín ìjáde metadata kù nípa lílo **àkójọ kan ṣoṣo** fún gbogbo Àwọn Ìgbésẹ̀ nínú ìṣòwò kan. 
- Wọ́n so àwọn pápá ti (V4) Nawo + Output pọ̀ mọ́ ìforúkọsílẹ̀ iye kan ṣoṣo. 
- Èyí mú kí iṣẹ́ wa dára síi fún ètò ìdánilójú Halo2.

Daira ṣàlàyé ipò Anchor (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Ìwọ̀ntúnwọ̀nsì àti Ìpamọ́ Iye

Ní àwọn ìgbà míì (fún àpẹẹrẹ àwọn ìṣòwò tí a ṣe láàárín àwọn ènìyàn) iye owó lè hàn sí olùwòran láti òde. Síbẹ̀síbẹ̀, `valueBalanceSapling` àti `valueBalanceOrchard` lo **awọn ileri homomorphic** lati fihan gbogbo ZEC ninu awọn adagun ti a daabobo ati idilọwọ awọn aṣe-ẹtan.

Ka siwaju: [ZIP 209: Dènà fún Ìwọ̀n Ìwọ̀n Póólù Iye Ẹ̀wọ̀n Tí Kò Ní Ìpele Jùlọ](https://zips.z.cash/zip-0209)

---

## Àwọn Àtúnṣe Ọjọ́ Ìwájú

Ẹgbẹ ECC n ṣiṣẹ lori awọn ọna RPC tuntun ni `zcashd` (rọ́pò `z_sendmany`) èyí tí yóò jẹ́ kí àwọn olùlò ṣe àyẹ̀wò àti gba/kọ̀ ìṣòwò tí a dábàá nípa àwọn ànímọ́ ìpamọ́ rẹ̀.

---

## Ìdámọ̀ràn

Ìfọ̀rọ̀wérọ̀ yìí kọ́kọ́ tọ́ka sí **YWallet**, fún ètò ìṣòwò tí ó fihàn kí o tó tẹ ìfọ̀rọ̀wérọ̀ náà. YWallet kò sí mọ́, a kò sì ní ṣe àtúnṣe fún Ironwood, nítorí náà kò le tẹ̀lé ẹ̀wọ̀n mọ́. Yan àpò ìfọ̀rọ̀wérọ̀ tí a ti tọ́jú láti inú [Àwọn Àpò Ìpamọ́](https://zechub.wiki/wallets) ojú ìwé dípò, kí o sì fẹ́ràn èyí tí yóò sọ fún ọ ohun tí ìṣòwò kan yóò fi hàn kí ó tó jáde.

Àpilẹ̀kọ tó dára lórí ìpamọ́ ìṣòwò: https://medium.com/@hanh.huynh/

---

**Ìwé àkọ́kọ́ láti ọwọ́ ZecHub (@ZecHub)** 
https://x.com/ZecHub/status/1628498645627666432

---

*A ṣe àkójọ ojú ìwé yìí láti inú ìfọ̀rọ̀wérọ̀ Zero sí Zero Knowledge àtilẹ̀wá fún wiki ZecHub.*
