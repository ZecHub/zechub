<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kuthibitisha Zcash Releases

## TL;DR

- Kupakua Zcash binary si sawa na kupata moja mradi kuchapishwa. uthibitishaji ni jinsi gani unaweza kusema tofauti.
- Checksum inathibitisha faili aliwasili intact. ** saini** inathibitisha ambaye kuzalishwa yake. Unahitaji wote wawili, na checksum peke yake inaonyesha kidogo sana.
- Zebra kuchapisha a `SHA256SUMS` faili pamoja na ** Sigstore** kifungu kwamba vifungo kutolewa kwa maalum GitHub vitendo workflow, tag na kuagiza  hakuna usimamizi muhimu required.
- Zallet kuchapisha detached ** GPG** saini (`.asc`) pamoja na SLSA provenance and a SBOM.
- Zcash kusaini ufunguo rotated katika 2026 kutoka Electric Coin Company kwa Zcash Open Development Lab (ZODL). Kama kuthibitishwa releases zamani, unahitaji mpya muhimu  na handover taarifa ni saini na funguo zote mbili, hivyo unaweza kudhibitisha mzunguko yenyewe.
- `gpg` ripoti ya ** subkey** kwamba saini faili, si muhimu msingi aitwaye katika matangazo. fingerprint ambayo inaonekana makosa ni kawaida subkey, sio mashambulizi.
- Kama uthibitisho inashindwa, wala kukimbia binary.

*Imethibitishwa dhidi ya Zebra. `v6.3.0` na Zallet `v0.1.0-beta.2` on 2026-08-18.*

## Kwa nini hii ni muhimu zaidi kwa Zcash

Binary ya mkoba iliyobadilishwa inaweza kuondoa ufunguo wa matumizi au ufunguoo wa kutazama. Tofauti na nywila iliyovunjika, upotezaji huo ni wa kudumu: hakuna kurudi nyuma, hakuna malipo tena wala dawati la msaada. Shughuli zilizohifadhiwa hulinda kile kinachotokea * kwenye mnyororo*  haitoi ulinzi wowote wakati programu unayoendesha imebadilishwa kabla haijafika kwako.

Hii ni moja ya njia chache mashambulizi ambapo dhamana faragha wa itifaki tu si muhimu. uthibitisho ni safu kwamba inashughulikia yake.

## Mtindo wa tishio  nini uthibitisho hufanya na haupati

**Vitu vya samaki:**

- Kioo tampered au faili iliyopita kutumika kutoka mahali pengine kuliko ukurasa wa kutolewa mradi.
- Mtu-katikati kubadilishana wakati wa kupakua.
- CDN walioathirika au uhamisho wa usambazaji mwenyeji.
- Ufisadi wa ajali katika usafirishaji.

** Haupati:**

- Mhifadhi ambaye anasaini nambari mbaya. Saini itathibitisha kwa usahihi; inathibitisha asili, sio nia.
- Kujenga kuathirika mwenyeji wa uzalishaji saini-lakini-mbaya artifact. Hii ni nini kujenga reproducible na uthibitisho provenance zipo kwa finyu.
- ufunguo wewe got kutoka chanzo sawa compromised kama binary. mshambuliaji udhibiti wote faili na muhimu kuangalia dhidi yake, uthibitisho anasema chochote kwako.

Hiyo hatua ya mwisho ni moja viongozi wengi ruka. ** Ambapo kupata muhimu mambo kama vile kuendesha amri.**

---

## Sehemu ya 1  Zebra: checksums na Sigstore

Zebra kuchapisha mali hizi kwa kila kutolewa:

Mali. Kusudi.
|---|---|
| `zebrad-<version>-<arch>.tar.gz` -- faili ya binary.
| `zebrad-<version>-<arch>.tar.gz.sha256` Jumla ya ukaguzi kwa kila faili.
| `SHA256SUMS` Checksums kwa ajili ya usanifu wote.
| `SHA256SUMS.sigstore.json` ◯ Sigstore mfuko wa kusaini `SHA256SUMS` |

