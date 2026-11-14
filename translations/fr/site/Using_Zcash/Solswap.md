# **Comment échanger contre du ZEC dans le portefeuille Phantom**

![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

Vous détenez déjà du ZEC sur Solana (par exemple grâce à un jeton qui rémunère ses détenteurs en ZEC) ? Ne l'échangez pas. Transférez ce jeton vers un portefeuille Zcash protégé en suivant [Vous avez du ZEC sur Solana ? Transférez-le vers du Zcash protégé](/using-zcash/solana-zec-to-shielded).

---

## **ZEC natif ou jeton ZEC ?**

« ZEC » dans Phantom peut désigner deux actifs différents : sachez donc lequel vous achetez.

- **Le bouton Swap intégré de Phantom** vous donne une représentation sous forme de jeton du ZEC sur Solana (ou sur un autre réseau pris en charge par Phantom). Ce n'est pas du ZEC natif. Il se trouve sur votre adresse Phantom, il ne dispose d'aucune fonctionnalité protégée de Zcash, et un portefeuille Zcash ne peut ni le voir ni le protéger.
- **Le ZEC natif** n'existe que sur la blockchain Zcash et est envoyé vers une adresse Zcash. Pour l'obtenir, vous avez besoin d'un service qui vous demande votre adresse Zcash, comme un échange au sein de [ZODL](https://zodl.com), l'une des options de la [page DEX](/dex), ou solswap.org suivi d'un retrait vers votre portefeuille Zcash (étape 8).

### Vérifiez avant de payer

- **Réseau :** le ZEC que vous recevez doit se trouver sur le réseau **Zcash**. S'il est indiqué Solana, Ethereum ou Base, il s'agit d'un jeton.
- **Actif :** le ZEC natif n'a ni contrat de jeton ni adresse de mint. Si le vôtre en affiche un, il s'agit d'un jeton. Il existe également de nombreux jetons « ZEC » d'imitation sur Solana : ne vous fiez donc pas uniquement au nom. Le jeton OmniBridge sur Solana est `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS` ; il s'agit toujours d'un jeton, et non de ZEC natif.
- **Adresse :** le ZEC natif est envoyé vers une adresse Zcash, qui commence par `t1`, `u1` ou `zs`. Si le ZEC est envoyé vers votre adresse Phantom, vous recevez un jeton.

---

##  **Étape 1 : ouvrez l'interface d'échange**
Lancez l'**application Phantom** et rendez-vous sur **[solswap.org](https://solswap.org/)** depuis le navigateur de Phantom. Saisissez l'adresse vous-même. Le site fonctionne sur NEAR Intents et peut envoyer du ZEC vers une adresse Zcash.

Le bouton **Swap** propre à Phantom propose aussi du ZEC, mais vous obtiendrez alors le jeton décrit ci-dessus, et non du ZEC natif.

![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **Étape 2 : sélectionnez les réseaux et les jetons à déposer**
- Choisissez votre **réseau source** (p. ex. *Ethereum* ou *Solana*), puis effectuez le dépôt pour l'échange.

![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- Sélectionnez un jeton de base comme **SOL, USDT ou USDC**.
- Choisissez **ZEC** comme **jeton de destination**.
- Assurez-vous que Zcash est disponible dans l'interface d'échange.

![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **Étape 3 : saisissez le montant et vérifiez le devis**
- Saisissez le montant que vous souhaitez échanger.
- Fiez-vous au montant reçu affiché sur **solswap.org**. C'est ce devis qui s'applique sur ce parcours.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Étape 4 : vérifiez le gas et les frais**
- Conservez suffisamment de jeton de gas de la chaîne source dans Phantom pour approuver le dépôt (*SOL* sur Solana, *ETH* sur Ethereum).
- Lisez la ligne des frais sur le devis de solswap avant de confirmer. Le Swap intégré de Phantom applique son propre barème de frais (historiquement des frais Phantom de 0,85 %, plus le gas du réseau et des frais de pont). Ces chiffres ne s'appliquent pas à un dépôt sur solswap.org.

---

##  **Étape 5 : ajustez les paramètres (facultatif)**
Sur solswap.org, vérifiez le slippage et le montant minimum reçu indiqué sur cet écran avant d'effectuer votre dépôt.

Si vous consultez plutôt la fenêtre **Swap** propre à Phantom, vous êtes sur le parcours du jeton décrit en haut de cette page. Fermez-la et ouvrez `solswap.org` dans le navigateur de Phantom.

---

##  **Étape 6 : confirmez l'échange**
- Vérifiez tous les détails de l'échange sur solswap.org.
- Confirmez le dépôt dans Phantom.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Étape 7 : suivez le statut**
- Suivez le dépôt dans l'activité de solswap.org jusqu'à ce qu'il affiche **Completed**.
- L'identifiant de transaction Solana ou de la chaîne source figure sur cette ligne d'activité ainsi que sur l'explorateur de ce réseau.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Étape 8 : retirez le ZEC natif vers votre portefeuille Zcash**
Après l'échange, votre ZEC apparaît dans le solde **Account** de solswap.org. Il n'est pas encore sur le réseau Zcash, ni dans Phantom.

1. Ouvrez un portefeuille Zcash que l'[annuaire](/wallets) indique comme **Ironwood: Ready**. Copiez une `u1` que votre portefeuille désigne comme protégée. Une `t1` fonctionne également, mais ce dépôt reste public jusqu'à ce que vous le protégiez.
2. Sur solswap.org, allez dans **Account** et appuyez sur **Withdraw**. Choisissez **ZEC**, réglez le réseau sur **Zcash**, collez l'adresse et vérifiez les premiers et derniers caractères avant de confirmer.
3. Si **Received amount** et **Fee** restent sur « – » et que le bouton ne réagit pas, le solde n'est pas perdu. Il se trouve dans NEAR Intents sous votre clé Phantom. Terminez l'opération sur [near.com](https://near.com) : connectez-vous avec le même portefeuille Phantom, ouvrez **Move legacy assets**, appuyez sur **Withdraw** sur la ligne ZEC (et non sur **Move**), réglez le réseau sur **Zcash** et collez la même `u1`. Phantom vous demandera de **Sign Message**. Ne confirmez que si la demande provient de `near.com` et que le message mentionne `"verifying_contract": "intents.near"`. Les captures d'écran complètes de cette solution de contournement se trouvent dans [Vous avez du ZEC sur Solana ? Transférez-le vers du Zcash protégé](/using-zcash/solana-zec-to-shielded).

---

## **Prochaines étapes**
Une fois le ZEC natif dans votre portefeuille Zcash, gardez-le protégé grâce à [Utiliser ZEC en toute confidentialité](/guides/using-zec-privately).

Un jeton ZEC acheté avec le bouton Swap de Phantom ne peut pas être protégé depuis Phantom. Ce jeton est l'actif OmniBridge sur Solana. Transférez-le en suivant [Vous avez du ZEC sur Solana ? Transférez-le vers du Zcash protégé](/using-zcash/solana-zec-to-shielded).
