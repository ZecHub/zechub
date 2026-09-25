<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Akwantuo akyi Ahobanbɔ wɔ Zcash

## TL;DR

- Quantum kɔmputa yɛ daakye asiane efisɛ ebetumi abubu public-key cryptography bi a blockchains de di dwuma nnɛ.
- "Post-quantum" kyerɛ cryptography a ɛyɛ adwuma wɔ kɔmputa a ɛnyɛ den so nanso wɔayɛ sɛ ɛbɛko atia ntua a efi daakye quantum kɔmputa so.
- Zcash nyɛ post-quantum koraa nnɛ.
- Shielded Zcash brɛ ɔmanfoɔ nkitahodiɛ data dodoɔ a daakye ntuafoɔ bɛtumi asua, nanso shielded dwumadie ne quantum resistance a ɛdi mũ no nyɛ pɛ.
- Zcash nam nhwehwɛmu, ZIPs, ne nkɔsoɔ ho nsusuiɛ te sɛ ZIP 2005 ne Project Tachyon so reyɛ ahosiesie.
- Ɛsɛ sɛ quantum akyi atutra a ahobammɔ wom bɔ sika, kokoam nsɛm, sika kotoku, nsakrae, ne mmara a wɔpene so ho ban bere koro mu.

## Dɛn Ne Quantum Kɔmputa?

Kɔmputa a ɛyɛ daa de nsɛm sie sɛ bits. Bit biara yɛ emu biara `0` or `1`.

Quantum kɔmputa de quantum bits a wɔfrɛ no qubits di dwuma. Wobetumi de qubits adi dwuma denam algorithms soronko a edi akontaabu mu haw ahorow bi ho dwuma ntɛmntɛm sen kɔmputa a ɛyɛ daa so.

Ɛno nkyerɛ sɛ quantum kɔmputa yɛ ntɛmntɛm wɔ biribiara mu. Asiane a ɛwɔ mu no yɛ pɔtee. Ccryptography binom gyina akontaabu mu haw ahorow a ɛyɛ den yiye ma kɔmputa a ɛyɛ daa nanso ɛyɛ mmerɛw kɛse ma quantum kɔmputa a ɛsõ sɛnea ɛsɛ so.

Wɔ blockchains fam no, nhwɛso a ɛho hia sen biara ne public-key cryptography. Wɔde ɔmanfo nsafe ne nsaano nkyerɛwee di dwuma de kyerɛ sɛ wɔma obi a ɔde di dwuma no kwan sɛ ɔsɛe sika.

## Nea Enti a Blockchains Hwɛ

Blockchains de cryptography di dwuma ma nnwuma ahorow pii:

| Adwinnade a wɔde kyerɛw nsɛm a wɔde kyerɛw nsɛm | Nea ɛyɛ | Quantum nkɛntɛnso |
| --- | --- | --- |
| Digitals nsaano nkyerɛwee | Da no adi sɛ owura no ama kwan sɛ ɔsɛe sika | Asiane kɛse ma elliptic-curve nhyehyɛe a wɔtaa de di dwuma |
| Hash dwumadie ahodoɔ | Si address, bɔhyɛ, Merkle nnua, ne nsɛnnennen | Asiane a ɛba fam, nanso ahobammɔ ho margins ho hia |
| Zero-nimdeɛ adanseɛ | Da no adi sɛ shielded transactions yɛ nokware a wonda nsɛm a ɛkɔ akyiri adi | Egyina adanse nhyehyɛe ne nsusuwii ahorow so |
| Key apam | Boa sika kotoku ma encrypt note data ma receivers | Ɛhia sɛ wɔhwɛ mu yie wɔ quantum threat model ase |

Quantum kɔmputa a ahoɔden wom sɛnea ɛsɛ betumi de nsaano nkyerɛwee nhyehyɛe pii a wɔde di dwuma nnɛ ato asiane mu, a elliptic-curve nsaano nkyerɛwee ka ho. Eyi ho hia efisɛ nsaano nkyerɛwee ne nea ɛma network no hu sɛ wɔde safe a ɛfata maa asɛm bi ho kwan.

Hash dwumadie ahodoɔ no yɛ soronko. Grover algorithm no tumi ma brute force hwehwɛ ntɛmntɛm, nanso ɛnsɛe hash functions wɔ ɔkwan koro no ara so tẽẽ. Ahobammɔ ho mfaso akɛse betumi aboa.

