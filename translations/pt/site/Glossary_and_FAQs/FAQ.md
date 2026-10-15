# Perguntas Frequentes

Uma lista das perguntas mais comuns sobre Zcash. Para resolver problemas com o cliente Zcash, consulte o [guia oficial de resolução de problemas](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navegação Rápida

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">O que é Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Como posso adquirir Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Diferença em relação a outras criptomoedas?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Governação do protocolo?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Onde está a minha transação?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash é realmente privado?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Equívocos comuns</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd deixou de funcionar?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Mover a minha wallet para Zallet?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">O que é Ironwood?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Qual nó completo?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Procurar um termo?</a>
</div>

---

## O que é Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash é uma moeda digital com transações rápidas e confidenciais, e taxas baixas. A privacidade é a funcionalidade central de Zcash. Foi pioneiro na utilização de provas de conhecimento zero para encriptar todas as transações.

Estão disponíveis várias wallets para pagamentos instantâneos, móveis, seguros e privados: [Wallets](/using-zcash/wallets)

</div>

## Como posso adquirir Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Pode comprar ZEC em [exchanges com custódia](/using-zcash/custodial-exchanges), [DEXs](/using-zcash/dex) ou [plataformas centralizadas de swap](/using-zcash/centralized-swaps).

Também pode comprar Zcash diretamente a outras pessoas ou adquiri-lo através de mineração.

</div>

## Qual é a diferença entre Zcash e outras criptomoedas?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash é fundamentalmente mais privado do que Bitcoin ou Ethereum. Oferece tempos de bloco rápidos (75 segundos), taxas baixas e atualizações regulares.

Os utilizadores podem escolher entre transações **Transparent** ou **Shielded**. Para mais informações, consulte [Um Ecossistema Shielded](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Como é governado o protocolo Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

O protocolo é governado pelo processo de **Proposta de Melhoria de Zcash (ZIP)**. Qualquer pessoa pode submeter um rascunho de ZIP. Os rascunhos são debatidos pela comunidade e aceites ou rejeitados pelos editores de ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

As decisões são registadas na especificação e ratificadas on-chain quando a rede as adota.

</div>

## Onde está a minha Transação?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Leia primeiro [o nosso guia sobre exploradores de blocos](/guides/blockchain-explorers). Depois, consulte o [Zcash Explorador de Blocos](https://zcashblockexplorer.com).

As transações expiram após aproximadamente 25 minutos (20 blocos), e os fundos são devolvidos automaticamente.

**Motivos comuns pelos quais uma transação pode não aparecer:**

- Perda de conectividade
- Taxa de transação demasiado baixa
- Sobrecarga da rede
- Demasiadas entradas transparentes (tamanho demasiado grande)

**Dicas para ter sucesso:**

- Utilize uma ligação estável
- Pague a taxa padrão (ou superior para prioridade)
- Aguarde e tente novamente mais tarde
- Utilize menos entradas para manter a transação pequena

</div>

## Zcash é realmente Privado?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Sim.** Zcash encripta os dados do remetente, do montante e do destinatário em transações shielded.

Zcash **não**:

- Encripta transações com múltiplas assinaturas (integração com FROST pendente)
- Protege contra correlações com transações transparentes
- Oculta endereços IP

Leitura adicional: [Um Ecossistema Shielded](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd deixou de funcionar, o que devo executar agora?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd foi descontinuado. A versão 6.20.0 desligou-se no bloco 3417100 em 18 de julho de 2026, e nunca suportou Ironwood (NU6.3), pelo que não existe uma versão posterior para a qual atualizar.

Em vez disso, execute a stack Z3. Três programas dividem o trabalho que zcashd costumava fazer sozinho:

- **[Zebra](/zcash-tech/zebra-full-node)** valida a cadeia
- **[Zaino](/zcash-tech/zaino)** indexa-a e fornece dados de wallet
- **[Zallet](/zcash-tech/zallet)** guarda os seus fundos

[Zakura](/zcash-tech/zakura-node) é um nó completo alternativo. Também executa zcashd sobre si próprio, o que ajuda se outro software ainda esperar a interface antiga.

Comece pelo [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## Como movo a minha wallet zcashd para Zallet?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet migra um `wallet.dat` existente, pelo que mantém os seus fundos e endereços.

Faça primeiro uma cópia de segurança de `wallet.dat` e, em seguida, siga o [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet). Mantenha essa cópia de segurança até confirmar o seu saldo em Zallet.

A referência rápida de [Zallet](/using-zcash/zallet-quick-reference-guide) aborda os comandos quotidianos depois de concluir a migração.

</div>

## O que é Ironwood e preciso de fazer alguma coisa?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood é a atualização de rede NU6.3, ativa na mainnet desde o bloco 3,428,143 em 28 de julho de 2026. Adiciona um pool shielded construído sobre um circuito corrigido e fecha o pool [Orchard](/using-zcash/shielded-pools) mais antigo, para que qualquer pessoa possa verificar que nenhum ZEC foi forjado.

**Se possui fundos shielded, poderá ser necessário movê-los.** O valor sai de Orchard apenas através de [o turnstile](/zcash-tech/the-turnstile), e as wallets tratam a migração em alturas e de formas diferentes. Pergunte ao fornecedor da sua wallet antes de mover algo manualmente.

Leia [Ironwood](/zcash-tech/ironwood) para saber o que mudou e porquê.

</div>

## Que nó completo devo executar?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** é a substituição direta de zcashd e o nó assumido pelo guia de migração. Escolha-o, salvo se tiver uma razão para não o fazer.

**[Zakura](/zcash-tech/zakura-node)** é uma segunda implementação orientada para a escala, com sincronização mais rápida e poda de blocos nativa. Escolha-o se precisar dessas funcionalidades ou se depender de software que ainda comunica com zcashd.

Ambos validam a mesma cadeia, pelo que esta é uma escolha operacional e não de consenso.

</div>

## Onde procuro um termo de uma nota de lançamento?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Consulte a Biblioteca [Zcash](/glossary-and-faqs/zcash-library). Abrange o software de nó e de wallet, os pools shielded e os números ZIP que surgem mais frequentemente.

</div>

## Alguns equívocos comuns

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Equívoco</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Resposta Correta</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash é uma moeda centralizada?</td>
      <td className="py-4 px-5 text-foreground">Não. Um acordo de marca registada impede a Zcash Foundation ou a ECC de agir contra o consenso da comunidade. A governação é comprovadamente descentralizada (consulte o relatório [Messari](https://messari.io/report/decentralizing-zcash)). Sondagens da comunidade, ZecHub e o A/V Club de Zcash Foundation permitem uma ampla participação.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash tem uma porta dos fundos?</td>
      <td className="py-4 px-5 text-foreground">Não. Nem Zcash nem qualquer software criptográfico que tenhamos criado contém uma porta dos fundos, nem nunca conterá.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash é controlado por uma empresa?</td>
      <td className="py-4 px-5 text-foreground">Incorreto. Embora estabeleçamos parcerias com empresas para investigação, Zcash mantém o compromisso com a descentralização. Várias organizações autónomas trabalham em conjunto em prol da autocustódia e dos direitos de privacidade.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash tem privacidade limitada em comparação com outras moedas de privacidade</td>
      <td className="py-4 px-5 text-foreground">Não. A privacidade ao estilo Monero/Grin baseia-se em iscos (que podem ser derrotados). Zcash encripta todos os dados de transações shielded, pelo que todas as transações no pool são indistinguíveis. Consulte [Não é Privado o Suficiente?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Última atualização:** outubro de 2026
**Quer contribuir?** [Edite esta página no GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
