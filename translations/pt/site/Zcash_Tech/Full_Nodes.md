<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Nós Completos

Um Nó Completo é um software que executa uma cópia completa da blockchain de qualquer criptomoeda, dando acesso às funcionalidades do protocolo.

Mantém um registo completo de todas as transações que ocorreram desde a génese e, por isso, consegue verificar a validade de novas transações e blocos que são adicionados à blockchain.

## Zcashd

> **Nota:** zcashd está a ser descontinuado. A Electric Coin Company [anunciou formalmente](https://z.cash/support/zcashd-deprecation/) que o zcashd está a ser retirado, sendo a sua função de nó completo substituída por [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`) e a sua função de wallet por [Zallet](https://github.com/zcash/zallet). Para novas implementações, use Zebra (ver abaixo). Se já executa um nó zcashd, siga o [Guia de Migração: zcashd para Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd foi a implementação original de Nó Completo para Zcash, desenvolvida e mantida pela Electric Coin Company. As instruções de compilação abaixo são mantidas como referência e para operadores que estejam a migrar para longe do zcashd.

Zcashd expõe um conjunto de API's através da sua interface RPC. Estas API's fornecem funções que permitem a aplicações externas interagir com o nó.

[Lightwalletd](https://github.com/zcash/lightwalletd) é um exemplo de uma aplicação que utiliza um nó completo para permitir aos programadores criar e manter shielded light wallets compatíveis com dispositivos móveis, sem terem de interagir diretamente com Zcashd.

[Listagem completa dos comandos RPC suportados](https://zcash.github.io/rpc/)

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

- Sincronizar a Blockchain (pode demorar várias horas)

    Para iniciar o nó execute:

      ./src/zcashd

- As Chaves Privadas são armazenadas em ~/.zcash/wallet.dat

[Guia para Zcashd em Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra é uma implementação independente e pronta para produção de nó completo do protocolo Zcash, criada pela Zcash Foundation e escrita em Rust. À medida que o zcashd é retirado, Zebra (`zebrad`) é o nó completo recomendado para novas implementações.

Zebra valida blocos e transações, participa na rede peer-to-peer e expõe uma interface RPC para aplicações. A wallet é agora um componente separado: [Zallet](https://github.com/zcash/zallet) funciona sobre um nó Zebra e trata das chaves e dos saldos. Isto substitui o zcashd, que agrupava o nó e a wallet num único processo.

Para servir shielded light wallets, o nó funciona em conjunto com um indexador, seja o já estabelecido [lightwalletd](https://github.com/zcash/lightwalletd) ou o mais recente [Zaino](https://zechub.wiki/zaino).

Não deixe de ler o livro do Zebra para obter instruções de configuração e junte-se ao servidor de Discord de I&D para apoio. 

[Github](https://github.com/ZcashFoundation/zebra/)

[O Livro do Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## A Rede

Ao executar um nó completo, está a ajudar a fortalecer a rede zcash ao apoiar a sua descentralização. 

Isto ajuda a impedir o controlo adversarial e a manter a rede resiliente a algumas formas de perturbação.

Os DNS seeders expõem uma lista de outros nós fiáveis através de um servidor incorporado. Isto permite que as transações se propaguem por toda a rede. 

### Estatísticas da Rede

Estas são plataformas de exemplo que permitem acesso aos dados da Rede Zcash:

[Explorador de Blocos Zcash](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Também pode contribuir para o desenvolvimento da rede executando testes ou propondo novas melhorias e fornecendo métricas. 



### Mineração

Os mineiros precisam de nós completos para aceder a todos os rpc's relacionados com mineração, como getblocktemplate e getmininginfo. 

Zcashd também permite mineração para coinbase shielded. Os mineiros e pools de mineração têm a opção de minerar diretamente para acumular ZEC shielded num z-address por defeito. 

Leia o [Guia de Mineração](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ou junte-se à página do Fórum da Comunidade para [Mineiros de Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Privacidade 

Executar um nó completo permite-lhe verificar de forma independente todas as transações e blocos na rede Zcash.

Executar um nó completo evita alguns riscos de privacidade associados à utilização de serviços de terceiros para verificarem transações em seu nome.

Utilizar o seu próprio nó também permite ligar-se à rede através de [Tor](https://zcash.github.io/zcash/user/tor.html).
Isto tem a vantagem adicional de permitir que outros utilizadores se liguem de forma privada ao endereço .onion do seu nó.


**Precisa de Ajuda?**

Leia a [Documentação de Suporte](https://zcash.readthedocs.io/en/latest/)

Junte-se ao nosso [Servidor de Discord](https://discord.gg/zcash) ou contacte-nos no [twitter](https://twitter.com/ZecHub)
