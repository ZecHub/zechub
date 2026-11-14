# Penumbra 

Penumbra est un réseau de couche 1 à preuve d'enjeu entièrement protégé et un exchange décentralisé de l'écosystème Cosmos. Son pool protégé interchaînes peut contenir des actifs provenant de chaînes connectées via IBC. Les utilisateurs peuvent transférer, faire du staking, échanger et fournir de la liquidité au sein de Penumbra sans publier le solde de leurs comptes individuels ni lier ces actions à leur identité. Cela ne signifie pas pour autant que toutes les données du réseau ou du DEX sont confidentielles.

![image.png](/content-images/_unavailable.svg)

## Technologies utilisées dans Penumbra IBC 

Intégration IBC : le protocole IBC (Inter-Blockchain Communication) connecte Penumbra à d'autres chaînes compatibles avec IBC. Un transfert IBC entrant protège les fonds lorsqu'ils entrent dans Penumbra ; un transfert sortant lève leur protection lorsqu'ils en sortent. L'activité sur une chaîne partenaire transparente reste publique, y compris l'adresse de destination d'un dépôt entrant. La [frontière de confidentialité suit la frontière IBC](https://guide.penumbra.zone/overview/interchain-privacy).

Preuves à divulgation nulle de connaissance (ZKP) : Penumbra utilise des preuves à divulgation nulle de connaissance générées côté client pour démontrer que les mises à jour d'état chiffrées sont valides sans publier les données de transaction privées de l'utilisateur. Les portefeuilles analysent et déchiffrent localement les données qui leur sont visibles ; un nœud public ne peut pas simplement renvoyer le solde privé d'un utilisateur.

![image.png](/content-images/_unavailable.svg)

Exchange décentralisé confidentiel : Penumbra comprend un DEX permettant d'échanger des actifs au sein de son pool protégé. Les résultats individuels des échanges sont confidentiels, tandis que les résultats d'exécution par lots et les positions de liquidité anonymes sont publics. Ces distinctions sont importantes pour décrire ce que l'exchange dissimule.

## Cas d'utilisation

Transactions sécurisées : les transferts au sein du pool protégé de Penumbra protègent l'expéditeur, le destinataire, le montant et le type d'actif. Les utilisateurs peuvent divulguer sélectivement leur activité à des tiers autorisés. Le simple fait de partager une adresse de réception ne révèle pas les soldes de son propriétaire. Ces propriétés ne s'étendent pas à l'activité publique sur une autre chaîne une fois les fonds retirés.

Staking : le jeton de staking natif de Penumbra est **UM**. Déléguer des UM à un validateur rapporte des jetons de délégation représentant des parts du pool de délégation de ce validateur. La mise totale dans le pool de chaque validateur est publique, tandis que les délégations individuelles sont anonymes. L'annulation d'une délégation crée d'abord des jetons de libération de caution propres au validateur, qui restent exposés aux pénalités de réduction de mise jusqu'à la fin du délai de libération de la caution. Consultez le [guide officiel du staking protégé](https://guide.penumbra.zone/overview/staking).

Échanges de jetons : les intentions d'échange sont regroupées par paire de négociation et exécutées par lot à la fin de chaque bloc. Cela empêche les traders d'exploiter l'ordre des intentions d'échange au sein d'un bloc ; il s'agit d'un mécanisme précis, et non d'une garantie qu'aucune forme de MEV ne puisse exister. Les résultats des lots sont inscrits dans l'état public de la chaîne, et les utilisateurs réclament de manière confidentielle leur part du résultat dans le pool protégé. Le [guide du DEX](https://guide.penumbra.zone/overview/dex) décrit l'exécution par lots et l'arbitrage automatique du protocole.

Tenue de marché : les fournisseurs de liquidité créent des positions de liquidité concentrée anonymes. La liquidité et les fonctions de négociation de ces positions sont publiques, mais ne sont pas liées à l'identité du fournisseur.
