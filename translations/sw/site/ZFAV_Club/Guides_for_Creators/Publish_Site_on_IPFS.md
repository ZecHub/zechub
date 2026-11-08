<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Chapisha Tovuti kwenye IPFS

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## Utangulizi wa IPFS

IPFS (InterPlanetary File System) ni itifaki na mtandao wa rika-kwa-rika uliobuniwa kuunda mbinu iliyogatuliwa [decentralised] ya kuhifadhi na kushiriki faili.

Tofauti na muundo wa jadi wa mteja-seva wa intaneti, IPFS huwaruhusu watumiaji kushiriki faili moja kwa moja wao kwa wao, badala ya kutegemea seva iliyowekwa katikati kuhifadhi na kusambaza maudhui.

Faili katika IPFS hupewa anwani [address] kwa kutumia *uanwani wa maudhui [content-addressing]*, kumaanisha kuwa kila faili hupewa hashi ya kipekee au KITAMBULISHO CHA MAUDHUI (CID) kulingana na maudhui yake, na hashi hii hutumika kurejesha faili kutoka kwenye mtandao.

Mtumiaji anapoongeza faili kwenye IPFS, faili hugawanywa katika vipande vidogo vinavyoitwa block, na kila block hupewa CID. Block hizi kisha huhifadhiwa kwenye node tofauti katika mtandao, ili faili iweze kurejeshwa kwa urahisi kutoka vyanzo vingi.

Hii huhakikisha urudufu na ustahimilivu wa hitilafu huku pia ikifanya iwe vigumu kwa node yoyote moja kuwa sehemu moja ya kushindwa au udhibiti.

**Soma: [Utangulizi wa IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Kuunda Tovuti Yako

Kwa mfano huu, tunaunda tovuti [site] rahisi.

[Tovuti ya Mfano](https://squirrel.surf/)

**Hatua ya 1:** Ikiwa hujafahamu usanifu wa wavuti, andika maudhui makuu ya tovuti yako, yakiwemo Kichwa, Sehemu Kuu ya maandishi, viungo vya kurasa/tovuti nyingine na vijachini.

**Hatua ya 2:** Tumia [kiolezo cha HTML!](https://nicepage.com/html-templates). Bandika maandishi uliyoandika ipasavyo. Pia unaweza kuunda laha ya mitindo ya .CSS kwa tovuti yako.

**Hatua ya 3:** Hifadhi saraka yako. Kurasa zote za .html pamoja na picha lazima ziwe katika Folda moja.

## Kusanidi Node

Pakua na usakinishe IPFS kutoka kwenye [tovuti Rasmi](https://docs.ipfs.tech/install/ipfs-desktop/).

### Anzisha IPFS:

Ikiwa unatumia Programu ya Eneo-kazi, hutahitaji kuanzisha.

Kwa kutumia Terminal au kidokezo cha amri, endesha amri: ipfs init

### **Ongeza Folda ya Tovuti kwenye IPFS**:

Chagua folda yenye faili za tovuti yako na uende kwenye chaguo la Ongeza Folda.


<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

Ikiwa unatumia Terminal, endesha amri: ipfs add -r folder_name ili kuongeza folda nzima kwenye IPFS kwa kujirudia.

### Funga Tovuti kwenye IPFS:

Mara faili za tovuti yako zinapoongezwa kwenye IPFS, unahitaji **kuzifunga [pin]** ili kuhakikisha zinaendelea kupatikana kwenye mtandao.

–

Ikiwa unatumia Terminal, endesha amri: Ikiwa unatumia Terminal, endesha amri: ipfs pin add **hash**

**hash** = CID ya folda uliyoiongeza katika hatua iliyotangulia.

Vinginevyo, unaweza pia kufunga saraka ukitumia huduma kama vile [Pinata](https://pinata.cloud/) au [Dolpin](https://dolpin.io/)

Hii huokoa muda mwingi!

–

### Fikia tovuti yako kwenye IPFS:

Tovuti yako sasa imechapishwa kwenye IPFS na inaweza kufikiwa kwa kutumia hashi ya folda. Ili kufikia tovuti yako, unaweza kutembelea https://ipfs.io/ipfs/**hash**

**hash** = CID ya folda.

Katika hali yetu CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Interplanetary Naming System (IPNS) hukuruhusu kusasisha CID za IPFS zinazohusishwa na tovuti yako na bado kutoa kiungo tuli. Hutolewa kama ufunguo.

<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


Katika menyu ya mipangilio ya folda ya tovuti yako kwenye programu ya eneo-kazi ya IPFS, chagua Chapisha kwenye IPNS.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


Ufunguo: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

Unaweza pia kutumika kutazama tovuti yetu kupitia lango: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## Kiungo cha DNS

Tovuti imeundwa, sasa tunahitaji njia ya kuelekeza URL kwenye maudhui.

Ikiwa tayari unamiliki anwani ya wavuti, unaweza kuongeza rekodi mpya kwa kutumia rekodi ya TXT _dnslink(kikoa chako). Kulingana na mtoa huduma, inaweza kujazwa kiotomatiki.


<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


Itachukua muda kuenea katika mtandao kabla ya kuweza kuiona.

*Hongera! Sasa una tovuti inayostahimili udhibiti.*

____

**Rasilimali**

[Nyaraka za IPFS](https://docs.ipfs.tech/)

[Nyaraka za IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Nyaraka za kiungo cha DNS](https://dnslink.io/#introduction)
