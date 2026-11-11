<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


# Transações

ZEC é um ativo digital amplamente utilizado para pagamentos, oferecendo fortes recursos de privacidade que o tornam adequado para várias transações, como pagar amigos, fazer compras ou doar. Para maximizar a privacidade e a segurança, é essencial entender como funcionam os diferentes tipos de transações no Zcash.

## TL;DR

- O Zcash oferece dois tipos de transação: **blindada**, que mantém os detalhes privados, e **transparente**, que os registra publicamente.
- Os endereços blindados começam com `u` ou `z`. Os endereços transparentes começam com `t` e funcionam de forma muito semelhante a um endereço Bitcoin.
- A escolha é sua em cada pagamento. A privacidade é uma opção que o Zcash oferece a você, não uma configuração que outra pessoa decide por você.
- Sacar fundos de uma corretora é o ponto mais comum em que as pessoas perdem privacidade. Se a corretora só oferecer saques transparentes, blinde os fundos quando eles chegarem.
- As taxas seguem a [ZIP 317](https://zips.z.cash/zip-0317) e aumentam com o tamanho da transação. As carteiras que ainda enviam a antiga taxa fixa podem ter suas transações atrasadas.
- A maioria das transações do Zcash tem uma altura de expiração conforme a [ZIP 203](https://zips.z.cash/zip-0203). Se uma transação expirar antes de ser minerada, ela não poderá ser confirmada após essa altura de expiração e talvez precise ser enviada novamente.

## Transações blindadas

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash explicado: transações blindadas Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

As transações blindadas ocorrem quando você move ZEC para sua carteira blindada. O endereço da sua carteira blindada começa com `u` ou `z`. Ao enviar transações blindadas, você e as pessoas com quem transaciona podem manter um nível de privacidade impossível em redes de pagamento públicas por padrão.

Enviar uma transação blindada é mais simples quando você usa uma carteira compatível com a rede atual do Zcash e os pools blindados atuais. Antes de depender de uma carteira para privacidade, verifique se ela oferece envio blindado, recebimento blindado e o pool que você planeja usar. Ao sacar ZEC de uma corretora, verifique se ela oferece saques blindados ou transparentes. Se ela só oferecer saques transparentes, mova os fundos para uma carteira compatível com transações blindadas depois que eles chegarem.

Usar transações blindadas para enviar e receber fundos é a melhor forma de preservar a privacidade e reduzir o risco de expor dados de pagamento.

## Transações transparentes

As transações transparentes funcionam de forma semelhante às transações Bitcoin. Os detalhes da transação são visíveis publicamente na blockchain, incluindo endereços e valores transparentes. As transações transparentes devem ser evitadas quando a privacidade é uma prioridade.

Os endereços transparentes ainda são úteis em algumas situações, especialmente quando uma corretora ou serviço não oferece suporte a endereços blindados. Se você receber ZEC em um endereço transparente, considere blindá-lo antes de fazer pagamentos posteriores.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Aprenda sobre carteiras blindadas Zcash!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Uma forma simples de visualizar

Uma transação transparente é um cartão-postal. O carteiro o entrega, mas qualquer pessoa que o manuseie no caminho pode ler a mensagem, ver quem o enviou e quem o recebe.

Uma transação blindada é um envelope lacrado. O serviço postal ainda confirma que uma carta real, com selo verdadeiro, passou pelo sistema, e ninguém pode falsificá-la ou enviar a mesma carta duas vezes. O conteúdo do envelope fica entre o remetente e o destinatário.

A parte importante é que o Zcash permite que você decida qual enviar, pagamento por pagamento.

## Taxas do Zcash

O Zcash não usa unidades de gas no estilo Ethereum. As taxas das transações do Zcash são pagas em ZEC, geralmente medidas em **zatoshis**. Um ZEC equivale a 100000000 zatoshis.

A [ZIP 317](https://zips.z.cash/zip-0317) define um mecanismo de taxa convencional que aumenta conforme a complexidade da transação. Em vez de todas as transações usarem a antiga taxa fixa de 1000 zatoshis, a taxa convencional é baseada em "ações lógicas", como entradas, saídas e ações blindadas. As transações simples normalmente começam em cerca de 10000 zatoshis, ou 0,0001 ZEC, e transações mais complexas podem exigir mais.

Na maioria das carteiras atuais, os usuários não devem precisar calcular manualmente as taxas da ZIP 317. A carteira deve escolher uma taxa adequada automaticamente. Se uma carteira ainda usar a antiga taxa fixa ou permitir que você defina uma taxa muito abaixo da taxa convencional da ZIP 317, a transação poderá ser atrasada, despriorizada, descartada por alguns nós ou não ser retransmitida de forma confiável.

## Solução de problemas de transações travadas

Uma transação do Zcash não é final apenas porque aparece na sua carteira. Ela se torna final para uso comum depois de ser minerada em um bloco e receber confirmações suficientes para sua situação. Corretoras e serviços podem exigir mais confirmações do que uma carteira mostra por padrão.

Use esta árvore de decisão antes de reenviar:

1. **Sua carteira mostra um ID de transação?**
   - Se não, a carteira talvez ainda não tenha criado ou transmitido a transação. Verifique o status de sincronização, a conexão com a internet, a versão da carteira e qualquer mensagem de erro da carteira.
   - Se sim, copie o ID da transação e continue.
2. **A transação está confirmada em um bloco?**
   - Se sim, aguarde o número de confirmações exigido pela sua carteira, corretora, comerciante ou serviço.
   - Se não, continue.
3. **A transação atingiu sua altura de expiração?**
   - Se não, ainda não reenvie manualmente o mesmo pagamento. A transação original ainda pode ser confirmada.
   - Se sim, a transação não pode ser minerada após essa altura de expiração. Sua carteira pode marcá-la como expirada ou com falha, e talvez você precise criar uma nova transação.
4. **A transação aparece em um servidor ou explorador, mas não em outro?**
   - Trate isso como um problema de visibilidade na rede, não como prova de que a transação falhou. Nós diferentes podem ter visualizações diferentes da mempool.
   - Aguarde, sincronize novamente sua carteira ou mude para outro servidor confiável, se sua carteira oferecer suporte a isso.
5. **A transação desapareceu depois de aparecer como confirmada?**
   - Uma curta reorganização da chain pode remover temporariamente uma transação da melhor chain.
   - Aguarde mais blocos. Se a transação retornar, continue aguardando confirmações. Se ela não retornar e expirar mais tarde, crie uma nova transação.
6. **A carteira está pedindo para você reenviar?**
   - Siga as orientações atuais da carteira somente depois de verificar que a transação anterior expirou, falhou ou deixou de ser válida.
   - Se não tiver certeza, peça suporte antes de enviar novamente.

## Pendente, expirada, descartada e reorganizada

- **Pendente** significa que a transação foi criada ou transmitida, mas ainda não foi minerada em um bloco.
- **Expirada** significa que a altura de expiração da transação já passou. Conforme a ZIP 203, uma transação com altura de expiração não pode ser minerada após essa altura.
- **Descartada** significa que um ou mais nós não mantêm mais a transação em sua mempool. Isso pode acontecer devido à expiração, taxas baixas, política da mempool, comportamento de reinicialização ou diferenças de retransmissão.
- **Reorganizada** significa que um bloco que anteriormente continha a transação não faz mais parte da melhor chain. A transação pode ser minerada novamente mais tarde ou voltar a ficar pendente se ainda for válida.

## Quando não reenviar

Não reenvie imediatamente apenas porque uma transação está pendente, lenta ou ausente de um explorador. Reenviar cedo demais pode causar confusão e, dependendo de como a carteira cria o novo pagamento, pode gerar o risco de pagar duas vezes.

Aguarde ou procure suporte primeiro quando:

- A transação tem um ID de transação e não expirou.
- Um servidor a mostra, enquanto outro não.
- Ela foi minerada recentemente, mas perdeu confirmações após uma possível reorganização.
- O serviço de recebimento ainda não terminou de contar as confirmações.
- Sua carteira ainda está sincronizando.

Normalmente, é mais seguro reenviar somente depois que a carteira marcar claramente a transação como expirada ou com falha, ou depois que o suporte confirmar que a transação original não pode ser confirmada.

## Verificações seguras para a privacidade

Você pode verificar o status básico da transação sem expor mais informações do que o necessário:

- Verifique se sua carteira está totalmente sincronizada.
- Verifique se o aplicativo da carteira está atualizado.
- Verifique se a transação tem um ID de transação.
- Verifique se a transação está confirmada, pendente, expirada ou com falha.
- Verifique a altura atual do bloco e compare-a com a altura de expiração da transação, se sua carteira a mostrar.
- Para transações transparentes, um explorador de blocos pode mostrar a transação pública, os endereços, os valores e as confirmações.
- Para transações blindadas, um explorador de blocos pode mostrar que uma transação existe, mas não pode mostrar detalhes blindados do remetente, destinatário, valor ou memorando.

## O que não compartilhar publicamente

Nunca publique estes itens em chats públicos, redes sociais ou em um rastreador de issues:

- Frase semente ou frase de recuperação
- Chave de gastos, chave privada ou backup da carteira
- a Full Viewing Key
- Capturas de tela mostrando saldos, endereços completos, memorandos, códigos QR ou detalhes de contas de corretoras
- Documentos de identificação pessoal ou registros de recuperação de conta

Um ID de transação é público na chain, mas ainda pode vincular sua solicitação de suporte à sua identidade. Se a privacidade for importante, compartilhe-o somente com um canal de suporte confiável.

## O que as equipes de suporte precisam

Ao pedir ajuda ao suporte de uma carteira, corretora ou serviço, compartilhe somente as informações úteis mínimas:

- Nome da carteira ou do serviço
- Versão do aplicativo e sistema operacional
- Se a transação é blindada, transparente ou entre endereços blindados e transparentes
- ID de transação, se você se sentir confortável em compartilhá-lo
- Horário aproximado do envio
- Se a carteira está totalmente sincronizada
- Status atual mostrado pela carteira
- Mensagem de erro exata, com dados privados removidos
- Captura de tela com saldos, endereços, memorandos e detalhes da conta ocultos

As equipes de suporte não precisam da sua frase semente, chave de gastos, chave privada ou chave de visualização completa.

## Erros comuns

- **Presumir que qualquer carteira que liste ZEC pode enviá-lo de forma privada.** Várias carteiras de várias moedas suportam apenas o lado transparente do Zcash. Verifique os pools suportados pela carteira antes de depender dela para privacidade. A página [Carteiras](https://zechub.wiki/using-zcash/wallets) lista isso para cada opção.
- **Sacar para um endereço transparente e deixar os fundos lá.** O saque em si é público, e todos os movimentos posteriores a partir desse endereço também permanecem públicos. Blinde os fundos quando chegarem.
- **Tratar a privacidade como algo que se ativa uma vez.** Cada transação é uma escolha separada. Enviar de forma blindada hoje não desfaz um pagamento transparente feito na semana passada.
- **Reutilizar um endereço transparente para tudo.** Como a atividade transparente é permanentemente visível, um único endereço reutilizado liga gradualmente pagamentos que não tinham motivo para estar associados.
- **Enviar com uma taxa padrão desatualizada.** As carteiras que não adotaram a ZIP 317 ainda podem enviar a antiga taxa fixa, o que pode deixar uma transação sem confirmação.
- **Reenviar antes da expiração.** Uma transação pendente ainda pode ser confirmada até expirar. Verifique o status de expiração antes de criar outro pagamento.

## Nota

Observe que a forma mais segura de usar ZEC é por meio de transações blindadas sempre que o remetente, o destinatário, a carteira e o serviço as suportarem. Algumas carteiras e corretoras suportam [endereços unificados](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA), que podem combinar vários tipos de receptores do Zcash em um único endereço.

## Recursos

- [ZIP 203: Expiração de transação](https://zips.z.cash/zip-0203)
- [ZIP 317: Mecanismo proporcional de taxa de transferência](https://zips.z.cash/zip-0317)
- [ZIPs do Zcash](https://zips.z.cash/)

## Páginas relacionadas

- [Carteiras](/using-zcash/wallets) - quais carteiras suportam envio blindado e quais são apenas transparentes
- [Divulgações de pagamento](/zcash-tech/payment-disclosures) - como um remetente pode provar detalhes selecionados de um pagamento blindado
- [Pools blindados](/using-zcash/shielded-pools) - Sapling e Orchard, os pools onde seus fundos blindados ficam
- [Memorandos](/using-zcash/memos) - mensagens criptografadas que podem acompanhar uma transação blindada
- [Endereços transparentes de corretoras](/using-zcash/transparent-exchange-addresses) - endereços TEX e por que as corretoras os usam
- [Corretoras custodiantes](/using-zcash/custodial-exchanges) - quais corretoras suportam saques blindados

## Conversor de ZEC para ZAT
