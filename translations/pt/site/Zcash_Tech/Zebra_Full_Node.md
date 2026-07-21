<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

## Introdução ao Node Zebra

Apresentando o Zebra: revolucionando a infraestrutura de nodes do Zcash com Rust

Conheça o Zebra, uma conquista inovadora como o primeiro node Zcash desenvolvido inteiramente em Rust. Integrado de forma nativa à rede peer-to-peer do Zcash, o Zebra atua como uma ferramenta essencial para fortalecer a resiliência da rede. Por meio de suas funções principais de validar e transmitir transações, além de manter meticulosamente o estado da blockchain do Zcash, o Zebra contribui para uma infraestrutura de rede mais descentralizada.

## Vantagens em relação à implementação do node Zcashd
Em contraste com o node Zcash original, zcashd, que tem sua origem no código-base fundamental do Bitcoin e é desenvolvido pela Electric Coin Company, nossa implementação se destaca como uma entidade autônoma. Desenvolvido do zero com foco em segurança e eficiência, o Zebra aproveita o poder da linguagem Rust, segura em termos de memória.

Apesar de suas origens distintas, tanto o zcashd quanto o Zebra seguem o mesmo protocolo, facilitando uma comunicação fluida e a interoperabilidade entre eles. Essa inovação não apenas expande o ecossistema Zcash, mas também estabelece um novo padrão para o desenvolvimento de nodes de blockchain.

## Instruções para o Zebra Launcher

Você pode executar o Zebra usando nossa imagem Docker ou pode compilá-lo manualmente. Consulte a seção Requisitos do Sistema.

### Uso com Docker:

Para executar facilmente nossa versão mais recente e sincronizá-la até a ponta da cadeia, execute o seguinte comando:

```

docker run zfnd/zebra:latest

```

Para instruções mais abrangentes e detalhes aprofundados, consulte nossa [documentação do Docker](https://zebra.zfnd.org/user/docker.html).

### Compilando o Zebra:

A compilação do Zebra exige Rust, libclang e um compilador C++.

- Certifique-se de ter a versão estável mais recente do Rust instalada, pois o Zebra é testado exclusivamente com ela.
- As dependências de compilação necessárias incluem:
  - libclang (também conhecido como libclang-dev ou llvm-dev)
  - clang ou outro compilador C++ (como g++ para todas as plataformas ou Xcode para macOS)
  - protoc (compilador Protocol Buffers) com a flag *--experimental_allow_proto3_optional*, introduzida no Protocol Buffers v3.12.0 (lançado em 16 de maio de 2020).



### Dependências no Arch:

Depois de garantir que as dependências foram atendidas, prossiga com a compilação e instalação do Zebra usando o seguinte comando:

```

cargo install --locked zebrad

```

Inicie o Zebra executando:

```
zebrad start

```


## Configurações e recursos opcionais:


### - Inicializando o arquivo de configuração:

  - Gere um arquivo de configuração usando o comando:
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - O arquivo *zebrad.toml* gerado será colocado no diretório padrão de preferências do Linux. Para os locais padrão de outros sistemas operacionais, consulte nossa documentação.



### - Configurando barras de progresso:

  - Configure *tracing.progress_bar* no seu *zebrad.toml* para exibir métricas cruciais no terminal usando barras de progresso. Observação: existe um problema conhecido em que as estimativas da barra de progresso podem se tornar excessivamente grandes.



### - Configurando mineração:

  - O Zebra pode ser ajustado para mineração especificando um *MINER_ADDRESS* e o mapeamento de portas no Docker. Mais detalhes podem ser encontrados em nossa [documentação de suporte à mineração](https://zebra.zfnd.org/user/mining-docker.html).


### - Recursos personalizados de compilação:

  - Amplie a funcionalidade do Zebra com recursos adicionais do Cargo, como métricas Prometheus, monitoramento Sentry, suporte experimental ao Elasticsearch e muito mais.

  - Combine vários recursos listando-os como parâmetros da flag `--features` durante a instalação.


### Observação: alguns recursos de depuração e monitoramento são desativados em builds de release para otimizar o desempenho.

Para uma lista abrangente de recursos experimentais e voltados a desenvolvedores, consulte nossa [documentação da API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).
 

# Requisitos do sistema e configuração de rede para o Zebra

Para garantir desempenho e confiabilidade ideais, recomendamos os seguintes requisitos de sistema para compilar e executar o zebrad, o revolucionário node Zcash desenvolvido inteiramente em Rust:

### Requisitos do sistema:
- CPU: 4 núcleos de CPU
- RAM: 16 GB
- Espaço em disco: 300 GB de espaço disponível em disco para compilar binários e armazenar o estado em cache da cadeia
- Rede: conexão de rede de 100 Mbps com no mínimo 300 GB de uploads e downloads por mês


Observe que a suíte de testes do Zebra pode levar mais de uma hora para ser concluída, dependendo das especificações da sua máquina. Embora sistemas mais lentos possam conseguir compilar e executar o Zebra, ainda não estabelecemos limites precisos de desempenho por meio de testes.


### Requisitos de disco:
- O Zebra utiliza aproximadamente 300 GB para dados da Mainnet em cache e 10 GB para dados da Testnet em cache. Espere que o uso de disco aumente com o tempo.
- O banco de dados é limpo regularmente, especialmente durante desligamentos ou reinicializações, garantindo a integridade dos dados. Alterações incompletas devido a encerramentos forçados ou panics são revertidas ao reiniciar o Zebra.


### Requisitos de rede e portas:
- O Zebra utiliza as seguintes portas TCP para conexões de entrada e saída:
  - 8233 para Mainnet
  - 18233 para Testnet
- Configurar o Zebra com um listen_addr específico permite anunciar esse endereço para conexões de entrada. Embora as conexões de saída sejam essenciais para a sincronização, as conexões de entrada são opcionais.
- O acesso aos seeders DNS do Zcash é necessário por meio do resolvedor DNS do sistema operacional (normalmente na porta 53).
- Embora o Zebra possa estabelecer conexões de saída em qualquer porta, o zcashd prefere peers nas portas padrão para mitigar ataques DDoS em outras redes.


### Uso típico de rede na Mainnet:
- Sincronização inicial: é necessário um download de 300 GB para a sincronização inicial, com crescimento esperado nos downloads subsequentes.
- Atualizações contínuas: espere uploads e downloads diários variando de 10 MB a 10 GB, dependendo dos tamanhos das transações dos usuários e das solicitações dos peers.
- O Zebra inicia uma sincronização inicial a cada mudança de versão do banco de dados interno, o que pode exigir downloads completos da cadeia durante atualizações de versão.
- Peers com latência de ida e volta de 2 segundos ou menos são preferidos. Se a latência exceder esse limite, envie um ticket para obter assistência.


Ao seguir essas recomendações e configurações, você pode maximizar a eficiência e a eficácia do Zebra dentro da rede Zcash. Caso encontre algum problema ou precise de mais assistência, nossa equipe de suporte está prontamente disponível para oferecer orientação.


Aqui está o link para o guia de instalação do Zebra Node:
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra
