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

txID="${1}"    #1 represent 1st argument
block="${2}"   #2 represent 2nd argument
alias="${3}"   #3 represents 3rd argument
command="${4}" #4 4th

if [[ -z $block ]]
then
    rawTx=$(zcash-cli getrawtransaction $txID 1)
else
    blockHash=$(zcash-cli getblockhash $block)
    rawTx=$(zcash-cli getrawtransaction $txID 1 $blockHash)
fi


echo $rawTx | jq .



