<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Releases का सत्यापन

## संक्षेप में

- किसी Zcash binary को डाउनलोड करना, परियोजना द्वारा प्रकाशित वही binary प्राप्त करने के समान नहीं है। सत्यापन ही वह तरीका है जिससे आप दोनों में अंतर कर सकते हैं।
- checksum यह साबित करता है कि फ़ाइल सही-सलामत पहुँची। एक **signature** यह साबित करता है कि इसे किसने बनाया। आपको दोनों की आवश्यकता है, और अकेले checksum बहुत कम साबित करता है।
- Zebra एक `SHA256SUMS` फ़ाइल और एक **Sigstore** bundle प्रकाशित करता है, जो release को एक विशेष GitHub Actions workflow, tag और commit से जोड़ता है — key management की आवश्यकता नहीं।
- Zallet detached **GPG** signatures (`.asc`) को SLSA provenance और एक SBOM के साथ प्रकाशित करता है।
- Zcash signing key 2026 में Electric Coin Company से Zcash Open Development Lab (ZODL) में बदली गई। यदि आपने पुराने releases सत्यापित किए थे, तो आपको नई key की आवश्यकता है — और handover statement दोनों keys से signed है, इसलिए आप rotation का भी स्वयं सत्यापन कर सकते हैं।
- `gpg` उस **subkey** को रिपोर्ट करता है जिसने फ़ाइल पर sign किया, न कि announcement में नामित primary key को। जो fingerprint गलत दिखता है, वह आमतौर पर subkey होता है, हमला नहीं।
- यदि सत्यापन विफल हो जाए, तो binary को न चलाएँ।

*Zebra `v6.3.0` और Zallet `v0.1.0-beta.2` के विरुद्ध 2026-08-18 को सत्यापित।*

## Zcash के लिए यह अधिक महत्वपूर्ण क्यों है

किसी छेड़छाड़ किए गए wallet binary से spending key या viewing key बाहर भेजी जा सकती है। compromised password के विपरीत, यह हानि स्थायी होती है: न rollback है, न chargeback, और न कोई support desk। Shielded transactions *on chain* होने वाली चीज़ों की रक्षा करती हैं — लेकिन यदि जो software आप चला रहे हैं, वह आपके पास पहुँचने से पहले ही बदल दिया गया हो, तो वे कोई सुरक्षा नहीं देतीं।

यह उन कुछ attack paths में से एक है जहाँ protocol की privacy guarantees बिल्कुल भी प्रासंगिक नहीं रहतीं। सत्यापन वही परत है जो इसे कवर करती है।

## Threat model — सत्यापन क्या पकड़ता है और क्या नहीं

**पकड़ता है:**

- छेड़छाड़ किया गया mirror या परियोजना के release page के अलावा कहीं और से परोसी गई modified फ़ाइल।
- डाउनलोड के दौरान man-in-the-middle swap।
- compromised CDN या hijacked distribution host।
- transit के दौरान हुई आकस्मिक corruption।

**नहीं पकड़ता:**

- ऐसा maintainer जो malicious code पर sign करे। signature सही सत्यापित होगा; यह origin साबित करता है, intent नहीं।
- compromised build host जो signed-but-malicious artifact बनाए। reproducible builds और provenance attestations इसी जोखिम को सीमित करने के लिए होते हैं।
- ऐसी key जिसे आपने binary वाले उसी compromised source से प्राप्त किया हो। यदि attacker फ़ाइल और उसके विरुद्ध जाँची जाने वाली key दोनों को नियंत्रित करता है, तो सत्यापन आपको कुछ नहीं बताता।

अधिकांश guides इसी अंतिम बिंदु को छोड़ देती हैं। **आप key कहाँ से प्राप्त करते हैं, यह command चलाने जितना ही महत्वपूर्ण है।**

---

## भाग 1 — Zebra: checksums और Sigstore

Zebra प्रत्येक release के लिए ये assets प्रकाशित करता है:

| Asset | उद्देश्य |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | binary archive |
| `zebrad-<version>-<arch>.tar.gz.sha256` | प्रति-फ़ाइल checksum |
| `SHA256SUMS` | सभी architectures के लिए checksums |
| `SHA256SUMS.sigstore.json` | `SHA256SUMS` पर sign किया गया Sigstore bundle |

