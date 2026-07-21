<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kuchapisha Website juu ya IPFS 

![](https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg)

## Utangulizi wa IPFS 

IPFS (InterPlanetary File System) ni peer-to-peer itifaki na mtandao iliyoundwa na kujenga njia madaraka ya kuhifadhi na kushiriki files. 

Tofauti na jadi mteja-server mfano wa mtandao, IPFS inaruhusu watumiaji kushiriki files moja kwa moja na kila mmoja, badala ya kutegemea server centralized kuhifadhi na kusambaza maudhui. 

Faili katika IPFS ni kushughulikiwa kwa kutumia * maudhui ya kushughulikia *, maana kila faili ni kupewa kipekee hash au CONTENT IDENTIFIER (CID) kulingana na maudhui yake, na hash hii hutumiwa kupata faili kutoka mtandao.

Wakati mtumiaji anaongeza faili kwa IPFS, faili ni kuvunjwa katika vipande vidogo kuitwa vitalu, na kila block ni kupewa CID. vitalu haya ni kisha kuhifadhiwa kwenye nodes tofauti katika mtandao, ili faili inaweza kwa urahisi retrieved kutoka vyanzo mbalimbali. 

Hii kuhakikisha redundancy na kosa-uvumilivu wakati pia kufanya ni vigumu kwa yoyote node moja kuwa hatua moja ya kushindwa au udhibiti. 

Soma [Kuanzisha IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Kujenga tovuti yako 

Kwa mfano huu sisi ni kujenga tovuti rahisi. 

[Mfano wa Tovuti](https://squirrel.surf)


** Hatua ya 1:** Kama wewe ni ukoo na kubuni mtandao kuandika maudhui kuu kwa tovuti yako ikiwa ni pamoja na Title, Main mwili wa maandishi, na viungo kwa kurasa nyingine / tovuti & footer.

** Hatua ya 2:** Tumia [HTML template!](https://nicepage.com/html-templates) Kuweka maandishi umeandika ipasavyo. Hiari pia kuunda .CSS stylesheet kwa tovuti yako. 

** Hatua ya 3:** Hifadhi directory yako. All .html kurasa + picha lazima katika folda moja. 



## Kuanzisha Node

Pakua na kufunga IPFS kutoka [Tovuti rasmi](https://docs.ipfs.tech/install/ipfs-desktop/).



### Anzisha IPFS: 

Kama wewe ni kutumia Desktop Programu huwezi kuwa na kuanzisha. 

Kutumia terminal au amri ya haraka, Run amri: <mark>ipfs init </mark>. 



** Ongeza Folda Site kwa IPFS **: 

Chagua folda na faili yako tovuti na navigate kwa chaguo Ongeza Folda.

![](https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png)

--

Kama kutumia Terminal, Run amri: <mark>ipfs add -r "folder_name"</mark> kuongeza folda nzima recursively kwa IPFS.


### Pin Site juu ya IPFS: 

Mara baada ya tovuti yako files ni aliongeza kwa IPFS, unahitaji ** pini ** yao ili kuhakikisha wao kubaki inapatikana kwenye mtandao.

--

Kama kwa kutumia Terminal, Run amri: Kama kwa matumizi ya Terminal, Kuendesha amri: <mark>ipfs pin kuongeza "hash"</mark> 

"hash" = CID ya folda umeongeza katika hatua ya awali.


Vinginevyo, unaweza pia kuwa na uwezo wa pini directories kutumia huduma kama vile [Pinata](https://pinata.cloud) au [Dolpin](https://dolpin.io)

Inaokoa wakati mwingi! 

--

### Kupata tovuti yako juu ya IPFS: 

Tovuti yako sasa ni kuchapishwa juu ya IPFS na inaweza kupatikana kwa kutumia hash ya folda. Kwa kupata tovuti yako, unaweza kutembelea https://ipfs.io/ipfs/"hash" 

"hash" = CID ya folda.

Katika kesi yetu CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

Interplanetary Naming System (IPNS) inaruhusu update IPFS CID ya kuhusishwa na tovuti yako na bado kutumika kiungo tuli. Ni zinazotolewa kama ufunguo. 

![](https://dnslink.io/assets/dns-query.a0134a75.png)

Katika Menyu ya mipangilio kwa foldre tovuti yako juu ya IPFS desktop maombi kuchagua kuchapisha kwa IPNS. 

![](https://i.ibb.co/Ch25dKf/IPNS.png)

Key: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Inaweza pia kutumika kutazama tovuti yetu kupitia lango: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## Kiungo cha DNS 
 
Tovuti imeundwa, sasa tunahitaji njia ya kuelekeza URL kwa maudhui. 

Kama tayari umemiliki anwani ya mtandao wewe ni uwezo wa kuongeza rekodi mpya kwa kutumia rekodi TXT "_dnslink(domain yako)". Kulingana na mtoa inaweza auto kujaza. 

![](https://i.ibb.co/MgRxBHj/example.png)

Itachukua muda kuenea kupitia mtandao kabla ya kuiona. 

Hongera! Umeanzisha tovuti inayopinga udhibiti. 


**Rasilimali**

[IPFS Nyaraka](https://docs.ipfs.tech)

[IPNS Nyaraka](https://docs.ipfs.tech/concepts/ipns/)

[DNS kiungo Docs](https://dnslink.io/#introduction)
