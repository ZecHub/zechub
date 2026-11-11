<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Aɖe Axɔ"/>
</a>

# Zcash Ƒe Tatawo Ƒe Ɖaseɖiɖi

## TL;DR

- Zcash binary ƒe kɔɖeɖe mele abe esiwo projekti la dze le gome ene o. Ɖaseɖiɖi nye ale si nàte ŋu aɖe vovototo la.
- Checksum dea ɖase be file la va de nyuie. **Asidede agbalẽ te [signature]** dea ɖase be ame kae wɔe. Èhiã wo evea, eye checksum ɖeka koe meɖea ɖase geɖe o.
- Zebra doa `SHA256SUMS` file kple **Sigstore** bundle, si ƒoa tata la kple GitHub Actions workflow, tag kple commit aɖe ɖe te — key ƒe kpɔkpɔ mele be wòawɔ o.
- Zallet doa **GPG** asidede agbalẽ te siwo woƒo ɖe eŋu (`.asc`) kple SLSA provenance kple SBOM.
- Zcash ƒe asidede agbalẽ te ƒe key trɔ le 2026 tso Electric Coin Company yi Zcash Open Development Lab (ZODL). Ne nèɖe tata xoxowo ƒe ɖase kpɔ la, èhiã key yeye la — eye handover statement la wode asidede agbalẽ te ɖe eŋu kple key evea, ale nàte ŋu aɖe key ƒe trɔtrɔ la ŋutɔ ƒe ɖase.
- `gpg` gblɔa **subkey** si de asidede agbalẽ te file aɖe ŋu, menye primary key si woŋlɔ ɖe announcementwo me o. Fingerprint si wòkpɔ abe eƒe nɔnɔ mesɔ o ene la enye subkey zi geɖe, menye attack o.
- Ne ɖaseɖiɖi la gbã la, megbe binary la o.

*Woɖe ɖase kpɔ tso Zebra `v6.3.0` kple Zallet `v0.1.0-beta.2` dzi le 2026-08-18.*

## Nu ka ta esia le vevie wu na Zcash

Gakotoku [wallet] binary si woɖe asi ɖe eŋu ate ŋu afia gazazãsafui [spending key] alo nukpɔsafui [viewing key] ɖe ame bubu. To vovototo na password si woɖe asi ɖe eŋu la, esia ƒe buabu la nye mamateŋu: trɔtrɔ megale o, gaɖeɖe megale o, eye kpekpeƒe si dea kpe ɖe ame ŋu hã mele o. Ɣaɣla [shielded] gaɖoɖowo [transactions] kpɔa nu si wɔm le *ɖoɖonu dzi [on-chain]* laa — gake woɖea ŋu kpɔɣe aɖeke o ne software si nèle zaza la wotrɔe hafi wòva de asiwò.

Esia nye attack ƒe mɔ viwo dometɔ aɖe si me protocol la ƒe ɣaɣla [privacy] ƒe laylayawoa mehia le gbeɖeka o. Ɖaseɖiɖi nye layer si kpɔa eŋu.

## Attack ƒe model — nu si ɖaseɖiɖi dea kple nu si wòmede o

**Edea:**

- Mirror si woɖe asi ɖe eŋu alo file si wotrɔ eye wowɔe tso afi aɖe si menye projekti la ƒe release axɔme o.
- Ame si tsia le download ƒe mɔ dome wɔa ɖɔli ɖɔli [swap].
- CDN si woɖe asi ɖe eŋu alo distribution host si woɖe asi ɖe eŋu.
- Nɔnɔ gbegblẽ si dzɔ le mɔ dzi.

**Mede o:**

- Maintainer si dea asidede agbalẽ te code vɔ̃ ŋu. Asidede agbalẽ te la aɖea ɖase nyuie; ede ɖase be eƒe afi kae wòtso, menye be eƒe taɖodzinu nyo o.
- Build host si woɖe asi ɖe eŋu wɔa artifact si wode asidede agbalẽ te ɖo, gake wòvɔ̃. Esia tae reproducible builds kple provenance attestations li be woakpɔe ɖe anyi.
- Key si nèkplɔ tso afi ma ke si woɖe asi ɖe eŋu binary la tso. Ne attack wɔla aɖe le file la kple key si nèle kpɔm ɖe eŋu la evea ƒe dziɖuɖu me la, ɖaseɖiɖi megblɔ naneke na wò o.

