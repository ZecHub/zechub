# Maya Decentralised Exchange

---

## Tutoriel


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="Comment échanger Ethereum contre Zcash sur LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Qu'est-ce que Maya Protocol ?

Maya est un système d'[échange décentralisé](https://nym.com/blog/what-is-dex) (DEX) qui permet d'échanger des cryptomonnaies entre différentes blockchains. Vous pouvez, par exemple, échanger du Bitcoin (BTC) sur la blockchain Bitcoin contre de l'Ethereum (ETH) sur la blockchain Ethereum de manière simple, sans détenir les actifs ni impliquer d'autorités centralisées ou de procédures Know Your Customer (KYC).

Maya Protocol a été développé à l'aide du Cosmos Software Development Kit (Cosmos SDK) et fonctionne avec un mécanisme de consensus Proof of Bond (PoB). Le protocole est maintenu par des « opérateurs de nœuds », qui immobilisent du capital dans le système et obtiennent des rendements en récompense de leur contribution et de leurs efforts. En pratique, les nœuds sont des ordinateurs exécutant un logiciel qui valide les échanges des utilisateurs et supervise les actifs dans des adresses désignées sur différentes blockchains.

Pour finaliser un échange, la cryptomonnaie prise en charge doit être reçue sur l'une des adresses de Maya, envoyée par un utilisateur, puis un montant équivalent est envoyé depuis une autre des adresses de Maya sur une blockchain différente. Ce processus est géré et approuvé par au moins deux tiers des nœuds, ce qui garantit notamment que les fonds ont bien été reçus.

De cette manière, les utilisateurs peuvent envoyer un type de jeton sur une blockchain et recevoir un type différent sur une autre blockchain, le tout de manière native et sans utiliser de wrapped tokens.

## Qu'est-ce que le Proof of Bond ?

Le Proof of Bond (PoB) est un mécanisme de consensus dans lequel les opérateurs de nœuds doivent engager une caution (généralement sous la forme du jeton natif du réseau) pour participer au réseau. Cette caution agit comme une forme de sécurité économique, garantissant que les nœuds agissent honnêtement et préservent l'intégrité du réseau2. Si un nœud tente d'agir de manière malveillante ou ne remplit pas ses obligations, sa caution peut être réduite, ce qui signifie qu'une partie lui est retirée à titre de pénalité.

Dans Maya Protocol, ce mécanisme aide à produire de la valeur économique à partir des ressources mises en jeu par les opérateurs de nœuds, augmentant ainsi l'efficacité du capital. De manière similaire, dans THORChain, les opérateurs de nœuds engagent des RUNE (le jeton natif) pour sécuriser le réseau et garantir la coopération entre les participants.

## Différences entre Maya et THORChain

Maya est un fork de THORChain, mais avec quelques nouvelles fonctionnalités qui en font une excellente alternative. Les plus importantes sont :

### Nœuds de liquidité

Au lieu de suivre le modèle Pure Bond, Maya envisage de passer à un modèle de nœuds de liquidité. Dans ce système, les nœuds peuvent contribuer directement à la liquidité en l'engageant sur le réseau. Cette approche signifie que les opérateurs de nœuds font face à un risque significatif : s'ils utilisent mal les fonds, ils subissent des pertes, ce qui agit comme un puissant moyen de dissuasion. En conséquence, les opérateurs de nœuds utilisent des unités de liquidité issues des pools de liquidité, qui fournissent simultanément de la liquidité et renforcent la sécurité du réseau.

### Protection contre la perte impermanente

Un système qui protège les fournisseurs de liquidité contre la perte temporaire (LPs) qu'ils peuvent subir lorsqu'ils fournissent de la liquidité, en raison des fluctuations constantes des prix des crypto-actifs.
L'ILP détient 10 % de l'offre de $CACAO (10 millions de $CACAO) et est continuellement reconstituée par 10 % des frais du protocole. L'ILP devient active 50 jours après un dépôt de liquidité, avec une couverture plafonnée à 100 %.

La durée de la couverture ILP dépend de la performance de l'ASSET et de $CACAO. La couverture complète est atteinte après 150 jours si l'ASSET performe mieux, et après 450 jours si $CACAO performe mieux. L'ILP est à la fois versée et réinitialisée lors d'un retrait complet, mais n'est pas affectée par les retraits partiels. En cas de top-up, l'ILP est réinitialisée mais non versée.

### Un modèle d'allocation différent

L'enchère de liquidité était un événement de 21 jours conçu pour distribuer des jetons $CACAO aux participants. Pendant l'événement, les utilisateurs déposaient des actifs pris en charge à une adresse spécifique. À la fin de l'enchère, 90 % des jetons $CACAO ont été alloués aux participants proportionnellement à leurs contributions de liquidité, tandis que les 10 % restants ont été alloués à la réserve ILP. Les participants sont devenus des fournisseurs de liquidité, leurs actifs déposés et leurs jetons $CACAO étant placés dans les pools de Maya, ce qui leur permet de gagner une part des frais générés.

### Une manière différente de gérer les réserves

À la genèse de Maya Protocol, les réserves de CACAO disponibles ne représentaient que 10 % de l'offre totale, contre 44 % pour THORChain, et étaient principalement destinées à la protection contre la perte impermanente (ILP). Maya n'a pas d'émissions de blocs ; et si la Protocol Owned Liquidity et le Lending sont implémentés, ils auront une conception différente, car dans THORChain, ces aspects sont étroitement intégrés aux réserves.

Malgré ses différences, Maya sert également de solution complémentaire à THORChain, en offrant redondance, extension et validation, et en intégrant de nouveaux réseaux qui n'existent pas dans l'implémentation actuelle de THORChain.

Par ailleurs, l'objectif de Maya est de devenir un *backend* sur lequel d'autres services pourront s'appuyer, dans l'espoir de voir apparaître de nombreux nouveaux *frontends*, ou services DEX construits sur l'infrastructure de Maya.

## Intégration du wallet Maya Protocol

En agissant comme un *backend*, Maya doit être pris en charge par différentes interfaces utilisateur et wallets pour pouvoir être utilisé. 
Voici une liste de certains services qui prennent déjà en charge Maya :

[Thorwallet DEX](https://www.thorwallet.org/) : Ledger, XDEFI, Metamask, Keystore

[El Dorado](https://www.eldorado.market/) : XDEFI, Keystore

[CacaoSwap](https://cacaoswap.app/) : Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/) : Keystore, Ledger

[DefiSpot](https://www.defispot.com/t) : XDEFI, Metamask, Keplr, Phantom, Walletconnect, Leap Wallet, Argeentx, Braavos, Trustwallet et Rabby.

[XDEFI](https://www.xdefi.io/) : un wallet en auto-garde multi-écosystème prenant en charge plus de 30 blockchains natives, ainsi que toutes les chaînes EVM et Cosmos, y compris Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON, et bien d'autres.

[KeepKey ](https://keepkey.com/) : Un hardware wallet pour stocker des actifs numériques en toute sécurité.
