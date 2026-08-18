<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Verifying Zcash Releases

## TL;DR

- Downloading a Zcash binary is not the same as getting the one the project published. Verification is how you tell the difference.
- A checksum proves the file arrived intact. A **signature** proves who produced it. You need both, and a checksum on its own proves very little.
- Zebra publishes a `SHA256SUMS` file plus a **Sigstore** bundle that ties the release to a specific GitHub Actions workflow, tag and commit — no key management required.
- Zallet publishes detached **GPG** signatures (`.asc`) alongside SLSA provenance and an SBOM.
- The Zcash signing key rotated in 2026 from Electric Coin Company to Zcash Open Development Lab (ZODL). If you verified older releases, you need the new key — and the handover statement is signed by both keys, so you can verify the rotation itself.
- `gpg` reports the **subkey** that signed a file, not the primary key named in announcements. A fingerprint that looks wrong is usually a subkey, not an attack.
- If verification fails, do not run the binary.

*Verified against Zebra `v6.3.0` and Zallet `v0.1.0-beta.2` on 2026-08-18.*

## Why this matters more for Zcash

A tampered wallet binary can exfiltrate a spending key or a viewing key. Unlike a compromised password, that loss is permanent: there is no rollback, no chargeback and no support desk. Shielded transactions protect what happens *on chain* — they offer no protection at all when the software you are running was replaced before it ever reached you.

This is one of the few attack paths where the privacy guarantees of the protocol are simply not relevant. Verification is the layer that covers it.

## Threat model — what verification does and does not catch

**Catches:**

- A tampered mirror or a modified file served from somewhere other than the project's release page.
- A man-in-the-middle swap during download.
- A compromised CDN or a hijacked distribution host.
- Accidental corruption in transit.

**Does not catch:**

- A maintainer who signs malicious code. The signature will verify correctly; it proves origin, not intent.
- A compromised build host producing a signed-but-malicious artifact. This is what reproducible builds and provenance attestations exist to narrow.
- A key you obtained from the same compromised source as the binary. If an attacker controls both the file and the key you check it against, verification tells you nothing.

That last point is the one most guides skip. **Where you get the key matters as much as running the command.**

---

## Part 1 — Zebra: checksums and Sigstore

Zebra publishes these assets for each release:

| Asset | Purpose |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | the binary archive |
| `zebrad-<version>-<arch>.tar.gz.sha256` | per-file checksum |
| `SHA256SUMS` | checksums for all architectures |
| `SHA256SUMS.sigstore.json` | Sigstore bundle signing `SHA256SUMS` |

### Step 1 — Download

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Step 2 — Check the checksum

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Real output:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` is required here because `SHA256SUMS` covers every architecture and you only downloaded one. Without it, `sha256sum` reports the absent aarch64 archive as a failure and you may misread a pass as a fail.

The per-file variant works too:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**This step alone is not enough.** You downloaded the checksum from the same place as the binary. Anyone who could replace one could replace the other. The checksum proves integrity; the next step proves origin.

### Step 2b — The same check on Windows

PowerShell has no `-c` verify mode, so you compare manually:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Real output:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Compare that against the Linux result earlier in this page:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Identical values.** Hex carries no case, and this is the single most common false alarm on Windows.

Two more Windows-specific traps:

- **There is no exit code to check.** On Linux, `sha256sum -c` returns 1 on failure and a script can act on it. `Get-FileHash` only prints a hash — the comparison is yours to make, and yours to get wrong by skimming.
- **Reading 64 hex characters by eye is unreliable.** Let the shell do it:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **On macOS:** the workflow is the same, but BSD userland ships `shasum` rather than `sha256sum` — use `shasum -a 256 -c --ignore-missing SHA256SUMS`. This page's author had no macOS machine available, so that command is documented from Apple's tooling rather than run. If you verify on macOS, please open a PR confirming or correcting it.

### Step 3 — Verify the Sigstore bundle

Sigstore replaces long-lived signing keys with short-lived certificates bound to a CI identity, recorded in a public transparency log. Nobody holds a release key that can be stolen.

The straightforward path uses `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

The two `--certificate-*` flags are the whole point. **Without them you are only confirming that somebody, somewhere signed the file.** With them you are confirming it was signed by a workflow in the Zebra repository, authenticated by GitHub's OIDC issuer.

