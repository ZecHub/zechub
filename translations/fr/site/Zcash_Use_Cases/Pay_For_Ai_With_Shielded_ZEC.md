# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="icône développeur"/> Payer des services d'IA en toute confidentialité avec des ZEC protégés

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Débutant - 10 min
</span>


## En bref

- **NanoGPT** accepte directement les ZEC protégés, sans compte et sans e-mail
- La recharge minimale est de **0,10 $**, vous pouvez donc l'essayer pour quelques centimes
- Le crédit arrive en **30 secondes** environ, dès la première confirmation
- Pour les services qui n'acceptent pas les ZEC, utilisez **CrossPay** pour dépenser des ZEC protégés et les faire payer en USDC
- Ce qui apparaît sur la chaîne dépend du **pool dans lequel se trouvent vos ZEC**, et l'écran ne vous l'indique jamais

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="icône utilisateur"/> À qui s'adresse ce guide ?

- À toute personne qui ne veut pas d'un abonnement à une IA lié à son nom
- Aux développeurs qui paient l'inférence sans carte d'entreprise
- Aux personnes vivant dans des pays où les paiements par carte vers les services d'IA échouent
- À toute personne qui préfère ne pas fournir d'e-mail pour essayer un modèle

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="icône d'avertissement"/> Le problème

Payer une IA implique normalement une carte, un e-mail et un compte. Chaque requête que vous écrivez est ainsi liée à votre identité légale, et le prestataire de paiement la voit aussi.

Les cryptomonnaies sont censées résoudre ce problème, mais la plupart des guides sont obsolètes. Les services changent ce qu'ils acceptent, et un tutoriel rédigé il y a un an vous enverra sur une voie qui ne fonctionne plus.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="icône de cadenas"/> Pourquoi Zcash ?

Un paiement protégé masque l'expéditeur, le destinataire et le montant. Le service est payé, et personne qui observe la chaîne n'apprend qui a payé ni combien.

Cela n'est vrai que si vous payez **à partir de** fonds protégés. Cette page précise quand c'est le cas et quand ça ne l'est pas.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="icône de boîte à outils"/> Ce dont vous avez besoin

- Des ZEC sur un solde **protégé**
- Un portefeuille capable d'envoyer vers une adresse unifiée. Ce tutoriel utilise le **portefeuille Noir**, une extension de navigateur, pour que toute l'opération se déroule dans une seule fenêtre. Zkool et Zodl fonctionnent de la même manière
- Environ 1 $ pour suivre le tutoriel

> **Vous venez d'un exchange ?** La plupart des exchanges, y compris Binance, ne permettent de retirer des ZEC que vers des adresses **transparentes**, et ils n'acceptent pas une adresse `u1...` comme destination. Retirez d'abord vers votre propre adresse transparente, protégez les fonds dans votre portefeuille, puis payez depuis le solde protégé.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="icône d'étape"/> Voie 1 : payer NanoGPT directement

