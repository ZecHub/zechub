<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash Lightwallet Nodes a ɛwɔ hɔ no

## Nnianimu

Nnipa dodow no ara nam sika kotoku a emu yɛ hare so de Zcash di dwuma, a ɛntwe blockchain no nyinaa. Mmom no ɛne server bi a ayɛ saa adwuma no dedaw kasa. Saa krataafa yi kyerɛkyerɛ nea saa server ahorow no yɛ, nea wobetumi ahu ne nea wontumi nhu fa wo ho, sɛnea wobɛfa wo nkitahodi no so wɔ Tor so, ne sɛnea wobɛsesa server a wo sika kotoku de di dwuma no.

Software abien na ɛsom sika kotoku a emu yɛ hare nnɛ. **lightwalletd** yɛ mfitiaseɛ dwumadie, a wɔakyerɛw wɔ Go mu. **Zaino** yɛ indexer foforo a wɔakyerɛw wɔ Rust mu, a wɔasi sɛ zcashd deprecation adwuma no fã.

## Nea light wallet server yɛ

Sika kotoku server a ɛyɛ hare te wo sika kotoku ne Zcash blockchain ntam na ɛma ɛyɛ nkɔnsɔnkɔnsɔn no ho hwɛbea a ɛyɛ den wɔ bandwidth mu. Ɛyɛ nneɛma abiɛsa ma wo.

Ɛsom compact blocks. Sɛ́ anka ɛde blocks mũ no nyinaa bɛmena no, ɛde kratasin ketewaa bi a nea sika kotoku hia na ama wɔahu sika a wɔatua nkutoo na ɛwɔ so mena kɔ ne address a wɔabɔ ho ban no so, ahu sika a wɔsɛee no wɔ ne nsɛm a wɔakyerɛw no so, na ama n’adansefo ayɛ foforo.

Ɛde wo nnwuma no kɔma afoforo. Sɛ wode mena a, wo sika kotoku no de asɛm a woawie no ma server no, na ɛde kɔ network no so.

Ɛbua nkɔnsɔnkɔnsɔn nsɛmmisa, te sɛ mprempren ɔsorokɔ ne sikatua ho nsɛm a wo sika kotoku hia.

Wo sika kotoku da so ara yɛ kokoam adwuma no wɔ mpɔtam hɔ. Ɛkura wo nsafe, ɛsɔ blocks hwɛ de hwehwɛ wo nsɛm a woakyerɛw, na ɛkyekyere na ɛde ne nsa hyɛ nnwuma ase wɔ wo mfiri no so.

## Nea server no betumi ahu ne nea entumi nhu

Eyi ne ɔfã a ɛnyɛ den sɛ wubenya mfomso. Wo safe no mfi wo mfiri no mu da, nanso ɛno ne sɛ server no nsua wo ho hwee.

Nsɛm a wɔde gyina hɔ ma wɔ ha ne [Zcash sika kotoku app ahunahuna nhwɛso](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), a sɛ eyi ho hia wo a, ɛfata sɛ wokenkan ne nyinaa. Ɛde ɔtamfo ahorow pii si hɔ. Nea ɛho hia ma krataafa yi ne ɔtamfo a obetumi ahwɛ traffic a ɛda wo sika kotoku ne intanɛt ntam, ne server ne intanɛt ntam. Obiara a ɔde server no di dwuma no fi awosu mu wɔ saa gyinabea no fã bi, efisɛ wo sika kotoku no ne wɔn di nkitaho tẽẽ.

Fi ase de nea wɔabɔ ho ban no. Wɔ ɔtamfo biara a ɔwɔ model no mu, a obi a wasɛe server no ka ho, "entumi nsua ɔdefo no cryptographic key material biara (spending keys, viewing keys, seed phrase, ne nea ɛkeka ho)", entumi nwia wo sika, na entumi mma womfa sika a woanhyɛ da sɛ wode bɛmena no nkɔ. Sika dodow ne memos a ɛwɔ nnwuma a wɔabɔ ho ban koraa mu no kɔ so yɛ encrypted.

Afei nea wɔammɔ ho ban nso wɔ hɔ. Ahunahuna nhwɛso no bobɔ eyinom din sɛ mmerɛwyɛ ahorow a wonim wɔ ɔtamfo a ɔhwɛ kar akwan so ho:

