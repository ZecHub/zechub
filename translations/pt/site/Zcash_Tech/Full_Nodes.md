<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nós integrais

## Resumo

- Um nó integral mantém uma cópia completa da blockchain do Zcash e verifica cada novo bloco e cada nova transação de acordo com as regras de consenso.
- O Zebra (`zebrad`) é o nó a ser instalado hoje. O Zakura é uma segunda implementação, derivada de um fork do Zebra.
- O zcashd foi descontinuado. Sua parada de fim de suporte ocorreu em 18 de julho de 2026, na altura de bloco 3417100, e esses nós não iniciam mais.
- O nó e a carteira agora são programas separados. A [Zallet](https://github.com/zcash/zallet) roda conectada a um nó e guarda as chaves.
- Rodar seu próprio nó oferece verificação independente e elimina a necessidade de confiar no servidor de outra pessoa.

## Explicação principal

Um nó integral é um software que roda uma cópia completa da blockchain de uma criptomoeda, dando a você acesso aos recursos do protocolo.

Ele mantém um registro completo de todas as transações ocorridas desde o bloco gênese e, portanto, é capaz de verificar a validade de novas transações e novos blocos adicionados à blockchain.

## Implementações de nó

### Zebra

O Zebra é uma implementação de nó integral independente e pronta para produção do protocolo Zcash, criada pela Zcash Foundation e escrita em Rust. Como o zcashd foi descontinuado, o Zebra (`zebrad`) é o nó integral recomendado para novas implantações.

O Zebra valida blocos e transações, participa da rede peer-to-peer e expõe uma interface RPC para aplicativos. A carteira agora é um componente separado: a [Zallet](https://github.com/zcash/zallet) roda conectada a um nó Zebra e gerencia chaves e saldos. Isso substitui o zcashd, que reunia o nó e a carteira em um único processo.

Para atender carteiras leves blindadas, o nó roda junto com um indexador, seja o já consolidado [lightwalletd](https://github.com/zcash/lightwalletd) ou o mais recente [Zaino](https://zechub.wiki/zcash-tech/zaino).

Não deixe de ler o livro do Zebra para obter instruções de configuração e entre no servidor de P&D do Discord para obter suporte.

[GitHub](https://github.com/ZcashFoundation/zebra/)

[O livro do Zebra](https://zebra.zfnd.org)

Veja [Nó integral Zebra](/zcash-tech/zebra-full-node) para conhecer as etapas de instalação, a configuração e os requisitos de hardware.

### Zakura

O Zakura é um segundo nó integral compatível com o consenso, derivado de um fork do Zebra e desenvolvido pela Valar Group em conjunto com o Project Tachyon. Ele segue as mesmas regras de protocolo e acrescenta sincronização mais rápida, poda de blocos e uma camada de compatibilidade RPC com o zcashd. Veja [Nó Zakura](/zcash-tech/zakura-node).

### zcashd (descontinuado)

> **Observação:** o zcashd foi descontinuado. A Electric Coin Company [anunciou a descontinuação](https://z.cash/support/zcashd-deprecation/), e a parada automática de fim de suporte ocorreu em 18 de julho de 2026, na altura de bloco 3417100. Todos os nós zcashd 6.20.0 não modificados foram desligados nessa altura e se recusam a reiniciar, e o software não oferece suporte ao NU6.3. Use o Zebra. Se você tem uma zcashd `wallet.dat`, siga o [Guia de migração: do zcashd para zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet).

O zcashd foi a implementação original de nó integral do Zcash, desenvolvida e mantida pela Electric Coin Company. As instruções de compilação abaixo foram mantidas como referência e para operadores que estão migrando do zcashd.

O zcashd expõe um conjunto de APIs por meio de sua interface RPC. Essas APIs fornecem funções que permitem que aplicativos externos interajam com o nó.

O [lightwalletd](https://github.com/zcash/lightwalletd) é um exemplo de aplicativo que usa um nó integral para permitir que desenvolvedores criem e mantenham carteiras leves blindadas adequadas para celular sem precisar interagir diretamente com o zcashd.

[Lista completa de comandos RPC suportados](https://zcash.github.io/rpc/)

[O livro do zcashd](https://zcash.github.io/zcash/)

#### Inicie um nó (Linux)

- Instale as dependências

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clone a versão mais recente, faça o checkout, configure e compile:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sincronize a blockchain (pode levar várias horas)

    Para iniciar o nó, execute:

      ./src/zcashd

- As chaves privadas ficam armazenadas em ~/.zcash/wallet.dat

[Guia do zcashd no Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Implicações práticas

### A rede

Ao rodar um nó integral, você ajuda a fortalecer a rede do Zcash, apoiando sua descentralização.

Isso ajuda a impedir o controle por adversários e a manter a rede resiliente a algumas formas de interrupção.

Os DNS seeders expõem uma lista de outros nós confiáveis por meio de um servidor embutido. Isso permite que as transações se propaguem por toda a rede.

### Estatísticas da rede

Estes são exemplos de plataformas que dão acesso aos dados da rede do Zcash:

[Explorador de blocos Zcash](https://mainnet.zcashexplorer.app)

[Dados de rede da Coin Metrics](https://docs.coinmetrics.io/network-data/network-data-overview): documentação de métricas e links para a cobertura atual de ativos.

Você também pode contribuir para o desenvolvimento da rede executando testes, propondo novas melhorias e fornecendo métricas.

### Mineração

Os mineradores precisam de nós integrais para acessar todos os RPCs relacionados à mineração, como getblocktemplate e getmininginfo.

O zcashd também permite minerar para coinbase blindada. Mineradores e pools de mineração têm a opção de minerar diretamente para acumular ZEC blindado em um z-address por padrão.

Leia [O guia de mineração](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ou participe da página do Fórum da Comunidade para [Mineradores de Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Privacidade

Rodar um nó integral permite que você verifique de forma independente todas as transações e todos os blocos na rede do Zcash.

Rodar um nó integral evita alguns riscos de privacidade associados ao uso de serviços de terceiros para verificar transações em seu nome.

Usar seu próprio nó também permite se conectar à rede via [Tor](https://zcash.github.io/zcash/user/tor.html).
Isso tem a vantagem adicional de permitir que outros usuários se conectem de forma privada ao endereço .onion do seu nó.

## Erros comuns

- Compilar o zcashd a partir das instruções acima e esperar um nó funcionando. Esses binários param na altura de descontinuação.
- Rodar um nó e presumir que sua carteira de celular agora o usa. Uma carteira leve continua se comunicando com o servidor para o qual está configurada até que você a aponte para o seu próprio. Veja [Nós de carteiras leves](/zcash-tech/lightwallet-nodes).
- Rodar apenas o `zebrad` e esperar que as carteiras leves se conectem. O nó precisa de um indexador ao lado dele, seja o lightwalletd ou o [Zaino](/zcash-tech/zaino).
- Procurar RPCs de carteira no nó. Chaves e saldos foram transferidos para a Zallet.

## Páginas relacionadas

- [Nó integral Zebra](/zcash-tech/zebra-full-node) - instale, configure e rode o nó recomendado
- [Nó Zakura](/zcash-tech/zakura-node) - a segunda implementação de nó, derivada de um fork do Zebra
- [Nós de carteiras leves](/zcash-tech/lightwallet-nodes) - os servidores consultados pelas carteiras leves
- [Zaino](/zcash-tech/zaino) - o indexador do Rust que atende carteiras leves
- [Sincronização de carteiras Zcash](/zcash-tech/zcash-wallet-syncing) - por que a sincronização funciona do jeito que funciona

## Para saber mais

Leia a [Documentação de suporte](https://zcash.readthedocs.io/en/latest/)

Entre no nosso [Servidor do Discord](https://discord.gg/zcash) ou fale conosco no [X](https://X.com/ZecHub)
