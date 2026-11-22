# Guide multisig Zkool

Ce guide vous explique étape par étape comment effectuer des transactions multisig avec Zkool. Il couvre la création de comptes, l'envoi et la réception de fonds, ainsi que la configuration de la génération de clés distribuée (DKG) pour le multisig. Des captures d'écran illustrent chaque étape importante.

## Tutoriel

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool Demo | The Successor to Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. Créer un compte


1. Ouvrez l'**application Zkool** et allez dans **Nouveau compte**.


![img1](/content-images/ee906e49-361a-49b6-9484-904897fe2e3f-074e400a9c.webp)

3. Saisissez un **nom de compte** (p. ex. Anabelle).  
   

![img2](/content-images/e9c325d3-8507-433a-a0c6-6e8c1ea2a254-a637810ed5.webp)


4. Si nécessaire, activez l'option **Utiliser la monnaie interne** ou **Restaurer le compte**.


5. Une fois créé, le compte apparaîtra dans votre **liste de comptes**.  


![img3](/content-images/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb-971cf76b33.webp)


## 2. Recevoir des fonds

Chaque compte génère plusieurs types d'adresses :

**Adresse unifiée**

**Adresse Orchard uniquement**

**Adresse Sapling**
  
**Adresse transparente**


Sélectionnez le type que vous souhaitez utiliser et partagez-le pour recevoir des fonds.  


![img4](/content-images/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d-a0d6a4e7b7.webp)





## 3. Envoyer des fonds

1. Allez dans la section **Destinataire**.  


![img5](/content-images/9f3a03b9-dd56-450c-a8dc-4370f9289138-3217d846b7.webp)


3. Saisissez l'**adresse du destinataire**.  

4. Indiquez le **montant** et, si vous le souhaitez, un **mémo**.  

5. Vérifiez les détails de la transaction et **confirmez**.  


Une fois l'opération terminée, le solde est mis à jour dans votre liste de comptes.  


![img6](/content-images/6e6da76b-cd18-4567-a5c0-74f07ddefc64-78dc3362dc.webp)


## 4. Effectuer des transactions multisig : configurer la génération de clés distribuée (multisig)

Le multisig dans Zkool utilise la **génération de clés distribuée (DKG)** pour que plusieurs participants contrôlent un compte partagé.



### Étape 1 : lancer la DKG
Choisissez un **nom** pour le portefeuille partagé (p. ex. Anabelle).

Définissez le **nombre de participants**.
  
Choisissez votre **identifiant de participant**.
  
Définissez le **nombre de signataires requis (seuil)**.
    
Sélectionnez le **compte de financement**.
  

![img7](/content-images/8a90ca85-5439-4937-b16d-a570e69d55f0-1477202a57.webp)



### Étape 2 : ajouter les adresses des participants
- Saisissez l'**adresse unifiée** de chaque participant (recommandé).


**Remarque :** si vous utilisez une adresse Orchard uniquement ou Sapling uniquement, le multisig sera limité à ce seul pool (Orchard ou Sapling).  
Cela signifie que le portefeuille partagé ne pourra pas recevoir de fonds provenant d'autres pools.  
Pour une compatibilité et une flexibilité maximales, utilisez toujours des **adresses unifiées**.  


### Étape 3 : exécuter les tours de DKG
Attendez que tous les participants aient échangé les paquets du **tour 1** et du **tour 2**.  


![img8](/content-images/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4-b6bb50bbab.webp)



### Étape 4 : finaliser l'adresse partagée
Une fois l'opération terminée, une **adresse partagée** est générée.  


![img9](/content-images/741d1bc6-0102-4e67-bb83-9a1c184bd747-a508ea0371.webp)



## Conclusion

Avec Zkool, vous pouvez créer des comptes, envoyer et recevoir des fonds, et configurer un **portefeuille multisig** grâce à la génération de clés distribuée. Vous bénéficiez ainsi d'une **sécurité renforcée** et d'une **gestion des fonds collaborative et confidentielle**.
