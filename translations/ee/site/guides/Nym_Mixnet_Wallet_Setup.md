<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edihttps://github.com/ZecHub/zechub/pull/2238t Page"/>
</a>

# Mɔ Zcash Gakotoku Ʋuʋu To Nym Mixnet

> Woɖo kpe edzi zi mamlɛtɔ: September 29, 2026

Zcash shielded transactions kpɔa asitsatsa ŋuti nyatakakawo ta le kɔsɔkɔsɔ me, gake gakotokuwo gakpɔtɔ ɖoa dze to internet dzi. Netwɔƒedzikpɔlawo ate ŋu asrɔ̃ metadata abe wò IP adrɛs, ɣeyiɣi si wò gakotokua do ka, kple xɔtuɖoɖo siwo wòdoa ka kplii ene.

Nym tsɔ network-privacy layer si le vovo kpe ɖe eŋu. Tso September 2026 me la, mɔnu nyuitɔ kekeake nɔ te ɖe gakotokua dzi:

1. **Tia gakotoku ƒe Nym ƒe ƒoƒo ɖekae si nye dzɔdzɔme tɔ ne ele anyi.**
2. Ne menye nenema o la, zã **system-level NymVPN Mixnet mode** ale be woatsɔ gakotokua ƒe network ʋuɖoɖo to Nym dzi evɔ manɔ te ɖe gakotokua ƒe teƒenɔla ƒe kpekpeɖeŋu koŋ dzi o.

Ne èdi VPN kple dVPN ƒe megbenyawo katã la, kpɔ [VPN & dVPN ƒe dɔwɔwɔ](./VPN_and_DVPN.md).

## Nusi Nym tsɔ kpe ɖe eŋu — kple nusi metsɔ kpe ɖe eŋu o

Zcash ƒe fexexe si wokpɔ ta na kple network ƒe adzamenyawo gbɔ kpɔkpɔ ƒe dɔwɔnu kpɔa kuxi vovovowo gbɔ:

- **Zcash shielded pools** kpɔa asitsatsa ŋuti nyatakakawo ta le kɔsɔkɔsɔ dzi.
- **Nym mixnet routing** nye esi wowɔ be wòaɖe kadodo si le wò network identity ŋutɔŋutɔ kple subɔsubɔdɔ si xɔa gakotoku ƒe ʋuɖoɖo dome dzi akpɔtɔ.
- Ele be teƒe si wodo ka kplii to NymVPN mɔ̃ si le ɖoɖo nu dzi nakpɔ Nym ƒe dodo tsɔ wu wò aƒe/asitelefon IP.

Nym ƒe mixnet zãa hop geɖewo, packet mixing, randomized delays, cover traffic, kple onion encryption tsɔ ɖea network-metadata leakage dzi kpɔtɔna.

Nym **mekpɔa ame ta** tso mɔ̃ si ŋu wogblẽ nu le, gakotoku ƒe kɔmpiutadziɖoɖo vɔ̃ɖi, nyagbe siwo woɖe ɖe go tsɔ gbugbɔa nu, amenyenye si nèɖena fiana to asitɔtrɔ ƒe akɔntabubuwo dzi, alo ameŋunyatakakawo ƒe bu si Zcash dɔwɔna si me kɔ ta.

## Native Nym ƒe kpekpeɖeŋu: zã esia gbã ne eli

Nym ɖe gbeƒã le September 24, 2026 dzi be yewoƒe Zcash Community Grant dɔa wu enu eye native mixnet support le ɖoɖom ɖe Zcash gakotoku ŋutɔŋutɔwo me.

### Zingo! Gakotoku

Zingo PC lɔ Nym ʋuɖoɖo si nye dukɔa me tɔ ɖe eme. Zingo Mobile hã ɖoa Mixnet Mode ɖe iOS kple Android dzi to Nym proxy si le dɔwɔnua me zazã me.

Fifia ƒe nuwɔna si ŋu Zingo:

- Nym dziɖuɖua le **Nɔnɔmewo → Nym Mixnet** te.
- Wotoa mixnet dzi ɖoa fetu ɖoɖo ɖa.
- Ironwood ƒe ʋuʋu ƒe kakawo zɔna ɖe mɔ si wokpɔ ta na si woɖona ɖa la ke dzi.
- Wotoa mixnet la dzi ɖoa ZEC asibiabia hã.
- Wotu dɔdɔa do kpo nu esime Nym le dɔ wɔm: ne mixnet ʋuɖoɖoa meli o la, womeɖoa fexexea ɖe ɖoɖoezizi me to clearnet dzi o.
- **Chain synchronization mele mɔ dzi to mixnet** dzi fifia le Zingo PC. Compact blocks, nullifier queries, transaction fetches, mempool traffic, kple server-health checks gakpɔtɔ zãa server ƒe kadodo si sɔ.