### Hatua ya 1  Pakua

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Hatua ya 2  Angalia checksum

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

pato halisi:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` inahitajika hapa kwa sababu `SHA256SUMS` inashughulikia kila usanifu na wewe tu kupakuliwa moja. Bila hiyo, `sha256sum` ripoti ya kukosa aarch64 archive kama kushindwa na unaweza misread kupita kama kushinda.

Tofauti ya faili pia inafanya kazi:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Hii hatua peke yake haitoshi.** You kupakuliwa checksum kutoka sehemu moja kama binary. Mtu yeyote ambaye anaweza kuchukua nafasi ya mmoja angeweza kuchukua nafasi nyingine. Checksum inathibitisha uadilifu; Hatua inayofuata inathibitisha asili.

### Hatua 2b  Same kuangalia kwenye Windows

PowerShell hana yoyote ya `-c` kuthibitisha mode, hivyo kulinganisha manually:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

pato halisi:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Linganisha na matokeo ya Linux mapema katika ukurasa huu:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Identical values.** Hex hubeba hakuna kesi, na hii ni moja ya kawaida kengele bandia juu ya Windows.

Mtego mwingine wa Windows:

- ** Hakuna msimbo wa kuondoka kuangalia.** On Linux, `sha256sum -c` anarudi 1 juu ya kushindwa na script inaweza kutenda kwa hilo. `Get-FileHash` tu prints hash  kulinganisha ni yako kufanya, na wako kupata makosa kwa skimming.
- ** Kusoma 64 hex wahusika kwa jicho ni unreliable.** Acha shell kufanya hivyo:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> ** On MacOS:** kazi ni sawa, lakini BSD userland meli `shasum` badala ya kuwa na `sha256sum`  matumizi `shasum -a 256 -c --ignore-missing SHA256SUMS`. Mwandishi wa ukurasa huu hakuwa na mashine ya macOS inapatikana, hivyo amri hiyo ni kumbukumbu kutoka zana Apple badala ya kukimbia. Kama kuthibitisha juu ya MacOS, tafadhali kufungua PR uthibitisho au kusahihisha yake.

### Hatua 3  Angalia mfuko Sigstore

Sigstore inachukua nafasi ya funguo za kusaini kwa muda mrefu na vyeti vya muda mfupi vinavyounganishwa na kitambulisho cha CI, vilivyorekodiwa kwenye kumbukumbu ya uwazi wa umma. Hakuna mtu anayemiliki ufunguo wa kutolewa ambao unaweza kuibiwa.

Njia moja kwa moja inatumia `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Wale wawili `--certificate-*` bendera ni hatua nzima. ** Bila yao wewe tu kuthibitisha kwamba mtu, mahali fulani saini faili.** Pamoja nao unathibitisha ilikuwa kusainiwa na workflow katika hazina Zebra, authenticated kwa GitHub ya OIDC mtoa.

> ️ **Matatizo ya toleo.** Wazee cosign kujenga hawezi kusoma sasa Sigstore kifungu format. Running hapo juu na cosign `v2.4.1` hutengeneza:
>
> ```
> Kosa: kifungu haina vyeti kwa ajili ya uthibitisho, tafadhali kutoa ufunguo wa umma
> ```
>
> mfuko * haina* vyenye cheti  ni anakaa chini ya `verificationMaterial.certificate.rawBytes`, ambayo releases zamani si kuangalia kwa. Hii ni mteja mapungufu, sio kutolewa kuvunjwa. Kama hit it, kuboresha cosign badala ya kuhitimisha download mbaya. usambazaji-packaged cosign mara nyingi vizuri nyuma upstream.

Hatua mbili zifuatazo kuonyesha jinsi ya kuthibitisha mfuko huo kwa mkono, ambayo ni thamani ya kuelewa bila kujali  na ni workable fallback wakati yako cosign kujenga si kushirikiana.

