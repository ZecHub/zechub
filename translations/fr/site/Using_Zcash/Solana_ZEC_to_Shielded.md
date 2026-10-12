<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Vous avez du ZEC sur Solana ? Transférez-le vers du Zcash blindé

Cette page s’adresse à vous si du ZEC est apparu dans votre wallet Solana parce que vous détenez du ZCAT, ou un autre token Solana qui rémunère ses détenteurs en ZEC. Vous n’avez besoin de rien vendre pour suivre ce guide. Vous transférerez le ZEC que vous possédez déjà depuis Solana vers un wallet Zcash, où il sera blindé.

Nous avons effectué chaque étape ci-dessous avec un véritable transfert le 27 septembre 2026, en partant de 0.00266336 ZEC dans Phantom. Les frais, délais et écrans de cette page correspondent à ce que nous avons observé.

---

## Ce que vous détenez réellement

Le ZEC dans votre wallet Solana est un token sur Solana, et non des pièces sur le réseau Zcash. Le OmniBridge de NEAR l’émet et détient de véritables ZEC sur la chaîne Zcash pour le garantir ; le bridge est actif sur Solana depuis octobre 2025. Sa composante Solana fonctionne avec des messages Wormhole et des NEAR Chain Signatures, et non avec un client léger Zcash ; le côté Solana n’est donc aussi fiable que ces deux systèmes. On l’appelle parfois du « ZEC papier ». Il suit le cours du ZEC, mais chaque solde et chaque transfert figurent dans le registre public de Solana sous l’adresse de votre wallet, et il ne peut pas être blindé tant qu’il y reste.

Vérifiez que le vôtre est le véritable token. Dans Phantom, appuyez sur **ZEC** et faites défiler jusqu’à **À propos de Zcash**. L’adresse du contrat doit être :

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantom la raccourcit en `A7bd…QXaS` ; comparez donc les premiers et derniers caractères, ou recherchez l’adresse complète sur [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). Tout autre token « ZEC » dans votre wallet, quel que soit son nom ou son logo, n’est pas celui-ci. N’y touchez pas.

---

## Pourquoi le transférer

Le ZEC blindé est l’objectif de Zcash. Lorsque votre ZEC se trouve dans un pool blindé, l’expéditeur, le destinataire et le montant de chaque paiement sont chiffrés sur la chaîne Zcash. Personne consultant un explorateur ne peut voir votre solde.

Vous détenez déjà du ZEC. Le transférer dans un wallet Zcash vous apporte l’élément qui le rend Zcash, tout en retirant le bridge de l’équation : le ZEC natif dans votre propre wallet ne dépend de personne pour honorer un remboursement.

[Qui peut voir votre paiement en Zcash ?](/start-here/who-can-see-your-zcash-payment) explique précisément ce qui reste caché.

---

## Choisissez un wallet Zcash

ZecHub n’en choisit pas un pour vous. Faites votre choix dans le [ZecHub répertoire de wallets](/wallets), et vérifiez deux libellés sur la fiche du wallet avant de l’installer :

- **Ironwood : Prêt.** Ironwood est le pool dans lequel entrent les nouveaux ZEC blindés depuis la mise à niveau [Ironwood](/zcash-tech/ironwood) du 28 juillet 2026. L’ancien pool Orchard n’accepte plus de nouveaux fonds.
- **Blindage automatique.** Utile si un paiement arrive de manière transparente : le wallet transfère alors ce ZEC dans le pool blindé pour vous. Ne considérez pas ce libellé comme un substitut à **Ironwood : Prêt**. Un wallet peut proposer le Blindage automatique tout en ne disposant pas d’un pool Ironwood (Edge est actuellement dans cette situation dans le répertoire). La plupart des autres wallets affichent plutôt un bouton **Shield**.

Installez le wallet depuis le lien figurant sur sa fiche dans le répertoire, et non depuis un résultat de recherche ou une publicité. Notez la phrase de récupération sur papier et conservez-la hors ligne.

Votre wallet affiche deux types d’adresses :

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| Commence par | Type | Ce que le public voit |
|---|---|---|
| `u1` | Unified Address | Rien à votre sujet, mais uniquement lorsque le paiement arrive dans un pool blindé |
| `t1` | Adresse transparente | Votre adresse et le montant, pour toujours, comme sur Solana |

