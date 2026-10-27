# FROST & Viewing Keys: Nota de pesquisa sobre interoperabilidade entre Zcash/Dash

*Preparado para ZecHub · Revisado em 27 de setembro de 2026 · Todas as alegações têm fontes no texto*

## Resumo executivo

ZecHub levantou esta questão depois de adicionar DASH blindado como opção de doação para a wiki: as chaves de visualização no estilo do Zcash ou as assinaturas de limiar FROST poderiam ser aplicadas ao Dash?

A pesquisa reformulou a questão. As chaves de visualização não são uma questão em aberto — o Dash integrou o [pool blindado Orchard do Zcash](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) à sua chain Evolution, e a hierarquia de chaves do Orchard inclui chaves de visualização por definição. O [roadmap](https://www.dash.org/roadmap/) do próprio Dash as posiciona para divulgação a auditores e conformidade com a Travel Rule. Essa parte está implementada, não é hipotética.

**FROST é onde está a verdadeira lacuna.** O Dash já usa assinaturas de limiar BLS por meio dos [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), mas elas servem ao consenso em nível de rede — ChainLocks e InstantSend. A [ZIP 312](https://zips.z.cash/zip-0312) busca algo diferente: autorização de gasto por limiar em uma única conta blindada mantida por um pequeno grupo de detentores individuais de chaves. As duas não são intercambiáveis. E, como a ZIP 312 continua em **Draft**, não há implementação de referência em nenhuma das chains para adaptar, então isso seria um trabalho novo, independentemente de qual lado o desenvolvesse.

---

## Linha do tempo: por que esta comparação é incomum neste momento

Dois eventos relacionados a pools blindados ocorreram com poucas semanas de diferença, em meados de 2026.

**O Zcash deixou o Orchard.** O pesquisador Taylor Hornby divulgou uma vulnerabilidade no circuito do Orchard que poderia ser explorada para inflacionar a oferta de maneira indetectável. O Zcash respondeu ativando o **Ironwood (NU6.3)** em **28 de julho de 2026**, introduzindo um novo pool blindado com um mecanismo de migração por catraca.

**O Dash adotou o Orchard.** O Dash anunciou o plano em [19 de fevereiro de 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — *"Esperamos poder lançar transferências blindadas em breve, naturalmente pendentes de auditorias de segurança e revisão adicional do código."* O [roadmap](https://www.dash.org/roadmap/) do Dash registra os Shielded Balances como **concluídos em julho de 2026** com o Dash Platform **v4.0**, e o Dash publicou [*"Shielded transactions are live on the Dash Evolution mainnet"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) em **4 de agosto de 2026**.

> **Uma observação sobre a ordem.** Algumas coberturas situaram a ativação da mainnet do Dash em 17 de julho de 2026, o que a colocaria antes do Ironwood. Essa data parece ter origem em reportagens sobre o anúncio, e não em uma ativação. Nas fontes do próprio Dash, o recurso foi concluído em julho e anunciado como ativo em 4 de agosto — depois do Ironwood. As duas chains se cruzaram no intervalo de algumas semanas; a ordem exata depende de qual marco é considerado, e esta nota não afirma uma.

Fundamentalmente, o Dash não herdou o bug. Seu anúncio é explícito: *"implementamos a versão do Orchard sem um bug de inflação conhecido. A versão anterior continha um bug que poderia ser explorado para inflacionar de maneira indetectável a oferta do Zcash."*

Assim, o Dash agora executa um fork corrigido da criptografia que o próprio Zcash abandonou na camada base, enquanto o pool de próxima geração do Zcash (Ironwood) e o esquema de autorização de gasto de próxima geração (FROST) estão, respectivamente, recém-ativos e ainda em Draft.

---

## Chaves de visualização: implementadas, não uma lacuna de pesquisa

O pool blindado do Dash é o [Orchard](https://zips.z.cash/zip-0224), construído sobre zk-SNARKs Halo 2 que não exigem configuração confiável. A hierarquia de chaves do Orchard sempre incluiu Full Viewing Keys e Incoming Viewing Keys como parte de seu design, e não como um complemento — portanto, a capacidade chegou com o código, não como uma adaptação que qualquer uma das chains precisasse negociar.

O roadmap do Dash declara a intenção diretamente:

> *"Ao contrário dos sistemas de privacidade obrigatória que enfrentaram remoções de listagem em corretoras e entraves regulatórios, os Shielded Balances oferecem suporte à divulgação seletiva por meio de chaves de visualização — permitindo que usuários e empresas compartilhem detalhes de transações com auditores ou cumpram os requisitos da Travel Rule quando necessário, sem comprometer a privacidade no uso cotidiano."*

Vale registrar duas observações:

**O Dash está posicionando as chaves de visualização em torno de um caso de uso de produção mais concreto do que o alcançado pelas próprias ferramentas do Zcash.** As ferramentas de divulgação de pagamentos do Zcash permaneceram em grande parte experimentais e opcionais nas carteiras. O Dash disponibiliza chaves de visualização como um recurso de conformidade com casos de uso nomeados, em uma chain que também oferece liquidação determinística de aproximadamente um segundo e sincronização de carteira de cerca de vinte segundos, segundo seu próprio anúncio.

**O ponto em aberto é a divergência de compatibilidade, não a capacidade.** Vale acompanhar se a implementação de chaves de visualização do Dash permanece compatível em nível de formato wire com o formato de chaves de visualização do Orchard do Zcash, à medida que ambas as chains evoluem de forma independente. É uma questão de monitoramento, e não um projeto de pesquisa.

---

## Derivação de chaves: Zcash e Dash em comparação

Esta seção responde diretamente à pergunta do revisor. A resposta curta é que as árvores de chaves *blindadas* são quase idênticas porque o código é compartilhado — as diferenças significativas estão em como cada chain **enraíza** essa árvore em seu espaço de chaves de carteira e no que mais ocupa esse espaço.

### Zcash

O Zcash usa a [ZIP 32, *Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032), que tem status **Final**. Em vez de colocar chaves blindadas em uma única árvore BIP 32, a ZIP 32 dá a cada pool blindado sua própria chave mestre e seu próprio caminho:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` é fixado em `32'` (0x80000020) conforme a BIP 43, e `coin_type` segue a SLIP 44, com todas as testnets compartilhando o índice `1`.

Dentro de uma conta Orchard, a hierarquia é estritamente unidirecional — cada nível pode derivar tudo que está abaixo dele e nada que está acima:

| Chave | Pode fazer | Deriva |
|---|---|---|
| Spending key | Gastar notes | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Autorizar gastos | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Ver pagamentos recebidos **e** enviados | IVK, OVK |
| Incoming Viewing Key | Ver apenas pagamentos recebidos | Endereços diversificados |
| Outgoing Viewing Key | Recuperar detalhes de pagamentos enviados | — |
| Diversified address | Receber | — |

O Orchard simplificou isso em relação ao Sapling: segundo o [Orchard Book](https://zcash.github.io/orchard/design/keys.html), a chave privada de nulificador `nsk` foi removida, `nk` passou a ser um elemento de campo em vez de um ponto de curva, e `ovk` agora é derivada da chave de visualização completa em vez de ser mantida separadamente.

Acima disso está a [ZIP 316, *Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316) — Revisão 0 Active, Revisão 1 Withdrawn, Revisão 2 Draft — que agrupa chaves por pool em uma **Unified Full Viewing Key** ("combina múltiplos itens de Full Viewing Key…") e uma **Unified Incoming Viewing Key**. A distinção que um desenvolvedor de carteira deve respeitar: uma UFVK revela atividade recebida e enviada; uma UIVK revela apenas atividade recebida.

### Dash

O Dash enraíza tudo em uma árvore BIP 32 convencional, com o tipo de moeda SLIP 44 `5'`, e adiciona duas extensões de derivação próprias.

A [DIP-0009, *Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) insere um nível de **recurso** que divide o espaço de chaves por função específica da moeda:

```
m / purpose' / coin_type' / feature' / *
```

com `purpose` fixado em `9'` (0x80000009) e `coin_type` em `5'` (0x80000005). A motivação declarada da DIP é o isolamento — *"pode ser desejável manter fundos misturados em um caminho isolado de fundos não misturados."*

A [DIP-0014, *Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md) vai além, superando o limite de índice de 31 bits da BIP 32 para que os componentes do caminho possam transportar valores completos de 256 bits. Isso permite caminhos derivados de identidade, como:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

em que os dois últimos componentes são hashes de identidade de usuário. O Zcash não tem equivalente: a ZIP 32 não tem o conceito de derivar um caminho de chave a partir da identidade de outra parte.

### Onde as duas realmente diferem

**A subárvore blindada é a mesma.** As chaves blindadas do Dash são chaves Orchard, porque o pool blindado do Dash é o Orchard. Um desenvolvedor de carteira que transita entre os dois trabalha com a mesma estrutura de chave de gastos para chave de visualização.

**O enraizamento difere.** O Zcash isola cada pool blindado sob sua própria chave mestre com a finalidade `32'`. O Dash vincula o recurso blindado a uma árvore unificada sob a finalidade `9'`, junto de todos os outros recursos. A separação do Zcash é por pool criptográfico; a do Dash é por recurso do produto.

**O espaço de chaves do Dash contém algo que o do Zcash não contém: um domínio BLS separado.** As chaves de operador de masternode, as chaves de votação e as chaves de quorum usadas por LLMQs são chaves BLS, não chaves da família Schnorr, e ficam inteiramente fora da árvore BIP 32 descrita acima. É precisamente onde está a assinatura de limiar existente do Dash — e precisamente por isso ela não se combina com a autorização de gasto do Orchard, como explica a próxima seção.

**A derivação vinculada à identidade é exclusiva do Dash.** Os caminhos de 256 bits da DIP-0014 existem para derivar chaves a partir de relações entre identidades. Esse é um conceito do Dash Platform sem equivalente no Zcash, e é o caso mais claro de os dois esquemas de derivação terem divergido intencionalmente, e não por acidente.

*Consulte a Figura 1 para ver os dois esquemas de enraizamento convergindo em uma subárvore Orchard compartilhada.*

---

## FROST: a questão genuinamente em aberto

O Dash tem um sistema maduro de assinaturas de limiar em **LLMQs baseados em BLS** (Long-Living Masternode Quorums), usado para ChainLocks, InstantSend e consenso de validadores do Dash Platform.

A [ZIP 312, *FROST for Spend Authorization Multisignatures*](https://zips.z.cash/zip-0312), com status **Draft**, faz algo diferente. Ela aplica limiar às assinaturas de autorização de gasto baseadas em Schnorr já definidas pelo Sapling e pelo Orchard — **RedJubjub** e **RedPallas**, respectivamente — para que, na formulação da própria ZIP, *"usuários e serviços de terceiros que compartilham a custódia de uma carteira, ou um grupo de pessoas que gerencia fundos compartilhados"* possam exigir aprovação por limiar, como 2-de-3, antes de um gasto. Ela é categorizada como uma ZIP de **Wallet**: produz assinaturas compatíveis com a autorização de gasto existente em vez de alterar o consenso. Mantém uma função de Coordenador, que a ZIP explicitamente se recusa a remover, e discute tanto a geração de chaves por intermediário confiável quanto a geração distribuída de chaves.

A distinção que importa, e a razão pela qual elas não são substitutas:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Esquema de assinatura | BLS | Schnorr — RedJubjub / RedPallas |
| Quem assina | Um quorum de masternodes | Um pequeno grupo de detentores individuais de chaves |
| O que é autorizado | Um fato de rede: um block lock, um transaction lock | Um gasto de uma conta blindada |
| Camada | Consenso | Wallet |
| Espaço de chaves | Domínio BLS separado | A chave de autorização de gasto do Orchard/Sapling |
| Estado | Implementado | Draft, sem implementação de referência |

O fato de o Dash ter assinaturas de limiar BLS **não** significa que ele tenha, ou precise de, FROST. Mas significa que os engenheiros do Dash têm experiência interna com assinaturas de limiar, geração distribuída de chaves e coordenação de quorums — experiência genuinamente transferível se decidirem desenvolver isso.

*Consulte a Figura 2 para ver o que cada esquema realmente assina.*

### O que o FROST no fork Orchard do Dash exigiria, em uma primeira análise

1. **Uma cerimônia de DKG e assinatura FROST sobre RedPallas**, o esquema de autorização de gasto do Orchard — uma variante de Schnorr sobre a curva Pallas. Isso é separado da DKG BLS existente do Dash para LLMQs e não pode ser reduzido a ela.
2. **Suporte de carteira e UX para assinatura multipartidária de uma única conta blindada**, que é um padrão de interação diferente das ferramentas de quorum de masternodes e precisa de um equivalente ao Coordenador.
3. **Uma decisão sobre a camada.** Muito provavelmente apenas no nível da carteira, já que a ZIP 312 é delimitada como um esquema de carteira sobre primitivas existentes, e não como uma mudança de consenso — mas isso precisa ser confirmado especificamente no fork Orchard do Dash, e não pressuposto a partir do escopo do Zcash.

---

## Recomendação

**Chaves de visualização — documente, não pesquise.** A capacidade está implementada em ambas as chains. Uma breve nota na wiki que registre que o pool blindado do Dash inclui chaves de visualização e faça um link para o roadmap do Dash evita que o público do ZecHub suponha que isso ainda é hipotético. Acompanhe a compatibilidade do formato wire à medida que as duas chains evoluem.

**FROST — oportunidade real, bloqueada upstream.** Depende de a ZIP 312 alcançar uma implementação de referência, ou de o Dash escolher desenvolver em paralelo. O ZecHub não pode acelerá-la diretamente.

**O próximo passo de maior valor é uma conversa, não mais pesquisa documental.** As pessoas que desenvolveriam isso são acessíveis. A Shielded Labs está conduzindo a ZIP 312; a equipe de engenharia do Dash já se envolveu positivamente com a formulação "emprestado do Zcash" em torno da integração do Orchard. Uma discussão entre comunidades conectando as duas revelaria mais do que outra rodada de leitura, e esta nota alcançou o limite do que fontes públicas podem esclarecer.

---

## Figuras

**Figura 1 — Enraizamento da derivação de chaves: Zcash ZIP 32 e Dash DIP-0009/0014, convergindo em uma subárvore Orchard compartilhada.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Figura 2 — O que cada esquema de limiar assina: um quorum de masternodes atestando um fato de rede, em comparação com um grupo de detentores de chaves autorizando um gasto blindado.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Fontes

**Zcash — protocolo**
- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032) — status Final
- [ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST for Spend Authorization Multisignatures](https://zips.z.cash/zip-0312) — status Draft
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [The Orchard Book — Keys and addresses](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) — componentes de chaves, §5.6.4

**Dash — protocolo e anúncios**
- [Shielded transactions are live on the Dash Evolution mainnet](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 de agosto de 2026
- [Dash Is Adding Shielded Transactions to Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 de fevereiro de 2026
- [Dash Roadmap](https://www.dash.org/roadmap/) — Shielded Balances, concluído em julho de 2026, Platform v4.0; atualizado em 12 de setembro de 2026
- [DIP-0009: Feature Derivation Paths](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Extended Key Derivation using 256-bit Unsigned Integers](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Documentação do Dash Core — Masternode Quorums (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [repositório dashpay/dips](https://github.com/dashpay/dips)

**Reportagem contemporânea**
- [Dash launches Zcash's Orchard technology in privacy upgrade](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash Brings Zcash Orchard Privacy to Evolution Chain for Shielded Transactions](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Fontes verificadas em 27 de setembro de 2026. O Dash Platform e a ZIP 312 estão ambos em evolução; os números e os status devem ser verificados novamente antes da republicação.*
