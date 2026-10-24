# Zcash Guia de Mineração: Aderir a uma Pool de Mineração com Hardware Pessoal

## Introdução

Zcash (ZEC) é uma criptomoeda focada na privacidade que utiliza o algoritmo de prova de trabalho Equihash para mineração. Minerar Zcash envolve utilizar poder computacional para resolver problemas matemáticos complexos, validar transações e proteger a rede em troca de recompensas em ZEC. Devido à elevada dificuldade da rede, a mineração a solo não é recomendada para a maioria dos utilizadores. Aderir a uma pool de mineração é a melhor forma de obter recompensas consistentes, combinando o seu poder de hash com o de outros.

Este guia centra-se na mineração de Zcash com hardware pessoal (por exemplo, um PC doméstico com GPUs ou ASICs de nível básico). Tenha em conta que, embora as GPUs ainda consigam minerar Zcash, os ASICs são muito mais eficientes e rentáveis em 2026 devido à dificuldade da rede. Verifique sempre a rentabilidade atual com ferramentas como WhatToMine.com, pois fatores como os custos de eletricidade, os preços do hardware e o valor de ZEC afetam a viabilidade. A mineração pode não ser rentável para todos; pesquise os regulamentos locais e as tarifas de energia (procure obter menos de 0,08 $/kWh).


## Requisitos

### Hardware
- **Mineração com GPU (Configuração Pessoal Recomendada para Iniciantes):**
  - GPUs NVIDIA ou AMD com pelo menos 4 GB de VRAM (por exemplo, NVIDIA GTX 1070, RTX 3060; AMD RX 580 ou superior).
  - Uma motherboard compatível, PSU suficiente (pelo menos 750 W para várias GPUs) e bom arrefecimento para evitar o sobreaquecimento.
  - Equipamentos com várias GPUs são comuns para melhores taxas de hash (por exemplo, 6 GPUs podem atingir 1-2 kSol/s).
- **Mineração com ASIC (Mais Eficiente, mas com Custo Mais Elevado):**
  - ASICs compatíveis com Equihash, como Bitmain Antminer Z15 (420 kSol/s) ou Innosilicon A9 (50 kSol/s).
  - Estes são mais ruidosos, mais quentes e consomem mais energia (por exemplo, mais de 1500 W); adequados para espaços dedicados. Compre em fontes reputadas como Bitmain.com ou revendedores (Blockware Mining).
- **Geral:** Internet estável, um computador para configuração/monitorização. Os ASICs dominam a rede (~13 GSol/s de hashrate total em 2026), tornando a mineração com GPU menos competitiva, mas ainda possível para entusiastas.

### Software
- **Sistema Operativo:** Windows 10/11, Linux (Ubuntu recomendado pela estabilidade).
- **Software de Mineração:**
  - Para GPUs: lolMiner (suporta AMD/NVIDIA), GMiner ou miniZ (focado em NVIDIA). Transfira dos repositórios oficiais de GitHub (por exemplo, github.com/Lolliedieb/lolMiner-releases).
  - Para ASICs: Utilize o firmware/painel de controlo integrado do fabricante (por exemplo, a interface web da Bitmain).
