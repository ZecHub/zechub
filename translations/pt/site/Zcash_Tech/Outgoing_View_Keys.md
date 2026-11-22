<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Chaves de visualização de saída (OVKs)

Uma chave de visualização de saída (OVK) é um valor de 32 bytes usado apenas para criptografar o texto cifrado *de saída* de uma saída blindada. Ela permite que uma parte recupere o texto simples da note que foi enviada (endereço do destinatário, valor e memorando) sem a capacidade de gastar fundos ou ver notes recebidas.

O destinatário sempre descriptografa a note recebida com a própria chave de visualização de entrada. A escolha da OVK não altera o que o destinatário vê. Não existe uma codificação padrão para uma OVK bruta; ela é simplesmente um valor de 32 bytes.

## Resumo

- Uma OVK controla apenas quem pode recuperar o texto simples de saída de um pagamento blindado.
- As carteiras escolhem entre três políticas: **Sender** (recuperação normal com a UFVK da conta), **Custom** (recuperação com uma chave que você fornece) ou **Discard** (ninguém consegue recuperar o texto simples de saída a partir da chain).
- Mesmo com Discard ou uma OVK personalizada, quem tem a UFVK continua vendo quais notes foram gastas e pode calcular o valor líquido que saiu da conta.
- A única forma confiável de manter um valor invisível para uma determinada UFVK é garantir que as notes nunca tenham pertencido àquela conta (conta separada ou carteira separada).
- As três políticas já existem no `zcash_client_backend`; quase todas as carteiras hoje usam apenas a política padrão Sender.

---

## As três políticas

As carteiras construídas com `zcash_client_backend` selecionam uma `OvkPolicy` ao montar uma transação:

| Política | Textos cifrados de saída | Quem pode recuperar depois o texto simples de saída |
|--------|----------------------|----------------------------------------------|
| **Sender** (padrão) | Criptografados para a OVK normal da conta | A Unified Full Viewing Key da conta de envio |
| **Custom** | Criptografados para a(s) chave(s) que você fornece | Quem tiver a(s) chave(s) fornecida(s) |
| **Discard** | Nenhuma OVK é usada (`ovk = ⊥`) | Ninguém (nem mesmo o remetente) |

Um construtor de conveniência cria uma política `Custom` a partir de um único valor de 32 bytes, de modo que a OVK externa e a interna sejam a mesma chave.

![Comparação de políticas de Outgoing Viewing Key](/content-images/ovk-policies.webp)

Consulte a [documentação do OvkPolicy](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) e a [ZIP 310](https://zips.z.cash/zip-0310).

## Para que serve cada política

**Sender** é o comportamento comum de uma carteira. Depois que a transação é minerada, qualquer pessoa que tenha a UFVK da conta pode descriptografar os textos cifrados de saída e recuperar os endereços dos destinatários, os valores e os memorandos.

**Custom** permite dar a um terceiro (auditor, processador de pagamentos, sistema de recibos ou dispositivo separado) a capacidade de descriptografar pagamentos de saída específicos sem entregar a ele a chave de visualização completa. Você também pode usar uma chave efêmera que descarta após a transação, ou usar chaves diferentes para contrapartes diferentes, de modo que nenhuma chave isolada veja todos os pagamentos de saída.

**Discard** significa que a carteira remetente não consegue recuperar o texto simples de saída a partir da chain. Isso é útil quando você quer minimizar o que pode ser recuperado caso a UFVK seja comprometida no futuro, ou quando deliberadamente não quer um registro on-chain que a OVK da conta consiga abrir.

## O que quem tem a UFVK ainda vê

Mesmo quando Discard ou uma OVK personalizada é usada, quem tem a UFVK da conta ainda pode:

- Detectar quais notes da conta foram gastas (por meio dos nulificadores).
- Saber os valores dessas notes de entrada.
- Recuperar quaisquer notes de troco (elas são criptografadas para a chave de visualização de entrada interna, não para uma OVK).
- Portanto, calcular o valor líquido que saiu da conta.

O que não fica visível são os endereços individuais dos destinatários, a divisão do valor e os memorandos. A documentação do `WalletWrite` alerta que os dados sobre transações criadas com Discard (ou com uma OVK personalizada aleatória) não podem ser recuperados a partir dos dados da chain se o registro local for perdido.

## Mantendo valores fora do alcance de uma determinada UFVK

`OvkPolicy` controla apenas a recuperação do texto simples de saída. Ela não oculta gastos nem valores líquidos da própria UFVK da conta.

A única forma confiável de impedir que um valor fique visível para uma determinada UFVK é garantir que as notes que carregaram esse valor nunca tenham pertencido à conta controlada por essa UFVK:

1. **Contas ZIP-32 separadas** (mesma seed) — Crie um novo índice de conta, mova os fundos para ele e nunca exporte a UFVK dessa conta. A UFVK da conta original vê apenas a transferência para a nova conta.
2. **Carteira completamente separada** (seed diferente) — Deposite fundos em uma carteira nova, gaste a partir dela e descarte a seed ou a UFVK. A carteira original registra apenas a transferência de financiamento.
3. **Carteiras efêmeras de uso único** — Igual ao item anterior, mas trate a carteira de gastos como descartável.

Uma UFVK é por conta. Notes que nunca estiveram naquela conta nunca aparecem no saldo dela nem nos totais de saída.

## Como as carteiras usam as políticas hoje

Quase todas as carteiras em produção usam apenas a política padrão **Sender**, então o histórico completo de saídas pode ser recuperado a partir da UFVK. As outras duas políticas existem na biblioteca, mas raramente são expostas nas interfaces de usuário.

Possíveis opções futuras incluem:

- Uma flag por transação que permita ao usuário escolher Custom ou Discard para um único pagamento.
- Um modo Discard permanente (a restauração pela seed mostraria então apenas as saídas líquidas).
- OVKs personalizadas para divulgação seletiva de pagamentos individuais (mais leve do que uma divulgação de pagamento completa via [ZIP 311](https://zips.z.cash/zip-0311)).
- Uso contínuo da separação de contas ou carteiras para um isolamento mais forte.

## Recursos

- [ZIP 310: Propriedades de segurança das Viewing Keys Sapling](https://zips.z.cash/zip-0310)
- [ZIP 316: Unified Addresses e Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [ZIP 315: Melhores práticas para implementações de carteiras](https://zips.z.cash/zip-0315)
- [OvkPolicy no zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Páginas relacionadas

- [Chaves de visualização](/zcash-tech/viewing-keys)
- [Divulgações de pagamento](/zcash-tech/payment-disclosures)
- [Unified Addresses](/zcash-tech/unified-addresses)
- [O que um explorador de blocos consegue ver](/zcash-tech/what-a-block-explorer-can-see)
