# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Payer des services d’IA en privé avec des ZEC protégés

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Débutant - 10 min
</span>


## TL;DR

- **NanoGPT** accepte directement les ZEC protégés, sans compte ni e-mail
- Le rechargement minimum est de **0,10 $**, donc vous pouvez tester pour presque rien
- Le crédit arrive en environ **30 secondes**, dès la première confirmation
- Pour les services qui n’acceptent pas ZEC, utilisez **CrossPay** pour dépenser des ZEC protégés et les faire payer en USDC
- Ce qui finit sur la blockchain dépend de **la pool dans laquelle se trouvent vos ZEC**, et l’écran ne vous l’indique jamais

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> À qui s’adresse cette page ?

- Toute personne qui ne veut pas d’un abonnement IA lié à son nom
- Les développeurs qui paient l’inférence sans carte bancaire d’entreprise
- Les personnes dans des pays où les paiements par carte vers des services d’IA échouent
- Toute personne qui préfère ne pas donner son e-mail juste pour essayer un modèle

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Le problème

Payer l’IA signifie normalement utiliser une carte, un e-mail et un compte. Cela relie chaque prompt que vous écrivez à votre identité légale, et le processeur de paiement le voit aussi.

Les cryptos sont censées résoudre cela, mais la plupart des guides sont dépassés. Les services changent ce qu’ils acceptent, et un tutoriel écrit il y a un an vous enverra sur une voie qui ne fonctionne plus.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Pourquoi Zcash ?

Un paiement protégé masque l’expéditeur, le destinataire et le montant. Le service est payé, et personne qui observe la blockchain n’apprend qui a payé ni combien.

Cela ne vaut que si vous payez **à partir de** fonds protégés. Cette page précise quand c’est vrai et quand ça ne l’est pas.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Ce dont vous avez besoin

- De ZEC dans un solde **protégé**
- D’un wallet capable d’envoyer vers une adresse unifiée. Ce tutoriel utilise **Noir Wallet**, une extension de navigateur, afin que tout le flux reste dans une seule fenêtre. Zkool et Zodl fonctionnent de la même manière
- D’environ 1 $ pour suivre

> **Vous venez d’un exchange ?** La plupart des exchanges, y compris Binance, ne retirent les ZEC que vers des adresses **transparentes**, et ils n’acceptent pas une adresse `u1...` comme destination. Retirez d’abord vers votre propre adresse transparente, protégez-les dans votre wallet, puis payez depuis le solde protégé.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Itinéraire 1 : Payer NanoGPT directement

