# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Sign in with Zcash

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Intermediate - 7 min</span>

## TL;DR

- Kuingia kwa kuthibitisha wewe kudhibiti anwani Zcash, badala ya kutumia password
- Miundo miwili ni katika matumizi: ** kusaini changamoto, au ** kutuma malipo ya ulinzi na code katika memo**
- Kwa sababu anwani za kulindwa kuficha usawa na historia, kuthibitisha udhibiti haina yatangaza fedha yako
- Mfano ni mapema. Hakuna kiwango kuthibitishwa bado, na utekelezaji si kuingiliana

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Who is this for?

- Watengenezaji ambao wanataka passwordless kuingia bila kukusanya data binafsi
- Watumiaji ambao wangependa si mkono anwani ya barua pepe kwa kila tovuti
- Mtu yeyote ambaye anataka kuingia bila kuunganisha historia yao ya kifedha kwa akaunti

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> The Problem

Chaguzi nyingi za kuingia zinavuja kitu:

- **Passwords na barua pepe** kuunda akaunti amefungwa kwa utambulisho wako, na wote wawili mwisho katika ukiukaji Dumps
- **Jamii kuingia katika** anaelezea mtoa utambulisho kila mahali wewe login na wakati
- ** Wallet kuingia katika minyororo ya uwazi** ni mbaya zaidi kuliko inaonekana. Kuunganisha mkoba unaweza kutoa tovuti yako yote salio na historia shughuli, kabisa

Kwa kawaida wewe huchagua kati ya urahisi na kufunua mambo.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Why Zcash?

Zcash hutenganisha * kudhibiti uthibitisho* kutoka kwa * kufunua fedha:

- **Anwani za kulindwa** kuweka mizani na historia ya shughuli binafsi, hivyo kuthibitisha wewe kushikilia moja anasema chochote kuhusu nini unaoshikilia
- ** encrypted memo** unaweza kubeba mara moja kuingia code binafsi ndani ya shughuli
- ** Viewing funguo** kuruhusu selective ufunuo, hivyo programu inaweza kupewa kusoma upatikanaji wa nini hasa inahitaji na kitu zaidi

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> How It Works

Njia mbili zimeibuka. Wote mwisho na programu kushikilia kitambulisho imara kwa ajili yenu na hakuna password.

### Njia ya 1: Saini changamoto

1. Programu inazalisha random, matumizi ya mara moja changamoto
2. Mkoba wako ishara kwamba changamoto na ufunguo nyuma ya anwani yako
3. Programu kuthibitisha saini na wewe kuingia katika

