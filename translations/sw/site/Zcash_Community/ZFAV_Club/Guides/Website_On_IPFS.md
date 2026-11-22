<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Chapisha Tovuti kwenye IPFS 

![](/content-images/IPFS-40c2e22732.webp)

## Utangulizi wa IPFS 

IPFS (Mfumo wa Faili wa Kati ya Sayari [InterPlanetary File System]) ni itifaki na mtandao wa rika-kwa-rika uliobuniwa kuunda mbinu iliyogatuliwa ya kuhifadhi na kushiriki faili. 

Tofauti na modeli ya jadi ya mteja-seva ya intaneti, IPFS huwaruhusu watumiaji kushiriki faili moja kwa moja baina yao, badala ya kutegemea seva kuu kuhifadhi na kusambaza maudhui. 

Faili katika IPFS hutambulishwa kwa kutumia *utambuzi kwa maudhui [content-addressing]*, ikimaanisha kwamba kila faili hupewa hash ya kipekee au KITAMBULISHO CHA MAUDHUI (CID) kulingana na maudhui yake, na hash hii hutumika kupata faili kutoka kwenye mtandao.

IPFS huhifadhi maudhui kama block zinazotambuliwa kwa CID. Kuongeza faili huihifadhi kwenye node yako; haiinakili kiotomatiki kwenda kwenye node nyingine. Hakikisha nakala inayofikika iko mtandaoni, au panga ubandikaji wa mbali (remote pinning), ili wasomaji wengine waweze kuipata. Tazama [IPFS udumifu](https://docs.ipfs.tech/concepts/persistence/).

Soma [Utangulizi wa IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Kuunda Tovuti Yako 

Kwa mfano huu tunaunda tovuti rahisi. 

[Mfano wa Tovuti](https://squirrel.surf)


**Hatua ya 1:** Ikiwa hujafahamu usanifu wa wavuti, andika maudhui makuu ya tovuti yako yakijumuisha Kichwa, Sehemu Kuu ya maandishi, pamoja na viungo vya kurasa/tovuti nyingine na vijachini.

**Hatua ya 2:** Tumia [kiolezo cha HTML!](https://nicepage.com/html-templates) Bandika maandishi uliyoandika ipasavyo. Unaweza pia kuunda laha ya mitindo ya .CSS kwa tovuti yako. 

**Hatua ya 3:** Weka ukurasa wako wa nyumbani katika `index.html` kwenye mzizi wa folda ya tovuti. Jumuisha picha zake na CSS, ukitumia njia za jamaa kama `style.css` ili zifanye kazi pia chini ya URL ya lango la IPFS.

## Kusanidi Node

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) husimamia node kwa niaba yako. Iache ikiendelea kufanya kazi wakati unashiriki tovuti yako.

Kwa [njia ya mstari wa amri](https://docs.ipfs.tech/how-to/command-line-quick-start/), anzisha hazina mpya mara moja:

```sh
ipfs init
```

Kisha anzisha node na uache terminal hii ikiwa wazi:

```sh
ipfs daemon
```

Endesha amri zilizobaki katika terminal ya pili. Usianzishe daemon ya pili ikiwa IPFS Desktop tayari inasimamia hazina hii.

**Ongeza Folda ya Tovuti kwenye IPFS**: 

Katika IPFS Desktop, chagua folda yenye faili za tovuti yako kwa kutumia chaguo la Ongeza Folda (Add Folder).

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Kwa njia ya CLI, endesha amri hii kutoka kwenye saraka kuu ya folda ya tovuti yako:

```sh
ipfs add -r folder_name
```

Badilisha `folder_name` kwa jina la folda yako (weka majina yenye nafasi ndani ya alama za nukuu). Hifadhi CID iliyo kwenye mstari wa mwisho wa `added ... folder_name`: inatambulisha saraka nzima, si `index.html` peke yake.

### Bandika Tovuti kwenye IPFS: 

Amri ya CLI `ipfs add` kwa chaguo-msingi hubandika (pin) maudhui yaliyoingizwa kwenye kifaa chako. Thibitisha kwamba folda imebandikwa kwa amri ifuatayo:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Badilisha `YOUR_FOLDER_CID` kwa CID kutoka hatua iliyotangulia; matokeo yanapaswa kuonyesha `recursive`. Kubandika (pinning) hulinda nakala ya node hii dhidi ya ukusanyaji wa taka (garbage collection), lakini hakuifanyi kompyuta iliyozimwa iendelee kuwa mtandaoni. Ili maudhui yapatikane wakati node yako iko nje ya mtandao, panga [ubandikaji wa mbali](https://docs.ipfs.tech/how-to/work-with-pinning-services/) (remote pinning) na uthibitishe kwamba huduma ya mbali imemaliza kubandika.

### Fikia tovuti yako kwenye IPFS: 

Kwanza, kagua tovuti yako kupitia lango la ndani (local gateway) katika `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (tumia mlango (port) wa lango uliochapishwa na daemon yako ikiwa ni tofauti). Alama ya mkwaju wa mwisho (trailing slash) huwezesha viungo vya jamaa (relative links) kufunguka ndani ya saraka.

Lango la umma (public gateway) kama `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` linaweza kuihudumia mara tu linapoweza kupata maudhui kutoka kwa node inayofikika. Onyesho la awali la ndani lililofanikiwa halithibitishi kuwa maudhui yanapatikana kwa umma.

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

Kwa `example.com`, ongeza rekodi hii ya DNS, ukibadilisha `YOUR_FOLDER_CID` na CID ya saraka yako:

| Aina | Jina | Thamani |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Baadhi ya watoa huduma wa DNS huongeza zone (eneo) kiotomatiki; katika hali hiyo, ingiza `_dnslink` pekee. Ikiwa unatumia jina la IPNS lililotajwa hapo juu, thamani inaweza badala yake kuwa `dnslink=/ipns/YOUR_IPNS_NAME`. Tazama [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

![](/content-images/example-c2a9edb28b.webp)

Baada ya usambazaji wa DNS (DNS propagation) kukamilika, jaribu `https://ipfs.io/ipns/example.com/`. Ili kuhudumia tovuti moja kwa moja kwenye `https://example.com/`, utahitaji pia lango (gateway) linalotumia DNSLink na usanidi wa HTTPS. Rekodi ya TXT peke yake haiviweki hivyo. Fuata [mwongozo wa kikoa maalum](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

Hongera! Umesanidi tovuti inayostahimili udhibiti. 


**Rasilimali**

[Nyaraka za IPFS](https://docs.ipfs.tech)

[Nyaraka za IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Nyaraka za kiungo cha DNS](https://dnslink.io/#introduction)
