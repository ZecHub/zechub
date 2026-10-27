<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nós Lightwallet do Zcash

## TL;DR

* A maioria das pessoas usa o Zcash por meio de uma carteira leve, que não baixa toda a blockchain. Em vez disso, ela se comunica com um servidor que já fez esse trabalho.
* Atualmente, dois softwares atendem carteiras leves: **lightwalletd**, o serviço original escrito em Go, e **Zaino**, um indexador mais recente escrito em Rust.
* Suas chaves nunca saem do seu dispositivo, e o servidor não pode gastar seus fundos nem ler os valores e memorandos em transações totalmente blindadas.
* O que o servidor está bem posicionado para saber é seu endereço IP e o momento da sua atividade — as transações blindadas protegem o que acontece na blockchain, não sua conexão com o servidor.
* O Tor remove o identificador de IP; ele está disponível em carteiras construídas sobre `zcash_client_backend` e, no ZODL, é uma configuração em Configurações avançadas.
* Você pode alterar o servidor usado pela sua carteira ou executar o seu próprio — tanto o lightwalletd quanto o Zaino são open source.

## Explicação principal

A maioria das pessoas usa o Zcash por meio de uma carteira leve, que não baixa toda a blockchain. Em vez disso, ela se comunica com um servidor que já fez esse trabalho. Esta página explica o que são esses servidores, o que eles podem e não podem ver sobre você, como encaminhar sua conexão pelo Tor e como alterar o servidor usado pela sua carteira.

Atualmente, dois softwares atendem carteiras leves. **lightwalletd** é o serviço original, escrito em Go. **Zaino** é um indexador mais recente escrito em Rust, criado como parte do trabalho de descontinuação do zcashd.

### O que faz um servidor de carteira leve

Um servidor de carteira leve fica entre sua carteira e a blockchain do Zcash e fornece uma visão da chain eficiente em termos de largura de banda. Ele faz três coisas para você.

Ele fornece blocos compactos. Em vez de blocos inteiros, envia uma forma compacta que contém apenas o que uma carteira precisa para detectar um pagamento para seu endereço blindado, detectar um gasto de suas notes e atualizar suas testemunhas.

Ele retransmite suas transações. Quando você envia, sua carteira entrega a transação concluída ao servidor, que a transmite para a rede.

Ele responde a consultas da chain, como a altura atual e as informações de taxa de que sua carteira precisa.

Sua carteira ainda faz o trabalho privado localmente. Ela guarda suas chaves, tenta descriptografar blocos para encontrar suas notes e cria e assina transações no seu dispositivo.

### O que o servidor pode e não pode ver

Esta é a parte em que é fácil se enganar. Suas chaves nunca saem do seu dispositivo, mas isso não significa que o servidor não aprenda nada sobre você.

A referência aqui é o [modelo de ameaças do app de carteira Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), que vale a pena ler na íntegra se você se preocupa com isso. Ele apresenta vários tipos de adversário. O que importa para esta página é um adversário que consegue observar o tráfego entre sua carteira e a internet, e entre o servidor e a internet. Quem opera o servidor está inerentemente em parte dessa posição, porque sua carteira se conecta diretamente a essa pessoa.

Comece pelo que está protegido. Contra todos os adversários do modelo, incluindo alguém que tenha comprometido o servidor, não consegue "aprender nenhum material de chave criptográfica do usuário (chaves de gastos, chaves de visualização, frase semente etc.)", não pode roubar seus fundos e não pode fazer você enviar fundos que não pretendia enviar. Os valores e memorandos dentro de transações totalmente blindadas permanecem criptografados.

Depois, há o que não está protegido. O modelo de ameaças lista estes como pontos fracos conhecidos diante de um adversário que observa o tráfego:

| Ponto fraco | Como |
|:--|:--|
| Telling who you are | "O adversário conhece o endereço IP do usuário, o que pode levá-lo à identidade real do usuário" |
| Telling roughly where you are | Procurar seu IP "em um banco de dados de geolocalização para aproximar sua localização" |
| Telling that and when you sent or received a shielded transaction | O envio "usa mais largura de banda, o que é visível mesmo que a conexão esteja criptografada". O modelo observa que o próprio ato de enviar e receber é visível para o servidor |
| Counting how many transactions you have made over time | Os mesmos padrões de largura de banda, observados durante um período mais longo |
| Spotting recurring payment patterns | Observar quando ocorre atividade |
| Working out whether an address is yours | Um adversário que já conhece um endereço "poderia enviar fundos para esse endereço e observar se há picos de largura de banda" da sua carteira ao buscá-lo |

