<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Récupération des fonds d’un wallet Zcash

**Pourquoi conserver votre clé privée ?**

Les clés privées sont le secret de la sécurité de vos actifs numériques. Il est essentiel de les conserver en lieu sûr et de ne jamais les partager avec des tiers.

> Dans ce contexte, une **phrase de récupération** peut être considérée comme l’équivalent d’une clé privée.

En gardant le contrôle de vos clés privées, le processus de récupération reste toujours possible. Il existe 2 types de clés privées Zcash (transparentes et blindées), que vous pouvez facilement importer dans votre wallet, soit en utilisant la fonction Sweep Funds, soit en les important comme nouveau compte. En gardant le contrôle de vos clés privées, vous conservez un contrôle total sur vos actifs, ce qui garantit la propriété, la sécurité et la tranquillité d’esprit.

# Sécurité et responsabilité

Il est crucial que les utilisateurs comprennent les risques liés à la manipulation des clés privées et qu’ils les protègent contre tout accès non autorisé. La sécurité des fonds dépend de la responsabilité de l’utilisateur dans la protection de ses clés privées.

> **Avant de commencer :** les guides de récupération pointaient autrefois vers Ywallet. Son développeur a confirmé qu’il ne sera pas mis à jour pour la mise à niveau réseau Ironwood (NU6.3), il ne peut donc plus suivre la chaîne. Utilisez **Zkool**, qui vient du même développeur et constitue le successeur maintenu. Voir [Ywallet n’est plus maintenu](#ywallet-is-no-longer-maintained) en bas de cette page.

## Récupération des fonds avec Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) est le successeur de Ywallet, par le même développeur, et prend en charge la récupération transparente et blindée.

Deux situations sont couvertes ici :

1. **Restaurer un compte** à partir d’une phrase de récupération, d’une clé privée ou d’une viewing key
2. **Balayer les fonds** hors d’un wallet qui n’a pris en charge que des adresses transparentes

### 1) Restaurer un compte

1. Installez Zkool depuis la [page des releases](https://github.com/hhanh00/zkool2/releases) et ouvrez-le
2. Dans le **Gestionnaire de comptes** (la page principale), appuyez sur le bouton **+** pour accéder à l’écran **Nouveau compte**
3. Saisissez un **Nom du compte** pour identifier ce compte
4. Activez **Restore Account?**. Cela fait apparaître les champs de clé et de hauteur de naissance
5. Collez votre clé dans **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool accepte une phrase de récupération, une clé secrète Sapling, une clé étendue transparente ou une viewing key
6. Saisissez une **Birth Height** si vous savez approximativement quand le wallet a été utilisé pour la première fois. Cela indique à Zkool où commencer l’analyse, ce qui fait gagner beaucoup de temps

![Écran Nouveau compte de Zkool avec Restore Account et Advanced Options tous deux activés](/content-images/zkool-restore-account-60b1d2777e.webp)

> **Pas de hauteur de naissance ?** Laissez le champ vide et confirmez l’avertissement. Zkool analysera depuis le début de la chaîne, ce qui est plus lent mais ne manquera rien. Si vos fonds datent d’avant la mise à niveau Sapling d’octobre 2018, laissez le champ vide plutôt que de deviner une hauteur plus récente, sinon l’analyse peut ignorer complètement vos transactions.

7. Enregistrez le compte, puis synchronisez-le

### Restaurer une seed provenant d’un autre wallet

Si la seed provient d’un autre wallet et que le solde semble incorrect après synchronisation, la dérivation de l’adresse de change en est généralement la cause.

Activez l’interrupteur **Advanced Options**, plus bas sur le même écran Nouveau compte, puis activez **Use Internal Change** avant d’enregistrer.

Tous les wallets ne dérivent pas les adresses de change de la même manière. Restaurer une seed ZODL dans Zkool sans ce réglage peut afficher un solde auquel il manque vos notes de change, ce qui donne l’impression que des fonds sont perdus alors que ce n’est pas le cas. L’infobulle de Zkool pour cet interrupteur fait encore référence à Zashi, qui est l’ancien nom de ZODL.

Deux autres champs se trouvent sous **Advanced Options** :

- **Extra Passphrase (optional)**, uniquement si le wallet d’origine en utilisait une
- **Account Index**, si le wallet d’origine contenait plusieurs comptes sur une même seed. Les fonds peuvent se trouver sous un index différent

> **Ces deux champs n’apparaissent que lorsqu’une phrase de récupération valide est présente dans le champ Key.** Si le champ est vide, ou contient une clé privée ou une viewing key, Zkool n’affiche que **Use Internal Change** et **H/W Ledger**. Collez d’abord la seed, puis ouvrez Advanced Options.

### 2) Balayer les fonds depuis un wallet transparent uniquement

Si vos fonds se trouvent dans un wallet qui n’a jamais pris en charge les adresses blindées (Trust, Coinomi, Guarda et similaires), restaurez d’abord le compte, puis déplacez les fonds vers la pool blindée.

1. Restaurez le compte en suivant les étapes ci-dessus
2. Ouvrez le compte et accédez à la page **Receive Funds**
3. Appuyez sur la loupe dans la barre supérieure (**Find other transparent addresses**). Les wallets qui font tourner les adresses, comme Ledger et Exodus, génèrent de nombreuses adresses transparentes à partir d’une seule seed, et cela permet de trouver celles qui contiennent des fonds
4. **Réinitialisez et resynchronisez ensuite le compte.** Les adresses nouvellement trouvées ne récupèrent leur solde qu’au scan suivant ; si vous sautez cette étape, vous aurez l’impression que le balayage n’a rien trouvé
5. Allez à la page **Send**. Près du solde, vous trouverez trois boutons d’icône. Ils n’ont pas d’étiquette textuelle, donc survolez-les ou appuyez longuement pour voir leur nom :
   - **Shield One** (bouclier contour) déplace une adresse transparente à la fois
   - **Shield All** (bouclier plein) déplace tout depuis toutes les adresses transparentes en une seule fois
   - **Unshield All** (cadenas ouvert) fait l’inverse, vers une adresse transparente

> **Shield One est l’option la plus privée.** Blinder plusieurs adresses dans une seule transaction les relie publiquement comme appartenant à la même personne. Zkool avertit lui-même de cela avant d’exécuter Shield All.

6. Vérifiez la transaction et envoyez-la

Unshield All est utile lors d’un retrait vers un exchange qui n’accepte que des adresses transparentes. Les boutons de blindage n’apparaissent que si le compte possède une adresse blindée, et Unshield All seulement s’il possède une adresse transparente.

## Fonds récupérés et la pool Ironwood

Depuis l’activation de la mise à niveau Ironwood (NU6.3) le 28 juillet 2026, la pool Orchard est en dépense uniquement. Aucune nouvelle valeur ne peut y entrer, et la valeur existante en sort via le turnstile vers Ironwood.

Si vos fonds récupérés se trouvent dans Orchard, ils devront migrer avant de se comporter normalement. Ouvrez le menu du compte et choisissez **Note Migration**. L’option n’apparaît que lorsqu’il y a réellement quelque chose à migrer.

L’écran s’intitule **Orchard to Ironwood Migration** et s’exécute en deux phases. D’abord, il divise les notes non standard en dénominations standard, puis il déplace ces notes une à la fois. **Migration Speed** est un curseur allant de Ultra Fast à Slow qui définit le délai aléatoire entre les étapes. **Start Migration** exécute le processus par étapes en arrière-plan, et vous pouvez fermer la page puis reprendre plus tard. **One Shot** effectue l’opération en un seul passage.

Chaque étape est sa propre transaction, donc chacune paie des frais.

> **Les montants de migration sont publics.** Lorsque la valeur franchit le turnstile, le montant et la hauteur de bloc sont visibles sur la chaîne, même si l’expéditeur et le destinataire restent blindés. Des montants distinctifs peuvent vous identifier, il vaut donc mieux privilégier la migration par étapes à une vitesse plus lente plutôt que one shot, et envisager de faire passer votre connexion par Tor ou un VPN au préalable afin que votre adresse IP ne soit pas liée au montant que vous avez déplacé.

## Récupération approfondie avec ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) est un outil de récupération de Zingo Labs pour les cas où une restauration normale ne fonctionne pas, par exemple avec un fichier wallet endommagé ou partiel.

> Sa dernière mise à jour est antérieure aux récentes mises à niveau réseau, considérez-le donc comme un dernier recours et vérifiez toute clé récupérée dans un wallet maintenu avant de vous fier au résultat.

## Ywallet n’est plus maintenu

Ywallet a longtemps été l’outil de récupération recommandé sur cette page, et de nombreux anciens guides pointent encore vers lui.

Son développeur a confirmé qu’il ne sera pas mis à jour pour Ironwood. Un wallet qui ne prend pas en charge les règles de consensus actuelles ne peut pas construire de transactions valides, il ne peut donc plus être utilisé pour déplacer des fonds récupérés. **Zkool**, par le même développeur, est le successeur maintenu et c’est celui que cette page utilise désormais.

Si vous avez déjà des fonds dans Ywallet, restaurez la même phrase de récupération dans Zkool en suivant les étapes ci-dessus.

## Pages liées

- [Wallets](/using-zcash/wallets) - quels wallets sont maintenus et leur état de préparation pour Ironwood
- [Ironwood](/zcash-tech/ironwood) - ce que la mise à niveau a changé et pourquoi les fonds migrent
- [Mémos](/using-zcash/memos) - comment fonctionnent les mémos chiffrés
- [Viewing Keys](/zcash-tech/viewing-keys) - accès en lecture seule sans pouvoir de dépense
