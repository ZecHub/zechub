# Guide de migration : de zcashd à Zebrad/Zallet

Le nœud complet zcashd traditionnel, maintenu par *Electric Coin Company (ECC)* / *Zodl*, a été remplacé par Zebra et Zallet. zcashd a atteint son arrêt de fin de support le 18 juillet 2026 et ne fonctionne plus.

- Zebra est une implémentation moderne en Rust du protocole Zcash, développée par la Zcash Foundation
- Zallet est un portefeuille léger conçu pour s'interfacer de manière fluide avec les nœuds Zebra, développé par Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagramme : zcashd se divise en zebrad pour les fonctions de nœud et en Zallet pour les fonctions de portefeuille](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Ce guide vous accompagne dans la migration de **zcashd** vers **Zebrad** et **Zallet**, y compris l'installation, l'importation du portefeuille et la résolution des problèmes de migration courants.

---

## zcashd a cessé de fonctionner le 18 juillet 2026

**Ce que cela signifie**

- zcashd a atteint son arrêt de fin de support le 18 juillet 2026. Il ne se synchronisera plus jamais jusqu'à la pointe de la chaîne et ne peut ni envoyer ni recevoir de fonds. C'est un fait accompli, pas un projet.
- Les deux fonctions de zcashd sont désormais séparées : **zebrad** est le nœud complet et **Zallet** est le portefeuille.
- Zallet est en **bêta**. Des changements incompatibles peuvent survenir d'une version à l'autre, et certaines méthodes JSON-RPC de zcashd ne sont pas encore implémentées. Consultez la [matrice d'état des méthodes](https://zcash.github.io/zallet/) avant de dépendre d'un appel précis.
- Si vous détenez encore des fonds **Sprout**, lisez d'abord l'avertissement de l'étape 6. Zallet ne prend pas en charge le pool Sprout, et la méthode habituelle pour déplacer ces fonds nécessitait un zcashd en fonctionnement.

**Pourquoi migrer, au-delà de l'obsolescence**

Même en mettant l'obsolescence de côté, il existe de bonnes raisons de migrer :
- Sécurité et robustesse : la sûreté mémoire de Rust et ses outils modernes réduisent les risques de vulnérabilités.
- Performance et efficacité : Zebrad est conçu pour le parallélisme, une utilisation plus efficace des ressources et une synchronisation plus rapide.
- Architecture modulaire : séparer la logique du nœud (Zebrad) de l'interface du portefeuille (Zallet) offre des frontières plus claires et de meilleures voies de mise à niveau.
- Compatibilité avec l'écosystème futur : les outils, les améliorations et le reste de l'écosystème Zcash cibleront de plus en plus Zebrad/Zallet.
- Tranquillité d'esprit : évitez de rester coincé avec un composant obsolète et non pris en charge.

### Passons maintenant au guide de migration

**1. Sauvegardez tout**
* Sauvegardez votre wallet.dat (ou tout autre fichier de portefeuille ou magasin de clés) de votre nœud zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Enregistrez votre zcash.conf et tous vos paramètres personnalisés.
* Exportez une copie de tous les scripts RPC ou automatisations que vous utilisez.
* Vérifiez que vos sauvegardes sont valides (p. ex. essayez de les ouvrir ou de les inspecter dans un autre environnement).
* Passez en revue les méthodes JSON-RPC sur lesquelles vous vous appuyez actuellement.
* Comparez-les au tableau de compatibilité prévu, tenu à jour sur le [site d'assistance de Zcash](https://z.cash/support/zcashd-deprecation/) 
* Préparez-vous à des changements ou à des méthodes manquantes (certaines peuvent nécessiter une solution de contournement ou une adaptation).

**2. Configuration requise et espace disque**
* L'espace disque est l'exigence que l'on sous-estime le plus. La chaîne Zcash a dépassé **270 Go** en août 2026 ; prévoyez donc au moins **300 Go** d'espace libre, sur un SSD si possible.
* Assurez-vous que votre machine dispose d'un réseau, d'un processeur et d'une mémoire vive stables.
* Une connexion Internet 
* Si vous prévoyez de compiler à partir des sources, installez Rust et Cargo.

**3. Installer et configurer Zebrad**
Vous pouvez soit télécharger un binaire précompilé, soit compiler à partir des sources.
* La Zcash Foundation publie des versions et des binaires de Zebra. Vous pouvez p. ex. utiliser un script d'installation ou télécharger le binaire adapté à votre système d'exploitation.

* Notez que dans les versions récentes de Zebra, [le point de terminaison RPC n'est plus activé par défaut dans Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Option A : installation via un binaire précompilé**  
Sous **Linux**/**macOS** :

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Cela installe la dernière version stable de zebrad.

**Option B : compilation à partir des sources**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Après la compilation, déplacez le binaire dans votre PATH :

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Configuration et lancement**  
Générez une configuration par défaut :

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Modifiez **zebrad.toml** selon vos préférences (adresse d'écoute, ports, répertoire d'état, mise en cache).

**Démarrez le nœud :**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Le nœud commencera à se synchroniser depuis le bloc de genèse : comptez plusieurs heures (voire plus) selon votre matériel et votre réseau.

**5. Installer et configurer Zallet (portefeuille)**

Zallet est conçu pour remplacer la partie portefeuille de zcashd.

Consultez la page Zallet GitHub / des versions pour obtenir les binaires.

**Ou compilez à partir des sources :**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Lancez l'interface graphique ou la CLI (selon ce que fournit votre installation).
* Configurez-le pour qu'il se connecte à votre nœud Zebrad local via le point de terminaison RPC ou API.

**6. Importer votre portefeuille zcashd dans Zallet**

Vous n'avez pas besoin d'un zcashd en fonctionnement pour cette étape. Zallet lit directement le fichier `wallet.dat`, ce qui est important, car zcashd ne peut plus être démarré.

> **Conservez `wallet.dat`.** La migration signale, au lieu de l'importer, tout ce qu'elle ne peut pas représenter dans un portefeuille Zallet, et ce matériel de clés n'existe alors plus que dans `wallet.dat`. Ne le supprimez pas après la migration.

Exécutez d'abord `zallet init-wallet-encryption`. Zallet chiffre le matériel de clés pour une identité age, et cette identité doit exister avant l'importation de toute clé.

Convertissez ensuite votre configuration et votre portefeuille :

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` n'est présent que dans les versions compilées avec la fonctionnalité `zcashd-import`, et la lecture de `wallet.dat` nécessite l'utilitaire `db_dump` de Berkeley DB 6.2, la version qu'utilisait zcashd. Si vous avez plusieurs fichiers de portefeuille, exécutez la commande une fois par fichier et ajoutez `--allow-multiple-wallet-imports` lors des exécutions suivantes ; chacun devient son propre ensemble de comptes. Vos `rpcuser` et `rpcpassword` ne sont pas repris, car le JSON-RPC de Zallet utilise par défaut l'authentification par cookie ; ajoutez des identifiants avec `zallet add-rpc-user` si vous en avez besoin.

**Ce qui est repris**

* Les phrases mnémoniques et les clés qui en sont dérivées, avec des comptes reconstruits pour correspondre au portefeuille zcashd
* Les clés de dépense Sapling importées individuellement et les clés transparentes
* Les entrées transparentes en lecture seule qui incluent leur clé publique ou leur script de rachat
* Les dates de création des comptes, afin que l'analyse de la chaîne commence à la bonne hauteur

**Ce qui n'est pas repris.** Ces éléments sont signalés avec leur nombre au lieu d'être importés :

* **Les clés de dépense et les fonds Sprout.** Zallet ne prend pas en charge le pool Sprout. La procédure documentée consistait à sortir les fonds Sprout à l'aide de zcashd avant de le mettre hors service, ce qui n'est plus possible. Si vous êtes concerné, posez la question sur le [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) ou sur le [forum communautaire](https://forum.zcashcommunity.com/) avant toute autre démarche.
* Les entrées du carnet d'adresses
* Les entrées en lecture seule enregistrées sans clé publique ni script de rachat, ainsi que les entrées avec des clés publiques non compressées
* Les portefeuilles regtest

**Sauvegarde après la migration.** Une phrase mnémonique seule ne constitue pas une sauvegarde complète, car les clés importées n'existent que dans la base de données du portefeuille. Conservez des copies sécurisées de `wallet.db`, du fichier d'identité de chiffrement age désigné par l'option `keystore.encryption_identity` et de votre phrase mnémonique, et gardez le `wallet.dat` d'origine. Notez que `wallet.db` n'est pas lui-même chiffré : il contient en clair votre historique de transactions et vos clés pour lecture seule ; stockez donc la sauvegarde en lieu sûr.

**Nouvelle analyse et synchronisation du portefeuille**

* Une fois les clés importées, Zallet déclenchera une nouvelle analyse de la chaîne via Zebrad.
* Laissez à Zallet le temps de reconstituer votre solde et votre historique de transactions.

**7. Vérifier les soldes et la synchronisation**

Une fois l'importation terminée, Zallet se connectera à votre nœud Zebrad et analysera à nouveau la blockchain.
Une fois la synchronisation terminée, vos soldes et vos transactions devraient apparaître exactement comme avant.

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
        <td className="px-6 py-4">Port déjà utilisé ou configuration incorrecte</td>
        <td className="px-6 py-4">Vérifiez **zebrad.toml** et utilisez un port libre</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Synchronisation lente</td>
        <td className="px-6 py-4">Congestion du réseau</td>
        <td className="px-6 py-4">Assurez-vous d'avoir une connexion Internet stable, redémarrez Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Transactions manquantes dans le portefeuille</td>
        <td className="px-6 py-4">Importation partielle des clés</td>
        <td className="px-6 py-4">Réimportez les clés ou relancez l'analyse dans Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet ne parvient pas à se connecter au nœud</td>
        <td className="px-6 py-4">Nœud arrêté ou mauvais point de terminaison</td>
        <td className="px-6 py-4">Démarrez Zebrad et vérifiez le port RPC</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet plante</td>
        <td className="px-6 py-4">Version obsolète</td>
        <td className="px-6 py-4">Mettez à jour vers la dernière version depuis GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Conclusion**

Migrer de zcashd vers Zebrad et Zallet vous offre une expérience Zcash plus rapide, plus sûre et plus moderne.
Grâce à la sécurité apportée par Rust, à une conception modulaire et à de meilleurs outils, cette configuration garantit que votre nœud et votre portefeuille resteront prêts pour l'avenir à mesure que l'écosystème Zcash évolue.

Conseil : conservez les clés de votre portefeuille hors ligne et sauvegardez régulièrement vos données Zallet.
Consultez [zebra.zfnd.org](https://zebra.zfnd.org) pour Zebra, et [le livre Zallet](https://zcash.github.io/zallet/) ou le [dépôt Zallet](https://github.com/zcash/zallet) pour Zallet. Le chapitre [Migrer depuis zcashd](https://zcash.github.io/zallet/) du livre Zallet est la référence officielle pour l'étape 6.
