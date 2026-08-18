---
published: 2026-04-14
---

<a href="https://github.com/zechub/zechub/edit/main/site/Research/Dash_Zcash_Orchard_Integration.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Dash Integration of Zcash Orchard



## Kpɔkplɔyiɖeme

Le February 2026 me la, Dash network ɖe gbeƒãe be yewotsɔ Zcash ƒe Orchard shielded pool la de Dash Evolution kɔsɔkɔsɔa me. Esia de dzesi ameŋunyatakakawo ŋuti nuwɔwɔ aduadu ɖedzesitɔwo dometɔ ɖeka le kɔsɔkɔsɔwo dome le cryptocurrency ƒe teƒea, esi Dash xɔ Zcash ƒe nya ɣaɣla siwo me sidzedze zero mele o ƒe nu yeyewo tsɔ kpe ɖe eƒe ameŋunyatakakawo ŋuti kpɔɖeŋu si wotu ɖe CoinJoin dzi si li fifia ŋu. Ðekawɔwɔa ɖo kpe Zcash ƒe ɖoƒe si nye kplɔla le ameŋunyatakakawo ŋuti mɔ̃ɖaŋununya me dzi eye wòʋu ta yeye aɖe na ameŋunyatakakawo ŋuti nuwɔwɔ aduadu le kɔsɔkɔsɔwo dome.

Nyati sia ɖe nusi Orchard ƒe ɖoɖowɔɖia nye, alesi Dash le ewɔm, nusita wòle vevie na lãwo ƒe agbenɔnɔ ƒe ɖoɖo eveawo siaa, kple nusi wòfia na adzame gaku ƒe nɔnɔme si keke ta wu la me.


## What Is the Zcash Orchard Protocol?

Orchard nye Zcash ƒe akpoxɔnu ta deŋgɔtɔ kekeake, si wowɔ dɔ kple Network Upgrade 5 (NU5) le ƒe 2022 ƒe domedome. Etsi tre ɖi na ƒe geɖe ƒe nya ɣaɣlawo ŋuti numekuku le Electric Coin Company (ECC) kple Zcash nutoa me ƒe taƒoƒo.

### Mɔ̃ɖaŋununya Vevi: Halo 2

Wotu Orchard ɖe **Halo 2** kpeɖodziɖoɖo dzi, si nye zk-SNARK ƒe dɔwɔwɔ si wɔa dɔ nyuie si woŋlɔ ɖe Rust me. Halo 2 to ŋgɔyiyi gã eve vɛ:

- **No Trusted Setup**: Do ŋgɔ na Zcash shielded pools (Sprout kple Sapling) ɖo ŋu ɖe akpa geɖe ƒe akɔntabubu kɔnuwo ŋu be woawɔ cryptographic parameters. Ne wometsrɔ̃ adzame nusiwo dzɔna le vome ("aɖi gbeɖuɖɔ") tso kɔnu siawo me nyuie o la, le nukpɔsusu nu la, woate ŋu azãe atsɔ awɔ aʋatso dzesi siwo wotsɔ akpoxɔnu wɔe. Halo 2 ɖea nudidi sia ɖa keŋkeŋ to mɔnu aɖe si woyɔna be **nested amortization**, si gbãa kuxi sesẽwo ƒe kpɔɖeŋu geɖewo ɖekae le elliptic curves ƒe tsatsamwo dzi ale be akɔntabubu ƒe kpeɖodziwo nate ŋu abu wo ɖokui ŋu.

- **Kpeɖodzi si wogbugbɔ ŋlɔna ƒe wɔwɔme**: Kpeɖodzi ɖeka ate ŋu aɖo kpe kpeɖodzi bubu siwo seɖoƒe meli na o kloe ƒe nyateƒenyenye dzi, si aƒo akɔntabubu gbogbo aɖe nu ƒu wòazu nɔnɔme si le sue, si ŋu woate ŋu aɖo kpee. Esia le vevie na scalability kple etsɔme tɔtrɔwo.

### Alesi Orchard ƒe Adzamenyawo Wɔa Dɔe