## Dɛn Ne Post-Quantum Cryptography?

Post-quantum cryptography yɛ cryptography a wɔayɛ sɛnea ɛbɛyɛ a ɛbɛkɔ so ayɛ nea ahobammɔ wom wɔ kɔmputa a ɛyɛ daa ne daakye quantum kɔmputa nyinaa ho.

Ɛnkyerɛ sɛ cryptography no de quantum kɔmputa na edi dwuma. Ɛkyerɛ sɛ nhyehyɛe no gyina akontaabu mu ɔhaw ahorow a emu yɛ den so.

Wɔ afe 2024 mu no, NIST yii post-quantum gyinapɛn a edi kan a wɔawie no adi:

- **ML-KEM** ma key a wɔde besi hɔ
- **ML-DSA** ma dijitaal nsaano nkyerɛwee
- **SLH-DSA** ma dijitaal nsaano nkyerɛwee a egyina hash so

Saa gyinapɛn ahorow yi yɛ ade titiriw, nanso blockchain ntumi nsakra algorithm biako mma foforo anadwo biako pɛ. Ɛsɛ sɛ wosusuw mmara a wɔpene so, sika kotoku, hardware sika kotoku, nnwuma akɛse, sika a wɔbɔ, ne kokoam nsɛm nyinaa ho.

## Sɛnea Quantum Asiane Da Wɔ Nkɔnsɔnkɔnsɔn So

Ɔkwan tiawa a wobɛfa so asusuw asiane no ho ne sɛ:

1. Obi a ɔde di dwuma no yɛ safoa abien.
2. Public key anaa signature data no betumi apue wɔ nkɔnsɔnkɔnsɔn so.
3. Ebia daakye quantum attacker betumi de saa ɔmanfo nsɛm no adi dwuma de asua kokoam safe no.
4. Sɛ saa safe no da so ara di sika so a, ebia ɛbɛkɔ asiane mu.

Blockchains a ɛda adi pefee da nsɛm pii adi denam nhyehyɛe so. Address, sika dodow, ne nkitahodi ahorow a ɛfa nkitahodi ho no yɛ baguam. Public key material nso betumi ada adi bere a wɔsɛe sika no.

Eyi yɛ ade biako nti a address a wɔsan de di dwuma no pira. Sɛ wɔsan de di dwuma bio ma wɔn a wɔhwɛ nneɛma no nya data pii a wɔde bɛka ho nnɛ na ɛma daakye ntuafo nya abakɔsɛm mu nsɛm pii a wɔbɛhwehwɛ mu.

## Dɛn na Ɛyɛ soronko wɔ Zcash ho?

Zcash boa nnwuma a ɛda adi pefee ne nea wɔabɔ ho ban nyinaa.

Transparent Zcash yɛ adwuma kɛse te sɛ Bitcoin-style ɔmanfo blockchain dwumadie. Address ahorow, sika dodow, ne abusuabɔ a ɛda aguadi ntam no da adi.

Shielded Zcash yɛ soronko. Shielded transactions de zero-knowledge proofs di dwuma enti network no betumi ahwɛ sɛ asɛm bi di mmara no akyi a ɛnkyerɛ nea ɔde kɔmaa, nea ogye, anaa sika dodow.

Wei ma Zcash nya kokoamsɛm mu mfasoɔ a ɛho hia:

- Wɔtintim nkitahodi ho nsɛm kakraa bi ma obiara hu.
- Wɔn a wɔde di dwuma no kwati sɛ wɔbɛyɛ ɔmanfo sikatua ho mfonini bere a wɔtra hɔ a wɔabɔ wɔn ho ban no.
- Wɔn a wɔbɛhwɛ nneɛma daakye no nni ɔmanfo sikasɛm ho abakɔsɛm pii a ɛsɛ sɛ wɔhwehwɛ mu.
- Nneɛma a wɔpaw a wɔda no adi betumi aba denam safe a wɔbɛhwɛ so sen sɛ wɔbɛhwɛ ɔmanfo kyerɛwtohɔ ahorow a wɔahyɛ da ayɛ so.

Nanso Zcash a wɔabɔ ho ban no nyɛ automatically post-quantum. Shielded pools da so ara gyina cryptographic nsusuwii ahorow so. Sɛe tumi krataa, hyɛ bɔhyɛ ahorow nsow, nullifiers, adanse nhyehyɛe, encryption, ne wallet keys nyinaa hia sɛ wɔhwɛ mu yiye.

