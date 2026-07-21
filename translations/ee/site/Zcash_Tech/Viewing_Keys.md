<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Safuiwo Kpɔkpɔ

Adrɛs siwo wokpɔ ta na la wɔnɛ be ezãlawo te ŋu wɔa asitsadɔ esime wole nyatakaka sue aɖe ko ɖem fia le Zcash blockchain la dzi. Nukae dzɔna ne ehiã be nàɖe nyatakaka vevi siwo ƒo xlã Zcash ƒe asitsatsa si wokpɔ ta na la afia akpa aɖe koŋ? Adrɛs ɖesiaɖe si wokpɔ ta na la ƒe safui aɖe le eme. Woto nukpɔkpɔ ƒe safuiwo vɛ le [ZIP 310](https://zips.z.cash/zip-0310) eye wotsɔe kpe ɖe ɖoɖowɔɖia ŋu le Sapling network upgrade me. Safuiwo kpɔkpɔ nye Zcash ƒe akpa vevi aɖe elabena woɖea mɔ na ezãlawo be woatia nyatakaka siwo ku ɖe asitsatsa ŋu la ɖe go.

### Nukatae nàzã nukpɔkpɔ ƒe safui?

Nukatae zãla aɖe adi be yeawɔ esia gbeɖeka? Tso Electric Coin Co. ƒe blog si ku ɖe nya sia ŋu...

*- Exchange di be yeade dzesi ne asisi aɖe tsɔ ZEC de adrɛs si wokpɔ ta na, esime wòle **zazã ƒe ŋusẽ** ƒe safuiwo dzram ɖo ɖe xɔtunu siwo le dedie dzi. Exchange la ate ŋu awɔ nukpɔkpɔ ƒe safui si gbɔna eye wòatsɔe ade **detection** node si do ƒome kple Internet dzi, evɔ gazazã ƒe safuia ya gakpɔtɔ le ɖoɖo si le dedie wu la dzi.*

*- Ele be gadzikpɔla nana woƒe Zcash si le wo si la ƒe dzedzeme na agbalẽdzikpɔlawo. Dzɔla ate ŋu awɔ nukpɔkpɔ ƒe safui blibo na woƒe adrɛs siwo wokpɔ ta na dometɔ ɖesiaɖe eye wòama safui ma kple woƒe agbalẽdzikpɔla. Agbalẽdzikpɔla ate ŋu akpɔe ɖa be adrɛs mawo ƒe agbɔsɔsɔ si susɔ eye wòalé ŋku ɖe asitsatsa siwo wowɔ va yi yi adrɛs mawo dzi kple wo gbɔ va yi ŋu.* 

*- Ðewohĩ ahiã be asitsaha aɖe nawɔ ŋkuléle ɖe asisi aɖe si tsɔ ga de eme tso adrɛs si ŋu wokpɔ ta na la ŋu. Exchange ate ŋu abia tso asisiwo ƒe nukpɔkpɔ ƒe safui si be wòana woƒe adrɛs si wokpɔ ta na eye wòazãe atsɔ alé ŋku ɖe asisiwo ƒe asitsatsa ƒe dɔwɔna si ŋu wokpɔ ta na ŋu abe veviedodonu ƒe ɖoɖo siawo siwo wodo ɖe ŋgɔ ƒe akpa aɖe ene.*

### Ale si nàwɔ ake ɖe wò nukpɔkpɔ ƒe safuia ŋu

#### zcashd

* Ŋlɔ adrɛs siwo katã nènya to *./zcash-cli listaaddresses* zazã me.

* Emegbe na sedede si gbɔna na UA alo Sapling ƒe adrɛs siwo wotsɔ akpoxɔnu wɔe

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet ƒe ŋkɔ

* Le ɖusime ƒe dzogoe si le etame la, tia "Backup", Ðo kpe wò fon dzi, emegbe ɖeko nàwɔ wò nukpɔkpɔ ƒe safui si woaɖe afia la ƒe kɔpi.

### Ale si nàzã wò nukpɔkpɔ ƒe safuia

#### zcashd

* Zã nusiwo gbɔna kple vkey alo ukey ɖesiaɖe: 

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### ywallet ƒe ŋkɔ

* Le ɖusime ƒe dzogoe si le etame la, tia "Akɔnta", zi "+" dzi le ete ɖusime be nàtsɔ wò nukpɔkpɔ ƒe safuia akpe ɖe eŋu eye nàtsɔe ade eme be nàtsɔ wò ‘nuxexlẽ ɖeɖeko’ akɔnta akpe ɖe eŋu.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com ƒe nyatakakadzraɖoƒea

* Ðeko nàfia asi wò web-browser la ɖe [afisia](https://zcashblockexplorer.com/vk) eye nàlala emetsonuwo! de dzesii: emetsonu sia le zcashblockexplorer node dzi fifia eye ale nèle kakam ɖe info sia dzi kple zcashblockexplorer.com tɔ

### Nunɔamesiwo

Togbɔ be mɔ̃ɖaŋununya gã aɖee wònye hã la, wokafui be nàzã nukpɔkpɔ ƒe safuiwo le alesi wòhiã nu.

Kpɔ nufiame sia le safuiwo kpɔkpɔ ŋu. Nusiwo woatsɔ awɔ dɔ tso nyatia ŋu ƒe xexlẽdzesiwo le ete ne èdi be yeaƒu tsi ayi ŋgɔe:

- [ECC, Nukpɔkpɔ ƒe Safuiwo me ɖeɖe](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Nyaɖeɖefia Tiatia kple Nukpɔkpɔ ƒe Safuiwo](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310 ƒe xexlẽdzesi](https://zips.z.cash/zip-0310)
