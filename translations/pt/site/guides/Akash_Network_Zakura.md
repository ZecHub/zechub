# Como executar Zakura na Akash Network

Passo a passo para um nó integral **Zakura** Zcash usando o template [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Zakura é um nó Zcash compatível com o consenso (um fork do Zebra), com sincronização mais rápida, pruning nativo e bootstrap por snapshot. Este template fixa **`zakuracore/zakura:1.8.1`** (fixado por digest; não use `:latest` nem `1.1.1`).

### O que você recebe

- P2P na mainnet: contêiner **8233**, publicado globalmente (veja o mapeamento de portas abaixo)
- Estado podado persistente (64 GiB por padrão) com bootstrap pelo snapshot da Valar na primeira inicialização
- Prometheus **9999** e health **8080** (internos, sem URI pública)
- JSON-RPC **8232** interno para o **lightwalletd** colocalizado; o LWD escuta no contêiner **9067** e é publicado globalmente

Feature flags no SDL (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. A autenticação por cookie fica desativada quando lightwalletd está ativado, porque lightwalletd não consegue ler arquivos de cookie.

### Qual site usar (pagamentos)

O SDL é o mesmo. As duas interfaces web da Akash diferem em **como você paga**.

| Site | Pagamentos | Carteira |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Checkout web tradicional (cartão / meios fiat oferecidos pelo Console) | Conta do Console |
| [air.akash.network](https://air.akash.network) | Pagamentos nativos na chain da Akash (AKT / ACT) | **Keplr** |

Use o **Air** quando quiser pagar on-chain com a Keplr. Use o **Console** quando quiser um fluxo de pagamento web convencional. Não espere liquidação nativa via Keplr no Console.

### Implantação

**Pagamentos web (Console)**

[![Implantar no Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Pagamentos nativos da Akash com a Keplr (Air)**

[Abra este template no Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Abra o link correspondente acima (Console ou Air).
2. No Air, conecte a **Keplr** e confirme que você tem AKT/ACT para o depósito e o lease. No Console, conclua o checkout web apresentado pela interface.
3. Carregue `zcash-zakura/deploy.yaml` se ainda não estiver preenchido.
4. Faça o depósito, aceite um lance e aguarde o lease.
5. Os logs devem mostrar o download do snapshot (primeira inicialização) e depois `zakurad start`.
6. Abra **Leases → URIs**. Use o host:porta atribuído pelo provedor, não 8233 nem 9067 no IP público.

### Como a Akash publica as portas

As `port` / `as` do SDL (8233, 9067, 8232) são portas do **contêiner**. Zakura continua escutando na 8233; lightwalletd na 9067; o RPC na 8232 para o sidecar LWD (`zakura:8232`).

Elas **não** são as portas no IP público do provedor.

**Padrão (este template):** sem IP dedicado. Cada expose TCP `global: true` é mapeado para uma **porta alta aleatória** em um host compartilhado do provedor. O Console/Air as listam como URIs do lease, por exemplo:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Os peers se conectam à URI da **8233** (`provider.example:31482`). Carteiras compactas usam a URI da **9067** (TLS desativado, a menos que você mesmo faça a terminação TLS). Defina `ZAKURA_NETWORK__EXTERNAL_ADDR` como a URI P2P mapeada, não `:8233`.

Os exposes **internos** (RPC `8232`, métricas `9999`, health `8080`) ficam na rede da implantação. Sem URI pública.

**IPs dedicados** (`endpoints` / `kind: ip`) são um extra pago e **não** estão neste template. Eles podem fixar um IP público e, às vezes, a porta `as`. Adicione isso apenas se você precisar de um `host:8233` estável.

### Arquivo vs podado

O padrão é **podado** (snapshot de ~11 GiB, disco de 64 GiB). Para o histórico completo, defina `SNAPSHOT_KIND=archive`, aumente o disco para 350 GiB ou mais e defina `ZAKURA_STATE__STORAGE_MODE=archive`.

### Relacionados

- [Zebra na Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (histórico completo, sem snapshot)
- [Thus Spoke Zakura na Akash](/guides/thus-spoke-zakura-akash) — Painel Regtest + app (v0.4.1)
- Código-fonte do Zakura: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Snapshots: [zakura.com/snapshots/](https://zakura.com/snapshots/)
