# Implantando o zcashd no Akash via Console

> **Obsoleto. Não siga este guia para implantar um nó que você pretende usar.**
>
> zcashd chegou à sua interrupção automática de fim de suporte em 18 de julho de 2026. Um nó zcashd implantado hoje não sincronizará com a ponta da chain, portanto a implantação custa dinheiro todos os meses e não produz nada.
>
> Implante o **Zebra** em vez disso: [Como executar o Zebra na Akash Network](/guides/akash-network-zebra), que abrange o mesmo fluxo de trabalho do Akash Console e requer aproximadamente um terço do disco. Se você estiver migrando uma configuração existente, consulte o [guia de migração de zcashd para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Esta página é mantida como registro histórico da implantação do zcashd.

Guia para implantar um nó integral zcashd do Zcash (implementação da Electric Coin Co) usando o [Akash Console](https://console.akash.network). Há um tutorial em vídeo abaixo. Um guia mais detalhado pode ser encontrado abaixo.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## O que você está implantando

Um nó integral zcashd que irá:

-> Sincronizar toda a blockchain do Zcash (350GB+ para mainnet, ~ 40GB para testnet)

-> Custar aproximadamente $15/mês, dependendo dos preços do token AKT

-> Levar várias horas ou dias para sincronizar completamente

-> Usar 4 vCPUs, 16GB de RAM, 350GB de armazenamento (mainnet) ou 2 vCPUs, 8GB de RAM, 50GB (testnet)

-> Baixar parâmetros criptográficos na primeira execução (~ 2GB, uma única vez)

**zcashd vs Zebra:**

-> zcashd foi a implementação original de nó do Zcash pela Electric Coin Co, interrompida desde 18 de julho de 2026

-> Zebra, da Zcash Foundation, é o nó integral usado hoje

-> Apenas o Zebra segue a chain atual; um nó zcashd não consegue alcançar a ponta

-> A carteira do zcashd foi substituída por [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Use zcashd se você precisar de funcionalidade de carteira ou de APIs RPC específicas


### **Importante: Mapeamento de portas no Akash**

Quando você expõe uma porta no Akash (por exemplo, a porta 8233 para P2P do zcashd), ela **NÃO fica vinculada a essa porta exata** no IP público do provedor. Em vez disso, o provedor atribui uma porta alta aleatória (como 31234 ou 42567) e faz proxy reverso para a porta 8233 do seu contêiner.

Isso é intencional: os provedores executam várias implantações e haveria conflitos se todos tentassem usar diretamente a porta 8233.

**O que isso significa para você:**

-> Configure a porta 8233 no SDL (a porta P2P padrão do zcashd)

-> O Akash fornece a você um URI como *provider.com:31234*

-> Outros nós do Zcash conectam-se a você em *provider.com:31234*

-> Dentro do seu contêiner, o zcashd continua escutando na porta 8233


Isso é tratado automaticamente. Basta usar o URI que o Akash fornece a você.

## Pré-requisitos

-> Extensão de navegador **Keplr Wallet** instalada (Chrome/Brave/Firefox)

-> Tokens **AKT** - Obtenha 50-100 AKT em uma corretora (Coinbase, Kraken, Osmosis)

-> **5 minutos** para clicar na interface do Console


## Passo 1: Conecte sua carteira

-> Acesse [https://console.akash.network](https://console.akash.network)

-> Clique em **"Connect Wallet"** no canto superior direito

-> Escolha **Keplr** (ou sua carteira Cosmos preferida)

-> Aprove a conexão quando o Keplr aparecer


Seu saldo de AKT deve aparecer no canto superior direito. Se estiver zerado, faça uma recarga na sua carteira primeiro.

## Passo 2: Crie a implantação

-> Clique no botão **"Deploy"** (botão azul grande, no centro da página)

-> Escolha **"Build your template"** (ou pule diretamente para o upload do SDL)

### Opção A: Fazer upload do arquivo SDL (recomendado)

> **Este botão implanta um nó interrompido.** Ele cobra do seu saldo em AKT por um nó que não consegue sincronizar. Use o [guia do Zebra](/guides/akash-network-zebra) em vez disso.

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Opção B: Usar o editor SDL

Se você quiser colar manualmente o SDL:

-> Copie o conteúdo de *zcashd-akash.yml*

-> Cole no editor SDL

-> Modifique conforme necessário (consulte a seção de configuração abaixo)

-> Clique em **"Create Deployment"**


## Passo 3: Revise e aprove o depósito

O Console mostrará a você:

-> **Depósito de implantação**: ~ 5 AKT (você recebe isso de volta quando fechar a implantação)

-> **Custo estimado**: Com base nos preços do seu SDL


Clique em **"Approve"** e assine a transação no Keplr.

## Passo 4: Escolha um provedor

Após ~ 30 segundos, você verá ofertas dos provedores. Cada oferta mostra:

-> **Preço por bloco** (em AKT ou USDC)

-> **Custo mensal estimado**

-> **Detalhes do provedor** (uptime, região, etc.)


**Não escolha apenas o mais barato.** Verifique:

-> % de uptime (procure por > 95%)

-> Região (mais perto de você = melhor latência, mas não importa muito para nós de blockchain)

-> Status de auditoria (marca de seleção verde = mais confiável)


Clique em **"Accept Bid"** no provedor escolhido e assine no Keplr.

## Passo 5: Aguarde a implantação

O Console irá:

-> Criar o lease com o provedor escolhido

-> Enviar o manifesto (informa ao provedor o que executar)

-> Iniciar seu contêiner


Isso leva 1-2 minutos. Você verá atualizações de status na interface.

## Passo 6: Verifique se está em execução

Depois de implantado, você verá:

-> Aba **Services**: Mostra seu serviço *zcashd* com status

-> Aba **Logs**: Registros ao vivo do seu nó zcashd

-> Aba **Leases**: Detalhes sobre sua implantação (DSEQ, provedor, custo)


### Verifique os registros

Clique em **Logs** e você deve ver o zcashd iniciando:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**A primeira execução baixará zcash-params (~2GB).** Esta é uma operação única e leva 5-10 minutos, dependendo da largura de banda do provedor. Reinicializações posteriores ignorarão esta etapa.

A sincronização levará **horas ou dias**, dependendo da rede. Fique atento a:

-> Alturas dos blocos aumentando

-> Conexões de pares (deve haver 10-30 pares)

-> Nenhum erro repetido


## Passo 7: Obtenha o endereço do seu nó

Clique na aba **Leases** e depois em **URIs**.

Você verá algo como:

```
zcashd-8233: provider-hostname.com:31234
```

Este é o **endpoint P2P público** do seu nó. Outros nós do Zcash se conectarão a você nesse endereço.

**Observe o mapeamento de portas:** Você configurou a porta 8233 no SDL, mas o Akash atribuiu a ela uma porta pública diferente (31234 neste exemplo). Isso é normal - consulte a seção "Mapeamento de portas no Akash" no topo se isso causar confusão. Seu nó está acessível na porta que o Akash mostra aqui, não necessariamente na 8233.

Se você ativou RPC (comentado por padrão no SDL), também verá aqui o endpoint RPC com sua própria porta mapeada.

## Opções de configuração

### Mudar para Testnet

O SDL usa Mainnet por padrão. Para usar Testnet:

-> **Altere a rede na seção *env*:***

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

> note preços mais baixos podem impedir que nossos provedores façam propostas. teste esse valor ou use o endpoint do provedor para verificar se eles fariam uma proposta. (consulte a documentação da API do provedor)

### Ativar acesso RPC

O RPC é desativado por padrão por segurança. Para ativá-lo:

**CRÍTICO: Defina credenciais fortes.** O RPC do zcashd transmite nome de usuário/senha por HTTP (não HTTPS). Exponha o RPC apenas se você entender as implicações de segurança.

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

**Lembrete sobre mapeamento de portas**: Mesmo que você exponha o RPC globalmente, o Akash o mapeará para uma porta alta aleatória (não 8232/18232). Verifique os URIs na sua implantação para ver o endpoint público real. Para *global: false* (recomendado), o endpoint RPC é acessível apenas dentro da rede de implantação do Akash, não pela internet pública.

### Ativar índice de transações

O índice de transações permite consultar qualquer transação pelo seu ID via RPC. Usa mais armazenamento (~ aumento de 20%).

Descomente em *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Aviso**: Ativar txindex em um nó já sincronizado exige reindexar toda a blockchain, o que leva horas.

### Ativar o explorador Insight

O Insight Explorer fornece endpoints adicionais de API REST para dados da blockchain (úteis para exploradores de blocos).

Descomente em *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Isso ativa automaticamente txindex e adiciona métodos RPC extras.

### Ativar métricas do Prometheus

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

### Ajustar recursos/preços

Se você não está recebendo propostas ou quer otimizar o custo:

**Para provedores com especificações menores**, reduza na seção *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (mínimo para uma velocidade de sincronização razoável)

-> Memória: *size: 12Gi* (mínimo para estabilidade)

-> Armazenamento: *size: 120Gi* (mínimo para mainnet)


**Para atrair mais propostas**, aumente em *profiles.placement.akash.pricing*:

-> Mainnet: Experimente *amount: 15000* uakt/bloco

-> Testnet: Experimente *amount: 7500* uakt/bloco


Os valores do SDL são definidos de forma conservadoramente alta. A maioria dos provedores fará propostas menores.

## Atualizar sua implantação

Precisa alterar a configuração depois de implantar?

-> Vá até **My Deployments** no Console

-> Encontre sua implantação do zcashd

-> Clique em **"Update Deployment"**

-> Edite o SDL

-> Clique em **"Update"** e aprove no Keplr


**Nota**: A atualização reiniciará seu contêiner. O nó será retomado a partir do estado salvo (armazenamento persistente), mas espere 1-2 minutos de indisponibilidade.

## Monitoramento

### Pelo Console

-> Aba **Logs**: Logs do contêiner em tempo real

-> Aba **Shell**: Acesse um shell dentro do contêiner (útil para depuração)

-> Aba **Events**: Eventos do Kubernetes (em geral inúteis, a menos que algo esteja quebrado)


### Via RPC (se ativado)

Se você ativou o RPC, pode consultar seu nó como um nó integral zcashd normal (porque ele é!)

### Alternativa ao `zcash-cli`

Se você tiver acesso ao shell pelo Console, poderá usar *zcash-cli* diretamente:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Fechar sua implantação

Quando terminar ou quiser parar de pagar:

-> Vá até **My Deployments**

-> Encontre sua implantação do zcashd

-> Clique em **"Close Deployment"**

-> Confirme e assine no Keplr


Seu depósito de 5 AKT será reembolsado. O **armazenamento persistente** deve ser preservado pelo provedor, mas não conte com isso - trate-o como qualquer outro provedor de cloud.

## Solução de problemas

### Erro "Insufficient funds"

Você precisa de mais AKT. Faça uma recarga na sua carteira Keplr.

### Nenhuma proposta aparece

Uma das opções:

-> Seu preço está baixo demais (aumente *amount* no SDL)

-> Seus requisitos de recursos são altos demais para os provedores disponíveis (reduza CPU/memória/armazenamento)

-> Espere mais tempo (às vezes, as propostas levam 60-90 segundos para aparecer)


### Implantação travada em "pending"

O provedor pode estar tendo problemas. Feche a implantação e tente outro provedor.

### Os logs do zcashd mostram "No peers connected"

Desde a interrupção do suporte em 18 de julho de 2026, este é o estado permanente esperado, e não um atraso na inicialização. Nenhuma espera ou nova implantação resolverá isso. Em vez disso, implante o [Zebra](/guides/akash-network-zebra).

### Erros "Out of memory" nos logs

Você economizou demais na RAM. Feche a implantação e implante novamente com pelo menos 12Gi de memória (16Gi recomendados).

### A sincronização está levando uma eternidade

Defina "uma eternidade":

-> **Horas**: Normal

-> **Dias**: Também é normal para mainnet do zero

-> **Semanas**: Algo está errado, verifique os logs em busca de erros


### "Error fetching zcash-params"

O provedor pode ter problemas de rede ou pouca largura de banda. Isso geralmente se resolve sozinho. Se persistir por mais de 30 minutos, tente implantar novamente com outro provedor.

### Falhas de autenticação RPC

-> Verifique se `ZCASHD_RPCUSER` e `ZCASHD_RPCPASSWORD` estão definidos corretamente

-> Verifique se você está usando a porta correta (8232 para mainnet, 18232 para testnet)

-> Lembre-se de que as portas são mapeadas pelo Akash - use o URI da sua implantação, não 8232 diretamente


## Gerenciamento de custos

Monitore seus gastos no Console:

-> **My Deployments** -> Sua implantação -> Mostra a estimativa de "Cost per month"

-> O saldo da sua carteira Keplr diminuirá ao longo do tempo


Quando seu saldo ficar baixo, o Akash fechará automaticamente sua implantação. **Faça recargas na sua carteira periodicamente** ou configure alertas.

### Redução de custos

-> **Use Testnet** para testes não produtivos (50% mais barato)

-> **Reduza CPU/memória** se não precisar de sincronização rápida

-> **Escolha provedores mais baratos** (nem sempre é sensato - o uptime importa)

-> **Use USDC em vez de AKT** se o preço do AKT for volátil (requer alteração de preço no SDL)

-> **Desative txindex** se não precisar dele (economiza ~ 20% de armazenamento)


### Recursos adicionais

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Documentação do Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Exploradores do Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Discord do Akash**: [https://discord.akash.network](https://discord.akash.network) (para problemas com provedores)

## Notas finais

- **O armazenamento persistente importa.** Não ignore *persistent: true* nem use a classe *beta2*. Use *beta3*.
- **A sincronização inicial é lenta.** Tenha paciência. Isso é normal para nós de blockchain.
- **Mantenha sua carteira com saldo.** As implantações fecham automaticamente quando você fica sem AKT.
- **Os backups não são automáticos.** Se você se importa com os dados, presuma que eles podem desaparecer e planeje adequadamente.
- **A segurança do RPC é crítica.** Não exponha o RPC à internet sem medidas de segurança adequadas.
- **zcash-params ficam em cache.** A primeira execução baixa ~2GB de parâmetros criptográficos. Isso é normal e só acontece uma vez.
