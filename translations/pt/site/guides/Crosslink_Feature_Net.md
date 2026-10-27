<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Junte-se à Crosslink Feature Net

## Em resumo

- A Feature Net é a rede pública de testes da Shielded Labs para [Crosslink](/zcash-tech/crosslink-protocol), a camada de finalidade proposta que adiciona staking ao lado da prova de trabalho do Zcash.
- Funciona com uma moeda de teste, cTAZ. Nada do que você fizer nela movimenta ou coloca em risco a ZEC da mainnet.
- Um aplicativo de desktop é o nó, o minerador, a carteira e o finalizador. Por padrão, minera cTAZ e tem um botão de faucet.
- O staking, o unstaking e o saque só funcionam durante um "Staking Day", um dia a cada três. Se você o perder, espera pelo próximo.
- Para fazer staking, você cola a identidade de um finalizador e clica em um valor. Este guia usa como exemplo o finalizador da ZecHub.
- Duas chamadas RPC mostram sua situação: `wallet_staking_positions` e `get_tfl_recency_status`.

*Testado com a versão 14 da Feature Net no Windows 11 (versão 10.0.26200.9550), de 8 a 10 de outubro de 2026. O software é um protótipo e muda a cada lançamento. Se o que você vir for diferente desta página, confie na sua própria execução e abra uma PR, por favor.*

## O que é a Feature Net

