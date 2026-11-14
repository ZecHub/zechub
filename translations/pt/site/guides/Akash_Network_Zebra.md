# Como rodar Zebra na Akash Network

Guia passo a passo para implantar um nó integral Zebra Zcash na Akash.

### O que você está implantando

Um nó integral Zebra que vai:

-> Sincronizar toda a blockchain do Zcash (mais de 100GB para a mainnet, ~40GB para a testnet)

-> Custar aproximadamente US$ 15/mês, dependendo dos preços do token AKT

-> Levar de várias horas a dias para sincronizar completamente

-> Usar 4 vCPUs, 16GB de RAM e 350GB de armazenamento (mainnet) ou 2 vCPUs, 8GB de RAM e 50GB (testnet)

O template awesome-akash agora fixa a versão **Zebra 7.0.0** (nunca `:latest`). Ele habilita internamente o Prometheus (`9999`) e o health (`8080`), o JSON-RPC internamente para um **lightwalletd** colocalizado no gRPC **9067**, e as feature flags `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`.

Para um nó Mainnet podado e mais rápido, veja [Como rodar Zakura na Akash](/guides/akash-network-zakura). Para um painel Regtest descartável, veja [Assim falou Zakura na Akash](/guides/thus-spoke-zakura-akash).


### Como a Akash publica as portas

Os números no SDL (`port` / `as`) são **portas do contêiner**. O Zebra continua escutando na **8233**, o lightwalletd na **9067** e o health na **8080**. Esses números servem para o processo e para outros serviços na mesma implantação (`zebra:8232`).

Eles **não** são as portas no IP público do provedor.

**Padrão (este template):** sem IP dedicado. Para cada expose TCP `global: true`, o provedor mapeia uma **porta alta aleatória** em um host compartilhado para a porta do seu contêiner. Depois que o lease estiver ativo, o Console/Air em **Leases → URIs** lista os endpoints reais, por exemplo:

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Os peers e as carteiras usam **esses** valores host:porta. Copie a URI do expose que interessa a você (P2P ou lightwalletd). Se você definir `ZEBRA_NETWORK__EXTERNAL_ADDR`, defina-o com a URI P2P mapeada (`provider.example:31482`), não com `…:8233`.

**HTTP** (`as: 80` com `http_options`, usado no painel Thus Spoke): muitos provedores publicam um **hostname de ingress** (geralmente na 80/443) em vez de uma porta TCP aleatória. Abra a URI desse serviço em um navegador.

**Interno** (`global: false` ou `to: service: lightwalletd`): apenas DNS do cluster (`zebra:8232`). Sem URI pública.

**IPs dedicados** (`endpoints` / `kind: ip` no SDL) são um **extra premium**. Eles podem fixar um IP público e, às vezes, a porta `as` nesse IP. Estes templates **não** solicitam um. Adicione isso você mesmo depois, se quiser um `host:8233` estável; espere um custo extra e menos provedores dando lances.

### Qual site usar (pagamentos)

O SDL é o mesmo. As duas interfaces web da Akash diferem em **como você paga**.

