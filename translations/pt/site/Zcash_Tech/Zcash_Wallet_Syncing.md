<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sincronização de carteiras Zcash

## TL;DR

* Como as transações blindadas do Zcash ocultam seus detalhes, um servidor não pode simplesmente consultar o saldo de uma carteira como pode fazer com moedas transparentes como Bitcoin ou Ethereum.
* As carteiras leves baixam pequenos “blocos compactos” de um servidor especializado (lightwalletd) e descriptografam os dados relevantes por conta própria com suas chaves privadas.
* Descriptografar e processar esses blocos leva tempo, por isso as carteiras usam métodos de sincronização mais rápidos para permitir que você use seus fundos mais cedo.
* Abordagens notáveis: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) e o proposto DAGSync.
* Esses métodos geralmente trocam memória ou capacidade de processamento adicional por uma sincronização mais rápida.

## Explicação principal

### Como funciona a sincronização do Zcash

O Zcash usa provas de conhecimento zero para blindar os detalhes das transações contra partes não autorizadas. Essa privacidade torna a sincronização mais difícil para carteiras leves, porque elas não armazenam toda a blockchain localmente e, em vez disso, dependem de um servidor para obter as informações necessárias. Com Bitcoin ou Ethereum, os servidores podem indexar a blockchain e retornar rapidamente os dados da conta. Mas com o Zcash, o servidor não consegue ver os detalhes da transação. Então, como uma carteira leve pode sincronizar seu saldo e histórico sem baixar e descriptografar toda a blockchain por conta própria?

O Zcash resolve esse problema combinando várias abordagens. Ele dispõe de um servidor especializado, lightwalletd, que filtra dados de um nó integral e mantém apenas o necessário para a identificação de transações. Esses dados são chamados de blocos compactos e são muito menores do que os blocos originais. As carteiras leves primeiro baixam esses blocos compactos do servidor lightwalletd e depois os descriptografam com suas chaves privadas.

Mesmo descriptografar e processar esses blocos compactos pode levar bastante tempo, especialmente quando há muitas transações por bloco. Por isso, as carteiras usam métodos diferentes para acelerar a sincronização e permitir que você use seus fundos o mais rapidamente possível.

## Visual / analogia

Imagine a blockchain como uma enorme sala de correio cheia de caixas fechadas. Com uma moeda transparente, o funcionário da sala de correio pode ler as etiquetas e dizer instantaneamente quais caixas são suas. Com o Zcash, as etiquetas estão ocultas — por isso, sua carteira precisa pegar suas chaves e verificar discretamente as caixas para encontrar aquelas que consegue abrir. Os métodos de sincronização abaixo são estratégias diferentes para verificar essas caixas mais rapidamente.

## Análise detalhada

### Warp Sync

Warp sync é uma funcionalidade da YWallet que ignora as etapas intermediárias de descriptografar e processar cada bloco compacto, avançando diretamente para o resultado final.

Para isso, usa matemática e criptografia para calcular o resultado final sem passar por cada etapa.

Warp sync consegue processar milhares de blocos por segundo, muito mais rápido do que o método de sincronização habitual. Isso significa que os usuários da YWallet podem desfrutar de um desempenho rápido e fluido, mesmo com centenas de milhares de transações e notes recebidas em suas contas.

Além dessa técnica de ignorar etapas, a YWallet consegue processar vários blocos simultaneamente, distribuindo a carga pelo hardware disponível para tornar o processo ainda mais rápido.

