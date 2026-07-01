<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Sincronização de Carteiras Zcash

### Como funciona a sincronização do Zcash

Para entender como o warp sync funciona, deixe-me explicar um pouco mais sobre o Zcash. É uma criptomoeda orientada à privacidade que usa uma tecnologia chamada provas de conhecimento zero para proteger os detalhes das transações de qualquer pessoa que não esteja autorizada a vê-los. Isso significa que as transações registradas na blockchain são criptografadas ou ocultadas, e apenas o remetente e o destinatário podem descriptografá-las com suas chaves privadas.

No entanto, isso também representa um desafio para as carteiras leves, que são aplicações que não armazenam todos os dados da blockchain no dispositivo, mas dependem de um servidor para lhes fornecer as informações necessárias. Com moedas sem foco em privacidade, como Bitcoin ou Ethereum, o servidor pode indexar facilmente a blockchain e manter um banco de dados de cada conta. Quando uma carteira leve solicita os dados específicos de sua conta, o servidor pode retorná-los rapidamente.

Mas com o Zcash, o servidor não pode fazer isso, porque não consegue ver os detalhes das transações. Então, como uma carteira leve pode sincronizar o saldo de sua conta e o histórico de transações sem baixar e descriptografar por conta própria todos os dados da blockchain?

O Zcash resolve esse problema usando uma abordagem mista. Ele possui um servidor especializado chamado lightwalletd que filtra os dados de um nó completo e mantém apenas os dados necessários para a identificação de transações. Esses dados são chamados de blocos compactos, e são muito menores do que os blocos originais. As carteiras leves precisam apenas baixar esses blocos compactos do servidor lightwalletd e então descriptografá-los por conta própria com suas chaves privadas.

No entanto, mesmo descriptografar e processar esses blocos compactos pode levar um tempo significativo, especialmente se houver muitas transações em cada bloco. Por isso, cada carteira tem seu próprio método alternativo para acelerar o processo de sincronização para que você possa usar seus fundos o mais rápido possível.

### Warp Sync
Warp sync é um recurso do YWallet que permite pular as etapas intermediárias de descriptografar e processar cada bloco compacto e, em vez disso, ir diretamente ao resultado final.

Para fazer isso, ele usa matemática e criptografia inteligentes para calcular o resultado final sem precisar passar por cada etapa. 

O warp sync pode processar milhares de blocos por segundo, muito mais rápido do que o método usual de sincronização. Isso significa que os usuários do YWallet podem desfrutar de um desempenho rápido e fluido, mesmo com centenas de milhares de transações e notas recebidas em suas contas.

Além dessa técnica de **pular etapas**, o YWallet também é capaz de processar vários blocos ao mesmo tempo, distribuindo a carga pelo hardware disponível e tornando o processo ainda mais rápido.

Leia mais sobre [Warp Sync](https://ywallet.app/warp/)

### Gastar antes da sincronização
Gastar antes da sincronização é um novo recurso implementado no Zcash Mobile Wallet SDK V2, que permite aos usuários gastar fundos instantaneamente ao abrir sua carteira, sem precisar esperar por uma sincronização completa da carteira. Esse recurso acelera a descoberta do saldo disponível para gasto da carteira e melhora a experiência do usuário.

Gastar antes da sincronização funciona usando um algoritmo de sincronização de blocos compactos que processa blocos do servidor lightwalletd em ordem não linear; isso significa que, em vez de esperar que um bloco seja processado antes de passar para o outro, as carteiras agora podem usar um pouco mais de memória e poder de processamento para escanear diferentes seções da blockchain. Normalmente, ele fará a varredura em diferentes intervalos, procurando transações mais recentes ao mesmo tempo em que os blocos mais antigos são baixados e processados. Se uma nota recente e não gasta for descoberta, ela será disponibilizada imediatamente.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync
Desenvolvido pela equipe do Zecwallet, Blaze sync é um algoritmo de sincronização para carteiras leves que começa a escanear a blockchain “de trás para frente”, começando pelo bloco mais alto e mais recente, e voltando a partir daí.

Isso permite que a carteira encontre notas gastas antes das recebidas, ao mesmo tempo em que disponibiliza aquelas que já não estão gastas, sem esperar que o processo completo de sincronização termine.

Além disso, ele usa Out of Order Sync, desacoplando “os componentes da sincronização entre si - Download de blocos, tentativas de descriptografia, atualização de witnesses”, e processando-os em paralelo, consumindo um pouco mais de memória e recursos de CPU, mas aumentando a velocidade de sincronização em 5 vezes.

### DAGSync

DAGSync é um algoritmo de sincronização proposto que busca melhorar a experiência do usuário de carteiras shielded do Zcash, tornando a sincronização mais rápida.

Ele se baseia [na ideia de usar um Grafo Acíclico Direcionado](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) (DAG) para representar as dependências entre notas, witnesses e nullifiers em uma carteira Zcash. 

Um DAG é uma estrutura de dados que consiste em nós e arestas, onde cada aresta tem uma direção que indica uma relação entre dois nós. Um DAG não tem ciclos, o que significa que não há como começar de um nó e seguir as arestas de volta ao mesmo nó.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

---

Curiosamente, todos esses mecanismos tentam resolver as questões propostas pela Zcash Security em sua publicação sobre [Mensageria Privada Escalável](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) e sua relação com sistemas de pagamento privados, alguns até dando o passo extra de baixar todos os dados de memo dos servidores, exceto aqueles exclusivos de um endereço, aumentando a privacidade ao custo de um pouco mais de recursos.

Além disso, a Zcash Foundation tem analisado outras alternativas para melhorar o desempenho das carteiras leves. É o caso de [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), uma construção que a fundação tem estudado “para determinar se oferece uma solução potencial para os recentes problemas de desempenho que afetaram os usuários de carteiras Zcash”