| Mmerɛwyɛ | Sɛnea |
|:--|:--|
| Woreka onipa ko a woyɛ | "Ɔtamfo no nim ɔdefo no IP address, a ebetumi ama wɔakɔ ɔdefo no nipasu ankasa so" |
| Telling roughly baabi a wowɔ | Wo IP a wobɛhwehwɛ "wɔ geolocation database mu de abɛn wɔn beae" |
| Saa asɛm no a wobɛka ne bere a wode asɛm a wɔabɔ ho ban kɔmaa anaa wo nsa kaa | Sending "de bandwidth pii di dwuma, a ɛda adi ɛwom mpo sɛ wɔde encrypted nkitahodi no". Model no hyɛ no nsow sɛ adeyɛ a ɛne sɛ wɔde nneɛma bɛmena na wɔagye no da adi wɔ server no ankasa so |
| Nkitahodi dodow a woayɛ wɔ bere mu a wobɛkan | Bandwidth nhyehyɛe koro no ara, a wɔahu wɔ bere tenten mu |
| Spotting sikatua nhyehyɛe ahorow a ɛsan ba bio | Hwɛ bere a dwumadi kɔ so |
| Adwuma a wobɛyɛ sɛ ebia address bi yɛ wo dea anaa | Ɔtamfo a onim address bi dedaw "betumi de sika akɔ saa address no so na wahwɛ sɛ ebia bandwidth spikes wɔ hɔ anaa" afi wo sika kotoku mu a ɛrefa no |

Model no nso hyɛ no nsow sɛ asɛm a ɛyɛ daa no fa no sɛ "ahotoso abusuabɔ bi wɔ nea ɔde di dwuma ne lightwalletd server dwumadie no ntam".

Enti nsɛm a wɔaboaboa ano a ɛyɛ nokware ne eyi. Light wallet server ntumi nsɛe wo sika, na entumi nkenkan sika dodow anaa memos a ɛwɔ wo shielded transactions no mu. Nea ɛwɔ beae pa sɛ wubesua ne wo IP address ne bere a wobɛyɛ wo dwumadi, na saa abien no bom betumi aka pii afa obi ho. Shielded transactions bɔ nea ɛkɔ blockchain no so ho ban. Wɔn ankasa, mfa wo nkitahodi a ɛkɔ server no so no nsie.

## Ɔkwan a wɔfa so fa Tor so

Tor bubu link a ɛda wo IP address ne wo wallet traffic ntam, na eyi identifier a emu yɛ den sen biara wɔ table a ɛwɔ atifi hɔ no fi hɔ.

