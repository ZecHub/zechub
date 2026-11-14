<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Sincronização de carteiras Zcash

## TL;DR

* Como as transações blindadas do Zcash ocultam seus detalhes, um servidor não consegue simplesmente consultar o saldo de uma carteira, como faz com moedas transparentes como Bitcoin ou Ethereum.
* As carteiras leves baixam pequenos "blocos compactos" de um servidor especializado (lightwalletd) e descriptografam elas mesmas os dados relevantes com suas chaves privadas.
* Descriptografar e processar esses blocos leva tempo, por isso as carteiras usam métodos de sincronização mais rápidos para que você possa usar seus fundos mais cedo.
* Abordagens notáveis: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) e o DAGSync, ainda em proposta.
* Esses métodos geralmente trocam memória ou poder de processamento extra por uma sincronização mais rápida.

## Explicação principal

### Como funciona a sincronização no Zcash

O Zcash usa provas de conhecimento zero para blindar os detalhes das transações contra partes não autorizadas. Essa privacidade torna a sincronização mais difícil para as carteiras leves, porque elas não armazenam a blockchain completa localmente e dependem de um servidor para obter as informações necessárias. Com Bitcoin ou Ethereum, os servidores podem indexar a blockchain e retornar rapidamente os dados da conta. Mas, com o Zcash, o servidor não consegue ver os detalhes das transações. Então, como uma carteira leve pode sincronizar seu saldo e histórico sem baixar e descriptografar ela mesma a blockchain inteira?

O Zcash resolve esse problema combinando várias abordagens. Ele tem um servidor especializado, o lightwalletd, que filtra os dados de um nó integral e mantém apenas o necessário para identificar as transações. Esses dados são chamados de blocos compactos e são muito menores que os blocos originais. As carteiras leves primeiro baixam esses blocos compactos do servidor lightwalletd e depois os descriptografam com suas chaves privadas.

Mesmo descriptografar e processar esses blocos compactos pode levar um tempo considerável, especialmente quando há muitas transações por bloco. Por isso, as carteiras usam métodos diferentes para acelerar a sincronização e permitir que você use seus fundos o quanto antes.

## Visual / analogia

Pense na blockchain como uma enorme sala de correspondência cheia de caixas trancadas. Com uma moeda transparente, o funcionário da sala consegue ler as etiquetas e dizer na hora quais caixas são suas. Com o Zcash, as etiquetas ficam ocultas — então sua carteira precisa pegar suas chaves e verificar discretamente as caixas ela mesma para encontrar as que consegue abrir. Os métodos de sincronização abaixo são estratégias diferentes para verificar essas caixas mais rapidamente.

## Aprofundamento

### Warp Sync

O Warp sync é um recurso do YWallet que pula as etapas intermediárias de descriptografar e processar cada bloco compacto, indo direto ao resultado final.

Para isso, ele usa matemática e criptografia para calcular o resultado final sem passar por cada etapa.

O Warp sync consegue processar milhares de blocos por segundo, muito mais rápido que o método de sincronização habitual. Isso significa que os usuários do YWallet podem ter um desempenho rápido e fluido, mesmo com centenas de milhares de transações e notes recebidas em suas contas.

Além dessa técnica de pular etapas, o YWallet consegue processar vários blocos simultaneamente, distribuindo a carga pelo hardware disponível para tornar o processo ainda mais rápido.

