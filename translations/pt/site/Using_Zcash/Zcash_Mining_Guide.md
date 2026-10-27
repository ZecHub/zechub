# Guia de mineração do Zcash: participe de um pool de mineração com hardware pessoal

## Introdução

O Zcash (ZEC) é uma criptomoeda focada em privacidade que usa o algoritmo de prova de trabalho Equihash para mineração. Minerar Zcash envolve usar poder computacional para resolver problemas matemáticos complexos, validar transações e proteger a rede em troca de recompensas em ZEC. Devido à alta dificuldade da rede, a mineração solo não é recomendada para a maioria dos usuários. Participar de um pool de mineração é a melhor forma de obter recompensas consistentes combinando seu poder de hash com o de outras pessoas.

Este guia se concentra na mineração de Zcash com hardware pessoal (por exemplo, um PC doméstico com GPUs ou ASICs de nível básico). Observe que, embora as GPUs ainda possam minerar Zcash, os ASICs são muito mais eficientes e lucrativos em 2026 devido à dificuldade da rede. Sempre verifique a lucratividade atual usando ferramentas como WhatToMine.com, pois fatores como custos de eletricidade, preços de hardware e valor do ZEC afetam a viabilidade. A mineração pode não ser lucrativa para todos; pesquise as regulamentações locais e as tarifas de energia (busque menos de US$ 0,08/kWh).


## Requisitos

### Hardware
- **Mineração com GPU (configuração pessoal recomendada para iniciantes):**
  - GPUs NVIDIA ou AMD com pelo menos 4 GB de VRAM (por exemplo, NVIDIA GTX 1070, RTX 3060; AMD RX 580 ou superior).
  - Uma placa-mãe compatível, fonte de alimentação suficiente (pelo menos 750 W para várias GPUs) e boa refrigeração para evitar superaquecimento.
  - Rigs com várias GPUs são comuns para obter melhores taxas de hash (por exemplo, 6 GPUs podem atingir 1-2 kSol/s).
- **Mineração com ASIC (mais eficiente, mas com custo mais alto):**
  - ASICs compatíveis com Equihash, como Bitmain Antminer Z15 (420 kSol/s) ou Innosilicon A9 (50 kSol/s).
  - Eles são mais barulhentos, mais quentes e consomem mais energia (por exemplo, mais de 1500 W); adequados para espaços dedicados. Compre de fontes confiáveis, como Bitmain.com ou revendedores (Blockware Mining).
- **Geral:** Internet estável e um computador para configuração/monitoramento. Os ASICs dominam a rede (~13 GSol/s de hashrate total em 2026), tornando a mineração com GPU menos competitiva, mas ainda possível para entusiastas.

### Software
- **Sistema operacional:** Windows 10/11, Linux (Ubuntu recomendado pela estabilidade).
- **Software de mineração:**
  - Para GPUs: lolMiner (suporta AMD/NVIDIA), GMiner ou miniZ (focado em NVIDIA). Baixe dos repositórios oficiais do GitHub (por exemplo, github.com/Lolliedieb/lolMiner-releases).
  - Para ASICs: Use o firmware/painel integrado do fabricante (por exemplo, a interface web da Bitmain).
