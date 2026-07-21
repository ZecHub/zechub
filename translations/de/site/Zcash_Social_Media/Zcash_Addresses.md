# Von Null zu Zero Knowledge: Transparente vs. Shielded-Transaktionen & Unified Addresses

**Serie:** Zero to Zero Knowledge

Wenn du Zcash zum ersten Mal kennenlernst, wirst du feststellen, dass es zwei Arten von Transaktionen gibt: **Transparent** und **Shielded**.  

Heute lernen wir sie kennen und behandeln eines der neuen Features im #Zcash-Ökosystem: **Unified Addresses**.

---

## Transparente vs. Shielded-Transaktionen

- **Transparente Transaktionen** verwenden **t-addresses** (Base58-kodiert). Alles ist öffentlich sichtbar – genau wie bei Bitcoin.  
- **Shielded-Transaktionen** verwenden Adressen, die für die **Sapling**- oder **Orchard**-Pools kodiert sind. Diese verbergen Absender, Empfänger und Betrag mithilfe von Zero-Knowledge-Beweisen.

**Shielded-Transaktion** bezieht sich auf jede Transaktion mit Adressen, die für Sapling/Orchard-Pools kodiert sind.

![Einführung in Transparente vs. Shielded](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

**Unified Addresses (UAs)** wurden entwickelt, um shielded oder transparente Transaktionen in einer einzigen Adresse zu **vereinheitlichen**.

---

## Adresstypen in Zcash

Es gibt 3 Adresstypen, die verwendet werden:

1. **(T) Transparent** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

Die Anzahl der Zeichen (und damit die Größe des QR-Codes) nimmt mit jedem Typ zu.

![Vergleich der Adresstypen](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![Vergleich der QR-Code-Größe](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## So funktionieren Unified Addresses

Adressen und Schlüssel werden als Byte-Sequenz kodiert (**Raw Encoding**).  
Eine **Receiver Encoding** enthält alle notwendigen Informationen, um einen Vermögenswert mit einem bestimmten Protokoll zu übertragen.

Die Raw Encoding einer Unified Address ist eine Kombination aus Kodierungen (typecode, length, addr) von Receivern:

- UA: `0x03`  
- Sapling: `0x02`  
- Transparent: `0x01`  

**Wichtig**: In jeder UA muss es **mindestens eine shielded Zahlungsadresse** geben. (Sprout-Adressen werden nach dem Canopy-Upgrade nicht mehr unterstützt.)

![UA-Kodierungsstruktur](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Vollständige Spezifikation: **[ZIP-316: Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Vorteile von Unified Addresses

- **Einfacher für Börsen** - Sie können nun shielded Ein- und Auszahlungen sicherer unterstützen.  
- **Zukunftssicher** - Neue shielded Pools können hinzugefügt werden, ohne Wallets zu beeinträchtigen.  
- **Shielded-by-Default** - Jede UA enthält mindestens eine shielded Adresse, daher ist Privatsphäre immer verfügbar.

Das ist ein grundlegender Wandel, der bereits dazu beiträgt, dass mehr ZEC in den shielded Pool fließt.

---

## Orchard-Transaktionen & Actions

Orchard führte ein neues Konzept namens **Actions** ein:

- Sie verringern das Durchsickern von Metadaten, indem sie einen **einzigen Anchor** für alle Actions in einer Transaktion verwenden.  
- Sie führen die Felder von (V4) Spend + Output in einem einzigen Value Commitment zusammen.  
- Dies ermöglicht Performance-Optimierungen des Halo2-Proof-Systems.

Daira erklärt Anchor-Positionen (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Value Balance & Privatsphäre

In einigen Fällen (z. B. bei Cross-Pool-Transaktionen) können Beträge für einen externen Beobachter sichtbar sein. `valueBalanceSapling` und `valueBalanceOrchard` verwenden jedoch **homomorphe Commitments**, um die gesamte ZEC in shielded Pools nachzuweisen und Fälschung zu verhindern.

Mehr dazu: [Verteidigung gegen Fälschung in Shielded Pools](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Zukünftige Verbesserungen

Das ECC-Team arbeitet an neuen RPC-Methoden in `zcashd` (als Ersatz für `z_sendmany`), mit denen Nutzer eine vorgeschlagene Transaktion anhand ihrer Privatsphäre-Eigenschaften vorab ansehen und annehmen/ablehnen können.

---

## Empfehlung

Probiere die neueste Version von **YWallet** aus!  
Sie zeigt bereits einen „Transaction Plan“ auf dem Bildschirm an, bevor du auf Senden drückst, und hilft dir so, privatere Entscheidungen zu treffen.

Großartiger Artikel über die Privatsphäre von Transaktionen: https://medium.com/@hanh.huynh/

---

**Original-Thread von ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Diese Seite wurde aus dem ursprünglichen Zero to Zero Knowledge-Thread für das ZecHub-Wiki zusammengestellt.*
