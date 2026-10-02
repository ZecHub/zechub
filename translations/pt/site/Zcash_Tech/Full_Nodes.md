<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nós Completos

## TL;DR

- Um nó completo mantém uma cópia completa da blockchain Zcash e verifica cada novo bloco e transação segundo as regras de consenso.
- Zebra (`zebrad`) é o nó a instalar atualmente. Zakura é uma segunda implementação, bifurcada de Zebra.
- zcashd foi descontinuado. A sua interrupção de Fim de Suporte foi atingida em 18 de julho de 2026, à altura de bloco 3417100, e esses nós já não iniciam.
- O nó e a wallet são agora programas separados. [Zallet](https://github.com/zcash/zallet) funciona com um nó e detém as chaves.
- Executar o seu próprio nó permite-lhe uma verificação independente e elimina a necessidade de confiar no servidor de outra pessoa.

## Explicação Principal

Um Nó Completo é um software que executa uma cópia completa da blockchain de uma criptomoeda, dando-lhe acesso às funcionalidades do protocolo.

Mantém um registo completo de todas as transações ocorridas desde a génese e, por isso, consegue verificar a validade de novas transações e blocos adicionados à blockchain.

## Implementações de Nós

### Zebra

Zebra é uma implementação independente de nó completo, pronta para produção, do protocolo Zcash, criada pela Zcash Foundation e escrita em Rust. Como zcashd foi descontinuado, Zebra (`zebrad`) é o nó completo recomendado para novas implementações.

Zebra valida blocos e transações, participa na rede peer-to-peer e expõe uma interface RPC para aplicações. A wallet é agora um componente separado: [Zallet](https://github.com/zcash/zallet) funciona com um nó Zebra e gere chaves e saldos. Isto substitui zcashd, que agrupava o nó e a wallet num único processo.

Para servir wallets leves protegidas, o nó funciona juntamente com um indexador, seja o já estabelecido [lightwalletd](https://github.com/zcash/lightwalletd) ou o mais recente [Zaino](https://zechub.wiki/zcash-tech/zaino).

Não deixe de ler o livro Zebra para obter instruções de configuração e junte-se ao servidor de I&D Discord para obter apoio.

[Github](https://github.com/ZcashFoundation/zebra/)

[O Livro Zebra](https://zebra.zfnd.org)

Consulte [Zebra Nó Completo](/zcash-tech/zebra-full-node) para obter passos de instalação, configuração e requisitos de hardware.

### Zakura

Zakura é um segundo nó completo compatível com o consenso, bifurcado de Zebra e desenvolvido pela Valar Group em conjunto com o Project Tachyon. Segue as mesmas regras de protocolo e adiciona sincronização mais rápida, poda de blocos e uma camada de compatibilidade RPC zcashd. Consulte [Zakura Nó](/zcash-tech/zakura-node).

### zcashd (descontinuado)

> **Nota:** zcashd foi descontinuado. A Electric Coin Company [anunciou a descontinuação](https://z.cash/support/zcashd-deprecation/), e a interrupção automática de Fim de Suporte foi atingida em 18 de julho de 2026, à altura de bloco 3417100. Todos os nós zcashd 6.20.0 não modificados foram encerrados a essa altura e recusam reiniciar, e o software não suporta NU6.3. Utilize Zebra. Se tiver uma zcashd `wallet.dat`, siga o [Guia de Migração: zcashd para Zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet).

zcashd era a implementação original de Nó Completo para Zcash, desenvolvida e mantida pela Electric Coin Company. As instruções de compilação abaixo são mantidas para referência e para operadores que estejam a migrar de zcashd.

Zcashd expõe um conjunto de APIs através da sua interface RPC. Estas APIs fornecem funções que permitem que aplicações externas interajam com o nó.

[Lightwalletd](https://github.com/zcash/lightwalletd) é um exemplo de uma aplicação que utiliza um nó completo para permitir que os programadores criem e mantenham wallets leves protegidas compatíveis com dispositivos móveis sem terem de interagir diretamente com Zcashd.

[Lista completa dos comandos RPC suportados](https://zcash.github.io/rpc/)

[O livro Zcashd](https://zcash.github.io/zcash/)

#### Iniciar um Nó (Linux)

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

    Para iniciar o nó, execute:

      ./src/zcashd

- As Chaves Privadas são armazenadas em ~/.zcash/wallet.dat

[Guia para Zcashd no Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Implicações Práticas

### A Rede

Ao executar um nó completo, está a ajudar a fortalecer a rede zcash, apoiando a sua descentralização.

Isto ajuda a impedir o controlo adversarial e mantém a rede resiliente a algumas formas de perturbação.

Os seeders DNS expõem uma lista de outros nós fiáveis através de um servidor integrado. Isto permite que as transações se propaguem por toda a rede.

### Estatísticas da Rede

Estas são plataformas de exemplo que permitem o acesso a dados da Rede Zcash:

[Zcash Explorador de Blocos](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Também pode contribuir para o desenvolvimento da rede executando testes ou propondo novas melhorias e fornecendo métricas.

### Mineração

Os mineradores necessitam de nós completos para aceder a todos os RPCs relacionados com mineração, como getblocktemplate e getmininginfo.

Zcashd também permite a mineração para coinbase protegida. Os mineradores e os pools de mineração têm a opção de minerar diretamente para acumular ZEC protegidos num z-address por predefinição.

Leia [O Guia de Mineração](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ou junte-se à página do Fórum da Comunidade para [Zcash Mineradores](https://forum.zcashcommunity.com/c/mining/13).

### Privacidade

Executar um nó completo permite-lhe verificar independentemente todas as transações e blocos na rede Zcash.

Executar um nó completo evita alguns riscos de privacidade associados à utilização de serviços de terceiros para verificar transações em seu nome.

Utilizar o seu próprio nó também permite ligar-se à rede através de [Tor](https://zcash.github.io/zcash/user/tor.html).
Isto tem a vantagem adicional de permitir que outros utilizadores se liguem privadamente ao endereço .onion do seu nó.

## Erros Comuns

- Compilar zcashd a partir das instruções acima e esperar um nó funcional. Esses binários param à altura de descontinuação.
- Executar um nó e assumir que a sua wallet móvel passa a utilizá-lo. Uma wallet leve continua a comunicar com o servidor que tiver configurado até a apontar para o seu. Consulte [Nós Lightwallet](/zcash-tech/lightwallet-nodes).
- Executar apenas `zebrad` e esperar que as wallets leves se liguem. O nó necessita de um indexador ao seu lado, seja lightwalletd ou [Zaino](/zcash-tech/zaino).
- Procurar RPCs de wallet no nó. As chaves e os saldos foram movidos para Zallet.

## Páginas Relacionadas

- [Zebra Nó Completo](/zcash-tech/zebra-full-node) - instalar, configurar e executar o nó recomendado
- [Zakura Nó](/zcash-tech/zakura-node) - a segunda implementação de nó, bifurcada de Zebra
- [Nós Lightwallet](/zcash-tech/lightwallet-nodes) - os servidores consultados pelas wallets leves
- [Zaino](/zcash-tech/zaino) - o indexador Rust que serve wallets leves
- [Zcash Sincronização de Wallets](/zcash-tech/zcash-wallet-syncing) - por que motivo a sincronização funciona desta forma

## Aprendizagem Adicional

Leia [Documentação de Suporte](https://zcash.readthedocs.io/en/latest/)

Junte-se ao nosso [Discord Servidor](https://discord.gg/zcash) ou contacte-nos em [X](https://X.com/ZecHub)