Nu mamlɛtɔ siae nye esi guide geɖewo metsoa o. **Afi si nèkplɔ key la tso le vevie abe command la ƒe wowɔ ene.**

---

## Akpa 1 — Zebra: checksums kple Sigstore

Zebra doa asset siawo le release ɖe sia ɖe ta:

| Asset | Taɖodzinu |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | binary archive la |
| `zebrad-<version>-<arch>.tar.gz.sha256` | checksum si le file ɖe sia ɖe ta |
| `SHA256SUMS` | checksumwo na architecturewo katã |
| `SHA256SUMS.sigstore.json` | Sigstore bundle si dea asidede agbalẽ te `SHA256SUMS` ŋu |

### Afɔ 1 — Kɔe

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Afɔ 2 — Kpɔ checksum la

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Output vavã:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` hiã le afisia elabena `SHA256SUMS` ku ɖe architecturewo katã ŋu eye wòkɔ ɖeka ko. Ne womewɔe o la, `sha256sum` agblɔ be aarch64 archive si mele o la gbã, eye àte ŋu axɔ be pass aɖe nye fail.

Per-file ƒe tɔ hã wɔa dɔ:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Afɔ sia ɖeka meɖo o.** Wòkplɔ checksum la tso afi ma ke si binary la tso. Ame si ate ŋu atrɔ ɖeka la ate ŋu atrɔ evelia. Checksum la dea ɖase be file la menɔ vɔ̃ o; afɔ si kplɔe ɖo la dea ɖase eƒe afi.

### Afɔ 2b — Kpɔkpɔ ma ke le Windows dzi

PowerShell mewɔa `-c` verify mode o, eya ta nèle tsitre nètsɔ asi sɔe:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Output vavã:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Sɔe kple Linux ƒe result si va yi le axa sia me:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Asiɖeɖe ma ke.** Hex mekpɔa case o, eye esia nye false alarm si dzɔ akpa geɖe wu le Windows dzi.

Windows ƒe trap bubu eve:

- **Exit code aɖeke mele be nàkpɔ o.** Le Linux dzi, `sha256sum -c` trɔna yi 1 ne wògbã, eye script ate ŋu awɔ nu ɖe eŋu. `Get-FileHash` doa hash ko — sɔsɔ la nye tɔwò be nàwɔe, eye nàte ŋu anɔ gbɔe ne nèkɔe kpɔ kpuie.
- **Hex character 64 ƒe nukpɔkpɔ kple ŋku mekpɔa ŋusẽ o.** Na shell la na wɔe:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **Le macOS dzi:** Mɔnu la le ale ma kee, gake BSD userland wɔa `shasum` ɖe `sha256sum` teƒe — zã `shasum -a 256 -c --ignore-missing SHA256SUMS`. Axa sia ƒe ŋlɔla mekpɔ macOS mɔ aɖeke o, eya ta woŋlɔ command ma tso Apple ƒe tooling me, menye be wowɔe o. Ne nèɖea ɖase kpɔ le macOS dzi la, taflatse ɖe PR aɖe be nàɖe ɖase alo natrɔe.

### Afɔ 3 — Ɖe Sigstore bundle ƒe ɖase kpɔ

Sigstore tsɔ certificate siwo nɔa agbe hã me kpui, siwo woƒoa kple CI identity, va ɖe signing key siwo nɔa anyi ɣe didi teƒe, eye wodea wo ɖe public transparency log me. Ame aɖeke mekpɔa release key si woate ŋu aɖu o.

Mɔ bɔbɔe la zãa `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

