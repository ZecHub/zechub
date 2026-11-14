# Comment exécuter Zakura sur Akash Network

Guide pas à pas pour déployer un nœud complet **Zakura** Zcash à l'aide du modèle [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Zakura est un nœud Zcash compatible avec le consensus (dérivé de Zebra), qui offre une synchronisation plus rapide, un élagage natif et un amorçage par instantané. Ce modèle épingle **`zakuracore/zakura:1.8.1`** (épinglé par empreinte ; n'utilisez pas `:latest` ni `1.1.1`).

### Ce que vous obtenez

- P2P sur le réseau principal : conteneur **8233**, publié globalement (voir le mappage des ports ci-dessous)
- État élagué persistant (64 Gio par défaut) avec amorçage par instantané Valar au premier démarrage
- Prometheus **9999** et contrôle de santé **8080** (internes, sans URI publique)
- JSON-RPC **8232** interne pour **lightwalletd** colocalisé ; LWD écoute sur le conteneur **9067** et est publié globalement

Options de fonctionnalités dans le SDL (true/false) : `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. L'authentification par cookie est désactivée lorsque lightwalletd est activé, car lightwalletd ne peut pas lire les fichiers de cookie.

### Quel site utiliser (paiements)

Le SDL est le même. Les deux interfaces web d'Akash diffèrent par **la manière dont vous payez**.

| Site | Paiements | Portefeuille |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Paiement web classique (carte / moyens fiat proposés par Console) | Compte Console |
| [air.akash.network](https://air.akash.network) | Paiements natifs sur la chaîne Akash (AKT / ACT) | **Keplr** |

Utilisez **Air** si vous souhaitez payer on-chain avec Keplr. Utilisez **Console** si vous souhaitez un parcours de paiement web conventionnel. Ne vous attendez pas à un règlement natif via Keplr sur Console.

### Déployer

**Paiements web (Console)**

[![Déployer sur Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Paiements Akash natifs avec Keplr (Air)**

[Ouvrir ce modèle sur Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Ouvrez le lien correspondant ci-dessus (Console ou Air).
2. Sur Air, connectez **Keplr** et vérifiez que vous disposez d'AKT/ACT pour le dépôt et la location. Sur Console, effectuez le paiement web proposé par l'interface.
3. Chargez `zcash-zakura/deploy.yaml` s'il n'est pas déjà renseigné.
4. Effectuez le dépôt, acceptez une offre et attendez la location.
5. Les journaux doivent afficher le téléchargement de l'instantané (premier démarrage), puis `zakurad start`.
6. Ouvrez **Leases → URIs**. Utilisez l'hôte:port attribué par le fournisseur, et non 8233 ou 9067 sur l'IP publique.

### Comment Akash publie les ports

Les `port` / `as` du SDL (8233, 9067, 8232) sont des ports de **conteneur**. Zakura écoute toujours sur 8233 ; lightwalletd sur 9067 ; le RPC sur 8232 pour le sidecar LWD (`zakura:8232`).

Ce ne sont **pas** les ports de l'IP publique du fournisseur.

**Par défaut (ce modèle) :** pas d'IP dédiée. Chaque exposition TCP `global: true` est mappée vers un **port élevé aléatoire** sur un hôte partagé du fournisseur. Console/Air les listent comme URI de location, par exemple :

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Les pairs se connectent à l'URI **8233** (`provider.example:31482`). Les portefeuilles compacts utilisent l'URI **9067** (TLS désactivé, sauf si vous terminez TLS vous-même). Définissez `ZAKURA_NETWORK__EXTERNAL_ADDR` sur l'URI P2P mappée, et non sur `:8233`.

Les expositions **internes** (RPC `8232`, métriques `9999`, contrôle de santé `8080`) restent sur le réseau du déploiement. Aucune URI publique.

Les **IP dédiées** (`endpoints` / `kind: ip`) sont une option payante et ne font **pas** partie de ce modèle. Elles permettent d'épingler une IP publique et parfois le port `as`. N'ajoutez cette option que si vous avez besoin d'un `host:8233` stable.

### Archive ou élagué

Le mode par défaut est **élagué** (instantané d'environ 11 Gio, disque de 64 Gio). Pour l'historique complet, définissez `SNAPSHOT_KIND=archive`, augmentez le disque à 350 Gio ou plus et définissez `ZAKURA_STATE__STORAGE_MODE=archive`.

### Voir aussi

- [Zebra sur Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (historique complet, sans instantané)
- [Ainsi parlait Zakura sur Akash](/guides/thus-spoke-zakura-akash) — Tableau de bord Regtest + application (v0.4.1)
- Source de Zakura : [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Instantanés : [zakura.com/snapshots/](https://zakura.com/snapshots/)
