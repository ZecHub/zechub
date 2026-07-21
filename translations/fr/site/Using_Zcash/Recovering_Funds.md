[![Modifier la page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md)

# Récupération des fonds d’un portefeuille Zcash

**Pourquoi conserver votre clé privée ?** 

Les clés privées sont le secret de la sécurité de vos actifs numériques. Il est essentiel de les garder en sécurité et de ne jamais les partager avec des tiers. 

> Dans ce contexte, une **phrase de récupération** peut être considérée comme l’équivalent d’une clé privée.

En gardant le contrôle de vos clés privées, le processus de récupération reste toujours possible. Il existe 2 types de clés privées Zcash (transparentes et blindées), que vous pouvez facilement importer dans votre portefeuille, soit en utilisant la fonction Sweep Funds, soit en les important comme un nouveau compte. En conservant le contrôle de vos clés privées, vous gardez un contrôle total sur vos actifs, ce qui garantit propriété, sécurité et tranquillité d’esprit.

# Sécurité et responsabilité

Il est crucial que les utilisateurs comprennent les risques liés à la gestion des clés privées et qu’ils protègent ces clés contre tout accès non autorisé. La sécurité des fonds dépend de la responsabilité de l’utilisateur dans la protection de ses clés privées.

## Récupération des fonds avec YWallet

YWallet est reconnue comme l’une des meilleures options pour récupérer des fonds inaccessibles, aussi bien à partir de clés privées *transparent only* que de clés privées blindées.

### 1) Importation de clé privée 

1. Téléchargez Ywallet[](https://ywallet.app)

2. Une fois l’application ouverte, cliquez sur « More » en bas à droite

3. Sélectionnez « Accounts »

4. Dans le coin supérieur droit, cliquez sur le signe plus 

![Bouton signe plus](https://i.postimg.cc/xJbVz7gB/plus.png)

5. Activez « Restore an account » 

6. Saisissez la phrase de récupération ou la clé privée

> **Remarque** : Si vous déteniez des fonds dans un portefeuille qui ne prend pas en charge les adresses blindées (Trust, Coinomi, Guarda, etc.), vous devrez utiliser la fonctionnalité « Sweep Funds ».

### 2) Sweep Funds

1. Téléchargez Ywallet[](https://ywallet.app)

2. Une fois l’application ouverte, cliquez sur « More » en bas à droite

3. Faites défiler jusqu’à la section Tools, puis cliquez sur « Sweep »

4. Saisissez votre phrase de récupération (Gap limit analyse les adresses supplémentaires générées par la phrase de récupération)

![Écran Sweep Funds](https://i.postimg.cc/3055CBcN/sweep.png)

5. Saisissez le Value Pool pour la destination que vous souhaitez utiliser (les plateformes d’échange utilisent Transparent)

6. Saisissez l’adresse de destination à laquelle vous souhaitez déposer les fonds. 

## Zkool

Veuillez consulter la documentation détaillée de Zkool pour une autre possibilité de récupération des fonds :

- [Documentation Zkool](https://hhanh00.github.io/zkool2/guide/start.html)
- [Github](https://github.com/hhanh00/zkool2/)

## ZExCavator

ZExCavator est un outil qui récupère (excave !) des ZEC potentiellement perdus :

- [ZExCavator](https://zexcavator.com/)
- [Github](https://github.com/zingolabs/zexcavator)
