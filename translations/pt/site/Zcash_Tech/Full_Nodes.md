<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nós integrais

## TL;DR

- Um nó integral mantém uma cópia completa da blockchain do Zcash e verifica cada novo bloco e transação de acordo com as regras de consenso.
- Zebra (`zebrad`) é o nó a ser instalado atualmente. Zakura é uma segunda implementação, bifurcada do Zebra.
- zcashd foi descontinuado. Sua interrupção de fim de suporte foi alcançada em 18 de julho de 2026, na altura do bloco 3417100, e esses nós não são mais iniciados.
- O nó e a carteira agora são programas separados. [Zallet](https://github.com/zcash/zallet) funciona com um nó e armazena as chaves.
- Executar seu próprio nó permite que você tenha verificação independente e elimina a necessidade de confiar no servidor de outra pessoa.

## Explicação principal

Um nó integral é um software que executa uma cópia completa da blockchain de uma criptomoeda, dando a você acesso aos recursos do protocolo.

Ele mantém um registro completo de todas as transações ocorridas desde a gênese e, por isso, consegue verificar a validade de novas transações e blocos adicionados à blockchain.

## Implementações de nós

### Zebra

Zebra é uma implementação independente de nó integral, pronta para produção, do protocolo Zcash, criada pela Zcash Foundation e escrita em Rust. Como zcashd foi descontinuado, Zebra (`zebrad`) é o nó integral recomendado para novas implementações.

Zebra valida blocos e transações, participa da rede peer-to-peer e expõe uma interface RPC para aplicativos. A carteira agora é um componente separado: [Zallet](https://github.com/zcash/zallet) funciona com um nó Zebra e gerencia chaves e saldos. Isso substitui zcashd, que agrupava o nó e a carteira em um único processo.

Para atender carteiras leves blindadas, o nó funciona junto a um indexador, seja o já estabelecido [lightwalletd](https://github.com/zcash/lightwalletd) ou o mais recente [Zaino](https://zechub.wiki/zcash-tech/zaino).

Não deixe de ler o livro do Zebra para obter instruções de configuração e participe do servidor Discord de P&D para obter suporte.

[GitHub](https://github.com/ZcashFoundation/zebra/)

[O livro do Zebra](https://zebra.zfnd.org)

Consulte [Nó integral Zebra](/zcash-tech/zebra-full-node) para obter etapas de instalação, configuração e requisitos de hardware.

### Zakura

Zakura é um segundo nó integral compatível com o consenso, bifurcado do Zebra e desenvolvido pela Valar Group em conjunto com o Project Tachyon. Ele segue as mesmas regras do protocolo e adiciona sincronização mais rápida, poda de blocos e uma camada de compatibilidade com RPC do zcashd. Consulte [Nó Zakura](/zcash-tech/zakura-node).

### zcashd (descontinuado)

> **Nota:** zcashd foi descontinuado. A Electric Coin Company [anunciou a descontinuação](https://z.cash/support/zcashd-deprecation/), e a interrupção automática de fim de suporte foi alcançada em 18 de julho de 2026, na altura do bloco 3417100. Todos os nós zcashd 6.20.0 não modificados foram encerrados nessa altura e se recusam a reiniciar, e o software não oferece suporte ao NU6.3. Use Zebra. Se você tiver uma `wallet.dat` do zcashd, siga o [Guia de migração: zcashd para zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet).

zcashd era a implementação original de nó integral do Zcash, desenvolvida e mantida pela Electric Coin Company. As instruções de compilação abaixo são mantidas como referência e para operadores que estão migrando do zcashd.

zcashd expõe um conjunto de APIs por meio de sua interface RPC. Essas APIs fornecem funções que permitem que aplicativos externos interajam com o nó.

[lightwalletd](https://github.com/zcash/lightwalletd) é um exemplo de aplicativo que usa um nó integral para permitir que desenvolvedores criem e mantenham carteiras leves blindadas compatíveis com dispositivos móveis sem precisar interagir diretamente com zcashd.

[Lista completa de comandos RPC compatíveis](https://zcash.github.io/rpc/)

[O livro do zcashd](https://zcash.github.io/zcash/)

#### Inicie um nó (Linux)

- Instale as dependências

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clone a versão mais recente, faça checkout, configure e compile:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sincronize a blockchain (pode levar várias horas)

    Para iniciar o nó, execute:

      ./src/zcashd

- As chaves privadas são armazenadas em ~/.zcash/wallet.dat

[Guia do zcashd no Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Implicações práticas

### A rede

Ao executar um nó integral, você ajuda a fortalecer a rede Zcash ao apoiar sua descentralização.

Isso ajuda a impedir o controle adversarial e a manter a rede resiliente a algumas formas de interrupção.

Os seeders DNS expõem uma lista de outros nós confiáveis por meio de um servidor integrado. Isso permite que as transações se propaguem por toda a rede.

### Estatísticas da rede

Estas são plataformas de exemplo que permitem acesso aos dados da rede Zcash:

[Explorador de blocos do Zcash](https://mainnet.zcashexplorer.app)

[Coin Metrics](https://docs.coinmetrics.io/info/assets/zec)

Você também pode contribuir para o desenvolvimento da rede executando testes ou propondo novas melhorias e fornecendo métricas.

### Mineração

Os mineradores precisam de nós integrais para acessar todos os RPCs relacionados à mineração, como getblocktemplate e getmininginfo.

zcashd também permite mineração para coinbase blindada. Os mineradores e os pools de mineração têm a opção de minerar diretamente para acumular ZEC blindados em um z-address por padrão.

Leia [O guia de mineração](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ou participe da página do fórum da comunidade para [Mineradores de Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Privacidade

Executar um nó integral permite que você verifique independentemente todas as transações e blocos na rede Zcash.

Executar um nó integral evita alguns riscos de privacidade associados ao uso de serviços de terceiros para verificar transações em seu nome.

Usar seu próprio nó também permite que você se conecte à rede por meio do [Tor](https://zcash.github.io/zcash/user/tor.html).
Isso tem a vantagem adicional de permitir que outros usuários se conectem de forma privada ao endereço .onion do seu nó.

## Erros comuns

- Compilar zcashd a partir das instruções acima e esperar um nó funcional. Esses binários são interrompidos na altura da descontinuação.
- Executar um nó e supor que sua carteira móvel agora o utiliza. Uma carteira leve continua se comunicando com qualquer servidor configurado até que você a aponte para o seu próprio. Consulte [Nós Lightwallet](/zcash-tech/lightwallet-nodes).
- Executar apenas `zebrad` e esperar que carteiras leves se conectem. O nó precisa de um indexador ao seu lado, seja lightwalletd ou [Zaino](/zcash-tech/zaino).
- Procurar RPCs de carteira no nó. As chaves e os saldos foram movidos para a Zallet.

## Páginas relacionadas

- [Nó integral Zebra](/zcash-tech/zebra-full-node) - instale, configure e execute o nó recomendado
- [Nó Zakura](/zcash-tech/zakura-node) - a segunda implementação de nó, bifurcada do Zebra
- [Nós Lightwallet](/zcash-tech/lightwallet-nodes) - os servidores consultados pelas carteiras leves
- [Zaino](/zcash-tech/zaino) - o indexador Rust que atende carteiras leves
- [Sincronização de carteiras Zcash](/zcash-tech/zcash-wallet-syncing) - por que a sincronização funciona dessa forma

## Aprendizagem adicional

Leia a [Documentação de suporte](https://zcash.readthedocs.io/en/latest/)

Participe do nosso [servidor Discord](https://discord.gg/zcash) ou entre em contato conosco no [X](https://X.com/ZecHub)
