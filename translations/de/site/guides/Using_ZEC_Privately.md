<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# ZEC privat verwenden

#### Shielded (Privat) vs. Transparent

Derzeit gibt es in Zcash zwei Adress- und Transaktionstypen: shielded und transparent. Der Unterschied zwischen shielded und transparentem ZEC ist sehr einfach. Shielded ZEC hält dein Geld und deine Transaktionen privat, während transparentes ZEC wie Bitcoin funktioniert, also vollständig transparent. Das bedeutet, dass jemand deinen Kontostand und all deine Transaktionen einsehen kann, wenn er deine Adresse kennt.

Wenn Menschen zum ersten Mal ZEC verwenden, erkennen sie möglicherweise nicht, welche Art von Adresse sie benutzen. Das liegt daran, dass nicht alle Börsen shielded ZEC und/oder Auszahlungen von shielded ZEC unterstützen. 

Wenn also zum Beispiel jemand Coinbase nutzt und dort ZEC kauft, würde diese Person transparentes ZEC kaufen und dieses ZEC nur an eine transparente Adresse in einer Wallet auszahlen können. Wallets wie [ZODL](https://zodl.com/) können Gelder, die an eine transparente Adresse gesendet wurden, shielden, um dieses Problem zu lösen, aber nicht allen ist das bewusst. Kurz gesagt: Viele Menschen nutzen ZEC einfach so, wie es ihre Börse oder ihre primäre Wallet ermöglicht.

#### Sicherstellen, dass dein ZEC shielded ist

Wir empfehlen, dass alle ihr ZEC selbst verwahren. Das heißt: Verschiebe dein ZEC von einer Börse in eine Wallet. Der beste Weg, um zu erkennen, ob du shielded, also privates, ZEC verwendest, ist ein Blick auf die Adresse, auf der sich das Guthaben befindet. Wenn die Adresse mit einem `z` oder `u1` beginnt, dann ist dein Guthaben shielded. Wenn die Adresse mit einem `t` beginnt, dann ist das Guthaben transparent.

Im Allgemeinen gibt es zwei Wege zu shielded ZEC.

Von einer Börse, die **shielded** Auszahlungen unterstützt:

  1. Kaufe ZEC auf einer Börse
  2. Starte den Auszahlungsprozess auf der Börse
  3. Öffne deine shielded-ZEC-Wallet und stelle sicher, dass die Empfangsadresse mit einem `u1` oder `z` beginnt
  4. Führe die Auszahlung von deiner Börse aus

Von einer Börse, die **transparente** Auszahlungen unterstützt:


  1. Kaufe ZEC auf einer Börse
  2. Starte den Auszahlungsprozess auf der Börse
  3. Öffne deine ZEC-Wallet mit automatischem Shielding und verwende die transparente Empfangsadresse
  4. Führe die Auszahlung von deiner Börse aus
  5. Warte zehn Bestätigungen und schilde das ZEC dann von deiner transparenten Adresse auf eine shielded Adresse


Hier ist eine Anleitung, wie du ZEC von einer Börse abhebst. Beachte, dass dies eine shielded Auszahlung ist.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="ZEC kaufen und von Gemini auf eine shielded Wallet auszahlen"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
Hier ist eine Anleitung, wie du dein ZEC von einer transparenten Adresse auf eine shielded Adresse shieldest.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Schilde dein ZEC von einer transparenten auf eine shielded Adresse"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
Hier ist eine Anleitung, wie du ZEC auf Coinbase kaufst und an Zashi sendest.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Zcash kaufen und sofort shielden"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### Transaktionen

Nachdem du sichergestellt hast, dass sich dein ZEC in einer shielded Wallet befindet, die shielded Adressen unterstützt, kannst du nun entscheiden, ob du mit diesem ZEC Transaktionen durchführen möchtest. Transaktionen mit ZEC sind super einfach. Du kannst ZEC je nach Präferenz der anderen Person entweder an shielded oder an transparente Adressen senden. Wie bei jeder Geldtransaktion besteht eine geringe Chance, dass Menschen Daten preisgeben. ZEC ist am besten darin, sich gegen Datenlecks zu schützen, aber das bedeutet nicht, dass du es sorglos verwenden solltest. Hier sind einige Dinge, die du vermeiden solltest, wenn du mit ZEC Transaktionen durchführst.

- Deine shielded Adresse offenzulegen
- Eine shielded Adresse als Durchgangsstation für t-Adressen zu verwenden (auch bekannt als „Mixing“)
- Eine hohe Anzahl von shielded-zu-transparent-Transaktionen durchzuführen und offenzulegen, dass du dies tust
- Menschen regelmäßig wissen zu lassen, wo du shielded ZEC ausgibst


Im Wesentlichen ist das Beste, was du mit deinem ZEC tun kannst, es in einer shielded Wallet aufzubewahren, zwischen shielded Adressen zu transagieren und vorsichtig damit zu sein, wie du ZEC in der Öffentlichkeit verwendest (z. B. in einem Café). Die Wahrung der Privatsphäre bringt ein gewisses Maß an Verantwortung mit sich. 

#### Ressourcen

[Zcash-Transaktionen](https://zechub.wiki/using-zcash/transactions)
