# Démo Ywallet FROST

> **Ywallet n'est plus maintenu.** Son développeur a confirmé qu'il ne sera pas mis à jour pour Ironwood (NU6.3) : il ne peut donc plus suivre la chaîne et les étapes ci-dessous ne peuvent pas être réalisées sur le réseau principal. Cette page est conservée à titre de référence. Zkool, du même développeur, est le successeur maintenu et prend en charge le multisig FROST.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Compiler les binaires FROST

[GitHub lien](https://github.com/ZcashFoundation/frost-zcash-demo)

Utilisez le dépôt ci-dessus et suivez les instructions de compilation : 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

Les binaires se trouveront dans le dossier target.

## Créer une UA FROST

`./generateFROST_UA.sh`



## Importer l'UFVK dans Ywallet

Comptes -> Cliquez sur + et collez l'UFVK obtenue à l'étape précédente

## Créer une transaction avec Ywallet

Collez n'importe quelle UA et envoyez une transaction. Enregistrez le fichier.

## Lancer la procédure de signature FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

La première entrée est l'emplacement de la transaction brute issue de l'étape précédente.
La seconde entrée est l'emplacement et le nom de la transaction signée que vous souhaitez diffuser.
C'est à cette étape que vous indiquez à FROST quelle transaction vous souhaitez faire signer par tous les participants.

## Lancer le coordinateur

`./runCoordinator.sh`

Celui-ci coordonne la signature de chaque participant et crée une signature de groupe.

## Faire signer cette transaction par chaque participant

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finaliser la transaction signée

Dans la fenêtre du coordinateur, copiez la signature de groupe affichée et collez-la dans la fenêtre de signature FROST.
Cela finalisera la signature FROST et produira le fichier « mysingedtx ».


## Diffuser votre transaction avec Ywallet

Cliquez sur « More » en bas à droite de Ywallet et repérez « Broadcast ». Sélectionnez « mysignedtx » et cliquez sur OK.

Si tout fonctionne, vous obtiendrez un identifiant de transaction :)
