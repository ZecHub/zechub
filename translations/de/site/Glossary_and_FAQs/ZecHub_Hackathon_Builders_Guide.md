---
# ZecHub Hackathon-Builder-Guide

## Kurzfassung

- Wissen, warum du baust, bevor du Code schreibst – Nützlichkeit schlägt Komplexität
- Halte es einfach, eine kleine Idee, gut umgesetzt, schlägt eine große Idee, die unvollendet bleibt
- Lerne den Zcash-Infrastruktur-Stack früh kennen, er ist der steilste Teil des Aufstiegs
- Wenn deine App Gelder bewegt, muss sie im Mainnet funktionieren, baue im Testnet und beweise es dann im Mainnet
- Dokumentation und eine klare Demo können wichtiger sein als das Produkt selbst
- Gewinnen ist eine Startlinie, es baut deinen Ruf auf und öffnet Türen in der Community

<br/>

## Für wen ist das

- Builder, die zum ersten Mal an einem ZecHub- oder Zcash-Hackathon teilnehmen
- Entwickler aus anderen Ökosystemen, die neu bei Zcash sind
- Alle, die ein Hackathon-Projekt in etwas Dauerhaftes verwandeln wollen

<br/>

## Beginne mit dem Warum

Bevor du deinen Editor öffnest, solltest du wissen, welches Problem du löst und warum es irgendjemanden interessieren sollte. Ein guter Test ist einfach: Wenn das, was du baust, nicht existieren würde, würde es jemand vermissen? Baue etwas, das du selbst nutzen würdest. Privatsphäre ist der Grund, warum Zcash existiert, also verstehe, warum Privatsphäre für die Menschen wichtig ist, für die du baust, und lass das dann das gesamte Projekt prägen.

<br/>

## Lerne zuerst den Stack

Die häufigste Überraschung für Builder aus anderen Chains ist nicht das Programmieren, sondern die Lernkurve der Zcash-Infrastruktur. Nimm dir Zeit, zu verstehen, wie die Teile zusammenpassen, bevor du deine App entwirfst. Beginne mit dem Kern-Stack, der oft Z hoch drei genannt wird: zebrad, ein Light-Server und ein Wallet. Mach dich dann mit den Entwickler-Tools vertraut:

1. Lies die Entwicklerseite im Wiki unter [zechub.wiki/developers](https://zechub.wiki/developers), sie ist der empfohlene erste Anlaufpunkt
2. Erkunde zingolib und die zingo-cli, deren Aufrufe den Großteil dessen abdecken, was ein Projekt über die verschiedenen Tracks hinweg braucht
3. Sieh dir librustzcash und das Referenz-Wallet ZODL an, wenn du Bausteine auf niedrigerer Ebene suchst
4. Für ein FROST-Projekt nutze frostd und frost-core der Zcash Foundation von crates.io und stütze dich auf KI, um bei Definitionen zu helfen, auch wenn die sichere Nutzung von FROST weiterhin echten Aufwand und Zeit erfordert

<br/>

## Verstehe, was Mainnet bedeutet

Mehrere Tracks verlangen, dass deine App mit dem Zcash Mainnet interagiert. In der Praxis bedeutet das, dass dein Projekt oder jemand, der es benutzt, einschließlich eines KI-Agenten, echte Gelder im Mainnet sendet oder empfängt oder die Tools baut und verbessert, die dies möglich machen. Wenn deine App Transaktionen ausführt, musst du sie in deiner Einreichung im Mainnet demonstrieren.

Baue während der Entwicklung im Testnet. Aktivität im Mainnet kostet echtes ZEC und wird mit der Zeit nur teurer, daher ist das Testnet der empfohlene Ort zum Iterieren. Wechsle für den finalen Nachweis ins Mainnet. Behalte beim Entwurf deines Ablaufs ein Detail im Kopf: Wenn Gelder an einer Shielded Address ankommen, muss dein Wallet sie erst scannen und finden, bevor sie ausgegeben werden können, und dieser Scan braucht etwas Zeit. Plane diese kurze Wartezeit in deine App ein, statt davon auszugehen, dass eingehende Gelder sofort nutzbar sind.

<br/>

## Halte es einfach

Eine einfache, gut umgesetzte Idee hat schon oft eine komplexe geschlagen. Juroren haben erlebt, wie ein einfaches Konzept bei derselben Veranstaltung gegen ein technisch ehrgeizigeres Projekt gewonnen hat, weil es ein reales Problem löste und leicht zu verstehen war. Nimm dir weniger vor, als du glaubst fertigstellen zu können. Übersehene Details, zu große Planung und ausgelassene Recherche sind die Fehler, die Builder Preise kosten. Mach dein Projekt leicht verständlich und leicht ausführbar, vom Grundkonzept bis zum ersten Befehl.

<br/>

## Gewinne die ersten 30 Sekunden

Reviewer gewinnen schnell einen starken Eindruck, daher haben Präsentation, Thema und Visuals neben der Neuartigkeit deiner Lösung echtes Gewicht. Dokumentation und eine klare Demo sind keine Nebensache. Deine Idee zu vermitteln ist manchmal wichtiger als die Idee selbst, denn wenn niemand versteht, was du gebaut hast, kann es nicht erfolgreich sein. Die Bewertung balanciert in der Regel technische Tiefe, Benutzererfahrung, Originalität und praktischen Nutzen, und starke Dokumentation hebt all diese Punkte an.

<br/>

## Sieh dir die schwierigeren und dünner besetzten Tracks an

Wenn du weniger überlaufene Konkurrenz willst, haben die schwierigeren Tracks oft weniger Einreichungen, einfach weil sich weniger Leute daran wagen. Der Accounting-Track ist eine gute Option für Einsteiger, die On-Chain-Transaktionsarbeit vermeiden wollen. FROST ist leistungsstark und wird zu wenig genutzt, und es bietet eine starke Grundlage für ein Projekt. Die Community schreibt nicht vor, was gebaut werden soll, daher ist es ein kluger Zug, auf einem leistungsfähigen Tool aufzubauen, das das Ökosystem bereits hat, statt bei null anzufangen.

<br/>

## Nach dem Hackathon

Gewinnen ist nicht das Ende des Weges. Gewinnen stärkt dein Portfolio und deinen Ruf, öffnet Türen in der Community und kann über Vorschläge zu Finanzierung führen.

1. Entwickle ein starkes Projekt als Vorschlag für die ZecHub DAO oder Zcash Community Grants weiter, mit einer Roadmap, Meilensteinen und einer Begründung für das Budget
2. Bleibe in der Community im Forum, auf Discord und auf X aktiv
3. Nimm an den Arborist Calls teil, veröffentliche Ideen und bitte um Feedback
4. Baue weiter, auch wenn du nicht gewinnst, und halte Ausschau nach dem nächsten Hackathon

<br/>

## Verwandte Seiten

- [Entwicklerressourcen](https://zechub.wiki/developers) - der erste Anlaufpunkt für Zcash-Builder
- [Zebra Full Node](https://zechub.wiki/zcash-tech/zebra-full-node) - der Knoten an der Basis des Stacks
- [FROST](https://zechub.wiki/zcash-tech/frost) - Threshold-Signaturen für fortgeschrittene Projekte

<br/>

<small>Dieser Leitfaden wurde durch Erkenntnisse der ZecHub-Kernmitwirkenden squirrel, Dismad und Tron geprägt.</small>
