<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash Nodes Lightwallet

## Utangulizi wa Kitabu cha Mwanzo

Watu wengi kutumia Zcash kupitia mkoba mwanga, ambayo haina download blockchain nzima. Badala yake anaongea na server kwamba tayari amefanya kazi hiyo. Ukurasa huu inaelezea nini wale servers ni, kile wanaweza kuona na hawawezi kuhusu wewe, jinsi ya kuelekeza uhusiano wako juu Tor, na jinsi ya kubadilisha seva yako mfuko hutumia.

vipande mbili vya programu kutumika mwanga pochi leo. ** lightwalletd** ni huduma ya awali, imeandikwa katika Go. ** Zaino ** ni mpya indexer iliyoandikwa katika kutu, kujengwa kama sehemu ya kazi zcashd deprecation.

## Nini mwanga mkoba server gani

Mwanga mkoba server anakaa kati ya mfuko wako na blockchain Zcash na inatoa bandwidth-ufanisi mtazamo wa mlolongo. Ni anafanya mambo matatu kwa ajili yenu.

Badala ya kuwa na vipande vya vitabu, inatuma fomu ndogo yenye habari tu inayohitajika ili kuchunguza malipo kwenye anwani yake iliyofichwa, kugundua matumizi ya noti zake, na kuwasilisha taarifa kwa mashahidi wake.

Wakati kutuma, mkoba wako mikono ya kumaliza shughuli kwa server ambayo matangazo yake kwenye mtandao.

Inajibu maswali ya mnyororo, kama vile urefu wa sasa na habari za ada ambayo mkoba wako unahitaji.

Pochi yako bado inafanya kazi ya kibinafsi ndani. Inaweka funguo zako, jaribio-kufuta vitalu kupata maelezo yako na kujenga na kusaini shughuli kwenye kifaa chako.

## Nini server unaweza na hawezi kuona

Hii ni sehemu ambayo ni rahisi kupata makosa. funguo yako kamwe kuondoka kifaa chako, lakini hiyo si sawa kama server kujifunza chochote kuhusu wewe.

rejea hapa ni ya [Zcash mkoba programu tishio mfano wa](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), which is worth reading in full if you care about this. It sets out several kinds of adversary. The one that matters for this page is an adversary who can watch traffic between your wallet and the internet, and between the server and the internet. Whoever runs the server is inherently in part of that position, because your wallet connects to them directly.

Start with what is protected. Against every adversary in the model, including one who has compromised the server, it "can't learn any of the user's cryptographic key material (spending keys, viewing keys, seed phrase, etc.)", cannot steal your funds, and cannot make you send funds you did not intend to send. The amounts and memos inside fully shielded transactions stay encrypted.

Kisha kuna kile ambacho si ulinzi. tishio mfano orodha hizi kama udhaifu inayojulikana dhidi ya trafiki-kuangalia adui:

Udhaifu. Jinsi gani?
|:--|:--|
"Mpinzani anajua anwani ya IP ya mtumiaji, ambayo inaweza kuwaongoza kwa utambulisho wa kweli wa mtumiaja".
Kuelezea karibu ambapo wewe ni kuangalia IP yako juu "katika database geolocation kukaribia eneo lao".
 Kuambia kwamba na wakati wewe alimtuma au kupokea shughuli ulinzi. Kutuma "inatumia bandwidth zaidi, ambayo ni inayoonekana hata kama uhusiano encrypted". Model inabainisha kuwa kitendo cha kutuma na kupokea ni kujulikana kwa server yenyewe
Kuhesabu ni shughuli ngapi ulizofanya kwa muda. Mifumo ileile ya upana wa bendi, ilionekana katika kipindi kirefu zaidi cha wakati.
Kuona mifumo ya malipo inayorudiwa. Kuchunguza wakati shughuli hutokea.
◯ Kujua kama anwani ni yako. Adui ambaye tayari anajua anwani "inaweza kutuma fedha kwa anwani hiyo na kuangalia kuona ikiwa kuna spikes bandwidth" kutoka mkoba wako kuchota yake.

Mfano pia anabainisha kuwa kesi ya kawaida inachukua "uhusiano wa uaminifu kati ya mtumiaji na lightwalletd server operator".

Kwa hiyo muhtasari wa uaminifu ni huu. Seva nyepesi ya mkoba haiwezi kutumia pesa zako, na haiwezi kusoma kiasi au kumbukumbu katika shughuli zako za ulinzi. Kinachowekwa vizuri kujifunza ni anwani yako ya IP na wakati wa shughuli yako, na hizo mbili pamoja zinaweza kusema mengi juu ya mtu. Shughuli zilizohifadhiwa zinalinda kile kinachoendelea kwenye blockchain. Hazifichi peke yake unganisho lako kwa seva.

## Kuelekeza juu ya Tor

Tor breaks kiungo kati ya anwani yako IP na mkoba wako trafiki, ambayo huondoa nguvu zaidi kitambulisho katika meza hapo juu.

