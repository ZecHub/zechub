<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/GrapheneOS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Graphene OS

## En bref

- **GrapheneOS** est un système d'exploitation mobile open source et à but non lucratif, axé sur la confidentialité et la sécurité, entièrement compatible avec les applications Android du quotidien
- Points forts : un bac à sable renforcé pour les applications, du code à sécurité mémoire et des protections contre les exploits, un démarrage vérifié appuyé sur le matériel, des autorisations détaillées et la protection du port USB-C lorsque l'appareil est verrouillé
- L'installation se fait avec l'**installateur WebUSB** officiel (recommandé pour la plupart des utilisateurs) ou par la **procédure en ligne de commande** pour les utilisateurs techniques
- Pour un utilisateur de Zcash, c'est une base solide pour conserver vous-même vos fonds sur mobile : associez-le à un portefeuille protégé maintenu à jour et aux règles d'OPSEC habituelles

GrapheneOS est un projet open source à but non lucratif qui vise à améliorer la confidentialité et la sécurité des appareils mobiles tout en restant compatible avec les applications Android. Ce système d'exploitation met fortement l'accent sur le progrès des technologies de confidentialité et de sécurité, en particulier sur le renforcement du bac à sable, les protections contre les exploits et l'amélioration du modèle d'autorisations. Né en 2014 sous le nom de **CopperheadOS**, il est depuis devenu un redoutable gardien de votre confidentialité et de votre sécurité numériques.

L'objectif principal de GrapheneOS est de renforcer les frontières de sécurité, comme le bac à sable des applications, sans nuire à l'expérience utilisateur. 

GrapheneOS peut proposer divers interrupteurs pour des fonctionnalités précises, comme les autorisations Réseau, les autorisations Capteurs ou des restrictions lorsque l'appareil est verrouillé (portant notamment sur les périphériques USB, l'accès à l'appareil photo et les réglages rapides). De plus, les fonctionnalités de confidentialité et de sécurité plus complexes visibles par l'utilisateur sont soigneusement conçues pour rester faciles à utiliser, chacune avec ses propres améliorations de l'interface.

## **Fonctionnalités de GrapheneOS**

**Renforcement de la sécurité** GrapheneOS comprend de nombreuses améliorations de sécurité, comme des langages de programmation à sécurité mémoire et des fonctions de sécurité intégrées au compilateur, afin de réduire les vulnérabilités courantes.

**Bac à sable** Il renforce le bac à sable des applications pour les isoler les unes des autres, ce qui limite les vecteurs d'attaque possibles.

**Démarrage vérifié** GrapheneOS utilise des clés stockées dans le matériel et un processus de démarrage vérifiable pour garantir l'intégrité du système d'exploitation.

**Autorisations améliorées** Il offre un meilleur contrôle des autorisations des applications, ce qui permet aux utilisateurs d'ajuster et de gérer finement les données auxquelles les applications peuvent accéder.

**Tableau de bord de confidentialité** Les utilisateurs peuvent surveiller et contrôler le comportement des applications grâce à un tableau de bord de confidentialité, qui apporte de la transparence sur l'utilisation des données.

**Mises à jour de sécurité intégrées** GrapheneOS fournit des mises à jour de sécurité régulières, afin que les utilisateurs disposent toujours de la protection la plus récente contre les vulnérabilités.

**Chiffrement fort** Il utilise par défaut le chiffrement complet du disque, ce qui protège les données stockées sur l'appareil.

**Sécurité du navigateur améliorée** Le navigateur par défaut est configuré pour une sécurité renforcée, y compris une protection contre le pistage.

**Applications préinstallées réduites au minimum** GrapheneOS est livré avec très peu d'applications préinstallées, ce qui réduit les risques potentiels pour la sécurité et la confidentialité.

**Protection contre les ports USB hostiles** Il protège contre l'accès non autorisé à l'appareil par les ports USB lorsque l'appareil est verrouillé.