Vovototo ma le vevie: Zingo's dzɔdzɔme ɖekawɔwɔ kpɔa kadodo kɔkɔtɔ kekeake ƒe nyadzɔdzɔgblɔmɔ̃ ta, gake menye mɔ̃ blibo ƒe kadodomɔ̃ haɖe o.

Ne wò ŋɔdzidoname ƒe kpɔɖeŋu hã bia be nàɣla sync traffic tso server la gbɔ la, zã system-level privacy tunnel abe NymVPN ene tsɔ kpe ɖe latency kple complexity bubu si esia he vɛ gɔmesese ŋu.

Dzɔtsoƒewo:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym ka nya ta be **Zkool** doa alɔ kadodo kple Zcash RPC xɔtuɖoɖowo to Nym mixnet dzi azɔ to native toggle zazã me.

Zkool nye YWallet. Eƒe dɔa hã doa alɔ Tor proxying kple onion subɔsubɔdɔwo na Zcash server kadodowo.

Di Zkool's Nym ƒe tiatia si nye dzɔdzɔme tɔ wu agbagbadzedze be yeazi YWallet xoxo aɖe dzi to teƒenɔla ƒe mɔ si ŋu nuŋlɔɖi mele o dzi.

Dzɔtsoƒewo:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy ƒe ŋkɔ

NozyWallet hã si Nym-nya ʋuɖoɖomɔwo. Eƒe dɔwɔwɔ fifia doa alɔ mɔzɔzɔ ƒe asitsatsa si do go ƒe dɔdɔ to Nym mixnet dzi kple Nym dVPN mɔ si le vovo na compact-block synchronization. Bu esiawo abe ametakpɔnu vovovowo ene tsɔ wu be nàtsɔe be gakotoku ɖesiaɖe si wobia la zãa mixnet la le eɖokui si.

Dzɔtsoƒewo:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl fifia la, wotu **Tor Protection** ɖe eme, menye native Nym integration si ŋu míeƒo nu tsoe le etame na Zingo, Zkool, kple Nozy o.

Zodl ƒe Tor ƒe nɔnɔme ateŋu aɖo adzɔnuwo ɖoɖo ɖa, asitsatsa-nyatakakawo xɔxɔ, asitɔtrɔ ƒe asi ƒe biabiawo, kple ame etɔ̃lia ƒe API yɔyɔwo to Tor dzi. Nym gblɔ le September 24, 2026 dzi be yegakpɔtɔ le dze ɖom vevie kple Zodl ƒe ƒuƒoƒoa tso mixnet ƒe ƒoƒo ɖekae si keke ta wu ŋu.

Le Zodl egbea gome la, zã wo dometɔ ɖesiaɖe:

- Zodl ƒe Tor Takpɔkpɔ si woŋlɔ ɖi, alo
- system-level NymVPN ne wò taɖodzinue nye be yeaɖo gakotokua ƒe mɔ̃ ƒe ʋuɖoɖo le mɔ gbadza nu to Nym.

Mègatsɔe be Tor kple Nym nye ʋu siwo woate ŋu atrɔ ɖe wo nɔewo ŋu le gakotokua me le esi wo ame evea siaa nye ame ŋutɔ ƒe nyatakakawo ƒe kadodowo ta ko o.

Zodl Tor ƒe ɖoɖowo:

**Nu Geɖe → Nɔnɔme Deŋgɔwo → Beta: Tor Takpɔkpɔ → Wɔe → Dzra tɔtrɔwo ɖo**

Dzɔtsoƒewo:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Fallback: ɖoɖo-dzidzenu NymVPN

Esia nye Nym ƒe tiatia si sɔ wu elabena mehiã be gakotokua nase Nym-koŋ ƒe teƒenɔla ƒe ɖoɖowo gɔme o.

### 1. De NymVPN ɖe wò kɔmpiuta dzi

Wɔ NymVPN kɔpi tso Nym ƒe nyatakakadzraɖoƒe si dziɖuɖua ɖo alo fiase si dziɖuɖua da asi ɖo le mɔ̃ dzi ko:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN doa alɔ Android, iOS, Linux, Windows, kple macOS.

### 2. Tia Mixnet ƒe nɔnɔme

