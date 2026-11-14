<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Encifher_Swaps.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Échange de SOL/USDC vers ZEC avec encrypt.trade

> Échangez des SOL ou des USDC sur Solana contre des ZEC, l'étape inter-chaînes passant par NEAR Intents.


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)



---

## En bref

* [encrypt.trade](https://encrypt.trade/zec) convertit des SOL ou des USDC en jetons chiffrés (eSOL/eUSDC), puis les échange contre des ZEC via NEAR Intents.
* Les montants sont masqués sur Solana, mais l'adresse de votre portefeuille et son utilisation de l'application sont publiques.
* Les ZEC sont envoyés uniquement à une adresse transparente (t1/t3) : ils restent donc visibles sur la chaîne Zcash tant que vous ne les avez pas protégés.
* Protégez les ZEC dans votre portefeuille dès leur arrivée.
* L'application et NEAR Intents contrôlent tous deux les portefeuilles à des fins de conformité.

---

## Explication principale
[**encrypt.trade**](https://encrypt.trade/zec) est une application Solana exploitée par JMD Labs Inc. Elle vous permet d'échanger des **SOL ou des USDC** sur Solana contre des **Zcash (ZEC)**. Vos jetons sont d'abord convertis en versions chiffrées afin que les montants soient masqués sur Solana, puis échangés contre des ZEC via NEAR Intents.

L'échange est confidentiel à certains égards, mais pas à tous. La propre [documentation](https://docs.encifher.io/docs) de l'application indique que votre interaction avec la chaîne n'est pas anonyme : on peut voir que votre portefeuille a utilisé l'application, mais pas le montant que vous avez transféré. Les ZEC arrivent en outre sur une adresse transparente : ils restent donc visibles sur la chaîne Zcash tant que vous ne les avez pas protégés.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  Ce qu'il faut savoir avant d'échanger  
- **Côté Solana.** La conversion masque les montants, mais l'adresse de votre portefeuille et son utilisation de l'application sont publiques. Ses [bonnes pratiques](https://docs.encifher.io/docs/best-practices) avertissent qu'une simple séquence conversion, échange et reconversion rend votre transaction traçable.
- **Chiffrement.** Les soldes chiffrés sont traités hors chaîne dans une enclave matérielle (TEE). L'[article](https://eprint.iacr.org/2026/1504) des développeurs précise que ce système repose sur l'intégrité du TEE, sur une gestion honnête des clés à seuil et sur la racine d'attestation du cloud, et non sur la seule cryptographie.
- **Étape inter-chaînes.** L'échange vers ZEC passe par NEAR Intents, où des solveurs indépendants exécutent l'ordre.
- **Côté Zcash.** NEAR Intents indique que ZEC est pris en charge pour les [adresses transparentes uniquement](https://docs.near-intents.org/resources/chain-support), et le champ ZEC d'encrypt.trade n'acceptait que des adresses transparentes (t1 ou t3) lors de la vérification de ce guide en septembre 2026. Une adresse transparente affiche publiquement son solde et les transferts entrants tant que vous n'avez pas protégé les fonds.
- **Contrôle.** L'application vérifie les portefeuilles qui s'y connectent à l'aide de bases de données telles que TRM et Chainalysis, et sa [page de conformité](https://docs.encifher.io/docs/compliance) précise que les enregistrements chiffrés peuvent être examinés en cas de motif juridique légitime. NEAR Intents effectue également son propre [contrôle](https://docs.near-intents.org/security-compliance/risk-and-compliance).

---

###  Étape 1 : connectez votre portefeuille Solana  
Rendez-vous sur [encrypt.trade](https://encrypt.trade/zec) avec **Chrome ou Firefox**, puis connectez votre portefeuille **Phantom**, **Solflare** ou **Slope**. Assurez-vous que votre portefeuille contient suffisamment de **SOL** pour les frais de gas ainsi que les jetons que vous souhaitez échanger. Une fois connecté, vous êtes prêt à convertir vos actifs.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Étape 2 : convertissez vos jetons  
Accédez à la section **Wrap**. Choisissez **SOL** ou **USDC**, saisissez le montant et confirmez. L'application bloque vos actifs et émet des **versions chiffrées (eSOL ou eUSDC)**. Convertir un montant différent de celui que vous échangez rend plus difficile le rapprochement des deux opérations par leur montant, mais ne masque pas le fait que votre portefeuille a utilisé l'application.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Étape 3 : préparez votre portefeuille ZODL  
Téléchargez [**ZODL**](https://zodl.com), le portefeuille Zcash maintenu par ZODL. Sur l'écran Recevoir, copiez votre **adresse transparente Zcash** (elle commence par t1). Pour le moment, encrypt.trade n'accepte pas les adresses protégées ou unifiées pour les ZEC. Sauvegardez votre phrase de récupération en lieu sûr avant de continuer.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Étape 4 : effectuez l'échange  
De retour sur **encrypt.trade**, allez dans **Swap**. Sélectionnez **eSOL/eUSDC -> ZEC**, collez votre adresse transparente ZODL, vérifiez les détails et confirmez.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**NEAR Intents** gère le routage inter-chaînes et envoie les **ZEC** sur votre portefeuille ZODL. Cela peut prendre quelques minutes. NEAR Intents recommande de prévoir jusqu'à 15 minutes pour les échanges inter-chaînes.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Étape 5 : protégez vos ZEC  
Dès que les ZEC sont arrivés, utilisez l'option **Shield** de ZODL pour les transférer dans le [pool protégé](/using-zcash/shielded-pools). D'ici là, ils se trouvent sur une adresse transparente dont tout le monde peut voir le solde. La protection préserve la confidentialité de vos opérations ultérieures, mais le transfert entrant et la transaction de protection restent visibles on-chain. Vérifiez toujours les liens, évitez de réutiliser des adresses et testez d'abord avec de petits montants.  

---

###  Qui intervient et où obtenir de l'aide  
- **encrypt.trade** est l'application, exploitée par JMD Labs Inc. Sa [politique de confidentialité](https://encrypt.trade/privacy) indique qu'elle collecte des données techniques telles que l'adresse IP et des informations sur le navigateur et l'appareil, qu'elle transmet l'adresse de votre portefeuille, votre historique récent et vos soldes à des prestataires de conformité avant un échange, et qu'elle peut conserver les journaux et les résultats des contrôles LBC pendant cinq ans au maximum. Ses [conditions d'utilisation](https://encrypt.trade/terms) interdisent d'utiliser un VPN ou un proxy pour masquer votre localisation. Assistance : help@encifher.io ou le [groupe Telegram](https://t.me/+ZWHGMW4ZHXQwYTZl) accessible depuis l'application.
- **NEAR Intents** assure le routage de l'étape inter-chaînes et livre les ZEC. Consultez ses [conditions de l'API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) et la politique de confidentialité sur near.com/privacy, suivez vos échanges sur l'[explorateur NEAR Intents](https://explorer.near-intents.org) et demandez de l'aide sur le [NEAR Intents Telegram](https://t.me/near_intents).

Les conditions et les adresses prises en charge peuvent changer : vérifiez donc les versions en vigueur avant un échange important. Pour une vue d'ensemble plus large, consultez [Exchanges non dépositaires](/using-zcash/non-custodial-exchanges).

---

En combinant **Solana**, **Zcash** et **NEAR Intents**, **encrypt.trade** vous offre un moyen rapide de passer de SOL ou d'USDC à des ZEC. L'application masque les montants sur Solana, mais n'est pas confidentielle de bout en bout : protégez donc vos ZEC dès leur arrivée.
