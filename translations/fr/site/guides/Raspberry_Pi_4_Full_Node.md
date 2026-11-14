# Exécuter un nœud complet sur un Raspberry Pi 4 (Zebra + Zallet)

*Migré depuis le guide original basé sur zcashd. zcashd a atteint son arrêt automatique de fin de support le 18 juillet 2026 ; ce guide utilise donc désormais **Zebra** (le nœud complet actuel, maintenu par la Zcash Foundation) et **Zallet** (le portefeuille conçu pour remplacer le portefeuille intégré de zcashd).*

## Ce que vous allez apprendre
- Comment flasher et configurer Ubuntu Server 22.04+ (64 bits) sur un Raspberry Pi 4 pour une utilisation sans écran
- Comment installer et exécuter Zebra, soit via Docker, soit à l'aide d'un binaire précompilé
- Comment installer, configurer et initialiser Zallet, y compris la mise en place du chiffrement du portefeuille
- Comment migrer, si vous le souhaitez, une configuration ou un portefeuille zcashd existant vers Zallet

## Ce qui a changé par rapport à l'ancien guide
La version précédente de ce guide expliquait comment compiler **zcashd** nativement sur un Pi 4 : une compilation sur un seul thread qui prenait 3 à 4 heures, car le Pi 4 ne dispose pas d'assez de mémoire pour une compilation parallèle (`-j$(nproc)`). Zebra et Zallet sont désormais tous deux fournis sous forme de **binaires ARM64 précompilés officiels et d'images Docker**. Dans la plupart des cas, vous n'avez donc plus besoin de compiler quoi que ce soit à partir du code source sur le Pi lui-même.

## Prérequis
- Un Raspberry Pi 4 (4 Go de RAM ou plus recommandés)
- Une carte microSD (32 Go ou plus) pour le système d'exploitation
- Un SSD ou un disque dur externe compatible USB 3.0 : **Zebra a besoin d'environ 300 Go pour les données Mainnet en cache**, et ce volume augmente avec le temps. N'essayez donc pas de tout faire tourner sur la seule carte microSD
- Un ordinateur équipé d'un lecteur de carte microSD (pour flasher l'image du système d'exploitation)
- Une connexion Ethernet filaire ou le Wi-Fi
- Une aisance de base avec la ligne de commande via SSH

## Étape 1 : flasher Ubuntu Server 22.04+ (64 bits)
Les binaires précompilés et les images Docker de Zebra et de Zallet nécessitent **glibc 2.34+**, c'est-à-dire **Ubuntu Server 22.04 ou une version plus récente (64 bits/aarch64)**.

1. Installez Raspberry Pi Imager sur votre ordinateur principal.
2. Insérez votre carte microSD.
3. Choisissez **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (ou une version plus récente).
4. Utilisez les options avancées de l'Imager (icône en forme d'engrenage) pour préconfigurer le nom d'hôte, activer SSH et définir les identifiants Wi-Fi si nécessaire, afin de permettre un premier démarrage sans écran.
5. Écrivez l'image, insérez la carte et mettez le Pi sous tension.
6. Connectez-vous en SSH : `ssh <username>@<pi-hostname-or-ip>`

