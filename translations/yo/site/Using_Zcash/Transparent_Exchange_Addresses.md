# Kí Ni Àwọn Adirẹsi Zcash TEX?

Adirẹsi Zcash TEX jẹ́ oríṣi adiresi tí ó ṣàrà ọ̀tọ̀. Àkọsílẹ̀ fún "Transparent Exchange" address, o jẹ **Unique**, Unified-type (bech32m) encoding ti p2pkh Transparent address kan ṣoṣo. 

Idi rẹ nikan ni lati sọ fun apamọwọ ti o baamu kan lati ṣe iṣowo Transparent-Only (T -> T). 

The logic is as follows: Upon detecting a TEX Address, a compatible wallet decodes it to obtain the Transparent receiver it contains. The wallet then sends the required funds for the tx from the Shielded pool to a seperate, user-controlled, ephemeral Transparent address (Z -> T). It then sends those funds to the decoded Transparent receiver of the TEX address (T -> T).  

A ṣe apejuwe imọran imọ-ẹrọ fun awọn adirẹsi TEX ni Zcash . [ZIP 320 Àwọn ojúewé wọ̀nyí:](https://zips.z.cash/zip-0320), tí ó ṣalaye irú adirẹsi kan fún gbígba owó láti àwọn Adiresi Tí Ó Ṣeé Ṣíṣe Àlàyé.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)


Bó tilẹ̀ jẹ́ pé àwọn adirẹsi TEX kò gbajúmọ, ó lè di dandan fún àwọn oníṣe Zcash láti lò wọ́n ní àsìkò kan.

## Ìgbà Wo Ni Mo Nílò Àdírẹ́sì TEX?

### O **Nìkan** adirẹsi TEX nígbà tí o bá ń fi owó ránṣẹ́ sí àdírésì Transparent nípa lílo àpò-owo kan tó kò ṣe atilẹyin fún fífi tààràtà ranṣẹ si àdírẹsíti Transparent. 
Diẹ ninu awọn apamọwọ nìkan ko gba laaye fun fifiranṣẹ taara si adirẹsi Transparent ati ** olugba le ma pese deede TEX**. Nitorina, iyipada lati inu Adirẹsin Alaye kan si adiresi TEX le jẹ dandan ni igba diẹ. Eyi le ṣee ṣe pẹlu ọwọ nipa ṣiṣe imuse itọkasi ti a ṣalaye ninu [ì 'í í ê3μê°](https://zips.z.cash/zip-0320#reference-implementation).

### O Nilo adirẹsi TEX nigba ti o ba n fi owo ranṣẹ si paṣipaarọ aarin kan ** TI NI awọn owo wọnyẹn lati orisun Transparent**. 
Ní báyìí, [Binance (ìyẹn Bitcoin)](https://www.binance.com/) jẹ ọkan nikan ti a ṣepọ Exchange lilo awọn adirẹsi TEX (ati pe wọn ni idi akọkọ fun ẹda TEX). 
Adirẹsi TEX sọ fun apamọwọ ti o baamu pe gbogbo awọn owo ti a firanṣẹ si adirẹisi yẹn gbọdọ jẹ ṣiṣafihan ati yago fun eyikeyi iye aabo lati fifiranṣẹ si orukọ naa.
If an exchange like Binance rejects the sent value, it has the necessary means to return that value back to the address it came from. It also helps entities like Binance to comply with the laws and regulations imposed by governments or other authorities.


## Àwọn pọntà wo ló ń ṣe àtìlẹ́yìn fún TEX Addresses?

O le wo akojọ ti o wa titi lori oju-iwe ayelujara wa. [àwọn àpò owó](https://zechub.wiki/wallets) lo ìtòlẹ́sẹẹsẹ àtúnṣe ojúewé. Lo **Àdàkọ Àdírẹ̀sì TEX.**
