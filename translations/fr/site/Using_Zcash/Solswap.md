# **Comment échanger contre ZEC dans Phantom Wallet**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

---

## **ZEC natif ou token ZEC ?**

« ZEC » dans Phantom peut désigner deux actifs différents : assurez-vous donc de savoir lequel vous achetez.

- Le bouton **Swap intégré de Phantom** vous donne une représentation tokenisée de ZEC sur Solana (ou un autre réseau pris en charge par Phantom). Ce n’est pas du ZEC natif. Elle se trouve à votre adresse Phantom, ne possède pas les fonctionnalités protégées de Zcash, et un wallet Zcash ne peut ni la voir ni la protéger.
- Le ZEC natif n’existe que sur la blockchain Zcash et est envoyé à une adresse Zcash. Pour en obtenir, vous avez besoin d’un service qui demande votre adresse Zcash, comme un échange dans [ZODL](https://zodl.com), l’une des options de la page [DEX](/dex), ou solswap.org suivi d’un retrait vers votre wallet Zcash (étape 8).

### Vérifiez avant de payer

- **Réseau :** le ZEC que vous recevez doit être sur le réseau **Zcash**. S’il est indiqué Solana, Ethereum ou Base, il s’agit d’un token.
- **Actif :** le ZEC natif n’a ni contrat de token ni adresse de mint. Si le vôtre en affiche une, il s’agit d’un token. Il existe aussi de nombreux tokens « ZEC » similaires sur Solana : ne vous fiez donc pas uniquement au nom.
- **Adresse :** le ZEC natif est envoyé à une adresse Zcash, qui commence par `t1`, `u1` ou `zs`. Si le ZEC est envoyé à votre adresse Phantom, vous recevez un token.

---

##  **Étape 1 : Ouvrir l’interface d’échange**  
Lancez l’application **Phantom** et accédez à **[solswap.org](https://solswap.org/)** depuis le navigateur Phantom. Le site fonctionne sur Near Intents et peut envoyer des ZEC vers une adresse Zcash.  

Le bouton **Swap** de Phantom répertorie également ZEC, mais il vous donne le token décrit ci-dessus, et non du ZEC natif.  


![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **Étape 2 : Sélectionner les réseaux et tokens de dépôt**  
- Choisissez votre **réseau source** (par exemple, *Ethereum* ou *Solana*), puis effectuez un dépôt pour l’échange.  


![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- Sélectionnez un token de base tel que **SOL, USDT ou USDC**.  
- Choisissez **ZEC** comme **token de destination**.  
- Assurez-vous que Zcash est disponible via l’interface d’échange.  



![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **Étape 3 : Saisir le montant et examiner le devis**  
- Saisissez le montant que vous souhaitez échanger.  
- Phantom affichera un **montant estimé reçu** après les frais.  


![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Étape 4 : Vérifier le gas et les frais**  
- Pour les **échanges sur la même chaîne**, assurez-vous d’avoir suffisamment du token de gas natif (*ETH pour Ethereum, SOL pour Solana*).  
- Les **échanges inter-chaînes** nécessitent du gas sur les chaînes source et destination.  
- Examinez le détail des frais :  
  - Frais Phantom : **0,85 %**  
  - Gas du réseau  
  - Frais du fournisseur de bridge (~**0,3 %**)  
  
  
---

##  **Étape 5 : Ajuster les paramètres (facultatif)**  
Appuyez sur **Swap Settings** pour :  
- Ajuster le **slippage** (valeur par défaut : **0,3 %**, ajustable jusqu’à 30 %).  
- Augmenter les **frais de priorité** sur les réseaux encombrés.  

---

##  **Étape 6 : Confirmer l’échange**  
- Vérifiez tous les détails de l’échange.  
- Appuyez sur **Swap Now** pour lancer la transaction.  


![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Étape 7 : Suivre le statut**  
- Suivez votre échange dans l’onglet **Recent Activity**.  
- Pour les échanges inter-chaînes, utilisez votre **identifiant de transaction** avec **Li.Fi Scanner** pour des mises à jour en temps réel. 


![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Étape 8 : Retirer le ZEC natif vers votre wallet Zcash**  
Après l’échange, votre ZEC apparaît dans le solde de votre **Account** sur solswap.org. Il n’est pas encore sur le réseau Zcash et n’est pas non plus dans Phantom. Pour le déplacer :  
- Ouvrez un wallet Zcash, tel que [ZODL](https://zodl.com), et copiez votre adresse de réception. Le formulaire de retrait accepte une adresse transparente (`t1`) ou unifiée (`u1`).  
- Sur solswap.org, accédez à **Account**, puis appuyez sur **Withdraw**.  
- Choisissez **ZEC**, définissez le réseau sur **Zcash**, collez votre adresse et vérifiez-la une dernière fois avant de confirmer.  

---

## **Prochaines étapes**  
Une fois que le ZEC natif est dans votre wallet Zcash, vous pouvez le protéger avec [ce guide](/guides/using-zec-privately).  

Un token ZEC acheté avec le bouton Swap de Phantom ne peut pas être protégé de cette manière, car il n’est pas sur le réseau Zcash. Vous devrez d’abord l’échanger contre du ZEC natif envoyé à une adresse Zcash.