> ⚠️ **Version matters.** Older cosign builds cannot read the current Sigstore bundle format. Running the above with cosign `v2.4.1` produces:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> The bundle *does* contain a certificate — it sits under `verificationMaterial.certificate.rawBytes`, which older releases do not look for. This is a client limitation, not a broken release. If you hit it, upgrade cosign rather than concluding the download is bad. Distribution-packaged cosign is often well behind upstream.

The next two steps show how to verify the same bundle by hand, which is worth understanding regardless — and is a workable fallback when your cosign build won't cooperate.

### Step 4 — Read what the certificate actually claims

You can inspect the bundle without `cosign`, which is useful for understanding what you are trusting. Extract the certificate:

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

The Subject Alternative Name is the identity. It names the repository, the exact workflow file, and the tag. Sigstore embeds further build metadata in custom extensions:

| Field | Value for v6.3.0 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

Every one of these is checkable. The commit hash should match the tag in the repository; the workflow run should exist and be public.

### Step 5 — Verify the signature cryptographically

You can confirm the signature directly with OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Real output:

```
Verified OK
```

The bundle also records the digest it signed. Confirm it matches your local file:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Step 6 — The transparency log entry

The bundle carries a Rekor entry proving the signature was published to a public, append-only log:

| Field | Value |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

This is what makes silent key misuse detectable. A signature that never appeared in the log, or appeared at an implausible time, is a signal worth acting on. Compare the integration time against the release announcement.

> **Note on the OpenSSL path:** it verifies the signature against the certificate's public key, but it does not by itself validate the certificate chain to Sigstore's root or check the log entry's inclusion proof. `cosign verify-blob` does all three. Use OpenSSL to understand the mechanism; use `cosign` as your actual check.

---

## Part 2 — Zallet: GPG signatures

Zallet publishes a different set of assets:

| Asset | Purpose |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | the binary archive |
| `.tar.gz.asc` | detached GPG signature |
| `.tar.gz.intoto.jsonl` | SLSA provenance attestation |
| `.tar.gz.provenance.json` | provenance metadata |
| `.tar.gz.sbom.spdx` | software bill of materials |

### Step 1 — Identify the signing key before you go looking for it

Run the verification *first*, with no key imported:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Real output:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

This is not a failure. It tells you a signature exists and names exactly which key you need, **before** you start searching. Note the fingerprint and the issuer, then obtain the key from a source independent of the download.

> `gpg` prints timestamps in your local timezone. The output above shows `WAT` (UTC+1); the same signature reads `18:18:44 UTC` elsewhere. Same instant. Don't treat a timezone difference as a mismatch.

### Step 2 — Import the key and verify

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Real output:

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

`Good signature` is what you wanted. Two things in that output confuse people, and both are normal.

### Why the fingerprint doesn't match the announcement

