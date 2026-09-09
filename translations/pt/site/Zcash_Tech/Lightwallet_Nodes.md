<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nós Lightwallet do Zcash

## TL;DR

* A maioria das pessoas utiliza o Zcash através de uma carteira leve, que não descarrega toda a blockchain. Em vez disso, comunica com um servidor que já fez esse trabalho.
* Atualmente, duas peças de software servem carteiras leves: **lightwalletd**, o serviço original escrito em Go, e **Zaino**, um indexador mais recente escrito em Rust.
* As suas chaves nunca saem do seu dispositivo, e o servidor não pode gastar os seus fundos nem ler os montantes e memos em transações totalmente blindadas.
* O que o servidor está bem posicionado para saber é o seu endereço IP e o momento da sua atividade — as transações blindadas protegem o que acontece na blockchain, não a sua ligação ao servidor.
* O Tor remove o identificador de IP; está disponível em carteiras construídas sobre `zcash_client_backend` e, no ZODL, é uma definição nas Definições Avançadas.
* Pode alterar o servidor utilizado pela sua carteira, ou executar o seu próprio — tanto o lightwalletd como o Zaino são open source.

## Explicação Principal

A maioria das pessoas utiliza o Zcash através de uma carteira leve, que não descarrega toda a blockchain. Em vez disso, comunica com um servidor que já fez esse trabalho. Esta página explica o que são esses servidores, o que podem e não podem ver sobre si, como encaminhar a sua ligação através do Tor e como alterar o servidor utilizado pela sua carteira.

Atualmente, duas peças de software servem carteiras leves. **lightwalletd** é o serviço original, escrito em Go. **Zaino** é um indexador mais recente escrito em Rust, criado como parte do trabalho de descontinuação do zcashd.

### O que faz um servidor de carteira leve

Um servidor de carteira leve fica entre a sua carteira e a blockchain Zcash e fornece-lhe uma visão da cadeia eficiente em termos de largura de banda. Faz três coisas por si.

Serve blocos compactos. Em vez de blocos inteiros, envia uma forma compacta que transporta apenas o que uma carteira necessita para detetar um pagamento para o seu endereço blindado, detetar um gasto das suas notas e atualizar as suas testemunhas.

Retransmite as suas transações. Quando envia, a sua carteira entrega a transação concluída ao servidor, que a difunde na rede.

Responde a consultas da cadeia, como a altura atual e as informações de taxa de que a sua carteira necessita.

A sua carteira continua a fazer o trabalho privado localmente. Guarda as suas chaves, tenta desencriptar blocos para encontrar as suas notas e constrói e assina transações no seu dispositivo.

### O que o servidor pode e não pode ver

Esta é a parte em que é fácil enganar-se. As suas chaves nunca saem do seu dispositivo, mas isso não significa que o servidor não aprenda nada sobre si.

A referência aqui é o [modelo de ameaça da aplicação de carteira Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), que vale a pena ler integralmente se se preocupa com isto. Define vários tipos de adversário. O que importa para esta página é um adversário que consegue observar o tráfego entre a sua carteira e a internet, e entre o servidor e a internet. Quem quer que opere o servidor encontra-se inerentemente em parte dessa posição, porque a sua carteira liga-se diretamente a essa entidade.

Comece pelo que está protegido. Contra todos os adversários do modelo, incluindo alguém que tenha comprometido o servidor, não consegue "aprender qualquer material de chave criptográfica do utilizador (chaves de gasto, chaves de visualização, frase-semente, etc.)", não pode roubar os seus fundos e não pode fazer com que envie fundos que não pretendia enviar. Os montantes e memos dentro de transações totalmente blindadas permanecem encriptados.

Depois há o que não está protegido. O modelo de ameaça enumera estes como pontos fracos conhecidos perante um adversário que observa o tráfego:

| Ponto fraco | Como |
|:--|:--|
| Determinar quem é | "O adversário conhece o endereço IP do utilizador, o que pode levá-lo à identidade real do utilizador" |
| Determinar aproximadamente onde está | Procurar o seu IP "numa base de dados de geolocalização para aproximar a sua localização" |
| Determinar se e quando enviou ou recebeu uma transação blindada | O envio "utiliza mais largura de banda, o que é visível mesmo que a ligação esteja encriptada". O modelo nota que o próprio ato de enviar e receber é visível para o servidor |
| Contar quantas transações fez ao longo do tempo | Os mesmos padrões de largura de banda, observados durante um período mais longo |
| Detetar padrões de pagamento recorrentes | Observar quando ocorre atividade |
| Determinar se um endereço lhe pertence | Um adversário que já conhece um endereço "poderia enviar fundos para esse endereço e observar se há picos de largura de banda" da sua carteira ao obtê-lo |

