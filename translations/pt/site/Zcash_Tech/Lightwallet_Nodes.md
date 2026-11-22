<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nós de carteiras leves do Zcash

## Resumo

* A maioria das pessoas usa o Zcash por meio de uma carteira leve, que não baixa a blockchain inteira. Em vez disso, ela se comunica com um servidor que já fez esse trabalho.
* Hoje, dois softwares atendem as carteiras leves: o **lightwalletd**, o serviço original escrito em Go, e o **Zaino**, um indexador mais recente escrito em Rust.
* Suas chaves nunca saem do seu dispositivo, e o servidor não pode gastar seus fundos nem ler os valores e memorandos dentro de transações totalmente blindadas.
* O que o servidor tem boas condições de descobrir é o seu endereço IP e o horário da sua atividade. As transações blindadas protegem o que vai para a blockchain, não a sua conexão com o servidor.
* O Tor remove o identificador de IP. Ele está disponível em carteiras construídas sobre `zcash_client_backend`, e na ZODL é uma opção em Configurações avançadas.
* Você pode mudar o servidor que a sua carteira usa ou rodar o seu próprio. Tanto o lightwalletd quanto o Zaino são de código aberto.

## Explicação principal

A maioria das pessoas usa o Zcash por meio de uma carteira leve, que não baixa a blockchain inteira. Em vez disso, ela se comunica com um servidor que já fez esse trabalho. Esta página explica o que são esses servidores, o que eles podem e não podem ver sobre você, como rotear sua conexão pelo Tor e como mudar o servidor que a sua carteira usa.

Hoje, dois softwares atendem as carteiras leves. O **lightwalletd** é o serviço original, escrito em Go. O **Zaino** é um indexador mais recente escrito em Rust, criado como parte do trabalho de descontinuação do zcashd.

### O que faz um servidor de carteira leve

Um servidor de carteira leve fica entre a sua carteira e a blockchain do Zcash e oferece a ela uma visão da chain que economiza banda. Ele faz três coisas por você.

Ele fornece blocos compactos. Em vez de blocos inteiros, ele envia uma forma compacta que traz apenas o que a carteira precisa para detectar um pagamento ao seu endereço blindado, detectar um gasto das suas notes e atualizar suas testemunhas.

Ele retransmite suas transações. Quando você envia, sua carteira entrega a transação pronta ao servidor, que a transmite para a rede.

Ele responde a consultas sobre a chain, como a altura atual e as informações de taxa de que a sua carteira precisa.

Sua carteira continua fazendo o trabalho privado localmente. Ela guarda suas chaves, faz a decriptação de teste dos blocos para encontrar suas notes e monta e assina as transações no seu dispositivo.

### O que o servidor pode e não pode ver

É fácil se enganar nesta parte. Suas chaves nunca saem do seu dispositivo, mas isso não significa que o servidor não descubra nada sobre você.

A referência aqui é o [Zcash modelo de ameaças do app de carteira](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), que vale a pena ler por inteiro se esse assunto importa para você. Ele descreve vários tipos de adversário. O que importa para esta página é um adversário capaz de observar o tráfego entre a sua carteira e a internet, e entre o servidor e a internet. Quem opera o servidor já está, por natureza, em parte dessa posição, porque a sua carteira se conecta diretamente a ele.

Comece pelo que está protegido. Contra todos os adversários do modelo, inclusive um que tenha comprometido o servidor, ele "não consegue descobrir nenhum material criptográfico de chave do usuário (chaves de gastos, chaves de visualização, frase semente etc.)", não pode roubar seus fundos e não pode fazer você enviar fundos que não pretendia enviar. Os valores e memorandos dentro de transações totalmente blindadas continuam criptografados.

Depois vem o que não está protegido. O modelo de ameaças lista estas fraquezas conhecidas diante de um adversário que observa o tráfego:

| Fraqueza | Como |
|:--|:--|
| Saber quem você é | "O adversário conhece o endereço IP do usuário, o que pode levá-lo à identidade real do usuário" |
| Saber aproximadamente onde você está | Consultando seu IP "em um banco de dados de geolocalização para estimar sua localização" |
| Saber que e quando você enviou ou recebeu uma transação blindada | O envio "usa mais banda, o que é visível mesmo com a conexão criptografada". O modelo observa que o ato de enviar e receber é visível para o próprio servidor |
| Contar quantas transações você fez ao longo do tempo | Os mesmos padrões de banda, observados por um período mais longo |
| Identificar padrões de pagamentos recorrentes | Observando quando a atividade acontece |
| Descobrir se um endereço é seu | Um adversário que já conhece um endereço "poderia enviar fundos para esse endereço e observar se há picos de banda" causados pela sua carteira ao buscá-lo |

