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
#   https://zechub.wiki/guides/ywallet-frost-demo

tAddy1="${1}"
tAddy2="${2}"
tAddy3="${3}"


#pubkey1=$(./getPubkey.sh $tAddy1)
#pubkey2=$(./getPubkey.sh $tAddy2)
#pubkey3=$(./getPubkey.sh $tAddy3)

#echo " pubkey1: $pubkey1"
#echo " pubkey2: $pubkey2"
#echo " pubkey3: $pubkey3"

zcash-cli createmultisig 2 "[\"$tAddy1\",\"$tAddy2\",\"$tAddy3\"]" | tee demot3.md
