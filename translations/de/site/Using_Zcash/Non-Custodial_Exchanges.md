<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alternativtext" width="50"/>   Nicht-verwahrende Börsen

[Zcash Nicht-verwahrende Börsen](/dex)

In der sich ständig weiterentwickelnden Welt des Kryptowährungshandels ermöglichen nicht-verwahrende Börsen, auch bekannt als dezentrale Börsen oder DEXs, Nutzern zu handeln, ohne ihre Gelder einem Börsenkonto anzuvertrauen. Du behältst deine eigenen Schlüssel, doch das bedeutet nicht, dass sonst niemand beteiligt ist. Je nach Route kann ein Swap über eine Website oder Wallet-App, einen Routing-Service, Smart Contracts, Solver und Bridges laufen.

Die oben aufgeführten Börsen ermöglichen es dir, Zcash aus deiner eigenen Wallet zu erhalten und zu handeln. Wie privat ein Swap ist, hängt vom Service, dem Netzwerk, von dem du bezahlst, und davon ab, ob dein ZEC in einer abgeschirmten Adresse landet. Die folgenden Abschnitte erläutern den Unterschied.

### **Nicht-verwahrende Börsen verstehen**

Nicht-verwahrende Börsen, auch bekannt als dezentrale Börsen (DEXs), sind Plattformen, die den Handel mit Kryptowährungen ermöglichen, ohne dass Nutzer ihre Gelder bei der Börse selbst einzahlen müssen. Stattdessen behalten Nutzer die Kontrolle über ihre privaten Schlüssel und handeln aus ihren eigenen Wallets. Cross-Chain-Swaps sind weiterhin auf andere Parteien angewiesen, um den Handel zu quotieren, weiterzuleiten und abzuwickeln (siehe unten).

Dies kann die Sicherheit verbessern, da Nutzer nicht darauf angewiesen sind, dass die Börse ihre Vermögenswerte verwahrt, wodurch das Risiko von Hacks oder Fehlmanagement sinkt. Ein Swap wird dadurch jedoch nicht automatisch privat. Transaktionen auf nicht-verwahrenden Börsen verwenden häufig Smart Contracts, die öffentlich sind, und der von dir genutzte Service kann weiterhin deine Adressen und Verbindungsdetails sehen.

Ein wesentlicher Vorteil nicht-verwahrender Kryptowährungsbörsen liegt in der stärkeren Kontrolle, die sie Nutzern über ihre Vermögenswerte geben. Da diese Börsen die Vermögenswerte nicht verwahren, behalten Nutzer vollständiges Eigentum und volle Verfügungsgewalt über ihre digitalen Währungen.

### **Nicht-verwahrende Börsen vs. verwahrende Börsen**

**#1 Sicherheit**: Nicht-verwahrende Börsen machen es überflüssig, Gelder auf einem zentralen Börsenkonto zu halten. Nutzer behalten die Kontrolle über ihre privaten Schlüssel, wodurch das Risiko von Hacks, Insider-Angriffen und Plattformausfällen, die bei verwahrenden Börsen auftreten können, sinkt. Cross-Chain-Swaps können Gelder dennoch für kurze Zeit in einer Einzahlungsadresse oder Bridge halten, während der Handel abgewickelt wird.

**#2 Privatsphäre**: Nicht-verwahrende Swaps benötigen normalerweise kein Börsenkonto, sodass du die Anmeldung mit E-Mail oder Ausweis oft überspringst. Das ist nicht dasselbe wie Anonymität. Die Einzahlung, die du im Quellnetzwerk sendest (zum Beispiel Solana oder Ethereum), ist auf dieser Chain öffentlich, und der Service kann weiterhin deine Wallet-Adressen, IP-Adresse und Swap-Details sehen. Die Privatsphäre auf der Zcash-Seite hängt davon ab, wo dein ZEC landet (siehe unten).

**#3 Dezentralisierung**: Nicht-verwahrende Börsen entsprechen stärker dem dezentralen Ethos von Kryptowährungen. Nutzer haben mehr Autonomie und Kontrolle über ihre Handelsaktivitäten, im Einklang mit den umfassenderen Prinzipien der Blockchain-Technologie.

