<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Utiliser ZEC en toute confidentialité

#### Protégé (privé) ou transparent

À l'heure actuelle, il existe deux types d'adresses et de transactions dans Zcash : protégées et transparentes. La différence entre ZEC protégé et transparent est très simple. ZEC protégé préserve la confidentialité de votre argent et de vos transactions, tandis que ZEC transparent fonctionne comme Bitcoin, de manière entièrement transparente. Cela signifie que n'importe qui peut consulter votre solde et toutes vos transactions s'il connaît votre adresse.

Lorsque l'on commence à utiliser ZEC, on ne se rend pas toujours compte du type d'adresse que l'on utilise. En effet, tous les exchanges ne prennent pas en charge ZEC protégé et/ou les retraits de ZEC protégés.

Ainsi, par exemple, si une personne utilise Coinbase pour acheter des ZEC, elle achètera des ZEC transparents et ne pourra retirer ces ZEC que vers une adresse transparente dans un portefeuille. Des portefeuilles comme [Zodl](https://zodl.com/) peuvent protéger les fonds envoyés à une adresse transparente pour résoudre ce problème, mais tout le monde ne le sait pas. Pour faire simple, beaucoup de gens utilisent ZEC de la manière que leur permet leur exchange ou leur portefeuille principal.

#### S'assurer que vos ZEC sont protégés

Nous recommandons à chacun de conserver lui-même ses ZEC. Autrement dit, transférez vos ZEC d'un exchange vers un portefeuille. La meilleure façon de savoir si vous utilisez des ZEC protégés, c'est-à-dire privés, consiste à regarder l'adresse sur laquelle se trouve le solde. Si l'adresse commence par « z » ou « u1 », votre solde est protégé. Si l'adresse commence par « t », le solde est transparent.

Il existe généralement deux façons d'obtenir des ZEC protégés.

Depuis un exchange qui prend en charge les retraits **protégés** :

  1. Achetez des ZEC sur un exchange
  2. Lancez la procédure de retrait sur l'exchange
  3. Ouvrez votre portefeuille ZEC protégé et vérifiez que l'adresse de réception commence par « u1 » ou « z »
  4. Effectuez le retrait depuis votre exchange

Depuis un exchange qui prend en charge les retraits **transparents** :


  1. Achetez des ZEC sur un exchange
  2. Lancez la procédure de retrait sur l'exchange
  3. Ouvrez votre portefeuille ZEC à protection automatique et utilisez l'adresse de réception transparente
  4. Effectuez le retrait depuis votre exchange
  5. Attendez dix confirmations, puis protégez les ZEC en les transférant de votre adresse transparente vers votre adresse protégée


Voici un tutoriel expliquant comment retirer des ZEC d'un exchange. Notez qu'il s'agit d'un retrait protégé.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Acheter des ZEC et les retirer vers un portefeuille protégé depuis Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
Voici un tutoriel expliquant comment protéger vos ZEC en les transférant d'une adresse transparente vers une adresse protégée.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Protéger vos ZEC d'une adresse transparente vers une adresse protégée"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
Voici un tutoriel expliquant comment acheter des ZEC sur Coinbase et les envoyer vers Zodl.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi : acheter des Zcash et les protéger instantanément"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### Transactions

Après vous être assuré que vos ZEC se trouvent dans un portefeuille protégé prenant en charge les adresses protégées, vous pouvez décider si vous souhaitez effectuer des transactions avec ces ZEC. Effectuer des transactions avec ZEC est très simple. Vous pouvez envoyer des ZEC à des adresses protégées ou transparentes selon la préférence de votre interlocuteur. Comme pour toute transaction monétaire, il existe un faible risque de fuite de données. ZEC est le meilleur moyen de lutter contre les fuites de données, mais cela ne signifie pas que vous pouvez l'utiliser sans précaution. Voici quelques points à éviter lorsque vous effectuez des transactions avec ZEC.

- Divulguer votre adresse protégée
- Utiliser une adresse protégée comme simple point de passage entre des adresses t (c'est-à-dire « mixer »)
- Effectuer un grand nombre de transactions d'adresses protégées vers des adresses transparentes, et le faire savoir
- Indiquer régulièrement aux autres où vous dépensez vos ZEC protégés


En résumé, la meilleure chose à faire avec vos ZEC est de les conserver dans un portefeuille protégé, d'effectuer des transactions entre adresses protégées et de faire attention à la manière dont vous utilisez ZEC en public (p. ex. dans un café). Garantir la confidentialité implique une certaine part de responsabilité.

#### Ressources

[Transactions Zcash](https://zechub.wiki/using-zcash/transactions)
