# Zaino Indexer

Zaino ist ein Indexer, der vom Zingo-Team in Rust entwickelt wurde und darauf abzielt, lightwalletd zu ersetzen und das Projekt zur Abschaffung von zcashd voranzutreiben.

Zaino bietet essenzielle Funktionen sowohl für Light Clients, wie Wallets und Anwendungen, die nicht die vollständige Blockchain-Historie benötigen, als auch für Full Clients oder Wallets. Es unterstützt außerdem Block-Explorer und gewährt Zugriff sowohl auf die finalisierte Blockchain als auch auf die nicht finalisierte Best Chain und den Mempool, die von einem Zebra- oder Zcashd-Full-Validator verwaltet werden.

## Warum ein neuer Indexer?

Der Hauptgrund ist die Vorbereitung auf die Zukunft. Zcashd und lightwalletd wurden 2016 auf Basis eines Forks des bitcoind-Codes in C plus plus entwickelt. Die Plattform und der Code, die zum Aufbau beider Dienste verwendet wurden, kommen langsam in die Jahre und werden schwierig zu skalieren, zu warten und mit modernen Funktionen zu erweitern.

Rust ist eine moderne, robuste und sichere Sprache, die es Zcash ermöglicht, für die zukünftige Entwicklung gerüstet zu sein, und neue Entwickler dazu einlädt, zahlreiche neue Funktionen im und rund um das Zcash-Ökosystem zu entwickeln.

Dennoch zielt Zaino darauf ab, soweit wie möglich abwärtskompatibel zu sein, und stellt APIs und Schnittstellen bereit, die helfen, Reibungsverluste bei der Einführung zu verringern und sicherzustellen, dass das breitere Zcash-Ökosystem von Zainos Verbesserungen profitieren kann, ohne dass umfangreiche Neuschreibungen oder steile Lernkurven erforderlich sind.

Außerdem wird Zaino es ermöglichen, die Light-Client-Funktionalität vom Full Node zu trennen – über RPC-Zugriff und eine vollständige Client-Bibliothek. Dadurch können Entwickler Zaino integrieren und direkt aus ihrer Light-Client-Anwendung auf Chain-Daten zugreifen, während die sensiblen Daten des Zebra-Nodes abgeschirmt und sicher bleiben.

## Einige Diagramme, die zeigen, wie Zaino funktioniert

### Zaino-Interne Architektur
![Zaino-Interne Architektur](https://i.ibb.co/mRTNtfy/image-2025-01-02-190143429.png)

### Zaino-Live-Service-Architektur
![Zebra-Live-Service-Architektur](https://i.ibb.co/x7dbRY8/image-2025-01-02-190349017.png)

### Zaino-Systemarchitektur
![Zaino-Systemarchitektur](https://i.ibb.co/wwL0XZv/image-2025-01-02-190448037.png)


## Wo kann ich mehr erfahren?
Du kannst mehr über den Zaino Indexer im offiziellen [Thread des Zcash Community Forum](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation/48545/38) oder auf seiner offiziellen [Github-Seite](https://github.com/zingolabs/zaino) lesen.
