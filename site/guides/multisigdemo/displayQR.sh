#!/bin/bash

# HISTORICAL -- part of the MultiSig demo, which no longer runs.
#
# This helper itself only calls qrencode. The demo it belongs to drives zcashd
# through zcash-cli, and zcashd reached its automatic End-of-Support halt on
# 18 July 2026, so the workflow this helper supports cannot be completed.
#
# Kept as a record of the transparent multisig workflow. For multi-party
# custody on Zcash today see:
#   https://zechub.wiki/zcash-tech/frost-threshold-custody
#   https://zechub.wiki/guides/ywallet-frost-demo

from="${1}"     # $1 represent first argument

qrt="qrencode -m 2 -t utf8 <<< $from"

eval $qrt