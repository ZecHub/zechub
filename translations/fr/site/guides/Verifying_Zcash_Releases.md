<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Vérification des versions de Zcash

## TL;DR

- Télécharger un binaire Zcash ne revient pas à obtenir celui publié par le projet. La vérification permet de faire la différence.
- Une somme de contrôle prouve que le fichier est arrivé intact. Une **signature** prouve qui l’a produit. Il vous faut les deux, et une somme de contrôle seule prouve très peu de chose.
- Zebra publie un fichier `SHA256SUMS` ainsi qu’un bundle **Sigstore** qui relie la version à un workflow GitHub Actions, un tag et un commit précis — aucune gestion de clés requise.
- Zallet publie des signatures **GPG** détachées (`.asc`) ainsi qu’une provenance SLSA et un SBOM.
- La clé de signature Zcash a changé en 2026, passant de Electric Coin Company à Zcash Open Development Lab (ZODL). Si vous avez vérifié d’anciennes versions, vous avez besoin de la nouvelle clé — et la déclaration de transfert est signée par les deux clés, ce qui vous permet de vérifier la rotation elle-même.
- `gpg` affiche la **sous-clé** qui a signé un fichier, et non la clé primaire mentionnée dans les annonces. Une empreinte qui semble erronée est généralement une sous-clé, pas une attaque.
- Si la vérification échoue, n’exécutez pas le binaire.

*Vérifié avec Zebra `v6.3.0` et Zallet `v0.1.0-beta.2` le 2026-08-18.*

## Pourquoi c’est encore plus important pour Zcash

Un binaire de wallet altéré peut exfiltrer une spending key ou une viewing key. Contrairement à un mot de passe compromis, cette perte est permanente : il n’y a ni retour en arrière, ni rétrofacturation, ni support client. Les transactions protégées protègent ce qui se passe *on chain* — elles n’offrent aucune protection si le logiciel que vous exécutez a été remplacé avant même de vous parvenir.

C’est l’une des rares voies d’attaque où les garanties de confidentialité du protocole ne sont tout simplement pas pertinentes. La vérification est la couche qui couvre ce risque.

## Modèle de menace — ce que la vérification détecte et ce qu’elle ne détecte pas

**Détecte :**

- Un miroir altéré ou un fichier modifié servi depuis un autre endroit que la page de publication du projet.
- Une substitution par attaque de l’homme du milieu pendant le téléchargement.
- Un CDN compromis ou un hôte de distribution détourné.
- Une corruption accidentelle pendant le transit.

**Ne détecte pas :**

- Un mainteneur qui signe un code malveillant. La signature sera valide ; elle prouve l’origine, pas l’intention.
- Un hôte de build compromis produisant un artefact signé mais malveillant. C’est précisément ce que les builds reproductibles et les attestations de provenance cherchent à limiter.
- Une clé obtenue depuis la même source compromise que le binaire. Si un attaquant contrôle à la fois le fichier et la clé avec laquelle vous le vérifiez, la vérification ne vous apprend rien.

Ce dernier point est celui que la plupart des guides omettent. **L’endroit où vous obtenez la clé compte autant que l’exécution de la commande.**

---

## Partie 1 — Zebra : sommes de contrôle et Sigstore

Zebra publie ces éléments pour chaque version :

| Élément | Usage |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | l’archive binaire |
| `zebrad-<version>-<arch>.tar.gz.sha256` | somme de contrôle par fichier |
| `SHA256SUMS` | sommes de contrôle pour toutes les architectures |
| `SHA256SUMS.sigstore.json` | bundle Sigstore signant `SHA256SUMS` |

