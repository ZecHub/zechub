# Visão Geral do Financiamento e da Governança do Zcash

O modelo de financiamento on-chain do Zcash, a mecânica das recompensas de bloco e os papéis das principais organizações

## 1. Como Funcionam as Recompensas de Bloco do Zcash

Zcash é uma criptomoeda Proof-of-Work. Cada bloco minerado distribui seu **subsídio de bloco** (o ZEC recém-criado) mais as taxas de transação de acordo com uma regra fixa do protocolo definida pelas atualizações de rede.

- **Modelo atual (pós-NU6 / a partir de novembro de 2024)**  
  Em abril de 2026, a distribuição é:

| Destinatário                   | Percentual | O que financia / status                                      |
|--------------------------------|------------|--------------------------------------------------------------|
| Mineradores                    | 80%        | Recompensa direta de bloco para os mineradores               |
| Zcash Community Grants (ZCG)   | 8%         | Subsídios comunitários (continua até ~2028)                  |
| Lockbox (controlado pelo protocolo) | 12%   | Os fundos se acumulam; ainda não há mecanismo de gasto; será necessária futura votação da comunidade |

- **Fundo histórico de desenvolvimento pré-NU6 (2020-nov 2024)**  
  20% de cada subsídio de bloco iam diretamente para organizações de desenvolvimento:

  - 7% -> Electric Coin Company (ECC) / Bootstrap Project  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