A Crosslink é uma proposta, não faz parte do Zcash atualmente. As FAQ da Shielded Labs [Crosslink](https://shieldedlabs.net/crosslink-faq/) dizem que "teria de passar pelo processo padrão de governança do Zcash" antes de poder chegar à mainnet. A página do [Crosslink Protocol](/zcash-tech/crosslink-protocol) explica o design.

Para experimentar o design com usuários reais, a Shielded Labs opera o que chama de [redes de funcionalidades incentivadas](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "uma série de testnets incentivadas". Existem três funções na rede, e o aplicativo de desktop pode desempenhar todas:

| Role | O que faz |
|---|---|
| Miner | Produz blocos de prova de trabalho, como no Zcash atualmente |
| Staker | Bloqueia cTAZ em uma garantia de delegação e a aponta para um finalizador |
| Finalizer | Vota para finalizar blocos. Seu poder de voto é o stake delegado a ele |

O repositório por trás dela começa com um aviso que vale a pena ler antes de você instalar qualquer coisa: "existe para provar ideias, não para demonstrar engenharia de produção" e é "código não pronto para produção" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Execute-o em uma máquina onde isso seja aceitável.

### O que mudou na versão 14

A [Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) foi lançada em 1 de outubro de 2026. Sua rede começa como simples prova de trabalho e ativa a Crosslink em três etapas ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), também mostrado em [ctaz.cash](https://ctaz.cash/v14)):

| Block | O que acontece |
|---|---|
| 20,736 | O staking é aberto |
| 34,560 | A primeira lista de finalizadores é obtida a partir dos stakes na chain |
| 36,288 | A finalidade BFT começa, juntamente com as recompensas de staking |

As recompensas de staking começam no último desses blocos. Uma garantia criada antes não rende nada até então ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

O mesmo lançamento reduziu a lista ativa aos 12 finalizadores com mais stake ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) e, nas palavras das notas de lançamento, atribuiu-lhes uma comissão: "10% de todas as PoS Rewards em um bloco vão para essas comissões, enquanto 90% são distribuídos entre todas as garantias de staking".

### cTAZ e ZEC real

cTAZ ("Crosslink TAZ") é a moeda de teste da Feature Net. Você faz staking de cTAZ, nunca de ZEC.

A ZEC real entra apenas no final. A Shielded Labs reservou [500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) para as redes de funcionalidades, e as [release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) dizem que ela é distribuída "de forma proporcional, baseada apenas na quantidade de cTAZ que cada participante ganhou por meio de mineração ou staking". Isso tem duas consequências:

- **As moedas do faucet não contam.** cTAZ que foi dado a você, pelo faucet ou por qualquer outra pessoa, não rende nada por ficar na sua carteira. Apenas as recompensas de bloco da mineração e do staking contam.
- **Os pagamentos precisam ser solicitados, não são automáticos.** A Shielded Labs anuncia cada rodada no [tópico do fórum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Para a Rodada 2, pediu aos participantes que enviassem a chave de visualização da sua carteira e um endereço de mainnet até 4 de outubro de 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). A rede em que a versão 14 funciona, à qual este guia se junta, foi anunciada como Rodada 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Antes de começar

- **Um computador que você possa deixar funcionando.** O lançamento disponibiliza builds para Windows, macOS, Ubuntu e Arch Linux. Este guia foi executado no Windows, em um PC com processador Intel Core i5-8350U.
- **Um Staking Day.** Verifique quando o próximo começa antes de fazer planos. O [painel da Staker Space](https://crosslink.staker.space/) faz a contagem regressiva.
- **Nada mais.** Sem ZEC, sem conta e sem registro.

## Passo 1: Baixe o aplicativo e verifique o arquivo

1. Abra o [lançamento da versão 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) e role até **Assets**.
2. Baixe o arquivo para seu sistema. No Windows, é `zebrad_v14_win32.exe`.
3. Compare o SHA-256 do arquivo com o digest que o GitHub mostra ao lado desse asset.

No Windows, no PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

O digest que o GitHub mostra para esse arquivo é `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. O hexadecimal não diferencia maiúsculas de minúsculas, portanto as letras maiúsculas acima estão corretas. Para deixar o shell comparar em vez de seus olhos:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Entenda o valor desta verificação. O lançamento não tem assinatura, portanto um hash correspondente indica que o download está completo e que é o arquivo que o GitHub está servindo. Ele não informa quem o compilou. [Verifying Zcash Releases](/guides/verifying-zcash-releases) explica a diferença.

## Passo 2: Inicie o nó e deixe-o sincronizar

Inicie o aplicativo a partir de um terminal, para que suas mensagens de inicialização permaneçam na tela. Use uma janela comum do PowerShell, não uma aberta com "Run as administrator": este é um software protótipo sem assinatura e não precisa de direitos de administrador.

```powershell
.\zebrad_v14_win32.exe
```

Uma janela intitulada "Zcash Crosslink Visualizer" é aberta. A carteira fica à esquerda, com as abas **Your Wallet** e **Faucet Wallet**, a chain é desenhada no meio e os finalizadores são listados à direita. O terminal continua imprimindo o log do nó. Mantenha ambos abertos enquanto usa a rede.

As notas de lançamento têm um link para um [vídeo da instalação no Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

O aplicativo mantém seus dados em uma pasta de cache: `%LOCALAPPDATA%\zebra` no Windows, `~/.cache/zebra` no Linux e `~/Library/Caches/zebra` no macOS, segundo as notas de lançamento.

**Mantenha o segredo só para você.** Essa pasta contém um arquivo chamado `secret.seed`. O aplicativo o cria na primeira inicialização ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) e deriva dele sua carteira e a identidade do seu finalizador ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). O aplicativo também tem um botão **Copy Seed** que coloca o mesmo segredo na sua área de transferência. Quem tiver qualquer um deles controla sua carteira. Nunca os cole em um chat, uma publicação de fórum ou uma captura de tela.

### Como saber se você está sincronizado

As notas de lançamento dizem que não há "monitoramento integrado de quão perto da ponta da rede você está sincronizado". A versão 14 tem algum: o menu suspenso **Network Info**, no topo da janela, tem linhas para PoW Height, Wallet Sync e Blocks Behind Known PoW ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Compare sua altura com a exibida na [Staker Space](https://crosslink.staker.space/) ou em [ctaz.cash](https://ctaz.cash/).

O nó também responde por RPC:

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

A porta RPC `127.0.0.1:8232` fica aberta por padrão nesta build e não precisa de senha ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Ela escuta apenas na sua própria máquina, e tudo que estiver sendo executado nessa máquina pode chamá-la.

Nesta execução, a primeira sincronização, do bloco 0 até a ponta por volta do bloco 28,400, levou cerca de 50 minutos.

**Após uma reinicialização, seu saldo fica em zero por algum tempo.** Cada vez que o aplicativo inicia, ele reconstrói a carteira a partir de `secret.seed` e analisa novamente a chain desde o bloco 0 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Até que a análise alcance suas transações, seu saldo e seu stake aparecem como 0. Nesta execução, eles voltaram cerca de 15 minutos após uma reinicialização. A carteira do faucet é analisada novamente da mesma forma ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), e durante a análise a aba Faucet Wallet mostrou um saldo muito alto. Ignore ambos até que Wallet Sync seja concluído.

## Passo 3: Obtenha alguns cTAZ

### Minere

Segundo as notas de lançamento, o aplicativo começa a fazer mineração com CPU para sua própria carteira assim que está sincronizado. Você não precisa ativar nada. As moedas mineradas vão para um endereço transparente da sua própria carteira ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Se ele encontra um bloco é outra questão. As notas avisam que "você pode ser superado por outros minerando mais rapidamente, portanto não há garantia de sucesso". Por padrão, o minerador integrado usa uma única thread de CPU ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Para usar mais threads, defina uma variável de ambiente na mesma janela do PowerShell antes de iniciar o aplicativo ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Esta execução usou quatro:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

A variável dura apenas enquanto essa janela estiver aberta. Com ela definida, o contador de processador do Windows mostrou o nó usando o equivalente ao tempo de quatro a cinco processadores, em porcentagem de um processador lógico:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

O resultado: um Intel Core i5-8350U minerando em quatro threads, desde o início de 8 de outubro até a tarde de 9 de outubro, não encontrou nenhum bloco.

### Ou use o faucet

O aplicativo tem um botão **Receive cTAZ** no canto inferior direito. No código-fonte da versão 14, um clique envia 0,5 cTAZ da carteira do faucet para a sua ([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). O faucet é uma única carteira que todas as cópias do aplicativo carregam ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), e a aba **Faucet Wallet** mostra seu saldo.

O botão fica desativado a menos que o faucet tenha mais de 5,01 cTAZ em moedas blindadas ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). A aba também conta as moedas mineradas pelo faucet, e elas só ficam blindadas em lotes de exatamente 10 cTAZ mais uma taxa ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), portanto a aba pode mostrar bastante enquanto o botão permanece cinza. Nesta execução, ele permaneceu cinza em 8 e 9 de outubro, com "The faucet is mining more funds." ao passar o mouse, enquanto a aba mostrava 14,74695 cTAZ.

**Quando o botão estiver cinza, pergunte ao seu próprio nó.** O nó tem um método de solicitação ao faucet, `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), que não aplica a regra de 5,01 cTAZ do botão. Coloque seu próprio endereço no lugar de `YOUR_ADDRESS` (é o campo `address` de `wallet_spendable_funds`, abaixo):

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

Essa resposta significa que a solicitação foi colocada na fila, não que foi enviada. Nesta execução, os 0,5 cTAZ do faucet foram minerados no bloco 33,306 e ficaram disponíveis para gastar no bloco 33,322. Solicite uma vez: o faucet é compartilhado, e uma segunda solicitação para o mesmo endereço é recusada enquanto a primeira estiver pendente ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Ou peça a outro participante

Qualquer pessoa na rede pode enviar cTAZ a você com o botão **Send** do aplicativo. Nesta execução, outro participante enviou 31 cTAZ. Ele chegou como "Received" com a note "send from user wallet", que é a note que o próprio Send do aplicativo anexa ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Peça no [tópico do fórum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) e forneça apenas seu endereço.

As moedas do faucet e os presentes são suficientes para você aprender staking. Eles não contam para recompensas em ZEC.

### Verifique o que você pode gastar

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Esta foi a resposta quando os 0,5 cTAZ do faucet chegaram, com o endereço abreviado:

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

Os valores estão em zatoshis: 100,000,000 formam um cTAZ. As moedas blindadas precisam de 3 confirmações antes de serem consideradas disponíveis para gastar ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). As moedas do faucet e de outros participantes chegam em `spendable_zats`. As moedas mineradas são transparentes, portanto chegam em `unshielded_zats` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Um bloco após o segundo stake nesta execução, o restante do saldo apareceu em `pending_zats`. Alguns blocos depois, ele estava disponível para gastar novamente.