Mmoa wɔ Rust nhomakorabea ahorow a Zcash sika kotoku pii si so no mu. zcash_client_backend ka Tor module a wɔasi wɔ so ho [Arti](https://tpo.pages.torproject.net/core/arti/), Tor Rust dwumadie, enti sika kotokuo tumi fa sync, transaction broadcast ne price lookups fa Tor so a wɔmfa Tor client a ɔyɛ soronko nkɔ.

Zaino developers no nso de akyinnyegye koro no ara di dwuma, na wɔfa ahunahuna nhwɛso no ka tẽẽ: "ɛho hia sɛ wɔde anonymous transport protocols (te sɛ Nym anaa Tor) di dwuma de kata clients' identities fi Zcash indexing servers so".

Wɔ **ZODL** mu no, Tor yɛ nhyehyɛe a ɛwɔ Nsiesiei a Ɛkɔ Anim mu. Wallet no release notes kyerɛ wɔn a wɔde di dwuma no kɔ manual connection mode "plus enabling Tor in Advanced Settings" sɛ "wɔpɛ sɛ wɔtew metadata exposure so", na app no ​​de ma sɛ wobɛdan Tor ansa na woasan de wallet bi aba, a ɛyɛ bere a anka IP foforo bɛkyekyere wallet abakɔsɛm nyinaa.

Kɔkɔbɔ abien. Tor de wo IP sie server no, nanso ɛnsesa nea server no sua fi abisade ahorow a woyɛ no mu. Na onion routing de latency ka ho, enti syncing gye bere tenten. W’ankasa server a wode di dwuma no kwati ahotoso asɛmmisa no wɔ ɔkwan foforo so, efisɛ saa bere no, nea ɔyɛ adwuma no ne wo.

## Zaino, Rust indexer no

[Zaino na ɔkyerɛwee](/site/Zcash_Tech/Zaino) yɛ indexer a Zingo kuw no kyerɛwee wɔ Rust mu, a wɔasi sɛ wɔde besi lightwalletd ananmu sɛ zcashd deprecation adwuma no fã. Ɛsom hann clients, full clients ne block explorers, kenkan chain data a "Zebra anaa Zcashd full validator" kura mu.

Ɛwɔ nkɔsoɔ a ɛyɛ nnam ase, a version 0.7.0 a wɔayi no adi wɔ Oforisuo 2026. Ɛbɔ ne tirim sɛ ɛbɛtena akyi a ɛne lightwalletd hyia wɔ baabi a ɛbɛyɛ yie, enti sika kotokuo bɛtumi atwe adwene asi so a wɔrensan nkyerɛw bio.

Zaino wɔ n’ankasa krataafa a ɛwɔ architecture diagrams, enti saa krataafa yi ka ne dwumadie sɛ light wallet server nko ara.

## Server list a wɔahyehyɛ

No [hosh.zec.abotan a ɛwɔ hɔ](https://hosh.zec.rocks/zec) dashboard di ɔmanfoɔ servers ne wɔn akwahosan akyi, na ɛyɛ beaeɛ a wobɛhwɛ deɛ ɛwɔ soro ankasa. [status.zec.abotan a ɛwɔ hɔ](https://status.zec.rocks/) kyerɛ ɔsom tebea.

Server ahorow a wɔakyerɛw wɔ saa dashboard no so bere a yɛrekyerɛw eyi no:

| Server | Nsɛm a Wɔahyɛ no Nsow |
|:--|:--|
| zec.abotan:443 | Wɔakyerɛw mpɔtam hɔ awiei ahorow wɔ ne nkyɛn wɔ na.zec.rocks, eu.zec.rocks, ap.zec.rocks ne sa.zec.rocks |
| zec-node.cakewallet.com: 443 na ɛwɔ hɔ a, ɛyɛ nea ɛyɛ nwonwa Wɔ Cake Wallet no domɛn so |
| zec.0xrpc.io: 443 na ɛwɔ hɔ | 0xRPC na ɛhwɛ so, a ɛma ɔmanfoɔ endpoints a wontua hwee ma nkɔnsɔnkɔnsɔn dodoɔ bi na ɛsrɛ ntoboa mfa ntua tumi |
| zaino.unsafe.zec.rocks:443 | A Zaino instance. Note the hostname, treat it as experimental |
| testnet.zec.abotan:443 | Testnet, a Zaino testnet nhwɛsoɔ a wɔakyerɛw wɔ zaino.testnet.unsafe.zec.rocks |

Hwɛ dashboard no mu sen sɛ wubenya saa list yi mu ahotoso. Operators ba na wɔkɔ, na kratafa te sɛ eyi nyin.

## Server a ɛwɔ wo sika kotoku mu a wobɛsesa

Ɛfata sɛ woyɛ sɛ wopɛ sɛ wopaw adwumayɛfo a wowɔ ne mu ahotoso, wotrɛw dwumadi mu wɔ adwumayɛfo nyinaa mu, anaasɛ wotwe adwene si w’ankasa so a.

Menu akwan a ɛwɔ aseɛ ha no teɛ berɛ a wɔyɛɛ krataafa yi foforɔ, nanso wallet interfaces tu, enti fa no sɛ hint mmom sen sɛ wobɛfa ɔkwan pɔtee bi so. Hwehwɛ Advanced Settings anaa server a wobɛpaw.

#### ZODL

Kan no na wɔfrɛ no Zashi. Cog a ɛwɔ soro nifa so, afei Advanced Settings. Tor te screen koro no ara so. ZODL nso de Switch server shortcut ma bere a sync huammɔdi bi aba esiane sɛ server no bere atwam nti.

#### Ywallet na ɔkyerɛwee

Cog a ɛwɔ soro nifa so, afei Zcash tab no.

![Ywallet server settings](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Hamburger menu a ɛwɔ soro benkum so, afei Settings, afei twe kɔ fam.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash na ɛyɛ

Hamburger menu a ɛwɔ soro benkum so, afei Settings, afei Advanced.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Wɔfaa saa screenshots no wɔ March 2025 mu na apps no de nea wɔayi no adi no amena fi saa bere no, enti ebia buttons no akɔ.

## W’ankasa wo de a wotu mmirika

Ɔkwan a emu yɛ den sen biara ne sɛ wobɛyɛ w’ankasa adwumayɛfo, na eyi ahotoso ho asɛmmisa no fi hɔ koraa. Server abien no nyinaa yɛ open source: [lightwalletd a wɔde ahyɛ mu](https://github.com/zcash/lightwalletd) wɔ Kɔ na [Zaino na ɔkyerɛwee](https://github.com/zingolabs/zaino) wɔ Rust mu. Wɔn baanu nyinaa kenkan fi validator a edi mũ mu, enti wo nso wobɛpɛ [Zebra](/site/Zcash_Tech/Zebra_Full_Node).

## Tɔfabɔ

Sika kotoku a emu yɛ hare ma wo shielded pool a enni disk space, a ɛyɛ aguadi pa. Ma nea woredi gua no mu nna hɔ kɛkɛ. Server no ntumi nnye wo sika anaasɛ nkenkan wo sika a wɔabɔ ho ban no, nanso ɛwɔ beae pa a wubetumi ahu wo IP address ne bere a woreyɛ adwuma. Fa kwan fa Tor so, hyɛ da paw wo adwumayɛfo, anaasɛ tu mmirika w’ankasa de.

**Wɔyɛɛ no ​​foforo nea etwa to:** August 2026
