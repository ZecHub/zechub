# Implantando o zcashd na Akash pelo Console

> **Obsoleto. Não siga este guia para implantar um nó que você pretende usar.**
>
> O zcashd atingiu sua parada automática de fim de suporte em 18 de julho de 2026. Um nó zcashd implantado hoje não vai sincronizar até a ponta da chain, então a implantação custa dinheiro todo mês e não produz nada.
>
> Implante o **Zebra** em vez disso: [Como executar o Zebra na Akash Network](/guides/akash-network-zebra), que cobre o mesmo fluxo de trabalho do Akash Console e precisa de cerca de um terço do disco. Se você está migrando uma configuração existente, consulte o [guia de migração do zcashd para o Zebra e o Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Esta página é mantida como registro histórico da implantação do zcashd.

Guia para implantar um nó integral zcashd Zcash (implementação Electric Coin Co) usando o [Akash Console](https://console.akash.network). Há um tutorial em vídeo abaixo. Um guia mais detalhado também pode ser encontrado abaixo.

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

Um nó integral zcashd que vai:

-> Sincronizar toda a blockchain do Zcash (mais de 350GB para a mainnet, ~ 40GB para a testnet)

-> Custar cerca de US$ 15/mês, dependendo do preço do token AKT

-> Levar de várias horas a dias para sincronizar completamente

-> Usar 4 vCPUs, 16GB de RAM e 350GB de armazenamento (mainnet) ou 2 vCPUs, 8GB de RAM e 50GB (testnet)

-> Baixar parâmetros criptográficos na primeira execução (~ 2GB, uma única vez)

**zcashd vs Zebra:**

-> O zcashd foi a implementação original de nó do Zcash feita pela Electric Coin Co, parada desde 18 de julho de 2026

-> O Zebra, da Zcash Foundation, é o nó integral em uso hoje

-> Somente o Zebra acompanha a chain atual; um nó zcashd não consegue alcançar a ponta

-> A carteira do zcashd foi substituída pela [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Use o zcashd se você precisar de funcionalidade de carteira ou de APIs RPC específicas


### **Importante: mapeamento de portas na Akash**

Quando você expõe uma porta na Akash (por exemplo, a porta 8233 para o P2P do zcashd), ela **NÃO é vinculada exatamente a essa porta** no IP público do provedor. Em vez disso, o provedor atribui uma porta alta aleatória (como 31234 ou 42567) e faz proxy reverso dela para a porta 8233 do seu contêiner.

Isso é intencional: os provedores executam várias implantações e haveria conflitos se todos tentassem usar a porta 8233 diretamente.

**O que isso significa para você:**

-> Você configura a porta 8233 no SDL (a porta P2P padrão do zcashd)

-> A Akash fornece uma URI como *provider.com:31234*

-> Outros nós Zcash se conectam a você em *provider.com:31234*

-> Dentro do seu contêiner, o zcashd continua escutando na porta 8233


Isso é tratado automaticamente. Basta usar a URI que a Akash fornece.

## Pré-requisitos

-> Extensão de navegador **Keplr Wallet** instalada (Chrome/Brave/Firefox)

-> **Tokens AKT**: obtenha de 50 a 100 AKT em uma corretora (Coinbase, Kraken, Osmosis)

-> **5 minutos** para clicar pela interface do Console


## Passo 1: conecte sua carteira

-> Acesse [https://console.akash.network](https://console.akash.network)

-> Clique em **"Connect Wallet"** no canto superior direito

-> Escolha **Keplr** (ou sua carteira Cosmos preferida)

-> Aprove a conexão quando o Keplr aparecer


Seu saldo de AKT deve aparecer no canto superior direito. Se estiver zerado, adicione fundos à sua carteira primeiro.

## Passo 2: crie a implantação

-> Clique no botão **"Deploy"** (botão azul grande, no centro da página)

-> Escolha **"Build your template"** (ou pule direto para o envio do SDL)

### Opção A: envie o arquivo SDL (recomendado)

> **Este botão implanta um nó parado.** Ele cobra do seu saldo de AKT por um nó que não consegue sincronizar. Use o [guia do Zebra](/guides/akash-network-zebra) em vez disso.

[![Implantar no Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Opção B: use o editor de SDL

Se você quiser colar o SDL manualmente:

-> Copie o conteúdo de *zcashd-akash.yml*

-> Cole no editor de SDL

-> Modifique conforme necessário (veja a seção de configuração abaixo)

-> Clique em **"Create Deployment"**


## Passo 3: revise e aprove o depósito

O Console vai mostrar:

-> **Depósito da implantação**: ~ 5 AKT (você recebe de volta quando encerra a implantação)

-> **Custo estimado**: com base no preço definido no seu SDL


Clique em **"Approve"** e assine a transação no Keplr.

## Passo 4: escolha um provedor

Depois de ~ 30 segundos, você verá lances dos provedores. Cada lance mostra:

-> **Preço por bloco** (em AKT ou USDC)

-> **Custo mensal estimado**

-> **Detalhes do provedor** (uptime, região etc.)


**Não escolha simplesmente o mais barato.** Verifique:

-> % de uptime (procure > 95%)

-> Região (mais perto de você = menor latência, mas isso não importa muito para nós de blockchain)

-> Status de auditado (marca de verificação verde = mais confiável)


Clique em **"Accept Bid"** no provedor escolhido e assine no Keplr.

## Passo 5: aguarde a implantação

O Console vai:

-> Criar o lease com o provedor escolhido

-> Enviar o manifesto (que informa ao provedor o que executar)

-> Iniciar seu contêiner


Isso leva de 1 a 2 minutos. Você verá atualizações de status na interface.

## Passo 6: verifique se está em execução

Depois da implantação, você verá:

-> Aba **Services**: mostra seu serviço *zcashd* com o status

-> Aba **Logs**: logs ao vivo do seu nó zcashd

-> Aba **Leases**: detalhes sobre sua implantação (DSEQ, provedor, custo)


### Verifique os logs

Clique em **Logs** e você deverá ver o zcashd iniciando:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**A primeira execução vai baixar os zcash-params (~2GB).** É uma operação feita uma única vez e leva de 5 a 10 minutos, dependendo da largura de banda do provedor. Nas reinicializações seguintes, essa etapa é pulada.

A sincronização vai levar **de horas a dias**, dependendo da rede. Fique atento a:

-> Alturas de bloco aumentando

-> Conexões com peers (devem ser de 10 a 30 peers)

-> Ausência de erros repetidos


## Passo 7: obtenha o endereço do seu nó

Clique na aba **Leases** e depois em **URIs**.

Você verá algo como:

```
zcashd-8233: provider-hostname.com:31234
```

Este é o **endpoint P2P público** do seu nó. Outros nós Zcash vão se conectar a você neste endereço.

**Observe o mapeamento de portas:** você configurou a porta 8233 no SDL, mas a Akash a atribuiu a uma porta pública diferente (31234 neste exemplo). Isso é normal. Veja a seção "Mapeamento de portas na Akash" no início se isso confundir você. Seu nó fica acessível na porta que a Akash mostrar aqui, não necessariamente na 8233.

Se você ativou o RPC (comentado por padrão no SDL), também verá aqui o endpoint RPC com sua própria porta mapeada.

## Opções de configuração

### Mudando para a testnet

O SDL usa a mainnet por padrão. Para usar a testnet:

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

-> **Opcional: reduza os recursos** para a testnet em *profiles.compute.zcashd.resources*:

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

> Observe que reduzir os preços pode impedir que alguns provedores façam lances. Experimente esse valor ou use o endpoint do provedor para verificar se ele faria um lance (consulte a documentação da API do provedor).

### Ative o acesso RPC

O RPC vem desativado por padrão por segurança. Para ativá-lo:

**CRÍTICO: defina credenciais fortes.** O RPC do zcashd transmite usuário/senha via HTTP (não HTTPS). Só exponha o RPC se você entender as implicações de segurança.

-> Remova o comentário na seção *env*:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Remova o comentário da porta RPC em *expose*:

   **Para a mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Para a testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Aviso**: se você definir *global: true* para o RPC, estará expondo-o à internet com autenticação básica. Isso é uma má ideia. Use *global: false* e acesse o RPC pela rede interna da Akash ou configure um túnel seguro.

**Lembrete sobre o mapeamento de portas**: mesmo que você exponha o RPC globalmente, a Akash vai mapeá-lo para uma porta alta aleatória (não 8232/18232). Verifique as URIs na sua implantação para ver o endpoint público real. Com *global: false* (recomendado), o endpoint RPC fica acessível apenas dentro da rede da implantação na Akash, não pela internet pública.

### Ative o índice de transações

O índice de transações permite consultar qualquer transação pelo seu ID via RPC. Usa mais armazenamento (aumento de ~ 20%).

Remova o comentário em *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Aviso**: ativar o txindex em um nó já sincronizado exige reindexar toda a blockchain, o que leva horas.

### Ative o Insight Explorer

O Insight Explorer oferece endpoints adicionais de API REST para dados da blockchain (útil para exploradores de blocos).

Remova o comentário em *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Isso ativa automaticamente o txindex e adiciona métodos RPC extras.

### Ative as métricas do Prometheus

Para coletar métricas para monitoramento:

-> Remova o comentário em *env*:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Remova o comentário da porta de métricas em *expose*:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
As métricas ficarão disponíveis em http://yourendpoint:9969/metrics no formato do Prometheus.

### Ajuste recursos/preço

Se você não está recebendo lances ou quer otimizar o custo:

**Para provedores com especificações menores**, reduza na seção *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (mínimo para uma velocidade de sincronização razoável)

-> Memória: *size: 12Gi* (mínimo para estabilidade)

-> Armazenamento: *size: 120Gi* (mínimo para a mainnet)


**Para atrair mais lances**, aumente em *profiles.placement.akash.pricing*:

-> Mainnet: tente *amount: 15000* uakt/bloco

-> Testnet: tente *amount: 7500* uakt/bloco


Os valores do SDL foram definidos propositalmente altos. A maioria dos provedores vai dar lances menores.

## Atualizando sua implantação

Precisa alterar a configuração depois de implantar?

-> Acesse **My Deployments** no Console

-> Encontre sua implantação do zcashd

-> Clique em **"Update Deployment"**

-> Edite o SDL

-> Clique em **"Update"** e aprove no Keplr


**Observação**: a atualização vai reiniciar seu contêiner. O nó vai retomar do estado salvo (armazenamento persistente), mas espere de 1 a 2 minutos de indisponibilidade.

## Monitoramento

### Pelo Console

-> **Aba Logs**: logs do contêiner ao vivo

-> **Aba Shell**: abre um shell dentro do contêiner (útil para depuração)

-> **Aba Events**: eventos do Kubernetes (quase inúteis, a menos que algo esteja quebrado)


### Via RPC (se ativado)

Se você ativou o RPC, pode consultar seu nó como um nó integral zcashd normal (porque ele é!)

### Alternativa com zcash-cli

Se você tem acesso ao shell pelo Console, pode usar o *zcash-cli* diretamente:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Encerrando sua implantação

Quando terminar ou quiser parar de pagar:

-> Acesse **My Deployments**

-> Encontre sua implantação do zcashd

-> Clique em **"Close Deployment"**

-> Confirme e assine no Keplr


Seu depósito de 5 AKT será reembolsado. O **armazenamento persistente** deve ser preservado pelo provedor, mas não conte com isso: trate-o como qualquer outro provedor de nuvem.

## Solução de problemas

### Erro "Insufficient funds"

Você precisa de mais AKT. Adicione fundos à sua carteira Keplr.

### Nenhum lance aparece

Pode ser que:

-> Seu preço esteja baixo demais (aumente *amount* no SDL)

-> Seus requisitos de recursos estejam altos demais para os provedores disponíveis (reduza CPU/memória/armazenamento)

-> Você precise esperar mais (às vezes os lances levam de 60 a 90 segundos para aparecer)


### Implantação travada em "pending"

O provedor pode estar com problemas. Encerre a implantação e tente um provedor diferente.

### Os logs do zcashd mostram "No peers connected"

Desde a parada de fim de suporte em 18 de julho de 2026, este é o estado permanente esperado, e não um atraso de inicialização; nenhuma espera ou nova implantação vai resolver. Implante o [Zebra](/guides/akash-network-zebra) em vez disso.

### Erros "Out of memory" nos logs

Você economizou demais na RAM. Encerre a implantação e implante novamente com pelo menos 12Gi de memória (16Gi recomendado).

### A sincronização está demorando uma eternidade

Defina "eternidade":

-> **Horas**: normal

-> **Dias**: também normal para a mainnet do zero

-> **Semanas**: há algo errado; verifique os logs em busca de erros


### "Error fetching zcash-params"

O provedor pode estar com problemas de rede ou largura de banda lenta. Isso geralmente se resolve sozinho. Se persistir por mais de 30 minutos, tente implantar novamente em um provedor diferente.

### Falhas de autenticação RPC

-> Verifique se `ZCASHD_RPCUSER` e `ZCASHD_RPCPASSWORD` estão definidos corretamente

-> Confirme que você está usando a porta correta (8232 para a mainnet, 18232 para a testnet)

-> Lembre-se de que as portas são mapeadas pela Akash: use a URI da sua implantação, não a 8232 diretamente


## Gerenciamento de custos

Acompanhe seus gastos no Console:

-> **My Deployments** -> Sua implantação -> Mostra a estimativa de "Cost per month"

-> O saldo da sua carteira Keplr vai diminuir com o tempo


Quando seu saldo ficar baixo, a Akash vai encerrar sua implantação automaticamente. **Faça recargas na sua carteira periodicamente** ou configure alertas.

### Reduzindo custos

-> **Use a testnet** para testes fora de produção (50% mais barato)

-> **Reduza CPU/memória** se você não precisa de sincronização rápida

-> **Escolha provedores mais baratos** (nem sempre é sensato, pois o uptime importa)

-> **Use USDC em vez de AKT** se o preço do AKT estiver volátil (exige alterar o preço no SDL)

-> **Desative o txindex** se você não precisar dele (economiza ~ 20% de armazenamento)


### Recursos adicionais

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Documentação da Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Exploradores do Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Discord da Akash**: [https://discord.akash.network](https://discord.akash.network) (para problemas com provedores)

## Notas finais

- **O armazenamento persistente importa.** Não deixe de usar *persistent: true* nem use a classe *beta2*. Use *beta3*.
- **A sincronização inicial é lenta.** Tenha paciência. Isso é normal para nós de blockchain.
- **Mantenha sua carteira com fundos.** As implantações são encerradas automaticamente quando seu AKT acaba.
- **Os backups não são automáticos.** Se os dados forem importantes para você, considere que eles podem desaparecer e planeje-se de acordo.
- **A segurança do RPC é crítica.** Não exponha o RPC à internet sem as medidas de segurança adequadas.
- **Os zcash-params ficam em cache.** A primeira execução baixa ~2GB de parâmetros criptográficos. Isso é normal e acontece apenas uma vez.
