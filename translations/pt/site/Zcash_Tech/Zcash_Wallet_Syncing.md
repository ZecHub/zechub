<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sincronização de Wallets Zcash

## TL;DR

* Como as transações protegidas Zcash ocultam os seus detalhes, um servidor não pode simplesmente consultar o saldo de uma wallet como pode fazer com moedas transparentes como Bitcoin ou Ethereum.
* As wallets ligeiras descarregam pequenos “blocos compactos” de um servidor especializado (lightwalletd) e desencriptam elas próprias os dados relevantes com as suas chaves privadas.
* Desencriptar e processar esses blocos demora tempo, pelo que as wallets utilizam métodos de sincronização mais rápidos para permitir que use os seus fundos mais cedo.
* Abordagens notáveis: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) e o proposto DAGSync.
* Estes métodos geralmente trocam memória ou capacidade de processamento adicional por uma sincronização mais rápida.

## Explicação Principal

### Como funciona a sincronização Zcash

Zcash utiliza provas de conhecimento zero para proteger os detalhes das transações contra partes não autorizadas. Esta privacidade torna a sincronização mais difícil para as wallets ligeiras, porque não armazenam a blockchain completa localmente e, em vez disso, dependem de um servidor para obter as informações necessárias. Com Bitcoin ou Ethereum, os servidores podem indexar a blockchain e devolver rapidamente os dados da conta. Mas com Zcash, o servidor não consegue ver os detalhes da transação. Então, como pode uma wallet ligeira sincronizar o seu saldo e histórico sem descarregar e desencriptar toda a blockchain por si própria?

Zcash resolve este problema combinando várias abordagens. Dispõe de um servidor especializado, lightwalletd, que filtra dados de um nó completo e mantém apenas o necessário para a identificação de transações. Estes dados chamam-se blocos compactos e são muito menores do que os blocos originais. As wallets ligeiras descarregam primeiro estes blocos compactos do servidor lightwalletd e depois desencriptam-nos com as suas chaves privadas.

Mesmo desencriptar e processar estes blocos compactos pode demorar bastante tempo, especialmente quando há muitas transações por bloco. Por isso, as wallets utilizam métodos diferentes para acelerar a sincronização e permitir que use os seus fundos o mais rapidamente possível.

## Visual / Analogia

Imagine a blockchain como uma enorme sala de correio cheia de caixas fechadas. Com uma moeda transparente, o funcionário da sala de correio pode ler as etiquetas e dizer-lhe instantaneamente quais caixas são suas. Com Zcash, as etiquetas estão ocultas — por isso, a sua wallet tem de pegar nas chaves e verificar discretamente as caixas para encontrar aquelas que consegue abrir. Os métodos de sincronização abaixo são estratégias diferentes para verificar essas caixas mais rapidamente.

## Análise Detalhada

### Warp Sync

Warp sync é uma funcionalidade YWallet que ignora as etapas intermédias de desencriptar e processar cada bloco compacto, avançando diretamente para o resultado final.

Para tal, utiliza matemática e criptografia para calcular o resultado final sem passar por cada etapa.

Warp sync consegue processar milhares de blocos por segundo, muito mais depressa do que o método de sincronização habitual. Isto significa que os utilizadores de YWallet podem desfrutar de um desempenho rápido e fluido, mesmo com centenas de milhares de transações e notas recebidas nas suas contas.

Além desta técnica de ignorar etapas, YWallet consegue processar vários blocos simultaneamente, distribuindo a carga pelo hardware disponível para tornar o processo ainda mais rápido.