### चरण 1 — डाउनलोड

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### चरण 2 — checksum जाँचें

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

वास्तविक output:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

यहाँ `--ignore-missing` आवश्यक है क्योंकि `SHA256SUMS` हर architecture को कवर करता है और आपने केवल एक डाउनलोड किया है। इसके बिना, `sha256sum` अनुपस्थित aarch64 archive को failure के रूप में रिपोर्ट करता है और आप pass को fail समझ सकते हैं।

प्रति-फ़ाइल variant भी काम करता है:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**केवल यह चरण पर्याप्त नहीं है।** आपने checksum को binary वाली उसी जगह से डाउनलोड किया है। जो कोई एक को बदल सकता है, वह दूसरे को भी बदल सकता है। checksum integrity साबित करता है; अगला चरण origin साबित करता है।

### चरण 2b — Windows पर यही जाँच

PowerShell में `-c` verify mode नहीं होता, इसलिए आपको manually तुलना करनी होती है:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

वास्तविक output:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

इसे इस पेज में पहले दिए गए Linux result से तुलना करें:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**मान एक जैसे हैं।** Hex में case का महत्व नहीं होता, और Windows पर यह सबसे आम false alarm है।

Windows से जुड़ी दो और आम गलतियाँ:

- **जाँचने के लिए कोई exit code नहीं है।** Linux पर `sha256sum -c` failure पर 1 लौटाता है और script उस पर कार्य कर सकती है। `Get-FileHash` केवल hash प्रिंट करता है — तुलना आपको करनी है, और सरसरी नज़र से गलती भी आपकी ही हो सकती है।
- **64 hex characters को आँखों से पढ़ना अविश्वसनीय है।** shell को यह काम करने दें:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **macOS पर:** workflow वही है, लेकिन BSD userland `sha256sum` के बजाय `shasum` देता है — `shasum -a 256 -c --ignore-missing SHA256SUMS` का उपयोग करें। इस पेज के लेखक के पास macOS मशीन उपलब्ध नहीं थी, इसलिए यह command Apple के tooling के आधार पर documented है, चलाकर नहीं। यदि आप macOS पर सत्यापन करते हैं, तो कृपया इसकी पुष्टि या सुधार के लिए PR खोलें।

### चरण 3 — Sigstore bundle का सत्यापन करें

Sigstore, long-lived signing keys की जगह CI identity से बंधे short-lived certificates का उपयोग करता है, जिन्हें public transparency log में रिकॉर्ड किया जाता है। किसी के पास ऐसी release key नहीं होती जिसे चुराया जा सके।

सीधा तरीका `cosign` का उपयोग करता है:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

ये दो `--certificate-*` flags ही पूरा उद्देश्य हैं। **इनके बिना आप केवल यह पुष्टि कर रहे होते हैं कि किसी ने, कहीं, फ़ाइल पर sign किया।** इनके साथ आप यह पुष्टि कर रहे हैं कि इसे Zebra repository के workflow ने sign किया था, और GitHub के OIDC issuer द्वारा authenticate किया गया था।

> ⚠️ **Version महत्वपूर्ण है।** पुराने cosign builds वर्तमान Sigstore bundle format को नहीं पढ़ सकते। ऊपर की command को cosign `v2.4.1` के साथ चलाने पर यह मिलता है:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> bundle में वास्तव में certificate मौजूद है — यह `verificationMaterial.certificate.rawBytes` के अंतर्गत होता है, जिसे पुराने releases नहीं खोजते। यह client limitation है, कोई broken release नहीं। यदि आपको यह मिले, तो डाउनलोड को खराब मानने के बजाय cosign upgrade करें। distribution-packaged cosign अक्सर upstream से काफी पीछे होता है।

अगले दो चरण दिखाते हैं कि वही bundle manually कैसे सत्यापित किया जाए, जिसे समझना उपयोगी है — और जब आपका cosign build सहयोग न करे, तब यह व्यावहारिक fallback भी है।

### चरण 4 — certificate वास्तव में क्या दावा करता है, इसे पढ़ें

आप `cosign` के बिना भी bundle inspect कर सकते हैं, जो यह समझने के लिए उपयोगी है कि आप किस पर trust कर रहे हैं। certificate निकालें:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Zebra v6.3.0 के लिए वास्तविक output:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject Alternative Name ही identity है। यह repository, exact workflow file और tag का नाम देता है। Sigstore custom extensions में अतिरिक्त build metadata भी embed करता है:

| Field | v6.3.0 के लिए मान |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

इनमें से प्रत्येक को जाँचा जा सकता है। commit hash repository में tag से मेल खाना चाहिए; workflow run मौजूद और public होना चाहिए।

### चरण 5 — cryptographically signature सत्यापित करें

आप OpenSSL से सीधे signature की पुष्टि कर सकते हैं:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

वास्तविक output:

```
Verified OK
```

bundle signed digest को भी रिकॉर्ड करता है। पुष्टि करें कि यह आपकी local फ़ाइल से मेल खाता है:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### चरण 6 — transparency log entry

bundle में एक Rekor entry होती है जो साबित करती है कि signature को public, append-only log में प्रकाशित किया गया था:

| Field | Value |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

यही वह चीज़ है जो silent key misuse को detect करने योग्य बनाती है। ऐसा signature जो कभी log में दिखाई ही न दे, या अविश्वसनीय समय पर दिखाई दे, एक ऐसा संकेत है जिस पर कार्रवाई की जानी चाहिए। integration time की तुलना release announcement से करें।

> **OpenSSL path पर टिप्पणी:** यह certificate की public key के विरुद्ध signature को सत्यापित करता है, लेकिन अपने आप certificate chain को Sigstore root तक validate नहीं करता और न ही log entry की inclusion proof जाँचता है। `cosign verify-blob` ये तीनों काम करता है। mechanism समझने के लिए OpenSSL का उपयोग करें; वास्तविक जाँच के लिए `cosign` का उपयोग करें।

---

## भाग 2 — Zallet: GPG signatures

Zallet एक अलग प्रकार के assets प्रकाशित करता है:

| Asset | उद्देश्य |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | binary archive |
| `.tar.gz.asc` | detached GPG signature |
| `.tar.gz.intoto.jsonl` | SLSA provenance attestation |
| `.tar.gz.provenance.json` | provenance metadata |
| `.tar.gz.sbom.spdx` | software bill of materials |

### चरण 1 — key खोजने से पहले signing key की पहचान करें

बिना कोई key import किए, *पहले* verification चलाएँ:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

वास्तविक output:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

यह failure नहीं है। यह बताता है कि signature मौजूद है और ठीक कौन-सी key आपको चाहिए, **इससे पहले कि आप उसे ढूँढना शुरू करें।** fingerprint और issuer नोट करें, फिर key को डाउनलोड से स्वतंत्र स्रोत से प्राप्त करें।

> `gpg` timestamps आपकी local timezone में प्रिंट करता है। ऊपर का output `WAT` (UTC+1) दिखाता है; वही signature कहीं और `18:18:44 UTC` के रूप में दिखेगा। क्षण वही है। timezone difference को mismatch न मानें।

### चरण 2 — key import करें और सत्यापित करें

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

वास्तविक output:

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

`Good signature` वही है जो आप चाहते थे। इस output में दो बातें लोगों को भ्रमित करती हैं, और दोनों सामान्य हैं।

### fingerprint announcement से मेल क्यों नहीं खाता

ZODL key transition statement fingerprint `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` बताता है। लेकिन `gpg --verify` ने `1FE9 9324 …  23F0 617F` रिपोर्ट किया। यह mismatch जैसा दिखता है, लेकिन है नहीं।

`gpg` उस **subkey** को रिपोर्ट करता है जिसने sign किया। announcement **primary key** का नाम लेता है। संबंध स्वयं पुष्टि करें:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

वास्तविक output:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

`sub` पंक्ति signing subkey है; `pub` पंक्ति primary है। एक identity, एक key package। यही कारण है कि verification output **दोनों** fingerprints प्रिंट करता है — किसी भी प्रकाशित announcement से *primary* की तुलना करें, और subkey पंक्ति को इस रूप में लें कि key के किस हिस्से ने काम किया।

Keys को इस तरह विभाजित करना जानबूझकर किया जाता है: एक signing subkey को primary identity और उसके संचित trust को छोड़े बिना rotate या revoke किया जा सकता है।

### `[unknown]` warning का क्या अर्थ है

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

