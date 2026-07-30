<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Sincronização de Carteiras Zcash

## Resumo

* Como as transações blindadas de Zcash ocultam seus detalhes, um servidor não pode simplesmente consultar o saldo de uma carteira da mesma forma que faz com moedas transparentes como Bitcoin ou Ethereum.
* Carteiras leves baixam pequenos “blocos compactos” de um servidor especializado (lightwalletd) e descriptografam elas mesmas os dados relevantes com suas chaves privadas.
* Descriptografar e processar esses blocos leva tempo, então as carteiras usam métodos de sincronização mais rápidos para permitir que você use seus fundos mais cedo.
* Abordagens notáveis: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) e o DAGSync proposto.
* Esses métodos geralmente trocam mais memória ou poder de processamento por uma sincronização mais rápida.

## Explicação Principal

### Como funciona a sincronização do Zcash

Zcash usa provas de conhecimento zero para blindar os detalhes das transações contra partes não autorizadas. Essa privacidade torna a sincronização mais difícil para carteiras leves, porque elas não armazenam toda a blockchain localmente e, em vez disso, dependem de um servidor para obter as informações necessárias. Com Bitcoin ou Ethereum, os servidores podem indexar a blockchain e retornar rapidamente os dados da conta. Mas com Zcash, o servidor não consegue ver os detalhes da transação. Então, como uma carteira leve pode sincronizar seu saldo e histórico sem baixar e descriptografar toda a blockchain por conta própria?

Zcash resolve esse problema combinando várias abordagens. Ele tem um servidor especializado, lightwalletd, que filtra dados de um nó completo e mantém apenas o que é necessário para a identificação de transações. Esses dados são chamados de blocos compactos, e são muito menores do que os blocos originais. As carteiras leves primeiro baixam esses blocos compactos do servidor lightwalletd e depois os descriptografam com suas chaves privadas.

Mesmo descriptografar e processar esses blocos compactos pode levar um tempo considerável, especialmente quando há muitas transações por bloco. Por isso, as carteiras usam diferentes métodos para acelerar a sincronização e permitir que você use seus fundos o mais rápido possível.

## Visual / Analogia

Pense na blockchain como uma enorme sala de correspondência cheia de caixas trancadas. Com uma moeda transparente, o funcionário da sala pode ler as etiquetas e dizer instantaneamente quais caixas são suas. Com Zcash, as etiquetas estão ocultas — então sua carteira precisa pegar suas chaves e verificar silenciosamente as caixas por conta própria para encontrar aquelas que consegue abrir. Os métodos de sincronização abaixo são diferentes estratégias para verificar essas caixas mais rapidamente.

## Análise Detalhada

### Warp Sync

Warp sync é um recurso do YWallet que pula as etapas intermediárias de descriptografar e processar cada bloco compacto, indo diretamente ao resultado final.

Para isso, ele usa matemática e criptografia para calcular o resultado final sem passar por cada etapa.

Warp sync pode processar milhares de blocos por segundo, muito mais rápido do que o método de sincronização usual. Isso significa que os usuários do YWallet podem desfrutar de um desempenho rápido e fluido, mesmo com centenas de milhares de transações e notas recebidas em suas contas.

Além dessa técnica de pular etapas, o YWallet pode processar vários blocos simultaneamente, distribuindo a carga pelo hardware disponível para tornar o processo ainda mais rápido.

Leia mais sobre [Warp Sync](https://ywallet.app/warp/)

### Spend-before-sync

Spend-before-sync é um novo recurso no Zcash Mobile Wallet SDK V2 que permite que os usuários gastem fundos instantaneamente ao abrir sua carteira, sem esperar pela sincronização completa da carteira. Esse recurso acelera a descoberta do saldo gastável da carteira e melhora a experiência do usuário.

Spend-before-sync funciona usando um algoritmo de sincronização de blocos compactos que processa blocos do servidor lightwalletd em uma ordem não linear. Isso significa que, em vez de esperar que um bloco seja totalmente processado antes de passar para o próximo, as carteiras podem usar um pouco mais de memória e poder de processamento para escanear diferentes seções da blockchain. Normalmente, ele escaneia diferentes intervalos, procurando transações mais recentes enquanto os blocos mais antigos são baixados e processados. Se uma nota recente e não gasta for descoberta, ela será disponibilizada imediatamente.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Desenvolvido pela equipe do Zecwallet, Blaze sync é um algoritmo de sincronização para carteiras leves que escaneia a blockchain de trás para frente, começando pelo bloco mais alto e mais recente e avançando para trás.

Isso permite que a carteira encontre notas gastas antes das recebidas, ao mesmo tempo em que disponibiliza notas anteriormente não gastas sem esperar que o processo completo de sincronização termine.

Além disso, ele usa Out-of-Order Sync ao desacoplar entre si os componentes da sincronização — baixar blocos, realizar descriptografias de teste e atualizar testemunhas — e processá-los em paralelo. Isso consome mais memória e recursos de CPU, mas aumenta a velocidade de sincronização em X5.
### DAGSync

DAGSync é um algoritmo de sincronização proposto que visa melhorar a experiência do usuário de carteiras blindadas de Zcash ao acelerar a sincronização.

Ele usa um [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) para representar as dependências entre notas, testemunhas e anuladores em uma carteira Zcash.

Um DAG é uma estrutura de dados composta por nós e arestas, em que cada aresta tem uma direção que indica uma relação entre dois nós. Um DAG não tem ciclos, o que significa que não há maneira de partir de um nó e seguir as arestas de volta ao mesmo nó.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## Implicações Práticas

Curiosamente, todos esses mecanismos buscam responder às questões levantadas pela Zcash Security em sua publicação sobre [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) e sua relação com sistemas privados de pagamento. Alguns até dão o passo extra de baixar todos os dados de memo dos servidores, exceto os dados exclusivos de um endereço, aumentando a privacidade ao custo de um pouco mais de recursos.

Além disso, a Zcash Foundation tem analisado outras alternativas para melhorar o desempenho de carteiras leves. É o caso do [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), uma construção que a fundação vem estudando “para determinar se oferece uma solução potencial para os problemas recentes de desempenho que têm afetado os usuários de carteiras Zcash.”

## Erros Comuns

**Supor que o servidor lightwalletd conhece seu saldo.** O servidor apenas entrega blocos compactos; sua carteira os descriptografa e interpreta localmente com suas próprias chaves.

**Interromper a sincronização cedo demais.** Alguns métodos tornam fundos recém-gastáveis disponíveis antes da conclusão de uma sincronização completa, mas o histórico mais antigo e as notas ainda podem estar em andamento.

**Comparar a sincronização de Zcash diretamente com a sincronização de uma cadeia transparente.** Um caminho mais lento pode ser o custo de preservar a privacidade, não uma falha — a carteira está fazendo um trabalho que, em uma moeda pública, o servidor faria lendo sua conta abertamente.


## Páginas Relacionadas

- [Nós Lightwallet](/zcash-tech/lightwallet-nodes) — a infraestrutura lightwalletd da qual as carteiras leves dependem.
- [Viewing Keys](/zcash-tech/viewing-keys) — as chaves que as carteiras usam para detectar e descriptografar suas próprias notas.
- [Pepper Sync](/zcash-tech/pepper-sync) — outra abordagem para a sincronização de carteiras Zcash.
- [FROST](/zcash-tech/frost) — autoridade de assinatura distribuída para ZEC blindado.