## Passo 4: Faça staking para um finalizador

### Espere por um Staking Day

O staking, o unstaking e o saque só são aceitos enquanto

```text
block height mod 10,368 < 3,456
```

o que é uma janela de 3,456 blocos no início de cada 10,368. Com a meta de 25 segundos por bloco da rede, isso corresponde a um dia a cada três ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). As primeiras janelas da versão 14 abrem nos blocos 20,736, 31,104, 41,472 e 51,840.

Segundo as notas de lançamento, o aplicativo anuncia o início e o fim de cada Staking Day. Nesta execução, sua lista de blocos mostrou uma linha vermelha "* STAKING DAY END *" entre os blocos 34,559 e 34,560.

**As notas de lançamento dizem duas coisas.** Sua lista de alterações informa "~1 dia para Staking Day e ~3 dias para Staking Cycle", o que corresponde ao código. Mais abaixo, uma seção mantida da Season 1 ainda diz que um Staking Day começa a cada 150 blocos e dura 70. Siga a primeira. A linha de fim acima fica onde a primeira regra fecha a janela (34,560 mod 10,368 = 3,456); sob a segunda regra, o bloco 34,560 ficaria dentro de uma janela.

### Escolha um finalizador

Um finalizador é identificado por sua identidade, uma string que começa com `zfinv1`. A ZecHub publica a identidade do finalizador que opera em [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Copie uma identidade de uma fonte em que você confie. Segundo as notas de lançamento, o aplicativo também lista os finalizadores no painel à direita, com um ícone de cópia à esquerda de cada um.

Depois de fazer staking, o histórico da carteira e o RPC identificam o finalizador por uma chave hexadecimal em vez de sua identidade. Para o finalizador da ZecHub, essa chave é `2941ef23...266aae8f`.

Escolha um finalizador em que você confie. O design não tem slashing automático, mas permite "um hard fork coordenado por usuários que queima todo o stake delegado a um finalizador nomeado" ([Crosslink book, design overview](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

A escolha também decide quem vota. Cada garantia ativa ganha sua parte da recompensa de staking. Se seu finalizador estiver entre os 12 da lista, um décimo dessa parte vai para o finalizador como comissão. Uma garantia apontada para um finalizador fora dos 12 mantém toda a sua parte, mas esse finalizador não vota ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Faça staking

1. Copie a identidade do finalizador.
2. Na aba **Your Wallet**, pressione **Stake**.
3. Pressione **Paste Identity**. A linha acima do botão muda para os primeiros e últimos caracteres da identidade, `[zfinv1j6..YWyzp4YN]` para a da ZecHub. Verifique antes de continuar.
4. Clique em um valor. Os valores vêm em incrementos fixos, o menor é 0,01 cTAZ, e somente os valores que seu saldo cobre ficam acesos. Com 0,5 cTAZ, +0,01 cTAZ e +0,1 cTAZ estavam acesos.

**Nada pede que você confirme, e nada parece acontecer.** Nesta execução, nas palavras do testador: "Cliquei uma vez e nada aconteceu, apenas ficou cinza e voltou a acender." O stake tinha sido efetuado. O histórico da carteira mostrou "Staked @ 33334 to 2941ef23..266aae8f", a taxa foi 0,00015 cTAZ, e a carteira mostrou 0,010 cTAZ Staked. Um segundo stake alguns minutos depois criou uma segunda garantia, no bloco 33,348.

Cada stake cria sua própria garantia de delegação. Os valores fixos e o Staking Day existem para a privacidade: tornam mais difícil distinguir o stake de uma pessoa do de outra.

## Passo 5: Verifique sua posição

### Suas garantias

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Esta foi a resposta no bloco 36,490, dois dias após o staking:

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

A chamada não recebe parâmetros. Ela retorna suas garantias ativas, agrupadas sob a chave do finalizador que cada uma apoia, e as garantias que terminaram o unstaking e podem ser sacadas. Cada garantia mostra o valor em stake (`initial_val`), seu valor atual (`latest_val`) e a transação e a altura do bloco que a criaram. As recompensas são adicionadas à própria garantia: no bloco 36,490, cada garantia de 1,000,000 zatoshis havia crescido para 1,003,451.

**A janela Edit Stake mostra cada garantia dez vezes maior.** Nesta execução, cada garantia de 0.01 cTAZ era exibida como 0.100 cTAZ em sua própria linha e como 0.1003536 cTAZ quando as recompensas começaram, enquanto os totais acima das linhas (0.020 cTAZ, posteriormente 0.02007 cTAZ) correspondiam ao RPC. Siga os totais e o RPC.

A mesma janela exibiu um triângulo de aviso ao lado do finalizador, antes e depois do início da finalidade. No código-fonte, o triângulo significa que seu app não considera esse finalizador online, e um finalizador online recebe um ícone de Wi-Fi ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Mesmo assim, as garantias receberam recompensas.

### Os finalizadores

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Segundo as notas de lançamento, isto informa onde seu nó está no processo de votação e, para cada finalizador, quando seu nó ouviu falar dele pela última vez e como ele vem votando.

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

Depois do início da finalidade, a lista contém os finalizadores na lista ativa. No bloco 36,490, ela continha 12, incluindo o `2941ef23...` da ZecHub, o que corresponde ao limite de 12 finalizadores. Este é o início dessa resposta, cortada após a primeira entrada:

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

Alguns minutos mais tarde, o painel à direita do app mostrou "Finalizers (23)".

### No Linux e macOS

A [fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) fornece a chamada no formato `curl`. Altere o nome do método para as outras chamadas. Este formato não foi usado neste guia:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

No Linux, as notas de lançamento dizem que você provavelmente precisa ter `xclip` instalado antes que copiar e colar funcionem no app.

### Um nome de RPC para ficar de olho

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

O método de staking que ele registra é [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), que recebe uma string contendo a solicitação como JSON, com o finalizador informado pela sua identidade `zfinv1` ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Ele não foi testado neste guia.

## Desfazer o staking e sacar

Uma garantia não pode ser desfeita no dia em que é criada. Ela leva três Staking Days do início ao fim: faça stake em um, unstake em outro posterior e saque em um terceiro. As notas de lançamento acrescentam que uma garantia não pode realizar duas ações de staking no mesmo Staking Day.

*Não testado neste guia. Das notas de lançamento da versão 14:* para fazer unstake, pressione **Edit Stake**, escolha uma garantia da lista Staked Bonds e clique no ícone de corrente. Para sacar em um Staking Day posterior, pressione **Edit Stake**, escolha uma garantia da lista Withdrawable Bonds e clique no ícone de dinheiro. Mover uma garantia para um finalizador diferente, o que as notas chamam de retargeting, é permitido a qualquer momento.

## Onde acompanhar a rede

A [aba Crosslink no ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) reúne as ferramentas em um só lugar, sob um aviso que diz "Staking on this network does not move ZEC":

- Hospedadas, sem precisar de um nó: [Staker Space](https://crosslink.staker.space/), um "painel ao vivo para a testnet cTAZ atual" com a altura, mineradores, taxa de soluções, contagem regressiva para o Staking Day e finalidade, e [ctaz.cash](https://ctaz.cash/), com produção de mineração, a lista de finalizadores, pares e reivindicações de nomes de endereços de staking.
- Na sua própria máquina: `zcash-explorer`, cuja página `/live/crosslink` mostra ativação, atraso de finalidade, a lista e posições de staking, e `crosslink_indexer`, um índice SQLite de um nó Crosslink.

## Erros comuns

**Planejar com base no relógio em vez da altura do bloco.** Os Staking Days são contados em blocos. Acompanhe a contagem regressiva de um painel, não o calendário.

**Fazer staking nos últimos minutos da janela.** A regra é verificada em relação ao bloco que inclui sua transação ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), portanto a garantia precisa ser minerada antes que a janela feche, não apenas enviada.

**Esperar minerar sua stake.** Um minerador de CPU com quatro threads em um Intel Core i5-8350U não encontrou nenhum bloco entre 8 e 9 de outubro. Obtenha seu primeiro cTAZ pelo faucet ou por outro participante.

**Clicar novamente porque nada parecia acontecer.** Cada clique em um valor cria uma nova garantia. Verifique primeiro o histórico da carteira ou `wallet_staking_positions`.

**Entrar em pânico após uma reinicialização.** Seu saldo e sua stake mostram zero até que a carteira seja reescaneada. Espere o Wallet Sync terminar.

**Tratar cTAZ como dinheiro de brincadeira, ou o segredo como inofensivo.** cTAZ é uma moeda de teste, mas o cTAZ que você ganha determina sua parte do ZEC real. Guarde `secret.seed` como guardaria uma carteira.

**Ler instruções antigas.** As notas de lançamento contêm texto de temporadas anteriores ao lado das novas regras. Quando elas divergirem do que seu nó faz, seu nó está certo.

## Páginas relacionadas

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - o design que esta rede testa
- [Shielded Labs](/zcash-organizations/shielded-labs) - a equipe por trás da Crosslink
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - o que uma soma de verificação prova e não prova
- [Zebra Full Node](/zcash-tech/zebra-full-node) - o nó no qual o app Feature Net é construído
- [Zcash Testnet](/using-zcash/testnet) - a rede de testes comum do Zcash, que é uma rede diferente

## Fontes

- [Version 14 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 de outubro de 2026
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 de abril de 2026
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Os passos desta página foram executados com a versão 14 da Feature Net no Windows 11 (versão 10.0.26200.9550), de 8 a 10 de outubro de 2026. Uma afirmação que cita as notas de lançamento ou o código-fonte é extraída deles. Tudo o que está marcado como "não testado" não foi testado.*
