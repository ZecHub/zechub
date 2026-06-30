<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP) est un logiciel de cryptographie qui permet des communications sécurisées sur des canaux non sécurisés. PGP utilise une combinaison de chiffrement et de signatures numériques pour garantir que seul le destinataire prévu peut lire un message et que l'expéditeur est bien celui qu'il prétend être.

## Outils disponibles

Il existe de nombreux outils PGP, mais parmi les plus populaires, on trouve :

* **[GPG](https://gpgtools.org/)** : GPG est une implémentation PGP gratuite et open source disponible pour Windows, macOS et Linux.
* **[PGPMail](https://www.openpgp.org/software/)** : PGPMail est un client de messagerie PGP commercial disponible pour Windows et macOS.
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)** : Mailvelope est une extension PGP gratuite et open source pour Gmail et Thunderbird.

![Outils PGP](https://github.com/ZecHub/zechub/assets/81990132/44984a75-800a-4f7a-94a5-88827e39b431)

## Comment générer des clés

Pour utiliser PGP, vous devez générer une paire de clés : comment générer des clés PGP :

1. Ouvrez votre logiciel PGP.
2. Cliquez sur le bouton "Generate Key".
3. Saisissez votre nom et votre adresse e-mail.
4. Choisissez la longueur de la clé. Plus la clé est longue, plus vos clés seront sécurisées.
5. Cliquez sur le bouton "Generate".

Votre paire de clés PGP sera générée.

![Générer des clés](https://github.com/ZecHub/zechub/assets/81990132/15721ce1-0a77-4ebe-87f4-33e1455f2a40)

## Comment utiliser PGP pour les e-mails

Une fois que vous avez généré une paire de clés PGP, vous pouvez l'utiliser pour chiffrer et déchiffrer des e-mails. Pour chiffrer un e-mail, vous devez connaître la clé publique du destinataire. Vous pouvez ensuite utiliser votre outil PGP pour chiffrer l'e-mail à l'aide de la clé publique du destinataire.

L'e-mail chiffré sera illisible pour toute personne ne possédant pas la clé privée du destinataire. Pour déchiffrer l'e-mail, le destinataire peut utiliser sa clé privée pour déchiffrer l'e-mail.

![E-mail PGP](https://github.com/ZecHub/zechub/assets/81990132/dafb761d-f399-40c9-9323-526ba3bd0bc4)

## Bonnes pratiques

Voici quelques bonnes pratiques pour utiliser PGP :

* Conservez votre clé privée en lieu sûr. La clé privée est l'élément le plus important de votre paire de clés PGP. Si quelqu'un obtient votre clé privée, il pourra déchiffrer tous les messages qui ont été chiffrés avec votre clé publique.

![Bonnes pratiques 1](https://github.com/ZecHub/zechub/assets/81990132/39a6fae4-a9a1-4061-a97c-4a9b975f6383)

![Bonnes pratiques 2](https://github.com/ZecHub/zechub/assets/81990132/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd)

* Partagez votre clé publique avec des personnes en qui vous avez confiance. Vous pouvez partager votre clé publique en la leur envoyant directement, ou en la téléversant sur un serveur de clés PGP.
* Utilisez des mots de passe robustes pour votre trousseau de clés PGP. Votre trousseau de clés PGP est un fichier qui stocke vos clés PGP. Il est important d'utiliser un mot de passe robuste pour protéger ce fichier.
* Gardez votre logiciel PGP à jour. Les logiciels PGP sont constamment mis à jour pour corriger des bugs et améliorer la sécurité. Il est important de maintenir votre logiciel à jour pour vous assurer que vous utilisez les dernières fonctionnalités de sécurité.

## Comment chiffrer un e-mail avec PGP

* Ouvrez votre logiciel PGP.
* Ouvrez l'e-mail que vous souhaitez chiffrer.
* Cliquez sur le bouton "Encrypt".
* Saisissez la clé publique du destinataire.
* Cliquez sur le bouton "Encrypt".
* L'e-mail sera chiffré.

![Chiffrer un e-mail](https://github.com/ZecHub/zechub/assets/81990132/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e)

---

![Flux de chiffrement](https://github.com/ZecHub/zechub/assets/81990132/da1499e9-fc87-46b2-93ed-28d43cf1fd86)

## Comment déchiffrer un e-mail avec PGP

* Ouvrez votre logiciel PGP.
* Ouvrez l'e-mail chiffré.
* Cliquez sur le bouton "Decrypt".
* Saisissez votre clé privée.
* Cliquez sur le bouton "Decrypt".
* L'e-mail sera déchiffré.

![Déchiffrer un e-mail](https://github.com/ZecHub/zechub/assets/81990132/beae714c-020f-4c1e-aa4f-3dd9430670cc)
