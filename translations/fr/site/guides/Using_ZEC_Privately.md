<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Utiliser ZEC, en privé

#### Blindé (privé) vs. transparent

À l’heure actuelle, il existe deux types d’adresses et de transactions dans Zcash : blindées et transparentes. La différence entre le ZEC blindé et le ZEC transparent est très simple. Le ZEC blindé garde votre argent et vos transactions privés, tandis que le ZEC transparent fonctionne comme Bitcoin, de manière totalement transparente. Cela signifie que quelqu’un peut voir votre solde et toutes vos transactions s’il connaît votre adresse.

Lorsque les gens commencent à utiliser ZEC, ils peuvent ne pas se rendre compte du type d’adresse qu’ils utilisent. En effet, toutes les plateformes d’échange ne prennent pas en charge le ZEC blindé et/ou les retraits de ZEC blindé.

Ainsi, par exemple, si quelqu’un utilise Coinbase et achète du ZEC, il achètera du ZEC transparent et ne pourra retirer ce ZEC que vers une adresse transparente dans un portefeuille. Des portefeuilles comme [Zodl](https://zodl.com/) peuvent blind­er les fonds envoyés à une adresse transparente pour résoudre ce problème, mais tout le monde ne le sait pas. En résumé, beaucoup de gens utilisent ZEC de la manière permise par leur plateforme d’échange ou leur portefeuille principal.

#### S’assurer que votre ZEC est blindé

Nous recommandons à chacun de détenir lui-même la garde de son ZEC. Cela signifie déplacer votre ZEC d’une plateforme d’échange vers un portefeuille. La meilleure façon de savoir si vous utilisez du ZEC blindé, c’est-à-dire privé, est de regarder l’adresse où se trouve le solde. Si l’adresse commence par un « z » ou « u1 », alors votre solde est blindé. Si l’adresse commence par un « t », alors le solde est transparent.

Il existe généralement deux moyens d’obtenir du ZEC blindé.

Depuis une plateforme d’échange qui prend en charge les retraits **blindés** :

  1. Acheter du ZEC sur une plateforme d’échange
  2. Démarrer le processus de retrait sur la plateforme d’échange
  3. Ouvrir votre portefeuille ZEC blindé et vérifier que l’adresse de réception commence par « u1 » ou « z »
  4. Effectuer le retrait depuis votre plateforme d’échange

Depuis une plateforme d’échange qui prend en charge les retraits **transparents** :


  1. Acheter du ZEC sur une plateforme d’échange
  2. Démarrer le processus de retrait sur la plateforme d’échange
  3. Ouvrir votre portefeuille ZEC avec blindage automatique et utiliser l’adresse de réception transparente
  4. Effectuer le retrait depuis votre plateforme d’échange
  5. Attendre dix confirmations, puis blinder le ZEC de votre adresse transparente vers une adresse blindée


Voici un tutoriel expliquant comment retirer du ZEC depuis une plateforme d’échange. Notez qu’il s’agit ici d’un retrait blindé.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Acheter et retirer du ZEC vers un portefeuille blindé depuis Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
Voici un tutoriel expliquant comment blinder votre ZEC d’une adresse transparente vers une adresse blindée.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Blinder votre ZEC d’une adresse transparente vers une adresse blindée"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
Voici un tutoriel expliquant comment acheter du ZEC sur Coinbase et l’envoyer vers Zashi.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi : acheter du Zcash et le blinder instantanément"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### Transactions

Après vous être assuré que votre ZEC se trouve dans un portefeuille blindé prenant en charge les adresses blindées, vous pouvez maintenant décider si vous souhaitez effectuer des transactions avec ce ZEC. Effectuer des transactions avec ZEC est très simple. Vous pouvez envoyer du ZEC vers des adresses blindées ou transparentes selon la préférence de la personne. Comme pour toute transaction monétaire, il existe de faibles risques que des données soient divulguées. ZEC est ce qu’il y a de mieux pour lutter contre les fuites de données, mais cela ne signifie pas que vous devez l’utiliser sans précaution. Voici certaines choses que vous voudrez éviter lorsque vous effectuez des transactions avec ZEC.

- Divulguer votre adresse blindée
- Utiliser une adresse blindée comme passerelle pour des t-adresses (c.-à-d. du « mixing »)
- Effectuer, et divulguer le fait d’effectuer, un grand nombre de transactions de blindé vers transparent
- Indiquer régulièrement aux autres où vous dépensez du ZEC blindé


En substance, la meilleure chose à faire avec votre ZEC est de le conserver dans un portefeuille blindé, d’effectuer des transactions entre adresses blindées, et de faire attention à la façon dont vous utilisez ZEC en public (par ex. dans un café). Garantir la confidentialité implique un certain niveau de responsabilité.

#### Ressources

[Transactions Zcash](https://zechub.wiki/using-zcash/transactions)
