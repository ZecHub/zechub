# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> Accepter des dons ZEC privés en tant qu'organisation à but non lucratif américaine

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermédiaire - 10 min
</span>

> Cette page fournit des informations générales et ne constitue pas un conseil juridique ou fiscal. Les règles fiscales américaines évoluent : vérifiez donc chaque étape auprès de votre comptable ou de votre conseiller fiscal. Chaque règle ci-dessous renvoie à sa source IRS, vérifiée en octobre 2026 par rapport à la Publication 526 (pour les déclarations 2025) et au formulaire 8283 (révision de décembre 2025). La FAQ IRS sur les monnaies virtuelles a été rédigée pour les transactions antérieures à 2025 : comparez-la donc aux directives actuelles.

## En bref

- Conservez les dons dans un portefeuille protégé contrôlé par votre organisation, et non dans le portefeuille personnel d'un membre du personnel
- L'IRS considère le ZEC comme un bien, de sorte qu'un don en ZEC est une contribution non monétaire
- Pour un don de 250 $ ou plus, envoyez au donateur un reçu écrit qui décrit le ZEC sans lui attribuer de valeur en dollars
- Pour les dons de plus de 5 000 $, le donateur a besoin d'une évaluation qualifiée, et vous signez son formulaire 8283
- Si vous vendez le ZEC dans les trois ans suivant sa réception et que vous avez signé la section B du formulaire 8283 du donateur, déposez le formulaire 8282
- Un donateur qui reste anonyme vis-à-vis de vous ne peut généralement pas déduire un don de 250 $ ou plus

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> À qui s'adresse ce guide ?

- Aux organismes de bienfaisance 501(c)(3), églises et associations locales américaines qui souhaitent accepter du ZEC
- Aux trésoriers, comptables et membres du conseil d'administration qui mettent en place les dons en cryptomonnaie
- Aux donateurs qui veulent savoir ce qu'une organisation à but non lucratif attend d'eux

Pour les particuliers et les créateurs, consultez [Recevoir des dons en toute confidentialité](/zcash-use-cases/receive-donations-privately).

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Le problème

La plupart des services de dons en cryptomonnaie destinés aux organismes de bienfaisance américains vous fournissent une adresse transparente, ou convertissent le don pour vous en passant par l'une d'elles. Sur une adresse transparente, n'importe qui peut voir chaque don, son montant et votre solde. Un donateur qui donne délibérément de manière confidentielle perd cette confidentialité dès que le don arrive.

Une organisation à but non lucratif a aussi des obligations administratives qu'un particulier n'a pas : reçus pour les donateurs, formulaires IRS pour les dons importants et déclaration annuelle. Confidentialité et obligations administratives peuvent coexister, à condition de vous y préparer avant l'arrivée du premier don.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Ce qui reste confidentiel, et ce qui ne l'est pas

| | Don protégé vers votre adresse protégée |
|---|---|
| Le public | Ne voit ni le donateur, ni votre adresse, ni le montant |
| Votre organisation | Voit le montant et l'éventuel mémo ; ne voit le donateur que s'il se fait connaître |
| Votre comptable | Voit ce que vous partagez, par exemple avec une [clé pour lecture seule](/zcash-tech/viewing-keys) |
| Lors de la vente | Si votre exchange n'accepte que les dépôts transparents, le montant que vous sortez du pool protégé devient public (voir [le sas comptable](/zcash-tech/the-turnstile)) |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Ce dont vous avez besoin

- Une politique d'acceptation des dons, approuvée par votre conseil d'administration, qui couvre les cryptomonnaies
- Un [portefeuille](/using-zcash/wallets) avec des adresses protégées, contrôlé par l'organisation
- Un compte sur un exchange au nom de l'organisation, si vous prévoyez de convertir du ZEC en dollars
- Un comptable ayant déjà traité des dons non monétaires

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Guide étape par étape

### Étape 1 : définissez votre politique

Consignez par écrit, et faites approuver par votre conseil d'administration :
- Qui peut déplacer les fonds, et si deux personnes doivent approuver chaque mouvement
- Si vous vendez chaque don immédiatement ou si vous conservez une partie du ZEC
- Si vous acceptez les dons anonymes, et jusqu'à quel montant

### Étape 2 : configurez un portefeuille contrôlé par l'organisation

- Créez le portefeuille sur un appareil de l'organisation, et non sur un téléphone personnel
- Conservez la phrase de récupération hors ligne, auprès de deux responsables pouvant chacun y accéder
- Pour un contrôle partagé, consultez [Gérer une trésorerie communautaire confidentielle](/zcash-use-cases/private-community-treasury)

### Étape 3 : publiez une adresse protégée

- Partagez une adresse exclusivement protégée sur votre page de dons. Une [adresse unifiée](/using-zcash/unified-addresses) commence par `u1`, mais elle peut aussi contenir un récepteur transparent, et un don provenant d'un portefeuille uniquement transparent arrive alors de manière publique. Utilisez l'adresse exclusivement protégée de votre portefeuille s'il en propose une.
- Ne publiez pas d'adresse transparente (elle commence par `t1` ou `t3`)
- Demandez aux donateurs qui souhaitent un reçu d'indiquer leur adresse e-mail dans le [mémo](/using-zcash/memos). Le mémo est chiffré : seule votre organisation peut le lire.

### Étape 4 : enregistrez chaque don

Pour chaque don, enregistrez :
- La date et l'heure de réception
- Le montant en ZEC
- La valeur en dollars américains à ce moment-là, et la source de prix utilisée
- L'identifiant de la transaction et le mémo

