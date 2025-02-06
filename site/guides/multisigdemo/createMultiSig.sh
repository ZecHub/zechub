#!/bin/bash

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
