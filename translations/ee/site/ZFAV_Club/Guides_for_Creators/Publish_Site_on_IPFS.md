<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ɖe Nyaɖeɖefia Aɖe IPFS dzi

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## Nyaɖeɖefia ƒe Gɔmedzedze ku ɖe IPFS ŋu

IPFS (InterPlanetary File System) nye peer-to-peer protocol kple network si wo wɔ be wòawɔ mɔ ha nuɖo agni [decentralised] na filewo ƒe dzadzra kple mama.

To vovo na internet ƒe client-server model blema la, IPFS na mɔ zãlawo be woama filewo na wo nɔewo tẽ, le esime wometsɔa centralised server aɖe o be wòadzra emewo ɖo eye wòama eme.

Wotsɔ *content-addressing* na filewo ƒe gaɖoƒe ƒe dzesi [address] le IPFS me, si fia be wòxɔ file ɖe sia ɖe na hash alo CONTENT IDENTIFIER (CID) tɔxɛ aɖe le eƒe emenyawo nu, eye wozãa hash sia be woaxɔ file la tso network la me.

IPFS dzraa nyatakakawo ɖo abe gaɖoɖowo ƒuƒoƒe [block] siwo wode dzesii kple CID wo ene. Ne èkpe file aɖe ɖe eŋu la, edzraa eɖo ɖe wò ɣaɣla dzesi ŋɔŋlɔ [node] dzi ko; mekɔa eƒe kɔpi ɖe ɣaɣla dzesi ŋɔŋlɔ bubuwo dzi le eɖokui si o. Na kɔpi aɖe si ŋu ame bubuwo ate ŋu aɖo la nanɔ online ɣesiaɣi, alo ɖo ɖoɖo na dzadzraɖo le adzɔge (remote pinning), ale be hlẽla bubuwo nate ŋu axɔe. Kpɔ [IPFS ƒe anyinɔnɔ ɖaa](https://docs.ipfs.tech/concepts/persistence/).

**Xlẽ: [Gɔmedzedze Nyaɖeɖefia ku ɖe IPFS ŋu](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Wò Ɖe Nyaɖeɖefia ƒe Wɔwɔ

Le kpɔɖeŋu sia me la, míele website bɔbɔe aɖe wɔm.

[Kpɔɖeŋu Ɖe Nyaɖeɖefia](https://squirrel.surf/)

**Afɔ 1:** Ne mènya web design nyuie o la, ŋlɔ emenyawo katã na wò website, siwoe nye Title, nuŋɔŋlɔ ƒe ŋutilã gã, linkwo na axa bubuwo alo site bubuwo kple footerwo.

**Afɔ 2:** Zã [HTML template!](https://nicepage.com/html-templates). Ɖe nuŋɔŋlɔ si nèŋlɔ la ɖe eme ɖe ale si wòle. Ɖe ŋutinya me la, àte ŋu awɔ .CSS stylesheet hã na wò website.

**Afɔ 3:** Tsɔ wò aƒemenuŋɔŋlɔ gbãtɔ (homepage) de `index.html` me le site ƒe nudzraɖoƒe (folder) gbãtɔ ƒe ke dzi. Tsɔ eƒe nɔnɔmetatawo kple CSS hã de eme, eye nàzã mɔ siwo do ƒome kplii (relative paths) abe `style.css` ene, ale be woawɔ dɔ le IPFS gateway URL te hã.

## Ɣaɣla Dzesi Ŋɔŋlɔ ƒe Ðoɖo

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) kpɔa ɣaɣla dzesi ŋɔŋlɔ (node) dzi na wò. Na wòanɔ dɔ wɔm le esime nèle wò nyatakakadzraɖoƒe mam na amewo.

Le [mɔ si toa command-line dzi](https://docs.ipfs.tech/how-to/command-line-quick-start/) ta la, dze repository yeye aɖe gɔme zi ɖeka ko:

```sh
ipfs init
```

Emegbe dze ɣaɣla dzesi ŋɔŋlɔ la gɔme eye nàgblẽ terminal sia ɖe ʋuʋu:

```sh
ipfs daemon
```

Wɔ sedede siwo susɔ la le terminal evelia me. Mègadze daemon evelia gɔme o ne IPFS Desktop xa le dzɔdzɔm na nudzraɖoƒe sia xoxo.

### **Tsɔ Site Folder kpe ɖe IPFS ŋu**:

Le IPFS Desktop me la, tia agbalẽdzraɖoƒe (folder) si me wò nyatakakadzraɖoƒe ƒe faɛlwo le, to Add Folder ƒe tiatia dzi.

<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

Le CLI mɔ̃ (CLI route) dzi la, wɔ esia tso wò site ƒe agbalẽdzraɖoƒe ƒe dzinɔ agbalẽdzraɖoƒe (parent directory) me:

```sh
ipfs add -r folder_name
```

Ɖɔli `folder_name` ɖe wò agbalẽƒoƒe ƒe ŋkɔ teƒe (tsɔ ŋkɔ siwo me teƒe ƒuƒlu le la de nyagbe-dzesiwo me). Dzra CID la ɖo le `added ... folder_name` fli mamlɛtɔ dzi: eyae ɖea agbalẽƒoƒe bliboa fiana, menye `index.html` ɖeɖeko o.

### Ɖe Site la ƒe pin ɖe IPFS dzi:

CLI ƒe `ipfs add` sedede la tsɔa nu siwo nèdo ɖe eme la ƒoa pin ɖe wò kɔmpiuta dzi le gɔmedzedzea me. Kpɔ folder la ƒe pin to esia dzi:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Ɖɔ `YOUR_FOLDER_CID` ɖe CID si tso afɔɖeɖe si do ŋgɔ me la teƒe; ele be nu si do go la nagblɔ `recursive`. Pinning (pinning) kpɔa ɣaɣla dzesi ŋɔŋlɔ sia ƒe kɔpi ta tso nugbegblẽwo ƒe ɖeɖeɖa (garbage collection) me, gake mewɔnɛ be kɔmpiuta si wotsi la nanɔ internet dzi o. Ne èdi be nuwo nanɔ asiwò ne wò ɣaɣla dzesi ŋɔŋlɔ mele internet dzi o la, ɖo [pinning le adzɔge (remote pinning)](https://docs.ipfs.tech/how-to/work-with-pinning-services/) eye nàkpɔ egbɔ be adzɔge dɔwɔƒe la wu pinning la nu.

### Ke ɖe wò website ŋu le IPFS dzi:

Gbã la, kpɔ wò website to local gateway (mɔnu si le wò kɔmpiuta dzi) si le `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` dzi (zã gateway port si wò daemon ta ne etɔ vovo). Slash si le nuwuwu la naa be relative links (kadodo siwo ku ɖe teƒe si nèle ŋu) nawɔ dɔ le directory la me.

Dzɔtsoƒe si le ablɔ me abe `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` ene (public gateway) ate ŋu aɖee afia ne ete ŋu xɔ nyatakakawo tso ɣaɣla dzesi ŋɔŋlɔ (node) si wòate ŋu ade gbɔ la gbɔ. Ne èkpɔe le wò ŋutɔ wò kɔmpiuta dzi nyuie la, menye kpeɖodzi be ame sia ame ate ŋu akpɔe le internet dzi o.

Le míaƒe nya me la, CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Interplanetary Naming System (IPNS) na mɔ wò be nàtrɔ IPFS CID siwo kadodo kple wò website la, eye nàgaɖe link si metena o. Wonae abe key ene.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


Le settings menu na wò site folder le IPFS desktop application me la, tia Publish to IPNS.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


Key: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

Àte ŋu azãe hã be nàkpɔ míaƒe site to gateway aɖe dzi: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS Link

Wowɔ site la vɔ, fifia ele be míakpɔ mɔ aɖe si ato aɖo URL ɖe emenyawo ŋu.

Na `example.com` la, tsɔ DNS ŋɔŋlɔ sia kpe ɖe eŋu, eye nàɖɔ li `YOUR_FOLDER_CID` kple wò agbalẽdzraɖoƒe ƒe CID:

| Ƒomevi | Ŋkɔ | Asixɔxɔ |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

DNS-dɔwɔƒe aɖewo tsɔa zone la kpena ɖe eŋu le eɖokui si; ŋlɔ `_dnslink` ko le afima. Ne èle IPNS ŋkɔ si le etame la zãm la, ke asixɔxɔ la ate ŋu anye `dnslink=/ipns/YOUR_IPNS_NAME` boŋ. Kpɔ [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


After DNS ƒe kaka vɔ la, te `https://ipfs.io/ipns/example.com/` kpɔ. Be nàna website la nado le `https://example.com/` tẽ la, ehiã gateway si te ŋu wɔa dɔ kple DNSLink kpakple HTTPS ɖoɖo hã; TXT record ɖeɖe ko mewɔa ɖoɖo siawo o. Wɔ ɖe [custom-domain mɔfiame](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/) dzi.

*Miakpe na wò! Fifia la, website si ƒe mɔxɔmèwɔwɔ ƒe dzedze ate ŋu ate ŋu wòle asiwò.*

____

**Nuɖoɖowo**

[IPFS ƒe Dokumentewo](https://docs.ipfs.tech/)

[IPNS ƒe Dokumentewo](https://docs.ipfs.tech/concepts/ipns/)

[DNS link ƒe Dokumentewo](https://dnslink.io/#introduction)
