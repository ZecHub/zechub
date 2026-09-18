<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash a w'ayi no adi akyerɛ wo.

## TL;DR

- Zcash binary a woatwe no nnyɛ ade koro na w'anya nea wɔatintim. Wode di nsonsonoe ho adanseɛ.
- Sɛ wode checksum di dwuma a, ɛkyerɛ sɛ wo nsa kaa nea w'akyerɛw no. Wo de, wuhia abien nyinaa na ɛno nko ara nkyerɛ hwee koraa.
- Zebra tintim a- `SHA256SUMS` file plus a **Sigstore** bundle that ties the release to a specific GitHub Actions workflow, tag and commit  no key management required.
- Zallet tintim GPG nsaanow a w'ayi afi mu (`.asc`) aka SLSA fibea ne SBOM ho.
- Zcash nsaano ahyɛnsode no sesae wɔ afe 2026 mu fii Electric Coin Company hɔ kɔɔ Zcash Open Development Lab (ZODL). Sɛ woahwehwɛ nsesaeɛ a akyɛ yie, wuhia ɔfã foforɔ  na wɔn mmienu nyinaa asi sa so de kyerɛ sɛ wɔde saa abodin yi ato obi foforo nsam. Enti wobɛtumi ahwɛ sɛ ne nyinaa yɛ pɛpɛɛpɛ anaa.
- `gpg` Deɛ ɛwɔ hɔ no, sɛ obi twe ne nsa a na ɛnyɛ nokorɛ. Sɛ nsateaa bi ho mfoni nyɛ papa a, ɛno yɛ ɔfã foforo wɔ biribi mu, ɛnnyɛ ade bɔne biara.
- Sɛ verification no ankɔ yie a, mma wonnyi binary no.

*Verified against Zebra `v6.3.0` ne Zallet `v0.1.0-beta.2` on 2026-08-18.*

## Deɛ enti a wei ho hia pa ara ma Zcash no ne sɛ, wɔ bɛtumi ayɛ saa.

Sɛ wofa obi akwantuo krataa a, ɔtumi nya sika anaa ne nsa ano ahyɛnsode. Ɛnte sɛ password no deɛ, saa ade yi yɛ daa: wontua bi so ka bio na wɔntwe ɛka foforo nso fi ho; wonni mmoa biara wɔ hɔ mma w'adwumam. Akwantufoɔ bɔ nea ɛrekɔso *on chain* ho ban  ɛnni ahobammɔ koraa bere a wɔde software foforɔ adi dwuma ansa na ɛbɛdu wo nkyɛn.

Eyi yɛ akwan a wɔde to obi so kakraa bi no mu biako, baabi a mmara no ho ahobammɔ nsiesie nni mfaso. Nsɔhwɛ ne nea ɛkata akyi.

## Nsεso a εbͻ ho dawuro  nea w'asɔ mu no yε na ԑnyԑ sε wobedi so nkunim

*o catches:* o's a whale, no more.

- Ahintaw a wɔakyinkyim anaa ɔfã bi a wɔasesa no, wɔde ma afi baabi foforo sen adwuma no fã hɔ.
- Ɔbarima a ɔwɔ mfinimfini no sesa bere a wɔretu afiri so.
- CDN a wɔagye ato mu anaa ɔhwɛfoɔ bi a wɔde ne ho ahyɛ no nsa.
- Anigyesɛm a ɛba akwantu mu.

**Nkyere:**

- Ɔhwɛfo a ɔde ne nsa hyɛ nsɛmfua bɔne bi ase. Nsaano nkyerɛwee no bɛkyerɛ sɛ asɛm no yɛ nokware; ɛkyerɛ baabi a efi, na ɛnyɛ adwene a obi de yɛɛ ho adwuma.
- Ɔdan a wɔagye ato mu na ɛma wonya adeyɛde bi nanso ɛyɛ bɔne. Eyi ne nea wɔn adane no yɛ adwuma ma ɛne baabi a wofi di dwuma.
- Sɛ obi a ɔde ɔsɛe ba di fael no ne nea wode sɔ ano nyinaa so, hu sɛ biribi nni hɔ.

