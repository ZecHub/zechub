# Visão geral do financiamento e da governança do Zcash

O modelo de financiamento on-chain do Zcash, a mecânica da recompensa de bloco e o papel das principais organizações

## 1. Como funcionam as recompensas de bloco do Zcash

O Zcash é uma criptomoeda Proof-of-Work. Cada bloco minerado distribui seu **subsídio de bloco** (os ZEC recém-criados) mais as taxas de transação de acordo com uma regra fixa do protocolo, definida pelas atualizações da rede.

- **Modelo atual (NU6.1 / a partir de 24 de novembro de 2025)**  
  A distribuição é:

| Destinatário                   | Porcentagem | O que financia / status                                     |
|--------------------------------|------------|-------------------------------------------------------------|
| Mineradores                    | 80%        | Recompensa de bloco direta para os mineradores              |
| Zcash Community Grants (ZCG)   | 8%         | Subsídios comunitários (continua até ~2028)                 |
| Fundo controlado pelos detentores de moedas | 12%        | Formado com os recursos do antigo lockbox; os detentores de moedas votam nos subsídios ([ZIP 1016](https://zips.z.cash/zip-1016)) |

- **Fundo de desenvolvimento histórico, antes do NU6 (2020 a nov 2024)**  
  20% de cada subsídio de bloco ia diretamente para organizações de desenvolvimento:

  - 7% -> Electric Coin Company (ECC) / Projeto Bootstrap  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

Esse "fundo de desenvolvimento" de 20% foi substituído pelo modelo de 8% para a ZCG + 12% para o lockbox por meio do [ZIP 1015](https://zips.z.cash/zip-1015) (NU6, novembro de 2024). De novembro de 2024 a novembro de 2025, os 12% se acumularam no lockbox do fundo de desenvolvimento diferido, sem nenhuma forma de gastá-los.

### Modelo atual: ZIP 1016 - Modelo de financiamento pela comunidade e pelos detentores de moedas
O ZIP 1016 (criado em fevereiro de 2025) foi ativado na mainnet pela [NU6.1](/zcash-tech/nu6-1) no bloco 3.146.400, em 24 de novembro de 2025 ([ZIP 255](https://zips.z.cash/zip-0255)). Ele:
- Mantém a alocação de 8% para a ZCG.
- Converteu o lockbox de 12% em um "Fundo controlado pelos detentores de moedas" (formado pelos recursos já existentes no lockbox + o subsídio de bloco contínuo de 12%).
- Vigora até o terceiro halving (o ZIP permite que essa data mude caso o NU7 altere o tempo dos blocos).
- Permite que os detentores de moedas ZEC votem nos subsídios (maioria simples, com mínimo de 420.000 ZEC votados).
- Exige que organizações detentoras de chaves (atualmente incluindo a ZF e a Shielded Labs, com Bootstrap/ECC mencionadas no contexto dos subsídios) administrem os desembolsos por meio de multisig, vinculadas a acordos legais e às decisões dos detentores de moedas.
- Mantém todos os requisitos do ZIP 1015 sobre o uso do lockbox (financiamento de subsídios para o ecossistema).

Esse modelo passa de um controle pelas organizações para uma governança direta pelos detentores de moedas na alocação de 12%. Ele não altera o processo ZIP nem as regras da marca registrada.

## 2. As principais organizações e suas fontes de financiamento

**Electric Coin Company (ECC) / Projeto Bootstrap**  
- Criadores originais do Zcash (2016).  
- Historicamente recebia ~7% do fundo de desenvolvimento até novembro de 2024.  
- Em janeiro de 2026, a equipe principal de engenharia e produto se demitiu da Bootstrap/ECC devido a disputas de governança e formou o Zcash Open Development Lab (ZODL).  
- A ECC/Bootstrap não recebe mais financiamento direto do protocolo e não emprega mais a equipe principal de desenvolvimento. Ela depende de doações, patrocínios e de seu próprio tesouro.  
- Tem importância histórica, mas não é mais a organização ativa de desenvolvimento do protocolo.  
-> Veja o perfil completo: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- Formado em janeiro de 2026 pelos desenvolvedores originais do protocolo Zcash (a equipe principal de engenharia e produto da ECC) depois que saíram da Bootstrap/ECC.  
- Captou mais de US$ 25 milhões em financiamento seed de grandes investidores, incluindo a16z Crypto e Coinbase Ventures.  
- A equipe, formada pelos inventores e desenvolvedores originais do protocolo Zcash, continua o desenvolvimento do núcleo do protocolo, as contribuições para o ZIP e as ferramentas focadas em privacidade, incluindo a carteira móvel Zodl (antes chamada Zashi).  
- Não recebe financiamento on-chain direto do protocolo; opera como um laboratório independente apoiado por capital de risco e focado em avançar a infraestrutura de privacidade do Zcash.  
-> Veja o perfil completo: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> Site oficial: [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- Organização sem fins lucrativos 501(c)(3) independente, focada em infraestrutura, software de nó, pesquisa e saúde do ecossistema.  
- Historicamente recebia 5% do fundo de desenvolvimento.  
- Não recebe mais financiamento direto do protocolo desde o NU6. Depende de doações e subsídios.  
- Detém a marca registrada Zcash (doada pela ECC em 2019) e tem um papel central na governança.  
- Administra o Zcash Community Advisory Panel (ZCAP) e ajuda a viabilizar as consultas à comunidade.  
- Atua como organização detentora de chaves no âmbito do ZIP 1016.  
-> Veja o perfil completo: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> Site oficial: [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- O programa Zcash Community Grants financia equipes e projetos independentes para realizar trabalhos importantes e contínuos de desenvolvimento, entre outros, em benefício do ecossistema Zcash.  
- Os subsídios são decididos por um comitê eleito pela comunidade.  
- Continua recebendo os 8% integrais das recompensas de bloco (após o NU6), administrados pela Financial Privacy Foundation.  
- Os subsídios são concedidos por meio de um processo transparente de inscrição e votação, aberto à comunidade.  
-> Veja o perfil completo: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> Site oficial: [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- Organização sem fins lucrativos constituída nas Ilhas Cayman.  
- Recebe a alocação de 8% do subsídio de bloco diretamente do protocolo (conforme o ZIP 1015) e cuida de toda a administração jurídica, financeira e operacional do programa Zcash Community Grants.  
- Fornece a estrutura institucional e o suporte administrativo para as operações da ZCG, incluindo desembolsos, contratos e compliance.  
- A ZCG opera como uma entidade autônoma, eleita pela comunidade, sob a estrutura da FPF.  
-> Veja o perfil completo: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> Site oficial: [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- Organização independente de apoio ao Zcash, financiada por doações e sediada na Suíça.  
- A primeira organização do ecossistema Zcash que nunca recebeu financiamento direto ou indireto do fundo de desenvolvimento ou das recompensas de bloco.  
- Concentra-se em iniciativas que beneficiam os detentores de ZEC e prioriza a voz dos detentores na definição dos rumos do Zcash.  
- Atua como organização detentora de chaves no âmbito do ZIP 1016 para a administração do Fundo controlado pelos detentores de moedas.  
- Contribui para o desenvolvimento do protocolo, para o processo ZIP e para a governança (representação entre os editores de ZIP).  
-> Veja o perfil completo: [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> Site oficial: [shieldedlabs.net](https://shieldedlabs.net/)

## 3. Governança - como as decisões são tomadas

A governança do Zcash é uma mistura de "regras de protocolo on-chain" e "consenso social off-chain":

1. **Processo ZIP (Zcash Improvement Proposals)**  
   - Qualquer pessoa pode enviar um ZIP.  
   - Debate público em fóruns, no Discord e no GitHub.  
   - Os atuais editores de ZIP são Jack Grigg, Daira-Emma Hopwood e Kris Nuttycombe (a título individual); Arya e Marek (Zcash Foundation); Mark Henderson e Sam H. Smith (Shielded Labs); Sean Bowe e Tal Derei (Projeto Tachyon); e Dev Ojha (Valar Group).
   - A aprovação de um ZIP não garante automaticamente sua inclusão na próxima atualização da rede. ZIPs de consenso exigem um plano de implantação e uma implementação, e suas regras entram em vigor na altura de atualização da rede especificada.

2. **Acordo de marca registrada (2019-2024)**  
   - A ECC doou a marca registrada Zcash à ZF em 2019.  
   - Originalmente, o acordo exigia o consentimento mútuo da ECC e da ZF para qualquer atualização da rede que criasse um novo protocolo de consenso.  
   - Em abril de 2024, a ECC anunciou a intenção de encerrar o acordo; a notificação formal de encerramento foi emitida em agosto de 2024.  
   - Desde 2025, a ZF é a única responsável pela marca registrada Zcash e adotou uma nova política de marca mais permissiva, que reflete a descentralização do ecossistema. A marca registrada não funciona mais como mecanismo de veto na governança.

3. **Zcash Community Advisory Panel (ZCAP)**  
   - Grupo voluntário de especialistas do ecossistema.  
   - Usado em consultas não vinculantes à comunidade sobre decisões importantes.

4. **Ratificação on-chain**  
   - As atualizações da rede são ativadas em uma altura de bloco predeterminada. Os nós que rodam software compatível aplicam as novas regras de consenso a partir dessa altura. Os nós que não se atualizam podem continuar seguindo um ramo de consenso anterior à atualização, o que pode resultar em uma divisão da chain.

5. **O lockbox e o ZIP 1016**  
   - Os recursos de 12% do lockbox se acumularam no protocolo de novembro de 2024 a novembro de 2025.  
   - O NU6.1 os converteu no Fundo controlado pelos detentores de moedas, com votação pelos detentores de moedas e administração via multisig por organizações detentoras de chaves (atualmente, a ZF e a Shielded Labs).

## 4. Tabela de referência rápida - evolução do financiamento

| Período          | Mineradores | ECC/Bootstrap | ZF   | ZCG  | Lockbox | Observações                                |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020 - nov 2024  | 80%    | 7%            | 5%   | 8%   | -       | Fundo de desenvolvimento clássico          |
| nov 2024 - nov 2025 | 80% | 0%            | 0%   | 8%   | 12%     | Modelo NU6 + extensão do ZCG               |
| nov 2025 - hoje (ZIP 1016) | 80% | 0%   | 0%   | 8%   | 12% (controlado pelos detentores de moedas) | NU6.1; até o 3º halving; votação pelos detentores de moedas |

## 5. Recursos relacionados

- Explicação oficial sobre o financiamento -> [seção de financiamento da rede em z.cash/network](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (mudança no financiamento do NU6) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (modelo dos detentores de moedas, em vigor desde o NU6.1) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Portal da Zcash Community Grants -> [zcashcommunitygrants.org](https://zcashcommunitygrants.org)

## 6. Painel do lockbox

O painel ZecHub mostra o valor atual de ZEC no lockbox e no fundo dos detentores de moedas [aqui](https://zechub.wiki/dashboard?tab=lockbox).
