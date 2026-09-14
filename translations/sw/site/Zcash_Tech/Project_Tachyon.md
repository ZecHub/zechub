<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mradi wa Tachyon

## TL;DR

- Tachyon ni mapendekezo ya kubadilisha muundo wa njia Zcash pochi kupata na kutumia fedha ulinzi, maana kuruhusu mtandao kukua kwa idadi kubwa sana ya watumiaji
- Leo mkoba ina kujaribu decrypt sehemu kubwa ya blockchain kugundua ambayo malipo ni yake mwenyewe, na kwamba sababu kuu kulindwa syncing anahisi polepole
- Tachyon inachukua nafasi ya hiyo na ** usawazishaji wa kawaida, kwa hivyo mkoba huleta kile kinachohitajika bila kuchanganua kila kitu na bila kumwambia seva ni sehemu gani alitaka
- Pia huhamisha maelezo ya malipo nje blockchain na katika ombi la kulipa yenyewe, ambayo inafanya itifaki rahisi lakini hubadilisha wajibu kwenye pochi
- Ni pendekezo, kwanza kuchapishwa Aprili 2025 na jina kama mgombea kwa NU7. ni ** si kusafirishwa**, na inahitaji uhandisi juhudi juu ya kiwango cha kuboresha Sapling.

<br/>

## Hii ni kwa ajili ya nani?

- Mtu yeyote ambaye ina watched wallet kulindwa sync na kujiuliza kwa nini inachukua muda mrefu hivyo
- Wageni ambao kuendelea kuona Tachyon zilizotajwa karibu na NU7 na Zcash upanaji wa kiwango cha
- Wasomaji ambao wanataka wazo kwanza na cryptography pili

<br/>

## Tatizo ambalo Tachyon husuluhisha

Zcash huficha malipo ni kwa ajili ya nani. Hiyo ndiyo maana yake, na inaleta tatizo gumu: ikiwa hakuna anayeweza kujua malipo hayo yanamfaa nani, mkoba wako utapataje pesa zako?

Katika Bitcoin hii ni rahisi. anwani ni ya umma, hivyo mkoba unaweza kuuliza server "nini ilitumwa kwa anwani hii?" na kupata jibu. Zcash mfuko wa fedha hawezi kuuliza swali hilo, kwa sababu kuuliza itakuwa yatangaza hasa nini hifadhi kulindwa imeundwa kuficha.

So Zcash does something different. The sender encrypts the payment details and tucks them inside the transaction itself. Your wallet then works through transactions on the chain and tries to decrypt each one. Almost every attempt fails. The few that succeed are your payments. This is called **trial decryption**, and it is private, correct, and slow.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

The catch is what the work depends on. The effort your wallet spends is set by how big the chain is, not by how many payments you actually received. Someone who has never received a single payment does nearly as much work as someone who receives them daily. As Zcash grows, that gets worse for everybody. In the words of the proposal, it "simply does not scale."

<br/>

## Mabadiliko ya Tachyon ni nini?

Tachyon inashambulia tatizo katika mizizi yake: inaacha kutumia blockchain kama njia ya utoaji wa siri za malipo.

Badala yake, maelezo unahitaji kusafiri na ombi malipo yenyewe, nje ya bendi. Ombi la kulipa, URI au QR code hubeba taarifa ambayo kutumika kwa encrypted katika shughuli. Sean Bowe anaelezea hii kama kukumbatia ** out-of-band malipo** kwa mara ya kwanza katika itifaki Zcash ulinzi.

Mara baada ya mnyororo ni tena kubeba kwamba taarifa, mkoba wako hana sababu tena kwa kutafuta yake, na jaribio decryption tatizo kutoweka.

Wallet yako bado inahitaji kujua sasa mnyororo hali ili kutumia, ingawa. Hiyo ni nusu ya pili ya kubuni, ** synchronization dhahiri**: njia kwa ajili ya mkoba kupata mambo maalum anahitaji bila kufunua server ambayo vitu aliuliza kwa.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Nini maana kwa mtu kutumia mkoba