Nkyerɛase tiawa no:

> Shielded dwumadie brɛ ɔmanfoɔ a wɔda wɔn ho adi no ase, nanso Zcash da so ara hia sɛ wɔhyɛ da yɛ post-quantum upgrades.

## Zcash Asiane Ho Mfonini

| Mpɔtam hɔ | Beginner nkyerɛkyerɛmu | Post-quantum dadwen |
| --- | --- | --- |
| Address ahorow a ɛda adi pefee | Ɔmanfoɔ address ne ɔmanfoɔ nkitahodiɛ graph | Asiane a ɛte saa ara a ɛwɔ blockchains afoforo a ɛda adi pefee so |
| Sika a wɔde di dwuma ho tumi krataa | Adanse a ɛkyerɛ sɛ wɔma obi a ɔde di dwuma sɛ ɔsɛe | Ebia ɛho behia sɛ wɔde nsaano nkyerɛwee nhyehyɛe ahorow besi ananmu anaasɛ wotu kɔ baabi foforo |
| Nsɛm a wɔakyerɛw a wɔabɔ ho ban | Ankorankoro kyerɛwtohɔ ahorow a ɛsom bo wɔ shielded pools mu | Ebia nneɛma bi behia nsusuwii foforo anaasɛ nnwinnade a wɔde san nya ahoɔden |
| zk-SNARKs | Adanse a ɛkyerɛ sɛ nnwuma a wɔabɔ ho ban no yɛ nokware | Adanse-nhyehyɛe nsusuwii ahorow hia sɛ wɔsan hwɛ mu |
| Wallet scanning a wɔde hwehwɛ nneɛma mu | Sɛnea sika kotoku hwehwɛ na decrypt nsɛm a wɔagye | Key apam ne note encryption hia sɛ wɔsan hwɛ mu |
| Tukɔ foforo | Sika a wɔde bɛkɔ cryptography a ahobammɔ wom so | Ɛsɛ sɛ wokwati sika a wɔhwere ne kokoam nsɛm a ɛbɛtwetwe |

## Sɛnea Zcash Resiesie ne ho

### Zcash Wɔ Network Upgrade Adeyɛ

Zcash asesa ne cryptography pɛn. Sapling maa ɛyɛɛ mmerɛw sɛ wɔde bedi dwuma wɔ aguadi a wɔabɔ ho ban mu. NU5 de Orchard, Unified Addresses, ne Halo 2 bae.

Eyi ho hia efisɛ post-quantum ahoboa nyɛ software patch a ɛwɔ line biako. Ɛhwehwɛ sɛ wɔyɛ ntwamutam a wɔayɛ no biako, wɔsesa sika kotoku, wɔyɛ akontaabu, ne bere a wɔde bɛma wɔn a wɔde di dwuma no atu akɔtra baabi foforo.

Zcash nkɔsoɔ a atwam no kyerɛ sɛ abɔdeɛ a nkwa wom no wɔ osuahu a ɛfiri cryptography dedaw mu kɔ nsusuiɛ foforɔ so.

### Halo And Orchard Reduced Older Assumptions

Halo 2 no na Orchard, Zcash nnɛyi ɔtare a wɔabɔ ho ban no de di dwuma. Nkɔsoɔ baako a ɛho hia ne sɛ Halo yii hia a ɛhia sɛ wɔyɛ nhyehyɛeɛ a wɔgye di ma Orchard adanseɛ nhyehyɛeɛ no.

Ɛno ne ahobammɔ a ɛba wɔ quantum akyi no nyɛ ade koro. Ɛda so ara fata efisɛ ɛkyerɛ sɛ Zcash betumi asi cryptographic adansi nneɛma atitiriw ananmu bere a nsusuwii a eye kyɛn so wɔ hɔ no.

### ZIP 2005 Twe adwene si Quantum Recoverability so

ZIP 2005 no asɛmti ne "Orchard Quantum Recoverability." Ɛhyɛ nsakraeɛ a wɔayɛ sɛ wɔde bɛboa Orchard dwumadiefoɔ ma wɔasan anya sika anaasɛ wɔatu akɔtena baabi foforɔ ho nyansa sɛ quantum ntua a wɔde tia nsusuiɛ dedaw no bɛyɛ nea mfasoɔ wɔ so a.

