# Kuchapisha Tovuti kwenye IPFS

![](https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg)

## Utangulizi kwa IPFS

IPFS (InterPlanetary File System) ni itifaki na mtandao wa mtu kwa mtu ulioundwa ili kuunda njia isiyosambazwa ya kuhifadhi na kushiriki faili.

Tofauti na mfano wa jadi wa mteja-seva kwenye mtandao, IPFS inaruhusu watumiaji kushirikiana na kushiriki faili moja kwa moja bila kutegemea seva iliyosambazwa kuhifadhi na kusambaza maudhui.

Faili kwenye IPFS hutambuliwa kwa kutumia *anwani ya maudhui*,ambapo kila faili inapewa hash ya kipekee au CONTENT IDENTIFIER (CID) kulingana na maudhui yake, na hash hii hutumiwa kupata faili kutoka kwenye mtandao.

Wakati mtumiaji anapoongeza faili kwenye IPFS, faili hiyo hugawanywa katika sehemu ndogo zinazoitwa vitengo, na kila kipengee kinapewa CID yake. Vitengo hivi hifadhiwa kwenye nodi tofauti kwenye mtandao, ili faili iweze kupatikana kwa urahisi kutoka vyanzo mbalimbali.

Hii inahakikisha redundansi na uimara wa hitilafu huku ikifanya iwe vigumu kwa nodi moja kuwa kitovu kimoja cha kushindwa au kudhibiti.

Soma [Utangulizi wa IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)

## Kuunda Tovuti Yako

Kwa mfano huu, tunazounda tovuti rahisi.

[Mfano wa tovuti](https://squirrel.surf)

**Hatua ya 1:** Ikiwa haujazoea kubuni tovuti, andika maudhui makuu ya tovuti yako, ikiwa ni pamoja na kichwa, mwili kuu wa maandishi, na viungo kwenye kurasa/zilizo nje ya tovuti, pamoja na vijachini.

**Hatua ya 2:** Tumia [Kigezo cha HTML!](https://nicepage.com/html-templates) Bandika maandishi uliyoyaandika kulingana na hilo. Ni hiari kuunda faili ya .CSS kwa tovuti yako.

**Hatua ya 3:**Hifadhi saraka yako. Kurasa zote za .html + picha lazima ziwe katika saraka moja.

## Setting up a Node

Pakua na usakinishe IPFS kutoka  [Tovuti Rasmi](https://docs.ipfs.tech/install/ipfs-desktop/).

### Anzisha IPFS: 

Ikiwa unatumia Programu ya Kompyuta kwenye Desktop, huenda usihitaji kuanzisha IPFS.

Kwa kutumia Kielelezo cha Amri au kidirisha cha amri, Chalaza amri: 
<mark>ipfs init </mark>. 

**Ongeza Saraka ya Tovuti kwenye IPFS**: 

Chagua saraka yenye faili za tovuti yako na nenda kwenye chaguo la Ongeza Saraka.

![](https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png)

--

Ikiwa unatumia Kielelezo cha Amri, Chalaza amri: <mark>ipfs add -r "folder_name"</mark> ili kuongeza saraka nzima kwa njia ya kurudufisha kwenye IPFS.

### Kufunga Tovuti kwenye IPFS: 

Baada ya faili za tovuti yako kuongezwa kwenye IPFS, unahitaji**Kuzifunga** ili kuhakikisha zinabaki kupatikana kwenye mtandao.

--

Ikiwa unatumia Kielelezo cha Amri, Chalaza amri: <mark>ipfs pin add "hash"</mark> 

"hash" = CID  ya saraka uliyoongeza katika hatua iliyotangulia.

Kwa kuongezea, unaweza pia kuzifunga saraka kwa kutumia huduma kama vile [Pinata](https://pinata.cloud) au [Dolpin](https://dolpin.io)

Ita okoa muda mwingi! 

--

### Fikia tovuti yako kwenye IPFS:

Tovuti yako sasa imechapishwa kwenye IPFS na inaweza kupatikana kwa kutumia hash ya saraka. Ili kufikia tovuti yako, unaweza kutembelea  https://ipfs.io/ipfs/"hash" 

"hash" = CID ya saraka.

Katika kesi yetu, CID ni = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"

## IPNS 

Interplanetary Naming System (IPNS) inaruhusu kusasisha CID za IPFS zinazohusiana na tovuti yako na bado kutumikia kiungo cha kudumu. IPNS hutoa ufunguo kama njia ya kutambulisha.

![](https://dnslink.io/assets/dns-query.a0134a75.png)

Katika menyu ya mipangilio ya saraka ya tovuti yako kwenye Programu ya Kompyuta ya IPFS, chagua Chapisha kwenye IPNS. 

![](https://i.ibb.co/Ch25dKf/IPNS.png)

Kifunguo: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Pia inaweza kutumika kuona tovuti yetu kupitia lango:
 https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS Link 
 
Tovuti imeundwa, sasa tunahitaji njia ya kuunganisha anwani ya URL na yaliyomo.

kiwa tayari una umiliki wa anwani ya wavuti, unaweza kuongeza rekodi mpya kwa kutumia rekodi ya TXT "_dnslink(jina_lako_la_kikoa)". Kulingana na mtoa huduma, inaweza kujaza moja kwa moja.

![](https://i.ibb.co/MgRxBHj/example.png)

Itachukua muda kabla ya kusambaa kwenye mtandao kabla ya kuweza kuiona.

Hongera! Umefanikiwa kuweka tovuti isiyoweza kufungiwa na udhibiti.

**Rasilimali**

[IPFS Documentation](https://docs.ipfs.tech)

[IPNS Documentation](https://docs.ipfs.tech/concepts/ipns/)

[DNS link Docs](https://dnslink.io/#introduction)