Le blockchain ƒe asitsatsa si wowɔna tsã me la, amesi ɖoe ɖa, amesi xɔe, kple ga home katã dzena le kɔsɔkɔsɔ me. Le asitsatsa si wokpɔ ta na Orchard me la, kpeɖodzi siwo me sidzedze zero mele o ɖo kpe edzi le akɔntabubu nu be:

- Asitsatsa la sɔ (nu siwo wotsɔ dea eme sɔ kple emetsonuwo, womewɔa dzesi aɖeke tso naneke me o) .
- Ga si sɔ le amesi ɖoe ɖa la si
- Gazazã zi eve aɖeke medzɔ o

Woɖo kpe esiawo katã dzi **evɔ womeɖea** amesi ɖo ga la ɖa, amesi xɔe, alo ga home si wotsɔ yi na ame bubu o. Abe alesi Dash ƒe CTO Samuel Westrich gblɔe ene la, le esi teƒe be woatsɔ atsyɔ asitsatsa ƒe mɔwo dzi to tsakatsaka me la, sidzedze zero ƒe kpeɖodziwo kpɔa egbɔ be "mɔ aɖeke meli woatsɔ adze egɔmee o."

### Nuwɔnawo Tsɔa Nusiwo Wotsɔ Dea Nu Kple Nusiwo Wodo Ðe Eme Teƒe

Orchard to nukpɔsusu si nye **Actions** vɛ be woatsɔ axɔ ɖe input/output model si wozãna tsã la teƒe. Dɔwɔwɔ ɖesiaɖe ƒoa gazazã kple nusi woɖe tso eme nu ƒu ɖekae, si ɖea asitsatsa ƒe metadata si do go la dzi kpɔtɔna. Esia wɔnɛ be esesẽna na eteƒekpɔlawo be woawɔ ʋuwo ƒe zɔzɔ ŋuti numekuku alo heuristic amedzidzedze ɖe asitsatsa siwo ŋu wokpɔ ta na ŋu.


## Nukae Nye Dash Evolution Chain?

Be nàse ƒoƒo ɖekae gɔme la, ele vevie be nàse Dash ƒe xɔtuɖaŋu gɔme.

### Kɔsɔkɔsɔ Eve ƒe Xɔtuɖaŋu

Dash wɔa kɔsɔkɔsɔ eve ƒe ɖoɖo aɖe ŋudɔ:

- **Dash Core (Layer 1)**: Blockchain gbãtɔ si ɖo kpe dɔwɔwɔ dzi, si tomenukulawo kple masternodes le dedie. Afi siae DASH dzesi si nye dzɔdzɔmetɔ la le eye CoinJoin ƒe ameŋunyatakakawo ƒe tsakatsaka wɔa dɔ le.

- **Dash Evolution (Platform Layer)**: Kɔsɔkɔsɔ evelia si wotu ɖe Core xa si doa alɔ smart contract ƒe dɔwɔwɔ, dɔwɔɖoɖo siwo woɖe ɖe vovo, kple amenyenye dzikpɔkpɔ. Evolution zãa Tendermint ƒe nukpɔsusu ɖeka ƒe mɔnu si wogbugbɔ trɔ si woyɔna be **Tenderdash** eye Evolution Masternodes siwo léa kɔsɔkɔsɔ eveawo ta le ɣeyiɣi ɖeka me la ɖo kpe edzi.

Evolution kɔsɔkɔsɔae nye afisi Orchard ƒe ƒoƒo ɖekae dzɔna le. Aɖaŋu ƒe tiatia sia na Dash te ŋu to nya ɣaɣlawo ƒe adzamenyawo deŋgɔ vɛ evɔ matrɔ asi le Core kɔsɔkɔsɔ si ŋu kpeɖodzi le ŋu o.


## Alesi Ðekawɔwɔa Wɔa Dɔe

### Mɔ̃ɖaŋununya ƒe Xɔtuɖaŋu

Dash tsɔ fɔkpa ƒo Zcash ƒe Orchard Rust aɖaka si woate ŋu azã faa la eye wòtrɔ asi le eŋu na Evolution kɔsɔkɔsɔa. Ðekawɔwɔa zɔna ɖe **gaxɔgbalẽvi si wokpɔ ta na** ƒe ɖoɖo dzi:

