# Was sind Zcash TEX-Adressen?

Zcash TEX-Adressen stellen einen besonderen Typ von Empfangsadresse dar. Als Akronym für „Transparent Exchange“-Adresse ist sie eine **eindeutige**, Unified-Type-(bech32m)-Kodierung einer einzelnen p2pkh-Transparent-Adresse.

Ihr einziger Zweck besteht darin, einer kompatiblen Wallet mitzuteilen, eine ausschließlich transparente Transaktion (T -> T) auszuführen.

Die Logik ist wie folgt: Beim Erkennen einer TEX-Adresse dekodiert eine kompatible Wallet diese, um den enthaltenen Transparent-Empfänger zu erhalten. Die Wallet sendet dann die für die tx erforderlichen Mittel aus dem Shielded-Pool an eine separate, vom Nutzer kontrollierte, temporäre Transparent-Adresse (Z -> T). Anschließend sendet sie diese Mittel an den dekodierten Transparent-Empfänger der TEX-Adresse (T -> T).

Der technische Vorschlag für TEX-Adressen ist in Zcash [ZIP 320](https://zips.z.cash/zip-0320) beschrieben, das einen Adresstyp definiert, der ausschließlich für den Empfang von Mitteln von Transparent-Adressen vorgesehen ist.

![TEX](https://i.ibb.co/8m7HPqV/ZashiTex.png)


Obwohl TEX-Adressen noch nicht breit angenommen sind, könnten Zcash-Nutzer sie künftig verwenden müssen.

## Wann benötige ich eine TEX-Adresse?

### Du **benötigst** eine TEX-Adresse, wenn du Mittel an eine Transparent-Adresse sendest und dabei eine Wallet verwendest, die das direkte Senden an eine Transparent-Adresse nicht unterstützt.
Bestimmte Wallets erlauben das direkte Senden an eine Transparent-Adresse einfach nicht, und **der Empfänger stellt möglicherweise kein TEX-Äquivalent bereit**. Daher kann es gelegentlich erforderlich sein, **von einer Transparent-Adresse in eine TEX-Adresse zu konvertieren**. Das kann manuell erreicht werden, indem die in zip-320 beschriebene Referenzimplementierung ausgeführt wird. Eine gehostete Instanz eines **Transparent-to-TEX-Converters** findest du [HIER](https://690e9524c66a3ecac5d54eff--jade-brioche-873777.netlify.app/).

### Du benötigst eine TEX-Adresse, wenn du Mittel an eine zentralisierte Börse sendest, die **VERLANGT, dass diese Mittel aus einer Transparent-Quelle stammen**.
Derzeit ist [Binance](https://www.binance.com/) die einzige zentralisierte Börse, die TEX-Adressen verwendet (und sie sind der Hauptgrund für die Erstellung von TEX).
TEX-Adressen teilen einer kompatiblen Wallet mit, dass alle an diese Adresse gesendeten Mittel transparent sein müssen und dass jeglicher shielded Wert vom Senden an diese Adresse ausgeschlossen ist.
Wenn eine Börse wie Binance den gesendeten Wert ablehnt, verfügt sie über die notwendigen Mittel, um diesen Wert an die Adresse zurückzusenden, von der er stammt. Außerdem hilft es Unternehmen wie Binance, die von Regierungen oder anderen Behörden auferlegten Gesetze und Vorschriften einzuhalten.


## Welche Wallets unterstützen TEX-Adressen?

Die aktuellste Liste findest du auf unserer Seite [Wallets](https://zechub.wiki/wallets). Verwende den **TEX-Adressfilter.**
