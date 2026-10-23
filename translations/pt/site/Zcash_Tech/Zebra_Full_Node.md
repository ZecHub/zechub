<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Zebra Nó Completo

## Resumo

- Zebra (`zebrad`) é o nó completo Zcash escrito em Rust e mantido pela Zcash Foundation.
- Valida blocos e transações, mantém o estado da cadeia e comunica com outros nós através da rede peer-to-peer.
- Zebra e zcashd implementavam o mesmo protocolo e podiam interoperar. Desde a descontinuação de zcashd, Zebra assume a função de consenso.
- Duas formas de o executar: a imagem Docker `zfnd/zebra` ou uma compilação a partir do código-fonte.
- O hardware recomendado é de 4 núcleos de CPU, 16 GB de RAM e 300 GB de disco. O mínimo é de 2 núcleos e 4 GB de RAM, com os mesmos 300 GB de disco.

## Explicação Essencial

Zebra é o primeiro nó Zcash escrito inteiramente em Rust. Opera na rede peer-to-peer Zcash, onde valida e transmite transações e mantém o estado da blockchain. Ter uma segunda implementação independente torna a infraestrutura da rede menos dependente de uma única base de código.

### Zebra e zcashd

O nó original Zcash, zcashd, foi desenvolvido pela Electric Coin Company a partir da base de código do Bitcoin. Zebra foi escrito de raiz em Rust, uma linguagem segura em termos de memória, com foco na segurança e eficiência.

Ambas as implementações seguem o mesmo protocolo, pelo que podiam comunicar e interoperar. zcashd atingiu a interrupção de fim de suporte em 18 de julho de 2026 e deixou de iniciar, deixando Zebra e Zakura como as implementações de nó em utilização. Consulte [Nós Completos](/zcash-tech/full-nodes) para uma visão mais ampla.

## Executar Zebra

Pode executar Zebra utilizando a imagem Docker ou compilá-lo manualmente. Consulte a secção Requisitos do Sistema.

### Utilização do Docker

Para executar a versão mais recente e sincronizá-la até à ponta da cadeia, execute o seguinte comando:

```

docker run zfnd/zebra:latest

```

