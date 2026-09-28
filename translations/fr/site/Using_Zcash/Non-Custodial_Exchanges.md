<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alt Text" width="50"/>   Échanges non dépositaires

[Zcash Échanges non dépositaires](/dex)

Dans le monde en constante évolution du trading de cryptomonnaies, les échanges non dépositaires, également appelés échanges décentralisés ou DEX, permettent aux utilisateurs d’effectuer des transactions sans confier leurs fonds à un compte d’échange. Vous conservez vos propres clés, mais cela ne signifie pas que personne d’autre n’intervient. Selon l’itinéraire, un échange peut passer par un site web ou une application de wallet, un service de routage, des smart contracts, des solveurs et des bridges.

Les échanges listés ci-dessus vous permettent d’obtenir et d’échanger des Zcash depuis votre propre wallet. Le degré de confidentialité d’un échange dépend du service, du réseau depuis lequel vous payez et du fait que vos ZEC arrivent ou non sur une adresse blindée. Les sections ci-dessous expliquent cette différence.

### **Comprendre les échanges non dépositaires**

Les échanges non dépositaires, également appelés échanges décentralisés (DEX), sont des plateformes qui facilitent le trading de cryptomonnaies sans exiger que les utilisateurs déposent leurs fonds auprès de l’échange lui-même. Les utilisateurs gardent plutôt le contrôle de leurs clés privées et effectuent leurs transactions depuis leurs propres wallets. Les échanges inter-chaînes dépendent toutefois encore d’autres parties pour établir un prix, acheminer et régler la transaction (voir ci-dessous).

Cela peut améliorer la sécurité, car les utilisateurs ne dépendent pas de l’échange pour détenir leurs actifs, ce qui réduit le risque de piratage ou de mauvaise gestion. Cela ne rend pas pour autant un échange privé à lui seul. Les transactions sur les échanges non dépositaires utilisent souvent des smart contracts, qui sont publics, et le service utilisé peut toujours voir vos adresses et vos informations de connexion.

Un avantage majeur des échanges de cryptomonnaies non dépositaires réside dans le contrôle accru qu’ils offrent aux utilisateurs sur leurs actifs. Comme ces échanges ne conservent pas les actifs, les utilisateurs bénéficient d’une propriété et d’une autorité complètes sur leurs monnaies numériques.

### **Échanges non dépositaires vs échanges dépositaires**

**#1 Sécurité** : Les échanges non dépositaires éliminent la nécessité de conserver des fonds dans un compte centralisé d’échange. Les utilisateurs gardent le contrôle de leurs clés privées, réduisant les risques de piratage, d’attaques internes et de défaillances de plateforme que peuvent subir les échanges dépositaires. Les échanges inter-chaînes peuvent néanmoins conserver les fonds pendant un court instant dans une adresse de dépôt ou un bridge, le temps que la transaction soit réglée.

**#2 Confidentialité** : Les échanges non dépositaires ne nécessitent généralement pas de compte auprès d’un échange, vous évitez donc souvent de vous inscrire avec une adresse e-mail ou une pièce d’identité. Ce n’est pas la même chose que l’anonymat. Le dépôt que vous envoyez sur le réseau source (par exemple Solana ou Ethereum) est public sur cette chaîne, et le service peut toujours voir vos adresses de wallet, votre adresse IP et les détails de l’échange. La confidentialité du côté Zcash dépend de l’endroit où arrivent vos ZEC (voir ci-dessous).

**#3 Décentralisation** : Les échanges non dépositaires s’alignent davantage sur l’éthique décentralisée des cryptomonnaies. Les utilisateurs bénéficient d’une plus grande autonomie et d’un plus grand contrôle de leurs activités de trading, conformément aux principes plus larges de la technologie blockchain.

En ce qui concerne les échanges dépositaires, le niveau de décentralisation est souvent très faible dans la plupart des échanges centralisés, où l’équipe ou les responsables de l’échange gèrent les données ou informations des utilisateurs sur l’échange.

**#4 Adaptabilité aux changements réglementaires** : Les échanges non dépositaires sont souvent plus adaptables aux environnements réglementaires changeants. Puisqu’ils ne détiennent pas les fonds des utilisateurs, ils peuvent rencontrer moins de difficultés de conformité que les échanges dépositaires.

**#5 Innovation et expérimentation** : Les échanges non dépositaires stimulent fréquemment l’innovation dans l’espace crypto. Ils encouragent le développement de technologies décentralisées, telles que les teneurs de marché automatisés (AMM) et les applications de finance décentralisée (DeFi).

**#6 Accessibilité mondiale** : Les échanges non dépositaires offrent souvent un accès aux cryptomonnaies aux utilisateurs du monde entier, y compris dans les régions où les obstacles réglementaires peuvent limiter la disponibilité des services d’échanges dépositaires.

**#7 Aucune exigence KYC** : De nombreux échanges non dépositaires ne demandent pas de documents d’identité à l’avance. La plupart vérifient néanmoins les adresses de wallet dans des bases de données de conformité, et un échange peut être retardé, bloqué ou refusé si un élément est signalé. Consultez les conditions du service avant de vous y fier.

### **Ce que Zcash protège et ce qu’il ne protège pas**

La confidentialité de Zcash provient des adresses blindées. Lorsque des ZEC se déplacent entre des adresses blindées, l’expéditeur, le destinataire, le montant et le mémo sont chiffrés sur la chaîne Zcash. Consultez [Pools blindés](/using-zcash/shielded-pools) pour comprendre comment cela fonctionne.

