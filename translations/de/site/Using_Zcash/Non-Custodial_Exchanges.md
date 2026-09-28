<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alt-Text" width="50"/>   Non-Custodial-Börsen

[Zcash Non-Custodial-Börsen](/dex)

In der sich ständig weiterentwickelnden Welt des Kryptowährungshandels ermöglichen Non-Custodial-Börsen, auch als dezentrale Börsen oder DEXs bekannt, den Handel, ohne dass Nutzer ihre Gelder einem Börsenkonto anvertrauen müssen. Du behältst deine eigenen Schlüssel, doch das bedeutet nicht, dass niemand sonst beteiligt ist. Je nach Route kann ein Swap über eine Website oder Wallet-App, einen Routing-Dienst, Smart Contracts, Solver und Bridges laufen.

Die oben aufgeführten Börsen ermöglichen es dir, Zcash aus deiner eigenen Wallet zu beziehen und damit zu handeln. Wie privat ein Swap ist, hängt vom Dienst, dem Netzwerk, von dem du zahlst, und davon ab, ob dein ZEC letztlich in einer abgeschirmten Adresse landet. Die folgenden Abschnitte erklären den Unterschied.

### **Non-Custodial-Börsen verstehen**

Non-Custodial-Börsen, auch als dezentrale Börsen (DEXs) bekannt, sind Plattformen, die den Handel mit Kryptowährungen ermöglichen, ohne dass Nutzer ihre Gelder bei der Börse selbst einzahlen müssen. Stattdessen behalten Nutzer die Kontrolle über ihre privaten Schlüssel und handeln aus ihren eigenen Wallets heraus. Cross-Chain-Swaps sind dennoch auf andere Parteien angewiesen, um den Handel zu quotieren, weiterzuleiten und abzuwickeln (siehe unten).

Dies kann die Sicherheit verbessern, da Nutzer sich nicht darauf verlassen, dass die Börse ihre Vermögenswerte verwahrt, wodurch das Risiko von Hacks oder Fehlmanagement sinkt. Ein Swap wird dadurch jedoch nicht automatisch privat. Transaktionen auf Non-Custodial-Börsen nutzen oft Smart Contracts, die öffentlich sind, und der von dir verwendete Dienst kann weiterhin deine Adressen und Verbindungsdaten sehen.

Ein entscheidender Vorteil von Non-Custodial-Kryptowährungsbörsen liegt in der größeren Kontrolle, die sie Nutzern über ihre Vermögenswerte geben. Da diese Börsen die Vermögenswerte nicht verwahren, genießen Nutzer vollständiges Eigentum und volle Verfügungsgewalt über ihre digitalen Währungen.

### **Non-Custodial-Börsen vs. Custodial-Börsen**

**#1 Sicherheit**: Non-Custodial-Börsen machen es unnötig, Gelder auf einem zentralen Börsenkonto zu halten. Nutzer behalten die Kontrolle über ihre privaten Schlüssel, wodurch das Risiko von Hacks, Insiderangriffen und Plattformausfällen reduziert wird, die bei Custodial-Börsen auftreten können. Cross-Chain-Swaps können Gelder während der Abwicklung des Handels dennoch kurzzeitig an einer Einzahlungsadresse oder in einer Bridge halten.

**#2 Datenschutz**: Non-Custodial-Swaps benötigen üblicherweise kein Börsenkonto, sodass du dich oft nicht mit einer E-Mail-Adresse oder einem Ausweis anmelden musst. Das ist nicht dasselbe wie Anonymität. Die Einzahlung, die du im Quellnetzwerk sendest (beispielsweise Solana oder Ethereum), ist auf dieser Chain öffentlich, und der Dienst kann weiterhin deine Wallet-Adressen, IP-Adresse und Swap-Details sehen. Der Datenschutz auf der Zcash-Seite hängt davon ab, wo dein ZEC landet (siehe unten).

**#3 Dezentralisierung**: Non-Custodial-Börsen entsprechen stärker dem dezentralisierten Ethos von Kryptowährungen. Nutzer verfügen über mehr Autonomie und Kontrolle über ihre Handelsaktivitäten, im Einklang mit den umfassenderen Prinzipien der Blockchain-Technologie.