L'IRS considère le ZEC comme un bien ([Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)) : il s'agit donc d'une contribution non monétaire dans votre comptabilité. Pour donner à votre comptable un accès en lecture seule, consultez [Tenir sa comptabilité avec du ZEC protégé](/zcash-use-cases/keeping-records-with-shielded-zec).

### Étape 5 : accusez réception des dons de 250 $ ou plus

Un donateur ne peut pas déduire un don unique de 250 $ ou plus sans un reçu écrit de votre part ([Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)). Pour un don en ZEC, indiquez :
- Le nom de votre organisation
- La date de réception
- Une description du don, par exemple « 1,5 ZEC ». N'y indiquez pas de valeur en dollars : l'évaluation du don incombe au donateur.
- Si vous avez fourni quelque chose en contrepartie, par exemple « Aucun bien ni service n'a été fourni en échange de cette contribution. »

Le donateur doit disposer de ce reçu avant de déposer sa déclaration de revenus ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)). Les organisations l'envoient généralement avant le 31 janvier de l'année suivante ; l'envoyer immédiatement reste le plus simple.

### Étape 6 : signez le formulaire 8283 pour les dons de plus de 5 000 $

Si un donateur déclare plus de 5 000 $, il a besoin d'une évaluation qualifiée. Les cryptomonnaies ne sont pas considérées comme des titres cotés en bourse, l'évaluation s'applique donc à elles ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)). Le donateur vous apporte le [formulaire 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf), et vous signez la partie réservée au bénéficiaire dans la section B. Votre signature confirme que vous avez reçu le ZEC à cette date ; elle ne confirme pas la valeur déclarée par le donateur ([FAQ de l'IRS, Q36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Étape 7 : convertissez en dollars, si nécessaire

- Vérifiez quels exchanges acceptent les dépôts protégés sur la page [Exchanges dépositaires](/using-zcash/custodial-exchanges). Beaucoup n'acceptent que les dépôts transparents.
- Si le vôtre n'accepte que les dépôts transparents, transférez le ZEC de votre portefeuille protégé vers l'exchange en une seule fois, au moment de la vente. Ce montant devient public, mais vos autres dons et votre solde restent confidentiels.
- Si vous vendez le ZEC dans les trois ans suivant sa réception et que vous avez signé la section B du formulaire 8283 du donateur, déposez le [formulaire 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) dans les 125 jours suivant la vente et envoyez-en une copie au donateur ([FAQ de l'IRS, Q37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Étape 8 : déclarez les dons dans votre déclaration annuelle

Déclarez les dons en ZEC comme des contributions non monétaires dans votre déclaration de la série 990, avec l'[annexe M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990) si elle vous concerne. Demandez à votre comptable comment présenter les dons anonymes.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Donateurs anonymes : ce qu'ils peuvent déduire et ce qu'ils ne peuvent pas déduire

- La confidentialité vis-à-vis du public n'est pas la même chose que l'anonymat vis-à-vis de vous. Un donateur peut donner de manière confidentielle tout en indiquant son adresse e-mail dans le mémo pour obtenir un reçu.
- Un donateur qui reste anonyme vis-à-vis de vous ne peut pas obtenir de reçu, et ne peut donc pas déduire un don unique de 250 $ ou plus.
- Au-delà de 5 000 $, le donateur a également besoin d'une évaluation et de votre signature sur le formulaire 8283, ce qui implique de vous révéler son identité.
- Pour le donateur, un don en ZEC détenu depuis plus d'un an est généralement déductible à sa juste valeur marchande, sans impôt sur les plus-values sur le don ([FAQ de l'IRS, Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

Indiquez-le sur votre page de dons, afin que les donateurs puissent choisir avant de donner.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erreurs courantes à éviter

- Conserver les dons dans le portefeuille personnel d'un membre du personnel
- Publier une adresse transparente, ou une adresse de dépôt d'exchange, comme adresse de dons
- Indiquer une valeur en dollars dans le reçu
- Vendre dans les trois ans et oublier le formulaire 8282
- Promettre une déduction fiscale aux donateurs anonymes

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Résultat

Vous pouvez :
- Accepter du ZEC sans exposer vos donateurs ni votre solde
- Fournir aux donateurs les documents dont ils ont besoin pour bénéficier d'une déduction
- Tenir des registres que votre comptable et votre auditeur peuvent vérifier

<br/>

## Sources

- [IRS : Questions fréquentes sur les transactions en monnaie virtuelle](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (les questions Q34 à Q37 concernent les organismes de bienfaisance)
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771 : contributions caritatives, justification et divulgation](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526 : contributions caritatives](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561 : déterminer la valeur des biens donnés](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012 : évaluations des dons en cryptomonnaie](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Formulaire 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) et [formulaire 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Voir aussi

- [Recevoir des dons en toute confidentialité](/zcash-use-cases/receive-donations-privately) - la même idée pour les particuliers
- [Tenir sa comptabilité avec du ZEC protégé](/zcash-use-cases/keeping-records-with-shielded-zec) - mémos et clés pour lecture seule pour votre comptabilité
- [Viewing Keys](/zcash-tech/viewing-keys) - un accès en lecture seule pour un comptable ou un auditeur
- [Le sas comptable](/zcash-tech/the-turnstile) - ce qui devient public lorsque du ZEC quitte un pool protégé

<br/>

## Étape suivante

- [Gérer une trésorerie communautaire confidentielle](/zcash-use-cases/private-community-treasury)

<br/>
