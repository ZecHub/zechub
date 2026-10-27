<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Nó integral Zebra

## Resumo

- Zebra (`zebrad`) é o nó integral do Zcash escrito em Rust e mantido pela Zcash Foundation.
- Valida blocos e transações, mantém o estado da chain e se comunica com outros nós pela rede peer-to-peer.
- Zebra e zcashd implementavam o mesmo protocolo e podiam interoperar. Desde a descontinuação do zcashd, Zebra assume a função de consenso.
- Duas formas de executá-lo: a imagem Docker `zfnd/zebra` ou uma compilação a partir do código-fonte.
- O hardware recomendado é de 4 núcleos de CPU, 16 GB de RAM e 300 GB de disco. O mínimo é de 2 núcleos e 4 GB de RAM, com os mesmos 300 GB de disco.

## Explicação essencial

Zebra é o primeiro nó do Zcash escrito inteiramente em Rust. Opera na rede peer-to-peer do Zcash, onde valida e transmite transações e mantém o estado da blockchain. Ter uma segunda implementação independente torna a infraestrutura da rede menos dependente de uma única base de código.

### Zebra e zcashd

O nó original do Zcash, zcashd, foi desenvolvido pela Electric Coin Company a partir da base de código do Bitcoin. Zebra foi escrito do zero em Rust, uma linguagem segura em termos de memória, com foco na segurança e eficiência.

Ambas as implementações seguem o mesmo protocolo, portanto podiam se comunicar e interoperar. zcashd atingiu sua interrupção de fim de suporte em 18 de julho de 2026 e não inicia mais, deixando Zebra e Zakura como as implementações de nó em uso. Consulte [Nós integrais](/zcash-tech/full-nodes) para uma visão mais ampla.

## Executar Zebra

Você pode executar o Zebra usando a imagem Docker ou compilá-lo manualmente. Consulte a seção Requisitos do sistema.

### Uso do Docker

Para executar a versão mais recente e sincronizá-la até a ponta da chain, execute o seguinte comando:

```

docker run zfnd/zebra:latest

```

