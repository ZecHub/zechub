<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edihttps://github.com/ZecHub/zechub/pull/2238t Seite"/>
</a>

# Zcash Wallet-Datenverkehr über das Nym Mixnet leiten

> Zuletzt überprüft: 29. September 2026

Zcash abgeschirmte Transaktionen schützen Transaktionsdaten on-chain, doch Wallets kommunizieren weiterhin über das Internet. Netzwerkbeobachter können möglicherweise Metadaten wie Ihre IP-Adresse, den Zeitpunkt der Wallet-Verbindung und die kontaktierte Infrastruktur ermitteln.

Nym fügt eine separate Ebene für Netzwerkprivatsphäre hinzu. Seit September 2026 hängt der beste Ansatz von der Wallet ab:

1. **Bevorzugen Sie die native Nym-Integration einer Wallet, sofern sie vorhanden ist.**
2. Verwenden Sie andernfalls den **systemweiten NymVPN Mixnet-Modus**, damit der Netzwerkverkehr der Wallet über Nym geleitet wird, ohne von Wallet-spezifischer Proxy-Unterstützung abzuhängen.

Allgemeine Hintergrundinformationen zu VPN und dVPN finden Sie unter [VPN & dVPN](./VPN_and_DVPN.md).

## Was Nym hinzufügt — und was nicht

Eine abgeschirmte Zcash Zahlung und ein Werkzeug für Netzwerkprivatsphäre lösen unterschiedliche Probleme:

- **Zcash abgeschirmte Pools** schützen Transaktionsdetails on-chain.
- **Nym Mixnet-Routing** soll die Verknüpfbarkeit zwischen Ihrer tatsächlichen Netzwerkidentität und dem Dienst, der Wallet-Datenverkehr empfängt, verringern.
- Ein über einen systemweiten NymVPN Tunnel kontaktiertes Ziel sollte einen Nym Exit statt Ihrer Heim- oder Mobilfunk-IP sehen.

Das Mixnet von Nym verwendet mehrere Hops, Paketmischung, zufällige Verzögerungen, Cover Traffic und Onion-Verschlüsselung, um das Abfließen von Netzwerkmetadaten zu verringern.

Nym schützt **nicht** vor einem kompromittierten Gerät, bösartiger Wallet-Software, offengelegten Wiederherstellungsphrasen, Identität, die Sie über Exchange-Konten preisgeben, oder Privatsphäreverlust durch transparente Zcash Aktivität.

## Native Nym Unterstützung: Nutzen Sie diese zuerst, wenn verfügbar

Nym kündigte am 24. September 2026 an, dass die Arbeit seines Zcash Community Grant abgeschlossen sei und native Mixnet-Unterstützung in echten Zcash Wallets bereitgestellt werde.

### Zingo! Wallet

Zingo PC enthält einen nativen Nym Transport. Zingo Mobile bietet außerdem Mixnet Mode auf iOS und Android über einen integrierten Nym Proxy.

Von Zingo dokumentiertes aktuelles Verhalten:

- Die Nym Steuerung befindet sich unter **Einstellungen → Nym Mixnet**.
- Das Senden einer Zahlung wird über das Mixnet geleitet.
- Ironwood Migrationsübertragungen folgen demselben geschützten Sendepfad.
- ZEC Preisanfragen werden ebenfalls über das Mixnet geleitet.
- Das Senden schlägt fehl, solange Nym aktiviert ist: Wenn der Mixnet-Transport nicht verfügbar ist, wird die Zahlung nicht stillschweigend über das Clearnet gesendet.
- **Die Chain-Synchronisierung wird in Zingo PC derzeit nicht über das Mixnet geleitet.** Kompakte Blöcke, Nullifier-Abfragen, Transaktionsabrufe, Mempool-Verkehr und Serverzustandsprüfungen verwenden weiterhin die normale Serververbindung.

Diese Unterscheidung ist wichtig: Die native Integration von Zingo schützt den Übertragungspfad mit der stärksten Verknüpfbarkeit, ist aber noch kein vollständiger Netzwerk-Tunnel für das Gerät.

Wenn Ihr Bedrohungsmodell auch erfordert, den Synchronisierungsverkehr vor dem Server zu verbergen, verwenden Sie zusätzlich einen systemweiten Privatsphäre-Tunnel wie NymVPN und berücksichtigen Sie die dadurch entstehende zusätzliche Latenz und Komplexität.

Quellen:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym berichtet, dass **Zkool** jetzt die Verbindung zur Zcash RPC-Infrastruktur über das Nym Mixnet mithilfe eines nativen Schalters unterstützt.