That last point is the one most guides skip. **Where you get the key matters as much as running the command.**

---

## Ɔfã 1  Zebra: checksum ne Sigstore

Zebra de saa nneɛma yi to dwa wɔ ne nkyerɛase biara mu:

Dwumadibea. Botae.
|---|---|
| `zebrad-<version>-<arch>.tar.gz` Ԑyԑ binary archive no.
| `zebrad-<version>-<arch>.tar.gz.sha256` Per-file checksum. (Nneɛma a ɛfa ɔfese biara ho)
| `SHA256SUMS` Ԑyԑ nhwehwεmu a ԑfa akwankyerԑ nyinaa ho.
| `SHA256SUMS.sigstore.json` Sigstore nnwumakuo a wɔhyɛ nsa hyɛ wɔn ho ase no mu. `SHA256SUMS` |

### Nnyԑ ade a ԑkyerԑ sԑ wo yԑ obi.

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Nnyεasoɔ 2  SƆ W'AWƐN AHUDEHYƐ NO HWEHYI

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Nokware mu nkɛntɛnso:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` ho hia ha efisԑ `SHA256SUMS` Ɛfa ɔdan biara ho, na emu biako pɛ na woatwe. `sha256sum` ka aarch64 akoraeɛ no ho asɛm sɛ adi nkoguo na wobɛtumi asesa akenkan bi mu sɛ adi nkuguo.

Ɔfã biara mu nsesae no nso yɛ adwuma:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Yei nko ara nnyɛ ade a ɛfata.** Woyii checksum no fii beaɛ korɔ mu te sɛ binary. Obiara a obetumi asesa baako betumi asesa ɔfoforɔ nso. Checksum yi kyerɛ nokwaredi; ɛdansoɔ foforo no yɛ mfitiase ho adanse.

### Anammɔn 2b  Sεnea nsesaeԑ no ara wɔ Windows so

PowerShell nni dwuma biara wɔ saa dwumadie yi mu. `-c` verify mode, enti wo de manual toto ho:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Nokware mu nkɛntɛnso:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Fa toto Linux ho nsunsuanso a ɛwɔ kratafa yi mu no:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Nsɛm a ɛne no hyia.** Hex nni asɛm, na eyi ne kasafĩ baako a ɛtaa ba wɔ Windows so.

Nsateaa foforo abien a wɔde di dwuma wɔ Windows mu:

- **Nnipa nni kwan a wɔfa so tu kɔ no bi.** Wɔ Linux, `sha256sum -c` de 1 ma bere a biribi anyɛ yiye na script bi betumi ayɛ ho adwuma. `Get-FileHash` de hash bi na etintimii  wo ara betumi ayɛ ntotoho no, na w'ankasa nso bɛtumi adi mfomso denam animtiaabu so.
- *Nkyerɛwee 64 a wɔde aniwa kenkan no nyɛ nea wotumi de ho to so.** Ma ahinhim no nko ara nsua:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> ** Wɔ macOS so no, adwuma a edi dwuma yɛ pɛ nanso BSD userland ship-fo de di dwuma. `shasum` sen sɛ wo bɛ `sha256sum`  fa di dwuma `shasum -a 256 -c --ignore-missing SHA256SUMS`Saa ɛpɛ sɛ wo di macOS so a, yɛsrɛ ma yɛ bue PR na ama no ayɛ yie.

###  Siesie Sigstore no faako a w'atwe ne ho akɔsoɔ

Sigstore de kyɛfa a ɛnni hɔ nkyɛ di dwuma ma wɔn, na wɔde tumi krataa bi si ananmu. Obiara nni anoyie paneɛ no so a obi bɛtumi awia.

Kwan a ɛyɛ tee no de di dwuma. `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Wɔn baanu no `--certificate-*` flags ne ade no nyinaa. **Wɔn a wonni wɔn de, w'ahyɛ sɛ obi wɔ baabi na watwerɛ krataafa ase.** Wode wɔn yɛ adwuma nso kyerɛ sɛ ɛyɛ biribi a ɛwɔ Zebra akoraeɛ hɔ na GitHub OIDC deɛ adi so akyerɛw ato mu ama ayɛ saa.

