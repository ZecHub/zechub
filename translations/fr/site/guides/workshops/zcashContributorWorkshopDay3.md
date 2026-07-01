# Atelier Jour 3



## Analyse de données

* La science qui consiste à analyser des données brutes à l’aide de systèmes, d’outils et de techniques spécialisés afin d’identifier des motifs, des tendances et des informations utiles


Cela implique :
```markdown
                     \
-> collecting         \
-> cleaning     =====  \  DATA
-> organizing   =====  / 
-> transforming       /
-> optimizing        /
```




## Zcash 

* Argent électronique chiffré. La première cryptomonnaie à développer le chiffrement à connaissance nulle pour des paiements privés de pair à pair.

note: Si vous voulez des données précises auxquelles vous faites CONFIANCE, il est recommandé d’exécuter votre propre nœud complet [zebrad]. Vous pouvez configurer l’infrastructure
z3 [ zebrad + zainod/lightwalletd + "wallet of choice here" ] si vous voulez une solution complète et robuste. Vous accédez
aux données à l’aide des RPC (Remote Procedure Calls)

Pour une démonstration rapide de la façon dont cela fonctionne, regardez cette vidéo :


https://www.youtube.com/watch?v=Ok9Wa8FNbMA


## Démonstration de l’atelier

Cet atelier se concentrera sur la collecte et la transformation des données au niveau du portefeuille. C’est à ce niveau que la plupart des gens accéderont
à la blockchain Zcash.


### Cas d’usage ( Créer un fichier .csv de toutes les transactions pour un compte donné dans Zkool)

Il s’agit d’un scénario courant dans lequel une personne aurait besoin d’organiser et d’optimiser ses finances personnelles *numériques*.

#### Étape 1

Ouvrez Zkool et sélectionnez le compte que vous souhaitez utiliser

note: Nous utiliserons un portefeuille testnet pour cette démonstration.

note2: Nous choisissons Zkool ici, mais N’IMPORTE QUEL portefeuille disposant d’une fonctionnalité d’exportation fonctionnera !

https://github.com/hhanh00/zkool2

<img width="1496" height="646" alt="1" src="https://github.com/user-attachments/assets/125adfe8-6be3-4798-8ee8-b96bba9fb9ac" />



#### Étape 2


Allez dans le menu en haut à droite et sélectionnez "Exporter les transactions"

<img width="1398" height="718" alt="2" src="https://github.com/user-attachments/assets/4287ceb6-669b-4ef0-ba24-3f7e2d9860b6" />


#### Étape 3

Téléchargez le script bash que nous utiliserons pour transformer nos données. Pour les développeurs qui regardent, j’utiliserai bash, qui
est standard dans la plupart des distributions Linux, mais vous pouvez utiliser le langage de votre choix. 

Pour les non-développeurs ou les étudiants qui débutent, utilisez l’IA ! 

Voici quelques exemples de prompts pour vous aider à démarrer :

"Comment puis-je utiliser "bash/rust/python/ ... etc." pour transformer des fichiers CSV"

<img width="1098" height="480" alt="3" src="https://github.com/user-attachments/assets/6503f4be-6fbc-473f-919c-8914e09181bc" />

note: Vous devez tout de même comprendre les bases, mais c’est en animant ces ateliers que vous comprenez le FLUX du processus.

note2: L’IA n’est généralement pas privée, donc soyez particulièrement prudent lorsque vous l’utilisez en tant qu’étudiant !

#### Étape 4

Configurer les scripts pour l’utilisation et les exécuter

`chmod +x cleanCSV.sh`

`./cleanCSV.sh "name_of_exportBackup"`

#### Étape 5 Utiliser les données

Ouvrez-les dans libreOffice ou dans n’importe quel visionneur CSV pour les utiliser !



<img width="2132" height="942" alt="4" src="https://github.com/user-attachments/assets/1097030d-c0f4-44c4-b15c-f86706a77bdc" />
