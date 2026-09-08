# Kokoam nsɛm a wogye

## TL;DR

- Private information retrieval, anaa PIR, ma afiri bi fa ade biako fi server bi database mu a server no nsua ade a wɔsrɛɛ no
- Zcash hia eyi efisɛ kokoam sika kotoku ntumi mmisa server bi sɛ nnwuma bɛn na ɛyɛ n’ankasa de a ɔmfa ne ho mma
- Ɛnnɛ sika kotoku twe na scan data pii sen sɛnea ehia, na ɛno ne ade titiriw nti a syncing yɛ brɛoo
- PIR bɛma sika kotoku bi agye n’ankasa data nkutoo wɔ kokoam, na ayi saa toa no afi hɔ bere a ɛma kokoam nsɛm kɔ so yɛ adwuma no
- Ɛyɛ nhwehwɛmu beae a ɛyɛ nnam ma Zcash, ɛwɔ tumi wɔ nsusuwii mu, na wɔreyɛ no mfaso ama sika kotoku ankasa

<br/>

## Hena na eyi yɛ ma no

- Obiara a wasusuw sɛnea ankorankoro sika kotoku nya n’ankasa sika a ɛnyɛ nea ɛtwetwe nea ɛwɔ mu no ho
- Wɔn a wɔaba foforo a wɔkɔ so hu sɛ wɔka PIR ho asɛm ka Zcash scaling adwuma ho
- Akenkanfo a wɔpɛ adwene no kan na cryptography a ɛwɔ ase no di kan

<br/>

## Ɔhaw a PIR di ho dwuma ma Zcash

Zcash de sie onii a asɛm bi yɛ ma no. Saa kokoamsɛm no de asɛmmisa bi a ɛyɛ fɛre ba: sɛ netɛw no ntumi nhu nnwuma a ɛyɛ wo de a, ɛbɛyɛ dɛn na w’ankasa sika kotoku no ahu?

Ɛnnɛ mmuae no yɛ nea ɛda adi pefee. Sika kotoku ntumi mmisa server bi sɛ nnwuma bɛn na ɛyɛ me dea, efisɛ saa asɛmmisa no bɛda nea Zcash rebɔ mmɔden sɛ ɛde besie no adi pɛpɛɛpɛ. Enti mmom sika kotoku no twe data pii na ɛsɔ ade biara hwɛ wɔ mpɔtam hɔ de hwɛ nea ɛyɛ ne de. Ɛyɛ adwuma, na ɛkora kokoam nsɛm so, nanso ɛyɛ brɛoo na emu yɛ duru. Saa scanning yi yɛ ade titiriw biako nti a wallet syncing betumi ate nka sɛ ɛyɛ brɛoo.

Nea eye sen biara bɛyɛ ɔkwan a sika kotoku bi bɛfa so abisa server bi sɛ ɔmma no n’ankasa data pɛpɛɛpɛ, na wagye, a server no rensua nea wɔsrɛɛ no ​​da. Ɛno ne nea kokoam nsɛm a wogye de ma.

<br/>

## Nea PIR yɛ

Private information retrieval yɛ cryptographic kwan a ɛma client kenkan nsɛm biako fi server bi database mu a ɛnkyerɛ nsɛm a ɔkenkanee no nkyerɛ server no.

Fa no sɛ nhomakorabea bi a wubetumi anya nhoma pɔtee a wopɛ, nanso nhomakorabea sohwɛfo no nhu nhoma ko a wɔde maa wo da. Wo nsa ka wo ade no, na w’anigye no kɔ so yɛ kokoam. PIR yɛ saa adwene no akontaabu kwan so de, a wɔde di dwuma wɔ database biara mu.

Wɔde mfe du du pii asua adwene no ho ade wɔ cryptography mu. Chor, Goldreich, Kushilevitz, ne Sudan na wɔdii kan de baeɛ wɔ afe 1995 mu, na wɔkyerɛkyerɛɛ multiple server kwan no mu, na server baako a ɛdi kan no dii akyire wɔ 1997 mu firii Kushilevitz ne Ostrovsky hɔ. Ɛnyɛ biribi a Zcash na ɔyɛe, ɛyɛ afuw a wɔde asi hɔ a mprempren Zcash de redi dwuma wɔ ɔhaw ankasa a ɛyɛ den ho.

<br/>

## Sɛnea PIR yɛ adwuma, wɔ ɔfa a edi kan no mu

Akwan abien a ɛtrɛw wɔ hɔ a wɔfa so kyekye PIR, na nsonsonoe no ho hia.