### Hatua ya 4  Soma kile cheti kweli anasema

Unaweza kukagua kifungu bila `cosign`, ambayo ni muhimu kwa ajili ya kuelewa nini wewe kuamini. Extract hati:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

pato halisi kwa Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject jina mbadala ni utambulisho. Inaita hazina, faili halisi ya mtiririko wa kazi na tag. Sigstore inajumuisha zaidi kujenga metadata katika upanuzi desturi:

Shamba. Thamani kwa ajili ya v6.3.0
|---|---|
Mtangazaji wa OIDC. `https://token.actions.githubusercontent.com` |
Hifadhi ya chanzo. `https://github.com/ZcashFoundation/zebra` |
Jenga ahadi. `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
Hakimu. `refs/tags/v6.3.0` |
Mazingira ya Runner. `github-hosted` |
Mwendo wa kazi. `.../actions/runs/31424510487/attempts/1` |
Uwazi wa hifadhi. `public` |

Kila moja ya haya ni checkable. commit hash lazima mechi tag katika hazina; kazi mtiririko kukimbia lazima kuwepo na kuwa umma.

### Hatua 5  Thibitisha saini kwa njia ya cryptographically

Unaweza kuthibitisha saini moja kwa moja na OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

pato halisi:

```
Verified OK
```

Kifurushi pia kumbukumbu digest ni saini. kuthibitisha inalingana faili yako ya ndani:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Hatua ya 6  Upatikanaji wa rekodi za uwazi

kifungu hubeba Rekor kuingia kuthibitisha saini ilichapishwa kwa umma, kiambatisho tu logi:

Shamba. Thamani.
|---|---|
Rekodi ya kumbukumbu index. `2412071838` |
Aina ya kuingia. `hashedrekord v0.0.1` |
Imeunganishwa katika 2026-08-10 19:43:09 UTC.

Hii ni nini hufanya kimya muhimu matumizi mabaya detectable. saini kwamba kamwe alionekana katika kumbukumbu, au ilionekana wakati implausible, ni ishara ya thamani kutenda juu ya. kulinganisha muda wa ushirikiano dhidi kutolewa tangazo.

> ** Kumbuka juu ya OpenSSL njia:** ni kuthibitisha saini dhidi ufunguo wa umma cheti, lakini si yenyewe kuhalalisha mlolongo hati kwa mizizi Sigstore au kuangalia kuingia kumbukumbu ya ushirikishwaji ushahidi. `cosign verify-blob` Inafanya wote watatu. Matumizi OpenSSL kuelewa utaratibu; matumizi ya `cosign` kama hundi yako halisi.

---

## Sehemu ya 2  Zallet: saini GPG

Zallet kuchapisha seti tofauti ya mali:

Mali. Kusudi.
|---|---|
| `zallet-<version>-<platform>.tar.gz` -- faili ya binary.
| `.tar.gz.asc` Saini ya GPG iliyojitenga.
| `.tar.gz.intoto.jsonl` Uthibitisho wa asili ya SLSA.
| `.tar.gz.provenance.json` Metadata ya chanzo.
| `.tar.gz.sbom.spdx` Mpango wa vifaa vya programu.

### Hatua ya 1  Tambua ufunguo wa kutia sahihi kabla hujautafuta

Run uthibitishaji * kwanza*, bila muhimu kuingizwa:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

pato halisi:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Hii si kushindwa. Inakuambia saini ipo na majina hasa ambayo ufunguo unahitaji, ** kabla ya** kuanza kutafuta. Kumbuka alama za vidole na mtoaji, kisha kupata muhimu kutoka chanzo huru wa download.

> `gpg` prints timestamps katika eneo lako wakati. pato juu inaonyesha `WAT` (UTC+1); saini hiyo husoma hivi: `18:18:44 UTC` Wakati mwingine, wakati huohuo. Usione tofauti ya mzunguko wa saa kama kutofautisha.

### Hatua 2  Ingiza ufunguo na kuthibitisha

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

pato halisi:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Good signature from "Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>" [unknown]
gpg: WARNING: The key's User ID is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 0338 34DD 49DE CF9D BB99  34BC 6C93 CA8E 58E2 6AB1
     Subkey fingerprint: 1FE9 9324 758F 2967 18B4  5706 7F4B BBBA 23F0 617F
```