The ZODL key transition statement names fingerprint `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. But `gpg --verify` reported `1FE9 9324 …  23F0 617F`. That looks like a mismatch and it is not.

`gpg` reports the **subkey** that made the signature. The announcement names the **primary key**. Confirm the relationship yourself:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Real output:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

The `sub` line is the signing subkey; the `pub` line is the primary. One identity, one key package. This is why the verification output prints **both** fingerprints — compare the *primary* against any published announcement, and treat the subkey line as telling you which part of the key did the work.

Splitting keys this way is deliberate: a signing subkey can be rotated or revoked without discarding the primary identity and its accumulated trust.

### What the `[unknown]` warning means

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

This is **not** a problem with the signature. The signature is cryptographically valid — that is what `Good signature` states. The warning says something different: you have not told your local GnuPG that you believe this key belongs to who it claims to.

GnuPG separates two questions:

1. **Did this key sign this file?** — answered by `Good signature`. Cryptographic, no human judgement.
2. **Does this key belong to ZODL?** — not answered by cryptography at all. You establish it by checking the fingerprint against an independent source.

You will see this warning on nearly every verification unless you explicitly sign the key locally. Do not treat it as failure. **Do** treat a missing `Good signature` as failure.

### Step 3 — Verify the key transition itself

Zcash release signing moved from Electric Coin Company to Zcash Open Development Lab in 2026, after ZODL was formed in January 2026 by the former ECC engineering and product team.

| | Old key | New key |
|---|---|---|
| Fingerprint | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Type | RSA 3072-bit, created 2023-06-19 | RSA 4096-bit, created 2026-03-23, expires 2028-03-22 |
| Published at | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Published timeline: new key generated 2026-03-23, announced 2026-03-27, exclusive signing from 2026-04-23, old ECC key revocation planned 2026-06-23.

A rotation announcement on a website is only as trustworthy as the website. The correct mechanism is a statement **clear-signed by both keys**, so the old key vouches for the new one. ZODL publishes exactly that:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Real output (abridged — two signatures on one document):

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

Two `Good signature` results on one document, from the old key and the new one. If you trusted the ECC key for earlier releases, that trust now carries forward to the ZODL key without you having to trust `zodl.com`, `apt.z.cash`, or a forum post. This is the property to look for whenever a project rotates keys — and its absence is worth asking about.

### Where to get a key — and where not to

Ranked from best to worst:

1. **A statement signed by the previous key**, as above. Strongest option after a rotation.
2. **A source independent of the download.** The binary came from GitHub; the key came from `apt.z.cash`. An attacker needs both.
3. **A keyserver, cross-checked against a published fingerprint.** Anyone can upload a key claiming any identity to most keyservers. The fingerprint comparison is what makes this safe — not the keyserver.
4. **The same page as the binary.** Almost no assurance. Whoever can replace one can replace the other.

Always compare the **full** fingerprint against the **primary** key. Short key IDs are trivially collidable and have been used in real attacks.

## Part 3 — A verification that fails

Verification is only useful if you know what failure looks like. Here is a real one, produced by appending a single null byte to a valid archive:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Real output:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Exit code: `1`.

Put the two digests side by side:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

One byte appended to a 66,992,676-byte file. The two hashes share nothing — not a prefix, not a pattern. There is no partial match and no "close enough": a checksum either matches exactly or the file is not the file you wanted.

### What to do when this happens

1. **Do not run the binary.** Do not extract it, do not `chmod +x` it.
2. **Try again from the official release page.** Most failures are truncated downloads.
3. **If it fails a second time, change network path.** Different connection, or a VPN. A failure that follows you across networks is different from one that doesn't.
4. **Confirm you have the right checksum file for the right version.** Comparing v6.3.0 against v6.2.3 sums will fail correctly.
5. **If it still fails, report it.** Open an issue at the project's repository, or use the security contact in `SECURITY.md` for anything you suspect is deliberate. See the [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) page for disclosure channels.
6. **Keep the artifact.** A tampered binary is evidence. Do not delete it before reporting.

A signature failure is more serious than a checksum failure. A checksum mismatch is usually corruption; a valid-file-but-bad-signature is not something that happens by accident.

---

## Part 4 — Reference table

| Project | Releases published at | Method | Where the key comes from |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | No key — CI identity via GitHub OIDC |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — primary `0338 34DD…58E2 6AB1`, signing subkey `1FE9 9324…23F0 617F` |
| **zcashd** | *retired* | — | Halted at block 3,417,100 on 2026-07-18. Do not install. |
| **Zodl** (formerly Zashi) | App Store / Google Play; `zodl-inc` on GitHub | Store signing; standalone Android binaries GPG-signed | ZODL key per transition statement |

> **Naming note:** Zashi was rebranded to **Zodl** in 2026 — first on the App Store, then on Google Play. Older guides referring to "Zashi" describe the same wallet lineage.

---

## Part 5 — Mobile and hardware wallets

Verification works differently once you leave direct downloads.

**App stores.** You cannot check a signature yourself. The store signs the package and you are trusting the store's review and the developer account's integrity. What you *can* verify is that you have the right app: confirm the publisher name and the package identifier against the project's official site, not against search results. Impersonation apps are common, and a store listing is not evidence of authenticity.

**Standalone Android APKs.** These *can* be verified. ZODL publishes GPG-signed standalone Android binaries via GitHub Releases, so the Part 2 workflow applies. Prefer this path if you want a checkable chain.

**Hardware wallets.** The device attests to its own firmware, so the trust anchor is the hardware, not a file on your machine. See [Keystone Zashi](/guides/keystone-zashi) for the device-verification flow. Buy direct from the manufacturer — supply-chain tampering happens between factory and buyer.

---

## Further reading

- [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) — disclosure policy and security contacts
- [Zebra Full Node](/zcash-tech/zebra-full-node) — installing Zebra after verifying it
- [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) — using Zallet
- [Sigstore documentation](https://docs.sigstore.dev/)
- [SLSA provenance levels](https://slsa.dev/)

---

*Commands in this page were run against Zebra `v6.3.0` and Zallet `v0.1.0-beta.2` on 2026-08-18. Release tooling changes: if output differs from what is shown here, trust your own run and please open a PR.*
