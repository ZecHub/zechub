<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Vérifier les versions de Zcash

## En bref

- Télécharger un binaire Zcash ne garantit pas d'obtenir celui que le projet a publié. La vérification permet de faire la différence.
- Une somme de contrôle prouve que le fichier est arrivé intact. Une **signature** prouve qui l'a produit. Les deux sont nécessaires : à elle seule, une somme de contrôle ne prouve presque rien.
- Zebra publie un fichier `SHA256SUMS` ainsi qu'un bundle **Sigstore** qui rattache la version à un workflow GitHub Actions, à un tag et à un commit précis, sans aucune gestion de clés.
- Zallet publie des signatures **GPG** détachées (`.asc`), accompagnées d'une provenance SLSA et d'un SBOM.
- La clé de signature de Zcash a changé en 2026 : elle est passée de Electric Coin Company à Zcash Open Development Lab (ZODL). Si vous avez vérifié des versions plus anciennes, il vous faut la nouvelle clé. La déclaration de transition est signée par les deux clés, ce qui vous permet de vérifier la rotation elle-même.
- `gpg` indique la **sous-clé** qui a signé un fichier, et non la clé principale citée dans les annonces. Une empreinte qui semble incorrecte correspond généralement à une sous-clé, pas à une attaque.
- Si la vérification échoue, n'exécutez pas le binaire.

*Vérifié avec Zebra `v6.3.0` et Zallet `v0.1.0-beta.2` le 2026-08-18.*

## Pourquoi c'est encore plus important pour Zcash

Un binaire de portefeuille falsifié peut exfiltrer une clé de dépense ou une clé pour lecture seule. Contrairement à un mot de passe compromis, cette perte est définitive : pas de retour en arrière, pas de rétrofacturation, pas de service client. Les transactions protégées protègent ce qui se passe *sur la chaîne*. Elles n'offrent aucune protection si le logiciel que vous exécutez a été remplacé avant même de vous parvenir.

C'est l'un des rares vecteurs d'attaque contre lesquels les garanties de confidentialité du protocole ne servent à rien. La vérification est la couche qui le couvre.

## Modèle de menace : ce que la vérification détecte et ne détecte pas

**Détecte :**

- Un miroir falsifié ou un fichier modifié servi depuis un autre endroit que la page des versions du projet.
- Une substitution de fichier par une attaque de l'homme du milieu pendant le téléchargement.
- Un CDN compromis ou un hôte de distribution détourné.
- Une corruption accidentelle pendant le transfert.

**Ne détecte pas :**

- Un mainteneur qui signe du code malveillant. La signature sera vérifiée correctement : elle prouve l'origine, pas l'intention.
- Un hôte de compilation compromis qui produit un artefact signé mais malveillant. C'est précisément ce risque que les compilations reproductibles et les attestations de provenance cherchent à réduire.
- Une clé obtenue auprès de la même source compromise que le binaire. Si un attaquant contrôle à la fois le fichier et la clé qui sert à le vérifier, la vérification ne vous apprend rien.

La plupart des guides passent ce dernier point sous silence. **La provenance de la clé compte autant que l'exécution de la commande.**

---

## Partie 1 — Zebra : sommes de contrôle et Sigstore

Pour chaque version, Zebra publie les fichiers suivants :

| Fichier | Rôle |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | l'archive du binaire |
| `zebrad-<version>-<arch>.tar.gz.sha256` | somme de contrôle par fichier |
| `SHA256SUMS` | sommes de contrôle pour toutes les architectures |
| `SHA256SUMS.sigstore.json` | bundle Sigstore qui signe `SHA256SUMS` |

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

`--ignore-missing` est indispensable ici, car `SHA256SUMS` couvre toutes les architectures alors que vous n'en avez téléchargé qu'une. Sans cette option, `sha256sum` signale l'archive aarch64 absente comme un échec, et vous risquez de prendre une réussite pour un échec.

La variante par fichier fonctionne également :

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Cette étape ne suffit pas à elle seule.** Vous avez téléchargé la somme de contrôle au même endroit que le binaire. Quiconque peut remplacer l'un peut remplacer l'autre. La somme de contrôle prouve l'intégrité ; l'étape suivante prouve l'origine.

### Étape 2b — La même vérification sous Windows

PowerShell n'a pas de mode de vérification `-c`, la comparaison se fait donc manuellement :

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Sortie réelle :

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Comparez-la avec le résultat Linux obtenu plus haut sur cette page :

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Les valeurs sont identiques.** La casse n'a pas d'importance en hexadécimal, et c'est la fausse alerte la plus fréquente sous Windows.

Deux autres pièges propres à Windows :

