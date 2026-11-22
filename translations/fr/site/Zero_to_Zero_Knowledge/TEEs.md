# Zero to Zero Knowledge : environnements d'exécution de confiance (TEE)

**Série :** Zero to Zero Knowledge

Zero to Zero Knowledge est de retour avec un nouveau sujet !  
Cette semaine, nous explorons les **environnements d'exécution de confiance (TEE)** : comment ils sont utilisés dans les privacy coins et d'autres applications blockchain.

![Introduction aux environnements d'exécution de confiance](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEE et blockchains : des propriétés complémentaires

Les blockchains et les TEE ont des forces très complémentaires :

- **Les blockchains** garantissent la disponibilité et la persistance de l'état, et permettent la vérification publique de l'ensemble de l'état, mais leur puissance de calcul est limitée.  
- **Les TEE** peuvent effectuer des tâches de calcul intensives de manière confidentielle, mais ne disposent pas de persistance native de l'état.

Ensemble, ils permettent de créer de puissants systèmes préservant la confidentialité.

---

## Secret Network : une confidentialité alimentée par les TEE

**Secret Network** s'appuie sur la technologie TEE (plus précisément Intel SGX) pour effectuer des calculs sur des entrées, des sorties et un état chiffrés.

Chaque nœud validateur fonctionne avec des puces Intel SGX. Les couches de consensus et de calcul sont combinées :

- Les transactions sont traitées à l'intérieur d'enclaves sécurisées.  
- Les données ne sont déchiffrées qu'**à l'intérieur du TEE**.

Cela diffère de Zcash, qui utilise des **preuves à divulgation nulle de connaissance** pour assurer la confidentialité. Dans Zcash, les transactions protégées sont diffusées et validées publiquement sans qu'aucune donnée supplémentaire ne soit révélée au réseau. Les actifs protégés de Zcash suivent le même principe.

![Diagramme TEE de Secret Network](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

Pour une explication détaillée de la mise en œuvre des TEE sur Secret Network, lisez cet excellent article de @l_woetzel :  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Comment Secret Network sécurise les clés et l'état

- La **graine de chiffrement de consensus** du réseau est stockée dans le TEE de chaque validateur.  
- Les contrats utilisent des clés de chiffrement uniques et infalsifiables.  
- Les contrats secrets s'exécutent sur le module de calcul du SDK Cosmos, mais prennent en charge des entrées, des sorties et un état chiffrés.

---

## Attestation à distance

L'**attestation à distance** est le processus permettant de prouver qu'une enclave s'exécute dans un environnement matériel sécurisé authentique.

Elle permet à une partie distante de vérifier :
- Que la bonne application est en cours d'exécution  
- Que l'application n'a pas été altérée  
- Qu'elle s'exécute de manière sécurisée à l'intérieur d'une enclave Intel SGX

![Explication de l'attestation à distance](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

Les enclaves contiennent également des clés privées de signature et d'attestation inaccessibles depuis l'extérieur.

![Protection des clés par l'enclave](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## Scellement des données

Les enclaves étant sans état, les données doivent parfois être stockées à l'extérieur, dans une mémoire non fiable.  

Le **scellement des données** chiffre les données à l'intérieur de l'enclave à l'aide d'une clé dérivée du processeur. Le bloc chiffré ne peut être descellé que sur le **même système**.

![Diagramme du scellement des données](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Oasis Network

**Oasis Network** utilise également les TEE par l'intermédiaire de ses ParaTimes confidentiels (p. ex. Sapphire et Cipher).

Les données chiffrées entrent dans le TEE avec le contrat intelligent. Elles y sont déchiffrées, traitées, puis chiffrées à nouveau avant de quitter l'enclave.

![Flux TEE d'Oasis Network](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## Les TEE dans les réseaux en preuve d'enjeu

De nombreuses blockchains en preuve d'enjeu (dont Secret et Oasis) utilisent **Tendermint** comme cadre de consensus.

Pour les validateurs PoS :
- Les clés doivent être gérées de manière sécurisée et ne jamais être exposées en clair.  
- Les validateurs doivent rester en ligne (des pénalités s'appliquent en cas d'indisponibilité).  
- La signature de messages contradictoires peut entraîner un slashing.

**Les TEE** sont idéaux pour générer et utiliser les clés des validateurs de manière sécurisée.

![Tendermint et sécurité PoS](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## Zcash et la recherche sur la preuve d'enjeu

Zcash étudie activement une migration vers la preuve d'enjeu.

- Lisez la recherche : https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Regardez cet extrait d'un Community Call Zcash Foundation qui explique les différentes conceptions PoS et leurs implications en matière de confidentialité :
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**Fil original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*Cette page a été compilée à partir du fil Zero to Zero Knowledge original pour le wiki ZecHub.*