Un échange comporte des éléments que Zcash ne peut pas masquer :

- **Le réseau source.** Les fonds que vous envoyez depuis Solana, Ethereum ou une autre chaîne publique sont visibles sur cette chaîne, y compris votre adresse et le montant.
- **L’adresse de réception.** Certains itinéraires d’échange livrent des ZEC à une adresse transparente. Par exemple, Near Intents liste ZEC comme étant pris en charge pour les [adresses transparentes uniquement](https://docs.near-intents.org/resources/chain-support). Les ZEC envoyés à une adresse transparente (t1 ou t3) sont publics, tout comme Bitcoin. Les blinder ensuite protège ce que vous faites par la suite, mais le transfert entrant et la transaction de blindage restent visibles.
- **Le service.** L’application et tout service de routage voient les adresses et les montants que vous leur fournissez, ainsi que des données de connexion telles que votre adresse IP.

Envoyez les ZEC vers un wallet que vous contrôlez et blindez-les avant de les dépenser. [Utiliser ZEC de manière privée](/guides/using-zec-privately) présente les étapes suivantes.

### **Qui intervient dans un échange**

Prenons comme exemple un échange acheminé via le service 1Click de Near Intents. Ses [conditions d’utilisation de l’API](https://docs.near-intents.org/security-compliance/terms-of-service) considèrent les éléments suivants comme des parties distinctes :

- **L’interface** : le site web ou le wallet que vous utilisez. Il peut être exploité par Intents Technology ou par un tiers disposant de ses propres conditions.
- **1Click** : un service de routage et de règlement exploité par Intents Technology Limited. Vous envoyez des fonds à une adresse de dépôt créée pour votre devis. La documentation indique que 1Click ne prend pas la garde des fonds, mais les conditions précisent que les actifs peuvent être détenus ou verrouillés dans une infrastructure de bridge pendant qu’un transfert est en cours.
- **Le protocole** : les smart contracts Near Intents.
- **Les solveurs** : des tiers indépendants qui exécutent le devis.
- **Les bridges** : les ZEC natifs transitent par le PoA Bridge, exploité par Intents Technology.

Near Intents [contrôle également les flux de devis intégrés](https://docs.near-intents.org/security-compliance/risk-and-compliance) à l’aide de plusieurs bases de données AML, et indique que la couverture varie selon le flux et l’intégration. Selon ses conditions, un échange signalé peut être retardé, bloqué, gelé ou rejeté.

### **Ce que vous partagez lors d’un échange**

- L’adresse ZEC qui reçoit l’échange, ainsi qu’une adresse de remboursement sur le réseau source.
- L’actif et le montant, ainsi que la transaction de dépôt que vous envoyez, laquelle est publique sur la chaîne source.
- Les données de connexion. Les conditions de 1Click indiquent qu’Intents Technology peut collecter les métadonnées de requêtes, les adresses IP et les adresses de wallet, et la politique de confidentialité de near.com répertorie l’adresse IP, la localisation, le navigateur et les informations sur l’appareil.
- Tout ce que l’application ajoute, comme d’autres adresses de wallet connectées. Les applications peuvent également soumettre votre wallet à leurs propres contrôles de conformité.

### **Où consulter les conditions et obtenir de l’aide**

Les conditions changent ; lisez donc les versions actuelles avant un échange important.

- **Commencez par l’application que vous utilisez.** C’est votre principal point de contact. Les conditions de l’API 1Click indiquent qu’Intents Technology n’entretient aucune relation directe avec les utilisateurs des applications construites sur celle-ci.
- **Near Intents :** les conditions et la politique de confidentialité sur near.com/terms et near.com/privacy, ainsi que les [conditions de l’API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) et les [risques et conformité](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Suivi et assistance :** recherchez un échange dans l’[explorateur Near Intents](https://explorer.near-intents.org) ou demandez de l’aide dans le [Near Intents Telegram](https://t.me/near_intents).
- **Remboursements :** un échange échoué peut être renvoyé à l’adresse de remboursement que vous avez fournie, mais les conditions de near.com indiquent qu’un remboursement n’est pas garanti. Les conditions de 1Click précisent également que les demandes de récupération liées à des erreurs d’utilisateur inférieures à 300 USD ne sont pas prises en considération.

Explorons maintenant quelques-uns des échanges non dépositaires accessibles qui facilitent le trading de Zcash. L’utilisation de ces plateformes vous offrira un moyen pratique d’acquérir davantage de pièces Zcash.

### **Résumé**

Les échanges non dépositaires, ou DEX, vous permettent d’effectuer des transactions depuis votre propre wallet tout en gardant le contrôle de vos clés privées. Cela améliore la sécurité, mais la confidentialité dépend de l’itinéraire : la chaîne source est publique, le service voit vos adresses et vos données de connexion, et vos ZEC ne sont privés qu’une fois placés dans une adresse blindée.

Bien que les échanges non dépositaires offrent des avantages convaincants, il est important de reconnaître qu’ils peuvent présenter des inconvénients, tels que des problèmes de liquidité potentiels et une courbe d’apprentissage plus raide pour les utilisateurs moins expérimentés.

Comme pour toute décision financière, les traders doivent évaluer attentivement leurs priorités, leur tolérance au risque et leur familiarité avec la technologie avant de choisir entre des options d’échange non dépositaires et dépositaires.