- **Il n'y a pas de code de sortie à vérifier.** Sous Linux, `sha256sum -c` renvoie 1 en cas d'échec, et un script peut réagir à cette valeur. `Get-FileHash` se contente d'afficher un hash : c'est à vous de faire la comparaison, et vous pouvez vous tromper en lisant trop vite.
- **Comparer 64 caractères hexadécimaux à l'œil n'est pas fiable.** Laissez le shell s'en charger :

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **Sous macOS :** la procédure est la même, mais l'environnement BSD fournit `shasum` et non `sha256sum`. Utilisez `shasum -a 256 -c --ignore-missing SHA256SUMS`. L'auteur de cette page n'avait pas de machine macOS à disposition : cette commande est donc tirée de la documentation des outils d'Apple, sans avoir été exécutée. Si vous effectuez la vérification sous macOS, merci d'ouvrir une PR pour la confirmer ou la corriger.

### Étape 3 — Vérifier le bundle Sigstore

Sigstore remplace les clés de signature à longue durée de vie par des certificats de courte durée liés à une identité CI et enregistrés dans un journal de transparence public. Personne ne détient de clé de version susceptible d'être volée.

La méthode la plus simple utilise `cosign` :

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Tout l'intérêt réside dans les deux options `--certificate-*`. **Sans elles, vous confirmez seulement que quelqu'un, quelque part, a signé le fichier.** Avec elles, vous confirmez qu'il a été signé par un workflow du dépôt Zebra, authentifié par l'émetteur OIDC de GitHub.

> ⚠️ **La version compte.** Les anciennes versions de cosign ne savent pas lire le format actuel des bundles Sigstore. Avec cosign `v2.4.1`, la commande ci-dessus produit :
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> Le bundle *contient bien* un certificat : il se trouve sous `verificationMaterial.certificate.rawBytes`, emplacement que les anciennes versions ne consultent pas. Il s'agit d'une limite du client, pas d'une version défectueuse. Si vous rencontrez ce message, mettez cosign à jour au lieu de conclure que le téléchargement est mauvais. Le cosign fourni par les distributions est souvent très en retard sur la version officielle.

Les deux étapes suivantes montrent comment vérifier ce même bundle à la main. Cela vaut la peine de le comprendre dans tous les cas, et c'est une solution de repli utilisable lorsque votre version de cosign refuse de coopérer.

### Étape 4 — Lire ce que le certificat affirme réellement

Vous pouvez examiner le bundle sans `cosign`, ce qui aide à comprendre à quoi vous faites confiance. Extrayez le certificat :

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

Le Subject Alternative Name correspond à l'identité. Il nomme le dépôt, le fichier de workflow exact et le tag. Sigstore intègre d'autres métadonnées de compilation dans des extensions personnalisées :

| Champ | Valeur pour v6.3.0 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

Chacun de ces champs peut être vérifié. Le hash du commit doit correspondre au tag du dépôt ; l'exécution du workflow doit exister et être publique.

### Étape 5 — Vérifier la signature cryptographiquement

Vous pouvez vérifier la signature directement avec OpenSSL :

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

Le bundle enregistre aussi l'empreinte qu'il a signée. Vérifiez qu'elle correspond à votre fichier local :

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Étape 6 — L'entrée du journal de transparence

Le bundle contient une entrée Rekor qui prouve que la signature a été publiée dans un journal public en ajout seul :

| Champ | Valeur |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

C'est ce qui permet de détecter une utilisation discrète et abusive d'une clé. Une signature qui n'est jamais apparue dans le journal, ou qui y est apparue à un moment invraisemblable, est un signal qui mérite une réaction. Comparez l'heure d'intégration avec l'annonce de la version.

> **Remarque sur la méthode OpenSSL :** elle vérifie la signature à l'aide de la clé publique du certificat, mais ne valide pas à elle seule la chaîne de certificats jusqu'à la racine Sigstore et ne vérifie pas la preuve d'inclusion de l'entrée du journal. `cosign verify-blob` fait les trois. Utilisez OpenSSL pour comprendre le mécanisme, et `cosign` pour la vérification proprement dite.

---

## Partie 2 — Zallet : signatures GPG

Zallet publie un autre ensemble de fichiers :

| Fichier | Rôle |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | l'archive du binaire |
| `.tar.gz.asc` | signature GPG détachée |
| `.tar.gz.intoto.jsonl` | attestation de provenance SLSA |
| `.tar.gz.provenance.json` | métadonnées de provenance |
| `.tar.gz.sbom.spdx` | nomenclature logicielle |

### Étape 1 — Identifier la clé de signature avant de la chercher

Lancez la vérification *en premier*, sans avoir importé de clé :

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

Ce n'est pas un échec. Cela vous indique qu'une signature existe et précise exactement quelle clé il vous faut, **avant** même de commencer à chercher. Notez l'empreinte et l'émetteur, puis procurez-vous la clé auprès d'une source indépendante du téléchargement.

