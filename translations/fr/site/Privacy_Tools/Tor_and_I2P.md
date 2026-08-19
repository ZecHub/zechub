<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>


# Pourquoi la vie privée est importante

À l’ère numérique, protéger votre [vie privée](https://www.privacyguides.org/en/) est devenu de plus en plus essentiel. Même si certains considèrent que la vie privée est une cause perdue, ce n’est pas le cas. Votre vie privée est en jeu et cela devrait vous préoccuper. La vie privée a une valeur importante parce qu’elle est liée au pouvoir, et il est crucial de veiller à ce que ce pouvoir soit exercé de manière responsable.

## Technologies Tor et I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) est un outil proxy qui utilise le réseau Tor pour établir des connexions pour les applications. Torbot y parvient en faisant transiter leur trafic par Tor, renforçant ainsi la [vie privée et l’anonymat](https://www.torproject.org/) de ces applications.

## Réseau I2P

Le réseau I2P, également connu sous le nom de [Invisible Internet Project](https://geti2p.net/en/about/intro), est un réseau superposé pair à pair entièrement chiffré. Il garantit que le contenu, la source et la destination des messages sont dissimulés aux observateurs. Autrement dit, personne ne peut voir l’origine ou la destination du trafic, ni le contenu réel des messages transmis. Le chiffrement utilisé dans I2P assure un haut niveau de vie privée et d’anonymat à ses utilisateurs.

### Installer I2P

Il existe deux implémentations. Le [Java I2P](https://geti2p.net/en/download) d’origine fonctionne sous Windows, macOS, Linux et Android. [i2pd](https://i2pd.website/), écrit en C++, est plus léger et constitue le choix habituel sur un serveur ou une machine peu puissante.

Une fois lancé, I2P expose une console locale sur `127.0.0.1:7657` et des proxys sur `127.0.0.1:4444` (HTTP) et `127.0.0.1:4447` (SOCKS). Attendez-vous à ce que le premier démarrage prenne plusieurs minutes : I2P doit construire des tunnels à travers le réseau avant que quoi que ce soit fonctionne, et cela devient plus rapide à mesure qu’il reste en ligne plus longtemps.

### Utiliser I2P avec Zcash

Sachez qu’**aucun nœud Zcash actuel ne parle I2P nativement.** Zebra ne prend pas en charge I2P, et zcashd non plus. Si vous voyez un guide prétendant faire fonctionner un nœud Zcash sur I2P, il décrit quelque chose que le logiciel ne fait pas.

Là où I2P est réellement utile ici, c’est pour tout ce qui entoure le wallet : accéder à un site, un forum ou un service sans révéler votre adresse. Pour anonymiser la connexion du wallet lui-même, Tor est aujourd’hui l’option pratique, et les sections ci-dessous l’expliquent.

## Tor et I2P partagent des caractéristiques communes, mais présentent aussi des différences importantes. 

Tor et I2P sont tous deux des réseaux pair à pair décentralisés et anonymes, mais I2P offre des niveaux de sécurité plus élevés que Tor. Toutefois, I2P est principalement conçu pour accéder à des services comme l’e-mail, le chat et le torrenting à l’intérieur de son propre réseau, et ne peut pas être utilisé pour accéder à l’internet classique. Tor, en revanche, permet aux utilisateurs d’accéder au deep web, tout comme I2P, mais il fonctionne aussi comme un navigateur classique pour accéder aux sites du web de surface.

*Remarque : pour plus d’informations sur les similitudes et les différences entre Tor et I2P, consultez [ici](https://geti2p.net/en/comparison/tor)*

## Faire passer un wallet mobile par Tor avec Orbot

Orbot est un réseau privé virtuel (VPN) gratuit conçu pour les smartphones, qui fait transiter le trafic de toutes les applications de votre appareil par le réseau Tor.

Suivez ces instructions pour faire passer un wallet Zcash par Tor. Notez que Ywallet, utilisé dans les versions précédentes de ce guide, n’est plus maintenu et ne suivra plus le réseau après Ironwood ; choisissez donc un wallet maintenu sur la page [Wallets](/using-zcash/wallets).

1.  Téléchargez et installez *Orbot* depuis la boutique d’applications.

2.  Après l’installation, un message d’accueil apparaîtra. Continuez jusqu’à la page d’accueil de *Orbot* et cliquez sur *'Tor Enabled Apps'.*              

3. Cela affichera à l’écran une page montrant les applications compatibles avec Tor. Trouvez votre wallet Zcash dans la liste et assurez-vous qu’il est sélectionné.

4. Une demande de connexion pour configurer un VPN apparaîtra, ce qui permettra à *Orbot* de surveiller le trafic réseau. *Orbot* s’initialisera une fois cette autorisation approuvée. 

5. Vérifiez la barre des tâches ou la page d’accueil d’Orbot pour confirmer que Tor fonctionne ; cela est confirmé lorsque vous voyez « Connected to the Tor network ».

*Remarque : si Tor est bloqué par votre réseau mobile, vous pouvez utiliser un Bridge Server comme autre moyen de connexion.*


## Installer Tor sur PC ou ordinateur de bureau

* Le navigateur Tor peut être téléchargé depuis le site officiel ; vous pouvez accéder au lien [ici](https://www.torproject.org/download/).

 Le moyen le plus pratique d’installer Tor est d’utiliser le Tor Browser Bundle. Si vous préférez une installation sans interface graphique, vous pouvez choisir d’installer le démon Tor séparément. 

*Remarque : par défaut, le bundle Tor Browser expose un écouteur SOCKS sur tcp/9150 et le démon Tor expose l’écouteur SOCKS sur tcp/9050.*

* Consultez les [instructions](https://support.torproject.org/apt/) d’installation spécifiques à votre système d’exploitation, fournies par le Tor Project.

## Faire fonctionner un nœud sur Tor

C’est la partie qui a le plus changé, et la réponse honnête est que c’est actuellement plus difficile qu’avant.

**zcashd a disparu.** Il est arrivé en fin de support et s’est arrêté le 18 juillet 2026 au bloc 3,417,100. Il ne redémarrera pas, sa page de téléchargement renvoie une 404, et le dépôt apt n’est plus servi. Toute instruction vous disant d’exécuter `zcashd -proxy=127.0.0.1:9050` ne s’applique donc plus à rien.

**Zebra ne peut pas encore le faire non plus.** Zebra est le nœud maintenu, et sa crate réseau contient bien du code de connexion isolée pour Tor, mais la fonctionnalité est commentée dans `zebra-network/Cargo.toml` :

```
# tor = ["arti-client", "tor-rtcompat"]
```

La documentation de la crate dit exactement la même chose : *"Tor connections are currently disabled until `arti-client`'s dependency `x25519-dalek v1.2.0` is updated."* La fonction `connect_isolated_tor` est commentée en même temps. Il n’existe donc aujourd’hui aucun moyen pris en charge pour faire fonctionner un nœud Zcash sur Tor.

Si vous avez besoin dès maintenant d’un anonymat au niveau du nœud, l’approche praticable consiste à faire passer la machine entière par Tor ou un VPN au niveau du système d’exploitation, plutôt que de configurer le nœud lui-même. Cela protège votre emplacement réseau sans dépendre de fonctionnalités du nœud qui ne sont pas intégrées.

### Ce que vous pouvez encore faire aujourd’hui

- **Faire passer votre wallet par Tor** avec Orbot sur mobile, comme décrit ci-dessus. C’est l’option pratique pour la plupart des gens, et cela masque votre IP au serveur lightwalletd avec lequel votre wallet communique
- **Utiliser Tor Browser** pour les explorateurs de blocs, les forums et tout autre service pour lequel vous préférez ne pas être relié à votre adresse
- **Souvenez-vous de ce que Tor ne masque pas.** Il anonymise votre emplacement réseau, pas votre activité on-chain. Un envoi depuis une adresse transparente reste public, et une valeur qui passe entre des pools shielded publie toujours le montant. Voir [Shielded Pools](/using-zcash/shielded-pools) pour savoir ce qui reste visible