Esse "dev fund" de 20% foi substituído pelo modelo de 8% para ZCG + 12% para lockbox por meio da [ZIP 1015](https://zips.z.cash/zip-1015).

### Evolução Proposta: ZIP 1016 - Modelo de Financiamento da Comunidade e dos Detentores de Moedas
A ZIP 1016 (proposta em fevereiro de 2025, status: Proposed) introduz um modelo de financiamento mais descentralizado. Ela iria:
- Continuar a alocação de 8% para ZCG.
- Converter os 12% da lockbox em um "Coinholder-Controlled Fund" (alimentado pelos fundos existentes da lockbox + subsídio contínuo de 12% do bloco).
- Ativar esse modelo até o terceiro halving (aproximadamente 3 anos).
- Dar poder aos detentores de ZEC para votar trimestralmente em subsídios por meio de um processo definido pela comunidade (maioria simples, quórum mínimo de 420,000 ZEC).
- Exigir que as Key-Holder Organizations (atualmente incluindo ZF e Shielded Labs, com Bootstrap/ECC mencionada em contextos de subsídios) administrem os desembolsos via multisig, vinculadas por acordos legais e pelas decisões dos detentores de moedas.
- Manter todos os requisitos da ZIP 1015 sobre o uso da lockbox (financiamento de subsídios para o ecossistema).

Essa proposta busca mudar o controle da alocação de 12% de um modelo controlado por organizações para uma governança direta pelos detentores de moedas. Ela não altera o processo ZIP nem as regras de marca registrada.

## 2. As Organizações Centrais e Suas Fontes de Financiamento

**Electric Coin Company (ECC) / Bootstrap Project**  
- Criadores originais do Zcash (2016).  
- Historicamente recebeu ~7% do dev fund até novembro de 2024.  
- Em janeiro de 2026, a equipe principal de engenharia e produto se desligou da Bootstrap/ECC devido a disputas de governança e formou a Zcash Open Development Lab (ZODL).  
- ECC/Bootstrap não recebe mais financiamento direto do protocolo e não emprega mais a equipe principal de desenvolvimento. Depende de doações, patrocínios e de seu próprio tesouro.  
- Tem importância histórica, mas não é mais a organização ativa de desenvolvimento do protocolo.  
-> Veja o perfil completo: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- Formada em janeiro de 2026 pelos desenvolvedores originais do protocolo Zcash (a equipe principal de engenharia e produto da ECC) após deixarem a Bootstrap/ECC.  
- Captou mais de $25 milhões em financiamento seed de grandes investidores, incluindo a16z Crypto e Coinbase Ventures.  
- A equipe, composta pelos inventores e desenvolvedores originais do protocolo Zcash, continua o desenvolvimento central do protocolo, as contribuições para ZIP e as ferramentas focadas em privacidade, incluindo a carteira móvel Zodl (renomeada a partir da Zashi).  
- Sem financiamento direto on-chain do protocolo; opera como um laboratório independente apoiado por capital de risco, focado em avançar a infraestrutura de privacidade do Zcash.  
-> Veja o perfil completo: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> Site oficial: [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- Organização sem fins lucrativos independente 501(c)(3), focada em infraestrutura, software de nó, pesquisa e saúde do ecossistema.  
- Historicamente recebeu 5% do dev fund.  
- Não recebe mais financiamento direto do protocolo após a NU6. Depende de doações e subsídios.  
- Detém a marca registrada Zcash (doada pela ECC em 2019) e desempenha um papel central na governança.  
- Administra o Zcash Community Advisory Panel (ZCAP) e ajuda a facilitar consultas comunitárias.  
- Atua como uma Key-Holder Organization sob a ZIP 1016 proposta.  
-> Veja o perfil completo: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> Site oficial: [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- O programa Zcash Community Grants financia equipes e projetos independentes para realizar desenvolvimento contínuo relevante e outros trabalhos para o bem público do ecossistema Zcash.  
- Os subsídios são decididos por um comitê eleito pela comunidade.  
- Continua a receber os 8% integrais das recompensas de bloco (pós-NU6), administrados por meio da Financial Privacy Foundation.  
- Os subsídios são concedidos por meio de um processo transparente de candidatura e votação aberto à comunidade.  
-> Veja o perfil completo: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> Site oficial: [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- Uma organização sem fins lucrativos incorporada nas Ilhas Cayman.  
- Recebe diretamente do protocolo a alocação de 8% do subsídio de bloco (conforme a ZIP 1015) e cuida de toda a administração jurídica, financeira e operacional do programa Zcash Community Grants.  
- Fornece a estrutura guarda-chuva e o suporte administrativo para as operações da ZCG, incluindo desembolso, contratos e conformidade.  
- A ZCG opera como uma entidade autônoma eleita pela comunidade sob a estrutura da FPF.  
-> Veja o perfil completo: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> Site oficial: [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- Organização independente de apoio ao Zcash, financiada por doações e sediada na Suíça.  
- A primeira organização no ecossistema Zcash que nunca recebeu financiamento direto nem indireto do Development Fund ou das recompensas de bloco.  
- Foca em iniciativas que beneficiam os detentores de ZEC e prioriza a voz dos detentores na definição da direção do Zcash.  
- Atua como uma Key-Holder Organization sob a ZIP 1016 proposta para a administração do Coinholder-Controlled Fund.  
- Contribui para o desenvolvimento do protocolo, o processo ZIP e a governança (representação entre os editores de ZIP).  
-> Veja o perfil completo: [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> Site oficial: [shieldedlabs.net](https://shieldedlabs.net/)

## 3. Governança - Como as Decisões São Tomadas

A governança do Zcash é uma combinação de "regras de protocolo on-chain" e "consenso social off-chain":

1. **Processo ZIP (Zcash Improvement Proposals)**  
   - Qualquer pessoa pode submeter uma ZIP.  
   - Debate público em fóruns, Discord e GitHub.  
   - Os Editores de ZIP (atualmente Jack Grigg, Daira-Emma Hopwood, Kris Nuttycombe em caráter individual, Arya da ZF e representantes da Shielded Labs) analisam e decidem a aceitação.  
   - As ZIPs aceitas são incluídas na próxima atualização de rede.

2. **Acordo de Marca Registrada (2019-2024)**  
   - A ECC doou a marca registrada Zcash para a ZF em 2019.  
   - O acordo originalmente exigia consentimento mútuo tanto da ECC quanto da ZF para qualquer atualização de rede que criasse um novo protocolo de consenso.  
   - Em abril de 2024, a ECC anunciou a intenção de encerrar o acordo; a notificação formal de encerramento foi emitida em agosto de 2024.  
   - Em 2025, a ZF é a única guardiã da marca registrada Zcash e adotou uma nova política permissiva de marca registrada que reflete a descentralização do ecossistema. A marca registrada não funciona mais como mecanismo de veto de governança.

3. **Zcash Community Advisory Panel (ZCAP)**  
   - Grupo voluntário de especialistas do ecossistema.  
   - Usado para consultas comunitárias não vinculantes sobre decisões importantes.

4. **Ratificação On-chain**  
   - Uma vez que uma atualização de rede é implantada, a maioria do hash rate da rede deve adotá-la (não há risco de hard fork se o consenso for alcançado).

5. **Direção Futura - A Lockbox e a ZIP 1016**  
   - Os fundos de 12% da lockbox estão se acumulando no protocolo.  
   - A ZIP 1016 propõe converter isso em um Coinholder-Controlled Fund com votação trimestral dos detentores de moedas e administração multisig por Key-Holder Organizations (atualmente ZF e Shielded Labs).

## 4. Tabela de Referência Rápida - Evolução do Financiamento

| Período          | Mineradores | ECC/Bootstrap | ZF   | ZCG  | Lockbox | Observações                                |
|------------------|-------------|---------------|------|------|---------|--------------------------------------------|
| 2020 - nov 2024  | 80%         | 7%            | 5%   | 8%   | -       | Dev fund clássico                          |
| nov 2024 - agora | 80%         | 0%            | 0%   | 8%   | 12%     | Modelo NU6 + extensão da ZCG               |
| Proposto (ZIP 1016) | 80% | 0%         | 0%   | 8%   | 12% (Coinholder-Controlled) | Até o 3º halving; votação dos detentores de moedas |

## 5. Recursos Relacionados

- Explicação oficial sobre o financiamento -> [seção de financiamento de z.cash/network](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (mudança de financiamento da NU6) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (modelo proposto para detentores de moedas) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Portal do Zcash Community Grants -> [grants.zcashcommunity.com](https://grants.zcashcommunity.com) (ou o site atual da FPF)

## 6. Painel da Lockbox

O Dashboard da ZecHub mostra o valor atual de ZEC no fundo Lockbox e Coinholders [aqui](https://zechub.wiki/dashboard?tab=lockbox).
