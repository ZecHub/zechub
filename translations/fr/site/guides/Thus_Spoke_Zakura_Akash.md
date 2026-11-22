# Ainsi parlait Zakura sur Akash (Regtest)

Exécutez la pile **Ainsi parlait Zakura v0.4.1** sur Akash : Zakura Regtest, lightwalletd, ainsi que le **tableau de bord / l'API HTTP** du portefeuille. Les pièces de test n'ont aucune valeur. N'envoyez pas ici de ZEC du mainnet.

Modèle : [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Projet source : [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura), tag **v0.4.1**

### Images

| Service | Image |
| --- | --- |
| Tableau de bord + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (version figée compilée dans le lanceur 0.4.1) |

### Auto-amorçage

Au premier démarrage, le conteneur `app` exécute `ths-server init` sur son volume persistant, puis `ths-server serve`. Le service réessaie jusqu'à ce que le JSON-RPC de Zakura et lightwalletd soient disponibles. Vous n'exécutez pas `ths` chez le fournisseur : le SDL fait office d'environnement d'exécution.

### Comment Akash publie les ports

Les `port` / `as` du SDL sont des ports du **conteneur**. L'application écoute sur le port **8080** (`THS_LISTEN`) ; lightwalletd sur le **9067** ; le RPC de Zakura sur le **18232** et le P2P sur le **18233**. À l'intérieur du déploiement, les services utilisent déjà ces ports (`http://zakura:18232`, `http://lightwalletd:9067`).

Ce **ne sont pas** les ports de l'adresse IP publique du fournisseur.

**Par défaut (ce modèle) :** pas d'adresse IP dédiée.

| Service | Écoute du conteneur | `as` du SDL | Apparence dans le bail |
| --- | --- | --- | --- |
| `app` (tableau de bord + API HTTP) | 8080 | 80 (HTTP) | Nom d'hôte d'ingress, souvent sur 80/443 — **ouvrez cette URI dans un navigateur** |
| `lightwalletd` | 9067 | 9067 (TCP, global) | `host:&lt;random-high-port&gt;` |
| RPC de `zakura` | 18232 | 18232 (TCP, global) | `host:&lt;random-high-port&gt;` |
| P2P de `zakura` | 18233 | 18233 (TCP, global) | `host:&lt;random-high-port&gt;` |

Une fois le bail prêt, **Leases → URIs** fait foi. Ouvrez l'URI **`app`** pour accéder au tableau de bord (la même interface que celle ouverte localement par `ths`). Dirigez les clients compacts vers l'URI **lightwalletd** (`THS_LIGHTWALLETD_TLS=false`). Ne saisissez pas `:8080`, `:80` ou `:9067` avec l'adresse IP du fournisseur, sauf si un bail avec adresse IP dédiée a rendu ces ports publics.

Les **adresses IP dédiées** (`endpoints` / `kind: ip`) sont une option payante et **ne font pas partie** de ce modèle. Elles permettent de fixer une adresse IP publique et parfois le port `as`. Laissez-les désactivées, sauf si vous en avez besoin.

### Quel site utiliser (paiements)

Le SDL est le même. Les deux interfaces web d'Akash diffèrent par **la manière dont vous payez**.

| Site | Paiements | Portefeuille |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Paiement web classique (carte / moyens de paiement en monnaie fiduciaire proposés par Console) | Compte Console |
| [air.akash.network](https://air.akash.network) | Paiements natifs sur la chaîne Akash (AKT / ACT) | **Keplr** |

Utilisez **Air** si vous souhaitez payer on-chain avec Keplr. Utilisez **Console** si vous souhaitez un parcours de paiement web classique.

### Déployer

**Paiements web (Console)**

[![Déployer sur Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Paiements natifs Akash avec Keplr (Air)**

[Ouvrir ce modèle sur Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Créez le déploiement à partir du modèle, acceptez une offre, attendez que les journaux de `app` montrent que `ths-server serve` reste actif, puis ouvrez l'**URI `app`** pour accéder au tableau de bord.

### Voir aussi

- [Zakura sur Akash](/guides/akash-network-zakura) — nœud validateur Mainnet/Testnet
- [Zebra sur Akash](/guides/akash-network-zebra)
- Livre : [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
