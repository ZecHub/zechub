# Mzunguko wa mviringo

## TL;DR

- turnstile ni umma uhasibu utawala kwamba kufuatilia kiasi cha thamani inaingia na majani kila pool shielded
- Inaruhusu mtu yeyote kuthibitisha kwamba pool kamwe hulipa zaidi kuliko iliwekwa ndani yake, hata ingawa shughuli za ndani ni binafsi
- Hii inalinda ugavi ZEC kutoka mdudu siri, kwa sababu sarafu bandia hawawezi kuondoka bwawa bila kuvunja hesabu
- Ni kazi bila kudhoofisha faragha, tangu tu jumla pool ni ya umma, kamwe shughuli za mtu binafsi
- Turntile ni sababu Orchard kwa Ironwood uhamiaji inaweza kuthibitisha shielded ugavi ni sauti

<br/>

## Hii ni kwa ajili ya nani?

- Mtu yeyote ambaye anataka kuelewa jinsi Zcash anaendelea yake binafsi ya usambazaji wa kuaminika
- Watumiaji kufuatia Orchard kwa Ironwood uhamiaji na wanashangaa jinsi inathibitisha usambazaji ni halisi
- Newcomers curious jinsi mfumo wa fedha binafsi bado inaweza kuwa audited

<br/>

## Changamoto hiyo ni nini?

Zcash Shielded huficha kiasi, watumaji na wapokeaji. faragha hiyo ni hatua. Lakini inaibua swali gumu: kama hakuna mtu anaweza kuona ndani ya pool shielded, jinsi gani yeyote kujua jumla ya kiasi cha ZEC sahihi? Jinsi wewe kukagua fedha unaweza si kuona? Je!

Kama bug milele basi mtu kudanganya sarafu ndani ya bwawa kulindwa, bandia itakuwa siri na faragha hiyo ambayo inalinda watumiaji waaminifu. Bila kinga, kwamba kutokuwa na uhakika ingekuwa kudhoofisha imani katika ugavi nzima. turnstile ni usalama ambao hutatua hili.

<br/>

## Kile kiunzi cha mzunguko wa hewa ni nini?

Fikiria kila bwawa kulindwa kama chumba na mlango mmoja kuhesabiwa. Kila wakati thamani inaingia katika pool kutoka nje, au kuondoka kwenda mahali pengine, hupita kupitia mlango na ni mahesabu kwa umma. shughuli ndani ya chumba kubaki binafsi, lakini jumla mbio kwenye mlango ni inayoonekana kwa mtu yeyote.

Sheria ni rahisi: pool kamwe basi thamani zaidi ya kwenda nje kuliko imekuwa akaenda katika. nodes kukataa block yoyote ambayo ingekuwa kushinikiza usawa wa bwawa chini zero. kiasi kuamini kuwa ndani ya ziwa inajulikana wakati wote, kwa sababu tu jumla kwamba aliingia minus jumla hiyo kushoto. hesabu hii umma ni turnstile.

<br/>

## Jinsi inavyofanya kazi

Zcash ina mabwawa kadhaa ya ulinzi katika historia yake, kama vile Sprout, Sapling na Orchard. Thamani huhamia kati ya mlolongo wa uwazi na bwawa hizi, na wakati mwingine kati ya maziwa yenyewe. Turntile inatazama harakati hizo:

1. Wakati ZEC hatua katika pool shielded, kiasi ni aliongeza kwa usawa huo wa umma ya kundi hilo
2. Wakati ZEC hatua nje ya pool, kiasi ni subtracted
3. Mtandao unakataa block yoyote ambayo ingefanya usawa wa dimbwi kwenda hasi, maana zaidi imeondoka kuliko milele aliingia
4. Mtu binafsi kulindwa shughuli kubaki kikamilifu faragha, tu jumla ya kundi ni umma.

The network tracks a balance for every value pool this way, including Sprout, Sapling, Orchard, the new Ironwood pool, and the transparent and lockbox balances. Because of this, even if the exact contents of a pool are hidden, the maximum that can ever come out is capped by what went in. No hidden inflation can escape into circulation.

<br/>

## Jinsi usawa wa thamani ni checked

Tally mlangoni ni tu kuaminika kwa sababu kila shughuli ina kulazimishwa kuthibitisha kuwa wakiongozwa kiasi kweli, hata kama kiasi yenyewe anakaa siri. Kila shirika la ulinzi wa manunuzi moja ya uaminifu: thamani halisi inachukua au nje ya bwawa, aitwaye wake usawa thamani. dhamana nzuri thamani sawa na fedha kushoto pool upande wazi, hasi mmoja maana pesa aliingia. maelezo binafsi kubaki muhuri, lakini hii takwimu moja ya jumla ni umma, na kwamba ni nini turnstile anaongeza up.