> ️ **Nsɛm a ɛfa nkyerɛase ho.** Nnansa cosign nhyehyeɛ ntumi nkenkan Sigstore nnwom no mu mfoni. Ɛde nea ɛwɔ soro yi di dwuma wɔ cosign so `v2.4.1` ma wɔn a wɔtɔ so mmienu:
>
> ```
> Mfomso: mfidie no nni certificate a wobɛtumi de adi dwuma, ma w'afiri mu nkyerεkyerεmu bi
> ```
>
> Saa nnwumakuo yi wɔ *sɛnea* certificate bi te  a ɛwɔ ase hɔ no so. `verificationMaterial.certificate.rawBytes`Sɛ wo twe a, upgrade cosign sene sɛ wobɛka sɛ download no yɛ bɔne. Distribution-packaged cosign taa di akyire wɔ upstream ho.

Nnyεm mmienu a edi hɔ no kyerɛ sεnea wobԑfa nsa ahwehwε afidie koro yi ara, nea ԑfata sɛ w'ate ase ne nyinaa akyi  na εyε nsunsuanso pa bere a wo co-signs ankyerε adwuma.

### Nnyεaso 4  Kenkan nea w'akyerɛw no ankasa wɔ krataa no so.

Wubetumi ahwɛ nneɛma a wode asie no so bere a w'ani nna hɔ. `cosign`, a yε wͻfaso ma nteaseε nea wo de ahotoso kyerε. Twe twerεtohɔ no:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Real output for Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject Alternative Name no yɛ ne din. Ɛkyerɛ bea a wɔde nneɛma sie, adwuma fael pɔtee, ɛne tag no. Sigstore de metadata foforo hyɛ custom extensions mu:

