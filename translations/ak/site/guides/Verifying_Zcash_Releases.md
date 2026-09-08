<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Releases a Wɔrehwɛ sɛ Ɛyɛ nokware

## TL;DR

- Zcash binary a wobɛtwe no nyɛ ade koro ne nea adwuma no tintimii no a wubenya. Verification ne sɛnea wohu nsonsonoe no.
- Checksum di adanse sɛ fael no duu hɔ a ɛnyɛ hwee. **nsaano nkyerɛwee** kyerɛ nea ɔyɛɛ no. Wuhia abien no nyinaa, na checksum ankasa da no adi kakraa bi pɛ.
- Zebra tintim a `SHA256SUMS` fael a ɛka ho ne **Sigstore** bundle a ɛde release no bata GitHub Actions adwumayɛ nhyehyɛe pɔtee bi ho, tag ne commit — ɛho nhia sɛ wɔhwɛ safoa so.
- Zallet tintim **GPG** nsaano nkyerɛwee a wɔatew ho (`.asc`) a ɛka SLSA fibea ne SBOM bi ho.
- Zcash nsaano nkyerɛwee safoa no danee wɔ afe 2026 mu firii Electric Coin Company kɔɔ Zcash Open Development Lab (ZODL). Sɛ woagye dedaw a wɔayi no adi no atom a, wuhia safoa foforo no — na nsafe abien no nyinaa de ne nsa ahyɛ nsaano nkyerɛwee no ase, enti wubetumi ahwɛ sɛ nsakrae no ankasa yɛ nokware.
- `gpg` bɔ **subkey** a ɛde ne nsa hyɛɛ fael bi ase no ho amanneɛ, ɛnyɛ safoa titiriw a wɔato din wɔ amanneɛbɔ mu. Nsateaa nkyerɛwee a ɛte sɛ nea ɛnteɛ no taa yɛ subkey, na ɛnyɛ ntua.
- Sɛ verification no di nkogu a, nnyɛ binary no.

*Wɔagye atom tia Zebra `v6.3.0` ne Zallet na wɔkyerɛwee `v0.1.0-beta.2` on 2026-08-18.*

## Nea enti a eyi ho hia kɛse ma Zcash

Wallet binary a wɔayɛ no basabasa betumi ayi sika a wɔsɛe no safe anaa safe a wɔde hwɛ ade afi mu. Nea ɛnte sɛ password a wɔahyɛ no agyirae no, saa adehwere no yɛ nea ɛtra hɔ daa: rollback biara nni hɔ, chargeback biara nni hɔ na support desk biara nni hɔ. Shielded transactions bɔ nea ɛkɔ so *on chain* ho ban — wɔmfa ahobammɔ biara mma koraa bere a wɔsesaa software a woreyɛ no ansa na ɛredu wo nkyɛn da no.

Eyi yɛ ntua akwan kakraa bi a protocol no kokoamsɛm ho bɔhyɛ ahorow no mfa ho kɛkɛ no mu biako. Verification ne layer a ɛkata so.

## Threat model — nea verification yɛ ne nea ɛnkyere

**Wɔkyeree:**

- Ahwehwɛ a wɔayɛ no foforo anaa fael a wɔasesa a wɔde fi baabi foforo a ɛnyɛ adwuma no kratafa a wɔayi no adi no som.
- Ɔbarima-a-wɔ-mfinimfini swap bere a wɔretwe.
- CDN a wɔabɔ no apete anaasɛ nkyekyɛmu host a wɔafa no.
- Adifudepɛ a ɛba wɔ akwanhyia mu wɔ akwantu mu.

**Ɛnkyere:**

- Ɔhwɛfo a ɔde ne nsa hyɛ mmara bɔne ase. Nsaano nkyerɛwee no bɛhwɛ sɛ ɛyɛ nokware yiye; ɛkyerɛ mfiase, na ɛnyɛ atirimpɔw.
- A compromised build host a ɛreyɛ ade a wɔde wɔn nsa ahyɛ ase nanso ɛyɛ adwemmɔne. Eyi ne nea adan a wotumi san yɛ ne provenance adansedi ahorow wɔ hɔ ma ɛyɛ teateaa.
- Safoa a wunya fii fibea koro no ara a wɔagye atom sɛ binary no. Sɛ ɔtowhyɛfo bi di fael no ne safe a wohwɛ mu no nyinaa so a, verification nka hwee nkyerɛ wo.

