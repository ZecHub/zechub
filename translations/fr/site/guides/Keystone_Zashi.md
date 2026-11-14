<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guide d'utilisation de Keystone Zodl (anciennement Zashi)

> Conservez vos ZEC protégés hors ligne : associez un portefeuille matériel Keystone à l'application Zodl (anciennement Zashi, renommée en février 2026) et signez vos transactions par QR code.

## En bref

* Le Keystone 3 Pro (ou le Keystone 3) équipé du micrologiciel Cypherpunk sert de signataire isolé pour Zodl, ce qui permet de conserver les ZEC protégés hors ligne.
* Avant de commencer : une batterie chargée à plus de 20 %, le câble USB (ou une carte MicroSD au format FAT32) pour les mises à jour du micrologiciel, et l'application Zodl sur votre téléphone.
* Vérifiez d'abord l'appareil sur le site web de Keystone. Cette étape permet de s'assurer qu'il n'a pas été altéré pendant le transport.
* Créez le portefeuille sur le Keystone et notez la phrase de récupération de 24 mots hors ligne. Elle n'est jamais saisie dans Zodl.
* Connexion : sur le Keystone, appuyez sur « ... » > Connect Software Wallet > Zodl, puis dans Zodl, appuyez sur Connect Hardware Wallet et scannez le QR code.
* Zodl prépare chaque transaction ; vous l'approuvez et la signez sur l'écran du Keystone en scannant des QR codes dans un sens puis dans l'autre.

## Explication principale

Un portefeuille matériel conserve vos clés de dépense sur un appareil distinct qui n'est jamais connecté à Internet. Le Keystone est isolé : il communique avec votre téléphone uniquement par QR codes, sans Bluetooth ni USB.

Dans cette configuration, Zodl joue le rôle d'« observateur ». Il se synchronise avec le réseau Zcash, affiche votre solde protégé et prépare les transactions. Le Keystone détient la phrase de récupération et signe. Un téléphone compromis peut voir votre solde, mais il ne peut pas déplacer de fonds sans approbation sur le Keystone.

Les étapes ci-dessous couvrent la préparation de l'appareil, sa vérification, la mise à jour du micrologiciel, la création du portefeuille et sa connexion à Zodl.

## Vue d'ensemble

Guide Twitter :  => [Guide Twitter de l'intégration du portefeuille matériel Keystone avec Zodl (anciennement Zashi)](https://x.com/zashi_app/status/1869793574880973144) 

Cette intégration marque une évolution importante dans la facilité d'utilisation de Zcash, en permettant la conservation hors ligne de ZEC protégés. La communauté Zcash a connu des revers avec d'autres plateformes de portefeuilles matériels par le passé, mais Keystone s'est imposé comme un partenaire collaboratif, prêt à repousser les limites et à innover aux côtés de Electric Coin Company. L'équipe de Keystone a reçu une subvention de ZCG pour financer sa part du travail.

## Tutoriel Keystone X Zodl

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zodl Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Préparation
[Commandez et recevez votre Keystone 3 Pro ou Keystone 3](https://keyst.one) 

Niveau de batterie : assurez-vous que la batterie de votre appareil Keystone est chargée à plus de 20 %.

Câble USB ou carte SD :

- Câble USB pour la mise à jour du micrologiciel (fourni).
- Carte Micro SD (moins de 1 To) pour les mises à niveau (à acheter séparément).

Accès au site officiel de Keystone pour la vérification et la mise à jour du micrologiciel.

Application Zodl installée sur votre appareil mobile.

## [Guide étape par étape (appareil Keystone)](https://keyst.one/get-started) 


**Choisissez votre langue**

- **Vérification de l'appareil (par QR code) :** la vérification de l'appareil est essentielle pour détecter une éventuelle altération pendant le transport, prévenir les attaques sur la chaîne d'approvisionnement et garantir la sécurité du micrologiciel installé.
  - Rendez-vous sur la page de vérification de l'appareil du site web de Keystone.
  - Cliquez sur Scan QR Code sur le site officiel.
  - Utilisez l'appareil photo de votre Keystone pour scanner le QR code affiché sur le site web.
  - Un code de vérification apparaîtra sur l'écran de votre Keystone.
  - Saisissez ce code sur le site web pour terminer la vérification.

- **Mise à jour du micrologiciel :**
  - Mise à jour par carte MicroSD
    - Assurez-vous que la batterie de votre portefeuille Keystone est chargée à au moins 20 %.
    - Insérez la carte SD dans votre ordinateur et formatez-la en FAT32.
    - Téléchargez la dernière version du micrologiciel Cypherpunk depuis la [Keystone page de mise à jour du micrologiciel](https://keyst.one/firmware) et enregistrez le fichier keystone3.bin à la racine de votre carte MicroSD.
    - Insérez la carte SD contenant le micrologiciel dans votre portefeuille Keystone.
    - Accédez à l'option « Upgrade » de votre portefeuille Keystone, puis suivez les instructions à l'écran pour lancer la mise à jour.
  - **Mise à jour par câble USB**
    - Si la version de votre micrologiciel est antérieure à 1.0.4, vous devrez effectuer la première mise à jour à l'aide d'une carte MicroSD avant de pouvoir passer aux mises à jour par USB.
    - Assurez-vous que la batterie de votre portefeuille Keystone est chargée à au moins 20 %.
    - Appuyez sur via USB et utilisez le câble USB pour connecter votre portefeuille Keystone à votre ordinateur. Appuyez sur [Approve] pour autoriser l'accès USB à votre portefeuille Keystone, faute de quoi il pourrait se limiter à la recharge.
    - Ouvrez le navigateur web de votre ordinateur et rendez-vous sur la [Keystone page de mise à jour du micrologiciel](https://keyst.one/firmware)
    - Sur la page de mise à jour, cliquez sur le bouton Install Update et suivez les instructions fournies pour installer le dernier micrologiciel.
- **Créer un portefeuille :**
    - Mot de passe sécurisé : choisissez un code PIN ou un mot de passe robuste pour protéger votre portefeuille.
    - Nommez votre portefeuille (facultatif) : vous pouvez donner un nom à votre portefeuille pour l'identifier facilement, ou ignorer cette étape.
    - Sélectionnez Create New Wallet si vous configurez un portefeuille pour la première fois.
    - Votre appareil générera une phrase de récupération de 24 mots.
    - Notez cette phrase de récupération et conservez-la en lieu sûr.
    - Confirmez la phrase de récupération en vérifiant les mots dans l'ordre affiché à l'écran.
- **Connecter Zodl et le portefeuille Keystone :**
    - Sur l'appareil Keystone : appuyez sur … sur la page principale
    - Appuyez sur Connect Software Wallet et choisissez Zodl. Le QR code de connexion à Zodl s'affichera.
    - Dans l'application Zodl : appuyez sur le menu déroulant Zodl (en haut à gauche de l'écran)
    - Appuyez sur Connect Hardware Wallet
    - Appuyez sur Ready to Scan
    - Scannez le QR code affiché sur l'appareil Keystone
    - Dans l'application Zodl : confirmez le compte du portefeuille Keystone en appuyant sur le compte affiché
    - Appuyez sur Connect en bas de l'écran


## Aide supplémentaire

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Connect Keystone Hardware Wallet to Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Sign an Outgoing Transaction with Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
