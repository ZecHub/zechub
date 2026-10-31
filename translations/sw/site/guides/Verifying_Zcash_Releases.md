<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Kuthibitisha Matoleo ya Zcash

## Kwa ufupi

- Kupakua faili ya binary ya Zcash si sawa na kupata ile iliyochapishwa na mradi. Uthibitishaji ndio unavyotofautisha kati ya hizo mbili.
- Checksum inathibitisha kuwa faili ilifika ikiwa kamili. **Sahihi [signature]** inathibitisha aliyeitengeneza. Unahitaji vyote viwili, na checksum peke yake inathibitisha mambo machache sana.
- Zebra huchapisha faili ya `SHA256SUMS` pamoja na kifurushi cha **Sigstore** kinachounganisha toleo na mtiririko mahususi wa kazi wa GitHub Actions, tagi na commit — hakuna usimamizi wa funguo unaohitajika.
- Zallet huchapisha sahihi za **GPG** zilizotenganishwa (`.asc`) pamoja na asili ya SLSA na SBOM.
- Ufunguo wa kutia sahihi wa Zcash ulibadilishwa mwaka 2026 kutoka Electric Coin Company hadi Zcash Open Development Lab (ZODL). Ikiwa ulithibitisha matoleo ya zamani, unahitaji ufunguo mpya — na taarifa ya makabidhiano imetiwa sahihi kwa funguo zote mbili, hivyo unaweza kuthibitisha mabadiliko yenyewe.
- `gpg` huripoti **subkey** iliyotia sahihi faili, si ufunguo mkuu unaotajwa kwenye matangazo. Alama ya kidole inayoonekana kuwa si sahihi kwa kawaida ni subkey, si shambulio.
- Ikiwa uthibitishaji unashindwa, usiendeshe binary.

*Imethibitishwa dhidi ya Zebra `v6.3.0` na Zallet `v0.1.0-beta.2` tarehe 2026-08-18.*

## Kwa nini hili ni muhimu zaidi kwa Zcash

Binary ya pochi iliyohujumiwa inaweza kutoa kwa siri ufunguo wa kutumia pesa au ufunguo wa kutazama. Tofauti na nenosiri lililoathiriwa, hasara hiyo ni ya kudumu: hakuna kurejesha hali ya nyuma, hakuna kurejeshewa malipo na hakuna dawati la usaidizi. Miamala ya faragha hulinda kinachotokea *on chain* — haitoi ulinzi wowote pale programu unayoendesha ilipobadilishwa kabla hata haijakufikia.

Hii ni mojawapo ya njia chache za mashambulizi ambapo dhamana za faragha za itifaki hazihusiki kabisa. Uthibitishaji ndio safu inayolinda dhidi yake.

## Muundo wa tishio — uthibitishaji hugundua na hauchunguzi nini

**Hugundua:**

- Nakala mbadala iliyohujumiwa au faili iliyobadilishwa inayotolewa kutoka mahali pasipo ukurasa wa matoleo wa mradi.
- Ubadilishaji wa mtu-katikati wakati wa kupakua.
- CDN iliyoathiriwa au seva ya usambazaji iliyotekwa.
- Uharibifu wa kimakosa wakati wa uhamishaji.

**Haugundui:**

- Mtunza mradi anayetia sahihi msimbo hasidi. Sahihi itathibitishwa ipasavyo; inathibitisha chanzo, si nia.
- Seva ya ujenzi iliyoathiriwa inayotoa artifact iliyotiwa sahihi lakini hasidi. Hiki ndicho ambacho ujenzi unaoweza kuzalishwa upya na uthibitisho wa asili vimekusudiwa kupunguza.
- Ufunguo ulioupata kutoka chanzo kilekile kilichoathiriwa kama binary. Ikiwa mshambulizi anadhibiti faili na ufunguo unaoulinganisha nao, uthibitishaji haukuambii chochote.

