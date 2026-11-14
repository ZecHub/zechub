<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nó integral Zebra

## TL;DR

- O Zebra (`zebrad`) é o nó integral do Zcash escrito em Rust e mantido pela Zcash Foundation.
- Ele valida blocos e transações, mantém o estado da chain e se comunica com outros nós pela rede peer-to-peer.
- O Zebra e o zcashd implementavam o mesmo protocolo e podiam interoperar. Desde a aposentadoria do zcashd, o Zebra assume o papel de consenso.
- Há duas formas de executá-lo: a imagem `zfnd/zebra` do Docker ou uma compilação a partir do código-fonte.
- O hardware recomendado é de 4 núcleos de CPU, 16 GB de RAM e 300 GB de disco. O mínimo é de 2 núcleos e 4 GB de RAM, com os mesmos 300 GB de disco.

## Explicação principal

O Zebra é o primeiro nó do Zcash escrito inteiramente em Rust. Ele fica na rede peer-to-peer do Zcash, onde valida e transmite transações e mantém o estado da blockchain. Ter uma segunda implementação independente deixa a infraestrutura da rede menos dependente de uma única base de código.

### Zebra e zcashd

O nó original do Zcash, o zcashd, foi desenvolvido pela Electric Coin Company a partir da base de código do Bitcoin. O Zebra foi escrito do zero em Rust, uma linguagem com segurança de memória, com foco em segurança e eficiência.

As duas implementações seguem o mesmo protocolo, então podiam se comunicar e interoperar. O zcashd atingiu sua parada de fim de suporte em 18 de julho de 2026 e não inicia mais, o que deixa o Zebra e o Zakura como as implementações de nó em uso. Veja [Nós integrais](/zcash-tech/full-nodes) para ter uma visão mais ampla.

## Executando o Zebra

Você pode executar o Zebra usando a imagem Docker ou pode compilá-lo manualmente. Consulte a seção de requisitos do sistema.

### Uso do Docker

Para executar a versão mais recente e sincronizá-la até a ponta da chain, execute o seguinte comando:

```

docker run zfnd/zebra:latest

```

