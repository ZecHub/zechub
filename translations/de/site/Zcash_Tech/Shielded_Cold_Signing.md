# Abgeschirmtes Cold Signing

> **Kernidee:** Die Begleit-Wallet sieht alles, was zum Erstellen und Überwachen einer abgeschirmten Transaktion erforderlich ist. Allein die Hardware-Wallet besitzt die Befugnis, eine Ausgabe zu autorisieren. Diese Aufteilung ist der ganze Sinn des abgeschirmten Cold Signings.

Das Abschirmen in Zcash umfasst das Verschieben von Guthaben von einer öffentlichen, transparenten Adresse zu einer privaten, abgeschirmten Adresse, wobei Transaktionsdetails mithilfe der Datenschutzfunktionen von Zcash verborgen werden.

### Was ändert sich, wenn du ZEC abschirmst?

Bei einer transparenten Zcash-Transaktion können Informationen wie:

- Absenderadresse
- Empfängeradresse
- übertragener Betrag

auf der blockchain beobachtet werden.

Wenn du ZEC abschirmst, wird dein Guthaben in einen privaten Pool verschoben, beispielsweise Ironwood. Die blockchain kann prüfen, ob eine Transaktion gültig ist, ohne deine privaten Transaktionsdetails offenzulegen. Seit dem Upgrade NU6.3 am 28. Juli 2026 fließt neu abgeschirmtes Guthaben in den Pool Ironwood, da der ältere Pool Orchard keine neuen Einzahlungen mehr akzeptiert, aber weiterhin Auszahlungen ermöglicht.

### Bestandteile einer abgeschirmten Transaktion

### 1. Die Note (der abgeschirmte Guthabeneintrag)

Eine Note ist ein privater kryptografischer Eintrag, der einen nicht ausgegebenen Betrag von ZEC repräsentiert, der einem Benutzer gehört.

Anders als bei einer öffentlichen blockchain, bei der Guthaben im Klartext aufgeführt werden, verschlüsselt eine abgeschirmte Note Wert- und Eigentumsdetails, sodass Beobachter on-chain nicht sehen können, wem die Gelder gehören.

Beim Einleiten einer Transaktion durchsucht die Begleit-Wallet das Hauptbuch, identifiziert die nicht ausgegebenen Notes des Benutzers und wählt aus, welche Notes ausgegeben werden sollen.

### 2. Der Nullifier (der Mechanismus zur Erkennung doppelter Ausgaben)

Da die Details einer Note im öffentlichen Hauptbuch verborgen sind, benötigt das Netzwerk einen Mechanismus, um doppelte Ausgaben zu erkennen, ohne offenzulegen, welche Note ausgegeben wird.

Ein Nullifier ist eine eindeutige kryptografische Kennzeichnung, die aus einer bestimmten Note abgeleitet wird. Wenn eine Note ausgegeben wird, wird ihr Nullifier auf der blockchain veröffentlicht.

Das Netzwerk prüft, dass der Nullifier nicht zuvor gespeichert wurde. Falls dies nicht der Fall ist, kann die Ausgabe akzeptiert werden. Entscheidend ist, dass ein externer Beobachter anhand des Nullifiers nicht feststellen kann, von welcher konkreten Note er stammt.

Die Begleit-Wallet leitet den passenden Nullifier ab und erstellt ihn als Teil der Zusammenstellung der Transaktionsdaten.

## Schlüssel

Schlüssel sind kryptografische Informationen, die den Zugriff auf deine Gelder steuern und deiner Wallet ermöglichen, Vorgänge wie den Empfang, die Anzeige und die Ausgabe von ZEC auszuführen.

Eine Wallet enthält mehrere unterschiedliche Schlüssel, die jeweils einem anderen Zweck dienen – ähnlich wie ein einzelnes Konto getrennte Zugangsdaten für Lese- und Schreibzugriff haben kann.

Schlüssel sind zentral für die Beziehung zwischen Begleit-Wallet und Hardware-Wallet, da unterschiedliche Schlüssel unterschiedliche Zwecke erfüllen und nur einer davon sicher verwahrt bleiben muss.

Es ist wichtig zu wissen, dass jeder abgeschirmte Pool seine Schlüssel als Ableitungsbaum aufbaut, bei dem Pfeile von einer Komponente auf alles zeigen, was daraus abgeleitet werden kann. Benutzer, die abgeschirmte Zahlungen empfangen möchten, müssen über eine abgeschirmte Zahlungsadresse verfügen, die aus einem Ausgabeschlüssel erzeugt wird.

### Die Schlüsselhierarchie

**1. Ausgabeschlüssel**

Dies ist der sicherheitssensibelste Schlüssel. Er verleiht die kryptografische Fähigkeit, die Ausgabe von ZEC zu autorisieren.

Auf diesen Schlüssel ist immer Bezug genommen, wenn in diesem Bericht an anderer Stelle davon die Rede ist, dass „die Hardware-Wallet den Schlüssel hält“.

In einer Cold-Signing-Architektur wird der Ausgabeschlüssel in der Hardware-Wallet aufbewahrt und niemals der Begleit-Wallet zugänglich gemacht. Die Begleit-Wallet sollte diesen Schlüssel überhaupt nicht besitzen müssen.

Sowohl in Sapling als auch in Orchard leiten Schlüsselhierarchien Ausgabebefugnis und Anzeigefunktionen als zwei getrennte Zweige aus einem Wurzel-Ausgabeschlüssel ab:

