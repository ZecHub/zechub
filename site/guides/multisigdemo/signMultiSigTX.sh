#!/bin/bash

rawTX="${1}"
txid="${2}"
voutIndex="${3}" 
scriptPubKey="${4}" 
redeemScript="${5}"
amount="${6}"


pk1=
pk2=
pk3=



# Using three keys at once

#zcash-cli signrawtransaction "$rawTX" "[{\"txid\":\"$txid\",\"vout\":$voutIndex,\"scriptPubKey\":\"$scriptPubKey\",\"redeemScript\":\"$redeemScript\",\"amount\":$amount}]" "[\"$pk1\",\"$pk2\",\"$pk3\"]"



# Using two keys at once

#zcash-cli signrawtransaction "$rawTX" "[{\"txid\":\"$txid\",\"vout\":$voutIndex,\"scriptPubKey\":\"$scriptPubKey\",\"redeemScript\":\"$redeemScript\"}]" "[\"$pk1\",\"$pk2\"]"



# Using one key at once

zcash-cli signrawtransaction "$rawTX" "[{\"txid\":\"$txid\",\"vout\":$voutIndex,\"scriptPubKey\":\"$scriptPubKey\",\"redeemScript\":\"$redeemScript\",\"amount\":$amount}]" "[\"$pk1\"]"




