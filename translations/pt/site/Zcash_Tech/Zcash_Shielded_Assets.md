<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Ativos blindados do Zcash

## TL;DR

Os ativos blindados do Zcash (ZSA) são uma extensão de protocolo proposta que permitiria que ativos **diferentes do ZEC** (stablecoins, tokens de governança ou qualquer ativo personalizado) existissem dentro do pool blindado do Zcash, mantendo privados o remetente, o destinatário e o valor.

- **O que é:** ativos personalizados no estilo ERC-20, mas blindados por padrão.
- **Quem está desenvolvendo:** [QEDIT](https://qed-it.com/), com um subsídio da Zcash Foundation, em colaboração com a Electric Coin Company.
- **Como é especificado:** [ZIP 226](https://zips.z.cash/zip-0226) (transferência e queima) junto com a [ZIP 227](https://zips.z.cash/zip-0227) (emissão).
- **Status:** não está ativo na mainnet e não faz parte da atualização da rede 7 (NU7). A [ZIP 259](https://zips.z.cash/zip-0259), que lista tudo o que a NU7 implanta, não inclui a ZIP 226 nem a ZIP 227, e nenhuma data de ativação dos ZSA foi definida.
- **Taxas:** sempre pagas em ZEC, independentemente do ativo que está sendo movimentado.

---

## Explicação principal

Os ativos blindados do Zcash (ZSA) são uma melhoria proposta ao protocolo Zcash que permitiria a criação, a transferência e a queima de ativos personalizados na chain do Zcash.

Se você conhece o padrão de token [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) da blockchain Ethereum, os ZSA estão para o Zcash assim como os tokens ERC-20 estão para o Ethereum.

Os ativos blindados do Zcash permitiriam a criação de tokens personalizados na blockchain do Zcash, possibilitando assim que tokens diferentes do [ZEC](/guides/using-zec-privately) se beneficiem do anonimato e da privacidade das transações blindadas na blockchain do Zcash.

Um dos principais usos potenciais dos ZSA seria a emissão de stablecoins no protocolo Zcash. Stablecoins são criptomoedas que atrelam seu valor a uma moeda fiduciária, como o dólar americano ou o euro. Atualmente, algumas das stablecoins de maior circulação são tokens ERC-20, como [USDC](https://www.circle.com/en/usdc) e [Dai](https://docs.makerdao.com/).

Outro uso potencial dos ZSA seria a emissão de tokens de governança. Por exemplo, o ZecHub (o editor desta wiki) é uma Organização Autônoma Descentralizada (DAO) e poderia criar e emitir para seus membros um ZSA para votar em propostas e decisões de governança.

Os ZSA estão sendo desenvolvidos pela [QEDIT](https://qed-it.com/), com um importante subsídio da [Zcash Foundation](/zcash-organizations/zcash-foundation), em colaboração com a [Electric Coin Company](/zcash-organizations/electric-coin-company). Como este projeto ainda está em desenvolvimento ativo, as atualizações são publicadas [neste tópico](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) do fórum do Zcash. A [solicitação de subsídio para os ZSA](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) da QEDIT está disponível no site de subsídios da Zcash Foundation.

---

## Visual / analogia

### O envelope lacrado

Imagine uma transação blindada do Zcash como um envelope simples e lacrado, colocado em uma caixa de correio pública. Qualquer pessoa pode ver que um envelope foi postado. Ninguém pode ver quem o enviou, quem o recebe ou o que há dentro, e todos os envelopes são idênticos entre si.

Hoje, um envelope na rede do Zcash só pode carregar uma coisa: ZEC.

Os ZSA não mudam o envelope. Eles mudam **o que pode ir dentro dele**. Com os ZSA, o mesmo envelope lacrado poderia carregar uma stablecoin, um token de governança de uma DAO ou um ponto de fidelidade de uma empresa, e, visto de fora, continuaria idêntico a todos os outros envelopes da rede.

Vale a pena guardar um detalhe: **o selo é sempre pago em ZEC**, não importa o que esteja dentro do envelope.

### O que um observador externo pode ver

| Um observador pode ver... | ERC-20 no Ethereum | ZSA no Zcash |
| --- | --- | --- |
| Quem enviou | Público | Blindado |
| Quem recebeu | Público | Blindado |
| Quanto foi movimentado | Público | Blindado |
| Saldos individuais | Público | Blindado |
| Oferta total do ativo | Público | **Público, de propósito** |
| Moeda em que a taxa é paga | ETH | ZEC |

### Por que a linha da oferta não é um bug

As duas últimas linhas da tabela são onde os ZSA ficam interessantes.

A ZIP 227 mantém deliberadamente a **emissão transparente**, para que a oferta circulante de cada ativo possa ser acompanhada on-chain. As posses individuais e os pagamentos individuais continuam privados; o número total de tokens existentes, não.

Para um emissor de stablecoin, essa combinação é justamente o objetivo, e não uma concessão. As reservas podem ser auditadas em relação a uma oferta verificável publicamente, enquanto as pessoas que realmente usam o token mantêm seus saldos e pagamentos para si.

### Um ativo, uma identidade

Cada ativo recebe um **identificador de ativo** exclusivo, derivado da chave de emissão do emissor junto com uma descrição textual do ativo. Dois emissores diferentes não podem gerar o mesmo identificador, e cunhar ou alterar um ativo exige autorização criptográfica do seu emissor. Em termos de envelope: qualquer pessoa pode postar um envelope, mas só a casa da moeda dona de um determinado ativo pode imprimir mais dele.

---

## Aprofundamento

### Demonstração dos ZSA no Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Execute a demonstração você mesmo!**

Clone o repositório zcash-tx-tool: [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Propostas de melhoria do Zcash (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Transferência e queima de ativos blindados do Zcash
- [ZIP 227](https://zips.z.cash/zip-0227): Emissão de ativos blindados do Zcash
- [ZIP 230](https://zips.z.cash/zip-0230): Formato de transação versão 6

> **Observação sobre a ZIP 230:** a ZIP 230 foi retirada desde então e não será implantada. A versão 6 das transações agora é definida pela [ZIP 229](https://zips.z.cash/zip-0229). Veja o aviso no topo da página da [ZIP 230](https://zips.z.cash/zip-0230).

A ZIP 226 define o protocolo OrchardZSA, uma extensão do protocolo Orchard que realiza a transferência e a queima de ativos personalizados. A ZIP 227 define como esses ativos são criados em primeiro lugar e só deve ser implementada junto com a ZIP 226.

### Proposta de subsídio dos ZSA

A proposta de ativos blindados (ZSA/UDA) foi apresentada pela equipe da [QEDIT](https://qed-it.com/) para criar ativos blindados genéricos na blockchain do Zcash. Eles costumam ser chamados de ativos definidos pelo usuário (UDA) ou de ativos blindados do Zcash (ZSA).

Com esta proposta, a equipe da [QEDIT](https://qed-it.com/) pretende levar o DeFi ao ecossistema do Zcash e, ao mesmo tempo, permitir o uso da melhor tecnologia de privacidade dentro do ecossistema DeFi existente. Em uma enquete, a equipe perguntou e a comunidade respondeu que [os ativos blindados genéricos (ZSA/UDA) são o recurso mais solicitado no momento](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Essas propostas seguem tecnicamente a especificação de [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) e estão definidas na ZIP 226 e na ZIP 227.

1. [ZIP 226](https://zips.z.cash/zip-0226): Transferência e queima de ativos blindados do Zcash
2. [ZIP 227](https://zips.z.cash/zip-0227): Emissão de ativos blindados do Zcash

---

## Implicações práticas

**Se você possui ou usa ZEC**

- Os ZSA são definidos como uma extensão do Orchard ("OrchardZSA"), portanto compartilhariam o mecanismo blindado que o ZEC já usa. Sua carteira precisará de suporte explícito aos ZSA antes de poder mantê-los ou enviá-los.
- Você sempre precisará ter algum ZEC disponível. As taxas de emissão e transferência de um ZSA são pagas em ZEC, e não no próprio ativo.
- Nada muda nas suas transações de ZEC existentes.

**Se você é um potencial emissor (uma stablecoin, uma DAO, uma empresa)**

- Emitir um ativo exige autorização criptográfica vinculada a uma chave de emissão, de modo que só você pode cunhar ou alterar os atributos do seu próprio ativo.
- A oferta circulante do seu ativo pode ser auditada publicamente, enquanto os saldos e as transferências dos seus usuários não. Para um emissor regulamentado, essa costuma ser exatamente a combinação exigida.
- Uma única transação de emissão pode criar mais de um ativo ao mesmo tempo.

**Para o ecossistema**

- Como todas as taxas dos ZSA são denominadas em ZEC, a atividade de qualquer ativo futuro emitido no Zcash gera demanda pelo próprio ZEC.

---

## Erros comuns

| Crença comum | O que realmente acontece |
| --- | --- |
| "Os ZSA já estão ativos no Zcash hoje." | Não estão. Os ZSA não fazem parte da atualização da rede 7 (NU7), que a [ZIP 259](https://zips.z.cash/zip-0259) define sem a ZIP 226 nem a ZIP 227, e ainda estão em revisão e testes. |
| "Os ZSA trazem contratos inteligentes ao Zcash." | Os ZSA especificam a emissão, a transferência e a queima de ativos. Não são uma camada de contratos programáveis de uso geral. |
| "Você pode pagar as taxas dos ZSA no próprio token ZSA." | As taxas são pagas em ZEC. |
| "Se é blindado, a oferta do token também deve ser secreta." | A ZIP 227 torna a emissão transparente de propósito, para que a oferta de cada ativo possa ser acompanhada publicamente. Os saldos e as transferências continuam privados; a oferta, não. |
| "A ZIP 230 é o formato atual de transação versão 6." | A ZIP 230 foi retirada. A versão 6 agora é definida pela ZIP 229. |

---

## Páginas relacionadas

- [Halo](/zcash-tech/halo): o sistema de provas por trás do Orchard, o protocolo que os ZSA estendem
- [zk-SNARKs](/zcash-tech/zk-snarks): as provas de conhecimento zero que permitem verificar uma transferência blindada sem revelá-la
- [Pools blindados](/using-zcash/shielded-pools): onde os ZSA ficariam, ao lado do ZEC
- [Transações](/using-zcash/transactions): como uma transação do Zcash é montada
- [Nó integral Zebra](/zcash-tech/zebra-full-node): a implementação de nó usada na demonstração dos ZSA acima
