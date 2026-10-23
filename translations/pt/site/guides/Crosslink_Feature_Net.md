<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Junta-te à Crosslink Feature Net

## Em resumo

- A Feature Net é a rede pública de testes da Shielded Labs para [Crosslink](/zcash-tech/crosslink-protocol), a camada de finalidade proposta que adiciona staking ao lado da prova de trabalho da Zcash.
- Funciona com uma moeda de teste, cTAZ. Nada do que fizeres nela movimenta ou põe em risco a ZEC da mainnet.
- Uma aplicação de desktop é o nó, o minerador, a wallet e o finalizador. Por predefinição, minera cTAZ e tem um botão de faucet.
- O staking, o unstaking e o levantamento só funcionam durante um "Staking Day", um dia em cada três. Se o perderes, esperas pelo próximo.
- Para fazer staking, colas a identidade de um finalizador e clicas num montante. Este guia usa como exemplo o finalizador da ZecHub.
- Duas chamadas RPC mostram a tua situação: `wallet_staking_positions` e `get_tfl_recency_status`.

*Testado com a versão 14 da Feature Net no Windows 11 (versão 10.0.26200.9550), de 8 a 10 de outubro de 2026. O software é um protótipo e muda a cada lançamento. Se o que vires for diferente desta página, confia na tua própria execução e abre uma PR, por favor.*

## O que é a Feature Net