1. **Lock**: Zãlawo doa woƒe DASH nunɔamesiwo ɖe Dash Core dzi
2. **Mint**: Woŋlɔa "Credits" dzesi siwo wotsɔ pegged la ɖe Evolution kɔsɔkɔsɔa dzi
3. **Tɔtrɔ**: Woate ŋu atsɔ Orchard ƒe sidzedze zero-sidzedze ƒe kpeɖodziwo atsɔ gaxɔgbalẽviwo ayi teƒe bubu le ame bubuwo ƒe ŋkɔ manɔmee, eye woakpɔ ame si ɖoe ɖa, amesi xɔe, kple ga home la ta bliboe
4. **Burn**: Wotɔa dzo dzesiwo le Evolution dzi be woagbugbɔ DASH ƒe nunɔamesi siwo le ete la axɔ le Core

Kpɔɖeŋu sia sɔ kple mɔ eve ƒe peg le Core kple Evolution kɔsɔkɔsɔwo dome, gake sidzedze zero-sidzedze blibo le eŋu na asitsatsa le Evolution ƒe akpa dzi.

### Woaɖee Ðe Edzi Vivime

Wowɔ ɖoɖo ɖe ɖekawɔwɔa ŋu le akpa eve me:

**Akpa 1 (March 2026, wole lalam be woawɔ kɔmpiuta dzi dedienɔnɔ ŋuti numekukuwo):**
- De Orchard shielded ta siwo le Evolution kɔsɔkɔsɔa dzi
- Do alɔ Dash Credits ƒe gɔmedzedze siwo wokpɔ ta na ƒe asitɔtrɔ le akpa eveawo dome
- Dedienɔnɔ ŋuti numekuku siwo wowɔ le wo ɖokui si ƒe nuwuwu hafi woawɔ mainnet ƒe dɔwɔwɔ

**Akpa 2 (Afɔɖeɖe siwo kplɔe ɖo):**
- Keke Orchard ƒe ameŋunyatakakawo ƒe nɔnɔmewo ɖe enu ɖe ​​**tokenized real-world assets (RWAs)** siwo woɖe ɖe go le Evolution dzi
- Na ameŋunyatakakawo takpɔkpɔ ƒe dɔwɔnawo nawɔ dɔ na DeFi kple smart contract ƒe kadodowo le mɔ̃a dzi
- He zero-knowledge shielding vɛ na dzesi ƒomevi ɖesiaɖe, ke menye ga si wozãna le dukɔa me ɖeɖeko o

### Asitelefon dzi Nuwɔwɔ Ðekae

Mɔxenu ɖeka si nye kuxi le ŋutinya me na ameŋunyatakakawo zazã ƒe ɖoɖo siwo me sidzedze aɖeke mele o enye be woawɔ ɖeka blewuu le asitelefonwo dzi. Dash ƒe ƒuƒoƒoa ɖee fia be Evolution ƒe xɔtuɖaŋu ateŋu ana **asitelefon dzi nyatakaka siwo wokpɔ ta na ƒe ɖekawɔwɔ kabakaba wu**, si anye ŋgɔyiyi si ŋu gɔmesese le na gbesiagbe zãlawo. Wole asi dam ɖe dɔ sia dzi fifia.


## Nusita Esia Le Vevie: CoinJoin vs. Orchard

### Dash ƒe Nya ɣaɣla si Li Fifia: CoinJoin

Dash tsɔ adzamenyawo naa amewo tso blema ke to **CoinJoin**, si nye mɔnu si menye nudzraɖoƒe o ƒe tsakatsaka dzi. CoinJoin wɔa dɔ to zãla geɖewo ƒe asitsatsa me nyawo kple emetsonuwo ƒoƒo ƒu ɖe asitsatsa ɖeka me, si wɔnɛ be esesẽna (gake menye nusi mate ŋu adzɔ o) na eteƒekpɔlawo be woakpɔ nusiwo wotsɔ de eme siwo sɔ kple nusiwo woɖe tso eme.

Seɖoƒe li na CoinJoin:

