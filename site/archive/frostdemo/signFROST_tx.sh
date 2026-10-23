#!/bin/bash

rawTX="${1}"   #1 represent 1st argument
signedTX="${2}"   #1 represent 1st argument


ufvk=$(grep -oP '(?<=Unified Full Viewing Key: ").*' result.md | tr -d '"')

./zcash-sign sign --tx-plan $rawTX --ufvk $ufvk -o $signedTX