O modelo também observa que o caso normal pressupõe "uma relação de confiança entre o usuário e o operador do servidor lightwalletd".

Portanto, o resumo honesto é este. Um servidor de carteira leve não pode gastar seu dinheiro e não pode ler os valores ou memorandos em suas transações blindadas. O que ele está bem posicionado para saber é seu endereço IP e o momento da sua atividade, e esses dois elementos juntos podem revelar muito sobre uma pessoa. As transações blindadas protegem o que acontece na blockchain. Por si só, elas não ocultam sua conexão com o servidor.

## Visual / analogia

Pense em uma biblioteca pública que guarda todos os jornais já impressos. Um nó integral é um leitor que leva para casa todo o arquivo. Uma carteira leve é um leitor que pede ao bibliotecário um resumo diário — uma folha fina com o suficiente para perceber se algo diz respeito a ele.

O resumo está selado: o bibliotecário o monta sem conseguir ler quais itens são importantes para você, e você o abre em casa com sua própria chave. Esse é o bloco compacto, e a abertura é a tentativa de descriptografia no seu dispositivo.

Mas o bibliotecário ainda vê qual leitor entrou, a que horas e quão grosso era o pacote que ele levou. Esse é o endereço IP e o momento da atividade — visíveis do balcão, por mais bem selado que esteja o envelope. O Tor é o equivalente a enviar um mensageiro anônimo: o bibliotecário ainda entrega o mesmo pacote, mas deixa de saber para qual casa ele vai.

## Análise detalhada

### Encaminhamento pelo Tor

O Tor rompe a ligação entre seu endereço IP e o tráfego da sua carteira, o que remove o identificador mais forte da tabela acima.