Leia mais sobre o [Warp Sync](https://ywallet.app/warp/)

> O Warp sync é descrito aqui como uma técnica de sincronização. O próprio Ywallet não recebe mais manutenção e não será atualizado para o Ironwood, portanto não é uma carteira para instalar hoje.

### Spend-before-sync

O Spend-before-sync é um novo recurso do Zcash Mobile Wallet SDK V2 que permite aos usuários gastar fundos instantaneamente ao abrir a carteira, sem esperar a sincronização completa. Esse recurso acelera a descoberta do saldo disponível para gasto da carteira e melhora a experiência do usuário.

O Spend-before-sync funciona usando um algoritmo de sincronização de blocos compactos que processa os blocos do servidor lightwalletd em ordem não linear. Isso significa que, em vez de esperar que um bloco seja totalmente processado antes de seguir adiante, as carteiras podem usar um pouco mais de memória e poder de processamento para escanear diferentes seções da blockchain. Normalmente, ele escaneia intervalos diferentes, procurando transações mais recentes enquanto os blocos mais antigos são baixados e processados. Se uma note recente e não gasta for encontrada, ela ficará disponível imediatamente.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Desenvolvido pela equipe da Zecwallet, o Blaze sync é um algoritmo de sincronização para carteiras leves que escaneia a blockchain de trás para frente, começando pelo bloco mais alto e mais recente e retrocedendo.

Isso permite que a carteira encontre as notes gastas antes das recebidas, ao mesmo tempo em que disponibiliza as notes ainda não gastas sem esperar o término do processo de sincronização completo.

Além disso, ele usa a sincronização fora de ordem, desacoplando os componentes da sincronização uns dos outros — baixar blocos, realizar descriptografias de teste e atualizar witnesses — e processando-os em paralelo. Isso consome mais memória e recursos de CPU, mas aumenta a velocidade de sincronização em 5 vezes.

### DAGSync

O DAGSync é um algoritmo de sincronização proposto que visa melhorar a experiência do usuário das carteiras blindadas do Zcash, acelerando a sincronização.

Ele usa um [Grafo Acíclico Dirigido (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) para representar as dependências entre notes, witnesses e nulificadores em uma carteira Zcash.

Um DAG é uma estrutura de dados composta por nós e arestas, em que cada aresta tem uma direção que indica uma relação entre dois nós. Um DAG não tem ciclos, ou seja, não há como partir de um nó e seguir as arestas de volta ao mesmo nó.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Implicações práticas

Curiosamente, todos esses mecanismos buscam responder às questões levantadas pela Zcash Security em seu post sobre [mensagens privadas escaláveis](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) e sua relação com sistemas de pagamentos privados. Alguns chegam a dar o passo extra de baixar todos os dados de memorandos dos servidores, exceto os dados exclusivos de um endereço, aumentando a privacidade ao custo de um pouco mais de recursos.

Além disso, a Zcash Foundation vem estudando outras alternativas para melhorar o desempenho das carteiras leves. É o caso da [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), uma construção que a fundação vem estudando "para determinar se ela oferece uma possível solução para os recentes problemas de desempenho que afetaram os usuários de carteiras Zcash."

## Erros comuns

**Presumir que o servidor lightwalletd sabe o seu saldo.** O servidor apenas entrega blocos compactos; sua carteira os descriptografa e interpreta localmente com suas próprias chaves.

**Interromper a sincronização cedo demais.** Alguns métodos disponibilizam fundos recentes para gasto antes de a sincronização completa terminar, mas o histórico e as notes mais antigas ainda podem estar em processamento.

**Comparar a sincronização do Zcash diretamente com a sincronização de chains transparentes.** Um caminho mais lento pode ser o custo de preservar a privacidade, não uma falha — a carteira está fazendo um trabalho que um servidor de moeda pública faria lendo sua conta abertamente.


## Páginas relacionadas

- [Nós de carteiras leves](/zcash-tech/lightwallet-nodes) — a infraestrutura lightwalletd da qual as carteiras leves dependem.
- [Chaves de visualização](/zcash-tech/viewing-keys) — as chaves que as carteiras usam para detectar e descriptografar suas próprias notes.
- [Pepper Sync](/zcash-tech/pepper-sync) — outra abordagem para a sincronização de carteiras Zcash.
- [FROST](/zcash-tech/frost) — autoridade de assinatura distribuída para o ZEC blindado.