Nea edi kan no de server ahorow pii di dwuma. Client no de asɛmmisa no fã bi mena server ahorow pii no mu biara, na ɔka wɔn mmuae bom wɔ mpɔtam hɔ. Server biako biara nhu nea ɛdɔɔso a ɛbɛma wasua nea wɔsrɛɛ no. Eyi yɛ nea etu mpɔn, nanso egyina server ahorow no a wɔne wɔn ho wɔn ho nyɛ biako so, a ɛyɛ den sɛ wɔbɛhyɛ ho bɔ wɔ wiase ankasa mu.

Nea ɛto so abien no de server biako ne anifere cryptography di dwuma sen sɛ wɔde nnipa pii bedi dwuma. Ɛha na akraman no de ne ho to adwinnade soronko bi a wɔfrɛ no homomorphic encryption so, na eyi ne akwankyerɛ a mfaso wɔ so kɛse ma deployments ankasa, efisɛ enhia server ahorow pii a ɛnyɛ colluding.

<br/>

## Adwinnade no: homomorphic encryption

Homomorphic encryption yɛ encryption bi a ɛma server bi bu akontaa wɔ data so bere a ɛda so ara yɛ encrypted. Server no ma mmuae a ɛteɛ a wɔabɔ no kokoam a enhu gyinapɛn ahorow a ɛwɔ ase no da.

Adwene a ɛwɔ single-server PIR a wɔasi wɔ saa kwan yi so no akyi ni. Client no pɛ ade a ɛto so abiɛsa fi list bi mu. Ɛkyekye asɛmmisa a, sɛ yɛbɛka no yiye a, ɛyɛ yiw a wɔabɔ no kokoam ma gyinabea abiɛsa ne dabi a wɔabɔ no kokoam ma gyinabea foforo biara. Wɔ server no fam no, saa asɛmmisa yi yɛ dede a ntease nnim ara kwa, entumi nkyerɛ gyinabea a ɛkura yiw no.

Afei server no de ne database no ne saa encrypted query yi bom denam homomorphic encryption no su soronko no so, na ɛde ade biara a wɔde asie no dɔɔso denam encrypted yiw anaa dabi a ɛne no hyia no so na ɔde nea efi mu ba no bom. Nea ɛba ne encrypted package biako a ɛwɔ ade a na client no pɛ no pɛpɛɛpɛ, na biribiara nkyerɛ nea na ɛyɛ. Client no decrypt saa package no na ɔkenkan ne ade no. Server no abua asɛmmisa no a onnim asɛmmisa no da.

Nkyerɛaseɛ a ɛyɛ den, a wɔfrɛ no symmetric PIR, de ahotosoɔ a ɛtɔ so mmienu ka ho: afɛfoɔ no sua adeɛ a ɔbisaeɛ no nko ara na ɛnsua biribiara mfa nsɛm foforɔ biara a ɛwɔ database no mu ho. Ɛno bɔ database no ho ban ne client no nso.

<br/>

## Mfiridwuma ho akenkanfo a wɔbɛhwehwɛ mu yiye

Wɔde nnɛyi server biako nhyehyɛe ahorow asi lattice cryptography so, mpɛn pii no adesua a mfomso ahorow wom. Client no asɛmmisa no yɛ vector a ɛyɛ ciphertexts, encryption a ɛyɛ baako wɔ target index no so ne zero wɔ baabi foforo, na encryption no yɛ additively homomorphic, enti server no betumi de ciphertexts aka ho na ɔde plaintext database entries abɔ no dodow a enni decrypt.

Server no di database no sɛ matrix, de encrypted selection vector no di dwuma, na ɛsan de ciphertext biako a ɛdecrypt kɔ row a wɔpɛ no so. Esiane sɛ wontumi nhu nsonsonoe a ɛda asɛmmisa no ne dede a ɛba kwa no ntam nti, server no nnya nsɛm biara mfa index no ho.

Abakɔsɛm mu akwanside no ayɛ ɛka a wɔbɔ bere nyinaa. Naively, ɛsɛ sɛ server no ka biribiara a wɔakyerɛw wɔ database no mu ma asɛmmisa biara, a ne bo yɛ den wɔ akontaabu mu, na ciphertexts no yɛ akɛse, a ne bo yɛ den wɔ bandwidth mu. Nnansa yi nhwehwɛmu tow hyɛ eyi so denam preprocessing so, nhyehyɛe te sɛ SimplePIR ne FrodoPIR ma server no siesie database no ansa na bere no adu na ɔde hint ketewaa bi ma client biara, pia adwuma no fã kɛse no ara kɔ offline phase mu sɛnea ɛbɛyɛ a live queries bɛyɛ ntɛmntɛm. Mfaso a mfaso wɔ so wɔ ɔfã bi ne sɛ wobu adansi a egyina lattice so nso sɛ ɛko tia quantum ntua, a ɛne Zcash kwan a ɛtrɛw a ɛkɔ quantum akyi kokoamsɛm so no hyia.