Há suporte nas bibliotecas Rust sobre as quais muitas carteiras Zcash são construídas. O zcash_client_backend inclui um módulo Tor baseado em [Arti](https://tpo.pages.torproject.net/core/arti/), a implementação Rust do Tor, para que uma carteira possa encaminhar a sincronização, a transmissão de transações e as consultas de preços pelo Tor sem incluir um cliente Tor separado.

Os desenvolvedores do Zaino apresentam o mesmo argumento, citando diretamente o modelo de ameaças: há "necessidade de usar protocolos de transporte anônimos (como Nym ou Tor) para ocultar as identidades dos clientes dos servidores de indexação do Zcash".

No **ZODL**, o Tor é uma configuração em Configurações avançadas. As notas de lançamento da carteira orientam os usuários ao modo de conexão manual "mais a ativação do Tor em Configurações avançadas" se "preferirem reduzir a exposição de metadados", e o app oferece ativar o Tor antes de você restaurar uma carteira, que é o momento em que um novo IP poderia, de outro modo, ser associado a todo o histórico de uma carteira.

Duas ressalvas. O Tor oculta seu IP do servidor, mas não altera o que o servidor aprende com as solicitações que você faz. E o roteamento onion acrescenta latência, então a sincronização demora mais. Executar seu próprio servidor evita a questão da confiança de outra forma, pois nesse caso o operador é você.

### Zaino, o indexador Rust

[Zaino](/zcash-tech/zaino) é um indexador escrito em Rust pela equipe Zingo, criado para substituir o lightwalletd como parte do trabalho de descontinuação do zcashd. Ele atende light clients, clientes completos e exploradores de blocos, lendo dados da chain mantidos por "um validador integral Zebra ou zcashd".

Está em desenvolvimento ativo, com a versão 0.8.0 lançada em agosto de 2026. Seu objetivo é manter compatibilidade retroativa com o lightwalletd sempre que possível, para que as carteiras possam apontar para ele sem serem reescritas.

O Zaino tem sua própria página com diagramas de arquitetura, por isso esta página aborda apenas seu papel como servidor de carteira leve.

### Executando o seu próprio

A opção mais forte é ser seu próprio operador, o que elimina totalmente a questão da confiança. Ambos os servidores são open source: [lightwalletd](https://github.com/zcash/lightwalletd) em Go e [Zaino](https://github.com/zingolabs/zaino) em Rust. Ambos leem de um validador integral, então você também vai querer o [Zebra](/zcash-tech/zebra-full-node).

## Implicações práticas

### Lista de servidores

O painel [hosh.zec.rocks](https://hosh.zec.rocks/zec) acompanha os servidores públicos e seu estado, sendo o local para verificar o que está realmente ativo. O [status.zec.rocks](https://status.zec.rocks/) mostra o status do serviço.

Servidores indicados nesse painel no momento da redação:

| Server | Notas |
|:--|:--|
| zec.rocks:443 | Os endpoints regionais são apresentados ao lado, em na.zec.rocks, eu.zec.rocks, ap.zec.rocks e sa.zec.rocks |
| zec-node.cakewallet.com:443 | No domínio da Cake Wallet |
| zec.0xrpc.io:443 | Operado pela 0xRPC, que oferece endpoints públicos gratuitos para várias chains e pede doações para cobrir a capacidade |
| zaino.unsafe.zec.rocks:443 | Uma instância Zaino. Observe o nome do host e trate-a como experimental |
| testnet.zec.rocks:443 | Testnet, com uma instância Zaino testnet listada em zaino.testnet.unsafe.zec.rocks |

Verifique o painel em vez de confiar nesta lista. Os operadores aparecem e desaparecem, e uma página como esta envelhece.

### Alterando o servidor na sua carteira

Vale a pena fazer isso se você quiser escolher um operador em quem confia, distribuir a atividade entre operadores ou apontar para o seu próprio.

Os caminhos de menu abaixo estavam corretos quando esta página foi atualizada, mas as interfaces das carteiras mudam, então trate-os como uma indicação, e não como um caminho exato. Procure Configurações avançadas ou uma opção de servidor.

#### ZODL

Anteriormente Zashi. Clique no ícone de engrenagem no canto superior direito e depois em Configurações avançadas. O Tor fica na mesma tela. O ZODL também oferece um atalho Switch server quando uma falha de sincronização é causada por o servidor estar desatualizado.

#### Ywallet

Clique no ícone de engrenagem no canto superior direito e depois na aba Zcash.

![Configurações do servidor Ywallet](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Clique no menu hambúrguer no canto superior esquerdo, depois em Settings e role para baixo.

![Configurações do servidor Zingo](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Clique no menu hambúrguer no canto superior esquerdo, depois em Settings e depois em Advanced.

![Configurações do servidor eZcash](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Estas capturas de tela foram tiradas em março de 2025, e os apps lançaram versões desde então, então os botões podem ter mudado de lugar.

## Erros comuns

**Pensar que o servidor pode ler suas transações**. Ele não pode. Suas chaves permanecem no seu dispositivo, e os valores e memorandos em transações totalmente blindadas permanecem criptografados — mesmo diante de um adversário que tenha comprometido o servidor.

**Interpretar "blindado" como "conexão anônima"**. As transações blindadas protegem o que acontece na blockchain. Seu endereço IP e o momento da sua atividade são uma camada separada, e essa camada é exatamente o que o servidor vê.

**Supor que o Tor remove todos os vestígios**. O Tor oculta seu IP do servidor, mas não altera o que o servidor aprende com as solicitações que você faz e acrescenta latência à sincronização.

**Confiar em uma lista de servidores em uma página wiki**. Os operadores aparecem e desaparecem. Verifique [hosh.zec.rocks](https://hosh.zec.rocks/zec) para saber o que está realmente em funcionamento antes de apontar sua carteira para qualquer servidor.

## Resumo

As carteiras leves dão a você acesso ao pool blindado sem ocupar espaço em disco, o que é uma boa troca. Apenas tenha clareza sobre o que você está trocando. O servidor não pode ficar com seus fundos nem ler seus valores blindados, mas está bem posicionado para ver seu endereço IP e quando você realiza transações. Encaminhe pelo Tor, escolha deliberadamente seu operador ou execute o seu próprio.

## Páginas relacionadas

- [Quem pode ver seu pagamento em Zcash](/start-here/who-can-see-your-zcash-payment) — a perspectiva para iniciantes sobre a mesma questão.
- [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see) — o que é visível on-chain, em oposição ao que é visível no servidor.
- [Zaino](/zcash-tech/zaino) — diagramas de arquitetura e o papel mais amplo do indexador Rust.
- [Nó integral Zebra](/zcash-tech/zebra-full-node) — o validador do qual um servidor de carteira leve lê.
- [Sincronização da carteira Zcash](/zcash-tech/zcash-wallet-syncing) — como os blocos compactos enviados por um servidor são processados pela sua carteira.

**Última atualização:** agosto de 2026