Zkool ist der aktiv gepflegte Nachfolger von YWallet. Das Projekt unterstützt außerdem Tor Proxying und Onion Services für Zcash Serververbindungen.

Bevorzugen Sie die native Nym Option von Zkool, anstatt zu versuchen, einen älteren YWallet Build über einen undokumentierten Proxy-Pfad zu erzwingen.

Quellen:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet verfügt ebenfalls über Nym-bewusste Transportpfade. Die aktuelle Implementierung unterstützt die Weiterleitung ausgehender Transaktionseinreichungen über das Nym Mixnet sowie einen separaten Nym dVPN-Pfad für die Synchronisierung kompakter Blöcke. Behandeln Sie diese als unterschiedliche Schutzmaßnahmen, statt anzunehmen, dass jede Wallet-Anfrage automatisch das Mixnet nutzt.

Quellen:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl verfügt derzeit über integrierten **Tor Protection**, nicht über dieselbe native Nym Integration, die oben für Zingo, Zkool und Nozy beschrieben wurde.

Die Tor Funktion von Zodl kann Transaktionseinreichungen, den Abruf von Transaktionsdaten, Wechselkursanfragen und API-Aufrufe Dritter über Tor leiten. Nym erklärte am 24. September 2026, dass es noch aktiv mit dem Zodl Team über eine umfassendere Mixnet-Integration im Gespräch sei.

Verwenden Sie für Zodl heute entweder:

- den dokumentierten Tor Protection von Zodl oder
- systemweites NymVPN, wenn Sie den allgemeinen Geräteverkehr der Wallet über Nym leiten möchten.

Gehen Sie nicht davon aus, dass Tor und Nym innerhalb der Wallet austauschbare Transporte sind, nur weil beide Privatsphäre-Netzwerke sind.

Zodl Tor Einstellungen:

**Mehr → Erweiterte Funktionen → Beta: Tor Protection → Aktivieren → Änderungen speichern**

Quellen:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Fallback: systemweites NymVPN

Dies ist die breitest kompatible Nym Option, weil die Wallet keine Nym-spezifischen Proxy-Einstellungen verstehen muss.

### 1. NymVPN installieren

Laden Sie NymVPN nur von der offiziellen Website von Nym oder einem offiziellen Plattform-Store herunter:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN unterstützt Android, iOS, Linux, Windows und macOS.

### 2. Mixnet-Modus auswählen

NymVPN bietet den **Fast mode**, einen für geringere Latenz optimierten 2-Hop-dVPN-Pfad, sowie den **Mixnet mode**, einen für stärkeren Schutz von Netzwerkmetadaten optimierten 5-Hop-Mixnet-Pfad. Wählen Sie für sensible Wallet-Aktivitäten den Mixnet-Modus und warten Sie, bis der Client meldet, dass die Verbindung hergestellt ist, bevor Sie die Wallet öffnen oder aktualisieren.

### 3. Die Wallet bei normalen Netzwerkeinstellungen belassen

Wenn das Betriebssystem den Datenverkehr bereits durch NymVPN tunnelt, benötigen die meisten Wallets keine benutzerdefinierten Proxy-Einstellungen.

Öffnen Sie die Wallet wie gewohnt und lassen Sie sie synchronisieren.

Wenn NymVPN auf Ihrer Plattform Split Tunneling anbietet, bestätigen Sie, dass die Wallet **im geschützten Tunnel enthalten** und nicht auf einer Umgehungs- oder Ausschlussliste aufgeführt ist.

### 4. Den Tunnel vor der Nutzung der Wallet überprüfen

Eine einfache systemweite Prüfung:

1. Trennen Sie NymVPN.
2. Rufen Sie einen öffentlichen IP-Prüfdienst auf oder führen Sie auf dem Desktop Folgendes aus:

   ```bash
   curl https://api.ipify.org
   ```

3. Notieren Sie die sichtbare IP.
4. Verbinden Sie NymVPN im Mixnet-Modus.
5. Wiederholen Sie die Prüfung.

Die sichtbare öffentliche IP sollte sich ändern.

Dies bestätigt den Systemtunnel. Es beweist **nicht**, dass jede Anfrage einer bestimmten Wallet denselben Pfad nimmt, wenn die App oder das Betriebssystem spezielle Routing-Regeln hat.

Für zusätzliche Sicherheit auf dem Desktop:

- Überprüfen Sie den Wallet-Prozess mit dem Netzwerkmonitor des Betriebssystems,
- verifizieren Sie, dass kein Split-Tunnel-Ausschluss besteht,
- bestätigen Sie, dass sich das erwartete Wallet-Verhalten ändert, wenn NymVPN getrennt wird.