- **Tiatia**: Ele be zãlawo natsɔ asi awɔ tsakatsaka le Dash Core gakotokua me
- **Obfuscation, menye encryption**: Asitsatsa ƒe mɔwo gakpɔtɔ li le kɔsɔkɔsɔ dzi; ɖeko wo dzi wɔwɔ sesẽna wu
- **Susceptible to analysis**: Esi nunɔamesiwo kple nyatakaka siwo sɔ ta la, kɔsɔkɔsɔ me numekuku dɔwɔƒewo ɖe ŋutete si le wo si be woaɖe ŋkɔmaɖemaɖe le CoinJoin ƒe asitsatsa aɖewo ŋu fia
- **Ŋkɔmaɖemaɖe ƒe ɖoɖo si seɖoƒe li na**: Adzamenyawo si wona la nɔ te ɖe zãla bubu neni siwo le tsakatsam le ɣeyiɣi ɖeka me dzi

### Orchard ƒe Nɔnɔme ƒe Ŋgɔyiyi

Orchard tsi tre ɖi na ame ŋutɔ ƒe nyawo gbɔ kpɔkpɔ ƒe mɔnu si to vovo kura:

- **Cryptographic guarantees**: Akɔntabubue kpɔa ame ŋutɔ ƒe nyawo dzi, ke menye amehawo ƒe nuwɔna o
- **No trail**: Asitsatsa ƒe mɔ aɖeke meli si ŋu woaku nu me le o elabena womeŋlɔa ame si ɖoe ɖa, amesi xɔe, kple ga home ɖe kɔsɔkɔsɔa me le nuŋɔŋlɔ gbadzaa me gbeɖe o
- **Larger shielded set**: Orchard ƒe asitsatsa katã ma shielded pool ɖeka, si dzia ŋkɔmaɖemaɖe ƒe ƒuƒoƒoa ɖe edzi
- **No setup si dzi woka ɖo o**: Halo 2 ƒe kpeɖodziɖoɖoa ɖea kakaɖedzi ƒe susu susɔe ɖesiaɖe ɖa

Ðekawɔwɔa mexɔ ɖe CoinJoin teƒe le Dash Core o. Ke boŋ Orchard naa **nya ɣaɣlawo ƒe ƒuƒoƒo si kpe ɖe eŋu** le Evolution kɔsɔkɔsɔa dzi, si naa Dash zãlawo tiatia le CoinJoin ƒe tsakatsaka si le bɔbɔe kple akɔntabubu ƒe adzamenyawo si nye zero-sidzedze kpeɖodziwo dome.


## Nusi Esia Gblɔ Na Zcash

Dash ƒe ɖekawɔwɔa tsɔa gɔmesese veviwo vɛ na Zcash ƒe lãwo ƒe agbenɔnɔ.

### Zcash Mɔ̃ɖaŋununya ƒe kpeɖodzinana

Ne cryptocurrency dɔ gã bubu xɔ Zcash ƒe cryptographic stack la, ewɔa dɔ abe gotagome kpeɖodzi na mɔ̃ɖaŋununya ƒe tsitsi, dedienɔnɔ, kple aɖaŋuwɔwɔ ƒe nyonyome. Samuel Westrich, si nye Dash Core Group ƒe CTO de dzesii be:

> "Nye ŋutɔ metsɔ ɖe le ZK kpeɖodzi mɔ̃ɖaŋununya kple eƒe zazã le blockchain me tso esime woŋlɔ agbalẽ gbãtɔwo le ƒe 2014 me. Le ƒe siwo va yi me la, míele ŋku lém ɖe Zcash ŋu. Esi woɖe Orchard crate la ɖe go yeyetɔ ta la, míese le mía ɖokui me be enye ɣeyiɣi nyui aɖe be míaku nu me atsɔ mɔ̃ɖaŋununya la akpe ɖe míaƒe Evolution kɔsɔkɔsɔ yeyetɔ ŋu."

Egblɔ kpee be "Orchard nye dzɔtsoƒe si le ʋuʋu ɖi eye wòtsi; eƒe ƒoƒo ɖekae le bɔbɔe wu alesi wokpɔ mɔe."

### Nu Gbagbewo ƒe Dɔwɔɖoɖowo ƒe Kekeɖenudɔwɔwɔ