O modelo também nota que o caso normal pressupõe "uma relação de confiança entre o utilizador e o operador do servidor lightwalletd".

Portanto, o resumo honesto é este. Um servidor de carteira leve não pode gastar o seu dinheiro e não pode ler os montantes ou memos nas suas transações blindadas. Aquilo que está bem posicionado para saber é o seu endereço IP e o momento da sua atividade, e estes dois elementos juntos podem revelar muito sobre uma pessoa. As transações blindadas protegem o que acontece na blockchain. Por si só, não ocultam a sua ligação ao servidor.

## Visual / Analogia

Pense numa biblioteca pública que guarda todos os jornais alguma vez impressos. Um nó completo é um leitor que leva para casa todo o arquivo. Uma carteira leve é um leitor que pede ao bibliotecário um resumo diário — uma folha fina com o suficiente para perceber se algo lhe diz respeito.

O resumo está selado: o bibliotecário monta-o sem conseguir ler quais os itens que lhe interessam, e abre-o em casa com a sua própria chave. Esse é o bloco compacto, e a abertura é a tentativa de desencriptação no seu dispositivo.

Mas o bibliotecário continua a ver que leitor entrou, a que hora e quão grosso era o conjunto que levou. Esse é o endereço IP e o momento da atividade — visíveis do balcão, por mais bem selado que esteja o envelope. O Tor é o equivalente a enviar um estafeta anónimo: o bibliotecário continua a entregar o mesmo conjunto, mas deixa de saber para que casa vai.

## Análise Detalhada

### Encaminhamento através do Tor

O Tor quebra a ligação entre o seu endereço IP e o tráfego da sua carteira, o que remove o identificador mais forte da tabela acima.

