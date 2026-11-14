<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Vous avez des ZEC sur Solana ? Transférez-les vers des Zcash protégés

Cette page s'adresse à vous si des ZEC sont apparus dans votre portefeuille Solana parce que vous détenez des ZCAT, ou un autre jeton Solana qui rémunère ses détenteurs en ZEC. Vous n'avez rien à vendre pour suivre ce guide. Vous transférerez les ZEC que vous possédez déjà de Solana vers un portefeuille Zcash, où ils seront protégés.

Nous avons suivi chacune des étapes ci-dessous avec un vrai transfert le 27 septembre 2026, en partant de 0,00266336 ZEC dans Phantom. Les frais, les délais et les écrans présentés sur cette page sont ceux que nous avons constatés.

---

## En bref

- Les ZEC de votre portefeuille Solana sont un **jeton Solana** (mint `A7bd…QXaS`) adossé à 1:1 à de vrais ZEC que le NEAR OmniBridge détient sur la chaîne Zcash. Ce sont des « ZEC papier » qui vivent sur le registre public de Solana et qui ne peuvent pas y être protégés.
- Le parcours se fait en deux étapes : **déposez** le jeton sur solswap.org (NEAR Intents), puis **retirez-le** sur near.com vers l'adresse `u1` protégée de votre portefeuille. N'utilisez pas le bouton Swap de Phantom lui-même : il ne vous sera d'aucune aide.
- Utilisez un portefeuille que l'[ZecHubannuaire](/wallets) indique comme **Ironwood: Ready**, et gardez un peu de SOL dans Phantom pour les frais Solana.
- Notre test réel (27 septembre 2026, 0,00266336 ZEC) : le dépôt est arrivé en 9 secondes, le retrait a pris environ 8 minutes, pour un coût total d'environ 0,00025 ZEC + 0,0016 SOL.
- Règle de sécurité : ne signez des demandes de message que sur `near.com`/`solswap.org` avec `intents.near` dans le message, ne saisissez jamais votre phrase de récupération, et collez une `u1`, jamais une `t1`.

## Analogie visuelle

Les ZEC sur Solana fonctionnent comme un **jeton de casino**. Leur prix est celui de l'argent liquide, et le casino, c'est-à-dire le NEAR OmniBridge, promet de vrais billets (des ZEC natifs) à quiconque rapporte le jeton. Mais le jeton n'est qu'une ligne dans le registre du casino : tout le monde peut voir qui le détient, et sa valeur dépend de la solidité des systèmes du casino. Retirer via near.com revient à se rendre à la caisse pour échanger le jeton. Une fois les billets dans un pool protégé, ils sont dans votre propre portefeuille opaque : personne ne peut plus voir ni le montant ni le détenteur.

---

## Ce que vous détenez réellement

Les ZEC de votre portefeuille Solana sont un jeton sur Solana, et non des pièces sur le réseau Zcash. Le NEAR OmniBridge les émet et détient de vrais ZEC sur la chaîne Zcash pour les garantir ; le pont est actif sur Solana depuis octobre 2025. Sa partie Solana repose sur les messages Wormhole et les Chain Signatures de NEAR, et non sur un client léger Zcash : le côté Solana n'est donc pas plus solide que ces deux systèmes. On parle de « ZEC papier ». Leur cours suit celui des ZEC, mais chaque solde et chaque transfert figure sur le registre public de Solana sous l'adresse de votre portefeuille, et ils ne peuvent pas être protégés tant qu'ils y restent.

Vérifiez que vous détenez bien le vrai jeton. Dans Phantom, appuyez sur **ZEC** et faites défiler jusqu'à **About Zcash**. L'adresse du contrat doit être :

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Panneau « About Zcash » de Phantom montrant l'adresse du contrat A7bd…QXaS sur le réseau Solana](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantom la raccourcit en `A7bd…QXaS` : comparez donc les premiers et les derniers caractères, ou recherchez l'adresse complète sur [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). Tout autre jeton « ZEC » présent dans votre portefeuille, quels que soient son nom ou son logo, n'est pas celui-ci. N'y touchez pas.

