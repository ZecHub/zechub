# Zero to Zero Knowledge: transações transparentes vs blindadas e endereços unificados

**Série:** Zero to Zero Knowledge

Se você está aprendendo sobre o Zcash pela primeira vez, verá que há dois tipos de transações disponíveis: **transparentes** e **blindadas**.  

Hoje vamos aprender sobre elas e abordar um dos novos recursos do ecossistema #Zcash, os **endereços unificados**.

---

## Transações transparentes vs blindadas

- **Transações transparentes** usam **t-addresses** (codificados em Base58). Tudo é visível publicamente — assim como no Bitcoin.  
- **Transações blindadas** usam endereços codificados para os pools **Sapling** ou **Orchard**. Elas ocultam remetente, destinatário e valor usando provas de conhecimento zero.

**Transação blindada** refere-se a qualquer transação com endereços codificados para os pools Sapling/Orchard.

![Introdução a transparentes vs. blindadas](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

Os **endereços unificados (UAs)** foram projetados para **unificar** transações blindadas ou transparentes em um único endereço.

---

## Tipos de endereço no Zcash

Há 3 tipos de endereço em uso:

1. **(T) Transparente** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

O número de caracteres (e, portanto, o tamanho do código QR) aumenta a cada tipo.

![Comparação dos tipos de endereço](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![Comparação do tamanho do código QR](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Como os endereços unificados funcionam

Endereços e chaves são codificados como uma sequência de bytes (**codificação bruta**).  
Uma **codificação de receptor** inclui todas as informações necessárias para transferir um ativo usando um protocolo específico.

A codificação bruta de um Unified Address é uma combinação das codificações (typecode, length, addr) dos receptores:

- UA: `0x03`  
- Sapling: `0x02`  
- Transparente: `0x01`  

**Importante**: Deve haver **pelo menos um endereço de pagamento blindado** em cada UA. (Endereços Sprout não são mais suportados após a atualização Canopy.)

![Estrutura de codificação da UA](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Especificação completa: **[ZIP-316: Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Benefícios dos endereços unificados

- **Mais fácil para corretoras** — Agora elas podem oferecer suporte a depósitos/saques blindados com mais segurança.  
- **Preparadas para o futuro** — Novos pools blindados podem ser adicionados sem quebrar as carteiras.  
- **Blindado por padrão** — Toda UA contém pelo menos um endereço blindado, então a privacidade está sempre disponível.

Esta é uma mudança fundamental que já está ajudando mais ZEC a migrar para o pool blindado.

---

## Transações Orchard e ações

Orchard introduziu um novo conceito chamado **ações**:

- Elas reduzem o vazamento de metadados ao usar uma **âncora única** para todas as ações em uma transação.  
- Elas mesclam os campos de (V4) Spend + Output em um único compromisso de valor.  
- Isso permite otimizações de desempenho no sistema de provas Halo2.

Daira explica as posições de âncora (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Balanço de valor e privacidade

Em alguns casos (por exemplo, transações entre pools), os valores podem ser visíveis para um observador externo. No entanto, `valueBalanceSapling` e `valueBalanceOrchard` usam **compromissos homomórficos** para provar o total de ZEC nos pools blindados e evitar falsificação.

Leia mais: [ZIP 209: Prohibit Out-of-Range Chain Value Pool Balances](https://zips.z.cash/zip-0209)

---

## Melhorias futuras

A equipe da ECC está trabalhando em novos métodos RPC em `zcashd` (substituindo `z_sendmany`) que permitirão aos usuários visualizar e aceitar/rejeitar uma transação proposta com base em suas características de privacidade.

---

## Recomendação

Esta thread originalmente apontava para **YWallet**, pelo plano de transação que ela mostrava antes de você clicar em enviar. YWallet não recebe mais manutenção e não será atualizada para Ironwood, portanto não pode mais acompanhar a chain. Em vez disso, escolha uma carteira com manutenção ativa na página [Carteiras](https://zechub.wiki/wallets) e prefira uma que informe o que uma transação revelará antes de ser enviada.

Ótimo artigo sobre privacidade de transações: https://medium.com/@hanh.huynh/

---

**Thread original da ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Esta página foi compilada a partir da thread original Zero to Zero Knowledge para a wiki da ZecHub.*
