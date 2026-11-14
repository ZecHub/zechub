<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Mining_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guia de mineração de Zcash: como entrar em uma pool de mineração com hardware pessoal

> Aponte sua GPU ou ASIC para uma pool, divida o trabalho com outros mineradores e receba pagamentos regulares em ZEC, em vez de esperar anos para encontrar um bloco sozinho.

## Resumo

* O Zcash usa a prova de trabalho Equihash. Os ASICs dominam a rede, então as GPUs servem principalmente para hobbistas e testes.
* A mineração solo raramente encontra um bloco em configurações pequenas. Uma pool combina o hashrate e paga a você uma parte de cada bloco que encontra.
* Você precisa de três coisas: um endereço de carteira Zcash para os pagamentos, hardware de mineração e software de mineração (ou o painel integrado do ASIC).
* As pools diferem na taxa (cerca de 0-2%), no método de pagamento (PPLNS, PPS+), no pagamento mínimo e na localização dos servidores.
* Verifique a rentabilidade primeiro: o preço da eletricidade, o custo do hardware e o preço do ZEC decidem se a mineração compensa.
* Caminho avançado: rode seu próprio nó Zebra e minere usando o RPC do `getblocktemplate`.

## Explicação principal

A mineração é a forma como novos blocos do Zcash são criados. Os mineradores competem para resolver um quebra-cabeça Equihash; a primeira solução válida adiciona o próximo bloco e ganha a recompensa do bloco. Quanto mais hashrate você contribui, mais vezes você ganha, mas, contra a rede atual, um único equipamento doméstico quase nunca ganharia sozinho.

Uma pool de mineração resolve isso. A pool entrega a cada minerador pedaços menores de trabalho chamados shares. Cada share aceita prova que você contribuiu com hashrate. Quando qualquer participante da pool encontra um bloco, a recompensa é dividida de acordo com as shares, e você é pago automaticamente assim que seu saldo ultrapassa o mínimo da pool.

A configuração tem cinco partes, explicadas passo a passo abaixo:

1. Um endereço de carteira para receber os pagamentos.
2. Hardware: GPUs em um PC ou um ASIC Equihash.
3. Uma conta na pool (ou apenas seu endereço, no caso de pools sem cadastro).
4. Software de mineração apontado para o servidor stratum da pool, com `YOUR_ADDRESS.WORKER_NAME` como nome de usuário.
5. Monitoramento: shares aceitas, hashrate, temperatura e saldo não pago.

## Introdução

O Zcash (ZEC) é uma criptomoeda focada em privacidade que usa o algoritmo de prova de trabalho Equihash para a mineração. Minerar Zcash envolve usar poder computacional para resolver problemas matemáticos complexos, validando transações e protegendo a rede em troca de recompensas em ZEC. Devido à alta dificuldade da rede, a mineração solo não é recomendada para a maioria dos usuários. Entrar em uma pool de mineração é a melhor forma de obter recompensas consistentes, combinando seu poder de hash com o de outros.

Este guia foca na mineração de Zcash usando hardware pessoal (por exemplo, um PC doméstico com GPUs ou ASICs de entrada). Observe que, embora as GPUs ainda possam minerar Zcash, os ASICs são muito mais eficientes e rentáveis em 2026 por causa da dificuldade da rede. Sempre verifique a rentabilidade atual usando ferramentas como o WhatToMine.com, pois fatores como custo da eletricidade, preço do hardware e valor do ZEC afetam a viabilidade. A mineração pode não ser rentável para todos; pesquise a regulamentação local e as tarifas de energia (procure ficar abaixo de US$ 0,08/kWh).


## Requisitos

### Hardware
- **Mineração com GPU (configuração pessoal recomendada para iniciantes):**
  - GPUs NVIDIA ou AMD com pelo menos 4 GB de VRAM (por exemplo, NVIDIA GTX 1070, RTX 3060; AMD RX 580 ou superior).
  - Uma placa-mãe compatível, uma fonte suficiente (pelo menos 750 W para várias GPUs) e boa refrigeração para evitar superaquecimento.
  - Rigs com várias GPUs são comuns para obter hashrates melhores (por exemplo, 6 GPUs podem atingir 1-2 kSol/s).
- **Mineração com ASIC (mais eficiente, mas com custo maior):**
  - ASICs compatíveis com Equihash, como o Bitmain Antminer Z15 (420 kSol/s) ou o Innosilicon A9 (50 kSol/s).
  - Eles são mais barulhentos, mais quentes e consomem mais energia (por exemplo, 1500 W ou mais); são adequados para espaços dedicados. Compre de fontes confiáveis, como Bitmain.com ou revendedores (Blockware Mining).
