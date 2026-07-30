# Guide de migration : de zcashd vers Zebrad/Zallet

L'écosystème Zcash évolue. Le nœud complet Zcashd traditionnel, maintenu par *Electric Coin Company (ECC)* / *Zodl*, est progressivement remplacé par Zebra et Zallet.

- Zebra est une implémentation moderne en Rust du protocole Zcash développée par la Zcash Foundation
- Zallet est un portefeuille léger conçu pour s'interfacer de manière fluide avec les nœuds Zebra développés par Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

Ce guide vous accompagne dans la migration de **Zcashd** vers **Zebrad** et **Zallet**, y compris l'installation, l'importation du portefeuille et la résolution des problèmes courants liés à la migration.

---

## Le projet Zcash a officiellement annoncé que zcashd sera obsolète en 2025.

**Statut de l'obsolescence et ce que cela signifie**

- Le projet Zcash a officiellement annoncé que zcashd sera obsolète en 2025.
- Les nœuds complets sont en cours de migration vers Zebrad, une implémentation en Rust, tandis que Zallet est destiné à remplacer le composant portefeuille de zcashd. 
- En réponse, le projet Zebra suit un jalon « Zcashd Deprecation » afin d'assurer la compatibilité, la migration RPC et le support de l'écosystème.
- Pour de nombreuses méthodes RPC, Zebrad/Zallet viseront à être des remplacements directs (en émulation ou avec un comportement identique). D'autres changeront ou pourraient ne pas être prises en charge.

**Pourquoi migrer — au-delà de l'obsolescence**

Même en laissant de côté l'obsolescence, il existe des raisons convaincantes de migrer :
- Sécurité et robustesse : la sûreté mémoire de Rust et les outils modernes réduisent les risques de vulnérabilités.
- Performance et efficacité : Zebrad est conçu pour le parallélisme, une utilisation plus efficace des ressources et une synchronisation plus rapide.
- Architecture modulaire : séparer la logique du nœud (Zebrad) de l'interface du portefeuille (Zallet) offre des limites plus claires et de meilleures possibilités de mise à niveau.
- Compatibilité future avec l'écosystème : les outils, améliorations et le reste de l'écosystème Zcash cibleront de plus en plus Zebrad/Zallet.
- Tranquillité d'esprit : évitez de rester bloqué sur un composant obsolète et non pris en charge.

### Passons maintenant au guide de migration

