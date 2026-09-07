# Démo FROST Ywallet

> **Ywallet n’est plus maintenu.** Son développeur a confirmé qu’il ne serait pas mis à jour pour Ironwood (NU6.3), il ne peut donc plus suivre la chaîne et les étapes ci-dessous ne peuvent pas être réalisées sur le mainnet. Cette page est conservée à titre de référence. Zkool, du même développeur, est son successeur maintenu et prend en charge le multisig FROST.

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

[Lien Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Utilisez le dépôt ci-dessus et suivez les instructions de compilation : 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Les binaires se trouveront dans le dossier target.

## Créer une UA FROST

`./generateFROST_UA.sh`



## Importer l’UFVK dans Ywallet

Comptes -> Cliquez sur + et collez l’ufvk de l’étape ci-dessus

## Créer une transaction avec Ywallet

Collez n’importe quelle UA et envoyez une transaction. Enregistrez le fichier.

## Démarrer la procédure de signature FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

la première entrée est l’emplacement de la transaction brute de l’étape ci-dessus
la deuxième entrée est l’emplacement et le nom de la transaction signée que vous souhaitez diffuser
C’est ici que vous indiquez à FROST quelle transaction vous voulez que tout le monde signe

## Démarrer le coordinateur

`./runCoordinator.sh`

Cela coordonne la signature de chaque participant et crée une signature de groupe

## Faire signer chaque participant pour cette transaction

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finaliser la transaction signée

Dans la fenêtre du coordinateur, copiez la signature de groupe générée et collez-la dans la fenêtre de signature FROST.
Cela terminera la signature FROST et générera « mysingedtx »


## Diffuser votre transaction avec Ywallet

Cliquez sur « More » en bas à droite de Ywallet et trouvez « Broadcast ». Trouvez « mysignedtx » et cliquez sur ok.

Si tout fonctionne, vous obtiendrez un ID de transaction :)