Woɖe Orchard crate la ɖe go le MIT kple Apache 2.0 ƒe mɔɖegbalẽ siwo le ʋuʋu ɖi te. Ðekawɔwɔ ɖesiaɖe si dɔ bubu awɔ la kekea Zcash ƒe nya ɣaɣlawo ƒe gɔmedzenuwo zazã ɖe enu, dzia dɔwɔlawo ƒe xexlẽme si nya nu tso kɔdaɖoɖoa ŋu ɖe edzi, eye ateŋu ahe ŋgɔyiyi siwo le dzigbe gome vɛ si aɖe vi na Zcash ŋutɔ.

### Atitsoga-kɔsɔkɔsɔwo ƒe Dzesidede

Dash ƒe gege ɖe dɔwo ƒe ŋkɔwo me to Halo 2 kple Orchard zazã me tsɔ Zcash da ɖe dɔwo abe Filecoin, Ethereum, kple zkRollup egbɔkpɔnu geɖe siwo xɔ alo ku Halo 2 mɔ̃ɖaŋununya me la xa. Nu gbagbewo ƒe agbenɔnɔ ƒe ɖoɖo sia si le dzidzim ɖe edzi doa ŋusẽ network ƒe ŋusẽkpɔɖeamedzi siwo ƒo xlã Zcash ƒe ameŋunyatakakawo ŋuti numekuku.

### Zcash abe Ameŋunyatakakawo Ŋuti Dzidzenu ene

Ðekawɔwɔa tsɔ Zcash ƒe mɔ̃ɖaŋununya ɖo nɔƒe si nye **dɔwɔƒe ƒe dzidzenu si le dodom na blockchain ƒe adzamenyawo**, abe alesi TLS va zu dzidzenu na nyatakakadzraɖoƒe ƒe nya ɣaɣla ene. Ne dɔ siwo le ho ʋlim tiae be yewoaxɔ Zcash ƒe dɔwɔnuwo tsɔ wu be yewoatu yewo ŋutɔ tɔ la, eƒoa nu tso dzɔdzɔmeŋutinunya si le ete ƒe nyonyome kple kakaɖedzi ŋu.


## Ŋusẽkpɔɖeamedzi si keke ta wu ɖe Ameŋunyatakakawo Dzi Cryptocurrency

### Ameŋunyatakakawo Ŋuti Nuŋlɔɖi

Ðekawɔwɔ sia va le ɣeyiɣi si me wotsɔ ɖe le ameŋunyatakakawo ŋuti mɔ̃ɖaŋununya me vevie le cryptocurrency dɔwɔƒea katã me. Ameŋunyatakakawo ƒe gakuwo kpɔ dzidziɖedzi si wu 80% le ƒe 2026 ƒe gɔmedzedze, si tso ganyawo dzi kpɔkpɔ kple asixɔxɔ si le asitsatsa ƒe adzamenyawo ŋu ƒe sidzedze si le dzidzim ɖe edzi gbɔ.

### Sededewo ƒe Nyawo

Ðekawɔwɔa hã va ɖo le sedede ƒe nyaƒoɖeamenu le ameŋunyatakakawo ƒe dzesiwo ŋu me. Le January 2026 me la, Dubai ƒe Ganyawo Gbɔkpɔha (DFSA) xe mɔ na crypto exchange siwo ŋu wowɔ ɖoɖo ɖo be woagadzra ameŋunyatakakawo ƒe dzesi siwo dometɔ aɖewoe nye ZEC kple XMR na ezãla yeyewo o. Togbɔ be mɔxexeɖedɔa mexe mɔ na dumeviwo be woagalé dzesi siawo ɖe asi o hã la, ehe susu yi masɔmasɔ si le ezãlawo ƒe adzamenyawo kple sewo dzi wɔwɔ dome dzi.

Ameŋunyatakakawo ƒe kɔsɔkɔsɔwo ƒe ƒoƒo ɖekae abe Dash-Orchard ene ate ŋu akpɔ ŋusẽ ɖe alesi sedzikpɔlawo bua ameŋunyatakakawo ŋuti mɔ̃ɖaŋununyae dzi. Nyateƒe si wònye be woate ŋu axɔ ameŋunyatakakawo ƒe nɔnɔmewo abe modular components ene to blockchain ɖesiaɖe dzi la ɖee fia be mɔxexe ɖe dzesi tɔxɛwo nu ate ŋu mawɔ dɔ boo o wu nuwɔwɔ kple mɔ̃ɖaŋununya si le ete.