| Site | Pagamentos | Carteira |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Checkout web tradicional (cartão / meios fiat que o Console oferece) | Conta do Console |
| [air.akash.network](https://air.akash.network) | Pagamentos nativos na chain da Akash (AKT / ACT) | **Keplr** |

Use o **Air** quando quiser pagar on-chain com a Keplr. Use o **Console** quando quiser um fluxo de pagamento web convencional. Não espere liquidação nativa via Keplr no Console.

### Pré-requisitos

**Se você pagar no Console (checkout web)**

1. Uma conta do Console em [console.akash.network](https://console.akash.network)
2. Um método de pagamento aceito pela interface do Console
3. Alguns minutos na interface

**Se você pagar no Air (Akash nativo / Keplr)**

1. Extensão de navegador **Keplr** (Chrome/Brave/Firefox)
2. **AKT / ACT** na Keplr para o depósito e o lease (de uma corretora ou via IBC)
3. Abra [air.akash.network](https://air.akash.network)

#### Passo 1: Conectar

**Console (pagamentos web)**

-> Acesse [https://console.akash.network](https://console.akash.network)

-> Faça login / conclua o fluxo de conta do Console

-> Use o checkout que a interface apresentar (não a Keplr on-chain)

**Air (pagamentos nativos da Akash)**

-> Acesse [https://air.akash.network](https://air.akash.network)

-> Clique em **"Conectar carteira"**

-> Escolha **Keplr** e aprove a conexão

-> Confirme que seu saldo de AKT/ACT é suficiente para o depósito mais o lease

#### Passo 2: Criar a implantação

-> Clique em **"Deploy"**

-> Escolha **"Build your template"** (ou pule direto para o upload do SDL)


##### Opção A: Fazer upload do arquivo SDL (recomendado)

**Pagamentos web (Console)**

[![Implantar no Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Pagamentos nativos da Akash com Keplr (Air)**

[Abra este template no Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Opção B: Usar o editor de SDL

Se você quiser colar manualmente [o SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Copie o conteúdo de *zebra-akash.yml*

-> Cole no editor de SDL

-> Modifique conforme necessário (veja a seção de configuração abaixo)

-> Clique em **"Create Deployment"**


#### Passo 3: Revisar e aprovar o depósito

A interface vai mostrar:

-> **Depósito da implantação**: ~5 AKT (você recebe de volta quando fechar a implantação)

-> **Custo estimado**: com base nos preços do seu SDL

No **Air**, clique em **"Approve"** e assine na **Keplr**. No **Console**, conclua o checkout web que a interface apresentar.

#### Passo 4: Escolher um provedor

Depois de ~30 segundos, você verá lances dos provedores. Cada lance mostra:

-> **Preço por bloco** (em AKT ou USDC)

-> **Custo mensal estimado**

-> **Detalhes do provedor** (uptime, região etc.)


**Não escolha simplesmente o mais barato.** Verifique:

-> Uptime % (busque > 95%)

-> Região (mais perto de você = melhor latência, mas isso não importa muito para nós de blockchain)

-> Status de auditado (marca de verificação verde = mais confiável)


Clique em **"Accept Bid"** no provedor escolhido. No Air, assine na Keplr. No Console, confirme pelo fluxo de pagamento web.

#### Passo 5: Aguardar a implantação

O Console vai:

-> Criar o lease com o provedor escolhido

-> Enviar o manifesto (que diz ao provedor o que executar)

-> Iniciar seu contêiner

Isso leva de 1 a 2 minutos. Você verá atualizações de status na interface.

#### Passo 6: Verificar se está rodando

Depois de implantado, você verá:

-> Aba **Services**: mostra seu serviço *zebra* com o status

-> Aba **Logs**: logs do contêiner em tempo real

-> Aba **Leases**: detalhes sobre sua implantação (DSEQ, provedor, custo)


##### Verificar os logs

Clique em **Logs** e você deverá ver o Zebra iniciando:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

A sincronização vai levar **de horas a dias**, dependendo da rede. Fique de olho em:

-> Alturas de bloco aumentando

-> Conexões com peers (devem ser de 10 a 30 peers)

-> Ausência de erros repetidos


#### Passo 7: Obter o endereço do seu nó

Clique na aba **Leases** e depois em **URIs**.

Você verá algo como:

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

Cada linha é um expose `global: true`. O nome inclui a porta `as` do SDL (8233, 9067). O número depois do hostname é a **porta mapeada pelo provedor**, atribuída no momento do lease. Outros nós Zcash se conectam a `provider-hostname.com:31482`. As carteiras compactas usam a URI lightwalletd (TLS desativado, a menos que você mesmo faça a terminação TLS).

O contêiner continua escutando nas portas 8233 / 9067. O endereço público é sempre a URI, a menos que você adicione depois um IP dedicado (não incluído neste template).

### Opções de configuração

#### Mudar para a Testnet

O SDL usa a Mainnet por padrão. Para usar a Testnet:

-> **Comente a configuração da Mainnet** na seção *env*:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Descomente a configuração da Testnet**:

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

-> **Opcional: reduza os recursos** para a Testnet em *profiles.compute.zebra.resources*:

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

#### Habilitar o acesso RPC

O RPC vem desabilitado por padrão, por segurança. Para habilitá-lo:

**Para a Mainnet:**

-> Descomente na seção *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Descomente a porta RPC da Mainnet em *expose*:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Para a Testnet:**

-> Descomente na seção *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Descomente a porta RPC da Testnet em *expose*:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Aviso**: se você definir *global: true* para o RPC, estará expondo-o à internet. O Zebra usa autenticação por cookie por padrão, mas mesmo assim, não faça isso a menos que saiba o que está fazendo.

Se você expuser o RPC com `global: true`, o endereço público continua sendo uma **URI do lease** (`host:&lt;random-high-port&gt;`), não `host:8232`. Com `global: false` (este template), o RPC fica na rede da implantação (`zebra:8232` para lightwalletd). Leases com IP dedicado são uma opção paga à parte e não estão no SDL.

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

#### Ajustar recursos/preços

Se você não está recebendo lances ou quer otimizar o custo:

**Para provedores com especificações menores**, reduza na seção *profiles.compute.zebra.resources*:

-> CPU: *units: 2* (mínimo para uma velocidade de sincronização razoável)

-> Memória: *size: 12Gi* (mínimo para estabilidade)

-> Armazenamento: *size: 120Gi* (mínimo para a mainnet)

**Para atrair mais lances**, aumente em *profiles.placement.akash.pricing*:

-> Mainnet: experimente *amount: 1000000* uakt/bloco

-> Testnet: experimente *amount: 1000000* uakt/bloco

### Atualizar sua implantação

Precisa mudar a configuração depois de implantar?

-> Vá para **My Deployments** no Console

-> Encontre sua implantação Zebra

-> Clique em **"Update Deployment"**

-> Edite o SDL

-> Clique em **"Update"** (Air: assine na Keplr; Console: confirme o fluxo de pagamento web)

**Observação**: a atualização vai reiniciar seu contêiner. O nó vai retomar a partir do estado salvo (armazenamento persistente), mas espere de 1 a 2 minutos de indisponibilidade.

### Monitoramento

#### Pelo Console

-> **Aba Logs**: logs do contêiner em tempo real

-> **Aba Shell**: abra um shell dentro do contêiner (útil para depuração)

-> **Aba Events**: eventos do Kubernetes (geralmente inúteis, a menos que algo esteja quebrado)


#### Pelo RPC (se habilitado)

Se você habilitou o RPC, pode consultar seu nó como um nó integral zebrad normal (porque ele é um!)

### Fechar sua implantação

Quando terminar ou quiser parar de pagar:

-> Vá para **My Deployments**

-> Encontre sua implantação Zebra

-> Clique em **"Close Deployment"**

-> Confirme (Air: assine na Keplr; Console: confirme na interface do Console)

Seu depósito de 5 AKT será reembolsado. O **armazenamento persistente** deve ser preservado pelo provedor, mas não conte com isso: trate-o como qualquer outro provedor de nuvem.

### Solução de problemas

#### Erro "Insufficient funds"

No Air, adicione AKT/ACT à Keplr. No Console, faça uma recarga no método de pagamento do Console.

#### Nenhum lance aparece

Ou:

-> Seu preço está baixo demais (aumente *amount* no SDL)

-> Seus requisitos de recursos estão altos demais para os provedores disponíveis (reduza CPU/memória/armazenamento)

-> Espere mais um pouco (às vezes leva de 60 a 90 segundos para os lances aparecerem)


#### Implantação travada em "pending"

O provedor pode estar com problemas. Feche a implantação e tente outro provedor.

#### Os logs do Zebra mostram "No peers connected"

Isso é normal nos primeiros minutos. O Zebra vai descobrir peers automaticamente. Se persistir por mais de 10 minutos, você pode ter um problema de rede (improvável na Akash).

#### Erros "Out of memory" nos logs

Você economizou demais na RAM. Feche a implantação e implante novamente com pelo menos 12Gi de memória (16Gi recomendados).

#### A sincronização está demorando uma eternidade

Defina "eternidade":

-> **Horas**: normal

-> **Dias**: também normal para a mainnet do zero

-> **Semanas**: algo está errado, verifique os logs em busca de erros


### Gestão de custos

Monitore seus gastos no Console ou no Air:

-> **My Deployments** -> Sua implantação -> Mostra a estimativa "Cost per month"

-> Air: seu saldo de AKT/ACT na Keplr diminui com o tempo. Console: seu saldo de pagamento no Console diminui.


Quando seu saldo ficar baixo, a Akash vai fechar sua implantação automaticamente. **Faça recargas na sua carteira periodicamente** ou configure alertas.

#### Reduzir custos

-> **Use a Testnet** para testes fora de produção (50% mais barato)

-> **Reduza CPU/memória** se você não precisa de sincronização rápida

-> **Escolha provedores mais baratos** (nem sempre é sensato: o uptime importa)


### Mainnet vs. Testnet

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

Comece pela Testnet se você está apenas testando o processo de implantação. Veja a seção "Mudar para a Testnet" acima para a configuração.

### Recursos adicionais

**Akash Console** (pagamentos web): [https://console.akash.network](https://console.akash.network)

**Akash Air** (AKT/ACT nativo + Keplr): [https://air.akash.network](https://air.akash.network)

**Documentação da Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Documentação do Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Exploradores do Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (para problemas com provedores)
