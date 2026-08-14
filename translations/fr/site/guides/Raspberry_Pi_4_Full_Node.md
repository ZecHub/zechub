# Exécuter un nœud complet sur un Raspberry Pi 4 (Zebra + Zallet)

*Migré depuis le guide original basé sur zcashd. zcashd a atteint son arrêt automatique de fin de support le 18 juillet 2026, donc ce guide utilise désormais **Zebra** (le nœud complet actuel, maintenu par la Zcash Foundation) et **Zallet** (le portefeuille conçu pour remplacer le portefeuille intégré de zcashd).*

## Ce que vous allez apprendre
- Comment flasher et configurer Ubuntu Server 22.04+ (64 bits) sur un Raspberry Pi 4 pour une utilisation headless
- Comment installer et exécuter Zebra, soit via Docker soit via un binaire précompilé
- Comment installer, configurer et initialiser Zallet, y compris la configuration du chiffrement du portefeuille
- Comment migrer facultativement une configuration/un portefeuille zcashd existant vers Zallet

## Ce qui a changé par rapport à l'ancien guide
La version précédente de ce guide expliquait comment compiler **zcashd** nativement sur un Pi 4 — une compilation mono-thread qui prenait 3 à 4 heures parce que le Pi 4 n'a pas assez de mémoire pour une compilation parallèle (`-j$(nproc)`). Zebra et Zallet publient désormais tous deux des **binaires ARM64 et des images Docker précompilés officiels**, donc dans la plupart des cas vous n'avez plus besoin de compiler quoi que ce soit depuis les sources sur le Pi lui-même.

## Prérequis
- Un Raspberry Pi 4 (4 Go de RAM ou plus recommandés)
- Une carte microSD (32 Go+) pour l'OS
- Un SSD/HDD externe compatible USB 3.0 — **Zebra a besoin d'environ 300 Go pour les données Mainnet mises en cache**, et ce volume augmente avec le temps, donc n'essayez pas de faire tourner cela uniquement depuis la carte microSD
- Un ordinateur avec un lecteur de carte microSD (pour flasher l'image de l'OS)
- Une connexion Ethernet filaire ou le Wi-Fi
- Une aisance de base avec la ligne de commande via SSH

## Étape 1 : Flasher Ubuntu Server 22.04+ (64 bits)
Les binaires précompilés et images Docker de Zebra et Zallet nécessitent **glibc 2.34+**, ce qui signifie **Ubuntu Server 22.04 ou plus récent (64 bits/aarch64)**.

1. Installez Raspberry Pi Imager sur votre ordinateur principal.
2. Insérez votre carte microSD.
3. Choisissez **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (ou plus récent).
4. Utilisez les options avancées de l'Imager (icône engrenage) pour préconfigurer le nom d'hôte, activer SSH et définir les identifiants Wi-Fi si nécessaire, pour un premier démarrage headless.
5. Écrivez l'image, insérez la carte, allumez le Pi.
6. Connectez-vous en SSH : `ssh <username>@<pi-hostname-or-ip>`

## Étape 2 : Connecter et monter le stockage externe
1. Connectez votre SSD/HDD externe via USB 3.0.
2. Identifiez le périphérique : `lsblk`
3. Formatez-le (s'il est neuf) et montez-le, par exemple sur `/mnt/zcash-data`, avec une configuration standard `mkfs`/`fstab` afin qu'il se monte automatiquement au redémarrage.

## Étape 3 : Mettre le système à jour
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Étape 4 : Installer et exécuter Zebra
### Option A — Docker (recommandé)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Vérifiez la progression : `docker logs -f zebra`

### Option B — Binaire précompilé via cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Cela installe un binaire `aarch64` précompilé — aucune compilation requise.

**Concernant le temps de synchronisation :** attendez-vous à ce que cela prenne du temps — les chiffres souvent cités pour une première synchronisation (environ 2 heures) proviennent d'un matériel de référence plus puissant que le CPU d'un Pi 4, donc votre temps de synchronisation réel sur un vrai Pi 4 sera probablement plus long.

## Étape 5 : Installer Zallet
Zallet est actuellement en **alpha** — attendez-vous à des changements incompatibles, et ne le considérez pas encore comme une solution de garde prête pour la production pour des montants importants.

### Option A — Docker (recommandé)
```bash
docker pull zodlinc/zallet:latest
```
Cette image prend en charge ARM64 (via un build basé sur Nix) et s'exécute depuis un système de fichiers minimal sans shell — passez explicitement les chemins de configuration et de données via `--datadir` et les montages de volumes (voir l'étape 6).

