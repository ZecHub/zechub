<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Privatsphäre beim Mining und Staking

Deine Miner-Auszahlung und dein Finalizer sind nicht dasselbe. Die Chain verknüpft sie niemals. Das ist nützlich, und es ist leicht zu verschwenden.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Miner</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Transparente Auszahlung</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase zahlt an eine Zcash-Adresse aus. Der Verlauf einer t-Adresse ist öffentlich.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1-Schlüssel</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Ein ed25519-Schlüssel. Er signiert Stimmen. Er ist keine Zcash-Adresse.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Bond</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Abgeschirmter Einsatz</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Liegt im Staking-Pool. Benennt einen Ziel-Finalizer.</p>
  </div>
</div>

## Die Reihenfolge ist wichtig

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Minen</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Abschirmen</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Bonden</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Überspringst du das Abschirmen, findet der private Schritt niemals statt. Ein Bond löscht keine transparente Coinbase.</p>
</div>

## Was öffentlich ist

| Sache | Öffentlich? | Warum |
|---|---|---|
| Miner-t-Adresse und Coinbase-Verlauf | Ja | Normale transparente Outputs |
| Finalizer-Schlüssel und zfinv1 | Ja, sobald in der Liste | Das muss so sein, damit Stimmen überprüft werden können |
| Stimmgewicht und Reward-Bank | Ja | Gegen den Finalizer-Schlüssel veröffentlicht |
| Welche transparente Adresse einen Bond finanziert hat | Nein, nach dem Abschirmen | Der Bond gibt abgeschirmte Notes aus |
| Verbindung von deinem Miner zu deinem Finalizer | Nicht on-chain | Nichts im Protokoll schreibt sie fest |

## An dich selbst staken oder an jemand anderen

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Bond an deinen eigenen Finalizer</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">Am einfachsten. Du behältst die Betreiberrolle und den Bond. Ein Beobachter kann allein anhand der Chain-Daten dennoch nicht beweisen, dass die t-Adresse und zfinv1 zu derselben Person gehören.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Bond an ein anderes Mitglied</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Das Stimmgewicht wird unter deren Schlüssel angezeigt. Sie verdienen die 10%-Provision für aktive Finalizer. Du behältst die 90%, die auf dem Bond anfallen. Dieses Muster durchbricht die naheliegende Vermutung.</p>
  </div>
</div>

Eine Gruppe kann auf separaten Auszahlungsadressen minen, abschirmen und Bonds über ihre Mitglieder verteilen. Dadurch ist die Behauptung „Dieser Miner ist dieser Finalizer“ wesentlich schwieriger. Es verbirgt nicht, wer die Finalizer sind, und es verbirgt auch nicht das Mining.

## Was dadurch nicht geschieht

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Nicht verborgen</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Wer die Finalizer sind</li>
    <li>Wie viel Stimmgewicht jeder hat</li>
    <li>Dein transparenter Mining-Verlauf</li>
    <li>Eine Verbindung, die du off-chain herstellst: eine IP, ein Auszahlungsmuster, ein Betreiber</li>
  </ul>
</div>

Die Ziel-zfinv1 befindet sich innerhalb der Staking-Aktion. Privatsphäre bezieht sich hier auf die Herkunft der Mittel, nicht auf das Verbergen des Zielschlüssels.

## Kurzfassung

Mine. Schirme ab. Dann bonde. Die Miner-Adresse und der Finalizer-Schlüssel bleiben unverbunden, sofern du sie nicht selbst verknüpfst.