**Protections contre les logiciels malveillants** GrapheneOS comprend des fonctionnalités permettant de détecter et de bloquer les logiciels malveillants connus.

**Axé sur la confidentialité** Le système d'exploitation est conçu en accordant une grande importance à la confidentialité des utilisateurs, en réduisant au minimum la collecte et l'exposition des données.

**Open source** C'est un projet open source, ce qui permet la transparence et les contributions de la communauté pour améliorer la sécurité.

**Politiques de sécurité personnalisables** Les utilisateurs peuvent personnaliser diverses politiques de sécurité selon leurs préférences.

**Compatibilité** GrapheneOS s'efforce de rester compatible avec les applications Android, afin que les utilisateurs puissent continuer à utiliser leurs applications préférées tout en profitant de fonctionnalités de sécurité et de confidentialité renforcées.

## **Installer GrapheneOS**

Comme indiqué dans la section des bonnes pratiques, il est recommandé de suivre le guide d'installation officiel. Il existe deux méthodes pour installer GrapheneOS : utiliser l'[installateur basé sur WebUSB](https://grapheneos.org/install/web) ou suivre le [guide d'installation en ligne de commande](https://grapheneos.org/install/cli)

**Installation via Web USB** Pour installer GrapheneOS avec l'installateur web, vous aurez généralement besoin du matériel et des ressources suivants :

- 2 Go de mémoire libre et 32 Go d'espace de stockage libre.
- Un câble USB (A ou C)
- Un système d'exploitation hôte pris en charge et un navigateur avec une prise en charge fonctionnelle de WebUSB. Consultez les [prérequis officiels de WebUSB](https://grapheneos.org/install/web#prerequisites) actuels pour connaître les versions prises en charge et les restrictions liées à la distribution des navigateurs ; les anciens systèmes en fin de vie ne sont pas officiellement pris en charge.
- L'installateur web peut aussi fonctionner depuis un appareil Android, ChromeOS ou GrapheneOS pris en charge. Suivez les indications propres à chaque navigateur dans le guide officiel plutôt que de supposer que chaque version de Chromium prend en charge WebUSB.

Consultez le guide d'installation via le lien ci-dessous et suivez la procédure d'installation

[Guide de l'installateur web GrapheneOS](https://grapheneos.org/install/web#prerequisites)

**Installation en ligne de commande** L'installation en ligne de commande n'est pas recommandée aux utilisateurs peu familiers avec la technique ; les outils et ressources ci-dessous sont nécessaires pour l'installation en ligne de commande :

- Vous devez disposer d'au moins 2 Go de mémoire libre et de 32 Go d'espace de stockage libre
- Un câble USB (A ou C)
- Utilisez un système d'exploitation hôte pris en charge selon les [prérequis actuels de l'installation en ligne de commande](https://grapheneos.org/install/cli#prerequisites), et suivez ce guide pour les outils nécessaires.
- Les hôtes Android, ChromeOS et GrapheneOS doivent utiliser l'installateur web ; ils ne figurent pas parmi les hôtes pris en charge pour l'installation en ligne de commande.

Consultez le guide d'installation via le lien ci-dessous et suivez la procédure d'installation 

[Installation en ligne de commande](https://grapheneos.org/install/cli#prerequisites)

## **Bonnes pratiques**

**Maintenez le système à jour** Mettez régulièrement à jour GrapheneOS pour disposer des derniers correctifs et améliorations de sécurité.

**Utilisez des mots de passe robustes** Définissez des mots de passe robustes et uniques pour le chiffrement de l'appareil et la connexion aux applications afin d'empêcher tout accès non autorisé.

**Autorisations des applications** Examinez et gérez soigneusement les autorisations des applications, en n'accordant que ce qui est nécessaire au fonctionnement de chacune.

**Sauvegardes régulières** Sauvegardez régulièrement vos données en cas de perte de l'appareil ou de corruption des données.

**Chiffrez le stockage** S'il n'est pas activé par défaut, chiffrez le stockage de votre appareil pour protéger vos données en cas de perte ou de vol.

**Écran de verrouillage sécurisé** Utilisez un écran de verrouillage sécurisé, comme un code PIN, un mot de passe ou l'authentification biométrique, pour empêcher tout accès non autorisé.

**Reverrouillez le bootloader après l'installation** La procédure d'installation officielle exige de [déverrouiller temporairement le bootloader](https://grapheneos.org/install/web#unlocking-the-bootloader) pour flasher GrapheneOS, puis de [le verrouiller à nouveau avant utilisation](https://grapheneos.org/install/web#locking-the-bootloader) afin d'activer pleinement le démarrage vérifié. Le déverrouillage et le reverrouillage effacent chacun toutes les données de l'utilisateur : faites donc d'abord une sauvegarde et suivez les étapes officielles dans l'ordre. N'activez pas l'accès root sur le système d'exploitation installé.

**Vérifiez la provenance des applications** Vérifiez l'authenticité des applications et de leurs sources pour éviter d'installer des logiciels malveillants.

**Installez un navigateur axé sur la confidentialité** Envisagez d'utiliser un navigateur axé sur la confidentialité, comme le navigateur Brave, Firefox ou Bromite, pour naviguer en toute sécurité.

**Auditez régulièrement vos applications** Passez périodiquement en revue et désinstallez les applications que vous n'utilisez plus ou auxquelles vous ne faites plus confiance afin de réduire la surface d'attaque.

**Activez l'authentification à deux facteurs (2FA)** Activez la 2FA pour vos comptes en ligne afin d'ajouter une couche de sécurité supplémentaire.

**Évitez les Wi-Fi publics** Soyez prudent lorsque vous vous connectez à des réseaux Wi-Fi publics, car ils peuvent être moins sûrs. Utilisez un VPN si nécessaire.

**Soyez prudent avec les données de localisation** Limitez le suivi de la localisation par les applications et envisagez d'utiliser un outil de falsification de la position si vous tenez à votre confidentialité.

**Évitez les liens et pièces jointes inconnus** Méfiez-vous des liens et des pièces jointes non sollicités, car il peut s'agir de tentatives d'hameçonnage ou de logiciels malveillants.

**Vérifiez les paramètres par défaut** Examinez attentivement les paramètres par défaut et ajustez-les selon vos préférences en matière de confidentialité.

**Soutien de la communauté** Participez à la communauté GrapheneOS et aux forums pour obtenir des conseils, des mises à jour et des recommandations de sécurité. Vous pouvez contacter l'équipe et rester informé en cliquant [ici](https://grapheneos.org/contact) pour découvrir d'autres contacts.

**Utilisez la méthode d'installation officielle** GrapheneOS propose deux méthodes d'installation officiellement prises en charge. Les utilisateurs peuvent choisir l'installateur basé sur WebUSB, recommandé pour la plupart des personnes, ou suivre le guide d'installation en ligne de commande, destiné aux utilisateurs plus techniques.

## **Conclusion**

En somme, GrapheneOS vise à proposer un système d'exploitation mobile alternatif qui fait passer en priorité la confidentialité et la sécurité de ses utilisateurs, en leur donnant davantage de contrôle sur leur vie numérique tout en restant compatible avec les applications dont ils dépendent. C'est un projet qui ambitionne d'établir un niveau d'exigence élevé en matière de sécurité et de confidentialité des appareils mobiles, à une époque où ces préoccupations sont essentielles.

## Pages associées

- [Messageries sécurisées](Secure_Messengers.md) : communiquer en privé sur un appareil renforcé
- [Chiffrement PGP](PGP_Encryption.md) : courriels et échanges de fichiers chiffrés
- [VPN et DVPN](VPN_and_DVPN.md) : confidentialité au niveau du réseau sur mobile
- [Navigateurs web](Web_Browsers.md) : choisir et renforcer un navigateur mobile