---

## Pourquoi les transférer

Les ZEC protégés sont la raison d'être de Zcash. Lorsque vos ZEC se trouvent dans un pool protégé, l'expéditeur, le destinataire et le montant de chaque paiement sont chiffrés sur la chaîne Zcash. Personne ne peut voir votre solde en consultant un explorateur.

Vous détenez déjà des ZEC. En les transférant vers un portefeuille Zcash, vous obtenez ce qui en fait de vrais Zcash, et vous sortez le pont de l'équation : des ZEC natifs dans votre propre portefeuille ne dépendent de personne pour honorer un remboursement.

[Qui peut voir votre paiement Zcash ?](/start-here/who-can-see-your-zcash-payment) explique précisément ce qui reste caché.

---

## Choisissez un portefeuille Zcash

ZecHub ne fait pas ce choix à votre place. Choisissez dans l'[ZecHubannuaire des portefeuilles](/wallets), et vérifiez deux étiquettes sur la fiche du portefeuille avant de l'installer :

- **Ironwood: Ready.** Ironwood est le pool dans lequel arrivent les nouveaux ZEC protégés depuis la [Ironwoodmise à niveau](/zcash-tech/ironwood) du 28 juillet 2026. L'ancien pool Orchard n'accepte plus de nouveaux fonds.
- **Automatic Shielding.** Utile si un paiement arrive en transparent : le portefeuille transfère ces ZEC vers le pool protégé à votre place. Ne considérez pas cette étiquette comme un substitut à **Ironwood: Ready**. Un portefeuille peut proposer l'Automatic Shielding sans pour autant disposer d'un pool Ironwood (c'est actuellement le cas de Edge dans l'annuaire). La plupart des autres portefeuilles affichent plutôt un bouton **Shield**.

Installez le portefeuille à partir du lien figurant sur sa fiche dans l'annuaire, et non à partir d'un résultat de recherche ou d'une publicité. Notez la phrase de récupération sur papier et conservez-la hors ligne.

Votre portefeuille affiche deux types d'adresses :

