<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edihttps://github.com/ZecHub/zechub/pull/2238t Seite"/>
</a>

# Zcash Wallet-Datenverkehr über das Nym-Mixnet leiten

> Zuletzt überprüft: 29. September 2026

Zcash abgeschirmte Transaktionen schützen Transaktionsdaten on-chain, Wallets kommunizieren jedoch weiterhin über das Internet. Netzwerkbeobachter können möglicherweise Metadaten erfahren, etwa Ihre IP-Adresse, wann Ihre Wallet eine Verbindung herstellt und welche Infrastruktur sie kontaktiert.

Nym fügt eine separate Ebene für Netzwerkprivatsphäre hinzu. Stand September 2026 hängt der beste Ansatz von der Wallet ab:

1. **Bevorzugen Sie die native Nym-Integration einer Wallet, wenn sie verfügbar ist.**
2. Verwenden Sie andernfalls den **systemweiten NymVPN Mixnet-Modus**, damit der Netzwerkverkehr der Wallet über Nym geleitet wird, ohne von Wallet-spezifischer Proxy-Unterstützung abzuhängen.

Allgemeine Hintergrundinformationen zu VPN und dVPN finden Sie unter [VPN & dVPN](./VPN_and_DVPN.md).

## Was Nym hinzufügt – und was nicht

Eine abgeschirmte Zcash Zahlung und ein Tool für Netzwerkprivatsphäre lösen unterschiedliche Probleme:

- **Zcash abgeschirmte Pools** schützen Transaktionsdetails on-chain.
- **Nym-Mixnet-Routing** soll die Verknüpfbarkeit zwischen Ihrer echten Netzwerkidentität und dem Dienst, der Wallet-Datenverkehr empfängt, verringern.
- Ein über einen systemweiten NymVPN Tunnel kontaktierter Zielserver sollte einen Nym-Austritt statt Ihrer Heim- oder Mobilfunk-IP sehen.

Nyms Mixnet verwendet mehrere Hops, Paketmischung, zufällige Verzögerungen, Cover-Traffic und Onion-Verschlüsselung, um das Austreten von Netzwerkmetadaten zu verringern.

Nym schützt **nicht** vor einem kompromittierten Gerät, bösartiger Wallet-Software, offengelegten Wiederherstellungsphrasen, Identität, die Sie über Börsenkonten preisgeben, oder Privatsphäreverlust durch transparente Zcash Aktivitäten.

## Native Nym-Unterstützung: Wenn verfügbar, zuerst verwenden

Nym gab am 24. September 2026 bekannt, dass seine Zcash Community Grant Arbeit abgeschlossen ist und native Mixnet-Unterstützung in echten Zcash Wallets ausgeliefert wird.

### Zingo! Wallet

Zingo PC enthält einen nativen Nym-Transport. Zingo Mobile bietet außerdem den Mixnet-Modus unter iOS und Android über einen In-App-Nym-Proxy.

Der von Zingo dokumentierte aktuelle Stand:

- Die Nym-Steuerung befindet sich unter **Einstellungen → Nym Mixnet**.
- Das Senden einer Zahlung wird über das Mixnet geleitet.
- Ironwood Migrationsübertragungen folgen demselben geschützten Sendepfad.
- ZEC Preisanfragen werden ebenfalls über das Mixnet geleitet.
- Das Senden schlägt fehl, ohne auf eine unsichere Verbindung auszuweichen, während Nym aktiviert ist: Ist der Mixnet-Transport nicht verfügbar, wird die Zahlung nicht stillschweigend über das Clearnet gesendet.
- **Die Chain-Synchronisierung wird in Zingo PC derzeit nicht über das Mixnet geleitet**. Kompakte Blöcke, Nullifier-Abfragen, Transaktionsabrufe, Mempool-Datenverkehr und Serverzustandsprüfungen verwenden weiterhin die normale Serververbindung.

Dieser Unterschied ist wichtig: Die native Integration von Zingo schützt den Übertragungspfad mit der höchsten Verknüpfbarkeit, ist aber noch kein vollständiger Netzwerk-Tunnel für das Gerät.

Falls Ihr Bedrohungsmodell auch erfordert, Synchronisierungsverkehr vor dem Server zu verbergen, verwenden Sie zusätzlich einen systemweiten Privatsphäre-Tunnel wie NymVPN und berücksichtigen Sie die dadurch entstehende zusätzliche Latenz und Komplexität.

Quellen:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym berichtet, dass **Zkool** nun die Verbindung mit Zcash RPC-Infrastruktur über das Nym-Mixnet mittels eines nativen Schalters unterstützt.

