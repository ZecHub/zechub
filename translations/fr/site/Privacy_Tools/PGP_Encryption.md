<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP) est un logiciel cryptographique qui permet de communiquer de façon sécurisée sur des canaux non sécurisés. PGP combine le chiffrement et les signatures numériques pour garantir que seul le destinataire prévu peut lire un message et que l'expéditeur est bien celui qu'il prétend être.

## Outils disponibles

Il existe de nombreux outils PGP, mais voici quelques-uns des plus populaires :

* **[GnuPG (GPG)](https://gnupg.org/)** : un outil OpenPGP gratuit et open source en ligne de commande. Choisissez le paquet ou l'interface graphique adaptés à votre système d'exploitation.
* **[Thunderbird](https://www.openpgp.org/software/thunderbird/)** : un client de messagerie de bureau gratuit et open source, qui prend en charge OpenPGP nativement depuis la version 78. Il n'a pas besoin de Mailvelope pour chiffrer les e-mails.
* **[Mailvelope](https://mailvelope.com/)** : une extension de navigateur open source qui ajoute OpenPGP aux services de webmail compatibles, dont Gmail. Il s'agit d'un outil de webmail, et non d'une extension pour Thunderbird.

![PGP Tools](/content-images/44984a75-800a-4f7a-94a5-88827e39b431-c66ef53a2b.webp)

## Comment générer des clés

Pour utiliser PGP, vous devez générer une paire de clés. Voici comment générer des clés PGP :

1. Ouvrez votre logiciel PGP.
2. Cliquez sur le bouton « Generate Key ».
3. Saisissez votre nom et votre adresse e-mail.
4. Choisissez la longueur de la clé. Plus la clé est longue, plus vos clés seront sûres.
5. Cliquez sur le bouton « Generate ».

Votre paire de clés PGP sera générée.

![Generate Keys](/content-images/15721ce1-0a77-4ebe-87f4-33e1455f2a40-7699b1771d.webp)

## Comment utiliser PGP pour les e-mails

Une fois votre paire de clés PGP générée, vous pouvez l'utiliser pour chiffrer et déchiffrer des e-mails. Pour chiffrer un e-mail, vous devez connaître la clé publique du destinataire. Vous pouvez ensuite utiliser votre outil PGP pour chiffrer l'e-mail avec la clé publique du destinataire.

L'e-mail chiffré sera illisible pour toute personne ne possédant pas la clé privée du destinataire. Pour déchiffrer l'e-mail, le destinataire peut utiliser sa clé privée.

![PGP Email](/content-images/dafb761d-f399-40c9-9323-526ba3bd0bc4-98503ad98b.webp)

## Bonnes pratiques

Voici quelques bonnes pratiques pour utiliser PGP :

* Conservez votre clé privée en lieu sûr. La clé privée est l'élément le plus important de votre paire de clés PGP. Si quelqu'un obtient votre clé privée, il peut déchiffrer tous les messages chiffrés avec votre clé publique.

![Bonnes pratiques 1](/content-images/39a6fae4-a9a1-4061-a97c-4a9b975f6383-eced005c8b.webp)

![Bonnes pratiques 2](/content-images/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd-50ca49a070.webp)

* Partagez votre clé publique avec des personnes de confiance. Vous pouvez partager votre clé publique en l'envoyant directement à ces personnes ou en la publiant sur un serveur de clés PGP.
* Utilisez des mots de passe robustes pour votre trousseau PGP. Votre trousseau PGP est un fichier qui stocke vos clés PGP. Il est important d'utiliser un mot de passe robuste pour protéger ce fichier.
* Maintenez votre logiciel PGP à jour. Les logiciels PGP sont constamment mis à jour pour corriger des bogues et améliorer la sécurité. Il est important de garder votre logiciel à jour pour bénéficier des dernières fonctionnalités de sécurité.

## Comment chiffrer un e-mail avec PGP

* Ouvrez votre logiciel PGP.
* Ouvrez l'e-mail que vous souhaitez chiffrer.
* Cliquez sur le bouton « Encrypt ».
* Saisissez la clé publique du destinataire.
* Cliquez sur le bouton « Encrypt ».
* L'e-mail sera chiffré.

![Encrypt Email](/content-images/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e-6edd4a03ea.webp)

---

![Encryption Flow](/content-images/da1499e9-fc87-46b2-93ed-28d43cf1fd86-86fdc87d10.webp)

## Comment déchiffrer un e-mail avec PGP

* Ouvrez votre logiciel PGP.
* Ouvrez l'e-mail chiffré.
* Cliquez sur le bouton « Decrypt ».
* Saisissez votre clé privée.
* Cliquez sur le bouton « Decrypt ».
* L'e-mail sera déchiffré.

![Decrypt Email](/content-images/beae714c-020f-4c1e-aa4f-3dd9430670cc-1e9d38f1ef.webp)
