<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Publier un site web sur IPFS

![](https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg)

## Introduction à IPFS

IPFS (InterPlanetary File System) est un protocole et un réseau pair-à-pair conçus pour créer une méthode décentralisée de stockage et de partage de fichiers.

Contrairement au modèle client-serveur traditionnel d’internet, IPFS permet aux utilisateurs de partager des fichiers directement entre eux, plutôt que de dépendre d’un serveur centralisé pour stocker et distribuer le contenu.

Dans IPFS, les fichiers sont adressés à l’aide de l’*adressage par le contenu*, ce qui signifie que chaque fichier reçoit un hash unique ou un IDENTIFIANT DE CONTENU (CID) basé sur son contenu, et ce hash est utilisé pour récupérer le fichier depuis le réseau.

Lorsqu’un utilisateur ajoute un fichier à IPFS, le fichier est découpé en petits morceaux appelés blocs, et chaque bloc reçoit un CID. Ces blocs sont ensuite stockés sur différents nœuds du réseau, afin que le fichier puisse être facilement récupéré depuis plusieurs sources.

Cela garantit la redondance et la tolérance aux pannes, tout en rendant difficile pour un seul nœud de devenir un point unique de défaillance ou de contrôle.

Lisez [Une introduction à IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Créer votre site

Pour cet exemple, nous allons créer un site web simple.

[Site d’exemple](https://squirrel.surf)


**Étape 1 :** Si vous n’êtes pas familier avec la conception web, rédigez le contenu principal de votre site web, y compris le titre, le corps principal du texte, avec des liens vers d’autres pages/sites et les pieds de page.

**Étape 2 :** Utilisez un [modèle HTML !](https://nicepage.com/html-templates) Collez le texte que vous avez rédigé en conséquence. Vous pouvez également créer une feuille de style .CSS pour votre site web.

**Étape 3 :** Enregistrez votre répertoire. Toutes les pages .html + les images doivent se trouver dans le même dossier.



## Configurer un nœud

Téléchargez et installez IPFS depuis le [site officiel](https://docs.ipfs.tech/install/ipfs-desktop/).



### Initialiser IPFS :

Si vous utilisez l’application Desktop, vous n’aurez pas besoin d’initialiser.

En utilisant un terminal ou une invite de commande, exécutez la commande : <mark>ipfs init </mark>.



**Ajouter le dossier du site à IPFS :**

Sélectionnez le dossier contenant les fichiers de votre site web et accédez à l’option Add Folder.

![](https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png)

--

Si vous utilisez le terminal, exécutez la commande : <mark>ipfs add -r "folder_name"</mark> pour ajouter récursivement l’ensemble du dossier à IPFS.


### Épingler le site sur IPFS :

Une fois les fichiers de votre site web ajoutés à IPFS, vous devez les **épingler** pour vous assurer qu’ils restent disponibles sur le réseau.

--

Si vous utilisez le terminal, exécutez la commande : Si vous utilisez le terminal, exécutez la commande : <mark>ipfs pin add "hash"</mark>

"hash" = CID du dossier que vous avez ajouté à l’étape précédente.


Sinon, vous pouvez également épingler des répertoires en utilisant des services tels que [Pinata](https://pinata.cloud) ou [Dolpin](https://dolpin.io)

Cela fait gagner beaucoup de temps !

--

### Accéder à votre site web sur IPFS :

Votre site web est maintenant publié sur IPFS et peut être consulté à l’aide du hash du dossier. Pour accéder à votre site web, vous pouvez visiter https://ipfs.io/ipfs/"hash"

"hash" = CID du dossier.

Dans notre cas, le CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS

Interplanetary Naming System (IPNS) vous permet de mettre à jour les CID IPFS associés à votre site web tout en continuant à fournir un lien statique. Il est fourni sous forme de clé.

![](https://dnslink.io/assets/dns-query.a0134a75.png)

Dans le menu des paramètres de votre dossie de site sur l’application IPFS Desktop, sélectionnez Publish to IPNS.

![](https://i.ibb.co/Ch25dKf/IPNS.png)

Clé : "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Elle peut également être utilisée pour consulter notre site via une passerelle : https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## Lien DNS

Le site a été créé, nous avons maintenant besoin d’un moyen de faire pointer une URL vers le contenu.

Si vous possédez déjà une adresse web, vous pouvez ajouter un nouvel enregistrement en utilisant l’enregistrement TXT "_dnslink(your domain)". Selon le fournisseur, il peut se remplir automatiquement.

![](https://i.ibb.co/MgRxBHj/example.png)

Il faudra du temps pour qu’il se propage à travers le réseau avant que vous puissiez le consulter.

Félicitations ! Vous avez mis en place un site web résistant à la censure.


**Ressources**

[Documentation IPFS](https://docs.ipfs.tech)

[Documentation IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentation DNS link](https://dnslink.io/#introduction)
