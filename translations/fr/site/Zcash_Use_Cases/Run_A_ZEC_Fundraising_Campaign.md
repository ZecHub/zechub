# <img src="/content-images/people-community-add-svgrepo-com-3c6ac75333.svg" width="24" height="24" alt="community icon"/> Organiser une campagne de collecte de fonds en ZEC

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermédiaire - 10 min
</span>

## En bref

- Attribuez à la campagne son propre compte de wallet et une adresse blindée, afin qu'elle ne se mélange jamais avec d'autres fonds
- Partagez un lien de demande de paiement ou un QR code avec un montant suggéré et un mémo déjà rempli
- Montrez la progression sans exposer les donateurs : publiez vous-même le total, ou confiez une clé de visualisation à un seul vérificateur de confiance
- Une clé de visualisation couvre l'ensemble du compte, et pas seulement une adresse, c'est pourquoi la campagne a son propre compte
- Clôturez la campagne à la date promise et publiez l'utilisation qui a été faite de l'argent

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> À qui s'adresse ce guide ?

- Aux associations, projets open source et créateurs qui collectent des fonds pour un objectif précis
- Aux organisations à but non lucratif qui mènent un appel aux dons de fin d'année ou d'urgence en ZEC
- À toute personne qui souhaite que les donateurs fassent confiance à la campagne sans rendre chaque don public

Si vous êtes une organisation à but non lucratif américaine, lisez d'abord [Accepter des dons privés en tant qu'organisation à but non lucratif américaine](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit) pour les reçus et les formulaires IRS.

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Le problème

La plupart des collectes de fonds en crypto utilisent une adresse transparente pour que les donateurs puissent voir le total augmenter. Mais cela révèle aussi chaque don, son montant, sa date d'arrivée et la destination de l'argent ensuite. Les donateurs qui donnent volontairement de manière privée perdent cette confidentialité, et n'importe qui peut suivre les fonds après la campagne.

Une campagne entièrement privée pose le problème inverse : les donateurs ne peuvent pas savoir si l'objectif a été atteint ni comment l'argent a été dépensé.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Pourquoi Zcash ?

Avec des ZEC blindés, chaque don reste privé on-chain, et c'est vous qui décidez de ce que vous montrez : un total, une barre de progression ou un accès en lecture seule pour un vérificateur. Les donateurs peuvent ajouter un message dans le [mémo](/using-zcash/memos), et vous pouvez les remercier sans que personne d'autre ne sache qui a donné.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Ce dont vous avez besoin

- Un [wallet](/wallets) blindé dans lequel vous pouvez créer un compte séparé
- Une page de campagne : un site web, une publication sur les réseaux sociaux ou un fil de forum
- Un objectif, une date de fin et un plan d'utilisation de l'argent

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Guide étape par étape

### Étape 1 : Définir l'objectif et les règles

Avant le lancement, notez par écrit :
- Le montant que vous collectez et ce qu'il financera
- La date de fin
- Ce qui se passera si vous collectez plus ou moins que l'objectif
- Qui contrôle les fonds, et si plusieurs personnes doivent approuver les dépenses (voir [Gérer une trésorerie communautaire privée](/zcash-use-cases/private-community-treasury))

Publiez ces informations sur la page de la campagne. Les donateurs font confiance à une campagne qui annonce dès le départ ce qu'elle va faire.

### Étape 2 : Créer un compte séparé pour la campagne

Créez dans votre wallet un nouveau compte, utilisé uniquement pour cette campagne, et copiez-y une adresse blindée. Séparer la campagne rend le total facile à lire, et c'est important plus tard si vous partagez une clé de visualisation, car une clé de visualisation montre l'activité de l'ensemble du compte ([Clés de visualisation](/zcash-tech/viewing-keys)).

### Étape 3 : Créer un lien de demande de paiement et un QR code

Une [URI de demande de paiement](/using-zcash/payment-request-uris) est un lien `zcash:` qui remplit pour le donateur l'adresse, un montant suggéré et un mémo. Utilisez le [générateur de demandes de paiement](/tools) de ZecHub pour en créer une, puis partagez-la sous forme de lien et de QR code.

