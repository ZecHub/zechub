# <img src="/content-images/people-community-add-svgrepo-com-3c6ac75333.svg" width="24" height="24" alt="community icon"/> Mener une campagne de collecte de fonds en ZEC

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermédiaire - 10 min
</span>

## En bref

- Attribuez à la campagne son propre compte de portefeuille et une adresse protégée, afin qu'elle ne se mélange jamais avec d'autres fonds
- Partagez un lien ou un QR code de demande de paiement avec un montant suggéré et un mémo déjà rempli
- Montrez la progression sans exposer les donateurs : publiez vous-même le total, ou confiez une clé pour lecture seule à un vérificateur de confiance
- Une clé pour lecture seule couvre l'ensemble du compte, et pas seulement une adresse : c'est pourquoi la campagne dispose de son propre compte
- Clôturez la campagne à la date promise et publiez l'utilisation qui a été faite de l'argent

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> À qui s'adresse ce guide ?

- Aux groupes communautaires, projets open source et créateurs qui collectent des fonds pour un objectif précis
- Aux associations à but non lucratif qui mènent un appel de fin d'année ou d'urgence en ZEC
- À toute personne souhaitant que les donateurs fassent confiance à la campagne sans rendre chaque don public

Si vous êtes une association à but non lucratif américaine, lisez d'abord [Accepter des dons privés en tant qu'association à but non lucratif américaine](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit) pour les reçus et les formulaires IRS.

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Le problème

La plupart des collectes de fonds en cryptomonnaie utilisent une adresse transparente pour que les donateurs puissent voir le total augmenter. Mais cela révèle aussi chaque don, son montant, sa date d'arrivée et la destination de l'argent par la suite. Les donateurs qui donnent volontairement de manière privée perdent cette confidentialité, et n'importe qui peut suivre les fonds après la campagne.

Une campagne entièrement privée pose le problème inverse : les donateurs ne peuvent pas savoir si l'objectif a été atteint ni comment l'argent a été dépensé.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Pourquoi Zcash ?

Avec des ZEC protégés, chaque don reste privé on-chain, et c'est vous qui décidez de ce que vous montrez : un total, une barre de progression ou un accès en lecture seule pour un vérificateur. Les donateurs peuvent ajouter un message dans le [mémo](/using-zcash/memos), et vous pouvez les remercier sans que personne d'autre ne sache qui a donné.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Ce dont vous avez besoin

- Un [portefeuille](/wallets) protégé dans lequel vous pouvez créer un compte séparé
- Une page de campagne : un site web, une publication sur les réseaux sociaux ou un fil de discussion sur un forum
- Un objectif, une date de fin et un plan d'utilisation de l'argent

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Guide étape par étape

### Étape 1 : Fixez l'objectif et les règles

Avant le lancement, notez par écrit :
- Le montant que vous collectez et ce qu'il financera
- La date de fin
- Ce qui se passera si vous collectez plus ou moins que l'objectif
- Qui contrôle les fonds, et si plusieurs personnes doivent approuver les dépenses (voir [Gérer une trésorerie communautaire privée](/zcash-use-cases/private-community-treasury))

Publiez ces informations sur la page de la campagne. Les donateurs font confiance à une campagne qui annonce clairement dès le départ ce qu'elle fera.

### Étape 2 : Créez un compte séparé pour la campagne

Créez un nouveau compte dans votre portefeuille, utilisé uniquement pour cette campagne, et copiez-en une adresse protégée. Séparer la campagne permet de lire facilement le total, et cela compte par la suite si vous partagez une clé pour lecture seule, car une clé pour lecture seule montre l'activité de l'ensemble du compte ([Viewing Keys](/zcash-tech/viewing-keys)).

### Étape 3 : Créez un lien et un QR code de demande de paiement

Une [URI de demande de paiement](/using-zcash/payment-request-uris) est un lien `zcash:` qui remplit automatiquement l'adresse, un montant suggéré et un mémo pour le donateur. Utilisez le [générateur de demandes de paiement](/tools) de ZecHub pour en créer une, puis partagez-la sous forme de lien et de QR code.

