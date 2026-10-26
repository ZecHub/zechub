# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> Accepter des dons privés en ZEC en tant qu'organisme américain à but non lucratif

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermédiaire - 10 min
</span>

> Cette page fournit des informations générales, et non des conseils juridiques ou fiscaux. Les règles fiscales américaines évoluent ; vérifiez donc chaque étape auprès de votre comptable ou conseiller fiscal. Chaque règle ci-dessous renvoie à sa source IRS, vérifiée en octobre 2026 par rapport à la Publication 526 (pour les déclarations 2025) et au Form 8283 (révision de décembre 2025). La FAQ de l'IRS sur les monnaies virtuelles a été rédigée pour les transactions antérieures à 2025 ; vérifiez-la donc à la lumière des directives actuelles.

## En bref

- Conservez les dons dans un wallet blindé contrôlé par votre organisation, et non dans le wallet personnel d'un membre du personnel
- L'IRS considère ZEC comme un bien, donc un don en ZEC est une contribution non monétaire
- Pour un don de 250 $ ou plus, envoyez au donateur un accusé de réception écrit qui décrit le ZEC mais n'indique pas sa valeur en dollars
- Pour les dons de plus de 5 000 $, le donateur a besoin d'une évaluation qualifiée, et vous signez son Form 8283
- Si vous vendez ZEC dans les trois ans suivant sa réception et que vous avez signé la section B du Form 8283 du donateur, déposez le Form 8282
- Un donateur qui reste anonyme à votre égard ne peut généralement pas demander de déduction de 250 $ ou plus

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> À qui cela s'adresse-t-il ?

- Aux organismes caritatifs américains 501(c)(3), aux églises et aux groupes communautaires qui souhaitent accepter ZEC
- Aux trésoriers, teneurs de livres et membres du conseil d'administration qui mettent en place des dons en crypto
- Aux donateurs qui souhaitent savoir ce dont une organisation à but non lucratif a besoin de leur part

Pour les particuliers et les créateurs, consultez [Recevoir des dons en privé](/zcash-use-cases/receive-donations-privately).

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Le problème

La plupart des services de dons en crypto destinés aux organismes caritatifs américains vous fournissent une adresse transparente, ou convertissent le don pour vous par son intermédiaire. Avec une adresse transparente, n'importe qui peut voir chaque don, son montant et votre solde. Un donateur qui donne volontairement de manière privée perd cette confidentialité dès que le don arrive.

Une organisation à but non lucratif a également des formalités qu'un particulier n'a pas : reçus de dons, formulaires IRS pour les dons importants et déclaration annuelle. La confidentialité et ces formalités peuvent coexister, à condition de les prévoir avant l'arrivée du premier don.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Ce qui reste privé, et ce qui ne l'est pas

| | Don blindé vers votre adresse blindée |
|---|---|
| Le public | Ne peut pas voir le donateur, votre adresse ni le montant |
| Votre organisation | Voit le montant et tout mémo ; ne voit le donateur que s'il le lui indique |
| Votre comptable | Voit ce que vous partagez, par exemple avec une [clé de visualisation](/zcash-tech/viewing-keys) |
| Lorsque vous vendez | Si votre plateforme d'échange n'accepte que les dépôts transparents, le montant que vous sortez du pool blindé devient public (voir [le tourniquet](/zcash-tech/the-turnstile)) |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Ce dont vous avez besoin

- Une politique d'acceptation des dons, approuvée par votre conseil d'administration, qui couvre les cryptomonnaies
- Un [wallet](/using-zcash/wallets) avec des adresses blindées, contrôlé par l'organisation
- Un compte sur une plateforme d'échange au nom de l'organisation, si vous prévoyez de convertir ZEC en dollars
- Un comptable ayant déjà traité des dons non monétaires

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Guide étape par étape

### Étape 1 : Décidez de votre politique

Mettez par écrit, puis faites approuver par votre conseil d'administration :
- Qui peut déplacer les fonds, et si deux personnes doivent approuver chaque mouvement
- Si vous vendez immédiatement chaque don ou conservez une partie des ZEC
- Si vous acceptez les dons anonymes, et jusqu'à quel montant

### Étape 2 : Configurez un wallet contrôlé par l'organisation

- Créez le wallet sur un appareil de l'organisation, et non sur un téléphone personnel
- Conservez la phrase de récupération hors ligne, auprès de deux responsables pouvant chacun y accéder
- Pour un contrôle partagé, consultez [Gérer une trésorerie communautaire privée](/zcash-use-cases/private-community-treasury)

### Étape 3 : Publiez une adresse blindée

- Partagez une adresse exclusivement blindée sur votre page de dons. Une [adresse unifiée](/using-zcash/unified-addresses) commence par `u1`, mais elle peut également contenir un récepteur transparent, et un don provenant d'un wallet uniquement transparent arrive alors publiquement. Utilisez l'adresse exclusivement blindée de votre wallet s'il en propose une.
- Ne publiez pas d'adresse transparente (elle commence par `t1` ou `t3`)
- Demandez aux donateurs qui souhaitent un reçu d'indiquer leur e-mail dans le [mémo](/using-zcash/memos). Le mémo est chiffré ; seule votre organisation peut donc le lire.

### Étape 4 : Enregistrez chaque don

