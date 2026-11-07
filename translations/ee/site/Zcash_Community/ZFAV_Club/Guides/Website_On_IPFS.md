<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ɖe Website ɖe IPFS dzi 

![](/content-images/IPFS-40c2e22732.webp)

## Nyaɖeɖe tso IPFS ŋu 

IPFS (InterPlanetary File System) nye peer-to-peer protocol kple network si wo wɔ be wòawɔ mɔ ha nuɖo agni [decentralized] na filewo ƒe dzadzra kple mama. 

Vovototo le internet ƒe client-server model blema la kple IPFS dome elabena IPFS na mɔ ezãlawo be woama filewo na wo nɔewo tẽ, ɖe woate ŋu akpɔ server aɖe si wozu ɖoƒe ɖeka na nuwo ƒe dzadzra kple mama dzi o. 

Wona IPFS me filewo ƒe gaɖoƒe ƒe dzesi [address] kple *content-addressing*, si fia be wona hash tɔxɛ kple CONTENT IDENTIFIER (CID) na file sia file tso eƒe emetsonu me, eye wozã hash sia be woatsɔ afɔ file la le network la me.

Ne ezãla aɖe tsɔ file aɖe ɖe IPFS me la, woma file la akɔ ɖe akpa suewo si woyɔ be gaɖoɖowo ƒuƒoƒe [blocks], eye wona CID na gaɖoɖowo ƒuƒoƒe sia sia. Wodzra gaɖoɖowo ƒuƒoƒe siawo ɖe ɣaɣla dzesi ŋɔŋlɔ [node] vovovowo dzi le network la me, ale be woate ŋu afɔ file la bɔbɔe tso teƒe geɖewo. 

Esia nana be nuwo ƒe kopiwɔwɔ kple mɔɖeɖe le vodada me nanɔ anyi, eye wònana be ɣaɣla dzesi ŋɔŋlɔ ɖeka manɔ anyi abe vodada kple kontrol ƒe teƒe ɖeka ene o. 

Xlẽ [Nyaɖeɖe tso IPFS ŋu](https://blog.infura.io/post/an-introduction-to-ipfs)



## Wò Site ƒe Wɔwɔ 

Le kpɔɖeŋu sia me la, míele website bɔbɔe aɖe wɔm. 

[Kpɔɖeŋu Site](https://squirrel.surf)


**Afɔ 1:** Ne mènya web design nyuie o la, ŋlɔ emetsonu vevi na wò website, si me Title, nuŋlɔŋlɔ vevi, linkwo ɖe axa bubuwo/site bubuwo kple footerwo le.

**Afɔ 2:** Zã [HTML template!](https://nicepage.com/html-templates). Tsɔ nuŋlɔŋlɔ si nèŋlɔ la de eme ɖe eƒe teƒewoe. Wòate ŋu awɔ .CSS stylesheet hã na wò website, ne wòdi. 

**Afɔ 3:** Dzra wò directory ɖo. Ele be .html axa katã kple aworanwo nanɔ Folder ɖeka me. 



## Ɣaɣla dzesi ŋɔŋlɔ ƒe ƒoƒo

Wɔ download eye nàɖo IPFS tso [Website nyateƒe](https://docs.ipfs.tech/install/ipfs-desktop/) dzi.



### Dze IPFS gɔme: 

Ne èzã Desktop Application la, mele be nàdze egɔme o. 

Ne èzã Terminal alo command prompt la, wɔ command sia: <mark>ipfs init </mark>. 



**Tsɔ Site Folder de IPFS me**: 

Tia folder si me wò website ƒe filewo le, eye nàyi Add Folder option la gbɔ.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Ne èzã Terminal la, wɔ command sia: <mark>ipfs add -r "folder_name"</mark> be nàtsɔ folder blibo la ade IPFS me le mɔ si me wòatsɔ akpaawo katã adze anyi.

### Ɖe Site la ɖe IPFS dzi: 

Ne wotsɔ wò website ƒe filewo de IPFS me vɔ la, ele be nà**pin** wo be wòakpɔ edzi be woanɔ anyi le network la me.

--

Ne èzã Terminal la, wɔ command sia: <mark>ipfs pin add "hash"</mark> 

"hash" = CID na folder si nètsɔ de eme le afɔ si va yi me.


Ke boŋ wòate ŋu aɖe directorywo hã ɖe dzi kple subɔsubɔwo abe [Pinata](https://pinata.cloud) alo [Dolpin](https://dolpin.io) ene

Eɖe gaƒoƒo geɖe! 

--

### Ge ɖe wò website me le IPFS dzi: 

Wò website la ɖe IPFS dzi fifia, eye wòate ŋu age ɖe eme kple folder la ƒe hash. Be nàge ɖe wò website me la, wòate ŋu ayi https://ipfs.io/ipfs/"hash" 

"hash" = Folder la ƒe CID.

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

Ne xɔ web gaɖoƒe ƒe dzesi aɖe xoxo la, wòate ŋu akpe ɖe record yeye aɖe ŋu kple TXT record "_dnslink(your domain)". Eya ate ŋu aɖe eɖokui ɖe eme le provider la ƒe kpekpeɖeŋu nu. 

![](/content-images/example-c2a9edb28b.webp)

Ehiã ɣeyiɣi be wòaɖo ɖe network la katã me hafi nàte ŋu akpɔe. 

Míele wò dzi! Èɖo website si womeate ŋu awɔ dɔ vɔ̃ ɖe eŋu bɔbɔe o. 


**Nuŋkɔwo**

[IPFS ƒe Dokumentiwo](https://docs.ipfs.tech)

[IPNS ƒe Dokumentiwo](https://docs.ipfs.tech/concepts/ipns/)

[DNS link ƒe Dokumentiwo](https://dnslink.io/#introduction)