Saa asɛm a etwa to no ne nea akwankyerɛfo dodow no ara huruw. **Baabi a wubenya safoa no ho hia te sɛ nea wode ahyɛde no tu mmirika.**

---

## Part 1 — Zebra: checksums and Sigstore

Zebra tintim saa agyapadeɛ yi ma biribiara a wɔayi no adi:

| Agyapadeɛ | Botae a Ɛwɔ Hɔ |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | na binary archive no |
| `zebrad-<version>-<arch>.tar.gz.sha256` | fael biara checksum |
| `SHA256SUMS` | checksums ma architectures nyinaa |
| `SHA256SUMS.sigstore.json` | Sigstore bundle a wɔde wɔn nsa hyɛ ase `SHA256SUMS` |

### Anamɔn 1 — Twe

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Anamɔn 2 — Hwɛ checksum no

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Nea efi mu ba ankasa:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` no hwehwɛ wɔ ha efisɛ `SHA256SUMS` kata architecture biara so na woatwe biako pɛ. Sɛ enni hɔ a, . `sha256sum` bɔ aarch64 archive a enni hɔ no amanneɛ sɛ adi nkogu na ebia wobɛkenkan pass bi wɔ ɔkwan a ɛnteɛ so sɛ adi nkogu.

Fael biara mu nsakrae no nso yɛ adwuma:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Saa anammɔn yi nko ara nnɔɔso.** Wotwe checksum no fii beae koro no ara a binary no wɔ. Obiara a obetumi de biako asi ananmu no betumi de foforo asi ananmu. Checksum no di nokwaredi ho adanse; anammɔn a edi hɔ no di mfiase ho adanse.

### Anamɔn 2b — Saa ara na hwɛ wɔ Windows so

PowerShell nni bi `-c` verify mode, enti wode nsa bɛtoto ho:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Nea efi mu ba ankasa:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Fa ɛno toto Linux aba a edi kan wɔ kratafa yi mu no ho:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Identical values.** Hex kura case biara, na eyi ne atoro alarm biako pɛ a ɛtaa ba wɔ Windows so.

Mfiri abien foforo a ɛfa Windows pɔtee bi ho:

- **Exit code biara nni hɔ a ɛsɛ sɛ wohwɛ.** Wɔ Linux so no, . `sha256sum -c` san de 1 ba wɔ huammɔdi so na script bi betumi ayɛ ho adwuma. `Get-FileHash` only prints a hash — ntotoho no yɛ wo dea sɛ wobɛyɛ, na wo deɛ sɛ wobɛdi mfomsoɔ denam skimming so.
- **Sɛ wode aniwa kenkan hex nkyerɛwde 64 a, ɛnyɛ nea wotumi de ho to so.** Ma shell no nyɛ:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **Wɔ macOS so:** adwumayɛ kwan no yɛ pɛ, nanso BSD userland de po so hyɛn `shasum` mmom sen sɛ `sha256sum` - fa di dwuma `shasum -a 256 -c --ignore-missing SHA256SUMS`. Na krataafa yi kyerɛwfo no nni macOS mfiri biara a ɛwɔ hɔ, enti wɔkyerɛw saa ahyɛde no fi Apple nnwinnade mu sen sɛ ɛbɛkɔ so. Sɛ wo verify wɔ macOS so a, yɛsrɛ wo bue PR a ɛsi so dua anaa siesie.

### Anamɔn 3 — Hwɛ sɛ Sigsore bundle no yɛ nokware

Sigstore de adansedi nkrataa a ɛtra hɔ kyɛ a wɔakyekyere wɔ CI agyiraehyɛde so, a wɔakyerɛw wɔ ɔmanfo pefeeyɛ kyerɛwtohɔ mu besi nsaano nkyerɛwee safe a ɛtra hɔ kyɛ ananmu. Obiara nni hɔ a okura safe a wɔde gyae nneɛma a wobetumi awia.

Ɔkwan a ɛyɛ tẽẽ no de di dwuma `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Nnipa baanu no `--certificate-*` frankaa ne asɛm no nyinaa. **Wɔn nka ho a woresi so dua kɛkɛ sɛ obi, baabi de ne nsa hyɛɛ fael no ase.** Wɔn na woresi so dua sɛ adwumayɛ kwan bi a ɛwɔ Zebra akoraeɛ no na ɛde ne nsa ahyɛ aseɛ, a GitHub OIDC issuer no agye atom.

