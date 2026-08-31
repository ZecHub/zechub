<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transações

ZEC é um ativo digital amplamente utilizado para pagamentos, oferecendo fortes funcionalidades de privacidade que o tornam adequado para várias transações, como pagar a amigos, fazer compras ou doar. Para maximizar a privacidade e a segurança, é essencial compreender como funcionam os diferentes tipos de transações dentro da Zcash.

## TL;DR

- A Zcash suporta dois tipos de transação: **shielded**, que mantém os detalhes privados, e **transparent**, que os regista publicamente.
- Os endereços shielded começam por `u` ou `z`. Os endereços transparent começam por `t` e comportam-se de forma muito semelhante a um endereço Bitcoin.
- A escolha é sua em cada pagamento. A privacidade é uma opção que a Zcash lhe dá, não uma definição que outra pessoa decide por si.
- Levantar fundos de uma exchange é o ponto mais comum onde as pessoas perdem privacidade. Se a exchange só suportar levantamentos transparent, proteja os fundos você mesmo assim que chegarem.
- As taxas seguem a [ZIP 317](https://zips.z.cash/zip-0317) e aumentam com o tamanho da transação. As wallets que ainda enviam a antiga taxa fixa podem ver as suas transações atrasadas.
- A maioria das transações Zcash tem uma altura de expiração ao abrigo da [ZIP 203](https://zips.z.cash/zip-0203). Se uma transação expirar antes de ser minerada, não poderá ser confirmada após essa altura de expiração e poderá ter de ser enviada novamente.

## Transações Shielded

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

As transações shielded ocorrem quando move ZEC para a sua wallet shielded. O endereço da sua wallet shielded começa por `u` ou `z`. Ao enviar transações shielded, tanto você como as pessoas com quem transaciona podem manter um nível de privacidade que não é possível em redes de pagamentos públicas por defeito.

Enviar uma transação shielded é mais fácil quando utiliza uma wallet que suporta a rede Zcash atual e os pools shielded atuais. Antes de confiar numa wallet para privacidade, verifique se suporta envio shielded, receção shielded e o pool que planeia utilizar. Ao levantar ZEC de uma exchange, verifique se a exchange suporta levantamentos shielded ou transparent. Se só suportar levantamentos transparent, mova os fundos para uma wallet com capacidade shielded depois de chegarem.

Utilizar transações shielded para enviar e receber fundos é a melhor forma de preservar a privacidade e reduzir o risco de expor dados de pagamento.

## Transações Transparent

As transações transparent funcionam de forma semelhante às transações Bitcoin. Os detalhes da transação são visíveis publicamente na blockchain, incluindo endereços transparent e valores transparent. As transações transparent devem ser evitadas quando a privacidade é uma prioridade.

Os endereços transparent continuam a ser úteis em algumas situações, especialmente quando uma exchange ou serviço não suporta endereços shielded. Se receber ZEC num endereço transparent, considere protegê-lo antes de fazer pagamentos posteriores.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Uma Forma Simples de Visualizar

Uma transação transparent é um postal. O carteiro entrega-o, mas qualquer pessoa que o manuseie pelo caminho pode ler a mensagem, ver quem o enviou e ver quem o recebe.

Uma transação shielded é um envelope selado. O serviço postal continua a confirmar que uma carta real com selo real passou pelo sistema, e ninguém pode falsificá-la nem enviar a mesma carta duas vezes. O que o envelope contém fica entre o remetente e o destinatário.

A parte importante é que a Zcash lhe permite decidir qual enviar, pagamento a pagamento.

## Taxas da Zcash

A Zcash não utiliza unidades de gas ao estilo da Ethereum. As taxas de transação da Zcash são pagas em ZEC, normalmente medidas em **zatoshis**. Um ZEC equivale a 100.000.000 zatoshis.

A [ZIP 317](https://zips.z.cash/zip-0317) define um mecanismo de taxa convencional que escala com a complexidade da transação. Em vez de todas as transações utilizarem a antiga taxa fixa de 1.000 zatoshis, a taxa convencional baseia-se em "ações lógicas", como entradas, saídas e ações shielded. As transações simples começam frequentemente em cerca de 10.000 zatoshis, ou 0,0001 ZEC, e transações mais complexas podem exigir mais.

Na maioria das wallets atuais, os utilizadores não devem precisar de calcular manualmente as taxas ZIP 317. A wallet deve escolher automaticamente uma taxa apropriada. Se uma wallet ainda usar a antiga taxa fixa ou permitir definir uma taxa muito abaixo da taxa convencional ZIP 317, a transação pode ser atrasada, despriorizada, descartada por alguns nós, ou falhar no retransmissão de forma fiável.

## Resolução de Problemas com Transações Presas

Uma transação Zcash não é definitiva só porque aparece na sua wallet. Torna-se definitiva para uso normal depois de ser minerada num bloco e receber confirmações suficientes para a sua situação. Exchanges e serviços podem exigir mais confirmações do que as que uma wallet mostra por defeito.

Utilize esta árvore de decisão antes de reenviar:

1. **A sua wallet mostra um ID de transação?**
   - Se não, a wallet pode ainda não ter criado nem transmitido a transação. Verifique o estado de sincronização, a ligação à internet, a versão da wallet e qualquer mensagem de erro da wallet.
   - Se sim, copie o ID da transação e continue.
2. **A transação está confirmada num bloco?**
   - Se sim, aguarde pelo número de confirmações exigido pela sua wallet, exchange, comerciante ou serviço.
   - Se não, continue.
3. **A transação atingiu a sua altura de expiração?**
   - Se não, ainda não reenvie manualmente o mesmo pagamento. A transação original ainda pode ser confirmada.
   - Se sim, a transação não pode ser minerada após essa altura de expiração. A sua wallet pode marcá-la como expirada ou falhada, e poderá ter de criar uma nova transação.
4. **A transação aparece num servidor ou explorador mas não noutro?**
   - Trate isto como uma questão de visibilidade da rede, não como prova de que a transação falhou. Diferentes nós podem ter visões diferentes da mempool.
   - Espere, ressincronize a sua wallet, ou mude para outro servidor de confiança se a sua wallet suportar isso.
5. **A transação desapareceu depois de aparecer como confirmada?**
   - Uma curta reorganização da cadeia pode remover temporariamente uma transação da melhor cadeia.
   - Aguarde por mais blocos. Se a transação reaparecer, continue à espera de confirmações. Se não reaparecer e mais tarde expirar, crie uma nova transação.
6. **A wallet está a pedir-lhe para reenviar?**
   - Siga a orientação atual da wallet apenas depois de verificar que a transação anterior está expirada, falhou ou já não é válida.
   - Se não tiver a certeza, peça apoio antes de voltar a enviar.

## Pendente, Expirada, Descartada e Reorganizada

- **Pendente** significa que a transação foi criada ou transmitida mas ainda não foi minerada num bloco.
- **Expirada** significa que a altura de expiração da transação já passou. Ao abrigo da ZIP 203, uma transação com altura de expiração não pode ser minerada após essa altura.
- **Descartada** significa que um ou mais nós deixaram de manter a transação na sua mempool. Isto pode acontecer devido a expiração, taxas baixas, política de mempool, comportamento de reinício, ou diferenças de retransmissão.
- **Reorganizada** significa que um bloco que anteriormente continha a transação já não faz parte da melhor cadeia. A transação pode voltar a ser minerada mais tarde, ou pode regressar ao estado pendente se continuar válida.

## Quando Não Reenviar

Não reenvie imediatamente só porque uma transação está pendente, lenta, ou em falta num explorador. Reenviar demasiado cedo pode causar confusão e, dependendo da forma como a wallet constrói o novo pagamento, pode haver o risco de pagar duas vezes.

Espere ou peça apoio primeiro quando:

- A transação tem um ID de transação e não expirou.
- Um servidor mostra-a enquanto outro não.
- Foi minerada recentemente mas perdeu confirmações após uma possível reorganização.
- O serviço recetor ainda não terminou a contagem das confirmações.
- A sua wallet ainda está a sincronizar.

Normalmente é mais seguro reenviar apenas depois de a wallet marcar claramente a transação como expirada ou falhada, ou depois de o apoio confirmar que a transação original não pode ser confirmada.

## Verificações Seguras para a Privacidade

Pode verificar o estado básico de uma transação sem expor mais informação do que o necessário:

- Verifique se a sua wallet está totalmente sincronizada.
- Verifique se a aplicação da wallet está atualizada.
- Verifique se a transação tem um ID de transação.
- Verifique se a transação está confirmada, pendente, expirada ou falhada.
- Verifique a altura atual do bloco e compare-a com a altura de expiração da transação, se a sua wallet a mostrar.
- Para transações transparent, um explorador de blocos pode mostrar a transação pública, endereços, valores e confirmações.
- Para transações shielded, um explorador de blocos pode mostrar que uma transação existe, mas não pode mostrar remetente shielded, destinatário, montante, nem detalhes de memo.

## O Que Não Partilhar Publicamente

Nunca publique estes elementos em chat público, redes sociais, ou num rastreador de issues:

- Frase-semente ou frase de recuperação
- Chave de gasto, chave privada, ou cópia de segurança da wallet
- Full Viewing Key
- Capturas de ecrã que mostrem saldos, endereços completos, memos, códigos QR, ou detalhes da conta da exchange
- Documentos de identificação pessoal ou registos de recuperação de conta

Um ID de transação é público na cadeia, mas ainda assim pode ligar o seu pedido de apoio à sua identidade. Se a privacidade for importante, partilhe-o apenas com um canal de apoio de confiança.

## O Que as Equipas de Apoio Precisam

Ao pedir ajuda ao apoio da wallet, exchange, ou serviço, partilhe apenas a informação mínima útil:

- Nome da wallet ou do serviço
- Versão da aplicação e sistema operativo
- Se a transação é shielded, transparent, ou entre endereços shielded e transparent
- ID da transação, se se sentir confortável em partilhá-lo
- Hora aproximada do envio
- Se a wallet está totalmente sincronizada
- Estado atual mostrado pela wallet
- Mensagem de erro exata, com os dados privados removidos
- Captura de ecrã com saldos, endereços, memos e detalhes da conta ocultos

As equipas de apoio não precisam da sua frase-semente, chave de gasto, chave privada, ou Full Viewing Key.

## Erros Comuns

- **Assumir que qualquer wallet que liste ZEC pode enviá-lo de forma privada.** Várias wallets multi-moeda suportam apenas o lado transparent da Zcash. Verifique os pools suportados pela wallet antes de confiar nela para privacidade. A página [Wallets](https://zechub.wiki/using-zcash/wallets) lista isso para cada opção.
- **Levantar para um endereço transparent e deixar lá os fundos.** O próprio levantamento é público, e qualquer movimento posterior a partir desse endereço também permanece público. Proteja os fundos assim que chegarem.
- **Tratar a privacidade como algo que se ativa uma vez.** Cada transação é uma escolha separada. Enviar shielded hoje não desfaz um pagamento transparent que fez na semana passada.
- **Reutilizar um endereço transparent para tudo.** Como a atividade transparent é permanentemente visível, um único endereço reutilizado vai ligando gradualmente pagamentos que não tinham motivo para estar ligados.
- **Enviar com uma taxa predefinida desatualizada.** As wallets que não adotaram a ZIP 317 podem ainda enviar a antiga taxa fixa, o que pode deixar uma transação sem confirmação.
- **Reenviar antes da expiração.** Uma transação pendente ainda pode ser confirmada até expirar. Verifique o estado da expiração antes de criar outro pagamento.

## Nota

Tenha em conta que a forma mais segura de utilizar ZEC é usar transações shielded sempre que o remetente, o destinatário, a wallet e o serviço as suportarem. Algumas wallets e exchanges suportam [endereços Unified Address](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), que podem combinar vários tipos de recetor Zcash num único endereço.

## Recursos

- [ZIP 203: Expiração de Transação](https://zips.z.cash/zip-0203)
- [ZIP 317: Mecanismo Proporcional de Taxa de Transferência](https://zips.z.cash/zip-0317)
- [ZIPs da Zcash](https://zips.z.cash/)

## Páginas Relacionadas

- [Wallets](/using-zcash/wallets) - que wallets suportam envio shielded, e quais são apenas transparent
- [Shielded Pools](/using-zcash/shielded-pools) - Sapling e Orchard, os pools onde os seus fundos shielded residem
- [Memos](/using-zcash/memos) - mensagens encriptadas que podem acompanhar uma transação shielded
- [Endereços Transparent de Exchange](/using-zcash/transparent-exchange-addresses) - endereços TEX e porque as exchanges os utilizam
- [Exchanges com Custódia](/using-zcash/custodial-exchanges) - que exchanges suportam levantamentos shielded

## Conversor de ZEC para ZAT