Utilisez une adresse `u1` que votre wallet identifie comme blindée. Une `u1` est un ensemble de destinataires, et certains wallets y placent un destinataire transparent à côté du destinataire blindé. Un expéditeur qui ne peut payer que des adresses transparentes utilisera celui-là, et votre paiement arrivera publiquement même si vous avez collé une `u1`. L’adresse blindée de notre wallet de test ne comporte aucun destinataire transparent ; cela ne pouvait donc pas nous arriver. [Pools blindés](/using-zcash/shielded-pools) détaille davantage les destinataires. Certains wallets affichent une nouvelle `u1` chaque fois que vous ouvrez Recevoir ; c’est normal, et elles vous appartiennent toutes. La capture d’écran de réception et le champ de destinataire near.com de cette page utilisent pour cette raison différents préfixes `u1`.

Nous avons utilisé ZODL pour notre test, car c’était le wallet que nous avions configuré. Seuls les wallets que le répertoire indique comme **Ironwood : Prêt** peuvent recevoir de nouvelles valeurs blindées.

---

## Transférez-le

L’itinéraire comporte deux parties : déposez votre ZEC dans NEAR Intents depuis Phantom, puis envoyez-le vers votre adresse Zcash. Nous avons utilisé [solswap.org](https://solswap.org), un site conçu par NEAR pour les utilisateurs de Solana, pour la première partie, puis [near.com](https://near.com), l’application propre à NEAR, pour la seconde. Le guide de ZecHub, [Comment échanger contre du ZEC dans le wallet Phantom](/using-zcash/solswap), présente plus en détail les écrans de solswap. N’utilisez pas le bouton **Swap** de Phantom pour cela : vous détenez déjà le token, et l’échanger ne vous mènera nulle part.

Conservez un peu de SOL dans Phantom pour les frais Solana.

### 1. Déposez votre ZEC sur solswap.org

1. Ouvrez Phantom, accédez à l’onglet du navigateur, saisissez vous-même `solswap.org` et connectez votre wallet.
2. Appuyez sur **Deposit**. Réglez **Asset** sur **Zcash**, **Network** sur **Solana** et la méthode sur **Wallet**.
3. Saisissez le montant (ou appuyez sur **Max**) et approuvez la transaction dans Phantom.

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](/content-images/03-solswap-deposit-425691e62f.webp)

Notre dépôt est arrivé dans le bloc Solana à 15:09:08 (UTC+1), et solswap l’a affiché comme **Completed** neuf secondes plus tard.

