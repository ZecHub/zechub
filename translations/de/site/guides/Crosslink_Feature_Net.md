<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Dem Crosslink Feature Net beitreten

## Kurzfassung

- Das Feature Net ist das öffentliche Testnetz von Shielded Labs für [Crosslink](/zcash-tech/crosslink-protocol), die vorgeschlagene Finalitätsschicht, die Staking neben dem Proof-of-Work von Zcash hinzufügt.
- Es läuft mit einer Testmünze, cTAZ. Nichts, was Sie darauf tun, bewegt oder gefährdet Mainnet-ZEC.
- Eine Desktop-App ist der Knoten, der Miner, die Wallet und der Finalizer. Sie schürft standardmäßig cTAZ und hat eine Faucet-Schaltfläche.
- Staking, Unstaking und Auszahlen funktionieren nur während eines „Staking Day“, einem Tag von jeweils drei. Verpassen Sie ihn, warten Sie auf den nächsten.
- Zum Staken fügen Sie die Identität eines Finalizers ein und klicken auf einen Betrag. Dieser Leitfaden verwendet den Finalizer von ZecHub als Beispiel.
- Zwei RPC-Aufrufe zeigen Ihnen Ihren Stand: `wallet_staking_positions` und `get_tfl_recency_status`.

*Getestet mit Feature Net Version 14 unter Windows 11 (Version 10.0.26200.9550), vom 8. bis 10. Oktober 2026. Die Software ist ein Prototyp und ändert sich mit jeder Veröffentlichung. Wenn das, was Sie sehen, von dieser Seite abweicht, vertrauen Sie Ihrem eigenen Durchlauf und eröffnen Sie bitte einen PR.*

## Was das Feature Net ist

Crosslink ist ein Vorschlag und heute nicht Teil von Zcash. Die FAQ von Shielded Labs [Crosslink](https://shieldedlabs.net/crosslink-faq/) besagt, dass es „den standardmäßigen Governance-Prozess von Zcash durchlaufen müsste“, bevor es das Mainnet erreichen könnte. Die Seite [Crosslink Protocol](/zcash-tech/crosslink-protocol) erläutert das Design.

Um das Design mit echten Nutzern zu erproben, betreibt Shielded Labs sogenannte [incentivized feature nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): „eine Reihe incentivierter Testnets“. Im Netzwerk gibt es drei Rollen, und die Desktop-App kann alle übernehmen:

| Rolle | Aufgabe |
|---|---|
| Miner | Erzeugt Proof-of-Work-Blöcke, wie heute bei Zcash |
| Staker | Sperrt cTAZ in einer Delegationsbindung und weist sie einem Finalizer zu |
| Finalizer | Stimmt über die Finalisierung von Blöcken ab. Seine Stimmkraft entspricht dem an ihn delegierten Stake |

Das zugehörige Repository beginnt mit einem Hinweis, den Sie lesen sollten, bevor Sie etwas installieren: Es „existiert, um Ideen zu beweisen, nicht um Produktions-Engineering zu demonstrieren“ und ist „kein produktionsreifer Code“ ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Führen Sie es auf einem Rechner aus, auf dem das akzeptabel ist.

### Was sich mit Version 14 änderte

[Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) erschien am 1. Oktober 2026. Ihr Netzwerk beginnt als reines Proof-of-Work und aktiviert Crosslink in drei Schritten ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), auch auf [ctaz.cash](https://ctaz.cash/v14) dargestellt):

| Block | Was geschieht |
|---|---|
| 20.736 | Staking wird geöffnet |
| 34.560 | Das erste Verzeichnis der Finalizer wird aus den Stakes auf der Chain gebildet |
| 36.288 | BFT-Finalität beginnt, ebenso die Staking-Belohnungen |

Staking-Belohnungen beginnen beim letzten dieser Blöcke. Eine zuvor erstellte Bindung verdient bis dahin nichts ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Dieselbe Veröffentlichung begrenzte das aktive Verzeichnis auf die 12 Finalizer mit dem meisten Stake ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) und gab ihnen, in den Worten der Release Notes, eine Provision: „10 % aller PoS Rewards in einem Block gehen an diese Provisionen, während 90 % an alle Staking-Bindungen verteilt werden“.

