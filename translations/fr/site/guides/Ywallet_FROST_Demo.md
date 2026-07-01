# Démo FROST de Ywallet

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="Démo de transaction FROST + Ywallet"
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

## Créer une FROST UA

`./generateFROST_UA.sh`



## Importer l’UFVK dans Ywallet

Comptes -> Cliquez sur + et collez l’ufvk de l’étape ci-dessus

## Créer une transaction avec Ywallet

Collez n’importe quelle UA et envoyez une tx. Enregistrez le fichier.

## Démarrer la procédure de signature FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

la première entrée est l’emplacement de la transaction brute de l’étape ci-dessus
la deuxième entrée est l’emplacement et le nom de la transaction signée que vous voulez diffuser
C’est la partie où vous indiquez à FROST quelle transaction vous voulez que tout le monde signe

## Démarrer le Coordinateur

`./runCoordinator.sh`

Cela coordonne la signature de chaque participant et crée une signature de groupe

## Faire signer cette transaction par chaque Participant

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finaliser la transaction signée

Dans la fenêtre du coordinateur, copiez la signature de groupe affichée et collez-la dans la fenêtre de signature FROST.
Cela complétera la signature FROST et produira 'mysingedtx'


## Diffuser votre transaction avec Ywallet

Cliquez sur 'More' en bas à droite de Ywallet et trouvez 'Broadcast'. Trouvez 'mysignedtx' et cliquez sur ok.

Si tout fonctionne, vous obtiendrez un ID de transaction :)
