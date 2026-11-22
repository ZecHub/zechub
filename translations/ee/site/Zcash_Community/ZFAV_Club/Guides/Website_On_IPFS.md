<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ɖe Website ɖe IPFS dzi 

![](/content-images/IPFS-40c2e22732.webp)

## Nyaɖeɖe tso IPFS ŋu 

IPFS (InterPlanetary File System) nye peer-to-peer protocol kple network si wo wɔ be wòawɔ mɔ ha nuɖo agni [decentralized] na filewo ƒe dzadzra kple mama. 

Vovototo le internet ƒe client-server model blema la kple IPFS dome elabena IPFS na mɔ ezãlawo be woama filewo na wo nɔewo tẽ, ɖe woate ŋu akpɔ server aɖe si wozu ɖoƒe ɖeka na nuwo ƒe dzadzra kple mama dzi o. 

Wona IPFS me filewo ƒe gaɖoƒe ƒe dzesi [address] kple *content-addressing*, si fia be wona hash tɔxɛ kple CONTENT IDENTIFIER (CID) na file sia file tso eƒe emetsonu me, eye wozã hash sia be woatsɔ afɔ file la le network la me.

IPFS dzraa nyatakakawo ɖo abe gaɖoɖowo ƒuƒoƒe [blocks] siwo wodzea si to CID wo dzi ene. Ne èɖe file aɖe kpe ɖe eŋu la, edzraa ɖoe ɖe wò ɣaɣla dzesi ŋɔŋlɔ [node] dzi; meɖoa eƒe kɔpi ɖe ɣaɣla dzesi ŋɔŋlɔ bubuwo dzi le eɖokui si o. Na eƒe kɔpi aɖe si ŋu woate ŋu aɖo la nanɔ online, alo wɔ ɖoɖo na dzraɖoɖo le adzɔge [remote pinning], ale be exlẽla bubuwo nate ŋu axɔe. Kpɔ [IPFS ƒe anyinɔnɔ ɖaa](https://docs.ipfs.tech/concepts/persistence/).

Xlẽ [Nyaɖeɖe tso IPFS ŋu](https://blog.infura.io/post/an-introduction-to-ipfs)



## Wò Site ƒe Wɔwɔ 

Le kpɔɖeŋu sia me la, míele website bɔbɔe aɖe wɔm. 

[Kpɔɖeŋu Site](https://squirrel.surf)


**Afɔ 1:** Ne mènya web design nyuie o la, ŋlɔ emetsonu vevi na wò website, si me Title, nuŋlɔŋlɔ vevi, linkwo ɖe axa bubuwo/site bubuwo kple footerwo le.

**Afɔ 2:** Zã [HTML template!](https://nicepage.com/html-templates). Tsɔ nuŋlɔŋlɔ si nèŋlɔ la de eme ɖe eƒe teƒewoe. Wòate ŋu awɔ .CSS stylesheet hã na wò website, ne wòdi. 

**Afɔ 3:** Tsɔ wò homepage de `index.html` me le site ƒe folder la ƒe ke (root) me. Tsɔ eƒe nɔnɔmetatawo kple CSS hã de eme, eye nàzã mɔ siwo do ƒome kple wo nɔewo (relative paths) abe `style.css` ene, ale be woawɔ dɔ le IPFS gateway URL te hã.

## Ɣaɣla dzesi ŋɔŋlɔ ƒe ƒoƒo

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) kpɔa ɣaɣla dzesi ŋɔŋlɔ (node) dzi na wò. Na wòasi ɖaa le esime nèle wò nyatakakadzraɖoƒe (site) mam.

Le [mɔ si dzi nàto le command-line dzi](https://docs.ipfs.tech/how-to/command-line-quick-start/) ta la, wɔ repository yeye aɖe ƒe gɔmedzedze zi ɖeka ko:

```sh
ipfs init
```

Emegbe dze ɣaɣla dzesi ŋɔŋlɔ la gɔme eye nàna terminal sia nanɔ ʋuʋu:

```sh
ipfs daemon
```

Wɔ sedede siwo susɔ la le terminal evelia me. Mègadze daemon evelia gɔme o ne IPFS Desktop le nyati sia dzi kpɔm xoxo.

**Tsɔ Site Folder de IPFS me**: 

Le IPFS Desktop me la, tia faɛl siwo le wò nyatakakadzraɖoƒe (website) ŋu la ƒe agbalẽgo to "Add Folder" tiatia la dzi.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Na CLI (Command Line Interface) mɔ la, wɔ esia tso wò site la ƒe agbalẽdzraɖoƒe ƒe dada-agbalẽdzraɖoƒe me:

```sh
ipfs add -r folder_name
```

Ɖɔli `folder_name` ɖe wò agbalẽdzraɖoƒe (folder) ƒe ŋkɔ teƒe (tsɔ ŋkɔ siwo me teƒe ƒuƒluwo le la de nuŋlɔdzesi "…" me). Dzra CID la ɖo le fli `added ... folder_name` mamlɛtɔ dzi: eyae ɖea agbalẽdzraɖoƒe blibo la fiana, menye `index.html` ɖeɖe ko o.

### Ɖe Site la ɖe IPFS dzi: 

CLI `ipfs add` sedede la tsɔa nu siwo nètsɔ de eme la dea pin wò kɔmpiuta dzi le gɔmedzedzea me. Ŋlɔ esia nàtsɔ akpɔ folder la ƒe pin:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Ɖɔli `YOUR_FOLDER_CID` kple CID si nèkpɔ le afɔɖeɖe si do ŋgɔ me; ele be nusi do goe nagblɔ be `recursive`. Pinning (nu ɖoɖo ɖe te) kpɔa ɣaɣla dzesi ŋɔŋlɔ sia ƒe kɔpi ta tso nu gbegblẽwo ŋuti ɖeɖeɖa (garbage collection) me, gake mewɔnɛ be kɔmpiuta si wotsi la nanɔ internet dzi o. Be nàte ŋu akpɔ nuawo esime wò ɣaɣla dzesi ŋɔŋlɔ mele internet dzi o la, ɖo [pinning tso adzɔge (remote pinning)](https://docs.ipfs.tech/how-to/work-with-pinning-services/) eye nàkpɔ egbɔ be dɔwɔƒe si le adzɔge la wu pinning nu.

### Ge ɖe wò website me le IPFS dzi: 

Gbã la, kpɔ wò website to local gateway (mɔnu si dzi nàto ge ɖe nyatakakawo me le wò kɔmpiuta dzi) dzi le `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (zã gateway port si wò daemon ɖe fia ne mesɔ kple esia o). Slash si le nuwuwu la na be links siwo do ƒome kple teƒe (relative links) nawɔ dɔ le directory la me.

Dutoƒe gateway abe `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` ene ate ŋu aɖe wò website la afia ne ete ŋu xɔ emenyawo tso ɣaɣla dzesi ŋɔŋlɔ (node) si wòate ŋu ade gbe na la gbɔ. Ne wò website la dze nyuie le wò ŋutɔ wò kɔmpiuta dzi la, menye kpeɖodzi be amewo katã ate ŋu akpɔe le dutoƒo o.

Le míatɔ ƒe nɔnɔme me la, CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

Interplanetary Naming System (IPNS) na mɔ wò be nàtrɔ IPFS CID siwo wotsi kple wò website la, eye nàɖe link ɖeka si metsrɔna o afia. Wonae abe key ene. 

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

Le settings menu na wò site foldre le IPFS desktop application me la, tia Publish to IPNS.  

![](/content-images/IPNS-2fe62cc369.webp)

Key: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Wòate ŋu azãe hã be wòakpɔ míatɔ ƒe site la to gateway aɖe dzi: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS Link 
 
Woɖo site la vɔ, fifia ele be míakpɔ mɔ si woatsɔ atia URL ɖe emetsonu la ŋu. 

Na `example.com` la, tsɔ DNS ŋɔŋlɔ sia kpe ɖe eŋu, eye nàtsɔ wò ɖoɖomeƒe ƒe CID aɖɔli `YOUR_FOLDER_CID`:

| Ƒomevi | Ŋkɔ | Asixɔxɔ |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

DNS ƒe nunanalawo ƒe ɖewo tsɔa zone la kpena ɖe eŋu le wo ɖokui si; ŋlɔ `_dnslink` ko ɖe afi ma. Ne èle IPNS ŋkɔ si le etame la zãm la, ke asixɔxɔ la ate ŋu anye `dnslink=/ipns/YOUR_IPNS_NAME` boŋ. Kpɔ [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

![](/content-images/example-c2a9edb28b.webp)

Ne DNS kaka vɔ megbe la, te `https://ipfs.io/ipns/example.com/` kpɔ. Be nàna website la nadze tẽ le `https://example.com/` dzi la, ehiã gateway si ate ŋu awɔ dɔ kple DNSLink kple HTTPS ɖoɖo hã; TXT record ɖeka ko mate ŋu aɖo esiawo o. Wɔ ɖe [mɔfiame na custom domain](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/) la dzi.

Míele wò dzi! Èɖo website si womeate ŋu awɔ dɔ vɔ̃ ɖe eŋu bɔbɔe o. 


**Nuŋkɔwo**

[IPFS ƒe Dokumentiwo](https://docs.ipfs.tech)

[IPNS ƒe Dokumentiwo](https://docs.ipfs.tech/concepts/ipns/)

[DNS link ƒe Dokumentiwo](https://dnslink.io/#introduction)