Leia mais sobre [Warp Sync](https://ywallet.app/warp/)

> Warp sync é aqui descrito como uma técnica de sincronização. Ywallet já não é mantida e não será atualizada para Ironwood, pelo que não é uma wallet a instalar atualmente.

### Spend-before-sync

Spend-before-sync é uma nova funcionalidade do Zcash Mobile Wallet SDK V2 que permite aos utilizadores gastar fundos instantaneamente ao abrir a sua wallet, sem esperar pela sincronização completa da wallet. Esta funcionalidade acelera a descoberta do saldo disponível para gastar da wallet e melhora a experiência do utilizador.

Spend-before-sync funciona através de um algoritmo de sincronização de blocos compactos que processa blocos do servidor lightwalletd numa ordem não linear. Isto significa que, em vez de esperar que um bloco seja totalmente processado antes de avançar, as wallets podem usar um pouco mais de memória e capacidade de processamento para analisar diferentes secções da blockchain. Normalmente, analisa intervalos diferentes, procurando transações mais recentes enquanto os blocos mais antigos são descarregados e processados. Se for descoberta uma nota recente não gasta, esta fica disponível imediatamente.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Desenvolvido pela equipa Zecwallet, Blaze sync é um algoritmo de sincronização para wallets ligeiras que analisa a blockchain de trás para a frente, começando pelo bloco mais alto e mais recente e recuando.

Isto permite que a wallet encontre notas gastas antes das recebidas, enquanto disponibiliza notas anteriormente não gastas sem esperar que o processo completo de sincronização termine.

Além disso, utiliza Out-of-Order Sync ao desacoplar os componentes da sincronização entre si — descarregar blocos, realizar desencriptações experimentais e atualizar testemunhas — e processando-os em paralelo. Isto consome mais memória e recursos de CPU, mas aumenta a velocidade de sincronização em X5.

### DAGSync

DAGSync é um algoritmo de sincronização proposto que visa melhorar a experiência do utilizador de wallets protegidas Zcash, acelerando a sincronização.

Utiliza um [Grafo Acíclico Direcionado (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) para representar as dependências entre notas, testemunhas e anuladores numa wallet Zcash.

Um DAG é uma estrutura de dados composta por nós e arestas, em que cada aresta tem uma direção que indica uma relação entre dois nós. Um DAG não tem ciclos, o que significa que não há forma de partir de um nó e seguir as arestas de volta ao mesmo nó.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Implicações Práticas

Curiosamente, todos estes mecanismos visam responder às questões levantadas pela Zcash Security na sua publicação sobre [Mensagens Privadas Escaláveis](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) e à sua relação com sistemas de pagamentos privados. Alguns até dão o passo adicional de descarregar todos os dados de memorando dos servidores, exceto os dados exclusivos de um endereço, aumentando a privacidade ao custo de alguns recursos adicionais.

Além disso, a Zcash Foundation tem analisado outras alternativas para melhorar o desempenho das wallets ligeiras. É o caso de [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), uma construção que a fundação tem estudado “para determinar se oferece uma solução potencial para os recentes problemas de desempenho que afetaram os utilizadores de wallets Zcash.”

## Erros Comuns

**Assumir que o servidor lightwalletd conhece o seu saldo.** O servidor apenas fornece blocos compactos; a sua wallet desencripta-os e interpreta-os localmente com as suas próprias chaves.

**Interromper a sincronização demasiado cedo.** Alguns métodos disponibilizam fundos recentes que podem ser gastos antes de uma sincronização completa terminar, mas o histórico e as notas mais antigas podem ainda estar a ser processados.

**Comparar diretamente a sincronização Zcash com a sincronização de uma cadeia transparente.** Um processo mais lento pode ser o custo de preservar a privacidade, e não uma falha — a wallet está a fazer trabalho que, de outro modo, um servidor de moeda pública faria ao ler abertamente a sua conta.


## Páginas Relacionadas

- [Nós Lightwallet](/zcash-tech/lightwallet-nodes) — a infraestrutura lightwalletd da qual as wallets ligeiras dependem.
- [Chaves de Visualização](/zcash-tech/viewing-keys) — as chaves que as wallets utilizam para detetar e desencriptar as suas próprias notas.
- [Pepper Sync](/zcash-tech/pepper-sync) — outra abordagem à sincronização de wallets Zcash.
- [FROST](/zcash-tech/frost) — autoridade de assinatura distribuída para ZEC protegido.