- **Geral:** Internet estável e um computador para configuração e monitoramento. Os ASICs dominam a rede (~13 GSol/s de hashrate total em 2026), o que torna a mineração com GPU menos competitiva, mas ainda possível para hobbistas.

### Software
- **Sistema operacional:** Windows 10/11, Linux (Ubuntu recomendado pela estabilidade).
- **Software de mineração:**
  - Para GPUs: lolMiner (compatível com AMD/NVIDIA), GMiner ou miniZ (focado em NVIDIA). Baixe dos repositórios oficiais no GitHub (por exemplo, github.com/Lolliedieb/lolMiner-releases).
  - Para ASICs: use o firmware/painel integrado do fabricante (por exemplo, a interface web da Bitmain).
- **Carteira:** Uma carteira Zcash para receber os pagamentos. Recomendadas:
  - Blindadas (privadas): ZODL Wallet, Zingo (celular/desktop), Zkool (celular/desktop).
  - Transparentes (mais fáceis, mas menos privadas): Edge Wallet.
  - Baixe em [carteiras](https://zechub.wiki/wallets). Gere um endereço blindado (começa com "zs") para ter privacidade, se a pool for compatível.

### Outros
- Eletricidade: calcule os custos. As GPUs consomem 150-300 W por placa; os ASICs, 1000 W ou mais.
- Antivírus: desative durante a configuração, pois ele pode identificar os programas de mineração como ameaças.

## Guia passo a passo para entrar em uma pool de mineração

### Passo 1: configure sua carteira Zcash
1. Baixe e instale uma carteira a partir do site oficial do Zcash [carteiras](https://zechub.wiki/wallets).
2. Crie uma nova carteira e faça backup da sua frase semente com segurança.
3. Gere um endereço de recebimento (de preferência blindado, para ter privacidade). Anote-o, por exemplo, `zs1exampleaddress...`.
4. Se você usar um endereço transparente (começa com "t"), é mais simples, mas oferece menos privacidade.

### Passo 2: prepare seu hardware
- Para GPUs:
  1. Instale as GPUs no seu PC e atualize os drivers (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Faça overclock se tiver experiência (use o MSI Afterburner para estabilidade; procure +100-200 no core clock e -500 na memória para eficiência).
- Para ASICs:
  1. Conecte o ASIC à energia e à Ethernet.
  2. Encontre o endereço IP dele usando uma ferramenta como o Advanced IP Scanner ou o app do fabricante.
  3. Acesse o painel web (por exemplo, digite o IP no navegador; login padrão: root/root para Bitmain).

**Aviso:** Garanta ventilação adequada; a mineração gera calor. Comece pequeno para testar.

### Passo 3: escolha uma pool de mineração e entre nela
As pools de mineração distribuem o trabalho e dividem as recompensas com base no hashrate que você contribui. Escolha com base nas taxas (0-2%), no pagamento mínimo (0,01-0,1 ZEC), na localização (ping baixo) e na confiabilidade.

**Pools recomendadas (com base em hashrate, taxas e avaliações):**
- **2Miners (zec.2miners.com)**: taxa de 1%, pagamento PPLNS, compatível com GPU/ASIC/NiceHash. Hashrate alto (~1,17 GSol/s), servidores confiáveis.
- **F2Pool (zec.f2pool.com)**: taxa de 2%, pagamento PPS+, suporte a várias moedas. Pool grande (~2,57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: taxa de 2% (PPS+), painel fácil de usar, servidores globais.
- **AntPool (zec.antpool.com)**: taxa de 1%, da Bitmain, boa para ASICs (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: pool de mineração profissional de Zcash da Foundry Digital. Usa pagamentos PPLNS, oferece acompanhamento transparente das recompensas e suporte de nível empresarial. Mais indicada para mineradores institucionais e de ASIC em grande escala; exige verificação da conta.
- **Sovright (mining.sovright.com)**: uma pool de Zcash construída sobre o Stratum V2, atualmente funcionando como testnet pública. Ainda não há pagamentos reais em ZEC, então trate-a como uma forma de testar sua configuração, e não como fonte de ganhos. Veja a seção dedicada abaixo para mais detalhes.
- Outras: Kryptex Pool, Luxor (consulte poolwatch.io/coin/zcash para estatísticas em tempo real).

1. Acesse o site da pool e crie uma conta (com e-mail, ou sem cadastro em algumas, como a 2Miners).
2. Adicione o endereço da sua carteira Zcash nas configurações para receber os pagamentos.
3. Anote o servidor stratum da pool (por exemplo, zec.2miners.com:1010) e a porta.

### Passo 4: instale e configure o software de mineração
- Para GPUs (exemplo: lolMiner no Windows/Linux):
  1. Baixe o lolMiner em GitHub (versão mais recente, por exemplo, 1.88).
  2. Extraia para uma pasta.
  3. Crie um arquivo batch (start.bat) com a configuração:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Substitua `YOUR_WALLET_ADDRESS` pelo seu endereço ZEC.
     - `WORKER_NAME`: um nome para o seu rig (por exemplo, Rig1).
     - Para servidores na Europa: eu.zec.2miners.com:1010.
  4. Execute o arquivo batch. Ele vai se conectar à pool e começar a minerar.
- Para ASICs (exemplo: Bitmain Antminer):
  1. Faça login no painel web.
  2. Vá para Miner Configuration.
  3. Adicione os dados da pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Nome de usuário: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Senha: x (ou em branco).
  4. Salve e reinicie o minerador.
- Para outros softwares (por exemplo, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Teste:** Deixe rodando por 10-15 minutos; verifique no console as shares aceitas e o hashrate.

### Passo 5: comece a minerar e monitore
1. Inicie o minerador: ele vai se conectar à pool e começar a enviar shares.
2. Monitore por meio de:
   - Painel da pool: digite o endereço da sua carteira para ver o hashrate, o saldo não pago e as estatísticas.
   - Console do software: fique atento a erros e à temperatura (mantenha abaixo de 80 graus C).
   - Ferramentas: use o HiveOS ou o SimpleMining OS para gerenciar o rig remotamente.
3. Pagamentos: a maioria das pools paga automaticamente quando você atinge o mínimo (por exemplo, 0,05 ZEC). Verifique as regras da pool.

   
![Configuração de monitoramento de mineração de Zcash](/content-images/zcashMining-5ca0019c17.webp)


### Monitoramento da Foundry Zcash Pool

Para usuários da Foundry Zcash Pool:

- Monitore o desempenho do minerador pelo painel da pool Foundry.
- Verifique:
  - Workers ativos
  - Hashrate informado
  - Shares aceitas
  - Recompensas estimadas
  - Status dos pagamentos

Como a Foundry usa um modelo de recompensa PPLNS, as recompensas de mineração dependem das shares contribuídas ao longo da janela de recompensa da pool, e não apenas do hashrate instantâneo.

Práticas de monitoramento recomendadas:
- Compare o hashrate do painel do ASIC com o hashrate informado pela Foundry.
- Investigue shares rejeitadas, shares obsoletas ou instabilidade de conexão.
- Mantenha uma conexão de rede estável, pois o tempo fora do ar reduz as shares enviadas e as possíveis recompensas.


## Sovright: pool de testnet e rede de retransmissão

A Sovright (sovright.com) opera uma pool de mineração Stratum V2 e uma rede separada de retransmissão de blocos. Elas fazem trabalhos diferentes, então são tratadas separadamente abaixo.

### Pool de mineração (mining.sovright.com)

A pool da Sovright roda em uma testnet pública do Zcash (NU6, Stratum V2), não na mainnet. A testnet não paga ZEC real. Use-a para testar a configuração do seu minerador, não para ganhar.

- Não é preciso ter conta para começar. Aponte um minerador Equihash de CPU ou ASIC para a pool, e suas shares aparecem em um painel ao vivo.
- A Sovright também publica um proxy Stratum V2 de código aberto para mineradores que querem escolher seus próprios templates de bloco em vez de apenas aceitar os trabalhos da pool:

  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Aponte seu minerador para o proxy em vez de diretamente para a pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  usando um nome de worker como `yourname.rig1`.
- A página de transparência da Sovright declara uma política de "incluir todas" para transações blindadas, ao contrário de algumas pools que as filtram. Cada bloco recebe um atestado assinado, para que a política possa ser verificada de forma independente.
- Crie uma conta em mining.sovright.com (login com Google ou e-mail) para acompanhar seus próprios workers em vez dos dados de exemplo do painel.

### Rede de retransmissão (relay.sovright.com)

A Sovright também opera, separadamente, uma rede pública de retransmissão de blocos na mainnet do Zcash. Quando uma pool encontra um bloco, a velocidade com que esse bloco chega ao resto da rede determina com que frequência ele fica órfão, ou seja, perde a corrida de propagação e a recompensa dele é perdida. A rede de retransmissão encaminha os blocos entre quatro regiões usando retransmissão de blocos compactos com correção de erros antecipada.

O painel público mostra o efeito ao vivo: as regiões conectadas à rede de retransmissão recebem novos blocos em bem menos da metade do tempo que leva a propagação comum ponto a ponto, e o painel acompanha a taxa de blocos órfãos da rede ao vivo.

Esta é uma infraestrutura para operadores de pools, não para mineradores individuais. O repositório de código aberto `mining-infra` da Sovright documenta um gateway de retransmissão `submitblock` para distribuir os blocos encontrados na malha mais rápido que o P2P nativo. Para se conectar, entre em contato diretamente com a Sovright (support@sovright.com) para obter os endereços dos pares de retransmissão e uma chave de autenticação.


## Minerando com seu próprio nó Zebra

Tudo o que foi descrito acima aponta seu minerador para a pool de outra pessoa. O outro caminho é rodar um nó você mesmo e fazer seu software de mineração pedir trabalho a ele. Desde que o zcashd foi descontinuado, em 18 de julho de 2026, isso significa [Zebra](/zcash-tech/zebra-full-node), o nó de que esta seção trata.

A parte do Zebra é pequena e específica: ele monta templates de bloco e aceita blocos resolvidos pela sua interface RPC. O hashing é feito pelo software de mineração, e dividir as recompensas entre vários mineradores é trabalho do software de pool. Se a mineração sozinha vai algum dia encontrar um bloco depende da sua parcela do hashrate da rede, algo que esta seção não tenta estimar. É por isso que a introdução desta página não recomenda a mineração solo para a maioria dos usuários.

Os passos seguem duas páginas do Zebra Book, [Mining Zcash with Zebra](https://zebra.zfnd.org/user/mining.html) e [Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html), como estavam em 8 de outubro de 2026. Nomes de chaves e valores padrão mudam entre versões, então consulte o Book antes de confiar em um deles.

### Defina o endereço que recebe a recompensa

Crie um arquivo de configuração com as configurações padrão e depois edite-o:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Um endereço de minerador é obrigatório ([Book: Miner address](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

O Zebra aceita um endereço transparente P2PKH ou P2SH, um endereço Sapling ou um Unified Address. Para um Unified Address com mais de um receptor, o Book diz que o Zebra paga um único receptor, "preferindo Orchard, depois Sapling, depois o transparente".

Duas chaves opcionais ficam na mesma seção `[mining]`:

| Chave | O que faz | Limite |
|---|---|---|
| `extra_coinbase_data` | Adiciona uma etiqueta pública, como o nome de uma pool, à entrada coinbase de cada bloco que você minerar, depois do marcador do próprio Zebra ([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 bytes. Acima disso, "o Zebra se recusa a iniciar" |
| `miner_memo` | Anexa um memorando blindado à saída da recompensa. Ao contrário de `extra_coinbase_data`, ele não é público: só quem tem uma chave de visualização do endereço receptor pode lê-lo ([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 bytes. Só funciona quando a recompensa vai para um receptor blindado. Com um endereço transparente, ele "silenciosamente não tem efeito" |

### Abra a porta RPC

O software de mineração se comunica com o Zebra via JSON-RPC, que fica desligado até você informar um endereço em que ele deve escutar ([Book: RPC section](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 é a porta RPC padrão na Mainnet. `127.0.0.1` mantém a porta acessível somente a partir da mesma máquina.

Desde o Zebra 2.0.0, um cookie protege a porta RPC, um método parecido com o que o zcashd usava. O Zebra grava o cookie quando o endpoint RPC inicia e o apaga ao desligar. Por padrão, o arquivo fica no diretório de cache do Zebra, por exemplo `/home/user/.cache/zebra/.cookie` no Linux, e contém uma linha:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` muda o local do arquivo. `rpc.enable_cookie_auth = false` desativa a verificação e, com ela, a única autenticação que a porta RPC tem: qualquer coisa que consiga alcançar a porta poderá então chamá-la.

### Inicie o Zebra e deixe-o sincronizar

```bash
zebrad
```

O Zebra lê a configuração do local padrão. Passe `-c /path/to/zebrad.toml` para usar outro arquivo. Espere a sincronização terminar. O log mostra `sync_percent=100.000%` quando ela termina ([Book: Running zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Full Node](/zcash-tech/zebra-full-node) trata de hardware e espaço em disco.

### Verifique com getblocktemplate

`getblocktemplate` é a chamada que o software de mineração faz para obter trabalho, então é também o teste mais rápido ([Book: Testing the setup](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Coloque o conteúdo do seu arquivo de cookie no lugar de `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Uma configuração funcionando retorna um objeto `result` com os campos de que um minerador precisa, entre eles `previousblockhash`, `coinbasetxn`, `target` e `height`. Se você definiu `extra_coinbase_data`, o Book explica como encontrar sua etiqueta em `coinbasetxn.data`.

### Aponte seu software de mineração para ele

Informe ao seu software de mineração ou de pool o endpoint RPC, `127.0.0.1:8232`, e o nome de usuário e a senha do cookie. O Book diz que o Zebra "suporta os métodos RPC necessários para rodar a maioria dos softwares de pool de mineração" ([Book: Run a mining pool](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Duas observações do Book antes de você escolher o software:

- **O s-nomp serve apenas para testes.** O Book chama sua configuração do s-nomp de "experimental" e diz que o s-nomp "não é compatível com NU5, então algumas funções de mineração ficam desativadas". O [guia da Testnet](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) acrescenta que o s-nomp "não foi oficialmente atualizado para a NU5 nem para atualizações da rede posteriores" e indica aos mineradores em produção softwares de pool compatíveis com as atualizações atuais.
- **O Zebra vem com uma stack pronta.** O repositório do Zebra tem uma configuração Docker Compose em [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) que inicia o Zebra junto com uma pool de mineração e, se você pedir, um minerador de CPU. A pool incluída é o s-nomp, e ela inicia na Testnet a menos que você mude isso, então trate-a como uma forma de aprender como as peças funcionam.

### O caminho com Docker

O caminho mais curto do Book é a imagem Docker do `zfnd/zebra`, com o endereço e a porta RPC passados como variáveis de ambiente ([Book: Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html)). O comando abaixo é o do Book com uma mudança: ele publica a porta RPC somente no endereço de loopback do host, para que outras máquinas não consigam alcançá-la.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Isso inicia um nó na Mainnet, publica a porta P2P (8233) no host Docker e torna a porta RPC (8232) acessível somente a partir do próprio host. Exiba o cookie com:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Mantenha `0.0.0.0` em `ZEBRA_RPC__LISTEN_ADDR`.** Esse é o endereço em que o Zebra escuta dentro do contêiner. O Docker encaminha uma porta publicada para a interface de rede do próprio contêiner, então um Zebra escutando em `127.0.0.1` dentro do contêiner não receberia a conexão, nem mesmo a partir do host. É o `127.0.0.1:` na frente de `-p` que mantém a porta fora da rede.
- **O comando do Book** publica a porta RPC com `-p 8232:8232`, o que a abre em todas as interfaces de rede do host.
- **Para praticar na Testnet**, adicione `-e ZEBRA_NETWORK__NETWORK="Testnet"`, defina `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, publique `-p 18233:18233` e `-p 127.0.0.1:18232:18232` e informe um endereço de Testnet. Um endereço de Mainnet impede o Zebra de iniciar na Testnet, e vice-versa.

O pagamento aos mineradores e o gerenciamento da carteira estão fora do escopo desta seção. Para a parte da carteira, veja [Zallet](/zcash-tech/zallet).

## Dicas e boas práticas
- **Rentabilidade:** Use calculadoras como whattomine.com/coins/166-zec-equihash. Exemplo: uma RTX 3060 (~300 Sol/s) ganha ~0,001 ZEC/dia a US$ 50/ZEC, menos ~US$ 0,50 de eletricidade.
- **Privacidade:** Use pools blindadas, se disponíveis; evite reutilizar endereços.
- **Segurança:** Use senhas fortes; ative a 2FA nas pools e carteiras. Nunca compartilhe chaves privadas.
- **Solução de problemas:** Se não houver shares, verifique o firewall, o antivírus ou erros de configuração. Participe de fóruns como forum.zcashcommunity.com ou o r/zec no Reddit.
- **Alternativas:** Se não for rentável, considere a mineração em nuvem ou o staking de outras moedas.
- **Nota ambiental:** A mineração consome energia; use fontes renováveis, se possível.
- **Atualizações:** O Zcash pode evoluir (por exemplo, uma possível mudança para PoS); acompanhe as novidades em z.cash.