Pour chaque don, enregistrez :
- La date et l'heure de réception
- Le montant en ZEC
- La valeur en dollars américains à ce moment-là, ainsi que la source de prix utilisée
- L'identifiant de transaction et le mémo

L'IRS considère ZEC comme un bien ([Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)), il s'agit donc d'une contribution non monétaire dans votre comptabilité. Pour donner à votre comptable un accès en lecture seule, consultez [Tenir des registres avec des ZEC blindés](/zcash-use-cases/keeping-records-with-shielded-zec).

### Étape 5 : Accusez réception des dons de 250 $ ou plus

Un donateur ne peut pas déduire un don unique de 250 $ ou plus sans accusé de réception écrit de votre part ([Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)). Pour un don en ZEC, incluez :
- Le nom de votre organisation
- La date à laquelle vous l'avez reçu
- Une description du don, par exemple « 1,5 ZEC ». N'indiquez pas sa valeur en dollars : l'évaluation du don relève du donateur.
- Si vous avez fourni quelque chose en contrepartie, par exemple « Aucun bien ni service n'a été fourni en échange de cette contribution. »

Le donateur doit l'avoir avant de déposer sa déclaration fiscale ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)). Les organisations l'envoient généralement avant le 31 janvier de l'année suivante ; l'envoyer immédiatement est plus simple.

### Étape 6 : Signez le Form 8283 pour les dons de plus de 5 000 $

Si un donateur déclare plus de 5 000 $, il a besoin d'une évaluation qualifiée. La crypto n'est pas considérée comme un titre coté en bourse, donc l'évaluation s'y applique ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)). Le donateur vous apporte le [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf), et vous signez la partie destinée au bénéficiaire dans la section B. Votre signature confirme que vous avez reçu le ZEC à cette date ; elle ne confirme pas la valeur déclarée par le donateur ([FAQ IRS, Q36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Étape 7 : Convertissez en dollars, si nécessaire

- Vérifiez quelles plateformes d'échange acceptent les dépôts blindés dans [Plateformes d'échange custodiales](/using-zcash/custodial-exchanges). Beaucoup n'acceptent que les dépôts transparents.
- Si la vôtre est uniquement transparente, transférez le ZEC de votre wallet blindé vers la plateforme d'échange en une seule étape, au moment de la vente. Ce montant devient public, mais vos autres dons et votre solde restent privés.
- Si vous vendez ZEC dans les trois ans suivant sa réception et que vous avez signé la section B du Form 8283 du donateur, déposez le [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) dans les 125 jours suivant la vente et envoyez-en une copie au donateur ([FAQ IRS, Q37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Étape 8 : Déclarez-les dans votre déclaration annuelle

Déclarez les dons en ZEC comme contributions non monétaires dans votre déclaration de série Form 990, avec l'[Annexe M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990) si elle vous concerne. Demandez à votre comptable comment déclarer les dons anonymes.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Donateurs anonymes : ce qu'ils peuvent et ne peuvent pas demander

- La confidentialité vis-à-vis du public n'est pas la même chose que l'anonymat vis-à-vis de vous. Un donateur peut donner de manière privée tout en partageant son e-mail dans le mémo afin d'obtenir un reçu.
- Un donateur qui reste anonyme à votre égard ne peut pas obtenir d'accusé de réception ; il ne peut donc pas déduire un don unique de 250 $ ou plus.
- Au-delà de 5 000 $, le donateur a également besoin d'une évaluation et de votre signature sur le Form 8283, ce qui implique de vous révéler son identité.
- Pour le donateur, un don en ZEC détenu pendant plus d'un an est généralement déductible à sa juste valeur marchande, sans impôt sur les plus-values sur le don ([FAQ IRS, Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

Indiquez cela sur votre page de dons afin que les donateurs puissent choisir avant de donner.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erreurs courantes à éviter

- Conserver les dons dans le wallet personnel d'un membre du personnel
- Publier une adresse transparente, ou une adresse de dépôt d'une plateforme d'échange, comme adresse de dons
- Indiquer une valeur en dollars dans l'accusé de réception
- Vendre dans les trois ans et oublier le Form 8282
- Promettre une déduction fiscale aux donateurs anonymes

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Résultat

Vous pouvez :
- Accepter ZEC sans exposer vos donateurs ni votre solde
- Fournir aux donateurs les documents nécessaires pour demander une déduction
- Tenir des registres que votre comptable et votre auditeur peuvent vérifier

<br/>

## Sources

- [IRS : Questions fréquemment posées sur les transactions en monnaie virtuelle](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (les Q34–Q37 concernent les organismes caritatifs)
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771 : Contributions caritatives, justification et divulgation](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526 : Contributions caritatives](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561 : Détermination de la valeur des biens donnés](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012 : évaluations pour les dons en crypto](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) et [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Articles connexes

- [Recevoir des dons en privé](/zcash-use-cases/receive-donations-privately) - la même idée pour les particuliers
- [Tenir des registres avec des ZEC blindés](/zcash-use-cases/keeping-records-with-shielded-zec) - mémos et clés de visualisation pour votre comptabilité
- [Clés de visualisation](/zcash-tech/viewing-keys) - accès en lecture seule pour un comptable ou un auditeur
- [Le tourniquet](/zcash-tech/the-turnstile) - ce qui devient public lorsque ZEC quitte un pool blindé

<br/>

## Prochaine étape

- [Gérer une trésorerie communautaire privée](/zcash-use-cases/private-community-treasury)

<br/>
