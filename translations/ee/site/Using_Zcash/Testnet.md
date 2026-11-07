# Zcash Testnet

## Nu Ka Zcash Testnet Nye?

**Zcash Testnet** nye gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] si le enu ɖokpe na Zcash ƒe main network (Mainnet) vavã, eye wòle protocol, sewo, kple gaɖoɖo ƒe mɔnu tututua dom - ke esi vovototo vevi eve le eme:

1. **Gaƒeviwo mekpɔ ga vavã ƒe asi o** - woƒe ŋkɔe nye **TAZ**, menye ZEC o, eye woɖe wo na dodokpɔ ko.  
2. **Mɔ̃ ƒe sewo trɔtrɔ [network upgrades], dɔwɔnu [tools], kple software** wɔa woƒe dodokpɔ le afisia gbã hafi woatsɔ wo aɖo Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu.  

Le nya bubu me la, Testnet le abe **afi si wòate ŋu adzro nu le eye wòawɔ dodokpɔ le** ene, afi si mɔ̃ ƒe ɖoɖoŋlɔlawo [developers], wo siwo kpɔa wo dom, kple amedzilawo ate ŋu ado akpatawo kpɔ le ga vavã ƒe dzɔdzɔ mekpɔ wo o.


## Nu Ka Ta Wòwɔ Testnet?

Testnet le vevie na gaɖoɖowo ƒuƒoƒo ƒe ɖoɖo elabena **gaɖoɖowo ƒuƒoƒo vavãwo abe Zcash ene metea ŋu atrɔ o** - ne woɖo gaɖoɖowo kplikpaa le main network dzi la, mate ŋu woatrɔ wo o. Testnet naa **nɔnɔme dedie ƒe kpɔɖeŋu** be woanɔ nu dzrom, awɔ dodokpɔ, eye woawɔ features ƒe bugfix hafi woaɖo wo ɖe Mainnet dzi.

### Testnet ƒe Zã Nyawo

#### 1. Software Ɖoɖo kple Ƒoƒoƒo

Mɔ̃ ƒe ɖoɖoŋlɔlawo siwo le gakotokuwɔwɔ, gatrɔƒewo, nukuku ƒe software, alo ɣaɣla ƒe dɔwɔnu wɔm la ate ŋu awɔ woƒe dodokpɔ le Testnet dzi dedie. Nu siwo woate ŋu awɔe nye:

- Gaɖoɖowo ƒe ɖo kple xɔxɔ  
- Gaɖoɖowo ƒuƒoƒe yeyewo ƒe nukuku kple TAZ si mekpɔ ga ƒe asi o  
- Zãla ƒe interface kple APIwo ƒe tutu  
- Gaɖoɖo ƒe ɣaɣla ƒe features ƒe dodokpɔ (nuwo ƒe ʋuʋuɖi vs ɣaɣla)  

**Kpɔɖeŋu:**  
Dɔwɔnu abe [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) ene zãa Testnet tsɔ wɔa gaɖoɖowo eye wòdoa Zcash ɣaɣla ƒe asset ƒe dɔwɔwɔwo kpɔ.  

**Nɔnɔme si dzɔa le agbe me:**  
Gakotoku ƒe mɔ̃ ƒe ɖoɖoŋlɔla ate ŋu aƒo software ɖe Testnet RPC endpoint dzi eye wòawɔ gaɖoɖo ƒe mɔzɔzɔ bliboa ƒe kpɔɖeŋu - gaɖoƒe ƒe dzesiwo wɔwɔ, ɣaɣla gaɖoɖowo ɖoɖo, kple balancewo ƒe kɔkɔe kpɔkpɔ - hafi wòadze dɔ le Mainnet dzi.

#### 2. Mɔ̃ Ƒe Sewo Trɔtrɔ ƒe Dodokpɔ

