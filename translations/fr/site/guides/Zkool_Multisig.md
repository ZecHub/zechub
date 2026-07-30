# Guide Multisig de Zkool

Ce guide fournit une procédure pas à pas expliquant comment effectuer des transactions multisig avec Zkool. Il comprend la création de comptes, l’envoi ou la réception de fonds, ainsi que la configuration de la génération distribuée de clés (DKG) pour le multisig. Des captures d’écran sont incluses pour chaque étape principale.

## Tutoriel

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Démo Zkool | Le successeur de Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. Création d’un compte


1. Ouvrez l’**application Zkool** et allez dans **Nouveau compte**.


![img1](https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f)

3. Saisissez un **nom de compte** (par ex. Anabelle).  
   

![img2](https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254)


4. Activez éventuellement **Utiliser le change interne** ou **Restaurer le compte** si nécessaire.


5. Après sa création, le compte apparaîtra dans votre **liste de comptes**.  


![img3](https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb)


## 2. Réception de fonds

Chaque compte génère plusieurs types d’adresses :

**Unified Address**

**Adresse Orchard uniquement**

**Adresse Sapling**
  
**Adresse transparente**


Sélectionnez le type que vous souhaitez utiliser et partagez-le pour recevoir des fonds.  


![img4](https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d)





## 3. Envoi de fonds

1. Allez dans la section **Destinataire**.  


![img5](https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138)


3. Saisissez **l’adresse du destinataire**.  

4. Indiquez le **montant** et le **mémo** facultatif.  

5. Vérifiez les détails de la transaction et **confirmez**.  


Une fois l’opération terminée, le solde se met à jour dans votre liste de comptes.  


![img6](https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64)


## 4. Effectuer des transactions Multisig : configuration de la génération distribuée de clés (Multisig)

Le multisig dans Zkool utilise la **génération distribuée de clés (DKG)** afin de garantir que plusieurs participants contrôlent un compte partagé.



### Étape 1 : Initialiser la DKG
Choisissez un **nom** pour le portefeuille partagé (par ex. Anabelle).

Définissez le **nombre de participants**.
  
Choisissez votre **ID de participant**.
  
Définissez le **nombre de signataires requis (seuil)**.
    
Sélectionnez le **compte de financement**.
  

![img7](https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0)



### Étape 2 : Ajouter les adresses des participants
- Saisissez la **Unified Address** de chaque participant (recommandé).


**Remarque :** Si vous utilisez une adresse Orchard uniquement ou une adresse Sapling uniquement, le multisig sera limité à ce pool uniquement (Orchard ou Sapling).  
Cela signifie que le portefeuille partagé ne pourra pas recevoir de fonds provenant d’autres pools.  
Pour une compatibilité et une flexibilité maximales, utilisez toujours des **Unified Addresses**.  


### Étape 3 : Exécuter les tours de DKG
Attendez que tous les participants échangent les paquets du **tour 1** et du **tour 2**.  


![img8](https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4)



### Étape 4 : Finaliser l’adresse partagée
Une fois l’opération terminée, une **adresse partagée** est générée.  


![img9](https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747)



## Conclusion

Avec Zkool, vous pouvez : créer des comptes, envoyer et recevoir des fonds, et configurer un **portefeuille multisig** à l’aide de la génération distribuée de clés. Cela garantit une **sécurité renforcée** ainsi qu’une **gestion collaborative et privée des fonds**.