### Option B — Compiler depuis les sources
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Les crates de Zallet ne sont pas encore publiées sur crates.io pendant la phase alpha, donc l'installation directement depuis le dépôt git est la méthode non-Docker prise en charge.

## Étape 6 : Configurer Zallet
Créez `zallet.toml` dans le répertoire de données de votre choix (par ex. `/mnt/zcash-data/zallet`) :
```toml
[builder.limits]
[consensus]
network = "main"
[database]
[external]
[features]
as_of_version = "0.0.0"
[features.deprecated]
[features.experimental]
[indexer]
validator_address = "127.0.0.1:8232"   # Zebra's JSON-RPC endpoint
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
Ajustez `validator_address` si Zebra s'exécute sur un autre hôte/port, et configurez `validator_cookie_auth`/`validator_user`/`validator_password` sous `[indexer]` pour correspondre à votre configuration d'authentification RPC Zebra.

**Migration depuis zcashd ?** Si vous avez encore un ancien `zcash.conf` :
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Étape 7 : Configurer le chiffrement du portefeuille
Zallet chiffre tout le matériel de clés en utilisant `age`/`rage` :
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Cela affiche une clé publique et une phrase secrète autogénérée — **conservez la phrase secrète ; vous ne pouvez pas récupérer le fichier d'identité sans elle.**

## Étape 8 : Initialiser et démarrer le portefeuille
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**N'exécutez `generate-mnemonic` qu'une seule fois** sauf si vous voulez délibérément plusieurs racines de dépense indépendantes.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Étape 9 : Migrer un portefeuille zcashd existant (facultatif)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Cela nécessite l'utilitaire `db_dump` (compilé contre Berkeley DB 6.2.23) — depuis une installation système ou une compilation locale de zcashd depuis les sources. Si vous n'avez plus zcashd installé, c'est l'unique étape de migration qui n'est pas encore entièrement autonome dans Zallet.

## Étape 10 : Vérifier que tout fonctionne
```bash
zallet -d /mnt/zcash-data/zallet help
```
Confirmez que le portefeuille répond et, une fois que Zebra a terminé sa synchronisation, que les soldes/adresses correspondent à vos attentes.

## Dépannage
- **Problèmes de compilation/exécution de Zebra sur ARM :** si vous compilez depuis les sources, installez la toolchain Rust ARM — exécuter des outils de compilation x86_64 sur du matériel ARM sera sensiblement plus lent, selon la propre documentation de Zebra.
- **Le stockage se remplit :** l'empreinte d'environ 300 Go de Zebra continue de croître — prévoyez de la marge.
- **Erreurs de permission Docker :** déconnectez-vous/reconnectez-vous après avoir ajouté votre utilisateur au groupe `docker`, ou utilisez `sudo` en attendant.
- **Le conteneur Zallet n'a pas de shell :** l'image officielle `zodlinc/zallet` est volontairement from-scratch — passez toujours `--datadir` explicitement et montez votre répertoire de données comme volume.

## Notes matérielles par rapport à l'ancien guide zcashd
Zebra et Zallet sont généralement moins exigeants en CPU pendant l'installation que ne l'était la compilation de zcashd, puisque vous exécutez des binaires/conteneurs précompilés. 4 Go de RAM constituent un point de départ raisonnable ; surveillez avec `htop` et envisagez la variante Pi 4 de 8 Go si vous constatez un swap important.

## Ressources supplémentaires
- [Livre de Zebra](https://zebra.zfnd.org) — documentation officielle de Zebra
- [Livre de Zallet](https://zcash.github.io/wallet) — documentation officielle de Zallet
- [Avis de fin de support de zcashd](https://z.cash/support/zcashd-deprecation)

---

*Si ce guide vous a été utile, envisagez de soutenir ZecHub : [insérer l'adresse shielded actuelle de don ZecHub depuis zechub.wiki/donation — non incluse ici car je n'ai pas pu vérifier qu'elle est toujours à jour].*