Existe suporte nas bibliotecas Rust sobre as quais muitas carteiras Zcash são construídas. O zcash_client_backend inclui um módulo Tor baseado em [Arti](https://tpo.pages.torproject.net/core/arti/), a implementação Rust do Tor, para que uma carteira possa encaminhar a sincronização, a difusão de transações e as consultas de preços através do Tor sem incluir um cliente Tor separado.

Os programadores do Zaino apresentam o mesmo argumento, citando diretamente o modelo de ameaça: há "necessidade de utilizar protocolos de transporte anónimos (como Nym ou Tor) para ocultar as identidades dos clientes dos servidores de indexação do Zcash".

No **ZODL**, o Tor é uma definição nas Definições Avançadas. As notas de lançamento da carteira indicam aos utilizadores o modo de ligação manual "mais a ativação do Tor nas Definições Avançadas" se "preferirem reduzir a exposição de metadados", e a aplicação oferece ativar o Tor antes de restaurar uma carteira, que é o momento em que um novo IP poderia, de outro modo, ser associado a todo o histórico de uma carteira.

Duas ressalvas. O Tor oculta o seu IP do servidor, mas não altera o que o servidor aprende a partir dos pedidos que faz. E o encaminhamento onion acrescenta latência, pelo que a sincronização demora mais tempo. Executar o seu próprio servidor evita a questão da confiança de outra forma, pois nesse caso o operador é você.

### Zaino, o indexador Rust

[Zaino](/zcash-tech/zaino) é um indexador escrito em Rust pela equipa Zingo, criado para substituir o lightwalletd como parte do trabalho de descontinuação do zcashd. Serve clientes leves, clientes completos e exploradores de blocos, lendo dados da cadeia mantidos por "um validador completo Zebra ou Zcashd".

Está em desenvolvimento ativo, com a versão 0.8.0 lançada em agosto de 2026. O seu objetivo é manter-se compatível retroativamente com o lightwalletd sempre que possível, para que as carteiras possam apontar para ele sem serem reescritas.

O Zaino tem a sua própria página com diagramas de arquitetura, por isso esta página aborda apenas o seu papel como servidor de carteira leve.

### Executar o seu próprio

A opção mais forte é ser o seu próprio operador, o que elimina totalmente a questão da confiança. Ambos os servidores são open source: [lightwalletd](https://github.com/zcash/lightwalletd) em Go e [Zaino](https://github.com/zingolabs/zaino) em Rust. Ambos leem de um validador completo, pelo que também irá querer o [Zebra](/zcash-tech/zebra-full-node).

## Implicações Práticas

### Lista de servidores

O painel [hosh.zec.rocks](https://hosh.zec.rocks/zec) acompanha os servidores públicos e o seu estado, sendo o local para verificar o que está realmente ativo. O [status.zec.rocks](https://status.zec.rocks/) mostra o estado do serviço.

Servidores indicados nesse painel à data da redação:

| Servidor | Notas |
|:--|:--|
| zec.rocks:443 | Os endpoints regionais são apresentados ao lado, em na.zec.rocks, eu.zec.rocks, ap.zec.rocks e sa.zec.rocks |
| zec-node.cakewallet.com:443 | No domínio da Cake Wallet |
| zec.0xrpc.io:443 | Operado pela 0xRPC, que oferece endpoints públicos gratuitos para várias cadeias e pede donativos para cobrir a capacidade |
| zaino.unsafe.zec.rocks:443 | Uma instância Zaino. Tenha em atenção o nome do anfitrião e trate-a como experimental |
| testnet.zec.rocks:443 | Testnet, com uma instância Zaino testnet listada em zaino.testnet.unsafe.zec.rocks |

Verifique o painel em vez de confiar nesta lista. Os operadores aparecem e desaparecem, e uma página como esta envelhece.

### Alterar o servidor na sua carteira

Vale a pena fazê-lo se quiser escolher um operador em quem confia, distribuir a atividade por operadores ou apontar para o seu próprio servidor.

Os caminhos de menu abaixo estavam corretos quando esta página foi atualizada, mas as interfaces das carteiras mudam, por isso trate-os como uma indicação e não como um percurso exato. Procure Definições Avançadas ou uma opção de servidor.

#### ZODL

Anteriormente Zashi. O ícone de engrenagem no canto superior direito e, depois, Definições Avançadas. O Tor está no mesmo ecrã. O ZODL também oferece um atalho Mudar de servidor quando uma falha de sincronização é causada por o servidor estar desatualizado.

#### Ywallet

O ícone de engrenagem no canto superior direito e, depois, o separador Zcash.

![Definições do servidor Ywallet](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

O menu hambúrguer no canto superior esquerdo, depois Definições, e depois desloque para baixo.

![Definições do servidor Zingo](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

O menu hambúrguer no canto superior esquerdo, depois Definições, e depois Avançadas.

![Definições do servidor eZcash](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Estas capturas de ecrã foram tiradas em março de 2025 e as aplicações lançaram versões desde então, pelo que os botões podem ter mudado de lugar.

## Erros Comuns

**Pensar que o servidor pode ler as suas transações**. Não pode. As suas chaves permanecem no seu dispositivo e os montantes e memos nas transações totalmente blindadas permanecem encriptados — mesmo perante um adversário que tenha comprometido o servidor.

**Interpretar "blindado" como "ligação anónima"**. As transações blindadas protegem o que acontece na blockchain. O seu endereço IP e o momento da sua atividade são uma camada separada, e essa camada é exatamente o que o servidor vê.

**Assumir que o Tor remove todos os vestígios**. O Tor oculta o seu IP do servidor, mas não altera o que o servidor aprende com os pedidos que faz, e acrescenta latência à sincronização.

**Confiar numa lista de servidores numa página wiki**. Os operadores aparecem e desaparecem. Verifique [hosh.zec.rocks](https://hosh.zec.rocks/zec) para saber o que está realmente em funcionamento antes de apontar a sua carteira para qualquer servidor.

## Resumo

As carteiras leves dão-lhe acesso ao conjunto blindado sem ocupar espaço em disco, o que é uma boa troca. Apenas tenha clareza sobre o que está a trocar. O servidor não pode ficar com os seus fundos nem ler os seus montantes blindados, mas está bem posicionado para ver o seu endereço IP e quando realiza transações. Encaminhe através do Tor, escolha deliberadamente o seu operador ou execute o seu próprio.

## Páginas Relacionadas

- [Quem Pode Ver o Seu Pagamento Zcash](/start-here/who-can-see-your-zcash-payment) — a perspetiva para principiantes sobre a mesma questão.
- [O Que um Explorador de Blocos Pode Ver](/zcash-tech/what-a-block-explorer-can-see) — o que é visível on-chain, em oposição ao que é visível no servidor.
- [Zaino](/zcash-tech/zaino) — diagramas de arquitetura e o papel mais amplo do indexador Rust.
- [Nó Completo Zebra](/zcash-tech/zebra-full-node) — o validador de onde um servidor de carteira leve lê.
- [Sincronização da Carteira Zcash](/zcash-tech/zcash-wallet-syncing) — como os blocos compactos enviados por um servidor são processados pela sua carteira.

**Última atualização:** agosto de 2026
