# Überblick über Finanzierung und Governance von Zcash

Zcashs On-Chain-Finanzierungsmodell, die Mechanik der Block Rewards und die Rollen der wichtigsten Organisationen

## 1. So funktionieren Zcash Block Rewards

Zcash ist eine Proof-of-Work-Kryptowährung. Jeder geminte Block verteilt seine **Blocksubvention** (die neu erzeugten ZEC) plus Transaktionsgebühren gemäß einem festen Protokoll, das durch Netzwerk-Upgrades festgelegt wird.

- **Aktuelles Modell (nach NU6 / ab November 2024)**  
  Stand April 2026 ist die Verteilung wie folgt:

| Empfänger                     | Prozentsatz | Was damit finanziert wird / Status                         |
|------------------------------|-------------|-------------------------------------------------------------|
| Miner                        | 80%         | Direkter Block Reward an Miner                              |
| Zcash Community Grants (ZCG) | 8%          | Community Grants (läuft bis ca. 2028 weiter)                |
| Lockbox (protokollgesteuert) | 12%         | Mittel sammeln sich an; noch kein Ausgabemechanismus; zukünftige Community-Abstimmung erforderlich |

- **Historischer Dev Fund vor NU6 (2020–Nov. 2024)**  
  20% jeder Blocksubvention gingen direkt an Entwicklungsorganisationen:

  - 7% -> Electric Coin Company (ECC) / Bootstrap Project  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