Bei Custodial-Börsen ist der Grad der Dezentralisierung in den meisten zentralisierten Börsen oft recht gering, wodurch das Börsenteam oder Verantwortliche Nutzerdaten beziehungsweise -informationen auf der Börse verwalten.

**#4 Anpassungsfähigkeit an sich ändernde Vorschriften**: Non-Custodial-Börsen sind oft anpassungsfähiger an sich ändernde regulatorische Rahmenbedingungen. Da sie keine Nutzergelder halten, haben sie im Vergleich zu Custodial-Börsen möglicherweise weniger Compliance-Herausforderungen.

**#5 Innovation und Experimentieren**: Non-Custodial-Börsen fördern im Kryptobereich häufig Innovationen. Sie begünstigen die Entwicklung dezentraler Technologien wie Automated Market Makers (AMMs) und Anwendungen für dezentrale Finanzen (DeFi).

**#6 Globale Zugänglichkeit**: Non-Custodial-Börsen bieten Nutzern weltweit oft Zugang zu Kryptowährungen, einschließlich in Regionen, in denen regulatorische Hürden die Verfügbarkeit von Custodial-Börsendiensten einschränken könnten.

**#7 Keine KYC-Anforderungen**: Viele Non-Custodial-Börsen verlangen nicht im Voraus Identitätsdokumente. Die meisten prüfen Wallet-Adressen dennoch anhand von Compliance-Datenbanken, und ein Swap kann verzögert, blockiert oder abgelehnt werden, falls etwas markiert wird. Prüfe die Bedingungen des Dienstes, bevor du dich darauf verlässt.

### **Was Zcash Schützt und Was Nicht**

Der Datenschutz von Zcash beruht auf abgeschirmten Adressen. Wenn sich ZEC zwischen abgeschirmten Adressen bewegt, werden Sender, Empfänger, Betrag und Memo auf der Zcash-Chain verschlüsselt. Siehe [Abgeschirmte Pools](/using-zcash/shielded-pools) für eine Erklärung der Funktionsweise.

Ein Swap besteht aus Teilen, die Zcash nicht verbergen kann:

- **Das Quellnetzwerk.** Gelder, die du von Solana, Ethereum oder einer anderen öffentlichen Chain sendest, sind auf dieser Chain sichtbar, einschließlich deiner Adresse und des Betrags.
- **Die Empfangsadresse.** Einige Swap-Routen liefern ZEC an eine transparente Adresse. Beispielsweise führt Near Intents ZEC als unterstützt für [nur transparente Adressen](https://docs.near-intents.org/resources/chain-support) auf. ZEC, das an eine transparente Adresse (t1 oder t3) gesendet wird, ist öffentlich, ähnlich wie Bitcoin. Eine spätere Abschirmung schützt, was du danach tust, aber die eingehende Übertragung und die Abschirmungstransaktion bleiben sichtbar.
- **Der Dienst.** Die App und jeder Routing-Dienst sehen die Adressen und Beträge, die du ihnen gibst, sowie Verbindungsdaten wie deine IP-Adresse.

Sende das ZEC an eine Wallet, die du kontrollierst, und schirme es ab, bevor du es ausgibst. [ZEC privat verwenden](/guides/using-zec-privately) behandelt die nächsten Schritte.

### **Wer an einem Swap beteiligt ist**

Betrachte als Beispiel einen Swap, der über den Near Intents 1Click-Dienst weitergeleitet wird. Seine [API-Bedingungen](https://docs.near-intents.org/security-compliance/terms-of-service) behandeln diese als getrennte Bestandteile:

- **Die Benutzeroberfläche**: die Website oder Wallet, die du verwendest. Sie kann von Intents Technology oder von einem Dritten mit eigenen Bedingungen betrieben werden.
- **1Click**: ein Routing- und Abwicklungsdienst von Intents Technology Limited. Du sendest Gelder an eine für dein Angebot erstellte Einzahlungsadresse. Laut der Dokumentation verwahrt 1Click keine Gelder, doch die Bedingungen weisen darauf hin, dass Vermögenswerte während einer laufenden Übertragung in der Bridge-Infrastruktur gehalten oder gesperrt sein können.
- **Das Protokoll**: die Near Intents Smart Contracts.
- **Solver**: unabhängige Dritte, die das Angebot erfüllen.
- **Bridges**: natives ZEC wird über die PoA Bridge übertragen, die von Intents Technology betrieben wird.

Near Intents [prüft integrierte Angebotsabläufe](https://docs.near-intents.org/security-compliance/risk-and-compliance) zudem gegen mehrere AML-Datenbanken und erklärt, dass die Abdeckung je nach Ablauf und Integration variiert. Gemäß seinen Bedingungen kann ein markierter Swap verzögert, blockiert, eingefroren oder abgelehnt werden.

### **Was du während eines Swaps preisgibst**

- Die ZEC-Adresse, die den Swap empfängt, sowie eine Rückerstattungsadresse im Quellnetzwerk.
- Den Vermögenswert und Betrag sowie die von dir gesendete Einzahlungstransaktion, die auf der Quell-Chain öffentlich ist.
- Verbindungsdaten. Laut den 1Click-Bedingungen kann Intents Technology Anfrage-Metadaten, IP-Adressen und Wallet-Adressen erfassen; die Datenschutzerklärung auf near.com führt IP-Adresse, Standort, Browser- und Geräteinformationen auf.
- Alles, was die App zusätzlich erfasst, etwa weitere verbundene Wallet-Adressen. Apps können deine Wallet auch eigenen Compliance-Prüfungen unterziehen.

### **Wo du Bedingungen und Support findest**

Bedingungen ändern sich, lies daher vor einem großen Swap die aktuellen Fassungen.

- **Beginne mit der von dir verwendeten App.** Sie ist deine wichtigste Anlaufstelle. Die 1Click-API-Bedingungen besagen, dass Intents Technology keine direkte Beziehung zu Nutzern von darauf aufgebauten Apps hat.
- **Near Intents:** die Bedingungen und Datenschutzerklärung unter near.com/terms und near.com/privacy sowie die [1Click-API-Bedingungen](https://docs.near-intents.org/security-compliance/terms-of-service) und [Risiko und Compliance](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Nachverfolgung und Support:** Suche einen Swap im [Near Intents Explorer](https://explorer.near-intents.org) oder frage im [Near Intents Telegram](https://t.me/near_intents).
- **Rückerstattungen:** Ein fehlgeschlagener Swap kann an die von dir angegebene Rückerstattungsadresse zurückgesendet werden, doch die Bedingungen von near.com besagen, dass eine Rückerstattung nicht garantiert ist. Die 1Click-Bedingungen besagen außerdem, dass Wiederherstellungsanfragen bei Nutzerfehlern unter 300 USD nicht berücksichtigt werden.

Nun wollen wir einige der zugänglichen Non-Custodial-Börsen erkunden, die den Handel mit Zcash ermöglichen. Die Nutzung dieser Plattformen bietet dir eine bequeme Möglichkeit, weitere Zcash-Coins zu erwerben.

### **Zusammenfassung**

Non-Custodial-Börsen oder DEXs ermöglichen dir den Handel aus deiner eigenen Wallet heraus, während du die Kontrolle über deine privaten Schlüssel behältst. Das verbessert die Sicherheit, doch der Datenschutz hängt von der Route ab: Die Quell-Chain ist öffentlich, der Dienst sieht deine Adressen und Verbindungsdaten, und dein ZEC ist erst privat, sobald es sich in einer abgeschirmten Adresse befindet.

Obwohl Non-Custodial-Börsen überzeugende Vorteile bieten, ist es wichtig anzuerkennen, dass sie auch Nachteile wie mögliche Liquiditätsprobleme und eine steilere Lernkurve für weniger erfahrene Nutzer mit sich bringen können.

Wie bei jeder finanziellen Entscheidung sollten Händler ihre Prioritäten, Risikotoleranz und Vertrautheit mit der Technologie sorgfältig abwägen, bevor sie zwischen Non-Custodial- und Custodial-Börsenoptionen wählen.
