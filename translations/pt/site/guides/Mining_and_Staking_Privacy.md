<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Privacidade na mineração e no staking

O pagamento do seu minerador e o seu finalizador não são a mesma coisa. A cadeia nunca os associa.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Minerador</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Pagamento transparente</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase paga para um endereço Zcash. O histórico de um t-address é público.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizador</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">Chave zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Uma chave ed25519. Assina votos. Não é um endereço Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Vínculo</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Stake blindado</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Fica na pool de staking. Indica um finalizador de destino.</p>
  </div>
</div>

## A ordem que importa

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Minerar</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Blindar</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Vincular</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Ignore a blindagem e o passo privado nunca acontece. Um vínculo não apaga uma coinbase transparente.</p>
</div>

## O que é público

| Elemento | Público? | Porquê |
|---|---|---|
| t-address do minerador e histórico de coinbase | Sim | Outputs transparentes normais |
| Chave do finalizador e zfinv1 | Sim, uma vez no registo | Tem de o ser para verificar os votos |
| Poder de voto e banco de recompensas | Sim | Publicados em relação à chave do finalizador para que a distribuição de stake possa ser auditada |
| Que endereço transparente financiou um vínculo | Não, após uma blindagem | O vínculo gasta notas blindadas |
| Ligação do seu minerador ao seu finalizador | Não está na cadeia | Nada no protocolo a regista |

Os montantes em stake são revelados deliberadamente. O design exige que o total em stake e a distribuição pelos finalizadores possam ser verificados publicamente. A quantização (potências de 10) e as janelas de stake fixas limitam a quantidade de informação individual sobre o momento ou padrões que é revelada, permitindo ainda assim essa auditoria. Os saldos de Orchard sem stake permanecem privados; o staking é a divulgação intencional.

## Fazer stake para si ou para outra pessoa

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Vincule-se ao seu próprio finalizador</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">A opção mais simples. Mantém a função de operador e o vínculo. Ainda assim, um observador não consegue provar, apenas com dados da cadeia, que o t-address e o zfinv1 pertencem à mesma pessoa.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Vincule-se a outro membro</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">O poder de voto aparece associado à chave dessa pessoa. Ela recebe a comissão de 10% do finalizador ativo. Mantém os 90% que são acumulados no vínculo. Isto desfaz a suposição óbvia de que o minerador que recebe o pagamento transparente é a mesma pessoa que opera o finalizador.</p>
  </div>
</div>

Um grupo pode minerar em endereços de pagamento distintos, blindar e criar vínculos entre membros. Isso torna muito mais difícil afirmar, com base nos dados da cadeia, que «este minerador é este finalizador». Não oculta quem são os finalizadores, nem oculta a mineração.

## O que isto não faz

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Não oculto</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Quem são os finalizadores</li>
    <li>Quanto poder de voto cada um tem</li>
    <li>O seu histórico transparente de mineração</li>
    <li>Uma ligação que crie fora da cadeia: um IP, um padrão de pagamento, um operador</li>
  </ul>
</div>

O zfinv1 de destino está dentro da ação de staking. Aqui, a privacidade diz respeito à origem dos fundos, não a ocultar a chave de destino.

## Versão curta

Minere. Blinde. Depois, vincule. O endereço do minerador e a chave do finalizador permanecem sem relação, a menos que os associe você mesmo.
