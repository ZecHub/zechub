<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Zcash Stack: Execute um servidor de light wallet no Kubernetes ou no Docker

[Zcash Stack](https://github.com/zecrocks/zcash-stack) é o kit de implantação de código aberto da equipe por trás do zec.rocks. Ele reúne um nó integral Zcash, um servidor de light wallet e extras opcionais (Zaino, um explorador de blocos, um serviço oculto Tor, um DNS seeder, zecd, um proxy gRPC-web para carteiras no navegador) em um Helm chart para Kubernetes e em arquivos Compose Docker. Todos os servidores zec.rocks lightwalletd são executados com esse chart. O projeto é financiado por [Zcash Community Grants](https://zcashcommunitygrants.org/).

Esta página resume o que o kit implanta, o que você precisa preparar antes da instalação e as configurações mais importantes. Ela acompanha a versão **0.4.9** do chart (lançada em 13 de novembro de 2026). O [README do chart](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) e as [anotações do workshop](https://github.com/zecrocks/zcash-stack/tree/main/docs) do próprio projeto são as referências; leia-os antes de executar qualquer coisa em produção.

## Resumo

- **Duas formas de começar.** Um Helm chart para Kubernetes (k3s no seu próprio hardware NVMe é o principal alvo; GKE Standard e Autopilot também funcionam) e arquivos Compose Docker para uma única máquina. O workshop recomenda Docker se você está começando a executar servidores e Kubernetes se já administra frotas.
- **Um nó da chain e um servidor de light wallet.** A configuração recomendada é Zebra + lightwalletd. Zakura pode substituir Zebra como backend, e Zaino pode substituir ou funcionar ao lado de lightwalletd.
- **Planeje cerca de 600 GiB de disco.** O estado da chain de Zebra tinha ~260 GiB em junho de 2026 e continua crescendo; o cache da light wallet adiciona ~17 GiB. Uma sincronização completa leva dias, então o chart pode restaurar a partir de um snapshot publicado.
- **O chart fixa as versões das imagens.** Na versão 0.4.9, são Zebra 7.0.0 (acompanha NU7), lightwalletd v0.6.1, Zakura 1.8.6 e Zaino 0.8.0. Atualize o chart antes das atualizações da rede e antes que uma versão de Zakura chegue à altura de fim do suporte.
- **Registre seu servidor.** Operadores públicos podem adicionar o servidor ao monitor [hosh.zec.rocks](https://hosh.zec.rocks/zec) para que carteiras e usuários vejam se ele está no ar.

## O que é implantado

Cada componente é controlado por uma opção no [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) do chart. Apenas lightwalletd vem ativado por padrão e ele precisa de um nó da chain; por isso, os arquivos de exemplo também ativam Zebra.

| Componente | Imagem no chart 0.4.9 | Padrão | O que faz |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | desativado (ativado nos exemplos) | Nó integral; valida a chain e fornece RPC para os demais componentes |
| Zakura | `zakuracore/zakura:1.8.6` | desativado | Fork de Zebra; backend substituto para lightwalletd ou Zaino no lugar de Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | ativado | Servidor de light wallet (gRPC) para carteiras móveis e de desktop |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | desativado | Indexador Rust que também atende light wallets |
| Explorador de blocos | `emersonian/zcash-explorer:v0.0.6` | desativado | Explorador web que lê o JSON-RPC do nó (Zaino não pode servir de backend: ele fornece apenas gRPC) |
| Tor | `osminogin/tor-simple:0.4.9.16` | desativado | Publica lightwalletd ou Zaino como serviço `.onion` |
| DNS seeder | `zfnd/dnsseeder:v1.8.0` | desativado | Ajuda novos nós a encontrar peers |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | desativado | Servidor de carteira que prioriza endereços blindados (veja [zecd](/zcash-tech/zecd)) |
| Proxy gRPC-web | `envoyproxy/envoy:v1.40.2` | desativado | Permite que carteiras no navegador se comuniquem com lightwalletd, que os navegadores não conseguem acessar por gRPC puro |
| Carteira WebZjs | `ghcr.io/zecrocks/webzjs-wallet` | desativado | Carteira no navegador; precisa do proxy gRPC-web ativado no mesmo host |

Duas observações sobre versões. O upstream de Zaino está na versão [0.10.1](https://github.com/zingolabs/zaino/releases), enquanto o chart ainda inclui a imagem 0.8.0; por isso, confira `values.yaml` antes de confiar em comportamentos mais recentes de Zaino. Além disso, os nós Zakura param na Mainnet ao atingir uma altura de fim do suporte específica de cada versão: para a 1.8.6, é o bloco 3,643,309, por volta de 5 de dezembro de 2026, e as versões x86-64 desde a 1.8.0 se recusam a iniciar em CPUs sem BMI2 e ADX. A página [Zakura Node](/zcash-tech/zakura-node) aborda os dois casos.

## Kubernetes: antes da instalação

O chart é implantado em um cluster com três componentes que você configura uma vez.

1. **Um controlador de ingress.** O chart cria um Kubernetes `Ingress` padrão e usa a classe `nginx` por padrão; ingress-nginx é recomendado porque lida com gRPC da mesma forma no k3s e no GKE. No k3s, instale o k3s com `--disable traefik` ou mantenha Traefik e configure `ingress.className: traefik` e `ingress.backendProtocol: GRPC` (nesse caso, o chart gera um Traefik `IngressRoute`, porque um Ingress simples por Traefik retorna HTTP 500 com gRPC). No GKE, a classe de ingress `gce` integrada não consegue direcionar gRPC para lightwalletd ou Zaino.
2. **cert-manager e um ClusterIssuer** para certificados automáticos do Let's Encrypt (`examples/cluster-issuer.yaml`; primeiro teste com o emissor de staging). No GKE Autopilot, instale o cert-manager com `--set global.leaderElection.namespace=cert-manager`, ou a criação do emissor falhará com um erro x509 de "autoridade desconhecida". Você pode ignorar o cert-manager e apontar `<service>.ingress.tls.secretName` para seu próprio certificado.
3. **Um StorageClass.** `local-path` funciona bem no k3s com NVMe. No GKE, forneça a Zebra uma classe IOPS provisionada (o repositório inclui um exemplo com Hyperdisk) e aumente primeiro a cota regional de disco: novos projetos do GKE permitem apenas 500 GB de SSD e 500 GB de Hyperdisk por região, e um nó da chain precisa de 300 a 500 GB; caso contrário, o volume fica em `Pending` com `QUOTA_EXCEEDED`. Não é possível alterar `storageClassName` em um StatefulSet existente sem recriar o volume.

Em seguida, aponte um registro DNS de cada hostname para o IP externo do controlador de ingress. Se você ainda não tem DNS, liste um nome [sslip.io](https://sslip.io), como `203-0-113-7.sslip.io`, ao lado do hostname real: ele é resolvido para o IP embutido, e o certificado é emitido imediatamente. Mantenha seu próprio hostname como o principal em servidores permanentes.

## Kubernetes: instalação

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

O exemplo [`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) ativa Zebra, conecta lightwalletd a ele, configura um cache de 40 GiB para lightwalletd e um ingress com TLS, mantendo o RPC do nó dentro do cluster. Altere o nome de usuário e a senha RPC de exemplo antes da instalação. Os outros exemplos abrangem testnet, GKE, GKE Autopilot com alta disponibilidade, um serviço oculto Tor e a configuração inicial com sslip.io.

Para atualizar, execute `helm repo update`, confira a alteração com o plugin helm-diff (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`) e depois `helm upgrade` com os mesmos argumentos. Se você está migrando de um chart 0.0.x, leia primeiro [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md): a versão 0.1.0 substituiu a configuração antiga de Traefik por Ingress padrão e cert-manager, e a estrutura dos valores mudou.

## Dimensionamento

| | Estado estável | Sincronização inicial | Disco |
|:--|:--|:--|:--|
| Zebra | ~0,1 vCPU, 1,6 GiB | Exige bastante CPU, IOPS e memória | ~260 GiB (junho de 2026) e continua crescendo; padrão do chart: 500 GiB |
| lightwalletd | ~0,15 vCPU, 165 MiB | Constrói o cache bloco por bloco | ~17 GiB; padrão do chart: 40 GiB |

O conjunto completo solicita cerca de 1,5 vCPU e 4,5 GiB de memória. Para uma máquina, o chart recomenda 8 vCPU, 32 GiB de RAM e cerca de 1 TB de NVMe (no GKE, um `n2-standard-8` com um volume Hyperdisk ou pd-ssd de 500 GiB). As solicitações padrão já atendem aos mínimos do GKE Autopilot, e os limites de CPU ficam desativados para que a sincronização possa usar mais recursos quando necessário.

## Configurações importantes

**Restauração de snapshot.** Defina `<chain>.initSnapshot.enabled: true` (com `initSnapshot.url`, `gs://` ou `https://`) para começar a partir de um snapshot publicado em vez de sincronizar desde o genesis. A restauração registra o progresso, refaz corretamente um download interrompido e nunca apaga um volume saudável de uma instalação anterior. Um snapshot é um atalho de confiança: os blocos posteriores ainda são validados, e um snapshot inválido aparece como blocos que falham na validação. O workshop estima cerca de 10 dias para uma sincronização do zero e cerca de 10 horas para começar com um snapshot.

**Escalabilidade e zero downtime.** lightwalletd e Zaino são caches leves na frente do nó; por isso, execute `replicas: 2` para fazer atualizações contínuas sem downtime (um PodDisruptionBudget é adicionado automaticamente quando há mais de 1 réplica). Nós da chain não servem para distribuir carga: cada réplica é outro nó integral, com seu próprio volume e sua própria sincronização; portanto, execute um ou dois para redundância.

**Peers de entrada.** Por padrão, Zebra faz apenas conexões de saída. `zebra.p2pPublic.enabled: true` aceita peers de entrada na porta 8233 (18233 na testnet) e anuncia seu endereço; escolha `externalAddrFrom: hostIP` em bare metal e k3s, `nodeExternalIP` em nuvens onde o próprio IP do nó é privado ou `loadBalancer` com um IP estático reservado no GKE Autopilot.

**TLS e gRPC.** O TLS termina no ingress e o HTTP/2 sem criptografia é usado dentro do cluster, então vários hostnames podem apontar para um lightwalletd. Mantenha `path: /` com `pathType: Prefix`, porque os caminhos dos métodos gRPC precisam dele. Se o primeiro certificado falhar por causa do redirecionamento HTTPS, emita-o com o emissor de staging ou configure temporariamente `ingress.tls.sslRedirect: "false"`.

**Serviço oculto Tor.** Útil quando seu cluster não tem IP público nem domínio:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Leia o endereço com `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` e teste-o por meio de um cliente Tor local com [zecping](https://github.com/zecrocks/zecping): `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**Durante atualizações da rede.** Zebra pode banir peers que ainda usam versões antigas e parar, registrando que as atualizações da chain foram interrompidas. A lista de banimentos fica na memória; por isso, `kubectl delete pod zebra-0` a limpa. O pod volta com os mesmos dados da chain, sem precisar sincronizar novamente.

## Docker Compose

Para uma única máquina, clone o repositório e inicie o arquivo padrão na pasta `docker/`:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml` executa Zebra, lightwalletd e [Watchtower](https://containrrr.dev/watchtower/) em x86; `compose.arm.yaml` faz o mesmo em hosts ARM. O Watchtower baixa novas imagens automaticamente, e o arquivo padrão usa a tag `zfnd/zebra:latest`, então o nó acompanha as novas versões de Zebra sem atualizações manuais. `compose.zaino.yaml` substitui lightwalletd por Zaino, mas fixa uma imagem antiga da comunidade (`emersonian/zcash-zaino:0.1.2-zr4`); confira-a antes de usar. Outros arquivos adicionam uma interface TLS com Caddy, um proxy VPS e um túnel autossh para nós em casa.

Defina `LIGHTWALLETD_DONATION_ADDRESS` no arquivo `.env` com seu próprio endereço unificado para publicá-lo como endereço de doação do servidor. Executar `./download-snapshot.sh` na pasta `docker/` antes do primeiro `docker compose up` baixa um snapshot da chain em vez de sincronizar do zero.

## Conexão e monitoramento

A segunda aula do workshop aborda como expor o servidor: com um IP estático público, ocultando o IP da sua casa por trás de um túnel SSH para um VPS ou do Tailscale Funnel, ou usando apenas Tor no servidor. Teste o resultado apontando uma carteira para ele (em ZODL, Configurações avançadas; veja [Alterar o servidor na sua carteira](/zcash-tech/lightwallet-nodes)) ou chamando `GetLightdInfo` com um cliente gRPC.

Para monitoramento, a terceira aula apresenta os comandos manuais de Docker e sugere registrar um servidor público com [hosh](https://hosh.zec.rocks/zec), o monitor de disponibilidade zec.rocks. O registro é um pull request que adiciona seu hostname e porta à lista de servidores do hosh. Você pode pedir ajuda em qualquer etapa no [zec.rocksfórum dos workshops](https://workshops.zec.rocks).

## Erros comuns

**Instalar lightwalletd sem um nó da chain.** lightwalletd lê de Zebra (ou de Zakura). Ative um deles ou comece com um arquivo de exemplo que já o faça.

**Manter as credenciais RPC de exemplo.** Os exemplos incluem valores provisórios. O RPC fica dentro do cluster, mas altere-os mesmo assim.

**Executar um nó da chain com a cota de disco padrão do GKE.** O volume nunca é vinculado. Aumente a cota regional antes da instalação.

**Aumentar Zebra para distribuir carga.** Cada réplica de Zebra exige uma sincronização completa adicional. Aumente lightwalletd ou Zaino.

**Manter um chart antigo durante uma atualização da rede.** Um nó de uma versão anterior à atualização deixa de acompanhar a Mainnet depois dela (Zebra precisa da versão 7.0.0 ou posterior desde NU7). Execute `helm repo update` e atualize o chart antes das alturas de ativação e das alturas de fim do suporte de Zakura.

## Páginas relacionadas

- [Zcash Nós de light wallet](/zcash-tech/lightwallet-nodes): o que um servidor de light wallet pode ou não ver e servidores públicos.
- [Zebra Nó integral](/zcash-tech/zebra-full-node): o validador executado por este conjunto.
- [Zakura Node](/zcash-tech/zakura-node): o fork Zebra que o chart pode executar.
- [Zaino](/zcash-tech/zaino): o indexador Rust.
- [zecd](/zcash-tech/zecd): o servidor de carteira que o chart pode adicionar.
- [Zcash RPC e indexação de nós](/guides/zcash-node-rpc-and-indexing): RPC de Zebra, Zallet e indexadores.
- [Como executar Zebra na rede Akash](/guides/akash-network-zebra): outra maneira de hospedar um nó.

## Recursos

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (repositório, versões e exemplos)
- [Zcash StackREADME do Helm chart](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Anotações do workshop: sincronizar, conectar, observar](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [DockerREADME](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Página no Artifact Hub](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (monitor público de servidores)

**Última atualização:** novembro de 2026 (chart 0.4.9)
