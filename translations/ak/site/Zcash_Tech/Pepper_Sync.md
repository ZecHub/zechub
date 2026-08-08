<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zingo 2.0 - Pepper Sync (Nneɛma a ɛwɔ hɔ ma wo)

## TL;DR

* Pepper Sync is the synchronization engine introduced in Zingo! 2.0, the open-source Zcash wallet built by Zingo Labs.
* Ɛde ne ho to hɔ wɔ ɔkwan a ɛnyɛ tee so sen sɛ wobɛyɛ kyinhyia no nketenkete, enti wo sika ne nneɛma foforo nyinaa bɛdu ntɛmntɛm.
* Progress is saved continuously. If the connection drops or the app closes, syncing resumes from where it stopped rather than restarting.
* Wubetumi atotɔ ansa na woayɛ no pɛpɛɛpɛ.
* Adwuma a wɔabɔ ho ban no yɛ kokoam adwuma bere nyinaa.

## Nkyerεkyerεmu Titiriw

Zingo 2.0 is the latest version of the Zingo! wallet, a lightweight, open-source wallet built for the Zcash community. The star of this release is Pepper Sync, a major upgrade that completely rethinks how wallets connect with the blockchain.

Tete no, sɛ wo di syncing a na ɛyɛ mmerɛ dodo, mfomsoɔ yɛ den, ne resource-heavy ma ɛtɔ mmere bi a ɛhia sɛ wosane firi aseɛ. Pepper Sync sesa saa nneɛma yi nyinaa. Ɛma syncing yɛ ntɛmntɛm, bɔkɔɔ, gyidie wɔ mu, na ɛnyɛ adwuma pii w'afedie so, bere koro no ara nso ɛma wotumi hwɛ tratract ho nsɛm yiye.

Sɛ woyɛ obi a woadi kan asɔ Zcash ahwɛ, anaa w'ayɛ nipa dedaw bi na wode wallet bebree di dwuma no, Pepper Sync ma adwuma yi yɛ yie paa.

### Pepper Sync mfoni no mu nsɛntitiriw

Pepper Sync de nkɔsoɔ bebree aba:

- Nkrataafa a Ɛwɔ Ntɛm - Wo sika krataa no bɛyɛ krado wɔ simma kakraa bi mu, ɛnyɛ nnɔnhwerew.
- Akwankyerԑ a' ԑfata - Wɔyε nkrataa no mu kͻkͻso, na wכn pεεsε sε wobesane ahwehwε bio.
- Sɛ wo connection no to a, syncing bɛtoa so wɔ baabi a egyaee.
- Ne mu yɛ hare na ne ho nni asɛm - Wɔayɛ no ma fon, kɔmputa nkenkan so, ne mfiri foforo a emu ahoɔden sua.
- Nkyerɛkyerɛmu a emu da hɔ - Bere-amannɔne mu nkɔso ho nsɛm foforo ma nneɛma nhyia.
- Ahintasɛm-Ahwɛfoɔ - Akwan a wɔfa so di dwuma no yɛ kokoam adwuma bere nyinaa.

### Nea ɛyɛ papa sen kan no

Zingo nsεm a wͻtaa de di dwuma dada no taa ma nnipa nya ahoyeraw esiane bere tenten, mfomso ho nsɛnkyerɛne ne nnwumakuo pii fa mu. Pepper Sync siesie saa ɔhaw ahorow yi:

¢kyerÉ›ma: Zingo nsesae a atwam no. Zingo 2.0 wÉ" Pepper Sync so, yÉ›de bÉ'ne wo adi nkyerÉ›w sÉ› wode di dwuma yiye ama ne ho afonofo bi abere biara na watumi de asensεm yi ano É-E1⁄2rÉ› afa nsem anaa kasa foforo mu.
| ------------------ | -------------------------------------- | -------------------------------------------- |
Sync Speed. Slow, especially on first setup. Much faster initial and ongoing sync. (Sync speed) slow, especially at the first set up. much quicker initial and continuous sync (Initial and ongoed sync). slower, especially in first set-up. much faster Initial and continued sync
 Error Handling. Ɛtɔ da bi a, nneɛma kɔ yiye na emu nso ankɔ yie koraa. YƐde pɛsɛmenkomenya ma no yɛ adwuma ntɛmntɛm.
Ԑwͻ sε w'afidie no yε nea εnyε "nehyεε" ma wɔn a wɔaba foforo. Ɛwɔ ahobanbɔ, ne tebea mu da hɔ na nsesaeԑ biara nni ho.
 Device Performance. High CPU/memory usage. Optimized for smooth resource use.

Ne tiawa mu no: mprempren, syncing yɛ ntɛmntɛm, ɛyɛ nea wotumi de ho to so kɛse na ntease wom.

## Adwene a wohwɛ mu / Sɛnsεm