Recoverability nyɛ ade koro ne post-quantum ahobammɔ a edi mũ. Ɛyɛ teateaa na ɛda so ara wɔ mfaso:

- Quantum akyi ahobammɔ a edi mũ bɔ mmɔden sɛ ebesiw quantum ntua ano sɛ ɛrenyɛ adwuma.
- Recoverability ma anokwafo a wɔde di dwuma no nya ɔkwan pa sɛ cryptography dedaw no bɛyɛ nea ahobammɔ nnim a.

Wɔ wɔn a wɔrefi ase fam no, susuw eyi ho sɛ nhyehyɛe a wɔde fi mu ntɛm ara. Ɛnsi ɔdan no nyinaa ananmu, nanso sɛ apon dedaw no yɛ mmerɛw a, ɛboa nkurɔfo ma wofi dan dedaw no mu dwoodwoo.

### Project Tachyon Hwɛ Protocol Nkɔsoɔ Kɛseɛ

Project Tachyon yɛ Zcash nkɔsoɔ a wɔahyɛ ho nyansa a ɛtwe adwene si scale, sync, ne state nkɔsoɔ so. Ne baguam beae no ka sɛ nyansahyɛ no botae ne sɛ ɛbɛtew nkitahodi so, atew validator state nkɔso so, na wɔanya post-quantum kokoamsɛm a edi mũ sɛ nea efi mu ba.

Esiane sɛ Tachyon yɛ nyansahyɛ nti, ɛda so ara gyina mfiridwuma adwuma, nhwehwɛmu, ne mpɔtam hɔfo pene so ansa na wɔayɛ adwuma. Wɔte ase yiye sɛ Zcash nhwehwɛmu a ɛyɛ nnam ne nkɔso akwankyerɛ no fã, ɛnyɛ sɛ ade a wɔn a wɔde di dwuma no wɔ dedaw nnɛ.

### Nhwehwɛmu Ne Gyinapɛn Rekɔ

Crypography wiase a ɛtrɛw no nso rekɔ so. NIST post-quantum gyinapɛn ahorow no ma wɔn a wɔde di dwuma no nya adansi nneɛma a emu yɛ den ma nsaano nkyerɛwee ne nneɛma atitiriw a wɔde besi hɔ. Nhwehwɛmufo a wonni nimdeɛ biara kɔ so sua adanse nhyehyɛe ahorow a ebetumi akura mu wɔ quantum nsusuwii ahorow ase.

Zcash betumi anya saa adwuma no so mfaso, nanso ɛsɛ sɛ ɛda so ara yɛ nsakrae ma ɛne blockchain a ɛkora kokoam nsɛm so.

## Akwan a Ebetumi Aba Daakye Nkɔso

### Post-Quantum Sika a Wɔde Di Dwuma Ho Tumi

Ebia awiei koraa no Zcash behia sika a wɔsɛe no ho tumi krataa a ɛnmfa ne ho nto quantum-vulnerable signature schemes so.

Eyi betumi de post-quantum signatures, hybrid signatures, anaa adwini foforo adi dwuma. Hybrid design de classical ne post-quantum checks nyinaa di dwuma wɔ nsakrae bere mu, enti nhyehyɛe no nnyina adwene biako pɛ so.

Asɛnnennen no ne ne kɛse ne ɛka a wɔbɔ. Quantum akyi nsaano nkyerɛwee betumi ayɛ kɛse asen nnɛyi nsaano nkyerɛwee, a ɛka asɛm no kɛse, bandwidth, sika a wɔbɔ, mobile sika kotoku, ne hardware sika kotoku.

### Address Foforo Ne Key Formats

Mpɛn pii no, cryptography foforo hia safe ne address foforo. Anka wɔn a wɔde di dwuma no behia ɔkwan a emu da hɔ a wɔfa so tu fi format dedaw so kɔ format a ahobammɔ wom so.

Ɛsɛ sɛ atutra no yɛ mmerɛw wɔ sika kotoku mu. Ɛnsɛ sɛ wɔn a wɔde di dwuma no mu dodow no ara te cryptographic mu nsɛm biara ase na ama wɔakɔ so anya ahobammɔ.

### Atutena a Wɔkora Kokoam Nsɛm So