Jambo hilo la mwisho ndilo miongozo mingi huliruka. **Mahali unapopata ufunguo ni muhimu sawa na kuendesha amri.**

---

## Sehemu ya 1 — Zebra: checksum na Sigstore

Zebra huchapisha assets hizi kwa kila toleo:

| Asset | Kusudi |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | kumbukumbu ya binary |
| `zebrad-<version>-<arch>.tar.gz.sha256` | checksum ya kila faili |
| `SHA256SUMS` | checksum za usanifu wote |
| `SHA256SUMS.sigstore.json` | kifurushi cha Sigstore kinachotia sahihi `SHA256SUMS` |

### Hatua ya 1 — Pakua

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Hatua ya 2 — Angalia checksum

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Matokeo halisi:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` inahitajika hapa kwa sababu `SHA256SUMS` inajumuisha kila usanifu na ulipakua mmoja tu. Bila hiyo, `sha256sum` huripoti kumbukumbu ya aarch64 isiyopo kama hitilafu na unaweza kusoma kimakosa ufaulu kama kushindwa.

Toleo la kila faili pia linafanya kazi:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Hatua hii pekee haitoshi.** Ulipakua checksum kutoka mahali pamoja na binary. Mtu yeyote aliyeweza kubadilisha moja angeweza kubadilisha nyingine. Checksum inathibitisha ukamilifu; hatua inayofuata inathibitisha chanzo.

### Hatua ya 2b — Ukaguzi huo huo kwenye Windows

PowerShell haina modi ya uthibitishaji ya `-c`, hivyo unalinganisha mwenyewe:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Matokeo halisi:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Linganisha hiyo na matokeo ya Linux mapema katika ukurasa huu:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Thamani zinazofanana.** Hex haina herufi kubwa au ndogo, na hili ndilo tahadhari ya uongo inayotokea mara nyingi zaidi kwenye Windows.

Mitego miwili zaidi maalumu kwa Windows:

- **Hakuna msimbo wa kutoka wa kukagua.** Kwenye Linux, `sha256sum -c` hurejesha 1 inaposhindwa na script inaweza kuchukua hatua kulingana nayo. `Get-FileHash` huchapisha hash pekee — ni wajibu wako kufanya ulinganisho, na wajibu wako kukosea kwa kusoma kwa juu juu.
- **Kusoma vibambo 64 vya hex kwa macho si kutegemewa.** Acha shell ifanye hivyo:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **Kwenye macOS:** mtiririko wa kazi ni uleule, lakini BSD userland huja na `shasum` badala ya `sha256sum` — tumia `shasum -a 256 -c --ignore-missing SHA256SUMS`. Mwandishi wa ukurasa huu hakuwa na mashine ya macOS, hivyo amri hiyo imeandikwa kwa kutegemea zana za Apple badala ya kuendeshwa. Ikiwa unathibitisha kwenye macOS, tafadhali fungua PR inayothibitisha au kusahihisha amri hiyo.

### Hatua ya 3 — Thibitisha kifurushi cha Sigstore

Sigstore hubadilisha funguo za muda mrefu za kutia sahihi kwa vyeti vya muda mfupi vinavyofungwa kwa utambulisho wa CI, vilivyorekodiwa katika logi ya uwazi ya umma. Hakuna anayeshikilia ufunguo wa toleo unaoweza kuibiwa.

Njia ya moja kwa moja hutumia `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Bendera mbili za `--certificate-*` ndizo kiini cha jambo. **Bila hizo unathibitisha tu kwamba mtu fulani, mahali fulani alitia sahihi faili.** Nazo zinathibitisha kuwa ilitiwa sahihi na mtiririko wa kazi katika hifadhi ya Zebra, ulioidhinishwa na mtoaji wa OIDC wa GitHub.

