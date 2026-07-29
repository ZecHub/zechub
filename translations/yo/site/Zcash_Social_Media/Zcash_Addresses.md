# Imọ-ara-ara: Awọn Iṣowo Transparent vs Shielded & Awọn adirẹsi Ajọpọ

**Series:** Ìmọ̀ Láti Nítòkè-títí-Nítòkò

Bí o bá kọ́ nípa Zcash fún ìgbà àkọ́kọ́, o ó ríi pé oríṣi ìnáwó méjì ló wà: **Transparent** àti **Shielded**. 

Loni a kọ nipa wọn & bo ọkan ninu awọn ẹya tuntun ninu ilolupo eda abemi #Zcash, **Awọn Adirẹsi Ajọpọ**.

---

## Awọn Iṣowo Alaye vs Awọn iṣowo Ti a Ṣafipamọ

- **Transparent Transactions** lo **t-addresses** (Base58 encoded). Ohun gbogbo ni o wa ni gbangba - gẹgẹ bi Bitcoin. 
- **Shielded Transactions** use addresses encoded for the **Sapling** or **Orchard** pools. These hide sender, receiver, and amount using zero-knowledge proofs.

**Shielded Transaction** tọka si eyikeyi idunadura pẹlu awọn adirẹsi ti a ṣe akojọ fun awọn adagun Sapling/Orchard.

[Ìfilọlẹ tí ó ṣe kedere lòdì sí ìfilọ́lẹ̀ tí ó ní ààbò]](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

**Awọn Adirẹsi Iṣọkan (UA) ** ni a ṣe lati **ṣọkan** awọn iṣowo ti o ni aabo tabi ṣiṣan sinu adirẹti kan.

---

## Awọn oriṣi Adirẹsi ni Zcash

Awọn oriṣi adirẹsi mẹta lo wa:

1. **(T) Àìmọye**  Base58 
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

Nọmba awọn ohun kikọ (ati nitorinaa iwọn koodu QR) n pọ si pẹlu iru kọọkan.

![Ìfiwéra àwọn oríṣi àdírẹ́sì](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![Ìfiwéra iwọn kóòdì QR](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Bí Àwọn Adirẹsi Tó Wà Níṣọ̀kan Ṣe Ń Ṣiṣẹ

Adirẹsi ati awọn bọtini ti wa ni koodu bi a byte itẹlera (**Raw Encoding**). 
A **Receiver Encoding** pẹlu gbogbo alaye pataki lati gbe ohun ini kan nipa lilo kan pato ilana.

The raw encoding of a Unified Address is a combination of encodings (typecode, length, addr) of receivers:

- UA: `0x03`  
- Sapling: `0x02`  
- Òróró: `0x01`  

**Ó ṣe pàtàkì**: Ó gbọdọ jẹ **ó kéré tán adirẹsi ìsanwó kan tí a fi ààbò pamọ́** ní gbogbo UA. (A kò tún gba àwọn adírẹsi ẹ̀ka mọ́ lẹ́yìn àtúnṣe Canopy.)

![Àkójọ Àkọsílẹ̀ UA](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Àkọsílẹ̀ kíkún: **[ZIP-316: Àwọn Adirẹsi Tí ó Ṣọ̀kan]](https://zips.z.cash/zip-0316)**

---

## Àwọn Àǹfààní Tó Wà Nínú Lílo Àwọn Adirẹsi Tí Wọ́n Ṣọ̀kan

- **Rọrun fun awọn paṣipaarọ** - Wọn le ṣe atilẹyin awọn idogo ti o ni aabo / awọn yiyọ kuro ni aabo diẹ sii. 
- **Awọn ohun ti o ni idaniloju ọjọ iwaju** - Awọn adagun tuntun ti a le fi sii laisi fifọ awọn apamọwọ. 
- **Shielded-by-Default** - Gbogbo UA ni o kere ju adirẹsi iboju kan, nitorinaa aṣiri wa nigbagbogbo.

Ìyípadà pàtàkì nìyí tó ti ń ran àwọn ZEC lọ́wọ́ láti kó sínú àgbá tí a fi ọ̀pá ìdáàbòbò ṣe.

---

## Awọn Iṣowo & Awọn iṣe Orchard

Orchard ṣafihan ero tuntun kan ti a pe ni **Awọn iṣe**:

- Wọ́n máa ń dín ìsunmọ̀ metadata kù nípa lílo ìsọ̀rí kan ṣoṣo fún gbogbo Ìgbésẹ̀ nínú ìṣòwò kan. 
- Wọn darapọ awọn aaye ti (V4) Awọn inawo + Ijade sinu adehun iye kan. 
- Eyi jẹ ki awọn iṣapeye iṣẹ ṣiṣe ti eto ẹri Halo2.

Daira ṣalaye awọn ipo Anchor (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    jẹ́ kíFullScreen
    loading="lazy"
  />
</div>

---

## Ìṣírò Ìlànà àti Ìpamọ́ra

Nínú àwọn ọ̀ràn kan (bí àpẹẹrẹ, àwọn àdéhùn àgbélébùú) iye owó náà lè fara hàn fún ẹni tí kò sí láyìíká. `valueBalanceSapling` àti `valueBalanceOrchard` lo ** homomorphic commitments** láti fi ẹ̀rí ZEC lapapọ hàn nínú àwọn pool tí a fi ààbò bo àti láti dènà àdàkọ.

Ka síwájú sí i: [Ìdáàbòbò Kúrò Lórí Àdàkàdekè Nínú Àwọn Ìkùdu Tí Wọ́n Ń Dáàbò Bò](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Àwọn Àtúnṣe Tó Máa Wáyé Lọ́jọ́ Iwájú

Ẹgbẹ́ ECC ń ṣiṣẹ́ lórí àwọn ọ̀nà RPC tuntun ní `zcashd` (tó rọ́pò `z_sendmany`) èyí tí yóò jẹ́ kí àwọn olùṣàmúlò wo àtẹ̀wò kí wọ́n sì gbà/kọ ìsòwò tí a dábàá ní ìbámu pẹ̀lú àwọn ànímọ́ ìpamọ́ra rẹ̀.

---

## Ìmọ̀ràn

Gbìyànjú àtúnṣe tuntun ti YWallet! 
Ó ti ń fi "Ìpinnu Ìṣirò" hàn ní ojú-ewé kí o tó tẹ ránṣẹ́, tí ó ń ràn ọ́ lọ́wọ́ láti ṣe àwọn yíyàn tó jẹ́ àdáni.

Àpilẹ̀kọ tó dára lórí ìpamọ́ ìṣirò: https://medium.com/@hanh.huynh/

---

** Oríṣun àwòrán, ZecHub (@ZecHub) ** 
https://x.com/ZecHub/status/1628498645627666432

---

*Ojúewé yìí ni a kó jọ láti inú àkọsílẹ̀ Zero to Zero Knowledge fún wiki ZecHub.*
