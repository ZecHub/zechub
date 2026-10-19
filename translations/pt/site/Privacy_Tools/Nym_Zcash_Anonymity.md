<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Anonimato do Mixnet Nym para Zcash

> Última verificação: 18 de outubro de 2026

As pools blindadas de Zcash ocultam montantes, remetentes e destinatários on-chain. Não ocultam o percurso de rede entre uma wallet e o servidor lightwallet. O mixnet de Nym acrescenta essa proteção em falta na camada de rede. Em outubro de 2026, a integração está ativa em wallets de produção (Zingo, Zkool).

Fonte: [Como Nym acrescenta anonimato às wallets de Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 de outubro de 2026).

## O que é protegido

Nym divide os pacotes de transações (normalmente 7–15 KB de dados de gastos e provas ZK) em pacotes Sphinx e encaminha-os através do mixnet. Isto:

- Oculta o IP do remetente do servidor lightwallet
- Mistura o tráfego com outro tráfego de Nym
- Fornece aproximadamente 17 bits de entropia nas definições predefinidas, com um conjunto de anonimato citado acima de 100 000 utilizadores

Os pagamentos e pedidos de preços em Zingo v7 seguem este percurso por predefinição.

## O que não é protegido

A sincronização da chain, consultas de nullifiers, obtenção de transações e tráfego de mempool utilizam atualmente a ligação normal do indexador. Os metadados ao nível do dispositivo ou da aplicação fora dos pacotes misturados também estão fora do âmbito de Nym.

Se o seu modelo de ameaça exigir ocultar o tráfego de sincronização, combine uma wallet com mixnet nativo com NymVPN ao nível do sistema. Consulte [Nym VPN](/guides/nym-vpn).

## Wallets

| Wallet | Estado | Notas |
| --- | --- | --- |
| Zingo v7 | Ativa, predefinida | `makers run-cli` inclui `nym-proxy`. A sessão inicia-se offline; `--online`, `--remember-online` ou `--server` concede consentimento. |
| Zkool | Ativa | Integração nativa com mixnet. |
| Outras | Através de NymVPN | Encaminhe a wallet através do modo Mixnet ao nível do sistema. |

Os detalhes de configuração para o percurso ao nível da wallet encontram-se em [Encaminhar o Tráfego da Wallet Zcash através do Mixnet Nym](/guides/nym-mixnet-wallet-setup).

## Compromissos

Uma difusão encaminhada por Nym é aproximadamente 12,5× mais lenta do que pela clearnet (~3,4 s). Tor é mais rápido (~3,7×), mas utiliza fluxos FIFO sem mistura, pelo que um adversário global ainda pode correlacionar. Aumentar a base partilhada de utilizadores de Nym aumenta o anonimato de forma mais eficaz do que acrescentar atraso adicional.

## Higiene da camada de aplicação: nym-swizzle-zcash

A proteção da camada de rede não é suficiente. Mesmo com um mixnet ou VPN perfeito, um servidor lightwallet ainda pode associar sessões ao observar padrões na camada de aplicação:

- Encadeamento de pontos de retoma: os clientes retomam a sincronização exatamente a partir de `previous end + 1`, pelo que o servidor pode encadear sessões apenas pela altura do bloco.
- Sincronizar e depois enviar: as wallets sincronizam imediatamente antes da difusão, permitindo ao servidor atribuir uma transação à sessão de sincronização anterior.

A crate [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) implementa uma política de higiene específica de Zcash que aborda ambos os casos. Empacota os primitivos gerais de `nym-swizzle` numa política adaptada à chain para clientes leves.

**Intervalos de sincronização quantificados.** Os pedidos são alargados a uma grelha de toda a rede com células do tamanho de um dia. O início é arredondado para baixo e o fim para cima. Os intervalos são determinísticos, ascendentes e disjuntos. As verificações de reorg permanecem dentro do intervalo alargado para que o ponto exato de retoma não seja revelado. O anonimato resulta da colisão (muitas wallets a emitir os mesmos limites) em vez de ruído.

**Difusões desacopladas.** Os envios de transações são adiados por uma distribuição exponencial (média de 144 blocos ≈ 3 horas, limite de 576 blocos ≈ 12 horas) correspondente ao agendamento de transferências ZIP 318. Os atrasos excedem as durações típicas dos processos, pelo que os agendamentos são persistidos. A transação é criada apenas no momento do envio, com base numa tip atualizada. A sincronização e a difusão devem utilizar servidores diferentes.

A crate expõe as traits `BlockSource` e `TxBroadcaster`, compila para `wasm32-unknown-unknown` e não possui uma stack de rede própria. Consulte a documentação de [Nym](https://nym.com/docs/developers/swizzle/zcash) para a API completa e exemplos.

## Fontes

- [Como Nym acrescenta anonimato às wallets de Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 de outubro de 2026
- [nym-swizzle-zcash: Política de Higiene para Clientes Leves de Zcash](https://nym.com/docs/developers/swizzle/zcash) — Documentação de Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Encaminhar o Tráfego da Wallet Zcash através do Mixnet Nym](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
