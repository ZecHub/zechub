<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zcash-Zahlungsanforderungs-URIs

## Überblick über dynamische QR-Codes

URI steht für Universal Resource Identifier. Dabei handelt es sich um QR-Codes, die Informationen zu einer Transaktion in einer Zcash-Wallet vorausfüllen. Wallets, die dieses Format erkennen, können Transaktionen erstellen, indem sie entweder auf Links auf Webseiten klicken oder QR-Codes scannen. Angenommen, Sie betreiben ein Online-Café: Dann können Ihre Kunden Einkäufe tätigen, indem sie diese QR-Codes mit ihrer Zcash-Wallet scannen, wobei Preis und Bestellnummer bereits vorausgefüllt sind.

## Anwendungsfälle von Zahlungsanforderungen 


- Online-Shopping.                    Zahlungsanforderungen beim Bezahlvorgang werden von Kunden während Online-Einkäufen ausgelöst.
- Hotel- und Unterkunftsbuchungen.   Verschiedene Buchungsplattformen nutzen Zahlungsanforderungs-URLs für Hotelreservierungen.
- Online-Rechnungszahlungen.         Versorgungsunternehmen verwenden Zahlungsanforderungs-URLs, damit Kunden ihre Rechnungen nahtlos begleichen können. 
- Kauf von Veranstaltungstickets.    Veranstalter über Landesgrenzen hinweg nutzen diesen Mechanismus, um den Ticketkauf zu erleichtern.
- P2P-Zahlungen.                     Einzelpersonen können Familienmitgliedern und Freunden ganz einfach über Messaging-Apps Zahlungsanforderungen senden, wobei die Zahlungslinks in die Nachrichten eingebettet sind.


## Details

[ZIP 321](https://zips.z.cash/zip-0321) definiert, wie Sie Ihre eigene benutzerdefinierte Zahlungs-URI erstellen. 

So erstellt man Zahlungsanforderungen mit Zcash: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="So erstellt man Zahlungsanforderungen mit Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

    
### Codebeispiel

Ein Zcash-Spenden-Widget zu Ihrer Website hinzufügen: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Ein Zcash-Spenden-Widget zu Ihrer Website hinzufügen"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
