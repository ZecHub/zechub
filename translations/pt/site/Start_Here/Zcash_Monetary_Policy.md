<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Zcash_Monetary_Policy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Política monetária do Zcash

## Em resumo

* Zcash tem uma oferta fixa de 21 milhões de ZEC, o mesmo limite do Bitcoin.
* Desde que NU7 foi ativada em 6 de novembro de 2026, um novo bloco é criado a cada 25 segundos, aproximadamente, e gera 0.52083333 ZEC.
* Isso equivale a cerca de 1,800 novos ZEC por dia, a mesma quantidade diária de antes de NU7.
* A recompensa de cada bloco é dividida: 80% para o minerador, 8% para Zcash Community Grants e 12% para o lockbox.
* A recompensa por bloco cai pela metade aproximadamente a cada quatro anos. A próxima redução pela metade está prevista para o fim de novembro de 2028.

## Explicação principal

### Qual é a economia do Zcash?

A base monetária do Zcash é igual à oferta fixa de 21 milhões de unidades monetárias do Bitcoin, ou seja, ZEC. Em média, a cada 25 segundos (75 segundos antes da ativação de NU7 em 6 de novembro de 2026), um novo [bloco](https://zcash.readthedocs.io/en/latest/rtd_pages/glossary.html#:~:text=Block,mempool%20in%20an%20unconfirmed%20state.) é minerado na blockchain do Zcash e uma recompensa por bloco de 0.52083333 ZEC entra em circulação. Antes de NU7, a recompensa era de 1.5625 ZEC por bloco; [ZIP 218](https://zips.z.cash/zip-0218) dividiu esse valor por três, assim como o tempo entre blocos, portanto a quantidade de novos ZEC por dia não mudou. Desde NU7, os 0.52083333 ZEC são divididos: 80% para o minerador (0.41666668 ZEC, mais as taxas de transação), 8% para Zcash Community Grants (0.04166666 ZEC) e 12% para o lockbox (0.06249999 ZEC), conforme [ZIP 1015](https://zips.z.cash/zip-1015).

A recompensa por bloco cai pela metade aproximadamente a cada quatro anos, até que os 21 milhões de ZEC estejam em circulação. A inflação do Zcash reproduz quase exatamente a do Bitcoin. É importante observar que, à medida que novas moedas são criadas, a inflação diminui e, a cada halving, a taxa cai significativamente.

## Visual / analogia

Imagine um dispensador de moedas diante de um cofre lacrado. O cofre guarda 21 milhões de ZEC no total, e ninguém pode acrescentar uma única moeda.

A cada 25 segundos, o dispensador libera um pequeno punhado de moedas novas: 0.52083333 ZEC. O minerador que encontrou o bloco fica com 80% do punhado. Zcash Community Grants recebe 8%. Os 12% restantes vão para o lockbox.

A cada quatro anos, aproximadamente, o punhado fica pela metade. Isso é o halving.

NU7 fez com que os punhados fossem liberados três vezes mais frequentemente e cada um tivesse um terço do tamanho. A quantidade de moedas novas por dia permaneceu igual.

## Aprofundamento

### Novos ZEC por dia, era por era

Os halvings reduzem a recompensa por bloco. Blocos mais rápidos (Blossom em 2019, NU7 em 2026) também reduzem a recompensa por bloco junto com o tempo entre blocos, mantendo a quantidade diária igual.

| Período | Tempo entre blocos | Recompensa por bloco | Novos ZEC por dia |
|:--|:--|:--|:--|
| Era de lançamento, de 2016 a 2019 | 150 segundos | 12.5 ZEC | 7,200 |
| [Blossom](/zcash-tech/blossom), dez de 2019 a nov de 2020 | 75 segundos | 6.25 ZEC | 7,200 |
| Primeiro halving ([Canopy](/zcash-tech/canopy)), nov de 2020 a nov de 2024 | 75 segundos | 3.125 ZEC | 3,600 |
| Segundo halving ([NU6](/zcash-tech/nu6)), nov de 2024 a nov de 2026 | 75 segundos | 1.5625 ZEC | 1,800 |
| [NU7](/zcash-tech/nu7), nov de 2026 ao fim de 2028 | 25 segundos | 0.52083333 ZEC | 1,800 |
| Terceiro halving, previsto para o fim de nov de 2028 | 25 segundos | metade da recompensa atual | cerca de 900 |

Cada valor diário corresponde à recompensa por bloco multiplicada pelo número de blocos em um dia (86,400 segundos divididos pelo tempo entre blocos). Os tempos reais entre blocos variam um pouco, então a emissão diária efetiva oscila ligeiramente em torno desses valores.

### Quando acontecerá o próximo halving

NU7 tornou os blocos três vezes mais frequentes, por isso o número do bloco do próximo halving mudou. O próximo halving está previsto para o bloco 6,132,390, aproximadamente no fim de novembro de 2028 ([ZIP 259](https://zips.z.cash/zip-0259)). Artigos mais antigos indicam o bloco 4,406,400. Esse número estava correto antes de NU7.

### Taxas e o Mecanismo de sustentabilidade da rede

Desde NU7, 60% das taxas de transação de cada bloco são retiradas de circulação e mantidas em uma reserva pública. A partir do bloco 8,939,664, previsto para fevereiro de 2031, cada bloco distribuirá uma parcela fixa dessa reserva aos mineradores, além da recompensa normal por bloco. O limite de 21 milhões não muda. A página [Mecanismo de sustentabilidade da rede](/zcash-tech/network-sustainability-mechanism) explica como isso funciona.

## Páginas relacionadas

- [NU7](/zcash-tech/nu7): a atualização que trouxe blocos de 25 segundos e a recompensa atual por bloco.
- [Mecanismo de sustentabilidade da rede](/zcash-tech/network-sustainability-mechanism): para onde vão 60% das taxas de cada bloco e quando elas voltam.
- [Fundo de desenvolvimento](/start-here/development-fund): a história da parcela da recompensa por bloco destinada ao desenvolvimento.
- [Atualizações da rede](/start-here/network-upgrades): todas as atualizações do Zcash, com datas e alturas dos blocos.
- [Zcash Community Grants](/zcash-organizations/zcash-community-grants): a organização que recebe a parcela de 8%.
- [Pools de mineração do Zcash](/using-zcash/zcash-mining-pools): onde a maioria dos mineradores recebe sua parte da recompensa por bloco.

### Recursos

[Como funciona a economia do Zcash?](https://z.cash/support/faq/#:~:text=Zcash's%20monetary%20base%20is%20the,3.125%20ZEC%20comes%20into%20circulation.)

[ZIP 218: Intervalo-alvo de 25 segundos entre blocos](https://zips.z.cash/zip-0218)

[ZIP 259: Implantação da atualização da rede NU7](https://zips.z.cash/zip-0259)

[ZIP 1015](https://zips.z.cash/zip-1015)

**Última atualização:** novembro de 2026