`--certificate-*` flag evea nye nu si tae wòwɔe. **Ne womeli o la, nèle ɖaseɖiɖi be ame aɖe le afi aɖe de asidede agbalẽ te file la ŋu ko.** Kple wo la, nèle ɖaseɖiɖi be workflow aɖe le Zebra repository me de asidede agbalẽ te eŋu, si GitHub ƒe OIDC issuer dea ɖase.

> ⚠️ **Version le vevie.** Cosign build xoxowo mate ŋu axlẽ Sigstore bundle format yeye o. Ne wowɔ esiwo va yi la kple cosign `v2.4.1` la, wòana:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> Certificate le bundle la me vavã — ele `verificationMaterial.certificate.rawBytes` te, si release xoxowo mekpena o. Client ƒe ŋusẽ gbãe nye esia, menye release si gbã o. Ne nèkpɔe la, ƒo cosign yi version yeye teƒe be nàbu be download la vɔ̃. Cosign si woɖoa le distribution package me la nɔa megbe le upstream ŋu zi geɖe.

Afɔ eve si kplɔe ɖo fia ale si nàɖe bundle ma ke ƒe ɖase kple asi, si nyo be nàse gɔme le eŋu ɣe sia ɣi — eye enye mɔ si ate ŋu akpe ɖe wò ŋu ne wò cosign build mete ɖe eme o.

### Afɔ 4 — Xlẽ nu si certificate la gblɔa vavã

Àte ŋu akpɔ bundle la me ne `cosign` mele o, si nyo na nu si nèle dziɖuɖu ɖem ɖe eŋu la ƒe gɔmesese. Ɖe certificate la:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Output vavã na Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject Alternative Name la nye identity la. Eyae mea repository la, workflow file ŋutɔ, kple tag la. Sigstore dea build metadata bubu ɖe custom extensionwo me:

| Field | Value na v6.3.0 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

Woate ŋu akpɔ esiawo katã ɖe eŋu. Commit hash la ele be wòasɔ kple tag si le repository la me; workflow run la ele be wòanɔ anyi eye wòanye public.

### Afɔ 5 — Ɖe asidede agbalẽ te la ƒe ɖase kple cryptography

Àte ŋu akpɔ asidede agbalẽ te la ƒe ɖase tẽ kple OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Output vavã:

```
Verified OK
```

Bundle la hã ŋlɔ digest si wòde asidede agbalẽ te eŋu. Ɖe ɖase be esɔ kple file si le asiwò:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Afɔ 6 — Transparency log ƒe entry

Bundle la tsɔ Rekor entry, si dea ɖase be woɖo asidede agbalẽ te la ɖe public log si woate ŋu atsɔ nu akpe ɖe eŋu ko me:

| Field | Value |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

Esiae wɔa be key ƒe zazã kple ɣeɣẽ mate ŋu anɔ ɣa. Asidede agbalẽ te si meva ɖe log la me o, alo si va le ɣeyiɣi si mesɔ o la, nye dzesi si wòle be nàwɔ nu ɖe eŋu. Sɔ integration time la kple release ƒe announcement.

> **Nudzɔdzɔ le OpenSSL ƒe mɔ la ŋu:** Eɖea asidede agbalẽ te la ƒe ɖase kple certificate la ƒe public key, gake eya ɖeka meɖea certificate chain la ƒe ɖase yi Sigstore ƒe root gbɔ o, eye mekpena log entry la ƒe inclusion proof o. `cosign verify-blob` wɔa etɔ̃ katã. Zã OpenSSL be nàse mechanism la gɔme; zã `cosign` abe wò ƒe kpɔkpɔ vavã ene.

---

## Akpa 2 — Zallet: GPG ƒe asidede agbalẽ tewo

Zallet doa asset ƒe ƒomevi bubu:

| Asset | Taɖodzinu |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | binary archive la |
| `.tar.gz.asc` | GPG ƒe asidede agbalẽ te si woƒo ɖe eŋu |
| `.tar.gz.intoto.jsonl` | SLSA provenance ƒe attestation |
| `.tar.gz.provenance.json` | provenance metadata |
| `.tar.gz.sbom.spdx` | software ƒe didzɔdzɔ agbalẽ |

### Afɔ 1 — Kpɔ signing key la ƒe nyateƒe hafi nàdii

