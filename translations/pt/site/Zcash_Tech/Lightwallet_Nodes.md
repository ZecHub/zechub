---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nós de Lightwallet da Zcash

## Introdução

A maioria das pessoas usa a Zcash através de uma light wallet, que não descarrega toda a blockchain. Em vez disso, comunica com um servidor que já fez esse trabalho. Esta página explica o que são esses servidores, o que podem e não podem ver sobre si, como encaminhar a sua ligação através do Tor e como mudar o servidor que a sua wallet utiliza.

Atualmente, há duas peças de software a servir light wallets. **lightwalletd** é o serviço original, escrito em Go. **Zaino** é um indexador mais recente escrito em Rust, desenvolvido como parte do trabalho de descontinuação do zcashd.

## O que faz um servidor de light wallet

Um servidor de light wallet fica entre a sua wallet e a blockchain da Zcash e fornece-lhe uma vista da cadeia eficiente em termos de largura de banda. Faz três coisas por si.

Serve blocos compactos. Em vez de blocos inteiros, envia uma forma compacta que transporta apenas o que uma wallet precisa para detetar um pagamento para o seu endereço shielded, detetar um gasto das suas notas e atualizar as suas witnesses.

Retransmite as suas transações. Quando envia, a sua wallet entrega a transação finalizada ao servidor, que a difunde para a rede.

Responde a consultas da cadeia, como a altura atual e a informação de taxas de que a sua wallet precisa.

A sua wallet continua a fazer localmente o trabalho privado. Guarda as suas chaves, tenta desencriptar blocos para encontrar as suas notas e constrói e assina transações no seu dispositivo.

## O que o servidor pode e não pode ver

Esta é a parte em que é fácil enganar-se. As suas chaves nunca saem do seu dispositivo, mas isso não é o mesmo que o servidor não aprender nada sobre si.

A referência aqui é o [modelo de ameaças da app wallet da Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), que vale a pena ler na íntegra se isto lhe interessa. Ele descreve vários tipos de adversário. O que importa para esta página é um adversário que consegue observar o tráfego entre a sua wallet e a internet, e entre o servidor e a internet. Quem opera o servidor está inerentemente, em parte, nessa posição, porque a sua wallet liga-se diretamente a esse operador.

Comecemos pelo que está protegido. Contra todos os adversários no modelo, incluindo um que tenha comprometido o servidor, este "não pode aprender nenhum do material de chave criptográfica do utilizador (spending keys, viewing keys, seed phrase, etc.)", não pode roubar os seus fundos e não pode levá-lo a enviar fundos que não pretendia enviar. Os montantes e memos dentro de transações totalmente shielded permanecem encriptados.

Depois há o que não está protegido. O modelo de ameaças lista os seguintes pontos como fraquezas conhecidas contra um adversário que observa o tráfego:

| Fraqueza | Como |
|:--|:--|
| Descobrir quem é | "O adversário conhece o endereço IP do utilizador, o que pode levá-lo à identidade real do utilizador" |
| Descobrir aproximadamente onde está | Procurando o seu IP "numa base de dados de geolocalização para aproximar a sua localização" |
| Descobrir se e quando enviou ou recebeu uma transação shielded | Enviar "usa mais largura de banda, o que é visível mesmo que a ligação esteja encriptada". O modelo observa que o próprio ato de enviar e receber é visível para o próprio servidor |
| Contar quantas transações fez ao longo do tempo | Os mesmos padrões de largura de banda, observados durante um período mais longo |
| Detetar padrões recorrentes de pagamento | Observando quando ocorre atividade |
| Determinar se um endereço é seu | Um adversário que já conheça um endereço "poderia enviar fundos para esse endereço e observar se há picos de largura de banda" enquanto a sua wallet o vai buscar |

O modelo também observa que o caso normal assume "uma relação de confiança entre o utilizador e o operador do servidor lightwalletd".

Por isso, o resumo honesto é este. Um servidor de light wallet não pode gastar o seu dinheiro e não pode ler os montantes ou memos das suas transações shielded. Aquilo que está bem posicionado para aprender é o seu endereço IP e o momento da sua atividade, e essas duas coisas juntas podem dizer muito sobre uma pessoa. As transações shielded protegem o que vai para a blockchain. Não escondem, por si só, a sua ligação ao servidor.

## Encaminhamento através do Tor

O Tor quebra a ligação entre o seu endereço IP e o tráfego da sua wallet, o que elimina o identificador mais forte da tabela acima.

