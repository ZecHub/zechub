# Como executar o Zebra na Akash Network

Guia passo a passo para implantar um nó completo Zebra de Zcash usando o [Akash Console](https://console.akash.network).

### O que você vai implantar

Um nó completo Zebra que irá:

-> Sincronizar toda a blockchain da Zcash (100GB+ para mainnet, ~40GB para testnet)

-> Custar aproximadamente $15/mês, dependendo dos preços do token AKT

-> Levar de várias horas a dias para sincronizar completamente

-> Usar 4 vCPUs, 16GB de RAM, 350GB de armazenamento (mainnet) ou 2 vCPUs, 8GB de RAM, 50GB (testnet)


### Importante: Mapeamento de portas na Akash

Quando você expõe uma porta na Akash (por exemplo, a porta 8233 para o P2P do Zebra), ela **NÃO é vinculada a essa porta exata** no IP público do provedor. Em vez disso, o provedor atribui uma porta alta aleatória (como 31234 ou 42567) e faz um proxy reverso para a porta 8233 do seu contêiner.

Isso é intencional — os provedores executam várias implantações, e haveria conflitos se todos tentassem usar a porta 8233 diretamente.

**O que isso significa para você:**

-> Você configura a porta 8233 no SDL (porta P2P padrão do Zebra)

-> A Akash fornece uma URI como *provider.com:31234*

-> Outros nós Zcash se conectam a você em *provider.com:31234*

-> Dentro do seu contêiner, o Zebra continua escutando na 8233


Isso é tratado automaticamente. Basta usar a URI que a Akash fornecer.

### Pré-requisitos

1. Extensão de navegador **Keplr Wallet** instalada (Chrome/Brave/Firefox)
2. Tokens **AKT** — obtenha 50-100 AKT em uma exchange (Coinbase, Kraken, Osmosis)
3. **5 minutos** para clicar pela interface do Console

#### Etapa 1: Conecte sua carteira

-> Vá para [https://console.akash.network](https://console.akash.network)

-> Clique em **"Connect Wallet"** no canto superior direito

-> Escolha **Keplr** (ou sua carteira Cosmos preferida)

-> Aprove a conexão quando o Keplr abrir


Seu saldo de AKT deve aparecer no canto superior direito. Se estiver zerado, primeiro deposite fundos na sua carteira.

#### Etapa 2: Criar implantação

-> Clique no botão **"Deploy"** (grande botão azul, no centro da página)

-> Escolha **"Build your template"** (ou pule diretamente para o upload do SDL)


##### Opção A: Fazer upload do arquivo SDL (Recomendado)

[![Implantar na Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Opção B: Usar o editor SDL

Se você quiser colar manualmente [o SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Copie o conteúdo de *zebra-akash.yml*

-> Cole no editor SDL

-> Modifique conforme necessário (veja a seção de configuração abaixo)

-> Clique em **"Create Deployment"**


#### Etapa 3: Revisar e aprovar o depósito

O Console mostrará para você:

-> **Depósito da implantação**: ~5 AKT (você recebe isso de volta ao encerrar a implantação)

-> **Custo estimado**: com base no preço definido no seu SDL

Clique em **"Approve"** e assine a transação no Keplr.

#### Etapa 4: Escolher um provedor

Após ~ 30 segundos, você verá lances dos provedores. Cada lance mostra:

-> **Preço por bloco** (em AKT ou USDC)

-> **Custo mensal estimado**

-> **Detalhes do provedor** (uptime, região etc.)


**Não escolha apenas o mais barato.** Verifique:

-> % de uptime (mire em > 95%)

-> Região (mais perto de você = melhor latência, mas isso não importa muito para nós de blockchain)

-> Status auditado (marca de verificação verde = mais confiável)


Clique em **"Accept Bid"** no provedor escolhido e assine no Keplr.

#### Etapa 5: Aguardar a implantação

O Console irá:

-> Criar o lease com o provedor escolhido

-> Enviar o manifesto (diz ao provedor o que executar)

-> Iniciar seu contêiner

Isso leva de 1 a 2 minutos. Você verá atualizações de status na interface.

#### Etapa 6: Verificar se está em execução

Depois de implantado, você verá:

-> Aba **Services**: mostra seu serviço *zebra* com o status

-> Aba **Logs**: logs do contêiner em tempo real

-> Aba **Leases**: detalhes sobre sua implantação (DSEQ, provedor, custo)


##### Verifique os logs

Clique em **Logs** e você deverá ver o Zebra iniciando:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

A sincronização levará **de horas a dias**, dependendo da rede. Observe:

-> Alturas de bloco aumentando

-> Conexões de peers (devem ser 10-30 peers)

-> Nenhum erro repetido


#### Etapa 7: Obtenha o endereço do seu nó

Clique na aba **Leases** e depois em **URIs**.

Você verá algo como:

```bash
zebra-8233: provider-hostname.com:31234
```

Esse é o **endpoint P2P público** do seu nó. Outros nós Zcash se conectarão a você nesse endereço.

**Observe o mapeamento de portas:** você configurou a porta 8233 no SDL, mas a Akash a atribuiu a uma porta pública diferente (31234 neste exemplo). Isso é normal — veja a seção "Mapeamento de portas na Akash" no topo se isso causar confusão. Seu nó fica acessível na porta que a Akash mostrar aqui, não necessariamente na 8233.

Se você habilitou RPC (comentado por padrão no SDL), também verá aqui o endpoint RPC com sua própria porta mapeada.

### Opções de configuração

#### Mudando para Testnet

O SDL usa Mainnet por padrão. Para usar Testnet:

-> **Comente a configuração de Mainnet** na seção *env*:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Descomente a configuração de Testnet**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> **Atualize a porta exposta** na seção *expose*:

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **Opcional: reduza os recursos** para Testnet em *profiles.compute.zebra.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Opcional: reduza o preço** em *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### Habilitar acesso RPC

O RPC vem desabilitado por padrão por segurança. Para habilitá-lo:

**Para Mainnet:**

-> Descomente na seção *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Descomente a porta RPC de Mainnet em *expose*:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Para Testnet:**

-> Descomente na seção *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Descomente a porta RPC de Testnet em *expose*:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Aviso**: se você definir *global: true* para RPC, estará expondo-o à internet. O Zebra usa autenticação por cookie por padrão, mas mesmo assim — não faça isso a menos que saiba o que está fazendo.

**Lembrete sobre mapeamento de portas**: mesmo que você exponha o RPC globalmente, a Akash o mapeará para uma porta alta aleatória (não 8232/18232). Verifique as URIs na sua implantação para ver o endpoint público real. Para *global: false* (recomendado), o endpoint RPC só é acessível dentro da rede de implantação da Akash, não pela internet pública.

#### Habilitar métricas (Prometheus)

Para coletar métricas para monitoramento:

-> Descomente em *env*:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Descomente a porta de métricas em *expose*:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Ajustar recursos/preço

Se você não estiver recebendo lances ou quiser otimizar o custo:

**Para provedores com especificações menores**, reduza na seção *profiles.compute.zebra.resources*:

-> CPU: *units: 2* (mínimo para uma velocidade de sincronização razoável)

-> Memória: *size: 12Gi* (mínimo para estabilidade)

-> Armazenamento: *size: 120Gi* (mínimo para mainnet)

**Para atrair mais lances**, aumente em *profiles.placement.akash.pricing*:

-> Mainnet: experimente *amount: 1000000* uakt/bloco

-> Testnet: experimente *amount: 1000000* uakt/bloco

### Atualizando sua implantação

Precisa alterar a configuração após implantar?

-> Vá para **My Deployments** no Console

-> Encontre sua implantação do Zebra

-> Clique em **"Update Deployment"**

-> Edite o SDL

-> Clique em **"Update"** e aprove no Keplr

**Nota**: atualizar reiniciará seu contêiner. O nó retomará do estado salvo (armazenamento persistente), mas espere de 1 a 2 minutos de indisponibilidade.

### Monitoramento

#### Via Console

-> Aba **Logs**: logs do contêiner em tempo real

-> Aba **Shell**: obtenha um shell dentro do contêiner (útil para depuração)

-> Aba **Events**: eventos do Kubernetes (quase inútil, a menos que algo esteja quebrado)


#### Via RPC (se habilitado)

Se você habilitou RPC, pode consultar seu nó como um nó completo zebrad normal (porque ele é!)

### Encerrando sua implantação

Quando terminar ou quiser parar de pagar:

-> Vá para **My Deployments**

-> Encontre sua implantação do Zebra

-> Clique em **"Close Deployment"**

-> Confirme e assine no Keplr

Seu depósito de 5 AKT será reembolsado. O **armazenamento persistente** deve ser preservado pelo provedor, mas não conte com isso — trate como qualquer outro provedor de nuvem.

### Solução de problemas

#### Erro "Insufficient funds"

Você precisa de mais AKT. Coloque fundos na sua carteira Keplr.

#### Nenhum lance aparecendo

Ou:

-> Seu preço está muito baixo (aumente *amount* no SDL)

-> Seus requisitos de recursos estão muito altos para os provedores disponíveis (reduza CPU/memória/armazenamento)

-> Espere mais (às vezes leva de 60 a 90 segundos para os lances aparecerem)


#### Implantação travada em "pending"

O provedor pode estar com problemas. Feche a implantação e tente outro provedor.

#### Os logs do Zebra mostram "No peers connected"

Isso é normal nos primeiros minutos. O Zebra descobrirá peers automaticamente. Se continuar após mais de 10 minutos, você pode ter um problema de rede (improvável na Akash).

#### Erros de "Out of memory" nos logs

Você economizou demais na RAM. Feche a implantação e implante novamente com pelo menos 12Gi de memória (16Gi recomendado).

#### A sincronização está demorando uma eternidade

Defina "uma eternidade":

-> **Horas**: normal

-> **Dias**: também normal para mainnet do zero

-> **Semanas**: algo está errado, verifique os logs em busca de erros


### Gestão de custos

Monitore seus gastos no Console:

-> **My Deployments** -> Sua implantação -> mostra a estimativa de "Cost per month"

-> O saldo da sua carteira Keplr diminuirá com o tempo


Quando seu saldo ficar baixo, a Akash encerrará automaticamente sua implantação. **Recarregue sua carteira periodicamente** ou configure alertas.

#### Reduzindo custos

-> **Use Testnet** para testes não produtivos (50% mais barato)

-> **Reduza CPU/memória** se você não precisa de sincronização rápida

-> **Escolha provedores mais baratos** (nem sempre é sábio — uptime importa)


### Mainnet vs Testnet

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

Comece com Testnet se você estiver apenas testando o processo de implantação. Veja a seção "Mudando para Testnet" acima para a configuração.

### Recursos adicionais

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Documentação da Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Documentação do Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Exploradores de Zcash**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Discord da Akash**: [https://discord.akash.network](https://discord.akash.network) (para problemas com provedores)
