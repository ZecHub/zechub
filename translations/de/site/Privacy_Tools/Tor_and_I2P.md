<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>


# Warum Privatsphäre wichtig ist

Im digitalen Zeitalter ist der Schutz Ihrer [Privatsphäre](https://www.privacyguides.org/en/) zunehmend wichtig geworden. Während manche Privatsphäre als verlorene Sache betrachten, ist das nicht der Fall. Ihre Privatsphäre steht auf dem Spiel und sollte Anlass zur Sorge geben. Privatsphäre hat einen erheblichen Wert, da sie mit Macht zusammenhängt, und es ist entscheidend, sicherzustellen, dass diese Macht verantwortungsvoll ausgeübt wird.

## Tor- und I2P-Technologien

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) ist ein Proxy-Tool, das das Tor-Netzwerk nutzt, um Verbindungen für Anwendungen herzustellen. Orbot erreicht dies, indem es deren Datenverkehr durch Tor leitet und so [Privatsphäre und Anonymität](https://www.torproject.org/) für diese Anwendungen verbessert.

## I2P-Netzwerk

Das I2P-Netzwerk, auch bekannt als [Invisible Internet Project](https://geti2p.net/en/about/intro), ist ein vollständig verschlüsseltes Peer-to-Peer-Overlay-Netzwerk. Es stellt sicher, dass der Inhalt, die Quelle und das Ziel von Nachrichten vor Beobachtern verborgen bleiben. Mit anderen Worten: Niemand kann den Ursprung oder das Ziel des Datenverkehrs oder den tatsächlichen Inhalt der übertragenen Nachrichten sehen. Die in I2P verwendete Verschlüsselung gewährleistet ein hohes Maß an Privatsphäre und Anonymität für seine Nutzer.

### I2P installieren

Es gibt zwei Implementierungen. Das ursprüngliche [Java I2P](https://geti2p.net/en/download) läuft unter Windows, macOS, Linux und Android. [i2pd](https://i2pd.website/), geschrieben in C++, ist schlanker und auf einem Server oder einem leistungsschwachen Rechner die übliche Wahl.

Sobald es läuft, stellt I2P eine lokale Konsole auf `127.0.0.1:7657` sowie Proxys auf `127.0.0.1:4444` (HTTP) und `127.0.0.1:4447` (SOCKS) bereit. Rechnen Sie damit, dass der erste Start mehrere Minuten dauert: I2P muss erst Tunnel durch das Netzwerk aufbauen, bevor irgendetwas funktioniert, und es wird schneller, je länger es online bleibt.

### I2P mit Zcash verwenden

Beachten Sie, dass **kein aktueller Zcash-Knoten nativ I2P spricht.** Zebra unterstützt kein I2P, und zcashd tat es ebenfalls nicht. Wenn Sie eine Anleitung sehen, die behauptet, einen Zcash-Knoten über I2P zu betreiben, beschreibt sie etwas, das die Software nicht kann.

Wirklich nützlich ist I2P hier für alles rund um das Wallet: eine Website, ein Forum oder einen Dienst zu erreichen, ohne Ihre Adresse preiszugeben. Um die Wallet-Verbindung selbst zu anonymisieren, ist Tor heute die praktikable Option, und die folgenden Abschnitte behandeln das.

## Tor und I2P haben gemeinsame Merkmale, aber auch wesentliche Unterschiede. 

Sowohl Tor als auch I2P sind dezentrale und anonyme Peer-to-Peer-Netzwerke, aber I2P bietet im Vergleich zu Tor ein höheres Maß an Sicherheit. Allerdings ist I2P in erster Linie für den Zugriff auf Dienste wie E-Mail, Chat und Torrenting innerhalb seines eigenen Netzwerks ausgelegt und kann nicht für den Zugriff auf das reguläre Internet verwendet werden. Tor hingegen ermöglicht Nutzern den Zugriff auf das Deep Web, genau wie I2P, fungiert aber auch als normaler Browser für den Zugriff auf Websites im Surface Web.

*Hinweis: Weitere Informationen zu den Gemeinsamkeiten und Unterschieden von Tor & I2P finden Sie [hier](https://geti2p.net/en/comparison/tor).*

## Ein mobiles Wallet mit Orbot durch Tor leiten

Orbot ist ein kostenloses virtuelles privates Netzwerk (VPN) für Smartphones, das den Datenverkehr aller Anwendungen auf Ihrem Gerät durch das Tor-Netzwerk leitet.

Befolgen Sie diese Anweisungen, um ein Zcash-Wallet durch Tor zu leiten. Beachten Sie, dass Ywallet, das in früheren Versionen dieses Leitfadens verwendet wurde, nicht mehr gepflegt wird und dem Netzwerk nach Ironwood nicht mehr folgen wird. Wählen Sie daher ein gepflegtes Wallet von der Seite [Wallets](/using-zcash/wallets).

1.  Laden Sie *Orbot* aus dem App Store herunter und installieren Sie es.

2.  Nach der Installation erscheint eine Begrüßungsnachricht. Gehen Sie weiter zur *Orbot*-Startseite und klicken Sie auf *'Tor Enabled Apps'.*              

3. Dadurch wird auf dem Bildschirm eine Seite mit den Tor-kompatiblen Anwendungen angezeigt. Suchen Sie Ihr Zcash-Wallet in der Liste und stellen Sie sicher, dass es ausgewählt ist.

4. Es erscheint eine Verbindungsanfrage zum Einrichten eines VPN, wodurch *Orbot* den Netzwerkverkehr überwachen kann. *Orbot* wird initialisiert, sobald diese Berechtigung genehmigt wurde. 

5. Prüfen Sie die Taskleiste oder die Orbot-Startseite, um zu verifizieren, dass Tor läuft; bestätigt wird dies, wenn Sie 'Connected to the Tor network' sehen.

*Hinweis: Wenn Tor von Ihrem Mobilfunknetz blockiert wird, können Sie alternativ einen Bridge Server verwenden, um sich zu verbinden.*


## Tor auf dem PC oder Desktop installieren

* Der Tor Browser kann von der offiziellen Website heruntergeladen werden; den Link finden Sie [hier](https://www.torproject.org/download/).

 Die bequemste Art, Tor zu installieren, ist über das Tor Browser Bundle. Wenn Sie eine Installation ohne grafische Oberfläche bevorzugen, können Sie stattdessen den Tor-Daemon separat installieren. 

*Hinweis: Standardmäßig stellt das Tor Browser Bundle einen SOCKS-Listener auf tcp/9150 bereit und der Tor-Daemon einen SOCKS-Listener auf tcp/9050.*

* Beachten Sie die vom Tor Project bereitgestellten Installations-[anweisungen](https://support.torproject.org/apt/), die speziell für Ihr Betriebssystem gelten.

## Einen Knoten über Tor betreiben

Dies ist der Teil, der sich am meisten verändert hat, und die ehrliche Antwort ist, dass es derzeit schwieriger ist als früher.

**zcashd ist verschwunden.** Es erreichte das Ende des Supports und stoppte am 18. Juli 2026 bei Block 3,417,100. Es wird nicht neu starten, seine Download-Seite liefert einen 404 zurück, und das apt-Repository wird nicht mehr bereitgestellt. Jede Anleitung, die Ihnen sagt, Sie sollen `zcashd -proxy=127.0.0.1:9050` ausführen, gilt nicht mehr für irgendetwas.

**Zebra kann es derzeit ebenfalls nicht.** Zebra ist der gepflegte Knoten, und seine Netzwerk-Crate enthält zwar Code für isolierte Tor-Verbindungen, aber die Funktion ist in `zebra-network/Cargo.toml` auskommentiert:

```
# tor = ["arti-client", "tor-rtcompat"]
```

Die Crate-Dokumentation sagt dasselbe ganz deutlich: *"Tor connections are currently disabled until `arti-client`'s dependency `x25519-dalek v1.2.0` is updated."* Die Funktion `connect_isolated_tor` ist ebenfalls zusammen mit ihr auskommentiert. Es gibt also heute keine unterstützte Möglichkeit, einen Zcash-Knoten über Tor zu betreiben.

Wenn Sie jetzt Anonymität auf Knoten-Ebene benötigen, ist der praktikable Ansatz, die gesamte Maschine auf Betriebssystemebene hinter Tor oder einem VPN zu platzieren, anstatt den Knoten selbst zu konfigurieren. Das schützt Ihren Netzwerkstandort, ohne sich auf Knoten-Funktionen zu verlassen, die nicht eingebaut sind.

### Was Sie heute trotzdem noch tun können

- **Leiten Sie Ihr Wallet durch Tor** mit Orbot auf Mobilgeräten, wie oben beschrieben. Das ist die praktikable Option für die meisten Menschen und verbirgt Ihre IP vor dem lightwalletd-Server, mit dem Ihr Wallet spricht
- **Verwenden Sie den Tor Browser** für Block Explorer, Foren und alles andere, bei dem Sie lieber nicht über Ihre Adresse verknüpft werden möchten
- **Denken Sie daran, was Tor nicht verbirgt.** Es anonymisiert Ihren Netzwerkstandort, nicht Ihre On-Chain-Aktivität. Das Senden von einer transparenten Adresse ist weiterhin öffentlich, und Werte, die zwischen abgeschirmten Pools übertragen werden, veröffentlichen weiterhin den Betrag. Siehe [Shielded Pools](/using-zcash/shielded-pools), um zu erfahren, was sichtbar bleibt
