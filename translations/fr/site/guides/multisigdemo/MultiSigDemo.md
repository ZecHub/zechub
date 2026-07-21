# Démonstration MultiSig

Cette démonstration nécessite zcashd

## Rassembler les clés publiques des personnes nécessaires

* https://github.com/iancoleman/bip39
* Si vous utilisez zcashd, vous pouvez créer une UA et utiliser également votre récepteur transparent. Ensuite, utilisez `getPubkey.sh` pour extraire votre clé publique.


## Créer 2x adresses MultiSig t3 (2 sur 3)

exécutez createMultiSig.sh pour générer votre adresse multisig et votre script de rachat. Il faut 3 clés publiques

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1re t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2e t3 pour l’adresse de monnaie rendue. 

#### REMARQUE : dans cet exemple pubk1,pubk4 sont la même personne, pubk2,pubk5 sont la même personne, et ainsi de suite ...

#### REMARQUE 2 : l’ORDRE de vos clés publiques est important ! Faites attention à cela !!!! 


## Alimenter l’adresse t3

Utilisez n’importe quel portefeuille/robinet pour alimenter l’adresse

## Créer une transaction MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

où,

```
        txid: un identifiant de transaction de la transaction qui a envoyé de l’argent vers votre nouvelle t3
   voutIndex: l’index de la sortie dans vout qui a la plus grande valeur
scriptPubKey: Le script de verrouillage P2SH contient le hachage d’un autre script de verrouillage (Script Hash), entouré des opcodes HASH160 et EQUAL. Ceci est en hexadécimal, et se trouve via le rpc getrawtransaction, cherchez scriptPubKey
redeemScript: La valeur hexadécimale du redeemScript qui a été produite lors de la création de notre t3. Elle est nécessaire à toutes les personnes qui veulent dépenser depuis la t3.
   oldAmount: Montant envoyé à votre nouvelle t3 depuis le txid ci-dessus
       tAddy: L’adresse vers laquelle vous souhaitez envoyer les fonds
      amount: Le montant de ZEC à envoyer à tAddy
 changeTaddy: Adresse de monnaie rendue (nouvelle t3 avec un nouveau redeemScript !)

```

`./txDetails.sh txid`   => vous aidera à trouver les informations nécessaires

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** ceci est nécessaire pour la signature ! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Signer la TX MultiSig

Ouvrez signMultiSigTX.sh et ajoutez vos clés privées dans les variables pk1,pk2, ...
 

*** Je ne recommanderais pas de les saisir dans votre terminal. ***


Si vous avez accès à toutes vos clés privées, vous pouvez les utiliser toutes en une seule fois pour gagner du temps,
mais dans la plupart des exemples du monde réel, la signature sera effectuée par des personnes réparties dans le monde entier, donc chacun des participants requis devra signer,
puis renvoyer la sortie "hex" rawTX mise à jour que les autres utiliseront pour signer afin de terminer la procédure de signature.

La personne qui crée la première tx signera avec sa clé privée et enverra le hex rawTX mis à jour qui doit être signé par les autres participants.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Pour signer cette tx, au moins 2 des trois clés privées doivent la signer. Si la clé publique que vous avez fournie a été exportée en utilisant une adresse T depuis zcashd, vous pouvez obtenir la clé privée de votre adresse T avec : 


`zcash-cli dumpprivkey "t-addr"`


Pour cette démonstration, j’ai utilisé le bip39 de iancoleman pour isoler rapidement les clés privées nécessaires.


## Diffuser la TX signée

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Sources

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
