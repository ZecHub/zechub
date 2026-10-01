<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# So Zcash yɛ nea ɛwɔ Quantum akyi?

## Mmuae tiawa

Dabi, ennya nyɛɛ saa.

Efi bere a wɔyɛɛ Ironwood nkɔso no, Zcash yɛ **quantum-recoverable** ma sika a wɔde asie wɔ Ironwood pool no mu. Ɛno yɛ anammɔn ankasa, nanso ɛnyɛ ade koro ne sɛ wobɛtra quantum akyi ahobammɔ. ZIP 2005, spec a ɛwɔ n'akyi no ka saa tẽẽ: nsakrae no "mma n'ankasa mma protocol no nyɛ ahobammɔ wɔ quantum atamfo ho". Ɛsiesie Ironwood sika sɛnea ɛbɛyɛ a wobetumi de akɔ daakye Recovery Protocol mu bere a wɔadum mprempren cryptography no pɛn no.

Saa krataafa yi tetew nea Zcash bɔ ho ban nnɛ, nea Ironwood sesaa, nea ɛda so ara da adi, ne nea ɛyɛ nsusuwii ara kwa. No [tebea pon so](#status-table) bɛn awiei no kyerɛ baabi a afã biara gyina ne bere a etwa to a wɔhwɛɛ mu.

<br/>

## Hena na eyi yɛ ma no

- Obiara a wahu "quantum-recoverable" na wakenkan no sɛ "quantum-proof"
- Holders a wɔresi gyinae sɛ ebia wɔde sika bɛkɔ Ironwood
- Akyerɛwfo ne ahwɛfo a wohia mmuae a wonya fi fibea a wɔde bɛtwe adwene asi nkurɔfo so

Sɛ wopɛ quantum computing ankasa ho nsɛm a, fi ase fi ase [Akwantuo akyi Ahobanbɔ wɔ Zcash](/zcash-tech/post-quantum-security).

<br/>

## Nea enti a asɛmmisa no yɛ nea ɛyɛ basaa

"Post-quantum" nya su te sɛ nea ɛyɛ agyapade biako. Wɔ Zcash no anyɛ yiye koraa no ɛyɛ nsɛmmisa anan a ɛsono emu biara, na ɛsono mmuae:

1. **Privacy.** So quantum attacker betumi ahu nea otuaa hena ne sika dodow ahe?
2. **Spending.** So quantum attacker betumi asɛe sika a ɛnyɛ wɔn de?
3. **Inflation.** So quantum attacker betumi abɔ ZEC afi biribiara mu?
4. **Recovery.** Sɛ ɛsɛ sɛ wodum mprempren cryptography no a, so nokwaredifo a wɔde di dwuma no da so ara betumi anya wɔn sika afi mu?

Ironwood sesa asɛmmisa a ɛto so anan no mmuae nkutoo, na ɛyɛ nsɛm a wɔakyerɛw wɔ Ironwood ɔtare no mu nkutoo.

Ahunahuna a ɛwɔ eyi nyinaa akyi ne ɔtowhyɛfo a obetumi abu discrete logarithms wɔ elliptic curves a Zcash de di dwuma no so. Quantum kɔmputa kɛse a ɛdɔɔso a ɛde Shor algorithm di dwuma no bɛyɛ ɔkwan biako a wɔbɛfa so ayɛ saa. ZIP 2005 kyerɛ sɛ **single** discrete logarithm a wobɛhwehwɛ no dɔɔso sɛ ɛbɛma nneɛma bo akɔ soro a wopɛ anaasɛ wobɛwia sika.

<br/>

## Nea Zcash bɔ ho ban nnɛ

Saa pon yi kyerɛkyerɛ protocol no mu sɛnea ɛretu mmirika mprempren, tia ɔtowhyɛfo a obetumi abubu discrete logarithms. Ɛfa ɔtare biara a wɔabɔ ho ban ho, Ironwood ka ho, ɛfiri sɛ Ironwood de Orchard circuit, Halo 2 adanseɛ ne RedPallas nsaano nkyerɛwee korɔ no ara di dwuma sɛ Orchard.

| Agyapadeɛ | Tia quantum ntuafo nnɛ | Nea Ironwood sesae |
|---|---|---|
| Kokoamusɛm | Kura sɛ ɔtowhyɛfo no nnim wo address a wɔabɔ ho ban no a. Adanse ne nsaano nkyerɛwee a wɔasan ayɛ no foforo biara ntumi nkɔ. Sɛ ɔtowhyɛfo no nim address no ampa a, wobetumi decrypt nsɛm a wɔde amena no, a dedaw a wɔakora so afi nkɔnsɔnkɔnsɔn no mu ka ho. | Hwee. ZIP 2005: "Tebea a ɛfa Privacy ho no nsakrae mma pool biara." |
| Sika a wɔsɛe no | Ɛnyɛ nea wɔabɔ ho ban. Obi a ɔtow hyɛ nkurɔfo so betumi ayɛ adanse atoro anaasɛ wasɛe nsaano nkyerɛwee na wawia ade afi ɔtare biara a wɔabɔ ho ban mu, wɔ address ahorow a wonhuu bi da mpo ho. | Biribiara nni hɔ de besi nnɛ. Ahobanbɔ no ba bere a woadan daakye akɔ Recovery Protocol no so nkutoo. |
| Nneɛma boɔ sorokɔ | Ɛnyɛ nea wɔabɔ ho ban. Obi a ɔtow hyɛ nkurɔfo so betumi ayɛ adanse a ɛte sɛ nea ɛfata na wayɛ ZEC wɔ ɔtare biara a wɔabɔ ho ban mu, ebia obiara renhu. Anohyeto biako pɛ ne.. [turnstile a wɔde dannan nneɛma](/zcash-tech/the-turnstile): ɔtare biara ntumi ntua sika a ɛboro ne sika a wɔakyerɛw ato hɔ no so. | Biribiara nni hɔ de besi nnɛ. Ironwood nsɛm a wɔakyerɛw mprempren de wɔn ho ahyɛ wɔn mu nsɛm nyinaa mu wɔ ɔkwan bi so a ɛnsɛ sɛ quantum ntuafo tumi yɛ atoro, a ɛno ne nea daakye Recovery Protocol hia na ama nneɛma a wɔde ma no akɔ so ayɛ nea ɛfata. |
| Pɛ deɛ ayera | Sprout, Sapling ne Orchard nsɛm a wɔakyerɛw no nni ɔkwan biara a wɔfa so san nya ahoɔden. Sɛ wodum wɔn protocol ahorow no wie a, biribiara a aka wɔ wɔn mu no bɛyɛ nea wontumi nkɔ hɔ. | Ironwood krataa biara yɛ nea wobetumi asan anya wɔ nnyinasosɛm mu. Sapling anaa Orchard nkyerɛwde biara nni hɔ a ɛte saa. |

Transparent ZEC yɛ asɛm a ɛyɛ soronko. Wobetumi ayɛ ne ECDSA nsaano nkyerɛwee no atoro bere a wɔahu ɔmanfo safe no pɛn no. Wɔ address a ɛyɛ mmerɛw a ɛyɛ daa a ɛba bere a edi kan a wosɛe sika fi mu no, na mfɛnsere tiawa bi nso wɔ hɔ bere a asɛm bi te ase a wɔansi so dua wɔ mempool no mu. ZIP 2005 nsakra saa nneɛma no mu biara.

<br/>

## Nea Ironwood sesae

Ironwood yɛ NU6.3 ntwamutam a wɔayɛ no foforo. Ɛyɛɛ adwuma wɔ Mainnet so wɔ block 3,428,143 wɔ 28 July 2026. N’atirimpɔw titiriw ne supply integrity wɔ Orchard soundness bug no akyi (hwɛ [Ironwood](/zcash-tech/ironwood) kratafa), ne quantum recoverability a efi ZIP 2005 a wɔde menae sɛ ne fã.

- **Note format foforo.** Ironwood output note biara de quantum-recoverable format di dwuma (hyɛ no nsow plaintext lead byte `0x03`). Mprempren wonya nkyerɛwde no randomness fi ne fields nyinaa mu, enti wɔde hash kyekyere note no wɔ emu nsɛm no ho sen sɛ wɔde elliptic-curve math nkutoo bɛkyekyere no.
- **Ɔkwan a wɔfa so san nya Ironwood nkyerɛwde nkutoo.** ZIP 326 da no adi pefee sɛ Ironwood nkyerɛwde biara yɛ nea wotumi san nya na Orchard nkyerɛwde biara nni hɔ. Wallet nhyehyɛe bi nsakra saa.
- **Orchard gyaee boɔ foforɔ a wɔbɛgye.** Coinbase akatua ntumi nkɔ Orchard, na Orchard ntumi mfa nkɔ Orchard address foforɔ so bio, enti boɔ foforɔ a wɔabɔ ho ban no si fam wɔ Ironwood.
- **Wɔka kyerɛ sika kotokuo sɛ wɔmfa biribiara nkɔ baabi foforɔ.** ZIP 2005 se ɛsɛ sɛ sika kotokuo de sika a wɔdi so nyinaa, a transparent, Sprout ne Sapling sika ka ho, kɔ Ironwood nkrataa mu ntɛm ara sɛdeɛ ɛbɛyɛ yie, na kɔ so yɛ saa berɛ a sika foforɔ aba.

Nea Ironwood ansakra: cryptography a wɔde di dwuma de sɛe sika na wɔde di adanse nnɛ, note encryption, ne biribiara a ɛfa ZEC.

<br/>

## Anohyeto ahorow a ɛda so ara wɔ hɔ

**Ɛwɔ exposure window.** Efi Ironwood's activation kosi sɛ wobedum protocols dedaw no, quantum attacker da so ara betumi awia, inflate anaa siw sika wɔ shielded pool biara mu. ZIP 2005 frɛ eyi "bere a ɛho hia a wɔde bɛda wɔn ho adi" na ɛbɔ kɔkɔ sɛ ntua a ɛba bere a ɛrekɔ so no da so ara betumi apira obi a okura no tumi a ɔde bɛsan anya ahoɔden akyiri yi. Ɛno nti na ɛka sɛ ɛsɛ sɛ Zcash dum Orchard, Sapling ne Sprout **ansa na** quantum ntua abɛyɛ nea ebetumi aba.

**Switch-off no nni date.** ZIP nhyehyɛe biara nni hɔ a ɛbɛdum Orchard anaa Sapling. ZIP 2003, a ɛyɛ Draft ne NU7 kandifoɔ, bɛma Sprout sika a wɔsɛe no ayɛ adwuma denam version 4 nkitahodiɛ a ɛremma ho kwan no so. Nkɔmmɔbɔ a ɛfa Sapling a wɔbɛtwe wɔn ho nkutoo ho fii ase wɔ forum no so wɔ April 2026 mu.

**Recovery Protocol no nwiei.** ZIP 2005 no kyerɛkyerɛ mu nko ara, na ɛka sɛ nsɛm no "ɛbɛtumi asesa". Wɔmfa ho biribiara nni dwuma.

**Twa mprempren, decrypt akyiri yi.** Hyɛ no nsow sɛ ciphertexts ma Ironwood, Orchard, Sapling ne Sprout nyinaa yɛ baguam wɔ nkɔnsɔnkɔnsɔn no so. Obi betumi de asie nnɛ na wayɛ decrypt akyiri yi, sɛ ɔno nso nim address a ogye no a. Address biara a wubetintim anaa wode bɛma no yɛ saa asiane no fã. ZIP 2005 se "wɔresusuw nsakrae afoforo a wɔbɛyɛ wɔ protocol mu" ama daakye a wɔde bɛkɔ baabi foforo.

**Wɔnnkata sika a ɛda adi pefee so.** Address a wɔasɛe no afi, anaasɛ wɔasan de adi dwuma bio no ada ɔmanfo nsafe adi. Recoverability ma address ahorow bi a ɛda adi pefee no yɛ adwene ara kwa de besi nnɛ (ZIP 2007, hwɛ ase hɔ).

**FROST nhyehyɛe ahorow no wɔ kɔkɔbɔ foforo.** Wɔ FROST, obiara a ɔde ne ho hyɛ mu no kura quantum spending key (`qsk`), na ebia quantum attacker a okura no betumi awia. ZIP 2005 kamfo kyerɛ sɛ wɔmfa FROST sika nkɔ post-quantum protocol a edi mũ a threshold mmoa wom bere a biako wɔ hɔ no.

<br/>

## Nsusuwii ahorow ne nhwehwɛmu

Eyinom mu biara nni hɔ a ɛte ase.

- **Recovery Protocol.** Adwinnade a ɛbɛma wɔasɛe Ironwood sika ankasa wɔ nsakrae no akyi. Wɔakyerɛ wɔ ZIP 2005 mu, wɔankyerɛ.
- **ZIP 2007, recoverability ma address ahorow bi a ɛda adi.** ZIP nɔma a wɔakora so nkutoo a nkɔmmɔbɔ wɔ mu [zips#1302 na ɛwɔ hɔ](https://github.com/zcash/zips/issues/1302). Adwene no ne sɛ P2PKH ne P2SH outputs a wɔanda ne public keys adi da no betumi ayɛ nea wobetumi asan anya, a guarantees a ɛyɛ mmerɛw sen Ironwood.
- **Post-quantum kokoamsɛm ma address ahorow a wonim.** Bue fi 2022 wɔ [zips#1133 na ɛwɔ hɔ](https://github.com/zcash/zips/issues/1133), a ɛhyɛ no nsow sɛ Zcash "wɔabɔ wɔn tirim dedaw sɛ ɛbɛyɛ post-quantum private" bere a wɔde address ahorow sie kokoam na ɛbisa sɛnea wɔbɛtrɛw saa mu akɔ address ahorow a wonim, sɛ nhwɛso no, wɔde post-quantum key encapsulation nhyehyɛe te sɛ Kyber (mprempren ML-KEM). Wɔ June 2026 mu no [zips#1307 na ɛwɔ hɔ](https://github.com/zcash/zips/issues/1307) hyɛɛ nyansa sɛ ZIP a wɔde bɛkyerɛw mprempren kokoam nsɛm ne nneɛma a wobetumi asiesie.
- **Project Tachyon.** Nkɔsoɔ a wɔahyɛ sɛ wɔmfa nkɔ soro. Ne site no se anka ebenya "full post-quantum privacy" sɛ side effect, denam payment delivery a ɛbɛtu afi nkɔnsɔnkɔnsɔn mu na wɔde post-quantum key exchange adi dwuma so. Wɔka ne data nhomakorabea a ɛwɔ adanse, Ragu, ho asɛm sɛ "wɔda so ara resi". Hwɛ [Dwumadie Tachyon](/zcash-tech/project-tachyon).
- **A fully post-quantum Zcash.** Post-quantum adanse, nsaano nkyerɛwee ne bɔhyɛ ahorow bom. Wɔadi akyi wɔ mu [zips#1134 na ɛwɔ hɔ](https://github.com/zcash/zips/issues/1134), open since 2016. spec anaa bere nhyehyɛe biara nni hɔ.

<br/>

## Gyinabea pon

Last checked 13 September 2026. ZIP's ti tebea ne ne ntwamutam tebea yɛ nneɛma soronko: ZIP 2005 da so ara ka sɛ "Wɔahyɛ ho nyansa" wɔ ne ti mu ɛwom mpo sɛ wɔde ne mmara adi dwuma wɔ Mainnet so fi July 2026.

| Adeɛ | ZIP tebea | Network tebea | Da | Farebae |
|---|---|---|---|---|
| Ironwood pool a quantum-recoverable nsɛm a wɔakyerɛw (NU6.3) wom | ZIP 2005 a wɔahyɛ ho nyansa, ZIP 229 ne ZIP 258 Nsusuwii | **Wɔayɛ adwuma** wɔ Mainnet so | 28 Ɔpɛpɔn 2026, block 3,428,143 | [ZIP 2005 na ɔkyerɛwee](https://zips.z.cash/zip-2005), [ZIP 258 na ɛwɔ hɔ](https://zips.z.cash/zip-0258) |
| Wɔtoo Orchard mu ma ɛsom bo foforo | ZIP 2006 Wɔakora so, mmara wɔ ZIP 258 mu | **Wɔayɛ adwuma** wɔ Mainnet so | 28 Ɔpɛpɔn 2026 | [ZIP 258 na ɛwɔ hɔ](https://zips.z.cash/zip-0258) |
| Walets a wɔde sika kɔ Ironwood | Akwankyerɛ a ɛwɔ ZIP 2005, ZIP 318 ne ZIP 326 (Draft) mu | Wɔkamfo kyerɛ, egyina wo sika kotoku so | Efi 28 Jul 2026. Ɔberɛfɛw da | [ZIP 318 na ɛwɔ hɔ](https://zips.z.cash/zip-0318), [ZIP 326 na ɛwɔ hɔ](https://zips.z.cash/zip-0326) |
| Nneɛma a Wɔde Yɛ Nneɛma a Wɔde Yɛ Adwuma | Wɔakyerɛkyerɛ mu wɔ ZIP 2005 mu nkutoo | **Wɔnmfa nni dwuma** | Date biara nni hɔ | [ZIP 2005 na ɔkyerɛwee](https://zips.z.cash/zip-2005) |
| Woredum Orchard ne Sapling | ZIP biara nni hɔ | **Wɔnnyɛ nhyehyɛe** | Sapling ho nkɔmmɔbɔ fi Apr 2026 | [Nhyiamu](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Sprout a wɔsɛe no a wɔma ɛyɛ adwuma (ZIP 2003) | Draft, NU7 kandifo | **Wɔnnyɛ adwuma** | Date biara nni hɔ | [ZIP 2003 na ɔkyerɛwee](https://zips.z.cash/zip-2003) |
| Nneɛma a ɛda adi pefee a wɔsan nya (ZIP 2007) | Wɔakora so | **Deɛ yɛde ato anim** | ZIP reserved 5 Jul 2025, nkɔmmɔbɔ no buee 17 Jun 2026 | [zips#1302 na ɛwɔ hɔ](https://github.com/zcash/zips/issues/1302) |
| Post-quantum kokoamsɛm ma address ahorow a wonim | Nsɛm a wɔabue, ZIP biara nni hɔ | **Hwehwɛ mu** | #1133 buee 18 Aug 2022, #1307 buee 23 Jun 2026 | [zips#1133 na ɛwɔ hɔ](https://github.com/zcash/zips/issues/1133), [zips#1307 na ɛwɔ hɔ](https://github.com/zcash/zips/issues/1307) |
| Dwumadie Tachyon | ZIP biara nni hɔ | **Nsusuiɛ**, wɔreyɛ | Wodii kan tintimii wɔ Apr 2025 | [tachyon.z.sika a wɔde yɛ adwuma](https://tachyon.z.cash/roadmap/) |
| Kwantum akyi protocol koraa | Open issue, ZIP biara nni hɔ | **Daakye adwuma** | #1134 wobuee ano 28 Mar 2016 | [zips#1134 na ɛwɔ hɔ](https://github.com/zcash/zips/issues/1134) |

Wɔ Zcash Foundation's NU7 sentiment polling (February 2026) mu no, quantum recoverability nyaa mmoa 90.5% firii ZCAP hɔ ne 94.6% firii coinholders hɔ, na Tachyon nyaa mmoa a ɛkame ayɛ sɛ amansan nyinaa. Na ɛnonom yɛ nkate mu nhwehwɛmu, na ɛnyɛ gyinaesi ahorow a ɛfa nea ɛkɔ NU7.

<br/>

## Nea wubetumi ayɛ mprempren

- **Fa wo sika kɔ Ironwood.** Sapling ne Orchard nkrataa no rentumi nnya bio da. Botae a ɛkɔ pool ahorow ntam no kyerɛ sika dodow a ɛwɔ nkɔnsɔnkɔnsɔn so, enti ZIP 318 wɔ sika kotoku a wɔakyekyɛ sika a aka no mu ayɛ no sika a wɔahyɛ da ayɛ na wɔde akɔma bere tenten. Ma wo sika kotoku no nyɛ sen sɛ wobɛtu biribiara prɛko pɛ.
- **Ntintim address a wɔabɔ ho ban a enhia sɛ wotintim.** Kokoamsɛm a wode bɛko atia daakye quantum attacker gyina wɔn a wonnim wo address so. Address a wɔaka abom no bo nyɛ den sɛ wɔbɛyɛ, enti ma obiara a otua ka no foforo. ZIP 229 kamfo address a wɔdannan no kyerɛ esiane eyi nti.
- **Nsan mfa address a ɛda adi pefee nni dwuma.** Sɛ wosɛe sika fi biako so pɛ a, ne ɔmanfo safe no wɔ nkɔnsɔnkɔnsɔn no so koraa.
- **Ma wo aba kasasin no sie dwoodwoo.** Wɔ Recovery Protocol no mu sɛnea wɔakyerɛ no, ɛsɛ sɛ sika a wɔsɛe no de gye sika no kyerɛ sɛ wunim wo sika a wode di dwuma no safoa, na sika kotoku a ɛyɛ daa no nya saa safoa no fi aba no mu.
- **Bu w'ani gu "Zcash is quantum-proof" claims so.** Ɛnnya nyɛɛ saa, na nnipa a wɔrekyerɛw specs no ka saa.

<br/>

## Ntease a ɛnteɛ a wɔtaa nya

- **"Ironwood yɛ post-quantum."** Dabi.Ɛyɛ Orchard cryptography koro no ara, na ZIP 2005 ka sɛ feature no "mma Orchard protocol no nyɛ ahobammɔ wɔ quantum ntua ho".
- **"Quantum-recoverable kyerɛ sɛ ahobammɔ wɔ quantum kɔmputa ahorow mu nnɛ."** Dabi Ɛkyerɛ sɛ wobetumi asan anya Ironwood sika wɔ daakye nsakrae akyi, bere tenten a saa nsakrae no si wɔ bere mu no.
- **"Shielded Zcash yɛ post-quantum private dedaw."** Bere a ɔtowhyɛfo no nnim wo address nkutoo. Wɔda address ahorow a wonim adi wɔ ɔtare biara mu.
- **"Tachyon de post-quantum kokoamsɛm aka ho dedaw."** Tachyon yɛ nyansahyɛ. Biribiara nni hɔ a efi mu a ɛyɛ live.
- **"Quantum kɔmputa bubu Zcash."** Hash dwumadie no yɛ mmerɛw nko ara, ɛnyɛ sɛ ɛbubu, ɛnam quantum ntua a wonim so. Quantum recoverability gyina saa nsonsonoe no so pɛpɛɛpɛ.

<br/>

## Nkratafa a ɛfa ho

- [Akwantuo akyi Ahobanbɔ wɔ Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [Turnstile a ɛwɔ hɔ no](/zcash-tech/the-turnstile)
- [Dwumadie Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Atare a Wɔabɔ Ho Ban](/using-zcash/shielded-pools)

<br/>

## Nneɛma a wonya fi mu

- [ZIP 2005: Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)
- [ZIP 229: Nkyerɛase 6 Nkitahodi Nhyehyɛe](https://zips.z.cash/zip-0229)
- [ZIP 258: NU6.3 Network Upgrade no a wɔde bedi dwuma](https://zips.z.cash/zip-0258)
- [ZIP 318: Orchard ɛkɔ Ironwood Tukɔ](https://zips.z.cash/zip-0318)
- [ZIP 326: NU6.3 Nea efi mu ba ma Sikakorabea](https://zips.z.cash/zip-0326)
- [ZIP 2003: Mma kwan mma version 4 nnwuma](https://zips.z.cash/zip-2003)
- [ZIP 209: Bara Negative Shielded Chain Value Pool Kari pɛ](https://zips.z.cash/zip-0209)
- [zips#1302: Quantum recoverability a ɛwɔ subset bi a ɛwɔ transparent protocol no mu](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Post-quantum kokoamsɛm ma Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Zcash kokoamsɛm tia quantum ne discrete-log-breaking atamfo](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash a ɛwɔ quantum akyi koraa](https://github.com/zcash/zips/issues/1134)
- [Project Tachyon kwankyerɛ](https://tachyon.z.cash/roadmap/)
- [NU7 Polling Results: Nea Yɛtee ne Baabi a Yɛkɔ Fi Ha](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Block 3,428,143 wɔ Blockchair so](https://blockchair.com/zcash/block/3428143)
- [Forum abisade: So Zcash yɛ post-quantum?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
