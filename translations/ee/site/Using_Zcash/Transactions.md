<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nuwɔnawo

ZEC is a widely-used digital asset for payments, offering strong privacy features that make it suitable for various transactions like paying friends, making purchases, or donating. To maximize privacy and security, it is essential to understand how different types of transactions work within Zcash.

## TL;DR

- Zcash doa alɔ nuwɔwɔ ƒomevi eve: **shielded**, si nana be nyatakakawo nɔa ame ɖokui ŋu eye **transparent**, siwo léa wo ɖi le gaglãgbe.
- Adrɛs siwo ŋu wotrɔ asi le la dzea egɔme kple: `u` or `z`Adrɛs siwo me kɔna nyuie la dzea egɔme kple . `t` eye wòwɔa nu abe Bitcoin ƒe adrɛs ene.
- Wòe atia fe sia fe si nàxe. Ameɖokui ta kpɔkpɔ nye tiatia aɖe si Zcash na wò, menye ɖoɖowɔɖi si ame bubu ate ŋu awɔ ɖe dziwò o.
- Ne ga siwo nèxɔna le asitsatsa aɖe me la nyea nu si ŋu amewo megatea ŋu dea ha kplii o. Eya ta ne ame aɖewo gblɔ be yewomate ŋu awɔ naneke tso eŋu o hã, ele vevie ŋutɔ be wò ŋutɔ nàkpɔ wo dzi nyuie hafi woaɖo ŋuwò.
- Fewo [ZIP 317]](https://zips.z.cash/zip-0317) Ga si woɖena ɖe gaƒleƒewo la ate ŋu ana woƒe dɔwɔnawo natsi megbe.

## Nuwɔna Siwo Wotsɔna Kpena Ðe Ame Ŋu

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen (Kpɔ̃ Kɔkɔ)
    loading="lazy"
  />
</div>

---

Shielded transactions occur when you move ZEC into your shielded wallet. Your shielded wallet address starts with a U or Z. When sending shielded transactions, you're ensuring that you, and the people you're transacting with, are keeping a level of privacy not possible on other P2P payment networks. Sending a shielded transaction is very easy, you just have to make sure of two things. The first is that you're using the right wallet type. The easiest way to ensure that you're using the right type of wallet is by downloading a [wallet](https://zechub.wiki/wallets). The second important thing is moving ZEC to a shielded wallet. When withdrawing ZEC from an exchange, you need to know whether the exchange supports shielded or transparent withdrawals. If they support shielded withdrawals, you can simply withdraw ZEC to your shielded address. If the exchange only supports transparent withdrawals, then you need to use YWallet and autoshield your ZEC once received. Using only shielded transactions to send and receive funds is the best way maintain privacy and reduce the risk of leaking data

## Nuwɔna Siwo Me Dzadzɛ Le

Transparent transactions work similarly but lack privacy protections, making transaction details publicly visible on the blockchain. Transparent transactions should be avoided when privacy is a priority. Note: Transparent wallets may encounter issues due to ZIP-317, which requires fees proportional to transaction complexity. Default fees may lead to rejection or delays, making fee customization crucial.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen (Kpɔ̃ Kɔkɔ)
    loading="lazy"
  />
</div>

## Mɔ Kpui Aɖe Si Dzi Nàto Adze Eŋu Kpɔe Le Susu Me

Nu si wowɔna le gaglãgbe la nyea lɛta aɖe. Lɛtatɔ lae tsɔnɛ vana, gake ame sia ame si tsɔ agbalẽawo ɖe asi va yina ate ŋu axlẽe ahakpɔ amesi ɖoe ɖa kple esi xɔe.

Nu si wotsɔna wɔa adzame nye agbalẽvi siwo nu wodzraa ɖo. Adzakatsaƒea gakpɔtɔ ɖoa kpe edzi be lɛta ŋutɔŋutɔ kple eƒe nudɔdrɔ̃ sɔ eye ame aɖeke mate ŋu atsɔ aʋatɔgbalẽ alo aɖo lɛta ɖeka ma ke ɖa zi eve o. Nya siwo le agbalẽvia me la nɔa amesi ŋlɔe kple amesi xɔe dome.

Nu si le vevie enye be Zcash na nète ŋu tia esi nàɖo ɖa, fe ɖe sia ɖe kple etɔ.

## Fewo Dzi Kpɔkpɔ le Nuwɔna Siwo Me Dzadzɛ Le Ta

ZIP-317 Mɔfiame: Fewo ƒe ɖoɖo nɔa tɔtrɔm ɖe nuwɔwɔ siwo sesẽ ŋu, si bia be woawɔ asitɔtrɔ le fe siawo ŋu wòagbɔ 0.00001 ZEC la dzi.
Kpɔɖeŋu: Woate ŋu abia be woaxe ZEC 0.0001 ɖe ga si wotsɔ wɔ dɔe le nu ɖeka aɖe me ta, eye woagatsɔ gaa dzi asii anɔ abe ZEC 0,00005 ene na ga bubu ɖesiaɖe.

Gadzraɖoƒleƒe ƒe Fewo le Gaɖaka me

Trust Wallet: Ʋu nuɖoanyiwo to asiɖeɖe ɖe gear icon dzi ne èle asitsatsa wɔm. Ɖo Miner Tip Gwei kple Max Fee Gwei me nyuie be nàƒo asa na asitsatsotso ƒe kpododonu. Trust Wallets xɔa internet fe ko.
Coinomi Wallet: Ena nu etɔ̃ siwo woɖona be woaxe fe na ame la le esi wole sue, wonɔa anyi ɖaa kple gã ta. Ne èdi be yeawɔ tɔtrɔ aɖewoe la tia Custom on supported coins alo zã Change Fee si dze le dziƒonuwo ƒe dzogoe ɖusime. Edzena nyuie ne mènya ale si tututu yeaɖe ga ɖa o eye nèzãa Fefe ɖe bajt alo kilobit ɖeka me tsɔ ɖoa kpe edzii.

## Vodada Siwo Dzɔna Zi Geɖe La

- **Ne míebui be gaɖaka ɖe sia ɖe si le ZEC dzi ate ŋu aɖoe ɖa ame bubuwo ko.** Gaƒokplo siwo me wozãa gaku vovovowo le la dometɔ geɖe doa alɔ nuŋɔŋlɔdzesi aɖe si nye Zcash ƒe akpa si dze gaglã. Kpɔ gaɖakaa ƒe ƒuƒoƒowo ne nàdi be yeakpɔ eƒe nya ɣaɣlawo ta hafi wòazã wo o. [Gaƒoƒewo]](https://zechub.wiki/using-zcash/wallets) axa sia gblɔa esiawo na tiatia ɖesiaɖe.
- **Axɔ ɖe adrɛs si dzi nu sia nu le la me eye nàgblẽ ga siwo nèɖo ɖi.** Ame aɖeke mate ŋu akpɔ nudzɔdzɔawo o, eya ta ne ame aɖe va tso teƒe ma emegbe hã ate ŋu anɔ eŋu. Ne wokpɔe be yewokpɔ gaa ko la, woagblẽ eƒe akpa aɖewo nɛ.
- **Treating privacy as something you turn on once.** Each transaction is a separate choice. Sending shielded today does not undo a transparent payment you made last week.
- **Alesi woagbugbɔ azã adrɛs si me nuwo katã le la zazã.** Esi wònye be wokpɔa nu siwo wowɔna to edzi ɣesiaɣi ta la, address ɖeka aɖe ko zãm wole tsɔ dea kadodo gaxeɖetawo dome vivivi evɔ susu aɖeke meli si tae wòle be woawɔ esia o.
- ** Woɖo ame ɖe ga si woxɔ xoxo.** Gavi siwo mexe ZIP 317 ƒe ɖoɖowo o la ate ŋu agblẽe be woaɖo dɔ aɖe teƒe, eye esia ana womagate ŋu aɖo asi le eŋu hafi.

## De dzesii:

Míeɖe kuku de dzesii be mɔnu si le dedie wu na ZEC zazã enye asitsatsa siwo ŋu wotrɔ asi le ko ŋudɔwɔwɔ. Gaxɔ aɖewo le [dzesi ɖekaɖekawo] zãm fifia](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20nye,%20le%20ƒonuwo me. Zcash%20ecosystem.) si naa mɔnu amesiwo zãa asitelefon kple gaɖɔɖoƒewo be woazã adrɛs siwo dzi woate ŋu akpɔ nu ato eye esiwo le dedie hã ɖekae.

## Ganyawo ƒe Kpekpeɖeŋu

[Adzesi siwo le ʋu me]](https://zips.z.cash/)

## Axawo Siwo Do Ka Kple Wo Nɔewo

- [Gbɔdzigbalẽvi siwo le ga me]](/using-zcash/wallets)  ga si woɖena ɖe akplo dzi, eye esiwo me wodzona le gota ko la.
- [Tsiƒedɔwo le Tsiɖɔɖuwo me]](/using-zcash/shielded-pools)  Sapling kple Orchard, tsi siwo me miaƒe ga si le dedie la nɔna.
- [Nɔnɔmetatawo]](/using-zcash/memos)  nyatakaka siwo ŋu wotrɔ asi le si woate ŋu azã kple nuŋɔŋlɔwo atsɔ akpɔ wo ta la me nyawo.
- [Adzesi Siwo Wozãna Le Mɔ̃ɖoɖo Me si Dzi Nuteƒewɔwɔ le]](/using-zcash/transparent-exchange-addresses)  TEX adrɛswo kple nusitae asitsatsaƒewo zãa wo ɖo
- [Gakpɔla ƒe Tɔtrɔdzraɖo]](/using-zcash/custodial-exchanges)  gadzraɖoƒe siwo doa alɔ ga si woɖea le adzame to mɔ aɖe dzi la ƒe ŋkɔwo.

## ZEC yi ZAT Gbedola
