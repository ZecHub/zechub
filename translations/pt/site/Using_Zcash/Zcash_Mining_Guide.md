# Guia de Mineração de Zcash: Juntar-se a uma Pool de Mineração com Hardware Pessoal

## Introdução

Zcash (ZEC) é uma criptomoeda focada na privacidade que utiliza o algoritmo de prova de trabalho Equihash para mineração. Minerar Zcash envolve usar poder computacional para resolver problemas matemáticos complexos, validar transações e proteger a rede em troca de recompensas em ZEC. Devido à elevada dificuldade da rede, a mineração a solo não é recomendada para a maioria dos utilizadores. Juntar-se a uma pool de mineração é a melhor forma de obter recompensas consistentes, combinando o seu poder de hash com o de outros.

Este guia foca-se na mineração de Zcash com hardware pessoal (por exemplo, um PC doméstico com GPUs ou ASICs de nível de entrada). Tenha em conta que, embora as GPUs ainda possam minerar Zcash, os ASICs são muito mais eficientes e rentáveis em 2026 devido à dificuldade da rede. Verifique sempre a rentabilidade atual com ferramentas como WhatToMine.com, uma vez que fatores como os custos de eletricidade, os preços do hardware e o valor de ZEC afetam a viabilidade. A mineração pode não ser rentável para todos; pesquise a regulamentação local e as tarifas de energia (idealmente < $0.08/kWh).


## Requisitos

### Hardware
- **Mineração com GPU (Configuração Pessoal Recomendada para Iniciantes):**
  - GPUs NVIDIA ou AMD com pelo menos 4GB de VRAM (por exemplo, NVIDIA GTX 1070, RTX 3060; AMD RX 580 ou superior).
  - Uma motherboard compatível, PSU suficiente (pelo menos 750W para várias GPUs) e boa refrigeração para evitar sobreaquecimento.
  - Rigs com várias GPUs são comuns para obter melhores taxas de hash (por exemplo, 6x GPUs podem atingir 1-2 kSol/s).
- **Mineração com ASIC (Mais Eficiente mas com Custo Mais Elevado):**
  - ASICs compatíveis com Equihash como o Bitmain Antminer Z15 (420 kSol/s) ou o Innosilicon A9 (50 kSol/s).
  - Estes são mais ruidosos, mais quentes e consomem mais energia (por exemplo, 1500W+); adequados para espaços dedicados. Compre em fontes reputadas como Bitmain.com ou revendedores (Blockware Mining).
- **Geral:** Internet estável, um computador para configuração/monitorização. Os ASICs dominam a rede (~13 GSol/s de hashrate total em 2026), tornando a mineração com GPU menos competitiva, mas ainda possível para hobbyistas.

### Software
- **Sistema Operativo:** Windows 10/11, Linux (Ubuntu recomendado pela estabilidade).
- **Software de Mineração:**
  - Para GPUs: lolMiner (suporta AMD/NVIDIA), GMiner ou miniZ (focado em NVIDIA). Descarregue a partir dos repositórios oficiais no GitHub (por exemplo, github.com/Lolliedieb/lolMiner-releases).
  - Para ASICs: Utilize o firmware/painel incorporado do fabricante (por exemplo, a interface web da Bitmain).