NymVPN ɖea **Fast mode**, 2-hop dVPN mɔ si wowɔ nyuie na latency si bɔbɔ wu, kple **Mixnet mode**, 5-hop mixnet mɔ si wowɔ nyuie wu na network-metadata takpɔkpɔ sesẽ wu la ɖe go. Le gakotoku ƒe dɔwɔna veviwo gome la, tia Mixnet nɔnɔme eye nàlala vaseɖe esime asisi la nagblɔ be woɖo kadodoa hafi nàʋu gakotokua alo agbugbɔe awɔ yeyee.

### 3. Gblẽ gakotokua ɖe network ƒe ɖoɖo siwo sɔ dzi

Ne dɔwɔɖoɖoa le ʋuwo ƒe ʋuʋu to NymVPN, gakotoku akpa gãtɔ mehiã na teƒenɔla ƒe ɖoɖo tɔxɛwo o.

Ʋu gakotokua le mɔ si sɔ nu eye nàna wòawɔ ɖeka.

Ne NymVPN ɖe mɔ̃memi si me mã ɖe go le wò mɔ̃ dzi la, ɖo kpe edzi be gakotokua **de mɔ̃ si wokpɔ ta na** me, ke menye ɖe wotsɔe de mɔ si to mɔ si to mɔ dzi alo esi woɖe le eme ƒe xexlẽdzesi me o.

### 4. Kpɔ mɔ̃a ɖa hafi nàzã gakotokua

Dɔwɔɖoɖo ƒe ɖoɖo ƒe dodokpɔ bɔbɔe aɖe:

1. Tsɔ NymVPN.
2. Yi dutoƒo IP-kpɔmɔ̃ dzi, alo le kɔmpiuta dzi duƒuƒu dzi:

   ```bash
   curl https://api.ipify.org
   ```

3. Ŋlɔ IP si wokpɔna la ɖi.
4. Do ka kple NymVPN le Mixnet nɔnɔme me.
5. Gbugbɔ wɔ dodokpɔa.

Ele be dutoƒo IP si wokpɔna la natrɔ.

Esia ɖo kpe ɖoɖoa ƒe mɔ̃a dzi. Meɖo kpe edzi **meɖo kpe** be biabia ɖesiaɖe si gakotoku aɖe koŋ wɔ la zɔna ɖe mɔ ɖeka dzi ne mɔfiameɖoɖo tɔxɛwo le app alo OS la si o.

Ne èdi kakaɖedzi bubuwo le kɔmpiuta dzi:

- tsɔ dɔwɔɖoɖoa ƒe network monitor lé ŋku ɖe gakotokua ƒe dɔwɔwɔ ŋu,
- kpɔe ɖa be split-tunnel ƒe vovototo aɖeke mele eme o hã,
- ɖo kpe gakotoku ƒe nuwɔna ƒe tɔtrɔ siwo wokpɔ mɔ na dzi ne woɖe NymVPN kadodoa ɖa.

Mègada screenshots siwo me gakotoku ƒe adrɛs, ga si susɔ, asitsatsa ƒe ID, IP adrɛs, alo nusiwo woatsɔ agbugbɔ awɔe la ɖe afima esime nèle kuxiwo gbɔ kpɔm o.

## NymVPN dApp / gakotoku teƒenɔla ƒe nɔnɔme

NymVPN hã ɖea app-kple-gakotoku teƒenɔla ƒe nɔnɔme ɖe go to SOCKS5 / RPC mɔfiame to mixnet dzi zazã me.

Nym ƒe dutoƒo ɖoɖowɔwɔ ŋuti nuŋlɔɖiwo ɖe esia fia vevietɔ kple Ethereum-style RPC ɖoɖowɔwɔ. Eɖea vi na kɔmpiutadziɖoɖo siwo doa alɔ generic proxy/RPC mɔ si sɔ tẽ, gake mele be **mele** be woatsɔe be ewɔa dɔ kple Zcash gakotoku ɖesiaɖe o.

Ne gakotokua ŋutɔ ƒe nuŋlɔɖiwo ɖo kpe proxy alo RPC ƒe kpekpeɖeŋu si sɔ dzi ko hafi nàzã mɔ sia.

Ne menye nenema o la, ke boŋ:

- gakotokua ƒe Nym ƒe ƒoƒo ɖekae, alo
- ɖoɖo-dzidzenu NymVPN.

## Dɔwɔwɔ kple ɣeyiɣi ƒe nuwuwu ƒe asitsatsa