Veröffentlichen Sie bei der Fehlerbehebung keine Screenshots mit Wallet-Adressen, Guthaben, Transaktions-IDs, IP-Adressen oder Wiederherstellungsdaten.

## NymVPN dApp- / Wallet-Proxy-Modus

NymVPN bietet außerdem einen App- und Wallet-Proxy-Modus mit SOCKS5- / RPC-Routing durch das Mixnet.

Die öffentliche Setup-Dokumentation von Nym demonstriert dies hauptsächlich mit Ethereum-artiger RPC-Konfiguration. Dies ist für Software nützlich, die ausdrücklich einen kompatiblen generischen Proxy-/RPC-Pfad unterstützt, sollte aber **nicht** als mit jeder Zcash Wallet funktionierend angenommen werden.

Verwenden Sie diesen Pfad nur, wenn die eigene Dokumentation der Wallet kompatible Proxy- oder RPC-Unterstützung bestätigt.

Andernfalls bevorzugen Sie:

- die native Nym Integration der Wallet oder
- systemweites NymVPN.

## Leistungs- und Timeout-Kompromisse

Mixnets tauschen absichtlich Geschwindigkeit gegen stärkeren Metadatenschutz ein.

Rechnen Sie mit möglichen Auswirkungen auf:

- die erste Wallet-Synchronisierung,
- große Nachholsynchronisierungen,
- Abfragen des Transaktionsverlaufs,
- RPC-Timeouts,
- API-Aufrufe Dritter.

Praktische Hinweise:

- Beginnen Sie mit den Standard-Nym Einstellungen.
- Rechnen Sie damit, dass die erste Synchronisierung oder eine lange Nachholsynchronisierung länger dauert.
- Wiederholen Sie einen Timeout, bevor Sie die Privatsphäre-Einstellungen abschwächen.
- Vermeiden Sie es, Privatsphäre-Modi unmittelbar vor einer sensiblen Transaktion wiederholt zu wechseln.
- Wenn Sie für die Massensynchronisierung einen schnelleren Pfad verwenden, berücksichtigen Sie, dass die kontaktierte Infrastruktur während dieses Zeitraums möglicherweise Ihre tatsächliche Netzwerkidentität sehen kann.
- Beachten Sie insbesondere bei Zingo PC, dass sein nativer Nym Transport derzeit Sendevorgänge und Preisabfragen schützt, während die Synchronisierung direkt bleibt.

## Hinweise für Mobilgeräte

Auf Android und iOS ist der VPN-Slot des Betriebssystems normalerweise die einfachste Möglichkeit, allgemeinen Wallet-Datenverkehr über NymVPN zu leiten: Verbinden Sie zuerst NymVPN und öffnen Sie dann die Wallet.

Wenn ein anderes VPN, eine Firewall oder ein lokaler VPN-basierter Werbeblocker bereits die System-VPN-Schnittstelle belegt, können die beiden Produkte möglicherweise nicht gleichzeitig funktionieren. Überprüfen Sie den VPN-Status des Betriebssystems, bevor Sie davon ausgehen, dass die Wallet geschützt ist.

## Checkliste zum Bedrohungsmodell

Fragen Sie sich, bevor Sie sich auf das Setup verlassen:

- Verwende ich gegebenenfalls abgeschirmte Zcash Adressen?
- Verfügt meine Wallet über native Nym Unterstützung?
- Welchen Datenverkehr schützt diese native Integration genau?
- Ist NymVPN verbunden, bevor die Wallet mit Netzwerkaktivität beginnt, falls ich eine umfassendere Abdeckung benötige?
- Ist die Wallet durch eine Split-Tunneling-Regel ausgeschlossen?
- Verlasse ich mich auf einen Proxy-Modus, den die Wallet tatsächlich dokumentiert?
- Gebe ich Identität über eine Exchange, Browser-Sitzung, Drittanbieter-API oder transparente Adresse preis?
- Bin ich auf langsamere Synchronisierungen und gelegentliche Timeouts vorbereitet?

## Quellen

- Nym: Nym Mixnet jetzt live in Zcash Wallets, 24. September 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Zingo PC Nym Verhalten: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Zingo Mobile Nym Transport: https://github.com/zingolabs/zingo-mobile
- Zkool Repository: https://github.com/hhanh00/zkool2
- NozyWallet Nym Transportarbeit: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor Protection: https://support.zodl.com/article/17-enabling-tor-protection
