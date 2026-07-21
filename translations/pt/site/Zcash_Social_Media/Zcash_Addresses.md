# Do Zero ao Conhecimento Zero: Transações Transparentes vs Blindadas e Unified Addresses

**Série:** Do Zero ao Conhecimento Zero

Se você está aprendendo sobre Zcash pela primeira vez, verá que há dois tipos de transações disponíveis: **Transparentes** e **Blindadas**.  

Hoje vamos aprender sobre elas e abordar um dos novos recursos do ecossistema #Zcash, as **Unified Addresses**.

---

## Transações Transparentes vs Blindadas

- **Transações Transparentes** usam **t-addresses** (codificados em Base58). Tudo é visível publicamente — assim como no Bitcoin.  
- **Transações Blindadas** usam endereços codificados para os pools **Sapling** ou **Orchard**. Eles ocultam remetente, destinatário e valor usando provas de conhecimento zero.

**Transação Blindada** refere-se a qualquer transação com endereços codificados para os pools Sapling/Orchard.

![Introdução a Transparentes vs Blindadas](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

As **Unified Addresses (UAs)** foram projetadas para **unificar** transações blindadas ou transparentes em um único endereço.

---

## Tipos de Endereço no Zcash

Há 3 tipos de endereço em uso:

1. **(T) Transparente** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

O número de caracteres (e, portanto, o tamanho do código QR) aumenta a cada tipo.

![Comparação dos tipos de endereço](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![Comparação do tamanho do código QR](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Como as Unified Addresses Funcionam

Endereços e chaves são codificados como uma sequência de bytes (**Raw Encoding**).  
Uma **Receiver Encoding** inclui todas as informações necessárias para transferir um ativo usando um protocolo específico.

A codificação bruta de uma Unified Address é uma combinação das codificações (typecode, length, addr) dos receivers:

- UA: `0x03`  
- Sapling: `0x02`  
- Transparente: `0x01`  

**Importante**: Deve haver **pelo menos um endereço de pagamento blindado** em toda UA. (Endereços Sprout não são mais suportados após a atualização Canopy.)

![Estrutura de codificação da UA](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Especificação completa: **[ZIP-316: Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Benefícios das Unified Addresses

- **Mais fácil para exchanges** — Agora elas podem oferecer suporte a depósitos/saques blindados com mais segurança.  
- **Preparadas para o futuro** — Novos pools blindados podem ser adicionados sem quebrar as carteiras.  
- **Blindado por Padrão** — Toda UA contém pelo menos um endereço blindado, então a privacidade está sempre disponível.

Esta é uma mudança fundamental que já está ajudando mais ZEC a migrar para o pool blindado.

---

## Transações Orchard e Actions

Orchard introduziu um novo conceito chamado **Actions**:

- Elas reduzem o vazamento de metadados ao usar uma **single anchor** para todas as Actions em uma transação.  
- Elas mesclam os campos de (V4) Spend + Output em um único commitment de valor.  
- Isso permite otimizações de desempenho no sistema de provas Halo2.

Daira explica as posições de Anchor (zcon3):

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

## Balanço de Valor e Privacidade

Em alguns casos (por exemplo, transações entre pools), os valores podem ser visíveis para um observador externo. No entanto, `valueBalanceSapling` e `valueBalanceOrchard` usam **commitments homomórficos** para provar o total de ZEC nos pools blindados e evitar falsificação.

Leia mais: [Defesa Contra Falsificação em Pools Blindados](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Melhorias Futuras

A equipe da ECC está trabalhando em novos métodos RPC em `zcashd` (substituindo `z_sendmany`) que permitirão aos usuários visualizar e aceitar/rejeitar uma transação proposta com base em suas características de privacidade.

---

## Recomendação

Experimente a versão mais recente do **YWallet**!  
Ela já mostra um "Plano de Transação" na tela antes de você apertar enviar, ajudando você a fazer escolhas mais privadas.

Ótimo artigo sobre privacidade de transações: https://medium.com/@hanh.huynh/

---

**Thread original por ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Esta página foi compilada a partir da thread original Zero to Zero Knowledge para a wiki da ZecHub.*