Think of an older wallet sync like reading a very long book from page one, out loud, before you are allowed to say anything about it. Stop halfway, and you start again from page one. Pepper Sync reads the same book, but it keeps a bookmark, reads the chapters that matter to you first, and lets you talk about the story before you have finished the last page.

Nhyehyɛeɛ a edi kan no nyinaa bu nsɛm mu nsakrae bi sɛ ɛyɛ adwuma hunu; Pepper Sync de yɛ biribi te sɛ ɔhome.

### Adwelielilɛ nwo adehilelɛ

- Detailed Flow - Ɛkyerɛ adwuma no nyinaa. ![Detailed Flow](https://github.com/user-attachments/assets/119c13ec-76be-42bd-b558-762d09275a1b)

- Simplified Flow - Hwε ma daa wͻn a w'ɔde di dwuma no. ![Simplified Flow](https://github.com/user-attachments/assets/9b612cbd-f24d-4472-9b87-0f2c908bb368)

## Fa Wo Ho Hyɛ Ahonya Mu Kɔɔ Firi Ase

### Sɛnea Pepper Sync yɛ adwuma (ɔkwan a ɛnyɛ den)

Sɛ anka wobɛyɛ blockchain no mu nhwehwɛmu bio wɔ afã akɛseɛ a emu yɛ duru so no, Pepper Sync di dwuma nketenkete bi mu - bere nyinaa na ɛkora wo baabi.

1. Fa wo ho bɔ - Kuro no di dwuma wɔ network mu.
2. Fetch Blocks - Wɔtwe data no so nkakrankakra.
3. Verify - Nkrataa a wɔde di dwuma no yɛ nea wɔagye ato mu.
4. Hyɛ nsɛm a wɔabɔ ho ban no so - Fa w'ankasa wo nsɛm sie bere nyinaa.
5. Ntua no ho nketenkete - Akatabo no yɛ adwuma yiye.
6. Fa nkɔanim kora - Gyae na fa so yɛ adwuma yiye.
7. Di awieɛ - Adaka no ayɛ krado sɛ wobɛyɛ adwuma.

## Nea Ɛfa Ho a Ɛbɛboa Wo Wɔ Asetram

### Henanom na wonya Pepper Sync so mfaso?

- New Users - Wobɛtumi asiesie sika nkotoku ntɛmntɛm a wontwentwɛn wɔn nan ase.
- Da biara Users - Syncing a w'atumi de ho ato so ma ntotosoɔ dudu no yɛ nea mfaso wɔ so sɛ wode di dwuma daa.
- Developers & Testers - Sync mmere a ɛyɛ tiawa kyerɛ sɛ wɔsɔ hwɛ ntɛmntɛm.
- Mobile & Light Devices - Zingo seesei yɛ adwuma yie mpo wɔ hardware a wɔn tumi so nni hɔ.

### Deɛ enti a ɛho hia ma Zcash

Zcash gyina ntɔnnennen a wɔde bɔ ho ban so, ɛne ahintasɛm mu nnwinnade ahorow a tumi wom no biako. Nanso ahobammɔ yɛ nea mfaso wɔ so ara sɛ wotumi hu bi nkutoo.

Pepper Sync boa ma:

- Nkɔsoɔ a ɛtwe obi ba mu no so atew - Wɔn a wɔyɛ foforo betumi afi ase ntɛm.
- Da biara da a wɔde di dwuma no, ɛboa - Adesamma tumi nya adansedi wɔ address ahorow a wɔn ho ban so.
- Ahyehyɛde no nkɔanim a wɔhyɛ nkuran - Akwampanin mu osuahu pa ma wɔde di dwuma, dwumadi ne dwumadie pii.

Ɛnam sika kotoku mu osuahu a Pepper Sync ma ɛyɛ den no so hyɛ Zcash amansan nhyehyɛe nyinaa den.

### Ahyɛaseɛ: Zingo 2.0 a wɔde adi dwuma no mu kɔ so yɛ adwuma.

1. Twe Kɔntakt no - Nya nea ɛfata firi [Zingo GitHub releases page] so](https://github.com/zingolabs/zingolib)
2. Sete Wo Kɔntakt - Yɛ foforo anaa san fi mfitiase asɛm bi a ɛwɔ hɔ mu. [Zingo 2.0 ne Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Ma Pepper Sync Run - Hwɛ nkɔso ho nkataho bere a wo sika krataa no resan aba. [Pepper Synch Run](https://x.com/ZingoLabs/status/1961871338441724191)
4. Start Using Zcash - Send and receive shielded ZEC as soon as syncing completes.
5. Hyɛ w'adwene wɔ nsɛm a ɛhaw wo ho - Sɛ app no to anaa ne nsɛso yera a, Pepper Sync bɛtoa so ayɛ adwuma.

## Mfomso a Wɔtaa Di

**Sunsum Pepper Sync sɛ ne ankasa sika nkotoku**. Pepper sync yɛ nsunsuansoɔ afiri a ɛwɔ Zingo! no mu, ɛnyɛ dwumadi soronko bi. Wode Zingo si hɔ; Peppersync na ɛgyina ase wɔ ho.

** Sɛ yɛgye tom sɛ syncing a ɛreyɛ ntɛm no kyerɛ sɛ woahwere ahobammɔ**. Ɛnkasa nti na wɔde saa data yi di dwuma, wɔhyehyɛ mu, ne sɛnea wɔyɛ cache ho adwuma, ɛnyɛ nsɛm pii a wɔbɛda adi. Akwantuo a w'abɔ ho ban no bɛtena kokoam bere nyinaa.

**Woma w'ani da so sɛ ɛsɛsɛ wo di sync ansa na watumi atotɔ**. Atotɔ a wobɛtoto no yɛ Pepper Sync dwumadie titiriw, enti ɛnhia sɛ wotwɛn kɔsi sɛ wallet no bɛdu chain tip ho.

## FAQ - Nsɛmmisa a wɔtaa bisa

Asԑmmisa: So ɛsɛ sԑ me san hwɛ no bio bere biara a mibue nkotoku no?

Mmuae: Dabi. Pepper Sync kora nkɔso so, enti wo de no di dwuma firi beae a etwa to nkutoo.

Asԑmmisa: Na sԑ me internet no gyae a?

Mmuae: Sync gyina na ɛtoa so akyiri yi a ɛnhyɛ ase bio.

Asԑmmisa: So me ahobanbɔ bԑyԑ huam bere a mereko ne no adi nkitaho?

Mmuae: Yiw. Nneɛma a wɔde bɔ ho ban no yɛ kokoam nneɛma ara kwa.

Asԑmmisa: Bere tenten ahe na edi kan a wo bԑyԑ sync no?

Mmuae: Mpɛn pii no, ɛnyɛ nnɔnhwerew na ɛyɛe; egyina wo afidie ne intanɛt so.

Asԑmmisa: So metumi de atwerԑde no adi dwuma ansa na syncing awie?

Mmuae: Yiw. Pepper Sync boa ma wototɔ nneɛma ansa na w'ayɛ no pɛpɛɛpɛ, enti enhia sɛ wo twɛn kosi sɛ sika kotoku no bedu chain tip no ho.

## Nkɔsoɔ a ɛbae:

Zingo 2.0 Pepper Sync no, syncing nyɛ ade a ɛhaw adwene wɔ wallet ahorow mu bio. Seesei ɛyɛ ntɛmntɛm, gyinaye na emu yɛ mmerɛw ma wɔn a wɔyɛ foforo no, ɛma wotumi de di dwuma daa.

Sɛ yɛhwɛ nea wɔde adi dwuma no a, ɛkyerɛ sɛ wɔntwɛn kakraa bi na wɔanya ahobammɔ pii. Ɛkyerɛ sɛ ɛyɛ nhyɛaseɛ pa ma adwumayɛfo no. Zcash mu nneɛma nyinaa gyinabea ho nti, ɛyɛ ɔkwampa foforo wɔ akwantuo a ɛbɔ anibuei kwan so ama obiara anya hokwan de ayɛ adwuma.

Zingo 2.0 a Pepper Sync ka ho no nyɛ nkɔso kɛkɛ; ɛyɛ ɔkwampa bi wɔ hɔ ma obi ankasa, na wotumi de di dwuma.

## Nkrataafa a Ɛwɔ Ho Nsɛm

- [Zcash Kuro no a wɔde di dwuma wɔ bere koro mu](/zcash-tech/zcash-wallet-syncing)  sɛnea akwantufoɔ a wɔde wɔn ho to so yɛ adwuma wɔ Zcash mu.
- [Lightwallet Nodes] (Node) nkrataafa a wɔde di dwuma wɔ wiase nyinaa.](/zcash-tech/lightwallet-nodes)  mfidie a wɔde di dwuma te sɛ Zingo no yɛ adwuma wɔ ne ho.
- [Zaino](/zcash-tech/zaino)  indexer a Zingo kuo no ayɛ.
- [Nkrataa nkekaho](/wallets)  Zcash sika nkotoku ne emu nsɛntitiriw no nyinaa.

## Nkɔso Adesua Ho Nneɛma A Yɛbɛsua

- [Zingo! GitHub akoraeɛ](https://github.com/zingolabs/zingolib)
- [Zcash Community Forum] Yԑn botae sԑ y'agye atom.](https://forum.zcashcommunity.com/)
- Amansan Nhyehyɛe - [Zingo Labs Twitter](https://twitter.com/ZingoLabs)

___
___
