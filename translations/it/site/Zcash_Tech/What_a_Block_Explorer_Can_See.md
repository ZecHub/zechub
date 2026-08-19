<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica Pagina"/>
</a>

# Cosa può vedere un block explorer su Zcash

## TL;DR

- Su Bitcoin, un block explorer mostra tutto: mittente, destinatario e importo.
- Su Zcash, questo è vero solo per l'attività trasparente (t-address).
- Un explorer può vedere il denaro entrare e uscire dal pool schermato, ma non ciò che accade al suo interno.
- Le transazioni completamente schermate (da z a z) non rivelano né il mittente, né il destinatario, né l'importo.
- Qualsiasi dato pubblico sullo "shield rate" rappresenta un valore minimo, perché l'attività totalmente privata è invisibile dall'esterno.

---

## Due tipi di indirizzo

Zcash ha due tipi di indirizzi.

Un **indirizzo trasparente** inizia con `t` e funziona come un indirizzo Bitcoin. Saldi e pagamenti sono pubblici.

Un **indirizzo schermato** inizia con `z` ed è protetto da prove a conoscenza zero. La rete può confermare che un pagamento schermato è valido senza rivelare il mittente, il destinatario o l'importo.

Poiché esistono due tipi, il valore può muoversi in quattro modi: da trasparente a trasparente (da t a t), da trasparente a schermato (da t a z, chiamato shielding), da schermato a trasparente (da z a t, chiamato deshielding) e da schermato a schermato (da z a z, completamente privato).

## Cosa può vedere un explorer

Un explorer pubblico come [Blockchair](https://blockchair.com/zcash) può leggere chiaramente:

- Qualsiasi pagamento completamente trasparente (da t a t), da un capo all'altro.
- Il denaro che entra nel pool schermato (il lato trasparente e l'importo).
- Il denaro che esce dal pool schermato (il lato trasparente e l'importo).
- Il totale di ZEC detenuto in ciascun pool schermato, che è pubblico affinché la rete possa dimostrare che non sono state create monete dal nulla.

In breve, i bordi del pool schermato sono visibili. Puoi osservare il valore entrare e uscire.

## Cosa non può vedere un explorer

Un explorer pubblico non può leggere:

- Le transazioni completamente schermate (da z a z). Mittente, destinatario e importo restano nascosti.
- Il mittente o il destinatario dietro qualsiasi pagamento schermato.
- Il saldo di un singolo indirizzo schermato.
- Cosa accade ai fondi una volta che si trovano all'interno del pool.

Se interroghi i dati grezzi, i campi del mittente e del destinatario schermati risultano vuoti. L'explorer non sta nascondendo queste informazioni per scelta. Non sono mai state presenti sulla blockchain pubblica in forma leggibile. Le informazioni sono crittografate e solo chi possiede la viewing key corretta può leggerle.

## Perché è importante

**La tua privacy deriva dalla crittografia, non dal fatto di fidarti di un'azienda.** Un fornitore di dati non può guardare dentro una transazione schermata anche se lo volesse.

**I numeri pubblici sullo shield rate sottostimano la privacy.** I ricercatori possono misurare solo ciò che attraversa il confine pubblico, quindi la reale quantità di attività privata è almeno quella che riportano, e di solito è maggiore.

**Un pool schermato più grande protegge tutti.** Più persone usano indirizzi schermati, più grande è il gruppo all'interno del quale può nascondersi ogni singolo pagamento privato. Usare un indirizzo schermato aiuta a proteggere te e chiunque altro nel pool.

## Mettilo in pratica

- Usa un wallet che utilizzi per default indirizzi schermati, come [ZODL](https://zodl.com) o [Ywallet](https://ywallet.app/).
- Quando ricevi ZEC su un indirizzo trasparente, spostali su un indirizzo schermato prima di spenderli.
- Paga verso indirizzi schermati quando puoi. Ogni pagamento trasparente è completamente pubblico; uno schermato no.

## Risorse

- [Zcash: raccomandazioni su privacy e sicurezza](https://z.cash/support/security/privacy-security-recommendations/)
- [Un ecosistema schermato (Electric Coin Company)](https://electriccoin.co/blog/shielded-ecosystem/)
- [Come funziona la tecnologia di Zcash](https://z.cash/technology/)
- [Explorer Zcash di Blockchair](https://blockchair.com/zcash)

## Pagine correlate

- [Nozioni di base su Zcash](/start-here/what-is-zec-and-zcash)
- [Wallet](/using-zcash/wallets)
- [Pool schermati](/using-zcash/shielded-pools)
- [ZK-SNARKs](/zcash-tech/zk-snarks)

---

*Se desideri aggiungere o suggerire modifiche a questa pagina del wiki, vai al [repo GitHub di ZecHub](https://github.com/ZecHub/zechub) e invia una pull request.*