Ntam kwan no. Ɛho hia ma v6.3.0
|---|---|
OIDC ne nea ɔde no mae. `https://token.actions.githubusercontent.com` |
Nkyerεmabea korabea. `https://github.com/ZcashFoundation/zebra` |
Siesie nsɛm a wode bɛhyɛ aseɛ. `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
Ɔtemmufo no: `refs/tags/v6.3.0` |
Runner mu asetena. `github-hosted` |
Adwuma mu dwumadi. `.../actions/runs/31424510487/attempts/1` |
Ahyehyɛdeɛ no anibue. `public` |

Eyinom mu biara betumi asesa. Ɛsɛ sɛ hash a wɔde hyɛ adwuma ase no ne nea ɛwɔ akoraeɛ hɔ hyia; ɛsɛ sɛ dwumadi kwan no wɔ hɔ na ɛyɛ baguam de.

### Nkrataa a w'akyerɛw no fa ho, na woahyɛ ase wɔ kasa foforo mu.

Wobɛtumi asiesie nsaano no tẽẽ wɔ OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Nokware mu nkɛntɛnso:

```
Verified OK
```

Nhyehyɛe no nso rekyerɛw nea wɔhyehyɛ too hɔ. Si so dua sɛ ɛne wo mpuntuo a ɛwɔ ha hyia:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Adesuadeɛ a ɛtɔ so nwɔtwe: Transparency log entry

Nkrataa a ɛwɔ nkrataa mu no kyerɛ sɛ wɔatintim nsaano nkyerɛwee no adi kan, na wɔde ato hɔ ama ɔmanfo:

Ntam. Ɛho mfasoɔ.
|---|---|
Ԑwͻ sε w'aka wo ho asem anaa? Record log index. `2412071838` |
Ɛwɔ ɔhyeɛ a wɔhyɛ mu. `hashedrekord v0.0.1` |
wԑn Aban Ahyehyԑde wɔ 2026-08-10 19:43:09 UTC.

Eyi na ɛma silent key atwitwa a wɔtumi hu no. Nsaano nkyerɛwee bi a amma da, anaa ɛbaa bere a ɛnyɛ papa mu yɛ nsɛnkyerɛne a ɛsɛ sɛ yɛyɛ ho biribi. Fa faako berɛ ne deɛ wɔde rebɛyi afiri hɔ asɛm toto ho.

> **Notes on the OpenSSL path:** verifies the signature against the certificate's public key, but it does not by itself validate the certificate chain to Sigstore's root or check the log entry's inclusion proof. (Ɔhwɛ a ɔhwehwɛ sɛ ne nsaano nkyerɛwee no yɛ krado wɔ adansedie krataa no so) `cosign verify-blob` Ɔyɛ ade a, ɔfa akwan mmiɛnsa yi nyinaa so. Fa OpenSSL di dwuma na woate ɔkwan no ase; fa `cosign` sɛ wo ankasa cheki.

---

## Ɔfã 2  Zallet: GPG nsaano nkyerɛwee

Zallet de nneɛma foforo bi na ɛtaa to gua:

Dwumadibea. Botae.
|---|---|
| `zallet-<version>-<platform>.tar.gz` Ԑyԑ binary archive no.
| `.tar.gz.asc` GPG nsaano nkyerɛwee a wɔayi no.
| `.tar.gz.intoto.jsonl` SLSA ahoɔdzen ho adansedie nkrataa.
| `.tar.gz.provenance.json` Ahɔhoyɛ ho metadata.
| `.tar.gz.sbom.spdx` Nhyehyɛe a wɔde yɛ nneɛma ho nhyehyɛe.

### Anammɔn 1  Hu nsaano mfoni no ansa na woakɔhwehwɛ bi

Yɛ verification no *first*, a key biara nni mu:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Nokware mu nkɛntɛnso:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Eyi nyɛ nkogu. Ɛka kyerɛ wo sɛ nsaano krataa bi wɔ hɔ na ɛkyerɛ ahyɛnsode a wuhia no pɛpɛɛpɛ ansa na woafi ase rehwehwɛ. Hyɛ nsateaa ano ne nea ɔde mae no nsow, afei nya ɔfã a ɛnni download yi akyi so tumi ma wonya key no.

> `gpg` print time stamps wɔ wo beaeɛ bere nkyekyɛmu. output a ɛwɔ soro no kyerɛ `WAT` (UTC+1); saa nsaano nkyerɛwee koro no ara ka sɛ: `18:18:44 UTC` baabi foforo. Ɛbere koro no ara mu. Mfa bere a ɛsono nsonsonoe ho nyɛ ade sɛ biribi ntaa nsiesie ne ho mma ɛnyɛ yiye.

### Nkrataafa 2  Fa adansedie no na di ho adanseɛ

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Nokware mu nkɛntɛnso:

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

`Good signature` Nneɛma abien wɔ saa output no mu a ɛpa nkurɔfo adwene, na ne nyinaa yɛ nea ɛteɛ.

### Adɛn nti na nsateaa no mfata nea wɔkaa ho asɛm no?

ZODL kͻmputa no mu ntεmhyɛe din a w'atwe afiri ho na wode ato nsensanee so. `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`Nanso . `gpg --verify` a wɔkaa ho asɛm no `1FE9 9324 …  23F0 617F`Ɛte sɛ nea ɛne no nhyia, nanso ɛnte saa.

`gpg` Deɛ edi kan no de, fa saa asɛm yi to dwa: "Ɛyɛ sɛ woahyehyɛ biribi a wobɛtumi ayɛ wɔ aberɛ biara".

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Nokware mu nkɛntɛnso:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

no mu a, na `sub` kwan no yɛ nsahyɛso nkataho; `pub` Saa nti na verification output prints **both** fingerprints  compare the *primary* against any published announcement, and treat the subkey line as telling you which part of the key did the work.

Saa kwan yi so na wɔhyɛ da kyekyɛ nkyeresoɔ: wobetumi asesa anaa agye abodin a ɛnni kan no mu bi ato hɔ, nanso wɔnnwene sɛ ɛsɛsɛ wɔde di dwuma.

### Ɛdɛn na ɛrekɔ so? `[unknown]` kɔkɔbɔ ho kwan a ɛkyerɛ.

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Eyi yɛ **not** ɔhaw wɔ nsaano nkyerɛwee no ho. Nsaano nkyerɛwde no di mu  ɛno ne nea enti a `Good signature` Kyerԑwnsԑm no ka biribi foforo: woanka ankyerɛ w'asekyerɛfo a ɔwɔ hɔ sԑ GnuPG na wogye di sɛ saa kͻkͻso yi yε nea ɔka sԑ ɔno.

GnuPG de nsɛmmisa mmienu yi bɔ abira:

1. ** So saa safe yi na ɛhyɛɛ ɔfã a ɛwɔ ha no ase?**  answered by `Good signature`. Ɛmfa nsɛm a wɔde ahintaw no ho, na ɛnyɛ nnipa atemmu.
2. ** So saa safe yi yɛ ZODL dea?**  no, w'antumi ankyerɛ sɛ ɛyɛ biribi a wɔde ahyɛnsode ayɛ. Wopɛ de hu denam nsateaa ano nkyerɛwee so wɔ baabi foforo a woahwehwɛ mu.

Wobɛhu saa kɔkɔbɔ yi wɔ abɛɛfo akwankyerԑ biara mu gye sɛ woatwerɛ w'ano ato hɔ akyerɛ no. Mfa ho nka sε yεε mfomsoɔ bi a εnyε deεn na worekכhyia ano, **Fa** ka nea ɛyerae ho asɛm `Good signature` sɛ adi nkogu.

### Nnyεm 3  SƆ ƆHWƐ ma w'ankasa wo nsa ka ahwehwɛ no bi a, sεε wob3twerԑ mu.

Zcash release signing no tu fii Electric Coin Company hɔ kɔɔ Zcash Open Development Lab wɔ afe 2026 mu, bere a na wɔn a kan ECC engineering ne product kuo no de ZODL ahyehyɛ no January 2026.

Ԑhyԑn dedaw no. Nkyerεma foforo no.
|---|---|---|
Ɔkasa no mu nsɛnkyerɛne. `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
UID Zcash Master Signing Key (ECC) Akwankyerɛ a wɔfa so de di dwuma ne akwantuo ho nsɛntitiriw. `<sysadmin@z.cash>` Zcash Open Development Lab (ZODL) wɔ hɔ. `<sysadmin@zodl.com>` |
type: RSA 3072-bit, created 2023-06-19 RSA 4096-bit, created 2026-03-23, expires 2028-03-22 Ɔwɔ hɔ ma aberɛ biara a wobɛtumi de wo ho adi dwuma wɔ kasa ahodoɔ mu
Wɔatintim wɔ: `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Nsɛm a wɔatintim: key foforɔ no bɛyɛ 2026-03-23, aka ho asɛm sɛ ɛbɛba so 2026.04.23.

Sɛ obi hyɛ da ka sɛ ɔresesa ne nsa wɔ intanɛt so a, ɛnneɛ ɔno ara na ɛsɛsɛ ɔde ahotoso di dwuma. Deɛ ɛfata paa yɛ asɛm bi **a wɔn mmienu nyinaa asi ano kwan pa** no, enti kane de no gyina hɔ ma foforo no. ZODL bɔ amanneɛ pɛpɛɛpɛ:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Real output (abreviated  two signatures on one document): real output: abbreviated, actual output.

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

Mmienu `Good signature` Sɛ wode wo ho too ECC safe no so wɔ kan nneɛma mu a, saa ahotoso yi di anim kɔ ZODL safe so seesei bere a w'anhia sɛ wudi nokware bio. `zodl.com`, `apt.z.cash`Eyi ne ade a ɛsɛ sɛ yɛhwehwɛ bere biara wɔ dwumadie bi mu na ɛkyerɛkyerɛ nsɛmfua , ɛne ɛho nkyerɛɛmu.

### Ɛhe na wobɛtɔ key no  ne baabi a wonnya ɛhia wo bi

Wɔahyehyɛ no fi nea eye paa so kosi nea enye koraa so:

1. **Nsɛm a w'adi kan ato so akyerɛ sɛ woahyɛ ase**, te sε nea yεε soro no. Yεnfa tumi nkyerԑkyerεmu yi nni dwuma bere a yɛasesa mu akyi.
2. **A source independent of the download.** Binary no fi GitHub; key no firi `apt.z.cash`Ɔtowfo hia nneɛma abien no nyinaa.
3. **Keyserver, a wɔsɔ hwɛ ne nsateaa ano ahyɛnsode bi.** Obiara betumi de key adi dwuma na ama obiara ahu sɛ ɔno ankasa yɛ nipa. Ɛnyɛ keyserver no mmom sε w'asɔ n'ano fafa ho nti yε saa safe yi.
4. **SƐNEA WƆDE BINARY no yɛ pɛ a, obiara ntumi nsiesie nea ɔwɔ hɔ.

Da biara fa mfoni no nyinaa toto nea wɔde di dwuma titiriw no ho. Nkyerεmu nketewa a wɔfa so yɛ adwuma ma nnipa nya nsunsuanso pa, na wɔayɛ biribi de adi dwuma ankasa nso.

## Ɔfã 3  W'ahwehwε a woantumi annya no

Sɛ wonim nea ɛyɛ mfomso a, ɛno nko ara na ɛbɛboa wo. Eyi yɛ nokware bi, wɔde null byte baako ka archive pa ho:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Nokware mu nkɛntɛnso:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Firi kɔdi: `1`.

Fa nnua a wɔhyehyɛ no mmienu bɔ ho ban:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

One byte appended to a 66,992,676-byte file. The two hashes share nothing  not a prefix, not a pattern. No partial match and no "close enough": a checksum either matches exactly or the file is not the file you wanted. ɔtweaseɛ baako wɔ hɔ na ɛsan yɛ nsunsuansoɔ bi: sɛ wofa asensɛntwerɛ krataa (check) anaa wode ma obi foforɔ deɛ a, ɛkyerɛ sɛ w'ahwehwɛ biribi foforo; saa nso na ɛnyɛ ɛno ara ne faako a wopɛsɛ woyɛ nhwehwɛmu no.

### Sɛ ɛba saa a, dɛn na ɛsɛ sɛ woyɛ?

1. *nsane mfa binary no nni dwuma.** Nsane nfa, nsana mma wonnyi bi mfi mu. `chmod +x` it.
2. **Sɔ hwɛ bio wɔ official release page no.** N'akyiwdi pii yɛ download a wagu so.
3. ** Sɛ ɛkɔso bio a, sesa network kwan.** Ɛho nsԑm foforo anaa VPN. Ɔhaw bi a edi w'akyi wɔ amanne ahorow mu no yɛ soronko fi nea ɛnni so.
4. **Sɔ hwɛ sɛ wo wɔ checksum file a ɔfata no ma version papa.** Sɛ wode v6.3.0 toto v6.2.3 sums ho a, wobɛtɔ mu yie.
5. ** Sɛ ɛkɔ so yɛ adwuma a, bɔ ho amanneɛ.** Bue asɛm bi wɔ dwumadie no akoraeɛ hɔ anaa fa ahobammɔ contact to mu. `SECURITY.md` Hunu sɛ, biribiara a wususuw sɛ ɛyɛ atirimpɔ no ho asɛm wɔ ɔfã biara mu. [Zcash Ecosystem Security (Ɔman no mu ahobanbɔ)](/zcash-community/zcash-ecosystem-security) kratafa a ɛfa nsɛm ho.
6. **Fa adeyɛ no sie.** Nkyerεmu a wɔasan de adi dwuma sɛ adanse. Ntwe ho ansa na woabɔ amanneɛ.

Nsaano nkyerɛwee a enni mu yɛ aniberesɛm sen nea ɛwɔ checksum. A-nso-mu no taa yε ɔporɔw; na nsaano nkyerɛwde bi wɔ hɔ a, sɛ wohwɛ ho yiye a ɛnyɛ biribi a ɛba amonom hɔ ara kɛkɛ.

---

## Ɔfã 4  Twerԑtohɔ krataa

Project  Releases a wɔtintim no Method so. Ɛhe na ɔfidie yi firi ba?
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle.  no key  CI identity via GitHub OIDC
*Zallet*: Ɔyɛ ɔbaa a ɔwɔ akuro no mu. `github.com/zcash/zallet/releases` GPG a wɔayi no afi hɔ. `.asc`, SLSA fibea, SBOM. `apt.z.cash/zodl.asc`  kan no mu nkyeresoɔ `0338 34DD…58E2 6AB1`, hyɛ nsahyɛ suapɔn no mu `1FE9 9324…23F0 617F` |
**zcashd** . *retired*  . Gyae wɔ block 3,417,100 wɔ 2026-07-18. Nsi no bio.
 Zodl (a kan no na wɔfrɛ no Zashi) App Store / Google Play; `zodl-inc` on GitHub  Stor signing; standalone Android binaries GPG-signed ZODL key per transition statement Ɔyɛ a, yɛ bɛtumi ayɛ no wɔ aberɛ biara.

> **Nom a wɔde to:** Zashi no san too din foforo maa no sɛ *Zodl* wɔ 2026  kan App Store, afei Google Play. Akwankyerɛfoɔ dada bi a wɔnim "Zashi" kyerɛ sika kotoku koro yi ara ase.

---

## Ɔfã 5  Mfonini ne hardware nkotoku ahorow

Sɛ wugyae download a, na woasesa ɔkwan a wɔfa so yɛ saa.

**App stores.** You cannot check a signature yourself. The store signs the package and you are trusting the store's review and the developer account's integrity. What you *can* verify is that you have the right app: confirm the publisher name and the package identifier against the project's official site, not against search results. Impersonation apps are common, and a store listing is not evidence of authenticity.

**Standalone Android APKs.** W'atumi *asiesie. ZODL tintim GPG-signed standalone Android binaries wɔ GitHub Releases so, enti Part 2 adwuma no yɛ yie. Fa kwan yi di dwuma sɛ wopɛ akyere a wobɛtumi ahwɛ mu.

** Hardware wallets.** Afidie no di ne firmware ho adanse, enti trust anchor yɛ hardware no na ɛnyɛ fael wɔ wo kͻmputa so. Hwɛ [Keystone Zashi no ho nsɛm pii wɔ hɔ.](/guides/keystone-zashi)  Ɛwɔ sɛ yɛtɔ nneɛma wɔ baabi a ɛyɛ no tẽẽ.  Yɛyɛ adwuma fa nea ɛrebɔ ho nkrataa hyɛ mu, na ɛno akyi nso yɛyɛ bi ma wɔn a wɔrepɛ biribi ayɛ ama yɛn.

---

## Nkɔsoɔ a aka no

- [Zcash Ecosystem Security (Ɔman no mu ahobanbɔ)](/zcash-community/zcash-ecosystem-security)  adiyisɛm ne nsԑm a ԑfa ahobammɔ ho nkitahodie ahorow
- [Zebra Nodoɔ a Ɛwɔ Mu Nyinaa](/zcash-tech/zebra-full-node)  Zebra siesiee akyi no, yɛ hwɛɛ sɛ ɛbɛkɔ yie.
- [Zallet Nkyerεtohɔ a Ɛwɔ Hwԑn So Ntɛm](/using-zcash/zallet-quick-reference-guide)  fa Zallet di dwuma
- [Sigstore nkrataafa a w'atwerɛ no](https://docs.sigstore.dev/)
- [SLSA fibea ahorow](https://slsa.dev/)

---

*Wɔde saa kratafa yi mu ahyɛde no adi dwuma wɔ Zebra so `v6.3.0` ne Zallet `v0.1.0-beta.2` 2026-08-18. Release tooling changes: sɛ output no yɛ soronko firi nea wɔayi adi ha yi a, fa wo ankasa run di dwuma na ma PR* bi mmue.