### cTAZ und echtes ZEC

cTAZ („Crosslink TAZ“) ist die Testmünze des Feature Net. Sie staken cTAZ, niemals ZEC.

Echtes ZEC kommt erst am Ende ins Spiel. Shielded Labs hat [500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) für die Feature Nets zurückgelegt, und die [release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) besagen, dass es „anteilig ausschließlich auf Grundlage der Menge an cTAZ ausgezahlt wird, die jeder Teilnehmer durch Mining oder Staking verdient hat“. Daraus folgen zwei Dinge:

- **Faucet-Münzen zählen nicht.** cTAZ, die Sie vom Faucet oder einer anderen Person erhalten haben, verdient nichts, wenn es in Ihrer Wallet liegt. Nur Blockbelohnungen aus Mining und Staking zählen.
- **Auszahlungen müssen beansprucht werden, sie erfolgen nicht automatisch.** Shielded Labs kündigt jede Runde im [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) an. Für Runde 2 wurden Teilnehmer gebeten, bis zum 4. Oktober 2026 den Viewing Key ihrer Wallet und eine Mainnet-Adresse zu senden ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Das Netzwerk, auf dem Version 14 läuft und dem dieser Leitfaden beitritt, wurde als Runde 3 angekündigt ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Bevor Sie beginnen

