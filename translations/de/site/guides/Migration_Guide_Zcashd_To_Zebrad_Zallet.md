# Migrationsleitfaden: Von zcashd zu Zebrad/Zallet

Das Zcash-Ökosystem entwickelt sich weiter. Der traditionelle Zcashd-Full-Node, gepflegt von *Electric Coin Company (ECC)* / *Zodl*, wird schrittweise durch Zebra und Zallet ersetzt.

- Zebra ist eine moderne Rust-Implementierung des Zcash-Protokolls, entwickelt von der Zcash Foundation
- Zallet ist eine leichtgewichtige Wallet, die für eine nahtlose Anbindung an von Zodl entwickelte Zebra-Nodes konzipiert ist

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTBildOkt12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

Dieser Leitfaden führt dich durch die Migration von **Zcashd** zu **Zebrad** und **Zallet**, einschließlich Einrichtung, Wallet-Import und Fehlerbehebung bei häufigen Migrationsproblemen.

---

## Das Zcash-Projekt hat offiziell angekündigt, dass zcashd im Jahr 2025 eingestellt wird.

**Status der Einstellung & was das bedeutet**

- Das Zcash-Projekt hat offiziell angekündigt, dass zcashd im Jahr 2025 eingestellt wird.
- Full Nodes werden auf Zebrad, eine Rust-Implementierung, migriert, während Zallet die Wallet-Komponente von zcashd ablösen soll. 
- Als Reaktion darauf verfolgt das Zebra-Projekt einen Meilenstein zur „Zcashd Deprecation“, um Kompatibilität, RPC-Migration und Unterstützung des Ökosystems sicherzustellen.
- Für viele RPC-Methoden sollen Zebrad/Zallet als Drop-in-Ersatz dienen (indem sie das Verhalten emulieren oder angleichen). Andere werden sich ändern oder möglicherweise nicht unterstützt.

**Warum migrieren – über die Einstellung hinaus**

Auch unabhängig von der Einstellung gibt es überzeugende Gründe für den Umstieg:
- Sicherheit & Robustheit: Rusts Speichersicherheit und moderne Tooling verringern das Risiko von Schwachstellen.
- Leistung & Effizienz: Zebrad ist auf Parallelisierung, effizientere Ressourcennutzung und schnellere Synchronisierung ausgelegt.
- Modulare Architektur: Die Trennung von Node-Logik (Zebrad) und Wallet-UI (Zallet) bietet klarere Abgrenzungen und bessere Upgrade-Pfade.
- Zukünftige Kompatibilität im Ökosystem: Tools, Erweiterungen und der Rest des Zcash-Ökosystems werden sich zunehmend auf Zebrad/Zallet ausrichten.
- Beruhigende Gewissheit: Du vermeidest es, auf einer eingestellten, nicht unterstützten Komponente sitzenzubleiben.

### Tauchen wir jetzt in den Migrationsleitfaden ein