> ⚠️ **Version ho hia.** Cosign builds dedaw no ntumi nkenkan Sigstore bundle format a ɛwɔ hɔ mprempren no. Mmirikatu a ɛwɔ atifi hɔ no ne cosign `v2.4.1` ɛma:
>
> ```
> Mfomso: bundle nni cert a ɛbɛma wɔagye atom, yɛsrɛ wo fa ɔmanfo safoa ma
> ```
>
> Bundle no *yɛ* adansedi krataa — ɛtra ase `verificationMaterial.certificate.rawBytes`, a nhoma dedaw a wɔayi no adi no nhwehwɛ. Eyi yɛ client anohyeto, ɛnyɛ abubu a wɔayi no adi. Sɛ wobɔ no a, upgrade cosign sen sɛ wobɛwie sɛ download no nye. Cosign a wɔahyɛ no ma a wɔkyekyɛ no taa di akyi koraa wɔ asubɔnten no atifi.

Anamɔn abien a edi hɔ no kyerɛ sɛnea wɔde nsa di bundle koro no ara ho adanse, a ɛfata sɛ wɔte ase ɛmfa ho — na ɛyɛ adwuma fallback bere a wo cosign build no rennyɛ biako.

### Anamɔn 4 — Kenkan nea adansedi krataa no ka ankasa

Wubetumi ahwɛ bundle no mu a wunni `cosign`, a mfaso wɔ so sɛ wobɛte nea wode wo ho to so no ase. Yi adansedi krataa no fi mu:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Ankasa nea efi mu ba ma Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject Alternative Name no ne nea ɛkyerɛ sɛ obi yɛ ade. Ɛbɔ adekorabea no din, adwumayɛ fael no pɛpɛɛpɛ, ne tag no. Sigstore embeds kɔ so kyekye metadata wɔ amanne ntrɛwmu mu:

| Afuo | Botae a ɛwɔ v6.3.0 |
|---|---|
| OIDC a ɛde ma | `https://token.actions.githubusercontent.com` |
| Source akoraeɛ | `https://github.com/ZcashFoundation/zebra` |
| Si commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Mmirikatufoɔ tebea | `github-hosted` |
| Adwumayɛ nhyehyɛe run | `.../actions/runs/31424510487/attempts/1` |
| Adekorabea a wotumi hu | `public` |

Eyinom mu biara yɛ nea wotumi hwɛ mu. Ɛsɛ sɛ commit hash no ne tag a ɛwɔ akoraeɛ no mu no hyia; ɛsɛ sɛ adwumayɛ nhyehyɛe no wɔ hɔ na ɛyɛ baguam.

### Anamɔn 5 — Hwɛ sɛ nsaano nkyerɛwee no yɛ nokware wɔ cryptographic kwan so

Wubetumi de OpenSSL asi nsaano nkyerɛwee no so dua tẽẽ:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Nea efi mu ba ankasa:

```
Verified OK
```

Bundle no nso kyerɛw digest a ɛde ne nsa hyɛɛ ase no. Si so dua sɛ ɛne wo mpɔtam hɔ fael no hyia:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Anamɔn 6 — Na transparency log entry no

Bundle no kura Rekor entry a ɛkyerɛ sɛ wotintim nsaano nkyerɛwee no wɔ ɔmanfo, append-only log:

| Afuo | Botae a Ɛsom |
|---|---|
| Rekor log index no ho nsɛm | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Wɔaka abom wɔ | 2026-08-10 19:43:09 UTC |

Eyi ne nea ɛma wotumi hu silent key a wɔde di dwuma ɔkwammɔne so. Nsaano nkyerɛwee a amma wɔ kyerɛwtohɔ no mu da, anaasɛ epuei wɔ bere a wontumi nnye nni mu no yɛ sɛnkyerɛnne a ɛfata sɛ wɔyɛ ho adwuma. Fa bere a wɔde bɛka abom no toto dawurubɔ a wɔde too gua no ho.

