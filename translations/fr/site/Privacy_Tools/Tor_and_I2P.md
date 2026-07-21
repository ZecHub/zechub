<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>


# Pourquoi la vie privée est importante

À l’ère numérique, protéger votre [vie privée](https://www.privacyguides.org/en/) est devenu de plus en plus essentiel. Alors que certains peuvent considérer la vie privée comme une cause perdue, ce n’est pas le cas. Votre vie privée est en jeu et devrait être une préoccupation. La vie privée a une valeur considérable, car elle est liée au pouvoir, et il est crucial de veiller à ce que ce pouvoir soit exercé de manière responsable.

## Technologies Tor & I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) est un outil proxy qui utilise le réseau Tor pour établir des connexions pour les applications. Torbot y parvient en acheminant leur trafic via Tor, renforçant ainsi la [vie privée et l’anonymat](https://www.torproject.org/) de ces applications.

## Réseau I2P

Le réseau I2P, également connu sous le nom de [Invisible Internet Project](https://geti2p.net/en/about/intro), est un réseau superposé pair-à-pair entièrement chiffré. Il garantit que le contenu, la source et la destination des messages sont cachés aux observateurs. En d’autres termes, personne ne peut voir l’origine ou la destination du trafic, ni le contenu réel des messages transmis. Le chiffrement utilisé dans I2P garantit un haut niveau de vie privée et d’anonymat pour ses utilisateurs.

## Tor et I2P partagent des fonctionnalités communes, mais présentent aussi des différences significatives. 

Tor et I2P sont tous deux des réseaux pair-à-pair décentralisés et anonymes, mais I2P offre des niveaux de sécurité plus élevés que Tor. Cependant, I2P est principalement conçu pour accéder à des services comme le courrier électronique, le chat et le torrenting au sein de son réseau, et ne peut pas être utilisé pour accéder à l’internet classique. En revanche, Tor permet aux utilisateurs d’accéder au web profond, tout comme I2P, mais il fonctionne aussi comme un navigateur classique pour accéder aux sites web du web de surface.

*Remarque : Pour plus d’informations sur les similitudes et les différences entre Tor et I2P, consultez [ici](https://geti2p.net/en/comparison/tor)*

## Intégrer Tor avec Ywallet sur smartphone

Orbot est un réseau privé virtuel (VPN) gratuit conçu pour les smartphones, qui redirige le trafic de toutes les applications de votre appareil via le réseau Tor.

Suivez les instructions ci-dessous pour connecter Tor à un portefeuille Zcash *(Ywallet)* :

1.  Téléchargez et installez *Orbot* depuis la boutique d’applications.

2.  Après l’installation, un message d’accueil apparaîtra. Continuez vers la page d’accueil de *Orbot* et cliquez sur *'Tor Enabled Apps'.*              

3. Cela affichera une page à l’écran montrant les applications compatibles avec Tor. Recherchez l’application *Ywallet* et assurez-vous qu’elle est sélectionnée.

4. Une demande de connexion pour configurer un VPN apparaîtra, ce qui permettra à *Orbot* de surveiller le trafic réseau. *Orbot* s’initialisera une fois cette autorisation approuvée. 

5. Vérifiez la barre des tâches ou la page d’accueil d’Orbot pour confirmer que Tor fonctionne ; cela est confirmé lorsque vous voyez 'Connected to the Tor network'.

* Pour le tutoriel vidéo, regardez [ici](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing)

*Remarque : Si Tor est bloqué par votre réseau mobile, vous pouvez utiliser un serveur Bridge comme autre moyen de connexion.*


## Comment configurer un portefeuille Zcash avec Torbot sur PC/Bureau

## Prise en charge de Tor dans Zcash ?

* Le navigateur Tor peut être téléchargé depuis le site officiel, vous pouvez accéder au lien [ici](https://www.torproject.org/download/).

 Le moyen le plus pratique d’installer Tor est d’utiliser le Tor Browser Bundle. Si vous préférez les installations headless, vous pouvez choisir d’installer le démon Tor séparément. 

*Remarque : Par défaut, le Tor Browser bundle expose un écouteur SOCKS sur tcp/9150 et le démon Tor expose l’écouteur SOCKS sur tcp/9050.*

* Consultez les [instructions](https://support.torproject.org/apt/) d’installation spécifiques à votre système d’exploitation, fournies par le Tor Project.

## Installer le portefeuille Zcashd

Zcashd est le portefeuille full-node officiel basé sur Linux, mis à jour et maintenu par les développeurs principaux de Electric Coin Company. Il est destiné aux utilisateurs qui souhaitent miner et valider des transactions zcash, ainsi qu’envoyer et recevoir du Zcash.

* Le site officiel pour télécharger le portefeuille Zcashd se trouve [ici](https://electriccoin.co/zcashd/) 

* Installer le portefeuille : lien vers le tutoriel vidéo [ici](https://www.youtube.com/watch?v=hTKL0jPu7X0) fourni par les développeurs du portefeuille Zcash.

##  Exécuter Zcashd sur Tor 

* Afin de configurer Zcashd pour utiliser le proxy SOCKS de Tor, vous pouvez ajouter l’argument de ligne de commande -proxy à la commande du démon.

 Par exemple :

  $ zcashd -proxy=127.0.0.1:9050
      
Sinon, ajoutez la ligne suivante au fichier zcash.conf :

  proxy=127.0.0.1:9050

Pour que les modifications de configuration prennent effet, il est conseillé de redémarrer zcashd.

Notez que cela suppose que le démon Tor est utilisé. Si le Tor Browser Bundle est utilisé, remplacez 9050 par 9150.

De plus, vous pouvez ajouter l’argument de ligne de commande -listenonion pour que le démon génère une adresse .onion à laquelle votre nœud peut être joint.
