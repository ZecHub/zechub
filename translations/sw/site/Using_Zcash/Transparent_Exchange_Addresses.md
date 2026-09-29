# Ni nini Zcash TEX Anwani?

Zcash TEX addresses represent a unique type of receiving address. An acronym for "Transparent Exchange" address, it is a **Unique**, Unified-type (bech32m) encoding of a single p2pkh Transparent address. 

Lengo lake pekee ni kuarifu mkoba sambamba kufanya Uwazi-Tu (T -> T) shughuli. 

The logic is as follows: Upon detecting a TEX Address, a compatible wallet decodes it to obtain the Transparent receiver it contains. The wallet then sends the required funds for the tx from the Shielded pool to a seperate, user-controlled, ephemeral Transparent address (Z -> T). It then sends those funds to the decoded Transparent receiver of the TEX address (T -> T).  

Pendekezo la kiufundi kwa anwani TEX ni ilivyoelezwa katika Zcash [ZIP 320 - Kijiji:](https://zips.z.cash/zip-0320), ambayo inafafanua aina ya anwani peke kwa kupokea fedha kutoka Anwani Uwazi.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)


Ingawa anwani TEX si sana kupitishwa, Zcash watumiaji inaweza kuwa na mahitaji ya kutumia yao hatimaye.

## Ni Wakati Gani Ninapohitaji Anwani ya TEX?

### **Unahitaji** anwani ya TEX unapotuma fedha kwa anwani iliyo wazi kutumia mkoba ambao hauunga mkono kutuma moja kwa moja kwenye anwani inayoonekana. 
Baadhi ya pochi tu kuruhusu kutuma moja kwa moja na anwani Uwazi na ** mpokeaji hawezi kutoa TEX sawa**. Hivyo, kubadilisha ** kutoka uwazi wa anwani TEX inaweza kuwa required wakati mwingine. Hii inaweza kupatikana manually kwa kuendesha utekelezaji kumbukumbu ilivyoelezwa katika [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

### Unahitaji anwani ya TEX wakati wa kutuma fedha kwa kubadilishana kuu ambayo **INATAKA hizo pesa zinatoka chanzo cha uwazi**. 
Kwa sasa, [Binance](https://www.binance.com/) ni pekee ya Kati Exchange kutumia anwani TEX (na wao ni sababu kuu kwa ajili ya uumbaji wa TEX). 
anwani TEX taarifa mkoba sambamba kwamba fedha zote kutumwa kwa anwani hiyo lazima kuwa uwazi na kuwatenga kila thamani shielded kutoka kutumwa katika alisema anwani.
Kama kubadilishana kama Binance anakataa thamani alimtuma, ina njia muhimu ya kurudi kwamba thamani nyuma kwa anwani ni kutoka. Pia husaidia vyombo kama Binence kufuata sheria na kanuni zilizowekwa na serikali au mamlaka nyingine.


## Ni pochi gani kusaidia TEX anwani?

Unaweza kuona orodha ya updated zaidi juu yetu [pochi za fedha](https://zechub.wiki/wallets) Tumia ** TeX Anwani Filter.**