### Étape 1 — Télécharger

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Étape 2 — Vérifier la somme de contrôle

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Sortie réelle :

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` est nécessaire ici parce que `SHA256SUMS` couvre toutes les architectures et que vous n’en avez téléchargé qu’une seule. Sans cette option, `sha256sum` signale l’absence de l’archive aarch64 comme un échec et vous pourriez interpréter à tort une réussite comme un échec.

La variante par fichier fonctionne aussi :

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Cette étape seule ne suffit pas.** Vous avez téléchargé la somme de contrôle depuis le même endroit que le binaire. Quiconque pouvait remplacer l’un pouvait remplacer l’autre. La somme de contrôle prouve l’intégrité ; l’étape suivante prouve l’origine.

### Étape 2b — La même vérification sous Windows

PowerShell n’a pas de mode de vérification `-c`, vous devez donc comparer manuellement :

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Sortie réelle :

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Comparez cela au résultat Linux affiché plus haut sur cette page :

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Valeurs identiques.** L’hexadécimal n’a pas de casse, et c’est l’alerte injustifiée la plus fréquente sous Windows.

Deux autres pièges spécifiques à Windows :

- **Il n’y a pas de code de sortie à vérifier.** Sous Linux, `sha256sum -c` renvoie 1 en cas d’échec et un script peut agir en conséquence. `Get-FileHash` ne fait qu’afficher un hash — c’est à vous de faire la comparaison, et de risquer de vous tromper en parcourant trop vite.
- **Lire 64 caractères hexadécimaux à l’œil nu n’est pas fiable.** Laissez le shell le faire :

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **Sur macOS :** le flux de travail est le même, mais l’environnement BSD fournit `shasum` plutôt que `sha256sum` — utilisez `shasum -a 256 -c --ignore-missing SHA256SUMS`. L’auteur de cette page n’avait pas de machine macOS disponible, donc cette commande est documentée à partir des outils Apple plutôt qu’exécutée. Si vous vérifiez sur macOS, merci d’ouvrir une PR pour la confirmer ou la corriger.

### Étape 3 — Vérifier le bundle Sigstore

Sigstore remplace les clés de signature de longue durée par des certificats de courte durée liés à une identité CI, enregistrés dans un journal de transparence public. Personne ne détient une clé de publication qui pourrait être volée.

La voie la plus directe utilise `cosign` :

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Les deux options `--certificate-*` sont le point essentiel. **Sans elles, vous ne faites que confirmer que quelqu’un, quelque part, a signé le fichier.** Avec elles, vous confirmez qu’il a été signé par un workflow du dépôt Zebra, authentifié par l’émetteur OIDC de GitHub.

> ⚠️ **La version compte.** Les anciennes versions de cosign ne peuvent pas lire le format actuel des bundles Sigstore. Exécuter la commande ci-dessus avec cosign `v2.4.1` produit :
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> Le bundle *contient bien* un certificat — il se trouve sous `verificationMaterial.certificate.rawBytes`, que les anciennes versions ne vont pas chercher. Il s’agit d’une limitation du client, pas d’une version cassée. Si vous tombez sur ce cas, mettez cosign à jour au lieu de conclure que le téléchargement est mauvais. Les versions empaquetées par les distributions ont souvent beaucoup de retard sur la version amont.

Les deux étapes suivantes montrent comment vérifier le même bundle manuellement, ce qui mérite d’être compris dans tous les cas — et constitue une solution de repli utilisable lorsque votre version de cosign refuse de coopérer.

### Étape 4 — Lire ce que le certificat affirme réellement

Vous pouvez inspecter le bundle sans `cosign`, ce qui est utile pour comprendre ce à quoi vous faites confiance. Extrayez le certificat :

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Sortie réelle pour Zebra v6.3.0 :

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Le Subject Alternative Name est l’identité. Il nomme le dépôt, le fichier de workflow exact et le tag. Sigstore intègre aussi d’autres métadonnées de build dans des extensions personnalisées :

| Champ | Valeur pour v6.3.0 |
|---|---|
| Émetteur OIDC | `https://token.actions.githubusercontent.com` |
| Dépôt source | `https://github.com/ZcashFoundation/zebra` |
| Commit de build | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Environnement du runner | `github-hosted` |
| Exécution du workflow | `.../actions/runs/31424510487/attempts/1` |
| Visibilité du dépôt | `public` |

Chacun de ces éléments peut être contrôlé. Le hash du commit doit correspondre au tag dans le dépôt ; l’exécution du workflow doit exister et être publique.

### Étape 5 — Vérifier la signature cryptographiquement

