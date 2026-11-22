<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Participe do Crosslink Feature Net

## Resumo

- O Feature Net é a rede de teste pública da Shielded Labs para o [Crosslink](/zcash-tech/crosslink-protocol), a camada de finalidade proposta que adiciona staking ao lado da prova de trabalho do Zcash.
- Ele funciona com uma moeda de teste, o cTAZ. Nada do que você fizer nele movimenta ou coloca em risco ZEC da mainnet.
- Um único aplicativo de desktop é o nó, o minerador, a carteira e o finalizador. Ele minera cTAZ por padrão e tem um botão de faucet.
- Staking, unstaking e saques só funcionam durante um "Staking Day", um dia a cada três. Se você perder um, terá que esperar o próximo.
- Para fazer staking, você cola a identidade de um finalizador e clica em um valor. Este guia usa o finalizador da ZecHub como exemplo.
- Duas chamadas RPC mostram a sua situação: `wallet_staking_positions` e `get_tfl_recency_status`.

*Testado com o Feature Net versão 14 no Windows 11 (versão 10.0.26200.9550), de 8 a 10 de outubro de 2026. O software é um protótipo e muda a cada versão. Se o que você vir for diferente desta página, confie na sua própria execução e, por favor, abra um PR.*

**Atualização, 17 nov 2026: a versão 14 não pode mais se conectar à Feature Net.** [A versão 15](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v15) (13 out) trouxe uma atualização da rede na altura 55.296 de PoW. A partir da [versão 16](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v16), "cada versão para de funcionar duas semanas após seu lançamento", e Shielded Labs planeja lançar uma versão por semana. [A versão 17](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v17) (5 nov) trouxe outra atualização na altura 165.000 de PoW. A versão mais recente quando esta nota foi escrita é a [versão 18](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v18) (17 nov 2026): ela não consegue se comunicar com nós da versão 17, traz uma atualização da rede no bloco 189.000 e para de funcionar no bloco 212.568, por volta de 30 nov. Baixe a [versão mais recente](https://github.com/ShieldedLabs/crosslink_monolith/releases/latest), não a versão 14. As etapas abaixo não foram repetidas nela. Duas diferenças conhecidas: os nomes dos arquivos mudaram, e a RPC de staking agora é `wallet_staking_action` (consulte [Um nome de RPC para acompanhar](#one-rpc-name-to-watch)).

## O que é o Feature Net

O Crosslink é uma proposta e hoje não faz parte do Zcash. O [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) da Shielded Labs diz que ele "precisaria passar pelo processo padrão de governança do Zcash" antes de poder chegar à mainnet. A página [Crosslink Protocol](/zcash-tech/crosslink-protocol) explica o design.

Para testar o design com usuários reais, a Shielded Labs mantém o que chama de [feature nets incentivadas](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "uma série de testnets incentivadas". Existem três funções na rede, e o aplicativo de desktop pode exercer todas elas:

| Função | O que faz |
|---|---|
| Minerador | Produz blocos de prova de trabalho, como no Zcash hoje |
| Staker | Bloqueia cTAZ em uma garantia de delegação e a direciona a um finalizador |
| Finalizador | Vota para finalizar blocos. Seu poder de voto é o stake delegado a ele |

O repositório por trás dele começa com um aviso que vale a pena ler antes de instalar qualquer coisa: ele "existe para provar ideias, não para demonstrar engenharia de produção" e "não é código pronto para produção" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Execute-o em uma máquina onde isso seja aceitável.

### O que mudou na versão 14

A [versão 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) foi lançada em 1º de outubro de 2026. Sua rede começa como prova de trabalho pura e ativa o Crosslink em três etapas ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), também mostrado em [ctaz.cash](https://ctaz.cash/v14)):

| Bloco | O que acontece |
|---|---|
| 20.736 | O staking é aberto |
| 34.560 | A primeira lista de finalizadores é formada a partir dos stakes na chain |
| 36.288 | A finalidade BFT começa e, com ela, as recompensas de staking |

As recompensas de staking começam no último desses blocos. Uma garantia criada antes disso não rende nada até lá ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

A mesma versão reduziu a lista ativa aos 12 finalizadores com mais stake ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) e, nas palavras das notas da versão, deu a eles uma comissão: "10% de todas as recompensas de PoS de um bloco vão para essas comissões, enquanto 90% são distribuídos a todas as garantias de staking".

### cTAZ e ZEC real

O cTAZ ("Crosslink TAZ") é a moeda de teste do Feature Net. Você faz staking de cTAZ, nunca de ZEC.

O ZEC real só entra no final. A Shielded Labs [reservou 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) para as feature nets, e as [notas da versão](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) dizem que o pagamento é feito "de forma proporcional, com base apenas na quantidade de cTAZ que cada participante ganhou por meio de mineração ou staking". Duas consequências:

- **Moedas do faucet não contam.** O cTAZ que você recebeu, do faucet ou de qualquer outra pessoa, não rende nada só por estar na sua carteira. Só contam as recompensas de bloco da mineração e do staking.
- **Os pagamentos precisam ser solicitados, não são automáticos.** A Shielded Labs anuncia cada rodada no [tópico do fórum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Para a Rodada 2, ela pediu que os participantes enviassem a chave de visualização da sua carteira e um endereço da mainnet até 4 de outubro de 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). A rede em que a versão 14 roda, aquela em que este guia entra, foi anunciada como Rodada 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Antes de começar

- **Um computador que você possa deixar ligado.** A versão 14 tinha compilações para Windows, macOS, Ubuntu e Arch Linux. As versões 17 e 18 têm compilações para Windows, macOS e Ubuntu. Este guia foi executado em Windows, em um PC com processador Intel Core i5-8350U.
- **Um Staking Day.** Confira quando o próximo começa antes de planejar qualquer coisa. [O painel da Staker Space](https://crosslink.staker.space/) faz a contagem regressiva.
- **Nada mais.** Sem ZEC, sem conta e sem cadastro.

## Passo 1: Baixe o aplicativo e verifique o arquivo

1. Abra [último lançamento](https://github.com/ShieldedLabs/crosslink_monolith/releases/latest) e role até **Assets**. Este guia foi executado com a [versão 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), que já não pode mais ingressar na rede.
2. Baixe o arquivo para o seu sistema. No Windows, ele termina em `_win32.exe`: `zebrad_v14_win32.exe` no comando abaixo, `zebra-crosslink_v18_win32.exe` na versão 18. Use o nome e o digest do seu próprio arquivo nos comandos a seguir.
3. Compare o SHA-256 do arquivo com o digest que GitHub mostra ao lado desse asset.

No Windows, no PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

O digest que o GitHub mostra para esse arquivo é `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Hexadecimal não diferencia maiúsculas de minúsculas, então as letras maiúsculas acima não são problema. Para deixar o shell fazer a comparação no lugar dos seus olhos:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Saiba quanto vale essa verificação. A versão não tem assinatura, então um hash correspondente diz que o download está completo e que é o arquivo que o GitHub está servindo. Ele não diz quem o compilou. [Verificando versões do Zcash](/guides/verifying-zcash-releases) explica a diferença.

## Passo 2: Inicie o nó e deixe-o sincronizar

Inicie o aplicativo a partir de um terminal, para que as mensagens de inicialização fiquem na tela. Use uma janela comum do PowerShell, não uma aberta com "Executar como administrador": este é um software protótipo sem assinatura e não precisa de direitos de administrador.

```powershell
.\zebrad_v14_win32.exe
```

Uma janela com o título "Zcash Crosslink Visualizer" se abre. A carteira fica à esquerda, com as abas **Your Wallet** e **Faucet Wallet**, a chain é desenhada no meio e os finalizadores são listados à direita. O terminal continua exibindo o log do nó. Deixe os dois abertos enquanto usa a rede.

As notas da versão têm um link para um [vídeo da instalação no Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

O aplicativo guarda seus dados em uma pasta de cache: `%LOCALAPPDATA%\zebra` no Windows, `~/.cache/zebra` no Linux e `~/Library/Caches/zebra` no macOS, de acordo com as notas da versão.

**Guarde o segredo só para você.** Essa pasta contém um arquivo chamado `secret.seed`. O aplicativo o cria na primeira inicialização ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) e deriva dele a sua carteira e a sua identidade de finalizador ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). O aplicativo também tem um botão **Copy Seed** que coloca o mesmo segredo na sua área de transferência. Quem tiver qualquer um dos dois controla a sua carteira. Nunca os cole em um chat, em um post de fórum ou em uma captura de tela.

### Como saber se você está sincronizado

As notas da versão dizem que "não há monitoramento integrado de quão perto da ponta da rede você está sincronizado". A versão 14 tem algum: o menu suspenso **Network Info** no topo da janela tem linhas para PoW Height, Wallet Sync e Blocks Behind Known PoW ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Compare a sua altura com a mostrada no [Staker Space](https://crosslink.staker.space/) ou em [ctaz.cash](https://ctaz.cash/).

O nó também responde via RPC:

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

A porta RPC `127.0.0.1:8232` fica aberta por padrão nesta build e não precisa de senha ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Ela escuta apenas na sua própria máquina, e qualquer coisa rodando nessa máquina pode chamá-la.

Nesta execução, a primeira sincronização, do bloco 0 até a ponta em cerca do bloco 28.400, levou aproximadamente 50 minutos.

**Depois de reiniciar, o seu saldo aparece como zero por um tempo.** Cada vez que o aplicativo inicia, ele reconstrói a carteira a partir de `secret.seed` e escaneia a chain de novo a partir do bloco 0 ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Até o escaneamento chegar às suas transações, o seu saldo e o seu stake aparecem como 0. Nesta execução, eles voltaram cerca de 15 minutos depois de uma reinicialização. A carteira do faucet é escaneada de novo da mesma forma ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), e durante o escaneamento a aba Faucet Wallet mostrou um saldo muito alto. Ignore os dois até o Wallet Sync estar completo.

## Passo 3: Consiga cTAZ

### Minere

De acordo com as notas da versão, o aplicativo começa a minerar com a CPU para a sua própria carteira assim que está sincronizado. Você não precisa ativar nada. As moedas mineradas vão para um endereço transparente da sua própria carteira ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Se ele vai encontrar um bloco é outra questão. As notas avisam que "você pode ser superado por outros que mineram mais rápido, então não há garantia de sucesso". Por padrão, o minerador integrado usa uma única thread da CPU ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Para usar mais threads, defina uma variável de ambiente na mesma janela do PowerShell antes de iniciar o aplicativo ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Esta execução usou quatro:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

A variável dura apenas enquanto a janela estiver aberta. Com ela definida, o contador de processador do Windows mostrou o nó usando o equivalente a quatro a cinco processadores, em porcentagem de um processador lógico:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

O resultado: um Intel Core i5-8350U minerando com quatro threads, do início de 8 de outubro até a tarde de 9 de outubro, não encontrou nenhum bloco.

### Ou use o faucet

O aplicativo tem um botão **Receive cTAZ** no canto inferior direito. No código-fonte da versão 14, cada clique envia 0,5 cTAZ da carteira do faucet para a sua ([valor](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [envio](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). O faucet é uma única carteira que toda cópia do aplicativo carrega ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), e a aba **Faucet Wallet** mostra o saldo dela.

O botão fica desativado a menos que o faucet tenha mais de 5,01 cTAZ em moedas blindadas ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). A aba também conta as moedas mineradas do faucet, e elas só são blindadas em lotes de exatamente 10 cTAZ mais uma taxa ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), então a aba pode mostrar bastante saldo enquanto o botão continua cinza. Nesta execução, ele ficou cinza em 8 e 9 de outubro, com "The faucet is mining more funds." ao passar o mouse, enquanto a aba mostrava 14,74695 cTAZ.

**Quando o botão estiver cinza, peça ao seu próprio nó.** O nó tem um método de solicitação ao faucet, `requestfaucetdonation` ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), que não aplica a regra de 5,01 cTAZ do botão. Coloque o seu próprio endereço no lugar de `YOUR_ADDRESS` (é o campo `address` de `wallet_spendable_funds`, abaixo):

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

Essa resposta significa que a solicitação entrou na fila, não que foi enviada. Nesta execução, os 0,5 cTAZ do faucet foram minerados no bloco 33.306 e ficaram disponíveis para gasto no bloco 33.322. Peça uma vez só: o faucet é compartilhado, e uma segunda solicitação para o mesmo endereço é recusada enquanto a primeira estiver pendente ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Ou peça a outro participante

Qualquer pessoa na rede pode enviar cTAZ para você com o botão **Send** do aplicativo. Nesta execução, outro participante enviou 31 cTAZ. Eles chegaram como "Received" com a note "send from user wallet", que é a note que o próprio Send do aplicativo anexa ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Peça no [tópico do fórum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) e informe apenas o seu endereço.

Moedas do faucet e presentes são suficientes para aprender staking. Elas não contam para as recompensas em ZEC.

### Verifique o que você pode gastar

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Esta foi a resposta depois que os 0,5 cTAZ do faucet chegaram, com o endereço abreviado:

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

Os valores estão em zatoshis: 100.000.000 formam um cTAZ. Moedas blindadas precisam de 3 confirmações antes de contarem como disponíveis para gasto ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). As moedas do faucet e de outros participantes caem em `spendable_zats`. As moedas mineradas são transparentes, então caem em `unshielded_zats` ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Um bloco depois do segundo stake nesta execução, o restante do saldo apareceu em `pending_zats`. Alguns blocos depois, ele estava disponível para gasto de novo.

## Passo 4: Faça staking para um finalizador

### Espere um Staking Day

Staking, unstaking e saques só são aceitos enquanto

```text
block height mod 10,368 < 3,456
```

o que é uma janela de 3.456 blocos no início de cada 10.368. Com o tempo-alvo de bloco da rede de 25 segundos, isso dá um dia a cada três ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). As primeiras janelas da versão 14 abrem nos blocos 20.736, 31.104, 41.472 e 51.840.

De acordo com as notas da versão, o aplicativo anuncia o início e o fim de cada Staking Day. Nesta execução, a lista de blocos mostrou uma linha vermelha "* STAKING DAY END *" entre os blocos 34.559 e 34.560.

**As notas da versão dizem duas coisas.** A lista de mudanças informa "~1 dia para o Staking Day e ~3 dias para o Staking Cycle", o que corresponde ao código. Mais abaixo, uma seção herdada da Temporada 1 ainda diz que um Staking Day começa a cada 150 blocos e dura 70. Siga a primeira. A linha de fim acima fica onde a primeira regra fecha a janela (34.560 mod 10.368 = 3.456); pela segunda regra, o bloco 34.560 cairia dentro de uma janela.

### Escolha um finalizador

Um finalizador é identificado pela sua identidade, uma string que começa com `zfinv1`. A ZecHub publica a identidade do finalizador que mantém em [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Copie uma identidade de uma fonte em que você confia. De acordo com as notas da versão, o aplicativo também lista os finalizadores no seu painel da direita, com um ícone de cópia à esquerda de cada um.

Depois que você faz staking, o histórico da carteira e o RPC identificam o finalizador por uma chave hexadecimal em vez da identidade. Para o finalizador da ZecHub, essa chave é `2941ef23...266aae8f`.

Escolha um finalizador em que você confia. O design não tem slashing automático, mas permite "um hard fork coordenado pelos usuários que queima todo o stake delegado a um finalizador específico" ([livro do Crosslink, visão geral do design](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

A escolha também decide quem vota. Toda garantia ativa recebe a sua parte da recompensa de staking. Se o finalizador dela estiver entre os 12 da lista, um décimo dessa parte vai para o finalizador como comissão. Uma garantia direcionada a um finalizador fora dos 12 fica com a parte inteira, mas esse finalizador não vota ([fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Faça staking

1. Copie a identidade do finalizador.
2. Na aba **Your Wallet**, clique em **Stake**.
3. Clique em **Paste Identity**. A linha acima do botão muda para os primeiros e os últimos caracteres da identidade, `[zfinv1j6..YWyzp4YN]` no caso da ZecHub. Confira antes de continuar.
4. Clique em um valor. Os valores vêm em etapas fixas, o menor é 0,01 cTAZ, e só ficam acesos os valores que o seu saldo cobre. Com 0,5 cTAZ, ficaram acesos +0,01 cTAZ e +0,1 cTAZ.

**Nada pede confirmação, e parece que nada acontece.** Nesta execução, nas palavras do testador: "Cliquei uma vez e nada aconteceu, só ficou cinza e acendeu de novo." O stake tinha sido feito. O histórico da carteira mostrou "Staked @ 33334 to 2941ef23..266aae8f", a taxa foi de 0,00015 cTAZ, e a carteira mostrou 0,010 cTAZ em staking. Um segundo stake, alguns minutos depois, criou uma segunda garantia, no bloco 33.348.

Cada stake cria a sua própria garantia de delegação. Os valores fixos e o Staking Day existem por causa da privacidade: eles tornam mais difícil distinguir o stake de uma pessoa do de outra.

## Passo 5: Verifique sua posição

### Suas garantias

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Esta foi a resposta no bloco 36.490, dois dias depois do staking:

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

A chamada não recebe parâmetros. Ela retorna suas garantias ativas, agrupadas sob a chave do finalizador que cada uma apoia, e as garantias que já terminaram o unstaking e podem ser sacadas. Cada garantia mostra o valor em staking (`initial_val`), seu valor atual (`latest_val`) e a transação e a altura de bloco que a criaram. As recompensas são somadas à própria garantia: no bloco 36.490, cada garantia de 1.000.000 zatoshis tinha crescido para 1.003.451.

**A janela Edit Stake mostra cada garantia dez vezes maior do que é.** Neste teste, cada garantia de 0,01 cTAZ aparecia como 0,100 cTAZ na própria linha, e como 0,1003536 cTAZ depois que as recompensas começaram, enquanto os totais acima das linhas (0,020 cTAZ, depois 0,02007 cTAZ) batiam com o RPC. Confie nos totais e no RPC.

A mesma janela colocou um triângulo de alerta ao lado do finalizador, antes e depois do início da finalidade. No código-fonte, o triângulo significa que seu app não considera aquele finalizador online, e um finalizador online recebe um ícone de Wi-Fi no lugar ([código-fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). As garantias renderam recompensas mesmo assim.

### Os finalizadores

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Segundo as notas de lançamento, esta chamada informa em que ponto do processo de votação seu nó está e, para cada finalizador, quando seu nó recebeu notícias dele pela última vez e como ele vem votando.

Antes do bloco 36.288, todos os campos ficam zerados e a lista fica vazia. Esta foi a resposta no bloco 33.354:

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

Depois que a finalidade começa, a lista contém os finalizadores do roster. No bloco 36.490 havia 12, entre eles `2941ef23...` de ZecHub, o que corresponde ao limite de 12 do roster. Este é o início daquela resposta, cortado após a primeira entrada:

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

Alguns minutos depois, o painel do lado direito do app mostrava "Finalizers (23)".

### No Linux e no macOS

O [código-fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) traz a chamada no formato `curl`. Troque o nome do método para as outras chamadas. Este formato não foi executado para este guia:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

No Linux, as notas de lançamento dizem que você provavelmente precisa ter o `xclip` instalado para que copiar e colar funcionem no app.

### Um nome de RPC para ficar de olho

As notas de lançamento da versão 14 descrevem uma chamada de staking chamada `wallet_staking_action` que recebe um objeto. O código-fonte da versão 14 não tem nenhum método com esse nome, e neste teste o nó respondeu:

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

O método de staking que ele registra é [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), que recebe uma única string contendo a solicitação em JSON, com o finalizador indicado pela sua identidade `zfinv1` ([código-fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Ele não foi testado para este guia.

**Alterado após a versão 14.** A partir da versão 15, o nó registra `wallet_staking_action` e não tem mais `staking_command` ([fonte da versão 18](https://github.com/ShieldedLabs/crosslink_monolith/blob/v18/zebra-crosslink/zebra-rpc/src/methods.rs#L620-L622)). Ele recebe um objeto com exatamente um de quatro formatos: `CreateNewDelegationBond`, `RetargetDelegationBond`, `BeginDelegationUnbonding` ou `WithdrawDelegationBond`, e o finalizador é informado como uma chave hexadecimal de 64 caracteres ([notas de lançamento da versão 15](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v15)). A partir do bloco 189,000, cada ação de staking também informa a versão atual da garantia. Assim, uma ação criada com base em uma garantia desatualizada é recusada, e as carteiras precisam executar a versão 18 ([notas de lançamento da versão 18](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v18)). Isso também não foi testado para este guia.

## Fazer unstake e sacar

Uma garantia não pode ser desfeita no mesmo dia em que é criada. O processo completo leva três Staking Days: faça o stake em um, o unstake em um posterior e o saque em um terceiro. As notas de lançamento acrescentam que uma mesma garantia não pode passar por duas ações de staking no mesmo Staking Day.

*Não executado para este guia. Das notas de lançamento da versão 14:* para fazer o unstake, clique em **Edit Stake**, escolha uma garantia na lista Staked Bonds e clique no ícone de corrente. Para sacar em um Staking Day posterior, clique em **Edit Stake**, escolha uma garantia na lista Withdrawable Bonds e clique no ícone de dinheiro. Mover uma garantia para outro finalizador, o que as notas chamam de retargeting, é permitido a qualquer momento.

## Onde acompanhar a rede

A aba [Crosslink em ZecHub: ferramentas](https://zechub.wiki/tools?tool=crosslink) reúne as ferramentas em um só lugar, abaixo de um aviso que diz "Staking on this network does not move ZEC":

- Hospedadas, sem precisar de nó: [Staker Space](https://crosslink.staker.space/), um "painel ao vivo da testnet cTAZ atual" com a altura, os mineradores, a taxa de soluções, a contagem regressiva do Staking Day e a finalidade, e [ctaz.cash](https://ctaz.cash/), com a produção da mineração, o roster de finalizadores, os peers e os registros de nomes de endereços de staking.
- Na sua própria máquina: `zcash-explorer`, cuja página `/live/crosslink` mostra a ativação, o atraso da finalidade, o roster e as posições de staking, e `crosslink_indexer`, um índice SQLite de um nó Crosslink.

## Erros comuns

**Planejar pelo relógio em vez da altura de bloco.** Os Staking Days são contados em blocos. Acompanhe a contagem regressiva de um painel, não o calendário.

**Fazer o stake nos últimos minutos da janela.** A regra é verificada no bloco que inclui sua transação ([código-fonte](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), então o stake precisa ser minerado antes de a janela fechar, não apenas enviado.

**Esperar minerar o valor do seu stake.** Um minerador de CPU com quatro threads em um Intel Core i5-8350U não encontrou nenhum bloco entre 8 e 9 de outubro. Consiga seus primeiros cTAZ no faucet ou com outro participante.

**Clicar de novo porque parecia que nada tinha acontecido.** Cada clique em um valor cria uma nova garantia. Verifique antes o histórico da carteira ou `wallet_staking_positions`.

**Entrar em pânico depois de reiniciar.** Seu saldo e seu stake aparecem zerados até a carteira terminar de reescanear. Espere o Wallet Sync terminar.

**Tratar cTAZ como dinheiro de brincadeira, ou o segredo como inofensivo.** O cTAZ é uma moeda de teste, mas os cTAZ que você ganha definem sua parte de ZEC de verdade. Proteja `secret.seed` como protegeria uma carteira.

**Seguir instruções antigas.** As notas de lançamento trazem textos de temporadas anteriores ao lado das regras novas. Quando elas discordarem do que seu nó faz, quem está certo é o seu nó.

## Páginas relacionadas

- [Protocolo Crosslink](/zcash-tech/crosslink-protocol) - o design que esta rede testa
- [Shielded Labs](/zcash-organizations/shielded-labs) - a equipe por trás de Crosslink
- [Verificação de releases do Zcash](/guides/verifying-zcash-releases) - o que um checksum prova e o que não prova
- [Nó integral Zebra](/zcash-tech/zebra-full-node) - o nó sobre o qual o app Feature Net é construído
- [Testnet Zcash](/using-zcash/testnet) - a rede de teste comum do Zcash, que é uma rede diferente

## Fontes

- [Notas de lançamento da versão 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 de outubro de 2026
- [Crosslink: Feature Nets incentivadas](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 de abril de 2026
- [Crosslink: Feature Net incentivadas](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Fórum da comunidade Zcash
- [FAQ do Crosslink](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [O livro Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Os passos desta página foram executados com o Feature Net versão 14 no Windows 11 (versão 10.0.26200.9550), de 8 a 10 de outubro de 2026. Toda afirmação que cita as notas de lançamento ou o código-fonte foi tirada deles. Tudo o que está marcado como "não executado" não foi testado.*
