# Affichage des clés

Les adresses protégées permettent aux utilisateurs d'effectuer des transactions tout en révélant le moins d'informations possible sur la blockchain Zcash. Que se passe-t-il lorsque vous devez divulguer des informations sensibles concernant une transaction Zcash protégée à une partie spécifique ? Chaque adresse masquée comprend une clé de visualisation. Les clés de visualisation ont été introduites dans [ZIP 310](https://zips.z.cash/zip-0310) et ajoutées au protocole dans la mise à niveau du réseau Sapling. Les clés de visualisation sont un élément crucial de Zcash car elles permettent aux utilisateurs de divulguer de manière sélective des informations sur les transactions.

### Pourquoi utiliser une clé de visualisation ?

Pourquoi un utilisateur voudrait-il faire cela ? Extrait du blog d'Electric Coin Co. sur le sujet...

*- Un échange veut détecter lorsqu'un client dépose une ZEC sur une adresse protégée, tout en conservant les clés "d'autorisation de dépense" sur du matériel sécurisé (par exemple, des HSM). L'échange pourrait générer une clé de visualisation entrante et la charger sur un nœud de « détection » connecté à Internet, tandis que la clé de dépense reste sur le système le plus sécurisé.*

*- Un dépositaire doit fournir une visibilité sur ses avoirs en Zcash aux auditeurs. Le dépositaire peut générer une clé de visualisation complète pour chacune de ses adresses protégées et partager cette clé avec son auditeur. L'auditeur sera en mesure de vérifier le solde de ces adresses et d'examiner les transactions passées vers et depuis ces adresses.*

*- Un échange peut avoir besoin d'effectuer des contrôles de diligence raisonnable sur un client qui effectue des dépôts à partir d'une adresse masquée. L'échange pourrait demander la clé de visualisation du client pour son adresse protégée et l'utiliser pour examiner l'activité de transaction protégée du client dans le cadre de ces procédures de diligence raisonnable améliorées.*

### Comment trouver votre clé de visualisation

#### zcashd

* Lister toutes les adresses connues en utilisant ` ./zcash-cli listaddresses`

* Ensuite, lancez la commande suivante pour les adresses blindées UA ou Sapling

  `./zcash-cli z_exportviewingkey "<adresse UA ou Z>"`

#### ywallet

* Dans le coin supérieur droit, sélectionnez "Sauvegarder", Authentifiez votre téléphone, puis copiez simplement votre clé de visualisation qui s'affiche.

### Comment utiliser votre clé de visualisation

#### zcashd

* Utilisez ce qui suit avec n'importe quelle vkey ou ukey :

`./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000`

#### ywallet

* Dans le coin supérieur droit, sélectionnez "Compte", cliquez sur "+" dans le coin inférieur droit pour ajouter et importer votre clé de visualisation pour ajouter votre compte "lecture seule".

![myViewKey](https://user-images.githubusercontent.com/81990132/208585568-46065002-6682-4ff4-ae8b-d206205b5d9b.png)


#### zcashblockexplorer.com

* Pointez simplement votre navigateur vers [ici](https://zcashblockexplorer.com/vk) et attendez les résultats ! note : ce résultat est maintenant sur le nœud zcashblockexplorer et donc vous faites confiance à cette information avec les propriétaires de zcashblockexplorer.com

### Ressources

Bien qu'il s'agisse d'une excellente technologie, il est recommandé d'utiliser les touches de visualisation au besoin.

Consultez ce didacticiel sur l'affichage des clés. Une liste de ressources sur le sujet est ci-dessous si vous souhaitez approfondir :

- [ECC, expliquer les clés de visualisation](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, divulgation sélective et clés de visualisation](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)


