# Guide d’intégration du Snap Zcash pour MetaMask

Pour un guide complet et une explication visuelle, regardez ce [**guide YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw) : 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="Comment utiliser ZEC sur Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask prend désormais en charge **Zcash (ZEC) shielded** via le **Snap Zcash développé par ChainSafe**, ce qui vous permet d’envoyer, de recevoir et de gérer des ZEC privés directement dans votre portefeuille navigateur. Audité par **Hacken** et répertorié dans le **répertoire officiel des Snaps MetaMask**, il ne nécessite **aucun logiciel Zcash séparé** - seulement MetaMask et le Snap.

---

## **Prérequis**


> [**Extension MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (ordinateur uniquement) - Chrome, Edge ou Firefox.
> Compte MetaMask - Phrase de récupération sécurisée ; le Snap en dérive les clés Zcash.  
> Connexion Internet stable - Pour la synchronisation avec le réseau Zcash.  
> Fonds - ETH à échanger contre du ZEC ou ZEC provenant d’un exchange.

> **Astuce :** Protégez votre phrase de récupération MetaMask - elle contrôle à la fois ETH et ZEC.

---

## **1. Installer le Snap Zcash**

1. Allez dans le [**répertoire des Snaps MetaMask**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Recherchez [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) ou [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Cliquez sur **Install/Add to MetaMask**.
4. Approuvez les permissions telles que :
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Installation du snap Zcash](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Optionnel) Ajouter le réseau Zcash**

Dans MetaMask, choisissez **Add Network** et saisissez :

Pour **BNB SmartChain** ;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Cela active les informations réseau et les liens vers l’explorateur.
![Ajouter-un-réseau-personnalisé....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Pour **Zcash Mainnet** ;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. Se connecter au portefeuille ChainSafe WebZjs**

1. Rendez-vous sur [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Cliquez sur **Connect MetaMask Snap**.  

![Portefeuille web Zcash](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Approuvez la connexion.  
4. Consultez le résumé de votre compte Zcash, y compris :
   - Adresses Unified et adresse transparente

![Résumé-du-compte-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Attendez que la synchronisation soit terminée.




---

## **4. Approvisionner votre portefeuille**

> **Échanger ETH -> ZEC** - Utilisez des services comme **LeoDex** et envoyez-les vers votre adresse shielded.  
> **Retrait depuis un exchange** - Retirez les ZEC achetés vers votre adresse shielded WebZjs.  

![ÉCHANGE LEODEX](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Utilisez des adresses shielded (z) pour une **confidentialité totale**.

---

## **5. Envoyer / Recevoir des ZEC**

1. Dans **WebZjs**, allez dans **Transfer Balance**.  
2. Saisissez :
```
   - Adresse du destinataire shielded  
   - Montant
```
   ![Transférer-le-solde](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Confirmez la transaction dans MetaMask (signez la transaction).  
5. Les fonds reçus apparaîtront dans WebZjs après confirmation.

---

## **6. Vérifier / Dépanner**

> Vérifiez **WebZjs** pour voir les soldes mis à jour **(MetaMask n’affiche pas encore ZEC directement)** .  
> Si des problèmes surviennent :
  ```
  - Confirmez que vous avez le Snap officiel de ChainSafe.  
  - Vérifiez les bons paramètres réseau.  
  - Assurez-vous que le format d’adresse est correct.  
  - Reconnectez-vous via **Connect Snap** si nécessaire.
  ``` 

> **Conseil de sécurité :** Installez uniquement le **Snap ChainSafe audité** ; examinez les permissions avant approbation.

---

## **7. Vérifier les composants d’adresse**

1. Allez dans la section **Receive** - votre Unified Address s’affichera par défaut.  
2. Copiez l’Unified Address et rendez-vous sur le [Zcash Block Explorer](https://mainnet.zcashexplorer.app/).  
3. Collez votre Unified Address dans la barre de recherche.  
4. Vous verrez maintenant tous les composants de l’Unified Address, qui comprennent :
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Composants-de-l’adresse](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Remarques supplémentaires**

> Utilisez la [**dernière version de MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - la version publique prend en charge les Snaps.  
> Les preuves shielded peuvent prendre du temps, WebAssembly gère le calcul dans le navigateur.  
> La récupération est simple, installez MetaMask et le Snap, puis importez votre seed existante.  
> Le Snap utilise par défaut **ZEC shielded**, les adresses transparentes ne sont **pas l’objectif principal**.  
> Utilisez [zcashblockexplorer.com](https://zcashblockexplorer.com) pour les confirmations de transaction.
