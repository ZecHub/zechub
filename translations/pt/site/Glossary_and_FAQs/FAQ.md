# Perguntas frequentes

Uma lista das perguntas mais comuns sobre o Zcash. Para resolver problemas com o cliente Zcash, consulte o [guia oficial de resolução de problemas](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navegação rápida

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">O que é o Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Como você pode adquirir Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Diferença em relação a outras criptomoedas?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Governança do protocolo?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Onde está minha transação?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">O Zcash é realmente privado?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Equívocos comuns</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd deixou de funcionar?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Mover minha carteira para Zallet?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">O que é Ironwood?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Qual nó integral?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Procurar um termo?</a>
</div>

---

## O que é o Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

O Zcash é uma moeda digital com transações rápidas e confidenciais, e taxas baixas. A privacidade é a funcionalidade central do Zcash. Foi pioneiro no uso de provas de conhecimento zero para criptografar todas as transações.

Há várias carteiras disponíveis para pagamentos instantâneos, móveis, seguros e privados: [Carteiras](/using-zcash/wallets)

</div>

## Como você pode adquirir Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Você pode comprar ZEC em [corretoras custodiantes](/using-zcash/custodial-exchanges), [DEXs](/using-zcash/dex) ou [plataformas centralizadas de conversão](/using-zcash/centralized-swaps).

Você também pode comprar Zcash diretamente de outras pessoas ou adquiri-lo por meio da mineração.

</div>

## Qual é a diferença entre o Zcash e outras criptomoedas?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

O Zcash é fundamentalmente mais privado que Bitcoin ou Ethereum. Oferece tempos de bloco rápidos (75 segundos), taxas baixas e atualizações regulares.

Os usuários podem escolher entre transações **transparentes** ou **blindadas**. Para mais informações, consulte [A Shielded Ecosystem](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Como o protocolo Zcash é governado?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

O protocolo é governado pelo processo de **Proposta de melhoria do Zcash (ZIP)**. Qualquer pessoa pode enviar um rascunho de ZIP. Os rascunhos são debatidos pela comunidade e aceitos ou rejeitados pelos editores de ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

As decisões são registradas na especificação e ratificadas on-chain quando a rede as adota.

</div>

## Onde está minha transação?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Leia primeiro [nosso guia sobre exploradores de blocos](/guides/blockchain-explorers). Depois, consulte o [Explorador de blocos do Zcash](https://mainnet.zcashexplorer.app).

As transações expiram após aproximadamente 25 minutos (20 blocos), e os fundos são devolvidos automaticamente.

**Motivos comuns pelos quais uma transação pode não aparecer:**

- Perda de conectividade
- Taxa de transação muito baixa
- Sobrecarga da rede
- Muitas entradas transparentes (tamanho muito grande)

**Dicas para ter sucesso:**

- Use uma conexão estável
- Pague a taxa padrão (ou uma taxa mais alta para ter prioridade)
- Aguarde e tente novamente mais tarde
- Use menos entradas para manter a transação pequena

</div>

## O Zcash é realmente privado?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Sim.** O Zcash criptografa os dados do remetente, do valor e do destinatário em transações blindadas.

O Zcash **não**:

- Criptografa transações com múltiplas assinaturas (integração com FROST pendente)
- Protege contra correlações com transações transparentes
- Oculta endereços IP

Leitura adicional: [A Shielded Ecosystem](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd deixou de funcionar, o que devo executar agora?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd foi descontinuado. A versão 6.20.0 foi encerrada no bloco 3417100 em 18 de julho de 2026 e nunca ofereceu suporte ao Ironwood (NU6.3), portanto não há uma versão posterior para atualizar.

Em vez disso, execute o conjunto Z3. Três programas dividem o trabalho que zcashd costumava fazer sozinho:

- **[Zebra](/zcash-tech/zebra-full-node)** valida a chain
- **[Zaino](/zcash-tech/zaino)** a indexa e fornece dados da carteira
- **[Zallet](/zcash-tech/zallet)** guarda seus fundos

[Zakura](/zcash-tech/zakura-node) é um nó integral alternativo. Ele também executa zcashd sobre si mesmo, o que ajuda se outro software ainda espera a interface antiga.

Comece pelo [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## Como movo minha carteira zcashd para Zallet?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet migra um `wallet.dat` existente, para que você mantenha seus fundos e endereços.

Faça primeiro um backup de `wallet.dat` e, em seguida, siga o [guia de migração](/guides/migration-guide-zcashd-to-zebrad-zallet). Mantenha esse backup até confirmar seu saldo na Zallet.

A referência rápida da [Zallet](/using-zcash/zallet-quick-reference-guide) aborda os comandos do dia a dia depois que você concluir a migração.

</div>

## O que é Ironwood e preciso fazer alguma coisa?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood é a atualização da rede NU6.3, ativa na mainnet desde o bloco 3.428.143 em 28 de julho de 2026. Ela adiciona um pool blindado construído sobre um circuito corrigido e fecha o pool mais antigo [Orchard](/using-zcash/shielded-pools), para que qualquer pessoa possa verificar que nenhum ZEC foi forjado.

**Se você possui fundos blindados, talvez seja necessário movê-los.** O valor sai de Orchard apenas pela [catraca](/zcash-tech/the-turnstile), e as carteiras realizam a migração em momentos e de formas diferentes. Pergunte ao provedor da sua carteira antes de mover qualquer coisa manualmente.

Leia [Ironwood](/zcash-tech/ironwood) para saber o que mudou e por quê.

</div>

## Qual nó integral devo executar?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** é a substituição direta do zcashd e o nó que o guia de migração pressupõe. Escolha-o, a menos que você tenha um motivo para não fazê-lo.

**[Zakura](/zcash-tech/zakura-node)** é uma segunda implementação voltada para escala, com sincronização mais rápida e poda nativa de blocos. Escolha-o se precisar desses recursos ou se depender de software que ainda se comunica com zcashd.

Ambos validam a mesma chain, portanto esta é uma escolha operacional, não de consenso.

</div>

## Onde procuro um termo de uma nota de versão?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Consulte a [Biblioteca do Zcash](/glossary-and-faqs/zcash-library). Ela abrange o software de nó e de carteira, os pools blindados e os números ZIP que aparecem com mais frequência.

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
      <td className="py-4 px-5 text-foreground">Não. Um acordo de marca registrada impede a Zcash Foundation ou a ECC de agir contra o consenso da comunidade. A governança é comprovadamente descentralizada (consulte o relatório [Messari](https://messari.io/report/decentralizing-zcash)). Enquetes da comunidade, ZecHub e o A/V Club da Zcash Foundation permitem ampla participação.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">O Zcash tem uma porta dos fundos?</td>
      <td className="py-4 px-5 text-foreground">Não. Nem o Zcash nem qualquer software criptográfico que criamos contém uma porta dos fundos, nem jamais conterá.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">O Zcash é controlado por uma empresa?</td>
      <td className="py-4 px-5 text-foreground">Incorreto. Embora façamos parcerias com empresas para pesquisa, o Zcash mantém o compromisso com a descentralização. Várias organizações autônomas trabalham juntas em prol da autocustódia e dos direitos de privacidade.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">O Zcash tem privacidade limitada em comparação com outras moedas de privacidade</td>
      <td className="py-4 px-5 text-foreground">Não. A privacidade no estilo Monero/Grin se baseia em iscas (que podem ser derrotadas). O Zcash criptografa todos os dados de transações blindadas, portanto todas as transações no pool são indistinguíveis. Consulte [Not Private Enough?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Última atualização:** outubro de 2026
**Quer contribuir?** [Edite esta página no GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