- **Wallet:** Uma wallet de Zcash para receber pagamentos. Recomendadas:
  - Blindada (privada): ZODL Wallet, Zingo (móvel/desktop), Zkool (móvel/desktop).
  - Transparente (mais simples, mas menos privada): Edge Wallet, Zecwallet Lite.
  - Transfira a partir de [wallets](https://zechub.wiki/wallets). Gere um endereço blindado (começa por «zs») para privacidade, se a pool o suportar.

### Outros
- Eletricidade: Calcule os custos. As GPUs utilizam 150-300 W por placa; os ASICs mais de 1000 W.
- Antivírus: Desative-o durante a configuração, pois pode assinalar os mineradores como ameaças.

## Guia Passo a Passo para Aderir a uma Pool de Mineração

### Passo 1: Configure a Sua Wallet de Zcash
1. Transfira e instale uma wallet a partir do website oficial de Zcash [wallets](https://zechub.wiki/wallets).
2. Crie uma nova wallet e faça uma cópia de segurança segura da sua frase-semente.
3. Gere um endereço de receção (de preferência blindado para privacidade). Anote-o, por exemplo, `zs1exampleaddress...`.
4. Se utilizar um endereço transparente (começa por «t»), é mais simples, mas oferece menos privacidade.

### Passo 2: Prepare o Seu Hardware
- Para GPUs:
  1. Instale as GPUs no seu PC e atualize os controladores (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Faça overclock se tiver experiência (utilize MSI Afterburner para estabilidade; procure +100-200 de clock do núcleo, -500 de memória para eficiência).
- Para ASICs:
  1. Ligue o ASIC à alimentação e à Ethernet.
  2. Encontre o respetivo endereço IP com uma ferramenta como Advanced IP Scanner ou a aplicação do fabricante.
  3. Aceda ao painel de controlo web (por exemplo, introduza o IP no navegador; início de sessão predefinido: root/root para Bitmain).

**Aviso:** Assegure ventilação adequada; a mineração gera calor. Comece em pequena escala para testar.

### Passo 3: Escolha e Adira a uma Pool de Mineração
As pools de mineração distribuem trabalho e partilham recompensas com base no hashrate que contribui. Escolha com base nas taxas (0-2%), mínimo de pagamento (0,01-0,1 ZEC), localização (ping baixo) e fiabilidade.

**Pools Recomendadas (Com Base em Hashrate, Taxas e Avaliações):**
- **2Miners (zec.2miners.com)**: taxa de 1%, pagamento PPLNS, suporta GPU/ASIC/NiceHash. Hashrate elevado (~1,17 GSol/s), servidores fiáveis.
- **F2Pool (zec.f2pool.com)**: taxa de 2%, pagamento PPS+, suporte para várias moedas. Pool grande (~2,57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: taxa de 2% (PPS+), painel de controlo fácil de utilizar, servidores globais.
- **AntPool (zec.antpool.com)**: taxa de 1%, da Bitmain, boa para ASICs (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Pool de mineração profissional de Zcash da Foundry Digital. Utiliza pagamentos PPLNS, oferece acompanhamento transparente de recompensas e suporte de nível empresarial. Mais adequada para mineradores ASIC institucionais e em grande escala; requer verificação de conta.
- **Sovright (mining.sovright.com)**: Uma pool de Zcash criada com Stratum V2, atualmente em funcionamento como testnet pública. Ainda não há pagamentos reais em ZEC, por isso trate-a como uma forma de testar a sua configuração, e não como uma fonte de rendimentos. Consulte a secção dedicada abaixo para obter detalhes.
- Outras: Kryptex Pool, Luxor (consulte poolwatch.io/coin/zcash para estatísticas em tempo real).

1. Visite o website da pool e crie uma conta (e-mail ou sem registo para algumas, como a 2Miners).
2. Adicione o endereço da sua wallet de Zcash nas definições de pagamentos.
3. Anote o servidor stratum e a porta da pool (por exemplo, zec.2miners.com:1010).

### Passo 4: Instale e Configure o Software de Mineração
- Para GPUs (Exemplo: lolMiner em Windows/Linux):
  1. Transfira lolMiner a partir de GitHub (versão mais recente, por exemplo, 1.88).
  2. Extraia para uma pasta.
  3. Crie um ficheiro batch (start.bat) com a configuração:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Substitua `YOUR_WALLET_ADDRESS` pelo seu endereço de ZEC.
     - `WORKER_NAME`: Um nome para o seu equipamento (por exemplo, Rig1).
     - Para servidores da UE: eu.zec.2miners.com:1010.
  4. Execute o ficheiro batch. Este irá ligar-se à pool e iniciar a mineração.
- Para ASICs (Exemplo: Bitmain Antminer):
  1. Inicie sessão no painel de controlo web.
  2. Aceda a Miner Configuration.
  3. Adicione os detalhes da pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Nome de utilizador: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Palavra-passe: x (ou em branco).
  4. Guarde e reinicie o minerador.
- Para outro software (por exemplo, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Teste:** Execute durante 10-15 minutos; verifique a consola para ações aceites e hashrate.

### Passo 5: Inicie a Mineração e Monitorize
1. Inicie o minerador: este irá ligar-se à pool e começar a submeter ações.
2. Monitorize através de:
   - Painel da pool: Introduza o endereço da sua wallet para ver o hashrate, saldo não pago e estatísticas.
   - Consola do software: Observe erros e a temperatura (mantenha abaixo de 80 graus C).
   - Ferramentas: Utilize HiveOS ou SimpleMining OS para gestão remota do equipamento.
3. Pagamentos: A maioria das pools paga automaticamente quando atinge o mínimo (por exemplo, 0,05 ZEC). Consulte as regras da pool.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Pool de Testnet e Rede de Relay

Sovright (sovright.com) opera uma pool de mineração Stratum V2 e uma rede separada de relay de blocos. Estas desempenham funções diferentes, por isso são abordadas separadamente abaixo.

### Pool de Mineração (mining.sovright.com)

A pool de Sovright funciona numa testnet pública de Zcash (NU6, Stratum V2), não na mainnet. A testnet não paga ZEC real. Utilize-a para testar a configuração do seu minerador, não para obter rendimentos.

- Não é necessária uma conta para começar. Aponte um minerador Equihash de CPU ou ASIC para a pool e as suas ações aparecem num painel de controlo em direto.
- Sovright também publica um proxy Stratum V2 de código aberto para mineradores que queiram escolher os seus próprios modelos de bloco, em vez de simplesmente aceitarem os trabalhos da pool:

### Monitorização da Foundry Zcash Pool

Para utilizadores da Foundry Zcash Pool:

- Monitorize o desempenho do minerador através do painel de controlo da pool Foundry.
- Verifique:
  - Trabalhadores ativos
  - Hashrate comunicado
  - Ações aceites
  - Recompensas estimadas
  - Estado de pagamento

Como a Foundry utiliza um modelo de recompensa PPLNS, as recompensas de mineração dependem das ações contribuídas ao longo da janela de recompensa da pool, em vez de dependerem apenas do hashrate instantâneo.

Práticas de monitorização recomendadas:
- Compare o hashrate no painel de controlo do ASIC com o hashrate comunicado pela Foundry.
- Investigue ações rejeitadas, ações obsoletas ou instabilidade de ligação.
- Mantenha uma ligação de rede estável, pois o tempo de inatividade reduz as ações submetidas e as potenciais recompensas.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Aponte o seu minerador para o proxy, em vez de diretamente para a pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  utilizando um nome de trabalhador como `yourname.rig1`.
- A página de transparência de Sovright declara uma política de «incluir todas» para transações blindadas, ao contrário de algumas pools que as filtram. Cada bloco recebe uma atestação assinada, para que a política possa ser verificada de forma independente.
- Crie uma conta em mining.sovright.com (início de sessão com Google ou e-mail) para acompanhar os seus próprios trabalhadores, em vez dos dados de exemplo do painel.

### Rede de Relay (relay.sovright.com)

Sovright opera separadamente uma rede pública de relay de blocos na mainnet de Zcash. Quando uma pool encontra um bloco, a rapidez com que esse bloco chega ao resto da rede determina a frequência com que é órfão, ou seja, perde a corrida de propagação e a respetiva recompensa é perdida. O relay reencaminha blocos através de quatro regiões utilizando relay de blocos compactos com correção antecipada de erros.

O painel de controlo público mostra o efeito em direto: as regiões ligadas ao relay veem novos blocos em muito menos de metade do tempo necessário para a difusão simples ponto a ponto, e o painel acompanha a taxa de blocos órfãos da rede em tempo real.

Esta é infraestrutura para operadores de pools, não para mineradores individuais. O repositório de código aberto de Sovright `mining-infra` documenta um gateway de relay de `submitblock` para distribuir blocos encontrados pela malha mais rapidamente do que o P2P nativo. Para se ligar, contacte diretamente Sovright (support@sovright.com) para obter endereços de pares de relay e uma chave de autenticação.


## Mineração contra o seu próprio nó de Zebra

Tudo o que foi apresentado acima aponta o seu minerador para a pool de outra pessoa. A outra opção é executar um nó por conta própria e fazer com que o seu software de mineração lhe peça trabalho. Como zcashd parou em 18 de julho de 2026, isso significa [Zebra](/zcash-tech/zebra-full-node), o nó abordado nesta secção.

A função de Zebra é pequena e específica: cria modelos de bloco e aceita blocos resolvidos através da sua interface RPC. O hashing é efetuado pelo software de mineração, e a partilha de recompensas entre vários mineradores é tarefa do software de pool. O facto de a mineração a solo alguma vez encontrar um bloco depende da sua parcela da taxa de hash da rede, algo que esta secção não tenta estimar. É por isso que a introdução desta página não recomenda a mineração a solo para a maioria dos utilizadores.

Os passos seguem duas páginas do Livro de Zebra, [Mineração Zcash com Zebra](https://zebra.zfnd.org/user/mining.html) e [Mineração com Zebra em Docker](https://zebra.zfnd.org/user/mining-docker.html), tal como estavam em 8 de outubro de 2026. Os nomes das chaves e os valores predefinidos mudam entre versões, por isso consulte o Livro antes de depender deles.

### Defina o endereço que recebe a recompensa

Crie um ficheiro de configuração com as definições predefinidas e edite-o:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

É necessário um endereço de minerador ([Livro: Endereço de minerador](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra aceita um endereço P2PKH ou P2SH transparente, um endereço Sapling ou um Unified Address. Para um Unified Address com mais de um recetor, o Livro diz que Zebra paga a um único recetor, «preferindo Orchard, depois Sapling e depois transparente».

Duas chaves opcionais vão na mesma secção de `[mining]`:

| Chave | O que faz | Limite |
|---|---|---|
| `extra_coinbase_data` | Adiciona uma etiqueta pública, como o nome de uma pool, à entrada coinbase de cada bloco que minera, após o próprio marcador de Zebra ([Livro](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 bytes. Acima disso, «Zebra recusa-se a iniciar» |
| `miner_memo` | Anexa um memo blindado à saída da recompensa. Ao contrário de `extra_coinbase_data`, não é público: apenas alguém com uma viewing key do endereço recetor o pode ler ([Livro](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 bytes. Só funciona quando a recompensa vai para um recetor blindado. Com um endereço transparente, «não tem efeito silenciosamente» |

### Abra a porta RPC

O software de mineração comunica com Zebra através de JSON-RPC, que permanece desligado até lhe indicar um endereço onde escutar ([Livro: Secção RPC](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 é a porta RPC padrão na Mainnet. `127.0.0.1` mantém a porta acessível apenas a partir da mesma máquina.

Desde Zebra 2.0.0, um cookie protege a porta RPC, um método semelhante ao utilizado por zcashd. Zebra escreve o cookie quando o endpoint RPC inicia e elimina-o ao encerrar. Por predefinição, o ficheiro encontra-se no diretório de cache de Zebra, por exemplo, `/home/user/.cache/zebra/.cookie` em Linux, e contém uma linha:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` move o ficheiro. `rpc.enable_cookie_auth = false` desativa a verificação e, com ela, a única autenticação que a porta RPC possui: qualquer coisa que consiga alcançar a porta pode então chamá-la.

### Inicie Zebra e deixe-o sincronizar

```bash
zebrad
```

Zebra lê a configuração da localização predefinida. Passe `-c /path/to/zebrad.toml` para utilizar outro ficheiro. Aguarde que a sincronização termine. O registo mostra `sync_percent=100.000%` quando isso acontece ([Livro: Executar zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Nó Completo](/zcash-tech/zebra-full-node) aborda o hardware e o espaço em disco.

### Verifique com getblocktemplate

`getblocktemplate` é a chamada que o software de mineração faz para obter trabalho, pelo que é também o teste mais rápido ([Livro: Testar a configuração](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Coloque o conteúdo do seu ficheiro cookie no lugar de `__cookie__:PASSWORD`:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Uma configuração funcional devolve um objeto `result` com os campos de que um minerador necessita, entre eles `previousblockhash`, `coinbasetxn`, `target` e `height`. Se definir `extra_coinbase_data`, o Livro explica como encontrar a sua etiqueta em `coinbasetxn.data`.

### Aponte o seu software de mineração para ele

Indique ao seu software de mineração ou de pool o endpoint RPC, `127.0.0.1:8232`, e o nome de utilizador e a palavra-passe do cookie. O Livro diz que Zebra «suporta os métodos RPC necessários para executar a maioria do software de pool de mineração» ([Livro: Executar uma pool de mineração](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Duas notas do Livro antes de escolher software:

- **s-nomp é apenas para testes.** O Livro chama «experimental» à configuração s-nomp e diz que s-nomp «não é compatível com NU5, pelo que algumas funções de mineração estão desativadas». O seu guia de [Testnet](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) acrescenta que s-nomp «não foi oficialmente atualizado para NU5 ou atualizações de rede posteriores» e direciona os mineradores de produção para software de pool compatível com as atualizações atuais.
- **Zebra inclui uma stack pronta a usar.** O repositório de Zebra tem uma configuração Compose de Docker em [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) que inicia Zebra juntamente com uma pool de mineração e, se solicitado, um minerador de CPU. A pool incluída é s-nomp e inicia na Testnet, salvo se a alterar, por isso trate-a como uma forma de aprender as partes móveis.

### A via Docker

O caminho mais curto do Livro é a imagem `zfnd/zebra` Docker, com o endereço e a porta RPC passados como variáveis de ambiente ([Livro: Mineração com Zebra em Docker](https://zebra.zfnd.org/user/mining-docker.html)). O comando abaixo é o do Livro com uma alteração: publica a porta RPC apenas no endereço loopback do anfitrião, para que outras máquinas não a possam alcançar.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Isto inicia um nó Mainnet, publica a porta P2P (8233) no anfitrião Docker e torna a porta RPC (8232) acessível apenas a partir do próprio anfitrião. Imprima o cookie com:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Mantenha `0.0.0.0` em `ZEBRA_RPC__LISTEN_ADDR`.** Esse é o endereço onde Zebra escuta dentro do contentor. Docker reencaminha uma porta publicada para a própria interface de rede do contentor, pelo que um Zebra a escutar em `127.0.0.1` dentro do contentor não receberia a ligação, nem mesmo a partir do anfitrião. O `127.0.0.1:` antes de `-p` é o que mantém a porta fora da rede.
- **O comando do Livro** publica a porta RPC com `-p 8232:8232`, o que a abre em todas as interfaces de rede do anfitrião.
- **Para praticar na Testnet**, adicione `-e ZEBRA_NETWORK__NETWORK="Testnet"`, defina `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, publique `-p 18233:18233` e `-p 127.0.0.1:18232:18232`, e indique um endereço Testnet. Um endereço Mainnet impede Zebra de iniciar na Testnet, e vice-versa.

O pagamento aos mineradores e a gestão da wallet estão fora do âmbito desta secção. Para a parte da wallet, consulte [Zallet](/zcash-tech/zallet).

## Dicas e Boas Práticas
- **Rentabilidade:** Utilize calculadoras como whattomine.com/coins/166-zec-equihash. Exemplo: Uma RTX 3060 (~300 Sol/s) rende ~0,001 ZEC/dia a 50 $/ZEC, menos cerca de 0,50 $ de eletricidade.
- **Privacidade:** Utilize pools blindadas, se disponíveis; evite reutilizar endereços.
- **Segurança:** Utilize palavras-passe fortes; ative 2FA em pools/wallets. Nunca partilhe chaves privadas.
- **Resolução de Problemas:** Se não houver ações, verifique a firewall, o antivírus ou a configuração incorreta. Participe em fóruns como forum.zcashcommunity.com ou Reddit r/zec.
- **Alternativas:** Se não for rentável, considere mineração na cloud ou staking de outras moedas.
- **Nota Ambiental:** A mineração consome energia; utilize fontes renováveis, se possível.
- **Atualizações:** Zcash pode evoluir (por exemplo, uma potencial mudança para PoS); consulte z.cash para notícias.
