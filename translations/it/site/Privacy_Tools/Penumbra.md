# Penumbra 

Penumbra è una rete layer 1 completamente schermata, proof-of-stake e decentralizzata, nonché un exchange decentralizzato nell'ecosistema di Cosmos. La sua pool schermata interchain può detenere asset provenienti da chain connesse tramite IBC. Gli utenti possono trasferire, fare staking, scambiare e fornire liquidità all'interno di Penumbra senza pubblicare i saldi dei singoli account né collegare tali azioni alla propria identità. Ciò non significa che ogni dato della rete o del DEX sia privato.

![image.png](/content-images/_unavailable.svg)

## Tecnologia utilizzata nell'IBC di Penumbra 

Integrazione IBC: il protocollo Inter-Blockchain Communication (IBC) collega Penumbra ad altre chain abilitate a IBC. Un trasferimento IBC in entrata scherma i fondi quando entrano in Penumbra; un trasferimento in uscita li rende non schermati quando ne escono. L'attività su una chain controparte trasparente rimane pubblica, compreso l'indirizzo di destinazione di un deposito in entrata. Il [confine della privacy segue il confine di IBC](https://guide.penumbra.zone/overview/interchain-privacy).

Prove a conoscenza zero (ZKP): Penumbra utilizza prove a conoscenza zero lato client per dimostrare che gli aggiornamenti dello stato crittografati sono validi senza pubblicare i dati privati delle transazioni di un utente. I portafogli scansionano e decrittano localmente i dati visibili; un nodo pubblico non può semplicemente restituire il saldo privato di un utente.

![image.png](/content-images/_unavailable.svg)

Exchange decentralizzato con privacy: Penumbra include un DEX per negoziare asset nella sua pool schermata. I risultati dei singoli scambi sono privati, mentre i risultati dell'esecuzione in batch e le posizioni di liquidità anonime sono pubblici. Queste distinzioni sono importanti per descrivere ciò che l'exchange nasconde.

## Casi d'uso

Transazioni sicure: i trasferimenti all'interno della pool schermata di Penumbra proteggono mittente, destinatario, importo e tipo di asset. Gli utenti possono divulgare selettivamente l'attività a terze parti autorizzate. Condividere solo un indirizzo di ricezione non espone i saldi del suo proprietario. Queste proprietà non si estendono all'attività pubblica su un'altra chain dopo il prelievo dei fondi.

Staking: il token nativo per lo staking di Penumbra è **UM**. Delegare UM a un validatore restituisce token di delega che rappresentano quote nella pool di delega di quel validatore. Lo stake totale nella pool di ciascun validatore è pubblico, mentre le singole deleghe sono anonime. L'annullamento della delega crea prima token di unbonding specifici del validatore, che rimangono esposti allo slashing fino al termine del ritardo di unbonding. Consulta la [guida ufficiale allo staking schermato](https://guide.penumbra.zone/overview/staking).

Scambi di token: gli intenti di scambio sono raggruppati per coppia di trading ed eseguiti in batch alla fine di ciascun blocco. Ciò elimina l'ordinamento intra-blocco degli intenti di scambio come leva per i trader; è un meccanismo specifico, non una garanzia che non possa esistere alcuna forma di MEV. I risultati dei batch vengono scritti nello stato pubblico della chain e gli utenti rivendicano privatamente la propria quota del risultato nella pool schermata. La [guida al DEX](https://guide.penumbra.zone/overview/dex) descrive l'esecuzione in batch e l'arbitraggio automatico del protocollo.

Market making: i fornitori di liquidità creano posizioni anonime di liquidità concentrata. La liquidità e le funzioni di trading delle posizioni sono pubbliche, ma non sono collegate all'identità del fornitore.