> `gpg` affiche les horodatages dans votre fuseau horaire local. La sortie ci-dessus indique `WAT` (UTC+1) ; ailleurs, la même signature affiche `18:18:44 UTC`. Il s'agit du même instant. Ne prenez pas une différence de fuseau horaire pour une incohérence.

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

`Good signature` est le résultat attendu. Deux éléments de cette sortie déroutent souvent, et ils sont tous deux normaux.

### Pourquoi l'empreinte ne correspond pas à l'annonce

La déclaration de transition de clé de ZODL cite l'empreinte `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Pourtant, `gpg --verify` a indiqué `1FE9 9324 …  23F0 617F`. Cela ressemble à une incohérence, mais ce n'en est pas une.

`gpg` indique la **sous-clé** qui a produit la signature. L'annonce cite la **clé principale**. Vérifiez vous-même le lien entre les deux :

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

La ligne `sub` correspond à la sous-clé de signature ; la ligne `pub` à la clé principale. Une seule identité, un seul ensemble de clés. C'est pourquoi la sortie de vérification affiche les **deux** empreintes : comparez la *clé principale* avec toute annonce publiée, et considérez la ligne de la sous-clé comme l'indication de la partie de la clé qui a effectué la signature.

Cette séparation des clés est volontaire : une sous-clé de signature peut être renouvelée ou révoquée sans abandonner l'identité principale ni la confiance qu'elle a accumulée.

### Ce que signifie l'avertissement `[unknown]`

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Ce n'est **pas** un problème de signature. La signature est cryptographiquement valide, et c'est précisément ce qu'indique `Good signature`. L'avertissement dit autre chose : vous n'avez pas indiqué à votre GnuPG local que vous considérez que cette clé appartient bien à la personne qu'elle prétend représenter.

GnuPG distingue deux questions :

1. **Cette clé a-t-elle signé ce fichier ?** La réponse est donnée par `Good signature`. C'est cryptographique, sans jugement humain.
2. **Cette clé appartient-elle à ZODL ?** La cryptographie n'y répond pas du tout. Vous l'établissez en comparant l'empreinte avec une source indépendante.

Vous verrez cet avertissement lors de presque toutes les vérifications, sauf si vous signez explicitement la clé en local. Ne le considérez pas comme un échec. Considérez **en revanche** l'absence de `Good signature` comme un échec.

### Étape 3 — Vérifier la transition de clé elle-même

La signature des versions de Zcash est passée de Electric Coin Company à Zcash Open Development Lab en 2026, après la création de ZODL en janvier 2026 par l'ancienne équipe d'ingénierie et de produit de ECC.

| | Ancienne clé | Nouvelle clé |
|---|---|---|
| Empreinte | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Type | RSA 3072 bits, créée le 2023-06-19 | RSA 4096 bits, créée le 2026-03-23, expire le 2028-03-22 |
| Publiée sur | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Calendrier publié : nouvelle clé générée le 2026-03-23, annoncée le 2026-03-27, signature exclusive à partir du 2026-04-23, révocation de l'ancienne clé ECC prévue le 2026-06-23.

Une annonce de rotation publiée sur un site web n'est pas plus fiable que le site lui-même. Le bon mécanisme est une déclaration **signée en clair par les deux clés**, afin que l'ancienne clé se porte garante de la nouvelle. C'est exactement ce que publie ZODL :

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Sortie réelle (abrégée : deux signatures sur un même document) :

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

Deux résultats `Good signature` sur un même document, l'un de l'ancienne clé, l'autre de la nouvelle. Si vous faisiez confiance à la clé ECC pour les versions précédentes, cette confiance s'étend désormais à la clé ZODL sans que vous ayez à faire confiance à `zodl.com`, à `apt.z.cash` ou à un message de forum. C'est la propriété à rechercher chaque fois qu'un projet change de clés, et son absence mérite qu'on pose la question.

### Où obtenir une clé, et où ne pas l'obtenir

Du meilleur au pire :

1. **Une déclaration signée par la clé précédente**, comme ci-dessus. C'est l'option la plus solide après une rotation.
2. **Une source indépendante du téléchargement.** Le binaire provient de GitHub ; la clé provient de `apt.z.cash`. Un attaquant doit compromettre les deux.
3. **Un serveur de clés, avec comparaison à une empreinte publiée.** Sur la plupart des serveurs de clés, n'importe qui peut déposer une clé revendiquant n'importe quelle identité. C'est la comparaison de l'empreinte qui rend cette méthode sûre, pas le serveur de clés.
4. **La même page que le binaire.** Presque aucune garantie. Quiconque peut remplacer l'un peut remplacer l'autre.

Comparez toujours l'empreinte **complète** avec la clé **principale**. Les identifiants de clé courts sont faciles à falsifier par collision et ont déjà été exploités dans des attaques réelles.

## Partie 3 — Une vérification qui échoue