> ⚠️ **Toleo ni muhimu.** Matoleo ya zamani ya cosign hayawezi kusoma umbizo la sasa la kifurushi cha Sigstore. Kuendesha yaliyo hapo juu kwa cosign `v2.4.1` hutoa:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> Kifurushi *kina* cheti — kiko chini ya `verificationMaterial.certificate.rawBytes`, ambako matoleo ya zamani hayatafuti. Hiki ni kizuizi cha mteja, si toleo lililoharibika. Ukikumbana nacho, sasisha cosign badala ya kuhitimisha kuwa upakuaji ni mbaya. Cosign iliyofungwa katika usambazaji mara nyingi iko nyuma sana ya upstream.

Hatua mbili zinazofuata zinaonyesha jinsi ya kuthibitisha kifurushi kilekile kwa mkono, jambo linalofaa kuelewa bila kujali hali yako — na ni mbadala unaotekelezeka wakati muundo wako wa cosign haukubaliani.

### Hatua ya 4 — Soma cheti kinachodai hasa nini

Unaweza kukagua kifurushi bila `cosign`, jambo linalofaa kuelewa unachoamini. Toa cheti:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Matokeo halisi ya Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject Alternative Name ndio utambulisho. Hutaja hifadhi, faili mahususi ya mtiririko wa kazi, na tagi. Sigstore hujumuisha metadata zaidi ya ujenzi katika viendelezi maalumu:

| Sehemu | Thamani ya v6.3.0 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

Kila moja kati ya haya inaweza kukaguliwa. Hash ya commit inapaswa kufanana na tagi katika hifadhi; uendeshaji wa mtiririko wa kazi unapaswa kuwepo na kuwa wa umma.

### Hatua ya 5 — Thibitisha sahihi kwa kriptografia

Unaweza kuthibitisha sahihi moja kwa moja kwa OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Matokeo halisi:

```
Verified OK
```

Kifurushi pia hurekodi digest iliyotiwa sahihi. Thibitisha kuwa inalingana na faili yako ya ndani:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Hatua ya 6 — Ingizo la logi ya uwazi

Kifurushi hubeba ingizo la Rekor linalothibitisha kuwa sahihi ilichapishwa katika logi ya umma isiyoongezwa upya:

| Sehemu | Thamani |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

Hiki ndicho kinachofanya matumizi mabaya ya ufunguo kwa siri yaweze kugundulika. Sahihi ambayo haikuonekana kamwe kwenye logi, au ilionekana kwa wakati usioaminika, ni ishara inayostahili kuchukuliwa hatua. Linganisha muda wa ujumuishaji na tangazo la toleo.

> **Dokezo kuhusu njia ya OpenSSL:** huthibitisha sahihi dhidi ya ufunguo wa umma wa cheti, lakini yenyewe haithibitishi mnyororo wa cheti hadi mzizi wa Sigstore wala hukagua uthibitisho wa ujumuishaji wa ingizo la logi. `cosign verify-blob` hufanya yote matatu. Tumia OpenSSL kuelewa utaratibu; tumia `cosign` kama ukaguzi wako halisi.

---

## Sehemu ya 2 — Zallet: sahihi za GPG

Zallet huchapisha seti tofauti ya assets:

| Asset | Kusudi |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | kumbukumbu ya binary |
| `.tar.gz.asc` | sahihi ya GPG iliyotenganishwa |
| `.tar.gz.intoto.jsonl` | uthibitisho wa asili wa SLSA |
| `.tar.gz.provenance.json` | metadata ya asili |
| `.tar.gz.sbom.spdx` | muswada wa vifaa vya programu |

### Hatua ya 1 — Tambua ufunguo wa kutia sahihi kabla hujauanza kuutafuta

Endesha uthibitishaji *kwanza*, bila kuingiza ufunguo:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Matokeo halisi:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Hii si kushindwa. Inakuambia sahihi ipo na kutaja kwa usahihi ufunguo unaohitaji, **kabla** ya kuanza kutafuta. Zingatia alama ya kidole na mtoaji, kisha pata ufunguo kutoka chanzo kisichotegemea upakuaji.