Migration yɛ nea ɛyɛ mmerɛw titiriw ma Zcash. Sɛ nnipa pii a wɔde di dwuma no de sika fi atare dedaw mu kɔ atare foforo mu wɔ akwan a ɛda adi pefee so a, atutra no ankasa betumi ama nsɛm apue.

Ɛsɛ sɛ atutra ho nhyehyɛe pa bɔ:

- Sika a wɔde di dwuma
- Nea ɔde di dwuma no kokoam nsɛm
- Wallet a ɛne ne ho hyia
- Sesa mmoa
- Hardware sika kotoku mmoa
- Network consensus ahobammɔ

### Post-Quantum Adanse Nhyehyɛe Nhwehwɛmu

Nsaano nkyerɛwee a wɔde besi ananmu no nnɔɔso. Zcash shielded design nso gyina zero-nimdeɛ adanse ne bɔhyɛ ahorow so.

Ebia ɛho behia sɛ wɔsan hwɛ adwuma a wɔbɛyɛ daakye mu anaasɛ wɔsesa:

- zk-SNARK nsusuwii ahorow
- Polynomial bɔhyɛ ahorow
- Fiat-Shamir akasa atia hashes
- Hyɛ bɔhyɛ ahorow nsow
- Nullifier adansi a wɔde yɛ adwuma
- Merkle dua ho nsusuwii ahorow
- Hyɛ encryption ne viewing-key suban nsow

Ebia nneɛma bi yɛ nea wogye tom a wɔayɛ nsakrae wɔ parameters mu. Ebia nneɛma afoforo a wɔde yɛ nneɛma no behia sɛ wɔyɛ nneɛma foforo.

## Nhwɛso ahorow a Wɔde Fi Ase

### Nhwɛso 1: Ɔpon Dedaw no

Fa no sɛ sikakorabea bi a wɔatoto mu a ɛyɛ den nnɛ. Ebia adwinnade foforo bi a wɔbɛyɛ daakye bebue saa apon dedaw no ntɛm.

Post-quantum cryptography te sɛ nea wɔde adwini bi a wɔnhwɛ kwan sɛ adwinnade foforo no bebubu besi lock no ananmu.

Wɔ blockchain fam no, ɛyɛ den sɛ wobɛsesa lock no efisɛ ɛsɛ sɛ wallet, node, exchange, ne hardware device biara te adwini foforo no ase.

### Nhwɛso 2: Ɔmanfo Nkrataa Adaka

Blockchain data a ɛda adi pefee te sɛ nea wode krataa biara a wogye to ɔmanfo adaka mu daa. Sɛ obiara ntumi nkenkan nhwɛso biara nnɛ mpo a, ebia daakye nnwinnade besua pii akyiri yi.

Shielded Zcash bɔ mmɔden sɛ wɔbɛkwati sɛ wobetintim saa nkrataa a wɔde gye sika no wɔ nea edi kan no mu. Ɛno boa ma kokoamsɛm a ɛtra hɔ kyɛ, nanso ɛsɛ sɛ wɔda so ara hwɛ afiri a ɛbɔ nhyehyɛe a wɔabɔ ho ban no ho ban no mu ma daakye a ɛyɛ quantum.

### Nhwɛso 3: Nhyehyɛe a Wɔde Fi Afi Mu

Sɛnea wobetumi asan anya ahoɔden no te sɛ ɔkwan a wobɛfa so afi mu ho nhyehyɛe ansa na ogya atɔ. Wowɔ anidaso sɛ worenhia, nanso ahobammɔ wom kɛse sɛ wobɛyɛ no ntɛm sen bere a tebea a egye ntɛmpɛ asi.

ZIP 2005 fata saa adwene yi ma Orchard nsɛm a wɔakyerɛw.

## Nea Wɔn a Wɔde Di Dwuma Betumi Ayɛ Ɛnnɛ

Ɛho nhia sɛ wɔn a wɔde di dwuma no bɔ hu. Ɔmanfo quantum kɔmputa akɛse a etumi bubu blockchain cryptography a wɔde adi dwuma no nni hɔ nnɛ.

Suban pa da so ara boa:

- Pɛ Zcash a wɔabɔ ho ban a wɔde di dwuma bere a ɛbɛyɛ yiye no.
- Kwati sɛ wobɛsan de address ahorow adi dwuma bio.
- Ma sika kotoku ahorow no nyɛ foforo.
- Di Zcash network upgrade ho amanneɛbɔ ahorow akyi.
- Hwɛ ZIPs ne sika kotoku akwankyerɛ a ɛfa recoverability anaa migration ho.
- Mfa no sɛ dwumadi a ɛda adi pefee yɛ kokoam de.
- Mfa sika a egyina nsɛmmɔnedi so nkɔ baabi foforo; twɛn akwankyerɛ a emu da hɔ fi Zcash developers a wogye wɔn di ne wallet akuw hɔ.