Zkool ist der aktiv gepflegte Nachfolger von YWallet. Das Projekt unterstützt außerdem Tor-Proxying und Onion-Dienste für Zcash Serververbindungen.

Bevorzugen Sie die native Nym-Option von Zkool, statt zu versuchen, einen älteren YWallet Build über einen undokumentierten Proxy-Pfad zu erzwingen.

Quellen:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet verfügt ebenfalls über Nym-fähige Transportpfade. Die aktuelle Implementierung unterstützt das Leiten ausgehender Transaktionseinreichungen über das Nym-Mixnet sowie einen separaten Nym-dVPN-Pfad für die Synchronisierung kompakter Blöcke. Betrachten Sie diese als unterschiedliche Schutzmaßnahmen, statt anzunehmen, dass jede Wallet-Anfrage automatisch das Mixnet verwendet.

Quellen:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl verfügt derzeit über integrierten **Tor-Schutz**, nicht über dieselbe native Nym-Integration, die oben für Zingo, Zkool und Nozy beschrieben wurde.

Die Tor-Funktion von Zodl kann Transaktionseinreichungen, den Abruf von Transaktionsdaten, Wechselkursanfragen und API-Aufrufe von Drittanbietern über Tor leiten. Nym erklärte am 24. September 2026, dass weiterhin aktiv mit dem Zodl-Team über eine umfassendere Mixnet-Integration gesprochen wird.

Verwenden Sie für Zodl heute entweder:

- den dokumentierten Tor-Schutz von Zodl oder
- systemweites NymVPN, wenn Ihr Ziel darin besteht, den allgemeinen Geräteverkehr der Wallet über Nym zu leiten.

Gehen Sie nicht davon aus, dass Tor und Nym innerhalb der Wallet austauschbare Transporte sind, nur weil beide Privatsphäre-Netzwerke sind.

Zodl-Tor-Einstellungen:

**Mehr → Erweiterte Funktionen → Beta: Tor-Schutz → Aktivieren → Änderungen speichern**

Quellen:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Fallback: systemweites NymVPN

Dies ist die breitest kompatible Nym-Option, weil die Wallet keine Nym-spezifischen Proxy-Einstellungen verstehen muss.

### 1. NymVPN installieren

Laden Sie NymVPN nur von Nyms offizieller Website oder einem offiziellen Plattform-Store herunter:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN unterstützt Android, iOS, Linux, Windows und macOS.

### 2. Mixnet-Modus auswählen

NymVPN bietet den **Fast-Modus**, einen für geringere Latenz optimierten 2-Hop-dVPN-Pfad, sowie den **Mixnet-Modus**, einen für stärkeren Schutz von Netzwerkmetadaten optimierten 5-Hop-Mixnet-Pfad. Wählen Sie für sensible Wallet-Aktivitäten den Mixnet-Modus und warten Sie, bis der Client meldet, dass die Verbindung hergestellt wurde, bevor Sie die Wallet öffnen oder aktualisieren.

### 3. Die normalen Netzwerkeinstellungen der Wallet beibehalten

Wenn das Betriebssystem den Datenverkehr bereits durch NymVPN tunnelt, benötigen die meisten Wallets keine benutzerdefinierten Proxy-Einstellungen.

Öffnen Sie die Wallet normal und lassen Sie sie synchronisieren.

Falls NymVPN auf Ihrer Plattform Split-Tunneling bereitstellt, stellen Sie sicher, dass die Wallet **im geschützten Tunnel enthalten** und nicht auf einer Umgehungs- oder Ausschlussliste steht.

### 4. Den Tunnel vor der Nutzung der Wallet überprüfen

Eine einfache systemweite Prüfung:

1. Trennen Sie NymVPN.
2. Besuchen Sie einen öffentlichen Dienst zur IP-Prüfung oder führen Sie auf dem Desktop Folgendes aus:

   ```bash
   curl https://api.ipify.org
   ```

3. Notieren Sie die sichtbare IP.
4. Verbinden Sie NymVPN im Mixnet-Modus.
5. Wiederholen Sie die Prüfung.

Die sichtbare öffentliche IP sollte sich ändern.

Dies bestätigt den System-Tunnel. Es beweist **nicht**, dass jede Anfrage einer bestimmten Wallet demselben Pfad folgt, falls die App oder das Betriebssystem spezielle Routing-Regeln hat.

Für mehr Sicherheit auf dem Desktop:

- überprüfen Sie den Wallet-Prozess mit dem Netzwerkmonitor des Betriebssystems,
- stellen Sie sicher, dass kein Split-Tunnel-Ausschluss vorliegt,
- bestätigen Sie, dass sich das erwartete Verhalten der Wallet ändert, wenn NymVPN getrennt wird.

