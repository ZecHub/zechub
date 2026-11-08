<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Chapisha Tovuti kwenye IPFS 

![](/content-images/IPFS-40c2e22732.webp)

## Utangulizi wa IPFS 

IPFS (Mfumo wa Faili wa Kati ya Sayari [InterPlanetary File System]) ni itifaki na mtandao wa rika-kwa-rika uliobuniwa kuunda mbinu iliyogatuliwa ya kuhifadhi na kushiriki faili. 

Tofauti na modeli ya jadi ya mteja-seva ya intaneti, IPFS huwaruhusu watumiaji kushiriki faili moja kwa moja baina yao, badala ya kutegemea seva kuu kuhifadhi na kusambaza maudhui. 

Faili katika IPFS hutambulishwa kwa kutumia *utambuzi kwa maudhui [content-addressing]*, ikimaanisha kwamba kila faili hupewa hash ya kipekee au KITAMBULISHO CHA MAUDHUI (CID) kulingana na maudhui yake, na hash hii hutumika kupata faili kutoka kwenye mtandao.

Mtumiaji anapoongeza faili kwenye IPFS, faili hugawanywa katika sehemu ndogo zinazoitwa block, na kila block hupewa CID. Block hizi kisha huhifadhiwa kwenye node tofauti katika mtandao, ili faili iweze kupatikana kwa urahisi kutoka vyanzo vingi. 

Hili huhakikisha uwepo wa nakala rudufu na ustahimilivu wa hitilafu, huku pia likifanya iwe vigumu kwa node moja kuwa sehemu pekee ya hitilafu au udhibiti. 

Soma [Utangulizi wa IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Kuunda Tovuti Yako 

Kwa mfano huu tunaunda tovuti rahisi. 

[Mfano wa Tovuti](https://squirrel.surf)


**Hatua ya 1:** Ikiwa hujafahamu usanifu wa wavuti, andika maudhui makuu ya tovuti yako yakijumuisha Kichwa, Sehemu Kuu ya maandishi, pamoja na viungo vya kurasa/tovuti nyingine na vijachini.

**Hatua ya 2:** Tumia [kiolezo cha HTML!](https://nicepage.com/html-templates) Bandika maandishi uliyoandika ipasavyo. Unaweza pia kuunda laha ya mitindo ya .CSS kwa tovuti yako. 

**Hatua ya 3:** Hifadhi saraka yako. Kurasa zote za .html pamoja na picha lazima ziwe katika Folda moja. 



## Kusanidi Node

Pakua na usakinishe IPFS kutoka kwenye [tovuti rasmi](https://docs.ipfs.tech/install/ipfs-desktop/).



### Anzisha IPFS: 

Ikiwa unatumia Programu ya Kompyuta ya Mezani, hutahitaji kuanzisha. 

Kwa kutumia Terminal au kidokezo cha amri, endesha amri: <mark>ipfs init </mark>. 



**Ongeza Folda ya Tovuti kwenye IPFS**: 

Chagua folda yenye faili za tovuti yako na uende kwenye chaguo la Ongeza Folda.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Ikiwa unatumia Terminal, endesha amri: <mark>ipfs add -r "folder_name"</mark> ili kuongeza folda nzima kwa urudiaji kwenye IPFS.


### Bandika Tovuti kwenye IPFS: 

Baada ya faili za tovuti yako kuongezwa kwenye IPFS, unahitaji **kuzibandika [pin]** ili kuhakikisha zinaendelea kupatikana kwenye mtandao.

--

Ikiwa unatumia Terminal, endesha amri: Ikiwa unatumia Terminal, endesha amri: <mark>ipfs pin add "hash"</mark> 

"hash" = CID ya folda uliyoongeza katika hatua iliyotangulia.


Vinginevyo, unaweza pia kubandika saraka kwa kutumia huduma kama vile [Pinata](https://pinata.cloud) au [Dolpin](https://dolpin.io)

Huokoa muda mwingi! 

--

### Fikia tovuti yako kwenye IPFS: 

Tovuti yako sasa imechapishwa kwenye IPFS na inaweza kufikiwa kwa kutumia hash ya folda. Ili kufikia tovuti yako, unaweza kutembelea https://ipfs.io/ipfs/"hash" 

"hash" = CID ya folda.

Kwa upande wetu CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

Mfumo wa Kutaja wa Kati ya Sayari (IPNS) hukuruhusu kusasisha CID za IPFS zinazohusishwa na tovuti yako na bado kutumia kiungo thabiti. Hutolewa kama ufunguo. 

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

Katika menyu ya mipangilio ya folda ya tovuti yako kwenye programu ya IPFS ya kompyuta ya mezani, chagua Chapisha kwenye IPNS.  

![](/content-images/IPNS-2fe62cc369.webp)

Ufunguo: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Unaweza pia kuutumia kutazama tovuti yetu kupitia lango: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## Kiungo cha DNS 
 
Tovuti imeundwa, sasa tunahitaji njia ya kuelekeza URL kwenye maudhui. 

Ikiwa tayari unamiliki anwani ya wavuti, unaweza kuongeza rekodi mpya kwa kutumia rekodi ya TXT "_dnslink(your domain)". Kulingana na mtoa huduma, inaweza kujazwa kiotomatiki. 

![](/content-images/example-c2a9edb28b.webp)

Itachukua muda kuenea katika mtandao kabla ya kuweza kuiona. 

Hongera! Umesanidi tovuti inayostahimili udhibiti. 


**Rasilimali**

[Nyaraka za IPFS](https://docs.ipfs.tech)

[Nyaraka za IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Nyaraka za kiungo cha DNS](https://dnslink.io/#introduction)