[NanoGPT](https://nano-gpt.com/) vous donne accès à plus de 200 modèles, dont GPT, Claude, Gemini et des modèles d’image, et il accepte ZEC nativement.

### Étape 1 : Ouvrez-le. Il n’y a pas d’inscription

Allez sur nano-gpt.com et commencez à l’utiliser. Chaque session est anonyme par défaut et l’application l’indique elle-même : *« Vous utilisez déjà NanoGPT en privé. »* Il n’y a pas de compte à créer ni d’e-mail à fournir.

### Étape 2 : Enregistrez d’abord un jeton de connexion

Avant d’y mettre de l’argent, ouvrez **Settings** et créez un jeton de connexion, puis stockez-le dans un endroit sûr.

> **Cette étape protège votre argent.** Un solde anonyme vit dans les données locales de votre navigateur. Si vous effacez vos cookies sans avoir sauvegardé un jeton, le solde disparaît, sans compte permettant de le récupérer. Faites-le avant de déposer, pas après.

### Étape 3 : Ajouter du solde

Ouvrez **Balance**, choisissez **Custom**, puis saisissez un montant. Le minimum est de **0,10 $** et le maximum de 5 000 $. NanoGPT vous indique ce que cela permet d’acheter, environ 12 prompts GPT 5.5 ou 18 images pour 1 $.

![Écran d’ajout de solde NanoGPT montrant le montant personnalisé et le minimum de dix centimes](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### Étape 4 : Choisir Zcash

Choisissez **Digital currencies**, puis **Zcash** dans la grille.

Vous obtiendrez un QR code, une adresse de paiement et un **minimum de transfert** en ZEC pour le montant choisi. Ce chiffre est calculé au moment où la page se charge.

![Écran de dépôt Zcash de NanoGPT avec le QR code, l’adresse unifiée et le minimum de transfert](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### Étape 5 : Envoyer depuis votre wallet

Copiez l’adresse dans votre wallet, saisissez le montant et envoyez. Les frais réseau sont d’environ **0,00015 ZEC**.

> **Envoyez légèrement plus que le minimum.** Le taux est calculé au chargement de la page et le cours du ZEC bouge avant la confirmation de votre transaction. Envoyer exactement le minimum a crédité **0,99 $** au lieu de 1,00 $ lors des tests. Envoyer un peu plus a crédité 1,17 $ pour le même 1 $ nominal, parce que NanoGPT crédite ce que vous envoyez réellement.

![Écran d’envoi de Noir Wallet avec l’adresse NanoGPT collée et les frais réseau affichés](/content-images/noir-send-6380a5f4ef.webp)

### Étape 6 : Attendre environ 30 secondes

Votre wallet affichera la transaction en attente, puis en confirmation. NanoGPT crédite le solde à la **première confirmation**, donc vous n’avez pas besoin d’attendre les trois.

![Confirmation du wallet montrant le montant envoyé et le hash de transaction](/content-images/noir-sent-2d476e94b9.webp)

Le solde apparaît et vous pouvez le dépenser immédiatement.

![Page de solde NanoGPT montrant le montant crédité et l’historique des dépôts](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> Itinéraire 2 : Les services qui n’acceptent pas ZEC

La plupart des services d’IA n’acceptent pas ZEC. **Venice.ai** et **OpenRouter** acceptent tous deux l’USDC à la place, et OpenRouter vous laisse choisir sur quelle chaîne le paiement est réglé.

Pour ceux-là, utilisez **CrossPay** dans [Zodl](/zcash-organizations/zodl). Vous dépensez des ZEC protégés et le destinataire est payé dans l’actif qu’il a demandé, via NEAR Intents, sans exchange centralisé et sans KYC.

1. Obtenez l’adresse de paiement du service ainsi que l’actif et la chaîne qu’il attend, par exemple de l’USDC sur Base
2. Ouvrez Zodl et choisissez **CrossPay**
3. Saisissez cette adresse, choisissez l’actif voulu par le service et entrez le montant
4. Envoyez depuis votre solde protégé

Vos ZEC quittent l’espace protégé. Le service voit arriver un paiement USDC ordinaire et n’apprend jamais qu’il a commencé en ZEC.

> La partie swap est visible sur la chaîne de destination, donc le paiement USDC lui-même est aussi public que n’importe quel autre paiement USDC. Ce qui reste privé, c’est le côté Zcash et le lien entre les deux.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Ce qui est révélé à chaque étape

C’est la partie que la plupart des guides omettent.

| Ce qui se passe | Ce que le service apprend | Ce qui apparaît sur la blockchain |
|---|---|---|
| Navigation et prompts | Rien. Pas de compte, pas d’e-mail | Rien |
| Une adresse de dépôt est émise | Rien | Rien |
| Vous payez **depuis Sapling** | L’adresse de dépôt que vous avez utilisée | Rien. Protégé vers protégé |
| Vous payez **depuis Ironwood** | Idem | **Le montant et la hauteur de bloc** |
| Vous payez **depuis une adresse transparente** | Idem | Le montant et votre t-address |
| Tout ce qui précède | Votre IP, sauf si vous utilisez Tor ou un VPN | Sans objet |

### Pourquoi la pool est importante

L’adresse de dépôt NanoGPT est une adresse unifiée. Son décodage, pour une adresse émise en août 2026, montre exactement deux récepteurs : **Sapling** et **Orchard**.

Depuis l’activation de la mise à niveau [Ironwood](/zcash-tech/ironwood) le 28 juillet 2026, Orchard est uniquement dépensable et aucune nouvelle valeur ne peut plus y entrer. Cela laisse **Sapling comme seul récepteur dans lequel un paiement peut réellement arriver**.

Donc, si vos ZEC sont déjà dans Sapling, le paiement va de Sapling à Sapling et rien à son sujet n’est public. Mais si vous avez migré vers Ironwood, payer déplace de la valeur à travers une frontière de pool, et [le turnstile](/zcash-tech/the-turnstile) publie le montant et la hauteur même si l’expéditeur et le destinataire restent cachés.

Les écrans paraissent identiques dans les deux cas. Garder un petit solde Sapling pour les paiements est la solution la plus simple.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erreurs courantes à éviter

- Déposer avant d’avoir sauvegardé un jeton de connexion, puis effacer ses cookies
- Envoyer exactement le minimum de transfert et se retrouver avec un centime de moins
- Essayer de retirer directement depuis un exchange vers une adresse `u1...`
- Supposer que le paiement est privé sans vérifier depuis quelle pool vous avez dépensé
- Payer via une connexion normale alors que le but était précisément de ne pas être identifié

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Résultat

Vous pouvez :

- Utiliser des modèles d’IA de pointe sans compte, sans e-mail et sans carte
- Payer en ZEC protégés et savoir exactement ce que cela masque ou non
- Accéder à des services qui n’ont jamais entendu parler de Zcash, via CrossPay

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Liens utiles

- [Ironwood](/zcash-tech/ironwood) - pourquoi la pool dans laquelle se trouvent vos fonds a changé
- [The Turnstile](/zcash-tech/the-turnstile) - ce qui devient public quand la valeur traverse des pools
- [Wallets](/using-zcash/wallets) - quels wallets sont maintenus
- [ZODL](/zcash-organizations/zodl) - le wallet derrière CrossPay

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> Progression

**Étape 1 sur 1**

Vous avez payé un service d’IA avec des ZEC protégés et vous savez ce que cela a révélé.

<br/>

## Étape suivante

- [Envoyer de l’argent sans lier son identité](/zcash-use-cases/send-money-without-linking-identity)

<br/>
