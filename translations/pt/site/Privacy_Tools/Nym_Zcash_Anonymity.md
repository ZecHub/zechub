<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Anonimato do mixnet Nym para o Zcash

> Última verificação: 18 de outubro de 2026

Os pools blindados do Zcash ocultam valores, remetentes e destinatários on-chain. Eles não ocultam o caminho de rede entre uma carteira e o servidor lightwallet. O mixnet da Nym adiciona essa proteção ausente na camada de rede. Em outubro de 2026, a integração está ativa em carteiras de produção (Zingo, Zkool).

Fonte: [Como a Nym adiciona anonimato às carteiras do Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 de outubro de 2026).

## O que é protegido

A Nym divide os pacotes de transação (normalmente 7–15 KB de dados de gastos e provas ZK) em pacotes Sphinx e os encaminha pelo mixnet. Isso:

- Oculta o IP do remetente do servidor lightwallet
- Mistura o tráfego com outro tráfego da Nym
- Fornece aproximadamente 17 bits de entropia nas configurações padrão, com um conjunto de anonimato citado acima de 100 000 usuários

Os pagamentos e as solicitações de preço no Zingo v7 seguem esse caminho por padrão.

## O que não é protegido

A sincronização da chain, as consultas de nulificadores, as buscas de transações e o tráfego do mempool atualmente usam a conexão normal do indexador. Os metadados no nível do dispositivo ou do aplicativo fora dos pacotes misturados também estão fora do escopo da Nym.

Se o seu modelo de ameaça exigir ocultar o tráfego de sincronização, combine uma carteira com mixnet nativo com o NymVPN no nível do sistema. Consulte [Nym VPN](/guides/nym-vpn).

## Carteiras

| Wallet | Estado | Notas |
| --- | --- | --- |
| Zingo v7 | Ativa, padrão | `makers run-cli` inclui `nym-proxy`. A sessão começa offline; `--online`, `--remember-online` ou `--server` concedem consentimento. |
| Zkool | Ativa | Integração nativa com mixnet. |
| Outras | Por meio do NymVPN | Encaminhe a carteira pelo modo Mixnet no nível do sistema. |

Os detalhes de configuração para o caminho no nível da carteira estão em [Encaminhar o tráfego da carteira do Zcash pelo mixnet Nym](/guides/nym-mixnet-wallet-setup).

## Compromissos

Uma transmissão encaminhada pela Nym é aproximadamente 12,5× mais lenta do que pela clearnet (~3,4 s). O Tor é mais rápido (~3,7×), mas usa fluxos FIFO sem mistura, portanto um adversário global ainda pode correlacionar. Aumentar a base compartilhada de usuários da Nym aumenta o anonimato de forma mais eficaz do que adicionar atraso extra.

## Higiene da camada de aplicativo: nym-swizzle-zcash

A proteção da camada de rede não é suficiente. Mesmo com um mixnet ou VPN perfeito, um servidor lightwallet ainda pode vincular sessões ao observar padrões na camada de aplicativo:

- Encadeamento de pontos de retomada: os clientes retomam a sincronização exatamente de `previous end + 1`, portanto o servidor pode encadear sessões apenas pela altura do bloco.
- Sincronizar e depois enviar: as carteiras sincronizam imediatamente antes da transmissão, permitindo que o servidor atribua uma transação à sessão de sincronização anterior.

A crate [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) implementa uma política de higiene específica do Zcash que aborda ambos os casos. Ela empacota os primitivos gerais de `nym-swizzle` em uma política compatível com a chain para light clients.

**Intervalos de sincronização quantizados.** As solicitações são ampliadas para uma grade em toda a rede com células do tamanho de um dia. O início é arredondado para baixo e o fim para cima. Os intervalos são determinísticos, ascendentes e disjuntos. As verificações de reorg permanecem dentro do intervalo ampliado para que o ponto exato de retomada não seja revelado. O anonimato vem da colisão (muitas carteiras emitindo os mesmos limites), em vez de ruído.

**Transmissões desacopladas.** Os envios de transações são atrasados por uma distribuição exponencial (média de 144 blocos ≈ 3 horas, limite de 576 blocos ≈ 12 horas) que corresponde ao agendamento de transferências da ZIP 318. Os atrasos excedem as durações típicas dos processos, portanto os agendamentos são persistidos. A transação é criada apenas no momento do envio, com base em uma tip atualizada. A sincronização e a transmissão devem usar servidores diferentes.

A crate expõe as traits `BlockSource` e `TxBroadcaster`, compila para `wasm32-unknown-unknown` e não possui uma stack de rede própria. Consulte a documentação da [Nym](https://nym.com/docs/developers/swizzle/zcash) para ver a API completa e exemplos.

## Fontes

- [Como a Nym adiciona anonimato às carteiras do Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 de outubro de 2026
- [nym-swizzle-zcash: Política de higiene para light clients do Zcash](https://nym.com/docs/developers/swizzle/zcash) — Documentação da Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Encaminhar o tráfego da carteira do Zcash pelo mixnet Nym](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