> **Hyɛ no nsow wɔ OpenSSL kwan no so:** ɛhwɛ nsaano nkyerɛwee no so wɔ abodin krataa no baguam safoa no ho, nanso ɛno ankasa nnye abodin krataa nkɔnsɔnkɔnsɔn no ntom nkɔ Sigstore ntini no so anaasɛ ɛnhwɛ log entry no inclusion proof. `cosign verify-blob` yɛ abiɛsa no nyinaa. Fa OpenSSL di dwuma na te adwinnade no ase; fa di dwuma `cosign` sɛ wo check ankasa.

---

## Ɔfa 2 — Zallet: GPG nsaano nkyerɛwee

Zallet tintim agyapade ahorow a ɛsono emu biara:

| Agyapadeɛ | Botae a Ɛwɔ Hɔ |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | na binary archive no |
| `.tar.gz.asc` | detached GPG nsaano nkyerɛwee |
| `.tar.gz.intoto.jsonl` | SLSA fibea ho adansedi |
| `.tar.gz.provenance.json` | nea efi mu ba metadata |
| `.tar.gz.sbom.spdx` | software bill a ɛfa nneɛma ho |

### Anamɔn 1 — Hu signing key no ansa na woakɔhwehwɛ

Run verification *di kan*, a wɔmfa safoa biara mmra:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Nea efi mu ba ankasa:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Eyi nyɛ huammɔdi. Ɛka kyerɛ wo sɛ nsaano nkyerɛwee bi wɔ hɔ na ɛbɔ safoa a wuhia din pɛpɛɛpɛ, **ansa na** wobɛhyɛ aseɛ ahwehwɛ. Hyɛ nsateaa nkyerɛwee ne nea ɔde mae no nsow, afei nya safe no fi baabi a ɛnyɛ nea wɔatwe no.

> `gpg` tintim bere nsɔano ahorow wɔ wo mpɔtam hɔ bere nhyehyɛe mu. Nea efii mu bae wɔ atifi hɔ no kyerɛ `WAT` (UTC + 1) a wɔde yɛ adwuma; nsaano nkyerɛwee koro no ara kenkan `18:18:44 UTC` wɔ mmeae afoforo. Saa ara na ntɛm ara. Mfa bere nhyehyɛe mu nsonsonoe nyɛ nea ɛne ne ho nhyia.

### Anamɔn 2 — Import safoa no na hwɛ sɛ ɛyɛ nokware

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Nea efi mu ba ankasa:

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

`Good signature` ne nea na wopɛ. Nneɛma abien a ɛwɔ saa output no mu ma nkurɔfo adwene tu fra, na abien no nyinaa yɛ ade a ɛfata.

### Nea enti a nsateaa nkyerɛwee no ne dawurubɔ no nhyia