`Good signature` Ni nini alitaka. Mambo mawili katika pato kwamba kuchanganya watu, na wote ni ya kawaida.

### Kwa nini alama ya vidole hailingani na tangazo hilo?

ZODL muhimu ya mabadiliko taarifa majina alama za vidole `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`Lakini . `gpg --verify` taarifa ya `1FE9 9324 …  23F0 617F`Hiyo inaonekana kama kutofautisha na sivyo.

`gpg` ripoti ya ** subkey** kwamba alifanya saini. tangazo majina ya ** msingi muhimu.* kuthibitisha uhusiano mwenyewe:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

pato halisi:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

Makala ya kwanza. `sub` line ni kusaini subkey; the `pub` Hii ni kwa nini uthibitishaji pato prints ** zote mbili** alama za vidole  kulinganisha * msingi* dhidi ya tangazo lolote kuchapishwa, na kutibu subkey mstari kama kukuambia ambayo sehemu ya ufunguo alifanya kazi.

Kugawanya funguo kwa njia hii ni makusudi: saini ya msingi inaweza kuzungushwa au kuondolewa bila kutupa utambulisho wa kimsingi na uaminifu wake uliokusanywa.

### Nini ... ? `[unknown]` onyo maana

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Hii ni **not** tatizo na saini. Saini ni cryptographically halali  kwamba nini `Good signature` Onyo anasema kitu tofauti: wewe si aliiambia GnuPG yako ya ndani kwamba unaamini ufunguo huu ni mali yake ambaye inadai.

GnuPG hutenganisha maswali mawili:

1. ** Je, hii muhimu saini faili hili?**  alijibu kwa `Good signature`. Cryptographic, hakuna hukumu ya binadamu.
2. ** Je, ufunguo huu ni mali ya ZODL?**  si jibu kwa njia ya cryptography wakati wote. Unaweza kuanzisha yake na kuangalia alama za vidole dhidi chanzo huru.

Utaona onyo hili juu ya karibu kila uthibitisho isipokuwa wewe wazi saini muhimu ndani. Je, si kutibu kama kushindwa ** Do** matibabu kukosa `Good signature` kama kushindwa.

### Hatua 3  Kuthibitisha muhimu mpito yenyewe

Zcash release signing moved from Electric Coin Company to Zcash Open Development Lab in 2026, after ZODL was formed in January 2026 by the former ECC engineering and product team.

Ufunguo wa zamani. Funguo mpya.
|---|---|---|
Ishara ya vidole. `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
UID Zcash Master Saini muhimu (ECC) `<sysadmin@z.cash>` Zcash Open Maendeleo Lab (ZODL) `<sysadmin@zodl.com>` |
Aina: RSA 3072-bit, iliyoundwa 2023-06-19 RSA 4096-bit, iliyoundwa 2026-03-23, itaisha tarehe 22/03/2028.
Imechapishwa katika: `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Imechapishwa ratiba ya muda: ufunguo mpya uliotengenezwa 2026-03-23, ilitangazwa 20 26-03-27, saini pekee kutoka 2026- 04-23, kufutwa kwa kifungo cha zamani cha ECC iliyopangwa 2026- 06-23.

Tangazo la mzunguko kwenye tovuti ni ya kuaminika tu kama wavuti. utaratibu sahihi ni taarifa ** wazi-saini na funguo zote mbili, hivyo muhimu zamani vouches kwa ajili mpya moja. ZODL kuchapisha hasa kwamba:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

