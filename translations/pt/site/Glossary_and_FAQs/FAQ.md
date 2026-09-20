# Perguntas Frequentes

Uma lista das perguntas mais comuns sobre Zcash. Para resolver problemas com o cliente Zcash, consulte o [guia oficial de resolução de problemas](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navegação Rápida

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">O que é Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Como posso adquirir Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Diferença face a outras criptomoedas?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Governação do protocolo?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Onde está a minha transação?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash é realmente privado?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Equívocos comuns</a>
</div>

---

## O que é Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash é uma moeda digital com transações rápidas, confidenciais e com taxas baixas. A privacidade é a funcionalidade central de Zcash. Foi pioneira na utilização de provas de conhecimento zero para encriptar todas as transações.

Estão disponíveis várias wallets para pagamentos instantâneos, móveis, seguros e privados: [Wallets](/using-zcash/wallets)

</div>

## Como posso adquirir Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Pode comprar ZEC em [exchanges com custódia](/using-zcash/custodial-exchanges), [DEXs](/dex) ou [plataformas de swap centralizadas](/using-zcash/centralizedswaps).

Também pode comprar Zcash diretamente a outras pessoas ou adquiri-lo através de mineração.

</div>

## Qual é a diferença entre Zcash e outras criptomoedas?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash é fundamentalmente mais privado do que Bitcoin ou Ethereum. Oferece tempos de bloco rápidos (75 segundos), taxas baixas e atualizações regulares.

Os utilizadores podem escolher entre transações **Transparent** ou **Shielded**. Para mais informações, consulte [Um Ecossistema Shielded](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Como é governado o protocolo Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

O protocolo é governado pelo processo de **Proposta de Melhoria Zcash (ZIP)**. Qualquer pessoa pode submeter um rascunho de ZIP. Os rascunhos são debatidos pela comunidade e aceites ou rejeitados pelos editores de ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

As decisões são incluídas na especificação e ratificadas on-chain quando a rede as adota.

</div>

## Onde está a minha Transação?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Primeiro, leia [o nosso guia sobre exploradores de blocos](/guides/blockchain-explorers). Em seguida, consulte o [Zcash Explorador de Blocos](https://zcashblockexplorer.com).

As transações expiram após aproximadamente 25 minutos (20 blocos) e os fundos são devolvidos automaticamente.

**Razões comuns pelas quais uma transação pode não aparecer:**

- Perda de conectividade
- Taxa de transação demasiado baixa
- Sobrecarga da rede
- Demasiadas entradas transparentes (tamanho demasiado grande)

**Dicas para ter sucesso:**

- Utilize uma ligação estável
- Pague a taxa padrão (ou mais elevada para prioridade)
- Aguarde e tente novamente mais tarde
- Utilize menos entradas para manter a transação pequena

</div>

## Zcash é realmente Privado?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Sim.** Zcash encripta os dados do remetente, do montante e do destinatário das transações shielded.

Zcash **não**:

- Encripta transações com múltiplas assinaturas (integração FROST pendente)
- Protege contra correlações com transações transparentes
- Oculta endereços IP

Leitura adicional: [Um Ecossistema Shielded](https://electriccoin.co/blog/shielded-ecosystem)

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
      <td className="py-4 px-5 text-foreground">Não. Um acordo de marca comercial impede a Zcash Foundation ou a ECC de agir contra o consenso da comunidade. A governação é comprovadamente descentralizada (consulte o [relatório da Messari](https://messari.io/report/decentralizing-zcash)). Sondagens comunitárias, ZecHub e o A/V Club Zcash Foundation permitem uma ampla participação.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash tem uma porta dos fundos?</td>
      <td className="py-4 px-5 text-foreground">Não. Nem Zcash nem qualquer software criptográfico que construímos contém uma porta dos fundos, nem nunca conterá.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash é controlado por uma empresa?</td>
      <td className="py-4 px-5 text-foreground">Incorreto. Embora colaboremos com empresas em investigação, Zcash mantém o compromisso com a descentralização. Várias organizações autónomas trabalham juntas em prol da autocustódia e dos direitos à privacidade.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash tem privacidade limitada em comparação com outras moedas de privacidade</td>
      <td className="py-4 px-5 text-foreground">Não. A privacidade ao estilo Monero/Grin depende de iscos (que podem ser derrotados). Zcash encripta todos os dados das transações shielded, pelo que todas as transações no conjunto são indistinguíveis. Consulte [Não é Privado o Suficiente?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Última atualização:** março de 2026
**Quer contribuir?** [Edite esta página no GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