ZODL safoa nsakrae asɛm no bɔ nsateaa nkyerɛwee din `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Nanso `gpg --verify` bɔɔ amanneɛ `1FE9 9324 …  23F0 617F`. Ɛno te sɛ nea ɛne ne ho nhyia na ɛnte saa.

`gpg` bɔ **subkey** a ɛyɛɛ nsaano nkyerɛwee no ho amanneɛ. Dawurubɔ no bɔ **primary key** no din. W’ankasa si abusuabɔ no so dua:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Nea efi mu ba ankasa:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

No `sub` line ne signing subkey no; no `pub` line ne nea edi kan. Identity biako, key package biako. Wei nti na verification output no tintim **abien no nyinaa** nsateaa nkyerɛwee — fa *primary* toto dawurubɔ biara a wɔatintim ho, na fa subkey line no di dwuma sɛ ɛkyerɛ wo key no fã bɛn na ɛyɛɛ adwuma no.

Safoa a wɔbɛkyekyɛ mu saa kwan yi so no yɛ nea wɔahyɛ da ayɛ: wobetumi adan nsafe ketewa bi a wɔde wɔn nsa ahyɛ ase anaasɛ wɔatwa mu a wɔrentow nea ɛkyerɛ titiriw ne ne ahotoso a wɔaboaboa ano no ngu.

### Nea ɛyɛ `[unknown]` kɔkɔbɔ kyerɛ

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Eyi yɛ **ɛnyɛ** ɔhaw wɔ nsaano nkyerɛwee no ho. Nsaano nkyerɛwee no yɛ cryptographically valid — ɛno ne nea `Good signature` ka no. Kɔkɔbɔ no ka biribi soronko: wonka nkyerɛɛ wo mpɔtam hɔ GnuPG sɛ wugye di sɛ saa safoa yi yɛ nea ɛkyerɛ sɛ ɛyɛ no dea.

GnuPG tetew nsɛmmisa abien mu:

1. **So saa safoa yi de ne nsa hyɛɛ fael yi ase?** — answered by `Good signature`. Cryptographic, nnipa atemmu biara nni hɔ.
2. **So saa safoa yi yɛ ZODL dea?** — wɔmfa cryptography mmua koraa. Wode si hɔ denam nsateaa nkyerɛwee no a wobɛhwɛ wɔ fibea bi a ɛde ne ho so.

Ɛkame ayɛ sɛ wubehu kɔkɔbɔ yi wɔ nokwaredi biara mu gye sɛ wode wo nsa hyɛ safe no ase pefee wɔ mpɔtam hɔ. Mfa no sɛ huammɔdi. **Yɛ** sa obi a wayera `Good signature` sɛ huammɔdi.

### Anamɔn 3 — Hwɛ sɛ nsakrae titiriw no ankasa yɛ nokware

Zcash release signing tu fii Electric Coin Company kɔɔ Zcash Open Development Lab wɔ afe 2026 mu, bere a kan ECC mfiridwuma ne nneɛma kuw no hyehyɛɛ ZODL wɔ January 2026 mu akyi.

| | Safoa dedaw | Safoa foforo |
|---|---|---|
| Nsateaa nkyerɛwee | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Nsɛnkyerɛnne Safoa (ECC) . `<sysadmin@z.cash>` | Zcash Nkɔso a Wɔabue (ZODL) . `<sysadmin@zodl.com>` |
| Type | RSA 3072-bit, wɔbɔɔ no 2023-06-19 | RSA 4096-bit, a wɔbɔɔ no 2026-03-23, ɛtwam 2028-03-22 |
| Wotintimii wɔ | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Bere nhyehyɛe a wɔatintim: safoa foforo a wɔyɛe 2026-03-23, wɔde too gua 2026-03-27, wɔde wɔn nsa hyɛɛ ase nkutoo fi 2026-04-23, wɔayɛ nhyehyɛe sɛ wɔbɛpopa ECC safoa dedaw 2026-06-23.

Dawurubɔ a wɔde to gua wɔ wɛbsaet bi so no yɛ nea wotumi de ho to so te sɛ wɛbsaet no nkutoo. Adwinnade a ɛteɛ ne asɛm bi **a wɔde nsafe abien no nyinaa ahyɛ ase pefee**, enti safoa dedaw no di foforo no ho adanse. ZODL tintim saa pɛpɛɛpɛ:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Ankasa output (abridged — nsaano nkyerɛwee abien wɔ krataa biako so):

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

Mmienu `Good signature` nea efi mu ba wɔ krataa biako so, fi safoa dedaw no ne foforo no so. Sɛ wo nyaa ECC safoa no mu ahotosoɔ maa nea wɔayi no adi kane a, seesei saa ahotosoɔ no kɔ n’anim kɔ ZODL safoa no so a ɛnhia sɛ wode wo ho to so `zodl.com`, `apt.z.cash`, anaasɛ asɛm bi a wɔde too gua wɔ forum so. Eyi ne agyapade a ɛsɛ sɛ wohwehwɛ bere biara a adwuma bi bɛdannan safe — na nea enni hɔ no fata sɛ wobisa ho asɛm.

### Baabi a wobenya safe — ne baabi a wonnya

Wɔde atoto nea eye sen biara so kosi nea enye koraa so:

1. **Asɛm bi a wɔde safoa a atwam no de wɔn nsa ahyɛ ase**, sɛnea ɛwɔ atifi hɔ no. Ɔkwan a emu yɛ den sen biara a wobetumi apaw wɔ rotation akyi.
2. **Fibea a ɛde ne ho fi nea wɔatwe no ho.** Binary no fi GitHub; safoa no fi `apt.z.cash`. Obi a ɔtow hyɛ nkurɔfo so hia abien no nyinaa.
3. **Keyserver, cross-checked against a published fingerprint.** Obiara betumi de safoa a ɛkyerɛ sɛ ɛyɛ biara akɔ keyserver dodow no ara so. Nsateaa nkyerɛwee ntotoho no ne nea ɛma eyi yɛ ahobammɔ — ɛnyɛ keyserver no.
4. **Kratafa koro no ara ne binary no.** Ɛkame ayɛ sɛ awerɛhyem biara nni hɔ. Obiara a obetumi de biako asi ananmu no betumi asi ɔfoforo ananmu.

Bere nyinaa fa **full** nsateaa nkyerɛwee no toto **primary** safoa no ho. ID safoa ntiantiaa no yɛ nea wotumi bɔ mu wɔ ɔkwan a ɛho nhia so na wɔde adi dwuma wɔ ntua ankasa mu.

## Ɔfa 3 — Nhwehwɛmu a ɛdi nkoguo

Sɛ wunim sɛnea huammɔdi te nkutoo a, mfaso wɔ so sɛ wobɛhwɛ so yiye. Nea ɛyɛ ankasa ni, a wɔyɛ denam null byte biako a wɔde bɛka archive a ɛfata ho:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Nea efi mu ba ankasa:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Fie koodu: `1`.

Fa digests abien no to nkyɛnkyɛn:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Bait biako a wɔde kaa fael a ɛwɔ baiti 66,992,676 ho. Hash abien no nkyɛ hwee — ɛnyɛ prefix, ɛnyɛ pattern. Nkitahodi fã biara nni hɔ na "bɛn sɛnea ɛsɛ" biara nni hɔ: checksum bi hyia pɛpɛɛpɛ anaasɛ fael no nyɛ fael a wopɛ.

### Nea ɛsɛ sɛ wɔyɛ bere a eyi asi no

1. **Ntu mmirika binary no.** Nnyi no, nnyɛ `chmod +x` it.
2. **Sɔ mmɔden bio fi official release page.** Nkonimdi dodow no ara yɛ truncated downloads.
3. **Sɛ ɛdi nkoguo ne mprenu so a, sesa network kwan.** Nkitahodi soronko, anaa VPN. Di huammɔdi a edi w’akyi wɔ ntam nkitahodi ahorow so no yɛ soronko wɔ nea enni hɔ no ho.
4. **Si so dua sɛ wowɔ checksum fael a ɛfata ma version a ɛfata.** Sɛ wode v6.3.0 toto v6.2.3 sums ho a, ɛbɛdi nkogu yiye.
5. **Sɛ ɛda so ara di nkoguo a, bɔ amanneɛ.** Bue asɛm bi wɔ adwuma no akoraeɛ, anaa fa ahobanbɔ nkitahodiɛ no di dwuma wɔ `SECURITY.md` efisɛ biribiara a wususuw sɛ wɔahyɛ da ayɛ. Hwɛ sɛnea [Zcash Abɔde a Nkwa Wom Ahobammɔ](/zcash-community/zcash-ecosystem-security) kratafa a ɛkyerɛ akwan a wɔfa so da nneɛma adi.
6. **Keep the artifact.** Binary a wɔayɛ no foforo yɛ adanse. Mpopa ansa na woabɔ amanneɛ.

Signature huammɔdi yɛ aniberesɛm sen checksum huammɔdi. Checksum a ɛnhyia taa yɛ adifudepɛ; fael-a-fael-nanso-nsaano-bɔne nyɛ biribi a ɛba wɔ akwanhyia mu.

---

## Ɔfa 4 — Nhwehwɛmu pon

| Dwumadie | Nsɛm a wɔayi no adi a wotintimii wɔ | Ɔkwan a Wɔfa so | Baabi a safoa no fi |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore a wɔde ahyɛ mu | Safoa biara nni hɔ — CI identity via GitHub OIDC |
| **Zallet** na ɛyɛ | `github.com/zcash/zallet/releases` | GPG a wɔayi afi mu `.asc`, SLSA a efi mu ba, SBOM | `apt.z.cash/zodl.asc` - mfiaseɛ `0338 34DD…58E2 6AB1`, nsaano nkyerɛwee subkey `1FE9 9324…23F0 617F` |
| **zcashd** na ɛyɛ adwuma | *wɔakɔ pɛnhyen* | — | Wogyinaa block 3,417,100 wɔ 2026-07-18. Mfa nhyɛ mu. |
| **Zodl** (kan no na wɔfrɛ no Zashi) | App Store / Google Play a wɔde di dwuma; `zodl-inc` wɔ GitHub so | Store a wɔde wɔn nsa hyɛ ase; standalone Android binaries GPG-a wɔde wɔn nsa ahyɛ ase | ZODL safoa biara nsakrae asɛm |

> **Naming note:** Wɔsesaa Zashi din yɛɛ no ​​**Zodl** wɔ afe 2026 mu — nea edi kan wɔ App Store, afei wɔ Google Play. Akwankyerɛfo dedaw a wɔka "Zashi" ho asɛm no kyerɛkyerɛ sika kotoku abusua koro no ara mu.

---

## Ɔfa 5 — Mobile ne hardware sika kotoku

Verification yɛ adwuma soronko bere a woagyae direct downloads no.

**App stores.** Wo ankasa worentumi nhwɛ nsaano nkyerɛwee bi. Store no de ne nsa hyɛ package no ase na wowɔ ahotoso sɛ store no nhwehwɛmu ne developer account no mudi mu kura. Nea *wubetumi* agye atom ne sɛ wowɔ app a ɛfata: si ɔdawurubɔfo din ne package identifier no so dua wɔ adwuma no official site no so, na ɛnyɛ nea ɛne nea wɔhwehwɛ no nhyia. Apps a wɔde yɛ wɔn ho sɛ obi abu so, na sotɔɔ bi a wɔakyerɛw wɔn din nyɛ adanse a ɛkyerɛ sɛ ɛyɛ nokware.

**Standalone Android APKs.** Eyinom *betumi* agye atom. ZODL tintim GPG-signed standalone Android binaries denam GitHub Releases so, enti Ɔfã 2 adwumayɛ nhyehyɛe no di dwuma. Sɛ wopɛ nkɔnsɔnkɔnsɔn a wotumi hwɛ mu a, pɛ saa kwan yi.

**Hardware wallets.** Afiri no di n’ankasa firmware ho adanse, enti ahotoso anchor no yɛ hardware no, ɛnyɛ fael a ɛwɔ wo mfiri no so. Hwɛ [Keystone Zashi na ɔkyerɛwee](/guides/keystone-zashi) ma device-verification flow no ho. Kɔtɔ tẽẽ fi nea ɔyɛe no hɔ — supply-chain tampering si wɔ adwumayɛbea ne adetɔfo ntam.

---

## Akenkan a ɛkɔ akyiri

- [Zcash Abɔde a Nkwa Wom Ahobammɔ](/zcash-community/zcash-ecosystem-security) — nsɛm a wɔda no adi ho nhyehyɛe ne ahobammɔ ho nkitahodi
- [Zebra Full Node a Ɛyɛ Fɛ](/zcash-tech/zebra-full-node) — installing Zebra bere a woagye atom akyi
- [Zallet Ntɛmntɛm Nhwehwɛmu Akwankyerɛ](/using-zcash/zallet-quick-reference-guide) — a wode Zallet di dwuma
- [Sigstore nkrataa a wɔde kyerɛw nsɛm](https://docs.sigstore.dev/)
- [SLSA fibea dodow a ɛwɔ hɔ](https://slsa.dev/)

---

*Wɔde ahyɛdeɛ a ɛwɔ krataafa yi mu no tuu mmirika tiaa Zebra `v6.3.0` ne Zallet na wɔkyerɛwee `v0.1.0-beta.2` wɔ 2026-08-18 mu. Release tooling nsakrae: sɛ output yɛ soronko wɔ nea wɔakyerɛ wɔ ha no ho a, gye w’ankasa run di na yɛsrɛ wo bue PR.*
