# **Comment échanger contre ZEC dans Phantom Wallet**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

Vous détenez déjà ZEC sur Solana (par exemple grâce à un jeton qui rémunère ses détenteurs en ZEC) ? Ne l’échangez pas. Transférez ce jeton vers un wallet Zcash protégé avec [Vous avez ZEC sur Solana ? Transférez-le vers Zcash protégé](/using-zcash/solana-zec-to-shielded).

---

## **ZEC natif ou token ZEC ?**

« ZEC » dans Phantom peut désigner deux actifs différents : assurez-vous donc de savoir lequel vous achetez.

- Le bouton **Swap intégré de Phantom** vous donne une représentation tokenisée de ZEC sur Solana (ou un autre réseau pris en charge par Phantom). Ce n’est pas du ZEC natif. Elle se trouve à votre adresse Phantom, ne possède pas les fonctionnalités protégées de Zcash, et un wallet Zcash ne peut ni la voir ni la protéger.
- Le ZEC natif n’existe que sur la blockchain Zcash et est envoyé à une adresse Zcash. Pour en obtenir, vous avez besoin d’un service qui demande votre adresse Zcash, comme un échange dans [ZODL](https://zodl.com), l’une des options de la page [DEX](/dex), ou solswap.org suivi d’un retrait vers votre wallet Zcash (étape 8).

### Vérifiez avant de payer

- **Réseau :** le ZEC que vous recevez doit être sur le réseau **Zcash**. S'il indique Solana, Ethereum ou Base, c'est un token.
- **Actif :** le ZEC natif n'a pas de contrat de token ni d'adresse de mint. Si le vôtre en affiche un, c'est un token. Il existe également de nombreux tokens « ZEC » ressemblants sur Solana, alors ne vous fiez pas uniquement au nom. Le token OmniBridge sur Solana est `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS` ; il s'agit toujours d'un token, pas de ZEC natif.
- **Adresse :** le ZEC natif est envoyé vers une adresse Zcash, qui commence par `t1`, `u1` ou `zs`. Si le ZEC est envoyé vers votre adresse Phantom, vous recevez un token.

---

##  **Étape 1 : Ouvrir l’interface de swap**
Lancez l’application **Phantom** et rendez-vous sur **[solswap.org](https://solswap.org/)** depuis le navigateur Phantom. Saisissez l’adresse vous-même. Le site fonctionne sur NEAR Intents et peut envoyer ZEC vers une adresse Zcash.

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

##  **Étape 3 : Saisissez le montant et vérifiez le devis**
- Saisissez le montant que vous souhaitez échanger.
- Utilisez le montant à recevoir affiché sur **solswap.org**. C’est ce devis qui s’applique à cet itinéraire.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Étape 4 : Vérifier le gas et les frais**
- Conservez suffisamment du token de gas de la chaîne source dans Phantom pour approuver le dépôt (*SOL* sur Solana, *ETH* sur Ethereum).
- Lisez la ligne des frais du devis solswap avant de confirmer. Le Swap intégré de Phantom utilise son propre barème de frais (historiquement, des frais de Phantom de 0,85 % auxquels s’ajoutent le gas du réseau et des frais de bridge). Ces chiffres ne s’appliquent pas à un dépôt sur solswap.org.

---

##  **Étape 5 : Ajuster les paramètres (facultatif)**
Sur solswap.org, vérifiez le slippage et le montant minimum à recevoir indiqué à l’écran avant d’effectuer votre dépôt.

Si vous consultez plutôt l’écran **Swap** propre à Phantom, vous êtes sur le parcours du jeton indiqué en haut de cette page. Fermez-le et ouvrez `solswap.org` dans le navigateur Phantom.

---

##  **Étape 6 : Confirmer l'échange**
- Vérifiez tous les détails de l'échange sur solswap.org.
- Confirmez le dépôt dans Phantom.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Étape 7 : Surveiller le statut**
- Suivez le dépôt dans l’activité de solswap.org jusqu’à ce qu’il affiche **Terminé**.
- L’ID de transaction Solana ou de la chaîne source figure sur cette ligne d’activité et dans l’explorateur de chaîne de ce réseau.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Étape 8 : Retirez des ZEC natifs vers votre wallet Zcash**
Après le swap, votre ZEC apparaît dans le solde de votre compte **solswap.org**. Il n'est pas encore sur le réseau Zcash et ne se trouve pas non plus dans Phantom.

1. Ouvrez un wallet Zcash que l’[annuaire](/wallets) indique comme **Ironwood : Prêt**. Copiez une `u1` que votre wallet identifie comme protégée. Une `t1` fonctionne également, mais ce dépôt est public jusqu’à ce que vous le protégiez.
2. Sur solswap.org, accédez à **Account** et appuyez sur **Withdraw**. Choisissez **ZEC**, définissez le réseau sur **Zcash**, collez l’adresse et vérifiez les premiers et derniers caractères avant de confirmer.
3. Si **Received amount** et **Fee** restent sur « – » et que le bouton ne fait rien, le solde n’est pas perdu. Il se trouve dans NEAR Intents sous votre clé Phantom. Terminez sur [near.com](https://near.com) : connectez-vous avec le même wallet Phantom, ouvrez **Move legacy assets**, appuyez sur **Withdraw** dans la ligne ZEC (et non sur **Move**), définissez le réseau sur **Zcash**, puis collez la même `u1`. Phantom vous demandera de **Sign Message**. Confirmez uniquement si la demande provient de `near.com` et que le message mentionne `"verifying_contract": "intents.near"`. Les écrans complets pour cette solution de contournement figurent dans [Vous avez du ZEC sur Solana ? Déplacez-le vers du Zcash protégé](/using-zcash/solana-zec-to-shielded).

---

## **Étapes suivantes**
Une fois que les ZEC natifs sont dans votre portefeuille Zcash, conservez-les protégés avec [l’utilisation privée de ZEC](/guides/using-zec-privately).

Un jeton ZEC acheté avec le bouton Swap de Phantom ne peut pas être protégé depuis Phantom. Ce jeton est l'actif OmniBridge sur Solana. Déplacez-le avec [Vous avez des ZEC sur Solana ? Déplacez-les vers des Zcash protégés](/using-zcash/solana-zec-to-shielded).
