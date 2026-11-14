<a href="https://github.com/zechub/zechub/edit/main/site/guides/Maya_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Maya, exchange décentralisé

> Maya Protocol est un DEX inter-chaînes pour des échanges natifs (par exemple d'ETH ou de BTC vers ZEC) sans jetons enveloppés, sans compte et sans KYC.

## En bref

* Maya échange des cryptomonnaies natives entre blockchains : vous envoyez un actif et recevez un autre actif sur sa propre chaîne. Pas de jetons enveloppés, pas de compte, pas de KYC.
* C'est un fork de THORChain, construit avec le SDK Cosmos et sécurisé par des opérateurs de nœuds qui immobilisent du capital en caution (Proof of Bond).
* Son jeton natif est le $CACAO. Les fournisseurs de liquidité perçoivent des frais d'échange et sont couverts par la protection contre la perte impermanente (ILP) après 50 jours.
* Maya est un backend : vous l'utilisez via une interface ou un portefeuille comme THORWallet, CacaoSwap, Asgardex, Ctrl Wallet ou KeepKey.
* La vidéo tutorielle montre un échange d'ETH vers ZEC sur LeoDex, l'une de ces interfaces.
* Maya prend en charge les dépôts ZEC protégés/unifiés via SwapKit (sortie de valeur transparente plus un mémo protégé), si bien que certaines interfaces peuvent livrer des ZEC directement sur une adresse unifiée. Si la vôtre paie sur une adresse transparente (t1), protégez ensuite les fonds dans votre portefeuille pour préserver votre confidentialité.
* Maya n'est pas la seule option pour des échanges natifs de ZEC : THORChain dispose aussi d'un pool ZEC natif.

## Explication principale

Un exchange centralisé détient vos cryptomonnaies et exige votre identité. Maya utilise à la place un réseau de nœuds qui contrôlent des coffres sur chaque chaîne prise en charge. Vous envoyez des cryptomonnaies vers un coffre Maya, au moins deux tiers des nœuds confirment le dépôt, et l'actif correspondant est envoyé depuis un autre coffre vers votre adresse sur la chaîne de destination.

Les opérateurs de nœuds déposent une caution qui peut être confisquée en partie s'ils se comportent mal, ce qui leur donne une raison financière de rester honnêtes. Maya ajoute des fonctionnalités par rapport à THORChain, comme les nœuds de liquidité et sa propre conception des réserves, et fonctionne aussi comme un second réseau indépendant à ses côtés.

Les sections ci-dessous expliquent le fonctionnement de Maya, la Proof of Bond, ce qui le distingue de THORChain et les portefeuilles qui le prennent en charge.

## Tutoriel


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="How to Swap Ethereum to Zcash on LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Qu'est-ce que Maya Protocol ?

Maya est un système d'[exchange décentralisé](https://nym.com/blog/what-is-dex) (DEX) qui permet d'échanger des cryptomonnaies entre différentes blockchains. Vous pouvez, par exemple, échanger facilement du Bitcoin (BTC) sur la blockchain Bitcoin contre de l'Ethereum (ETH) sur la blockchain Ethereum, sans que la plateforme détienne les actifs et sans faire intervenir d'autorité centralisée ni de procédure de connaissance du client (KYC).

Maya Protocol a été développé à l'aide du kit de développement logiciel Cosmos (SDK Cosmos) et fonctionne avec un mécanisme de consensus Proof of Bond (PoB). Le protocole est maintenu par des « opérateurs de nœuds », qui engagent du capital dans le système et perçoivent des rendements en récompense de leur contribution et de leurs efforts. Concrètement, les nœuds sont des ordinateurs exécutant un logiciel qui valide les échanges des utilisateurs et supervise les actifs détenus sur des adresses désignées sur différentes blockchains.

Pour réaliser un échange, la cryptomonnaie prise en charge doit être reçue sur l'une des adresses de Maya, envoyée par un utilisateur, puis un montant équivalent est envoyé depuis une autre adresse de Maya sur une blockchain différente. Ce processus est géré et approuvé par au moins deux tiers des nœuds, qui s'assurent notamment que les fonds ont bien été reçus.

De cette manière, les utilisateurs peuvent envoyer un type de jeton sur une blockchain et recevoir un type différent sur une autre blockchain, le tout de façon native et sans utiliser de jetons enveloppés.

## Qu'est-ce que la Proof of Bond ?

La Proof of Bond (PoB) est un mécanisme de consensus dans lequel les opérateurs de nœuds doivent engager une caution (généralement sous la forme du jeton natif du réseau) pour participer au réseau. Cette caution sert de garantie économique et incite les nœuds à agir honnêtement et à préserver l'intégrité du réseau. Si un nœud tente d'agir de manière malveillante ou ne remplit pas ses fonctions, sa caution peut être réduite, c'est-à-dire qu'une partie lui est retirée à titre de pénalité.

Dans Maya Protocol, ce mécanisme permet de produire de la valeur économique à partir des ressources mises en jeu par les opérateurs de nœuds, ce qui améliore l'efficacité du capital. De même, dans THORChain, les opérateurs de nœuds placent du RUNE (le jeton natif) en caution pour sécuriser le réseau et assurer la coopération entre les participants.

## Différences entre Maya et THORChain

Maya est un fork de THORChain, mais doté de quelques nouvelles fonctionnalités qui en font une excellente alternative. Les plus importantes sont les suivantes :

### Nœuds de liquidité

Plutôt que de suivre le modèle de caution pure, Maya envisage de passer à un modèle de nœuds de liquidité. Dans ce système, les nœuds peuvent apporter directement de la liquidité et la placer en caution auprès du réseau. Cette approche fait courir un risque important aux opérateurs de nœuds : s'ils font un mauvais usage des fonds, ils subissent des pertes, ce qui est très dissuasif. Ainsi, les opérateurs de nœuds utilisent des unités de liquidité issues des pools de liquidité, qui fournissent de la liquidité tout en renforçant la sécurité du réseau.

### Protection contre la perte impermanente

Il s'agit d'un système qui protège les fournisseurs de liquidité (LP) contre la perte temporaire qu'ils peuvent subir en fournissant de la liquidité, en raison des fluctuations constantes du prix des cryptoactifs.
L'ILP détient 10 % de l'offre de $CACAO (10 millions de $CACAO) et est continuellement réalimentée par 10 % des frais du protocole. L'ILP devient active 50 jours après un dépôt de liquidité, avec une couverture plafonnée à 100 %.

La durée nécessaire à la couverture ILP dépend de la performance de l'ACTIF et du $CACAO. La couverture complète est atteinte après 150 jours si l'ACTIF performe mieux, et après 450 jours si le $CACAO performe mieux. L'ILP est versée puis réinitialisée lors d'un retrait complet, mais n'est pas affectée par les retraits partiels. En cas de recharge, l'ILP est réinitialisée mais n'est pas versée.

### Un modèle d'allocation différent

La Liquidity Auction était un événement de 21 jours conçu pour distribuer des jetons $CACAO aux participants. Pendant l'événement, les utilisateurs ont déposé des actifs pris en charge sur une adresse spécifique. À la fin de l'enchère, 90 % des jetons $CACAO ont été attribués aux participants au prorata de leurs apports de liquidité, tandis que les 10 % restants ont été affectés à la réserve ILP. Les participants sont devenus fournisseurs de liquidité, leurs actifs déposés et leurs jetons $CACAO étant placés dans les pools de Maya, ce qui leur permet de percevoir une part des frais générés.

### Une gestion différente des réserves

Au lancement de Maya Protocol, les réserves de CACAO disponibles ne représentaient que 10 % de l'offre totale, contre 44 % pour THORChain, et étaient principalement destinées à la protection contre la perte impermanente (ILP). Maya n'a pas d'émission par bloc ; et si la liquidité détenue par le protocole et le prêt sont mis en place, ils auront une conception différente, car dans THORChain ces aspects sont étroitement liés aux réserves.

Malgré ces différences, Maya constitue aussi une solution complémentaire à THORChain, en apportant redondance, extension et validation, et en intégrant de nouveaux réseaux qui n'existent pas dans l'implémentation actuelle de THORChain.

Par ailleurs, l'objectif de Maya est de devenir un *backend* sur lequel d'autres services peuvent s'appuyer, dans l'espoir de voir apparaître de nombreux nouveaux *frontends*, ou services DEX, construits sur l'infrastructure de Maya.

## Intégration des portefeuilles Maya Protocol

Puisqu'il fait office de *backend*, Maya doit être pris en charge par différentes interfaces et différents portefeuilles pour pouvoir être utilisé.
Voici une liste de quelques services qui prennent déjà en charge Maya :

[Thorwallet DEX](https://www.thorwallet.org/) : Ledger, XDEFI, MetaMask, Keystore

El Dorado : n'est plus en ligne, son domaine ne répond plus.

[CacaoSwap](https://cacaoswap.app/) : Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/) : Keystore, Ledger

DefiSpot : n'est plus en ligne, son domaine ne répond plus.

[Ctrl Wallet (XDEFI)](https://ctrl.xyz/) : un portefeuille en auto-garde multi-écosystèmes qui prend en charge plus de 30 blockchains natives, ainsi que toutes les chaînes EVM et Cosmos, dont Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON, et bien d'autres.

[KeepKey ](https://keepkey.com/) : un portefeuille matériel pour stocker vos actifs numériques en toute sécurité.