Para instruções completas, consulte a [documentação do Docker](https://zebra.zfnd.org/user/docker.html).

### Compilar Zebra

A compilação de Zebra requer Rust, libclang e um compilador C++.

- Certifique-se de que tem instalada a versão estável mais recente do Rust, pois Zebra é testado exclusivamente com ela.
- As dependências de compilação necessárias incluem:
  - libclang (também conhecido como libclang-dev ou llvm-dev)
  - clang ou outro compilador C++ (como g++ para todas as plataformas ou Xcode para macOS)
  - protoc (compilador Protocol Buffers) com a opção *--experimental_allow_proto3_optional*, introduzida no Protocol Buffers v3.12.0 (lançado em 16 de maio de 2020).

### Instalar e Iniciar

Em Linux x86_64 ou aarch64 com glibc 2.34 ou mais recente (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), pode ignorar as dependências de compilação e instalar um binário pré-compilado assinado:

```
cargo binstall zebrad
```

Os mesmos binários são anexados a cada lançamento de GitHub como `zebrad-<version>-<target>.tar.gz`, cada um com uma soma de verificação SHA-256, um atestado Sigstore de proveniência da compilação e uma assinatura Cosign. Em plataformas mais antigas, utilize a imagem Docker ou compile a partir do código-fonte.

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

## Configurações e Funcionalidades Opcionais

### Inicializar o Ficheiro de Configuração

  - Gere um ficheiro de configuração utilizando o comando:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - O ficheiro *zebrad.toml* gerado será colocado no diretório de preferências predefinido do Linux. Para localizações predefinidas em sistemas operativos alternativos, consulte a documentação.

### Configurar Barras de Progresso

  - Configure *tracing.progress_bar* no seu *zebrad.toml* para apresentar métricas importantes no terminal através de barras de progresso. Nota: existe um problema conhecido em que as estimativas das barras de progresso podem tornar-se excessivamente grandes.

### Configurar Mineração

  - Zebra pode ser configurado para mineração especificando um *MINER_ADDRESS* e o mapeamento de portas no Docker. Pode encontrar mais detalhes na [documentação de suporte à mineração](https://zebra.zfnd.org/user/mining-docker.html).

### Funcionalidades de Compilação Personalizadas

  - Expanda a funcionalidade de Zebra com funcionalidades Cargo adicionais, tais como métricas Prometheus, monitorização Sentry, suporte experimental para Elasticsearch e muito mais.

  - Combine várias funcionalidades listando-as como parâmetros da opção `--features` durante a instalação.

  - Algumas funcionalidades de depuração e monitorização são desativadas nas compilações de lançamento para otimizar o desempenho. Para a lista completa de funcionalidades experimentais e para programadores, consulte a [documentação da API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Requisitos do Sistema e Configuração de Rede

### Requisitos Recomendados

- CPU: 4 núcleos de CPU
- RAM: 16 GB
- Espaço em Disco: 300 GB de espaço em disco disponível para compilar binários e armazenar o estado da cadeia em cache
- Rede: ligação de rede de 100 Mbps com um mínimo de 300 GB de carregamentos e transferências por mês

### Requisitos Mínimos

- CPU: 2 núcleos de CPU
- RAM: 4 GB
- Espaço em Disco: 300 GB de espaço em disco disponível

A suite de testes de Zebra pode demorar mais de uma hora a concluir, dependendo das especificações da sua máquina. Sistemas mais lentos conseguem compilar e executar Zebra. Os limites exatos de desempenho não foram estabelecidos através de testes.

### Requisitos de Disco

- Zebra utiliza aproximadamente 300 GB para dados Mainnet em cache e 10 GB para dados Testnet em cache. Espere que a utilização de disco aumente ao longo do tempo.
- A base de dados é limpa periodicamente, bem como ao encerrar ou reiniciar. As alterações são confirmadas através de transações da base de dados. Alterações incompletas causadas por terminação forçada ou um panic são revertidas na próxima vez que Zebra iniciar.

### Requisitos de Rede e Portas

- Zebra utiliza as seguintes portas TCP para ligações de entrada e saída:
  - 8233 para Mainnet
  - 18233 para Testnet
- Configurar Zebra com um listen_addr específico anuncia este endereço para ligações de entrada. As ligações de saída são necessárias para a sincronização; as ligações de entrada são opcionais.
- É necessário acesso aos seeders DNS de Zcash através do resolvedor DNS do sistema operativo (normalmente na porta 53).
- Zebra pode efetuar ligações de saída em qualquer porta. zcashd prefere pares nas portas predefinidas para evitar ser utilizado em ataques DDoS contra outras redes.

### Utilização Típica da Rede Mainnet

- Sincronização Inicial: é necessária uma transferência de 300 GB para a sincronização inicial, e espera-se que este valor aumente.
- Atualizações Contínuas: carregamentos e transferências diárias entre 10 MB e 10 GB, dependendo dos tamanhos das transações dos utilizadores e dos pedidos dos pares.
- Zebra inicia uma sincronização inicial em cada alteração da versão interna da base de dados, o que pode significar uma transferência completa da cadeia durante atualizações de versão.
- São preferidos pares com uma latência de ida e volta de 2 segundos ou menos. Se a latência exceder este limite, abra um ticket no repositório Zebra.

## Erros Comuns

- Dimensionar o disco para as necessidades atuais. O estado Mainnet em cache já se aproxima dos 300 GB e continua a crescer.
- Esperar RPCs de wallet de `zebrad`. As chaves e os saldos estão em [Zallet](https://github.com/zcash/zallet), um programa separado.
- Executar apenas `zebrad` e esperar que as wallets leves se liguem. Esse caminho necessita de um indexador, lightwalletd ou [Zaino](/zcash-tech/zaino).
- Tratar uma resincronização inesperada como uma falha. Uma alteração da versão da base de dados desencadeia uma por definição.

## Páginas Relacionadas

- [Nós Completos](/zcash-tech/full-nodes) - o que faz um nó completo e quais as implementações existentes
- [Zakura Nó](/zcash-tech/zakura-node) - um nó bifurcado de Zebra com sincronização e poda mais rápidas
- [Zaino](/zcash-tech/zaino) - o indexador Rust que serve wallets leves
- [Nós Lightwallet](/zcash-tech/lightwallet-nodes) - os servidores consultados pelas wallets leves
- [Zcash Guia de Mineração](/using-zcash/zcash-mining-guide) - mineração com o seu próprio nó

## Aprendizagem Adicional

- [O Livro Zebra](https://zebra.zfnd.org)
- [Zebra no GitHub](https://github.com/ZcashFoundation/zebra/)
- [Requisitos do Sistema](https://zebra.zfnd.org/user/requirements.html)
