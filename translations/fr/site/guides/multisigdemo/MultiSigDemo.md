# Démo MultiSig

> **Historique. Ce guide ne fonctionne plus.**
>
> Chaque étape ci-dessous dépend de zcashd, qui a atteint son arrêt automatique de fin de support le 18 juillet 2026. Les sept scripts fournis avec cette page l'utilisent via `zcash-cli`, et aucun d'entre eux ne peut donc atteindre un nœud en fonctionnement aujourd'hui.
>
> Ces scripts ne peuvent pas être portés mécaniquement. Ils reposent sur les RPC de transaction brute et de wallet (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) que zcashd a dépréciés avant l'arrêt ; Zallet les remplace par de nouvelles méthodes qui opèrent sur des PCZT plutôt que sur du hexadécimal de transaction brute, et est toujours en bêta, de nombreuses méthodes zcashd n'ayant pas encore été portées.
>
> Pour la garde multipartite sur Zcash aujourd'hui, consultez [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody), qui inclut une comparaison directe avec le multisig transparent, ainsi que la [démo Ywallet FROST](/guides/frostdemo/ywallet-frost-demo). Pour migrer un nœud existant depuis zcashd, consultez le [guide de migration vers Zebra et Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Cette page est conservée comme archive historique du flux de travail multisig transparent.

Cette démo nécessite zcashd, qui s'est arrêté le 18 juillet 2026 et ne fonctionne plus. Rien de ce qui suit ne peut être réalisé sur la chaîne active.

## Rassembler les clés publiques des personnes nécessaires

* https://github.com/iancoleman/bip39
* Si vous utilisez zcashd, vous pouvez créer une UA et également utiliser votre récepteur transparent. Utilisez ensuite `getPubkey.sh` pour extraire votre clé publique.


## Créer 2x t3 Multisig (2 sur 3)

exécutez createMultiSig.sh pour générer votre adresse multisig et votre script de rachat. Trois clés publiques sont nécessaires

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1re t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2e t3 pour l'adresse de monnaie. 

#### REMARQUE : dans cet exemple pubk1,pubk4 appartiennent à la même personne, pubk2,pubk5 appartiennent à la même personne, et ainsi de suite ...

#### REMARQUE2 : l'ORDRE de vos clés publiques est important ! Faites très attention à cela !


## Alimenter l'adresse t3

Utilisez n'importe quel wallet/robinet pour alimenter l'adresse

## Créer une transaction MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

où,

```
        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)

```

`./txDetails.sh txid`   => vous aidera à trouver les informations nécessaires

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Signer une TX MultiSig

Ouvrez signMultiSigTX.sh et ajoutez vos clés privées dans les variables pk1,pk2, ....
 

*** Je ne recommande pas de les saisir dans votre terminal. ***


Si vous avez accès à toutes vos clés privées, vous pouvez les utiliser toutes à la fois pour gagner du temps,
mais dans la plupart des exemples réels, la signature sera effectuée par des personnes réparties dans le monde entier, de sorte que chaque participant requis devra signer,
puis renvoyer la sortie « hex » raxTX mise à jour que les autres utiliseront pour signer afin de terminer la procédure de signature.

La personne qui crée la première tx signera avec sa clé privée et enverra le hex rawTX mis à jour qui doit être signé par les autres participants.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Pour signer cette tx, au moins 2 des trois clés privées doivent la signer. Si la clé publique que vous avez fournie a été exportée à l'aide d'une adresse T depuis zcashd, vous pouvez obtenir la clé privée de votre adresse T avec : 


`zcash-cli dumpprivkey "t-addr"`

Cette commande s'est arrêtée avec zcashd et ne renvoie rien aujourd'hui ; elle est conservée ici uniquement pour montrer comment la démo obtenait ses clés.


Pour cette démo, j'ai utilisé bip39 d'iancoleman pour isoler rapidement les clés privées nécessaires.


## Diffuser la TX signée

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Sources

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