[NanoGPT](https://nano-gpt.com/) vous donne accès à plus de 200 modèles, dont GPT, Claude, Gemini et des modèles d'image, et accepte nativement les ZEC.

### Étape 1 : ouvrez le site. Aucune inscription n'est nécessaire

Rendez-vous sur nano-gpt.com et commencez à l'utiliser. Chaque session est anonyme par défaut, et l'application l'indique elle-même : *« You are already using NanoGPT privately. »* Il n'y a aucun compte à créer ni aucun e-mail à fournir.

### Étape 2 : enregistrez d'abord un jeton de connexion

Avant de déposer de l'argent, ouvrez **Settings** et créez un jeton de connexion, puis conservez-le en lieu sûr.

> **Cette étape protège votre argent.** Un solde anonyme est stocké dans les données locales de votre navigateur. Si vous effacez vos cookies sans avoir enregistré de jeton, le solde est perdu, sans aucun compte pour le récupérer. Faites-le avant votre dépôt, pas après.

### Étape 3 : ajoutez du solde

Ouvrez **Balance**, choisissez **Custom** et saisissez un montant. Le minimum est de **0,10 $** et le maximum de 5 000 $. NanoGPT vous indique ce que cela permet d'obtenir, environ 12 requêtes GPT 5.5 ou 18 images pour 1 $.

![Écran d'ajout de solde NanoGPT montrant le montant personnalisé et le minimum de dix cents](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### Étape 4 : choisissez Zcash

Sélectionnez **Digital currencies**, puis **Zcash** dans la grille.

Vous obtiendrez un QR code, une adresse de paiement et un **montant de transfert minimum** en ZEC pour la somme choisie. Ce montant est calculé au moment du chargement de la page.

![Écran de dépôt Zcash de NanoGPT avec le code QR, l'adresse unifiée et le montant minimum de transfert](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### Étape 5 : envoyez depuis votre portefeuille

Copiez l'adresse dans votre portefeuille, saisissez le montant et envoyez. Les frais de réseau sont d'environ **0,00015 ZEC**.

> **Envoyez un peu plus que le minimum.** Le devis est calculé au chargement de la page et le cours du ZEC évolue avant que votre transaction soit confirmée. Lors des tests, l'envoi du minimum exact a crédité **0,99 $** au lieu de 1,00 $. L'envoi d'un léger surplus a crédité 1,17 $ pour le même montant nominal de 1 $, car NanoGPT crédite ce que vous envoyez réellement.

![Écran d'envoi de Noir Wallet avec l'adresse NanoGPT collée et les frais de réseau affichés](/content-images/noir-send-6380a5f4ef.webp)

### Étape 6 : patientez environ 30 secondes

Votre portefeuille affichera la transaction comme en attente, puis en cours de confirmation. NanoGPT crédite le solde dès la **première confirmation**, vous n'avez donc pas besoin d'attendre les trois.

![Confirmation du portefeuille montrant le montant envoyé et le hash de la transaction](/content-images/noir-sent-2d476e94b9.webp)

Le solde apparaît et vous pouvez le dépenser immédiatement.

![Page de solde NanoGPT montrant le montant crédité et l'historique des dépôts](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="icône d'envoi"/> Voie 2 : les services qui n'acceptent pas les ZEC

La plupart des services d'IA n'acceptent pas les ZEC. **Venice.ai** et **OpenRouter** acceptent tous deux les USDC à la place, et OpenRouter vous permet de choisir la chaîne sur laquelle le paiement est réglé.

Pour ces services, utilisez **CrossPay** dans [Zodl](/zcash-organizations/zodl). Vous dépensez des ZEC protégés et le destinataire est payé dans l'actif qu'il a demandé, acheminé via NEAR Intents sans exchange centralisé et sans KYC.

1. Récupérez l'adresse de paiement du service ainsi que l'actif et la chaîne attendus, par exemple USDC sur Base
2. Ouvrez Zodl et choisissez **CrossPay**
3. Saisissez cette adresse, sélectionnez l'actif demandé par le service et saisissez le montant
4. Envoyez depuis votre solde protégé

Vos ZEC partent d'un solde protégé. Le service voit arriver un paiement USDC ordinaire et n'apprend jamais qu'il provenait de ZEC.

> La partie échange est visible sur la chaîne de destination, de sorte que le paiement en USDC est aussi public que n'importe quel autre paiement en USDC. Ce qui reste confidentiel, c'est le côté Zcash et le lien entre les deux.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="icône d'avertissement"/> Ce qui est révélé à chaque étape

C'est la partie que la plupart des guides passent sous silence.

| Ce qui se passe | Ce que le service apprend | Ce qui est inscrit sur la chaîne |
|---|---|---|
| Navigation et requêtes | Rien. Ni compte, ni e-mail | Rien |
| Une adresse de dépôt est générée | Rien | Rien |
| Vous payez **depuis Sapling** | L'adresse de dépôt que vous avez utilisée | Rien. De protégé à protégé |
| Vous payez **depuis Ironwood** | Idem | **Le montant et la hauteur de bloc** |
| Vous payez **depuis une adresse transparente** | Idem | Le montant et votre adresse t |
| Dans tous les cas ci-dessus | Votre IP, sauf si vous utilisez Tor ou un VPN | Sans objet |

### Pourquoi le pool est important

L'adresse de dépôt de NanoGPT est une adresse unifiée. Le décodage d'une adresse générée en août 2026 révèle exactement deux récepteurs : **Sapling** et **Orchard**.

Depuis l'activation de la mise à niveau [Ironwood](/zcash-tech/ironwood) le 28 juillet 2026, Orchard ne permet plus que les dépenses et aucune nouvelle valeur ne peut y entrer. **Sapling est donc le seul récepteur sur lequel un paiement peut réellement arriver.**

Ainsi, si vos ZEC se trouvent déjà dans Sapling, le paiement va de Sapling à Sapling et rien n'en est public. Mais si vous avez migré vers Ironwood, payer fait franchir à la valeur la frontière entre deux pools, et [le sas comptable](/zcash-tech/the-turnstile) publie le montant et la hauteur, même si l'expéditeur et le destinataire restent masqués.

Les écrans sont identiques dans les deux cas. Conserver un petit solde Sapling pour les paiements est la solution la plus simple.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="icône d'annulation"/> Erreurs courantes à éviter

- Déposer avant d'avoir enregistré un jeton de connexion, puis effacer les cookies
- Envoyer exactement le montant de transfert minimum et se retrouver avec un centime de moins
- Essayer de retirer directement d'un exchange vers une adresse `u1...`
- Supposer que le paiement est confidentiel sans vérifier depuis quel pool vous avez dépensé
- Payer via une connexion normale alors que le but était justement de ne pas être identifié

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="icône terminé"/> Résultat

Vous pouvez :

- Utiliser les modèles d'IA les plus avancés sans compte, sans e-mail ni carte
- Payer en ZEC protégés en sachant exactement ce que cela masque et ne masque pas
- Accéder, grâce à CrossPay, à des services qui n'ont jamais entendu parler de Zcash

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="icône de liens"/> Voir aussi

- [Ironwood](/zcash-tech/ironwood) - pourquoi le pool où se trouvent vos fonds a changé
- [Le sas comptable](/zcash-tech/the-turnstile) - ce qui devient public lorsque la valeur passe d'un pool à l'autre
- [Portefeuilles](/using-zcash/wallets) - quels portefeuilles sont maintenus
- [ZODL](/zcash-organizations/zodl) - le portefeuille derrière CrossPay

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="icône de progression"/> Progression

**Étape 1 sur 1**

Vous avez payé un service d'IA avec des ZEC protégés et vous savez ce que cela a révélé.

<br/>

## Étape suivante

- [Envoyer de l'argent sans lier votre identité](/zcash-use-cases/send-money-without-linking-identity)

<br/>
