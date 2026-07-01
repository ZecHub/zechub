# Perguntas Frequentes

Uma lista das perguntas mais comuns sobre Zcash. Para solucionar problemas do cliente Zcash, consulte o [guia oficial de solução de problemas](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navegação Rápida
[O que é Zcash?](#what-is-zcash) | [Como adquirir Zcash?](#acquire) | [Diferença em relação a outras criptomoedas?](#difference) | [Governança do protocolo?](#governance) | [Onde está minha transação?](#transaction) | [Zcash é realmente privado?](#privacy) | [Equívocos comuns](#misconceptions)

---

## O que é Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash é uma moeda digital com transações rápidas, confidenciais e de baixo custo. A privacidade é a característica central do Zcash. Foi pioneiro no uso de provas de conhecimento zero para criptografar todas as transações.  

Várias carteiras estão disponíveis para pagamentos instantâneos, móveis, seguros e privados: [Carteiras Móveis](https://z.cash/wallets/)
</div>

## Como posso adquirir Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Você pode comprar ZEC em [exchanges](https://z.cash/exchanges) de criptomoedas.  
Você também pode comprar Zcash diretamente de outra pessoa ou obtê-lo por mineração.
</div>

## Qual é a diferença entre Zcash e outras criptomoedas?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash é fundamentalmente mais privado do que Bitcoin ou Ethereum. Oferece tempos de bloco rápidos (75 segundos), taxas baixas e atualizações regulares.  

Os usuários podem escolher entre transações **Transparent** ou **Shielded**. Para mais informações, veja [Um Ecossistema Shielded](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html).
</div>

## Como o protocolo Zcash é governado?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
O protocolo é governado pelo processo de **Zcash Improvement Proposal (ZIP)**. Qualquer pessoa pode enviar um rascunho de ZIP. Os rascunhos são debatidos pela comunidade e aceitos ou rejeitados pelos editores de ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

As decisões são registradas na especificação e ratificadas on-chain quando a rede as adota.
</div>

## Onde está minha Transação?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Primeiro, leia [nosso guia sobre exploradores de blocos](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629). Em seguida, consulte o [Explorador de Blocos do Zcash](https://zcashblockexplorer.com).  

As transações expiram após aproximadamente 25 minutos (20 blocos) e os fundos são devolvidos automaticamente.  

**Razões comuns para uma transação não aparecer:**
- Perda de conectividade
- Taxa de transação muito baixa
- Sobrecarga da rede
- Entradas transparentes em excesso (tamanho muito grande)

**Dicas para ter sucesso:**
- Use uma conexão estável
- Pague a taxa padrão (ou mais alta para prioridade)
- Aguarde e tente novamente mais tarde
- Use menos entradas para manter a transação pequena
</div>

## Zcash é realmente Privado?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**Sim.** Zcash criptografa os dados do remetente, do valor e do destinatário nas transações shielded.  

Zcash **não**:
- Criptografa transações multifirma (integração FROST pendente)
- Protege contra correlações com transações transparentes
- Oculta endereços IP

Leitura adicional: [Um Ecossistema Shielded](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## Alguns equívocos comuns

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Equívoco</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Resposta Correta</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash é uma moeda centralizada?</td>
        <td className="py-5 px-6 text-foreground">Não. Um acordo de marca registrada impede que a Zcash Foundation ou a ECC ajam contra o consenso da comunidade. A governança é comprovadamente descentralizada (veja o [relatório da Messari](https://messari.io/report/decentralizing-zcash)). Enquetes da comunidade, ZecHub e o A/V Club da Zcash Foundation também permitem ampla participação.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash tem uma backdoor?</td>
        <td className="py-5 px-6 text-foreground">Não. Nem Zcash nem qualquer software criptográfico que construímos contém uma backdoor, e nunca conterá.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash é controlado por uma corporação?</td>
        <td className="py-5 px-6 text-foreground">Incorreto. Embora façamos parceria com empresas para pesquisa, Zcash continua comprometido com a descentralização. Várias organizações autônomas trabalham juntas em prol da autocustódia e dos direitos à privacidade.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash tem privacidade limitada em comparação com outras privacy coins</td>
        <td className="py-5 px-6 text-foreground">Não. A privacidade no estilo Monero/Grin depende de iscas (que podem ser derrotadas). Zcash criptografa todos os dados de transações shielded, de modo que cada transação no pool seja indistinguível. Veja [Privacidade Não É Suficiente?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
      </tr>
    </tbody>
  </table>
</div>

---

**Última atualização:** março de 2026  
**Quer contribuir?** [Edite esta página no GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
