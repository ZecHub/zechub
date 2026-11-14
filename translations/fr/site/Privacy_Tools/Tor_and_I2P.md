<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Pourquoi la confidentialité est importante

## En bref

- **Tor** fait passer votre trafic par trois relais et fonctionne aussi bien pour le web classique que pour les services onion : c'est aujourd'hui l'option par défaut la plus pratique pour anonymiser les connexions de votre portefeuille et votre navigation
- **I2P** est un réseau superposé pair à pair entièrement chiffré, conçu pour ses propres services internes ; **aucun nœud Zcash actuel ne prend en charge I2P nativement**
- **Sur mobile :** faites passer un portefeuille Zcash par Tor en quelques gestes avec Orbot (« Tor Enabled Apps »)
- **Faire fonctionner un nœud Zcash via Tor n'est pas possible pour le moment :** `zcashd` a atteint sa fin de prise en charge le 18 juillet 2026, et la fonctionnalité Tor de Zebra est toujours désactivée en amont
- Tor masque *où vous vous trouvez*, pas *ce que vous faites on-chain* : les transactions transparentes restent publiques

À l'ère numérique, protéger votre [confidentialité](https://www.privacyguides.org/en/) est devenu de plus en plus essentiel. Certains considèrent la confidentialité comme une cause perdue, mais ce n'est pas le cas. Votre confidentialité est en jeu et devrait vous préoccuper. La confidentialité a une grande valeur, car elle est liée au pouvoir, et il est crucial de veiller à ce que ce pouvoir soit exercé de manière responsable.

## Les technologies Tor et I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) est un outil proxy qui utilise le réseau Tor pour établir les connexions des applications. Tor y parvient en faisant passer leur trafic par Tor, ce qui renforce la [confidentialité et l'anonymat](https://www.torproject.org/) de ces applications.

## Le réseau I2P