sehemu clever ni jinsi manunuzi inathibitisha kwamba idadi ya umma ni waaminifu bila kufunua kiasi binafsi nyuma yake. utaratibu hutofautiana na pool, na hii ni mashine halisi ya turnstile.

In the original Sprout pool, each transaction uses a JoinSplit. A JoinSplit spends two hidden notes and creates two new ones, and it carries two public fields: vpub_old, the value entering the shielded pool from the transparent side, and vpub_new, the value leaving the pool back to the transparent side. Every JoinSplit must balance on its own, and its zero knowledge proof guarantees the hidden inputs and hidden outputs add up correctly. Sprout's pool balance is simply the running total of all vpub_old minus all vpub_new across the chain. This is why Sprout is a useful example later: because vpub_old is the only way value can enter the pool, a single rule turning it off can seal the pool for good.

In Sapling, Orchard, and Ironwood, balance is proven a smarter way, using a binding signature. Instead of each transfer balancing alone, the whole transaction commits to each hidden amount using a value commitment. A value commitment is a sealed envelope for a number, built with a homomorphic Pedersen commitment, which has a special property: the envelopes can be added and subtracted without opening them. The network adds up all the input commitments, subtracts all the output commitments, and compares the result against the transaction's single declared net figure, its valueBalance field. Only a transaction whose hidden amounts genuinely match that public valueBalance can produce a valid binding signature over the combined commitments. If someone tried to move more value than they declared, the commitments would not add up, the binding signature would not verify, and the transaction would be rejected. Ironwood uses the same Orchard protocol, so it works the same way.

This is also what makes a cross-pool transfer safe to check. When funds move from one shielded pool to another, for example from Orchard into Ironwood, the transaction cannot hide the amounts from the accounting. Each pool has its own value balance that must be satisfied by its own proofs: the Orchard side must show a matching outflow through its binding signature, and the Ironwood side must show the corresponding inflow through its own. The value leaving one pool and the value entering the other are each proven independently, so a cross-pool move is really two turnstile crossings happening in one transaction, one out, one in, and both are tallied in public even though the underlying amounts stay private.

Hivyo turnstile si imani. Kila shughuli mathematically inathibitisha mwenyewe athari ya wavu, mtandao sums wale madhara kuthibitishwa kwa kila bwawa, na makubaliano utawala (ZIP 209) anakataa kuzuia yoyote ambayo itaendesha usawa bwawa hasi. uthibitisho katika ngazi ya manunuzi, utekelezaji katika kiwango cha mnyororo.

<br/>

## Kwa nini ni muhimu?

Turntile inatoa Zcash mambo matatu kwa wakati mmoja.

Kwanza, inagawa hatari. mdudu cryptographic katika pool moja ni zilizomo kwa hilo bwawa, kwa sababu turnstile ataacha thamani bandia kutoka kuvuka ndani ya ugavi pana.

Pili, inaruhusu jamii kuthibitisha usambazaji kwa nyuma. Kama mdudu baadaye kugunduliwa, rekodi turntile inaonyesha kama thamani zaidi milele kushoto pool kuliko aliingia ndani yake. Rekodi safi ni ushahidi mkubwa kwamba hakuna bandia alikuwa zinazotumiwa.

Tatu, inalinda faragha wakati wa kufanya haya yote. Tu jumla ya kiwango cha pool ni umma. shughuli yako binafsi kubaki kulindwa. Auditability na usiri kuishi pamoja, ambayo ni kawaida na moja ya nguvu kimya Zcash ya.

<br/>

## Mzunguko wa mviringo unafanya kazi

Turntile si mpya, na imekuwa kutumika katika wakati muhimu katika historia Zcash.

Wakati Zcash alihamia kutoka awali Sprout pool kuelekea mpya Sapling bwawa, turnstile walinzi mpito. Bwawa la sprout baadaye ilikuwa vikwazo hivyo hakuweza kupokea mtiririko wa fedha mpya, ambayo moyo watumiaji kuhama wakati turntile kuweka uhasibu waaminifu. Miaka kadhaa baadaye, ukweli kwamba hakuna thamani milele vibaya kushoto Sprout anasimama kama ushahidi kuwa cryptography yake ya mapema kamwe mafanikio kutumiwa.

Mchakato wa kuhamisha fedha kutoka Orchard kwenda Ironwood sasa unaendeshwa kwa muundo huo. Mnamo mwaka 2026 mdudu alipatikana na kurekebishwa katika mfumo wa kuthibitisha orchard. Hakuna ushahidi kwamba uliwahi kutumiwa, lakini kwa sababu shughuli iliyohifadhiwa ni ya kibinafsi, hakika haikuwezekana. Jibu ni kufunga dimbwi la zamani la Orchard na kuwa kila mtu ahamishe pesa zao kupitia turnstile hadi kwenye Ironwood, kidimbwi kipya akitumia itifaki iliyorekebishwa. Kulazimisha pesa kupitia turntile inamaanisha sarafu zozote bandia zilizobaki haziwezi kufuata, na mara uhamiaji ukikamilika, yeyote anaweza kudhibitisha usambazaji uliohifadhiwe uko sawa.

