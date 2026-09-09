# Imọ-ara si Iṣiro: Awọn iṣowo Alaye vs Shielded & Adirẹsi Ajọpọ

**Sẹ́ríì:** Ìmòye láti orí òǹkà dé ìkórè

Bí o bá kọ́ nípa Zcash fún ìgbà àkọ́kọ́, ìwọ yóò rí i pé oríṣi ìnáwó méjì wà: **Transparent** àti **Shielded**. 

Lónìí a máa kọ́ nípa wọn & ká sì jíròrò ọ̀kan lára àwọn ohun tuntun nínú ètò ìgbé ayé #Zcash, **Unified Addresses**.

---

## Àwọn Àdéhùn tí ó Wà ní Òfin àti Ìṣèlú.

- **Transparent Transactions** lo àwọn àdúgbò tí ó ní ìtumọ̀ t (Base58 encoded). Gbogbo nǹkan ni gbogbo ènìyàn lè rí - bíi Bitcoin. 
- Àwọn ìnáwó tí a fi ààbò bo** lo àwọn àdírésì ti ó wà ní àkọsílẹ̀ fún àwọn pólò Sapling tàbí Orchard. Èyí ńfi ẹni tó ránni, olùgbà á sì iye owó náà pamọ́ nípa lílo ẹrí ìmọ-gídíìkan (zero knowledge proofs).

**Iṣowo Iboju** tọka si eyikeyi iṣowo pẹlu awọn adirẹsi ti a fi koodu fun Sapling / Orchard pools.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**Awọn Adirẹsi Aṣọkan (UA)** ni a ṣe lati ṣajọ awọn iṣowo ti o bo ati ṣiṣi silẹ sinu adiresi kan.

---

## Àwọn oríṣi àdírésì nínú Zcash

Awọn oriṣi adirẹsi mẹta lo wa:

1. **(T) Òójúmó**  Ìsù 58 
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

Iye àwọn ohun tí a kọ (tí ó sì ń jẹ́ kí ìlà tó wà nínú kóòdì QR náà pọ̀ sí i) máa ń pọ̀ sí i nígbàkigbà téèyàn bá ti tẹ oríṣi kòkòrò kan.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Bí Àwọn Àdírẹ́sì Tó Wà Níṣọ̀kan Ṣe Ń Ṣiṣẹ́

Adirẹsi ati awọn bọtini ti wa ni koodu bi a byte itọsọna (**Raw Encoding **). 
A **Receiver Encoding** pẹlu gbogbo alaye ti o nilo lati gbe ohun ini kan nipa lilo a pato ilana.

The raw encoding of a Unified Address is a combination of encodings (typecode, length, addr) of receivers:

- UA: `0x03`  
- Sapling: `0x02`  
- Àmọ́ tí ó ṣe kedere: `0x01`  

**O ṣe pataki**: Ó gbọdọ jẹ pe ó kéré tán adirẹsi ìsanwó kan ti a fi ààbò pamọ́ wà nínú gbogbo UA. (A kò tún gba àwọn àdírẹsì Sprout mọ́ lẹ́yìn tí wọn bá gbé Canopy ga.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Àkọsílẹ̀ tó kún rẹ́rẹ́: **[ZIP-316: Àwọn Adirẹsi Tí ó Ṣọ̀kan-án](https://zips.z.cash/zip-0316)**

---

## Àǹfààní Tó Wà Nínú Lílo Àwọn Adirẹsi Tí Wọ́n Ṣètò Kan Náà

- **Rọrun fun awọn paṣipaarọ** - Wọn le ṣe atilẹyin bayi idogo ti o ni aabo / yiyọ kuro pẹlu ailewu diẹ sii. 
- **Awọn ohun elo ti o ni idaniloju ọjọ iwaju** - Awọn adagun-odo tuntun le fi kun laisi fifọ awọn apamọwọ. 
- **Shielded-by-Default** - Gbogbo UA ni ó kéré tán adirẹsi kan tí a fi ààbò pa, nítorí náà ìpamọ́ wà lárọ̀ọ́wọ́tó nígbà gbogbo.

Ìyípadà pàtàkì yìí ti ń ran àwọn ZEC tó pọ̀ sí i lọ́wọ́ láti wọ inú àgbá tí a fi ọjà ṣe.

---

## Awọn Iṣowo & Aṣe Orchard

Orchard ṣafihan ero tuntun ti a pe ni ** Awọn iṣe**:

- Wọn dinku titọsi ti metadata nipa lilo ** single anchor** fun gbogbo Awọn iṣe ni iṣowo kan. 
- Wọn darapọ awọn aaye ti (V4) Isanwo + Ijade sinu adehun iye kan. 
- Eyi jẹ ki awọn iṣapeye iṣẹ ṣiṣe ti eto ẹri Halo2.

Daira ṣàlàyé àwọn ipò Àpótí (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    gba Àwòrán-ìwòyí ní kíkún (FullScreen)
    loading="lazy"
  />
</div>

---

## Ìṣòro Àìní Ọ̀rọ̀ Nípa Ètò àti Ìdáàbòbò Ara Ẹni

Ní àwọn ìgbà kan (bíi ti ìdánwò àgbélébùú) iye owó lè hàn sí ẹni tí ń wò ó láti ìta. `valueBalanceSapling` àti pé, `valueBalanceOrchard` lo ** homomorphic commitments** láti fi ẹ̀rí ZEC lapapọ hàn nínú àwọn pool tí a yà sókè àti dídènà àdàkọ.

Ka siwaju: [Ààbò Lọ́wọ́ Àwọn Aráàlú Níbi Tí Wọ́n Ti Ń Ṣọ́ Ọkọ̀ Ìdánwò Náà](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Àwọn Ìtẹ̀síwájú Tó Máa Wáyé Lọ́jọ́ Iwájú

Ẹgbẹ́ ECC ń ṣiṣẹ́ lórí àwọn ọ̀nà RPC tuntun ní Ìpínlẹ̀ Ọsirélíà. `zcashd` (tó ń rọ́pò ìwé ìròyìn yìí) `z_sendmany`) èyí tí yóò jẹ́ kí àwọn olùṣàmúlò wo àtẹ̀wò àti gbà/kọ ìsopọ̀ kan táa fẹ́ ṣe ní ìbámu pẹ̀lú ìwàláàyè ara ẹni rẹ.

---

## Ìmọ̀ràn

Yi okun akọkọ ntokasi si **Ywallet**, fun awọn idunadura eto ti o han ṣaaju ki o to tẹ fi. Ywallet ni ko siwaju sii itọju ati yoo wa ni imudojuiwọn fun Ironwood, nitorina o le mọ tẹle awọn pq. Yan a ṣetọju apamọwọ lati awọn ipese pipin ninu rẹ ìfilọlẹ. [Àwọn àpamọ́ owó](https://zechub.wiki/wallets) ojúewé dípò, ki o si fẹ ọkan ti o sọ fun ọ ohun tí a idunadura yoo fi han ṣaaju ki o to lọ jade.

Àkọlé tó dára lórí ìpamọ́ ìṣirò: https://medium.com/@hanh.huynh/

---

**Orílówó Àkòrí látọ̀dọ̀ ZecHub (@ZecHub)** 
https://x.com/ZecHub/status/1628498645627666432

---

*Ojúewé yìí ni a ṣe láti inú ìkápá Ìmọ̀ Nọ́lọ́wọ́ sí Òkú fún wiki ZecHub.*
