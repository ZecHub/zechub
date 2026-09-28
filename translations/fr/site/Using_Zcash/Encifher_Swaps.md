# **Swap SOL/USDC -> ZEC avec Encrypt.trade**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*Échangez des Solana contre des Zcash, l’étape cross-chain étant acheminée via Near Intents.*  

---

###  Introduction  
[**encrypt.trade**](https://encrypt.trade/zec) est une application Solana gérée par JMD Labs Inc. Elle vous permet d’échanger des **SOL ou USDC** sur Solana contre des **Zcash (ZEC)**. Vos jetons sont d’abord enveloppés dans des versions chiffrées afin que les montants soient masqués sur Solana, puis échangés contre des ZEC via Near Intents.

L’échange est privé à certains égards, mais pas à tous. La [documentation](https://docs.encifher.io/docs) de l’application indique que votre interaction avec la chaîne n’est pas anonyme : les personnes peuvent voir que votre wallet a utilisé l’application, mais pas le montant que vous avez déplacé. Les ZEC arrivent également à une adresse transparente ; ils restent donc visibles sur la chaîne Zcash jusqu’à ce que vous les protégiez.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  Ce qu’il faut savoir avant d’échanger  
- **Côté Solana.** L’enveloppement masque les montants, mais l’adresse de votre wallet et son utilisation de l’application sont publiques. Ses [bonnes pratiques](https://docs.encifher.io/docs/best-practices) avertissent qu’un simple enveloppement, échange et déballage rend votre transaction traçable.
- **Chiffrement.** Les soldes chiffrés sont traités hors chaîne dans une enclave matérielle (TEE). Le [document](https://eprint.iacr.org/2026/1504) des développeurs indique que cela repose sur l’intégrité du TEE, une gestion honnête des clés par seuil et la racine d’attestation du cloud, et pas sur la cryptographie seule.
- **Étape cross-chain.** L’échange vers des ZEC est acheminé via Near Intents, où des solveurs indépendants exécutent l’ordre.
- **Côté Zcash.** Near Intents liste ZEC comme pris en charge pour les [adresses transparentes uniquement](https://docs.near-intents.org/resources/chain-support), et le champ ZEC sur encrypt.trade n’acceptait que des adresses transparentes (t1 ou t3) lorsque ce guide a été vérifié en septembre 2026. Une adresse transparente affiche publiquement son solde et les transferts entrants jusqu’à ce que vous les protégiez.
- **Filtrage.** L’application vérifie les wallets qui se connectent à l’aide de bases de données telles que TRM et Chainalysis, et sa [page de conformité](https://docs.encifher.io/docs/compliance) indique que les enregistrements chiffrés peuvent être examinés en cas de motif juridique légitime. Near Intents effectue également son propre [filtrage](https://docs.near-intents.org/security-compliance/risk-and-compliance).

---

###  Étape 1 : Connectez votre wallet Solana  
Rendez-vous sur [encrypt.trade](https://encrypt.trade/zec) avec **Chrome ou Firefox**, puis connectez votre wallet **Phantom**, **Solflare** ou **Slope**. Assurez-vous que votre wallet contient suffisamment de **SOL** pour les frais de gas et les jetons que vous souhaitez échanger. Une fois connecté, vous êtes prêt à envelopper vos actifs.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Étape 2 : Enveloppez vos jetons  
Accédez à la section **Wrap**. Choisissez **SOL** ou **USDC**, saisissez le montant et confirmez. L’application verrouille vos actifs et émet des **versions chiffrées (eSOL ou eUSDC)**. Envelopper un montant différent de celui que vous échangez rend plus difficile l’association des deux par leur montant, mais cela ne masque pas le fait que votre wallet a utilisé l’application.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Étape 3 : Préparez votre wallet ZODL  
Téléchargez [**ZODL**](https://zodl.com), le wallet Zcash maintenu par ZODL. Sur l’écran de réception, copiez votre **adresse transparente Zcash** (elle commence par t1). encrypt.trade n’accepte actuellement pas les adresses protégées ou unifiées pour les ZEC. Sauvegardez votre phrase de récupération en lieu sûr avant de continuer.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Étape 4 : Échangez  
De retour sur **encrypt.trade**, accédez à **Swap**. Sélectionnez **eSOL/eUSDC -> ZEC**, collez votre adresse transparente ZODL, vérifiez les détails et confirmez.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents** gère l’acheminement cross-chain et envoie les **ZEC** vers votre wallet ZODL. Cela peut prendre quelques minutes. Near Intents recommande de prévoir jusqu’à 15 minutes pour les échanges cross-chain.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Étape 5 : Protégez vos ZEC  
Une fois que les ZEC arrivent, utilisez l’option **Shield** de ZODL pour les déplacer vers le [pool protégé](/using-zcash/shielded-pools). Jusque-là, ils se trouvent à une adresse transparente où chacun peut voir le solde. La protection préserve ce que vous faites ensuite, mais le transfert entrant et la transaction de protection restent visibles sur la chaîne. Vérifiez toujours les liens, évitez de réutiliser les adresses et testez d’abord avec de petits montants.  

---

###  Qui est impliqué et où obtenir de l’aide  
- **encrypt.trade** est l’application, gérée par JMD Labs Inc. Sa [politique de confidentialité](https://encrypt.trade/privacy) indique qu’elle collecte des données techniques telles que l’IP, le navigateur et les informations sur l’appareil, envoie l’adresse de votre wallet, l’historique récent et les soldes à des fournisseurs de conformité avant un échange, et peut conserver les journaux et résultats de filtrage AML pendant jusqu’à cinq ans. Ses [conditions](https://encrypt.trade/terms) interdisent l’utilisation d’un VPN ou d’un proxy pour masquer votre localisation. Assistance : help@encifher.io ou le groupe [Telegram](https://t.me/+ZWHGMW4ZHXQwYTZl) lié depuis l’application.
- **Near Intents** achemine l’étape cross-chain et livre les ZEC. Consultez ses [conditions de l’API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) ainsi que sa politique de confidentialité sur near.com/privacy, suivez les échanges dans l’[explorateur Near Intents](https://explorer.near-intents.org) et demandez de l’aide dans le [Near Intents Telegram](https://t.me/near_intents).

Les conditions et les adresses prises en charge peuvent changer ; vérifiez donc les versions actuelles avant un échange important. Pour mieux comprendre le contexte général, consultez [Échanges non custodiaux](/using-zcash/non-custodial-exchanges).

---

En combinant **Solana**, **Zcash** et **Near Intents**, **encrypt.trade** vous offre un itinéraire rapide des SOL ou USDC vers des ZEC. Il masque les montants sur Solana, mais n’est pas privé de bout en bout ; protégez donc vos ZEC dès leur arrivée.
