<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Eine Website auf IPFS veröffentlichen

![](/content-images/IPFS-40c2e22732.webp)

## Einführung in IPFS

IPFS (InterPlanetary File System) ist ein Peer-to-Peer-Protokoll und -Netzwerk, das entwickelt wurde, um eine dezentrale Methode zum Speichern und Teilen von Dateien zu schaffen.

Im Gegensatz zum traditionellen Client-Server-Modell des Internets ermöglicht IPFS Nutzern, Dateien direkt miteinander zu teilen, anstatt sich auf einen zentralisierten Server zu verlassen, der Inhalte speichert und verteilt.

Dateien in IPFS werden mittels *content-addressing* adressiert, was bedeutet, dass jede Datei auf Grundlage ihres Inhalts einen eindeutigen Hash oder CONTENT IDENTIFIER (CID) erhält, und dieser Hash verwendet wird, um die Datei aus dem Netzwerk abzurufen.

IPFS speichert Inhalte als Blöcke, die durch CIDs identifiziert werden. Wenn du eine Datei hinzufügst, wird sie auf deinem Knoten gespeichert; sie wird nicht automatisch auf andere Knoten kopiert. Halte eine erreichbare Kopie online oder richte Remote-Pinning ein, damit andere Leser sie abrufen können. Siehe [IPFS-Persistenz](https://docs.ipfs.tech/concepts/persistence/).

Lies [Eine Einführung in IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Deine Website erstellen

Für dieses Beispiel erstellen wir eine einfache Website.

[Beispiel-Website](https://squirrel.surf)


**Schritt 1:** Wenn du mit Webdesign nicht vertraut bist, schreibe den Hauptinhalt für deine Website, einschließlich Titel, Haupttext, mit Links zu anderen Seiten/der Website und Fußzeilen.

**Schritt 2:** Verwende eine [HTML-Vorlage!](https://nicepage.com/html-templates) Füge den von dir geschriebenen Text entsprechend ein. Optional kannst du auch ein .CSS-Stylesheet für deine Website erstellen.

**Schritt 3:** Lege deine Startseite in `index.html` im Stammverzeichnis des Website-Ordners ab. Füge ihre Bilder und das CSS hinzu und verwende dabei relative Pfade wie `style.css`, damit sie auch unter einer IPFS-Gateway-URL funktionieren.

## Einen Node einrichten

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) verwaltet den Knoten für dich. Lass ihn laufen, solange du deine Website teilst.

Für den [Kommandozeilen-Weg](https://docs.ipfs.tech/how-to/command-line-quick-start/) initialisiere einmalig ein neues Repository:

```sh
ipfs init
```

Starte dann den Knoten und lass dieses Terminal geöffnet:

```sh
ipfs daemon
```

Führen Sie die übrigen Befehle in einem zweiten Terminal aus. Starten Sie keinen zweiten Daemon, wenn IPFS Desktop dieses Repository bereits verwaltet.

**Website-Ordner zu IPFS hinzufügen**:

Wählen Sie in IPFS Desktop über die Option „Ordner hinzufügen“ den Ordner mit Ihren Website-Dateien aus.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Führe für den CLI-Weg diesen Befehl im übergeordneten Verzeichnis deines Website-Ordners aus:

```sh
ipfs add -r folder_name
```

Ersetze `folder_name` durch den Namen deines Ordners (Namen mit Leerzeichen in Anführungszeichen setzen). Speichere die CID aus der letzten `added ... folder_name`-Zeile: Sie identifiziert das gesamte Verzeichnis, nicht nur `index.html`.

### Website auf IPFS anpinnen:

Der CLI-Befehl `ipfs add` pinnt importierte Inhalte standardmäßig lokal. Überprüfe den Pin des Ordners mit:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Ersetze `YOUR_FOLDER_CID` durch die CID aus dem vorherigen Schritt; die Ausgabe sollte `recursive` lauten. Das Pinning schützt die Kopie auf diesem Knoten vor der Garbage Collection, hält einen ausgeschalteten Computer aber nicht online. Damit die Inhalte verfügbar bleiben, während dein Knoten offline ist, richte [Remote-Pinning](https://docs.ipfs.tech/how-to/work-with-pinning-services/) ein und vergewissere dich, dass der Remote-Dienst das Pinning abgeschlossen hat.

### Auf deine Website über IPFS zugreifen:

Prüfe deine Website zuerst über das lokale Gateway unter `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (verwende den Gateway-Port, den dein Daemon ausgibt, falls er abweicht). Durch den abschließenden Schrägstrich werden relative Links innerhalb des Verzeichnisses korrekt aufgelöst.

Ein öffentliches Gateway wie `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` kann sie ausliefern, sobald es die Inhalte von einem erreichbaren Knoten abrufen kann. Eine erfolgreiche lokale Vorschau beweist nicht, dass sie öffentlich verfügbar ist.

In unserem Fall ist die CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS

Interplanetary Naming System (IPNS) ermöglicht es dir, die mit deiner Website verknüpften IPFS-CIDs zu aktualisieren und dennoch einen statischen Link bereitzustellen. Es wird als Schlüssel bereitgestellt.

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

Wähle im Einstellungsmenü für deinen Website-Ordner in der IPFS-Desktop-Anwendung die Option Publish to IPNS aus.

![](/content-images/IPNS-2fe62cc369.webp)

Schlüssel: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

Er kann auch verwendet werden, um unsere Website über ein Gateway anzuzeigen: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS-Link

Die Website wurde erstellt, jetzt brauchen wir eine Möglichkeit, eine URL auf den Inhalt verweisen zu lassen.

Für `example.com` fügen Sie diesen DNS-Eintrag hinzu und ersetzen Sie `YOUR_FOLDER_CID` durch die CID Ihres Verzeichnisses:

| Typ | Name | Wert |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Einige DNS-Anbieter hängen die Zone automatisch an; gib dort nur `_dnslink` ein. Wenn du den obigen IPNS-Namen verwendest, kann der Wert stattdessen `dnslink=/ipns/YOUR_IPNS_NAME` lauten. Siehe [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

![](/content-images/example-c2a9edb28b.webp)

Nach der DNS-Propagierung probiere `https://ipfs.io/ipns/example.com/` aus. Um die Website direkt unter `https://example.com/` bereitzustellen, sind außerdem ein DNSLink-fähiges Gateway und eine HTTPS-Konfiguration nötig; der TXT-Eintrag allein richtet diese nicht ein. Folge der [Anleitung für benutzerdefinierte Domains](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

Glückwunsch! Du hast eine zensurresistente Website eingerichtet.


**Ressourcen**

[IPFS-Dokumentation](https://docs.ipfs.tech)

[IPNS-Dokumentation](https://docs.ipfs.tech/concepts/ipns/)

[DNS-Link-Dokumentation](https://dnslink.io/#introduction)