**1. Alles sichern**
* Sichere deine wallet.dat (oder jede andere Wallet-Datei / jeden Key-Store) von deinem zcashd-Node.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* Speichere deine zcash.conf und alle benutzerdefinierten Einstellungen.
* Exportiere eine Kopie aller RPC-Skripte oder Automatisierungen, die du verwendest.
* Verifiziere, dass deine Backups gültig sind (z. B. indem du versuchst, sie in einer anderen Umgebung zu öffnen oder zu prüfen).
* Prüfe, auf welche JSON-RPC-Methoden du derzeit angewiesen bist.
* Vergleiche dies mit der geplanten Kompatibilitätstabelle auf der [Zcash-Supportseite](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 
* Bereite dich auf Änderungen oder fehlende Methoden vor (einige benötigen möglicherweise Workarounds oder Anpassungen).

**2. Systemanforderungen & Speicherplatz**
* Stelle sicher, dass du ausreichend Speicherplatz hast (die Zcash-Chain ist groß). Mindestens 10 GB freier Speicherplatz.
* Stelle sicher, dass dein Rechner über ein stabiles Netzwerk, CPU und RAM verfügt.
* Eine Internetverbindung 
* Wenn du aus dem Quellcode kompilieren möchtest, müssen Rust & Cargo installiert sein.

**3. Zebrad installieren / einrichten**
Du kannst entweder ein vorgefertigtes Binary herunterladen oder aus dem Quellcode bauen.
* Die Zcash Foundation veröffentlicht Releases und Binaries für Zebra. Du kannst z. B. ein Installationsskript verwenden oder das passende Binary für dein Betriebssystem herunterladen.

* Beachte, dass in neueren Zebra-Versionen [der RPC-Endpunkt in Docker standardmäßig nicht mehr aktiviert ist.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**Option A: Installation über ein vorgefertigtes Binary**  
Unter **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

Dadurch wird die neueste stabile Version von zebrad installiert.

**Option B: Aus dem Quellcode bauen**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

Verschiebe nach dem Build das Binary in deinen Pfad:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. Konfiguration & Start**  
Erzeuge eine Standardkonfiguration:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

Bearbeite **zebrad.toml** nach deinen Vorlieben (Listen-Adresse, Ports, Zustandsverzeichnis, Caching).

**Starte den Node:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

Der Node beginnt ab Genesis mit der Synchronisierung – rechne je nach Hardware und Netzwerk mit mehreren Stunden (oder mehr).

**5. Zallet installieren / einrichten (Wallet)**

Zallet ist dafür ausgelegt, den Wallet-Teil von zcashd zu ersetzen.

Prüfe die Zallet-GitHub-/Release-Seite auf Binaries.

**Oder aus dem Quellcode bauen:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* Starte die GUI oder CLI (je nachdem, was deine Installation bereitstellt).
* Konfiguriere sie so, dass sie sich über einen RPC- oder API-Endpunkt mit deinem lokalen Zebrad-Node verbindet.

**6. Deine zcashd-Wallet in Zallet importieren**  
Per Private-Key-Dump

Exportiere auf zcashd deine privaten Schlüssel:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* Wähle in Zallet „Schlüssel importieren“ oder eine ähnliche Option.
* Verweise auf **zcashd_keys.txt**. 
* Zallet sollte ZEC-Adressen und zugehörige Schlüssel analysieren und importieren.

**Per Seed-Phrase** (falls zutreffend)

* Wenn deine Wallet ein Seed-Backup unterstützt, verwende in Zallet „Aus Seed-Phrase wiederherstellen“.
* Das funktioniert nur, wenn deine zcashd-Wallet aus einem Seed abgeleitet wurde (oder du eine Seed-Konvertierung hast).

**Wallet-Rescan & Synchronisierung**

* Sobald die Schlüssel importiert sind, startet Zallet über Zebrad einen erneuten Scan der Chain.
* Gib Zallet etwas Zeit, um dein Guthaben und deinen Transaktionsverlauf wiederherzustellen.

**7. Guthaben und Synchronisierung überprüfen**

Nach dem Import verbindet sich Zallet mit deinem Zebrad-Node und scannt die Blockchain erneut.
Sobald die Synchronisierung abgeschlossen ist, sollten deine Guthaben und Transaktionen genau wie zuvor erscheinen.

Du kannst den Synchronisierungsstatus deines Nodes überprüfen, indem du Folgendes ausführst:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

Oder prüfe die Logs.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
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
        <td className="px-6 py-4">Port wird bereits verwendet oder fehlerhafte Konfiguration</td>
        <td className="px-6 py-4">Prüfe **zebrad.toml** und verwende einen freien Port</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Langsame Synchronisierung</td>
        <td className="px-6 py-4">Netzwerküberlastung</td>
        <td className="px-6 py-4">Sorge für stabiles Internet, starte Zebrad neu</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Wallet zeigt fehlende Transaktionen</td>
        <td className="px-6 py-4">Unvollständiger Schlüsselimport</td>
        <td className="px-6 py-4">Importiere die Schlüssel erneut oder starte in Zallet einen Rescan</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet kann keine Verbindung zum Node herstellen</td>
        <td className="px-6 py-4">Node läuft nicht oder falscher Endpunkt</td>
        <td className="px-6 py-4">Starte Zebrad und überprüfe den korrekten RPC-Port</td>
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

Die Migration von zcashd zu Zebrad und Zallet bietet dir ein schnelleres, sichereres und moderneres Zcash-Erlebnis.
Mit Rust-basierter Sicherheit, modularem Design und besserem Tooling stellt dieses Setup sicher, dass dein Node und deine Wallet zukunftsfähig bleiben, während sich das Zcash-Ökosystem weiterentwickelt.

Tipp: Bewahre deine Wallet-Schlüssel offline auf und sichere deine Zallet-Daten regelmäßig.
Besuche [zebra.zfnd.org](https://zebra.zfnd.org) und [zallet.zfnd.org](https://zallet.zfnd.org) für Updates und Support aus der Community.
