<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP) ist ein kryptografisches Softwarepaket, das sichere Kommunikation über unsichere Kanäle ermöglicht. PGP verwendet eine Kombination aus Verschlüsselung und digitalen Signaturen, um sicherzustellen, dass nur der vorgesehene Empfänger eine Nachricht lesen kann und dass der Absender tatsächlich derjenige ist, für den er sich ausgibt.

## Verfügbare Tools

Es gibt viele verschiedene PGP-Tools, aber zu den beliebtesten gehören:

* **[GPG](https://gpgtools.org/)**: GPG ist eine freie Open-Source-PGP-Implementierung, die für Windows, macOS und Linux verfügbar ist.
* **[PGPMail](https://www.openpgp.org/software/)**: PGPMail ist ein kommerzieller PGP-E-Mail-Client, der für Windows und macOS verfügbar ist.
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)**: Mailvelope ist eine freie Open-Source-PGP-Erweiterung für Gmail und Thunderbird.

![PGP-Tools](https://github.com/ZecHub/zechub/assets/81990132/44984a75-800a-4f7a-94a5-88827e39b431)

## So erzeugt man Schlüssel

Um PGP zu verwenden, musst du ein Schlüsselpaar erzeugen: So erzeugst du PGP-Schlüssel:

1. Öffne deine PGP-Software.
2. Klicke auf die Schaltfläche „Schlüssel erzeugen“.
3. Gib deinen Namen und deine E-Mail-Adresse ein.
4. Wähle die Schlüssellänge. Je länger die Schlüssellänge ist, desto sicherer sind deine Schlüssel.
5. Klicke auf die Schaltfläche „Erzeugen“.

Dein PGP-Schlüsselpaar wird nun erzeugt.

![Schlüssel erzeugen](https://github.com/ZecHub/zechub/assets/81990132/15721ce1-0a77-4ebe-87f4-33e1455f2a40)

## So verwendet man PGP für E-Mails

Sobald du ein PGP-Schlüsselpaar erzeugt hast, kannst du es zum Ver- und Entschlüsseln von E-Mails verwenden. Um eine E-Mail zu verschlüsseln, musst du den öffentlichen Schlüssel des Empfängers kennen. Anschließend kannst du mit deinem PGP-Tool die E-Mail unter Verwendung des öffentlichen Schlüssels des Empfängers verschlüsseln.

Die verschlüsselte E-Mail ist für jeden unlesbar, der nicht über den privaten Schlüssel des Empfängers verfügt. Zum Entschlüsseln der E-Mail kann der Empfänger seinen privaten Schlüssel verwenden.

![PGP-E-Mail](https://github.com/ZecHub/zechub/assets/81990132/dafb761d-f399-40c9-9323-526ba3bd0bc4)

## Bewährte Praktiken

Hier sind einige bewährte Praktiken für die Verwendung von PGP:

* Bewahre deinen privaten Schlüssel sicher auf. Der private Schlüssel ist der wichtigste Teil deines PGP-Schlüsselpaars. Wenn jemand deinen privaten Schlüssel erhält, kann diese Person alle Nachrichten entschlüsseln, die mit deinem öffentlichen Schlüssel verschlüsselt wurden.

![Bewährte Praktiken 1](https://github.com/ZecHub/zechub/assets/81990132/39a6fae4-a9a1-4061-a97c-4a9b975f6383)

![Bewährte Praktiken 2](https://github.com/ZecHub/zechub/assets/81990132/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd)

* Teile deinen öffentlichen Schlüssel mit Menschen, denen du vertraust. Du kannst deinen öffentlichen Schlüssel weitergeben, indem du ihn ihnen direkt sendest oder ihn auf einen PGP-Schlüsselserver hochlädst.
* Verwende starke Passwörter für deinen PGP-Schlüsselbund. Dein PGP-Schlüsselbund ist eine Datei, in der deine PGP-Schlüssel gespeichert werden. Es ist wichtig, ein starkes Passwort zu verwenden, um diese Datei zu schützen.
* Halte deine PGP-Software auf dem neuesten Stand. PGP-Software wird ständig aktualisiert, um Fehler zu beheben und die Sicherheit zu verbessern. Es ist wichtig, deine Software aktuell zu halten, damit du die neuesten Sicherheitsfunktionen verwendest.

## So verschlüsselt man eine E-Mail mit PGP

* Öffne deine PGP-Software.
* Öffne die E-Mail, die du verschlüsseln möchtest.
* Klicke auf die Schaltfläche „Verschlüsseln“.
* Gib den öffentlichen Schlüssel des Empfängers ein.
* Klicke auf die Schaltfläche „Verschlüsseln“.
* Die E-Mail wird verschlüsselt.

![E-Mail verschlüsseln](https://github.com/ZecHub/zechub/assets/81990132/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e)

---

![Ablauf der Verschlüsselung](https://github.com/ZecHub/zechub/assets/81990132/da1499e9-fc87-46b2-93ed-28d43cf1fd86)

## So entschlüsselt man eine E-Mail mit PGP

* Öffne deine PGP-Software.
* Öffne die verschlüsselte E-Mail.
* Klicke auf die Schaltfläche „Entschlüsseln“.
* Gib deinen privaten Schlüssel ein.
* Klicke auf die Schaltfläche „Entschlüsseln“.
* Die E-Mail wird entschlüsselt.

![E-Mail entschlüsseln](https://github.com/ZecHub/zechub/assets/81990132/beae714c-020f-4c1e-aa4f-3dd9430670cc)