A Crosslink é uma proposta, não faz parte da Zcash atualmente. As FAQ da Shielded Labs [Crosslink](https://shieldedlabs.net/crosslink-faq/) dizem que "teria de passar pelo processo de governação padrão da Zcash" antes de poder chegar à mainnet. A página de [Crosslink Protocol](/zcash-tech/crosslink-protocol) explica o design.

Para experimentar o design com utilizadores reais, a Shielded Labs executa aquilo a que chama [redes de funcionalidades incentivadas](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "uma série de testnets incentivadas". Existem três papéis na rede, e a aplicação de desktop pode desempenhar todos:

| Papel | O que faz |
|---|---|
| Minerador | Produz blocos de prova de trabalho, como na Zcash atualmente |
| Staker | Bloqueia cTAZ numa obrigação de delegação e aponta-a a um finalizador |
| Finalizador | Vota para finalizar blocos. O seu poder de voto é o stake que lhe foi delegado |

O repositório por trás dela começa com um aviso que vale a pena ler antes de instalares seja o que for: "existe para provar ideias, não para demonstrar engenharia de produção" e é "código não pronto para produção" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Executa-o numa máquina onde isso seja aceitável.

### O que mudou na versão 14

A [Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) saiu a 1 de outubro de 2026. A sua rede começa como simples prova de trabalho e ativa Crosslink em três passos ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), também apresentado em [ctaz.cash](https://ctaz.cash/v14)):

| Bloco | O que acontece |
|---|---|
| 20,736 | O staking abre |
| 34,560 | A primeira lista de finalizadores é obtida a partir dos stakes na chain |
| 36,288 | A finalidade BFT começa, juntamente com as recompensas de staking |

As recompensas de staking começam no último desses blocos. Uma obrigação criada antes não rende nada até lá ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

O mesmo lançamento reduziu a lista ativa aos 12 finalizadores com mais stake ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) e, nas palavras das suas notas de lançamento, atribuiu-lhes uma comissão: "10% de todas as PoS Rewards num bloco vão para estas comissões, enquanto 90% é distribuído por todas as obrigações de staking".

### cTAZ e ZEC real

cTAZ ("Crosslink TAZ") é a moeda de teste da Feature Net. Fazes staking de cTAZ, nunca de ZEC.

A ZEC real só entra no final. A Shielded Labs reservou [500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) para as redes de funcionalidades, e as [release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) dizem que é distribuída "numa base proporcional baseada apenas na quantidade de cTAZ que cada participante ganhou através de mineração ou staking". Daqui resultam duas consequências:

- **As moedas do faucet não contam.** cTAZ que te foi dado, pelo faucet ou por outra pessoa, não rende nada por estar na tua wallet. Apenas contam as recompensas de bloco da mineração e do staking.
- **Os pagamentos são reclamados, não automáticos.** A Shielded Labs anuncia cada ronda na [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Para a Ronda 2, pediu aos participantes que enviassem a viewing key da sua wallet e um endereço de mainnet até 4 de outubro de 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). A rede em que a versão 14 funciona, aquela à qual este guia se junta, foi anunciada como Ronda 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Antes de começares

- **Um computador que possas deixar a funcionar.** O lançamento disponibiliza builds para Windows, macOS, Ubuntu e Arch Linux. Este guia foi executado em Windows, num PC com um processador Intel Core i5-8350U.
- **Um Staking Day.** Confirma quando abre o próximo antes de fazeres planos. O [dashboard da Staker Space](https://crosslink.staker.space/) faz a contagem decrescente.
- **Nada mais.** Sem ZEC, sem conta e sem registo.

## Passo 1: Descarrega a aplicação e verifica o ficheiro

1. Abre o [lançamento da versão 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) e desloca-te até **Assets**.
2. Descarrega o ficheiro para o teu sistema. Em Windows, é `zebrad_v14_win32.exe`.
3. Compara o SHA-256 do ficheiro com o digest que a GitHub mostra junto desse asset.

Em Windows, no PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

O digest que a GitHub mostra para esse ficheiro é `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. O hexadecimal não distingue maiúsculas de minúsculas, portanto as letras maiúsculas acima estão corretas. Para deixares a shell comparar em vez dos teus olhos:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Sabe o valor desta verificação. O lançamento não tem assinatura, pelo que um hash correspondente indica que o download está completo e que é o ficheiro que a GitHub está a servir. Não te diz quem o compilou. [Verifying Zcash Releases](/guides/verifying-zcash-releases) explica a diferença.

## Passo 2: Inicia o nó e deixa-o sincronizar

Inicia a aplicação a partir de um terminal, para que as mensagens de arranque permaneçam no ecrã. Usa uma janela normal de PowerShell, não uma aberta com "Run as administrator": este é software protótipo sem assinatura e não precisa de direitos de administrador.

```powershell
.\zebrad_v14_win32.exe
```

Abre-se uma janela com o título "Zcash Crosslink Visualizer". A wallet fica à esquerda, com os separadores **Your Wallet** e **Faucet Wallet**, a chain é desenhada ao centro e os finalizadores são listados à direita. O terminal continua a imprimir o log do nó. Mantém ambos abertos enquanto usas a rede.

As notas de lançamento ligam a um [vídeo da instalação da Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

A aplicação guarda os dados numa pasta de cache: `%LOCALAPPDATA%\zebra` em Windows, `~/.cache/zebra` em Linux e `~/Library/Caches/zebra` no macOS, segundo as notas de lançamento.

**Mantém o segredo só para ti.** Essa pasta contém um ficheiro chamado `secret.seed`. A aplicação cria-o no primeiro arranque ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) e dele deriva a tua wallet e a identidade do teu finalizador ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). A aplicação também tem um botão **Copy Seed** que coloca o mesmo segredo na tua área de transferência. Quem tiver qualquer um deles controla a tua wallet. Nunca os coles num chat, numa publicação de fórum ou numa captura de ecrã.

### Como saber que estás sincronizado

As notas de lançamento dizem que não existe "monitorização integrada de quão próximo da ponta da rede estás sincronizado". A versão 14 tem alguma: o menu pendente **Network Info**, no topo da janela, tem linhas para PoW Height, Wallet Sync e Blocks Behind Known PoW ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Compara a tua altura com a apresentada na [Staker Space](https://crosslink.staker.space/) ou em [ctaz.cash](https://ctaz.cash/).

O nó também responde através de RPC:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

A porta RPC `127.0.0.1:8232` está aberta por predefinição nesta build e não precisa de palavra-passe ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Escuta apenas na tua própria máquina, e tudo o que estiver a funcionar nessa máquina pode chamá-la.

Nesta execução, a primeira sincronização, do bloco 0 até à ponta por volta do bloco 28,400, demorou cerca de 50 minutos.

**Depois de reiniciares, o teu saldo lê zero durante algum tempo.** Sempre que a aplicação inicia, reconstrói a wallet a partir de `secret.seed` e volta a analisar a chain desde o bloco 0 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Até a análise alcançar as tuas transações, o teu saldo e o teu stake são apresentados como 0. Nesta execução, voltaram cerca de 15 minutos após um reinício. A wallet do faucet é novamente analisada da mesma forma ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), e durante a análise o separador Faucet Wallet mostrou um saldo muito elevado. Ignora ambos até Wallet Sync estar concluída.

## Passo 3: Obtém algum cTAZ

### Minera-o

Segundo as notas de lançamento, a aplicação começa a minerar com CPU para a tua própria wallet assim que está sincronizada. Não tens de ativar nada. As moedas mineradas vão para um endereço transparente da tua própria wallet ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Encontrar um bloco é outra questão. As notas avisam que "podes ser ultrapassado por outros que mineram mais rapidamente, por isso não há garantia de sucesso". Por predefinição, o minerador integrado usa uma única thread de CPU ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Para usar mais threads, define uma variável de ambiente na mesma janela de PowerShell antes de iniciares a aplicação ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Esta execução usou quatro:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

A variável só dura enquanto essa janela estiver aberta. Com ela definida, o contador de processador da Windows mostrou o nó a usar o equivalente a quatro a cinco processadores, em percentagem de um processador lógico:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

O resultado: um Intel Core i5-8350U a minerar em quatro threads, desde o início de 8 de outubro até à tarde de 9 de outubro, não encontrou nenhum bloco.

### Ou usa o faucet

A aplicação tem um botão **Receive cTAZ** no canto inferior direito. No código-fonte da versão 14, uma pressão envia 0.5 cTAZ da wallet do faucet para a tua ([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). O faucet é uma única wallet que todas as cópias da aplicação transportam ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), e o separador **Faucet Wallet** mostra o seu saldo.

O botão é desativado a menos que o faucet tenha mais de 5.01 cTAZ em moedas shielded ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). O separador conta também as moedas mineradas pelo faucet, e estas só ficam shielded em lotes de exatamente 10 cTAZ mais uma taxa ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), pelo que o separador pode mostrar muito enquanto o botão permanece cinzento. Nesta execução, permaneceu cinzento a 8 e 9 de outubro, com "The faucet is mining more funds." ao passar o rato, enquanto o separador mostrava 14.74695 cTAZ.

**Quando o botão está cinzento, pergunta ao teu próprio nó.** O nó tem um método de pedido ao faucet, `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), que não aplica a regra dos 5.01 cTAZ do botão. Coloca o teu próprio endereço no lugar de `YOUR_ADDRESS` (é o campo `address` de `wallet_spendable_funds`, abaixo):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

Essa resposta significa que o pedido foi colocado na fila, não que foi enviado. Nesta execução, os 0.5 cTAZ do faucet foram minerados no bloco 33,306 e ficaram disponíveis para gastar no bloco 33,322. Pede uma vez: o faucet é partilhado, e um segundo pedido para o mesmo endereço é recusado enquanto o primeiro estiver pendente ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Ou pede a outro participante

Qualquer pessoa na rede pode enviar-te cTAZ com o botão **Send** da aplicação. Nesta execução, outro participante enviou 31 cTAZ. Chegou como "Received" com a nota "send from user wallet", que é a nota que o próprio Send da aplicação anexa ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Pede na [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) e fornece apenas o teu endereço.

As moedas do faucet e ofertas são suficientes para aprenderes staking. Não contam para recompensas da ZEC.

### Verifica o que podes gastar

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Esta foi a resposta quando os 0.5 cTAZ do faucet chegaram, com o endereço abreviado:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Os montantes estão em zatoshis: 100,000,000 perfazem um cTAZ. As moedas shielded precisam de 3 confirmações antes de contarem como disponíveis para gastar ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). As moedas do faucet e de outros participantes chegam em `spendable_zats`. As moedas mineradas são transparentes, por isso chegam em `unshielded_zats` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Um bloco após o segundo stake nesta execução, o restante saldo apareceu sob `pending_zats`. Alguns blocos mais tarde, estava novamente disponível para gastar.

