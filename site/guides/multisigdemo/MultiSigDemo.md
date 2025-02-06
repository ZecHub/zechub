# MultiSig Demo


## Gather public keys from needed individuals

* https://github.com/iancoleman/bip39
* If using zcashd, you can create a UA and use your transparent reciever as well. Then use getPubkey.sh to extract your public key.


## Create 2x Multisig (2 of 3) t3 addresses

run createMultiSig.sh to generate your multisig address and redeem script. What's needed are 3 public keys

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1st t3
`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2nd t3 for the change address. 

NOTE: in this example pubk1,pubk4 are the same person, pubk2,pubk5 are the same person and so on ...

NOTE2: the ORDER of your pubkeys matters! Pay attention to this!!!!


## Fund t3 address

Use any wallet/facuet to fund address

## Create MultiSig transaction

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

where,

        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)


`./txDetails.sh txid`   => will help you find the needed information

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex



## Sign MultiSig TX

Open signMultiSigTX.sh and add your private keys in the pk1,pk2, ... variables.
 

*** I would not recommend typing these into your terminal. ***


If you have access to all your private keys you can use them all at once to save time,
but in most real world examples, the signing will be done via folks around the world so each of the required participants will need to sign,
then send back the updated raxTX "hex" output which the others will use to sign to complete the signing proceedure.

Who ever creates the first tx, will sign with their private key and send out the updated rawTX hex that needs to be signed by the other participants.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

To sign this tx, at least 2 out of the three private keys need to sign it. If the public key you gave was exported using a T-address from zcashd, you can get the private key of your T address with: 


`zcash-cli dumpprivkey "t-addr"`


For this demo, I have used iancoleman's bip39 to quickly isolate the needed private keys.


## Broadcast signed TX

./sendMultiSignedTX.sh signedTXfromLastStep