Vous pouvez confirmer la signature directement avec OpenSSL :

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Sortie réelle :

```
Verified OK
```

Le bundle enregistre aussi le condensat qu’il a signé. Confirmez qu’il correspond à votre fichier local :

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Étape 6 — L’entrée dans le journal de transparence

Le bundle contient une entrée Rekor prouvant que la signature a été publiée dans un journal public append-only :

| Champ | Valeur |
|---|---|
| Index du journal Rekor | `2412071838` |
| Type d’entrée | `hashedrekord v0.0.1` |
| Intégré le | 2026-08-10 19:43:09 UTC |

C’est ce qui rend détectable un usage abusif silencieux des clés. Une signature qui n’apparaît jamais dans le journal, ou qui y apparaît à un moment peu plausible, constitue un signal qui mérite une réaction. Comparez l’heure d’intégration à l’annonce de publication.

> **Remarque sur la méthode OpenSSL :** elle vérifie la signature par rapport à la clé publique du certificat, mais elle ne valide pas à elle seule la chaîne du certificat jusqu’à la racine de Sigstore ni la preuve d’inclusion de l’entrée dans le journal. `cosign verify-blob` fait les trois. Utilisez OpenSSL pour comprendre le mécanisme ; utilisez `cosign` pour votre véritable vérification.

---

## Partie 2 — Zallet : signatures GPG

Zallet publie un ensemble d’éléments différent :

| Élément | Usage |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | l’archive binaire |
| `.tar.gz.asc` | signature GPG détachée |
| `.tar.gz.intoto.jsonl` | attestation de provenance SLSA |
| `.tar.gz.provenance.json` | métadonnées de provenance |
| `.tar.gz.sbom.spdx` | nomenclature logicielle |

### Étape 1 — Identifier la clé de signature avant de partir à sa recherche

Exécutez *d’abord* la vérification, sans importer de clé :

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Sortie réelle :

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Ce n’est pas un échec. Cela vous indique qu’une signature existe et nomme exactement la clé dont vous avez besoin, **avant même** que vous commenciez à la chercher. Notez l’empreinte et l’émetteur, puis obtenez la clé depuis une source indépendante du téléchargement.

> `gpg` affiche les horodatages dans votre fuseau horaire local. La sortie ci-dessus montre `WAT` (UTC+1) ; ailleurs, la même signature s’affichera comme `18:18:44 UTC`. C’est le même instant. Ne prenez pas une différence de fuseau horaire pour une divergence.

### Étape 2 — Importer la clé et vérifier

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Sortie réelle :

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

`Good signature` est ce que vous vouliez obtenir. Deux éléments de cette sortie troublent souvent les gens, et tous deux sont normaux.

### Pourquoi l’empreinte ne correspond pas à l’annonce