Zcash trɔa eƒe protocol ƒe se vevitɔwo ɣeaɣi (le kpɔɖeŋu me, NU6.1, NU6.2 kple Ironwood). Testnet wɔa mɔ̃ ƒe sewo trɔtrɔ yeye **hafi Mainnet**, si naa mɔ̃ ƒe ɖoɖoŋlɔlawo kple hadomea mɔ be woakpɔ bugs eye woawɔ woƒe bugfix.

**Kpɔɖeŋu:**  
Woɖea gbegbɔgblɔ ɖi [consensus] ƒe se yeye alo gaɖoɖo ƒe ƒomevi yeye ɖe Testnet dzi gbã. Ne dodokpɔa dzi edze la, wòdzena dɔ le Mainnet dzi le gaɖoɖowo ƒuƒoƒe ƒe kɔkɔe si woɖo ɖi da ɖo.

#### 3. Ɣaɣla Dzesi Ŋɔŋlɔ Ƒe Dɔwɔwɔwo Ƒe Dodokpɔ

Zcash ƒe ɣaɣla dzesi ŋɔŋlɔ si woɖea kpekpeɖeŋu nae nye **Zebra** (ɣaɣla dzesi ŋɔŋlɔ si wotu tso Rust me, eye Zcash Foundation lea eŋu) eye gakotoku si woɖea kpekpeɖeŋu nae nye [Zallet](https://github.com/zcash/zallet). `zcashd`, ɣaɣla dzesi ŋɔŋlɔ ƒe dɔwɔwɔ gãtɔ, va ɖo eƒe kpekpeɖeŋu ƒe nuwuwu si wòtsɔ ɖokpe le 18 July 2026, eye woŋlɔa eŋu azɔ o - kpɔ [zcashd si yina ɖe Zebra kple Zallet ƒe migration guide](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet). Testnet naa mɔ be woado ɣaɣla dzesi ŋɔŋlɔwo kpɔ le nɔnɔme vavã me, esi ga ƒe afɔku mele o.

Ɣaɣla dzesi ŋɔŋlɔ ƒe mɔ̃ ƒe ɖoɖoŋlɔlawo ate ŋu:

- Akpɔ gaɖoɖowo ƒuƒoƒe ƒe yiyiyi ƒe kɔkɔe  
- Adɔ RPC interfacewo kpɔ  
- Akpɔ ɣaɣla dzesi ŋɔŋlɔ ƒe nɔnɔme ne dɔ geɖe le edzi  
- Adɔ nukuku ƒe software ƒe kadodo kpɔ  

#### 4. Nusɔsrɔ̃ kple Nufiafia

Amedzilawo ate ŋu asrɔ̃ Zcash ƒe features abe nukuku, ɣaɣla gaɖoɖowo ƒe wɔwɔ, kple Unified Addresses ƒe zãzã ene.  
Hadomea ƒe tutorialwo kple documentation nana mɔ be woakpɔ **Testnet ƒe ga suewo nanaƒewo, explorerwo, kple mɔfiawo**.


## Testnet Ƒe Zã Nyawo Le Agbe Me

### 1. Mɔ̃ Ƒe Ɖoɖoŋlɔla Ƒe Dodokpɔ (Gakotoku / App)

- Ƒo ɖe Zcash Testnet dzi  
- Bia TAZ tso ga suewo nanaƒe me  
- Ɖo ɣaɣla gaɖoɖowo  
- Kpɔ ɣaɣla kple UI ƒe nɔnɔme ƒe kɔkɔe  

ZEC vavã aɖeke megbea o, togbɔ be vodadawo dzɔ hã.

### 2. Gatrɔƒe Ƒe Ƒoƒoƒo Ƒe Dodokpɔ

- Ɖu Testnet ɣaɣla dzesi ŋɔŋlɔ  
- Zã Zebrad JSON-RPC endpointwo tsɔ wɔ gaɖoɖowo  
- Dɔ automated deposit/withdrawal ƒe mɔnuwo kpɔ  

Esia wɔa production code dedie eye wòxɔa ga ƒe dzɔdzɔ ɖe te.

### 3. Nukuku Ƒe Ɖoɖoɖo Ƒe Dodokpɔwo

- Zã nukuku ƒe templatewo  
- Dɔ gaɖoɖowo ƒuƒoƒe ƒe kɔkɔe kpɔ  
- Kpɔ nukuku ƒe fetuwo (TAZ ko)  
- Ɖo nukuku ƒe dɔwɔwɔ nyuie  

Ena be dɔ ƒe tɔtrɔ alo fetu ƒe dzɔdzɔ megaɖe le Mainnet dzi yiyi me o.

### 4. Nusɔsrɔ̃ Ƒe Dɔwɔwɔ / Protocol Ƒe Nudzodzro

Nudzrɔ̃lawo ate ŋu adɔ innovationwo abe **stateless verification**, **zero-knowledge ɖaseɖigbalɛ ƒe nyuitɔwɔwɔ**, alo protocol ƒe dodokpɔ bubuwo kpɔ le Testnet zãzã me.  
Zãlawo siwo wɔnɔ ŋgɔ hã ate ŋu aɖu **Testnetwo alo regtest ƒe nɔnɔme si woɖo ɖe wo ŋutɔ ƒe hiãhiã nu** na dodokpɔ tɔxɛwo.


## Vovototo Veviwo Le Mainnet Kple Testnet Dome

| Feature               | Mainnet           | Testnet                  |
|-----------------------|-----------------|--------------------------|
| Gaƒeviwo ƒe asi       | ZEC vavã         | TAZ (ga ƒe asi mele o)  |
| Afɔku                 | Ga ƒe afɔku      | Dedie na dodokpɔ         |
| Protocol ƒe trɔtrɔwo  | Production       | Dɔwɔwɔ gbã               |
| Nukuku ƒe fetuwo      | Ga vavã ƒe ɖeɖe  | Dodokpɔ ƒe fetu ko       |
| Network ƒe zãzã       | Gaɖoɖowo vavã    | Dodokpɔ kple ɖoɖo        |

## Nufiafia Siwo Mesɔ O

- **Testnet gaƒeviwo kpɔ asi aɖe** -> Menye nyateƒe o, TAZ ƒe asi nye 0.  
- **Testnet gaƒeviwo ƒe dzɔdzɔ le vevie** -> Menye nyateƒe o, ga vavã aɖeke megbea o.  
- **Testnet kple Mainnet sɔ tututu** -> Menye nyateƒe o, Testnet trɔa gakegake eye woƒoa eƒe ga ƒe dedienɔnɔ ɖe gbe abe Mainnet ene o.

---

## Nu Ka TAZ Nye?

**TAZ** nye Zcash ƒe Testnet gaƒevi ƒe version:  

- Menye ga vavã o; mate ŋu woatrɔe na ZEC alo fiat o  
- Wozãe na dodokpɔ, ɖoɖo, kple nusɔsrɔ̃  
- Wòzɔna le Zcash ƒe sewo katã nu: woate ŋu aɖoe, akuke, eye woazãe le ɣaɣla gaɖoƒe ƒe dzesiwo me  

**Kpɔɖeŋu:**  
Mɔ̃ ƒe ɖoɖoŋlɔla ate ŋu aɖo 100 TAZ tso Testnet gaɖoƒe ƒe dzesi aɖe me ɖe bubu me, be wòadɔ gakotoku ƒe feature aɖe kpɔ, eye ZEC vavã aɖeke mage o.  

Bu TAZ abe **"fefe ga" na Zcash Testnet** ene.


## Nu Ka Ga Suewo Nanaƒewo Nye?

**Ga suewo nanaƒe** nye subɔsubɔ si nana TAZ gaƒeviwo fũ na dodokpɔ:

- Zi geɖe wònye websitewo alo APIwo  
- Zãlawo naa Testnet gaɖoƒe ƒe dzesi; ga suewo nanaƒea ɖoa TAZ sue aɖe ɖe eŋu  
- Wòxɔa TAZ nukuku le asi me ŋutɔ ƒe hiãhiã ɖe te  

**Kpɔɖeŋu:**  
1. Yi ɖe Testnet ga suewo nanaƒe aɖe dzi (le kpɔɖeŋu me, [fauzec.com](https://fauzec.com/) | [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz/))  
2. Ɖe wò Testnet gaɖoƒe ƒe dzesi  
3. Bia TAZ  
4. Xɔ TAZ enumake be nàdze dodokpɔ gɔme  

**Nu ka ta wòle vevie:**  
- Dodokpɔ dedie, esi ZEC ƒe afɔku mele o  
- Mɔ bɔbɔ na amedzilawo kple mɔ̃ ƒe ɖoɖoŋlɔlawo  
- Prototype ƒe wɔwɔ kabakaba na gakotokuwo, gatrɔƒewo, kple appwo  



## Zkool kple Zingo! Gakotokuwo

### Zkool

- Account geɖe ƒe gakotoku na Zcash ƒe zãlawo siwo wɔnɔ ŋgɔ  
- Wòkpe ɖe gadzraɖoɖi nyawo, nukpɔsafuiwo, nuwo ƒe ʋuʋuɖi kple ɣaɣla gaɖoƒe ƒe dzesiwo ŋu  
- Wòate ŋu aƒo ɖe Mainnet, Testnet, alo Regtest dzi to ɣaɣla dzesi ŋɔŋlɔ blibowo alo lightwallet serverwo dzi

### Zingo!

- Mobile gakotoku si tsɔe ɖe ɣaɣla kple bɔbɔe ŋu  
- Wòkpe ɖe ɣaɣla kple unified gaɖoƒe ƒe dzesiwo ŋu  
- Woɖe eƒe version yeye be wòakpe ɖe Testnet protocolwo ŋu (tsɔe kple NU6 Testnet)

## Testnet Ƒe Dɔwɔwɔ Le Gakotokuwo Me

### Zkool Gakotoku

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

**Aɖaŋuwo:**  
- Gakotoku la ate ŋu aga gɔme azɔ ne wòtrɔ networkwo  
- Mainnet ZEC ƒe accountwo menye be woatrɔ wo o  
- Zã Testnet lightwallet server ne woɖe kuku na wò

### Zingo! Gakotoku

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


Ne wòwɔe vɔ la, gakotokuwo ate ŋu aɖo kple axɔ TAZ, ado ɣaɣla gaɖoɖowo kpɔ, eye woawɔ dodokpɔ dedie.


## Le Testnet Ƒe Dɔwɔwɔ Megbe

- Gaɖoɖowo zɔna abe Mainnet ene, ke kple **TAZ si ƒe asi nye 0**  
- Woate ŋu adɔ ɣaɣla gaɖoɖowo, gaɖoƒe ƒe dzesi geɖe, kple ɣaɣla ƒe features kpɔ  
- Mɔ̃ ƒe ɖoɖoŋlɔlawo ate ŋu awɔ bugfix kple adɔ features kpɔ esi ZEC vavã ƒe afɔku mele o


## Nufiafia Kaba

- **Zcash Testnet** nye sandbox nɔnɔme dedie na tutu, dodokpɔ, kple nudzodzro  
- Zã nyawo nye: mɔ̃ ƒe ɖoɖoŋlɔla ƒe dodokpɔ, ɣaɣla dzesi ŋɔŋlɔ ƒe dodokpɔ, gatrɔƒe ƒe ƒoƒoƒo, nudzodzro, kple nusɔsrɔ̃  
- Wo zãa **TAZ gaƒeviwo** ɖe ZEC teƒe, eye woƒe asi vavã mele o  
- Testnet le vevie hafi woaɖo features wɔ dɔ vavã le Mainnet dzi
