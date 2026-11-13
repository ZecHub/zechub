# Zcash Überblick über Finanzierung & Governance

Das On-Chain-Finanzierungsmodell von Zcash, die Mechanik der Blockbelohnungen und die Rollen der wichtigsten Organisationen

## 1. Wie die Blockbelohnungen von Zcash funktionieren

Zcash ist eine Proof-of-Work-Kryptowährung. Jeder geminte Block verteilt seine **Block-Subvention** (die neu geschaffenen ZEC) sowie die Transaktionsgebühren nach einer festen Protokollregel, die durch Netzwerk-Upgrades festgelegt wird.

- **Aktuelles Modell (NU6.1 / ab dem 24. November 2025)**  
  Die Verteilung sieht wie folgt aus:

| Empfänger                      | Prozentsatz | Was finanziert wird / Status                                |
|--------------------------------|------------|-------------------------------------------------------------|
| Miner                          | 80%        | Direkte Blockbelohnung an die Miner                         |
| Zcash Community Grants (ZCG)   | 8%         | Community-Grants (läuft bis ca. 2028 weiter)                |
| Coinholder-Controlled Fund     | 12%        | Gespeist aus der früheren Lockbox; Coin-Inhaber stimmen über Grants ab ([ZIP 1016](https://zips.z.cash/zip-1016)) |

- **Historischer Dev Fund vor NU6 (2020 bis Nov. 2024)**  
  20% jeder Block-Subvention gingen direkt an Entwicklungsorganisationen:

  - 7% -> Electric Coin Company (ECC) / Bootstrap Project  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

Dieser 20%-„Dev Fund“ wurde durch [ZIP 1015](https://zips.z.cash/zip-1015) (NU6, November 2024) durch das Modell aus 8% für ZCG + 12% Lockbox ersetzt. Von November 2024 bis November 2025 sammelten sich die 12% in der Deferred Dev Fund Lockbox an, ohne dass sie ausgegeben werden konnten.

### Aktuelles Modell: ZIP 1016 – Community and Coinholder Funding Model
ZIP 1016 (erstellt im Februar 2025) wurde durch [NU6.1](/zcash-tech/nu6-1) bei Block 3.146.400 am 24. November 2025 im Mainnet aktiviert ([ZIP 255](https://zips.z.cash/zip-0255)). Es:
- führt die 8%-Zuteilung an ZCG fort.
- hat die 12%-Lockbox in einen „Coinholder-Controlled Fund“ umgewandelt (gespeist aus den bestehenden Lockbox-Mitteln + der laufenden 12%-Block-Subvention).
- läuft bis zum dritten Halving (der ZIP erlaubt eine Verschiebung dieses Datums, falls NU7 das Block-Timing ändert).
- ermöglicht es den Coin-Inhabern von ZEC, über Grants abzustimmen (einfache Mehrheit, mindestens 420.000 abgegebene ZEC-Stimmen).
- verlangt, dass Key-Holder-Organisationen (derzeit u. a. ZF und Shielded Labs, wobei Bootstrap/ECC im Zusammenhang mit Grants genannt werden) die Auszahlungen per Multisig verwalten, gebunden an rechtliche Vereinbarungen und die Entscheidungen der Coin-Inhaber.
- behält alle Anforderungen von ZIP 1015 zur Verwendung der Lockbox bei (Finanzierung von Ökosystem-Grants).

Dieses Modell vollzieht für die 12%-Zuteilung den Wechsel von einer Kontrolle durch Organisationen hin zu einer direkten Governance durch die Coin-Inhaber. Es ändert weder den ZIP-Prozess noch die Markenregeln.

## 2. Die Kernorganisationen & ihre Finanzierungsquellen

**Electric Coin Company (ECC) / Bootstrap Project**  
- Ursprüngliche Schöpfer von Zcash (2016).  
- Erhielt bis November 2024 historisch ca. 7% des Dev Fund.  
- Im Januar 2026 trat das zentrale Engineering- und Produktteam aufgrund von Governance-Streitigkeiten von Bootstrap/ECC zurück und gründete das Zcash Open Development Lab (ZODL).  
- ECC/Bootstrap erhält keine direkte Protokollfinanzierung mehr und beschäftigt das Haupt-Entwicklungsteam nicht mehr. Es ist auf Spenden, Sponsoring und seine eigene Treasury angewiesen.  
- Hat historische Bedeutung, ist aber nicht mehr die aktive Organisation für die Protokollentwicklung.  
-> Vollständiges Profil: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- Im Januar 2026 von den ursprünglichen Zcash-Protokollentwicklern (dem zentralen Engineering- und Produktteam von ECC) gegründet, nachdem sie Bootstrap/ECC verlassen hatten.  
- Sammelte über 25 Millionen US-Dollar an Seed-Finanzierung von großen Investoren ein, darunter a16z Crypto und Coinbase Ventures.  
- Das Team, bestehend aus den ursprünglichen Erfindern und Entwicklern des Zcash-Protokolls, setzt die Kernentwicklung des Protokolls, Beiträge zu ZIP und datenschutzorientierte Tools fort, darunter die mobile Wallet Zodl (umbenannt von Zashi).  
- Keine direkte On-Chain-Protokollfinanzierung; arbeitet als VC-finanziertes unabhängiges Lab mit Fokus auf den Ausbau der Privacy-Infrastruktur von Zcash.  
-> Vollständiges Profil: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> Offizielle Website: [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- Unabhängige gemeinnützige 501(c)(3)-Organisation mit Fokus auf Infrastruktur, Knoten-Software, Forschung und die Gesundheit des Ökosystems.  
- Erhielt historisch 5% des Dev Fund.  
- Erhält seit NU6 keine direkte Protokollfinanzierung mehr. Ist auf Spenden und Grants angewiesen.  
- Hält die Marke Zcash (2019 von ECC gespendet) und spielt eine zentrale Rolle in der Governance.  
- Betreibt das Zcash Community Advisory Panel (ZCAP) und unterstützt die Durchführung von Community-Umfragen.  
- Fungiert als Key-Holder-Organisation gemäß ZIP 1016.  
-> Vollständiges Profil: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> Offizielle Website: [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- Das Zcash Community Grants-Programm finanziert unabhängige Teams und Projekte, die umfangreiche laufende Entwicklungsarbeit und andere Arbeiten zum Gemeinwohl des Zcash-Ökosystems leisten.  
- Über Grants entscheidet ein von der Community gewähltes Komitee.  
- Erhält weiterhin die vollen 8% der Blockbelohnungen (nach NU6), verwaltet über die Financial Privacy Foundation.  
- Grants werden über ein transparentes, für die Community offenes Bewerbungs- und Abstimmungsverfahren vergeben.  
-> Vollständiges Profil: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> Offizielle Website: [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- Eine gemeinnützige Organisation mit Sitz auf den Kaimaninseln.  
- Erhält die 8%-Zuteilung der Block-Subvention direkt vom Protokoll (gemäß ZIP 1015) und übernimmt die gesamte rechtliche, finanzielle und operative Verwaltung des Zcash Community Grants-Programms.  
- Stellt die Dachstruktur und administrative Unterstützung für den Betrieb von ZCG bereit, einschließlich Auszahlungen, Verträgen und Compliance.  
- ZCG agiert als autonome, von der Community gewählte Einheit unter dem Dach der FPF.  
-> Vollständiges Profil: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> Offizielle Website: [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- Unabhängige, spendenfinanzierte Unterstützungsorganisation für Zcash mit Sitz in der Schweiz.  
- Die erste Organisation im Zcash-Ökosystem, die nie direkte oder indirekte Mittel aus dem Development Fund oder den Blockbelohnungen erhalten hat.  
- Konzentriert sich auf Initiativen, die den Inhabern von ZEC zugutekommen, und räumt der Stimme der Inhaber bei der Gestaltung der Ausrichtung von Zcash Vorrang ein.  
- Fungiert als Key-Holder-Organisation gemäß ZIP 1016 für die Verwaltung des Coinholder-Controlled Fund.  
- Trägt zur Protokollentwicklung, zum ZIP-Prozess und zur Governance bei (Vertretung unter den ZIP-Editoren).  
-> Vollständiges Profil: [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> Offizielle Website: [shieldedlabs.net](https://shieldedlabs.net/)

## 3. Governance – Wie Entscheidungen getroffen werden

Die Governance von Zcash ist eine Mischung aus „On-Chain-Protokollregeln“ und „Off-Chain-Sozialkonsens“:

1. **ZIP-Prozess (Zcash Improvement Proposals)**  
   - Jeder kann einen ZIP einreichen.  
   - Öffentliche Debatte in Foren, auf Discord und GitHub.  
   - Die aktuellen ZIP-Editoren sind Jack Grigg, Daira-Emma Hopwood und Kris Nuttycombe (als Einzelpersonen); Arya und Marek (Zcash Foundation); Mark Henderson und Sam H. Smith (Shielded Labs); Sean Bowe und Tal Derei (Project Tachyon); sowie Dev Ojha (Valar Group).
   - Die Genehmigung eines ZIP führt nicht automatisch zur Aufnahme in das nächste Netzwerk-Upgrade. Konsens-ZIPs erfordern einen Bereitstellungsplan und eine Implementierung, und ihre Regeln werden bei der festgelegten Netzwerk-Upgrade-Höhe aktiviert.

2. **Markenvereinbarung (2019–2024)**  
   - ECC spendete die Marke Zcash im Jahr 2019 an die ZF.  
   - Die Vereinbarung verlangte ursprünglich die gegenseitige Zustimmung von ECC und ZF für jedes Netzwerk-Upgrade, das ein neues Konsensprotokoll einführt.  
   - Im April 2024 kündigte ECC die Absicht zur Beendigung an; die formelle Kündigung erfolgte im August 2024.  
   - Seit 2025 ist die ZF alleinige Verwalterin der Marke Zcash und hat eine neue, großzügige Markenrichtlinie eingeführt, die die Dezentralisierung des Ökosystems widerspiegelt. Die Marke dient nicht mehr als Veto-Mechanismus in der Governance.

3. **Zcash Community Advisory Panel (ZCAP)**  
   - Ehrenamtliche Gruppe von Experten aus dem Ökosystem.  
   - Wird für unverbindliche Community-Umfragen zu wichtigen Entscheidungen genutzt.

4. **On-Chain-Ratifizierung**  
   - Netzwerk-Upgrades werden bei einer vorab festgelegten Blockhöhe aktiviert. Knoten mit kompatibler Software setzen ab dieser Höhe die neuen Konsensregeln durch. Knoten, die nicht aktualisiert werden, folgen möglicherweise weiterhin einem Konsenszweig aus der Zeit vor dem Upgrade, was zu einer Chain-Spaltung führen kann.

5. **Die Lockbox & ZIP 1016**  
   - Die 12%-Lockbox-Mittel sammelten sich von November 2024 bis November 2025 im Protokoll an.  
   - NU6.1 wandelte sie in den Coinholder-Controlled Fund um, mit Abstimmung durch die Coin-Inhaber und Multisig-Verwaltung durch Key-Holder-Organisationen (derzeit ZF und Shielded Labs genannt).

## 4. Kurzübersicht – Entwicklung der Finanzierung

| Zeitraum         | Miner  | ECC/Bootstrap | ZF   | ZCG  | Lockbox | Anmerkungen                                |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020 – Nov. 2024  | 80%    | 7%            | 5%   | 8%   | -       | Klassischer Dev Fund                       |
| Nov. 2024 – Nov. 2025 | 80% | 0%            | 0%   | 8%   | 12%     | NU6-Modell + ZCG-Verlängerung              |
| Nov. 2025 – heute (ZIP 1016) | 80% | 0%   | 0%   | 8%   | 12% (Coinholder-Controlled) | NU6.1; bis zum 3. Halving; Abstimmung durch Coin-Inhaber |

## 5. Weiterführende Ressourcen

- Offizielle Erklärung zur Finanzierung -> [Abschnitt zur Finanzierung auf z.cash/network](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (Finanzierungsänderung mit NU6) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (Coinholder-Modell, aktiv seit NU6.1) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Zcash Community Grants-Portal -> [zcashcommunitygrants.org](https://zcashcommunitygrants.org)

## 6. Lockbox-Dashboard

Das ZecHub-Dashboard zeigt den aktuellen Betrag an ZEC in der Lockbox und im Coinholders Fund [hier](https://zechub.wiki/dashboard?tab=lockbox).
