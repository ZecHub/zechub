<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Exploradores de Blockchain

## Introdução

No mundo empresarial tradicional, toda transação inclui um recibo como comprovativo de compra. Da mesma forma, no mundo blockchain, um utilizador recebe um recibo digital na forma de um ID de transação para cada transação concluída. A maioria das carteiras fornece isso automaticamente. Os exploradores de blockchain são simplesmente ferramentas que permitem visualizar o que já aconteceu numa blockchain. Recebem como entrada: IDs de transação, endereços ou hashes de bloco, e mostram visualmente o que ocorreu.

## Exemplos
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (público): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privado): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Repara como, no Zcash, a segunda transação tem todos os detalhes importantes ocultos; isto é importante e tem grandes implicações num mundo digital.


## Mapas de Blockchain

Então temos esta longa sequência de caracteres como recibo digital, e agora? É aqui que usamos um [explorador de blockchain](https://nym.com/blog/using-blockchain-privately), ou mapa, para nos ajudar a entender o que aconteceu na blockchain. Repara como cada cadeia tem a sua própria versão de [explorador de blockchain](https://nym.com/blog/using-blockchain-privately) acima. É importante compreender que todos estes projetos de blockchain são exemplos de software de código aberto. Ou seja, qualquer pessoa pode contribuir para o código e/ou fazer um fork conforme preferir. Com isso em mente, cada projeto especializa-se em áreas diferentes e personaliza o explorador de blockchain para se adequar às necessidades desse projeto.

### Blocos
As transações são colocadas em *blocos*. Quando um bloco é minerado/validado, cada transação dentro desse bloco é confirmada e é criado um hash de bloco. Qualquer hash criado pode ser introduzido num explorador de blocos. Talvez já tenhas visto CEXs a exigir um certo número de *confirmações* antes de libertarem os teus fundos; essa é a métrica que utilizam para garantir que a tua transação está 
suficientemente finalizada. Como é que a blockchain determina quais transações entram no próximo bloco? É um tema de pesquisa complexo, mas a maioria das cadeias modernas usa a ideia de *taxas* para determinar quem vai para a frente da fila. Quanto mais alta a taxa, maior a probabilidade de subires para a frente da fila.

### Endereços

Uma forma divertida de aprender visualmente sobre [exploradores de blockchain](https://nym.com/blog/using-blockchain-privately) é inserir o endereço de qualquer transação aleatória. Depois podes voltar no tempo e ver de onde os fundos se originaram! Cada transação tem tanto um endereço de entrada como um de saída.  Com esta informação, é possível avançar e recuar facilmente a partir de qualquer transação que tenha sido gasta. Para quem gosta de puzzles, este é o equivalente digital de um enorme puzzle financeiro, e pode ser usado para fins de transparência. Usar um explorador de blockchain não só torna isto muito mais fácil de visualizar, como *também destaca* a necessidade de privacidade nas transações. A menos que estejas a usar Zcash shielded, podes fazer isto com *qualquer* blockchain transparente: BTC, ETH, ATOM, DOGE, VTC, etc ... . Este ponto é crítico para qualquer pessoa que utilize a blockchain de forma segura à medida que avançamos para um futuro exclusivamente digital.

### Quantias

Tal como os endereços acima, qualquer transação numa blockchain pública tem os montantes publicamente disponíveis e totalmente visíveis. Isto inclui os montantes tanto nos endereços de entrada como nos de saída de qualquer transação. Uma exceção a isto é quando escolhes usar Shielded Zcash -- nesse caso, todos os montantes ficam ocultos. Para pequenos empresários que precisam necessariamente de privacidade para um *comércio justo*, isto é uma enorme vantagem!

![quantias](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### O que um explorador pode e não pode ver no Zcash

#### TL;DR
- Os endereços transparentes (`t`) são totalmente visíveis num explorador, tal como no Bitcoin
- As transações totalmente shielded (z para z) ocultam o montante, os endereços e o memo
- A taxa continua visível, mesmo numa transação totalmente shielded
- Shielding (mover de `t` para shielded) e deshielding (de shielded de volta para `t`) são parcialmente visíveis, porque um dos lados é transparente
- A privacidade mantém-se apenas enquanto os fundos permanecem dentro das pools shielded

O Zcash tem mais de um tipo de endereço, e um explorador trata-os de forma muito diferente.

Os endereços transparentes, que começam com `t`, funcionam como no Bitcoin. Um explorador mostra o remetente, o destinatário, o montante e o rasto até à origem dos fundos.

Os endereços shielded são o lado privado. Os fundos nas [pools shielded](https://zechub.wiki/using-zcash/shielded-pools#content) Sapling ou Orchard são protegidos por provas de conhecimento zero. Ao consultar uma transação totalmente shielded, o explorador não consegue mostrar o montante, os endereços nem o memo. Só pode confirmar que uma transação válida aconteceu e foi registada num bloco. Este é o exemplo privado oculto mostrado perto do topo desta página.

Há um detalhe que continua visível mesmo em transações totalmente shielded: a taxa. As regras de consenso do Zcash exigem que a taxa transparente seja explicitamente declarada, por isso um explorador pode sempre mostrá-la, mesmo quando os montantes estão ocultos. Por essa razão, é boa prática usar a taxa padrão da carteira, para que a tua transação não se destaque por pagar um valor incomum.

O explorador também consegue ver quando os fundos passam entre os lados transparente e shielded. Mover fundos `t` para uma pool é shielding; retirá-los de volta é deshielding. Essas passagens são parcialmente visíveis porque um dos lados é transparente. Apenas a atividade totalmente privada de z para z, que nunca toca num endereço `t`, mantém tudo oculto, exceto a taxa.

A principal conclusão: a privacidade depende de permanecer dentro das pools shielded. Assim que os fundos tocam num endereço `t`, essa parte do seu histórico torna-se tão pública quanto no Bitcoin. Para provar a tua própria atividade shielded a alguém que escolhas, como um contabilista, partilha uma Viewing Key em vez de a tornar pública. Consulta a página [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Guia Visual

Aqui estão quatro bons exemplos de diferentes exploradores de blockchain:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Explorador de Blocos Zcash](https://mainnet.zcashexplorer.com)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![exploradorBitcoin](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![exploradorEth](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![exploradorZcash](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


![cosmos](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)
