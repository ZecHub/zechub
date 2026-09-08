# Migrationsleitfaden: Von zcashd zu Zebrad/Zallet

Der traditionelle zcashd-Vollknoten, der von *Electric Coin Company (ECC)* / *Zodl* gewartet wurde, wurde durch Zebra und Zallet ersetzt. zcashd erreichte seinen Support-Ende-Stopp am 18. Juli 2026 und läuft nicht mehr.

- Zebra ist eine moderne Rust-Implementierung des Zcash-Protokolls, entwickelt von der Zcash Foundation
- Zallet ist eine schlanke Wallet, die für die nahtlose Anbindung an von Zodl entwickelte Zebra-Knoten geschaffen wurde

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagramm: zcashd teilt sich für Knotenaufgaben in zebrad und für Wallet-Aufgaben in Zallet auf](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Dieser Leitfaden führt Sie durch die Migration von **Zcashd** zu **Zebrad** und **Zallet**, einschließlich Einrichtung, Wallet-Import und Behebung häufiger Migrationsprobleme.

---

## zcashd wurde am 18. Juli 2026 eingestellt

**Was das bedeutet**

- zcashd erreichte seinen Support-Ende-Stopp am 18. Juli 2026. Es wird nicht erneut bis zur Spitze der Chain synchronisieren und kann weder Guthaben senden noch empfangen. Dies ist abgeschlossen, nicht geplant.
- Die zwei Aufgaben von zcashd sind nun aufgeteilt: **zebrad** ist der Vollknoten und **Zallet** ist die Wallet.
- Zallet befindet sich in der **Beta-Phase**. Zwischen Releases können inkompatible Änderungen auftreten, und einige zcashd-JSON-RPC-Methoden sind noch nicht implementiert. Prüfen Sie die [Methodenstatus-Matrix](https://zcash.github.io/zallet/), bevor Sie sich auf einen bestimmten Aufruf verlassen.
- Wenn Sie weiterhin **Sprout**-Guthaben besitzen, lesen Sie zuerst die Warnung in Schritt 6. Zallet unterstützt den Sprout-Pool nicht, und die übliche Methode zum Verschieben dieser Guthaben erforderte einen laufenden zcashd.

**Warum migrieren – über die Einstellung hinaus**

Auch unabhängig von der Einstellung gibt es überzeugende Gründe für den Wechsel:
- Sicherheit & Robustheit: Die Speichersicherheit von Rust und moderne Werkzeuge verringern das Risiko von Sicherheitslücken.
- Leistung & Effizienz: Zebrad ist für Parallelität, effizientere Ressourcennutzung und schnellere Synchronisierung ausgelegt.
- Modulare Architektur: Die Trennung der Knotenlogik (Zebrad) von der Wallet-Oberfläche (Zallet) bietet klarere Grenzen und bessere Upgrade-Pfade.
- Kompatibilität mit dem zukünftigen Ökosystem: Werkzeuge, Verbesserungen und der Rest des Zcash-Ökosystems werden sich zunehmend auf Zebrad/Zallet konzentrieren.
- Sorgenfreiheit: Vermeiden Sie, auf einer eingestellten und nicht unterstützten Komponente festzusitzen.

### Tauchen wir nun in den Migrationsleitfaden ein

**1. Alles sichern**
* Sichern Sie Ihre wallet.dat (oder jede andere Wallet-Datei / jeden Schlüsselspeicher) von Ihrem zcashd-Knoten.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Speichern Sie Ihre zcash.conf und alle benutzerdefinierten Einstellungen.
* Exportieren Sie eine Kopie aller RPC-Skripte oder Automatisierungen, die Sie verwenden.
* Vergewissern Sie sich, dass Ihre Sicherungen gültig sind (versuchen Sie beispielsweise, sie in einer anderen Umgebung zu öffnen oder zu prüfen).
* Prüfen Sie, auf welche JSON-RPC-Methoden Sie derzeit angewiesen sind.
* Vergleichen Sie dies mit der geplanten Kompatibilitätstabelle auf der [Zcash-Supportseite](https://z.cash/support/zcashd-deprecation/) 
* Bereiten Sie sich auf Änderungen oder fehlende Methoden vor (einige benötigen möglicherweise eine Umgehungslösung oder Anpassung).

**2. Systemanforderungen & Speicherplatz**
* Speicherplatz ist die Anforderung, die Menschen unterschätzen. Die Zcash-Chain überschritt im August 2026 **270 GB**, planen Sie daher mindestens **300 GB** freien Speicherplatz ein, nach Möglichkeit auf einer SSD.
* Stellen Sie sicher, dass Ihr Rechner über ein stabiles Netzwerk sowie ausreichend CPU und RAM verfügt.
* Eine Internetverbindung 
* Wenn Sie aus dem Quellcode kompilieren möchten, müssen Rust & Cargo installiert sein.

**3. Zebrad installieren / einrichten**
Sie können entweder eine vorkompilierte Binärdatei herunterladen oder aus dem Quellcode bauen.
* Die Zcash Foundation veröffentlicht Releases und Binärdateien für Zebra. Sie könnten beispielsweise ein Installationsskript verwenden oder die passende Binärdatei für Ihr Betriebssystem herunterladen.

* Beachten Sie, dass in aktuellen Zebra-Versionen [der RPC-Endpunkt in Docker nicht mehr standardmäßig aktiviert ist.](https://zfnd.org/zebra-2-3-0-release/)

**Option A: Installation über vorkompilierte Binärdatei**  
Unter **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Dadurch wird die neueste stabile Version von zebrad installiert.

**Option B: Aus dem Quellcode bauen**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Verschieben Sie nach dem Build die Binärdatei in Ihren Pfad:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Konfiguration & Start**  
Erzeugen Sie eine Standardkonfiguration:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Bearbeiten Sie **zebrad.toml** nach Ihren Präferenzen (Lauschadresse, Ports, State-Verzeichnis, Caching).

**Knoten starten:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Bild](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Der Knoten beginnt mit der Synchronisierung ab Genesis – rechnen Sie je nach Hardware und Netzwerk mit mehreren Stunden (oder mehr).

**5. Zallet (Wallet) installieren / einrichten**

Zallet wurde entwickelt, um den Wallet-Teil von zcashd zu ersetzen.

Prüfen Sie die Zallet-GitHub-/Release-Seite auf Binärdateien.

**Oder aus dem Quellcode bauen:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Bild](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Starten Sie die GUI oder CLI (je nachdem, was Ihre Installation bereitstellt).
* Konfigurieren Sie sie für die Verbindung mit Ihrem lokalen Zebrad-Knoten über einen RPC- oder API-Endpunkt.

**6. Ihre zcashd-Wallet in Zallet importieren**

Dafür benötigen Sie keinen laufenden zcashd. Zallet liest die Datei `wallet.dat` direkt, was wichtig ist, da zcashd nicht mehr gestartet werden kann.

> **Behalten Sie `wallet.dat`.** Die Migration meldet alles, was sie nicht in einer Zallet-Wallet abbilden kann, statt es zu importieren; dieses Schlüsselmaterial existiert dann nur in `wallet.dat`. Löschen Sie die Datei nicht nach der Migration.

Führen Sie zuerst `zallet init-wallet-encryption` aus. Zallet verschlüsselt Schlüsselmaterial mit einer age-Identität, und diese Identität muss existieren, bevor Schlüssel importiert werden.

Konvertieren Sie anschließend Ihre Konfiguration und Ihre Wallet:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` ist nur in Builds mit dem Feature `zcashd-import` vorhanden, und zum Lesen von `wallet.dat` wird das Dienstprogramm `db_dump` aus Berkeley DB 6.2 benötigt, der von zcashd verwendeten Version. Wenn Sie mehr als eine Wallet-Datei haben, führen Sie den Befehl einmal pro Datei aus und fügen Sie bei den späteren Durchläufen `--allow-multiple-wallet-imports` hinzu; jede wird zu einem eigenen Satz von Konten. Ihr `rpcuser` und `rpcpassword` werden nicht übernommen, da Zallets JSON-RPC standardmäßig Cookie-Authentifizierung verwendet; fügen Sie mit `zallet add-rpc-user` Zugangsdaten hinzu, wenn Sie sie benötigen.

**Was übernommen wird**

* Mnemonische Seeds und die daraus abgeleiteten Schlüssel, wobei Konten passend zur zcashd-Wallet neu erstellt werden
* Eigenständig importierte Sapling-Ausgabeschlüssel und transparente Schlüssel
* Transparente Watch-only-Einträge, die ihren öffentlichen Schlüssel oder ihr Redeem-Skript enthalten
* Konto-Geburtstage, damit das Scannen der Chain auf der richtigen Höhe beginnt

**Was nicht übernommen wird.** Dies wird mit Anzahlen gemeldet statt importiert:

* **Sprout-Ausgabeschlüssel und Guthaben.** Zallet unterstützt den Sprout-Pool nicht. Der dokumentierte Weg bestand darin, Sprout-Guthaben vor der Stilllegung mit zcashd zu verschieben, und das ist nicht mehr möglich. Wenn Sie davon betroffen sind, fragen Sie im [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) oder im [Community-Forum](https://forum.zcashcommunity.com/), bevor Sie etwas anderes unternehmen.
* Adressbucheinträge
* Watch-only-Einträge, die ohne öffentlichen Schlüssel oder Redeem-Skript gespeichert wurden, sowie Einträge mit unkomprimierten öffentlichen Schlüsseln
* Regtest-Wallets

**Anschließende Sicherung.** Eine Mnemonik allein ist keine vollständige Sicherung, da importierte Schlüssel nur in der Wallet-Datenbank existieren. Bewahren Sie sichere Kopien von `wallet.db`, der durch die Option `keystore.encryption_identity` bezeichneten age-Verschlüsselungsidentitätsdatei und Ihrer mnemonischen Phrase auf, und behalten Sie die ursprüngliche `wallet.dat`. Beachten Sie, dass `wallet.db` selbst nicht verschlüsselt ist: Sie enthält Ihre Transaktionshistorie und Viewing Keys im Klartext. Bewahren Sie die Sicherung daher an einem sicheren Ort auf.

**Wallet-Rescan & Synchronisierung**

* Sobald die Schlüssel importiert sind, löst Zallet über Zebrad einen erneuten Scan der Chain aus.
* Geben Sie Zallet etwas Zeit, um Ihren Kontostand und Ihre Transaktionshistorie wiederherzustellen.

**7. Guthaben und Synchronisierung überprüfen**

Nach dem Import verbindet sich Zallet mit Ihrem Zebrad-Knoten und scannt die Blockchain erneut.
Wenn die Synchronisierung abgeschlossen ist, sollten Ihre Guthaben und Transaktionen genau wie zuvor erscheinen.

Sie können den Synchronisierungsstatus Ihres Knotens prüfen, indem Sie Folgendes ausführen:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Bild](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Oder prüfen Sie die Logs.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Bild](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Fehlerbehebung**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Problem</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Mögliche Ursache</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Lösung</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad startet nicht</td>
        <td className="px-6 py-4">Port wird verwendet oder fehlerhafte Konfiguration</td>
        <td className="px-6 py-4">Prüfen Sie **zebrad.toml** und verwenden Sie einen freien Port</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Langsame Synchronisierung</td>
        <td className="px-6 py-4">Netzwerküberlastung</td>
        <td className="px-6 py-4">Stellen Sie eine stabile Internetverbindung sicher und starten Sie Zebrad neu</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Wallet fehlen Transaktionen</td>
        <td className="px-6 py-4">Unvollständiger Schlüsselimport</td>
        <td className="px-6 py-4">Importieren Sie Schlüssel erneut oder führen Sie in Zallet einen Rescan durch</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet kann keine Verbindung zum Knoten herstellen</td>
        <td className="px-6 py-4">Knoten läuft nicht oder falscher Endpunkt</td>
        <td className="px-6 py-4">Starten Sie Zebrad und überprüfen Sie den korrekten RPC-Port</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet stürzt ab</td>
        <td className="px-6 py-4">Veralteter Build</td>
        <td className="px-6 py-4">Aktualisieren Sie auf das neueste Release von GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Fazit**

Die Migration von zcashd zu Zebrad und Zallet bietet Ihnen ein schnelleres, sichereres und moderneres Zcash-Erlebnis.
Mit Rust-basierter Sicherheit, modularem Design und besseren Werkzeugen stellt dieses Setup sicher, dass Ihr Knoten und Ihre Wallet zukunftsfähig bleiben, während sich das Zcash-Ökosystem weiterentwickelt.

Tipp: Bewahren Sie Ihre Wallet-Schlüssel offline auf und sichern Sie Ihre Zallet-Daten regelmäßig.
Besuchen Sie [zebra.zfnd.org](https://zebra.zfnd.org) für Zebra sowie [The Zallet Book](https://zcash.github.io/zallet/) oder das [Zallet-Repository](https://github.com/zcash/zallet) für Zallet. Das Kapitel [Migrating from zcashd](https://zcash.github.io/zallet/) in The Zallet Book ist die maßgebliche Referenz für Schritt 6.
