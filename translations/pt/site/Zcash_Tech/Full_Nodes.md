<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Nós Completos

Um Nó Completo é um software que executa uma cópia completa da blockchain de qualquer criptomoeda, dando acesso aos recursos do protocolo.

Ele mantém um registro completo de todas as transações que ocorreram desde a gênese e, portanto, é capaz de verificar a validade de novas transações e blocos que são adicionados à blockchain.

## Zcashd

Zcashd é atualmente a principal implementação de Nó Completo usada pela Zcash, desenvolvida e mantida pela Electric Coin Company.

Zcashd expõe um conjunto de APIs por meio de sua interface RPC. Essas APIs fornecem funções que permitem que aplicações externas interajam com o nó.

[Lightwalletd](https://github.com/zcash/lightwalletd) é um exemplo de aplicação que usa um nó completo para permitir que desenvolvedores criem e mantenham carteiras leves blindadas compatíveis com dispositivos móveis sem precisar interagir diretamente com Zcashd.

[Lista completa de comandos RPC suportados](https://zcash.github.io/rpc/)

[O livro do Zcashd](https://zcash.github.io/zcash/)


### Iniciar um Nó (Linux)

- Instalar Dependências 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clonar a versão mais recente, fazer checkout, configurar e compilar:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sincronizar a Blockchain (pode levar várias horas)

    Para iniciar o nó, execute:

      ./src/zcashd

- As Chaves Privadas são armazenadas em ~/.zcash/wallet.dat

[Guia do Zcashd para Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra é uma implementação independente de nó completo para o Protocolo Zcash criada pela Zcash Foundation. 

Atualmente, está em fase de testes e ainda é experimental.

Há dois componentes principais do Zebra. O componente cliente, que é responsável pela varredura da blockchain e pela descriptografia de teste das transações. 

A segunda parte é a ferramenta de linha de comando zebra. Essa ferramenta gerencia chaves de gasto, endereços e se comunica com o componente cliente em zebrad para fornecer funcionalidades básicas de carteira.

Qualquer pessoa interessada em experimentar o Zebra para minerar blocos é convidada a participar do servidor de Discord de P&D. Também não deixe de ler o livro do Zebra para obter instruções de configuração. 

[Github](https://github.com/ZcashFoundation/zebra/)

[O Livro do Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## A Rede

Ao executar um nó completo, você está ajudando a fortalecer a rede Zcash ao apoiar sua descentralização. 

Isso ajuda a impedir o controle adversário e a manter a rede resiliente a algumas formas de interrupção.

Os seeders DNS expõem uma lista de outros nós confiáveis por meio de um servidor integrado. Isso permite que as transações se propaguem por toda a rede. 

### Estatísticas da Rede

Estas são plataformas de exemplo que permitem acesso aos dados da rede Zcash:

[Explorador de Blocos Zcash](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Você também pode contribuir para o desenvolvimento da rede executando testes ou propondo novas melhorias e fornecendo métricas. 



### Mineração

Mineradores precisam de nós completos para acessar todos os RPCs relacionados à mineração, como getblocktemplate e getmininginfo. 

Zcashd também permite mineração para coinbase blindada. Mineradores e pools de mineração têm a opção de minerar diretamente para acumular ZEC blindado em um z-address por padrão. 

Leia o [Guia de Mineração](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ou participe da página do Fórum da Comunidade para [Mineradores de Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Privacidade 

Executar um nó completo permite que você verifique de forma independente todas as transações e blocos na rede Zcash.

Executar um nó completo evita alguns riscos de privacidade associados ao uso de serviços de terceiros para verificar transações em seu nome.

Usar seu próprio nó também permite conectar-se à rede via [Tor](https://zcash.github.io/zcash/user/tor.html).
Isso traz a vantagem adicional de permitir que outros usuários se conectem de forma privada ao endereço .onion do seu nó.


**Precisa de Ajuda?**

Leia a [Documentação de Suporte](https://zcash.readthedocs.io/en/latest/)

Entre no nosso [Servidor do Discord](https://discord.gg/zcash) ou fale conosco no [twitter](https://twitter.com/ZecHub)

---

**Protected terms (keep in English):** `Zaino` `Zallet`