**1. Sauvegardez tout**
* Sauvegardez votre wallet.dat (ou tout autre fichier de portefeuille / magasin de clés) depuis votre nœud zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* Enregistrez votre zcash.conf et tous les paramètres personnalisés.
* Exportez une copie de tous les scripts RPC ou automatisations que vous utilisez.
* Vérifiez que vos sauvegardes sont valides (par exemple, dans un autre environnement, essayez de les ouvrir ou de les inspecter).
* Vérifiez quelles méthodes JSON-RPC vous utilisez actuellement.
* Comparez-les au tableau de compatibilité prévu, maintenu sur le [site de support Zcash](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 
* Préparez-vous aux changements ou aux méthodes absentes (certaines pourraient nécessiter un contournement ou une adaptation).

**2. Configuration système requise et espace disque**
* Assurez-vous de disposer de suffisamment d'espace disque (la chaîne Zcash est volumineuse). Au moins 10 GB d'espace disque libre.
* Assurez-vous que votre machine dispose d'un réseau stable, ainsi que de CPU et de RAM suffisants.
* Une connexion Internet 
* Si vous prévoyez de compiler depuis les sources, assurez-vous que Rust et Cargo sont installés.

**3. Installer / configurer Zebrad**
Vous pouvez soit télécharger un binaire précompilé, soit compiler depuis les sources.
* La Zcash Foundation publie des versions et des binaires pour Zebra. Par exemple, vous pouvez utiliser un script d'installation ou télécharger le binaire approprié pour votre système d'exploitation.

* Notez que dans les versions récentes de Zebra, [le point de terminaison RPC n'est plus activé par défaut dans Docker.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**Option A : installation via un binaire précompilé**  
Sur **Linux**/**macOS** :

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

Cela installe la dernière version stable de zebrad.

**Option B : compiler depuis les sources**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

Après la compilation, déplacez le binaire dans votre chemin :

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. Configuration et lancement**  
Générez une configuration par défaut :

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

Modifiez **zebrad.toml** selon vos préférences (adresse d'écoute, ports, répertoire d'état, cache).

**Démarrer le nœud :**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

Le nœud commencera à se synchroniser depuis le bloc genesis — prévoyez plusieurs heures (ou plus) selon le matériel et le réseau.

**5. Installer / configurer Zallet (portefeuille)**

Zallet est conçu pour remplacer la partie portefeuille de zcashd.

Consultez la page GitHub / des versions de Zallet pour les binaires.

**Ou compilez depuis les sources :**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* Lancez l'interface graphique ou l'interface en ligne de commande (selon ce que fournit votre installation).
* Configurez-la pour se connecter à votre nœud Zebrad local via le point de terminaison RPC ou API.

**6. Importer votre portefeuille zcashd dans Zallet**  
Via export des clés privées

Sur zcashd, exportez vos clés privées :

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* Dans Zallet, choisissez Importer des clés ou une option similaire.
* Indiquez-lui **zcashd_keys.txt**. 
* Zallet devrait analyser et importer les adresses ZEC et les clés associées.

**Via phrase de récupération** (si applicable)

* Si votre portefeuille prend en charge une sauvegarde par phrase de récupération, utilisez Restaurer à partir d'une phrase de récupération dans Zallet.
* Cela ne fonctionne que si votre portefeuille zcashd a été dérivé d'une seed (ou si vous disposez d'une conversion de seed).

**Nouvelle analyse du portefeuille et synchronisation**

* Une fois les clés importées, Zallet déclenchera une nouvelle analyse de la chaîne via Zebrad.
* Laissez un peu de temps à Zallet pour reconstruire votre solde et votre historique de transactions.

**7. Vérifier les soldes et la synchronisation**

Une fois l'importation effectuée, Zallet se connectera à votre nœud Zebrad et analysera de nouveau la blockchain.
Lorsque la synchronisation sera terminée, vos soldes et transactions devraient apparaître exactement comme auparavant.

Vous pouvez vérifier l'état de synchronisation de votre nœud en exécutant :

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

Ou consulter les journaux.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
</div>

**8. Résolution des problèmes**

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
        <td className="px-6 py-4">Port déjà utilisé ou mauvaise configuration</td>
        <td className="px-6 py-4">Vérifiez **zebrad.toml** et utilisez un port libre</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Synchronisation lente</td>
        <td className="px-6 py-4">Congestion du réseau</td>
        <td className="px-6 py-4">Assurez-vous d'avoir une connexion Internet stable, puis redémarrez Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Transactions manquantes dans le portefeuille</td>
        <td className="px-6 py-4">Importation partielle des clés</td>
        <td className="px-6 py-4">Réimportez les clés ou relancez une nouvelle analyse dans Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet ne peut pas se connecter au nœud</td>
        <td className="px-6 py-4">Nœud non démarré ou mauvais point de terminaison</td>
        <td className="px-6 py-4">Démarrez Zebrad et vérifiez le port RPC correct</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet plante</td>
        <td className="px-6 py-4">Version obsolète</td>
        <td className="px-6 py-4">Mettez à jour vers la dernière version publiée sur GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Conclusion**

Migrer de zcashd vers Zebrad et Zallet vous offre une expérience Zcash plus rapide, plus sûre et plus moderne.
Grâce à la sécurité fondée sur Rust, à une conception modulaire et à de meilleurs outils, cette configuration garantit que votre nœud et votre portefeuille restent prêts pour l'avenir à mesure que l'écosystème Zcash continue d'évoluer.

Conseil : gardez les clés de votre portefeuille hors ligne et sauvegardez régulièrement vos données Zallet.
Consultez [zebra.zfnd.org](https://zebra.zfnd.org) et [zallet.zfnd.org](https://zallet.zfnd.org) pour les mises à jour et le support de la communauté.