<br/>

## Njia moja ya kupoteza pool deprecation

Turntile inafanya iwezekanavyo kustaafu salama bwawa la zamani, kwa mwelekeo mmoja tu, bila kuvunja dhamana ya usambazaji. Ujanja ni kufunga mlango wakati wa kuacha kuondoka wazi.

Sprout ni mfano wazi. Kuikataa, ZIP 211 aliongeza moja makubaliano ya sheria: kutoka uanzishaji wake urefu, vpub_old uwanja wa kila JoinSplit lazima zero. Tangu vpub _ old ni njia pekee thamani inaweza kuingia katika sprout, kulazimisha kwa sifuri ina maana hakuna thamani mpya unaweza milele kwenda tena, wakati thamani bado wanaweza mtiririko nje upande transparent au juu na Sapling. bwawa akawa mwelekeo mmoja tu. Ni anaweza kuondoa maji, kamwe kujaza. turnstile anaendelea kuhesabu muda wote, hivyo usawa inaweza kushuka kama fedha kuacha lakini hawezi kupanda, na haiwezi kamwe kuwa hasi.

The Orchard to Ironwood migration uses the same idea. At the NU6.3 upgrade, the Orchard pool is closed to new inflows, and wallets are directed to send Orchard funds across the turnstile into the new Ironwood pool. Orchard becomes a one-way pool that can only empty. Because every exit is a turnstile crossing that must be proven, any hypothetical counterfeit value left behind in Orchard cannot quietly follow the honest funds out. It is stuck in a pool that only drains and is watched at the door. Over time this drives the old pool toward empty and lets anyone confirm that the value which came out was never more than the value that honestly went in.

Hii ni sababu ya kina turntile mambo zaidi kuliko uhasibu rahisi. Ni utaratibu kwamba lets Zcash deprecate kulindwa pool, kama kupunguza ugumu kama na Sprout, au kupona kutoka bug aligundua kama Orchard, wakati kuweka kuendelea, umma, provable dhamana kuhusu usambazaji.

<br/>

## Maoni yasiyo sahihi ya kawaida

- Turntile haionyeshi shughuli zako, inaonyesha tu jumla ya pesa zilizopelekwa na mtu mmoja-mmoja.
- Haikumbuki jina la mwigizaji wa bandia. Inaweka kikomo kwa kiasi gani cha pesa kinaweza kuondoka kwenye benki, ambayo ni nini kinalinda usambazaji na utoaji wa bidhaa za uwongo katika Benki ya Dunia.
- Si uvumbuzi mpya kwa Ironwood. Ni ulinzi kila kubwa kulindwa pool mpito katika historia Zcash
- Jumla ya umma pool haina kudhoofisha faragha. Faragha ni katika shughuli ndani ya bwawa, ambayo kubaki siri

<br/>

## Rasilimali

1. [ZIP 209: Kuzuia nje ya mbalimbali Chain Thamani Pool Mizani](https://zips.z.cash/zip-0209) - sheria ya makubaliano nyuma turntile
2. [ZIP 211: Disabling Kuongeza ya thamani mpya kwa Chipukizi Chain Thamani Pool]](https://zips.z.cash/zip-0211) - jinsi ya shina bwawa ilikuwa imefungwa kwa amana mpya
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - kuboresha kwamba utangulizi Ironwood pool na inaongoza thamani katika turnstile
4. [Turntile Utekelezaji Dhidi ya Falsari]](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - maelezo ya awali kutoka Electric Coin Company
5. [Zcash Itifaki ya Utaratibu Specifications]](https://zips.z.cash/protocol/protocol.pdf) - tazama sehemu juu ya usawa na saini yenye kuunganisha kwa maelezo kamili.
6. [Value Pools, Kitabu Zebra](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - jinsi node hufuatilia usawa wa thamani ya kila hifadhi

<br/>

## Kurasa zinazohusiana na makala hii

- [Bwawa za Kuhifadhi]](https://zechub.wiki/using-zcash/shielded-pools) - jinsi Zcash ulinzi shughuli kuweka maelezo binafsi
- [Halo](https://zechub.wiki/zcash-tech/halo) - mfumo wa uthibitisho nyuma ya bwawa la Orchard
- [Usanidi wa Mtandao]](https://zechub.wiki/start-here/network-upgrades) - jinsi Zcash activates mabadiliko kama vile mpya kulindwa mabwawa
