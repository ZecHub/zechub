# Migrationsleitfaden: Von zcashd zu Zebrad/Zallet

Der traditionelle zcashd-Vollknoten, betreut von *Electric Coin Company (ECC)* / *Zodl*, wurde durch Zebra und Zallet ersetzt. zcashd erreichte am 18. Juli 2026 sein Support-Ende und läuft nicht mehr.

- Zebra ist eine moderne Rust-Implementierung des Zcash-Protokolls, die von der Zcash Foundation entwickelt wurde
- Zallet ist eine schlanke wallet, die für die nahtlose Anbindung an von Zodl entwickelte Zebra-Knoten erstellt wurde

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagramm: zcashd wird in zebrad für Knotenaufgaben und Zallet für Wallet-Aufgaben aufgeteilt](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Dieser Leitfaden führt dich durch die Migration von **Zcashd** zu **Zebrad** und **Zallet**, einschließlich Einrichtung, wallet-Import und Behebung häufiger Migrationsprobleme.

---

## zcashd wurde am 18. Juli 2026 eingestellt

**Was das bedeutet**

- zcashd erreichte am 18. Juli 2026 sein Support-Ende. Es wird nicht wieder mit der Spitze der Chain synchronisieren und kann keine Gelder senden oder empfangen. Das ist abgeschlossen, nicht geplant.
- Die zwei Aufgaben von zcashd sind nun aufgeteilt: **zebrad** ist der Vollknoten und **Zallet** ist die wallet.
- Zallet befindet sich in der **Beta**. Zwischen Releases können inkompatible Änderungen auftreten, und einige zcashd-JSON-RPC-Methoden sind noch nicht implementiert. Prüfe die [Statusmatrix der Methoden](https://zcash.github.io/zallet/), bevor du von einem bestimmten Aufruf abhängig bist.
- Falls du noch **Sprout**-Gelder besitzt, lies zuerst die Warnung in Schritt 6. Zallet unterstützt den Sprout-Pool nicht, und der übliche Weg, diese Gelder zu bewegen, erforderte einen laufenden zcashd.

**Warum migrieren – über die Abkündigung hinaus**

Auch abgesehen von der Abkündigung gibt es überzeugende Gründe für den Wechsel:
- Sicherheit & Robustheit: Rusts Speichersicherheit und moderne Werkzeuge verringern das Risiko von Sicherheitslücken.
- Leistung & Effizienz: Zebrad ist für Parallelität, effizientere Ressourcennutzung und schnellere Synchronisierung konzipiert.
- Modulare Architektur: Die Trennung von Knotenlogik (Zebrad) und Wallet-Oberfläche (Zallet) bietet klarere Grenzen und bessere Upgrade-Pfade.
- Kompatibilität mit dem zukünftigen Ökosystem: Werkzeuge, Erweiterungen und der Rest des Zcash-Ökosystems werden zunehmend auf Zebrad/Zallet ausgerichtet sein.
- Beruhigende Gewissheit: Vermeide es, an einer abgekündigten, nicht unterstützten Komponente festzuhängen.

### Tauchen wir nun in den Migrationsleitfaden ein

**1. Alles sichern**
* Sichere deine wallet.dat (oder jede andere Wallet-Datei / jeden Schlüssel-Speicher) von deinem zcashd-Knoten.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Speichere deine zcash.conf und alle benutzerdefinierten Einstellungen.
* Exportiere eine Kopie aller RPC-Skripte oder Automatisierungen, die du verwendest.
* Verifiziere, dass deine Sicherungen gültig sind (versuche beispielsweise in einer anderen Umgebung, sie zu öffnen oder zu prüfen).
* Prüfe, auf welche JSON-RPC-Methoden du derzeit angewiesen bist.
* Vergleiche sie mit der geplanten Kompatibilitätstabelle auf der [Zcash-Support-Website](https://z.cash/support/zcashd-deprecation/) 
* Bereite dich auf Änderungen oder fehlende Methoden vor (manche benötigen möglicherweise Umgehungslösungen oder Anpassungen).

**2. Systemanforderungen & Speicherplatz**
* Der Speicherplatz ist die Anforderung, die Menschen unterschätzen. Die Zcash-Chain überschritt im August 2026 **270 GB**, plane daher mindestens **300 GB** freien Speicherplatz ein, möglichst auf einer SSD.
* Stelle sicher, dass dein Rechner über ein stabiles Netzwerk, CPU und RAM verfügt.
* Eine Internetverbindung 
* Falls du aus dem Quellcode kompilieren möchtest, müssen Rust & Cargo installiert sein.

**3. Zebrad installieren / einrichten**
Du kannst entweder eine vorkompilierte Binärdatei herunterladen oder aus dem Quellcode bauen.
* Die Zcash Foundation veröffentlicht Releases und Binärdateien für Zebra. Du könntest beispielsweise ein Installationsskript verwenden oder die passende Binärdatei für dein Betriebssystem herunterladen.

* Beachte, dass in aktuellen Zebra-Versionen [der RPC-Endpunkt in Docker nicht mehr standardmäßig aktiviert ist.](https://zfnd.org/zebra-2-3-0-release/)

**Option A: Über vorkompilierte Binärdatei installieren**  
Unter **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Dadurch wird die neueste stabile Version von zebrad installiert.

**Option B: Aus dem Quellcode bauen**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Verschiebe die Binärdatei nach dem Build in deinen Pfad:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Konfiguration & Start**  
Erzeuge eine Standardkonfiguration:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Bearbeite **zebrad.toml** nach deinen Vorlieben (Lauschadresse, Ports, Statusverzeichnis, Caching).

**Starte den Knoten:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Bild](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Der Knoten beginnt mit der Synchronisierung ab Genesis – rechne je nach Hardware und Netzwerk mit mehreren Stunden (oder mehr).

**5. Zallet (Wallet) installieren / einrichten**

Zallet wurde entwickelt, um den Wallet-Teil von zcashd zu ersetzen.

Prüfe die GitHub-/Release-Seite von Zallet auf Binärdateien.

**Oder aus dem Quellcode bauen:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Bild](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Starte die GUI oder CLI (entsprechend deiner Installation).
* Konfiguriere sie so, dass sie sich über einen RPC- oder API-Endpunkt mit deinem lokalen Zebrad-Knoten verbindet.

**6. Deine zcashd-Wallet in Zallet importieren**

Dafür benötigst du keinen laufenden zcashd. Zallet liest die Datei `wallet.dat` direkt, was wichtig ist, da zcashd nicht mehr gestartet werden kann.

> **Bewahre `wallet.dat` auf.** Die Migration meldet alles, was sie nicht in einer Zallet-Wallet darstellen kann, anstatt es zu importieren; dieses Schlüsselmaterial existiert dann nur in `wallet.dat`. Lösche die Datei nach der Migration nicht.

Führe zuerst `zallet init-wallet-encryption` aus. Zallet verschlüsselt Schlüsselmaterial für eine age-Identität, und diese Identität muss existieren, bevor Schlüssel importiert werden.

Konvertiere dann deine Konfiguration und deine Wallet:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` ist nur in Builds mit dem Feature `zcashd-import` vorhanden, und das Lesen von `wallet.dat` benötigt das Dienstprogramm `db_dump` aus Berkeley DB 6.2, der von zcashd verwendeten Version. Falls du mehr als eine Wallet-Datei hast, führe den Befehl einmal pro Datei aus und füge bei späteren Durchläufen `--allow-multiple-wallet-imports` hinzu; jede Datei wird zu einem eigenen Satz von Konten. Deine `rpcuser` und `rpcpassword` werden nicht übernommen, weil Zallets JSON-RPC standardmäßig Cookie-Authentifizierung verwendet; füge mit `zallet add-rpc-user` Zugangsdaten hinzu, wenn du sie benötigst.

**Was übernommen wird**

* Mnemonische Seeds und die daraus abgeleiteten Schlüssel, wobei Konten passend zur zcashd-Wallet neu erstellt werden
* Eigenständig importierte Sapling-Ausgabeschlüssel und transparente Schlüssel
* Transparente Watch-only-Einträge, die ihren öffentlichen Schlüssel oder ihr Redeem-Skript enthalten
* Konto-Geburtstage, damit das Scannen der Chain auf der richtigen Höhe beginnt

**Was nicht übernommen wird.** Diese Elemente werden mit Anzahlen gemeldet, anstatt importiert zu werden:

* **Sprout-Ausgabeschlüssel und -Gelder.** Zallet unterstützt den Sprout-Pool nicht. Der dokumentierte Weg bestand darin, Sprout-Gelder vor der Stilllegung mit zcashd auszuzahlen, und das ist nicht mehr möglich. Falls dich das betrifft, frage im [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) oder im [Community-Forum](https://forum.zcashcommunity.com/), bevor du etwas anderes unternimmst.
* Adressbucheinträge
* Watch-only-Einträge, die ohne öffentlichen Schlüssel oder Redeem-Skript gespeichert wurden, sowie Einträge mit unkomprimierten öffentlichen Schlüsseln
* Regtest-Wallets

**Danach sichern.** Eine Mnemonik allein ist keine vollständige Sicherung, da importierte Schlüssel nur in der Wallet-Datenbank existieren. Bewahre sichere Kopien von `wallet.db`, der von der Option `keystore.encryption_identity` angegebenen age-Verschlüsselungs-Identitätsdatei und deiner mnemonischen Phrase auf; behalte außerdem die ursprüngliche `wallet.dat`. Beachte, dass `wallet.db` selbst nicht verschlüsselt ist: Sie enthält deinen Transaktionsverlauf und Viewing Keys im Klartext, sichere die Sicherung daher an einem sicheren Ort.

**Wallet-Rescan & Synchronisierung**

* Sobald die Schlüssel importiert sind, löst Zallet über Zebrad einen erneuten Scan der Chain aus.
* Gib Zallet etwas Zeit, um deinen Kontostand und Transaktionsverlauf wiederherzustellen.

**7. Kontostände und Synchronisierung prüfen**

Nach dem Import verbindet sich Zallet mit deinem Zebrad-Knoten und scannt die Blockchain erneut.
Sobald die Synchronisierung abgeschlossen ist, sollten deine Kontostände und Transaktionen genau wie zuvor erscheinen.

Du kannst den Synchronisierungsstatus deines Knotens prüfen, indem du Folgendes ausführst:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Bild](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Oder prüfe die Logs.

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
        <td className="px-6 py-4">Prüfe **zebrad.toml** und verwende einen freien Port</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Langsame Synchronisierung</td>
        <td className="px-6 py-4">Netzwerküberlastung</td>
        <td className="px-6 py-4">Stelle eine stabile Internetverbindung sicher, starte Zebrad neu</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Wallet fehlen Transaktionen</td>
        <td className="px-6 py-4">Unvollständiger Schlüsselimport</td>
        <td className="px-6 py-4">Importiere Schlüssel erneut oder führe in Zallet einen erneuten Scan durch</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet kann sich nicht mit dem Knoten verbinden</td>
        <td className="px-6 py-4">Knoten läuft nicht oder falscher Endpunkt</td>
        <td className="px-6 py-4">Starte Zebrad und verifiziere den korrekten RPC-Port</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet stürzt ab</td>
        <td className="px-6 py-4">Veralteter Build</td>
        <td className="px-6 py-4">Aktualisiere auf das neueste Release von GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Fazit**

Die Migration von zcashd zu Zebrad und Zallet bietet dir eine schnellere, sicherere und modernere Zcash-Erfahrung.
Mit Rust-basierter Sicherheit, modularem Design und besseren Werkzeugen stellt diese Einrichtung sicher, dass dein Knoten und deine Wallet zukunftsfähig bleiben, während sich das Zcash-Ökosystem weiterentwickelt.

Tipp: Bewahre deine Wallet-Schlüssel offline auf und sichere deine Zallet-Daten regelmäßig.
Besuche [zebra.zfnd.org](https://zebra.zfnd.org) für Zebra sowie [The Zallet Book](https://zcash.github.io/zallet/) oder das [Zallet-Repository](https://github.com/zcash/zallet) für Zallet. Das Kapitel [Migration von zcashd](https://zcash.github.io/zallet/) in The Zallet Book ist die maßgebliche Referenz für Schritt 6.
