<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Privacidade na mineração e no staking

O pagamento do seu minerador e o seu finalizador não são a mesma coisa. A chain nunca os vincula.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Minerador</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Pagamento transparente</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase paga para um endereço Zcash. O histórico de um t-address é público.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizador</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">Chave zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Uma chave ed25519. Ela assina votos. Não é um endereço Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Garantia</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Stake blindado</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Fica no pool de staking. Indica um finalizador de destino.</p>
  </div>
</div>

## A ordem que importa

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Minerar</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Blindar</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Garantia</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Se você pular a blindagem, a etapa privada nunca acontece. Uma garantia não apaga uma coinbase transparente.</p>
</div>

## O que é público

| Item | Público? | Por quê |
|---|---|---|
| T-address do minerador e histórico de coinbase | Sim | Saídas transparentes normais |
| Chave do finalizador e zfinv1 | Sim, quando estiver na lista | Precisa ser, para verificar os votos |
| Poder de voto e banco de recompensas | Sim | Publicados junto à chave do finalizador para que a distribuição do stake possa ser auditada |
| Qual endereço transparente financiou uma garantia | Não, após a blindagem | A garantia gasta notes blindadas |
| Vínculo entre o seu minerador e o seu finalizador | Não está na chain | Nada no protocolo o registra |

Os valores em staking são revelados de propósito. O design exige que o total em staking e a distribuição entre os finalizadores possam ser verificados publicamente. A quantização (potências de 10) e as janelas fixas de staking limitam o quanto de informação individual de tempo ou de padrão vaza, sem impedir essa auditoria. Os saldos Orchard fora de staking continuam privados; o staking é a divulgação intencional.

## Faça stake para você mesmo ou para outra pessoa

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Garantia para o seu próprio finalizador</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">A opção mais simples. Você mantém o papel de operador e a garantia. Mesmo assim, um observador não consegue provar, apenas com os dados da chain, que o t-address e o zfinv1 pertencem à mesma pessoa.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Garantia para outro membro</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">O poder de voto aparece sob a chave dele. Ele recebe a comissão de 10% de finalizador ativo. Você fica com os 90% que se acumulam sobre a garantia. Isso derruba a suposição óbvia de que o minerador que recebe o pagamento transparente é a mesma pessoa que opera o finalizador.</p>
  </div>
</div>

Um grupo pode minerar em endereços de pagamento separados, blindar e distribuir as garantias entre os membros. Isso torna muito mais difícil afirmar, com base nos dados da chain, que "este minerador é este finalizador". Isso não esconde quem são os finalizadores, nem esconde a mineração.

## O que isso não faz

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Não fica oculto</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Quem são os finalizadores</li>
    <li>Quanto poder de voto cada um tem</li>
    <li>O seu histórico de mineração transparente</li>
    <li>Um vínculo que você cria off-chain: um mesmo IP, um mesmo padrão de pagamento, um mesmo operador</li>
  </ul>
</div>

O zfinv1 de destino fica dentro da ação de staking. Aqui, a privacidade diz respeito à origem dos fundos, não a esconder a chave de destino.

## Versão resumida

Minere. Blinde. Depois, faça a garantia. O endereço do minerador e a chave do finalizador continuam sem relação, a menos que você mesmo os conecte.