- **Wallet:** Uma wallet de Zcash para receber pagamentos. Recomendadas:
  - Shielded (privada): Zashi Wallet, Zingo (Mobile/Desktop) YWallet (mobile/desktop).
  - Transparent (mais simples mas menos privada): Edge Wallet, Zecwallet Lite.
  - Descarregue a partir de [wallets](https://zechub.wiki/wallets). Gere um endereço shielded (começa por 'zs') para privacidade, se a pool o suportar.

### Outros
- Eletricidade: Calcule os custos. As GPUs usam 150-300W por placa; os ASICs 1000W+.
- Antivírus: Desative durante a configuração, pois pode assinalar mineradores como ameaças.

## Guia Passo a Passo para se Juntar a uma Pool de Mineração

### Passo 1: Configurar a Sua Wallet de Zcash
1. Descarregue e instale uma wallet a partir do site oficial de Zcash [wallets](https://zechub.wiki/wallets).
2. Crie uma nova wallet e faça uma cópia de segurança segura da sua seed phrase.
3. Gere um endereço de receção (de preferência shielded por questões de privacidade). Anote-o, por exemplo, `zs1exampleaddress...`.
4. Se utilizar um endereço transparent (começa por 't'), é mais simples, mas oferece menos privacidade.

### Passo 2: Preparar o Seu Hardware
- Para GPUs:
  1. Instale as GPUs no seu PC e atualize os drivers (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Faça overclock se tiver experiência (use MSI Afterburner para estabilidade; aponte para +100-200 no core clock, -500 na memória para eficiência).
- Para ASICs:
  1. Ligue o ASIC à alimentação e ao Ethernet.
  2. Encontre o respetivo endereço IP com uma ferramenta como o Advanced IP Scanner ou a aplicação do fabricante.
  3. Aceda ao painel web (por exemplo, introduza o IP no navegador, login predefinido: root/root para Bitmain).

**Aviso:** Garanta ventilação adequada; a mineração gera calor. Comece em pequeno para testar.

### Passo 3: Escolher e Juntar-se a uma Pool de Mineração
As pools de mineração distribuem trabalho e partilham recompensas com base no hashrate que contribui. Selecione com base nas taxas (0-2%), mínimo de pagamento (0.01-0.1 ZEC), localização (baixa latência) e fiabilidade.

**Pools Recomendadas (Com Base em Hashrate, Taxas e Avaliações):**
- **2Miners (zec.2miners.com)**: taxa de 1%, pagamento PPLNS, suporta GPU/ASIC/NiceHash. Hashrate elevado (~1.17 GSol/s), servidores fiáveis.
- **F2Pool (zec.f2pool.com)**: taxa de 2%, pagamento PPS+, suporte multi-moeda. Pool grande (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: taxa de 2% (PPS+), painel intuitivo, servidores globais.
- **AntPool (zec.antpool.com)**: taxa de 1%, da Bitmain, boa para ASICs (~494 MSol/s).
- **Sovright (mining.sovright.com)**: Uma pool de Zcash construída sobre Stratum V2, atualmente a funcionar como testnet pública. Ainda não há pagamentos reais em ZEC, por isso trate-a como uma forma de testar a sua configuração e não como fonte de rendimentos. Consulte a secção dedicada abaixo para mais detalhes.
- Outras: Kryptex Pool, Luxor (verifique poolwatch.io/coin/zcash para estatísticas em tempo real).

1. Visite o site da pool e crie uma conta (email ou sem registo para algumas, como a 2Miners).
2. Adicione o endereço da sua wallet de Zcash nas definições de pagamento.
3. Anote o servidor stratum da pool (por exemplo, zec.2miners.com:1010) e a porta.

### Passo 4: Instalar e Configurar o Software de Mineração
- Para GPUs (Exemplo: lolMiner em Windows/Linux):
  1. Descarregue o lolMiner do GitHub (versão mais recente, por exemplo, 1.88).
  2. Extraia para uma pasta.
  3. Crie um ficheiro batch (start.bat) com a configuração:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Substitua `YOUR_WALLET_ADDRESS` pelo seu endereço ZEC.
     - `WORKER_NAME`: Um nome para a sua rig (por exemplo, Rig1).
     - Para servidores da UE: eu.zec.2miners.com:1010.
  4. Execute o ficheiro batch. Este irá ligar-se à pool e começar a minerar.
- Para ASICs (Exemplo: Bitmain Antminer):
  1. Inicie sessão no painel web.
  2. Vá a Miner Configuration.
  3. Adicione os detalhes da pool:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (ou em branco).
  4. Guarde e reinicie o minerador.
- Para outro software (por exemplo, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Teste:** Execute durante 10-15 minutos; verifique a consola para shares aceites e hashrate.

### Passo 5: Começar a Minerar e Monitorizar
1. Inicie o minerador: este irá ligar-se à pool e começar a submeter shares.
2. Monitorize através de:
   - Painel da pool: Introduza o endereço da sua wallet para ver hashrate, saldo por pagar e estatísticas.
   - Consola do software: Observe erros, temperatura (mantenha < 80 graus C).
   - Ferramentas: Use HiveOS ou SimpleMining OS para gestão remota da rig.
3. Pagamentos: A maioria das pools paga automaticamente quando atinge o mínimo (por exemplo, 0.05 ZEC). Verifique as regras da pool.

   
![Configuração de Monitorização de Mineração de Zcash](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Pool de Testnet e Rede de Relay

A Sovright (sovright.com) opera uma pool de mineração Stratum V2 e uma rede separada de relay de blocos. Fazem trabalhos diferentes, por isso são abordadas separadamente abaixo.

### Pool de Mineração (mining.sovright.com)

A pool da Sovright corre numa testnet pública de Zcash (NU6, Stratum V2), e não na mainnet. A testnet não paga ZEC real. Use-a para testar a configuração do seu minerador, não para ganhar.

- Não é necessária conta para começar. Aponte um minerador Equihash de CPU ou ASIC para a pool e as suas shares aparecerão num painel em direto.
- A Sovright também publica um proxy Stratum V2 open source para mineradores que queiram escolher os seus próprios block templates em vez de apenas aceitar os trabalhos da pool:
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Aponte o seu minerador para o proxy em vez de o ligar diretamente à pool:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  usando um nome de worker como `yourname.rig1`.
- A página de transparência da Sovright afirma ter uma política de "include all" para transações shielded, ao contrário de algumas pools que as filtram. Cada bloco recebe uma attestation assinada para que a política possa ser verificada de forma independente.
- Crie uma conta em mining.sovright.com (início de sessão com Google ou email) para acompanhar os seus próprios workers em vez dos dados de exemplo do painel.

### Rede de Relay (relay.sovright.com)

A Sovright opera separadamente uma rede pública de relay de blocos na mainnet de Zcash. Quando uma pool encontra um bloco, a rapidez com que esse bloco chega ao resto da rede determina com que frequência fica órfão, ou seja, perde a corrida de propagação e a respetiva recompensa é perdida. O relay encaminha blocos através de quatro regiões usando compact block relay com forward error correction.

O painel público mostra o efeito em direto: as regiões ligadas ao relay veem novos blocos em muito menos de metade do tempo que a difusão peer to peer simples demora, e o painel acompanha a taxa de blocos órfãos da rede em tempo real.

Isto é infraestrutura para operadores de pools, não para mineradores individuais. O repositório open source `mining-infra` da Sovright documenta um gateway de relay `submitblock` para difundir blocos encontrados pela malha mais rapidamente do que o P2P nativo. Para ligar-se, contacte diretamente a Sovright (support@sovright.com) para obter endereços de peers de relay e uma chave de autenticação.


## Dicas e Boas Práticas
- **Rentabilidade:** Use calculadoras como whattomine.com/coins/166-zec-equihash. Exemplo: uma RTX 3060 (~300 Sol/s) gera ~0.001 ZEC/dia a $50/ZEC, menos ~$0.50 de eletricidade.
- **Privacidade:** Use pools shielded, se disponíveis; evite reutilizar endereços.
- **Segurança:** Use palavras-passe fortes; ative 2FA nas pools/wallets. Nunca partilhe chaves privadas.
- **Resolução de problemas:** Se não houver shares, verifique firewall, antivírus ou configuração errada. Junte-se a fóruns como forum.zcashcommunity.com ou Reddit r/zec.
- **Alternativas:** Se não for rentável, considere cloud mining ou staking de outras moedas.
- **Nota Ambiental:** A mineração consome energia; use fontes renováveis, se possível.
- **Atualizações:** Zcash pode evoluir (por exemplo, possível transição para PoS); consulte z.cash para notícias.