Veröffentlichen Sie bei der Fehlersuche keine Screenshots mit Wallet-Adressen, Guthaben, Transaktions-IDs, IP-Adressen oder Wiederherstellungsdaten.

## NymVPN dApp-/Wallet-Proxy-Modus

NymVPN bietet außerdem einen App- und Wallet-Proxy-Modus mit SOCKS5-/RPC-Routing durch das Mixnet.

Die öffentliche Einrichtungsdokumentation von Nym demonstriert dies hauptsächlich mit RPC-Konfiguration im Ethereum-Stil. Es ist nützlich für Software, die ausdrücklich einen kompatiblen generischen Proxy-/RPC-Pfad unterstützt, sollte aber **nicht** als mit jeder Zcash Wallet funktionierend angenommen werden.

Verwenden Sie diesen Pfad nur, wenn die eigene Dokumentation der Wallet kompatible Proxy- oder RPC-Unterstützung bestätigt.

Bevorzugen Sie andernfalls:

- die native Nym-Integration der Wallet oder
- systemweites NymVPN.

## Leistungs- und Timeout-Abwägungen

Mixnets tauschen bewusst Geschwindigkeit gegen stärkeren Metadatenschutz.

Rechnen Sie mit möglichen Auswirkungen auf:

- die anfängliche Wallet-Synchronisierung,
- große Nachholsynchronisierungen,
- Abfragen des Transaktionsverlaufs,
- RPC-Timeouts,
- API-Aufrufe von Drittanbietern.

Praktische Hinweise:

- Beginnen Sie mit den Standard-Nym-Einstellungen.
- Rechnen Sie damit, dass die erste Synchronisierung oder eine lange Nachholsynchronisierung länger dauert.
- Versuchen Sie einen Timeout erneut, bevor Sie Privatsphäre-Einstellungen abschwächen.
- Vermeiden Sie es, die Privatsphäre-Modi unmittelbar vor einer sensiblen Transaktion wiederholt zu wechseln.
- Wenn Sie für umfangreiche Synchronisierung einen schnelleren Pfad nutzen, berücksichtigen Sie, dass die kontaktierte Infrastruktur während dieses Zeitraums möglicherweise Ihre echte Netzwerkidentität sehen kann.
- Beachten Sie bei Zingo PC insbesondere, dass der native Nym-Transport derzeit Sendevorgänge und Preisabfragen schützt, während die Synchronisierung direkt bleibt.

## Hinweise für Mobilgeräte

Unter Android und iOS ist der VPN-Steckplatz des Betriebssystems in der Regel der einfachste Weg, allgemeinen Wallet-Datenverkehr über NymVPN zu leiten: Verbinden Sie zuerst NymVPN und öffnen Sie dann die Wallet.

Falls bereits ein anderes VPN, eine Firewall oder ein lokaler VPN-basierter Werbeblocker die System-VPN-Schnittstelle belegt, können die beiden Produkte möglicherweise nicht gleichzeitig betrieben werden. Überprüfen Sie den VPN-Status des Betriebssystems, bevor Sie davon ausgehen, dass die Wallet geschützt ist.

## Checkliste zum Bedrohungsmodell

Fragen Sie sich, bevor Sie sich auf die Einrichtung verlassen:

- Verwende ich geeignetenfalls abgeschirmte Zcash Adressen?
- Unterstützt meine Wallet Nym nativ?
- Wenn ja, welchen Datenverkehr schützt diese native Integration genau?
- Falls ich eine breitere Abdeckung benötige: Ist NymVPN verbunden, bevor die Wallet Netzwerkaktivität startet?
- Ist die Wallet durch eine Split-Tunneling-Regel ausgeschlossen?
- Verlasse ich mich auf einen Proxy-Modus, den die Wallet tatsächlich dokumentiert?
- Gebe ich Identität über eine Börse, Browser-Sitzung, Drittanbieter-API oder transparente Adresse preis?
- Bin ich auf langsamere Synchronisierung und gelegentliche Timeouts vorbereitet?

## Quellen

- Nym: Nym-Mixnet jetzt live in Zcash Wallets, 24. September 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Zingo PC Nym-Verhalten: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Zingo Mobile-Nym-Transport: https://github.com/zingolabs/zingo-mobile
- Zkool Repository: https://github.com/hhanh00/zkool2
- NozyWallet Nym-Transport-Arbeit: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor-Schutz: https://support.zodl.com/article/17-enabling-tor-protection