Bei verwahrenden Börsen ist der Grad der Dezentralisierung bei den meisten zentralisierten Börsen oft sehr gering, wodurch das Börsenteam oder Verantwortliche Nutzerdaten beziehungsweise Informationen auf der Börse verwalten.

**#4 Anpassungsfähigkeit an sich ändernde Vorschriften**: Nicht-verwahrende Börsen sind häufig besser an sich ändernde regulatorische Rahmenbedingungen anpassbar. Da sie keine Nutzergelder halten, könnten sie im Vergleich zu verwahrenden Börsen weniger Compliance-Herausforderungen haben.

**#5 Innovation und Experimentieren**: Nicht-verwahrende Börsen treiben Innovationen im Kryptobereich häufig voran. Sie fördern die Entwicklung dezentraler Technologien wie automatisierter Market Maker (AMMs) und dezentraler Finanzanwendungen (DeFi).

**#6 Globaler Zugang**: Nicht-verwahrende Börsen bieten Nutzern auf der ganzen Welt häufig Zugang zu Kryptowährungen, auch in Regionen, in denen regulatorische Hürden die Verfügbarkeit verwahrender Börsendienste einschränken könnten.

**#7 Keine KYC-Anforderungen**: Viele nicht-verwahrende Börsen verlangen nicht im Voraus nach Identitätsdokumenten. Die meisten prüfen jedoch Wallet-Adressen weiterhin gegen Compliance-Datenbanken, und ein Swap kann verzögert, blockiert oder abgelehnt werden, wenn etwas markiert wird. Prüfe die Bedingungen des Services, bevor du dich darauf verlässt.

### **Was Zcash schützt und was nicht**

Die Privatsphäre von Zcash beruht auf abgeschirmten Adressen. Wenn sich ZEC zwischen abgeschirmten Adressen bewegt, werden Sender, Empfänger, Betrag und Memo auf der Zcash-Chain verschlüsselt. Siehe [Abgeschirmte Pools](/using-zcash/shielded-pools) für eine Erklärung der Funktionsweise.

Ein Swap besteht aus Teilen, die Zcash nicht verbergen kann:

- **Das Quellnetzwerk.** Gelder, die du von Solana, Ethereum oder einer anderen öffentlichen Chain sendest, sind auf dieser Chain sichtbar, einschließlich deiner Adresse und des Betrags.
- **Die Empfangsadresse.** Einige Swap-Routen liefern ZEC an eine transparente Adresse. Near Intents führt beispielsweise ZEC als unterstützt für [nur transparente Adressen](https://docs.near-intents.org/resources/chain-support) auf. ZEC, das an eine transparente Adresse (t1 oder t3) gesendet wird, ist öffentlich, ähnlich wie Bitcoin. Ein späteres Abschirmen schützt, was du danach tust, aber die eingehende Überweisung und die Abschirmungstransaktion bleiben sichtbar.
- **Der Service.** Die App und jeder Routing-Service sehen die Adressen und Beträge, die du ihnen gibst, sowie Verbindungsdaten wie deine IP-Adresse.

Sende das ZEC an eine Wallet, die du kontrollierst, und schirme es ab, bevor du es ausgibst. [ZEC privat verwenden](/guides/using-zec-privately) behandelt die nächsten Schritte.

### **Wer an einem Swap beteiligt ist**

Nimm als Beispiel einen Swap, der über den Near Intents 1Click-Service geroutet wird. Seine [API-Bedingungen](https://docs.near-intents.org/security-compliance/terms-of-service) behandeln Folgendes als getrennte Bestandteile:

- **Die Benutzeroberfläche**: die Website oder Wallet, die du verwendest. Sie kann von Intents Technology oder von einem Dritten mit eigenen Bedingungen betrieben werden.
- **1Click**: ein Routing- und Abwicklungsservice von Intents Technology Limited. Du sendest Gelder an eine für dein Angebot erstellte Einzahlungsadresse. Laut Dokumentation übernimmt 1Click keine Verwahrung, doch die Bedingungen weisen darauf hin, dass Vermögenswerte während einer laufenden Übertragung in der Bridge-Infrastruktur gehalten oder gesperrt sein können.
- **Das Protokoll**: die Near Intents Smart Contracts.
- **Solver**: unabhängige Dritte, die das Angebot erfüllen.
- **Bridges**: natives ZEC bewegt sich über die PoA Bridge, die von Intents Technology betrieben wird.

Near Intents [prüft integrierte Angebotsabläufe](https://docs.near-intents.org/security-compliance/risk-and-compliance) außerdem gegen mehrere AML-Datenbanken und gibt an, dass die Abdeckung je nach Ablauf und Integration variiert. Gemäß seinen Bedingungen kann ein markierter Swap verzögert, blockiert, eingefroren oder abgelehnt werden.

### **Was du während eines Swaps teilst**

- Die ZEC-Adresse, die den Swap empfängt, sowie eine Rückerstattungsadresse im Quellnetzwerk.
- Den Vermögenswert und Betrag sowie die Einzahlungs-Transaktion, die du sendest und die auf der Quell-Chain öffentlich ist.
- Verbindungsdaten. In den 1Click-Bedingungen heißt es, dass Intents Technology Anfragemetadaten, IP-Adressen und Wallet-Adressen erfassen kann; die Datenschutzerklärung auf near.com nennt IP-Adresse, Standort, Browser- und Geräteinformationen.
- Alles, was die App zusätzlich hinzufügt, etwa weitere verbundene Wallet-Adressen. Apps können deine Wallet auch eigenen Compliance-Prüfungen unterziehen.

### **Wo du Bedingungen und Support prüfen kannst**

Bedingungen ändern sich; lies daher vor einem großen Swap die aktuellen Versionen.

- **Beginne mit der App, die du nutzt.** Sie ist dein wichtigster Ansprechpartner. Die 1Click API-Bedingungen besagen, dass Intents Technology keine direkte Beziehung zu Nutzern von darauf aufgebauten Apps hat.
- **Near Intents:** die Bedingungen und Datenschutzerklärung unter near.com/terms und near.com/privacy sowie die [1Click API-Bedingungen](https://docs.near-intents.org/security-compliance/terms-of-service) und [Risiko und Compliance](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Nachverfolgung und Support:** Suche einen Swap im [Near Intents Explorer](https://explorer.near-intents.org) oder frage im [Near Intents Telegram](https://t.me/near_intents).
- **Rückerstattungen:** Ein fehlgeschlagener Swap kann an die von dir angegebene Rückerstattungsadresse zurückgesendet werden, doch laut den Bedingungen von near.com ist eine Rückerstattung nicht garantiert. Die 1Click-Bedingungen besagen außerdem, dass Wiederherstellungsanfragen bei Nutzerfehlern unter 300 USD nicht berücksichtigt werden.

Lass uns nun einige der zugänglichen nicht-verwahrenden Börsen erkunden, die den Handel mit Zcash ermöglichen. Die Nutzung dieser Plattformen bietet dir eine bequeme Möglichkeit, mehr Zcash-Coins zu erwerben.

### **Zusammenfassung**

Nicht-verwahrende Börsen oder DEXs ermöglichen dir den Handel aus deiner eigenen Wallet, während du die Kontrolle über deine privaten Schlüssel behältst. Das fördert die Sicherheit, doch die Privatsphäre hängt von der Route ab: Die Quell-Chain ist öffentlich, der Service sieht deine Adressen und Verbindungsdaten, und dein ZEC ist erst privat, sobald es sich in einer abgeschirmten Adresse befindet.

Nicht-verwahrende Börsen bieten zwar überzeugende Vorteile, doch es ist wichtig anzuerkennen, dass sie auch Nachteile mit sich bringen können, etwa potenzielle Liquiditätsprobleme und eine steilere Lernkurve für weniger erfahrene Nutzer.

Wie bei jeder finanziellen Entscheidung sollten Händler ihre Prioritäten, Risikotoleranz und Vertrautheit mit der Technologie sorgfältig bewerten, bevor sie zwischen nicht-verwahrenden und verwahrenden Börsenoptionen wählen.
