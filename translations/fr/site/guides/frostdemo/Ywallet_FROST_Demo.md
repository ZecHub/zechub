# Démo FROST de Ywallet

## Compiler les bins FROST

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Utilisez le dépôt ci-dessus et suivez les instructions de compilation : 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Les bins seront dans le dossier target.


## Créer une FROST UA

`./generateFROST_UA.sh`



## Importer l’UFVK dans Ywallet

Comptes -> Cliquez sur + et collez l’ufvk de l’étape ci-dessus

## Créer une transaction avec Ywallet

Collez n’importe quelle UA et envoyez une tx. Enregistrez le fichier.

## Démarrer la procédure de signature FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

la première entrée est l’emplacement de la tx brute de l’étape ci-dessus
la deuxième entrée est l’emplacement et le nom de la tx signée que vous voulez diffuser
C’est la partie où vous indiquez à FROST quelle transaction vous voulez que tout le monde signe

## Démarrer le Coordinator

`./runCoordinator.sh`

Cela coordonne la signature de chaque participant et crée une signature de groupe

## Faire signer cette transaction par chaque Participant

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Finaliser la transaction signée

Dans la fenêtre du coordinator, copiez la signature de groupe qui est affichée et collez-la dans la fenêtre de signature FROST.
Cela terminera la signature FROST et produira `mysingedtx`


## Diffuser votre transaction avec Ywallet

Cliquez sur 'More' en bas à droite de Ywallet et trouvez 'Broadcast'. Trouvez 'mysignedtx' et cliquez sur ok.

Si tout fonctionne, vous obtiendrez un ID de transaction :)