- **Ein Rechner, den Sie laufen lassen können.** Die Veröffentlichung enthält Builds für Windows, macOS, Ubuntu und Arch Linux. Dieser Leitfaden wurde auf Windows ausgeführt, auf einem PC mit einem Intel Core i5-8350U-Prozessor.
- **Ein Staking Day.** Prüfen Sie, wann der nächste beginnt, bevor Sie etwas planen. Das Dashboard von [Staker Space's dashboard](https://crosslink.staker.space/) zählt bis dahin herunter.
- **Nichts weiter.** Kein ZEC, kein Konto und keine Registrierung.

## Schritt 1: App herunterladen und Datei prüfen

1. Öffnen Sie die [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) und scrollen Sie zu **Assets**.
2. Laden Sie die Datei für Ihr System herunter. Unter Windows ist das `zebrad_v14_win32.exe`.
3. Vergleichen Sie den SHA-256-Wert der Datei mit dem Hash, den GitHub neben diesem Asset anzeigt.

Unter Windows in PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Der Hash, den GitHub für diese Datei anzeigt, lautet `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Hexadezimalwerte unterscheiden nicht zwischen Groß- und Kleinschreibung, daher sind die Großbuchstaben oben in Ordnung. Damit die Shell statt Ihrer Augen vergleicht:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Wissen Sie, was diese Prüfung leistet. Die Veröffentlichung trägt keine Signatur, daher sagt ein übereinstimmender Hash nur, dass der Download vollständig ist und die Datei derjenigen entspricht, die GitHub bereitstellt. Er sagt nicht, wer sie erstellt hat. [Verifying Zcash Releases](/guides/verifying-zcash-releases) erläutert den Unterschied.

## Schritt 2: Knoten starten und synchronisieren lassen

Starten Sie die App aus einem Terminal, damit ihre Startmeldungen auf dem Bildschirm bleiben. Verwenden Sie ein gewöhnliches PowerShell-Fenster, nicht eines, das mit „Als Administrator ausführen“ geöffnet wurde: Dies ist unsignierte Prototyp-Software und benötigt keine Administratorrechte.

```powershell
.\zebrad_v14_win32.exe
```

Ein Fenster mit dem Titel „Zcash Crosslink Visualizer“ wird geöffnet. Links befindet sich die Wallet mit den Tabs **Your Wallet** und **Faucet Wallet**, in der Mitte wird die Chain dargestellt und rechts sind die Finalizer aufgelistet. Das Terminal gibt weiterhin das Protokoll des Knotens aus. Lassen Sie beide geöffnet, während Sie das Netzwerk verwenden.

Die Release Notes verlinken ein [video of the Windows install](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

Die App speichert ihre Daten in einem Cache-Ordner: `%LOCALAPPDATA%\zebra` unter Windows, `~/.cache/zebra` unter Linux und `~/Library/Caches/zebra` unter macOS, laut den Release Notes.

**Bewahren Sie das Geheimnis für sich.** Dieser Ordner enthält eine Datei namens `secret.seed`. Die App erstellt sie beim ersten Start ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) und leitet daraus Ihre Wallet und Ihre Finalizer-Identität ab ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). Die App hat außerdem eine Schaltfläche **Copy Seed**, die dasselbe Geheimnis in Ihre Zwischenablage kopiert. Wer eines davon besitzt, kontrolliert Ihre Wallet. Fügen Sie es niemals in einen Chat, Forumsbeitrag oder Screenshot ein.

### So erkennen Sie, dass Sie synchronisiert sind

Laut den Release Notes gibt es „keine integrierte Überwachung dafür, wie nahe Sie dem Netzwerk-Tip synchronisiert sind“. Version 14 bietet dennoch etwas: Das Dropdown **Network Info** oben im Fenster enthält Zeilen für PoW Height, Wallet Sync und Blocks Behind Known PoW ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Vergleichen Sie Ihre Höhe mit der auf [Staker Space](https://crosslink.staker.space/) oder [ctaz.cash](https://ctaz.cash/).

Der Knoten antwortet auch per RPC:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

Der RPC-Port `127.0.0.1:8232` ist in diesem Build standardmäßig geöffnet und benötigt kein Passwort ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Er lauscht nur auf Ihrem eigenen Rechner, und alles, was auf diesem Rechner läuft, kann ihn aufrufen.

Bei diesem Durchlauf dauerte die erste Synchronisierung von Block 0 bis zum Tip bei etwa Block 28.400 ungefähr 50 Minuten.

**Nach einem Neustart zeigt Ihr Guthaben eine Zeit lang null an.** Bei jedem Start baut die App die Wallet aus `secret.seed` neu auf und scannt die Chain erneut ab Block 0 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Bis der Scan Ihre Transaktionen erreicht, zeigen Ihr Guthaben und Ihr Stake 0 an. Bei diesem Durchlauf waren sie etwa 15 Minuten nach einem Neustart wieder sichtbar. Die Wallet des Faucets wird auf dieselbe Weise erneut gescannt ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), und während des Scans zeigte der Tab Faucet Wallet ein sehr großes Guthaben. Ignorieren Sie beides, bis Wallet Sync abgeschlossen ist.

## Schritt 3: Etwas cTAZ beschaffen

### Schürfen

Laut den Release Notes beginnt die App nach der Synchronisierung mit CPU-Mining für Ihre eigene Wallet. Sie müssen nichts einschalten. Geschürfte Münzen gehen an eine transparente Adresse Ihrer eigenen Wallet ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Ob sie einen Block findet, ist eine andere Frage. Die Hinweise warnen, dass „andere, die schneller minen, Sie möglicherweise übertreffen; daher gibt es keine Erfolgsgarantie“. Standardmäßig verwendet der integrierte Miner einen einzelnen CPU-Thread ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Um mehr Threads zu verwenden, setzen Sie vor dem Start der App eine Umgebungsvariable im selben PowerShell-Fenster ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Dieser Durchlauf verwendete vier:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Die Variable gilt nur so lange wie dieses Fenster geöffnet ist. Mit ihr zeigte der Prozessorzähler von Windows, dass der Knoten vier bis fünf Prozessoren an Rechenzeit verwendete, gemessen in Prozent eines logischen Prozessors:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Das Ergebnis: Ein Intel Core i5-8350U, der mit vier Threads von früh am 8. Oktober bis zum Nachmittag des 9. Oktober schürfte, fand keinen Block.

### Oder das Faucet verwenden

Die App hat unten rechts eine Schaltfläche **Receive cTAZ**. Im Quellcode von Version 14 sendet ein Klick 0,5 cTAZ aus der Wallet des Faucets an Ihre ([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Das Faucet ist eine einzelne Wallet, die jede Kopie der App mitführt ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), und der Tab **Faucet Wallet** zeigt ihr Guthaben.

Die Schaltfläche ist deaktiviert, sofern das Faucet nicht mehr als 5,01 cTAZ in Shielded Coins besitzt ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Der Tab zählt auch die geschürften Münzen des Faucets, und diese sind nur in Losen von genau 10 cTAZ plus einer Gebühr shielded ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), daher kann der Tab viel anzeigen, während die Schaltfläche grau bleibt. Bei diesem Durchlauf blieb sie am 8. und 9. Oktober grau und zeigte beim Darüberfahren „The faucet is mining more funds.“, während der Tab 14.74695 cTAZ anzeigte.

**Wenn die Schaltfläche grau ist, fragen Sie Ihren eigenen Knoten.** Der Knoten besitzt eine Methode für Faucet-Anfragen, `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), auf die die 5,01-cTAZ-Regel der Schaltfläche nicht angewendet wird. Ersetzen Sie `YOUR_ADDRESS` durch Ihre eigene Adresse (es ist das Feld `address` von `wallet_spendable_funds`, weiter unten):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

