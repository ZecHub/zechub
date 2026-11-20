# Abschirmtes Offline-Signieren

> **Kernidee:** Die Begleit-Wallet sieht alles, was zum Erstellen und Überwachen einer abgeschirmten Transaktion nötig ist. Nur die Hardware-Wallet hält die Befugnis, eine Ausgabe zu autorisieren. Diese Aufteilung ist der ganze Zweck des abgeschirmten Offline-Signierens.

Beim Abschirmen in Zcash werden Gelder von einer öffentlichen, transparenten Adresse auf eine private, abgeschirmte Adresse übertragen. Dabei werden Transaktionsdetails mithilfe der Datenschutzfunktionen von Zcash verborgen.

### Was ändert sich, wenn du ZEC abschirmst?

Bei einer transparenten Zcash-Transaktion können Informationen wie:

- Absenderadresse
- Empfängeradresse
- übertragener Betrag

auf der Blockchain beobachtet werden.

Wenn du ZEC abschirmst, werden deine Gelder in einen privaten Pool übertragen (etwa Ironwood). Die Blockchain kann überprüfen, ob eine Transaktion gültig ist, ohne deine privaten Transaktionsdetails offenzulegen. Seit dem Upgrade NU6.3 am 28. Juli 2026 fließen neu abgeschirmte Gelder in den Pool Ironwood, da der ältere Pool Orchard keine neuen Einzahlungen mehr annimmt, Auszahlungen aber weiterhin ermöglicht.

### Komponenten einer abgeschirmten Transaktion

### 1. Die Note (der Datensatz zum abgeschirmten Guthaben)

Eine Note ist ein privater kryptografischer Datensatz, der einen noch nicht ausgegebenen Betrag an ZEC darstellt, der einer Nutzerin oder einem Nutzer gehört.

Anders als bei einer öffentlichen Blockchain, auf der Guthaben im Klartext aufgeführt sind, verschlüsselt eine abgeschirmte Note den Wert und die Angaben zur Inhaberschaft, sodass Beobachter auf der Blockchain nicht sehen können, wem die Gelder gehören.

Wenn eine Transaktion gestartet wird, durchsucht die Begleit-Wallet das Hauptbuch, ermittelt die nicht ausgegebenen Notes der Nutzerin oder des Nutzers und wählt die auszugebenden Notes aus.

### 2. Der Nullifier (der Mechanismus zur Erkennung doppelter Ausgaben)

Da die Details einer Note im öffentlichen Hauptbuch verborgen sind, benötigt das Netzwerk einen Mechanismus, um doppelte Ausgaben zu erkennen, ohne offenzulegen, welche Note ausgegeben wird.

Ein Nullifier ist ein eindeutiger kryptografischer Marker, der aus einer bestimmten Note abgeleitet wird. Wird eine Note ausgegeben, wird ihr Nullifier auf der Blockchain veröffentlicht.

Das Netzwerk prüft, ob der Nullifier bereits zuvor erfasst wurde. Ist dies nicht der Fall, kann die Ausgabe akzeptiert werden. Entscheidend ist, dass Außenstehende anhand des Nullifiers nicht feststellen können, von welcher bestimmten Note er stammt.

Die Begleit-Wallet leitet den passenden Nullifier ab und erstellt ihn als Teil der Zusammenstellung der Transaktionsdaten.

## Schlüssel

Schlüssel sind kryptografische Informationen, die den Zugriff auf deine Gelder steuern und deiner Wallet Vorgänge wie den Empfang, das Anzeigen und das Ausgeben von ZEC ermöglichen.

Eine Wallet enthält mehrere verschiedene Schlüssel, die jeweils einen anderen Zweck erfüllen – so wie ein einzelnes Konto getrennte Zugangsdaten für Lese- und Schreibzugriff haben kann.

Schlüssel sind für die Beziehung zwischen Begleit-Wallet und Hardware-Wallet zentral, denn verschiedene Schlüssel erfüllen unterschiedliche Zwecke und nur einer davon muss sicher verwahrt bleiben.

Wichtig zu wissen ist, dass jeder abgeschirmte Pool seine Schlüssel als Ableitungsbaum aufbaut, in dem Pfeile von einer Komponente zu den daraus ableitbaren Komponenten weisen. Nutzer, die abgeschirmte Zahlungen empfangen möchten, benötigen eine abgeschirmte Zahlungsadresse, die aus einem Ausgabeschlüssel erzeugt wird.

### Die Schlüsselhierarchie

**1. Ausgabeschlüssel**

Dies ist der sicherheitskritischste Schlüssel. Er ermöglicht es kryptografisch, Ausgaben von ZEC zu autorisieren.

Dieser Schlüssel ist gemeint, wenn an anderer Stelle in diesem Bericht davon die Rede ist, dass „die Hardware-Wallet den Schlüssel verwahrt“.

Bei einer Architektur für Offline-Signieren wird der Ausgabeschlüssel in der Hardware-Wallet aufbewahrt und niemals der Begleit-Wallet offengelegt. Die Begleit-Wallet sollte diesen Schlüssel überhaupt nicht besitzen müssen.

Sowohl in Sapling als auch in Orchard leiten Schlüsselhierarchien die Ausgabebefugnis und die Anzeigemöglichkeiten als zwei getrennte Zweige von einem übergeordneten Ausgabeschlüssel ab:

- **Sapling:** Ein erweiterter Ausgabeschlüssel (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) leitet beweisautorisierende Schlüssel (𝑎𝑘,𝑛𝑠𝑘) und vollständige Anzeigeschlüssel (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘) ab, aus denen wiederum eingehende Anzeigeschlüssel (𝑖𝑣𝑘) und diversifizierte Adressen hervorgehen.
- **Orchard:** Ein übergeordneter Ausgabeschlüssel (𝑠𝑘) verzweigt direkt in einen ausgabeautorisierenden Schlüssel (𝑎𝑠𝑘) und einen vollständigen Anzeigeschlüssel (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Diese strukturelle Aufteilung bildet die formale kryptografische Grundlage für die Isolation von Hardware-Schlüsseln: Die Wallet exportiert den Anzeigezweig (UFVK) auf den Host-Computer, damit dieser Guthaben synchronisieren und Transaktionen erstellen kann, während der ausgabeautorisierende Zweig dauerhaft auf dem Gerät eingeschlossen bleibt.

Die Schlüsselableitung ist streng unidirektional. Das bedeutet, dass sich Anzeigeschlüssel nicht umkehren lassen, um die Ausgabebefugnis wiederherzustellen. Dank dieser kryptografischen Irreversibilität kann ein einheitlicher Full Viewing Key (UFVK) sicher exportiert werden, denn er gewährt vollständige Einsicht in die Wallet, ohne die Ausgabeschlüssel auf dem Gerät offenzulegen.

**2. Anzeigeschlüssel**

Zcash trennt die Möglichkeit, abgeschirmte Aktivitäten einzusehen, von der Möglichkeit, Gelder auszugeben. Ein Anzeigeschlüssel erlaubt einer Wallet oder einer anderen autorisierten Partei, Informationen über abgeschirmte Transaktionen einzusehen, ohne Ausgabebefugnis zu gewähren.

- **Full Viewing Key (FVK), verpackt als einheitlicher Full Viewing Key (UFVK):** wird gezielt aus dem Ausgabeschlüssel abgeleitet. Damit kann Software die abgeschirmten Aktivitäten der Wallet erkennen und entschlüsseln und so Transaktionen identifizieren. Außerdem kann sie Guthaben berechnen, ohne Ausgaben autorisieren zu können. Am besten beschreibt man ihn als weniger privaten Ableger des Ausgabeschlüssels, nicht als schwächere Kopie des Seeds.

Der Full Viewing Key (FVK) bietet vollständige schreibgeschützte Einsicht und wahrt dabei eine strikte Sicherheitstrennung. Da er die Chiffretexte eingehender und ausgehender Notes entschlüsselt (über seine Komponente für die ausgehende Anzeige), kann eine Begleit-Wallet, die nur über einen FVK verfügt, eine vollständige, beschriftete Transaktionshistorie anzeigen und nicht bloß einen laufenden Kontostand.

Mehrere nicht verknüpfbare diversifizierte Zahlungsadressen teilen sich denselben FVK und eingehenden Anzeigeschlüssel (IVK). Dadurch lassen sich unbegrenzt viele Adressen erzeugen, ohne den Aufwand für das Durchsuchen der Blockchain zu erhöhen.

Diese funktionale Trennung bildet die Grundlage für Abläufe zum Offline-Signieren. Das fortlaufende Durchsuchen der Blockchain, das Verfolgen des Verlaufs und die Adressverwaltung werden an die Software auf dem Host ausgelagert, während die Ausgabebefugnis auf dem Hardware-Gerät isoliert bleibt.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### Der entscheidende Unterschied: UFVK und Ausgabeschlüssel

> **Der UFVK kann weitergegeben werden. Der Ausgabeschlüssel muss auf der Hardware-Wallet bleiben.**
>
> Die Begleit-Wallet verwendet den Anzeigeschlüssel, um die Wallet zu überwachen, eingehende Gelder zu erkennen, Notes zu identifizieren und Transaktionen vorzubereiten. Sie verfügt nicht über den privaten Schlüssel, der zum Autorisieren von Ausgaben erforderlich ist.

Wie bereits erwähnt, bildet die Trennung der Schlüssel die Grundlage der Architektur für Offline-Signieren.

Die Begleit-Wallet kann den Großteil der Arbeit zur Vorbereitung einer Transaktion übernehmen, ohne jemals die Kontrolle über die Gelder zu haben. Die Hardware-Wallet muss lediglich die vorbereitete Transaktion empfangen und den abschließenden Signiervorgang durchführen.

Hersteller von Hardware-Wallets müssen diese Trennung nicht selbst erfinden. Das Schlüsselkonzept von Zcash trennt Anzeigemöglichkeiten und Ausgabebefugnis bereits auf Protokollebene; die Hersteller bauen ihre Signier- und Exportfunktionen einfach auf dieser bestehenden Struktur auf. Das Protokoll ermöglicht es, Informationen wie eine abgeschirmte Adresse oder einen vollständigen Anzeigeschlüssel aus einem Ausgabeschlüssel abzuleiten, während der Ausgabeschlüssel selbst privat bleibt. So können Hardware-Wallets wie Ledger, Keystone und Hito der Begleitsoftware die benötigten Anzeigeinformationen bereitstellen, ohne jemals den privaten Schlüssel offenzulegen, mit dem Gelder ausgegeben werden können.

### Was die Begleit-Wallet tatsächlich mit Schlüsselinformationen macht

Mithilfe der Anzeigeschlüsseldaten kann die Begleit-Wallet:

- deine Gelder und Notes identifizieren
- feststellen, welche Notes ausgegeben werden können
- relevante Adressen ableiten oder identifizieren
- die Transaktion erstellen
- die erforderlichen Beweise erzeugen oder ihre Erstellung koordinieren
- die Transaktion zum Signieren vorbereiten

Wichtig zu wissen ist, dass eine Transaktion erstellt werden zu müssen nicht bedeutet, dass dafür der private Ausgabeschlüssel benötigt wird. Diese Entkopplung ist eine der zentralen Sicherheitsideen hinter der Integration von Hardware-Wallets.

## Erstellung und Autorisierung abgeschirmter Transaktionen

Dies sind die Vorgänge, die zum Erstellen und Autorisieren der Transaktion gehören. Einfach ausgedrückt: So verwendet die Wallet diese Daten tatsächlich, um Geld zu senden:

### Transaktionserstellung (Zusammenstellung der abgeschirmten Transaktion)

Die Transaktionserstellung ist der Vorgang, bei dem die Informationen zusammengestellt werden, die nötig sind, um aus der beabsichtigten Zahlung der Nutzerin oder des Nutzers eine gültige Zcash-Transaktion zu erstellen.

Bei der Transaktionserstellung werden die ausgewählten Notes, Empfänger, Beträge, Gebühren, Nullifier und weitere erforderliche Transaktionsdaten zu einer Transaktionsstruktur zusammengefügt. Für abgeschirmte Transaktionen werden außerdem die Informationen vorbereitet, die zur Erzeugung der erforderlichen Zero-Knowledge-Beweise und Signaturen nötig sind.

Diesen Schritt übernimmt normalerweise die Begleit-Wallet. Sie

- wählt die auszugebenden Notes aus
- bestimmt die Ein- und Ausgänge der Transaktion
- berechnet die erforderlichen Werte
- bereitet die Transaktionsdaten vor, die später bewiesen und signiert werden.

Bei einer Einrichtung zum Offline-Signieren können die resultierenden Transaktionsdaten in ein PCZT gepackt und für den sicherheitskritischen Signierschritt an die Hardware-Wallet übergeben werden.

### Beweiserstellung (Nachweis der Protokollgültigkeit)

Die Beweiserstellung bezeichnet die Erzeugung von Zero-Knowledge-Beweisen (etwa Halo 2 oder Groth16), die nachweisen, dass eine Transaktion den Protokollregeln von Zcash folgt.

Der Beweis hilft dem Netzwerk zu garantieren:

- Die ausgebende Person ist berechtigt, die Notes auszugeben
- Die Notes existieren tatsächlich
- Die zugehörigen Nullifier sind eindeutig
- Die Summe der Eingänge entspricht der Summe der Ausgänge zuzüglich der Gebühren.

All dies geschieht, ohne zugrunde liegende private Details offenzulegen.

Die Erzeugung von Beweisen ist sehr rechenintensiv. Wird diese Aufgabe an das Begleitgerät ausgelagert, kann verhindert werden, dass die Hardware-Wallet ins Stocken gerät oder nicht mehr genügend Speicher hat.

### Signieren (Autorisierung der Ausgabe)

Das Signieren unterscheidet sich grundlegend von der Beweiserstellung. Eine digitale Signatur ist ein ausdrücklicher Autorisierungsstempel, der von der Person erzeugt wird, die den privaten Schlüssel besitzt.

Ein Zero-Knowledge-Beweis prüft die Gültigkeit der Transaktion; eine digitale Signatur weist die Ausgabebefugnis nach. Die Signatur bestätigt, dass die tatsächliche Eigentümerin oder der tatsächliche Eigentümer den konkreten Übertragungsparametern zustimmt.

Zum Signieren ist nur wenig Rechenleistung nötig. Damit eignet es sich ideal für eine Hardware-Wallet.

### Was ist abgeschirmtes Offline-Signieren?

Abgeschirmtes Offline-Signieren ist eine Methode, eine abgeschirmte Zcash-Transaktion zu autorisieren und dabei die privaten Ausgabeschlüssel von der mit dem Internet verbundenen Begleit-Wallet isoliert zu halten. Die Transaktion kann auf einem Online-Computer erstellt und vorbereitet werden, während eine separate Hardware-Wallet, die offline oder anderweitig isoliert gehalten wird, ihre geschützten Schlüssel zur Autorisierung der Transaktion verwendet.

Der Vorgang lässt sich vereinfachen zu:

![Shielded cold signing process](/content-images/cold-signing-process.webp)

Die Begleit-Wallet sendet die strukturierten Transaktionsparameter an das Hardware-Gerät. Dieses signiert die Nutzdaten intern, ohne den privaten Ausgabeschlüssel jemals an den Host-Computer weiterzugeben.

## Begleit-Wallets und Hardware-Wallets

An abgeschirmten Transaktionen können sowohl eine Begleit-Wallet als auch eine Hardware-Wallet beteiligt sein, wobei jede eine eigene Aufgabe erfüllt.

### Begleit-Wallet

Was ist eine Begleit-Wallet?

Die Begleit-Wallet läuft auf einem Computer oder Mobilgerät und übernimmt den Großteil der Aufgaben bei der Erstellung einer Transaktion, zum Beispiel:

- die auszugebenden Notes auswählen
- die Transaktion erstellen
- die erforderlichen Transaktionsdaten berechnen
- die Erzeugung der erforderlichen Zero-Knowledge-Beweise koordinieren.

### Warum ist eine Begleit-Wallet nützlich?

Die Begleit-Wallet übernimmt die Transaktionserstellung. Wird der Computer jedoch mit Schadsoftware infiziert, kann ein Angreifer möglicherweise:

- sehen, was du tust,
- eine unsignierte Transaktion ändern,
- versuchen, dich dazu zu bringen, etwas zu genehmigen.

Die Begleit-Wallet benötigt keinen Zugriff auf den privaten Schlüssel, der auf der Hardware-Wallet gespeichert ist. Sie kann daher Transaktionen erstellen und andere rechenintensive Aufgaben übernehmen, während die Hardware-Wallet mit dem privaten Schlüssel die Sicherheitsgrenze bildet.

### Hardware-Wallet

Eine Hardware-Wallet ist ein physisches Offline-Gerät, das deine privaten Schlüssel von verbundenen Telefonen oder Computern isoliert und als sicherer Tresor für deine Krypto-Vermögenswerte dient.

### Warum ist eine Hardware-Wallet nützlich?

Wird dein Computer mit Schadsoftware infiziert, kann ein Angreifer möglicherweise:

- sehen, was du tust,
- eine unsignierte Transaktion ändern,
- versuchen, dich dazu zu bringen, etwas zu genehmigen.

Der private Schlüssel lässt sich nicht einfach aus der Hardware-Wallet auslesen. Daher kann das Gerät als Sicherheitsgrenze dienen.

Bild: Begleit-Wallet und Hardware-Funktionen

Die Trennung zwischen diesen beiden Wallets ist bei abgeschirmten Transaktionen besonders wichtig, weil sie komplexer sind als transparente Transaktionen und Komponenten wie abgeschirmte Notes, Nullifier, Commitments, Zero-Knowledge-Beweise und Transaktionssignaturen umfassen.

Es wäre unpraktisch, wenn die Hardware-Wallet jeden Rechenschritt selbst ausführen müsste. Stattdessen bereitet die Begleit-Wallet die Transaktion vor und stellt der Hardware-Wallet die erforderlichen Informationen zum Signieren bereit, während der private Ausgabeschlüssel im Hardware-Gerät isoliert bleibt.

## Schlüsselisolierung

> Schlüsselisolierung bedeutet, dass die privaten Schlüssel, mit denen eine Ausgabe autorisiert werden kann, die Hardware-Wallet niemals verlassen. Die Begleitsoftware kann die Transaktion vorbereiten, aber nicht signieren.

Schlüsselisolierung bedeutet, die privaten Schlüssel, die zum Autorisieren einer Transaktion erforderlich sind, von der Begleit-Wallet und dem Gerät, auf dem sie läuft, getrennt zu halten. Bei einer abgeschirmten Offline-Signierung kann die Begleit-Wallet die Transaktion erstellen und die erforderlichen Beweise koordinieren, während die Hardware-Wallet die sensiblen privaten Ausgabeschlüssel isoliert hält.

Ist der Begleitcomputer oder das Telefon kompromittiert, kann ein Angreifer möglicherweise vor der Signierung mit der Transaktion interagieren, idealerweise aber nicht den privaten Schlüssel aus der Hardware-Wallet auslesen. Der Schlüssel bleibt somit innerhalb der Sicherheitsgrenze des Hardwaregeräts.

Durch diese Trennung kann die Begleit-Wallet Transaktionen erstellen und Berechnungen ausführen, ohne direkten Zugriff auf das Schlüsselmaterial zu erhalten, das zum Autorisieren der Transaktion erforderlich ist.

![Key isolation](/content-images/key-isolation.webp)

Entscheidend ist die Unterscheidung: „Viewing Key“ bedeutet nicht, dass die App eine schwächere Version des Seeds erhält.

In Zcash wird ein Full Viewing Key (FVK/UFVK) bewusst aus dem Ausgabeschlüssel abgeleitet. Er ermöglicht es seinem Inhaber, relevante abgeschirmte Aktivitäten zu erkennen und zu entschlüsseln, aber keine Ausgaben zu autorisieren. Der FVK ist eine weniger geheime Ableitung des Ausgabeschlüssels.

**Ein wichtiger Datenschutzhinweis:**

Es sollte also klar sein, dass die App mit der UFVK allein zwar keine Gelder stehlen, aber die privaten abgeschirmten Aktivitäten der Wallet einsehen kann.

Deshalb ist es genauer, der Begleit-App *Viewing-Berechtigung* zuzuschreiben, statt einfach von „öffentlichen Informationen“ zu sprechen.

Am einfachsten lässt sich die Idee so zusammenfassen: Die Begleit-Wallet erhält genug Schlüsselmaterial, um zu erkennen, was mit der Wallet geschieht, aber nicht genug, um zu autorisieren, was mit den Geldern der Wallet geschieht. Die Hardware-Wallet hingegen hält die Ausgabeberechtigung isoliert und verwendet sie nur, wenn der Benutzer eine Transaktion genehmigt.

Das ist das grundlegende Schlüsselisolierungsmodell hinter diesen abgeschirmten Zcash Hardware-Wallet-Designs. Dasselbe Modell findet sich, jeweils in einer eigenen Implementierung, in Ledger, Keystone und Hito, die wir bald behandeln.

## PCZT

PCZT steht für Partially Created Zcash Transaction. Es ist das Paket, das eine Zcash Transaktion und die Informationen enthält, die nötig sind, um sie von einer Phase zur nächsten fertigzustellen.

Es handelt sich um ein standardisiertes Format für eine Zcash Transaktion, solange diese noch erstellt wird. Damit können verschiedene Beteiligte oder Geräte unterschiedliche Teile des Erstellungsprozesses übernehmen und die teilweise fertiggestellte Transaktion untereinander weitergeben.

Eine Transaktion zu erstellen ist in Zero-Knowledge-Kryptowährungsprotokollen wie Zcash deutlich komplexer als eine einfache öffentliche Überweisung zu signieren. Abgeschirmte Transaktionen erfordern rechenintensive Zero-Knowledge-Beweise, etwa solche, die mit Halo 2 oder Groth16 erzeugt werden. Daher verfügen Geräte mit geringer Leistung, etwa Hardware-Wallets, möglicherweise nicht über den nötigen Speicher und die Rechenkapazität, um den gesamten Transaktionsablauf zu bewältigen.

Die Einführung von PCZT begegnet mehreren zentralen Herausforderungen der Architektur abgeschirmter Kryptowährungen. PCZT ist ein standardisiertes Zwischenformat, das die Transaktionserstellung in modulare, unabhängige Rollen aufteilt. So kann ein leistungsstarker Begleitcomputer die Transaktion zusammenstellen und Beweise erzeugen, während eine Offline-Hardware-Wallet strikt auf Autorisierung und Signierung beschränkt bleibt.

### Einschränkungen von Hardware und Offline-Speicherung

Hardware-Wallets bieten zwar eine sichere Umgebung zum Schutz privater Ausgabeschlüssel, verfügen aber im Vergleich zu Begleitcomputern meist über weniger RAM, Rechenleistung und Datenübertragungskapazität. Dadurch ist es unpraktisch, auf ihnen rechenintensive Zero-Knowledge-Beweise zu erzeugen oder den vollständigen Transaktionszustand zu verwalten, der während der Transaktionserstellung benötigt wird.

Daher kann die Begleit-Wallet die rechenintensiven Aufgaben übernehmen, während sich die Hardware-Wallet auf den sicherheitskritischen Vorgang konzentriert, die Transaktion mit ihren geschützten Ausgabeschlüsseln zu autorisieren.

Da fragt man sich: Wenn das Gerät so eingeschränkt ist, wie kann es dann noch *genug* überprüfen, um vertrauenswürdig zu sein?

Einfach gesagt: Eine Hardware-Wallet kann nicht einfach einen beliebigen Wert von einem Begleitcomputer annehmen und signieren. Sie braucht genügend Informationen, um festzustellen, dass der zu signierende Wert der Transaktion entspricht, die der Benutzer autorisieren möchte. Das ist ein schwieriger Balanceakt: Das Gerät muss die Transaktion ausreichend parsen und überprüfen, um den Signiervorgang zu schützen, und zugleich strenge Grenzen bei Speicher, Rechenleistung, Firmwaregröße und Implementierungskomplexität einhalten.

Die Verarbeitung von Ledger's Orchard PCZT ist ein Beispiel für diese Herausforderung. Sie zeigt, dass eine spezialisierte, schaltungsabhängige Analyse die Implementierung auf eingeschränkten Geräten vereinfachen kann, bei Änderungen an unterstützten Transaktionsstrukturen oder Schaltkreisen aber möglicherweise Firmware-Anpassungen erfordert.

Zwei laufende Vorhaben zeigen unterschiedliche Ansätze für dieselbe Einschränkung.

In Grant #423 wurde ein Forschungsvorschlag für eine vollständig zeitkonstante Beweiserstellungspipeline vorgelegt, die sich für Open-Source-Hardware-Wallet-Architekturen und gewöhnliche Computer eignet. Untersucht werden sollte kryptografische Infrastruktur, die sich sicher in Umgebungen wie C oder Rust implementieren lässt und zugleich Komplexität und Wartungsaufwand bei der Unterstützung abgeschirmter Zcash verringert.

Einen alternativen Ansatz stellt der vorgeschlagene **Zcash SeedSigner** dar: ein quelloffener, vom Netz getrennter Signierer aus kostengünstigen, leicht verfügbaren Komponenten. Bei dem vorgeschlagenen Ablauf bleibt der Begleitcomputer vom Signiergerät getrennt. Eine PCZT wird über eine Netzwerktrennung hinweg übertragen, damit das Gerät sie selbst überprüfen und signieren kann.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Gemeinsam veranschaulichen diese Ansätze die umfassendere technische Herausforderung bei abgeschirmten Hardware-Wallets: Transaktionserstellung und Beweiserstellung können außerhalb des sicherheitskritischen Geräts stattfinden, doch der Signierer muss weiterhin über genügend Informationen und Prüfkapazität verfügen, um die resultierende Transaktion sicher zu autorisieren.

### PCZT ermöglicht die geteilte Architektur

Der Standard Partially Created Zcash Transaction (PCZT) ist die formale Datenstruktur, die Begleit-Wallet und Hardware-Wallet miteinander verbindet.

Eine Begleit-Wallet kann die Notizenauswahl übernehmen, die Nullifier berechnen und den Zero-Knowledge-Beweis vollständig selbst erzeugen. Das ist möglich, weil die Informationen für diese Schritte, darunter der zur Ableitung der Nullifier verwendete Schlüssel, aus dem Viewing Key stammen und nicht mit der Ausgabeberechtigung verbunden sind. Anschließend verpackt die Begleit-Wallet diese Elemente in einen PCZT-Container.

Das PCZT wird an die Hardware-Wallet übergeben. Diese liest den Transaktionskontext aus, etwa Beträge und Empfängeradressen, wendet mit ihren geschützten Ausgabeschlüsseln die Signatur an und gibt das aktualisierte PCZT an das Begleitgerät zurück.

Dieses Design schafft eine strenge Sicherheitsgrenze: Leistungsstarke Host-Hardware kann komplexe Zero-Knowledge-Berechnungen ausführen, ohne Zugriff auf Ausgabeschlüssel zu benötigen, während leistungsschwache Geräte zur Offline-Speicherung die finanzielle Sicherheit durchsetzen können, ohne aufwendige Kryptografie berechnen zu müssen.

### Kompromisse beim Datenschutz des Beweiserzeugers

Wird die Erzeugung von Zero-Knowledge-Beweisen an die Begleit-Wallet oder einen anderen Beweiserzeuger delegiert, bleiben die Ausgabeschlüssel zwar isoliert, doch der Beweiserzeuger benötigt weiterhin Zugriff auf sensible Transaktionsinformationen wie Notizwerte, Empfängeradressen und Commitments.

Das PCZT erhält die architektonische Trennung aufrecht, indem es ermöglicht, diese Informationen zur Beweiserzeugung bereitzustellen, ohne die für die Autorisierung erforderlichen privaten Ausgabeschlüssel zu übertragen.

So ist die Berechtigung zur Beweiserzeugung von der Ausgabeberechtigung getrennt. Der Beweiserzeuger kann die rechenintensive Beweiserstellung übernehmen, ohne die kryptografische Berechtigung zu erhalten, Gelder des Benutzers auszugeben.

### Interoperabilität von PCZT

Da PCZT zunehmend bei Abläufen mit Zcash Hardware-Wallets, Multisignaturen und netzwerkferner Signierung eingesetzt wird, gewinnt die Interoperabilität zwischen unabhängigen Implementierungen an Bedeutung.

Ein Vorschlag von AngryDavee vom Juni 2026 stellte fest, dass es bereits PCZT-Implementierungen in Projekten wie Ledger, Keystone, Hito, OneKey und der Referenzimplementierung in librustzcash gab. Der Vorschlag stellte jedoch fest, dass gemeinsame Tests fehlten, mit denen sich bestätigen ließe, dass diese Implementierungen PCZTs einheitlich interpretieren.

Als Lösung wurde eine quelloffene Interoperabilitätstestsuite vorgeschlagen, die kanonische PCZT-Testvektoren und Tests zwischen Implementierungen für den vollständigen Ablauf von Erstellen → Signieren → Abschließen enthält. Außerdem sollten Rollengrenzen getestet werden, etwa beim Combiner, bei dem teilweise signierte Informationen verschiedener Signierer zusammengeführt werden können, bevor eine Transaktion abgeschlossen wird.

Das ist für Hardware-Wallets besonders relevant, weil PCZT es ermöglicht, Transaktionserstellung und Signierung zu trennen: Eine Begleit-Wallet kann eine Transaktion erstellen und ein PCZT vorbereiten, während ein Hardwaregerät die erforderlichen Signierinformationen erhält und den sicherheitskritischen Signiervorgang ausführt.

Der Vorschlag wurde nicht umgesetzt, weil Zcash Community Grants nach Prüfung des Vorschlags und unter Berücksichtigung des Feedbacks aus der Community entschied, den Zuschuss nicht weiterzuverfolgen. Daher wurde die vorgeschlagene Testsuite für Tests zwischen Implementierungen im Rahmen dieses Zuschusses nicht entwickelt. Sie ist somit ein vorgeschlagener Ansatz für eine erkannte Interoperabilitätsherausforderung bei PCZT und kein Standard, der derzeit bei Zcash allgemein existiert.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### Der Lebenszyklus eines PCZT

| # | Phase | Beschreibung |
|---|---|---|
| 1 | Ersteller | Initialisiert das PCZT mit globalen Transaktionsmetadaten, darunter Transaktionsversionen, IDs der Consensus-Zweige und Pool-Flags. |
| 2 | Konstruktor | Befüllt die Transaktion mit den vorgesehenen Eingaben und Ausgaben über transparente, Sapling-, Orchard- oder Ironwood-Pools hinweg. |
| 3 | IO-Abschließer | Erklärt die Eingaben und Ausgaben für vollständig, berechnet Binding-Signaturschlüssel und signiert bei Bedarf Dummy-Ausgaben. |
| 4 | Aktualisierer | Fügt Kontextdaten für nachfolgende Beteiligte hinzu, etwa vollständige Viewing Keys, Anker und Merkle-Witnesses. |
| 5 | Beweiserzeuger und Signierer | Führt die Erzeugung von Zero-Knowledge-Beweisen und die kryptografische Signierung aus. Bei modernen PCZT-Versionen sind diese Aufgaben vollständig unabhängig voneinander und können nacheinander oder parallel erfolgen. |
| 6 | Kombinierer | Führt mehrere PCZT-Instanzen deterministisch zusammen, wenn verschiedene Geräte gleichzeitig an Teilen derselben Transaktion arbeiten. Für das Zusammenführen gelten strenge Regeln zur Konfliktlösung, damit nicht versehentlich Daten verloren gehen. |
| 7 | Ausgaben-Abschließer und Extraktor | Validiert alle erforderlichen kryptografischen Elemente, entfernt intermediäre Kontextmetadaten und erstellt die abgeschlossene Zcash-Transaktion, die für die Übertragung ins Netzwerk bereit ist. |

## Hardware-Wallet-Implementierungen in der Praxis

### Auf einen Blick

| Gerät   | Was die Begleitsoftware erhält              | Was auf dem Gerät verbleibt          | Übertragung      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / Orchard FVK, Adressen            | Ausgabeberechtigung                | USB / BLE      |
| Keystone | UFVK + Unified Address                   | Seed / Ausgabeschlüssel              | QR (netzwerkfern)|
| Hito     | UFVK, Unified Address, Seed-Fingerabdruck  | Seed und private Ausgabeschlüssel    | QR / lokal     |


Es wurden mehrere Hardware-Wallet-Implementierungen entwickelt, um zu erproben, wie Zcash abgeschirmte Transaktionen unterstützt werden können, während sensible Ausgabeschlüssel von der Begleit-Wallet isoliert bleiben. Ledger, Keystone und Hito stehen für unterschiedliche Ansätze, den hardwarebasierten Schlüsselschutz in den Zcash-Transaktionsablauf einzubinden.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Um zu verstehen, wie sie abgeschirmte Gelder schützen, muss man zwischen Ausgabeschlüsseln und Viewing Keys unterscheiden. Bei allen drei Geräten folgt die Aufteilung demselben Muster:

| Gerät | Was die Begleit-App erhalten kann | Was auf dem Gerät geschützt bleibt |
|---|---|---|
| Ledger | UFVK / Orchard FVK, Adressen und öffentliche Informationen | Ausgabeberechtigung / privates Schlüsselmaterial |
| Keystone | UFVK + Unified Address | Seed / Ausgabeschlüssel |
| Hito | UFVK, Unified Address, Seed-Fingerabdruck und Netzwerkinformationen | Seed und private Ausgabeschlüssel |

### Ledger als Signierumgebung für Hardware

Ledger ist ein Hardware-Wallet-Unternehmen. Seine Geräte basieren auf einem Secure Element, einem speziellen Chip, der privates Schlüsselmaterial speichert und physisch vom Rest des Geräts sowie von allem, was daran angeschlossen ist, isoliert. Dieses Secure Element ist der Grund, warum ein Ledger-Gerät für die Offline-Speicherung vertrauenswürdig ist. Selbst wenn also der angeschlossene Computer oder das Telefon kompromittiert ist, können die im Secure Element gespeicherten Schlüssel nicht ausgelesen werden.

Ein Ledger-Gerät ist für sich genommen jedoch in Bezug auf eine bestimmte Kryptowährung funktionslos. Darauf muss eine Anwendung installiert sein, die mit der spezifischen Kryptografie dieser Währung umgehen kann.

Ein Ledger-Gerät ist in Bezug auf eine bestimmte Kryptowährung funktionslos und braucht daher eine Anwendung, die mit der Kryptografie dieser Währung umgehen kann. Für Zcash gab es zwei Generationen:

- Die ursprüngliche von Zondax entwickelte App „Zcash Shielded“, die mit Begleit-Wallets wie Zkool verwendet wurde und zum 5. November 2026 eingestellt wird, und
- die neuere App Zcash von Ledger (3.9.4+), die von Ledger Wallet Desktop 4.21+ nativ für abgeschirmte Ironwood-ZEC verwendet wird.

Das folgende Modell der Schlüsselisolierung gilt für beide.

Zkool ist die Begleit-Wallet auf deinem Telefon oder Computer, die mit dieser App kommuniziert. Sie erstellt die Transaktion und sendet sie an den Ledger. Die Zondax-App auf dem Gerät signiert sie dann und sendet die Signatur zurück.

Zondax ist also die Software, die auf der Hardware läuft; Zkool ist die Software, die außerhalb davon läuft und über die App von Zondax mit dem Gerät kommuniziert.

### Was verlässt den Ledger?

Die Software von Ledger Zcash enthält eine spezielle Funktion zum Exportieren des Viewing Keys der Wallet. Mit diesem Schlüssel kann Software Guthaben und Transaktionen einsehen, ohne etwas ausgeben zu können.

Diese Funktion kann eines von zwei Dingen zurückgeben:

- einen Unified Full Viewing Key (UFVK), der als vollständiger Viewing Key alle abgeschirmten Pools von Zcash gleichzeitig abdeckt, oder
- einen Orchard Full Viewing Key (FVK)

In beiden Fällen handelt es sich bei der Ausgabe immer nur um einen Viewing Key. Unabhängig davon, welche Version angefordert wird: Die Funktion kann nicht die eine Information zurückgeben, mit der jemand tatsächlich Gelder bewegen könnte – den Ausgabeschlüssel.

Genau das ist der Zweck des Designs: Es ist so aufgebaut, dass ausschließlich etwas exportiert werden kann, das sich sicher an eine Begleit-App weitergeben lässt.

Die Schlüsselhierarchie von Zcash ist so strukturiert, dass der Ausgabeschlüssel für jeden abgeschirmten Pool zwei separate Dinge ableitet:

- einen Schlüssel, der Ausgaben autorisiert, und
- einen vollständigen Viewing Key

Der FVK kann weitere Viewing-Berechtigungen ableiten, doch dieser Ableitungspfad führt zu keinem Zeitpunkt zurück zur Ausgabeberechtigung. Sobald sich ein Schlüssel in der Hierarchie in den Viewing-Zweig aufgespalten hat, bleibt er dort und kann nicht dazu verwendet werden, den Ausgabeberechtigungsschlüssel zu rekonstruieren, von dem er abgeleitet wurde.

Ironwood folgt demselben Muster, da es die zugrunde liegenden Schlüssel und die Notizenkonstruktion von Orchard wiederverwendet. Auf Konsensebene ist es jedoch ein eigener Pool mit eigenem Commitment-Baum und eigener Nullifier-Menge. Das bedeutet, eine UFVK ist tatsächlich ein Bündel poolbezogener Viewing Keys (transparent, Sapling, Orchard und nun Ironwood) und kein einzelner, flacher Schlüssel.

Eine UFVK, die vor der Aktivierung von Ironwood exportiert wurde, enthält keinen Ironwood-Viewing-Key, da dieser Pool damals noch nicht existierte. Deshalb mussten Wallets aktualisiert werden, um nach dem Upgrade auf NU6.3 UFVKs zu erkennen und abzuleiten, die Ironwood unterstützen.

### Was verbleibt auf Ledger?

Die Ausgabeberechtigung bleibt auf dem Gerät.

Der Ledger-Signierer erhält vom Host eine Transaktion/PCZT und erstellt die Ausgabeberechtigungssignatur, abhängig davon, aus welchem Pool die Transaktion ausgibt (dem Ironwood-Pool, denn die aktuelle Integration von Ledger unterstützt nur Ironwood). Die Signatur wird dann auf dem Gerät erstellt, und der Host erhält nur die Signatur, nicht den privaten Ausgabeschlüssel.

Das entspricht auch dem allgemeinen Sicherheitsmodell von Ledger. Dessen Secure Element isoliert privates Schlüsselmaterial, und die Anwendungssicherheitsanforderungen von Ledger verbieten ausdrücklich, dass Anwendungen solche Geheimnisse an den Host weitergeben.

Der Signierer von Ledger kann den FVK/UFVK exportieren und unabhängig davon Transaktionen signieren. Diese beiden Funktionen werden über getrennte Funktionen bereitgestellt und nicht miteinander gebündelt.

### Was bedeutet das in der Praxis?

Angenommen, deine Ledger enthält 10 ZEC.

Die Begleit-Wallet kann die UFVK besitzen und dadurch feststellen: „Diese Wallet hat 10 ZEC erhalten.“ Sie kann Transaktionen und Guthaben scannen und anzeigen.

Wird die Begleit-Wallet jedoch kompromittiert, kann ein Angreifer mit der UFVK allein keine Ausgabeberechtigungssignatur erstellen.

Die separate Ausgabeberechtigungssignatur ermöglicht es eingeschränkten Geräten wie Hardware-Wallets, abgeschirmte Ausgaben zu autorisieren, ohne den vollständigen zk-SNARK-Beweis selbst erstellen zu müssen.

### Zondax Ledger-Anwendung; die Seite der Hardware-Wallet

#### Was ist Zondax?

Zondax ist ein unabhängiges Entwicklungsunternehmen, das die Ledger Zcash-App entwickelt hat. Sie ist die eigentliche Firmware-Anwendung, die auf Ledger-Hardware läuft und dem Gerät überhaupt erst ermöglicht, Zcash-Transaktionen zu verstehen und zu verarbeiten.

Zondax ist ein externer Entwickler. Ledger-Hardware kann Zcash-Transaktionen nicht von sich aus verarbeiten; diese Fähigkeit erhält sie ausschließlich durch die Software von Zondax.

### Ursprüngliche Implementierung von Zcash Ledger

Das Repository der Ledger-Zcash-App von Zondax enthält die Software, die auf einem Ledger-Gerät läuft. Die App konzentrierte sich anfangs auf abgeschirmte Transaktionen von Sapling, bevor Orchard als primärer abgeschirmter Pool von Zcash existierte. Daher beschränkte sich die Unterstützung von Sapling auf das, was ein Ledger-Gerät mit abgeschirmten ZEC tun konnte.

Ihre Architektur veranschaulicht die Trennung: Die Host- und Begleitseite bereitet Transaktionsinformationen vor, während das Ledger sensible Schlüsseloperationen und die Signierung übernimmt.

Schon in dieser frühesten Version der Unterstützung von Hardware-Wallets für Zcash galten die zentralen Prinzipien: Die Transaktion wird auf dem Host erstellt und der Beweis dort erzeugt; signiert wird isoliert auf dem Gerät.

### Weiterentwicklung in Richtung Orchard

Die Arbeit von Ledger verlagerte sich in Richtung Orchard + PCZT. Das war ein bedeutsamer Übergang und kein kleines Update, denn Orchard verwendet ein anderes Beweissystem (Halo 2 statt Groth16 von Sapling) sowie eine andere Notizen- und Schlüsselstruktur. Um Firmware, die nur Sapling unterstützt, auf die Signierung von Orchard auszuweiten, waren deshalb neue kryptografische Grundlagen auf dem Gerät nötig und nicht bloß ein Firmware-Patch.

Als sich Zcash in Richtung Ironwood weiterentwickelte, verlagerten Zondax und Ledger ihren Entwicklungsschwerpunkt jedoch darauf, Ironwood direkt zu unterstützen, statt erst eine reine Orchard-Implementierung fertigzustellen und sie anschließend für Ironwood neu zu entwerfen. Damit erreichte die Ledger-Implementierung eine weitere Entwicklungsstufe: Ironwood baut auf der kryptografischen Architektur von Orchard auf und führt zugleich einen separaten abgeschirmten Pool und zusätzliche Protokolländerungen ein.

### Was geschieht in dieser Ledger-App?

Der resultierende Ablauf sieht so aus:

1. Der Host erstellt ein PCZT.
2. Der Host sendet die relevanten Transaktionsinformationen an das Ledger-Gerät.
3. Das Gerät erstellt die Ausgabeberechtigungssignaturen für Orchard.
4. Der Host übernimmt alle nachfolgenden Schritte, einschließlich der Binding-Signatur und des endgültigen Zusammenstellens der Transaktion.

Die App auf dem Ledger sieht und erzeugt ausschließlich die Ausgabeberechtigungssignatur. Die rechen- und datenintensiven Aufgaben wie Beweiserzeugung, Binding und Zusammenstellung bleiben vollständig auf dem Host, dem dafür kein Schlüsselmaterial anvertraut werden muss.

### Native abgeschirmte Integration von Ledger; Ledger Wallet Desktop

Die neueste Zcash-Integration von Ledger zeigt konkret, wie sich die Erstellung abgeschirmter Transaktionen und die sicherheitskritische Signierung zwischen Begleitsoftware und Hardware-Wallet aufteilen lassen.

Mit Ledger Wallet Desktop 4.21+ und der Geräte-App 3.9.4+ von Zcash können Benutzer abgeschirmte Ironwood-ZEC direkt über Ledger Wallet Desktop senden und empfangen. Die Integration unterstützt private Überweisungen zwischen abgeschirmten Adressen, das Abschirmen aus dem transparenten Pool, das Entschirmen in den transparenten Pool, private Empfangsadressen und Memos. Transaktionen werden auf dem Ledger-Gerät überprüft und signiert, statt sich ausschließlich auf die vom Computer angezeigten Informationen zu verlassen.

Ein zentraler Bestandteil dieser Architektur ist die Trennung von Viewing- und Ausgabefunktionen. Während der Synchronisierung privater Guthaben exportiert das Ledger einen Unified Full Viewing Key (UFVK), der lokal auf dem Computer gespeichert wird. Damit kann Ledger Wallet Desktop relevante abgeschirmte Transaktionen erkennen und das Wallet-Guthaben ermitteln. Die UFVK verleiht jedoch keine Berechtigung, Gelder auszugeben. Die sicherheitskritische Ausgabeberechtigung verbleibt auf dem Ledger-Gerät, das den abschließenden Signiervorgang ausführt. Dadurch entsteht eine klare Grenze: Der Computer verwaltet den Wallet-Zustand und erstellt Transaktionen; das Hardwaregerät schützt die Fähigkeit, Ausgaben zu autorisieren.

Die aktuelle Integration unterstützt allerdings ausschließlich Ironwood. Orchard- oder Sapling-Gelder werden über Ledger Wallet Desktop weder angezeigt noch verwaltet. Das ist historisch bedeutsam, weil die frühere Zcash-Entwicklung von Ledger mit der Unterstützung abgeschirmter Orchard-Transaktionen verbunden war, bevor sich die Implementierung in Richtung des Ironwood-Protokolls weiterentwickelte.

Der Übergang unterstreicht auch, wie wichtig die Kompatibilität von Schlüsseln und Konten ist. Ledger hat eine ältere Anwendung „Zcash Shielded“, die von Zondax entwickelt und von Integrationen wie YWallet und zkool verwendet wurde und nun eingestellt wird. Da diese ältere Anwendung für abgeschirmte Konten ein anderes Ableitungsschema verwendete, können ihre Sapling-Konten nicht einfach mit der neuen Ledger-Anwendung reproduziert werden.

Die Integration veranschaulicht somit sowohl die Fortschritte als auch die verbleibenden Einschränkungen bei der Unterstützung abgeschirmter Hardware-Wallets. Ledger ermöglicht nun eine umfassende Ironwood-Nutzung: Die Begleitsoftware übernimmt die Wallet-Synchronisierung und Transaktionsvorbereitung, während das Hardwaregerät die Sicherheitsgrenze für Ausgaben bildet.

Gleichzeitig zeigen die Kompatibilität mit älteren Konten, die Unterstützung nur bestimmter abgeschirmter Pools, Begrenzungen der Transaktionsgröße, Plattformbeschränkungen sowie die Rechen- und Firmwarebeschränkungen beim Parsen und Überprüfen abgeschirmter Transaktionen: Die Unterstützung von Zcash durch Hardware-Wallets hängt nicht nur von den Protokollfunktionen ab, sondern auch vom Design und den Ressourcen jeder einzelnen Implementierung.

### Zkool + Ledger – die offizielle Zondax-App verwenden

Als Nachfolger von Ywallet übernahm Zkool das Ziel der abgeschirmten Offline-Signierung, schlug dafür jedoch einen anderen Weg ein. Dieser wurde maßgeblich davon geprägt, dass Kryptografie allein eine Integration nicht nutzbar macht, wenn sich die Signier-App nicht sicher verteilen lässt.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Verwendung der Zondax-Anwendung durch Zkool

Zkool setzte zunehmend auf die offizielle Ledger Zcash-App von Zondax statt auf die aufgegebene proprietäre Ledger-Anwendung von Ywallet. Anstatt eine eigene App zu pflegen, die der Store von Ledger nicht akzeptieren würde, baute Zkool auf einer App auf, die bereits akzeptiert und über das eigene Ökosystem von Ledger verbreitet wurde.

Durch diesen Wechsel mussten Benutzer nicht länger eine nicht signierte, benutzerdefinierte Ledger-Anwendung installieren, um die Integration zu nutzen, da die App von Zondax offiziell über das Ökosystem von Ledger verbreitet wurde.

Ledger legte den 5. November 2026 als Ende der Unterstützung für diese ältere Zcash Shielded-App fest und stellt sie schrittweise ein. Zkool bereitete sich darauf vor: [Version 6.30.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.30.0) (12. September 2026) ergänzte neben der Zondax-App die Unterstützung für die neue offizielle Zcash-App von Ledger. Wenn du ein Ledger-Konto erstellst, fragt Zkool jetzt, welche App auf dem Gerät läuft (Official oder Zondax). Ein Konto mit der Official-App deckt die transparenten und Ironwood-Pools ab: Zkool kann die UFVK vom Gerät importieren und signiert v6-Transaktionen mit der Official-App. Ein Konto mit der Zondax-App behält die ältere Kombination aus transparentem Pool und Sapling bei ([zkool2#1242](https://github.com/hhanh00/zkool2/pull/1242)).

### Unterstützte abgeschirmte Pools

Laut dem Entwickler von Ywallet verwendete die Integration von Zkool mit Ledger die offizielle, von Zondax entwickelte Anwendung Ledger und unterstützte sowohl transparente als auch abgeschirmte Zcash. Die Unterstützung für abgeschirmte Transaktionen war jedoch auf Sapling beschränkt; Orchard wurden nicht unterstützt. Hinzu kamen weitere Einschränkungen, etwa höchstens fünf Eingaben und Ausgaben pro Typ sowie die fehlende Kompatibilität mit Ledger Live.

Diese Einschränkung spiegelte den damaligen Entwicklungsstand der zugrunde liegenden Implementierung von Zondax Ledger wider. Die frühere Arbeit von Zondax mit Ledger bot Unterstützung für Sapling. Bei der anschließenden Veröffentlichung der Zcash Shielded-Ledger-App im Jahr 2024 fehlten zunächst Orchard und Unified Addresses. Eine Integration, die auf dieser Anwendung aufbaute, übernahm daher die Funktionen und Einschränkungen der zugrunde liegenden Hardware-Wallet-Implementierung.

Die Situation änderte sich später mit der Veröffentlichung der dedizierten Zcash Shielded-Ledger-App im November 2024. Zondax erklärte, die Anwendung sei offiziell über Ledger Live veröffentlicht worden, und veröffentlichte später Integrationsanleitungen sowie Rust- und JavaScript-Pakete, damit andere Wallets sie integrieren konnten. Zum Start kommunizierte die Anwendung jedoch ausschließlich mit Zecwallet Lite Desktop; umfassendere Wallet-Integrationen befanden sich noch in der Entwicklung.

Der nächste Schritt war die Entwicklung der neueren, auf Rust basierenden Zcash-Anwendung von Ledger. Im Juni 2026 berichtete Ledger, dass das Teilen von UFVKs und die Erzeugung von Orchard Unified Addresses implementiert worden waren, während die Transaktionssignierung mit Orchard und ClearSign noch in Arbeit waren. Ledger erklärte außerdem, dass die Arbeit mit dem Protokollwechsel in den Ironwood-Pfad übernommen würde.

Ironwood machte anschließend Aktualisierungen im gesamten Zcash-Wallet-Ökosystem erforderlich. Zkool führte ab Version 6.24.0 Unterstützung für die Migration von Orchard zu Ironwood ein und verfeinerte die Migration sowie die Transaktionsverarbeitung in späteren Versionen weiter. Ledger integrierte separat am 27. Juli die Signierung mit PCZT v2 in seine neue Anwendung. Bis zum 20. August waren jedoch weder die Überprüfung durch Ledger noch die Einführung über Ledger Live abgeschlossen. Diese Neuerung ist inzwischen verfügbar: Ledger Wallet Desktop 4.21+ bietet nun native Unterstützung für Ironwood.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Die Entwicklung lässt sich daher besser als mehrere zusammenhängende Neuerungen verstehen und nicht als einzelnes Upgrade von Zondax auf Ironwood: die ursprüngliche, auf Sapling ausgerichtete Zondax-Implementierung, die Zcash Shielded-Ledger-App von 2024, die neuere Anwendung Ledger Rust mit Unterstützung für Orchard und PCZT, die native Integration von Ledger in Ledger Wallet Desktop sowie parallele Aktualisierungen für Wallets wie Zkool im Zuge des Übergangs des Ökosystems zu Ironwood.

### Aktuelle Unterstützung von Ledger-Geräten und Plattformen für Zcash

Die Unterstützung für Zcash auf Ledger hängt ab von

- dem Gerätemodell
- der installierten Anwendung
- der verwendeten Verwaltungsplattform und
- der Frage, ob die Transaktion transparent oder abgeschirmt ist.

Am 21. Juli 2026 (dem letzten Aktualisierungsdatum von Ledger) wird die Zcash Shielded-App auf Nano S Plus, Stax und Flex unterstützt, jedoch noch nicht auf Nano X oder Nano Gen5.

Nano X und die anderen Modelle mit Ausnahme des ursprünglichen Nano S können weiterhin die klassische Zcash-App verwenden. Sie unterstützt transparente Transaktionen und das Ausgeben abgeschirmter Mittel an transparente Adressen (Deshielding), aber keine Signierung von abgeschirmten Transaktionen an abgeschirmte Adressen. Das ursprüngliche Nano S unterstützt keine der beiden Apps, da Ledger die Unterstützung für das Gerät auslaufen lässt und die neueste Zcash-App darauf nicht verfügbar ist. Die Geräte verbinden sich mit Ledger Wallet (früher Ledger Live), der Begleitanwendung von Ledger. Sie ist als Desktop-Version für Windows, macOS und Linux sowie mobil für iOS und Android verfügbar.

Ledger hat native Unterstützung für abgeschirmte Zcash zu Ledger Wallet Desktop hinzugefügt, die auf dem Ironwood-Pool basiert. Damit entfällt die Notwendigkeit einer separaten Begleit-Wallet. Die mobile App von Ledger für iOS und Android unterstützt abgeschirmte ZEC noch nicht; die Unterstützung für Mobilgeräte ist jedoch für eine künftige Version geplant.

Außerhalb der eigenen Software von Ledger hängt die Nutzung abgeschirmter Funktionen von einer kompatiblen Begleit-Wallet und den von ihr unterstützten Plattformen ab. Während Ledger die Unterstützung für Ironwood weiter ausbaut, hängt die Kompatibilität vom Gerätemodell, der Firmware, der App-Version und dem Betriebssystem ab. Eine allgemeine Unterstützung von Zcash garantiert daher nicht zwangsläufig die Kompatibilität.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### YWallet Cold Signing: ein früherer Ansatz

Ywallet ist eine Begleit-Wallet, die von Ledger und Zondax unabhängig ist und einen eigenen Weg zum abgeschirmten Cold Signing verfolgte.

Ywallet ist historisch bedeutsam, weil damit Cold Signing für Zcash erprobt wurde. Das bedeutete, dass das Signiergerät getrennt von der Online-Wallet aufbewahrt werden konnte.

Um diese Architektur auf Ledger-Hardware umzusetzen, entwickelte Ywallet eine eigene Ledger-Anwendung: eine proprietäre App, die sich von der im vorigen Abschnitt behandelten Zondax-App unterschied. Ywallet war damit nicht auf die bestehende Sapling-Implementierung von Zondax angewiesen, sondern verfügte über eine eigene Firmware, die den Signierteil der Verbindung ausführte.

### Warum die Integration wichtig war

Kryptografie und Signiercode allein reichen nicht aus. Die Integration einer Hardware-Wallet ist nicht nur ein kryptografisches Problem, sondern auch ein unvermeidbares Vertriebs- und Plattformproblem. Mindestens umfasst sie:

- Genehmigung und Vertrieb der Anwendung — ob der offizielle App-Store des Hardware-Herstellers die App annimmt und vertreibt
- Sicherheit von Firmware und Anwendung — ob die App die Sicherheitsanforderungen des Herstellers für den Umgang mit Schlüsselmaterial erfüllt
- Kommunikationsprotokolle — wie die Begleit-Wallet und das Gerät tatsächlich Transaktionsdaten austauschen
- Kompatibilität mit der Wallet — ob die Datenformate und Abläufe der Signier-App den Erwartungen der Begleit-Wallet entsprechen
- Unterstützte abgeschirmte Pools — für welche der Pools Sapling, Orchard und inzwischen Ironwood die App tatsächlich signieren kann

Die proprietäre Ledger-App von Ywallet erfüllte die kryptografischen und architektonischen Anforderungen: Sie konnte abgeschirmte Zcash-Transaktionen signieren, wurde aber nicht in den offiziellen App-Store von Ledger aufgenommen.

### Abkehr von der proprietären Ledger-App

Da die App nicht offiziell angenommen wurde, hätte Ywallet die Nutzer auffordern müssen, nicht signierte Firmware zu installieren, um sie verwenden zu können. Das wäre für die Nutzer ein echtes Sicherheitsrisiko gewesen, und Ywallet wollte sie nicht darum bitten. Deshalb gab Ywallet diese Integration schließlich auf, anstatt diesen Weg einzuschlagen.

Anstatt eine proprietäre App wiederzubeleben, richtete sich die spätere Entwicklung über Zkool, den Nachfolger von Ywallet, auf die offizielle, mit Zondax entwickelte Ledger-App aus. Damit wurde eine eigene, abgelehnte Implementierung gegen eine standardisierte App ausgetauscht, die bereits in das Vertriebsökosystem von Ledger aufgenommen worden war. Dieser Wechsel ermöglichte schließlich erneut eine funktionierende Integration von Ledger.

### Das Vermächtnis von Ywallet

Auch nachdem Ywallet selbst seine aktive Entwicklung eingestellt hatte, blieb sein Schöpfer Hanh, der auch Mitglied von ZCG ist, eine wichtige Stimme im Ökosystem. Das galt besonders, als die Migration von Ironwood Berichte über vermeintlich verschwundene Mittel aufwarf.

**ZODL: Ein Nutzer meldete fehlende Mittel nach der Migration von Orchard zu Ironwood**

Ein Nutzer, Jmo0615, berichtete, dass zuvor in seiner ZODL-Wallet sichtbare Mittel nach der Migration von Orchard zu Ironwood nicht mehr angezeigt wurden. Der Nutzer gab an, den ursprünglichen Seed wiederhergestellt, die Wallet zurückgesetzt und erneut eingerichtet sowie Version 3.14.1 von ZODL (1) vollständig synchronisiert zu haben. Außerdem bestätigte er, dass keine Hardware-Wallet von Keystone beteiligt war.

Es ist nicht erwiesen, dass die Mittel tatsächlich verloren gingen. Vielmehr wird ein Problem bei der Erkennung durch die Wallet oder bei der Migration vermutet, durch das zuvor sichtbare Mittel nach dem Wechsel zu Ironwood nicht mehr angezeigt wurden. Nicht erkannte oder angezeigte Mittel sollten nicht automatisch als dauerhaft verloren bezeichnet werden. Diese Unterscheidung ist wichtig, um Migrationsprobleme richtig einzuordnen.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: „Gesperrte Notes“ können erklären, warum Mittel scheinbar nicht verfügbar sind**

Ein weiterer wichtiger Aspekt abgeschirmter Wallets ist, wie sich der Wallet-Status auf die tatsächlich ausgebbaren Mittel auswirken kann. Hanh erklärte, dass ein Nutzer durch die Coin-Control-Funktion versehentlich eine Note sperren kann. Damit können Nutzer manuell auswählen, welche Notes zum Ausgeben verwendet werden. In diesem Fall kann die Note weiterhin in der Wallet vorhanden sein, aber als nicht ausgebbar markiert sein.

Das verdeutlicht eine wichtige Unterscheidung bei der Untersuchung von Wallet-Problemen. Die Menge an ZEC in einer Wallet entspricht nicht immer der Menge, die aktuell ausgegeben werden kann. Faktoren wie die Auswahl von Notes, die Synchronisierung, der Migrationsstatus, die Wiederherstellung der Wallet und die Coin-Control-Einstellungen können den angezeigten oder ausgebbaren Kontostand beeinflussen. Berichte über „fehlende Mittel“ sollten daher sorgfältig danach unterschieden werden, ob Mittel nicht erkannt oder angezeigt werden, zwar erkannt wurden, aber nicht ausgebbar sind oder tatsächlich verloren gingen.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**Was ist Keystone?**

Keystone ist eine Hardware-Wallet ohne Netzwerkverbindung. Während des Signiervorgangs hat ihr Signiergerät weder eine direkte kabelgebundene noch eine drahtlose Verbindung zur Begleit-App; stattdessen kommuniziert es über QR-Codes. Hier wird sie mit Zashi (inzwischen umbenannt in Zodl), der nativen Begleit-Wallet von Zcash, gekoppelt. Dadurch wird das Prinzip der Schlüsselisolierung besonders deutlich und lässt sich leicht nachvollziehen.

**Der Ablauf mit Keystone und Zashi**

Die Integration von Zcash durch Keystone mit Zashi macht diese Trennung besonders deutlich. Wenn du Keystone mit Zashi verbindest, wird die Unified-Full Viewing Key von Keystone an Zashi übertragen.

Der Ablauf sieht also so aus:

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**Was kann Zashi mit der UFVK tun?**

Zashi kann sie verwenden, um:

- eingehende abgeschirmte Transaktionen zu erkennen
- Kontostände zu ermitteln
- Informationen über abgeschirmte Aktivitäten abzurufen

Mittel ausgeben kann die Anwendung jedoch nicht allein deshalb, weil sie über die UFVK verfügt.

Die UFVK ermöglicht Einblick in Kontostände und Transaktionen, aber keine Ausgaben.

### Was bleibt in Keystone?

Der Seed und die Ausgabeberechtigung bleiben auf Keystone. Zashi erhält weder den Seed noch den Ausgabeschlüssel oder den privaten Autorisierungsschlüssel für Ausgaben. Die Anwendung erhält die UFVK, Adressinformationen und die für den reinen Ansichtsbetrieb erforderlichen Informationen.

Zusammen ergeben diese beiden Hälften ein vollständiges Bild. Was das Gerät verlässt — etwa die UFVK, Adressen und Nur-Lese-Informationen — reicht für Zashi aus, um das Konto zu überwachen. Nichts von dem, was das Gerät verlässt, reicht jedoch aus, um Mittel daraus zu bewegen.

Deshalb ermöglicht die Integration von Zashi und Keystone eine abgeschirmte Cold Storage. Die Wallet-Anwendung kann das Konto überwachen, ohne über die nötige Berechtigung zu verfügen, Mittel daraus auszugeben. Die Integration wurde eigens eingeführt, um die Cold Storage abgeschirmter ZEC zu ermöglichen.

Wenn du Mittel ausgeben möchtest:

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito folgt einem sehr ähnlichen Modell zur Schlüsselisolierung wie Keystone, die Implementierung ist jedoch neuer. Statt mit einer bestehenden Begleit-Wallet wie Zashi gekoppelt zu werden, wird Hito mit einer eigenen Android-Wallet ausgeliefert. Der Einrichtungsprozess zwischen dem Hardwaregerät und dieser Android-App ist in den Entwicklungsmeilensteinen von Hito dokumentiert.

**Einrichtung: Welche Informationen erhält die Hito-App?**

Die Android-Wallet verwendet bei der Einrichtung des Hardwarekontos:

- die Unified-Full Viewing Key (UFVK)
- die Unified Address
- den Seed-Fingerabdruck nach ZIP-32
- Netzwerkinformationen

Beachte, dass die Android-Anwendung niemals den Seed oder die privaten Ausgabeschlüssel der Hardware-Wallet erhält.

![Hito onboarding](/content-images/hito-onboarding.webp)

**Welche Informationen erhält die Hito-App?**

Zu den dokumentierten Einrichtungsinformationen gehören:

- UFVK
- Unified Address
- Seed-Fingerabdruck nach ZIP-32
- Netzwerk

Die UFVK liefert der Android-Wallet die nötigen Informationen, um das Konto als Wallet mit Ansichtsrechten zu verwalten, ohne den Seed zu erhalten. Der Seed-Fingerabdruck ist ein Kennzeichner fester Länge, der aus dem Seed abgeleitet wird und zur Zuordnung von Konten dient. Er ist nicht der Seed selbst und verleiht keine Ausgabeberechtigung. Seine Verwendung widerspricht daher nicht der obigen Aussage, dass der Seed niemals empfangen wird.

**Was bleibt auf Hito?**

Der tatsächliche Seed, die privaten Ausgabeschlüssel und die Signierberechtigung bleiben auf dem Hardwaregerät. Hito signiert anschließend offline.

Der aktuelle Hito-Meilenstein besagt, dass der gesamte Ablauf aus Erstellung, Export, Offline-Signierung und Import funktioniert. Dabei kommen BLE-Übertragung und BBQr-QR-Export der signierten PCZT zum Einsatz.

Dieser Ablauf verdient eine ausdrückliche Erwähnung, denn er ist ein konkretes Beispiel für den vollständigen Zyklus, der weiter oben in diesem Bericht beschrieben wurde: Die Android-Wallet erstellt die unsignierte PCZT und exportiert sie zu Hito. Hito signiert sie offline mit dem isolierten Schlüsselmaterial, anschließend wird die signierte PCZT wieder in die Android-Wallet importiert.

Der Seed und der Ausgabeschlüssel überschreiten diese Grenze zu keinem Zeitpunkt und in keine Richtung.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## Orchard bis Ironwood: Die Entwicklung der Hardware-Wallet-Unterstützung

Orchard ist ein abgeschirmter Pool im Zcash-Protokoll, der es Nutzern ermöglicht, ZEC mit verbessertem Datenschutz zu speichern und zu übertragen. NU5 wurde mit Network Upgrade 5 (Orchard) eingeführt. Halo nutzt das Beweissystem Ironwood 2 und eine überarbeitete kryptografische Architektur, um abgeschirmte Transaktionen zu unterstützen, ohne vertrauliche Transaktionsdaten wie Absender, Empfänger oder Betrag preiszugeben.

Zcash ist ein abgeschirmter Pool, der mit dem Netzwerkupgrade NU6.3 von Orchard als Nachfolger des Pools Orchard eingeführt wurde. Er verwendet das kryptografische Protokoll Ironwood und führt zugleich Änderungen ein, die die langfristige Sicherheit abgeschirmter Guthaben verbessern sollen. Dazu gehören die Wiederherstellbarkeit im Quantenfall und stärkere Garantien für die Integrität des Gesamtangebots.

Zu Beginn muss klargestellt werden, dass Orchard das Protokoll Ironwood nicht durch ein völlig neues kryptografisches System ersetzt hat. Orchard wurde als neuer abgeschirmter Pool eingeführt, der auf dem bestehenden Protokoll Halo aufbaut. Das bedeutet, dass beide dieselbe Action-Struktur, dasselbe Beweissystem Ironwood 2 sowie dieselben Notiz- und Schlüsselstrukturen haben.

Orchard verfügt über einen eigenen Notiz-Commitment-Baum, eine eigene Nullifier-Menge, einen eigenen Anker und einen eigenen Wertpool. Auf Konsensebene handelt es sich also tatsächlich um einen separaten Pool. Kryptografisch ist er jedoch eine Erweiterung von Orchard und keine Neuentwicklung.

Die Architektur wurde aus folgenden Gründen so gestaltet:

1. **Integrität des Gesamtangebots.** Am 29. Mai 2026 meldete der Sicherheitsforscher Taylor Hornby vertraulich eine kritische Soundness-Schwachstelle im Zero-Knowledge-Beweissystem von ZEC. Sie hätte es ermöglicht, gefälschte Orchard zu erzeugen, ohne eine Spur auf der Blockchain zu hinterlassen. Da die Transaktionsdaten von ZEC privat sind, kann niemand unabhängig überprüfen, ob vor der Fehlerbehebung gefälschte Orchard erzeugt wurden. Den alten Pool zu versiegeln und einen neuen mit einem Anfangsbestand von null zu starten, löst dieses Problem auf eine Weise, die eine nachträgliche Fehlerbehebung an Ironwood nicht ermöglicht hätte.
2. **Wiederherstellbarkeit im Quantenfall sicherstellen.** Orchard wurde so konzipiert, dass seine Guthaben an einem künftigen Wiederherstellungsmechanismus teilnehmen können, falls die zugrunde liegenden Annahmen zu diskreten Logarithmen jemals widerlegt werden.
3. **Änderungen an der Implementierung minimieren.** Statt ein völlig neues abgeschirmtes Protokoll zu entwickeln, wurde die bewährte Architektur von Orchard wiederverwendet. Dadurch musste deutlich weniger neuer Code für Transaktionen, Beweise, Wallets und Hardware-Wallets von Grund auf geschrieben werden.

### Der öffentliche Zeitplan

- 29. Mai: Die Schwachstelle Orchard wird offengelegt.
- Juni: Transaktionen mit NU6.2 werden vorübergehend eingeschränkt, während über Keystone eine erste Fehlerbehebung ausgeliefert wird. Am 12. Juni setzt ein Kernentwickler den 21. Juli als Termin für das vollständige Upgrade an; später verschiebt sich dieser um eine Woche. In der Community wird die Sorge geäußert, dass Besitzer von Keystone bei der Migration zuletzt an die Reihe kommen würden. Daraufhin erklärt ein Kernentwickler, dass Ironwood Orchard ab dem ersten Tag unterstützen werde; die Firmware sei für den 3. Juli vorgesehen, vorbehaltlich endgültiger Signaturkonstanten und Änderungen an der Zcash-API des NU6-Kerns.
- Anfang Juli: Zebra.3 erreicht das Testnetz; Ledger 6.0.0 wird am 10. Juli veröffentlicht.
- 27.–28. Juli: Die Signaturarbeiten für Ironwood PCZT v2 werden in einen Integrationszweig übernommen. Ironwood (NU6.3) wird am 28. Juli bei Block 3.428.143 aktiviert. Dabei wird der ursprüngliche Pool Orchard durch eine Schleuse versiegelt, die die Menge an ZEC, die Orchard verlassen darf, auf den Betrag begrenzt, der zuvor rechtmäßig eingezahlt wurde. Außerdem wird ein neues Transaktionsformat eingeführt.

Zebra wird zum erforderlichen Knoten, da zcashd die neuen Konsensregeln nicht unterstützt. Adressen ändern sich nicht, weil Ironwood die Empfängerstruktur von Orchard wiederverwendet. Daher leiten Wallets bestehende Adressen automatisch in den neuen Pool. Wallets benötigen jedoch eine Migrationsfunktion, da ihre Besitzer die Guthaben in Orchard schließlich nach Ironwood übertragen müssen. Neue Ausgaben, die Orchard empfangen, sind nun durch den Konsens vollständig gesperrt.

### Technische Änderungen

Die Transaktionsformate wurden von Version 5 auf Version 6 umgestellt. Dadurch kann eine einzelne Transaktion neben bestehenden Ironwood-/Sapling-/Transparent-Komponenten auch eine Orchard-Komponente enthalten. PCZT wurde entsprechend erweitert:

- Die Kodierung wurde von PCZT v1 auf v2 umgestellt.
- Neben den Ironwood- und Sapling-Bundles gibt es nun ein separates Orchard-Bundle.
- v6-Transaktionen und ein neuer v6-Sighash werden unterstützt.
- Notiz-Klartexte erhielten eine neue Version (V3).

Die Änderung am Sighash ist vor allem für Hardware-Wallets wichtig. In v6 werden die Anker Orchard und Ironwood aus dem Signatur-Hash ausgeschlossen und fließen nur noch in den autorisierenden Daten-Digest ein. Das ist eine echte Firmware-Änderung und nicht bloß eine Erhöhung der Versionsnummer. Ein Gerät muss den neuen Sighash korrekt implementieren und selbst neu berechnen, statt darauf zu vertrauen, dass die Begleit-App richtig angibt, was das Gerät genehmigt.

Die Isolationsvereinbarung selbst hat sich nicht geändert: Das Gerät gibt weiterhin nur die Ausgabesignatur für das Ausgeben zurück, niemals `alpha`, und erstellt auch keine Bindungssignatur. Beweiserstellung und alles Weitere übernimmt weiterhin der Host.

Eine Signaturregel hat sich mit v6 allerdings geändert: Dummy-Füllausgaben werden vom IO Finalizer signiert, nicht vom Gerät, da dieses sie nicht anhand echter Notizdaten überprüfen kann. Die Rolle des Signierers auf dem Gerät überspringt sie daher, statt etwas signieren zu sollen, das sie nicht überprüfen kann. Angezeigte Gebühren summieren nun außerdem die Wertsalden von Orchard und Ironwood, da eine v6-Transaktion im selben Vorgang aus beiden Pools ausgeben kann.

Die korrekte Abrechnung der Pools ist in der Praxis wichtig, nicht nur in der Theorie. Ein kürzlich aufgetretener Fehler in der eigenen Wallet Brave von Zcash ist ein gutes Beispiel: Bei der Gebührenberechnung wurde angenommen, dass alle abgeschirmten Eingaben zum älteren Pool Orchard gehören. Dadurch wurden Actions dupliziert und Gebühren falsch geschätzt, sobald eine Transaktion tatsächlich Ironwood umfasste. Genau solche Fehler soll das Prinzip „selbst neu berechnen, dem Host nicht vertrauen“ bei der Signierung mit Hardware-Wallets aufdecken. Eine Begleit-Wallet rechnete die Pools falsch ab. Nur ein Gerät, das seine Berechnungen unabhängig überprüft, hätte das vor der Signatur erkannt.

### Stand der einzelnen Signierer

**Ledger hat das Gesamtbild gerade grundlegend verändert.** Am 23. September 2026 veröffentlichte Ledger die native Unterstützung für abgeschirmtes Zcash direkt in Ledger Wallet Desktop. Eine separate Begleit-App ist nicht mehr nötig. Der Ausgabeschlüssel bleibt auf dem Gerät, der Computer berechnet die Transaktion, und du genehmigst alles auf dem Bildschirm, bevor signiert wird. Unterstützt wird nur Ironwood, nicht die älteren Pools Orchard oder Sapling. Der Nachteil: Die ältere App „Zcash Shielded“ von Zondax, für deren Nutzung eine Begleit-Wallet wie Zkool erforderlich war, wird eingestellt. Ledger legte den 5. November 2026 als Datum fest, an dem die ältere App nicht mehr verfügbar sein sollte. Guthaben, die noch über sie verwaltet werden, sollten daher auf ein Konto in der neuen App übertragen werden.

**Keystone ist gut aufgestellt.** Firmware 3.0.2 brachte bereits im Juli die vollständige Unterstützung für Ironwood. Firmware 3.2.2 vom 11. November 2026 ergänzte die Unterstützung für NU7 bei der Web3- und Cypherpunk-Edition ([Versionshinweise](https://github.com/KeystoneHQ/keystone3-firmware/releases/tag/3.2.2)). Da NU7 im Mainnet aktiv ist, solltest du vor dem Signieren auf Version 3.2.2 oder neuer aktualisieren.

**Hito ist über den ersten Testnetz-Meilenstein hinaus.** Das Gerät hat erfolgreich seine erste echte Transaktion von Orchard nach Ironwood auf physischer Hardware signiert und übermittelt, zunächst im Testnetz. Spätere Updates bestätigten Abläufe im Mainnet (Ironwood→Ironwood, Ironwood→Transparent und weitere) auf Hardware für den Produktionseinsatz. Eine stabile Firmware und eine breitere Veröffentlichung sind weiterhin in Arbeit.

**Zkool funktioniert mit beiden Ledger-Apps.** Die App von Zondax wird für Ledger eingestellt. Zkool, das auf diese App angewiesen war, um mit Ledger-Geräten zu kommunizieren, stellte vor dem Stichtag um: Seit [6.30.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.30.0) vom 12. September 2026 funktioniert es auch mit der neuen offiziellen App Ledger von Zcash. Sie importiert den UFVK vom Gerät und signiert Transaktionen des Formats v6 (Ironwood); Konten der App Zondax werden weiterhin unterstützt. Spätere Versionen funktionierten weiterhin über den Pfad Ledger: Version 6.32.0 importiert Konten von Ledger über die Zkool-API von GraphQL, und Version 6.36.0 behob einen Absturz bei kurzen Ledger-Antworten. Damit bleibt Zkool eine Option für Ledger-Nutzer, die eine Begleit-Wallet statt Ledger Wallet Desktop verwenden möchten.

Die Migration selbst hat die größten Auswirkungen. Da der Betrag, der zwischen Pools wechselt, öffentlich ist, verteilen Wallets Überweisungen im Zeitverlauf auf die üblichen Stückelungen, statt ein Guthaben in einem einzigen sichtbaren Betrag zu übertragen. Dadurch müssen pro Migration viele Transaktionen signiert werden. Genau deshalb war die Stapelsignierung von PCZT für Hardware-Wallets so wichtig.

Auch die Firmware-Arbeiten von Ledger stießen an Hardware-Grenzen: Bei einer echten Notiz-Ausgabe konnten in einem einzigen Befehl Zehntausende kryptografische Systemaufrufe anfallen, wodurch der Watchdog des Geräts ausgelöst wurde. Als Lösung wurde die Feldarithmetik in Software verlagert. Außerdem war ein gemeinsam genutzter Zwischenspeicher nötig, der in die Stack-Beschränkungen von Nano X passen musste.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### Die Entwicklung in einer Grafik

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
