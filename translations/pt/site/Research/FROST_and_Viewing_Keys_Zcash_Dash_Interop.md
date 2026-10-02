# FROST & Viewing Keys: Nota de Investigação sobre Interoperabilidade entre Zcash/Dash

*Preparado para ZecHub · Revisto em 27 de setembro de 2026 · Todas as alegações têm fontes em linha*

## Resumo executivo

ZecHub levantou esta questão depois de adicionar DASH blindado como opção de donativo da wiki: poderiam as viewing keys ao estilo de Zcash, ou as assinaturas de limiar de FROST, ser aplicadas ao Dash?

A investigação reformulou a questão. As viewing keys não são uma questão em aberto — o Dash integrou o [Zcash Orchard pool blindado](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) na sua cadeia Evolution, e a hierarquia de chaves de Orchard inclui viewing keys por construção. O [roadmap](https://www.dash.org/roadmap/) do próprio Dash posiciona-as para divulgação a auditores e conformidade com a Travel Rule. Essa metade está implementada, não é hipotética.

**FROST é onde se encontra a verdadeira lacuna.** O Dash já utiliza assinaturas de limiar BLS através dos [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), mas estas servem o consenso ao nível da rede — ChainLocks e InstantSend. A [ZIP 312](https://zips.z.cash/zip-0312) visa algo diferente: autorização de gasto por limiar numa única conta blindada detida por um pequeno grupo de titulares individuais de chaves. As duas não são intermutáveis. E, dado que a ZIP 312 continua em estado **Draft**, não existe uma implementação de referência em nenhuma das cadeias para adaptar, pelo que seria trabalho novo independentemente do lado que o desenvolvesse.

---

## Cronologia: porque esta comparação é invulgar neste momento

Dois acontecimentos relacionados com pools blindados ocorreram com semanas de diferença, em meados de 2026.

**Zcash afastou-se de Orchard.** O investigador Taylor Hornby divulgou uma vulnerabilidade no circuito de Orchard que poderia ser explorada para inflacionar a oferta de forma indetetável. Zcash respondeu ativando **Ironwood (NU6.3)** em **28 de julho de 2026**, introduzindo um novo pool blindado com um mecanismo de migração turnstile.

**O Dash adotou Orchard.** O Dash anunciou o plano em [19 de fevereiro de 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — *"Esperamos poder lançar em breve transferências blindadas, naturalmente dependentes de auditorias de segurança e de revisão adicional do código."* O [roadmap](https://www.dash.org/roadmap/) do Dash regista os Saldos Blindados como **concluídos em julho de 2026** com o Dash Platform **v4.0**, e o Dash publicou [*"As transações blindadas estão ativas na mainnet Dash Evolution"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) em **4 de agosto de 2026**.

> **Uma nota sobre a ordem.** Algumas coberturas situaram a ativação da mainnet do Dash em 17 de julho de 2026, o que a colocaria antes de Ironwood. Essa data parece resultar de notícias sobre o anúncio, e não de uma ativação. Nas fontes do próprio Dash, a funcionalidade foi concluída em julho e anunciada como ativa em 4 de agosto — depois de Ironwood. As duas cadeias cruzaram-se no espaço de algumas semanas; a ordem exata depende do marco considerado, e esta nota não reivindica uma.

Crucialmente, o Dash não herdou o erro. O seu anúncio é explícito: *"implementámos a versão de Orchard sem um erro de inflação conhecido. A versão anterior continha um erro que poderia ser explorado para inflacionar de forma indetetável a oferta de Zcash."*

Assim, o Dash executa agora um fork corrigido da criptografia que a própria Zcash abandonou na camada base, enquanto o pool de próxima geração de Zcash (Ironwood) e o esquema de autorização de gasto de próxima geração (FROST) estão, respetivamente, recém-ativos e ainda em Draft.

---

## Viewing keys: implementadas, não uma lacuna de investigação

O pool blindado do Dash é [Orchard](https://zips.z.cash/zip-0224), construído sobre Halo 2 zk-SNARKs que não exige configuração fidedigna. A hierarquia de chaves de Orchard sempre incluiu Full Viewing Keys e Incoming Viewing Keys como parte do seu design, e não como um complemento — por isso, a capacidade chegou com o código, não como uma adaptação que qualquer uma das cadeias tivesse de negociar.

O roadmap do Dash declara diretamente a intenção:

> *"Ao contrário dos sistemas de privacidade obrigatória que enfrentaram remoções de listagem em exchanges e obstáculos regulamentares, os Saldos Blindados suportam divulgação seletiva através de view keys — permitindo que utilizadores e empresas partilhem detalhes de transações com auditores ou cumpram requisitos da Travel Rule quando necessário, sem comprometer a privacidade na utilização quotidiana."*

Vale a pena registar duas observações:

**O Dash está a posicionar as viewing keys em torno de um caso de utilização de produção mais concreto do que aquele alcançado pelas próprias ferramentas de Zcash.** As ferramentas de divulgação de pagamentos de Zcash permaneceram em grande parte experimentais e opcionais entre wallets. O Dash disponibiliza view keys como uma funcionalidade de conformidade com casos de utilização identificados, numa cadeia que também oferece liquidação determinística de aproximadamente um segundo e sincronização de wallet de cerca de vinte segundos, segundo o seu próprio anúncio.

**O ponto em aberto é a divergência de compatibilidade, não a capacidade.** Vale a pena acompanhar se a implementação de viewing keys do Dash permanece compatível ao nível do formato wire com o formato de viewing keys de Zcash Orchard, à medida que ambas as cadeias evoluem independentemente. É uma questão de monitorização, e não um projeto de investigação.

---

## Derivação de chaves: Zcash e Dash em comparação

Esta secção responde diretamente à questão do revisor. A resposta curta é que as árvores de chaves *blindadas* são quase idênticas porque o código é partilhado — as diferenças significativas estão na forma como cada cadeia **enraíza** essa árvore no espaço de chaves da sua wallet e no que mais ocupa esse espaço.

### Zcash

Zcash usa [ZIP 32, *Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032), que tem o estado **Final**. Em vez de colocar chaves blindadas numa única árvore BIP 32, a ZIP 32 atribui a cada pool blindado a sua própria chave mestre e o seu próprio caminho:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` é fixado em `32'` (0x80000020) segundo a BIP 43, e `coin_type` segue a SLIP 44, com todas as testnets a partilharem o índice `1`.

Dentro de uma conta Orchard, a hierarquia é estritamente unidirecional — cada nível pode derivar tudo o que está abaixo e nada do que está acima:

| Chave | Pode fazer | Deriva |
|---|---|---|
| Spending key | Gastar notas | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Autorizar gastos | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Ver pagamentos recebidos **e** enviados | IVK, OVK |
| Incoming Viewing Key | Ver apenas pagamentos recebidos | Endereços diversificados |
| Outgoing Viewing Key | Recuperar detalhes de pagamentos enviados | — |
| Diversified address | Receber | — |

Orchard simplificou isto em relação a Sapling: segundo o [Orchard Book](https://zcash.github.io/orchard/design/keys.html), a chave privada de nulificador `nsk` foi removida, `nk` passou a ser um elemento de campo em vez de um ponto de curva, e `ovk` é agora derivada da full viewing key em vez de ser mantida separadamente.

Acima disto encontra-se a [ZIP 316, *Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316) — Revisão 0 Active, Revisão 1 Withdrawn, Revisão 2 Draft — que agrupa chaves por pool numa **Unified Full Viewing Key** ("combina vários Full Viewing Key… Items") e numa **Unified Incoming Viewing Key**. A distinção que um programador de wallet deve respeitar: uma UFVK revela tanto atividade recebida como enviada; uma UIVK, apenas atividade recebida.

### Dash

O Dash enraíza tudo numa árvore BIP 32 convencional, com o tipo de moeda SLIP 44 `5'`, e acrescenta duas extensões próprias de derivação.

A [DIP-0009, *Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) insere um nível de **funcionalidade** que divide o espaço de chaves por função específica da moeda:

```
m / purpose' / coin_type' / feature' / *
```

com `purpose` fixado em `9'` (0x80000009) e `coin_type` em `5'` (0x80000005). A motivação declarada da DIP é o isolamento — *"poderá ser desejável manter fundos misturados num caminho isolado de fundos não misturados."*

A [DIP-0014, *Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md) vai mais longe, ultrapassando o limite de índice de 31 bits da BIP 32 para que os componentes do caminho possam transportar valores completos de 256 bits. Isto permite caminhos derivados de identidade como:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

em que os dois últimos componentes são hashes de identidade de utilizador. Zcash não tem equivalente: a ZIP 32 não tem conceito de derivar um caminho de chave a partir da identidade de outra parte.

### Onde as duas realmente diferem

**A subárvore blindada é a mesma.** As chaves blindadas do Dash são chaves Orchard, porque o pool blindado do Dash é Orchard. Um programador de wallet que transite entre os dois trabalha com a mesma estrutura de chave de gasto para viewing key.

**O enraizamento difere.** Zcash isola cada pool blindado sob a sua própria chave mestre com a finalidade `32'`. O Dash associa a funcionalidade blindada a uma árvore unificada sob a finalidade `9'`, juntamente com todas as outras funcionalidades. A separação de Zcash é por pool criptográfico; a do Dash é por funcionalidade de produto.

**O espaço de chaves do Dash contém algo que o de Zcash não contém: um domínio BLS separado.** As chaves de operador de masternode, as chaves de votação e as chaves de quorum usadas por LLMQs são chaves BLS, não chaves da família Schnorr, e residem inteiramente fora da árvore BIP 32 descrita acima. É precisamente aqui que reside a assinatura de limiar existente do Dash — e precisamente por isso que não se compõe com a autorização de gasto de Orchard, como expõe a próxima secção.

**A derivação associada a identidade é exclusiva do Dash.** Os caminhos de 256 bits da DIP-0014 existem para derivar chaves a partir de relações entre identidades. Trata-se de um conceito do Dash Platform sem equivalente em Zcash, e é o caso mais claro de os dois esquemas de derivação terem divergido intencionalmente, e não por acidente.

*Consulte a Figura 1 para os dois esquemas de enraizamento convergirem numa subárvore Orchard partilhada.*

---

## FROST: a questão genuinamente em aberto

O Dash possui um sistema maduro de assinaturas de limiar em **LLMQs baseados em BLS** (Long-Living Masternode Quorums), utilizado para ChainLocks, InstantSend e consenso de validadores do Dash Platform.

A [ZIP 312, *FROST for Spend Authorization Multisignatures*](https://zips.z.cash/zip-0312), com estado **Draft**, faz algo diferente. Aplica limiares às assinaturas de autorização de gasto baseadas em Schnorr já definidas por Sapling e Orchard — **RedJubjub** e **RedPallas**, respetivamente — para que, no enquadramento da própria ZIP, *"utilizadores e serviços de terceiros que partilham a custódia de uma wallet, ou um grupo de pessoas que gere fundos partilhados"* possam exigir aprovação por limiar, como 2-de-3, antes de um gasto. Está categorizada como uma ZIP de **Wallet**: produz assinaturas compatíveis com a autorização de gasto existente em vez de alterar o consenso. Mantém uma função de Coordenador, que a ZIP recusa explicitamente remover, e discute tanto a geração de chaves por intermediário fidedigno como a geração distribuída de chaves.

A distinção relevante, e a razão pela qual estas não são substitutas:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Esquema de assinatura | BLS | Schnorr — RedJubjub / RedPallas |
| Quem assina | Um quorum de masternodes | Um pequeno grupo de titulares individuais de chaves |
| O que é autorizado | Um facto de rede: um block lock, um transaction lock | Um gasto de uma conta blindada |
| Camada | Consenso | Wallet |
| Espaço de chaves | Domínio BLS separado | A chave de autorização de gasto Orchard/Sapling |
| Estado | Implementado | Draft, sem implementação de referência |

O facto de o Dash ter assinaturas de limiar BLS **não** significa que tenha, ou necessite de, FROST. Mas significa que os engenheiros do Dash têm experiência interna com assinaturas de limiar, geração distribuída de chaves e coordenação de quorums — experiência genuinamente transferível se decidissem desenvolver isto.

*Consulte a Figura 2 para ver o que cada esquema realmente assina.*

### O que FROST no fork Orchard do Dash exigiria, numa primeira análise

1. **Uma cerimónia de DKG e assinatura FROST sobre RedPallas**, o esquema de autorização de gasto de Orchard — uma variante Schnorr sobre a curva Pallas. Isto é distinto da DKG BLS existente do Dash para LLMQs e não é redutível a ela.
2. **Suporte de wallet e UX para assinatura multipartidária de uma única conta blindada**, que constitui um padrão de interação diferente das ferramentas de quorum de masternodes e necessita de um equivalente ao Coordenador.
3. **Uma decisão sobre a camada.** Muito provavelmente apenas ao nível da wallet, uma vez que a ZIP 312 está delimitada como um esquema de wallet sobre primitivas existentes e não como uma alteração de consenso — mas isto precisa de confirmação especificamente no fork Orchard do Dash, e não de ser assumido a partir do âmbito de Zcash.

---

## Recomendação

**Viewing keys — documentar, não investigar.** A capacidade está implementada em ambas as cadeias. Uma breve nota na wiki que registe que o pool blindado do Dash inclui view keys e ligue ao roadmap do Dash evita que o público de ZecHub suponha que ainda é hipotético. Acompanhe a compatibilidade de formato wire à medida que as duas cadeias evoluem.

**FROST — oportunidade real, bloqueada a montante.** Depende de a ZIP 312 alcançar uma implementação de referência ou de o Dash optar por desenvolver em paralelo. ZecHub não pode acelerá-la diretamente.

**O próximo passo de maior valor é uma conversa, não mais investigação documental.** As pessoas que desenvolveriam isto são acessíveis. A Shielded Labs está a conduzir a ZIP 312; a equipa de engenharia do Dash já se envolveu positivamente com o enquadramento "emprestado de Zcash" em torno da integração Orchard. Uma discussão entre comunidades que ligue as duas revelaria mais do que outra ronda de leitura, e esta nota alcançou o limite do que as fontes públicas podem esclarecer.

---

## Figuras

**Figura 1 — Enraizamento da derivação de chaves: Zcash ZIP 32 e Dash DIP-0009/0014, convergindo numa subárvore Orchard partilhada.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Figura 2 — O que cada esquema de limiar assina: um quorum de masternodes que atesta um facto de rede, em comparação com um grupo de titulares de chaves que autoriza um gasto blindado.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Fontes

**Zcash — protocolo**
- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032) — estado Final
- [ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST for Spend Authorization Multisignatures](https://zips.z.cash/zip-0312) — estado Draft
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [The Orchard Book — Chaves e endereços](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) — componentes de chaves, §5.6.4

**Dash — protocolo e anúncios**
- [Shielded transactions are live on the Dash Evolution mainnet](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 de agosto de 2026
- [Dash Is Adding Shielded Transactions to Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 de fevereiro de 2026
- [Dash Roadmap](https://www.dash.org/roadmap/) — Shielded Balances, concluído em julho de 2026, Platform v4.0; atualizado em 12 de setembro de 2026
- [DIP-0009: Feature Derivation Paths](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Extended Key Derivation using 256-bit Unsigned Integers](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Documentação Dash Core — Masternode Quorums (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [repositório dashpay/dips](https://github.com/dashpay/dips)

**Reportagem contemporânea**
- [Dash launches Zcash's Orchard technology in privacy upgrade](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash Brings Zcash Orchard Privacy to Evolution Chain for Shielded Transactions](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Fontes verificadas em 27 de setembro de 2026. O Dash Platform e a ZIP 312 estão ambos em evolução; as figuras e os estados devem ser novamente verificados antes da republicação.*