Un mémo comme « Nom de la campagne, répondre à : votre e-mail ou votre pseudo » aide les donateurs qui souhaitent un remerciement ou un reçu. Indiquez sur la page que le mémo est facultatif.

### Étape 4 : Lancez la page de la campagne

Indiquez sur la page :
- L'objectif, la date de fin et les règles de l'étape 1
- L'adresse protégée, le QR code et le lien
- Comment donner depuis un portefeuille protégé, et où s'en procurer un
- Comment vous rendrez compte de la progression (étape 5)

Affichez l'adresse à un seul endroit et demandez aux donateurs de la copier uniquement depuis cet endroit.

### Étape 5 : Rendez compte de la progression sans exposer les donateurs

Choisissez l'une des options suivantes et indiquez-la sur la page :
- **Publiez vous-même le total**, par exemple une fois par semaine, à partir du solde du compte de la campagne dans votre portefeuille
- **Confiez une clé pour lecture seule à un vérificateur de confiance**, comme un membre du conseil d'administration ou un membre de la communauté connu des donateurs, qui confirme publiquement le total. Une clé pour lecture seule des entrées montre les dons reçus ; une clé pour lecture seule complète montre aussi les dépenses ([Viewing Keys](/zcash-tech/viewing-keys))

Ne publiez pas de clé pour lecture seule sur la page de la campagne. Toute personne qui la détient peut voir le montant et le mémo de chaque don, y compris les coordonnées des donateurs.

### Étape 6 : Remerciez les donateurs

Répondez aux donateurs qui ont laissé un contact dans le mémo. Ne publiez jamais le nom ou le montant d'un donateur sans lui avoir d'abord demandé son accord.

### Étape 7 : Clôturez et rendez compte

À la date de fin :
- Annoncez que la campagne est close, et retirez ou mettez à jour l'adresse et le QR code
- Publiez le total final et ce que l'argent a financé
- Si vous avez partagé une clé pour lecture seule, demandez au vérificateur de confirmer le total final et les dépenses

Les [divulgations de paiement](/zcash-tech/payment-disclosures) vous permettront peut-être un jour de prouver un paiement unique sans clé pour lecture seule, mais la norme n'est encore qu'un projet : ne comptez donc pas encore dessus.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erreurs courantes à éviter

- Mener la campagne depuis le compte de votre portefeuille du quotidien
- Publier une clé pour lecture seule, ce qui expose le montant et le mémo de chaque donateur
- Utiliser une adresse transparente ou une adresse de dépôt d'un exchange parce qu'il est plus facile d'afficher le total
- Laisser l'adresse en ligne après la fin de la campagne, de sorte que des dons continuent d'arriver sans plan pour les utiliser
- Ne jamais rendre compte de la manière dont l'argent a été dépensé

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Résultat

Vous pouvez :
- Collecter des ZEC pour un objectif clair tout en gardant chaque don privé on-chain
- Montrer une progression à laquelle les donateurs peuvent se fier
- Clôturer la campagne avec un rapport public, sans exposer aucun donateur

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Voir aussi

- [Recevoir des dons de manière privée](/zcash-use-cases/receive-donations-privately) - dons réguliers, sans campagne
- [Gérer une trésorerie communautaire privée](/zcash-use-cases/private-community-treasury) - rôles et approbations pour des fonds partagés
- [URI de demande de paiement](/using-zcash/payment-request-uris) - liens et QR codes avec le montant et le mémo déjà remplis
- [Viewing Keys](/zcash-tech/viewing-keys) - accès en lecture seule pour un vérificateur
- [Où faire un don en ZEC](/zcash-use-cases/where-to-donate-zec) - associations à but non lucratif qui acceptent déjà les ZEC

<br/>

## Étape suivante

- [Accepter des dons privés en tant qu'association à but non lucratif américaine](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)

<br/>

Si vous débutez, commencez ici : [Qu'est-ce que Zcash ?](/start-here/what-is-zec-and-zcash)
