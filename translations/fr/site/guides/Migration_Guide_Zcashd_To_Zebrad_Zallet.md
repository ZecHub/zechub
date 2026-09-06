# Guide de migration : de zcashd vers Zebrad/Zallet

Le nœud complet zcashd traditionnel, maintenu par *Electric Coin Company (ECC)* / *Zodl*, a été remplacé par Zebra et Zallet. zcashd a atteint son arrêt de fin de support le 18 juillet 2026 et ne fonctionne plus.

- Zebra est une implémentation moderne en Rust du protocole Zcash développée par la Zcash Foundation
- Zallet est un wallet léger conçu pour s'interfacer de manière transparente avec les nœuds Zebra, développé par Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Schéma : zcashd se scindant en zebrad pour les fonctions de nœud et Zallet pour les fonctions de wallet](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Ce guide vous accompagne dans la migration de **Zcashd** vers **Zebrad** et **Zallet**, y compris l'installation, l'importation du wallet et le dépannage des problèmes de migration courants.

---

## zcashd a cessé de fonctionner le 18 juillet 2026

**Ce que cela signifie**

- zcashd a atteint son arrêt de fin de support le 18 juillet 2026. Il ne se synchronisera plus avec le sommet de la chaîne et ne peut ni envoyer ni recevoir de fonds. C'est terminé, et non prévu.
- Les deux fonctions de zcashd sont désormais séparées : **zebrad** est le nœud complet et **Zallet** est le wallet.
- Zallet est en **bêta**. Des changements incompatibles peuvent survenir entre les versions, et certaines méthodes JSON-RPC de zcashd ne sont pas encore implémentées. Consultez la [matrice d'état des méthodes](https://zcash.github.io/zallet/) avant de dépendre d'un appel particulier.
- Si vous détenez encore des fonds **Sprout**, lisez d'abord l'avertissement de l'étape 6. Zallet ne prend pas en charge le pool Sprout, et la méthode habituelle pour déplacer ces fonds nécessitait un zcashd en cours d'exécution.

**Pourquoi migrer — au-delà de la dépréciation**

Même sans tenir compte de la dépréciation, il existe de solides raisons de migrer :
- Sécurité et robustesse : la sûreté mémoire de Rust et les outils modernes réduisent les risques de vulnérabilités.
- Performances et efficacité : Zebrad est conçu pour le parallélisme, une utilisation plus efficace des ressources et une synchronisation plus rapide.
- Architecture modulaire : séparer la logique du nœud (Zebrad) de l'interface du wallet (Zallet) offre des limites plus claires et de meilleures possibilités de mise à niveau.
- Compatibilité avec l'écosystème futur : les outils, améliorations et le reste de l'écosystème Zcash cibleront de plus en plus Zebrad/Zallet.
- Tranquillité d'esprit : évitez de rester bloqué avec un composant déprécié et non pris en charge.

### Passons maintenant au guide de migration

**1. Sauvegardez tout**
* Sauvegardez votre wallet.dat (ou tout autre fichier de wallet / magasin de clés) depuis votre nœud zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Enregistrez votre zcash.conf ainsi que tous les paramètres personnalisés.
* Exportez une copie de tous les scripts RPC ou automatisations que vous utilisez.
* Vérifiez que vos sauvegardes sont valides (par exemple, essayez de les ouvrir ou de les inspecter dans un autre environnement).
* Examinez les méthodes JSON-RPC dont vous dépendez actuellement.
* Comparez-les au tableau de compatibilité prévu maintenu sur le [site d'assistance Zcash](https://z.cash/support/zcashd-deprecation/) 
* Préparez-vous aux changements ou aux méthodes manquantes (certaines peuvent nécessiter une solution de contournement ou une adaptation).

**2. Configuration requise et espace disque**
* L'espace disque est le besoin que les gens sous-estiment. La chaîne Zcash a dépassé **270 Go** en août 2026 ; prévoyez donc au moins **300 Go** d'espace libre, sur un SSD si possible.
* Assurez-vous que votre machine dispose d'un réseau, d'un processeur et d'une mémoire RAM stables.
* Une connexion Internet 
* Si vous prévoyez de compiler depuis les sources, installez Rust et Cargo.

**3. Installer / configurer Zebrad**
Vous pouvez soit télécharger un binaire précompilé, soit compiler depuis les sources.
* La Zcash Foundation publie des versions et des binaires pour Zebra. Par exemple, vous pouvez utiliser un script d'installation ou télécharger le binaire adapté à votre système d'exploitation.

* Notez que dans les versions récentes de Zebra, [le point de terminaison RPC n'est plus activé par défaut dans Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Option A : installation via un binaire précompilé**  
Sous **Linux**/**macOS** :

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Cela installe la dernière version stable de zebrad.

**Option B : compiler depuis les sources**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Après la compilation, déplacez le binaire dans votre chemin :

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Configuration et lancement**  
Générez une configuration par défaut :

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Modifiez **zebrad.toml** selon vos préférences (adresse d'écoute, ports, répertoire d'état, mise en cache).

**Démarrer le nœud :**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Le nœud commencera la synchronisation depuis le bloc genesis ; comptez plusieurs heures (ou plus) selon le matériel et le réseau.

**5. Installer / configurer Zallet (wallet)**

Zallet est conçu pour remplacer la partie wallet de zcashd.

Consultez la page GitHub / des versions de Zallet pour les binaires.

**Ou compiler depuis les sources :**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Lancez l'interface graphique ou la CLI (selon votre installation).
* Configurez-la pour se connecter à votre nœud Zebrad local via un point de terminaison RPC ou API.

**6. Importer votre wallet zcashd dans Zallet**

Vous n'avez pas besoin d'un zcashd en cours d'exécution pour cela. Zallet lit directement le fichier `wallet.dat`, ce qui est important car zcashd ne peut plus être démarré.

> **Conservez `wallet.dat`.** La migration signale tout ce qu'elle ne peut pas représenter dans un wallet Zallet au lieu de l'importer, et ce matériel de clé n'existe alors que dans `wallet.dat`. Ne le supprimez pas après la migration.

Exécutez d'abord `zallet init-wallet-encryption`. Zallet chiffre le matériel de clé vers une identité age, et cette identité doit exister avant l'importation de clés.

Convertissez ensuite votre configuration et votre wallet :

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` n'est présent que dans les builds disposant de la fonctionnalité `zcashd-import`, et la lecture de `wallet.dat` nécessite l'utilitaire `db_dump` de Berkeley DB 6.2, la version utilisée par zcashd. Si vous avez plus d'un fichier de wallet, exécutez la commande une fois par fichier et ajoutez `--allow-multiple-wallet-imports` lors des exécutions suivantes ; chacun devient son propre ensemble de comptes. Vos `rpcuser` et `rpcpassword` ne sont pas transférés, car le JSON-RPC de Zallet utilise par défaut l'authentification par cookie ; ajoutez des identifiants avec `zallet add-rpc-user` si vous en avez besoin.

**Ce qui est transféré**

* Les graines mnémoniques et les clés qui en sont dérivées, avec des comptes reconstruits pour correspondre au wallet zcashd
* Les clés de dépense Sapling importées séparément et les clés transparentes
* Les entrées transparentes en lecture seule comprenant leur clé publique ou leur script de rachat
* Les anniversaires des comptes, afin que l'analyse de la chaîne commence à la bonne hauteur

**Ce qui n'est pas transféré.** Ces éléments sont signalés avec un décompte plutôt qu'importés :

* **Clés de dépense et fonds Sprout.** Zallet ne prend pas en charge le pool Sprout. La méthode documentée consistait à déplacer les fonds Sprout en utilisant zcashd avant son retrait, et cela n'est désormais plus possible. Si cela vous concerne, demandez conseil sur le [Discord Zcash R&D](https://discord.gg/xpzPR53xtU) ou le [forum communautaire](https://forum.zcashcommunity.com/) avant toute autre action.
* Les entrées du carnet d'adresses
* Les entrées en lecture seule stockées sans clé publique ou script de rachat, ainsi que les entrées avec des clés publiques non compressées
* Les wallets Regtest

**Sauvegarde après la migration.** Une phrase mnémonique seule n'est pas une sauvegarde complète, car les clés importées n'existent que dans la base de données du wallet. Conservez des copies sécurisées de `wallet.db`, du fichier d'identité de chiffrement age nommé par l'option `keystore.encryption_identity`, de votre phrase mnémonique, ainsi que du `wallet.dat` d'origine. Notez que `wallet.db` n'est pas lui-même chiffré : il contient votre historique de transactions et vos clés de visualisation en clair ; stockez donc la sauvegarde dans un endroit sûr.

**Nouvelle analyse et synchronisation du wallet**

* Une fois les clés importées, Zallet déclenchera une nouvelle analyse de la chaîne via Zebrad.
* Laissez à Zallet le temps de reconstruire votre solde et votre historique de transactions.

**7. Vérifier les soldes et la synchronisation**

Une fois importé, Zallet se connectera à votre nœud Zebrad et analysera de nouveau la blockchain.
Lorsque la synchronisation est terminée, vos soldes et transactions devraient apparaître exactement comme auparavant.

Vous pouvez vérifier l'état de synchronisation de votre nœud en exécutant :

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Ou consultez les journaux.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Dépannage**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Problème</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Cause possible</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Solution</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad ne démarre pas</td>
        <td className="px-6 py-4">Port utilisé ou mauvaise configuration</td>
        <td className="px-6 py-4">Vérifiez **zebrad.toml** et utilisez un port libre</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Synchronisation lente</td>
        <td className="px-6 py-4">Congestion réseau</td>
        <td className="px-6 py-4">Assurez-vous que la connexion Internet est stable, puis redémarrez Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Transactions manquantes dans le wallet</td>
        <td className="px-6 py-4">Importation partielle des clés</td>
        <td className="px-6 py-4">Importez de nouveau les clés ou relancez l'analyse dans Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet ne peut pas se connecter au nœud</td>
        <td className="px-6 py-4">Nœud non exécuté ou point de terminaison incorrect</td>
        <td className="px-6 py-4">Démarrez Zebrad et vérifiez que le port RPC est correct</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet plante</td>
        <td className="px-6 py-4">Build obsolète</td>
        <td className="px-6 py-4">Mettez à jour vers la dernière version depuis GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Conclusion**

Migrer de zcashd vers Zebrad et Zallet vous offre une expérience Zcash plus rapide, plus sûre et plus moderne.
Grâce à la sécurité fondée sur Rust, à une conception modulaire et à de meilleurs outils, cette configuration garantit que votre nœud et votre wallet resteront prêts pour l'avenir à mesure que l'écosystème Zcash continue d'évoluer.

Conseil : conservez les clés de votre wallet hors ligne et sauvegardez régulièrement vos données Zallet.
Consultez [zebra.zfnd.org](https://zebra.zfnd.org) pour Zebra, ainsi que [The Zallet Book](https://zcash.github.io/zallet/) ou le [dépôt Zallet](https://github.com/zcash/zallet) pour Zallet. Le chapitre [Migrer depuis zcashd](https://zcash.github.io/zallet/) de The Zallet Book est la référence faisant autorité pour l'étape 6.
