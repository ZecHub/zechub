<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Publier un site sur IPFS

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## Introduction à IPFS

IPFS (InterPlanetary File System) est un protocole et un réseau pair-à-pair conçus pour offrir une méthode décentralisée de stockage et de partage de fichiers.

Contrairement au modèle client-serveur traditionnel d'internet, IPFS permet aux utilisateurs de partager des fichiers directement entre eux, au lieu de dépendre d'un serveur centralisé pour stocker et distribuer le contenu.

Dans IPFS, les fichiers sont adressés par leur *contenu*. Chaque fichier reçoit un hachage unique, ou IDENTIFIANT DE CONTENU (CID), calculé à partir de son contenu, et ce hachage sert à récupérer le fichier sur le réseau.

IPFS stocke le contenu sous forme de blocs identifiés par des CID. Ajouter un fichier le stocke sur votre nœud, mais ne le copie pas automatiquement vers d'autres nœuds. Gardez une copie accessible en ligne, ou mettez en place un épinglage à distance, pour que d'autres lecteurs puissent le récupérer. Consultez [IPFS persistance](https://docs.ipfs.tech/concepts/persistence/).

**À lire : [Une introduction à IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Créer votre site

Pour cet exemple, nous créons un site web simple.

[Exemple de site](https://squirrel.surf/)

**Étape 1 :** Si la conception web ne vous est pas familière, rédigez le contenu principal de votre site web : titre, corps du texte, liens vers d'autres pages ou sites et pieds de page.

**Étape 2 :** Utilisez un [modèle HTML!](https://nicepage.com/html-templates) et collez-y le texte que vous avez rédigé aux emplacements correspondants. Vous pouvez aussi créer une feuille de style .CSS pour votre site web.

**Étape 3 :** Placez votre page d'accueil dans `index.html` à la racine du dossier du site. Incluez ses images et son CSS en utilisant des chemins relatifs comme `style.css`, afin qu'ils fonctionnent aussi via une URL de passerelle IPFS.

## Configurer un nœud

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) gère le nœud pour vous. Laissez-le tourner pendant que vous partagez votre site.

Pour la [méthode en ligne de commande](https://docs.ipfs.tech/how-to/command-line-quick-start/), initialisez une seule fois un nouveau dépôt :

```sh
ipfs init
```

Démarrez ensuite le nœud et laissez ce terminal ouvert :

```sh
ipfs daemon
```

Exécutez les commandes suivantes dans un second terminal. Ne lancez pas un second démon si IPFS Desktop gère déjà ce dépôt.

### **Ajouter le dossier du site à IPFS** :

Dans IPFS Desktop, sélectionnez le dossier contenant les fichiers de votre site web à l'aide de l'option Add Folder.


<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

Pour la méthode en ligne de commande, exécutez ceci depuis le répertoire parent du dossier de votre site :

```sh
ipfs add -r folder_name
```

Remplacez `folder_name` par le nom de votre dossier (mettez entre guillemets les noms contenant des espaces). Notez le CID de la dernière ligne `added ... folder_name` : il identifie l'ensemble du répertoire, et pas seulement `index.html`.

### Épingler le site sur IPFS :

La commande `ipfs add` en ligne de commande épingle par défaut le contenu importé localement. Vérifiez l'épinglage du dossier avec :

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Remplacez `YOUR_FOLDER_CID` par le CID obtenu à l'étape précédente ; le résultat doit indiquer `recursive`. L'épinglage protège la copie de ce nœud contre le ramasse-miettes, mais ne maintient pas en ligne un ordinateur éteint. Pour que le contenu reste disponible lorsque votre nœud est hors ligne, mettez en place un [épinglage à distance](https://docs.ipfs.tech/how-to/work-with-pinning-services/) et vérifiez que le service distant a terminé l'épinglage.

### Accéder à votre site web sur IPFS :

Vérifiez d'abord votre site via la passerelle locale à l'adresse `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (utilisez le port de passerelle affiché par votre démon s'il est différent). La barre oblique finale permet aux liens relatifs d'être résolus à l'intérieur du répertoire.

Une passerelle publique comme `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` peut le servir dès qu'elle parvient à récupérer le contenu depuis un nœud accessible. Un aperçu local réussi ne prouve pas que le site est disponible publiquement.

Dans notre cas, le CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Le système de nommage interplanétaire (IPNS) vous permet de mettre à jour les CID IPFS associés à votre site web tout en conservant un lien statique. Il se présente sous la forme d'une clé.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


Dans le menu des paramètres du dossier de votre site, dans l'application de bureau IPFS, sélectionnez Publish to IPNS.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


Clé : « k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n »

Elle permet aussi de consulter notre site via une passerelle : https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS Link

Le site est créé. Il nous faut maintenant un moyen de faire pointer une URL vers le contenu.

Pour `example.com`, ajoutez cet enregistrement DNS en remplaçant `YOUR_FOLDER_CID` par le CID de votre répertoire :

| Type | Nom | Valeur |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Certains fournisseurs DNS ajoutent automatiquement la zone ; dans ce cas, saisissez seulement `_dnslink`. Si vous utilisez le nom IPNS ci-dessus, la valeur peut aussi être `dnslink=/ipns/YOUR_IPNS_NAME`. Consultez [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).


<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


Une fois le DNS propagé, essayez `https://ipfs.io/ipns/example.com/`. Pour servir le site directement à l'adresse `https://example.com/`, il faut aussi une passerelle compatible avec DNSLink et une configuration HTTPS ; l'enregistrement TXT seul ne les met pas en place. Suivez le [guide des domaines personnalisés](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

*Félicitations ! Vous disposez maintenant d'un site web résistant à la censure.*

____

**Ressources**

[Documentation IPFS](https://docs.ipfs.tech/)

[Documentation IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Documentation DNS Link](https://dnslink.io/#introduction)
