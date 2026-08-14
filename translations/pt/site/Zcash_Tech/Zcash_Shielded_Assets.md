<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Ativos Blindados da Zcash

## Resumo

Zcash Shielded Assets (ZSA) são uma extensão proposta do protocolo que permitiria que ativos **para além de ZEC** — stablecoins, tokens de governação ou qualquer ativo personalizado — existissem dentro do pool blindado da Zcash, com o remetente, o destinatário e o montante mantidos privados.

- **O que é:** ativos personalizados ao estilo ERC-20, mas blindados por defeito.
- **Quem o está a desenvolver:** [QEDIT](https://qed-it.com/), ao abrigo de uma bolsa da Zcash Foundation, em colaboração com a Electric Coin Company.
- **Como é especificado:** [ZIP 226](https://zips.z.cash/zip-0226) (transferência e queima) juntamente com a [ZIP 227](https://zips.z.cash/zip-0227) (emissão).
- **Estado:** ainda não está ativo na mainnet. O protocolo ZSA está previsto para ser implementado na Network Upgrade 7 (NU7).
- **Taxas:** são sempre pagas em ZEC, independentemente do ativo que esteja a ser movimentado.

---

## Explicação Principal

Zcash Shielded Assets (ZSA) são uma melhoria proposta ao protocolo Zcash que permitiria a criação, transferência e queima de ativos personalizados na cadeia da Zcash.

Se estiver familiarizado com o padrão de token [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) na blockchain Ethereum, os ZSA estão para a Zcash assim como os tokens ERC-20 estão para o Ethereum.

Zcash Shielded Assets permitiriam a criação de tokens personalizados na blockchain Zcash, permitindo assim que tokens para além de [ZEC](/guides/using-zec-privately) beneficiassem do anonimato e da privacidade das transações blindadas na blockchain Zcash.

Um dos principais usos potenciais dos ZSA seria a emissão de stablecoins no protocolo Zcash. Stablecoins são criptomoedas que associam o seu valor a uma moeda fiduciária, como o dólar americano ou o euro. Atualmente, algumas das stablecoins com maior circulação são tokens ERC-20, como [USDC](https://www.circle.com/en/usdc) e [Dai](https://docs.makerdao.com/).

Outro uso potencial dos ZSA seria a emissão de tokens de governação. Por exemplo, a Zechub (a editora desta wiki) é uma Organização Autónoma Descentralizada (DAO) e poderia criar e emitir aos seus membros um ZSA para votar em propostas e decisões de governação.

Os ZSA estão a ser desenvolvidos pela [QEDIT](https://qed-it.com/), ao abrigo de uma bolsa significativa da [Zcash Foundation](/zcash-organizations/zcash-foundation), em colaboração com a [Electric Coin Company](/zcash-organizations/electric-coin-company). Como este projeto ainda está a ser desenvolvido ativamente, as atualizações são publicadas [nesta discussão](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) do fórum da Zcash. A [candidatura à bolsa ZSA](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) da QEDIT está disponível no site de bolsas da Zcash Foundation.

---

## Visual / Analogia

### O envelope selado

Imagine uma transação blindada da Zcash como um envelope simples e selado colocado numa caixa de correio pública. Qualquer pessoa pode ver que um envelope foi enviado. Ninguém consegue ver quem o enviou, quem o recolhe ou o que está lá dentro — e cada envelope parece idêntico a qualquer outro.

Hoje, um envelope na rede Zcash só pode transportar uma coisa: ZEC.

O ZSA não altera o envelope. Altera **o que é permitido no seu interior**. Depois do ZSA, o mesmo envelope selado poderia transportar uma stablecoin, um token de governação de uma DAO ou um ponto de fidelização de uma empresa — e, visto de fora, continuaria a parecer exatamente igual a qualquer outro envelope na rede.

Há um detalhe importante a reter: **os portes são sempre pagos em ZEC**, independentemente do que estiver dentro do envelope.

### O que um observador externo consegue ver

| Um observador consegue ver... | ERC-20 no Ethereum | ZSA na Zcash |
| --- | --- | --- |
| Quem enviou | Público | Blindado |
| Quem recebeu | Público | Blindado |
| Quanto foi movimentado | Público | Blindado |
| Saldos individuais | Público | Blindado |
| Oferta total do ativo | Público | **Pública — deliberadamente** |
| Moeda em que a taxa é paga | ETH | ZEC |

### Porque a linha da oferta não é um bug

As duas últimas linhas da tabela são onde o ZSA se torna interessante.

A ZIP 227 mantém deliberadamente a **emissão transparente**, para que a oferta em circulação de cada ativo possa ser acompanhada on-chain. As posses individuais e os pagamentos individuais permanecem privados; o número total de tokens em existência não.

Para um emissor de stablecoin, essa combinação é precisamente o objetivo e não um compromisso. As reservas podem ser auditadas face a uma oferta publicamente verificável, enquanto as pessoas que realmente utilizam o token mantêm os seus saldos e pagamentos privados.

### Um ativo, uma identidade

Cada ativo recebe um **Identificador de Ativo** único, derivado da chave de emissão do emissor juntamente com uma descrição textual do ativo. Dois emissores diferentes não podem produzir o mesmo identificador, e cunhar ou alterar um ativo requer autorização criptográfica do seu emissor. Em termos da analogia do envelope: qualquer pessoa pode enviar um envelope, mas só a casa da moeda que detém um dado ativo pode imprimir mais desse ativo.

---

## Análise Aprofundada

### Demonstração de ZSA no Zebra

[![Miniatura do vídeo](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Experimente a demonstração por si mesmo!**

Clone o repositório zcash-tx-tool: <https://github.com/QED-it/zcash_tx_tool>

### Zcash Improvement Proposals (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Transfer and Burn of Zcash Shielded Assets
- [ZIP 227](https://zips.z.cash/zip-0227): Issuance of Zcash Shielded Assets
- [ZIP 230](https://zips.z.cash/zip-0230): Version 6 Transaction Format

> **Nota sobre a ZIP 230:** Desde então, a ZIP 230 foi retirada e não será implementada. A versão 6 de transação está agora definida pela [ZIP 229](https://zips.z.cash/zip-0229). Veja o aviso no topo da página da [ZIP 230](https://zips.z.cash/zip-0230).

A ZIP 226 define o protocolo OrchardZSA — uma extensão do protocolo Orchard que transporta a transferência e a queima de ativos personalizados. A ZIP 227 define como esses ativos são criados em primeiro lugar e só deve ser implementada em conjunto com a ZIP 226.

### Proposta de Bolsa ZSA

A proposta ZSA para Shielded Assets (ZSA/UDA) foi apresentada pela equipa da [QEDIT](https://qed-it.com/) para construir ativos blindados genéricos na blockchain Zcash. Estes são normalmente referidos como User Defined Assets (UDA) ou como Zcash Shielded Assets (ZSA).

Com esta proposta, a equipa da [QEDIT](https://qed-it.com/) planeia trazer DeFi para o ecossistema Zcash e, ao mesmo tempo, permitir a utilização da melhor tecnologia de privacidade dentro do ecossistema DeFi existente. Numa sondagem, a equipa perguntou, e a comunidade respondeu que [ativos blindados genéricos (ZSA/UDA) são, neste momento, a funcionalidade mais pedida](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Estas propostas estão tecnicamente em conformidade com a especificação [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) e estão definidas na ZIP 226 e ZIP 227.

1. [ZIP 226](https://zips.z.cash/zip-0226): Transfer and Burn of Zcash Shielded Assets
2. [ZIP 227](https://zips.z.cash/zip-0227): Issuance of Zcash Shielded Assets

---

## Implicações Práticas

**Se detém ou utiliza ZEC**

- Os ZSA são definidos como uma extensão de Orchard ("OrchardZSA"), por isso partilhariam a infraestrutura blindada que o ZEC já utiliza. A sua wallet precisará de suporte explícito a ZSA antes de os poder guardar ou enviar.
- Terá sempre de ter algum ZEC disponível. As taxas para emitir e transferir um ZSA são pagas em ZEC, não no próprio ativo.
- Nada muda nas suas transações de ZEC existentes.

**Se é um potencial emissor — uma stablecoin, uma DAO, uma empresa**

- A emissão de um ativo requer autorização criptográfica associada a uma chave de emissão, por isso só o emissor pode cunhar ou alterar os atributos do seu próprio ativo.
- A oferta em circulação do seu ativo é auditável publicamente, enquanto os saldos e transferências dos seus utilizadores não o são. Para um emissor regulado, esta é normalmente a combinação exata exigida.
- Uma única transação de emissão pode criar mais de um ativo ao mesmo tempo.

**Para o ecossistema**

- Como cada taxa de ZSA é denominada em ZEC, a atividade em qualquer ativo futuro emitido na Zcash cria procura pelo próprio ZEC.

---

## Erros Comuns

| Crença comum | O que acontece na realidade |
| --- | --- |
| "Os ZSA já estão ativos na Zcash hoje." | Não estão. O ZSA está previsto para ser implementado na Network Upgrade 7 (NU7) e ainda está em revisão e testes. |
| "O ZSA traz smart contracts para a Zcash." | O ZSA especifica a emissão, transferência e queima de ativos. Não é uma camada de contratos programáveis de uso geral. |
| "Pode pagar as taxas de ZSA no próprio token ZSA." | As taxas são pagas em ZEC. |
| "Se é blindado, então a oferta do token também tem de ser secreta." | A ZIP 227 torna a emissão transparente de propósito, para que a oferta de cada ativo possa ser acompanhada publicamente. Os saldos e as transferências permanecem privados; a oferta não. |
| "A ZIP 230 é o formato atual de transação da versão 6." | A ZIP 230 foi retirada. A versão 6 está agora definida pela ZIP 229. |

---

## Páginas Relacionadas

- [Halo](/zcash-tech/halo) — o sistema de provas por detrás de Orchard, o protocolo que o ZSA alarga
- [Zk-SNARKs](/zcash-tech/zk-snarks) — as provas de conhecimento zero que permitem que uma transferência blindada seja verificada sem ser revelada
- [Shielded Pools](/using-zcash/shielded-pools) — onde os ZSA existiriam lado a lado com o ZEC
- [Transactions](/using-zcash/transactions) — como uma transação Zcash é construída
- [Zebra Full Node](/zcash-tech/zebra-full-node) — a implementação de nó completo utilizada na demonstração de ZSA acima