O modelo também observa que o caso comum pressupõe "uma relação de confiança entre o usuário e o operador do servidor lightwalletd".

Então o resumo honesto é este. Um servidor de carteira leve não pode gastar seu dinheiro e não consegue ler os valores nem os memorandos das suas transações blindadas. O que ele tem boas condições de descobrir é o seu endereço IP e o horário da sua atividade, e esses dois dados juntos podem dizer muito sobre uma pessoa. As transações blindadas protegem o que vai para a blockchain. Sozinhas, elas não escondem a sua conexão com o servidor.

## Visual / analogia

Pense em uma biblioteca pública que guarda todos os jornais já impressos. Um nó integral é um leitor que leva o acervo inteiro para casa. Uma carteira leve é um leitor que, em vez disso, pede à bibliotecária um resumo diário: uma folha fina com o suficiente para perceber se algo diz respeito a ele.

O resumo vem lacrado: a bibliotecária o monta sem conseguir ler quais itens importam para você, e você o abre em casa com a sua própria chave. Esse é o bloco compacto, e a abertura é a decriptação de teste no seu dispositivo.

Mas a bibliotecária ainda vê qual leitor entrou, a que horas e qual a espessura do pacote que ele levou. Esse é o endereço IP e o horário, visíveis do balcão, por mais bem lacrado que esteja o envelope. O Tor equivale a mandar um mensageiro anônimo: a bibliotecária continua entregando o mesmo pacote, mas já não sabe para a casa de quem ele vai.

## Aprofundamento

### Roteamento pelo Tor

O Tor quebra a ligação entre o seu endereço IP e o tráfego da sua carteira, o que remove o identificador mais forte da tabela acima.

