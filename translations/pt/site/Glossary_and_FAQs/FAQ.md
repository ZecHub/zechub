# Perguntas frequentes

Uma lista das perguntas mais comuns sobre o Zcash. Para solucionar problemas do cliente Zcash, consulte o [guia oficial de solução de problemas](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navegação rápida

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">O que é o Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Como posso adquirir Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Diferença em relação a outras criptomoedas?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Governança do protocolo?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Onde está minha transação?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">O Zcash é realmente privado?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Equívocos comuns</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">O zcashd parou de funcionar?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Mover minha carteira para a Zallet?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">O que é o Ironwood?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Qual nó integral?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Consultar um termo?</a>
</div>

---

## O que é o Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

O Zcash é uma moeda digital com transações rápidas e confidenciais e taxas baixas. A privacidade é o recurso central do Zcash. Ele foi pioneiro no uso de provas de conhecimento zero para criptografar todas as transações.

Várias carteiras estão disponíveis para pagamentos instantâneos, móveis, seguros e privados: [Carteiras](/using-zcash/wallets)

</div>

## Como posso adquirir Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Você pode comprar ZEC em [corretoras custodiantes](/using-zcash/custodial-exchanges), [DEXs](/using-zcash/dex) ou [plataformas centralizadas de conversão](/using-zcash/centralized-swaps).

Você também pode comprar Zcash ponto a ponto ou adquiri-lo por meio da mineração.

</div>

## Qual é a diferença entre o Zcash e outras criptomoedas?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

O Zcash é fundamentalmente mais privado que o Bitcoin ou o Ethereum. Ele oferece tempos de bloco rápidos (25 segundos desde a ativação do NU7 em novembro de 2026, contra 75 segundos antes), taxas baixas e atualizações regulares.

Os usuários podem escolher entre transações **transparentes** ou **blindadas**. Para mais informações, consulte [Um ecossistema blindado](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Como é governado o protocolo Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

O protocolo é governado pelo processo de **propostas de melhoria do Zcash (ZIP)**. Qualquer pessoa pode enviar um rascunho de ZIP. Os rascunhos são debatidos pela comunidade e aceitos ou rejeitados pelos editores de ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

As decisões são incorporadas à especificação e ratificadas on-chain quando a rede as adota.

</div>

## Onde está minha transação?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Primeiro, leia [nosso guia sobre exploradores de blocos](/guides/blockchain-explorers). Depois, verifique o [explorador de blocos Zcash](https://mainnet.zcashexplorer.app).

Não existe um prazo fixo de expiração de 25 minutos nem um temporizador de reembolso automático. Verifique a altura de expiração registrada pela sua carteira e se o pagamento original foi minerado. Se ele expirou sem ser minerado, não foi liquidado on-chain; a expiração não cria uma transação de reembolso. Deixe a carteira sincronizar antes de seguir as orientações dela para tentar novamente. Consulte [solução de problemas de transações](/using-zcash/transactions#troubleshooting-stuck-transactions) e o [ZIP 203](https://zips.z.cash/zip-0203).

**Motivos comuns pelos quais uma transação pode não aparecer:**

- Perda de conectividade
- Taxa de transação muito baixa
- Sobrecarga da rede
- Excesso de entradas transparentes (tamanho muito grande)

**Dicas para ter sucesso:**

- Use uma conexão estável
- Pague a taxa padrão (ou uma mais alta para ter prioridade)
- Aguarde e tente novamente mais tarde
- Use menos entradas para manter a transação pequena

</div>

## O Zcash é realmente privado?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Sim.** O Zcash criptografa os dados de remetente, valor e destinatário nas transações blindadas.

O Zcash **não**:

- Criptografa transações multiassinatura (integração com FROST pendente)
- Protege contra correlações com transações transparentes
- Oculta endereços IP

Leitura complementar: [Um ecossistema blindado](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## O zcashd parou de funcionar, o que devo executar agora?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

O zcashd foi descontinuado. A versão 6.20.0 se desligou automaticamente no bloco 3417100, em 18 de julho de 2026, e nunca deu suporte ao Ironwood (NU6.3), portanto não existe uma versão posterior para a qual atualizar.

Em vez dele, execute a stack Z3. Três programas dividem o trabalho que o zcashd fazia sozinho:

- **[Zebra](/zcash-tech/zebra-full-node)** valida a chain
- **[Zaino](/zcash-tech/zaino)** indexa a chain e fornece os dados para as carteiras
- **[Zallet](/zcash-tech/zallet)** guarda seus fundos

O [Zakura](/zcash-tech/zakura-node) é um nó integral alternativo. Ele também executa o zcashd sobre si mesmo, o que ajuda se outros softwares ainda esperam a interface antiga.

Comece pelo [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## Como movo minha carteira do zcashd para a Zallet?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

A Zallet migra um `wallet.dat` existente, então você mantém seus fundos e endereços.

Primeiro, faça um backup do `wallet.dat` e depois siga o [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet). Guarde esse backup até confirmar seu saldo na Zallet.

A [referência rápida da Zallet](/using-zcash/zallet-quick-reference-guide) aborda os comandos do dia a dia depois que você tiver concluído a migração.

</div>

## O que é o Ironwood, e preciso fazer alguma coisa?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

O Ironwood é a atualização da rede NU6.3, ativa na mainnet desde o bloco 3.428.143, em 28 de julho de 2026. Ela adiciona uma pool blindada construída sobre um circuito corrigido e lacra a pool [Orchard](/using-zcash/shielded-pools) mais antiga, para que qualquer pessoa possa verificar que nenhum ZEC foi forjado.

**Se você tem fundos blindados, talvez eles precisem ser movidos.** O valor só sai do Orchard por meio da [catraca](/zcash-tech/the-turnstile), e as carteiras fazem essa movimentação em momentos e de formas diferentes. Consulte o provedor da sua carteira antes de mover qualquer coisa manualmente.

Leia [Ironwood](/zcash-tech/ironwood) para saber o que mudou e por quê.

</div>

## Qual nó integral devo executar?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

O **[Zebra](/zcash-tech/zebra-full-node)** é o substituto direto do zcashd e o nó que o guia de migração pressupõe. Escolha-o, a menos que você tenha um motivo para não fazer isso.

O **[Zakura](/zcash-tech/zakura-node)** é uma segunda implementação voltada para escala, com sincronização mais rápida e poda nativa de blocos. Escolha-o se você precisar desses recursos ou se depender de softwares que ainda se comunicam com o zcashd.

Ambos validam a mesma chain, então esta é uma escolha operacional, e não de consenso.

</div>

## Onde consulto um termo de uma nota de versão?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Consulte a [biblioteca Zcash](/glossary-and-faqs/zcash-library). Ela abrange os softwares de nó e de carteira, as pools blindadas e os números de ZIP que aparecem com mais frequência.

</div>

## Alguns equívocos comuns

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Equívoco</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Resposta correta</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">O Zcash é uma moeda centralizada?</td>
      <td className="py-4 px-5 text-foreground">Não. Um acordo de marca registrada impede que a Zcash Foundation ou a ECC ajam contra o consenso da comunidade. Está comprovado que a governança é descentralizada (veja o [relatório da Messari](https://messari.io/report/decentralizing-zcash)). Enquetes da comunidade, a ZecHub e o A/V Club do Zcash Foundation possibilitam uma ampla participação.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">O Zcash tem um backdoor?</td>
      <td className="py-4 px-5 text-foreground">Não. Nem o Zcash nem qualquer software criptográfico que desenvolvemos contém um backdoor, e nunca conterá.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">O Zcash é controlado por uma empresa?</td>
      <td className="py-4 px-5 text-foreground">Incorreto. Embora façamos parcerias com empresas para pesquisa, o Zcash continua comprometido com a descentralização. Várias organizações autônomas trabalham juntas em prol da autocustódia e do direito à privacidade.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">O Zcash tem privacidade limitada em comparação com outras moedas de privacidade</td>
      <td className="py-4 px-5 text-foreground">Não. A privacidade no estilo Monero/Grin depende de iscas (que podem ser contornadas). O Zcash criptografa todos os dados das transações blindadas, de modo que todas as transações na pool são indistinguíveis. Veja [Não é privado o suficiente?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Última atualização:** outubro de 2026
**Quer contribuir?** [Edite esta página no GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
