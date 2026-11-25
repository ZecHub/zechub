<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Zcash_Monetary_Policy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Politica monetaria di Zcash

## In breve

* Zcash ha un'offerta fissa di 21 milioni di ZEC, lo stesso limite massimo di Bitcoin.
* Da quando NU7 è stata attivata il 6 novembre 2026, viene creato un nuovo blocco circa ogni 25 secondi e vengono generati 0,52083333 ZEC.
* Questo equivale a circa 1.800 nuovi ZEC al giorno, la stessa quantità giornaliera di prima di NU7.
* La ricompensa di ogni blocco è suddivisa così: 80% al miner, 8% a Zcash Community Grants e 12% al lockbox.
* La ricompensa del blocco si dimezza circa ogni quattro anni. Il prossimo halving è previsto verso la fine di novembre 2028.

## Spiegazione di base

### Qual è l'economia di Zcash?

La base monetaria di Zcash è uguale all'offerta fissa di 21 milioni di unità monetarie di Bitcoin, pari a ZEC. In media ogni 25 secondi (75 secondi prima che NU7 fosse attivata il 6 novembre 2026), un nuovo [blocco](https://zcash.readthedocs.io/en/latest/rtd_pages/glossary.html#:~:text=Block,mempool%20in%20an%20unconfirmed%20state.) viene minato sulla blockchain di Zcash e una ricompensa del blocco di 0,52083333 ZEC entra in circolazione. Prima di NU7, la ricompensa era di 1,5625 ZEC per blocco; [ZIP 218](https://zips.z.cash/zip-0218) l'ha divisa per tre insieme al tempo di blocco, quindi la quantità di nuovi ZEC al giorno non è cambiata. Da NU7, i 0,52083333 ZEC vengono suddivisi così: 80% al miner (0,41666668 ZEC, più le commissioni di transazione), 8% a Zcash Community Grants (0,04166666 ZEC) e 12% al lockbox (0,06249999 ZEC), secondo [ZIP 1015](https://zips.z.cash/zip-1015).

La ricompensa del blocco si dimezza circa ogni quattro anni, finché tutti i 21 milioni di ZEC non sono in circolazione. L'inflazione di Zcash ricalca quasi perfettamente quella di Bitcoin. È importante notare che, man mano che vengono create nuove monete, l'inflazione diminuisce e a ogni halving il tasso cala in modo significativo.

## Immagine / analogia

Immagina un distributore di monete davanti a un caveau sigillato. Il caveau contiene in tutto 21 milioni di ZEC e nessuno può aggiungerne nemmeno una.

Ogni 25 secondi, il distributore lascia cadere una piccola manciata di nuove monete: 0,52083333 ZEC. Il miner che ha trovato il blocco prende l'80% della manciata. Zcash Community Grants riceve l'8%. Il restante 12% finisce nel lockbox.

Circa ogni quattro anni, la manciata si riduce a metà. Questo è l'halving.

NU7 ha aumentato di tre volte la frequenza con cui cadono le manciate e ha ridotto ciascuna manciata a un terzo. Il numero di nuove monete al giorno è rimasto invariato.

## Approfondimento

### Nuovi ZEC al giorno, era per era

Gli halving dimezzano la ricompensa per blocco. Anche i blocchi più rapidi (Blossom nel 2019, NU7 nel 2026) riducono la ricompensa per blocco insieme al tempo di blocco, lasciando invariata la quantità giornaliera.

| Periodo | Tempo di blocco | Ricompensa per blocco | Nuovi ZEC al giorno |
|:--|:--|:--|:--|
| Era di lancio, dal 2016 al 2019 | 150 secondi | 12,5 ZEC | 7.200 |
| [Blossom](/zcash-tech/blossom), da dicembre 2019 a novembre 2020 | 75 secondi | 6,25 ZEC | 7.200 |
| Primo halving ([Canopy](/zcash-tech/canopy)), da novembre 2020 a novembre 2024 | 75 secondi | 3,125 ZEC | 3.600 |
| Secondo halving ([NU6](/zcash-tech/nu6)), da novembre 2024 a novembre 2026 | 75 secondi | 1,5625 ZEC | 1.800 |
| [NU7](/zcash-tech/nu7), da novembre 2026 alla fine del 2028 | 25 secondi | 0,52083333 ZEC | 1.800 |
| Terzo halving, previsto per la fine di novembre 2028 | 25 secondi | metà della ricompensa attuale | circa 900 |

Ogni valore giornaliero è la ricompensa per blocco moltiplicata per il numero di blocchi in un giorno (86.400 secondi divisi per il tempo di blocco). I tempi effettivi dei blocchi variano leggermente, quindi l'emissione giornaliera reale oscilla un po' attorno a questi valori.

### Quando avverrà il prossimo halving

NU7 ha reso i blocchi tre volte più frequenti, quindi è cambiato il numero di blocco del prossimo halving. Il prossimo halving è previsto al blocco 6.132.390, verso la fine di novembre 2028 ([ZIP 259](https://zips.z.cash/zip-0259)). Gli articoli più vecchi indicano il blocco 4.406.400. Quel numero era corretto prima di NU7.

### Commissioni e meccanismo di sostenibilità della rete

Da NU7, il 60% delle commissioni di transazione in ogni blocco viene rimosso dalla circolazione e conservato in una riserva pubblica. A partire dal blocco 8.939.664, previsto verso febbraio 2031, ogni blocco distribuirà ai miner una parte fissa di quella riserva, in aggiunta alla normale ricompensa del blocco. Il limite di 21 milioni non cambia. La pagina [Meccanismo di sostenibilità della rete](/zcash-tech/network-sustainability-mechanism) spiega come funziona.

## Pagine correlate

- [NU7](/zcash-tech/nu7): l'aggiornamento che ha introdotto i blocchi da 25 secondi e l'attuale ricompensa del blocco.
- [Meccanismo di sostenibilità della rete](/zcash-tech/network-sustainability-mechanism): dove va il 60% delle commissioni di ogni blocco e quando torna in circolazione.
- [Fondo per lo sviluppo](/start-here/development-fund): la storia della quota della ricompensa del blocco destinata allo sviluppo.
- [Aggiornamenti di rete](/start-here/network-upgrades): ogni aggiornamento di Zcash, con date e altezze dei blocchi.
- [Zcash Community Grants](/zcash-organizations/zcash-community-grants): l'organizzazione che riceve la quota dell'8%.
- [pool di mining di Zcash](/using-zcash/zcash-mining-pools): dove la maggior parte dei miner guadagna la propria quota della ricompensa del blocco.

### Risorse

[Quali sono le dinamiche economiche di Zcash?](https://z.cash/support/faq/#:~:text=Zcash's%20monetary%20base%20is%20the,3.125%20ZEC%20comes%20into%20circulation.)

[ZIP 218: intervallo di 25 secondi tra i blocchi](https://zips.z.cash/zip-0218)

[ZIP 259: attivazione dell'aggiornamento di rete NU7](https://zips.z.cash/zip-0259)

[ZIP 1015](https://zips.z.cash/zip-1015)

**Ultimo aggiornamento:** novembre 2026