- **Sapling:** Ein erweiterter Ausgabeschlüssel (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) leitet beweisautorisierende Schlüssel (𝑎𝑘,𝑛𝑠𝑘) und vollständige Anzeigeschlüssel (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘) ab, die wiederum eingehende Anzeigeschlüssel (𝑖𝑣𝑘) und diversifizierte Adressen liefern.
- **Orchard:** Ein Wurzel-Ausgabeschlüssel (𝑠𝑘) verzweigt direkt in einen ausgabeautorisierenden Schlüssel (𝑎𝑠𝑘) und einen vollständigen Anzeigeschlüssel (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Diese strukturelle Aufteilung bildet die formale kryptografische Grundlage für die Isolierung von Hardware-Schlüsseln. Dabei exportiert die Wallet den Anzeigezweig (UFVK) zur Synchronisierung des Guthabens und zum Erstellen von Transaktionen an den Host-Computer, während der ausgabeautorisierende Zweig dauerhaft auf dem Gerät gesperrt bleibt.

Die Schlüsselableitung ist strikt unidirektional. Das bedeutet, dass Anzeigeschlüssel nicht umgekehrt werden können, um die Ausgabebefugnis wiederherzustellen. Diese kryptografische Irreversibilität macht den Export eines Unified Full Viewing Key (UFVK) sicher, da er vollständige Wallet-Transparenz gewährt, ohne die auf dem Gerät befindlichen Ausgabesecrets offenzulegen.

**2. Anzeigeschlüssel**

Zcash trennt die Fähigkeit, abgeschirmte Aktivität zu sehen, von der Fähigkeit, sie auszugeben. Ein Anzeigeschlüssel ermöglicht einer Wallet oder einer anderen autorisierten Partei, Informationen über abgeschirmte Transaktionen einzusehen, ohne Ausgabebefugnis zu erteilen.

- **Full Viewing Key (FVK), verpackt als Unified Full Viewing Key (UFVK):** Er wird bewusst aus dem Ausgabeschlüssel abgeleitet und ermöglicht Software, die abgeschirmte Aktivität der Wallet zu erkennen und zu entschlüsseln und damit Transaktionen zu identifizieren. Er ermöglicht außerdem die Berechnung von Guthaben, ohne eine Ausgabe autorisieren zu können. Er wird am besten als weniger privates Derivat des Ausgabeschlüssels beschrieben, nicht als schwächere Kopie des Seeds.

Der Full Viewing Key (FVK) bietet vollständige schreibgeschützte Transparenz bei strikter Sicherheitstrennung. Durch die Entschlüsselung eingehender und ausgehender Note-Chiffretexte – über seine Outgoing-Viewing-Key-Komponente – kann eine Begleit-Wallet, die nur über einen FVK verfügt, einen vollständigen, beschrifteten Transaktionsverlauf darstellen und nicht nur einen laufenden Kontostand.

Mehrere nicht verknüpfbare diversifizierte Zahlungsadressen teilen denselben FVK und eingehenden Anzeigeschlüssel (IVK), was eine unbegrenzte Adressgenerierung ermöglicht, ohne den Aufwand für das Scannen der blockchain zu erhöhen.

Diese funktionale Trennung bildet die Grundlage von Cold-Signing-Abläufen. Kontinuierliches Scannen der Chain, Verlaufserfassung und Adressverwaltung werden vollständig auf die Host-Software ausgelagert, während die Ausgabebefugnis auf dem Hardware-Gerät isoliert bleibt.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### Die entscheidende Unterscheidung: UFVK gegenüber Ausgabeschlüssel

> **Der UFVK kann geteilt werden. Der Ausgabeschlüssel muss auf der Hardware-Wallet bleiben.**
>
> Die Begleit-Wallet verwendet den Anzeigeschlüssel, um die Wallet zu überwachen, eingehende Gelder zu erkennen, Notes zu identifizieren und bei der Vorbereitung von Transaktionen zu helfen. Sie besitzt nicht den privaten Schlüssel, der zum Autorisieren einer Ausgabe erforderlich ist.

Wie zuvor erläutert, ist die Trennung der Schlüssel die Grundlage der Cold-Signing-Architektur.

Die Begleit-Wallet kann den größten Teil der zur Vorbereitung einer Transaktion benötigten Arbeit erledigen, ohne jemals Kontrolle über die Gelder zu haben. Die Hardware-Wallet muss nur die vorbereitete Transaktion erhalten und den abschließenden Signiervorgang ausführen.

Hersteller von Hardware-Wallets müssen diese Trennung nicht selbst erfinden. Das Schlüsseldesign von Zcash trennt Anzeigefunktionen bereits auf Protokollebene von der Ausgabebefugnis, und Hersteller bauen ihre Signier- und Exportfunktionen einfach auf dieser bestehenden Struktur auf. Das Protokoll erlaubt die Ableitung von Informationen wie einer abgeschirmten Adresse oder einem vollständigen Anzeigeschlüssel aus einem Ausgabeschlüssel, während der Ausgabeschlüssel selbst privat bleibt. Dadurch können Hardware-Wallets wie Ledger, Keystone und Hito der Begleitsoftware die erforderlichen Anzeigeinformationen geben, ohne jemals den privaten Schlüssel offenzulegen, mit dem die Gelder ausgegeben werden können.

### Was die Begleit-Wallet tatsächlich mit Schlüsselinformationen macht

Mithilfe des Anzeigeschlüsselmaterials kann die Begleit-Wallet:

- deine Gelder und Notes identifizieren
- bestimmen, welche Notes ausgegeben werden können
- relevante Adressen ableiten oder identifizieren
- die Transaktion erstellen
- die erforderlichen Beweise erzeugen oder koordinieren
- die Transaktion zur Signierung vorbereiten

Es ist wichtig zu wissen, dass das Erstellen einer Transaktion nicht dasselbe ist wie das Benötigen des privaten Ausgabeschlüssels. Diese Entkopplung ist eine der zentralen Sicherheitsideen hinter der Integration von Hardware-Wallets.

## Erstellung und Autorisierung abgeschirmter Transaktionen

Dies sind die Prozesse, die an der Erstellung und Autorisierung einer Transaktion beteiligt sind. Einfach ausgedrückt beschreiben diese Prozesse, was die Wallet mit diesen Daten tatsächlich tut, um Geld zu senden:

### Transaktionserstellung (Zusammenstellung der abgeschirmten Transaktion)

Die Transaktionserstellung ist der Prozess, bei dem die Informationen zusammengestellt werden, die zur Erstellung einer gültigen Zcash-Transaktion aus der beabsichtigten Zahlung des Benutzers erforderlich sind.

Der Prozess der Transaktionserstellung kombiniert die ausgewählten Notes, Empfänger, Beträge, Gebühren, Nullifier und weitere erforderliche Transaktionsdaten zu einer Transaktionsstruktur. Bei abgeschirmten Transaktionen werden außerdem die Informationen vorbereitet, die für die Erzeugung der notwendigen Zero-Knowledge-Beweise und Signaturen erforderlich sind.

Die Begleit-Wallet übernimmt diese Phase in der Regel. Sie

- wählt die auszugebenden Notes aus
- bestimmt die Eingaben und Ausgaben der Transaktion
- berechnet die erforderlichen Werte
- bereitet die Transaktionsdaten vor, die später bewiesen und signiert werden.

In einer Cold-Signing-Konfiguration können die resultierenden Transaktionsdaten in ein PCZT verpackt und für den sicherheitskritischen Signierschritt an die Hardware-Wallet übergeben werden.

### Beweisen (Nachweis der Protokollgültigkeit)

Beweisen bezeichnet die Erzeugung von Zero-Knowledge-Beweisen, beispielsweise Halo 2 oder Groth16, die nachweisen, dass eine Transaktion die Protokollregeln von Zcash einhält.

Der Beweis hilft dem Netzwerk, Folgendes zu gewährleisten:

- Der ausgebende Benutzer ist berechtigt, die Notes auszugeben.
- Die Notes existieren tatsächlich.
- Die entsprechenden Nullifier sind eindeutig.
- Die Gesamteingaben entsprechen den Gesamtausgaben zuzüglich Gebühren.

All dies geschieht, ohne zugrunde liegende private Details offenzulegen.

Die Erzeugung von Beweisen ist rechenintensiv. Die Auslagerung dieser Verantwortung auf das Begleitgerät verhindert, dass die Hardware-Wallet hängen bleibt oder keinen Speicher mehr hat.

### Signieren (Autorisierung der Ausgabe)

Signieren unterscheidet sich grundlegend vom Beweisen. Eine digitale Signatur dient als expliziter Autorisierungsstempel, der vom Inhaber des privaten Schlüssels erstellt wird.

Während ein Zero-Knowledge-Beweis die Gültigkeit der Transaktion bestätigt, beweist eine digitale Signatur die Ausgabebefugnis. Die Signatur bestätigt, dass der wahre Eigentümer die konkreten Übertragungsparameter genehmigt.

Das Signieren benötigt nur geringe Rechenleistung und eignet sich daher ideal für eine Hardware-Wallet.

### Was ist abgeschirmtes Cold Signing?

Abgeschirmtes Cold Signing ist eine Methode zur Autorisierung einer abgeschirmten Zcash-Transaktion, bei der die privaten Ausgabeschlüssel von der mit dem Internet verbundenen Begleit-Wallet isoliert bleiben. Die Transaktion kann auf einem Online-Computer erstellt und vorbereitet werden, während eine separate Hardware-Wallet, die offline oder anderweitig isoliert bleibt, ihre geschützten Schlüssel zur Autorisierung der Transaktion verwendet.

Der Prozess kann vereinfacht werden zu:

![Shielded cold signing process](/content-images/cold-signing-process.webp)

Die Begleit-Wallet sendet die strukturierten Transaktionsparameter an das Hardware-Gerät, das die Nutzlast intern signiert, ohne den privaten Ausgabeschlüssel jemals an den Host-Rechner weiterzugeben.

## Begleit- und Hardware-Wallets

Abgeschirmte Transaktionen können sowohl eine Begleit-Wallet als auch eine Hardware-Wallet umfassen, die jeweils eine eigene Funktion erfüllen.

### Begleit-Wallet

Was ist eine Begleit-Wallet?

Die Begleit-Wallet läuft auf einem Computer oder Mobilgerät und führt die meisten Aufgaben aus, die zur Erstellung der Transaktion gehören, beispielsweise:

- Auswahl der auszugebenden Notes
- Erstellung der Transaktion
- Berechnung der erforderlichen Transaktionsdaten
- Koordination der Erzeugung der erforderlichen Zero-Knowledge-Beweise.

### Warum ist eine Begleit-Wallet nützlich?

Die Begleit-Wallet übernimmt den Prozess der Transaktionserstellung. Wenn der Computer jedoch mit Malware infiziert wird, könnte ein Angreifer:

- sehen, was du tust,
- eine unsignierte Transaktion verändern,
- versuchen, dich zur Genehmigung von etwas zu verleiten.

Die Begleit-Wallet benötigt keinen Zugriff auf den privaten Schlüssel, der auf der Hardware-Wallet gespeichert ist. Sie kann daher die Transaktionserstellung und andere Rechenaufgaben übernehmen, während die Hardware-Wallet die Sicherheitsgrenze für den privaten Schlüssel bildet.

### Hardware-Wallet

Eine Hardware-Wallet ist ein physisches Offline-Gerät, das deine privaten Schlüssel von verbundenen Telefonen oder Computern isoliert und wie ein sicherer Tresor für deine Krypto-Vermögenswerte funktioniert.

### Warum ist eine Hardware-Wallet nützlich?

Wenn dein Computer mit Malware infiziert wird, könnte ein Angreifer:

- sehen, was du tust,
- eine unsignierte Transaktion verändern,
- versuchen, dich zur Genehmigung von etwas zu verleiten.

Der private Schlüssel kann nicht einfach aus der Hardware-Wallet extrahiert werden; daher kann das Gerät als Sicherheitsgrenze dienen.

Bild: Fähigkeiten von Begleit- gegenüber Hardware-Wallet

Die Trennung dieser beiden Wallets ist bei abgeschirmten Transaktionen besonders wichtig, da sie komplexer als transparente Transaktionen sind und Komponenten wie abgeschirmte Notes, Nullifier, Commitments, Zero-Knowledge-Beweise und Transaktionssignaturen umfassen.

Es wäre unpraktisch, wenn die Hardware-Wallet jeden Rechenvorgang ausführen müsste. Stattdessen bereitet die Begleit-Wallet die Transaktion vor und stellt der Hardware-Wallet die für die Signierung erforderlichen Informationen bereit, während der private Ausgabeschlüssel innerhalb des Hardware-Geräts isoliert bleibt.

## Schlüsselisolierung

> Schlüsselisolierung bedeutet, dass die privaten Schlüssel, die eine Ausgabe autorisieren können, die Hardware-Wallet niemals verlassen. Die Begleit-Wallet kann die Transaktion vorbereiten; sie kann sie nicht signieren.

Schlüsselisolierung bezeichnet die Trennung der privaten Schlüssel, die zum Autorisieren einer Transaktion erforderlich sind, von der Begleit-Wallet und dem Gerät, auf dem sie läuft. In einer abgeschirmten Cold-Signing-Konfiguration kann die Begleit-Wallet die Transaktion erstellen und die erforderlichen Beweise koordinieren, während die Hardware-Wallet die sensiblen privaten Ausgabeschlüssel isoliert hält.

Wenn der Begleit-Computer oder das Telefon kompromittiert wird, kann ein Angreifer möglicherweise vor der Signierung mit der Transaktion interagieren, aber idealerweise den privaten Schlüssel nicht aus der Hardware-Wallet extrahieren. Der Schlüssel bleibt damit innerhalb der Sicherheitsgrenze des Hardware-Geräts.

Diese Trennung ermöglicht der Begleit-Wallet die Ausführung von Transaktionserstellung und Rechenaufgaben, ohne ihr direkten Zugriff auf das Schlüsselmaterial zu gewähren, das für die Autorisierung der Transaktion erforderlich ist.

![Key isolation](/content-images/key-isolation.webp)

Die entscheidende Unterscheidung lautet: „Anzeigeschlüssel“ bedeutet nicht, dass die App eine schwächere Version des Seeds erhält.

In Zcash wird ein Full Viewing Key (FVK/UFVK) bewusst aus dem Ausgabeschlüssel abgeleitet und ermöglicht seinem Inhaber, relevante abgeschirmte Aktivität zu erkennen und zu entschlüsseln, jedoch keine Ausgaben zu autorisieren. Der FVK ist ein weniger geheimer Abkömmling des Ausgabeschlüssels.

**Ein wichtiger Vorbehalt zum Datenschutz:**

Daher sollte bekannt sein, dass die App die Gelder allein mit dem UFVK nicht stehlen kann, aber die private abgeschirmte Aktivität der Wallet sehen kann.

Deshalb ist es genauer, die Begleitanwendung als Inhaber von *Anzeigebefugnis* zu beschreiben, statt lediglich zu sagen, sie verfüge über „öffentliche Informationen“.

Am einfachsten lässt sich die gesamte Idee so ausdrücken: Die Begleit-Wallet erhält genug Schlüsselmaterial, um zu wissen, was mit der Wallet geschieht, aber nicht genug Schlüsselmaterial, um zu autorisieren, was mit den Geldern der Wallet geschieht. Die Hardware-Wallet hingegen hält die Ausgabebefugnis isoliert und verwendet sie nur, wenn der Benutzer eine Transaktion genehmigt.

Dies ist das grundlegende Modell der Schlüsselisolierung hinter diesen abgeschirmten Zcash-Hardware-Wallet-Designs und dasselbe Modell, das sich – Implementierung für Implementierung – in Ledger, Keystone und Hito zeigt, die bald behandelt werden.

## PCZT

PCZT steht für Partially Created Zcash Transaction. Es ist das Paket, das eine Zcash-Transaktion und die Informationen enthält, die erforderlich sind, um sie von einer Phase in die nächste zu überführen.

Es ist ein standardisiertes Format für eine Zcash-Transaktion, während die Transaktion noch erstellt wird. Es ermöglicht verschiedenen Teilnehmern oder Geräten, unterschiedliche Teile des Transaktionserstellungsprozesses auszuführen und die teilweise abgeschlossene Transaktion zwischen ihnen weiterzugeben.

Die Erstellung einer Transaktion ist in Zero-Knowledge-Kryptowährungsprotokollen wie Zcash erheblich komplexer als das Signieren einer einfachen öffentlichen Übertragung. Abgeschirmte Transaktionen erfordern rechenintensive Zero-Knowledge-Beweise, beispielsweise solche, die mit Halo 2 oder Groth16 erzeugt werden. Daher verfügen Geräte mit geringer Leistung, etwa Hardware-Wallets, möglicherweise nicht über ausreichend Speicher und Verarbeitungskapazität, um den gesamten Transaktionsablauf zu bewältigen.

Die Einführung von PCZT begegnet mehreren zentralen Herausforderungen der abgeschirmten Kryptoarchitektur. PCZT ist ein standardisiertes Zwischenformat für Daten, das die Transaktionserstellung in modulare, unabhängige Rollen aufteilt. Es ermöglicht einem leistungsfähigen Begleit-Computer, die Zusammenstellung der Transaktion und die Beweiserzeugung zu übernehmen, während eine Offline-Hardware-Wallet strikt auf Autorisierung und Signierung beschränkt wird.

### Hardware- und Cold-Storage-Beschränkungen

Hardware-Wallets bieten zwar eine sichere Umgebung zum Schutz privater Ausgabeschlüssel, verfügen gegenüber Begleit-Computern jedoch typischerweise über begrenzten Arbeitsspeicher, begrenzte Rechenleistung und eingeschränkte Datenübertragungsmöglichkeiten. Diese Einschränkungen machen es unpraktisch, dass sie rechenintensive Zero-Knowledge-Beweise erzeugen oder den vollständigen Transaktionszustand verwalten, der während des Transaktionserstellungsprozesses benötigt wird.

Daher kann die Begleit-Wallet die rechenintensiven Aufgaben übernehmen, während die Hardware-Wallet auf den sicherheitskritischen Vorgang konzentriert bleibt, die Transaktion mit ihren geschützten Ausgabeschlüsseln zu autorisieren.

Da fragt man sich: Wenn das Gerät so eingeschränkt ist, wie kann es dann dennoch *genug* prüfen, um vertrauenswürdig zu sein?

Einfach gesagt kann eine Hardware-Wallet keinen beliebigen Wert von einem Begleit-Computer akzeptieren und signieren. Sie benötigt ausreichende Informationen, um festzustellen, dass der zu signierende Wert der Transaktion entspricht, die der Benutzer autorisieren möchte. Dies schafft einen schwierigen Ausgleich: Das Gerät muss genug analysieren und prüfen, um den Signierprozess zu schützen, und zugleich strenge Grenzen bei Speicher, Rechenleistung, Firmware-Größe und Implementierungskomplexität einhalten.

Die Verarbeitung von Ledger Orchard PCZT ist ein Beispiel für diese Herausforderung. Sie legt nahe, dass spezialisiertes, schaltkreisabhängiges Parsen die Implementierung auf eingeschränkten Geräten handhabbarer machen kann, bei Änderungen unterstützter Transaktionsstrukturen oder Schaltkreise aber möglicherweise Firmware-Änderungen erfordert.

Zwei laufende Bemühungen veranschaulichen unterschiedliche Antworten auf dieselbe Einschränkung.

Ein Forschungsvorschlag für eine vollständig konstantzeitliche Proving-Pipeline, die für Open-Source-Hardware-Wallet-Architekturen und gewöhnliche Computer geeignet ist, wurde in Grant #423 vorgelegt. Ziel war die Untersuchung kryptografischer Infrastruktur, die in Umgebungen wie C oder Rust sicher implementiert werden kann und zugleich die Komplexität und den Wartungsaufwand abgeschirmter Zcash-Unterstützung reduziert.

Ein alternativer Ansatz wird jedoch durch den vorgeschlagenen **Zcash SeedSigner** repräsentiert, einen Open-Source-Signer mit Air Gap, der aus preiswerten, leicht verfügbaren Komponenten aufgebaut ist. Sein vorgeschlagener Ablauf hält den Begleit-Computer vom Signiergerät getrennt und überträgt ein PCZT über eine Air Gap zur Prüfung und Signierung auf dem Gerät.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Zusammen zeigen diese Ansätze die umfassendere technische Herausforderung hinter abgeschirmten Hardware-Wallets: Transaktionserstellung und Beweisen können außerhalb des sicherheitskritischen Geräts stattfinden, aber der Signer muss dennoch über genug Informationen und Prüfmöglichkeiten verfügen, um die resultierende Transaktion sicher zu autorisieren.

### PCZT ermöglicht die geteilte Architektur

Der Standard Partially Created Zcash Transaction (PCZT) ist die formale Datenstruktur, die Begleit-Wallet und Hardware-Wallet verbindet.

Eine Begleit-Wallet kann die Auswahl von Notes übernehmen, die Nullifier bestimmen und den Zero-Knowledge-Beweis vollständig selbst erzeugen. Dies ist möglich, weil die für diese Schritte erforderlichen Informationen, einschließlich des zur Ableitung von Nullifiern verwendeten Schlüssels, aus dem Anzeigeschlüssel stammen und nicht an die Ausgabebefugnis gebunden sind. Anschließend verpackt die Begleit-Wallet diese Elemente in einen PCZT-Container.

Das PCZT wird an die Hardware-Wallet übergeben, die den Transaktionskontext – etwa Beträge und Empfängeradressen – liest, die Signatur mit ihren geschützten Ausgabeschlüsseln anbringt und das aktualisierte PCZT an das Begleitgerät zurückgibt.

Dieses Design schafft eine strikte Sicherheitsgrenze: Leistungsfähige Host-Hardware kann komplexe Zero-Knowledge-Mathematik ausführen, ohne Zugriff auf Ausgabeschlüssel zu benötigen, während stromsparende Cold-Storage-Geräte finanzielle Sicherheit durchsetzen können, ohne rechenintensive Kryptografie berechnen zu müssen.

### Datenschutzkompromisse beim Prover

Während die Delegierung der Erzeugung von Zero-Knowledge-Beweisen an die Begleit-Wallet oder einen anderen Prover die Ausgabeschlüssel isoliert hält, muss der Prover dennoch auf sensible Transaktionsinformationen wie Note-Werte, Empfängeradressen und Commitments zugreifen.

Das PCZT bewahrt die architektonische Trennung, indem es sicherstellt, dass diese Informationen für das Beweisen bereitgestellt werden können, ohne die zur Autorisierung erforderlichen privaten Ausgabeschlüssel zu übertragen.

Dies garantiert, dass Beweisbefugnis von Ausgabebefugnis getrennt bleibt. Der Prover kann die rechenintensive Beweiserzeugung ausführen, ohne die kryptografische Befugnis zu erhalten, die Gelder des Benutzers auszugeben.

### Interoperabilität von PCZT

Da PCZT zu einem wichtigen Bestandteil von Zcash-Hardware-Wallet-, Multisignatur- und Air-Gap-Signierabläufen wird, wird die Interoperabilität zwischen unabhängigen Implementierungen zunehmend wichtig.

Ein Vorschlag von AngryDavee vom Juni 2026 stellte fest, dass PCZT-Implementierungen bereits in Projekten wie Ledger, Keystone, Hito, OneKey und der Referenzimplementierung in librustzcash existierten. Der Vorschlag stellte jedoch fest, dass gemeinsame Tests fehlten, um zu bestätigen, dass diese Implementierungen PCZTs konsistent interpretieren.

Die vorgeschlagene Lösung war eine Open-Source-Testsuite zur Interoperabilität mit kanonischen PCZT-Testvektoren und implementierungsübergreifenden Tests für den vollständigen Ablauf create → sign → finalize. Außerdem wurde vorgeschlagen, Rollengrenzen wie den Combiner zu testen, bei dem teilweise signierte Informationen unterschiedlicher Signer kombiniert werden können, bevor eine Transaktion finalisiert wird.

Dies ist besonders für Hardware-Wallets relevant, da PCZT die Trennung von Transaktionserstellung und Signierung ermöglicht: Eine Begleit-Wallet kann eine Transaktion erstellen und ein PCZT vorbereiten, während ein Hardware-Gerät die erforderlichen Signierinformationen erhält und den sicherheitskritischen Signiervorgang ausführt.

Der Vorschlag wurde nicht umgesetzt, da Zcash Community Grants nach Prüfung des Vorschlags und Berücksichtigung des Community-Feedbacks entschied, das Grant nicht weiterzuverfolgen. Daher wurde die vorgeschlagene implementierungsübergreifende Testsuite nicht über dieses Grant entwickelt. Sie ist somit eine vorgeschlagene Antwort auf eine identifizierte Interoperabilitätsherausforderung von PCZT und kein Standard, der derzeit für Zcash existiert.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### Der Lebenszyklus eines PCZT

| # | Phase | Beschreibung |
|---|---|---|
| 1 | Ersteller | Initialisiert das PCZT mit globalen Transaktionsmetadaten, einschließlich Transaktionsversionen, Consensus-Branch-IDs und Pool-Flags. |
| 2 | Konstrukteur | Füllt die Transaktion mit vorgesehenen Eingaben und Ausgaben über transparente, Sapling-, Orchard- oder Ironwood-Pools hinweg. |
| 3 | IO Finalizer | Erklärt den Satz der Eingaben und Ausgaben für vollständig, berechnet Binding-Signature-Schlüssel und signiert erforderlichenfalls Dummy-Ausgaben. |
| 4 | Updater | Fügt erforderliche Kontextdaten für nachfolgende Teilnehmer an, beispielsweise vollständige Anzeigeschlüssel, Anchors und Merkle-Witnesses. |
| 5 | Prover und Signer | Führt die Erzeugung von Zero-Knowledge-Beweisen und kryptografische Signierung aus. In modernen PCZT-Versionen sind diese beiden Aufgaben vollständig unabhängig und können nacheinander oder parallel erfolgen. |
| 6 | Combiner | Führt mehrere PCZT-Instanzen deterministisch zusammen, wenn unterschiedliche Geräte gleichzeitig an Aspekten derselben Transaktion arbeiten. Zusammenführungsregeln erfordern eine strikte Konfliktauflösung, um versehentlichen Datenverlust zu verhindern. |
| 7 | Spend Finalizer & Extractor | Validiert alle erforderlichen kryptografischen Elemente, entfernt Kontextmetadaten der Zwischenstufe und erzeugt die finalisierte Zcash-Transaktion, die zur Übertragung an das Netzwerk bereit ist. |

## Hardware-Wallet-Implementierungen in der Praxis

### Auf einen Blick

| Gerät   | Was die Begleit-Wallet erhält              | Was auf dem Gerät bleibt          | Übertragung      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / Orchard FVK, Adressen            | Ausgabebefugnis                | USB / BLE      |
| Keystone | UFVK + Unified Address                   | Seed / Ausgabeschlüssel              | QR (Air Gap)|
| Hito     | UFVK, Unified Address, Seed-Fingerabdruck  | Seed und private Ausgabeschlüssel    | QR / lokal     |

Mehrere Hardware-Wallet-Implementierungen wurden entwickelt, um zu untersuchen, wie abgeschirmte Zcash-Transaktionen unterstützt werden können, während sensible Ausgabeschlüssel von der Begleit-Wallet isoliert bleiben. Ledger, Keystone und Hito repräsentieren unterschiedliche Ansätze zur Integration hardwarebasierter Schlüsselabsicherung in den Zcash-Transaktionsablauf.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Um zu verstehen, wie sie abgeschirmte Gelder schützen, ist es wichtig, zwischen Ausgabeschlüsseln und Anzeigeschlüsseln zu unterscheiden. Bei allen dreien folgt die Aufteilung derselben Form:

| Gerät | Was die Begleit-App erhalten kann | Was auf dem Gerät geschützt bleibt |
|---|---|---|
| Ledger | UFVK / Orchard FVK, Adressen und öffentliche Informationen | Ausgabebefugnis / privates Schlüsselmaterial |
| Keystone | UFVK + Unified Address | Seed / Ausgabeschlüssel |
| Hito | UFVK, Unified Address, Seed-Fingerabdruck und Netzwerkinformationen | Seed und private Ausgabeschlüssel |

### Ledger als Hardware-Signierumgebung

Ledger ist ein Hardware-Wallet-Unternehmen. Seine Geräte basieren auf einem Secure Element, einem speziellen Chip, der privates Schlüsselmaterial speichert und es physisch vom Rest des Geräts sowie von allem damit Verbundenen isoliert. Dieses Secure Element ist der Grund, weshalb ein Ledger-Gerät für Cold Storage vertrauenswürdig ist. Das bedeutet: Selbst wenn der damit verbundene Computer oder das Telefon kompromittiert ist, können die Schlüssel im Secure Element nicht extrahiert werden.

Allein ist ein Ledger-Gerät jedoch hinsichtlich einer bestimmten Kryptowährung leer. Es benötigt eine darauf installierte Anwendung, die mit der spezifischen Kryptografie dieser Währung umgehen kann.

Ein Ledger-Gerät ist hinsichtlich einer bestimmten Kryptowährung leer und benötigt daher eine Anwendung, die die Kryptografie dieser Währung beherrscht. Für Zcash gab es zwei Generationen:

- die ursprüngliche, von Zondax entwickelte App „Zcash Shielded“, die mit Begleit-Wallets wie Zkool verwendet wurde und am 5. November 2026 eingestellt wird, und
- die neuere App Zcash von Ledger (3.9.4+), die nativ von Ledger Wallet Desktop 4.21+ für abgeschirmtes ZEC von Ironwood verwendet wird.

Das unten beschriebene Modell der Schlüsselisolierung gilt für beide.

Zkool ist die Begleit-Wallet auf deinem Telefon oder Computer, die mit dieser App kommuniziert. Sie erstellt die Transaktion, sendet sie an Ledger, die App Zondax auf dem Gerät signiert sie anschließend und sendet die Signatur zurück.

Zondax ist also die auf der Hardware laufende Software, während Zkool die außerhalb laufende Software ist, die die App von Zondax zur Kommunikation mit dem Gerät verwendet.

### Was verlässt Ledger?

Die Zcash-Software von Ledger enthält eine spezielle Funktion zum Exportieren des Anzeigeschlüssels der Wallet, also des Schlüssels, mit dem Software Guthaben und Transaktionen sehen kann, ohne etwas ausgeben zu können.

Diese Funktion kann eines von zwei Dingen zurückgeben:

- einen Unified Full Viewing Key (UFVK), den vollständigen Anzeigeschlüssel für alle abgeschirmten Pools von Zcash gleichzeitig, oder
- einen Orchard Full Viewing Key (FVK)

Unabhängig davon, was ausgegeben wird, handelt es sich stets nur um einen Anzeigeschlüssel. Ganz gleich, welche Version angefordert wird: Diese Funktion kann niemals die eine Information zurückgeben, mit der jemand tatsächlich Gelder bewegen könnte – den Ausgabeschlüssel.

Genau darum geht es bei dieser Konstruktion: Sie ist so ausgelegt, dass sie nur etwas exportieren kann, das sicher an eine Begleit-App weitergegeben werden kann.

Die Schlüsselhierarchie von Zcash ist so aufgebaut, dass der Ausgabeschlüssel für jeden abgeschirmten Pool zwei getrennte Dinge ableitet:

- einen ausgabeautorisierenden Schlüssel und
- einen vollständigen Anzeigeschlüssel

Der FVK kann anschließend weitere anzeigebezogene Funktionen ableiten, aber dieser Ableitungspfad führt zu keinem Zeitpunkt zurück zur Ausgabebefugnis. Sobald ein Schlüssel in den Anzeigezweig der Hierarchie abgezweigt ist, bleibt er dort und kann nicht verwendet werden, um den Schlüssel für die Ausgabebefugnis wiederherzustellen, aus dem er hervorging.

Ironwood folgt demselben Muster, da es die zugrunde liegende Schlüssel- und Note-Konstruktion von Orchard wiederverwendet. Auf Konsensebene ist es jedoch ein eigenständiger Pool mit eigenem Commitment-Baum und eigener Nullifier-Menge. Das bedeutet, dass ein UFVK tatsächlich ein Bündel poolbezogener Anzeigeschlüssel ist – transparent, Sapling, Orchard und jetzt Ironwood – und kein einzelner flacher Schlüssel.

Ein vor der Aktivierung von Ironwood exportierter UFVK enthält keinen Anzeigeschlüssel für Ironwood, da dieser Pool damals noch nicht existierte. Genau deshalb mussten Wallets aktualisiert werden, um nach dem Upgrade NU6.3 Ironwood-fähige UFVKs zu erkennen und abzuleiten.

### Was bleibt auf Ledger?

Die Ausgabebefugnis bleibt auf dem Gerät.

Der Signer Ledger erhält eine Transaktion/ein PCZT vom Host und erzeugt die Ausgabenautorisierungssignatur abhängig davon, aus welchem Pool die Transaktion ausgibt – dem Pool Ironwood, da die aktuelle Integration von Ledger nur Ironwood unterstützt. Die Signatur wird anschließend auf dem Gerät erzeugt, und der Host erhält nur die Signatur, nicht den privaten Ausgabeschlüssel.

Dies entspricht auch dem allgemeinen Sicherheitsmodell von Ledger. Sein Secure Element isoliert privates Schlüsselmaterial, und die Sicherheitsanforderungen für Anwendungen von Ledger verbieten Anwendungen ausdrücklich, diese Secrets an den Host weiterzugeben.

Der Signer von Ledger kann FVK/UFVK exportieren und unabhängig davon Transaktionen signieren. Die beiden Funktionen werden über getrennte Funktionen bereitgestellt und nicht in einer zusammengefasst.

### Was bedeutet das in der Praxis?

Angenommen, dein Ledger enthält 10 ZEC.

Die Begleit-Wallet kann den UFVK haben und deshalb feststellen: „Diese Wallet hat 10 ZEC erhalten.“ Sie kann Transaktionen und Guthaben scannen und anzeigen.

Wenn jedoch jemand die Begleit-Wallet kompromittiert, ermöglicht der UFVK allein nicht die Erstellung der Ausgabenautorisierungssignatur.

Der Zweck der getrennten Ausgabenautorisierungssignatur besteht darin, eingeschränkten Geräten wie Hardware-Wallets zu ermöglichen, abgeschirmte Ausgaben zu autorisieren, ohne den vollständigen zk-SNARK-Beweis selbst ausführen zu müssen.

### Anwendung Zondax Ledger; die Hardware-Wallet-Seite

#### Was ist Zondax?

Zondax ist ein externes Entwicklungsunternehmen, das die App Ledger Zcash entwickelt hat. Es handelt sich um die eigentliche Firmware-Anwendung, die auf Hardware von Ledger läuft und dem Gerät erst die Fähigkeit gibt, Zcash-Transaktionen zu verstehen und zu verarbeiten.

Zondax ist ein externer Entwickler. Hardware von Ledger besitzt keine angeborene Fähigkeit zur Verarbeitung von Zcash-Transaktionen; diese Fähigkeit stammt vollständig aus der Software von Zondax.

### Ursprüngliche Implementierung von Zcash Ledger

Das App-Repository Ledger Zcash von Zondax enthält die Software, die auf einem Ledger-Gerät läuft. Die App konzentrierte sich ursprünglich auf abgeschirmte Sapling-Transaktionen, bevor Orchard als primärer abgeschirmter Pool von Zcash existierte. Die Unterstützung von Sapling war daher der Umfang dessen, was ein Ledger-Gerät mit abgeschirmtem ZEC tun konnte.

Ihre Architektur verdeutlicht die Trennung: Die Host-/Begleitseite bereitet Transaktionsinformationen vor, während Ledger sensible Schlüsseloperationen und die Signierung übernimmt.

Bereits in dieser frühesten Version der Hardware-Wallet-Unterstützung für Zcash waren die Kernprinzipien – Erstellung und Beweisen auf dem Host, anschließend isolierte Signierung auf dem Gerät – Teil des Designs.

### Entwicklung in Richtung Orchard

Die Arbeit von Ledger entwickelte sich in Richtung Orchard + PCZT. Dies war ein bedeutender Übergang und kein geringfügiges Update, da Orchard ein anderes Beweissystem verwendet – Halo 2 gegenüber Groth16 von Sapling – sowie eine andere Note- und Schlüsselkonstruktion. Die Erweiterung einer nur für Sapling bestimmten Firmware für die Signierung von Orchard erforderte daher neue kryptografische Grundlagen auf der Geräteseite und nicht lediglich einen Firmware-Patch.

Als sich Zcash jedoch in Richtung Ironwood bewegte, verlagerten Zondax und Ledger ihren Entwicklungsschwerpunkt darauf, Ironwood direkt zu unterstützen, statt zunächst eine Orchard-Implementierung abzuschließen, nur um sie anschließend für Ironwood neu zu gestalten. Dies stellt eine weitere Entwicklungsstufe der Ledger-Implementierung dar, da Ironwood auf der kryptografischen Architektur von Orchard aufbaut und zugleich einen separaten abgeschirmten Pool sowie zusätzliche Protokolländerungen einführt.

### Was innerhalb dieser Ledger-App geschieht

Der resultierende Ablauf wird wie folgt beschrieben:

1. Der Host erstellt ein PCZT.
2. Der Host sendet die relevanten Transaktionsinformationen an das Ledger-Gerät.
3. Das Gerät erzeugt die ausgabeautorisierenden Signaturen für Orchard.
4. Der Host übernimmt alles Folgende, einschließlich Binding-Signatur und finaler Transaktionszusammenstellung.

Die innerhalb von Ledger laufende App sieht oder erzeugt niemals etwas über die Ausgabenautorisierungssignatur selbst hinaus. Die gesamte rechenintensive oder datenhungrige Arbeit – Beweisen, Binding, Zusammenstellung – bleibt auf dem Host, dem kein Schlüsselmaterial anvertraut werden muss.

### Native abgeschirmte Integration von Ledger; Ledger Wallet Desktop

Die neueste Zcash-Integration von Ledger bietet ein konkretes Beispiel dafür, wie die Erstellung abgeschirmter Transaktionen und die sicherheitskritische Signierung zwischen Begleitsoftware und Hardware-Wallet getrennt werden können.

Mit Ledger Wallet Desktop 4.21+ und der Geräte-App Zcash 3.9.4+ können Benutzer abgeschirmte Ironwood von ZEC direkt über Ledger Wallet Desktop senden und empfangen. Die Integration unterstützt private-zu-private Übertragungen, Abschirmung aus dem transparenten Pool, Entschirmung in den transparenten Pool, private Empfangsadressen und Memos. Transaktionen werden auf dem Gerät Ledger geprüft und signiert, statt sich ausschließlich auf die vom Computer dargestellten Informationen zu verlassen.

Ein zentraler Teil dieser Architektur ist die Trennung von Anzeige- und Ausgabefunktionen. Bei der Synchronisierung des privaten Guthabens exportiert Ledger einen Unified Full Viewing Key (UFVK), der lokal auf dem Computer gespeichert wird. Der UFVK ermöglicht Ledger Wallet Desktop, relevante abgeschirmte Transaktionen zu erkennen und das Wallet-Guthaben zu bestimmen, verleiht jedoch keine Befugnis zur Ausgabe der Gelder. Die sicherheitskritische Ausgabebefugnis bleibt auf dem Gerät Ledger, das den abschließenden Signiervorgang ausführt. So entsteht eine klare Grenze zwischen dem Computer, der den Wallet-Zustand verwaltet und Transaktionen erstellt, und dem Hardware-Gerät, das die Fähigkeit zur Autorisierung von Ausgaben schützt.

Die aktuelle Integration ist allerdings ausdrücklich nur für Ironwood ausgelegt. Sie zeigt oder verwaltet über Ledger Wallet Desktop keine Gelder von Orchard oder Sapling. Historisch ist dies bedeutsam, weil die frühere Entwicklung von Ledger für Zcash mit abgeschirmter Unterstützung von Orchard verbunden war, bevor sich die Implementierung in Richtung des Protokolls Ironwood entwickelte.

Der Übergang unterstreicht auch die Bedeutung von Schlüssel- und Kontokompatibilität. Ledger verfügt über eine ältere Anwendung „Zcash Shielded“, die von Zondax entwickelt und von Integrationen wie YWallet und zkool verwendet wurde und nun eingestellt wird. Da diese ältere Anwendung ein anderes Ableitungsschema für abgeschirmte Konten verwendete, können ihre Sapling-Konten nicht einfach durch die neue Anwendung Ledger reproduziert werden.

Die Integration veranschaulicht daher sowohl die Fortschritte als auch die verbleibenden Grenzen der Unterstützung abgeschirmter Hardware-Wallets. Ledger kann nun ein vollständiges Ironwood-Erlebnis bieten, bei dem die Begleitsoftware Wallet-Synchronisierung und Transaktionsvorbereitung übernimmt, während das Hardware-Gerät die Sicherheitsgrenze für Ausgaben bleibt.

Gleichzeitig zeigen historische Kontokompatibilität, die Unterstützung nur bestimmter abgeschirmter Pools, Beschränkungen der Hardware-Transaktionsgröße, Plattformbeschränkungen sowie die beim Parsen und Prüfen abgeschirmter Transaktionen auftretenden Rechen- und Firmwareeinschränkungen, dass die Hardware-Wallet-Unterstützung für Zcash nicht nur von Protokollfunktionen abhängt, sondern auch vom Design und den Ressourcen jeder einzelnen Implementierung.

### Zkool + Ledger — Nutzung der offiziellen App Zondax

Als Nachfolger von Ywallet übernahm Zkool das Ziel des abgeschirmten Cold Signings, wählte jedoch einen anderen Weg dorthin – einen Weg, der direkt davon geprägt war, dass Kryptografie allein eine Integration nicht nutzbar macht, wenn die Signier-App nicht sicher verteilt werden kann.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Nutzung der Anwendung Zondax durch Zkool

Zkool entschied sich für die offizielle, von Zondax entwickelte App Ledger Zcash anstelle der aufgegebenen proprietären Anwendung Ledger von Ywallet. Anstatt eine benutzerdefinierte App zu pflegen, die der Store von Ledger nicht akzeptieren würde, baute Zkool auf der App auf, die bereits akzeptiert und über das eigene Ökosystem von Ledger verteilt wurde.

Diese Umstellung bedeutete, dass Benutzer sich zur Nutzung dieser Integration nicht mehr auf die Installation einer unsignierten benutzerdefinierten Anwendung Ledger verlassen mussten, da die App von Zondax offiziell über das Ökosystem von Ledger verteilt wurde.

Diese Integration steht jedoch am 5. November 2026 vor einer wichtigen Änderung, wenn die Unterstützung der älteren App Zcash Shielded wie geplant endet, weil Ledger sie auslaufen lässt. Da die Integration Ledger von Zkool auf dieser Anwendung beruht, wirft die Änderung Fragen zur künftigen Verfügbarkeit der bestehenden Verbindung auf. Die genauen Auswirkungen auf Zkool hängen davon ab, ob es die ältere App außerhalb von Ledger Wallet weiterverwenden oder zu einer kompatiblen Alternative wechseln kann.

### Unterstützte abgeschirmte Pools

Laut dem Entwickler von Ywallet verwendete die Integration Ledger von Zkool die offizielle, von Zondax entwickelte Anwendung Ledger und unterstützte sowohl transparentes als auch abgeschirmtes Zcash. Die abgeschirmte Unterstützung war jedoch auf Sapling beschränkt und unterstützte Orchard nicht; hinzu kamen weitere Integrationsbeschränkungen wie höchstens fünf Eingaben und Ausgaben jedes Typs sowie fehlende Kompatibilität mit Ledger Live.

Diese Einschränkung spiegelte den Umfang der zugrunde liegenden Implementierung Zondax Ledger zu diesem Zeitpunkt wider. Die frühere Arbeit Ledger von Zondax bot Unterstützung für Sapling, und die anschließende Veröffentlichung der App Zcash Shielded Ledger im Jahr 2024 schloss zunächst Orchard und Unified Addresses aus. Eine auf dieser Anwendung aufbauende Integration übernahm daher die Fähigkeiten und Grenzen der Hardware-Wallet-Implementierung, von der sie abhing.

Die Situation entwickelte sich später mit der Veröffentlichung der dedizierten App Zcash Shielded Ledger im November 2024 weiter. Zondax erklärte, dass die Anwendung offiziell über Ledger Live veröffentlicht worden sei, und veröffentlichte später Integrationsanleitungen sowie Pakete Rust und JavaScript, damit andere Wallets sie integrieren konnten. Zum Start kommunizierte die Anwendung jedoch ausschließlich mit Zecwallet Lite Desktop, während breitere Wallet-Integrationen noch entwickelt wurden.

Die nächste Stufe war die Entwicklung der neueren, auf Rust basierenden Anwendung Zcash von Ledger. Bis Juni 2026 berichtete Ledger, dass UFVK-Sharing und die Erzeugung von Orchard Unified Address umgesetzt worden seien, während die Signierung von Orchard-Transaktionen und ClearSign noch entwickelt würden. Ledger erklärte außerdem, dass die Arbeit mit der Protokolländerung auf den Weg Ironwood übertragen werde.

Ironwood erforderte anschließend Updates im gesamten Wallet-Ökosystem von Zcash. Zkool veröffentlichte ab Version 6.24.0 Unterstützung für die Migration von Orchard zu Ironwood und verfeinerte die Migration und Transaktionspipeline in späteren Versionen weiter. Ledger führte separat die Signierung PCZT v2 am 27. Juli in seiner neuen Anwendung zusammen, obwohl die Implementierung bis zum 20. August weder die Prüfung von Ledger noch den Rollout über Ledger Live abgeschlossen hatte. Dieser Meilenstein wurde inzwischen ausgeliefert; Ledger Wallet Desktop 4.21+ bietet nun direkt native Unterstützung für Ironwood.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Die Entwicklung ist daher besser nicht als ein einzelnes Upgrade von Zondax auf Ironwood zu verstehen, sondern als mehrere zusammenhängende Entwicklungen: die ursprüngliche auf Sapling fokussierte Implementierung Zondax, die App Zcash Shielded Ledger von 2024, die neuere Anwendung Ledger Rust mit Unterstützung für Orchard und PCZT, die eigene native Integration von Ledger in Ledger Wallet Desktop und parallele Aktualisierungen von Wallets wie Zkool, während das Ökosystem zu Ironwood überging.

### Aktuelle Geräte- und Plattformunterstützung von Ledger für Zcash

Die Unterstützung von Zcash auf Ledger hängt ab von:

- dem Gerätemodell
- der installierten Anwendung
- der für die Verwaltung verwendeten Plattform und
- davon, ob die Transaktion transparent oder abgeschirmt ist.

Stand 21. Juli 2026, dem letzten Update von Ledger, wird die App Zcash Shielded auf Nano S Plus, Stax und Flex unterstützt, jedoch noch nicht auf Nano X oder Nano Gen5.

Nano X und die anderen Modelle außer dem ursprünglichen Nano S können weiterhin die klassische App Zcash verwenden. Sie unterstützt transparente Transaktionen und die Ausgabe abgeschirmter Gelder an transparente Adressen – das Entschirmen –, jedoch keine Signierung abgeschirmter-zu-abgeschirmter Übertragungen. Das ursprüngliche Nano S unterstützt keine der beiden Apps, weil Ledger die Unterstützung für das Gerät auslaufen lässt und die neueste App Zcash darauf nicht verfügbar ist. Geräte verbinden sich mit Ledger Wallet, ehemals Ledger Live, der Begleitanwendung von Ledger, die auf dem Desktop für Windows, macOS und Linux sowie mobil für iOS und Android verfügbar ist.

Ledger hat native abgeschirmte Zcash in Ledger Wallet Desktop hinzugefügt, aufgebaut auf dem Pool Ironwood, wodurch keine separate Begleit-Wallet mehr benötigt wird. Abgeschirmtes ZEC wird in der mobilen App von Ledger für iOS und Android noch nicht unterstützt, eine mobile Unterstützung ist jedoch für eine spätere Veröffentlichung geplant.

Außerhalb der eigenen Software von Ledger hängt abgeschirmte Nutzung von einer kompatiblen Begleit-Wallet und deren unterstützten Plattformen ab. Da Ledger die Unterstützung für Ironwood weiter ausbaut, hängt die Kompatibilität von Gerätemodell, Firmware, App-Version und Betriebssystem ab. Allgemeine Unterstützung von Zcash garantiert also nicht unbedingt Kompatibilität.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### Cold Signing von YWallet; ein früherer Ansatz

Ywallet ist eine Begleit-Wallet, die von Ledger und Zondax getrennt ist und einen eigenen Weg zum abgeschirmten Cold Signing verfolgte.

Ywallet ist historisch bedeutsam, weil es Cold Signing für Zcash untersuchte, sodass das Signiergerät von der Online-Wallet getrennt gehalten werden konnte.

Um diese Architektur auf Hardware von Ledger umzusetzen, entwickelte Ywallet eine eigene Anwendung Ledger – eine proprietäre App, die sich von der im vorherigen Abschnitt behandelten App Zondax unterschied. Das bedeutete, dass Ywallet nicht auf die bestehende Implementierung Sapling von Zondax setzte, sondern über eigene Firmware für die Signierseite der Beziehung verfügte.

### Warum die Integration wichtig war

Kryptografie und Signiercode zu haben, reicht nicht aus. Die Integration einer Hardware-Wallet ist nicht ausschließlich ein kryptografisches Problem, sondern unvermeidlich auch ein Vertriebs- und Plattformproblem. Sie umfasst mindestens:

- Genehmigung/Vertrieb von Anwendungen – ob der offizielle App-Store des Hardware-Herstellers die App akzeptiert und verteilt
- Sicherheit von Firmware/Anwendungen – ob die App die Sicherheitsanforderungen des Herstellers für den Umgang mit Schlüsselmaterial erfüllt
- Kommunikationsprotokolle – wie die Begleit-Wallet und das Gerät tatsächlich Transaktionsdaten austauschen
- Kompatibilität mit der Wallet – ob Datenformate und Ablauf der Signier-App den Erwartungen der Begleit-Wallet entsprechen
- unterstützte abgeschirmte Pools – für welche von Sapling, Orchard und jetzt Ironwood die App tatsächlich signieren kann

Die proprietäre App Ledger von Ywallet erfüllte die kryptografischen und architektonischen Anforderungen. Sie konnte abgeschirmte Zcash-Transaktionen signieren, wurde jedoch nicht in den offiziellen App-Store von Ledger aufgenommen.

### Abkehr von der proprietären App Ledger

Da die App nicht offiziell akzeptiert wurde, hätte Ywallet Benutzer bitten müssen, unsignierte Firmware zu installieren, um sie zu verwenden. Dies ist ein echter Sicherheitskompromiss für Benutzer, und Ywallet entschied sich, dies nicht von ihnen zu verlangen. Daher gab Ywallet diese spezielle Integration letztlich auf, statt diesen Weg zu gehen.

Anstatt eine proprietäre App wiederzubeleben, bewegte sich die spätere Entwicklung – über Zkool, den Nachfolger von Ywallet – hin zur offiziellen, von Zondax entwickelten App Ledger. Damit wurde eine individuelle, abgelehnte Implementierung gegen eine standardisierte ausgetauscht, die bereits in das Vertriebsökosystem von Ledger aufgenommen war. Diese Umstellung ermöglichte letztlich erneut eine funktionierende Integration von Ledger.

### Das Vermächtnis von Ywallet

Auch nachdem sich Ywallet selbst aus der aktiven Entwicklung zurückgezogen hatte, blieb sein Ersteller Hanh, der zugleich Mitglied von ZCG ist, im Ökosystem eine relevante Stimme – insbesondere als die Migration von Ironwood gemeldete Probleme mit Geldern aufwarf, die verschwunden zu sein schienen.

**ZODL: Ein echter Benutzer hatte nach der Migration Orchard → Ironwood fehlende Gelder**

Ein Benutzer, Jmo0615, berichtete, dass zuvor in seiner Wallet ZODL sichtbare Gelder nach der Migration von Orchard zu Ironwood nicht mehr erschienen. Er erklärte, den ursprünglichen Seed wiederhergestellt, die Wallet zurückgesetzt und wiederhergestellt sowie die Version 3.14.1 (1) von ZODL vollständig synchronisieren lassen zu haben. Er bestätigte außerdem, dass keine Hardware-Wallet Keystone beteiligt war.

Es wurde nicht festgestellt, dass die Gelder tatsächlich verloren gingen. Vielmehr wird ein Problem bei Wallet-Erkennung oder Migration vermutet, bei dem zuvor sichtbare Gelder nach dem Übergang zu Ironwood nicht mehr angezeigt wurden. Gelder, die nicht erkannt oder angezeigt werden, sollten nicht automatisch als dauerhaft verloren beschrieben werden; diese Unterscheidung ist wichtig, um Migrationsprobleme zu verstehen.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: „gesperrte Notes“ können scheinbar nicht verfügbare Gelder erklären**

Ein weiterer wichtiger Aspekt abgeschirmter Wallets ist, wie der Wallet-Zustand die Gelder beeinflussen kann, die ein Benutzer tatsächlich ausgeben kann. Hanh erklärte, dass ein Benutzer durch Coin Control versehentlich eine Note sperren kann. Diese Funktion ermöglicht Benutzern, manuell auszuwählen, welche Notes für Ausgaben verwendet werden. In dieser Situation kann eine Note weiter in der Wallet existieren, aber als nicht zur Ausgabe verfügbar markiert sein.

Dies unterstreicht eine wichtige Unterscheidung bei der Untersuchung von Wallet-Problemen. Die Menge an ZEC, die in einer Wallet existiert, entspricht nicht immer der Menge, die derzeit ausgegeben werden kann. Faktoren wie Note-Auswahl, Synchronisierung, Migrationsstatus, Wallet-Wiederherstellung und Coin-Control-Einstellungen können das angezeigte oder verfügbare Guthaben beeinflussen. Berichte über „fehlende Gelder“ sollten daher sorgfältig zwischen Geldern unterscheiden, die nicht erkannt oder angezeigt werden, Geldern, die erkannt, aber nicht zur Ausgabe verfügbar sind, und Geldern, die tatsächlich verloren sind.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**Was ist Keystone?**

Keystone ist eine Hardware-Wallet mit Air Gap. Ihr Signiergerät hat während des Signierprozesses selbst keine direkte kabelgebundene oder drahtlose Verbindung zur Begleit-App und kommuniziert stattdessen über QR-Codes. Hier wird es mit Zashi, jetzt in Zodl umbenannt, der nativen Begleit-Wallet von Zcash, gekoppelt. Diese Kopplung macht das Prinzip der Schlüsselisolierung besonders explizit und leicht nachvollziehbar.

**Der Ablauf Keystone/Zashi**

Die Integration Zcash von Keystone mit Zashi macht diese Trennung besonders deutlich. Wenn du Keystone mit Zashi verbindest, wird der Unified Full Viewing Key von Keystone an Zashi übertragen.

Der Ablauf lautet also:

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**Was kann Zashi mit dem UFVK tun?**

Zashi kann ihn verwenden, um:

- eingehende abgeschirmte Transaktionen zu identifizieren
- Guthaben zu bestimmen
- Informationen über abgeschirmte Aktivität zu erhalten

Es kann die Gelder jedoch nicht ausgeben, nur weil es den UFVK besitzt.

Der UFVK ist eine „Anzeigefunktion“, die das Erkennen von Guthaben und Transaktionen ermöglicht, aber keine Ausgabe erlaubt.

### Was bleibt innerhalb von Keystone?

Seed/Ausgabebefugnis bleiben auf Keystone. Zashi erhält weder den Seed noch den Ausgabeschlüssel oder den privaten Schlüssel für die Ausgabenautorisierung. Es erhält den UFVK, Adressinformationen und die Informationen, die für den reinen Anzeigebetrieb notwendig sind.

Zusammen vervollständigen diese beiden Hälften das Bild. Was das Gerät verlässt, etwa UFVK, Adressen und Watch-only-Informationen, reicht für Zashi aus, um das Konto zu überwachen; nichts, was das Gerät verlässt, reicht jedoch aus, um Gelder daraus zu bewegen.

Deshalb kann die Integration von Zashi und Keystone abgeschirmten Cold Storage bieten. Die Wallet-Anwendung kann das Konto überwachen, ohne die Befugnis zum Ausgeben daraus zu besitzen. Die Integration wurde ausdrücklich eingeführt, um Cold Storage für abgeschirmtes ZEC zu ermöglichen.

Wenn du ausgeben möchtest:

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito folgt einem sehr ähnlichen Modell der Schlüsselisolierung wie Keystone, seine Implementierung ist jedoch neuer. Statt mit einer bestehenden Begleit-Wallet wie Zashi gekoppelt zu werden, wird Hito mit einer eigenen Wallet Android ausgeliefert. Der Onboarding-Prozess zwischen Hardware-Gerät und dieser App Android ist in den Entwicklungsmeilensteinen von Hito dokumentiert.

**Onboarding: Was die App Hito erhält**

Die Wallet Android verwendet beim Onboarding des Hardware-Kontos:

- den Unified Full Viewing Key (UFVK)
- Unified Address
- den ZIP-32-Seed-Fingerabdruck
- Netzwerkinformationen

Beachte, dass die Anwendung Android niemals den Seed oder die privaten Ausgabeschlüssel der Hardware-Wallet erhält.

![Hito onboarding](/content-images/hito-onboarding.webp)

**Was erhält die App Hito?**

Zu den dokumentierten Onboarding-Informationen gehören:

- UFVK
- Unified Address
- ZIP-32-Seed-Fingerabdruck
- Netzwerk

Der UFVK liefert der Wallet Android die Informationen, die sie benötigt, um das Konto als Wallet mit Anzeigefunktion zu betreiben, ohne den Seed zu erhalten. Der Seed-Fingerabdruck ist ein Kennzeichen fester Länge, das aus dem Seed abgeleitet wird und dazu dient, Konten wiederzuerkennen. Er ist nicht der Seed selbst und verleiht keine Ausgabefähigkeit; daher widerspricht seine Anwesenheit nicht der obigen Aussage, dass der Seed niemals empfangen wird.

**Was bleibt auf Hito?**

Der tatsächliche Seed, die privaten Ausgabeschlüssel und die Signierbefugnis bleiben auf dem Hardware-Gerät. Hito führt die Signierung anschließend offline durch.

Der aktuelle Meilenstein von Hito besagt, dass der vollständige Ablauf aus Erstellung, Export, Offline-Signierung und Import funktionsfähig ist, einschließlich BLE-Übertragung und BBQr-QR-Export des signierten PCZT.

Dieser Ablauf sollte ausdrücklich benannt werden, da er die konkrete Instanz des zuvor in diesem Bericht behandelten vollständigen Zyklus ist: Die Wallet Android erstellt das unsignierte PCZT, exportiert es zu Hito, Hito signiert es offline mit seinem isolierten Schlüsselmaterial, und das signierte PCZT wird zurück in die Wallet Android importiert.

Zu keinem Zeitpunkt überschreitet der Seed oder Ausgabeschlüssel diese Grenze in irgendeine Richtung.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## Orchard zu Ironwood: Die Entwicklung der Hardware-Wallet-Unterstützung

Orchard ist ein abgeschirmter Pool im Protokoll Zcash, der Benutzern die Speicherung und Übertragung von ZEC mit erweitertem Datenschutz ermöglicht. Orchard wurde in Network Upgrade 5 (NU5) eingeführt, verwendet das Beweissystem Halo 2 und eine neu gestaltete kryptografische Architektur, um abgeschirmte Transaktionen zu ermöglichen, ohne sensible Transaktionsinformationen wie Absender, Empfänger oder Betrag offenzulegen.

Ironwood ist ein abgeschirmter Pool, der im Netzwerk-Upgrade NU6.3 von Zcash als Nachfolger des Pools Orchard eingeführt wurde. Er verwendet das kryptografische Protokoll Orchard und führt zugleich Änderungen ein, die die langfristige Sicherheit abgeschirmter Gelder verbessern sollen, einschließlich Quantenwiederherstellbarkeit und stärkerer Zusicherungen zur Integrität der Geldmenge.

Zu Beginn muss klargestellt werden, dass Ironwood das Protokoll Orchard nicht durch ein vollständig neues kryptografisches System ersetzt hat. Ironwood wurde als neuer abgeschirmter Pool auf Grundlage des bestehenden Protokolls Orchard eingeführt. Das bedeutet, dass beide dieselbe Action-Struktur, dasselbe Beweissystem Halo 2 und dieselben Note- und Schlüsselkonstruktionen haben.

Ironwood hat einen eigenen Note-Commitment-Baum, eine eigene Nullifier-Menge, einen eigenen Anchor und einen eigenen Wert-Pool und ist damit auf Konsensebene ein tatsächlich separater Pool. Kryptografisch ist es jedoch eine Erweiterung von Orchard und kein Neubau.

Es wurde auf diese Weise entworfen, um:

1. **Integrität der Geldmenge.** Am 29. Mai 2026 legte der Sicherheitsforscher Taylor Hornby privat einen kritischen Soundness-Fehler im Zero-Knowledge-Beweissystem von Orchard offen, der die Erzeugung gefälschter ZEC ohne on-chain-Spuren hätte ermöglichen können. Da die Transaktionsdaten von Orchard privat sind, kann niemand unabhängig prüfen, dass vor der Fehlerbehebung keine gefälschten ZEC erzeugt wurden. Den alten Pool zu versiegeln und einen neuen bei null zu beginnen, löst dieses Problem auf eine Weise, die ein Patch von Orchard an Ort und Stelle nicht hätte lösen können.
2. **Quantenwiederherstellbarkeit sicherzustellen.** Ironwood wurde so entwickelt, dass seine Gelder an einem künftigen Wiederherstellungsmechanismus teilnehmen können, falls die zugrunde liegenden Annahmen zum diskreten Logarithmus jemals gebrochen werden.
3. **Implementierungsänderungen zu minimieren.** Statt ein völlig neues abgeschirmtes Protokoll zu entwickeln, wurde die bewährte Architektur von Orchard wiederverwendet. Dadurch musste erheblich weniger neuer Transaktions-, Beweis-, Wallet- und Hardware-Wallet-Code von Grund auf geschrieben werden.

### Die öffentliche Zeitleiste

- 29. Mai: Die Schwachstelle von Orchard wird offengelegt.
- Juni: Orchard-Transaktionen werden vorübergehend eingeschränkt, während eine erste Fehlerbehebung über NU6.2 ausgeliefert wird. Am 12. Juni nennt ein Kernentwickler den 21. Juli als Ziel für das vollständige Upgrade; später verschiebt es sich um eine Woche. In der Community wird die Sorge geäußert, dass Besitzer von Keystone zuletzt migrieren würden. Ein Kernentwickler antwortet daraufhin, dass Keystone Ironwood vom ersten Tag an unterstützen werde, mit für den 3. Juli geplanter Firmware, vorbehaltlich finalisierter Signierkonstanten und API-Änderungen von Orchard im Kern von Zcash.
- Anfang Juli: NU6.3 erreicht das Testnet; Zebra 6.0.0 wird am 10. Juli ausgeliefert.
- 27.–28. Juli: Die Signierarbeit Ironwood PCZT v2 von Ledger wird in einen Integrationszweig übernommen. Ironwood (NU6.3) aktiviert sich am 28. Juli bei Block 3.428.143, versiegelt den ursprünglichen Pool Orchard hinter einer Schleuse, die begrenzt, wie viel ZEC Orchard verlassen kann, auf den Betrag, der rechtmäßig darin eingezahlt wurde, und führt ein neues Transaktionsformat ein.

Zebra wird zum erforderlichen Knoten, da zcashd die neuen Konsensregeln nicht unterstützt. Adressen ändern sich nicht, weil Ironwood die Empfängerstruktur von Orchard wiederverwendet. Wallets leiten daher bestehende Adressen automatisch in den neuen Pool. Was Wallets benötigen, ist eine Migrationsfunktion, da Gelder von Orchard letztlich von ihren Besitzern nach Ironwood verschoben werden müssen und neue Ausgaben, die Orchard empfangen, nun vollständig durch Konsens blockiert werden.

### Was sich technisch geändert hat

Transaktionsformate wechselten von Version 5 zu Version 6, sodass eine einzelne Transaktion neben bestehenden Komponenten Sapling/Orchard/transparent auch eine Komponente Ironwood enthalten kann. PCZT wurde entsprechend erweitert:

- Die Kodierung wechselte von PCZT v1 zu v2.
- Ein separates Bündel Ironwood liegt nun neben den Bündeln Sapling und Orchard.
- v6-Transaktionen und ein neuer v6-Sighash werden unterstützt.
- Note-Klartexte erhielten eine neue Version (V3).

Die Änderung des Sighash ist speziell für Hardware-Wallets am wichtigsten. In v6 sind die Anchors Orchard und Ironwood vom Signatur-Hash ausgeschlossen und fließen nur in den Digest der Autorisierungsdaten ein. Dies ist eine echte Firmware-Änderung, nicht bloß eine Versionsanhebung. Ein Gerät muss den neuen Sighash korrekt implementieren und selbst neu berechnen, statt darauf zu vertrauen, was die Begleit-App nach eigener Aussage genehmigt.

Der Isolierungsvertrag selbst änderte sich nicht: Das Gerät gibt weiterhin nur die Ausgabenautorisierungssignatur zurück, niemals `alpha`, und erzeugt auch nie die Binding-Signatur; der Host übernimmt weiterhin das Beweisen und alles Weitere.

Eine Signer-Regel änderte sich mit v6 jedoch: Dummy-Padding-Ausgaben werden vom IO Finalizer statt vom Gerät signiert, da das Gerät keine Möglichkeit hat, sie gegen echte Note-Daten zu prüfen. Die Signer-Rolle des Geräts überspringt sie, statt zur Signierung von etwas aufgefordert zu werden, das sie nicht prüfen kann. Angezeigte Gebühren summieren nun außerdem die Wertsalden von Orchard und Ironwood, da eine v6-Transaktion aus beiden Pools in derselben Transaktion ausgeben kann.

Die korrekte Poolabrechnung ist in der Praxis und nicht nur theoretisch wichtig. Ein jüngerer Fehler in der eigenen Wallet Zcash von Brave veranschaulicht dies: Die Gebührenberechnung nahm an, dass alle abgeschirmten Eingaben zum älteren Pool Orchard gehörten, was zu doppelten Actions und falschen Gebührenprognosen führte, sobald eine Transaktion tatsächlich Ironwood einbezog. Genau diese Fehlerklasse soll das Prinzip „selbst neu berechnen, dem Host nicht vertrauen“ hinter der Signierung durch Hardware-Wallets erkennen. Eine Begleit-Wallet berechnete die Poolabrechnung falsch; nur ein Gerät, das seine eigene Berechnung unabhängig prüft, würde dies vor der Signierung erkennen.

### Stand jedes Signers

**Ledger hat das gesamte Bild verändert.** Am 23. September 2026 lieferte Ledger native abgeschirmte Unterstützung für Zcash direkt in Ledger Wallet Desktop aus; eine separate Begleit-App wird nicht mehr benötigt. Dein Ausgabeschlüssel bleibt auf dem Gerät, der Computer erledigt die Transaktionsberechnungen, und du bestätigst alles auf dem Bildschirm, bevor signiert wird. Unterstützt wird nur Ironwood, nicht die alten Pools Orchard oder Sapling. Der Nachteil besteht darin, dass die ältere App „Zcash Shielded“, entwickelt von Zondax und auf eine Begleit-Wallet wie Zkool angewiesen, eingestellt wird. Ledger entfernt diese ältere App am 5. November aus der Verfügbarkeit; wer sie weiterhin verwendet, muss seine Gelder zuvor verschieben.

**Keystone befindet sich in guter Verfassung.** Firmware 3.0.2 fügte bereits im Juli vollständige Unterstützung für Ironwood hinzu und ist weiterhin die aktuelle, stabile Voraussetzung. Diese oder eine neuere Version wird allerdings benötigt, um irgendetwas zu signieren.

**Hito ist über den anfänglichen Testnet-Meilenstein hinausgekommen.** Es hat erfolgreich seine erste echte Transaktion Orchard-zu-Ironwood auf physischer Hardware signiert und übermittelt, zunächst im Testnet. Nachfolgende Updates bestätigten Mainnet-Abläufe – Ironwood→Ironwood, Ironwood→Transparent und weitere – auf Produktionshardware. Stabile Firmware und eine breitere Veröffentlichung befinden sich weiterhin in Arbeit.

Zondax und Zkool befinden sich derzeit im Wandel. Die App von Zondax ist jene, die auf Ledger eingestellt wird. Zkool, das sich auf diese App stützte, um mit Geräten Ledger zu kommunizieren, hat nicht angegeben, was aus dieser Rolle wird, wenn die alte App verschwindet. Es ist unklar, ob es für Benutzer von Ledger künftig relevant bleibt oder ob seine Zukunft vor allem bei anderen Geräten liegt.

Die Migration selbst ist die größte Auswirkung. Da der zwischen Pools übertragene Betrag öffentlich ist, verteilen Wallets Übertragungen über Standardstückelungen hinweg im Laufe der Zeit, anstatt ein Guthaben in einem sichtbaren einzigen Block zu bewegen. Das bedeutet viele zu signierende Transaktionen pro Migration und genau deshalb war Batch-Signierung von PCZT für Hardware-Wallets so wichtig.

Die Firmware-Arbeit von Ledger stieß außerdem auf Hardwaregrenzen: Eine echte Note-Ausgabe konnte in einem einzigen Befehl Zehntausende kryptografische Systemaufrufe erreichen und den Geräte-Watchdog auslösen. Die Fehlerbehebung verlagerte die Feldarithmetik in Software und erforderte einen gemeinsamen Scratch-Zustand, um innerhalb der Stack-Beschränkungen von Nano X zu bleiben.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### Die Entwicklung in einem Bild

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
