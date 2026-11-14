<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guide d'intégration de MetaMask Zcash Snap

> Détenez et envoyez des ZEC protégés depuis l'extension de navigateur MetaMask, grâce au Zcash Snap de ChainSafe et au portefeuille web WebZjs.

## En bref

* Le ChainSafe Zcash Snap ajoute les ZEC protégés à MetaMask sur ordinateur (Chrome, Edge, Firefox). Aucun logiciel Zcash séparé n'est nécessaire.
* Vos clés Zcash sont dérivées de votre phrase de récupération MetaMask. Cette seule phrase protège désormais à la fois vos ETH et vos ZEC.
* Vous gérez vos ZEC via le portefeuille WebZjs sur webzjs.chainsafe.dev, et non dans la liste d'actifs de MetaMask.
* Votre compte reçoit une adresse unifiée, ce qui permet aux expéditeurs de vous payer dans le pool le plus confidentiel qu'ils prennent en charge.
* Approvisionnez-le par un échange (par exemple d'ETH en ZEC) ou en retirant des ZEC d'un exchange vers votre adresse protégée.
* Récupération : réinstallez MetaMask et le Snap, puis importez votre phrase de récupération existante.

## Explication principale

Un MetaMask Snap est un petit module complémentaire isolé qui apprend à MetaMask à gérer une nouvelle blockchain. Le Zcash Snap, développé par ChainSafe et audité par Hacken, permet à MetaMask de dériver des clés Zcash à partir de votre phrase de récupération existante et de signer des transactions Zcash.

MetaMask lui-même n'affiche pas de solde ZEC. C'est le portefeuille web WebZjs qui se connecte au Snap, se synchronise avec le réseau Zcash via un serveur lightwalletd, et affiche vos adresses et votre solde. Les preuves protégées sont calculées dans votre navigateur avec WebAssembly, c'est pourquoi les envois peuvent prendre un moment.

Les étapes ci-dessous couvrent l'installation du Snap, la connexion de WebZjs, l'approvisionnement du portefeuille, l'envoi et la réception, ainsi que la vérification des composants de votre adresse unifiée.

## Guide complet

Pour un tutoriel complet et une explication visuelle, regardez ce [**guide YouTube**](https://www.youtube.com/watch?v=UJh9Ilkohdw) : 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="How to use ZEC on Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask prend désormais en charge les **Zcash protégés (ZEC)** grâce au **Zcash Snap développé par ChainSafe**, ce qui vous permet d'envoyer, de recevoir et de gérer des ZEC privés directement dans le portefeuille de votre navigateur. Audité par **Hacken** et répertorié dans l'**annuaire officiel des Snaps de MetaMask**, il ne nécessite **aucun logiciel Zcash séparé**, seulement MetaMask et le Snap.

---

## **Prérequis**


> [**Extension MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (ordinateur uniquement) : Chrome, Edge ou Firefox.
> Compte MetaMask : phrase de récupération sécurisée ; Snap en dérive les clés Zcash.  
> Connexion Internet stable : pour la synchronisation avec le réseau Zcash.  
> Fonds : des ETH à échanger contre des ZEC, ou des ZEC provenant d'un exchange.

> **Conseil :** Protégez votre phrase de récupération MetaMask : elle contrôle à la fois vos ETH et vos ZEC.

---

## **1. Installer le Zcash Snap**

1. Rendez-vous dans l'[**annuaire des Snaps de MetaMask**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
2. Recherchez [**« Zcash WebZjs Wallet »**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) ou [**« WebZjs Zcash Snap »**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
3. Cliquez sur **Installer/Ajouter à MetaMask**.
4. Approuvez les autorisations, par exemple :
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Facultatif) Ajouter le réseau Zcash**

Dans MetaMask, choisissez **Ajouter un réseau** et saisissez :

Pour **BNB SmartChain** :
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Cela active les informations réseau et les liens vers l'explorateur.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Pour le **réseau principal Zcash** :
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` est un serveur lightwalletd compatible WebZjs (gRPC-web) géré par [zec.rocks](https://zec.rocks) (@emersonian). Pour le testnet, utilisez `https://zjs.zec.rocks/testnet`. Si vous hébergez vous-même le portefeuille web WebZjs, c'est la valeur à définir pour `LIGHTWALLETD_PROXY`.

---

## **3. Se connecter au portefeuille ChainSafe WebZjs**

1. Rendez-vous sur [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Cliquez sur **Connecter MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Approuvez la connexion.  
4. Consultez le récapitulatif de votre compte Zcash, notamment :
   - Les adresses unifiées et l'adresse transparente

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Attendez la fin de la synchronisation.




---

## **4. Approvisionner votre portefeuille**

> **Échange ETH -> ZEC** : utilisez des services comme **LeoDex** et envoyez les fonds vers votre adresse protégée.  
> **Retrait depuis un exchange** : retirez les ZEC achetés vers votre adresse protégée WebZjs.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Utilisez des adresses protégées (z) pour une **confidentialité totale**.

---

## **5. Envoyer / recevoir des ZEC**

1. Dans **WebZjs**, allez dans **Transférer le solde**.  
2. Saisissez :
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Confirmez la transaction dans MetaMask (signez la transaction).  
5. Les fonds reçus apparaîtront dans WebZjs après confirmation.

---

## **6. Vérifier / dépanner**

> Consultez **WebZjs** pour voir les soldes à jour **(MetaMask n'a pas répertorié ZEC directement)**.  
> En cas de problème :
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Conseil de sécurité :** N'installez que le **ChainSafe Snap audité** ; vérifiez les autorisations avant de les approuver.

---

## **7. Vérifier les composants de l'adresse**

1. Allez dans la section **Recevoir** : votre adresse unifiée s'affiche par défaut.  
2. Copiez l'adresse unifiée et rendez-vous sur l'[explorateur de blocs Zcash](https://mainnet.zcashexplorer.app/).  
3. Collez votre adresse unifiée dans la barre de recherche.  
4. Vous verrez alors tous les composants de l'adresse unifiée, notamment :
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Remarques supplémentaires**

> Utilisez la [**dernière version de MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) : la version publique prend en charge les Snaps.  
> Les preuves protégées peuvent prendre du temps, car WebAssembly effectue les calculs dans le navigateur.  
> La récupération est simple : installez MetaMask et le Snap, puis importez votre phrase de récupération existante.  
> Le Snap utilise par défaut les **ZEC protégés** ; les adresses transparentes ne sont **pas la priorité**.  
> Utilisez [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) pour vérifier les confirmations de transactions.
