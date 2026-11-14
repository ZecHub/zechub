# BTCPay Server com suporte a Zcash: guia completo de instalação e integração

O BTCPay Server permite que empresas online aceitem pagamentos em criptomoedas diretamente, sem intermediários nem custodiantes. Este guia mostra o processo completo de configuração do BTCPay Server com suporte nativo a pagamentos blindados em Zcash.

> Esta documentação trata da integração do Zcash à sua instância do BTCPay Server.  
> Ela cobre tanto configurações com **nó integral (Zebra)** quanto **configurações baseadas em lightwalletd**.

---

## Índice

- [Por que usar o BTCPay Server com Zcash](#why-use-btcpay-server-with-zcash)
- [Como o BTCPay Server funciona](#how-btcpay-server-works)
- [Onde os fundos ficam armazenados? Quem controla as chaves privadas?](#where-are-funds-stored-who-controls-the-private-keys)
- [Como configurar o BTCPay Server para aceitar Zcash](#how-to-set-up-btcpay-server-for-accepting-zcash)
  - [Implantando o BTCPay Server com suporte a Zcash](#deploying-btcpay-server-with-zcash-support)
  - [Executando seu próprio nó integral Zcash (Zebra + lightwalletd)](#running-your-own-zcash-full-node)
  - [Conectando a um nó lightwalletd externo (configuração personalizada)](#connecting-to-an-external-lightwalletd-node)
  - [Hospedando o BTCPay Server em casa com Cloudflare Tunnel](#hosting-btcpay-server-at-home-with-cloudflare-tunnel)
- [Configurando o plugin Zcash na interface web do BTCPay Server](#configuring-the-zcash-plugin-in-the-btcpay-server-web-interface)
- [Integrando o BTCPay Server ao seu site](#integrating-btcpay-server-with-your-website)
  - [Integração via API](#api-integration)
    - [Gerando uma chave de API](#generating-an-api-key)
    - [Exemplo: criando uma fatura via API](#example-creating-an-invoice-via-api)
    - [Configurando um webhook](#setting-up-a-webhook-optional)
  - [Integração com CMS](#cms-integration)
  - [Botão de pagamento ou iframe](#payment-button-or-iframe-no-cms-or-api-needed)
- [Conclusão](#conclusion)
- [Recursos](#resources)


---

## Por que usar o BTCPay Server com Zcash

O comércio online aceita cada vez mais criptomoedas. Elas são rápidas, globais e funcionam sem bancos. Isso beneficia tanto os comerciantes quanto os clientes. Mas existe um detalhe importante que muitos ignoram.

Ao fazer um pedido, o cliente normalmente fornece informações pessoais: nome, endereço de entrega e número de telefone. Se o pagamento for feito usando uma blockchain pública, como Bitcoin, Ethereum ou stablecoins na Ethereum ou na Tron, a transação fica permanentemente visível para análise.

Qualquer pessoa, mesmo sem saber o que foi pedido, pode:

- ver quando e quanto foi pago  
- rastrear de onde os fundos vieram e para onde foram  
- vincular um endereço de criptomoeda a uma pessoa real, se houver algum ponto de correlação (por exemplo, um e-mail vazado ou o nome usado na entrega)

Isso significa que uma única compra pode revelar todo o histórico financeiro de um cliente.

E isso também vale no sentido contrário. Se o endereço de um comerciante já apareceu on-chain, ele fica exposto. Concorrentes e observadores terceiros podem acompanhar volumes de pagamentos, a atividade de fornecedores e a estrutura dos fluxos do negócio.

### A combinação de BTCPay Server e Zcash pode resolver isso.


O BTCPay Server é um sistema gratuito e descentralizado para receber pagamentos em criptomoedas.  
Ele não é um intermediário de pagamentos e não guarda nenhum fundo. Todos os pagamentos vão diretamente para a carteira do comerciante.  
Pode ser uma carteira pessoal ou uma configuração multisig dentro de uma organização.

O servidor cuida das tarefas de coordenação:

- gera um endereço único para cada pedido  
- acompanha quando o pagamento é recebido e o vincula ao pedido  
- emite recibos e notificações  
- oferece uma interface de pagamento para o cliente  

Tudo funciona sob o controle do dono da loja, sem depender de serviços de terceiros.

O Zcash é uma criptomoeda construída com base em provas de conhecimento zero. Ele oferece um modelo de transações totalmente privado.  
Ao usar endereços blindados (daqui em diante chamados simplesmente de "endereços"), o remetente, o destinatário e o valor da transação não são revelados na blockchain.

Para lojas online, isso significa que:

- O comprador pode concluir o pagamento sem revelar seu histórico financeiro  
- O vendedor recebe o pagamento sem expor seu endereço, seu volume de vendas ou a estrutura de suas transações  
- Nenhum observador externo consegue vincular o pagamento ao pedido ou aos dados do cliente

### Exemplo prático

Um usuário faz um pedido e escolhe Bitcoin ou USDT como forma de pagamento.  
O site gera um endereço de pagamento e mostra o valor.  
Depois que o pagamento é feito, esse endereço fica registrado na blockchain e se torna público.  
Basta a um atacante vincular um único pedido ao endereço para ter visibilidade de longo prazo sobre todo o seu histórico de transações.

Agora imagine a mesma situação com Zcash.  
O BTCPay Server gera um endereço blindado. O comprador envia o pagamento.  
Do ponto de vista da blockchain, nada acontece. Não há dados públicos para analisar.  
O servidor recebe a confirmação, vincula-a ao pedido e conclui o processo.

Para qualquer pessoa de fora, parece que nada aconteceu.  
Toda a lógica fica entre a loja e o cliente, como deve ser.

Essa solução não sacrifica a automação nem a usabilidade.  
Tudo funciona da mesma forma que com outras criptomoedas, só que sem o risco de vazamento de dados.



## Como o BTCPay Server funciona

O BTCPay Server atua como uma ponte de processamento de pagamentos entre sua plataforma de e-commerce e a blockchain. Veja como o fluxo funciona:

1. **O cliente faz um pedido** no seu site (por exemplo, WooCommerce, Magento ou qualquer plataforma com integração ao BTCPay).

2. **A loja solicita uma fatura de pagamento** ao BTCPay Server. O servidor gera uma fatura única com:
   - O valor do pedido
   - Um contador regressivo
   - Um Unified Address (UA) Zcash, por exemplo `u1...`, que inclui por padrão um receptor Orchard (blindado).

3. **O cliente vê a página de pagamento** e envia ZEC para o endereço informado.

4. **O BTCPay Server monitora a blockchain**, conferindo o pagamento com:
   - O valor esperado
   - O endereço de recebimento
   - O horário da fatura

5. **Assim que a transação é detectada e confirmada**, o BTCPay notifica a loja.

6. **O cliente recebe uma confirmação de pagamento.** Opcionalmente, o servidor pode enviar um recibo por e-mail.

Todo esse processo acontece **automaticamente**, sem intermediários nem custodiantes.  
O BTCPay Server **não guarda nenhum fundo**: ele apenas conecta o sistema de pedidos à blockchain de forma segura e privada.
## Onde os fundos ficam armazenados? Quem controla as chaves privadas?

O BTCPay Server **não** é uma carteira e **não exige chaves privadas**.  
Todos os fundos vão **diretamente** para a carteira do comerciante. A segurança é garantida pelo uso de uma **arquitetura baseada em chave de visualização**.

### Como funciona

- **A carteira é criada com antecedência.**  
  O comerciante usa uma carteira Zcash que suporta chaves de visualização, como [Zkool](https://github.com/hhanh00/zkool2/) ou [Zingo! Wallet](https://zingolabs.org/).  
  Uma lista completa está disponível em [ZecHub.wiki](https://zechub.wiki/wallets).

- **O BTCPay Server se conecta por meio de uma chave de visualização.**  
  Uma chave de visualização é uma **chave somente leitura**: ela consegue detectar pagamentos recebidos e gerar novos endereços de recebimento,  
  mas não consegue gastar fundos. O servidor não armazena frases semente nem chaves privadas.

- **Os dados da blockchain são acessados por meio de um servidor `lightwalletd`.**  
  Você pode usar um nó público como `https://zec.rocks` ou executar sua própria stack `Zebra + lightwalletd` para ter soberania total.

- **Cada pedido recebe um endereço único.**  
  As chaves de visualização permitem que o servidor derive novos endereços blindados Zcash para cada fatura,  
  possibilitando o acompanhamento seguro dos pagamentos e evitando a reutilização de endereços.

- **Você mantém controle total sobre os fundos.**  
  Mesmo que o servidor seja comprometido, ninguém pode roubar seu dinheiro: apenas os metadados dos pagamentos poderiam ser expostos.

Esse design separa a **infraestrutura** do **controle dos ativos**.  
Você pode atualizar, migrar ou reinstalar o BTCPay Server sem colocar nenhum fundo em risco.

## Como configurar o BTCPay Server para aceitar Zcash

Nas seções anteriores, explicamos como o BTCPay Server funciona com Zcash e por que isso é importante para pagamentos que preservam a privacidade. Agora é hora de colocar a mão na massa.

A sua configuração exata vai depender de vários fatores:

- Você já tem uma instância do BTCPay Server?
- Você quer usar um lightwalletd público ou executar seu próprio nó integral?
- O servidor vai rodar em uma VPS ou em casa?

Este capítulo cobre todos os cenários de configuração atuais, desde configurações mínimas até implantações totalmente soberanas.

Vamos ver o seguinte:

- Como implantar tudo do zero em uma VPS, incluindo o nó integral (Zebra)
- Como executar o BTCPay Server em casa mantendo seu IP oculto com o **Cloudflare Tunnel**
- Como ativar e configurar o suporte a Zcash na interface web do BTCPay Server
- Como integrar o BTCPay ao seu site ou loja online


## Implantando o BTCPay Server com suporte a Zcash

Vamos passar para a configuração propriamente dita. Nesta seção, vamos instalar o BTCPay Server com suporte a Zcash, seja em uma VPS nova, seja adicionando o suporte a ZEC a uma instância existente.

Se você já tem o BTCPay Server em funcionamento (por exemplo, para BTC ou Lightning), não precisa reinstalar tudo: basta ativar o plugin ZEC.

Vamos ver várias configurações, desde as mínimas, usando um nó `lightwalletd` público, até instalações totalmente soberanas com seu próprio nó integral.  
A melhor opção depende da localização do seu servidor e de quanta independência você quer em relação à infraestrutura externa.

> Documentação oficial do plugin:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Atenção: uma carteira por instância:**  
> O plugin Zcash usa **uma única carteira compartilhada** entre **todas as lojas** da instância do BTCPay.  
> Se você hospedar várias lojas independentes em uma mesma instância, elas vão compartilhar a mesma carteira Zcash.  
> Use instâncias separadas se precisar de isolamento rigoroso entre carteiras.

---

### Configuração de VPS recomendada

Antes de instalar, verifique se você tem:

- Uma VPS com **Ubuntu 22.04+**
- Um nome de domínio apontando para o endereço IP do seu servidor (via DNS)
- `git`, `docker` e `docker-compose` instalados
- Acesso SSH ao servidor

---

## Preparando seu servidor (parte oculta)

<details>
  <summary>Clique para expandir</summary>

Para implantar o BTCPay Server com suporte a Zcash, você vai precisar do seguinte:

### 1. VPS com Ubuntu 22.04 ou mais recente

Recomendamos usar uma instalação mínima do **Ubuntu Server 22.04 LTS**.  
Qualquer provedor de VPS que ofereça um endereço IP dedicado serve.  

**Requisitos mínimos**:  
- 2 núcleos de CPU  
- 4 GB de RAM  
- 40 GB de espaço em disco  

Essa configuração é suficiente se você usar lightwalletd para Zcash.  
Se você pretende executar um **nó integral Zcash**, vai precisar de **pelo menos 300 GB** de espaço livre em disco.

---

### 2. Nome de domínio apontando para o seu servidor

No painel do seu provedor de DNS, crie um registro `A` para um subdomínio  
(por exemplo, `btcpay.example.com`) que aponte para o endereço IP da sua VPS.  

Esse domínio será usado para acessar o BTCPay Server pelo navegador  
e para gerar automaticamente um **certificado SSL gratuito** via Let's Encrypt.

---

### 3. Acesso SSH ao servidor

Para instalar o BTCPay Server, você precisa se conectar à sua VPS via SSH.  
No seu terminal, execute:

`ssh root@YOUR_SERVER_IP`

Se você usa macOS, Linux ou WSL no Windows, o SSH já está disponível no terminal.
No Windows puro, use um cliente SSH como o **PuTTY**.

---

### 4. Instale o Git, o Docker e o Docker Compose

Depois de se conectar via SSH, atualize os pacotes do sistema e instale os componentes necessários:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> No Ubuntu 22.04 e versões mais recentes, o `docker-compose` do APT está obsoleto.
> O pacote recomendado é o `docker-compose-plugin`, que fornece o comando `docker compose` (observe o espaço no lugar do hífen).

O ambiente do seu servidor agora está pronto para a instalação do BTCPay Server.

</details>

---

### Passo 1: clone o repositório

Crie um diretório de trabalho e baixe a implantação BTCPay Server Docker:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Passo 2: exporte as variáveis de ambiente

Substitua `btcpay.example.com` pelo seu domínio real:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Se você pretende adicionar Monero ou Litecoin mais tarde, pode incluí-los agora:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Você pode adicionar novas moedas a qualquer momento exportando as variáveis correspondentes e executando novamente o script de configuração:

`. ./btcpay-setup.sh -i`

Neste guia, vamos nos concentrar **apenas em Zcash**.

---

### Passo 3: execute o instalador

Execute o script de configuração para compilar e iniciar o servidor:

`. ./btcpay-setup.sh -i`

O script vai instalar as dependências, gerar o `docker-compose.yml`, iniciar os serviços e configurar o `systemd`.
Isso leva cerca de 5 minutos.

Quando terminar, sua instância do BTCPay Server estará disponível em:

`https://btcpay.example.com`

> Se você estiver modificando uma instalação existente (por exemplo, adicionando ZEC), não deixe de parar e reiniciar o servidor com as novas configurações:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Em seguida, vá para a próxima seção para configurar o Zcash na interface web do BTCPay Server.

## Executando seu próprio nó integral do Zcash

Se você prefere **não** depender de nós `lightwalletd` públicos, pode implantar seu próprio nó integral do Zcash junto com o lightwalletd no mesmo servidor.  
Isso lhe dá **autonomia total**: nenhuma dependência externa, nenhuma confiança necessária.

---

### Passo 1: garanta espaço em disco suficiente

Um nó integral do Zcash (Zebra + lightwalletd) atualmente requer **mais de 300 GB** de espaço em disco, e esse valor continua crescendo.

Detalhamento:

- O banco de dados da blockchain do Zebra: ~260-270 GB
- Indexação do lightwalletd: ~15-20 GB

#### Armazenamento recomendado:

- **Mais de 400 GB** se o servidor for usado **apenas** para pagamentos em Zcash
- **Mais de 800 GB** se o servidor também executar BTCPay Server, PostgreSQL, Nginx etc.

> O ideal é usar um disco SSD/NVMe com **capacidade de 1 TB**, especialmente se você não planeja fazer a poda dos dados regularmente.

---

### Passo 2: defina as variáveis de ambiente

Acrescente o seguinte à configuração do seu ambiente para ativar a configuração de nó integral:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Isso incluirá o fragmento `zcash-fullnode`, que inicia tanto o `zebrad` quanto o `lightwalletd` dentro do BTCPay Server.

---

### Passo 3: execute o instalador novamente

`. ./btcpay-setup.sh -i`

O script irá:

* Baixar as imagens Docker do Zebra e do lightwalletd
* Configurar os serviços dentro da stack do BTCPay
* Vincular o plugin Zcash à instância **local** do `lightwalletd`

> **A sincronização completa da blockchain pode levar vários dias**, especialmente em servidores VPS com poucos recursos.
> Até que a sincronização termine, os pagamentos blindados não estarão disponíveis.


## Conectando-se a um nó lightwalletd externo

Na maioria dos casos, a autonomia total não é necessária, e os comerciantes podem não querer gastar tempo e espaço em disco executando um nó integral do Zcash.  
Por padrão, o BTCPay Server se conecta a um nó `lightwalletd` público para processar pagamentos blindados sem baixar a blockchain inteira.

O endpoint padrão é:

`https://zec.rocks:443`

No entanto, você pode configurar o BTCPay Server para se conectar a **qualquer nó `lightwalletd` externo**, como:

`https://lightwalletd.example:443`

Esta seção mostra como fazer isso usando um **fragmento Docker personalizado**.

> Um exemplo de configuração completo, com todas as variáveis de ambiente, está disponível no [repositório do plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Os passos abaixo mostram uma configuração mínima funcional.

---

### Passo 1: crie um fragmento Docker personalizado

No diretório do seu projeto BTCPayServer, crie um arquivo de fragmento personalizado:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Adicione o seguinte conteúdo:

```
exclusive:
- zcash
```

A diretiva `exclusive` garante que apenas um fragmento com o mesmo rótulo (`zcash`, neste caso) possa estar ativo por vez.
Isso evita conflitos de configuração: por exemplo, você não pode executar simultaneamente o fragmento `zcash-fullnode` e este fragmento `lightwalletd` externo personalizado.
Ao marcá-lo como `exclusive: zcash`, o BTCPay Server desativará automaticamente os contêineres padrão do `zcash-fullnode` e do `lightwalletd` interno, permitindo que você se conecte ao seu próprio nó externo.

---

### Passo 2: defina as variáveis de ambiente

No terminal:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Passo 3: defina o endereço do nó externo

Abra seu arquivo `.env`:

`nano .env`

Adicione a linha a seguir, substituindo a URL pelo endpoint escolhido:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Você pode usar:

* Um **nó público**, como `https://zec.rocks:443`
* Seu próprio nó auto-hospedado, implantado separadamente do BTCPay Server

> Se o `lightwalletd` externo ficar indisponível ou sobrecarregado, os pagamentos blindados falharão.
> Para serviços críticos, escolha um **endpoint estável e comprovado** (como o `zec.rocks` padrão).

> Quer auto-hospedar o `lightwalletd`?
> Você pode usar o `docker-compose.lwd.yml` do [repositório Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Aviso:** esta configuração não está documentada oficialmente e requer configuração manual de TLS, redirecionamento de portas e configuração de firewall. É recomendada apenas para usuários avançados.

---

### Passo 4: execute o instalador novamente

`. ./btcpay-setup.sh -i`

O BTCPay Server aplicará sua configuração personalizada e se conectará ao nó `lightwalletd` especificado.

A partir de agora, o plugin Zcash usará esse endpoint externo para processar transações blindadas.


## Hospedando o BTCPay Server em casa com Cloudflare Tunnel

Quer aceitar pagamentos em Zcash hospedando o BTCPay Server em um dispositivo doméstico, como um Raspberry Pi 5 ou qualquer servidor local **sem IP estático**?  
Você pode expor sua instância à internet com segurança usando o **Cloudflare Tunnel**.

Este método dispensa o redirecionamento de portas e oculta do público seu endereço IP real, mantendo seu servidor acessível via HTTPS.

Ele também ajuda você a **evitar o custo de alugar um VPS**, o que é ideal se os pagamentos com criptomoedas forem um recurso opcional e não o núcleo do seu negócio.

---

### Passo 1: instale o Cloudflare Tunnel

1. Crie uma conta em [cloudflare.com](https://www.cloudflare.com) e adicione seu domínio.
2. No seu **servidor doméstico**, instale o Cloudflare Tunnel usando o repositório oficial de pacotes da Cloudflare:

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

Se o `apt install cloudflared` falhar, instale o `.deb` correspondente:

```bash
# Raspberry Pi / ARM64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared.deb
```

```bash
# x86_64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

3. Autentique-se na Cloudflare:

`cloudflared tunnel login`

Este comando abrirá uma janela do navegador. Faça login e autorize o acesso ao seu domínio.
A Cloudflare criará automaticamente no seu servidor um arquivo `credentials` com um token.

4. Crie um novo túnel (você pode chamá-lo de `btcpay` ou de qualquer outro nome):

`cloudflared tunnel create btcpay`

Isso gera um arquivo `btcpay.json` contendo o ID do túnel e as credenciais. Você precisará dele no próximo passo.

---

### Passo 2: crie o arquivo de configuração do túnel

Crie o diretório de configuração (se ainda não existir) e abra o arquivo de configuração:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Cole a seguinte configuração:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Explicação:

* `tunnel` - nome do túnel que você criou anteriormente
* `credentials-file` - caminho para o arquivo de token gerado durante o `cloudflared tunnel login`
* `hostname` - seu domínio registrado na Cloudflare (por exemplo, `btcpay.example.com`)
* `service` - endereço local do seu BTCPay Server (geralmente `http://127.0.0.1:80` para o Nginx)

> A Cloudflare fará o proxy do tráfego com segurança até seu servidor local, sem expor o IP da sua casa.


### Passo 3: adicione um registro DNS para o seu túnel

Depois de criar o túnel, a Cloudflare geralmente **adiciona automaticamente um registro DNS CNAME** para o seu domínio. Ele deve ficar assim:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Se ele não aparecer automaticamente, adicione-o manualmente:

1. Acesse seu [painel da Cloudflare](https://dash.cloudflare.com/)
2. Navegue até a seção **DNS**
3. Adicione um novo registro CNAME:
   - **Name**: `btcpay`
   - **Target**: `<UUID>.cfargotunnel.com`  
     Você encontra o valor exato no seu arquivo `btcpay.json` ou executando:
     
     `cloudflared tunnel list`
     
   - **Proxy status**: Enabled (nuvem laranja)

> Este registro garante que todas as solicitações para `btcpay.example.com` sejam roteadas pelo Cloudflare Tunnel, ocultando do público seu endereço IP real.

---

### Passo 4: ative o túnel na inicialização do sistema

Para que o túnel seja executado automaticamente na inicialização, instale-o como um serviço do sistema:

`sudo cloudflared service install`

Em seguida, ative e inicie o serviço:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Verifique o status:

`sudo systemctl status cloudflared`

Você deverá ver uma mensagem como `Active: active (running)` e a confirmação de que o `btcpay.example.com` está online.

> A partir de agora, o túnel será iniciado automaticamente a cada reinicialização, e seu BTCPay Server ficará acessível publicamente, sem redirecionamento de portas e sem expor seu IP real.

---

### Passo 5: finalize a configuração do BTCPay Server

Se você vai instalar o BTCPay Server pela primeira vez, defina seu domínio antes de executar o script de configuração:

`export BTCPAY_HOST="btcpay.example.com"`

Isso garante que o domínio correto seja usado ao gerar a **configuração do Nginx** e os **certificados SSL**.

Se o BTCPay Server já estiver instalado e você estiver apenas adicionando o túnel:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

A configuração vai gerar novamente os arquivos de configuração e aplicar o novo domínio.
Agora você deve conseguir acessar seu servidor em:

`https://btcpay.example.com`

> Esteja você usando um `lightwalletd` público ou seu próprio nó integral, isso não afeta o túnel.
> O que importa é que o BTCPay Server esteja escutando localmente em `127.0.0.1:80`.


## Configurando o plugin Zcash na interface web do BTCPay Server

> **Importante para configurações com várias lojas:**  
> A carteira Zcash configurada aqui é **global** para a instância. Todas as lojas usarão esta carteira, a menos que você execute instâncias separadas do BTCPay.

Depois de implantar com sucesso sua instância do BTCPay Server, você precisará fazer algumas configurações básicas pela interface web de administração.  
A documentação oficial traz instruções completas em inglês. Aqui, vamos percorrer os passos essenciais e focar especificamente na configuração do plugin Zcash.

---

### Passo 1: faça login na interface web

Acesse sua instância em:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Digite seu login e senha de administrador.
- Se este for seu primeiro acesso, você será solicitado a criar uma conta.
- A primeira conta registrada receberá automaticamente privilégios de administrador.

---

### Passo 2: instale o plugin Zcash

1. No menu principal, vá para:

`Plugins -> Browse Plugins`

2. Localize o plugin **Zcash (ZEC)**. Use a barra de pesquisa, se necessário.
3. Clique em **Install** e confirme.

> Repita este processo para quaisquer outras altcoins que você ativou durante a configuração do servidor.

Após a instalação, clique em **Restart Server** para recarregar a interface com os plugins ativos.


### Passo 3: conecte sua carteira via Viewing Key

Depois de instalar o plugin, uma nova seção **Zcash** aparecerá no menu de configurações.

1. Vá para:

`Zcash -> Settings`

2. Cole sua **Unified Full Viewing Key (UFVK)**. O BTCPay vai derivar um Unified Address para cada fatura e detectar os pagamentos blindados recebidos.

> **Observação:** as chaves de visualização Sapling legadas são suportadas, mas para usar Orchard/Unified Addresses você deve fornecer uma **UFVK**.


   Formato de exemplo:

`uview184syv9wftwngkay8d...`

3. Insira um valor no campo Block height

* **Primeira configuração com uma carteira nova (nova frase semente):** insira a altura de bloco atual do Zcash (você pode consultá-la em 3xpl.com/zcash). Isso acelera a varredura inicial.
* **Migração no mesmo servidor de uma configuração legada somente Sapling para Unified Addresses / Orchard:** deixe este campo vazio.
* **Mudança da sua loja para um novo servidor com a mesma carteira/UFVK:** opcionalmente, insira a altura de criação, ou seja, uma altura aproximada do primeiro pedido pago da sua loja (procure a data do pedido no 3xpl para restringir a varredura). Se não tiver certeza, deixe o campo vazio.

> Nem todas as carteiras suportam ainda a exportação da **Unified Full Viewing Key (UFVK)**.  
> Opções recomendadas:  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Wallet (versão para PC)**](https://zingolabs.org/)  
> Nos dois apps, procure a exportação da UFVK na seção de backup/exportação.

Essas chaves suportam **rotação automática de endereços**, o que significa que:
- Cada cliente recebe um endereço de pagamento **exclusivo**
- Você vê um saldo **único e unificado**

Você encontra uma lista de compatibilidade mais ampla em [ZecHub -> Carteiras](https://zechub.wiki/wallets).

Depois de preencher todos os campos, clique em **Save**.

---

### Teste seu fluxo de pagamento em ZEC

Parabéns: sua carteira Zcash agora está conectada ao BTCPay Server.

Vamos fazer um teste:

1. Vá para:

`Invoices -> Create New`

2. Gere uma fatura de teste com um valor pequeno em ZEC.
3. Envie fundos a partir de **uma carteira diferente** (não a que está conectada ao BTCPay).
4. Assim que a transação for detectada, a página da fatura exibirá uma animação de comemoração.
5. Confirme que o status da fatura muda para **Paid**.

Se tudo funcionar, você está pronto para integrar pagamentos em ZEC ao seu site usando a API ou os plugins de CMS.



## Integrando o BTCPay Server ao seu site

Depois que sua carteira Zcash estiver conectada ao BTCPay Server, você poderá integrar o sistema de pagamento ao seu site.  
Há várias formas de fazer isso, desde o acesso direto à API até plugins prontos para plataformas de CMS populares.

---

### Opções de integração

- **Integração via API**  
  Ideal para sites desenvolvidos sob medida ou sistemas sem CMS.  
  Dá a você controle total sobre a criação de faturas, o acompanhamento de pagamentos e as notificações, tudo dentro da sua própria interface e lógica.  
  Requer conhecimentos básicos de programação, por isso é melhor que essa tarefa fique com o seu desenvolvedor.

- **Plugins de CMS**  
  Disponíveis para plataformas como **WooCommerce**, **PrestaShop** e outras.  
  Esses plugins permitem que você aceite pagamentos em poucos minutos, sem precisar programar.

- **Botão de pagamento ou iframe**  
  O método mais simples.  
  Perfeito para landing pages, sites pessoais ou qualquer site em que você queira apenas incorporar um link de doação ou um widget de checkout.

---

### Integração via API

Se você usa uma plataforma personalizada (ou nenhum CMS), a API é a melhor opção.  
Ela oferece flexibilidade total: você pode criar faturas, acompanhar seus status, receber notificações e controlar completamente a experiência do usuário.

> Observação: até mesmo alguns plugins de CMS usam a API internamente, então criar uma chave de API costuma ser o **primeiro passo obrigatório**, qualquer que seja o seu método de integração.

Próximo passo: gere uma chave de API para sua loja e comece a usar a [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) para construir sua integração.


### Gerando uma chave de API

Para integrar o BTCPay Server ao seu site ou aplicativo, você precisará gerar uma chave de API.

1. Faça login no BTCPay Server e abra o **menu do usuário** (canto superior direito)
2. Vá para **API Keys**
3. Clique em **Create a new API key**
4. Digite um nome para a sua chave
5. Na seção **Permissions**, ative:
   - `Can create invoice`
   - `Can view invoice`
   - *(Opcional)* `Can modify store settings` - somente se você precisar de gerenciamento no nível da loja

6. Clique em **Generate**. Sua chave de API pessoal será exibida: copie-a e guarde-a em local seguro.

> Esta chave concede acesso às faturas da sua loja.  
> **Não** a compartilhe publicamente nem a exponha em código do lado do cliente.

---

### Exemplo: criando uma fatura via API

**Endpoint:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Corpo da requisição:**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**Resposta:**

Você receberá um objeto JSON com:

* `invoiceId`
* Uma URL de pagamento que você pode incorporar no seu site ou enviar ao cliente

Veja a documentação completa:
[Greenfield API – Criar fatura](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Configurando um webhook (opcional)

Para receber notificações em tempo real quando o status das faturas mudar (por exemplo, quando um pagamento for recebido):

1. Vá para as configurações da sua loja -> **Webhooks**
2. Adicione a URL do endpoint do seu backend que vai processar as requisições `POST` vindas do BTCPay Server
3. O BTCPay enviará notificações automaticamente quando uma fatura for paga ou expirar

Os payloads dos webhooks e a lógica de novas tentativas estão descritos na [documentação oficial de webhooks](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Exemplos de integração para várias linguagens de programação estão disponíveis na documentação do BTCPay e nos repositórios do GitHub.



### Integração com CMS

O BTCPay Server suporta plugins para sistemas de gerenciamento de conteúdo (CMS) populares.  
A integração mais madura e amplamente usada é com **WordPress + WooCommerce**, o que facilita aceitar pagamentos em ZEC **sem escrever código**.

---

#### WooCommerce (WordPress)

O BTCPay Server oferece suporte oficial a um plugin para WooCommerce.

Passos para a integração:

1. Instale o plugin **BTCPay for WooCommerce** a partir do diretório de plugins do WordPress ou do GitHub.
2. No painel de administração do WordPress, vá para:

`WooCommerce -> Settings -> Payments`

3. Encontre **BTCPay** na lista e clique em **Set up**
4. Insira a URL do seu BTCPay Server e siga as instruções de autorização  
   (recomenda-se a geração automática da chave de API)
5. Ative o método de pagamento e salve suas configurações

> Instruções detalhadas, tutoriais em vídeo e guias de solução de problemas estão disponíveis na documentação do plugin.

Você também encontrará outras opções de integração com CMS nessa mesma seção da documentação do BTCPay.

---

### Botão de pagamento ou iframe (sem CMS nem API)

Se você não usa um CMS e não quer trabalhar com APIs, a forma mais fácil de aceitar pagamentos em ZEC é **incorporar um link ou widget de pagamento** diretamente no seu site.

Este método é ideal para:

- Landing pages
- Sites de portfólio
- Blogs ou páginas estáticas
- Projetos sem servidor de backend

---

#### Opção 1: botão de pagamento (link)

1. No BTCPay Server, crie manualmente uma fatura na seção **Invoices**
2. Copie o link de pagamento, por exemplo:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Adicione o link ao seu HTML:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Opção 2: fatura incorporada (iframe)

Para exibir a fatura diretamente no seu site, use um iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Você pode estilizar o botão ou o contêiner do iframe para combinar com o design do seu site: o BTCPay Server permite personalizar com flexibilidade o tema da página da fatura.

## Conclusão

Este guia foi longo, mas cobre apenas os aspectos fundamentais da integração de pagamentos Zcash com o BTCPay Server.

A interface do BTCPay Server oferece muito mais funcionalidades do que mostramos aqui. Felizmente, a interface está disponível em vários idiomas (incluindo o russo), o que facilita explorar e experimentar ainda mais.

O BTCPay é uma ferramenta altamente flexível. Você pode:

* Hospedar várias lojas independentes em uma única instância
* Definir funções e permissões personalizadas para os membros da equipe, desde apenas a visualização de pedidos até a administração completa
* Usar seus próprios domínios e sua própria identidade visual
* Configurar webhooks, carteiras de reserva e até mesmo acesso via Tor
* Definir configurações avançadas, como regras de impostos, códigos de desconto, personalização da página de checkout, restrições de métodos de pagamento e muito mais

O BTCPay foi criado como uma alternativa de código aberto aos provedores de pagamento centralizados. Se você quer aceitar pagamentos privados em ZEC sem intermediários, esta plataforma merece toda a sua atenção.

Desejamos sucesso na sua exploração do ecossistema BTCPay e para que seus pagamentos sejam verdadeiramente seus.

## Recursos

* [Site oficial do BTCPay Server](https://btcpayserver.org/)
* [Perguntas frequentes do BTCPay](https://docs.btcpayserver.org/FAQ/)
* [Repositório BTCPay Server GitHub](https://github.com/btcpayserver/btcpayserver)
* [Demonstração do BTCPay Server na mainnet](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Plugin Zcash para o BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Guia de instalação do plugin Zcash](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Exemplo de zcash-lightwalletd.custom.yml personalizado](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Arquivo Compose lightwalletd Docker (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Documentação de chaves de API do BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Criar um Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Lista de compatibilidade de carteiras Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + lightwalletd no Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