Para obter instruções completas, consulte a [documentação do Docker](https://zebra.zfnd.org/user/docker.html).

### Compilar o Zebra

A compilação do Zebra requer Rust, libclang e um compilador C++.

- Certifique-se de que você tem a versão estável mais recente do Rust instalada, pois o Zebra é testado exclusivamente com ela.
- As dependências de compilação necessárias incluem:
  - libclang (também conhecido como libclang-dev ou llvm-dev)
  - clang ou outro compilador C++ (como g++ para todas as plataformas ou Xcode para macOS)
  - protoc (compilador Protocol Buffers) com a opção *--experimental_allow_proto3_optional*, introduzida no Protocol Buffers v3.12.0 (lançado em 16 de maio de 2020).

### Instalar e iniciar

No Linux x86_64 ou aarch64 com glibc 2.34 ou mais recente (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), você pode ignorar as dependências de compilação e instalar um binário pré-compilado assinado:

```
cargo binstall zebrad
```

Os mesmos binários são anexados a cada lançamento do GitHub como `zebrad-<version>-<target>.tar.gz`, cada um com uma soma de verificação SHA-256, um atestado Sigstore de proveniência da compilação e uma assinatura Cosign. Em plataformas mais antigas, use a imagem Docker ou compile a partir do código-fonte.

Para compilar a partir do código-fonte, obtenha o código e compile o binário de lançamento:

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

## Configurações e funcionalidades opcionais

### Inicializar o arquivo de configuração

  - Gere um arquivo de configuração usando o comando:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - O arquivo *zebrad.toml* gerado será colocado no diretório de preferências padrão do Linux. Para locais padrão em sistemas operacionais alternativos, consulte a documentação.

### Configurar barras de progresso

  - Configure *tracing.progress_bar* no seu *zebrad.toml* para exibir métricas importantes no terminal usando barras de progresso. Nota: existe um problema conhecido em que as estimativas das barras de progresso podem se tornar excessivamente grandes.

### Configurar mineração

  - O Zebra pode ser configurado para mineração especificando um *MINER_ADDRESS* e o mapeamento de portas no Docker. Você pode encontrar mais detalhes na [documentação de suporte à mineração](https://zebra.zfnd.org/user/mining-docker.html).

### Funcionalidades de compilação personalizadas

  - Expanda a funcionalidade do Zebra com funcionalidades adicionais do Cargo, como métricas do Prometheus, monitoramento do Sentry, suporte experimental ao Elasticsearch e muito mais.

  - Combine várias funcionalidades listando-as como parâmetros da opção `--features` durante a instalação.

  - Algumas funcionalidades de depuração e monitoramento são desativadas nas compilações de lançamento para otimizar o desempenho. Para obter a lista completa de funcionalidades experimentais e de desenvolvedor, consulte a [documentação da API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Requisitos do sistema e configuração de rede

### Requisitos recomendados

- CPU: 4 núcleos de CPU
- RAM: 16 GB
- Espaço em disco: 300 GB de espaço em disco disponível para compilar binários e armazenar o estado da chain em cache
- Rede: conexão de rede de 100 Mbps com no mínimo 300 GB de uploads e downloads por mês

### Requisitos mínimos

- CPU: 2 núcleos de CPU
- RAM: 4 GB
- Espaço em disco: 300 GB de espaço em disco disponível

A suíte de testes do Zebra pode levar mais de uma hora para ser concluída, dependendo das especificações da sua máquina. Sistemas mais lentos conseguem compilar e executar o Zebra. Os limites exatos de desempenho não foram estabelecidos por meio de testes.

### Requisitos de disco

- O Zebra usa aproximadamente 300 GB para dados da Mainnet em cache e 10 GB para dados da Testnet em cache. Espere que o uso de disco aumente ao longo do tempo.
- O banco de dados é limpo periodicamente, bem como ao encerrar ou reiniciar. As alterações são confirmadas usando transações de banco de dados. Alterações incompletas causadas por encerramento forçado ou um panic são revertidas na próxima vez que o Zebra iniciar.

### Requisitos de rede e portas

- O Zebra usa as seguintes portas TCP para conexões de entrada e saída:
  - 8233 para Mainnet
  - 18233 para Testnet
- Configurar o Zebra com um listen_addr específico anuncia esse endereço para conexões de entrada. As conexões de saída são necessárias para a sincronização; as conexões de entrada são opcionais.
- É necessário acessar os seeders DNS do Zcash por meio do resolvedor DNS do sistema operacional (normalmente pela porta 53).
- O Zebra pode fazer conexões de saída em qualquer porta. zcashd prefere pares nas portas padrão para evitar ser usado em ataques DDoS contra outras redes.

### Uso típico da rede Mainnet

- Sincronização inicial: é necessário um download de 300 GB para a sincronização inicial, e espera-se que esse valor aumente.
- Atualizações contínuas: uploads e downloads diários entre 10 MB e 10 GB, dependendo dos tamanhos das transações dos usuários e das solicitações dos pares.
- O Zebra inicia uma sincronização inicial a cada alteração da versão interna do banco de dados, o que pode significar um download completo da chain durante atualizações de versão.
- São preferidos pares com uma latência de ida e volta de 2 segundos ou menos. Se a latência exceder esse limite, abra um ticket no repositório do Zebra.

## Erros comuns

- Dimensionar o disco para as necessidades atuais. O estado da Mainnet em cache já se aproxima dos 300 GB e continua a crescer.
- Esperar RPCs de carteira do `zebrad`. As chaves e os saldos estão no [Zallet](https://github.com/zcash/zallet), um programa separado.
- Executar apenas o `zebrad` e esperar que as carteiras leves se conectem. Esse caminho precisa de um indexador, seja lightwalletd ou [Zaino](/zcash-tech/zaino).
- Tratar uma resincronização inesperada como uma falha. Uma alteração da versão do banco de dados a desencadeia por definição.

## Páginas relacionadas

- [Nós integrais](/zcash-tech/full-nodes) - o que um nó integral faz e quais implementações existem
- [Nó Zakura](/zcash-tech/zakura-node) - um nó bifurcado do Zebra com sincronização e poda mais rápidas
- [Zaino](/zcash-tech/zaino) - o indexador Rust que atende carteiras leves
- [Nós Lightwallet](/zcash-tech/lightwallet-nodes) - os servidores consultados pelas carteiras leves
- [Guia de mineração do Zcash](/using-zcash/zcash-mining-guide) - mineração com seu próprio nó

## Aprendizado adicional

- [O livro Zebra](https://zebra.zfnd.org)
- [Zebra no GitHub](https://github.com/ZcashFoundation/zebra/)
- [Requisitos do sistema](https://zebra.zfnd.org/user/requirements.html)
