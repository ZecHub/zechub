<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exploradores de blockchain

## Introdução

No mundo tradicional dos negócios, toda transação inclui um recibo como prova de compra. Da mesma forma, no mundo blockchain, o usuário recebe um recibo digital na forma de um ID de transação para cada transação concluída. A maioria das carteiras fornece isso para você. Exploradores de blockchain são simplesmente ferramentas que permitem visualizar o que já aconteceu em uma blockchain. Eles recebem como entrada IDs de transação, endereços ou hashes de bloco e mostram visualmente o que ocorreu.

## Exemplos
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (pública): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://mainnet.zcashexplorer.app/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privada): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://mainnet.zcashexplorer.app/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Observe no Zcash como a segunda transação tem todos os detalhes importantes ocultos. Isso é importante e tem grandes implicações em um mundo digital.


## Mapas da blockchain

Então temos essa longa sequência de caracteres como recibo digital. E agora? É aqui que usamos um [explorador de blockchain](https://nym.com/blog/using-blockchain-privately), ou mapa, para nos ajudar a entender o que aconteceu na blockchain. Observe como cada chain tem sua própria versão de [explorador de blockchain](https://nym.com/blog/using-blockchain-privately) acima. É importante entender que todos esses projetos de blockchain são exemplos de software de código aberto. Ou seja, qualquer pessoa pode contribuir com o código e/ou fazer um fork dele como quiser. Com isso em mente, cada projeto se especializa em áreas diferentes e personaliza o explorador de blockchain para atender às necessidades do projeto.

### Blocos
As transações são colocadas em *blocos*. Quando um bloco é minerado/validado, todas as transações dentro dele são confirmadas e um hash de bloco é criado. Qualquer hash criado pode ser inserido em um explorador de blocos. Você já deve ter visto CEXs exigindo um certo número de *confirmações* antes de liberar seus fundos; essa é a métrica que elas usam para garantir que sua transação está 
suficientemente finalizada. Como a blockchain determina quais transações entram no próximo bloco? É um tema de pesquisa complexo, mas a maioria das chains modernas usa a ideia de *taxas* para determinar quem vai para a frente da fila. Quanto maior a taxa, maior a chance de você avançar para o início da fila.

### Endereços

Uma forma divertida de aprender visualmente sobre [exploradores de blockchain](https://nym.com/blog/using-blockchain-privately) é inserir o endereço de qualquer transação aleatória. Depois, você pode voltar no tempo e ver de onde os fundos vieram! Cada transação tem um endereço de entrada e um de saída. Com essa informação, é possível avançar e retroceder facilmente a partir de qualquer transação que tenha sido gasta. Para quem gosta de quebra-cabeças, isso é o equivalente digital de um enorme quebra-cabeça financeiro e pode ser usado para fins de transparência. Usar um explorador de blockchain não só torna isso muito mais fácil de visualizar, como *também evidencia* a necessidade de privacidade nas transações. A menos que você esteja usando Zcash blindado, você pode fazer isso com *qualquer* blockchain transparente: BTC, ETH, ATOM, DOGE, VTC etc. Esse ponto é crucial para qualquer pessoa que use a blockchain com segurança rumo a um futuro exclusivamente digital.

### Valores

Assim como os endereços acima, qualquer transação em uma blockchain pública tem os valores disponíveis publicamente, totalmente à vista. Isso inclui os valores nos endereços de entrada e de saída de qualquer transação. Uma exceção é quando você escolhe usar Zcash blindado: então todos os valores ficam ocultos. Para pequenos empresários que precisam de privacidade para um *comércio justo*, isso é uma enorme vantagem!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### O que um explorador pode e não pode ver no Zcash

#### Resumo
- Endereços transparentes (`t`) ficam totalmente visíveis em um explorador, assim como no Bitcoin
- Transações totalmente blindadas (z para z) ocultam o valor, os endereços e o memorando
- A taxa continua visível, mesmo em uma transação totalmente blindada
- A blindagem (mover de `t` para blindado) e a desblindagem (de blindado de volta para `t`) são parcialmente visíveis, porque um dos lados é transparente
- A privacidade só se mantém enquanto os fundos permanecem dentro das pools blindadas

O Zcash tem mais de um tipo de endereço, e um explorador os trata de formas muito diferentes.

Os endereços transparentes, que começam com `t`, funcionam como no Bitcoin. Um explorador mostra o remetente, o destinatário, o valor e o rastro até a origem dos fundos.

Os endereços blindados são o lado privado. Os fundos nas [pools blindadas](https://zechub.wiki/using-zcash/shielded-pools#content) Sapling ou Orchard são protegidos por provas de conhecimento zero. Consulte uma transação totalmente blindada e o explorador não conseguirá mostrar o valor, os endereços nem o memorando. Ele só pode confirmar que uma transação válida aconteceu e foi registrada em um bloco. Esse é o exemplo privado oculto mostrado perto do topo desta página.

Um detalhe continua visível mesmo em transações totalmente blindadas: a taxa. As regras de consenso do Zcash exigem que a taxa transparente seja declarada explicitamente, então um explorador sempre pode mostrá-la, mesmo quando os valores estão mascarados. Por isso, é uma boa prática usar a taxa padrão da carteira, para que sua transação não chame atenção por pagar um valor incomum.

O explorador também pode ver quando os fundos passam entre o lado transparente e o lado blindado. Mover fundos `t` para uma pool é blindar; tirá-los de volta é desblindar. Essas passagens são parcialmente visíveis porque um dos lados é transparente. Somente a atividade totalmente privada de z para z, que nunca toca um endereço `t`, mantém tudo oculto, exceto a taxa.

A lição: a privacidade depende de permanecer dentro das pools blindadas. Quando os fundos tocam um endereço `t`, essa parte do histórico deles fica tão pública quanto no Bitcoin. Para comprovar sua própria atividade blindada a alguém que você escolher, como um contador, compartilhe uma chave de visualização em vez de torná-la pública. Veja a página [Chaves de visualização](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Lista de exploradores de blocos do Zcash

- [Explorador de blocos Zcash](https://mainnet.zcashexplorer.app/)

- [3xpl](https://3xpl.com/zcash)

- [ShieldedScan](https://shieldedscan.xyz)

- [ZecBlock](https://zecblock.com/)

- [SoChain](https://sochain.com/zec) ([testnet](https://sochain.com/zectest))

- [Explorador ZecZcash](https://zeczcash.com/explorer)



### Guia visual

Aqui estão quatro bons exemplos de diferentes exploradores de blockchain:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Explorador de blocos Zcash](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
