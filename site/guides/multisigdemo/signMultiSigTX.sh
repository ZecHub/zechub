#!/bin/bash

# HISTORICAL -- this script does not run.
#
# It drives zcashd through zcash-cli. zcashd reached its automatic
# End-of-Support halt on 18 July 2026, so the calls below cannot reach a
# running node. The raw-transaction and wallet RPCs used here were deprecated
# by zcashd before the halt; Zallet replaces them with new methods that
# operate on PCZTs rather than raw transaction hex.
#
# Kept as a record of the transparent multisig workflow. For multi-party
# custody on Zcash today see:
#   https://zechub.wiki/zcash-tech/frost-threshold-custody
#   https://zechub.wiki/guides/frostdemo/ywallet-frost-demo

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




