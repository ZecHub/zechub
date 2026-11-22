<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Zcash Stack : exécuter un serveur de portefeuille léger sur Kubernetes ou Docker

[Zcash Stack](https://github.com/zecrocks/zcash-stack) est le kit de déploiement open source de l’équipe à l’origine de zec.rocks. Il regroupe un nœud complet Zcash, un serveur de portefeuille léger et des services facultatifs (Zaino, un explorateur de blocs, un service caché Tor, un serveur DNS, zecd, un proxy gRPC-web pour les portefeuilles dans le navigateur) dans un chart Helm pour Kubernetes et dans des fichiers Compose Docker. Tous les serveurs zec.rocks lightwalletd sont exécutés à partir de ce chart. Le projet est financé par [Zcash Community Grants](https://zcashcommunitygrants.org/).

Cette page résume ce que le kit déploie, ce dont vous avez besoin avant de l’installer et les paramètres les plus importants. Elle correspond à la version **0.4.9** du chart (publiée le 13 novembre 2026). Le [fichier README du chart](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) et les [notes de l’atelier](https://github.com/zecrocks/zcash-stack/tree/main/docs) du projet font référence ; lisez-les avant toute mise en production.

## En bref

- **Deux façons de procéder.** Un chart Helm pour Kubernetes (k3s sur votre propre matériel NVMe est la cible principale ; GKE Standard et Autopilot fonctionnent également) et des fichiers Compose Docker pour une seule machine. L’atelier recommande Docker si vous débutez dans l’exécution de serveurs et Kubernetes si vous gérez déjà des flottes.
- **Un nœud de chaîne et un serveur de portefeuille léger.** La configuration recommandée est Zebra + lightwalletd. Zakura peut remplacer Zebra comme backend, et Zaino peut remplacer lightwalletd ou fonctionner à ses côtés.
- **Prévoyez environ 600 Gio d’espace disque.** L’état de la chaîne de Zebra occupait environ 260 Gio en juin 2026 et continue de croître ; le cache du portefeuille léger ajoute environ 17 Gio. Une synchronisation complète prend plusieurs jours, le chart peut donc restaurer les données à partir d’un instantané publié.
- **Le chart fixe les versions des images.** Dans la version 0.4.9, il s’agit de Zebra 7.0.0 (qui suit NU7), lightwalletd v0.6.1, Zakura 1.8.6 et Zaino 0.8.0. Mettez le chart à jour avant les mises à niveau du réseau et avant que la version Zakura n’atteigne sa hauteur de fin de prise en charge.
- **Enregistrez votre serveur.** Les opérateurs publics peuvent ajouter leur serveur au [moniteur hosh.zec.rocks](https://hosh.zec.rocks/zec) afin que les portefeuilles et les utilisateurs puissent vérifier s’il est en ligne.

## Éléments déployés

Chaque composant est contrôlé par un paramètre dans le [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) du chart. Seul lightwalletd est activé par défaut et il nécessite un nœud de chaîne ; les fichiers d’exemple activent donc aussi Zebra.

| Composant | Image dans le chart 0.4.9 | Par défaut | Fonction |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | désactivé (activé dans les exemples) | Nœud complet ; valide la chaîne et fournit un accès RPC à tous les autres composants |
| Zakura | `zakuracore/zakura:1.8.6` | désactivé | Fork de Zebra ; backend de remplacement pour lightwalletd ou Zaino, à la place de Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | activé | Serveur de portefeuille léger (gRPC) pour les portefeuilles mobiles et de bureau |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | désactivé | Indexeur Rust qui fournit aussi un service aux portefeuilles légers |
| Explorateur de blocs | `emersonian/zcash-explorer:v0.0.6` | désactivé | Explorateur Web qui lit le JSON-RPC du nœud (Zaino ne peut pas le remplacer : il fournit uniquement gRPC) |
| Tor | `osminogin/tor-simple:0.4.9.16` | désactivé | Publie lightwalletd ou Zaino sous forme de service `.onion` |
| Serveur DNS | `zfnd/dnsseeder:v1.8.0` | désactivé | Aide les nouveaux nœuds à trouver des pairs |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | désactivé | Serveur de portefeuille privilégiant les adresses protégées (voir [zecd](/zcash-tech/zecd)) |
| Proxy gRPC-web | `envoyproxy/envoy:v1.40.2` | désactivé | Permet aux portefeuilles dans le navigateur de communiquer avec lightwalletd, inaccessible aux navigateurs en gRPC brut |
| Portefeuille WebZjs | `ghcr.io/zecrocks/webzjs-wallet` | désactivé | Portefeuille dans le navigateur ; nécessite le proxy gRPC-web sur le même hôte |

Deux remarques sur les versions. La version amont de Zaino est [0.10.1](https://github.com/zingolabs/zaino/releases), alors que le chart fournit toujours l’image 0.8.0 ; consultez `values.yaml` avant de vous fier aux comportements plus récents de Zaino. Par ailleurs, les nœuds Zakura s’arrêtent sur Mainnet à une hauteur de fin de prise en charge propre à chaque version : pour la version 1.8.6, il s’agit du bloc 3 643 309, vers le 5 décembre 2026, et les versions x86-64 depuis la version 1.8.0 refusent de démarrer sur les processeurs sans BMI2 et ADX. La page [Zakura Node](/zcash-tech/zakura-node) traite de ces deux sujets.

## Kubernetes : avant l’installation

Le chart s’appuie sur trois éléments que vous configurez une fois par cluster.

1. **Un contrôleur d’entrée.** Le chart crée une ressource Kubernetes `Ingress` standard et utilise par défaut la classe `nginx` ; ingress-nginx est recommandé, car il gère gRPC de la même façon sur k3s et GKE. Sur k3s, installez k3s avec `--disable traefik` ou conservez Traefik et définissez `ingress.className: traefik` et `ingress.backendProtocol: GRPC` (le chart génère alors un objet Traefik `IngressRoute`, car une ressource Ingress ordinaire via Traefik renvoie une erreur HTTP 500 avec gRPC). Sur GKE, la classe d’entrée intégrée `gce` ne peut pas acheminer gRPC vers lightwalletd ou Zaino.
2. **cert-manager et un ClusterIssuer** pour obtenir automatiquement des certificats Let's Encrypt (`examples/cluster-issuer.yaml` ; commencez par tester avec l’émetteur de préproduction). Sur GKE Autopilot, installez cert-manager avec `--set global.leaderElection.namespace=cert-manager`, sinon la création de l’émetteur échoue avec une erreur x509 « autorité inconnue ». Vous pouvez vous passer de cert-manager et indiquer votre propre certificat à `<service>.ingress.tls.secretName`.
3. **Un StorageClass.** `local-path` convient sur k3s avec NVMe. Sur GKE, attribuez à Zebra une classe IOPS provisionnée (le dépôt fournit un exemple Hyperdisk) et augmentez d’abord le quota de disques régionaux : les nouveaux projets GKE n’autorisent que 500 Go de SSD et 500 Go d’Hyperdisk par région, tandis qu’un nœud de chaîne nécessite 300 à 500 Go. Sinon, le volume reste bloqué dans `Pending` avec `QUOTA_EXCEEDED`. Il est impossible de modifier `storageClassName` sur un StatefulSet existant sans recréer le volume.

Configurez ensuite un enregistrement DNS pour chaque nom d’hôte, qui pointe vers l’adresse IP externe du contrôleur d’entrée. Si vous n’avez pas encore de DNS, ajoutez un nom [sslip.io](https://sslip.io), comme `203-0-113-7.sslip.io`, à côté de votre véritable nom d’hôte : il renvoie l’adresse IP intégrée, ce qui permet d’émettre immédiatement un certificat. Pour les serveurs permanents, utilisez votre propre nom d’hôte comme nom principal.

## Kubernetes : installation

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

L’exemple [`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) active Zebra, connecte lightwalletd à celui-ci, attribue à lightwalletd un cache de 40 Gio et une entrée TLS, et garde le RPC du nœud à l’intérieur du cluster. Remplacez le nom d’utilisateur et le mot de passe RPC fictifs avant l’installation. D’autres exemples couvrent testnet, GKE, GKE Autopilot avec haute disponibilité, un service caché Tor et la configuration de départ avec sslip.io.

Pour effectuer une mise à niveau, exécutez `helm repo update`, prévisualisez la modification avec le plug-in helm-diff (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`), puis `helm upgrade` avec les mêmes arguments. Si vous utilisez un chart de la série 0.0.x, lisez d’abord [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md) : la version 0.1.0 a remplacé l’ancienne configuration Traefik par Ingress standard et cert-manager, et la structure des valeurs a changé.

## Dimensionnement

| | En régime stable | Synchronisation initiale | Disque |
|:--|:--|:--|:--|
| Zebra | Environ 0,1 vCPU, 1,6 Gio | Gourmande en CPU, IOPS et mémoire | Environ 260 Gio (juin 2026) et en croissance ; valeur par défaut du chart : 500 Gio |
| lightwalletd | Environ 0,15 vCPU, 165 Mio | Construit son cache bloc par bloc | Environ 17 Gio ; valeur par défaut du chart : 40 Gio |

L’ensemble de la pile demande environ 1,5 vCPU et 4,5 Gio de mémoire. Pour une seule machine, le chart recommande 8 vCPU, 32 Gio de RAM et environ 1 To de NVMe (sur GKE, une instance `n2-standard-8` avec un volume Hyperdisk ou pd-ssd de 500 Gio). Les demandes par défaut respectent déjà les minimums de GKE Autopilot, et les limites CPU sont désactivées afin que la synchronisation puisse utiliser davantage de ressources par moments.

## Paramètres à connaître

**Restauration d’un instantané.** Définissez `<chain>.initSnapshot.enabled: true` (avec `initSnapshot.url`, `gs://` ou `https://`) pour démarrer à partir d’un instantané publié au lieu de synchroniser depuis le bloc de genèse. La restauration indique sa progression, reprend proprement après une interruption et n’efface jamais un volume sain provenant d’une installation antérieure. Un instantané constitue un raccourci fondé sur la confiance : les blocs suivants restent validés, et un instantané incorrect se manifeste par des blocs qui échouent à la validation. Selon l’atelier, une synchronisation complète prend environ 10 jours, contre environ 10 heures pour démarrer à partir d’un instantané.

**Mise à l’échelle et absence d’interruption.** lightwalletd et Zaino sont des caches légers placés devant le nœud ; exécutez donc `replicas: 2` pour effectuer des mises à jour progressives sans interruption (un PodDisruptionBudget est ajouté automatiquement lorsque le nombre de réplicas dépasse 1). Les nœuds de chaîne ne sont pas conçus pour répartir la charge : chaque réplica est un nœud complet supplémentaire, avec son propre volume et sa propre synchronisation. N’en exécutez qu’un, ou deux pour la redondance.

**Pairs entrants.** Par défaut, Zebra n’établit que des connexions sortantes. `zebra.p2pPublic.enabled: true` accepte les pairs entrants sur le port 8233 (18233 sur testnet) et annonce votre adresse. Choisissez `externalAddrFrom: hostIP` sur du matériel physique et k3s, `nodeExternalIP` dans les environnements cloud où l’adresse IP du nœud est privée, ou `loadBalancer` avec une adresse IP statique réservée sur GKE Autopilot.

**TLS et gRPC.** TLS se termine au niveau de l’entrée et HTTP/2 non chiffré circule à l’intérieur du cluster ; plusieurs noms d’hôte peuvent donc pointer vers un seul lightwalletd. Conservez `path: /` avec `pathType: Prefix`, car les chemins des méthodes gRPC en ont besoin. Si le premier certificat échoue à cause de la redirection HTTPS, émettez-le avec l’émetteur de préproduction ou définissez temporairement `ingress.tls.sslRedirect: "false"`.

**Service caché Tor.** Utile si votre cluster n’a ni adresse IP publique ni nom de domaine :

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Récupérez l’adresse avec `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` et testez-la au moyen d’un client Tor local avec [zecping](https://github.com/zecrocks/zecping) : `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**Lors des mises à niveau du réseau.** Zebra peut bannir les pairs qui utilisent encore d’anciennes versions et se bloquer, en consignant que les mises à jour de la chaîne sont bloquées. Sa liste de bannissement est conservée en mémoire ; `kubectl delete pod zebra-0` la vide. Le pod redémarre avec les mêmes données de chaîne, sans nouvelle synchronisation.

## Docker Compose

Pour une seule machine, clonez le dépôt et démarrez le fichier par défaut depuis le dossier `docker/` :

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml` exécute Zebra, lightwalletd et [Watchtower](https://containrrr.dev/watchtower/) sur x86 ; `compose.arm.yaml` fait de même sur les hôtes ARM. Watchtower récupère automatiquement les nouvelles images, et le fichier par défaut utilise l’étiquette `zfnd/zebra:latest`, de sorte que le nœud adopte les nouvelles versions Zebra sans mise à niveau manuelle. `compose.zaino.yaml` remplace lightwalletd par Zaino, mais fixe une ancienne image communautaire (`emersonian/zcash-zaino:0.1.2-zr4`) ; vérifiez-la avant de l’utiliser. D’autres fichiers ajoutent une interface TLS Caddy, un proxy VPS et un tunnel autossh pour les nœuds installés chez vous.

Définissez `LIGHTWALLETD_DONATION_ADDRESS` dans le fichier `.env` avec votre propre adresse unifiée pour la publier comme adresse de don du serveur. L’exécution de `./download-snapshot.sh` depuis le dossier `docker/` avant le premier `docker compose up` télécharge un instantané de la chaîne au lieu d’effectuer une synchronisation complète.

## Connexion et surveillance

Le deuxième cours de l’atelier explique comment rendre le serveur accessible : avec une adresse IP statique publique, en masquant l’adresse IP de votre domicile derrière un tunnel SSH vers un VPS ou Tailscale Funnel, ou en exécutant un serveur accessible uniquement via Tor. Testez le résultat en configurant un portefeuille pour qu’il s’y connecte (dans ZODL, Paramètres avancés ; voir [Modifier le serveur dans votre portefeuille](/zcash-tech/lightwallet-nodes)) ou en appelant `GetLightdInfo` avec un client gRPC.

Pour la surveillance, le troisième cours présente les commandes Docker à exécuter manuellement et recommande d’enregistrer tout serveur public auprès de [hosh](https://hosh.zec.rocks/zec), le moniteur de disponibilité zec.rocks. Pour l’inscription, envoyez une pull request qui ajoute votre nom d’hôte et votre port à la liste de serveurs de hosh. Vous pouvez obtenir de l’aide à chaque étape sur le [zec.rocksforum des ateliers](https://workshops.zec.rocks).

## Erreurs fréquentes

**Installer lightwalletd sans nœud de chaîne.** lightwalletd lit les données depuis Zebra (ou Zakura). Activez l’un d’eux ou démarrez avec un fichier d’exemple qui le fait.

**Conserver les identifiants RPC fictifs des exemples.** Les exemples contiennent des valeurs fictives. Le RPC reste à l’intérieur du cluster, mais remplacez-les tout de même.

**Exécuter un nœud de chaîne avec le quota de disque par défaut de GKE.** Le volume ne sera jamais lié. Augmentez le quota régional avant l’installation.

**Augmenter le nombre de réplicas de Zebra pour répartir la charge.** Chaque réplica de Zebra lance une synchronisation complète supplémentaire. Augmentez plutôt le nombre de réplicas de lightwalletd ou Zaino.

**Conserver un ancien chart lors d’une mise à niveau du réseau.** Un nœud antérieur à une mise à niveau cesse de suivre Mainnet après celle-ci (Zebra nécessite la version 7.0.0 ou ultérieure depuis NU7). Exécutez `helm repo update` et mettez le chart à niveau avant les hauteurs d’activation et les hauteurs de fin de prise en charge de Zakura.

## Pages associées

- [Zcash Nœuds de portefeuille léger](/zcash-tech/lightwallet-nodes) : ce qu’un serveur de portefeuille léger peut voir ou non, et les serveurs publics.
- [Zebra Nœud complet](/zcash-tech/zebra-full-node) : le validateur exécuté par cette pile.
- [Zakura Nœud](/zcash-tech/zakura-node) : le fork Zebra que le chart peut exécuter à la place.
- [Zaino](/zcash-tech/zaino) : l’indexeur Rust.
- [zecd](/zcash-tech/zecd) : le serveur de portefeuille que le chart peut ajouter.
- [Zcash RPC et indexation du nœud](/guides/zcash-node-rpc-and-indexing) : RPC Zebra, Zallet et indexeurs.
- [Comment exécuter Zebra sur le réseau Akash Network](/guides/akash-network-zebra) : une autre façon d’héberger un nœud.

## Ressources

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (dépôt, versions et exemples)
- [Zcash Stack Fichier README du chart Helm](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Notes de l’atelier : synchroniser, connecter, observer](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker Fichier README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Fiche Artifact Hub](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (moniteur public des serveurs)

**Dernière mise à jour :** novembre 2026 (chart 0.4.9)
