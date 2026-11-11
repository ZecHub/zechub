<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Ativos blindados do Zcash

## Resumo

Zcash Shielded Assets (ZSA) são uma extensão proposta do protocolo que permitiria que ativos **além de ZEC** — stablecoins, tokens de governança ou qualquer ativo personalizado — existissem dentro do pool blindado do Zcash, com o remetente, o destinatário e o valor mantidos privados.

- **O que são:** ativos personalizados no estilo ERC-20, mas blindados por padrão.
- **Quem está desenvolvendo:** [QEDIT](https://qed-it.com/), por meio de um subsídio da Zcash Foundation, em colaboração com a Electric Coin Company.
- **Como são especificados:** [ZIP 226](https://zips.z.cash/zip-0226) (transferência e queima) juntamente com a [ZIP 227](https://zips.z.cash/zip-0227) (emissão).
- **Status:** ainda não estão ativos na mainnet nem fazem parte da atualização da rede 7 (NU7). [ZIP 259](https://zips.z.cash/zip-0259), que lista tudo o que a NU7 implementa, não inclui a ZIP 226 nem a ZIP 227, e ainda não foi definida nenhuma data de ativação para ZSA.
- **Taxas:** são sempre pagas em ZEC, independentemente do ativo que está sendo movimentado.

---

## Explicação principal

Zcash Shielded Assets (ZSA) são uma melhoria proposta para o protocolo Zcash que permitiria a criação, transferência e queima de ativos personalizados na chain do Zcash.

Se você estiver familiarizado com o padrão de token [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) na blockchain Ethereum, os ZSA estão para o Zcash assim como os tokens ERC-20 estão para o Ethereum.

Zcash Shielded Assets permitiriam a criação de tokens personalizados na blockchain Zcash, permitindo assim que tokens além de [ZEC](/guides/using-zec-privately) se beneficiassem do anonimato e da privacidade das transações blindadas na blockchain Zcash.

Um dos principais usos potenciais dos ZSA seria a emissão de stablecoins no protocolo Zcash. Stablecoins são criptomoedas que vinculam seu valor a uma moeda fiduciária, como o dólar americano ou o euro. Atualmente, algumas das stablecoins com maior circulação são tokens ERC-20, como [USDC](https://www.circle.com/en/usdc) e [Dai](https://docs.makerdao.com/).

Outro uso potencial dos ZSA seria a emissão de tokens de governança. Por exemplo, ZecHub (a editora desta wiki) é uma Organização Autônoma Descentralizada (DAO) e poderia criar e emitir um ZSA aos seus membros para votar em propostas e decisões de governança.

Os ZSA estão sendo desenvolvidos pela [QEDIT](https://qed-it.com/), por meio de um subsídio significativo da [Zcash Foundation](/zcash-organizations/zcash-foundation), em colaboração com a [Electric Coin Company](/zcash-organizations/electric-coin-company). Como este projeto ainda está sendo desenvolvido ativamente, as atualizações são publicadas [nesta discussão](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) do fórum do Zcash. A [candidatura ao subsídio ZSA](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) da QEDIT está disponível no site de subsídios da Zcash Foundation.

---

## Visual / analogia

### O envelope lacrado

Imagine uma transação blindada do Zcash como um envelope simples e lacrado colocado em uma caixa de correio pública. Qualquer pessoa pode ver que um envelope foi enviado. Ninguém consegue ver quem o enviou, quem o recebe ou o que há dentro dele — e cada envelope parece idêntico a qualquer outro.

Hoje, um envelope na rede Zcash só pode transportar uma coisa: ZEC.

O ZSA não altera o envelope. Altera **o que é permitido dentro dele**. Depois do ZSA, o mesmo envelope lacrado poderia transportar uma stablecoin, um token de governança de uma DAO ou um ponto de fidelidade de uma empresa — e, visto de fora, continuaria parecendo exatamente igual a qualquer outro envelope na rede.

Há um detalhe importante a lembrar: **as taxas são sempre pagas em ZEC**, independentemente do que estiver dentro do envelope.

### O que um observador externo consegue ver

| Um observador consegue ver... | ERC-20 no Ethereum | ZSA no Zcash |
| --- | --- | --- |
| Quem enviou | Público | Blindado |
| Quem recebeu | Público | Blindado |
| Quanto foi movimentado | Público | Blindado |
| Saldos individuais | Público | Blindado |
| Oferta total do ativo | Público | **Pública — deliberadamente** |
| Moeda em que a taxa é paga | ETH | ZEC |

### Por que a linha da oferta não é um bug

As duas últimas linhas da tabela são onde o ZSA se torna interessante.

A ZIP 227 mantém deliberadamente a **emissão transparente**, para que a oferta em circulação de cada ativo possa ser acompanhada on-chain. As posses individuais e os pagamentos individuais permanecem privados; o número total de tokens existentes não.

Para um emissor de stablecoin, essa combinação é precisamente o objetivo e não uma concessão. As reservas podem ser auditadas em relação a uma oferta verificável publicamente, enquanto as pessoas que realmente usam o token mantêm seus saldos e pagamentos privados.

### Um ativo, uma identidade

Cada ativo recebe um **Identificador de Ativo** único, derivado da chave de emissão do emissor juntamente com uma descrição textual do ativo. Dois emissores diferentes não podem produzir o mesmo identificador, e cunhar ou alterar um ativo requer autorização criptográfica do seu emissor. Em termos da analogia do envelope: qualquer pessoa pode enviar um envelope, mas somente a casa da moeda que detém um determinado ativo pode imprimir mais desse ativo.

---

## Análise aprofundada

### Demonstração de ZSA no Zebra

[![Miniatura do vídeo](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Experimente a demonstração você mesmo!**

Clone o repositório zcash-tx-tool: [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Propostas de melhoria do Zcash (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Transfer and Burn of Zcash Shielded Assets
- [ZIP 227](https://zips.z.cash/zip-0227): Issuance of Zcash Shielded Assets
- [ZIP 230](https://zips.z.cash/zip-0230): Version 6 Transaction Format

> **Nota sobre a ZIP 230:** Desde então, a ZIP 230 foi retirada e não será implementada. A versão 6 de transação agora está definida pela [ZIP 229](https://zips.z.cash/zip-0229). Veja o aviso no topo da página da [ZIP 230](https://zips.z.cash/zip-0230).

A ZIP 226 define o protocolo OrchardZSA — uma extensão do protocolo Orchard que abrange a transferência e a queima de ativos personalizados. A ZIP 227 define como esses ativos são criados e só deve ser implementada em conjunto com a ZIP 226.

### Proposta de subsídio ZSA

A proposta ZSA para Shielded Assets (ZSA/UDA) foi apresentada pela equipe da [QEDIT](https://qed-it.com/) para construir ativos blindados genéricos na blockchain Zcash. Estes são normalmente chamados de User Defined Assets (UDA) ou Zcash Shielded Assets (ZSA).

Com esta proposta, a equipe da [QEDIT](https://qed-it.com/) planeja trazer DeFi para o ecossistema Zcash e, ao mesmo tempo, permitir o uso da melhor tecnologia de privacidade dentro do ecossistema DeFi existente. Em uma pesquisa, a equipe perguntou, e a comunidade respondeu que [ativos blindados genéricos (ZSA/UDA) são, neste momento, a funcionalidade mais solicitada](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Estas propostas estão tecnicamente em conformidade com a especificação [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) e estão definidas na ZIP 226 e na ZIP 227.

1. [ZIP 226](https://zips.z.cash/zip-0226): Transfer and Burn of Zcash Shielded Assets
2. [ZIP 227](https://zips.z.cash/zip-0227): Issuance of Zcash Shielded Assets

---

## Implicações práticas

**Se você possui ou usa ZEC**

- Os ZSA são definidos como uma extensão de Orchard ("OrchardZSA"), por isso compartilhariam a infraestrutura blindada que o ZEC já usa. Sua carteira precisará de suporte explícito a ZSA antes que você possa armazená-los ou enviá-los.
- Você sempre precisará ter algum ZEC disponível. As taxas para emitir e transferir um ZSA são pagas em ZEC, não no próprio ativo.
- Nada muda nas suas transações de ZEC existentes.

**Se você é um potencial emissor — uma stablecoin, uma DAO, uma empresa**

- A emissão de um ativo requer autorização criptográfica associada a uma chave de emissão, por isso somente o emissor pode cunhar ou alterar os atributos do seu próprio ativo.
- A oferta em circulação do seu ativo é auditável publicamente, enquanto os saldos e as transferências dos seus usuários não são. Para um emissor regulado, esta é normalmente a combinação exata exigida.
- Uma única transação de emissão pode criar mais de um ativo ao mesmo tempo.

**Para o ecossistema**

- Como cada taxa de ZSA é denominada em ZEC, a atividade em qualquer ativo futuro emitido no Zcash cria demanda pelo próprio ZEC.

---

## Erros comuns

| Crença comum | O que acontece na realidade |
| --- | --- |
| "Os ZSA já estão ativos no Zcash hoje." | Não estão. O ZSA não faz parte da atualização da rede 7 (NU7), que a [ZIP 259](https://zips.z.cash/zip-0259) define sem a ZIP 226 nem a ZIP 227, e ainda está em revisão e testes. |
| "O ZSA traz contratos inteligentes para o Zcash." | O ZSA especifica a emissão, transferência e queima de ativos. Não é uma camada de contratos programáveis de uso geral. |
| "Você pode pagar as taxas de ZSA no próprio token ZSA." | As taxas são pagas em ZEC. |
| "Se é blindado, então a oferta do token também deve ser secreta." | A ZIP 227 torna a emissão transparente de propósito, para que a oferta de cada ativo possa ser acompanhada publicamente. Os saldos e as transferências permanecem privados; a oferta não. |
| "A ZIP 230 é o formato atual de transação da versão 6." | A ZIP 230 foi retirada. A versão 6 agora está definida pela ZIP 229. |

---

## Páginas relacionadas

- [Halo](/zcash-tech/halo) — o sistema de provas por trás de Orchard, o protocolo que o ZSA estende
- [zk-SNARKs](/zcash-tech/zk-snarks) — as provas de conhecimento zero que permitem que uma transferência blindada seja verificada sem ser revelada
- [Shielded Pools](/using-zcash/shielded-pools) — onde os ZSA existiriam lado a lado com o ZEC
- [Transactions](/using-zcash/transactions) — como uma transação do Zcash é construída
- [Zebra Full Node](/zcash-tech/zebra-full-node) — a implementação de nó integral usada na demonstração de ZSA acima