यह **signature की समस्या नहीं है।** signature cryptographically valid है — यही `Good signature` बताता है। warning कुछ और कहती है: आपने अपनी local GnuPG को यह नहीं बताया है कि आप मानते हैं कि यह key वास्तव में उसी की है जिसका यह दावा करती है।

GnuPG दो प्रश्न अलग-अलग रखता है:

1. **क्या इस key ने इस फ़ाइल पर sign किया?** — `Good signature` इसका उत्तर देता है। यह cryptographic है, इसमें मानव निर्णय नहीं।
2. **क्या यह key वास्तव में ZODL की है?** — इसका उत्तर cryptography बिल्कुल नहीं देती। आप इसे fingerprint को किसी स्वतंत्र स्रोत से मिलाकर स्थापित करते हैं।

लगभग हर verification पर आपको यह warning दिखेगी, जब तक कि आप key को local रूप से explicitly sign न करें। इसे failure न मानें। **लेकिन** `Good signature` का न होना failure मानें।

### चरण 3 — key transition का स्वयं सत्यापन करें

Zcash release signing 2026 में Electric Coin Company से Zcash Open Development Lab में चली गई, जब जनवरी 2026 में पूर्व ECC engineering और product team द्वारा ZODL का गठन हुआ।

| | Old key | New key |
|---|---|---|
| Fingerprint | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Type | RSA 3072-bit, created 2023-06-19 | RSA 4096-bit, created 2026-03-23, expires 2028-03-22 |
| Published at | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Published timeline: नई key 2026-03-23 को बनाई गई, 2026-03-27 को announce हुई, 2026-04-23 से exclusive signing, पुरानी ECC key revocation 2026-06-23 के लिए planned।

किसी website पर rotation announcement उतनी ही भरोसेमंद होती है जितनी वह website। सही mechanism एक ऐसा statement है जो **दोनों keys से clear-signed हो**, ताकि पुरानी key नई key के लिए vouch करे। ZODL ठीक यही प्रकाशित करता है:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

वास्तविक output (संक्षिप्त — एक document पर दो signatures):

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

एक ही document पर दो `Good signature` results, पुरानी key और नई key से। यदि आप पहले के releases के लिए ECC key पर trust करते थे, तो अब यह trust बिना `zodl.com`, `apt.z.cash`, या किसी forum post पर भरोसा किए ZODL key तक आगे बढ़ जाता है। यही वह गुण है जिसे किसी project के keys rotate करने पर देखना चाहिए — और इसका अभाव पूछताछ योग्य है।

### key कहाँ से प्राप्त करें — और कहाँ से नहीं

सबसे अच्छे से सबसे खराब तक क्रमबद्ध:

1. **पिछली key से signed statement**, जैसा ऊपर है। rotation के बाद सबसे मजबूत विकल्प।
2. **डाउनलोड से स्वतंत्र स्रोत।** binary GitHub से आया; key `apt.z.cash` से आई। attacker को दोनों चाहिए।
3. **एक keyserver, जिसे प्रकाशित fingerprint से cross-check किया गया हो।** अधिकांश keyservers पर कोई भी किसी भी identity का दावा करती key upload कर सकता है। fingerprint comparison ही इसे सुरक्षित बनाता है — keyserver नहीं।
4. **वही page जहाँ binary है।** लगभग कोई आश्वासन नहीं। जो एक को बदल सकता है, वह दूसरे को भी बदल सकता है।

हमेशा **full** fingerprint की तुलना **primary** key से करें। short key IDs में टकराव कराना बहुत आसान है और वास्तविक हमलों में उनका उपयोग हुआ है।

## भाग 3 — एक विफल सत्यापन

सत्यापन तभी उपयोगी है जब आपको पता हो कि failure कैसा दिखता है। यहाँ एक वास्तविक उदाहरण है, जो valid archive में एक single null byte जोड़कर बनाया गया:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

वास्तविक output:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Exit code: `1`.

दोनों digests को साथ-साथ रखें:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

66,992,676-byte की फ़ाइल में सिर्फ एक byte जोड़ा गया। दोनों hashes में कुछ भी समान नहीं है — न prefix, न pattern। यहाँ कोई partial match नहीं, कोई "लगभग सही" नहीं: या तो checksum ठीक-ठीक मेल खाता है, या फ़ाइल वह नहीं है जो आप चाहते थे।

### जब ऐसा हो तो क्या करें