pato halisi (abbreviated  saini mbili juu ya hati moja):

```
gpg: Signature made Fri Mar 27 01:11:14 2026 WAT
gpg:                using RSA key B1C9095EAA1848DBB54D9DDA1D05FDC66B372CFE
gpg:                issuer "sysadmin@z.cash"
gpg: Good signature from "Zcash Master Signing Key (Electric Coin Company) <sysadmin@z.cash>" [unknown]
Primary key fingerprint: B1C9 095E AA18 48DB B54D  9DDA 1D05 FDC6 6B37 2CFE

gpg: Signature made Fri Mar 27 01:11:14 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Good signature from "Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>" [unknown]
Primary key fingerprint: 0338 34DD 49DE CF9D BB99  34BC 6C93 CA8E 58E2 6AB1
     Subkey fingerprint: 1FE9 9324 758F 2967 18B4  5706 7F4B BBBA 23F0 617F
```

Mbili. `Good signature` matokeo juu ya hati moja, kutoka muhimu zamani na mpya. Kama wewe kuamini ECC ufunguo kwa releases mapema, kwamba imani sasa unaendelea mbele ZODL key bila kuwa na uaminifu wa `zodl.com`, `apt.z.cash`Hii ni mali ya kuangalia kwa wakati wowote mradi rotates funguo  na kukosekana kwake ni thamani kuuliza kuhusu.

### Ambapo kupata ufunguo  na ambapo si kwa

Imepangwa kutoka bora hadi mbaya zaidi:

1. ** Taarifa saini na muhimu uliopita**, kama hapo juu. Chaguo nguvu baada ya mzunguko wa.
2. ** Chanzo huru ya download.** binary alikuja kutoka GitHub; muhimu alitoka `apt.z.cash`Mshambuliaji anahitaji yote mawili.
3. **Keyserver, cross-checked dhidi ya kuchapishwa fingerprint.** Mtu yeyote anaweza upload muhimu kudai utambulisho wowote kwa wengi keyservers. kulinganisha kidole ni nini hufanya hii salama  si keyserver.
4. ** Ukurasa huo kama binary.** Karibu hakuna uhakika. Yeyote anaweza kuchukua nafasi ya moja inaweza kuchukua nafasi nyingine.

Daima kulinganisha ** full * alama ya vidole dhidi ya muhimu. IDs short ufunguo ni trivially collidable na wamekuwa kutumika katika mashambulizi halisi.

## Sehemu ya 3  Ukaguzi ambao haufanikiwi

Ukaguzi ni muhimu tu kama unajua nini kushindwa inaonekana. Hapa ni moja ya kweli, zinazozalishwa kwa kuongeza byte null single archive halali:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

pato halisi:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Kutoka code: `1`.

Weka digests mbili kando na upande:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Byte moja appended kwa faili ya 66,992,676-byte. hashes mbili kushiriki kitu chochote  si kiambishi, wala muundo. Hakuna mechi sehemu na hakuna "karibu kutosha": checksum ama inaendana kabisa au faili ni si file alitaka.

### Nini cha kufanya wakati hii hutokea

1. ** Je, si kukimbia binary.** Si kuchimba ni, wala `chmod +x` it.
2. ** Jaribu tena kutoka ukurasa rasmi kutolewa.** Wengi kushindwa ni kupakuliwa truncated.
3. ** Kama inashindwa mara ya pili, kubadilisha njia mtandao.** tofauti uhusiano, au VPN. Kushindwa kwamba anafuata wewe katika mitandao ni tofauti na moja ambayo haina.
4. ** Kuthibitisha una faili sahihi checksum kwa toleo haki.** Kulinganisha v6.3.0 dhidi ya jumla v6.2.3 kushindwa usahihi.
5. ** Kama bado inashindwa, ripoti yake.** Fungua suala katika hazina mradi wa, au kutumia usalama kuwasiliana na `SECURITY.md` kwa chochote unachofikiri ni makusudi. Angalia [Zcash Ecosystem Usalama](/zcash-community/zcash-ecosystem-security) ukurasa kwa ajili ya njia za kutoa taarifa.
6. ** Weka artifact.** Binary tampered ni ushahidi. Je, si kufuta kabla ya kuripoti.