La déclaration de transition de clé ZODL mentionne l’empreinte `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Mais `gpg --verify` a indiqué `1FE9 9324 …  23F0 617F`. Cela ressemble à une divergence, mais ce n’en est pas une.

`gpg` affiche la **sous-clé** qui a produit la signature. L’annonce mentionne la **clé primaire**. Vérifiez la relation vous-même :

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Sortie réelle :

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

La ligne `sub` correspond à la sous-clé de signature ; la ligne `pub` à la clé primaire. Une seule identité, un seul paquet de clés. C’est pourquoi la sortie de vérification affiche **les deux** empreintes — comparez la *clé primaire* à toute annonce publiée, et considérez la ligne de sous-clé comme l’indication de la partie de la clé qui a effectué la signature.

Cette séparation des clés est délibérée : une sous-clé de signature peut être renouvelée ou révoquée sans abandonner l’identité primaire ni la confiance accumulée.

### Ce que signifie l’avertissement `[unknown]`

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Ce n’est **pas** un problème de signature. La signature est cryptographiquement valide — c’est ce que signifie `Good signature`. L’avertissement dit autre chose : vous n’avez pas indiqué à votre GnuPG local que vous pensez que cette clé appartient bien à l’entité qu’elle prétend représenter.

GnuPG sépare deux questions :

1. **Est-ce bien cette clé qui a signé ce fichier ?** — réponse donnée par `Good signature`. C’est cryptographique, sans jugement humain.
2. **Cette clé appartient-elle bien à ZODL ?** — la cryptographie n’y répond pas du tout. Vous l’établissez en vérifiant l’empreinte auprès d’une source indépendante.

Vous verrez cet avertissement pour presque toute vérification, sauf si vous signez explicitement la clé localement. Ne le traitez pas comme un échec. **En revanche**, traitez l’absence de `Good signature` comme un échec.

### Étape 3 — Vérifier la transition de clé elle-même

La signature des versions Zcash est passée de Electric Coin Company à Zcash Open Development Lab en 2026, après la création de ZODL en janvier 2026 par l’ancienne équipe ingénierie et produit d’ECC.

| | Ancienne clé | Nouvelle clé |
|---|---|---|
| Empreinte | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Type | RSA 3072-bit, créée le 2023-06-19 | RSA 4096-bit, créée le 2026-03-23, expire le 2028-03-22 |
| Publiée à | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Chronologie publiée : nouvelle clé générée le 2026-03-23, annoncée le 2026-03-27, signature exclusive à partir du 2026-04-23, révocation de l’ancienne clé ECC prévue le 2026-06-23.

Une annonce de rotation sur un site web n’est fiable qu’à hauteur de la fiabilité du site lui-même. Le bon mécanisme est une déclaration **clear-signed par les deux clés**, afin que l’ancienne clé atteste de la nouvelle. ZODL publie exactement cela :

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Sortie réelle (abrégée — deux signatures sur un même document) :

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

Deux résultats `Good signature` sur un même document, l’un avec l’ancienne clé et l’autre avec la nouvelle. Si vous faisiez confiance à la clé ECC pour les versions précédentes, cette confiance se prolonge maintenant jusqu’à la clé ZODL sans que vous ayez à faire confiance à `zodl.com`, `apt.z.cash` ou à un message de forum. C’est cette propriété qu’il faut rechercher chaque fois qu’un projet change de clés — et son absence mérite des questions.

### Où obtenir une clé — et où ne pas l’obtenir

Classé du meilleur au pire :

1. **Une déclaration signée par la clé précédente**, comme ci-dessus. C’est l’option la plus solide après une rotation.
2. **Une source indépendante du téléchargement.** Le binaire vient de GitHub ; la clé vient de `apt.z.cash`. Un attaquant doit contrôler les deux.
3. **Un serveur de clés, recoupé avec une empreinte publiée.** N’importe qui peut téléverser sur la plupart des serveurs de clés une clé prétendant n’importe quelle identité. C’est la comparaison de l’empreinte qui rend cela sûr — pas le serveur de clés.
4. **La même page que le binaire.** Presque aucune garantie. Quiconque peut remplacer l’un peut remplacer l’autre.

Comparez toujours l’empreinte **complète** avec la clé **primaire**. Les identifiants courts de clé sont trivialement sujets aux collisions et ont déjà été utilisés dans de vraies attaques.

## Partie 3 — Une vérification qui échoue

La vérification n’est utile que si vous savez à quoi ressemble un échec. En voici un réel, obtenu en ajoutant un seul octet nul à une archive valide :

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Sortie réelle :

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Code de sortie : `1`.

Placez les deux condensats côte à côte :

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Un octet ajouté à un fichier de 66,992,676 octets. Les deux hash n’ont rien en commun — ni préfixe, ni motif. Il n’existe ni correspondance partielle ni « suffisamment proche » : soit une somme de contrôle correspond exactement, soit le fichier n’est pas celui que vous vouliez.

### Que faire lorsque cela arrive

1. **N’exécutez pas le binaire.** Ne l’extrayez pas, ne faites pas `chmod +x` dessus.
2. **Réessayez depuis la page officielle de publication.** La plupart des échecs viennent de téléchargements tronqués.
3. **Si cela échoue une deuxième fois, changez de chemin réseau.** Une autre connexion, ou un VPN. Un échec qui vous suit sur plusieurs réseaux n’a pas la même signification qu’un échec qui disparaît.
4. **Confirmez que vous avez le bon fichier de somme de contrôle pour la bonne version.** Comparer les sommes de v6.3.0 à celles de v6.2.3 échouera à juste titre.
5. **Si cela échoue toujours, signalez-le.** Ouvrez une issue dans le dépôt du projet, ou utilisez le contact de sécurité dans `SECURITY.md` pour tout ce que vous soupçonnez d’être délibéré. Consultez la page [Sécurité de l’écosystème Zcash](/zcash-community/zcash-ecosystem-security) pour les canaux de divulgation.
6. **Conservez l’artefact.** Un binaire altéré est une preuve. Ne le supprimez pas avant de l’avoir signalé.

Un échec de signature est plus grave qu’un échec de somme de contrôle. Une divergence de somme de contrôle est généralement une corruption ; un fichier valide mais une mauvaise signature n’est pas quelque chose qui arrive par accident.

---

## Partie 4 — Tableau de référence

| Projet | Versions publiées sur | Méthode | Provenance de la clé |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + bundle Sigstore | Pas de clé — identité CI via GitHub OIDC |
| **Zallet** | `github.com/zcash/zallet/releases` | GPG `.asc` détaché, provenance SLSA, SBOM | `apt.z.cash/zodl.asc` — primaire `0338 34DD…58E2 6AB1`, sous-clé de signature `1FE9 9324…23F0 617F` |
| **zcashd** | *retiré* | — | Arrêté au bloc 3,417,100 le 2026-07-18. Ne pas installer. |
| **Zodl** (anciennement Zashi) | App Store / Google Play ; `zodl-inc` sur GitHub | Signature du store ; binaires Android autonomes signés GPG | Clé ZODL selon la déclaration de transition |

> **Remarque sur le nom :** Zashi a été renommé **Zodl** en 2026 — d’abord sur l’App Store, puis sur Google Play. Les anciens guides qui parlent de « Zashi » décrivent la même lignée de wallet.

---

## Partie 5 — Wallets mobiles et hardware wallets

La vérification fonctionne différemment dès que vous sortez des téléchargements directs.

**App stores.** Vous ne pouvez pas vérifier une signature vous-même. Le store signe le paquet et vous faites confiance à la revue du store ainsi qu’à l’intégrité du compte développeur. Ce que vous *pouvez* vérifier, c’est que vous avez la bonne application : confirmez le nom de l’éditeur et l’identifiant du paquet à partir du site officiel du projet, pas à partir des résultats de recherche. Les applications d’usurpation sont fréquentes, et une fiche de store n’est pas une preuve d’authenticité.

**APK Android autonomes.** Ceux-ci *peuvent* être vérifiés. ZODL publie via GitHub Releases des binaires Android autonomes signés GPG, donc le flux de travail de la Partie 2 s’applique. Préférez cette voie si vous voulez une chaîne vérifiable.

**Hardware wallets.** L’appareil atteste de son propre firmware, donc l’ancre de confiance est le matériel, pas un fichier sur votre machine. Voir [Keystone Zashi](/guides/keystone-zashi) pour le processus de vérification de l’appareil. Achetez directement auprès du fabricant — les altérations de la chaîne d’approvisionnement se produisent entre l’usine et l’acheteur.

---

## Lectures complémentaires

- [Sécurité de l’écosystème Zcash](/zcash-community/zcash-ecosystem-security) — politique de divulgation et contacts sécurité
- [Nœud complet Zebra](/zcash-tech/zebra-full-node) — installer Zebra après l’avoir vérifié
- [Guide de référence rapide Zallet](/using-zcash/zallet-quick-reference-guide) — utiliser Zallet
- [Documentation Sigstore](https://docs.sigstore.dev/)
- [Niveaux de provenance SLSA](https://slsa.dev/)

---

*Les commandes de cette page ont été exécutées avec Zebra `v6.3.0` et Zallet `v0.1.0-beta.2` le 2026-08-18. Les outils de publication évoluent : si la sortie diffère de ce qui est affiché ici, fiez-vous à votre propre exécution et merci d’ouvrir une PR.*
