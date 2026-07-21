# Implantando zcashd no Akash via Console

Guia para implantar um nó completo zcashd de Zcash (implementação da Electric Coin Co) usando o [Akash Console](https://console.akash.network). Abaixo há um tutorial em vídeo. Um guia mais detalhado pode ser encontrado mais abaixo.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Configuração de nó completo Zcash na Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## O Que Você Está Implantando

Um nó completo zcashd que irá:

-> Sincronizar toda a blockchain Zcash (350GB+ para mainnet, ~ 40GB para testnet)

-> Custar aproximadamente $15/mês dependendo dos preços do token AKT

-> Levar de várias horas a dias para sincronizar completamente

-> Usar 4 vCPUs, 16GB de RAM, 350GB de armazenamento (mainnet) ou 2 vCPUs, 8GB de RAM, 50GB (testnet)

-> Baixar parâmetros criptográficos na primeira execução (~ 2GB, uma única vez)

**zcashd vs Zebra:**

-> zcashd é a implementação original de nó Zcash pela Electric Coin Co

-> Zebra é a implementação alternativa da Zcash Foundation

-> Ambos são compatíveis com a rede Zcash

-> zcashd tem mais recursos (mineração, carteira, API do Insight Explorer)

-> Use zcashd se você precisar de funcionalidade de carteira ou APIs RPC específicas


### **Importante: Mapeamento de Portas no Akash**

Quando você expõe uma porta no Akash (por exemplo, a porta 8233 para o P2P do zcashd), ela **NÃO é vinculada a essa porta exata** no IP público do provedor. Em vez disso, o provedor atribui uma porta alta aleatória (como 31234 ou 42567) e faz proxy reverso dela para a porta 8233 do seu contêiner.

Isso é intencional — os provedores executam múltiplas implantações, e haveria conflitos se todos tentassem usar a porta 8233 diretamente.

**O que isso significa para você:**

-> Você configura a porta 8233 no SDL (a porta P2P padrão do zcashd)

-> O Akash fornece uma URI como *provider.com:31234*

-> Outros nós Zcash se conectam a você em *provider.com:31234*

-> Dentro do seu contêiner, o zcashd continua escutando na 8233


Isso é tratado automaticamente. Basta usar a URI que o Akash fornecer.

## Pré-requisitos

-> Extensão de navegador **Keplr Wallet** instalada (Chrome/Brave/Firefox)

-> Tokens **AKT** - Obtenha 50-100 AKT em uma exchange (Coinbase, Kraken, Osmosis)

-> **5 minutos** para clicar pela interface do Console


## Etapa 1: Conecte Sua Carteira

-> Vá para [https://console.akash.network](https://console.akash.network)

-> Clique em **"Connect Wallet"** no canto superior direito

-> Escolha **Keplr** (ou sua carteira Cosmos preferida)

-> Aprove a conexão quando o Keplr abrir


Seu saldo de AKT deve aparecer no canto superior direito. Se estiver zerado, primeiro adicione fundos à sua carteira.

## Etapa 2: Criar Implantação

-> Clique no botão **"Deploy"** (grande botão azul, no centro da página)

-> Escolha **"Build your template"** (ou pule diretamente para o upload do SDL)

### Opção A: Enviar Arquivo SDL (Recomendado)

[![Implantar no Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Opção B: Usar o Editor SDL

Se você quiser colar manualmente o SDL:

-> Copie o conteúdo de *zcashd-akash.yml*

-> Cole no editor SDL

-> Modifique conforme necessário (veja a seção de configuração abaixo)

-> Clique em **"Create Deployment"**


## Etapa 3: Revisar e Aprovar o Depósito

O Console mostrará a você:

-> **Depósito da implantação**: ~ 5 AKT (você recebe isso de volta quando fecha a implantação)

-> **Custo estimado**: Com base no preço do seu SDL


Clique em **"Approve"** e assine a transação no Keplr.

## Etapa 4: Escolha um Provedor

Após ~ 30 segundos, você verá lances de provedores. Cada lance mostra:

-> **Preço por bloco** (em AKT ou USDC)

-> **Custo mensal estimado**

-> **Detalhes do provedor** (uptime, região, etc.)


**Não escolha apenas o mais barato.** Verifique:

-> % de uptime (busque > 95%)

-> Região (mais perto de você = melhor latência, mas isso não importa muito para nós de blockchain)

-> Status de auditoria (marca de verificação verde = mais confiável)


Clique em **"Accept Bid"** no provedor escolhido e assine no Keplr.

## Etapa 5: Aguarde a Implantação

O Console irá:

-> Criar o lease com o provedor escolhido

-> Enviar o manifesto (informa ao provedor o que executar)

-> Iniciar seu contêiner


Isso leva de 1 a 2 minutos. Você verá atualizações de status na interface.

## Etapa 6: Verifique se Está em Execução

Depois da implantação, você verá:

-> Aba **Services**: Mostra seu serviço *zcashd* com status

-> Aba **Logs**: Logs em tempo real do seu nó zcashd

-> Aba **Leases**: Detalhes sobre sua implantação (DSEQ, provedor, custo)


### Verifique os Logs

Clique em **Logs** e você deverá ver o zcashd iniciando:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**A primeira execução baixará zcash-params (~2GB).** Esta é uma operação única e leva de 5 a 10 minutos dependendo da largura de banda do provedor. Reinicializações posteriores pularão esta etapa.

A sincronização levará **horas a dias** dependendo da rede. Observe:

-> Alturas de bloco aumentando

-> Conexões com pares (devem ser 10-30 peers)

-> Nenhum erro repetido


## Etapa 7: Obtenha o Endereço do Seu Nó

Clique na aba **Leases** e depois em **URIs**.

Você verá algo como:

```
zcashd-8233: provider-hostname.com:31234
```

Este é o **endpoint P2P público** do seu nó. Outros nós Zcash se conectarão a você nesse endereço.

**Observe o mapeamento de portas:** Você configurou a porta 8233 no SDL, mas o Akash a atribuiu a uma porta pública diferente (31234 neste exemplo). Isso é normal — veja a seção "Mapeamento de Portas no Akash" no topo se isso causar confusão. Seu nó fica acessível na porta que o Akash mostrar aqui, não necessariamente na 8233.

Se você habilitou RPC (comentado por padrão no SDL), também verá aqui o endpoint RPC com sua própria porta mapeada.

## Opções de Configuração

### Mudando para Testnet

O SDL usa Mainnet por padrão. Para usar Testnet:

-> **Altere a rede na seção *env*:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
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

-> **Opcional: Reduza os recursos** para Testnet em *profiles.compute.zcashd.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Opcional: Reduza o preço** em *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> note lowering prices may filter our providers form bidding. experiement with this value, or use the provider endpiont to check if they would bid. (review provider api documentation)

### Habilitar Acesso RPC

O RPC vem desativado por padrão por segurança. Para habilitá-lo:

**CRÍTICO: Defina credenciais fortes.** O RPC do zcashd transmite nome de usuário/senha via HTTP (não HTTPS). Só exponha o RPC se você entender as implicações de segurança.

-> Descomente na seção *env*:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Descomente a porta RPC em *expose*:

   **Para Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Para Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Aviso**: Se você definir *global: true* para RPC, estará expondo-o à internet com autenticação básica. Isso é uma má ideia. Use *global: false* e acesse o RPC pela rede interna do Akash ou configure um túnel seguro.

**Lembrete sobre mapeamento de portas**: Mesmo que você exponha o RPC globalmente, o Akash o mapeará para uma porta alta aleatória (não 8232/18232). Verifique as URIs na sua implantação para ver o endpoint público real. Para *global: false* (recomendado), o endpoint RPC só fica acessível dentro da rede de implantação do Akash, não pela internet pública.

### Habilitar Índice de Transações

O índice de transações permite consultar qualquer transação pelo seu ID via RPC. Usa mais armazenamento (~ 20% de aumento).

Descomente em *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Aviso**: Habilitar txindex em um nó já sincronizado exige reindexar toda a blockchain, o que leva horas.

### Habilitar Insight Explorer

O Insight Explorer fornece endpoints adicionais de API REST para dados da blockchain (útil para exploradores de blocos).

Descomente em *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Isso habilita automaticamente txindex e adiciona métodos RPC extras.

### Habilitar Métricas Prometheus

Para coletar métricas para monitoramento:

-> Descomente em *env*:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Descomente a porta de métricas em *expose*:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
As métricas estarão disponíveis em http://yourendpoint:9969/metrics no formato Prometheus.

### Ajustar Recursos/Preço

Se você não está recebendo lances ou quer otimizar o custo:

**Para provedores com especificações menores**, reduza na seção *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (mínimo para velocidade de sincronização razoável)

-> Memória: *size: 12Gi* (mínimo para estabilidade)

-> Armazenamento: *size: 120Gi* (mínimo para mainnet)


**Para atrair mais lances**, aumente em *profiles.placement.akash.pricing*:

-> Mainnet: Tente *amount: 15000* uakt/bloco

-> Testnet: Tente *amount: 7500* uakt/bloco


Os valores do SDL estão configurados de forma conservadoramente alta. A maioria dos provedores dará lances mais baixos.

## Atualizando Sua Implantação

Precisa alterar a configuração após implantar?

-> Vá para **My Deployments** no Console

-> Encontre sua implantação zcashd

-> Clique em **"Update Deployment"**

-> Edite o SDL

-> Clique em **"Update"** e aprove no Keplr


**Nota**: Atualizar reiniciará seu contêiner. O nó continuará a partir do estado salvo (armazenamento persistente), mas espere de 1 a 2 minutos de indisponibilidade.

## Monitoramento

### Via Console

-> Aba **Logs**: Logs do contêiner em tempo real

-> Aba **Shell**: Obtenha um shell dentro do contêiner (útil para depuração)

-> Aba **Events**: Eventos do Kubernetes (em geral inúteis, a menos que algo esteja quebrado)


### Via RPC (se habilitado)

Se você habilitou RPC, pode consultar seu nó como um nó completo zcashd normal (porque ele é!)

### Alternativa ao zcash-cli

Se você tiver acesso ao shell via Console, pode usar *zcash-cli* diretamente:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Encerrando Sua Implantação

Quando terminar ou quiser parar de pagar:

-> Vá para **My Deployments**

-> Encontre sua implantação zcashd

-> Clique em **"Close Deployment"**

-> Confirme e assine no Keplr


Seu depósito de 5 AKT será reembolsado. O **armazenamento persistente** deve ser preservado pelo provedor, mas não conte com isso — trate-o como faria com qualquer outro provedor de nuvem.

## Solução de Problemas

### Erro "Insufficient funds"

Você precisa de mais AKT. Adicione fundos à sua carteira Keplr.

### Nenhum lance aparecendo

Ou:

-> Seu preço está muito baixo (aumente *amount* no SDL)

-> Seus requisitos de recursos estão muito altos para os provedores disponíveis (reduza CPU/memória/armazenamento)

-> Espere mais tempo (às vezes leva de 60 a 90 segundos para os lances aparecerem)


### Implantação travada em "pending"

O provedor pode estar com problemas. Feche a implantação e tente um provedor diferente.

### Logs do zcashd mostram "No peers connected"

Isso é normal nos primeiros minutos. O zcashd descobrirá peers automaticamente. Se continuar após mais de 10 minutos, você pode ter um problema de rede (improvável no Akash).

### Erros de "Out of memory" nos logs

Você economizou demais na RAM. Feche a implantação e implante novamente com pelo menos 12Gi de memória (16Gi recomendado).

### A sincronização está demorando para sempre

Defina "para sempre":

-> **Horas**: Normal

-> **Dias**: Também normal para mainnet do zero

-> **Semanas**: Algo está errado, verifique os logs em busca de erros


### "Error fetching zcash-params"

O provedor pode estar com problemas de rede ou largura de banda lenta. Isso normalmente se resolve sozinho. Se persistir por mais de 30 minutos, tente reimplantar em outro provedor.

### Falhas de autenticação RPC

-> Verifique se *ZCASHD_RPCUSER* e *ZCASHD_RPCPASSWORD* estão definidos corretamente

-> Verifique se você está usando a porta correta (8232 para mainnet, 18232 para testnet)

-> Lembre-se de que as portas são mapeadas pelo Akash - use a URI da sua implantação, não 8232 diretamente


## Gerenciamento de Custos

Monitore seus gastos no Console:

-> **My Deployments** -> Sua implantação -> Mostra a estimativa de "Cost per month"

-> O saldo da sua carteira Keplr diminuirá com o tempo


Quando seu saldo ficar baixo, o Akash fechará automaticamente sua implantação. **Recarregue sua carteira periodicamente** ou configure alertas.

### Reduzindo Custos

-> **Use Testnet** para testes não produtivos (50% mais barato)

-> **Reduza CPU/memória** se você não precisar de sincronização rápida

-> **Escolha provedores mais baratos** (nem sempre é sensato - uptime importa)

-> **Use USDC em vez de AKT** se o preço do AKT estiver volátil (requer alteração no preço do SDL)

-> **Desative txindex** se você não precisar dele (economiza ~ 20% de armazenamento)


### Recursos Adicionais

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Documentação do Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Exploradores Zcash**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Discord do Akash**: [https://discord.akash.network](https://discord.akash.network) (para problemas com provedores)

## Notas Finais

- **O armazenamento persistente importa.** Não ignore *persistent: true* nem use a classe *beta2*. Use *beta3*.
- **A sincronização inicial é lenta.** Tenha paciência. Isso é normal para nós de blockchain.
- **Mantenha sua carteira com fundos.** As implantações são fechadas automaticamente quando você fica sem AKT.
- **Backups não são automáticos.** Se os dados são importantes para você, assuma que eles podem desaparecer e planeje adequadamente.
- **A segurança do RPC é crítica.** Não exponha o RPC à internet sem medidas de segurança adequadas.
- **zcash-params são armazenados em cache.** A primeira execução baixa ~2GB de parâmetros criptográficos. Isso é normal e acontece apenas uma vez.