## Nsɛnnennen

Post-quantum upgrades yɛ den ma blockchain biara.

Nsɛnnennen a ɛtaa ba no bi ne:

- Safe akɛse ne nsaano nkyerɛwee
- Nkitahodi akɛse
- Ka a wɔbɔ wɔ nokwaredi ho a ɛkɔ soro
- Bandwidth a wɔde di dwuma kɛse
- Ahobammɔ ho akontaabu foforo
- Hardware sika kotoku mmoa
- Mobile sika kotoku adwumayɛ
- Nsesa ne mmofra a wɔhwɛ wɔn so nkabom
- Privacy leaks bere a woretu akɔtra baabi foforo no
- Mpɔtam hɔfo apam a ɛfa nsakrae a wɔpene so ho

Wɔ Zcash fam no, ɛnyɛ nea ɛyɛ den sen biara ne sɛ wɔbɛma sika a wɔde asie no akɔ so ayɛ nea wobetumi asɛe no nko. Ɔfã a ɛyɛ den ne sɛ wobɛma sika akɔ so asɛe bere a wokora kokoamsɛm a ɛma Zcash yɛ soronko no so.

## Tɔfabɔ

Awiei koraa no, quantum kɔmputa ahorow betumi de cryptography ahorow bi a blockchain ahorow de di dwuma no ato asiane mu. Post-quantum cryptography ne mmuae a ɛbɛkyɛ, nanso ɛsɛ sɛ wɔde di dwuma yiye.

Zcash nyɛ post-quantum koraa nnɛ. Nanso, Zcash wɔ ahoɔden a mfasoɔ wɔ so: nnwuma a wɔabɔ ho ban no brɛ ɔmanfoɔ a wɔda wɔn ho adi no ase, ntwamutam no wɔ abakɔsɛm a ɛfa cryptographic upgrades ho, na mprempren nhwehwɛmu te sɛ ZIP 2005 ne Project Tachyon de wɔn ani asi daakye quantum asiane so dedaw.

Wɔ wɔn a wɔrefi ase no fam no, adwene titiriw no yɛ mmerɛw: kokoamsɛm nnɛ ma daakye data a wɔbɛda no adi no so tew, na sɛ wɔde ahwɛyiye yɛ no foforo a, ebetumi aboa Zcash ma wakɔ quantum-era ahobammɔ a emu yɛ den so a wɔmfa dwumadie mmɔ afɔre.

## Nkratafa a Ɛfa Ho

- [Atare a Wɔabɔ ho Ban](/using-zcash/shielded-pools) - sedee Zcash shielded transactions bɔ nkitahodi ho nsɛm ho ban
- [Halo](/zcash-tech/halo) - Zcash adanse nhyehyɛe a enni nhyehyɛe a wogye di
- [ZKP & ZK-SNARKS NKYERƐKYERƐMU](/zcash-tech/zk-snarks) - sedee zero-nimdee adansedie ye adwuma wo Zcash mu
- [Nsafe a Wɔde Hwɛ](/zcash-tech/viewing-keys) - sedee selective disclosure yɛ adwuma ma shielded Zcash
- [Zcash Shielded Agyapadeɛ](/zcash-tech/zcash-shielded-assets) - Daakye agyapadeɛ a wɔabɔ ho ban ne ankorankoro agyapadeɛ mmoa
- [Kokoamsɛm sɛ Nnyinasosɛm Titiriw](/privacy/privacy-as-a-core-principle) - a enti a sikasm mu kokoamsɛm ho hia

## Nsɛm a wɔde gyinaa so

- [NIST: Wodii kan wiee post-quantum encryption gyinapɛn ahorow](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [NIST Akyi Quantum Cryptography Dwumadie](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Adwuma a Wɔyɛe Tachyon](https://tachyon.z.cash/)
- [Zcash Protocol no ho nkyerɛkyerɛmu](https://zips.z.cash/protocol/protocol.pdf)
- [Halo 2 Nhoma no](https://zcash.github.io/halo2/)