## Étape 2 : brancher et monter le stockage externe
1. Branchez votre SSD ou disque dur externe en USB 3.0.
2. Identifiez le périphérique : `lsblk`
3. Formatez-le (s'il est neuf) et montez-le, p. ex. sur `/mnt/zcash-data`, avec une configuration `mkfs`/`fstab` standard afin qu'il soit monté automatiquement au redémarrage.

## Étape 3 : mettre à jour le système
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Étape 4 : installer et exécuter Zebra
### Option A — Docker (recommandée)
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
Cette commande installe un binaire `aarch64` précompilé, sans aucune compilation nécessaire.

**À propos du temps de synchronisation :** attendez-vous à ce que cela prenne un certain temps. Les durées de première synchronisation souvent citées (environ 2 heures) proviennent de matériel de référence plus puissant que le processeur d'un Pi 4 : votre temps de synchronisation réel sur un véritable Pi 4 sera donc probablement plus long.

## Étape 5 : installer Zallet
Zallet est actuellement en version **alpha** : attendez-vous à des changements incompatibles et ne le considérez pas encore comme une solution de conservation prête pour la production pour des fonds importants.

### Option A — Docker (recommandée)
```bash
docker pull zodlinc/zallet:latest
```
Cette image prend en charge ARM64 (via une compilation basée sur Nix) et s'exécute à partir d'un système de fichiers minimal, sans shell : transmettez explicitement les chemins de configuration et de données via `--datadir` et des montages de volumes (voir l'étape 6).

### Option B — Compiler à partir du code source
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Les crates de Zallet ne sont pas encore publiées sur crates.io pendant la phase alpha ; l'installation directe depuis le dépôt git est donc la méthode prise en charge en dehors de Docker.

## Étape 6 : configurer Zallet
Créez `zallet.toml` dans le répertoire de données de votre choix (p. ex. `/mnt/zcash-data/zallet`) :
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
Ajustez `validator_address` si Zebra s'exécute sur un autre hôte ou un autre port, et configurez `validator_cookie_auth`/`validator_user`/`validator_password` sous `[indexer]` pour qu'ils correspondent à votre configuration d'authentification RPC de Zebra.

**Vous migrez depuis zcashd ?** Si vous avez encore un ancien `zcash.conf` :
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Étape 7 : mettre en place le chiffrement du portefeuille
Zallet chiffre l'ensemble des clés à l'aide de `age`/`rage` :
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Cette commande affiche une clé publique et une phrase secrète générée automatiquement. **Conservez la phrase secrète : vous ne pourrez pas récupérer le fichier d'identité sans elle.**

## Étape 8 : initialiser et démarrer le portefeuille
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**N'exécutez `generate-mnemonic` qu'une seule fois**, sauf si vous souhaitez délibérément disposer de plusieurs racines de dépense indépendantes.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Étape 9 : migrer un portefeuille zcashd existant (facultatif)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Cette opération nécessite l'utilitaire `db_dump` (compilé avec Berkeley DB 6.2.23), issu d'une installation système ou d'une compilation locale de zcashd à partir du code source. Si zcashd n'est plus installé sur votre système, il s'agit de la seule étape de migration qui n'est pas encore entièrement autonome dans Zallet.

## Étape 10 : vérifier que tout fonctionne
```bash
zallet -d /mnt/zcash-data/zallet help
```
Vérifiez que le portefeuille répond puis, une fois la synchronisation de Zebra terminée, que les soldes et les adresses correspondent à ce que vous attendez.

## Dépannage
- **Problèmes de compilation ou d'exécution de Zebra sur ARM :** si vous compilez à partir du code source, installez la chaîne d'outils ARM de Rust. Selon la documentation de Zebra, exécuter des outils de compilation x86_64 sur du matériel ARM est sensiblement plus lent.
- **Stockage qui se remplit :** l'empreinte d'environ 300 Go de Zebra ne cesse de croître ; prévoyez de la marge.
- **Erreurs d'autorisation Docker :** déconnectez-vous puis reconnectez-vous après avoir ajouté votre utilisateur au groupe `docker`, ou utilisez `sudo` en attendant.
- **Le conteneur Zallet n'a pas de shell :** l'image officielle de `zodlinc/zallet` est construite à partir de zéro par conception ; transmettez toujours `--datadir` explicitement et montez votre répertoire de données en tant que volume.

## Remarques sur le matériel par rapport à l'ancien guide zcashd
Zebra et Zallet sollicitent généralement moins le processeur lors de l'installation que la compilation de zcashd, puisque vous exécutez des binaires ou des conteneurs précompilés. 4 Go de RAM constituent un point de départ raisonnable ; surveillez l'utilisation avec `htop` et envisagez la version 8 Go du Pi 4 si vous constatez une utilisation intensive de l'espace d'échange.

## Ressources supplémentaires
- [Zebra Book](https://zebra.zfnd.org) — documentation officielle de Zebra
- [Zallet Book](https://zcash.github.io/zallet/) — documentation officielle de Zallet
- [Avis de fin de support de zcashd](https://z.cash/support/zcashd-deprecation)

---

*Si ce guide vous a été utile, pensez à soutenir ZecHub : [insérer l'adresse protégée de don actuelle de ZecHub indiquée sur zechub.wiki/donation — non incluse ici, car je n'ai pas pu vérifier qu'elle est toujours d'actualité].*
