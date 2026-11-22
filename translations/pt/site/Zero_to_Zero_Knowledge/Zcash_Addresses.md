# Zero to Zero Knowledge: transações transparentes vs. blindadas e endereços unificados

**Série:** Zero to Zero Knowledge

Se você está conhecendo o Zcash pela primeira vez, vai descobrir que existem dois tipos de transações disponíveis: **transparentes** e **blindadas**.  

Hoje vamos conhecê-las e falar sobre um dos novos recursos do ecossistema #Zcash, os **endereços unificados**.

---

## Transações transparentes vs. blindadas

- **Transações transparentes** usam **t-addresses** (codificados em Base58). Tudo fica publicamente visível, assim como no Bitcoin.  
- **Transações blindadas** usam endereços codificados para os pools **Sapling** ou **Orchard**. Elas ocultam o remetente, o destinatário e o valor usando provas de conhecimento zero.

**Transação blindada** se refere a qualquer transação com endereços codificados para os pools Sapling/Orchard.

![Introdução: transparente vs blindado](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

Os **endereços unificados (UAs)** foram criados para **unificar** transações blindadas ou transparentes em um único endereço.

---

## Tipos de endereço no Zcash

Existem 3 tipos de endereço em uso:

1. **(T) Transparente** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Endereço unificado** – Bech32m  

O número de caracteres (e, portanto, o tamanho do QR code) aumenta a cada tipo.

![Comparação dos tipos de endereço](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![Comparação de tamanhos de QR code](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Como funcionam os endereços unificados

Endereços e chaves são codificados como uma sequência de bytes (**codificação bruta**).  
Uma **codificação de destinatário** inclui todas as informações necessárias para transferir um ativo usando um protocolo específico.

A codificação bruta de um endereço unificado é uma combinação das codificações (typecode, length, addr) dos destinatários:

- UA: `0x03`  
- Sapling: `0x02`  
- Transparente: `0x01`  

**Importante**: todo UA precisa ter **pelo menos um endereço de pagamento blindado**. (Endereços Sprout não são mais aceitos desde o upgrade Canopy.)

![Estrutura de codificação do UA](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Especificação completa: **[ZIP-316: Endereços unificados](https://zips.z.cash/zip-0316)**

---

## Benefícios dos endereços unificados

- **Mais fácil para as corretoras**: agora elas podem oferecer depósitos e saques blindados com mais segurança.  
- **Preparado para o futuro**: novos pools blindados podem ser adicionados sem quebrar as carteiras.  
- **Blindado por padrão**: todo UA contém pelo menos um endereço blindado, então a privacidade está sempre disponível.

Essa é uma mudança fundamental que já está ajudando mais ZEC a migrar para o pool blindado.

---

## Transações e Actions do Orchard

O Orchard introduziu um novo conceito chamado **Actions**:

- Elas reduzem o vazamento de metadados usando uma **única âncora** para todas as Actions de uma transação.  
- Elas unem os campos de Spend + Output (V4) em um único compromisso de valor.  
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

## Saldo de valor e privacidade

Em alguns casos (por exemplo, transações entre pools), os valores podem ficar visíveis para um observador externo. No entanto, o `valueBalanceSapling` e o `valueBalanceOrchard` usam **compromissos homomórficos** para provar o total de ZEC nos pools blindados e impedir a falsificação.

Leia mais: [ZIP 209: Proibir saldos de pools de valor da chain fora do intervalo](https://zips.z.cash/zip-0209)

---

## Melhorias futuras

A equipe da ECC está trabalhando em novos métodos RPC no `zcashd` (que substitui o `z_sendmany`) que vão permitir que os usuários visualizem uma transação proposta e a aceitem ou rejeitem com base nas suas características de privacidade.

---

## Recomendação

Originalmente, esta thread indicava a **YWallet**, pelo plano de transação que ela mostrava antes de você clicar em enviar. A YWallet não recebe mais manutenção e não será atualizada para o Ironwood, então não consegue mais acompanhar a chain. Em vez dela, escolha uma carteira com manutenção ativa na página [Carteiras](https://zechub.wiki/wallets) e dê preferência a uma que mostre o que uma transação vai revelar antes de ser enviada.

Ótimo artigo sobre privacidade de transações: https://medium.com/@hanh.huynh/

---

**Thread original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Esta página foi compilada a partir da thread original do Zero to Zero Knowledge para a wiki do ZecHub.*
