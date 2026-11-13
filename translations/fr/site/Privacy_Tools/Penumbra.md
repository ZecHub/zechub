# Penumbra 

Penumbra est un réseau de couche 1 entièrement protégé par preuve d’enjeu et un échange décentralisé dans l’écosystème Cosmos. Son pool protégé interchaîne peut détenir des actifs provenant de chaînes connectées via IBC. Les utilisateurs peuvent transférer, staker, échanger et fournir de la liquidité au sein de Penumbra sans publier le solde de leurs comptes individuels ni relier ces actions à leur identité. Cela ne signifie pas que chaque donnée du réseau ou du DEX est privée.

![image.png](/content-images/_unavailable.svg)

## Technologie utilisée dans Penumbra IBC 

Intégration IBC : le protocole Inter-Blockchain Communication (IBC) relie Penumbra à d’autres chaînes compatibles avec IBC. Un transfert IBC entrant protège les fonds lorsqu’ils entrent dans Penumbra ; un transfert sortant les déprotège lorsqu’ils en sortent. L’activité sur une chaîne de contrepartie transparente reste publique, y compris l’adresse de destination d’un dépôt entrant. La [frontière de confidentialité suit la frontière IBC](https://guide.penumbra.zone/overview/interchain-privacy).

Preuves à divulgation nulle de connaissance (ZKP) : Penumbra utilise des preuves à divulgation nulle de connaissance côté client pour démontrer que les mises à jour d’état chiffrées sont valides sans publier les données privées de transaction d’un utilisateur. Les wallets analysent et déchiffrent localement les données qui leur sont visibles ; un nœud public ne peut pas simplement renvoyer le solde privé d’un utilisateur.

![image.png](/content-images/_unavailable.svg)

Échange décentralisé avec confidentialité : Penumbra inclut un DEX pour échanger des actifs au sein de son pool protégé. Les résultats individuels des swaps sont privés, tandis que les résultats d’exécution par lots et les positions de liquidité anonymes sont publics. Ces distinctions sont importantes pour décrire ce que l’échange masque.

## Cas d’utilisation

Transactions sécurisées : les transferts au sein du pool protégé de Penumbra protègent l’expéditeur, le destinataire, le montant et le type d’actif. Les utilisateurs peuvent divulguer sélectivement leur activité à des tiers autorisés. Le partage d’une seule adresse de réception n’expose pas les soldes de son propriétaire. Ces propriétés ne s’étendent pas à l’activité publique sur une autre chaîne après le retrait des fonds.

Staking : le token natif de staking de Penumbra est **UM**. Déléguer des UM à un validateur renvoie des tokens de délégation représentant des parts dans le pool de délégation de ce validateur. Le staking total dans le pool de chaque validateur est public, tandis que les délégations individuelles sont anonymes. L’annulation de délégation crée d’abord des tokens de déliaison propres au validateur, qui restent exposés au slashing jusqu’à la fin du délai de déliaison. Consultez le guide officiel de [staking protégé](https://guide.penumbra.zone/overview/staking).

Échanges de tokens : les intentions de swap sont regroupées par paire de trading et exécutées par lots à la fin de chaque bloc. Cela supprime l’ordonnancement intra-bloc des intentions de swap comme levier pour les traders ; il s’agit d’un mécanisme spécifique, et non d’une garantie qu’aucune forme de MEV ne puisse exister. Les résultats des lots sont inscrits dans l’état public de la chaîne, et les utilisateurs réclament en privé leur part du résultat dans le pool protégé. Le [guide du DEX](https://guide.penumbra.zone/overview/dex) décrit l’exécution par lots et l’arbitrage automatique du protocole.

Tenue de marché : les fournisseurs de liquidité créent des positions anonymes de liquidité concentrée. La liquidité et les fonctions de trading de ces positions sont publiques, mais ne sont pas liées à l’identité du fournisseur.