Para instruções completas, consulte a [documentação do Docker](https://zebra.zfnd.org/user/docker.html).

### Compilando o Zebra

Compilar o Zebra requer Rust, libclang e um compilador C++.

- Certifique-se de ter instalada a versão estável mais recente do Rust, pois o Zebra é testado exclusivamente com ela.
- As dependências de compilação necessárias incluem:
  - libclang (também conhecida como libclang-dev ou llvm-dev)
  - clang ou outro compilador C++ (como g++ para todas as plataformas ou Xcode para macOS)
  - protoc (compilador de Protocol Buffers) com a flag *--experimental_allow_proto3_optional*, introduzida no Protocol Buffers v3.12.0 (lançado em 16 de maio de 2020).

### Instalar e iniciar

Em Linux x86_64 ou aarch64 com glibc 2.34 ou mais recente (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), você pode pular as dependências de compilação e instalar um binário pré-compilado assinado:

```
cargo binstall zebrad
```

Os mesmos binários são anexados a cada versão do GitHub como `zebrad-<version>-<target>.tar.gz`, cada um com um checksum SHA-256, uma atestação de proveniência de compilação Sigstore e uma assinatura Cosign. Em plataformas mais antigas, use a imagem Docker ou compile a partir do código-fonte.

Para compilar a partir do código-fonte, obtenha o código e compile o binário de release:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Inicie o nó com:

```
target/release/zebrad start
```

Guia de instalação: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Configurações e recursos opcionais

### Inicializando o arquivo de configuração

  - Gere um arquivo de configuração usando o comando:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - O *zebrad.toml* gerado será colocado no diretório de preferências padrão do Linux. Para os locais padrão em outros sistemas operacionais, consulte a documentação.

### Configurando barras de progresso

  - Configure *tracing.progress_bar* no seu *zebrad.toml* para exibir métricas importantes no terminal usando barras de progresso. Observação: existe um problema conhecido em que as estimativas das barras de progresso podem ficar excessivamente grandes.

### Configurando a mineração

  - O Zebra pode ser configurado para mineração especificando um *MINER_ADDRESS* e o mapeamento de portas no Docker. Mais detalhes podem ser encontrados na [documentação de suporte à mineração](https://zebra.zfnd.org/user/mining-docker.html).

### Recursos de compilação personalizados

  - Amplie a funcionalidade do Zebra com recursos adicionais do Cargo, como métricas do Prometheus, monitoramento com Sentry, suporte experimental ao Elasticsearch e muito mais.

  - Combine vários recursos listando-os como parâmetros da flag `--features` durante a instalação.

  - Alguns recursos de depuração e monitoramento são desativados nas compilações de release para otimizar o desempenho. Para a lista completa de recursos experimentais e para desenvolvedores, consulte a [documentação da API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Requisitos do sistema e configuração de rede

### Requisitos recomendados

- CPU: 4 núcleos de CPU
- RAM: 16 GB
- Espaço em disco: 300 GB de espaço disponível em disco para compilar binários e armazenar o estado da chain em cache
- Rede: conexão de rede de 100 Mbps com no mínimo 300 GB de uploads e downloads por mês

### Requisitos mínimos

- CPU: 2 núcleos de CPU
- RAM: 4 GB
- Espaço em disco: 300 GB de espaço disponível em disco

O conjunto de testes do Zebra pode levar mais de uma hora para ser concluído, dependendo das especificações da sua máquina. Sistemas mais lentos conseguem compilar e executar o Zebra. Os limites exatos de desempenho não foram estabelecidos por meio de testes.

### Requisitos de disco

- O Zebra usa aproximadamente 300 GB para os dados da Mainnet em cache e 10 GB para os dados da Testnet em cache. Espere que o uso de disco aumente com o tempo.
- O banco de dados é limpo periodicamente e também no desligamento ou na reinicialização. As alterações são confirmadas usando transações de banco de dados. Alterações incompletas causadas por encerramento forçado ou por um panic são revertidas na próxima vez que o Zebra iniciar.

### Requisitos de rede e portas

- O Zebra usa as seguintes portas TCP para conexões de entrada e de saída:
  - 8233 para a Mainnet
  - 18233 para a Testnet
- Configurar o Zebra com um listen_addr específico anuncia esse endereço para conexões de entrada. Conexões de saída são necessárias para a sincronização; conexões de entrada são opcionais.
- É necessário acesso aos seeders DNS do Zcash por meio do resolvedor DNS do sistema operacional (normalmente a porta 53).
- O Zebra pode fazer conexões de saída em qualquer porta. O zcashd prefere peers nas portas padrão para evitar ser usado em ataques DDoS contra outras redes.

### Uso típico de rede na Mainnet

- Sincronização inicial: é necessário um download de 300 GB para a sincronização inicial, e esse número deve crescer.
- Atualizações contínuas: uploads e downloads diários que variam de 10 MB a 10 GB, dependendo do tamanho das transações dos usuários e das solicitações dos peers.
- O Zebra inicia uma sincronização inicial a cada mudança de versão do banco de dados interno, o que pode significar um download completo da chain durante atualizações de versão.
- Peers com latência de ida e volta de 2 segundos ou menos são preferidos. Se a latência ultrapassar esse limite, abra um ticket no repositório do Zebra.

## Erros comuns

- Dimensionar o disco para hoje. O estado da Mainnet em cache já está perto de 300 GB e continua crescendo.
- Esperar RPCs de carteira do `zebrad`. Chaves e saldos ficam na [Zallet](https://github.com/zcash/zallet), um programa separado.
- Executar o `zebrad` sozinho e esperar que carteiras leves se conectem. Esse caminho precisa de um indexador, seja o lightwalletd ou o [Zaino](/zcash-tech/zaino).
- Tratar uma ressincronização inesperada como uma falha. Uma mudança de versão do banco de dados dispara uma por design.

## Páginas relacionadas

- [Nós integrais](/zcash-tech/full-nodes) - o que um nó integral faz e quais implementações existem
- [Nó Zakura](/zcash-tech/zakura-node) - um nó derivado do Zebra com sincronização mais rápida e pruning
- [Zaino](/zcash-tech/zaino) - o indexador Rust que atende carteiras leves
- [Nós lightwallet](/zcash-tech/lightwallet-nodes) - os servidores que as carteiras leves consultam
- [Guia de mineração do Zcash](/using-zcash/zcash-mining-guide) - mineração usando o seu próprio nó

## Para saber mais

- [O livro do Zebra](https://zebra.zfnd.org)
- [Zebra no GitHub](https://github.com/ZcashFoundation/zebra/)
- [Requisitos do sistema](https://zebra.zfnd.org/user/requirements.html)