Hakuna kitu ni matangazo, hivyo hakuna ada na hakuna kusubiri kwa ajili ya kuzuia. specifikation husika ni: [ZIP 304, Sapling Anwani ya Saini](https://zips.z.cash/zip-0304), ambayo bado ni rasimu, hivyo mkoba msaada kwa ajili ya ujumbe wa kusaini inatofautiana.

### Njia 2: Kuthibitisha na malipo ya ulinzi

1. Programu inazalisha code moja wakati na maonyesho ombi malipo
2. Wewe kutuma ndogo ulinzi shughuli na kanuni hiyo katika memo
3. Programu hutafuta kumbukumbu, inalingana na nambari hiyo, kisha hukuruhusu uingie katika programu.

Hii kazi na pochi kwamba tayari msaada memos leo, ambayo ni wengi wao. biashara ya nje ni kuwa gharama ada mtandao na wewe kusubiri kwa uthibitisho.

### Kuweka anwani binafsi

Programu haina kuhifadhi anwani yako kutambua wewe. baadhi ya utekelezaji hash pamoja na maombi maalum thamani, hivyo kila tovuti anaona tofauti, imara kitambulisho kwa mtumiaji huo. Hiyo inazuia maeneo kutoka kulinganisha maelezo kuunganisha akaunti zako.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Trade-offs

Ni jambo la maana kuelewa kabla ya kutegemea au kujenga juu yake.

∙ Ushawishi uliosainiwa ∙ Malipo yaliyolindwa ∙
|---|---|---|
Gharama. Free. Network ada kwa ajili ya kuingia.
Kasi. Mara moja. Inasubiri uthibitisho.
 msaada mkoba Limited, ZIP 304 ni rasimu. pana, tu mahitaji memos
 Inaacha rekodi ya mlolongo. No. Ndiyo, shughuli ipo.

Mipaka ya pamoja:

- ** Hakuna kupona akaunti kwa default.** Kupoteza ufunguo ina maana kupoteza akaunti, isipokuwa programu miundo kufufua njia
- ** Kutumia anwani tena inaweza kuunganisha wewe.** Kwa kutumia anwani hiyo katika maeneo mengi recreates tatizo kufuatilia, ambayo ni kwa nini programu maalum vitambulisho umuhimu
- ** Hakuna kiwango kuthibitishwa.** Kila mradi ina mpango wake mwenyewe, hivyo kuingia kujengwa kwa moja haifanyi kazi na mwingine
- ** Si kutokujulikana peke yake.** Inaficha fedha yako kutoka programu, lakini bado app unaweza profile nini kufanya mara moja wewe ni ndani ya

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Common Mistakes to Avoid

- Reusing a challenge code. Kila kanuni lazima kuwa matumizi moja na muda wake upite haraka, au mmoja alitekwa inaweza replayed
- Kuuliza watumiaji kutuma kiasi cha maana ya kuingia. malipo ni uthibitisho, hivyo kiasi lazima kuwa trivial
- Kuhifadhi anwani ghafi wakati programu maalum kitambulisho ingekuwa kufanya kazi hiyo
- Kudhani ujumbe kusaini kazi kila mahali. Angalia pochi watumiaji wako kweli kuwa na
- Kufanya memo kuwa siri baada ya tukio hilo. Inathibitisha mtumaji alitenda, si neno la siri

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Projects Exploring This

Hizi zilijengwa kwa ajili ya ** Zcash Login** kufuatilia wa [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon)Ni majaribio badala ya bidhaa za kumaliza, na zinaonyesha jinsi tofauti wazo moja inaweza kujengwa.

- ** ZecAuth** - protocol mkoba uhusiano kwa ajili ya Zcash, katika roho ya nini WalletConnect gani mahali pengine. programu inaonyesha QR code au `zecauth://` link kubeba changamoto pamoja na uwezo ni kuuliza kwa, kama vile kuingia katika, maombi ya malipo au kuangalia upatikanaji. Hakuna shughuli, hakuna ada, hakuna mwingiliano mnyororo. Ni meli maandishi itifaki vipimo kando code
- **ZShield** - turns a shielded address into a W3C DID and an OpenID Connect identity. The browser generates a keypair, the server issues a nonce over a ZIP 304 style interface, the wallet signs it, and the server returns a JWT. Because the result is OIDC compatible, existing apps can consume it without bespoke integration
- **ZecPass** - proves ownership through a signed memo, and is built so the app never learns the user's address at all. It derives an application scoped hash to use as a stable identifier, keeps challenges single use and time bound, and ships a drop in React button with a Node verification library
- ** Portal** - kuingia kwa kutuma shughuli ulinzi na code moja wakati katika memo, mbio juu ya mainnet. mtiririko huo ni reused kufungua maudhui kulipwa na kupeleka au kupokea fedha kutoka kiungo
- ** ZcashMe** - hutumia malipo ya ulinzi kama uthibitisho wa utambulisho, na inazingatia desktop kwa pengo la rununu ili kuingia kwenye kompyuta ndogo hakuhitaji ugani wa kivinjari.
- ** ZBooks** - uhasibu na malipo chombo kwamba matibabu kuingia katika kwa Zcash kama reusable auth primitive badala ya bidhaa yenyewe, na anasoma hazina data kupitia Umoja Full Viewing Key

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Related pages

- [Memo za](/using-zcash/memos) - jinsi encrypted memos kazi, na jinsi ya kuingia code anatembea ndani moja
- [Kuangalia funguo za kuvinjari](/zcash-tech/viewing-keys) - kutoa kusoma tu upatikanaji bila ya utoaji wa nguvu matumizi
- [Kuweka Rekodi na ZEC Shielded](/zcash-use-cases/keeping-records-with-shielded-zec) - sawa kuchagua wazo ufunuo, kutumika kwa uhasibu
- [Tuma Pesa Bila Kuficha Utambulisho Wako](/zcash-use-cases/send-money-without-linking-identity) - kwa nini anwani reuse huathiri faragha

<br/>