Un mémo du type « Nom de la campagne, répondre à : votre e-mail ou pseudo » aide les donateurs qui souhaitent un remerciement ou un reçu. Indiquez sur la page que le mémo est facultatif.

### Étape 4 : Lancer la page de la campagne

Indiquez sur la page :
- L'objectif, la date de fin et les règles de l'étape 1
- L'adresse blindée, le QR code et le lien
- Comment donner depuis un wallet blindé, et où s'en procurer un
- Comment vous rendrez compte de la progression (étape 5)

Affichez l'adresse à un seul endroit et demandez aux donateurs de la copier uniquement depuis cet endroit.

### Étape 5 : Rendre compte de la progression sans exposer les donateurs

Choisissez une option et indiquez-la sur la page :
- **Publiez vous-même le total**, par exemple une fois par semaine, à partir du solde du compte de la campagne dans votre wallet
- **Confiez une clé de visualisation à un seul vérificateur de confiance**, comme un membre du conseil d'administration ou un membre de la communauté connu des donateurs, qui confirme publiquement le total. Une clé de visualisation entrante montre les dons reçus ; une clé de visualisation complète montre aussi les dépenses ([Clés de visualisation](/zcash-tech/viewing-keys))

Ne publiez pas de clé de visualisation sur la page de la campagne. Quiconque la possède peut voir le montant et le mémo de chaque don, y compris les coordonnées des donateurs.

### Étape 6 : Remercier les donateurs

Répondez aux donateurs qui ont laissé un contact dans le mémo. Ne publiez jamais le nom ou le montant d'un donateur sans lui avoir demandé son accord au préalable.

### Étape 7 : Clôturer et rendre compte

À la date de fin :
- Annoncez que la campagne est clôturée, et retirez ou mettez à jour l'adresse et le QR code
- Publiez le total final et ce que l'argent a financé
- Si vous avez partagé une clé de visualisation, demandez au vérificateur de confirmer le total final et les dépenses

Les [divulgations de paiement](/zcash-tech/payment-disclosures) pourraient un jour vous permettre de prouver un paiement isolé sans clé de visualisation, mais la norme n'est encore qu'un brouillon, alors ne comptez pas encore dessus.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erreurs courantes à éviter

- Mener la campagne depuis le compte de votre wallet du quotidien
- Publier une clé de visualisation, ce qui expose le montant et le mémo de chaque donateur
- Utiliser une adresse transparente ou une adresse de dépôt d'exchange parce qu'il est plus facile d'afficher le total
- Laisser l'adresse en ligne après la fin de la campagne, si bien que des dons continuent d'arriver sans aucun plan pour eux
- Ne jamais rendre compte de l'utilisation de l'argent

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Résultat

Vous pouvez :
- Collecter des ZEC pour un objectif clair tout en gardant chaque don privé on-chain
- Montrer une progression à laquelle les donateurs peuvent se fier
- Clôturer la campagne avec un rapport public, sans exposer aucun donateur

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Voir aussi

- [Recevoir des dons en toute confidentialité](/zcash-use-cases/receive-donations-privately) - dons réguliers, sans campagne
- [Gérer une trésorerie communautaire privée](/zcash-use-cases/private-community-treasury) - rôles et approbations pour des fonds partagés
- [URI de demande de paiement](/using-zcash/payment-request-uris) - liens et QR codes avec le montant et le mémo pré-remplis
- [Clés de visualisation](/zcash-tech/viewing-keys) - accès en lecture seule pour un vérificateur
- [Où donner des ZEC](/zcash-use-cases/where-to-donate-zec) - organisations à but non lucratif qui acceptent déjà les ZEC

<br/>

## Étape suivante

- [Accepter des dons privés en tant qu'organisation à but non lucratif américaine](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)

<br/>

Si vous débutez, commencez ici : [Qu'est-ce que Zcash ?](/start-here/what-is-zec-and-zcash)
