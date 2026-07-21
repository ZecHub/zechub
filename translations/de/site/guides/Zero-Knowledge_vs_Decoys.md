<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zero Knowledge vs. Decoy-basierte Systeme

„Kryptowährungen legen alle deine Ausgabenaktivitäten öffentlich offen, da es so ist, als wäre dein Bankkonto mit Twitter verbunden, und das ist ein großes Problem, das durch die Einführung von On-Chain-Privatsphäre gelöst werden muss.“ – Ian Miers auf der [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Bestimmte Krypto-Projekte haben für ihre datenschutzorientierten Ansätze Anerkennung erhalten. Zcash ist dafür bekannt, Zero Knowledge Proofs (ZK) einzusetzen, um Transaktionsbeträge und Adressen zu schützen. Monero zeichnet sich durch die Nutzung einer Decoy-basierten Verschleierung des Senders in Kombination mit anderen Verschlüsselungsschemata aus, um die Privatsphäre der Nutzer auf der Blockchain zu erreichen.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>


## Verständnis von ZK-Proofs und Decoy-basierten Systemen

Zero Knowledge Proofs sind kryptografische Systeme, die es einer Partei (dem Beweiser) erlauben, einer anderen Partei (dem Verifizierer) die Gültigkeit einer Aussage nachzuweisen, ohne *irgendwelche zugrunde liegenden Informationen über die Aussage selbst preiszugeben*. Im Kontext von Zcash werden ZK-Proofs verwendet, um die Gültigkeit einer Transaktion zu überprüfen, ohne Transaktionsdetails wie SENDER, EMPFÄNGER oder den TransaktionsBETRAG offenzulegen. 

**Dies stellt sicher, dass die Privatsphäre der Nutzer gewahrt bleibt, da die Transaktion vertraulich bleibt und dennoch validiert wird. Diese Technologie wurde entwickelt, um die Vertraulichkeit finanzieller Transaktionen im Zcash-Netzwerk sicherzustellen.**

In Decoy-basierten Systemen wie [RingCT](https://twitter.com/ZecHub/status/1636473585781948416) werden mehrere Transaktionen kombiniert, wodurch es schwierig oder herausfordernd wird, die tatsächliche Quelle und das Ziel von Geldern nachzuverfolgen. Der Algorithmus führt Decoy-Eingänge und -Ausgänge in Transaktionen ein, nutzt außerdem die Verschlüsselung der als Eingaben verwendeten Adressen und verwendet Range-Proofs, um zu validieren, dass der übertragene Betrag ausgabefähig ist. 

Dieser Ansatz verschleiert die Transaktionsspur. Die Verwendung von Decoy-Eingängen macht es für jeden, der die Blockchain analysiert, schwierig, den tatsächlichen Sender, Empfänger oder Transaktionsbetrag zu identifizieren. 

**Wichtiger Hinweis**: Diese Methode einer On-Chain-Datenschutz bewahrenden Transaktion legt dennoch ausdrücklich (verschlüsselte) Eingaben aller Nutzertransaktionen offen. Metadaten wie der *TRANSAKTIONSFLUSS* zwischen verschiedenen Nutzern im Netzwerk können weiterhin erfasst werden. Wenn ein Angreifer aktiv an der Erstellung von Transaktionen im Netzwerk teilnimmt, deanonymisiert dies effektiv die Decoy-Eingänge anderer Nutzer. 


## Vorteile von ZK gegenüber Decoy-basierten Systemen

Sowohl Zcash als auch Monero sind auf Privatsphäre ausgerichtete Kryptowährungen, aber sie erreichen Privatsphäre auf unterschiedliche Weise. 

Hier sind einige Vorteile von Zcashs Zero-Knowledge-Proofs (ZK) gegenüber Moneros Decoy-System:

1) **Selektive Offenlegung**: Mit dem Zcash-ZK-Funktionsumfang haben Nutzer die Möglichkeit, Transaktionsdetails bestimmten Parteien offenzulegen [ECC-Blog zur selektiven Offenlegung lesen](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). In Zcash ermöglichen die verschlüsselten Inhalte abgeschirmter Transaktionen Einzelpersonen, Daten aus einer bestimmten Übertragung selektiv offenzulegen. Zusätzlich kann ein Viewing Key bereitgestellt werden, um alle Transaktionen offenzulegen, die mit einer bestimmten abgeschirmten Adresse verbunden sind. Diese Funktion ermöglicht regulatorische Konformität und Prüfbarkeit, ohne die allgemeine Privatsphäre des Netzwerks zu beeinträchtigen. 

Während Moneros Decoy-Algorithmus (Ring-Signatur) hilft, Privatsphäre bereitzustellen, bietet er nicht auf dieselbe Weise *selektive* Offenlegung.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>


2) **Optionale Sichtbarkeit**: Zcash ermöglicht es Nutzern, zwischen transparenten (nicht privaten) und abgeschirmten (privaten) Transaktionen zu wählen. Das bedeutet, dass Zcash den Nutzern die Flexibilität bietet, ihre Finanzinformationen entweder privat zu halten (shielded) oder sie transparent und öffentlich verfügbar zu machen, ähnlich wie bei den meisten anderen Blockchains, wie auf der [offiziellen Zcash-Website](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/) erläutert. Diese Opt-in-Privatsphäre ermöglicht größere Flexibilität und für Unternehmen/Organisationen relevante Anwendungsfälle, da einige Transaktionen für öffentliche Prüfung weniger Privatsphäre erfordern können, während andere von erhöhter Privatsphäre profitieren.


3) **Anonymitätsmenge**: Die [Anonymitätsmenge](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/) von Zero-Knowledge-shielded-Pools umfasst alle Transaktionen, die *jemals* stattgefunden haben. Das ist deutlich größer als bei den meisten anderen On-Chain-Techniken zur Erreichung von Nicht-Verknüpfbarkeit von Transaktionen. Hinweis: Dies gilt nur für Transaktionen innerhalb desselben shielded Pools.

Die Verwendung von Decoys erhöht zwar die Anonymitätsmenge. Dieser Ansatz hängt jedoch vollständig von der Anzahl der *echten* Nutzer im Netzwerk ab. 

4) **Kein Trusted Setup**: Das Setup von Zcashs Sprout und Sapling nutzte eine Mehrparteienberechnung, die als „Trusted Setup Ceremony“ bekannt ist. Das jüngste NU5-Upgrade erforderte kein Vertrauen in die Integrität des Setups des Zero-Knowledge-Circuits. [ECC-Blog zu NU5 lesen](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Datenschutz**: Die in den shielded Pools von Zcash verwendete [zk-SNARK-Technologie](https://wiki.zechub.xyz/zcash-technology) ermöglicht eine deutlich verbesserte Sicherheit für Nutzer. Die Verringerung des Metadaten-Lecks On-Chain bedeutet, dass Nutzer vor Angreifern wie potenziellen Hackern oder repressiven staatlichen Stellen geschützt sind. 

Es gibt eine Reihe von Fällen, in denen Fehler im Decoy-Auswahlalgorithmus von Monero identifiziert wurden. Diese Fehler hatten laut einem Bericht von [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero) das Potenzial, Ausgaben von Nutzern offenzulegen. 


Zusammenfassend ist das, was wirklich am wichtigsten ist, die Preisgabe von Nutzerinformationen und Daten zu reduzieren oder zu beseitigen, wie von Zooko in der [Orchid (priv8) AMA-Live-Session](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) erklärt wurde. 


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>


____

***Referenzlinks***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