![solswap deposit history showing Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

Votre ZEC se trouve maintenant dans votre solde NEAR Intents. Votre clé Phantom autorise chaque sortie, les solveurs NEAR Intents assurent la livraison, et NEAR Intents peut retenir un solde pour un contrôle de conformité (voir les notes de confiance ci-dessous).

### 2. Envoyez-le vers votre adresse Zcash sur near.com

solswap propose également une page **Withdraw**, mais elle n’a pas fonctionné pour nous. Les champs **Received amount** et **Fee** restaient à « – » et le bouton ne faisait rien, que nous choisissions Zcash ou Solana comme réseau.

![solswap Withdraw form with the received amount and fee stuck at a dash](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

Si cela vous arrive, votre ZEC n’est pas bloqué. Le solde est lié à la clé de votre wallet, et non au site web ; toute application NEAR Intents à laquelle vous vous connectez avec ce wallet peut donc y accéder. Nous avons terminé sur near.com :

1. Accédez à `near.com` et connectez-vous avec le même wallet Phantom.
2. Votre solde solswap apparaît sous **Move legacy assets** (near.com appelle « legacy » les soldes provenant d’anciennes applications NEAR Intents). Appuyez sur **Withdraw** dans la ligne ZEC. Vous n’avez pas besoin de **Move**.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. Réglez **Network** sur **Zcash**, collez l’adresse `u1` de votre wallet comme **Recipient**, et vérifiez les six premiers et six derniers caractères avec votre wallet.

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. Appuyez sur **Review withdrawal**, lisez le récapitulatif, puis appuyez sur **Send**.

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. Phantom vous demande de **Sign Message** pour near.com. Cette signature autorise NEAR Intents à déplacer votre solde. Elle ne coûte aucun SOL, mais cela ne la rend pas inoffensive : un site imitateur peut afficher la même demande et vider votre solde NEAR Intents. Avant d’appuyer sur **Confirm**, vérifiez tous les éléments suivants et appuyez sur **Cancel** si l’un d’eux échoue :
   - Le site indiqué dans la demande est `near.com`. (Le dépôt de l’étape 1 était une demande de transaction Phantom ordinaire provenant de `solswap.org` ; vérifiez ce nom de la même manière.)
   - Ouvrez **Message** et recherchez `"verifying_contract": "intents.near"`.
   - Le message est un texte lisible, comme sur la capture d’écran. S’il s’agit d’un bloc illisible, ou si le site ne correspond pas à celui de votre barre d’adresse, refusez-le.
   - Il ne vous demande jamais votre phrase de récupération. Une signature n’implique jamais de la saisir.

![Phantom Sign Message request from near.com on the Solana network](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. near.com affiche **Processing send**, **Sending**, puis **Complete**. **View on explorer** ouvre l’enregistrement NEAR Intents du transfert.

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](/content-images/10-nearcom-complete-c641093c46.webp)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](/content-images/11-intents-explorer-f93f87814e.webp)

### Coût et durée de notre test

| | Notre test |
|---|---|
| ZEC déposé depuis Phantom | 0.00266336 ZEC |
| ZEC reçu dans le wallet Zcash | 0.00241336 ZEC, blindé |
| Coût du côté ZEC | 0.00025 ZEC (near.com affichait « Fee 0 ZEC » ; le coût est inclus dans le devis) |
| SOL dépensé pour le dépôt | 0.00156844 SOL, dont 0.00008 SOL de frais réseau |
| Minimum | Aucun minimum atteint. solswap indiquait un dépôt minimum de 0.00000001 ZEC, et near.com a accepté 0.0026 ZEC |
| Dépôt, de Phantom à solswap | 9 secondes |
| Retrait, de la signature sur near.com au ZEC dans le wallet Zcash | Environ 8 minutes (near.com en estimait environ 2) |

Enregistrements : dépôt Solana [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) dans le bloc 3,498,141. Les frais et délais changent selon la charge du réseau ; l’écran de vérification fait donc foi lorsque vous effectuez l’opération.

Le bridge de NEAR publie un minimum de 0.01 ZEC et des frais de 0.00047 ZEC pour ses retraits standard Zcash. near.com n’a appliqué ni l’un ni l’autre à nos 0.0026 ZEC. Si une application refuse un petit montant, essayez near.com avant de recharger votre solde.

### Autres itinéraires et la confiance requise par chacun

Chaque itinéraire depuis Solana fait confiance au OmniBridge, car le bridge détient le ZEC qui garantit votre token. En plus de cela :

- **L’itinéraire ci-dessus** fait confiance à NEAR Intents. Votre signature autorise le transfert, les solveurs livrent le ZEC du côté Zcash, et NEAR Intents peut retenir des fonds pour contrôle de conformité ; en 2026, un détenteur de Zcash a [signalé qu’un important échange avait été retenu pendant des semaines](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). Vous connectez également votre wallet à deux sites web ; vérifiez donc la barre d’adresse à chaque fois.
- **Les wallets intégrant NEAR Intents** (recherchez la fonctionnalité NEAR Intents dans le [répertoire](/wallets)) utilisent le même système depuis l’intérieur du wallet Zcash. Même confiance requise, moins de sites web. Nous ne l’avons pas testé avec ZEC sur Solana.
- **Un exchange**, uniquement s’il accepte les dépôts de ce token sur le réseau Solana, ce que la plupart ne font pas. Vous lui confiez la garde et généralement votre identité, et de nombreux exchanges n’envoient du ZEC que vers des adresses `t1`. Consultez les [exchanges custodiaux](/using-zcash/custodial-exchanges).

---

## Blindez-le et vérifiez

Il est arrivé blindé. Notre ZEC a été envoyé vers une adresse `u1` et est arrivé directement dans le pool blindé Ironwood. Il n’y a eu aucune étape transparente ni rien à blinder manuellement. Le wallet l’a affiché comme **Receiving…** avec une icône de bouclier à 16:07 (UTC+1), pendant qu’il collectait les confirmations.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](/content-images/12-zodl-receiving-cb9f41511d.webp)

Pour le vérifier vous-même, ouvrez la transaction dans votre wallet et copiez l’identifiant de transaction.

![Zcash wallet transaction details with the transaction ID and timestamp](/content-images/13-zodl-tx-details-b08434d680.webp)

