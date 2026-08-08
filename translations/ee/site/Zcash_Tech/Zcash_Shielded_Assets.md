
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash-Dɔ Siwo Woɣla Ðe Ame Ŋu

## TL;DR

Zcash Shielded Assets (ZSA) nye ɖoɖowɔɖi si woɖo be woana ga siwo mele ZEC me o, abe stablecoins alo nu bubu ɖe sia ɖe ƒomevi ene nanɔ zcash ƒe asime le eƒe akpa dzi. Ame si ɖo eŋu kple ame si xɔe kpakple woƒe homea katã anɔ ɣaɣla ɖaa.

- **Nukae wònye:** Eʋeawo ƒe akpa si le abe ERC-20 ene, gake woxɔa asi na wo to mɔ̃ dzi.
- Amekae le etutu dzi? [QEDIT](https://qed-it.com/), si le Zcash Foundation ƒe gakpekpeɖeŋu te, kple Electric Coin Company.
- ** Ale si woatsɔe ade dzesi:** [ZIP 226](https://zips.z.cash/zip-0226) (woaɖɔe ɖo eye woatɔ dzoe) kple [ZIP 227] ɖekae.](https://zips.z.cash/zip-0227) (nuwo ƒe dodo).
- ** Nɔnɔme:** menyea agbe le internet dzi o. Woɖo ɖoɖo be woazã ZSA ƒe protocol la na Network Upgrade 7 (NU7).
- ** Fewo:** woxena le ZEC me ɣesiaɣi, eɖanye nusi dzi wole asi trɔm ɖo o.

---

## Nya Vevi Siwo Woɖe Fia

Zcash Shielded Assets (ZSA) nye ɖoɖo si wowɔ be woatsɔ ana ame ƒe asitsatsawo nanɔ dzadzraɖoɖi, atsɔe ayi na amewo eye woazãe le nu siwo wotsɔna wɔa dɔe la me.

Ne ènya [ERC-20] la, ke na míagblɔe wòade dzi ƒo na wò.](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token standard on the Ethereum blockchain, ZSAs are to Zcash as ERC-20 tokens are to Ethereum.

Zcash Shielded Assets ana be woate ŋu awɔ tokens siwo le ame ŋutɔ tɔ dzi ɖe zcash blockchain la me, si awɔe be woazã token bubuwo tsɔ wu [ZEC] ƒe dɔdeasiwo.](/guides/using-zec-privately) be woazã nu siwo wowɔna le Zcash ƒe kɔmpiuta dzi atsɔ akpɔ egbɔ be ame aɖeke magblɔ ŋkɔ na yewo o.

A major potential use of ZSAs would be to issue stablecoins on the Zcash protocol. Stablecoins are cryptocurrencies that peg their value to a fiat currency, such as the US Dollar or Euro. Currently, some of the most widely circulated stablecoins are ERC-20 tokens such as [USDC](https://www.circle.com/en/usdc) kple [Dai](https://docs.makerdao.com/).

ZSA ƒe dɔwɔna bubu enye be woade dziɖuɖumɔnuwo asi na ame bubuwo. Le kpɔɖeŋu me, Zechub (xexea si ta wiki sia) nye Decentralized Autonomous Organization (DAO), eye ate ŋu awɔ nu ahaɖo ZSA aɖe ɖe eƒe hameviwo hena akɔdada le ɖoɖo kple dziɖuɖu ŋuti nyametsotsowo ŋu.

[QEDIT] le ZSAwo wɔm.](https://qed-it.com/), le [Zcash Foundation ƒe] gakpekpeɖeŋu gã aɖe si wona la te.](/zcash-organizations/zcash-foundation) le nuwɔwɔ aduadu kple [Electric Coin Company] me.](/zcash-organizations/electric-coin-company)Esi wònye be wole dɔ sia wɔm vevie ta la, wotaa nyatakaka yeyewo ɖe [nuƒo si le afii] dzi.](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) [ZSA ƒe dɔmenyobiagbalẽvi] la le Zcash Forum.](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) le QEDIT ƒe nyatakakadzraɖoƒe si nye Zcash Foundation grants website.

---

## Ŋutega / Nuŋububu

### Ametaku si nu womi ɖo la me nyawo.

Kpɔe ɖa le susu me be Zcash ƒe ga si wotsɔ xe mɔ na la nye ameflɔnu aɖe, eye ame sia ame ate ŋu akpɔe. Ame aɖeke mate ŋu anya amesi ɖo agbalẽa ɖe amewo o; wo dometɔ ɖeka hã mete ŋu nya nusi tututu woŋlɔ ɖe eme o  . Amefluawo katã sɔ kple nɔvia tɔ pɛpɛpɛ.

Egbea la, nu ɖeka koe le agbalẽkotoku si dzi Zcash ƒe nyatakakadzraɖoƒea nɔna me: enyea ZEC.

ZSA metrɔa nu le ameflɔgba me o. Etrɔa nusi woɖe mɔ na la ɖe eme.* Le ZSA megbe, agbalẽkpo ma ke si wotre enu ate ŋu atsɔ stablecoin alo DAO ƒe dziɖuɖu ŋuti dzesi aɖe loo alo dɔwɔha ƒe nuteƒewɔwɔ teƒe  eye ne wokpɔe tso gota ko la egale abe ame bubu ɖesiaɖe tɔ ene le kadodoa dzi.

Nu vevi aɖe li si ŋu wòle be nàlé ŋku ɖo: ** Woxea fe ɖe nu siwo le lɛtakotoku me la ta ɣesiaɣi kple ZEC**.

### Nusi ame si le gota ate ŋu akpɔ la

Amesi le ŋku lém ɖe eŋu ate ŋu akpɔ... ERC-20 si le Ethereum dzi, ZSA si le Zcash.
| --- | --- | --- |
Amesi ɖoe ɖa. Xexlẽme si le amewo dome taʋiʋli me.
Amesiwo xɔe. Amehabɔbɔwo ƒe Akpoxɔnu.
▪ Ale si wotrɔa nuwoe. ● Ame sia ame nya nu tso eŋu. □ Wotsɔ wo ɣla ɖe amewo ŋu.
Ame ɖekaɖekawo ƒe ga home. Dukɔwo tɔe. Woƒe akpa dzi koe wodzrana ɖo.
▪ Nudzraɖo si wotsɔna naa ame la katã le Dukɔa me. ● Amewo ƒoa wo ɖokui ɖe emee.*
ETH ZEC Gadzraɖoƒe ƒe ga si woxe ɖe fe la me.

### Nukata nuƒledzedzesi la menye vodada o?

Afisi ZSA ƒe dɔdeasiwo va dzena le enye kplɔ̃a ƒe axa eve siwo le ete.

ZIP 227 deliberately keeps **issuance transparent**, so that the circulating supply of every asset can be tracked on-chain. Individual holdings and individual payments stay private; the total number of tokens in existence does not.

Le stablecoin-dɔwɔƒe gome la, nu vevi si le ɖekawɔwɔ sia mee nye be woate ŋu adzra ga siwo woadzra ɖo ɖe eŋu dzi akpɔe ne wokpɔa mɔ na amewo ƒe numekukuwo. Ke hã ame siwo zãna token siawo ya dzraa woƒe ganyawo kple fexeɖetawo me ke ɖi hena woawo ŋutɔwo ɖeɖe ko.

### Nunɔamesi ɖeka, amenyenye ɖekae li.

Nu sia nu si le asitelefon dzi la nyea eƒe ŋkɔ kple dzesi tɔxɛ, eye ame siwo ŋlɔe hã ate ŋu akpɔ mɔ be woagbugbɔ adzrae o. Ame ɖesiaɖe ƒe asi anɔ etɔxɛ abe ale si ko wònɔna ne wole ga zãm ene; gake dɔtɔ ɖeka koe tea ŋu wɔa esia alo wòtea ŋu tsɔa agbalẽ bubuwo ɖoa nyatakakawo ɖe amewo gbɔ tsɔ ɖea gbeƒã woƒe nyawo na wo.

---

## Ƒu Tsi Kɔkɔe

### ZSA ƒe Demo le Zebra dzi

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Ðe demo la na ɖokuiwò!**

Kpe zcash-tx-tool ƒe nudzraɖoƒe: <https://github.com/QED-it/zcash_tx_tool>

### Zcash Dzadzraɖowɔɖoɖowo (ZIP)

- [ZIP 226](https://zips.z.cash/zip-0226): Zcash-Dɔ Siwo Dzi Woato Aɖe Mɔ Ðo Kple Etsɔtsɔe Dzo
- [ZIP 227](https://zips.z.cash/zip-0227): Zcash-Dɔ Siwo Dzi Woato Aɖe Mɔ Ðo La Dodo Ðe Go Me
- [ZIP 230](https://zips.z.cash/zip-0230): Version 6 Dzadzɛ ƒe Amesiamewɔwɔ

> **Nuka le ZIP 230 ŋu:** Wodzudzɔ ɖoɖo ɖe Zip 230 la ŋu eye womazãe o. Fifia, [ZIP 229] ye wotsɔ ɖɔ nuwɔwɔ ƒe gɔmeɖeɖe 6 ɖo fifia.](https://zips.z.cash/zip-0229)Kpɔ nyatakaka si le [ZIP 230 ƒe axa gbãtɔ] dzi.](https://zips.z.cash/zip-0230) axa.

ZIP 226 defines the OrchardZSA protocol — an extension of the Orchard protocol that carries the transfer and burn of custom assets. ZIP 227 defines how those assets are created in the first place, and must only be implemented alongside ZIP 226.

### ZSA ƒe Nunana Ŋuti Mɔɖegbalẽvi

[QEDIT] tsɔ ZSA ƒe ɖoɖo si nye Asset Shielded (ZSA/UDA) la ɖo anyi.](https://qed-it.com/) Woyɔa wo be User Defined Assets (UDA) alo Zcash Shielded Asset (ZSA).

Le ɖoɖo sia ta la, [QEDIT] ƒe ƒuƒoƒo si le dɔ wɔm kple dɔwɔƒe aɖe be yewoawɔ numekuku tso alesi nuwo wɔa va yinae ŋu.](https://qed-it.com/) Edzro be yewoatsɔ DeFi ade Zcash ƒe nutoa me eye le ɣeyiɣi ma ke me la, woana woawɔ nu kple ame ŋuti nyatakakawo ŋu dɔ nyuie wu. Le numekuku aɖe si wowɔ na ƒuƒoƒo sia me tɔwo ta la, wobia gbee heɖo eŋu nɛ be [generic shielded assets (ZSA/UDA) ye nye nɔnɔme siwo amewo dina vevie fifia](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Nya siawo wɔ ɖeka kple [Zcash Improvement Proposal (ZIP) ] ƒe aɖaŋuɖoɖowo.](https://zips.z.cash/zip-0000) Woɖe wo me le ZIP 226 kple ZIP 277 la me.

1. [ZIP 226](https://zips.z.cash/zip-0226): Zcash-Dɔ Siwo Dzi Woato Aɖe Mɔ Ðo Kple Etsɔtsɔe Dzo
2. [ZIP 227](https://zips.z.cash/zip-0227): Zcash-Dɔ Siwo Dzi Woato Aɖe Mɔ Ðo La Dodo Ðe Go Me

---

## Nusiwo Woate Ŋu Awɔ le Agbe Me

** Ne èle ZEC alo zãe**

- ZSAs are defined as an extension of Orchard ("OrchardZSA"), so they would share the shielded machinery ZEC already uses. Your wallet will need explicit ZSA support before it can hold or send them.
- Àhiã ZEC aɖewo ɣesiaɣi. Woxea fe ɖe ZSA ƒe tata kple etamenuwo ŋu le ZEC me, ke menye le nunɔamesi la ŋutɔ me o.
- Naneke metrɔ le wò ZEC ƒe dɔwɔna siwo li fifia la ŋu o.

**Ne ènye ame si ate ŋu ade ga asi na wò  stablecoin, DAO, alo dɔwɔƒe**

- Ne èdi be yeaɖe ga aɖe la, ele be nàna mɔɖeɖe ɖe eŋu le asitelefon dzi eye wòaku nu me kple eƒe safui si ana wòaɖee. Eya ta wò ɖeka koe ate ŋu awɔ dɔ alo atrɔ asi le ale si nèzãa gae ŋui la ŋuti.
- Woate ŋu adzro wò ga siwo le ƒoƒom la me, gake womakpɔa wo ŋuti nyatakakawo o. Le gadzraɖoƒe si dzi wowɔ ɖoɖo ɖo ta la, esiae nye nu vovovoawo ƒe ƒuƒoƒo tututu.
- Dɔwɔƒe ɖeka ƒe dɔwɔna ate ŋu ana woaɖo ga si wu ɖeka zi ɖeka.

**Na nutoa me tɔwo**

- Esi wònye be ZSA ƒe fe ɖesiaɖe nyea ZEC ta la, dɔwɔna ɖe kesinɔnu siwo ava le etsɔme si woadzra ɖo kple Zcash dzi hea didi va nɔa ZEC ŋutɔ ŋu.

---

## Vodada Siwo Dzɔna Zi Geɖe La

▪ Ame geɖe xɔe se be nya sia nye nyateƒe.
| --- | --- |
"ZSAwo le agbe egbea ɖe Zcash dzi". Womele nenema o. Woɖo ɖoɖo be woadze egɔme kple Network Upgrade 7 (NU7) eye wole eme dzrom hele dodokpɔ wɔm kokoko.
"ZSA tsɔ smart contracts va Zcash me". ZSA ɖɔa gawo ƒe dodo, wo tsɔtsɔ yi kple wo dzodzo. Menye ɖoɖowɔɖi si ŋu dɔ wowɔna le nu sia nu mee wònye o.
| "You can pay ZSA fees in the ZSA token itself." | Fees are paid in ZEC. |
"Ne woɣlae la, ele be nu siwo wotsɔna naa tokens hã nanɔ ɣaɣla". ZIP 227 na nuwo ƒe ɖoɖowo le gaglãgbe ale be woate ŋu akpɔ ga si wozãna ɖe nunɔamesi ɖesiaɖe ta. Gadzraɖoƒewo kple nudzɔdzɔwo nɔa ame sia ame gbɔ; gake womekpɔa woƒe numedzodzrowo dzi o.
"ZIP 230 nye nuwɔwɔ ƒe mɔnu si li fifia, le eƒe gɔmeɖeɖe 6 lia me". Woɖe ZIP 230 ɖa. Fifia la, woɖea egɔme ɖe Mɔnukpɔkpɔ 229 dzi.

---

## Axawo Siwo Do Ka Kple Wo Nɔewo

- [Halo](/zcash-tech/halo)  ɖoɖo si dzi woato awɔ numekuku le Orchard megbe, enye ZSA ƒe mɔfianuwo.
- [Zk-SNARKs](/zcash-tech/zk-snarks)  kpeɖodzi siwo me womenya naneke le o, si na wokpɔa nu sia ƒe dzɔdzɔmesewo dzi evɔ womeɖea wo ɖe go o la ŋu.
- [Tsiƒedɔwo le Tsiɖɔɖuwo me](/using-zcash/shielded-pools)  afisi ZSAwo anɔ agbe le hekpe ɖe ZEC ŋu.
- [Gadzraɖowɔƒewo](/using-zcash/transactions)  alesi wowɔa Zcash-gafewoe
- [Zebra ƒe Nuƒowo Katã](/zcash-tech/zebra-full-node)  nuwɔmɔnu si wozã le ZSA ƒe wɔwɔfia me la dzi.