![Écran Recevoir d'un portefeuille Zcash avec une adresse protégée commençant par u1 et une adresse transparente commençant par t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| Commence par | Type | Ce que le public voit |
|---|---|---|
| `u1` | Adresse unifiée | Rien vous concernant, mais seulement si le paiement arrive dans un pool protégé |
| `t1` | Adresse transparente | Votre adresse et le montant, pour toujours, comme sur Solana |

Utilisez une `u1` que votre portefeuille indique comme protégée. Une `u1` regroupe plusieurs récepteurs, et certains portefeuilles y ajoutent un récepteur transparent à côté du récepteur protégé. Un expéditeur qui ne peut payer que des adresses transparentes utilisera celui-là, et votre paiement arrivera en public alors même que vous avez collé une `u1`. L'adresse protégée de notre portefeuille de test ne contient pas de récepteur transparent, ce cas ne pouvait donc pas se produire. [Pools protégés](/using-zcash/shielded-pools) décrit les récepteurs plus en détail. Certains portefeuilles affichent une nouvelle `u1` chaque fois que vous ouvrez Receive ; c'est normal, et elles vous appartiennent toutes. C'est pour cette raison que la capture d'écran de réception et le champ de destinataire de near.com sur cette page utilisent des préfixes `u1` différents.

Pour notre test, nous avons utilisé ZODL, car c'était le portefeuille que nous avions configuré. Seuls les portefeuilles que l'annuaire indique comme **Ironwood: Ready** peuvent recevoir de nouveaux fonds protégés.

---

## Transférez-les

Le parcours comporte deux parties : déposez vos ZEC dans NEAR Intents depuis Phantom, puis envoyez-les vers votre adresse Zcash. Pour la première partie, nous avons utilisé [solswap.org](https://solswap.org), un site développé par NEAR pour les utilisateurs de Solana, et pour la seconde [near.com](https://near.com), l'application de NEAR elle-même. Le guide [Comment échanger contre des ZEC dans Phantom Wallet](/using-zcash/solswap) de ZecHub décrit plus en détail les écrans de solswap. N'utilisez pas le bouton **Swap** de Phantom lui-même pour cette opération : vous détenez déjà le jeton, et l'échanger ne vous mènera nulle part.

Gardez un peu de SOL dans Phantom pour les frais Solana.

### 1. Déposez vos ZEC sur solswap.org

1. Ouvrez Phantom, allez dans l'onglet du navigateur, saisissez vous-même `solswap.org` et connectez votre portefeuille.
2. Appuyez sur **Deposit**. Réglez **Asset** sur **Zcash**, **Network** sur **Solana** et la méthode sur **Wallet**.
3. Saisissez le montant (ou appuyez sur **Max**) et approuvez la transaction dans Phantom.

![Écran de dépôt de solswap avec Zcash comme actif, Solana comme réseau et Wallet comme méthode](/content-images/03-solswap-deposit-425691e62f.webp)

Notre dépôt a été inclus dans le bloc Solana à 15:09:08 (UTC+1), et solswap l'a affiché comme **Completed** neuf secondes plus tard.

![Historique des dépôts de solswap affichant Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

Vos ZEC se trouvent désormais dans votre solde NEAR Intents. Votre clé Phantom autorise chaque sortie de fonds, les solveurs NEAR Intents effectuent la livraison, et NEAR Intents peut bloquer un solde pour un contrôle de conformité (voir les remarques sur la confiance ci-dessous).

### 2. Envoyez-les vers votre adresse Zcash sur near.com

solswap dispose aussi d'une page **Withdraw**, mais elle n'a pas fonctionné pour nous. Les champs **Received amount** et **Fee** sont restés sur « – » et le bouton ne faisait rien, que nous ayons choisi Zcash ou Solana comme réseau.

![Formulaire de retrait de solswap avec le montant reçu et les frais bloqués sur un tiret](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

Si cela vous arrive, vos ZEC ne sont pas bloqués. Le solde est lié à la clé de votre portefeuille, et non au site web : toute application NEAR Intents à laquelle vous vous connectez avec ce portefeuille peut donc y accéder. Nous avons terminé sur near.com :

1. Rendez-vous sur `near.com` et connectez-vous avec le même portefeuille Phantom.
2. Votre solde solswap apparaît sous **Move legacy assets** (near.com qualifie de « legacy » les soldes provenant d'anciennes applications NEAR Intents). Appuyez sur **Withdraw** sur la ligne ZEC. Vous n'avez pas besoin de **Move**.

![Page « Move legacy assets » de near.com indiquant 0.0026 ZEC avec les boutons « Move » et « Withdraw »](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. Réglez **Network** sur **Zcash**, collez l'adresse `u1` de votre portefeuille dans **Recipient** et comparez les six premiers et les six derniers caractères avec ceux affichés dans votre portefeuille.

![Formulaire « Withdraw legacy asset » de near.com avec Zcash comme réseau et un destinataire u1, réception d'au moins 0.00233164 ZEC, environ 2 minutes](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. Appuyez sur **Review withdrawal**, lisez le récapitulatif et appuyez sur **Send**.

![Écran « Review send » de near.com : réseau Zcash, le destinataire reçoit au moins 0.00233164 ZEC, frais de 0 ZEC, vous payez 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. Phantom vous demande de signer un message (**Sign Message**) pour near.com. C'est cette signature qui autorise NEAR Intents à déplacer votre solde. Elle ne coûte aucun SOL, mais elle n'est pas pour autant sans danger : un site imitant l'original peut afficher la même demande et vider votre solde NEAR Intents grâce à elle. Avant d'appuyer sur **Confirm**, vérifiez tous les points suivants, et appuyez sur **Cancel** si l'un d'eux n'est pas respecté :
   - Le site indiqué dans la demande est `near.com`. (Le dépôt de l'étape 1 était une demande de transaction Phantom ordinaire provenant de `solswap.org` ; vérifiez ce nom de la même manière.)
   - Ouvrez **Message** et trouvez `"verifying_contract": "intents.near"`.
   - Le message est un texte lisible comme sur la capture d'écran. S'il s'agit d'un bloc illisible, ou si le site ne correspond pas à celui de votre barre d'adresse, refusez-le.
   - Il ne vous demande jamais votre phrase de récupération. Signer ne nécessite jamais de la saisir.

![Demande « Sign Message » de Phantom provenant de near.com sur le réseau Solana](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. near.com affiche **Processing send**, **Sending** puis **Complete**. **View on explorer** ouvre l'enregistrement NEAR Intents du transfert.

![Écran d'état de near.com : envoi de 0.0023 ZEC, les trois étapes terminées](/content-images/10-nearcom-complete-c641093c46.webp)

![Enregistrement de l'explorateur NEAR Intents : créé à 3:59:28 PM, retiré vers l'adresse u1 à 4:07:55 PM, avec l'identifiant de la transaction de retrait Zcash](/content-images/11-intents-explorer-f93f87814e.webp)

### Combien a coûté notre test et combien de temps il a pris

| | Notre test |
|---|---|
| ZEC déposés depuis Phantom | 0,00266336 ZEC |
| ZEC reçus dans le portefeuille Zcash | 0,00241336 ZEC, protégés |
| Coût côté ZEC | 0,00025 ZEC (near.com affichait « Fee 0 ZEC » ; le coût est intégré au devis) |
| SOL dépensés pour le dépôt | 0,00156844 SOL, dont 0,00008 SOL de frais de réseau |
| Minimum | Aucun atteint. solswap indiquait un dépôt minimum de 0,00000001 ZEC, et near.com a accepté 0,0026 ZEC |
| Dépôt, de Phantom vers solswap | 9 secondes |
| Retrait, de la signature sur near.com jusqu'aux ZEC dans le portefeuille Zcash | Environ 8 minutes (near.com en estimait environ 2) |

Enregistrements : dépôt Solana [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) dans le bloc 3 498 141. Les frais et les délais varient selon la charge du réseau : c'est donc l'écran de vérification qui fait foi au moment où vous effectuez l'opération.

Le pont de NEAR annonce un minimum de 0,01 ZEC et des frais de 0,00047 ZEC pour ses retraits Zcash standard. near.com n'a appliqué ni l'un ni l'autre à nos 0,0026 ZEC. Si une application refuse un petit montant, essayez near.com avant de recharger.

### Autres parcours et à qui chacun fait confiance

Tout parcours permettant de sortir de Solana suppose de faire confiance au OmniBridge, puisque le pont détient les ZEC qui garantissent votre jeton. En outre :

- **Le parcours ci-dessus** suppose de faire confiance à NEAR Intents. Votre signature autorise le transfert, les solveurs livrent les ZEC côté Zcash, et NEAR Intents peut bloquer des fonds pour un contrôle de conformité ; en 2026, un détenteur de Zcash [a signalé un échange important bloqué pendant des semaines](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). Vous connectez également votre portefeuille à deux sites web : vérifiez donc la barre d'adresse à chaque fois.
- **Les portefeuilles intégrant NEAR Intents** (recherchez la fonctionnalité NEAR Intents dans l'[annuaire](/wallets)) utilisent le même système depuis le portefeuille Zcash. Même niveau de confiance, moins de sites web. Nous ne l'avons pas testé avec des ZEC sur Solana.
- **Un exchange**, uniquement s'il accepte les dépôts de ce jeton sur le réseau Solana, ce que la plupart ne font pas. Vous lui confiez la garde de vos fonds et généralement votre identité, et de nombreux exchanges n'envoient des ZEC que vers des adresses `t1`. Voir [exchanges dépositaires](/using-zcash/custodial-exchanges).

---

## Protégez-les et vérifiez

Ils sont arrivés protégés. Nos ZEC ont été envoyés vers une adresse `u1` et sont arrivés directement dans le pool protégé Ironwood. Il n'y a eu aucune étape transparente ni rien à protéger manuellement. Le portefeuille les a affichés comme **Receiving…** avec une icône de bouclier à 16:07 (UTC+1) pendant la collecte des confirmations.

![Activité du portefeuille Zcash affichant la réception de 0.00241336 ZEC avec une icône de bouclier](/content-images/12-zodl-receiving-cb9f41511d.webp)

Pour vérifier par vous-même, ouvrez la transaction dans votre portefeuille et copiez l'identifiant de transaction.

![Détails d'une transaction dans le portefeuille Zcash avec l'identifiant de la transaction et l'horodatage](/content-images/13-zodl-tx-details-b08434d680.webp)

Collez-le dans [l'explorateur de blocs Zcash](https://mainnet.zcashexplorer.app). Ne vous laissez pas dérouter par le résumé. Le nôtre indique **Shielded Inputs / Outputs 0 / 0** et **Transferred from/to shielded pool 0.0 ZEC**, car le résumé de l'explorateur ne prend pas encore en compte Ironwood. Les adresses `t1` que vous voyez se trouvent du côté de l'expéditeur (les ZEC dépensés et la monnaie conservée), et non du vôtre.

![Résumé de l'explorateur pour la transaction : deux entrées transparentes, une sortie transparente, 0/0 protégé](/content-images/14-explorer-summary-6153afb265.webp)

Cliquez sur **Raw TX: JSON** et recherchez `ironwood`. Une valeur `valueBalance` négative à cet endroit correspond à des ZEC entrant dans le pool Ironwood. La nôtre était de `-0.00241336`, soit exactement ce qui est arrivé, et rien dans la transaction n'indique qui les a reçus.

![JSON de transaction brute avec la section ironwood mise en évidence : valueBalance -0.00241336 (mise en évidence ajoutée)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[Ce qu'un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see) explique les autres champs.

### Si vous collez une adresse `t1`

Nous n'en avons pas utilisé, mais le résultat est prévisible. Les ZEC arrivent dans le solde transparent de votre portefeuille, et l'explorateur affiche votre adresse `t1` et le montant à la vue de tous, de façon permanente. Un portefeuille doté de la protection automatique les transfère ensuite vers le pool protégé ; sinon, appuyez sur **Shield**, ce qui coûte de faibles frais de réseau. La transaction de protection est elle aussi publique, puisqu'elle dépense depuis votre adresse `t1`. Rien n'est perdu, mais le lien entre ce dépôt et votre portefeuille reste inscrit sur la chaîne. Collez la `u1`.

---

## Restez en sécurité

Les nouveaux détenteurs sont ciblés. Presque toutes les arnaques que vous rencontrerez appartiennent à l'une de ces catégories :

- **Mauvais type d'adresse.** Une adresse Zcash commence par `u1`, `t1`, `zs` ou `tex1`. Une adresse Solana ne possède aucun de ces préfixes. N'envoyez jamais de ZEC natifs vers une adresse Solana, et n'envoyez jamais le jeton Solana vers une adresse Zcash.
- **Services uniquement transparents.** Certains ponts, sites d'échange et exchanges ne peuvent envoyer que vers des adresses `t1`. C'est envisageable si vous protégez les ZEC dès leur arrivée. Ne les y laissez simplement pas.
- **Faux portefeuilles.** N'installez qu'à partir du lien figurant sur la fiche de l'[annuaire des portefeuilles](/wallets) ou de la page officielle de la boutique d'applications vers laquelle il renvoie. De fausses applications de portefeuille crypto se glissent bel et bien dans les boutiques d'applications, et elles ressemblent trait pour trait aux vraies.
- **Hameçonnage de la phrase de récupération.** Aucun portefeuille, pont, site d'échange, agent d'assistance, modérateur ni airdrop n'a jamais besoin de votre phrase de récupération. Signer un message ne nécessite jamais de la saisir. Quiconque vous la demande cherche à vous voler. [Récupérer des fonds](/using-zcash/recovering-funds) traite de la variante « nous allons récupérer votre portefeuille » de cette arnaque.
- **Jetons frauduleux et sites de « réclamation ».** Des jetons appelés ZEC, Zcash ou d'un nom approchant apparaissent sans avoir été demandés dans les portefeuilles Solana, souvent accompagnés d'un lien pour en « réclamer » davantage. Connecter votre portefeuille à ce lien peut le vider. Vérifiez l'adresse du contrat indiquée en haut de cette page et ignorez tout le reste.
- **Demandes de signature malveillantes.** Une demande « Sign Message » peut déplacer votre solde NEAR Intents sans aucuns frais en SOL. Ne signez que sur `near.com` ou `solswap.org`, et uniquement si le message mentionne `intents.near` (l'étape 5 ci-dessus indique ce qu'il faut vérifier).
- **Sites imitant les originaux.** Saisissez vous-même `solswap.org` et `near.com`, ou utilisez des favoris. Ne suivez pas de liens provenant de messages privés, de réponses ou de publicités.

---

## Erreurs fréquentes

- **Utiliser le bouton Swap de Phantom** au lieu du processus de dépôt. Vous détenez déjà le jeton : l'échanger revient simplement à troquer des ZEC papier contre un autre jeton, sans vous rapprocher des ZEC natifs.
- **Coller une adresse `t1`**, ou une `u1` qui cache un récepteur transparent, alors que votre portefeuille propose une `u1` uniquement protégée. Le dépôt arrive en public et est lié de façon permanente à votre portefeuille.
- **Croire que les fonds sont bloqués** lorsque la page Withdraw de solswap affiche « – ». Le solde suit votre clé Phantom, et non le site web : terminez le retrait sur near.com.
- **Signer un message sans le vérifier.** Un site imitant l'original peut vider votre solde NEAR Intents avec une seule signature. Le site doit être `near.com` et le message doit contenir `"verifying_contract": "intents.near"`.
- **Confondre les deux symboles « ZEC ».** Le jeton Solana et les Zcash ZEC natifs portent le même nom, mais pas sur le même réseau : envoyer l'un ou l'autre sur l'autre chaîne entraîne leur perte.

## Que faire de vos ZEC protégés

- Préservez votre confidentialité lorsque vous les dépensez : [Utiliser ZEC de manière confidentielle](/guides/using-zec-privately)
- Trouvez des endroits qui les acceptent : [Où dépenser des ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Envoyez-les accompagnés d'un message privé : [Mémos](/using-zcash/memos)
- Payez quelqu'un sans révéler votre identité : [Envoyer de l'argent sans lier son identité](/zcash-use-cases/send-money-without-linking-identity)

---

## Pages connexes

- [Comment échanger contre des ZEC dans Phantom Wallet](/using-zcash/solswap) : les écrans de solswap plus en détail
- [Pools protégés](/using-zcash/shielded-pools) : ce que sont les pools Ironwood/Orchard et comment fonctionnent les récepteurs
- [Qui peut voir votre paiement Zcash ?](/start-here/who-can-see-your-zcash-payment) : ce que la protection cache réellement
- [Portefeuilles](/wallets) : l'annuaire ; vérifiez l'étiquette **Ironwood: Ready**
- [Exchanges dépositaires](/using-zcash/custodial-exchanges) : le compromis que ce parcours permet d'éviter
- [Récupérer des fonds](/using-zcash/recovering-funds) : ce qu'il faut conserver en lieu sûr pour ne jamais perdre l'accès
