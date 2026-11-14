[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Protocole Namada

![Namada Logo](/content-images/logo-2067e2533d.webp)


## Qu’est-ce que Namada ?

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash expliqué : l’alliance stratégique Namada-Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Le protocole Namada est une plateforme de couche 1 reposant sur un consensus de preuve d’enjeu. Il est conçu pour offrir une confidentialité inter-chaînes, quel que soit l’actif. Grâce au protocole IBC (Inter-Blockchain Communication), Namada s’intègre facilement aux chaînes à finalité rapide, ce qui permet une interopérabilité fluide. Namada met également en place un pont bidirectionnel sans tiers de confiance avec Ethereum, qui facilite une communication sûre et fiable entre les deux réseaux.

Namada donne la priorité à la confidentialité en mettant en œuvre une version améliorée du circuit MASP, le pool protégé multi-actifs (MASP). Cette version améliorée permet à tous les types d’actifs, y compris les jetons fongibles et non fongibles, d’utiliser un ensemble protégé commun, exactement comme celui de Zcash. Le transfert d’actifs pris en charge sur Namada devient donc difficile à identifier en raison du haut niveau de confidentialité. La dernière mise à jour du circuit du pool protégé multi-actifs permet aussi de récompenser la participation à l’ensemble protégé. Cette fonctionnalité novatrice est une incitation qui consacre des ressources à la promotion de la confidentialité en tant que bien public.

## Pont Ethereum et compatibilité IBC

L’intégration du pont Ethereum dans Namada rend inutile un protocole distinct, puisqu’il fait partie intégrante de l’écosystème Namada. Les validateurs de Namada sont chargés de faire fonctionner le pont en plus du protocole principal Namada. Ces validateurs servent aussi de relayeurs lors des transferts d’actifs vers Namada, ce qui rend inutile l’intervention d’acteurs supplémentaires. En revanche, les transferts d’actifs vers Ethereum font intervenir des parties externes, appelées relayeurs. Celles-ci ne sont toutefois pas responsables de la validation ni de la sécurité du pont.

![Diagramme du pont Ethereum](/content-images/image-0fd8f754ba.webp)

Le protocole Namada peut également se connecter facilement à toute chaîne à finalité rapide qui prend en charge le protocole IBC (Inter-Blockchain Communication). Pour l’interopérabilité avec Ethereum, Namada met en œuvre un pont Ethereum spécialisé et sécurisé, qui fonctionne sans tiers de confiance. Ce pont est conçu avant tout pour la sécurité. Il impose des contrôles de flux sur toutes les connexions du pont et considère tout transfert Ethereum défectueux comme une faute grave, qui peut entraîner des pénalités de slashing.

## Récompenses de l’ensemble protégé

Dans la dernière mise à jour du [protocole Namada](https://namada.net/blog/what-is-namada), les utilisateurs qui détiennent des actifs protégés sont incités à participer activement à l’ensemble protégé commun. Cela est rendu possible par l’intégration du circuit MASP mis à jour, qui comprend désormais le circuit de conversion, une innovation. Grâce à cette nouvelle fonctionnalité, Namada encourage les utilisateurs à contribuer à l’ensemble protégé commun en détenant des actifs protégés.

Dans Namada, l’ensemble protégé est considéré comme un bien public non exclusif et anti-rival. Cela signifie que plus les transferts protégés sont nombreux, plus les garanties de confidentialité s’améliorent pour chaque participant. Le protocole reconnaît l’importance de l’adoption et de la participation collectives pour renforcer la confidentialité de tous les utilisateurs. En incitant les utilisateurs à détenir des actifs protégés et à contribuer à l’ensemble protégé commun, Namada favorise donc un écosystème de confidentialité plus solide et plus robuste.

## Transactions d’actifs protégés

Le MASP ([pool protégé multi-actifs](https://docs.namada.net/users/shielded-accounts)) étend le circuit Sapling de Zcash pour prendre en charge les transferts protégés d’actifs natifs et non natifs. Partager un pool ne signifie pas que la confidentialité est indépendante de l’usage d’un actif. La documentation de Namada explique que les actifs de même nature partagent un ensemble d’anonymat. Elle précise aussi que les schémas publics de protection et de retrait de la protection peuvent tout de même révéler l’origine d’un actif.

![Diagramme de transaction d'actifs protégés](/content-images/image-1-512c639d56.webp)

Par exemple, si un seul compte protège des BTC, puis les retire plus tard vers ce même compte, ces points d’entrée et de sortie publics peuvent être reliés, même si les fonds ont circulé de manière confidentielle à l’intérieur du MASP. Si davantage de comptes protègent des BTC, un retrait ultérieur pourrait appartenir à n’importe lequel de ces comptes. Ce qui compte, c’est la participation et le schéma des transactions concernées. La taille du pool commun ne garantit pas à elle seule une confidentialité identique pour chaque actif.

## Moins de frais et des transactions rapides

Namada associe deux éléments clés pour offrir des transactions rapides et une finalité rapide : une génération rapide des preuves et un consensus moderne à tolérance aux pannes byzantines (BFT). Ces deux caractéristiques permettent à Namada d’atteindre un rythme de traitement des transactions comparable à celui de Visa, un réseau de paiement connu pour son débit élevé. La génération rapide des preuves désigne la production efficace de preuves cryptographiques qui valident l’exactitude et l’intégrité des transactions sur la blockchain. Grâce à des techniques et à des optimisations avancées, le protocole Namada réduit au minimum la charge de calcul nécessaire pour générer ces preuves. Les transactions sont ainsi vérifiées et confirmées rapidement.

Namada utilise aussi des algorithmes de consensus BFT modernes, qui garantissent l’intégrité des transactions et l’accord sur celles-ci dans tout le réseau. Ces mécanismes de consensus permettent à Namada de parvenir à un consensus sur l’ordre et la validité des transactions, ce qui offre une solide garantie de finalité. Avec la finalité, les transactions sont considérées comme irréversibles, ce qui réduit le risque de double dépense ou d’annulation de transaction. Namada suit une approche semblable à celle de Anoma, un autre protocole connu pour ses solutions de mise à l’échelle. Namada adopte des instances fractales, qui permettent de créer des chaînes imbriquées au sein de la blockchain principale. Cette structure fractale permet une mise à l’échelle horizontale en répartissant la charge sur plusieurs instances, ce qui améliore la capacité et les performances globales du réseau.

## Alliance stratégique entre Namada et Zcash

Selon une publication récente, disponible [sur le blog du protocole Namada](https://namada.net/blog/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash), l’équipe du protocole Namada a le plaisir de présenter une proposition et un appel à commentaires (RFC) en vue d’une alliance stratégique entre les actifs, les chaînes et les communautés de Namada et de Zcash.

![Diagramme de l'alliance stratégique Namada-Zcash](/content-images/image-2-68804c60f3.webp)

L’alliance proposée comprend trois éléments principaux. Premièrement, un pool de subventions sera créé pour financer des projets qui profitent à la fois à Zcash et à Namada. Deuxièmement, un airdrop de jetons NAM sera attribué aux détenteurs de ZEC. Enfin, il est prévu de créer un pont qui réduit au minimum le besoin de confiance entre Zcash et Namada. Une fois mis en place, ce pont permettra aux détenteurs de ZEC, appelés Zolders, d’utiliser leurs ZEC sur Namada. Les Zolders pourront aussi accéder plus largement aux écosystèmes Cosmos et Ethereum par l’intermédiaire de Namada. Pour en savoir plus sur l’alliance stratégique, consultez le [forum communautaire Zcash](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)

## Liens de référence

- [Vidéo officielle du protocole Namada](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Site officiel du protocole Namada](https://namada.net/)
- [Blog de Namada](https://namada.net/blog)
- [Documentation de Namada](https://docs.namada.net/)
