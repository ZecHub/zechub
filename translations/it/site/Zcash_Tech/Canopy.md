<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy è stato attivato sulla mainnet di Zcash al blocco 1.046.400 (18 novembre 2020 UTC).

Cosa imparerai: come Zcash ha continuato a finanziare il proprio sviluppo dopo la fine del founders reward e come Canopy ha impostato la ripartizione dei finanziamenti su cui si basano ancora gli aggiornamenti successivi.

Canopy è il quinto aggiornamento di rete di Zcash, indicato anche come Network Upgrade 4 (NU4). È stato distribuito tramite [ZIP 251](https://zips.z.cash/zip-0251) e si è attivato al blocco mainnet 1.046.400 il 18 novembre 2020 (UTC), nello stesso momento del primo halving della block reward di Zcash. Canopy è stato principalmente un aggiornamento di governance e monetario. Ha posto fine al founders reward originale e ha avviato il nuovo Zcash Development Fund, che paga Electric Coin Company, la Zcash Foundation e i beneficiari di grant indipendenti. La politica alla base di quel fondo è nata da un lungo processo di governance della comunità nel 2019.

Perché è importante. Zcash finanzia il proprio sviluppo attraverso le block reward, perché non ha un’azienda alle spalle. Il founders reward che ha finanziato i suoi primi anni doveva terminare al primo halving. Canopy è stato il sostituto: ha destinato una quota fissa di ogni block reward a un Development Fund e ha stabilito chi lo riceve. Quel modello è stato perfezionato dagli aggiornamenti successivi, fino a [NU6.1](../zcash-tech/nu6-1).

![Prima di Canopy il founders reward finanziava lo sviluppo ed era destinato a terminare al primo halving. Dopo Canopy il Development Fund prende il 20 percento di ogni block reward e dura fino al secondo halving nel 2024](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## Il fondo di sviluppo

Canopy ha posto fine al founders reward originale e lo ha sostituito con il Zcash Development Fund. Il cambiamento è avvenuto nello stesso blocco del primo halving di Zcash, quando la block reward è scesa da 6,25 ZEC a 3,125 ZEC. Quindi i miner hanno visto la loro ricompensa dimezzarsi nello stesso giorno in cui una nuova fetta di quella ricompensa più piccola ha iniziato a fluire verso lo sviluppo.

Il fondo era previsto per durare quattro anni, da questo primo halving nel novembre 2020 fino al secondo halving nel 2024. La politica concordata è stata formalizzata in [ZIP 1014](https://zips.z.cash/zip-1014). Il meccanismo di consenso che effettivamente sposta il denaro è il funding stream: [ZIP 207](https://zips.z.cash/zip-0207) ha introdotto il metodo generale per indirizzare una parte della block subsidy a destinatari definiti, e [ZIP 214](https://zips.z.cash/zip-0214) ha stabilito le regole specifiche e gli indirizzi dei destinatari per il Development Fund.

## Come viene diviso il denaro

Il Development Fund prende il 20 percento di ogni block reward. I miner mantengono l’altro 80 percento. Quel 20 percento viene poi suddiviso in tre parti, seguendo ZIP 1014.

1. 35 percento al Bootstrap Project, l’organizzazione madre di Electric Coin Company.
2. 25 percento alla Zcash Foundation.
3. 40 percento a Major Grants, che finanzia il lavoro indipendente ed è amministrato dalla Zcash Foundation. Major Grants in seguito è diventato Zcash Community Grants (ZCG).

Misurate rispetto all’intera block reward invece che solo rispetto al fondo, queste quote corrispondono al 7 percento per Electric Coin Company, al 5 percento per la Zcash Foundation e all’8 percento per Major Grants. Entrambi i modi di descriverle indicano gli stessi numeri.

![Il Development Fund è il 20 percento di ogni block reward, suddiviso in 35 percento a Bootstrap ed Electric Coin Company, 25 percento alla Zcash Foundation e 40 percento a Major Grants](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## La modifica al pool Sprout

Canopy ha anche iniziato il ritiro del pool shielded più vecchio. Sprout è stato il primo pool shielded di Zcash, e Canopy ha iniziato a dismetterlo gradualmente tramite [ZIP 211](https://zips.z.cash/zip-0211).

Dal momento in cui Canopy si è attivato, nessun nuovo valore può essere aggiunto al pool Sprout. In termini tecnici, il campo vpub_old di ogni JoinSplit deve essere zero. I fondi già presenti in Sprout possono ancora essere prelevati, quindi nessuno resta bloccato fuori, ma da qui in avanti il pool può solo ridursi. Questo è un primo passo verso la futura dismissione del vecchio pool Sprout a favore di pool shielded più recenti.

![Prima di Canopy, il valore poteva sia entrare sia uscire dal pool Sprout. Dopo Canopy, nessun nuovo valore può entrare ma i prelievi sono ancora consentiti](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## Gli aspetti tecnici aggiuntivi

Oltre ai cambiamenti nei finanziamenti, Canopy includeva due ZIP tecniche minori. [ZIP 212](https://zips.z.cash/zip-0212) ha cambiato il modo in cui un destinatario deriva il segreto effimero Sapling, derivandolo dal testo in chiaro della nota. [ZIP 215](https://zips.z.cash/zip-0215) ha definito regole esplicite per la convalida delle firme Ed25519, così ogni nodo concorda esattamente su quali firme siano considerate valide.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Founders reward | Il modello di finanziamento originale che ha pagato lo sviluppo iniziale di Zcash, previsto per terminare al primo halving |
| Development Fund | La quota del 20 percento di ogni block reward che Canopy ha destinato allo sviluppo, fino al secondo halving |
| Block reward (subsidy) | I nuovi ZEC creati e distribuiti ogni volta che viene minato un blocco |
| Halving | L’evento programmato in cui la block reward viene dimezzata |
| Funding stream | Il meccanismo di consenso (ZIP 207) che indirizza parte della block subsidy verso indirizzi destinatari definiti |
| Sprout pool | Il pool shielded originale di Zcash, nel quale Canopy ha smesso di accettare nuovo valore |

## FAQ

Canopy cambia i miei ZEC o la mia privacy? No. Canopy riguarda il modo in cui viene finanziato lo sviluppo, oltre ad alcune regole tecniche. I tuoi saldi e le tue transazioni shielded non vengono influenzati.

Canopy ha tagliato la block reward? Canopy si è attivato nello stesso blocco del primo halving di Zcash, che ha ridotto la ricompensa da 6,25 ZEC a 3,125 ZEC. L’halving fa parte della politica monetaria di Zcash. Il compito di Canopy era decidere come utilizzare una quota di quella ricompensa più piccola.

A cosa serve il Development Fund? Finanzia le persone che costruiscono Zcash. Il denaro va a Electric Coin Company (attraverso il Bootstrap Project), alla Zcash Foundation e a Major Grants, che sostiene il lavoro indipendente.

Posso ancora usare i fondi nel pool Sprout? Sì. Puoi ancora prelevare i fondi che sono già in Sprout. Semplicemente non puoi aggiungervi nuovo valore dopo Canopy.

Il Development Fund è permanente? No. Era previsto per durare quattro anni, dal primo halving nel novembre 2020 fino al secondo halving nel 2024, dando alla comunità il tempo di vedere come funziona prima di rivalutarlo.

Come si collega Canopy a NU6 e NU6.1? Canopy ha impostato la divisione dei finanziamenti in tre parti e il meccanismo dei funding stream. Gli aggiornamenti successivi, inclusi NU6 e NU6.1, hanno rivisto e rimodellato il Development Fund costruito su quella base.

## Verifica la tua comprensione

Canopy si è attivato esattamente nello stesso blocco del primo halving di Zcash. Perché è stata scelta questa tempistica e cosa sarebbe successo al finanziamento dello sviluppo senza Canopy?

<details>
<summary>Risposta</summary>

Il founders reward originale era previsto per terminare al primo halving. Senza Canopy, tutta la block reward post-halving, più piccola, sarebbe andata ai miner, lasciando lo sviluppo senza alcun finanziamento a livello di protocollo. Canopy ha sostituito il founders reward con il Development Fund proprio in quel blocco, così il finanziamento è continuato senza interruzioni.
</details>

### Risorse

[ZIP 251: Distribuzione del Canopy Network Upgrade](https://zips.z.cash/zip-0251)

[ZIP 1014: Istituzione di un Dev Fund per ECC, ZF e Major Grants](https://zips.z.cash/zip-1014)

[ZIP 207: Funding Streams](https://zips.z.cash/zip-0207)

[ZIP 214: Regole di consenso per un Zcash Development Fund](https://zips.z.cash/zip-0214)

[ZIP 211: Disabilitazione dell’aggiunta di nuovo valore al pool di valore della chain Sprout](https://zips.z.cash/zip-0211)

[Canopy Network Upgrade](https://z.cash/upgrade/canopy/)

### Vedi anche

[Zcash Network Upgrades](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Politica monetaria di Zcash](../start-here/zcash-monetary-policy)

[Pool shielded](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Governance di Zcash](../zcash-community/zcash-governance)

---

Serie: [Indice dei Network Upgrades](../start-here/network-upgrades) · Precedente: [Heartwood](../zcash-tech/heartwood) · Successivo: [NU5](../zcash-tech/nu5)