> `gpg` huchapisha mihuri ya muda katika saa za eneo lako. Matokeo hapo juu yanaonyesha `WAT` (UTC+1); sahihi ileile husomeka `18:18:44 UTC` mahali pengine. Ni wakati uleule. Usichukulie tofauti ya saa za eneo kama kutolingana.

### Hatua ya 2 — Ingiza ufunguo na uthibitishe

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Matokeo halisi:

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

`Good signature` ndicho ulichotaka. Mambo mawili katika matokeo hayo huwachanganya watu, na yote mawili ni ya kawaida.

### Kwa nini alama ya kidole hailingani na tangazo

Taarifa ya mabadiliko ya ufunguo wa ZODL hutaja alama ya kidole `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Lakini `gpg --verify` iliripoti `1FE9 9324 …  23F0 617F`. Hilo linaonekana kama kutolingana, lakini sivyo.

`gpg` huripoti **subkey** iliyotengeneza sahihi. Tangazo hutaja **ufunguo mkuu**. Thibitisha uhusiano mwenyewe:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Matokeo halisi:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

Mstari wa `sub` ni subkey ya kutia sahihi; mstari wa `pub` ni ufunguo mkuu. Utambulisho mmoja, kifurushi kimoja cha ufunguo. Hii ndiyo sababu matokeo ya uthibitishaji huchapisha alama za kidole **zote mbili** — linganisha *ufunguo mkuu* na tangazo lolote lililochapishwa, na uchukulie mstari wa subkey kama unaokuambia ni sehemu gani ya ufunguo iliyofanya kazi.

Kugawanya funguo kwa njia hii ni kwa makusudi: subkey ya kutia sahihi inaweza kubadilishwa au kubatilishwa bila kutupa utambulisho mkuu na uaminifu wake uliokusanywa.

### Maana ya onyo la `[unknown]`

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Hili **si** tatizo la sahihi. Sahihi ni halali kwa kriptografia — hilo ndilo `Good signature` linasema. Onyo linasema jambo tofauti: hujaiambia GnuPG yako ya ndani kwamba unaamini ufunguo huu unamilikiwa na anayesema unamilikiwa naye.

GnuPG hutenganisha maswali mawili:

1. **Je, ufunguo huu ulitia sahihi faili hii?** — yanajibiwa na `Good signature`. Ya kriptografia, bila uamuzi wa kibinadamu.
2. **Je, ufunguo huu ni wa ZODL?** — hayajibiwi na kriptografia kabisa. Unathibitisha hilo kwa kulinganisha alama ya kidole na chanzo huru.

Utaona onyo hili kwenye karibu kila uthibitishaji isipokuwa utie sahihi ufunguo ndani ya nchi yako waziwazi. Usilichukulie kama kushindwa. **Lichukulie** kutokuwepo kwa `Good signature` kama kushindwa.

### Hatua ya 3 — Thibitisha mabadiliko ya ufunguo yenyewe

Uwekaji sahihi wa matoleo ya Zcash ulihama kutoka Electric Coin Company hadi Zcash Open Development Lab mwaka 2026, baada ya ZODL kuundwa Januari 2026 na timu ya zamani ya uhandisi na bidhaa ya ECC.

| | Ufunguo wa zamani | Ufunguo mpya |
|---|---|---|
| Alama ya kidole | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Aina | RSA 3072-bit, iliundwa 2023-06-19 | RSA 4096-bit, iliundwa 2026-03-23, inaisha 2028-03-22 |
| Ilichapishwa saa | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Ratiba iliyochapishwa: ufunguo mpya ulitengenezwa 2026-03-23, ukatangazwa 2026-03-27, uwekaji sahihi wa kipekee ukaanza 2026-04-23, ubatilishaji wa ufunguo wa zamani wa ECC ukapangwa 2026-06-23.

Tangazo la mabadiliko kwenye tovuti linaaminika kwa kiwango kilekile cha tovuti yenyewe. Utaratibu sahihi ni taarifa **iliyotiwa sahihi waziwazi na funguo zote mbili**, ili ufunguo wa zamani udhamini ule mpya. ZODL huchapisha jambo hilo hasa:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Matokeo halisi (yaliyofupishwa — sahihi mbili kwenye hati moja):

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

Matokeo mawili ya `Good signature` kwenye hati moja, kutoka kwa ufunguo wa zamani na mpya. Ikiwa uliamini ufunguo wa ECC kwa matoleo ya awali, uaminifu huo sasa unaendelea hadi ufunguo wa ZODL bila wewe kuhitaji kuamini `zodl.com`, `apt.z.cash`, au chapisho la jukwaa. Hii ndiyo sifa ya kutafuta mradi unapobadilisha funguo — na kutokuwepo kwake kunastahili kuulizwa.

### Mahali pa kupata ufunguo — na mahali pa kutochukua

Yaliyopangwa kutoka bora hadi mabaya zaidi:

1. **Taarifa iliyotiwa sahihi na ufunguo uliotangulia**, kama ilivyo hapo juu. Chaguo imara zaidi baada ya mabadiliko.
2. **Chanzo kisichotegemea upakuaji.** Binary ilitoka GitHub; ufunguo ulitoka `apt.z.cash`. Mshambulizi anahitaji kudhibiti vyote.
3. **Keyserver, ikikaguliwa kwa alama ya kidole iliyochapishwa.** Mtu yeyote anaweza kupakia ufunguo unaodai utambulisho wowote kwenye keyserver nyingi. Ulinganisho wa alama ya kidole ndilo linalofanya hili liwe salama — si keyserver.
4. **Ukurasa uleule wenye binary.** Karibu hakuna uhakikisho. Anayeweza kubadilisha moja anaweza kubadilisha nyingine.

Daima linganisha alama ya kidole **kamili** na ufunguo **mkuu**. Vitambulisho vifupi vya ufunguo vinaweza kugongana kwa urahisi na vimetumika katika mashambulizi halisi.

## Sehemu ya 3 — Uthibitishaji unaoshindwa

Uthibitishaji una manufaa tu ikiwa unajua kushindwa kunaonekanaje. Huu hapa ni mfano halisi, uliotengenezwa kwa kuongeza byte moja tupu kwenye kumbukumbu halali:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
sha256sum tampered.tar.gz > tampered.sha256
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Matokeo halisi:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Msimbo wa kutoka: `1`.

Weka digest mbili kando kwa kando:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Byte moja imeongezwa kwenye faili ya byte 66,992,676. Hash hizo mbili hazishiriki chochote — si mwanzo, wala mchoro. Hakuna ulinganifu wa sehemu wala “karibu inatosha”: checksum ama inalingana hasa au faili si faili uliyotaka.

### Cha kufanya hili linapotokea

1. **Usiendeshe binary.** Usiitoe, usiifanyie `chmod +x`.
2. **Jaribu tena kutoka ukurasa rasmi wa matoleo.** Kushindwa kwingi hutokana na upakuaji uliokatika.
3. **Ikiwa inashindwa mara ya pili, badilisha njia ya mtandao.** Muunganisho tofauti, au VPN. Kushindwa kunakokufuata katika mitandao mbalimbali ni tofauti na kusikokufuata.
4. **Thibitisha kuwa una faili sahihi ya checksum kwa toleo sahihi.** Kulinganisha jumla za v6.3.0 na v6.2.3 kutashindwa ipasavyo.
5. **Ikiwa bado inashindwa, ripoti.** Fungua issue katika hifadhi ya mradi, au tumia anwani ya usalama katika `SECURITY.md` kwa jambo lolote unaloshuku ni la makusudi. Tazama ukurasa wa [Usalama wa Mfumo wa Ikolojia wa Zcash](/zcash-community/zcash-ecosystem-security) kwa njia za ufichuzi.
6. **Hifadhi artifact.** Binary iliyohujumiwa ni ushahidi. Usiifute kabla ya kuripoti.

Kushindwa kwa sahihi ni kubwa zaidi kuliko kushindwa kwa checksum. Kutolingana kwa checksum kwa kawaida ni uharibifu; faili halali lakini sahihi mbaya si jambo linalotokea kwa bahati mbaya.

---

## Sehemu ya 4 — Jedwali la marejeleo

| Mradi | Matoleo yamechapishwa katika | Mbinu | Mahali ufunguo unatoka |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | Hakuna ufunguo — utambulisho wa CI kupitia OIDC ya GitHub |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — msingi `0338 34DD…58E2 6AB1`, subkey ya kutia sahihi `1FE9 9324…23F0 617F` |
| **zcashd** | *imestaafishwa* | — | Ilisitishwa kwenye block 3,417,100 tarehe 2026-07-18. Usiisakinishe. |
| **Zodl** (zamani Zashi) | App Store / Google Play; `zodl-inc` kwenye GitHub | Store signing; standalone Android binaries GPG-signed | Ufunguo wa ZODL kulingana na taarifa ya mabadiliko |

> **Dokezo la majina:** Zashi ilibadilishwa chapa kuwa **Zodl** mwaka 2026 — kwanza kwenye App Store, kisha kwenye Google Play. Miongozo ya zamani inayorejelea “Zashi” inaeleza nasaba ileile ya pochi.

---

## Sehemu ya 5 — Pochi za simu na hardware wallet

Uthibitishaji hufanya kazi tofauti baada ya kuondoka kwenye upakuaji wa moja kwa moja.

**Maduka ya programu.** Huwezi kukagua sahihi mwenyewe. Duka hutia sahihi kifurushi na unaliamini duka kuhusu ukaguzi wake na uadilifu wa akaunti ya msanidi programu. Kile *unachoweza* kuthibitisha ni kuwa una programu sahihi: thibitisha jina la mchapishaji na kitambulisho cha kifurushi dhidi ya tovuti rasmi ya mradi, si dhidi ya matokeo ya utafutaji. Programu za kuiga ni za kawaida, na orodha ya duka si ushahidi wa uhalisi.

**APK za kujitegemea za Android.** Hizi *zinaweza* kuthibitishwa. ZODL huchapisha binary za kujitegemea za Android zilizo na sahihi ya GPG kupitia Matoleo ya GitHub, hivyo mtiririko wa kazi wa Sehemu ya 2 unatumika. Pendelea njia hii ikiwa unataka mnyororo unaoweza kukaguliwa.

**Hardware wallets.** Kifaa huthibitisha firmware yake yenyewe, hivyo msingi wa uaminifu ni vifaa, si faili kwenye mashine yako. Tazama [Keystone Zashi](/guides/keystone-zashi) kwa mtiririko wa uthibitishaji wa kifaa. Nunua moja kwa moja kutoka kwa mtengenezaji — uharibifu wa mnyororo wa ugavi hutokea kati ya kiwanda na mnunuzi.

---

## Usomaji zaidi

- [Usalama wa Mfumo wa Ikolojia wa Zcash](/zcash-community/zcash-ecosystem-security) — sera ya ufichuzi na anwani za usalama
- [Zebra Full Node](/zcash-tech/zebra-full-node) — kusakinisha Zebra baada ya kuithibitisha
- [Zallet Mwongozo wa Marejeleo ya Haraka](/using-zcash/zallet-quick-reference-guide) — kutumia Zallet
- [Nyaraka za Sigstore](https://docs.sigstore.dev/)
- [Viwango vya asili vya SLSA](https://slsa.dev/)

---

*Amri katika ukurasa huu ziliendeshwa dhidi ya Zebra `v6.3.0` na Zallet `v0.1.0-beta.2` tarehe 2026-08-18. Zana za matoleo hubadilika: ikiwa matokeo yanatofautiana na yaliyoonyeshwa hapa, amini uendeshaji wako mwenyewe na tafadhali fungua PR.*