## Passo 4: Faz staking para um finalizador

### Espera por um Staking Day

O staking, o unstaking e o levantamento só são aceites enquanto

```text
block height mod 10,368 < 3,456
```

o que é uma janela de 3,456 blocos no início de cada 10,368. Com o objetivo de bloco de 25 segundos da rede, isso corresponde a um dia em cada três ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). As primeiras janelas da versão 14 abrem nos blocos 20,736, 31,104, 41,472 e 51,840.

Segundo as notas de lançamento, a aplicação anuncia o início e o fim de cada Staking Day. Nesta execução, a sua lista de blocos mostrou uma linha vermelha "* STAKING DAY END *" entre os blocos 34,559 e 34,560.

**As notas de lançamento dizem duas coisas.** A sua lista de alterações indica "~1 dia para Staking Day e ~3 dias para Staking Cycle", o que corresponde ao código. Mais abaixo, uma secção transportada da Season 1 ainda diz que um Staking Day começa a cada 150 blocos e dura 70. Segue a primeira. A linha de fim acima está onde a primeira regra fecha a janela (34,560 mod 10,368 = 3,456); segundo a segunda regra, o bloco 34,560 ficaria dentro de uma janela.

### Escolhe um finalizador

Um finalizador é identificado pela sua identidade, uma string que começa por `zfinv1`. A ZecHub publica a identidade do finalizador que executa em [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Copia uma identidade de uma fonte em que confies. Segundo as notas de lançamento, a aplicação também lista os finalizadores no painel à direita, com um ícone de cópia à esquerda de cada um.

Depois de fazeres staking, o histórico da wallet e o RPC identificam o finalizador através de uma chave hexadecimal em vez da sua identidade. Para o finalizador da ZecHub, essa chave é `2941ef23...266aae8f`.

Escolhe um finalizador em que confies. O design não tem slashing automático, mas permite "um hard fork coordenado pelos utilizadores que queima todo o stake delegado a um finalizador nomeado" ([Crosslink book, visão geral do design](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

A escolha também decide quem vota. Cada obrigação ativa ganha a sua parte da recompensa de staking. Se o seu finalizador estiver entre os 12 da lista, um décimo dessa parte vai para o finalizador como comissão. Uma obrigação apontada a um finalizador fora dos 12 mantém toda a sua parte, mas esse finalizador não vota ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Faz staking

1. Copia a identidade do finalizador.
2. No separador **Your Wallet**, carrega em **Stake**.
3. Carrega em **Paste Identity**. A linha acima do botão muda para os primeiros e últimos carateres da identidade, `[zfinv1j6..YWyzp4YN]` para a da ZecHub. Confirma antes de continuares.
4. Clica num montante. Os montantes têm incrementos fixos, o menor é 0.01 cTAZ, e só ficam iluminados os montantes que o teu saldo cobre. Com 0.5 cTAZ, +0.01 cTAZ e +0.1 cTAZ estavam iluminados.

**Nada te pede confirmação, e parece que não acontece nada.** Nesta execução, nas palavras do testador: "Cliquei uma vez e nada aconteceu, apenas ficou cinzento e voltou a iluminar-se." O stake tinha sido efetuado. O histórico da wallet mostrou "Staked @ 33334 to 2941ef23..266aae8f", a taxa foi 0.00015 cTAZ, e a wallet mostrou 0.010 cTAZ Staked. Um segundo stake alguns minutos depois criou uma segunda obrigação, no bloco 33,348.

Cada stake cria a sua própria obrigação de delegação. Os montantes fixos e o Staking Day existem ambos para privacidade: tornam mais difícil distinguir o stake de uma pessoa do de outra.

## Passo 5: Verifica a tua posição

### As tuas obrigações

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Esta foi a resposta no bloco 36,490, dois dias depois do staking:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

A chamada não recebe parâmetros. Devolve as tuas obrigações ativas, agrupadas sob a chave do finalizador que cada uma apoia, e as obrigações que terminaram o unstaking e podem ser levantadas. Cada obrigação mostra o montante em stake (`initial_val`), o seu valor atual (`latest_val`), e a transação e altura do bloco que a criaram. As recompensas são adicionadas à própria obrigação: no bloco 36,490, cada obrigação de 1,000,000 zatoshis tinha crescido para 1,003,451.

**A janela Edit Stake mostra cada obrigação dez vezes maior.** Nesta execução, cada obrigação de 0.01 cTAZ era apresentada como 0.100 cTAZ na sua própria linha, e como 0.1003536 cTAZ quando as recompensas começaram, enquanto os totais acima das linhas (0.020 cTAZ, mais tarde 0.02007 cTAZ) concordavam com o RPC. Segue os totais e o RPC.

A mesma janela colocou um triângulo de aviso junto ao finalizador, antes e depois de a finalidade começar. No código-fonte, o triângulo significa que a tua aplicação não considera esse finalizador online, e um que esteja online recebe um ícone de Wi-Fi ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Ainda assim, as obrigações ganharam recompensas.

### Os finalizadores

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Segundo as notas de lançamento, isto informa onde está o teu nó no processo de votação e, para cada finalizador, quando foi a última vez que o teu nó recebeu informação dele e como tem votado.

Antes do bloco 36,288, todos os campos são zero e a lista está vazia. Esta foi a resposta no bloco 33,354:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

Depois de a finalidade começar, a lista contém os finalizadores da lista ativa. No bloco 36,490, continha 12, incluindo o da ZecHub `2941ef23...`, o que corresponde ao limite de 12 finalizadores. Este é o início dessa resposta, cortada após a primeira entrada:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

Alguns minutos mais tarde, o painel à direita da aplicação mostrou "Finalizers (23)".

### Em Linux e macOS

O [source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) fornece a chamada na forma `curl`. Altera o nome do método para as outras chamadas. Esta forma não foi executada para este guia:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Em Linux, as notas de lançamento dizem que provavelmente precisas de ter `xclip` instalado antes de copiar e colar funcionar na aplicação.

### Um nome RPC a vigiar

As notas de lançamento da versão 14 descrevem uma chamada de staking chamada `wallet_staking_action` que recebe um objeto. O código-fonte da versão 14 não tem nenhum método com esse nome e, nesta execução, o nó respondeu:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

O método de staking que regista é [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), que recebe uma string contendo o pedido como JSON, com o finalizador dado pela sua identidade `zfinv1` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Não foi experimentado para este guia.

## Unstake e levantamento

Uma obrigação não pode ser desfeita no dia em que é criada. Demora três Staking Days do início ao fim: fazes staking num, unstake num posterior e levantas num terceiro. As notas de lançamento acrescentam que uma obrigação não pode realizar duas ações de staking no mesmo Staking Day.

*Não executado para este guia. Das notas de lançamento da versão 14:* para fazer unstake, carrega em **Edit Stake**, escolhe uma obrigação da lista Staked Bonds e clica no ícone de corrente. Para levantar num Staking Day posterior, carrega em **Edit Stake**, escolhe uma obrigação da lista Withdrawable Bonds e clica no ícone de dinheiro. Mover uma obrigação para um finalizador diferente, ao que as notas chamam retargeting, é permitido a qualquer momento.

## Onde acompanhar a rede

O separador [Crosslink em ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) reúne as ferramentas num único lugar, sob um aviso que diz "Staking on this network does not move ZEC":

- Alojadas, sem precisar de nó: [Staker Space](https://crosslink.staker.space/), um "dashboard em direto para a testnet cTAZ atual" com a altura, mineradores, taxa de soluções, contagem decrescente para Staking Day e finalidade, e [ctaz.cash](https://ctaz.cash/), com produção de mineração, a lista de finalizadores, pares e reivindicações de nomes de endereços de staking.
- Na tua própria máquina: `zcash-explorer`, cuja página `/live/crosslink` mostra ativação, atraso de finalidade, a lista e posições de staking, e `crosslink_indexer`, um índice SQLite de um nó Crosslink.

## Erros comuns

**Planear pelo relógio em vez da altura do bloco.** Os Staking Days são contados em blocos. Acompanha a contagem decrescente de um dashboard, não o calendário.

**Fazer staking nos últimos minutos da janela.** A regra é verificada contra o bloco que inclui a tua transação ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), pelo que o stake tem de ser minerado antes de a janela fechar, não apenas enviado.

**Esperar minerar o teu stake.** Um minerador de CPU com quatro threads num Intel Core i5-8350U não encontrou nenhum bloco entre 8 e 9 de outubro. Obtém o teu primeiro cTAZ pelo faucet ou por outro participante.

**Clicar novamente porque nada parecia acontecer.** Cada clique num montante é uma nova obrigação. Verifica primeiro o histórico da wallet ou `wallet_staking_positions`.

**Entrar em pânico após um reinício.** O teu saldo e stake mostram zero até a wallet ter sido novamente analisada. Espera que Wallet Sync termine.

**Tratar cTAZ como dinheiro de brincar, ou o segredo como inofensivo.** cTAZ é uma moeda de teste, mas o cTAZ que ganhas decide a tua parte da ZEC real. Protege `secret.seed` como protegerias uma wallet.

**Ler instruções antigas.** As notas de lançamento contêm texto de temporadas anteriores ao lado das regras novas. Quando discordarem do que o teu nó faz, o teu nó está correto.

## Páginas relacionadas

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - o design que esta rede testa
- [Shielded Labs](/zcash-organizations/shielded-labs) - a equipa por trás da Crosslink
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - o que uma checksum prova e não prova
- [Zebra Full Node](/zcash-tech/zebra-full-node) - o nó em que a aplicação Feature Net é construída
- [Zcash Testnet](/using-zcash/testnet) - a rede de testes comum da Zcash, que é uma rede diferente

## Fontes

- [Notas de lançamento da versão 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 de outubro de 2026
- [Crosslink: Redes de Funcionalidades Incentivadas](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 de abril de 2026
- [Crosslink: Feature Net Incentivada](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Fórum da Comunidade Zcash
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [O livro da Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Os passos desta página foram executados com a versão 14 da Feature Net no Windows 11 (versão 10.0.26200.9550), de 8 a 10 de outubro de 2026. Uma afirmação que cita as notas de lançamento ou o código-fonte é retirada deles. Tudo o que está marcado como "não executado" não foi experimentado.*
