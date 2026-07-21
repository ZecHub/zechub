<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Eine Website auf IPFS veröffentlichen

![](https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg)

## Einführung in IPFS

IPFS (InterPlanetary File System) ist ein Peer-to-Peer-Protokoll und -Netzwerk, das entwickelt wurde, um eine dezentrale Methode zum Speichern und Teilen von Dateien zu schaffen.

Im Gegensatz zum traditionellen Client-Server-Modell des Internets ermöglicht IPFS Nutzern, Dateien direkt miteinander zu teilen, anstatt sich auf einen zentralisierten Server zu verlassen, der Inhalte speichert und verteilt.

Dateien in IPFS werden mittels *content-addressing* adressiert, was bedeutet, dass jede Datei auf Grundlage ihres Inhalts einen eindeutigen Hash oder CONTENT IDENTIFIER (CID) erhält, und dieser Hash verwendet wird, um die Datei aus dem Netzwerk abzurufen.

Wenn ein Nutzer eine Datei zu IPFS hinzufügt, wird die Datei in kleine Teile, sogenannte Blöcke, zerlegt, und jedem Block wird ein CID zugewiesen. Diese Blöcke werden dann auf verschiedenen Nodes im Netzwerk gespeichert, sodass die Datei leicht aus mehreren Quellen abgerufen werden kann.

Dies sorgt für Redundanz und Fehlertoleranz und macht es zugleich schwierig, dass ein einzelner Node zu einem Single Point of Failure oder der Kontrolle wird.

Lies [Eine Einführung in IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Deine Website erstellen

Für dieses Beispiel erstellen wir eine einfache Website.

[Beispiel-Website](https://squirrel.surf)


**Schritt 1:** Wenn du mit Webdesign nicht vertraut bist, schreibe den Hauptinhalt für deine Website, einschließlich Titel, Haupttext, mit Links zu anderen Seiten/der Website und Fußzeilen.

**Schritt 2:** Verwende eine [HTML-Vorlage!](https://nicepage.com/html-templates) Füge den von dir geschriebenen Text entsprechend ein. Optional kannst du auch ein .CSS-Stylesheet für deine Website erstellen.

**Schritt 3:** Speichere dein Verzeichnis. Alle .html-Seiten + Bilder müssen sich im selben Ordner befinden.



## Einen Node einrichten

Lade IPFS von der [offiziellen Website](https://docs.ipfs.tech/install/ipfs-desktop/) herunter und installiere es.



### IPFS initialisieren:

Wenn du die Desktop-Anwendung verwendest, musst du nichts initialisieren.

Verwende ein Terminal oder eine Eingabeaufforderung und führe den Befehl aus: <mark>ipfs init </mark>.



**Website-Ordner zu IPFS hinzufügen**:

Wähle den Ordner mit den Dateien deiner Website aus und navigiere zur Option Add Folder.

![](https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png)

--

Wenn du das Terminal verwendest, führe den Befehl <mark>ipfs add -r "folder_name"</mark> aus, um den gesamten Ordner rekursiv zu IPFS hinzuzufügen.


### Website auf IPFS anpinnen:

Sobald die Dateien deiner Website zu IPFS hinzugefügt wurden, musst du sie **anpinnen**, damit sie im Netzwerk verfügbar bleiben.

--

Wenn du das Terminal verwendest, führe den Befehl aus: If using Terminal, Run command: <mark>ipfs pin add "hash"</mark> 

"hash" = CID des Ordners, den du im vorherigen Schritt hinzugefügt hast.


Alternativ kannst du Verzeichnisse auch mit Diensten wie [Pinata](https://pinata.cloud) oder [Dolpin](https://dolpin.io) anpinnen.

Das spart viel Zeit!

--

### Auf deine Website über IPFS zugreifen:

Deine Website ist jetzt auf IPFS veröffentlicht und kann mithilfe des Hashs des Ordners aufgerufen werden. Um auf deine Website zuzugreifen, kannst du https://ipfs.io/ipfs/"hash" besuchen.

"hash" = CID des Ordners.

In unserem Fall ist die CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS

Interplanetary Naming System (IPNS) ermöglicht es dir, die mit deiner Website verknüpften IPFS-CIDs zu aktualisieren und dennoch einen statischen Link bereitzustellen. Es wird als Schlüssel bereitgestellt.

![](https://dnslink.io/assets/dns-query.a0134a75.png)

Wähle im Einstellungsmenü für deinen Website-Ordner in der IPFS-Desktop-Anwendung die Option Publish to IPNS aus.

![](https://i.ibb.co/Ch25dKf/IPNS.png)

Schlüssel: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Er kann auch verwendet werden, um unsere Website über ein Gateway anzuzeigen: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS-Link

Die Website wurde erstellt, jetzt brauchen wir eine Möglichkeit, eine URL auf den Inhalt verweisen zu lassen.

Wenn du bereits eine Webadresse besitzt, kannst du einen neuen Eintrag mit dem TXT-Record "_dnslink(your domain)" hinzufügen. Je nach Anbieter wird dieser möglicherweise automatisch ausgefüllt.

![](https://i.ibb.co/MgRxBHj/example.png)

Es wird einige Zeit dauern, bis sich dies im Netzwerk verbreitet hat, bevor du es ansehen kannst.

Glückwunsch! Du hast eine zensurresistente Website eingerichtet.


**Ressourcen**

[IPFS-Dokumentation](https://docs.ipfs.tech)

[IPNS-Dokumentation](https://docs.ipfs.tech/concepts/ipns/)

[DNS-Link-Dokumentation](https://dnslink.io/#introduction)
