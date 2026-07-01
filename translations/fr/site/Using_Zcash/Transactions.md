<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>


# Transactions

ZEC est un actif numérique largement utilisé pour les paiements, offrant de solides fonctionnalités de confidentialité qui le rendent adapté à diverses transactions comme payer des amis, effectuer des achats ou faire des dons. Pour maximiser la confidentialité et la sécurité, il est essentiel de comprendre comment les différents types de transactions fonctionnent dans Zcash.

## Transactions blindées

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash expliqué : les transactions blindées Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Les transactions blindées ont lieu lorsque vous déplacez des ZEC vers votre portefeuille blindé. L’adresse de votre portefeuille blindé commence par un U ou un Z. Lorsque vous envoyez des transactions blindées, vous vous assurez que vous, ainsi que les personnes avec lesquelles vous effectuez des transactions, conservez un niveau de confidentialité impossible sur d’autres réseaux de paiement P2P. Envoyer une transaction blindée est très simple, il faut simplement s’assurer de deux choses. La première est que vous utilisez le bon type de portefeuille. Le moyen le plus simple de vous assurer que vous utilisez le bon type de portefeuille est de télécharger un [portefeuille](https://zechub.wiki/wallets). La deuxième chose importante est de déplacer des ZEC vers un portefeuille blindé. Lorsque vous retirez des ZEC depuis une plateforme d’échange, vous devez savoir si celle-ci prend en charge les retraits blindés ou transparents. Si elle prend en charge les retraits blindés, vous pouvez simplement retirer vos ZEC vers votre adresse blindée. Si la plateforme d’échange ne prend en charge que les retraits transparents, vous devez alors utiliser YWallet et blinder automatiquement vos ZEC une fois reçus. Utiliser uniquement des transactions blindées pour envoyer et recevoir des fonds est la meilleure façon de préserver la confidentialité et de réduire le risque de fuite de données.

## Transactions transparentes

Les transactions transparentes fonctionnent de manière similaire, mais sans protections de confidentialité, ce qui rend les détails des transactions publiquement visibles sur la blockchain. Les transactions transparentes doivent être évitées lorsque la confidentialité est une priorité. Remarque : les portefeuilles transparents peuvent rencontrer des problèmes à cause de ZIP-317, qui exige des frais proportionnels à la complexité de la transaction. Les frais par défaut peuvent entraîner un rejet ou des retards, ce qui rend la personnalisation des frais essentielle.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Découvrez les portefeuilles blindés 🛡️Zcash !"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Gestion des frais pour les transactions transparentes

Conseils ZIP-317 : la structure des frais s’adapte à la complexité de la transaction, ce qui nécessite des ajustements au-delà des frais standards de 0.00001 ZEC.
Exemple de calcul : une simple transaction à une note peut nécessiter des frais de 0.0001 ZEC, augmentant d’environ 0.00005 ZEC par note supplémentaire.

Modification des frais dans les portefeuilles

Trust Wallet : accédez aux paramètres avancés en appuyant sur l’icône d’engrenage lors de la création d’une transaction. Ajustez soigneusement les champs Miner Tip Gwei et Max Fee Gwei pour éviter l’échec de la transaction. Trust Wallet ne facture que les frais du réseau.
Coinomi Wallet : propose trois options de frais dynamiques — Low, Normal, High — en fonction des conditions du réseau. Pour les ajustements manuels, sélectionnez Custom sur les cryptomonnaies prises en charge ou utilisez Change Fee dans le coin supérieur droit. Les utilisateurs peuvent définir les frais par octet ou par kilo-octet, ce qui affecte les délais de confirmation. Il est recommandé d’utiliser les options dynamiques en cas d’incertitude.

Cette version intègre des conseils de gestion des frais, des options de frais dynamiques et des paramètres de personnalisation dans Trust Wallet et Coinomi, offrant aux utilisateurs des informations complètes sur le contrôle des frais.

#### Ressources

[ZIPS](https://zips.z.cash/)

#### Remarque

Veuillez noter que la manière la plus sûre d’utiliser ZEC consiste à utiliser uniquement des transactions blindées. Certains portefeuilles sont en train d’implémenter les [adresses unifiées](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) qui permettent aux utilisateurs et aux plateformes d’échange de combiner des adresses transparentes et blindées. 

## Convertisseur ZEC vers ZAT