O suporte existe nas bibliotecas Rust sobre as quais muitas carteiras Zcash são construídas. O zcash_client_backend inclui um módulo Tor construído sobre o [Arti](https://tpo.pages.torproject.net/core/arti/), a implementação em Rust do Tor, para que uma carteira possa rotear a sincronização, a transmissão de transações e as consultas de preço pelo Tor sem precisar incluir um cliente Tor separado.

Os desenvolvedores do Zaino apresentam o mesmo argumento, citando diretamente o modelo de ameaças: existe "a necessidade de usar protocolos de transporte anônimos (como Nym ou Tor) para ocultar a identidade dos clientes diante dos servidores de indexação do Zcash".

Na **ZODL**, o Tor é uma opção em Configurações avançadas. As notas de versão da carteira orientam os usuários para o modo de conexão manual "além de ativar o Tor em Configurações avançadas" caso "prefiram reduzir a exposição de metadados", e o app oferece ativar o Tor antes de você restaurar uma carteira, que é o momento em que um IP novo ficaria ligado a todo o histórico de uma carteira.

Duas ressalvas. O Tor esconde seu IP do servidor, mas não muda o que o servidor descobre a partir das solicitações que você faz. Além disso, o roteamento onion adiciona latência, então a sincronização demora mais. Rodar o seu próprio servidor resolve a questão da confiança de outra forma, já que o operador passa a ser você.

### Zaino, o indexador em Rust

O [Zaino](/zcash-tech/zaino) é um indexador escrito em Rust pela equipe da Zingo, criado para substituir o lightwalletd como parte do trabalho de descontinuação do zcashd. Ele atende light clients, clientes completos e exploradores de blocos, lendo dados da chain mantidos por "um validador completo Zebra ou zcashd".

Ele está em desenvolvimento ativo, com a versão 0.10.1 lançada em setembro de 2026. O objetivo é manter compatibilidade com o lightwalletd sempre que possível, para que as carteiras possam apontar para ele sem precisar ser reescritas.

O Zaino tem uma página própria com diagramas de arquitetura, então esta página trata apenas do seu papel como servidor de carteira leve.

### Rodando o seu próprio

A opção mais forte é operar seu próprio servidor, o que elimina totalmente a questão da confiança. Os dois servidores são de código aberto: [lightwalletd](https://github.com/zcash/lightwalletd) em Go e [Zaino](https://github.com/zingolabs/zaino) em Rust. Ambos leem de um validador completo, então você também vai precisar do [Zebra](/zcash-tech/zebra-full-node). Os servidores zec.rocks são implantados com [Zcash Stack](/guides/zcash-stack), um chart do Helm de código aberto e o kit Compose Docker que executa Zebra e lightwalletd juntos.

## Implicações práticas

### Lista de servidores

O painel [hosh.zec.rocks](https://hosh.zec.rocks/zec) acompanha os servidores públicos e o estado deles, e é o lugar para conferir o que está realmente no ar. O [status.zec.rocks](https://status.zec.rocks/) mostra o status dos serviços.

Servidores listados nesse painel no momento em que esta página foi escrita:

| Servidor | Observações |
|:--|:--|
| zec.rocks:443 | Endpoints regionais estão listados junto a ele em na.zec.rocks, eu.zec.rocks, ap.zec.rocks e sa.zec.rocks |
| zec-node.cakewallet.com:443 | No domínio da Cake Wallet |
| zec.0xrpc.io:443 | Operado pela 0xRPC, que oferece endpoints públicos gratuitos para várias chains e pede doações para cobrir a capacidade |
| zaino.unsafe.zec.rocks:443 | Uma instância do Zaino. Repare no nome do host e trate-a como experimental |
| testnet.zec.rocks:443 | Testnet, com uma instância de testnet do Zaino listada em zaino.testnet.unsafe.zec.rocks |

Confira o painel em vez de confiar nesta lista. Operadores vêm e vão, e uma página como esta envelhece.

### Mudando o servidor na sua carteira

Vale a pena se você quer escolher um operador de confiança, distribuir sua atividade entre operadores ou apontar para o seu próprio servidor.

Os caminhos de menu abaixo estavam corretos quando esta página foi atualizada, mas as interfaces das carteiras mudam, então trate-os como uma dica e não como um caminho exato. Procure por Configurações avançadas ou por uma opção de servidor.

#### ZODL

Antes chamada Zashi. Clique na engrenagem no canto superior direito e depois em Configurações avançadas. O Tor fica na mesma tela. A ZODL também oferece um atalho Trocar servidor quando uma falha de sincronização é causada por um servidor desatualizado.

#### Zkool

O sucessor de Ywallet, do mesmo desenvolvedor (Ywallet não é mais mantido e não consegue acompanhar a rede depois de Ironwood). O ícone de engrenagem (Abrir configurações) na parte superior da tela de contas e, em seguida, o campo Servidor light node. O botão de lista ao lado permite escolher entre servidores conhecidos, e a opção Direct / Tor / Nym / Proxy logo abaixo define como a carteira se conecta.

#### Zingo

Abra o menu no canto superior esquerdo, depois Configurações, e role a tela para baixo.

![Configurações de servidor do Zingo](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Abra o menu no canto superior esquerdo, depois Configurações e então Avançado.

![Configurações de servidor do eZcash](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Essas capturas de tela foram feitas em março de 2025, e os apps lançaram novas versões desde então, então os botões podem ter mudado de lugar.

## Erros comuns

**Achar que o servidor pode ler suas transações**. Ele não pode. Suas chaves ficam no seu dispositivo, e os valores e memorandos dentro de transações totalmente blindadas continuam criptografados, mesmo diante de um adversário que tenha comprometido o servidor.

**Entender "blindado" como "conexão anônima"**. As transações blindadas protegem o que vai para a blockchain. Seu endereço IP e o horário da sua atividade são uma camada separada, e essa camada é exatamente o que o servidor vê.

**Supor que o Tor remove todos os rastros**. O Tor esconde seu IP do servidor, mas não muda o que o servidor descobre a partir das solicitações que você faz, e adiciona latência à sincronização.

**Confiar em uma lista de servidores numa página de wiki**. Operadores vêm e vão. Confira o [hosh.zec.rocks](https://hosh.zec.rocks/zec) para ver o que está realmente funcionando antes de apontar a sua carteira para qualquer servidor.

## Resumo

As carteiras leves dão acesso à pool blindada sem ocupar espaço em disco, o que é uma boa troca. Só tenha clareza sobre o que você está trocando. O servidor não pode pegar seus fundos nem ler seus valores blindados, mas tem boas condições de ver seu endereço IP e quando você faz transações. Use o roteamento pelo Tor, escolha seu operador com cuidado ou rode o seu próprio servidor.

## Páginas relacionadas

- [Quem pode ver seu Zcash pagamento](/start-here/who-can-see-your-zcash-payment) — uma visão para iniciantes sobre a mesma questão.
- [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see) — o que fica visível on-chain, em comparação com o que fica visível no servidor.
- [Zaino](/zcash-tech/zaino) — diagramas de arquitetura e o papel mais amplo do indexador Rust.
- [Zinder](/zcash-tech/zinder) — o indexador alfa do Zcash Foundation, que atende carteiras leves por meio de um adaptador compatível com lightwalletd.
- [Zebra Nó integral](/zcash-tech/zebra-full-node) — o validador do qual um servidor de carteira leve lê os dados.
- [Zcash Sincronização da carteira](/zcash-tech/zcash-wallet-syncing) — como os blocos compactos enviados por um servidor são processados pela sua carteira.

**Última atualização:** agosto de 2026