1. **binary को न चलाएँ।** इसे extract न करें, `chmod +x` भी न करें।
2. **official release page से फिर प्रयास करें।** अधिकांश failures truncated downloads होते हैं।
3. **यदि दूसरी बार भी fail हो, तो network path बदलें।** दूसरा connection, या VPN। जो failure networks बदलने पर भी बना रहे, वह अलग प्रकृति का है।
4. **पुष्टि करें कि आपके पास सही version के लिए सही checksum file है।** v6.3.0 की तुलना v6.2.3 sums से करेंगे तो सही रूप से fail होगा।
5. **यदि फिर भी fail हो, तो इसकी रिपोर्ट करें।** project repository में issue खोलें, या यदि आपको कुछ जानबूझकर किया गया लगता है तो `SECURITY.md` में दिए गए security contact का उपयोग करें। disclosure channels के लिए [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) पेज देखें।
6. **artifact को सुरक्षित रखें।** छेड़छाड़ किया गया binary एक सबूत है। रिपोर्ट करने से पहले इसे delete न करें।

signature failure, checksum failure से अधिक गंभीर है। checksum mismatch आमतौर पर corruption होता है; valid-file-but-bad-signature ऐसी चीज़ नहीं है जो दुर्घटनावश होती हो।

---

## भाग 4 — संदर्भ तालिका

| Project | Releases published at | Method | key कहाँ से आती है |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | कोई key नहीं — GitHub OIDC के माध्यम से CI identity |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — primary `0338 34DD…58E2 6AB1`, signing subkey `1FE9 9324…23F0 617F` |
| **zcashd** | *retired* | — | 2026-07-18 को block 3,417,100 पर halted। install न करें। |
| **Zodl** (formerly Zashi) | App Store / Google Play; GitHub पर `zodl-inc` | Store signing; standalone Android binaries GPG-signed | transition statement के अनुसार ZODL key |

> **नामकरण पर टिप्पणी:** Zashi को 2026 में **Zodl** के रूप में rebrand किया गया — पहले App Store पर, फिर Google Play पर। पुराने guides जो "Zashi" का उल्लेख करते हैं, वही wallet lineage बताते हैं।

---

## भाग 5 — Mobile और hardware wallets

जैसे ही आप direct downloads से बाहर जाते हैं, सत्यापन अलग तरह से काम करता है।

**App stores.** आप स्वयं signature जाँच नहीं सकते। store package पर sign करता है और आप store की review प्रक्रिया तथा developer account की integrity पर भरोसा कर रहे होते हैं। जो आप *सत्यापित* कर सकते हैं, वह यह है कि आपके पास सही app है: publisher name और package identifier को project की official site से confirm करें, search results से नहीं। impersonation apps आम हैं, और किसी store listing का होना authenticity का प्रमाण नहीं है।

**Standalone Android APKs.** इनका सत्यापन *किया जा सकता है*। ZODL GitHub Releases के माध्यम से GPG-signed standalone Android binaries प्रकाशित करता है, इसलिए भाग 2 वाला workflow लागू होता है। यदि आप एक जाँच योग्य chain चाहते हैं, तो इस path को प्राथमिकता दें।

**Hardware wallets.** device अपने firmware की स्वयं attestation करता है, इसलिए trust anchor आपके machine पर मौजूद फ़ाइल नहीं बल्कि hardware होता है। device-verification flow के लिए [Keystone Zashi](/guides/keystone-zashi) देखें। निर्माता से सीधे खरीदें — supply-chain tampering factory और buyer के बीच होती है।

---

## आगे पढ़ें

- [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) — disclosure policy और security contacts
- [Zebra पूर्ण नोड](/zcash-tech/zebra-full-node) — सत्यापन के बाद Zebra install करना
- [Zallet त्वरित संदर्भ मार्गदर्शिका](/using-zcash/zallet-quick-reference-guide) — Zallet का उपयोग
- [Sigstore documentation](https://docs.sigstore.dev/)
- [SLSA provenance levels](https://slsa.dev/)

---

*इस पेज के commands Zebra `v6.3.0` और Zallet `v0.1.0-beta.2` के विरुद्ध 2026-08-18 को चलाए गए थे। release tooling बदलती रहती है: यदि output यहाँ दिखाए गए से अलग हो, तो अपने स्वयं के run पर भरोसा करें और कृपया एक PR खोलें।*