Existe suporte nas bibliotecas Rust sobre as quais muitas wallets da Zcash são construídas. zcash_client_backend inclui um módulo Tor baseado em [Arti](https://tpo.pages.torproject.net/core/arti/), a implementação em Rust do Tor, para que uma wallet possa encaminhar sincronização, difusão de transações e consultas de preços através do Tor sem incluir um cliente Tor separado.

Os programadores do Zaino defendem o mesmo argumento, citando diretamente o modelo de ameaças: existe "a necessidade de usar protocolos de transporte anónimos (como Nym ou Tor) para ofuscar as identidades dos clientes perante os servidores de indexação da Zcash".

No **ZODL**, o Tor é uma definição em Advanced Settings. As notas de lançamento da wallet indicam aos utilizadores o modo de ligação manual "mais ativar o Tor em Advanced Settings" se "preferirem reduzir a exposição de metadados", e a app oferece-se para ativar o Tor antes de restaurar uma wallet, que é o momento em que, de outra forma, um IP novo ficaria associado a todo o histórico de uma wallet.

Duas ressalvas. O Tor esconde o seu IP do servidor, mas não altera aquilo que o servidor aprende a partir dos pedidos que faz. E o encaminhamento onion acrescenta latência, por isso a sincronização demora mais tempo. Operar o seu próprio servidor evita a questão da confiança de outra forma, porque nesse caso o operador é você.

## Zaino, o indexador Rust

[Zaino](/site/Zcash_Tech/Zaino) é um indexador escrito em Rust pela equipa Zingo, criado para substituir o lightwalletd como parte do trabalho de descontinuação do zcashd. Serve clientes leves, clientes completos e exploradores de blocos, lendo dados da cadeia mantidos por "um validador completo Zebra ou Zcashd".

Está em desenvolvimento ativo, com a versão 0.7.0 lançada em agosto de 2026. O objetivo é manter compatibilidade retroativa com o lightwalletd sempre que possível, para que as wallets possam apontar para ele sem terem de ser reescritas.

O Zaino tem a sua própria página com diagramas de arquitetura, por isso esta página cobre apenas o seu papel como servidor de light wallet.

## Lista de servidores

O painel [hosh.zec.rocks](https://hosh.zec.rocks/zec) acompanha os servidores públicos e o seu estado de saúde, e é o local a verificar para saber o que está realmente ativo. [status.zec.rocks](https://status.zec.rocks/) mostra o estado dos serviços.

Servidores listados nesse painel no momento da redação:

| Servidor | Notas |
|:--|:--|
| zec.rocks:443 | Endpoints regionais são listados ao lado em na.zec.rocks, eu.zec.rocks, ap.zec.rocks e sa.zec.rocks |
| zec-node.cakewallet.com:443 | No domínio da Cake Wallet |
| zec.0xrpc.io:443 | Operado pela 0xRPC, que oferece endpoints públicos gratuitos para várias cadeias e pede donativos para cobrir a capacidade |
| zaino.unsafe.zec.rocks:443 | Uma instância Zaino. Repare no hostname e trate-o como experimental |
| testnet.zec.rocks:443 | Testnet, com uma instância Zaino de testnet listada em zaino.testnet.unsafe.zec.rocks |

Verifique o painel em vez de confiar nesta lista. Os operadores aparecem e desaparecem, e uma página como esta envelhece.

## Mudar o servidor na sua wallet

Vale a pena fazê-lo se quiser escolher um operador em quem confia, distribuir a atividade por vários operadores ou apontar para o seu próprio.

Os caminhos de menu abaixo estavam corretos quando esta página foi atualizada, mas as interfaces das wallets mudam, por isso trate-os como uma pista e não como um percurso exato. Procure Advanced Settings ou uma opção de servidor.

#### ZODL

Anteriormente Zashi. A engrenagem no canto superior direito, depois Advanced Settings. O Tor está no mesmo ecrã. O ZODL também oferece um atalho Switch server quando uma falha de sincronização é causada por o servidor estar desatualizado.

#### Ywallet

A engrenagem no canto superior direito, depois o separador Zcash.

![Definições de servidor do Ywallet](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

O menu hambúrguer no canto superior esquerdo, depois Settings, e depois desça.

![Definições de servidor do Zingo](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

O menu hambúrguer no canto superior esquerdo, depois Settings, e depois Advanced.

![Definições de servidor do eZcash](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Essas capturas de ecrã foram tiradas em março de 2025 e desde então as apps já lançaram novas versões, por isso os botões podem ter mudado de lugar.

## Operar o seu próprio

A opção mais forte é ser o seu próprio operador, o que elimina completamente a questão da confiança. Ambos os servidores são open source: [lightwalletd](https://github.com/zcash/lightwalletd) em Go e [Zaino](https://github.com/zingolabs/zaino) em Rust. Ambos leem a partir de um validador completo, por isso também vai querer [Zebra](/site/Zcash_Tech/Zebra_Full_Node).

## Resumo

As light wallets dão-lhe acesso à pool shielded sem o espaço em disco, o que é uma boa troca. Apenas seja claro sobre aquilo que está a trocar. O servidor não pode ficar com os seus fundos nem ler os seus montantes shielded, mas está bem posicionado para ver o seu endereço IP e quando transaciona. Encaminhe através do Tor, escolha deliberadamente o seu operador ou opere o seu próprio.

**Última atualização:** agosto de 2026
