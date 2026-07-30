<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>


# Zcash Lightwallet Nodes

## Introdução

Zcash, uma criptomoeda focada em privacidade, oferece um recurso chamado "lightwallet nodes" que permite aos usuários interagir com a blockchain da Zcash sem baixar todo o histórico da blockchain. Esta página wiki fornece uma visão geral dos lightwallet nodes, o papel do serviço "lightwalletd" no ecossistema Zcash, uma lista atual de servidores de lightwallet nodes e instruções sobre como mudar de servidor em carteiras populares como YWallet e Zingo.

## Serviço Lightwalletd

O serviço "lightwalletd", abreviação de "lightwallet daemon", desempenha um papel crítico no ecossistema de lightwallet nodes da Zcash. Ele atua como um intermediário que fornece aos clientes leves (lightwallets) as informações de que precisam para funcionar de forma eficaz. Aqui está uma breve explicação do serviço lightwalletd:

__Agregador de Dados__: O Lightwalletd agrega dados da blockchain da Zcash, como informações de transações, dados de blocos e informações do pool blindado.

__Verificação Simplificada__: O Lightwalletd realiza uma verificação simplificada desses dados, permitindo que as lightwallets acessem as informações necessárias sem terem que validar toda a blockchain.

__Preservação da Privacidade__: O serviço mantém a privacidade dos usuários da Zcash ao não exigir que revelem suas chaves de visualização ou informações pessoais de transações.

__Sincronização Eficiente__: O Lightwalletd permite uma sincronização eficiente para lightwallets, reduzindo significativamente o tempo e os recursos necessários para se manter atualizado com a blockchain da Zcash.


## Lista Atual de Servidores Lightwalletd

* [status.zec.rocks](https://status.zec.rocks/)
* [hosh.zec.rocks](https://hosh.zec.rocks/zec)

## Mudando de Servidor em Carteiras Móveis

Mudar o servidor do lightwallet node é relativamente simples. Encontre e acesse as configurações avançadas dentro do aplicativo.

__Abra Ywallet/Zingo/Zashi/eZcash__: Inicie a carteira de sua escolha no seu dispositivo.

#### Ywallet:

No Ywallet, é o ícone de engrenagem no canto superior direito - vá até a aba Zcash. 

![SmartSelect_20250313_105128](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo:

No Zingo, fica no menu hambúrguer no canto superior esquerdo; depois, clique em configurações e role para baixo.

![SmartSelect_20250313_105737_Zingo](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### Zashi:

No Zashi, é o ícone de engrenagem no canto superior direito - vá até Advanced Settings e, em seguida, escolha um servidor.

![SmartSelect_20250313_110200_Zashi](/content-images/5a9d050a-8308-4cc2-907e-513072066aed-0bd414d520.webp)

#### eZcash

No eZcash, fica no menu hambúrguer no canto superior esquerdo; depois, clique em Settings e toque em Advanced.

![SmartSelect_20250313_110616](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)


## Conclusão

Os lightwallet nodes da Zcash e o serviço lightwalletd oferecem uma maneira conveniente e que preserva a privacidade para os usuários interagirem com a blockchain. A possibilidade de mudar de servidor oferece flexibilidade na escolha de um nó que melhor atenda às suas necessidades.
