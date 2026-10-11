<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Privacidad de minería y staking

El pago de tu minero y tu finalizador no son lo mismo. La cadena nunca los vincula. Eso es útil, y es fácil desperdiciarlo.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Minero</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Pago transparente</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase paga a una dirección Zcash. El historial de una t-address es público.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizador</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">Clave zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Una clave ed25519. Firma votos. No es una dirección Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Bono</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Stake blindado</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Se encuentra en el pool de staking. Designa un finalizador objetivo.</p>
  </div>
</div>

## El orden que importa

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Minar</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Blindar</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Crear bono</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Si omites el blindaje, el paso privado nunca ocurre. Un bono no borra una coinbase transparente.</p>
</div>

## Qué es público

| Elemento | ¿Público? | Por qué |
|---|---|---|
| t-address del minero e historial de coinbase | Sí | Salidas transparentes normales |
| Clave del finalizador y zfinv1 | Sí, una vez en el registro | Debe serlo para verificar los votos |
| Poder de voto y banco de recompensas | Sí | Se publica asociado a la clave del finalizador |
| Qué dirección transparente financió un bono | No, después de un blindaje | El bono gasta notas blindadas |
| Vínculo entre tu minero y tu finalizador | No está en la cadena | Nada en el protocolo lo registra |

## Haz stake para ti o para otra persona

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Bono para tu propio finalizador</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">Lo más sencillo. Conservas el rol de operador y el bono. Un observador aún no puede demostrar que la t-address y la zfinv1 pertenecen a la misma persona solo con datos de la cadena.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Bono para otro miembro</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">El poder de voto aparece bajo su clave. Obtiene la comisión del 10 % por finalizador activo. Conservas el 90 % que se acumula en el bono. Este es el patrón que rompe la suposición obvia.</p>
  </div>
</div>

Un grupo puede minar con direcciones de pago independientes, blindar y crear bonos entre sus miembros. Eso hace mucho más difícil afirmar que "este minero es este finalizador". No oculta quiénes son los finalizadores ni oculta la minería.

## Lo que esto no hace

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">No está oculto</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Quiénes son los finalizadores</li>
    <li>Cuánto poder de voto tiene cada uno</li>
    <li>Tu historial de minería transparente</li>
    <li>Un vínculo que creas fuera de la cadena: una IP, un patrón de pago, un operador</li>
  </ul>
</div>

El zfinv1 objetivo está dentro de la acción de staking. La privacidad aquí trata sobre el origen de los fondos, no sobre ocultar la clave de destino.

## Versión corta

Mina. Blinda. Luego crea el bono. La dirección del minero y la clave del finalizador permanecen sin relación, a menos que las conectes tú mismo.
