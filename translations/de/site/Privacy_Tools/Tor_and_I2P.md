<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>


# Warum Privatsphäre wichtig ist

Im digitalen Zeitalter ist der Schutz Ihrer [Privatsphäre](https://www.privacyguides.org/en/) immer wichtiger geworden. Auch wenn manche Privatsphäre als verlorene Sache betrachten, ist sie das nicht. Ihre Privatsphäre steht auf dem Spiel und sollte Anlass zur Sorge sein. Privatsphäre hat einen erheblichen Wert, da sie mit Macht zusammenhängt, und es ist entscheidend, sicherzustellen, dass diese Macht verantwortungsvoll ausgeübt wird.

## Tor- & I2P-Technologien

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) ist ein Proxy-Tool, das das Tor-Netzwerk nutzt, um Verbindungen für Anwendungen herzustellen. Torbot erreicht dies, indem es ihren Datenverkehr über Tor leitet und dadurch die [Privatsphäre und Anonymität](https://www.torproject.org/) dieser Anwendungen verbessert.

## I2P-Netzwerk

Das I2P-Netzwerk, auch bekannt als das [Invisible Internet Project](https://geti2p.net/en/about/intro), ist ein vollständig verschlüsseltes Peer-to-Peer-Overlay-Netzwerk. Es stellt sicher, dass der Inhalt, die Quelle und das Ziel von Nachrichten vor Beobachtern verborgen bleiben. Anders gesagt: Niemand kann den Ursprung oder das Ziel des Datenverkehrs oder die tatsächlichen Inhalte der übertragenen Nachrichten sehen. Die in I2P verwendete Verschlüsselung gewährleistet ein hohes Maß an Privatsphäre und Anonymität für seine Nutzer.

## Tor und I2P haben gemeinsame Merkmale, weisen aber auch bedeutende Unterschiede auf. 

Sowohl Tor als auch I2P sind dezentrale und anonyme Peer-to-Peer-Netzwerke, aber I2P bietet im Vergleich zu Tor ein höheres Maß an Sicherheit. Allerdings ist I2P in erster Linie für den Zugriff auf Dienste wie E-Mail, Chat und Torrenting innerhalb seines eigenen Netzwerks konzipiert und kann nicht für den Zugriff auf das normale Internet verwendet werden. Tor hingegen ermöglicht Nutzern den Zugriff auf das Deep Web, genau wie I2P, funktioniert aber auch als normaler Browser für den Zugriff auf Websites im Surface Web.

*Hinweis: Weitere Informationen zu den Gemeinsamkeiten und Unterschieden von Tor & I2P finden Sie [hier](https://geti2p.net/en/comparison/tor)*

## Integration von Tor mit Ywallet auf dem Smartphone

Orbot ist ein kostenloses virtuelles privates Netzwerk (VPN) für Smartphones, das den Datenverkehr aller Anwendungen auf Ihrem Gerät durch das Tor-Netzwerk leitet.

Befolgen Sie die folgenden Anweisungen, um Tor mit einer Zcash Wallet *(Ywallet)* zu verbinden:

1.  Laden Sie *Orbot* aus dem App Store herunter und installieren Sie es.

2.  Nach der Installation erscheint eine Begrüßungsnachricht. Gehen Sie weiter zur *Orbot*-Startseite und klicken Sie auf *'Tor Enabled Apps'.*              

3. Dadurch wird auf dem Bildschirm eine Seite angezeigt, die die mit Tor kompatiblen Anwendungen zeigt. Suchen Sie nach der *Ywallet*-App und stellen Sie sicher, dass sie ausgewählt ist.

4. Es erscheint eine Verbindungsanfrage zum Einrichten eines VPN, wodurch *Orbot* den Netzwerkverkehr überwachen kann. *Orbot* wird initialisiert, sobald diese Berechtigung genehmigt wurde. 

5. Prüfen Sie die Taskleiste oder die Orbot-Startseite, um zu bestätigen, dass Tor läuft; dies ist bestätigt, wenn Sie 'Connected to the Tor network' sehen.

* Ein Video-Tutorial finden Sie [hier](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing)

*Hinweis: Wenn Tor von Ihrem Mobilfunknetz blockiert wird, können Sie alternativ einen Bridge-Server verwenden, um eine Verbindung herzustellen.*


## So richten Sie eine Zcash Wallet mit Torbot auf PC/Desktop ein

## Tor-Unterstützung in Zcash?

* Der Tor-Browser kann von der offiziellen Website heruntergeladen werden; den Link finden Sie [hier](https://www.torproject.org/download/).

 Die bequemste Art, Tor zu installieren, ist über das Tor Browser Bundle. Wenn Sie eine headless Installation bevorzugen, können Sie den Tor-Daemon auch separat installieren. 

*Hinweis: Standardmäßig stellt das Tor Browser Bundle einen SOCKS-Listener auf tcp/9150 bereit und der Tor-Daemon stellt den SOCKS-Listener auf tcp/9050 bereit.*

* Beachten Sie die vom Tor Project bereitgestellten Installations-[anweisungen](https://support.torproject.org/apt/), die speziell für Ihr Betriebssystem gelten.

## Zcashd Wallet installieren

Zcashd ist die offizielle Linux-basierte Full-Node-Wallet, die von Kernentwicklern der Electric Coin Company aktualisiert und gepflegt wird. Sie ist für Nutzer gedacht, die Zcash-Transaktionen minen und validieren möchten sowie Zcash senden und empfangen wollen.

* Die offizielle Website zum Herunterladen der Zcashd Wallet finden Sie [hier](https://electriccoin.co/zcashd/) 

* Wallet installieren: Den Link zum Tutorial-Video finden Sie [hier](https://www.youtube.com/watch?v=hTKL0jPu7X0), bereitgestellt von den Entwicklern der Zcash Wallet.

##  Zcashd über Tor ausführen 

* Um Zcashd für die Nutzung des Tor-SOCKS-Proxys zu konfigurieren, können Sie das Befehlszeilenargument `-proxy` an den Daemon-Befehl anhängen.

 Zum Beispiel:

  $ zcashd -proxy=127.0.0.1:9050
      
Alternativ fügen Sie die folgende Zeile der Datei `zcash.conf` hinzu:

  proxy=127.0.0.1:9050

Damit Konfigurationsänderungen wirksam werden, wird empfohlen, `zcashd` neu zu starten.

Beachten Sie, dass dies davon ausgeht, dass der Tor-Daemon verwendet wird. Falls das Tor Browser Bundle verwendet wird, ersetzen Sie 9050 durch 9150.

Zusätzlich können Sie das Befehlszeilenargument `-listenonion` anhängen, damit der Daemon eine `.onion`-Adresse erzeugt, unter der Ihr Node erreichbar ist.