Leia mais sobre [Warp Sync](https://ywallet.app/warp/)

> Warp sync é descrito aqui como uma técnica de sincronização. A Ywallet não é mais mantida e não será atualizada para Ironwood, portanto não é uma carteira para instalar atualmente.

### Spend-before-sync

Spend-before-sync é uma nova funcionalidade do Zcash Mobile Wallet SDK V2 que permite aos usuários gastar fundos instantaneamente ao abrir sua carteira, sem esperar pela sincronização completa da carteira. Essa funcionalidade acelera a descoberta do saldo disponível para gastar da carteira e melhora a experiência do usuário.

Spend-before-sync funciona por meio de um algoritmo de sincronização de blocos compactos que processa blocos do servidor lightwalletd em uma ordem não linear. Isso significa que, em vez de esperar que um bloco seja totalmente processado antes de avançar, as carteiras podem usar um pouco mais de memória e capacidade de processamento para analisar diferentes seções da blockchain. Normalmente, ele analisa intervalos diferentes, procurando transações mais recentes enquanto os blocos mais antigos são baixados e processados. Se uma note recente não gasta for descoberta, ela será disponibilizada imediatamente.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Desenvolvido pela equipe da Zecwallet, Blaze sync é um algoritmo de sincronização para carteiras leves que analisa a blockchain de trás para frente, começando pelo bloco mais alto e mais recente e recuando.

Isso permite que a carteira encontre notes gastas antes das recebidas, enquanto disponibiliza notes que antes não eram gastas sem esperar que o processo completo de sincronização termine.

Além disso, usa Out-of-Order Sync ao desacoplar os componentes da sincronização entre si — baixar blocos, realizar descriptografias experimentais e atualizar testemunhas — e processá-los em paralelo. Isso consome mais memória e recursos de CPU, mas aumenta a velocidade de sincronização em X5.

### DAGSync

DAGSync é um algoritmo de sincronização proposto que visa melhorar a experiência do usuário de carteiras blindadas do Zcash, acelerando a sincronização.

Usa um [Grafo Acíclico Direcionado (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) para representar as dependências entre notes, testemunhas e nulificadores em uma carteira do Zcash.

Um DAG é uma estrutura de dados composta por nós e arestas, em que cada aresta tem uma direção que indica uma relação entre dois nós. Um DAG não tem ciclos, o que significa que não há como partir de um nó e seguir as arestas de volta ao mesmo nó.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Implicações práticas

Curiosamente, todos esses mecanismos visam responder às questões levantadas pela Zcash Security em sua publicação sobre [Mensagens privadas escaláveis](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) e sua relação com sistemas privados de pagamento. Alguns até dão o passo adicional de baixar todos os dados de memorando dos servidores, exceto os dados exclusivos de um endereço, aumentando a privacidade ao custo de alguns recursos adicionais.

Além disso, a Zcash Foundation tem analisado outras alternativas para melhorar o desempenho das carteiras leves. É o caso de [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), uma construção que a fundação tem estudado “para determinar se oferece uma solução potencial para os recentes problemas de desempenho que afetaram os usuários de carteiras do Zcash.”

## Erros comuns

**Presumir que o servidor lightwalletd conhece seu saldo.** O servidor apenas fornece blocos compactos; sua carteira os descriptografa e interpreta localmente com suas próprias chaves.

**Interromper a sincronização cedo demais.** Alguns métodos disponibilizam fundos recentes que podem ser gastos antes que uma sincronização completa termine, mas o histórico e as notes mais antigas ainda podem estar sendo processados.

**Comparar diretamente a sincronização do Zcash com a sincronização de uma chain transparente.** Um processo mais lento pode ser o custo de preservar a privacidade, e não uma falha — a carteira está realizando um trabalho que, de outro modo, um servidor de moeda pública faria ao ler sua conta abertamente.


## Páginas relacionadas

- [Nós Lightwallet](/zcash-tech/lightwallet-nodes) — a infraestrutura lightwalletd da qual as carteiras leves dependem.
- [Chaves de visualização](/zcash-tech/viewing-keys) — as chaves que as carteiras usam para detectar e descriptografar suas próprias notes.
- [Pepper Sync](/zcash-tech/pepper-sync) — outra abordagem à sincronização de carteiras do Zcash.
- [FROST](/zcash-tech/frost) — autoridade de assinatura distribuída para ZEC blindado.
