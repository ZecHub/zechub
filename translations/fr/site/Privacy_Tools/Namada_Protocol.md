[![Modifier la page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Protocole Namada

![Logo de Namada](/content-images/logo-2067e2533d.webp)


## Qu’est-ce que Namada ?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash expliqué : alliance stratégique Namada-Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Le protocole Namada sert de plateforme de couche 1 basée sur un consensus de preuve d’enjeu, conçue pour fournir une confidentialité interchaînes agnostique aux actifs. Grâce au protocole Inter-Blockchain Communication (IBC), Namada s’intègre de manière fluide aux chaînes à finalité rapide, permettant une interopérabilité harmonieuse. En outre, Namada établit un pont bidirectionnel sans confiance avec Ethereum, facilitant une communication sûre et fiable entre les deux réseaux.

Namada donne la priorité à la confidentialité en mettant en œuvre une version améliorée du circuit Multi-Asset Shielded Pool (MASP). Cette version améliorée permet à tous les types d’actifs, y compris les tokens fongibles et non fongibles, d’utiliser un ensemble protégé partagé exactement comme celui de Zcash. En conséquence, le transfert d’actifs pris en charge sur Namada devient distinct dans la mesure où il devient difficile à identifier en raison du haut niveau de confidentialité impliqué. De plus, la dernière mise à jour du circuit Multi Asset Shielded Pool permet des récompenses pour l’ensemble protégé, une fonctionnalité ou une incitation révolutionnaire qui alloue des ressources pour promouvoir la confidentialité comme bien public.

## Pont Ethereum + compatible IBC

L’intégration du pont Ethereum dans Namada élimine la nécessité d’un protocole distinct, puisqu’il devient une partie intégrante de l’écosystème Namada. Les validateurs au sein de Namada sont chargés d’exécuter le pont en parallèle du protocole Namada principal. Ces validateurs servent également de relais lorsqu’il s’agit de transférer des actifs vers Namada, rendant inutile l’intervention d’acteurs supplémentaires. En revanche, lors du transfert d’actifs vers Ethereum, des parties externes (appelées relayers) interviennent, bien qu’elles n’assument aucune responsabilité quant à la validation ou à la sécurisation du pont.

![Schéma du pont Ethereum](/content-images/image-0fd8f754ba.webp)

Le protocole Namada a également la capacité de se connecter de manière fluide à toute chaîne à finalité rapide prenant en charge le protocole Inter-Blockchain Communication (IBC). Lorsqu’il s’agit d’interopérer avec Ethereum, Namada met en œuvre un pont Ethereum spécialisé et sécurisé qui fonctionne sans confiance. Ce pont est soigneusement conçu pour donner la priorité à la sécurité en imposant des contrôles de flux à toutes les connexions du pont et en traitant tout transfert Ethereum défaillant comme une infraction grave pouvant entraîner des pénalités de slashing.

## Récompenses de l’ensemble protégé

Dans la dernière mise à jour du protocole [Namada](https://namada.net/blog/what-is-namada), les utilisateurs qui détiennent des actifs protégés sont encouragés à participer activement à l’ensemble protégé partagé. Cela est rendu possible grâce à l’intégration du circuit MASP mis à jour, qui inclut désormais l’innovant Convert Circuit. En tirant parti de cette nouvelle fonctionnalité, Namada encourage les utilisateurs à contribuer à l’ensemble protégé partagé en détenant des actifs protégés.

Dans Namada, l’ensemble protégé est considéré comme un bien public non exclusif et anti-rival. Cela signifie que plus les individus utilisent les transferts protégés, plus le niveau de garanties de confidentialité s’améliore pour chaque participant. Le protocole reconnaît l’importance de l’adoption et de la participation collectives pour renforcer la confidentialité de tous les utilisateurs. Par conséquent, en encourageant les utilisateurs à détenir des actifs protégés et à contribuer à l’ensemble protégé partagé, Namada favorise un écosystème de confidentialité plus fort et plus robuste.

## Transaction d’actifs protégés

Le MASP ([Multi-Asset Shielded Pool](https://docs.namada.net/users/shielded-accounts)) étend le circuit Sapling de Zcash pour prendre en charge les transferts protégés d’actifs natifs et non natifs. Partager un pool ne signifie pas que la confidentialité est indépendante de l’usage d’un actif. La documentation de Namada explique que les actifs de même nature partagent un ensemble d’anonymat, et que les schémas publics de protection et de déprotection peuvent tout de même révéler l’origine d’un actif.

![Schéma de transaction d’actifs protégés](/content-images/image-1-512c639d56.webp)

Par exemple, si un seul compte protège des BTC puis les retire ultérieurement vers ce même compte, ces points d’entrée et de sortie publics peuvent être reliés, même si les fonds ont circulé de manière privée au sein du MASP. Lorsque davantage de comptes protègent des BTC, un retrait ultérieur pourrait au contraire appartenir à n’importe lequel de ces comptes. Ce qui compte, c’est la participation effective et le schéma des transactions : la taille du pool partagé ne suffit pas, à elle seule, à garantir une confidentialité identique pour chaque actif.

## Moins de frais et des transactions rapides

Namada combine deux éléments clés pour offrir une vitesse de transaction rapide et la finalité : une génération rapide des preuves et un consensus Byzantine Fault Tolerant (BFT) moderne. Ces deux caractéristiques permettent à Namada d’atteindre un taux de traitement des transactions comparable à celui de Visa, un réseau de paiement bien connu reconnu pour ses capacités de haut débit. La génération rapide des preuves fait référence à la production efficace de preuves cryptographiques qui valident l’exactitude et l’intégrité des transactions sur la blockchain. En employant des techniques avancées et des optimisations, le protocole Namada minimise la surcharge de calcul nécessaire pour générer ces preuves, ce qui se traduit par une vérification et une confirmation rapides des transactions.

De plus, Namada utilise des algorithmes de consensus BFT modernes, qui garantissent l’intégrité et l’accord sur les transactions à travers le réseau. Ces mécanismes de consensus permettent à Namada de parvenir à un consensus sur l’ordre et la validité des transactions, offrant une solide garantie de finalité. Avec la finalité, les transactions sont considérées comme irréversibles, réduisant le risque de double dépense ou d’annulation de transaction. Namada suit une approche similaire à celle d’Anoma, un autre protocole connu pour ses solutions de scalabilité. Namada adopte des instances fractales, qui permettent la création de chaînes imbriquées au sein de la blockchain principale. Cette structure fractale permet une mise à l’échelle horizontale en répartissant la charge sur plusieurs instances, renforçant ainsi la capacité et les performances globales du réseau.

## Alliance stratégique entre Namada et Zcash

Selon une publication récente que vous pouvez consulter sur le [blog du protocole Namada](https://namada.net/blog/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash), l’équipe derrière le protocole Namada est heureuse de présenter une proposition et une demande de commentaires (RFC) pour une alliance stratégique entre les actifs, les chaînes et les communautés de Namada et de Zcash.

![Schéma de l’alliance stratégique Namada-Zcash](/content-images/image-2-68804c60f3.webp)

L’alliance proposée comprend trois éléments principaux. Premièrement, un fonds de subventions sera créé pour financer des projets apportant des avantages à la fois à Zcash et à Namada. Deuxièmement, un airdrop de tokens NAM sera attribué aux détenteurs de ZEC. Enfin, un plan est en place pour établir un pont à confiance minimisée reliant Zcash et Namada. Une fois mis en œuvre, ce pont permettra aux détenteurs de ZEC, appelés Zolders, d’utiliser leurs ZEC sur Namada. En outre, les Zolders auront la possibilité d’accéder, via Namada, aux écosystèmes plus larges de Cosmos et d’Ethereum. Vous pouvez en apprendre davantage sur l’alliance stratégique sur le [forum communautaire Zcash](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)

## Liens de référence

- [Namada Vidéo officielle du protocole](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Namada Site officiel du protocole](https://namada.net/)
- [Blog de Namada](https://namada.net/blog)
- [Documentation de Namada](https://docs.namada.net/)
