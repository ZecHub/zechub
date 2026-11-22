<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transações

O ZEC é um ativo digital amplamente usado para pagamentos, oferecendo fortes recursos de privacidade que o tornam adequado para diversas transações, como pagar amigos, fazer compras ou doar. Para maximizar a privacidade e a segurança, é essencial entender como funcionam os diferentes tipos de transações no Zcash.

## Resumo

- O Zcash oferece dois tipos de transação: **blindada**, que mantém os detalhes privados, e **transparente**, que os registra publicamente.
- Endereços blindados começam com `u` ou `z`. Endereços transparentes começam com `t` e se comportam de forma muito parecida com um endereço Bitcoin.
- A escolha é sua em cada pagamento. A privacidade é uma opção que o Zcash oferece a você, não uma configuração que outra pessoa decide por você.
- Sacar de uma corretora é o ponto mais comum em que as pessoas perdem privacidade. Se a corretora só oferece saques transparentes, blinde os fundos você mesmo assim que eles chegarem.
- As taxas seguem a [ZIP 317](https://zips.z.cash/zip-0317) e aumentam conforme o tamanho da transação. Carteiras que ainda enviam a antiga taxa fixa podem ter suas transações atrasadas.
- A maioria das transações do Zcash tem uma altura de expiração definida pela [ZIP 203](https://zips.z.cash/zip-0203). Se uma transação expirar antes de ser minerada, ela não poderá ser confirmada depois dessa altura de expiração e talvez precise ser enviada novamente.

## Transações blindadas

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

Transações blindadas ocorrem quando você move ZEC para sua carteira blindada. O endereço da sua carteira blindada começa com `u` ou `z`. Ao enviar transações blindadas, você e as pessoas com quem você transaciona podem manter um nível de privacidade que não é possível em redes de pagamento públicas por padrão.

Enviar uma transação blindada é mais fácil quando você usa uma carteira compatível com a rede atual do Zcash e com os pools blindados atuais. Antes de confiar em uma carteira para ter privacidade, verifique se ela permite envio blindado, recebimento blindado e o pool que você pretende usar. Ao sacar ZEC de uma corretora, verifique se a corretora oferece saques blindados ou transparentes. Se ela oferecer apenas saques transparentes, mova os fundos para uma carteira com suporte a transações blindadas depois que eles chegarem.

Usar transações blindadas para enviar e receber fundos é a melhor forma de preservar a privacidade e reduzir o risco de vazamento de dados de pagamento.

## Transações transparentes

Transações transparentes funcionam de forma semelhante às transações de Bitcoin. Os detalhes da transação ficam publicamente visíveis na blockchain, incluindo endereços transparentes e valores transparentes. Transações transparentes devem ser evitadas quando a privacidade for uma prioridade.

Endereços transparentes ainda são úteis em algumas situações, especialmente quando uma corretora ou serviço não oferece suporte a endereços blindados. Se você receber ZEC em um endereço transparente, considere blindá-lo antes de fazer pagamentos posteriores.

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

## Uma forma simples de imaginar

Uma transação transparente é um cartão-postal. O carteiro o entrega, mas qualquer pessoa que o manuseie no caminho pode ler a mensagem, ver quem o enviou e ver quem o recebe.

Uma transação blindada é um envelope lacrado. O serviço postal ainda confirma que uma carta verdadeira, com selo verdadeiro, passou pelo sistema, e ninguém pode falsificar uma carta nem enviar a mesma carta duas vezes. O que o envelope contém fica entre o remetente e o destinatário.

O importante é que o Zcash permite que você decida qual dos dois enviar, pagamento por pagamento.

## Taxas do Zcash

Deixe sua carteira calcular a taxa de rede e confira-a antes de enviar. As taxas são pagas em ZEC: **1 ZEC = 100.000.000 zatoshis**. Uma taxa em dólares americanos também depende da cotação do ZEC.

### Por que dois pagamentos podem ter taxas diferentes

A [ZIP 317](https://zips.z.cash/zip-0317#fee-calculation) calcula a taxa convencional a partir de **ações lógicas**, e não como uma porcentagem do valor enviado:

```text
fee in zatoshis = marginal fee × max(2, logical actions)
```

As ações lógicas medem os componentes da transação. Por exemplo, uma transação apenas Orchard usa o seu número de ações Orchard; uma transação apenas Sapling usa o maior valor entre a contagem de gastos e a de saídas. As contribuições de pools diferentes são somadas. Componentes transparentes usam um cálculo baseado em tamanho. Consulte a ZIP 317 para ver a fórmula completa, incluindo Ironwood e o legado Sprout.

Por isso, gastar muitas notes pequenas recebidas ou usar vários pools pode custar mais do que um pagamento mais simples do mesmo valor. A contagem de destinatários, por si só, não serve para calcular a taxa: o troco e o preenchimento também contam.

Estes exemplos partem de uma contagem de ações lógicas já calculada:

| Ações lógicas | A 5.000 zatoshis por ação | A 1.000 zatoshis por ação |
| --- | --- | --- |
| 2 | 10.000 zatoshis / 0,0001 ZEC | 2.000 zatoshis / 0,00002 ZEC |
| 3 | 15.000 zatoshis / 0,00015 ZEC | 3.000 zatoshis / 0,00003 ZEC |
| 10 | 50.000 zatoshis / 0,0005 ZEC | 10.000 zatoshis / 0,0001 ZEC |

### Qual taxa marginal se aplica

**Verificado em 11 de novembro de 2026:** a ZIP 317 lista a revisão 2 e a [ZIP 2009](https://zips.z.cash/zip-2009) como propostas. Antes da revisão 2, a taxa marginal é de 5.000 zatoshis. A revisão 2 especifica 1.000, o que resulta em um mínimo de 2.000 zatoshis em vez de 10.000.

A proposta especifica a altura **3.590.000** na Mainnet, prevista para por volta de 19 de novembro de 2026, e a altura **4.465.026** na Testnet. Uma estimativa de calendário não é a condição de ativação. Para as carteiras, a altura relevante é a do bloco em que se espera que a transação seja minerada; os nós usam a altura do próximo bloco. Verifique novamente as especificações indicadas e as orientações de versão da sua carteira à medida que a implantação avança.

Não force manualmente a taxa mais baixa só porque uma proposta ou uma versão de software a menciona. A ZIP 2009 exige que os nós adotem a nova política de retransmissão antes que as carteiras adotem a taxa; nós que usam os parâmetros antigos podem se recusar a retransmitir a transação com taxa mais baixa. A Testnet e a Mainnet também têm alturas de ativação diferentes.

### Se a estimativa parecer errada

Verifique se sua carteira está atualizada e sincronizada. Compare a taxa de rede da carteira separadamente da tarifa de saque do serviço de envio: a cotação de um serviço não é a fórmula da ZIP 317. Para um pagamento pendente, siga os [passos de solução de problemas abaixo](#troubleshooting-stuck-transactions) antes de enviar novamente.

A ZIP 317 é uma política de carteiras e nós, não uma regra de consenso que exija exatamente essa taxa. Pagar a taxa convencional melhora a compatibilidade de retransmissão; isso não garante um tempo de confirmação.

## Solução de problemas com transações travadas

Uma transação do Zcash não é definitiva só porque aparece na sua carteira. Ela se torna definitiva para uso comum depois de ser minerada em um bloco e receber confirmações suficientes para a sua situação. Corretoras e serviços podem exigir mais confirmações do que uma carteira mostra por padrão.

A expiração é uma **altura de bloco**, não uma contagem regressiva fixa. Para um pagamento comum com altura de expiração diferente de zero, essa altura é o último bloco em que ele pode ser minerado. Por exemplo, um pagamento que expira na altura 3539 pode ser incluído no bloco 3539; o bloco 3540 já é tarde demais. Uma altura de expiração igual a 0 significa que um pagamento comum não expira. Consulte a [ZIP 203](https://zips.z.cash/zip-0203).

Os valores padrão não são prazos universais. A ZIP 203 especificava 40 blocos após Blossom, cerca de 50 minutos com um intervalo-alvo de 75 segundos. Desde que o NU7 foi ativado em 6 de novembro de 2026 (bloco 3.543.405), o intervalo-alvo é de 25 segundos e a ZIP 218 recomenda um padrão de 120 blocos, o que continua sendo cerca de 50 minutos ([ZIP 218](https://zips.z.cash/zip-0218)). As configurações e as implementações das carteiras podem variar, e os intervalos reais entre blocos também variam. Verifique a altura de expiração da transação específica em vez de cronometrar um reenvio.

A expiração não reverte um pagamento já minerado nem cria uma transação de reembolso. Se a original expirou sem ser minerada, ela nunca foi liquidada on-chain. Sua carteira pode precisar sincronizar antes de mostrar os fundos correspondentes como disponíveis para gastar novamente.

Use esta árvore de decisão antes de reenviar:

1. **Sua carteira mostra um ID de transação?**
   - Se não, a carteira pode ainda não ter criado ou transmitido a transação. Verifique o status de sincronização, a conexão com a internet, a versão da carteira e qualquer mensagem de erro da carteira.
   - Se sim, copie o ID da transação e continue.
2. **A transação está confirmada em um bloco?**
   - Se sim, aguarde o número de confirmações exigido pela sua carteira, corretora, comerciante ou serviço.
   - Se não, continue.
3. **A transação não minerada já passou da sua altura de expiração diferente de zero?**
   - Se não, ainda não reenvie manualmente o mesmo pagamento. A transação original ainda pode ser confirmada.
   - Se sim, deixe a carteira sincronizar e verifique se a original não foi minerada nessa altura ou antes dela. Depois, siga as orientações da carteira para criar uma substituta, se necessário.
4. **A transação aparece em um servidor ou explorador, mas não em outro?**
   - Trate isso como um problema de visibilidade na rede, não como prova de que a transação falhou. Nós diferentes podem ter visões diferentes da mempool.
   - Aguarde, sincronize novamente sua carteira ou mude para outro servidor confiável, se sua carteira permitir.
5. **A transação desapareceu depois de aparecer como confirmada?**
   - Uma breve reorganização da chain pode remover temporariamente uma transação da chain principal.
   - Aguarde mais blocos. Se a transação voltar, continue aguardando as confirmações. Se ela não voltar e depois expirar, crie uma nova transação.
6. **A carteira está pedindo que você reenvie?**
   - Siga as orientações atuais da carteira somente depois de verificar que a transação anterior expirou, falhou ou não é mais válida.
   - Se tiver dúvidas, peça ajuda ao suporte antes de enviar novamente.

## Pendente, expirada, descartada e reorganizada

- **Pendente** significa que a transação foi criada ou transmitida, mas ainda não foi minerada em um bloco.
- **Expirada** significa que a altura de expiração da transação já passou. Segundo a ZIP 203, uma transação com altura de expiração não pode ser minerada depois dessa altura.
- **Descartada** significa que um ou mais nós não mantêm mais a transação na sua mempool. Isso pode acontecer por causa de expiração, taxas baixas, política da mempool, comportamento após reinicialização ou diferenças de retransmissão.
- **Reorganizada** significa que um bloco que antes continha a transação não faz mais parte da chain principal. A transação pode ser minerada novamente mais tarde ou pode voltar a ficar pendente, se ainda for válida.

## Quando não reenviar

Não reenvie imediatamente só porque uma transação está pendente, lenta ou não aparece em um explorador. Reenviar cedo demais pode causar confusão e, dependendo de como a carteira monta o novo pagamento, pode trazer o risco de pagar duas vezes.

Aguarde ou procure o suporte primeiro quando:

- A transação tem um ID de transação e não expirou.
- Um servidor a mostra e outro não.
- Ela foi minerada recentemente, mas perdeu confirmações após uma possível reorganização.
- O serviço que recebe ainda não terminou de contar as confirmações.
- Sua carteira ainda está sincronizando.

Geralmente é mais seguro reenviar somente depois que a carteira marcar claramente a transação como expirada ou com falha, ou depois que o suporte confirmar que a transação original não pode ser confirmada.

## Verificações que preservam a privacidade

Você pode verificar o status básico de uma transação sem expor mais informações do que o necessário:

- Verifique se sua carteira está totalmente sincronizada.
- Verifique se o aplicativo da carteira está atualizado.
- Verifique se a transação tem um ID de transação.
- Verifique se a transação está confirmada, pendente, expirada ou com falha.
- Verifique a altura atual do bloco e compare-a com a altura de expiração da transação, se sua carteira a mostrar.
- Para transações transparentes, um explorador de blocos pode mostrar a transação pública, os endereços, os valores e as confirmações.
- Para transações blindadas, um explorador de blocos pode mostrar que uma transação existe, mas não pode mostrar o remetente blindado, o destinatário, o valor nem os detalhes do memorando.

## O que não compartilhar publicamente

Nunca publique estes itens em chats públicos, redes sociais ou em um rastreador de problemas:

- Frase semente ou frase de recuperação
- Chave de gastos, chave privada ou backup da carteira
- Full Viewing Key
- Capturas de tela que mostrem saldos, endereços completos, memorandos, QR codes ou detalhes da conta na corretora
- Documentos pessoais de identidade ou registros de recuperação de conta

Um ID de transação é público na chain, mas ainda pode ligar sua pergunta ao suporte à sua identidade. Se a privacidade for importante, compartilhe-o apenas com um canal de suporte confiável.

## Do que as equipes de suporte precisam

Ao pedir ajuda ao suporte de uma carteira, corretora ou serviço, compartilhe apenas o mínimo de informações úteis:

- Nome da carteira ou do serviço
- Versão do aplicativo e sistema operacional
- Se a transação é blindada, transparente ou entre endereços blindados e transparentes
- ID da transação, se você se sentir à vontade para compartilhá-lo
- Horário aproximado do envio
- Se a carteira está totalmente sincronizada
- Status atual mostrado pela carteira
- Mensagem de erro exata, com os dados privados removidos
- Captura de tela com saldos, endereços, memorandos e detalhes da conta ocultos

As equipes de suporte não precisam da sua frase semente, chave de gastos, chave privada nem chave de visualização completa.

## Erros comuns

- **Supor que qualquer carteira que lista ZEC consegue enviá-lo de forma privada.** Várias carteiras multimoeda oferecem suporte apenas ao lado transparente do Zcash. Verifique os pools suportados pela carteira antes de confiar nela para ter privacidade. A página [Carteiras](https://zechub.wiki/using-zcash/wallets) mostra essa informação para cada opção.
- **Sacar para um endereço transparente e deixar os fundos lá.** O próprio saque é público, e toda movimentação posterior a partir desse endereço também continua pública. Blinde os fundos assim que eles chegarem.
- **Tratar a privacidade como algo que você ativa uma única vez.** Cada transação é uma escolha separada. Enviar de forma blindada hoje não desfaz um pagamento transparente que você fez na semana passada.
- **Reutilizar um endereço transparente para tudo.** Como a atividade transparente fica visível permanentemente, um único endereço reutilizado vai ligando aos poucos pagamentos que não tinham motivo para estar conectados.
- **Enviar com uma taxa padrão desatualizada.** Carteiras que não adotaram a ZIP 317 ainda podem enviar a antiga taxa fixa, o que pode deixar uma transação parada sem confirmação.
- **Reenviar antes da expiração.** Uma transação pendente ainda pode ser confirmada até expirar. Verifique o status de expiração antes de criar outro pagamento.

## Observação

Observe que a forma mais segura de usar o ZEC é por meio de transações blindadas sempre que o remetente, o destinatário, a carteira e o serviço oferecerem suporte a elas. Algumas carteiras e corretoras oferecem suporte a [endereços unificados](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), que podem combinar vários tipos de receptores do Zcash em um único endereço.

## Recursos

- [ZIP 203: Expiração de transações](https://zips.z.cash/zip-0203)
- [ZIP 317: Mecanismo de taxa de transferência proporcional](https://zips.z.cash/zip-0317)
- [Zcash ZIPs](https://zips.z.cash/)

## Páginas relacionadas

- [Carteiras](/using-zcash/wallets) - quais carteiras permitem envio blindado e quais são apenas transparentes
- [Divulgações de pagamento](/zcash-tech/payment-disclosures) - como um remetente pode provar detalhes selecionados de um pagamento blindado
- [Pools blindados](/using-zcash/shielded-pools) - Sapling e Orchard, os pools em que ficam seus fundos blindados
- [Memorandos](/using-zcash/memos) - mensagens criptografadas que podem acompanhar uma transação blindada
- [Endereços transparentes de corretoras](/using-zcash/transparent-exchange-addresses) - endereços TEX e por que as corretoras os usam
- [Corretoras custodiantes](/using-zcash/custodial-exchanges) - quais corretoras oferecem saques blindados

## Conversor de ZEC para ZAT