- **Carteira:** Uma carteira de Zcash para receber pagamentos. Recomendadas:
  - Blindada (privada): ZODL Wallet, Zingo (celular/desktop), Zkool (celular/desktop).
  - Transparente (mais simples, mas menos privada): Edge Wallet, Zecwallet Lite.
  - Baixe em [carteiras](https://zechub.wiki/wallets). Gere um endereço blindado (começa com "zs") para privacidade, se o pool oferecer suporte.

### Outros
- Eletricidade: Calcule os custos. As GPUs usam 150-300 W por placa; os ASICs, mais de 1000 W.
- Antivírus: Desative-o durante a configuração, pois ele pode sinalizar mineradores como ameaças.

## Guia passo a passo para participar de um pool de mineração

### Passo 1: Configure sua carteira de Zcash
1. Baixe e instale uma carteira no site oficial do Zcash [carteiras](https://zechub.wiki/wallets).
2. Crie uma nova carteira e faça backup seguro da sua frase semente.
3. Gere um endereço de recebimento (preferencialmente blindado para privacidade). Anote-o, por exemplo, `zs1exampleaddress...`.
4. Se usar um endereço transparente (começa com "t"), ele é mais simples, mas oferece menos privacidade.

### Passo 2: Prepare seu hardware
- Para GPUs:
  1. Instale as GPUs no seu PC e atualize os drivers (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Faça overclock se tiver experiência (use MSI Afterburner para estabilidade; busque +100-200 de clock do núcleo, -500 de memória para eficiência).
- Para ASICs:
  1. Conecte o ASIC à alimentação e à Ethernet.
  2. Encontre o endereço IP dele usando uma ferramenta como Advanced IP Scanner ou o app do fabricante.
  3. Acesse o painel web (por exemplo, insira o IP no navegador; login padrão: root/root para Bitmain).

**Aviso:** Garanta ventilação adequada; a mineração gera calor. Comece em pequena escala para testar.

### Passo 3: Escolha e participe de um pool de mineração
Os pools de mineração distribuem o trabalho e compartilham recompensas com base no hashrate que você contribui. Escolha com base nas taxas (0-2%), mínimo de pagamento (0,01-0,1 ZEC), localização (ping baixo) e confiabilidade.

**Pools recomendados (com base em hashrate, taxas e avaliações):**
- **2Miners (zec.2miners.com)**: taxa de 1%, pagamento PPLNS, oferece suporte a GPU/ASIC/NiceHash. Hashrate alto (~1,17 GSol/s), servidores confiáveis.
- **F2Pool (zec.f2pool.com)**: taxa de 2%, pagamento PPS+, suporte a várias moedas. Pool grande (~2,57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: taxa de 2% (PPS+), painel fácil de usar, servidores globais.
- **AntPool (zec.antpool.com)**: taxa de 1%, da Bitmain, boa para ASICs (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Pool de mineração profissional de Zcash da Foundry Digital. Usa pagamentos PPLNS, oferece acompanhamento transparente de recompensas e suporte de nível empresarial. Mais adequada para mineradores ASIC institucionais e de grande escala; requer verificação de conta.
- **Sovright (mining.sovright.com)**: Um pool de Zcash construído com Stratum V2, atualmente operando como uma testnet pública. Ainda não há pagamentos reais em ZEC, portanto trate-o como uma forma de testar sua configuração, e não como uma fonte de ganhos. Consulte a seção dedicada abaixo para obter detalhes.
- Outras: Kryptex Pool, Luxor (consulte poolwatch.io/coin/zcash para estatísticas em tempo real).

1. Visite o site do pool e crie uma conta (e-mail ou sem registro para alguns, como 2Miners).
2. Adicione o endereço da sua carteira de Zcash nas configurações de pagamentos.
3. Anote o servidor stratum e a porta do pool (por exemplo, zec.2miners.com:1010).

### Passo 4: Instale e configure o software de mineração
- Para GPUs (exemplo: lolMiner no Windows/Linux):
  1. Baixe o lolMiner do GitHub (versão mais recente, por exemplo, 1.88).
  2. Extraia para uma pasta.
  3. Crie um arquivo batch (start.bat) com a configuração:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Substitua `YOUR_WALLET_ADDRESS` pelo seu endereço ZEC.
     - `WORKER_NAME`: Um nome para o seu rig (por exemplo, Rig1).
     - Para servidores da UE: eu.zec.2miners.com:1010.
  4. Execute o arquivo batch. Ele se conectará ao pool e iniciará a mineração.
- Para ASICs (exemplo: Bitmain Antminer):
  1. Faça login no painel web.
  2. Acesse Miner Configuration.
  3. Adicione os detalhes do pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Nome de usuário: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Senha: x (ou em branco).
  4. Salve e reinicie o minerador.
- Para outros softwares (por exemplo, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Teste:** Execute por 10-15 minutos; verifique o console em busca de shares aceitos e hashrate.

### Passo 5: Inicie a mineração e monitore
1. Inicie o minerador: ele se conectará ao pool e começará a enviar shares.
2. Monitore por meio de:
   - Painel do pool: Insira o endereço da sua carteira para ver o hashrate, saldo não pago e estatísticas.
   - Console do software: Observe erros e a temperatura (mantenha abaixo de 80 graus C).
   - Ferramentas: Use HiveOS ou SimpleMining OS para gerenciamento remoto de rigs.
3. Pagamentos: A maioria dos pools paga automaticamente quando você atinge o mínimo (por exemplo, 0,05 ZEC). Consulte as regras do pool.

   
![Configuração do monitoramento de mineração do Zcash](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Pool de testnet e rede de relay

A Sovright (sovright.com) opera um pool de mineração Stratum V2 e uma rede separada de relay de blocos. Eles desempenham funções diferentes, portanto são abordados separadamente abaixo.

### Pool de mineração (mining.sovright.com)

O pool da Sovright funciona em uma testnet pública do Zcash (NU6, Stratum V2), não na mainnet. A testnet não paga ZEC real. Use-o para testar a configuração do seu minerador, não para ganhar.

- Não é necessária uma conta para começar. Direcione um minerador Equihash de CPU ou ASIC para o pool, e seus shares aparecerão em um painel ao vivo.
- A Sovright também publica um proxy Stratum V2 de código aberto para mineradores que desejam escolher seus próprios modelos de bloco, em vez de apenas aceitar os trabalhos do pool:

### Monitoramento da Foundry Zcash Pool

Para usuários da Foundry Zcash Pool:

- Monitore o desempenho do minerador por meio do painel do pool da Foundry.
- Verifique:
  - Trabalhadores ativos
  - Hashrate informado
  - Shares aceitos
  - Recompensas estimadas
  - Status do pagamento

Como a Foundry usa um modelo de recompensa PPLNS, as recompensas de mineração dependem dos shares contribuídos durante a janela de recompensa do pool, e não apenas do hashrate instantâneo.

Práticas recomendadas de monitoramento:
- Compare o hashrate no painel do ASIC com o hashrate informado pela Foundry.
- Investigue shares rejeitados, shares obsoletos ou instabilidade na conexão.
- Mantenha uma conexão de rede estável, pois o tempo de inatividade reduz os shares enviados e as recompensas potenciais.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Aponte seu minerador para o proxy, em vez de diretamente para o pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  usando um nome de trabalhador como `yourname.rig1`.
- A página de transparência da Sovright declara uma política de "incluir todas" para transações blindadas, ao contrário de alguns pools que as filtram. Cada bloco recebe uma atestação assinada para que a política possa ser verificada de forma independente.
- Crie uma conta em mining.sovright.com (login com Google ou e-mail) para acompanhar seus próprios trabalhadores, em vez dos dados de exemplo do painel.

### Rede de relay (relay.sovright.com)

A Sovright opera separadamente uma rede pública de relay de blocos na mainnet do Zcash. Quando um pool encontra um bloco, a rapidez com que esse bloco chega ao restante da rede determina com que frequência ele é órfão, ou seja, perde a corrida de propagação e sua recompensa é perdida. O relay encaminha blocos por quatro regiões usando relay de blocos compactos com correção de erros de encaminhamento.

O painel público mostra o efeito ao vivo: regiões conectadas ao relay veem novos blocos em muito menos da metade do tempo que a propagação simples ponto a ponto leva, e o painel acompanha a taxa de blocos órfãos da rede em tempo real.

Esta é uma infraestrutura para operadores de pools, não para mineradores individuais. O repositório de código aberto `mining-infra` da Sovright documenta um gateway de relay de `submitblock` para distribuir blocos encontrados pela malha mais rapidamente do que o P2P nativo. Para se conectar, entre em contato diretamente com a Sovright (support@sovright.com) para obter endereços de pares de relay e uma chave de autenticação.


## Mineração usando seu próprio nó do Zebra

Tudo o que foi apresentado acima aponta seu minerador para o pool de outra pessoa. A outra opção é executar um nó por conta própria e fazer com que seu software de mineração peça trabalho a ele. Como o zcashd foi descontinuado em 18 de julho de 2026, isso significa [Zebra](/zcash-tech/zebra-full-node), o nó abordado nesta seção.

A função do Zebra é pequena e específica: ele cria modelos de bloco e aceita blocos resolvidos por sua interface RPC. O hashing é feito pelo software de mineração, e o compartilhamento de recompensas entre vários mineradores é tarefa do software de pool. A possibilidade de a mineração solo encontrar um bloco depende da sua parcela do hashrate da rede, algo que esta seção não tenta estimar. É por isso que a introdução desta página não recomenda a mineração solo para a maioria dos usuários.

Os passos seguem duas páginas do Livro do Zebra, [Mineração de Zcash com Zebra](https://zebra.zfnd.org/user/mining.html) e [Mineração com Zebra no Docker](https://zebra.zfnd.org/user/mining-docker.html), como estavam em 8 de outubro de 2026. Os nomes das chaves e os valores padrão mudam entre versões, portanto consulte o Livro antes de depender de uma delas.

### Defina o endereço que recebe a recompensa

Crie um arquivo de configuração com as definições padrão e depois edite-o:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

É necessário um endereço de minerador ([Livro: Endereço do minerador](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

O Zebra aceita um endereço P2PKH ou P2SH transparente, um endereço Sapling ou um Unified Address. Para um Unified Address com mais de um receptor, o Livro diz que o Zebra paga a um único receptor, "preferindo Orchard, depois Sapling e depois transparente".

Duas chaves opcionais ficam na mesma seção `[mining]`:

| Key | O que faz | Limite |
|---|---|---|
| `extra_coinbase_data` | Adiciona uma etiqueta pública, como o nome de um pool, à entrada coinbase de cada bloco que você minera, após o próprio marcador do Zebra ([Livro](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 bytes. Acima disso, "O Zebra se recusa a iniciar" |
| `miner_memo` | Anexa um memorando blindado à saída da recompensa. Ao contrário de `extra_coinbase_data`, ele não é público: apenas alguém com uma chave de visualização do endereço receptor pode lê-lo ([Livro](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 bytes. Ele só funciona quando a recompensa vai para um receptor blindado. Com um endereço transparente, "não tem efeito silenciosamente" |

### Abra a porta RPC

O software de mineração se comunica com o Zebra por JSON-RPC, que permanece desativado até que você informe um endereço no qual ele deve escutar ([Livro: Seção RPC](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 é a porta RPC padrão na Mainnet. `127.0.0.1` mantém a porta acessível apenas pela mesma máquina.

Desde o Zebra 2.0.0, um cookie protege a porta RPC, um método semelhante ao usado pelo zcashd. O Zebra grava o cookie quando o endpoint RPC é iniciado e o exclui ao ser encerrado. Por padrão, o arquivo fica no diretório de cache do Zebra, por exemplo `/home/user/.cache/zebra/.cookie` no Linux, e contém uma linha:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` move o arquivo. `rpc.enable_cookie_auth = false` desativa a verificação e, com ela, a única autenticação da porta RPC: qualquer coisa que possa alcançar a porta poderá então chamá-la.

### Inicie o Zebra e deixe-o sincronizar

```bash
zebrad
```

O Zebra lê a configuração do local padrão. Passe `-c /path/to/zebrad.toml` para usar outro arquivo. Aguarde a sincronização terminar. O registro mostra `sync_percent=100.000%` quando ela termina ([Livro: Executando o zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Nó integral Zebra](/zcash-tech/zebra-full-node) aborda hardware e espaço em disco.

### Verifique com getblocktemplate

`getblocktemplate` é a chamada que o software de mineração faz para obter trabalho, portanto também é o teste mais rápido ([Livro: Testando a configuração](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Coloque o conteúdo do seu arquivo de cookie no lugar de `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Uma configuração funcional retorna um objeto `result` com os campos de que um minerador precisa, entre eles `previousblockhash`, `coinbasetxn`, `target` e `height`. Se você definir `extra_coinbase_data`, o Livro explica como encontrar sua etiqueta em `coinbasetxn.data`.

### Aponte seu software de mineração para ele

Informe ao seu software de mineração ou de pool o endpoint RPC, `127.0.0.1:8232`, e o nome de usuário e a senha do cookie. O Livro diz que o Zebra "suporta os métodos RPC necessários para executar a maioria dos softwares de pool de mineração" ([Livro: Execute um pool de mineração](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Duas observações do Livro antes de escolher um software:

- **s-nomp é apenas para testes.** O Livro chama sua configuração de s-nomp de "experimental" e diz que o s-nomp "não é compatível com NU5, portanto algumas funções de mineração estão desativadas". Seu guia da [Testnet](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) acrescenta que o s-nomp "não foi oficialmente atualizado para NU5 ou atualizações da rede posteriores" e direciona mineradores de produção para software de pool compatível com as atualizações atuais.
- **O Zebra inclui uma stack pronta.** O repositório do Zebra tem uma configuração do Docker Compose em [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) que inicia o Zebra junto com um pool de mineração e, se você solicitar, um minerador de CPU. O pool incluído é o s-nomp e ele inicia na Testnet, a menos que você o altere, portanto trate-o como uma forma de aprender as partes móveis.

### A opção Docker

O caminho mais curto do Livro é a imagem Docker `zfnd/zebra`, com o endereço e a porta RPC passados como variáveis de ambiente ([Livro: Mineração com Zebra no Docker](https://zebra.zfnd.org/user/mining-docker.html)). O comando abaixo é o do Livro com uma alteração: ele publica a porta RPC apenas no endereço de loopback do host, para que outras máquinas não possam alcançá-la.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Isso inicia um nó da Mainnet, publica a porta P2P (8233) no host Docker e torna a porta RPC (8232) acessível apenas pelo próprio host. Imprima o cookie com:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Mantenha `0.0.0.0` em `ZEBRA_RPC__LISTEN_ADDR`.** Esse é o endereço no qual o Zebra escuta dentro do contêiner. O Docker encaminha uma porta publicada para a própria interface de rede do contêiner, portanto um Zebra escutando em `127.0.0.1` dentro do contêiner não receberia a conexão, nem mesmo do host. O `127.0.0.1:` antes de `-p` é o que mantém a porta fora da rede.
- **O comando do Livro** publica a porta RPC com `-p 8232:8232`, o que a abre em todas as interfaces de rede do host.
- **Para praticar na Testnet**, adicione `-e ZEBRA_NETWORK__NETWORK="Testnet"`, defina `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, publique `-p 18233:18233` e `-p 127.0.0.1:18232:18232`, e informe um endereço da Testnet. Um endereço da Mainnet impede o Zebra de iniciar na Testnet, e vice-versa.

O pagamento aos mineradores e a gestão da carteira estão fora do escopo desta seção. Para a parte da carteira, consulte [Zallet](/zcash-tech/zallet).

## Dicas e boas práticas
- **Rentabilidade:** Use calculadoras como whattomine.com/coins/166-zec-equihash. Exemplo: Uma RTX 3060 (~300 Sol/s) rende ~0,001 ZEC/dia a $50/ZEC, menos ~$0,50 de eletricidade.
- **Privacidade:** Use pools blindados, se disponíveis; evite reutilizar endereços.
- **Segurança:** Use senhas fortes; ative 2FA em pools/carteiras. Nunca compartilhe chaves privadas.
- **Solução de problemas:** Se não houver shares, verifique o firewall, o antivírus ou uma configuração incorreta. Participe de fóruns como forum.zcashcommunity.com ou Reddit r/zec.
- **Alternativas:** Se não for rentável, considere mineração em nuvem ou staking de outras moedas.
- **Nota ambiental:** A mineração consome energia; use fontes renováveis, se possível.
- **Atualizações:** O Zcash pode evoluir (por exemplo, uma possível mudança para PoS); consulte z.cash para notícias.
