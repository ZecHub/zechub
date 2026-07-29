<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Tẹ Àwòrán kan jáde lórí IPFS

<a href="">
    <img src="https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg" alt="" width="800" height="400"/>
</a>



## Ìfilọ́lẹ̀ sí IPFS

IPFS (InterPlanetary File System) jẹ́ ìlànà àti ẹ̀rọ alájọṣe-sí-aládàáṣiṣẹ́ tí wọ́n ṣe láti dá ọ̀nà dídásílẹ̀ sílẹ̀ fún ìpamọ́ àti pínpín àwọn fáìlì.

Ko dabi awoṣe onibara ati olupin ti Intanẹẹti, IPFS gba awọn olumulo laaye lati pin awọn faili taara pẹlu ara wọn, dipo igbẹkẹle lori olupin aarin kan lati tọju ati pinpin akoonu.

Àwọn fáìlì ní IPFS ni wọ́n máa ń lò láti fi adirẹsi ìsọfúnni *content-addressing*, èyí tó túmọ̀ sí wípé a fún fáìlù kọ̀ọ̀kan ní àkànṣe hash tàbí CONTENT IDENTIFIER (CID) tí ó dá lórí àwọn ohun tí ó wà nínú rẹ̀, tí a sì máa ń lo hash yìí láti gba fáìlẹ̀ náà padà láti inú nẹ́ẹ̀kì.

When a user adds a file to IPFS, the file is broken up into small pieces called blocks, and each block is given a CID. These blocks are then stored on different nodes in the network, so that the file can be easily retrieved from multiple sources.

Eleyi mu idaniloju redundancy ati aiṣedede-tolerance nigba ti tun ṣiṣe awọn ti o nira fun eyikeyi ọkan node lati di kan nikan ojuami ti ikuna tabi iṣakoso.

**Ka: [Ìfilọ́lẹ̀ sí IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Ṣídá Ìkànnì Rẹ

Fun apẹẹrẹ yii a n ṣe oju opo wẹẹbu ti o rọrun.

[Àpẹẹrẹ Ìkànnì](https://squirrel.surf/)

**Igbesẹ 1:** Ti o ko ba mọ nipa apẹrẹ oju-iwe ayelujara kọ akoonu akọkọ fun oju opo wẹẹbu rẹ pẹlu Akọle, Ara akọkọ ti ọrọ, pẹlu awọn ọna asopọ si awọn oju-ewe miiran / aaye ati awọn ẹsẹ.

**Igbesẹ 2:** Lo àdàkọ HTML!](https://nicepage.com/html-templates) Fi ọrọ ti o ti kọ ni ibamu. Oṣiṣẹ lati tun ṣẹda iwe aṣa .CSS fun oju opo wẹẹbu rẹ.

**Igbesẹ 3:** Fi àkájọ rẹ pamọ. Gbogbo àwọn ojúewé .html + àwọn àwòrán gbọdọ̀ wà nínú Àkájọ kan náà.

## Ṣíṣètò Ìkànnì kan

Ṣe igbasilẹ ki o si fi IPFS sori ẹrọ lati [Awọn aaye ayelujara osise](https://docs.ipfs.tech/install/ipfs-desktop/).

### Ṣíṣe àkọlé IPFS:

Ti o ba nlo ohun elo tabili iwọ kii yoo ni lati ṣe ipilẹṣẹ.

Lílo Terminal tàbí àṣẹ prompt, Run command: ipfs init

### **Fikun Àpamọ́ Ìkànnì sí IPFS**:

Yan folda pẹlu awọn faili oju opo wẹẹbu rẹ ki o lọ si aṣayan Fikun Folda.


<a href="">
    <img src="https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png" alt="" width="400" height="200"/>
</a>

–

Ti o ba nlo Terminal, Run command: ipfs add -r folder_name láti fi gbogbo àpamọ́ náà kún IPFS.

### Ibi tí wọ́n ti fi àmì ìdánimọ̀ IPFS sí:

Lọgan ti awọn faili oju opo wẹẹbu rẹ ba ti ṣafikun si IPFS, o nilo lati ** pin ** wọn lati rii daju pe wọn wa ni nẹtiwọọki.

–

Ti o ba nlo Terminal, Ṣiṣẹ aṣẹ: Ti o bá nlo terminal, Ṣiṣe aṣẹ: ipfs pin fi **hash** kun

**hash** = CID ti àpamọ́ tí o fi kún un ní ìgbésẹ̀ tó ṣáájú.

Ni omiiran, o tun ni anfani lati pin awọn itọnisọna lilo awọn iṣẹ bii [Pinata](https://pinata.cloud/) tàbí [Dolpin](https://dolpin.io/)

Ó máa ń dín àkókò kù gan-an!

–

### Wọlé sí ìkànnì rẹ lórí IPFS:

Oju opo wẹẹbu rẹ ti wa ni atẹjade bayi lori IPFS ati pe o le wọle nipasẹ lilo hash ti folda naa. Lati wọle si oju opo ayelujara rẹ, o le ṣabẹwo https://ipfs.io/ipfs/**hash**

**hash** = CID ti àpamọ́ náà.

Ninu ọran wa CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS ì ì

Ètò Orúkọ Àgbáyé (IPNS) jẹ́ kó o lè ṣe àtúnṣe sí IPFS CIDs tí ó ní í ṣe pẹ̀lú ìkànnì rẹ, tí yóò sì máa ṣiṣẹ́ gẹ́gẹ́ bí ìjápọ̀ dídúró.


<a href="">
    <img src="https://dnslink.io/assets/dns-query.a0134a75.png" alt="" width="400" height="100"/>
</a>


Ninu akojọ aṣayan awọn eto fun apoti aaye rẹ lori ohun elo tabili tabili IPFS yan Tẹjade si IPNS.

<a href="">
    <img src="https://i.ibb.co/Ch25dKf/IPNS.png" alt="" width="400" height="200"/>
</a>


Key: k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

O tun le ṣee lo lati wo aaye wa nipasẹ ẹnu-ọna kan: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## Ìjápọ̀ DNS

A ti dá ìkànnì náà, ní báyìí a nílò ọ̀nà kan láti tọ URL lọ sí ìsọfúnni inú rẹ̀.

If you already own a web address you are able to add a new record using the TXT record _dnslink(your domain). Depending on provider it may auto populate.


<a href="">
    <img src="https://i.ibb.co/MgRxBHj/example.png" alt="" width="400" height="100"/>
</a>


Ó máa gba àkókò kó tó di pé ó tàn kálẹ̀ nínú ẹ̀rọ náà kí o tó lè rí i.

Ẹ kú oríire, ẹ ní ìkànnì kan tí kò lè ṣe àyẹ̀wò.

____

**Àwọn ohun àmúṣọrọ̀**

[Àwọn ìwé IPFS](https://docs.ipfs.tech/)

[Àwọn ìwé IPNS](https://docs.ipfs.tech/concepts/ipns/)

[ìjápọ̀ DNS Àkọsílẹ̀](https://dnslink.io/#introduction)
