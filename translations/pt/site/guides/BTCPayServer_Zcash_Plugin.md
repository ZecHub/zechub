# BTCPay Server com Suporte a Zcash: Guia Completo de Instalação e Integração

O BTCPay Server permite que empresas online aceitem pagamentos em criptomoedas diretamente, sem intermediários nem custodians. Este guia apresenta o processo completo de configuração do BTCPay Server com suporte nativo para pagamentos blindados em Zcash.

> Esta documentação se concentra na integração do Zcash à sua instância do BTCPay Server.  
> Ela oferece suporte tanto a configurações com **nó completo (Zebra)** quanto a configurações **baseadas em lightwalletd**.

---

## Índice

- [Por que usar BTCPay Server com Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Como o BTCPay Server funciona](#How-BTCPay-Server-Works)
- [Onde os fundos são armazenados? Quem controla as chaves privadas?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Como configurar o BTCPay Server para aceitar Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Implantando o BTCPay Server com suporte a Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Executando seu próprio nó completo de Zcash (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Conectando-se a um nó externo de lightwalletd (configuração personalizada)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Hospedando o BTCPay Server em casa com Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Configurando o plugin de Zcash na interface web do BTCPay Server](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Integrando o BTCPay Server ao seu site](#Integrating-BTCPay-Server-with-Your-Website)
  - [Integração por API](#API-Integration)
    - [Gerando uma chave de API](#Generating-an-API-Key)
    - [Exemplo: criando uma fatura via API](#Example-Creating-an-Invoice-via-API)
    - [Configurando um webhook](#Setting-Up-a-Webhook-Optional)
  - [Integração com CMS](#CMS-Integration)
  - [Botão de pagamento ou Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Conclusão](#Conclusion)
- [Recursos](#Resources)


---

## Por que usar BTCPay Server com Zcash

O comércio online aceita cada vez mais criptomoedas. É rápido, global e funciona sem bancos. Isso beneficia tanto comerciantes quanto clientes. Mas կա um detalhe importante que muitos ignoram.

Ao fazer um pedido, o cliente normalmente fornece informações pessoais: nome, endereço de entrega e número de telefone. Se o pagamento for feito usando uma blockchain pública - como Bitcoin, Ethereum ou stablecoins em Ethereum ou Tron - a transação se torna permanentemente visível para análise.

Qualquer pessoa, mesmo sem saber o que foi pedido, pode:

- ver quando e quanto foi pago  
- rastrear de onde os fundos vieram e para onde foram  
- vincular um endereço de criptomoeda a uma pessoa real se houver qualquer ponto de correlação (por exemplo, um e-mail vazado ou nome de entrega)

Isso significa que uma única compra pode revelar todo o histórico financeiro de um cliente.

E isso também funciona no outro sentido. Se o endereço de um comerciante já apareceu on-chain, ele fica exposto. Concorrentes e observadores terceirizados podem acompanhar volumes de pagamento, atividade de fornecedores e a estrutura dos fluxos do negócio.

### A combinação de BTCPay Server e Zcash pode resolver isso.


BTCPay Server é um sistema gratuito e descentralizado para receber pagamentos em criptomoedas.  
Não é um intermediário de pagamentos e não mantém nenhum fundo sob custódia. Todos os pagamentos vão diretamente para a carteira do comerciante.  
Pode ser uma carteira pessoal ou uma configuração multisig dentro de uma organização.

O servidor cuida das tarefas de coordenação:

- gera um endereço único para cada pedido  
- acompanha quando o pagamento é recebido e o vincula ao pedido  
- emite recibos e notificações  
- fornece uma interface de pagamento para o cliente  

Tudo funciona sob o controle do proprietário da loja, sem depender de serviços de terceiros.

Zcash é uma criptomoeda construída sobre provas de conhecimento zero. Ela oferece suporte a um modelo de transação totalmente privado.  
Ao usar endereços blindados (doravante chamados simplesmente de “endereços”), o remetente, o destinatário e o valor da transação não são revelados na blockchain.

Para lojas online, isso significa:

- O comprador pode concluir o pagamento sem revelar seu histórico financeiro  
- O vendedor recebe o pagamento sem expor seu endereço, volume de vendas ou estrutura de transações  
- Nenhum observador externo pode vincular o pagamento ao pedido ou aos dados do cliente

### Exemplo prático

Um usuário faz um pedido e seleciona Bitcoin ou USDT como método de pagamento.  
O site gera um endereço de pagamento e exibe o valor.  
Depois que o pagamento é feito, esse endereço fica registrado na blockchain e se torna público.  
Um atacante só precisa vincular um pedido ao endereço para obter visibilidade de longo prazo sobre todo o seu histórico de transações.

Agora imagine a mesma situação com Zcash.  
O BTCPay Server gera um endereço blindado. O comprador envia o pagamento.  
Do ponto de vista da blockchain, nada acontece. Não há dados públicos para analisar.  
O servidor recebe a confirmação, vincula-a ao pedido e conclui o processo.

Para qualquer pessoa de fora, parece que nada ocorreu.  
Toda a lógica permanece entre a loja e o cliente - como deve ser.

Essa solução não compromete a automação nem a usabilidade.  
Tudo funciona da mesma forma que com outras criptomoedas, só que sem o risco de vazamento de dados.



## Como o BTCPay Server funciona

O BTCPay Server atua como uma ponte de processamento de pagamentos entre sua plataforma de e-commerce e a blockchain. Veja como o fluxo funciona:

1. **O cliente faz um pedido** no seu site (por exemplo, WooCommerce, Magento ou qualquer plataforma com integração ao BTCPay).

2. **A loja solicita uma fatura de pagamento** ao BTCPay Server. O servidor gera uma fatura única com:
   - O valor do pedido
   - Um cronômetro de contagem regressiva
   - Um Zcash Unified Address (UA) - por exemplo, `u1...` - que inclui um receptor Orchard (blindado) por padrão.

3. **O cliente vê a página de pagamento** e envia ZEC para o endereço fornecido.

4. **O BTCPay Server monitora a blockchain**, verificando o pagamento em relação a:
   - O valor esperado
   - O endereço de recebimento
   - O timestamp da fatura

5. **Assim que a transação é detectada e confirmada**, o BTCPay notifica a loja.

6. **O cliente recebe uma confirmação de pagamento.** Opcionalmente, o servidor pode enviar um recibo por e-mail.

Todo esse processo acontece **automaticamente**, sem intermediários nem custodians.  
O BTCPay Server **não mantém nenhum fundo** - ele simplesmente conecta o sistema de pedidos à blockchain de forma segura e privada.
## Onde os fundos são armazenados? Quem controla as chaves privadas?

O BTCPay Server **não** é uma carteira e **não exige chaves privadas**.  
Todos os fundos vão **diretamente** para a carteira do comerciante. A segurança é garantida por meio de uma **arquitetura baseada em viewing key**.

### Como funciona

- **A carteira é criada com antecedência.**  
  O comerciante usa uma carteira Zcash compatível com viewing keys - como [YWallet](https://ywallet.app/installation) ou [Zingo! Wallet](https://zingolabs.org/).  
  Uma lista completa está disponível em [ZecHub.wiki](https://zechub.wiki/wallets).

- **O BTCPay Server se conecta por meio de uma viewing key.**  
  Uma viewing key é uma **chave somente leitura**: ela pode detectar pagamentos recebidos e gerar novos endereços de recebimento,  
  mas não pode gastar fundos. O servidor não armazena seed phrases nem chaves privadas.

- **Os dados da blockchain são acessados por meio de um servidor `lightwalletd`.**  
  Você pode usar um nó público como `https://zec.rocks` ou executar sua própria pilha `Zebra + lightwalletd` para soberania total.

- **Cada pedido recebe um endereço único.**  
  Viewing keys permitem que o servidor derive novos endereços blindados de Zcash para cada fatura,  
  possibilitando o rastreamento seguro de pagamentos e evitando a reutilização de endereços.

- **Você mantém controle total sobre os fundos.**  
  Mesmo que o servidor seja comprometido, ninguém poderá roubar seu dinheiro - apenas metadados de pagamento poderiam ser expostos.

Esse design separa **infraestrutura** de **controle dos ativos**.  
Você pode atualizar, migrar ou reinstalar o BTCPay Server sem colocar nenhum fundo em risco.

## Como configurar o BTCPay Server para aceitar Zcash

Nas seções anteriores, explicamos como o BTCPay Server funciona com Zcash e por que isso é importante para pagamentos que preservam a privacidade. Agora é hora de colocar a mão na massa.

Sua configuração exata vai depender de vários fatores:

- Você já tem uma instância do BTCPay Server?
- Você quer usar um lightwalletd público ou executar seu próprio nó completo?
- O servidor será executado em uma VPS ou em casa?

Este capítulo cobre todos os cenários atuais de configuração - desde instalações mínimas até implantações com soberania total.

Vamos passar pelos seguintes pontos:

- Como implantar tudo do zero em uma VPS, incluindo o nó completo (Zebra)
- Como executar o BTCPay Server em casa mantendo seu IP oculto com **Cloudflare Tunnel**
- Como ativar e configurar o suporte a Zcash dentro da interface web do BTCPay Server
- Como integrar o BTCPay ao seu site ou loja online


## Implantando o BTCPay Server com suporte a Zcash

Vamos passar para a configuração propriamente dita. Nesta seção, vamos instalar o BTCPay Server com suporte a Zcash - seja em uma VPS nova ou adicionando suporte a ZEC a uma instância existente.

Se você já tem o BTCPay Server em funcionamento (por exemplo, para BTC ou Lightning), não precisa reinstalar tudo - basta ativar o plugin de ZEC.

Vamos percorrer várias configurações, desde instalações mínimas usando um nó público de `lightwalletd` até instalações totalmente soberanas com seu próprio nó completo.  
A melhor opção depende da localização do seu servidor e do nível de independência que você deseja da infraestrutura externa.

> Documentação oficial do plugin:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Aviso - uma carteira por instância:**  
> O plugin de Zcash usa **uma carteira compartilhada** entre **todas as lojas** da instância do BTCPay.  
> Se você hospeda várias lojas independentes em uma única instância, todas compartilharão a mesma carteira Zcash.  
> Use instâncias separadas se precisar de isolamento rigoroso entre carteiras.

---

### Configuração recomendada de VPS

Antes de instalar, certifique-se de ter:

- Uma VPS com **Ubuntu 22.04+**
- Um nome de domínio apontando para o endereço IP do seu servidor (via DNS)
- `git`, `docker` e `docker-compose` instalados
- Acesso SSH ao servidor

---

## Preparando seu servidor (parte oculta)

<details>
  <summary>Clique para expandir</summary>

Para implantar o BTCPay Server com suporte a Zcash, você precisará do seguinte:

### 1. VPS com Ubuntu 22.04 ou mais recente

Recomendamos usar uma instalação mínima do **Ubuntu Server 22.04 LTS**.  
Qualquer provedor de VPS que ofereça um endereço IP dedicado servirá.  

**Requisitos mínimos**:  
- 2 núcleos de CPU  
- 4 GB de RAM  
- 40 GB de espaço em disco  

Essa configuração é suficiente se você estiver usando lightwalletd para Zcash.  
Se pretende executar um **nó completo de Zcash**, você precisará de **pelo menos 300 GB** de espaço livre em disco.

---

### 2. Nome de domínio apontando para seu servidor

No painel do seu provedor de DNS, crie um registro `A` para um subdomínio  
(por exemplo, `btcpay.example.com`) apontando para o endereço IP da sua VPS.  

Esse domínio será usado para acessar o BTCPay Server pelo navegador  
e para gerar automaticamente um **certificado SSL gratuito** via Let's Encrypt.

---

### 3. Acesso SSH ao servidor

Para instalar o BTCPay Server, você deve se conectar à sua VPS via SSH.  
No terminal, execute:

`ssh root@YOUR_SERVER_IP`

Se você usa macOS, Linux ou WSL no Windows, o SSH já está disponível no terminal.
No Windows puro, use um cliente SSH como o **PuTTY**.

---

### 4. Instalar Git, Docker e Docker Compose

Depois de se conectar via SSH, atualize os pacotes do sistema e instale os componentes necessários:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> No Ubuntu 22.04 e versões mais recentes, `docker-compose` do APT está obsoleto.
> O pacote recomendado é `docker-compose-plugin`, que fornece o comando `docker compose` (observe o espaço em vez do hífen).

Seu ambiente de servidor agora está pronto para instalar o BTCPay Server.

</details>

---

### Etapa 1: Clonar o repositório

Crie um diretório de trabalho e baixe a implantação Docker do BTCPay Server:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Etapa 2: Exportar variáveis de ambiente

Substitua `btcpay.example.com` pelo seu domínio real:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Se você planeja adicionar Monero ou Litecoin depois, pode incluí-los agora:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Você pode adicionar novas moedas a qualquer momento exportando as variáveis apropriadas e executando novamente o script de configuração:

`. ./btcpay-setup.sh -i`

Para este guia, vamos nos concentrar **apenas em Zcash**.

---

### Etapa 3: Executar o instalador

Execute o script de configuração para construir e iniciar o servidor:

`. ./btcpay-setup.sh -i`

O script instalará dependências, gerará o `docker-compose.yml`, iniciará os serviços e configurará o `systemd`.
Isso leva cerca de 5 minutos.

Quando terminar, sua instância do BTCPay Server estará disponível em:

`https://btcpay.example.com`

> Se você estiver modificando uma instalação existente (por exemplo, adicionando ZEC), certifique-se de parar e reiniciar o servidor com as novas configurações:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Em seguida, prossiga para a próxima seção para configurar o Zcash na interface web do BTCPay Server.



## Executando seu próprio nó completo de Zcash

Se você prefere **não** depender de nós públicos de `lightwalletd`, pode implantar seu próprio nó completo de Zcash junto com o Lightwalletd no mesmo servidor.  
Isso lhe dá **autonomia total** - sem dependências externas, sem necessidade de confiança.

---

### Etapa 1: Garantir espaço em disco suficiente

Um nó completo de Zcash (Zebra + Lightwalletd) atualmente requer **mais de 300 GB** de espaço em disco, e esse valor continua crescendo.

Detalhamento:

- O banco de dados da blockchain do Zebra: ~260-270 GB
- A indexação do Lightwalletd: ~15-20 GB

#### Armazenamento recomendado:

- **400 GB+** se o servidor for usado **apenas** para pagamentos em Zcash
- **800 GB+** se o servidor também executar BTCPay Server, PostgreSQL, Nginx etc.

> O ideal é usar um disco SSD/NVMe com **1 TB de capacidade**, especialmente se você não pretende podar os dados regularmente.

---

### Etapa 2: Definir variáveis de ambiente

Acrescente o seguinte à configuração do seu ambiente para ativar a configuração de nó completo:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Isso incluirá o fragmento `zcash-fullnode`, que inicia tanto o `zebrad` quanto o `lightwalletd` dentro do BTCPay Server.

---

### Etapa 3: Executar novamente o instalador

`. ./btcpay-setup.sh -i`

O script irá:

* Baixar as imagens Docker do Zebra e do Lightwalletd
* Configurar os serviços dentro da pilha do BTCPay
* Vincular o plugin de Zcash à instância **local** de `lightwalletd`

> **A sincronização completa da blockchain pode levar vários dias**, especialmente em VPS com poucos recursos.
> Até que a sincronização seja concluída, pagamentos blindados não estarão disponíveis.


## Conectando-se a um nó externo de Lightwalletd

Na maioria dos casos, autonomia total não é necessária - e os comerciantes talvez não queiram gastar tempo e espaço em disco executando um nó completo de Zcash.  
Por padrão, o BTCPay Server se conecta a um nó público de `lightwalletd` para processar pagamentos blindados sem baixar a blockchain inteira.

O endpoint padrão é:

`https://zec.rocks:443`

No entanto, você pode configurar o BTCPay Server para se conectar a **qualquer nó externo de `lightwalletd`**, como:

`https://lightwalletd.example:443`

Esta seção mostra como fazer isso usando um **fragmento Docker personalizado**.

> Um exemplo completo de configuração com todas as variáveis de ambiente está disponível no [repositório do plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> As etapas abaixo mostram uma configuração mínima funcional.

---

### Etapa 1: Criar um fragmento Docker personalizado

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
Isso evita conflitos de configuração - por exemplo, você não pode executar simultaneamente o fragmento `zcash-fullnode` e este fragmento personalizado externo de `lightwalletd`.
Ao marcá-lo como `exclusive: zcash`, o BTCPay Server desativará automaticamente os contêineres padrão `zcash-fullnode` e `lightwalletd` internos, permitindo que você se conecte ao seu próprio nó externo.

---

### Etapa 2: Definir variáveis de ambiente

No terminal:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Etapa 3: Definir o endereço do nó externo

Abra seu arquivo `.env`:

`nano .env`

Adicione a seguinte linha, substituindo a URL pelo endpoint escolhido:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Você pode usar:

* Um **nó público**, como `https://lightwalletd.zcash-infra.com`
* Seu próprio nó auto-hospedado, implantado separadamente do BTCPay Server

> Se o `lightwalletd` externo ficar indisponível ou sobrecarregado, os pagamentos blindados falharão.
> Para serviços críticos, escolha um **endpoint estável e comprovado** (como o padrão `zec.rocks`).

> Quer hospedar seu próprio `lightwalletd`?
> Você pode usar o `docker-compose.lwd.yml` do [repositório Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Aviso:** Esta configuração não é documentada oficialmente e exige configuração manual de TLS, encaminhamento de portas e firewall - recomendada apenas para usuários avançados.

---

### Etapa 4: Executar novamente o instalador

`. ./btcpay-setup.sh -i`

O BTCPay Server aplicará sua configuração personalizada e se conectará ao nó `lightwalletd` especificado.

A partir de agora, o plugin de Zcash usará esse endpoint externo para processar transações blindadas.


## Hospedando o BTCPay Server em casa com Cloudflare Tunnel

Quer aceitar pagamentos em Zcash hospedando o BTCPay Server em um dispositivo doméstico - como um Raspberry Pi 5 ou qualquer servidor local **sem IP estático**?  
Você pode expor sua instância à internet com segurança usando **Cloudflare Tunnel**.

Esse método evita o encaminhamento de portas e oculta seu endereço IP real do público - mantendo seu servidor acessível por HTTPS.

Também ajuda você a **evitar o custo de alugar uma VPS**, o que é ideal se pagamentos em criptomoedas forem um recurso opcional, e não o núcleo do seu negócio.

---

### Etapa 1: Instalar o Cloudflare Tunnel

1. Crie uma conta em [cloudflare.com](https://www.cloudflare.com) e adicione seu domínio.
2. No seu **servidor doméstico**, instale o Cloudflare Tunnel:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Autentique-se com a Cloudflare:

`cloudflared tunnel login`

Esse comando abrirá uma janela do navegador. Faça login e autorize o acesso ao seu domínio.
A Cloudflare criará automaticamente um arquivo `credentials` com um token no seu servidor.

4. Crie um novo túnel (você pode chamá-lo de `btcpay` ou qualquer outro nome):

`cloudflared tunnel create btcpay`

Isso gera um arquivo `btcpay.json` contendo o ID do túnel e as credenciais - você precisará dele na próxima etapa.

---

### Etapa 2: Criar o arquivo de configuração do túnel

Crie o diretório de configuração (caso não exista) e abra o arquivo de configuração:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Cole a seguinte configuração:

```
tunnel: btcpay    # nome do seu túnel
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # seu domínio
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Explicação:

* `tunnel` - nome do túnel que você criou anteriormente
* `credentials-file` - caminho para o arquivo de token gerado durante `cloudflared tunnel login`
* `hostname` - seu domínio registrado na Cloudflare (por exemplo, `btcpay.example.com`)
* `service` - endereço local do seu BTCPay Server (normalmente `http://127.0.0.1:80` para Nginx)

> A Cloudflare fará o proxy do tráfego com segurança para seu servidor local, sem expor o IP da sua casa.


### Etapa 3: Adicionar um registro DNS para o seu túnel

Após criar o túnel, a Cloudflare geralmente **adicionará automaticamente um registro DNS CNAME** para o seu domínio. Ele deve se parecer com isto:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Se ele não aparecer automaticamente, adicione-o manualmente:

1. Vá ao seu [Painel da Cloudflare](https://dash.cloudflare.com/)
2. Navegue até a seção **DNS**
3. Adicione um novo registro CNAME:
   - **Name**: `btcpay`
   - **Target**: `<UUID>.cfargotunnel.com`  
     Você pode encontrar o valor exato no seu arquivo `btcpay.json` ou executando:
     
     `cloudflared tunnel list`
     
   - **Proxy status**: Enabled (nuvem laranja)

> Esse registro garante que todas as solicitações para `btcpay.example.com` sejam roteadas pelo Cloudflare Tunnel, ocultando seu endereço IP real do público.

---

### Etapa 4: Ativar o túnel na inicialização do sistema

Para fazer o túnel iniciar automaticamente na inicialização, instale-o como um serviço do sistema:

`sudo cloudflared service install`

Depois, habilite e inicie o serviço:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Verifique o status:

`sudo systemctl status cloudflared`

Você deverá ver uma mensagem como `Active: active (running)` e a confirmação de que `btcpay.example.com` está online.

> A partir de agora, o túnel iniciará automaticamente a cada reinicialização, e seu BTCPay Server ficará acessível publicamente - sem encaminhamento de portas e sem expor seu IP real.

---

### Etapa 5: Finalizar a configuração do BTCPay Server

Se você estiver prestes a instalar o BTCPay Server pela primeira vez, defina seu domínio antes de executar o script de configuração:

`export BTCPAY_HOST="btcpay.example.com"`

Isso garante que o domínio correto seja usado ao gerar a **configuração do Nginx** e os **certificados SSL**.

Se o BTCPay Server já estiver instalado e você estiver apenas adicionando o túnel:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

A configuração regenerará os arquivos e aplicará o novo domínio.
Agora você deve conseguir acessar seu servidor em:

`https://btcpay.example.com`

> Quer você esteja usando um `lightwalletd` público ou seu próprio nó completo, isso não afeta o túnel.
> Tudo o que importa é que o BTCPay Server esteja escutando localmente em `127.0.0.1:80`.


## Configurando o plugin de Zcash na interface web do BTCPay Server

> **Importante para configurações com múltiplas lojas:**  
> A carteira Zcash configurada aqui é **global** para a instância. Todas as lojas usarão essa carteira, a menos que você execute instâncias separadas do BTCPay.

Depois de implantar com sucesso sua instância do BTCPay Server, você precisará realizar algumas configurações básicas pela interface web de administração.  
A documentação oficial fornece instruções completas em inglês - aqui, vamos percorrer as etapas essenciais e focar especificamente na configuração do plugin de Zcash.

---

### Etapa 1: Fazer login na interface web

Acesse sua instância em:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Digite seu login e senha de administrador.
- Se esta for sua primeira vez acessando, você será solicitado a criar uma conta.
- A primeira conta registrada receberá automaticamente privilégios de administrador.

---

### Etapa 2: Instalar o plugin de Zcash

1. No menu principal, vá para:

`Plugins -> Browse Plugins`

2. Localize o plugin **Zcash (ZEC)**. Use a barra de busca se necessário.
3. Clique em **Install** e confirme.

> Repita esse processo para quaisquer outras altcoins que você tenha ativado durante a configuração do servidor.

Após a instalação, clique em **Restart Server** para recarregar a interface com os plugins ativos.


### Etapa 3: Conectar sua carteira via Viewing Key

Depois de instalar o plugin, uma nova seção **Zcash** aparecerá no menu de configurações.

1. Vá para:

`Zcash -> Settings`

2. Cole sua **Unified Full Viewing Key (UFVK)** - o BTCPay derivará um Unified Address para cada fatura e detectará pagamentos blindados recebidos.

> **Observação:** Viewing keys legadas de Sapling são compatíveis, mas para usar Orchard/Unified Addresses você deve fornecer uma **UFVK**.


   Formato de exemplo:

`uview184syv9wftwngkay8d...`

3. Digite um valor no campo Block height

* **Primeira configuração com uma nova carteira (nova seed phrase):** digite o block height atual do Zcash (você pode verificá-lo em 3xpl.com/zcash) - isso acelera a varredura inicial.
* **Migração no mesmo servidor de uma configuração legada apenas com Sapling para Unified Addresses / Orchard:** deixe esse campo em branco.
* **Movendo sua loja para um novo servidor com a mesma carteira/UFVK:** opcionalmente, informe a birth height - uma altura aproximada do primeiro pedido pago da sua loja (compare a data do pedido no 3xpl para restringir a varredura). Se não tiver certeza, deixe em branco.

> Nem todas as carteiras ainda oferecem suporte à exportação de **Unified Full Viewing Key (UFVK)**.  
> Opções recomendadas:  
> – [**YWallet**](https://ywallet.app/installation)  
> – [**Zingo! Wallet (version for PC)**](https://zingolabs.org/)  
> Em ambos os aplicativos, procure a exportação de UFVK na seção de backup/exportação.

Essas chaves oferecem suporte à **rotação automática de endereços**, o que significa:
- Cada cliente recebe um endereço de pagamento **único**
- Você vê um saldo **único e unificado**

Você pode encontrar uma lista de compatibilidade mais ampla em [ZecHub -> Wallets](https://zechub.wiki/wallets).

Depois que todos os campos forem preenchidos, clique em **Save**.

---

### Teste seu fluxo de pagamento em ZEC

Parabéns - sua carteira Zcash agora está conectada ao BTCPay Server.

Vamos fazer um teste:

1. Vá para:

`Invoices -> Create New`

2. Gere uma fatura de teste para um pequeno valor em ZEC.
3. Envie fundos de **uma carteira diferente** (não a que está conectada ao BTCPay).
4. Quando a transação for detectada, a página da fatura exibirá uma celebração visual.
5. Confirme que o status da fatura muda para **Paid**.

Se tudo funcionar - você está pronto para integrar pagamentos em ZEC ao seu site usando a API ou plugins de CMS.



## Integrando o BTCPay Server ao seu site

Depois que sua carteira Zcash estiver conectada ao BTCPay Server, você poderá integrar o sistema de pagamentos ao seu site.  
Há várias maneiras de fazer isso - desde acesso direto por API até plugins prontos para uso em plataformas CMS populares.

---

### Opções de integração

- **Integração por API**  
  Ideal para sites personalizados ou sistemas sem CMS.  
  Dá a você controle total sobre criação de faturas, rastreamento de pagamentos e notificações - tudo dentro da sua própria interface e lógica.  
  Exige conhecimento básico de programação, portanto essa tarefa é melhor executada pelo seu desenvolvedor.

- **Plugins de CMS**  
  Disponíveis para plataformas como **WooCommerce**, **PrestaShop** e outras.  
  Esses plugins permitem aceitar pagamentos em apenas alguns minutos - sem necessidade de programação.

- **Botão de pagamento ou Iframe**  
  O método mais simples.  
  Perfeito para landing pages, sites pessoais ou qualquer site em que você só queira incorporar um link de doação ou widget de checkout.

---

### Integração por API

Se você estiver usando uma plataforma personalizada (ou nenhum CMS), a API é a melhor opção.  
Ela oferece flexibilidade total: você pode criar faturas, acompanhar o status delas, receber notificações e controlar completamente a experiência do usuário.

> Observação: até mesmo alguns plugins de CMS usam a API nos bastidores, então criar uma chave de API costuma ser o **primeiro passo necessário**, independentemente do seu método de integração.

Próxima etapa: gere uma chave de API para sua loja e comece a usar a [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) para criar sua integração.


### Gerando uma chave de API

Para integrar o BTCPay Server ao seu site ou aplicativo, você precisará gerar uma chave de API.

1. Faça login no BTCPay Server e abra o **menu do usuário** (canto superior direito)
2. Vá para **API Keys**
3. Clique em **Create a new API key**
4. Digite um nome para sua chave
5. Na seção **Permissions**, ative:
   - `Can create invoice`
   - `Can view invoice`
   - *(Opcional)* `Can modify store settings` - apenas se você precisar de gerenciamento em nível de loja

6. Clique em **Generate**. Sua chave de API pessoal será exibida - copie-a e armazene-a com segurança.

> Essa chave concede acesso às faturas da sua loja.  
> **Não** a compartilhe publicamente nem a exponha em código executado no cliente.

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
* Uma URL de pagamento que você pode incorporar ao seu site ou enviar ao cliente

Veja a documentação completa:
[Greenfield API – Create Invoice](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Configurando um webhook (opcional)

Para receber notificações em tempo real quando o status das faturas mudar (por exemplo, quando um pagamento for recebido):

1. Vá para as configurações da sua loja -> **Webhooks**
2. Adicione a URL do endpoint do seu backend que processará requisições `POST` do BTCPay Server
3. O BTCPay enviará automaticamente notificações quando uma fatura for paga ou expirar

As cargas de webhook e a lógica de novas tentativas são descritas na [documentação oficial de webhooks](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Exemplos de integração estão disponíveis para várias linguagens de programação na documentação e nos repositórios GitHub do BTCPay.



### Integração com CMS

O BTCPay Server oferece suporte a plugins para sistemas populares de gerenciamento de conteúdo (CMS).  
A integração mais madura e amplamente usada é com **WordPress + WooCommerce**, facilitando a aceitação de pagamentos em ZEC **sem escrever código**.

---

#### WooCommerce (WordPress)

O BTCPay Server oferece suporte oficial a um plugin para WooCommerce.

Etapas para integrar:

1. Instale o plugin **BTCPay for WooCommerce** a partir do diretório de plugins do WordPress ou do GitHub.
2. No painel de administração do WordPress, vá para:

`WooCommerce -> Settings -> Payments`

3. Encontre **BTCPay** na lista e clique em **Set up**
4. Digite a URL do seu BTCPay Server e siga as instruções de autorização  
   (a geração automática de chave de API é recomendada)
5. Ative o método de pagamento e salve suas configurações

> Instruções detalhadas, tutoriais em vídeo e guias de solução de problemas estão disponíveis na documentação do plugin.

Você também encontrará outras opções de integração com CMS nessa mesma seção da documentação do BTCPay.

---

### Botão de pagamento ou Iframe (sem CMS ou API)

Se você não usa um CMS e não quer trabalhar com APIs, a maneira mais fácil de aceitar pagamentos em ZEC é **incorporar um link ou widget de pagamento** diretamente no seu site.

Esse método é ideal para:

- Landing pages
- Sites de portfólio
- Blogs ou páginas estáticas
- Projetos sem servidor backend

---

#### Opção 1: Botão de pagamento (link)

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

#### Opção 2: Fatura incorporada (Iframe)

Para exibir a fatura diretamente no seu site, use um iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Você pode estilizar o botão ou o contêiner do iframe para combinar com o design do seu site - o BTCPay Server permite personalização flexível do tema da página de fatura.

## Conclusão

Este guia foi longo - mas cobre apenas os aspectos fundamentais da integração de pagamentos em Zcash com o BTCPay Server.

A interface do BTCPay Server oferece muito mais funcionalidades do que mostramos aqui. Felizmente, a interface está disponível em vários idiomas (incluindo russo), o que facilita explorar e experimentar mais.

BTCPay é uma ferramenta altamente flexível. Você pode:

* Hospedar várias lojas independentes em uma única instância
* Definir funções e permissões personalizadas para membros da equipe - desde apenas visualizar pedidos até administração completa
* Usar seus próprios domínios e identidade visual
* Configurar webhooks, carteiras de fallback e até acesso via Tor
* Configurar ajustes avançados como regras tributárias, códigos de desconto, personalização da página de checkout, restrições de métodos de pagamento e muito mais

O BTCPay foi criado como uma alternativa de código aberto aos provedores de pagamento centralizados. Se você quer aceitar pagamentos privados em ZEC sem intermediários, esta plataforma definitivamente merece sua atenção.

Desejamos sucesso na sua exploração do ecossistema BTCPay e em tornar seus pagamentos verdadeiramente seus.

## Recursos

* [Site oficial do BTCPay Server](https://btcpayserver.org/)
* [FAQ do BTCPay](https://docs.btcpayserver.org/FAQ/)
* [Repositório GitHub do BTCPay Server](https://github.com/btcpayserver/btcpayserver)
* [Demonstração Mainnet do BTCPay Server](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Plugin de Zcash para BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Guia de instalação do plugin de Zcash](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Exemplo personalizado de zcash-lightwalletd.custom.yml](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Arquivo Docker Compose do Lightwalletd (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Documentação da chave de API do BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Criar um Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Lista de compatibilidade de carteiras Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd no Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
