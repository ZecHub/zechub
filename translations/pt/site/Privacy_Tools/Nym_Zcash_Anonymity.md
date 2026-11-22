<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Anonimato da mixnet Nym para o Zcash

> Última verificação: 18 de outubro de 2026

As pools blindadas do Zcash ocultam valores, remetentes e destinatários on-chain. Elas não ocultam o caminho de rede entre uma carteira e o servidor lightwallet. A mixnet da Nym adiciona essa proteção que faltava na camada de rede. Desde outubro de 2026, a integração está ativa em carteiras de produção (Zingo, Zkool).

Fonte: [Como a Nym adiciona anonimato às carteiras Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 de outubro de 2026).

## O que é protegido

A Nym divide os pacotes de transação (normalmente de 7 a 15 KB de dados de gasto e provas ZK) em pacotes Sphinx e os roteia pela mixnet. Isso:

- Oculta o IP do remetente do servidor lightwallet
- Mistura o tráfego com o restante do tráfego da Nym
- Oferece cerca de 17 bits de entropia nas configurações padrão, com um conjunto de anonimato citado de mais de 100.000 usuários

Os pagamentos e as consultas de preço na Zingo v7 seguem esse caminho por padrão.

## O que não é protegido

A sincronização da chain, as consultas de nulificadores, as buscas de transações e o tráfego da mempool usam atualmente a conexão normal com o indexador. Metadados no nível do dispositivo ou do aplicativo fora dos pacotes misturados também estão fora do escopo da Nym.

Se o seu modelo de ameaças exige ocultar o tráfego de sincronização, combine uma carteira com mixnet nativa com a NymVPN no nível do sistema. Veja [VPN Nym](/guides/nym-vpn).

## Carteiras

| Carteira | Status | Observações |
| --- | --- | --- |
| Zingo v7 | Ativa, padrão | A `makers run-cli` inclui a `nym-proxy`. A sessão começa offline; `--online`, `--remember-online` ou `--server` concede o consentimento. |
| Zkool | Ativa | Integração nativa com a mixnet. |
| Outras | Via NymVPN | Roteie a carteira pelo modo Mixnet no nível do sistema. |

Os detalhes de configuração para o caminho no nível da carteira estão em [Rotear o tráfego da carteira Zcash pela mixnet Nym](/guides/nym-mixnet-wallet-setup).

## Prós e contras

Uma transmissão roteada pela Nym é cerca de 12,5× mais lenta que pela clearnet (~3,4 s). A Tor é mais rápida (~3,7×), mas usa fluxos FIFO sem mistura, de modo que um adversário global ainda consegue fazer correlações. Aumentar a base compartilhada de usuários da Nym eleva o anonimato de forma mais eficaz do que adicionar atraso extra.

## Higiene na camada de aplicação: nym-swizzle-zcash

A proteção na camada de rede não é suficiente. Mesmo com uma mixnet ou VPN perfeita, um servidor lightwallet ainda pode vincular sessões observando padrões na camada de aplicação:

- Encadeamento pelo ponto de retomada: os clientes retomam a sincronização exatamente a partir de `previous end + 1`, então o servidor pode encadear sessões apenas pela altura do bloco.
- Sincronizar e depois enviar: as carteiras sincronizam imediatamente antes de transmitir, o que permite ao servidor atribuir uma transação à sessão de sincronização anterior.

O crate [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) implementa uma política de higiene específica para o Zcash que resolve os dois problemas. Ele reúne as primitivas gerais da `nym-swizzle` em uma política para light clients que leva a chain em conta.

**Intervalos de sincronização quantizados.** As requisições são ampliadas para uma grade comum a toda a rede, com células do tamanho de um dia. O início é arredondado para baixo e o fim, para cima. Os intervalos são determinísticos, crescentes e disjuntos. As verificações de reorg permanecem dentro do intervalo ampliado, para que o ponto exato de retomada não seja revelado. O anonimato vem da colisão (muitas carteiras emitindo os mesmos limites), e não de ruído.

**Transmissões desacopladas.** Os envios de transações são atrasados segundo uma distribuição exponencial (média de 144 blocos ≈ 3 horas, limite de 576 blocos ≈ 12 horas), em conformidade com o agendamento de transferências do ZIP 318. Os atrasos excedem a duração típica de um processo, por isso os agendamentos são persistidos. A transação só é construída no momento do disparo, a partir de um tip atualizado. A sincronização e a transmissão devem usar servidores diferentes.

O crate expõe os traits `BlockSource` e `TxBroadcaster`, compila para `wasm32-unknown-unknown` e não tem uma pilha de rede própria. Veja a [documentação Nym](https://nym.com/docs/developers/swizzle/zcash) para a API completa e exemplos.

## Fontes

- [Como a Nym adiciona anonimato às carteiras Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 de outubro de 2026
- [nym-swizzle-zcash: política de higiene para light clients do Zcash](https://nym.com/docs/developers/swizzle/zcash) — Documentação Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Rotear o tráfego da carteira Zcash pela mixnet Nym](/guides/nym-mixnet-wallet-setup) — ZecHub
- [VPN Nym](/guides/nym-vpn) — ZecHub