Mixnets ɖoe koŋ dzraa duƒuƒu hena metadata takpɔkpɔ sesẽ wu.

Kpɔ mɔ na ŋusẽ si wòate ŋu akpɔ ɖe:

- gakotoku ƒe wɔwɔ ɖekae le gɔmedzedzea me,
- catch-up sync gãwo,
- asitsatsa-ŋutinya ƒe nyabiasewo,
- RPC ƒe ɣeyiɣi ƒe nuwuwu,
- ame etɔ̃lia ƒe API yɔyɔwo.

Mɔfiame nyuiwo:

- Dze egɔme kple Nym ƒe ɖoɖo gbãtɔwo.
- Kpɔ mɔ be gbãtɔ sync alo long catch-up sync axɔ ɣeyiɣi didi wu.
- Gbugbɔ te ɣeyiɣi aɖe ƒe nuwuwu kpɔ hafi nàgbɔdzɔ ameŋunyatakakawo ƒe ɖoɖowo.
- Ƒo asa na ameŋunyatakakawo takpɔkpɔ ƒe mɔnuwo tɔtrɔ enuenu enumake hafi nàwɔ asitsatsa vevi aɖe.
- Ne èzã mɔ si zɔna kabakaba wu hena bulk sync la, se egɔme be xɔtuɖoɖo siwo ŋu nèka ɖo ate ŋu alé ŋku ɖe wò network ƒe dzesidenu ŋutɔŋutɔ ŋu le ɣeyiɣi ma me.
- Le Zingo PC koŋ gome la, ɖo ŋku edzi be eƒe Nym ʋuɖoɖo si nye dzɔdzɔme tɔ la kpɔa seds kple asixɔxɔ didi ta fifia, esime synchronization gakpɔtɔ le tẽ.

## Asitelefon dzi nusiwo ŋu woabu

Le Android kple iOS dzi la, zi geɖe la, dɔwɔɖoɖo ƒe VPN ʋɔtruae nyea mɔ bɔbɔetɔ kekeake si dzi woato aɖo gakotoku ƒe ʋuɖoɖo le xexeame katã to NymVPN: do ka kple NymVPN gbã, emegbe nàʋu gakotokua.

Ne VPN, dzodoƒe, alo boblododo mɔxenu bubu si wotu ɖe VPN dzi le teƒea xɔ ɖoɖoa ƒe VPN ƒe ŋgɔdonya xoxo la, ɖewohĩ adzɔnu eveawo mate ŋu awɔ dɔ le ɣeyiɣi ɖeka me o. Kpɔ dɔwɔɖoɖoa ƒe VPN nɔnɔme dzi hafi nàtsɔe be wokpɔ gakotokua ta.

## Afɔku ƒe kpɔɖeŋu ƒe ɖaseɖigbalẽ

Hafi nàɖo ŋu ɖe ɖoɖoa ŋu la, bia be:

- Ðe mele Zcash adrɛs siwo ŋu wokpɔ ta na zãm le afisi wòsɔa?
- Ðe native Nym support le nye gakotokua mea?
- Ne nenemae la, ke ʋuɖoɖo ka tututue native integration ma kpɔa ta na?
- Ne mehiã na kpekpeɖeŋu si keke ta wu la, ɖe NymVPN do ƒome hafi gakotokua dze network dɔwɔna gɔmea?
- Ðe se si nye be woama mɔ̃a me ɖe gakotokua ɖaa?
- Ðe mele ŋu ɖom ɖe proxy mode si gakotokua ŋlɔna ŋutɔŋutɔ ŋua?
- Ðe mele dzesideŋkɔwo ƒom to asitɔtrɔ, web-browser ƒe ɣeyiɣi, ame etɔ̃lia ƒe API, alo adrɛs si me kɔ dzia?
- Ðe medzra ɖo ɖe sync blewu kple ɣeyiɣi ƒe nuwuwu ɣeaɖewoɣi ŋua?

## Dzɔtsoƒewo

- Nym: Nym mixnet le Zcash gakotokuwo me fifia, September 24, 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Zingo PC Nym ƒe nuwɔna: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Zingo Mobile Nym ƒe ʋuɖoɖo: https://github.com/zingolabs/zingo-mobile
- Zkool nudzraɖoƒe: https://github.com/hhanh00/zkool2
- NozyWallet Nym ʋuɖoɖodɔ: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12 ƒe ƒuƒoƒo: https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor Takpɔkpɔ: https://support.zodl.com/article/17-enabling-tor-protection