Wɔ ɖaseɖiɖi la *gbã*, ne key aɖeke meva eme o:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Output vavã:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Esia menye gbãgbã o. Egblɔa na wò be asidede agbalẽ te le anyi eye wòfia key ŋutɔ si nèhiã, **hafi** nàdze didi gɔme. De dzesi ɖe fingerprint kple issuer la ŋu, eye nàkplɔ key la tso afi si mele download la ŋu o.

> `gpg` doa timestampwo le wòƒe local timezone me. Output si le etɔ̃ la fia `WAT` (UTC+1); asidede agbalẽ te ma ke xlea `18:18:44 UTC` le afi bubu. Ɣeyiɣi ma kee. Mebua timezone ƒe vovototo abe mismatch ene o.

### Afɔ 2 — Ɖe key la eme eye nàɖe ɖase kpɔ

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Output vavã:

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

`Good signature`e nye nu si nèdi. Nu eve le output ma me si wɔa ame geɖe nu ɖa, eye wo evea katã sɔ.

### Nu ka ta fingerprint la mesɔ kple announcement la o

ZODL key ƒe trɔtrɔ statement la mea fingerprint `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Gake `gpg --verify` gblɔ `1FE9 9324 …  23F0 617F`. Esia wɔnɛ abe mismatch ene, gake menye nenema o.

`gpg` gblɔa **subkey** si wɔ asidede agbalẽ te la. Announcement la mea **primary key**. Ɖe woƒe kadodo ƒe ɖase kple asiwò:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Output vavã:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

`sub` ƒe fli nye signing subkey la; `pub` ƒe fli nye primary key la. Identity ɖeka, key package ɖeka. Esiae ta verification output la doa fingerprint **evea** — sɔ *primary* la kple announcement si woɖo ɖe anyi, eye nàkpɔ subkey ƒe fli la abe esi fia key ƒe akpa kae wɔ dɔ la ene.

Key ƒe mamã sia nye taɖodzinu: woate ŋu atrɔ alo aɖe signing subkey aɖe le mɔ me, eye primary identity kple eƒe trust si ƒo nu la manɔ ƒu o.

### Nu si `[unknown]` ƒe warning la gɔmee

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Esia **menye** kuxi aɖeke le asidede agbalẽ te la ŋu o. Asidede agbalẽ te la sɔ kple cryptography — esiae `Good signature` gblɔa. Warning la gblɔ nu bubu: mèfia wòƒe local GnuPG haɖe be nèxɔe se be key sia nye ame si wògblɔ be ye nyee.

GnuPG maa biabia eve:

1. **Key sia de asidede agbalẽ te file sia ŋu oa?** — `Good signature`e ɖoa eŋu. Cryptographic, ame ƒe buɖoɖo mele eme o.
2. **Key sia nye ZODL tɔa?** — Cryptography meɖoa eŋu kura o. Nèɖoa eŋu ne nèsɔ fingerprint la kple afi bubu si wòate ŋu axɔ se.

Àkpɔ warning sia le verification geɖe ŋu ne mède asidede agbalẽ te key la ŋu le local o. Megbɔe abe failure ene o. **Gake** kpɔ be `Good signature` mele o abe failure ene.

### Afɔ 3 — Ɖe key ƒe trɔtrɔ la ŋutɔ ƒe ɖase kpɔ

Zcash ƒe release signing trɔ tso Electric Coin Company yi Zcash Open Development Lab le 2026, le ZODL si wowɔ le January 2026 tso ECC engineering kple product team xoxowo me megbe.

| | Key xoxo | Key yeye |
|---|---|---|
| Fingerprint | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Type | RSA 3072-bit, wowɔe le 2023-06-19 | RSA 4096-bit, wowɔe le 2026-03-23, eƒe ɣeyiɣi awu le 2028-03-22 |
| Woɖoe ɖe anyi le | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Ɣeyiɣi si woɖo ɖe anyi: wowɔ key yeye la le 2026-03-23, woɖe gbeƒãe le 2026-03-27, signing blibo tso 2026-04-23, wowɔ plan be woaɖe ECC ƒe key xoxo la ƒe mɔ le 2026-06-23.

Key trɔtrɔ ƒe announcement le website aɖe dzi ƒe trust kpɔtɔ nye website la ƒe trust ko. Mɔ sɔŋ la nye statement si **key evea de asidede agbalẽ te ɖe eŋu**, ale key xoxo la tsɔa ɖase na key yeye la. ZODL doa esia ŋutɔ:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Output vavã (woɖe eme kpui — asidede agbalẽ te eve le document ɖeka ŋu):

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

`Good signature` ƒe result eve le document ɖeka ŋu, tso key xoxo la kple key yeye la gbɔ. Ne nèxɔ ECC ƒe key la se le release xoxowo ta la, trust ma yi edzi va ZODL ƒe key la gbɔ, ne mele be nàxɔ `zodl.com`, `apt.z.cash`, alo forum post aɖe se o. Esiae nye nɔnɔ si nàdi ne projekti aɖe trɔa key — eye ne mele o la, ele be nàbiae.

### Afi si nàkplɔ key — kple afi si mele be nàkplɔe o

Woɖo wo ɖe fli tso nyuitɔ yi vɔ̃tɔ:

1. **Statement si key si va yi de asidede agbalẽ te ɖe eŋu**, abe esiwo va yi ene. Eyae nye mɔ si sesĩe wu le trɔtrɔ megbe.
2. **Afi si mele download la ŋu o.** Binary la tso GitHub; key la tso `apt.z.cash`. Attack wɔla aɖe hiã wo evea.
3. **Keyserver, si woɖe eŋu kpɔ kple fingerprint si woɖo ɖe anyi.** Ame ɖe sia ɖe ate ŋu aɖo key si gblɔa identity ɖe sia ɖe ɖe keyserver geɖe dzi. Fingerprint ƒe sɔsɔe wɔa be esia nanɔ dedie — menye keyserver la o.
4. **Axa ma ke kple binary la.** Ɖasekpe ʋee koe le eme. Ame si ate ŋu atrɔ ɖeka la ate ŋu atrɔ evelia.

Ɣesiaɣi sɔ **full** fingerprint la kple **primary** key la. Key ID kpuiwo ate ŋu asɔ kple bubu kpuie, eye woza wo le attack vavãwo me.

## Akpa 3 — Ɖaseɖiɖi si gbã

Ɖaseɖiɖi anɔ nyuitɔ ko ne nènya ale si failure wɔa nɔnɔ. Esi le etɔ̃ nye vavã aɖe, si wowɔe to null byte ɖeka ƒe tsɔtsɔ kpe ɖe archive si sɔ ŋu:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
sha256sum tampered.tar.gz > tampered.sha256
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Output vavã:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Exit code: `1`.

Tsɔ digest evea ɖo kple wo nɔewo:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Byte ɖeka ko woƒo kpe ɖe file si ƒe size nye 66,992,676-byte ŋu. Hash evea mekpɔ nu aɖeke ɖeka o — menye prefix, menye pattern o. Partial match alo "eɖevi kpuie" mele o: checksum aɖe asɔ tututu, alo file la menye file si nèdi o.

### Nu si nàwɔ ne esia dzɔ

1. **Megbe binary la o.** Megaɖe eƒe nuwo o, mega`chmod +x`e o.
2. **Ɖe egɔme tso official release page la dzi.** Failure geɖewo nye download si mewu o.
3. **Ne egbã ake la, trɔ network ƒe mɔ.** Connection bubu, alo VPN. Failure si kplɔa wò to networkwo katã me la to vovo na esi mele nenema o.
4. **Ɖe ɖase be checksum file sɔ la nye version sɔ la tɔ.** V6.3.0 ƒe sɔsɔ kple v6.2.3 ƒe sumwo agbã nyuie.
5. **Ne egbã ha la, ɖe report.** Ɖe issue le projekti la ƒe repository me, alo zã security contact si le `SECURITY.md` me ne nèsusu be wowɔe kple taɖodzinu. Kpɔ [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) axa la ne nàkpɔ disclosure ƒe channelwo.
6. **Dzra artifact la ɖo.** Binary si woɖe asi ɖe eŋu nye ɖase. Megbloe hafi nàɖe report.

Asidede agbalẽ te ƒe failure sesĩ wu checksum ƒe failure. Checksum mismatch zi geɖe nye nɔnɔ gbegblẽ; file si sɔ gake asidede agbalẽ te la mesɔ o menye nu si dzɔa kple accident o.

---

## Akpa 4 — Reference table

| Projekti | Afi si woɖoa releasewo | Mɔnu | Afi si key la tsoa |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | Key mele o — CI identity to GitHub OIDC |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — primary `0338 34DD…58E2 6AB1`, signing subkey `1FE9 9324…23F0 617F` |
| **zcashd** | *woɖe eƒe dɔ wui* | — | Etsi le gaɖoɖowo ƒuƒoƒe [block] 3,417,100 le 2026-07-18. Megbe o. |
| **Zodl** (tsã woyɔe be Zashi) | App Store / Google Play; `zodl-inc` le GitHub dzi | Store signing; standalone Android binaries GPG-signed | ZODL ƒe key le transition statement nu |

> **Ŋkɔ ƒe dzesi:** Woɖe Zashi ƒe ŋkɔ trɔ yi **Zodl** le 2026 — gbã le App Store, emegbe le Google Play. Guide xoxowo si gblɔa "Zashi" ƒe nu la gblɔa gakotoku ƒe dzidzime ma ke ƒe nu.

---

## Akpa 5 — Mobile kple hardware walletwo

Ɖaseɖiɖi wɔa dɔ to mɔ bubu ne nèɖe direct downloadwo ŋu.

**App storewo.** Màte ŋu akpɔ asidede agbalẽ te la ƒe ɖase kple asiwò o. Store la dea asidede agbalẽ te package la ŋu eye nèle store la ƒe review kple developer account la ƒe nɔnɔ sɔŋ ƒe trust me. Nu si nàte ŋu aɖe ɖase kpɔe nye be app sɔŋ kae le asiwò: Ɖe publisher ƒe ŋkɔ kple package identifier la ƒe ɖase tso projekti la ƒe official site me, menye tso search resultwo me o. App siwo wɔa amedzra le geɖe, eye store listing menye authenticity ƒe ɖase o.

**Android APKwo siwo le tsitotsito me.** Woate ŋu aɖe esiawo ƒe ɖase kpɔ. ZODL doa Android binarywo siwo le tsitotsito me eye wode GPG asidede agbalẽ te wo ŋu to GitHub Releases, eya ta Akpa 2 ƒe mɔnu la wɔa dɔ. Tia mɔ sia ne nèdi ɖoɖonu si wòate ŋu akpɔ ɖe eŋu.

**Hardware walletwo.** Mɔ la ƒe dzidzɔme dea ɖase eya ŋutɔ ƒe firmware, eya ta trust ƒe gɔmeƒe nye hardware la, menye file si le wò mɔ dzi o. Kpɔ [Keystone Zashi](/guides/keystone-zashi) na mɔnu si wɔa device-verification. Ƒle tso manufacturer la gbɔ tẽ — supply-chain tampering dzɔna le factory kple fiala ƒe dome.

---

## Xexlẽnu bubuwo

- [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) — disclosure policy kple security contactwo
- [Zebra Full Node](/zcash-tech/zebra-full-node) — Zebra ƒe installation le ɖaseɖiɖi megbe
- [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) — Zallet ƒe zazã
- [Sigstore ƒe documentation](https://docs.sigstore.dev/)
- [SLSA provenance ƒe levelwo](https://slsa.dev/)

---

*Woƒo commandwo si le axa sia me ɖe Zebra `v6.3.0` kple Zallet `v0.1.0-beta.2` ŋu le 2026-08-18. Release tooling trɔna: ne output la to vovo na esi woɖe fia le afisia la, xɔ wòƒe run ŋutɔ se eye taflatse ɖe PR aɖe.*
