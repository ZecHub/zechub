<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Chaves de visualização de saída (OVKs)

Uma chave de visualização de saída (OVK) é um valor de 32 bytes usado apenas para criptografar o texto simples *de saída* de uma saída blindada. Ela permite que uma parte recupere o texto simples da note enviada (endereço do destinatário, valor e memorando) sem a capacidade de gastar fundos ou ver notes recebidas.

O destinatário sempre descriptografa a note recebida com sua própria chave de visualização de entrada. A escolha da OVK não altera o que o destinatário vê. Não há uma codificação padrão para uma OVK bruta; ela é simplesmente composta por 32 bytes.

## Resumo

- Uma OVK controla apenas quem pode recuperar o texto simples de saída de um pagamento blindado.
- As carteiras escolhem entre três políticas: **Remetente** (recuperação normal com a UFVK da conta), **Personalizada** (recuperação com uma chave fornecida por você) ou **Discard** (ninguém pode recuperar o texto simples de saída a partir da chain).
- Mesmo com Discard ou uma OVK personalizada, um detentor da UFVK ainda vê quais notes foram gastas e pode calcular o valor líquido que saiu da conta.
- A única maneira confiável de manter um valor invisível para uma UFVK específica é garantir que as notes nunca tenham pertencido a essa conta (conta separada ou carteira separada).
- As três políticas já existem em `zcash_client_backend`; atualmente, quase todas as carteiras usam apenas a política padrão Remetente.

---

## As três políticas

As carteiras criadas com base em `zcash_client_backend` selecionam uma `OvkPolicy` ao criar uma transação:

| Política | Textos cifrados de saída | Quem pode posteriormente recuperar o texto simples de saída |
|--------|----------------------|----------------------------------------------|
| **Remetente** (padrão) | Criptografados para a OVK normal da conta | A Unified Full Viewing Key da conta remetente |
| **Personalizada** | Criptografados para a(s) chave(s) fornecida(s) por você | Quem tiver a(s) chave(s) fornecida(s) |
| **Discard** | Nenhuma OVK é usada (`ovk = ⊥`) | Ninguém (nem mesmo o remetente) |

Um construtor prático cria uma política `Custom` a partir de um único valor de 32 bytes, para que a OVK externa e a interna sejam a mesma chave.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

Consulte a documentação de [OvkPolicy](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) e a [ZIP 310](https://zips.z.cash/zip-0310).

## Para que serve cada política

**Remetente** é o comportamento comum de uma carteira. Depois que a transação é minerada, qualquer pessoa que tenha a UFVK da conta pode descriptografar os textos cifrados de saída e recuperar os endereços dos destinatários, os valores e os memorandos.

**Personalizada** permite que você dê a um terceiro (auditor, processador de pagamentos, sistema de recibos ou dispositivo separado) a capacidade de descriptografar pagamentos específicos de saída sem fornecer a chave de visualização completa. Você também pode usar uma chave efêmera que descarta após a transação, ou usar chaves diferentes para contrapartes diferentes, de modo que nenhuma chave individual veja todos os pagamentos de saída.

**Discard** significa que a carteira remetente não pode recuperar o texto simples de saída a partir da chain. Isso é útil quando você deseja minimizar o que pode ser recuperado caso a UFVK seja comprometida posteriormente, ou quando deliberadamente não deseja um registro on-chain que a OVK da conta possa abrir.

## O que um detentor de UFVK ainda vê

Mesmo quando Discard ou uma OVK personalizada é usada, um detentor da UFVK da conta ainda pode:

- Detectar quais notes da conta foram gastas (por meio de nulificadores).
- Saber os valores dessas notes de entrada.
- Recuperar quaisquer notes de troco (elas são criptografadas para a chave de visualização de entrada interna, não para uma OVK).
- Portanto, calcular o valor líquido que saiu da conta.

O que não fica visível são os endereços individuais dos destinatários, a divisão do valor e os memorandos. A documentação de `WalletWrite` alerta que os dados sobre transações criadas sob Discard (ou uma OVK personalizada aleatória) não podem ser recuperados dos dados da chain se o registro local for perdido.

## Mantendo valores fora de uma UFVK específica

`OvkPolicy` controla apenas a recuperação do texto simples de saída. Ela não oculta gastos ou valores líquidos da própria UFVK da conta.

A única maneira confiável de impedir que um valor fique visível para uma UFVK específica é garantir que as notes que carregavam esse valor nunca tenham pertencido à conta controlada por essa UFVK:

1. **Contas ZIP-32 separadas** (mesma seed) — Crie um novo índice de conta, mova fundos para ele e nunca exporte a UFVK dessa conta. A UFVK da conta original vê apenas a transferência para a nova conta.
2. **Carteira completamente separada** (seed diferente) — Financie uma carteira nova, gaste a partir dela e descarte a seed ou a UFVK. A carteira original registra apenas a transferência de financiamento.
3. **Carteiras efêmeras de uso único** — Igual ao caso acima, mas trate a carteira de gastos como descartável.

Uma UFVK é por conta. Notes que nunca estiveram nessa conta nunca aparecem em seu saldo ou em seus totais de saída.

## Como as carteiras usam as políticas atualmente

Quase todas as carteiras de produção usam apenas a política padrão **Remetente**, portanto, o histórico completo de saída pode ser recuperado a partir da UFVK. As outras duas políticas existem na biblioteca, mas raramente são expostas nas interfaces de usuário.

Possíveis opções futuras incluem:

- Uma opção por transação que permite ao usuário escolher Personalizada ou Discard para um único pagamento.
- Um modo permanente Discard (a restauração da seed então mostraria apenas as saídas líquidas).
- OVKs personalizadas para divulgação seletiva de pagamentos individuais (mais leve do que uma divulgação de pagamento [ZIP 311](https://zips.z.cash/zip-0311) completa).
- Uso contínuo da separação de contas ou carteiras para isolamento mais forte.

## Recursos

- [ZIP 310: Propriedades de segurança das chaves de visualização Sapling](https://zips.z.cash/zip-0310)
- [ZIP 316: Endereços unificados e chaves de visualização unificadas](https://zips.z.cash/zip-0316)
- [ZIP 315: Melhores práticas para implementações de carteiras](https://zips.z.cash/zip-0315)
- [OvkPolicy em zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Páginas relacionadas

- [Chaves de visualização](/zcash-tech/viewing-keys)
- [Divulgações de pagamento](/zcash-tech/payment-disclosures)
- [Endereços unificados](/zcash-tech/unified-addresses)
- [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see)