Msaada ipo katika maktaba Rust kwamba wengi Zcash pochi kujenga juu ya. zcash_client_backend ni pamoja na moduli Tor kujengwa kwenye [Arti](https://tpo.pages.torproject.net/core/arti/), Rust utekelezaji wa Tor, hivyo mkoba unaweza njia ya usawazishaji, shughuli matangazo na bei utafutaji kupitia Tor bila meli tofauti Tor wateja.

Watengenezaji wa Zaino kufanya hoja hiyo, akitoa mfano tishio moja kwa moja: kuna "uhitaji wa kutumia zisizojulikana usafiri itifaki (kama vile Nym au Tor) kuficha utambulisho wateja kutoka Zcash ya indexing seva".

Katika ** ZODL**, Tor ni kuweka katika Advanced Settings. kuchapishwa noti mkoba wa pointi watumiaji kwa mode mwongozo uhusiano "pamoja kuwezesha Tor katika Mipangilio ya juu" kama wao "kupendelea kupunguza yatokanayo metadata", na programu inatoa kugeuka kwenye Tor kabla kurejesha mfuko wa fedha, ambayo ni wakati mpya IP ingekuwa vinginevyo amefungwa historia nzima mkoba.

Tor huficha IP yako kutoka kwa seva, lakini haina kubadilisha kile server anajifunza kutokana na maombi unayofanya. Na routing ya vitunguu inaongeza latency, hivyo kusawazisha inachukua muda mrefu zaidi. Kuendesha seva yako mwenyewe huepuka swali la uaminifu kwa njia tofauti, kwani basi mwendeshaji ni wewe.

## Zaino, indexer Rust

[Zaino](/site/Zcash_Tech/Zaino) ni indexer iliyoandikwa katika kutu na timu Zingo, kujengwa kuchukua nafasi ya lightwalletd kama sehemu ya kazi zcashd deprecation. Ni mtumishi mwanga wateja, wateja kamili na block explorers, kusoma data mlolongo uliofanyika kwa "ama Zebra au Zcashd full validator".

Ni chini ya maendeleo hai, na toleo 0.7.0 iliyotolewa katika Agosti 2026. ni inalenga kukaa nyuma sambamba na lightwalletd ambapo inawezekana, hivyo pochi unaweza kuashiria bila kuwa rewritten.

Zaino ina ukurasa wake mwenyewe na michoro usanifu, hivyo ukurasa huu inashughulikia tu jukumu lake kama mwanga mkoba server.

## Orodha ya seva

Makala ya kwanza. [hosh.zec.rocks (mawe ya mawe)](https://hosh.zec.rocks/zec) Dashibodi hufuatilia seva za umma na afya zao, na ni mahali pa kuangalia kile ambacho kwa kweli kinaendelea. [hali.zec.miamba](https://status.zec.rocks/) inaonyesha hali ya huduma.

Seva zilizoorodheshwa kwenye dashibodi wakati wa kuandika:

Msimamizi. Maelezo.
|:--|:--|
 zec.rocks:443  Vituo vya mwisho wa kikanda vimeorodheshwa kando yake na:na.zec.rocs, eu.zec .rocks, ap.zec rocks and sa.zec Rocks
 zec-node.cakewallet.com:443 kwenye kikoa cha Cake Wallet's domain
ą zec.0xrpc.io:443ą Kuendeshwa na 0xRPC, ambayo inatoa bure umma mwisho pointi kwa idadi ya minyororo na anauliza kwa ajili ya michango ili kufidia uwezo wa
 zaino.unsafe.zec.rocks:443  Zaino mfano. Kumbuka jina la mwenyeji, kutibu kama majaribio
☐ testnet.zec.rocks:443 ▸ Testnet, na mfano wa Zaino testnet waliotajwa katika zaino.testnet.unsafe.zec . rocks

Angalia dashibodi badala ya kuamini orodha hii. Waendeshaji huja na kwenda, na ukurasa kama huu umri.

## Kubadilisha seva katika mkoba wako

Worth kufanya kama unataka kuchagua operator unaowaamini, kuenea shughuli katika waendeshaji mbalimbali, au uhakika juu yako mwenyewe.

Njia ya menyu chini walikuwa sahihi wakati ukurasa huu updated, lakini mkoba interfaces hoja, hivyo kutibu yao kama dokezo badala ya njia halisi. Tafuta Advanced Settings au chaguo server.

#### ZODL

ZODL pia inatoa kubadili server njia ya mkato wakati ushirikiano kushindwa ni unasababishwa na seva kuwa nje ya tarehe. Tor inaendelea kuendesha mfumo wa uhamisho kwa ajili ya watumiaji wote, lakini si katika hali yoyote kama ilivyo sasa.

#### Kipaji cha Ywallet

cog katika kona ya juu kulia, kisha tab Zcash.

![Ywallet server settings](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo (mnyama)

Burger orodha katika kona ya juu kushoto, kisha Mipangilio, basi scroll chini.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Burger orodha katika kona ya juu kushoto, kisha Mipangilio, basi Advanced.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Picha hizo zilichukuliwa Machi 2025 na programu zimetuma matoleo tangu wakati huo, kwa hivyo vifungo vinaweza kuwa vimehama.

## Kuendesha biashara yako mwenyewe

Chaguo nguvu ni kuwa operator yako mwenyewe, ambayo huondoa swali uaminifu kabisa. Watumishi wote wawili ni wazi chanzo: [lightwalletd](https://github.com/zcash/lightwalletd) katika Go na [Zaino](https://github.com/zingolabs/zaino) Wote kusoma kutoka validator kamili, hivyo wewe pia wanataka [Zebra](/site/Zcash_Tech/Zebra_Full_Node).

## Muhtasari

Wallets mwanga kukupa hifadhi kulindwa bila nafasi disk, ambayo ni biashara nzuri. Tu kuwa wazi kuhusu nini wewe ni biashara. server haiwezi kuchukua fedha yako au kusoma kiasi wako shielded, lakini vizuri kuwekwa kuona anwani yako ya IP na wakati transact. Njia juu Tor, kuchagua operator yako makusudi, au kukimbia mwenyewe.

** Mwisho updated:** Agosti 2026