La vérification n'est utile que si vous savez à quoi ressemble un échec. En voici un réel, obtenu en ajoutant un seul octet nul à une archive valide :

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
sha256sum tampered.tar.gz > tampered.sha256
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Sortie réelle :

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Code de sortie : `1`.

Comparez les deux empreintes côte à côte :

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Un seul octet ajouté à un fichier de 66 992 676 octets. Les deux hashs n'ont rien en commun : ni préfixe, ni motif. Il n'existe pas de correspondance partielle ni de « presque bon » : soit une somme de contrôle correspond exactement, soit le fichier n'est pas celui que vous vouliez.

### Que faire dans ce cas

1. **N'exécutez pas le binaire.** Ne l'extrayez pas, ne lui appliquez pas `chmod +x`.
2. **Recommencez depuis la page officielle des versions.** La plupart des échecs proviennent de téléchargements tronqués.
3. **Si l'échec se reproduit, changez de chemin réseau.** Utilisez une autre connexion ou un VPN. Un échec qui vous suit d'un réseau à l'autre n'a pas la même signification qu'un échec qui disparaît.
4. **Vérifiez que vous avez le bon fichier de sommes de contrôle pour la bonne version.** Comparer la v6.3.0 avec les sommes de la v6.2.3 échouera, à juste titre.
5. **Si l'échec persiste, signalez-le.** Ouvrez une issue sur le dépôt du projet, ou utilisez le contact de sécurité indiqué dans `SECURITY.md` pour tout ce qui vous semble délibéré. Consultez la page [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) pour connaître les canaux de signalement.
6. **Conservez l'artefact.** Un binaire falsifié est une preuve. Ne le supprimez pas avant de l'avoir signalé.

Un échec de signature est plus grave qu'un échec de somme de contrôle. Une somme de contrôle incorrecte résulte généralement d'une corruption ; un fichier valide avec une signature incorrecte n'arrive jamais par accident.

---

## Partie 4 — Tableau de référence

| Projet | Versions publiées sur | Méthode | Provenance de la clé |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | Aucune clé : identité CI via OIDC de GitHub |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` : clé principale `0338 34DD…58E2 6AB1`, sous-clé de signature `1FE9 9324…23F0 617F` |
| **zcashd** | *retiré* | — | Arrêté au bloc 3 417 100 le 2026-07-18. Ne pas installer. |
| **Zodl** (anciennement Zashi) | App Store / Google Play ; `zodl-inc` sur GitHub | Store signing; standalone Android binaries GPG-signed | Clé ZODL selon la déclaration de transition |

> **Remarque sur le nom :** Zashi a été renommé **Zodl** en 2026, d'abord sur l'App Store, puis sur Google Play. Les anciens guides qui parlent de « Zashi » décrivent la même lignée de portefeuilles.

---

## Partie 5 — Portefeuilles mobiles et portefeuilles matériels

La vérification fonctionne différemment dès que l'on sort des téléchargements directs.

**Magasins d'applications.** Vous ne pouvez pas vérifier vous-même une signature. Le magasin signe le paquet, et vous faites confiance à son processus d'examen ainsi qu'à l'intégrité du compte du développeur. Ce que vous *pouvez* vérifier, c'est que vous avez la bonne application : comparez le nom de l'éditeur et l'identifiant du paquet avec ceux indiqués sur le site officiel du projet, et non avec les résultats de recherche. Les applications d'usurpation sont courantes, et une fiche dans un magasin d'applications ne prouve pas l'authenticité.

**APK Android autonomes.** Ceux-ci *peuvent* être vérifiés. ZODL publie des binaires Android autonomes signés avec GPG via GitHub Releases : la procédure de la partie 2 s'applique donc. Privilégiez cette voie si vous voulez une chaîne de confiance vérifiable.

**Portefeuilles matériels.** L'appareil atteste de son propre firmware : l'ancre de confiance est donc le matériel, et non un fichier sur votre machine. Consultez [Keystone Zashi](/guides/keystone-zashi) pour la procédure de vérification de l'appareil. Achetez directement auprès du fabricant : les falsifications de la chaîne d'approvisionnement se produisent entre l'usine et l'acheteur.

---

## Pour aller plus loin

- [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) — politique de divulgation et contacts de sécurité
- [Zebra Full Node](/zcash-tech/zebra-full-node) — installer Zebra après l'avoir vérifié
- [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) — utiliser Zallet
- [Documentation de Sigstore](https://docs.sigstore.dev/)
- [Niveaux de provenance SLSA](https://slsa.dev/)

---

*Les commandes de cette page ont été exécutées avec Zebra `v6.3.0` et Zallet `v0.1.0-beta.2` le 2026-08-18. Les outils de publication évoluent : si la sortie diffère de celle présentée ici, fiez-vous à votre propre exécution et merci d'ouvrir une PR.*