- **Usawazishaji huacha kukua na mlolongo.** Wakati mkoba wako hutumia kukamata utafuatilia shughuli yako mwenyewe badala ya saizi ya Zcash.
- ** Malipo huwa kama kumpa mtu bili.** Ombi la malipo lina kile ambacho mpokeaji anahitaji, kwa hiyo kubadilishana kati ya mtumaji na mpokeazi ni muhimu zaidi kuliko ilivyo leo.
- ** Wallets kubeba jukumu zaidi.** Kwa sababu mlolongo tena ana nakala encrypted ya maelezo yako malipo, kupoteza data mkoba wako mambo mengi. Backup na ahueni hoja kutoka kuwa kipengele itifaki kwa kitu programu mfuko ina kupata haki.
- **Some familiar pieces move or disappear.** Tachyon takes key diversification, viewing keys, and payment addresses out of the core protocol, leaving them to the wallet layer. This is one of the more consequential parts of the proposal and is still being worked through.

<br/>

## Angalia kwa karibu wasomaji wa kiufundi

Tachyon inaelezwa kama mabadiliko ya nyuma-patanifu kwa itifaki Orchard. Inaweza kupelekwa ama kama kuboresha na zilizopo bwawa orchard au kama tofauti kulindwa pool kufikiwa kupitia a [turntile (mzunguko wa mzunguko)](https://zechub.wiki/zcash-tech/the-turnstile), utaratibu huo Zcash kutumika kwa Ironwood. uchaguzi huathiri kupelekwa, si kubuni.

Inaweka mambo kadhaa kutoka Orchard: RedPallas ufunguo re-randomization, homomorphic thamani ahadi na saini ya kuunganisha, na muundo wa funguo iliyogawanywa ambayo inaruhusu kifaa cha uhamisho kuthibitisha bila kutoa mamlaka ya kutumia.

The scaling work leans on **proof-carrying data**, a technique in which data travels alongside a proof of its own correctness, so that combining it with other proof-carrying data produces something that inherits and extends those proofs. This is what allows a large amount of verified work to be compressed into something small and quick to check. Halo, discovered by the team behind Zcash, is what made proof-carrying data practical enough to build on.

strand ya tatu ni ** shielded shughuli aggregates, ambayo mabadiliko jinsi hali za kulinda mabadiliko wanatambuliwa na ina knock-on athari juu ya jinsi kusaini kazi.

<br/>

## Kazi inasimama wapi?

Tachyon ni ** pendekezo, si kipengele cha kusafirishwa**. Ilichapishwa Aprili 2025, na baada ya kufuatilia mwezi Mei 2025 ilifanya kazi kupitia athari za makubaliano. Imeitwa kama mgombea wa NU7, uboreshaji mkubwa ujao baada ya Ironwood, lakini yaliyomo katika NU7 huamuliwa kwa kura ya mmiliki wa sarafu na hakuna chochote kuhusu Tachyon kinachosahihishwa.

Muandishi mwenyewe framing ni kwamba hii ni mpango actionable badala ya utafiti uvumi, lakini moja ambayo inahitaji uhandisi juhudi kulinganishwa na Sapling, pamoja na baadhi maswali magumu makusudi kushoto kwa ajili baadaye.

Kazi inayohusiana na hiyo tayari inaonekana. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), node kamili iliyotolewa mnamo Julai 2026, ni juhudi ya pamoja kati ya Mradi Tachyon na Kikundi cha Valar na inaonyesha baadhi ya mabadiliko haya katika kiwango cha mtandao. [Kufufua habari binafsi](https://zechub.wiki/zcash-tech/private-information-retrieval) utafiti inalenga sawa scanning bottleneck kutoka angle tofauti.

<br/>

## Maoni yasiyo sahihi ya kawaida

- **Tachyon si kuishi.** Hakuna mkoba inatumia leo, na hakuna kuboresha ina ulioamilishwa.
- **Tachyon is not the same as Ironwood.** Ironwood activated in July 2026 and dealt with the Orchard pool and the turnstile. Tachyon is a separate, later proposal about scaling.
- **Tachyon si kupunguza faragha.** Lengo ni kuweka ledger indistinguishability wakati kuondoa gharama ya kuongeza, si biashara faragha kwa kasi.
- **zk-SNARK uthibitisho kamwe ilikuwa kizuizi.** Pendekezo ni wazi kwamba sehemu polepole jinsi pochi kugundua na kuratibu hali, si gharama ya kuangalia ushahidi.
- **"Lengo la NU7" si ahadi.** Nini huenda katika NU7 ni kuamua kwa kura.

<br/>

## Orodha ya maneno

Neno Maana yake.
|---|---|
Jaribio la kutatua ujumbe wa siri. Kujaribu kufuta maandishi ya shughuli moja kwa moja ili kupata zile zilizotumwa kwako wewe mwenyewe.
 Usambazaji wa siri ndani ya bendi. Kuweka malipo kwa njia za siri katika shughuli kwenye blockchain, kama Zcash anavyofanya leo.
❖ Malipo nje ya bendi. Kupitisha maelezo malipo moja kwa moja kati ya mtumaji na mpokeaji badala ya kupitia mlolongo wa fedha.
◯ Usanifu wa usahau. Kuleta data ya mlolongo ambayo mkoba unahitaji bila kuonyesha ni data gani iliyoombwa.
DATA-CAREING PROOF (PCD) Data ambayo husafiri na uthibitisho wa usahihi wake, hivyo ushahidi unaweza kuunganishwa na kufungwa.
❖ Kuhifadhiwa shughuli jumla. njia Tachyon ya bundling hali kulindwa mabadiliko, kubadilisha jinsi wao ni kuwasiliana na saini;
Uhasibu wa kitabu cha hesabu. mali ambayo ulinzi shughuli haiwezi kuwa alisema mbali kutoka kwa kila mmoja.

<br/>

## FAQs

** Je, hii kufanya mkoba wangu kulandanisha kwa kasi zaidi?** Hiyo ni lengo. wakati wa kusawazisha ingekuwa kufuata shughuli yako mwenyewe badala ya ukubwa wa mlolongo. Hakuna kitu imekuwa shipped, hivyo hakuna kipimo takwimu quote bado.

Mimi haja ya kufanya kitu chochote sasa? Hapana Tachyon ni pendekezo. Kama kupitishwa, itakuwa kuwasili kwa njia ya kuboresha mtandao na taarifa kawaida.

** Je, kuondoa kuona funguo maana ya kupoteza uwezo wa kushiriki kusoma upatikanaji?** pendekezo huhamia kwamba uwezo nje ya itifaki msingi na katika safu mkoba. Nini inaonekana kama kwa mazoezi ni moja ya maswali wazi.

** Je, fedha yangu katika hatari kama meli Tachyon?** kupelekwa kutumia ama kuboresha Orchard au turnstile, wote iliyoundwa ili thamani hatua chini ya sheria za uhasibu umma. ukurasa Ironwood anaelezea jinsi kazi turntile.

<br/>

## Kurasa zinazohusiana na makala hii

- [Kupata Habari za Kibinafsi](https://zechub.wiki/zcash-tech/private-information-retrieval) - mbinu nyingine kwa sawa mfuko wa fedha skanning bottleneck
- [Zakura Node (Kituo cha Zakura)](https://zechub.wiki/zcash-tech/zakura-node) - node kujengwa sehemu nje ya juhudi uhandisi Tachyon wa
- [Mti wa chuma](https://zechub.wiki/zcash-tech/ironwood) - kuboresha kwamba kuanzishwa katika Julai 2026, mara nyingi kuchanganyikiwa na Tachyon
- [Mzunguko wa Kioo cha Gari-Moshi](https://zechub.wiki/zcash-tech/the-turnstile) - utaratibu Tachyon inaweza kutumia kama deployed kama bwawa yake mwenyewe
- [Usalama Baada ya Quantum](https://zechub.wiki/zcash-tech/post-quantum-security) - ambapo Tachyon anakaa kando ya muda mrefu kazi itifaki
- [Jinsi Zcash Ilivyopangwa](https://zechub.wiki/start-here/how-zcash-is-organized) - Nani anafanya kazi hii na jinsi mazingira yanavyoungana pamoja

<br/>

## Rasilimali

- [Tachyon: Scaling Zcash na Oblivious Synchronization](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 Aprili 2025, pendekezo la awali
- [Kufanya Kazi ya Tachyaction kwa Umbali](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 Mei 2025, makubaliano na itifaki athari, iliyoandikwa kwa watengenezaji wa itifaki
- [Blogu ya Sean Bowe](https://seanbowe.com/blog/) - ambapo mfululizo wa Tachyon huchapishwa
- [tachyon.z.cash](https://tachyon.z.cash/) - eneo la mradi