Diese Antwort bedeutet, dass die Anfrage eingereiht wurde, nicht dass sie gesendet wurde. Bei diesem Durchlauf wurden die 0,5 cTAZ des Faucets bei Block 33.306 geschürft und waren bei Block 33.322 ausgebbar. Fragen Sie nur einmal: Das Faucet wird gemeinsam genutzt, und eine zweite Anfrage für dieselbe Adresse wird abgelehnt, solange die erste aussteht ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Oder einen anderen Teilnehmer fragen

Jeder im Netzwerk kann Ihnen mit der Schaltfläche **Send** der App cTAZ senden. Bei diesem Durchlauf schickte ein anderer Teilnehmer 31 cTAZ. Es erschien als „Received“ mit der Notiz „send from user wallet“, der Notiz, die das eigene Send der App anfügt ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Fragen Sie im [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) und geben Sie nur Ihre Adresse weiter.

Faucet-Münzen und Geschenke reichen aus, um Staking zu lernen. Sie zählen nicht für ZEC-Belohnungen.

### Prüfen, was Sie ausgeben können

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Dies war die Antwort, nachdem die 0,5 cTAZ des Faucets eingetroffen waren, mit gekürzter Adresse:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Die Beträge sind in Zatoshis: 100.000.000 ergeben ein cTAZ. Shielded Coins benötigen 3 Bestätigungen, bevor sie als ausgebbar gelten ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Münzen vom Faucet und von anderen Teilnehmern landen in `spendable_zats`. Geschürfte Münzen sind transparent und landen daher in `unshielded_zats` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Einen Block nach dem zweiten Stake dieses Durchlaufs erschien der Rest des Guthabens unter `pending_zats`. Einige Blöcke später war er wieder ausgebbar.

## Schritt 4: An einen Finalizer staken

### Auf einen Staking Day warten

Staking, Unstaking und Auszahlen werden nur akzeptiert, solange

```text
block height mod 10,368 < 3,456
```

gilt. Dies ist ein Fenster von 3.456 Blöcken zu Beginn jeder Folge von 10.368 Blöcken. Bei dem Netzwerkziel von 25 Sekunden pro Block entspricht das einem Tag von jeweils drei ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Die ersten Fenster von Version 14 öffnen bei den Blöcken 20.736, 31.104, 41.472 und 51.840.

Laut den Release Notes kündigt die App den Anfang und das Ende jedes Staking Day an. Bei diesem Durchlauf zeigte ihre Blockliste eine rote Zeile „* STAKING DAY END *“ zwischen den Blöcken 34.559 und 34.560.

