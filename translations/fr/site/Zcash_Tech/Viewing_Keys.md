<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Viewing Keys

Les adresses protégées permettent aux utilisateurs d’effectuer des transactions tout en révélant le moins d’informations possible sur la blockchain Zcash. Que se passe-t-il lorsque vous devez divulguer des informations sensibles concernant une transaction Zcash protégée à une partie spécifique ? Chaque adresse protégée comprend une viewing key. Les viewing keys ont été introduites dans [ZIP 310](https://zips.z.cash/zip-0310) et ajoutées au protocole lors de la mise à niveau réseau Sapling. Les viewing keys sont une partie essentielle de Zcash, car elles permettent aux utilisateurs de divulguer sélectivement des informations sur les transactions.

### Pourquoi utiliser une viewing key ?

Pourquoi un utilisateur voudrait-il faire cela ? Extrait du blog d’Electric Coin Co. à ce sujet...

*- Une plateforme d’échange souhaite détecter lorsqu’un client dépose des ZEC vers une adresse protégée, tout en conservant les clés d’**autorité de dépense** sur un matériel sécurisé. La plateforme pourrait générer une incoming viewing key et la charger sur un nœud de **détection** connecté à Internet, tandis que la clé de dépense resterait sur le système plus sécurisé.*

*- Un dépositaire doit fournir aux auditeurs une visibilité sur ses avoirs Zcash. Le dépositaire peut générer une full viewing key pour chacune de ses adresses protégées et partager cette clé avec son auditeur. L’auditeur pourra vérifier le solde de ces adresses et examiner l’activité passée des transactions vers et depuis ces adresses.* 

*- Une plateforme d’échange peut devoir effectuer des vérifications de diligence raisonnable sur un client qui effectue des dépôts depuis une adresse protégée. La plateforme pourrait demander la viewing key du client pour son adresse protégée et l’utiliser pour examiner l’activité des transactions protégées du client dans le cadre de ces procédures renforcées de diligence raisonnable.*

### Comment trouver votre viewing key

#### zcashd

* Listez toutes les adresses connues en utilisant *./zcash-cli listaddresses*

* Ensuite, exécutez la commande suivante pour les UA ou les adresses protégées Sapling

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet

* Dans le coin supérieur droit, sélectionnez "Backup", authentifiez votre téléphone, puis copiez simplement votre viewing key affichée.

### Comment utiliser votre viewing key

#### zcashd

* Utilisez la commande suivante avec n’importe quelle vkey ou ukey : 

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### ywallet

* Dans le coin supérieur droit, sélectionnez "Account", cliquez sur "+" en bas à droite pour ajouter et importer votre viewing key afin d’ajouter votre compte en 'lecture seule'.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com

* Rendez-vous simplement [ici](https://zcashblockexplorer.com/vk) dans votre navigateur et attendez les résultats ! Remarque : ce résultat se trouve désormais sur le nœud de zcashblockexplorer et vous confiez donc ces informations aux propriétaires de zcashblockexplorer.com

### Ressources

Bien qu’il s’agisse d’une excellente technologie, il est recommandé d’utiliser les viewing keys uniquement lorsque cela est nécessaire.

Consultez ce tutoriel sur les viewing keys. Une liste de ressources sur le sujet se trouve ci-dessous si vous souhaitez aller plus loin :

- [ECC, Explication des Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgation sélective et Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Présentation vidéo de la Viewing Key Zcash](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
