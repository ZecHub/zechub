<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transações

ZEC é um ativo digital amplamente utilizado para pagamentos, oferecendo fortes funcionalidades de privacidade que o tornam adequado para várias transações, como pagar a amigos, fazer compras ou doações. Para maximizar a privacidade e a segurança, é essencial compreender como funcionam os diferentes tipos de transações dentro do Zcash.

## Resumo

- Zcash suporta dois tipos de transação: **blindadas**, que mantêm os detalhes privados, e **transparentes**, que os registam publicamente.
- Os endereços blindados começam por `u` ou `z`. Os endereços transparentes começam por `t` e comportam-se de forma muito semelhante a um endereço Bitcoin.
- A escolha é sua em cada pagamento. A privacidade é uma opção que o Zcash lhe dá, não uma definição que outra pessoa decide por si.
- Levantar fundos de uma exchange é o ponto mais comum em que as pessoas perdem privacidade. Se a exchange suportar apenas levantamentos transparentes, proteja os fundos por si próprio assim que chegarem.
- As taxas seguem a [ZIP 317](https://zips.z.cash/zip-0317) e aumentam com o tamanho da transação. As wallets que ainda enviam a antiga taxa fixa podem ver as suas transações atrasadas.
- A maioria das transações Zcash tem uma altura de expiração ao abrigo da [ZIP 203](https://zips.z.cash/zip-0203). Se uma transação expirar antes de ser minerada, não poderá ser confirmada após essa altura de expiração e poderá ter de ser enviada novamente.

## Transações Blindadas

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

As transações blindadas ocorrem quando move ZEC para a sua wallet blindada. O endereço da sua wallet blindada começa por `u` ou `z`. Ao enviar transações blindadas, você e as pessoas com quem transaciona podem manter um nível de privacidade impossível em redes de pagamento públicas por predefinição.

Enviar uma transação blindada é mais fácil quando utiliza uma wallet que suporte a rede Zcash atual e os pools blindados atuais. Antes de confiar numa wallet para privacidade, verifique se suporta envio blindado, receção blindada e o pool que planeia utilizar. Ao levantar ZEC de uma exchange, verifique se a exchange suporta levantamentos blindados ou transparentes. Se suportar apenas levantamentos transparentes, mova os fundos para uma wallet com capacidade blindada após estes chegarem.

Utilizar transações blindadas para enviar e receber fundos é a melhor forma de preservar a privacidade e reduzir o risco de divulgar dados de pagamento.

## Transações Transparentes

As transações transparentes funcionam de forma semelhante às transações Bitcoin. Os detalhes da transação são visíveis publicamente na blockchain, incluindo endereços e valores transparentes. As transações transparentes devem ser evitadas quando a privacidade é uma prioridade.

Os endereços transparentes continuam a ser úteis em algumas situações, especialmente quando uma exchange ou serviço não suporta endereços blindados. Se receber ZEC num endereço transparente, considere protegê-lo antes de efetuar pagamentos posteriores.

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

Uma transação transparente é um postal. O carteiro entrega-o, mas qualquer pessoa que o manuseie ao longo do caminho pode ler a mensagem, ver quem o enviou e quem o recebe.

Uma transação blindada é um envelope selado. O serviço postal continua a confirmar que uma carta real com franquia real passou pelo sistema, e ninguém pode falsificar uma ou enviar a mesma carta duas vezes. O que o envelope contém fica entre o remetente e o destinatário.

A parte importante é que o Zcash permite-lhe decidir qual enviar, pagamento a pagamento.

## Taxas Zcash

Zcash não utiliza unidades de gas ao estilo do Ethereum. As taxas de transação Zcash são pagas em ZEC, normalmente medidas em **zatoshis**. Um ZEC equivale a 100 000 000 zatoshis.

A [ZIP 317](https://zips.z.cash/zip-0317) define um mecanismo de taxa convencional que escala com a complexidade da transação. Em vez de cada transação utilizar a antiga taxa fixa de 1 000 zatoshis, a taxa convencional baseia-se em “ações lógicas”, como entradas, saídas e ações blindadas. Transações simples começam habitualmente em cerca de 10 000 zatoshis, ou 0,0001 ZEC, e transações mais complexas podem exigir mais.

Na maioria das wallets atuais, os utilizadores não devem precisar de calcular manualmente as taxas ZIP 317. A wallet deve escolher automaticamente uma taxa adequada. Se uma wallet ainda utilizar a antiga taxa fixa ou permitir definir uma taxa muito abaixo da taxa convencional ZIP 317, a transação pode ser atrasada, despriorizada, descartada por alguns nós ou não ser retransmitida de forma fiável.

## Resolução de Problemas de Transações Bloqueadas

Uma transação Zcash não é final apenas porque aparece na sua wallet. Torna-se final para utilização normal depois de ser minerada num bloco e receber confirmações suficientes para a sua situação. Exchanges e serviços podem exigir mais confirmações do que uma wallet mostra por predefinição.

Utilize esta árvore de decisão antes de reenviar:

1. **A sua wallet mostra um ID de transação?**
   - Se não, a wallet pode ainda não ter criado ou transmitido a transação. Verifique o estado de sincronização, a ligação à Internet, a versão da wallet e qualquer mensagem de erro da wallet.
   - Se sim, copie o ID da transação e continue.
2. **A transação está confirmada num bloco?**
   - Se sim, aguarde o número de confirmações exigido pela sua wallet, exchange, comerciante ou serviço.
   - Se não, continue.
3. **A transação atingiu a sua altura de expiração?**
   - Se não, não reenvie manualmente o mesmo pagamento ainda. A transação original ainda poderá ser confirmada.
   - Se sim, a transação não pode ser minerada após essa altura de expiração. A sua wallet pode marcá-la como expirada ou falhada, e poderá precisar de criar uma nova transação.
4. **A transação aparece num servidor ou explorador, mas não noutro?**
   - Trate isto como um problema de visibilidade da rede, e não como prova de que a transação falhou. Diferentes nós podem ter diferentes perspetivas da mempool.
   - Aguarde, volte a sincronizar a sua wallet ou mude para outro servidor de confiança, se a sua wallet o suportar.
5. **A transação desapareceu depois de ter aparecido como confirmada?**
   - Uma reorganização curta da cadeia pode remover temporariamente uma transação da melhor cadeia.
   - Aguarde mais blocos. Se a transação voltar, continue a aguardar confirmações. Se não voltar e expirar mais tarde, crie uma nova transação.
6. **A wallet está a pedir-lhe para reenviar?**
   - Siga as orientações atuais da wallet apenas depois de verificar que a transação anterior expirou, falhou ou deixou de ser válida.
   - Se não tiver a certeza, peça apoio antes de enviar novamente.

## Pendentes, Expiradas, Descartadas e Reorganizadas

- **Pendente** significa que a transação foi criada ou transmitida, mas ainda não foi minerada num bloco.
- **Expirada** significa que a altura de expiração da transação já passou. Ao abrigo da ZIP 203, uma transação com altura de expiração não pode ser minerada após essa altura.
- **Descartada** significa que um ou mais nós já não mantêm a transação na sua mempool. Isto pode acontecer devido à expiração, taxas baixas, política da mempool, comportamento após reinício ou diferenças de retransmissão.
- **Reorganizada** significa que um bloco que anteriormente continha a transação já não faz parte da melhor cadeia. A transação pode voltar a ser minerada mais tarde, ou pode voltar a ficar pendente se continuar válida.

## Quando Não Reenviar

Não reenvie imediatamente apenas porque uma transação está pendente, lenta ou ausente de um explorador. Reenviar demasiado cedo pode causar confusão e, dependendo de como a wallet constrói o novo pagamento, pode implicar o risco de pagar duas vezes.

Aguarde ou procure apoio primeiro quando:

- A transação tem um ID de transação e não expirou.
- Um servidor mostra-a, enquanto outro não.
- Foi minerada recentemente, mas perdeu confirmações após uma possível reorganização.
- O serviço recetor ainda não terminou a contagem das confirmações.
- A sua wallet ainda está a sincronizar.

Normalmente, é mais seguro reenviar apenas depois de a wallet marcar claramente a transação como expirada ou falhada, ou depois de o apoio confirmar que a transação original não pode ser confirmada.

## Verificações Seguras para a Privacidade

Pode verificar o estado básico da transação sem expor mais informação do que o necessário:

- Verifique se a sua wallet está totalmente sincronizada.
- Verifique se a aplicação da wallet está atualizada.
- Verifique se a transação tem um ID de transação.
- Verifique se a transação está confirmada, pendente, expirada ou falhada.
- Verifique a altura atual do bloco e compare-a com a altura de expiração da transação, se a sua wallet a mostrar.
- Para transações transparentes, um explorador de blocos pode mostrar a transação pública, os endereços, os valores e as confirmações.
- Para transações blindadas, um explorador de blocos pode mostrar que uma transação existe, mas não pode mostrar o remetente, destinatário, montante ou detalhes da nota blindados.

## O Que Não Partilhar Publicamente

Nunca publique estes elementos num chat público, redes sociais ou sistema de acompanhamento de problemas:

- Frase-semente ou frase de recuperação
- Chave de gastos, chave privada ou cópia de segurança da wallet
- Chave de visualização completa
- Capturas de ecrã que mostrem saldos, endereços completos, notas, códigos QR ou detalhes da conta da exchange
- Documentos de identidade pessoais ou registos de recuperação de conta

Um ID de transação é público na cadeia, mas ainda pode ligar a sua questão de apoio à sua identidade. Se a privacidade for importante, partilhe-o apenas com um canal de apoio de confiança.

## O Que as Equipas de Apoio Precisam

Ao pedir ajuda ao apoio de uma wallet, exchange ou serviço, partilhe apenas a informação útil mínima:

- Nome da wallet ou serviço
- Versão da aplicação e sistema operativo
- Se a transação é blindada, transparente ou entre endereços blindados e transparentes
- ID da transação, se se sentir à vontade para o partilhar
- Hora aproximada do envio
- Se a wallet está totalmente sincronizada
- Estado atual mostrado pela wallet
- Mensagem de erro exata, com os dados privados removidos
- Captura de ecrã com saldos, endereços, notas e detalhes da conta ocultos

As equipas de apoio não precisam da sua frase-semente, chave de gastos, chave privada ou chave de visualização completa.

## Erros Comuns

- **Assumir que qualquer wallet que liste ZEC consegue enviá-lo de forma privada.** Várias wallets multimoeda suportam apenas o lado transparente do Zcash. Verifique os pools suportados pela wallet antes de confiar nela para privacidade. A página [Wallets](https://zechub.wiki/using-zcash/wallets) lista isto para cada opção.
- **Levantar para um endereço transparente e deixar lá os fundos.** O levantamento em si é público, e todos os movimentos posteriores desse endereço também permanecem públicos. Proteja os fundos assim que chegarem.
- **Tratar a privacidade como algo que se ativa uma vez.** Cada transação é uma escolha separada. Enviar de forma blindada hoje não desfaz um pagamento transparente que fez na semana passada.
- **Reutilizar um endereço transparente para tudo.** Como a atividade transparente é permanentemente visível, um único endereço reutilizado liga gradualmente pagamentos que não tinham motivo para estar ligados.
- **Enviar com uma taxa predefinida desatualizada.** As wallets que não adotaram a ZIP 317 podem ainda enviar a antiga taxa fixa, deixando uma transação sem confirmação.
- **Reenviar antes da expiração.** Uma transação pendente ainda pode ser confirmada até expirar. Verifique o estado de expiração antes de criar outro pagamento.

## Nota

Tenha em atenção que a forma mais segura de utilizar ZEC é através de transações blindadas sempre que o remetente, destinatário, wallet e serviço as suportem. Algumas wallets e exchanges suportam [endereços unificados](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), que podem combinar vários tipos de recetor Zcash num único endereço.

## Recursos

- [ZIP 203: Expiração de Transações](https://zips.z.cash/zip-0203)
- [ZIP 317: Mecanismo de Taxa de Transferência Proporcional](https://zips.z.cash/zip-0317)
- [ZIPs Zcash](https://zips.z.cash/)

## Páginas Relacionadas

- [Wallets](/using-zcash/wallets) - quais wallets suportam envio blindado e quais são apenas transparentes
- [Pools Blindados](/using-zcash/shielded-pools) - Sapling e Orchard, os pools onde residem os seus fundos blindados
- [Notas](/using-zcash/memos) - mensagens encriptadas que podem acompanhar uma transação blindada
- [Endereços Transparentes de Exchanges](/using-zcash/transparent-exchange-addresses) - endereços TEX e por que motivo as exchanges os utilizam
- [Exchanges de Custódia](/using-zcash/custodial-exchanges) - quais exchanges suportam levantamentos blindados

## Conversor de ZEC para ZAT