**Die Release Notes sagen zwei verschiedene Dinge.** Ihre Liste der Änderungen nennt „~1 Tag für Staking Day und ~3 Tage für den Staking Cycle“, was dem Code entspricht. Weiter unten besagt ein aus Season 1 übernommener Abschnitt weiterhin, dass ein Staking Day alle 150 Blöcke beginnt und 70 Blöcke dauert. Richten Sie sich nach der ersten Angabe. Die obige Endzeile liegt dort, wo die erste Regel das Fenster schließt (34.560 mod 10.368 = 3.456); nach der zweiten Regel würde Block 34.560 innerhalb eines Fensters liegen.

### Einen Finalizer auswählen

Ein Finalizer wird durch seine Identität bezeichnet, eine Zeichenfolge, die mit `zfinv1` beginnt. ZecHub veröffentlicht die Identität seines betriebenen Finalizers in [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Kopieren Sie eine Identität aus einer Quelle, der Sie vertrauen. Laut den Release Notes listet die App Finalizer auch in ihrem rechten Bereich auf, mit einem Kopiersymbol links neben jedem Eintrag.

Nachdem Sie gestakt haben, nennen der Wallet-Verlauf und RPC den Finalizer mit einem Hex-Schlüssel statt mit seiner Identität. Für den Finalizer von ZecHub lautet dieser Schlüssel `2941ef23...266aae8f`.

Wählen Sie einen Finalizer, dem Sie vertrauen. Das Design hat kein automatisches Slashing, erlaubt jedoch „einen von Nutzern koordinierten Hard Fork, der sämtlichen an einen benannten Finalizer delegierten Stake verbrennt“ ([Crosslink book, design overview](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Die Wahl entscheidet auch, wer abstimmt. Jede aktive Bindung erhält ihren Anteil der Staking-Belohnung. Ist ihr Finalizer unter den 12 im Verzeichnis, geht ein Zehntel dieses Anteils als Provision an den Finalizer. Eine Bindung, die auf einen Finalizer außerhalb der 12 weist, behält ihren gesamten Anteil, aber dieser Finalizer stimmt nicht ab ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Staken

1. Kopieren Sie die Identität des Finalizers.
2. Klicken Sie im Tab **Your Wallet** auf **Stake**.
3. Klicken Sie auf **Paste Identity**. Die Zeile über der Schaltfläche ändert sich zu den ersten und letzten Zeichen der Identität, `[zfinv1j6..YWyzp4YN]` für die von ZecHub. Prüfen Sie dies, bevor Sie fortfahren.
4. Klicken Sie auf einen Betrag. Die Beträge sind feste Stufen, der kleinste beträgt 0,01 cTAZ, und nur die durch Ihr Guthaben gedeckten Beträge leuchten auf. Mit 0,5 cTAZ leuchteten +0,01 cTAZ und +0,1 cTAZ auf.

**Nichts fordert Sie zur Bestätigung auf, und nichts scheint zu passieren.** Bei diesem Durchlauf sagte der Tester: „I clicked it once and nothing happened, it just turned grey and lit up back.“ Der Stake war dennoch erfolgt. Im Wallet-Verlauf stand „Staked @ 33334 to 2941ef23..266aae8f“, die Gebühr betrug 0,00015 cTAZ und die Wallet zeigte 0,010 cTAZ Staked. Ein zweiter Stake wenige Minuten später erzeugte bei Block 33.348 eine zweite Bindung.

Jeder Stake erstellt seine eigene Delegationsbindung. Die festen Beträge und der Staking Day dienen beide dem Datenschutz: Sie machen es schwieriger, den Stake einer Person vom Stake einer anderen zu unterscheiden.

## Schritt 5: Ihre Position prüfen

### Ihre Bindungen

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Dies war die Antwort bei Block 36.490, zwei Tage nach dem Staking:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

Der Aufruf benötigt keine Parameter. Er gibt Ihre aktiven Bindungen zurück, gruppiert unter dem Schlüssel des Finalizers, den jede unterstützt, sowie die Bindungen, deren Unstaking abgeschlossen ist und die ausgezahlt werden können. Jede Bindung zeigt den gestakten Betrag (`initial_val`), ihren aktuellen Wert (`latest_val`) sowie die Transaktion und Blockhöhe, durch die sie erstellt wurde. Belohnungen werden der Bindung selbst hinzugefügt: Bei Block 36.490 war jede Bindung von 1.000.000 Zatoshis auf 1.003.451 angewachsen.

**Das Fenster Edit Stake zeigt jede Bindung zehnmal zu groß an.** Bei diesem Durchlauf wurde jede 0,01-cTAZ-Bindung in ihrer eigenen Zeile als 0,100 cTAZ und nach Beginn der Belohnungen als 0,1003536 cTAZ angezeigt, während die Summen über den Zeilen (0,020 cTAZ, später 0,02007 cTAZ) mit RPC übereinstimmten. Richten Sie sich nach den Summen und RPC.

Dasselbe Fenster zeigte neben dem Finalizer ein Warndreieck, vor und nach Beginn der Finalität. Im Quellcode bedeutet das Dreieck, dass Ihre App diesen Finalizer nicht als online zählt; ein online gezählter Finalizer erhält stattdessen ein WLAN-Symbol ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Die Bindungen erhielten trotzdem Belohnungen.

### Die Finalizer

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Laut den Release Notes meldet dies, wo sich Ihr Knoten im Abstimmungsprozess befindet, und für jeden Finalizer, wann Ihr Knoten zuletzt von ihm gehört hat und wie er abgestimmt hat.

Vor Block 36.288 sind alle Felder null und die Liste ist leer. Dies war die Antwort bei Block 33.354:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

Nach Beginn der Finalität enthält die Liste die Finalizer im Verzeichnis. Bei Block 36.490 enthielt sie 12, darunter den ZecHub von `2941ef23...`, was der Begrenzung des Verzeichnisses auf 12 entspricht. Dies ist der Anfang dieser Antwort, nach dem ersten Eintrag gekürzt:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

Einige Minuten später zeigte der rechte Bereich der App „Finalizers (23)“.

### Unter Linux und macOS

Der [source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) gibt den Aufruf in der Form `curl` an. Ändern Sie den Methodennamen für die anderen Aufrufe. Diese Form wurde für diesen Leitfaden nicht ausgeführt:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Unter Linux sagen die Release Notes, dass Sie wahrscheinlich `xclip` installieren müssen, bevor Kopieren und Einfügen in der App funktionieren.

### Ein RPC-Name, auf den Sie achten sollten

Die Release Notes zu Version 14 beschreiben einen Staking-Aufruf namens `wallet_staking_action`, der ein Objekt entgegennimmt. Der Quellcode von Version 14 hat keine Methode dieses Namens, und bei diesem Durchlauf antwortete der Knoten:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

Die registrierte Staking-Methode lautet [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420). Sie nimmt eine Zeichenfolge entgegen, die die Anfrage als JSON enthält, wobei der Finalizer durch seine `zfinv1`-Identität angegeben wird ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Sie wurde für diesen Leitfaden nicht ausprobiert.

## Unstaking und Auszahlen

Eine Bindung kann nicht an dem Tag rückgängig gemacht werden, an dem sie erstellt wird. Von Anfang bis Ende sind drei Staking Days nötig: Sie staken in einem, führen in einem späteren Unstaking durch und zahlen in einem dritten aus. Die Release Notes ergänzen, dass eine Bindung nicht zwei Staking-Aktionen am selben Staking Day durchführen kann.

*Für diesen Leitfaden nicht ausgeführt. Laut den Release Notes von Version 14:* Um Unstaking durchzuführen, klicken Sie auf **Edit Stake**, wählen Sie eine Bindung aus der Liste Staked Bonds und klicken Sie auf das Kettenglied-Symbol. Um an einem späteren Staking Day auszuzahlen, klicken Sie auf **Edit Stake**, wählen Sie eine Bindung aus der Liste Withdrawable Bonds und klicken Sie auf das Geld-Symbol. Das Verschieben einer Bindung zu einem anderen Finalizer, in den Hinweisen Retargeting genannt, ist jederzeit erlaubt.

## Wo Sie das Netzwerk beobachten können

Der Tab [Crosslink auf ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) sammelt die Werkzeuge an einem Ort, unter einem Hinweis mit dem Wortlaut „Staking on this network does not move ZEC“:

- Gehostet, ohne benötigten Knoten: [Staker Space](https://crosslink.staker.space/), ein „Live-Dashboard für das aktuelle cTAZ-Testnet“ mit Höhe, Minern, Lösungsrate, Staking-Day-Countdown und Finalität, sowie [ctaz.cash](https://ctaz.cash/) mit Mining-Produktion, dem Finalizer-Verzeichnis, Peers und Namensansprüchen für Staking-Adressen.
- Auf Ihrem eigenen Rechner: `zcash-explorer`, dessen Seite `/live/crosslink` Aktivierung, Finalitätsverzögerung, das Verzeichnis und Staking-Positionen zeigt, sowie `crosslink_indexer`, ein SQLite-Index eines Crosslink-Knotens.

## Häufige Fehler

**Nach der Uhr statt nach der Blockhöhe planen.** Staking Days werden in Blöcken gezählt. Beobachten Sie den Countdown eines Dashboards, nicht den Kalender.

**In den letzten Minuten des Fensters staken.** Die Regel wird anhand des Blocks geprüft, der Ihre Transaktion enthält ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), daher muss der Stake geschürft werden, bevor das Fenster schließt, nicht nur gesendet sein.

**Erwarten, Ihren Stake zu schürfen.** Ein CPU-Miner mit vier Threads auf einem Intel Core i5-8350U fand zwischen dem 8. und 9. Oktober keinen Block. Beschaffen Sie Ihr erstes cTAZ über das Faucet oder von einem anderen Teilnehmer.

**Noch einmal klicken, weil nichts zu passieren schien.** Jeder Klick auf einen Betrag ist eine neue Bindung. Prüfen Sie zuerst den Wallet-Verlauf oder `wallet_staking_positions`.

**Nach einem Neustart in Panik geraten.** Ihr Guthaben und Stake zeigen null an, bis die Wallet erneut gescannt wurde. Warten Sie, bis Wallet Sync abgeschlossen ist.

**cTAZ als Spielgeld oder das Geheimnis als harmlos behandeln.** cTAZ ist eine Testmünze, aber das cTAZ, das Sie verdienen, entscheidet über Ihren Anteil an echtem ZEC. Schützen Sie `secret.seed` wie eine Wallet.

**Alte Anweisungen lesen.** Die Release Notes enthalten Text aus früheren Seasons neben den neuen Regeln. Wenn sie dem widersprechen, was Ihr Knoten tut, hat Ihr Knoten recht.

## Verwandte Seiten

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - das Design, das dieses Netzwerk testet
- [Shielded Labs](/zcash-organizations/shielded-labs) - das Team hinter Crosslink
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - was eine Prüfsumme beweist und was nicht
- [Zebra Full Node](/zcash-tech/zebra-full-node) - der Knoten, auf dem die Feature Net-App aufgebaut ist
- [Zcash Testnet](/using-zcash/testnet) - das gewöhnliche Testnetz von Zcash, das ein anderes Netzwerk ist

## Quellen

- [Version 14 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1. Oktober 2026
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2. April 2026
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Die Schritte auf dieser Seite wurden mit Feature Net Version 14 unter Windows 11 (Version 10.0.26200.9550) vom 8. bis 10. Oktober 2026 ausgeführt. Eine Aussage, die die Release Notes oder den Quellcode zitiert, stammt daraus. Alles, was als „nicht ausgeführt“ markiert ist, wurde nicht ausprobiert.*
