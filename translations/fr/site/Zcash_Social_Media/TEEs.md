# De Zero à Zero Knowledge : Environnements d’exécution de confiance (TEEs)

**Série :** Zero to Zero Knowledge

Zero to Zero Knowledge est de retour avec un nouveau sujet !  
Cette semaine, nous explorons les **Trusted Execution Environments (TEEs)** — comment ils sont utilisés dans les privacy coins et d’autres applications blockchain.

![Introduction aux Trusted Execution Environments](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEEs et blockchains : des propriétés complémentaires

Les blockchains et les TEEs ont des forces très complémentaires :

- Les **blockchains** garantissent la disponibilité, la persistance de l’état et permettent une vérification publique de l’état dans son ensemble — mais elles ont une puissance de calcul limitée.  
- Les **TEEs** peuvent effectuer en privé des tâches de calcul intensives — mais ils ne disposent pas d’une persistance d’état native.

Ensemble, ils peuvent créer de puissants systèmes préservant la confidentialité.

---

## Secret Network : la confidentialité alimentée par les TEE

**Secret Network** exploite la technologie TEE (en particulier Intel SGX) pour effectuer des calculs sur des entrées, sorties et états chiffrés.

Chaque nœud validateur exécute des puces Intel SGX. Les couches de consensus et de calcul sont combinées :

- Les transactions sont traitées à l’intérieur d’enclaves sécurisées.  
- Les données ne sont déchiffrées **qu’à l’intérieur du TEE**.

Ceci est différent de Zcash, qui utilise des **preuves à divulgation nulle de connaissance** pour la confidentialité. Dans Zcash, les transactions blindées sont diffusées et validées publiquement sans qu’aucune donnée supplémentaire ne soit révélée au réseau. Les Zcash Shielded Assets suivent le même principe.

![Schéma TEE de Secret Network](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

Pour une explication détaillée de la manière dont les TEEs sont implémentés sur Secret Network, lisez cet excellent article de @l_woetzel :  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Comment Secret Network sécurise les clés et l’état

- La **graine de chiffrement du consensus** du réseau est stockée à l’intérieur du TEE de chaque validateur.  
- Les contrats utilisent des clés de chiffrement uniques et infalsifiables.  
- Les contrats secrets s’exécutent sur le module de calcul Cosmos SDK, mais prennent en charge des entrées/sorties et un état chiffrés.

---

## Attestation à distance

L’**attestation à distance** est le processus qui consiste à prouver qu’une enclave s’exécute dans un véritable environnement matériel sécurisé.

Elle permet à une partie distante de vérifier :
- Que la bonne application est en cours d’exécution  
- Que l’application n’a pas été altérée  
- Qu’elle s’exécute de manière sécurisée à l’intérieur d’une enclave Intel SGX

![Explication de l’attestation à distance](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

Les enclaves contiennent également des clés privées de signature et d’attestation qui ne peuvent pas être accessibles depuis l’extérieur.

![Protection des clés de l’enclave](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## Scellement des données

Comme les enclaves sont sans état, les données doivent parfois être stockées à l’extérieur, dans une mémoire non fiable.  

Le **scellement des données** chiffre les données à l’intérieur de l’enclave à l’aide d’une clé dérivée du CPU. Le bloc chiffré ne peut être descellé que sur le **même système**.

![Schéma du scellement des données](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Network

**Oasis Network** utilise également des TEEs via son ParaTime confidentiel (par ex. Sapphire et Cipher).

Les données chiffrées entrent dans le TEE avec le smart contract. Elles sont déchiffrées, traitées, puis rechiffrées avant de quitter l’enclave.

![Flux TEE d’Oasis Network](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## TEEs dans les réseaux Proof-of-Stake

De nombreuses blockchains Proof-of-Stake (y compris Secret et Oasis) utilisent **Tendermint** comme cadre de consensus.

Pour les validateurs PoS :
- Les clés doivent être gérées de manière sécurisée et ne jamais être exposées en clair.  
- Les validateurs doivent rester en ligne (des pénalités d’indisponibilité s’appliquent).  
- Signer des messages contradictoires peut entraîner du slashing.

Les **TEEs** sont idéaux pour générer et utiliser en toute sécurité les clés des validateurs.

![Tendermint et sécurité PoS](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash et la recherche sur le Proof-of-Stake

Zcash recherche activement une migration vers le Proof-of-Stake.

- Lire la recherche : https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Regardez cet extrait d’un Community Call de Zcash Foundation expliquant différents modèles de PoS et leurs implications en matière de confidentialité :
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="Modèles de PoS"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**Fil original par ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*Cette page a été compilée à partir du fil original Zero to Zero Knowledge pour le wiki ZecHub.*