<br/>

## PIR wɔ Zcash mu

PIR yɛ mmɔdenbɔ a wɔrebɔ sɛ wɔbɛma Zcash ayɛ kokoam ne ntɛmntɛm wɔ scale mu no fã.

Wallet scanning bottleneck a yɛadi kan aka ho asɛm no ne nea wɔde wɔn ani asi so. Adwuma a wɔyɛ wɔ Valar Kuo no mu reyɛ kokoam nsɛm a wɔfa so nya akwan sɛdeɛ ɛbɛyɛ a sika kotokuo bi bɛtumi agye n’ankasa data afiri server bi mu a server no rensua nsɛm a wɔbisaeɛ. Concrete application biako ne sɛ wɔrehwɛ nullifiers wɔ kokoam. Nullifier yɛ agyiraehyɛde soronko bi a wotintim bere a wɔasɛe krataa bi, na ɛma wogyae sika koro no ara a wɔsɛe no mprenu. Mpɛn pii no, ɛho hia sɛ sika kotoku hwɛ sɛ ebia nullifier bi a wɔde ama no apue de besi nnɛ, ɔkwan foforo so no, sɛ ebia wɔda so ara nsɛe krataa bi, na sɛ woyɛ saa denam server bi so nnɛ a, ebetumi ama nkyerɛwde bɛn na wɔrebisa ho asɛm no akɔ. Private information retrieval ma sika kotoku no bisa saa asɛm no a ɛnkyerɛ nullifier a ɛho hia no. Eyi te scaling adwuma afoforo ho, a Project Tachyon ne node software foforo ka ho, a wɔn botae ne sɛ wobeyi adwumayɛ anohyeto ahorow a esiw kokoam sika kotoku ano nnɛ no afi hɔ.

Ɛho hia sɛ wodi nokware wɔ asɛnka agua no ho. Eyi yɛ nhwehwɛmu ne mfiridwuma a ɛyɛ nnam, ɛnyɛ ade a wɔawie a wɔde amena. Wɔde adwene no asi hɔ yiye na wɔde akwankyerɛ no asi hɔ, nanso PIR a wɔbɛma ayɛ adwuma yiye ama da biara da sika kotoku a ɛwɔ mfiri a ɛnyɛ den so no yɛ ɔfã a ɛyɛ den a wɔreyɛ ho adwuma mprempren no pɛpɛɛpɛ.

<br/>

## Adwene a ɛnteɛ a wɔtaa nya

- PIR de adeɛ a wobisaeɛ no sie, ɛnyɛ sɛ ɛde sie sɛ wo ne server no dii nkitaho koraa, network-level metadata yɛ adeɛ a ɛhaw adwene a ɛyɛ soronko
- PIR nyɛ Zcash nko ara, ɛyɛ cryptographic adwinnade a ɛwɔ hɔ nyinaa a Zcash de redi dwuma wɔ sika kotoku mu kokoamsɛm ho
- Faster syncing fi PIR yɛ botae a ɛrekɔ so, ɛnyɛ ade a ɛwɔ sika kotoku mu dedaw
- Biribiara a wobɛtwe na woayɛ scan wɔ mpɔtam hɔ, mprempren kwan no, yɛ kokoam nanso ɛyɛ brɛoo, PIR botae ne sɛ ɛbɛkora kokoamsɛm no so bere a ɛreyi brɛoo no afi hɔ

<br/>

## Nkratafa a ɛfa ho

- [Zcash Sikakorabea Syncing](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - adee nti na syncing y adwuma sedee eye nnɛ
- [Lightwallet Nodes a Wɔde Di Dwuma](https://zechub.wiki/zcash-tech/lightwallet-nodes) - a ɛyɛ hann client model PIR no bɛtu mpɔn
- [zk-SNARKs a wɔde wɔn ho hyɛ mu](https://zechub.wiki/zcash-tech/zk-snarks) - a ɛyɛ cryptographic adwinnade titiriw foforo a ɛwɔ Zcash kokoamsɛm akyi
- [Quantum Akyi Ahobammɔ](https://zechub.wiki/zcash-tech/post-quantum-security) - a enti a akwan a egyina lattice so ho hia ma daakye
