<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Publier un site sur IPFS

<a href="">
    <img src="https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg" alt="" width="800" height="400"/>
</a>



## Introduction à IPFS

IPFS (InterPlanetary File System) est un protocole et un réseau pair-à-pair conçus pour créer une méthode décentralisée de stockage et de partage de fichiers.

Contrairement au modèle client-serveur traditionnel d’internet, IPFS permet aux utilisateurs de partager des fichiers directement entre eux, au lieu de s’appuyer sur un serveur centralisé pour stocker et distribuer le contenu.

Dans IPFS, les fichiers sont adressés à l’aide de l’*adressage par contenu*, ce qui signifie que chaque fichier reçoit un hash unique ou un IDENTIFIANT DE CONTENU (CID) basé sur son contenu, et ce hash est utilisé pour récupérer le fichier depuis le réseau.

Lorsqu’un utilisateur ajoute un fichier à IPFS, le fichier est découpé en petites parties appelées blocs, et chaque bloc reçoit un CID. Ces blocs sont ensuite stockés sur différents nœuds du réseau, afin que le fichier puisse être facilement récupéré depuis plusieurs sources.

Cela garantit la redondance et la tolérance aux pannes tout en rendant difficile qu’un seul nœud devienne un point unique de défaillance ou de contrôle.

**Lire : [Une introduction à IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Créer votre site

Pour cet exemple, nous allons créer un site web simple.

[Site d’exemple](https://squirrel.surf/)

**Étape 1 :** Si vous n’êtes pas familier avec le design web, rédigez le contenu principal de votre site web, y compris le titre, le corps principal du texte, avec des liens vers d’autres pages/sites et les pieds de page.

**Étape 2 :** Utilisez un [modèle HTML !](https://nicepage.com/html-templates) Collez le texte que vous avez rédigé en conséquence. Vous pouvez également créer une feuille de style .CSS pour votre site web.

**Étape 3 :** Enregistrez votre répertoire. Toutes les pages .html + les images doivent se trouver dans le même dossier.

## Configurer un nœud

Téléchargez et installez IPFS depuis le [site officiel](https://docs.ipfs.tech/install/ipfs-desktop/).

### Initialiser IPFS :

Si vous utilisez l’application de bureau, vous n’aurez pas besoin de l’initialiser.

En utilisant un terminal ou une invite de commande, exécutez la commande : ipfs init

### **Ajouter le dossier du site à IPFS** :

Sélectionnez le dossier contenant les fichiers de votre site web et accédez à l’option Add Folder.


<a href="">
    <img src="https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png" alt="" width="400" height="200"/>
</a>

–

Si vous utilisez le terminal, exécutez la commande : ipfs add -r folder_name pour ajouter l’ensemble du dossier de manière récursive à IPFS.

### Épingler le site sur IPFS :

Une fois les fichiers de votre site web ajoutés à IPFS, vous devez les **épingler** afin de garantir qu’ils restent disponibles sur le réseau.

–

Si vous utilisez le terminal, exécutez la commande : Si vous utilisez le terminal, exécutez la commande : ipfs pin add **hash**

**hash** = CID du dossier que vous avez ajouté à l’étape précédente.

Vous pouvez également épingler des répertoires à l’aide de services tels que [Pinata](https://pinata.cloud/) ou [Dolpin](https://dolpin.io/)

Cela fait gagner beaucoup de temps !

–

### Accéder à votre site web sur IPFS :

Votre site web est maintenant publié sur IPFS et peut être consulté à l’aide du hash du dossier. Pour accéder à votre site web, vous pouvez visiter https://ipfs.io/ipfs/**hash**

**hash** = CID du dossier.

Dans notre cas, le CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Interplanetary Naming System (IPNS) vous permet de mettre à jour les CID IPFS associés à votre site web tout en continuant à fournir un lien statique. Il est fourni sous forme de clé.


<a href="">
    <img src="https://dnslink.io/assets/dns-query.a0134a75.png" alt="" width="400" height="100"/>
</a>


Dans le menu des paramètres du dossier de votre site sur l’application de bureau IPFS, sélectionnez Publish to IPNS.

<a href="">
    <img src="https://i.ibb.co/Ch25dKf/IPNS.png" alt="" width="400" height="200"/>
</a>


Clé : “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

Elle peut également être utilisée pour consulter notre site via une passerelle : https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## Lien DNS

Le site a été créé, nous avons maintenant besoin d’un moyen pour faire pointer une URL vers le contenu.

Si vous possédez déjà une adresse web, vous pouvez ajouter un nouvel enregistrement en utilisant l’enregistrement TXT _dnslink(votre domaine). Selon le fournisseur, il peut se remplir automatiquement.


<a href="">
    <img src="https://i.ibb.co/MgRxBHj/example.png" alt="" width="400" height="100"/>
</a>


Il faudra du temps pour qu’il se propage sur le réseau avant que vous puissiez le consulter.

*Félicitations ! Vous avez maintenant un site web résistant à la censure.*

____

**Ressources**

[Documentation IPFS](https://docs.ipfs.tech/)

[Documentation IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentation DNS link](https://dnslink.io/#introduction)
