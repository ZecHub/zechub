# FROST & chaves de visualização: relatório de pesquisa sobre interoperabilidade Zcash/Dash

*Preparado para ZecHub · Revisado em 27 de setembro de 2026 · Todas as afirmações com fontes no texto*

## Resumo executivo

ZecHub levantou esta questão depois de adicionar DASH blindado como opção de doação para o wiki: as chaves de visualização no estilo Zcash, ou as assinaturas de limiar FROST, poderiam ser levadas para o Dash?

A pesquisa mudou o enquadramento da questão. As chaves de visualização não são uma questão em aberto: o Dash incorporou o pool blindado [Zcash Orchard](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) na sua chain Evolution, e a hierarquia de chaves do Orchard inclui chaves de visualização por construção. O próprio [roadmap](https://www.dash.org/roadmap/) do Dash as posiciona para divulgação a auditores e conformidade com a Travel Rule. Essa metade já está implantada, não é hipotética.

**É no FROST que está a lacuna real.** O Dash já executa assinaturas de limiar BLS por meio de [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), mas elas servem ao consenso no nível da rede: ChainLocks e InstantSend. O [ZIP 312](https://zips.z.cash/zip-0312) tem outro objetivo: a autorização de gastos por limiar sobre uma única conta blindada mantida por um pequeno grupo de detentores de chaves individuais. As duas coisas não são intercambiáveis. E, como o ZIP 312 continua em **Draft**, não existe implementação de referência em nenhuma das chains para portar, então seria um trabalho inédito, qualquer que fosse o lado a desenvolvê-lo.

---

## Linha do tempo: por que esta comparação é incomum neste momento

Dois eventos envolvendo pools blindados aconteceram com poucas semanas de diferença em meados de 2026.

**O Zcash deixou o Orchard.** O pesquisador Taylor Hornby divulgou uma vulnerabilidade de circuito no Orchard que poderia ser explorada para inflar a oferta sem ser detectada. O Zcash respondeu ativando o **Ironwood (NU6.3)** em **28 de julho de 2026**, introduzindo um novo pool blindado com um mecanismo de migração por catraca.

**O Dash passou a usar o Orchard.** O Dash anunciou o plano em [19 de fevereiro de 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/): *"Esperamos poder lançar transferências blindadas em breve, naturalmente dependendo de auditorias de segurança e de mais revisão de código."* O [roadmap](https://www.dash.org/roadmap/) do Dash registra os Shielded Balances como **concluídos em julho de 2026** com a Platform **v4.0** do Dash, e o Dash publicou [*"As transações blindadas estão ativas na mainnet do Dash Evolution"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) em **4 de agosto de 2026**.

> **Uma observação sobre a ordem dos eventos.** Algumas reportagens situaram a ativação na mainnet do Dash em 17 de julho de 2026, o que a colocaria antes do Ironwood. Essa data parece vir da cobertura da imprensa sobre o anúncio, e não de uma ativação. Segundo as próprias fontes do Dash, o recurso foi concluído em julho e anunciado como ativo em 4 de agosto, depois do Ironwood. As duas chains se cruzaram em poucas semanas. A ordem exata depende de qual marco é considerado, e este relatório não afirma nenhuma delas.

O ponto crucial é que o Dash não herdou o bug. O anúncio deles é explícito: *"implementamos a versão do Orchard sem um bug de inflação conhecido. A versão anterior continha um bug que poderia ser explorado para inflar a oferta do Zcash sem ser detectado."*

Portanto, o Dash agora roda um fork corrigido da criptografia que o próprio Zcash abandonou na camada base, enquanto o pool de nova geração do Zcash (Ironwood) e o esquema de autorização de gastos de nova geração (FROST) estão, respectivamente, recém-ativados e ainda em Draft.

---

## Chaves de visualização: implantadas, não uma lacuna de pesquisa

O pool blindado do Dash é o [Orchard](https://zips.z.cash/zip-0224), construído sobre o Halo 2 zk-SNARKs, que não exige configuração confiável. A hierarquia de chaves do Orchard sempre incluiu Full Viewing Keys e Incoming Viewing Keys como parte do seu design, e não como um complemento. Assim, o recurso chegou junto com o código, e não como uma portabilidade que alguma das chains precisou negociar.

O roadmap do Dash declara a intenção diretamente:

> *"Ao contrário dos sistemas de privacidade obrigatória, que enfrentaram deslistagens em corretoras e atritos regulatórios, os Shielded Balances oferecem divulgação seletiva por meio de chaves de visualização, permitindo que usuários e empresas compartilhem detalhes de transações com auditores ou cumpram os requisitos da Travel Rule quando necessário, sem comprometer a privacidade no uso cotidiano."*

Vale registrar duas observações:

**O Dash está posicionando as chaves de visualização em torno de um caso de uso em produção mais concreto do que o alcançado pelas ferramentas do próprio Zcash.** As ferramentas de divulgação de pagamentos do Zcash continuam em grande parte experimentais e opcionais nas diversas carteiras. O Dash está lançando as chaves de visualização como um recurso de conformidade, com casos de uso definidos, em uma chain que também oferece liquidação determinística em cerca de um segundo e sincronização de carteira em cerca de vinte segundos, segundo o próprio anúncio.

**O ponto em aberto é a divergência de compatibilidade, não a capacidade.** Vale acompanhar se a implementação de chaves de visualização do Dash continuará compatível no formato de transmissão com o formato de chave de visualização Orchard do Zcash, à medida que as duas chains evoluem de forma independente. Trata-se de uma questão de monitoramento, e não de um projeto de pesquisa.

---

## Derivação de chaves: comparação entre Zcash e Dash

Esta seção responde diretamente à pergunta do revisor. A resposta curta é que as árvores de chaves *blindadas* são quase idênticas porque o código é compartilhado. As diferenças relevantes estão em como cada chain **enraíza** essa árvore no espaço de chaves da sua carteira, e no que mais ocupa esse espaço.

### Zcash

O Zcash usa o [ZIP 32, *Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032), que tem status **Final**. Em vez de colocar as chaves blindadas dentro de uma única árvore BIP 32, o ZIP 32 dá a cada pool blindado sua própria chave mestra e seu próprio caminho:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

O `purpose` é fixado em `32'` (0x80000020) conforme o BIP 43, e o `coin_type` segue o SLIP 44, com todas as testnets compartilhando o índice `1`.

Dentro de uma conta Orchard, a hierarquia é estritamente unidirecional: cada nível pode derivar tudo o que está abaixo dele e nada acima:

| Chave | O que pode fazer | Deriva |
|---|---|---|
| Spending key | Gastar notes | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Autorizar gastos | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Ver pagamentos recebidos **e** enviados | IVK, OVK |
| Incoming Viewing Key | Ver apenas pagamentos recebidos | Endereços diversificados |
| Outgoing Viewing Key | Recuperar detalhes de pagamentos enviados | — |
| Diversified address | Receber | — |

O Orchard simplificou isso em relação ao Sapling: segundo o [Orchard Book](https://zcash.github.io/orchard/design/keys.html), a chave privada do nulificador `nsk` foi removida, `nk` passou a ser um elemento de corpo em vez de um ponto de curva, e `ovk` agora é derivado da chave de visualização completa em vez de ser mantido separadamente.

Acima disso está o [ZIP 316, *Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316) (Revisão 0 Active, Revisão 1 Withdrawn, Revisão 2 Draft), que agrupa as chaves de cada pool em um **Unified Full Viewing Key** ("combina múltiplos Full Viewing Key… Items") e um **Unified Incoming Viewing Key**. A distinção que um desenvolvedor de carteira precisa respeitar: uma UFVK revela tanto a atividade de entrada quanto a de saída, enquanto uma UIVK revela apenas a de entrada.

### Dash

O Dash enraíza tudo em uma árvore BIP 32 convencional, com o coin type `5'` do SLIP 44, e acrescenta duas extensões de derivação próprias.

O [DIP-0009, *Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) insere um nível de **feature** que particiona o espaço de chaves por função específica da moeda:

```
m / purpose' / coin_type' / feature' / *
```

com `purpose` fixado em `9'` (0x80000009) e `coin_type` em `5'` (0x80000005). A motivação declarada do DIP é o isolamento: *"pode ser desejável manter fundos misturados em um caminho isolado dos fundos não misturados."*

O [DIP-0014, *Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md) vai além, eliminando o limite de índice de 31 bits do BIP 32 para que os componentes do caminho possam conter valores completos de 256 bits. Isso permite caminhos derivados de identidade, como:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

onde os dois últimos componentes são hashes de identidade de usuários. O Zcash não tem nada análogo: o ZIP 32 não tem o conceito de derivar um caminho de chave a partir da identidade de outra parte.

### Onde as duas realmente diferem

**A subárvore blindada é a mesma.** As chaves blindadas do Dash são chaves Orchard, porque o pool blindado do Dash é o Orchard. Um desenvolvedor de carteira que transite entre as duas trabalha com a mesma estrutura de chave de gastos a chave de visualização.

**O enraizamento é diferente.** O Zcash isola cada pool blindado sob sua própria chave mestra, com purpose `32'`. O Dash pendura a feature blindada em uma única árvore unificada sob o purpose `9'`, ao lado de todas as outras features. A separação do Zcash é por pool criptográfico; a do Dash é por funcionalidade do produto.

**O espaço de chaves do Dash contém algo que o do Zcash não tem: um domínio BLS separado.** As chaves de operador de masternode, as chaves de votação e as chaves de quórum usadas pelos LLMQs são chaves BLS, não chaves da família Schnorr, e ficam totalmente fora da árvore BIP 32 descrita acima. É exatamente aí que vive a assinatura de limiar já existente do Dash, e é exatamente por isso que ela não se combina com a autorização de gastos do Orchard, como mostra a próxima seção.

**A derivação vinculada a identidades existe apenas no Dash.** Os caminhos de 256 bits do DIP-0014 existem para derivar chaves a partir de relações entre identidades. Esse é um conceito da Platform do Dash sem equivalente no Zcash, e é o caso mais claro em que os dois esquemas de derivação divergiram de propósito, e não por acaso.

*Veja a Figura 1 para os dois esquemas de enraizamento convergindo em uma subárvore Orchard compartilhada.*

---

## FROST: a questão realmente em aberto

O Dash tem um sistema maduro de assinaturas de limiar nos **LLMQs baseados em BLS** (Long-Living Masternode Quorums), usados para ChainLocks, InstantSend e para o consenso dos validadores da Platform do Dash.

O [ZIP 312, *FROST for Spend Authorization Multisignatures*](https://zips.z.cash/zip-0312), com status **Draft**, faz outra coisa. Ele transforma em esquemas de limiar as assinaturas de autorização de gastos baseadas em Schnorr já definidas pelo Sapling e pelo Orchard (**RedJubjub** e **RedPallas**, respectivamente), de modo que, nas palavras do próprio ZIP, *"usuários e serviços de terceiros que compartilham a custódia de uma carteira, ou um grupo de pessoas que administra fundos compartilhados"* possam exigir aprovação por limiar, como 2 de 3, antes de um gasto. Ele é classificado como um ZIP da categoria **Carteira**: produz assinaturas compatíveis com a autorização de gastos existente, em vez de alterar o consenso. Ele mantém o papel de Coordenador, que o ZIP explicitamente se recusa a remover, e discute tanto a geração de chaves por um dealer confiável quanto a geração distribuída de chaves.

A distinção que importa, e o motivo pelo qual um não substitui o outro:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Esquema de assinatura | BLS | Schnorr — RedJubjub / RedPallas |
| Quem assina | Um quórum de masternodes | Um pequeno grupo de detentores de chaves individuais |
| O que é autorizado | Um fato da rede: um bloqueio de bloco, um bloqueio de transação | Um gasto a partir de uma conta blindada |
| Camada | Consenso | Carteira |
| Espaço de chaves | Domínio BLS separado | A chave de autorização de gastos Orchard/Sapling |
| Status | Implantado | Draft, sem implementação de referência |

O fato de o Dash ter assinaturas de limiar BLS **não** significa que ele tenha, ou precise de, FROST. Mas significa que os engenheiros do Dash têm familiaridade interna com assinatura por limiar, geração distribuída de chaves e coordenação de quóruns, uma experiência real e transferível caso decidam desenvolver isso.

*Veja a Figura 2 para o que cada esquema efetivamente assina.*

### O que FROST no fork Orchard do Dash exigiria, numa primeira análise

1. **Uma cerimônia de DKG e assinatura FROST sobre RedPallas**, o esquema de autorização de gastos do Orchard, uma variante de Schnorr sobre a curva Pallas. Isso é separado do DKG BLS já existente do Dash para os LLMQs, e não pode ser reduzido a ele.
2. **Suporte de carteira e de UX para assinatura multiparte de uma única conta blindada**, um padrão de interação diferente das ferramentas de quórum de masternodes, que precisa de um equivalente ao Coordenador.
3. **Uma decisão sobre a camada.** O mais provável é que seja apenas no nível da carteira, já que o ZIP 312 é definido como um esquema de carteira sobre primitivas existentes, e não como uma mudança de consenso. Mas isso precisa ser confirmado especificamente para o fork Orchard do Dash, e não presumido a partir do escopo do Zcash.

---

## Recomendação

**Chaves de visualização: documentar, não pesquisar.** O recurso já foi lançado nas duas chains. Uma breve nota no wiki registrando que o pool blindado do Dash inclui chaves de visualização, com link para o roadmap do Dash, evita que o público do ZecHub presuma que isso ainda é hipotético. Acompanhe a compatibilidade do formato de transmissão à medida que as duas chains evoluem.

**FROST: oportunidade real, bloqueada na origem.** Depende de o ZIP 312 chegar a uma implementação de referência, ou de o Dash decidir desenvolver em paralelo. O ZecHub não pode acelerar isso diretamente.

**O próximo passo de maior valor é uma conversa, não mais pesquisa documental.** As pessoas que desenvolveriam isso estão acessíveis. A Shielded Labs está conduzindo o ZIP 312; a equipe de engenharia do Dash já reagiu positivamente ao enquadramento "emprestado do Zcash" em torno da integração do Orchard. Uma conversa entre as duas comunidades traria mais à tona do que outra rodada de leitura, e este relatório chegou ao limite do que as fontes públicas conseguem esclarecer.

---

## Figuras

**Figura 1 — Enraizamento da derivação de chaves: Zcash ZIP 32 e Dash DIP-0009/0014, convergindo em uma subárvore Orchard compartilhada.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Figura 2 — O que cada esquema de limiar assina: um quórum de masternodes atestando um fato da rede, comparado a um grupo de detentores de chaves autorizando um gasto blindado.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Fontes

**Zcash — protocolo**
- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032) — status Final
- [ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST for Spend Authorization Multisignatures](https://zips.z.cash/zip-0312) — status Draft
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [The Orchard Book — Chaves e endereços](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) — componentes de chave, §5.6.4

**Dash — protocolo e anúncios**
- [As transações blindadas estão ativas na mainnet do Dash Evolution](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 de agosto de 2026
- [O Dash está adicionando transações blindadas ao Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 de fevereiro de 2026
- [Roadmap do Dash](https://www.dash.org/roadmap/) — Shielded Balances, concluído em julho de 2026, Platform v4.0; atualizado em 12 de setembro de 2026
- [DIP-0009: Feature Derivation Paths](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Extended Key Derivation using 256-bit Unsigned Integers](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Documentação do Dash Core — Masternode Quorums (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [Repositório dashpay/dips](https://github.com/dashpay/dips)

**Reportagens da época**
- [O Dash lança a tecnologia Orchard do Zcash em atualização de privacidade](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [O Dash leva a privacidade Orchard do Zcash à chain Evolution para transações blindadas](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Fontes verificadas em 27 de setembro de 2026. A Platform do Dash e o ZIP 312 estão ambos em evolução; números e status devem ser verificados novamente antes de uma nova publicação.*
