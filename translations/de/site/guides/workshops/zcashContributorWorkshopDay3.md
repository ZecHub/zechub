# Workshop-Tag 3



## Datenanalyse

* Die Wissenschaft der Analyse von Rohdaten mithilfe spezialisierter Systeme, Werkzeuge und Techniken, um Muster, Trends und Erkenntnisse zu identifizieren


Dazu gehört:
```markdown
                     \
-> collecting         \
-> cleaning     =====  \  DATA
-> organizing   =====  / 
-> transforming       /
-> optimizing        /
```




## Zcash 

* Verschlüsseltes elektronisches Bargeld. Die erste Kryptowährung, die Zero-Knowledge-Verschlüsselung für private Peer-to-Peer-Zahlungen entwickelt hat.

Hinweis: Wenn du genaue Daten möchtest, denen du VERTRAUST, wird empfohlen, deinen eigenen Full Node [zebrad] zu betreiben. Du kannst die
z3-Infrastruktur [ zebrad + zainod/lightwalletd + "wallet of choice here" ] einrichten, wenn du eine vollständige und robuste Lösung möchtest. Du greifst
über RPCs (Remote Procedure Calls) auf die Daten zu.

Für eine kurze Demonstration, wie das funktioniert, sieh dir dieses Video an:


https://www.youtube.com/watch?v=Ok9Wa8FNbMA


## Workshop-Demo

Dieser Workshop konzentriert sich auf das Sammeln und Transformieren von Daten auf Wallet-Ebene. Auf dieser Ebene greifen die meisten Menschen auf
die Zcash-Blockchain zu.


### Anwendungsfall ( Eine `.csv`-Datei aller Transaktionen für ein bestimmtes Konto in Zkool erstellen)

Dies ist ein beliebtes Szenario, in dem man seine *digitalen* persönlichen Finanzen organisieren und optimieren muss.

#### Schritt 1

Öffne Zkool und wähle das Konto aus, das du verwenden möchtest

Hinweis: Für diese Demo verwenden wir eine Testnet-Wallet.

Hinweis2: Wir wählen hier Zkool, aber JEDE Wallet mit Exportfunktion wird funktionieren!

https://github.com/hhanh00/zkool2

<img width="1496" height="646" alt="1" src="https://github.com/user-attachments/assets/125adfe8-6be3-4798-8ee8-b96bba9fb9ac" />



#### Schritt 2


Gehe zum Menü oben rechts und wähle "Transaktionen exportieren"

<img width="1398" height="718" alt="2" src="https://github.com/user-attachments/assets/4287ceb6-669b-4ef0-ba24-3f7e2d9860b6" />


#### Schritt 3

Lade das Bash-Skript herunter, das wir verwenden werden, um unsere Daten zu transformieren. Für Entwickler, die zusehen: Ich werde Bash verwenden, was
in den meisten Linux-Distributionen Standard ist, aber du kannst die Sprache deiner Wahl verwenden. 

Für Nicht-Entwickler oder Schüler/Studierende, die gerade erst anfangen, nutze KI! 

Einige Beispiel-Prompts, die dir den Einstieg erleichtern können:

"Wie kann ich "bash/rust/python/ ... etc." verwenden, um CSV-Dateien zu transformieren"

<img width="1098" height="480" alt="3" src="https://github.com/user-attachments/assets/6503f4be-6fbc-473f-919c-8914e09181bc" />

Hinweis: Du musst die Grundlagen trotzdem verstehen, aber diese Workshops durchzuführen hilft dir, den ABLAUF des Prozesses zu verstehen.

Hinweis2: KI ist normalerweise nicht privat, also sei als Lernender besonders vorsichtig bei der Nutzung!

#### Schritt 4

Skripte zur Nutzung einrichten und ausführen

`chmod +x cleanCSV.sh`

`./cleanCSV.sh "name_of_exportBackup"`

#### Schritt 5 Daten nutzen

In LibreOffice oder einem anderen CSV-Viewer zur Verwendung öffnen!



<img width="2132" height="942" alt="4" src="https://github.com/user-attachments/assets/1097030d-c0f4-44c4-b15c-f86706a77bdc" />