Collez-le dans [l’explorateur de blocs Zcash](https://mainnet.zcashexplorer.app). Ne vous laissez pas dérouter par le récapitulatif. Le nôtre indique **Shielded Inputs / Outputs 0 / 0** et **Transferred from/to shielded pool 0.0 ZEC**, car le récapitulatif de l’explorateur ne comptabilise pas encore Ironwood. Les adresses `t1` que vous voyez se trouvent du côté de l’envoi (le ZEC dépensé et la monnaie rendue conservée), et non du vôtre.

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](/content-images/14-explorer-summary-6153afb265.webp)

Cliquez sur **Raw TX: JSON** et recherchez `ironwood`. Une valeur `valueBalance` négative représente du ZEC entrant dans le pool Ironwood. La nôtre était `-0.00241336`, exactement le montant arrivé, et rien dans la transaction ne révèle qui l’a reçu.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[Ce qu’un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see) explique le reste des champs.

### Si vous collez une adresse `t1`

Nous n’en avons pas utilisé, mais le résultat est prévisible. Le ZEC arrive dans le solde transparent de votre wallet, et l’explorateur affiche à tout jamais votre adresse `t1` et le montant à toute personne qui le consulte. Un wallet avec blindage automatique le déplace alors vers le pool blindé ; sinon, appuyez sur **Shield**, ce qui coûte de faibles frais réseau. La transaction de blindage est également publique, puisqu’elle dépense depuis votre adresse `t1`. Rien n’est perdu, mais le lien entre ce dépôt et votre wallet reste sur la chaîne. Collez l’adresse `u1`.

---

## Restez prudent

Les nouveaux détenteurs sont ciblés. Presque toutes les arnaques que vous verrez relèvent de l’une de ces catégories :

- **Mauvais type d’adresse.** Une adresse Zcash commence par `u1`, `t1`, `zs` ou `tex1`. Une adresse Solana n’a aucun de ces préfixes. N’envoyez jamais de ZEC natif vers une adresse Solana, et n’envoyez jamais le token Solana vers une adresse Zcash.
- **Services uniquement transparents.** Certains bridges, sites d’échange et exchanges ne peuvent envoyer que vers des adresses `t1`. Cela fonctionne si vous blindez le ZEC dès son arrivée. Ne l’y laissez simplement pas.
- **Faux wallets.** Installez uniquement depuis le lien figurant sur la fiche du [répertoire de wallets](/wallets) ou depuis la fiche officielle de l’app store vers laquelle il mène. De fausses applications de wallets crypto parviennent parfois dans les app stores et ressemblent exactement aux vraies.
- **Hameçonnage de phrase de récupération.** Aucun wallet, bridge, site d’échange, agent de support, modérateur ou airdrop n’a jamais besoin de votre phrase de récupération. Signer un message n’implique jamais de la saisir. Toute personne qui vous la demande tente de vous voler. [Récupérer des fonds](/using-zcash/recovering-funds) traite de la variante « nous allons récupérer votre wallet » de cette arnaque.
- **Tokens frauduleux et sites de « claim ».** Des tokens nommés ZEC, Zcash ou quelque chose d’approchant apparaissent sans sollicitation dans les wallets Solana, souvent avec un lien permettant d’en « claim » davantage. Connecter votre wallet à ce lien peut le vider. Vérifiez l’adresse du contrat en haut de cette page et ignorez tout le reste.
- **Demandes de signature malveillantes.** Une demande « Sign Message » peut déplacer votre solde NEAR Intents sans frais SOL. Ne signez que sur `near.com` ou `solswap.org`, et uniquement lorsque le message mentionne `intents.near` (l’étape 5 ci-dessus indique ce qu’il faut vérifier).
- **Sites imitateurs.** Saisissez vous-même `solswap.org` et `near.com` ou utilisez des favoris. Ne suivez pas les liens reçus dans des messages privés, réponses ou publicités.

---

## Que faire avec du ZEC blindé

- Préservez sa confidentialité quand vous le dépensez : [Utiliser ZEC de manière privée](/guides/using-zec-privately)
- Trouvez les endroits qui l’acceptent : [Où dépenser du ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Envoyez-le avec un message privé joint : [Mémos](/using-zcash/memos)
- Payez quelqu’un sans relier votre identité : [Envoyer de l’argent sans relier son identité](/zcash-use-cases/send-money-without-linking-identity)
