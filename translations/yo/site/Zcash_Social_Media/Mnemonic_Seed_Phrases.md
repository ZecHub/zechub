# Ìmọ̀ Àìmọ̀: Àwọn Ọ̀rọ̀-Òwe tí a fi ń ṣe àtúnyẹ̀wò

**Series:** Ìmọ̀ Láti Nítòkè-títí-Nítòkò

Àwọn ọ̀rọ̀ ìkókó tí a fi ń ṣe àtúnyẹ̀wò ara ẹni jẹ́ ìpìlẹ̀ fún ọ̀kan lára àwọn ohun tó ṣe pàtàkì jùlọ nínú cryptocurrency - **ìtọ́jú ara ẹni**. 
Loni a kọ́ bí a ṣe ń dá gbólóhùn ìkékúrú àti bí wọ́n ṣe ń lò ó nínú àpò.

---

## Kí Ni Àwọn Ọ̀rọ̀ Ìkókó Tí Ń Múni Rántí Ohun Tó Ti Ṣẹlẹ?

Awọn gbolohun isọdọtun ni a ṣalaye nipasẹ awọn alaye ** BIP-39 **, iru gbogbogbo julọ ti gbogbogbò ti a lo loni.

Ṣiṣẹda awọn gbolohun ọrọ imularada bẹrẹ nipasẹ ipilẹṣẹ ** randomness **. Entropy diẹ sii tumọ si aabo ti o ga julọ. ** 128 bits ** ti entropy ni a kà pe o to fun ọpọlọpọ awọn olumulo.

[Ìtumọ̀ ọ̀rọ̀ ìkókó](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

Ti o da lori ipari ti entropy akọkọ, ọrọ imularada yoo jẹ ** 12 si 24 ọrọ ** gun.

---

## Ìgbésẹ̀ Ní Ìgbesẹ̀: Bí Wọ́n Ṣe Ń Ṣàkọsílẹ̀ Ọ̀rọ̀ Tó Yẹ Kó O Mọ̀

### 1. Ṣíṣẹ̀dá Àlàfo
A bẹ̀rẹ̀ nípa kíkó 128 bit ti entropy.

### 2. Ṣàkójọ Iye Àyẹ̀wò
A ṣe hash entropy nipa lilo **SHA256**. Awọn bits diẹ akọkọ ti hash yi di iye ayẹwo. 
Èyí ló fún wa ní àmì kan tó ṣàrà ọ̀tọ̀ fún entropy wa.

![Etobi + Àkọsílẹ̀ Àkójọ àyẹ̀wò](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. A lè pín in sí ìpele-ìpín méjìlá
Apapọ 132 bit (128 entropy + 4 checksum) ni a ya sọtọ si awọn ege ti 11 bits.

### 4. Àwòrán ilẹ̀ sí Wordlist
Gbogbo ìtòlẹ́sẹẹsẹ ìdìpọ̀-ìmọ̀-ọ̀rọ̀ 11 ni a yí padà sí nọ́ńbà ìdámẹ́wàá (0-2047). 
Awọn akojọ ọrọ BIP-39 ni deede awọn ọrọ ** 2048 ** (Gẹẹsi, Spani, Kannada, ati bẹbẹ lọ).

A máa ń lo àwọn nọ́ńbà yìí láti wá ọ̀rọ̀ tó bá a mu nínú ìtòlẹ́sẹẹsẹ ọ̀rọ.

[Àpẹẹrẹ àwòrán ọ̀rọ̀](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

Àbájáde: A ní ọ̀rọ̀ ìmúpadàbọ̀ tí ó ní ọ̀rọ̀ méjìlá tí ó ṣeé kà fún ènìyàn!

---

## Lati Ọ̀rọ̀ Ìmúbọ̀sípò -> Irú-ọmọ -> Àdírẹ́sì Ìsanwó

Lilo gbolohun igbasilẹ naa, apamọwọ kan le ṣe agbekalẹ awọn bọtini lati ṣẹda awọn adirẹsi isanwo ati awọn iroyin apamọwọ oriṣiriṣi.

Awọn bọtini ti a ṣẹda jẹ ** deterministic ** - ohun ti o wọle nigbagbogbo n ṣe iṣelọpọ kanna.

### Bí Irúgbìn Ṣe Ń Dàgbà
A ṣe àdàkọ àpò-ìpamọ́ láti inú gbólóhùn mnemonic náà nípa lílo **Key Derivation Function (KDF) **:

- Nínú **Bitcoin**: PBKDF2 
- Ni **Zcash**: Blake2b-256/512

Eyi n ṣe agbejade irugbin ** 64-byte (512-bit) **.

[Irú-ọmọ sí àwọn kókó pàtàkì](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### Àwọn Kọ́kọ́rọ́
A pín àgbékalẹ̀ náà sí ìpele méjì tí ó jẹ́ 32 byte:
- **Ohun-ìṣirò Ìnáwó Ọ̀gá**
- Àkọsílẹ̀ Ẹ̀ka Ọ̀gá

Àwọn wọ̀nyí ni a lò nínú **Hierarchical Deterministic (HD) Wallets** fún ìmújáde kókó ọmọ.

---

## Àwọn Ànímọ́ Àkànṣe Zcash (ZIP-32)

Ninu Zcash, a le fi àṣẹ àyẹ̀wò tàbí àṣẹ ìnáwó léni lọ́wọ́ láìsí ìpalára fún irúgbìn ọ̀gá.

**ZIP-32** n ṣalaye ilana ipilẹṣẹ bọtini deterministic ti o ni ibamu fun awọn ẹya aṣiri ti Zcash.

Láti inú àlàfo ìnáwó tí a mú jáde:
- Full Viewing Key
- Incoming Viewing Key
- Àkójọ àwọn àdírẹ́sì ìsanwó

Different derivation mechanisms produce external addresses suitable for giving out to senders across shielded pools (Sapling & Orchard).

![Awọn ọna ṣiṣe ipilẹṣẹ bọtini Zcash](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash tun ṣe atilẹyin awọn adirẹsi inu ** fun awọn iṣẹ apamọwọ bii Auto-Shielding.

---

## Àwọn ohun àmúṣọrọ̀

- [ZIP-32: Awọn apo-ifowopamọ Deterministic Hierarchical ti o ni aabo]](https://zips.z.cash/zip-0032)  
- [Awọn alaye ti Ilana Zcash (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Ìwòye àpapọ̀ àwọn pọ́ọ̀sì tí a dáàbò bò nípasẹ̀ àfojúsùn](https://zechub.wiki)

---

** Oríṣun àwòrán, ZecHub (@ZecHub) ** 
https://x.com/ZecHub/status/1624125037945946145

---

*Ojúewé yìí ni a kó jọ láti inú àkọsílẹ̀ Zero to Zero Knowledge fún wiki ZecHub.*
