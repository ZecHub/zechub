# Implementar zcashd no Akash via Console

> **Obsoleto. Não siga este guia para implementar um nó que pretenda utilizar.**
>
> zcashd atingiu a sua paragem automática de Fim de Suporte em 18 de julho de 2026. Um nó zcashd implementado hoje não sincronizará com o topo da cadeia, por isso a implementação custa dinheiro todos os meses e não produz nada.
>
> Implemente antes o **Zebra**: [Como executar Zebra na Akash Network](/guides/akash-network-zebra), que cobre o mesmo fluxo de trabalho da Akash Console e requer aproximadamente um terço do disco. Se estiver a migrar uma configuração existente, veja o [guia de migração de zcashd para Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Esta página é mantida como registo histórico da implementação de zcashd.

Guia para implementar um nó completo zcashd de Zcash (implementação da Electric Coin Co) usando a [Akash Console](https://console.akash.network). Aqui está abaixo um tutorial em vídeo. Pode encontrar abaixo um guia mais aprofundado.

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


## O Que Está a Implementar

Um nó completo zcashd que irá:

-> Sincronizar toda a blockchain de Zcash (350GB+ para mainnet, ~ 40GB para testnet)

-> Custar aproximadamente $15/mês, dependendo dos preços do token AKT

-> Demorar várias horas a dias para sincronizar completamente

-> Usar 4 vCPUs, 16GB de RAM, 350GB de armazenamento (mainnet) ou 2 vCPUs, 8GB de RAM, 50GB (testnet)

-> Descarregar parâmetros criptográficos na primeira execução (~ 2GB, uma única vez)

**zcashd vs Zebra:**

-> zcashd foi a implementação original de nó de Zcash pela Electric Coin Co, interrompida desde 18 de julho de 2026

-> Zebra, da Zcash Foundation, é o nó completo utilizado atualmente

-> Apenas Zebra segue a cadeia atual; um nó zcashd não consegue alcançar o topo

-> A wallet do zcashd foi substituída por [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Use zcashd se precisar de funcionalidade de wallet ou de APIs RPC específicas


### **Importante: Mapeamento de Portas no Akash**

Quando expõe uma porta no Akash (por exemplo, a porta 8233 para P2P do zcashd), ela **NÃO fica associada a essa porta exata** no IP público do fornecedor. Em vez disso, o fornecedor atribui uma porta alta aleatória (como 31234 ou 42567) e faz reverse proxy para a porta 8233 do seu contentor.

Isto é intencional: os fornecedores executam várias implementações e haveria conflitos se todos tentassem usar diretamente a porta 8233.

**O que isto significa para si:**

-> Configura a porta 8233 no SDL (a porta P2P padrão do zcashd)

-> O Akash dá-lhe um URI como *provider.com:31234*

-> Outros nós de Zcash ligam-se a si em *provider.com:31234*

-> Dentro do seu contentor, o zcashd continua a escutar na 8233


Isto é tratado automaticamente. Basta usar o URI que o Akash lhe fornece.

## Pré-requisitos

-> Extensão de navegador **Keplr Wallet** instalada (Chrome/Brave/Firefox)

-> Tokens **AKT** - Obtenha 50-100 AKT numa exchange (Coinbase, Kraken, Osmosis)

-> **5 minutos** para clicar na interface da Console


## Passo 1: Ligar a Sua Wallet

-> Vá a [https://console.akash.network](https://console.akash.network)

-> Clique em **"Connect Wallet"** no canto superior direito

-> Escolha **Keplr** (ou a sua wallet Cosmos preferida)

-> Aprove a ligação quando o Keplr aparecer


O seu saldo de AKT deverá aparecer no canto superior direito. Se estiver a zero, carregue primeiro a sua wallet.

## Passo 2: Criar a Implementação

-> Clique no botão **"Deploy"** (grande botão azul, ao centro da página)

-> Escolha **"Build your template"** (ou avance diretamente para carregar o SDL)

### Opção A: Carregar Ficheiro SDL (Recomendado)

> **Este botão implementa um nó interrompido.** Cobra ao seu saldo AKT por um nó que não consegue sincronizar. Use antes o [guia do Zebra](/guides/akash-network-zebra).

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Opção B: Usar o Editor SDL

Se quiser colar manualmente o SDL:

-> Copie o conteúdo de *zcashd-akash.yml*

-> Cole no editor SDL

-> Modifique conforme necessário (veja a secção de configuração abaixo)

-> Clique em **"Create Deployment"**


## Passo 3: Rever e Aprovar o Depósito

A Console irá mostrar-lhe:

-> **Depósito de implementação**: ~ 5 AKT (recebe isto de volta quando fechar a implementação)

-> **Custo estimado**: Com base nos preços do seu SDL


Clique em **"Approve"** e assine a transação no Keplr.

## Passo 4: Escolher um Fornecedor

Após ~ 30 segundos, verá propostas dos fornecedores. Cada proposta mostra:

-> **Preço por bloco** (em AKT ou USDC)

-> **Custo mensal estimado**

-> **Detalhes do fornecedor** (uptime, região, etc.)


**Não escolha apenas o mais barato.** Verifique:

-> % de uptime (aponte para > 95%)

-> Região (mais perto de si = melhor latência, mas não importa muito para nós de blockchain)

-> Estado de auditoria (marca de verificação verde = mais fiável)


Clique em **"Accept Bid"** no fornecedor que escolheu e assine no Keplr.

## Passo 5: Aguardar a Implementação

A Console irá:

-> Criar o lease com o fornecedor escolhido

-> Enviar o manifesto (diz ao fornecedor o que executar)

-> Iniciar o seu contentor


Isto demora 1-2 minutos. Verá atualizações de estado na interface.

## Passo 6: Verificar se Está em Execução

Depois de implementado, verá:

-> Separador **Services**: Mostra o seu serviço *zcashd* com estado

-> Separador **Logs**: Registos em direto do seu nó zcashd

-> Separador **Leases**: Detalhes sobre a sua implementação (DSEQ, fornecedor, custo)


### Verificar os Registos

Clique em **Logs** e deverá ver o zcashd a arrancar:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**A primeira execução irá descarregar zcash-params (~2GB).** Esta é uma operação única e demora 5-10 minutos, dependendo da largura de banda do fornecedor. Reinícios posteriores irão ignorar este passo.

A sincronização irá demorar **horas a dias**, dependendo da rede. Observe:

-> Alturas de bloco a aumentar

-> Ligações a pares (deverão ser 10-30 pares)

-> Ausência de erros repetidos


## Passo 7: Obter o Endereço do Seu Nó

Clique no separador **Leases** e depois em **URIs**.

Verá algo como:

```
zcashd-8233: provider-hostname.com:31234
```

Este é o **endpoint P2P público** do seu nó. Outros nós de Zcash irão ligar-se a si neste endereço.

**Note o mapeamento de portas:** Configurou a porta 8233 no SDL, mas o Akash atribuiu-lhe uma porta pública diferente (31234 neste exemplo). Isto é normal - veja a secção "Mapeamento de Portas no Akash" no topo, se isto lhe causar confusão. O seu nó está acessível na porta que o Akash mostrar aqui, não necessariamente na 8233.

Se ativou RPC (comentado por omissão no SDL), também verá aqui o endpoint RPC com a sua própria porta mapeada.

## Opções de Configuração

### Mudar para Testnet

O SDL usa Mainnet por omissão. Para usar Testnet:

-> **Altere a rede na secção *env*:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> **Atualize a porta exposta** na secção *expose*:

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

### Ativar Acesso RPC

O RPC está desativado por omissão por razões de segurança. Para o ativar:

**CRÍTICO: Defina credenciais fortes.** O RPC do zcashd transmite nome de utilizador/palavra-passe por HTTP (não HTTPS). Exponha RPC apenas se compreender as implicações de segurança.

-> Descomente na secção *env*:

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

**Aviso**: Se definir *global: true* para RPC, está a expô-lo à internet com autenticação básica. Isto é uma má ideia. Use *global: false* e aceda ao RPC através da rede interna do Akash ou configure um túnel seguro.

**Lembrete sobre mapeamento de portas**: Mesmo que exponha RPC globalmente, o Akash irá mapeá-lo para uma porta alta aleatória (não 8232/18232). Verifique os URIs na sua implementação para ver o endpoint público real. Para *global: false* (recomendado), o endpoint RPC só está acessível dentro da rede de implementação do Akash, não a partir da internet pública.

### Ativar Índice de Transações

O índice de transações permite consultar qualquer transação pelo seu ID via RPC. Usa mais armazenamento (~ aumento de 20%).

Descomente em *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Aviso**: Ativar txindex num nó já sincronizado requer reindexar toda a blockchain, o que demora horas.

### Ativar o Explorador Insight

O Insight Explorer fornece endpoints adicionais de API REST para dados da blockchain (útil para exploradores de blocos).

Descomente em *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Isto ativa automaticamente txindex e acrescenta métodos RPC extra.

### Ativar Métricas Prometheus

Para recolher métricas para monitorização:

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
   
As métricas estarão disponíveis em http://yourendpoint:9969/metrics em formato Prometheus.

### Ajustar Recursos/Preço

Se não está a receber propostas ou quer otimizar o custo:

**Para fornecedores com especificações mais baixas**, reduza na secção *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (mínimo para uma velocidade de sincronização razoável)

-> Memória: *size: 12Gi* (mínimo para estabilidade)

-> Armazenamento: *size: 120Gi* (mínimo para mainnet)


**Para atrair mais propostas**, aumente em *profiles.placement.akash.pricing*:

-> Mainnet: Experimente *amount: 15000* uakt/bloco

-> Testnet: Experimente *amount: 7500* uakt/bloco


Os valores do SDL estão definidos de forma conservadoramente alta. A maioria dos fornecedores irá propor menos.

## Atualizar a Sua Implementação

Precisa de alterar a configuração depois de implementar?

-> Vá a **My Deployments** na Console

-> Encontre a sua implementação zcashd

-> Clique em **"Update Deployment"**

-> Edite o SDL

-> Clique em **"Update"** e aprove no Keplr


**Nota**: Atualizar irá reiniciar o seu contentor. O nó retomará a partir do seu estado guardado (armazenamento persistente), mas conte com 1-2 minutos de indisponibilidade.

## Monitorização

### Via Console

-> Separador **Logs**: Registos do contentor em direto

-> Separador **Shell**: Obtenha uma shell dentro do contentor (útil para depuração)

-> Separador **Events**: Eventos do Kubernetes (na maioria inúteis, a menos que algo esteja avariado)


### Via RPC (se ativado)

Se ativou RPC, pode consultar o seu nó como um nó completo zcashd normal (porque é isso mesmo!)

### Alternativa `zcash-cli`

Se tiver acesso à shell via Console, pode usar *zcash-cli* diretamente:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Fechar a Sua Implementação

Quando terminar ou quiser deixar de pagar:

-> Vá a **My Deployments**

-> Encontre a sua implementação zcashd

-> Clique em **"Close Deployment"**

-> Confirme e assine no Keplr


O seu depósito de 5 AKT será reembolsado. O **armazenamento persistente** deverá ser preservado pelo fornecedor, mas não conte com isso - trate-o como trataria qualquer outro fornecedor cloud.

## Resolução de Problemas

### Erro "Insufficient funds"

Precisa de mais AKT. Carregue a sua wallet Keplr.

### Não aparecem propostas

Ou:

-> O seu preço está demasiado baixo (aumente *amount* no SDL)

-> Os seus requisitos de recursos são demasiado elevados para os fornecedores disponíveis (reduza CPU/memória/armazenamento)

-> Espere mais tempo (por vezes demora 60-90 segundos até aparecerem propostas)


### Implementação presa em "pending"

O fornecedor pode estar a ter problemas. Feche a implementação e tente um fornecedor diferente.

### Os registos do zcashd mostram "No peers connected"

Desde a paragem de Fim de Suporte em 18 de julho de 2026, este é o estado permanente esperado e não um atraso de arranque, e nenhuma espera adicional ou nova implementação irá resolvê-lo. Implemente antes [Zebra](/guides/akash-network-zebra).

### Erros "Out of memory" nos registos

Foi demasiado forreta na RAM. Feche a implementação e volte a implementar com pelo menos 12Gi de memória (16Gi recomendado).

### A sincronização está a demorar uma eternidade

Defina "uma eternidade":

-> **Horas**: Normal

-> **Dias**: Também normal para mainnet a partir do zero

-> **Semanas**: Há algo de errado, verifique os registos à procura de erros


### "Error fetching zcash-params"

O fornecedor pode ter problemas de rede ou largura de banda lenta. Normalmente isto resolve-se sozinho. Se persistir durante mais de 30 minutos, tente voltar a implementar noutro fornecedor.

### Falhas de autenticação RPC

-> Verifique se *ZCASHD_RPCUSER* e *ZCASHD_RPCPASSWORD* estão definidos corretamente

-> Verifique se está a usar a porta correta (8232 para mainnet, 18232 para testnet)

-> Lembre-se de que as portas são mapeadas pelo Akash - use o URI da sua implementação, não a 8232 diretamente


## Gestão de Custos

Monitorize os seus gastos na Console:

-> **My Deployments** -> A sua implementação -> Mostra a estimativa de "Cost per month"

-> O saldo da sua wallet Keplr irá diminuir ao longo do tempo


Quando o seu saldo ficar baixo, o Akash irá fechar automaticamente a sua implementação. **Carregue a sua wallet periodicamente** ou configure alertas.

### Reduzir Custos

-> **Use Testnet** para testes não produtivos (50% mais barato)

-> **Reduza CPU/memória** se não precisar de sincronização rápida

-> **Escolha fornecedores mais baratos** (nem sempre é sensato - o uptime importa)

-> **Use USDC em vez de AKT** se o preço do AKT for volátil (requer alteração do preço no SDL)

-> **Desative txindex** se não precisar dele (poupa ~ 20% de armazenamento)


### Recursos Adicionais

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Documentação Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Exploradores de Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Discord do Akash**: [https://discord.akash.network](https://discord.akash.network) (para problemas com fornecedores)

## Notas Finais

- **O armazenamento persistente importa.** Não ignore *persistent: true* nem use a classe *beta2*. Use *beta3*.
- **A sincronização inicial é lenta.** Tenha paciência. Isto é normal para nós de blockchain.
- **Mantenha a sua wallet com saldo.** As implementações fecham automaticamente quando fica sem AKT.
- **As cópias de segurança não são automáticas.** Se se importa com os dados, assuma que podem desaparecer e planeie em conformidade.
- **A segurança do RPC é crítica.** Não exponha o RPC à internet sem medidas de segurança adequadas.
- **zcash-params ficam em cache.** A primeira execução descarrega ~2GB de parâmetros criptográficos. Isto é normal e só acontece uma vez.
