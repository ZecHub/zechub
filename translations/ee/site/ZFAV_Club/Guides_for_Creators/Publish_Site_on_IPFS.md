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

Ne zãla aɖe tsɔ file aɖe kpe ɖe IPFS ŋu la, woma file la ɖe akpa suewo si woyɔna be gaɖoɖowo ƒuƒoƒe [block] me, eye woxɔ CID na gaɖoɖowo ƒuƒoƒe ɖe sia ɖe. Wodzra gaɖoɖowo ƒuƒoƒe siawo ɖo le ɣaɣla dzesi ŋɔŋlɔ [node] vovovowo dzi le network la me, ale be woate ŋu axɔ file la tso teƒe geɖewo me bɔbɔe.

Esia nana be nuwo nakpɔ ɖa, eye wòƒoa nuwo ƒe gbegblẽ dzi, le esime wònana kɔkɔe be ɣaɣla dzesi ŋɔŋlɔ ɖeka mate ŋu azu teƒe ɖeka si me gbegblẽ alo dziɖuɖu katã tso o.

**Xlẽ: [Gɔmedzedze Nyaɖeɖefia ku ɖe IPFS ŋu](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Wò Ɖe Nyaɖeɖefia ƒe Wɔwɔ

Le kpɔɖeŋu sia me la, míele website bɔbɔe aɖe wɔm.

[Kpɔɖeŋu Ɖe Nyaɖeɖefia](https://squirrel.surf/)

**Afɔ 1:** Ne mènya web design nyuie o la, ŋlɔ emenyawo katã na wò website, siwoe nye Title, nuŋɔŋlɔ ƒe ŋutilã gã, linkwo na axa bubuwo alo site bubuwo kple footerwo.

**Afɔ 2:** Zã [HTML template!](https://nicepage.com/html-templates). Ɖe nuŋɔŋlɔ si nèŋlɔ la ɖe eme ɖe ale si wòle. Ɖe ŋutinya me la, àte ŋu awɔ .CSS stylesheet hã na wò website.

**Afɔ 3:** Dzra wò directory ɖo. .html axa katã kple aworanwo nɔ Folder ɖeka me.

## Ɣaɣla Dzesi Ŋɔŋlɔ ƒe Ðoɖo

Wɔ IPFS download eye nàɖo eƒe application ɖe wò mɔ̃ dzi tso [Official website](https://docs.ipfs.tech/install/ipfs-desktop/) dzi.

### Dze IPFS gɔme:

Ne èle Desktop Application la zãm la, mele be nàdze egɔme o.

Le Terminal alo command prompt me la, wɔ command sia: ipfs init

### **Tsɔ Site Folder kpe ɖe IPFS ŋu**:

Tia folder si me wò website ƒe filewo le, eye nàyi Add Folder option la gbɔ.


<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

Ne èle Terminal zãm la, wɔ command sia: ipfs add -r folder_name be nàtsɔ folder blibo la katã akpe ɖe IPFS ŋu le mɔ si de eme me.

### Ɖe Site la ƒe pin ɖe IPFS dzi:

Ne wotsɔ wò website ƒe filewo kpe ɖe IPFS ŋu vɔ la, ele be nà**pin** wo be wòakpɔ ɖe edzi be woanɔ network la dzi.

–

Ne èle Terminal zãm la, wɔ command sia: Ne èle Terminal zãm la, wɔ command sia: ipfs pin add **hash**

**hash** = Folder si nètsɔ kpe ɖe eme le afɔ si va yi me la ƒe CID.

Ke hã, àte ŋu aɖe pin directorywo to dɔwɔƒewo abe [Pinata](https://pinata.cloud/) alo [Dolpin](https://dolpin.io/) dzi.

Ehea ɣeyiɣi geɖe!

–

### Ke ɖe wò website ŋu le IPFS dzi:

Wodo wò website ɖe IPFS dzi fifia, eye àte ŋu ake ɖe eŋu kple folder la ƒe hash. Be nàke ɖe wò website ŋu la, àte ŋu ayi https://ipfs.io/ipfs/**hash**

**hash** = Folder la ƒe CID.

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

Ne xɔ web address aɖe le asiwò xoxo la, àte ŋu atsɔ record yeye aɖe akpe ɖe eŋu kple TXT record _dnslink(your domain). Le provider la nu la, ate ŋu aɖe eɖokui ɖe eme.

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


Ehiã ɣeyiɣi be wòaɖe eyi network la katã me hafi nàte ŋu akpɔe.

*Miakpe na wò! Fifia la, website si ƒe mɔxɔmèwɔwɔ ƒe dzedze ate ŋu ate ŋu wòle asiwò.*

____

**Nuɖoɖowo**

[IPFS ƒe Dokumentewo](https://docs.ipfs.tech/)

[IPNS ƒe Dokumentewo](https://docs.ipfs.tech/concepts/ipns/)

[DNS link ƒe Dokumentewo](https://dnslink.io/#introduction)