Kushindwa kwa saini ni mbaya zaidi kuliko kushindwa kwa checksum. Ukosefu wa usawazishaji kawaida huwa ufisadi; faili halali-lakini -saini mbaya sio kitu kinachotokea kwa bahati mbaya.

---

## Sehemu ya 4  Jedwali la kumbukumbu

Mradi  releases kuchapishwa katika Method ambapo ufunguo linatokana na
|---|---|---|---|
"Kikundi cha Zebra" `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore kifungu. Hakuna ufunguo  CI utambulisho kupitia GitHub OIDC
"Zallet" katika Kiingereza. `github.com/zcash/zallet/releases` GPG iliyojitenga. `.asc`, SLSA asili, SBOM. `apt.z.cash/zodl.asc`  msingi `0338 34DD…58E2 6AB1`, kusaini subkey `1FE9 9324…23F0 617F` |
** zcashd**  * retired* . Imesimamishwa katika block 3,417,100 tarehe 2026-07-18. Usiwekeze.
♬ ** Zodl** (zamani Zashi) App Store / Google Play; `zodl-inc` kwenye GitHub  kuhifadhi saini; kujitegemea Android binaries GPG-saini ZODL ufunguo kwa taarifa ya mpito

> ** Nukuu ya jina: Zashi ilibadilishwa kuwa *Zodl** mnamo 2026  kwanza kwenye Duka la App, kisha kwenye Google Play. Miongozo ya zamani inayotaja "Zashi" inaelezea nasaba sawa ya mkoba.

---

## Sehemu ya 5  Wallets za simu na vifaa vya umeme

Uthibitishaji kazi tofauti mara moja kuondoka downloads ya moja kwa moja.

**App stores.** You cannot check a signature yourself. The store signs the package and you are trusting the store's review and the developer account's integrity. What you *can* verify is that you have the right app: confirm the publisher name and the package identifier against the project's official site, not against search results. Impersonation apps are common, and a store listing is not evidence of authenticity.

**Standalone Android APKs.** Hizi *can* kuthibitishwa. ZODL kuchapisha GPG-saini standalone binaries Android kupitia GitHub Releases, hivyo sehemu ya 2 workflow inatumika. Kipaumbele njia hii kama unataka mlolongo checkable.

**Hardware pochi.** Kifaa atathibitisha firmware yake mwenyewe, hivyo kuamini nanga ni vifaa vya ujenzi wa kompyuta yako. Angalia [Zashi ya Jiwe la Muhimu (Keystone)](/guides/keystone-zashi) kununua moja kwa moja kutoka mtengenezaji  usumbufu wa ugavi hutokea kati ya kiwanda na mnunuzi.

---

## Kusoma zaidi

- [Zcash Ecosystem Usalama](/zcash-community/zcash-ecosystem-security)  sera ya kutoa taarifa na mawasiliano usalama
- [Zebra Full Node (Njia ya Kuunganisha)](/zcash-tech/zebra-full-node)  Kuweka Zebra baada ya kuthibitisha ni
- [Mwongozo wa Marejeo ya Haraka wa Zallet](/using-zcash/zallet-quick-reference-guide)  kutumia Zallet
- [Sigstore nyaraka](https://docs.sigstore.dev/)
- [Viwango vya SLSA kutoka kwa chanzo](https://slsa.dev/)

---

* Amri katika ukurasa huu walikuwa kukimbia dhidi Zebra `v6.3.0` na Zallet `v0.1.0-beta.2` 2026-08-18. Release tooling changes: kama pato inatofautiana na kile kilichoonyeshwa hapa, imani mbio yako mwenyewe na tafadhali kufungua PR.*