Dieser 20%ige „Dev Fund“ wurde durch das Modell 8% ZCG + 12% Lockbox via [ZIP 1015](https://zips.z.cash/zip-1015) ersetzt.

### Vorgeschlagene Weiterentwicklung: ZIP 1016 - Community- und Coinholder-Finanzierungsmodell
ZIP 1016 (vorgeschlagen im Februar 2025, Status: Proposed) führt ein stärker dezentralisiertes Finanzierungsmodell ein. Es würde:
- die 8%-Zuweisung an ZCG fortführen.
- die 12% Lockbox in einen „Coinholder-Controlled Fund“ umwandeln (gespeist aus bestehenden Lockbox-Mitteln + laufender 12%iger Blocksubvention).
- dieses Modell bis zum dritten Halving aktivieren (ungefähr 3 Jahre).
- ZEC-Coinholder dazu befähigen, vierteljährlich über Grants in einem von der Community definierten Verfahren abzustimmen (einfache Mehrheit, Mindestquorum von 420,000 ZEC).
- verlangen, dass Key-Holder Organizations (derzeit einschließlich ZF und Shielded Labs, mit Verweisen auf Bootstrap/ECC in Grant-Kontexten) Auszahlungen per Multisig verwalten, gebunden an rechtliche Vereinbarungen und Entscheidungen der Coinholder.
- alle Anforderungen aus ZIP 1015 zur Nutzung der Lockbox beibehalten (Finanzierung von Ökosystem-Grants).

Dieser Vorschlag zielt darauf ab, bei der 12%-Zuweisung von organisationsgesteuerter zu direkter Governance durch Coinholder überzugehen. Er verändert weder den ZIP-Prozess noch die Markenregeln.

## 2. Die Kernorganisationen und ihre Finanzierungsquellen

**Electric Coin Company (ECC) / Bootstrap Project**  
- Ursprüngliche Erschaffer von Zcash (2016).  
- Erhielt historisch bis November 2024 etwa 7% des Dev Fund.  
- Im Januar 2026 trat das Kernteam für Engineering und Produkt aufgrund von Governance-Streitigkeiten von Bootstrap/ECC zurück und gründete das Zcash Open Development Lab (ZODL).  
- ECC/Bootstrap erhält keine direkte Protokollfinanzierung mehr und beschäftigt auch nicht mehr das primäre Entwicklungsteam. Die Organisation ist auf Spenden, Sponsoring und ihre eigene Treasury angewiesen.  
- Hat historische Bedeutung, ist aber nicht mehr die aktive Organisation für Protokollentwicklung.  
-> Vollständiges Profil: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- Gegründet im Januar 2026 von den ursprünglichen Zcash-Protokollentwicklern (dem zentralen ECC-Engineering- und Produktteam), nachdem sie Bootstrap/ECC verlassen hatten.  
- Sammelte über 25 Millionen Dollar Seed-Finanzierung von großen Investoren ein, darunter a16z Crypto und Coinbase Ventures.  
- Das Team, bestehend aus den ursprünglichen Erfindern und Entwicklern des Zcash-Protokolls, setzt die Kernentwicklung des Protokolls, Beiträge zu ZIPs und Privacy-orientierte Tools fort, darunter die mobile Wallet Zodl (umbenannt von Zashi).  
- Keine direkte On-Chain-Protokollfinanzierung; arbeitet als VC-finanziertes unabhängiges Lab mit Fokus auf den Ausbau der Privacy-Infrastruktur von Zcash.  
-> Vollständiges Profil: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> Offizielle Website: [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- Unabhängige 501(c)(3)-Non-Profit-Organisation mit Fokus auf Infrastruktur, Node-Software, Forschung und Gesundheit des Ökosystems.  
- Erhielt historisch 5% des Dev Fund.  
- Erhält nach NU6 keine direkte Protokollfinanzierung mehr. Ist auf Spenden und Grants angewiesen.  
- Hält die Zcash-Marke (2019 von ECC gespendet) und spielt eine zentrale Rolle in der Governance.  
- Betreibt das Zcash Community Advisory Panel (ZCAP) und hilft bei der Durchführung von Community-Umfragen.  
- Agiert unter dem vorgeschlagenen ZIP 1016 als Key-Holder Organization.  
-> Vollständiges Profil: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> Offizielle Website: [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- Das Programm Zcash Community Grants finanziert unabhängige Teams und Projekte, damit sie größere laufende Entwicklung und andere Arbeiten zum öffentlichen Nutzen des Zcash-Ökosystems leisten können.  
- Über Grants entscheidet ein von der Community gewähltes Komitee.  
- Erhält weiterhin die vollen 8% der Block Rewards (nach NU6), verwaltet durch die Financial Privacy Foundation.  
- Grants werden über einen transparenten Bewerbungs- und Abstimmungsprozess vergeben, der der Community offensteht.  
-> Vollständiges Profil: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> Offizielle Website: [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- Eine auf den Cayman Islands eingetragene Non-Profit-Organisation.  
- Erhält die 8%-Zuweisung der Blocksubvention direkt aus dem Protokoll (gemäß ZIP 1015) und übernimmt die gesamte rechtliche, finanzielle und operative Verwaltung für das Programm Zcash Community Grants.  
- Stellt die Dachstruktur und administrative Unterstützung für den Betrieb von ZCG bereit, einschließlich Auszahlungen, Verträgen und Compliance.  
- ZCG arbeitet als autonome, von der Community gewählte Einheit unter dem Dach der FPF.  
-> Vollständiges Profil: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> Offizielle Website: [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- Unabhängige, spendenfinanzierte Zcash-Unterstützungsorganisation mit Sitz in der Schweiz.  
- Die erste Organisation im Zcash-Ökosystem, die nie direkte oder indirekte Finanzierung aus dem Development Fund oder aus Block Rewards erhalten hat.  
- Konzentriert sich auf Initiativen, die ZEC-Holdern zugutekommen, und priorisiert die Stimme der Holder bei der Gestaltung der Richtung von Zcash.  
- Agiert unter dem vorgeschlagenen ZIP 1016 als Key-Holder Organization für die Verwaltung des Coinholder-Controlled Fund.  
- Trägt zur Protokollentwicklung, zum ZIP-Prozess und zur Governance bei (Vertretung unter den ZIP-Editoren).  
-> Vollständiges Profil: [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> Offizielle Website: [shieldedlabs.net](https://shieldedlabs.net/)

## 3. Governance - Wie Entscheidungen getroffen werden

Die Governance von Zcash ist eine Mischung aus „On-Chain-Protokollregeln“ und „Off-Chain-sozialem Konsens“:

1. **ZIP-Prozess (Zcash Improvement Proposals)**  
   - Jede Person kann ein ZIP einreichen.  
   - Öffentliche Debatte in Foren, Discord, GitHub.  
   - ZIP-Editoren (derzeit Jack Grigg, Daira-Emma Hopwood, Kris Nuttycombe in persönlicher Eigenschaft, Arya von ZF und Vertreter von Shielded Labs) prüfen und entscheiden über die Annahme.  
   - Angenommene ZIPs werden in das nächste Netzwerk-Upgrade aufgenommen.

2. **Markenvereinbarung (2019-2024)**  
   - ECC spendete 2019 die Zcash-Marke an ZF.  
   - Die Vereinbarung verlangte ursprünglich die gegenseitige Zustimmung sowohl von ECC als auch von ZF für jedes Netzwerk-Upgrade, das ein neues Konsensprotokoll schafft.  
   - Im April 2024 kündigte ECC die Absicht zur Beendigung an; die formale Kündigungsmitteilung wurde im August 2024 ausgestellt.  
   - Seit 2025 ist ZF der alleinige Verwalter der Zcash-Marke und hat eine neue permissive Markenrichtlinie eingeführt, die die Dezentralisierung des Ökosystems widerspiegelt. Die Marke fungiert nicht mehr als Governance-Veto-Mechanismus.

3. **Zcash Community Advisory Panel (ZCAP)**  
   - Freiwilligengruppe aus Experten des Ökosystems.  
   - Wird für unverbindliche Community-Umfragen zu wichtigen Entscheidungen genutzt.

4. **On-Chain-Ratifizierung**  
   - Sobald ein Netzwerk-Upgrade ausgerollt ist, muss die Mehrheit der Hashrate des Netzwerks es übernehmen (kein Hard-Fork-Risiko, wenn Konsens erreicht wird).

5. **Zukünftige Richtung - Die Lockbox und ZIP 1016**  
   - Die Mittel der 12% Lockbox sammeln sich im Protokoll an.  
   - ZIP 1016 schlägt vor, dies in einen Coinholder-Controlled Fund mit vierteljährlicher Abstimmung der Coinholder und Multisig-Verwaltung durch Key-Holder Organizations umzuwandeln (derzeit werden ZF und Shielded Labs genannt).

## 4. Kurzübersichtstabelle - Entwicklung der Finanzierung

| Zeitraum         | Miner  | ECC/Bootstrap | ZF   | ZCG  | Lockbox | Anmerkungen                                |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020 - Nov. 2024 | 80%    | 7%            | 5%   | 8%   | -       | Klassischer Dev Fund                       |
| Nov. 2024 - jetzt | 80%   | 0%            | 0%   | 8%   | 12%     | NU6-Modell + ZCG-Verlängerung              |
| Vorgeschlagen (ZIP 1016) | 80% | 0%     | 0%   | 8%   | 12% (Coinholder-Controlled) | Bis zum 3. Halving; Abstimmung der Coinholder |

## 5. Verwandte Ressourcen

- Offizielle Erklärung zur Finanzierung -> [z.cash Abschnitt zur Netzwerkfinanzierung](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (NU6-Finanzierungsänderung) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (vorgeschlagenes Coinholder-Modell) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Portal von Zcash Community Grants -> [grants.zcashcommunity.com](https://grants.zcashcommunity.com) (oder aktuelle FPF-Website)

## 6. Lockbox-Dashboard

Das ZecHub-Dashboard zeigt den aktuellen Betrag an ZEC im Lockbox- und Coinholders-Fund [hier](https://zechub.wiki/dashboard?tab=lockbox).
