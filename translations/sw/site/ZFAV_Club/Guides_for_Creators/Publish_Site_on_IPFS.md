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

IPFS huhifadhi maudhui kama block zinazotambuliwa kwa CID. Kuongeza faili huihifadhi kwenye node yako; haiinakili kiotomatiki kwenda kwenye node nyingine. Weka nakala inayofikika mtandaoni, au panga ubandikaji wa mbali (remote pinning), ili wasomaji wengine waweze kuirejesha. Tazama [IPFS udumishaji](https://docs.ipfs.tech/concepts/persistence/).

**Soma: [Utangulizi wa IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Kuunda Tovuti Yako

Kwa mfano huu, tunaunda tovuti [site] rahisi.

[Tovuti ya Mfano](https://squirrel.surf/)

**Hatua ya 1:** Ikiwa hujafahamu usanifu wa wavuti, andika maudhui makuu ya tovuti yako, yakiwemo Kichwa, Sehemu Kuu ya maandishi, viungo vya kurasa/tovuti nyingine na vijachini.

**Hatua ya 2:** Tumia [kiolezo cha HTML!](https://nicepage.com/html-templates). Bandika maandishi uliyoandika ipasavyo. Pia unaweza kuunda laha ya mitindo ya .CSS kwa tovuti yako.

**Hatua ya 3:** Weka ukurasa wako wa nyumbani katika `index.html` kwenye mzizi wa folda ya tovuti. Jumuisha picha zake na CSS, ukitumia njia linganishi (relative paths) kama vile `style.css` ili zifanye kazi pia chini ya URL ya lango (gateway) la IPFS.

## Kusanidi Node

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) inasimamia node kwa niaba yako. Tafadhali iache ikiendelea kufanya kazi wakati wote unaposhiriki tovuti yako.

Kwa [njia ya mstari wa amri](https://docs.ipfs.tech/how-to/command-line-quick-start/), anzisha hazina mpya mara moja:

```sh
ipfs init
```

Kisha anzisha node na uache terminal hii ikiwa wazi:

```sh
ipfs daemon
```

Endesha amri zilizobaki katika terminal ya pili. Usianzishe daemon ya pili ikiwa IPFS Desktop tayari inasimamia hazina (repository) hii.

### **Ongeza Folda ya Tovuti kwenye IPFS**:

Katika IPFS Desktop, chagua folda yenye faili za tovuti yako kwa kutumia chaguo la Ongeza Folda (Add Folder).

<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

Kwa njia ya CLI, endesha amri hii kutoka kwenye saraka kuu ya folda ya tovuti yako:

```sh
ipfs add -r folder_name
```

Badilisha `folder_name` kwa jina la folda yako (weka majina yenye nafasi ndani ya alama za nukuu). Hifadhi CID iliyo kwenye mstari wa mwisho wa `added ... folder_name`: inatambulisha saraka nzima, si `index.html` pekee.

### Funga Tovuti kwenye IPFS:

Amri ya CLI `ipfs add` kwa chaguo-msingi hubandika (pin) maudhui yaliyoingizwa ndani ya kompyuta yako. Hakikisha folda imebandikwa kwa kutumia:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Badilisha `YOUR_FOLDER_CID` kwa CID kutoka hatua iliyotangulia; matokeo yanapaswa kuonyesha `recursive`. Kubandika (pinning) kunalinda nakala ya node hii dhidi ya ukusanyaji wa taka (garbage collection), lakini hakuifanyi kompyuta iliyozimwa ibaki mtandaoni. Ili maudhui yapatikane wakati node yako iko nje ya mtandao, panga [ubandikaji wa mbali](https://docs.ipfs.tech/how-to/work-with-pinning-services/) (remote pinning) na uthibitishe kwamba huduma ya mbali imemaliza kubandika.

### Fikia tovuti yako kwenye IPFS:

Kwanza, kagua tovuti yako kupitia lango la ndani (local gateway) kwenye `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (tumia mlango wa lango uliochapishwa na daemon yako ikiwa ni tofauti). Alama ya mkwaju wa mwisho (/) huwezesha viungo vya jamaa kupatikana ndani ya saraka.

Lango la umma (public gateway) kama `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` linaweza kuihudumia mara tu litakapoweza kupata maudhui kutoka kwa node inayofikika. Onyesho la awali la ndani lililofanikiwa halithibitishi kwamba maudhui yanapatikana kwa umma.

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

Kwa `example.com`, ongeza rekodi hii ya DNS, ukibadilisha `YOUR_FOLDER_CID` na CID ya saraka yako:

| Aina | Jina | Thamani |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Baadhi ya watoa huduma za DNS huongeza zoni (zone) kiotomatiki; katika hali hiyo, ingizeni `_dnslink` pekee. Mkitumia jina la IPNS lililotajwa hapo juu, thamani inaweza badala yake kuwa `dnslink=/ipns/YOUR_IPNS_NAME`. Tazameni [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


Baada ya DNS kusambaa, jaribu `https://ipfs.io/ipns/example.com/`. Ili kuhudumia tovuti moja kwa moja kwenye `https://example.com/`, unahitaji pia lango (gateway) linaloweza kutumia DNSLink pamoja na usanidi wa HTTPS; rekodi ya TXT peke yake haiweki mambo hayo. Fuata [mwongozo wa kikoa maalum](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

*Hongera! Sasa una tovuti inayostahimili udhibiti.*

____

**Rasilimali**

[Nyaraka za IPFS](https://docs.ipfs.tech/)

[Nyaraka za IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Nyaraka za kiungo cha DNS](https://dnslink.io/#introduction)