Le réseau I2P, également appelé [Invisible Internet Project](https://geti2p.net/en/about/intro), est un réseau superposé pair à pair entièrement chiffré. Il garantit que le contenu, la source et la destination des messages sont cachés aux observateurs. Autrement dit, personne ne peut voir l'origine ou la destination du trafic, ni le contenu réel des messages transmis. Le chiffrement utilisé dans I2P assure un haut niveau de confidentialité et d'anonymat à ses utilisateurs.

### Installer I2P

Il existe deux implémentations. L'implémentation d'origine, [Java I2P](https://geti2p.net/en/download), fonctionne sous Windows, macOS, Linux et Android. [i2pd](https://i2pd.website/), écrite en C++, est plus légère et constitue le choix habituel sur un serveur ou une machine peu puissante.

Une fois lancé, I2P expose une console locale sur `127.0.0.1:7657` et des proxys sur `127.0.0.1:4444` (HTTP) et `127.0.0.1:4447` (SOCKS). Attendez-vous à plusieurs minutes de patience au premier démarrage : I2P doit construire des tunnels à travers le réseau avant que quoi que ce soit ne fonctionne, et il devient plus rapide à mesure qu'il reste en ligne.

### Utiliser I2P avec Zcash

Sachez qu'**aucun nœud Zcash actuel ne prend en charge I2P nativement.** Zebra ne prend pas en charge I2P, et zcashd ne le faisait pas non plus. Si vous voyez un guide prétendant faire fonctionner un nœud Zcash via I2P, il décrit quelque chose que le logiciel ne fait pas.

Ce pour quoi I2P est réellement utile ici, c'est tout ce qui entoure le portefeuille : accéder à un site, un forum ou un service sans révéler votre adresse. Pour anonymiser la connexion du portefeuille elle-même, Tor est aujourd'hui l'option pratique, et les sections ci-dessous la décrivent.

## Tor et I2P ont des points communs, mais aussi des différences importantes

Tor et I2P sont tous deux des réseaux pair à pair décentralisés et anonymes, mais I2P offre un niveau de sécurité plus élevé que Tor. Cependant, I2P est principalement conçu pour accéder à des services comme le courrier électronique, la messagerie instantanée et le torrent au sein de son propre réseau, et ne permet pas d'accéder à l'internet classique. Tor, en revanche, permet aux utilisateurs d'accéder au deep web, tout comme I2P, mais il fonctionne aussi comme un navigateur classique pour consulter les sites du web de surface.

*Remarque : pour en savoir plus sur les similitudes et les différences entre Tor et I2P, consultez [cette page](https://geti2p.net/en/comparison/tor)*

## Faire passer un portefeuille mobile par Tor avec Orbot

Orbot est un réseau privé virtuel (VPN) gratuit conçu pour les smartphones, qui fait passer le trafic de toutes les applications de votre appareil par le réseau Tor.

Suivez ces instructions pour faire passer un portefeuille Zcash par Tor. Notez que YWallet, utilisé dans les versions précédentes de ce guide, n'est plus maintenu et ne suivra pas le réseau après Ironwood : choisissez donc un portefeuille maintenu sur la page [Portefeuilles](/using-zcash/wallets).

1.  Téléchargez et installez *Orbot* depuis la boutique d'applications.

2.  Après l'installation, un message de bienvenue s'affiche. Continuez jusqu'à la page d'accueil de *Orbot* et cliquez sur *« Tor Enabled Apps ».*              

3. Une page s'affiche alors à l'écran avec les applications compatibles avec Tor. Trouvez votre portefeuille Zcash dans la liste et assurez-vous qu'il est sélectionné.

4. Une demande de connexion pour configurer un VPN s'affiche, ce qui permettra à *Orbot* de surveiller le trafic réseau. *Orbot* s'initialisera une fois cette autorisation accordée. 

5. Vérifiez dans la barre des tâches ou sur la page d'accueil de Orbot que Tor est en cours d'exécution ; c'est confirmé lorsque vous voyez « Connected to the Tor network ».

*Remarque : si Tor est bloqué par votre réseau mobile, vous pouvez utiliser un serveur pont comme autre moyen de connexion.*


## Installer Tor sur PC ou ordinateur de bureau

* Le navigateur Tor peut être téléchargé depuis le site officiel ; vous pouvez accéder au lien [ici](https://download.torproject.org/).

 La façon la plus pratique d'installer Tor est de passer par le Tor Browser Bundle. Si vous préférez une installation sans interface graphique, vous pouvez installer le démon Tor séparément. 

*Remarque : par défaut, le Tor Browser Bundle expose un écouteur SOCKS sur tcp/9150 et le démon Tor expose l'écouteur SOCKS sur tcp/9050.*

* Consultez les [instructions](https://support.torproject.org/little-t-tor/getting-started/installing/) d'installation propres à votre système d'exploitation fournies par le Tor Project.

## Faire fonctionner un nœud via Tor

C'est la partie qui a le plus changé, et la réponse honnête est que c'est actuellement plus difficile qu'auparavant.

**zcashd n'existe plus.** Il a atteint sa fin de prise en charge et s'est arrêté le 18 juillet 2026 au bloc 3 417 100. Il ne redémarrera pas, sa page de téléchargement renvoie une erreur 404 et le dépôt apt n'est plus servi. Toute instruction vous demandant d'exécuter `zcashd -proxy=127.0.0.1:9050` ne s'applique plus à rien.

**Zebra ne le permet pas encore non plus.** Zebra est le nœud maintenu, et son crate réseau contient bien du code de connexion isolée pour Tor, mais la fonctionnalité est commentée dans `zebra-network/Cargo.toml` :

```
# tor = ["arti-client", "tor-rtcompat"]
```

La documentation du crate le dit clairement : *« Les connexions Tor sont actuellement désactivées jusqu'à la mise à jour de la dépendance `x25519-dalek v1.2.0` de `arti-client`. »* La fonction `connect_isolated_tor` est commentée elle aussi. Il n'existe donc aujourd'hui aucun moyen pris en charge de faire fonctionner un nœud Zcash via Tor.

Si vous avez besoin dès maintenant d'anonymat au niveau du nœud, l'approche réaliste consiste à placer toute la machine derrière Tor ou un VPN au niveau du système d'exploitation, plutôt que de configurer le nœud lui-même. Cela protège votre emplacement sur le réseau sans dépendre de fonctionnalités du nœud qui n'existent pas.

### Ce que vous pouvez encore faire aujourd'hui

- **Faites passer votre portefeuille par Tor** avec Orbot sur mobile, comme décrit ci-dessus. C'est l'option pratique pour la plupart des gens, et elle masque votre adresse IP au serveur lightwalletd avec lequel communique votre portefeuille
- **Utilisez Tor Browser** pour les explorateurs de blocs, les forums et tout autre usage pour lequel vous préférez ne pas être identifié par votre adresse
- **Gardez à l'esprit ce que Tor ne masque pas.** Il anonymise votre emplacement sur le réseau, pas votre activité on-chain. Un envoi depuis une adresse transparente reste public, et une valeur qui passe d'un pool protégé à un autre publie toujours le montant. Consultez [Pools protégés](/using-zcash/shielded-pools) pour savoir ce qui reste visible

## Pages connexes

- [VPN et DVPN](VPN_and_DVPN.md) : les alternatives aux VPN et leur comparaison
- [Navigateurs web](Web_Browsers.md) : le renforcement du navigateur pour la confidentialité au quotidien
- [Messageries sécurisées](Secure_Messengers.md) : des outils de communication privée
- [Ce qu'un explorateur de blocs peut voir](../Zcash_Tech/What_a_Block_Explorer_Can_See.md) : ce que la confidentialité au niveau de votre nœud protège et ne protège pas
- [Pools protégés](/using-zcash/shielded-pools) : ce qui reste visible on-chain, même avec l'anonymat au niveau de la couche réseau