### Etsɔme Habɔbɔwo

Dash ƒe ƒoƒo ɖekae ɖo kpɔɖeŋu na blockchain dɔ bubuwo. Ne woateŋu atsɔ Orchard ade kɔsɔkɔsɔ si me nukpɔsusu ɖeka ƒe mɔnu vovovowo kple xɔtuɖaŋu vovovowo le dzidzedzetɔe la, eɖenɛ fiana be Zcash ƒe ameŋunyatakakawo ŋuti mɔ̃ɖaŋununya nye esi woate ŋu atsɔ ayi teƒe bubu vavã. Esia ate ŋu ade vixɔxɔnyi bubuwo ƒe dzi ƒo le lãwo ƒe agbenɔnɔ ƒe ɖoɖoa katã me, siwo dometɔ aɖewoe nye:

- Layer-2 network siwo le ameŋunyatakakawo ƒe nɔnɔmewo dim
- DeFi ƒe ɖoɖowɔɖi siwo di be yewoakpɔ zãla ƒe asitsatsa ŋuti nyatakakawo ta
- Xexeame ŋutɔŋutɔ ƒe nunɔamesiwo ƒe mɔ̃ siwo hiã be woatsɔ wo ana ame bubuwo le adzame
- Dɔwɔƒewo ƒe blockchains siwo hiã adzamenyawo si wɔ ɖeka kple sewo


## Nyanuwuwuw

Zcash ƒe Orchard ɖoɖowɔɖi ƒe ɖekawɔwɔ ɖe Dash ƒe Evolution kɔsɔkɔsɔ me tsi tre ɖi na nu vevi aɖe le kɔsɔkɔsɔwo dome adzamenyawo ŋuti nuwɔwɔ aduadu me. Le Dash gome la, efia be woawɔ titri le nɔnɔme me tso CoinJoin ƒe obfuscation model dzi ayi Orchard ƒe cryptographic adzamenyawo ƒe kakaɖedziwo dzi. Le Zcash gome la, eɖo kpe edzi be ƒe geɖe ƒe numekuku le Halo 2 kple Orchard shielded pool ŋu na mɔ̃ɖaŋununya sesẽ eye wòtsi ale gbegbe be dɔ gã bubuwo nate ŋu axɔ.

Vevietɔ wu la, ɖekawɔwɔ sia ɖee fia be ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla le cryptocurrency me menye hoʋiʋli si me wozãa ga home zero le le dɔwo dome o. Ameŋunyatakakawo ŋuti mɔ̃ɖaŋununya si wozãna le mɔ gbadza nu ɖea vi tso wo zazã le mɔ geɖe nu, wo me toto le mɔ si keke ta wu, kple ŋgɔyiyi si wowɔ ɖekae me. Esi Zcash ƒe Orchard le kakam ɖe blockchain ƒe lãwo ƒe agbenɔnɔ ƒe ɖoɖoa me la, teƒe bliboa te ɖe etsɔme si me ganyawo ƒe adzamenyawo nye nusi woɖo ɖi, ke menye nusi to vovo o ŋu.


## Nuxexlẽ Bubuwo

- [Halo 2 ƒe Nuŋlɔɖiwo](https://zcash.github.io/halo2/)
- [Zcash Orchard Crate (GitHub)](https://github.com/zcash/orchard)
- [Halo 2 GitHub Nudzraɖoƒe](https://github.com/zcash/halo2)
- [Dash Evolution Platform ƒe Nuŋlɔɖiwo](https://docs.dash.org/en/stable/)
- [Cointelegraph: Dash Tsɔ Zcash ƒe Adzamenyawo Gbɔkpɔha Ðekae](https://cointelegraph.com/news/dash-integrates-z-cash-orchard-privacy)
- [HackerNoon: Dash He Zcash Orchard ƒe Adzamenyawo Va Nɔnɔmetɔtrɔ Kɔsɔkɔsɔ me](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions)
