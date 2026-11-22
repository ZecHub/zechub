# Assim falou Zakura no Akash (Regtest)

Execute a stack **Assim falou Zakura v0.4.1** no Akash: Zakura Regtest, lightwalletd e o **painel / API HTTP** da carteira. As moedas de teste não têm valor. Não envie ZEC da mainnet para cá.

Template: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Upstream: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) tag **v0.4.1**

### Imagens

| Serviço | Imagem |
| --- | --- |
| Painel + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (versão fixada compilada no launcher 0.4.1) |

### Autoinicialização

Na primeira inicialização, o contêiner `app` executa `ths-server init` no seu volume persistente e depois `ths-server serve`. O serve tenta novamente até que o JSON-RPC do Zakura e o lightwalletd estejam no ar. Você não executa `ths` no provedor; o SDL é o runtime.

### Como o Akash publica as portas

As portas `port` / `as` do SDL são portas do **contêiner**. O app escuta na **8080** (`THS_LISTEN`); o lightwalletd na **9067**; o RPC do Zakura na **18232** e o P2P na **18233**. Dentro do deployment, os serviços já usam essas portas (`http://zakura:18232`, `http://lightwalletd:9067`).

Elas **não** são as portas do IP público do provedor.

**Padrão (este template):** sem IP dedicado.

| Serviço | Escuta no contêiner | `as` no SDL | Como aparece no lease |
| --- | --- | --- | --- |
| `app` (painel + API HTTP) | 8080 | 80 (HTTP) | Hostname de ingress, geralmente em 80/443 — **abra este URI em um navegador** |
| `lightwalletd` | 9067 | 9067 (TCP, global) | `host:&lt;random-high-port&gt;` |
| RPC do `zakura` | 18232 | 18232 (TCP, global) | `host:&lt;random-high-port&gt;` |
| P2P do `zakura` | 18233 | 18233 (TCP, global) | `host:&lt;random-high-port&gt;` |

Depois que o lease estiver pronto, **Leases → URIs** é a fonte da verdade. Abra o URI de **`app`** para acessar o painel (a mesma interface que o `ths` abre localmente). Aponte os clientes compactos para o URI de **lightwalletd** (`THS_LIGHTWALLETD_TLS=false`). Não digite `:8080`, `:80` ou `:9067` no IP do provedor, a menos que um lease com IP dedicado tenha tornado essas portas públicas.

**IPs dedicados** (`endpoints` / `kind: ip`) são um extra pago e **não** estão neste template. Eles podem fixar um IP público e, às vezes, a porta do `as`. Deixe-os desativados, a menos que você precise disso.

### Qual site usar (pagamentos)

O SDL é o mesmo. As duas interfaces web do Akash diferem na **forma de pagamento**.

| Site | Pagamentos | Carteira |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Checkout web tradicional (cartão / meios fiat oferecidos pelo Console) | Conta do Console |
| [air.akash.network](https://air.akash.network) | Pagamentos nativos na chain do Akash (AKT / ACT) | **Keplr** |

Use o **Air** quando quiser pagar com a Keplr on-chain. Use o **Console** quando quiser um fluxo de pagamento web convencional.

### Implantação

**Pagamentos web (Console)**

[![Implantar no Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Pagamentos nativos do Akash com a Keplr (Air)**

[Abrir este template no Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Crie o deployment a partir do template, aceite uma oferta, aguarde até que os logs de `app` mostrem `ths-server serve` permanecendo ativo e, em seguida, abra o **URI de `app`** para acessar o painel.

### Relacionados

- [Zakura no Akash](/guides/akash-network-zakura) — nó validador de Mainnet/Testnet
- [Zebra no Akash](/guides/akash-network-zebra)
- Livro: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
