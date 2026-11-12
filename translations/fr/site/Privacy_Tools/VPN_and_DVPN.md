<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/VPN_and_DVPN.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>


# VPN & dVPN

À l’ère numérique, préserver sa confidentialité et sa sécurité en ligne est d’une importance capitale. Les réseaux privés virtuels (VPN) et les VPN décentralisés (dVPN) jouent un rôle crucial dans la protection de vos activités et de vos données en ligne. Cette page wiki explore les principales différences entre les VPN traditionnels et les dVPN émergents, les considérations de sécurité à prendre en compte lors du choix d’un VPN, ainsi qu’une liste de services VPN qui acceptent la cryptomonnaie axée sur la confidentialité, Zcash.

# Quelle est la différence ?

__Réseaux privés virtuels (VPN)__ : Les VPN traditionnels créent un tunnel sécurisé et chiffré entre votre appareil et un serveur distant contrôlé par le fournisseur VPN. Ce tunnel dissimule vos activités en ligne aux regards indiscrets, tels que les hackers, les FAI ou les agences gouvernementales. Les VPN sont largement utilisés pour des usages tels que la navigation anonyme, l’accès à des contenus géo-restreints et la protection contre les cybermenaces.

![image223](/content-images/image-223-399e3015e7.webp)


__VPN décentralisés (dVPN)__ : À l’inverse, les dVPN s’appuient sur la blockchain et la technologie pair à pair pour créer un réseau décentralisé de nœuds. Le trafic des utilisateurs est acheminé à travers ces nœuds, ce qui rend difficile pour une entité unique de surveiller ou de contrôler l’ensemble du réseau. Les dVPN sont généralement plus résistants à la censure, car aucune autorité centralisée ne supervise le réseau. Ils conviennent particulièrement aux utilisateurs recherchant une confidentialité et une sécurité renforcées.

![dvpn](/content-images/dvpn-89698d4cb9.webp)


# Considérations de sécurité lors du choix d’un VPN

Lors du choix d’un service VPN, il est important de prendre en compte les facteurs de sécurité suivants :

1. __Chiffrement__ : Assurez-vous que le VPN utilise des protocoles de chiffrement robustes comme OpenVPN ou WireGuard afin de protéger vos données contre l’interception.

2. __Politique de non-conservation des logs__ : Recherchez des fournisseurs qui appliquent une politique stricte de non-conservation des logs, ce qui signifie qu’ils ne conservent aucune trace de vos activités en ligne.

3. __Emplacements des serveurs__ : Tenez compte de la répartition géographique des serveurs afin d’accéder à des contenus de différentes régions et de minimiser la latence.

4. __Kill switch__ : Un kill switch coupera votre connexion internet si la connexion VPN tombe, empêchant ainsi l’exposition de vos données.

5. __Confidentialité et juridiction__ : Renseignez-vous sur les pratiques de confidentialité du fournisseur VPN et sur sa juridiction, car les lois sur la conservation des données varient selon les pays.

6. __Protection contre les fuites__ : Assurez-vous que le VPN empêche les fuites DNS et WebRTC afin de préserver votre anonymat.

7. __Prix et fonctionnalités__ : Évaluez le coût et les fonctionnalités proposés par les différents fournisseurs afin de trouver celui qui correspond à vos besoins et à votre budget.

# Services VPN et paiements en Zcash

La prise en charge des paiements en Zcash doit être vérifiée auprès de chaque fournisseur. L’acceptation des cryptomonnaies n’inclut pas nécessairement ZEC, et payer une plateforme d’échange ou un revendeur tiers diffère d’un paiement direct au fournisseur VPN. Les services ci-dessous appliquent des politiques de paiement différentes ; vérifiez les devises actuellement acceptées avant d’envoyer des fonds.

1. [__Mullvad VPN__](https://mullvad.net/en)
   
Mullvad VPN est un service VPN axé sur la confidentialité. Sa [FAQ actuelle sur les paiements](https://mullvad.net/en/pricing) répertorie les moyens de paiement acceptés.
La prise en charge des cryptomonnaies ne signifie pas une prise en charge directe de chaque monnaie. Les principales fonctionnalités de Mullvad incluent :

   __Politique de non-conservation des logs__ : Mullvad applique une politique stricte de non-conservation des logs, ce qui signifie qu’il ne stocke aucune donnée liée à vos activités en ligne.

   __Chiffrement robuste__ : Le service utilise des protocoles de chiffrement robustes, y compris WireGuard, pour protéger vos données.

   __VPN multi-sauts__ : Mullvad propose l’option de connexions multi-sauts, qui acheminent votre trafic via plusieurs serveurs afin de renforcer la confidentialité et la sécurité.

   __Mode pont__ : Il dispose d’un mode pont qui peut aider à contourner certaines mesures de censure.

   __Création de compte anonyme__ : Les utilisateurs reçoivent un numéro de compte généré aléatoirement, ce qui élimine le besoin de fournir des informations personnelles lors de l’inscription.

__Paiements en cryptomonnaies__ : La liste publiée mentionne Bitcoin, Bitcoin Cash et Monero, et non Zcash. Un échange ou revendeur tiers est un service distinct ; ne le décrivez pas comme une acceptation directe de ZEC par Mullvad.

3. [__Nym VPN (dVPN)__](https://nym.com/)
   
   Nym VPN est un VPN décentralisé (dVPN) qui se concentre sur l’amélioration de la confidentialité et de la sécurité des utilisateurs grâce à un réseau axé sur la confidentialité. Nym VPN fonctionne différemment des VPN traditionnels en 
   utilisant un mixnet, où le trafic des utilisateurs est acheminé à travers un réseau de nœuds. Les principales fonctionnalités de Nym VPN incluent :

   __Décentralisation__ : Nym VPN est décentralisé et open source, réduisant le risque de contrôle centralisé et de censure.

   __Mixnet axé sur la confidentialité__ : Le service fait transiter le trafic des utilisateurs par un mixnet, ce qui rend difficile pour une entité unique de surveiller ou d’analyser le trafic réseau.

   __Exploitation de nœuds__ : Les utilisateurs peuvent exploiter des nœuds pour contribuer au réseau et gagner des récompenses, décentralisant encore davantage l’infrastructure.

   __Confidentialité renforcée__ : Nym VPN est conçu dans un souci de confidentialité et n’exige pas que les utilisateurs fournissent des informations personnelles lors de la création d’un compte.

Pour le routage spécifique aux wallets Zcash, consultez [Acheminer le trafic du wallet Zcash via le mixnet Nym](../guides/Nym_Mixnet_Wallet_Setup.md).

## Autres fournisseurs de VPN à découvrir

3. [__ExpressVPN__](https://www.expressvpn.com/)
4. [__NordVPN__](https://nordvpn.com/)
5. [__CyberGhost__](https://www.cyberghostvpn.com/)
6. [__Private Internet Access (PIA)__](https://www.privateinternetaccess.com/)

Gardez à l’esprit que la disponibilité des options de paiement en cryptomonnaies peut changer ; il est donc conseillé de consulter le site web du fournisseur VPN ou de contacter son service client pour obtenir les informations les plus à jour sur les moyens de paiement acceptés, y compris Zcash.
